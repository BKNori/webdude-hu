import type { Metadata } from "next";
import ApparelPromptStudio from "@/components/organisms/ApparelPromptStudio";

export const metadata: Metadata = {
  title: "Ruha Készítés, Textil & Merch Pro Prompt Stúdió | WebDude AI Műhely",
  description:
    "Textilnyomtatási grafika (DTF, Szitanyomás, Hímzés, Szublimáció), 2D CAD Tech Pack szabásrajz + BOM és Webshop Ghost Mannequin / Lookbook prompt stúdió.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ApparelPromptStudioPage() {
  return <ApparelPromptStudio />;
}
