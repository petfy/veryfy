import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="animate-float mb-8 inline-block">
        <Shield className="h-20 w-20 text-primary mx-auto" />
      </div>
      <h1 className="text-6xl font-bold mb-6 text-primary">
        {t("heroTitle")}
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        {t("heroSubtitle")}
      </p>
      <div className="flex gap-4 justify-center">
        <Button size="lg">{t("getStarted")}</Button>
        <Button size="lg" variant="outline">
          {t("learnMore")}
        </Button>
      </div>
    </div>
  );
};