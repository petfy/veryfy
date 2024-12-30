import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { VerificationFormData } from "../types";

interface BasicInfoFieldsProps {
  form: UseFormReturn<VerificationFormData>;
}

export function BasicInfoFields({ form }: BasicInfoFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="storeName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Store Name</FormLabel>
            <FormControl>
              <Input placeholder="Your store name" {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="storeUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Store URL</FormLabel>
            <FormControl>
              <Input type="url" placeholder="https://your-store.com" {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="businessName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Legal Name</FormLabel>
            <FormControl>
              <Input placeholder="Legal business name" {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="businessType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Type</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., LLC, Corporation, Sole Proprietorship"
                {...field}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="contactEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="contact@business.com" {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Tell us about your business..." {...field} required />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}