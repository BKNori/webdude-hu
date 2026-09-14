export interface IconWorkshopInput {
  iconPurpose: string;
  targetAudience: string;
  iconType:
    | "single-icon"
    | "icon-set"
    | "symbol"
    | "logo-icon"
    | "app-icon"
    | "favicon";
  iconStyle:
    | "minimalist"
    | "line-art"
    | "filled"
    | "outline"
    | "geometric"
    | "hand-drawn"
    | "flat"
    | "3d";
  iconCount: number;
  brandColors?: string[];
  requiredConcepts?: string[];
  additionalRequirements?: string;
}

export interface IconWorkshopOutput {
  iconConcept: {
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
    viewBox: string;
    strokeWidth: string;
    cornerRadius: string;
  };
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    rationale: string;
  };
  designPrinciples: {
    simplicity: string;
    scalability: string;
    recognizability: string;
    consistency: string;
  };
  iconSet: {
    icons: {
      name: string;
      description: string;
      svgPath: string;
    }[];
    namingConvention: string;
    gridSystem: string;
  };
  svgGuidelines: {
    pathSimplification: string;
    strokeOptimization: string;
    colorUsage: string;
    doNot: string[];
  };
  midjourneyPrompts: {
    primary: string;
    alternative1: string;
    alternative2: string;
  };
  exportFormats: {
    svg: string;
    png: string;
    iconFont: string;
  };
  variations: {
    lightMode: string;
    darkMode: string;
    colored: string;
  };
}

export interface IconWorkshopResult {
  success: boolean;
  output?: IconWorkshopOutput;
  error?: string;
  details?: Record<string, unknown>;
}

export interface IconWorkshopHistory {
  id: string;
  userId: string;
  input: IconWorkshopInput;
  output: IconWorkshopOutput;
  createdAt: Date;
}
