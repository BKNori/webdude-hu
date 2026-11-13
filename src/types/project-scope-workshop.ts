/**
 * Ügyfél-Briefből Weboldal & Webshop Architektúra, Sitemap & Árajánlat
 * Tervező AI Műhely — típusok (SSOT).
 *
 * Balog Norbert: 26 év grafika + 16 év webfejlesztés.
 * SZIGORÚ ZÉRÓ FIX ÁR SZABÁLY: a kimenet soha nem tartalmazhat Ft/EUR összeget.
 */

export type ProjectType =
  | "corporate_website"
  | "ecommerce_webshop"
  | "custom_webapp_portal"
  | "website_redesign_migration"
  | "landing_funnel"
  | "full_digital_launch";

export type RecommendedStack =
  | "nextjs_firebase"
  | "wordpress_custom"
  | "woocommerce_erp"
  | "hybrid_headless"
  | "ai_auto_recommend";

export interface ProjectScopeInput {
  /** Ügyfél / cégnév (kötelező). */
  clientName: string;
  /** Iparág és tevékenység (kötelező). */
  industry: string;
  /** Nyers ügyfél-igény / e-mail szöveg / üzleti cél (kötelező). */
  rawClientBrief: string;
  /** Projekttípus. */
  projectType: ProjectType;
  /** Technológiai irány. */
  recommendedStack: RecommendedStack;
  /** Opcionális integrációk és fókuszok. */
  requiredIntegrations?: string;
  /** Várható átfutási cél. */
  timelinePreference?: string;
}

export interface ProjectScopeExecSummary {
  projectTitle: string;
  businessObjective: string;
  targetConversionGoal: string;
  recommendedTechStack: string;
  techStackClientBenefits: Array<{ technology: string; clientBenefit: string }>;
}

export interface SitemapPageSpec {
  pageName: string;
  urlSlug: string;
  pagePurpose: string;
  recommendedH1: string;
  keySections: string[];
  schemaOrgTypes: string[];
  aeoDirectAnswerFocus: string;
}

export interface ProposalTier {
  tierName: string;
  badge: string;
  idealFor: string;
  deliverables: string[];
  includedIntegrations: string[];
  estimatedWeeks: string;
  /** Mindig: "Egyedi árajánlat alapján" — SOHA fix ár! */
  priceLabel: string;
  ctaText: string;
}

export interface RoadmapPhase {
  phaseNumber: number;
  phaseTitle: string;
  durationWeeks: string;
  tasks: string[];
  clientDeliverable: string;
}

export interface ProjectScopeOutput {
  executiveSummary: ProjectScopeExecSummary;
  sitemapAndSeoArchitecture: SitemapPageSpec[];
  tierPackages: ProposalTier[];
  milestoneRoadmap: RoadmapPhase[];
  riskAndPreconditions: string[];
  clientProposalEmail: string;
}

export interface ProjectScopeGenerationResult {
  success: boolean;
  output?: ProjectScopeOutput;
  error?: string;
  details?: Record<string, unknown>;
}
