"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  AlertCircle,
  Check,
  Copy,
  Layers,
  Loader2,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { refinePromptStudioAction } from "@/actions/prompt-studio-refine";
import type {
  CompiledPromptResult,
  PromptRefinementOutput,
  PromptStudioDomain,
} from "@/lib/prompt-engine/types";

interface LivePromptPreviewCardProps {
  compiled: CompiledPromptResult;
  domain?: PromptStudioDomain;
  brief?: string;
  enableAiRefinement?: boolean;
  negativeSectionLabel?: string;
  className?: string;
}

/**
 * Újrahasznosítható, sticky jobb oldali élő prompt-előnézeti molekula
 * (Kék-Lila v7.0, Dual Theme, WCAG AA fókusz + opcionális Groq 3 variáció).
 */
export default function LivePromptPreviewCard({
  compiled,
  domain = "online-graphics",
  brief,
  enableAiRefinement = true,
  negativeSectionLabel = "Negatív Prompt / Guardrail",
  className = "",
}: LivePromptPreviewCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [refining, setRefining] = useState(false);
  const [refineError, setRefineError] = useState("");
  const [refined, setRefined] = useState<PromptRefinementOutput | null>(null);

  const handleCopy = async (key: string, text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? null : prev));
      }, 2200);
    } catch {
      setRefineError("A vágólapra másolás nem sikerült ebben a böngészőben.");
    }
  };

  const handleRefine = async () => {
    setRefineError("");
    const currentUser = auth?.currentUser;
    if (!currentUser) {
      setRefineError("Az AI finomításhoz aktív portál-bejelentkezés szükséges.");
      return;
    }
    setRefining(true);
    try {
      const idToken = await currentUser.getIdToken(true);
      const effectiveBrief = (brief ?? "").trim() || compiled.primaryPrompt;
      const result = await refinePromptStudioAction(
        {
          domain,
          targetEngine: compiled.engineId,
          brief: effectiveBrief,
          compiledPrompt: compiled.primaryPrompt,
          negativePrompt: compiled.negativePrompt || undefined,
        },
        idToken
      );

      if (!result.success) {
        setRefineError(result.error);
      } else {
        setRefined(result.output);
      }
    } catch {
      setRefineError("Váratlan hiba történt az AI finomítás hívásakor.");
    } finally {
      setRefining(false);
    }
  };

  return (
    <motion.aside
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
      aria-label="Élő Prompt Előnézet"
      className={`lg:sticky lg:top-24 rounded-3xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#111C33]/90 p-6 shadow-[0_12px_36px_rgba(15,23,42,0.08)] dark:shadow-[0_16px_44px_rgba(0,0,0,0.45)] space-y-5 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-white/10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0369A1]/10 dark:bg-[#00B5F1]/15 border border-[#0369A1]/25 dark:border-[#00B5F1]/30 px-3 py-1 text-xs font-mono font-semibold text-[#0369A1] dark:text-[#00B5F1]">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          {compiled.engineLabel}
        </span>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#475569] dark:text-slate-300">
          <span>{compiled.stats.chars} kar.</span>
          <span aria-hidden="true">·</span>
          <span>{compiled.stats.words} szó</span>
          <span aria-hidden="true">·</span>
          <span>~{compiled.stats.estimatedTokens} token</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#475569] dark:text-slate-300">
          Élő összeállított prompt (0 ms)
        </h3>
        <pre className="max-h-72 overflow-y-auto whitespace-pre-wrap break-words rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120] p-4 text-xs sm:text-sm font-mono text-[#0F172A] dark:text-slate-100 leading-relaxed">
          {compiled.primaryPrompt || "Adj meg részleteket a bal oldali mezőkben..."}
        </pre>
      </div>

      {compiled.negativePrompt && (
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-[#6D28D9] dark:text-[#A78BFA]">
            <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
            {negativeSectionLabel}
          </span>
          <pre className="whitespace-pre-wrap break-words rounded-xl border border-violet-200 dark:border-violet-500/25 bg-violet-50/60 dark:bg-violet-950/30 p-3 text-xs font-mono text-[#334155] dark:text-slate-200 leading-relaxed">
            {compiled.negativePrompt}
          </pre>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleCopy("primary", compiled.primaryPrompt)}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
        >
          {copiedKey === "primary" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedKey === "primary" ? "Másolva!" : "Fő prompt másolása"}
        </button>

        {compiled.negativePrompt && (
          <button
            type="button"
            onClick={() => handleCopy("negative", compiled.negativePrompt)}
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-[#0F172A] dark:text-white border border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 hover:border-[#0369A1] dark:hover:border-[#00B5F1] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
          >
            {copiedKey === "negative" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Negatív másolása
          </button>
        )}

        <button
          type="button"
          onClick={() => handleCopy("all", compiled.copyAllText)}
          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-[#0F172A] dark:text-white border border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 hover:border-[#6D28D9] dark:hover:border-[#A78BFA] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
        >
          {copiedKey === "all" ? <Check className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
          Teljes csomag
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {copiedKey ? "A prompt a vágólapra másolva." : ""}
      </p>

      {enableAiRefinement && (
        <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-4">
          <button
            type="button"
            disabled={refining || !compiled.primaryPrompt.trim()}
            onClick={handleRefine}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-linear-to-r from-[#0369A1] to-[#6D28D9] hover:from-[#0284C7] hover:to-[#7C3AED] disabled:opacity-50 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
          >
            {refining ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Sparkles className="w-4 h-4" aria-hidden="true" />
            )}
            {refining ? "AI Finomítás folyamatban..." : "AI Finomítás & 3 Variáció"}
          </button>

          {refineError && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-red-300 dark:border-red-500/35 bg-red-50 dark:bg-red-950/30 p-3 text-xs text-red-700 dark:text-red-300"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{refineError}</span>
            </div>
          )}

          {refined && (
            <div className="space-y-4 pt-1">
              <div className="rounded-2xl border border-[#0369A1]/25 dark:border-[#00B5F1]/30 bg-[#EAF1FA]/60 dark:bg-[#0B1120] p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
                    Finomított Mester-Prompt
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy("refined-master", refined.refinedMasterPrompt)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0369A1] dark:text-[#00B5F1] hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
                  >
                    {copiedKey === "refined-master" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Másolás
                  </button>
                </div>
                <pre className="whitespace-pre-wrap break-words text-xs font-mono text-[#0F172A] dark:text-slate-100 leading-relaxed">
                  {refined.refinedMasterPrompt}
                </pre>
              </div>

              <div className="space-y-2.5">
                {refined.variations.map((variant, idx) => (
                  <div
                    key={`${variant.label}-${idx}`}
                    className="rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 p-3.5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#6D28D9] dark:text-[#A78BFA]">
                        {variant.label}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(`var-${idx}`, variant.prompt)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0369A1] dark:text-[#00B5F1] hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
                      >
                        {copiedKey === `var-${idx}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        Másolás
                      </button>
                    </div>
                    <p className="text-xs text-[#475569] dark:text-slate-300">
                      {variant.rationaleHu}
                    </p>
                    <pre className="whitespace-pre-wrap break-words text-[11px] font-mono text-[#0F172A] dark:text-slate-200">
                      {variant.prompt}
                    </pre>
                  </div>
                ))}
              </div>

              {refined.expertNotesHu.length > 0 && (
                <ul className="space-y-1 text-xs text-[#334155] dark:text-slate-300 list-disc pl-4">
                  {refined.expertNotesHu.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </motion.aside>
  );
}
