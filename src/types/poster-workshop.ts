export interface PosterWorkshopInput {
  posterPurpose: string;
  targetAudience: string;
  posterSize: "A4" | "A3" | "A2" | "A1" | "custom";
  posterStyle:
    | "minimalist"
    | "typographic"
    | "photographic"
    | "illustration"
    | "abstract"
    | "vintage"
    | "modern-bold"
    | "corporate";
  printSpecs: "standard" | "premium" | "large-format" | "outdoor";
  brandColors?: string[];
  requiredTexts?: {
    headline?: string;
    subheadline?: string;
    bodyText?: string;
    cta?: string;
    eventDetails?: string;
  };
  additionalRequirements?: string;
}

export interface PosterWorkshopOutput {
  posterConcept: {
    style: string;
    description: string;
    keyElements: string[];
  };
  specifications: {
    dimensions: {
      width: number;
      height: number;
      format: string;
      dpi: string;
    };
    bleed: string;
    safeZone: string;
    cropMarks: string;
  };
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    rationale: string;
    cmykValues: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  typography: {
    headlineFont: string;
    bodyFont: string;
    fontSizes: {
      headline: string;
      subheadline: string;
      body: string;
      caption: string;
    };
    fontWeights: {
      headline: string;
      body: string;
    };
    lineHeight: string;
    kerning: string;
  };
  layout: {
    gridSystem: string;
    visualHierarchy: string;
    elementPlacement: string;
    whitespace: string;
  };
  copywriting: {
    headline: string;
    subheadline: string;
    bodyText: string;
    cta: string;
    alternativeHeadlines: string[];
    alternativeCTAs: string[];
  };
  midjourneyPrompts: {
    primary: string;
    alternative1: string;
    alternative2: string;
  };
  printGuidelines: {
    colorMode: string;
    resolution: string;
    fileFormat: string;
    colorProfile: string;
    doNot: string[];
  };
  exportFormats: {
    print: string;
    web: string;
    social: string;
  };
  variations: {
    lightMode: string;
    darkMode: string;
    grayscale: string;
  };
}

export interface PosterWorkshopResult {
  success: boolean;
  output?: PosterWorkshopOutput;
  error?: string;
  details?: Record<string, unknown>;
}

export interface PosterWorkshopHistory {
  id: string;
  userId: string;
  input: PosterWorkshopInput;
  output: PosterWorkshopOutput;
  createdAt: Date;
}
