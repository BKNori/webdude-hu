import { buildVisualPrompt } from "@/lib/prompt-engine/builders";
import { ANTI_AI_SLOP_NEGATIVE_CHIPS } from "@/lib/prompt-engine/presets";
import type { CompiledPromptResult, VisualTargetEngine } from "@/lib/prompt-engine/types";

export type OnlinePlatformFormatId =
  | "web-hero"
  | "og-blog-cover"
  | "instagram-feed"
  | "reels-tiktok-shorts"
  | "display-meta-ad"
  | "youtube-thumbnail"
  | "email-header";

export type CopySpaceId = "none" | "left-40" | "right-40" | "top-third" | "bottom-third" | "center-framed";
export type ReadingPatternId = "f-pattern" | "z-pattern" | "golden-ratio" | "center-hero" | "diagonal-dynamic";
export type DepthSeparationId = "shallow-bokeh" | "crisp-editorial" | "isometric-clean" | "layered-depth";

export interface PlatformFormatSpec {
  id: OnlinePlatformFormatId;
  label: string;
  aspectRatio: string;
  pixelSpec: string;
  safeZonePromptHint: string;
  safeZoneInfoHu: string;
  isVerticalSafeZoneWarning?: boolean;
}

export interface StudioOptionItem<TId extends string = string> {
  id: TId;
  label: string;
  promptHint: string;
  colors?: string[];
}

export interface OnlineGraphicsStudioState {
  engine: VisualTargetEngine;
  subject: string;
  brandOrAudience: string;
  platformFormat: OnlinePlatformFormatId;
  customAspectRatio: string;
  copySpace: CopySpaceId;
  readingPattern: ReadingPatternId;
  depthSeparation: DepthSeparationId;
  visualStyle: string;
  opticsLens: string;
  lightingPhysics: string;
  materials: string[];
  paletteLockId: string;
  customHexColors: string;
  exactTextToRender: string;
  typographyDirection: string;
  wcagContrastBackdrop: boolean;
  stylize: number;
  chaos: number;
  weird: number;
  styleRaw: boolean;
  tile: boolean;
  draft: boolean;
  sref: string;
  sw: number;
  oref: string;
  cw: number;
  maxVectorColors: number;
  vectorStrokeStyle: string;
  videoCameraMove: string;
  videoHook: string;
  videoPacing: string;
  negativeChipIds: string[];
  customNegative: string;
}

