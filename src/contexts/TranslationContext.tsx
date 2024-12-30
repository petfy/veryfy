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