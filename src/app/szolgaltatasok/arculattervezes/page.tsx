import type { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle,
  Palette,
  Eye,
  Award,
  BookOpen,
  Layers,
  Sparkles
} from "lucide-react";
import PricingTable, { type PricingTier } from "@/components/molecules/PricingTable";

export const metadata: Metadata = {
  title: "Arculattervezés vállalkozásoknak | Logó és márkaidentitás | WebDude",
  description: "Egyedi arculattervezés kisvállalkozásoknak és új márkáknak. Logó, színek, tipográfia és alkalmazási útmutató egy összefüggő vizuális rendszerben.",
  openGraph: {
    title: "Arculattervezés vállalkozásoknak | Logó és márkaidentitás | WebDude",
    description: "Egyedi arculattervezés kisvállalkozásoknak és új márkáknak. Logó, színek, tipográfia és alkalmazási útmutató egy összefüggő vizuális rendszerben.",
    url: "https://webdude.hu/szolgaltatasok/arculattervezes",
    type: "website",
  },
};

const pricingTiers: PricingTier[] = [
  {
    id: "branding-start",
    name: "Alap Arculat & Logó",
    description: "Induló vállalkozásoknak, akiknek profi, egységes és megbízható megjelenésre van szükségük az azonnali piaci induláshoz.",
    features: [
      "Végleges logótervezés 3 különböző koncepció alapján",
      "Vektoriális és raszteres formátumok (AI, SVG, PDF, PNG)",
      "Elsődleges és másodlagos színpaletta (HEX, RGB, CMYK)",
      "Tipográfiai szabályok és betűtípus-párosítások",
      "Közösségi média profilkép és borítókép sablonok"
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=branding-start",
  },
  {
    id: "branding-full",
    name: "Komplett Márkaidentitás",
    description: "Növekvő márkáknak és átalakuló cégeknek, akik professzionális, minden felületen következetes vizuális jelenlétet akarnak.",
    features: [
      "Minden, ami az Alap csomagban szerepel",
      "Kiterjedt Arculati Kézikönyv (Brand Guidelines)",
      "Névjegykártya és levélpapír nyomdai előkészítéssel",
      "E-mail aláírás és prezentációs sablon (PowerPoint/Keynote)",
      "Digitális hirdetéssablonok és közösségi média csomag",
      "Weboldal UI vizuális stílus-iránymutatás"
    ],
    highlighted: true,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=branding-full",
  },
  {
    id: "branding-custom",
    name: "Prémium Brand Rendszer",
    description: "Vállalati szintű márkaépítés, átfogó dizájnrendszer, csomagolástervezés és kiadványok egy kézből.",
    features: [
      "Komplett vizuális audit és piaci pozicionálás",
      "Egyedi ikonográfia és illusztrációs rendszer kidolgozása",
      "Csomagolástervezés, címkék és kiadványgrafika",
      "Jármű- és épületdekorációs látványtervek és nyomdai anyagok",
      "Konzultáció és szaktanácsadás a márkaimplementáció során"
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=branding-custom",
  },
];

const faqs = [
  {
    q: "Hány év grafikai tapasztalattal rendelkezel?",
    a: "Több mint 26 éve foglalkozom nyomdai előkészítéssel, grafikai tervezéssel és digitális vizuális rendszerek alkotásával. Ismerem mind a digitális képernyők, mind a fizikai nyomtatás speciális technikai követelményeit.",
  },
  {
    q: "Hány logótervet kapok választásra?",
    a: "Általában 3 teljesen különböző, átgondolt koncepciót dolgozok ki, melyeket valós felhasználási környezetben (mockupokon) mutatok be. A kiválasztott irányt az észrevételeid alapján finomítjuk a tökéletes végeredményig.",
  },
  {
    q: "Milyen formátumokban kapom meg az elkészült logót?",
    a: "Minden szabványos formátumban átadom: nyomdai minőségű vektorfájlok (AI, EPS, PDF, SVG) és digitális használatra optimalizált fájlok (PNG áttetsző háttérrel, JPG, WebP), fekete-fehér és negatív változatokkal kiegészítve.",
  },
  {
    q: "Mi az az Arculati Kézikönyv, és miért van rá szükség?",
    a: "Az Arculati Kézikönyv egy praktikus útmutató, amely rögzíti a logóhasználat szabályait, a betűtípusokat, a pontos színkódokat és az elrendezéseket. Ez garantálja, hogy bárki (pl. nyomda, marketinges vagy fejlesztő) dolgozik a márkáddal, a vizuális megjelenés mindig egységes marad.",
  },
];

export default function ArculattervezesPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Arculattervezés és márkaidentitás",
    provider: {
      "@type": "Person",
      name: "Norbert - WebDude",
      url: "https://webdude.hu",
    },
    description: "Egyedi arculattervezés kisvállalkozásoknak és új márkáknak. Logó, színek, tipográfia és alkalmazási útmutató egy összefüggő vizuális rendszerben.",
    serviceType: "Branding and Visual Identity",
    areaServed: "HU",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* JSON-LD Schemas with XSS Protection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-400 text-xs font-medium uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#00B5F1]" />
              26 Év Grafikai Tapasztalat & Márkaépítés
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Arculattervezés, amely <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B5F1] to-[#a855f7]">bizalmat ébreszt</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
              A márkád vizuális megjelenése az első másodpercben dönt arról, hogy komolyan vesznek-e. 26 év tapasztalattal építek vizuális rendszereket, amelyek kiemelnek a tömegből.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kapcsolat?service=arculattervezes"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-lg shadow-purple-950/50 transition-all duration-300 group"
              >
                Egyedi árajánlat kérése
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#csomagok"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
              >
                Szolgáltatások és részletek
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* E-E-A-T & Value Pillars Bento Grid */}
      <section className="py-24 relative border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Miért nem elég egy egyszerű sablonlogó?
            </h2>
            <p className="text-slate-400">
              A generált vagy sablonból vett grafikák nem tükrözik a céged értékeit és gyakran nyomdai hibákhoz vezetnek. Egy átgondolt arculat stratégiai befektetés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">26 Év Grafikai Rutin</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A hagyományos ofszet és digitális nyomdai alapoktól kezdve a modern UI/UX képernyődizájnig mindent átlátok. Nincsenek technikai meglepetések.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-purple-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Prémium szintű kivitelezés
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Harmonikus Szín & Tipográfia</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Pszichológiailag alátámasztott színhasználat és professzionális betűkészletek, amelyek támogatják az olvashatóságot és a prémium hatást.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-sky-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Kiemelkedés a versenytársak közül
              </div>
            </div>

            {/* Bento Card 3 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Arculati Kézikönyv (Brand Book)</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Pontos szabályrendszer a logó védőtávolságáról, méretezéséről, helyes és helytelen alkalmazásáról, hogy a márkád bárhol egységes maradjon.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-purple-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Hosszú távú konzisztencia
              </div>
            </div>

            {/* Bento Card 4 (Span 2) */}
            <div className="md:col-span-2 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1]">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Minden Felületen Hiteles Megjelenés</h3>
                  <p className="text-slate-400 text-sm">A weboldaltól a névjegykártyán át az óriásplakátig.</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Nem csupán egy ikont kapsz: egy komplett vizuális eszköztárat hozok létre, amely kiterjed a prezentációs sablonokra, a közösségi média grafikákra, a céges papírokra és a nyomdai reklámeszközökre.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Vektoriális SVG & AI</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Nyomdai CMYK előkészítés</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Közösségi média sablonok</span>
                </div>
              </div>
            </div>

            {/* Bento Card 5 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Azonnali Megkülönböztetés</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A vevőid néhány pillanat alatt ítélnek. Olyan vizuális arculatot alkotunk, amely stabilitást és magas minőséget sugároz.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-sky-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Magasabb konverzió
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table Section - Zero Fixed Price Rule */}
      <section id="csomagok" className="py-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Arculattervezési Csomagok & Struktúra
            </h2>
            <p className="text-slate-400">
              Válaszd ki az üzleti céljaidnak megfelelő irányt. Egyedi igények alapján, rejtett költségek nélkül készítem el a személyre szabott ajánlatot.
            </p>
          </div>

          <PricingTable tiers={pricingTiers} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-[#00B5F1]" />
              Gyakori kérdések
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Minden, amit az arculattervezésről tudni érdemes
            </h2>
            <p className="text-slate-400">
              Válaszok a legfontosabb kérdésekre a közös munkáról, a formátumokról és a jogokról.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <h3 className="text-lg font-bold text-white mb-2 flex items-start gap-3">
                  <span className="text-[#00B5F1] font-mono text-sm mt-1">0{index + 1}.</span>
                  {faq.q}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Emeld magasabb szintre a márkád vizuális erejét!
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            Kérj egyedi árajánlatot az arculatod megtervezésére vagy megújítására, és építsünk együtt egy emlékezetes márkát!
          </p>
          <Link
            href="/kapcsolat?service=arculattervezes"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-xl shadow-purple-950/60 transition-all duration-300 group"
          >
            Egyedi árajánlat kérése
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
