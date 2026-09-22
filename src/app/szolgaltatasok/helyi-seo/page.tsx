import type { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Search, 
  HelpCircle,
  Sparkles,
  Compass,
  Building2,
  Navigation,
  Star
} from "lucide-react";
import PricingTable, { type PricingTier } from "@/components/molecules/PricingTable";

export const metadata: Metadata = {
  title: "Helyi SEO Szakember | Kerülj a Google Térkép Élérére | WebDude",
  description: "Helyi SEO szolgáltatás helyhez kötött vállalkozásoknak. Kerülj a Google Térkép és a helyi találatok élére, és szerezz több környékbeli ügyfelet.",
  openGraph: {
    title: "Helyi SEO Szakember | Kerülj a Google Térkép Élérére | WebDude",
    description: "Helyi SEO szolgáltatás helyhez kötött vállalkozásoknak. Kerülj a Google Térkép és a helyi találatok élére, és szerezz több környékbeli ügyfelet.",
    url: "https://webdude.hu/szolgaltatasok/helyi-seo",
    type: "website",
  },
};

const pricingTiers: PricingTier[] = [
  {
    id: "local-seo-starter",
    name: "Helyi Alapcsomag & Cégprofil",
    description: "Fizikai üzleteknek, rendelőknek és helyi szakembereknek a Google Térkép láthatóság megalapozásához.",
    features: [
      "Google Cégprofil (Google Business Profile) audit és teljes optimalizálás",
      "NAP konzisztencia ellenőrzése (Név, Cím, Telefonszám egységesség)",
      "Elsődleges kategóriák, nyitvatartások és szolgáltatások pontos beállítása",
      "LocalBusiness strukturált adatok (Schema.org) implementálása a honlapon",
      "Útmutató a vásárlói értékelések (Google Reviews) gyűjtéséhez"
    ],
    highlighted: false,
    ctaText: "Projektfelmérés kérése",
    ctaLink: "/kapcsolat?service=local-seo-starter",
  },
  {
    id: "local-seo-pro",
    name: "Helyi Dominancia Csomag",
    description: "Versenytársakat megelőző lokális jelenlét célzott városi és környékbeli landing oldalakkal.",
    features: [
      "Minden, ami az Alapcsomagban szerepel",
      "Helyi kulcsszókutatás és &quot;közelemben&quot; keresési szándék elemzés",
      "Városi / kerületi céloldalak (Local Landing Pages) tervezése és kódolása",
      "Lokális hivatkozásépítés (magyar szaknévsorok és helyi katalógusok)",
      "Google Térkép beágyazás és geokoordináták mikroformátumú bekötése",
      "Havi helyezéskövetés a helyi 3-as térképes csomagban (Local Map Pack)"
    ],
    highlighted: true,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=local-seo-pro",
  },
  {
    id: "local-seo-multi",
    name: "Több Telephelyes Vállalati SEO",
    description: "Hálózatoknak, franchise rendszereknek és több fiókkal rendelkező vállalkozásoknak.",
    features: [
      "Több telephely szinkronizált profilkezelése és auditja",
      "Központi és telephely-specifikus aloldal-architektúra kialakítása",
      "Fejlett értékelés- és hírnévmenedzsment stratégia",
      "Versenytársak helyi térkép-auditja városról városra",
      "Kiemelt havi riportálás és dedikált szakértői támogatás"
    ],
    highlighted: false,
    ctaText: "Egyedi árajánlat kérése",
    ctaLink: "/kapcsolat?service=local-seo-multi",
  },
];

const faqs = [
  {
    q: "Miért fontosabb a helyi SEO, mint az általános országos keresőoptimalizálás?",
    a: "Amikor a felhasználók szolgáltatót keresnek (pl. &quot;fogorvos&quot;, &quot;autószerviz&quot;, vagy &quot;könyvelő Kecskemét&quot;), a Google közvetlenül a térképes találati dobozt (Local Map Pack) helyezi az első helyre. Ha itt szerepelsz a top 3-ban, a helyi érdeklődők döntő többsége azonnal téged hív fel.",
  },
  {
    q: "Mit jelent a NAP konzisztencia és miért büntet a Google az eltérésért?",
    a: "A NAP a Name, Address, Phone (Név, Cím, Telefonszám) rövidítése. Ha a céged adatai különböző címeken vagy telefonszámokon szerepelnek a weboldaladon, a Facebookon vagy az online cégjegyzékekben, a Google algoritmusai bizonytalanná válnak a megbízhatóságodban, és hátrébb sorolnak.",
  },
  {
    q: "Mennyi idő alatt láthatók az eredmények a Google Térképen?",
    a: "A profil optimalizálása, a NAP adatok tisztítása és a strukturált adatok beépítése után az első pozitív elmozdulások általában 3–6 héten belül megmutatkoznak, a tartós top 3-as jelenléthez pedig folyamatos értékelésgyűjtés és lokális tartalom szükséges.",
  },
  {
    q: "Honlap nélkül is működhet a Google Cégprofilom?",
    a: "Igen, a cégprofil létezhet önmagában is, de a legerősebb rangsorolást akkor éred el, ha a profilod egy profi, gyors, helyi SEO-ra optimalizált weboldalhoz kapcsolódik LocalBusiness sémával megerősítve.",
  },
];

