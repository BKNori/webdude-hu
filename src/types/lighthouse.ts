export interface LighthouseMetrics {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  url: string;
}

export interface AuditResponse {
  success: boolean;
  data?: LighthouseMetrics;
  error?: string;
}
