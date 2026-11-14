"use client";

import { motion } from "motion/react";
import { Layout } from "lucide-react";
import type { PosterWorkshopOutput } from "@/types/poster-workshop";
import { PosterConcept } from "@/components/organisms/PosterConcept";
import { PrintSpecs } from "@/components/organisms/PrintSpecs";
import { ColorPalette } from "@/components/organisms/ColorPalette";
import { Typography } from "@/components/organisms/Typography";
import { PosterLayout } from "@/components/organisms/PosterLayout";
import { Copywriting } from "@/components/organisms/Copywriting";
import { MidjourneyPrompts } from "@/components/organisms/MidjourneyPrompts";
import { PrintGuidelines } from "@/components/organisms/PrintGuidelines";
import { ExportFormats } from "@/components/organisms/ExportFormats";
import { PosterVariations } from "@/components/organisms/PosterVariations";

interface PosterOutputPanelProps {
  generatedOutput: PosterWorkshopOutput | null;
  copiedStates: Record<string, boolean>;
  onCopy: (text: string, key: string) => void;
}

/**
 * A Poster AI Műhely jobb oldali eredmény-panelje:
 * üres várakozó állapot vagy a 10 nyomdai specifikációs eredmény-szekció.
 */
export default function PosterOutputPanel({
  generatedOutput,
  copiedStates,
  onCopy,
}: PosterOutputPanelProps) {
  if (!generatedOutput) {
    return (
      <div className="bg-bg-elevated/30 backdrop-blur-xl border border-bg-elevated/80 rounded-2xl p-12 flex flex-col items-center justify-center space-y-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
          <Layout className="w-8 h-8 text-brand-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-heading font-normal uppercase tracking-wide text-white">
            Várakozás a generálásra
          </h3>
          <p className="text-sm text-slate-400">
            Töltsd ki az űrlapot a bal oldalon, és kattints a &ldquo;Poszter
            Generálása&rdquo; gombra.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <PosterConcept concept={generatedOutput.posterConcept} />
      <PrintSpecs
        specifications={generatedOutput.specifications}
        delay={0.1}
      />
      <ColorPalette
        colorPalette={generatedOutput.colorPalette}
        delay={0.2}
      />
      <Typography typography={generatedOutput.typography} delay={0.3} />
      <PosterLayout layout={generatedOutput.layout} delay={0.4} />
      <Copywriting
        copywriting={generatedOutput.copywriting}
        copiedStates={copiedStates}
        onCopy={onCopy}
        delay={0.5}
      />
      <MidjourneyPrompts
        prompts={generatedOutput.midjourneyPrompts}
        copiedStates={copiedStates}
        onCopy={onCopy}
        delay={0.6}
      />
      <PrintGuidelines
        guidelines={generatedOutput.printGuidelines}
        delay={0.7}
      />
      <ExportFormats formats={generatedOutput.exportFormats} delay={0.8} />
      <PosterVariations
        variations={generatedOutput.variations}
        delay={0.9}
      />
    </motion.div>
  );
}
