"use client";

import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import {
  Sparkles,
  Loader2,
  ArrowLeft,
  Calendar,
  Target,
  Users,
  MessageSquare,
  TrendingUp,
  Palette,
  FileText,
  Mail,
  Image as ImageIcon,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { addSeasonalWorkshopAction } from "@/actions/seasonal-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  SeasonalWorkshopInput,
  SeasonalWorkshopOutput,
} from "@/types/seasonal-workshop";

const seasonalFormSchema = z.object({
  season: z.enum([
    "christmas",
    "new-year",
    "valentine",
    "easter",
    "summer",
    "autumn",
    "halloween",
    "black-friday",
    "cyber-monday",
    "custom",
  ]),
  campaignType: z.enum([
    "social-media",
    "email",
    "landing-page",
    "banner",
    "story",
    "video-thumbnail",
  ]),
  targetAudience: z.string().min(5, "Célközönség minimum 5 karakter"),
  brandVoice: z.enum([
    "professional",
    "friendly",
    "luxury",
    "playful",
    "corporate",
    "minimalist",
  ]),
  primaryGoal: z.enum([
    "sales",
    "brand-awareness",
    "engagement",
    "traffic",
    "lead-generation",
  ]),
  customSeason: z.string().optional(),
  additionalRequirements: z.string().optional(),
});

type SeasonalFormValues = z.infer<typeof seasonalFormSchema>;

