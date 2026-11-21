import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Bejelentkezés | WebDude Portál",
  description: "Zárt ügyfél- és adminisztrációs bejelentkezési felület.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
