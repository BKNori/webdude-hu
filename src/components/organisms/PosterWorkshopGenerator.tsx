"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, Loader2, ArrowLeft, Layers } from "lucide-react";
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
    <div className="min-h-screen bg-transparent text-text-primary">
      {loading && (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest animate-pulse font-bold">
            Generátor betöltése...
          </p>
        </div>
      )}

      {!loading && (
        <>
          {!auth || !auth.currentUser ? (
            <div className="min-h-screen bg-transparent flex flex-col items-center justify-center space-y-6 px-6">
              <div className="bg-red-500/5 border border-red-500/40 backdrop-blur-xl shadow-[0_0_24px_rgba(239,68,68,0.15)] text-red-400 px-6 py-4 rounded-2xl text-sm flex items-center gap-3 font-mono max-w-md text-center">
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
              <header className="border-b border-bg-elevated/40 bg-transparent backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Link
                      href="/portal/ai-muhely"
                      className="w-10 h-10 rounded-xl bg-linear-to-br from-cta-from to-cta-to flex items-center justify-center shadow-lg shadow-brand-primary/10 cursor-pointer"
                    >
                      <Layers className="w-5 h-5 text-white" />
                    </Link>
                    <div>
                      <span className="text-xs uppercase font-bold tracking-widest text-brand-primary block">
                        WebDude AI Studio
                      </span>
                      <span className="text-sm font-bold text-white block -mt-0.5">
                        Poster AI Műhely
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/portal/ai-muhely"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-800 hover:border-brand-primary/30 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Vissza
                  </Link>
                </div>
              </header>

              <main className="max-w-7xl mx-auto px-6 py-12">
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
              </main>
            </>
          )}
        </>
      )}
    </div>
  );
}
