import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { buildEnJsonLd, serializeJsonLd } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/i18n";

const PAGE_URL = `${SITE_URL}/en/services/graphic-design`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Graphic Design and Brand Identity Nationwide | WebDude",
    description:
      "Logo, brand identity, marketing materials and digital graphic design in a unified visual system. 26 years of graphic design experience from WebDude.",
    keywords:
      "graphic design, brand identity, logo design, webdesign, UI/UX design, marketing graphics, nationwide",
    alternates: {
      canonical: PAGE_URL,
      languages: {
        "hu-HU": `${SITE_URL}/szolgaltatasok/grafikai-tervezes`,
        "en-US": PAGE_URL,
        "x-default": `${SITE_URL}/szolgaltatasok/grafikai-tervezes`,
      },
    },
    openGraph: {
      title: "Graphic Design and Brand Identity Nationwide | WebDude",
      description:
        "Logo, brand identity, marketing materials and digital graphic design in a unified visual system.",
      url: PAGE_URL,
      siteName: "WebDude",
      images: [
        {
          url: `${SITE_URL}/og/webdude-og.jpg`,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function EnGraphicDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dictionary = await getDictionary("en");
  const schemas = buildEnJsonLd(dictionary);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}
      {children}
    </>
  );
}
