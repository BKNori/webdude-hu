import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Workflow Starter Pack - WebDude.hu",
  description:
    "AI Workflow Starter Pack: Kész AI workflow sablonok és promptok, amelyek azonnal használhatók. 10+ kész AI workflow sablon, GPT-4 és Claude integráció.",
  openGraph: {
    title: "AI Workflow Starter Pack - WebDude.hu",
    description:
      "AI Workflow Starter Pack: Kész AI workflow sablonok és promptok.",
    url: "https://webdude.hu/termekek/ai-workflow-starter-pack",
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
  name: "AI Workflow Starter Pack",
  description:
    "Spórolj heti 15 órát manuális munkával. Automatizáld email kampányokat, lead generálást és ügyfélszolgálatot kész AI workflow sablonokkal. 3.4x organikus elérés, 300 DPI nyomdakész outputok.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    price: "99000",
    priceCurrency: "HUF",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/ai-workflow-starter-pack",
    priceValidUntil: "2027-12-31",
    seller: {
      "@type": "Organization",
      name: "WebDude.hu",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "23",
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
