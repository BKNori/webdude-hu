"use client";

import { Cpu, Layers, RotateCcw, Sparkles } from "lucide-react";
import {
  ARCH_STACK_CHIPS,
  SOFTWARE_ARCH_MODES,
  SOFTWARE_ARCH_PRESETS,
  type SoftwareArchMode,
  type SoftwareArchPreset,
  type SoftwareArchStudioState,
} from "@/data/software-arch-studio-config";

interface SoftwareArchFormProps {
  state: SoftwareArchStudioState;
  onUpdate: <K extends keyof SoftwareArchStudioState>(
    key: K,
    value: SoftwareArchStudioState[K]
  ) => void;
  onApplyPreset: (preset: SoftwareArchPreset) => void;
  onReset: () => void;
}

/**
 * Webes & Szoftver-Architektúra Pro Prompt Stúdió — Bal oldali tervező űrlap (<280 sor).
 */
export default function SoftwareArchForm({
  state,
  onUpdate,
  onApplyPreset,
  onReset,
}: SoftwareArchFormProps) {
  const activeMode =
    SOFTWARE_ARCH_MODES.find((m) => m.id === state.mode) ??
    SOFTWARE_ARCH_MODES[0];

  const toggleStack = (id: string) => {
    const exists = state.stackIds.includes(id);
    const next = exists
      ? state.stackIds.filter((item) => item !== id)
      : [...state.stackIds, id];
    onUpdate("stackIds", next);
  };

  return (
    <div className="space-y-6">
      {/* 1. Mérnöki Presetek */}
      <section
        aria-label="1-kattintásos Szoftver-Architektúra Presetek"
        className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C33]/80 p-5 space-y-3 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            1-Kattintásos Mérnöki &amp; Agent Presetek (6 db)
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
          {SOFTWARE_ARCH_PRESETS.map((preset) => (
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

      {/* 2. Architektúra Fázis / Mód (7 db) */}
      <section
        aria-label="Architektúra Fázis és Mód választó"
        className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C33]/80 p-5 space-y-4 shadow-sm"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            1. Architektúra Fázis / Mód (7 Mérnöki Munkafolyamat)
          </span>
          <span className="rounded-full bg-[#7C3AED]/15 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#6D28D9] dark:text-[#A78BFA]">
            {activeMode.badge}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SOFTWARE_ARCH_MODES.map((m) => {
            const active = state.mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                aria-pressed={active}
                onClick={() => onUpdate("mode", m.id as SoftwareArchMode)}
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

      {/* 3. Projekt Brief, SSOT Fájlok és Korlátok */}
      <section
        aria-label="Projekt Brief és SSOT Fájlok"
        className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C33]/80 p-5 space-y-4 shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="arch-project-name"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white mb-1.5"
            >
              2. Projekt / Modul Neve
            </label>
            <input
              id="arch-project-name"
              type="text"
              value={state.projectName}
              onChange={(e) => onUpdate("projectName", e.target.value)}
              placeholder="Pl. WebDude Ügyfélportál — Stripe & Firestore RBAC"
              className="w-full rounded-2xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] px-3.5 py-2 text-xs text-[#0F172A] dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
            />
          </div>

          <div>
            <label
              htmlFor="arch-ssot-files"
              className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white mb-1.5"
            >
              Érintett SSOT / Repo Fájlok (Deep Read)
            </label>
            <input
              id="arch-ssot-files"
              type="text"
              value={state.ssotFiles}
              onChange={(e) => onUpdate("ssotFiles", e.target.value)}
              placeholder="Pl. AGENTS.md, _docs/ARCHITECTURE.md, src/lib/..."
              className="w-full rounded-2xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] px-3.5 py-2 text-xs font-mono text-[#0F172A] dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="arch-objective-brief"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white mb-1.5"
          >
            3. Mérnöki Feladat / Architektúra Brief
          </label>
          <textarea
            id="arch-objective-brief"
            rows={3}
            value={state.objectiveBrief}
            onChange={(e) => onUpdate("objectiveBrief", e.target.value)}
            placeholder="Írd le a tervezendő rendszert, funkciót, refaktort vagy migrációs célt..."
            className="w-full rounded-2xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] p-3.5 text-sm text-[#0F172A] dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
          />
        </div>

        <div>
          <label
            htmlFor="arch-risks"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white mb-1.5"
          >
            Üzleti / Infrastruktúra Korlátok &amp; Kockázatok (Opcionális)
          </label>
          <input
            id="arch-risks"
            type="text"
            value={state.risksAndConstraints}
            onChange={(e) => onUpdate("risksAndConstraints", e.target.value)}
            placeholder="Pl. cPanel Passenger memóriakorlát, Firestore anti-drain, <300 sor/fájl..."
            className="w-full rounded-2xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] px-3.5 py-2 text-xs text-[#0F172A] dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
          />
        </div>
      </section>

      {/* 4. Technológiai Stack & Infra Chipek (14 db) */}
      <section
        aria-label="Technológiai Stack és Infrastruktúra"
        className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111C33]/80 p-5 space-y-3 shadow-sm"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
            <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
            4. Technológiai Stack &amp; Infrastruktúra ({state.stackIds.length}/14 aktív)
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {ARCH_STACK_CHIPS.map((chip) => {
            const active = state.stackIds.includes(chip.id);
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleStack(chip.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                  active
                    ? "text-white bg-linear-to-r from-[#075985] to-[#5B21B6] shadow-xs"
                    : "border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] text-[#334155] dark:text-slate-300 hover:border-[#0369A1]"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
