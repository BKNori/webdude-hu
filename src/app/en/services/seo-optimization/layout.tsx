import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { buildEnJsonLd, serializeJsonLd } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/i18n";

const PAGE_URL = `${SITE_URL}/en/services/seo-optimization`;

/**
 * EN SEO optimization szerveroldali layout — a metaadatok és a JSON-LD sémák
 * kizárólag itt élnek (AEO szabály: kliens komponensből tilos exportálni).
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "SEO Specialist | Technical SEO and Content | WebDude",
    description:
      "Technical SEO audit, keyword research, content strategy and local SEO for businesses. Find out what is preventing your website from ranking better on Google.",
    keywords:
      "SEO optimisation, search engine optimisation, technical SEO, content strategy, Google ranking improvement, SEO specialist, organic traffic",
    alternates: {
      canonical: PAGE_URL,
      languages: {
        "hu-HU": `${SITE_URL}/szolgaltatasok/seo-optimalizalas`,
        "en-US": PAGE_URL,
        "x-default": `${SITE_URL}/szolgaltatasok/seo-optimalizalas`,
      },
    },
    openGraph: {
      title: "SEO Specialist | Technical SEO and Content | WebDude",
      description:
        "Technical SEO audit, keyword research, content strategy and local SEO for businesses.",
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

export default async function EnSeoOptimizationLayout({
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
