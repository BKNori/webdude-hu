# Dinamikus Workflow Form és Sémavezérelt UI Motor
> **Rendszer:** webdude.hu B2B SaaS Platform  
> **Verzió:** v1.0  
> **Dátum:** 2026-08-09  
> **Prioritás:** P0.1 (Kritikus UI modernizáció)

---

## 🎯 PROBLÉMA DEFINÍCIÓ

A jelenlegi 120+ hardkódott generátor nehezen karbantartható, bővíthetetlen és technikai adósságot halmoz fel. Dinamikus, JSON séma-alapú UI motorra van szükség a skálázhatóság érdekében.

---

## 🏗️ ARCHITEKTÚRA

### 1. Komponens Hierarchia

```
DynamicWorkflowForm (Központi Orchestrator)
├── FieldRenderer (Dinamikus Mező Renderelő)
│   ├── TextField
│   ├── TextareaField
│   ├── SelectField
│   ├── SliderField
│   ├── CheckboxField
│   └── ToggleField
├── GenerationSkeleton (Loading State)
└── InlineProUpsell (Paywall)
```

### 2. Séma Generátor

**dynamicSchemaGenerator.ts** - Zod validáció és feltételes logika generátor

---

## 📊 DATABASE SCHEMA

### WorkflowUISchema

```typescript
interface WorkflowUISchema {
  id: string;
  workflowId: string;
  name: string;
  description: string;
  fields: FieldConfig[];
  conditions?: ConditionConfig[];
}

interface FieldConfig {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'slider' | 'checkbox' | 'toggle';
  placeholder?: string;
  required: boolean;
  defaultValue?: any;
  options?: SelectOption[];
  min?: number;
  max?: number;
  step?: number;
}

interface ConditionConfig {
  fieldId: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  value: any;
  showFields: string[];
}
```

---

## 🔧 TECHNIKAI IMPLEMENTÁCIÓ

### 1. Zod Séma Generátor

**Fájl:** `src/lib/dynamicSchemaGenerator.ts`

```typescript
import { z } from 'zod';
import { WorkflowUISchema, FieldConfig } from '@/types/workflow';

export function generateZodSchema(fields: FieldConfig[]) {
  const schema: Record<string, any> = {};

  fields.forEach(field => {
    let fieldSchema: any;

    switch (field.type) {
      case 'text':
        fieldSchema = z.string().min(1, 'Kötelező mező');
        if (field.placeholder) {
          fieldSchema = fieldSchema.max(100, 'Maximum 100 karakter');
        }
        break;
      case 'textarea':
        fieldSchema = z.string().min(1, 'Kötelező mező');
        if (field.placeholder) {
          fieldSchema = fieldSchema.max(1000, 'Maximum 1000 karakter');
        }
        break;
      case 'select':
        fieldSchema = z.string();
        if (field.options) {
          fieldSchema = fieldSchema.refine(
            val => field.options?.some(opt => opt.value === val),
            'Érvénytelen választás'
          );
        }
        break;
      case 'slider':
        fieldSchema = z.number().min(field.min || 0).max(field.max || 100);
        break;
      case 'checkbox':
        fieldSchema = z.boolean();
        break;
      case 'toggle':
        fieldSchema = z.boolean();
        break;
      default:
        fieldSchema = z.any();
    }

    if (!field.required) {
      fieldSchema = fieldSchema.optional();
    }

    schema[field.name] = fieldSchema;
  });

  return z.object(schema);
}

export function checkCondition(
  fieldValue: any,
  operator: string,
  value: any
): boolean {
  switch (operator) {
    case 'equals':
      return fieldValue === value;
    case 'not_equals':
      return fieldValue !== value;
    case 'contains':
      return String(fieldValue).includes(String(value));
    case 'greater_than':
      return Number(fieldValue) > Number(value);
    case 'less_than':
      return Number(fieldValue) < Number(value);
    default:
      return false;
  }
}
```

### 2. Field Renderer

**Fájl:** `src/components/dynamic-form/FieldRenderer.tsx`

```typescript
'use client';

import { FieldConfig } from '@/types/workflow';
import { TextField } from './fields/TextField';
import { TextareaField } from './fields/TextareaField';
import { SelectField } from './fields/SelectField';
import { SliderField } from './fields/SliderField';
import { CheckboxField } from './fields/CheckboxField';
import { ToggleField } from './fields/ToggleField';

interface FieldRendererProps {
  field: FieldConfig;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

export function FieldRenderer({ field, value, onChange, error }: FieldRendererProps) {
  switch (field.type) {
    case 'text':
      return <TextField field={field} value={value} onChange={onChange} error={error} />;
    case 'textarea':
      return <TextareaField field={field} value={value} onChange={onChange} error={error} />;
    case 'select':
      return <SelectField field={field} value={value} onChange={onChange} error={error} />;
    case 'slider':
      return <SliderField field={field} value={value} onChange={onChange} error={error} />;
    case 'checkbox':
      return <CheckboxField field={field} value={value} onChange={onChange} error={error} />;
    case 'toggle':
      return <ToggleField field={field} value={value} onChange={onChange} error={error} />;
    default:
      return null;
  }
}
```

