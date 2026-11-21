"use client";

import { Layers, Printer, Sliders } from "lucide-react";
import { VISUAL_TARGET_ENGINE_CHIPS } from "@/lib/prompt-engine/presets";
import {
  PRINT_COLOR_PROFILES,
  PRINT_FINISHING_OPTIONS,
  PRINT_SCALE_OPTIONS,
  PRINT_SPOT_LAYERS,
  PRINT_SUBSTRATE_OPTIONS,
  PRINT_VIEWING_DISTANCES,
  type OfflinePrintStudioState,
} from "@/data/offline-print-studio-config";

interface OfflinePrintTechPanelProps {
  state: OfflinePrintStudioState;
  onUpdate: <K extends keyof OfflinePrintStudioState>(
    key: K,
    value: OfflinePrintStudioState[K]
  ) => void;
}

const PRINT_ENGINES = VISUAL_TARGET_ENGINE_CHIPS.filter(
  (
    c
  ): c is (typeof VISUAL_TARGET_ENGINE_CHIPS)[number] & {
    id: OfflinePrintStudioState["engine"];
  } => c.id !== "video-motion"
);

const INPUT_CLS =
  "w-full rounded-xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] px-3 py-2 text-xs text-[#0F172A] dark:text-white";
const CHIP_INACTIVE =
  "bg-[#F8FAFC] dark:bg-[#0B1120] text-[#334155] dark:text-slate-300 border-slate-300 dark:border-white/15";

