import { Metadata } from "next";
import ProjectScopeWorkshopGenerator from "@/components/organisms/ProjectScopeWorkshopGenerator";

export const metadata: Metadata = {
  title: "Projekttervező AI Műhely | WebDude",
  description:
    "Ügyfél-briefből weboldal- és webshop-architektúra, SEO/AEO sitemap és 3 szintű árajánlat-terv készítése egy kattintással.",
};

export default function ProjektTervezoToolPage() {
  return <ProjectScopeWorkshopGenerator />;
}