export const ONLINE_PLATFORM_FORMATS: readonly PlatformFormatSpec[] = [
  { id: "web-hero", label: "Web Hero (16:9 / 21:9)", aspectRatio: "16:9", pixelSpec: "1920×1080 px (16:9 / 21:9)", safeZonePromptHint: "Wide desktop hero composition with clean breathing room for headline & CTA overlay", safeZoneInfoHu: "Asztali hero: hagyj tiszta kontrasztos teret a H1 és CTA gomb számára." },
  { id: "og-blog-cover", label: "OG / Blog Cover (1200×630)", aspectRatio: "16:9", pixelSpec: "1200×630 px (1.91:1)", safeZonePromptHint: "1.91:1 OpenGraph share card framing, central 80% focal safe area against platform cropping", safeZoneInfoHu: "Megosztási kártya: a fő téma a középső 80%-os biztonsági zónában maradjon." },
  { id: "instagram-feed", label: "Instagram Feed (4:5)", aspectRatio: "4:5", pixelSpec: "1080×1350 px (4:5)", safeZonePromptHint: "Vertical 4:5 feed composition maximizing mobile screen real estate with 8% edge margin", safeZoneInfoHu: "Mobil feed: 4:5 álló arány, 8% szélső biztonsági margóval." },
  { id: "reels-tiktok-shorts", label: "Reels / TikTok / Shorts (9:16)", aspectRatio: "9:16", pixelSpec: "1080×1920 px (9:16 UI Safe-Zone)", safeZonePromptHint: "Strict 9:16 vertical mobile safe-zone framing: keep top 14% and bottom 22% free of critical subjects or text to avoid UI overlay occlusion", safeZoneInfoHu: "FIGYELEM: Kötelező UI safe-zone — a felső 14% és az alsó 22% maradjon szabadon a feliratok/gombok miatt!", isVerticalSafeZoneWarning: true },
  { id: "display-meta-ad", label: "Google Display / Meta Ad (1:1)", aspectRatio: "1:1", pixelSpec: "1080×1080 px (1:1 / 1.91:1)", safeZonePromptHint: "Square 1:1 commercial ad framing with immediate focal hierarchy and 10% border buffer", safeZoneInfoHu: "Hirdetési négyzet: azonnali fókuszpont és tiszta 10% szegélyzóna." },
  { id: "youtube-thumbnail", label: "YouTube Thumbnail (16:9)", aspectRatio: "16:9", pixelSpec: "1280×720 px (16:9)", safeZonePromptHint: "High-impact YouTube thumbnail composition, keep bottom-right corner clear of key details for duration timestamp badge", safeZoneInfoHu: "YouTube borító: a jobb alsó sarkot hagyd szabadon az időbélyeg miatt." },
  { id: "email-header", label: "Email Header (600×250)", aspectRatio: "16:9", pixelSpec: "600×250 px (16:9 panoráma crop)", safeZonePromptHint: "Panoramic horizontal email header strip (600x250 proportion), subject centered vertically in middle band", safeZoneInfoHu: "Hírlevél fejléc: keskeny vízszintes sáv, a fókusz a középső sávban legyen." },
];

export const COPY_SPACE_OPTIONS: readonly StudioOptionItem<CopySpaceId>[] = [
  { id: "none", label: "Nincs külön szövegtér", promptHint: "" },
  { id: "left-40", label: "Bal 40% tiszta copy-space", promptHint: "Leave the left 40% of the frame as clean, uncluttered negative copy space for typography overlay; place primary subject on the right" },
  { id: "right-40", label: "Jobb 40% tiszta copy-space", promptHint: "Leave the right 40% of the frame as clean, uncluttered negative copy space for typography overlay; anchor subject on the left" },
  { id: "top-third", label: "Felső harmad szövegtér", promptHint: "Keep top third uncluttered with smooth tonal gradient for headline placement" },
  { id: "bottom-third", label: "Alsó harmad szövegtér", promptHint: "Keep bottom third clean and low-detail for lower-third caption and CTA" },
  { id: "center-framed", label: "Középre zárt keret", promptHint: "Symmetrical perimeter framing leaving a clean central focal zone" },
];

export const READING_PATTERN_OPTIONS: readonly StudioOptionItem<ReadingPatternId>[] = [
  { id: "f-pattern", label: "F-Pattern (Web)", promptHint: "F-pattern visual hierarchy guiding eye from top-left anchor across" },
  { id: "z-pattern", label: "Z-Pattern (Ad/Banner)", promptHint: "Z-pattern eye-tracking flow from top-left to bottom-right focal CTA" },
  { id: "golden-ratio", label: "Aranymetszés", promptHint: "Golden ratio spiral composition with balanced negative space" },
  { id: "center-hero", label: "Centrális Hero", promptHint: "Commanding central hero subject with radial visual balance" },
  { id: "diagonal-dynamic", label: "Diagonális Dinamika", promptHint: "Dynamic diagonal leading lines creating forward momentum" },
];

export const DEPTH_SEPARATION_OPTIONS: readonly StudioOptionItem<DepthSeparationId>[] = [
  { id: "shallow-bokeh", label: "Sekély Bokeh (f/1.4)", promptHint: "Shallow depth of field f/1.4 separating subject from creamy out-of-focus background" },
  { id: "crisp-editorial", label: "Éles Editorial (f/8)", promptHint: "Crisp f/8 studio sharpness across focal plane with clean backdrop separation" },
  { id: "isometric-clean", label: "Izometrikus Tiszta", promptHint: "Orthographic isometric perspective with crisp floating layer separation" },
  { id: "layered-depth", label: "3-Rétegű Parallax", promptHint: "Three distinct depth planes: subtle foreground accent, sharp midground subject, atmospheric background" },
];

