import React from "react";
import { Metadata } from "next";
import PresentationWorkshopGenerator from "@/components/organisms/PresentationWorkshopGenerator";

export const metadata: Metadata = {
  title: "Presentation AI Műhely | WebDude",
  description:
    "Professzionális prezentáció tervezés pitch deck, sales prezentáció és investor deck narratív struktúrával. Slide struktúra és vizuális hierarchia.",
};

export default function PresentationToolPage() {
  return <PresentationWorkshopGenerator />;
}
