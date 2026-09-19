import { Metadata } from "next";
import LogoWorkshopGenerator from "@/components/organisms/LogoWorkshopGenerator";

export const metadata: Metadata = {
  title: "Logo AI Műhely | WebDude",
  description:
    "Professzionális logo tervezés Midjourney v6 Master promptokkal. Skálázható, időtálló és megjegyezhető arculat.",
};

export default function LogoToolPage() {
  return <LogoWorkshopGenerator />;
}
