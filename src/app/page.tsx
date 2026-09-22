import HeroSectionNew from "@/components/organisms/HeroSectionNew";
import SocialProofStrip from "@/components/organisms/SocialProofStrip";
import SystemShowcase from "@/components/organisms/SystemShowcase";
import FeaturedServicesNew from "@/components/organisms/FeaturedServicesNew";
import CaseStudiesBento from "@/components/organisms/CaseStudiesBento";
import WhyChooseMeSection from "@/components/organisms/WhyChooseMeSection";
import FaqSectionAEO from "@/components/organisms/FaqSectionAEO";
import FinalCta from "@/components/organisms/FinalCta";
import { Metadata } from "next";
import { Award, Cpu, Clock } from "lucide-react";
import { getDictionary } from "@/lib/dictionary";

// ─── SEO Metadata — Ügyfélszerző, problémamegoldó fókusz ────────────────────
export const metadata: Metadata = {
  title: "Weboldal készítés, SEO és WordPress fejlesztés | WebDude",
  description:
    "Weboldal készítés, WordPress fejlesztés, SEO optimalizálás és grafikai tervezés Kecskemétről — ügynökségi mellébeszélés nélkül. Balog Norbert: 26 év kreatív és 16 év webfejlesztői tapasztalat.",
  keywords: [
    "weboldal készítés Kecskemét",
    "WordPress fejlesztés",
    "SEO optimalizálás",
    "grafikai tervezés",
    "webshop készítés",
    "WordPress fejlesztő Magyarország",
    "weboldal készítés ára",
    "SEO szakértő",
    "arculattervezés",
    "WooCommerce fejlesztés",
  ],
  alternates: {
    canonical: "https://webdude.hu",
  },
  openGraph: {
    title: "WebDude | Weboldal készítés, WordPress, SEO & Grafika",
    description:
      "Weboldal, ami ügyfeleket hoz. 26 év tapasztalat — egy emberrel, mellékesek nélkül. Kecskemétről, országosan.",
    url: "https://webdude.hu",
    siteName: "WebDude",
    images: [
      {
        url: "https://webdude.hu/og/webdude-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebDude | Weboldal készítés, WordPress, SEO & Grafika",
    description:
      "Weboldal, ami ügyfeleket hoz. 26 év tapasztalat — egy emberrel, mellékesek nélkül.",
    images: ["https://webdude.hu/og/webdude-og.jpg"],
  },
};

export default async function Home() {
  const dictionary = await getDictionary("hu");

  // ─── JSON-LD Sémák (Server Component szinten injektálva) ────────────────
  // XSS VÉDELEM: minden sémánál kötelező a .replace(/</g, '\u003c') alkalmazása!

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Főoldal",
        item: "https://webdude.hu",
      },
    ],
  };

  // Person séma — Balog Norbert E-E-A-T entitás (weboldal, WordPress, SEO, grafika)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://webdude.hu/#person",
    name: "Balog Norbert",
    alternateName: "Norbi",
    jobTitle: "Webfejlesztő, SEO Szakértő & Grafikai Tervező",
    description:
      "Balog Norbert 26 év grafikai tervezői és 16 év webfejlesztői tapasztalattal rendelkező szakember. Weboldal készítés, WordPress fejlesztés, SEO optimalizálás és grafikai tervezés — egy kézből, Kecskemétről.",
    url: "https://webdude.hu/szia-norbi-vagyok",
    knowsAbout: [
      "Weboldal készítés",
      "WordPress fejlesztés",
      "WooCommerce fejlesztés",
      "SEO optimalizálás",
      "AEO — AI Answer Engine Optimization",
      "Grafikai tervezés",
      "Arculattervezés",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Firebase",
    ],
    worksFor: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
      url: "https://webdude.hu",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kecskemét",
      addressRegion: "Bács-Kiskun",
      addressCountry: "HU",
    },
  };

  // Organization séma — WebDude vállalkozás (weboldal, WordPress, SEO, grafika fókusz)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://webdude.hu/#organization",
    name: "WebDude",
    description:
      "Weboldal készítés, WordPress fejlesztés, SEO optimalizálás és grafikai tervezés — egy kézből. Balog Norbert: 26 év grafikai és 16 év webfejlesztői tapasztalattal, Kecskemétről, országosan.",
    url: "https://webdude.hu",
    logo: {
      "@type": "ImageObject",
      url: "https://webdude.hu/og/webdude-og.jpg",
      width: 1200,
      height: 630,
    },
    foundingDate: "2009",
    founder: {
      "@type": "Person",
      "@id": "https://webdude.hu/#person",
      name: "Balog Norbert",
    },
    areaServed: {
      "@type": "Country",
      name: "Hungary",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+36 70 323 8003",
      email: "hello@webdude.hu",
      contactType: "customer service",
      areaServed: "HU",
      availableLanguage: "Hungarian",
    },
    sameAs: [
      "https://www.facebook.com/webdude.hu",
      "https://www.linkedin.com/company/webdude",
      "https://twitter.com/webdude_hu",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "WebDude Szolgáltatások",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Weboldal készítés",
            description: "Prémium egyedi weboldal fejlesztés Next.js és WordPress alapon",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "WordPress fejlesztés",
            description: "Egyedi WordPress témák, WooCommerce webshopok és plugin fejlesztés",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO optimalizálás",
            description: "Technikai SEO audit, kulcsszó-stratégia és AEO optimalizálás",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Grafikai tervezés",
            description: "Logó, arculattervezés, UI/UX design és nyomdai anyagok",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Automatizáció",
            description: "OpenAI GPT-4, Groq LLM integráció, AI chatbot és CRM automatizáció",
          },
        },
      ],
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://webdude.hu/#service",
    name: "Weboldal készítés, WordPress fejlesztés, SEO és Grafikai tervezés",
    description:
      "Weboldal készítés, WordPress fejlesztés, SEO optimalizálás és grafikai tervezés — egy kézből. 26 év grafikai és 16 év webfejlesztői tapasztalat.",
    provider: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
    },
    areaServed: {
      "@type": "Country",
      name: "Hungary",
    },
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Hogyan dolgozunk együtt a WebDude-dal?",
    description:
      "Átlátható fejlesztési folyamat projektfelmérésről az élesítésig. Közvetlen kommunikáció Balog Norberttel, nincs projektmenedzser.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Ingyenes projektfelmérés",
        text: "Megbeszéljük a céljaidat, elvárásaidat és a projekt részleteit — kötelezettség nélkül.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Stratégia és tervezés",
        text: "Kidolgozom a részletes tervet, fix árajánlatot és ütemezést adok.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Fejlesztés és implementáció",
        text: "Elkezdem a munkát rendszeres státuszfrissítésekkel és áttekintési pontokkal.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Élesítés és átadás",
        text: "Átadom a kész projektet, és 30 napos hibajavítási garanciával támogatom az indulást.",
      },
    ],
  };

  return (
    <>
      {/* ── JSON-LD Sémák — XSS-safe (.replace(/</g, '\u003c') minden sémánál) ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
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
          __html: JSON.stringify(howToSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── Főoldal szekciók ───────────────────────────────────────────────── */}
      <div className="grow">
        {/* 1. Hero — ügyfélszerző H1, CTA hierarchia */}
        <HeroSectionNew />

        {/* 1.5 Direct Answer Bento Grid — AEO optimalizált "Szakmai Snapshot" */}
        {/* DESIGN NOTE: v7.0 — amber/arany TILOS, kizárólag kék-lila (#00B5F1/#5B21B6) */}
        <section
          aria-label="Szakmai háttér és szakterületek"
          className="max-w-7xl mx-auto px-4 py-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Kártya — Szakértői Háttér (Balog Norbert E-E-A-T) */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-[#00B5F1]/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-8 h-8 text-[#00B5F1]" aria-hidden="true" />
                  <h3 className="text-[#00B5F1] font-semibold text-lg">
                    {dictionary.bentoGrid.expertise.title}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {dictionary.bentoGrid.expertise.content}
                </p>
              </div>
            </div>

            {/* 2. Kártya — Szakterületek (Weboldal, WordPress, SEO, Grafika) */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-[#00B5F1]/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="w-8 h-8 text-[#00B5F1]" aria-hidden="true" />
                  <h3 className="text-[#00B5F1] font-semibold text-lg">
                    {dictionary.bentoGrid.techStack.title}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {dictionary.bentoGrid.techStack.content}
                </p>
              </div>
            </div>

            {/* 3. Kártya — Projekt Időzítés & Garancia */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-[#00B5F1]/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-8 h-8 text-[#00B5F1]" aria-hidden="true" />
                  <h3 className="text-[#00B5F1] font-semibold text-lg">
                    {dictionary.bentoGrid.timeline.title}
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {dictionary.bentoGrid.timeline.content}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Social Proof Strip — KPI statisztikák + scroll-velocity marquee */}
        <SocialProofStrip />

        {/* 3. System Showcase — scroll-bound animated folyamatábra */}
        <SystemShowcase />

        {/* 4. Featured Services — 4 fő (Weboldal, WordPress, SEO, Grafika) + AI másodlagos */}
        <FeaturedServicesNew />

        {/* 5. Case Studies — 2 kiemelt esettanulmány KPI számokkal */}
        <CaseStudiesBento />

        {/* 6. Why Choose Me — Balog Norbert E-E-A-T, előnyök */}
        <WhyChooseMeSection />

        {/* 7. FAQ AEO — accordion + FAQPage JSON-LD, WordPress/SEO/Grafika kérdések */}
        <FaqSectionAEO />

        {/* 8. Final CTA */}
        <FinalCta />
      </div>
    </>
  );
}
