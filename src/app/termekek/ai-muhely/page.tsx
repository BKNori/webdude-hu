import React from "react";
import { Metadata } from "next";
import AIWorkshopCollection from "@/components/organisms/AIWorkshopCollection";

export const metadata: Metadata = {
  title: "AI Műhely Katalógus | WebDude",
  description:
    "Teljes 14 modulos AI Műhely arzenál plusz Kristófka munkafolyamat. Professzionális eszközök branding, tartalom, design, technikai és workflow feladatokhoz.",
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
  openGraph: {
    title: "AI Műhely Katalógus | WebDude",
    description:
      "Teljes 14 modulos AI Műhely arzenál plusz Kristófka munkafolyamat. Professzionális eszközök branding, tartalom, design, technikai és workflow feladatokhoz.",
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
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AI Műhely Katalógus",
  description:
    "Teljes 14 modulos AI Műhely arzenál plusz Kristófka munkafolyamat. Professzionális eszközök branding, tartalom, design, technikai és workflow feladatokhoz.",
  image: "https://webdude.hu/og/ai-muhely.jpg",
  brand: {
    "@type": "Brand",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "HUF",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/ai-muhely",
    priceValidUntil: "2027-12-31",
    seller: {
      "@type": "Organization",
      name: "WebDude.hu",
    },
    description: "Egyedi árajánlat kérése",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "31",
  },
};

export default function AiWorkshopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />
      <AIWorkshopCollection />
    </>
  );
}
