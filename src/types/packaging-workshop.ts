/**
 * Nyomdakész Csomagolás, Doboz Stancrajz & Címke AI Műhely — típusok (SSOT)
 *
 * 26 éves csomagolástervezői és stancrajz-mérnöki rutinnal:
 * FEFCO dobozok, hajtogatott kartonok, rigid box, doypack, palackcímkék.
 */

export type PackagingStructure =
  | "folding_carton_tuck"
  | "fefco_0427_mailer"
  | "rigid_luxury_box"
  | "standup_pouch_doypack"
  | "bottle_label_wrap"
  | "shrink_sleeve_360"
  | "cosmetic_jar_tube"
  | "fefco_0201_shipping";

export type PackagingSubstrate =
  | "gc1_gc2_carton"
  | "e_flute_micro_corrugated"
  | "kraft_natural"
  | "pp_pe_label_film"
  | "metallized_film"
  | "rigid_board_luxury";

export interface PackagingWorkshopInput {
  /** Termék neve (kötelező). */
  productName: string;
  /** Márkanév (kötelező). */
  brandName: string;
  /** Iparág (kötelező). */
  industry: string;
  /** Csomagolási struktúra típus. */
  packagingStructure: PackagingStructure;
  /** Befoglaló méret mm-ben, pl. "80 × 50 × 150 mm" vagy "Ø 75 mm × 120 mm". */
  dimensionsMm: string;
  /** Alapanyag és hordozó. */
  substrateAndMaterial: PackagingSubstrate;
  /** Felületnemesítés. */
  surfaceFinishing?: string;
  /** Stílus irányzat (preset leírás). */
  visualStyle?: string;
  /** Színpreferencia irány. */
  colorPreference?: string;
  /** Fő termékígéretek / USP-k a főoldalra. */
  keyClaims?: string;
  /** Kötelező információk (összetevők, nettó tömeg, EAN-13, piktogramok). */
  mandatoryInfo?: string;
}

export interface PackagingConceptOverview {
  title: string;
  shelfImpactStrategy: string;
  unboxingExperience: string;
  targetPositioning: string;
}

export interface PackagingDielineSpecs {
  /** Struktúra kód, pl. "FEFCO 0427" vagy "Reverse Tuck-End 4-panel". */
  structureCode: string;
  /** Kiterített sík méret becslés mm-ben. */
  flatDimensionsEstimationMm: string;
  /** Kifutó és biztonsági zóna mm-ben. */
  bleedAndSafeZoneMm: string;
  /** Vágósík (Cut) specifikáció. */
  cutLineSpec: string;
  /** Törési/hajtási vonalak (Crease) specifikáció. */
  creaseLineSpec: string;
  /** Ragasztófül szabály (hol lehet ragasztani, hol TILOS). */
  glueFlapRule: string;
  /** Kartonvastagság és szálirány szabály. */
  boardCaliperAndGrainDirection: string;
  /** Tintakorlátozások (pl. nem nyomtatható zónák, fólia alatti területek). */
  inkAndVarnishRestrictions: string;
  /** EAN-13 vonalkód specifikáció. */
  barcodeSpecsEan13: string;
}

export interface PackagingPanel {
  panelName: string;
  dimensionsMm: string;
  hierarchyRole: string;
  headlineOrClaim: string;
  bodyCopyOrElements: string[];
  mandatorySymbols: string[];
  finishingHighlight: string;
  graphicDesignTip: string;
}

export interface PackagingColorSpec {
  name: string;
  hex: string;
  cmyk: string;
  pantone: string;
  /** Hogyan viselkedik az adott hordozón (karton/fólia). */
  substrateBehavior: string;
}

export interface PackagingTypographyCompliance {
  brandDisplayFont: string;
  claimsFont: string;
  ingredientsFont: string;
  /** EU 1169/2011: min. 1.2 mm betűmagasság mm-ben. */
  minLegalFontSizeMm: string;
  /** EU megfelelőségi ellenőrzőlista. */
  euComplianceChecklist: string[];
}

export interface PackagingAiPrompts {
  /** Síkkiterített stancrajz művészet (flat dieline artwork). */
  flatDielineArtworkPrompt: string;
  /** Stúdió packshot 3D. */
  studioPackshot3DPrompt: string;
  /** Kiskereskedelmi polc / lifestyle. */
  retailShelfLifestylePrompt: string;
  /** Unboxing jelenet. */
  unboxingScenePrompt: string;
  negativePrompt: string;
}

export interface PackagingGenerationOutput {
  conceptOverview: PackagingConceptOverview;
  dielineAndPrepressSpecs: PackagingDielineSpecs;
  panelBreakdown: PackagingPanel[];
  colorSystem: PackagingColorSpec[];
  typographyAndCompliance: PackagingTypographyCompliance;
  aiPrompts: PackagingAiPrompts;
  /** 8 pontos csomagolás-prepress ellenőrzőlista. */
  prepressChecklist: string[];
}

export interface PackagingGenerationResult {
  success: boolean;
  output?: PackagingGenerationOutput;
  error?: string;
  details?: Record<string, unknown>;
}

export interface PackagingGenerationHistory {
  id: string;
  userId: string;
  input: PackagingWorkshopInput;
  output: PackagingGenerationOutput;
  createdAt: Date;
}
