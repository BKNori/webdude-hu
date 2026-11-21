"use client";

import { Bot, Gauge, GitBranch, ShieldCheck } from "lucide-react";
import {
  LLM_TARGET_ENGINE_CHIPS,
  type LlmTargetEngine,
} from "@/lib/prompt-engine";
import {
  ANALYSIS_GUARDRAILS,
  ANALYSIS_PRIORITY_FRAMEWORKS,
  ANALYSIS_WORKFLOW_MODES,
  STRICT_AUDIT_DEFAULT_GUARDRAILS,
  type AnalysisGuardrailId,
  type AnalysisPriorityFrameworkId,
  type AnalysisStudioState,
  type AnalysisWorkflowModeId,
} from "@/data/analysis-studio-config";

interface AnalysisTechPanelProps {
  state: AnalysisStudioState;
  onUpdate: <K extends keyof AnalysisStudioState>(
    key: K,
    value: AnalysisStudioState[K]
  ) => void;
}

/**
 * Profi Elemzés & Audit Pro Prompt Stúdió — Cél-LLM, Prioritási Mátrix & Guardrail panel (<265 sor).
 */
export default function AnalysisTechPanel({
  state,
  onUpdate,
}: AnalysisTechPanelProps) {
  const toggleGuardrail = (id: AnalysisGuardrailId) => {
    const exists = state.guardrailIds.includes(id);
    const next = exists
      ? state.guardrailIds.filter((item) => item !== id)
      : [...state.guardrailIds, id];
    onUpdate("guardrailIds", next);
  };

  const selectAllGuardrails = () => {
    onUpdate(
      "guardrailIds",
      ANALYSIS_GUARDRAILS.map((g) => g.id)
    );
  };

  const selectStrictProfile = () => {
    onUpdate("guardrailIds", [...STRICT_AUDIT_DEFAULT_GUARDRAILS]);
  };

  return (
    <div className="space-y-6">
      {/* 5. Cél-LLM Motor (4 db) */}
      <section
        aria-label="Cél-LLM Elemző Motor"
        className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C33]/80 p-5 space-y-3 shadow-sm"
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
          <Bot className="w-3.5 h-3.5" aria-hidden="true" />
          5. Cél-LLM / Elemző Motor Szintaxis
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {LLM_TARGET_ENGINE_CHIPS.map((eng) => {
            const active = state.engine === eng.id;
            return (
              <button
                key={eng.id}
                type="button"
                aria-pressed={active}
                onClick={() => onUpdate("engine", eng.id as LlmTargetEngine)}
                className={`text-left rounded-2xl border p-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                  active
                    ? "border-transparent text-white bg-linear-to-r from-[#075985] to-[#5B21B6] shadow-sm"
                    : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 text-[#0F172A] dark:text-white hover:border-[#0369A1]"
                }`}
              >
                <div className="text-xs font-bold">{eng.label}</div>
                <div
                  className={`mt-0.5 text-[11px] ${
                    active ? "text-white/90" : "text-[#475569] dark:text-slate-300"
                  }`}
                >
                  {eng.shortHint}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. Prioritási Keretrendszer (4 db) & Workflow Mód (4 db) */}
      <section
        aria-label="Prioritási Keretrendszer és Workflow Láncolás"
        className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C33]/80 p-5 space-y-4 shadow-sm"
      >
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
            <Gauge className="w-3.5 h-3.5" aria-hidden="true" />
            6. Prioritási &amp; Pontozási Keretrendszer (ICE / RICE / P0–P3)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ANALYSIS_PRIORITY_FRAMEWORKS.map((pf) => {
              const active = state.priorityFrameworkId === pf.id;
              return (
                <button
                  key={pf.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    onUpdate(
                      "priorityFrameworkId",
                      pf.id as AnalysisPriorityFrameworkId
                    )
                  }
                  className={`text-left rounded-2xl border p-2.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                    active
                      ? "border-transparent text-white bg-linear-to-r from-[#075985] to-[#5B21B6]"
                      : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 text-[#0F172A] dark:text-white hover:border-[#0369A1]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold">{pf.label}</span>
                    <span className="text-[10px] font-mono font-bold opacity-85">
                      {pf.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
            <GitBranch className="w-3.5 h-3.5" aria-hidden="true" />
            Workflow &amp; Prompt-Láncolás Mód
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ANALYSIS_WORKFLOW_MODES.map((wf) => {
              const active = state.workflowModeId === wf.id;
              return (
                <button
                  key={wf.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    onUpdate("workflowModeId", wf.id as AnalysisWorkflowModeId)
                  }
                  className={`text-left rounded-2xl border p-2.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                    active
                      ? "border-transparent text-white bg-linear-to-r from-[#075985] to-[#5B21B6]"
                      : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 text-[#0F172A] dark:text-white hover:border-[#0369A1]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold">{wf.label}</span>
                    <span className="text-[10px] font-mono font-bold opacity-85">
                      {wf.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Bizonyíték-kényszer & Anti-Hallucináció Guardrail-ek (8 db) */}
      <section
        aria-label="Bizonyíték-kényszer és Anti-Hallucináció fékek"
        className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C33]/80 p-5 space-y-4 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            7. Bizonyíték-Kényszer &amp; Anti-Hallucináció ({state.guardrailIds.length}/8)
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={selectStrictProfile}
              className="rounded-full border border-slate-300 dark:border-white/15 px-2.5 py-1 text-[10px] font-mono font-semibold text-[#0369A1] dark:text-[#00B5F1] hover:border-[#0369A1] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
            >
              Szigorú Audit Profil
            </button>
            <button
              type="button"
              onClick={selectAllGuardrails}
              className="rounded-full border border-slate-300 dark:border-white/15 px-2.5 py-1 text-[10px] font-mono font-semibold text-[#334155] dark:text-slate-300 hover:border-[#0369A1] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
            >
              Összes (8)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ANALYSIS_GUARDRAILS.map((g) => {
            const active = state.guardrailIds.includes(g.id);
            return (
              <button
                key={g.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleGuardrail(g.id)}
                className={`text-left rounded-2xl border p-2.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                  active
                    ? "border-transparent text-white bg-linear-to-r from-[#075985] to-[#5B21B6]"
                    : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 text-[#0F172A] dark:text-white hover:border-[#0369A1]"
                }`}
              >
                <div className="text-xs font-bold">{g.label}</div>
                <div
                  className={`text-[11px] mt-0.5 ${
                    active ? "text-white/85" : "text-[#475569] dark:text-slate-300"
                  }`}
                >
                  {g.shortHu}
                </div>
              </button>
            );
          })}
        </div>

        <div>
          <label
            htmlFor="analysis-custom-focus"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white mb-1.5"
          >
            8. Kiemelt Vizsgálati Kérdés / Hipotézis
          </label>
          <input
            id="analysis-custom-focus"
            type="text"
            value={state.customFocusQuestion}
            onChange={(e) => onUpdate("customFocusQuestion", e.target.value)}
            placeholder="Pl. Melyik 3 változtatás növeli leggyorsabban a B2B ajánlatkérések számát?"
            className="w-full rounded-2xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] px-3.5 py-2 text-xs text-[#0F172A] dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
          />
        </div>
      </section>
    </div>
  );
}
