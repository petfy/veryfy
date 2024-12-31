import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface EvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  evidenceUrl: string;
}

export function EvidenceModal({ isOpen, onClose, evidenceUrl }: EvidenceModalProps) {
  const fileType = evidenceUrl?.split('.').pop()?.toLowerCase();
  const isPDF = fileType === 'pdf';

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-3xl max-h-[80vh]">
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle>Evidence File</AlertDialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </AlertDialogHeader>
        <AlertDialogDescription>
          View the uploaded evidence file below
        </AlertDialogDescription>
        <div className="overflow-auto">
          {isPDF ? (
            <iframe
              src={evidenceUrl}
              className="w-full h-[60vh]"
              title="Evidence PDF"
            />
          ) : (
            <img
              src={evidenceUrl}
              alt="Evidence"
              className="max-w-full h-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
                target.alt = 'Error loading evidence';
              }}
            />
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}