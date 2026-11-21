import type { Metadata } from "next";
import OfflinePrintPromptStudio from "@/components/organisms/OfflinePrintPromptStudio";

export const metadata: Metadata = {
  title: "Offline & Nyomdai Prepress Pro Prompt Stúdió | WebDude AI Műhely",
  description:
    "2D nyomdakész grafikai alapok és 3D print mockupok: kifutó, bígelés, FEFCO stancrajz, Roll-up holttér, FOGRA39/51/52 ICC és spot rétegek.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePrintPromptStudioPage() {
  return <OfflinePrintPromptStudio />;
}
