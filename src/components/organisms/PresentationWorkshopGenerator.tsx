"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import {
  Layout,
  Copy,
  Check,
  Sparkles,
  Loader2,
  ArrowLeft,
  Palette,
  Type,
  Layers,
  Target,
  Sun,
  Moon,
  Presentation,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { addPresentationGenerationAction } from "@/actions/presentation-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  PresentationInput,
  PresentationOutput,
} from "@/types/presentation-workshop";

const presentationFormSchema = z.object({
  presentationPurpose: z
    .string()
    .min(10, "Prezentáció célja minimum 10 karakter"),
  targetAudience: z.string().min(10, "Célközönség minimum 10 karakter"),
  presentationType: z.enum([
    "pitch-deck",
    "sales-presentation",
    "investor-deck",
    "product-launch",
    "training",
    "conference",
  ]),
  slideCount: z.number().min(5, "Minimum 5 dia").max(50, "Maximum 50 dia"),
  designStyle: z.enum([
    "minimalist",
    "corporate",
    "modern",
    "creative",
    "tech",
    "luxury",
  ]),
  brandColors: z.array(z.string()).optional(),
  requiredContent: z.object({
    keyPoints: z.array(z.string()).optional(),
    dataPoints: z.array(z.string()).optional(),
    testimonials: z.array(z.string()).optional(),
  }),
  additionalRequirements: z.string().optional(),
});

type PresentationFormValues = z.infer<typeof presentationFormSchema>;

