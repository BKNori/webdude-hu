"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import ToolAccessLock from "@/components/molecules/ToolAccessLock";
import LivePromptPreviewCard from "@/components/molecules/LivePromptPreviewCard";
import OnlineGraphicsEnginePanel from "@/components/organisms/online-graphics-studio/OnlineGraphicsEnginePanel";
import OnlineGraphicsForm from "@/components/organisms/online-graphics-studio/OnlineGraphicsForm";
import { auth } from "@/lib/firebase";
import { getClientUserProfileAction } from "@/actions/portal";
import {
  compileOnlineGraphicsPrompt,
  DEFAULT_ONLINE_GRAPHICS_STATE,
  type OnlineGraphicsPreset,
  type OnlineGraphicsStudioState,
} from "@/data/online-graphics-studio-config";

const TOOL_ID = "online_graphics_prompt_studio";

/**
 * Online Grafika & Kampány Pro Prompt Stúdió vékony karmester komponens (<220 sor).
 */
export default function OnlineGraphicsPromptStudio() {
  const [profileReady, setProfileReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allowedTools, setAllowedTools] = useState<string[]>([]);
  const [state, setState] = useState<OnlineGraphicsStudioState>(
    DEFAULT_ONLINE_GRAPHICS_STATE
  );

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
        // Profil olvasási hiba esetén az access gate kezeli a jogosultságot.
      } finally {
        setProfileReady(true);
      }
    });
    return unsub;
  }, []);

  const updateField = useCallback(
    <K extends keyof OnlineGraphicsStudioState>(
      key: K,
      value: OnlineGraphicsStudioState[K]
    ) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const applyPreset = useCallback((preset: OnlineGraphicsPreset) => {
    setState({
      ...DEFAULT_ONLINE_GRAPHICS_STATE,
      ...preset.state,
    });
  }, []);

  const resetState = useCallback(() => {
    setState(DEFAULT_ONLINE_GRAPHICS_STATE);
  }, []);

  const compiled = useMemo(() => compileOnlineGraphicsPrompt(state), [state]);

  if (!profileReady) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#00B5F1]" />
        <p className="text-xs font-mono text-[#475569] dark:text-slate-300 uppercase tracking-widest">
          Online Grafika Pro Prompt Stúdió betöltése...
        </p>
      </div>
    );
  }

  if (!isAdmin && !allowedTools.includes(TOOL_ID)) {
    return (
      <ToolAccessLock toolName="Online Grafika & Kampány Pro Prompt Stúdió" />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC] py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/portal/ai-muhely"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#0369A1] dark:text-[#00B5F1] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Vissza az AI Tervezőműhelybe
          </Link>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#0369A1]/10 dark:bg-[#00B5F1]/15 border border-[#0369A1]/30 dark:border-[#00B5F1]/30 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-[#0369A1] dark:text-[#00B5F1]">
              PRO PROMPT · 1. PILLÉR
            </span>
            {isAdmin && (
              <span className="rounded-full bg-[#7C3AED]/15 border border-[#7C3AED]/40 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-[#6D28D9] dark:text-[#A78BFA]">
                Szuperadmin
              </span>
            )}
          </div>
        </div>

        <header className="space-y-2 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#0369A1] dark:text-[#00B5F1]">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            26+ Év Art Direction · 5 Vizuális Motor
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading text-[#0F172A] dark:text-white tracking-tight">
            Online Grafika &amp; Kampány Pro Prompt Stúdió
          </h1>
          <p className="text-sm sm:text-base text-[#334155] dark:text-slate-300 leading-relaxed">
            Platform-specifikus safe-zone geometria (Web Hero, OG, 4:5 Feed, 9:16
            Reels/TikTok UI safe-zone, YouTube Thumbnail), szöveg-szabad
            copy-space, fényfizika és 0 ms-os szintaxis-fordítás Midjourney v7,
            Flux 1.1 Pro, Ideogram 3.0, Recraft v3 SVG és Videó/Motion
            motorokhoz.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <OnlineGraphicsEnginePanel
              state={state}
              onUpdate={updateField}
            />
            <OnlineGraphicsForm
              state={state}
              onUpdate={updateField}
              onApplyPreset={applyPreset}
              onReset={resetState}
            />
          </div>

          <div className="lg:col-span-5">
            <LivePromptPreviewCard
              compiled={compiled}
              domain="online-graphics"
              brief={state.subject}
              negativeSectionLabel="Anti-AI-Slop Negatív Prompt"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
