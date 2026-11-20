export interface EnInsightTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface EnInsightSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: EnInsightTable;
}

export interface EnInsightFaqItem {
  q: string;
  a: string;
}

export interface EnInsightRelatedLink {
  label: string;
  description: string;
  href: string;
}

export interface EnInsightPost {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  readingTime: string;
  date: string;
  updatedAt: string;
  coverImage: string;
  coverAlt: string;
  excerpt: string;
  tldr: string;
  keywords: string[];
  sections: EnInsightSection[];
  checklistTitle: string;
  checklist: string[];
  faq: EnInsightFaqItem[];
  relatedLinks: EnInsightRelatedLink[];
}

export const EN_INSIGHTS: EnInsightPost[] = [
  {
    slug: "ai-search-geo-aeo-guide-for-businesses",
    title:
      "AI Search Optimization (GEO & AEO) Guide: How to Get Cited by ChatGPT, Perplexity & Google AI Overviews",
    seoTitle: "AI Search Optimization (GEO & AEO) Guide 2026 | WebDude",
    seoDescription:
      "Discover how I optimize websites for ChatGPT, Perplexity, and Google AI Overviews using Schema.org entities, llms.txt, and semantic HTML structure.",
    category: "AI Search & GEO",
    readingTime: "8 min read",
    date: "2026-11-21",
    updatedAt: "2026-11-21",
    coverImage:
      "/assets/blog/covers/en-ai-search-geo-aeo-guide-for-businesses.webp",
    coverAlt:
      "AI Search Optimization GEO and AEO structured entity guide visual",
    excerpt:
      "Search has shifted from ten blue links to synthesized answers. Here is the exact technical architecture I implement so AI answer engines verify and cite your brand.",
    tldr: "Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) ensure your business is cited by ChatGPT, Perplexity, and Google AI Overviews. Instead of keyword stuffing, I pair fast Server-Side Rendered HTML with connected Schema.org JSON-LD entities, direct-answer blocks, clean robots.txt AI crawler rules, and machine-readable llms.txt documentation.",
    keywords: [
      "GEO optimization",
      "AEO Answer Engine Optimization",
      "AI Search SEO",
      "Schema.org JSON-LD entities",
      "llms.txt",
      "ChatGPT website citation",
    ],
    sections: [
      {
        heading: "Why Classic Keyword SEO Alone No Longer Captures Buyer Attention",
        paragraphs: [
          "High-intent B2B and service buyers increasingly start their vendor shortlist inside Perplexity, ChatGPT Search, Claude, or Google AI Overviews rather than clicking through five agency landing pages. When an answer engine summarizes your market, only brands with clear entity authority and machine-verifiable evidence earn direct citations.",
          "With 26+ years in graphic design and 16+ years in full-stack web engineering, I see the same pattern across legacy business websites: slow JavaScript-only rendering, disconnected metadata, vague marketing fluff, and broken structured data. If an AI crawler cannot parse who you are, what problem you solve, and why your expertise is credible within milliseconds, your competitors win the recommendation.",
        ],
      },
      {
        heading: "Traditional SEO vs. AEO vs. GEO: The Technical Stack Side by Side",
        paragraphs: [
          "Modern search visibility does not replace technical SEO — it extends it into answer formatting and entity verification. I structure every project around all three layers simultaneously so organic rankings and AI citations reinforce each other.",
        ],
        table: {
          caption: "Comparison of Traditional SEO, AEO, and GEO implementation layers",
          headers: ["Layer", "Primary Target", "Core Technical Signals", "Key Business Outcome"],
          rows: [
            [
              "Traditional SEO",
              "Google & Bing organic SERPs",
              "Clean URL architecture, Core Web Vitals, canonical tags, XML sitemap",
              "Steady search rankings for commercial & informational intent",
            ],
            [
              "AEO (Answer Engine Optimization)",
              "Featured Snippets, Voice Search & AI Overviews",
              "40–60 word Direct Answer blocks, semantic headings, visible FAQ + FAQPage JSON-LD",
              "Immediate extractable answers that position your brand as the default expert",
            ],
            [
              "GEO (Generative Engine Optimization)",
              "ChatGPT, Perplexity, Claude & Gemini",
              "Connected @id Schema graph, E-E-A-T author entities, llms.txt, fast SSR HTML",
              "Direct brand citations and qualified referral traffic from AI conversations",
            ],
          ],
        },
      },
      {
        heading: "The 4 Pillars I Implement on Every AI-Ready Website",
        paragraphs: [
          "First, I eliminate client-side rendering blind spots. Critical commercial messaging, comparison tables, and FAQ answers are rendered on the server so every search bot and LLM fetcher reads complete HTML without executing heavy client bundles.",
          "Second, I connect your structured data into a single verifiable graph using stable @id anchors (#organization, #person, Service, TechArticle, and FAQPage) rather than isolated JSON-LD fragments. Every visible claim on the page matches what the schema declares — never hiding secret markup from users.",
          "Third, I configure explicit crawler governance: intentional robots.txt rules welcoming GPTBot, PerplexityBot, ClaudeBot, and Google-Extended alongside a concise /llms.txt index and /llms-full.txt technical context endpoint.",
          "Fourth, I anchor trust with authentic E-E-A-T proof: named senior authorship (Balog Norbert), measurable case studies, clean conversion funnels, and custom-scoped consulting rather than generic template promises.",
        ],
      },
    ],
    checklistTitle: "My 6-Point AI & SEO Readiness Checklist",
    checklist: [
      "Verify in robots.txt that AI retrieval bots (GPTBot, PerplexityBot, ClaudeBot) are not unintentionally blocked.",
      "Publish a clean /llms.txt summary mapping your highest-value services, case studies, and cornerstone guides.",
      "Open every key commercial page and guide with a concise 40–60 word Direct Answer block.",
      "Render comparison data in semantic HTML <table> elements and keep FAQs visibly printed alongside FAQPage JSON-LD.",
      "Link Person (#person) and Organization (#organization) Schema.org entities across services, case studies, and articles.",
      "Run an instant diagnostic with my free SEO & AI Readiness Checker before shipping template or CMS updates.",
    ],
    faq: [
      {
        q: "How quickly can a website start appearing in AI answers after GEO & AEO optimization?",
        a: "Technical crawlability, Schema.org entity graphs, and llms.txt indexing are picked up within days to a few weeks depending on crawl frequency, while competitive citation authority compounds steadily as your cornerstone guides and case studies are referenced.",
      },
      {
        q: "Do I need an expensive custom CMS overhaul to become AI-search ready?",
        a: "Not always. If your existing platform outputs slow bloated HTML or blocks bots, I first diagnose whether targeted structural refactoring fixes the bottleneck or whether migrating key pages to Next.js delivers higher long-term ROI.",
      },
      {
        q: "How can I check right now if my domain is visible to ChatGPT and Perplexity?",
        a: "You can test any public URL in seconds with my free 10-point SEO & AI Readiness Checker, which inspects HTTPS speed, Schema.org entities, Open Graph tags, robots.txt AI-bot policies, and llms.txt availability.",
      },
    ],
    relatedLinks: [
      {
        label: "Free SEO & AI Readiness Checker",
        description:
          "Run a deterministic 10-point live audit covering Schema.org AEO entities, AI bot rules, and llms.txt on your domain.",
        href: "/en/free-seo-aeo-checker",
      },
      {
        label: "Technical SEO & AEO Optimization Services",
        description:
          "See how I architect Core Web Vitals, entity graphs, and search-first content structures for revenue growth.",
        href: "/en/services/seo-optimization",
      },
      {
        label: "Free 10-Minute Video UX & SEO Audit",
        description:
          "Request a personalized screen-recorded review of your site's top 3 conversion and AI visibility opportunities.",
        href: "/en/free-website-audit",
      },
    ],
  },
  {
    slug: "nextjs-vs-custom-wordpress-2026",
    title:
      "Next.js vs. Custom WordPress: Choosing the Right Architecture for Speed, SEO & Conversions",
    seoTitle: "Next.js vs. Custom WordPress Architecture Guide | WebDude",
    seoDescription:
      "Comparing Next.js App Router and bespoke WordPress engineering on Core Web Vitals, technical SEO, security, maintenance, and conversion ROI.",
    category: "Architecture & Speed",
    readingTime: "7 min read",
    date: "2026-11-21",
    updatedAt: "2026-11-21",
    coverImage:
      "/assets/blog/covers/en-nextjs-vs-custom-wordpress-2026.webp",
    coverAlt:
      "Next.js App Router vs Custom WordPress engineering comparison banner",
    excerpt:
      "Choosing between Next.js and WordPress is a commercial decision, not a developer trend. Here is how I advise clients to pick the stack that maximizes long-term ROI.",
    tldr: "Next.js App Router delivers unmatched Core Web Vitals, zero plugin attack surface, and instantaneous UX for high-growth SaaS, B2B lead engines, and custom portals. Custom lean WordPress — engineered without heavy visual page builders — remains practical when marketing teams need familiar editorial publishing or WooCommerce inventory workflows.",
    keywords: [
      "Next.js vs WordPress",
      "Next.js 16 App Router",
      "Custom WordPress development",
      "Core Web Vitals architecture",
      "Headless CMS strategy",
    ],
    sections: [
      {
        heading: "Why Bloated WordPress Themes Hurt Conversion More Than Platform Limits",
        paragraphs: [
          "Many business owners blame WordPress itself when their site feels sluggish or suffers security incidents. In practice, over 16+ years of full-stack engineering, I find the real culprit is almost always off-the-shelf multipurpose themes, Elementor or Divi div-soup markup, and thirty overlapping third-party plugins fighting over render-blocking CSS and JavaScript.",
          "When every landing page ships megabytes of unused assets before showing a headline, mobile visitors bounce and paid acquisition costs climb. Before recommending a full replatform, I audit whether clean bespoke theme engineering solves the issue or whether moving to Next.js App Router unlocks a step-change in speed and UX flexibility.",
        ],
      },
      {
        heading: "Head-to-Head Comparison: Next.js App Router vs. Bespoke WordPress",
        paragraphs: [
          "Because I build production systems in both Next.js 16 and custom lean WordPress / WooCommerce, my recommendation depends strictly on your business model, publishing frequency, and integration roadmap.",
        ],
        table: {
          caption: "Architectural comparison for commercial websites and digital products",
          headers: ["Dimension", "Next.js App Router (React 19)", "Bespoke Lean WordPress"],
          rows: [
            [
              "Core Web Vitals (LCP / INP / CLS)",
              "Sub-second SSR/ISR, zero unused bundle weight, strict image & font optimization",
              "Fast only with custom lightweight blocks, page caching, and disciplined asset loading",
            ],
            [
              "Security & Maintenance",
              "Minimal runtime attack surface; no PHP plugin update treadmill",
              "Requires structured hardening, monitored updates, and malware prevention",
            ],
            [
              "Custom Workflows & AI Portals",
              "Native Server Actions, authenticated dashboards, API integrations, interactive tools",
              "Possible via custom REST endpoints, though heavier for complex stateful UIs",
            ],
            [
              "Editorial Publishing",
              "Git/MDX or structured headless CMS with strict schema validation",
              "Familiar WYSIWYG/Gutenberg publishing workflow for non-technical editors",
            ],
            [
              "Best Fit",
              "High-conversion B2B sites, SaaS products, custom lead calculators, AI tools",
              "Content-heavy magazines, mid-sized WooCommerce shops needing ERP sync",
            ],
          ],
        },
      },
      {
        heading: "How I Architect High-Converting Platforms Without Lock-In",
        paragraphs: [
          "On Next.js projects, I leverage Server Components by default, keeping client-side hydration strictly on interactive leaf components while pairing Tailwind CSS and responsive AVIF/WebP pipelines so pages consistently score high in Lighthouse.",
          "On WordPress and WooCommerce builds, I strip out heavy page builders, write semantic custom templates, harden authentication and uploads, and automate billing or ERP data flows cleanly via server-side integrations.",
        ],
      },
    ],
    checklistTitle: "Decision Checklist: Which Platform Should You Choose?",
    checklist: [
      "Choose Next.js if Core Web Vitals, custom interactive UX, zero plugin maintenance, and SaaS/AI integrations are top priorities.",
      "Choose bespoke WordPress if your editorial team publishes multiple articles daily or operates an established WooCommerce catalog.",
      "Avoid drag-and-drop visual builders on conversion-critical landing pages regardless of CMS.",
      "Ensure both architectures serve clean Server-Rendered HTML with connected Schema.org JSON-LD entities.",
      "Request a custom technical scoping quote based on your exact funnel goals rather than a one-size template.",
    ],
    faq: [
      {
        q: "Can you migrate an existing WordPress site to Next.js without losing SEO rankings?",
        a: "Yes. I map every historical URL, configure strict 301 redirects, preserve canonical metadata and structured data parity, and verify index coverage before and after launch so organic equity transfers cleanly.",
      },
      {
        q: "If we build in Next.js, how will my team edit text and publish blog articles?",
        a: "I pair Next.js with structured MDX workflows or lightweight authenticated admin dashboards tailored to exactly what your team updates, avoiding cluttered controls that break layout integrity.",
      },
      {
        q: "Do you work exclusively on Next.js, or do you still rescue slow WordPress sites?",
        a: "I do both. Many clients come to me with a sluggish or compromised WordPress build that can be cleaned, hardened, and accelerated rapidly, while others launch greenfield Next.js flagship platforms.",
      },
    ],
    relatedLinks: [
      {
        label: "Full-Stack Web Development Services",
        description:
          "Explore how I engineer Next.js 16 and custom WordPress systems focused on speed and lead conversion.",
        href: "/en/services/web-development",
      },
      {
        label: "BTShop Case Study (Next.js + E-Commerce UX)",
        description:
          "Inspect a production case study showing clean architectural execution and conversion-first UI.",
        href: "/en/portfolio/btshop",
      },
      {
        label: "Request a Custom Project Proposal",
        description:
          "Share your technical goals directly with me to receive an architectural recommendation and custom scope.",
        href: "/en/contact",
      },
    ],
  },
  {
    slug: "senior-freelancer-vs-digital-agency",
    title:
      "Hiring a Senior Full-Stack Freelancer vs. a Digital Agency: Direct Accountability, Speed & ROI",
    seoTitle: "Senior Full-Stack Freelancer vs. Agency ROI | WebDude",
    seoDescription:
      "Why working directly with me — bringing 26+ years of graphic design and 16+ years of web engineering — outperforms traditional multi-layer digital agencies.",
    category: "Strategy & ROI",
    readingTime: "6 min read",
    date: "2026-11-21",
    updatedAt: "2026-11-21",
    coverImage:
      "/assets/blog/covers/en-senior-freelancer-vs-digital-agency.webp",
    coverAlt:
      "Hiring a Senior Full-Stack Freelancer vs Digital Agency comparison visual",
    excerpt:
      "Many companies pay enterprise agency retainers only to have junior staff execute their project behind account managers. Here is what changes when you work directly with a senior solo partner.",
    tldr: "Working directly with a senior solo specialist removes account-manager telephone games, agency overhead, and handoff friction between brand design and engineering. With 26+ years of graphic design and 16+ years of web development experience, I personally design, code, optimize SEO/AEO, and take end-to-end accountability for your launch.",
    keywords: [
      "Senior freelance web developer vs agency",
      "Full-stack solo consultant",
      "Web design and engineering ROI",
      "Balog Norbert WebDude",
      "Conversion website partner",
    ],
    sections: [
      {
        heading: "The Hidden Cost of Agency Layers and Divided Ownership",
        paragraphs: [
          "On paper, a multi-person agency looks reassuring. In day-to-day execution, business owners often discover that the senior strategist who pitched the project disappears after kickoff. Your brief travels from an account manager to a separate designer, then to a junior frontend developer, and finally to an outsourced SEO contractor.",
          "Every handoff dilutes conversion logic. Visual typography clashes with responsive breakpoints, Core Web Vitals drop after heavy animations get bolted on, and nobody owns the final commercial result.",
        ],
      },
      {
        heading: "Side-by-Side Comparison: Senior Solo Partner vs. Traditional Agency",
        paragraphs: [
          "As Balog Norbert (WebDude), I run a dedicated solo practice intentionally: every brand asset, UX layout, TypeScript module, and Schema.org graph comes from one cohesive engineering standard.",
        ],
        table: {
          caption: "Operational & ROI comparison between a senior solo specialist and a traditional agency",
          headers: ["Factor", "Working Directly with Me (WebDude)", "Traditional Digital Agency"],
          rows: [
            [
              "Who Designs & Builds",
              "26+ years graphic design + 16+ years engineering — senior hands-on execution",
              "Senior partner pitches; junior or rotating staff implement",
            ],
            [
              "Communication Speed",
              "Direct feedback loop directly with the builder — zero middlemen",
              "Weekly status calls filtered through project/account managers",
            ],
            [
              "Design-to-Code Fidelity",
              "Pixel-accurate Dual Theme UI built natively by the designer",
              "Friction and compromises during Figma-to-dev handoff",
            ],
            [
              "SEO / AEO Integration",
              "Built into server architecture, headings, and JSON-LD from day one",
              "Often sold separately as a post-launch add-on retainer",
            ],
            [
              "Pricing & Scoping",
              "Tailored custom quote aligned strictly with business deliverables",
              "Multi-tier agency overhead baked into every sprint",
            ],
          ],
        },
      },
      {
        heading: "When You Should Choose a Senior Solo Partner — And When an Agency Fits",
        paragraphs: [
          "An agency makes sense when you genuinely need a 15-person media buying floor producing twenty ad variations every week across TV and print simultaneously. However, when your priority is a flagship conversion website, brand identity overhaul, custom Next.js/WordPress platform, or AI-search growth engine, one battle-tested architect moves faster and cleaner than a crowded room.",
          "Instead of vague promises, I prove my methodology upfront through my portfolio case studies and a free 10-minute screen-recorded audit of your existing site.",
        ],
      },
    ],
    checklistTitle: "How to Evaluate Any Senior Web Partner Before Signing",
    checklist: [
      "Confirm by name who will personally write the code and craft the visual layout.",
      "Inspect live portfolio builds on real mobile devices — not just static Dribbble screenshots.",
      "Ask how Core Web Vitals, Accessibility (WCAG AA), and Schema.org AEO are tested before launch.",
      "Verify clear IP ownership: you should own your domain, repository, and hosting accounts.",
      "Watch a short video audit of your current site to judge clarity before committing to a custom build.",
    ],
    faq: [
      {
        q: "Is there continuity risk when working with a solo specialist instead of an agency?",
        a: "I eliminate black-box lock-in by writing clean, documented Next.js, TypeScript, or standard WordPress code hosted in your own repositories and cloud accounts, so any competent engineer can understand it immediately.",
      },
      {
        q: "Can one person really deliver high-end brand design, full-stack code, and technical SEO?",
        a: "Yes — precisely because I have spent 26+ years in graphic design and 16+ years in web development. Combining both disciplines prevents the disjointed compromises typical when separate specialists work in silos.",
      },
      {
        q: "How do we start a project and determine investment scope?",
        a: "Because no two businesses have identical architecture needs, I never use rigid cookie-cutter price lists. Request a free 10-minute video audit or message me with your goals and I will prepare a tailored custom quote.",
      },
    ],
    relatedLinks: [
      {
        label: "About Balog Norbert (26+ Years Experience)",
        description:
          "Read my full engineering and design background, core technology stack, and solo partnership principles.",
        href: "/en/about",
      },
      {
        label: "Explore 14 Verified Case Studies",
        description:
          "Browse detailed project breakdowns covering custom e-commerce, brand systems, and performance rebuilds.",
        href: "/en/portfolio",
      },
      {
        label: "Claim Your Free 10-Minute Video Audit",
        description:
          "Experience my direct feedback style first with a personalized screen-recorded UX and SEO review.",
        href: "/en/free-website-audit",
      },
    ],
  },
];

export function getEnInsightBySlug(slug: string): EnInsightPost | undefined {
  return EN_INSIGHTS.find((post) => post.slug === slug);
}
