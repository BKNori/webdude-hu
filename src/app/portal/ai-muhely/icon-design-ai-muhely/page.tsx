import React from "react";
import { Metadata } from "next";
import IconWorkshopGenerator from "@/components/organisms/IconWorkshopGenerator";

export const metadata: Metadata = {
  title: "Icon Design AI Műhely | WebDude",
  description:
    "SVG vektor ikonok és icon szettek tervezése 15 stílusban. Minimalista szimbólumok, optimalizált SVG útvonalak és skálázható ikon design.",
};

export default function IconDesignToolPage() {
  return <IconWorkshopGenerator />;
}
