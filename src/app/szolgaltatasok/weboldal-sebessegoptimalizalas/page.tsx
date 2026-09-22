import type { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  Gauge, 
  Zap, 
  HelpCircle,
  Sparkles,
  Server,
  Layers,
  TrendingUp,
  Cpu
} from "lucide-react";
import PricingTable, { type PricingTier } from "@/components/molecules/PricingTable";

export const metadata: Metadata = {
  title: "Weboldal Sebességoptimalizálás | Gyorsabb Betöltés | WebDude",
  description: "Lassú a weboldalad? A látogatók és a Google is bünteti. Adatalapú weboldal gyorsítás és Core Web Vitals optimalizálás.",
  openGraph: {
    title: "Weboldal Sebességoptimalizálás | Gyorsabb Betöltés | WebDude",
    description: "Lassú a weboldalad? A látogatók és a Google is bünteti. Adatalapú weboldal gyorsítás és Core Web Vitals optimalizálás.",
    url: "https://webdude.hu/szolgaltatasok/weboldal-sebessegoptimalizalas",
    type: "website",
  },
};

const pricingTiers: PricingTier[] = [
  {
    id: "speed-audit",
    name: "Sebességi Audit & Feltárás",
    description: "Pontos diagnosztika a szűk keresztmetszetekről, szerver válaszidőkről és hibás szkriptekről.",
    features: [
      "Teljes Core Web Vitals (LCP, INP, CLS) analízis",
      "Képek, médiafájlok és betűtípusok betöltési vizsgálata",
      "CSS és JavaScript blokkoló források felderítése",
      "Szerver- és adatbázis lekérdezési sebesség elemzése",
      "Priorizált, lépésről-lépésre követhető javítási terv"
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=speed-audit",
  },
  {
    id: "speed-pro",
    name: "Komplett Sebességgyorsítás",
    description: "A leggyakoribb vállalkozói weboldalak teljes optimalizálása 90+ PageSpeed pontszám eléréséért.",
    features: [
      "Minden, ami az Audit csomagban szerepel",
      "Képek veszteségmentes tömörítése és modern WebP/AVIF konverzió",
      "Next-gen böngésző és szerveroldali gyorsítótárazás (caching)",
      "Kritikus CSS kinyerése és nem-kritikus JS késleltetése",
      "Adatbázis-takarítás és felesleges lekérések megszüntetése",
      "Előtte-utána sebességmérés és garancia"
    ],
    highlighted: true,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=speed-pro",
  },
  {
    id: "speed-enterprise",
    name: "Webshop & Kiemelt Rendszergyorsítás",
    description: "Komplex WooCommerce áruházak és magas látogatottságú platformok teljesítmény-maximalizálása.",
    features: [
      "Pénztár és dinamikus kosár lekérések optimalizálása",
      "Redis / Memcached memóriagyorsítótár bekötése",
      "CDN (Cloudflare / Edge cache) konfiguráció és védelem",
      "Felesleges bővítmények kódjának refaktorálása",
      "Szerveroldali HTTP/3 és PHP optimalizálási javaslatok"
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=speed-enterprise",
  },
];

const faqs = [
  {
    q: "Miért számít annyira a weboldal betöltési sebessége?",
    a: "A statisztikák egyértelműek: minden egyes másodperc késlekedés átlagosan 20%-kal csökkenti a konverziós arányt. Emellett a Google a Core Web Vitals mutatókat közvetlen rangsorolási faktorként kezeli: a lassú oldalakat hátrébb sorolja a keresési találatokban.",
  },
  {
    q: "Megváltozik a weboldalam kinézete a gyorsítás során?",
    a: "Nem! Az optimalizálás lényege a motorháztető alatti kód és erőforrások észrevétlen finomhangolása. A dizájn, az elrendezés és a funkciók változatlanok maradnak, csupán a betöltés válik azonnalivá.",
  },
  {
    q: "Garantálható a 90+ PageSpeed pontszám mobil eszközökön is?",
    a: "A legtöbb tiszta felépítésű weboldalnál elérhető a zöld (90+) zóna mobilon is. Olyan esetekben, ahol harmadik féltől származó nehéz szkriptek futnak (pl. komplex chat widgetek, több analitikai tracker), a legmagasabb technológiailag elérhető sebességet hozzuk ki kompromisszumok nélkül.",
  },
  {
    q: "Mennyi ideig tart a weboldal sebességoptimalizálása?",
    a: "Egy bemutatkozó weboldal optimalizálása általában 2–4 munkanapot vesz igénybe, míg összetett webshopok esetén 1–2 hét szükséges az alapos tesztelés miatt.",
  },
];

export default function WeboldalSebessegoptimalizalasPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Weboldal Sebességoptimalizálás",
    provider: {
      "@type": "Person",
      name: "Norbert - WebDude",
      url: "https://webdude.hu",
    },
    description: "Lassú a weboldalad? A látogatók és a Google is bünteti. Adatalapú weboldal gyorsítás és Core Web Vitals optimalizálás.",
    serviceType: "Website Performance Optimization",
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
              <Zap className="w-3.5 h-3.5 text-[#00B5F1]" />
              Core Web Vitals & PageSpeed Gyorsítás
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Ne veszíts több ügyfelet a <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#a855f7]">lassú betöltés</span> miatt
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
              Minden másodperc várakozás 20%-kal csökkenti a bevételedet. A látogatók azonnal visszalépnek, a Google pedig hátrébb sorolja a lassú oldalakat. Adatalapú gyorsítással repítem a zöld zónába a weboldaladat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kapcsolat?service=weboldal-sebessegoptimalizalas"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-cta-from to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-lg shadow-sky-950/50 transition-all duration-300 group"
              >
                Egyedi árajánlat kérése
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#csomagok"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
              >
                Gyorsítási opciók
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Speed Metrics Bento Grid */}
      <section className="py-24 relative border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Hogyan gyorsítom fel a weboldaladat a valóságban?
            </h2>
            <p className="text-slate-400">
              Nem használok csodatevőnek mondott, valójában lassító &quot;all-in-one&quot; bővítményeket. Mérnöki pontossággal optimalizálom az erőforrásokat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                  <Gauge className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Core Web Vitals Megfelelés</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  LCP (legnagyobb tartalom megjelenése), INP (interakciós válaszidő) és CLS (elrendezés-elmozdulás) optimalizálása a Google elvárásai szerint.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-sky-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Zöld metrikák garantálva
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Next-Gen Képoptimalizálás</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Több megabájtos képek automatikus átalakítása WebP és AVIF formátumokba, reszponzív méretezéssel és késleltetett betöltéssel (Lazy Loading).
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-purple-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Akár 80%-kal kisebb oldalsúly
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Kód Minifikálás & Késleltetés</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A felesleges CSS és JS sorok eltávolítása, a renderelést blokkoló szkriptek aszinkron futtatása és a kritikus CSS beágyazása.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-sky-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Blokkolásmentes renderelés
              </div>
            </div>

            <div className="md:col-span-2 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1]">
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Szerveroldali Gyorsítótár & Adatbázis Hangolás</h3>
                  <p className="text-slate-400 text-sm">A lassú szerver válaszidő (TTFB) lefaragása a töredékére.</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Objektum-gyorsítótár (Redis), szerveroldali gzip/brotli tömörítés és adatbázis indexelés. Az oldal nem fog megrogyni a nagyobb forgalmú kampányok idején sem.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Alacsonyabb TTFB</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Brotli tömörítés</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Magasabb terhelhetőség</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Mérhető Konverzióugrás</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A gyors oldal azonnal megragadja a figyelmet: a látogatók nem ugranak vissza a keresőbe, hanem megrendelik a termékedet.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-purple-400 flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-4 h-4" /> Több eladás
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
              Sebességoptimalizálási Csomagok
            </h2>
            <p className="text-slate-400">
              Válaszd ki a rendszeredhez illeszkedő gyorsítási szintet. Fix díjas meglepetések nélkül, egyedi igényfelméréssel dolgozom.
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
              Sebesség GYIK
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Gyakori kérdések a weboldal gyorsításról
            </h2>
            <p className="text-slate-400">
              Minden lényeges technikai részlet a gyorsítás folyamatáról.
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
            Szeretnéd tudni, mennyit gyorsulhat a te weboldalad?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            Küldd el a weboldalad linkjét, és elkészítem az előzetes sebességi elemzést a legfontosabb javítási javaslatokkal!
          </p>
          <Link
            href="/kapcsolat?service=weboldal-sebessegoptimalizalas"
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
