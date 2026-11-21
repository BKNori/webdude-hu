"use client";

import { AlertTriangle, BookOpen, Palette, RotateCcw, ShieldBan, Wand2 } from "lucide-react";
import { ANTI_AI_SLOP_NEGATIVE_CHIPS } from "@/lib/prompt-engine/presets";
import {
  OFFLINE_PRINT_PRESETS,
  PRINT_PALETTE_LOCKS,
  PRINT_PRODUCT_FORMATS,
  type OfflinePrintPreset,
  type OfflinePrintStudioState,
  type PrintProductFormatSpec,
} from "@/data/offline-print-studio-config";

interface OfflinePrintFormProps {
  state: OfflinePrintStudioState;
  onUpdate: <K extends keyof OfflinePrintStudioState>(
    key: K,
    value: OfflinePrintStudioState[K]
  ) => void;
  onSelectFormat: (fmt: PrintProductFormatSpec) => void;
  onApplyPreset: (preset: OfflinePrintPreset) => void;
  onReset: () => void;
}

const CARD_CLS =
  "rounded-3xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#111C33]/90 p-6 space-y-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]";
const INPUT_CLS =
  "w-full rounded-xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] px-3 py-2 text-xs text-[#0F172A] dark:text-white";
const CHIP_INACTIVE =
  "bg-[#F8FAFC] dark:bg-[#0B1120] text-[#334155] dark:text-slate-300 border-slate-300 dark:border-white/15";

