"use client";

import { FieldConfig } from '@/types/workflow';

interface CheckboxFieldProps {
  field: FieldConfig;
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string;
}

export function CheckboxField({ field, value, onChange, error }: CheckboxFieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 rounded border-bg-elevated text-[#00B5F1] focus:ring-[#00B5F1] focus:ring-offset-0"
        />
        <span className="text-sm font-medium text-text-primary">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
