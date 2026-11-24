"use client";

import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import ToolAccessLock from "@/components/molecules/ToolAccessLock";
import { useToolAccess } from "@/hooks/useToolAccess";

interface ToolAccessGateProps {
  /** `src/data/ai-tools-catalog.ts` SSOT modul-azonosító(k). */
  toolId: string | readonly string[];
  /** Megjelenített modulnév a zárolt panelen. */
  toolName: string;
  /** A védett generátor — CSAK `granted` állapotban mountolódik. */
  children: ReactNode;
}

/**
 * AI generátor kapu. A publikus termékoldal (SEO/AEO réteg) szerveroldalon
 * renderelődik, ez a kapu pedig kizárólag a generátor komponenst védi:
 *  - vendég → `ToolAccessLock` (Bejelentkezés / Hozzáférés igénylése)
 *  - bejelentkezett, de nincs `allowedTools` jog → `ToolAccessLock` (Zárolva)
 *  - szuperadmin vagy jogosult ügyfél → generátor
 * A generátor űrlapja soha nem kerül a statikus HTML-be.
 */
export default function ToolAccessGate({ toolId, toolName, children }: ToolAccessGateProps) {
  const status = useToolAccess(toolId);

  if (status === "loading") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center gap-4 py-16"
      >
        <Loader2 className="w-8 h-8 animate-spin text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
        <p className="text-xs font-mono uppercase tracking-widest text-[#475569] dark:text-slate-400">
          Jogosultság ellenőrzése…
        </p>
      </div>
    );
  }

  if (status !== "granted") {
    return <ToolAccessLock toolName={toolName} variant={status} />;
  }

  return <>{children}</>;
}
