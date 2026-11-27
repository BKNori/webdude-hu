"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Button from "@/components/atoms/Button";
import {
  isValidGaMeasurementId,
  updateAnalyticsConsent,
} from "@/lib/analytics";
import type { CookieConsentContent } from "@/types/dictionary";

interface CookieConsentProps {
  dictionary?: CookieConsentContent;
}

const CONSENT_STORAGE_KEY = "cookieConsent";
const SHOW_DELAY_MS = 900;

export default function CookieConsent({ dictionary }: CookieConsentProps) {
  const [showConsent, setShowConsent] = useState(false);

  const ensureGaLoaded = useCallback(() => {
    if (typeof window === "undefined") return;
    const rawId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!isValidGaMeasurementId(rawId)) return;
    const measurementId = rawId.trim();

    if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
      updateAnalyticsConsent("granted");
      return;
    }

    const script1 = document.createElement("script");
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.textContent = `
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
      window.gtag('consent', 'default', {
        'analytics_storage': 'granted',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
      window.gtag('js', new Date());
      window.gtag('config', '${measurementId}', {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
      });
    `;
    script2.setAttribute("data-ga", "true");
    document.head.appendChild(script2);
    updateAnalyticsConsent("granted");
  }, []);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | null = null;
    let storedConsent: string | null = null;

    try {
      storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch {
      // Storage blocked (pl. inkognitó korlátozás) -> ne blokkolja az oldalt
      return;
    }

    if (storedConsent === "accepted") {
      const scheduleGa = () => {
        if (!cancelled) ensureGaLoaded();
      };
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(scheduleGa, { timeout: 1500 });
        return () => {
          cancelled = true;
          if (idleId !== null && typeof window.cancelIdleCallback === "function") {
            window.cancelIdleCallback(idleId);
          }
        };
      }
      const gaTimerId = setTimeout(scheduleGa, 0);
      return () => {
        cancelled = true;
        clearTimeout(gaTimerId);
      };
    }

    if (storedConsent) {
      return;
    }

    const revealIfUnset = () => {
      if (cancelled) return;
      try {
        if (!localStorage.getItem(CONSENT_STORAGE_KEY)) {
          setShowConsent(true);
        }
      } catch {
        // Ignore storage read errors
      }
    };

    const timerId = setTimeout(() => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(revealIfUnset, { timeout: 600 });
      } else {
        revealIfUnset();
      }
    }, SHOW_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(timerId);
      if (idleId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
    };
  }, [ensureGaLoaded]);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    } catch {
      // Ignore storage write errors
    }
    setShowConsent(false);

    if (typeof window !== "undefined") {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(ensureGaLoaded, { timeout: 1500 });
      } else {
        setTimeout(ensureGaLoaded, 0);
      }
    }
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, "declined");
    } catch {
      // Ignore storage write errors
    }
    setShowConsent(false);
    updateAnalyticsConsent("denied");

    if (typeof window !== "undefined") {
      document.querySelector('script[src*="googletagmanager"]')?.remove();
      document.querySelector("script[data-ga]")?.remove();
    }
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div
      /**
       * z-index: a banner a header (`z-40`) ALATT marad (`z-30`),
       * így soha nem fedi el a fejlécet vagy a mobil hamburger menüt.
       * `fixed` pozíció + késleltetett megjelenítés -> CLS = 0, és nem
       * rabolja el az LCP mérést a Hero H1 / háttérkép elől.
       */
      className="fixed bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:left-8 md:right-8 z-30 pointer-events-none cookie-banner-enter"
      role="dialog"
      aria-label={dictionary?.ariaLabel ?? "Cookie-k és analitika beállítások"}
    >
      <div className="max-w-4xl mx-auto max-h-[45vh] overflow-y-auto overscroll-contain bg-bg-surface/95 border border-slate-200 dark:border-sky-500/40 rounded-2xl p-3.5 sm:p-5 shadow-2xl backdrop-blur-xl pointer-events-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2.5 sm:gap-4 md:gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base font-sans font-bold text-text-primary leading-snug mb-0.5 sm:mb-1">
              {dictionary?.title ?? "Cookie-k és Analitika"}
            </p>
            <p className="text-xs sm:text-sm text-text-secondary leading-snug">
              <span className="line-clamp-2 sm:line-clamp-none">
                {dictionary?.description ??
                  "Sütiket használok a felhasználói élmény javításához és a forgalom elemzéséhez."}
              </span>{" "}
              <Link
                href={dictionary?.privacyHref ?? "/adatvedelmi-szabalyzat"}
                className="inline text-xs font-semibold text-[#0369A1] dark:text-sky-400 hover:text-violet-700 dark:hover:text-violet-300 underline whitespace-nowrap"
              >
                {dictionary?.privacyPolicy ?? "Adatvédelmi Szabályzat"}
              </Link>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-3 w-full md:w-auto shrink-0">
            <Button
              onClick={handleAccept}
              variant="primary"
              className="px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm"
            >
              {dictionary?.accept ?? "Elfogadom"}
            </Button>
            <Button
              onClick={handleDecline}
              variant="secondary"
              className="px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm"
              analyticsEvent="cookie_consent_declined"
            >
              {dictionary?.decline ?? "Elutasítom"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
