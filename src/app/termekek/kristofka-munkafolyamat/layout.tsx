import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kristófka Munkafolyamat - WebDude.hu",
  description:
    "Kristófka Munkafolyamat: Ingatlanbefektetői pitch generálás PDF alaprajzokból és kontextus paraméterekből. Strategist-Pro szintű AI workflow.",
  openGraph: {
    title: "Kristófka Munkafolyamat - WebDude.hu",
    description: "Kristófka Munkafolyamat: Ingatlanbefektetői pitch generálás.",
    url: "https://webdude.hu/termekek/kristofka-munkafolyamat",
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
  name: "Kristófka Munkafolyamat",
  description:
    "Ingatlanbefektetői pitch generálás PDF alaprajzokból és kontextus paraméterekből. Strategist-Pro szintű AI workflow ingatlan befektetőknek.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    price: "199000",
    priceCurrency: "HUF",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/kristofka-munkafolyamat",
    priceValidUntil: "2027-12-31",
    seller: {
      "@type": "Organization",
      name: "WebDude.hu",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "8",
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
