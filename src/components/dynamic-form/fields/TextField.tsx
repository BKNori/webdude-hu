"use client";

import { FieldConfig } from '@/types/workflow';

interface TextFieldProps {
  field: FieldConfig;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function TextField({ field, value, onChange, error }: TextFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="w-full px-4 py-3 bg-bg-base border border-bg-elevated rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:border-transparent transition-all"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
