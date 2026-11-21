"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Gyökérszintű hibahatár (`global-error.tsx`):
 * Elkapja a RootLayout szintjén keletkező váratlan React renderelési hibákat,
 * továbbítja a Sentry-nek (`Sentry.captureException`), és tiszta Kék-Lila
 * helyreállító felületet jelenít meg a látogatónak.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="hu" data-theme="light">
      <body className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased flex items-center justify-center px-6 py-16">
        <main className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)] space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0369A1]/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#0369A1]">
            Rendszerhiba
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
            Váratlan hiba történt az oldal betöltésekor
          </h1>

          <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
            A hibát automatikusan rögzítettem, hogy mielőbb javítani tudjam.
            Próbáld meg újratölteni a nézetet, vagy térj vissza a főoldalra.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] transition-all cursor-pointer"
            >
              Újrapróbálás
            </button>

            <button
              type="button"
              onClick={() => window.location.assign("/")}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0F172A] border border-slate-300 bg-white hover:border-[#0369A1] transition-colors cursor-pointer"
            >
              Vissza a főoldalra
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
