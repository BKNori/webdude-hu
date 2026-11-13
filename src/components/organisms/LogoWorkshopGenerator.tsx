"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import {
  AlertTriangle,
  Sparkles,
  Loader2,
  ArrowLeft,
  Palette,
  Type,
  Layers,
  PenTool,
  Grid3X3,
  ShieldCheck,
  SwatchBook,
  Ruler,
} from "lucide-react";
import Link from "next/link";
import PresetChips from "@/components/molecules/PresetChips";
import CopyButton from "@/components/atoms/CopyButton";
import {
  DESIGN_STYLE_PRESETS,
  COLOR_PALETTE_PRESETS,
} from "@/lib/workshop-presets";
import type { PresetOption } from "@/lib/workshop-presets";
import { auth } from "@/lib/firebase";
import { addLogoGenerationAction } from "@/actions/logo-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  LogoWorkshopInput,
  LogoGenerationOutput,
  LogoArchetype,
  ConstructionGrid,
} from "@/types/logo-workshop";

const logoFormSchema = z.object({
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

type LogoFormValues = z.infer<typeof logoFormSchema>;

const ARCHETYPE_OPTIONS: PresetOption[] = [
  {
    id: "pictorial",
    label: "Pictorial / Szimbólum",
    promptHint: "Pictorial symbol logo, Apple/Twitter style",
  },
  {
    id: "abstract_geometric",
    label: "Absztrakt Geometriai Jel",
    promptHint: "Abstract geometric mark, Pentagram style",
  },
  {
    id: "negative_space",
    label: "Negative Space",
    promptHint: "Negative space hidden form, FedEx style",
  },
  {
    id: "wordmark",
    label: "Wordmark / Tipográfiai",
    promptHint: "Custom typographic wordmark, ligature focus",
  },
  {
    id: "monogram",
    label: "Monogram / Lettermark",
    promptHint: "Monogram lettermark, 1-3 interwoven letters",
  },
  {
    id: "monoline",
    label: "Monoline / Vonalgrafika",
    promptHint: "Minimalist monoline line-art logo",
  },
  {
    id: "emblem",
    label: "Modern Emblem / Pecsét",
    promptHint: "Modern emblem badge, contemporary seal",
  },
];

const GRID_OPTIONS: PresetOption[] = [
  {
    id: "golden_ratio",
    label: "Aranymetszés φ=1.618",
    promptHint: "Golden ratio Fibonacci construction grid",
  },
  {
    id: "swiss_modular",
    label: "Svájci Moduláris Rács",
    promptHint: "Swiss modular grid, Massimo Vignelli style",
  },
  {
    id: "isometric_hex",
    label: "Izometrikus 30° Hexa",
    promptHint: "Isometric 30-degree hexa grid construction",
  },
  {
    id: "bauhaus",
    label: "Bauhaus Alapformák",
    promptHint: "Bauhaus geometric primitive shapes",
  },
  {
    id: "organic",
    label: "Organikus Egyensúly",
    promptHint: "Organic freehand optical balance",
  },
];

/** 1-kattintásos iparági presetek a teszteléshez. */
const INDUSTRY_PRESETS: Array<{
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
      targetAudience: "PrémiumLuxury célcsoport, kávérajongók",
      logoArchetype: "monogram",
      constructionGrid: "organic",
      visualStyle: "Quiet Luxury Editorial, kézműves tipográfia",
      colorPreference: "Smaragd & Arany paletta",
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
  "w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/60 text-slate-200 text-sm placeholder:text-slate-600 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#00B5F1]/50 focus:border-[#00B5F1]/40 transition-all";
const labelClass =
  "block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5";

export default function LogoWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<LogoGenerationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [profileReady, setProfileReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<LogoFormValues>({
    resolver: zodResolver(logoFormSchema),
    defaultValues: {
      logoArchetype: "abstract_geometric",
      constructionGrid: "golden_ratio",
      additionalRequirements: undefined,
    } as Partial<LogoFormValues>,
  });

  const visualStyle = useWatch({ control, name: "visualStyle" });
  const colorPreference = useWatch({ control, name: "colorPreference" });
  const logoArchetypeValue = useWatch({ control, name: "logoArchetype" });
  const constructionGridValue = useWatch({
    control,
    name: "constructionGrid",
  });

  // Auth gate: a generátor csak bejelentkezett felhasználóknak elérhető.
  useEffect(() => {
    if (!auth) {
      // Auth nem elérhető (build/config nélküli kontextus) — engedjük a UI-t.
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
    (preset: (typeof INDUSTRY_PRESETS)[number]) => {
      Object.entries(preset.values).forEach(([key, value]) => {
        setValue(key as keyof LogoFormValues, value as never);
      });
      setError(null);
    },
    [setValue]
  );

  const onSubmit = async (data: LogoFormValues) => {
    if (!auth?.currentUser) {
      setError("Kérlek, jelentkezz be a generáláshoz!");
      return;
    }
    setIsGenerating(true);
    setError(null);

    try {
      const token = await auth.currentUser.getIdToken(true);
      const input: LogoWorkshopInput = {
        brandName: data.brandName,
        tagline: data.tagline || undefined,
        industry: data.industry,
        targetAudience: data.targetAudience,
        logoArchetype: data.logoArchetype as LogoArchetype,
        constructionGrid: data.constructionGrid as ConstructionGrid,
        visualStyle: data.visualStyle || undefined,
        colorPreference: data.colorPreference || undefined,
        symbolsToInclude: data.symbolsToInclude || undefined,
        symbolsToAvoid: data.symbolsToAvoid || undefined,
      };
      const res = await addLogoGenerationAction(token, input);
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
          Logó Stúdió betöltése...
        </p>
      </div>
    );
  }

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
          Enterprise Logó & Arculattervező Stúdió
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Profisz tráfiai Logó Tervezés
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl">
          3 merőben eltérő, produkciós szintű koncepció valós vektorszerkesztési
          útmutatóval, nyomdai színrendszerrel és motor-specifikus AI promptokkal.
        </p>
      </div>

      {/* 1-Click Ipari Presetek */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {INDUSTRY_PRESETS.map((preset) => (
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
            <PenTool className="w-4 h-4 text-[#00B5F1]" />
            Márka Alapadatok
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Márkanév / Cégnév *</label>
              <input
                {...register("brandName")}
                placeholder="Pl. NexaFlow"
                className={inputClass}
              />
              {errors.brandName && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.brandName.message}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>Tagline / Alcím</label>
              <input
                {...register("tagline")}
                placeholder="Pl. Intelligens munkafolyamat-automatizáció"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Iparág & Tevékenység *</label>
              <input
                {...register("industry")}
                placeholder="Pl. AI SaaS platform B2B ügyfeleknek"
                className={inputClass}
              />
              {errors.industry && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.industry.message}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>Célcsoport & Pozicionálás *</label>
              <input
                {...register("targetAudience")}
                placeholder="Pl. B2B Enterprise döntéshozók"
                className={inputClass}
              />
              {errors.targetAudience && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.targetAudience.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Architektúra & Rács */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#00B5F1]" />
            Logó-architektúra & Konstrukció
          </h3>
          <PresetChips
            label="Logó-architektúra"
            options={ARCHETYPE_OPTIONS}
            value={logoArchetypeValue ?? "abstract_geometric"}
            onChange={(id) =>
              id && setValue("logoArchetype", id as LogoArchetype)
            }
          />
          <PresetChips
            label="Konstrukciós rács"
            options={GRID_OPTIONS}
            value={constructionGridValue ?? "golden_ratio"}
            onChange={(id) =>
              id && setValue("constructionGrid", id as ConstructionGrid)
            }
          />
        </div>

        {/* Stílus & Szín */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#00B5F1]" />
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
              <input
                {...register("symbolsToInclude")}
                placeholder="Pl. áramlás, geometria, botanika"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Tiltott klisék</label>
              <input
                {...register("symbolsToAvoid")}
                placeholder="Pl. ne legyen földgömb vagy fogaskerék"
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
              Arculattervező stúdió dolgozik...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              3 Logókoncepció Generálása
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
          {/* 3 Koncepció Kártya */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <SwatchBook className="w-5 h-5 text-[#00B5F1]" />
              Logókoncepciók (3 irány)
            </h3>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              {generatedOutput.concepts.map((concept, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-5 space-y-4"
                >
                  <h4 className="text-sm font-black text-white">
                    {concept.name}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {concept.metaphor}
                  </p>

                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#00B5F1]">
                      Illustrator / CorelDRAW Rajz
                    </p>
                    <p className="text-[11px] text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
                      {concept.illustratorBlueprint}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <CopyButton
                      text={concept.recraftSvgPrompt}
                      label="Recraft v3 SVG prompt"
                    />
                    <CopyButton
                      text={concept.ideogramPrompt}
                      label="Ideogram 2.0 prompt"
                    />
                    <CopyButton
                      text={concept.midjourneyPrompt}
                      label="Midjourney v6.1 prompt"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Színrendszer Swatch-ok */}
          <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#00B5F1]" />
              Nyomdai & Digitális Színrendszer
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(
                [
                  ["primary", "Elsődleges"],
                  ["secondary", "Másodlagos"],
                  ["accent", "Akcentus"],
                  ["base", "Alap (Sötét/Világos)"],
                ] as const
              ).map(([key, label]) => {
                const color = generatedOutput.colorSystem[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => navigator.clipboard.writeText(color.hex)}
                    title="Kattintás: HEX másolása"
                    className="text-left rounded-2xl border border-slate-800 overflow-hidden hover:border-[#00B5F1]/40 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
                  >
                    <div
                      className="h-20 w-full"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="p-3 bg-slate-950/60 space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {label}
                      </p>
                      <p className="text-xs font-mono font-bold text-white">
                        {color.hex}
                      </p>
                      <p className="text-[10px] font-mono text-slate-500">
                        {color.cmyk}
                      </p>
                      <p className="text-[10px] font-mono text-slate-500">
                        {color.pantone}
                      </p>
                      <p className="text-[10px] text-slate-400 leading-snug pt-1">
                        {color.psychology}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tipográfia */}
          <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Type className="w-5 h-5 text-[#00B5F1]" />
              Tipográfiai Párosítás
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-800 p-4 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#00B5F1]">
                  Elsődleges (logó)
                </p>
                <p className="text-sm font-bold text-white">
                  {generatedOutput.typographySystem.primaryFont.name}
                </p>
                <p className="text-xs text-slate-400 font-mono">
                  {generatedOutput.typographySystem.primaryFont.weight} •{" "}
                  {generatedOutput.typographySystem.primaryFont.tracking}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {generatedOutput.typographySystem.primaryFont.ligatureTips}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 p-4 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Másodlagos (szlogen / arculat)
                </p>
                <p className="text-sm font-bold text-white">
                  {generatedOutput.typographySystem.secondaryFont.name}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {generatedOutput.typographySystem.secondaryFont.usage}
                </p>
              </div>
            </div>
          </div>

          {/* Variánsok + Guidelines */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Grid3X3 className="w-5 h-5 text-[#00B5F1]" />
                Arculati Variánsok
              </h3>
              {(
                [
                  ["primaryHorizontal", "Fő vízszintes"],
                  ["stackedVertical", "Stackelt függőleges"],
                  ["appIconFavicon", "App ikon / Favicon"],
                  ["monochromeStamp", "Monokróm bélyegző"],
                ] as const
              ).map(([key, label]) => (
                <div
                  key={key}
                  className="rounded-2xl border border-slate-800 p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-300">
                      {label}
                    </p>
                    <CopyButton
                      text={generatedOutput.logoVariants[key]}
                      label="Másolás"
                    />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {generatedOutput.logoVariants[key]}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00B5F1]" />
                Arculati Szabályok
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2">
                  <Ruler className="w-4 h-4 text-[#00B5F1] mt-0.5 shrink-0" />
                  <p className="text-slate-300">
                    {generatedOutput.brandGuidelines.clearSpaceRule}
                  </p>
                </div>
                <p className="text-slate-400 font-mono">
                  Min. méret: {generatedOutput.brandGuidelines.minSizePx} •{" "}
                  {generatedOutput.brandGuidelines.minSizeMm}
                </p>
                <ul className="space-y-1.5">
                  {generatedOutput.brandGuidelines.donts.map((dont, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-slate-400"
                    >
                      <span className="text-red-400 font-bold">×</span>
                      {dont}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
