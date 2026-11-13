"use client";

import React from "react";
import Link from "next/link";
import { Lock, ArrowRight, Sparkles } from "lucide-react";

interface ToolAccessLockProps {
  /** A zárolt eszköz megjelenített neve (opcionális). */
  toolName?: string;
}

/**
 * Prémium Kék-Lila v7.0 zárolt panel az AI generátorok elé.
 * Nem bejelentkezett vagy `allowedTools`-ban nem szereplő
 * felhasználók ezt látják az űrlap helyett.
 */
export default function ToolAccessLock({ toolName }: ToolAccessLockProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#00B5F1]/20 bg-slate-950/90 backdrop-blur-2xl p-8 md:p-12 text-center max-w-2xl mx-auto shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
      {/* Dekoratív glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00B5F1]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-[#5B21B6]/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-linear-to-br from-[#075985] to-[#5B21B6] border border-[#00B5F1]/30 flex items-center justify-center shadow-[0_0_32px_rgba(0,181,241,0.25)]">
          <Lock className="w-9 h-9 text-white" strokeWidth={1.5} />
        </div>

        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest font-bold text-[#00B5F1] bg-[#00B5F1]/10 border border-[#00B5F1]/20">
            <Sparkles className="w-3.5 h-3.5" />
            Prémium AI Modul
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            {toolName ? `${toolName} — ` : ""}Zárolva
          </h2>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-md mx-auto">
            Ez a generátor kizárólag a WebDude által jóváhagyott
            felhasználók számára érhető el. Kérj egyedi árajánlatot, és
            hozzáférést kapsz a prémium AI eszköztárhoz.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/kapcsolat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white font-bold rounded-xl uppercase tracking-wider text-xs transition-all duration-300 shadow-[0_8px_24px_rgba(124,58,237,0.35)] hover:shadow-[0_12px_32px_rgba(124,58,237,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            Hozzáférés igénylése
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/portal"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-slate-700 hover:border-[#00B5F1]/50 text-slate-300 hover:text-white font-bold rounded-xl uppercase tracking-wider text-xs transition-all duration-300"
          >
            Vissza a Portálhoz
          </Link>
        </div>
      </div>
    </div>
  );
}
