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
  Package,
  ShieldCheck,
} from "lucide-react";
import PresetChips from "@/components/molecules/PresetChips";
import {
  COLOR_PALETTE_PRESETS,
  DESIGN_STYLE_PRESETS,
  type PresetOption,
} from "@/lib/workshop-presets";
import type {
  PackagingStructure,
  PackagingSubstrate,
} from "@/types/packaging-workshop";

export const packagingFormSchema = z.object({
  productName: z.string().min(2, "Terméknév minimum 2 karakter"),
  brandName: z.string().min(2, "Márkanév minimum 2 karakter"),
  industry: z.string().min(5, "Iparág minimum 5 karakter"),
  packagingStructure: z.enum([
    "folding_carton_tuck",
    "fefco_0427_mailer",
    "rigid_luxury_box",
    "standup_pouch_doypack",
    "bottle_label_wrap",
    "shrink_sleeve_360",
    "cosmetic_jar_tube",
    "fefco_0201_shipping",
  ]),
  dimensionsMm: z
    .string()
    .min(3, "Adj meg méretet mm-ben, pl. 80 × 50 × 150 mm")
    .max(60),
  substrateAndMaterial: z.enum([
    "gc1_gc2_carton",
    "e_flute_micro_corrugated",
    "kraft_natural",
    "pp_pe_label_film",
    "metallized_film",
    "rigid_board_luxury",
  ]),
  surfaceFinishing: z.string().optional(),
  visualStyle: z.string().optional(),
  colorPreference: z.string().optional(),
  keyClaims: z.string().optional(),
  mandatoryInfo: z.string().optional(),
});

export type PackagingFormValues = z.infer<typeof packagingFormSchema>;

export const STRUCTURE_OPTIONS: PresetOption[] = [
  { id: "folding_carton_tuck", label: "Hajt. Kartondoboz (Tuck-End)", promptHint: "Folding carton tuck-end box, cosmetics/pharma" },
  { id: "fefco_0427_mailer", label: "FEFCO 0427 E-Commerce Postázó", promptHint: "FEFCO 0427 roll-end tuck mailer, unboxing" },
  { id: "rigid_luxury_box", label: "Rigidbox Luxus Díszdoboz", promptHint: "Rigid magnetic/telescopic luxury box" },
  { id: "standup_pouch_doypack", label: "Talpas Tasak / Doypack", promptHint: "Stand-up pouch doypack with zipper" },
  { id: "bottle_label_wrap", label: "Palackcímke (Hengeres)", promptHint: "Cylindrical bottle/wrap label" },
  { id: "shrink_sleeve_360", label: "360° Zsugorfólia", promptHint: "360-degree shrink sleeve label" },
  { id: "cosmetic_jar_tube", label: "Tégely/Flakon + Doboz", promptHint: "Cosmetic jar round label + outer box" },
  { id: "fefco_0201_shipping", label: "FEFCO 0201 Ipari Doboz", promptHint: "FEFCO 0201 slotted container, shelf-ready" },
];

export const SUBSTRATE_OPTIONS: PresetOption[] = [
  { id: "gc1_gc2_carton", label: "GC1/GC2 Karton 300-350g", promptHint: "GC1/GC2 coated cartonboard 300-350gsm" },
  { id: "e_flute_micro_corrugated", label: "E-Hullám + Kasírozás", promptHint: "E-flute micro corrugated + printed wrap" },
  { id: "kraft_natural", label: "Kraft Natur / Öko", promptHint: "Natural kraft / recycled eco board" },
  { id: "pp_pe_label_film", label: "BOPP/PE Címke Fólia", promptHint: "PP/PE water-resistant label film BOPP" },
  { id: "metallized_film", label: "Metallizált PET Fólia", promptHint: "Metallized silver/chrome PET foil" },
  { id: "rigid_board_luxury", label: "Rigid Box Lemezkarton", promptHint: "1200gsm greyboard + luxury wrap" },
];

export const FINISHING_OPTIONS: PresetOption[] = [
  { id: "softtouch_spotuv", label: "Soft-Touch + Spot UV + Emboss", promptHint: "Soft-touch lamination spot UV embossing" },
  { id: "hotfoil", label: "Melegfólia Prégelés", promptHint: "Silver/hologram/metallic hot foil stamping" },
  { id: "matte_dispersion", label: "Matt Lakk (Élelmiszerbarát)", promptHint: "Matte dispersion varnish food-safe" },
  { id: "window_punch", label: "PET Ablakkivágás", promptHint: "Gloss UV + PET window die-cut" },
  { id: "raw_eco", label: "Nyers Öko Felület", promptHint: "Uncoated raw eco surface" },
];

