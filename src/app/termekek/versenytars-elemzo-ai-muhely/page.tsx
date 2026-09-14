import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Versenytárs Elemző AI Műhely - WebDude.hu",
  description:
    "Versenytárs Elemző AI Műhely: Versenytárs vizuális elemzés AI eszközökkel. Design audit, trend elemzés és versenytárs stratégia kialakítás.",
  openGraph: {
    title: "Versenytárs Elemző AI Műhely - WebDude.hu",
    description:
      "Versenytárs Elemző AI Műhely: Versenytárs vizuális elemzés AI eszközökkel.",
    url: "https://webdude.hu/termekek/versenytars-elemzo-ai-muhely",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
};

export default function VersenytarsElemzoAIMuhelyPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-gold-primary/5 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Versenytárs Elemző AI Műhely
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Versenytárs vizuális elemzés AI eszközökkel. Design audit, trend
              elemzés és versenytárs stratégia kialakítás.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-gold-primary/10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Funkciók
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-bg-elevated/50 border border-gold-primary/20 rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-2">
                Versenytárs vizuális elemzés
              </h3>
              <p className="text-sm text-slate-400">
                Automatikus versenytárs elemzés
              </p>
            </div>
            <div className="bg-bg-elevated/50 border border-gold-primary/20 rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-2">
                Design audit
              </h3>
              <p className="text-sm text-slate-400">Versenytárs design audit</p>
            </div>
            <div className="bg-bg-elevated/50 border border-gold-primary/20 rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-2">
                Trend elemzés
              </h3>
              <p className="text-sm text-slate-400">AI trend elemzés</p>
            </div>
            <div className="bg-bg-elevated/50 border border-gold-primary/20 rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-2">
                Versenytárs stratégia
              </h3>
              <p className="text-sm text-slate-400">Stratégia kialakítás</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-gold-primary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Kérj egy ingyenes Versenytárs Elemző AI Műhely Auditot
          </h2>
          <p className="text-slate-400 mb-8">
            24 órán belül megkapod a weboldalad versenytárs elemzési tervét.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gold-primary text-bg-base font-bold rounded-xl hover:bg-gold-primary/90 transition-all">
            Ingyenes Weboldal Audit
          </button>
        </div>
      </section>
    </div>
  );
}
