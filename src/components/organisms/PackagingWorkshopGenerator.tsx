"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import ToolAccessLock from "@/components/molecules/ToolAccessLock";
import { auth } from "@/lib/firebase";
import { addPackagingGenerationAction } from "@/actions/packaging-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  PackagingWorkshopInput,
  PackagingGenerationOutput,
  PackagingStructure,
  PackagingSubstrate,
} from "@/types/packaging-workshop";
import PackagingInputForm, {
  packagingFormSchema,
  PACKAGING_PRESETS,
  type PackagingFormValues,
} from "@/components/organisms/packaging-workshop/PackagingInputForm";
import PackagingOutputStudio from "@/components/organisms/packaging-workshop/PackagingOutputStudio";

export default function PackagingWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<PackagingGenerationOutput | null>(null);
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
  } = useForm<PackagingFormValues>({
    resolver: zodResolver(packagingFormSchema),
    defaultValues: {
      packagingStructure: "fefco_0427_mailer",
      substrateAndMaterial: "e_flute_micro_corrugated",
    } as Partial<PackagingFormValues>,
  });

  const structureValue = useWatch({ control, name: "packagingStructure" });
  const substrateValue = useWatch({ control, name: "substrateAndMaterial" });
  const visualStyle = useWatch({ control, name: "visualStyle" });
  const colorPreference = useWatch({ control, name: "colorPreference" });
  const finishingValue = useWatch({ control, name: "surfaceFinishing" });

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
    (preset: (typeof PACKAGING_PRESETS)[number]) => {
      Object.entries(preset.values).forEach(([key, value]) => {
        setValue(key as keyof PackagingFormValues, value as never);
      });
      setError(null);
    },
    [setValue]
  );

  const onSubmit = async (data: PackagingFormValues) => {
    if (!auth?.currentUser) {
      setError("Kérlek, jelentkezz be a generáláshoz!");
      return;
    }
    setIsGenerating(true);
    setError(null);

    try {
      const token = await auth.currentUser.getIdToken(true);
      const input: PackagingWorkshopInput = {
        productName: data.productName,
        brandName: data.brandName,
        industry: data.industry,
        packagingStructure: data.packagingStructure as PackagingStructure,
        dimensionsMm: data.dimensionsMm,
        substrateAndMaterial: data.substrateAndMaterial as PackagingSubstrate,
        surfaceFinishing: data.surfaceFinishing || undefined,
        visualStyle: data.visualStyle || undefined,
        colorPreference: data.colorPreference || undefined,
        keyClaims: data.keyClaims || undefined,
        mandatoryInfo: data.mandatoryInfo || undefined,
      };
      const res = await addPackagingGenerationAction(token, input);
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
          Csomagolás Stúdió betöltése...
        </p>
      </div>
    );
  }

  // Strict access gate: block users without the required tool permission.
  if (!isAdmin && !allowedTools.includes("packaging_ai_muhely")) {
    return <ToolAccessLock toolName="Csomagolás AI Műhely" />;
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
          Nyomdakész Csomagolás & Stancrajz Stúdió
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
          Csomagolás, Doboz & Címke Tervezés
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl">
          FEFCO dobozok, hajtogatott kartonok, rigid box, doypack és
          palackcímkék — stancrajz-specifikációval, EU compliance és prepress
          checklistkel.
        </p>
      </div>

      <PackagingInputForm
        register={register}
        errors={errors}
        setValue={setValue}
        structureValue={structureValue}
        substrateValue={substrateValue}
        finishingValue={finishingValue}
        visualStyle={visualStyle}
        colorPreference={colorPreference}
        isGenerating={isGenerating}
        error={error}
        onLoadPreset={loadPreset}
        onSubmit={handleSubmit(onSubmit)}
      />

      {generatedOutput && (
        <PackagingOutputStudio generatedOutput={generatedOutput} />
      )}
    </div>
  );
}
