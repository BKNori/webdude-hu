import type { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "AI Műhely Katalógus | WebDude",
  description:
    "Teljes 14 modulos AI Műhely arzenál plusz Kristófka munkafolyamat. Professzionális eszközök branding, tartalom, dizájn, technikai és workflow feladatokhoz.",
  alternates: {
    canonical: "https://webdude.hu/ai-megoldasok/ai-muhely",
  },
  openGraph: {
    title: "AI Műhely Katalógus | WebDude",
    description:
      "Teljes 14 modulos AI Műhely arzenál plusz Kristófka munkafolyamat. Professzionális eszközök branding, tartalom, dizájn, technikai és workflow feladatokhoz.",
    url: "https://webdude.hu/ai-megoldasok/ai-muhely",
    siteName: "WebDude",
    images: [
      {
        url: "/og/ai-muhely.jpg",
        width: 1200,
        height: 630,
        alt: "WebDude AI Műhely Katalógus",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Műhely Katalógus | WebDude",
    description:
      "Teljes 14 modulos AI Műhely arzenál plusz Kristófka munkafolyamat. Professzionális eszközök branding, tartalom, dizájn, technikai és workflow feladatokhoz.",
    images: ["/og/ai-muhely.jpg"],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AI Műhely Katalógus",
  description:
    "Teljes 14 modulos AI Műhely arzenál plusz Kristófka munkafolyamat. Professzionális eszközök branding, tartalom, dizájn, technikai és workflow feladatokhoz.",
  image: "https://webdude.hu/og/ai-muhely.jpg",
  brand: {
    "@type": "Brand",
    "@id": "https://webdude.hu/#organization",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/ai-megoldasok/ai-muhely",
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
  { name: "AI Megoldások", url: "/ai-megoldasok" },
  { name: "AI Műhely Katalógus", url: "/ai-megoldasok/ai-muhely" },
]);

export default function AiMuhelyLayout({
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
