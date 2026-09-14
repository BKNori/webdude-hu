export interface LogoGenerationInput {
  brandName: string;
  industry: string;
  targetAudience: string;
  logoStyle:
    | "minimalist"
    | "modern"
    | "vintage"
    | "geometric"
    | "typographic"
    | "emblem"
    | "abstract";
  colorPreference: "monochrome" | "duotone" | "vibrant" | "pastel" | "dark";
  additionalRequirements?: string;
}

export interface LogoGenerationOutput {
  logoConcept: {
    style: string;
    description: string;
    keyElements: string[];
  };
  logoVariants: {
    primary: string;
    secondary: string;
    iconOnly: string;
    wordmark: string;
  };
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    rationale: string;
    alternativePalettes: Array<{
      name: string;
      colors: string[];
      useCase: string;
    }>;
  };
  typography: {
    primaryFont: string;
    secondaryFont?: string;
    fontPairing: string;
    rationale: string;
  };
  iconography: {
    iconType: string;
    symbolism: string;
    usage: string;
  };
  midjourneyPrompts: {
    primary: string;
    secondary: string;
    iconOnly: string;
    wordmark: string;
  };
  brandGuidelines: {
    logoUsage: string[];
    spacing: string;
    minimumSize: string;
    clearSpace: string;
    doNot: string[];
  };
  exportFormats: {
    svg: string;
    png: string;
    pdf: string;
    favicon: string;
  };
  variations: {
    lightMode: string;
    darkMode: string;
    monochrome: string;
  };
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
  input: LogoGenerationInput;
  output: LogoGenerationOutput;
  createdAt: Date;
}
