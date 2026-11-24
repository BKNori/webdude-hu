"use client";

import React from "react";
import Link from "next/link";
import { Lock, ArrowRight, Sparkles, LogIn } from "lucide-react";

interface ToolAccessLockProps {
  /** A zárolt eszköz megjelenített neve (opcionális). */
  toolName?: string;
  /**
   * `guest`  → nincs bejelentkezve (Bejelentkezés + Hozzáférés igénylése CTA)
   * `denied` → bejelentkezett, de az `allowedTools` nem tartalmazza a modult
   */
  variant?: "guest" | "denied";
}

const primaryCtaClass =
  "inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white font-bold rounded-xl uppercase tracking-wider text-xs transition-all duration-300 shadow-[0_8px_24px_rgba(124,58,237,0.3)] hover:shadow-[0_12px_32px_rgba(124,58,237,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base";
const secondaryCtaClass =
  "inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-transparent border border-slate-300 dark:border-slate-700 hover:border-[#0369A1] dark:hover:border-[#00B5F1]/60 text-slate-700 dark:text-slate-200 hover:text-[#0369A1] dark:hover:text-white font-bold rounded-xl uppercase tracking-wider text-xs transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]";

/**
 * Prémium Kék-Lila v7.2 Dual Theme zárolt panel az AI generátorok elé.
 */
export default function ToolAccessLock({
  toolName,
  variant = "denied",
}: ToolAccessLockProps) {
  const isGuest = variant === "guest";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-[#00B5F1]/25 bg-white dark:bg-[#0F172A]/95 p-8 md:p-12 text-center max-w-2xl mx-auto shadow-md dark:shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0369A1]/8 dark:bg-[#00B5F1]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-16 w-72 h-72 bg-[#5B21B6]/10 dark:bg-[#5B21B6]/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-linear-to-br from-[#075985] to-[#5B21B6] border border-[#0369A1]/30 dark:border-[#00B5F1]/30 flex items-center justify-center shadow-[0_0_32px_rgba(3,105,161,0.2)]">
          <Lock
            className="w-9 h-9 text-white"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest font-bold text-[#0369A1] dark:text-[#00B5F1] bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/20">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Prémium AI Modul
          </span>
          <h2 className="text-2xl md:text-3xl text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
            {toolName ? `${toolName} — ` : ""}
            {isGuest ? "Bejelentkezés szükséges" : "Zárolva"}
          </h2>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
            {isGuest
              ? "Ez a generátor kizárólag bejelentkezett, jóváhagyott ügyfeleim számára érhető el. Jelentkezz be a portálra, vagy igényelj hozzáférést."
              : "Ez a generátor kizárólag a WebDude által jóváhagyott felhasználók számára érhető el. Kérj egyedi árajánlatot, és hozzáférést kapsz a prémium AI eszköztárhoz."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {isGuest && (
            <Link href="/portal" className={primaryCtaClass}>
              <LogIn className="w-4 h-4" aria-hidden="true" />
              Bejelentkezés
            </Link>
          )}
          <Link
            href="/kapcsolat"
            className={isGuest ? secondaryCtaClass : primaryCtaClass}
          >
            Hozzáférés igénylése
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          {!isGuest && (
            <Link href="/portal" className={secondaryCtaClass}>
              Vissza a Portálhoz
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
