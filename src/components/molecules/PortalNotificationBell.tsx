"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "motion/react";
import { Bell, Sparkles, FileText, AlertCircle } from "lucide-react";
import { usePortalNotifications } from "@/hooks/usePortalNotifications";

/**
 * Portál harang — valós idejű értesítések (generálás státusz + Vault dokumentumok).
 * Kék-Lila v7.0 akcentus, motion/react spring, WCAG (aria-label, keyboard).
 * Egyszerűsített verzió: csak badge számláló és alapvető státuszok.
 */
export default function PortalNotificationBell() {
  const { counts, loading } = usePortalNotifications();
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const spring = { type: "spring" as const, stiffness: 300, damping: 22 };
  const rootRef = useRef<HTMLDivElement>(null);

  // Click-outside + Escape: a panel bezáródik külső kattintásra vagy Esc-re
  useEffect(() => {
    if (!open) return;
    const handleMouseDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const totalNotifications = counts.total;
  const hasNotifications = totalNotifications > 0;

  return (
    <div ref={rootRef} className="relative">
      <span className="sr-only" role="status" aria-live="polite">
        {!loading && hasNotifications
          ? `${totalNotifications} értesítés`
          : "Nincsenek értesítések"}
      </span>
      <button
        type="button"
        aria-label={
          hasNotifications
            ? `Értesítések: ${totalNotifications}`
            : "Értesítések"
        }
        onClick={() => setOpen((o) => !o)}
        className="relative p-2.5 rounded-xl border border-slate-700/80 bg-slate-950/80 backdrop-blur-xl text-slate-300 hover:text-[#00B5F1] hover:border-[#00B5F1]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        <Bell className="w-5 h-5" aria-hidden />
        <AnimatePresence>
          {!loading && hasNotifications && (
            <motion.span
              initial={shouldReduceMotion ? {} : { scale: 0 }}
              animate={shouldReduceMotion ? {} : { scale: 1 }}
              exit={shouldReduceMotion ? {} : { scale: 0 }}
              transition={spring}
              className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-[#5B21B6] text-white text-[11px] font-black flex items-center justify-center shadow-[0_0_12px_rgba(91,33,182,0.6)]"
            >
              {totalNotifications > 9 ? "9+" : totalNotifications}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Értesítések"
            initial={
              shouldReduceMotion ? {} : { opacity: 0, y: -8, scale: 0.97 }
            }
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: -8, scale: 0.97 }}
            transition={spring}
            className="absolute right-0 mt-3 w-80 z-50 bg-slate-950/95 backdrop-blur-2xl border border-slate-700/80 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-slate-800/80 text-xs font-bold uppercase tracking-widest text-slate-400">
              Értesítések
            </div>
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
              {loading ? (
                <div className="px-4 py-6 text-sm text-slate-500 text-center">
                  Betöltés...
                </div>
              ) : totalNotifications === 0 ? (
                <div className="px-4 py-6 text-sm text-slate-500 text-center">
                  Még nincsenek értesítések.
                </div>
              ) : (
                <>
                  {/* Generálások */}
                  {counts.pendingGenerations > 0 && (
                    <div className="flex gap-3 px-4 py-3 border-l-2 border-l-[#00B5F1] bg-sky-500/5">
                      <Sparkles
                        className="w-4 h-4 mt-0.5 shrink-0 text-[#00B5F1]"
                        aria-hidden
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-200">
                          Folyamatban lévő generálások
                        </div>
                        <div className="text-xs text-slate-400">
                          {counts.pendingGenerations} db
                        </div>
                      </div>
                    </div>
                  )}
                  {counts.completedGenerations > 0 && (
                    <div className="flex gap-3 px-4 py-3 border-l-2 border-l-emerald-500 bg-emerald-500/5">
                      <Sparkles
                        className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500"
                        aria-hidden
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-200">
                          Befejezett generálások
                        </div>
                        <div className="text-xs text-slate-400">
                          {counts.completedGenerations} db
                        </div>
                      </div>
                    </div>
                  )}
                  {counts.failedGenerations > 0 && (
                    <div className="flex gap-3 px-4 py-3 border-l-2 border-l-red-500 bg-red-500/5">
                      <AlertCircle
                        className="w-4 h-4 mt-0.5 shrink-0 text-red-500"
                        aria-hidden
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-200">
                          Sikertelen generálások
                        </div>
                        <div className="text-xs text-slate-400">
                          {counts.failedGenerations} db
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Vault dokumentumok */}
                  {counts.newVaultFiles > 0 && (
                    <div className="flex gap-3 px-4 py-3 border-l-2 border-l-[#00B5F1] bg-sky-500/5">
                      <FileText
                        className="w-4 h-4 mt-0.5 shrink-0 text-[#00B5F1]"
                        aria-hidden
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-200">
                          Vault dokumentumok
                        </div>
                        <div className="text-xs text-slate-400">
                          {counts.newVaultFiles} db fájl
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
