export interface AdminStats {
  date: string;
  totalGenerations: number;
  totalUsers: number;
  totalTokensUsed: number;
  totalCostUsd: number;
  agentStats: Record<string, AgentStat>;
  heliconeStats?: HeliconeStats;
}

export interface AgentStat {
  executions: number;
  tokensUsed: number;
  costUsd: number;
  avgLatencyMs?: number;
  successRate?: number;
}

export interface HeliconeStats {
  totalRequests: number;
  avgLatencyMs: number;
  successRate: number;
  providerBreakdown: Record<string, ProviderStat>;
}

export interface ProviderStat {
  requests: number;
  avgLatencyMs: number;
  tokensUsed: number;
  costUsd: number;
  successRate: number;
}

export interface DashboardData {
  dailyStats: AdminStats[];
  monthlyStats: AdminStats[];
  totalStats: {
    totalGenerations: number;
    totalUsers: number;
    totalTokensUsed: number;
    totalCostUsd: number;
  };
  agentBreakdown: Record<string, AgentStat>;
  costTrend: Array<{ date: string; cost: number }>;
  heliconeOverview?: HeliconeOverview;
}

export interface HeliconeOverview {
  totalRequests: number;
  avgLatencyMs: number;
  successRate: number;
  topAgents: Array<{ agent: string; requests: number; avgLatencyMs: number }>;
  providerBreakdown: Record<string, ProviderStat>;
  latencyTrend: Array<{ date: string; avgLatencyMs: number }>;
}

export interface SystemStatus {
  groqApi: boolean;
  geminiApi: boolean;
  anthropicApi: boolean;
  openaiApi: boolean;
  firestore: boolean;
  heliconeApi?: boolean;
}

export interface CostAlert {
  type: "monthly_cost" | "daily_tokens" | "error_rate" | "latency_spike";
  threshold: number;
  currentValue: number;
  triggered: boolean;
}
