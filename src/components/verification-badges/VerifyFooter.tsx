import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { StoreProfileModal } from "./StoreProfileModal";
import { supabase } from "@/integrations/supabase/client";
import type { Store } from "../store-verifications/types";

interface VerifyFooterProps {
  registrationNumber: string;
  verifyUrl: string;
}

export function VerifyFooter({ registrationNumber, verifyUrl }: VerifyFooterProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [store, setStore] = useState<Store | null>(null);

  const handleCheckStore = async () => {
    if (!store) {
      try {
        const { data: badge, error: badgeError } = await supabase
          .from("verification_badges")
          .select("store_id")
          .eq("registration_number", registrationNumber)
          .maybeSingle();

        if (badgeError) {
          console.error("Error fetching badge:", badgeError);
          return;
        }

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

          if (storeData) {
            setStore(storeData);
          }
        }
      } catch (error) {
        console.error("Error in handleCheckStore:", error);
      }
    }
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center p-2 bg-gradient-to-r from-white via-green-50 to-white border-t">
        <div className="flex items-center space-x-2">
          <Check className="h-4 w-4 text-green-600" />
          <span className="text-xs font-medium text-gray-700 flex items-center">
            Verified by{' '}
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

      <StoreProfileModal
        store={store}
        isOpen={isProfileOpen}
        onOpenChange={setIsProfileOpen}
      />
    </div>
  );
}