"use client";

import { AlertTriangle, Palette, RotateCcw, ShieldBan, Shirt, Wand2 } from "lucide-react";
import { ANTI_AI_SLOP_NEGATIVE_CHIPS } from "@/lib/prompt-engine/presets";
import {
  APPAREL_FABRICS,
  APPAREL_GARMENTS,
  APPAREL_PALETTE_LOCKS,
  APPAREL_WASHES,
  FABRIC_BASE_COLORS,
  type ApparelOptionItem,
  type ApparelStudioMode,
} from "@/data/apparel-studio-options";
import {
  APPAREL_PRESETS,
  type ApparelPreset,
  type ApparelStudioState,
} from "@/data/apparel-studio-config";

interface ApparelFormProps {
  state: ApparelStudioState;
  onUpdate: <K extends keyof ApparelStudioState>(
    key: K,
    value: ApparelStudioState[K]
  ) => void;
  onApplyPreset: (preset: ApparelPreset) => void;
  onReset: () => void;
}

const CARD_CLS =
  "rounded-3xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#111C33]/90 p-6 space-y-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]";
const INPUT_CLS =
  "w-full rounded-xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] px-3 py-2 text-xs text-[#0F172A] dark:text-white";
const CHIP_INACTIVE =
  "bg-[#F8FAFC] dark:bg-[#0B1120] text-[#334155] dark:text-slate-300 border-slate-300 dark:border-white/15";

const STUDIO_MODES: readonly { id: ApparelStudioMode; title: string; desc: string }[] = [
  { id: "print-artwork", title: "1. Textilnyomtatási Grafika", desc: "Izolált 2D nyomat (DTF, Szita, Hímzés, AOP, Flex) póló és modell nélkül" },
  { id: "garment-tech-pack", title: "2. Ruhadarab & Tech Pack", desc: "2D CAD Technical Flat Sketch (elöl/hátul szabásrajz) + gyártási BOM" },
  { id: "lookbook-mockup", title: "3. Webshop & Lookbook Mockup", desc: "Ghost Mannequin, Flat-Lay, Streetwear Lookbook és Macro Textil fotó" },
];

