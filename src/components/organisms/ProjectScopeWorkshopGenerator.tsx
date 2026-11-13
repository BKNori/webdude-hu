"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import {
  AlertTriangle,
  Loader2,
  ArrowLeft,
  ClipboardList,
  Layers,
  Map,
  Package,
  Route,
  ShieldCheck,
  Mail,
  CheckCircle2,
  Bot,
} from "lucide-react";
import Link from "next/link";
import ToolAccessLock from "@/components/molecules/ToolAccessLock";
import PresetChips from "@/components/molecules/PresetChips";
import CopyButton from "@/components/atoms/CopyButton";
import type { PresetOption } from "@/lib/workshop-presets";
import { auth } from "@/lib/firebase";
import { addProjectScopeGenerationAction } from "@/actions/project-scope-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  ProjectScopeInput,
  ProjectScopeOutput,
  ProjectType,
  RecommendedStack,
} from "@/types/project-scope-workshop";

const projectScopeFormSchema = z.object({
  clientName: z.string().min(2, "Ügyfélnév minimum 2 karakter"),
  industry: z.string().min(5, "Iparág minimum 5 karakter"),
  rawClientBrief: z
    .string()
    .min(20, "A brief minimum 20 karakter legyen"),
  projectType: z.enum([
    "corporate_website",
    "ecommerce_webshop",
    "custom_webapp_portal",
    "website_redesign_migration",
    "landing_funnel",
    "full_digital_launch",
  ]),
  recommendedStack: z.enum([
    "nextjs_firebase",
    "wordpress_custom",
    "woocommerce_erp",
    "hybrid_headless",
    "ai_auto_recommend",
  ]),
  requiredIntegrations: z.string().optional(),
  timelinePreference: z.string().optional(),
});

type ProjectScopeFormValues = z.infer<typeof projectScopeFormSchema>;

const PROJECT_TYPE_OPTIONS: PresetOption[] = [
  {
    id: "corporate_website",
    label: "Céges Weboldal & Lead-Gen",
    promptHint: "Premium corporate website lead generation",
  },
  {
    id: "ecommerce_webshop",
    label: "Webáruház (WooCommerce / Next.js)",
    promptHint: "Automated webshop ERP sync",
  },
  {
    id: "custom_webapp_portal",
    label: "Webalkalmazás / Ügyfélportál",
    promptHint: "Custom webapp portal AI integration",
  },
  {
    id: "website_redesign_migration",
    label: "Weboldal Felújítás & Migráció",
    promptHint: "Redesign speed SEO migration",
  },
  {
    id: "landing_funnel",
    label: "Kampány Landing & Funnel",
    promptHint: "High-conversion landing sales funnel",
  },
  {
    id: "full_digital_launch",
    label: "Teljes Digitális Indulás",
    promptHint: "Logo brand website SEO launch",
  },
];

const STACK_OPTIONS: PresetOption[] = [
  {
    id: "nextjs_firebase",
    label: "Next.js 16 + Firebase",
    promptHint: "Next.js 16 React 19 Firebase stack",
  },
  {
    id: "wordpress_custom",
    label: "Egyedi WordPress",
    promptHint: "Custom WordPress Gutenberg 95+ PageSpeed",
  },
  {
    id: "woocommerce_erp",
    label: "WooCommerce + ERP Szinkron",
    promptHint: "WooCommerce ERP invoicing logistics sync",
  },
  {
    id: "hybrid_headless",
    label: "Headless WP + Next.js",
    promptHint: "Headless WordPress Next.js frontend",
  },
  {
    id: "ai_auto_recommend",
    label: "AI Rendszermérnök Javasol",
    promptHint: "AI recommends stack from brief",
  },
];

/** Gyors integrációs chipek — kattintásra hozzáfűzi a mezőhöz. */
const INTEGRATION_CHIPS = [
  "Kulcs-Soft / Számlázz.hu / Billingo ERP",
  "Foxpost / MPL API",
  "Google Merchant Center",
  "RankMath / Technikai SEO + AEO",
  "AI Chatbot",
  "Stripe Bankkártyás Fizetés",
  "Többnyelvűség",
  "Helyi SEO (Google Business Profile)",
];

