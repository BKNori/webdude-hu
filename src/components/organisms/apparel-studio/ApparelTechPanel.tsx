"use client";

import { AlertTriangle, Camera, Layers, Sliders, Sparkles } from "lucide-react";
import { VISUAL_TARGET_ENGINE_CHIPS } from "@/lib/prompt-engine/presets";
import {
  APPAREL_MOCKUP_STYLES,
  APPAREL_PLACEMENTS,
  APPAREL_PRINT_TECHS,
  APPAREL_TRIMS,
  EMBROIDERY_STITCH_TYPES,
  SCREEN_PRINT_INKS,
} from "@/data/apparel-studio-options";
import type { ApparelStudioState } from "@/data/apparel-studio-config";

interface ApparelTechPanelProps {
  state: ApparelStudioState;
  onUpdate: <K extends keyof ApparelStudioState>(
    key: K,
    value: ApparelStudioState[K]
  ) => void;
}

const APPAREL_ENGINES = VISUAL_TARGET_ENGINE_CHIPS.filter(
  (
    c
  ): c is (typeof VISUAL_TARGET_ENGINE_CHIPS)[number] & {
    id: ApparelStudioState["engine"];
  } => c.id !== "video-motion"
);

const INPUT_CLS =
  "w-full rounded-xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] px-3 py-2 text-xs text-[#0F172A] dark:text-white";
const CHIP_INACTIVE =
  "bg-[#F8FAFC] dark:bg-[#0B1120] text-[#334155] dark:text-slate-300 border-slate-300 dark:border-white/15";

