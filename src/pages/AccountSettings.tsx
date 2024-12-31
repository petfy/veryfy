import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/contexts/TranslationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AccountSettings() {
  const { t } = useTranslation();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, []);

  const { data: profile } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const { data: store } = useQuery({
    queryKey: ["store", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t("accountSettings")}</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("profileInformation")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">{t("fullName")}</p>
              <p>{profile?.full_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("businessName")}</p>
              <p>{profile?.business_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("businessType")}</p>
              <p>{profile?.business_type}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("subscriptionDetails")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">{t("status")}</p>
              <Badge variant={store?.subscription_status === "active" ? "default" : "destructive"}>
                {store?.subscription_status}
              </Badge>
            </div>
            {store?.subscription_expires_at && (
              <div>
                <p className="text-sm text-gray-500">{t("expiresAt")}</p>
                <p>
                  {new Date(store.subscription_expires_at).toLocaleDateString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}