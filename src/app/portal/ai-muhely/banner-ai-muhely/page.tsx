import React from "react";
import { Metadata } from "next";
import BannerWorkshopGenerator from "@/components/organisms/BannerWorkshopGenerator";

export const metadata: Metadata = {
  title: "Banner AI Műhely | WebDude",
  description:
    "Konverziófókuszú banner tervezés Midjourney v6 Master promptokkal. 90/8/2 színarány és prémium optikai beállítások.",
};

export default function BannerToolPage() {
  return <BannerWorkshopGenerator />;
}
