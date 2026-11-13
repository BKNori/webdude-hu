import { Metadata } from "next";
import FlyerWorkshopGenerator from "@/components/organisms/FlyerWorkshopGenerator";

export const metadata: Metadata = {
  title: "Flyer AI Műhely | WebDude",
  description:
    "Nyomdakész szórólap- és hajtogatott prospektus tervező stúdió: milliméter-pontos prepress specifikációk, panelenkénti copywriting és AI promptok.",
};

export default function FlyerToolPage() {
  return <FlyerWorkshopGenerator />;
}
