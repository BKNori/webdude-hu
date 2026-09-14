import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Szia Norbi Vagyok – WebDude | 26 Év Grafikai és 16 Év Webfejlesztői Tapasztalat",
  description:
    "Ismerd meg Norbit, a WebDude alapítóját. 26 év grafikai és 16 év webfejlesztői tapasztalattal rendelkező digitális szakember. Egyedi weboldalak, arculattervezés és AI automatizáció Kecskemétről.",
  keywords:
    "Norbi WebDude, webfejlesztő Kecskemét, grafikai tervező, AI automatizáció, arculattervezés, Next.js fejlesztő",
  alternates: {
    canonical: "https://webdude.hu/szia-norbi-vagyok",
  },
  openGraph: {
    title:
      "Szia Norbi Vagyok – WebDude | 26 Év Grafikai és 16 Év Webfejlesztői Tapasztalat",
    description:
      "Ismerd meg Norbit, a WebDude alapítóját. 26 év grafikai és 16 év webfejlesztői tapasztalattal rendelkező digitális szakember.",
    url: "https://webdude.hu/szia-norbi-vagyok",
    siteName: "WebDude",
    images: [
      {
        url: "/assets/personal/webdude-kep.webp",
        width: 1200,
        height: 630,
        alt: "Norbi WebDude - webfejlesztő és grafikai tervező",
      },
    ],
    locale: "hu_HU",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Szia Norbi Vagyok – WebDude | 26 Év Grafikai és 16 Év Webfejlesztői Tapasztalat",
    description:
      "Ismerd meg Norbit, a WebDude alapítóját. 26 év grafikai és 16 év webfejlesztői tapasztalattal rendelkező digitális szakember.",
    images: ["/assets/personal/webdude-kep.webp"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Norbi (WebDude)",
    jobTitle: "Webfejlesztő és Grafikai Tervező",
    description:
      "16+ év webfejlesztő és 26+ év grafikai tapasztalattal rendelkező digitális szakember. Egyedi weboldalak, arculattervezés és AI automatizáció Kecskemétről. Közvetlen együttműködés, nincs ügynökségi bonyolultság.",
    url: "https://webdude.hu/szia-norbi-vagyok",
    image: "https://webdude.hu/assets/personal/webdude-kep.webp",
    worksFor: {
      "@type": "Organization",
      name: "WebDude.hu",
      url: "https://webdude.hu",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kecskemét",
      addressCountry: "HU",
    },
    sameAs: [
      "https://www.facebook.com/webdude.hu",
      "https://www.linkedin.com/company/webdude-hu",
    ],
    knowsAbout: [
      "Webfejlesztés",
      "Grafikai tervezés",
      "WordPress",
      "AI automatizáció",
      "Arculattervezés",
      "Weboldal készítés",
    ],
  };

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
