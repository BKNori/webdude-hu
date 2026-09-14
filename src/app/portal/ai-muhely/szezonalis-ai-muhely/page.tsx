import React from "react";
import { Metadata } from "next";
import SeasonalWorkshopGenerator from "@/components/organisms/SeasonalWorkshopGenerator";

export const metadata: Metadata = {
  title: "Szezonalis AI Műhely | WebDude",
  description:
    "Professzionális szezonális kampányok Norbi 16+ éves marketing és vizuális tervezési szakértelmével. Kampánygrafikák, hangulatok és promóciós szövegek.",
};

export default function SeasonalToolPage() {
  return <SeasonalWorkshopGenerator />;
}
