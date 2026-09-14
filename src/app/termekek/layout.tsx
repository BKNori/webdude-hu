import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termékek – WebDude | AI Műhelyek, SEO Audit és Workflow Sablonok",
  description:
    "Prémium AI műhelyek, SEO audit szoftverek és workflow sablonok kis- és középvállalkozásoknak. Dupláld meg a hatékonyságot AI automatizációval.",
  keywords:
    "AI műhely, SEO audit, workflow sablonok, AI automatizáció, webfejlesztő eszközök, KKV digitális megoldások",
  alternates: {
    canonical: "https://webdude.hu/termekek",
  },
  openGraph: {
    title: "Termékek – WebDude | AI Műhelyek, SEO Audit és Workflow Sablonok",
    description:
      "Prémium AI műhelyek, SEO audit szoftverek és workflow sablonok kis- és középvállalkozásoknak.",
    url: "https://webdude.hu/termekek",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-products-og.jpg",
        width: 1200,
        height: 630,
        alt: "WebDude termékek - AI műhelyek és SEO audit",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Termékek – WebDude | AI Műhelyek, SEO Audit és Workflow Sablonok",
    description:
      "Prémium AI műhelyek, SEO audit szoftverek és workflow sablonok kis- és középvállalkozásoknak.",
    images: ["/og/webdude-products-og.jpg"],
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
