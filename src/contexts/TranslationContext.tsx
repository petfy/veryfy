import React, { createContext, useContext, useState } from "react";

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    dashboard: "Dashboard",
    pendingVerifications: "Pending Verifications",
    pendingReports: "Pending Reports",
    totalStores: "Total Stores",
    storeVerifications: "Store Verifications",
    scamReports: "Scam Reports",
    signOut: "Sign Out",
    verifyLink: "Veryfy Admin",
    // Store Verifications Page
    submitVerificationRequest: "Submit Verification Request",
    verificationRequests: "Verification Requests",
    storeName: "Store Name",
    storeUrl: "Store URL",
    businessLegalName: "Business Legal Name",
    businessType: "Business Type",
    contactEmail: "Contact Email",
    businessDescription: "Business Description",
    legalDocuments: "Legal Representative Documents",
    constitutionDocuments: "Company Constitution Documents",
    submit: "Submit",
    status: "Status",
    actions: "Actions",
    view: "View",
    pending: "Pending",
    verified: "Verified",
    rejected: "Rejected",
    uploadLogo: "Upload Logo",
    verificationDetails: "Verification Details",
    documents: "Documents",
    approve: "Approve",
    reject: "Reject",
    close: "Close"
  },
  es: {
    dashboard: "Panel de Control",
    pendingVerifications: "Verificaciones Pendientes",
    pendingReports: "Reportes Pendientes",
    totalStores: "Tiendas Totales",
    storeVerifications: "Verificaciones de Tiendas",
    scamReports: "Reportes de Estafa",
    signOut: "Cerrar Sesión",
    verifyLink: "Veryfy Admin",
    // Store Verifications Page
    submitVerificationRequest: "Enviar Solicitud de Verificación",
    verificationRequests: "Solicitudes de Verificación",
    storeName: "Nombre de la Tienda",
    storeUrl: "URL de la Tienda",
    businessLegalName: "Nombre Legal del Negocio",
    businessType: "Tipo de Negocio",
    contactEmail: "Correo de Contacto",
    businessDescription: "Descripción del Negocio",
    legalDocuments: "Documentos del Representante Legal",
    constitutionDocuments: "Documentos de Constitución de la Empresa",
    submit: "Enviar",
    status: "Estado",
    actions: "Acciones",
    view: "Ver",
    pending: "Pendiente",
    verified: "Verificado",
    rejected: "Rechazado",
    uploadLogo: "Subir Logo",
    verificationDetails: "Detalles de Verificación",
    documents: "Documentos",
    approve: "Aprobar",
    reject: "Rechazar",
    close: "Cerrar"
  },
  fr: {
    dashboard: "Tableau de Bord",
    pendingVerifications: "Vérifications en Attente",
    pendingReports: "Rapports en Attente",
    totalStores: "Total des Magasins",
    storeVerifications: "Vérifications des Magasins",
    scamReports: "Rapports de Fraude",
    signOut: "Déconnexion",
    verifyLink: "Veryfy Admin",
    // Store Verifications Page
    submitVerificationRequest: "Soumettre une Demande de Vérification",
    verificationRequests: "Demandes de Vérification",
    storeName: "Nom du Magasin",
    storeUrl: "URL du Magasin",
    businessLegalName: "Nom Légal de l'Entreprise",
    businessType: "Type d'Entreprise",
    contactEmail: "Email de Contact",
    businessDescription: "Description de l'Entreprise",
    legalDocuments: "Documents du Représentant Légal",
    constitutionDocuments: "Documents de Constitution",
    submit: "Soumettre",
    status: "Statut",
    actions: "Actions",
    view: "Voir",
    pending: "En Attente",
    verified: "Vérifié",
    rejected: "Rejeté",
    uploadLogo: "Télécharger Logo",
    verificationDetails: "Détails de Vérification",
    documents: "Documents",
    approve: "Approuver",
    reject: "Rejeter",
    close: "Fermer"
  },
  de: {
    dashboard: "Übersicht",
    pendingVerifications: "Ausstehende Überprüfungen",
    pendingReports: "Ausstehende Berichte",
    totalStores: "Gesamtzahl der Geschäfte",
    storeVerifications: "Geschäftsüberprüfungen",
    scamReports: "Betrugsmeldungen",
    signOut: "Abmelden",
    verifyLink: "Veryfy Admin",
    // Store Verifications Page
    submitVerificationRequest: "Überprüfungsantrag Einreichen",
    verificationRequests: "Überprüfungsanträge",
    storeName: "Geschäftsname",
    storeUrl: "Geschäfts-URL",
    businessLegalName: "Rechtlicher Geschäftsname",
    businessType: "Geschäftsart",
    contactEmail: "Kontakt-E-Mail",
    businessDescription: "Geschäftsbeschreibung",
    legalDocuments: "Dokumente des Gesetzlichen Vertreters",
    constitutionDocuments: "Unternehmensgründungsdokumente",
    submit: "Einreichen",
    status: "Status",
    actions: "Aktionen",
    view: "Ansehen",
    pending: "Ausstehend",
    verified: "Verifiziert",
    rejected: "Abgelehnt",
    uploadLogo: "Logo Hochladen",
    verificationDetails: "Überprüfungsdetails",
    documents: "Dokumente",
    approve: "Genehmigen",
    reject: "Ablehnen",
    close: "Schließen"
  },
};

type TranslationContextType = {
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ currentLanguage, setCurrentLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}