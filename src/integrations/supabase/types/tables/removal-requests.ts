export interface RemovalRequestsTable {
  Row: {
    id: string;
    scam_report_id: string;
    reason: string;
    evidence_url: string | null;
    status: string;
    created_at: string;
  };
  Insert: {
    id?: string;
    scam_report_id: string;
    reason: string;
    evidence_url?: string | null;
    status?: string;
    created_at?: string;
  };
  Update: {
    id?: string;
    scam_report_id?: string;
    reason?: string;
    evidence_url?: string | null;
    status?: string;
    created_at?: string;
  };
  Relationships: [];
}