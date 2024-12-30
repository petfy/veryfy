import { Upload } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { VerificationFormData } from "../types";

interface DocumentUploadProps {
  form: UseFormReturn<VerificationFormData>;
  name: "legalDocuments" | "constitutionDocuments";
  label: string;
}

export function DocumentUpload({ form, name, label }: DocumentUploadProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                multiple
                onChange={(e) => onChange(e.target.files)}
                {...field}
                value={undefined} // Clear the value prop to fix TypeScript error
                required
              />
              <Upload className="h-4 w-4 text-gray-400" />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}