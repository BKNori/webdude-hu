"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { Sparkles, Loader2, Search, Target, Users, TrendingUp, Shield, FileText, Globe, BarChart, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";
import Link from "next/link";
import ToolAccessLock from "@/components/molecules/ToolAccessLock";
import CopyButton from "@/components/atoms/CopyButton";
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
    setValue,
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

  /** 1-Click példa: teszt-adatokkal tölti ki az űrlapot. */
  const loadExample = () => {
    setValue("url", "https://pelda-webshop.hu");
    setValue("targetKeywords", "weboldal készítés kecskemét, webshop fejlesztés");
    setValue("industry", "local-business");
    setValue("targetAudience", "Kecskeméti kis- és középvállalkozások");
    setValue("primaryGoal", "local-seo");
    setValue("competitors", "versenytars1.hu, versenytars2.hu");
    setValue(
      "additionalRequirements",
      "Fókusz a Google Térkép rangsorolásra és az AI válasz motorokra (AEO)."
    );
  };

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

  // Strict access gate: show a locked panel until auth resolves,
  // then block users without the required tool permission.
  if (!loading && !isAdmin && !allowedTools.includes("seo_audit_ai_muhely")) {
    return <ToolAccessLock toolName="SEO Audit AI Műhely" />;
  }

  return (
    <div className="text-[#0F172A] dark:text-[#F8FAFC]">
      {/* Loading State */}
      {loading && (
        <div className="min-h-[50vh] bg-transparent flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#0369A1] dark:text-[#00B5F1]" />
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-widest animate-pulse font-bold">
            Audit betöltése...
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
                        SEO Audit Generátor
                      </span>
                      <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-none font-mono">
                        AEO & SEO Audit
                      </h1>
                      <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl leading-relaxed">
                        Generálj professzionális SEO auditot Norbi 16+ éves CMS
                        és SEO szakértelmével. AEO optimalizáció, Schema.org
                        strukturált adatok és 95+ Lighthouse score cél.
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
                      {/* URL */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <Globe className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                          Weboldal URL
                        </label>
                        <input
                          {...register("url")}
                          type="url"
                          placeholder="https://pelda.hu"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:ring-2 focus:ring-sky-500/10 text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all text-sm"
                        />
                        {errors.url && (
                          <p className="text-red-600 dark:text-red-400 text-xs font-mono">
                            {errors.url.message}
                          </p>
                        )}
                      </div>

                      {/* Target Keywords */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <Target className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                          Cél Kulcsszavak
                        </label>
                        <input
                          {...register("targetKeywords")}
                          placeholder="webfejlesztés, AI automatizáció, Next.js"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:ring-2 focus:ring-sky-500/10 text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all text-sm"
                        />
                        {errors.targetKeywords && (
                          <p className="text-red-600 dark:text-red-400 text-xs font-mono">
                            {errors.targetKeywords.message}
                          </p>
                        )}
                      </div>

                      {/* Industry */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <BarChart className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                          Iparág
                        </label>
                        <select
                          {...register("industry")}
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:ring-2 focus:ring-sky-500/10 text-[#0F172A] dark:text-slate-100 transition-all text-sm"
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
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <Users className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                          Célközönség
                        </label>
                        <input
                          {...register("targetAudience")}
                          placeholder="Kis- és középvállalkozások, startupok"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:ring-2 focus:ring-sky-500/10 text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all text-sm"
                        />
                        {errors.targetAudience && (
                          <p className="text-red-600 dark:text-red-400 text-xs font-mono">
                            {errors.targetAudience.message}
                          </p>
                        )}
                      </div>

                      {/* Primary Goal */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <TrendingUp className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                          Elsődleges Cél
                        </label>
                        <select
                          {...register("primaryGoal")}
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:ring-2 focus:ring-sky-500/10 text-[#0F172A] dark:text-slate-100 transition-all text-sm"
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
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <Shield className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                          Versenytársak (opcionális)
                        </label>
                        <input
                          {...register("competitors")}
                          placeholder="pelda1.hu, pelda2.hu"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:ring-2 focus:ring-sky-500/10 text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all text-sm"
                        />
                      </div>

                      {/* Additional Requirements */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          <Lightbulb className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                          További Követelmények (opcionális)
                        </label>
                        <textarea
                          {...register("additionalRequirements")}
                          rows={3}
                          placeholder="Pl. Fókusz a helyi SEO-ra, Kecskemét régió..."
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 focus:border-[#0369A1] dark:focus:border-[#00B5F1] focus:ring-2 focus:ring-sky-500/10 text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all text-sm resize-none"
                        />
                      </div>

                      {/* 1-Click Példa Betöltése */}
                      <button
                        type="button"
                        onClick={loadExample}
                        className="w-full px-6 py-3 rounded-xl border border-sky-500/30 bg-sky-500/5 text-[#0369A1] dark:text-[#00B5F1] text-xs font-bold uppercase tracking-wider hover:bg-sky-500/15 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
                      >
                        Példa Audit Betöltése (1 kattintás)
                      </button>

                      {/* Submit Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isGenerating}
                        className="w-full px-6 py-4 rounded-xl bg-linear-to-r from-sky-500 to-violet-700 text-white font-bold text-sm uppercase tracking-wider hover:from-violet-700 hover:to-sky-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
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
                      <div className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center min-h-100">
                        <div className="w-16 h-16 rounded-full bg-sky-500/10 flex items-center justify-center mb-4">
                          <Search className="w-8 h-8 text-[#0369A1] dark:text-[#00B5F1]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-2">
                          SEO Audit Eredmény
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 text-center max-w-md">
                          Töltsd ki az űrlapot a bal oldalon, és kattints a
                          &ldquo;SEO Audit Generálása&rdquo; gombra.
                        </p>
                      </div>
                    )}

                    {generatedOutput && (
                      <div className="space-y-4">
                        {/* Teljes audit export gomb */}
                        <div className="flex justify-end">
                          <CopyButton
                            text={JSON.stringify(generatedOutput, null, 2)}
                            label="Teljes audit másolása"
                          />
                        </div>
                        {/* Executive Summary */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                              Vezetői Összefoglaló
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                {generatedOutput.executiveSummary.overallScore}
                              </span>
                              <span className="text-xs text-slate-600 dark:text-slate-400">
                                /100
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
                              <p className="text-lg font-bold text-red-600 dark:text-red-400">
                                {
                                  generatedOutput.executiveSummary
                                    .criticalIssues
                                }
                              </p>
                              <p className="text-xs text-slate-600 dark:text-slate-400">Kritikus</p>
                            </div>
                            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-center">
                              <p className="text-lg font-bold text-orange-400">
                                {generatedOutput.executiveSummary.warnings}
                              </p>
                              <p className="text-xs text-slate-600 dark:text-slate-400">
                                Figyelmeztetés
                              </p>
                            </div>
                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center">
                              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                                {generatedOutput.executiveSummary.opportunities}
                              </p>
                              <p className="text-xs text-slate-600 dark:text-slate-400">
                                Lehetőség
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                              Prioritás Akciók
                            </p>
                            <ul className="space-y-1">
                              {generatedOutput.executiveSummary.priorityActions.map(
                                (action, index) => (
                                  <li
                                    key={index}
                                    className="text-xs text-[#0F172A] dark:text-[#F8FAFC] flex items-start gap-2"
                                  >
                                    <CheckCircle className="w-3 h-3 text-[#0369A1] dark:text-[#00B5F1] mt-0.5 flex-shrink-0" />
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
                          className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
                            <Shield className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                            Technikai SEO
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Lighthouse Score
                              </p>
                              <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC] font-mono">
                                {
                                  generatedOutput.technicalSeo.performance
                                    .lighthouseScore
                                }
                              </p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                  LCP
                                </p>
                                <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] font-mono">
                                  {generatedOutput.technicalSeo.performance.lcp}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                  FID
                                </p>
                                <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] font-mono">
                                  {generatedOutput.technicalSeo.performance.fid}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                  CLS
                                </p>
                                <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] font-mono">
                                  {generatedOutput.technicalSeo.performance.cls}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Javaslatok
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.technicalSeo.performance.recommendations.map(
                                  (rec, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-[#0F172A] dark:text-[#F8FAFC] flex items-start gap-2"
                                    >
                                      <AlertTriangle className="w-3 h-3 text-[#0369A1] dark:text-[#00B5F1] mt-0.5 flex-shrink-0" />
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
                          className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                            Tartalom Elemzés
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Elsődleges Kulcsszó
                              </p>
                              <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC] font-mono">
                                {
                                  generatedOutput.contentAnalysis.keywordDensity
                                    .primary
                                }
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Másodlagos Kulcsszavak
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.contentAnalysis.keywordDensity.secondary.map(
                                  (keyword, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-sky-500/10 border border-slate-200 dark:border-slate-800 text-[#0369A1] dark:text-[#00B5F1] text-xs font-mono"
                                    >
                                      {keyword}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Tartalom Rések
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.contentAnalysis.contentGaps.map(
                                  (gap, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-[#0F172A] dark:text-[#F8FAFC] flex items-start gap-2"
                                    >
                                      <Lightbulb className="w-3 h-3 text-[#0369A1] dark:text-[#00B5F1] mt-0.5 flex-shrink-0" />
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
                          className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                            AEO Optimalizáció
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Entitások
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.aeoOptimization.entityBasedSeo.entities.map(
                                  (entity, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-sky-500/10 border border-slate-200 dark:border-slate-800 text-[#0369A1] dark:text-[#00B5F1] text-xs font-mono"
                                    >
                                      {entity}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Schema Típusok
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {generatedOutput.aeoOptimization.structuredData.schemaTypes.map(
                                  (schema, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 rounded bg-sky-500/10 border border-slate-200 dark:border-slate-800 text-[#0369A1] dark:text-[#00B5F1] text-xs font-mono"
                                    >
                                      {schema}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                                Javaslatok
                              </p>
                              <ul className="space-y-1">
                                {generatedOutput.aeoOptimization.answerEngineReadiness.recommendations.map(
                                  (rec, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-[#0F172A] dark:text-[#F8FAFC] flex items-start gap-2"
                                    >
                                      <CheckCircle className="w-3 h-3 text-[#0369A1] dark:text-[#00B5F1] mt-0.5 flex-shrink-0" />
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
                          className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
                        >
                          <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                            Akcióterv
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                                Azonnali (High Impact)
                              </p>
                              <ul className="space-y-2">
                                {generatedOutput.actionPlan.immediate.map(
                                  (task, index) => (
                                    <li
                                      key={index}
                                      className="bg-slate-50 dark:bg-[#0B1120] rounded-lg p-3 border border-slate-200 dark:border-slate-800"
                                    >
                                      <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] font-medium mb-1">
                                        {task.task}
                                      </p>
                                      <div className="flex gap-2 text-xs text-slate-600 dark:text-slate-400">
                                        <span>Impact: {task.impact}</span>
                                        <span>Effort: {task.effort}</span>
                                      </div>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                                Rövid Távú
                              </p>
                              <ul className="space-y-2">
                                {generatedOutput.actionPlan.shortTerm.map(
                                  (task, index) => (
                                    <li
                                      key={index}
                                      className="bg-slate-50 dark:bg-[#0B1120] rounded-lg p-3 border border-slate-200 dark:border-slate-800"
                                    >
                                      <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] font-medium mb-1">
                                        {task.task}
                                      </p>
                                      <div className="flex gap-2 text-xs text-slate-600 dark:text-slate-400">
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
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
