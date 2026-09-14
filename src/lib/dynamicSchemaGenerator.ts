import { z } from "zod";
import { FieldConfig } from "@/types/workflow";

export function generateZodSchema(fields: FieldConfig[]) {
  const schema: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case "text":
        fieldSchema = z.string();
        if (field.required) {
          fieldSchema = (fieldSchema as z.ZodString).min(1, "Kötelező mező");
        }
        if (field.placeholder) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            100,
            "Maximum 100 karakter"
          );
        }
        break;
      case "textarea":
        fieldSchema = z.string();
        if (field.required) {
          fieldSchema = (fieldSchema as z.ZodString).min(1, "Kötelező mező");
        }
        if (field.placeholder) {
          fieldSchema = (fieldSchema as z.ZodString).max(
            1000,
            "Maximum 1000 karakter"
          );
        }
        break;
      case "select":
        fieldSchema = z.string();
        if (field.options) {
          fieldSchema = fieldSchema.refine(
            (val) => field.options?.some((opt) => opt.value === val),
            "Érvénytelen választás"
          );
        }
        break;
      case "slider":
        fieldSchema = z.number();
        if (field.min !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).min(field.min);
        }
        if (field.max !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).max(field.max);
        }
        break;
      case "checkbox":
        fieldSchema = z.boolean();
        break;
      case "toggle":
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
  fieldValue: unknown,
  operator: string,
  value: unknown
): boolean {
  switch (operator) {
    case "equals":
      return fieldValue === value;
    case "not_equals":
      return fieldValue !== value;
    case "contains":
      return String(fieldValue).includes(String(value));
    case "greater_than":
      return Number(fieldValue) > Number(value);
    case "less_than":
      return Number(fieldValue) < Number(value);
    default:
      return false;
  }
}