export const VISUAL_STYLE_OPTIONS: readonly StudioOptionItem[] = [
  { id: "glassmorphism", label: "Luminous Glassmorphism", promptHint: "luminous frosted glassmorphism panels, subtle inner refraction, layered depth" },
  { id: "apple-bento", label: "Apple Bento Grid", promptHint: "Apple-inspired modular bento architecture, precision radii, generous breathing room" },
  { id: "quiet-luxury", label: "Quiet Luxury Editorial", promptHint: "quiet luxury editorial aesthetic, restrained tonal elegance, tactile realism" },
  { id: "neo-brutalism", label: "Neo-Brutalism", promptHint: "high-contrast neo-brutalist graphic layout, bold structural borders, raw confidence" },
  { id: "swiss-grid", label: "Swiss Minimalist Grid", promptHint: "International Typographic Swiss grid precision, asymmetric balance, strict geometry" },
  { id: "editorial-photo", label: "Címlap Fotórealizmus", promptHint: "flagship commercial campaign photography, authentic optical physics, natural skin and material micro-detail" },
  { id: "octane-clay", label: "3D Octane / Taktilis", promptHint: "Cinema4D & Octane physical render, tactile matte & anodized surfaces, global illumination" },
  { id: "kinetic-type", label: "Kinetic Poster", promptHint: "kinetic poster design, bold typographic focal structure, editorial contrast" },
];

export const TYPOGRAPHY_DIRECTION_OPTIONS: readonly StudioOptionItem[] = [
  { id: "display-sans", label: "Display Grotesque Sans", promptHint: "clean high-impact geometric grotesque display sans-serif typography" },
  { id: "condensed-editorial", label: "Condensed Editorial", promptHint: "tall condensed all-caps editorial headline typography with tight tracking" },
  { id: "modern-serif", label: "Modern High-Contrast Serif", promptHint: "refined high-contrast editorial serif typography" },
  { id: "geometric-tech", label: "Geometric Tech Mono", promptHint: "precision technical sans and monospace label hierarchy" },
  { id: "bold-brutalist", label: "Heavy Brutalist", promptHint: "ultra-heavy block display lettering with sharp kerning" },
];

export const OPTICS_LENS_OPTIONS: readonly StudioOptionItem[] = [
  { id: "24mm-wide", label: "24mm Wide", promptHint: "24mm wide-angle prime lens, expansive spatial perspective" },
  { id: "35mm-editorial", label: "35mm Editorial", promptHint: "35mm reportage prime lens, natural environmental context" },
  { id: "50mm-natural", label: "50mm Natural", promptHint: "50mm standard prime lens, zero distortion human-eye perspective" },
  { id: "85mm-portrait", label: "85mm f/1.4 Portrait", promptHint: "85mm f/1.4 G-Master lens, flattering optical compression, silky bokeh" },
  { id: "100mm-macro", label: "100mm Macro", promptHint: "100mm f/2.8 macro lens, razor-sharp surface micro-texture" },
  { id: "tilt-shift", label: "24mm Tilt-Shift", promptHint: "24mm architectural tilt-shift lens, selective focal plane, straight verticals" },
];

