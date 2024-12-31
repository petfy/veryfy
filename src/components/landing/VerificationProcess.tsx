import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";

const steps = [
  {
    titleKey: "verificationStep1Title",
    descriptionKey: "verificationStep1Description",
  },
  {
    titleKey: "verificationStep2Title",
    descriptionKey: "verificationStep2Description",
  },
  {
    titleKey: "verificationStep3Title",
    descriptionKey: "verificationStep3Description",
  },
  {
    titleKey: "verificationStep4Title",
    descriptionKey: "verificationStep4Description",
  },
];

export const VerificationProcess = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">{t("howItWorks")}</h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {t("verificationProcessSubtitle")}
        </p>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t(step.titleKey)}</h3>
              <p className="text-gray-600">{t(step.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};