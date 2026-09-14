import React from "react";
import { Metadata } from "next";
import PosterWorkshopGenerator from "@/components/organisms/PosterWorkshopGenerator";

export const metadata: Metadata = {
  title: "Poster AI Műhely | WebDude",
  description:
    "Nyomdai kész poszter tervezés CMYK színértékekkel, bleed és safe zone irányelvekkel. A4/A3/A2/A1 méretarányok és prémium tipográfia.",
};

export default function PosterToolPage() {
  return <PosterWorkshopGenerator />;
}
