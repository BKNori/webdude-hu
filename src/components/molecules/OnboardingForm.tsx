"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@/lib/firebase";
import { submitOnboardingDataAction } from "@/actions/onboarding";
import {
  designOnboardingSchema,
  techOnboardingSchema,
  aiOnboardingSchema,
  croOnboardingSchema,
  OnboardingCategory,
} from "@/types/onboarding";
import {
  Link as LinkIcon,
  Palette,
  FileText,
  Server,
  Cpu,
  Users,
  Target,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Button from "@/components/atoms/Button";

interface OnboardingFormProps {
  orderId: string;
  category: OnboardingCategory;
  onSubmitSuccess?: () => void;
}

const schemaMap = {
  design: designOnboardingSchema,
  tech: techOnboardingSchema,
  ai: aiOnboardingSchema,
  cro: croOnboardingSchema,
};

export default function OnboardingForm({
  orderId,
  category,
  onSubmitSuccess,
}: OnboardingFormProps) {
  const schema = schemaMap[category];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, string>>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: Record<string, string>) => {
    setLoading(true);
    setError("");

    try {
      if (!auth) {
        setError("A hitelesítési rendszer nem érhető el.");
        setLoading(false);
        return;
      }
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError("A beküldéshez be kell jelentkezned.");
        setLoading(false);
        return;
      }

      const idToken = await currentUser.getIdToken();
      const res = await submitOnboardingDataAction(
        idToken,
        orderId,
        category,
        data
      );

      if (res.success) {
        setSuccess(true);
        if (onSubmitSuccess) {
          setTimeout(() => {
            onSubmitSuccess();
          }, 1500);
        }
      } else {
        setError(res.error || "Hiba történt az adatok mentésekor.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Hálózati hiba lépett fel."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-bg-elevated/30 border border-emerald-500/20 backdrop-blur-md rounded-2xl p-8 text-center space-y-4 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mx-auto">
          <CheckCircle className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <div className="space-y-1">
          <h4 className="text-lg font-bold text-white font-mono">
            Igények sikeresen leadva!
          </h4>
          <p className="text-xs text-slate-400">
            A WebDude megkezdte az adatok feldolgozását és a projekt
            előkészítését.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-bg-elevated/30 backdrop-blur-md border border-bg-elevated/50 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl"
    >
      <div className="space-y-1">
        <h4 className="text-lg font-bold text-white font-mono uppercase tracking-wide">
          Projekt onboarding adatlap
        </h4>
        <p className="text-xs text-slate-400">
          Kérlek, add meg a kivitelezéshez szükséges alapvető információkat.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-xs text-red-500">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-4">
        {/* DESIGN fields */}
        {category === "design" && (
          <>
            <div className="space-y-1.5">
              <label
                htmlFor="websiteUrl"
                className="text-xs font-bold text-slate-300 block"
              >
                Meglévő weboldal URL (opcionális)
              </label>
              <div className="relative">
                <LinkIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                  strokeWidth={1.5}
                />
                <input
                  id="websiteUrl"
                  type="text"
                  placeholder="pl. https://pelda.hu"
                  disabled={loading}
                  {...register("websiteUrl")}
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent/50 border border-bg-elevated/80 rounded-xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all disabled:opacity-50"
                />
              </div>
              {errors.websiteUrl && (
                <p className="text-red-500 text-[10px] font-semibold">
                  {errors.websiteUrl.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="brandColors"
                className="text-xs font-bold text-slate-300 block"
              >
                Arculati színek / Stílus elképzelések
              </label>
              <div className="relative">
                <Palette
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                  strokeWidth={1.5}
                />
                <input
                  id="brandColors"
                  type="text"
                  placeholder="pl. Sötétkék és arany, modern sötét téma"
                  disabled={loading}
                  {...register("brandColors")}
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent/50 border border-bg-elevated/80 rounded-xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all disabled:opacity-50"
                />
              </div>
              {errors.brandColors && (
                <p className="text-red-500 text-[10px] font-semibold">
                  {errors.brandColors.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="designGuidelines"
                className="text-xs font-bold text-slate-300 block"
              >
                Dizájn Irányelvek / Referencia Linkek
              </label>
              <div className="relative">
                <FileText
                  className="absolute left-4 top-4 w-4 h-4 text-slate-500"
                  strokeWidth={1.5}
                />
                <textarea
                  id="designGuidelines"
                  rows={3}
                  placeholder="Milyen stílust szeretnél követni? Küldhetsz linkeket is."
                  disabled={loading}
                  {...register("designGuidelines")}
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent/50 border border-bg-elevated/80 rounded-xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all disabled:opacity-50 resize-none"
                />
              </div>
              {errors.designGuidelines && (
                <p className="text-red-500 text-[10px] font-semibold">
                  {errors.designGuidelines.message}
                </p>
              )}
            </div>
          </>
        )}

        {/* TECH fields */}
        {category === "tech" && (
          <>
            <div className="space-y-1.5">
              <label
                htmlFor="websiteUrl"
                className="text-xs font-bold text-slate-300 block"
              >
                Optimalizálandó weboldal URL
              </label>
              <div className="relative">
                <LinkIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                  strokeWidth={1.5}
                />
                <input
                  id="websiteUrl"
                  type="text"
                  placeholder="pl. https://pelda.hu"
                  disabled={loading}
                  {...register("websiteUrl")}
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent/50 border border-bg-elevated/80 rounded-xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all disabled:opacity-50"
                />
              </div>
              {errors.websiteUrl && (
                <p className="text-red-500 text-[10px] font-semibold">
                  {errors.websiteUrl.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="hostingProvider"
                className="text-xs font-bold text-slate-300 block"
              >
                Tárhelyszolgáltató (pl. Rackhost, Sybell)
              </label>
              <div className="relative">
                <Server
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                  strokeWidth={1.5}
                />
                <input
                  id="hostingProvider"
                  type="text"
                  placeholder="pl. Sybell cPanel"
                  disabled={loading}
                  {...register("hostingProvider")}
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent/50 border border-bg-elevated/80 rounded-xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all disabled:opacity-50"
                />
              </div>
              {errors.hostingProvider && (
                <p className="text-red-500 text-[10px] font-semibold">
                  {errors.hostingProvider.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="techStack"
                className="text-xs font-bold text-slate-300 block"
              >
                Használt CMS / Technológia (pl. WordPress, React)
              </label>
              <div className="relative">
                <Cpu
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                  strokeWidth={1.5}
                />
                <input
                  id="techStack"
                  type="text"
                  placeholder="pl. WordPress 6.x + Elementor"
                  disabled={loading}
                  {...register("techStack")}
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent/50 border border-bg-elevated/80 rounded-xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all disabled:opacity-50"
                />
              </div>
              {errors.techStack && (
                <p className="text-red-500 text-[10px] font-semibold">
                  {errors.techStack.message}
                </p>
              )}
            </div>
          </>
        )}

        {/* AI fields */}
        {category === "ai" && (
          <>
            <div className="space-y-1.5">
              <label
                htmlFor="targetAudience"
                className="text-xs font-bold text-slate-300 block"
              >
                Célközönség leírása (Kiknek szól a tartalom / chatbot?)
              </label>
              <div className="relative">
                <Users
                  className="absolute left-4 top-4 w-4 h-4 text-slate-500"
                  strokeWidth={1.5}
                />
                <textarea
                  id="targetAudience"
                  rows={3}
                  placeholder="pl. Hazai KKV döntéshozók, akik automatizálni szeretnének"
                  disabled={loading}
                  {...register("targetAudience")}
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent/50 border border-bg-elevated/80 rounded-xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all disabled:opacity-50 resize-none"
                />
              </div>
              {errors.targetAudience && (
                <p className="text-red-500 text-[10px] font-semibold">
                  {errors.targetAudience.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="preferredTopics"
                className="text-xs font-bold text-slate-300 block"
              >
                Preferált témák / Kulcsszavak listája
              </label>
              <div className="relative">
                <FileText
                  className="absolute left-4 top-4 w-4 h-4 text-slate-500"
                  strokeWidth={1.5}
                />
                <textarea
                  id="preferredTopics"
                  rows={3}
                  placeholder="pl. AI chatbotok, cPanel beállítások, SEO optimalizálás árak"
                  disabled={loading}
                  {...register("preferredTopics")}
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent/50 border border-bg-elevated/80 rounded-xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all disabled:opacity-50 resize-none"
                />
              </div>
              {errors.preferredTopics && (
                <p className="text-red-500 text-[10px] font-semibold">
                  {errors.preferredTopics.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="aiObjectives"
                className="text-xs font-bold text-slate-300 block"
              >
                Mit szeretnél elérni az AI megoldással?
              </label>
              <div className="relative">
                <Target
                  className="absolute left-4 top-4 w-4 h-4 text-slate-500"
                  strokeWidth={1.5}
                />
                <textarea
                  id="aiObjectives"
                  rows={3}
                  placeholder="pl. Azonnali válaszadás az oldalon, ügyfélszerzési konverzió növelése"
                  disabled={loading}
                  {...register("aiObjectives")}
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent/50 border border-bg-elevated/80 rounded-xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all disabled:opacity-50 resize-none"
                />
              </div>
              {errors.aiObjectives && (
                <p className="text-red-500 text-[10px] font-semibold">
                  {errors.aiObjectives.message}
                </p>
              )}
            </div>
          </>
        )}

        {/* CRO fields */}
        {category === "cro" && (
          <>
            <div className="space-y-1.5">
              <label
                htmlFor="websiteUrl"
                className="text-xs font-bold text-slate-300 block"
              >
                Auditálandó Landing Page URL
              </label>
              <div className="relative">
                <LinkIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                  strokeWidth={1.5}
                />
                <input
                  id="websiteUrl"
                  type="text"
                  placeholder="pl. https://pelda.hu/landing"
                  disabled={loading}
                  {...register("websiteUrl")}
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent/50 border border-bg-elevated/80 rounded-xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all disabled:opacity-50"
                />
              </div>
              {errors.websiteUrl && (
                <p className="text-red-500 text-[10px] font-semibold">
                  {errors.websiteUrl.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="primaryGoal"
                className="text-xs font-bold text-slate-300 block"
              >
                Mi az oldal elsődleges célja? (pl. feliratkozás, ajánlatkérés)
              </label>
              <div className="relative">
                <Target
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                  strokeWidth={1.5}
                />
                <input
                  id="primaryGoal"
                  type="text"
                  placeholder="pl. Ingyenes konzultáció regisztráció"
                  disabled={loading}
                  {...register("primaryGoal")}
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent/50 border border-bg-elevated/80 rounded-xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all disabled:opacity-50"
                />
              </div>
              {errors.primaryGoal && (
                <p className="text-red-500 text-[10px] font-semibold">
                  {errors.primaryGoal.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="competitors"
                className="text-xs font-bold text-slate-300 block"
              >
                Fő versenytársak weboldalai
              </label>
              <div className="relative">
                <Users
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                  strokeWidth={1.5}
                />
                <input
                  id="competitors"
                  type="text"
                  placeholder="pl. versenytars1.hu, versenytars2.hu"
                  disabled={loading}
                  {...register("competitors")}
                  className="w-full pl-11 pr-4 py-2.5 bg-transparent/50 border border-bg-elevated/80 rounded-xl text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all disabled:opacity-50"
                />
              </div>
              {errors.competitors && (
                <p className="text-red-500 text-[10px] font-semibold">
                  {errors.competitors.message}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        loading={loading}
        variant="primary"
        className="w-full py-3 text-xs font-mono tracking-wider focus:ring-2 focus:ring-sky-500"
      >
        Onboarding beküldése
      </Button>
    </form>
  );
}
