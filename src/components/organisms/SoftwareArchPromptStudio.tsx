"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Cpu, FileCheck2, Loader2 } from "lucide-react";
import ToolAccessLock from "@/components/molecules/ToolAccessLock";
import LivePromptPreviewCard from "@/components/molecules/LivePromptPreviewCard";
import SoftwareArchForm from "@/components/organisms/software-arch-studio/SoftwareArchForm";
import SoftwareArchTechPanel from "@/components/organisms/software-arch-studio/SoftwareArchTechPanel";
import { auth } from "@/lib/firebase";
import { getClientUserProfileAction } from "@/actions/portal";
import {
  buildArchBlueprintChecklist,
  compileSoftwareArchPrompt,
  DEFAULT_SOFTWARE_ARCH_STATE,
  type SoftwareArchPreset,
  type SoftwareArchStudioState,
} from "@/data/software-arch-studio-config";

const TOOL_ID = "software_arch_prompt_studio";

/** Webes & Szoftver-Architektúra Pro Prompt Stúdió vékony karmester (<220 sor). */
export default function SoftwareArchPromptStudio() {
  const [profileReady, setProfileReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allowedTools, setAllowedTools] = useState<string[]>([]);
  const [state, setState] = useState<SoftwareArchStudioState>(
    DEFAULT_SOFTWARE_ARCH_STATE
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
    <K extends keyof SoftwareArchStudioState>(
      key: K,
      value: SoftwareArchStudioState[K]
    ) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const applyPreset = useCallback((preset: SoftwareArchPreset) => {
    setState({
      ...DEFAULT_SOFTWARE_ARCH_STATE,
      ...preset.state,
    });
  }, []);

  const resetState = useCallback(() => {
    setState(DEFAULT_SOFTWARE_ARCH_STATE);
  }, []);

  const compiled = useMemo(() => compileSoftwareArchPrompt(state), [state]);
  const blueprintSummary = useMemo(
    () => buildArchBlueprintChecklist(state),
    [state]
  );

  const handleCopySpec = async () => {
    try {
      await navigator.clipboard.writeText(blueprintSummary);
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
          Szoftver-Architektúra Stúdió betöltése...
        </p>
      </div>
    );
  }

  if (!isAdmin && !allowedTools.includes(TOOL_ID)) {
    return (
      <ToolAccessLock toolName="Webes & Szoftver-Architektúra Pro Prompt Stúdió" />
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
              PRO PROMPT · 4. PILLÉR (SOFTWARE ARCH &amp; AGENTS)
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
            <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
            C4 Mermaid · PRD &amp; ADR · Firestore/RLS · OWASP AISVS 2026 · Coding Agent Sprint
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading text-[#0F172A] dark:text-white tracking-tight">
            Webes &amp; Szoftver-Architektúra Pro Prompt Stúdió
          </h1>
          <p className="text-sm sm:text-base text-[#334155] dark:text-slate-300 leading-relaxed">
            7-fázisú szoftvermérnöki és AI Coding Agent prompt-fordító: C4
            Mermaid rendszerterv, PRD + ADR trade-off mátrix, Firestore/PostgreSQL
            RBAC séma, OWASP AISVS &lt;untrusted_data&gt; védelem, Core Web Vitals
            refaktor és 5-pilléres Coding Agent Sprint (Claude XML, ChatGPT / Cursor,
            Gemini / Antigravity, Perplexity).
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <SoftwareArchForm
              state={state}
              onUpdate={updateField}
              onApplyPreset={applyPreset}
              onReset={resetState}
            />
            <SoftwareArchTechPanel state={state} onUpdate={updateField} />
          </div>

          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <section
              aria-label="Élő Architektúra és QA Műszaki Összefoglaló"
              className="rounded-3xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#111C33]/90 p-5 space-y-3 shadow-[0_12px_36px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0369A1] dark:text-[#00B5F1]">
                  <FileCheck2 className="w-4 h-4" aria-hidden="true" />
                  Élő Architektúra &amp; QA Adatlap
                </span>
                <button
                  type="button"
                  onClick={handleCopySpec}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
                >
                  {specCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {specCopied ? "Másolva!" : "Műszaki Összefoglaló Másolása"}
                </button>
              </div>
              <pre className="whitespace-pre-wrap break-words rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1120] p-3.5 text-[11px] font-mono text-[#0F172A] dark:text-slate-200 leading-relaxed">
                {blueprintSummary}
              </pre>
              <p className="sr-only" aria-live="polite">
                {specCopied ? "Az architektúra és QA műszaki összefoglaló a vágólapra másolva." : ""}
              </p>
            </section>

            <LivePromptPreviewCard
              compiled={compiled}
              domain="software-arch"
              brief={state.objectiveBrief}
              negativeSectionLabel="Aktív Mérnöki Guardrail-ek & OWASP AISVS Szabályok"
              className="lg:static"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
