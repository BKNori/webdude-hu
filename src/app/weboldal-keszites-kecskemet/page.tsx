import type { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Users2, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  Sparkles,
  Coffee,
  Laptop,
  Compass
} from "lucide-react";
import PricingTable, { type PricingTier } from "@/components/molecules/PricingTable";

export const metadata: Metadata = {
  title: "Weboldal készítés Kecskemét | WebDude",
  description: "Weboldal készítés Kecskeméten és országosan. WordPress, egyedi webfejlesztés, SEO és grafikai tervezés közvetlenül a WebDude-tól.",
  openGraph: {
    title: "Weboldal készítés Kecskemét | WebDude",
    description: "Weboldal készítés Kecskeméten és országosan. WordPress, egyedi webfejlesztés, SEO és grafikai tervezés közvetlenül a WebDude-tól.",
    url: "https://webdude.hu/weboldal-keszites-kecskemet",
    type: "website",
  },
};

const pricingTiers: PricingTier[] = [
  {
    id: "kecskemet-start",
    name: "Kecskeméti Vállalkozói Alapcsomag",
    description: "Helyi kisvállalkozásoknak, szolgáltatóknak és szakembereknek a helyi láthatóság megalapozásához.",
    features: [
      "Egyedi, mobilbarát dizájn Kecskemétre szabva",
      "Google Cégprofil (Google Business Profile) optimalizáció",
      "Kecskeméti lokális kulcsszavak és lokális SEO beállítás",
      "Gyors betöltés, SSL tanúsítvány és biztonsági alapok",
      "Személyes vagy online egyeztetés a projekt indulásakor"
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=kecskemet-start",
  },
  {
    id: "kecskemet-pro",
    name: "Kecskeméti Növekedési & Üzleti Csomag",
    description: "Versenytársakat megelőző helyi és regionális jelenlét, komplex bemutató felület és konverziós gépezet.",
    features: [
      "Minden, ami az Alapcsomagban szerepel",
      "Részletes konkurencia- és kulcsszóelemzés a kecskeméti és országos piacon",
      "Kiemelt sebességoptimalizálás (90+ PageSpeed)",
      "Interaktív funkciók, űrlapok, időpontfoglalási rendszer integráció",
      "LocalBusiness és Service strukturált adatok a Google kiemeléshez",
      "Személyes konzultáció és folyamatos dedikált támogatás"
    ],
    highlighted: true,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=kecskemet-pro",
  },
  {
    id: "kecskemet-custom",
    name: "Egyedi Rendszer & Webáruház",
    description: "Egyedi szoftvermegoldások, webshopok és nagyobb volumenű vállalkozói platformok fejlesztése.",
    features: [
      "Komplett e-kereskedelmi vagy egyedi webalkalmazás fejlesztés",
      "Számlázó, futárszolgálat és banki fizetési kapu integrációk",
      "Teljes arculati és grafikai támogatás (online és offline)",
      "Kiemelt SLA és havi szintű technikai karbantartás",
      "Közvetlen, személyes rendelkezésre állás Kecskeméten"
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=kecskemet-custom",
  },
];

const faqs = [
  {
    q: "Lehetséges személyesen találkozni Kecskeméten a projekt megbeszélésére?",
    a: "Igen! Kecskeméten rugalmasan tudunk személyesen egyeztetni egy kávé mellett vagy a te irodádban. A személyes találkozó segíti a közvetlen bizalomépítést és a feladatok pontos, gyors átbeszélését.",
  },
  {
    q: "Csak kecskeméti cégekkel dolgozol, vagy országosan is vállalsz megbízásokat?",
    a: "Bár Kecskeméten személyesen is elérhető vagyok, a projektek jelentős része országosan, vagy akár külföldi partnerekkel zajlik zökkenőmentesen online felületeken (Meet, Zoom, e-mail, telefon) keresztül.",
  },
  {
    q: "Hogyan segít a weboldal abban, hogy több kecskeméti ügyfelem legyen?",
    a: "A speciális lokális SEO (helyi keresőoptimalizálás) beállításoknak, a helyes földrajzi metaadatoknak és a Google Cégprofil bekötésének köszönhetően az oldalad előre kerül, amikor a környékbeliek a szolgáltatásaidra keresnek a Google-ben és a Google Térképen.",
  },
  {
    q: "Mennyi ideig tart egy új weboldal elkészítése?",
    a: "Egy jól átgondolt bemutatkozó oldal rendszerint 2–3 hét alatt készül el a megbeszélést és a szöveges anyagok egyeztetését követően.",
  },
];

export default function WeboldalKeszitesKecskemetPage() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "WebDude - Weboldal készítés Kecskemét",
    image: "https://webdude.hu/og/weboldal-keszites-kecskemet.jpg",
    url: "https://webdude.hu/weboldal-keszites-kecskemet",
    telephone: "+36-20-000-0000",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kecskemét",
      addressLocality: "Kecskemét",
      postalCode: "6000",
      addressCountry: "HU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.9074,
      longitude: 19.6917,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      opens: "09:00",
      closes: "18:00"
    }
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Weboldal készítés Kecskemét",
    provider: {
      "@type": "Person",
      name: "Norbert - WebDude",
      url: "https://webdude.hu",
    },
    description: "Weboldal készítés Kecskeméten és országosan. WordPress, egyedi webfejlesztés, SEO és grafikai tervezés közvetlenül a WebDude-tól.",
    serviceType: "Web Development and Local SEO",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Kecskemét",
    },
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
          __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
              <MapPin className="w-3.5 h-3.5 text-[#00B5F1]" />
              Kecskemét & Bács-Kiskun Vármegye
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Profi weboldal készítés <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#a855f7]">Kecskeméten</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
              Közvetlen kapcsolat, helyi elérhetőség és prémium digitális kivitelezés. Olyan eladásorientált weboldalt készítek kecskeméti vállalkozásodnak, amely kiemel a helyi versenytársak közül és vevőket generál.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kapcsolat?service=kecskemet"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-cta-from to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-lg shadow-sky-950/50 transition-all duration-300 group"
              >
                Egyedi árajánlat kérése
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#szemelyes-talalkozo"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
              >
                Személyes konzultáció
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DEDICATED SECTION: Személyes találkozó és konzultáció Kecskeméten (CRITICAL LOCAL SEO & CONVERSION) */}
      <section id="szemelyes-talalkozo" className="py-24 relative border-b border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-400 text-xs font-medium uppercase tracking-wider mb-6">
                <Coffee className="w-3.5 h-3.5 text-[#00B5F1]" />
                Közvetlen Kapcsolat & Bizalom
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Személyes találkozó és konzultáció Kecskeméten
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                A sikeres webes projekt alapja az őszinte, közvetlen kommunikáció. Nem egy arctalan ügynökség vagyok sokadik közvetítővel: velem, a fejlesztővel és tervezővel beszélsz az első pillanattól fogva.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] shrink-0 mt-0.5">
                    <Users2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Szemtől szembeni bizalom</h4>
                    <p className="text-slate-400 text-xs mt-0.5">Üljünk le egy kávé mellé Kecskemét belvárosában vagy az irodádban, és beszéljük át pontosan az üzleti céljaidat.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Gyors reagálás és helyi elérhetőség</h4>
                    <p className="text-slate-400 text-xs mt-0.5">Helyben vagyok: ha sürgős módosítás, fotózás vagy személyes egyeztetés szükséges, azonnal rendelkezésre állok.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] shrink-0 mt-0.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Helyi piaci és vásárlói ismeret</h4>
                    <p className="text-slate-400 text-xs mt-0.5">Pontosan ismerem a kecskeméti és Bács-Kiskun vármegyei vásárlói szokásokat, a helyi konkurenciát és az elvárásokat.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Local Proof Card */}
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-linear-to-br from-[#00B5F1]/10 to-purple-600/10 blur-3xl pointer-events-none" />
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#00B5F1]" />
                Kecskeméti Helyi Előnyök
              </h3>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Kecskemét-fókuszú lokális SEO és kulcsszó-optimalizálás</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Google Térkép (Maps) és Cégprofil integráció</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Egyetlen felelős: nem adom át alvállalkozóknak a munkát</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>26 év tapasztalat grafika, nyomda és webfejlesztés terén</span>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-slate-800">
                <Link
                  href="/kapcsolat?service=kecskemet"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-linear-to-r from-cta-from to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] transition-all duration-200"
                >
                  Személyes találkozó kérése
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Why WebDude */}
      <section className="py-24 relative border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Miért éri meg velem dolgozni?
            </h2>
            <p className="text-slate-400">
              Professzionális webes jelenlét, amely valódi vásárlókat és megkereséseket hoz kecskeméti cégednek.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300">
              <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Modern Technológia</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Next.js, React vagy tiszta kódú WordPress. Nem lassú, elavult sablonokat tákolok, hanem jövőbiztos és villámgyors kódbázist építek.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Grafika & Web Egy Kézben</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Nem kell külön grafikust és fejlesztőt keresned. A logótól, az arculati színektől a kódolásig és a nyomdai anyagokig mindent megtervezek.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300">
              <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Biztonság & Garancia</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Maximális védelem a feltörések ellen, rendszeres mentések és átadás után sem engedem el a kezed: elérhető vagyok a jövőben is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table Section - Zero Fixed Price Rule */}
      <section id="csomagok" className="py-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Csomagok & Szolgáltatási Struktúra
            </h2>
            <p className="text-slate-400">
              Minden vállalkozás más és más fázisban van. Személyre szabott árajánlatot adok a konkrét céljaid alapján.
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
              Kecskeméti GYIK
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Gyakori kérdések a kecskeméti weboldal készítésről
            </h2>
            <p className="text-slate-400">
              Minden lényeges információ a helyi együttműködés menetéről.
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
            Találkozzunk Kecskeméten egy kötetlen konzultációra!
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            Beszéljük át a weboldalad vagy új projekted terveit. Írj nekem most, és 24 órán belül egyeztetünk egy időpontot!
          </p>
          <Link
            href="/kapcsolat?service=kecskemet"
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
