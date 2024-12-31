import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "@/contexts/TranslationContext";

export const Navbar = () => {
  const { t } = useTranslation();
  
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          <Shield className="inline-block w-5 h-5 mr-2 text-primary" /> Veryfy
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Link to="/login">
            <Button variant="outline">{t("login")}</Button>
          </Link>
          <Link to="/register">
            <Button>{t("register")}</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};