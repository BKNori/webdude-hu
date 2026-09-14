import React from "react";
import { Metadata } from "next";
import DesignSystemWorkshopGenerator from "@/components/organisms/DesignSystemWorkshopGenerator";

export const metadata: Metadata = {
  title: "Design System AI Műhely | WebDude",
  description:
    "Design tokens és komponens könyvtár tervezése Tailwind CSS v4 integrációval. Zod validáció, Bento Grid Cyber-Arany dizájn és skálázható rendszer architektúra.",
};

export default function DesignSystemToolPage() {
  return <DesignSystemWorkshopGenerator />;
}
