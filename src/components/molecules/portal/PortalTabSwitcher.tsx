"use client";

import type { PortalTab } from "@/types/portal";

interface PortalTabSwitcherProps {
  activeTab: PortalTab;
  onChange: (tab: PortalTab) => void;
}

const TABS: ReadonlyArray<{ key: PortalTab; label: string }> = [
  { key: "portal", label: "Kliens Nézet / Portál" },
  { key: "admin", label: "Rendszer Admin" },
];

/**
 * Portál nézetváltó (Kliens Portál / Rendszer Admin).
 * A hívó oldal kizárólag szuperadmin esetén rendereli.
 */
export default function PortalTabSwitcher({
  activeTab,
  onChange,
}: PortalTabSwitcherProps) {
  return (
    <div className="flex border-b border-slate-800 mt-4">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`pb-4 px-6 font-mono text-xs font-black uppercase tracking-wider cursor-pointer border-b-2 transition-all ${
            activeTab === tab.key
              ? "border-sky-500 text-sky-500"
              : "border-transparent text-slate-500 hover:text-sky-500"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
