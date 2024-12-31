import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";

export const BlacklistSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-2xl p-12 text-white text-center">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="w-16 h-16" />
          </div>
          <h2 className="text-4xl font-bold mb-4">{t("blacklistTitle")}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t("blacklistDescription")}
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              {t("learnMore")}
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100">
              {t("getProtected")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};