/** Offline & Nyomdai Prepress Pro Prompt Stúdió beállító űrlap (<280 sor). */
export default function OfflinePrintForm({
  state,
  onUpdate,
  onSelectFormat,
  onApplyPreset,
  onReset,
}: OfflinePrintFormProps) {
  const activeFormat =
    PRINT_PRODUCT_FORMATS.find((f) => f.id === state.productFormat) ??
    PRINT_PRODUCT_FORMATS[0];

  const toggleNegative = (chipId: string) => {
    const cur = state.negativeChipIds;
    onUpdate(
      "negativeChipIds",
      cur.includes(chipId) ? cur.filter((x) => x !== chipId) : [...cur, chipId]
    );
  };

  return (
    <div className="space-y-6">
      <section aria-label="1-kattintásos nyomdai sablonok" className={CARD_CLS}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
            <Wand2 className="w-4 h-4" aria-hidden="true" />
            1-Kattintásos Prepress Sablonok
          </span>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono text-[#475569] dark:text-slate-300 border border-slate-300 dark:border-white/15 hover:border-[#0369A1] dark:hover:border-[#00B5F1] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Alaphelyzet
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {OFFLINE_PRINT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset)}
              className="text-left rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 hover:border-[#0369A1] dark:hover:border-[#00B5F1] p-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
            >
              <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-[#6D28D9] dark:text-[#A78BFA]">
                {preset.badge}
              </span>
              <div className="text-xs font-bold text-[#0F172A] dark:text-white mt-0.5 leading-snug">
                {preset.title}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section aria-label="Kiadványtípus és kreatív brief" className={CARD_CLS}>
        <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white">
          <BookOpen className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
          2. Kiadványtípus, Brief &amp; Hajtás/Stanc Geometria
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PRINT_PRODUCT_FORMATS.map((fmt) => {
            const active = state.productFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                type="button"
                aria-pressed={active}
                onClick={() => onSelectFormat(fmt)}
                className={`text-left rounded-2xl border p-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                  active
                    ? "border-[#0369A1] dark:border-[#00B5F1] bg-[#0369A1]/10 dark:bg-[#00B5F1]/15"
                    : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 hover:border-[#0369A1]/40"
                }`}
              >
                <div className="text-xs font-bold text-[#0F172A] dark:text-white">{fmt.label}</div>
                <div className="text-[11px] font-mono text-[#0369A1] dark:text-[#00B5F1]">
                  Trim: {fmt.defaultTrimMm} · Bleed: +{fmt.defaultBleedMm}
                </div>
              </button>
            );
          })}
        </div>

        <div
          className={`rounded-2xl border p-3.5 text-xs flex items-start gap-2.5 ${
            activeFormat.isWarning
              ? "border-[#6D28D9]/40 dark:border-[#A78BFA]/40 bg-violet-50/80 dark:bg-violet-950/35 text-[#0F172A] dark:text-slate-100"
              : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120] text-[#334155] dark:text-slate-300"
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-[#6D28D9] dark:text-[#A78BFA] shrink-0 mt-0.5" aria-hidden="true" />
          <span>{activeFormat.noteHu}</span>
        </div>

        <div className="space-y-3">
          <label className="block space-y-1.5 text-xs font-semibold text-[#0F172A] dark:text-white">
            <span>Kiadvány / Csomagolás vizuális koncepció &amp; brief</span>
            <textarea
              rows={3}
              value={state.subject}
              onChange={(e) => onUpdate("subject", e.target.value)}
              placeholder="Írd le a nyomdai kiadvány arculatát, grafikai elemeit, panel-elrendezését..."
              className="w-full rounded-2xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] p-3.5 text-xs sm:text-sm text-[#0F172A] dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
              <span className="font-mono">Márkanév / Kiadó</span>
              <input type="text" value={state.brandName} onChange={(e) => onUpdate("brandName", e.target.value)} placeholder="pl. WebDude Prepress Studio" className={INPUT_CLS} />
            </label>
            <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
              <span className="font-mono">Pontos címsor / felirat (&quot;...&quot;)</span>
              <input type="text" value={state.exactTextToRender} onChange={(e) => onUpdate("exactTextToRender", e.target.value)} placeholder="pl. PRÉMIUM KATALÓGUS 2026" className={INPUT_CLS} />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
              <span className="font-mono">Vizuális stílusirány</span>
              <input type="text" value={state.visualStyle} onChange={(e) => onUpdate("visualStyle", e.target.value)} className={INPUT_CLS} />
            </label>
            <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
              <span className="font-mono">Copy-Space &amp; Margó utasítás</span>
              <input type="text" value={state.copySpaceNote} onChange={(e) => onUpdate("copySpaceNote", e.target.value)} className={INPUT_CLS} />
            </label>
          </div>
        </div>
      </section>

      <section aria-label="Színpaletta-zár és negatív szűrők" className={CARD_CLS}>
        <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white">
          <Palette className="w-4 h-4 text-[#6D28D9] dark:text-[#A78BFA]" aria-hidden="true" />
          3. Prepress Színpaletta-Zár &amp; Anti-AI-Slop Szűrő
        </div>

        <div className="flex flex-wrap gap-2">
          {PRINT_PALETTE_LOCKS.map((pal) => {
            const active = state.paletteLockId === pal.id;
            return (
              <button
                key={pal.id}
                type="button"
                aria-pressed={active}
                onClick={() => onUpdate("paletteLockId", pal.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-mono border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                  active ? "bg-[#5B21B6] text-white border-[#7C3AED]" : CHIP_INACTIVE
                }`}
              >
                {pal.label}
              </button>
            );
          })}
        </div>

        {state.paletteLockId === "custom-hex" && (
          <input
            type="text"
            value={state.customHexColors}
            onChange={(e) => onUpdate("customHexColors", e.target.value)}
            placeholder="#00B5F1, #7C3AED, #0B1120"
            aria-label="Saját HEX színkódok vesszővel elválasztva"
            className={INPUT_CLS}
          />
        )}

        <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#334155] dark:text-slate-200">
            <ShieldBan className="w-3.5 h-3.5 text-[#6D28D9] dark:text-[#A78BFA]" aria-hidden="true" />
            Nyomdai Anti-AI-Slop Kizárások
          </div>
          <div className="flex flex-wrap gap-2">
            {ANTI_AI_SLOP_NEGATIVE_CHIPS.map((chip) => {
              const active = state.negativeChipIds.includes(chip.id);
              return (
                <button
                  key={chip.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleNegative(chip.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-mono border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                    active ? "bg-[#5B21B6] text-white border-[#7C3AED]" : CHIP_INACTIVE
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
          <input
            type="text"
            value={state.customNegative}
            onChange={(e) => onUpdate("customNegative", e.target.value)}
            placeholder="Egyedi kizárások (pl. gold, yellow, RGB neon, cropped bleed)"
            aria-label="Egyedi nyomdai kizárások"
            className={INPUT_CLS}
          />
        </div>
      </section>
    </div>
  );
}
