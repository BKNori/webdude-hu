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
  Share2,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { addSocialMediaGenerationAction } from "@/actions/social-media-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  SocialMediaInput,
  SocialMediaOutput,
} from "@/types/social-media-workshop";

const socialMediaFormSchema = z.object({
  campaignGoal: z.string().min(10, "Kampány célja minimum 10 karakter"),
  targetAudience: z.string().min(10, "Célközönség minimum 10 karakter"),
  platform: z.enum([
    "instagram",
    "facebook",
    "linkedin",
    "twitter",
    "tiktok",
    "youtube",
  ]),
  contentType: z.enum([
    "feed-post",
    "story",
    "cover",
    "carousel",
    "reels",
    "video-thumbnail",
  ]),
  visualStyle: z.enum([
    "minimalist",
    "bold-typography",
    "gradient",
    "photo-based",
    "geometric",
    "glassmorphism",
    "neon-cyberpunk",
    "corporate",
  ]),
  brandColors: z.array(z.string()).optional(),
  requiredTexts: z.object({
    headline: z.string().optional(),
    subheadline: z.string().optional(),
    caption: z.string().optional(),
    hashtags: z.string().optional(),
  }),
  additionalRequirements: z.string().optional(),
});

type SocialMediaFormValues = z.infer<typeof socialMediaFormSchema>;

export default function SocialMediaWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<SocialMediaOutput | null>(null);
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
  } = useForm<SocialMediaFormValues>({
    resolver: zodResolver(socialMediaFormSchema),
    defaultValues: {
      platform: "instagram",
      contentType: "feed-post",
      visualStyle: "minimalist",
      brandColors: [],
      requiredTexts: {
        headline: "",
        subheadline: "",
        caption: "",
        hashtags: "",
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

  const onSubmit = async (data: SocialMediaFormValues) => {
    // Check access
    if (!isAdmin && !allowedTools.includes("social_media_ai_muhely")) {
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
      const input: SocialMediaInput = {
        campaignGoal: data.campaignGoal,
        targetAudience: data.targetAudience,
        platform: data.platform,
        contentType: data.contentType,
        visualStyle: data.visualStyle,
        brandColors: data.brandColors,
        requiredTexts: data.requiredTexts,
        additionalRequirements: data.additionalRequirements,
      };

      const result = await addSocialMediaGenerationAction(idToken, input);

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
                        Social Media AI Műhely
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
                        Social Media Generátor
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none font-mono">
                        Multi-Platform Tartalom
                      </h1>
                      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Generálj platform-specifikus social media tartalmakat
                        Norbi 26 éves grafikai és social media marketing
                        szakértelmével. Instagram, Facebook, LinkedIn, TikTok
                        optimalizációval.
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
                          placeholder="Példa: Termék bevezetés, márkaépítés, esemény promóció..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm resize-none"
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

                      {/* Platform */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Share2 className="w-4 h-4 text-sky-500" />
                          Platform
                        </label>
                        <div className="grid grid-cols-6 gap-2">
                          {[
                            { value: "instagram", label: "Instagram" },
                            { value: "facebook", label: "Facebook" },
                            { value: "linkedin", label: "LinkedIn" },
                            { value: "twitter", label: "Twitter" },
                            { value: "tiktok", label: "TikTok" },
                            { value: "youtube", label: "YouTube" },
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
                              <div className="px-3 py-2 rounded-xl bg-bg-elevated/50 border border-bg-elevated peer-checked:border-sky-500/50 peer-checked:bg-sky-500/10 text-center transition-all">
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

                      {/* Content Type */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Layout className="w-4 h-4 text-sky-500" />
                          Tartalom Típus
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { value: "feed-post", label: "Feed Post" },
                            { value: "story", label: "Story" },
                            { value: "cover", label: "Cover" },
                            { value: "carousel", label: "Carousel" },
                            { value: "reels", label: "Reels" },
                            { value: "video-thumbnail", label: "Thumbnail" },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="relative cursor-pointer"
                            >
                              <input
                                {...register("contentType")}
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
                        {errors.contentType && (
                          <p className="text-red-400 text-xs">
                            {errors.contentType.message}
                          </p>
                        )}
                      </div>

                      {/* Visual Style */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Palette className="w-4 h-4 text-sky-500" />
                          Vizuális Stílus
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
                            { value: "corporate", label: "Vállalati" },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className="relative cursor-pointer"
                            >
                              <input
                                {...register("visualStyle")}
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
                        {errors.visualStyle && (
                          <p className="text-red-400 text-xs">
                            {errors.visualStyle.message}
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
                            {...register("requiredTexts.caption")}
                            placeholder="Caption (opcionális)"
                            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm resize-none"
                            rows={2}
                          />
                          <input
                            {...register("requiredTexts.hashtags")}
                            placeholder="Hashtags (opcionális)"
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
                            Social Media Generálása
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
                        {/* Content Concept */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layout className="w-4 h-4 text-sky-500" />
                            Tartalom Koncepció
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Stílus
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.contentConcept.style}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Leírás
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.contentConcept.description}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Kulcselemek
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.contentConcept.keyElements.map(
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
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Szöveg Elhelyezés
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.specifications.textPlacement}
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
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Type className="w-4 h-4 text-sky-500" />
                            Copywriting
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
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
                                <p className="text-xs text-slate-400">
                                  Caption
                                </p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.copywriting.caption,
                                      "caption"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors"
                                >
                                  {copiedStates["caption"] ? (
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
                                {generatedOutput.copywriting.caption}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Hashtags
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.copywriting.hashtags.map(
                                  (tag, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs"
                                    >
                                      {tag}
                                    </span>
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

                        {/* Platform Specific */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Share2 className="w-4 h-4 text-sky-500" />
                            Platform Specifikus
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Instagram
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.platformSpecific.instagram}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Facebook
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.platformSpecific.facebook}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                LinkedIn
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.platformSpecific.linkedin}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Twitter
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.platformSpecific.twitter}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                TikTok
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.platformSpecific.tiktok}
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
                            <Layers className="w-4 h-4 text-sky-500" />
                            Export Formátumok
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">Web</p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.web}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Social
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.social}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Thumbnail
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.exportFormats.thumbnail}
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
                            &ldquo;Social Media Generálása&rdquo; gombra.
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
