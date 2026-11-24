"use client";

import { motion } from "motion/react";
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  Layers,
  Palette,
  Ruler,
  Type,
} from "lucide-react";
import CopyButton from "@/components/atoms/CopyButton";
import type { SignageGenerationOutput } from "@/types/signage-workshop";

interface SignageOutputStudioProps {
  generatedOutput: SignageGenerationOutput;
}

export default function SignageOutputStudio({
  generatedOutput,
}: SignageOutputStudioProps) {
  const specs = generatedOutput.lfpTechnicalSpecs;

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
              ["3 másodperces szabály", generatedOutput.conceptOverview.threeSecondRuleStrategy],
              ["Távolsági logika", generatedOutput.conceptOverview.distanceVisibilityLogic],
              ["Környezeti kontraszt", generatedOutput.conceptOverview.environmentContrastTip],
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

      {/* LFP Technikai specifikáció */}
      {specs && (
        <div className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1]" />
            LFP Mérnöki Specifikáció & Holttér Térkép
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(
              [
                ["Méretarány", specs.workingScaleRatio],
                ["Fájl DPI skálán", specs.recommendedFileDpiAtScale],
                ["1:1 DPI", specs.effectivePrintDpi1to1],
                ["Min. betűmagasság", specs.minLetterHeightMmForDistance],
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-brand-primary/30">
              <strong className="text-[#0369A1] dark:text-[#00B5F1]">Holttér / Hardver: </strong>
              {specs.hardwareDeadZones}
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-slate-200 dark:border-slate-800">
              <strong className="text-[#0369A1] dark:text-[#00B5F1]">Vágósík + Fehér tinta: </strong>
              {specs.cutContourAndWhiteInkRule}
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-slate-200 dark:border-slate-800">
              <strong className="text-[#0369A1] dark:text-[#00B5F1]">Kifutó + Hegesztés: </strong>
              {specs.bleedAndHemmingMm}
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-slate-200 dark:border-slate-800">
              <strong className="text-[#0369A1] dark:text-[#00B5F1]">Színprofil + UV: </strong>
              {specs.colorProfileAndUvResistance}
            </p>
          </div>
        </div>
      )}

      {/* Magassági zónaterv */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1]" />
          Magassági Zónaterv
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {generatedOutput.zoneBreakdown.map((zone, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    {zone.heightRangeOrPosition}
                  </p>
                  <h4 className="text-sm font-black text-[#0F172A] dark:text-[#F8FAFC]">
                    {zone.zoneName}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Láthatóság: {zone.visibilityPriority}
                  </p>
                </div>
                <CopyButton
                  text={`${zone.zoneName} (${zone.heightRangeOrPosition})\nHeadline: ${zone.headlineOrElement}\n${zone.subcopyOrDetails.map((d) => `• ${d}`).join("\n")}\nTechnikai: ${zone.technicalWarning}\nDizájn: ${zone.designTip}`}
                  label="Zóna másolása"
                />
              </div>
              <p className="text-sm font-bold text-[#0369A1] dark:text-[#00B5F1]">
                {zone.headlineOrElement}
              </p>
              <ul className="space-y-1">
                {zone.subcopyOrDetails.map((d, i) => (
                  <li
                    key={i}
                    className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2"
                  >
                    <span className="text-[#0369A1] dark:text-[#00B5F1] mt-0.5">•</span>
                    {d}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                <p className="text-orange-400/90 bg-orange-500/10 rounded-lg p-2 border border-orange-500/20 flex items-start gap-1.5">
                  <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                  {zone.technicalWarning}
                </p>
                <p className="text-emerald-700 dark:text-emerald-400/90 bg-emerald-500/10 rounded-lg p-2 border border-emerald-500/20">
                  {zone.designTip}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Színek + Tipográfia távolság */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1]" />
            CMYK + RAL/Pantone + HEX (Külső Kontraszt)
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
                    {color.cmyk} • {color.pantoneOrRal}
                  </span>
                  <span className="block text-[10px] text-slate-600 dark:text-slate-400">
                    {color.outdoorContrastNote}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
            <Type className="w-5 h-5 text-[#0369A1] dark:text-[#00B5F1]" />
            Távolsági Tipográfia (1:1 mm)
          </h3>
          <div className="space-y-2 text-xs">
            <p className="text-slate-700 dark:text-slate-300">
              <strong className="text-[#0F172A] dark:text-[#F8FAFC]">Főcím betű: </strong>
              {generatedOutput.typographyAndDistanceScale.headlineFont}
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <strong className="text-[#0F172A] dark:text-[#F8FAFC]">Másodlagos: </strong>
              {generatedOutput.typographyAndDistanceScale.secondaryFont}
            </p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1120] p-2 text-center">
                <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase">Főcím</p>
                <p className="text-xs font-mono font-bold text-[#0369A1] dark:text-[#00B5F1]">
                  {generatedOutput.typographyAndDistanceScale.headlineSizeMm1to1}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1120] p-2 text-center">
                <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase">Alcím</p>
                <p className="text-xs font-mono font-bold text-[#0369A1] dark:text-[#00B5F1]">
                  {generatedOutput.typographyAndDistanceScale.subheadSizeMm1to1}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1120] p-2 text-center">
                <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase">Kapcsolat</p>
                <p className="text-xs font-mono font-bold text-[#0369A1] dark:text-[#00B5F1]">
                  {generatedOutput.typographyAndDistanceScale.contactSizeMm1to1}
                </p>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">
              {generatedOutput.typographyAndDistanceScale.maxWordsCountRule}
            </p>
            <p className="text-slate-500 dark:text-slate-400 italic">
              {generatedOutput.typographyAndDistanceScale.kerningAndStrokeAdvice}
            </p>
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
              ["Hero Háttérgrafika", generatedOutput.aiPrompts.heroBackgroundGraphicPrompt],
              ["In-Situ Mockup", generatedOutput.aiPrompts.realisticMockupInSituPrompt],
              ["Vektor Vágott Grafika", generatedOutput.aiPrompts.vectorCutGraphicPrompt],
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

      {/* LFP Prepress Checklist */}
      <div className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          LFP & Dekoratőr Prepress Checklist (8 pont)
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {generatedOutput.lfpPrepressChecklist.map((item, i) => (
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
