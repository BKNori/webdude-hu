export interface SeoAuditInput {
  url: string;
  targetKeywords: string;
  industry:
    | "ecommerce"
    | "saas"
    | "local-business"
    | "content"
    | "portfolio"
    | "blog"
    | "other";
  targetAudience: string;
  primaryGoal:
    | "organic-traffic"
    | "conversions"
    | "brand-awareness"
    | "local-seo"
    | "aee-optimization";
  competitors?: string;
  additionalRequirements?: string;
}

export interface SeoAuditOutput {
  executiveSummary: {
    overallScore: number;
    criticalIssues: number;
    warnings: number;
    opportunities: number;
    priorityActions: string[];
  };
  technicalSeo: {
    performance: {
      lighthouseScore: number;
      lcp: string;
      fid: string;
      cls: string;
      recommendations: string[];
    };
    crawlability: {
      robotsTxt: string;
      sitemap: string;
      canonicalTags: string;
      recommendations: string[];
    };
    mobileOptimization: {
      responsiveDesign: string;
      mobileSpeed: string;
      recommendations: string[];
    };
  };
  contentAnalysis: {
    keywordDensity: {
      primary: string;
      secondary: string[];
      longTail: string[];
    };
    contentGaps: string[];
    contentQuality: {
      readability: string;
      structure: string;
      recommendations: string[];
    };
  };
  aeoOptimization: {
    entityBasedSeo: {
      entities: string[];
      schemaImplementation: string;
      recommendations: string[];
    };
    answerEngineReadiness: {
      featuredSnippets: string;
      peopleAlsoAsk: string;
      voiceSearch: string;
      recommendations: string[];
    };
    structuredData: {
      schemaTypes: string[];
      implementationStatus: string;
      recommendations: string[];
    };
  };
  competitorAnalysis: {
    topCompetitors: Array<{
      name: string;
      domain: string;
      strengths: string[];
      weaknesses: string[];
    }>;
    gapOpportunities: string[];
    strategicInsights: string[];
  };
  actionPlan: {
    immediate: Array<{
      task: string;
      impact: string;
      effort: string;
    }>;
    shortTerm: Array<{
      task: string;
      impact: string;
      effort: string;
    }>;
    longTerm: Array<{
      task: string;
      impact: string;
      effort: string;
    }>;
  };
}

export interface SeoAuditResult {
  success: boolean;
  output?: SeoAuditOutput;
  error?: string;
  details?: Record<string, unknown>;
}

export interface SeoAuditHistory {
  id: string;
  userId: string;
  input: SeoAuditInput;
  output: SeoAuditOutput;
  createdAt: Date;
}
