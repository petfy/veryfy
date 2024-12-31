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
      profiles: {
        Row: {
          business_name: string | null
          business_type: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          business_name?: string | null
          business_type?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          business_name?: string | null
          business_type?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
      }
      removal_requests: {
        Row: {
          id: string
          scam_report_id: string
          reason: string
          evidence_url: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          scam_report_id: string
          reason: string
          evidence_url?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          scam_report_id?: string
          reason?: string
          evidence_url?: string | null
          status?: string
          created_at?: string
        }
      }
      scam_reports: {
        Row: {
          created_at: string
          customer_address: string | null
          customer_city: string | null
          customer_country: string | null
          customer_first_name: string | null
          customer_last_name: string | null
          customer_phone: string | null
          description: string
          evidence_url: string | null
          id: string
          reported_email: string
          reporter_id: string
          status: string | null
        }
        Insert: {
          created_at?: string
          customer_address?: string | null
          customer_city?: string | null
          customer_country?: string | null
          customer_first_name?: string | null
          customer_last_name?: string | null
          customer_phone?: string | null
          description: string
          evidence_url?: string | null
          id?: string
          reported_email: string
          reporter_id: string
          status?: string | null
        }
        Update: {
          created_at?: string
          customer_address?: string | null
          customer_city?: string | null
          customer_country?: string | null
          customer_first_name?: string | null
          customer_last_name?: string | null
          customer_phone?: string | null
          description?: string
          evidence_url?: string | null
          id?: string
          reported_email?: string
          reporter_id?: string
          status?: string | null
        }
      }
      stores: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          subscription_expires_at: string | null
          subscription_status: string | null
          updated_at: string
          url: string
          user_id: string
          verification_status: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          subscription_expires_at?: string | null
          subscription_status?: string | null
          updated_at?: string
          url: string
          user_id: string
          verification_status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          subscription_expires_at?: string | null
          subscription_status?: string | null
          updated_at?: string
          url?: string
          user_id?: string
          verification_status?: string | null
        }
      }
      verification_badges: {
        Row: {
          allowed_domain: string
          badge_type: string
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          registration_number: string
          store_id: string
          updated_at: string
        }
        Insert: {
          allowed_domain?: string
          badge_type: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          registration_number: string
          store_id: string
          updated_at?: string
        }
        Update: {
          allowed_domain?: string
          badge_type?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          registration_number?: string
          store_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_badges_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_documents: {
        Row: {
          created_at: string
          document_type: string
          document_url: string
          id: string
          status: string | null
          store_id: string
        }
        Insert: {
          created_at?: string
          document_type: string
          document_url: string
          id?: string
          status?: string | null
          store_id: string
        }
        Update: {
          created_at?: string
          document_type?: string
          document_url?: string
          id?: string
          status?: string | null
          store_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_documents_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_registration_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