export default function HelyiSeoPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Helyi SEO (Local SEO)",
    provider: {
      "@type": "Person",
      name: "Norbert - WebDude",
      url: "https://webdude.hu",
    },
    description: "Helyi SEO szolgáltatás helyhez kötött vállalkozásoknak. Kerülj a Google Térkép és a helyi találatok élére, és szerezz több környékbeli ügyfelet.",
    serviceType: "Local SEO and Google Business Profile Optimization",
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
              <MapPin className="w-3.5 h-3.5 text-[#00B5F1]" />
              Google Térkép & Helyi Keresések
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Helyi SEO: Urald a Google keresőt a <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#a855f7]">saját városodban</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
              A környékbeli vásárlók naponta több ezer alkalommal keresnek szolgáltatásokat közvetlenül a közelükben. Ha nem jelensz meg a Google Térkép első 3 helyén, a konkurensed kapja a hívásokat és az üzletet. Tegyük láthatóvá a cégedet ott, ahol a döntések születnek!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kapcsolat?service=helyi-seo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-cta-from to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-lg shadow-sky-950/50 transition-all duration-300 group"
              >
                Egyedi árajánlat kérése
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#csomagok"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
              >
                Helyi SEO csomagok
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Pillars Bento Grid */}
      <section className="py-24 relative border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Hogyan juttatom a cégedet a helyi találatok élére?
            </h2>
            <p className="text-slate-400">
              A Google algoritmusai a relevanciát, a földrajzi távolságot és a hitelességet mérik. Ezt a három pillért optimalizáljuk tökéletesre.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                  <Navigation className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Google Cégprofil Optimalizálás</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Kategóriák, nyitvatartás, fotók, termékek és bejegyzések profi felépítése a maximális térképes pontszámért.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-sky-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Top 3 Map Pack fókusz
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">NAP Konzisztencia & Idézések</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A cégnév, cím és telefonszám egységesítése minden internetes adatbázisban, hogy a Google megbízzon a telephelyedben.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-purple-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Hibátlan adategységesség
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Helyi Landing Oldalak</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Célzott városi vagy kerületi aloldalak létrehozása a honlapodon helyi kulcsszavakkal és egyedi tartalommal.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-sky-400 flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Regionális dominancia
              </div>
            </div>

            <div className="md:col-span-2 p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1]">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">LocalBusiness Strukturált Adatok (Schema)</h3>
                  <p className="text-slate-400 text-sm">Géppel olvasható geokoordináták és adatok a keresőrobotoknak.</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                A weboldalad kódjába beépítjük a hivatalos Schema.org LocalBusiness jelölést szélességi és hosszúsági koordinátákkal, nyitvatartási adatokkal és a kiszolgált területek listájával. Ez egyértelmű jelet küld a Google és az AI keresők felé.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Geo-koordináták</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pontos nyitvatartás</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Google Maps API bekötés</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00B5F1]/50 transition-colors duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Értékelésmenedzsment Stratégia</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A pozitív vásárlói vélemények a helyi rangsorolás legfőbb motorjai. Kialakítjuk az automatikus véleménykérő folyamatot.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-800/80 text-xs text-purple-400 flex items-center gap-1.5 font-semibold">
                <Sparkles className="w-4 h-4" /> 5 csillagos bizalom
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
              Helyi SEO Csomagok & Stratégia
            </h2>
            <p className="text-slate-400">
              Válassz az egy telephelyes induló optimalizálástól a több várost lefedő hálózati dominanciáig.
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
              Helyi SEO GYIK
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Gyakori kérdések a helyi keresőoptimalizálásról
            </h2>
            <p className="text-slate-400">
              Minden lényeges információ a helyi vásárlószerzésről.
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
            Szeretnéd, hogy a helyi ügyfelek téged találjanak meg először?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            Írd meg a vállalkozásod nevét és városát, és megvizsgálom a jelenlegi pozícióidat a Google Térképen!
          </p>
          <Link
            href="/kapcsolat?service=helyi-seo"
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
