"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import {
  Layout,
  Sparkles,
  Loader2,
  ArrowLeft,
  Palette,
  Type,
  Layers,
  Target,
  Printer,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { addPosterGenerationAction } from "@/actions/poster-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  PosterWorkshopInput,
  PosterWorkshopOutput,
} from "@/types/poster-workshop";
import { PosterConcept } from "@/components/organisms/PosterConcept";
import { PrintSpecs } from "@/components/organisms/PrintSpecs";
import { ColorPalette } from "@/components/organisms/ColorPalette";
import { Typography } from "@/components/organisms/Typography";
import { PosterLayout } from "@/components/organisms/PosterLayout";
import { Copywriting } from "@/components/organisms/Copywriting";
import { MidjourneyPrompts } from "@/components/organisms/MidjourneyPrompts";
import { PrintGuidelines } from "@/components/organisms/PrintGuidelines";
import { ExportFormats } from "@/components/organisms/ExportFormats";
import { PosterVariations } from "@/components/organisms/PosterVariations";
import ToolAccessLock from "@/components/molecules/ToolAccessLock";

const posterFormSchema = z.object({
  posterPurpose: z.string().min(10, "Poszter célja minimum 10 karakter"),
  targetAudience: z.string().min(10, "Célközönség minimum 10 karakter"),
  posterSize: z.enum(["A4", "A3", "A2", "A1", "custom"]),
  posterStyle: z.enum([
    "minimalist",
    "typographic",
    "photographic",
    "illustration",
    "abstract",
    "vintage",
    "modern-bold",
    "corporate",
  ]),
  printSpecs: z.enum(["standard", "premium", "large-format", "outdoor"]),
  brandColors: z.array(z.string()).optional(),
  requiredTexts: z.object({
    headline: z.string().optional(),
    subheadline: z.string().optional(),
    bodyText: z.string().optional(),
    cta: z.string().optional(),
    eventDetails: z.string().optional(),
  }),
  additionalRequirements: z.string().optional(),
});

type PosterFormValues = z.infer<typeof posterFormSchema>;

