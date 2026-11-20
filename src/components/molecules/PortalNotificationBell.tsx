"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import {
  Bell,
  Sparkles,
  FileText,
  AlertCircle,
  RefreshCw,
  CheckCheck,
} from "lucide-react";
import { usePortalNotifications } from "@/hooks/usePortalNotifications";

/**
 * Portál harang — Spark-barát Anti-Drain értesítések (60 mp visibility-aware polling).
 * Kék-Lila v7.0 akcentus (`#00B5F1` / `#5B21B6`), motion/react spring, WCAG AA/AAA.
 */
export default function PortalNotificationBell() {
  const {
    counts,
    items,
    unreadCount,
    loading,
    refreshing,
    lastUpdatedAt,
    refresh,
    markAllAsRead,
  } = usePortalNotifications();
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useHydratedReducedMotion();
  const spring = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 22 };
  const rootRef = useRef<HTMLDivElement>(null);

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

  const hasUnread = unreadCount > 0;

  return (
    <div ref={rootRef} className="relative">
      <span className="sr-only" role="status" aria-live="polite">
        {!loading && hasUnread
          ? `${unreadCount} olvasatlan értesítés`
          : "Nincsenek olvasatlan értesítések"}
      </span>

      <button
        type="button"
        aria-label={
          hasUnread
            ? `Értesítések: ${unreadCount} olvasatlan`
            : "Értesítések"
        }
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="relative p-2.5 rounded-xl border border-slate-700/80 bg-slate-950/80 backdrop-blur-xl text-slate-300 hover:text-[#00B5F1] hover:border-[#00B5F1]/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
      >
        <Bell className="w-5 h-5" aria-hidden="true" />
        <AnimatePresence>
          {!loading && hasUnread && (
            <motion.span
              initial={shouldReduceMotion ? false : { scale: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0 }}
              transition={spring}
              className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-linear-to-r from-[#075985] to-[#5B21B6] text-white text-[11px] font-black font-mono tabular-nums flex items-center justify-center shadow-[0_0_12px_rgba(91,33,182,0.6)]"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
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
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }
            }
            animate={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }
            }
            transition={spring}
            className="absolute right-0 mt-3 w-80 sm:w-96 z-50 bg-slate-950/95 backdrop-blur-2xl border border-slate-700/80 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Header + Controls */}
            <div className="px-4 py-3 border-b border-slate-800/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300 font-mono">
                  Értesítések
                </span>
                {hasUnread && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#5B21B6] text-white text-[10px] font-mono font-bold tabular-nums">
                    {unreadCount} új
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => void refresh()}
                  disabled={refreshing}
                  aria-label="Értesítések manuális frissítése"
                  title="Frissítés"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#00B5F1] hover:bg-slate-800/70 transition-colors cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#00B5F1]" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <button
                  type="button"
                  onClick={markAllAsRead}
                  disabled={!hasUnread}
                  aria-label="Összes értesítés olvasottnak jelölése"
                  title="Összes olvasottnak jelölése"
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono font-semibold text-slate-300 hover:text-white bg-slate-800/70 hover:bg-[#5B21B6]/60 border border-slate-700/70 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
                >
                  <CheckCheck className="w-3 h-3" aria-hidden="true" />
                  <span>Olvasott</span>
                </button>
              </div>
            </div>

            {/* Notification Items */}
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
              {loading ? (
                <div className="px-4 py-6 text-sm text-slate-400 text-center">
                  Betöltés...
                </div>
              ) : items.length === 0 && counts.total === 0 ? (
                <div className="px-4 py-6 text-sm text-slate-400 text-center">
                  Még nincsenek értesítések.
                </div>
              ) : (
                items.map((item) => {
                  const Icon =
                    item.tone === "error"
                      ? AlertCircle
                      : item.kind === "vault"
                        ? FileText
                        : Sparkles;
                  const borderAccent =
                    item.tone === "error"
                      ? "border-l-red-500 bg-red-500/5"
                      : item.tone === "success"
                        ? "border-l-emerald-500 bg-emerald-500/5"
                        : "border-l-[#00B5F1] bg-[#00B5F1]/5";
                  const iconColor =
                    item.tone === "error"
                      ? "text-red-400"
                      : item.tone === "success"
                        ? "text-emerald-400"
                        : "text-[#00B5F1]";

                  return (
                    <div
                      key={item.key}
                      className={`flex items-start gap-3 px-4 py-3 border-l-2 ${borderAccent} ${
                        item.unread ? "opacity-100" : "opacity-65"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 mt-0.5 shrink-0 ${iconColor}`}
                        aria-hidden="true"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-slate-100 truncate">
                            {item.title}
                          </span>
                          {item.unread && (
                            <span
                              className="w-2 h-2 rounded-full bg-[#00B5F1] shrink-0"
                              aria-label="Olvasatlan"
                            />
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>60 mp-es aktív fül frissítés</span>
              <span>{lastUpdatedAt ? `Frissítve: ${lastUpdatedAt}` : "—"}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
