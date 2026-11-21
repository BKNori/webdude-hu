"use client";

import { Bot, FileCode2, ShieldCheck } from "lucide-react";
import {
  LLM_TARGET_ENGINE_CHIPS,
  type LlmTargetEngine,
} from "@/lib/prompt-engine";
import {
  ARCH_GUARDRAILS,
  ARCH_OUTPUT_FORMATS,
  ARCH_RIGOR_LEVELS,
  WEBDUDE_DEFAULT_GUARDRAILS,
  type ArchGuardrailId,
  type ArchOutputFormatId,
  type ArchRigorLevelId,
  type SoftwareArchStudioState,
} from "@/data/software-arch-studio-config";

interface SoftwareArchTechPanelProps {
  state: SoftwareArchStudioState;
  onUpdate: <K extends keyof SoftwareArchStudioState>(
    key: K,
    value: SoftwareArchStudioState[K]
  ) => void;
}

/**
 * Webes & Szoftver-Architektúra Pro Prompt Stúdió — Cél-LLM, Kimeneti Formátum & Guardrail panel (<280 sor).
 */
export default function SoftwareArchTechPanel({
  state,
  onUpdate,
}: SoftwareArchTechPanelProps) {
  const toggleGuardrail = (id: ArchGuardrailId) => {
    const exists = state.guardrailIds.includes(id);
    const next = exists
      ? state.guardrailIds.filter((item) => item !== id)
      : [...state.guardrailIds, id];
    onUpdate("guardrailIds", next);
  };

  const selectAllGuardrails = () => {
    onUpdate(
      "guardrailIds",
      ARCH_GUARDRAILS.map((g) => g.id)
    );
  };

  const selectWebDudeProfile = () => {
    onUpdate("guardrailIds", [...WEBDUDE_DEFAULT_GUARDRAILS]);
  };

  return (
    <div className="space-y-6">
      {/* 5. Cél-LLM / Coding Agent Motor (4 db) */}
      <section
        aria-label="Cél-LLM és Coding Agent Motor"
        className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C33]/80 p-5 space-y-3 shadow-sm"
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
          <Bot className="w-3.5 h-3.5" aria-hidden="true" />
          5. Cél-LLM / AI Coding Agent Szintaxis
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

      {/* 6. Kimeneti Formátum (5 db) & Szigorúsági Szint (3 db) */}
      <section
        aria-label="Kimeneti Formátum és Mérnöki Szigorúság"
        className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C33]/80 p-5 space-y-4 shadow-sm"
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
          <FileCode2 className="w-3.5 h-3.5" aria-hidden="true" />
          6. Kimeneti Dokumentum Formátum &amp; Szigorúsági Szint
        </span>

        <div className="space-y-2">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-[#475569] dark:text-slate-300">
            Kimeneti Formátum (5 sablon):
          </span>
          <div className="flex flex-wrap gap-2">
            {ARCH_OUTPUT_FORMATS.map((fmt) => {
              const active = state.outputFormatId === fmt.id;
              return (
                <button
                  key={fmt.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    onUpdate("outputFormatId", fmt.id as ArchOutputFormatId)
                  }
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                    active
                      ? "text-white bg-linear-to-r from-[#075985] to-[#5B21B6]"
                      : "border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] text-[#334155] dark:text-slate-300 hover:border-[#0369A1]"
                  }`}
                >
                  {fmt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-[#475569] dark:text-slate-300">
            Mérnöki Szigorúság &amp; QA Mélység:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {ARCH_RIGOR_LEVELS.map((rigor) => {
              const active = state.rigorId === rigor.id;
              return (
                <button
                  key={rigor.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    onUpdate("rigorId", rigor.id as ArchRigorLevelId)
                  }
                  className={`text-left rounded-2xl border p-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                    active
                      ? "border-transparent text-white bg-linear-to-r from-[#075985] to-[#5B21B6]"
                      : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 text-[#0F172A] dark:text-white hover:border-[#0369A1]"
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold opacity-85">
                    {rigor.badge}
                  </div>
                  <div className="text-xs font-bold mt-0.5">{rigor.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Mérnöki Guardrail-ek & OWASP AISVS Védelem (10 db) */}
      <section
        aria-label="Mérnöki Guardrail és OWASP AISVS kapcsolók"
        className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C33]/80 p-5 space-y-4 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            7. Mérnöki Guardrail-ek &amp; Anti-Pattern Fékek ({state.guardrailIds.length}/10)
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={selectWebDudeProfile}
              className="rounded-full border border-slate-300 dark:border-white/15 px-2.5 py-1 text-[10px] font-mono font-semibold text-[#0369A1] dark:text-[#00B5F1] hover:border-[#0369A1] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
            >
              WebDude Profil
            </button>
            <button
              type="button"
              onClick={selectAllGuardrails}
              className="rounded-full border border-slate-300 dark:border-white/15 px-2.5 py-1 text-[10px] font-mono font-semibold text-[#334155] dark:text-slate-300 hover:border-[#0369A1] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
            >
              Összes (10)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ARCH_GUARDRAILS.map((g) => {
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
            htmlFor="arch-custom-antipatterns"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white mb-1.5"
          >
            Egyedi Tiltólista / Projekt-Specifikus Anti-Patternök
          </label>
          <input
            id="arch-custom-antipatterns"
            type="text"
            value={state.customAntiPatterns}
            onChange={(e) => onUpdate("customAntiPatterns", e.target.value)}
            placeholder="Pl. Ne használj any-t, ne módosítsd a meglévő API szerződést..."
            className="w-full rounded-2xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] px-3.5 py-2 text-xs text-[#0F172A] dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
          />
        </div>
      </section>
    </div>
  );
}
