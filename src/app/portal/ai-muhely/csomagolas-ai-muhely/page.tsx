import { Metadata } from "next";
import PackagingWorkshopGenerator from "@/components/organisms/PackagingWorkshopGenerator";

export const metadata: Metadata = {
  title: "Csomagolás AI Műhely | WebDude",
  description:
    "Nyomdakész csomagolás-, doboz- és címke tervező stúdió: FEFCO stancrajzok, EU compliance, panelenkénti másolat és AI promptok.",
};

export default function CsomagolasToolPage() {
  return <PackagingWorkshopGenerator />;
}
