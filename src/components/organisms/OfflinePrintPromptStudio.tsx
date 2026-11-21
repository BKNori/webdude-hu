"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, FileCheck2, Loader2, Printer } from "lucide-react";
import ToolAccessLock from "@/components/molecules/ToolAccessLock";
import LivePromptPreviewCard from "@/components/molecules/LivePromptPreviewCard";
import OfflinePrintTechPanel from "@/components/organisms/offline-print-studio/OfflinePrintTechPanel";
import OfflinePrintForm from "@/components/organisms/offline-print-studio/OfflinePrintForm";
import { auth } from "@/lib/firebase";
import { getClientUserProfileAction } from "@/actions/portal";
import {
  buildPrepressSpecSummary,
  compileOfflinePrintPrompt,
  DEFAULT_OFFLINE_PRINT_STATE,
  type OfflinePrintPreset,
  type OfflinePrintStudioState,
  type PrintProductFormatSpec,
} from "@/data/offline-print-studio-config";

const TOOL_ID = "offline_print_prompt_studio";

/** Offline & Nyomdai Prepress Pro Prompt Stúdió vékony karmester komponens (<220 sor). */
export default function OfflinePrintPromptStudio() {
  const [profileReady, setProfileReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allowedTools, setAllowedTools] = useState<string[]>([]);
  const [state, setState] = useState<OfflinePrintStudioState>(
    DEFAULT_OFFLINE_PRINT_STATE
  );
  const [specCopied, setSpecCopied] = useState(false);

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
        // Az access gate kezeli a jogosultságot.
      } finally {
        setProfileReady(true);
      }
    });
    return unsub;
  }, []);

  const updateField = useCallback(
    <K extends keyof OfflinePrintStudioState>(
      key: K,
      value: OfflinePrintStudioState[K]
    ) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const selectFormat = useCallback((fmt: PrintProductFormatSpec) => {
    setState((prev) => ({
      ...prev,
      productFormat: fmt.id,
      trimSizeMm: fmt.defaultTrimMm,
      bleedMm: fmt.defaultBleedMm,
      safeZoneMm: fmt.defaultSafeZoneMm,
      scaleId: fmt.defaultScale,
    }));
  }, []);

  const applyPreset = useCallback((preset: OfflinePrintPreset) => {
    setState({
      ...DEFAULT_OFFLINE_PRINT_STATE,
      ...preset.state,
    });
  }, []);

  const resetState = useCallback(() => {
    setState(DEFAULT_OFFLINE_PRINT_STATE);
  }, []);

  const compiled = useMemo(() => compileOfflinePrintPrompt(state), [state]);
  const prepressSummary = useMemo(
    () => buildPrepressSpecSummary(state),
    [state]
  );

  const handleCopySpec = async () => {
    try {
      await navigator.clipboard.writeText(prepressSummary);
      setSpecCopied(true);
      window.setTimeout(() => setSpecCopied(false), 2200);
    } catch {
      // Clipboard fallback
    }
  };

  if (!profileReady) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#00B5F1]" />
        <p className="text-xs font-mono text-[#475569] dark:text-slate-300 uppercase tracking-widest">
          Offline &amp; Prepress Stúdió betöltése...
        </p>
      </div>
    );
  }

  if (!isAdmin && !allowedTools.includes(TOOL_ID)) {
    return (
      <ToolAccessLock toolName="Offline & Nyomdai Prepress Pro Prompt Stúdió" />
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
              PRO PROMPT · 2. PILLÉR (PREPRESS)
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
            <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            26+ Év Prepress &amp; Nyomdaipari Rutin · PDF/X-4 &amp; FOGRA Szabvány
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading text-[#0F172A] dark:text-white tracking-tight">
            Offline &amp; Nyomdai Prepress Pro Prompt Stúdió
          </h1>
          <p className="text-sm sm:text-base text-[#334155] dark:text-slate-300 leading-relaxed">
            2D nyomdakész grafikai alapok és 3D ügyfélprezentációs print
            mockupok: milliméter-pontos kifutó (Bleed), biztonsági zóna,
            göngyölt hajtásmechanika (97-100-100 mm), FEFCO stancrajz, Roll-up
            150 mm holttér, FOGRA39/51/52 TAC limit és technikai spot rétegek.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <OfflinePrintTechPanel state={state} onUpdate={updateField} />
            <OfflinePrintForm
              state={state}
              onUpdate={updateField}
              onSelectFormat={selectFormat}
              onApplyPreset={applyPreset}
              onReset={resetState}
            />
          </div>

          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <section
              aria-label="Élő Prepress Műszaki Adatlap"
              className="rounded-3xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#111C33]/90 p-5 space-y-3 shadow-[0_12px_36px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
                  <FileCheck2 className="w-4 h-4" aria-hidden="true" />
                  Élő Prepress Műszaki Adatlap
                </span>
                <button
                  type="button"
                  onClick={handleCopySpec}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
                >
                  {specCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {specCopied ? "Másolva!" : "Nyomdai Specifikáció Másolása"}
                </button>
              </div>
              <pre className="whitespace-pre-wrap break-words rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120] p-3.5 text-[11px] font-mono text-[#0F172A] dark:text-slate-200 leading-relaxed">
                {prepressSummary}
              </pre>
              <p className="sr-only" aria-live="polite">
                {specCopied ? "A nyomdai műszaki specifikáció a vágólapra másolva." : ""}
              </p>
            </section>

            <LivePromptPreviewCard
              compiled={compiled}
              domain="offline-print"
              brief={state.subject}
              negativeSectionLabel="Prepress & Anti-AI-Slop Negatív Prompt"
              className="lg:static"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
