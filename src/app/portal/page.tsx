import React from "react";
import PortalDashboard from "@/components/organisms/PortalDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ügyfélportál | WebDude",
  description:
    "Zárt ügyfélkapu a fejlesztési és AI munkafolyamatok nyomon követésére.",
};

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-transparent text-text-primary pt-24">
      <PortalDashboard />
    </div>
  );
}
