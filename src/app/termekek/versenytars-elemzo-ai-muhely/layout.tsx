import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Versenytárs Elemző AI Műhely | WebDude",
  description:
    "Versenytárs vizuális, UX és CRO benchmarking AI eszközökkel: design audit, piaci rés-elemzés és pozicionálási stratégia. Egyedi árajánlat kérése most.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://webdude.hu/termekek/versenytars-elemzo-ai-muhely",
  },
  openGraph: {
    title: "Versenytárs Elemző AI Műhely | WebDude",
    description:
      "Versenytárs vizuális, UX és CRO benchmarking AI eszközökkel: design audit, piaci rés-elemzés és pozicionálási stratégia. Egyedi árajánlat kérése most.",
    url: "https://webdude.hu/termekek/versenytars-elemzo-ai-muhely",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-og.jpg",
        width: 1200,
        height: 630,
        alt: "Versenytárs Elemző AI Műhely",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Versenytárs Elemző AI Műhely | WebDude",
    description:
      "Versenytárs vizuális, UX és CRO benchmarking AI eszközökkel: design audit, piaci rés-elemzés és pozicionálási stratégia. Egyedi árajánlat kérése most.",
    images: ["/og/webdude-og.jpg"],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Versenytárs Elemző AI Műhely",
  description:
    "Versenytárs vizuális, UX és CRO benchmarking AI eszközökkel: design audit, piaci rés-elemzés és pozicionálási stratégia. Egyedi árajánlat kérése most.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    "@id": "https://webdude.hu/#organization",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/versenytars-elemzo-ai-muhely",
    seller: {
      "@type": "Organization",
      "@id": "https://webdude.hu/#organization",
      name: "WebDude",
      foundingDate: "2009",
      telephone: "+36 70 323 8003",
      email: "hello@webdude.hu",
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
    alternateName: ["Balog Norbi", "WebDude"],
    jobTitle: "Full-Stack Webfejlesztő, Art Director & AI Automatizációs Szakértő",
    description: "26 év tervezőgrafikai és 16 év webfejlesztői tapasztalat",
  },
} as const;

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Főoldal", url: "/" },
  { name: "Termékek", url: "/termekek" },
  { name: "Versenytárs Elemző AI Műhely", url: "/termekek/versenytars-elemzo-ai-muhely" },
]);

export default function ProductRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
