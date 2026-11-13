"use client";

import Link from "next/link";
import ProductPortalCta from "@/components/molecules/ProductPortalCta";

export default function KristofkaMunkafolyamatPage() {
  return (
    <>
        <div className="min-h-screen bg-[#020617]">
          <section className="relative py-24 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-transparent" />
            <div className="max-w-6xl mx-auto px-6 relative z-10">
              <div className="text-center space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight">
                  KristĂłfka Munkafolyamat
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  IngatlanbefektetĹ‘i pitch generĂˇlĂˇs PDF alaprajzokbĂłl Ă©s
                  kontextus paramĂ©terekbĹ‘l. Strategist-Pro szintĹ± AI workflow.
                  4.8x befektetĹ‘i konverziĂł, 72% pitch idĹ‘ megtakarĂ­tĂˇs, 500M+
                  Ft befektetĂ©s generĂˇciĂł.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 border-t border-slate-800/80">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-text-primary mb-8 text-center tracking-tight">
                Ăśzleti EredmĂ©nyek
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_48px_rgba(0, 181, 241,0.18)] transition-all duration-300">
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    4.8x befektetĹ‘i konverziĂł
                  </h3>
                  <p className="text-sm text-slate-400">
                    AI-optimalizĂˇlt pitch generĂˇlĂˇs alapvetĹ‘ befektetĹ‘i
                    meggyĹ‘zĂ©s
                  </p>
                </div>
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_48px_rgba(0, 181, 241,0.18)] transition-all duration-300">
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    72% pitch idĹ‘ megtakarĂ­tĂˇs
                  </h3>
                  <p className="text-sm text-slate-400">
                    PDF alaprajz elemzĂ©s Ă©s automatikus pitch generĂˇlĂˇs
                  </p>
                </div>
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_48px_rgba(0, 181, 241,0.18)] transition-all duration-300">
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    500M+ Ft befektetĂ©s generĂˇciĂł
                  </h3>
                  <p className="text-sm text-slate-400">
                    Strategist-Pro szintĹ± AI workflow befektetĹ‘i pitch
                    optimalizĂˇlĂˇs
                  </p>
                </div>
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_48px_rgba(0, 181, 241,0.18)] transition-all duration-300">
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    Kontextus paramĂ©terek
                  </h3>
                  <p className="text-sm text-slate-400">
                    SzemĂ©lyre szabott befektetĹ‘i pitch testreszabĂˇs
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24 border-t border-slate-800/80">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-text-primary mb-4 tracking-tight">
                Egyedi ĂˇrajĂˇnlat
              </h2>
              <p className="text-slate-400 mb-8">
                Az ĂˇrajĂˇnlat a projektmĂ©retedhez Ă©s az integrĂˇciĂłs igĂ©nyekhez
                igazodik â€” nincs dobozos csomag, nincs rejtett kĂ¶ltsĂ©g.
              </p>
              <div className="bg-[#0f172a] border border-slate-700 rounded-3xl p-8 shadow-[0_16px_48px_rgba(0, 181, 241,0.12)] max-w-md mx-auto">
                <p className="text-slate-400 mb-6">
                  ProjektszintĹ± felmĂ©rĂ©s Ă©s elĹ‘re egyeztetett, fix hatĂˇridĹ‘ â€” a
                  munkakezdĂ©s elĹ‘tt.
                </p>
                <Link
                  href="/kapcsolat"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] hover:from-[#5B21B6] hover:to-[#5B21B6] text-slate-950 font-bold rounded-full uppercase tracking-wider text-sm transition-all duration-300 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-bg-base"
                >
                  Egyedi ĂˇrajĂˇnlat kĂ©rĂ©se
                </Link>
                <p className="text-xs text-slate-400 mt-4">
                  VĂˇlasz 24 ĂłrĂˇn belĂĽl â€” kĂ¶zvetlenĂĽl tĹ‘lem
                </p>
              </div>
            </div>
          </section>

          <ProductPortalCta productName="KristĂłfka Munkafolyamat" />
        </div>
    </>
  );
}
