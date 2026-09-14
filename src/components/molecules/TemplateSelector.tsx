// src/components/molecules/TemplateSelector.tsx
import React from "react";
import { Check } from "lucide-react";

// Define a simple Template interface matching the structure used in ClientAITools
interface Template {
  name: string;
  values: Record<string, string>;
}

interface Props {
  /** Array of available templates */
  templates: Template[];
  /** Currently selected template index */
  selectedIdx: number;
  /** Setter for selected index */
  setSelectedIdx: (idx: number) => void;
  /** Callback to apply the selected template */
  applyTemplate: () => void;
  /** Loading state for the "Apply" button */
  loading: boolean;
}

/**
 * Reusable template selector UI component.
 * Mirrors the original inline markup from `ClientAITools` but is extracted
 * as a standalone component for consistency across the graphic tools.
 */
const TemplateSelector: React.FC<Props> = ({
  templates,
  selectedIdx,
  setSelectedIdx,
  applyTemplate,
  loading,
}) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <label
        className="text-[10px] uppercase font-bold text-slate-400"
        htmlFor="templateSelect"
      >
        Előre definiált sablon
      </label>
      <select
        id="templateSelect"
        value={selectedIdx}
        onChange={(e) => setSelectedIdx(Number(e.target.value))}
        className="w-48 bg-transparent border border-bg-elevated/80 rounded-xl px-2 py-1 text-slate-200 focus:outline-none focus:border-amber-500 text-xs font-mono"
      >
        <option value={-1}>-- Válassz --</option>
        {templates.map((t, idx) => (
          <option key={idx} value={idx}>
            {t.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={applyTemplate}
        disabled={selectedIdx < 0 || loading}
        className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 rounded-md text-xs transition-colors disabled:opacity-40"
      >
        <Check className="w-3 h-3" />
        Alkalmaz
      </button>
    </div>
  );
};

export default TemplateSelector;
