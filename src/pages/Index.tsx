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
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const demoRegistrationNumber = "VF-2024-DEMO";
  const demoVerifyUrl = generateVerifyUrl(demoRegistrationNumber);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
    <div className="min-h-screen bg-white relative">
      <div className="relative z-50">
        <VerifyTopBar 
          registrationNumber={demoRegistrationNumber}
          verifyUrl={demoVerifyUrl}
          isPreview={true}
        />
      </div>
      
      {showOverlay && (
        <div className="fixed inset-0 pt-[40px] bg-black/50 z-[40] flex items-start justify-center animate-fade-in">
          <div className="relative w-full">
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-white px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce mt-8 md:mt-12">
              <span className={`text-sm md:text-lg font-semibold text-primary whitespace-nowrap`}>
                Get your official Veryfy Trust Badge
              </span>
              <ArrowUpRight className="w-4 h-4 md:w-6 md:h-6 text-primary flex-shrink-0" />
            </div>
          </div>
        </div>
      )}
      
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