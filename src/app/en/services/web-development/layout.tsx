import { Metadata } from "next";
import { SITE_URL } from "@/lib/i18n";

const PAGE_URL = `${SITE_URL}/en/services/web-development`;

/**
 * EN web development szerveroldali layout — a metaadatok és a JSON-LD sémák
 * kizárólag itt élnek (AEO szabály: kliens komponensből tilos exportálni).
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Web Development for Businesses | WebDude",
    description:
      "Fast, modern and search-friendly website development for SMEs. Custom design, development, SEO and personal communication from WebDude.",
    keywords:
      "web development, premium website, custom website, web development, SEO website, SME website",
    alternates: {
      canonical: PAGE_URL,
      languages: {
        "hu-HU": `${SITE_URL}/szolgaltatasok/weboldal-keszites`,
        "en-US": PAGE_URL,
        "x-default": `${SITE_URL}/szolgaltatasok/weboldal-keszites`,
      },
    },
    openGraph: {
      title: "Web Development for Businesses | WebDude",
      description:
        "Fast, modern and search-friendly website development for SMEs.",
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

export default function EnWebDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