const TIMELINE_OPTIONS: PresetOption[] = [
  { id: "Sürgős (2–3 hét)", label: "Sürgős (2–3 hét)", promptHint: "urgent" },
  { id: "Normál (4–6 hét)", label: "Normál (4–6 hét)", promptHint: "normal" },
  { id: "Komplex Enterprise (6–10 hét)", label: "Komplex (6–10 hét)", promptHint: "complex" },
];

/** 1-kattintásos iparági presetek. */
const PROJECT_PRESETS: Array<{
  label: string;
  values: Partial<ProjectScopeFormValues>;
}> = [
  {
    label: "B2B/B2C Webshop + ERP",
    values: {
      clientName: "BTShop Kft.",
      industry: "Ipari eszközök és kiegészítők B2B/B2C kereskedelme",
      rawClientBrief:
        "3000+ termékes webshopot kérünk WooCommerce vagy Next.js Commerce alapokon. Szükséges: Kulcs-Soft ERP szinkron a termékekkel és rendeléssel, Foxpost/MPL csomagfeladás, Stripe bankkártyás fizetés, Google Merchant Center feed, vevői fiók + rendelésselőzmény, e-mail sablonok, és reszponzív mobil-first dizájn. Fontos a betöltési sebesség és az SEO (minden termékoldal structured data-val).",
      projectType: "ecommerce_webshop",
      recommendedStack: "nextjs_firebase",
      requiredIntegrations:
        "Kulcs-Soft / Számlázz.hu ERP, Foxpost / MPL API, Google Merchant Center, Stripe, Technikai SEO + AEO",
      timelinePreference: "Komplex Enterprise (6–10 hét)",
    },
  },
  {
    label: "Magánklinika Weboldal + SEO",
    values: {
      clientName: "Dr. Nagy Albert Magánklinika",
      industry: "Magánorvosi rendelő és esztétikai beavatkozások",
      rawClientBrief:
        "Új céges weboldalt szeretnénk a magánklinikának: szolgáltatásoldalak (fogászat, esztétika, labor), orvos bemutatkozó oldalak, online időpontfoglaló naptár integráció, páciens vélemények, helyi SEO (Google Business Profile, Maps), és modern, bizalomgerjesztő dizájn. Mobilon kell jól működnie.",
      projectType: "corporate_website",
      recommendedStack: "wordpress_custom",
      requiredIntegrations:
        "Google Business Profile / Maps, Időpontfoglaló API, RankMath / Technikai SEO + AEO, Többnyelvűség (HU/EN)",
      timelinePreference: "Normál (4–6 hét)",
    },
  },
  {
    label: "WordPress Felújítás & Migráció",
    values: {
      clientName: "Érték Vezetéstechnika Kft.",
      industry: "Vezetéstechnikai tréningek és oktatás",
      rawClientBrief:
        "A jelenlegi WordPress oldalunk 8 éves, lassú, tele vírusokkal és elavult pluginekkel. Szeretnénk teljes felújítást: migráció a legfrissebb WordPress/Gutenberg-re, 95+ PageSpeed, biztonsági audit és takarítás, tartalom újraszervezése, technikai SEO javítás (címkék, meta, sitemap), és AEO-optimalizált FAQ oldalak az AI keresőknek.",
      projectType: "website_redesign_migration",
      recommendedStack: "wordpress_custom",
      requiredIntegrations:
        "301 Redirect térkép, RankMath / Technikai SEO + AEO, Biztonsági audit, Backup",
      timelinePreference: "Normál (4–6 hét)",
    },
  },
];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/60 text-slate-200 text-sm placeholder:text-slate-600 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#00B5F1]/50 focus:border-[#00B5F1]/40 transition-all";
const labelClass =
  "block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5";

