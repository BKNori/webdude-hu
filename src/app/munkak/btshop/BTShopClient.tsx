"use client";

import BtshopHero from "@/components/organisms/BtshopHero";
import BtshopEngineeringGrid from "@/components/organisms/BtshopEngineeringGrid";
import BtshopEeatSection from "@/components/organisms/BtshopEeatSection";
import BtshopFinalCta from "@/components/organisms/BtshopFinalCta";

/**
 * BTShop.hu esettanulmány — kliens oldali kompozíciós réteg.
 * Soft Premium 2026 design-nyelv: Obsidian Black, Electric Cyan,
 * Luminous Glassmorphism, motion/react spring fizika.
 * (A régi ~500 soros monolit organismsekre bontva — 300 sor/component limit.)
 */
export default function BTShopClient() {
  return (
    <main className="min-h-screen bg-[#020617] text-[#e2e8f0]">
      <BtshopHero />
      <BtshopEngineeringGrid />
      <BtshopEeatSection />
      <BtshopFinalCta />
    </main>
  );
}