export default function PresentationWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<PresentationOutput | null>(null);
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
  } = useForm<PresentationFormValues>({
    resolver: zodResolver(presentationFormSchema),
    defaultValues: {
      presentationType: "pitch-deck",
      slideCount: 12,
      designStyle: "corporate",
      brandColors: [],
      requiredContent: {
        keyPoints: [],
        dataPoints: [],
        testimonials: [],
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

  const onSubmit = async (data: PresentationFormValues) => {
    // Check access
    if (!isAdmin && !allowedTools.includes("presentation_ai_muhely")) {
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
      const input: PresentationInput = {
        presentationPurpose: data.presentationPurpose,
        targetAudience: data.targetAudience,
        presentationType: data.presentationType,
        slideCount: data.slideCount,
        designStyle: data.designStyle,
        brandColors: data.brandColors,
        requiredContent: data.requiredContent,
        additionalRequirements: data.additionalRequirements,
      };

      const result = await addPresentationGenerationAction(idToken, input);

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
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
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
                className="px-6 py-3 rounded-xl bg-amber-500 text-bg-base font-bold hover:bg-amber-600 transition-colors"
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
                      className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/10 cursor-pointer"
                    >
                      <Layers className="w-5 h-5 text-bg-base" />
                    </Link>
                    <div>
                      <span className="text-xs uppercase font-black tracking-widest text-amber-500 block">
                        WebDude AI Studio
                      </span>
                      <span className="text-sm font-bold text-white block -mt-0.5">
                        Presentation AI Műhely
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/portal/ai-muhely"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-800 hover:border-amber-500/30 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
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
                      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
                      <span className="text-xs font-mono font-black uppercase tracking-widest text-amber-500">
                        Presentation Generátor
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none font-mono">
                        Pitch Deck & Prezentáció
                      </h1>
                      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Generálj professzionális prezentációkat Norbi 26 éves
                        grafikai és prezentációtervező szakértelmével. Pitch
                        deck, sales prezentáció, investor deck narratív
                        struktúrával.
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
                      {/* Presentation Purpose */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Target className="w-4 h-4 text-amber-500" />
                          Prezentáció Célja
                        </label>
                        <textarea
                          {...register("presentationPurpose")}
                          placeholder="Példa: Befektetés szerzés, termék bemutatása, partneri kapcsolat építés..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all text-sm resize-none"
                          rows={3}
                        />
                        {errors.presentationPurpose && (
                          <p className="text-red-400 text-xs">
                            {errors.presentationPurpose.message}
                          </p>
                        )}
                      </div>

                      {/* Target Audience */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Type className="w-4 h-4 text-amber-500" />
                          Célközönség
                        </label>
                        <textarea
                          {...register("targetAudience")}
                          placeholder="Példa: Befektetők, potenciális ügyfelek, partnerek..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all text-sm resize-none"
                          rows={3}
                        />
                        {errors.targetAudience && (
                          <p className="text-red-400 text-xs">
                            {errors.targetAudience.message}
                          </p>
                        )}
                      </div>

                      {/* Presentation Type */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Presentation className="w-4 h-4 text-amber-500" />
                          Prezentáció Típus
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: "pitch-deck", label: "Pitch Deck" },
                            { value: "sales-presentation", label: "Sales" },
                            { value: "investor-deck", label: "Investor Deck" },
                            { value: "product-launch", label: "Termék Launch" },
                            { value: "training", label: "Képzés" },
                            { value: "conference", label: "Konferencia" },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="relative cursor-pointer"
                            >
                              <input
                                {...register("presentationType")}
                                type="radio"
                                value={option.value}
                                className="sr-only peer"
                              />
                              <div className="px-3 py-2 rounded-xl bg-bg-elevated/50 border border-bg-elevated peer-checked:border-amber-500/50 peer-checked:bg-amber-500/10 text-center transition-all">
                                <span className="text-xs font-bold text-slate-300 peer-checked:text-amber-500">
                                  {option.label}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.presentationType && (
                          <p className="text-red-400 text-xs">
                            {errors.presentationType.message}
                          </p>
                        )}
                      </div>

                      {/* Slide Count */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Layout className="w-4 h-4 text-amber-500" />
                          Dia Szám
                        </label>
                        <input
                          {...register("slideCount", { valueAsNumber: true })}
                          type="number"
                          min={5}
                          max={50}
                          placeholder="12"
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all text-sm"
                        />
                        {errors.slideCount && (
                          <p className="text-red-400 text-xs">
                            {errors.slideCount.message}
                          </p>
                        )}
                      </div>

                      {/* Design Style */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Palette className="w-4 h-4 text-amber-500" />
                          Dizájn Stílus
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: "minimalist", label: "Minimalista" },
                            { value: "corporate", label: "Vállalati" },
                            { value: "modern", label: "Modern" },
                            { value: "creative", label: "Kreatív" },
                            { value: "tech", label: "Tech" },
                            { value: "luxury", label: "Luxus" },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="relative cursor-pointer"
                            >
                              <input
                                {...register("designStyle")}
                                type="radio"
                                value={option.value}
                                className="sr-only peer"
                              />
                              <div className="px-3 py-2 rounded-xl bg-bg-elevated/50 border border-bg-elevated peer-checked:border-amber-500/50 peer-checked:bg-amber-500/10 text-center transition-all">
                                <span className="text-xs font-bold text-slate-300 peer-checked:text-amber-500">
                                  {option.label}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.designStyle && (
                          <p className="text-red-400 text-xs">
                            {errors.designStyle.message}
                          </p>
                        )}
                      </div>

                      {/* Brand Colors */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Palette className="w-4 h-4 text-amber-500" />
                          Brand Színek (Opcionális)
                        </label>
                        <input
                          {...register("brandColors")}
                          placeholder="Példa: #f59e0b, #020617, #e2e8f0 (vesszővel elválasztva)"
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all text-sm"
                        />
                      </div>

                      {/* Required Content */}
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Type className="w-4 h-4 text-amber-500" />
                          Kötelező Tartalom (Opcionális)
                        </label>
                        <div className="space-y-3">
                          <input
                            {...register("requiredContent.keyPoints")}
                            placeholder="Kulcspontok (vesszővel elválasztva)"
                            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all text-sm"
                          />
                          <input
                            {...register("requiredContent.dataPoints")}
                            placeholder="Adatok (vesszővel elválasztva)"
                            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all text-sm"
                          />
                          <input
                            {...register("requiredContent.testimonials")}
                            placeholder="Visszajelések (vesszővel elválasztva)"
                            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all text-sm"
                          />
                        </div>
                      </div>

                      {/* Additional Requirements */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Type className="w-4 h-4 text-amber-500" />
                          További Követelmények (Opcionális)
                        </label>
                        <textarea
                          {...register("additionalRequirements")}
                          placeholder="Bármilyen egyéb követelmény vagy specifikáció..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all text-sm resize-none"
                          rows={2}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isGenerating}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-bg-base font-bold rounded-xl hover:bg-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generálás folyamatban...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Prezentáció Generálása
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
                        {/* Presentation Concept */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Presentation className="w-4 h-4 text-amber-500" />
                            Prezentáció Koncepció
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Stílus
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.presentationConcept.style}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Leírás
                              </p>
                              <p className="text-sm text-white">
                                {
                                  generatedOutput.presentationConcept
                                    .description
                                }
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Kulcselemek
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.presentationConcept.keyElements.map(
                                  (element, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs"
                                    >
                                      {element}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Structure */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layout className="w-4 h-4 text-amber-500" />
                            Struktúra
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Dia Vázlat
                              </p>
                              <div className="space-y-2">
                                {generatedOutput.structure.slideOutline.map(
                                  (slide, index) => (
                                    <div
                                      key={index}
                                      className="bg-bg-base/50 rounded-lg p-2 border border-gray-800"
                                    >
                                      <p className="text-xs text-white">
                                        {index + 1}. {slide}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Narratív Folyamat
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.structure.narrativeFlow}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Tempó
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.structure.pacing}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Specifications */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Target className="w-4 h-4 text-amber-500" />
                            Specifikációk
                          </h3>
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-3">
                              <div className="bg-bg-base/50 rounded-xl p-3 border border-gray-800">
                                <p className="text-xs text-slate-400 mb-1">
                                  Szélesség
                                </p>
                                <p className="text-sm font-bold text-white">
                                  {
                                    generatedOutput.specifications.dimensions
                                      .width
                                  }
                                  px
                                </p>
                              </div>
                              <div className="bg-bg-base/50 rounded-xl p-3 border border-gray-800">
                                <p className="text-xs text-slate-400 mb-1">
                                  Magasság
                                </p>
                                <p className="text-sm font-bold text-white">
                                  {
                                    generatedOutput.specifications.dimensions
                                      .height
                                  }
                                  px
                                </p>
                              </div>
                              <div className="bg-bg-base/50 rounded-xl p-3 border border-gray-800">
                                <p className="text-xs text-slate-400 mb-1">
                                  Formátum
                                </p>
                                <p className="text-sm font-bold text-white">
                                  {
                                    generatedOutput.specifications.dimensions
                                      .format
                                  }
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Méretarány
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.specifications.aspectRatio}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Safe Zone
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.specifications.safeZone}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Color Palette */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Palette className="w-4 h-4 text-amber-500" />
                            Szín Paletta
                          </h3>
                          <div className="grid grid-cols-5 gap-3">
                            <div className="text-center">
                              <div
                                className="w-12 h-12 rounded-lg border border-gray-800 shadow-lg mx-auto mb-2"
                                style={{
                                  backgroundColor:
                                    generatedOutput.colorPalette.primary,
                                }}
                              />
                              <p className="text-xs text-slate-400">Primary</p>
                              <p className="text-xs font-mono text-white">
                                {generatedOutput.colorPalette.primary}
                              </p>
                            </div>
                            <div className="text-center">
                              <div
                                className="w-12 h-12 rounded-lg border border-gray-800 shadow-lg mx-auto mb-2"
                                style={{
                                  backgroundColor:
                                    generatedOutput.colorPalette.secondary,
                                }}
                              />
                              <p className="text-xs text-slate-400">
                                Secondary
                              </p>
                              <p className="text-xs font-mono text-white">
                                {generatedOutput.colorPalette.secondary}
                              </p>
                            </div>
                            <div className="text-center">
                              <div
                                className="w-12 h-12 rounded-lg border border-gray-800 shadow-lg mx-auto mb-2"
                                style={{
                                  backgroundColor:
                                    generatedOutput.colorPalette.accent,
                                }}
                              />
                              <p className="text-xs text-slate-400">Accent</p>
                              <p className="text-xs font-mono text-white">
                                {generatedOutput.colorPalette.accent}
                              </p>
                            </div>
                            <div className="text-center">
                              <div
                                className="w-12 h-12 rounded-lg border border-gray-800 shadow-lg mx-auto mb-2"
                                style={{
                                  backgroundColor:
                                    generatedOutput.colorPalette.background,
                                }}
                              />
                              <p className="text-xs text-slate-400">
                                Background
                              </p>
                              <p className="text-xs font-mono text-white">
                                {generatedOutput.colorPalette.background}
                              </p>
                            </div>
                            <div className="text-center">
                              <div
                                className="w-12 h-12 rounded-lg border border-gray-800 shadow-lg mx-auto mb-2"
                                style={{
                                  backgroundColor:
                                    generatedOutput.colorPalette.text,
                                }}
                              />
                              <p className="text-xs text-slate-400">Text</p>
                              <p className="text-xs font-mono text-white">
                                {generatedOutput.colorPalette.text}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 mb-1">
                              Indoklás
                            </p>
                            <p className="text-xs text-white">
                              {generatedOutput.colorPalette.rationale}
                            </p>
                          </div>
                        </motion.div>

                        {/* Typography */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Type className="w-4 h-4 text-amber-500" />
                            Tipográfia
                          </h3>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs text-slate-400 mb-1">
                                  Cím Font
                                </p>
                                <p className="text-sm text-white">
                                  {generatedOutput.typography.titleFont}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400 mb-1">
                                  Szövegtörzs Font
                                </p>
                                <p className="text-sm text-white">
                                  {generatedOutput.typography.bodyFont}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Font Méretek
                              </p>
                              <div className="grid grid-cols-4 gap-2 text-xs">
                                <div className="bg-bg-base/50 rounded-lg p-2 border border-gray-800">
                                  <p className="text-slate-400">Cím</p>
                                  <p className="text-white">
                                    {generatedOutput.typography.fontSizes.title}
                                  </p>
                                </div>
                                <div className="bg-bg-base/50 rounded-lg p-2 border border-gray-800">
                                  <p className="text-slate-400">Alcím</p>
                                  <p className="text-white">
                                    {
                                      generatedOutput.typography.fontSizes
                                        .subtitle
                                    }
                                  </p>
                                </div>
                                <div className="bg-bg-base/50 rounded-lg p-2 border border-gray-800">
                                  <p className="text-slate-400">Szöveg</p>
                                  <p className="text-white">
                                    {generatedOutput.typography.fontSizes.body}
                                  </p>
                                </div>
                                <div className="bg-bg-base/50 rounded-lg p-2 border border-gray-800">
                                  <p className="text-slate-400">Caption</p>
                                  <p className="text-white">
                                    {
                                      generatedOutput.typography.fontSizes
                                        .caption
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Layout */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layout className="w-4 h-4 text-amber-500" />
                            Elrendezés
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Grid Rendszer
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.layout.gridSystem}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Vizuális Hierarchia
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.layout.visualHierarchy}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Elem Elhelyezés
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.layout.elementPlacement}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Whitespace
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.layout.whitespace}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Slide Templates */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Presentation className="w-4 h-4 text-amber-500" />
                            Dia Sablonok
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Cím Dia
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.slideTemplates.titleSlide}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Tartalom Dia
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.slideTemplates.contentSlide}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Adat Dia
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.slideTemplates.dataSlide}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Záró Dia
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.slideTemplates.closingSlide}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Content Guidelines */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Target className="w-4 h-4 text-amber-500" />
                            Tartalom Irányelvek
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Szöveg Sűrűség
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.contentGuidelines.textDensity}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Vizuális Arány
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.contentGuidelines.visualRatio}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Animáció Szint
                              </p>
                              <p className="text-sm text-white">
                                {
                                  generatedOutput.contentGuidelines
                                    .animationLevel
                                }
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Ne Tedd
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.contentGuidelines.doNot.map(
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

                        {/* Midjourney Prompts */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-500" />
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
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono hover:bg-amber-500/20 transition-colors"
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
                                  Alternative 1
                                </p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.midjourneyPrompts
                                        .alternative1,
                                      "mj-alt1"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono hover:bg-amber-500/20 transition-colors"
                                >
                                  {copiedStates["mj-alt1"] ? (
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
                                {generatedOutput.midjourneyPrompts.alternative1}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-400">
                                  Alternative 2
                                </p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.midjourneyPrompts
                                        .alternative2,
                                      "mj-alt2"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono hover:bg-amber-500/20 transition-colors"
                                >
                                  {copiedStates["mj-alt2"] ? (
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
                                {generatedOutput.midjourneyPrompts.alternative2}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Export Formats */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.9 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-4 h-4 text-amber-500" />
                            Export Formátumok
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Prezentáció
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.presentation}
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
                                Képek
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.images}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Variations */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.0 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-4 h-4 text-amber-500" />
                            Változatok
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <div className="flex items-center gap-2 mb-2">
                                <Sun className="w-3 h-3 text-amber-500" />
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
                                <Moon className="w-3 h-3 text-amber-500" />
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
                                <Target className="w-3 h-3 text-amber-500" />
                                <p className="text-xs text-slate-400">Print</p>
                              </div>
                              <p className="text-xs text-white leading-relaxed">
                                {generatedOutput.variations.print}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <div className="bg-bg-elevated/30 backdrop-blur-xl border border-bg-elevated/80 rounded-2xl p-12 flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                          <Layout className="w-8 h-8 text-amber-500" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-white">
                            Várakozás a generálásra
                          </h3>
                          <p className="text-sm text-slate-400">
                            Töltsd ki az űrlapot a bal oldalon, és kattints a
                            &ldquo;Prezentáció Generálása&rdquo; gombra.
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
