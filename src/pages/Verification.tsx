import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Store } from "@/components/store-verifications/types";
import { StoreProfileModal } from "@/components/verification-badges/StoreProfileModal";

export default function Verification() {
  const { registrationNumber } = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const { data: badge, error: badgeError } = await supabase
          .from("verification_badges")
          .select(`
            *,
            store:stores (
              id,
              name,
              url,
              logo_url,
              verification_status,
              created_at,
              updated_at,
              user_id,
              subscription_status,
              subscription_expires_at
            )
          `)
          .eq("registration_number", registrationNumber)
          .single();

        if (badgeError) throw badgeError;
        if (!badge?.store) throw new Error("Store not found");

        // Check if store subscription is active
        const store = badge.store;
        if (store.subscription_status !== 'active' || 
            (store.subscription_expires_at && new Date(store.subscription_expires_at) < new Date())) {
          throw new Error("Store subscription is inactive or expired");
        }

        // Check if badge is active and not expired
        if (!badge.is_active || (badge.expires_at && new Date(badge.expires_at) < new Date())) {
          throw new Error("Badge is inactive or expired");
        }

        setStore(store);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (registrationNumber) {
      fetchStoreData();
    }
  }, [registrationNumber]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <StoreProfileModal
        store={store}
        isOpen={true}
        onOpenChange={() => {}}
        isPreview={false}
      />
    </div>
  );
}