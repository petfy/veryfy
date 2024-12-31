import React, { createContext, useContext, useState } from "react";
import { translations, SupportedLanguages } from "../translations";

type TranslationParams = string[] | undefined;

// Create a type that includes all possible translation keys
export type TranslationKey = keyof typeof translations.en;

type TranslationContextType = {
  currentLanguage: SupportedLanguages;
  setCurrentLanguage: (lang: SupportedLanguages) => void;
  t: (key: TranslationKey | string, params?: TranslationParams) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguages>("en");

  const t = (key: TranslationKey | string, params?: TranslationParams): string => {
    const translation = translations[currentLanguage]?.[key as TranslationKey] || 
                       translations.en[key as TranslationKey] || 
                       key;
    
    if (params) {
      return params.reduce((acc, param, index) => {
        return acc.replace(`{${index}}`, param);
      }, translation);
    }
    
    return translation;
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