import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tartalomtervező AI Műhely - WebDude.hu",
  description:
    "Tartalomtervező AI Műhely: Tartalom és vizuális tervezés AI eszközökkel. Blog posztok, social media tartalmak és vizuálok generálása.",
  openGraph: {
    title: "Tartalomtervező AI Műhely - WebDude.hu",
    description:
      "Tartalomtervező AI Műhely: Tartalom és vizuális tervezés AI eszközökkel.",
    url: "https://webdude.hu/termekek/tartalomtervezo-ai-muhely",
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

export default function TartalomtervezoAIMuhelyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