export default function PosterWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<PosterWorkshopOutput | null>(null);
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
  } = useForm<PosterFormValues>({
    resolver: zodResolver(posterFormSchema),
    defaultValues: {
      posterSize: "A4",
      posterStyle: "minimalist",
      printSpecs: "standard",
      brandColors: [],
      requiredTexts: {
        headline: "",
        subheadline: "",
        bodyText: "",
        cta: "",
        eventDetails: "",
      },
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

  const onSubmit = async (data: PosterFormValues) => {
    // Check access
    if (!isAdmin && !allowedTools.includes("poster_ai_muhely")) {
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
      const input: PosterWorkshopInput = {
        posterPurpose: data.posterPurpose,
        targetAudience: data.targetAudience,
        posterSize: data.posterSize,
        posterStyle: data.posterStyle,
        printSpecs: data.printSpecs,
        brandColors: data.brandColors,
        requiredTexts: data.requiredTexts,
        additionalRequirements: data.additionalRequirements,
      };

      const result = await addPosterGenerationAction(idToken, input);

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

  if (!loading && !isAdmin && !allowedTools.includes("poster_ai_muhely")) {
    return <ToolAccessLock toolName="Poster AI Műhely" />;
  }

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
              <div className="bg-red-500/5 border border-red-500/40 backdrop-blur-xl shadow-[0_0_24px_rgba(239,68,68,0.15)] text-red-400 px-6 py-4 rounded-2xl text-sm flex items-center gap-3 font-mono max-w-md text-center">
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
                        Poster AI Műhely
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
              <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Input Form */}
                  <div className="space-y-6">
                    <div className="space-y-2 relative">
                      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
                      <span className="text-xs font-mono font-black uppercase tracking-widest text-sky-500">
                        Poster Generátor
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none font-mono">
                        Nyomdai Kész Poszter
                      </h1>
                      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Generálj print-ready poszter koncepciókat Norbi 26 éves
                        grafikai és nyomdai szakértelmével. CMYK színértékek,
                        bleed, safe zone és crop marks irányelvekkel.
                      </p>
                    </div>

                    {error && (
                      <div className="bg-red-500/5 border border-red-500/40 backdrop-blur-xl shadow-[0_0_24px_rgba(239,68,68,0.15)] text-red-400 px-4 py-3 rounded-2xl text-xs flex items-center gap-2.5 font-mono">
                        <Sparkles className="w-4 h-4" />
                        {error}
                      </div>
                    )}

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {/* Poster Purpose */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Target className="w-4 h-4 text-sky-500" />
                          Poszter Célja
                        </label>
                        <textarea
                          {...register("posterPurpose")}
                          placeholder="Példa: Esemény promóció, termék bevezetés, kiállítás, konferencia..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm resize-none"
                          rows={3}
                        />
                        {errors.posterPurpose && (
                          <p className="text-red-400 text-xs">
                            {errors.posterPurpose.message}
                          </p>
                        )}
                      </div>

                      {/* Target Audience */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Type className="w-4 h-4 text-sky-500" />
                          Célközönség
                        </label>
                        <textarea
                          {...register("targetAudience")}
                          placeholder="Példa: 25-35 éves szakemberek, diákok, helyi lakosok..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm resize-none"
                          rows={3}
                        />
                        {errors.targetAudience && (
                          <p className="text-red-400 text-xs">
                            {errors.targetAudience.message}
                          </p>
                        )}
                      </div>

                      {/* Poster Size */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Layout className="w-4 h-4 text-sky-500" />
                          Poszter Méret
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                          {[
                            { value: "A4", label: "A4" },
                            { value: "A3", label: "A3" },
                            { value: "A2", label: "A2" },
                            { value: "A1", label: "A1" },
                            { value: "custom", label: "Egyedi" },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="relative cursor-pointer"
                            >
                              <input
                                {...register("posterSize")}
                                type="radio"
                                value={option.value}
                                className="sr-only peer"
                              />
                              <div className="px-3 py-2 rounded-xl bg-bg-elevated/50 border border-bg-elevated peer-checked:border-sky-500/50 peer-checked:bg-sky-500/10 text-center transition-all">
                                <span className="text-xs font-bold text-slate-300 peer-checked:text-sky-500">
                                  {option.label}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.posterSize && (
                          <p className="text-red-400 text-xs">
                            {errors.posterSize.message}
                          </p>
                        )}
                      </div>

                      {/* Poster Style */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Palette className="w-4 h-4 text-sky-500" />
                          Poszter Stílus
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { value: "minimalist", label: "Minimalista" },
                            { value: "typographic", label: "Tipográfiai" },
                            { value: "photographic", label: "Fotó" },
                            { value: "illustration", label: "Illusztráció" },
                            { value: "abstract", label: "Absztrakt" },
                            { value: "vintage", label: "Vintage" },
                            { value: "modern-bold", label: "Modern" },
                            { value: "corporate", label: "Vállalati" },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="relative cursor-pointer"
                            >
                              <input
                                {...register("posterStyle")}
                                type="radio"
                                value={option.value}
                                className="sr-only peer"
                              />
                              <div className="px-3 py-2 rounded-xl bg-bg-elevated/50 border border-bg-elevated peer-checked:border-sky-500/50 peer-checked:bg-sky-500/10 text-center transition-all">
                                <span className="text-xs font-bold text-slate-300 peer-checked:text-sky-500">
                                  {option.label}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.posterStyle && (
                          <p className="text-red-400 text-xs">
                            {errors.posterStyle.message}
                          </p>
                        )}
                      </div>

                      {/* Print Specs */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Printer className="w-4 h-4 text-sky-500" />
                          Nyomdai Specifikációk
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { value: "standard", label: "Standard" },
                            { value: "premium", label: "Prémium" },
                            { value: "large-format", label: "Nagyformátum" },
                            { value: "outdoor", label: "Kültéri" },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="relative cursor-pointer"
                            >
                              <input
                                {...register("printSpecs")}
                                type="radio"
                                value={option.value}
                                className="sr-only peer"
                              />
                              <div className="px-3 py-2 rounded-xl bg-bg-elevated/50 border border-bg-elevated peer-checked:border-sky-500/50 peer-checked:bg-sky-500/10 text-center transition-all">
                                <span className="text-xs font-bold text-slate-300 peer-checked:text-sky-500">
                                  {option.label}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.printSpecs && (
                          <p className="text-red-400 text-xs">
                            {errors.printSpecs.message}
                          </p>
                        )}
                      </div>

                      {/* Brand Colors */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Palette className="w-4 h-4 text-sky-500" />
                          Brand Színek (Opcionális)
                        </label>
                        <input
                          {...register("brandColors")}
                          placeholder="Példa: #00B5F1, #020617, #e2e8f0 (vesszővel elválasztva)"
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm"
                        />
                      </div>

                      {/* Required Texts */}
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Type className="w-4 h-4 text-sky-500" />
                          Kötelező Szövegek (Opcionális)
                        </label>
                        <div className="space-y-3">
                          <input
                            {...register("requiredTexts.headline")}
                            placeholder="Főcím (opcionális)"
                            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm"
                          />
                          <input
                            {...register("requiredTexts.subheadline")}
                            placeholder="Alcím (opcionális)"
                            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm"
                          />
                          <textarea
                            {...register("requiredTexts.bodyText")}
                            placeholder="Szövegtörzs (opcionális)"
                            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm resize-none"
                            rows={2}
                          />
                          <input
                            {...register("requiredTexts.cta")}
                            placeholder="CTA gomb szöveg (opcionális)"
                            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm"
                          />
                          <input
                            {...register("requiredTexts.eventDetails")}
                            placeholder="Esemény részletek (opcionális)"
                            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm"
                          />
                        </div>
                      </div>

                      {/* Additional Requirements */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Type className="w-4 h-4 text-sky-500" />
                          További Követelmények (Opcionális)
                        </label>
                        <textarea
                          {...register("additionalRequirements")}
                          placeholder="Bármilyen egyéb követelmény vagy specifikáció..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm resize-none"
                          rows={2}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isGenerating}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-sky-500 text-bg-base font-bold rounded-xl hover:bg-violet-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generálás folyamatban...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Poszter Generálása
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* Output Section */}
                  <div className="space-y-6">
                    {generatedOutput ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        <PosterConcept concept={generatedOutput.posterConcept} />

                        <PrintSpecs
                          specifications={generatedOutput.specifications}
                          delay={0.1}
                        />

                        <ColorPalette
                          colorPalette={generatedOutput.colorPalette}
                          delay={0.2}
                        />

                        <Typography
                          typography={generatedOutput.typography}
                          delay={0.3}
                        />

                        <PosterLayout
                          layout={generatedOutput.layout}
                          delay={0.4}
                        />

                        <Copywriting
                          copywriting={generatedOutput.copywriting}
                          copiedStates={copiedStates}
                          onCopy={copyToClipboard}
                          delay={0.5}
                        />

                        <MidjourneyPrompts
                          prompts={generatedOutput.midjourneyPrompts}
                          copiedStates={copiedStates}
                          onCopy={copyToClipboard}
                          delay={0.6}
                        />

                        <PrintGuidelines
                          guidelines={generatedOutput.printGuidelines}
                          delay={0.7}
                        />

                        <ExportFormats
                          formats={generatedOutput.exportFormats}
                          delay={0.8}
                        />

                        <PosterVariations
                          variations={generatedOutput.variations}
                          delay={0.9}
                        />
                      </motion.div>
                    ) : (
                      <div className="bg-bg-elevated/30 backdrop-blur-xl border border-bg-elevated/80 rounded-2xl p-12 flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                          <Layout className="w-8 h-8 text-sky-500" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-white">
                            Várakozás a generálásra
                          </h3>
                          <p className="text-sm text-slate-400">
                            Töltsd ki az űrlapot a bal oldalon, és kattints a
                            &ldquo;Poszter Generálása&rdquo; gombra.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </main>
            </>
          )}
        </>
      )}
    </div>
  );
}
