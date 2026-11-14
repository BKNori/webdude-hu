"use client";

import { motion } from "motion/react";
import {
  Grid3X3,
  Palette,
  Ruler,
  ShieldCheck,
  SwatchBook,
  Type,
  XCircle,
} from "lucide-react";
import CopyButton from "@/components/atoms/CopyButton";
import type { LogoGenerationOutput } from "@/types/logo-workshop";

interface LogoOutputStudioProps {
  generatedOutput: LogoGenerationOutput;
}

/**
 * A Logó AI Műhely eredmény-stúdiója:
 * 3 logókoncepció kártya (Illustrator/CorelDRAW rajz + Recraft v3 / Ideogram 2.0 / Midjourney v6.1 promptok),
 * nyomdai és digitális színrendszer swatch-ok, tipográfiai párosítás,
 * arculati variánsok és arculati szabályok.
 */
export default function LogoOutputStudio({
  generatedOutput,
}: LogoOutputStudioProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pt-4"
    >
      {/* 3 Koncepció Kártya */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <SwatchBook className="w-5 h-5 text-brand-primary" />
          Logókoncepciók (3 irány)
        </h3>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {generatedOutput.concepts.map((concept, idx) => (
            <div
              key={idx}
              className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-5 space-y-4"
            >
              <h4 className="text-sm font-black text-white">{concept.name}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {concept.metaphor}
              </p>

              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
                  Illustrator / CorelDRAW Rajz
                </p>
                <p className="text-[11px] text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/50 rounded-xl p-3 border border-slate-800/60">
                  {concept.illustratorBlueprint}
                </p>
              </div>

              <div className="space-y-2">
                <CopyButton
                  text={concept.recraftSvgPrompt}
                  label="Recraft v3 SVG prompt"
                />
                <CopyButton
                  text={concept.ideogramPrompt}
                  label="Ideogram 2.0 prompt"
                />
                <CopyButton
                  text={concept.midjourneyPrompt}
                  label="Midjourney v6.1 prompt"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Színrendszer Swatch-ok */}
      <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-5">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-brand-primary" />
          Nyomdai & Digitális Színrendszer
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(
            [
              ["primary", "Elsődleges"],
              ["secondary", "Másodlagos"],
              ["accent", "Akcentus"],
              ["base", "Alap (Sötét/Világos)"],
            ] as const
          ).map(([key, label]) => {
            const color = generatedOutput.colorSystem[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => navigator.clipboard.writeText(color.hex)}
                title="Kattintás: HEX másolása"
                className="text-left rounded-2xl border border-slate-800 overflow-hidden hover:border-brand-primary/40 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <div
                  className="h-20 w-full"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="p-3 bg-slate-950/60 space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {label}
                  </p>
                  <p className="text-xs font-mono font-bold text-white">
                    {color.hex}
                  </p>
                  <p className="text-[10px] font-mono text-slate-500">
                    {color.cmyk}
                  </p>
                  <p className="text-[10px] font-mono text-slate-500">
                    {color.pantone}
                  </p>
                  <p className="text-[10px] text-slate-400 leading-snug pt-1">
                    {color.psychology}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tipográfia */}
      <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Type className="w-5 h-5 text-brand-primary" />
          Tipográfiai Párosítás
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-800 p-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
              Elsődleges (logó)
            </p>
            <p className="text-sm font-bold text-white">
              {generatedOutput.typographySystem.primaryFont.name}
            </p>
            <p className="text-xs text-slate-400 font-mono">
              {generatedOutput.typographySystem.primaryFont.weight} •{" "}
              {generatedOutput.typographySystem.primaryFont.tracking}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {generatedOutput.typographySystem.primaryFont.ligatureTips}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 p-4 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Másodlagos (szlogen / arculat)
            </p>
            <p className="text-sm font-bold text-white">
              {generatedOutput.typographySystem.secondaryFont.name}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {generatedOutput.typographySystem.secondaryFont.usage}
            </p>
          </div>
        </div>
      </div>

      {/* Variánsok + Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Grid3X3 className="w-5 h-5 text-brand-primary" />
            Arculati Variánsok
          </h3>
          {(
            [
              ["primaryHorizontal", "Fő vízszintes"],
              ["stackedVertical", "Stackelt függőleges"],
              ["appIconFavicon", "App ikon / Favicon"],
              ["monochromeStamp", "Monokróm bélyegző"],
            ] as const
          ).map(([key, label]) => (
            <div
              key={key}
              className="rounded-2xl border border-slate-800 p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-widest text-slate-300">
                  {label}
                </p>
                <CopyButton
                  text={generatedOutput.logoVariants[key]}
                  label="Másolás"
                />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {generatedOutput.logoVariants[key]}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-slate-950/90 backdrop-blur-2xl border border-slate-800/60 rounded-3xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-primary" />
            Arculati Szabályok
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2">
              <Ruler className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
              <p className="text-slate-300">
                {generatedOutput.brandGuidelines.clearSpaceRule}
              </p>
            </div>
            <p className="text-slate-400 font-mono">
              Min. méret: {generatedOutput.brandGuidelines.minSizePx} •{" "}
              {generatedOutput.brandGuidelines.minSizeMm}
            </p>
            <ul className="space-y-1.5">
              {generatedOutput.brandGuidelines.donts.map((dont, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-400">
                  <XCircle
                    className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{dont}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
