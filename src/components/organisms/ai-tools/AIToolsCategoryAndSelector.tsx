"use client";

import { AlertCircle, Bot } from "lucide-react";
import GraphicToolCard from "@/components/molecules/GraphicToolCard";
import {
  graphicsTools,
  marketingTools,
  strategistTools,
  tools,
  type ToolCategory,
  type ToolType,
} from "@/lib/aiToolsRegistry";

interface AIToolsCategoryAndSelectorProps {
  activeCategory: ToolCategory;
  activeTool: ToolType;
  loading: boolean;
  isAdmin: boolean;
  allowedTools: string[];
  error: string;
  onCategoryChange: (category: ToolCategory) => void;
  onSelectTool: (tool: ToolType) => void;
}

/**
 * Az Élő AI Generátor fejléce, kategória-fülei (Marketing / Grafika / Strategist Pro),
 * az eszközválasztó kártyarács, az aktív eszköz leírása és a globális hibaüzenet.
 */
export default function AIToolsCategoryAndSelector({
  activeCategory,
  activeTool,
  loading,
  isAdmin,
  allowedTools,
  error,
  onCategoryChange,
  onSelectTool,
}: AIToolsCategoryAndSelectorProps) {
  const categoryList =
    activeCategory === "marketing"
      ? marketingTools
      : activeCategory === "graphics"
        ? graphicsTools
        : strategistTools;

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-bg-elevated/40 pb-4">
        <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-primary block">
            BT-Shop AI Blueprint
          </span>
          <h3 className="text-lg font-heading font-normal uppercase tracking-wide text-white -mt-0.5">
            Élő AI Generátor
          </h3>
        </div>
      </div>

      {/* Category Tabs */}
      <div
        role="tablist"
        aria-label="AI Eszköz Kategóriák"
        className="flex border-b border-bg-elevated/40 pb-2 gap-4"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === "marketing"}
          onClick={() => onCategoryChange("marketing")}
          className={`pb-2 px-1 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-t ${
            activeCategory === "marketing"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Marketing & Szövegírás
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === "graphics"}
          onClick={() => onCategoryChange("graphics")}
          className={`pb-2 px-1 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-t ${
            activeCategory === "graphics"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Grafika & Tervezés
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === "strategist"}
          onClick={() => onCategoryChange("strategist")}
          className={`pb-2 px-1 font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer border-b-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-t ${
            activeCategory === "strategist"
              ? "border-brand-primary text-brand-primary"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Strategist Pro
        </button>
      </div>

      {/* Tool Selector Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {categoryList.map((key) => {
          const opt = tools[key];
          const isSelected = activeTool === key;
          const cardLocked = !isAdmin && !allowedTools.includes(key);
          return (
            <GraphicToolCard
              key={key}
              toolKey={key}
              config={opt}
              isSelected={isSelected}
              loading={loading}
              isLocked={cardLocked}
              onClick={() => onSelectTool(key)}
            />
          );
        })}
      </div>

      {/* Description of active tool */}
      <p className="text-xs text-slate-400 leading-relaxed font-sans border-l-2 border-brand-primary/30 pl-3">
        {tools[activeTool].description}
      </p>

      {/* Global error alert */}
      {error && (
        <div
          role="alert"
          className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 font-mono"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </>
  );
}
