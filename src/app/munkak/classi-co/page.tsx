import { Metadata } from "next";
import ClassiCoClient from "./ClassiCoClient";

export const metadata: Metadata = {
  title: "Classi-co.hu Esettanulmány — Teljes Körű Céges Weboldal Fejlesztés | WebDude",
  description: "Classi-co.hu weboldal fejlesztés: WordPress alapú céges weboldal, tartalomgyártás, SEO optimalizálás, Google Search Console és Analytics bekötés.",
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
    description: "WordPress alapú weboldal tervezése, tartalomgyártással, SEO optimalizálással és analytics bekötéssel.",
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
    description: "WordPress alapú weboldal tervezése, tartalomgyártással, SEO optimalizálással és analytics bekötéssel.",
    images: ["https://webdude.hu/assets/banners/webdude-hero.webp"],
  },
};

export default function ClassiCoCaseStudy() {
  // ─── JSON-LD Sémák (Server Component szinten injektálva) ────────────────
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Classi-co.hu — Teljes Körű Céges Weboldal Fejlesztés",
    description: "Classi-co.hu weboldal fejlesztés: WordPress alapú céges weboldal, tartalomgyártás, SEO optimalizálás, Google Search Console és Analytics bekötés.",
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
      "@id": "https://webdude.hu/munkak/classi-co",
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
    description: "Prémium webfejlesztési és AI automatizációs szolgáltatás Kecskeméten.",
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
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── ClassiCo Client Component ─────────────────────────────────────────── */}
      <ClassiCoClient />
    </>
  );
}
