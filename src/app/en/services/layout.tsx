import { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import { SITE_URL } from "@/lib/i18n";

const PAGE_URL = `${SITE_URL}/en/services`;

/**
 * EN services szerveroldali layout — a metaadatok és a JSON-LD sémák
 * kizárólag itt élnek (AEO szabály: kliens komponensből tilos exportálni).
 */
export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary("en");
  const title = dictionary.services.page.title;
  const description = dictionary.services.page.description;

  return {
    title,
    description,
    keywords: [
      "web development",
      "SEO optimization",
      "AI automation",
      "graphic design",
      "WordPress development",
      "e-commerce development",
      "marketing lead generation",
      "SME digital solutions",
    ],
    alternates: {
      canonical: PAGE_URL,
      languages: {
        "hu-HU": `${SITE_URL}/szolgaltatasok`,
        "en-US": PAGE_URL,
        "x-default": `${SITE_URL}/szolgaltatasok`,
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

export default function EnServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
