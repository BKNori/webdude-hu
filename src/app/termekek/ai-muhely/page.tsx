import React from "react";
import { Metadata } from "next";
import AIWorkshopCollection from "@/components/organisms/AIWorkshopCollection";

export const metadata: Metadata = {
  title: "AI Műhely Katalógus | WebDude",
  description:
    "Teljes 14 modulos AI Műhely arzenál plusz Kristófka munkafolyamat. Professzionális eszközök branding, tartalom, design, technikai és workflow feladatokhoz.",
  keywords: [
    "AI Műhely",
    "Logo AI Műhely",
    "Midjourney AI Műhely",
    "SEO Audit AI Műhely",
    "Tartalomtervező AI Műhely",
    "UI/UX AI Műhely",
    "Szezonalis AI Műhely",
    "Banner AI Műhely",
    "Poster AI Műhely",
    "Social Media AI Műhely",
    "CIP AI Műhely",
    "Presentation AI Műhely",
    "Icon Design AI Műhely",
    "Design System AI Műhely",
    "Kristófka Munkafolyamat",
    "WebDude AI Studio",
  ],
  openGraph: {
    title: "AI Műhely Katalógus | WebDude",
    description:
      "Teljes 14 modulos AI Műhely arzenál plusz Kristófka munkafolyamat. Professzionális eszközök branding, tartalom, design, technikai és workflow feladatokhoz.",
    type: "website",
    url: "https://webdude.hu/termekek/ai-muhely",
    images: [
      {
        url: "/og/ai-muhely.jpg",
        width: 1200,
        height: 630,
        alt: "WebDude AI Műhely Katalógus",
      },
    ],
  },
};

export default function AiWorkshopPage() {
  return <AIWorkshopCollection />;
}
