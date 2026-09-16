"use client";

import ProductAccessGuard from "@/components/molecules/ProductAccessGuard";
import ProductPortalCta from "@/components/molecules/ProductPortalCta";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AI Workflow Starter Pack",
  description:
    "Spórolj heti 15 órát manuális munkával. Automatizáld email kampányokat, lead generálást és ügyfélszolgálatot kész AI workflow sablonokkal. 3.4x organikus elérés, 300 DPI nyomdakész outputok.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "HUF",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/ai-workflow-starter-pack",
    priceValidUntil: "2027-12-31",
    seller: {
      "@type": "Organization",
      name: "WebDude.hu",
    },
    description: "Egyedi árajánlat kérése",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "31",
  },
};

export default function AIWorkflowStarterPackPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />
      <ProductAccessGuard>
        <div className="min-h-screen bg-[#020617]">
          <section className="relative py-24 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-[#f59e0b]/5 via-transparent to-transparent" />
            <div className="max-w-6xl mx-auto px-6 relative z-10">
              <div className="text-center space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-[#e2e8f0] tracking-tight">
                  AI Workflow Starter Pack
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Spórolj heti 15 órát manuális munkával. Automatizáld email
                  kampányokat, lead generálást és ügyfélszolgálatot kész AI
                  workflow sablonokkal. 3.4x organikus elérés, 300 DPI
                  nyomdakész outputok.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 border-t border-slate-800/80">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-[#e2e8f0] mb-8 text-center tracking-tight">
                Üzleti Eredmények
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_48px_rgba(245,158,11,0.18)] transition-all duration-300">
                  <h3 className="text-lg font-bold text-[#e2e8f0] mb-2">
                    Heti 15 óra megtakarítás
                  </h3>
                  <p className="text-sm text-slate-400">
                    Automatizált workflow sablonokkal kiküszöbölöd a manuális
                    adminisztrációt
                  </p>
                </div>
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_48px_rgba(245,158,11,0.18)] transition-all duration-300">
                  <h3 className="text-lg font-bold text-[#e2e8f0] mb-2">
                    3.4x organikus elérés
                  </h3>
                  <p className="text-sm text-slate-400">
                    AI-optimalizált email kampányok és lead generálás
                  </p>
                </div>
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_48px_rgba(245,158,11,0.18)] transition-all duration-300">
                  <h3 className="text-lg font-bold text-[#e2e8f0] mb-2">
                    300 DPI nyomdakész outputok
                  </h3>
                  <p className="text-sm text-slate-400">
                    Professzionális grafikai elemek és marketing anyagok
                  </p>
                </div>
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_48px_rgba(245,158,11,0.18)] transition-all duration-300">
                  <h3 className="text-lg font-bold text-[#e2e8f0] mb-2">
                    1 év ingyenes frissítés
                  </h3>
                  <p className="text-sm text-slate-400">
                    Folyamatos fejlesztés és új workflow sablonok
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 border-t border-slate-800/80">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-[#e2e8f0] mb-4 tracking-tight">
                Árazás és Megrendelés
              </h2>
              <p className="text-slate-400 mb-8">
                Azonnali hozzáférés a teljes AI workflow sablon csomaghoz.
              </p>
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-8 shadow-[0_16px_48px_rgba(245,158,11,0.18)] max-w-md mx-auto">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#e2e8f0]">
                    99 000 Ft
                  </span>
                  <span className="text-slate-400"> / egyszeri díj</span>
                </div>
                <button className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold rounded-full uppercase tracking-wider text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95">
                  Megrendelés Stripe-al
                </button>
                <p className="text-xs text-slate-500 mt-4">
                  Biztonságos fizetés Stripe-on keresztül
                </p>
              </div>
            </div>
          </section>

          <ProductPortalCta productName="AI Workflow Starter Pack" />
        </div>
      </ProductAccessGuard>
    </>
  );
}
