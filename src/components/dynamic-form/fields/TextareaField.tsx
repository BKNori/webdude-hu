"use client";

import { FieldConfig } from '@/types/workflow';

interface TextareaFieldProps {
  field: FieldConfig;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function TextareaField({ field, value, onChange, error }: TextareaFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={4}
        className="w-full px-4 py-3 bg-bg-base border border-bg-elevated rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:border-transparent transition-all resize-none"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
