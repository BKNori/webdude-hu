import { Metadata } from "next";
import FlyerWorkshopGenerator from "@/components/organisms/FlyerWorkshopGenerator";

export const metadata: Metadata = {
  title: "Szórólap AI Műhely | WebDude",
  description:
    "Nyomdakész szórólap- és hajtogatott prospektus tervező stúdió: milliméter-pontos prepress specifikációk, panelenkénti copywriting és AI promptok.",
};

export default function SzorolapToolPage() {
  return <FlyerWorkshopGenerator />;
}
