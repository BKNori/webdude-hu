"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { WorkflowUISchema } from "@/types/workflow";
import {
  generateZodSchema,
  checkCondition,
} from "@/lib/dynamicSchemaGenerator";
import { FieldRenderer } from "./FieldRenderer";
import { GenerationSkeleton } from "@/components/atoms/GenerationSkeleton";

interface DynamicWorkflowFormProps {
  schema: WorkflowUISchema;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  isProUser: boolean;
  dailyLimitReached?: boolean;
}

export function DynamicWorkflowForm({
  schema,
  onSubmit,
  isProUser,
  dailyLimitReached,
}: DynamicWorkflowFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showProUpsell, setShowProUpsell] = useState(false);

  const zodSchema = generateZodSchema(schema.fields);
  const form = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: schema.fields.reduce(
      (acc, field) => {
        acc[field.name] = field.defaultValue || "";
        return acc;
      },
      {} as Record<string, unknown>
    ),
  });

  const visibleFields = schema.fields.filter((field) => {
    if (!schema.conditions) return true;

    const relevantConditions = schema.conditions.filter((cond) =>
      cond.showFields.includes(field.id)
    );

    return relevantConditions.every((cond) => {
      const fieldValue = form.watch(cond.fieldId);
      return checkCondition(fieldValue, cond.operator, cond.value);
    });
  });

  const handleSubmit = async (data: Record<string, unknown>) => {
    // Rate limit ellenőrzés
    if (!isProUser && dailyLimitReached) {
      setShowProUpsell(true);
      return;
    }

    setIsGenerating(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Generálási hiba:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return <GenerationSkeleton message="AI generálás folyamatban..." />;
  }

  if (showProUpsell) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-[#00B5F1]/10 to-[#FF7A00]/10 border border-[#00B5F1]/20 rounded-2xl p-8"
      >
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-text-primary">
            Napi limit elérve 🔒
          </h3>
          <p className="text-text-secondary">
            Frissíts Pro csomagra korlátlan generálásért!
          </p>
          <button
            onClick={() => setShowProUpsell(false)}
            className="px-8 py-3 bg-linear-to-r from-[#00B5F1] to-[#FF7A00] text-white font-bold rounded-xl hover:shadow-[0_8px_32px_rgba(0,181,241,0.4)] transition-all"
          >
            Frissítés most
          </button>
          <button
            onClick={() => setShowProUpsell(false)}
            className="text-text-secondary text-sm"
          >
            Bezárás
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-bg-surface border border-bg-elevated rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary">{schema.name}</h2>
        <p className="text-text-secondary mt-2">{schema.description}</p>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {visibleFields.map((field) => (
          <FieldRenderer
            key={field.id}
            field={field}
            value={form.watch(field.name)}
            onChange={(value) => form.setValue(field.name, value)}
            error={form.formState.errors[field.name]?.message as string}
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