export const LIGHTING_PHYSICS_OPTIONS: readonly StudioOptionItem[] = [
  { id: "softbox-studio", label: "Softbox Studio", promptHint: "large diffused overhead softbox key light with controlled fill and clean specular highlights" },
  { id: "chiaroscuro", label: "Chiaroscuro", promptHint: "dramatic chiaroscuro directional lighting, deep sculpted shadows, rich tonal falloff" },
  { id: "volumetric-rim", label: "Volumetric Rim", promptHint: "crisp dual rim lights carving subject edges out of dark slate atmosphere" },
  { id: "golden-hour", label: "Natural Daylight", promptHint: "warm low-angle natural directional sunlight with authentic soft shadow bounce" },
  { id: "high-key", label: "High-Key Commercial", promptHint: "bright high-key commercial studio illumination, clean shadowless daylight clarity" },
  { id: "dark-studio", label: "Dark Moody Studio", promptHint: "low-key obsidian studio lighting with precision accent grazing light" },
];

export const MATERIAL_TEXTURE_OPTIONS: readonly StudioOptionItem[] = [
  { id: "frosted-glass", label: "Frosted Glass", promptHint: "frosted acrylic glass with subtle edge refraction" },
  { id: "brushed-aluminum", label: "Brushed Aluminum", promptHint: "CNC-machined brushed anodized aluminum" },
  { id: "matte-paper", label: "Matte Coated Paper", promptHint: "300gsm matte cotton paper grain" },
  { id: "subsurface-skin", label: "Organic / Subsurface", promptHint: "authentic subsurface scattering and natural organic texture" },
  { id: "anodized-metal", label: "Anodized Dark Metal", promptHint: "matte obsidian titanium with micro-chamfered edges" },
  { id: "fabric-weave", label: "Tactile Fabric Weave", promptHint: "high-thread-count woven textile micro-structure" },
];

export const PALETTE_LOCK_OPTIONS: readonly StudioOptionItem[] = [
  { id: "webdude-blue-violet", label: "WebDude Kék-Lila Zár (0% Arany)", promptHint: "strict brand color lock: electric sky cyan #00B5F1, deep royal violet #5B21B6, obsidian slate #0B1120; strictly NO gold, amber, or yellow tones", colors: ["#00B5F1", "#7C3AED", "#0B1120"] },
  { id: "monochrome-premium", label: "Monokróm Prémium", promptHint: "disciplined monochrome slate and pure white palette (#0F172A, #475569, #F8FAFC)", colors: ["#0F172A", "#475569", "#F8FAFC"] },
  { id: "emerald-cyber", label: "Smaragd & Cián Tech", promptHint: "emerald #10B981 and sky cyan #00B5F1 on deep charcoal #0F172A", colors: ["#10B981", "#00B5F1", "#0F172A"] },
  { id: "custom-hex", label: "Saját HEX Paletta", promptHint: "" },
];

export const DEFAULT_ONLINE_GRAPHICS_STATE: OnlineGraphicsStudioState = {
  engine: "flux-1-1-pro",
  subject: "Floating translucent analytics dashboard cards above an obsidian glass desk with subtle cyan and violet light trails",
  brandOrAudience: "B2B SaaS döntéshozók",
  platformFormat: "web-hero",
  customAspectRatio: "16:9",
  copySpace: "left-40",
  readingPattern: "f-pattern",
  depthSeparation: "layered-depth",
  visualStyle: "glassmorphism",
  opticsLens: "35mm-editorial",
  lightingPhysics: "volumetric-rim",
  materials: ["frosted-glass", "anodized-metal"],
  paletteLockId: "webdude-blue-violet",
  customHexColors: "#00B5F1, #7C3AED, #0B1120",
  exactTextToRender: "",
  typographyDirection: "display-sans",
  wcagContrastBackdrop: true,
  stylize: 200,
  chaos: 0,
  weird: 0,
  styleRaw: true,
  tile: false,
  draft: false,
  sref: "",
  sw: 100,
  oref: "",
  cw: 100,
  maxVectorColors: 4,
  vectorStrokeStyle: "clean 2px uniform geometric stroke",
  videoCameraMove: "Smooth stabilized dolly-in with subtle parallax",
  videoHook: "0-3s Hook: holographic UI cards assemble in mid-air with a crisp light pulse",
  videoPacing: "Measured 24fps commercial pacing",
  negativeChipIds: ["no-fake-text", "no-plastic-ai-look", "no-clutter-artifacts"],
  customNegative: "gold, amber, yellow tint",
};

