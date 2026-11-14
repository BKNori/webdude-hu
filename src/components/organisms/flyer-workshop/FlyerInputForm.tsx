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
  FileText,
  Loader2,
  Palette,
  Printer,
  Ruler,
} from "lucide-react";
import PresetChips from "@/components/molecules/PresetChips";
import {
  COLOR_PALETTE_PRESETS,
  DESIGN_STYLE_PRESETS,
  type PresetOption,
} from "@/lib/workshop-presets";
import type {
  DistributionChannel,
  FlyerFormat,
  PaperAndFinish,
} from "@/types/flyer-workshop";

export const flyerFormSchema = z.object({
  campaignTitle: z.string().min(3, "Kampány neve minimum 3 karakter"),
  brandName: z.string().min(2, "Márkanév minimum 2 karakter"),
  industry: z.string().min(5, "Iparág minimum 5 karakter"),
  flyerFormat: z.enum([
    "A5_ketoldalas",
    "A6_kupon",
    "DL_exkluziv",
    "A4_ismertető",
    "A4_LA4_gongyolt",
    "A4_LA4_harmonikahajtas",
    "A4_A5_bifold",
    "negyzetes_premium",
  ]),
  paperAndFinish: z.enum([
    "135g_fenyes_munyomo",
    "170g_matt_munyomo",
    "250g_softtouch_spotuv",
    "120g_kraft_natur",
    "300g_kreativ_karton_pregelesc",
  ]),
  distributionChannel: z.enum([
    "kezbe_adott",
    "postalada",
    "unboxing_kupon",
    "display_pultos",
  ]),
  visualStyle: z.string().optional(),
  colorPreference: z.string().optional(),
  offerOrHook: z.string().optional(),
  callToAction: z.string().optional(),
});

export type FlyerFormValues = z.infer<typeof flyerFormSchema>;

export const FORMAT_OPTIONS: PresetOption[] = [
  { id: "A5_ketoldalas", label: "A5 Kétoldalas", promptHint: "A5 148×210mm classic two-sided flyer" },
  { id: "A6_kupon", label: "A6 Kupon", promptHint: "A6 105×148mm compact coupon flyer" },
  { id: "DL_exkluziv", label: "DL Exkluzív", promptHint: "DL 99×210mm slim exclusive/menu flyer" },
  { id: "A4_ismertető", label: "A4 Ismertető", promptHint: "A4 210×297mm large two-sided brochure" },
  { id: "A4_LA4_gongyolt", label: "A4→LA4 Göngyölt (6 old.)", promptHint: "Tri-fold gatefold 97-100-100mm, 6 panels" },
  { id: "A4_LA4_harmonikahajtas", label: "A4→LA4 Z-Fold (6 old.)", promptHint: "Z-fold harmonic leporello 99-99-99mm, 6 panels" },
  { id: "A4_A5_bifold", label: "A4→A5 Bi-fold (4 old.)", promptHint: "Bi-fold A4 to A5, 4-panel leaflet" },
  { id: "negyzetes_premium", label: "Négyzetes Prémium", promptHint: "148×148mm square premium boutique flyer" },
];

export const PAPER_OPTIONS: PresetOption[] = [
  { id: "135g_fenyes_munyomo", label: "135g Fényes Műnyomó", promptHint: "135gsm coated glossy paper", colors: ["#ffffff"] },
  { id: "170g_matt_munyomo", label: "170g Matt Műnyomó", promptHint: "170gsm matte coated paper", colors: ["#e2e8f0"] },
  { id: "250g_softtouch_spotuv", label: "250g Soft-Touch + Spot UV", promptHint: "250gsm soft-touch lamination spot UV", colors: ["#1e293b"] },
  { id: "120g_kraft_natur", label: "120g Kraft Natur", promptHint: "120gsm recycled kraft natural paper", colors: ["#64748b"] },
  { id: "300g_kreativ_karton_pregelesc", label: "300g Karton + Prégelés", promptHint: "300gsm creative card cyan/violet metallic foil", colors: ["#7C3AED"] },
];

export const CHANNEL_OPTIONS: PresetOption[] = [
  { id: "kezbe_adott", label: "Kézbe adott / Rendezvény", promptHint: "hand-to-hand event distribution" },
  { id: "postalada", label: "Postaládás (Direct Mail)", promptHint: "letterbox direct mail distribution" },
  { id: "unboxing_kupon", label: "Unboxing Kupon", promptHint: "pack-in coupon unboxing experience" },
  { id: "display_pultos", label: "Pultos / Display", promptHint: "counter display standee placement" },
];

