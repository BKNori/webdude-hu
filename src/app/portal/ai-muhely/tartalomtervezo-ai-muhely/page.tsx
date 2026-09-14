import React from "react";
import { Metadata } from "next";
import ContentWorkshopGenerator from "@/components/organisms/ContentWorkshopGenerator";

export const metadata: Metadata = {
  title: "Tartalomtervező AI Műhely | WebDude",
  description:
    "Professzionális tartalomtervezés Norbi 16+ éves tartalomstratégiai és vizuális tervezési szakértelmével. SEO optimalizált, konverziófókuszú és Cyber-Arany dizájn.",
};

export default function ContentToolPage() {
  return <ContentWorkshopGenerator />;
}
