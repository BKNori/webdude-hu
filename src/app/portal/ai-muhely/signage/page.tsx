import { Metadata } from "next";
import SignageWorkshopGenerator from "@/components/organisms/SignageWorkshopGenerator";

export const metadata: Metadata = {
  title: "Signage AI Műhely | WebDude",
  description:
    "Nagyformátumú dekoráció-tervező stúdió: roll-up, kirakat, autódekor, molinó és sajtófal méretarányos LFP specifikációkkal.",
};

export default function SignageToolPage() {
  return <SignageWorkshopGenerator />;
}
