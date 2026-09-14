export interface SelectOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'slider' | 'checkbox' | 'toggle';
  placeholder?: string;
  required: boolean;
  defaultValue?: unknown;
  options?: SelectOption[];
  min?: number;
  max?: number;
  step?: number;
}

export interface ConditionConfig {
  fieldId: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: unknown;
  showFields: string[];
}

export interface WorkflowUISchema {
  id: string;
  workflowId: string;
  name: string;
  description: string;
  fields: FieldConfig[];
  conditions?: ConditionConfig[];
}
