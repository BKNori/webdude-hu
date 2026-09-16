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
  FileText,
  Target,
  Users,
  MessageSquare,
  Share2,
  Search,
  Lightbulb,
  Palette,
  Layout,
  Calendar,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { addContentWorkshopAction } from "@/actions/content-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  ContentWorkshopInput,
  ContentWorkshopOutput,
} from "@/types/content-workshop";

const contentFormSchema = z.object({
  topic: z.string().min(5, "Téma minimum 5 karakter"),
  contentType: z.enum([
    "blog-post",
    "social-media",
    "landing-page",
    "email-campaign",
    "product-description",
    "case-study",
  ]),
  targetAudience: z.string().min(5, "Célközönség minimum 5 karakter"),
  tone: z.enum([
    "professional",
    "casual",
    "friendly",
    "authoritative",
    "inspiring",
    "humorous",
  ]),
  platform: z.enum([
    "website",
    "linkedin",
    "instagram",
    "facebook",
    "twitter",
    "email",
    "other",
  ]),
  keywords: z.string().min(3, "Kulcsszavak minimum 3 karakter"),
  callToAction: z.string().optional(),
  additionalRequirements: z.string().optional(),
});

type ContentFormValues = z.infer<typeof contentFormSchema>;

export default function ContentWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<ContentWorkshopOutput | null>(null);
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
  } = useForm<ContentFormValues>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      contentType: "blog-post",
      tone: "professional",
      platform: "website",
      callToAction: "",
      additionalRequirements: "",
    },
  });

  const onSubmit = async (data: ContentFormValues) => {
    // Check access
    if (!isAdmin && !allowedTools.includes("content_workshop_ai_muhely")) {
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
      const input: ContentWorkshopInput = {
        topic: data.topic,
        contentType: data.contentType,
        targetAudience: data.targetAudience,
        tone: data.tone,
        platform: data.platform,
        keywords: data.keywords,
        callToAction: data.callToAction,
        additionalRequirements: data.additionalRequirements,
      };

      const result = await addContentWorkshopAction(idToken, input);

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
                      <FileText className="w-5 h-5 text-bg-base" />
                    </Link>
                    <div>
                      <span className="text-xs uppercase font-black tracking-widest text-amber-500 block">
                        WebDude AI Studio
                      </span>
                      <span className="text-sm font-bold text-white block -mt-0.5">
                        Tartalomtervező AI Műhely
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
                        Tartalom Generátor
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none font-mono">
                        Strukturált Tartalom
                      </h1>
                      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Generálj professzionális tartalmat Norbi 16+ éves
                        tartalomstratégiai és vizuális tervezési szakértelmével.
                        SEO optimalizált, konverziófókuszú és Cyber-Arany
                        dizájn.
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
                      {/* Topic */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Target className="w-4 h-4 text-amber-500" />
                          Téma
                        </label>
                        <textarea
                          {...register("topic")}
                          rows={3}
                          placeholder="Pl. Webfejlesztés trendek 2026-ban..."
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white placeholder-slate-500 transition-all text-sm resize-none"
                        />
                        {errors.topic && (
                          <p className="text-red-400 text-xs font-mono">
                            {errors.topic.message}
                          </p>
                        )}
                      </div>

                      {/* Content Type */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <FileText className="w-4 h-4 text-amber-500" />
                          Tartalom Típus
                        </label>
                        <select
                          {...register("contentType")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white transition-all text-sm"
                        >
                          <option value="blog-post">Blog bejegyzés</option>
                          <option value="social-media">Social media</option>
                          <option value="landing-page">Landing oldal</option>
                          <option value="email-campaign">Email kampány</option>
                          <option value="product-description">
                            Termék leírás
                          </option>
                          <option value="case-study">Esettanulmány</option>
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

                      {/* Tone */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <MessageSquare className="w-4 h-4 text-amber-500" />
                          Hangnem
                        </label>
                        <select
                          {...register("tone")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white transition-all text-sm"
                        >
                          <option value="professional">Professzionális</option>
                          <option value="casual">Lazább</option>
                          <option value="friendly">Barátságos</option>
                          <option value="authoritative">Szakértői</option>
                          <option value="inspiring">Inspiráló</option>
                          <option value="humorous">Humoros</option>
                        </select>
                      </div>

                      {/* Platform */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Share2 className="w-4 h-4 text-amber-500" />
                          Platform
                        </label>
                        <select
                          {...register("platform")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white transition-all text-sm"
                        >
                          <option value="website">Weboldal</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                          <option value="twitter">Twitter</option>
                          <option value="email">Email</option>
                          <option value="other">Egyéb</option>
                        </select>
                      </div>

                      {/* Keywords */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Search className="w-4 h-4 text-amber-500" />
                          Kulcsszavak
                        </label>
                        <input
                          {...register("keywords")}
                          placeholder="webfejlesztés, AI automatizáció, Next.js"
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white placeholder-slate-500 transition-all text-sm"
                        />
                        {errors.keywords && (
                          <p className="text-red-400 text-xs font-mono">
                            {errors.keywords.message}
                          </p>
                        )}
                      </div>

                      {/* Call to Action */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Zap className="w-4 h-4 text-amber-500" />
                          Call to Action (opcionális)
                        </label>
                        <input
                          {...register("callToAction")}
                          placeholder="Kérj ingyenes auditot"
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white placeholder-slate-500 transition-all text-sm"
                        />
                      </div>

                      {/* Additional Requirements */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Lightbulb className="w-4 h-4 text-amber-500" />
                          További Követelmények (opcionális)
                        </label>
                        <textarea
                          {...register("additionalRequirements")}
                          rows={3}
                          placeholder="Pl. Fókusz a helyi SEO-ra, Kecskemét régió..."
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
                            Tartalom Generálása
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
                          <FileText className="w-8 h-8 text-amber-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          Tartalom Terv
                        </h3>
                        <p className="text-sm text-slate-400 text-center max-w-md">
                          Töltsd ki az űrlapot a bal oldalon, és kattints a
                          &ldquo;Tartalom Generálása&rdquo; gombra.
                        </p>
                      </div>
                    )}

                    {generatedOutput && (
                      <div className="space-y-4">
                        {/* Content Strategy */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Target className="w-4 h-4 text-amber-500" />
                              Tartalom Stratégia
                            </h3>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Megközelítés
                              </p>
                              <p className="text-sm text-white">
                                {generatedOutput.contentStrategy.angle}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Horog
                              </p>
                              <p className="text-sm text-white font-mono">
                                {generatedOutput.contentStrategy.hook}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Értékajánlat
                              </p>
                              <p className="text-sm text-white">
                                {
                                  generatedOutput.contentStrategy
                                    .valueProposition
                                }
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Kulcsüzenetek
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.contentStrategy.keyMessages.map(
                                  (message, index) => (
                                    <span
                                      key={index}
                                      className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono"
                                    >
                                      {message}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Content Structure */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Layout className="w-4 h-4 text-amber-500" />
                            Tartalom Struktúra
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Címsor
                              </p>
                              <p className="text-sm text-white font-bold font-mono">
                                {generatedOutput.contentStructure.headline}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Alcímek
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.contentStructure.subheadlines.map(
                                  (sub, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {sub}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Szakaszok
                              </p>
                              <ul className="space-y-2">
                                {generatedOutput.contentStructure.bodySections.map(
                                  (section, index) => (
                                    <li
                                      key={index}
                                      className="bg-bg-base/50 rounded-lg p-3 border border-gray-800"
                                    >
                                      <p className="text-xs text-white font-medium mb-1">
                                        {section.heading}
                                      </p>
                                      <p className="text-xs text-slate-400">
                                        {section.wordCount} szó
                                      </p>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </motion.div>

                        {/* Visual Guidance */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Palette className="w-4 h-4 text-amber-500" />
                            Vizuális Irányelvek
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Kép Javaslatok
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.visualGuidance.imageSuggestions.map(
                                  (suggestion, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white"
                                    >
                                      {suggestion}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Szín Paletta
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.visualGuidance.colorPalette.map(
                                  (color, index) => (
                                    <span
                                      key={index}
                                      className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono"
                                    >
                                      {color}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* SEO Optimization */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Search className="w-4 h-4 text-amber-500" />
                            SEO Optimalizáció
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Elsődleges Kulcsszó
                              </p>
                              <p className="text-sm text-white font-mono">
                                {generatedOutput.seoOptimization.primaryKeyword}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Másodlagos Kulcsszavak
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.seoOptimization.secondaryKeywords.map(
                                  (keyword, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono"
                                    >
                                      {keyword}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Meta Leírás
                              </p>
                              <p className="text-xs text-white">
                                {
                                  generatedOutput.seoOptimization
                                    .metaDescription
                                }
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Social Media Variations */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Share2 className="w-4 h-4 text-amber-500" />
                            Social Media Változatok
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-bg-base/50 rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                LinkedIn
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.socialMediaVariations.linkedin}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Instagram
                              </p>
                              <p className="text-xs text-white">
                                {
                                  generatedOutput.socialMediaVariations
                                    .instagram
                                }
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Twitter
                              </p>
                              <p className="text-xs text-white">
                                {generatedOutput.socialMediaVariations.twitter}
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Call to Action Variations */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500" />
                            Call to Action Változatok
                          </h3>
                          <div className="space-y-3">
                            <div className="bg-bg-base/50 rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Elsődleges
                              </p>
                              <p className="text-sm text-white font-bold">
                                {generatedOutput.callToActionVariations.primary}
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Másodlagos
                              </p>
                              <p className="text-sm text-white">
                                {
                                  generatedOutput.callToActionVariations
                                    .secondary
                                }
                              </p>
                            </div>
                            <div className="bg-bg-base/50 rounded-lg p-3 border border-gray-800">
                              <p className="text-xs text-slate-400 mb-1">
                                Harmadlagos
                              </p>
                              <p className="text-sm text-white">
                                {
                                  generatedOutput.callToActionVariations
                                    .tertiary
                                }
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Content Calendar */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-amber-500" />
                            Tartalom Naptár
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Közzétételi Ütemterv
                              </p>
                              <p className="text-sm text-white">
                                {
                                  generatedOutput.contentCalendar
                                    .publishingSchedule
                                }
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Tartalom Típusok
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.contentCalendar.contentTypes.map(
                                  (type, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono"
                                    >
                                      {type}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Disztribúciós Csatornák
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.contentCalendar.distributionChannels.map(
                                  (channel, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono"
                                    >
                                      {channel}
                                    </span>
                                  )
                                )}
                              </div>
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
