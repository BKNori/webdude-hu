"use client";

import React from "react";
import { Check, Copy, Trash2 } from "lucide-react";
import Button from "@/components/atoms/Button";
import type { AiGenerationItem } from "@/actions/ai";
import { tools, type ToolType } from "@/data/client-ai-tools-config";

interface HistoryListProps {
  /** Mentett AI generációk listája */
  generations: AiGenerationItem[];
  /** Töltés alatt lévő állapot */
  historyLoading: boolean;
  /** Jelenleg kimásolt generáció azonosítója */
  copiedGenId: string | null;
  /** Generáció visszatöltése az űrlapba */
  onLoad: (gen: AiGenerationItem) => void;
  /** Szöveg másolása a vágólapra */
  onCopy: (id: string, text: string) => void;
  /** Generáció törlése */
  onDelete: (id: string) => void;
}

/**
 * Az AI generátor előzményeinek (ai_generations) listanézete.
 * Betöltés, üres állapot és a generációnkénti
 * visszatöltés / másolás / törlés akciók.
 */
const HistoryList: React.FC<HistoryListProps> = ({
  generations,
  historyLoading,
  copiedGenId,
  onLoad,
  onCopy,
  onDelete,
}) => {
  return (
    <div className="mt-8">
      <h4 className="text-sm font-bold text-sky-500 mb-2">
        Generáció Előzmények
      </h4>
      {historyLoading ? (
        <p className="text-slate-500 text-xs">Betöltés...</p>
      ) : generations.length === 0 ? (
        <p className="text-slate-500 text-xs">
          Még nincsenek mentett generációk.
        </p>
      ) : (
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {generations.map((gen) => (
            <li
              key={gen.id}
              className="flex items-center justify-between bg-transparent p-2 rounded-md border border-bg-elevated/20"
            >
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-sky-500"
                  onClick={() => onLoad(gen)}
                >
                  {tools[gen.toolId as ToolType]?.name || gen.toolId}
                </Button>
                <span className="text-xs text-slate-400">
                  {new Date(gen.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onCopy(gen.id, gen.outputText)}
                  className={`text-xs ${copiedGenId === gen.id ? "text-emerald-500" : "text-slate-400"} hover:text-sky-500`}
                >
                  {copiedGenId === gen.id ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(gen.id)}
                  className="text-xs text-red-500 hover:text-red-300"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryList;
