import Link from "next/link";
import ProductPortalCta from "@/components/molecules/ProductPortalCta";
import HeroBackdrop from "@/components/molecules/HeroBackdrop";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import ProductFaqSection from "@/components/molecules/ProductFaqSection";

const faqs = [
  {
    question: "Milyen típusú oldalaknál alkalmazható a CRO Booster Kit?",
    answer:
      "WooCommerce webáruházaknál, Next.js landing oldalaknál és B2B szolgáltatási értékesítési tölcséreknél egyaránt hatékony.",
  },
  {
    question: "Mikor láthatók az első mérhető konverziós eredmények?",
    answer:
      "Az első A/B tesztek és CTA/checkout finomítások után jellemzően 14–30 napon belül mérhető az elmozdulás a GA4 konverziókban — egyedi árajánlat alapján.",
  },
] as const;

export default function CROBoosterKitPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      <section className="relative py-24 md:py-32 overflow-hidden">
        <HeroBackdrop src="/assets/banners/hero-termekek.webp" />
        <div className="absolute inset-0 bg-linear-to-b from-[#0369A1]/5 dark:from-[#00B5F1]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl text-[#0F172A] dark:text-text-primary tracking-tight">
              CRO Booster Kit
            </h1>
            <p className="text-lg text-[#334155] dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Duplázd meg a konverziós rátád 30 nap alatt. A/B tesztelés, heatmap elemzés és user journey optimalizáció kész eszközökkel. 2.8x hirdetési ROI, 45% bounce rate csökkenés.
            </p>
          </div>
        </div>
      </section>

      <DirectAnswerBlock
        id="cro-booster-kit-direct-answer"
        question="Hogyan növeli a weboldal konverzióját a CRO Booster Kit?"
        answer="A/B tesztelési keretrendszer, hőtérképes (heatmap) viselkedéselemzés és ügyfélút-optimalizáció webshopok és B2B landing oldalak számára. Segít csökkenteni a visszafordulási arányt és növelni a meglévő hirdetési forgalomból származó megkeresések számát — egyedi árajánlat alapján."
      />

      <section className="py-16 md:py-24 border-t border-slate-200 dark:border-slate-800/80 bg-[#F1F5F9] dark:bg-transparent">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl text-[#0F172A] dark:text-text-primary mb-8 text-center tracking-tight">
            Üzleti Eredmények
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="luminous-card rounded-3xl p-6">
              <h3 className="text-xl text-[#0F172A] dark:text-white mb-2">
                2.8x hirdetési ROI
              </h3>
              <p className="text-sm text-[#334155] dark:text-slate-300">
                A/B tesztelés sablonokkal optimalizált hirdetési kampányok
              </p>
            </div>
            <div className="luminous-card rounded-3xl p-6">
              <h3 className="text-xl text-[#0F172A] dark:text-white mb-2">
                45% bounce rate csökkenés
              </h3>
              <p className="text-sm text-[#334155] dark:text-slate-300">
                Heatmap elemzés alapú felhasználói élmény optimalizálás
              </p>
            </div>
            <div className="luminous-card rounded-3xl p-6">
              <h3 className="text-xl text-[#0F172A] dark:text-white mb-2">
                30 nap alatt dupla konverzió
              </h3>
              <p className="text-sm text-[#334155] dark:text-slate-300">
                User journey optimalizáció és konverzió funnel tervezés
              </p>
            </div>
            <div className="luminous-card rounded-3xl p-6">
              <h3 className="text-xl text-[#0F172A] dark:text-white mb-2">
                Kész A/B teszt sablonok
              </h3>
              <p className="text-sm text-[#334155] dark:text-slate-300">
                Azonnal használható konverzió optimalizáló eszközök
              </p>
            </div>
          </div>
        </div>
      </section>

      <ProductFaqSection id="cro-booster-kit-faq" faqs={faqs} />

      <section className="py-16 md:py-24 border-t border-slate-200 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl text-[#0F172A] dark:text-text-primary mb-4 tracking-tight">
            Egyedi árajánlat
          </h2>
          <p className="text-[#334155] dark:text-slate-300 mb-8">
            Az ajánlat a projektméretedhez és az integrációs igényekhez igazodik — nincs dobozos csomag, nincs rejtett költség.
          </p>
          <div className="luminous-card rounded-3xl p-8 max-w-md mx-auto">
            <p className="text-[#334155] dark:text-slate-300 mb-6">
              Projektszintű felmérés és előre egyeztetett, fix határidő — a munkakezdés előtt.
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

      <ProductPortalCta productName="CRO Booster Kit" />
    </div>
  );
}
