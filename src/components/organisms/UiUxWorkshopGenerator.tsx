"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import {
  Sparkles,
  Loader2,
  ArrowLeft,
  Layout,
  Target,
  Users,
  Palette,
  Layers,
  Smartphone,
  Monitor,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { addUiUxWorkshopAction } from "@/actions/uiux-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  UiUxWorkshopInput,
  UiUxWorkshopOutput,
} from "@/types/uiux-workshop";

const uiuxFormSchema = z.object({
  projectType: z.enum([
    "landing-page",
    "dashboard",
    "ecommerce",
    "mobile-app",
    "portfolio",
    "saas",
    "blog",
  ]),
  primaryGoal: z.enum([
    "conversions",
    "user-engagement",
    "brand-awareness",
    "lead-generation",
    "productivity",
  ]),
  targetAudience: z.string().min(5, "Célközönség minimum 5 karakter"),
  keyFeatures: z.string().min(5, "Funkciók minimum 5 karakter"),
  designStyle: z.enum([
    "minimalist",
    "modern",
    "corporate",
    "playful",
    "luxury",
    "tech-focused",
  ]),
  colorPreference: z.enum(["dark", "light", "mixed"]),
  additionalRequirements: z.string().optional(),
});

type UiUxFormValues = z.infer<typeof uiuxFormSchema>;

