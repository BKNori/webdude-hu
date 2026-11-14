"use client";

import React from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { z } from "zod";
import {
  AlertTriangle,
  Layers,
  Loader2,
  Palette,
  PenTool,
  Sparkles,
} from "lucide-react";
import PresetChips from "@/components/molecules/PresetChips";
import {
  COLOR_PALETTE_PRESETS,
  DESIGN_STYLE_PRESETS,
  type PresetOption,
} from "@/lib/workshop-presets";
import type { ConstructionGrid, LogoArchetype } from "@/types/logo-workshop";

export const logoFormSchema = z.object({
  brandName: z.string().min(2, "Márkanév minimum 2 karakter"),
  tagline: z.string().max(120).optional(),
  industry: z.string().min(5, "Iparág minimum 5 karakter"),
  targetAudience: z.string().min(5, "Célközönség minimum 5 karakter"),
  logoArchetype: z.enum([
    "pictorial",
    "abstract_geometric",
    "negative_space",
    "wordmark",
    "monogram",
    "monoline",
    "emblem",
  ]),
  constructionGrid: z.enum([
    "golden_ratio",
    "swiss_modular",
    "isometric_hex",
    "bauhaus",
    "organic",
  ]),
  visualStyle: z.string().optional(),
  colorPreference: z.string().optional(),
  symbolsToInclude: z.string().optional(),
  symbolsToAvoid: z.string().optional(),
});

export type LogoFormValues = z.infer<typeof logoFormSchema>;

export const ARCHETYPE_OPTIONS: PresetOption[] = [
  { id: "pictorial", label: "Pictorial / Szimbólum", promptHint: "Pictorial symbol logo, Apple/Twitter style" },
  { id: "abstract_geometric", label: "Absztrakt Geometriai Jel", promptHint: "Abstract geometric mark, Pentagram style" },
  { id: "negative_space", label: "Negative Space", promptHint: "Negative space hidden form, FedEx style" },
  { id: "wordmark", label: "Wordmark / Tipográfiai", promptHint: "Custom typographic wordmark, ligature focus" },
  { id: "monogram", label: "Monogram / Lettermark", promptHint: "Monogram lettermark, 1-3 interwoven letters" },
  { id: "monoline", label: "Monoline / Vonalgrafika", promptHint: "Minimalist monoline line-art logo" },
  { id: "emblem", label: "Modern Emblem / Pecsét", promptHint: "Modern emblem badge, contemporary seal" },
];

export const GRID_OPTIONS: PresetOption[] = [
  { id: "golden_ratio", label: "Aranymetszés φ=1.618", promptHint: "Golden ratio Fibonacci construction grid" },
  { id: "swiss_modular", label: "Svájci Moduláris Rács", promptHint: "Swiss modular grid, Massimo Vignelli style" },
  { id: "isometric_hex", label: "Izometrikus 30° Hexa", promptHint: "Isometric 30-degree hexa grid construction" },
  { id: "bauhaus", label: "Bauhaus Alapformák", promptHint: "Bauhaus geometric primitive shapes" },
  { id: "organic", label: "Organikus Egyensúly", promptHint: "Organic freehand optical balance" },
];

export const INDUSTRY_PRESETS: Array<{
  label: string;
  values: Partial<LogoFormValues>;
}> = [
  {
    label: "FinTech / AI SaaS — NexaFlow",
    values: {
      brandName: "NexaFlow",
      tagline: "Intelligens munkafolyamat-automatizáció",
      industry: "AI SaaS platform B2B enterprise ügyfeleknek",
      targetAudience: "B2B Enterprise / Tech Startup döntéshozók",
      logoArchetype: "abstract_geometric",
      constructionGrid: "golden_ratio",
      visualStyle: "Modern Tech Gradient, Swiss Minimalist",
      colorPreference: "Kék-Lila Cyber paletta",
      symbolsToInclude: "áramlás, csomópont-hálózat, precíz geometria",
      symbolsToAvoid: "földgömb, fogaskerék, neurális agy klisé",
    },
  },
  {
    label: "Prémium Kávézó — Kuro Roast",
    values: {
      brandName: "Kuro Roast",
      tagline: "Artisan specialty kávépörkölés",
      industry: "Prémium specialty kávézó és pörkölő",
      targetAudience: "Prémium Luxury célcsoport, kávérajongók",
      logoArchetype: "monogram",
      constructionGrid: "organic",
      visualStyle: "Quiet Luxury Editorial, kézműves tipográfia",
      colorPreference: "Smaragd & Cián paletta",
      symbolsToInclude: "K monogram, pörkölési árnyalatok, botanika",
      symbolsToAvoid: "kávészem klisé, steam-jel, trópusi levél",
    },
  },
  {
    label: "Építészeti Stúdió — Monolith",
    values: {
      brandName: "Monolith Studio",
      tagline: "Belsőépítészet és tértervezés",
      industry: "Építészeti és belsőépítészeti tervezőiroda",
      targetAudience: "Prémium fejlesztők, magánszemélyek, B2B irodapiac",
      logoArchetype: "abstract_geometric",
      constructionGrid: "swiss_modular",
      visualStyle: "Swiss International, brutalista precizitás",
      colorPreference: "Monokróm Fekete-Fehér + egy akcentus",
      symbolsToInclude: "tömb, metszet, vonal-perspektíva",
      symbolsToAvoid: "ház klisé, vonalzó, ceruza",
    },
  },
];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/60 text-slate-200 text-sm placeholder:text-slate-600 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/40 transition-all";
const labelClass =
  "block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5";

