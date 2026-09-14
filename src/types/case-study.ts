export interface CaseStudy {
  id?: string;
  title: string;
  clientName: string;
  workflowType: "Kristófka" | "GeneralAI" | "StrategistPro";
  impactMetrics: {
    efficiencyGain: string;
    timeSaved: string;
  };
  summary: string;
  status: "published" | "draft";
  createdAt: Date;
}
