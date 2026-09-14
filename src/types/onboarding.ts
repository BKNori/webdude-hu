import { z } from "zod";

export const designOnboardingSchema = z.object({
  websiteUrl: z
    .string()
    .url({ message: "Érvénytelen weboldal URL!" })
    .optional()
    .or(z.literal("")),
  brandColors: z
    .string()
    .min(2, { message: "Az arculati színek megadása kötelező!" }),
  designGuidelines: z
    .string()
    .min(5, {
      message: "Kérlek, adj meg legalább 5 karakter leírást vagy linket!",
    }),
});

export const techOnboardingSchema = z.object({
  websiteUrl: z.string().url({ message: "Érvénytelen weboldal URL!" }),
  hostingProvider: z
    .string()
    .min(2, { message: "A tárhelyszolgáltató megadása kötelező!" }),
  techStack: z
    .string()
    .min(2, { message: "A használt CMS / technológia megadása kötelező!" }),
});

export const aiOnboardingSchema = z.object({
  targetAudience: z
    .string()
    .min(5, {
      message: "Kérlek, fejtsd ki a célközönséget legalább 5 karakterben!",
    }),
  preferredTopics: z
    .string()
    .min(5, {
      message: "Kérlek, adj meg néhány preferált témát vagy kulcsszót!",
    }),
  aiObjectives: z
    .string()
    .min(5, { message: "Kérlek, határozd meg az AI rendszer fő céljait!" }),
});

export const croOnboardingSchema = z.object({
  websiteUrl: z.string().url({ message: "Érvénytelen weboldal URL!" }),
  primaryGoal: z
    .string()
    .min(5, {
      message: "Kérlek, határozd meg a landing page elsődleges célját!",
    }),
  competitors: z
    .string()
    .min(5, { message: "Kérlek, adj meg legalább egy fő versenytársat!" }),
});

export type DesignOnboarding = z.infer<typeof designOnboardingSchema>;
export type TechOnboarding = z.infer<typeof techOnboardingSchema>;
export type AiOnboarding = z.infer<typeof aiOnboardingSchema>;
export type CroOnboarding = z.infer<typeof croOnboardingSchema>;

export type OnboardingCategory = "cro" | "tech" | "ai" | "design";

export interface OnboardingSubmitResult {
  success: boolean;
  error?: string;
  workflowId?: string;
}
