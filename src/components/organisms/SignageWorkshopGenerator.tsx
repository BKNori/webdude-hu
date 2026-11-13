"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import {
  Loader2,
  ArrowLeft,
  Ruler,
  Palette,
  Type,
  Layers,
  CheckCircle2,
  Bot,
  MonitorPlay,
  AlertTriangle,
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
import { addSignageGenerationAction } from "@/actions/signage-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  SignageWorkshopInput,
  SignageGenerationOutput,
  SignageFormat,
  SignageSubstrate,
  ViewingDistance,
} from "@/types/signage-workshop";

const signageFormSchema = z.object({
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

type SignageFormValues = z.infer<typeof signageFormSchema>;

const FORMAT_OPTIONS: PresetOption[] = [
  {
    id: "rollup_standard_85x200",
    label: "Roll-up 85×200",
    promptHint: "Standard rollup banner 850x2000mm",
  },
  {
    id: "rollup_wide_100x200",
    label: "Széles Roll-up / L-Banner",
    promptHint: "Wide premium rollup L-banner 1000x2000mm",
  },
  {
    id: "storefront_window_graphics",
    label: "Kirakat OWV + Plotter",
    promptHint: "Storefront window graphics one-way vision",
  },
  {
    id: "vehicle_van_car_wrap",
    label: "Autó- / Furgondekor",
    promptHint: "Vehicle van car wrap cast vinyl",
  },
  {
    id: "outdoor_pvc_mesh_banner",
    label: "Kültéri Molinó / Mesh",
    promptHint: "Outdoor PVC mesh banner building wrap",
  },
  {
    id: "exhibition_popup_wall",
    label: "Sajtófal / Pop-up Fal",
    promptHint: "Exhibition popup backdrop wall 3000x2250mm",
  },
  {
    id: "pavement_a_board_dibond",
    label: "A-Board / Dibond Cégtábla",
    promptHint: "A-board pavement dibond fascia sign",
  },
  {
    id: "indoor_wall_floor_tattoo",
    label: "Falmatrica / Padlógrafika",
    promptHint: "Indoor wall mural floor graphic R10",
  },
];

const SUBSTRATE_OPTIONS: PresetOption[] = [
  {
    id: "rollup_film_240g",
    label: "240g Grayback Roll-up",
    promptHint: "240g grayback roll-up film",
  },
  {
    id: "one_way_vision_owv",
    label: "OWV Ablakfólia",
    promptHint: "One-way vision perforated window film",
  },
  {
    id: "cast_vinyl_wrap",
    label: "Cast Vinyl Autófólia",
    promptHint: "3M Oracal Avery cast vinyl wrap",
  },
  {
    id: "plotter_cut_foil",
    label: "Plotter Vágott / Etched Glass",
    promptHint: "Plotter cut vinyl etched glass decal",
  },
  {
    id: "pvc_frontlit_mesh",
    label: "PVC Frontlit / Mesh",
    promptHint: "510g PVC frontlit 350g mesh banner",
  },
  {
    id: "dibond_forex_board",
    label: "Dibond / Forex",
    promptHint: "3mm dibond aluminium composite forex",
  },
];

const DISTANCE_OPTIONS: PresetOption[] = [
  {
    id: "close_1_3m",
    label: "Közeli 1–3 m",
    promptHint: "Close viewing 1-3m indoor reception",
  },
  {
    id: "mid_3_10m",
    label: "Közepes 3–10 m",
    promptHint: "Mid viewing 3-10m storefront pedestrian",
  },
  {
    id: "far_10_30m",
    label: "Távoli / Mozgó 10–30+ m",
    promptHint: "Far moving viewing 10-30m road vehicle",
  },
];

/** 1-kattintásos iparági presetek. */
const SIGNAGE_PRESETS: Array<{
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
      colorPreference: "Monokróm Fekete-Fehér + Arany",
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
  "w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/60 text-slate-200 text-sm placeholder:text-slate-600 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#00B5F1]/50 focus:border-[#00B5F1]/40 transition-all";
const labelClass =
  "block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5";

export default function SignageWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<SignageGenerationOutput | null>(null);
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
  } = useForm<SignageFormValues>({
    resolver: zodResolver(signageFormSchema),
    defaultValues: {
      signageFormat: "rollup_standard_85x200",
      substrateAndFoil: "rollup_film_240g",
      viewingDistance: "close_1_3m",
    } as Partial<SignageFormValues>,
  });

  const formatValue = useWatch({ control, name: "signageFormat" });
  const substrateValue = useWatch({ control, name: "substrateAndFoil" });
  const distanceValue = useWatch({ control, name: "viewingDistance" });
  const visualStyle = useWatch({ control, name: "visualStyle" });
  const colorPreference = useWatch({ control, name: "colorPreference" });

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
    (preset: (typeof SIGNAGE_PRESETS)[number]) => {
      Object.entries(preset.values).forEach(([key, value]) => {
        setValue(key as keyof SignageFormValues, value as never);
      });
      setError(null);
    },
    [setValue]
  );

  const onSubmit = async (data: SignageFormValues) => {
    if (!auth?.currentUser) {
      setError("Kérlek, jelentkezz be a generáláshoz!");
      return;
    }
    setIsGenerating(true);
    setError(null);

    try {
      const token = await auth.currentUser.getIdToken(true);
      const input: SignageWorkshopInput = {
        campaignOrHeadline: data.campaignOrHeadline,
        brandName: data.brandName,
        industry: data.industry,
        signageFormat: data.signageFormat as SignageFormat,
        dimensionsAndScale: data.dimensionsAndScale,
        substrateAndFoil: data.substrateAndFoil as SignageSubstrate,
        viewingDistance: data.viewingDistance as ViewingDistance,
        visualStyle: data.visualStyle || undefined,
        colorPreference: data.colorPreference || undefined,
        contactAndCta: data.contactAndCta || undefined,
      };
      const res = await addSignageGenerationAction(token, input);
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
          Dekor Stúdió betöltése...
        </p>
      </div>
    );
  }

  // Strict access gate: block users without the required tool permission.
  if (!isAdmin && !allowedTools.includes("signage_ai_muhely")) {
    return <ToolAccessLock toolName="Dekor/Jelzés AI Műhely" />;
  }

  const specs = generatedOutput?.lfpTechnicalSpecs;

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
          LFP & Dekoratőr Stúdió
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Roll-up, Kirakat, Molinó & Autódekor
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl">
          Nagyformátumú dekorációk távolsági olvashatósággal: méretarányos DPI,
          dead-zone térképek, RAL/Oracal kódok és 8 pontos LFP checklist.
        </p>
      </div>

      {/* 1-Click Presetek */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SIGNAGE_PRESETS.map((preset) => (
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
        {/* Üzenet */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-5">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <MonitorPlay className="w-4 h-4 text-[#00B5F1]" />
            Üzenet & Márka
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>
                Fő üzenet / Kampány / Szolgáltatás neve *
              </label>
              <input
                {...register("campaignOrHeadline")}
                placeholder="Pl. Weboldal Készítés 7 Nap Alatt — Ingyenes Audit"
                className={inputClass}
              />
              {errors.campaignOrHeadline && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.campaignOrHeadline.message}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>Márka / Cégnév *</label>
              <input
                {...register("brandName")}
                placeholder="Pl. WebDude"
                className={inputClass}
              />
              {errors.brandName && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.brandName.message}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>Iparág *</label>
              <input
                {...register("industry")}
                placeholder="Pl. Webfejlesztés és digitális marketing ügynökség"
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

        {/* Formátum, méret, hordozó, távolság */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#00B5F1]" />
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
            <input
              {...register("dimensionsAndScale")}
              placeholder="Pl. 85 × 200 cm vagy Kirakat: 320 × 240 cm"
              className={inputClass}
            />
            {errors.dimensionsAndScale && (
              <p className="text-red-400 text-xs mt-1">
                {errors.dimensionsAndScale.message}
              </p>
            )}
          </div>
          <PresetChips
            label="Hordozó és fólia technológia"
            options={SUBSTRATE_OPTIONS}
            value={substrateValue ?? "rollup_film_240g"}
            onChange={(id) =>
              id && setValue("substrateAndFoil", id as SignageSubstrate)
            }
          />
          <PresetChips
            label="Olvasási távolság"
            options={DISTANCE_OPTIONS}
            value={distanceValue ?? "close_1_3m"}
            onChange={(id) =>
              id && setValue("viewingDistance", id as ViewingDistance)
            }
          />
        </div>

        {/* Stílus & CTA */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-5">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#00B5F1]" />
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
            <label className={labelClass}>
              Kapcsolat / CTA (max. 3 másodperces befogadási szabály)
            </label>
            <input
              {...register("contactAndCta")}
              placeholder="Pl. webdude.hu • +36 30 123 4567"
              className={inputClass}
            />
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

      {/* ── OUTPUT ─────────────────────────────────────────────────────── */}
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
                  ["3 másodperces szabály", generatedOutput.conceptOverview.threeSecondRuleStrategy],
                  ["Távolsági logika", generatedOutput.conceptOverview.distanceVisibilityLogic],
                  ["Környezeti kontraszt", generatedOutput.conceptOverview.environmentContrastTip],
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

          {/* LFP Technikai specifikáció */}
          {specs && (
            <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#00B5F1]" />
                LFP Mérnöki Specifikáció & Holttér Térkép
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(
                  [
                    ["Méretarány", specs.workingScaleRatio],
                    ["Fájl DPI skálán", specs.recommendedFileDpiAtScale],
                    ["1:1 DPI", specs.effectivePrintDpi1to1],
                    ["Min. betűmagasság", specs.minLetterHeightMmForDistance],
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <p className="text-slate-300 leading-relaxed bg-slate-950/50 rounded-xl p-3 border border-[#00B5F1]/30">
                  <strong className="text-[#00B5F1]">Holttér / Hardver: </strong>
                  {specs.hardwareDeadZones}
                </p>
                <p className="text-slate-300 leading-relaxed bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
                  <strong className="text-[#00B5F1]">Vágósík + Fehér tinta: </strong>
                  {specs.cutContourAndWhiteInkRule}
                </p>
                <p className="text-slate-300 leading-relaxed bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
                  <strong className="text-[#00B5F1]">Kifutó + Hegesztés: </strong>
                  {specs.bleedAndHemmingMm}
                </p>
                <p className="text-slate-300 leading-relaxed bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
                  <strong className="text-[#00B5F1]">Színprofil + UV: </strong>
                  {specs.colorProfileAndUvResistance}
                </p>
              </div>
            </div>
          )}

          {/* Magassági zónaterv */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#00B5F1]" />
              Magassági Zónaterv
            </h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {generatedOutput.zoneBreakdown.map((zone, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-mono text-slate-500">
                        {zone.heightRangeOrPosition}
                      </p>
                      <h4 className="text-sm font-black text-white">
                        {zone.zoneName}
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Láthatóság: {zone.visibilityPriority}
                      </p>
                    </div>
                    <CopyButton
                      text={`${zone.zoneName} (${zone.heightRangeOrPosition})\nHeadline: ${zone.headlineOrElement}\n${zone.subcopyOrDetails.map((d) => `• ${d}`).join("\n")}\nTechnikai: ${zone.technicalWarning}\nDizájn: ${zone.designTip}`}
                      label="Zóna másolása"
                    />
                  </div>
                  <p className="text-sm font-bold text-[#00B5F1]">
                    {zone.headlineOrElement}
                  </p>
                  <ul className="space-y-1">
                    {zone.subcopyOrDetails.map((d, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-400 flex items-start gap-2"
                      >
                        <span className="text-[#00B5F1] mt-0.5">•</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                    <p className="text-orange-400/90 bg-orange-500/10 rounded-lg p-2 border border-orange-500/20 flex items-start gap-1.5">
                      <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                      {zone.technicalWarning}
                    </p>
                    <p className="text-emerald-400/90 bg-emerald-500/10 rounded-lg p-2 border border-emerald-500/20">
                      {zone.designTip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Színek + Tipográfia távolság */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#00B5F1]" />
                CMYK + RAL/Pantone + HEX (Külső Kontraszt)
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
                        {color.cmyk} • {color.pantoneOrRal}
                      </span>
                      <span className="block text-[10px] text-slate-400">
                        {color.outdoorContrastNote}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Type className="w-5 h-5 text-[#00B5F1]" />
                Távolsági Tipográfia (1:1 mm)
              </h3>
              <div className="space-y-2 text-xs">
                <p className="text-slate-300">
                  <strong className="text-white">Főcím betű: </strong>
                  {generatedOutput.typographyAndDistanceScale.headlineFont}
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Másodlagos: </strong>
                  {generatedOutput.typographyAndDistanceScale.secondaryFont}
                </p>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2 text-center">
                    <p className="text-[9px] text-slate-500 uppercase">Főcím</p>
                    <p className="text-xs font-mono font-bold text-[#00B5F1]">
                      {generatedOutput.typographyAndDistanceScale.headlineSizeMm1to1}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2 text-center">
                    <p className="text-[9px] text-slate-500 uppercase">Alcím</p>
                    <p className="text-xs font-mono font-bold text-[#00B5F1]">
                      {generatedOutput.typographyAndDistanceScale.subheadSizeMm1to1}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-2 text-center">
                    <p className="text-[9px] text-slate-500 uppercase">Kapcsolat</p>
                    <p className="text-xs font-mono font-bold text-[#00B5F1]">
                      {generatedOutput.typographyAndDistanceScale.contactSizeMm1to1}
                    </p>
                  </div>
                </div>
                <p className="text-slate-400 font-mono text-[11px]">
                  {generatedOutput.typographyAndDistanceScale.maxWordsCountRule}
                </p>
                <p className="text-slate-500 italic">
                  {generatedOutput.typographyAndDistanceScale.kerningAndStrokeAdvice}
                </p>
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
                  ["Hero Háttérgrafika", generatedOutput.aiPrompts.heroBackgroundGraphicPrompt],
                  ["In-Situ Mockup", generatedOutput.aiPrompts.realisticMockupInSituPrompt],
                  ["Vektor Vágott Grafika", generatedOutput.aiPrompts.vectorCutGraphicPrompt],
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

          {/* LFP Prepress Checklist */}
          <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              LFP & Dekoratőr Prepress Checklist (8 pont)
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {generatedOutput.lfpPrepressChecklist.map((item, i) => (
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
