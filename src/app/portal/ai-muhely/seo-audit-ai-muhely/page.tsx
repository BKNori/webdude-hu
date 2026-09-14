import React from "react";
import { Metadata } from "next";
import SeoWorkshopGenerator from "@/components/organisms/SeoWorkshopGenerator";

export const metadata: Metadata = {
  title: "SEO Audit AI Műhely | WebDude",
  description:
    "Professzionális SEO és AEO audit Norbi 16+ éves CMS és SEO szakértelmével. Schema.org strukturált adatok, 95+ Lighthouse score és AI keresőmotor optimalizálás.",
};

export default function SeoToolPage() {
  return <SeoWorkshopGenerator />;
}
