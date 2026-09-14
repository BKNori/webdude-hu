import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "AI Megoldások | WebDude - AI Automatizáció, Workflow és Prompt Engineering",
  description:
    "AI alapú automatizációs rendszerek, workflow kialakítás és prompt engineering szolgáltatások. Növelje a hatékonyságot AI megoldásokkal: AI workflow, AI kép és videó generálás, AI prompt engineering.",
  keywords: [
    "AI automatizáció",
    "AI workflow",
    "prompt engineering",
    "AI képgenerálás",
    "AI videó generálás",
    "ChatGPT integráció",
    "AI asszisztens",
    "mesterséges intelligencia",
  ],
  alternates: {
    canonical: "https://webdude.hu/ai-megoldasok",
  },
  openGraph: {
    title:
      "AI Megoldások | WebDude - AI Automatizáció, Workflow és Prompt Engineering",
    description:
      "AI alapú automatizációs rendszerek, workflow kialakítás és prompt engineering szolgáltatások.",
    url: "https://webdude.hu/ai-megoldasok",
    siteName: "WebDude",
    images: [
      {
        url: "/assets/banners/banner-webdde-copy-2.webp",
        width: 1920,
        height: 1080,
        alt: "AI automatizáció és workflow megoldások",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Megoldások | WebDude - AI Automatizáció, Workflow és Prompt Engineering",
    description:
      "AI alapú automatizációs rendszerek, workflow kialakítás és prompt engineering szolgáltatások.",
    images: ["/assets/banners/banner-webdde-copy-2.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "WebDude AI Megoldások",
  description:
    "AI alapú automatizációs rendszerek, workflow kialakítás és prompt engineering szolgáltatások.",
  provider: {
    "@type": "Person",
    name: "Norbi (WebDude)",
    url: "https://webdude.hu",
  },
  areaServed: {
    "@type": "Country",
    name: "Hungary",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Megoldások",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Workflow Kialakítás",
          description:
            "Egyedi AI workflow rendszerek tervezése és implementálása, amelyek automatizálják az üzleti folyamatokat és növelik a hatékonyságot.",
        },
        position: 1,
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Kép és Videó Generálás",
          description:
            "AI alapú kép és videó generálás marketing anyagokhoz, social media tartalmakhoz és weboldalakhoz.",
        },
        position: 2,
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Prompt Engineering",
          description:
            "Professzionális prompt engineering szolgáltatás, amely optimalizálja az AI modellek teljesítményét.",
        },
        position: 3,
      },
    ],
  },
};

export default function AIMSolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
