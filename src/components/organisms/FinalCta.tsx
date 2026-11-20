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
      className="py-24 md:py-32 flex items-center justify-center bg-[#F1F5F9] dark:bg-[#0B1120] text-text-primary relative overflow-hidden mb-0"
    >
      {/* Tiszta CSS Aurora & Mesh fényréteg (WebGL és videó nélkül, maximális LCP) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-60 dark:opacity-100"
      >
        <div
          className="absolute -top-32 left-1/4 h-120 w-120 rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 181, 241, 0.22) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 right-1/4 h-120 w-120 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(91, 33, 182, 0.14) 45%, transparent 75%)",
          }}
        />
        <div className="absolute inset-0 bg-grid-mesh opacity-50" />
      </div>

      <div className="px-6 lg:px-8 w-full max-w-4xl mx-auto relative z-10">
        <div className="luminous-card p-10 md:p-16 border-t-white dark:border-t-white/25 text-center flex flex-col items-center">
          <ScaleMotion className="flex items-center justify-center gap-4 mb-6">
            <GeometricIcon
              type="diamond"
              size={40}
              color="text-[#0369A1] dark:text-brand-primary"
            />
          </ScaleMotion>
          <FadeUpMotion delay={0.15}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow-badge text-[#0369A1] dark:text-brand-primary mb-4">
                {content.eyebrow}
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#0F172A] dark:text-white mb-6 leading-tight">
                {content.title}
              </h2>
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed">
                {content.subtitle}
              </p>
            </div>
          </FadeUpMotion>

          <FadeUpMotion delay={0.3} className="mt-8">
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
      </div>
    </section>
  );
}
