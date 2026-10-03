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
      {/**
       * **Az oldal egyetlen `h1`-je — akadálymentesített, vizuálisan rejtett.**
       *
       * A `PortalDashboard` klienskomponens három állapotot kezel:
       * `loading` (spinner) · `!user` (`return null` — a nem belépett
       * látogató **teljesen üres oldalt kap**) · belépve (dashboard).
       * Emiatt a H1-et itt, a **Server Componentben** kell megadni:
       * így a statikus HTML-ben mindig jelen van (AEO/keresőmotor),
       * és nem függ a kliensoldali auth állapottól.
       *
       * Az `sr-only` (screen-reader-only) Tailwind utility: a szöveg
       * a képernyőolvasóknak és a keresőmotoroknak hozzáférhető,
       * de vizuálisan nem jelenik meg — a belépett felhasználó nem
       * lát egy felesleges duplikált címsort.
       *
       * A belépett dashboard `h1`-je ezért `h2`-re van demoted, hogy
       * az oldalon mindig **pontosan egy** `h1` legyen (AGENTS.md 5. §).
       */}
      <h1 className="sr-only">Ügyfélportál — projektek, AI műhely és sablonok</h1>
      <PortalDashboard />
    </div>
  );
}
