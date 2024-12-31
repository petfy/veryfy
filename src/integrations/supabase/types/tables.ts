import { Database } from "./database";

export interface ProfilesTable {
  Row: Database["public"]["Tables"]["profiles"]["Row"];
  Insert: Database["public"]["Tables"]["profiles"]["Insert"];
  Update: Database["public"]["Tables"]["profiles"]["Update"];
  Relationships: Database["public"]["Tables"]["profiles"]["Relationships"];
}

export interface ScamReportsTable {
  Row: Database["public"]["Tables"]["scam_reports"]["Row"] & {
    report_count: number;
  };
  Insert: Database["public"]["Tables"]["scam_reports"]["Insert"];
  Update: Database["public"]["Tables"]["scam_reports"]["Update"];
  Relationships: Database["public"]["Tables"]["scam_reports"]["Relationships"];
}

export interface StoresTable {
  Row: Database["public"]["Tables"]["stores"]["Row"];
  Insert: Database["public"]["Tables"]["stores"]["Insert"];
  Update: Database["public"]["Tables"]["stores"]["Update"];
  Relationships: Database["public"]["Tables"]["stores"]["Relationships"];
}

export interface VerificationBadgesTable {
  Row: Database["public"]["Tables"]["verification_badges"]["Row"];
  Insert: Database["public"]["Tables"]["verification_badges"]["Insert"];
  Update: Database["public"]["Tables"]["verification_badges"]["Update"];
  Relationships: Database["public"]["Tables"]["verification_badges"]["Relationships"];
}

export interface VerificationDocumentsTable {
  Row: Database["public"]["Tables"]["verification_documents"]["Row"];
  Insert: Database["public"]["Tables"]["verification_documents"]["Insert"];
  Update: Database["public"]["Tables"]["verification_documents"]["Update"];
  Relationships: Database["public"]["Tables"]["verification_documents"]["Relationships"];
}

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