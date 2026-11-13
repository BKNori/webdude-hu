import { Metadata } from "next";
import LogoWorkshopGenerator from "@/components/organisms/LogoWorkshopGenerator";

export const metadata: Metadata = {
  title: "Logo AI Műhely | WebDude",
  description:
    "Enterprise szintű logó- és arculattervező stúdió: 3 profi koncepció, vektorszerkesztési útmutató, színrendszer és tipográfia.",
};

export default function LogoToolPage() {
  return <LogoWorkshopGenerator />;
}
