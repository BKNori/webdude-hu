export interface PresentationInput {
  presentationPurpose: string;
  targetAudience: string;
  presentationType:
    | "pitch-deck"
    | "sales-presentation"
    | "investor-deck"
    | "product-launch"
    | "training"
    | "conference";
  slideCount: number;
  designStyle:
    "minimalist" | "corporate" | "modern" | "creative" | "tech" | "luxury";
  brandColors?: string[];
  requiredContent?: {
    keyPoints?: string[];
    dataPoints?: string[];
    testimonials?: string[];
  };
  additionalRequirements?: string;
}

export interface PresentationOutput {
  presentationConcept: {
    style: string;
    description: string;
    keyElements: string[];
  };
  structure: {
    slideOutline: string[];
    narrativeFlow: string;
    pacing: string;
  };
  specifications: {
    dimensions: {
      width: number;
      height: number;
      format: string;
    };
    aspectRatio: string;
    safeZone: string;
  };
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    rationale: string;
  };
  typography: {
    titleFont: string;
    bodyFont: string;
    fontSizes: {
      title: string;
      subtitle: string;
      body: string;
      caption: string;
    };
    fontWeights: {
      title: string;
      body: string;
    };
  };
  layout: {
    gridSystem: string;
    visualHierarchy: string;
    elementPlacement: string;
    whitespace: string;
  };
  slideTemplates: {
    titleSlide: string;
    contentSlide: string;
    dataSlide: string;
    closingSlide: string;
  };
  contentGuidelines: {
    textDensity: string;
    visualRatio: string;
    animationLevel: string;
    doNot: string[];
  };
  midjourneyPrompts: {
    primary: string;
    alternative1: string;
    alternative2: string;
  };
  exportFormats: {
    presentation: string;
    pdf: string;
    images: string;
  };
  variations: {
    lightMode: string;
    darkMode: string;
    print: string;
  };
}

export interface PresentationResult {
  success: boolean;
  output?: PresentationOutput;
  error?: string;
  details?: Record<string, unknown>;
}

export interface PresentationHistory {
  id: string;
  userId: string;
  input: PresentationInput;
  output: PresentationOutput;
  createdAt: Date;
}
