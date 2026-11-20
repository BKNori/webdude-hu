"use client";

import Link from "next/link";
import ProductPortalCta from "@/components/molecules/ProductPortalCta";
import HeroBackdrop from "@/components/molecules/HeroBackdrop";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";

export default function AIChatbotStarterPage() {
  return (
    <>
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
          <section className="relative py-24 md:py-32 overflow-hidden">
            <HeroBackdrop src="/assets/banners/hero-termekek.webp" />
            <div className="absolute inset-0 bg-linear-to-b from-[#0369A1]/5 dark:from-[#00B5F1]/5 via-transparent to-transparent pointer-events-none" />
            <div className="max-w-6xl mx-auto px-6 relative z-10">
              <div className="text-center space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] dark:text-text-primary tracking-tight">
                  AI Chatbot Starter
                </h1>
                <p className="text-lg text-[#334155] dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Válaszolj azonnal minden ügyfélkérésre 24/7. Magyar nyelvű AI chatbot rendszer, amely azonnal integrálható bármilyen weboldalra. 85% support költség csökkenés, 3.2x ügyfél elégedettség.
                </p>
              </div>
            </div>
          </section>

          <DirectAnswerBlock
            id="ai-chatbot-starter-direct-answer"
            question="Hogyan működik az AI Chatbot Starter a vállalati weboldalakon?"
            answer="Magyar nyelvű, saját tudásbázisra tanított AI ügyfélszolgálati asszisztens, amely 24/7 válaszol a látogatói kérdésekre és minősíti a beérkező leadeket. 5 perc alatt beilleszthető Next.js vagy WordPress weboldalra, 26 év vizuális és 16 év webfejlesztői tapasztalattal — egyedi árajánlat alapján."
          />

          <section className="py-16 md:py-24 border-t border-slate-200 dark:border-slate-800/80 bg-[#F1F5F9] dark:bg-transparent">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-[#0F172A] dark:text-text-primary mb-8 text-center tracking-tight">
                Üzleti Eredmények
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="luminous-card rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-text-primary mb-2">
                    85% support költség csökkenés
                  </h3>
                  <p className="text-sm text-[#334155] dark:text-slate-400">
                    Automatizált ügyfélszolgálat 24/7 elérhetőséggel
                  </p>
                </div>
                <div className="luminous-card rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-text-primary mb-2">
                    3.2x ügyfél elégedettség
                  </h3>
                  <p className="text-sm text-[#334155] dark:text-slate-400">
                    Azonnali válaszidő és magyar nyelvű AI válaszok
                  </p>
                </div>
                <div className="luminous-card rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-text-primary mb-2">
                    Egyedi knowledge base
                  </h3>
                  <p className="text-sm text-[#334155] dark:text-slate-400">
                    Saját tudásbázis feltöltése és testreszabás
                  </p>
                </div>
                <div className="luminous-card rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-[#0F172A] dark:text-text-primary mb-2">
                    Egyszerű weboldal integráció
                  </h3>
                  <p className="text-sm text-[#334155] dark:text-slate-400">
                    5 perc alatt beilleszthető bármilyen weboldalra
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 border-t border-slate-200 dark:border-slate-800/80">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-[#0F172A] dark:text-text-primary mb-4 tracking-tight">
                Egyedi árajánlat
              </h2>
              <p className="text-[#334155] dark:text-slate-400 mb-8">
                Az ajánlat a projektméretedhez és az integrációs igényekhez igazodik — nincs dobozos csomag, nincs rejtett költség.
              </p>
              <div className="luminous-card rounded-3xl p-8 max-w-md mx-auto">
                <p className="text-[#334155] dark:text-slate-400 mb-6">
                  Projektszintű felmérés és előre egyeztetett, fix határidő — a munkakezdés előtt.
                </p>
                <Link
                  href="/kapcsolat"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-bold rounded-full uppercase tracking-wider text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-bg-base"
                >
                  Egyedi ajánlat kérése
                </Link>
                <p className="text-xs text-[#475569] dark:text-slate-400 mt-4">
                  Válasz 24 órán belül — közvetlenül tőlem
                </p>
              </div>
            </div>
          </section>

          <ProductPortalCta productName="AI Chatbot Starter" />
        </div>
    </>
  );
}
