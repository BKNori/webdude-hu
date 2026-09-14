import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Audit AI Műhely - WebDude.hu",
  description:
    "SEO Audit AI Műhely: SEO és AEO audit vizualizáció AI eszközökkel. Lighthouse score tracking, kulcsszó stratégia és AI válasz motor optimalizáció.",
  openGraph: {
    title: "SEO Audit AI Műhely - WebDude.hu",
    description:
      "SEO Audit AI Műhely: SEO és AEO audit vizualizáció AI eszközökkel.",
    url: "https://webdude.hu/termekek/seo-audit-ai-muhely",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
};

export default function SEOAuditAIMuhelyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
