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
  Settings,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { addDesignSystemGenerationAction } from "@/actions/design-system-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  DesignSystemInput,
  DesignSystemOutput,
} from "@/types/design-system-workshop";

const designSystemFormSchema = z.object({
  systemPurpose: z.string().min(10, "Rendszer célja minimum 10 karakter"),
  targetAudience: z.string().min(10, "Célközönség minimum 10 karakter"),
  systemScope: z.enum([
    "full-system",
    "color-palette",
    "typography",
    "component-library",
    "spacing-grid",
  ]),
  designStyle: z.enum([
    "minimalist",
    "corporate",
    "modern",
    "creative",
    "tech",
    "luxury",
  ]),
  brandColors: z.array(z.string()).optional(),
  requiredComponents: z.array(z.string()).optional(),
  additionalRequirements: z.string().optional(),
});

type DesignSystemFormValues = z.infer<typeof designSystemFormSchema>;

export default function DesignSystemWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<DesignSystemOutput | null>(null);
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
  } = useForm<DesignSystemFormValues>({
    resolver: zodResolver(designSystemFormSchema),
    defaultValues: {
      systemScope: "full-system",
      designStyle: "modern",
      brandColors: [],
      requiredComponents: [],
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

  const onSubmit = async (data: DesignSystemFormValues) => {
    // Check access
    if (!isAdmin && !allowedTools.includes("design_system_ai_muhely")) {
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
      const input: DesignSystemInput = {
        systemPurpose: data.systemPurpose,
        targetAudience: data.targetAudience,
        systemScope: data.systemScope,
        designStyle: data.designStyle,
        brandColors: data.brandColors,
        requiredComponents: data.requiredComponents,
        additionalRequirements: data.additionalRequirements,
      };

      const result = await addDesignSystemGenerationAction(idToken, input);

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
                        Design System AI Műhely
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
                        Design System Generátor
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none font-mono">
                        Design Tokens & Komponensek
                      </h1>
                      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Generálj teljes design rendszereket Norbi 26 éves
                        grafikai és design system szakértelmével. Design tokens,
                        komponens könyvtár, Tailwind CSS v4 integráció és Zod
                        validáció.
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
                      {/* System Purpose */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Target className="w-4 h-4 text-amber-500" />
                          Rendszer Célja
                        </label>
                        <textarea
                          {...register("systemPurpose")}
                          placeholder="Példa: Webalkalmazás UI, mobil app, e-commerce platform..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all text-sm resize-none"
                          rows={3}
                        />
                        {errors.systemPurpose && (
                          <p className="text-red-400 text-xs">
                            {errors.systemPurpose.message}
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
                          placeholder="Példa: Fejlesztők, dizájnerek, végfelhasználók..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all text-sm resize-none"
                          rows={3}
                        />
                        {errors.targetAudience && (
                          <p className="text-red-400 text-xs">
                            {errors.targetAudience.message}
                          </p>
                        )}
                      </div>

                      {/* System Scope */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Settings className="w-4 h-4 text-amber-500" />
                          Rendszer Hatókör
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: "full-system", label: "Teljes" },
                            { value: "color-palette", label: "Színek" },
                            { value: "typography", label: "Tipográfia" },
                            {
                              value: "component-library",
                              label: "Komponensek",
                            },
                            { value: "spacing-grid", label: "Spacing" },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="relative cursor-pointer"
                            >
                              <input
                                {...register("systemScope")}
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
                        {errors.systemScope && (
                          <p className="text-red-400 text-xs">
                            {errors.systemScope.message}
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

                      {/* Required Components */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Type className="w-4 h-4 text-amber-500" />
                          Kötelező Komponensek (Opcionális)
                        </label>
                        <input
                          {...register("requiredComponents")}
                          placeholder="Példa: button, input, card, modal (vesszővel elválasztva)"
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all text-sm"
                        />
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
                            Design System Generálása
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
                        {/* System Concept */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Settings className="w-4 h-4 text-amber-500" />
                            Rendszer Koncepció
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Stílus
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.systemConcept.style}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Leírás
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.systemConcept.description}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Kulcselemek
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.systemConcept.keyElements.map(
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

                        {/* Design Tokens */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Palette className="w-4 h-4 text-amber-500" />
                            Design Tokens
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-2">
                                Színek
                              </p>
                              <div className="grid grid-cols-4 gap-2">
                                {Object.entries(
                                  generatedOutput.designTokens.colors
                                ).map(([key, value]) => (
                                  <div key={key} className="text-center">
                                    <div
                                      className="w-10 h-10 rounded-lg border border-gray-800 shadow-lg mx-auto mb-1"
                                      style={{ backgroundColor: value }}
                                    />
                                    <p className="text-xs text-slate-400">
                                      {key}
                                    </p>
                                    <p className="text-xs font-mono text-white">
                                      {value}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-2">
                                Spacing
                              </p>
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                {Object.entries(
                                  generatedOutput.designTokens.spacing
                                ).map(([key, value]) => (
                                  <div
                                    key={key}
                                    className="bg-bg-base/50 rounded-lg p-2 border border-gray-800"
                                  >
                                    <p className="text-slate-400">{key}</p>
                                    <p className="text-white">{value}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-2">
                                Border Radius
                              </p>
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                {Object.entries(
                                  generatedOutput.designTokens.borderRadius
                                ).map(([key, value]) => (
                                  <div
                                    key={key}
                                    className="bg-bg-base/50 rounded-lg p-2 border border-gray-800"
                                  >
                                    <p className="text-slate-400">{key}</p>
                                    <p className="text-white">{value}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Tailwind Config */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Settings className="w-4 h-4 text-amber-500" />
                            Tailwind Config
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-400">
                                  Theme Extension
                                </p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.tailwindConfig
                                        .themeExtension,
                                      "tailwind-theme"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono hover:bg-amber-500/20 transition-colors"
                                >
                                  {copiedStates["tailwind-theme"] ? (
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
                                {generatedOutput.tailwindConfig.themeExtension}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Custom Utilities
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.tailwindConfig.customUtilities.map(
                                  (utility, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs"
                                    >
                                      {utility}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Component Library */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-4 h-4 text-amber-500" />
                            Komponens Könyvtár
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Nevezési Konvenció
                              </p>
                              <p className="text-sm text-white">
                                {
                                  generatedOutput.componentLibrary
                                    .namingConvention
                                }
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Fájl Struktúra
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.componentLibrary.fileStructure}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Komponensek
                              </p>
                              <div className="space-y-2 max-h-48 overflow-y-auto">
                                {generatedOutput.componentLibrary.components.map(
                                  (component, index) => (
                                    <div
                                      key={index}
                                      className="bg-bg-base/50 rounded-lg p-3 border border-gray-800"
                                    >
                                      <p className="text-xs font-bold text-white mb-1">
                                        {component.name}
                                      </p>
                                      <p className="text-xs text-slate-400 mb-1">
                                        {component.description}
                                      </p>
                                      <div className="flex gap-2 mt-2">
                                        <div>
                                          <p className="text-xs text-slate-400">
                                            Props
                                          </p>
                                          <div className="flex flex-wrap gap-1">
                                            {component.props.map((prop, i) => (
                                              <span
                                                key={i}
                                                className="px-1 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs"
                                              >
                                                {prop}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                        <div>
                                          <p className="text-xs text-slate-400">
                                            Variants
                                          </p>
                                          <div className="flex flex-wrap gap-1">
                                            {component.variants.map(
                                              (variant, i) => (
                                                <span
                                                  key={i}
                                                  className="px-1 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-xs"
                                                >
                                                  {variant}
                                                </span>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Documentation */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Target className="w-4 h-4 text-amber-500" />
                            Dokumentáció
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Struktúra
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.documentation.structure}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Példák
                              </p>
                              <div className="space-y-1">
                                {generatedOutput.documentation.examples.map(
                                  (example, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {example}
                                    </li>
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Irányelvek
                              </p>
                              <div className="space-y-1">
                                {generatedOutput.documentation.guidelines.map(
                                  (guideline, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {guideline}
                                    </li>
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Ne Tedd
                              </p>
                              <div className="space-y-1">
                                {generatedOutput.documentation.doNot.map(
                                  (dont, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {dont}
                                    </li>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Midjourney Prompts */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
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
                          transition={{ delay: 0.6 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-4 h-4 text-amber-500" />
                            Export Formátumok
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-400">
                                  Tailwind Config
                                </p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.exportFormats
                                        .tailwindConfig,
                                      "export-tailwind"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono hover:bg-amber-500/20 transition-colors"
                                >
                                  {copiedStates["export-tailwind"] ? (
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
                                {generatedOutput.exportFormats.tailwindConfig}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                CSS Variables
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.cssVariables}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                JSON Tokens
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.jsonTokens}
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
                                <p className="text-xs text-slate-400">
                                  Custom Theme
                                </p>
                              </div>
                              <p className="text-xs text-white leading-relaxed">
                                {generatedOutput.variations.customTheme}
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
                            &ldquo;Design System Generálása&rdquo; gombra.
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
