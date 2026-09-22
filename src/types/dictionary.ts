export interface Dictionary {
  common: {
    title: string;
    description: string;
    loading: string;
    error: string;
    skipToContent: string;
  };
  nav: {
    home: string;
    services: string;
    portfolio: string;
    news: string;
    products: string;
    contact: string;
    portal: string;
    about: string;
    cta: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
  };
  footer: {
    services: string;
    quickLinks: string;
    contact: string;
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
    phone: string;
    email: string;
    address: string;
    description: string;
    servicesLinks: {
      webDevelopment: string;
      wordpressWebshop: string;
      webshopDevelopment: string;
      wordpressWebsite: string;
      seoOptimization: string;
      marketingLeadGeneration: string;
      graphicDesign: string;
      logoDesign: string;
      aiWorkflow: string;
      aiVideoGeneration: string;
      aiPromptEngineering: string;
    };
  };
  language: {
    switch: string;
    hungarian: string;
    english: string;
  };
  bentoGrid: {
    expertise: {
      title: string;
      content: string;
    };
    techStack: {
      title: string;
      content: string;
    };
    timeline: {
      title: string;
      content: string;
    };
  };
  services: {
    page: {
      title: string;
      description: string;
      heroLabel: string;
      heroTitle: string;
      heroSubtitle: string;
      cta1: string;
      cta2: string;
      directAnswer: string;
      sectionTitle: string;
      sectionSubtitle: string;
      sectionDescription: string;
      processTitle: string;
      processDescription: string;
      faqTitle: string;
      faqSection: string;
    };
  };
}

export type Language = "hu" | "en";

export const DEFAULT_LANGUAGE: Language = "hu";
