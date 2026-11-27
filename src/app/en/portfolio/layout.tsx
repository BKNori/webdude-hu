import { Metadata } from "next";
import { SITE_URL } from "@/lib/i18n";

const PAGE_URL = `${SITE_URL}/en/portfolio`;

/**
 * EN portfolio szerveroldali layout — kizárólag a metaadatok élnek itt.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Portfolio & Case Studies | WebDude",
    description:
      "Real client results, conversion-optimised Next.js websites and custom digital systems. 26 years of experience, measurable growth.",
    keywords:
      "web developer portfolio, case studies, Next.js projects, WordPress development, premium web development, graphic design, brand identity",
    alternates: {
      canonical: PAGE_URL,
      languages: {
        "hu-HU": `${SITE_URL}/munkak`,
        "en-US": PAGE_URL,
        "x-default": `${SITE_URL}/munkak`,
      },
    },
    openGraph: {
      title: "Portfolio & Case Studies | WebDude",
      description:
        "Real client results, conversion-optimised Next.js websites and custom digital systems. 26 years of experience, measurable growth.",
      url: PAGE_URL,
      siteName: "WebDude",
      images: [
        {
          url: `${SITE_URL}/og/webdude-og.jpg`,
          width: 1200,
          height: 630,
          alt: "WebDude portfolio and case studies",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Portfolio & Case Studies | WebDude",
      description:
        "Real client results, conversion-optimised Next.js websites and custom digital systems. 26 years of experience, measurable growth.",
      images: [`${SITE_URL}/og/webdude-og.jpg`],
    },
  };
}

export default function EnPortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
