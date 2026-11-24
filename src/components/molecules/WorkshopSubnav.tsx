"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, FolderKanban, Sparkles } from "lucide-react";

const WORKSHOP_ROUTE_TITLES: Record<string, string> = {
  "online-grafika-prompt-studio": "Online Grafika & Kampány Pro Prompt Stúdió",
  "nyomda-prepress-prompt-studio": "Offline & Nyomdai Prepress Pro Prompt Stúdió",
  "ruha-ai-muhely": "Ruha, Divat, Textil & Merch Pro Prompt Stúdió",
  "szoftver-architektura-ai-muhely": "Webes & Szoftver-Architektúra Pro Prompt Stúdió",
  "elemzes-prompt-studio": "Profi Elemzés & Audit Pro Prompt Stúdió",
  "banner-ai-muhely": "Banner AI Műhely",
  banner: "Banner AI Műhely",
  "logo-ai-muhely": "Logó AI Műhely",
  logo: "Logó AI Műhely",
  "midjourney-ai-muhely": "Midjourney & Flux AI Műhely",
  midjourney: "Midjourney Prompt Generátor",
  "poster-ai-muhely": "Poszter AI Műhely",
  "szorolap-ai-muhely": "Szórólap & Prospektus AI Műhely",
  flyer: "Szórólap & Prospektus AI Műhely",
  "csomagolas-ai-muhely": "Csomagolás, Doboz & Címke AI Műhely",
  packaging: "Csomagolás, Doboz & Címke AI Műhely",
  "dekor-ai-muhely": "Nagyformátumú Dekor / LFP AI Műhely",
  signage: "Nagyformátumú Dekor / LFP AI Műhely",
  "cip-ai-muhely": "Vállalati Arculat (CIP) AI Műhely",
  "social-media-ai-muhely": "Social Media AI Műhely",
  "presentation-ai-muhely": "Prezentáció & Pitch Deck AI Műhely",
  "icon-design-ai-muhely": "Ikon Design AI Műhely",
  "design-system-ai-muhely": "Design System AI Műhely",
  "ui-ux-ai-muhely": "UI/UX AI Műhely",
  "ui-ux": "UI/UX Tervező Eszköz",
  "szezonalis-ai-muhely": "Szezonális Kampány AI Műhely",
  szezonalis: "Szezonális Kampány Generátor",
  "tartalomtervezo-ai-muhely": "Tartalomtervező AI Műhely",
  tartalomtervezo: "Tartalomtervező Eszköz",
  "seo-audit-ai-muhely": "SEO Audit AI Műhely",
  "seo-audit": "SEO Audit & Gap Elemző",
  "versenytars-elemzo": "Versenytárs-elemző Eszköz",
  "projekt-tervezo-ai-muhely": "Projekt Scope & Architektúra AI Műhely",
  "project-scope": "Projekt Scope & Architektúra AI Műhely",
  kristofka: "Kristófka Strategist-Pro Munkafolyamat",
};

function formatFallbackTitle(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

/**
 * Közös, nem-sticky Dual Theme alnavigációs / breadcrumb sáv a `/portal/ai-muhely`
 * és `/portal/ai-muhely/*` útvonalakhoz. Nem takarja ki a globális `HeaderNavClient`
 * főmenüt, és nem duplikálja az email / szerepkör / kijelentkezés elemeket.
 */
export default function WorkshopSubnav() {
  const pathname = usePathname() || "/portal/ai-muhely";
  const normalized = pathname.replace(/\/+$/, "");
  const isHub = normalized === "/portal/ai-muhely";
  const rawSlug = isHub
    ? ""
    : normalized.replace(/^\/portal\/ai-muhely\//, "").split("/")[0] || "";

  const currentModuleTitle = isHub
    ? "AI Tervezőműhely"
    : WORKSHOP_ROUTE_TITLES[rawSlug] || formatFallbackTitle(rawSlug);

  const backHref = isHub ? "/portal" : "/portal/ai-muhely";
  const backLabel = isHub
    ? "Vissza az Ügyfélportálra"
    : "Vissza az AI Műhelybe";

  return (
    <nav
      aria-label="AI Műhely alnavigáció"
      className="rounded-2xl bg-white dark:bg-[#0F172A]/90 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3"
    >
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0369A1] dark:text-[#00B5F1] hover:text-[#6D28D9] dark:hover:text-[#A78BFA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] rounded-md"
        >
          <ArrowLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{backLabel}</span>
        </Link>

        <span
          aria-hidden="true"
          className="text-slate-300 dark:text-slate-700 select-none"
        >
          /
        </span>

        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#F8FAFC] truncate">
          <Sparkles
            className="w-3.5 h-3.5 text-[#0369A1] dark:text-[#00B5F1] shrink-0"
            aria-hidden="true"
          />
          <span className="truncate">{currentModuleTitle}</span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/portal"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-[#0B1120] dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-slate-700 dark:text-slate-200 hover:text-[#0369A1] dark:hover:text-[#00B5F1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
        >
          <FolderKanban className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Projektek</span>
        </Link>
      </div>
    </nav>
  );
}
