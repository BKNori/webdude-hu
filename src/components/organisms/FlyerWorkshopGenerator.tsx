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
  Printer,
  Ruler,
  Palette,
  Type,
  FileText,
  CheckCircle2,
  Bot,
  Layers,
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
import { addFlyerGenerationAction } from "@/actions/flyer-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  FlyerWorkshopInput,
  FlyerWorkshopOutput,
  FlyerFormat,
  PaperAndFinish,
  DistributionChannel,
} from "@/types/flyer-workshop";

const flyerFormSchema = z.object({
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

type FlyerFormValues = z.infer<typeof flyerFormSchema>;

const FORMAT_OPTIONS: PresetOption[] = [
  {
    id: "A5_ketoldalas",
    label: "A5 Kétoldalas",
    promptHint: "A5 148×210mm classic two-sided flyer",
  },
  {
    id: "A6_kupon",
    label: "A6 Kupon",
    promptHint: "A6 105×148mm compact coupon flyer",
  },
  {
    id: "DL_exkluziv",
    label: "DL Exkluzív",
    promptHint: "DL 99×210mm slim exclusive/menu flyer",
  },
  {
    id: "A4_ismertető",
    label: "A4 Ismertető",
    promptHint: "A4 210×297mm large two-sided brochure",
  },
  {
    id: "A4_LA4_gongyolt",
    label: "A4→LA4 Göngyölt (6 old.)",
    promptHint: "Tri-fold gatefold 97-100-100mm, 6 panels",
  },
  {
    id: "A4_LA4_harmonikahajtas",
    label: "A4→LA4 Z-Fold (6 old.)",
    promptHint: "Z-fold harmonic leporello 99-99-99mm, 6 panels",
  },
  {
    id: "A4_A5_bifold",
    label: "A4→A5 Bi-fold (4 old.)",
    promptHint: "Bi-fold A4 to A5, 4-panel leaflet",
  },
  {
    id: "negyzetes_premium",
    label: "Négyzetes Prémium",
    promptHint: "148×148mm square premium boutique flyer",
  },
];

const PAPER_OPTIONS: PresetOption[] = [
  {
    id: "135g_fenyes_munyomo",
    label: "135g Fényes Műnyomó",
    promptHint: "135gsm coated glossy paper",
    colors: ["#ffffff"],
  },
  {
    id: "170g_matt_munyomo",
    label: "170g Matt Műnyomó",
    promptHint: "170gsm matte coated paper",
    colors: ["#e2e8f0"],
  },
  {
    id: "250g_softtouch_spotuv",
    label: "250g Soft-Touch + Spot UV",
    promptHint: "250gsm soft-touch lamination spot UV",
    colors: ["#1e293b"],
  },
  {
    id: "120g_kraft_natur",
    label: "120g Kraft Natur",
    promptHint: "120gsm recycled kraft natural paper",
    colors: ["#64748b"],
  },
  {
    id: "300g_kreativ_karton_pregelesc",
    label: "300g Karton + Prégelés",
    promptHint: "300gsm creative card cyan/violet metallic foil",
    colors: ["#7C3AED"],
  },
];

const CHANNEL_OPTIONS: PresetOption[] = [
  {
    id: "kezbe_adott",
    label: "Kézbe adott / Rendezvény",
    promptHint: "hand-to-hand event distribution",
  },
  {
    id: "postalada",
    label: "Postaládás (Direct Mail)",
    promptHint: "letterbox direct mail distribution",
  },
  {
    id: "unboxing_kupon",
    label: "Unboxing Kupon",
    promptHint: "pack-in coupon unboxing experience",
  },
  {
    id: "display_pultos",
    label: "Pultos / Display",
    promptHint: "counter display standee placement",
  },
];

/** 1-kattintásos profi presetek. */
const FLYER_PRESETS: Array<{
  label: string;
  values: Partial<FlyerFormValues>;
}> = [
  {
    label: "Prémium Unboxing Kupon (DL 99×210)",
    values: {
      campaignTitle: "VIP Tavaszi Kollekció — Korlátozott Kupon",
      brandName: "Atelier Noir",
      industry: "Prémium kézműves illatszert és kozmetikum márka",
      flyerFormat: "DL_exkluziv",
      paperAndFinish: "250g_softtouch_spotuv",
      distributionChannel: "unboxing_kupon",
      visualStyle: "Dark Luxury Minimal, Quiet Luxury Editorial",
      colorPreference: "Tűzpiros & Antracit paletta",
      offerOrHook: "-25% kuponkód az első rendeléssel, ingyenesSamples",
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
      offerOrHook: "2 főre szóló kóstoló menü -30%-os áron",
      callToAction: "Telefonos foglalás + QR menülink",
    },
  },
];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/60 text-slate-200 text-sm placeholder:text-slate-600 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#00B5F1]/50 focus:border-[#00B5F1]/40 transition-all";
const labelClass =
  "block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5";

export default function FlyerWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<FlyerWorkshopOutput | null>(null);
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
  } = useForm<FlyerFormValues>({
    resolver: zodResolver(flyerFormSchema),
    defaultValues: {
      flyerFormat: "A5_ketoldalas",
      paperAndFinish: "170g_matt_munyomo",
      distributionChannel: "kezbe_adott",
    } as Partial<FlyerFormValues>,
  });

  const visualStyle = useWatch({ control, name: "visualStyle" });
  const colorPreference = useWatch({ control, name: "colorPreference" });
  const flyerFormatValue = useWatch({ control, name: "flyerFormat" });
  const paperValue = useWatch({ control, name: "paperAndFinish" });
  const channelValue = useWatch({ control, name: "distributionChannel" });

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
    (preset: (typeof FLYER_PRESETS)[number]) => {
      Object.entries(preset.values).forEach(([key, value]) => {
        setValue(key as keyof FlyerFormValues, value as never);
      });
      setError(null);
    },
    [setValue]
  );

  const onSubmit = async (data: FlyerFormValues) => {
    if (!auth?.currentUser) {
      setError("Kérlek, jelentkezz be a generáláshoz!");
      return;
    }
    setIsGenerating(true);
    setError(null);

    try {
      const token = await auth.currentUser.getIdToken(true);
      const input: FlyerWorkshopInput = {
        campaignTitle: data.campaignTitle,
        brandName: data.brandName,
        industry: data.industry,
        flyerFormat: data.flyerFormat as FlyerFormat,
        paperAndFinish: data.paperAndFinish as PaperAndFinish,
        distributionChannel: data.distributionChannel as DistributionChannel,
        visualStyle: data.visualStyle || undefined,
        colorPreference: data.colorPreference || undefined,
        offerOrHook: data.offerOrHook || undefined,
        callToAction: data.callToAction || undefined,
      };
      const res = await addFlyerGenerationAction(token, input);
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
          Szórólap Stúdió betöltése...
        </p>
      </div>
    );
  }

  // Strict access gate: block users without the required tool permission.
  if (!isAdmin && !allowedTools.includes("flyer_ai_muhely")) {
    return <ToolAccessLock toolName="Szórólap AI Műhely" />;
  }

  const specs = generatedOutput?.prepressSpecs;

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
          Nyomdakész Szórólap & Prospektus Stúdió
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Milliméter-Pontos Prepress Tervezés
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl">
          Vágási, kifutós és biztonsági zónák, hajtási mechanika, Rich Black és
          CMYK specifikációk — azonnal nyomdaküldhető minőségben.
        </p>
      </div>

      {/* 1-Click Presetek */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {FLYER_PRESETS.map((preset) => (
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
        {/* Alapadatok */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-5">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00B5F1]" />
            Kampány Alapadatok
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Kampány / Termék / Esemény *</label>
              <input
                {...register("campaignTitle")}
                placeholder="Pl. Őszi Gasztrofesztivál — Kóstoló Menü"
                className={inputClass}
              />
              {errors.campaignTitle && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.campaignTitle.message}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>Márka / Cégnév *</label>
              <input
                {...register("brandName")}
                placeholder="Pl. Borkő Bisztró"
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
                placeholder="Pl. Gasztro rendezvények és szezonális éttermek"
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

        {/* Formátum & Papír */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#00B5F1]" />
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
            onChange={(id) =>
              id && setValue("paperAndFinish", id as PaperAndFinish)
            }
          />
          <PresetChips
            label="Terjesztési csatorna"
            options={CHANNEL_OPTIONS}
            value={channelValue ?? "kezbe_adott"}
            onChange={(id) =>
              id && setValue("distributionChannel", id as DistributionChannel)
            }
          />
        </div>

        {/* Stílus, szín, CTA */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-5">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#00B5F1]" />
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
              <input
                {...register("offerOrHook")}
                placeholder="Pl. -20% kuponkód, ingyenes felmérés"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Konverziós cél / CTA</label>
              <input
                {...register("callToAction")}
                placeholder="Pl. QR kód, telefonszám, kuponbeváltás"
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
            <p className="text-sm text-slate-300">
              {generatedOutput.conceptOverview.creativeDirection}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <p className="text-slate-400 leading-relaxed bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
                <strong className="text-[#00B5F1]">Tekintetvezetés: </strong>
                {generatedOutput.conceptOverview.eyeTrackingStrategy}
              </p>
              <p className="text-slate-400 leading-relaxed bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
                <strong className="text-[#00B5F1]">Konverziós pszichológia: </strong>
                {generatedOutput.conceptOverview.conversionPsychology}
              </p>
            </div>
          </div>

          {/* Prepress Műszaki Rajz */}
          {specs && (
            <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#00B5F1]" />
                Prepress & Hajtási Műszaki Rajz
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(
                  [
                    ["Vágott méret", specs.trimSizeMm],
                    ["Kifutós méret", specs.bleedSizeMm],
                    ["Nyerset (gross)", specs.grossSizeMm],
                    ["Biztonsági zóna", specs.safeZoneMm],
                    ["Max. TAC", specs.maxInkCoverageTac],
                    ["Rich Black", specs.richBlackFormula],
                    ["QR min. méret", specs.qrCodeMinSizeMm],
                    ["Színprofil", specs.colorProfile],
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
              <div className="space-y-2 text-xs">
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-[#00B5F1]">Hajtási mechanika: </strong>
                  {specs.foldingMechanics}
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-[#00B5F1]">Papír: </strong>
                  {specs.paperRecommendation}
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <strong className="text-[#00B5F1]">Fekete szöveg szabály: </strong>
                  {specs.bodyTextBlackRule}
                </p>
              </div>
            </div>
          )}

          {/* Panelenkénti Zónaterv & Copy */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#00B5F1]" />
              Panelenkénti Zónaterv & Kész Szövegek
            </h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {generatedOutput.panelBreakdown.map((panel, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#00B5F1]">
                        {panel.sizeMm}
                      </p>
                      <h4 className="text-sm font-black text-white">
                        {panel.panelName}
                      </h4>
                    </div>
                    <CopyButton
                      text={`${panel.panelName}\nFőcím: ${panel.headline}\nAlcím: ${panel.subheadline}\n${panel.bodyPoints.map((b) => `• ${b}`).join("\n")}\nCTA: ${panel.ctaOrElement}`}
                      label="Panel másolása"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {panel.visualZonePlan}
                  </p>
                  <div className="space-y-1.5">
                    <p className="text-sm font-bold text-white">
                      {panel.headline}
                    </p>
                    <p className="text-xs text-[#00B5F1] font-semibold">
                      {panel.subheadline}
                    </p>
                    <ul className="space-y-1">
                      {panel.bodyPoints.map((point, i) => (
                        <li
                          key={i}
                          className="text-xs text-slate-400 flex items-start gap-2"
                        >
                          <span className="text-[#00B5F1] mt-0.5">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs font-bold text-emerald-400 pt-1">
                      {panel.ctaOrElement}
                    </p>
                    <p className="text-[11px] text-slate-500 italic">
                      {panel.layoutTip}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Színrendszer + Tipográfia */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#00B5F1]" />
                CMYK + Pantone + HEX Színek
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
                        {color.printUsage}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Type className="w-5 h-5 text-[#00B5F1]" />
                Nyomdai Tipográfiai Skála
              </h3>
              <div className="space-y-2 text-xs">
                <p className="text-slate-300">
                  <strong className="text-white">Főcím: </strong>
                  {generatedOutput.typographyHierarchy.headlineFont}
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Szövegtörzs: </strong>
                  {generatedOutput.typographyHierarchy.bodyFont}
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Kiemelés: </strong>
                  {generatedOutput.typographyHierarchy.accentFont}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {(
                    [
                      ["Főcím", generatedOutput.typographyHierarchy.printSizingPt.mainHeadlinePt],
                      ["Alcím", generatedOutput.typographyHierarchy.printSizingPt.subheadPt],
                      ["Szövegtörzs", generatedOutput.typographyHierarchy.printSizingPt.bodyTextPt],
                      ["Apró betű min.", generatedOutput.typographyHierarchy.printSizingPt.finePrintMinPt],
                    ] as const
                  ).map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-lg border border-slate-800 bg-slate-950/50 p-2"
                    >
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                        {label}
                      </p>
                      <p className="text-xs font-mono font-bold text-[#00B5F1]">
                        {value} pt
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 leading-relaxed pt-1">
                  {generatedOutput.typographyHierarchy.kerningAndLeadingTips}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-800 p-4 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#00B5F1]">
                  Hero Key Visual (MJ v6.1 / Flux)
                </p>
                <CopyButton
                  text={generatedOutput.aiPrompts.heroKeyVisualPrompt}
                  label="Prompt másolása"
                />
              </div>
              <div className="rounded-2xl border border-slate-800 p-4 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#00B5F1]">
                  Layout Inspiráció (Ideogram 2.0)
                </p>
                <CopyButton
                  text={generatedOutput.aiPrompts.ideogramLayoutPrompt}
                  label="Prompt másolása"
                />
              </div>
              <div className="rounded-2xl border border-slate-800 p-4 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#00B5F1]">
                  3D Print Mockup
                </p>
                <CopyButton
                  text={`${generatedOutput.aiPrompts.printMockup3DPrompt}\n\nNEGATÍV: ${generatedOutput.aiPrompts.negativePrompt}`}
                  label="Prompt + negatív másolása"
                />
              </div>
            </div>
          </div>

          {/* Prepress Checklist */}
          <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Prepress Ellenőrzőlista (8 pont)
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
