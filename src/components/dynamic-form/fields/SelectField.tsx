"use client";

import { FieldConfig } from '@/types/workflow';

interface SelectFieldProps {
  field: FieldConfig;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function SelectField({ field, value, onChange, error }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-bg-base border border-bg-elevated rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:border-transparent transition-all"
      >
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
