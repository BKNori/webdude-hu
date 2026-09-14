import React from "react";
import { Metadata } from "next";
import SuperadminWorkshopDashboard from "@/components/organisms/SuperadminWorkshopDashboard";

export const metadata: Metadata = {
  title: "Kreatív Stúdió | WebDude Portal",
  description:
    "Szuperadmin Kreatív Stúdió - AI Műhely modulok kezelése és gyors hozzáférés.",
};

export default function KreativStudioPage() {
  return <SuperadminWorkshopDashboard />;
}
