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
import { cn } from "@/lib/utils";

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

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const { currentLanguage, setCurrentLanguage } = useTranslation();

  useEffect(() => {
    detectUserLanguage();
  }, []);

  const detectUserLanguage = async () => {
    try {
      // Try browser language first as it's more reliable
      const browserLang = navigator.language.split("-")[0];
      if (SUPPORTED_LANGUAGES.some(lang => lang.code === browserLang)) {
        setCurrentLanguage(browserLang as SupportedLanguages);
        return;
      }

      // Try IP API as fallback
      try {
        const response = await fetch('https://ipapi.co/json/', { 
          signal: AbortSignal.timeout(3000) // 3 second timeout
        });
        if (!response.ok) throw new Error('IP API response not ok');
        
        const data = await response.json();
        const countryCode = data.country_code;
        
        if (countryCode && COUNTRY_TO_LANGUAGE[countryCode]) {
          setCurrentLanguage(COUNTRY_TO_LANGUAGE[countryCode]);
          return;
        }
      } catch (ipError) {
        console.warn("IP detection failed, falling back to Google Translate API");
      }

      // Try Google Translate API as last resort
      try {
        const { data: { text } } = await supabase.functions.invoke('detect-language', {
          body: { text: "Welcome to our platform" }
        });

        if (text && SUPPORTED_LANGUAGES.some(lang => lang.code === text)) {
          setCurrentLanguage(text as SupportedLanguages);
          return;
        }
      } catch (translateError) {
        console.warn("Language detection failed, using default language");
      }

      // Default to English if all methods fail
      setCurrentLanguage("en");
    } catch (error) {
      console.error("Error in language detection:", error);
      setCurrentLanguage("en");
    }
  };

  const handleLanguageChange = (langCode: SupportedLanguages) => {
    setCurrentLanguage(langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("h-9 w-9 text-white hover:bg-primary/80", className)}
        >
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