"use client";

import React from "react";
import { Download, Copy, BookOpen } from "lucide-react";

export interface KristofkaResult {
  legacy: string;
  vision: string;
  financial: string;
  roi: string;
}

interface KristofkaPitchOutputProps {
  result: KristofkaResult;
  targetAudience: string;
  narrative: string;
  tone: string;
  energetikaiBesorolas: string;
  onReset: () => void;
  onNotifySuccess: (msg: string) => void;
}

export default function KristofkaPitchOutput({
  result,
  targetAudience,
  narrative,
  tone,
  energetikaiBesorolas,
  onReset,
  onNotifySuccess,
}: KristofkaPitchOutputProps) {
  const handleCopy = (text: string) => {
    void navigator.clipboard.writeText(text);
    onNotifySuccess("Szöveg másolva a vágólapra!");
  };

  const handlePDFExport = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    let yPosition = 20;

    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("Kristófka Befektetői Pitch", 20, yPosition);
    yPosition += 15;

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

    const sections: Array<{ title: string; body: string }> = [
      { title: "1. Az épület öröksége", body: result.legacy },
      { title: "2. A konverziós vízió", body: result.vision },
      { title: "3. Pénzügyi potenciál", body: result.financial },
      { title: "4. Befektetői megtérülési kilátások", body: result.roi },
    ];

    for (const sec of sections) {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(sec.title, 20, yPosition);
      yPosition += 10;
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const lines = doc.splitTextToSize(sec.body, 170);
      doc.text(lines, 20, yPosition);
      yPosition += lines.length * 5 + 10;
    }

    doc.save("kristofka-befektetoi-pitch.pdf");
    onNotifySuccess("PDF sikeresen letöltve!");
  };

  const handleNotebookLMExport = () => {
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
    onNotifySuccess("NotebookLM adatcsomag sikeresen letöltve!");
  };

  const handleTxtDownload = () => {
    const fullText = `KRISTÓFKA BEFEKTETŐI PITCH
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

4. BEFEKTETŐI MEGTÉRÜLÉSI KILÁTÁSOK
${result.roi}
`;
    const blob = new Blob([fullText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kristofka-pitch.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const cards: Array<{ title: string; content: string }> = [
    { title: "1. Az épület öröksége", content: result.legacy },
    { title: "2. A konverziós vízió", content: result.vision },
    { title: "3. Pénzügyi potenciál", content: result.financial },
    { title: "4. Befektetői megtérülési kilátások", content: result.roi },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] font-mono">
          Generált Befektetői Pitch
        </h4>
        <button
          onClick={onReset}
          className="text-xs text-slate-600 dark:text-slate-400 hover:text-[#0369A1] dark:hover:text-white transition-colors"
        >
          Új generálás
        </button>
      </div>

      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2"
        >
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-[#0369A1] dark:text-[#00B5F1] font-mono">
              {card.title}
            </h5>
            <button
              onClick={() => handleCopy(card.content)}
              className="p-1.5 hover:bg-slate-50 dark:bg-[#0B1120] text-slate-600 dark:text-slate-400 hover:text-[#0369A1] dark:hover:text-white rounded-lg transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono">
            {card.content}
          </p>
        </div>
      ))}

      <button
        onClick={handleTxtDownload}
        className="w-full py-3 bg-slate-50 dark:bg-[#0B1120] hover:bg-bg-elevated/80 text-[#0F172A] dark:text-[#F8FAFC] text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        Teljes Pitch Letöltése
      </button>

      <div className="flex gap-3">
        <button
          onClick={handlePDFExport}
          className="flex-1 py-3 bg-bg-base border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] hover:border-sky-500/50 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          PDF Letöltés
        </button>
        <button
          onClick={handleNotebookLMExport}
          className="flex-1 py-3 bg-bg-base border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] hover:border-sky-500/50 transition-colors flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          NotebookLM Adatcsomag
        </button>
      </div>

      <div className="bg-sky-500/5 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
          <h5 className="text-xs font-bold text-[#0369A1] dark:text-[#00B5F1] font-mono">
            NotebookLM Használati Instrukció
          </h5>
        </div>
        <ol className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-2 list-decimal list-inside">
          <li>
            Töltsd fel a forrásfájljaidat (alaprajzok, dokumentumok) a
            NotebookLM-be.
          </li>
          <li>
            Használd a letöltött Markdown fájlt kontextusként a mélyreható
            elemzéshez.
          </li>
          <li>
            Kérdezz a NotebookLM-től a pénzügyi mutatókról, kockázatokról és
            fejlesztési lehetőségekről.
          </li>
        </ol>
      </div>
    </div>
  );
}
