"use client";

import { AlertTriangle, Camera, LayoutGrid, Palette, RotateCcw, ShieldBan, Wand2 } from "lucide-react";
import { ANTI_AI_SLOP_NEGATIVE_CHIPS } from "@/lib/prompt-engine/presets";
import {
  COPY_SPACE_OPTIONS,
  DEPTH_SEPARATION_OPTIONS,
  LIGHTING_PHYSICS_OPTIONS,
  MATERIAL_TEXTURE_OPTIONS,
  ONLINE_GRAPHICS_PRESETS,
  ONLINE_PLATFORM_FORMATS,
  OPTICS_LENS_OPTIONS,
  PALETTE_LOCK_OPTIONS,
  READING_PATTERN_OPTIONS,
  VISUAL_STYLE_OPTIONS,
  type OnlineGraphicsPreset,
  type OnlineGraphicsStudioState,
  type StudioOptionItem,
} from "@/data/online-graphics-studio-config";

interface OnlineGraphicsFormProps {
  state: OnlineGraphicsStudioState;
  onUpdate: <K extends keyof OnlineGraphicsStudioState>(key: K, value: OnlineGraphicsStudioState[K]) => void;
  onApplyPreset: (preset: OnlineGraphicsPreset) => void;
  onReset: () => void;
}

const CARD_CLS =
  "rounded-3xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#111C33]/90 p-6 space-y-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]";
const SELECT_CLS =
  "w-full rounded-xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] px-3 py-2 text-xs text-[#0F172A] dark:text-white";
const CHIP_INACTIVE =
  "bg-[#F8FAFC] dark:bg-[#0B1120] text-[#334155] dark:text-slate-300 border-slate-300 dark:border-white/15";

function SelectControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly StudioOptionItem<T>[];
  onChange: (next: T) => void;
}) {
  return (
    <label className="space-y-1 text-xs text-[#334155] dark:text-slate-200">
      <span className="font-mono font-semibold">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value as T)} className={SELECT_CLS}>
        {options.map((o) => (
          <option key={o.id} value={o.id}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

/** Online Grafika & Kampány Pro Prompt Stúdió beállító űrlap (<280 sor). */
export default function OnlineGraphicsForm({
  state,
  onUpdate,
  onApplyPreset,
  onReset,
}: OnlineGraphicsFormProps) {
  const activeFormat = ONLINE_PLATFORM_FORMATS.find((f) => f.id === state.platformFormat) ?? ONLINE_PLATFORM_FORMATS[0];

  const toggleArrayItem = (key: "materials" | "negativeChipIds", itemId: string) => {
    const current = state[key];
    onUpdate(key, current.includes(itemId) ? current.filter((x) => x !== itemId) : [...current, itemId]);
  };

  return (
    <div className="space-y-6">
      <section aria-label="Gyors kampány presetek" className={CARD_CLS}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
            <Wand2 className="w-4 h-4" aria-hidden="true" />
            1-Kattintásos Kampány Sablonok
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
          {ONLINE_GRAPHICS_PRESETS.map((preset) => (
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
      </section>

      <section aria-label="Kreatív brief és platform formátum" className={CARD_CLS}>
        <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white">
          <LayoutGrid className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
          2. Kreatív Brief, Platform &amp; Safe-Zone
        </div>

        <div className="space-y-3">
          <label className="block space-y-1.5 text-xs font-semibold text-[#0F172A] dark:text-white">
            <span>Fő vizuális téma / jelenet leírása</span>
            <textarea
              rows={3}
              value={state.subject}
              onChange={(e) => onUpdate("subject", e.target.value)}
              placeholder="Írd le a fő témát, környezetet és kampányüzenetet..."
              className="w-full rounded-2xl border border-slate-300 dark:border-white/15 bg-[#F8FAFC] dark:bg-[#0B1120] p-3.5 text-xs sm:text-sm text-[#0F172A] dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
            />
          </label>
          <label className="block space-y-1 text-xs text-[#334155] dark:text-slate-300">
            <span className="font-mono">Márkanév / Célközönség (opcionális)</span>
            <input type="text" value={state.brandOrAudience} onChange={(e) => onUpdate("brandOrAudience", e.target.value)} placeholder="pl. Prémium B2B SaaS döntéshozók" className={SELECT_CLS} />
          </label>
        </div>

        <div className="space-y-2.5">
          <span className="text-xs font-mono font-semibold text-[#334155] dark:text-slate-200 block">Célplatform &amp; Safe-Zone Geometria</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ONLINE_PLATFORM_FORMATS.map((fmt) => {
              const active = state.platformFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    onUpdate("platformFormat", fmt.id);
                    onUpdate("customAspectRatio", fmt.aspectRatio);
                  }}
                  className={`text-left rounded-2xl border p-3 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                    active ? "border-[#0369A1] dark:border-[#00B5F1] bg-[#0369A1]/10 dark:bg-[#00B5F1]/15" : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120]/70 hover:border-[#0369A1]/40"
                  }`}
                >
                  <div className="text-xs font-bold text-[#0F172A] dark:text-white">{fmt.label}</div>
                  <div className="text-[11px] font-mono text-[#0369A1] dark:text-[#00B5F1]">{fmt.pixelSpec}</div>
                </button>
              );
            })}
          </div>

          <div
            className={`rounded-2xl border p-3.5 text-xs flex items-start gap-2.5 ${
              activeFormat.isVerticalSafeZoneWarning
                ? "border-[#6D28D9]/40 dark:border-[#A78BFA]/40 bg-violet-50/80 dark:bg-violet-950/35 text-[#0F172A] dark:text-slate-100"
                : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120] text-[#334155] dark:text-slate-300"
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-[#6D28D9] dark:text-[#A78BFA] shrink-0 mt-0.5" aria-hidden="true" />
            <span>{activeFormat.safeZoneInfoHu}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <SelectControl label="Copy-Space (Szövegtér)" value={state.copySpace} options={COPY_SPACE_OPTIONS} onChange={(v) => onUpdate("copySpace", v)} />
          <SelectControl label="Tekintetvezetés" value={state.readingPattern} options={READING_PATTERN_OPTIONS} onChange={(v) => onUpdate("readingPattern", v)} />
          <SelectControl label="Mélységélesség" value={state.depthSeparation} options={DEPTH_SEPARATION_OPTIONS} onChange={(v) => onUpdate("depthSeparation", v)} />
        </div>

        <button
          type="button"
          aria-pressed={state.wcagContrastBackdrop}
          onClick={() => onUpdate("wcagContrastBackdrop", !state.wcagContrastBackdrop)}
          className={`rounded-2xl border px-4 py-2.5 text-xs font-mono font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
            state.wcagContrastBackdrop
              ? "border-[#0369A1] dark:border-[#00B5F1] bg-[#0369A1]/10 dark:bg-[#00B5F1]/15 text-[#0369A1] dark:text-[#00B5F1]"
              : "border-slate-300 dark:border-white/15 text-[#475569] dark:text-slate-300"
          }`}
        >
          WCAG AA Kontraszt-Háttér Zóna ({state.wcagContrastBackdrop ? "Aktív 4.5:1+" : "Kikapcsolva"})
        </button>
      </section>

      <section aria-label="Stílus, optika, világítás és színpaletta" className={CARD_CLS}>
        <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white">
          <Camera className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
          3. Stílus, Optika, Fényfizika &amp; Anyagok
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SelectControl label="Vizuális Stílus" value={state.visualStyle} options={VISUAL_STYLE_OPTIONS} onChange={(v) => onUpdate("visualStyle", v)} />
          <SelectControl label="Kamera Optika" value={state.opticsLens} options={OPTICS_LENS_OPTIONS} onChange={(v) => onUpdate("opticsLens", v)} />
          <SelectControl label="Fényfizika" value={state.lightingPhysics} options={LIGHTING_PHYSICS_OPTIONS} onChange={(v) => onUpdate("lightingPhysics", v)} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-semibold text-[#334155] dark:text-slate-200 block">Anyagtextúra Chipek</span>
          <div className="flex flex-wrap gap-2">
            {MATERIAL_TEXTURE_OPTIONS.map((mat) => {
              const active = state.materials.includes(mat.id);
              return (
                <button
                  key={mat.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleArrayItem("materials", mat.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-mono border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                    active ? "bg-[#075985] text-white border-[#0369A1]" : CHIP_INACTIVE
                  }`}
                >
                  {mat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#334155] dark:text-slate-200">
            <Palette className="w-3.5 h-3.5 text-[#6D28D9] dark:text-[#A78BFA]" aria-hidden="true" />
            Brand Színpaletta-Zár
          </div>
          <div className="flex flex-wrap gap-2">
            {PALETTE_LOCK_OPTIONS.map((pal) => {
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
            <input type="text" value={state.customHexColors} onChange={(e) => onUpdate("customHexColors", e.target.value)} placeholder="#00B5F1, #7C3AED, #0B1120" aria-label="Saját HEX színkódok vesszővel elválasztva" className={SELECT_CLS} />
          )}
        </div>
      </section>

      <section aria-label="Anti-AI-Slop negatív szűrők" className={CARD_CLS}>
        <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-white">
          <ShieldBan className="w-4 h-4 text-[#6D28D9] dark:text-[#A78BFA]" aria-hidden="true" />
          4. Anti-AI-Slop Negatív Szűrő
        </div>

        <div className="flex flex-wrap gap-2">
          {ANTI_AI_SLOP_NEGATIVE_CHIPS.map((chip) => {
            const active = state.negativeChipIds.includes(chip.id);
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleArrayItem("negativeChipIds", chip.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-mono border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                  active ? "bg-[#5B21B6] text-white border-[#7C3AED]" : CHIP_INACTIVE
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        <input type="text" value={state.customNegative} onChange={(e) => onUpdate("customNegative", e.target.value)} placeholder="Egyedi kizárások vesszővel elválasztva (pl. gold, yellow, neon clutter)" aria-label="Egyedi negatív kulcsszavak" className={SELECT_CLS} />
      </section>
    </div>
  );
}
