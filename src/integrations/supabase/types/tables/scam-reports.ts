export interface ScamReportsTable {
  Row: {
    id: string;
    reporter_id: string;
    reported_email: string;
    description: string;
    evidence_url: string | null;
    status: string | null;
    created_at: string;
    customer_first_name: string | null;
    customer_last_name: string | null;
    customer_phone: string | null;
    customer_address: string | null;
    customer_city: string | null;
    customer_country: string | null;
    report_count?: number;
  };
  Insert: {
    id?: string;
    reporter_id: string;
    reported_email: string;
    description: string;
    evidence_url?: string | null;
    status?: string | null;
    created_at?: string;
    customer_first_name?: string | null;
    customer_last_name?: string | null;
    customer_phone?: string | null;
    customer_address?: string | null;
    customer_city?: string | null;
    customer_country?: string | null;
  };
  Update: {
    id?: string;
    reporter_id?: string;
    reported_email?: string;
    description?: string;
    evidence_url?: string | null;
    status?: string | null;
    created_at?: string;
    customer_first_name?: string | null;
    customer_last_name?: string | null;
    customer_phone?: string | null;
    customer_address?: string | null;
    customer_city?: string | null;
    customer_country?: string | null;
  };
  Relationships: [];
}