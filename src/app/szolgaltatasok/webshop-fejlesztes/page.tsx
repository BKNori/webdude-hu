import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ShoppingCart, Zap, CreditCard, ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import PricingTable, { PricingTier } from "@/components/molecules/PricingTable";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Webshop készítés és WooCommerce fejlesztés | WebDude",
  description:
    "Webshop készítés, WooCommerce fejlesztés és konverzióoptimalizálás. Vásárlóbarát, gyors és keresőbarát online értékesítési rendszer.",
  keywords:
    "webshop készítés, WooCommerce fejlesztés, webáruház készítés, e-kereskedelem, online bolt, webshop optimalizálás",
  alternates: {
    canonical: "https://webdude.hu/szolgaltatasok/webshop-fejlesztes",
  },
  openGraph: {
    title: "Webshop készítés és WooCommerce fejlesztés | WebDude",
    description:
      "Vásárlóbarát, gyors és keresőbarát online értékesítési rendszer kis- és középvállalkozásoknak.",
    type: "website",
    locale: "hu_HU",
    siteName: "WebDude",
  },
};

export const revalidate = 3600;

export default function WebshopDevPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
    { name: "Webshop fejlesztés", url: "/szolgaltatasok/webshop-fejlesztes" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Webshop készítés és fejlesztés",
    description:
      "Webshop készítés, WooCommerce fejlesztés és konverzióoptimalizálás. Vásárlóbarát, gyors és keresőbarát online értékesítési rendszer.",
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
      question: "Miért a WooCommerce rendszert javaslod a legtöbb esetben?",
      answer: "A WooCommerce a WordPress legnépszerűbb webshop bővítménye. Költséghatékony, korlátlanul skálázható (nincs havidíj a termékek száma után), és gyakorlatilag minden magyar fizetési (SimplePay, Barion) és szállítási (FoxPost, GLS) szolgáltatóhoz létezik már kész integrációja.",
    },
    {
      question: "Meglévő webshopot is tudsz optimalizálni / gyorsítani?",
      answer: "Igen. Ha már van egy lassan működő webshopod, vállalom a technikai auditját, a képek és adatbázis optimalizálását, valamint a pénztár (checkout) folyamat konverzió-fókuszú átszabását.",
    },
    {
      question: "Tudok majd kuponokat, akciókat és hírleveleket kezelni?",
      answer: "Természetesen. A fejlesztett webshopok tartalmazzák a fejlett marketing modulokat: kuponok, villámakciók (flash sales), elhagyott kosár emlékeztetők, és hírlevél feliratkozó (pl. MailerLite, MailChimp) integrációkat.",
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
      id: "shop-start",
      name: "Start Webshop",
      description: "Tökéletes induló e-kereskedőknek. Könnyen kezelhető rendszer, azonnali értékesítési lehetőséggel.",
      features: [
        "Egyedi, letisztult dizájn",
        "Mobilbarát (reszponzív) vásárlási élmény",
        "WooCommerce alapok + Magyar lokalizáció",
        "Bankkártyás fizetés (Barion / SimplePay)",
        "Alapvető szállítási módok integrálása",
        "Max 100 termék feltöltésének előkészítése"
      ],
      highlighted: false,
      ctaText: "Egyedi árajánlat kérése",
      ctaLink: "/kapcsolat"
    },
    {
      id: "shop-pro",
      name: "Pro Webshop",
      description: "Stabil, magas forgalmú áruházaknak, haladó marketing eszközökkel és automatizációval.",
      features: [
        "Minden a Start csomagból",
        "Fejlett szűrési és keresési (AJAX) modul",
        "Elhagyott kosár megmentése (automatizmus)",
        "Hírlevél és CRM integráció (pl. MailerLite)",
        "Haladó SEO (termék és kategória szinten)",
        "Sebességoptimalizálás (caching, képek)"
      ],
      highlighted: true,
      ctaText: "Egyedi árajánlat kérése",
      ctaLink: "/kapcsolat"
    },
    {
      id: "shop-custom",
      name: "Egyedi / Headless",
      description: "Next.js frontend + Shopify vagy WooCommerce backend a kompromisszummentes sebességért.",
      features: [
        "Minden a Pro csomagból",
        "Villámgyors Next.js + React 19 Frontend",
        "Extrém egyedi animációk és UI",
        "Korlátlan skálázhatóság (több ezer termék)",
        "Egyedi API-k és ERP (számlázó) szinkronizáció",
        "Tökéletes Core Web Vitals eredmény"
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
            label="Webshop Fejlesztés"
            title={
              <>
                Webshop készítés, ami{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
                  ténylegesen elad
                </span>
              </>
            }
            subtitle="Olyan webshopot építek, ami gyors, biztonságos, könnyen kezelhető, és a maximális vásárlási élményre fókuszál."
            cta1="Egyedi árajánlat kérése"
            cta1Link="/kapcsolat"
            cta2="Referenciák"
            cta2Link="/munkak"
            fullHeight={false}
          />
        </div>

        {/* ── Miért kulcsfontosságú a profi webshop? ── */}
        <section className="py-24 relative z-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Nem elég felrakni a termékeket
              </h2>
              <p className="text-slate-400 text-lg">
                A vásárlók 53%-a elhagyja az oldalt, ha az 3 másodpercnél lassabban tölt be. A bizalom és a sebesség kritikus. Ezt nyújtom:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#00B5F1]/50 transition-all duration-300">
                <ShoppingCart className="w-10 h-10 text-[#00B5F1] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Zökkenőmentes Pénztár</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  A checkout folyamatot a lehető legrövidebbre és legegyszerűbbre szabom (egyoldalas pénztár), hogy minimalizáljuk a kosárelhagyások számát.
                </p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#5B21B6]/80 transition-all duration-300">
                <Zap className="w-10 h-10 text-[#00B5F1] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Betöltési Sebesség</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Optimalizált adatbázis lekérdezések, modern képformátumok (WebP), és szerverszintű gyorsítótárazás a villámgyors termékböngészésért.
                </p>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-[#00B5F1]/50 transition-all duration-300">
                <CreditCard className="w-10 h-10 text-[#00B5F1] mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">Biztonság & Fizetés</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Teljes SSL támogatás, sebezhetőség elleni védelem és stabil bankkártyás (SimplePay, Stripe, Barion) infrastruktúra, hogy a vevők bízzanak benned.
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
                Webshop Funkciócsomagok
              </h2>
              <p className="text-slate-400 text-lg">
                Találd meg a készletszámodhoz és marketing terveidhez leginkább illő funkcionalitást.
              </p>
            </div>
            
            <PricingTable tiers={tiers} />
          </div>
        </section>

        {/* ── Mikro-GYIK (AEO) ── */}
        <section className="py-24 border-t border-slate-800 relative z-10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">E-kereskedelmi GYIK</h2>
              <p className="text-slate-400">A webáruház készítéssel kapcsolatos leggyakoribb kérdések.</p>
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
              Ideje növelni a <span className="text-[#00B5F1] italic">bevételedet!</span>
            </h2>
            <p className="text-slate-400 mb-10 text-lg">
              Kérj árajánlatot, és tervezzük meg együtt a piacvezető e-kereskedelmi rendszeredet.
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
