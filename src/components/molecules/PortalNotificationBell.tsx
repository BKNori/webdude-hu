"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "motion/react";
import { Bell, FileText, Sparkles } from "lucide-react";
import { usePortalNotifications } from "@/hooks/usePortalNotifications";

/**
 * Portál harang — valós idejű értesítések (generálás státusz + vault dokumentum).
 * Cyber-Arany akcentus, motion/react spring, WCAG (aria-label, keyboard).
 */
export default function PortalNotificationBell() {
  const { notifications, unseenCount, ready, markAllSeen } =
    usePortalNotifications();
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const spring = { type: "spring" as const, stiffness: 300, damping: 22 };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={
          unseenCount > 0
            ? `Értesítések: ${unseenCount} olvasatlan`
            : "Értesítések"
        }
        onClick={() => {
          setOpen((o) => !o);
          if (!open) markAllSeen();
        }}
        className="relative p-2.5 rounded-xl border border-slate-700/80 bg-slate-950/80 backdrop-blur-xl text-slate-300 hover:text-[#00B5F1] hover:border-[#00B5F1]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        <Bell className="w-5 h-5" aria-hidden />
        <AnimatePresence>
          {ready && unseenCount > 0 && (
            <motion.span
              initial={shouldReduceMotion ? {} : { scale: 0 }}
              animate={shouldReduceMotion ? {} : { scale: 1 }}
              exit={shouldReduceMotion ? {} : { scale: 0 }}
              transition={spring}
              className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-[#00B5F1] text-black text-[11px] font-black flex items-center justify-center shadow-[0_0_12px_rgba(0, 181, 241,0.6)]"
            >
              {unseenCount > 9 ? "9+" : unseenCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -8, scale: 0.97 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: -8, scale: 0.97 }}
            transition={spring}
            className="absolute right-0 mt-3 w-80 z-50 bg-slate-950/95 backdrop-blur-2xl border border-slate-700/80 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-slate-800/80 text-xs font-bold uppercase tracking-widest text-slate-400">
              Értesítések
            </div>
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
              {notifications.length === 0 && (
                <div className="px-4 py-6 text-sm text-slate-500 text-center">
                  Még nincsenek értesítések.
                </div>
              )}
              {notifications.map((n) => (
                <div key={`${n.kind}-${n.id}`} className="flex gap-3 px-4 py-3">
                  {n.kind === "generation" ? (
                    <Sparkles
                      className="w-4 h-4 mt-0.5 text-[#00B5F1] shrink-0"
                      aria-hidden
                    />
                  ) : (
                    <FileText
                      className="w-4 h-4 mt-0.5 text-[#00B5F1] shrink-0"
                      aria-hidden
                    />
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-200 truncate">
                      {n.title}
                    </div>
                    <div className="text-xs text-slate-400 truncate">
                      {n.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
