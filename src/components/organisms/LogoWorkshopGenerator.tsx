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
  Palette,
  Type,
  Layers,
  Target,
  Hexagon,
  PenTool,
  Droplets,
  Sun,
  Moon,
  Star,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { addLogoGenerationAction } from "@/actions/logo-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  LogoGenerationInput,
  LogoGenerationOutput,
} from "@/types/logo-workshop";

const logoFormSchema = z.object({
  brandName: z.string().min(2, "Márkanév minimum 2 karakter"),
  industry: z.string().min(5, "Iparág minimum 5 karakter"),
  targetAudience: z.string().min(5, "Célközönség minimum 5 karakter"),
  logoStyle: z.enum([
    "minimalist",
    "modern",
    "vintage",
    "geometric",
    "typographic",
    "emblem",
    "abstract",
  ]),
  colorPreference: z.enum([
    "monochrome",
    "duotone",
    "vibrant",
    "pastel",
    "dark",
  ]),
  additionalRequirements: z.string().optional(),
});

type LogoFormValues = z.infer<typeof logoFormSchema>;

export default function LogoWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<LogoGenerationOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [allowedTools, setAllowedTools] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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
          setIsAdmin(
            res.profile.role === "admin" || user.email === "hello@webdude.hu"
          );
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
  } = useForm<LogoFormValues>({
    resolver: zodResolver(logoFormSchema),
    defaultValues: {
      logoStyle: "minimalist",
      colorPreference: "monochrome",
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

  const onSubmit = async (data: LogoFormValues) => {
    // Check access
    if (!isAdmin && !allowedTools.includes("logo_ai_muhely")) {
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
      const input: LogoGenerationInput = {
        brandName: data.brandName,
        industry: data.industry,
        targetAudience: data.targetAudience,
        logoStyle: data.logoStyle,
        colorPreference: data.colorPreference,
        additionalRequirements: data.additionalRequirements,
      };

      const result = await addLogoGenerationAction(idToken, input);

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
                        Logo AI Műhely
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
                        Logo Generátor
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none font-mono">
                        Professzionális Logo
                      </h1>
                      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Generálj prémium logo koncepciókat Norbi 26 éves
                        grafikai és arculattervezési látásmódjával. Skálázható,
                        időtálló és megjegyezhető.
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
                      {/* Brand Name - Prominent */}
                      <div className="space-y-3 p-6 rounded-2xl bg-sky-500/5 border border-sky-500/20">
                        <label className="flex items-center gap-2 text-sm font-bold text-sky-400 uppercase tracking-wider">
                          <Target className="w-5 h-5" />
                          Logó Neve / Márkanév
                        </label>
                        <input
                          {...register("brandName")}
                          type="text"
                          placeholder="Pl. WebDude"
                          className="w-full px-5 py-4 rounded-xl bg-bg-elevated/80 border-2 border-sky-500/30 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/20 text-white placeholder-slate-500 transition-all text-base font-bold"
                        />
                        {errors.brandName && (
                          <p className="text-red-400 text-sm font-mono">
                            {errors.brandName.message}
                          </p>
                        )}
                      </div>

                      {/* Industry */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Hexagon className="w-4 h-4 text-sky-500" />
                          Iparág
                        </label>
                        <input
                          {...register("industry")}
                          type="text"
                          placeholder="Pl. Webfejlesztés"
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 text-white placeholder-slate-500 transition-all text-sm"
                        />
                        {errors.industry && (
                          <p className="text-red-400 text-xs font-mono">
                            {errors.industry.message}
                          </p>
                        )}
                      </div>

                      {/* Target Audience */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Target className="w-4 h-4 text-sky-500" />
                          Célközönség
                        </label>
                        <textarea
                          {...register("targetAudience")}
                          rows={3}
                          placeholder="Pl. Kis- és középvállalkozások, startupok"
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 text-white placeholder-slate-500 transition-all text-sm resize-none"
                        />
                        {errors.targetAudience && (
                          <p className="text-red-400 text-xs font-mono">
                            {errors.targetAudience.message}
                          </p>
                        )}
                      </div>

                      {/* Logo Style */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <PenTool className="w-4 h-4 text-sky-500" />
                          Logo Stílus
                        </label>
                        <select
                          {...register("logoStyle")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 text-white transition-all text-sm"
                        >
                          <option value="minimalist">Minimalista</option>
                          <option value="modern">Modern</option>
                          <option value="vintage">Vintage</option>
                          <option value="geometric">Geometrikus</option>
                          <option value="typographic">Tipográfiai</option>
                          <option value="emblem">Embléma</option>
                          <option value="abstract">Absztrakt</option>
                        </select>
                      </div>

                      {/* Color Preference */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Palette className="w-4 h-4 text-sky-500" />
                          Szín Preferencia
                        </label>
                        <select
                          {...register("colorPreference")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 text-white transition-all text-sm"
                        >
                          <option value="monochrome">Monokróm</option>
                          <option value="duotone">Duotón</option>
                          <option value="vibrant">Élénk</option>
                          <option value="pastel">Pasztell</option>
                          <option value="dark">Sötét</option>
                        </select>
                      </div>

                      {/* Additional Requirements */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Star className="w-4 h-4 text-sky-500" />
                          További Követelmények (opcionális)
                        </label>
                        <textarea
                          {...register("additionalRequirements")}
                          rows={3}
                          placeholder="Pl. Legyen benne egy kör alakú elem..."
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
                            Logo Generálása
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
                          <Palette className="w-8 h-8 text-sky-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          Logo Koncepció
                        </h3>
                        <p className="text-sm text-slate-400 text-center max-w-md">
                          Töltsd ki az űrlapot a bal oldalon, és kattints a
                          &ldquo;Logo Generálása&rdquo; gombra.
                        </p>
                      </div>
                    )}

                    {generatedOutput && (
                      <div className="space-y-4">
                        {/* Logo Concept */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <PenTool className="w-4 h-4 text-sky-500" />
                              Logo Koncepció
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Stílus
                              </p>
                              <p className="text-sm text-white font-mono">
                                {generatedOutput.logoConcept.style}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Leírás
                              </p>
                              <p className="text-sm text-white leading-relaxed">
                                {generatedOutput.logoConcept.description}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Kulcselemek
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.logoConcept.keyElements.map(
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

                        {/* Logo Variants */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Layers className="w-4 h-4 text-sky-500" />
                              Logo Változatok
                            </h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Primary
                              </p>
                              <p className="text-xs text-white leading-relaxed">
                                {generatedOutput.logoVariants.primary}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Secondary
                              </p>
                              <p className="text-xs text-white leading-relaxed">
                                {generatedOutput.logoVariants.secondary}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Icon Only
                              </p>
                              <p className="text-xs text-white leading-relaxed">
                                {generatedOutput.logoVariants.iconOnly}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Wordmark
                              </p>
                              <p className="text-xs text-white leading-relaxed">
                                {generatedOutput.logoVariants.wordmark}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Alternative Color Palettes */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Palette className="w-4 h-4 text-sky-500" />
                            Alternatív Szín Paletták
                          </h3>
                          <div className="space-y-3">
                            {generatedOutput.colorPalette.alternativePalettes.map(
                              (palette, index) => (
                                <div
                                  key={index}
                                  className="bg-bg-base/50 rounded-xl p-4 border border-gray-800"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <p className="text-xs text-slate-400">
                                      {palette.name}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                      {palette.useCase}
                                    </p>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {palette.colors.map((color, colorIndex) => (
                                      <span
                                        key={colorIndex}
                                        className="px-2 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono"
                                      >
                                        {color}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Palette className="w-4 h-4 text-sky-500" />
                              Szín Paletta
                            </h3>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              {
                                color: generatedOutput.colorPalette.primary,
                                label: "Primary",
                              },
                              {
                                color: generatedOutput.colorPalette.secondary,
                                label: "Secondary",
                              },
                              {
                                color: generatedOutput.colorPalette.accent,
                                label: "Accent",
                              },
                              {
                                color: generatedOutput.colorPalette.neutral,
                                label: "Neutral",
                              },
                            ].map((item) => (
                              <div
                                key={item.label}
                                className="flex items-center gap-3"
                              >
                                <div
                                  className="w-10 h-10 rounded-lg border border-gray-700"
                                  style={{ backgroundColor: item.color }}
                                />
                                <div className="flex-1">
                                  <p className="text-xs text-slate-400">
                                    {item.label}
                                  </p>
                                  <p className="text-xs text-white font-mono">
                                    {item.color}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 mb-1">
                              Indoklás
                            </p>
                            <p className="text-sm text-white leading-relaxed">
                              {generatedOutput.colorPalette.rationale}
                            </p>
                          </div>
                        </motion.div>

                        {/* Typography */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Type className="w-4 h-4 text-sky-500" />
                              Tipográfia
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Elsődleges Betűtípus
                              </p>
                              <p className="text-sm text-white font-mono">
                                {generatedOutput.typography.primaryFont}
                              </p>
                            </div>
                            {generatedOutput.typography.secondaryFont && (
                              <div>
                                <p className="text-xs text-slate-400 mb-1">
                                  Másodlagos Betűtípus
                                </p>
                                <p className="text-sm text-white font-mono">
                                  {generatedOutput.typography.secondaryFont}
                                </p>
                              </div>
                            )}
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Betűtípus Párosítás
                              </p>
                              <p className="text-sm text-white leading-relaxed">
                                {generatedOutput.typography.fontPairing}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Indoklás
                              </p>
                              <p className="text-sm text-white leading-relaxed">
                                {generatedOutput.typography.rationale}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Iconography */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Hexagon className="w-4 h-4 text-sky-500" />
                              Ikonográfia
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Ikon Típus
                              </p>
                              <p className="text-sm text-white font-mono">
                                {generatedOutput.iconography.iconType}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Szimbolizmus
                              </p>
                              <p className="text-sm text-white leading-relaxed">
                                {generatedOutput.iconography.symbolism}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Használat
                              </p>
                              <p className="text-sm text-white leading-relaxed">
                                {generatedOutput.iconography.usage}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Midjourney Prompts */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-sky-500" />
                            Midjourney Promptok
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-400">
                                  Primary
                                </p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.midjourneyPrompts.primary,
                                      "mj-primary"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors"
                                >
                                  {copiedStates["mj-primary"] ? (
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
                              <p className="text-xs text-white font-mono leading-relaxed whitespace-pre-wrap">
                                {generatedOutput.midjourneyPrompts.primary}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-400">
                                  Secondary
                                </p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.midjourneyPrompts
                                        .secondary,
                                      "mj-secondary"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors"
                                >
                                  {copiedStates["mj-secondary"] ? (
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
                              <p className="text-xs text-white font-mono leading-relaxed whitespace-pre-wrap">
                                {generatedOutput.midjourneyPrompts.secondary}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-400">
                                  Icon Only
                                </p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.midjourneyPrompts
                                        .iconOnly,
                                      "mj-icon"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors"
                                >
                                  {copiedStates["mj-icon"] ? (
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
                              <p className="text-xs text-white font-mono leading-relaxed whitespace-pre-wrap">
                                {generatedOutput.midjourneyPrompts.iconOnly}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-400">
                                  Wordmark
                                </p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.midjourneyPrompts
                                        .wordmark,
                                      "mj-wordmark"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors"
                                >
                                  {copiedStates["mj-wordmark"] ? (
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
                              <p className="text-xs text-white font-mono leading-relaxed whitespace-pre-wrap">
                                {generatedOutput.midjourneyPrompts.wordmark}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Brand Guidelines */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Target className="w-4 h-4 text-sky-500" />
                            Brand Guidelines
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Logo Használat
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.brandGuidelines.logoUsage.map(
                                  (usage, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {usage}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Távolság
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.brandGuidelines.spacing}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Minimum Méret
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.brandGuidelines.minimumSize}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Clear Space
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.brandGuidelines.clearSpace}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Ne Tedd
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.brandGuidelines.doNot.map(
                                  (dont, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {dont}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </motion.div>

                        {/* Export Formats */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-4 h-4 text-sky-500" />
                            Export Formátumok
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">SVG</p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.svg}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">PNG</p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.png}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">PDF</p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.pdf}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Favicon
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.favicon}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Variations */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Droplets className="w-4 h-4 text-sky-500" />
                              Változatok
                            </h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <div className="flex items-center gap-2 mb-2">
                                <Sun className="w-3 h-3 text-sky-500" />
                                <p className="text-xs text-slate-400">
                                  Light Mode
                                </p>
                              </div>
                              <p className="text-xs text-white leading-relaxed">
                                {generatedOutput.variations.lightMode}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <div className="flex items-center gap-2 mb-2">
                                <Moon className="w-3 h-3 text-sky-500" />
                                <p className="text-xs text-slate-400">
                                  Dark Mode
                                </p>
                              </div>
                              <p className="text-xs text-white leading-relaxed">
                                {generatedOutput.variations.darkMode}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <div className="flex items-center gap-2 mb-2">
                                <Star className="w-3 h-3 text-sky-500" />
                                <p className="text-xs text-slate-400">
                                  Monochrome
                                </p>
                              </div>
                              <p className="text-xs text-white leading-relaxed">
                                {generatedOutput.variations.monochrome}
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
