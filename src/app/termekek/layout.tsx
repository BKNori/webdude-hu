import type { Metadata } from "next";

/**
 * `/termekek` metaadat réteg (Server Layout).
 * - Title: 55 karakter (50–60 kar. tartomány)
 * - Description: 151 karakter (150–160 kar. tartomány)
 * - Országos/online fókusz a látható meta szövegekben, Zéró Fix Ár.
 * - A gyűjtőoldal JSON-LD sémái (`CollectionPage`, `ItemList`, `BreadcrumbList`,
 *   `FAQPage`) a `src/app/termekek/page.tsx`-ben renderelődnek, hogy ne
 *   öröklődjenek le duplikátumként a `/termekek/<slug>` gyermekoldalakra.
 */
export const metadata: Metadata = {
  title: "Prémium AI Eszközök, Műhelyek & Automatizáció | WebDude",
  description:
    "Prémium AI munkafolyamatok, automatizációs eszközök, CRO megoldások és AI műhely modulok KKV-knak. Egyedi árajánlat kérése a projekted igényei szerint.",
  keywords: [
    "AI megoldások vállalkozásoknak",
    "AI munkafolyamat automatizáció",
    "WebDude AI Műhely",
    "SEO és AEO audit",
    "CRO optimalizálás",
    "magyar AI chatbot",
    "Midjourney prompt generátor",
    "vállalati AI eszközök online",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://webdude.hu/termekek",
  },
  openGraph: {
    title: "Prémium AI Eszközök, Műhelyek & Automatizáció | WebDude",
    description:
      "Prémium AI munkafolyamatok, automatizációs eszközök, CRO megoldások és AI műhely modulok KKV-knak. Egyedi árajánlat kérése a projekted igényei szerint.",
    url: "https://webdude.hu/termekek",
    siteName: "WebDude",
    images: [
      {
        url: "/og/webdude-og.jpg",
        width: 1200,
        height: 630,
        alt: "Prémium AI Eszközök, Műhelyek és Automatizáció — WebDude",
      },
    ],
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prémium AI Eszközök, Műhelyek & Automatizáció | WebDude",
    description:
      "Prémium AI munkafolyamatok, automatizációs eszközök, CRO megoldások és AI műhely modulok KKV-knak. Egyedi árajánlat kérése a projekted igényei szerint.",
    images: ["/og/webdude-og.jpg"],
  },
};

export default function TermekekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
