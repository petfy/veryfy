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

export function LanguageSelector() {
  const { currentLanguage, setCurrentLanguage } = useTranslation();

  useEffect(() => {
    detectUserLanguage();
  }, []);

  const detectUserLanguage = async () => {
    try {
      const browserLang = navigator.language.split("-")[0];
      
      const { data: { text } } = await supabase.functions.invoke('detect-language', {
        body: { text: "Welcome to our platform" }
      });

      const detectedLang = text || browserLang;
      
      if (SUPPORTED_LANGUAGES.some(lang => lang.code === detectedLang)) {
        setCurrentLanguage(detectedLang as SupportedLanguages);
      }
    } catch (error) {
      console.error("Error detecting language:", error);
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