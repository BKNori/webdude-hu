"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Button from "@/components/atoms/Button";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const consent = localStorage.getItem("cookieConsent");
      if (!consent) {
        setShowConsent(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowConsent(false);
    // Load Google Analytics scripts dynamically
    if (
      typeof window !== "undefined" &&
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    ) {
      // Load GA scripts
      const script1 = document.createElement("script");
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`;
      script1.async = true;
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
          'anonymize_ip': true,
          'cookie_flags': 'SameSite=None;Secure'
        });
      `;
      script2.setAttribute("data-ga", "true");
      document.head.appendChild(script2);
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowConsent(false);
    // Remove GA scripts if they were loaded
    if (typeof window !== "undefined") {
      const gaScript = document.querySelector(
        'script[src*="googletagmanager"]'
      );
      if (gaScript) {
        gaScript.remove();
      }
      const gaDataScript = document.querySelector("script[data-ga]");
      if (gaDataScript) {
        gaDataScript.remove();
      }
    }
  };

  if (!mounted || !showConsent) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 z-50 pointer-events-none"
    >
      <div className="bg-bg-surface border border-sky-500/50 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-xl bg-opacity-95 pointer-events-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-text-primary mb-2">
              🍪 Cookie-k és Analitika
            </h3>
            <p className="text-sm text-slate-400 mb-2">
              Sütiket használunk a felhasználói élmény javításához és a weboldal
              forgalmának elemzéséhez. Az adatok segítenek nekünk jobb
              szolgáltatást nyújtani.
            </p>
            <p className="text-xs text-slate-500">
              További információ:{" "}
              <Link
                href="/adatvedelmi-szabalyzat"
                className="text-sky-500 hover:text-violet-700 underline"
              >
                Adatvédelmi Szabályzat
              </Link>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              onClick={handleAccept}
              variant="primary"
              className="flex-1 md:flex-none"
            >
              Elfogadom
            </Button>
            <Button
              onClick={handleDecline}
              variant="secondary"
              className="flex-1 md:flex-none"
              analyticsEvent="cookie_consent_declined"
            >
              Elutasítom
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
