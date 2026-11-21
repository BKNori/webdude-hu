import type { Metadata } from "next";
import OnlineGraphicsPromptStudio from "@/components/organisms/OnlineGraphicsPromptStudio";

export const metadata: Metadata = {
  title: "Online Grafika & Kampány Pro Prompt Stúdió | WebDude AI Műhely",
  description:
    "Professzionális kampány-, hero-, social ad-, thumbnail- és motion-prompt stúdió Midjourney v7, Flux 1.1 Pro, Ideogram 3.0 és Recraft v3 SVG motorokhoz.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OnlineGraphicsPromptStudioPage() {
  return <OnlineGraphicsPromptStudio />;
}
