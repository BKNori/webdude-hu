import React from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import Surface from "@/components/atoms/Surface";
import ServiceCard from "@/components/molecules/ServiceCard";
import { Metadata } from "next";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/breadcrumb";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import { CANONICAL_PERSON_ENTITY, serializeJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Szolgáltatások – WebDude | Weboldal Készítés, SEO, AI Automatizáció",
  description:
    "Egyedi weboldal készítés, technikai SEO optimalizálás, AI automatizáció és grafikai tervezés KKV-knak. 26 év tapasztalat, egyedi árajánlat országosan.",
  keywords:
    "weboldal készítés, SEO optimalizálás, AI automatizáció, grafikai tervezés, WordPress fejlesztés, webshop készítés, marketing lead generálás, KKV digitális megoldások",
  alternates: {
    canonical: "https://webdude.hu/szolgaltatasok",
  },
  openGraph: {
    title:
      "Szolgáltatások – WebDude | Weboldal Készítés, SEO, AI Automatizáció",
    description:
      "26 év tapasztalattal: egyedi weboldal készítés, SEO optimalizálás, AI automatizáció és grafikai tervezés KKV-knak. Ingyenes konzultáció.",
    url: "https://webdude.hu/szolgaltatasok",
    type: "website",
    locale: "hu_HU",
    siteName: "WebDude",
    images: [
      {
        url: "/assets/banners/szeged-terkozeves.webp",
        width: 1920,
        height: 1080,
        alt: "WebDude Szolgáltatások",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Szolgáltatások – WebDude | Weboldal Készítés, SEO, AI Automatizáció",
    description:
      "26 év tapasztalattal: egyedi weboldal készítés, SEO optimalizálás, AI automatizáció és grafikai tervezés KKV-knak.",
    images: ["/assets/banners/szeged-terkozeves.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function ServicesPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Főoldal", url: "/" },
    { name: "Szolgáltatások", url: "/szolgaltatasok" },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  // serializeJsonLd SSOT-ból importálva (@/lib/structuredData — K-05 fix)

  const services = [
    {
      title: "Weboldal Készítés",
      icon: "Globe",
      description:
        "KKV-k és magánvállalkozók számára tervezett egyedi weboldalak. WordPress, React, Next.js, Node.js, statikus HTML és landing page fejlesztés. Mobilbarát, SEO-optimalizált és gyors megoldások.",
      tags: [
        "WordPress",
        "React",
        "Next.js",
        "Node.js",
        "HTML",
        "Landing Page",
      ],
      link: "/szolgaltatasok/weboldal-keszites",
    },
    {
      title: "WordPress Webshop",
      icon: "ShoppingCart",
      description:
        "WooCommerce alapú webshopok készítése, amelyek növelik az online eladásokat és egyszerűsítik a vásárlói élményt. Biztonságos fizetési rendszerek és készletkezelés.",
      tags: ["E-commerce", "Sales", "WooCommerce"],
      link: "/szolgaltatasok/woocommerce-webshop-keszites",
    },
    {
      title: "Webshop Fejlesztés",
      icon: "ShoppingBag",
      description:
        "E-kereskedelmi platformok készítése (WooCommerce, Shopify, egyedi), amelyek növelik az online eladásokat. Modern UX, gyors betöltés és konverzió-fókuszú design.",
      tags: ["E-commerce", "Sales", "UX"],
      link: "/szolgaltatasok/webshop-fejlesztes",
    },

    {
      title: "SEO Optimalizálás",
      icon: "Target",
      description:
        "Keresőoptimalizálás és tartalomstratégia, amely növeli a Google helyezéseket és organikus forgalmat. Technikai SEO, on-page SEO és tartalommarketing.",
      tags: ["SEO", "Organikus", "Helyezés"],
      link: "/szolgaltatasok/seo-optimalizalas",
    },
    {
      title: "Marketing Lead Generálás",
      icon: "TrendingUp",
      description:
        "Stratégiai marketing eszközök és landing oldalak, amelyek automatizálják az ügyfélszerzést és növelik a lead-eket. CRO optimalizálás és konverzió növelés.",
      tags: ["Lead Gen", "Landing Page", "Automatizáció"],
      link: "/szolgaltatasok/marketing-lead-generalas",
    },
    {
      title: "Grafikai Tervezés",
      icon: "Palette",
      description:
        "Professzionális grafikai tervezés weboldalakhoz, marketing anyagokhoz és közösségi médiához. Vektoros logók, prospektusok és teljes arculati tervezés.",
      tags: ["Design", "Branding", "Marketing"],
      link: "/szolgaltatasok/grafikai-tervezes",
    },
    {
      title: "Egyedi Arculattervezés",
      icon: "PenTool",
      description:
        "Egyedi arculattervezés és logó tervezés, amelyek erősítik a márka identitást és növelik a felismerhetőséget. Brand guideline dokumentumok és vizuális identitás.",
      tags: ["Branding", "Logó", "Identitás"],
      link: "/szolgaltatasok/egyedi-arculattervezes-logo",
    },
    {
      title: "AI Workflow Kialakítás",
      icon: "Bot",
      description:
        "AI alapú automatizációs rendszerek és workflow kialakítás, amelyek időt és pénzt takarít meg a KKV-knak. ChatGPT és Claude integráció.",
      tags: ["AI", "Automatizáció", "Workflow"],
      link: "/szolgaltatasok/ai-workflow-kialakitas",
    },
    {
      title: "AI Kép- és Videógenerálás",
      icon: "Video",
      description:
        "AI alapú kép- és videógenerálás marketing anyagokhoz, social media tartalmakhoz és weboldalakhoz. Midjourney, DALL-E és Runway ML.",
      tags: ["AI Art", "Generálás", "Marketing"],
      link: "/szolgaltatasok/ai-kep-es-videogeneralas",
    },
    {
      title: "AI Prompt Engineering",
      icon: "Sparkles",
      description:
        "Professzionális prompt engineering szolgáltatás, amely optimalizálja az AI modellek teljesítményét és biztosítja a konzisztens kimeneteket.",
      tags: ["AI", "Prompt", "Optimalizálás"],
      link: "/szolgaltatasok/ai-prompt-engineering",
    },
    {
      title: "Vírusirtás & Biztonság",
      icon: "ShieldAlert",
      description:
        "WordPress vírusirtás, biztonsági mentések és havi karbantartás, hogy a weboldal mindig biztonságos és gyors legyen. SSL tanúsítvány és biztonsági audit.",
      tags: ["Biztonság", "Backup", "Support"],
      link: "/szolgaltatasok/wordpress-biztonsag",
    },
    {
      title: "Rendszerfejlesztés",
      icon: "Code",
      description:
        "Egyedi szoftverfejlesztés és alkalmazásfejlesztés, amelyek megoldják az üzleti problémákat és automatizálják a folyamatokat. Backend, frontend és API integrációk.",
      tags: ["Szoftver", "Backend", "Frontend"],
      link: "/szolgaltatasok/weboldal-keszites",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://webdude.hu/szolgaltatasok#service",
    name: "WebDude Digitális Szolgáltatások",
    description:
      "Egyedi Next.js és WordPress weboldal készítés, technikai SEO/AEO, AI automatizáció és grafikai tervezés KKV-knak — 26 év tervezőgrafikai és 16 év webfejlesztői tapasztalattal, országos online kiszolgálással, egyedi árajánlat alapján.",
    provider: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
    },
    areaServed: { "@type": "Country", name: "Hungary" },
    serviceType: [
      "Weboldal készítés",
      "WordPress fejlesztés",
      "SEO optimalizálás",
      "AI automatizáció",
      "Grafikai tervezés",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digitális Szolgáltatások",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
        position: index + 1,
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Mennyibe kerül egy weboldal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Egyedi árazás a projekt igényei szerint. Ingyenes konzultáció a pontos árhoz.",
        },
      },
      {
        "@type": "Question",
        name: "Mennyi idő alatt készül el?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Egyszerű weboldal: 1-2 hét. Webshop: 2-4 hét. Egyedi projekt: egyedi időzítés. Minden projekt egyedi, de mindig határidőre.",
        },
      },
      {
        "@type": "Question",
        name: "Kell-e havidíjat fizetni?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nem. Kész projekt esetén egyszeri fizetés. Karbantartás és támogatás opcionális havidíjjal. Nincs rejtett költség.",
        },
      },
      {
        "@type": "Question",
        name: "Miért érdemes engem választani?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "26 év tapasztalat, közvetlen kommunikáció (nincs projektmenedzser), egyedi árazás, határidőre kész projektek, 95+ Lighthouse score.",
        },
      },

      {
        "@type": "Question",
        name: "Milyen technológiákat használok?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WordPress, WooCommerce, Next.js, React, Node.js, Firebase. A technológia a projekthez igazodik. Minden projekt modern és biztonságos.",
        },
      },
    ],
  };

  return (
    <div className="bg-bg-base text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(CANONICAL_PERSON_ENTITY) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />
      <Hero
        label="KKV & Marketing Szolgáltatások"
        title={
          <>
            Növelje az{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#0369A1] to-cta-to dark:from-brand-primary dark:to-cta-to italic">
              Ügyfélszerzést
            </span>{" "}
            <br /> Weboldallal és AI-val
          </>
        }
        subtitle="Kis- és középvállalkozások számára tervezett digitális megoldások, amelyek automatizálják a marketinget és növelik a konverziót."
        cta1="Ingyenes konzultáció"
        cta1Link="/kapcsolat"
        cta2="Munkák megtekintése"
        cta2Link="/munkak"
        fullHeight={true}
        backgroundImage="/assets/banners/hero-szolgaltatasok.webp"
      />

      {/* Direct Answer Block - AEO optimalizált "Szolgáltatások Áttekintése" */}
      <Surface tone="night-lift" className="py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-base md:text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
            <span className="text-[#0369A1] dark:text-[#00B5F1] font-semibold">
              WebDude digitális szolgáltatások:
            </span>{" "}
            Egyedi weboldal készítés, grafikai tervezés, AI workflow
            automatizáció, SEO optimalizálás és marketing lead generálás
            KKV-knak. 26 év tapasztalat, Next.js 16, React 19, Tailwind v4,
            Firebase alapú prémium megoldások országos szolgáltatással és online
            kiszolgálással.
          </p>
        </div>
      </Surface>

      {/* Social Proof Section — Dual Theme */}
      <Surface tone="night" aurora className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="luminous-card p-8 group">
              <span className="text-6xl font-heading block mb-3 text-[#0F172A] dark:text-white group-hover:text-[#0369A1] dark:group-hover:text-[#00B5F1] transition-colors tracking-wide">
                26+
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-slate-600 dark:text-slate-300">
                Év Tapasztalat
              </p>
            </div>
            <div className="luminous-card p-8 group">
              <span className="text-6xl font-heading block mb-3 text-[#0F172A] dark:text-white group-hover:text-[#0369A1] dark:group-hover:text-[#00B5F1] transition-colors tracking-wide">
                200+
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-slate-600 dark:text-slate-300">
                Projekt Készítve
              </p>
            </div>
            <div className="luminous-card p-8 group">
              <span className="text-6xl font-heading block mb-3 text-[#0F172A] dark:text-white group-hover:text-[#0369A1] dark:group-hover:text-[#00B5F1] transition-colors tracking-wide">
                500+
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-slate-600 dark:text-slate-300">
                Lead Generált
              </p>
            </div>
            <div className="luminous-card p-8 group">
              <span className="text-6xl font-heading block mb-3 text-[#0F172A] dark:text-white group-hover:text-[#0369A1] dark:group-hover:text-[#00B5F1] transition-colors tracking-wide">
                95+
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-slate-600 dark:text-slate-300">
                Lighthouse Score
              </p>
            </div>
          </div>
        </div>
      </Surface>

      {/* Szolgáltatások Rács — Elevated Dual Theme */}
      <Surface tone="slate-lift" aurora grid className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-600/25 dark:bg-[#00B5F1]/10 dark:border-[#00B5F1]/25 mb-6">
              <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1]">
                Digitális Szolgáltatásaim
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading text-[#0F172A] dark:text-white leading-tight">
              Miben tudok{" "}
              <span className="text-[#0369A1] dark:text-[#00B5F1] italic">segíteni</span>?
            </h2>
            <p className="mt-6 text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-lg leading-relaxed mx-auto font-medium">
              KKV-k és magánvállalkozók számára tervezett szolgáltatások,
              amelyek növelik az ügyfélszerzést, automatizálják a marketinget és
              erősítik a márka jelenlétét.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) =>
              s.link ? (
                <Link key={i} href={s.link} className="block h-full">
                  <ServiceCard {...s} index={i} />
                </Link>
              ) : (
                <ServiceCard key={i} {...s} index={i} />
              )
            )}
          </div>
        </div>
      </Surface>

      {/* Process Section — Dual Theme */}
      <Surface tone="night" aurora className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-600/25 dark:bg-brand-primary/10 dark:border-brand-primary/25 mb-6">
              <span className="eyebrow-badge text-[#0369A1] dark:text-brand-primary">Folyamat</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading text-[#0F172A] dark:text-white leading-tight">
              Hogyan <span className="text-[#0369A1] dark:text-brand-primary italic">dolgozom</span>
              ?
            </h2>
            <p className="mt-6 text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-lg leading-relaxed mx-auto font-medium">
              Átlátható folyamat, eredményorientált megközelítés. Nincs
              projektmenedzser, közvetlen kommunikáció velem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                step: "01",
                title: "Ingyenes Konzultáció",
                description:
                  "Ismerkedünk, megbeszéljük a célokat és a lehetőségeket.",
              },
              {
                step: "02",
                title: "Tervezés & Stratégia",
                description:
                  "Készítek egy részletes tervet, árazást és időzítést.",
              },
              {
                step: "03",
                title: "Fejlesztés & Implementáció",
                description: "Elkezdem a munkát, rendszeres frissítésekkel.",
              },
              {
                step: "04",
                title: "Kézbesítés & Támogatás",
                description:
                  "Átadom a kész projektet, és biztosítom a támogatást.",
              },
            ].map((item, index) => (
              <div key={index} className="luminous-card p-8 group">
                <span className="text-6xl font-heading block mb-4 text-[#0369A1]/45 group-hover:text-[#0369A1] dark:text-brand-primary/40 dark:group-hover:text-brand-primary transition-colors tracking-wide">
                  {item.step}
                </span>
                <h3 className="text-xl text-[#0F172A] dark:text-white mb-3 tracking-wider">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Surface>

      {/* FAQ Section — Dual Theme */}
      <Surface tone="night-lift" aurora className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-600/25 dark:bg-[#00B5F1]/10 dark:border-[#00B5F1]/25 mb-6">
              <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1]">
                Gyakori Kérdések
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading text-[#0F172A] dark:text-white leading-tight">
              Mennyibe kerül{" "}
              <span className="text-[#0369A1] dark:text-[#00B5F1] italic">egy weboldal</span>?
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Mennyibe kerül egy weboldal?",
                answer:
                  "Egyedi árazás a projekt igényei szerint. Ingyenes konzultáció a pontos árhoz.",
              },
              {
                question: "Mennyi idő alatt készül el?",
                answer:
                  "Egyszerű weboldal: 1-2 hét. Webshop: 2-4 hét. Egyedi projekt: egyedi időzítés. Minden projekt egyedi, de mindig határidőre.",
              },
              {
                question: "Kell-e havidíjat fizetni?",
                answer:
                  "Nem. Kész projekt esetén egyszeri fizetés. Karbantartás és támogatás opcionális havidíjjal. Nincs rejtett költség.",
              },
              {
                question: "Miért érdemes engem választani?",
                answer:
                  "26 év tapasztalat, közvetlen kommunikáció (nincs projektmenedzser), egyedi árazás, határidőre kész projektek, 95+ Lighthouse score.",
              },

              {
                question: "Milyen technológiákat használok?",
                answer:
                  "WordPress, WooCommerce, Next.js, React, Node.js, Firebase. A technológia a projekthez igazodik. Minden projekt modern és biztonságos.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="luminous-card overflow-hidden group"
              >
                <summary className="cursor-pointer p-6 flex items-center justify-between hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors">
                  <span className="text-lg font-bold text-[#0F172A] dark:text-white tracking-tight">
                    {faq.question}
                  </span>
                  <span className="text-[#0369A1] dark:text-[#00B5F1] text-2xl font-bold group-open:rotate-45 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* GEO Direct Answer blokk — Dual Theme */}
        <DirectAnswerBlock
          id="szolgaltatasok-foglalkozasok"
          question="Mit csinál a WebDude, kinek és milyen eredménnyel?"
          answer="Egyedi Next.js és WordPress weboldal készítés, technikai SEO/AEO, AI automatizáció és grafikai tervezés KKV-knak — 26 év grafikai és 16 év fejlesztői tapasztalattal, országos online kiszolgálással, egyedi árajánlat alapján."
        />
      </Surface>

      {/* Final CTA — Elevated Dual Theme */}
      <Surface tone="slate-lift" aurora grid className="py-24 md:py-32 text-center">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading text-[#0F172A] dark:text-white leading-tight">
              Készen állsz a{" "}
              <span className="text-[#0369A1] dark:text-brand-primary italic">következő</span>{" "}
              szintre?
            </h2>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-lg leading-relaxed mx-auto font-medium">
              Ingyenes konzultáció, átlátható árazás, határidőre kész projektek.
              Nincs projektmenedzser, közvetlen kommunikáció velem.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/kapcsolat"
                className="px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white rounded-full font-semibold uppercase tracking-wider text-sm hover:scale-[1.03] active:scale-95 transition-[transform,box-shadow,background-color] duration-300 shadow-[0_10px_28px_rgba(7,89,133,0.35)] min-h-11 min-w-11 inline-flex items-center justify-center"
              >
                Ingyenes Konzultáció
              </Link>
              <Link
                href="/munkak"
                className="px-8 py-4 border border-slate-300 text-slate-800 bg-white/85 hover:border-[#0369A1]/60 hover:text-[#0369A1] dark:border-white/15 dark:text-slate-200 font-semibold rounded-full dark:hover:border-brand-primary/60 dark:hover:text-brand-primary dark:bg-white/5 backdrop-blur-sm transition-[color,border-color,background-color] duration-300"
              >
                Munkák megtekintése
              </Link>
            </div>
          </div>
        </div>
      </Surface>
    </div>
  );
}
