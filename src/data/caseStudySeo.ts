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
          description: "Egyedi árajánlat kérése",
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
  leanperial: {
    metadata: {
      title:
        "Esettanulmány: Leanperial — Quiet Luxury Weboldal Fejlesztése | WebDude",
      description:
        "Leanperial prémium „Quiet Luxury” weboldala: kártevőmentesítés, egyedi WordPress + Kadence fejlesztés, SMTP-hitelesítés és technikai SEO — 100/100 pont, vírusmentes, ultragyors platform.",
      keywords: [
        "Leanperial",
        "Quiet Luxury weboldal",
        "WordPress fejlesztés",
        "Kadence",
        "Kártevőirtás",
        "Executive Search weboldal",
        "UI/UX Design",
        "SEO optimalizálás",
        "SMTP hitelesítés",
        "Luxusmárka tanácsadás",
      ],
      alternates: {
        canonical: "https://webdude.hu/munkak/leanperial",
      },
      openGraph: {
        title: "Leanperial — Quiet Luxury Weboldal Fejlesztése & Kártevőmentesítés",
        description:
          "Prémium „Quiet Luxury” weboldal egyedi WordPress + Kadence alapon: teljes kártevőmentesítés, megbízható SMTP és 100/100 SEO pontszám.",
        url: "https://webdude.hu/munkak/leanperial",
        siteName: "WebDude",
        images: [
          {
            url: "https://webdude.hu/assets/portfolio/leanperial/leanperial%20website%20mockup.webp",
            width: 1200,
            height: 630,
          },
        ],
        locale: "hu_HU",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Leanperial — Quiet Luxury Weboldal Fejlesztése | WebDude",
        description:
          "Kártevőmentesítés, egyedi WordPress + Kadence fejlesztés és technikai SEO — 100/100 pontszámú, ultragyors luxusmárka-platform.",
        images: [
          "https://webdude.hu/assets/portfolio/leanperial/leanperial%20website%20mockup.webp",
        ],
      },
    },
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline:
          "Leanperial — Quiet Luxury Weboldal Fejlesztése & Kártevőmentesítés",
        description:
          "Nemzetközi luxusmárka-tanácsadó számára készült prémium weboldal: teljes kártevőmentesítés, DNS- és SSL-újjáépítés, egyedi WordPress + Kadence fejlesztés, SMTP-hitelesítés és technikai SEO-tökéletesítés.",
        image:
          "https://webdude.hu/assets/portfolio/leanperial/leanperial%20website%20mockup.webp",
        author: NORBI_PERSON,
        publisher: WEBDUDE_ORG,
        datePublished: "2026-10-14",
        dateModified: "2026-10-14",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://webdude.hu/munkak/leanperial",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "Leanperial — Quiet Luxury Weboldal & Kártevőmentesítés",
        description:
          "Executive Search & Private Advisory vállalkozás prémium „Quiet Luxury” weboldala: kártevőirtás, egyedi WordPress + Kadence fejlesztés, SMTP-hitelesítés (SPF/DKIM), WebP-optimalizálás és 100/100 SEO pontszámú technikai optimalizálás.",
        url: "https://webdude.hu/munkak/leanperial",
        creator: {
          "@type": "Person",
          name: "Norbi (WebDude)",
          jobTitle: "Webfejlesztő és Grafikai Tervező",
          url: "https://webdude.hu/szia-norbi-vagyok",
        },
        keywords: [
          "Quiet Luxury",
          "WordPress",
          "Kadence",
          "Kártevőirtás",
          "SMTP hitelesítés",
          "SEO",
          "Executive Search",
        ],
      },
      WEBDUDE_ORG,
    ],
  },

  nedelmarket: {
    metadata: {
      title:
        "Nedel Market: WooCommerce Katalógus & Irodai Szerver Integráció | WebDude",
      description:
        "Komplex WooCommerce katalógus fejlesztés, Wordfence biztonság, RankMath SEO és egyedi irodai szerver kiépítés könyvelőprogram szinkronnal.",
      keywords: [
        "Nedel Market",
        "WooCommerce katalógus",
        "Irodai szerver",
        "Könyvelőprogram szinkron",
        "Wordfence",
        "RankMath SEO",
        "Rendszerintegráció",
        "AEO SEO",
        "GA4 analitika",
        "B2B webshop",
      ],
      alternates: {
        canonical: "https://webdude.hu/munkak/nedelmarket",
      },
      openGraph: {
        title: "Nedel Market — WooCommerce Katalógus & Irodai Szerver Integráció",
        description:
          "Komplett B2B ökoszisztéma: WooCommerce katalógus, könyvelőprogram szinkron, Wordfence védelem és RankMath SEO egy helyi szerveren.",
        url: "https://webdude.hu/munkak/nedelmarket",
        siteName: "WebDude",
        images: [
          {
            url: "https://webdude.hu/assets/portfolio/nedel-market/nedel_market_banner.webp",
            width: 1200,
            height: 630,
          },
        ],
        locale: "hu_HU",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Nedel Market — WooCommerce & Irodai Szerver Integráció | WebDude",
        description:
          "WooCommerce katalógus, könyvelőprogram szinkron, Wordfence biztonság és RankMath SEO egy egyedi, tükörmentett helyi szerveren.",
        images: [
          "https://webdude.hu/assets/portfolio/nedel-market/nedel_market_banner.webp",
        ],
      },
    },
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline:
          "Nedel Market: Komplett B2B Kereskedelmi Ökoszisztéma és Helyi Szerver Integráció",
        description:
          "WooCommerce katalógus fejlesztése, amely valós időben kommunikál az irodai könyvelőprogrammal egy egyedileg épített, tükörmentett helyi szerverkörnyezetben. Wordfence biztonság, RankMath AEO/SEO és GA4 analitika.",
        image:
          "https://webdude.hu/assets/portfolio/nedel-market/nedel_market_banner.webp",
        author: NORBI_PERSON,
        publisher: WEBDUDE_ORG,
        datePublished: "2026-10-14",
        dateModified: "2026-10-14",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://webdude.hu/munkak/nedelmarket",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "Nedel Market — B2B Kereskedelmi Ökoszisztéma",
        description:
          "Komplex WooCommerce katalógus és irodai szerver integráció: valós idejű könyvelőprogram-szinkron, automatizált RAID/Backup, Wordfence tűzfal, RankMath AEO/SEO struktúra és GA4/Search Console/Bing Webmaster analitika.",
        url: "https://webdude.hu/munkak/nedelmarket",
        creator: {
          "@type": "Person",
          name: "Norbi (WebDude)",
          jobTitle: "Webfejlesztő és Grafikai Tervező",
          url: "https://webdude.hu/szia-norbi-vagyok",
        },
        keywords: [
          "WooCommerce",
          "Irodai szerver",
          "Könyvelőprogram szinkron",
          "Wordfence",
          "RankMath",
          "Rendszerintegráció",
          "SEO & Biztonság",
        ],
      },
      WEBDUDE_ORG,
    ],
  },

};