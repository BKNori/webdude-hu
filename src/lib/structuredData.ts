import { Dictionary } from "@/types/dictionary";
import { SITE_URL, EN_PREFIX } from "@/lib/i18n";

/**
 * JSON-LD sémák SSOT-ja (HU és EN főoldal — AEO / Answer Engine Optimization).
 *
 * Szabályok:
 * - HU sémák: szó szerint a korábbi `src/app/page.tsx` inline sémákból költöztetve
 *   (zero regression — azonos JSON jön ki), `inLanguage` jelölés nélkül.
 * - EN sémák: `inLanguage`: "en-US" minden sémában (feladat követelmény).
 * - E-E-A-T horgony (EN): "26 years of graphic design and 16 years of
 *   web development experience".
 * - ZERO FIXED PRICE: nincs priceRange, nincs EUR/USD/HUF utalás.
 * - A fizikai lokáció (Kecskemét) a sémában marad (látható szövegben nem).
 * - XSS VÉDELEM: kizárólag a `serializeJsonLd` függvénnyel renderelhető!
 *   (`.replace(/</g, "\\u003c")`)
 */
export type JsonLdSchema = Record<string, unknown>;

/** XSS-védett JSON-LD serializálás (kötelező `.replace(/</g, "\\u003c")`). */
export function serializeJsonLd(schema: JsonLdSchema): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

const EN_PAGE_URL = `${SITE_URL}${EN_PREFIX}`;

/** E-E-A-T horgony — angol hitelességi bizonyíték, minden sémába beégetve. */
const E_E_A_T =
  "26 years of graphic design and 16 years of web development experience";

/**
 * Az EN főoldal teljes JSON-LD szettje.
 * @param dictionary - en.json szótár (a FAQ kérdések innen jönnek)
 */
