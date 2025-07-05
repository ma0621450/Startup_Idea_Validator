"use client";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/FormField";
import { formFields } from "@/lib/formFields";

interface IdeaFormProps {
  form: Record<string, string>;
  errors: Partial<Record<string, string>>;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const IdeaForm = ({
  form,
  loading,
  errors,
  onChange,
  onSubmit
}: IdeaFormProps) => {
  return (
    <form onSubmit={onSubmit} className="mt-10 w-full max-w-2xl space-y-6">
      {formFields.map((field) => (
        <FormField
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          value={form[field.name]}
          onChange={onChange}
          error={errors[field.name]}
        />
      ))}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Analyzing..." : "Validate Idea"}
      </Button>
    </form>
  );
};