export const FLYER_PRESETS: Array<{
  label: string;
  values: Partial<FlyerFormValues>;
}> = [
  {
    label: "Prémium Unboxing Kupon (DL 99×210)",
    values: {
      campaignTitle: "VIP Tavaszi Kollekció — Korlátozott Kupon",
      brandName: "Atelier Noir",
      industry: "Prémium kézműves illatszer és kozmetikum márka",
      flyerFormat: "DL_exkluziv",
      paperAndFinish: "250g_softtouch_spotuv",
      distributionChannel: "unboxing_kupon",
      visualStyle: "Dark Luxury Minimal, Quiet Luxury Editorial",
      colorPreference: "Tűzpiros & Antracit paletta",
      offerOrHook: "-25% kuponkód az első rendeléssel, ingyenes mintacsomag",
      callToAction: "Kuponkód beváltása a webáruházban + QR kód",
    },
  },
  {
    label: "B2B Leporelló Prospektus (6 old.)",
    values: {
      campaignTitle: "Vállalati Weboldal & AI Automatizáció Csomag",
      brandName: "WebDude",
      industry: "Webfejlesztés, AI automatizáció és digitális marketing ügynökség",
      flyerFormat: "A4_LA4_gongyolt",
      paperAndFinish: "170g_matt_munyomo",
      distributionChannel: "kezbe_adott",
      visualStyle: "Swiss Grid Bold, Clean Corporate",
      colorPreference: "Kék-Lila Cyber paletta",
      offerOrHook: "Ingyenes 30 perces AI-ready konzultáció + audit",
      callToAction: "Időpontfoglalás + webdude.hu hivatkozás",
    },
  },
  {
    label: "Gastro Rendezvény Szórólap (A5)",
    values: {
      campaignTitle: "Őszi Gasztrofesztivál — Kóstoló Menü",
      brandName: "Borkő Bisztró",
      industry: "Gasztro rendezvények és szezonális éttermek",
      flyerFormat: "A5_ketoldalas",
      paperAndFinish: "135g_fenyes_munyomo",
      distributionChannel: "postalada",
      visualStyle: "High-Impact Promo, Editorial Magazine",
      colorPreference: "Pasztell Korall & Krém",
      offerOrHook: "2 főre szóló kóstoló menü -30% kedvezménnyel",
      callToAction: "Telefonos foglalás + QR menülink",
    },
  },
];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/60 text-slate-200 text-sm placeholder:text-slate-600 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/40 transition-all";
const labelClass =
  "block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5";

interface FlyerInputFormProps {
  register: UseFormRegister<FlyerFormValues>;
  errors: FieldErrors<FlyerFormValues>;
  setValue: UseFormSetValue<FlyerFormValues>;
  flyerFormatValue?: FlyerFormat;
  paperValue?: PaperAndFinish;
  channelValue?: DistributionChannel;
  visualStyle?: string;
  colorPreference?: string;
  isGenerating: boolean;
  error: string | null;
  onLoadPreset: (preset: (typeof FLYER_PRESETS)[number]) => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export default function FlyerInputForm({
  register,
  errors,
  setValue,
  flyerFormatValue,
  paperValue,
  channelValue,
  visualStyle,
  colorPreference,
  isGenerating,
  error,
  onLoadPreset,
  onSubmit,
}: FlyerInputFormProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {FLYER_PRESETS.map((preset) => (
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
            <FileText className="w-4 h-4 text-brand-primary" />
            Kampány Alapadatok
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Kampány / Termék / Esemény *</label>
              <input {...register("campaignTitle")} placeholder="Pl. Őszi Gasztrofesztivál — Kóstoló Menü" className={inputClass} />
              {errors.campaignTitle && <p className="text-red-400 text-xs mt-1">{errors.campaignTitle.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Márka / Cégnév *</label>
              <input {...register("brandName")} placeholder="Pl. Borkő Bisztró" className={inputClass} />
              {errors.brandName && <p className="text-red-400 text-xs mt-1">{errors.brandName.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Iparág *</label>
              <input {...register("industry")} placeholder="Pl. Gasztro rendezvények és szezonális éttermek" className={inputClass} />
              {errors.industry && <p className="text-red-400 text-xs mt-1">{errors.industry.message}</p>}
            </div>
          </div>
        </div>

        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Ruler className="w-4 h-4 text-brand-primary" />
            Nyomdai Formátum, Papír & Terjesztés
          </h3>
          <PresetChips
            label="Formátum és hajtás"
            options={FORMAT_OPTIONS}
            value={flyerFormatValue ?? "A5_ketoldalas"}
            onChange={(id) => id && setValue("flyerFormat", id as FlyerFormat)}
          />
          <PresetChips
            label="Papír és felületnemesítés"
            options={PAPER_OPTIONS}
            value={paperValue ?? "170g_matt_munyomo"}
            onChange={(id) => id && setValue("paperAndFinish", id as PaperAndFinish)}
          />
          <PresetChips
            label="Terjesztési csatorna"
            options={CHANNEL_OPTIONS}
            value={channelValue ?? "kezbe_adott"}
            onChange={(id) => id && setValue("distributionChannel", id as DistributionChannel)}
          />
        </div>

        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-5">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Palette className="w-4 h-4 text-brand-primary" />
            Stílus, Ajánlat & Konverzió
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
              <label className={labelClass}>Fő ajánlat / Kedvezmény / Hook</label>
              <input {...register("offerOrHook")} placeholder="Pl. -20% kuponkód, ingyenes felmérés" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Konverziós cél / CTA</label>
              <input {...register("callToAction")} placeholder="Pl. QR kód, telefonszám, kuponbeváltás" className={inputClass} />
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
              Prepress tervező dolgozik...
            </>
          ) : (
            <>
              <Printer className="w-5 h-5" />
              Nyomdakész Terv Generálása
            </>
          )}
        </button>
      </form>
    </>
  );
}