export function buildEnJsonLd(dictionary: Dictionary): JsonLdSchema[] {
  const faqItems = dictionary.home.faq.items;

  const breadcrumbSchema: JsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: "en-US",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: EN_PAGE_URL },
    ],
  };

  // Person séma — Balog Norbert E-E-A-T entitás (EN)
  const personSchema: JsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    inLanguage: "en-US",
    name: "Balog Norbert",
    alternateName: "Norbi",
    jobTitle: "Web Developer, SEO Expert & Graphic Designer",
    description: `Balog Norbert is a web developer and graphic designer with ${E_E_A_T}. Premium Next.js web development, AI automation, SEO and design — delivered as a remote partner to international clients.`,
    url: `${SITE_URL}/szia-norbi-vagyok`,
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "AI Automation",
      "SEO",
      "AEO",
      "Graphic Design",
      "UI/UX Design",
      "Firebase",
      "WordPress",
      "WooCommerce",
    ],
    worksFor: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "WebDude",
    },
    sameAs: [
      "https://www.facebook.com/webdude.hu",
      "https://www.linkedin.com/company/webdude",
      "https://twitter.com/webdude_hu",
    ],
  };

  // Organization séma — WebDude vállalati entitás (EN)
  const organizationSchema: JsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    inLanguage: "en-US",
    name: "WebDude",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og/webdude-og.jpg`,
      width: 1200,
      height: 630,
    },
    description: `WebDude is the premium web development and AI automation practice of Balog Norbert, backed by ${E_E_A_T}. Next.js 16, React 19 and Firebase solutions, delivered as a remote partner to clients worldwide.`,
    founder: {
      "@type": "Person",
      name: "Balog Norbert",
      jobTitle: "Web Developer, SEO Expert & Graphic Designer",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+36 70 323 8003",
      email: "hello@webdude.hu",
      contactType: "customer service",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Hungarian"],
    },
    sameAs: [
      "https://www.facebook.com/webdude.hu",
      "https://www.linkedin.com/company/webdude",
      "https://twitter.com/webdude_hu",
    ],
    areaServed: "Worldwide",
  };

  // LocalBusiness séma — a fizikai lokáció (Kecskemét) itt maradhat.
  const localBusinessSchema: JsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    inLanguage: "en-US",
    name: "WebDude",
    url: SITE_URL,
    description: `Premium web development, AI automation, SEO and graphic design. ${E_E_A_T}. Headquarters in Kecskemét, Hungary; delivery as a remote partner worldwide.`,
    telephone: "+36 70 323 8003",
    email: "hello@webdude.hu",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kecskemét",
      addressRegion: "Bács-Kiskun",
      addressCountry: "HU",
    },
    geo: { "@type": "GeoCoordinates", latitude: 46.908, longitude: 19.693 },
    logo: `${SITE_URL}/og/webdude-og.jpg`,
    areaServed: "Worldwide",
    founder: { "@type": "Person", name: "Balog Norbert" },
  };

  // Service séma — fő szolgáltatási kategóriák (EN)
  const serviceSchema: JsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    inLanguage: "en-US",
    name: "Premium Web Development & AI Automation",
    description: `Premium web development, AI workflow automation, SEO/AEO and graphic design services built on Next.js 16, React 19 and Firebase. Backed by ${E_E_A_T}.`,
    provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization` },
    areaServed: "Worldwide",
    serviceType: [
      "Premium Web Development",
      "AI Automation",
      "SEO & AEO",
      "Graphic Design",
    ],
  };

  // HowTo séma — 4 lépéses folyamat (EN, átlátható munkamenet)
  const howToSchema: JsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    inLanguage: "en-US",
    name: "How to start your web development project with WebDude",
    description:
      "A transparent four-step process from first contact to launch — direct communication with Norbi, no account managers.",
    step: [
      {
        "@type": "HowToStep",
        name: "Free discovery call",
        text: "Book a free consultation: we discuss your goals, audience and requirements — no obligations.",
      },
      {
        "@type": "HowToStep",
        name: "Custom quote and roadmap",
        text: "You receive a detailed scope with a custom quote and a realistic delivery schedule.",
      },
      {
        "@type": "HowToStep",
        name: "Design and development",
        text: "I design and build your solution with regular demos and direct communication throughout.",
      },
      {
        "@type": "HowToStep",
        name: "Launch and handover",
        text: "We launch together, with documentation, training and a 30-day bug-fix guarantee.",
      },
    ],
  };

  // FAQPage séma — a szótár 9 EN kérdés-válasz párból (AEO)
  const faqPageSchema: JsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-US",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return [
    breadcrumbSchema,
    personSchema,
    organizationSchema,
    localBusinessSchema,
    serviceSchema,
    howToSchema,
    faqPageSchema,
  ];
}

/**
 * A HU főoldal teljes JSON-LD szettje (AEO / E-E-A-T).
 *
 * A sémák szó szerint a korábbi `src/app/page.tsx` inline definícióiból
 * költöztetve (zero regression — azonos JSON jön ki), `inLanguage` jelölés nélkül.
 * A FAQPage sémát is ide vesszük: így az AEO szabály szerint kizárólag
 * szerveroldalon (RSC) jelenik meg, nem a kliens `FaqSectionAEO`-ban.
 *
 * @param dictionary - hu.json szótár (a FAQ kérdések innen jönnek)
 */
export function buildHuJsonLd(dictionary: Dictionary): JsonLdSchema[] {
  const faqItems = dictionary.home.faq.items;

  const breadcrumbSchema: JsonLdSchema = {
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
  const personSchema: JsonLdSchema = {
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
  const organizationSchema: JsonLdSchema = {
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

  const serviceSchema: JsonLdSchema = {
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

  const howToSchema: JsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Hogyan dolgozunk együtt a WebDude-dal?",
    description:
      "Átlátható fejlesztési folyamat projektfelmérésről az élesítésig. Közvetlen kommunikáció a WebDude-dal, nincs projektmenedzser.",
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

  // FAQPage séma — a szótár 9 HU kérdés-válasz párból (AEO), szerveroldalon.
  const faqPageSchema: JsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return [
    breadcrumbSchema,
    personSchema,
    organizationSchema,
    serviceSchema,
    howToSchema,
    faqPageSchema,
  ];
}