### 3. Dynamic Workflow Form

**Fájl:** `src/components/dynamic-form/DynamicWorkflowForm.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { WorkflowUISchema } from '@/types/workflow';
import { generateZodSchema, checkCondition } from '@/lib/dynamicSchemaGenerator';
import { FieldRenderer } from './FieldRenderer';
import { GenerationSkeleton } from '@/components/atoms/GenerationSkeleton';
import { InlineProUpsell } from '@/components/molecules/InlineProUpsell';

interface DynamicWorkflowFormProps {
  schema: WorkflowUISchema;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  isProUser: boolean;
}

export function DynamicWorkflowForm({ schema, onSubmit, isProUser }: DynamicWorkflowFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showProUpsell, setShowProUpsell] = useState(false);
  
  const zodSchema = generateZodSchema(schema.fields);
  const form = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: schema.fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || '';
      return acc;
    }, {} as Record<string, any>)
  });

  const visibleFields = schema.fields.filter(field => {
    if (!schema.conditions) return true;
    
    const relevantConditions = schema.conditions.filter(
      cond => cond.showFields.includes(field.id)
    );
    
    return relevantConditions.every(cond => {
      const fieldValue = form.watch(cond.fieldId);
      return checkCondition(fieldValue, cond.operator, cond.value);
    });
  });

  const handleSubmit = async (data: Record<string, any>) => {
    // Rate limit ellenőrzés
    if (!isProUser && !checkDailyLimit()) {
      setShowProUpsell(true);
      return;
    }

    setIsGenerating(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Generálási hiba:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return <GenerationSkeleton />;
  }

  if (showProUpsell) {
    return <InlineProUpsell onClose={() => setShowProUpsell(false)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-bg-surface border border-bg-elevated rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {visibleFields.map(field => (
          <FieldRenderer
            key={field.id}
            field={field}
            value={form.watch(field.name)}
            onChange={(value) => form.setValue(field.name, value)}
            error={form.formState.errors[field.name]?.message}
          />
        ))}
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full px-8 py-4 bg-linear-to-r from-[#00B5F1] to-[#FF7A00] text-white font-bold rounded-xl hover:shadow-[0_8px_32px_rgba(0,181,241,0.4)] transition-all"
        >
          Generálás indítása
        </motion.button>
      </form>
    </motion.div>
  );
}
```

---

## 🎨 UX/UI KOMPONENSEK

### Inline Pro Upsell

**Fájl:** `src/components/molecules/InlineProUpsell.tsx`

```typescript
'use client';

import { motion } from 'motion/react';

interface InlineProUpsellProps {
  onClose: () => void;
}

export function InlineProUpsell({ onClose }: InlineProUpsellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-[#00B5F1]/10 to-[#FF7A00]/10 border border-[#00B5F1]/20 rounded-2xl p-8"
    >
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-text-primary">
          Napi limit elérve 🔒
        </h3>
        <p className="text-text-secondary">
          Frissíts Pro csomagra korlátlan generálásért!
        </p>
        <button className="px-8 py-3 bg-linear-to-r from-[#00B5F1] to-[#FF7A00] text-white font-bold rounded-xl">
          Frissítés most
        </button>
        <button onClick={onClose} className="text-text-secondary text-sm">
          Bezárás
        </button>
      </div>
    </motion.div>
  );
}
```

---

## 📈 PERFORMANCE MÉRIKÖK

- **Form Render:** < 100ms
- **Validáció:** < 50ms
- **Feltételes Mezőlogika:** < 30ms
- **Összesített Latency:** < 200ms

---

## 🚀 DEPLOYMENT UTASÍTÁSOK

1. **Komponensek létrehozása:**
   - `src/components/dynamic-form/` mappa
   - `src/lib/dynamicSchemaGenerator.ts`

2. **Workflow sémák feltöltése:**
   - Firestore `workflow_schemas` kollekció
   - JSON formátumú UI sémák

3. **Régi generátorok átírása:**
   - Hardkódott komponensek cseréje
   - Dinamikus form integráció

---

## 📝 CHANGELOG

- **v1.0 (2026-08-09):** Dinamikus Workflow Form architektúra tervezet és dokumentáció létrehozva