/** Mód-specifikus textilnyomtatási, Tech Pack BOM és Lookbook műszaki panel (<280 sor). */
export default function ApparelTechPanel({
  state,
  onUpdate,
}: ApparelTechPanelProps) {
  const activeTech =
    APPAREL_PRINT_TECHS.find((t) => t.id === state.printTech) ??
    APPAREL_PRINT_TECHS[0];

  const toggleTrim = (id: string) => {
    const cur = state.trims;
    onUpdate("trims", cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
  };

  return (
    <section
      aria-label="Célmotor és textilipari technológiai paraméterek"
      className="rounded-3xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#111C33]/90 p-6 space-y-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
    >
      {/* Célmotor választó */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white">
          <Sparkles className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
          2. Célmotor &amp; Gyártástechnológia
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5">
          {APPAREL_ENGINES.map((chip) => {
            const active = state.engine === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={active}
                onClick={() => onUpdate("engine", chip.id)}
                className={`text-left rounded-2xl border p-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                  active
                    ? "border-[#6D28D9] dark:border-[#A78BFA] bg-[#6D28D9]/10 dark:bg-[#7C3AED]/20"
                    : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 hover:border-[#6D28D9]/40"
                }`}
              >
                <div className="text-xs font-bold font-mono text-[#0F172A] dark:text-white">{chip.label}</div>
                <div className="text-[10px] text-[#475569] dark:text-slate-300 mt-0.5 leading-snug">{chip.shortHint}</div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <label className="flex items-center gap-2 text-xs font-mono text-[#334155] dark:text-slate-200">
            <span>Max. szín / cérna ({state.maxColors})</span>
            <input
              type="range"
              min={1}
              max={8}
              value={state.maxColors}
              onChange={(e) => onUpdate("maxColors", Number(e.target.value))}
              className="w-28 accent-[#00B5F1]"
            />
          </label>

          {state.engine === "midjourney-v7" && (
            <>
              <label className="flex items-center gap-2 text-xs font-mono text-[#334155] dark:text-slate-200">
                <span>--stylize ({state.stylize})</span>
                <input
                  type="range"
                  min={0}
                  max={750}
                  step={25}
                  value={state.stylize}
                  onChange={(e) => onUpdate("stylize", Number(e.target.value))}
                  className="w-28 accent-[#00B5F1]"
                />
              </label>
              <button
                type="button"
                aria-pressed={state.tile}
                onClick={() => onUpdate("tile", !state.tile)}
                className={`rounded-full px-3 py-1 text-xs font-mono font-semibold border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                  state.tile ? "bg-[#075985] text-white border-[#0369A1]" : CHIP_INACTIVE
                }`}
              >
                --tile (Seamless AOP)
              </button>
            </>
          )}
        </div>
      </div>

      {/* Textilnyomtatási technológia & pozíció (print-artwork és lookbook-mockup módban) */}
      {state.mode !== "garment-tech-pack" && (
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
            <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
            Textilnyomtatási Technológia &amp; Pozíció
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {APPAREL_PRINT_TECHS.map((t) => {
              const active = state.printTech === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    onUpdate("printTech", t.id);
                    if (t.autoTile) onUpdate("tile", true);
                  }}
                  className={`text-left rounded-2xl border p-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                    active
                      ? "border-[#0369A1] dark:border-[#00B5F1] bg-[#0369A1]/10 dark:bg-[#00B5F1]/15"
                      : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 hover:border-[#0369A1]/40"
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold text-[#6D28D9] dark:text-[#A78BFA]">{t.badge}</span>
                  <div className="text-xs font-bold text-[#0F172A] dark:text-white mt-0.5">{t.label}</div>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-[#0369A1]/30 dark:border-[#00B5F1]/30 bg-sky-50/70 dark:bg-sky-950/30 p-3.5 text-xs text-[#0F172A] dark:text-slate-100 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1] shrink-0 mt-0.5" aria-hidden="true" />
            <span>{activeTech.noteHu}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
              <span className="font-mono font-semibold">Elhelyezési Zóna &amp; Méret (cm)</span>
              <select
                value={state.placement}
                onChange={(e) => onUpdate("placement", e.target.value as ApparelStudioState["placement"])}
                className={INPUT_CLS}
              >
                {APPAREL_PLACEMENTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label} — {p.sizeCm}
                  </option>
                ))}
              </select>
            </label>

            {state.printTech === "screen-print" && (
              <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
                <span className="font-mono font-semibold">Szitafesték Típusa</span>
                <select
                  value={state.screenPrintInk}
                  onChange={(e) => onUpdate("screenPrintInk", e.target.value as ApparelStudioState["screenPrintInk"])}
                  className={INPUT_CLS}
                >
                  {SCREEN_PRINT_INKS.map((ink) => (
                    <option key={ink.id} value={ink.id}>{ink.label}</option>
                  ))}
                </select>
              </label>
            )}

            {state.printTech === "embroidery" && (
              <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
                <span className="font-mono font-semibold">Hímzés &amp; Öltés Típusa</span>
                <select
                  value={state.embroideryStitch}
                  onChange={(e) => onUpdate("embroideryStitch", e.target.value as ApparelStudioState["embroideryStitch"])}
                  className={INPUT_CLS}
                >
                  {EMBROIDERY_STITCH_TYPES.map((st) => (
                    <option key={st.id} value={st.id}>{st.label}</option>
                  ))}
                </select>
              </label>
            )}
          </div>
        </div>
      )}

      {/* Lookbook Mockup Fotózási Stílus */}
      {state.mode === "lookbook-mockup" && (
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#6D28D9] dark:text-[#A78BFA]">
            <Camera className="w-3.5 h-3.5" aria-hidden="true" />
            Webshop &amp; Lookbook Fotózási Stílus
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {APPAREL_MOCKUP_STYLES.map((ms) => {
              const active = state.mockupStyle === ms.id;
              return (
                <button
                  key={ms.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onUpdate("mockupStyle", ms.id)}
                  className={`text-left rounded-2xl border p-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                    active
                      ? "border-[#6D28D9] dark:border-[#A78BFA] bg-[#6D28D9]/10 dark:bg-[#7C3AED]/20"
                      : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70"
                  }`}
                >
                  <div className="text-xs font-bold text-[#0F172A] dark:text-white">{ms.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Konstrukciós & Tech Pack BOM Trimek */}
      <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#6D28D9] dark:text-[#A78BFA]">
          <Layers className="w-3.5 h-3.5" aria-hidden="true" />
          Tech Pack Konstrukció, Varrás &amp; Kellékek (BOM)
        </div>

        <div className="flex flex-wrap gap-2">
          {APPAREL_TRIMS.map((tr) => {
            const active = state.trims.includes(tr.id);
            return (
              <button
                key={tr.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleTrim(tr.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-mono border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                  active ? "bg-[#075985] text-white border-[#0369A1]" : CHIP_INACTIVE
                }`}
              >
                {tr.label}
              </button>
            );
          })}
        </div>

        {state.mode === "garment-tech-pack" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
              <span className="font-mono font-semibold">CAD Rajz Nézet</span>
              <select
                value={state.techPackView}
                onChange={(e) => onUpdate("techPackView", e.target.value as ApparelStudioState["techPackView"])}
                className={INPUT_CLS}
              >
                <option value="front-back-flat">Elöl + Hátul Flat Sketch</option>
                <option value="front-back-side-flat">Elöl + Hátul + Oldal</option>
              </select>
            </label>
            <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
              <span className="font-mono font-semibold">Méretsor (Grading)</span>
              <input type="text" value={state.sizeRange} onChange={(e) => onUpdate("sizeRange", e.target.value)} className={INPUT_CLS} />
            </label>
            <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
              <span className="font-mono font-semibold">Tech Pack Megjegyzés</span>
              <input type="text" value={state.techPackNotes} onChange={(e) => onUpdate("techPackNotes", e.target.value)} className={INPUT_CLS} />
            </label>
          </div>
        )}
      </div>
    </section>
  );
}
