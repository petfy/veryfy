import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/contexts/TranslationContext";
import type { TranslationKey } from "@/contexts/TranslationContext";

const faqs = [
  {
    questionKey: "faqQuestion1" as TranslationKey,
    answerKey: "faqAnswer1" as TranslationKey,
  },
  {
    questionKey: "faqQuestion2" as TranslationKey,
    answerKey: "faqAnswer2" as TranslationKey,
  },
  {
    questionKey: "faqQuestion3" as TranslationKey,
    answerKey: "faqAnswer3" as TranslationKey,
  },
  {
    questionKey: "faqQuestion4" as TranslationKey,
    answerKey: "faqAnswer4" as TranslationKey,
  },
];

export const FAQ = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          {t("faq")}
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {t("faqSubtitle")}
        </p>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{t(faq.questionKey)}</AccordionTrigger>
                <AccordionContent>{t(faq.answerKey)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};