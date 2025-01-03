import { Shield, Users, AlertTriangle, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/contexts/TranslationContext";
import type { TranslationKey } from "@/contexts/TranslationContext";

const features = [
  {
    icon: Shield,
    titleKey: "featureTitle1" as TranslationKey,
    descriptionKey: "featureDescription1" as TranslationKey,
  },
  {
    icon: Users,
    titleKey: "featureTitle2" as TranslationKey,
    descriptionKey: "featureDescription2" as TranslationKey,
  },
  {
    icon: AlertTriangle,
    titleKey: "featureTitle3" as TranslationKey,
    descriptionKey: "featureDescription3" as TranslationKey,
  },
  {
    icon: Search,
    titleKey: "featureTitle4" as TranslationKey,
    descriptionKey: "featureDescription4" as TranslationKey,
  },
];

export const Features = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">{t("features")}</h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {t("featuresSubtitle")}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6">
                <div className="mb-4">
                  <Icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(feature.titleKey)}</h3>
                <p className="text-gray-600">{t(feature.descriptionKey)}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};