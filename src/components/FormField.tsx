"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
  name: string;
  label: string;
  type: "input" | "textarea";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
}

export const FormField = ({
  name,
  label,
  type,
  placeholder,
  value,
  error,
  onChange
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block font-medium">
        {label}
      </label>
      {type === "input" ? (
        <Input
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={error ? "ring-1 ring-red-500" : ""}
        />
      ) : (
        <Textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={error ? "ring-1 ring-red-500" : ""}
        />
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
