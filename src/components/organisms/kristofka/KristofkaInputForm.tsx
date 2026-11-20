"use client";

import React from "react";
import {
  FileText,
  Target,
  Sparkles,
  Loader2,
  ArrowRight,
} from "lucide-react";
import UniversalFileUploader from "@/components/organisms/UniversalFileUploader";

const TARGET_AUDIENCE_OPTIONS = [
  "Venture Capital",
  "Magánbefektető",
  "Banki hitelbíráló",
  "Városi városfejlesztési pályázat",
];

const NARRATIVE_OPTIONS = [
  "Indusztriális loft-átalakítás",
  "Fenntartható öko-iroda",
  "Mix-used közösségi tér",
  "Luxus lakópark",
];

const TONE_OPTIONS = [
  "Szakmai/Analitikus",
  "Inspiráló/Vizionárius",
  "Rövid/Direkt",
];

const ENERGETIKAI_BESOROLAS_OPTIONS = ["Modernizált", "Átlagos", "Felújítandó"];

interface KristofkaInputFormProps {
  targetAudience: string;
  narrative: string;
  tone: string;
  energetikaiBesorolas: string;
  loading: boolean;
  onTargetAudienceChange: (val: string) => void;
  onNarrativeChange: (val: string) => void;
  onToneChange: (val: string) => void;
  onEnergetikaiBesorolasChange: (val: string) => void;
  onUploadSuccess: (url: string, fileName: string) => void;
  onUploadError: (errorMessage: string) => void;
  onGenerate: () => void;
}

export default function KristofkaInputForm({
  targetAudience,
  narrative,
  tone,
  energetikaiBesorolas,
  loading,
  onTargetAudienceChange,
  onNarrativeChange,
  onToneChange,
  onEnergetikaiBesorolasChange,
  onUploadSuccess,
  onUploadError,
  onGenerate,
}: KristofkaInputFormProps) {
  return (
    <>
      <UniversalFileUploader
        onUploadSuccess={onUploadSuccess}
        onUploadError={onUploadError}
        category="ai"
      />

      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2">
          <Target className="w-3.5 h-3.5" />
          Célcsoport
        </label>
        <select
          value={targetAudience}
          onChange={(e) => onTargetAudienceChange(e.target.value)}
          className="w-full bg-bg-base border border-bg-elevated/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500/50 font-mono"
        >
          <option value="">Válassz célcsoportot...</option>
          {TARGET_AUDIENCE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Élethelyzet/Narratíva
        </label>
        <select
          value={narrative}
          onChange={(e) => onNarrativeChange(e.target.value)}
          className="w-full bg-bg-base border border-bg-elevated/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500/50 font-mono"
        >
          <option value="">Válassz narratívát...</option>
          {NARRATIVE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2">
          <FileText className="w-3.5 h-3.5" />
          Hangvétel
        </label>
        <select
          value={tone}
          onChange={(e) => onToneChange(e.target.value)}
          className="w-full bg-bg-base border border-bg-elevated/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500/50 font-mono"
        >
          <option value="">Válassz hangvételt...</option>
          {TONE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          Energetikai Besorolás
        </label>
        <select
          value={energetikaiBesorolas}
          onChange={(e) => onEnergetikaiBesorolasChange(e.target.value)}
          className="w-full bg-bg-base border border-bg-elevated/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500/50 font-mono"
        >
          <option value="unknown">Ismeretlen</option>
          {ENERGETIKAI_BESOROLAS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={onGenerate}
        disabled={loading}
        className="w-full py-4 bg-sky-500 hover:bg-violet-700 hover:text-white text-bg-base font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generálás folyamatban...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Kristófka Pitch Generálása
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </>
  );
}
