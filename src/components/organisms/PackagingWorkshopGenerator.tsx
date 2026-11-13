"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import {
  AlertTriangle,
  Loader2,
  ArrowLeft,
  Package,
  Ruler,
  Palette,
  Type,
  Layers,
  CheckCircle2,
  Bot,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import ToolAccessLock from "@/components/molecules/ToolAccessLock";
import PresetChips from "@/components/molecules/PresetChips";
import CopyButton from "@/components/atoms/CopyButton";
import {
  DESIGN_STYLE_PRESETS,
  COLOR_PALETTE_PRESETS,
} from "@/lib/workshop-presets";
import type { PresetOption } from "@/lib/workshop-presets";
import { auth } from "@/lib/firebase";
import { addPackagingGenerationAction } from "@/actions/packaging-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  PackagingWorkshopInput,
  PackagingGenerationOutput,
  PackagingStructure,
  PackagingSubstrate,
} from "@/types/packaging-workshop";

const packagingFormSchema = z.object({
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

type PackagingFormValues = z.infer<typeof packagingFormSchema>;

const STRUCTURE_OPTIONS: PresetOption[] = [
  {
    id: "folding_carton_tuck",
    label: "Hajt. Kartondoboz (Tuck-End)",
    promptHint: "Folding carton tuck-end box, cosmetics/pharma",
  },
  {
    id: "fefco_0427_mailer",
    label: "FEFCO 0427 E-Commerce Postázó",
    promptHint: "FEFCO 0427 roll-end tuck mailer, unboxing",
  },
  {
    id: "rigid_luxury_box",
    label: "Rigidbox Luxus Díszdoboz",
    promptHint: "Rigid magnetic/telescopic luxury box",
  },
  {
    id: "standup_pouch_doypack",
    label: "Talpas Tasak / Doypack",
    promptHint: "Stand-up pouch doypack with zipper",
  },
  {
    id: "bottle_label_wrap",
    label: "Palackcímke (Hengeres)",
    promptHint: "Cylindrical bottle/wrap label",
  },
  {
    id: "shrink_sleeve_360",
    label: "360° Zsugorfólia",
    promptHint: "360-degree shrink sleeve label",
  },
  {
    id: "cosmetic_jar_tube",
    label: "Tégely/Flakon + Doboz",
    promptHint: "Cosmetic jar round label + outer box",
  },
  {
    id: "fefco_0201_shipping",
    label: "FEFCO 0201 Ipari Doboz",
    promptHint: "FEFCO 0201 slotted container, shelf-ready",
  },
];

const SUBSTRATE_OPTIONS: PresetOption[] = [
  {
    id: "gc1_gc2_carton",
    label: "GC1/GC2 Karton 300-350g",
    promptHint: "GC1/GC2 coated cartonboard 300-350gsm",
  },
  {
    id: "e_flute_micro_corrugated",
    label: "E-Hullám + Kasírozás",
    promptHint: "E-flute micro corrugated + printed wrap",
  },
  {
    id: "kraft_natural",
    label: "Kraft Natur / Öko",
    promptHint: "Natural kraft / recycled eco board",
  },
  {
    id: "pp_pe_label_film",
    label: "BOPP/PE Címke Fólia",
    promptHint: "PP/PE water-resistant label film BOPP",
  },
  {
    id: "metallized_film",
    label: "Metallizált PET Fólia",
    promptHint: "Metallized silver/gold PET foil",
  },
  {
    id: "rigid_board_luxury",
    label: "Rigid Box Lemezkarton",
    promptHint: "1200gsm greyboard + luxury wrap",
  },
];

const FINISHING_OPTIONS: PresetOption[] = [
  {
    id: "softtouch_spotuv",
    label: "Soft-Touch + Spot UV + Emboss",
    promptHint: "Soft-touch lamination spot UV embossing",
  },
  {
    id: "hotfoil",
    label: "Melegfólia Prégelés",
    promptHint: "Gold/silver/hologram hot foil stamping",
  },
  {
    id: "matte_dispersion",
    label: "Matt Lakk (Élelmiszerbarát)",
    promptHint: "Matte dispersion varnish food-safe",
  },
  {
    id: "window_punch",
    label: "PET Ablakkivágás",
    promptHint: "Gloss UV + PET window die-cut",
  },
  {
    id: "raw_eco",
    label: "Nyers Öko Felület",
    promptHint: "Uncoated raw eco surface",
  },
];

/** 1-kattintásos iparági presetek. */
const PACKAGING_PRESETS: Array<{
  label: string;
  values: Partial<PackagingFormValues>;
}> = [
  {
    label: "Arcszérum Doboz + Cseppentő",
    values: {
      productName: "Lumina Retinol Éjszakai Szérum",
      brandName: "Velvet Skin Lab",
      industry: "Prémiumkozmetikum és dermokozmetika márka",
      packagingStructure: "folding_carton_tuck",
      dimensionsMm: "45 × 45 × 120 mm (doboz) + Ø 32 mm × 95 mm (üvegcseppentő)",
      substrateAndMaterial: "gc1_gc2_carton",
      surfaceFinishing:
        "Matt Soft-Touch Fólia + Arany Melegfólia Prégelés márkanéven",
      visualStyle: "Dark Luxury Minimal, Quiet Luxury Editorial",
      colorPreference: "Tűzpiros & Antracit paletta",
      keyClaims: "klinikaikusan tesztelt, vegán, paraben- és szilikonmentes",
      mandatoryInfo:
        "INCI lista, 30 ml nettó, PÁU jelzés, újrahasznosítási kód, EU felelős gyártó",
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
      surfaceFinishing:
        "Matt fekete BOPP + Spot UV a logón + aroma szelep",
      visualStyle: "Editorial Magazine, Specialty Coffee branding",
      colorPreference: "Monokróm + Sárga-arany pörkölési árnyalat",
      keyClaims: "single-origin, kisüzemi pörkölés, 250g frissen pörkölt",
      mandatoryInfo:
        "Összetevő, 250g nettó, pörkölési dátum, őrlési fok, EAN-13, Country of Origin: Ethiopia",
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
      surfaceFinishing:
        "Kasírozott matt műnyomó borítás + UV lakk a nyitófülön",
      visualStyle: "Cyber-Cyan Dark Tech, Apple Bento Grid",
      colorPreference: "Kék-Lila Cyber paletta",
      keyClaims: "ingyenes 2 év garancia, rejtett QR onboarding, prémium unboxing",
      mandatoryInfo:
        "EAN-13, nettó/bruttó tömeg, újrahasznosítási jel, CE jelzés (elektronika)",
    },
  },
];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/60 text-slate-200 text-sm placeholder:text-slate-600 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#00B5F1]/50 focus:border-[#00B5F1]/40 transition-all";
const labelClass =
  "block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5";

export default function PackagingWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<PackagingGenerationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [profileReady, setProfileReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allowedTools, setAllowedTools] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<PackagingFormValues>({
    resolver: zodResolver(packagingFormSchema),
    defaultValues: {
      packagingStructure: "fefco_0427_mailer",
      substrateAndMaterial: "e_flute_micro_corrugated",
    } as Partial<PackagingFormValues>,
  });

  const structureValue = useWatch({ control, name: "packagingStructure" });
  const substrateValue = useWatch({ control, name: "substrateAndMaterial" });
  const visualStyle = useWatch({ control, name: "visualStyle" });
  const colorPreference = useWatch({ control, name: "colorPreference" });
  const finishingValue = useWatch({ control, name: "surfaceFinishing" });

  useEffect(() => {
    if (!auth) {
      queueMicrotask(() => setProfileReady(true));
      return;
    }
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setProfileReady(true);
        return;
      }
      try {
        const token = await user.getIdToken(true);
        const res = await getClientUserProfileAction(token);
        if (res.success && res.profile) {
          setIsAdmin(
            res.profile.role === "admin" || user.email === "hello@webdude.hu"
          );
          setAllowedTools(res.profile.allowedTools || []);
        }
      } catch {
        // Profil hiba nem blokkolja a generátort.
      } finally {
        setProfileReady(true);
      }
    });
    return unsub;
  }, []);

  const loadPreset = useCallback(
    (preset: (typeof PACKAGING_PRESETS)[number]) => {
      Object.entries(preset.values).forEach(([key, value]) => {
        setValue(key as keyof PackagingFormValues, value as never);
      });
      setError(null);
    },
    [setValue]
  );

  const onSubmit = async (data: PackagingFormValues) => {
    if (!auth?.currentUser) {
      setError("Kérlek, jelentkezz be a generáláshoz!");
      return;
    }
    setIsGenerating(true);
    setError(null);

    try {
      const token = await auth.currentUser.getIdToken(true);
      const input: PackagingWorkshopInput = {
        productName: data.productName,
        brandName: data.brandName,
        industry: data.industry,
        packagingStructure: data.packagingStructure as PackagingStructure,
        dimensionsMm: data.dimensionsMm,
        substrateAndMaterial: data.substrateAndMaterial as PackagingSubstrate,
        surfaceFinishing: data.surfaceFinishing || undefined,
        visualStyle: data.visualStyle || undefined,
        colorPreference: data.colorPreference || undefined,
        keyClaims: data.keyClaims || undefined,
        mandatoryInfo: data.mandatoryInfo || undefined,
      };
      const res = await addPackagingGenerationAction(token, input);
      if (res.success && res.output) {
        setGeneratedOutput(res.output);
      } else {
        setError(res.error || "Hiba történt a generálás során.");
      }
    } catch {
      setError("Kapcsolódási hiba a generálás során.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!profileReady) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#00B5F1]" />
        <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          Csomagolás Stúdió betöltése...
        </p>
      </div>
    );
  }

  // Strict access gate: block users without the required tool permission.
  if (!isAdmin && !allowedTools.includes("packaging_ai_muhely")) {
    return <ToolAccessLock toolName="Csomagolás AI Műhely" />;
  }

  const specs = generatedOutput?.dielineAndPrepressSpecs;

  return (
    <div className="space-y-8">
      {/* Fejléc */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/portal/ai-muhely"
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#00B5F1] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Vissza a Műhelybe
        </Link>
        {isAdmin && (
          <span className="text-[10px] font-black uppercase tracking-widest text-[#a78bfa] border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-2 py-1 rounded-full">
            Szuperadmin
          </span>
        )}
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#00B5F1]">
          Nyomdakész Csomagolás & Stancrajz Stúdió
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Csomagolás, Doboz & Címke Tervezés
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl">
          FEFCO dobozok, hajtogatott kartonok, rigid box, doypack és
          palackcímkék — stancrajz-specifikációval, EU compliance és
          prepress checklistkel.
        </p>
      </div>

      {/* 1-Click Presetek */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PACKAGING_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => loadPreset(preset)}
            className="px-4 py-3 rounded-xl border border-[#00B5F1]/25 bg-[#00B5F1]/5 text-left text-xs font-bold text-[#00B5F1] hover:bg-[#00B5F1]/15 hover:border-[#00B5F1]/50 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Termék */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-5">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Package className="w-4 h-4 text-[#00B5F1]" />
            Termék & Iparág
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Termék neve *</label>
              <input
                {...register("productName")}
                placeholder="Pl. Yirgacheffe Single-Origin 250g"
                className={inputClass}
              />
              {errors.productName && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.productName.message}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>Márkanév *</label>
              <input
                {...register("brandName")}
                placeholder="Pl. Kávéház Roasters"
                className={inputClass}
              />
              {errors.brandName && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.brandName.message}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Iparág *</label>
              <input
                {...register("industry")}
                placeholder="Pl. Specialty kávépörkölő és artisan kávémárka"
                className={inputClass}
              />
              {errors.industry && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.industry.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Struktúra & Méret */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#00B5F1]" />
            Struktúra, Méret & Hordozó
          </h3>
          <PresetChips
            label="Csomagolási struktúra"
            options={STRUCTURE_OPTIONS}
            value={structureValue ?? "fefco_0427_mailer"}
            onChange={(id) =>
              id && setValue("packagingStructure", id as PackagingStructure)
            }
          />
          <div>
            <label className={labelClass}>
              Befoglaló méret mm-ben
            </label>
            <input
              {...register("dimensionsMm")}
              placeholder="Pl. 80 × 50 × 150 mm vagy Ø 75 mm × 120 mm"
              className={inputClass}
            />
            {errors.dimensionsMm && (
              <p className="text-red-400 text-xs mt-1">
                {errors.dimensionsMm.message}
              </p>
            )}
          </div>
          <PresetChips
            label="Alapanyag és hordozó"
            options={SUBSTRATE_OPTIONS}
            value={substrateValue ?? "e_flute_micro_corrugated"}
            onChange={(id) =>
              id && setValue("substrateAndMaterial", id as PackagingSubstrate)
            }
          />
          <PresetChips
            label="Felületnemesítés"
            options={FINISHING_OPTIONS}
            value={finishingValue ?? null}
            onChange={(id) => setValue("surfaceFinishing", id ?? undefined)}
          />
        </div>

        {/* Stílus, claim, compliance */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-5">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00B5F1]" />
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
              <input
                {...register("keyClaims")}
                placeholder="Pl. klinikailag tesztelt, vegán, paraben-mentes"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                Kötelező információk (INCI, tömeg, EAN-13, piktogramok)
              </label>
              <input
                {...register("mandatoryInfo")}
                placeholder="Pl. INCI lista, 30 ml nettó, PÁU jelzés, EAN-13"
                className={inputClass}
              />
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
          className="w-full py-4 rounded-xl bg-linear-to-r from-[#075985] to-[#5B21B6] text-white font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
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

      {/* ── OUTPUT: Vizuális Kimeneti Stúdió ─────────────────────────── */}
      {generatedOutput && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 pt-4"
        >
          {/* Koncepció */}
          <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-3">
            <h3 className="text-lg font-bold text-white">
              {generatedOutput.conceptOverview.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {(
                [
                  ["Polcmegjelenés", generatedOutput.conceptOverview.shelfImpactStrategy],
                  ["Unboxing élmény", generatedOutput.conceptOverview.unboxingExperience],
                  ["Pozicionálás", generatedOutput.conceptOverview.targetPositioning],
                ] as const
              ).map(([label, text]) => (
                <p
                  key={label}
                  className="text-slate-400 leading-relaxed bg-slate-950/50 rounded-xl p-3 border border-slate-800/60"
                >
                  <strong className="text-[#00B5F1]">{label}: </strong>
                  {text}
                </p>
              ))}
            </div>
          </div>

          {/* Stancrajz / Dieline specifikáció */}
          {specs && (
            <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#00B5F1]" />
                Stancrajz & Prepress Specifikáció
              </h3>
              <p className="text-xs font-mono text-[#00B5F1] font-bold">
                Struktúra: {specs.structureCode} • Síkméret:{" "}
                {specs.flatDimensionsEstimationMm}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(
                  [
                    ["Kifutó + Safe Zone", specs.bleedAndSafeZoneMm],
                    ["Kartonvastagság / Szálirány", specs.boardCaliperAndGrainDirection],
                    ["Vonalkód (EAN-13)", specs.barcodeSpecsEan13],
                    ["Tintakorlátozások", specs.inkAndVarnishRestrictions],
                  ] as const
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-slate-800 bg-slate-950/50 p-3"
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      {label}
                    </p>
                    <p className="text-xs font-mono font-bold text-white mt-1">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <p className="text-slate-300 leading-relaxed bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
                  <strong className="text-[#00B5F1]">Vágósík (Cut): </strong>
                  {specs.cutLineSpec}
                </p>
                <p className="text-slate-300 leading-relaxed bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
                  <strong className="text-[#00B5F1]">Hajtósáv (Crease): </strong>
                  {specs.creaseLineSpec}
                </p>
                <p className="text-slate-300 leading-relaxed bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
                  <strong className="text-[#00B5F1]">Ragasztófül szabály: </strong>
                  {specs.glueFlapRule}
                </p>
              </div>
            </div>
          )}

          {/* Panelenkénti bontás */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#00B5F1]" />
              Panelenkénti Tervezés
            </h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {generatedOutput.panelBreakdown.map((panel, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-mono text-slate-500">
                        {panel.dimensionsMm}
                      </p>
                      <h4 className="text-sm font-black text-white">
                        {panel.panelName}
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        {panel.hierarchyRole}
                      </p>
                    </div>
                    <CopyButton
                      text={`${panel.panelName} (${panel.dimensionsMm})\nHeadline: ${panel.headlineOrClaim}\n${panel.bodyCopyOrElements.map((b) => `• ${b}`).join("\n")}\nSzimbólumok: ${panel.mandatorySymbols.join(", ")}\nFóliázás: ${panel.finishingHighlight}`}
                      label="Panel másolása"
                    />
                  </div>
                  <p className="text-sm font-bold text-[#00B5F1]">
                    {panel.headlineOrClaim}
                  </p>
                  <ul className="space-y-1">
                    {panel.bodyCopyOrElements.map((point, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-400 flex items-start gap-2"
                      >
                        <span className="text-[#00B5F1] mt-0.5">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  {panel.mandatorySymbols.length > 0 && (
                    <p className="text-[10px] text-slate-500">
                      <strong className="text-slate-400">Kötelező: </strong>
                      {panel.mandatorySymbols.join(", ")}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-semibold">
                      {panel.finishingHighlight}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    {panel.graphicDesignTip}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Színek + Tipográfia/Compliance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#00B5F1]" />
                CMYK + Pantone + HEX (Hordozó-viselkedés)
              </h3>
              <div className="space-y-3">
                {generatedOutput.colorSystem.map((color, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => navigator.clipboard.writeText(color.hex)}
                    title="Kattintás: HEX másolása"
                    className="w-full flex items-center gap-3 rounded-xl border border-slate-800 p-3 hover:border-[#00B5F1]/40 transition-all cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
                  >
                    <span
                      className="w-10 h-10 rounded-lg border border-slate-700 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="min-w-0">
                      <span className="block text-xs font-bold text-white truncate">
                        {color.name} — {color.hex}
                      </span>
                      <span className="block text-[10px] font-mono text-slate-500">
                        {color.cmyk} • {color.pantone}
                      </span>
                      <span className="block text-[10px] text-slate-400">
                        {color.substrateBehavior}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Type className="w-5 h-5 text-[#00B5F1]" />
                Tipográfia & EU Compliance
              </h3>
              <div className="space-y-2 text-xs">
                <p className="text-slate-300">
                  <strong className="text-white">Márkabetű: </strong>
                  {generatedOutput.typographyAndCompliance.brandDisplayFont}
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Ígéret/USP betű: </strong>
                  {generatedOutput.typographyAndCompliance.claimsFont}
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Összetevők betű: </strong>
                  {generatedOutput.typographyAndCompliance.ingredientsFont}
                </p>
                <p className="text-slate-400 font-mono">
                  Min. jogi betűmagasság: {generatedOutput.typographyAndCompliance.minLegalFontSizeMm} mm (EU
                  1169/2011)
                </p>
                <ul className="space-y-1.5 pt-2">
                  {generatedOutput.typographyAndCompliance.euComplianceChecklist.map(
                    (item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-slate-400"
                      >
                        <span className="text-[#00B5F1] mt-0.5">•</span>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* AI Promptok */}
          <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#00B5F1]" />
              AI Generáló Promptok
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(
                [
                  ["Síkkiterített Stancrajz", generatedOutput.aiPrompts.flatDielineArtworkPrompt],
                  ["Stúdió Packshot 3D", generatedOutput.aiPrompts.studioPackshot3DPrompt],
                  ["Kiskereskedelmi Polc / Lifestyle", generatedOutput.aiPrompts.retailShelfLifestylePrompt],
                  ["Unboxing Jelenet", generatedOutput.aiPrompts.unboxingScenePrompt],
                ] as const
              ).map(([label, text]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-800 p-4 space-y-2"
                >
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#00B5F1]">
                    {label}
                  </p>
                  <CopyButton text={text} label="Prompt másolása" />
                </div>
              ))}
              <div className="md:col-span-2 rounded-2xl border border-slate-800 p-4 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Negatív Prompt
                </p>
                <CopyButton
                  text={generatedOutput.aiPrompts.negativePrompt}
                  label="Negatív prompt másolása"
                />
              </div>
            </div>
          </div>

          {/* Prepress Checklist */}
          <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Csomagolás Prepress Ellenőrzőlista (8 pont)
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {generatedOutput.prepressChecklist.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/50 rounded-xl p-3 border border-slate-800/60"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}
