import { Metadata } from "next";
import BTShopClient from "./BTShopClient";

export const metadata: Metadata = {
  title:
    "BTShop.hu Esettanulmány — 100%-ban Automatizált E-kereskedelmi Ökoszisztéma | WebDude",
  description:
    "BTShop.hu webshop fejlesztés: 3200+ termék, Kulcs-Soft ERP integráció, saját SEO plugin, automatizált logisztika. 100% automatizált rendelés- és készletkezelés.",
  keywords: [
    "BTShop.hu",
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
    title: "BTShop.hu — 100%-ban Automatizált E-kereskedelmi Ökoszisztéma",
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
    title: "BTShop.hu — 100%-ban Automatizált E-kereskedelmi Ökoszisztéma",
    description:
      "3200+ termék, zéró manuális adminisztráció. Egyedi Kulcs-Soft könyvelőprogram szinkron és saját fejlesztésű SEO motor.",
    images: ["https://webdude.hu/assets/banners/webdude-hero.webp"],
  },
};

export default function BTShopCaseStudy() {
  // ─── JSON-LD Sémák (Server Component szinten injektálva) ────────────────
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "BTShop.hu — 100%-ban Automatizált E-kereskedelmi Ökoszisztéma",
    description:
      "BTShop.hu webshop fejlesztés: 3200+ termék, Kulcs-Soft ERP integráció, saját SEO plugin, automatizált logisztika.",
    image: "https://webdude.hu/assets/banners/webdude-hero.webp",
    author: {
      "@type": "Person",
      name: "Norbi (WebDude)",
      url: "https://webdude.hu/szia-norbi-vagyok",
    },
    publisher: {
      "@type": "Organization",
      name: "WebDude.hu",
      url: "https://webdude.hu",
      logo: {
        "@type": "ImageObject",
        url: "https://webdude.hu/assets/logos/webdude-logo.webp",
      },
    },
    datePublished: "2026-01-01",
    dateModified: "2026-01-01",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://webdude.hu/munkak/btshop",
    },
  };

  const softwareApplicationSchema = {
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
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WebDude.hu",
    url: "https://webdude.hu",
    logo: {
      "@type": "ImageObject",
      url: "https://webdude.hu/assets/logos/webdude-logo.webp",
    },
    description:
      "Prémium webfejlesztési és AI automatizációs szolgáltatás Kecskeméten.",
    founder: {
      "@type": "Person",
      name: "Norbi (WebDude)",
      jobTitle: "Webfejlesztő és Grafikai Tervező",
    },
  };

  return (
    <>
      {/* ── JSON-LD Sémák ──────────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(caseStudySchema).replace(/</g, "\\u003c"),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── BTShop Client Component ─────────────────────────────────────────── */}
      <BTShopClient />
    </>
  );
}
