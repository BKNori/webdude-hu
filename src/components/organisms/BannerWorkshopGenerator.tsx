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
  Monitor,
  Smartphone,
  Square,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { addBannerGenerationAction } from "@/actions/banner-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  BannerWorkshopInput,
  BannerWorkshopOutput,
} from "@/types/banner-workshop";

const bannerFormSchema = z.object({
  campaignGoal: z.string().min(10, "Kampány célja minimum 10 karakter"),
  targetAudience: z.string().min(10, "Célközönség minimum 10 karakter"),
  platform: z.enum([
    "facebook",
    "instagram",
    "twitter",
    "linkedin",
    "youtube",
    "google-ads",
    "web",
    "print",
  ]),
  bannerType: z.enum([
    "hero",
    "story",
    "cover",
    "sidebar",
    "display",
    "social-post",
  ]),
  artDirection: z.enum([
    "minimalist",
    "bold-typography",
    "gradient",
    "photo-based",
    "geometric",
    "glassmorphism",
    "neon-cyberpunk",
  ]),
  aspectRatio: z.enum(["16:9", "1:1", "9:16"]),
  brandColors: z.string().optional(),
  requiredTexts: z.object({
    headline: z.string().optional(),
    subheadline: z.string().optional(),
    cta: z.string().optional(),
  }),
  additionalRequirements: z.string().optional(),
});

type BannerFormValues = z.infer<typeof bannerFormSchema>;

