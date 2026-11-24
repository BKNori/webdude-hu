import Link from "next/link";
import { BarChart3, Eye, TrendingUp, Target, ArrowRight, Sparkles } from "lucide-react";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import ProductFaqSection from "@/components/molecules/ProductFaqSection";
import ProductPortalCta from "@/components/molecules/ProductPortalCta";
import ToolAccessGate from "@/components/molecules/ToolAccessGate";
import CompetitorAnalyzer from "@/components/organisms/CompetitorAnalyzer";

/**
 * /termekek/versenytars-elemzo-ai-muhely — PUBLIKUS, statikusan prerenderelt SEO/AEO/GEO landing.
 * A versenytárs-elemző generátor kizárólag `ToolAccessGate` mögött
 * (allowedTools: "versenytars_elemzo_ai_muhely" vagy Szuperadmin) mountolódik.
 */

const features = [
  { icon: Eye, title: "Vizuális & UX Audit", description: "Értékajánlat, hierarchia és bizalmi elemek összehasonlítása" },
  { icon: BarChart3, title: "CRO Benchmarking", description: "CTA-minőség és konverziós útvonal pontozása versenytársak ellen" },
  { icon: TrendingUp, title: "Piaci Rés-elemzés", description: "Kihasználatlan pozicionálási és tartalmi lehetőségek feltárása" },
  { icon: Target, title: "Akcióképes Stratégia", description: "Konkrét javítási lépések a saját landing oldalad erősítéséhez" },
] as const;

const faqs = [
  {
    question: "Mit elemez a Versenytárs Elemző AI Műhely?",
    answer:
      "A céloldaladat veti össze akár három piaci versenytárs URL-jével az értékajánlat tisztasága, a CTA-gombok ereje, a vizuális felépítés és a felhasználói élmény alapján, konkrét fejlesztési javaslatokkal.",
  },
  {
    question: "Ki használhatja a Versenytárs Elemző AI Műhely generátort?",
    answer:
      "Az élő URL-elemző generátor zárt prémium AI modul: kizárólag bejelentkezett, jóváhagyott ügyfeleim érhetik el, akiknek a fiókjához engedélyeztem a modult (és szerveroldalon is védett). Hozzáférést a kapcsolat oldalon igényelhetsz.",
  },
  {
    question: "Mennyibe kerül a Versenytárs Elemző AI Műhely?",
    answer:
      "A hozzáférés és a személyre szabott UX/CRO versenytárs-audit egyedi árajánlat alapján érhető el, az iparágad és az elemzendő piac mérete szerint.",
  },
] as const;

export default function VersenytarsElemzoAIMuhelyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#0369A1]/5 dark:from-[#00B5F1]/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/20">
              <Sparkles className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
              <span className="text-xs font-bold text-[#0369A1] dark:text-[#00B5F1] uppercase tracking-[0.2em]">
                AI Műhely
              </span>
            </span>
            <h1 className="text-5xl md:text-7xl text-[#0F172A] dark:text-white tracking-tight">
              Versenytárs Elemző{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
                AI Műhely
              </span>
            </h1>
            <p className="text-lg text-[#334155] dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Versenytárs vizuális, UX és CRO benchmarking AI támogatással. Design audit, értékajánlat-összevetés
              és adatvezérelt pozicionálási stratégia kialakítása.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/kapcsolat"
                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-bold rounded-full uppercase tracking-wider text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Egyedi árajánlat kérése
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DirectAnswerBlock
        id="versenytars-elemzo-direct-answer"
        question="Hogyan segít a piaci előnyszerzésben a Versenytárs Elemző AI Műhely?"
        answer="A Versenytárs Elemző AI Műhely a saját weboldaladat hasonlítja össze a fő piaci szereplőkkel UX, értékajánlat és CTA-hatékonyság mentén. 26 év tervezőgrafikai és 16 év webfejlesztői tapasztalattal segít megtalálni azokat a konverziós pontokat, ahol azonnal megelőzheted a versenytársaidat — egyedi árajánlat alapján."
      />

      <section aria-labelledby="competitor-generator-heading" className="py-16 border-t border-slate-200 dark:border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="competitor-generator-heading" className="text-3xl md:text-4xl text-center mb-8 tracking-tight">
            AI Versenytárs-elemző Modul
          </h2>
          <ToolAccessGate toolId="versenytars_elemzo_ai_muhely" toolName="Versenytárs Elemző AI Műhely">
            <CompetitorAnalyzer />
          </ToolAccessGate>
        </div>
      </section>

      <section className="py-16 border-t border-slate-200 dark:border-slate-800/80 bg-[#F1F5F9] dark:bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl mb-8 text-center tracking-tight">Funkciók és Előnyök</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={feature.title} className="luminous-card rounded-3xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#00B5F1]/10 to-[#5B21B6]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/20 flex items-center justify-center mb-4">
                    <FeatureIcon className="w-6 h-6 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl text-[#0F172A] dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#334155] dark:text-slate-300">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ProductFaqSection id="versenytars-elemzo-faq" faqs={faqs} />

      <section className="py-16 border-t border-slate-200 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl mb-4 tracking-tight">Kérj Versenytárs Elemző Stratégiát</h2>
          <p className="text-[#334155] dark:text-slate-300 mb-8">
            Igényelj hozzáférést a Versenytárs Elemző AI Műhelyhez, vagy kérj egyedi árajánlatot teljes UX/CRO auditra.
          </p>
          <Link
            href="/kapcsolat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-bold rounded-full uppercase tracking-wider text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Egyedi árajánlat kérése
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <ProductPortalCta productName="Versenytárs Elemző AI Műhely" />
    </div>
  );
}