interface LogoInputFormProps {
  register: UseFormRegister<LogoFormValues>;
  errors: FieldErrors<LogoFormValues>;
  setValue: UseFormSetValue<LogoFormValues>;
  logoArchetypeValue?: LogoArchetype;
  constructionGridValue?: ConstructionGrid;
  visualStyle?: string;
  colorPreference?: string;
  isGenerating: boolean;
  error: string | null;
  onLoadPreset: (preset: (typeof INDUSTRY_PRESETS)[number]) => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export default function LogoInputForm({
  register,
  errors,
  setValue,
  logoArchetypeValue,
  constructionGridValue,
  visualStyle,
  colorPreference,
  isGenerating,
  error,
  onLoadPreset,
  onSubmit,
}: LogoInputFormProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {INDUSTRY_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => onLoadPreset(preset)}
            className="px-4 py-3 rounded-xl border border-brand-primary/25 bg-brand-primary/5 text-left text-xs font-bold text-brand-primary hover:bg-brand-primary/15 hover:border-brand-primary/50 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-5">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <PenTool className="w-4 h-4 text-brand-primary" />
            Márka Alapadatok
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Márkanév / Cégnév *</label>
              <input {...register("brandName")} placeholder="Pl. NexaFlow" className={inputClass} />
              {errors.brandName && <p className="text-red-400 text-xs mt-1">{errors.brandName.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Tagline / Alcím</label>
              <input {...register("tagline")} placeholder="Pl. Intelligens munkafolyamat-automatizáció" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Iparág & Tevékenység *</label>
              <input {...register("industry")} placeholder="Pl. AI SaaS platform B2B ügyfeleknek" className={inputClass} />
              {errors.industry && <p className="text-red-400 text-xs mt-1">{errors.industry.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Célcsoport & Pozicionálás *</label>
              <input {...register("targetAudience")} placeholder="Pl. B2B Enterprise döntéshozók" className={inputClass} />
              {errors.targetAudience && <p className="text-red-400 text-xs mt-1">{errors.targetAudience.message}</p>}
            </div>
          </div>
        </div>

        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-primary" />
            Logó-architektúra & Konstrukció
          </h3>
          <PresetChips
            label="Logó-architektúra"
            options={ARCHETYPE_OPTIONS}
            value={logoArchetypeValue ?? "abstract_geometric"}
            onChange={(id) => id && setValue("logoArchetype", id as LogoArchetype)}
          />
          <PresetChips
            label="Konstrukciós rács"
            options={GRID_OPTIONS}
            value={constructionGridValue ?? "golden_ratio"}
            onChange={(id) => id && setValue("constructionGrid", id as ConstructionGrid)}
          />
        </div>

        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Palette className="w-4 h-4 text-brand-primary" />
            Stílus & Színpaletta
          </h3>
          <PresetChips
            label="Design irányzat"
            options={DESIGN_STYLE_PRESETS}
            value={visualStyle ?? null}
            onChange={(id) => setValue("visualStyle", id ?? undefined)}
          />
          <PresetChips
            label="Színpaletta"
            options={COLOR_PALETTE_PRESETS}
            value={colorPreference ?? null}
            onChange={(id) => setValue("colorPreference", id ?? undefined)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Kért metaforák / motívumok</label>
              <input {...register("symbolsToInclude")} placeholder="Pl. áramlás, geometria, botanika" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Tiltott klisék</label>
              <input {...register("symbolsToAvoid")} placeholder="Pl. ne legyen földgömb vagy fogaskerék" className={inputClass} />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/5 border border-red-500/40 backdrop-blur-xl shadow-[0_0_24px_rgba(239,68,68,0.15)] text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-4 rounded-xl bg-linear-to-r from-cta-from to-cta-to hover:bg-cta-hover text-white font-sans font-semibold text-sm uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Arculattervező stúdió dolgozik...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />3 Logókoncepció Generálása
            </>
          )}
        </button>
      </form>
    </>
  );
}