export const PACKAGING_PRESETS: Array<{
  label: string;
  values: Partial<PackagingFormValues>;
}> = [
  {
    label: "Arcszérum Doboz + Cseppentő",
    values: {
      productName: "Lumina Retinol Éjszakai Szérum",
      brandName: "Velvet Skin Lab",
      industry: "Prémium kozmetikum és dermokozmetika márka",
      packagingStructure: "folding_carton_tuck",
      dimensionsMm: "45 × 45 × 120 mm (doboz) + Ø 32 mm × 95 mm (üvegcseppentő)",
      substrateAndMaterial: "gc1_gc2_carton",
      surfaceFinishing: "Matt Soft-Touch Fólia + Ezüst/Hologram Melegfólia Prégelés márkanéven",
      visualStyle: "Dark Luxury Minimal, Quiet Luxury Editorial",
      colorPreference: "Tűzpiros & Antracit paletta",
      keyClaims: "klinikailag tesztelt, vegán, paraben- és szilikonmentes",
      mandatoryInfo: "INCI lista, 30 ml nettó, PAO jelzés, újrahasznosítási kód, EU felelős gyártó",
    },
  },
  {
    label: "Specialty Kávé Doypack",
    values: {
      productName: "Yirgacheffe Single-Origin 250g",
      brandName: "Kávéház Roasters",
      industry: "Specialty kávépörkölő és artisan kávémárka",
      packagingStructure: "standup_pouch_doypack",
      dimensionsMm: "160 × 240 × 80 mm (teljes tasak)",
      substrateAndMaterial: "pp_pe_label_film",
      surfaceFinishing: "Matt fekete BOPP + Spot UV a logón + aroma szelep",
      visualStyle: "Editorial Magazine, Specialty Coffee branding",
      colorPreference: "Monokróm + Pörkölt barna és cián akcentus",
      keyClaims: "single-origin, kisüzemi pörkölés, 250g frissen pörkölt",
      mandatoryInfo: "Összetevő, 250g nettó, pörkölési dátum, őrlési fok, EAN-13, Country of Origin: Ethiopia",
    },
  },
  {
    label: "E-Commerce VIP Postázó Doboz",
    values: {
      productName: "Aura Tech X1 Pro csomag",
      brandName: "NexaFlow",
      industry: "Prémium elektronikai termékek e-commerce kiszállítással",
      packagingStructure: "fefco_0427_mailer",
      dimensionsMm: "250 × 180 × 90 mm",
      substrateAndMaterial: "e_flute_micro_corrugated",
      surfaceFinishing: "Kasírozott matt műnyomó borítás + UV lakk a nyitófülön",
      visualStyle: "Cyber-Cyan Dark Tech, Apple Bento Grid",
      colorPreference: "Kék-Lila Cyber paletta",
      keyClaims: "ingyenes 2 év garancia, rejtett QR onboarding, prémium unboxing",
      mandatoryInfo: "EAN-13, nettó/bruttó tömeg, újrahasznosítási jel, CE jelzés (elektronika)",
    },
  },
];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/60 text-slate-200 text-sm placeholder:text-slate-600 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/40 transition-all";
const labelClass =
  "block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5";

interface PackagingInputFormProps {
  register: UseFormRegister<PackagingFormValues>;
  errors: FieldErrors<PackagingFormValues>;
  setValue: UseFormSetValue<PackagingFormValues>;
  structureValue?: PackagingStructure;
  substrateValue?: PackagingSubstrate;
  finishingValue?: string;
  visualStyle?: string;
  colorPreference?: string;
  isGenerating: boolean;
  error: string | null;
  onLoadPreset: (preset: (typeof PACKAGING_PRESETS)[number]) => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export default function PackagingInputForm({
  register,
  errors,
  setValue,
  structureValue,
  substrateValue,
  finishingValue,
  visualStyle,
  colorPreference,
  isGenerating,
  error,
  onLoadPreset,
  onSubmit,
}: PackagingInputFormProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PACKAGING_PRESETS.map((preset) => (
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
            <Package className="w-4 h-4 text-brand-primary" />
            Termék & Iparág
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Termék neve *</label>
              <input {...register("productName")} placeholder="Pl. Yirgacheffe Single-Origin 250g" className={inputClass} />
              {errors.productName && <p className="text-red-400 text-xs mt-1">{errors.productName.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Márkanév *</label>
              <input {...register("brandName")} placeholder="Pl. Kávéház Roasters" className={inputClass} />
              {errors.brandName && <p className="text-red-400 text-xs mt-1">{errors.brandName.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Iparág *</label>
              <input {...register("industry")} placeholder="Pl. Specialty kávépörkölő és artisan kávémárka" className={inputClass} />
              {errors.industry && <p className="text-red-400 text-xs mt-1">{errors.industry.message}</p>}
            </div>
          </div>
        </div>

        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-primary" />
            Struktúra, Méret & Hordozó
          </h3>
          <PresetChips
            label="Csomagolási struktúra"
            options={STRUCTURE_OPTIONS}
            value={structureValue ?? "fefco_0427_mailer"}
            onChange={(id) => id && setValue("packagingStructure", id as PackagingStructure)}
          />
          <div>
            <label className={labelClass}>Befoglaló méret mm-ben</label>
            <input {...register("dimensionsMm")} placeholder="Pl. 80 × 50 × 150 mm vagy Ø 75 mm × 120 mm" className={inputClass} />
            {errors.dimensionsMm && <p className="text-red-400 text-xs mt-1">{errors.dimensionsMm.message}</p>}
          </div>
          <PresetChips
            label="Alapanyag és hordozó"
            options={SUBSTRATE_OPTIONS}
            value={substrateValue ?? "e_flute_micro_corrugated"}
            onChange={(id) => id && setValue("substrateAndMaterial", id as PackagingSubstrate)}
          />
          <PresetChips
            label="Felületnemesítés"
            options={FINISHING_OPTIONS}
            value={finishingValue ?? null}
            onChange={(id) => setValue("surfaceFinishing", id ?? undefined)}
          />
        </div>

        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-5">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-primary" />
            Stílus, Ígéretek & Kötelező Infók
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
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={labelClass}>Fő termékígéretek / USP-k</label>
              <input {...register("keyClaims")} placeholder="Pl. klinikailag tesztelt, vegán, paraben-mentes" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Kötelező információk (INCI, tömeg, EAN-13, piktogramok)</label>
              <input {...register("mandatoryInfo")} placeholder="Pl. INCI lista, 30 ml nettó, PAO jelzés, EAN-13" className={inputClass} />
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
              Csomagolástervező dolgozik...
            </>
          ) : (
            <>
              <Package className="w-5 h-5" />
              Csomagolás Terv Generálása
            </>
          )}
        </button>
      </form>
    </>
  );
}
