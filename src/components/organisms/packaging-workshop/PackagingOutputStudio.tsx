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
import type { PackagingGenerationOutput } from "@/types/packaging-workshop";

interface PackagingOutputStudioProps {
  generatedOutput: PackagingGenerationOutput;
}

export default function PackagingOutputStudio({
  generatedOutput,
}: PackagingOutputStudioProps) {
  const specs = generatedOutput.dielineAndPrepressSpecs;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pt-4"
    >
      {/* Koncepció */}
      <div className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-3">
        <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
          {generatedOutput.conceptOverview.title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {(
            [
              ["Polcmegjelenés", generatedOutput.conceptOverview.shelfImpactStrategy],
              ["Unboxing élmény", generatedOutput.conceptOverview.unboxingExperience],
              ["Pozicionálás", generatedOutput.conceptOverview.targetPositioning],
            ] as const
          ).map(([label, text]) => (
            <p
              key={label}
              className="text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-slate-200 dark:border-slate-800"
            >
              <strong className="text-[#0369A1] dark:text-[#00B5F1]">{label}: </strong>
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* Stancrajz / Dieline specifikáció */}
      {specs && (
        <div className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1]" />
            Stancrajz & Prepress Specifikáció
          </h3>
          <p className="text-xs font-mono text-[#0369A1] dark:text-[#00B5F1] font-bold">
            Struktúra: {specs.structureCode} • Síkméret:{" "}
            {specs.flatDimensionsEstimationMm}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(
              [
                ["Kifutó + Safe Zone", specs.bleedAndSafeZoneMm],
                ["Kartonvastagság / Szálirány", specs.boardCaliperAndGrainDirection],
                ["Vonalkód (EAN-13)", specs.barcodeSpecsEan13],
                ["Tintakorlátozások", specs.inkAndVarnishRestrictions],
              ] as const
            ).map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1120] p-3"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {label}
                </p>
                <p className="text-xs font-mono font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-1">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-slate-200 dark:border-slate-800">
              <strong className="text-[#0369A1] dark:text-[#00B5F1]">Vágósík (Cut): </strong>
              {specs.cutLineSpec}
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-slate-200 dark:border-slate-800">
              <strong className="text-[#0369A1] dark:text-[#00B5F1]">Hajtósáv (Crease): </strong>
              {specs.creaseLineSpec}
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-slate-200 dark:border-slate-800">
              <strong className="text-[#0369A1] dark:text-[#00B5F1]">Ragasztófül szabály: </strong>
              {specs.glueFlapRule}
            </p>
          </div>
        </div>
      )}

      {/* Panelenkénti bontás */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1]" />
          Panelenkénti Tervezés
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {generatedOutput.panelBreakdown.map((panel, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    {panel.dimensionsMm}
                  </p>
                  <h4 className="text-sm font-black text-[#0F172A] dark:text-[#F8FAFC]">
                    {panel.panelName}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {panel.hierarchyRole}
                  </p>
                </div>
                <CopyButton
                  text={`${panel.panelName} (${panel.dimensionsMm})\nHeadline: ${panel.headlineOrClaim}\n${panel.bodyCopyOrElements.map((b) => `• ${b}`).join("\n")}\nSzimbólumok: ${panel.mandatorySymbols.join(", ")}\nFóliázás: ${panel.finishingHighlight}`}
                  label="Panel másolása"
                />
              </div>
              <p className="text-sm font-bold text-[#0369A1] dark:text-[#00B5F1]">
                {panel.headlineOrClaim}
              </p>
              <ul className="space-y-1">
                {panel.bodyCopyOrElements.map((point, i) => (
                  <li
                    key={i}
                    className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2"
                  >
                    <span className="text-[#0369A1] dark:text-[#00B5F1] mt-0.5">•</span>
                    {point}
                  </li>
                ))}
              </ul>
              {panel.mandatorySymbols.length > 0 && (
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  <strong className="text-slate-600 dark:text-slate-400">Kötelező: </strong>
                  {panel.mandatorySymbols.join(", ")}
                </p>
              )}
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                  {panel.finishingHighlight}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                {panel.graphicDesignTip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Színek + Tipográfia/Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1]" />
            CMYK + Pantone + HEX (Hordozó-viselkedés)
          </h3>
          <div className="space-y-3">
            {generatedOutput.colorSystem.map((color, i) => (
              <button
                key={i}
                type="button"
                onClick={() => navigator.clipboard.writeText(color.hex)}
                title="Kattintás: HEX másolása"
                className="w-full flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 p-3 hover:border-brand-primary/40 transition-all cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <span
                  className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="min-w-0">
                  <span className="block text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] truncate">
                    {color.name} — {color.hex}
                  </span>
                  <span className="block text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    {color.cmyk} • {color.pantone}
                  </span>
                  <span className="block text-[10px] text-slate-600 dark:text-slate-400">
                    {color.substrateBehavior}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
            <Type className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1]" />
            Tipográfia & EU Compliance
          </h3>
          <div className="space-y-2 text-xs">
            <p className="text-slate-700 dark:text-slate-300">
              <strong className="text-[#0F172A] dark:text-[#F8FAFC]">Márkabetű: </strong>
              {generatedOutput.typographyAndCompliance.brandDisplayFont}
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <strong className="text-[#0F172A] dark:text-[#F8FAFC]">Ígéret/USP betű: </strong>
              {generatedOutput.typographyAndCompliance.claimsFont}
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <strong className="text-[#0F172A] dark:text-[#F8FAFC]">Összetevők betű: </strong>
              {generatedOutput.typographyAndCompliance.ingredientsFont}
            </p>
            <p className="text-slate-600 dark:text-slate-400 font-mono">
              Min. jogi betűmagasság:{" "}
              {generatedOutput.typographyAndCompliance.minLegalFontSizeMm} mm (EU
              1169/2011)
            </p>
            <ul className="space-y-1.5 pt-2">
              {generatedOutput.typographyAndCompliance.euComplianceChecklist.map(
                (item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <span className="text-[#0369A1] dark:text-[#00B5F1] mt-0.5">•</span>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* AI Promptok */}
      <div className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
          <Bot className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1]" />
          AI Generáló Promptok
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(
            [
              ["Síkkiterített Stancrajz", generatedOutput.aiPrompts.flatDielineArtworkPrompt],
              ["Stúdió Packshot 3D", generatedOutput.aiPrompts.studioPackshot3DPrompt],
              ["Kiskereskedelmi Polc / Lifestyle", generatedOutput.aiPrompts.retailShelfLifestylePrompt],
              ["Unboxing Jelenet", generatedOutput.aiPrompts.unboxingScenePrompt],
            ] as const
          ).map(([label, text]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2"
            >
              <p className="text-[10px] font-black uppercase tracking-widest text-[#0369A1] dark:text-[#00B5F1]">
                {label}
              </p>
              <CopyButton text={text} label="Prompt másolása" />
            </div>
          ))}
          <div className="md:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
              Negatív Prompt
            </p>
            <CopyButton
              text={generatedOutput.aiPrompts.negativePrompt}
              label="Negatív prompt másolása"
            />
          </div>
        </div>
      </div>

      {/* Prepress Checklist */}
      <div className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          Csomagolás Prepress Ellenőrzőlista (8 pont)
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {generatedOutput.prepressChecklist.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-slate-200 dark:border-slate-800"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0">
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
