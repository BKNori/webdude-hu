import Button from "@/components/atoms/Button";
import GeometricIcon from "@/components/atoms/GeometricIcon";
import {
  FadeUpMotion,
  ScaleMotion,
} from "@/components/molecules/MotionWrapper";

export default function FinalCta() {
  return (
    <section className="min-h-[80vh] py-16 md:py-20 lg:py-24 flex items-center justify-center bg-transparent text-white relative overflow-hidden mb-0">
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

      {/* Overlay for text readability - lighter to show video more */}
      <div className="absolute inset-0 z-0 bg-slate-900/40" />

      <div className="px-6 lg:px-8 text-center max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        <ScaleMotion className="flex items-center justify-center gap-4 mb-8">
          <GeometricIcon type="diamond" size={40} color="text-[#00B5F1]" />
        </ScaleMotion>
        <FadeUpMotion delay={0.2}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-[#00B5F1] mb-4">
              VÉGÜL
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Készen állsz a szintlépésre?
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Indítsuk be a projektedet még ma!
            </p>
          </div>
        </FadeUpMotion>

        <FadeUpMotion delay={0.4} className="mt-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              href="/kapcsolat"
              variant="primary"
              className="px-8 py-4 text-lg"
            >
              Beszéljünk róla
            </Button>
          </div>
        </FadeUpMotion>
      </div>
    </section>
  );
}
