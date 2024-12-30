import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { PricingCard } from "@/components/PricingCard";
import { VerifyTopBar } from "@/components/verification-badges";
import { VerifyFooter as VerifyBadgeFooter } from "@/components/verification-badges";
import { generateVerifyUrl } from "@/lib/verification";
import { BrandCarousel } from "@/components/landing/BrandCarousel";
import { CustomerStories } from "@/components/landing/CustomerStories";
import { VerificationProcess } from "@/components/landing/VerificationProcess";
import { Features } from "@/components/landing/Features";
import { FAQ } from "@/components/landing/FAQ";
import { BlacklistSection } from "@/components/landing/BlacklistSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  const demoRegistrationNumber = "VF-2024-DEMO";
  const demoVerifyUrl = generateVerifyUrl(demoRegistrationNumber);

  const plans = [
    {
      title: "Basic",
      price: "29",
      features: [
        "Store Verification Badge",
        "Basic WHOIS Lookup",
        "Email Support",
        "Basic Analytics",
      ],
    },
    {
      title: "Professional",
      price: "79",
      features: [
        "Everything in Basic",
        "Priority Verification",
        "Advanced WHOIS Tools",
        "Priority Support",
        "Detailed Analytics",
      ],
      recommended: true,
    },
    {
      title: "Enterprise",
      price: "199",
      features: [
        "Everything in Professional",
        "Custom Badge Design",
        "API Access",
        "Dedicated Support",
        "Advanced Reporting",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <VerifyTopBar 
        registrationNumber={demoRegistrationNumber}
        verifyUrl={demoVerifyUrl}
        isPreview={true}
      />
      <Navbar />
      <Hero />
      <BrandCarousel />
      <CustomerStories />
      <VerificationProcess />
      <Features />
      
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <PricingCard key={plan.title} {...plan} />
            ))}
          </div>
        </div>
      </section>

      <BlacklistSection />
      <FAQ />
      <Footer />
      
      <VerifyBadgeFooter
        registrationNumber={demoRegistrationNumber}
        verifyUrl={demoVerifyUrl}
        isPreview={true}
      />
    </div>
  );
};

export default Index;