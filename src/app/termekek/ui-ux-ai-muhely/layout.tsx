import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI/UX AI Műhely - WebDude.hu",
  description:
    "UI/UX AI Műhely: UI/UX design és wireframe generálás AI eszközökkel. Konverziófókuszú interface design és user experience optimalizáció.",
  openGraph: {
    title: "UI/UX AI Műhely - WebDude.hu",
    description:
      "UI/UX AI Műhely: UI/UX design és wireframe generálás AI eszközökkel.",
    url: "https://webdude.hu/termekek/ui-ux-ai-muhely",
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

export default function UIUXAIMuhelyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
