import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRO Booster Kit - WebDude.hu",
  description:
    "CRO Booster Kit: Konverzió optimalizáló eszközök és sablonok. A/B tesztelés, heatmaps, és user journey optimalizáció.",
  openGraph: {
    title: "CRO Booster Kit - WebDude.hu",
    description:
      "CRO Booster Kit: Konverzió optimalizáló eszközök és sablonok.",
    url: "https://webdude.hu/termekek/cro-booster-kit",
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
  name: "CRO Booster Kit",
  description:
    "Konverzió optimalizáló eszközök és sablonok. A/B tesztelés, heatmaps, és user journey optimalizáció a konverzió növeléséhez.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    price: "149000",
    priceCurrency: "HUF",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/cro-booster-kit",
    priceValidUntil: "2027-12-31",
    seller: {
      "@type": "Organization",
      name: "WebDude.hu",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "12",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
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