export default function BannerWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<BannerWorkshopOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [allowedTools, setAllowedTools] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

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
    setValue,
    formState: { errors },
  } = useForm<BannerFormValues>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      platform: "facebook",
      bannerType: "hero",
      artDirection: "minimalist",
      aspectRatio: "16:9",
      brandColors: "",
      requiredTexts: {
        headline: "",
        subheadline: "",
        cta: "",
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

  const onSubmit = async (data: BannerFormValues) => {
    // Check access - adminok mindig hozzáférnek
    if (!isAdmin && !allowedTools.includes("banner_ai_muhely")) {
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
      const input: BannerWorkshopInput = {
        campaignGoal: data.campaignGoal,
        targetAudience: data.targetAudience,
        platform: data.platform,
        bannerType: data.bannerType,
        artDirection: data.artDirection,
        aspectRatio: data.aspectRatio,
        brandColors: data.brandColors
          ? data.brandColors
              .split(",")
              .map((c) => c.trim())
              .filter((c) => c.length > 0)
          : [],
        requiredTexts: data.requiredTexts,
        additionalRequirements: data.additionalRequirements,
      };

      const result = await addBannerGenerationAction(idToken, input);

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
                <AlertCircle className="w-5 h-5" />
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
              <header className="border-b border-sky-500/20 bg-slate-950/90 backdrop-blur-xl sticky top-0 z-50">
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
                        Banner AI Műhely
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/portal/ai-muhely"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-sky-500/20 hover:border-sky-500/40 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
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
                        Banner Generátor
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none font-mono">
                        Konverziófókuszú Banner
                      </h1>
                      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Generálj prémium banner koncepciókat Norbi 26 éves
                        grafikai és konverziós látásmódjával. 90% sötét háttér,
                        maximum 2% Cyber-Arany fókusz.
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
                      {/* Campaign Goal */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Target className="w-4 h-4 text-sky-500" />
                          Kampány Célja
                        </label>
                        <textarea
                          {...register("campaignGoal")}
                          placeholder="Példa: Új termék bevezetése, akciós kampány, márkaépítés..."
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-sky-500/20 text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm resize-none"
                          rows={3}
                        />
                        {errors.campaignGoal && (
                          <p className="text-red-400 text-xs">
                            {errors.campaignGoal.message}
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
                          placeholder="Példa: 25-35 éves nők, kisvállalkozók, tech szakemberek..."
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-sky-500/20 text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm resize-none"
                          rows={3}
                        />
                        {errors.targetAudience && (
                          <p className="text-red-400 text-xs">
                            {errors.targetAudience.message}
                          </p>
                        )}
                      </div>

                      {/* Platform */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Layout className="w-4 h-4 text-sky-500" />
                          Platform
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { value: "facebook", label: "Facebook" },
                            { value: "instagram", label: "Instagram" },
                            { value: "twitter", label: "Twitter" },
                            { value: "linkedin", label: "LinkedIn" },
                            { value: "youtube", label: "YouTube" },
                            { value: "google-ads", label: "Google Ads" },
                            { value: "web", label: "Weboldal" },
                            { value: "print", label: "Print" },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="relative cursor-pointer"
                            >
                              <input
                                {...register("platform")}
                                type="radio"
                                value={option.value}
                                className="sr-only peer"
                              />
                              <div className="px-3 py-2 rounded-xl bg-slate-950/90 border border-sky-500/20 peer-checked:border-sky-500/50 peer-checked:bg-sky-500/10 text-center transition-all">
                                <span className="text-xs font-bold text-slate-300 peer-checked:text-sky-500">
                                  {option.label}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.platform && (
                          <p className="text-red-400 text-xs">
                            {errors.platform.message}
                          </p>
                        )}
                      </div>

                      {/* Banner Type */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Layout className="w-4 h-4 text-sky-500" />
                          Banner Típus
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: "hero", label: "Hero" },
                            { value: "story", label: "Story" },
                            { value: "cover", label: "Cover" },
                            { value: "sidebar", label: "Sidebar" },
                            { value: "display", label: "Display" },
                            { value: "social-post", label: "Social Post" },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="relative cursor-pointer"
                            >
                              <input
                                {...register("bannerType")}
                                type="radio"
                                value={option.value}
                                className="sr-only peer"
                              />
                              <div className="px-3 py-2 rounded-xl bg-slate-950/90 border border-sky-500/20 peer-checked:border-sky-500/50 peer-checked:bg-sky-500/10 text-center transition-all">
                                <span className="text-xs font-bold text-slate-300 peer-checked:text-sky-500">
                                  {option.label}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.bannerType && (
                          <p className="text-red-400 text-xs">
                            {errors.bannerType.message}
                          </p>
                        )}
                      </div>

                      {/* Art Direction */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Palette className="w-4 h-4 text-sky-500" />
                          Art Direction
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { value: "minimalist", label: "Minimalista" },
                            { value: "bold-typography", label: "Bold Typo" },
                            { value: "gradient", label: "Gradiens" },
                            { value: "photo-based", label: "Fotó" },
                            { value: "geometric", label: "Geometrikus" },
                            { value: "glassmorphism", label: "Glass" },
                            { value: "neon-cyberpunk", label: "Neon" },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="relative cursor-pointer"
                            >
                              <input
                                {...register("artDirection")}
                                type="radio"
                                value={option.value}
                                className="sr-only peer"
                              />
                              <div className="px-3 py-2 rounded-xl bg-slate-950/90 border border-sky-500/20 peer-checked:border-sky-500/50 peer-checked:bg-sky-500/10 text-center transition-all">
                                <span className="text-xs font-bold text-slate-300 peer-checked:text-sky-500">
                                  {option.label}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.artDirection && (
                          <p className="text-red-400 text-xs">
                            {errors.artDirection.message}
                          </p>
                        )}
                      </div>

                      {/* Aspect Ratio */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Monitor className="w-4 h-4 text-sky-500" />
                          Méretarány
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            {
                              value: "16:9",
                              label: "16:9",
                              icon: Monitor,
                              desc: "Facebook / Webshop",
                            },
                            {
                              value: "1:1",
                              label: "1:1",
                              icon: Square,
                              desc: "Instagram / Négyzetes",
                            },
                            {
                              value: "9:16",
                              label: "9:16",
                              icon: Smartphone,
                              desc: "Story / TikTok",
                            },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="relative cursor-pointer"
                            >
                              <input
                                {...register("aspectRatio")}
                                type="radio"
                                value={option.value}
                                className="sr-only peer"
                              />
                              <div className="px-3 py-3 rounded-xl bg-slate-950/90 border border-sky-500/20 peer-checked:border-sky-500/50 peer-checked:bg-sky-500/10 text-center transition-all hover:border-sky-500/30">
                                <option.icon className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                                <span className="text-xs font-bold text-slate-300 peer-checked:text-sky-400 block">
                                  {option.label}
                                </span>
                                <span className="text-xs text-slate-500 block mt-0.5">
                                  {option.desc}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.aspectRatio && (
                          <p className="text-red-400 text-xs">
                            {errors.aspectRatio.message}
                          </p>
                        )}
                      </div>

                      {/* Brand Colors - Modern Color Picker */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Palette className="w-4 h-4 text-sky-500" />
                          Brand Színek (Opcionális)
                        </label>
                        <div className="space-y-3">
                          {/* Predefined Color Palettes */}
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              {
                                name: "Cyber-Arany",
                                colors: ["#00B5F1", "#020617", "#e2e8f0"],
                                desc: "WebDude alap",
                              },
                              {
                                name: "SaaS Modern",
                                colors: ["#3b82f6", "#1e293b", "#f8fafc"],
                                desc: "Tech blue",
                              },
                              {
                                name: "Vibrant",
                                colors: ["#ef4444", "#1f2937", "#fef2f2"],
                                desc: "Piros fókusz",
                              },
                              {
                                name: "Nature",
                                colors: ["#10b981", "#064e3b", "#ecfdf5"],
                                desc: "Smaragdzöld",
                              },
                            ].map((palette) => (
                              <button
                                key={palette.name}
                                type="button"
                                onClick={() => {
                                  const newColors = [
                                    ...selectedColors,
                                    ...palette.colors,
                                  ];
                                  setSelectedColors(newColors);
                                  setValue("brandColors", newColors.join(","));
                                }}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/90 border border-sky-500/20 hover:border-sky-500/40 transition-all"
                              >
                                <div className="flex gap-0.5">
                                  {palette.colors.map((color, i) => (
                                    <div
                                      key={i}
                                      className="w-4 h-4 rounded-full border border-white/10"
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                                </div>
                                <div className="text-left">
                                  <div className="text-xs font-bold text-slate-300">
                                    {palette.name}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    {palette.desc}
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                          {/* Manual Color Input */}
                          <input
                            {...register("brandColors")}
                            placeholder="Vagy adj meg HEX kódokat: #00B5F1, #020617 (vesszővel elválasztva)"
                            className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-sky-500/20 text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm font-mono"
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
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-sky-500/20 text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm resize-none"
                          rows={2}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isGenerating}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-sky-500 text-bg-base font-bold rounded-xl hover:bg-violet-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider border-2 border-sky-500/20 shadow-lg shadow-sky-500/10"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            AI Prompt Generálása folyamatban...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Banner Generálása
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
                        {/* Banner Concept */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-slate-950/90 border border-sky-500/20 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layout className="w-4 h-4 text-sky-500" />
                            Banner Koncepció
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Stílus
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.bannerConcept.style}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Leírás
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.bannerConcept.description}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Kulcselemek
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.bannerConcept.keyElements.map(
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
                          className="bg-slate-950/90 border border-sky-500/20 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Target className="w-4 h-4 text-sky-500" />
                            Specifikációk
                          </h3>
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-3">
                              <div className="bg-slate-900/80 rounded-xl p-3 border border-sky-500/20">
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
                              <div className="bg-slate-900/80 rounded-xl p-3 border border-sky-500/20">
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
                              <div className="bg-slate-900/80 rounded-xl p-3 border border-sky-500/20">
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
                                Safe Zone
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.specifications.safeZone}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                CTA Elhelyezés
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.specifications.ctaPlacement}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Color Palette */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-slate-950/90 border border-sky-500/20 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Palette className="w-4 h-4 text-sky-500" />
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

                        {/* Copywriting */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-slate-950/90 border border-sky-500/20 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Type className="w-4 h-4 text-sky-500" />
                            Copywriting
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-slate-900/80 rounded-xl p-4 border border-sky-500/20">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-400">Főcím</p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.copywriting.headline,
                                      "headline"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors"
                                >
                                  {copiedStates["headline"] ? (
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
                              <p className="text-sm font-bold text-white">
                                {generatedOutput.copywriting.headline}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-400">Alcím</p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.copywriting.subheadline,
                                      "subheadline"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors"
                                >
                                  {copiedStates["subheadline"] ? (
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
                              <p className="text-sm text-white">
                                {generatedOutput.copywriting.subheadline}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-400">CTA</p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.copywriting.cta,
                                      "cta"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors"
                                >
                                  {copiedStates["cta"] ? (
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
                              <p className="text-sm font-bold text-sky-500">
                                {generatedOutput.copywriting.cta}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-2">
                                Alternatív Főcímek
                              </p>
                              <div className="space-y-2">
                                {generatedOutput.copywriting.alternativeHeadlines.map(
                                  (alt, index) => (
                                    <div
                                      key={index}
                                      className="bg-slate-900/80 rounded-lg p-3 border border-sky-500/20"
                                    >
                                      <p className="text-xs text-white">
                                        {alt}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-2">
                                Alternatív CTA-k
                              </p>
                              <div className="space-y-2">
                                {generatedOutput.copywriting.alternativeCTAs.map(
                                  (alt, index) => (
                                    <div
                                      key={index}
                                      className="bg-slate-900/80 rounded-lg p-3 border border-sky-500/20"
                                    >
                                      <p className="text-xs text-white">
                                        {alt}
                                      </p>
                                    </div>
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
                          transition={{ delay: 0.4 }}
                          className="bg-slate-950/90 border border-sky-500/20 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-sky-500" />
                            Midjourney Promptok
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-slate-900/80 rounded-xl p-4 border border-sky-500/20">
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

                        {/* Design Guidelines */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-slate-950/90 border border-sky-500/20 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Target className="w-4 h-4 text-sky-500" />
                            Design Irányelvek
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Távolság
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.designGuidelines.spacing}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Tipográfia
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.designGuidelines.typography}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Képanyag
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.designGuidelines.imagery}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Ne Tedd
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.designGuidelines.doNot.map(
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
                          className="bg-slate-950/90 border border-sky-500/20 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-4 h-4 text-sky-500" />
                            Export Formátumok
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-slate-900/80 rounded-xl p-4 border border-sky-500/20">
                              <p className="text-xs text-slate-400 mb-1">Web</p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.web}
                              </p>
                            </div>
                            <div className="bg-slate-900/80 rounded-xl p-4 border border-sky-500/20">
                              <p className="text-xs text-slate-400 mb-1">
                                Print
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.print}
                              </p>
                            </div>
                            <div className="bg-slate-900/80 rounded-xl p-4 border border-sky-500/20">
                              <p className="text-xs text-slate-400 mb-1">
                                Social
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.social}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Variations */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                          className="bg-slate-950/90 border border-sky-500/20 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-4 h-4 text-sky-500" />
                            Változatok
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="bg-slate-900/80 rounded-xl p-4 border border-sky-500/20">
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
                                <p className="text-xs text-slate-400">Mobile</p>
                              </div>
                              <p className="text-xs text-white leading-relaxed">
                                {generatedOutput.variations.mobile}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <div className="bg-slate-950/90 backdrop-blur-xl border border-sky-500/20 rounded-2xl p-12 flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                          <Layout className="w-8 h-8 text-sky-500" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-white">
                            Várakozás a generálásra
                          </h3>
                          <p className="text-sm text-slate-400">
                            Töltsd ki az űrlapot a bal oldalon, és kattints a
                            &ldquo;Banner Generálása&rdquo; gombra.
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
