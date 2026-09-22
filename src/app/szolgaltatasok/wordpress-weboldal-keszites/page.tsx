import type { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  Code2, 
  ShieldCheck, 
  Gauge, 
  Search, 
  HelpCircle,
  Layers,
  Sparkles,
  Settings2
} from "lucide-react";
import PricingTable, { type PricingTier } from "@/components/molecules/PricingTable";

export const metadata: Metadata = {
  title: "WordPress weboldal készítés | Egyedi fejlesztés | WebDude",
  description: "Egyedi WordPress weboldal készítés, felújítás és fejlesztés vállalkozásoknak. Gyors, biztonságos, könnyen kezelhető és SEO-barát megoldások.",
  openGraph: {
    title: "WordPress weboldal készítés | Egyedi fejlesztés | WebDude",
    description: "Egyedi WordPress weboldal készítés, felújítás és fejlesztés vállalkozásoknak. Gyors, biztonságos, könnyen kezelhető és SEO-barát megoldások.",
    url: "https://webdude.hu/szolgaltatasok/wordpress-weboldal-keszites",
    type: "website",
  },
};

const pricingTiers: PricingTier[] = [
  {
    id: "wp-starter",
    name: "Alap WordPress Weboldal",
    description: "Ideális bemutatkozó oldal vagy portfólió induló vállalkozásoknak egyedi sablonnal és letisztult adminnal.",
    features: [
      "Egyedi, reszponzív dizájn (nem vásárolt sablon)",
      "Gutenberg blokkalapú, villámgyors szerkesztőfelület",
      "Alapvető technikai és on-page SEO beállítások",
      "Biztonsági keményítés (brute force és spam védelem)",
      "Kapcsolati űrlap és alapvető analitika bekötés"
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=wordpress-starter",
  },
  {
    id: "wp-pro",
    name: "Üzleti & Prémium WordPress",
    description: "Komplexebb vállalkozói portál egyedi funkciókkal, automatizációkkal és kiemelt konverziófókusszal.",
    features: [
      "Minden, ami az Alap csomagban szerepel",
      "Egyedi egyedi mezők (ACF Pro) és egyedi bejegyzéstípusok",
      "Fejlett sebességoptimalizálás (90+ Google PageSpeed)",
      "CRM, számlázó és hírlevélküldő integrációk",
      "Többnyelvűsítés előkészítése és strukturált adatok (Schema)",
      "Részletes betanítás és képernyővideós dokumentáció"
    ],
    highlighted: true,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=wordpress-pro",
  },
  {
    id: "wp-enterprise",
    name: "Egyedi Rendszer & Újragondolás",
    description: "Meglévő, elavult vagy lassú rendszerek modernizálása, egyedi pluginfejlesztés és dedikált támogatás.",
    features: [
      "Teljes adatbázis- és tartalommigráció veszteségmentesen",
      "Egyedi plugin- és funkciófejlesztés specifikáció szerint",
      "Headless WordPress / Next.js hibrid megoldási lehetőség",
      "Szigorú kódolási és biztonsági auditok",
      "Kiemelt SLA és dedikált havi karbantartási opciók"
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=wordpress-enterprise",
  },
];

const faqs = [
  {
    q: "Miért egyedi WordPress oldalt készíttessek, ha vannak ingyenes vagy olcsó sablonok is?",
    a: "A piacon vásárolható sablonok felesleges kódok ezreivel vannak telepakolva, ami lassú betöltést, biztonsági réseket és a frissítések során felmerülő hibákat eredményez. Az általam készített egyedi WordPress oldalak kizárólag a cégedhez szükséges kódot tartalmazzák, így villámgyorsak, stabilak és könnyen bővíthetők.",
  },
  {
    q: "Tudom majd önállóan is kezelni és módosítani a tartalmakat?",
    a: "Igen, a projekt átadásának alapfeltétele a testreszabott, intuitív adminfelület és az oktatás. Nem kell kódolni tudnod: a szövegeket, képeket és új bejegyzéseket olyan egyszerűen tudod frissíteni, mint egy Word dokumentumot.",
  },
  {
    q: "Mennyi időt vesz igénybe egy egyedi WordPress weboldal elkészítése?",
    a: "A projekt összetettségétől függően egy átgondolt bemutatkozó weboldal jellemzően 2–3 hét alatt készül el, míg a komplexebb, egyedi funkciókat vagy migrációt igénylő rendszerek 4–6 hetet vehetnek igénybe.",
  },
  {
    q: "Hogyan gondoskodsz a WordPress oldal biztonságáról?",
    a: "Alapértelmezett bejelentkezési útvonalak elrejtése, kétfaktoros hitelesítés támogatása, automatikus adatbázis-mentések, tűzfal és spamvédelem konfigurálása, valamint rendszeres mag- és bővítményfrissítési protokoll védi a weboldalt a támadásoktól.",
  },
];

export default function WordPressWeboldalKeszitesPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WordPress weboldal készítés",
    provider: {
      "@type": "Person",
      name: "Norbert - WebDude",
      url: "https://webdude.hu",
    },
    description: "Egyedi WordPress weboldal készítés, felújítás és fejlesztés vállalkozásoknak. Gyors, biztonságos, könnyen kezelhető és SEO-barát megoldások.",
    serviceType: "Web Development",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-400 text-xs font-medium uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#00B5F1]" />
              WordPress Szakértelem & Egyedi Fejlesztés
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              WordPress weboldal készítés, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B5F1] to-[#a855f7]">kompromisszumok nélkül</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
              Ha könnyen szerkeszthető, mégis professzionális weboldalra van szükséged, a WordPress jó alap lehet. Egyedi megjelenést, átgondolt struktúrát, technikai SEO-beállításokat és olyan adminfelületet kapsz, amelyet később önállóan is tudsz használni.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kapcsolat?service=wordpress"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-lg shadow-sky-950/50 transition-all duration-300 group"
              >
                Egyedi árajánlat kérése
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#csomagok"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
              >
                Csomagok és részletek
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* E-E-A-T Bento Grid Section */}
      <section className="py-24 relative border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Nem egy sablonos oldal — Valódi digitális érték
            </h2>
            <p className="text-slate-400">
              A legtöbb WordPress oldal elbukik a lassúságon és a túlméretezett bővítményeken. Én a tiszta architektúrában és a fenntartható kódban hiszek.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                  <Gauge className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Maximális Betöltési Sebesség</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Optimalizált képek, minifikált scriptek, modern webp/avif formátumok és minimális DOM-méret. Nem terhelem a weboldaladat 40 felesleges pluginnel.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-sky-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> 90+ PageSpeed elvárás
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                  <Settings2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Könnyen Kezelhető Admin</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Gutenberg blokkokkal és egyedi mezőkkel felvértezett vezérlőpult. Úgy formázhatod a szövegeket és tölthetsz fel új tartalmakat, hogy a dizájn nem esik szét.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-purple-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Nulla kódolási igény átadás után
              </div>
            </div>

            {/* Bento Card 3 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Védelmi Szint & Stabilitás</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Keményített konfiguráció a leggyakoribb sebezhetőségek (SQL injection, XSS, Brute-Force) ellen. Rendszeres biztonsági másolatok és naprakész komponensek.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-sky-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Nyugodt üzemeltetés
              </div>
            </div>

            {/* Bento Card 4 (Span 2) */}
            <div className="md:col-span-2 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1]">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Technikai SEO & Keresőoptimalizálás Alapok</h3>
                  <p className="text-slate-400 text-sm">Hogy ne csak létezzen a weboldalad, de megtalálják az ügyfeleid is.</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Tiszta HTML5 struktúra, helyes H1-H3 hierarchia, automatikus XML webhelytérkép generálás, canonical címkék és modern Schema.org strukturált adatok beépítése a legmagasabb szintű Google és AI Answer Engine megfelelésért.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Strukturált adatok</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Keresőbarát URL-ek</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>OpenGraph közösségi kártyák</span>
                </div>
              </div>
            </div>

            {/* Bento Card 5 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Egyedi Fejlesztés & Bővíthetőség</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Ha nem találsz kész plugint a folyamataidra, megírom az egyedi logikát. Webshop, külső API kapcsolat vagy automatizált adatfolyamok.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-purple-400 flex items-center gap-1.5 font-semibold">
                <Layers className="w-4 h-4" /> Korlátlan növekedési potenciál
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
              Szolgáltatási Csomagok & Struktúra
            </h2>
            <p className="text-slate-400">
              Minden vállalkozás és webes igény egyedi. Nincsenek rejtett költségek: a pontos igényfelmérés után személyre szabott, kötöttségek nélküli ajánlatot készítek.
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
              Minden, amit a WordPress fejlesztésről tudni érdemes
            </h2>
            <p className="text-slate-400">
              Válaszok a leggyakoribb felmerülő kérdésekre a tervezéstől a későbbi karbantartásig.
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
            Készen állsz egy modern, gyors és biztonságos WordPress weboldalra?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            Írd meg az elképzeléseidet, és 24 órán belül felveszem veled a kapcsolatot a részletekkel és a megoldási javaslatokkal!
          </p>
          <Link
            href="/kapcsolat?service=wordpress"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-xl shadow-sky-950/60 transition-all duration-300 group"
          >
            Egyedi árajánlat kérése
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
