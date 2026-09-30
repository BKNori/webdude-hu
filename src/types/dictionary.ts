export interface ServiceCardContent {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  /** AEO "Direct Answer" — 40–60 szavas, önmagában is értelmezhető válasz. */
  directAnswer: string;
  tags: string[];
  features: string[];
  href: string;
}

export interface SecondaryServiceContent {
  dividerLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  directAnswer: string;
  tags: string[];
  href: string;
  detailsLabel: string;
}

export interface DirectAnswerItem {
  question: string;
  answer: string;
}

export interface ServicesContent {
  ariaLabel: string;
  eyebrow: string;
  title: EmphasisTitle;
  allServicesLabel: string;
  allServicesHref: string;
  quickAnswerLabel: string;
  detailsAriaSuffix: string;
  primary: ServiceCardContent[];
  secondary: SecondaryServiceContent;
  directAnswerHeading: string;
  directAnswers: DirectAnswerItem[];
}

export interface CaseKpiContent {
  label: string;
  value: string;
}

export interface CaseStudyContent {
  id: string;
  client: string;
  category: string;
  eyebrow: string;
  title: string;
  description: string;
  kpis: CaseKpiContent[];
  tags: string[];
  href: string;
  imgPlaceholder: string;
  image: string | null;
}

export interface CasesContent {
  ariaLabel: string;
  eyebrow: string;
  title: EmphasisTitle;
  detailsLabel: string;
  allLabel: string;
  allHref: string;
  items: CaseStudyContent[];
}

export interface AdvantageContent {
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}

export interface BenefitContent {
  title: string;
  description: string;
}

export interface WhyContent {
  ariaLabel: string;
  eyebrow: string;
  title: EmphasisTitle;
  subtitle: string;
  benefitsTitle: EmphasisTitle;
  advantages: AdvantageContent[];
  benefits: BenefitContent[];
  cta: CtaContent;
}

export interface FaqItemContent {
  category: string;
  question: string;
  answer: string;
}

export interface FaqContent {
  ariaLabel: string;
  eyebrow: string;
  title: EmphasisTitle;
  subtitle: string;
  footerQuestion: string;
  footerCta: string;
  footerCtaHref: string;
  items: FaqItemContent[];
}

export interface FinalCtaContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: CtaContent;
}

export interface HomeContent {
  meta: SeoMetaContent;
  hero: HeroContent;
  snapshot: SnapshotContent;
  proof: ProofContent;
  system: SystemContent;
  services: ServicesContent;
  cases: CasesContent;
  why: WhyContent;
  faq: FaqContent;
  finalCta: FinalCtaContent;
}


// ─────────────────────────────────────────────────────────────────────────────
// Főoldal tartalom (i18n) — SSOT típusok
// ─────────────────────────────────────────────────────────────────────────────

/** Kiemelést támogató címsor: prefix + **highlight** + suffix. */
export interface EmphasisTitle {
  prefix: string;
  highlight: string;
  suffix: string;
}

export interface CtaContent {
  label: string;
  href: string;
}

export interface SeoMetaContent {
  title: string;
  description: string;
}

export interface HeroMockupContent {
  url: string;
  alt: string;
  fileName: string;
  caseStudyLabel: string;
  resultLabel: string;
  featuredLabel: string;
  caption: string;
}

export interface HeroSlideContent {
  id: string;
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  /** `**kiemelés**` jelöléssel tagolt alcím. */
  subtitle: string;
  highlights: string[];
  trustPoints: string[];
  cta1: CtaContent;
  cta2: CtaContent;
  bgImage: string;
  bgAlt: string;
  ratingText: string;
  mockup?: HeroMockupContent;
}

export interface HeroContent {
  ariaLabel: string;
  highlightsAriaLabel: string;
  trustAriaLabel: string;
  ratingAriaLabel: string;
  slidesNavAriaLabel: string;
  slideLabel: string;
  prevLabel: string;
  nextLabel: string;
  scrollHint: string;
  slides: HeroSlideContent[];
}

export interface SnapshotCardContent {
  title: string;
  content: string;
}

export interface SnapshotContent {
  ariaLabel: string;
  /** Rejtett H2 — a H1 → H2 → H3 heading-hierarchia fenntartásához. */
  heading: string;
  cards: SnapshotCardContent[];
}

export interface ProofStatContent {
  value: string;
  label: string;
}

export interface ProofContent {
  ariaLabel: string;
  badge: string;
  clientsLabel: string;
  clients: string[];
  stats: ProofStatContent[];
}

export interface SystemStepContent {
  id: string;
  step: string;
  title: string;
  description: string;
}

export interface SystemContent {
  ariaLabel: string;
  eyebrow: string;
  title: EmphasisTitle;
  subtitle: string;
  cta: CtaContent;
  steps: SystemStepContent[];
}


/** Nyelvfüggetlen hivatkozás (label + locale-aware href). */
export interface LinkItem {
  label: string;
  href: string;
}

export interface Dictionary {
  /** Főoldal tartalom — a natív JSON i18n SSOT-ja. */
  home: HomeContent;
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
    faq: string;
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
    /** Lábléc jogi szöveg (a évszámot a komponens adja hozzá). */
    rightsReserved: string;
    privacyPolicy: string;
    termsOfService: string;
    phone: string;
    email: string;
    address: string;
    description: string;
    /** Localizált szolgáltatáslinkek (locale-aware href-ekkel). */
    serviceLinkItems: LinkItem[];
    /** Localizált gyorslinkek (locale-aware href-ekkel). */
    quickLinkItems: LinkItem[];
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
