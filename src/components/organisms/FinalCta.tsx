import Button from "@/components/atoms/Button";
import GeometricIcon from "@/components/atoms/GeometricIcon";
import {
  FadeUpMotion,
  ScaleMotion,
} from "@/components/molecules/MotionWrapper";
import { FinalCtaContent } from "@/types/dictionary";

interface FinalCtaProps {
  /** Nyelvi tartalom a szótárból (HU/EN). */
  content: FinalCtaContent;
}

export default function FinalCta({ content }: FinalCtaProps) {
  return (
    <section
      id="contact"
      className="min-h-[80vh] py-16 md:py-20 lg:py-24 flex items-center justify-center bg-transparent text-text-primary relative overflow-hidden mb-0"
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
          style={{ mixBlendMode: "screen", objectPosition: "center top" }}
        >
          <source src="/webdude-neon-logo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay for text readability - sötétebb a kontraszt javítása */}
      <div className="absolute inset-0 z-0 bg-bg-base/70" />

      <div className="px-6 lg:px-8 text-center max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        <ScaleMotion className="flex items-center justify-center gap-4 mb-8">
          <GeometricIcon type="diamond" size={40} color="text-brand-primary" />
        </ScaleMotion>
        <FadeUpMotion delay={0.2}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-brand-primary mb-4">
              {content.eyebrow}
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-text-primary mb-6 leading-tight">
              {content.title}
            </h2>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
              {content.subtitle}
            </p>
          </div>
        </FadeUpMotion>

        <FadeUpMotion delay={0.4} className="mt-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              href={content.cta.href}
              variant="primary"
              className="px-8 py-4 text-lg"
            >
              {content.cta.label}
            </Button>
          </div>
        </FadeUpMotion>
      </div>
    </section>
  );
}
