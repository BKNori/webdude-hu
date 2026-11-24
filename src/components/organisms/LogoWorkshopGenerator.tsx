"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import ToolAccessLock from "@/components/molecules/ToolAccessLock";
import { auth } from "@/lib/firebase";
import { addLogoGenerationAction } from "@/actions/logo-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  LogoWorkshopInput,
  LogoGenerationOutput,
  LogoArchetype,
  ConstructionGrid,
} from "@/types/logo-workshop";
import LogoInputForm, {
  logoFormSchema,
  INDUSTRY_PRESETS,
  type LogoFormValues,
} from "@/components/organisms/logo-workshop/LogoInputForm";
import LogoOutputStudio from "@/components/organisms/logo-workshop/LogoOutputStudio";

export default function LogoWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<LogoGenerationOutput | null>(null);
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
  } = useForm<LogoFormValues>({
    resolver: zodResolver(logoFormSchema),
    defaultValues: {
      logoArchetype: "abstract_geometric",
      constructionGrid: "golden_ratio",
    } as Partial<LogoFormValues>,
  });

  const visualStyle = useWatch({ control, name: "visualStyle" });
  const colorPreference = useWatch({ control, name: "colorPreference" });
  const logoArchetypeValue = useWatch({ control, name: "logoArchetype" });
  const constructionGridValue = useWatch({
    control,
    name: "constructionGrid",
  });

  // Auth gate: a generátor csak bejelentkezett felhasználóknak elérhető.
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
    (preset: (typeof INDUSTRY_PRESETS)[number]) => {
      Object.entries(preset.values).forEach(([key, value]) => {
        setValue(key as keyof LogoFormValues, value as never);
      });
      setError(null);
    },
    [setValue]
  );

  const onSubmit = async (data: LogoFormValues) => {
    if (!auth?.currentUser) {
      setError("Kérlek, jelentkezz be a generáláshoz!");
      return;
    }
    setIsGenerating(true);
    setError(null);

    try {
      const token = await auth.currentUser.getIdToken(true);
      const input: LogoWorkshopInput = {
        brandName: data.brandName,
        tagline: data.tagline || undefined,
        industry: data.industry,
        targetAudience: data.targetAudience,
        logoArchetype: data.logoArchetype as LogoArchetype,
        constructionGrid: data.constructionGrid as ConstructionGrid,
        visualStyle: data.visualStyle || undefined,
        colorPreference: data.colorPreference || undefined,
        symbolsToInclude: data.symbolsToInclude || undefined,
        symbolsToAvoid: data.symbolsToAvoid || undefined,
      };
      const res = await addLogoGenerationAction(token, input);
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
        <p className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-widest">
          Logó Stúdió betöltése...
        </p>
      </div>
    );
  }

  // Strict access gate: block users without the required tool permission.
  if (!isAdmin && !allowedTools.includes("logo_ai_muhely")) {
    return <ToolAccessLock toolName="Logó AI Műhely" />;
  }

  return (
    <div className="space-y-8">
      {/* Fejléc */}
      <div className="flex items-center justify-end gap-4">{isAdmin && (
          <span className="text-[10px] font-black uppercase tracking-widest text-[#a78bfa] border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-2 py-1 rounded-full">
            Szuperadmin
          </span>
        )}</div>

      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#00B5F1]">
          Enterprise Logó & Arculattervező Stúdió
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
          Professzionális Logó & Arculattervezés
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl">
          3 merőben eltérő, produkciós szintű koncepció valós vektorszerkesztési
          útmutatóval, nyomdai színrendszerrel és motor-specifikus AI promptokkal.
        </p>
      </div>

      <LogoInputForm
        register={register}
        errors={errors}
        setValue={setValue}
        onSubmit={handleSubmit(onSubmit)}
        onLoadPreset={loadPreset}
        isGenerating={isGenerating}
        error={error}
        visualStyle={visualStyle}
        colorPreference={colorPreference}
        logoArchetypeValue={logoArchetypeValue}
        constructionGridValue={constructionGridValue}
      />

      {generatedOutput && (
        <LogoOutputStudio generatedOutput={generatedOutput} />
      )}
    </div>
  );
}
