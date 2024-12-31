import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomerInfoFields } from "./CustomerInfoFields";
import { scamReportSchema, type ScamReportFormData } from "./types";

interface ScamReportFormProps {
  onSuccess: () => void;
}

export function ScamReportForm({ onSuccess }: ScamReportFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<ScamReportFormData>({
    resolver: zodResolver(scamReportSchema),
    defaultValues: {
      reported_email: "",
      description: "",
      customer_first_name: "",
      customer_last_name: "",
      customer_phone: "",
      customer_address: "",
      customer_city: "",
      customer_country: "",
    },
  });

  const onSubmit = async (values: ScamReportFormData) => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload evidence file (PDF or image)",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        throw new Error("Not authenticated");
      }

      // Upload the evidence file
      const fileExt = selectedFile.name.split('.').pop();
      const filePath = `${session.session.user.id}/${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('scam-evidence')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Get the public URL of the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('scam-evidence')
        .getPublicUrl(filePath);

      // Create the scam report
      const { error: reportError } = await supabase.from("scam_reports").insert({
        reporter_id: session.session.user.id,
        reported_email: values.reported_email,
        description: values.description,
        evidence_url: publicUrl,
        customer_first_name: values.customer_first_name,
        customer_last_name: values.customer_last_name,
        customer_phone: values.customer_phone,
        customer_address: values.customer_address,
        customer_city: values.customer_city,
        customer_country: values.customer_country,
      });

      if (reportError) throw reportError;

      toast({
        title: "Report Submitted",
        description: "The scam report has been submitted successfully.",
      });

      form.reset();
      setSelectedFile(null);
      onSuccess();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit report",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF or image file (JPEG, PNG, GIF)",
        });
        return;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "File size should be less than 5MB",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Report a Scam</DialogTitle>
        <DialogDescription>
          Report a customer who has attempted or committed fraud.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="reported_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Email</FormLabel>
                <FormControl>
                  <Input placeholder="customer@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  The email address of the customer who attempted fraud.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomerInfoFields form={form} />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the fraudulent activity..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide details about the fraudulent activity.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Evidence File (Required)</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileChange}
                required
              />
            </FormControl>
            <FormDescription>
              Upload a PDF or image file (max 5MB)
            </FormDescription>
            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedFile.name}
              </p>
            )}
          </FormItem>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}