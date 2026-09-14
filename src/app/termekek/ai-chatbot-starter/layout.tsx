import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chatbot Starter - WebDude.hu",
  description:
    "AI Chatbot Starter: Kész AI chatbot rendszer, amely azonnal integrálható bármilyen weboldalra. Magyar nyelvű AI chatbot, egyedi knowledge base, 24/7 ügyfélszolgálat.",
  openGraph: {
    title: "AI Chatbot Starter - WebDude.hu",
    description: "AI Chatbot Starter: Kész AI chatbot rendszer.",
    url: "https://webdude.hu/termekek/ai-chatbot-starter",
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
  name: "AI Chatbot Starter",
  description:
    "Kész AI chatbot rendszer, amely azonnal integrálható bármilyen weboldalra. Magyar nyelvű AI chatbot, egyedi knowledge base, 24/7 ügyfélszolgálat.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    price: "79000",
    priceCurrency: "HUF",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/ai-chatbot-starter",
    priceValidUntil: "2027-12-31",
    seller: {
      "@type": "Organization",
      name: "WebDude.hu",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "18",
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
