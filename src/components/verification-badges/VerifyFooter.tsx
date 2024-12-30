import { Check, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { StoreProfileModal } from "./StoreProfileModal";
import { supabase } from "@/integrations/supabase/client";
import type { Store } from "../store-verifications/types";

interface VerifyFooterProps {
  registrationNumber: string;
  verifyUrl: string;
  isPreview?: boolean;
}

export function VerifyFooter({ registrationNumber, verifyUrl, isPreview = false }: VerifyFooterProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    console.log("VerifyFooter mounted with registration:", registrationNumber);
    console.log("Current profile open state:", isProfileOpen);
    
    if (!isPreview) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [isPreview]);

  const fetchStoreProfile = async () => {
    try {
      console.log("Fetching store profile for registration:", registrationNumber);
      
      if (isPreview) {
        console.log("Using demo store data");
        setStore({
          id: "demo-id",
          user_id: "demo-user",
          name: "Demo Store",
          url: "https://demo-store.com",
          verification_status: "verified",
          created_at: "2024-01-01T00:00:00.000Z",
          updated_at: "2024-01-01T00:00:00.000Z", // Added updated_at property
          logo_url: null
        });
        return;
      }

      const { data: badge, error: badgeError } = await supabase
        .from("verification_badges")
        .select("store_id")
        .eq("registration_number", registrationNumber)
        .maybeSingle();

      if (badgeError) {
        console.error("Error fetching badge:", badgeError);
        return;
      }

      console.log("Badge data:", badge);

      if (badge?.store_id) {
        const { data: storeData, error: storeError } = await supabase
          .from("stores")
          .select("*")
          .eq("id", badge.store_id)
          .maybeSingle();

        if (storeError) {
          console.error("Error fetching store:", storeError);
          return;
        }

        console.log("Store data:", storeData);

        if (storeData) {
          setStore(storeData);
        }
      }
    } catch (error) {
      console.error("Error in fetchStoreProfile:", error);
    }
  };

  useEffect(() => {
    fetchStoreProfile();
  }, [isPreview, registrationNumber]);

  const handleCheckStore = () => {
    console.log("Check store clicked, current state:", isProfileOpen);
    setIsProfileOpen(!isProfileOpen);
    console.log("New state will be:", !isProfileOpen);
  };

  if (!isVisible) return null;

  return (
    <div className="relative">
      <div 
        className="w-full bg-gradient-to-r from-white via-green-50 to-white shadow-lg border-t"
        style={{
          height: '40px',
          transition: 'all 0.3s ease',
          animation: !isPreview ? 'fadeOut 0.5s ease-out 20s forwards' : undefined,
          zIndex: 50
        }}
      >
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>

        <div className="max-w-4xl mx-auto h-full flex items-center justify-center px-4">
          <div className="flex items-center space-x-2 animate-slide-in-left">
            <Check className="h-4 w-4 text-green-600 opacity-0 animate-appear" />
            <span className="text-xs font-medium text-gray-700 opacity-0 animate-appear flex items-center flex-wrap">
              <span className="whitespace-nowrap">Verified Official Store by{' '}</span>
              <a 
                href="https://veryfy.link" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-green-600 hover:text-green-800 transition-colors duration-300 mx-1"
              >
                Veryfy
              </a>
              <span className="text-gray-500 flex items-center">
                <ShoppingBag className="h-4 w-4 mx-1 text-blue-600" />
                <button
                  onClick={handleCheckStore}
                  className="text-blue-600 hover:text-blue-800 text-xs"
                >
                  Check Store
                </button>
              </span>
            </span>
          </div>
        </div>
      </div>

      <StoreProfileModal
        store={store}
        isOpen={isProfileOpen}
        onOpenChange={setIsProfileOpen}
        isPreview={isPreview}
        position="bottom"
      />
    </div>
  );
}