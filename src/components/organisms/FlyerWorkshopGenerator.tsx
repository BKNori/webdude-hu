"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import ToolAccessLock from "@/components/molecules/ToolAccessLock";
import { auth } from "@/lib/firebase";
import { addFlyerGenerationAction } from "@/actions/flyer-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  FlyerWorkshopInput,
  FlyerWorkshopOutput,
  FlyerFormat,
  PaperAndFinish,
  DistributionChannel,
} from "@/types/flyer-workshop";
import FlyerInputForm, {
  flyerFormSchema,
  FLYER_PRESETS,
  type FlyerFormValues,
} from "@/components/organisms/flyer-workshop/FlyerInputForm";
import FlyerOutputStudio from "@/components/organisms/flyer-workshop/FlyerOutputStudio";

export default function FlyerWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<FlyerWorkshopOutput | null>(null);
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
  } = useForm<FlyerFormValues>({
    resolver: zodResolver(flyerFormSchema),
    defaultValues: {
      flyerFormat: "A5_ketoldalas",
      paperAndFinish: "170g_matt_munyomo",
      distributionChannel: "kezbe_adott",
    } as Partial<FlyerFormValues>,
  });

  const visualStyle = useWatch({ control, name: "visualStyle" });
  const colorPreference = useWatch({ control, name: "colorPreference" });
  const flyerFormatValue = useWatch({ control, name: "flyerFormat" });
  const paperValue = useWatch({ control, name: "paperAndFinish" });
  const channelValue = useWatch({ control, name: "distributionChannel" });

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
    (preset: (typeof FLYER_PRESETS)[number]) => {
      Object.entries(preset.values).forEach(([key, value]) => {
        setValue(key as keyof FlyerFormValues, value as never);
      });
      setError(null);
    },
    [setValue]
  );

  const onSubmit = async (data: FlyerFormValues) => {
    if (!auth?.currentUser) {
      setError("Kérlek, jelentkezz be a generáláshoz!");
      return;
    }
    setIsGenerating(true);
    setError(null);

    try {
      const token = await auth.currentUser.getIdToken(true);
      const input: FlyerWorkshopInput = {
        campaignTitle: data.campaignTitle,
        brandName: data.brandName,
        industry: data.industry,
        flyerFormat: data.flyerFormat as FlyerFormat,
        paperAndFinish: data.paperAndFinish as PaperAndFinish,
        distributionChannel: data.distributionChannel as DistributionChannel,
        visualStyle: data.visualStyle || undefined,
        colorPreference: data.colorPreference || undefined,
        offerOrHook: data.offerOrHook || undefined,
        callToAction: data.callToAction || undefined,
      };
      const res = await addFlyerGenerationAction(token, input);
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
          Szórólap Stúdió betöltése...
        </p>
      </div>
    );
  }

  // Strict access gate: block users without the required tool permission.
  if (!isAdmin && !allowedTools.includes("flyer_ai_muhely")) {
    return <ToolAccessLock toolName="Szórólap AI Műhely" />;
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
          Nyomdakész Szórólap & Prospektus Stúdió
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
          Milliméter-Pontos Prepress Tervezés
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl">
          Vágási, kifutós és biztonsági zónák, hajtási mechanika, Rich Black és
          CMYK specifikációk — azonnal nyomdaküldhető minőségben.
        </p>
      </div>

      <FlyerInputForm
        register={register}
        errors={errors}
        setValue={setValue}
        flyerFormatValue={flyerFormatValue}
        paperValue={paperValue}
        channelValue={channelValue}
        visualStyle={visualStyle}
        colorPreference={colorPreference}
        isGenerating={isGenerating}
        error={error}
        onLoadPreset={loadPreset}
        onSubmit={handleSubmit(onSubmit)}
      />

      {generatedOutput && (
        <FlyerOutputStudio generatedOutput={generatedOutput} />
      )}
    </div>
  );
}
