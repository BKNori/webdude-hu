"use client";

import { useEffect } from "react";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";

interface SegmentErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Útvonal-szintű hibahatár (`app/error.tsx`):
 * Az aloldalakon fellépő váratlan kliens/renderelési hibákat rögzíti a Sentry-ben,
 * megőrizve a RootLayout navigációját és témabeállításait.
 */
export default function AppError({ error, reset }: SegmentErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-6 py-24">
      <div className="luminous-card w-full max-w-lg p-8 sm:p-10 text-center space-y-5">
        <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] inline-block">
          Átmeneti hiba
        </span>
        <h1 className="text-2xl sm:text-3xl font-heading text-[#0F172A] dark:text-white">
          Valami félrement a tartalom megjelenítésekor
        </h1>
        <p className="text-sm sm:text-base text-[#334155] dark:text-slate-300 leading-relaxed">
          A részleteket naplóztam, hogy gyorsan elháríthassam. Kattints az
          újrapróbálásra, vagy folytasd a böngészést a főoldalon.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] transition-all cursor-pointer"
          >
            Újrapróbálás
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0F172A] dark:text-white border border-slate-300 dark:border-white/25 hover:border-[#0369A1] dark:hover:border-[#00B5F1] transition-colors"
          >
            Vissza a főoldalra
          </Link>
        </div>
      </div>
    </section>
  );
}
