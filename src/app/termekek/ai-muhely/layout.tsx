import React from "react";
import { Metadata } from "next";
import { buildBreadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "AI Műhely Katalógus | WebDude",
  description:
    "Teljes 14 modulos AI Műhely arzenál plusz Kristófka munkafolyamat. Professzionális eszközök branding, tartalom, dizájn, technikai és workflow feladatokhoz.",
  keywords: [
    "AI Műhely",
    "Logo AI Műhely",
    "Midjourney AI Műhely",
    "SEO Audit AI Műhely",
    "Tartalomtervező AI Műhely",
    "UI/UX AI Műhely",
    "Szezonalis AI Műhely",
    "Banner AI Műhely",
    "Poster AI Műhely",
    "Social Media AI Műhely",
    "CIP AI Műhely",
    "Presentation AI Műhely",
    "Icon Design AI Műhely",
    "Design System AI Műhely",
    "Kristófka Munkafolyamat",
    "WebDude AI Studio",
  ],
  alternates: {
    canonical: "https://webdude.hu/termekek/ai-muhely",
  },
  openGraph: {
    title: "AI Műhely Katalógus | WebDude",
    description:
      "Teljes 14 modulos AI Műhely arzenál plusz Kristófka munkafolyamat. Professzionális eszközök branding, tartalom, dizájn, technikai és workflow feladatokhoz.",
    type: "website",
    url: "https://webdude.hu/termekek/ai-muhely",
    images: [
      {
        url: "/og/ai-muhely.jpg",
        width: 1200,
        height: 630,
        alt: "WebDude AI Műhely Katalógus",
      },
    ],
    locale: "hu_HU",
    siteName: "WebDude",
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
    url: "https://webdude.hu/termekek/ai-muhely",
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
  { name: "AI Műhely Katalógus", url: "/termekek/ai-muhely" },
]);

export default function AiWorkshopLayout({
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