export default function ProjectScopeWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<ProjectScopeOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [profileReady, setProfileReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allowedTools, setAllowedTools] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProjectScopeFormValues>({
    resolver: zodResolver(projectScopeFormSchema),
    defaultValues: {
      projectType: "corporate_website",
      recommendedStack: "ai_auto_recommend",
    } as Partial<ProjectScopeFormValues>,
  });

  const projectTypeValue = useWatch({ control, name: "projectType" });
  const stackValue = useWatch({ control, name: "recommendedStack" });
  const integrationsValue = useWatch({ control, name: "requiredIntegrations" });
  const timelineValue = useWatch({ control, name: "timelinePreference" });

  useEffect(() => {
    if (!auth) {
      queueMicrotask(() => setProfileReady(true));
      return;
    }
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setProfileReady(true);
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
        // Profil hiba nem blokkolja a generátort.
      } finally {
        setProfileReady(true);
      }
    });
    return unsub;
  }, []);

  const loadPreset = useCallback(
    (preset: (typeof PROJECT_PRESETS)[number]) => {
      Object.entries(preset.values).forEach(([key, value]) => {
        setValue(key as keyof ProjectScopeFormValues, value as never);
      });
      setError(null);
    },
    [setValue]
  );

  const toggleIntegration = useCallback(
    (chip: string) => {
      const current = (integrationsValue ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const next = current.includes(chip)
        ? current.filter((c) => c !== chip)
        : [...current, chip];
      setValue("requiredIntegrations", next.join(", "), { shouldDirty: true });
    },
    [integrationsValue, setValue]
  );

  const onSubmit = async (data: ProjectScopeFormValues) => {
    if (!auth?.currentUser) {
      setError("Kérlek, jelentkezz be a generáláshoz!");
      return;
    }
    setIsGenerating(true);
    setError(null);

    try {
      const token = await auth.currentUser.getIdToken(true);
      const input: ProjectScopeInput = {
        clientName: data.clientName,
        industry: data.industry,
        rawClientBrief: data.rawClientBrief,
        projectType: data.projectType as ProjectType,
        recommendedStack: data.recommendedStack as RecommendedStack,
        requiredIntegrations: data.requiredIntegrations || undefined,
        timelinePreference: data.timelinePreference || undefined,
      };
      const res = await addProjectScopeGenerationAction(token, input);
      if (res.success && res.output) {
        setGeneratedOutput(res.output);
      } else {
        setError(res.error || "Hiba történt a generálás során.");
      }
    } catch {
      setError("Kapcsolódási hiba a generálás során.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!profileReady) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#00B5F1]" />
        <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          Projekttervező betöltése...
        </p>
      </div>
    );
  }

  // Strict access gate: block users without the required tool permission.
  if (!isAdmin && !allowedTools.includes("project_scope_ai_muhely")) {
    return <ToolAccessLock toolName="Projekttervező AI Műhely" />;
  }

  return (
    <div className="space-y-8">
      {/* Fejléc */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/portal/ai-muhely"
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#00B5F1] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Vissza a Műhelybe
        </Link>
        {isAdmin && (
          <span className="text-[10px] font-black uppercase tracking-widest text-[#a78bfa] border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-2 py-1 rounded-full">
            Szuperadmin
          </span>
        )}
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#00B5F1]">
          Brief → Architektúra → Sitemap → Árajánlat Stúdió
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Weboldal & Webshop Projekttervező
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl">
          Nyers ügyfél-briefből teljes oldaltérkép, SEO/AEO architektúra, 3
          csomagszint és kész árajánlat-kísérőlevél — zéró fix árral.
        </p>
      </div>

      {/* 1-Click Presetek */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PROJECT_PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => loadPreset(preset)}
            className="px-4 py-3 rounded-xl border border-[#00B5F1]/25 bg-[#00B5F1]/5 text-left text-xs font-bold text-[#00B5F1] hover:bg-[#00B5F1]/15 hover:border-[#00B5F1]/50 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Ügyfél + Brief */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-5">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-[#00B5F1]" />
            Ügyfél & Nyers Brief
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Ügyfél / Cégnév *</label>
              <input
                {...register("clientName")}
                placeholder="Pl. Dr. Nagy Albert Magánklinika"
                className={inputClass}
              />
              {errors.clientName && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.clientName.message}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>Iparág *</label>
              <input
                {...register("industry")}
                placeholder="Pl. Magánorvosi rendelő és esztétikai beavatkozások"
                className={inputClass}
              />
              {errors.industry && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.industry.message}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>
                Nyers ügyfél-igény / Brief (e-mail szöveg, célok) *
              </label>
              <textarea
                {...register("rawClientBrief")}
                rows={6}
                placeholder="Illeszd be az ügyfél e-mailjét vagy igénylistáját: funkciók, integrációk, határidő, elvárások..."
                className={`${inputClass} resize-y`}
              />
              {errors.rawClientBrief && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.rawClientBrief.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Projekttípus & Stack */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#00B5F1]" />
            Projekttípus & Technológia
          </h3>
          <PresetChips
            label="Projekttípus"
            options={PROJECT_TYPE_OPTIONS}
            value={projectTypeValue ?? "corporate_website"}
            onChange={(id) => id && setValue("projectType", id as ProjectType)}
          />
          <PresetChips
            label="Technológiai stack"
            options={STACK_OPTIONS}
            value={stackValue ?? "ai_auto_recommend"}
            onChange={(id) =>
              id && setValue("recommendedStack", id as RecommendedStack)
            }
          />
          <PresetChips
            label="Ütemezési cél"
            options={TIMELINE_OPTIONS}
            value={timelineValue ?? null}
            onChange={(id) => setValue("timelinePreference", id ?? undefined)}
          />
        </div>

        {/* Integrációk */}
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#00B5F1]" />
            Integrációk & Fókuszok
          </h3>
          <div className="flex flex-wrap gap-2">
            {INTEGRATION_CHIPS.map((chip) => {
              const active = (integrationsValue ?? "")
                .split(",")
                .map((s) => s.trim())
                .includes(chip);
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => toggleIntegration(chip)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                    active
                      ? "bg-[#00B5F1]/15 border-[#00B5F1]/60 text-[#00B5F1]"
                      : "bg-slate-950/50 border-slate-800 text-slate-400 hover:border-[#00B5F1]/40 hover:text-slate-200"
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
          <div>
            <label className={labelClass}>Egyéb integráció / megjegyzés</label>
            <input
              {...register("requiredIntegrations")}
              placeholder="Pl. e-mail marketing, hírlevél feliratkozás, Google Analytics 4"
              className={inputClass}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/5 border border-red-500/40 backdrop-blur-xl shadow-[0_0_24px_rgba(239,68,68,0.15)] text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-4 rounded-xl bg-linear-to-r from-[#075985] to-[#5B21B6] text-white font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Projekttervező dolgozik...
            </>
          ) : (
            <>
              <ClipboardList className="w-5 h-5" />
              Projekt Terv & Árajánlat Generálása
            </>
          )}
        </button>
      </form>

      {/* ── OUTPUT: Vizuális Kimeneti Stúdió ─────────────────────────── */}
      {generatedOutput && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 pt-4"
        >
          {/* Vezetői összefoglaló */}
          <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white">
              {generatedOutput.executiveSummary.projectTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {(
                [
                  ["Üzleti cél", generatedOutput.executiveSummary.businessObjective],
                  ["Konverziós cél", generatedOutput.executiveSummary.targetConversionGoal],
                  ["Ajánlott stack", generatedOutput.executiveSummary.recommendedTechStack],
                ] as const
              ).map(([label, text]) => (
                <p
                  key={label}
                  className="text-slate-400 leading-relaxed bg-slate-950/50 rounded-xl p-3 border border-slate-800/60"
                >
                  <strong className="text-[#00B5F1]">{label}: </strong>
                  {text}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {generatedOutput.executiveSummary.techStackClientBenefits.map(
                (b, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-800 bg-slate-950/50 p-3"
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Technológia
                    </p>
                    <p className="text-xs font-bold text-white mt-0.5">
                      {b.technology}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {b.clientBenefit}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Sitemap & SEO/AEO architektúra */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Map className="w-5 h-5 text-[#00B5F1]" />
              Oldaltérkép & SEO/AEO Architektúra
            </h3>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {generatedOutput.sitemapAndSeoArchitecture.map((page, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-mono text-[#00B5F1] font-bold">
                        {page.urlSlug}
                      </p>
                      <h4 className="text-sm font-black text-white">
                        {page.pageName}
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        {page.pagePurpose}
                      </p>
                    </div>
                    <CopyButton
                      text={`${page.pageName} — ${page.urlSlug}\nH1: ${page.recommendedH1}\nSzekciók: ${page.keySections.join(", ")}\nSchema: ${page.schemaOrgTypes.join(", ")}\nAEO fókusz: ${page.aeoDirectAnswerFocus}`}
                      label="Oldal másolása"
                    />
                  </div>
                  <p className="text-xs text-slate-300">
                    <strong className="text-[#00B5F1]">H1: </strong>
                    {page.recommendedH1}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {page.schemaOrgTypes.map((s) => (
                      <span
                        key={s}
                        className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#7C3AED]/15 text-[#a78bfa] border border-[#7C3AED]/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500">
                    <strong className="text-slate-400">Szekciók: </strong>
                    {page.keySections.join(" • ")}
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    AEO: {page.aeoDirectAnswerFocus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3 szintű csomag */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-[#00B5F1]" />
              Ajánlati Csomagok (3 szint)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {generatedOutput.tierPackages.map((tier, idx) => {
                const isPro = tier.tierName.includes("Pro");
                return (
                  <div
                    key={idx}
                    className={`rounded-3xl border p-6 space-y-4 ${
                      isPro
                        ? "border-[#00B5F1]/50 bg-slate-900/80 ring-1 ring-[#00B5F1]/30"
                        : "border-slate-800 bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-white">
                        {tier.tierName}
                      </h4>
                      {tier.badge && (
                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#00B5F1]/15 text-[#00B5F1] border border-[#00B5F1]/40">
                          {tier.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {tier.idealFor}
                    </p>
                    <ul className="space-y-1.5">
                      {tier.deliverables.map((d, i) => (
                        <li
                          key={i}
                          className="text-xs text-slate-300 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <p className="text-[10px] text-slate-500">
                      <strong className="text-slate-400">Integrációk: </strong>
                      {tier.includedIntegrations.join(", ")}
                    </p>
                    <p className="text-[10px] font-mono text-slate-400">
                      {tier.estimatedWeeks}
                    </p>
                    <p className="text-xs font-bold text-white">
                      {tier.priceLabel}
                    </p>
                    <CopyButton
                      text={`${tier.tierName}${tier.badge ? ` (${tier.badge})` : ""}\n${tier.idealFor}\n${tier.deliverables.map((d) => `• ${d}`).join("\n")}\nIntegrációk: ${tier.includedIntegrations.join(", ")}\nÁtfutás: ${tier.estimatedWeeks}\nÁr: ${tier.priceLabel}`}
                      label="Csomag másolása"
                    />
                    <p className="text-[10px] text-[#00B5F1] font-semibold">
                      {tier.ctaText}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Roadmap */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Route className="w-5 h-5 text-[#00B5F1]" />
              5 Fázisú Mérföldkő & Ütemterv
            </h3>
            <div className="space-y-3">
              {generatedOutput.milestoneRoadmap.map((phase) => (
                <div
                  key={phase.phaseNumber}
                  className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-2xl p-5 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#00B5F1]/10 border border-[#00B5F1]/30 text-[#00B5F1] flex items-center justify-center font-black text-sm shrink-0">
                    {phase.phaseNumber}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-black text-white">
                        {phase.phaseTitle}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500">
                        {phase.durationWeeks}
                      </span>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                      {phase.tasks.map((t, i) => (
                        <li
                          key={i}
                          className="text-[11px] text-slate-400 flex items-start gap-2"
                        >
                          <span className="text-[#00B5F1] mt-0.5">•</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                    <p className="text-[10px] text-emerald-400 font-semibold">
                      Ügyfélnek: {phase.clientDeliverable}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kockázatok */}
          <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00B5F1]" />
              Kockázatok & Előfeltételek
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {generatedOutput.riskAndPreconditions.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/50 rounded-xl p-3 border border-slate-800/60"
                >
                  <span className="w-5 h-5 rounded-full bg-[#00B5F1]/15 text-[#00B5F1] flex items-center justify-center text-[10px] font-black shrink-0">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Ügyfél levél */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-[#00B5F1]/30 rounded-3xl p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#00B5F1]" />
              Kész Árajánlat-Kísérőlevél (Balog Norbert)
            </h3>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <pre className="whitespace-pre-wrap text-sm text-slate-300 font-sans leading-relaxed">
                {generatedOutput.clientProposalEmail}
              </pre>
            </div>
            <CopyButton
              text={generatedOutput.clientProposalEmail}
              label="Levél másolása"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
