import React from "react";
import { Metadata } from "next";
import UiUxWorkshopGenerator from "@/components/organisms/UiUxWorkshopGenerator";

export const metadata: Metadata = {
  title: "UI/UX AI Műhely | WebDude",
  description:
    "Professzionális UI/UX tervezés Norbi 16+ éves felhasználói élmény és webfejlesztési szakértelmével. Wireframe, szekció-elrendezés és Figma prompt generálás.",
};

export default function UiUxToolPage() {
  return <UiUxWorkshopGenerator />;
}
