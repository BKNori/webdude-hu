import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Prompt Sablonok | Grafikai AI Prompt Könyvtár | WebDude",
  description:
    "Professzionális, tesztelt AI prompt sablonok Midjourney, DALL-E és más AI képgenerálókhoz. Logo design, termékfotó, social media banner és weboldal hero promptok.",
  openGraph: {
    title: "AI Prompt Sablonok | Grafikai AI Prompt Könyvtár",
    description:
      "Professzionális, tesztelt AI prompt sablonok Midjourney, DALL-E és más AI képgenerálókhoz. Logo design, termékfotó, social media banner és weboldal hero promptok.",
    type: "website",
    url: "https://webdude.hu/ai-megoldasok/ai-prompt-sablonok",
    images: [
      {
        url: "/assets/banners/ai-design-hero.webp",
        width: 1200,
        height: 630,
        alt: "AI Prompt Sablonok",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Prompt Sablonok | Grafikai AI Prompt Könyvtár",
    description:
      "Professzionális, tesztelt AI prompt sablonok Midjourney, DALL-E és más AI képgenerálókhoz.",
    images: ["/assets/banners/ai-design-hero.webp"],
  },
  alternates: {
    canonical: "https://webdude.hu/ai-megoldasok/ai-prompt-sablonok",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI Prompt Sablonok",
  description:
    "Professzionális, tesztelt AI prompt sablonok Midjourney, DALL-E és más AI képgenerálókhoz. Logo design, termékfotó, social media banner és weboldal hero promptok.",
  url: "https://webdude.hu/ai-megoldasok/ai-prompt-sablonok",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SoftwareApplication",
        name: "Midjourney",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
      },
      {
        "@type": "SoftwareApplication",
        name: "DALL-E",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
      },
    ],
  },
  provider: {
    "@type": "Person",
    name: "Norbi",
    jobTitle: "Web Developer & AI Specialist",
    url: "https://webdude.hu",
  },
};

export default function AIPromptSablonokLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
