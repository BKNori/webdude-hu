import {
  compileOnlineGraphicsPrompt,
  DEFAULT_ONLINE_GRAPHICS_STATE,
  ONLINE_GRAPHICS_PRESETS,
  type OnlineGraphicsStudioState,
} from "@/data/online-graphics-studio-config";

describe("Online Graphics & Campaign Pro Prompt Studio config & compiler", () => {
  it("mind a 6 szakmai kampány preset érvényes, nem üres promptot fordít", () => {
    expect(ONLINE_GRAPHICS_PRESETS).toHaveLength(6);

    for (const preset of ONLINE_GRAPHICS_PRESETS) {
      const merged: OnlineGraphicsStudioState = {
        ...DEFAULT_ONLINE_GRAPHICS_STATE,
        ...preset.state,
      };
      const compiled = compileOnlineGraphicsPrompt(merged);
      expect(compiled.primaryPrompt.length).toBeGreaterThan(40);
      expect(compiled.stats.estimatedTokens).toBeGreaterThan(10);
    }
  });

  it("9:16 Reels/TikTok formátumnál beépíti a felső 14% és alsó 22% UI safe-zone utasítást", () => {
    const compiled = compileOnlineGraphicsPrompt({
      ...DEFAULT_ONLINE_GRAPHICS_STATE,
      engine: "midjourney-v7",
      platformFormat: "reels-tiktok-shorts",
      customAspectRatio: "9:16",
    });

    expect(compiled.primaryPrompt).toContain("top 14% and bottom 22%");
    expect(compiled.primaryPrompt).toContain("--ar 9:16");
  });

  it("beépíti a copy-space és a WCAG AA kontraszt-zóna instrukciókat", () => {
    const compiled = compileOnlineGraphicsPrompt({
      ...DEFAULT_ONLINE_GRAPHICS_STATE,
      copySpace: "left-40",
      wcagContrastBackdrop: true,
    });

    expect(compiled.primaryPrompt).toContain("left 40% of the frame");
    expect(compiled.primaryPrompt).toContain("WCAG AA compliant clean backdrop zone");
  });

  it("Midjourney v7 esetén tartalmazza a haladó flageket, Flux 1.1 Pro esetén pedig 0 --flaget", () => {
    const mj = compileOnlineGraphicsPrompt({
      ...DEFAULT_ONLINE_GRAPHICS_STATE,
      engine: "midjourney-v7",
      stylize: 450,
      chaos: 20,
      weird: 120,
      sref: "https://example.com/style.jpg",
      sw: 300,
      oref: "https://example.com/obj.jpg",
      cw: 90,
      tile: true,
      draft: true,
    });

    expect(mj.primaryPrompt).toContain("--stylize 450");
    expect(mj.primaryPrompt).toContain("--chaos 20");
    expect(mj.primaryPrompt).toContain("--weird 120");
    expect(mj.primaryPrompt).toContain("--sref https://example.com/style.jpg --sw 300");
    expect(mj.primaryPrompt).toContain("--oref https://example.com/obj.jpg --cw 90");
    expect(mj.primaryPrompt).toContain("--tile");
    expect(mj.primaryPrompt).toContain("--draft");

    const flux = compileOnlineGraphicsPrompt({
      ...DEFAULT_ONLINE_GRAPHICS_STATE,
      engine: "flux-1-1-pro",
    });
    expect(flux.primaryPrompt).not.toMatch(/\s--[a-z0-9-]+/i);
  });
});
