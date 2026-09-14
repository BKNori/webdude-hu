"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { auth } from "@/lib/firebase";
import { runLighthouseAuditAction } from "@/actions/lighthouse";
import { createStripeCheckoutSessionAction } from "@/actions/stripe";
import { LighthouseMetrics } from "@/types/lighthouse";
import Button from "@/components/atoms/Button";
import Spinner from "@/components/atoms/Spinner";
import {
  Gauge,
  Accessibility,
  ShieldCheck,
  Search,
  ShieldAlert,
} from "lucide-react";

export default function LighthouseAuditor() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<LighthouseMetrics | null>(null);
  const [clientId, setClientId] = useState<string>("anonymous_client");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setClientId(user.uid);
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
        try {
          let anonId = localStorage.getItem("lighthouse_anon_id");
          if (!anonId) {
            anonId = "lh_anon_" + Math.random().toString(36).substring(2, 15);
            localStorage.setItem("lighthouse_anon_id", anonId);
          }
          setClientId(anonId);
        } catch {
          setClientId("anonymous_client");
        }
      }
    });
    return () => unsub();
  }, []);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setMetrics(null);

    try {
      let formattedUrl = url.trim();
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = "https://" + formattedUrl;
      }
      setUrl(formattedUrl);

      const res = await runLighthouseAuditAction(formattedUrl, clientId);
      if (res.success && res.data) {
        setMetrics(res.data);
      } else {
        setError(res.error || "Sikertelen Lighthouse audit.");
      }
    } catch {
      setError("Váratlan hiba történt a mérés során.");
    } finally {
      setLoading(false);
    }
  };

  const handleOrderOptimization = async () => {
    if (!auth) return;
    const user = auth.currentUser;
    if (!user) {
      setError(
        "A kiegészítő megrendeléséhez kérlek előbb lépj be az Ügyfélkapuba!"
      );
      return;
    }

    setCheckoutLoading(true);
    setError(null);

    try {
      const idToken = await user.getIdToken();
      const res = await createStripeCheckoutSessionAction(
        idToken,
        "addon",
        "addon_speed_opt",
        window.location.origin
      );

      if (res.success && res.url) {
        window.location.href = res.url;
      } else {
        setError(res.error || "Nem sikerült elindítani a fizetési folyamatot.");
      }
    } catch {
      setError("Hálózati hiba történt a Stripe kapcsolat létesítésekor.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="bg-bg-elevated/30 backdrop-blur-md border border-slate-800/50 rounded-2xl p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 text-slate-400">
            <Gauge className="w-6 h-6" strokeWidth={1.5} />
            <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider font-mono">
              Azonnali Lighthouse Audit
            </h3>
          </div>
          <p className="text-slate-400 text-sm">
            Mérd le weboldalad betöltési sebességét és SEO mutatóit a Google
            PageSpeed API segítségével.
          </p>
        </div>

        <form onSubmit={handleAudit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
                strokeWidth={1.5}
              />
              <input
                type="text"
                placeholder="pl. https://webdude.hu"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading || checkoutLoading}
                aria-label="Weboldal URL címe"
                className="w-full pl-11 pr-4 py-3 bg-slate-900/40 border border-slate-700/50 rounded-full text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 focus:ring-offset-0 transition-all disabled:opacity-50"
              />
            </div>
            <Button
              type="submit"
              disabled={loading || !url || checkoutLoading}
              loading={loading}
              variant="primary"
              className="sm:min-w-40 text-xs font-mono tracking-wider py-3 focus:ring-2 focus:ring-amber-500"
              ariaLabel="Lighthouse audit elindítása"
            >
              Mérés indítása
            </Button>
          </div>
          {error && (
            <p
              className="text-red-500 text-xs text-center font-semibold"
              role="alert"
            >
              {error}
            </p>
          )}
        </form>

        {loading && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Spinner className="w-8 h-8 text-amber-500" />
            <p className="text-xs text-slate-400 uppercase tracking-widest font-mono animate-pulse">
              Google PageSpeed Audit futtatása... Ez eltarthat 15-30
              másodpercig.
            </p>
          </div>
        )}

        {metrics && (
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 pt-6 border-t border-slate-800/50"
          >
            <div className="text-center">
              <p className="text-xs text-slate-400">
                Mért URL:{" "}
                <span className="font-mono text-slate-200 text-xs">
                  {metrics.url}
                </span>
              </p>
            </div>

            {/* Scores Grid - highlighted strictly in Cyber-Arany */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: "Teljesítmény",
                  score: metrics.performance,
                  icon: Gauge,
                },
                {
                  label: "Akadálymentesség",
                  score: metrics.accessibility,
                  icon: Accessibility,
                },
                {
                  label: "Gyakorlatok",
                  score: metrics.bestPractices,
                  icon: ShieldCheck,
                },
                { label: "SEO", score: metrics.seo, icon: Search },
              ].map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.label}
                    className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 text-center flex flex-col justify-center items-center shadow-inner"
                  >
                    <IconComponent
                      className="w-5 h-5 text-slate-500 mb-2"
                      strokeWidth={1.5}
                    />
                    <span className="text-amber-500 text-4xl font-black font-mono tracking-tight">
                      {item.score}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CRO Funnel Card if Performance score is under 95 */}
            {metrics.performance < 95 && (
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.95 }
                }
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900/60 border border-red-500/20 rounded-2xl p-6 text-center space-y-4 shadow-[0_4px_24px_rgba(239,68,68,0.05)]"
              >
                <div className="flex justify-center text-red-500">
                  <ShieldAlert className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-white font-extrabold text-lg">
                    Az oldalad betöltése lassú...
                  </h4>
                  <p className="text-slate-400 text-xs">
                    A mért teljesítményed elmarad a WebDude prémium minőségű SEO
                    standardjától (95+ Lighthouse pontszám).
                  </p>
                </div>

                <div className="pt-2">
                  {isUserLoggedIn ? (
                    <Button
                      onClick={handleOrderOptimization}
                      disabled={checkoutLoading || loading}
                      loading={checkoutLoading}
                      variant="primary"
                      className="w-full text-xs font-mono py-3 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] animate-pulse"
                      ariaLabel="Sebesség optimalizálás kiegészítő megrendelése"
                    >
                      Kérem a 95+ Sebesség-optimalizálást!
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-amber-500/90 text-xs font-bold font-mono">
                        ⚠️ Megrendeléshez kérlek előbb jelentkezz be az
                        Ügyfélkapuba!
                      </p>
                      <Button
                        href="/portal"
                        variant="secondary"
                        className="w-full text-xs font-mono py-3"
                        ariaLabel="Belépés az Ügyfélkapuba megrendeléshez"
                      >
                        Belépés az Ügyfélkapuba
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
