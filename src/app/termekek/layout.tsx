import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prémium AI & Automatizációs Megoldások | WebDude",
  description:
    "Kész, azonnal integrálható AI munkafolyamatok, webfejlesztési kiegészítők és CRO eszközök vállalkozásoknak.",
  alternates: {
    canonical: "https://webdude.hu/termekek",
  },
};

export default function TermekekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
