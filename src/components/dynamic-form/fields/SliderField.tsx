"use client";

import { FieldConfig } from '@/types/workflow';

interface SliderFieldProps {
  field: FieldConfig;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export function SliderField({ field, value, onChange, error }: SliderFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="range"
        min={field.min || 0}
        max={field.max || 100}
        step={field.step || 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-bg-elevated rounded-lg appearance-none cursor-pointer accent-[#00B5F1]"
      />
      <div className="flex justify-between text-xs text-text-secondary">
        <span>{field.min || 0}</span>
        <span>{value}</span>
        <span>{field.max || 100}</span>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
