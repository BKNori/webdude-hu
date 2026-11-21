import {
  buildApparelSpecSummary,
  compileApparelPrompt,
  DEFAULT_APPAREL_STUDIO_STATE,
  APPAREL_PRESETS,
  type ApparelStudioState,
} from "@/data/apparel-studio-config";

describe("Apparel, Textile & Merch Pro Prompt Studio config & compilers", () => {
  it("mind a 6 szakmai ruházati/merch preset érvényes, nem üres promptot fordít", () => {
    expect(APPAREL_PRESETS).toHaveLength(6);

    for (const preset of APPAREL_PRESETS) {
      const merged: ApparelStudioState = {
        ...DEFAULT_APPAREL_STUDIO_STATE,
        ...preset.state,
      };
      const compiled = compileApparelPrompt(merged);
      expect(compiled.primaryPrompt.length).toBeGreaterThan(50);
      expect(compiled.stats.estimatedTokens).toBeGreaterThan(12);
    }
  });

  it("a 3 szakmai mód (print-artwork, garment-tech-pack, lookbook-mockup) eltérő direktívákat ad", () => {
    const artwork = compileApparelPrompt({
      ...DEFAULT_APPAREL_STUDIO_STATE,
      mode: "print-artwork",
    });
    expect(artwork.primaryPrompt).toContain("Flat isolated 2D apparel print production artwork");
    expect(artwork.negativePrompt).toContain("t-shirt mockup");

    const techPack = compileApparelPrompt({
      ...DEFAULT_APPAREL_STUDIO_STATE,
      mode: "garment-tech-pack",
    });
    expect(techPack.primaryPrompt).toContain("Orthographic 2D CAD technical flat sketch");
    expect(techPack.negativePrompt).toContain("human model");

    const lookbook = compileApparelPrompt({
      ...DEFAULT_APPAREL_STUDIO_STATE,
      mode: "lookbook-mockup",
      mockupStyle: "ghost-mannequin",
    });
    expect(lookbook.primaryPrompt).toContain("invisible ghost-mannequin 3D hollow torso");
  });

  it("érvényesíti a DTF no-glow, a Hímzés 1.2-1.5mm & 5mm & no-gradient, a Szita 45-55 LPI/choke és az AOP --tile szabályokat", () => {
    const dtf = compileApparelPrompt({
      ...DEFAULT_APPAREL_STUDIO_STATE,
      mode: "print-artwork",
      printTech: "dtf",
    });
    expect(dtf.primaryPrompt).toContain("STRICTLY NO semi-transparent fade");
    expect(dtf.negativePrompt).toContain("outer glow");

    const embroidery = compileApparelPrompt({
      ...DEFAULT_APPAREL_STUDIO_STATE,
      mode: "print-artwork",
      printTech: "embroidery",
    });
    expect(embroidery.primaryPrompt).toContain("1.2-1.5mm");
    expect(embroidery.primaryPrompt).toContain("5mm");
    expect(embroidery.negativePrompt).toContain("color gradients");

    const screen = compileApparelPrompt({
      ...DEFAULT_APPAREL_STUDIO_STATE,
      mode: "print-artwork",
      printTech: "screen-print",
    });
    expect(screen.primaryPrompt).toContain("45-55 LPI");
    expect(screen.primaryPrompt).toContain("0.25mm white underbase choke");

    const aop = compileApparelPrompt({
      ...DEFAULT_APPAREL_STUDIO_STATE,
      mode: "print-artwork",
      engine: "midjourney-v7",
      printTech: "sublimation-aop",
    });
    expect(aop.primaryPrompt).toContain("--tile");
  });

  it("sötét alapruha esetén a buildApparelSpecSummary tartalmazza a fehér alányomás (White Underbase) figyelmeztetést és a Tech Pack BOM listát", () => {
    const summary = buildApparelSpecSummary({
      ...DEFAULT_APPAREL_STUDIO_STATE,
      fabricBaseColor: "dark-black",
    });
    expect(summary).toContain("White Underbase");
    expect(summary).toContain("TECH PACK / BOM");
    expect(summary).toContain("240–300 GSM Heavyweight Jersey");
  });

  it("Flux 1.1 Pro esetén garantáltan 0 --flag kerül a kimenetbe", () => {
    const flux = compileApparelPrompt({
      ...DEFAULT_APPAREL_STUDIO_STATE,
      engine: "flux-1-1-pro",
    });
    expect(flux.primaryPrompt).not.toMatch(/\s--[a-z0-9-]+/i);
  });
});