/** Prepress technikai, színprofil, spot réteg és kimeneti mód panel (<260 sor). */
export default function OfflinePrintTechPanel({
  state,
  onUpdate,
}: OfflinePrintTechPanelProps) {
  const toggleItem = (key: "spotLayers" | "finishing", id: string) => {
    const list = state[key];
    onUpdate(
      key,
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
    );
  };

  return (
    <section
      aria-label="Kimeneti mód, célmotor és prepress technológia"
      className="rounded-3xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#111C33]/90 p-6 space-y-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
    >
      {/* Dupla Kimeneti Mód */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white">
          <Printer className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
          1. Nyomdai Kimeneti Mód &amp; Célmotor
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(
            [
              [
                "2d-print-artwork",
                "2D Nyomdakész Grafikai Alap / Vektor",
                "Kifutóig érő sík grafika / dieline, 3D perspektíva és árnyék nélkül",
              ],
              [
                "3d-print-mockup",
                "3D Ügyfélprezentációs Print Mockup",
                "Valós papírtextúra, hajtásgeometria, UV-lakk és prégelési fénytörés",
              ],
            ] as const
          ).map(([modeId, title, desc]) => {
            const active = state.outputMode === modeId;
            return (
              <button
                key={modeId}
                type="button"
                aria-pressed={active}
                onClick={() => onUpdate("outputMode", modeId)}
                className={`text-left rounded-2xl border p-3.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                  active
                    ? "border-[#0369A1] dark:border-[#00B5F1] bg-[#0369A1]/10 dark:bg-[#00B5F1]/15"
                    : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 hover:border-[#0369A1]/40"
                }`}
              >
                <div className="text-xs font-bold font-mono text-[#0F172A] dark:text-white">{title}</div>
                <div className="text-[11px] text-[#475569] dark:text-slate-300 mt-0.5 leading-snug">{desc}</div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 pt-2">
          {PRINT_ENGINES.map((chip) => {
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

        {state.engine === "midjourney-v7" && (
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <label className="flex items-center gap-2 text-xs font-mono text-[#334155] dark:text-slate-200">
              <span>--stylize ({state.stylize})</span>
              <input type="range" min={0} max={750} step={25} value={state.stylize} onChange={(e) => onUpdate("stylize", Number(e.target.value))} className="w-32 accent-[#00B5F1]" />
            </label>
            <button
              type="button"
              aria-pressed={state.styleRaw}
              onClick={() => onUpdate("styleRaw", !state.styleRaw)}
              className={`rounded-full px-3.5 py-1 text-xs font-mono font-semibold border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                state.styleRaw ? "bg-[#075985] text-white border-[#0369A1]" : CHIP_INACTIVE
              }`}
            >
              --style raw
            </button>
          </div>
        )}

        {state.engine === "recraft-v3-svg" && (
          <label className="flex items-center gap-3 pt-2 text-xs font-mono text-[#334155] dark:text-slate-200">
            <span>Max. vektorszín ({state.maxVectorColors} szín)</span>
            <input type="range" min={2} max={6} value={state.maxVectorColors} onChange={(e) => onUpdate("maxVectorColors", Number(e.target.value))} className="w-36 accent-[#00B5F1]" />
          </label>
        )}
      </div>

      {/* Méret, Kifutó, Safe Zone, Skála & Távolság */}
      <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
          <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
          Prepress Geometria (Trim / Bleed / Safe Zone / DPI)
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
            <span className="font-mono font-semibold">Vágott méret (TrimBox)</span>
            <input type="text" value={state.trimSizeMm} onChange={(e) => onUpdate("trimSizeMm", e.target.value)} className={INPUT_CLS} />
          </label>
          <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
            <span className="font-mono font-semibold">Kifutó (Bleed)</span>
            <select value={state.bleedMm} onChange={(e) => onUpdate("bleedMm", e.target.value)} className={INPUT_CLS}>
              {["2–3 mm", "3 mm", "3–5 mm", "5 mm", "10 mm", "10–20 mm"].map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
            <span className="font-mono font-semibold">Belső margó (Safe Zone)</span>
            <select value={state.safeZoneMm} onChange={(e) => onUpdate("safeZoneMm", e.target.value)} className={INPUT_CLS}>
              {["4 mm", "5 mm", "8 mm", "10 mm", "15 mm", "20 mm", "40 mm"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
            <span className="font-mono font-semibold">Méretarány &amp; DPI</span>
            <select value={state.scaleId} onChange={(e) => onUpdate("scaleId", e.target.value as OfflinePrintStudioState["scaleId"])} className={INPUT_CLS}>
              {PRINT_SCALE_OPTIONS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
            <span className="font-mono font-semibold">Olvasási távolság</span>
            <select value={state.viewingDistance} onChange={(e) => onUpdate("viewingDistance", e.target.value as OfflinePrintStudioState["viewingDistance"])} className={INPUT_CLS}>
              {PRINT_VIEWING_DISTANCES.map((d) => (
                <option key={d.id} value={d.id}>{d.label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Színprofil, Spot rétegek, Hordozó & Finishing */}
      <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#6D28D9] dark:text-[#A78BFA]">
          <Layers className="w-3.5 h-3.5" aria-hidden="true" />
          ICC Profil, Spot Rétegek, Papír &amp; Felületnemesítés
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
            <span className="font-mono font-semibold">CMYK ICC Színprofil &amp; TAC</span>
            <select value={state.colorProfile} onChange={(e) => onUpdate("colorProfile", e.target.value as OfflinePrintStudioState["colorProfile"])} className={INPUT_CLS}>
              {PRINT_COLOR_PROFILES.map((c) => (
                <option key={c.id} value={c.id}>{c.label} (TAC {c.tacLimit})</option>
              ))}
            </select>
          </label>
          <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
            <span className="font-mono font-semibold">Papír / Hordozó (Substrate)</span>
            <select value={state.substrate} onChange={(e) => onUpdate("substrate", e.target.value)} className={INPUT_CLS}>
              {PRINT_SUBSTRATE_OPTIONS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          {([["richBlackLargeAreas", "Rich Black (C:60 M:40 Y:40 K:100)"], ["overprintSmallBlackText", "100% K Overprint (<=12 pt szöveg)"]] as const).map(([key, label]) => {
            const active = state[key];
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => onUpdate(key, !active)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-mono font-semibold border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                  active ? "bg-[#075985] text-white border-[#0369A1]" : CHIP_INACTIVE
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-mono font-semibold text-[#334155] dark:text-slate-200 block">Technikai Spot Rétegek (több választható)</span>
          <div className="flex flex-wrap gap-2">
            {PRINT_SPOT_LAYERS.map((sp) => {
              const active = state.spotLayers.includes(sp.id);
              return (
                <button
                  key={sp.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleItem("spotLayers", sp.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-mono border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                    active ? "bg-[#5B21B6] text-white border-[#7C3AED]" : CHIP_INACTIVE
                  }`}
                >
                  {sp.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-mono font-semibold text-[#334155] dark:text-slate-200 block">Felületnemesítés (Finishing)</span>
          <div className="flex flex-wrap gap-2">
            {PRINT_FINISHING_OPTIONS.map((fin) => {
              const active = state.finishing.includes(fin.id);
              return (
                <button
                  key={fin.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleItem("finishing", fin.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-mono border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                    active ? "bg-[#075985] text-white border-[#0369A1]" : CHIP_INACTIVE
                  }`}
                >
                  {fin.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
