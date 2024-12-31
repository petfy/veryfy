import * as z from "zod";

export const scamReportSchema = z.object({
  reported_email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  customer_first_name: z.string().optional(),
  customer_last_name: z.string().optional(),
  customer_phone: z.string().optional(),
  customer_address: z.string().optional(),
  customer_city: z.string().optional(),
  customer_country: z.string().optional(),
});

export type ScamReportFormData = z.infer<typeof scamReportSchema>;