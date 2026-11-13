/**
 * Közös 2026-os AI generátor preset adatok a kreatív műhelyekhez.
 *
 * Ezeket az adatokat a `PresetChips` komponens jeleníti meg kattintható
 * gombokként — a felhasználónak nem kell kézzel HEX kódot vagy
 * ismeretlen paraméterneveket gépelnie.
 */

export interface PresetOption {
  id: string;
  label: string;
  /** A promptba kerülő angol/magyar leírás (AI motorok számára). */
  promptHint: string;
  /** Opcionális HEX színek a vizuális jelzéshez. */
  colors?: string[];
}

/** Cél AI motor választó (képgenerálás). */
export const AI_ENGINE_PRESETS: PresetOption[] = [
  {
    id: "midjourney-v61",
    label: "Midjourney v6.1 / v7",
    promptHint:
      "Midjourney v6.1/v7 parameter set: --v 6.1 --style raw --ar <ratio> --stylize <value>",
  },
  {
    id: "flux-pro",
    label: "Flux.1 Pro",
    promptHint:
      "Flux.1 Pro prompt: fotórealisztikus render, precíz kompozíció, szövegkezelés",
  },
  {
    id: "ideogram-2",
    label: "Ideogram 2.0",
    promptHint:
      "Ideogram 2.0 prompt: pontos tipográfia, szöveges feliratok, logó-barát kompozíció",
  },
  {
    id: "recraft-v3",
    label: "Recraft v3 (Vektor)",
    promptHint:
      "Recraft v3 prompt: tiszta vektoros SVG stílus, skálázható, nyomdai minőség",
  },
];

/** Modern design irányzatok (2026 trendek). */
export const DESIGN_STYLE_PRESETS: PresetOption[] = [
  {
    id: "glassmorphism",
    label: "Luminous Glassmorphism",
    promptHint:
      "luminous glassmorphism design: translucent frosted panels, soft inner glow, depth layers",
  },
  {
    id: "bento-grid",
    label: "Apple Bento Grid",
    promptHint:
      "Apple-style bento grid layout: modular rounded cards, generous whitespace, SF-style hierarchy",
  },
  {
    id: "quiet-luxury",
    label: "Quiet Luxury Editorial",
    promptHint:
      "quiet luxury editorial design: muted tones, serif accents, generous negative space, premium minimalism",
  },
  {
    id: "neo-brutalism",
    label: "Neo-Brutalism",
    promptHint:
      "neo-brutalist design: bold borders, raw typography, high contrast, sticker-like elements",
  },
  {
    id: "clay-isometric",
    label: "3D Clay & Isometric",
    promptHint:
      "3D clay render style: soft isometric shapes, matte clay texture, pastel gradients",
  },
  {
    id: "swiss-minimal",
    label: "Swiss Minimalist Grid",
    promptHint:
      "Swiss minimalist grid: strict alignment, Helvetica-style typography, red/black/white discipline",
  },
  {
    id: "cyber-dark",
    label: "Cyber-Cyan Dark Tech",
    promptHint:
      "cyber dark tech aesthetic: deep slate background, electric cyan #00B5F1 accents, violet glow, neon grid",
  },
  {
    id: "kinetic-type",
    label: "Kinetic Typography",
    promptHint:
      "kinetic typography: oversized bold type, motion-blurred letters, editorial poster layout",
  },
];

/** Fotográfiai, optikai és render beállítások. */
export const OPTICS_PRESETS: PresetOption[] = [
  {
    id: "85mm-bokeh",
    label: "85mm f/1.4 Bokeh",
    promptHint: "85mm f/1.4 lens, shallow depth of field, creamy bokeh",
  },
  {
    id: "24mm-tilt",
    label: "24mm Tilt-Shift",
    promptHint: "24mm tilt-shift lens, miniature effect, sharp focus plane",
  },
  {
    id: "macro-studio",
    label: "Macro Studio",
    promptHint: "macro photography, studio softbox lighting, extreme detail",
  },
  {
    id: "volumetric-rim",
    label: "Volumetric Rim Light",
    promptHint: "volumetric rim lighting, atmospheric haze, backlit edges",
  },
  {
    id: "chiaroscuro",
    label: "Chiaroscuro",
    promptHint: "chiaroscuro lighting, dramatic light-shadow contrast, Caravaggio style",
  },
  {
    id: "anamorphic-flare",
    label: "Anamorphic Flare",
    promptHint: "anamorphic lens flare, cinematic horizontal streaks, film look",
  },
  {
    id: "unreal-octane",
    label: "Unreal Engine 5 / Octane",
    promptHint: "Unreal Engine 5 render, Octane render quality, photorealistic CGI",
  },
];

