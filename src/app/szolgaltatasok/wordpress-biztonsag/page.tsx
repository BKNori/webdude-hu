import type { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Lock, 
  HelpCircle,
  Sparkles,
  Search,
  FileCode,
  Flame,
  ShieldCheck
} from "lucide-react";
import PricingTable, { type PricingTier } from "@/components/molecules/PricingTable";

export const metadata: Metadata = {
  title: "Feltört WordPress Helyreállítás és Biztonság | WebDude",
  description: "Feltörték a weboldalad? Ne ess pánikba! Azonnali WordPress vírusirtás, helyreállítás, és megelőző biztonsági beállítások vállalkozásoknak.",
  openGraph: {
    title: "Feltört WordPress Helyreállítás és Biztonság | WebDude",
    description: "Feltörték a weboldalad? Ne ess pánikba! Azonnali WordPress vírusirtás, helyreállítás, és megelőző biztonsági beállítások vállalkozásoknak.",
    url: "https://webdude.hu/szolgaltatasok/wordpress-biztonsag",
    type: "website",
  },
};

const pricingTiers: PricingTier[] = [
  {
    id: "sec-emergency",
    name: "Sürgősségi Vírusirtás & Mentés",
    description: "Azonnali beavatkozás, ha a weboldaladat feltörték, spammel árasztották el, vagy a Google feketelistára tette.",
    features: [
      "Kártevők, malware-ek, rejtett backdoorok teljeskörű eltávolítása",
      "Fertőzött WordPress mag- és bővítményfájlok steril cseréje",
      "Adatbázis-tisztítás és rosszindulatú admin-fiókok törlése",
      "Google De-Blacklist kérelmezése (feketelista-eltávolítás)",
      "Minden biztonsági kulcs, só (salt) és jelszó lecserélése"
    ],
    highlighted: false,
    ctaText: "Azonnali segítség kérése",
    ctaLink: "/kapcsolat?service=sec-emergency",
  },
  {
    id: "sec-hardening",
    name: "Komplett Rendszerkeményítés",
    description: "Megelőző védelem működő oldalaknak: zárjuk le a réseket, mielőtt a hackerek találnák meg őket.",
    features: [
      "Minden, ami a Vírusirtás csomagban szerepel",
      "Alapértelmezett wp-login és admin útvonalak maszkolása",
      "Kétfaktoros hitelesítés (2FA) és Brute-Force támadás elleni védelem",
      "Fájlszerkesztés letiltása a vezérlőpulton és XML-RPC lekapcsolása",
      "Alkalmazás szintű webes tűzfal (WAF) konfigurálása",
      "Biztonsági audit jegyzőkönyv és tanácsadás"
    ],
    highlighted: true,
    ctaText: "Projektfelmérés kérése",
    ctaLink: "/kapcsolat?service=sec-hardening",
  },
  {
    id: "sec-continuous",
    name: "Folyamatos Védelmi Pajzs",
    description: "Teljes nyugalmat biztosító havi biztonsági felügyelet üzletileg kritikus platformoknak és webshopoknak.",
    features: [
      "24/7 valós idejű integritás- és fájlváltozás-ellenőrzés",
      "Napi külső titkosított biztonsági mentés (off-site backup)",
      "Proaktív sebezhetőség-figyelés a használt bővítményekhez",
      "Azonnali beavatkozás és prioritásos helyreállítási garancia",
      "Havi biztonsági jelentés a blokkolt támadási kísérletekről"
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=sec-continuous",
  },
];

const faqs = [
  {
    q: "Honnan tudom biztosan, hogy feltörték a weboldalamat?",
    a: "Gyakori intő jelek: a Google piros biztonsági figyelmeztetést mutat a találatokban (&quot;Ez a webhely feltört lehet&quot;), az oldal furcsa külföldi vagy felnőtt tartalmú oldalakra irányít át, ismeretlen adminisztrátori fiókok jelennek meg, a szerver e-mailjei spam mappába kerülnek, vagy hirtelen megugrik a szerver terheltsége.",
  },
  {
    q: "Eltűnnek a tartalmaim és cikkeim a vírusirtás során?",
    a: "Nem! A helyreállítás során a cél az adatbázisban lévő bejegyzések, termékek és médiaállományok maximális megőrzése. A fertőzött programkódokat kigyomláljuk és az eredeti, érintetlen forrásfájlokkal pótoljuk, így a tartalmad sértetlen marad.",
  },
  {
    q: "Hogyan kerülhetem el, hogy újra feltörjék az oldalamat?",
    a: "A kártevők egyszerű letörlése nem elég: fel kell deríteni és be kell zárni a behatolási kaput (backdoor). A biztonsági keményítés során lezárjuk az elavult API-kat, tűzfalat húzunk fel, letiltjuk a veszélyes fájlfuttatásokat és kötelezővé tesszük az erős védelmi szabályokat.",
  },
  {
    q: "Mennyi idő alatt tisztítható meg egy fertőzött WordPress honlap?",
    a: "A sürgősségi eseteket kiemelt prioritással kezelem: a hozzáférések átadását követően néhány órán belül megkezdődik a diagnosztika és a fertőzött kódok semlegesítése. A teljes tisztítás és hardening rendszerint 24 órán belül lezárul.",
  },
];

export default function WordPressBiztonsagPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WordPress Biztonság és Vírusirtás",
    provider: {
      "@type": "Person",
      name: "Norbert - WebDude",
      url: "https://webdude.hu",
    },
    description: "Feltörték a weboldalad? Ne ess pánikba! Azonnali WordPress vírusirtás, helyreállítás, és megelőző biztonsági beállítások vállalkozásoknak.",
    serviceType: "WordPress Security and Malware Removal",
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-medium uppercase tracking-wider mb-6">
              <Flame className="w-3.5 h-3.5 text-red-400" />
              Azonnali Vírusirtás & Sebezhetőség Zárás
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Feltört WordPress weboldal helyreállítása és <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#a855f7]">maximális biztonság</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
              A feltört weboldal azonnali presztízs- és bevételkiesést okoz, a Google pedig napokon belül kitilthatja a keresőből. Ne ess pánikba: kigyomlálom a kártevőket, helyreállítom a működést, és nepátható védelmi pajzsot építek a honlapod köré.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kapcsolat?service=sec-emergency"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-cta-from to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-lg shadow-sky-950/50 transition-all duration-300 group"
              >
                Azonnali segítség kérése
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#csomagok"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
              >
                Biztonsági csomagok
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Security Pillars Bento Grid */}
      <section className="py-24 relative border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Miért nem elég egy egyszerű vírusirtó plugin letöltése?
            </h2>
            <p className="text-slate-400">
              Az ingyenes bővítmények gyakran átlépnek a mélyen elrejtett backdoorokon és nem javítják meg a sérült fájlokat. A profi biztonság kézi kódvizsgálatot igényel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-500/30 flex items-center justify-center text-red-400 mb-6">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Rejtett Backdoorok Irtása</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A hackerek hátsó ajtókat hagynak a fájlrendszerben, hogy hetekkel később újra feltörhessék az oldalt. Minden gyanús kódrészletet felderítek és törlök.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-red-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> 100%-os kódfertőtlenítés
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Rendszerkeményítés (Hardening)</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  wp-config védelme, .htaccess szabályok szigorítása, fájlfuttatási tiltások a feltöltési könyvtárakban és brute-force elleni korlátozás.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-sky-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Behatolásvédelem
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Google Feketelista Feloldás</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Ha a Google vagy a vírusirtók megjelölték az oldaladat, hivatalos felülvizsgálati kérelmet nyújtok be a tiszta állapot bizonyításával.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-purple-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Piros figyelmeztetés törlése
              </div>
            </div>

            <div className="md:col-span-2 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1]">
                  <FileCode className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Biztonságos Adatbázis- és Fájlhelyreállítás</h3>
                  <p className="text-slate-400 text-sm">Adatvesztés nélküli helyreállítási folyamat tiszta forrásokból.</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Soha nem írom felül felelőtlenül az adataidat. Először teljes nyers mentést készítek a jelenlegi állapotról, majd izolált környezetben analizálom az adatbázist és a kódokat, hogy egyetlen megrendelés vagy blogbejegyzés se vesszen kárba.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Nulla adatvesztés</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kódintegritás ellenőrzés</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Új jelszavak & sók</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Megelőzés: Olcsóbb mint a Kár</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A proaktív biztonsági beállítások töredékébe kerülnek annak, mint amikor napokig áll az üzleted egy zsarolóvírus miatt.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-emerald-400 flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-4 h-4" /> Hosszú távú nyugalom
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
              Biztonsági Szintek & Beavatkozások
            </h2>
            <p className="text-slate-400">
              Válaszd az akut vészhelyzet elhárítását vagy az előrelátó, megelőző védelmi felügyeletet.
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
              Biztonsági GYIK
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Gyakori kérdések a feltört oldalakról és vírusirtásról
            </h2>
            <p className="text-slate-400">
              Minden lényeges információ a helyreállításról és a megelőzésről.
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
            Feltörték a weboldalad, vagy védelemre van szükséged?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            Írj azonnal, add meg a címet, és gyorsan megkezdem a diagnosztikát és a védelmet!
          </p>
          <Link
            href="/kapcsolat?service=sec-emergency"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-cta-from to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-xl shadow-sky-950/60 transition-all duration-300 group"
          >
            Azonnali segítség kérése
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
