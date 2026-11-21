import type { Metadata } from "next";
import SoftwareArchPromptStudio from "@/components/organisms/SoftwareArchPromptStudio";

export const metadata: Metadata = {
  title:
    "Webes & Szoftver-Architektúra Pro Prompt Stúdió | AI Tervezőműhely | WebDude",
  description:
    "C4 Mermaid rendszerterv, PRD & ADR döntési napló, Firestore/PostgreSQL RBAC séma, OWASP AISVS 2026 és 5-pilléres AI Coding Agent Sprint prompt stúdió.",
  robots: { index: false, follow: false },
};

export default function SoftwareArchPromptStudioPage() {
  return <SoftwareArchPromptStudio />;
}
