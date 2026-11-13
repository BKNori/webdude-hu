/**
 * Szórólap & Hajtogatott Prospektus AI Műhely — típusok (SSOT)
 *
 * 26 éves nyomdaipari/prepress rutinra épülő, milliméter-pontos
 * szórólap- és leporellótervezési munkafolyamat.
 */

export type FlyerFormat =
  | "A5_ketoldalas"
  | "A6_kupon"
  | "DL_exkluziv"
  | "A4_ismertető"
  | "A4_LA4_gongyolt"
  | "A4_LA4_harmonikahajtas"
  | "A4_A5_bifold"
  | "negyzetes_premium";

export type PaperAndFinish =
  | "135g_fenyes_munyomo"
  | "170g_matt_munyomo"
  | "250g_softtouch_spotuv"
  | "120g_kraft_natur"
  | "300g_kreativ_karton_pregelesc";

export type DistributionChannel =
  | "kezbe_adott"
  | "postalada"
  | "unboxing_kupon"
  | "display_pultos";

export interface FlyerWorkshopInput {
  /** Kampány / termék / esemény neve (kötelező). */
  campaignTitle: string;
  /** Márka / cégnév (kötelező). */
  brandName: string;
  /** Iparág (kötelező). */
  industry: string;
  /** Nyomdai méret és hajtás típus. */
  flyerFormat: FlyerFormat;
  /** Papír és felületnemesítés. */
  paperAndFinish: PaperAndFinish;
  /** Terjesztési csatorna. */
  distributionChannel: DistributionChannel;
  /** Stílus irányzat (preset leírás). */
  visualStyle?: string;
  /** Színpreferencia irány. */
  colorPreference?: string;
  /** Fő ajánlat / kedvezmény / hook. */
  offerOrHook?: string;
  /** Konverziós cél (QR URL, telefon, kuponbeváltás). */
  callToAction?: string;
}

export interface FlyerConceptOverview {
  title: string;
  creativeDirection: string;
  eyeTrackingStrategy: string;
  conversionPsychology: string;
}

export interface FlyerPrepressSpecs {
  /** Vágott méret mm-ben, pl. "210×297". */
  trimSizeMm: string;
  /** Kifutó (bleed) méret mm-ben, pl. "216×303". */
  bleedSizeMm: string;
  /** Nyers (gross) méret mm-ben a hajtogatás előtt/után. */
  grossSizeMm: string;
  /** Biztonsági zóna mm-ben a vágási évtől. */
  safeZoneMm: string;
  /** Hajtási mechanika leírása, pl. "97-100-100 mm behajló fül". */
  foldingMechanics: string;
  /** Papír- és felület-javaslat a választott formathoz. */
  paperRecommendation: string;
  /** Színprofil, pl. "ISO Coated v2 (FOGRA39)". */
  colorProfile: string;
  /** Maximális tintaleFedettség (TAC) %. */
  maxInkCoverageTac: string;
  /** Rich Black képlet, pl. "C:60 M:40 Y:40 K:100". */
  richBlackFormula: string;
  /** Fekete szöveg szabály, pl. "100% K only, overprint TILOS". */
  bodyTextBlackRule: string;
  /** Minimum QR-kód méret mm-ben. */
  qrCodeMinSizeMm: string;
}

export interface FlyerPanel {
  panelName: string;
  /** Méret mm-ben. */
  sizeMm: string;
  visualZonePlan: string;
  headline: string;
  subheadline: string;
  bodyPoints: string[];
  ctaOrElement: string;
  layoutTip: string;
}

export interface FlyerColorSpec {
  name: string;
  hex: string;
  cmyk: string;
  pantone: string;
  /** Hol használjuk: háttér, főcím, akcentus/kupon, szöveg stb. */
  printUsage: string;
}

export interface FlyerTypographyHierarchy {
  headlineFont: string;
  bodyFont: string;
  accentFont: string;
  /** Nyomdai méretek pontban (pt). */
  printSizingPt: {
    mainHeadlinePt: string;
    subheadPt: string;
    bodyTextPt: string;
    finePrintMinPt: string;
  };
  kerningAndLeadingTips: string;
}

export interface FlyerAiPrompts {
  /** Hero key visual (Midjourney v6.1 / Flux). */
  heroKeyVisualPrompt: string;
  /** Layout inspiráció (Ideogram 2.0). */
  ideogramLayoutPrompt: string;
  /** 3D prezentációs print mockup. */
  printMockup3DPrompt: string;
  negativePrompt: string;
}

export interface FlyerWorkshopOutput {
  conceptOverview: FlyerConceptOverview;
  prepressSpecs: FlyerPrepressSpecs;
  panelBreakdown: FlyerPanel[];
  colorSystem: FlyerColorSpec[];
  typographyHierarchy: FlyerTypographyHierarchy;
  aiPrompts: FlyerAiPrompts;
  /** 8 pontos nyomdai ellenőrzőlista export előtt. */
  prepressChecklist: string[];
}

export interface FlyerGenerationResult {
  success: boolean;
  output?: FlyerWorkshopOutput;
  error?: string;
  details?: Record<string, unknown>;
}

export interface FlyerGenerationHistory {
  id: string;
  userId: string;
  input: FlyerWorkshopInput;
  output: FlyerWorkshopOutput;
  createdAt: Date;
}
