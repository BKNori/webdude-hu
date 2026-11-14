"use client";

import { motion } from "motion/react";
import {
  Bot,
  CheckCircle2,
  Layers,
  Palette,
  Ruler,
  Type,
} from "lucide-react";
import CopyButton from "@/components/atoms/CopyButton";
import type { FlyerWorkshopOutput } from "@/types/flyer-workshop";

interface FlyerOutputStudioProps {
  generatedOutput: FlyerWorkshopOutput;
}

export default function FlyerOutputStudio({
  generatedOutput,
}: FlyerOutputStudioProps) {
  const specs = generatedOutput.prepressSpecs;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pt-4"
    >
      {/* Koncepció */}
      <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-3">
        <h3 className="text-lg font-bold text-white">
          {generatedOutput.conceptOverview.title}
        </h3>
        <p className="text-sm text-slate-300">
          {generatedOutput.conceptOverview.creativeDirection}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <p className="text-slate-400 leading-relaxed bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
            <strong className="text-brand-primary">Tekintetvezetés: </strong>
            {generatedOutput.conceptOverview.eyeTrackingStrategy}
          </p>
          <p className="text-slate-400 leading-relaxed bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
            <strong className="text-brand-primary">Konverziós pszichológia: </strong>
            {generatedOutput.conceptOverview.conversionPsychology}
          </p>
        </div>
      </div>

      {/* Prepress Műszaki Rajz */}
      {specs && (
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Ruler className="w-5 h-5 text-brand-primary" />
            Prepress & Hajtási Műszaki Rajz
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(
              [
                ["Vágott méret", specs.trimSizeMm],
                ["Kifutós méret", specs.bleedSizeMm],
                ["Nyerset (gross)", specs.grossSizeMm],
                ["Biztonsági zóna", specs.safeZoneMm],
                ["Max. TAC", specs.maxInkCoverageTac],
                ["Rich Black", specs.richBlackFormula],
                ["QR min. méret", specs.qrCodeMinSizeMm],
                ["Színprofil", specs.colorProfile],
              ] as const
            ).map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-slate-800 bg-slate-950/50 p-3"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {label}
                </p>
                <p className="text-xs font-mono font-bold text-white mt-1">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-xs">
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-brand-primary">Hajtási mechanika: </strong>
              {specs.foldingMechanics}
            </p>
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-brand-primary">Papír: </strong>
              {specs.paperRecommendation}
            </p>
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-brand-primary">Fekete szöveg szabály: </strong>
              {specs.bodyTextBlackRule}
            </p>
          </div>
        </div>
      )}

      {/* Panelenkénti Zónaterv & Copy */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-primary" />
          Panelenkénti Zónaterv & Kész Szövegek
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {generatedOutput.panelBreakdown.map((panel, idx) => (
            <div
              key={idx}
              className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
                    {panel.sizeMm}
                  </p>
                  <h4 className="text-sm font-black text-white">
                    {panel.panelName}
                  </h4>
                </div>
                <CopyButton
                  text={`${panel.panelName}\nFőcím: ${panel.headline}\nAlcím: ${panel.subheadline}\n${panel.bodyPoints.map((b) => `• ${b}`).join("\n")}\nCTA: ${panel.ctaOrElement}`}
                  label="Panel másolása"
                />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {panel.visualZonePlan}
              </p>
              <div className="space-y-1.5">
                <p className="text-sm font-bold text-white">{panel.headline}</p>
                <p className="text-xs text-brand-primary font-semibold">
                  {panel.subheadline}
                </p>
                <ul className="space-y-1">
                  {panel.bodyPoints.map((point, i) => (
                    <li
                      key={i}
                      className="text-xs text-slate-400 flex items-start gap-2"
                    >
                      <span className="text-brand-primary mt-0.5">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="text-xs font-bold text-emerald-400 pt-1">
                  {panel.ctaOrElement}
                </p>
                <p className="text-[11px] text-slate-500 italic">
                  {panel.layoutTip}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Színrendszer + Tipográfia */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-brand-primary" />
            CMYK + Pantone + HEX Színek
          </h3>
          <div className="space-y-3">
            {generatedOutput.colorSystem.map((color, i) => (
              <button
                key={i}
                type="button"
                onClick={() => navigator.clipboard.writeText(color.hex)}
                title="Kattintás: HEX másolása"
                className="w-full flex items-center gap-3 rounded-xl border border-slate-800 p-3 hover:border-brand-primary/40 transition-all cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <span
                  className="w-10 h-10 rounded-lg border border-slate-700 shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="min-w-0">
                  <span className="block text-xs font-bold text-white truncate">
                    {color.name} — {color.hex}
                  </span>
                  <span className="block text-[10px] font-mono text-slate-500">
                    {color.cmyk} • {color.pantone}
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    {color.printUsage}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Type className="w-5 h-5 text-brand-primary" />
            Nyomdai Tipográfiai Skála
          </h3>
          <div className="space-y-2 text-xs">
            <p className="text-slate-300">
              <strong className="text-white">Főcím: </strong>
              {generatedOutput.typographyHierarchy.headlineFont}
            </p>
            <p className="text-slate-300">
              <strong className="text-white">Szövegtörzs: </strong>
              {generatedOutput.typographyHierarchy.bodyFont}
            </p>
            <p className="text-slate-300">
              <strong className="text-white">Kiemelés: </strong>
              {generatedOutput.typographyHierarchy.accentFont}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              {(
                [
                  ["Főcím", generatedOutput.typographyHierarchy.printSizingPt.mainHeadlinePt],
                  ["Alcím", generatedOutput.typographyHierarchy.printSizingPt.subheadPt],
                  ["Szövegtörzs", generatedOutput.typographyHierarchy.printSizingPt.bodyTextPt],
                  ["Apró betű min.", generatedOutput.typographyHierarchy.printSizingPt.finePrintMinPt],
                ] as const
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg border border-slate-800 bg-slate-950/50 p-2"
                >
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                    {label}
                  </p>
                  <p className="text-xs font-mono font-bold text-brand-primary">
                    {value} pt
                  </p>
                </div>
              ))}
            </div>
            <p className="text-slate-400 leading-relaxed pt-1">
              {generatedOutput.typographyHierarchy.kerningAndLeadingTips}
            </p>
          </div>
        </div>
      </div>

      {/* AI Promptok */}
      <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Bot className="w-5 h-5 text-brand-primary" />
          AI Generáló Promptok
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-800 p-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
              Hero Key Visual (MJ v6.1 / Flux)
            </p>
            <CopyButton
              text={generatedOutput.aiPrompts.heroKeyVisualPrompt}
              label="Prompt másolása"
            />
          </div>
          <div className="rounded-2xl border border-slate-800 p-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
              Layout Inspiráció (Ideogram 2.0)
            </p>
            <CopyButton
              text={generatedOutput.aiPrompts.ideogramLayoutPrompt}
              label="Prompt másolása"
            />
          </div>
          <div className="rounded-2xl border border-slate-800 p-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
              3D Print Mockup
            </p>
            <CopyButton
              text={`${generatedOutput.aiPrompts.printMockup3DPrompt}\n\nNEGATÍV: ${generatedOutput.aiPrompts.negativePrompt}`}
              label="Prompt + negatív másolása"
            />
          </div>
        </div>
      </div>

      {/* Prepress Checklist */}
      <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          Prepress Ellenőrzőlista (8 pont)
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {generatedOutput.prepressChecklist.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/50 rounded-xl p-3 border border-slate-800/60"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
