"use client";

import React from "react";
import type { PresetOption } from "@/lib/workshop-presets";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-1 focus-visible:ring-offset-bg-base";

interface PresetChipsProps {
  label?: string;
  options: PresetOption[];
  value: string | null;
  onChange: (id: string | null) => void;
  /** Többszörös választás engedélyezése (pl. stílus + optika együtt). */
  multi?: boolean;
  /** A kiválasztott preset promptHint-jeinek lekérése. */
  hintFor?: (id: string) => string;
}

/**
 * Kattintható preset chip-csoport a generátor űrlapokhoz.
 * Egyszeres vagy többszörös választással, opcionális szín-jelzésekkel.
 */
export default function PresetChips({
  label,
  options,
  value,
  onChange,
  multi = false,
  hintFor,
}: PresetChipsProps) {
  const selected = new Set(value ? value.split("|") : []);
  const isSelected = (id: string) => selected.has(id);

  const handleClick = (id: string) => {
    if (!multi) {
      onChange(isSelected(id) ? null : id);
      return;
    }
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(next.size ? [...next].join("|") : null);
  };

  return (
    <div className="space-y-2">
      {label && (
        <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = isSelected(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleClick(opt.id)}
              aria-pressed={active}
              title={hintFor ? hintFor(opt.id) : opt.promptHint}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${FOCUS_RING} ${
                active
                  ? "bg-[#00B5F1]/15 border-[#00B5F1]/60 text-[#00B5F1] shadow-[0_0_12px_rgba(0,181,241,0.15)]"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-[#00B5F1]/30 hover:text-slate-200"
              }`}
            >
              {opt.colors && (
                <span className="flex -space-x-1">
                  {opt.colors.map((c) => (
                    <span
                      key={c}
                      className="w-2.5 h-2.5 rounded-full border border-slate-950"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </span>
              )}
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