export interface OnlineGraphicsPreset {
  id: string;
  title: string;
  badge: string;
  state: Partial<OnlineGraphicsStudioState>;
}

export const ONLINE_GRAPHICS_PRESETS: readonly OnlineGraphicsPreset[] = [
  { id: "saas-web-hero", title: "SaaS Web Hero (16:9, bal copy-space)", badge: "Flux 1.1 Pro", state: { ...DEFAULT_ONLINE_GRAPHICS_STATE } },
  { id: "reels-tiktok-hook", title: "Reels / TikTok / Shorts Hook (9:16 UI safe-zone)", badge: "Midjourney v7", state: { engine: "midjourney-v7", subject: "Dynamic overhead creator desk reveal with glowing workflow nodes emerging from a sleek laptop", platformFormat: "reels-tiktok-shorts", customAspectRatio: "9:16", copySpace: "top-third", readingPattern: "center-hero", depthSeparation: "shallow-bokeh", visualStyle: "editorial-photo", opticsLens: "35mm-editorial", lightingPhysics: "volumetric-rim", stylize: 250 } },
  { id: "premium-product-ad", title: "Prémium Termékreklám (4:5 Instagram Feed)", badge: "Flux 1.1 Pro", state: { engine: "flux-1-1-pro", subject: "Minimalist matte-black skincare bottle on wet dark slate podium surrounded by soft water ripples", platformFormat: "instagram-feed", customAspectRatio: "4:5", copySpace: "bottom-third", readingPattern: "z-pattern", depthSeparation: "shallow-bokeh", visualStyle: "quiet-luxury", opticsLens: "85mm-portrait", lightingPhysics: "softbox-studio", materials: ["frosted-glass", "anodized-metal"] } },
  { id: "youtube-thumbnail-title", title: "YouTube Thumbnail + Címfelirat (16:9)", badge: "Ideogram 3.0", state: { engine: "ideogram-3", subject: "Split-screen tech comparison showing a sluggish legacy server versus a glowing high-speed Next.js node", platformFormat: "youtube-thumbnail", customAspectRatio: "16:9", copySpace: "left-40", readingPattern: "z-pattern", visualStyle: "kinetic-type", exactTextToRender: "NEXT.JS 16 VS LEGACY", typographyDirection: "condensed-editorial", wcagContrastBackdrop: true } },
  { id: "web-flat-vector-set", title: "Webes Flat Vektor / Ikon Szett (1:1)", badge: "Recraft v3 SVG", state: { engine: "recraft-v3-svg", subject: "Modular AI automation workflow emblem combining a precision gear, neural node, and lightning bolt", platformFormat: "display-meta-ad", customAspectRatio: "1:1", copySpace: "center-framed", visualStyle: "swiss-grid", maxVectorColors: 3, vectorStrokeStyle: "crisp 2px geometric vector paths, flat solid fills" } },
  { id: "motion-campaign-hook", title: "Motion / Videó 0–3s Kampány Hook (9:16)", badge: "Videó / Motion", state: { engine: "video-motion", subject: "Precision glass prism splitting a white laser beam into electric cyan and deep violet data streams", platformFormat: "reels-tiktok-shorts", customAspectRatio: "9:16", copySpace: "bottom-third", visualStyle: "octane-clay", opticsLens: "100mm-macro", lightingPhysics: "dark-studio", videoHook: "0-3s Hook: sudden macro light refraction ignites the prism edges in slow-motion", videoCameraMove: "Slow orbital macro push-in", videoPacing: "Crisp 60fps slow-motion ramp into 24fps" } },
];

