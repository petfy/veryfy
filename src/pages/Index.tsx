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
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const demoRegistrationNumber = "VF-2024-DEMO";
  const demoVerifyUrl = generateVerifyUrl(demoRegistrationNumber);

  useEffect(() => {
    // Initialize Supabase auth state
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        // If no session exists, clear any stale auth data
        if (!session) {
          await supabase.auth.signOut();
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // If there's an error, ensure we clear any invalid auth state
        await supabase.auth.signOut();
      }
    };

    initializeAuth();

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