export default function SeasonalWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<SeasonalWorkshopOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
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
    control,
  } = useForm<SeasonalFormValues>({
    resolver: zodResolver(seasonalFormSchema),
    defaultValues: {
      season: "christmas",
      campaignType: "social-media",
      brandVoice: "professional",
      primaryGoal: "sales",
      customSeason: "",
      additionalRequirements: "",
    },
  });

  const onSubmit = async (data: SeasonalFormValues) => {
    // Check access
    if (!isAdmin && !allowedTools.includes("seasonal_workshop_ai_muhely")) {
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
      const input: SeasonalWorkshopInput = {
        season: data.season,
        campaignType: data.campaignType,
        targetAudience: data.targetAudience,
        brandVoice: data.brandVoice,
        primaryGoal: data.primaryGoal,
        customSeason: data.customSeason,
        additionalRequirements: data.additionalRequirements,
      };

      const result = await addSeasonalWorkshopAction(idToken, input);

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

  const selectedSeason = useWatch({ control, name: "season" });

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
                      <Calendar className="w-5 h-5 text-bg-base" />
                    </Link>
                    <div>
                      <span className="text-xs uppercase font-black tracking-widest text-amber-500 block">
                        WebDude AI Studio
                      </span>
                      <span className="text-sm font-bold text-white block -mt-0.5">
                        Szezonalis AI Műhely
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
                        Szezonalis Generátor
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none font-mono">
                        Szezonalis Kampány
                      </h1>
                      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Generálj professzionális szezonális kampányokat Norbi
                        16+ éves marketing és vizuális tervezési szakértelmével.
                        Kampánygrafikák, hangulatok és promóciós szövegek.
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
                      {/* Season */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Calendar className="w-4 h-4 text-amber-500" />
                          Szezon
                        </label>
                        <select
                          {...register("season")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white transition-all text-sm"
                        >
                          <option value="christmas">Karácsony</option>
                          <option value="new-year">Újév</option>
                          <option value="valentine">Valentin-nap</option>
                          <option value="easter">Húsvét</option>
                          <option value="summer">Nyár</option>
                          <option value="autumn">Ősz</option>
                          <option value="halloween">Halloween</option>
                          <option value="black-friday">Black Friday</option>
                          <option value="cyber-monday">Cyber Monday</option>
                          <option value="custom">Egyedi</option>
                        </select>
                      </div>

                      {/* Custom Season */}
                      {selectedSeason === "custom" && (
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                            <Calendar className="w-4 h-4 text-amber-500" />
                            Egyedi Szezon
                          </label>
                          <input
                            {...register("customSeason")}
                            placeholder="Pl. Anyák napja, Apák napja..."
                            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white placeholder-slate-500 transition-all text-sm"
                          />
                        </div>
                      )}

                      {/* Campaign Type */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Target className="w-4 h-4 text-amber-500" />
                          Kampány Típus
                        </label>
                        <select
                          {...register("campaignType")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white transition-all text-sm"
                        >
                          <option value="social-media">Social media</option>
                          <option value="email">Email kampány</option>
                          <option value="landing-page">Landing oldal</option>
                          <option value="banner">Banner hirdetés</option>
                          <option value="story">Story formátum</option>
                          <option value="video-thumbnail">
                            Video thumbnail
                          </option>
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

                      {/* Brand Voice */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <MessageSquare className="w-4 h-4 text-amber-500" />
                          Márka Hang
                        </label>
                        <select
                          {...register("brandVoice")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white transition-all text-sm"
                        >
                          <option value="professional">Professzionális</option>
                          <option value="friendly">Barátságos</option>
                          <option value="luxury">Luxus</option>
                          <option value="playful">Játékos</option>
                          <option value="corporate">Vállalati</option>
                          <option value="minimalist">Minimalista</option>
                        </select>
                      </div>

                      {/* Primary Goal */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <TrendingUp className="w-4 h-4 text-amber-500" />
                          Elsődleges Cél
                        </label>
                        <select
                          {...register("primaryGoal")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white transition-all text-sm"
                        >
                          <option value="sales">Eladás növelés</option>
                          <option value="brand-awareness">
                            Márka tudatosság
                          </option>
                          <option value="engagement">
                            Elköteleződés növelés
                          </option>
                          <option value="traffic">Forgalom növelés</option>
                          <option value="lead-generation">
                            Lead generálás
                          </option>
                        </select>
                      </div>

                      {/* Additional Requirements */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          További Követelmények (opcionális)
                        </label>
                        <textarea
                          {...register("additionalRequirements")}
                          rows={3}
                          placeholder="Pl. Fókusz a Cyber-Gold identitásra, Kecskemét régió..."
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
                            Szezonalis Kampány Generálása
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
                          <Calendar className="w-8 h-8 text-amber-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          Szezonalis Kampány Terv
                        </h3>
                        <p className="text-sm text-slate-400 text-center max-w-md">
                          Töltsd ki az űrlapot a bal oldalon, és kattints a
                          &ldquo;Szezonalis Kampány Generálása&rdquo; gombra.
                        </p>
                      </div>
                    )}

                    {generatedOutput && (
                      <div className="space-y-4">
                        {/* Campaign Strategy */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Target className="w-4 h-4 text-amber-500" />
                              Kampány Stratégia
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Téma
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.campaignStrategy.theme}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Hangulat
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.campaignStrategy.mood}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Kulcs Üzenetek
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.campaignStrategy.keyMessages.map(
                                  (message, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {message}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Időzítés
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.campaignStrategy.timing}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Visual Guidance */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Palette className="w-4 h-4 text-amber-500" />
                            Vizuális Irányelvek
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Szín Paletta
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.visualGuidance.colorPalette.map(
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
                                Képek
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.visualGuidance.imagery.map(
                                  (image, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {image}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </motion.div>

                        {/* Copywriting */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <FileText className="w-4 h-4 text-amber-500" />
                            Szövegírás
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Címsorok
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.copywriting.headlines.map(
                                  (headline, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white font-bold"
                                    >
                                      {headline}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Hashtagek
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.copywriting.hashtags.map(
                                  (tag, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono"
                                    >
                                      {tag}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Social Media Content */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-amber-500" />
                            Social Media Tartalom
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-bg-base/50 rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Instagram
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.socialMediaContent.instagram}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Facebook
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.socialMediaContent.facebook}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                LinkedIn
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.socialMediaContent.linkedin}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Email Campaign */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Mail className="w-4 h-4 text-amber-500" />
                            Email Kampány
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Tárgy Sorok
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.emailCampaign.subjectLines.map(
                                  (subject, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {subject}
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
                          transition={{ delay: 0.5 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-amber-500" />
                            Midjourney Promptok
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-bg-base/50 rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Hero Kép
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.midjourneyPrompts.heroImage}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Termék Fotó
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.midjourneyPrompts.productShot}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Promotional Calendar */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-500" />
                            Promóciós Naptár
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Indulás Előtt
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.promotionalCalendar.preLaunch.map(
                                  (activity, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {activity}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Indulás Nap
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.promotionalCalendar.launch.map(
                                  (activity, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {activity}
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
