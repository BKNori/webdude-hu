import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { buildEnJsonLd, serializeJsonLd } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/i18n";

const PAGE_URL = `${SITE_URL}/en`;

/**
 * EN főoldal szerveroldali layout — a metaadatok és a JSON-LD sémák
 * kizárólag itt élnek (AEO szabály: kliens komponensből tilos exportálni).
 */
export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary("en");
  const title = dictionary.home.meta.title;
  const description = dictionary.home.meta.description;

  return {
    title,
    description,
    keywords: [
      "premium web development",
      "AI automation",
      "Next.js",
      "React 19",
      "Firebase",
      "web development agency",
      "custom web applications",
      "SEO & AEO",
    ],
    alternates: {
      canonical: PAGE_URL,
      languages: {
        "hu-HU": SITE_URL,
        "en-US": PAGE_URL,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      title,
      description,
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og/webdude-og.jpg`],
    },
  };
}

export default async function EnLayout({
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
