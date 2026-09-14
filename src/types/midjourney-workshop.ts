export interface MidjourneyGenerationInput {
  subject: string;
  style:
    | "photorealistic"
    | "cinematic"
    | "artistic"
    | "minimalist"
    | "vintage"
    | "futuristic"
    | "abstract";
  mood:
    | "dramatic"
    | "peaceful"
    | "energetic"
    | "mysterious"
    | "romantic"
    | "professional"
    | "playful";
  lighting:
    | "natural"
    | "studio"
    | "golden-hour"
    | "blue-hour"
    | "neon"
    | "volumetric"
    | "chiaroscuro";
  aspectRatio: "16:9" | "9:16" | "1:1" | "4:5" | "21:9";
  additionalRequirements?: string;
}

export interface MidjourneyGenerationOutput {
  visualConcept: {
    style: string;
    mood: string;
    description: string;
    keyElements: string[];
  };
  lightingSetup: {
    type: string;
    direction: string;
    intensity: string;
    colorTemperature: string;
    rationale: string;
  };
  composition: {
    framing: string;
    perspective: string;
    depthOfField: string;
    focalPoint: string;
  };
  colorGrading: {
    palette: string[];
    gradingStyle: string;
    contrast: string;
    saturation: string;
    rationale: string;
  };
  midjourneyPrompt: string;
  variations: {
    alternative1: string;
    alternative2: string;
    alternative3: string;
  };
}

export interface MidjourneyGenerationResult {
  success: boolean;
  output?: MidjourneyGenerationOutput;
  error?: string;
  details?: Record<string, unknown>;
}

export interface MidjourneyGenerationHistory {
  id: string;
  userId: string;
  input: MidjourneyGenerationInput;
  output: MidjourneyGenerationOutput;
  createdAt: Date;
}
