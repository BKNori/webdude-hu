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
  Loader2,
  MonitorPlay,
  Palette,
  Ruler,
} from "lucide-react";
import PresetChips from "@/components/molecules/PresetChips";
import {
  COLOR_PALETTE_PRESETS,
  DESIGN_STYLE_PRESETS,
  type PresetOption,
} from "@/lib/workshop-presets";
import type {
  SignageFormat,
  SignageSubstrate,
  ViewingDistance,
} from "@/types/signage-workshop";

export const signageFormSchema = z.object({
  campaignOrHeadline: z.string().min(2, "Fő üzenet minimum 2 karakter"),
  brandName: z.string().min(2, "Márkanév minimum 2 karakter"),
  industry: z.string().min(5, "Iparág minimum 5 karakter"),
  signageFormat: z.enum([
    "rollup_standard_85x200",
    "rollup_wide_100x200",
    "storefront_window_graphics",
    "vehicle_van_car_wrap",
    "outdoor_pvc_mesh_banner",
    "exhibition_popup_wall",
    "pavement_a_board_dibond",
    "indoor_wall_floor_tattoo",
  ]),
  dimensionsAndScale: z
    .string()
    .min(3, "Adj meg méretet, pl. 85 × 200 cm")
    .max(80),
  substrateAndFoil: z.enum([
    "rollup_film_240g",
    "one_way_vision_owv",
    "cast_vinyl_wrap",
    "plotter_cut_foil",
    "pvc_frontlit_mesh",
    "dibond_forex_board",
  ]),
  viewingDistance: z.enum(["close_1_3m", "mid_3_10m", "far_10_30m"]),
  visualStyle: z.string().optional(),
  colorPreference: z.string().optional(),
  contactAndCta: z.string().optional(),
});

export type SignageFormValues = z.infer<typeof signageFormSchema>;

export const FORMAT_OPTIONS: PresetOption[] = [
  { id: "rollup_standard_85x200", label: "Roll-up 85×200", promptHint: "Standard rollup banner 850x2000mm" },
  { id: "rollup_wide_100x200", label: "Széles Roll-up / L-Banner", promptHint: "Wide premium rollup L-banner 1000x2000mm" },
  { id: "storefront_window_graphics", label: "Kirakat OWV + Plotter", promptHint: "Storefront window graphics one-way vision" },
  { id: "vehicle_van_car_wrap", label: "Autó- / Furgondekor", promptHint: "Vehicle van car wrap cast vinyl" },
  { id: "outdoor_pvc_mesh_banner", label: "Kültéri Molinó / Mesh", promptHint: "Outdoor PVC mesh banner building wrap" },
  { id: "exhibition_popup_wall", label: "Sajtófal / Pop-up Fal", promptHint: "Exhibition popup backdrop wall 3000x2250mm" },
  { id: "pavement_a_board_dibond", label: "A-Board / Dibond Cégtábla", promptHint: "A-board pavement dibond fascia sign" },
  { id: "indoor_wall_floor_tattoo", label: "Falmatrica / Padlógrafika", promptHint: "Indoor wall mural floor graphic R10" },
];

export const SUBSTRATE_OPTIONS: PresetOption[] = [
  { id: "rollup_film_240g", label: "240g Grayback Roll-up", promptHint: "240g grayback roll-up film" },
  { id: "one_way_vision_owv", label: "OWV Ablakfólia", promptHint: "One-way vision perforated window film" },
  { id: "cast_vinyl_wrap", label: "Cast Vinyl Autófólia", promptHint: "3M Oracal Avery cast vinyl wrap" },
  { id: "plotter_cut_foil", label: "Plotter Vágott / Etched Glass", promptHint: "Plotter cut vinyl etched glass decal" },
  { id: "pvc_frontlit_mesh", label: "PVC Frontlit / Mesh", promptHint: "510g PVC frontlit 350g mesh banner" },
  { id: "dibond_forex_board", label: "Dibond / Forex", promptHint: "3mm dibond aluminium composite forex" },
];

export const DISTANCE_OPTIONS: PresetOption[] = [
  { id: "close_1_3m", label: "Közeli 1–3 m", promptHint: "Close viewing 1-3m indoor reception" },
  { id: "mid_3_10m", label: "Közepes 3–10 m", promptHint: "Mid viewing 3-10m storefront pedestrian" },
  { id: "far_10_30m", label: "Távoli / Mozgó 10–30+ m", promptHint: "Far moving viewing 10-30m road vehicle" },
];

