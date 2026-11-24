"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { addPosterGenerationAction } from "@/actions/poster-workshop";
import { getClientUserProfileAction } from "@/actions/portal";
import type {
  PosterWorkshopInput,
  PosterWorkshopOutput,
} from "@/types/poster-workshop";
import ToolAccessLock from "@/components/molecules/ToolAccessLock";
import PosterInputForm, {
  posterFormSchema,
  type PosterFormValues,
} from "@/components/organisms/poster-workshop/PosterInputForm";
import PosterOutputPanel from "@/components/organisms/poster-workshop/PosterOutputPanel";

export default function PosterWorkshopGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] =
    useState<PosterWorkshopOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
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
  } = useForm<PosterFormValues>({
    resolver: zodResolver(posterFormSchema),
    defaultValues: {
      posterSize: "A4",
      posterStyle: "minimalist",
      printSpecs: "standard",
      brandColors: [],
      requiredTexts: {
        headline: "",
        subheadline: "",
        bodyText: "",
        cta: "",
        eventDetails: "",
      },
      additionalRequirements: "",
    },
  });

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const onSubmit = async (data: PosterFormValues) => {
    if (!isAdmin && !allowedTools.includes("poster_ai_muhely")) {
      setError(
        "Nincs hozzáférésed ehhez az eszközhöz. Kérlek, lépj kapcsolatba az adminisztrátorral."
      );
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedOutput(null);

    try {
      if (!auth || !auth.currentUser) {
        throw new Error("Nincs bejelentkezve");
      }

      const idToken = await auth.currentUser.getIdToken(true);
      const input: PosterWorkshopInput = {
        posterPurpose: data.posterPurpose,
        targetAudience: data.targetAudience,
        posterSize: data.posterSize,
        posterStyle: data.posterStyle,
        printSpecs: data.printSpecs,
        brandColors: data.brandColors,
        requiredTexts: data.requiredTexts,
        additionalRequirements: data.additionalRequirements,
      };

      const result = await addPosterGenerationAction(idToken, input);

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

  if (!loading && !isAdmin && !allowedTools.includes("poster_ai_muhely")) {
    return <ToolAccessLock toolName="Poster AI Műhely" />;
  }

  return (
    <div className="text-[#0F172A] dark:text-[#F8FAFC]">
      {loading && (
        <div className="min-h-[50vh] bg-transparent flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#0369A1] dark:text-[#00B5F1]" />
          <p className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase tracking-widest animate-pulse font-bold">
            Generátor betöltése...
          </p>
        </div>
      )}

      {!loading && (
        <>
          {!auth || !auth.currentUser ? (
            <div className="min-h-[50vh] bg-transparent flex flex-col items-center justify-center space-y-6 px-6">
              <div className="bg-red-500/5 border border-red-500/40 backdrop-blur-xl shadow-[0_0_24px_rgba(239,68,68,0.15)] text-red-600 dark:text-red-400 px-6 py-4 rounded-2xl text-sm flex items-center gap-3 font-mono max-w-md text-center">
                <Sparkles className="w-5 h-5" />
                {error || "Kérlek, jelentkezz be a használatához!"}
              </div>
              <Link
                href="/portal"
                className="px-6 py-3 rounded-xl bg-linear-to-r from-cta-from to-cta-to hover:bg-cta-hover text-white font-sans font-semibold transition-colors"
              >
                Bejelentkezés
              </Link>
            </div>
          ) : (
            <>

              <div className="py-2">
                <div className="grid lg:grid-cols-2 gap-8">
                  <PosterInputForm
                    register={register}
                    errors={errors}
                    isGenerating={isGenerating}
                    error={error}
                    onSubmit={handleSubmit(onSubmit)}
                  />

                  <div className="space-y-6">
                    <PosterOutputPanel
                      generatedOutput={generatedOutput}
                      copiedStates={copiedStates}
                      onCopy={copyToClipboard}
                    />
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
