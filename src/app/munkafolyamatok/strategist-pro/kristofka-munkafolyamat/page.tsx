import { Metadata } from "next";
import Link from "next/link";
import { Building2, Upload, Target, Sparkles, ArrowRight } from "lucide-react";
import Button from "@/components/atoms/Button";

export const metadata: Metadata = {
  title:
    "Kristófka Munkafolyamat | Professzionális Ingatlanfejlesztési Pitch & Üzleti Terv",
  description:
    "Alakítsd át nyers ipari alaprajzaidat profi befektetői prezentációvá a Kristófka munkafolyamattal. Automatizált, célzott, és megtérülésre fókuszáló ingatlanfejlesztési narratívák.",
  openGraph: {
    title:
      "Kristófka Munkafolyamat | Professzionális Ingatlanfejlesztési Pitch & Üzleti Terv",
    description:
      "Alakítsd át nyers ipari alaprajzaidat profi befektetői prezentációvá a Kristófka munkafolyamattal. Automatizált, célzott, és megtérülésre fókuszáló ingatlanfejlesztési narratívák.",
    type: "website",
  },
};

export default function KristofkaWorkflowPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <header className="border-b border-bg-elevated/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="text-[#00B5F1] font-mono font-bold text-sm"
          >
            WebDude.hu
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B5F1]/10 border border-[#00B5F1]/20 rounded-full text-[#00B5F1] text-xs font-mono font-bold uppercase tracking-widest">
            <Building2 className="w-4 h-4" />
            Strategist-Pro
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Kristófka Munkafolyamat: Nyers Ipari Ingatlanokból Prémium
            Befektetési Portfólió
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A fejlett AI-alapú eszköz, amellyel ipari épületeid átalakítási
            potenciálját befektetői szintű narratívává formálod. Feltöltés,
            kiválasztás, prezentáció.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/portal">
              <Button className="w-full sm:w-auto">
                <Sparkles className="w-5 h-5" />
                Kristófka Munkafolyamat Indítása
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-6 bg-bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">
            Miért vesznek el a legjobb ajánlatok is a papírok között?
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Egy elavult ipari csarnok alaprajza vagy egy homályos fotó önmagában
            csak egy raktár. A befektetők nem épületet, hanem víziót és hozamot
            vásárolnak. Ha nem tudod a &ldquo;miért&rdquo; kérdést
            professzionálisan megválaszolni, a tőke máshova áramlik.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Így válik a PDF-ed befektetői memorandummá
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-bg-surface/40 border border-bg-elevated/50 rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 flex items-center justify-center text-[#00B5F1]">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Feltöltés</h3>
              <p className="text-slate-400 text-sm">
                Húzd be a PDF alaprajzokat és a helyszíni fotókat.
              </p>
            </div>
            <div className="bg-bg-surface/40 border border-bg-elevated/50 rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 flex items-center justify-center text-[#00B5F1]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Kontextus választás
              </h3>
              <p className="text-slate-400 text-sm">
                Válaszd ki a célközönséget (pl. kockázati tőke, magánbefektető)
                és az élethelyzetet (pl. loft-átalakítás, fenntartható közösségi
                központ).
              </p>
            </div>
            <div className="bg-bg-surface/40 border border-bg-elevated/50 rounded-2xl p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 flex items-center justify-center text-[#00B5F1]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Generálás</h3>
              <p className="text-slate-400 text-sm">
                A rendszer 30 másodperc alatt elkészíti a professzionális
                befektetői pitch-et, kiemelve az ingatlan egyedi értékajánlatát
                (UVP).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-bg-surface/30">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold text-white text-center">
            Miért a Kristófka?
          </h2>
          <div className="space-y-8">
            <div className="border-l-4 border-[#00B5F1] pl-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Iparági Terminológia
              </h3>
              <p className="text-slate-400">
                Az anyag automatikusan tartalmazza azokat a kifejezéseket,
                amiket a nagyok használnak: IRR (belső megtérülési ráta),
                hozamprémium, konverziós költségek, exit stratégia.
              </p>
            </div>
            <div className="border-l-4 border-[#00B5F1] pl-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Adaptív Narratíva
              </h3>
              <p className="text-slate-400">
                Ugyanaz az épület más nyelvezetet igényel egy banki
                hitelbírálónál, mint egy dizájn-fókuszú magánbefektetőnél. A
                munkafolyamat ezt a váltást egyetlen kattintással kezeli.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">
            Készen állsz a következő nagy dobásra?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Ne hagyd, hogy az ingatlanjaidban rejlő érték a fiókban maradjon.
            Próbáld ki a Kristófka munkafolyamatot, és nyűgözd le a
            befektetőidet egy professzionális, adatalapú prezentációval.
          </p>
          <Link href="/portal">
            <Button className="w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              Kristófka Munkafolyamat Indítása
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-bg-elevated/20 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-sm">
          <p>© 2026 WebDude.hu. Minden jog fenntartva.</p>
        </div>
      </footer>
    </div>
  );
}
