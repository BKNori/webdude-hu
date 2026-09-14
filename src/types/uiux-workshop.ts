export interface UiUxWorkshopInput {
  projectType:
    | "landing-page"
    | "dashboard"
    | "ecommerce"
    | "mobile-app"
    | "portfolio"
    | "saas"
    | "blog";
  primaryGoal:
    | "conversions"
    | "user-engagement"
    | "brand-awareness"
    | "lead-generation"
    | "productivity";
  targetAudience: string;
  keyFeatures: string;
  designStyle:
    | "minimalist"
    | "modern"
    | "corporate"
    | "playful"
    | "luxury"
    | "tech-focused";
  colorPreference: "dark" | "light" | "mixed";
  additionalRequirements?: string;
}

export interface UiUxWorkshopOutput {
  designStrategy: {
    userJourney: string;
    informationArchitecture: string[];
    keyUserFlows: string[];
  };
  wireframeStructure: {
    sections: Array<{
      name: string;
      purpose: string;
      elements: string[];
      priority: "high" | "medium" | "low";
    }>;
    layout: string;
    spacing: string;
  };
  componentLibrary: {
    primaryComponents: string[];
    secondaryComponents: string[];
    interactiveElements: string[];
  };
  figmaPrompts: {
    mainWireframe: string;
    heroSection: string;
    featureSection: string;
    callToAction: string;
  };
  designSystem: {
    colorPalette: string[];
    typography: {
      headings: string;
      body: string;
      accent: string;
    };
    spacing: string[];
    borderRadius: string;
  };
  uxRecommendations: {
    accessibility: string[];
    performance: string[];
    mobileOptimization: string[];
  };
  conversionOptimization: {
    ctaPlacement: string[];
    trustSignals: string[];
    socialProof: string[];
  };
}

export interface UiUxWorkshopResult {
  success: boolean;
  output?: UiUxWorkshopOutput;
  error?: string;
  details?: Record<string, unknown>;
}

export interface UiUxWorkshopHistory {
  id: string;
  userId: string;
  input: UiUxWorkshopInput;
  output: UiUxWorkshopOutput;
  createdAt: Date;
}
