export interface CipWorkshopInput {
  companyName: string;
  industry: string;
  targetAudience: string;
  brandPersonality: string;
  cipElement:
    | "business-card"
    | "letterhead"
    | "brand-guidelines"
    | "envelope"
    | "folder"
    | "complete-package";
  designStyle:
    | "minimalist"
    | "corporate"
    | "modern"
    | "classic"
    | "tech"
    | "creative"
    | "luxury";
  brandColors?: string[];
  requiredElements?: {
    logo?: string;
    tagline?: string;
    contactInfo?: string;
    address?: string;
  };
  additionalRequirements?: string;
}

export interface CipWorkshopOutput {
  brandIdentity: {
    style: string;
    description: string;
    keyElements: string[];
  };
  specifications: {
    dimensions: {
      width: number;
      height: number;
      format: string;
    };
    bleed: string;
    safeZone: string;
    printSpecs: string;
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
    logoFont: string;
    bodyFont: string;
    fontSizes: {
      logo: string;
      headline: string;
      body: string;
      caption: string;
    };
    fontWeights: {
      logo: string;
      body: string;
    };
  };
  layout: {
    gridSystem: string;
    visualHierarchy: string;
    elementPlacement: string;
    whitespace: string;
  };
  businessCard: {
    frontLayout: string;
    backLayout: string;
    contactPlacement: string;
    logoPosition: string;
  };
  letterhead: {
    headerLayout: string;
    footerLayout: string;
    bodyLayout: string;
    logoPosition: string;
  };
  brandGuidelines: {
    logoUsage: string;
    colorUsage: string;
    typographyUsage: string;
    doNot: string[];
  };
  midjourneyPrompts: {
    primary: string;
    alternative1: string;
    alternative2: string;
  };
  exportFormats: {
    print: string;
    web: string;
    vector: string;
  };
  variations: {
    lightMode: string;
    darkMode: string;
    grayscale: string;
  };
}

export interface CipWorkshopResult {
  success: boolean;
  output?: CipWorkshopOutput;
  error?: string;
  details?: Record<string, unknown>;
}

export interface CipWorkshopHistory {
  id: string;
  userId: string;
  input: CipWorkshopInput;
  output: CipWorkshopOutput;
  createdAt: Date;
}