/** Kattintható szín- és paletta presetek (egyedi HEX is megadható). */
export const COLOR_PALETTE_PRESETS: PresetOption[] = [
  {
    id: "kek-lila-cyber",
    label: "Kék-Lila Cyber",
    promptHint: "electric cyan #00B5F1 and vivid violet #7C3AED palette on deep slate #020617",
    colors: ["#00B5F1", "#7C3AED", "#020617"],
  },
  {
    id: "smaragd-arany",
    label: "Smaragd & Arany",
    promptHint: "emerald green #10B981 and gold #F59E0B accents on dark charcoal",
    colors: ["#10B981", "#F59E0B", "#111827"],
  },
  {
    id: "monokrom",
    label: "Monokróm Fekete-Fehér",
    promptHint: "strict black and white monochrome palette, high contrast grayscale",
    colors: ["#000000", "#FFFFFF", "#6B7280"],
  },
  {
    id: "pasztell-korall",
    label: "Pasztell Korall",
    promptHint: "soft pastel coral #FDA4AF, blush pink and warm cream palette",
    colors: ["#FDA4AF", "#FBCFE8", "#FFFBEB"],
  },
  {
    id: "tuzpiros-antracit",
    label: "Tűzpiros & Antracit",
    promptHint: "fiery red #EF4444 and anthracite gray #1F2937 high-contrast palette",
    colors: ["#EF4444", "#1F2937", "#F9FAFB"],
  },
  {
    id: "ocean-blue",
    label: "Óceánkék Mély",
    promptHint: "deep ocean blue #0EA5E9, navy #1E3A8A and aqua highlights",
    colors: ["#0EA5E9", "#1E3A8A", "#BAE6FD"],
  },
  {
    id: "lila-kozos",
    label: "Lila Közösségi",
    promptHint: "violet #8B5CF6, magenta #D946EF and lavender #DDD6FE palette",
    colors: ["#8B5CF6", "#D946EF", "#DDD6FE"],
  },
  {
    id: "nature-forest",
    label: "Erdei Zöld",
    promptHint: "forest green #166534, moss #65A30D and warm earth tones",
    colors: ["#166534", "#65A30D", "#FEF3C7"],
  },
  {
    id: "sunset-warm",
    label: "Naplemente Meleg",
    promptHint: "warm sunset gradient: amber #F59E0B, coral #FB7185, peach #FED7AA",
    colors: ["#F59E0B", "#FB7185", "#FED7AA"],
  },
  {
    id: "steel-tech",
    label: "Acélkék Tech",
    promptHint: "steel blue #64748B, silver #E2E8F0 and cyan #22D3EE industrial palette",
    colors: ["#64748B", "#E2E8F0", "#22D3EE"],
  },
];

/** Képarány presetek (Midjourney --ar). */
export const ASPECT_RATIO_OPTIONS = [
  { value: "16:9", label: "16:9 Widescreen" },
  { value: "1:1", label: "1:1 Négyzet" },
  { value: "9:16", label: "9:16 Story" },
  { value: "4:5", label: "4:5 Instagram" },
  { value: "21:9", label: "21:9 Ultrawide" },
] as const;

export type AspectRatio = (typeof ASPECT_RATIO_OPTIONS)[number]["value"];

/**
 * A `PresetChips` `value` mezőjében tárolt `id|id|id` stringet a
 * megfelelő `promptHint` leírásokra oldja fel (promptba illeszthető).
 */
export function resolvePresetHints(
  ids: string | null,
  options: PresetOption[]
): string | undefined {
  if (!ids) return undefined;
  const resolved = ids
    .split("|")
    .map((id) => options.find((o) => o.id === id)?.promptHint)
    .filter(Boolean)
    .join("; ");
  return resolved || undefined;
}
