import React, { createContext, useContext, useState } from "react";
import { translations, SupportedLanguages, TranslationKey } from "../translations";

type TranslationContextType = {
  currentLanguage: SupportedLanguages;
  setCurrentLanguage: (lang: SupportedLanguages) => void;
  t: (key: TranslationKey) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguages>("en");

  const t = (key: TranslationKey): string => {
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