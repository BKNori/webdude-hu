import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BTShop.hu E-kereskedelmi Ökoszisztéma & ERP Integráció | WebDude Referencia",
  description:
    "3200+ termékes WooCommerce webáruház fejlesztése egyedi Kulcs-Soft könyvelőprogram szinkronnal, automatizált logisztikával és saját fejlesztésű SEO pluginnal.",
  alternates: {
    canonical: "https://webdude.hu/munkak/btshop",
  },
  openGraph: {
    title: "BTShop.hu E-kereskedelmi Ökoszisztéma & ERP Integráció | WebDude Referencia",
    description:
      "3200+ termékes WooCommerce webáruház fejlesztése egyedi Kulcs-Soft könyvelőprogram szinkronnal, automatizált logisztikával és saját fejlesztésű SEO pluginnal.",
    url: "https://webdude.hu/munkak/btshop",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-btshop-og.jpg",
        width: 1200,
        height: 630,
        alt: "BTShop.hu E-kereskedelmi Ökoszisztéma",
      },
    ],
    locale: "hu_HU",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "BTShop.hu E-kereskedelmi Ökoszisztéma & ERP Integráció | WebDude Referencia",
    description:
      "3200+ termékes WooCommerce webáruház fejlesztése egyedi Kulcs-Soft könyvelőprogram szinkronnal, automatizált logisztikával és saját fejlesztésű SEO pluginnal.",
    images: ["/og/webdude-btshop-og.jpg"],
  },
};

export default function BTShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projectSchema = {
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
  };

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "BTShop.hu: 100%-ban Automatizált E-kereskedelmi Ökoszisztéma",
    description:
      "3200+ termék. Zéró manuális adminisztráció. Egyedi könyvelőszoftver-integráció és saját fejlesztésű SEO motor.",
    author: {
      "@type": "Person",
      name: "Balog Norbert",
      jobTitle: "Webfejlesztő & AI Automatizációs Szakértő",
      url: "https://webdude.hu/szia-norbi-vagyok",
    },
    publisher: {
      "@type": "Organization",
      name: "WebDude.hu",
      url: "https://webdude.hu",
    },
    datePublished: "2026-09-08",
    dateModified: "2026-09-08",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://webdude.hu/munkak/btshop",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(techArticleSchema).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
