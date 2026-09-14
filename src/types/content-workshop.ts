export interface ContentWorkshopInput {
  topic: string;
  contentType:
    | "blog-post"
    | "social-media"
    | "landing-page"
    | "email-campaign"
    | "product-description"
    | "case-study";
  targetAudience: string;
  tone:
    | "professional"
    | "casual"
    | "friendly"
    | "authoritative"
    | "inspiring"
    | "humorous";
  platform:
    | "website"
    | "linkedin"
    | "instagram"
    | "facebook"
    | "twitter"
    | "email"
    | "other";
  keywords: string;
  callToAction?: string;
  additionalRequirements?: string;
}

export interface ContentWorkshopOutput {
  contentStrategy: {
    angle: string;
    hook: string;
    valueProposition: string;
    keyMessages: string[];
  };
  contentStructure: {
    headline: string;
    subheadlines: string[];
    bodySections: Array<{
      heading: string;
      content: string;
      wordCount: number;
    }>;
  };
  visualGuidance: {
    imageSuggestions: string[];
    colorPalette: string[];
    layoutRecommendations: string[];
  };
  seoOptimization: {
    primaryKeyword: string;
    secondaryKeywords: string[];
    metaDescription: string;
    headingStructure: string[];
  };
  socialMediaVariations: {
    linkedin: string;
    instagram: string;
    twitter: string;
  };
  callToActionVariations: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  contentCalendar: {
    publishingSchedule: string;
    contentTypes: string[];
    distributionChannels: string[];
  };
}

export interface ContentWorkshopResult {
  success: boolean;
  output?: ContentWorkshopOutput;
  error?: string;
  details?: Record<string, unknown>;
}

export interface ContentWorkshopHistory {
  id: string;
  userId: string;
  input: ContentWorkshopInput;
  output: ContentWorkshopOutput;
  createdAt: Date;
}
