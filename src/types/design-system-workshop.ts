export interface DesignSystemInput {
  systemPurpose: string;
  targetAudience: string;
  systemScope:
    | "full-system"
    | "color-palette"
    | "typography"
    | "component-library"
    | "spacing-grid";
  designStyle:
    "minimalist" | "corporate" | "modern" | "creative" | "tech" | "luxury";
  brandColors?: string[];
  requiredComponents?: string[];
  additionalRequirements?: string;
}

export interface DesignSystemOutput {
  systemConcept: {
    style: string;
    description: string;
    keyElements: string[];
  };
  designTokens: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      neutral: string;
      success: string;
      warning: string;
      error: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
    };
    typography: {
      fontFamily: string;
      fontSizes: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        "2xl": string;
        "3xl": string;
      };
      fontWeights: {
        light: string;
        normal: string;
        medium: string;
        semibold: string;
        bold: string;
      };
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  };
  tailwindConfig: {
    themeExtension: string;
    customUtilities: string[];
    pluginRecommendations: string[];
  };
  componentLibrary: {
    components: {
      name: string;
      description: string;
      props: string[];
      variants: string[];
    }[];
    namingConvention: string;
    fileStructure: string;
  };
  documentation: {
    structure: string;
    examples: string[];
    guidelines: string[];
    doNot: string[];
  };
  midjourneyPrompts: {
    primary: string;
    alternative1: string;
    alternative2: string;
  };
  exportFormats: {
    tailwindConfig: string;
    cssVariables: string;
    jsonTokens: string;
  };
  variations: {
    lightMode: string;
    darkMode: string;
    customTheme: string;
  };
}

export interface DesignSystemResult {
  success: boolean;
  output?: DesignSystemOutput;
  error?: string;
  details?: Record<string, unknown>;
}

export interface DesignSystemHistory {
  id: string;
  userId: string;
  input: DesignSystemInput;
  output: DesignSystemOutput;
  createdAt: Date;
}
