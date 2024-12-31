import React, { createContext, useContext, useState } from "react";
import { translations, SupportedLanguages } from "../translations";

// Create a type from all possible translation keys
export type TranslationKey = keyof typeof translations.en;

type TranslationContextType = {
  currentLanguage: SupportedLanguages;
  setCurrentLanguage: (lang: SupportedLanguages) => void;
  t: (key: TranslationKey, params?: string[]) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguages>("en");

  const t = (key: TranslationKey, params?: string[]): string => {
    let text = translations[currentLanguage]?.[key] || translations.en[key] || key;
    
    if (params) {
      params.forEach((param, index) => {
        text = text.replace(`{${index}}`, param);
      });
    }
    
    return text;
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