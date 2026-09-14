import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Midjourney AI Műhely - WebDude.hu",
  description:
    "Midjourney AI Műhely: Midjourney v6 integráció prémium vizuálokhoz. 85mm G-Master optika, chiaroscuro lighting és Cyber-Dark aesthetic.",
  openGraph: {
    title: "Midjourney AI Műhely - WebDude.hu",
    description:
      "Midjourney AI Műhely: Midjourney v6 integráció prémium vizuálokhoz.",
    url: "https://webdude.hu/termekek/midjourney-ai-muhely",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Midjourney AI Műhely",
  description:
    "Midjourney v6 integráció prémium vizuálokhoz. 85mm G-Master optika, chiaroscuro lighting és Cyber-Dark aesthetic.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    price: "39000",
    priceCurrency: "HUF",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/midjourney-ai-muhely",
    priceValidUntil: "2027-12-31",
    seller: {
      "@type": "Organization",
      name: "WebDude.hu",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "16",
  },
};

export default function MidjourneyAIMuhelyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
