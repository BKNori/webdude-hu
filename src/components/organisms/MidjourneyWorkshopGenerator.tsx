"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import {
  Copy,
  Check,
  Sparkles,
  Loader2,
  ArrowLeft,
  Camera,
  Sun,
  Palette,
  Layers,
  Target,
  Image as ImageIcon,
  Zap,
  Aperture,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import PresetChips from "@/components/molecules/PresetChips";
import {
  AI_ENGINE_PRESETS,
  DESIGN_STYLE_PRESETS,
  OPTICS_PRESETS,
  COLOR_PALETTE_PRESETS,
} from "@/lib/workshop-presets";
import { auth } from "@/lib/firebase";
import { addMidjourneyGenerationAction } from "@/actions/midjourney-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  MidjourneyGenerationInput,
  MidjourneyGenerationOutput,
} from "@/types/midjourney-workshop";

const midjourneyFormSchema = z.object({
  subject: z.string().min(5, "Tárgy minimum 5 karakter"),
  style: z.enum([
    "photorealistic",
    "cinematic",
    "artistic",
    "minimalist",
    "vintage",
    "futuristic",
    "abstract",
  ]),
  mood: z.enum([
    "dramatic",
    "peaceful",
    "energetic",
    "mysterious",
    "romantic",
    "professional",
    "playful",
  ]),
  lighting: z.enum([
    "natural",
    "studio",
    "golden-hour",
    "blue-hour",
    "neon",
    "volumetric",
    "chiaroscuro",
  ]),
  aspectRatio: z.enum(["16:9", "9:16", "1:1", "4:5", "21:9"]),
  additionalRequirements: z.string().optional(),
});

type MidjourneyFormValues = z.infer<typeof midjourneyFormSchema>;

