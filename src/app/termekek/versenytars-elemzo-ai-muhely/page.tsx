import ProductPortalCta from "@/components/molecules/ProductPortalCta";

export default function VersenytarsElemzoAIMuhelyPage() {
  return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-bg-base text-[#0F172A] dark:text-[#F8FAFC]">
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-[#0369A1]/5 dark:from-brand-primary/5 via-transparent to-transparent" />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] dark:text-white">
                Versenytárs Elemző AI Műhely
              </h1>
              <p className="text-lg text-[#334155] dark:text-slate-400 max-w-2xl mx-auto">
                Versenytárs vizuális elemzés AI eszközökkel. Design audit, trend
                elemzés és versenytárs stratégia kialakítás.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-slate-200 dark:border-brand-primary/10 bg-[#F1F5F9] dark:bg-transparent">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-8 text-center">
              Funkciók
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="luminous-card rounded-lg p-4">
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">
                  Versenytárs vizuális elemzés
                </h3>
                <p className="text-sm text-[#334155] dark:text-slate-400">
                  Automatikus versenytárs elemzés
                </p>
              </div>
              <div className="luminous-card rounded-lg p-4">
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">
                  Design audit
                </h3>
                <p className="text-sm text-[#334155] dark:text-slate-400">
                  Versenytárs design audit
                </p>
              </div>
              <div className="luminous-card rounded-lg p-4">
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">
                  Trend elemzés
                </h3>
                <p className="text-sm text-[#334155] dark:text-slate-400">AI trend elemzés</p>
              </div>
              <div className="luminous-card rounded-lg p-4">
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">
                  Versenytárs stratégia
                </h3>
                <p className="text-sm text-[#334155] dark:text-slate-400">Stratégia kialakítás</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-slate-200 dark:border-brand-primary/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-4">
              Kérj egy ingyenes Versenytárs Elemző AI Műhely Auditot
            </h2>
            <p className="text-[#334155] dark:text-slate-400 mb-8">
              24 órán belül megkapod a weboldalad versenytárs elemzési tervét.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-bold rounded-xl transition-all">
              Ingyenes Weboldal Audit
            </button>
          </div>
        </section>

        <ProductPortalCta productName="Versenytárs-elemző AI Műhely" />
      </div>
  );
}
