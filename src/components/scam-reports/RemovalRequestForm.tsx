import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/contexts/TranslationContext";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import type { RemovalRequestsTable } from "@/integrations/supabase/types/tables/removal-requests";

const removalRequestSchema = z.object({
  reason: z.string().min(1, "Reason is required"),
  evidence: z.any(),
});

type RemovalRequestFormValues = z.infer<typeof removalRequestSchema>;

interface RemovalRequestFormProps {
  scamReportId: string;
  onSuccess?: () => void;
}

export function RemovalRequestForm({ scamReportId, onSuccess }: RemovalRequestFormProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RemovalRequestFormValues>({
    resolver: zodResolver(removalRequestSchema),
  });

  const onSubmit = async (data: RemovalRequestFormValues) => {
    setIsSubmitting(true);
    try {
      const file = data.evidence[0];
      let evidenceUrl = null;

      if (file) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("removal-requests")
          .upload(`${scamReportId}/${file.name}`, file);

        if (uploadError) throw uploadError;
        evidenceUrl = uploadData.path;
      }

      const insertData: RemovalRequestsTable['Insert'] = {
        scam_report_id: scamReportId,
        reason: data.reason,
        evidence_url: evidenceUrl,
      };

      const { error } = await supabase
        .from("removal_requests")
        .insert(insertData);

      if (error) throw error;

      toast({
        title: t("removalRequestSubmitted"),
        description: t("removalRequestSubmittedDesc"),
      });
      
      onSuccess?.();
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: t("removalRequestError"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t("requestRemoval")}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("reason")}</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="evidence"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>{t("evidence")}</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => onChange(e.target.files)}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("submitting") : t("submit")}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}