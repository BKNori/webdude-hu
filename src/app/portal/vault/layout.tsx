import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digitális Széf | WebDude Ügyfélportál",
  description:
    "Zárt ügyfélkapu — projekt dokumentumok és megosztott fájlok biztonságos tárolása.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
