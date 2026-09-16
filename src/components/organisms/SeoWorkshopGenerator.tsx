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
  Search,
  Target,
  Users,
  TrendingUp,
  Shield,
  FileText,
  Globe,
  BarChart,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { addSeoAuditAction } from "@/actions/seo-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type { SeoAuditInput, SeoAuditOutput } from "@/types/seo-workshop";

const seoFormSchema = z.object({
  url: z.string().url("Érvénytelen URL formátum"),
  targetKeywords: z.string().min(3, "Kulcsszavak minimum 3 karakter"),
  industry: z.enum([
    "ecommerce",
    "saas",
    "local-business",
    "content",
    "portfolio",
    "blog",
    "other",
  ]),
  targetAudience: z.string().min(5, "Célközönség minimum 5 karakter"),
  primaryGoal: z.enum([
    "organic-traffic",
    "conversions",
    "brand-awareness",
    "local-seo",
    "aee-optimization",
  ]),
  competitors: z.string().optional(),
  additionalRequirements: z.string().optional(),
});

type SeoFormValues = z.infer<typeof seoFormSchema>;

export default function SeoWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<SeoAuditOutput | null>(
    null
  );
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
  } = useForm<SeoFormValues>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      industry: "local-business",
      primaryGoal: "organic-traffic",
      competitors: "",
      additionalRequirements: "",
    },
  });

  const onSubmit = async (data: SeoFormValues) => {
    // Check access
    if (!isAdmin && !allowedTools.includes("seo_audit_ai_muhely")) {
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
      const input: SeoAuditInput = {
        url: data.url,
        targetKeywords: data.targetKeywords,
        industry: data.industry,
        targetAudience: data.targetAudience,
        primaryGoal: data.primaryGoal,
        competitors: data.competitors,
        additionalRequirements: data.additionalRequirements,
      };

      const result = await addSeoAuditAction(idToken, input);

      if (result.success && result.output) {
        setGeneratedOutput(result.output);
      } else {
        setError(result.error || "Hiba történt az audit során");
      }
    } catch (err) {
      setError("Hiba történt az audit során");
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
            Audit betöltése...
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
                      <Search className="w-5 h-5 text-bg-base" />
                    </Link>
                    <div>
                      <span className="text-xs uppercase font-black tracking-widest text-amber-500 block">
                        WebDude AI Studio
                      </span>
                      <span className="text-sm font-bold text-white block -mt-0.5">
                        SEO Audit AI Műhely
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
                        SEO Audit Generátor
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none font-mono">
                        AEO & SEO Audit
                      </h1>
                      <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Generálj professzionális SEO auditot Norbi 16+ éves CMS
                        és SEO szakértelmével. AEO optimalizáció, Schema.org
                        strukturált adatok és 95+ Lighthouse score cél.
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
                      {/* URL */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Globe className="w-4 h-4 text-amber-500" />
                          Weboldal URL
                        </label>
                        <input
                          {...register("url")}
                          type="url"
                          placeholder="https://pelda.hu"
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white placeholder-slate-500 transition-all text-sm"
                        />
                        {errors.url && (
                          <p className="text-red-400 text-xs font-mono">
                            {errors.url.message}
                          </p>
                        )}
                      </div>

                      {/* Target Keywords */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Target className="w-4 h-4 text-amber-500" />
                          Cél Kulcsszavak
                        </label>
                        <input
                          {...register("targetKeywords")}
                          placeholder="webfejlesztés, AI automatizáció, Next.js"
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white placeholder-slate-500 transition-all text-sm"
                        />
                        {errors.targetKeywords && (
                          <p className="text-red-400 text-xs font-mono">
                            {errors.targetKeywords.message}
                          </p>
                        )}
                      </div>

                      {/* Industry */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <BarChart className="w-4 h-4 text-amber-500" />
                          Iparág
                        </label>
                        <select
                          {...register("industry")}
                          className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-gray-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 text-white transition-all text-sm"
                        >
                          <option value="ecommerce">E-kereskedelem</option>
                          <option value="saas">SaaS szoftver</option>
                          <option value="local-business">
                            Helyi vállalkozás
                          </option>
                          <option value="content">Tartalom alapú</option>
                          <option value="portfolio">Portfólió</option>
                          <option value="blog">Blog</option>
                          <option value="other">Egyéb</option>
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
                          <option value="organic-traffic">
                            Organikus forgalom
                          </option>
                          <option value="conversions">Konverzió</option>
                          <option value="brand-awareness">
                            Márka tudatosság
                          </option>
                          <option value="local-seo">Helyi SEO</option>
                          <option value="aee-optimization">
                            AI keresőmotor (AEO)
                          </option>
                        </select>
                      </div>

                      {/* Competitors */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                          <Shield className="w-4 h-4 text-amber-500" />
                          Versenytársak (opcionális)
                        </label>
                        <input
                          {...register("competitors")}
                          placeholder="pelda1.hu, pelda2.hu"
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
                            Audit folyamatban...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            SEO Audit Generálása
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
                          <Search className="w-8 h-8 text-amber-500" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">
                          SEO Audit Eredmény
                        </h3>
                        <p className="text-sm text-slate-400 text-center max-w-md">
                          Töltsd ki az űrlapot a bal oldalon, és kattints a
                          &ldquo;SEO Audit Generálása&rdquo; gombra.
                        </p>
                      </div>
                    )}

                    {generatedOutput && (
                      <div className="space-y-4">
                        {/* Executive Summary */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <FileText className="w-4 h-4 text-amber-500" />
                              Vezetői Összefoglaló
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-white">
                                {generatedOutput.executiveSummary.overallScore}
                              </span>
                              <span className="text-xs text-slate-400">
                                /100
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
                              <p className="text-lg font-bold text-red-400">
                                {
                                  generatedOutput.executiveSummary
                                    .criticalIssues
                                }
                              </p>
                              <p className="text-xs text-slate-400">Kritikus</p>
                            </div>
                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-center">
                              <p className="text-lg font-bold text-yellow-400">
                                {generatedOutput.executiveSummary.warnings}
                              </p>
                              <p className="text-xs text-slate-400">
                                Figyelmeztetés
                              </p>
                            </div>
                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                              <p className="text-lg font-bold text-green-400">
                                {generatedOutput.executiveSummary.opportunities}
                              </p>
                              <p className="text-xs text-slate-400">
                                Lehetőség
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 mb-2">
                              Prioritás Akciók
                            </p>
                            <ul className="space-y-1">
                              {generatedOutput.executiveSummary.priorityActions.map(
                                (action, index) => (
                                  <li
                                    key={index}
                                    className="text-xs text-white flex items-start gap-2"
                                  >
                                    <CheckCircle className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                                    {action}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </motion.div>

                        {/* Technical SEO */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <Shield className="w-4 h-4 text-amber-500" />
                            Technikai SEO
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Lighthouse Score
                              </p>
                              <p className="text-sm text-white font-mono">
                                {
                                  generatedOutput.technicalSeo.performance
                                    .lighthouseScore
                                }
                              </p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <p className="text-xs text-slate-400 mb-1">
                                  LCP
                                </p>
                                <p className="text-xs text-white font-mono">
                                  {generatedOutput.technicalSeo.performance.lcp}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400 mb-1">
                                  FID
                                </p>
                                <p className="text-xs text-white font-mono">
                                  {generatedOutput.technicalSeo.performance.fid}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-400 mb-1">
                                  CLS
                                </p>
                                <p className="text-xs text-white font-mono">
                                  {generatedOutput.technicalSeo.performance.cls}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Javaslatok
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.technicalSeo.performance.recommendations.map(
                                  (rec, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white flex items-start gap-2"
                                    >
                                      <AlertTriangle className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                                      {rec}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </motion.div>

                        {/* Content Analysis */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <FileText className="w-4 h-4 text-amber-500" />
                            Tartalom Elemzés
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Elsődleges Kulcsszó
                              </p>
                              <p className="text-sm text-white font-mono">
                                {
                                  generatedOutput.contentAnalysis.keywordDensity
                                    .primary
                                }
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Másodlagos Kulcsszavak
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.contentAnalysis.keywordDensity.secondary.map(
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
                                Tartalom Rések
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.contentAnalysis.contentGaps.map(
                                  (gap, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white flex items-start gap-2"
                                    >
                                      <Lightbulb className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                                      {gap}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </motion.div>

                        {/* AEO Optimization */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-amber-500" />
                            AEO Optimalizáció
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Entitások
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.aeoOptimization.entityBasedSeo.entities.map(
                                  (entity, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono"
                                    >
                                      {entity}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Schema Típusok
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.aeoOptimization.structuredData.schemaTypes.map(
                                  (schema, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono"
                                    >
                                      {schema}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-1">
                                Javaslatok
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.aeoOptimization.answerEngineReadiness.recommendations.map(
                                  (rec, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-white flex items-start gap-2"
                                    >
                                      <CheckCircle className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                                      {rec}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </motion.div>

                        {/* Action Plan */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-amber-500" />
                            Akcióterv
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-400 mb-2">
                                Azonnali (High Impact)
                              </p>
                              <ul className="space-y-2">
                                {generatedOutput.actionPlan.immediate.map(
                                  (task, index) => (
                                    <li
                                      key={index}
                                      className="bg-bg-base/50 rounded-lg p-3 border border-gray-800"
                                    >
                                      <p className="text-xs text-white font-medium mb-1">
                                        {task.task}
                                      </p>
                                      <div className="flex gap-2 text-xs text-slate-400">
                                        <span>Impact: {task.impact}</span>
                                        <span>Effort: {task.effort}</span>
                                      </div>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs text-slate-400 mb-2">
                                Rövid Távú
                              </p>
                              <ul className="space-y-2">
                                {generatedOutput.actionPlan.shortTerm.map(
                                  (task, index) => (
                                    <li
                                      key={index}
                                      className="bg-bg-base/50 rounded-lg p-3 border border-gray-800"
                                    >
                                      <p className="text-xs text-white font-medium mb-1">
                                        {task.task}
                                      </p>
                                      <div className="flex gap-2 text-xs text-slate-400">
                                        <span>Impact: {task.impact}</span>
                                        <span>Effort: {task.effort}</span>
                                      </div>
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
