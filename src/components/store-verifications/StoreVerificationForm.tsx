import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { LogoUpload } from "./form/LogoUpload";
import { DocumentUpload } from "./form/DocumentUpload";
import { BasicInfoFields } from "./form/BasicInfoFields";
import type { VerificationFormData } from "./types";

export function StoreVerificationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const form = useForm<VerificationFormData>();
  const queryClient = useQueryClient();

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("logo", file);
    }
  };

  const uploadFile = async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `${path}/${crypto.randomUUID()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('store-logos')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('store-logos')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const onSubmit = async (data: VerificationFormData) => {
    setIsSubmitting(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("No authenticated user found");
      }

      let logoUrl = null;
      if (data.logo) {
        logoUrl = await uploadFile(data.logo, 'logos');
      }

      // Upload legal documents
      const legalUrls = [];
      if (data.legalDocuments) {
        for (let i = 0; i < data.legalDocuments.length; i++) {
          const url = await uploadFile(data.legalDocuments[i], 'legal');
          legalUrls.push(url);
        }
      }

      // Upload constitution documents
      const constitutionUrls = [];
      if (data.constitutionDocuments) {
        for (let i = 0; i < data.constitutionDocuments.length; i++) {
          const url = await uploadFile(data.constitutionDocuments[i], 'constitution');
          constitutionUrls.push(url);
        }
      }

      // Create store entry
      const { data: store, error: storeError } = await supabase
        .from("stores")
        .insert({
          name: data.storeName,
          url: data.storeUrl,
          user_id: user.id,
          verification_status: "pending",
          logo_url: logoUrl,
        })
        .select()
        .single();

      if (storeError) throw storeError;

      // Upload verification documents
      for (const url of [...legalUrls, ...constitutionUrls]) {
        const { error: docError } = await supabase
          .from("verification_documents")
          .insert({
            store_id: store.id,
            document_type: url.includes('/legal/') ? 'legal' : 'constitution',
            document_url: url,
            status: 'pending'
          });

        if (docError) throw docError;
      }

      // Send notification email
      await supabase.functions.invoke('notify-verification', {
        body: { storeName: data.storeName, contactEmail: data.contactEmail }
      });

      // Update user profile with business information
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          business_name: data.businessName,
          business_type: data.businessType,
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Refresh the stores list in the table
      queryClient.invalidateQueries({ queryKey: ["stores"] });

      toast({
        title: "Verification request submitted",
        description: "We'll review your request and get back to you soon.",
      });

      // Refresh the page to show updated pending count
      window.location.reload();
    } catch (error) {
      console.error("Verification request error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit verification request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <LogoUpload 
          form={form}
          logoPreview={logoPreview}
          onLogoChange={handleLogoChange}
        />
        
        <BasicInfoFields form={form} />

        <DocumentUpload
          form={form}
          name="legalDocuments"
          label="Legal Representative Documents"
        />

        <DocumentUpload
          form={form}
          name="constitutionDocuments"
          label="Company Constitution Documents"
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Verification Request"}
        </Button>
      </form>
    </Form>
  );
}