export default function UiUxWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<UiUxWorkshopOutput | null>(null);
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
  } = useForm<UiUxFormValues>({
    resolver: zodResolver(uiuxFormSchema),
    defaultValues: {
      projectType: "landing-page",
      primaryGoal: "conversions",
      designStyle: "modern",
      colorPreference: "dark",
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

  const onSubmit = async (data: UiUxFormValues) => {
    // Check access
    if (!isAdmin && !allowedTools.includes("uiux_workshop_ai_muhely")) {
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
      const input: UiUxWorkshopInput = {
        projectType: data.projectType,
        primaryGoal: data.primaryGoal,
        targetAudience: data.targetAudience,
        keyFeatures: data.keyFeatures,
        designStyle: data.designStyle,
        colorPreference: data.colorPreference,
        additionalRequirements: data.additionalRequirements,
      };

      const result = await addUiUxWorkshopAction(idToken, input);

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
                      <Layout className="w-5 h-5 text-bg-base" />
                    </Link>
                    <div>
                      <span className="text-xs uppercase font-black tracking-widest text-amber-500 block">
                        WebDude AI Studio
                      </span>
                      <span className="text-sm font-bold text-white block -mt-0.5">
                        UI/UX AI Műhely
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
                        UI/UX Generátor
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none font-mono">
                        Wireframe & Layout
                      </h1>
                      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Generálj professzionális UI/UX terveket Norbi 16+ éves
                        felhasználói élmény és webfejlesztési szakértelmével.
                        Wireframe, szekció-elrendezés és Figma prompt generálás.
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
                      {/* Project Type */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Monitor className="w-4 h-4 text-amber-500" />
                          Projekt Típus
                        </label>
                        <select
                          {...register("projectType")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white transition-all text-sm"
                        >
                          <option value="landing-page">Landing oldal</option>
                          <option value="dashboard">Dashboard</option>
                          <option value="ecommerce">E-kereskedelem</option>
                          <option value="mobile-app">Mobil alkalmazás</option>
                          <option value="portfolio">Portfólió</option>
                          <option value="saas">SaaS alkalmazás</option>
                          <option value="blog">Blog platform</option>
                        </select>
                      </div>

                      {/* Primary Goal */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Target className="w-4 h-4 text-amber-500" />
                          Elsődleges Cél
                        </label>
                        <select
                          {...register("primaryGoal")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white transition-all text-sm"
                        >
                          <option value="conversions">Konverzió</option>
                          <option value="user-engagement">
                            Felhasználói elköteleződés
                          </option>
                          <option value="brand-awareness">
                            Márka tudatosság
                          </option>
                          <option value="lead-generation">
                            Lead generálás
                          </option>
                          <option value="productivity">Termelékenység</option>
                        </select>
                      </div>

                      {/* Target Audience */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Users className="w-4 h-4 text-amber-500" />
                          Célközönség
                        </label>
                        <input
                          {...register("targetAudience")}
                          placeholder="Kis- és középvállalkozások, startupok"
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white placeholder-slate-500 transition-all text-sm"
                        />
                        {errors.targetAudience && (
                          <p className="text-red-400 text-xs font-mono">
                            {errors.targetAudience.message}
                          </p>
                        )}
                      </div>

                      {/* Key Features */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Zap className="w-4 h-4 text-amber-500" />
                          Kulcs Funkciók
                        </label>
                        <textarea
                          {...register("keyFeatures")}
                          rows={3}
                          placeholder="Pl. Termék bemutatás, árazás, kapcsolatfelvétel..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white placeholder-slate-500 transition-all text-sm resize-none"
                        />
                        {errors.keyFeatures && (
                          <p className="text-red-400 text-xs font-mono">
                            {errors.keyFeatures.message}
                          </p>
                        )}
                      </div>

                      {/* Design Style */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Palette className="w-4 h-4 text-amber-500" />
                          Dizájn Stílus
                        </label>
                        <select
                          {...register("designStyle")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white transition-all text-sm"
                        >
                          <option value="minimalist">Minimalista</option>
                          <option value="modern">Modern</option>
                          <option value="corporate">Vállalati</option>
                          <option value="playful">Játékos</option>
                          <option value="luxury">Luxus</option>
                          <option value="tech-focused">
                            Technológia fókuszú
                          </option>
                        </select>
                      </div>

                      {/* Color Preference */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Layers className="w-4 h-4 text-amber-500" />
                          Szín Preferencia
                        </label>
                        <select
                          {...register("colorPreference")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white transition-all text-sm"
                        >
                          <option value="dark">Sötét</option>
                          <option value="light">Világos</option>
                          <option value="mixed">Vegyes</option>
                        </select>
                      </div>

                      {/* Additional Requirements */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Smartphone className="w-4 h-4 text-amber-500" />
                          További Követelmények (opcionális)
                        </label>
                        <textarea
                          {...register("additionalRequirements")}
                          rows={3}
                          placeholder="Pl. Fókusz a mobil optimalizációra, Cyber-Gold identitás..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white placeholder-slate-500 transition-all text-sm resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isGenerating}
                        className="w-full px-6 py-4 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 text-bg-base font-bold text-sm uppercase tracking-wider hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generálás folyamatban...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            UI/UX Terv Generálása
                          </>
                        )}
                      </motion.button>
                    </form>
                  </div>

                  {/* Output Section */}
                  <div className="space-y-6">
                    {!generatedOutput && (
                      <div className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center min-h-100">
                        <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                          <Layout className="w-8 h-8 text-amber-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          UI/UX Terv
                        </h3>
                        <p className="text-sm text-slate-400 text-center max-w-md">
                          Töltsd ki az űrlapot a bal oldalon, és kattints a
                          &ldquo;UI/UX Terv Generálása&rdquo; gombra.
                        </p>
                      </div>
                    )}

                    {generatedOutput && (
                      <div className="space-y-4">
                        {/* Design Strategy */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Target className="w-4 h-4 text-amber-500" />
                              Dizájn Stratégia
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Felhasználói Út
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.designStrategy.userJourney}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Információs Architektúra
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.designStrategy.informationArchitecture.map(
                                  (item, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {item}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Kulcs Felhasználói Folyamatok
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.designStrategy.keyUserFlows.map(
                                  (flow, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {flow}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </motion.div>

                        {/* Wireframe Structure */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layout className="w-4 h-4 text-amber-500" />
                            Wireframe Struktúra
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Elrendezés
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.wireframeStructure.layout}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Távolság
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.wireframeStructure.spacing}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Szekciók
                              </p>
                              <ul className="space-y-2">
                                {generatedOutput.wireframeStructure.sections.map(
                                  (section, index) => (
                                    <li
                                      key={index}
                                      className="bg-bg-base/50 rounded-lg p-3 border border-gray-800"
                                    >
                                      <p className="text-xs text-white font-medium mb-1">
                                        {section.name}
                                      </p>
                                      <p className="text-xs text-slate-400">
                                        {section.purpose}
                                      </p>
                                      <p className="text-xs text-amber-400 mt-1">
                                        Prioritás: {section.priority}
                                      </p>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </motion.div>

                        {/* Component Library */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-4 h-4 text-amber-500" />
                            Komponens Könyvtár
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Elsődleges Komponensek
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.componentLibrary.primaryComponents.map(
                                  (component, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono"
                                    >
                                      {component}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Másodlagos Komponensek
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.componentLibrary.secondaryComponents.map(
                                  (component, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono"
                                    >
                                      {component}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Interaktív Elemek
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.componentLibrary.interactiveElements.map(
                                  (element, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono"
                                    >
                                      {element}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Figma Prompts */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Palette className="w-4 h-4 text-amber-500" />
                            Figma Promptok
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-bg-base/50 rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Fő Wireframe
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.figmaPrompts.mainWireframe}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Hero Szekció
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.figmaPrompts.heroSection}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Funkció Szekció
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.figmaPrompts.featureSection}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                CTA Szekció
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.figmaPrompts.callToAction}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Design System */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-4 h-4 text-amber-500" />
                            Dizájn Rendszer
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Szín Paletta
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.designSystem.colorPalette.map(
                                  (color, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono"
                                    >
                                      {color}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Tipográfia
                              </p>
                              <div className="grid grid-cols-3 gap-2">
                                <div>
                                  <p className="text-xs text-slate-400 mb-1">
                                    Címsorok
                                  </p>
                                  <p className="text-xs text-white font-mono">
                                    {
                                      generatedOutput.designSystem.typography
                                        .headings
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-400 mb-1">
                                    Törzs
                                  </p>
                                  <p className="text-xs text-white font-mono">
                                    {
                                      generatedOutput.designSystem.typography
                                        .body
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-400 mb-1">
                                    Akkent
                                  </p>
                                  <p className="text-xs text-white font-mono">
                                    {
                                      generatedOutput.designSystem.typography
                                        .accent
                                    }
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* UX Recommendations */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Shield className="w-4 h-4 text-amber-500" />
                            UX Javaslatok
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Akadálymentesítés
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.uxRecommendations.accessibility.map(
                                  (item, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {item}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Teljesítmény
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.uxRecommendations.performance.map(
                                  (item, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {item}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Mobil Optimalizáció
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.uxRecommendations.mobileOptimization.map(
                                  (item, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {item}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </motion.div>

                        {/* Conversion Optimization */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-amber-500" />
                            Konverzió Optimalizálás
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                CTA Elhelyezés
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.conversionOptimization.ctaPlacement.map(
                                  (item, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {item}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Bizalmi Jelek
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.conversionOptimization.trustSignals.map(
                                  (item, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {item}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Társadalmi Bizonyíték
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.conversionOptimization.socialProof.map(
                                  (item, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {item}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
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
