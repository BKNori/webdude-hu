import React from "react";
import { Metadata } from "next";
import CipWorkshopGenerator from "@/components/organisms/CipWorkshopGenerator";

export const metadata: Metadata = {
  title: "CIP AI Műhely | WebDude",
  description:
    "Vállalati arculati elemek tervezése névjegykártya, levélpapír és arculati kézikönyv nyomdai kész specifikációkkal. Professzionális CIP program generálás.",
};

export default function CipToolPage() {
  return <CipWorkshopGenerator />;
}
