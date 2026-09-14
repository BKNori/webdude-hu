export interface SocialMediaInput {
  campaignGoal: string;
  targetAudience: string;
  platform:
    "instagram" | "facebook" | "linkedin" | "twitter" | "tiktok" | "youtube";
  contentType:
    "feed-post" | "story" | "cover" | "carousel" | "reels" | "video-thumbnail";
  visualStyle:
    | "minimalist"
    | "bold-typography"
    | "gradient"
    | "photo-based"
    | "geometric"
    | "glassmorphism"
    | "neon-cyberpunk"
    | "corporate";
  brandColors?: string[];
  requiredTexts?: {
    headline?: string;
    subheadline?: string;
    caption?: string;
    hashtags?: string;
  };
  additionalRequirements?: string;
}

export interface SocialMediaOutput {
  contentConcept: {
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
    aspectRatio: string;
    safeZone: string;
    textPlacement: string;
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
    caption: string;
    hashtags: string[];
    alternativeHeadlines: string[];
    alternativeCaptions: string[];
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
  platformSpecific: {
    instagram: string;
    facebook: string;
    linkedin: string;
    twitter: string;
    tiktok: string;
  };
  exportFormats: {
    web: string;
    social: string;
    thumbnail: string;
  };
  variations: {
    lightMode: string;
    darkMode: string;
    mobile: string;
  };
}

export interface SocialMediaResult {
  success: boolean;
  output?: SocialMediaOutput;
  error?: string;
  details?: Record<string, unknown>;
}

export interface SocialMediaHistory {
  id: string;
  userId: string;
  input: SocialMediaInput;
  output: SocialMediaOutput;
  createdAt: Date;
}
