export interface SeasonalWorkshopInput {
  season:
    | "christmas"
    | "new-year"
    | "valentine"
    | "easter"
    | "summer"
    | "autumn"
    | "halloween"
    | "black-friday"
    | "cyber-monday"
    | "custom";
  campaignType:
    | "social-media"
    | "email"
    | "landing-page"
    | "banner"
    | "story"
    | "video-thumbnail";
  targetAudience: string;
  brandVoice:
    | "professional"
    | "friendly"
    | "luxury"
    | "playful"
    | "corporate"
    | "minimalist";
  primaryGoal:
    "sales" | "brand-awareness" | "engagement" | "traffic" | "lead-generation";
  customSeason?: string;
  additionalRequirements?: string;
}

export interface SeasonalWorkshopOutput {
  campaignStrategy: {
    theme: string;
    mood: string;
    keyMessages: string[];
    timing: string;
  };
  visualGuidance: {
    colorPalette: string[];
    imagery: string[];
    style: string;
    composition: string;
  };
  copywriting: {
    headlines: string[];
    bodyCopy: string[];
    callToActions: string[];
    hashtags: string[];
  };
  socialMediaContent: {
    instagram: string;
    facebook: string;
    linkedin: string;
    twitter: string;
  };
  emailCampaign: {
    subjectLines: string[];
    previewText: string[];
    bodyContent: string;
  };
  midjourneyPrompts: {
    heroImage: string;
    productShot: string;
    lifestyle: string;
  };
  promotionalCalendar: {
    preLaunch: string[];
    launch: string[];
    postLaunch: string[];
  };
}

export interface SeasonalWorkshopResult {
  success: boolean;
  output?: SeasonalWorkshopOutput;
  error?: string;
  details?: Record<string, unknown>;
}

export interface SeasonalWorkshopHistory {
  id: string;
  userId: string;
  input: SeasonalWorkshopInput;
  output: SeasonalWorkshopOutput;
  createdAt: Date;
}