function SelectBox<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly ApparelOptionItem<T>[];
  onChange: (next: T) => void;
}) {
  return (
    <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
      <span className="font-mono font-semibold">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value as T)} className={INPUT_CLS}>
        {options.map((o) => (
          <option key={o.id} value={o.id}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

/** Ruha, Divat, Textil & Merch Pro Prompt Stúdió fő beállító űrlap (<280 sor). */
export default function ApparelForm({
  state,
  onUpdate,
  onApplyPreset,
  onReset,
}: ApparelFormProps) {
  const activeBaseColor =
    FABRIC_BASE_COLORS.find((c) => c.id === state.fabricBaseColor) ??
    FABRIC_BASE_COLORS[0];

  const toggleNegative = (chipId: string) => {
    const cur = state.negativeChipIds;
    onUpdate(
      "negativeChipIds",
      cur.includes(chipId) ? cur.filter((x) => x !== chipId) : [...cur, chipId]
    );
  };

  return (
    <div className="space-y-6">
      {/* 3-füles Módváltó + 1-kattintásos Presetek */}
      <section aria-label="Stúdió mód és gyors sablonok" className={CARD_CLS}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {STUDIO_MODES.map((m) => {
            const active = state.mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                aria-pressed={active}
                onClick={() => onUpdate("mode", m.id)}
                className={`text-left rounded-2xl border p-3.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                  active
                    ? "border-[#0369A1] dark:border-[#00B5F1] bg-[#0369A1]/10 dark:bg-[#00B5F1]/15"
                    : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 hover:border-[#0369A1]/40"
                }`}
              >
                <div className="text-xs font-bold font-mono text-[#0F172A] dark:text-white">{m.title}</div>
                <div className="text-[11px] text-[#475569] dark:text-slate-300 mt-0.5 leading-snug">{m.desc}</div>
              </button>
            );
          })}
        </div>

        <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
              <Wand2 className="w-4 h-4" aria-hidden="true" />
              1-Kattintásos Textil &amp; Merch Sablonok
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
            {APPAREL_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onApplyPreset(preset)}
                className="text-left rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 hover:border-[#0369A1] dark:hover:border-[#00B5F1] p-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
              >
                <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-[#6D28D9] dark:text-[#A78BFA]">{preset.badge}</span>
                <div className="text-xs font-bold text-[#0F172A] dark:text-white mt-0.5 leading-snug">{preset.title}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Brief, Ruhadarab, GSM, Mosás és Alapszín */}
      <section aria-label="Ruhadarab, alapanyag és motívum brief" className={CARD_CLS}>
        <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white">
          <Shirt className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
          1. Motívum Brief, Ruhadarab, GSM &amp; Alapszín
        </div>

        <label className="block space-y-1.5 text-xs font-semibold text-[#0F172A] dark:text-white">
          <span>Grafikai motívum / Kollekció / Tech Pack leírása</span>
          <textarea
            rows={3}
            value={state.subject}
            onChange={(e) => onUpdate("subject", e.target.value)}
            placeholder="Írd le a nyomat grafikáját, szabás részleteit vagy a lookbook jelenetet..."
            className="w-full rounded-2xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] p-3.5 text-xs sm:text-sm text-[#0F172A] dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
          />
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
            <span className="font-mono font-semibold">Márkanév / Kollekció</span>
            <input type="text" value={state.brandName} onChange={(e) => onUpdate("brandName", e.target.value)} className={INPUT_CLS} />
          </label>
          <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
            <span className="font-mono font-semibold">Pontos feliratszöveg (&quot;...&quot;)</span>
            <input type="text" value={state.exactTextToRender} onChange={(e) => onUpdate("exactTextToRender", e.target.value)} placeholder="pl. STUDIO 26" className={INPUT_CLS} />
          </label>
          <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
            <span className="font-mono font-semibold">Vizuális stílusirány</span>
            <input type="text" value={state.visualStyle} onChange={(e) => onUpdate("visualStyle", e.target.value)} className={INPUT_CLS} />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SelectBox label="Ruhadarab & Szabás" value={state.garment} options={APPAREL_GARMENTS} onChange={(v) => onUpdate("garment", v)} />
          <SelectBox label="Anyag & Súly (GSM)" value={state.fabric} options={APPAREL_FABRICS} onChange={(v) => onUpdate("fabric", v)} />
          <SelectBox label="Mosás & Kikészítés" value={state.wash} options={APPAREL_WASHES} onChange={(v) => onUpdate("wash", v)} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold text-[#334155] dark:text-slate-200 block">Alapruha Szín (Garment Base)</span>
          <div className="flex flex-wrap gap-2">
            {FABRIC_BASE_COLORS.map((col) => {
              const active = state.fabricBaseColor === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onUpdate("fabricBaseColor", col.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-mono border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                    active ? "bg-[#075985] text-white border-[#0369A1]" : CHIP_INACTIVE
                  }`}
                >
                  {col.label}
                </button>
              );
            })}
          </div>

          {activeBaseColor.needsWhiteUnderbase && (
            <div className="rounded-2xl border border-[#6D28D9]/40 dark:border-[#A78BFA]/40 bg-violet-50/80 dark:bg-violet-950/35 p-3 text-xs text-[#0F172A] dark:text-slate-100 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-[#6D28D9] dark:text-[#A78BFA] shrink-0 mt-0.5" aria-hidden="true" />
              <span>Sötét / melírozott alapanyag: kötelező a Fehér Alányomás (White Underbase + 0.25 mm choke) és az alapszín-kivágás (garment knock-out)!</span>
            </div>
          )}
        </div>
      </section>

      {/* Színpaletta-zár & Anti-AI-Slop */}
      <section aria-label="Színpaletta-zár és negatív szűrők" className={CARD_CLS}>
        <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white">
          <Palette className="w-4 h-4 text-[#6D28D9] dark:text-[#A78BFA]" aria-hidden="true" />
          3. Nyomat Színpaletta-Zár &amp; Anti-AI-Slop Szűrő
        </div>

        <div className="flex flex-wrap gap-2">
          {APPAREL_PALETTE_LOCKS.map((pal) => {
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
          <input type="text" value={state.customHexColors} onChange={(e) => onUpdate("customHexColors", e.target.value)} placeholder="#00B5F1, #7C3AED, #FFFFFF" aria-label="Saját HEX színek" className={INPUT_CLS} />
        )}

        <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#334155] dark:text-slate-200">
            <ShieldBan className="w-3.5 h-3.5 text-[#6D28D9] dark:text-[#A78BFA]" aria-hidden="true" />
            Textilnyomdai Anti-AI-Slop Kizárások
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
          <input type="text" value={state.customNegative} onChange={(e) => onUpdate("customNegative", e.target.value)} placeholder="Egyedi kizárások (pl. gold, yellow, semi-transparent smoke)" aria-label="Egyedi textil kizárások" className={INPUT_CLS} />
        </div>
      </section>
    </div>
  );
}