export const SIGNAGE_PRESETS: Array<{
  label: string;
  values: Partial<SignageFormValues>;
}> = [
  {
    label: "Konferenciás Roll-up",
    values: {
      campaignOrHeadline: "Weboldal Készítés 7 Nap Alatt — Ingyenes Audit",
      brandName: "WebDude",
      industry: "Webfejlesztés és digitális marketing ügynökség",
      signageFormat: "rollup_standard_85x200",
      dimensionsAndScale: "85 × 200 cm (nyomtatható terület)",
      substrateAndFoil: "rollup_film_240g",
      viewingDistance: "close_1_3m",
      visualStyle: "Cyber-Cyan Dark Tech, Swiss Minimalist Grid",
      colorPreference: "Kék-Lila Cyber paletta",
      contactAndCta: "webdude.hu • +36 30 123 4567",
    },
  },
  {
    label: "Utcai Kirakatdekor OWV",
    values: {
      campaignOrHeadline: "Minőségi Kézműves Kávé — Személyesen Pörkölve",
      brandName: "Kuro Roast",
      industry: "Specialty kávépörkölő és kávézó",
      signageFormat: "storefront_window_graphics",
      dimensionsAndScale: "Kirakat: 320 × 240 cm",
      substrateAndFoil: "one_way_vision_owv",
      viewingDistance: "mid_3_10m",
      visualStyle: "Quiet Luxury Editorial, Editorial Magazine",
      colorPreference: "Monokróm Fekete-Fehér + Cián akcentus",
      contactAndCta: "kuroroast.hu • H-P 7:30-18:00",
    },
  },
  {
    label: "Céges Furgon L2H2 Autódekor",
    values: {
      campaignOrHeadline: "Építési Anyagok Szállítása — Hívj Most",
      brandName: "ÉpítőLog Kft.",
      industry: "Építőanyag-kereskedelem és szállítás",
      signageFormat: "vehicle_van_car_wrap",
      dimensionsAndScale: "L2H2 furgon teljes wrap (kb. 12 m²)",
      substrateAndFoil: "cast_vinyl_wrap",
      viewingDistance: "far_10_30m",
      visualStyle: "High-Impact Promo, Neo-Brutalist Bold",
      colorPreference: "Tűzpiros & Antracit paletta",
      contactAndCta: "+36 70 987 6543 • epitolog.hu",
    },
  },
];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/60 text-slate-200 text-sm placeholder:text-slate-600 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/40 transition-all";
const labelClass =
  "block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5";

interface SignageInputFormProps {
  register: UseFormRegister<SignageFormValues>;
  errors: FieldErrors<SignageFormValues>;
  setValue: UseFormSetValue<SignageFormValues>;
  formatValue?: SignageFormat;
  substrateValue?: SignageSubstrate;
  distanceValue?: ViewingDistance;
  visualStyle?: string;
  colorPreference?: string;
  isGenerating: boolean;
  error: string | null;
  onLoadPreset: (preset: (typeof SIGNAGE_PRESETS)[number]) => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export default function SignageInputForm({
  register,
  errors,
  setValue,
  formatValue,
  substrateValue,
  distanceValue,
  visualStyle,
  colorPreference,
  isGenerating,
  error,
  onLoadPreset,
  onSubmit,
}: SignageInputFormProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SIGNAGE_PRESETS.map((preset) => (
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
            <MonitorPlay className="w-4 h-4 text-brand-primary" />
            Üzenet & Márka
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Fő üzenet / Kampány / Szolgáltatás neve *</label>
              <input {...register("campaignOrHeadline")} placeholder="Pl. Weboldal Készítés 7 Nap Alatt — Ingyenes Audit" className={inputClass} />
              {errors.campaignOrHeadline && <p className="text-red-400 text-xs mt-1">{errors.campaignOrHeadline.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Márka / Cégnév *</label>
              <input {...register("brandName")} placeholder="Pl. WebDude" className={inputClass} />
              {errors.brandName && <p className="text-red-400 text-xs mt-1">{errors.brandName.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Iparág *</label>
              <input {...register("industry")} placeholder="Pl. Webfejlesztés és digitális marketing ügynökség" className={inputClass} />
              {errors.industry && <p className="text-red-400 text-xs mt-1">{errors.industry.message}</p>}
            </div>
          </div>
        </div>

        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Ruler className="w-4 h-4 text-brand-primary" />
            Formátum, Méret & Hordozó
          </h3>
          <PresetChips
            label="Nagyformátumú struktúra"
            options={FORMAT_OPTIONS}
            value={formatValue ?? "rollup_standard_85x200"}
            onChange={(id) => id && setValue("signageFormat", id as SignageFormat)}
          />
          <div>
            <label className={labelClass}>Pontos befoglaló méret</label>
            <input {...register("dimensionsAndScale")} placeholder="Pl. 85 × 200 cm vagy Kirakat: 320 × 240 cm" className={inputClass} />
            {errors.dimensionsAndScale && <p className="text-red-400 text-xs mt-1">{errors.dimensionsAndScale.message}</p>}
          </div>
          <PresetChips
            label="Hordozó és fólia technológia"
            options={SUBSTRATE_OPTIONS}
            value={substrateValue ?? "rollup_film_240g"}
            onChange={(id) => id && setValue("substrateAndFoil", id as SignageSubstrate)}
          />
          <PresetChips
            label="Olvasási távolság"
            options={DISTANCE_OPTIONS}
            value={distanceValue ?? "close_1_3m"}
            onChange={(id) => id && setValue("viewingDistance", id as ViewingDistance)}
          />
        </div>

        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-5">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Palette className="w-4 h-4 text-brand-primary" />
            Stílus, Színek & Kapcsolat
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
          <div>
            <label className={labelClass}>Kapcsolat / CTA (max. 3 másodperces befogadási szabály)</label>
            <input {...register("contactAndCta")} placeholder="Pl. webdude.hu • +36 30 123 4567" className={inputClass} />
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
              Dekoratőr dolgozik...
            </>
          ) : (
            <>
              <MonitorPlay className="w-5 h-5" />
              Dekoráció Terv Generálása
            </>
          )}
        </button>
      </form>
    </>
  );
}
