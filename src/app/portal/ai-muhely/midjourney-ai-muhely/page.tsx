import React from "react";
import { Metadata } from "next";
import MidjourneyWorkshopGenerator from "@/components/organisms/MidjourneyWorkshopGenerator";

export const metadata: Metadata = {
  title: "Midjourney AI Műhely | WebDude",
  description:
    "Prémium Midjourney v6 prompt generálás Norbi 26 éves vizuális és fotográfiai szakértelmével. 85mm G-Master optika, volumetric lighting és prémium kompozíció.",
};

export default function MidjourneyToolPage() {
  return <MidjourneyWorkshopGenerator />;
}
