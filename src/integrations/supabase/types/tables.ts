export interface ProfilesTable {
  Row: {
    business_name: string | null;
    business_type: string | null;
    created_at: string;
    full_name: string | null;
    id: string;
    updated_at: string;
  };
  Insert: {
    business_name?: string | null;
    business_type?: string | null;
    created_at?: string;
    full_name?: string | null;
    id: string;
    updated_at?: string;
  };
  Update: {
    business_name?: string | null;
    business_type?: string | null;
    created_at?: string;
    full_name?: string | null;
    id?: string;
    updated_at?: string;
  };
  Relationships: [];
}

export interface ScamReportsTable {
  Row: {
    id: string;
    reporter_id: string;
    reported_email: string;
    description: string;
    evidence_url: string | null;
    status: string;
    created_at: string;
    customer_first_name: string | null;
    customer_last_name: string | null;
    customer_phone: string | null;
    customer_address: string | null;
    customer_city: string | null;
    customer_country: string | null;
  };
  Insert: {
    id?: string;
    reporter_id: string;
    reported_email: string;
    description: string;
    evidence_url?: string | null;
    status?: string;
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
    status?: string;
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

export interface StoresTable {
  Row: {
    created_at: string;
    id: string;
    logo_url: string | null;
    name: string;
    subscription_expires_at: string | null;
    subscription_status: string | null;
    updated_at: string;
    url: string;
    user_id: string;
    verification_status: string | null;
  };
  Insert: {
    created_at?: string;
    id?: string;
    logo_url?: string | null;
    name: string;
    subscription_expires_at?: string | null;
    subscription_status?: string | null;
    updated_at?: string;
    url: string;
    user_id: string;
    verification_status?: string | null;
  };
  Update: {
    created_at?: string;
    id?: string;
    logo_url?: string | null;
    name?: string;
    subscription_expires_at?: string | null;
    subscription_status?: string | null;
    updated_at?: string;
    url?: string;
    user_id?: string;
    verification_status?: string | null;
  };
  Relationships: [];
}

export interface VerificationBadgesTable {
  Row: {
    allowed_domain: string;
    badge_type: string;
    created_at: string;
    expires_at: string | null;
    id: string;
    is_active: boolean | null;
    registration_number: string;
    store_id: string;
    updated_at: string;
  };
  Insert: {
    allowed_domain?: string;
    badge_type: string;
    created_at?: string;
    expires_at?: string | null;
    id?: string;
    is_active?: boolean | null;
    registration_number: string;
    store_id: string;
    updated_at?: string;
  };
  Update: {
    allowed_domain?: string;
    badge_type?: string;
    created_at?: string;
    expires_at?: string | null;
    id?: string;
    is_active?: boolean | null;
    registration_number?: string;
    store_id?: string;
    updated_at?: string;
  };
  Relationships: [];
}

export interface VerificationDocumentsTable {
  Row: {
    created_at: string;
    document_type: string;
    document_url: string;
    id: string;
    status: string | null;
    store_id: string;
  };
  Insert: {
    created_at?: string;
    document_type: string;
    document_url: string;
    id?: string;
    status?: string | null;
    store_id: string;
  };
  Update: {
    created_at?: string;
    document_type?: string;
    document_url?: string;
    id?: string;
    status?: string | null;
    store_id?: string;
  };
  Relationships: [];
}
