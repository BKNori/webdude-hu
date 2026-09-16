"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  generateAIContentAction as generateAiContentAction,
  saveClientNoteAction as saveAiNoteAction,
} from "@/actions/ai";
import { auth } from "@/lib/firebase";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

const toolFormSchema = z.object({
  topic: z.string().min(2, "Kérlek, adj meg egy témát"),
  tone: z.string().min(1, "Válassz ki egy hangvételt"),
  keywords: z.string().optional(),
});

type ToolFormInput = z.infer<typeof toolFormSchema>;

interface SingleAIToolProps {
  allowedTools?: string[];
  isAdmin?: boolean;
  toolId: string;
  toolName?: string;
  description?: string;
}

export default function SingleAITool({
  toolId,
  toolName,
  description,
}: SingleAIToolProps) {
  const effectiveToolName = toolName ?? toolId;
  const effectiveDescription = description ?? "";
  // const effectiveSystemPrompt = systemPrompt ?? '';
  const [generatedText, setGeneratedText] = useState("");
  const [displayedText, setGeneratedDisplayText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ToolFormInput>({
    resolver: zodResolver(toolFormSchema),
    defaultValues: { topic: "", tone: "", keywords: "" },
  });

  // typing effect implementation
  useEffect(() => {
    if (!generatedText) {
      return;
    }

    let currentIndex = 0;
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    typingTimerRef.current = setInterval(() => {
      setGeneratedDisplayText((prev) => {
        if (currentIndex === 0) return generatedText.charAt(0);
        return prev + generatedText.charAt(currentIndex);
      });
      currentIndex++;
      if (currentIndex >= generatedText.length) {
        if (typingTimerRef.current) {
          clearInterval(typingTimerRef.current);
        }
      }
    }, 10);

    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [generatedText]);

  const onGenerate = async (data: ToolFormInput) => {
    setGeneratedText("");
    setGeneratedDisplayText("");
    setSaveStatus(null);
    try {
      const idToken = auth ? (await auth.currentUser?.getIdToken()) || "" : "";
      const inputs: Record<string, string> = {
        prodName: data.topic,
        prodSpecs: data.keywords || "",
        customerMsg: data.topic,
        tone: data.tone,
        campaignTheme: data.topic,
        offerType: data.topic,
        imgSubject: data.topic,
        imgStyle: data.tone,
        imgMood: data.keywords || "",
        bannerTopic: data.topic,
        bannerPlatform: data.keywords || "",
        bannerBrandVibe: data.tone,
        logoBrandName: data.topic,
        logoIndustry: data.keywords || "",
        logoCoreValues: data.tone,
        uiTargetAudience: data.topic,
        uiPageType: data.keywords || "",
        campaignSeason: data.topic,
        campaignProduct: data.keywords || "",
      };

      const res = await generateAiContentAction(idToken, toolId, inputs);

      if (res.success && res.content) {
        setGeneratedText(res.content);
      } else {
        setGeneratedText(
          "Hiba történt a generálás során: " + (res.error || "Ismeretlen hiba")
        );
      }
    } catch {
      setGeneratedText(
        "Váratlan hálózati hiba lépett fel a generálási kísérlet során."
      );
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedText || displayedText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleSaveToProject = async () => {
    setSaveStatus(null);
    try {
      const idToken = auth ? (await auth.currentUser?.getIdToken()) || "" : "";
      const res = await saveAiNoteAction(
        idToken,
        `${effectiveToolName} - ${new Date().toLocaleDateString("hu-HU")}`,
        generatedText,
        toolId
      );
      if (res.success) {
        setSaveStatus({
          success: true,
          message: "Sikeresen mentve az ügyfél-jegyzetek közé! (notes)",
        });
      } else {
        setSaveStatus({
          success: false,
          message: res.error || "Nem sikerült elmenteni a jegyzetet.",
        });
      }
    } catch {
      setSaveStatus({
        success: false,
        message: "Váratlan hiba történt mentés közben.",
      });
    }
  };

  return (
    <div className="bg-bg-surface/30 border border-slate-800/50 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto hover:border-sky-500/10 transition-all duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          {effectiveToolName}
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          {effectiveDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Paraméterező Űrlap */}
        <form onSubmit={handleSubmit(onGenerate)} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Téma vagy Kulcsszó
            </label>
            <input
              type="text"
              {...register("topic")}
              placeholder="Pl. prémium bútor webshop akciók"
              className="w-full bg-bg-elevated/30 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-text-primary outline-none transition-all"
            />
            {errors.topic && (
              <p className="text-red-500 text-sm mt-1">
                {errors.topic.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Márkahangvétel (Tone)
            </label>
            <select
              {...register("tone")}
              className="w-full bg-bg-elevated/50 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-text-primary outline-none transition-all"
            >
              <option value="">-- Válassz hangnemet --</option>
              <option value="professional">Szakmai és hiteles (E-E-A-T)</option>
              <option value="friendly">Közvetlen és barátságos</option>
              <option value="casual">Laza és humoros</option>
              <option value="minimalist">Minimalista és lényegretörő</option>
            </select>
            {errors.tone && (
              <p className="text-red-500 text-sm mt-1">{errors.tone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Negatív vagy Kötelező Kulcsszavak (Opcionális)
            </label>
            <input
              type="text"
              {...register("keywords")}
              placeholder="Pl. ingyenes szállítás, limitált darabszám"
              className="w-full bg-bg-elevated/30 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-text-primary outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-xl bg-sky-500 hover:bg-violet-700 disabled:bg-sky-500/30 text-bg-base font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-bg-base border-t-transparent rounded-full animate-spin"></span>
                Generálás folyamatban...
              </span>
            ) : (
              "AI Tartalom Generálása"
            )}
          </button>
        </form>

        {/* Generált kimenet (Typing effect) */}
        <div className="bg-bg-surface/40 border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between min-h-75">
          <div>
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-800/50">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                Kimenet
              </span>
              {displayedText && !isSubmitting && (
                <button
                  type="button"
                  onClick={handleCopyToClipboard}
                  className="text-xs text-sky-500 hover:text-violet-700 font-bold uppercase tracking-wider transition-colors"
                >
                  {isCopied ? "Másolva! ✓" : "Másolás"}
                </button>
              )}
            </div>

            <div className="text-text-primary text-sm leading-relaxed whitespace-pre-wrap font-mono select-text h-62.5 overflow-y-auto pr-2 custom-scrollbar relative flex items-center justify-center">
              {isSubmitting ? (
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden h-full max-h-full scale-50">
                  <LoadingSpinner />
                </div>
              ) : displayedText ? (
                <span className="w-full text-left self-start">
                  {displayedText}
                </span>
              ) : (
                <span className="text-slate-400 italic">
                  Add meg a paramétereket bal oldalon a generáláshoz...
                </span>
              )}
            </div>
          </div>

          {generatedText &&
            displayedText.length >= generatedText.length &&
            !isSubmitting && (
              <div className="pt-4 border-t border-slate-800/50 mt-4 flex flex-col sm:flex-row gap-4 animate-fade-in">
                <button
                  type="button"
                  onClick={handleSaveToProject}
                  className="flex-1 py-3 px-4 rounded-xl border border-sky-500/30 hover:border-sky-500/50 text-text-primary font-semibold text-xs uppercase tracking-wider text-center transition-all"
                >
                  Mentés a Projekthez (notes)
                </button>
              </div>
            )}

          {saveStatus && !isSubmitting && (
            <div
              className={`mt-4 p-3 rounded-xl border text-xs text-center ${saveStatus.success ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}
            >
              {saveStatus.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
