"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import jsPDF from "jspdf";
import {
  Building2,
  FileText,
  Target,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Download,
  Copy,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import UniversalFileUploader from "@/components/organisms/UniversalFileUploader";
import { generateKristofkaPitchAction } from "@/actions/ai";
import { saveToCaseStudyAction } from "@/actions/case-study";
import { auth } from "@/lib/firebase";

interface KristofkaResult {
  legacy: string;
  vision: string;
  financial: string;
  roi: string;
}

export default function KristofkaWorkflow() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [result, setResult] = useState<KristofkaResult | null>(null);

  // Form state
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [targetAudience, setTargetAudience] = useState("");
  const [narrative, setNarrative] = useState("");
  const [tone, setTone] = useState("");
  const [energetikaiBesorolas, setEnergetikaiBesorolas] = useState("unknown");

  const targetAudienceOptions = [
    "Venture Capital",
    "Magánbefektető",
    "Banki hitelbíráló",
    "Városi városfejlesztési pályázat",
  ];

  const narrativeOptions = [
    "Indusztriális loft-átalakítás",
    "Fenntartható öko-iroda",
    "Mix-used közösségi tér",
    "Luxus lakópark",
  ];

  const toneOptions = [
    "Szakmai/Analitikus",
    "Inspiráló/Vizionárius",
    "Rövid/Direkt",
  ];

  const energetikaiBesorolasOptions = ["Modernizált", "Átlagos", "Felújítandó"];

  const handleGenerate = async () => {
    if (!auth?.currentUser) {
      setError("Kérlek, jelentkezz be a generáláshoz!");
      return;
    }

    if (!uploadedFileUrl || !targetAudience || !narrative || !tone) {
      setError("Kérlek, tölts fel egy fájlt és válassz ki minden opciót!");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const res = await generateKristofkaPitchAction(idToken, {
        fileUrl: uploadedFileUrl,
        fileName: uploadedFileName || "fajl.pdf",
        targetAudience,
        narrative,
        tone,
        energetikaiBesorolas,
      });

      if (res.success && res.result) {
        setResult(res.result as KristofkaResult);
        setSuccess("Kristófka pitch sikeresen generálva!");

        // Save to case study
        try {
          await saveToCaseStudyAction({
            title: `Kristófka Stratégia - ${new Date().toLocaleDateString("hu-HU")}`,
            clientName: "Anonimizált Ügyfél",
            workflowType: "Kristófka",
            impactMetrics: {
              efficiencyGain: "30%",
              timeSaved: "12h",
            },
            summary: `${res.result.legacy.substring(0, 100)}...`,
            status: "published",
          });
        } catch (error) {
          console.error("Case study save error:", error);
        }
      } else {
        setError(res.error || "Nem sikerült generálni a pitch-et.");
      }
    } catch {
      setError("Hiba történt a generálás során.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccess("Szöveg másolva a vágólapra!");
    setTimeout(() => setSuccess(""), 2000);
  };

  const handlePDFExport = () => {
    if (!result) return;

    const doc = new jsPDF();
    let yPosition = 20;

    // Title
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("Kristófka Befektetői Pitch", 20, yPosition);
    yPosition += 15;

    // Metadata
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Célcsoport: ${targetAudience}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Narratíva: ${narrative}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Hangvétel: ${tone}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Energetikai besorolás: ${energetikaiBesorolas}`, 20, yPosition);
    yPosition += 15;

    // Section 1: Legacy
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("1. Az épület öröksége", 20, yPosition);
    yPosition += 10;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const legacyLines = doc.splitTextToSize(result.legacy, 170);
    doc.text(legacyLines, 20, yPosition);
    yPosition += legacyLines.length * 5 + 10;

    // Section 2: Vision
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("2. A konverziós vízió", 20, yPosition);
    yPosition += 10;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const visionLines = doc.splitTextToSize(result.vision, 170);
    doc.text(visionLines, 20, yPosition);
    yPosition += visionLines.length * 5 + 10;

    // Section 3: Financial
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("3. Pénzügyi potenciál", 20, yPosition);
    yPosition += 10;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const financialLines = doc.splitTextToSize(result.financial, 170);
    doc.text(financialLines, 20, yPosition);
    yPosition += financialLines.length * 5 + 10;

    // Section 4: ROI
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("4. Befektetői megtérülési kilátások", 20, yPosition);
    yPosition += 10;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    const roiLines = doc.splitTextToSize(result.roi, 170);
    doc.text(roiLines, 20, yPosition);

    doc.save("kristofka-befektetoi-pitch.pdf");
    setSuccess("PDF sikeresen letöltve!");
    setTimeout(() => setSuccess(""), 2000);
  };

  const handleNotebookLMExport = () => {
    if (!result) return;

    const markdown = `# Kristófka Befektetői Pitch - NotebookLM Adatcsomag

## Metaadatok
- **Célcsoport:** ${targetAudience}
- **Narratíva:** ${narrative}
- **Hangvétel:** ${tone}
- **Energetikai besorolás:** ${energetikaiBesorolas}
- **Generálás dátuma:** ${new Date().toLocaleDateString("hu-HU")}

## 1. Az épület öröksége
${result.legacy}

## 2. A konverziós vízió
${result.vision}

## 3. Pénzügyi potenciál
${result.financial}

## 4. Befektetői megtérülési kilátások
${result.roi}

## NotebookLM Használati Instrukció
1. Töltsd fel a forrásfájljaidat (alaprajzok, dokumentumok) a NotebookLM-be.
2. Használd ezt a Markdown fájlt kontextusként a mélyreható elemzéshez.
3. Kérdezz a NotebookLM-től a pénzügyi mutatókról, kockázatokról és fejlesztési lehetőségekről.
`;

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ingatlan_adatok_notebooklm.md";
    a.click();
    URL.revokeObjectURL(url);
    setSuccess("NotebookLM adatcsomag sikeresen letöltve!");
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-bg-surface/40 backdrop-blur-xl border border-bg-elevated/80 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden space-y-6 hover:border-amber-500/50 hover:shadow-amber-500/10 transition-all duration-300"
    >
      {/* Background glow decorator */}
      <div className="absolute -left-24 -bottom-24 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 border-b border-bg-elevated/40 pb-4"
      >
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 hover:bg-amber-500/20 transition-colors">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-black tracking-widest text-amber-500 block">
            Strategist-Pro
          </span>
          <h3 className="text-lg font-bold text-white font-mono -mt-0.5">
            Kristófka Munkafolyamat
          </h3>
        </div>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-xs text-slate-400 leading-relaxed font-mono border-l-2 border-amber-500/30 pl-3"
      >
        Az ipari ingatlanok hasznosításának és befektetői prezentációjának
        mesterműve. Nyers alaprajzokból professzionális befektetői pitch
        generálása.
      </motion.p>

      {/* Global Alerts */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 font-mono">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {!result ? (
        <>
          {/* File Upload */}
          <UniversalFileUploader
            onUploadSuccess={(url, fileName) => {
              setUploadedFileUrl(url);
              setUploadedFileName(fileName);
            }}
            onUploadError={(errorMessage) => {
              setError(errorMessage);
            }}
            category="ai"
          />

          {/* Target Audience */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2">
              <Target className="w-3.5 h-3.5" />
              Célcsoport
            </label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full bg-bg-base border border-bg-elevated/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 font-mono"
            >
              <option value="">Válassz célcsoportot...</option>
              {targetAudienceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Narrative */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Élethelyzet/Narratíva
            </label>
            <select
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              className="w-full bg-bg-base border border-bg-elevated/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 font-mono"
            >
              <option value="">Válassz narratívát...</option>
              {narrativeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              Hangvétel
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-bg-base border border-bg-elevated/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 font-mono"
            >
              <option value="">Válassz hangvételt...</option>
              {toneOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Energetikai Besorolás */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Energetikai Besorolás
            </label>
            <select
              value={energetikaiBesorolas}
              onChange={(e) => setEnergetikaiBesorolas(e.target.value)}
              className="w-full bg-bg-base border border-bg-elevated/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 font-mono"
            >
              <option value="unknown">Ismeretlen</option>
              {energetikaiBesorolasOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-bg-base font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
      ) : (
        <>
          {/* Results */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white font-mono">
                Generált Befektetői Pitch
              </h4>
              <button
                onClick={() => setResult(null)}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Új generálás
              </button>
            </div>

            {/* Legacy */}
            <div className="bg-bg-base/50 border border-bg-elevated/50 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-amber-500 font-mono">
                  1. Az épület öröksége
                </h5>
                <button
                  onClick={() => handleCopy(result.legacy)}
                  className="p-1.5 hover:bg-bg-elevated/50 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {result.legacy}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-bg-base/50 border border-bg-elevated/50 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-amber-500 font-mono">
                  2. A konverziós vízió
                </h5>
                <button
                  onClick={() => handleCopy(result.vision)}
                  className="p-1.5 hover:bg-bg-elevated/50 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {result.vision}
              </p>
            </div>

            {/* Financial */}
            <div className="bg-bg-base/50 border border-bg-elevated/50 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-amber-500 font-mono">
                  3. Pénzügyi potenciál
                </h5>
                <button
                  onClick={() => handleCopy(result.financial)}
                  className="p-1.5 hover:bg-bg-elevated/50 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {result.financial}
              </p>
            </div>

            {/* ROI */}
            <div className="bg-bg-base/50 border border-bg-elevated/50 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-amber-500 font-mono">
                  4. Befektetői megtérülési kilátások
                </h5>
                <button
                  onClick={() => handleCopy(result.roi)}
                  className="p-1.5 hover:bg-bg-elevated/50 text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {result.roi}
              </p>
            </div>

            {/* Download All */}
            <button
              onClick={() => {
                const fullText = `
KRISTÓFKA BEFEKTETŐI PITCH
========================

CÉLCSOPORT: ${targetAudience}
NARRATÍVA: ${narrative}
HANGVÉTEL: ${tone}

1. AZ ÉPÜLET ÖRÖKSÉGE
${result.legacy}

2. A KONVERZIÓS VÍZIÓ
${result.vision}

3. PÉNZÜGYI POTENCIÁL
${result.financial}

4. BEFEKTETŐI MEGTĚRÜLÉSI KILÁTÁSOK
${result.roi}
                `;
                const blob = new Blob([fullText], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "kristofka-pitch.txt";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="w-full py-3 bg-bg-elevated/50 hover:bg-bg-elevated/80 text-white text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Teljes Pitch Letöltése
            </button>

            {/* Export Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePDFExport}
                className="flex-1 py-3 bg-bg-base border border-bg-elevated/50 rounded-xl text-xs font-bold text-white hover:border-amber-500/50 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                PDF Letöltés
              </button>
              <button
                onClick={handleNotebookLMExport}
                className="flex-1 py-3 bg-bg-base border border-bg-elevated/50 rounded-xl text-xs font-bold text-white hover:border-amber-500/50 transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                NotebookLM Adatcsomag
              </button>
            </div>

            {/* NotebookLM Instrukció Kisokos */}
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <h5 className="text-xs font-bold text-amber-500 font-mono">
                  NotebookLM Használati Instrukció
                </h5>
              </div>
              <ol className="text-xs text-slate-300 leading-relaxed space-y-2 list-decimal list-inside">
                <li>
                  Töltsd fel a forrásfájljaidat (alaprajzok, dokumentumok) a
                  NotebookLM-be.
                </li>
                <li>
                  Használd a letöltött Markdown fájlt kontextusként a mélyreható
                  elemzéshez.
                </li>
                <li>
                  Kérdezz a NotebookLM-től a pénzügyi mutatókról, kockázatokról
                  és fejlesztési lehetőségekről.
                </li>
              </ol>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
