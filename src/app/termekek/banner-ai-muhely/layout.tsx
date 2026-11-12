import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Banner AI Műhely | WebDude",
  description:
    "Konverziófókuszú banner tervezés Midjourney v6 Master promptokkal. 90/8/2 színarány és prémium optikai beállítások. Egyedi árajánlat kérése.",
  alternates: {
    canonical: "https://webdude.hu/termekek/banner-ai-muhely",
  },
  openGraph: {
    title: "Banner AI Műhely | WebDude",
    description:
      "Konverziófókuszú banner tervezés Midjourney v6 Master promptokkal. 90/8/2 színarány és prémium optikai beállítások. Egyedi árajánlat kérése.",
    url: "https://webdude.hu/termekek/banner-ai-muhely",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-og.jpg",
        width: 1200,
        height: 630,
        alt: "Banner AI Műhely",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Banner AI Műhely | WebDude",
    description:
      "Konverziófókuszú banner tervezés Midjourney v6 Master promptokkal. 90/8/2 színarány és prémium optikai beállítások. Egyedi árajánlat kérése.",
    images: ["/og/webdude-og.jpg"],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Banner AI Műhely",
  description:
    "Professzionális banner tervező eszköz AI-vel. Minimalista, modern, elegáns és playful stílusú bannerek generálása. Social media és weboldal bannerek másodpercek alatt.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    "@id": "https://webdude.hu/#organization",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/banner-ai-muhely",
    seller: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude.hu",
    },
    description: "Egyedi árajánlat kérése",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "31",
  },
  founder: {
    "@type": "Person",
    "@id": "https://webdude.hu/#person",
    name: "Balog Norbert",
    description: "26 év grafikai tervezési és 16 év webfejlesztői tapasztalat",
  },
} as const;

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Főoldal", url: "/" },
  { name: "Termékek", url: "/termekek" },
  { name: "Banner AI Műhely", url: "/termekek/banner-ai-muhely" },
]);

export default function BannerAIMuhelyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
