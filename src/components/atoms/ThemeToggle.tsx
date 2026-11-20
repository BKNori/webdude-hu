"use client";

import React, { useCallback, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";

type ThemeMode = "light" | "dark";

interface ThemeToggleProps {
  /** "capsule" = kettős kapszula asztali fejlécbe / mobil fiókba; "icon" = kompakt mobil gomb */
  variant?: "capsule" | "icon";
  /** Nyelvi kontextus a hozzáférhető címkékhez */
  lang?: "hu" | "en";
  className?: string;
}

const STORAGE_KEY = "webdude-theme";
const THEME_EVENT = "webdude-theme-change";

function getThemeSnapshot(): ThemeMode {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

function getServerThemeSnapshot(): ThemeMode {
  return "light";
}

function subscribeTheme(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handleCustom = () => callback();
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };
  window.addEventListener(THEME_EVENT, handleCustom);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(THEME_EVENT, handleCustom);
    window.removeEventListener("storage", handleStorage);
  };
}

/**
 * ThemeToggle — Dual Theme (Luminous Daylight / Luminous Slate) kapcsoló.
 *
 * Hydration-biztos: a vizuális aktív állapotot és a csúszó pill pozícióját
 * a Tailwind v4 `dark:` variáns (`[data-theme="dark"]`) vezérli, míg az
 * `aria-pressed` és `aria-label` állapotokat a `useSyncExternalStore` szinkronizálja.
 */
export default function ThemeToggle({
  variant = "capsule",
  lang = "hu",
  className = "",
}: ThemeToggleProps) {
  const shouldReduceMotion = useHydratedReducedMotion();
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const toggleTheme = useCallback(() => {
    const current = getThemeSnapshot();
    const next: ThemeMode = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignored if storage is restricted
    }
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: next }));
  }, []);

  const isDark = theme === "dark";
  const ariaLabel =
    lang === "en"
      ? isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
      : isDark
        ? "Váltás világos módra"
        : "Váltás sötét módra";

  if (variant === "icon") {
    return (
      <motion.button
        type="button"
        onClick={toggleTheme}
        aria-label={ariaLabel}
        aria-pressed={isDark}
        whileTap={shouldReduceMotion ? { scale: 1 } : { scale: 0.92 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 100, damping: 20 }
        }
        className={`relative flex items-center justify-center w-11 h-11 min-w-11 min-h-11 rounded-xl border border-slate-300/80 bg-slate-100/85 text-slate-700 hover:text-[#0369A1] hover:border-[#0369A1]/50 dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:text-[#00B5F1] dark:hover:border-[#00B5F1]/50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base ${className}`}
      >
        <Sun
          aria-hidden="true"
          className="w-5 h-5 scale-100 rotate-0 opacity-100 dark:scale-0 dark:-rotate-90 dark:opacity-0 transition-[transform,opacity] duration-300 motion-reduce:transition-none"
        />
        <Moon
          aria-hidden="true"
          className="w-5 h-5 absolute scale-0 rotate-90 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100 transition-[transform,opacity] duration-300 motion-reduce:transition-none"
        />
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      aria-pressed={isDark}
      whileTap={shouldReduceMotion ? { scale: 1 } : { scale: 0.96 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 100, damping: 20 }
      }
      className={`relative inline-flex items-center justify-between w-16 h-9 p-1 rounded-full border border-slate-300/80 bg-slate-100/90 dark:border-slate-700/70 dark:bg-slate-900/75 backdrop-blur-md transition-colors duration-300 hover:border-[#0369A1]/50 dark:hover:border-[#00B5F1]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base ${className}`}
    >
      {/* Csúszó aktív pill */}
      <span
        aria-hidden="true"
        className="absolute left-1 top-1 w-7 h-7 rounded-full bg-white dark:bg-[#16223B] border border-slate-200/90 dark:border-[#00B5F1]/40 shadow-xs dark:shadow-[0_0_12px_rgba(0,181,241,0.28)] translate-x-0 dark:translate-x-7 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
      />

      <span className="relative z-10 flex items-center justify-center w-7 h-7">
        <Sun
          aria-hidden="true"
          className="w-4 h-4 text-[#0369A1] dark:text-slate-400 transition-colors duration-200"
        />
      </span>
      <span className="relative z-10 flex items-center justify-center w-7 h-7">
        <Moon
          aria-hidden="true"
          className="w-4 h-4 text-slate-400 dark:text-[#00B5F1] transition-colors duration-200"
        />
      </span>
    </motion.button>
  );
}
