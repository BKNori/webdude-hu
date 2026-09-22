import type { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Smartphone, 
  HelpCircle,
  Sparkles,
  Layers,
  Palette,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import PricingTable, { type PricingTier } from "@/components/molecules/PricingTable";

export const metadata: Metadata = {
  title: "Weboldal Felújítás és Modernizálás | WebDude",
  description: "Lassú, elavult, vagy nem hoz ügyfelet a régi weboldalad? Weboldal felújítás, modernizálás és konverzió-optimalizálás KKV-knak.",
  openGraph: {
    title: "Weboldal Felújítás és Modernizálás | WebDude",
    description: "Lassú, elavult, vagy nem hoz ügyfelet a régi weboldalad? Weboldal felújítás, modernizálás és konverzió-optimalizálás KKV-knak.",
    url: "https://webdude.hu/szolgaltatasok/weboldal-felujitas",
    type: "website",
  },
};

const pricingTiers: PricingTier[] = [
  {
    id: "redesign-refresh",
    name: "Vizuális & Mobil Facelift",
    description: "Meglévő tartalom megőrzése mellett modern, reszponzív dizájn és letisztultabb megjelenés.",
    features: [
      "Elavult dizájnelemek modernizálása a mai trendek szerint",
      "Mobil- és tablet-nézetek tökéletesítése (Mobile-First UX)",
      "Betűtípusok, térközök és színek professzionális újrahangolása",
      "Képek és grafikai elemek frissítése nagyfelbontású formátumokra",
      "Kapcsolati űrlapok és CTA gombok átláthatóbb elhelyezése"
    ],
    highlighted: false,
    ctaText: "Projektfelmérés kérése",
    ctaLink: "/kapcsolat?service=redesign-refresh",
  },
  {
    id: "redesign-pro",
    name: "Komplett Technológiai & UX Újjáépítés",
    description: "A régi oldal teljes átültetése villámgyors, modern motorra és eladásfókuszú struktúrára.",
    features: [
      "Minden, ami a Facelift csomagban szerepel",
      "Modern Next.js vagy tiszta WordPress Gutenberg motorra migrálás",
      "Teljes tartalom és SEO pozíciók veszteségmentes átvitele (301 redirectek)",
      "90+ PageSpeed betöltési sebesség elérése",
      "Konverziós útvonalak és értékesítési tölcsérek újratervezése",
      "Átfogó technikai SEO és strukturált adatok beépítése"
    ],
    highlighted: true,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=redesign-pro",
  },
  {
    id: "redesign-enterprise",
    name: "Prémium Brand & Web Rendszer",
    description: "Komplett arculatváltás, e-kereskedelmi bővítés vagy komplex funkciók integrációja.",
    features: [
      "Márkaidentitás (logó, arculat) és weboldal szimultán megújítása",
      "Komplex egyedi funkciók, CRM vagy ERP számlázó integrációk",
      "Többnyelvűsítés és nemzetközi piacra lépés előkészítése",
      "Kiemelt SLA és dedikált támogatás a bevezetés során"
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=redesign-enterprise",
  },
];

const faqs = [
  {
    q: "Elvesznek a jelenlegi Google helyezéseim a felújítás során?",
    a: "Nem, ha szakszerűen történik az átállás! Kiemelt figyelmet fordítok az URL-struktúra megőrzésére vagy a precíz 301-es átirányítások (redirectek) beállítására. A gyorsabb betöltés és a jobb mobilélmény miatt a pozícióid a felújítás után rendszerint javulnak.",
  },
  {
    q: "Át tudod hozni a régi oldalunkon lévő szövegeket és képeket?",
    a: "Igen! A meglévő tartalmakat, blogcikkeket, referenciákat és képeket hiánytalanul átmentjük az új rendszerbe, sőt: a felújítás során a szövegek struktúráját is átláthatóbbá, könnyebben olvashatóvá tesszük.",
  },
  {
    q: "Leáll a jelenlegi weboldalam, amíg az új készül?",
    a: "Nem! Az új weboldalt egy védett tesztkörnyezetben fejlesztem, így a jelenlegi oldalad zavartalanul működik és fogadja a látogatókat. Az élesítés egyetlen átkapcsolással történik, leállási idő nélkül.",
  },
  {
    q: "Mennyi időt vesz igénybe egy elavult weboldal komplett felújítása?",
    a: "A projekt méretétől függően egy bemutatkozó honlap megújítása 2–3 hét alatt lezajlik, míg összetettebb, webshoppal kombinált rendszerek 4–6 hetet igényelnek.",
  },
];

export default function WeboldalFelujitasPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Weboldal Felújítás és Modernizálás",
    provider: {
      "@type": "Person",
      name: "Norbert - WebDude",
      url: "https://webdude.hu",
    },
    description: "Lassú, elavult, vagy nem hoz ügyfelet a régi weboldalad? Weboldal felújítás, modernizálás és konverzió-optimalizálás KKV-knak.",
    serviceType: "Website Redesign and Modernization",
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
              <RefreshCw className="w-3.5 h-3.5 text-[#00B5F1]" />
              Redesign & Modernizáció
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Weboldal felújítás: Elavult honlapból <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#a855f7]">ügyfélszerző gépezet</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
              A látogatóid az első 3 másodpercben megítélik a vállalkozásodat a weboldalad kinézete alapján. Ha a dizájn elavult, a szöveg nehezen olvasható mobilon, vagy az oldal lassan tölt be, a konkurenciádhoz pártolnak. Alakítsuk át valódi értékesítő felületté!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kapcsolat?service=weboldal-felujitas"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-cta-from to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-lg shadow-sky-950/50 transition-all duration-300 group"
              >
                Egyedi árajánlat kérése
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#csomagok"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
              >
                Felújítási opciók
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Redesign Bento Grid */}
      <section className="py-24 relative border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Miért hagyják el a látogatók a régi weboldalakat?
            </h2>
            <p className="text-slate-400">
              Az elavult weboldal nemcsak esztétikai probléma: közvetlenül csökkenti a bevételedet és hiteltelenné teszi a cégedet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Rossz Mobilélmény</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A látogatóid több mint 70%-a telefonról böngészik. Ha a menü nehezen nyitható vagy szétcsúszik a szöveg, azonnal bezárják az oldalt.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-purple-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Pixelpontos mobil nézet
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                  <Palette className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Elavult, Bizalmatlan Megjelenés</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Egy 5-8 évvel ezelőtti sablon elavultságot sugall. Modern, tiszta vizuális hierarchiával és prémium részletekkel építünk bizalmat.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-sky-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Prémium digitális arculat
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Gyenge Konverzió & Nincs CTA</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A régi oldalak gyakran csak &quot;névjegykártyák&quot;. Átgondolt értékesítési tölcséreket és egyértelmű kapcsolatfelvételi pontokat hozunk létre.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-purple-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Ügyfélszerző fókusz
              </div>
            </div>

            <div className="md:col-span-2 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1]">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Technológiai Korszerűsítés & SEO Védelem</h3>
                  <p className="text-slate-400 text-sm">Next.js vagy modern WordPress motor a lassú, összeomló rendszerek helyett.</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                A felújítás nem csupán festés: a motorháztető alatt is tiszta kódbázist építünk. Gondoskodom róla, hogy a meglévő Google helyezéseid sértetlenek maradjanak a precíz 301-es átirányításoknak és az új Schema.org adatoknak köszönhetően.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>301 redirect védelem</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Könnyű tartalomszerkesztés</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Leállásmentes élesítés</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Biztonság & Stabilitás</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A régi elhanyagolt keretrendszerek könnyű prédák a botoknak. Korszerű biztonsági architektúrára állunk át.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-emerald-400 flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-4 h-4" /> Modern biztonsági szint
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
              Weboldal Felújítási Csomagok
            </h2>
            <p className="text-slate-400">
              Válaszd ki a céged jelenlegi helyzetéhez illeszkedő megújulási formátumot.
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
              Felújítási GYIK
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Gyakori kérdések a weboldal felújításról
            </h2>
            <p className="text-slate-400">
              Válaszok a legfontosabb kérdésekre a folyamatról, tartalmakról és a technikai átállásról.
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
            Ideje új életet lehelni a jelenlegi weboldaladba?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            Küldd el a jelenlegi honlapod címét, és készítek egy ingyenes előzetes állapotfelmérést a javítási lehetőségekről!
          </p>
          <Link
            href="/kapcsolat?service=weboldal-felujitas"
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
