import Link from "next/link";
import { ArrowRight, Gauge, Sparkles } from "lucide-react";

/**
 * Alacsony küszöbű lead-mágnes CTA kártya a szakcikkek végére (Server Component).
 * A cikkek olvasóit az ingyenes 10 pontos SEO & AI-készségi gyorsellenőrzőre tereli.
 */
export default function SeoQuickCheckBanner() {
  return (
    <section
      aria-label="Ingyenes SEO és AI-készségi gyorsellenőrző"
      className="mt-12"
    >
      <div className="luminous-card p-7 sm:p-9 border-[#0369A1]/30 dark:border-[#00B5F1]/30 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#00B5F1]/12 blur-3xl"
        />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2.5 max-w-xl">
            <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Ingyenes 10 pontos diagnosztika
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading text-[#0F172A] dark:text-white leading-tight">
              Kíváncsi vagy, mit látnak a weboldaladból a Google és az AI keresők?
            </h2>
            <p className="text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
              Teszteld le másodpercek alatt a saját domained HTTPS/TTFB sebességét,
              Schema.org AEO entitásait, a robots.txt AI-bot szabályait és az
              llms.txt meglétét.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/ingyenes-seo-aeo-elemzes"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold uppercase tracking-wider text-xs sm:text-sm text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] shadow-[0_8px_24px_rgba(7,89,133,0.35)] hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Gauge className="w-4 h-4" aria-hidden="true" />
              Ingyenes SEO &amp; AI Ellenőrzés
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
