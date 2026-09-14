export interface BannerWorkshopInput {
  campaignGoal: string;
  targetAudience: string;
  platform:
    | "facebook"
    | "instagram"
    | "twitter"
    | "linkedin"
    | "youtube"
    | "google-ads"
    | "web"
    | "print";
  bannerType:
    "hero" | "story" | "cover" | "sidebar" | "display" | "social-post";
  artDirection:
    | "minimalist"
    | "bold-typography"
    | "gradient"
    | "photo-based"
    | "geometric"
    | "glassmorphism"
    | "neon-cyberpunk";
  aspectRatio: "16:9" | "1:1" | "9:16";
  brandColors?: string[];
  requiredTexts?: {
    headline?: string;
    subheadline?: string;
    cta?: string;
  };
  additionalRequirements?: string;
}

export interface BannerWorkshopOutput {
  bannerConcept: {
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
    safeZone: string;
    ctaPlacement: string;
  };
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    rationale: string;
  };
  copywriting: {
    headline: string;
    subheadline: string;
    cta: string;
    alternativeHeadlines: string[];
    alternativeCTAs: string[];
  };
  midjourneyPrompts: {
    primary: string;
    alternative1: string;
    alternative2: string;
  };
  designGuidelines: {
    spacing: string;
    typography: string;
    imagery: string;
    doNot: string[];
  };
  exportFormats: {
    web: string;
    print: string;
    social: string;
  };
  variations: {
    lightMode: string;
    darkMode: string;
    mobile: string;
  };
}

export interface BannerWorkshopResult {
  success: boolean;
  output?: BannerWorkshopOutput;
  error?: string;
  details?: Record<string, unknown>;
}

export interface BannerWorkshopHistory {
  id: string;
  userId: string;
  input: BannerWorkshopInput;
  output: BannerWorkshopOutput;
  createdAt: Date;
}
