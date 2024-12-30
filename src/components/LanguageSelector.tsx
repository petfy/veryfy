import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
];

export function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    detectUserLanguage();
  }, []);

  const detectUserLanguage = async () => {
    try {
      const browserLang = navigator.language.split("-")[0];
      
      // Call Google Translate API to detect language of some sample text
      const { data: { text } } = await supabase.functions.invoke('detect-language', {
        body: { text: "Welcome to our platform" }
      });

      const detectedLang = text || browserLang;
      
      // Only set if it's a supported language
      if (SUPPORTED_LANGUAGES.some(lang => lang.code === detectedLang)) {
        setCurrentLanguage(detectedLang);
      }
    } catch (error) {
      console.error("Error detecting language:", error);
    }
  };

  const handleLanguageChange = async (langCode: string) => {
    setCurrentLanguage(langCode);
    // Here you would typically update your app's translations
    // For now, we'll just log the change
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