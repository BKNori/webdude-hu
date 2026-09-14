"use client";

import ProductAccessGuard from "@/components/molecules/ProductAccessGuard";

export default function AIWorkflowStarterPackPage() {
  return (
    <ProductAccessGuard>
      <div className="min-h-screen bg-[#F8FAFC]">
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-transparent" />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-[#111827] tracking-tight">
                AI Workflow Starter Pack
              </h1>
              <p className="text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
                Spórolj heti 15 órát manuális munkával. Automatizáld email
                kampányokat, lead generálást és ügyfélszolgálatot kész AI
                workflow sablonokkal. 3.4x organikus elérés, 300 DPI nyomdakész
                outputok.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 border-t border-[#E7ECF2]">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#111827] mb-8 text-center tracking-tight">
              Üzleti Eredmények
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E7ECF2] rounded-3xl p-6 shadow-[0_4px_12px_rgba(15,23,42,.04)] hover:shadow-[0_8px_24px_rgba(15,23,42,.06)] transition-all duration-300">
                <h3 className="text-lg font-bold text-[#111827] mb-2">
                  Heti 15 óra megtakarítás
                </h3>
                <p className="text-sm text-[#4B5563]">
                  Automatizált workflow sablonokkal kiküszöbölöd a manuális
                  adminisztrációt
                </p>
              </div>
              <div className="bg-white border border-[#E7ECF2] rounded-3xl p-6 shadow-[0_4px_12px_rgba(15,23,42,.04)] hover:shadow-[0_8px_24px_rgba(15,23,42,.06)] transition-all duration-300">
                <h3 className="text-lg font-bold text-[#111827] mb-2">
                  3.4x organikus elérés
                </h3>
                <p className="text-sm text-[#4B5563]">
                  AI-optimalizált email kampányok és lead generálás
                </p>
              </div>
              <div className="bg-white border border-[#E7ECF2] rounded-3xl p-6 shadow-[0_4px_12px_rgba(15,23,42,.04)] hover:shadow-[0_8px_24px_rgba(15,23,42,.06)] transition-all duration-300">
                <h3 className="text-lg font-bold text-[#111827] mb-2">
                  300 DPI nyomdakész outputok
                </h3>
                <p className="text-sm text-[#4B5563]">
                  Professzionális grafikai elemek és marketing anyagok
                </p>
              </div>
              <div className="bg-white border border-[#E7ECF2] rounded-3xl p-6 shadow-[0_4px_12px_rgba(15,23,42,.04)] hover:shadow-[0_8px_24px_rgba(15,23,42,.06)] transition-all duration-300">
                <h3 className="text-lg font-bold text-[#111827] mb-2">
                  1 év ingyenes frissítés
                </h3>
                <p className="text-sm text-[#4B5563]">
                  Folyamatos fejlesztés és új workflow sablonok
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 border-t border-[#E7ECF2]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#111827] mb-4 tracking-tight">
              Árazás és Megrendelés
            </h2>
            <p className="text-[#4B5563] mb-8">
              Azonnali hozzáférés a teljes AI workflow sablon csomaghoz.
            </p>
            <div className="bg-white border border-[#E7ECF2] rounded-3xl p-8 shadow-[0_8px_24px_rgba(15,23,42,.06)] max-w-md mx-auto">
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#111827]">
                  99 000 Ft
                </span>
                <span className="text-[#4B5563]"> / egyszeri díj</span>
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00B5F1] hover:bg-[#0095C7] text-white font-bold rounded-full uppercase tracking-wider text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95">
                Megrendelés Stripe-al
              </button>
              <p className="text-xs text-[#94A3B8] mt-4">
                Biztonságos fizetés Stripe-on keresztül
              </p>
            </div>
          </div>
        </section>
      </div>
    </ProductAccessGuard>
  );
}
