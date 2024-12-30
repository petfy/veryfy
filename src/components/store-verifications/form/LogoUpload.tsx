import { ImagePlus } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { VerificationFormData } from "../types";

interface LogoUploadProps {
  form: UseFormReturn<VerificationFormData>;
  logoPreview: string | null;
  onLogoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LogoUpload({ form, logoPreview, onLogoChange }: LogoUploadProps) {
  return (
    <div className="space-y-4">
      <FormLabel>Store Logo</FormLabel>
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
          {logoPreview ? (
            <img src={logoPreview} alt="Logo preview" className="h-full w-full object-cover" />
          ) : (
            <ImagePlus className="h-8 w-8 text-gray-400" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={onLogoChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Upload your store logo</p>
          <p>Recommended size: 512x512px</p>
        </div>
      </div>
    </div>
  );
}