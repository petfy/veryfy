import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { VerifyTopBar, VerifyFooter } from "@/components/verification-badges";
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

const Index = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const demoRegistrationNumber = "VF-2024-DEMO";
  const demoVerifyUrl = generateVerifyUrl(demoRegistrationNumber);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

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
          <div className="relative w-full px-4 flex justify-center">
            <div className="bg-white px-3 md:px-6 py-2 md:py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce mt-8 md:mt-12">
              <span className="text-xs md:text-lg font-semibold text-primary whitespace-nowrap">
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
      
      <VerifyFooter
        registrationNumber={demoRegistrationNumber}
        verifyUrl={demoVerifyUrl}
        isPreview={true}
      />
    </div>
  );
};

export default Index;