export default function MidjourneyWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<MidjourneyGenerationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [allowedTools, setAllowedTools] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // 2026-os haladó preset paraméterek (kattintható chipek)
  const [engine, setEngine] = useState<string | null>(null);
  const [designStyle, setDesignStyle] = useState<string | null>(null);
  const [optics, setOptics] = useState<string | null>(null);
  const [colorPalette, setColorPalette] = useState<string | null>(null);
  const [customColor, setCustomColor] = useState("");
  const [stylize, setStylize] = useState(250);
  const [styleRaw, setStyleRaw] = useState(true);
  const [negativePrompt, setNegativePrompt] = useState("");
  const [sref, setSref] = useState("");
  const [cref, setCref] = useState("");

  /** A chip id-ket a promptba kerülő leírásokká oldja fel. */
  const resolveHints = (
    ids: string | null,
    options: { id: string; promptHint: string }[]
  ) => {
    if (!ids) return undefined;
    return ids
      .split("|")
      .map((id) => options.find((o) => o.id === id)?.promptHint)
      .filter(Boolean)
      .join("; ") || undefined;
  };

  useEffect(() => {
    if (!auth) return;
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const token = await user.getIdToken(true);
        const res = await getClientUserProfileAction(token);
        if (res.success && res.profile) {
          const isAdmin =
            res.profile.role === "admin" || user.email === "hello@webdude.hu";
          setIsAdmin(isAdmin);
          setAllowedTools(res.profile.allowedTools || []);
        }
      } catch {
        // Ignored
      } finally {
        setLoading(false);
      }
    });
    return unsub;
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MidjourneyFormValues>({
    resolver: zodResolver(midjourneyFormSchema),
    defaultValues: {
      style: "photorealistic",
      mood: "dramatic",
      lighting: "volumetric",
      aspectRatio: "16:9",
      additionalRequirements: "",
    },
  });

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const onSubmit = async (data: MidjourneyFormValues) => {
    // Check access
    if (!isAdmin && !allowedTools.includes("midjourney_ai_muhely")) {
      setError(
        "Nincs hozzáférésed ehhez az eszközhöz. Kérlek, lépj kapcsolatba az adminisztrátorral."
      );
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedOutput(null);

    try {
      if (!auth) {
        throw new Error("Nincs bejelentkezve");
      }

      const user = auth.currentUser;
      if (!user) {
        throw new Error("Nincs bejelentkezve");
      }

      const idToken = await user.getIdToken(true);
      const input: MidjourneyGenerationInput = {
        subject: data.subject,
        style: data.style,
        mood: data.mood,
        lighting: data.lighting,
        aspectRatio: data.aspectRatio,
        additionalRequirements: data.additionalRequirements,
        engine: resolveHints(engine, AI_ENGINE_PRESETS),
        designStyle: resolveHints(designStyle, DESIGN_STYLE_PRESETS),
        optics: resolveHints(optics, OPTICS_PRESETS),
        colorPalette:
          resolveHints(colorPalette, COLOR_PALETTE_PRESETS) ||
          (customColor.trim() ? undefined : undefined),
        customColor: customColor.trim() || undefined,
        stylize,
        styleRaw,
        negativePrompt: negativePrompt.trim() || undefined,
        sref: sref.trim() || undefined,
        cref: cref.trim() || undefined,
      };

      const result = await addMidjourneyGenerationAction(idToken, input);

      if (result.success && result.output) {
        setGeneratedOutput(result.output);
      } else {
        setError(result.error || "Hiba történt a generálás során");
      }
    } catch (err) {
      setError("Hiba történt a generálás során");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-text-primary">
      {/* Loading State */}
      {loading && (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest animate-pulse font-bold">
            Generátor betöltése...
          </p>
        </div>
      )}

      {!loading && (
        <>
          {/* Authentication Check */}
          {!auth || !auth.currentUser ? (
            <div className="min-h-screen bg-transparent flex flex-col items-center justify-center space-y-6 px-6">
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-2xl text-sm flex items-center gap-3 font-mono max-w-md text-center">
                <Sparkles className="w-5 h-5" />
                {error || "Kérlek, jelentkezz be a használatához!"}
              </div>
              <Link
                href="/portal"
                className="px-6 py-3 rounded-xl bg-sky-500 text-bg-base font-bold hover:bg-violet-700 transition-colors"
              >
                Bejelentkezés
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <header className="border-b border-bg-elevated/40 bg-transparent backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Link
                      href="/portal/ai-muhely"
                      className="w-10 h-10 rounded-xl bg-linear-to-br from-sky-400 to-violet-700 flex items-center justify-center shadow-lg shadow-sky-500/10 cursor-pointer"
                    >
                      <Layers className="w-5 h-5 text-bg-base" />
                    </Link>
                    <div>
                      <span className="text-xs uppercase font-black tracking-widest text-sky-500 block">
                        WebDude AI Studio
                      </span>
                      <span className="text-sm font-bold text-white block -mt-0.5">
                        Midjourney v6.1 / v7 & Flux Pro
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/portal/ai-muhely"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-800 hover:border-sky-500/30 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Vissza
                  </Link>
                </div>
              </header>

              {/* Main Container */}
              <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Input Form */}
                  <div className="space-y-6">
                    <div className="space-y-2 relative">
                      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
                      <span className="text-xs font-mono font-black uppercase tracking-widest text-sky-500">
                        Midjourney Generátor
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none font-mono">
                        Prémium Vizuálok
                      </h1>
                      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Generálj professzionális Midjourney v6.1/v7 és Flux.1
                        Pro promptokat Norbi 26 éves vizuális és fotográfiai
                        szakértelmével. 85mm G-Master optika, volumetric
                        lighting és prémium kompozíció.
                      </p>
                    </div>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl text-xs flex items-center gap-2.5 font-mono">
                        <Sparkles className="w-4 h-4" />
                        {error}
                      </div>
                    )}

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {/* Subject */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Target className="w-4 h-4 text-sky-500" />
                          Tárgy
                        </label>
                        <textarea
                          {...register("subject")}
                          rows={3}
                          placeholder="Pl. Egy futurisztikus cyberpunk városkép neon fényekkel éjjel..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 text-white placeholder-slate-500 transition-all text-sm resize-none"
                        />
                        {errors.subject && (
                          <p className="text-red-400 text-xs font-mono">
                            {errors.subject.message}
                          </p>
                        )}
                      </div>

                      {/* Style */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <ImageIcon className="w-4 h-4 text-sky-500" />
                          Stílus
                        </label>
                        <select
                          {...register("style")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 text-white transition-all text-sm"
                        >
                          <option value="photorealistic">
                            Fotorealisztikus
                          </option>
                          <option value="cinematic">Cinematikus</option>
                          <option value="artistic">Művészi</option>
                          <option value="minimalist">Minimalista</option>
                          <option value="vintage">Vintage</option>
                          <option value="futuristic">Futurisztikus</option>
                          <option value="abstract">Absztrakt</option>
                        </select>
                      </div>

                      {/* Mood */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Zap className="w-4 h-4 text-sky-500" />
                          Hangulat
                        </label>
                        <select
                          {...register("mood")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 text-white transition-all text-sm"
                        >
                          <option value="dramatic">Drámai</option>
                          <option value="peaceful">Békés</option>
                          <option value="energetic">Energetikus</option>
                          <option value="mysterious">Rejtélyes</option>
                          <option value="romantic">Romantikus</option>
                          <option value="professional">Professzionális</option>
                          <option value="playful">Játékos</option>
                        </select>
                      </div>

                      {/* Lighting */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Sun className="w-4 h-4 text-sky-500" />
                          Fényviszonyok
                        </label>
                        <select
                          {...register("lighting")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 text-white transition-all text-sm"
                        >
                          <option value="natural">Természetes</option>
                          <option value="studio">Stúdió</option>
                          <option value="golden-hour">Golden Hour</option>
                          <option value="blue-hour">Blue Hour</option>
                          <option value="neon">Neon</option>
                          <option value="volumetric">Volumetrikus</option>
                          <option value="chiaroscuro">Chiaroscuro</option>
                        </select>
                      </div>

                      {/* Aspect Ratio */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Aperture className="w-4 h-4 text-sky-500" />
                          Képarány
                        </label>
                        <select
                          {...register("aspectRatio")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 text-white transition-all text-sm"
                        >
                          <option value="16:9">16:9 (Landscape)</option>
                          <option value="9:16">9:16 (Portrait)</option>
                          <option value="1:1">1:1 (Square)</option>
                          <option value="4:5">4:5 (Instagram)</option>
                          <option value="21:9">21:9 (Ultrawide)</option>
                        </select>
                      </div>

                      {/* Haladó Paraméterek — 2026-os preset chipek */}
                      <div className="space-y-4 rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4">
                        <p className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                          <Zap className="w-4 h-4 text-sky-500" />
                          Haladó Paraméterek (opcionális)
                        </p>

                        <PresetChips
                          label="AI Motor"
                          options={AI_ENGINE_PRESETS}
                          value={engine}
                          onChange={setEngine}
                        />

                        <PresetChips
                          label="Design Irányzat"
                          options={DESIGN_STYLE_PRESETS}
                          value={designStyle}
                          onChange={setDesignStyle}
                        />

                        <PresetChips
                          label="Optika & Render (többszörös)"
                          options={OPTICS_PRESETS}
                          value={optics}
                          onChange={setOptics}
                          multi
                        />

                        <PresetChips
                          label="Színpaletta"
                          options={COLOR_PALETTE_PRESETS}
                          value={colorPalette}
                          onChange={setColorPalette}
                        />

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Egyedi HEX szín (opcionális)
                          </label>
                          <input
                            type="text"
                            value={customColor}
                            onChange={(e) => setCustomColor(e.target.value)}
                            placeholder="#00B5F1"
                            className="w-full px-4 py-2.5 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 text-white placeholder-slate-500 transition-all text-sm font-mono"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Stilizáció (--stylize)
                            </label>
                            <span className="text-xs font-mono text-sky-400">
                              {stylize}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={50}
                            max={750}
                            step={50}
                            value={stylize}
                            onChange={(e) => setStylize(Number(e.target.value))}
                            className="w-full accent-[#00B5F1]"
                          />
                          <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={styleRaw}
                              onChange={(e) => setStyleRaw(e.target.checked)}
                              className="accent-[#00B5F1]"
                            />
                            --style raw (letisztult, fotórealisztikus kimenet)
                          </label>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Negatív prompt (--no)
                            </label>
                            <input
                              type="text"
                              value={negativePrompt}
                              onChange={(e) =>
                                setNegativePrompt(e.target.value)
                              }
                              placeholder="blurry, watermark, extra limbs..."
                              className="w-full px-4 py-2.5 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 text-white placeholder-slate-500 transition-all text-sm"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                              --sref / --cref (opcionális)
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={sref}
                                onChange={(e) => setSref(e.target.value)}
                                placeholder="sref"
                                className="w-1/2 px-3 py-2.5 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-sky-500/50 text-white placeholder-slate-500 transition-all text-sm font-mono"
                              />
                              <input
                                type="text"
                                value={cref}
                                onChange={(e) => setCref(e.target.value)}
                                placeholder="cref"
                                className="w-1/2 px-3 py-2.5 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-sky-500/50 text-white placeholder-slate-500 transition-all text-sm font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Requirements */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Lightbulb className="w-4 h-4 text-sky-500" />
                          További Követelmények (opcionális)
                        </label>
                        <textarea
                          {...register("additionalRequirements")}
                          rows={3}
                          placeholder="Pl. Legyen benne egy futurisztikus autó és neon feliratok..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 text-white placeholder-slate-500 transition-all text-sm resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isGenerating}
                        className="w-full px-6 py-4 rounded-xl bg-linear-to-r from-sky-500 to-violet-700 text-bg-base font-bold text-sm uppercase tracking-wider hover:from-violet-700 hover:to-sky-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generálás folyamatban...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Midjourney Prompt Generálása
                          </>
                        )}
                      </motion.button>
                    </form>
                  </div>

                  {/* Output Section */}
                  <div className="space-y-6">
                    {!generatedOutput && (
                      <div className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center min-h-100">
                        <div className="w-16 h-16 rounded-full bg-sky-500/10 flex items-center justify-center mb-4">
                          <Camera className="w-8 h-8 text-sky-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          Midjourney Koncepció
                        </h3>
                        <p className="text-sm text-slate-400 text-center max-w-md">
                          Töltsd ki az űrlapot a bal oldalon, és kattints a
                          &ldquo;Midjourney Prompt Generálása&rdquo; gombra.
                        </p>
                      </div>
                    )}

                    {generatedOutput && (
                      <div className="space-y-4">
                        {/* Visual Concept */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <ImageIcon className="w-4 h-4 text-sky-500" />
                              Vizuális Koncepció
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Stílus
                              </p>
                              <p className="text-sm text-white font-mono">
                                {generatedOutput.visualConcept.style}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Hangulat
                              </p>
                              <p className="text-sm text-white font-mono">
                                {generatedOutput.visualConcept.mood}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Leírás
                              </p>
                              <p className="text-sm text-white leading-relaxed">
                                {generatedOutput.visualConcept.description}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Kulcselemek
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.visualConcept.keyElements.map(
                                  (element, index) => (
                                    <span
                                      key={index}
                                      className="px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono"
                                    >
                                      {element}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Lighting Setup */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Sun className="w-4 h-4 text-sky-500" />
                              Fénybeállítás
                            </h3>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Típus
                              </p>
                              <p className="text-sm text-white font-mono">
                                {generatedOutput.lightingSetup.type}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Irány
                              </p>
                              <p className="text-sm text-white font-mono">
                                {generatedOutput.lightingSetup.direction}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Intenzitás
                              </p>
                              <p className="text-sm text-white font-mono">
                                {generatedOutput.lightingSetup.intensity}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Színhőmérséklet
                              </p>
                              <p className="text-sm text-white font-mono">
                                {generatedOutput.lightingSetup.colorTemperature}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 mb-1">
                              Indoklás
                            </p>
                            <p className="text-sm text-white leading-relaxed">
                              {generatedOutput.lightingSetup.rationale}
                            </p>
                          </div>
                        </motion.div>

                        {/* Composition */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Layers className="w-4 h-4 text-sky-500" />
                              Kompozíció
                            </h3>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Képkivágás
                              </p>
                              <p className="text-sm text-white font-mono">
                                {generatedOutput.composition.framing}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Perspektíva
                              </p>
                              <p className="text-sm text-white font-mono">
                                {generatedOutput.composition.perspective}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Mélységélesség
                              </p>
                              <p className="text-sm text-white font-mono">
                                {generatedOutput.composition.depthOfField}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Fókuszpont
                              </p>
                              <p className="text-sm text-white font-mono">
                                {generatedOutput.composition.focalPoint}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Color Grading */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Palette className="w-4 h-4 text-sky-500" />
                              Szín Grading
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Paletta
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.colorGrading.palette.map(
                                  (color, index) => (
                                    <span
                                      key={index}
                                      className="px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono"
                                    >
                                      {color}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs text-slate-400 mb-1">
                                  Grading Stílus
                                </p>
                                <p className="text-sm text-white font-mono">
                                  {generatedOutput.colorGrading.gradingStyle}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400 mb-1">
                                  Kontraszt
                                </p>
                                <p className="text-sm text-white font-mono">
                                  {generatedOutput.colorGrading.contrast}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400 mb-1">
                                  Telítettség
                                </p>
                                <p className="text-sm text-white font-mono">
                                  {generatedOutput.colorGrading.saturation}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Indoklás
                              </p>
                              <p className="text-sm text-white leading-relaxed">
                                {generatedOutput.colorGrading.rationale}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Midjourney Prompt */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-sky-500" />
                              Midjourney Prompt
                            </h3>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  generatedOutput.midjourneyPrompt,
                                  "midjourney"
                                )
                              }
                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors"
                            >
                              {copiedStates["midjourney"] ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  Másolva
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  Másolás
                                </>
                              )}
                            </button>
                          </div>
                          <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                            <p className="text-xs text-white font-mono leading-relaxed whitespace-pre-wrap">
                              {generatedOutput.midjourneyPrompt}
                            </p>
                          </div>
                        </motion.div>

                        {/* Flux / Ideogram Prompt (ha szöveg kell a képre) */}
                        {(generatedOutput.fluxPrompt ||
                          generatedOutput.ideogramPrompt) && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                          >
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-sky-500" />
                              Flux.1 Pro / Ideogram 2.0 Prompt
                            </h3>
                            <div className="space-y-3">
                              {generatedOutput.fluxPrompt && (
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="text-xs text-slate-400">
                                      Flux.1 Pro (fotórealisztikus)
                                    </p>
                                    <button
                                      onClick={() =>
                                        copyToClipboard(
                                          generatedOutput.fluxPrompt || "",
                                          "flux"
                                        )
                                      }
                                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors"
                                    >
                                      {copiedStates["flux"] ? (
                                        <Check className="w-3 h-3" />
                                      ) : (
                                        <Copy className="w-3 h-3" />
                                      )}
                                    </button>
                                  </div>
                                  <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                                    <p className="text-xs text-white font-mono leading-relaxed whitespace-pre-wrap">
                                      {generatedOutput.fluxPrompt}
                                    </p>
                                  </div>
                                </div>
                              )}
                              {generatedOutput.ideogramPrompt && (
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="text-xs text-slate-400">
                                      Ideogram 2.0 (pontos tipográfia)
                                    </p>
                                    <button
                                      onClick={() =>
                                        copyToClipboard(
                                          generatedOutput.ideogramPrompt || "",
                                          "ideogram"
                                        )
                                      }
                                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors"
                                    >
                                      {copiedStates["ideogram"] ? (
                                        <Check className="w-3 h-3" />
                                      ) : (
                                        <Copy className="w-3 h-3" />
                                      )}
                                    </button>
                                  </div>
                                  <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                                    <p className="text-xs text-white font-mono leading-relaxed whitespace-pre-wrap">
                                      {generatedOutput.ideogramPrompt}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* Negatív prompt + Szakértői tippek */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.48 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-sky-500" />
                            Negatív Prompt & Szakértői Tippek
                          </h3>
                          {generatedOutput.negativePrompt && (
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-xs text-slate-400">
                                  Negatív prompt (--no)
                                </p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.negativePrompt || "",
                                      "negative"
                                    )
                                  }
                                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors"
                                >
                                  {copiedStates["negative"] ? (
                                    <Check className="w-3 h-3" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                              <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                                <p className="text-xs text-white font-mono leading-relaxed">
                                  --no {generatedOutput.negativePrompt}
                                </p>
                              </div>
                            </div>
                          )}
                          {generatedOutput.expertTips &&
                            generatedOutput.expertTips.length > 0 && (
                              <div>
                                <p className="text-xs text-slate-400 mb-2">
                                  Szakértői megvalósítási tippek (26 év grafikai
                                  rutin)
                                </p>
                                <ul className="space-y-1.5">
                                  {generatedOutput.expertTips.map((tip, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed"
                                    >
                                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#00B5F1] shrink-0" />
                                      {tip}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </motion.div>

                        {/* Variations */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Layers className="w-4 h-4 text-sky-500" />
                              Változatok
                            </h3>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Alternatív 1
                              </p>
                              <p className="text-xs text-white leading-relaxed">
                                {generatedOutput.variations.alternative1}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Alternatív 2
                              </p>
                              <p className="text-xs text-white leading-relaxed">
                                {generatedOutput.variations.alternative2}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Alternatív 3
                              </p>
                              <p className="text-xs text-white leading-relaxed">
                                {generatedOutput.variations.alternative3}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
