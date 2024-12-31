import { z } from "zod";

export const scamReportSchema = z.object({
  reported_email: z.string().email(),
  description: z.string().min(1),
  customer_first_name: z.string().optional(),
  customer_last_name: z.string().optional(),
  customer_phone: z.string().optional(),
  customer_address: z.string().optional(),
  customer_city: z.string().optional(),
  customer_country: z.string().optional(),
});

export type ScamReportFormData = z.infer<typeof scamReportSchema>;

export interface ScamReportFormProps {
  onSuccess?: () => void;
  initialData?: Partial<ScamReportFormData>;
}

export interface ScamReport {
  id: string;
  reported_email: string;
  description: string;
  status: string;
  created_at: string;
  evidence_url: string;
  customer_first_name?: string;
  customer_last_name?: string;
  customer_phone?: string;
  customer_address?: string;
  customer_city?: string;
  customer_country?: string;
  report_count: number;
}