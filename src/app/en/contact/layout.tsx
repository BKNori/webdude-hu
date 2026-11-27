import { Metadata } from "next";
import { SITE_URL } from "@/lib/i18n";

const PAGE_URL = `${SITE_URL}/en/contact`;

/**
 * EN contact szerveroldali layout — kizárólag a metaadatok élnek itt.
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
          url: "/assets/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp",
          width: 1920,
          height: 1080,
          alt: "WebDude contact - web development and graphic design",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact & Consultation | WebDude | Direct Discussion",
      description:
        "Request a quote directly from Norbi! No project manager layer: 26 years of experience in designing and developing Next.js systems as a remote partner.",
      images: [
        "/assets/banners/wordpress-weboldalak-keszitese-grafikai-tervezes.webp",
      ],
    },
  };
}

export default function EnContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
