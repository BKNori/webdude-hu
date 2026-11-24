"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import ToolAccessLock from "@/components/molecules/ToolAccessLock";
import { auth } from "@/lib/firebase";
import { addSignageGenerationAction } from "@/actions/signage-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  SignageWorkshopInput,
  SignageGenerationOutput,
  SignageFormat,
  SignageSubstrate,
  ViewingDistance,
} from "@/types/signage-workshop";
import SignageInputForm, {
  signageFormSchema,
  SIGNAGE_PRESETS,
  type SignageFormValues,
} from "@/components/organisms/signage-workshop/SignageInputForm";
import SignageOutputStudio from "@/components/organisms/signage-workshop/SignageOutputStudio";

export default function SignageWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<SignageGenerationOutput | null>(null);
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
  } = useForm<SignageFormValues>({
    resolver: zodResolver(signageFormSchema),
    defaultValues: {
      signageFormat: "rollup_standard_85x200",
      substrateAndFoil: "rollup_film_240g",
      viewingDistance: "close_1_3m",
    } as Partial<SignageFormValues>,
  });

  const formatValue = useWatch({ control, name: "signageFormat" });
  const substrateValue = useWatch({ control, name: "substrateAndFoil" });
  const distanceValue = useWatch({ control, name: "viewingDistance" });
  const visualStyle = useWatch({ control, name: "visualStyle" });
  const colorPreference = useWatch({ control, name: "colorPreference" });

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
    (preset: (typeof SIGNAGE_PRESETS)[number]) => {
      Object.entries(preset.values).forEach(([key, value]) => {
        setValue(key as keyof SignageFormValues, value as never);
      });
      setError(null);
    },
    [setValue]
  );

  const onSubmit = async (data: SignageFormValues) => {
    if (!auth?.currentUser) {
      setError("Kérlek, jelentkezz be a generáláshoz!");
      return;
    }
    setIsGenerating(true);
    setError(null);

    try {
      const token = await auth.currentUser.getIdToken(true);
      const input: SignageWorkshopInput = {
        campaignOrHeadline: data.campaignOrHeadline,
        brandName: data.brandName,
        industry: data.industry,
        signageFormat: data.signageFormat as SignageFormat,
        dimensionsAndScale: data.dimensionsAndScale,
        substrateAndFoil: data.substrateAndFoil as SignageSubstrate,
        viewingDistance: data.viewingDistance as ViewingDistance,
        visualStyle: data.visualStyle || undefined,
        colorPreference: data.colorPreference || undefined,
        contactAndCta: data.contactAndCta || undefined,
      };
      const res = await addSignageGenerationAction(token, input);
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
          Dekor Stúdió betöltése...
        </p>
      </div>
    );
  }

  // Strict access gate: block users without the required tool permission.
  if (!isAdmin && !allowedTools.includes("signage_ai_muhely")) {
    return <ToolAccessLock toolName="Dekor/Jelzés AI Műhely" />;
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
          LFP & Dekoratőr Stúdió
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
          Roll-up, Kirakat, Molinó & Autódekor
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl">
          Nagyformátumú dekorációk távolsági olvashatósággal: méretarányos DPI,
          dead-zone térképek, RAL/Oracal kódok és 8 pontos LFP checklist.
        </p>
      </div>

      <SignageInputForm
        register={register}
        errors={errors}
        setValue={setValue}
        formatValue={formatValue}
        substrateValue={substrateValue}
        distanceValue={distanceValue}
        visualStyle={visualStyle}
        colorPreference={colorPreference}
        isGenerating={isGenerating}
        error={error}
        onLoadPreset={loadPreset}
        onSubmit={handleSubmit(onSubmit)}
      />

      {generatedOutput && (
        <SignageOutputStudio generatedOutput={generatedOutput} />
      )}
    </div>
  );
}
