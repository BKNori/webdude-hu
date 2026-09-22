import type { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  HelpCircle,
  Sparkles,
  FileSearch,
  Code2,
  Share2,
  Target,
  BarChart3
} from "lucide-react";
import PricingTable, { type PricingTier } from "@/components/molecules/PricingTable";

export const metadata: Metadata = {
  title: "Technikai SEO Audit | Keresőoptimalizálás | WebDude",
  description: "Miért nem találják a weboldalad a Google-ben? Átfogó technikai SEO audit és priorizált javítási terv a láthatóság növeléséért.",
  openGraph: {
    title: "Technikai SEO Audit | Keresőoptimalizálás | WebDude",
    description: "Miért nem találják a weboldalad a Google-ben? Átfogó technikai SEO audit és priorizált javítási terv a láthatóság növeléséért.",
    url: "https://webdude.hu/szolgaltatasok/technikai-seo-audit",
    type: "website",
  },
};

const pricingTiers: PricingTier[] = [
  {
    id: "seo-audit-starter",
    name: "Alap SEO Audit & Elemzés",
    description: "Kisvállalkozói oldalaknak a rejtett indexelési és technikai akadályok gyors felderítéséhez.",
    features: [
      "Feltérképezési és indexelési hibák (Google Search Console) feltárása",
      "Kulcsfontosságú meta címkék (Title, Description) auditja",
      "Törött linkek (404-es hibák) és átirányítási láncok listázása",
      "Mobilbarát működés és alapvető sebességelemzés",
      "Vezetői összefoglaló a legégetőbb teendőkről"
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=seo-audit-starter",
  },
  {
    id: "seo-audit-pro",
    name: "Mélyreható Technikai & Tartalmi Audit",
    description: "Növekedni vágyó cégeknek és webáruházaknak átfogó versenytárselemzéssel és javítási tervvel.",
    features: [
      "Minden, ami az Alap auditban szerepel",
      "Strukturált adatok (Schema.org / JSON-LD) és Rich Snippet audit",
      "Tartalmi kannibalizáció és duplikációk felderítése",
      "Keresési szándék (Search Intent) és kulcsszó-lefedettségi vizsgálat",
      "3 legfontosabb piaci versenytárs technikai összehasonlítása",
      "Priorizált, lépésről-lépésre kivitelezhető akcióterv"
    ],
    highlighted: true,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=seo-audit-pro",
  },
  {
    id: "seo-audit-execution",
    name: "Audit + Komplett Hibajavítás",
    description: "Nemcsak feltárom a problémákat, de a fejlesztői és technikai beállításokat is elvégzem helyetted.",
    features: [
      "Teljes körű mélyreható technikai és AEO audit",
      "Indexelési és canonical hibák azonnali javítása",
      "Hiányzó strukturált adatok programozása és tesztelése",
      "Belső linkstruktúra és URL architektúra optimalizálása",
      "Google Search Console és analitikai audit & újraküldés"
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=seo-audit-execution",
  },
];

const faqs = [
  {
    q: "Miért van szükség technikai SEO auditra?",
    a: "Gyakran előfordul, hogy egy gyönyörű weboldal azért nem hoz érdeklődőket, mert technikai gátak (rossz noindex beállítás, hiányzó webhelytérkép, lassú válaszidő vagy duplikált URL-ek) miatt a Google robotjai nem tudják megfelelően feltérképezni. Az audit leleplezi ezeket a láthatatlan hibákat.",
  },
  {
    q: "Mennyiben más a technikai audit egy általános SEO elemzésnél?",
    a: "Míg az általános SEO sokszor csak felületes kulcsszavakat vizsgál, a technikai audit a weboldal alapvető infrastruktúrájára fókuszál: szerver válaszok, HTTP fejlécek, canonical logikák, strukturált adatok és robots.txt direktívák.",
  },
  {
    q: "Mit tartalmaz a kézhez kapott audit riport?",
    a: "Nem egy értelmezhetetlen, automatikusan legenerált 100 oldalas PDF-et kapsz, hanem egy közérthető, priorizált akciótervet. Pontosan látni fogod, hogy milyen sorrendben mely javítások hozzák a legnagyobb forgalomnövekedést.",
  },
  {
    q: "Segítesz a feltárt technikai hibák kijavításában is?",
    a: "Igen! Fejlesztői múltammal közvetlenül a kódbázisban vagy a tartalomkezelőben is el tudom végezni a javításokat, így nem kell külön programozót megbíznod az implementálással.",
  },
];

export default function TechnikaiSeoAuditPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Technikai SEO Audit",
    provider: {
      "@type": "Person",
      name: "Norbert - WebDude",
      url: "https://webdude.hu",
    },
    description: "Miért nem találják a weboldalad a Google-ben? Átfogó technikai SEO audit és priorizált javítási terv a láthatóság növeléséért.",
    serviceType: "Technical SEO Audit",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-900/20 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-400 text-xs font-medium uppercase tracking-wider mb-6">
              <Search className="w-3.5 h-3.5 text-[#00B5F1]" />
              Adatalapú Keresőoptimalizálás & Diagnosztika
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Tudd meg, mi fogja vissza a weboldaladat a <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#a855f7]">Google-ben</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
              A SEO nem varázslat vagy véletlenek játéka, hanem precíz mérnöki munka. Feltárom az indexelési akadályokat, a technikai hibákat és a hiányzó strukturált adatokat, amelyek gátolják a vásárlószerzést.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kapcsolat?service=technikai-seo-audit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-cta-from to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-lg shadow-sky-950/50 transition-all duration-300 group"
              >
                Egyedi árajánlat kérése
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#csomagok"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
              >
                Audit csomagok
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Pillars Bento Grid */}
      <section className="py-24 relative border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Milyen területeket vizsgálok át az audit során?
            </h2>
            <p className="text-slate-400">
              A láthatatlan technikai részletektől a modern AI válaszmotorok (AEO) által megkövetelt strukturált adatokig.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                  <FileSearch className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Indexelés & Feltérképezés</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Robots.txt, XML sitemap, noindex direktívák, canonical címkék és szerver hibakódok (404, 500) tüzetes vizsgálata.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-sky-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Hibátlan bejárhatóság
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Strukturált Adatok & AEO</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Schema.org JSON-LD jelölések a Google Rich Snippets és a mesterséges intelligencia keresők (Perplexity, ChatGPT) számára.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-purple-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> AI válaszmotor készenlét
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                  <Share2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Belső Linkarchitektúra</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Átgondolt siló-struktúra kialakítása, hogy a linkérték és az autoritás a legfontosabb bevételtermelő aloldalakra áramoljon.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-sky-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Optimális belső linkelés
              </div>
            </div>

            <div className="md:col-span-2 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1]">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Versenytárs & Kulcsszó Réshasáb Elemzés</h3>
                  <p className="text-slate-400 text-sm">Derítsük ki, miben járnak előtted a versenytársaid és hogyan előzheted meg őket.</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Megkeressük azokat a releváns kifejezéseket, amelyekre van kereslet a piacon, de a te oldaladon még nincs rájuk célzott válasz. Megszüntetjük a tartalmi kannibalizációt, amikor több aloldalad versenyez egymással.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Keresési szándék (Search Intent)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Versenytárs audit</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Priorizált javítási terv</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Konverzió & Kattintási Arány (CTR)</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Nem elég megjelenni a találati listán: kattintásra ösztönző címeket és snippeteket készítünk a látogatószám növeléséhez.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-purple-400 flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-4 h-4" /> Magasabb CTR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="csomagok" className="py-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              SEO Audit Csomagok & Formátum
            </h2>
            <p className="text-slate-400">
              Válaszd ki a céged jelenlegi helyzetéhez leginkább passzoló auditot. Személyre szabott ajánlattal dolgozom.
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
              SEO Audit GYIK
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Gyakori kérdések a technikai SEO auditról
            </h2>
            <p className="text-slate-400">
              Minden, amit a feltárásról, a jelentésről és a hibajavításról tudni érdemes.
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
            Szeretnéd tudni, miért nem hoz vevőket a weboldalad?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            Kérj auditot most, és tárd fel a weboldalad rejtett forgalomnövelési lehetőségeit!
          </p>
          <Link
            href="/kapcsolat?service=technikai-seo-audit"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-cta-from to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-xl shadow-sky-950/60 transition-all duration-300 group"
          >
            Egyedi árajánlat kérése
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
