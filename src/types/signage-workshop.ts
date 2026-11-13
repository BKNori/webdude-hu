/**
 * Nagyformátumú Dekor, Roll-up, Autódekor & Kirakat Stúdió — típusok (SSOT).
 *
 * 26 év LFP (large format printing) és dekoratőri tapasztalattal:
 * roll-up, kirakatdekor, autówrap, molinó, sajtófal, dibond, padlógrafika.
 */

export type SignageFormat =
  | "rollup_standard_85x200"
  | "rollup_wide_100x200"
  | "storefront_window_graphics"
  | "vehicle_van_car_wrap"
  | "outdoor_pvc_mesh_banner"
  | "exhibition_popup_wall"
  | "pavement_a_board_dibond"
  | "indoor_wall_floor_tattoo";

export type SignageSubstrate =
  | "rollup_film_240g"
  | "one_way_vision_owv"
  | "cast_vinyl_wrap"
  | "plotter_cut_foil"
  | "pvc_frontlit_mesh"
  | "dibond_forex_board";

export type ViewingDistance =
  | "close_1_3m"
  | "mid_3_10m"
  | "far_10_30m";

export interface SignageWorkshopInput {
  /** Fő üzenet / kampány / szolgáltatás neve (kötelező). */
  campaignOrHeadline: string;
  /** Márka / cégnév (kötelező). */
  brandName: string;
  /** Iparág (kötelező). */
  industry: string;
  /** Nagyformátumú struktúra. */
  signageFormat: SignageFormat;
  /** Pontos befoglaló méret, pl. "85 × 200 cm" vagy "Kirakat: 320 × 240 cm". */
  dimensionsAndScale: string;
  /** Hordozó és fólia technológia. */
  substrateAndFoil: SignageSubstrate;
  /** Olvasási távolság. */
  viewingDistance: ViewingDistance;
  /** Stílus irányzat (preset leírás). */
  visualStyle?: string;
  /** Színpreferencia irány. */
  colorPreference?: string;
  /** Kapcsolat / CTA (max. 3 másodperces befogadási szabály). */
  contactAndCta?: string;
}

export interface SignageConceptOverview {
  title: string;
  threeSecondRuleStrategy: string;
  distanceVisibilityLogic: string;
  environmentContrastTip: string;
}

export interface SignageLfpSpecs {
  /** Javasolt méretarány: 1:1 vagy 1:10 stb. */
  workingScaleRatio: string;
  /** Nyomtatási felbontás a skálán (pl. 30 DPI 1:10-nél). */
  recommendedFileDpiAtScale: string;
  /** Tényleges 1:1 DPI a kihelyezésen. */
  effectivePrintDpi1to1: string;
  /** Kifutó és varrás/hegesztés mm-ben. */
  bleedAndHemmingMm: string;
  /** Hardver holttér / nem nyomtatható zónák. */
  hardwareDeadZones: string;
  /** Vágósík / fehér tinta szabály. */
  cutContourAndWhiteInkRule: string;
  /** Színprofil és UV-ellenállás. */
  colorProfileAndUvResistance: string;
  /** Minimum betűmagasság mm-ben az adott távolsághoz. */
  minLetterHeightMmForDistance: string;
}

export interface SignageZone {
  zoneName: string;
  heightRangeOrPosition: string;
  visibilityPriority: string;
  headlineOrElement: string;
  subcopyOrDetails: string[];
  technicalWarning: string;
  designTip: string;
}

export interface SignageColorSpec {
  name: string;
  hex: string;
  cmyk: string;
  /** Pantone vagy RAL / Oracal fólia kód. */
  pantoneOrRal: string;
  /** Külső kontraszt megjegyzés. */
  outdoorContrastNote: string;
}

export interface SignageTypographyDistance {
  headlineFont: string;
  secondaryFont: string;
  /** 1:1 mm-ben a valós méret. */
  headlineSizeMm1to1: string;
  subheadSizeMm1to1: string;
  contactSizeMm1to1: string;
  /** Max. szószám szabály a távolsághoz. */
  maxWordsCountRule: string;
  kerningAndStrokeAdvice: string;
}

export interface SignageAiPrompts {
  /** Hero háttérgrafika / kulcsvizuál. */
  heroBackgroundGraphicPrompt: string;
  /** Életszerű in-situ mockup. */
  realisticMockupInSituPrompt: string;
  /** Vektor vágott grafika (plotter/etched glass). */
  vectorCutGraphicPrompt: string;
  negativePrompt: string;
}

export interface SignageGenerationOutput {
  conceptOverview: SignageConceptOverview;
  lfpTechnicalSpecs: SignageLfpSpecs;
  zoneBreakdown: SignageZone[];
  colorSystem: SignageColorSpec[];
  typographyAndDistanceScale: SignageTypographyDistance;
  aiPrompts: SignageAiPrompts;
  /** 8 pontos nagyformátumú nyomdai/dekoratőri checklist. */
  lfpPrepressChecklist: string[];
}

export interface SignageGenerationResult {
  success: boolean;
  output?: SignageGenerationOutput;
  error?: string;
  details?: Record<string, unknown>;
}
