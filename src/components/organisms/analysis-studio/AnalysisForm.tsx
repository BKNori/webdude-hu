"use client";

import { Database, Layers, RotateCcw, SearchCheck, Sparkles } from "lucide-react";
import {
  ANALYSIS_AUDIT_MODES,
  ANALYSIS_INPUT_SOURCES,
  ANALYSIS_PRESETS,
  type AnalysisAuditMode,
  type AnalysisInputSourceId,
  type AnalysisPreset,
  type AnalysisStudioState,
} from "@/data/analysis-studio-config";

interface AnalysisFormProps {
  state: AnalysisStudioState;
  onUpdate: <K extends keyof AnalysisStudioState>(
    key: K,
    value: AnalysisStudioState[K]
  ) => void;
  onApplyPreset: (preset: AnalysisPreset) => void;
  onReset: () => void;
}

/**
 * Profi Elemzés & Audit Pro Prompt Stúdió — Bal oldali tervező űrlap (<265 sor).
 */
export default function AnalysisForm({
  state,
  onUpdate,
  onApplyPreset,
  onReset,
}: AnalysisFormProps) {
  const activeMode =
    ANALYSIS_AUDIT_MODES.find((m) => m.id === state.mode) ??
    ANALYSIS_AUDIT_MODES[0];

  return (
    <div className="space-y-6">
      {/* 1. Elemzési Presetek (6 db) */}
      <section
        aria-label="1-kattintásos Elemzési és Audit Presetek"
        className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C33]/80 p-5 space-y-3 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            1-Kattintásos Elemzési &amp; Audit Presetek (6 db)
          </span>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 rounded-full border border-slate-300 dark:border-white/15 px-3 py-1 text-[11px] font-mono text-[#334155] dark:text-slate-300 hover:border-[#0369A1] dark:hover:border-[#00B5F1] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
          >
            <RotateCcw className="w-3 h-3" aria-hidden="true" />
            Alaphelyzet
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {ANALYSIS_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset)}
              className="text-left rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 hover:border-[#0369A1] dark:hover:border-[#00B5F1]/60 p-3 transition-all cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#0F172A] dark:text-white group-hover:text-[#0369A1] dark:group-hover:text-[#00B5F1]">
                  {preset.title}
                </span>
                <span className="shrink-0 rounded-full bg-[#0369A1]/10 dark:bg-[#00B5F1]/15 px-2 py-0.5 text-[10px] font-mono font-semibold text-[#0369A1] dark:text-[#00B5F1]">
                  {preset.badge}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[#475569] dark:text-slate-300 line-clamp-2">
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 2. Elemzési Szakterület (8 db) */}
      <section
        aria-label="Elemzési Szakterület választó"
        className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C33]/80 p-5 space-y-4 shadow-sm"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            1. Elemzési Szakterület (8 Audit Keretrendszer)
          </span>
          <span className="rounded-full bg-[#7C3AED]/15 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#6D28D9] dark:text-[#A78BFA]">
            {activeMode.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ANALYSIS_AUDIT_MODES.map((m) => {
            const active = state.mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                aria-pressed={active}
                onClick={() => onUpdate("mode", m.id as AnalysisAuditMode)}
                className={`text-left rounded-2xl border p-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                  active
                    ? "border-transparent text-white bg-linear-to-r from-[#075985] to-[#5B21B6] shadow-sm"
                    : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 text-[#0F172A] dark:text-white hover:border-[#0369A1]"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold">{m.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-mono font-bold ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-[#0369A1]/10 dark:bg-[#00B5F1]/15 text-[#0369A1] dark:text-[#00B5F1]"
                    }`}
                  >
                    {m.badge}
                  </span>
                </div>
                <p
                  className={`mt-1 text-[11px] leading-snug ${
                    active ? "text-white/90" : "text-[#475569] dark:text-slate-300"
                  }`}
                >
                  {m.focusHu}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Bemeneti Forrás & Vizsgált Célpont */}
      <section
        aria-label="Bemeneti Forrás és Vizsgált Célpont"
        className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C33]/80 p-5 space-y-4 shadow-sm"
      >
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
            <SearchCheck className="w-3.5 h-3.5" aria-hidden="true" />
            2. Bemeneti Forrás Típusa (5 Forrás)
          </span>
          <div className="flex flex-wrap gap-2">
            {ANALYSIS_INPUT_SOURCES.map((src) => {
              const active = state.inputSourceId === src.id;
              return (
                <button
                  key={src.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    onUpdate("inputSourceId", src.id as AnalysisInputSourceId)
                  }
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                    active
                      ? "text-white bg-linear-to-r from-[#075985] to-[#5B21B6]"
                      : "border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] text-[#334155] dark:text-slate-300 hover:border-[#0369A1]"
                  }`}
                >
                  {src.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label
            htmlFor="analysis-target-asset"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white mb-1.5"
          >
            3. Vizsgált URL / Projekt / Versenytársak / Fájlok
          </label>
          <input
            id="analysis-target-asset"
            type="text"
            value={state.targetAsset}
            onChange={(e) => onUpdate("targetAsset", e.target.value)}
            placeholder="Pl. https://pelda.hu, csatolt UI screenshot, vagy src/app/..."
            className="w-full rounded-2xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] px-3.5 py-2 text-xs text-[#0F172A] dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
          />
        </div>

        <div>
          <label
            htmlFor="analysis-business-context"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white mb-1.5"
          >
            4. Üzleti Kontextus, Célközönség &amp; Konverziós Cél
          </label>
          <textarea
            id="analysis-business-context"
            rows={2}
            value={state.businessContext}
            onChange={(e) => onUpdate("businessContext", e.target.value)}
            placeholder="Mi az oldal/kampány fő üzleti célja, kik a célcsoport, és mi a kívánt konverzió?"
            className="w-full rounded-2xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] p-3 text-xs text-[#0F172A] dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
          />
        </div>

        <div>
          <label
            htmlFor="analysis-raw-sample"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white mb-1.5"
          >
            <Database className="w-3.5 h-3.5 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
            Beillesztett Nyers Szöveg / Kód / CSV Adatminta (Opcionális — &lt;untrusted_audit_asset&gt;)
          </label>
          <textarea
            id="analysis-raw-sample"
            rows={3}
            value={state.rawSampleData}
            onChange={(e) => onUpdate("rawSampleData", e.target.value)}
            placeholder="Ide másolhatod a vizsgálandó landing szöveget, GSC/GA4 CSV sorokat vagy kódrészletet..."
            className="w-full rounded-2xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] p-3 font-mono text-xs text-[#0F172A] dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
          />
        </div>
      </section>
    </div>
  );
}
