"use client";

import Link from "next/link";
import ProductPortalCta from "@/components/molecules/ProductPortalCta";
import HeroBackdrop from "@/components/molecules/HeroBackdrop";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";

export default function KristofkaMunkafolyamatPage() {
  return (
    <>
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <HeroBackdrop src="/assets/banners/hero-termekek.webp" />
          <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] dark:text-text-primary tracking-tight">
                Kristófka Munkafolyamat
              </h1>
              <p className="text-lg text-[#334155] dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Ingatlanbefektetői pitch generálás PDF alaprajzokból és
                kontextus paraméterekből. Strategist-Pro szintű AI workflow.
                4.8x befektetői konverzió, 72% pitch idő megtakarítás,
                mért ügyfél-eredmény (ROI) támogatással.
              </p>
            </div>
          </div>
        </section>

        <DirectAnswerBlock
          id="kristofka-direct-answer"
          question="Mi az a Kristófka Strategist-Pro AI munkafolyamat?"
          answer="Ingatlanfejlesztők és befektetési csapatok számára épített többágenses AI workflow, amely PDF alaprajzokból és projektparaméterekből állít elő meggyőző befektetői pitch anyagot. 72% időmegtakarítást és 4.8x konverziót ért el valós projekten, egyedi árajánlat alapján testreszabva."
        />

        <section className="py-16 md:py-24 border-t border-slate-200 dark:border-slate-800/80">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-text-primary mb-8 text-center tracking-tight">
              Üzleti Eredmények
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="luminous-card rounded-3xl p-6">
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-text-primary mb-2">
                  4.8x befektetői konverzió
                </h3>
                <p className="text-sm text-[#334155] dark:text-slate-400">
                  AI-optimalizált pitch generálás és adatvezérelt befektetői
                  meggyőzés
                </p>
              </div>
              <div className="luminous-card rounded-3xl p-6">
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-text-primary mb-2">
                  72% pitch idő megtakarítás
                </h3>
                <p className="text-sm text-[#334155] dark:text-slate-400">
                  PDF alaprajz elemzés és automatikus pitch generálás
                </p>
              </div>
              <div className="luminous-card rounded-3xl p-6">
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-text-primary mb-2">
                  Mért ügyfél-eredmény (ROI)
                </h3>
                <p className="text-sm text-[#334155] dark:text-slate-400">
                  Strategist-Pro szintű AI workflow befektetői pitch
                  optimalizálás
                </p>
              </div>
              <div className="luminous-card rounded-3xl p-6">
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-text-primary mb-2">
                  Kontextus paraméterek
                </h3>
                <p className="text-sm text-[#334155] dark:text-slate-400">
                  Személyre szabott befektetői pitch testreszabás
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
              Az ajánlat a projektméretedhez és az integrációs igényekhez
              igazodik — nincs dobozos csomag, nincs rejtett költség.
            </p>
            <div className="luminous-card rounded-3xl p-8 max-w-md mx-auto">
              <p className="text-[#334155] dark:text-slate-400 mb-6">
                Projektszintű felmérés és előre egyeztetett, fix határidő — a
                munkakezdés előtt.
              </p>
              <Link
                href="/kapcsolat"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-bold rounded-full uppercase tracking-wider text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-bg-base"
              >
                Egyedi árajánlat kérése
              </Link>
              <p className="text-xs text-[#475569] dark:text-slate-400 mt-4">
                Válasz 24 órán belül — közvetlenül tőlem
              </p>
            </div>
          </div>
        </section>

        <ProductPortalCta productName="Kristófka Munkafolyamat" />
      </div>
    </>
  );
}
