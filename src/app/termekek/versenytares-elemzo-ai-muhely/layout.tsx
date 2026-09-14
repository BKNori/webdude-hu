import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Versenytárs Elemző AI Műhely - WebDude.hu",
  description:
    "Versenytárs Elemző AI Műhely: Versenytárs elemzés és stratégia AI eszközökkel. Piackutatás, versenytárs monitoring és stratégiai elemzés.",
  openGraph: {
    title: "Versenytárs Elemző AI Műhely - WebDude.hu",
    description:
      "Versenytárs Elemző AI Műhely: Versenytárs elemzés és stratégia AI eszközökkel.",
    url: "https://webdude.hu/termekek/versenytares-elemzo-ai-muhely",
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

export default function VersenytaresElemzoAIMuhelyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
