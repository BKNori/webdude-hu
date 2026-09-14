"use client";

import { FieldConfig } from '@/types/workflow';

interface ToggleFieldProps {
  field: FieldConfig;
  value: boolean;
  onChange: (value: boolean) => void;
  error?: string;
}

export function ToggleField({ field, value, onChange, error }: ToggleFieldProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-primary">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </span>
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            value ? 'bg-[#00B5F1]' : 'bg-bg-elevated'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              value ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
