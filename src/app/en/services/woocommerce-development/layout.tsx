import { Metadata } from "next";
import { SITE_URL } from "@/lib/i18n";

const PAGE_URL = `${SITE_URL}/en/services/woocommerce-development`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "WooCommerce Development & E-commerce | WebDude",
    description:
      "16 years of experience in WooCommerce development and optimisation. Conversion-focused e-commerce systems, payment integrations and full support.",
    keywords:
      "WooCommerce webshop, WooCommerce development, e-commerce system, web development, WooCommerce optimisation, WordPress webshop",
    alternates: {
      canonical: PAGE_URL,
      languages: {
        "hu-HU": `${SITE_URL}/szolgaltatasok/woocommerce-webshop-keszites`,
        "en-US": PAGE_URL,
        "x-default": `${SITE_URL}/szolgaltatasok/woocommerce-webshop-keszites`,
      },
    },
    openGraph: {
      title: "WooCommerce Development & E-commerce | WebDude",
      description:
        "16 years of experience in WooCommerce webshop development and optimisation.",
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
      title: "WooCommerce Development & E-commerce | WebDude",
      description:
        "16 years of experience in WooCommerce webshop development and optimisation.",
      images: [`${SITE_URL}/og/webdude-og.jpg`],
    },
  };
}

export default function EnWooCommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
