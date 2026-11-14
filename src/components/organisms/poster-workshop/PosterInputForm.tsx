"use client";

import React from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import {
  Layout,
  Loader2,
  Palette,
  Printer,
  Sparkles,
  Target,
  Type,
} from "lucide-react";

export const posterFormSchema = z.object({
  posterPurpose: z.string().min(10, "Poszter célja minimum 10 karakter"),
  targetAudience: z.string().min(10, "Célközönség minimum 10 karakter"),
  posterSize: z.enum(["A4", "A3", "A2", "A1", "custom"]),
  posterStyle: z.enum([
    "minimalist",
    "typographic",
    "photographic",
    "illustration",
    "abstract",
    "vintage",
    "modern-bold",
    "corporate",
  ]),
  printSpecs: z.enum(["standard", "premium", "large-format", "outdoor"]),
  brandColors: z.array(z.string()).optional(),
  requiredTexts: z.object({
    headline: z.string().optional(),
    subheadline: z.string().optional(),
    bodyText: z.string().optional(),
    cta: z.string().optional(),
    eventDetails: z.string().optional(),
  }),
  additionalRequirements: z.string().optional(),
});

export type PosterFormValues = z.infer<typeof posterFormSchema>;

const POSTER_SIZE_OPTIONS = [
  { value: "A4", label: "A4" },
  { value: "A3", label: "A3" },
  { value: "A2", label: "A2" },
  { value: "A1", label: "A1" },
  { value: "custom", label: "Egyedi" },
] as const;

const POSTER_STYLE_OPTIONS = [
  { value: "minimalist", label: "Minimalista" },
  { value: "typographic", label: "Tipográfiai" },
  { value: "photographic", label: "Fotó" },
  { value: "illustration", label: "Illusztráció" },
  { value: "abstract", label: "Absztrakt" },
  { value: "vintage", label: "Vintage" },
  { value: "modern-bold", label: "Modern" },
  { value: "corporate", label: "Vállalati" },
] as const;

const POSTER_PRINT_SPEC_OPTIONS = [
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Prémium" },
  { value: "large-format", label: "Nagyformátum" },
  { value: "outdoor", label: "Kültéri" },
] as const;

