import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Search, Code, PenTool, ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Surface from "@/components/atoms/Surface";
import PricingTable, { PricingTier } from "@/components/molecules/PricingTable";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import { serializeJsonLd } from "@/lib/structuredData";

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
    url: "https://webdude.hu/szolgaltatasok/weboldal-keszites",
    type: "website",
    locale: "hu_HU",
    siteName: "WebDude",
    images: [
      {
        url: "https://webdude.hu/og/webdude-og.jpg",
        width: 1200,
        height: 630,
        alt: "WebDude — weboldal készítés vállalkozásoknak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weboldal készítés vállalkozásoknak | WebDude",
    description:
      "Gyors, modern és keresőbarát weboldal készítés kis- és középvállalkozásoknak.",
    images: ["https://webdude.hu/og/webdude-og.jpg"],
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
      "Gyors, modern és keresőbarát weboldal készítés kis- és középvállalkozásoknak országos szolgáltatással.",
    provider: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
    },
    areaServed: { "@type": "Country", name: "Hungary" },
  };

  const faqs = [
    {
      question: "Mennyi idő alatt készül el egy új weboldal?",
      answer:
        "A projekt bonyolultságától és igényeitől függően átlagosan 2–4 hét alatt készül el egy egyedi weboldal. A határidő magában foglalja a koncepció tervezését, az egyedi arculat kialakítását, a fejlesztést (Next.js vagy WordPress), valamint a technikai SEO optimalizálást és a tesztelést is.",
    },
    {
      question: "Sablonokat használsz, vagy egyedi fejlesztést?",
      answer:
        "NEM használok sablonokat. Minden weboldal egyedi tervezésű és egyedi fejlesztésű, Next.js vagy prémium WordPress alapokon. A vállalkozásod konkrét céljaihoz és célcsoportjához igazított, tiszta kódú megoldást adok át, amely skálázható és karbantartható.",
    },
    {
      question: "Később tudom én is szerkeszteni a tartalmat?",
      answer:
        "Igen, teljesen saját tudással tudod szerkeszteni. WordPress esetén egy intuitive admin felületet kapsz, Next.js / headless CMS (pl. Sanity) esetén egy egyszerű szerkesztőt adok át személyes betanítással, így bármikor módosíthatod a szövegeket és képeket.",
    },
    {
      question: "Mobilon is jól fog kinézni?",
      answer:
        "Természetesen, 100% reszponzív lesz a weboldalad. Mobile-First elven fejlesztett, úgy telefonon, tableten és asztali gépen is tökéletes felhasználói élményt nyújt, és a Google is kedveli a mobilbarát oldalat a keresési találatokban.",
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
      description:
        "Egyoldalas (One-pager) vagy kisebb bemutatkozó weboldal vállalkozásoknak, profi megjelenéssel és SEO alapokkal.",
      features: [
        "Egyedi, letisztult dizájn",
        "Mobilbarát (reszponzív) kialakítás",
        "Alap SEO beállítások (meta, sitemap)",
        "Kapcsolati űrlap és GDPR",
        "Rendkívül gyors betöltődés",
        "Képek és tartalom optimalizálása",
      ],
      highlighted: false,
      ctaText: "Egyedi árajánlat kérése",
      ctaLink: "/kapcsolat",
    },
    {
      id: "vallalati",
      name: "Vállalati Weboldal",
      description:
        "Több aloldalas, kiterjedt céges weboldal egyedi funkciókkal és komplex menürendszerrel.",
      features: [
        "Minden a Bemutatkozó csomagból",
        "Több egyedi aloldal (pl. Szolgáltatások, Rólunk)",
        "Dinamikus tartalom (Blog / Hírek modul)",
        "Haladó SEO és sebességoptimalizálás",
        "Könnyen kezelhető CMS rendszer",
        "Adminisztrátori betanítás",
      ],
      highlighted: true,
      ctaText: "Egyedi árajánlat kérése",
      ctaLink: "/kapcsolat",
    },
    {
      id: "premium",
      name: "Prémium (Next.js / React)",
      description:
        "A legmagasabb szintű teljesítmény és technológia. Villámgyors betöltődés és korlátlan skálázhatóság.",
      features: [
        "Minden a Vállalati csomagból",
        "Next.js 16 / React 19 architektúra",
        "Tökéletes Core Web Vitals (99+ pont)",
        "Headless CMS integráció",
        "Luminous glassmorphism dizájn elemek",
        "Maximális konverzió és biztonság",
      ],
      highlighted: false,
      ctaText: "Egyedi árajánlat kérése",
      ctaLink: "/kapcsolat",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(faqSchema),
        }}
      />

      <div className="bg-[#F8FAFC] dark:bg-[#0B1120] text-text-primary relative overflow-hidden min-h-screen">
        <div className="relative z-10">
          <Hero
            backgroundImage="/assets/banners/hero-webfejlesztes.webp"
            label="Weboldal Készítés"
            title={
              <>
                Weboldal készítés, ami{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#5B21B6] dark:from-[#00B5F1] dark:to-[#5B21B6] italic">
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

        {/* Direct Answer Block - AEO optimalizált "Weboldal Készítés Áttekintése" */}
        <Surface tone="night-lift" className="py-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-base md:text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
              <span className="text-[#0369A1] dark:text-[#00B5F1] font-semibold">
                WebDude weboldal készítés:
              </span>{" "}
              Egyedi, reszponzív weboldalak KKV-knak — Next.js, WordPress,
              WooCommerce és egyedi fejlesztés. 26 év tapasztalat, gyors
              betöltés, SEO-optimalizált és konverzió-fókuszú design országos
              szolgáltatással. Egyedi árajánlat kérése az igények alapján.
            </p>
          </div>
        </Surface>

        {/* ── E-E-A-T Bento Grid (Dual Theme) ── */}
        <Surface tone="slate-lift" aurora className="py-24 md:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl text-[#0F172A] dark:text-white mb-4">
                Miért válassz engem a fejlesztéshez?
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-lg">
                26 év grafikai és 16 év webfejlesztői tapasztalat (Balog
                Norbert). Kód, design és marketing egy kézben.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="luminous-card p-8">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-600/25 dark:bg-[#00B5F1]/12 dark:border-[#00B5F1]/25 flex items-center justify-center mb-6">
                  <Code className="w-6 h-6 text-[#0369A1] dark:text-[#00B5F1]" aria-hidden="true" />
                </div>
                <h3 className="text-xl text-[#0F172A] dark:text-white mb-3 tracking-wider">
                  Tiszta, modern kód
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  Semmi felesleges bloatware. Next.js 16 vagy optimalizált
                  WordPress alapokon dolgozom, biztosítva a gyorsaságot és a
                  jövőállóságot.
                </p>
              </div>
              <div className="luminous-card p-8">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-600/25 dark:bg-[#7C3AED]/15 dark:border-[#A78BFA]/30 flex items-center justify-center mb-6">
                  <PenTool
                    className="w-6 h-6 text-[#6D28D9] dark:text-[#A78BFA]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl text-[#0F172A] dark:text-white mb-3 tracking-wider">
                  Saját tervezésű UI/UX
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  Nincsenek tucat-sablonok. A 26 éves vizuális múlttal minden
                  weboldal pixelpontos, márkahű és konverzióra optimalizált
                  designt kap.
                </p>
              </div>
              <div className="luminous-card p-8">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-600/25 dark:bg-[#00B5F1]/12 dark:border-[#00B5F1]/25 flex items-center justify-center mb-6">
                  <Search
                    className="w-6 h-6 text-[#0369A1] dark:text-[#00B5F1]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl text-[#0F172A] dark:text-white mb-3 tracking-wider">
                  Beépített SEO (AEO)
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  Az oldal már az első naptól kezdve keresőbarát. Strukturált
                  adatok (JSON-LD), gyors betöltődés és technikai SEO az
                  alapcsomag része.
                </p>
              </div>
            </div>
          </div>
        </Surface>

        {/* ── Csomagok (Zéró Fix Ár — Dual Theme) ── */}
        <Surface tone="night" aurora className="py-24 md:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl text-[#0F172A] dark:text-white mb-6">
                Webfejlesztési Csomagok
              </h2>
              <p className="text-slate-700 dark:text-slate-300 text-lg">
                Válassz a vállalkozásod méretéhez és céljaihoz illeszkedő
                funkciócsomagok közül. Minden projekt egyedi, így az árazás is
                testreszabott.
              </p>
            </div>

            <PricingTable tiers={tiers} />
          </div>
        </Surface>

        {/* ── Mikro-GYIK (AEO — Dual Theme) ── */}
        <Surface tone="night-lift" aurora className="py-24 md:py-28">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl text-[#0F172A] dark:text-white mb-4">
                Gyakori kérdések (Gyors válaszok)
              </h2>
              <p className="text-slate-700 dark:text-slate-300">
                Amiket a leggyakrabban kérdeznek tőlem a weboldalkészítés
                kapcsán.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="luminous-card p-6 md:p-8">
                  <h3 className="text-lg md:text-xl font-semibold text-[#0369A1] dark:text-[#00B5F1] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Surface>

        {/* ── CTA (Elevated Dual Theme — AAA kontraszt) ── */}
        <Surface tone="slate-lift" aurora className="py-24 md:py-28 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl text-[#0F172A] dark:text-white mb-6">
              Indítsd el az{" "}
              <span className="text-[#0369A1] dark:text-brand-primary italic">
                új weboldaladat!
              </span>
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-10 text-lg">
              Minden projekt egy ingyenes, kötelezettségmentes konzultációval
              kezdődik, ahol megbeszéljük a részleteket.
            </p>
            <Link
              href="/kapcsolat"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold uppercase tracking-wider text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] shadow-[0_8px_28px_rgba(7,89,133,0.4)] hover:scale-[1.03] transition-[transform,box-shadow,background-color] duration-300"
            >
              Egyedi árajánlat kérése <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </Surface>
      </div>
    </>
  );
}
