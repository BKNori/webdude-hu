"use client";

import type { PortalTab } from "@/types/portal";

interface PortalHeroAndTabsProps {
  isSuperAdmin: boolean;
  activeTab: PortalTab;
  onTabChange: (tab: PortalTab) => void;
}

/**
 * A portál belső fejléce (Aktív Projektek & Workflow címsor) és a
 * szuperadmin nézetváltó fülei (Kliens Nézet / Portál vs. Rendszer Admin)
 * teljes WCAG AA tablist/tab ARIA attribútumokkal és Kék-Lila v7.0 tokenekkel.
 */
export default function PortalHeroAndTabs({
  isSuperAdmin,
  activeTab,
  onTabChange,
}: PortalHeroAndTabsProps) {
  return (
    <>
      {/* Title area */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary">
          Aktív Projektek & Workflow
        </span>
        {/**
         * `h2`, nem `h1`: az oldal egyetlen `h1`-je a `page.tsx`
         * Server Component `sr-only` címsora, ami a `!user`
         * (nem belépett) állapotban is jelen van. Ez a dashboard
         * a `page.tsx` címsor *alá* kerül a hierarchiában.
         */}
        <h2 className="text-3xl md:text-5xl font-heading font-normal uppercase text-text-primary tracking-wide">
          Munkafolyamatok
        </h2>
        <p className="text-slate-400 text-sm font-sans max-w-xl">
          Kövesd nyomon valós időben a weboldalad, webáruházad vagy AI
          automatizációd aktuális állapotát és mérföldköveit.
        </p>
      </div>

      {isSuperAdmin && (
        <div
          role="tablist"
          aria-label="Portál nézetváltó"
          className="flex border-b border-slate-800 mt-4"
        >
          <button
            type="button"
            role="tab"
            id="portal-tab-client"
            aria-selected={activeTab === "portal"}
            aria-controls="portal-panel-client"
            onClick={() => onTabChange("portal")}
            className={`pb-4 px-6 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-t-lg ${
              activeTab === "portal"
                ? "border-brand-primary text-brand-primary"
                : "border-transparent text-slate-400 hover:text-brand-primary"
            }`}
          >
            Kliens Nézet / Portál
          </button>
          <button
            type="button"
            role="tab"
            id="portal-tab-admin"
            aria-selected={activeTab === "admin"}
            aria-controls="portal-panel-admin"
            onClick={() => onTabChange("admin")}
            className={`pb-4 px-6 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-t-lg ${
              activeTab === "admin"
                ? "border-brand-primary text-brand-primary"
                : "border-transparent text-slate-400 hover:text-brand-primary"
            }`}
          >
            Rendszer Admin
          </button>
        </div>
      )}
    </>
  );
}