interface PosterInputFormProps {
  register: UseFormRegister<PosterFormValues>;
  errors: FieldErrors<PosterFormValues>;
  isGenerating: boolean;
  error: string | null;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

/**
 * A Poster AI Műhely bal oldali paraméterező űrlapja:
 * poszter célja, célközönség, méret, stílus, nyomdai specifikációk,
 * brand színek, kötelező szövegek és Kék-Lila v7.0 generáló CTA.
 */
export default function PosterInputForm({
  register,
  errors,
  isGenerating,
  error,
  onSubmit,
}: PosterInputFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2 relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-brand-primary/5 blur-3xl pointer-events-none" />
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary">
          Poster Generátor
        </span>
        <h1 className="text-3xl md:text-4xl font-heading font-normal uppercase text-white tracking-wide leading-none">
          Nyomdai Kész Poszter
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Generálj print-ready poszter koncepciókat Norbi 26 éves grafikai és
          nyomdai szakértelmével. CMYK színértékek, bleed, safe zone és crop
          marks irányelvekkel.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="bg-red-500/5 border border-red-500/40 backdrop-blur-xl shadow-[0_0_24px_rgba(239,68,68,0.15)] text-red-400 px-4 py-3 rounded-2xl text-xs flex items-center gap-2.5 font-mono"
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Poster Purpose */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Target className="w-4 h-4 text-brand-primary" />
            Poszter Célja
          </label>
          <textarea
            {...register("posterPurpose")}
            placeholder="Példa: Esemény promóció, termék bevezetés, kiállítás, konferencia..."
            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm resize-none"
            rows={3}
          />
          {errors.posterPurpose && (
            <p className="text-red-400 text-xs">
              {errors.posterPurpose.message}
            </p>
          )}
        </div>

        {/* Target Audience */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Type className="w-4 h-4 text-brand-primary" />
            Célközönség
          </label>
          <textarea
            {...register("targetAudience")}
            placeholder="Példa: 25-35 éves szakemberek, diákok, helyi lakosok..."
            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm resize-none"
            rows={3}
          />
          {errors.targetAudience && (
            <p className="text-red-400 text-xs">
              {errors.targetAudience.message}
            </p>
          )}
        </div>

        {/* Poster Size */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Layout className="w-4 h-4 text-brand-primary" />
            Poszter Méret
          </label>
          <div className="grid grid-cols-5 gap-2">
            {POSTER_SIZE_OPTIONS.map((option) => (
              <label key={option.value} className="relative cursor-pointer">
                <input
                  {...register("posterSize")}
                  type="radio"
                  value={option.value}
                  className="sr-only peer"
                />
                <div className="px-3 py-2 rounded-xl bg-bg-elevated/50 border border-bg-elevated peer-checked:border-brand-primary/50 peer-checked:bg-brand-primary/10 text-center transition-all">
                  <span className="text-xs font-bold text-slate-300 peer-checked:text-brand-primary">
                    {option.label}
                  </span>
                </div>
              </label>
            ))}
          </div>
          {errors.posterSize && (
            <p className="text-red-400 text-xs">{errors.posterSize.message}</p>
          )}
        </div>

        {/* Poster Style */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Palette className="w-4 h-4 text-brand-primary" />
            Poszter Stílus
          </label>
          <div className="grid grid-cols-4 gap-2">
            {POSTER_STYLE_OPTIONS.map((option) => (
              <label key={option.value} className="relative cursor-pointer">
                <input
                  {...register("posterStyle")}
                  type="radio"
                  value={option.value}
                  className="sr-only peer"
                />
                <div className="px-3 py-2 rounded-xl bg-bg-elevated/50 border border-bg-elevated peer-checked:border-brand-primary/50 peer-checked:bg-brand-primary/10 text-center transition-all">
                  <span className="text-xs font-bold text-slate-300 peer-checked:text-brand-primary">
                    {option.label}
                  </span>
                </div>
              </label>
            ))}
          </div>
          {errors.posterStyle && (
            <p className="text-red-400 text-xs">{errors.posterStyle.message}</p>
          )}
        </div>

        {/* Print Specs */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Printer className="w-4 h-4 text-brand-primary" />
            Nyomdai Specifikációk
          </label>
          <div className="grid grid-cols-4 gap-2">
            {POSTER_PRINT_SPEC_OPTIONS.map((option) => (
              <label key={option.value} className="relative cursor-pointer">
                <input
                  {...register("printSpecs")}
                  type="radio"
                  value={option.value}
                  className="sr-only peer"
                />
                <div className="px-3 py-2 rounded-xl bg-bg-elevated/50 border border-bg-elevated peer-checked:border-brand-primary/50 peer-checked:bg-brand-primary/10 text-center transition-all">
                  <span className="text-xs font-bold text-slate-300 peer-checked:text-brand-primary">
                    {option.label}
                  </span>
                </div>
              </label>
            ))}
          </div>
          {errors.printSpecs && (
            <p className="text-red-400 text-xs">{errors.printSpecs.message}</p>
          )}
        </div>

        {/* Brand Colors */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Palette className="w-4 h-4 text-brand-primary" />
            Brand Színek (Opcionális)
          </label>
          <input
            {...register("brandColors")}
            placeholder="Példa: #00B5F1, #020617, #e2e8f0 (vesszővel elválasztva)"
            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm"
          />
        </div>

        {/* Required Texts */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Type className="w-4 h-4 text-brand-primary" />
            Kötelező Szövegek (Opcionális)
          </label>
          <div className="space-y-3">
            <input
              {...register("requiredTexts.headline")}
              placeholder="Főcím (opcionális)"
              className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm"
            />
            <input
              {...register("requiredTexts.subheadline")}
              placeholder="Alcím (opcionális)"
              className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm"
            />
            <textarea
              {...register("requiredTexts.bodyText")}
              placeholder="Szövegtörzs (opcionális)"
              className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm resize-none"
              rows={2}
            />
            <input
              {...register("requiredTexts.cta")}
              placeholder="CTA gomb szöveg (opcionális)"
              className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm"
            />
            <input
              {...register("requiredTexts.eventDetails")}
              placeholder="Esemény részletek (opcionális)"
              className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm"
            />
          </div>
        </div>

        {/* Additional Requirements */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Type className="w-4 h-4 text-brand-primary" />
            További Követelmények (Opcionális)
          </label>
          <textarea
            {...register("additionalRequirements")}
            placeholder="Bármilyen egyéb követelmény vagy specifikáció..."
            className="w-full px-4 py-3 rounded-xl bg-bg-elevated/50 border border-bg-elevated text-white placeholder-slate-500 focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all text-sm resize-none"
            rows={2}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-cta-from to-cta-to hover:bg-cta-hover text-white font-sans font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generálás folyamatban...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Poszter Generálása
            </>
          )}
        </button>
      </form>
    </div>
  );
}
