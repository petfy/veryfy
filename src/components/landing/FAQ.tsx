import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the verification process work?",
    answer: "Our verification process involves submitting your business documents, which our team reviews to verify your store's legitimacy. Once approved, you'll receive a verification badge to display on your website.",
  },
  {
    question: "What documents do I need for verification?",
    answer: "You'll need to provide business registration documents, government-issued ID, and proof of domain ownership. Additional documents may be required depending on your business type.",
  },
  {
    question: "How long does verification take?",
    answer: "The verification process typically takes 1-3 business days after all required documents are submitted. Priority verification is available for Professional and Enterprise plans.",
  },
  {
    question: "What is the customer blacklist feature?",
    answer: "The customer blacklist is a shared database of reported fraudulent customers. Verified stores can report and check customer information to prevent fraud across the platform.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Find answers to common questions about our verification service
        </p>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};