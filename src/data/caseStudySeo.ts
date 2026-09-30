/**
 * Esettanulmány SEO-adatok (7.12.0 — routing normalizálás).
 *
 * A `src/app/munkak/classi-co/` és `src/app/munkak/btshop/` önálló route
 * mappák a `munkak/[slug]` dinamikus útvonal fölött prioritást kaptak, ezért
 * a `[slug]/page.tsx` dedikált ágai halott kód voltak. A normalizálás során
 * a két mappa törlésre került, de a bennük lévő GAZDAG SEO-adatok (egyedi
 * title, keywords, canonical, OG/Twitter, JSON-LD sémák) nem veszhetnek el —
 * ezért költöztek ide, egyetlen SSOT-táblába.
 *
 * Használat: `src/app/munkak/[slug]/page.tsx` (`generateMetadata` +
 * JSON-LD `<script>` renderelés). Ha egy slughoz nincs bejegyzés, a page
 * a `works.ts`-ből generált alapértelmezett metadatát adja.
 *
 * SZABÁLY: új dedikált esettanulmány-route mappát TILOS létrehozni; minden
 * esettanulmány a `[slug]` útvonalon él (lásd `_DOCS/ARCHITECTURE.md`).
 */

import type { Metadata } from "next";

interface CaseStudySeoEntry {
  /** A `generateMetadata` teljes felülírása ehhez a slughoz. */
  metadata: Metadata;
  /** JSON-LD sémák — a page `<script type="application/ld+json">`-ként rendereli. */
  schemas: Record<string, unknown>[];
}

const WEBDUDE_LOGO = "https://webdude.hu/assets/logos/webdude-logo.webp";
const NORBI_PERSON = {
  "@type": "Person",
  name: "Norbi (WebDude)",
  url: "https://webdude.hu/szia-norbi-vagyok",
};
const WEBDUDE_ORG = {
  "@type": "Organization",
  name: "WebDude.hu",
  url: "https://webdude.hu",
  logo: {
    "@type": "ImageObject",
    url: WEBDUDE_LOGO,
  },
  description:
    "Prémium webfejlesztési és AI automatizációs szolgáltatás Kecskeméten.",
  founder: {
    "@type": "Person",
    name: "Norbi (WebDude)",
    jobTitle: "Webfejlesztő és Grafikai Tervező",
  },
};

