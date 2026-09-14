"use client";

import { FieldConfig } from '@/types/workflow';
import { TextField } from './fields/TextField';
import { TextareaField } from './fields/TextareaField';
import { SelectField } from './fields/SelectField';
import { SliderField } from './fields/SliderField';
import { CheckboxField } from './fields/CheckboxField';
import { ToggleField } from './fields/ToggleField';

interface FieldRendererProps {
  field: FieldConfig;
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}

export function FieldRenderer({ field, value, onChange, error }: FieldRendererProps) {
  switch (field.type) {
    case 'text':
      return <TextField field={field} value={value as string} onChange={onChange} error={error} />;
    case 'textarea':
      return <TextareaField field={field} value={value as string} onChange={onChange} error={error} />;
    case 'select':
      return <SelectField field={field} value={value as string} onChange={onChange} error={error} />;
    case 'slider':
      return <SliderField field={field} value={value as number} onChange={onChange} error={error} />;
    case 'checkbox':
      return <CheckboxField field={field} value={value as boolean} onChange={onChange} error={error} />;
    case 'toggle':
      return <ToggleField field={field} value={value as boolean} onChange={onChange} error={error} />;
    default:
      return null;
  }
}
