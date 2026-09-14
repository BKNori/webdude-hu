"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import KristofkaWorkflow from "@/components/organisms/KristofkaWorkflow";
import {
  ArrowRight,
  Sparkles,
  Target,
  Shield,
  Zap,
  BarChart3,
} from "lucide-react";

export default function KristofkaPage() {
  const router = useRouter();

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/portal");
        return;
      }
    });

    return unsubscribe;
  }, [router]);

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center space-y-8">
      {/* Hero Section */}
      <div className="w-full max-w-7xl px-6 py-12">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-mono">
            Kristófka Workflow: A Te Digitális Üzleti Stratégád
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A Kristófka Workflow nem csupán egy eszköz, hanem egy dedikált
            AI-stratéga, amely a WebDude 26 éves szakmai tapasztalatát ötvözi a
            legmodernebb mesterséges intelligenciával. Segít a komplex üzleti
            problémák lebontásában, a döntéshozatali folyamatok felgyorsításában
            és a stratégiai célok elérésében.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() =>
                document
                  .getElementById("kristofka-workflow")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-[#00B5F1] hover:bg-[#0095C7] text-bg-base font-bold rounded-xl transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Indítsd el a Kristófka Workflow-t
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => router.push("/portal/ai-muhely")}
              className="px-8 py-4 border border-[#00B5F1]/50 text-[#00B5F1] hover:bg-[#00B5F1]/10 font-bold rounded-xl transition-all duration-300 flex items-center gap-2"
            >
              Ismerd meg a teljes AI-műhelyt
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mit nyújt a Strategist Pro? - Bento Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white font-mono mb-6 text-center">
            Mit nyújt a Strategist Pro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-bg-base/50 border border-bg-elevated/50 rounded-xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 flex items-center justify-center text-[#00B5F1]">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-mono">
                Adatvezérelt Elemzés
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Komplett üzleti folyamatok auditálása és mélyreható elemzése.
              </p>
            </div>
            <div className="bg-bg-base/50 border border-bg-elevated/50 rounded-xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 flex items-center justify-center text-[#00B5F1]">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-mono">
                Automatizált Stratégia
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                AI-alapú roadmap készítés, amely a te céljaidhoz igazodik.
              </p>
            </div>
            <div className="bg-bg-base/50 border border-bg-elevated/50 rounded-xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 flex items-center justify-center text-[#00B5F1]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-mono">
                Döntéstámogatás
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Valós idejű válaszok stratégiai kérdésekre a 16+ éves WordPress
                és webfejlesztői tapasztalatunkkal hitelesítve.
              </p>
            </div>
          </div>
        </div>

        {/* Miért a Kristófka Workflow? - E-E-A-T */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white font-mono mb-6 text-center">
            Miért a Kristófka Workflow?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-bg-base/50 border border-bg-elevated/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 flex items-center justify-center text-[#00B5F1]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-mono">
                  Experience
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                16 év webfejlesztői és 26 év tervezői háttérbe integrált AI.
              </p>
            </div>
            <div className="bg-bg-base/50 border border-bg-elevated/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 flex items-center justify-center text-[#00B5F1]">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-mono">
                  Expertise
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Nem általános chatbot, hanem kifejezetten üzleti, B2B
                stratégiákra hangolt modell.
              </p>
            </div>
            <div className="bg-bg-base/50 border border-bg-elevated/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 flex items-center justify-center text-[#00B5F1]">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-mono">
                  Authority
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                A WebDude saját, dedikált eszköze, melyet a komplex
                projektjeinknél is alkalmazunk.
              </p>
            </div>
            <div className="bg-bg-base/50 border border-bg-elevated/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 flex items-center justify-center text-[#00B5F1]">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-mono">
                  Trust
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Nincs &ldquo;fekete doboz&rdquo;. A workflow átlátható, mérhető
                KPI-okkal és konkrét eredményekkel támogatja a növekedést.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white font-mono mb-6 text-center">
            Gyakori Kérdések
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="bg-bg-base/50 border border-bg-elevated/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white font-mono mb-2">
                Milyen típusú cégeknek ajánlott a Kristófka Workflow?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Közép- és nagyvállalatoknak, akik automatizálni szeretnék
                döntéshozatali folyamataikat.
              </p>
            </div>
            <div className="bg-bg-base/50 border border-bg-elevated/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white font-mono mb-2">
                Hogyan integrálható a meglévő folyamatokba?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                A workflow közvetlen támogatást nyújt a WebDude portálon
                keresztül, API-alapú vagy manuális konzultációs formában.
              </p>
            </div>
            <div className="bg-bg-base/50 border border-bg-elevated/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white font-mono mb-2">
                Biztonságos az üzleti adatok kezelése?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Igen, a WebDude szigorú adatvédelmi protokolljait követve,
                titkosított csatornákon keresztül.
              </p>
            </div>
          </div>
        </div>

        {/* Kristófka Workflow Component */}
        <div id="kristofka-workflow">
          <KristofkaWorkflow />
        </div>
      </div>
    </div>
  );
}