export const CASE_STUDY_SEO: Record<string, CaseStudySeoEntry> = {
  "classi-co": {
    metadata: {
      title:
        "Classi-co.hu Esettanulmány — Teljes Körű Céges Weboldal Fejlesztés | WebDude",
      description:
        "Classi-co.hu weboldal fejlesztés: WordPress alapú céges weboldal, tartalomgyártás, SEO optimalizálás, Google Search Console és Analytics bekötés.",
      keywords: [
        "Classi-co.hu",
        "WordPress fejlesztés",
        "Céges weboldal",
        "SEO optimalizálás",
        "Google Search Console",
        "Google Analytics 4",
        "Tartalomírás",
        "Grafikai tervezés",
      ],
      alternates: {
        canonical: "https://webdude.hu/munkak/classi-co",
      },
      openGraph: {
        title: "Classi-co.hu — Teljes Körű Céges Weboldal Fejlesztés",
        description:
          "WordPress alapú weboldal tervezése, tartalomgyártással, SEO optimalizálással és analytics bekötéssel.",
        url: "https://webdude.hu/munkak/classi-co",
        siteName: "WebDude",
        images: [
          {
            url: "https://webdude.hu/assets/banners/webdude-hero.webp",
            width: 1920,
            height: 1080,
          },
        ],
        locale: "hu_HU",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Classi-co.hu — Teljes Körű Céges Weboldal Fejlesztés",
        description:
          "WordPress alapú weboldal tervezése, tartalomgyártással, SEO optimalizálással és analytics bekötéssel.",
        images: ["https://webdude.hu/assets/banners/webdude-hero.webp"],
      },
    },
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Classi-co.hu — Teljes Körű Céges Weboldal Fejlesztés",
        description:
          "Classi-co.hu weboldal fejlesztés: WordPress alapú céges weboldal, tartalomgyártás, SEO optimalizálás, Google Search Console és Analytics bekötés.",
        image: "https://webdude.hu/assets/banners/webdude-hero.webp",
        author: NORBI_PERSON,
        publisher: WEBDUDE_ORG,
        datePublished: "2026-01-01",
        dateModified: "2026-01-01",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://webdude.hu/munkak/classi-co",
        },
      },
      WEBDUDE_ORG,
    ],
  },
  btshop: {
    metadata: {
      title:
        "btshop.hu Esettanulmány — 3200 Termékes E-commerce Nagyhatalom | WebDude",
      description:
        "btshop.hu webshop fejlesztés: 3200 termék, Kulcs-Soft ERP integráció, saját SEO plugin, automatizált logisztika. 100% automatizált rendelés- és készletkezelés.",
      keywords: [
        "btshop.hu",
        "WooCommerce fejlesztés",
        "ERP integráció",
        "Kulcs-Soft",
        "automatizált webshop",
        "API fejlesztés",
        "SEO plugin",
        "logisztika automatizáció",
        "Google Merchant Center",
      ],
      alternates: {
        canonical: "https://webdude.hu/munkak/btshop",
      },
      openGraph: {
        title: "btshop.hu — 3200 termékes E-commerce Nagyhatalom",
        description:
          "3200+ termék, zéró manuális adminisztráció. Egyedi Kulcs-Soft könyvelőprogram szinkron és saját fejlesztésű SEO motor.",
        url: "https://webdude.hu/munkak/btshop",
        siteName: "WebDude",
        images: [
          {
            url: "https://webdude.hu/assets/banners/webdude-hero.webp",
            width: 1920,
            height: 1080,
          },
        ],
        locale: "hu_HU",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "btshop.hu — 3200 termékes E-commerce Nagyhatalom",
        description:
          "3200+ termék, zéró manuális adminisztráció. Egyedi Kulcs-Soft könyvelőprogram szinkron és saját fejlesztésű SEO motor.",
        images: ["https://webdude.hu/assets/banners/webdude-hero.webp"],
      },
    },
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline:
          "btshop.hu — 3200 termékes E-commerce Nagyhatalom & Kulcs-Soft Integráció",
        description:
          "BTShop.hu webshop fejlesztés: 3200+ termék, Kulcs-Soft ERP integráció, saját SEO plugin, automatizált logisztika.",
        image: "https://webdude.hu/assets/banners/webdude-hero.webp",
        author: NORBI_PERSON,
        publisher: WEBDUDE_ORG,
        datePublished: "2026-01-01",
        dateModified: "2026-01-01",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://webdude.hu/munkak/btshop",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "BTShop.hu E-kereskedelmi Rendszer",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "HUF",
          availability: "https://schema.org/InStock",
        },
        description:
          "100%-ban automatizált e-kereskedelmi ökoszisztéma Kulcs-Soft ERP integrációval, saját SEO pluginnal és automatizált logisztikával.",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: "1",
        },
      },
      WEBDUDE_ORG,
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "BTShop.hu E-kereskedelmi Ökoszisztéma",
        description:
          "3200+ termékes WooCommerce webáruház fejlesztése egyedi Kulcs-Soft könyvelőprogram szinkronnal, automatizált logisztikával és saját fejlesztésű SEO pluginnal.",
        url: "https://webdude.hu/munkak/btshop",
        creator: {
          "@type": "Person",
          name: "Norbi (WebDude)",
          jobTitle: "Webfejlesztő és Grafikai Tervező",
          url: "https://webdude.hu/szia-norbi-vagyok",
        },
        keywords: [
          "WooCommerce",
          "ERP integráció",
          "Kulcs-Soft",
          "SEO plugin",
          "API fejlesztés",
          "Logisztika automatizáció",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline:
          "BTShop.hu: 100%-ban Automatizált E-kereskedelmi Ökoszisztéma",
        description:
          "3200+ termék. Zéró manuális adminisztráció. Egyedi könyvelőszoftver-integráció és saját fejlesztésű SEO motor.",
        author: {
          "@type": "Person",
          name: "Balog Norbert",
          jobTitle: "Webfejlesztő & AI Automatizációs Szakértő",
          url: "https://webdude.hu/szia-norbi-vagyok",
        },
        publisher: WEBDUDE_ORG,
        datePublished: "2026-09-08",
        dateModified: "2026-09-08",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://webdude.hu/munkak/btshop",
        },
      },
    ],
  },
};