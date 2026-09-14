import React from "react";
import { Metadata } from "next";
import SocialMediaWorkshopGenerator from "@/components/organisms/SocialMediaWorkshopGenerator";

export const metadata: Metadata = {
  title: "Social Media AI Műhely | WebDude",
  description:
    "Multi-platform social media tartalom generálás Instagram, Facebook, LinkedIn, TikTok optimalizációval. Engagement-fókuszú copywriting és vizuális elemek.",
};

export default function SocialMediaToolPage() {
  return <SocialMediaWorkshopGenerator />;
}
