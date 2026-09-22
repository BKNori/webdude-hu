import type { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  Wrench, 
  ShieldAlert, 
  Zap, 
  HelpCircle,
  Sparkles,
  RefreshCw,
  Lock,
  Activity
} from "lucide-react";
import PricingTable, { type PricingTier } from "@/components/molecules/PricingTable";

export const metadata: Metadata = {
  title: "WordPress Karbantartás és Hibajavítás | WebDude",
  description: "Feltört, lassú vagy elavult WordPress weboldalak szakszerű javítása és havi karbantartása. Biztonság, sebesség és nyugalom vállalkozásoknak.",
  openGraph: {
    title: "WordPress Karbantartás és Hibajavítás | WebDude",
    description: "Feltört, lassú vagy elavult WordPress weboldalak szakszerű javítása és havi karbantartása. Biztonság, sebesség és nyugalom vállalkozásoknak.",
    url: "https://webdude.hu/szolgaltatasok/wordpress-karbantartas",
    type: "website",
  },
};

const pricingTiers: PricingTier[] = [
  {
    id: "wp-repair",
    name: "Azonnali Hibaelhárítás & Mentés",
    description: "Egyszeri gyorssegély, ha a weboldalad leállt, hibaüzenetet dob, vagy feltörték és vírusossá vált.",
    features: [
      "Kritikus hibák (White Screen of Death, 500 error) gyors feltárása",
      "Kártevő- és malware-eltávolítás, tiszta mentés visszaállítása",
      "Összeakadó, hibás pluginek cseréje vagy kompatibilitási javítása",
      "Adatbázis-javítás és sérült fájlok helyreállítása",
      "Részletes jegyzőkönyv az elvégzett javításokról"
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=wordpress-repair",
  },
  {
    id: "wp-care-pro",
    name: "Havi Prémium Karbantartás",
    description: "Folyamatos biztonság és felügyelet, hogy a weboldalad sose álljon le és mindig a legfrissebb maradjon.",
    features: [
      "Heti szintű tesztelt mag- és bővítményfrissítések (staging teszttel)",
      "Napi automatikus külső felhős biztonsági mentés (off-site backup)",
      "24/7 Uptime monitorozás és azonnali beavatkozás leálláskor",
      "Folyamatos tűzfal- és biztonsági felügyelet",
      "Havi 2 óra dedikált fejlesztői idő tartalmi vagy technikai módosításokra",
      "Havi részletes technikai és látogatottsági jelentés"
    ],
    highlighted: true,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=wordpress-care-pro",
  },
  {
    id: "wp-care-ecommerce",
    name: "Webshop & Kiemelt Rendszerfelügyelet",
    description: "Nagy forgalmú WooCommerce áruházaknak és üzletileg kritikus platformoknak kiemelt rendelkezésre állással.",
    features: [
      "Minden, ami a Prémium csomagban szerepel",
      "Fizetési kapuk, kosárfolyamat és számlázó integrációk folyamatos tesztelése",
      "Valós idejű óránkénti adatbázis-mentés rendelésvesztés ellen",
      "Kiemelt sürgősségi SLA (garantált 2 órán belüli reagálás)",
      "Havi 4 óra fejlesztői keretidő új funkciók építésére"
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=wordpress-care-ecommerce",
  },
];

const faqs = [
  {
    q: "Mi történik, ha egy frissítés után elromlik a weboldalam?",
    a: "Minden éles frissítés előtt teljes biztonsági mentést készítek, összetettebb rendszereknél pedig staging (teszt) környezetben ellenőrzöm a változásokat. Ha bármilyen plugin összeakadna, azonnal visszaállítom a működő állapotot és kijavítom a forráskódot.",
  },
  {
    q: "Hogyan történik egy feltört weboldal tisztítása és megmentése?",
    a: "Első lépésként izolálom az oldalt a további fertőzések elkerülésére. Kézzel és speciális diagnosztikai eszközökkel eltávolítom a rosszindulatú kódokat, backdoorokat, lecserélem a fertőzött rendszerfájlokat, módosítom az összes titkosítási kulcsot és jelszót, végül keményített biztonsági védelmet állítok fel.",
  },
  {
    q: "Miért van szükség havi karbantartásra, ha jelenleg működik az oldal?",
    a: "A WordPress és a hozzá tartozó bővítmények folyamatosan frissülnek, főként újonnan felfedezett biztonsági rések javítása miatt. Az elhanyagolt, hónapok óta nem frissített oldalak a hackerek legfőbb célpontjai. A megelőző karbantartás töredékébe kerül egy bekövetkezett leállás vagy adatvesztés helyreállításának.",
  },
  {
    q: "Mennyi idő alatt tudod elkezdeni a sürgős hibajavítást?",
    a: "Kritikus leállás vagy feltörés esetén azonnali prioritást biztosítok: az adatok átadását követően néhány órán belül megkezdem a diagnosztikát és a mentést.",
  },
];

export default function WordPressKarbantartasPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WordPress Karbantartás és Hibajavítás",
    provider: {
      "@type": "Person",
      name: "Norbert - WebDude",
      url: "https://webdude.hu",
    },
    description: "Feltört, lassú vagy elavult WordPress weboldalak szakszerű javítása és havi karbantartása. Biztonság, sebesség és nyugalom vállalkozásoknak.",
    serviceType: "WordPress Maintenance and Security",
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
              <Sparkles className="w-3.5 h-3.5 text-[#00B5F1]" />
              Stabilitás, Biztonság & Védelem
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              WordPress karbantartás: hogy a weboldalad <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#a855f7]">sose hagyjon cserben</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
              Egy leálló weboldal bevételkiesést és presztízsveszteséget okoz. Megelőzöm a hibákat, elhárítom a biztonsági réseket, és ha beütött a baj, azonnal helyreállítom a működést.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kapcsolat?service=wordpress-karbantartas"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-cta-from to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-lg shadow-sky-950/50 transition-all duration-300 group"
              >
                Egyedi árajánlat kérése
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#csomagok"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
              >
                Karbantartási csomagok
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points & Problem Solving Bento Grid */}
      <section className="py-24 relative border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              A leggyakoribb WordPress veszélyek, amelyeket elhárítok
            </h2>
            <p className="text-slate-400">
              A legtöbb weboldal-tulajdonos csak akkor kap észbe, amikor a Google tiltólistára teszi a domaint, vagy a vásárlók nem tudnak fizetni.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-500/30 flex items-center justify-center text-red-400 mb-6">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Vírusok & Feltört Oldalak</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Kéretlen átirányítások, spam hivatkozások vagy elérhetetlen adminfelület? Megtisztítom az állományokat és lezárom a biztonsági réseket.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-red-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Teljes kártevőirtás
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Elavult Bővítmények</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A halogatott frissítések inkompatibilitási hibákhoz és sebezhetőségekhez vezetnek. Biztonságos tesztkörnyezetben frissítek mindent.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-sky-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Tesztelt frissítési protokoll
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Adatvesztés Elleni Védelem</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Egy szerverhiba vagy rossz beállítás percek alatt letörölheti az egész weboldaladat. Külső, titkosított szerverre mentek rendszeresen.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-purple-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Napi/heti off-site mentés
              </div>
            </div>

            <div className="md:col-span-2 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1]">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">24/7 Elérhetőség és Uptime Monitorozás</h3>
                  <p className="text-slate-400 text-sm">Azonnal értesülök róla, ha a weboldalad leállna, még mielőtt a vevőid észrevennék.</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Automatizált monitoring rendszerem percenként vizsgálja a weboldalad működését és válaszidejét. Hiba esetén nem kell napokig várnod: proaktívan beavatkozom és helyreállítom a szolgáltatást.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Azonnali SMS/Email riasztás</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>SSL tanúsítvány felügyelet</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sebesség- és válaszidő mérés</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Dedikált Fejlesztői Keret</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Kisebb szöveges vagy vizuális módosítások, új hírlevél feliratkozó, vagy új funkciók? A karbantartás tartalmazza a fejlesztői órákat.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-sky-400 flex items-center gap-1.5 font-semibold">
                <Zap className="w-4 h-4" /> Gyors megvalósítás
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
              Karbantartási Csomagok & Rendszerek
            </h2>
            <p className="text-slate-400">
              Válaszd ki az oldalad méretéhez illeszkedő konstrukciót. Egyedi webshopok és portálok esetén testreszabott üzemeltetési szerződést készítek.
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
              Karbantartási GYIK
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Gyakori kérdések a felügyeletről és hibajavításról
            </h2>
            <p className="text-slate-400">
              Minden, amit a weboldalad biztonságos üzemeltetéséről tudnod kell.
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
            Hiba lépett fel, vagy megbízható karbantartást keresel?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            Írd meg a problémádat vagy az oldalad címét, és gyorsan felmérem a helyzetet!
          </p>
          <Link
            href="/kapcsolat?service=wordpress-karbantartas"
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
