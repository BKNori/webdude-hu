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
  /** 40–60 szavas AEO / GEO Direct Answer összefoglaló (Kihívás -> Megoldás -> Eredmény). */
  directAnswer?: {
    question: string;
    answer: string;
    facts: { label: string; value: string }[];
  };
}

const WEBDUDE_LOGO = "https://webdude.hu/assets/logos/webdude-logo.webp";
const NORBI_PERSON = {
  "@type": "Person",
  "@id": "https://webdude.hu/#person",
  name: "Balog Norbert",
  jobTitle: "Full-Stack Webfejlesztő & AI Specialist",
  description: "26 év grafikai tervezési és 16 év webfejlesztői tapasztalat",
  url: "https://webdude.hu/szia-norbi-vagyok",
};
const WEBDUDE_ORG = {
  "@type": "Organization",
  "@id": "https://webdude.hu/#organization",
  name: "WebDude",
  url: "https://webdude.hu",
  logo: {
    "@type": "ImageObject",
    url: WEBDUDE_LOGO,
  },
  description:
    "Prémium webfejlesztési, grafikai és AI automatizációs szolgáltatás.",
  founder: NORBI_PERSON,
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
    directAnswer: {
      question: "Milyen eredményeket hozott a Classi-Co Kft. weboldalának fejlesztése?",
      answer: "A Classi-Co Kft. térkő és építőanyag kereskedés modern, gyors és mobilbarát WordPress platformot kapott. A teljes körű technikai SEO, a konverzió-fókuszú struktúra és az analitika bevezetése révén a cég közvetlen lakossági és B2B megkereséseket generál digitális csatornákon keresztül.",
      facts: [
        { label: "Ügyfél", value: "Classi-Co Kft." },
        { label: "Megoldás", value: "WordPress · SEO · Copywriting" },
        { label: "Eredmény", value: "Stabil B2B/B2C lead-áramlás" },
      ],
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
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
          { "@type": "ListItem", position: 2, name: "Munkák", item: "https://webdude.hu/munkak" },
          { "@type": "ListItem", position: 3, name: "Classi-Co", item: "https://webdude.hu/munkak/classi-co" },
        ],
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
    directAnswer: {
      question: "Hogyan működik a BTShop.hu 100%-ban automatizált e-kereskedelmi rendszere?",
      answer: "A BTShop.hu számára egy 3200+ termékes WooCommerce webáruház valósult meg kétirányú Kulcs-Soft ERP könyvelőprogram szinkronnal. A rendszer automatikusan szinkronizálja a készleteket, számláz, címkét generál a futárszolgálatnak, miközben a saját fejlesztésű SEO motor maximalizálja az organikus láthatóságot.",
      facts: [
        { label: "Termékszám", value: "3200+ aktív SKU" },
        { label: "Integráció", value: "Kulcs-Soft ERP · Automata logisztika" },
        { label: "Adminisztráció", value: "0 manuális adatbevitel" },
      ],
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
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
          { "@type": "ListItem", position: 2, name: "Munkák", item: "https://webdude.hu/munkak" },
          { "@type": "ListItem", position: 3, name: "BTShop", item: "https://webdude.hu/munkak/btshop" },
        ],
      },
      WEBDUDE_ORG,
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "BTShop.hu E-kereskedelmi Ökoszisztéma",
        description:
          "3200+ termékes WooCommerce webáruház fejlesztése egyedi Kulcs-Soft könyvelőprogram szinkronnal, automatizált logisztikával és saját fejlesztésű SEO pluginnal.",
        url: "https://webdude.hu/munkak/btshop",
        creator: NORBI_PERSON,
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
        author: NORBI_PERSON,
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
    directAnswer: {
      question: "Mi tette sikeressé a Leanperial nemzetközi Quiet Luxury platformját?",
      answer: "A nemzetközi Executive Search tanácsadó feltört, instabil honlapját steril alapokra építettük újra WordPress és Kadence segítségével. A kártevőirtás, modern DNS és SMTP (SPF/DKIM) hitelesítés mellett elért 100/100 technikai SEO pontszám garantálja a diszkrét, villámgyors globális elérhetőséget.",
      facts: [
        { label: "Iparág", value: "Executive Search & Advisory" },
        { label: "Sebesség & SEO", value: "100/100 PageSpeed" },
        { label: "Biztonság", value: "Teljes kártevőmentesítés" },
      ],
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
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
          { "@type": "ListItem", position: 2, name: "Munkák", item: "https://webdude.hu/munkak" },
          { "@type": "ListItem", position: 3, name: "Leanperial", item: "https://webdude.hu/munkak/leanperial" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "Leanperial — Quiet Luxury Weboldal & Kártevőmentesítés",
        description:
          "Executive Search & Private Advisory vállalkozás prémium „Quiet Luxury” weboldala: kártevőirtás, egyedi WordPress + Kadence fejlesztés, SMTP-hitelesítés (SPF/DKIM), WebP-optimalizálás és 100/100 SEO pontszámú technikai optimalizálás.",
        url: "https://webdude.hu/munkak/leanperial",
        creator: NORBI_PERSON,
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
    directAnswer: {
      question: "Hogyan működik a Nedel Market helyi szerveres B2B katalógusrendszere?",
      answer: "A Nedel Market zöldség-gyümölcs nagykereskedés egyedi WooCommerce katalógust kapott, amely közvetlen kétirányú kapcsolatban áll az irodai könyvelőprogrammal. A privát helyi szerver, tükrözött mentések és Wordfence tűzfal garantálja a hibátlan üzletmenetet és az offline-online összhangot.",
      facts: [
        { label: "Üzleti modell", value: "B2B Nagykereskedelmi katalógus" },
        { label: "Infrastruktúra", value: "Helyi szerver · RAID tükrözés" },
        { label: "Biztonság", value: "Wordfence WAF · RankMath AEO" },
      ],
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
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
          { "@type": "ListItem", position: 2, name: "Munkák", item: "https://webdude.hu/munkak" },
          { "@type": "ListItem", position: 3, name: "Nedel Market", item: "https://webdude.hu/munkak/nedelmarket" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "Nedel Market — B2B Kereskedelmi Ökoszisztéma",
        description:
          "Komplex WooCommerce katalógus és irodai szerver integráció: valós idejű könyvelőprogram-szinkron, automatizált RAID/Backup, Wordfence tűzfal, RankMath AEO/SEO struktúra és GA4/Search Console/Bing Webmaster analitika.",
        url: "https://webdude.hu/munkak/nedelmarket",
        creator: NORBI_PERSON,
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

  "hu-mago-kft": {
    metadata: {
      title: "HU-MÁGÓ Kft. Esettanulmány — Ipari Szerszámgyártó Weboldal | WebDude",
      description:
        "HU-MÁGÓ Kft. ipari szerszámtervező és gyártó vállalat: modern, letisztult WordPress weboldal, arculattervezés és technikai SEO a nemzetközi B2B jelenléthez.",
      keywords: [
        "HU-MÁGÓ Kft.",
        "ipari weboldal",
        "szerszámgyártás weboldal",
        "B2B weboldal készítés",
        "arculattervezés",
        "technikai SEO",
        "Kecskemét webfejlesztés",
      ],
      alternates: {
        canonical: "https://webdude.hu/munkak/hu-mago-kft",
      },
      openGraph: {
        title: "HU-MÁGÓ Kft. — Ipari Szerszámgyártó Vállalati Weboldal & Arculat",
        description:
          "Precíziós ipari szerszámgyártás bemutatása: B2B fókuszú weboldal, tiszta technológiai bemutatók és keresőoptimalizálás.",
        url: "https://webdude.hu/munkak/hu-mago-kft",
        siteName: "WebDude",
        images: [
          {
            url: "https://webdude.hu/assets/portfolio/hu-mago/humago_mockup.webp",
            width: 1200,
            height: 630,
          },
        ],
        locale: "hu_HU",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "HU-MÁGÓ Kft. — Ipari Weboldal & Arculat | WebDude",
        description:
          "Precíziós ipari szerszámgyártó vállalat prémium B2B weboldala és digitális arculata.",
        images: ["https://webdude.hu/assets/portfolio/hu-mago/humago_mockup.webp"],
      },
    },
    directAnswer: {
      question: "Hogyan modernizálta a HU-MÁGÓ Kft. digitális jelenlétét a WebDude?",
      answer: "A HU-MÁGÓ Kft. ipari szerszámgyártó vállalat számára modern, letisztult és mobilbarát weboldal készült, amely professzionálisan mutatja be a precíziós megmunkálási kapacitásokat. A letisztult arculat és a technikai SEO megalapozza a sikeres nemzetközi és hazai B2B partnerkapcsolatokat.",
      facts: [
        { label: "Iparág", value: "Ipari szerszámgyártás & CNC" },
        { label: "Szolgáltatás", value: "Webfejlesztés · Arculat · SEO" },
        { label: "Fókusz", value: "B2B ipari partnergenerálás" },
      ],
    },
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "HU-MÁGÓ Kft. — Ipari Szerszámgyártó Vállalati Weboldal",
        description:
          "Precíziós szerszámtervező és gépipari vállalat prémium weboldal fejlesztése és arculati modernizációja.",
        image: "https://webdude.hu/assets/portfolio/hu-mago/humago_mockup.webp",
        author: NORBI_PERSON,
        publisher: WEBDUDE_ORG,
        datePublished: "2026-02-15",
        dateModified: "2026-02-15",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://webdude.hu/munkak/hu-mago-kft",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
          { "@type": "ListItem", position: 2, name: "Munkák", item: "https://webdude.hu/munkak" },
          { "@type": "ListItem", position: 3, name: "HU-MÁGÓ Kft.", item: "https://webdude.hu/munkak/hu-mago-kft" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "HU-MÁGÓ Kft. Weboldal és Arculat",
        description:
          "Ipari szerszámgyártó és gépipari partner digitális jelenlétének kialakítása: reszponzív dizájn, gépkapacitás bemutató és SEO.",
        url: "https://webdude.hu/munkak/hu-mago-kft",
        creator: NORBI_PERSON,
        keywords: ["Ipari weboldal", "CNC", "Szerszámgyártás", "B2B weboldal", "SEO"],
      },
      WEBDUDE_ORG,
    ],
  },

  "dr-nagy-albert": {
    metadata: {
      title: "Dr. Nagy Albert Esettanulmány — Neurológus Magánrendelés Weboldal | WebDude",
      description:
        "Dr. Nagy Albert PhD neurológus magánrendelésének prémium weboldala: időpontfoglalási rendszer, orvosi tájékoztatók, páciens-fókuszú dizájn és helyi SEO.",
      keywords: [
        "Dr. Nagy Albert",
        "neurológus weboldal",
        "orvosi weboldal készítés",
        "egészségügyi weboldal",
        "magánrendelés weboldal",
        "orvosi SEO",
        "időpontfoglalás",
      ],
      alternates: {
        canonical: "https://webdude.hu/munkak/dr-nagy-albert",
      },
      openGraph: {
        title: "Dr. Nagy Albert PhD — Neurológus Magánrendelés Weboldal",
        description:
          "Prémium egészségügyi weboldal páciens-barát navigációval, szakterületi tájékoztatókkal és konverziós kapcsolatfelvétellel.",
        url: "https://webdude.hu/munkak/dr-nagy-albert",
        siteName: "WebDude",
        images: [
          {
            url: "https://webdude.hu/assets/portfolio/dr-nagy-albert/dr-nagy-albert-neurologus-2.webp",
            width: 1200,
            height: 630,
          },
        ],
        locale: "hu_HU",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Dr. Nagy Albert — Neurológus Weboldal | WebDude",
        description:
          "Bizalomépítő, prémium orvosi weboldal neurológus szakorvosi magánrendeléshez.",
        images: ["https://webdude.hu/assets/portfolio/dr-nagy-albert/dr-nagy-albert-neurologus-2.webp"],
      },
    },
    directAnswer: {
      question: "Milyen eredményt ért el Dr. Nagy Albert orvosi weboldala?",
      answer: "Dr. Nagy Albert PhD neurológus magánrendelése elegáns, orvosi etikai normáknak megfelelő weboldalt kapott. A páciens-központú struktúra, a tünetek szerinti tájékoztatók és az egyértelmű kapcsolatfelvételi pontok drasztikusan leegyszerűsítették a magánrendelésre érkező bejelentkezéseket.",
      facts: [
        { label: "Szakterület", value: "Neurológia & Fejfájás-kezelés" },
        { label: "Megoldás", value: "Páciens-fókuszú orvosi portál" },
        { label: "Eredmény", value: "Megtérülő magánrendelői kapacitás" },
      ],
    },
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Dr. Nagy Albert PhD — Neurológus Magánrendelés Weboldal",
        description:
          "Professzionális orvosi weboldal készítése neurológiai magánrendeléshez: páciens-edukáció és kapcsolatfelvétel.",
        image: "https://webdude.hu/assets/portfolio/dr-nagy-albert/dr-nagy-albert-neurologus-2.webp",
        author: NORBI_PERSON,
        publisher: WEBDUDE_ORG,
        datePublished: "2026-03-01",
        dateModified: "2026-03-01",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://webdude.hu/munkak/dr-nagy-albert",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
          { "@type": "ListItem", position: 2, name: "Munkák", item: "https://webdude.hu/munkak" },
          { "@type": "ListItem", position: 3, name: "Dr. Nagy Albert", item: "https://webdude.hu/munkak/dr-nagy-albert" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "Dr. Nagy Albert Orvosi Weboldal",
        description:
          "Neurológus szakorvos páciens-központú weboldalának tervezése és kivitelezése SEO-val és mobiloptimalizálással.",
        url: "https://webdude.hu/munkak/dr-nagy-albert",
        creator: NORBI_PERSON,
        keywords: ["Orvosi weboldal", "Neurológus", "Magánrendelés", "Egészségügyi SEO"],
      },
      WEBDUDE_ORG,
    ],
  },

  "go-box-kft": {
    metadata: {
      title: "Go-Box Kft. Esettanulmány — Csomagolóanyag Gyártó Weboldal | WebDude",
      description:
        "Go-Box Kft. hullámpapír dobozgyártó: B2B termékkatalógus, egyedi méretkalkuláció, logisztikai integráció és ipari branding 26 év tapasztalattal.",
      keywords: [
        "Go-Box Kft.",
        "dobozgyártó weboldal",
        "csomagolóanyag webshop",
        "hullámpapír doboz",
        "ipari weboldal készítés",
        "B2B ajánlatkérő",
        "Kecskemét dobozgyártás",
      ],
      alternates: {
        canonical: "https://webdude.hu/munkak/go-box-kft",
      },
      openGraph: {
        title: "Go-Box Kft. — Dobozgyártó B2B Weboldal & Katalógus",
        description:
          "Egyedi hullámpapír dobozok és csomagolástechnika: interaktív termékkatalógus és gyors ajánlatkérő rendszer ipari partnereknek.",
        url: "https://webdude.hu/munkak/go-box-kft",
        siteName: "WebDude",
        images: [
          {
            url: "https://webdude.hu/assets/portfolio/go-box/repulo-dobozok.webp",
            width: 1200,
            height: 630,
          },
        ],
        locale: "hu_HU",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Go-Box Kft. — Csomagolástechnika & Dobozgyártás | WebDude",
        description:
          "Ipari csomagolóanyag gyártó vállalat nagy volumenű B2B ajánlatkérő weboldala.",
        images: ["https://webdude.hu/assets/portfolio/go-box/repulo-dobozok.webp"],
      },
    },
    directAnswer: {
      question: "Hogyan skálázza a Go-Box Kft. ajánlatkéréseit az új weboldal?",
      answer: "A Go-Box Kft. dobozgyár számára olyan B2B termékkatalógust és ajánlatkérő felületet alakítottunk ki, amellyel a partnerek másodpercek alatt specifikálhatják az egyedi méretű hullámpapír dobozok paramétereit. A látványos 3D látványtervek és a SEO növelték a nagy tételes ipari megrendelések arányát.",
      facts: [
        { label: "Termék", value: "Egyedi hullámpapír dobozok" },
        { label: "Funkció", value: "B2B méret-specifikáció & ajánlatkérő" },
        { label: "Eredmény", value: "Kiemelkedő ipari megkeresés-növekedés" },
      ],
    },
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Go-Box Kft. — Csomagolóanyag Gyártó B2B Weboldal",
        description:
          "Dobozgyártó és csomagolástechnikai vállalat digitális transzformációja és ajánlatkérő rendszerének kiépítése.",
        image: "https://webdude.hu/assets/portfolio/go-box/repulo-dobozok.webp",
        author: NORBI_PERSON,
        publisher: WEBDUDE_ORG,
        datePublished: "2026-03-20",
        dateModified: "2026-03-20",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://webdude.hu/munkak/go-box-kft",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
          { "@type": "ListItem", position: 2, name: "Munkák", item: "https://webdude.hu/munkak" },
          { "@type": "ListItem", position: 3, name: "Go-Box Kft.", item: "https://webdude.hu/munkak/go-box-kft" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "Go-Box Kft. Dobozgyártó Portál",
        description:
          "Ipari csomagolástechnikai ajánlatkérő portál tervezése, reszponzív katalógus és technikai SEO kivitelezés.",
        url: "https://webdude.hu/munkak/go-box-kft",
        creator: NORBI_PERSON,
        keywords: ["Dobozgyártás", "Csomagolóanyag", "B2B weboldal", "Katalógus", "SEO"],
      },
      WEBDUDE_ORG,
    ],
  },

  "ai-prompt-hu": {
    metadata: {
      title: "AI-Prompt.hu Esettanulmány — Intelligens Prompt Optimalizáló Platform | WebDude",
      description:
        "AI-Prompt.hu SaaS platform: Next.js 16, Claude és GPT API integráció, valós idejű prompt finomhangolás és strukturált kimenet-generálás (JSON, XML).",
      keywords: [
        "AI-Prompt.hu",
        "prompt engineering platform",
        "Next.js SaaS",
        "Claude API integráció",
        "GPT-4 API",
        "AI fejlesztés",
        "prompt optimalizálás",
      ],
      alternates: {
        canonical: "https://webdude.hu/munkak/ai-prompt-hu",
      },
      openGraph: {
        title: "AI-Prompt.hu — Intelligens Prompt Optimalizáló és SaaS Platform",
        description:
          "Saját fejlesztésű mesterséges intelligencia eszköz: többmodelltesztelés, strukturált JSON kimenetek és token-optimalizálás.",
        url: "https://webdude.hu/munkak/ai-prompt-hu",
        siteName: "WebDude",
        images: [
          {
            url: "https://webdude.hu/assets/portfolio/ai-prompt/ai-promt-hi-banner-2.webp",
            width: 1200,
            height: 630,
          },
        ],
        locale: "hu_HU",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "AI-Prompt.hu — AI SaaS Platform | WebDude",
        description:
          "Next.js 16 alapú modern AI eszköz prompt mérnököknek és fejlesztőknek.",
        images: ["https://webdude.hu/assets/portfolio/ai-prompt/ai-promt-hi-banner-2.webp"],
      },
    },
    directAnswer: {
      question: "Mit nyújt az AI-Prompt.hu platform és milyen architektúrára épül?",
      answer: "Az AI-Prompt.hu egy nagy sebességű Next.js 16 alkalmazás, amely a Claude és az OpenAI modelljeivel összekapcsolva optimalizálja az üzleti promptokat. Csökkenti a token-felhasználást, minimalizálja a hallucinációt és determinisztikus kimeneteket állít elő vállalati integrációkhoz.",
      facts: [
        { label: "Stack", value: "Next.js 16 · TypeScript · Tailwind v4" },
        { label: "AI Integráció", value: "Claude 3.5 / 3.7 · GPT-4o API" },
        { label: "Cél", value: "Determinisztikus prompt-rendszerek" },
      ],
    },
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "AI-Prompt.hu — Intelligens Prompt Optimalizáló Platform",
        description:
          "Modern AI SaaS alkalmazás tervezése és lefejlesztése Next.js 16 és generatív API integrációk segítségével.",
        image: "https://webdude.hu/assets/portfolio/ai-prompt/ai-promt-hi-banner-2.webp",
        author: NORBI_PERSON,
        publisher: WEBDUDE_ORG,
        datePublished: "2026-04-10",
        dateModified: "2026-04-10",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://webdude.hu/munkak/ai-prompt-hu",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
          { "@type": "ListItem", position: 2, name: "Munkák", item: "https://webdude.hu/munkak" },
          { "@type": "ListItem", position: 3, name: "AI-Prompt.hu", item: "https://webdude.hu/munkak/ai-prompt-hu" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "AI-Prompt.hu SaaS Platform",
        description:
          "Next.js alapú AI prompt optimalizáló szoftver vállalati és egyéni munkafolyamatok automatizálására.",
        url: "https://webdude.hu/munkak/ai-prompt-hu",
        creator: NORBI_PERSON,
        keywords: ["AI SaaS", "Prompt Engineering", "Next.js 16", "Claude API", "Automatizáció"],
      },
      WEBDUDE_ORG,
    ],
  },

  "lengyel-helga-eskuvodekoracio": {
    metadata: {
      title: "Lengyel Helga Esettanulmány — Prémium Esküvői Dekoráció & Branding | WebDude",
      description:
        "Lengyel Helga virágkötő és esküvői dekoratőr: romantikus, prémium arculattervezés, portfólió weboldal, reszponzív galéria és helyi esküvői SEO.",
      keywords: [
        "Lengyel Helga",
        "esküvői dekoráció weboldal",
        "virágkötő weboldal",
        "esküvő branding",
        "arculattervezés",
        "esküvői portfólió",
        "rendezvénydekoráció",
      ],
      alternates: {
        canonical: "https://webdude.hu/munkak/lengyel-helga-eskuvodekoracio",
      },
      openGraph: {
        title: "Lengyel Helga — Esküvői Dekoráció és Vizuális Arculat",
        description:
          "Prémium esküvői és rendezvénydekoráció vizuális megjelenítése: egyedi arculat, elegáns portfólió és direct ajánlatkérés.",
        url: "https://webdude.hu/munkak/lengyel-helga-eskuvodekoracio",
        siteName: "WebDude",
        images: [
          {
            url: "https://webdude.hu/assets/portfolio/lengyel-helga/lengyel-helga-eskuvodekoracio-banner.webp",
            width: 1200,
            height: 630,
          },
        ],
        locale: "hu_HU",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Lengyel Helga — Esküvői Dekoráció Portfólió | WebDude",
        description:
          "Elegáns esküvői dekoráció és virágkötészeti portfólió weboldal konverziós kapcsolatfelvétellel.",
        images: ["https://webdude.hu/assets/portfolio/lengyel-helga/lengyel-helga-eskuvodekoracio-banner.webp"],
      },
    },
    directAnswer: {
      question: "Hogyan segíti Lengyel Helga esküvői dekoratőrt az új weboldal?",
      answer: "A Lengyel Helga márka számára kifinomult, romantikus vizuális arculat és fotóközpontú portfólió weboldal valósult meg. A tematikus esküvői galériák, a részletes szolgáltatás-ismertetők és az inspirációs blokkok azonnali érzelmi kötődést és minőségi ajánlatkéréseket generálnak a pároktól.",
      facts: [
        { label: "Műfaj", value: "Esküvői & Rendezvény dekoráció" },
        { label: "Dizájn", value: "Elegáns portfólió galéria & Branding" },
        { label: "Hatás", value: "Teljes esküvői szezon lekötöttség" },
      ],
    },
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Lengyel Helga — Esküvői Dekoráció & Vizuális Arculat",
        description:
          "Kifinomult virágkötészeti és esküvői dekorációs vállalkozás teljes vizuális és online felépítése.",
        image: "https://webdude.hu/assets/portfolio/lengyel-helga/lengyel-helga-eskuvodekoracio-banner.webp",
        author: NORBI_PERSON,
        publisher: WEBDUDE_ORG,
        datePublished: "2026-04-25",
        dateModified: "2026-04-25",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://webdude.hu/munkak/lengyel-helga-eskuvodekoracio",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
          { "@type": "ListItem", position: 2, name: "Munkák", item: "https://webdude.hu/munkak" },
          { "@type": "ListItem", position: 3, name: "Lengyel Helga", item: "https://webdude.hu/munkak/lengyel-helga-eskuvodekoracio" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "Lengyel Helga Esküvői Portfólió",
        description:
          "Esküvői dekoratőr arculat és portfólió weboldal készítése: mobilbarát fotógalériák, ajánlatkérő űrlap és helyi SEO.",
        url: "https://webdude.hu/munkak/lengyel-helga-eskuvodekoracio",
        creator: NORBI_PERSON,
        keywords: ["Esküvői dekoráció", "Virágkötő", "Portfólió", "Arculattervezés", "SEO"],
      },
      WEBDUDE_ORG,
    ],
  },

  "rimai-utepito-kft-teljes-koru-digitalis-es-vizualis-arculatepites": {
    metadata: {
      title: "Rimai Útépítő Kft. Esettanulmány — Útépítési Nagyvállalati Weboldal | WebDude",
      description:
        "Rimai Útépítő Kft. aszfaltozás és mélyépítés: komplett digitális arculat, géppark-bemutató weboldal, B2B ajánlatkérő rendszer és technikai SEO.",
      keywords: [
        "Rimai Útépítő Kft.",
        "útépítés weboldal",
        "aszfaltozás",
        "mélyépítés B2B",
        "ipari weboldal",
        "arculattervezés",
        "géppark bemutató",
      ],
      alternates: {
        canonical:
          "https://webdude.hu/munkak/rimai-utepito-kft-teljes-koru-digitalis-es-vizualis-arculatepites",
      },
      openGraph: {
        title: "Rimai Útépítő Kft. — Teljes Körű Digitális és Vizuális Arculatépítés",
        description:
          "Nehézgép- és mélyépítő nagyvállalat modern digitális platformja: projektbemutatók, referenciák és B2B megkeresések.",
        url: "https://webdude.hu/munkak/rimai-utepito-kft-teljes-koru-digitalis-es-vizualis-arculatepites",
        siteName: "WebDude",
        images: [
          {
            url: "https://webdude.hu/assets/portfolio/rimai/banner.webp",
            width: 1200,
            height: 630,
          },
        ],
        locale: "hu_HU",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Rimai Útépítő Kft. — Útépítés & Mélyépítés | WebDude",
        description:
          "Mélyépítési és aszfaltozási nagyvállalat tekintélyt parancsoló digitális arculata.",
        images: ["https://webdude.hu/assets/portfolio/rimai/banner.webp"],
      },
    },
    directAnswer: {
      question: "Hogyan támogatja a Rimai Útépítő Kft. közbeszerzési és B2B sikereit az új weboldal?",
      answer: "A Rimai Útépítő Kft. számára tekintélyt parancsoló, modern arculatot és referenciaközpontú weboldalt építettünk. A nehézgéppark és a nagyszabású infrastrukturális projektek strukturált bemutatása közvetlenül erősíti az E-E-A-T bizalmat a közbeszerzéseken és a magánberuházói tendereken.",
      facts: [
        { label: "Tevékenység", value: "Útépítés · Aszfaltozás · Mélyépítés" },
        { label: "Eszköz", value: "Vállalati portál & Géppark katalógus" },
        { label: "Cél", value: "B2B tender és közbeszerzési autoritás" },
      ],
    },
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Rimai Útépítő Kft. — Teljes Körű Digitális Arculatépítés",
        description:
          "Nehézgépjárműves és mélyépítési nagyvállalat teljes körű digitális megjelenésének kialakítása.",
        image: "https://webdude.hu/assets/portfolio/rimai/banner.webp",
        author: NORBI_PERSON,
        publisher: WEBDUDE_ORG,
        datePublished: "2026-05-01",
        dateModified: "2026-05-01",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://webdude.hu/munkak/rimai-utepito-kft-teljes-koru-digitalis-es-vizualis-arculatepites",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
          { "@type": "ListItem", position: 2, name: "Munkák", item: "https://webdude.hu/munkak" },
          {
            "@type": "ListItem",
            position: 3,
            name: "Rimai Útépítő Kft.",
            item: "https://webdude.hu/munkak/rimai-utepito-kft-teljes-koru-digitalis-es-vizualis-arculatepites",
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "Rimai Útépítő Kft. Digitális Arculat és Weboldal",
        description:
          "Útépítő és mélyépítő vállalat prémium weboldalának és arculatának kivitelezése.",
        url: "https://webdude.hu/munkak/rimai-utepito-kft-teljes-koru-digitalis-es-vizualis-arculatepites",
        creator: NORBI_PERSON,
        keywords: ["Útépítés", "Mélyépítés", "Aszfaltozás", "B2B weboldal", "Géppark"],
      },
      WEBDUDE_ORG,
    ],
  },

  "bor-es-garnela": {
    metadata: {
      title: "Bor és Garnéla Esettanulmány — Prémium Food Truck Branding & Web | WebDude",
      description:
        "Bor és Garnéla gourmet food truck & catering: egyedi arculattervezés, étlap, rendezvényi ajánlatkérő weboldal és gasztronómiai branding.",
      keywords: [
        "Bor és Garnéla",
        "food truck weboldal",
        "gasztro branding",
        "catering weboldal",
        "étlap tervezés",
        "rendezvény catering",
        "éttermi arculat",
      ],
      alternates: {
        canonical: "https://webdude.hu/munkak/bor-es-garnela",
      },
      openGraph: {
        title: "Bor és Garnéla — Prémium Food Truck Branding és Weboldal",
        description:
          "Gasztronómiai élmény és tengeri különlegességek: prémium food truck arculat és rendezvény-foglalási weboldal.",
        url: "https://webdude.hu/munkak/bor-es-garnela",
        siteName: "WebDude",
        images: [
          {
            url: "https://webdude.hu/assets/portfolio/bor-garnela/bor_es_garnela_banner.webp",
            width: 1200,
            height: 630,
          },
        ],
        locale: "hu_HU",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Bor és Garnéla — Gasztro Branding & Web | WebDude",
        description:
          "Gourmet tengeri ételek és prémium borok gasztronómiai arculattervezése és weboldala.",
        images: ["https://webdude.hu/assets/portfolio/bor-garnela/bor_es_garnela_banner.webp"],
      },
    },
    directAnswer: {
      question: "Hogyan pozicionálja a prémium gasztro-piacon a Bor és Garnélát az új arculat?",
      answer: "A Bor és Garnéla gourmet food truck számára elegáns mediterrán arculat és letisztult weboldal készült. A prémium vizualitás, a digitális menü és a közvetlen catering-ajánlatkérő modul révén a vállalkozás a privát és céges rendezvények kiemelt gasztronómiai szolgáltatójává vált.",
      facts: [
        { label: "Műfaj", value: "Gourmet Food Truck & Catering" },
        { label: "Szolgáltatás", value: "Arculattervezés · Web · Menü" },
        { label: "Pozicionálás", value: "Prémium gasztronómiai rendezvénypiac" },
      ],
    },
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Bor és Garnéla — Prémium Food Truck Branding és Weboldal",
        description:
          "Minőségi catering és gourmet food truck márkaidentitásának, étlapjának és weboldalának megtervezése.",
        image: "https://webdude.hu/assets/portfolio/bor-garnela/bor_es_garnela_banner.webp",
        author: NORBI_PERSON,
        publisher: WEBDUDE_ORG,
        datePublished: "2026-05-15",
        dateModified: "2026-05-15",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://webdude.hu/munkak/bor-es-garnela",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
          { "@type": "ListItem", position: 2, name: "Munkák", item: "https://webdude.hu/munkak" },
          { "@type": "ListItem", position: 3, name: "Bor és Garnéla", item: "https://webdude.hu/munkak/bor-es-garnela" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "Bor és Garnéla Gasztro Branding",
        description:
          "Food truck és gourmet catering arculattervezés, logó, digitális étlap és kapcsolatfelvételi weboldal.",
        url: "https://webdude.hu/munkak/bor-es-garnela",
        creator: NORBI_PERSON,
        keywords: ["Food truck", "Gasztro branding", "Catering", "Étlap", "Arculat"],
      },
      WEBDUDE_ORG,
    ],
  },

  "dr-danyi": {
    metadata: {
      title: "Dr. Danyi Esettanulmány — Prémium Orvosi Arculat & Weboldal | WebDude",
      description:
        "Dr. Danyi szakorvosi magánrendelés: letisztult orvosi arculat, páciens-tájékoztató weboldal, online bejelentkezési struktúra és egészségügyi SEO.",
      keywords: [
        "Dr. Danyi",
        "orvosi weboldal",
        "magánrendelés weboldal",
        "egészségügyi branding",
        "orvosi arculat",
        "páciens tájékoztató",
        "egészségügyi SEO",
      ],
      alternates: {
        canonical: "https://webdude.hu/munkak/dr-danyi",
      },
      openGraph: {
        title: "Dr. Danyi — Szakorvosi Magánrendelés Weboldal & Arculat",
        description:
          "Orvosi etikai elveknek megfelelő, elegáns páciens-tájékoztató és időpont-egyeztető weboldal.",
        url: "https://webdude.hu/munkak/dr-danyi",
        siteName: "WebDude",
        images: [
          {
            url: "https://webdude.hu/assets/banners/webdude-hero.webp",
            width: 1200,
            height: 630,
          },
        ],
        locale: "hu_HU",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Dr. Danyi — Orvosi Weboldal & Arculat | WebDude",
        description:
          "Professzionális szakorvosi honlap és arculat megbízható páciens-kommunikációval.",
        images: ["https://webdude.hu/assets/banners/webdude-hero.webp"],
      },
    },
    directAnswer: {
      question: "Hogyan épült fel Dr. Danyi orvosi weboldala és arculata?",
      answer: "Dr. Danyi szakorvosi praxisa számára megnyugtató, tiszta vizuális világot és informatív honlapot hoztunk létre. A kezelési területek áttekinthető leírása és az egyszerű kapcsolatfelvétel biztosítja a zökkenőmentes páciens-bejelentkezést.",
      facts: [
        { label: "Szakterület", value: "Szakorvosi magánrendelés" },
        { label: "Megoldás", value: "Orvosi arculat · Páciens-portál" },
        { label: "Cél", value: "E-E-A-T orvosi hitelesség & bejelentkezés" },
      ],
    },
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Dr. Danyi — Szakorvosi Magánrendelés Weboldal és Arculat",
        description:
          "Orvosi magánpraxis professzionális digitális arculatának és tájékoztató portáljának kivitelezése.",
        image: "https://webdude.hu/assets/banners/webdude-hero.webp",
        author: NORBI_PERSON,
        publisher: WEBDUDE_ORG,
        datePublished: "2026-05-20",
        dateModified: "2026-05-20",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://webdude.hu/munkak/dr-danyi",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
          { "@type": "ListItem", position: 2, name: "Munkák", item: "https://webdude.hu/munkak" },
          { "@type": "ListItem", position: 3, name: "Dr. Danyi", item: "https://webdude.hu/munkak/dr-danyi" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "Dr. Danyi Szakorvosi Honlap",
        description:
          "Szakorvosi magánrendelő elegáns honlapjának megvalósítása és páciens-kommunikációjának optimalizálása.",
        url: "https://webdude.hu/munkak/dr-danyi",
        creator: NORBI_PERSON,
        keywords: ["Orvosi honlap", "Magánrendelés", "Páciens-tájékoztató", "Egészségügyi SEO"],
      },
      WEBDUDE_ORG,
    ],
  },

  "marina-homes": {
    metadata: {
      title: "Marina Homes Esettanulmány — Prémium Lakópark Branding & Értékesítés | WebDude",
      description:
        "Marina Homes vízparti luxus lakópark: ingatlanfejlesztői arculat, interaktív lakásválasztó koncepció, marketing anyagok és nagy konverziójú landing page.",
      keywords: [
        "Marina Homes",
        "lakópark weboldal",
        "ingatlanfejlesztés branding",
        "lakásértékesítés weboldal",
        "ingatlan marketing",
        "luxus lakópark",
        "alaprajz bemutató",
      ],
      alternates: {
        canonical: "https://webdude.hu/munkak/marina-homes",
      },
      openGraph: {
        title: "Marina Homes Lakópark — Real Estate Branding és Értékesítési Weboldal",
        description:
          "Exkluzív vízparti lakópark bemutatása: prémium ingatlanfejlesztői arculat, alaprajzok és közvetlen értékesítési csatorna.",
        url: "https://webdude.hu/munkak/marina-homes",
        siteName: "WebDude",
        images: [
          {
            url: "https://webdude.hu/assets/banners/webdude-hero.webp",
            width: 1200,
            height: 630,
          },
        ],
        locale: "hu_HU",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Marina Homes — Ingatlanfejlesztés & Branding | WebDude",
        description:
          "Prémium lakópark arculat és lakásértékesítést támogató digitális platform.",
        images: ["https://webdude.hu/assets/banners/webdude-hero.webp"],
      },
    },
    directAnswer: {
      question: "Milyen szerepet játszott a WebDude a Marina Homes lakópark értékesítésében?",
      answer: "A Marina Homes luxus lakópark projekt számára elegáns, nagyívű vizuális identitást és értékesítés-orientált landing oldalt terveztünk. A részletes alaprajzi bemutatók és a lokáció-előnyök kiemelése gyorsította a prémium ingatlanok előértékesítését.",
      facts: [
        { label: "Projekt", value: "Vízparti prémium lakópark" },
        { label: "Megoldás", value: "Real Estate Branding · Értékesítési landing" },
        { label: "Eredmény", value: "Sikeres lakásértékesítési rajt" },
      ],
    },
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Marina Homes Lakópark — Real Estate Branding és Értékesítési Weboldal",
        description:
          "Prémium vízparti lakópark ingatlanfejlesztési arculatának és értékesítési felületeinek megtervezése.",
        image: "https://webdude.hu/assets/banners/webdude-hero.webp",
        author: NORBI_PERSON,
        publisher: WEBDUDE_ORG,
        datePublished: "2026-06-01",
        dateModified: "2026-06-01",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://webdude.hu/munkak/marina-homes",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
          { "@type": "ListItem", position: 2, name: "Munkák", item: "https://webdude.hu/munkak" },
          { "@type": "ListItem", position: 3, name: "Marina Homes", item: "https://webdude.hu/munkak/marina-homes" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "Marina Homes Ingatlanfejlesztési Portfólió",
        description:
          "Vízparti lakópark arculat, értékesítési brosúrák és reszponzív weboldal tervezése.",
        url: "https://webdude.hu/munkak/marina-homes",
        creator: NORBI_PERSON,
        keywords: ["Ingatlanfejlesztés", "Lakópark", "Real Estate", "Branding", "Landing page"],
      },
      WEBDUDE_ORG,
    ],
  },

  chamomprex: {
    metadata: {
      title: "Chamomprex Esettanulmány — Prémium Kirakat & Névjegy Arculattervezés | WebDude",
      description:
        "Chamomprex vállalati arculat: prémium névjegykártya dizájn, üzlethelyiség kirakat-grafika, vektoros logó és egységes offline márkaidentitás.",
      keywords: [
        "Chamomprex",
        "kirakat tervezés",
        "névjegykártya készítés",
        "arculattervezés",
        "üzlethelyiség dekoráció",
        "grafikai tervezés",
        "vektorgrafika",
      ],
      alternates: {
        canonical: "https://webdude.hu/munkak/chamomprex",
      },
      openGraph: {
        title: "Chamomprex — Prémium Névjegy és Kirakat Arculattervezés",
        description:
          "Fizikai megjelenés és üzleti jelenlét csúcsminőségben: professzionális kirakatdekoráció és egyedi névjegykártyák.",
        url: "https://webdude.hu/munkak/chamomprex",
        siteName: "WebDude",
        images: [
          {
            url: "https://webdude.hu/assets/banners/webdude-hero.webp",
            width: 1200,
            height: 630,
          },
        ],
        locale: "hu_HU",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Chamomprex — Kirakat & Névjegy Arculat | WebDude",
        description:
          "Professzionális nyomdai előkészítés, kirakat-látványtervezés és exkluzív névjegykártyák.",
        images: ["https://webdude.hu/assets/banners/webdude-hero.webp"],
      },
    },
    directAnswer: {
      question: "Hogyan emelte a Chamomprex márkaértékét az egyedi offline arculat?",
      answer: "A Chamomprex számára prémium tapintású névjegykártyákat és figyelemfelkeltő, elegáns kirakatgrafikát terveztünk. A 26 éves nyomdai és grafikai szaktudás garantálta a pixelpontos kivitelezést és a harmonikus márkaélményt.",
      facts: [
        { label: "Készült", value: "Kirakatdekoráció & Exkluzív névjegy" },
        { label: "Szakértelem", value: "26 év grafikai és nyomdai tervezés" },
        { label: "Minőség", value: "100% vektoros és nyomdakész kivitel" },
      ],
    },
    schemas: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Chamomprex — Prémium Névjegy és Kirakat Arculattervezés",
        description:
          "Üzlethelyiség arculat és professzionális nyomdai anyagok tervezése.",
        image: "https://webdude.hu/assets/banners/webdude-hero.webp",
        author: NORBI_PERSON,
        publisher: WEBDUDE_ORG,
        datePublished: "2026-06-10",
        dateModified: "2026-06-10",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://webdude.hu/munkak/chamomprex",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Főoldal", item: "https://webdude.hu" },
          { "@type": "ListItem", position: 2, name: "Munkák", item: "https://webdude.hu/munkak" },
          { "@type": "ListItem", position: 3, name: "Chamomprex", item: "https://webdude.hu/munkak/chamomprex" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Project",
        name: "Chamomprex Kirakat és Névjegy Arculattervezés",
        description:
          "Vállalati offline arculat: kirakatgrafika, exkluzív névjegykártya és vektoros márkaelemek.",
        url: "https://webdude.hu/munkak/chamomprex",
        creator: NORBI_PERSON,
        keywords: ["Kirakat", "Névjegykártya", "Arculattervezés", "Nyomdai grafika"],
      },
      WEBDUDE_ORG,
    ],
  },
};