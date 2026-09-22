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
  Building2,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { addCipGenerationAction } from "@/actions/cip-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type { CipWorkshopInput, CipWorkshopOutput } from "@/types/cip-workshop";

const cipFormSchema = z.object({
  companyName: z.string().min(2, "Cégnév minimum 2 karakter"),
  industry: z.string().min(5, "Iparág minimum 5 karakter"),
  targetAudience: z.string().min(10, "Célközönség minimum 10 karakter"),
  brandPersonality: z.string().min(10, "Márka személyiség minimum 10 karakter"),
  cipElement: z.enum([
    "business-card",
    "letterhead",
    "brand-guidelines",
    "envelope",
    "folder",
    "complete-package",
  ]),
  designStyle: z.enum([
    "minimalist",
    "corporate",
    "modern",
    "classic",
    "tech",
    "creative",
    "luxury",
  ]),
  brandColors: z.array(z.string()).optional(),
  requiredElements: z.object({
    logo: z.string().optional(),
    tagline: z.string().optional(),
    contactInfo: z.string().optional(),
    address: z.string().optional(),
  }),
  additionalRequirements: z.string().optional(),
});

type CipFormValues = z.infer<typeof cipFormSchema>;

export default function CipWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<CipWorkshopOutput | null>(null);
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
  } = useForm<CipFormValues>({
    resolver: zodResolver(cipFormSchema),
    defaultValues: {
      cipElement: "business-card",
      designStyle: "corporate",
      brandColors: [],
      requiredElements: {
        logo: "",
        tagline: "",
        contactInfo: "",
        address: "",
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

  const onSubmit = async (data: CipFormValues) => {
    // Check access
    if (!isAdmin && !allowedTools.includes("cip_ai_muhely")) {
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
      const input: CipWorkshopInput = {
        companyName: data.companyName,
        industry: data.industry,
        targetAudience: data.targetAudience,
        brandPersonality: data.brandPersonality,
        cipElement: data.cipElement,
        designStyle: data.designStyle,
        brandColors: data.brandColors,
        requiredElements: data.requiredElements,
        additionalRequirements: data.additionalRequirements,
      };

      const result = await addCipGenerationAction(idToken, input);

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
                        CIP AI Műhely
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
                        CIP Generátor
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none font-mono">
                        Vállalati Arculat
                      </h1>
                      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Generálj professzionális vállalati arculati elemeket
                        Norbi 26 éves grafikai és arculattervező szakértelmével.
                        Névjegykártya, levélpapír, arculati kézikönyv nyomdai
                        kész specifikációkkal.
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
                      {/* Company Name */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Building2 className="w-4 h-4 text-sky-500" />
                          Cégnév
                        </label>
                        <input
                          {...register("companyName")}
                          placeholder="Példa: WebDude Kft."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm"
                        />
                        {errors.companyName && (
                          <p className="text-red-400 text-xs">
                            {errors.companyName.message}
                          </p>
                        )}
                      </div>

                      {/* Industry */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Target className="w-4 h-4 text-sky-500" />
                          Iparág
                        </label>
                        <input
                          {...register("industry")}
                          placeholder="Példa: Webfejlesztés, Grafikai Design, IT tanácsadás..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm"
                        />
                        {errors.industry && (
                          <p className="text-red-400 text-xs">
                            {errors.industry.message}
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
                          placeholder="Példa: 25-45 éves vállalkozók, kis- és középvállalkozások..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm resize-none"
                          rows={3}
                        />
                        {errors.targetAudience && (
                          <p className="text-red-400 text-xs">
                            {errors.targetAudience.message}
                          </p>
                        )}
                      </div>

                      {/* Brand Personality */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Palette className="w-4 h-4 text-sky-500" />
                          Márka Személyiség
                        </label>
                        <textarea
                          {...register("brandPersonality")}
                          placeholder="Példa: Innovatív, megbízható, prémium, barátságos..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm resize-none"
                          rows={3}
                        />
                        {errors.brandPersonality && (
                          <p className="text-red-400 text-xs">
                            {errors.brandPersonality.message}
                          </p>
                        )}
                      </div>

                      {/* CIP Element */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Layout className="w-4 h-4 text-sky-500" />
                          Arculati Elem
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: "business-card", label: "Névjegykártya" },
                            { value: "letterhead", label: "Levélpapír" },
                            {
                              value: "brand-guidelines",
                              label: "Arculati Kézikönyv",
                            },
                            { value: "envelope", label: "Boríték" },
                            { value: "folder", label: "Dosszié" },
                            {
                              value: "complete-package",
                              label: "Teljes Csomag",
                            },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="relative cursor-pointer"
                            >
                              <input
                                {...register("cipElement")}
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
                        {errors.cipElement && (
                          <p className="text-red-400 text-xs">
                            {errors.cipElement.message}
                          </p>
                        )}
                      </div>

                      {/* Design Style */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Palette className="w-4 h-4 text-sky-500" />
                          Dizájn Stílus
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { value: "minimalist", label: "Minimalista" },
                            { value: "corporate", label: "Vállalati" },
                            { value: "modern", label: "Modern" },
                            { value: "classic", label: "Klasszikus" },
                            { value: "tech", label: "Tech" },
                            { value: "creative", label: "Kreatív" },
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
                              <div className="px-3 py-2 rounded-xl bg-bg-elevated/50 border border-bg-elevated peer-checked:border-sky-500/50 peer-checked:bg-sky-500/10 text-center transition-all">
                                <span className="text-xs font-bold text-slate-300 peer-checked:text-sky-500">
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
                          <Palette className="w-4 h-4 text-sky-500" />
                          Brand Színek (Opcionális)
                        </label>
                        <input
                          {...register("brandColors")}
                          placeholder="Példa: #00B5F1, #020617, #e2e8f0 (vesszővel elválasztva)"
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm"
                        />
                      </div>

                      {/* Required Elements */}
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Type className="w-4 h-4 text-sky-500" />
                          Kötelező Elemek (Opcionális)
                        </label>
                        <div className="space-y-3">
                          <input
                            {...register("requiredElements.logo")}
                            placeholder="Logo leírás (opcionális)"
                            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm"
                          />
                          <input
                            {...register("requiredElements.tagline")}
                            placeholder="Slogan/Tagline (opcionális)"
                            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm"
                          />
                          <input
                            {...register("requiredElements.contactInfo")}
                            placeholder="Kapcsolat információ (opcionális)"
                            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm"
                          />
                          <input
                            {...register("requiredElements.address")}
                            placeholder="Cím (opcionális)"
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
                            CIP Generálása
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
                        {/* Brand Identity */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-sky-500" />
                            Márka Identitás
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Stílus
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.brandIdentity.style}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Leírás
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.brandIdentity.description}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Kulcselemek
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.brandIdentity.keyElements.map(
                                  (element, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs"
                                    >
                                      {element}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Specifications */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Target className="w-4 h-4 text-sky-500" />
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
                                Bleed
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.specifications.bleed}
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
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Nyomdai Specifikációk
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.specifications.printSpecs}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Color Palette */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Palette className="w-4 h-4 text-sky-500" />
                            Szín Paletta (CMYK)
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
                              <p className="text-xs font-mono text-sky-400">
                                {
                                  generatedOutput.colorPalette.cmykValues
                                    .primary
                                }
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
                              <p className="text-xs font-mono text-sky-400">
                                {
                                  generatedOutput.colorPalette.cmykValues
                                    .secondary
                                }
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
                              <p className="text-xs font-mono text-sky-400">
                                {generatedOutput.colorPalette.cmykValues.accent}
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
                          transition={{ delay: 0.3 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Type className="w-4 h-4 text-sky-500" />
                            Tipográfia
                          </h3>
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs text-slate-400 mb-1">
                                  Logo Font
                                </p>
                                <p className="text-sm text-white">
                                  {generatedOutput.typography.logoFont}
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
                                  <p className="text-slate-400">Logo</p>
                                  <p className="text-white">
                                    {generatedOutput.typography.fontSizes.logo}
                                  </p>
                                </div>
                                <div className="bg-bg-base/50 rounded-lg p-2 border border-gray-800">
                                  <p className="text-slate-400">Főcím</p>
                                  <p className="text-white">
                                    {
                                      generatedOutput.typography.fontSizes
                                        .headline
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
                          transition={{ delay: 0.4 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layout className="w-4 h-4 text-sky-500" />
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

                        {/* Business Card */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-sky-500" />
                            Névjegykártya
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Előlap Elrendezés
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.businessCard.frontLayout}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Hátlap Elrendezés
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.businessCard.backLayout}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Kapcsolat Elhelyezés
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.businessCard.contactPlacement}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Logo Pozíció
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.businessCard.logoPosition}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Letterhead */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Type className="w-4 h-4 text-sky-500" />
                            Levélpapír
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Fejléc Elrendezés
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.letterhead.headerLayout}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Lábléc Elrendezés
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.letterhead.footerLayout}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Szövegtörzs Elrendezés
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.letterhead.bodyLayout}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Logo Pozíció
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.letterhead.logoPosition}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Brand Guidelines */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Target className="w-4 h-4 text-sky-500" />
                            Arculati Irányelvek
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Logo Használat
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.brandGuidelines.logoUsage}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Szín Használat
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.brandGuidelines.colorUsage}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Tipográfia Használat
                              </p>
                              <p className="text-sm text-white">
                                {
                                  generatedOutput.brandGuidelines
                                    .typographyUsage
                                }
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

                        {/* Midjourney Prompts */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
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
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors"
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
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors"
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
                            <Layers className="w-4 h-4 text-sky-500" />
                            Export Formátumok
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Print
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.print}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">Web</p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.web}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Vector
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.vector}
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
                            <Layers className="w-4 h-4 text-sky-500" />
                            Változatok
                          </h3>
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
                                <Target className="w-3 h-3 text-sky-500" />
                                <p className="text-xs text-slate-400">
                                  Grayscale
                                </p>
                              </div>
                              <p className="text-xs text-white leading-relaxed">
                                {generatedOutput.variations.grayscale}
                              </p>
                            </div>
                          </div>
                        </motion.div>
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
                            &ldquo;CIP Generálása&rdquo; gombra.
                          </p>
                        </div>
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
