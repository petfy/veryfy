import { useEffect } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/contexts/TranslationContext";
import { SupportedLanguages } from "@/translations";

const SUPPORTED_LANGUAGES = [
  { code: "en" as const, name: "English" },
  { code: "es" as const, name: "Español" },
  { code: "fr" as const, name: "Français" },
  { code: "de" as const, name: "Deutsch" },
] as const;

const COUNTRY_TO_LANGUAGE: { [key: string]: SupportedLanguages } = {
  US: "en",
  GB: "en",
  ES: "es",
  MX: "es",
  AR: "es",
  FR: "fr",
  DE: "de",
  AT: "de",
  CH: "de",
};

export function LanguageSelector() {
  const { currentLanguage, setCurrentLanguage } = useTranslation();

  useEffect(() => {
    detectUserLanguage();
  }, []);

  const detectUserLanguage = async () => {
    try {
      // First try to get user's country from IP
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const countryCode = data.country_code;
      
      // If we have a matching language for the country, use it
      if (countryCode && COUNTRY_TO_LANGUAGE[countryCode]) {
        setCurrentLanguage(COUNTRY_TO_LANGUAGE[countryCode]);
        return;
      }

      // Fallback to browser language if no country match
      const browserLang = navigator.language.split("-")[0];
      
      // Verify if browser language is supported
      if (SUPPORTED_LANGUAGES.some(lang => lang.code === browserLang)) {
        setCurrentLanguage(browserLang as SupportedLanguages);
        return;
      }

      // If all else fails, try Google Translate API
      const { data: { text } } = await supabase.functions.invoke('detect-language', {
        body: { text: "Welcome to our platform" }
      });

      if (text && SUPPORTED_LANGUAGES.some(lang => lang.code === text)) {
        setCurrentLanguage(text as SupportedLanguages);
      }
    } catch (error) {
      console.error("Error detecting language:", error);
      // Fallback to English if everything fails
      setCurrentLanguage("en");
    }
  };

  const handleLanguageChange = async (langCode: SupportedLanguages) => {
    setCurrentLanguage(langCode);
    console.log(`Language changed to: ${langCode}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={currentLanguage === lang.code ? "bg-accent" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}