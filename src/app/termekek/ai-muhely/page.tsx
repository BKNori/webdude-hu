import Link from "next/link";
import { Layers, Lock, ArrowRight, Sparkles } from "lucide-react";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import HeroBackdrop from "@/components/molecules/HeroBackdrop";
import ProductFaqSection from "@/components/molecules/ProductFaqSection";
import ProductPortalCta from "@/components/molecules/ProductPortalCta";
import { CATEGORY_LABELS, CATEGORY_ORDER, generatorTools } from "@/data/ai-workshop-collection-config";

/**
 * /termekek/ai-muhely — 100% PUBLIKUS, statikusan prerenderelt Server Component
 * SEO/AEO/GEO katalógus landing. Egyetlen generátor sem fut vendégként:
 * az interaktív eszközök a védett `/portal/ai-muhely/*` útvonalakon érhetők el
 * bejelentkezett és `allowedTools`-jogosultsággal rendelkező ügyfeleimnek.
 */

const faqs = [
  {
    question: "Mi az a WebDude AI Műhely Katalógus?",
    answer:
      "Öt szakmai pillérre (online grafika, nyomdai prepress, ruha és merch, szoftver-architektúra, valamint elemzés és SEO) épülő prémium AI tervezőeszköz-gyűjtemény, amelyet 26 év tervezőgrafikai és 16 év webfejlesztői tapasztalattal építettem fel.",
  },
  {
    question: "Hogyan férhetek hozzá az AI Műhely generátoraihoz?",
    answer:
      "Minden generátor zárt prémium modul: bejelentkezés után kizárólag a fiókodhoz engedélyezett eszközöket indíthatod el az ügyfélportálon. Hozzáférést a kapcsolat oldalon igényelhetsz.",
  },
  {
    question: "Mennyibe kerül az AI Műhely modulok elérése?",
    answer:
      "Nincs sablonos előfizetési csomag: a modulokat egyedi árajánlat keretében, a projektedhez szükséges munkafolyamatok szerint kapcsolom be a portálfiókodhoz.",
  },
] as const;

export default function AiWorkshopPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      <section className="relative py-24 md:py-32 overflow-hidden">
        <HeroBackdrop src="/assets/banners/hero-termekek.webp" alt="WebDude AI Műhely Katalógus" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/20">
              <Sparkles className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
              <span className="text-xs font-bold text-[#0369A1] dark:text-[#00B5F1] uppercase tracking-[0.2em]">
                WebDude AI Studio
              </span>
            </span>
            <h1 className="text-5xl md:text-7xl text-[#0F172A] dark:text-white tracking-tight">
              AI Műhely{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
                Katalógus
              </span>
            </h1>
            <p className="text-lg text-[#334155] dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Teljes körű AI tervezőműhely arculat-, kampány-, nyomdai prepress-, architektúra- és SEO/AEO
              munkafolyamatokhoz. A modulok az ügyfélportálon, egyedi jogosultsággal érhetők el.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/kapcsolat"
                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-bold rounded-full uppercase tracking-wider text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Egyedi árajánlat kérése
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/portal/ai-muhely"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-slate-300 dark:border-slate-700 hover:border-[#0369A1] dark:hover:border-[#00B5F1] text-[#0F172A] dark:text-white font-bold uppercase tracking-wider text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus-visible:ring-sky-500"
              >
                <Layers className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
                Belépés a Stúdióba
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DirectAnswerBlock
        id="ai-muhely-direct-answer"
        question="Milyen eszközöket tartalmaz a WebDude AI Műhely?"
        answer="A WebDude AI Műhely öt szakmai pillérbe rendezett, produkciós szintű AI generátorok és Pro Prompt Stúdiók gyűjteménye: online grafika, nyomdai prepress, ruha- és textilgyártás, szoftver-architektúra, valamint SEO/AEO elemzés. 26 év tervezőgrafikai és 16 év webfejlesztői tapasztalatra épül, egyedi árajánlat alapján igényelhető hozzáféréssel."
      />

      {CATEGORY_ORDER.map((categoryKey) => {
        const items = generatorTools.filter((t) => t.category === categoryKey);
        if (items.length === 0) return null;
        return (
          <section
            key={categoryKey}
            aria-labelledby={`cat-${categoryKey}`}
            className="py-16 border-t border-slate-200 dark:border-slate-800/80"
          >
            <div className="max-w-6xl mx-auto px-6">
              <h2 id={`cat-${categoryKey}`} className="text-3xl md:text-4xl mb-8 tracking-tight">
                {CATEGORY_LABELS[categoryKey]}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((tool) => {
                  const ToolIcon = tool.icon;
                  return (
                    <article key={tool.id} className="luminous-card rounded-3xl p-6 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <div aria-hidden="true" className="w-12 h-12 rounded-2xl bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/20 flex items-center justify-center">
                            <ToolIcon className="w-6 h-6 text-[#0369A1] dark:text-[#00B5F1]" />
                          </div>
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#475569] dark:text-slate-400 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800">
                            <Lock className="w-3 h-3" aria-hidden="true" />
                            Jogosultsághoz kötött
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl text-[#0F172A] dark:text-white mb-2">{tool.name}</h3>
                          <p className="text-sm text-[#334155] dark:text-slate-300 leading-relaxed">{tool.description}</p>
                        </div>
                        <ul className="space-y-1.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                          {tool.features.map((f) => (
                            <li key={f} className="text-xs text-[#475569] dark:text-slate-400 flex items-start gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0369A1] dark:bg-[#00B5F1] shrink-0" aria-hidden="true" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-6 flex items-center gap-3">
                        <Link
                          href="/kapcsolat"
                          className="flex-1 text-center py-3 px-4 rounded-xl bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-bold text-xs uppercase tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                        >
                          Hozzáférés igénylése
                        </Link>
                        <Link
                          href={`/portal/ai-muhely/${tool.slug}`}
                          className="py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-[#0369A1] dark:hover:border-[#00B5F1] text-[#0F172A] dark:text-slate-200 font-bold text-xs uppercase tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                        >
                          Portál
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <ProductFaqSection id="ai-muhely-faq" faqs={faqs} />

      <ProductPortalCta productName="AI Műhely Katalógus" />
    </div>
  );
}
