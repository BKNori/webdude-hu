import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Norbi – WebDude | 26 év tapasztalat, egyenes kommunikáció",
  description:
    "Balog Norbert (WebDude) vagyok. Grafikai tervezésből indultam, ma már komplex Next.js rendszereket és AI automatizációkat építek Kecskemétről.",
  alternates: {
    canonical: "https://webdude.hu/szia-norbi-vagyok",
  },
};

export default function SziaNorbiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
