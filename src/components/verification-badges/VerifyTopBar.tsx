import { useState, useEffect } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { StoreProfileModal } from "./StoreProfileModal";
import type { Store } from "../store-verifications/types";

interface VerifyTopBarProps {
  registrationNumber: string;
  verifyUrl: string;
  isPreview?: boolean;
}

export function VerifyTopBar({ registrationNumber, verifyUrl, isPreview = false }: VerifyTopBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    console.log("VerifyTopBar mounted with registration:", registrationNumber);
    console.log("Current profile open state:", isProfileOpen);
    
    if (!isPreview) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [isPreview]);

  const validateBadge = async () => {
    try {
      if (isPreview) {
        console.log("Using demo store data");
        setStore({
          id: "demo-id",
          user_id: "demo-user",
          name: "Demo Store",
          url: "https://demo-store.com",
          verification_status: "verified",
          created_at: "2024-01-01T00:00:00.000Z",
          updated_at: "2024-01-01T00:00:00.000Z",
          logo_url: null
        });
        return true;
      }

      // Get current domain
      const currentDomain = window.location.hostname;

      const { data: badge, error: badgeError } = await supabase
        .from("verification_badges")
        .select(`
          *,
          store:stores (
            subscription_status,
            subscription_expires_at
          )
        `)
        .eq("registration_number", registrationNumber)
        .maybeSingle();

      if (badgeError) {
        console.error("Error fetching badge:", badgeError);
        return false;
      }

      if (!badge) {
        console.error("Badge not found");
        return false;
      }

      // Check domain
      if (badge.allowed_domain && !currentDomain.includes(badge.allowed_domain)) {
        console.error("Invalid domain for badge");
        return false;
      }

      // Check expiration
      if (badge.expires_at && new Date(badge.expires_at) < new Date()) {
        console.error("Badge has expired");
        return false;
      }

      // Check subscription
      if (badge.store?.subscription_status !== 'active' || 
          (badge.store?.subscription_expires_at && 
           new Date(badge.store.subscription_expires_at) < new Date())) {
        console.error("Store subscription is inactive or expired");
        return false;
      }

      const { data: storeData, error: storeError } = await supabase
        .from("stores")
        .select("*")
        .eq("id", badge.store_id)
        .maybeSingle();

      if (storeError) {
        console.error("Error fetching store:", storeError);
        return false;
      }

      if (storeData) {
        setStore(storeData);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error in validateBadge:", error);
      return false;
    }
  };

  useEffect(() => {
    validateBadge().then(isValid => {
      if (!isValid && !isPreview) {
        setIsVisible(false);
      }
    });
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
        className="w-full bg-gradient-to-r from-white via-green-50 to-white shadow-lg"
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
      />
    </div>
  );
}