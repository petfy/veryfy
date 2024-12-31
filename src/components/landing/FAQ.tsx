import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/contexts/TranslationContext";

const faqs = [
  {
    questionKey: "faqQuestion1",
    answerKey: "faqAnswer1",
  },
  {
    questionKey: "faqQuestion2",
    answerKey: "faqAnswer2",
  },
  {
    questionKey: "faqQuestion3",
    answerKey: "faqAnswer3",
  },
  {
    questionKey: "faqQuestion4",
    answerKey: "faqAnswer4",
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