import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';

export const translations = {
  en,
  es,
  fr,
  de,
} as const;

export type SupportedLanguages = keyof typeof translations;
export type TranslationKey = keyof typeof en;