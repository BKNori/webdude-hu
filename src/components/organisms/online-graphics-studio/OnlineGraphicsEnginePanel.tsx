"use client";

import { Sliders, Sparkles } from "lucide-react";
import { VISUAL_TARGET_ENGINE_CHIPS } from "@/lib/prompt-engine/presets";
import {
  TYPOGRAPHY_DIRECTION_OPTIONS,
  type OnlineGraphicsStudioState,
} from "@/data/online-graphics-studio-config";

interface OnlineGraphicsEnginePanelProps {
  state: OnlineGraphicsStudioState;
  onUpdate: <K extends keyof OnlineGraphicsStudioState>(
    key: K,
    value: OnlineGraphicsStudioState[K]
  ) => void;
}

const CAMERA_MOVES = [
  "Smooth stabilized dolly-in with subtle parallax",
  "Slow orbital macro push-in",
  "Lateral slider tracking pan (24fps)",
  "Static locked-off editorial tripod frame",
  "Handheld organic documentary micro-motion",
];

const INPUT_CLS =
  "w-full rounded-xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] px-3 py-2 text-xs text-[#0F172A] dark:text-white";
const NUM_CLS =
  "w-20 rounded-xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] px-2.5 py-2 text-xs font-mono text-[#0F172A] dark:text-white";

/** Célmotor-választó és motor-specifikus haladó paraméterek panelje (<240 sor). */
export default function OnlineGraphicsEnginePanel({
  state,
  onUpdate,
}: OnlineGraphicsEnginePanelProps) {
  return (
    <section
      aria-label="Célmotor és haladó paraméterek"
      className="rounded-3xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#111C33]/90 p-6 space-y-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white">
            1. Célmotor &amp; Szintaxis Választó
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
          {VISUAL_TARGET_ENGINE_CHIPS.map((chip) => {
            const active = state.engine === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={active}
                onClick={() => onUpdate("engine", chip.id)}
                className={`text-left rounded-2xl border p-3.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                  active
                    ? "border-[#0369A1] dark:border-[#00B5F1] bg-[#0369A1]/10 dark:bg-[#00B5F1]/15"
                    : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 hover:border-[#0369A1]/40 dark:hover:border-[#00B5F1]/40"
                }`}
              >
                <div className="text-xs font-bold font-mono text-[#0F172A] dark:text-white">{chip.label}</div>
                <div className="text-[11px] text-[#475569] dark:text-slate-300 mt-0.5 leading-snug">{chip.shortHint}</div>
              </button>
            );
          })}
        </div>
      </div>

      {state.engine === "midjourney-v7" && (
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#6D28D9] dark:text-[#A78BFA]">
            <Sliders className="w-3.5 h-3.5" aria-hidden="true" />
            Midjourney v7 Haladó Paraméterek
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {([["stylize", "--stylize", 0, 1000, 25], ["chaos", "--chaos", 0, 100, 5], ["weird", "--weird", 0, 3000, 50]] as const).map(
              ([key, label, min, max, step]) => (
                <label key={key} className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
                  <span className="font-mono font-semibold">{label} ({state[key]})</span>
                  <input type="range" min={min} max={max} step={step} value={state[key]} onChange={(e) => onUpdate(key, Number(e.target.value))} className="w-full accent-[#00B5F1]" />
                </label>
              )
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {([["styleRaw", "--style raw"], ["tile", "--tile (mintázat)"], ["draft", "--draft (gyors vázlat)"]] as const).map(([key, label]) => {
              const active = state[key];
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onUpdate(key, !active)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-mono font-semibold border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                    active
                      ? "bg-[#075985] text-white border-[#0369A1]"
                      : "bg-[#F8FAFC] dark:bg-[#0B1120] text-[#334155] dark:text-slate-300 border-slate-300 dark:border-white/15"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[#475569] dark:text-slate-300">Stílus referencia (--sref + --sw súly)</label>
              <div className="flex gap-2">
                <input type="text" value={state.sref} onChange={(e) => onUpdate("sref", e.target.value)} placeholder="pl. https://... vagy sref kód" className={INPUT_CLS} />
                <input type="number" min={0} max={1000} value={state.sw} aria-label="Stílus súly (--sw)" onChange={(e) => onUpdate("sw", Number(e.target.value))} className={NUM_CLS} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[#475569] dark:text-slate-300">Objektum referencia (--oref + --cw súly)</label>
              <div className="flex gap-2">
                <input type="text" value={state.oref} onChange={(e) => onUpdate("oref", e.target.value)} placeholder="pl. https://..." className={INPUT_CLS} />
                <input type="number" min={0} max={100} value={state.cw} aria-label="Referencia súly (--cw)" onChange={(e) => onUpdate("cw", Number(e.target.value))} className={NUM_CLS} />
              </div>
            </div>
          </div>
        </div>
      )}

      {state.engine === "ideogram-3" && (
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
            <span className="font-mono">Pontos feliratszöveg (&quot;...&quot;)</span>
            <input type="text" value={state.exactTextToRender} onChange={(e) => onUpdate("exactTextToRender", e.target.value)} placeholder="pl. WEBDUDE AI STUDIO" className={INPUT_CLS} />
          </label>
          <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
            <span className="font-mono">Tipográfiai karakter</span>
            <select value={state.typographyDirection} onChange={(e) => onUpdate("typographyDirection", e.target.value)} className={INPUT_CLS}>
              {TYPOGRAPHY_DIRECTION_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </label>
        </div>
      )}

      {state.engine === "recraft-v3-svg" && (
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
            <span className="font-mono font-semibold">Max. színszám ({state.maxVectorColors} szín)</span>
            <input type="range" min={2} max={6} value={state.maxVectorColors} onChange={(e) => onUpdate("maxVectorColors", Number(e.target.value))} className="w-full accent-[#00B5F1]" />
          </label>
          <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
            <span className="font-mono">Vektor vonal / kitöltés stílus</span>
            <input type="text" value={state.vectorStrokeStyle} onChange={(e) => onUpdate("vectorStrokeStyle", e.target.value)} className={INPUT_CLS} />
          </label>
        </div>
      )}

      {state.engine === "video-motion" && (
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-3">
          <label className="block space-y-1 text-xs text-[#334155] dark:text-slate-200">
            <span className="font-mono">0–3 mp Vizuális Hook</span>
            <input type="text" value={state.videoHook} onChange={(e) => onUpdate("videoHook", e.target.value)} className={INPUT_CLS} />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
              <span className="font-mono">Kameramozgás</span>
              <select value={state.videoCameraMove} onChange={(e) => onUpdate("videoCameraMove", e.target.value)} className={INPUT_CLS}>
                {CAMERA_MOVES.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </label>
            <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
              <span className="font-mono">Tempó / FPS</span>
              <input type="text" value={state.videoPacing} onChange={(e) => onUpdate("videoPacing", e.target.value)} className={INPUT_CLS} />
            </label>
          </div>
        </div>
      )}
    </section>
  );
}
