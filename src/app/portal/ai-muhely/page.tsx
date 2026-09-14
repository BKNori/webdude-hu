import React from "react";
import AIWorkshopCollection from "@/components/organisms/AIWorkshopCollection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tervezőműhely | WebDude",
  description:
    "AI-alapú kreatív tervező, arculat- és Midjourney prompt generátor modulok a WebDude portálon.",
};

export default function AIWorkshopPage() {
  return <AIWorkshopCollection />;
}
