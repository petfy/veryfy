export interface Store {
  id: string;
  name: string;
  url: string;
  verification_status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  logo_url?: string;
}

export interface Document {
  id: string;
  store_id: string;
  document_type: string;
  document_url: string;
  status: string;
}

export interface VerificationFormData {
  storeName: string;
  storeUrl: string;
  businessName: string;
  businessType: string;
  contactEmail: string;
  description: string;
  logo?: File;
  legalDocuments?: FileList;
  constitutionDocuments?: FileList;
}