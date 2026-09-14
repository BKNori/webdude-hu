import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Szezonalis AI Műhely - WebDude.hu",
  description:
    "Szezonalis AI Műhely: Szezonalis grafikai kampányok AI eszközökkel. Ünnepi és szezonális vizuálok generálása Midjourney v6 Master promptokkal.",
  openGraph: {
    title: "Szezonalis AI Műhely - WebDude.hu",
    description:
      "Szezonalis AI Műhely: Szezonalis grafikai kampányok AI eszközökkel.",
    url: "https://webdude.hu/termekek/szezonalis-ai-muhely",
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

export default function SzezonalisAIMuhelyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
