import HeroSectionNew from "@/components/organisms/HeroSectionNew";
import SocialProofStrip from "@/components/organisms/SocialProofStrip";
import SystemShowcase from "@/components/organisms/SystemShowcase";
import FeaturedServicesNew from "@/components/organisms/FeaturedServicesNew";
import CaseStudiesBento from "@/components/organisms/CaseStudiesBento";
import WhyChooseMeSection from "@/components/organisms/WhyChooseMeSection";
import FaqSectionAEO from "@/components/organisms/FaqSectionAEO";
import FinalCta from "@/components/organisms/FinalCta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webfejlesztés & AI Automatizáció Kecskemétről | WebDude",
  description:
    "Weboldal, ami dolgozik helyetted — Next.js alapú, villámgyors weboldalak és AI-vezérelt lead-generálás kis- és középvállalkozásoknak Kecskemétről, országosan. 26 év grafikai, 16 év fejlesztői tapasztalat.",
  keywords: [
    "webfejlesztés Kecskemét",
    "AI automatizáció",
    "Next.js fejlesztő",
    "prémium weboldal készítés",
    "grafikai tervezés",
    "webshop készítés",
    "React fejlesztő Magyarország",
  ],
  alternates: {
    canonical: "https://webdude.hu",
  },
  openGraph: {
    title: "WebDude | Prémium Webfejlesztés & AI Automatizáció",
    description:
      "Weboldal, ami dolgozik helyetted. 26 év tapasztalat — egy emberrel, mellékesek nélkül.",
    url: "https://webdude.hu",
    siteName: "WebDude",
    images: [
      {
        url: "https://webdude.hu/banners/hero_banner1.png",
        width: 1536,
        height: 857,
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebDude | Prémium Webfejlesztés & AI Automatizáció",
    description:
      "Weboldal, ami dolgozik helyetted. 26 év tapasztalat — egy emberrel, mellékesek nélkül.",
    images: ["https://webdude.hu/banners/hero_banner1.png"],
  },
};

export default function Home() {
  // ─── JSON-LD Sémák (Server Component szinten injektálva) ────────────────
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://webdude.hu/#organization",
    name: "WebDude.hu",
    url: "https://webdude.hu",
    logo: {
      "@type": "ImageObject",
      url: "https://webdude.hu/banners/hero_banner1.png",
      width: 1536,
      height: 857,
    },
    description:
      "Prémium webfejlesztési és AI automatizációs szolgáltatás Kecskeméten. Next.js 16, React 19, TypeScript alapú modern weboldalak és webshopok fejlesztése.",
    founder: {
      "@type": "Person",
      name: "Norbi (WebDude)",
      jobTitle: "Webfejlesztő és Grafikai Tervező",
      description:
        "26 éves grafikai és 16 éves webfejlesztői tapasztalattal rendelkező szakértő.",
      url: "https://webdude.hu/szia-norbi-vagyok",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+36 70 323 8003",
      contactType: "customer service",
      availableLanguage: "Hungarian",
    },
    sameAs: [
      "https://www.facebook.com/webdude.hu",
      "https://www.linkedin.com/company/webdude-hu",
    ],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://webdude.hu/#person",
    name: "Norbi (WebDude)",
    jobTitle: "Webfejlesztő és Grafikai Tervező",
    description:
      "26 éves grafikai és 16 éves webfejlesztői tapasztalattal rendelkező szakértő. Next.js 16, React 19, TypeScript és AI automatizáció specialista.",
    url: "https://webdude.hu/szia-norbi-vagyok",
    worksFor: {
      "@type": "Organization",
      name: "WebDude.hu",
      url: "https://webdude.hu",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kecskemét",
      addressCountry: "HU",
    },
    sameAs: [
      "https://www.facebook.com/webdude.hu",
      "https://www.linkedin.com/company/webdude-hu",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://webdude.hu/#localbusiness",
    name: "WebDude.hu",
    image: "https://webdude.hu/banners/hero_banner1.png",
    url: "https://webdude.hu",
    telephone: "+36 70 323 8003",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kecskemét",
      addressCountry: "HU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.9069,
      longitude: 19.6897,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$",
    description:
      "Prémium webfejlesztési és AI automatizációs szolgáltatás Kecskeméten. Next.js 16, React 19 alapú modern weboldalak.",
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WebDude.hu",
    url: "https://webdude.hu",
    description:
      "Prémium webfejlesztési és AI automatizációs szolgáltatás Kecskeméten. Next.js 16, React 19, TypeScript alapú modern weboldalak és webshopok fejlesztése.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://webdude.hu/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WebDude AI Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "HUF",
      availability: "https://schema.org/InStock",
    },
    description:
      "AI-vezérelt webfejlesztési és automatizációs platform kis- és középvállalkozásoknak.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
    },
  };

  return (
    <>
      {/* ── JSON-LD Sémák ──────────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
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
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      {/* ── Főoldal szekciók ───────────────────────────────────────────────── */}
      <main className="grow">
        {/* 1. Hero — kétoszlopos, Bento Dashboard, stagger animáció */}
        <HeroSectionNew />

        {/* 2. Social Proof Strip — KPI statisztikák + scroll-velocity marquee */}
        <SocialProofStrip />

        {/* 3. System Showcase — scroll-bound animated folyamatábra */}
        <SystemShowcase />

        {/* 4. Featured Services — aszimmetrikus Bento Grid */}
        <FeaturedServicesNew />

        {/* 5. Case Studies — 2 kiemelt esettanulmány KPI számokkal */}
        <CaseStudiesBento />

        {/* 6. Why Choose Me — összehasonlítás, előnyök */}
        <WhyChooseMeSection />

        {/* 7. FAQ AEO — accordion + FAQPage JSON-LD */}
        <FaqSectionAEO />

        {/* 8. Final CTA */}
        <FinalCta />
      </main>
    </>
  );
}
