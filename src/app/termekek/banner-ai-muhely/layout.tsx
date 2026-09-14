import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banner AI Műhely - WebDude.hu",
  description:
    "Banner AI Műhely: Konverziófókuszú banner tervezés Midjourney v6 Master promptokkal. 90/8/2 színarány és prémium optikai beállítások.",
  openGraph: {
    title: "Banner AI Műhely - WebDude.hu",
    description: "Banner AI Műhely: Konverziófókuszú banner tervezés.",
    url: "https://webdude.hu/termekek/banner-ai-muhely",
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
  name: "Banner AI Műhely",
  description:
    "Konverziófókuszú banner tervezés Midjourney v6 Master promptokkal. 90/8/2 színarány és prémium optikai beállítások.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    price: "49000",
    priceCurrency: "HUF",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/banner-ai-muhely",
    priceValidUntil: "2027-12-31",
    seller: {
      "@type": "Organization",
      name: "WebDude.hu",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "21",
  },
};

export default function BannerAIMuhelyLayout({
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
