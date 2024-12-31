export interface ProfilesTable {
  Row: {
    id: string;
    full_name: string | null;
    business_name: string | null;
    business_type: string | null;
    created_at: string;
    updated_at: string;
  };
  Insert: {
    id: string;
    full_name?: string | null;
    business_name?: string | null;
    business_type?: string | null;
    created_at?: string;
    updated_at?: string;
  };
  Update: {
    id?: string;
    full_name?: string | null;
    business_name?: string | null;
    business_type?: string | null;
    created_at?: string;
    updated_at?: string;
  };
  Relationships: [];
}