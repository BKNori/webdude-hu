import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logo AI Műhely - WebDude.hu",
  description:
    "Logo AI Műhely: Egyedi arculattervezés és logo generálás Midjourney v6 Master promptokkal. Prémium vizuális identitás kialakítása.",
  openGraph: {
    title: "Logo AI Műhely - WebDude.hu",
    description: "Logo AI Műhely: Egyedi arculattervezés és logo generálás.",
    url: "https://webdude.hu/termekek/logo-ai-muhely",
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
  name: "Logo AI Műhely",
  description:
    "Egyedi arculattervezés és logo generálás Midjourney v6 Master promptokkal. Prémium vizuális identitás kialakítása.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    price: "59000",
    priceCurrency: "HUF",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/logo-ai-muhely",
    priceValidUntil: "2027-12-31",
    seller: {
      "@type": "Organization",
      name: "WebDude.hu",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "19",
  },
};

export default function LogoAIMuhelyLayout({
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
