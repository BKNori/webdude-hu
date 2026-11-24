"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { Layout, Copy, Check, Sparkles, Loader2, Palette, Type, Layers, Target, Sun, Moon, Share2 } from "lucide-react";
import Link from "next/link";
import ToolAccessLock from "@/components/molecules/ToolAccessLock";
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

  // Strict access gate: show a locked panel until auth resolves,
  // then block users without the required tool permission.
  if (!loading && !isAdmin && !allowedTools.includes("social_media_ai_muhely")) {
    return <ToolAccessLock toolName="Social Media AI Műhely" />;
  }

  return (
    <div className="text-[#0F172A] dark:text-[#F8FAFC]">
      {/* Loading State */}
      {loading && (
        <div className="min-h-[50vh] bg-transparent flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#0369A1] dark:text-[#00B5F1]" />
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-widest animate-pulse font-bold">
            Generátor betöltése...
          </p>
        </div>
      )}

      {!loading && (
        <>
          {/* Authentication Check */}
          {!auth || !auth.currentUser ? (
            <div className="min-h-[50vh] bg-transparent flex flex-col items-center justify-center space-y-6 px-6">
              <div className="bg-red-500/5 border border-red-500/40 backdrop-blur-xl shadow-[0_0_24px_rgba(239,68,68,0.15)] text-red-600 dark:text-red-400 px-6 py-4 rounded-2xl text-sm flex items-center gap-3 font-mono max-w-md text-center">
                <Sparkles className="w-5 h-5" />
                {error || "Kérlek, jelentkezz be a használatához!"}
              </div>
              <Link
                href="/portal"
                className="px-6 py-3 rounded-xl bg-linear-to-r from-[#075985] to-[#5B21B6] text-white font-bold hover:from-[#0369A1] hover:to-[#6D28D9] transition-colors"
              >
                Bejelentkezés
              </Link>
            </div>
          ) : (
            <>

              {/* Main Container */}
              <div className="py-2">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Input Form */}
                  <div className="space-y-6">
                    <div className="space-y-2 relative">
                      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
                      <span className="text-xs font-mono font-black uppercase tracking-widest text-[#0369A1] dark:text-[#00B5F1]">
                        Social Media Generátor
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-none font-mono">
                        Multi-Platform Tartalom
                      </h1>
                      <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Generálj platform-specifikus social media tartalmakat
                        Norbi 26 éves grafikai és social media marketing
                        szakértelmével. Instagram, Facebook, LinkedIn, TikTok
                        optimalizációval.
                      </p>
                    </div>

                    {error && (
                      <div className="bg-red-500/5 border border-red-500/40 backdrop-blur-xl shadow-[0_0_24px_rgba(239,68,68,0.15)] text-red-600 dark:text-red-400 px-4 py-3 rounded-2xl text-xs flex items-center gap-2.5 font-mono">
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
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <Target className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                          Kampány Célja
                        </label>
                        <textarea
                          {...register("campaignGoal")}
                          placeholder="Példa: Termék bevezetés, márkaépítés, esemény promóció..."
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm resize-none"
                          rows={3}
                        />
                        {errors.campaignGoal && (
                          <p className="text-red-600 dark:text-red-400 text-xs">
                            {errors.campaignGoal.message}
                          </p>
                        )}
                      </div>

                      {/* Target Audience */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <Type className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                          Célközönség
                        </label>
                        <textarea
                          {...register("targetAudience")}
                          placeholder="Példa: 25-35 éves szakemberek, diákok, helyi lakosok..."
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm resize-none"
                          rows={3}
                        />
                        {errors.targetAudience && (
                          <p className="text-red-600 dark:text-red-400 text-xs">
                            {errors.targetAudience.message}
                          </p>
                        )}
                      </div>

                      {/* Platform */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <Share2 className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
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
                              <div className="px-3 py-2 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#0369A1] dark:hover:border-[#00B5F1] peer-checked:bg-[#0369A1] dark:peer-checked:bg-[#00B5F1] peer-checked:text-white dark:peer-checked:text-slate-950 peer-checked:border-transparent font-semibold text-center transition-all shadow-2xs dark:shadow-none">
                                <span className="text-xs font-bold text-current">
                                  {option.label}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.platform && (
                          <p className="text-red-600 dark:text-red-400 text-xs">
                            {errors.platform.message}
                          </p>
                        )}
                      </div>

                      {/* Content Type */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <Layout className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
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
                              <div className="px-3 py-2 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#0369A1] dark:hover:border-[#00B5F1] peer-checked:bg-[#0369A1] dark:peer-checked:bg-[#00B5F1] peer-checked:text-white dark:peer-checked:text-slate-950 peer-checked:border-transparent font-semibold text-center transition-all shadow-2xs dark:shadow-none">
                                <span className="text-xs font-bold text-current">
                                  {option.label}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.contentType && (
                          <p className="text-red-600 dark:text-red-400 text-xs">
                            {errors.contentType.message}
                          </p>
                        )}
                      </div>

                      {/* Visual Style */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <Palette className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
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
                              <div className="px-3 py-2 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#0369A1] dark:hover:border-[#00B5F1] peer-checked:bg-[#0369A1] dark:peer-checked:bg-[#00B5F1] peer-checked:text-white dark:peer-checked:text-slate-950 peer-checked:border-transparent font-semibold text-center transition-all shadow-2xs dark:shadow-none">
                                <span className="text-xs font-bold text-current">
                                  {option.label}
                                </span>
                              </div>
                            </label>
                          ))}
                        </div>
                        {errors.visualStyle && (
                          <p className="text-red-600 dark:text-red-400 text-xs">
                            {errors.visualStyle.message}
                          </p>
                        )}
                      </div>

                      {/* Brand Colors */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <Palette className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                          Brand Színek (Opcionális)
                        </label>
                        <input
                          {...register("brandColors")}
                          placeholder="Példa: #00B5F1, #020617, #e2e8f0 (vesszővel elválasztva)"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm"
                        />
                      </div>

                      {/* Required Texts */}
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <Type className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                          Kötelező Szövegek (Opcionális)
                        </label>
                        <div className="space-y-3">
                          <input
                            {...register("requiredTexts.headline")}
                            placeholder="Főcím (opcionális)"
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm"
                          />
                          <input
                            {...register("requiredTexts.subheadline")}
                            placeholder="Alcím (opcionális)"
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm"
                          />
                          <textarea
                            {...register("requiredTexts.caption")}
                            placeholder="Caption (opcionális)"
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm resize-none"
                            rows={2}
                          />
                          <input
                            {...register("requiredTexts.hashtags")}
                            placeholder="Hashtags (opcionális)"
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm"
                          />
                        </div>
                      </div>

                      {/* Additional Requirements */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <Type className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                          További Követelmények (Opcionális)
                        </label>
                        <textarea
                          {...register("additionalRequirements")}
                          placeholder="Bármilyen egyéb követelmény vagy specifikáció..."
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all text-sm resize-none"
                          rows={2}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isGenerating}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] text-white font-bold rounded-xl hover:from-[#0369A1] hover:to-[#6D28D9] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider"
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
                          className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
                            <Layout className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                            Tartalom Koncepció
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Stílus
                              </p>
                              <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.contentConcept.style}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Leírás
                              </p>
                              <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.contentConcept.description}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Kulcselemek
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.contentConcept.keyElements.map(
                                  (element, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-sky-500/10 border border-slate-200 dark:border-slate-800 text-[#0369A1] dark:text-[#00B5F1] text-xs"
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
                          className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
                            <Target className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                            Specifikációk
                          </h3>
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-3">
                              <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-slate-200 dark:border-slate-800">
                                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                  Szélesség
                                </p>
                                <p className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                  {
                                    generatedOutput.specifications.dimensions
                                      .width
                                  }
                                  px
                                </p>
                              </div>
                              <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-slate-200 dark:border-slate-800">
                                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                  Magasság
                                </p>
                                <p className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                  {
                                    generatedOutput.specifications.dimensions
                                      .height
                                  }
                                  px
                                </p>
                              </div>
                              <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-slate-200 dark:border-slate-800">
                                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                  Formátum
                                </p>
                                <p className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                  {
                                    generatedOutput.specifications.dimensions
                                      .format
                                  }
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Méretarány
                              </p>
                              <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.specifications.aspectRatio}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Safe Zone
                              </p>
                              <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.specifications.safeZone}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Szöveg Elhelyezés
                              </p>
                              <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">
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
                          className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
                            <Palette className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                            Szín Paletta
                          </h3>
                          <div className="grid grid-cols-5 gap-3">
                            <div className="text-center">
                              <div
                                className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg mx-auto mb-2"
                                style={{
                                  backgroundColor:
                                    generatedOutput.colorPalette.primary,
                                }}
                              />
                              <p className="text-xs text-slate-600 dark:text-slate-400">Primary</p>
                              <p className="text-xs font-mono text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.colorPalette.primary}
                              </p>
                            </div>
                            <div className="text-center">
                              <div
                                className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg mx-auto mb-2"
                                style={{
                                  backgroundColor:
                                    generatedOutput.colorPalette.secondary,
                                }}
                              />
                              <p className="text-xs text-slate-600 dark:text-slate-400">
                                Secondary
                              </p>
                              <p className="text-xs font-mono text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.colorPalette.secondary}
                              </p>
                            </div>
                            <div className="text-center">
                              <div
                                className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg mx-auto mb-2"
                                style={{
                                  backgroundColor:
                                    generatedOutput.colorPalette.accent,
                                }}
                              />
                              <p className="text-xs text-slate-600 dark:text-slate-400">Accent</p>
                              <p className="text-xs font-mono text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.colorPalette.accent}
                              </p>
                            </div>
                            <div className="text-center">
                              <div
                                className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg mx-auto mb-2"
                                style={{
                                  backgroundColor:
                                    generatedOutput.colorPalette.background,
                                }}
                              />
                              <p className="text-xs text-slate-600 dark:text-slate-400">
                                Background
                              </p>
                              <p className="text-xs font-mono text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.colorPalette.background}
                              </p>
                            </div>
                            <div className="text-center">
                              <div
                                className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg mx-auto mb-2"
                                style={{
                                  backgroundColor:
                                    generatedOutput.colorPalette.text,
                                }}
                              />
                              <p className="text-xs text-slate-600 dark:text-slate-400">Text</p>
                              <p className="text-xs font-mono text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.colorPalette.text}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                              Indoklás
                            </p>
                            <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC]">
                              {generatedOutput.colorPalette.rationale}
                            </p>
                          </div>
                        </motion.div>

                        {/* Copywriting */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
                            <Type className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                            Copywriting
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-600 dark:text-slate-400">Főcím</p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.copywriting.headline,
                                      "headline"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-slate-200 dark:border-slate-800 text-[#0369A1] dark:text-[#00B5F1] text-xs font-mono hover:bg-sky-500/20 transition-colors"
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
                              <p className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.copywriting.headline}
                              </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-600 dark:text-slate-400">Alcím</p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.copywriting.subheadline,
                                      "subheadline"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-slate-200 dark:border-slate-800 text-[#0369A1] dark:text-[#00B5F1] text-xs font-mono hover:bg-sky-500/20 transition-colors"
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
                              <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.copywriting.subheadline}
                              </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                  Caption
                                </p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.copywriting.caption,
                                      "caption"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-slate-200 dark:border-slate-800 text-[#0369A1] dark:text-[#00B5F1] text-xs font-mono hover:bg-sky-500/20 transition-colors"
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
                              <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.copywriting.caption}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Hashtags
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.copywriting.hashtags.map(
                                  (tag, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-sky-500/10 border border-slate-200 dark:border-slate-800 text-[#0369A1] dark:text-[#00B5F1] text-xs"
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
                          className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                            Midjourney Promptok
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                  Primary
                                </p>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      generatedOutput.midjourneyPrompts.primary,
                                      "mj-primary"
                                    )
                                  }
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-slate-200 dark:border-slate-800 text-[#0369A1] dark:text-[#00B5F1] text-xs font-mono hover:bg-sky-500/20 transition-colors"
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
                              <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] font-mono leading-relaxed whitespace-pre-wrap">
                                {generatedOutput.midjourneyPrompts.primary}
                              </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-600 dark:text-slate-400">
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
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-slate-200 dark:border-slate-800 text-[#0369A1] dark:text-[#00B5F1] text-xs font-mono hover:bg-sky-500/20 transition-colors"
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
                              <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] font-mono leading-relaxed whitespace-pre-wrap">
                                {generatedOutput.midjourneyPrompts.alternative1}
                              </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-slate-600 dark:text-slate-400">
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
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-slate-200 dark:border-slate-800 text-[#0369A1] dark:text-[#00B5F1] text-xs font-mono hover:bg-sky-500/20 transition-colors"
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
                              <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] font-mono leading-relaxed whitespace-pre-wrap">
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
                          className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
                            <Share2 className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                            Platform Specifikus
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Instagram
                              </p>
                              <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.platformSpecific.instagram}
                              </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Facebook
                              </p>
                              <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.platformSpecific.facebook}
                              </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                LinkedIn
                              </p>
                              <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.platformSpecific.linkedin}
                              </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Twitter
                              </p>
                              <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.platformSpecific.twitter}
                              </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                TikTok
                              </p>
                              <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC]">
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
                          className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                            Export Formátumok
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Web</p>
                              <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.exportFormats.web}
                              </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Social
                              </p>
                              <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.exportFormats.social}
                              </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Thumbnail
                              </p>
                              <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC]">
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
                          className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
                            <Layers className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                            Változatok
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <div className="flex items-center gap-2 mb-2">
                                <Sun className="w-3 h-3 text-[#0369A1] dark:text-[#00B5F1]" />
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                  Light Mode
                                </p>
                              </div>
                              <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
                                {generatedOutput.variations.lightMode}
                              </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <div className="flex items-center gap-2 mb-2">
                                <Moon className="w-3 h-3 text-[#0369A1] dark:text-[#00B5F1]" />
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                  Dark Mode
                                </p>
                              </div>
                              <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
                                {generatedOutput.variations.darkMode}
                              </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                              <div className="flex items-center gap-2 mb-2">
                                <Target className="w-3 h-3 text-[#0369A1] dark:text-[#00B5F1]" />
                                <p className="text-xs text-slate-600 dark:text-slate-400">Mobile</p>
                              </div>
                              <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
                                {generatedOutput.variations.mobile}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <div className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                          <Layout className="w-8 h-8 text-[#0369A1] dark:text-[#00B5F1]" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                            Várakozás a generálásra
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
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
