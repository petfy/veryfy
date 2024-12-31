import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
        <AlertDialogHeader>
          <AlertDialogTitle>Evidence File</AlertDialogTitle>
        </AlertDialogHeader>
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
            />
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}