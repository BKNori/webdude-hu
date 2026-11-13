"use client";

import React from "react";
import {
  Sparkles,
  Copy,
  Check,
  Loader2,
  RefreshCw,
  Save,
} from "lucide-react";

interface GenerationOutputProps {
  /** Jelenleg megjelenített (gépelés alatt álló) szöveg */
  displayedText: string;
  /** Generálás folyamatban van-e */
  loading: boolean;
  /** Van-e teljes, kimásolható/menthető tartalom */
  hasContent: boolean;
  /** A teljes generált szöveg kimásolva lett-e */
  copied: boolean;
  /** Jegyzet mentés folyamatban van-e */
  saveLoading: boolean;
  /** Jegyzet sikeresen elmentve jelző */
  saveSuccess: boolean;
  /** Új generálás indítása */
  onGenerate: () => void;
  /** Teljes szöveg másolása a vágólapra */
  onCopy: () => void;
  /** Generált szöveg mentése jegyzetként */
  onSaveNote: () => void;
  /** Űrlap és kimenet visszaállítása */
  onReset: () => void;
}

/**
 * Az AI generátor kimeneti oszlopa: gépelő effektussal megjelenő
 * generált szöveg, akciógombok (Generálás / Másolás / Mentés / Reset)
 * és a mentési siker jelzője.
 */
const GenerationOutput: React.FC<GenerationOutputProps> = ({
  displayedText,
  loading,
  hasContent,
  copied,
  saveLoading,
  saveSuccess,
  onGenerate,
  onCopy,
  onSaveNote,
  onReset,
}) => {
  return (
    <div className="flex flex-col space-y-4">
      {/* Generated Text (typewriter) */}
      <div className="min-h-50 p-4 bg-transparent border border-bg-elevated/40 rounded-xl overflow-y-auto text-sm text-slate-300 font-mono">
        {displayedText ||
          (loading && (
            <span className="animate-pulse text-slate-500">
              Generálás...
            </span>
          ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-1 px-4 py-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-500 rounded-md text-sm font-medium transition-colors disabled:opacity-40"
          onClick={onGenerate}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Generálás
        </button>
        <button
          type="button"
          onClick={onCopy}
          disabled={!hasContent}
          className="flex items-center gap-1 px-3 py-2 bg-transparent hover:bg-transparent text-slate-400 rounded-md text-xs transition-colors disabled:opacity-40"
        >
          {copied ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
          Másolás
        </button>
        <button
          type="button"
          onClick={onSaveNote}
          disabled={saveLoading || !hasContent}
          className="flex items-center gap-1 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-500 rounded-md text-xs transition-colors disabled:opacity-40"
        >
          {saveLoading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Save className="w-3 h-3" />
          )}
          Mentés
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 px-3 py-2 bg-gray-600/20 hover:bg-gray-600/30 text-gray-400 rounded-md text-xs transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Save Success Indicator */}
      {saveSuccess && (
        <div className="flex items-center gap-2 text-emerald-500 text-sm">
          <Check className="w-4 h-4" />
          Jegyzet sikeresen elmentve!
        </div>
      )}
    </div>
  );
};

export default GenerationOutput;
