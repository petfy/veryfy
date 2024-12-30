import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "Submit Documents",
    description: "Upload your business registration and identity documents securely.",
  },
  {
    title: "Verification Review",
    description: "Our team reviews your documents and verifies your business information.",
  },
  {
    title: "Get Verified Badge",
    description: "Once approved, receive your verification badge to display on your store.",
  },
  {
    title: "Build Trust",
    description: "Show customers your store is legitimate and trustworthy.",
  },
];

export const VerificationProcess = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Get your store verified in four simple steps
        </p>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};