function lookupHint<T extends string>(items: readonly StudioOptionItem<T>[], id: string): string {
  return items.find((i) => i.id === id)?.promptHint ?? "";
}

/** 0 ms-os determinisztikus Online Grafika & Kampány prompt-fordító. */
export function compileOnlineGraphicsPrompt(state: OnlineGraphicsStudioState): CompiledPromptResult {
  const format = ONLINE_PLATFORM_FORMATS.find((f) => f.id === state.platformFormat) ?? ONLINE_PLATFORM_FORMATS[0];
  const aspectRatio = state.customAspectRatio.trim() || format.aspectRatio;
  const styleHint = lookupHint(VISUAL_STYLE_OPTIONS, state.visualStyle);
  const copySpaceHint = lookupHint(COPY_SPACE_OPTIONS, state.copySpace);
  const readingHint = lookupHint(READING_PATTERN_OPTIONS, state.readingPattern);
  const depthHint = lookupHint(DEPTH_SEPARATION_OPTIONS, state.depthSeparation);
  const lensHint = lookupHint(OPTICS_LENS_OPTIONS, state.opticsLens);
  const lightHint = lookupHint(LIGHTING_PHYSICS_OPTIONS, state.lightingPhysics);
  const typoDirHint = lookupHint(TYPOGRAPHY_DIRECTION_OPTIONS, state.typographyDirection);
  const paletteObj = PALETTE_LOCK_OPTIONS.find((p) => p.id === state.paletteLockId);

  const hexList = (state.paletteLockId === "custom-hex" ? state.customHexColors.split(",") : (paletteObj?.colors ?? []))
    .map((c) => c.trim())
    .filter((c) => /^#[0-9A-Fa-f]{3,8}$/.test(c));

  const materialHints = state.materials.map((mId) => lookupHint(MATERIAL_TEXTURE_OPTIONS, mId)).filter(Boolean);
  const negativeFromChips = state.negativeChipIds
    .map((id) => ANTI_AI_SLOP_NEGATIVE_CHIPS.find((c) => c.id === id)?.promptHint ?? "")
    .filter(Boolean);

  const wcagClause = state.wcagContrastBackdrop
    ? "Ensure high-contrast WCAG AA compliant clean backdrop zone (4.5:1+ luminance contrast ratio) behind any headline or UI overlay area"
    : undefined;
  const subjectLine = state.brandOrAudience.trim()
    ? `${state.subject.trim()} (tailored for ${state.brandOrAudience.trim()})`
    : state.subject.trim();
  const extraVectorNote =
    state.engine === "recraft-v3-svg" && state.vectorStrokeStyle.trim() ? state.vectorStrokeStyle.trim() : undefined;

  return buildVisualPrompt({
    engine: state.engine,
    domain: "online-graphics",
    subject: subjectLine,
    styleNotes: [styleHint, extraVectorNote].filter(Boolean).join(", "),
    composition: depthHint,
    copySpace: copySpaceHint,
    readingPattern: readingHint,
    safeZoneNote: `${format.safeZonePromptHint} (${format.pixelSpec})`,
    opticsAndLighting: [lensHint, lightHint].filter(Boolean).join(", "),
    materials: materialHints,
    typographyNote: wcagClause,
    colorPalette: paletteObj?.promptHint || undefined,
    brandColorsHex: hexList,
    aspectRatio,
    exactTextToRender: state.exactTextToRender,
    typographyDirection: typoDirHint,
    stylize: state.stylize,
    chaos: state.chaos,
    weird: state.weird,
    styleRaw: state.styleRaw,
    tile: state.tile,
    draft: state.draft,
    sref: state.sref,
    sw: state.sw,
    oref: state.oref,
    cw: state.cw,
    maxVectorColors: state.maxVectorColors,
    videoCameraMove: state.videoCameraMove,
    videoHook: state.videoHook,
    videoPacing: state.videoPacing,
    negativeItems: negativeFromChips,
    customNegative: state.customNegative,
  });
}
