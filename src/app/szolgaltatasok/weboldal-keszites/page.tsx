import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Search, Code, PenTool, ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import PricingTable, { PricingTier } from "@/components/molecules/PricingTable";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Weboldal készítés vállalkozásoknak | WebDude",
  description:
    "Gyors, modern és keresőbarát weboldal készítés kis- és középvállalkozásoknak. Egyedi design, fejlesztés, SEO és személyes kommunikáció a WebDude-tól.",
  keywords:
    "weboldal készítés, prémium weboldal, egyedi weboldal, webfejlesztés, SEO weboldal, KKV weboldal",
  alternates: {
    canonical: "https://webdude.hu/szolgaltatasok/weboldal-keszites",
  },
  openGraph: {
    title: "Weboldal készítés vállalkozásoknak | WebDude",
    description:
      "Gyors, modern és keresőbarát weboldal készítés kis- és középvállalkozásoknak.",
    type: "website",
    locale: "hu_HU",
    siteName: "WebDude",
  },
};

export const revalidate = 3600;

export default function WeboldalKeszitesPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    { name: "Weboldal készítés", url: "/szolgaltatasok/weboldal-keszites" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Weboldal készítés",
    description:
      "Gyors, modern és keresőbarát weboldal készítés kis- és középvállalkozásoknak.",
    provider: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    areaServed: { "@type": "Country", name: "Hungary" },
  };

  const faqs = [
    {
      question: "Mennyi idő alatt készül el egy új weboldal?",
      answer: "A projekt bonyolultságától függően átlagosan 2-4 hét. Ez magában foglalja a tervezést, az egyedi arculat kialakítását, a kódolást és a SEO optimalizálást is.",
    },
    {
      question: "Sablonokat használsz, vagy egyedi fejlesztést?",
      answer: "Kizárólag egyedi tervezésű és fejlesztésű (Next.js vagy prémium WordPress) oldalakat adok át. Sablonok helyett a vállalkozásod céljaihoz igazított, tiszta kódú megoldásokat alkalmazok.",
    },
    {
      question: "Később tudom én is szerkeszteni a tartalmat?",
      answer: "Igen. Ha WordPress alapú az oldal, akkor egy rendkívül könnyen kezelhető admin felületet kapsz. Ha Next.js / headless CMS (pl. Sanity) alapú, akkor is egy intuitív szerkesztőt adok át betanítással.",
    },
    {
      question: "Mobilon is jól fog kinézni?",
      answer: "Természetesen. Minden általam fejlesztett oldal reszponzív ('Mobile-First'), tehát telefonon, tableten és asztali gépen is tökéletes felhasználói élményt nyújt.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const tiers: PricingTier[] = [
    {
      id: "bemutatkozo",
      name: "Bemutatkozó / Landing",
      description: "Egyoldalas (One-pager) vagy kisebb bemutatkozó weboldal vállalkozásoknak, profi megjelenéssel és SEO alapokkal.",
      features: [
        "Egyedi, letisztult dizájn",
        "Mobilbarát (reszponzív) kialakítás",
        "Alap SEO beállítások (meta, sitemap)",
        "Kapcsolati űrlap és GDPR",
        "Rendkívül gyors betöltődés",
        "Képek és tartalom optimalizálása"
      ],
      highlighted: false,
      ctaText: "Egyedi árajánlat kérése",
      ctaLink: "/kapcsolat"
    },
    {
      id: "vallalati",
      name: "Vállalati Weboldal",
      description: "Több aloldalas, kiterjedt céges weboldal egyedi funkciókkal és komplex menürendszerrel.",
      features: [
        "Minden a Bemutatkozó csomagból",
        "Több egyedi aloldal (pl. Szolgáltatások, Rólunk)",
        "Dinamikus tartalom (Blog / Hírek modul)",
        "Haladó SEO és sebességoptimalizálás",
        "Könnyen kezelhető CMS rendszer",
        "Adminisztrátori betanítás"
      ],
      highlighted: true,
      ctaText: "Egyedi árajánlat kérése",
      ctaLink: "/kapcsolat"
    },
    {
      id: "premium",
      name: "Prémium (Next.js / React)",
      description: "A legmagasabb szintű teljesítmény és technológia. Villámgyors betöltődés és korlátlan skálázhatóság.",
      features: [
        "Minden a Vállalati csomagból",
        "Next.js 16 / React 19 architektúra",
        "Tökéletes Core Web Vitals (99+ pont)",
        "Headless CMS integráció",
        "Luminous glassmorphism dizájn elemek",
        "Maximális konverzió és biztonság"
      ],
      highlighted: false,
      ctaText: "Egyedi árajánlat kérése",
      ctaLink: "/kapcsolat"
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="bg-slate-950 text-text-primary relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-[#5B21B6]/5" />
        
        <div className="relative z-10">
          <Hero
            label="Weboldal Készítés"
            title={
              <>
                Weboldal készítés, ami{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
                  ügyfeleket hoz
                </span>
              </>
            }
            subtitle="Olyan weboldalt készítek, amely nemcsak bemutatja a vállalkozásodat, hanem segít érdeklődőket szerezni, bizalmat építeni és ajánlatkéréseket generálni."
            cta1="Egyedi árajánlat kérése"
            cta1Link="/kapcsolat"
            cta2="Munkák megtekintése"
            cta2Link="/munkak"
            fullHeight={false}
          />
        </div>

        {/* ── E-E-A-T Bento Grid ── */}
        <section className="py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Miért válassz engem a fejlesztéshez?
              </h2>
              <p className="text-slate-400 text-lg">
                26 év grafikai és 16 év webfejlesztői tapasztalat (Balog Norbert). Kód, design és marketing egy kézben.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#00B5F1]/50 transition-all duration-300">
                <Code className="w-10 h-10 text-[#00B5F1] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Tiszta, modern kód</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Semmi felesleges bloatware. Next.js 16 vagy optimalizált WordPress alapokon dolgozom, biztosítva a gyorsaságot és a jövőállóságot.
                </p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#5B21B6]/80 transition-all duration-300">
                <PenTool className="w-10 h-10 text-[#00B5F1] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Saját tervezésű UI/UX</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Nincsenek tucat-sablonok. A 26 éves vizuális múlttal minden weboldal pixelpontos, márkahű és konverzióra optimalizált designt kap.
                </p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#00B5F1]/50 transition-all duration-300">
                <Search className="w-10 h-10 text-[#00B5F1] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Beépített SEO (AEO)</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Az oldal már az első naptól kezdve keresőbarát. Strukturált adatok (JSON-LD), gyors betöltődés és technikai SEO az alapcsomag része.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Csomagok (Zéró Fix Ár) ── */}
        <section className="py-24 bg-slate-900/40 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Webfejlesztési Csomagok
              </h2>
              <p className="text-slate-400 text-lg">
                Válassz a vállalkozásod méretéhez és céljaihoz illeszkedő funkciócsomagok közül. Minden projekt egyedi, így az árazás is testreszabott.
              </p>
            </div>
            
            <PricingTable tiers={tiers} />
          </div>
        </section>

        {/* ── Mikro-GYIK (AEO) ── */}
        <section className="py-24 border-t border-slate-800 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Gyakori kérdések (Gyors válaszok)</h2>
              <p className="text-slate-400">Amiket a leggyakrabban kérdeznek tőlem a weboldalkészítés kapcsán.</p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-[#00B5F1]/30 transition-colors">
                  <h3 className="text-lg font-semibold text-[#00B5F1] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-32 text-center relative z-10">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Indítsuk el az <span className="text-[#00B5F1] italic">új weboldaladat!</span>
            </h2>
            <p className="text-slate-400 mb-10 text-lg">
              Minden projekt egy ingyenes, kötelezettségmentes konzultációval kezdődik, ahol megbeszéljük a részleteket.
            </p>
            <Link
              href="/kapcsolat"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-slate-950 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] hover:shadow-[0_8px_32px_rgba(0,181,241,0.35)] hover:scale-105 transition-all duration-300"
            >
              Egyedi árajánlat kérése <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
