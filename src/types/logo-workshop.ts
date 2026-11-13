/**
 * Logo AI Műhely — Enterprise Logó & Arculattervező Stúdió típusai (SSOT)
 *
 * 26 éves grafikai rutinra épülő, produkciós szintű logótervezési
 * munkafolyamat: koncepciók, vektorszerkesztési útmutatók, motor-specifikus
 * AI promptok, nyomdai színrendszer, tipográfia és arculati variánsok.
 */

export type LogoArchetype =
  | "pictorial"
  | "abstract_geometric"
  | "negative_space"
  | "wordmark"
  | "monogram"
  | "monoline"
  | "emblem";

export type ConstructionGrid =
  | "golden_ratio"
  | "swiss_modular"
  | "isometric_hex"
  | "bauhaus"
  | "organic";

export interface LogoWorkshopInput {
  /** Márkanév / cégnév (kötelező). */
  brandName: string;
  /** Szlogen / alcím (opcionális). */
  tagline?: string;
  /** Iparág & tevékenység (kötelező). */
  industry: string;
  /** Célcsoport & pozicionálás (pl. B2B Enterprise, Prémium Luxus). */
  targetAudience: string;
  /** Logó-architektúra típus. */
  logoArchetype: LogoArchetype;
  /** Geometriai konstrukciós rács. */
  constructionGrid: ConstructionGrid;
  /** Stílus irányzat (preset leírás vagy szabad szöveg). */
  visualStyle?: string;
  /** Színpreferencia irány (preset leírás). */
  colorPreference?: string;
  /** Kért vizuális metaforák / motívumok. */
  symbolsToInclude?: string;
  /** Tiltott klisék / mit NE tartalmazzon. */
  symbolsToAvoid?: string;
}

export interface LogoConcept {
  name: string;
  metaphor: string;
  /** Konkrét Illustrator / CorelDRAW vektorszerkesztési útmutató. */
  illustratorBlueprint: string;
  /** Recraft v3 / natív SVG vector prompt (angol). */
  recraftSvgPrompt: string;
  /** Ideogram 2.0 prompt a pontos márkanévvel (angol). */
  ideogramPrompt: string;
  /** Midjourney v6.1 / v7 prompt (angol, pontos paraméterekkel). */
  midjourneyPrompt: string;
}

export interface LogoColorSpec {
  name: string;
  /** Pl. #00B5F1 */
  hex: string;
  /** Pl. C:85 M:10 Y:0 K:0 */
  cmyk: string;
  /** Pl. PMS 2995 C */
  pantone: string;
  psychology: string;
}

export interface LogoColorSystem {
  primary: LogoColorSpec;
  secondary: LogoColorSpec;
  accent: LogoColorSpec;
  base: LogoColorSpec;
}

export interface LogoTypographySystem {
  primaryFont: {
    name: string;
    weight: string;
    tracking: string;
    ligatureTips: string;
  };
  secondaryFont: {
    name: string;
    usage: string;
  };
}

export interface LogoVariants {
  primaryHorizontal: string;
  stackedVertical: string;
  /** 16x16 px favicon — az egyszerűsítési szabály leírása. */
  appIconFavicon: string;
  /** 1 színű bélyegző / gravírozás verzió. */
  monochromeStamp: string;
}

export interface LogoBrandGuidelines {
  clearSpaceRule: string;
  minSizePx: string;
  minSizeMm: string;
  donts: string[];
}

export interface LogoGenerationOutput {
  concepts: LogoConcept[];
  colorSystem: LogoColorSystem;
  typographySystem: LogoTypographySystem;
  logoVariants: LogoVariants;
  brandGuidelines: LogoBrandGuidelines;
}

export interface LogoGenerationResult {
  success: boolean;
  output?: LogoGenerationOutput;
  error?: string;
  details?: Record<string, unknown>;
}

export interface LogoGenerationHistory {
  id: string;
  userId: string;
  input: LogoWorkshopInput;
  output: LogoGenerationOutput;
  createdAt: Date;
}
