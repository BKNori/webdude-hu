import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { buildEnJsonLd, serializeJsonLd } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/i18n";

const PAGE_URL = `${SITE_URL}/en/contact`;

/**
 * EN contact szerveroldali layout — a metaadatok és a JSON-LD sémák
 * kizárólag itt élnek (AEO szabály: kliens komponensből tilos exportálni).
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact & Consultation | WebDude | Direct Discussion",
    description:
      "Request a quote directly from Norbi! No project manager layer: 26 years of experience in designing and developing Next.js systems as a remote partner.",
    alternates: {
      canonical: PAGE_URL,
      languages: {
        "hu-HU": `${SITE_URL}/kapcsolat`,
        "en-US": PAGE_URL,
        "x-default": `${SITE_URL}/kapcsolat`,
      },
    },
    openGraph: {
      title: "Contact & Consultation | WebDude | Direct Discussion",
      description:
        "Request a quote directly from Norbi! No project manager layer: 26 years of experience in designing and developing Next.js systems as a remote partner.",
      url: PAGE_URL,
      siteName: "WebDude",
      images: [
        {
          url: "/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp",
          width: 1920,
          height: 1080,
          alt: "WebDude contact - web development and graphic design",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function EnContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dictionary = await getDictionary("en");
  const schemas = buildEnJsonLd(dictionary);

  return (
    <>
      {/* EN JSON-LD sémák — XSS-védetten serializálva (AEO / E-E-A-T) */}
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
