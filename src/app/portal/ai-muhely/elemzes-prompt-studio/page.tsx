import type { Metadata } from "next";
import AnalysisPromptStudio from "@/components/organisms/AnalysisPromptStudio";

export const metadata: Metadata = {
  title:
    "Profi Elemzés & Audit Pro Prompt Stúdió | AI Tervezőműhely | WebDude",
  description:
    "SEO + AEO + GEO láthatósági audit, 7-lépcsős UX/UI & CRO Landing Roast, versenytárs-benchmark, OWASP/CWV kódaudit és GA4/Search Console CSV elemző stúdió.",
  robots: { index: false, follow: false },
};

export default function AnalysisPromptStudioPage() {
  return <AnalysisPromptStudio />;
}
