import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Copy, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateVerifyUrl } from "@/lib/verification";
import { DocumentsSection } from "@/components/verification-badges/DocumentsSection";
import { StoreDetailsSection } from "@/components/verification-badges/StoreDetailsSection";
import { BadgeCodeDisplay } from "@/components/verification-badges/BadgeCodeDisplay";
import type { Store, Document } from "./types";

interface StoreVerificationDialogProps {
  store: Store | null;
  documents: Document[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onVerificationAction: (storeId: string, status: "verified" | "rejected") => Promise<void>;
}

export function StoreVerificationDialog({
  store,
  documents,
  isOpen,
  onOpenChange,
  onVerificationAction,
}: StoreVerificationDialogProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  if (!store) return null;

  const handleCopy = async (code: string, type: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
      toast({
        title: "Success",
        description: "Code copied to clipboard",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy code",
      });
    }
  };

  const generateEmbedCode = (badge: { badge_type: string; registration_number: string; allowed_domain: string }) => {
    const verifyUrl = generateVerifyUrl(badge.registration_number);
    const type = badge.badge_type;
    
    const code = `<!-- Veryfy ${type === "topbar" ? "Top Bar" : "Footer"} Badge -->
<div id="verify-link-${type}"></div>
<script 
  src="https://veryfy.link/badge/${type}.js"
  data-registration="${badge.registration_number}"
  data-verify-url="${verifyUrl}"
  data-allowed-domain="${badge.allowed_domain}"
  async 
  defer
></script>`;

    return code;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Store Verification Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <StoreDetailsSection store={store} />
          <DocumentsSection documents={documents} />

          {store.verification_status === "verified" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Verification Badges</h3>
              <div className="grid gap-4">
                {["topbar", "footer"].map((type) => {
                  const badge = {
                    badge_type: type,
                    registration_number: "VF-2024-DEMO",
                    allowed_domain: "",
                  };
                  const code = generateEmbedCode(badge);

                  return (
                    <div key={type} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">
                          {type === "topbar" ? "Top Bar" : "Footer"} Badge
                        </h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(code, type)}
                        >
                          {copied === type ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <BadgeCodeDisplay 
                        code={code}
                        preview={<div>Badge Preview</div>}
                        title={`${type === "topbar" ? "Top Bar" : "Footer"} Badge Code`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {store.verification_status === "pending" && (
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => onVerificationAction(store.id, "rejected")}
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button onClick={() => onVerificationAction(store.id, "verified")}>
                <Check className="h-4 w-4 mr-2" />
                Verify
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}