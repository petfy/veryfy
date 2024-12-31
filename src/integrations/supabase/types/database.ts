import { ProfilesTable } from './tables/profiles';
import { ScamReportsTable } from './tables/scam-reports';
import { RemovalRequestsTable } from './tables/removal-requests';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: ProfilesTable;
      scam_reports: ScamReportsTable;
      stores: StoresTable;
      verification_badges: VerificationBadgesTable;
      verification_documents: VerificationDocumentsTable;
      removal_requests: RemovalRequestsTable;
    };
    Views: {};
    Functions: DatabaseFunctions;
    Enums: {};
    CompositeTypes: {};
  };
}

export interface DatabaseFunctions {
  generate_registration_number: {
    Args: Record<PropertyKey, never>;
    Returns: string;
  };
}