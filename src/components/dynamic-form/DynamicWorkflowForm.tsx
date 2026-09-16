"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Copy, Check, AlertCircle } from "lucide-react";
import { WorkflowUISchema } from "@/types/workflow";
import {
  generateZodSchema,
  checkCondition,
} from "@/lib/dynamicSchemaGenerator";
import { FieldRenderer } from "./FieldRenderer";
import { GenerationSkeleton } from "@/components/atoms/GenerationSkeleton";
import { useCreateGeneration } from "@/hooks/useCreateGeneration";

interface DynamicWorkflowFormProps {
  schema: WorkflowUISchema;
  /**
   * Opcionális külső handler. Ha nincs megadva, a form a beépített
   * createGeneration Server Actiont hívja (ID token átadással) és
   * a useGenerationPolling-en keresztül rendereli az eredményt.
   */
  onSubmit?: (data: Record<string, unknown>) => Promise<void>;
  isProUser: boolean;
  dailyLimitReached?: boolean;
}

export function DynamicWorkflowForm({
  schema,
  onSubmit,
  isProUser,
  dailyLimitReached,
}: DynamicWorkflowFormProps) {
  const [showProUpsell, setShowProUpsell] = useState(false);
  const [copied, setCopied] = useState(false);

  const generation = useCreateGeneration();

  const handleSubmitExternal = async (data: Record<string, unknown>) => {
    if (onSubmit) {
      await onSubmit(data);
      return;
    }
    // Beépített lánc: createGeneration Server Action + ID token + polling
    await generation.start(schema.workflowId || schema.id, data);
  };

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

  // React Compiler-kompatibilis figyelés (a watch() nem memoizálható biztonságosan)
  const watchedValues = useWatch({ control: form.control }) as Record<
    string,
    unknown
  >;

  const visibleFields = schema.fields.filter((field) => {
    if (!schema.conditions) return true;

    const relevantConditions = schema.conditions.filter((cond) =>
      cond.showFields.includes(field.id)
    );

    return relevantConditions.every((cond) => {
      const fieldValue = watchedValues?.[cond.fieldId];
      return checkCondition(fieldValue, cond.operator, cond.value);
    });
  });

  const handleSubmit = async (data: Record<string, unknown>) => {
    // Rate limit ellenőrzés
    if (!isProUser && dailyLimitReached) {
      setShowProUpsell(true);
      return;
    }
    try {
      await handleSubmitExternal(data);
    } catch (error) {
      console.error("Generálási hiba:", error);
    }
  };

  if (generation.busy) {
    return <GenerationSkeleton message="AI generálás folyamatban..." />;
  }

  if (showProUpsell) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-[#00B5F1]/10 to-[#7C3AED]/10 border border-[#00B5F1]/20 rounded-2xl p-8"
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
            className="px-8 py-3 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] text-slate-950 font-bold rounded-xl hover:shadow-[0_8px_32px_rgba(0, 181, 241,0.4)] transition-all"
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
            value={watchedValues?.[field.name] ?? ""}
            onChange={(value) => form.setValue(field.name, value)}
            error={form.formState.errors[field.name]?.message as string}
          />
        ))}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] text-white font-bold rounded-xl hover:shadow-[0_8px_32px_rgba(91,33,182,0.45)] transition-all"
        >
          Generálás indítása
        </motion.button>
      </form>

      {/* Hiba — Server Action vagy polling szintű */}
      {generation.error && (
        <div className="mt-6 flex items-start gap-3 border border-red-500/40 bg-red-500/10 rounded-xl p-4">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden />
          <p className="text-sm text-red-300">{generation.error}</p>
        </div>
      )}

      {/* Eredmény — csak a beépített createGeneration lánc esetén */}
      {!onSubmit && generation.status === "completed" && generation.result != null && (
        <div className="mt-6 border border-[#00B5F1]/30 bg-slate-950/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00B5F1]">
              Generálás eredménye
            </span>
            <button
              type="button"
              onClick={async () => {
                const text =
                  typeof generation.result === "string"
                    ? generation.result
                    : JSON.stringify(generation.result, null, 2);
                await navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-[#00B5F1] transition-colors"
              aria-label="Eredmény vágólapra másolása"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" aria-hidden />
              ) : (
                <Copy className="w-4 h-4" aria-hidden />
              )}
              {copied ? "Másolva" : "Másolás"}
            </button>
          </div>
          <pre className="whitespace-pre-wrap text-sm text-slate-200 leading-relaxed font-sans max-h-96 overflow-y-auto">
            {typeof generation.result === "string"
              ? generation.result
              : JSON.stringify(generation.result, null, 2)}
          </pre>
        </div>
      )}
    </motion.div>
  );
}
