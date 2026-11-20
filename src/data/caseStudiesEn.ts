export interface EnCaseStudyMetric {
  label: string;
  value: string;
}

export interface EnCaseStudyFaq {
  question: string;
  answer: string;
}

export interface EnCaseStudyEntry {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  directAnswer: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  metrics: EnCaseStudyMetric[];
  faq: EnCaseStudyFaq[];
}

export const EN_CASE_STUDIES: Record<string, EnCaseStudyEntry> = {
  nedelmarket: {
    slug: "nedelmarket",
    title: "Nedel Market — B2B E-Commerce Ecosystem & Local Server Sync",
    subtitle:
      "Bridging a high-volume WooCommerce B2B catalog with an on-premise accounting system and automated mirror backups.",
    category: "B2B E-Commerce & Systems Integration",
    seoTitle: "Nedel Market B2B E-Commerce Case Study | WebDude",
    seoDescription:
      "How I built a real-time B2B WooCommerce catalog synced with a local office server, accounting ERP, Wordfence security, and RankMath SEO/AEO.",
    directAnswer:
      "For Nedel Market, I engineered a B2B WooCommerce catalog connected directly to a local office server and accounting software with automated RAID backups. Combined with Wordfence hardening, RankMath SEO/AEO structure, and GA4 telemetry, the platform delivers reliable 24/7 self-service ordering with zero data loss.",
    challenge:
      "Nedel Market operates in B2B wholesale where online stock and pricing had to remain synchronized with a local accounting system and office database. Their legacy setup risked data loss and lacked real-time automation for returning wholesale buyers.",
    solution:
      "I built an integrated digital ecosystem linking WooCommerce directly with the on-premise accounting server, backed by mirrored RAID backups, hardened Wordfence firewall rules, RankMath structured SEO/AEO markup, and Search Console plus GA4 analytics.",
    deliverables: [
      "Custom WooCommerce B2B ordering portal",
      "Real-time on-premise server & accounting integration",
      "Automated RAID mirror backup workflow",
      "Wordfence 24/7 security firewall hardening",
      "RankMath SEO/AEO schema & GA4 analytics setup",
    ],
    metrics: [
      { label: "Sync Architecture", value: "Real-Time Server" },
      { label: "Protection", value: "24/7 Firewall" },
      { label: "Data Safety", value: "Automated RAID" },
      { label: "Search Readiness", value: "RankMath AEO/SEO" },
    ],
    faq: [
      {
        question:
          "How did I connect WooCommerce to a local office accounting server?",
        answer:
          "I architected a controlled API sync pipeline linking the webshop inventory and orders directly with the client's local server database while maintaining automated mirror backups.",
      },
      {
        question: "How is a high-availability B2B portal protected?",
        answer:
          "Alongside server-level backups, I configured Wordfence real-time firewall rules, strict access controls, and continuous traffic monitoring in GA4 and Search Console.",
      },
    ],
  },
  leanperial: {
    slug: "leanperial",
    title: "Leanperial — Quiet Luxury Website & Malware Recovery",
    subtitle:
      "Full malware cleanup, DNS/SSL reconstruction, and a bespoke Quiet Luxury WordPress platform achieving a 100/100 SEO score.",
    category: "Luxury Web Development & Security",
    seoTitle: "Leanperial Quiet Luxury Web Case Study | WebDude",
    seoDescription:
      "Executive search platform rebuilt from a compromised site to a 100/100 SEO score Quiet Luxury WordPress architecture with DNS, SSL, and SPF/DKIM.",
    directAnswer:
      "Leanperial's legacy website suffered from malware infection, broken DNS, and browser security warnings. I executed a complete malware cleanup, rebuilt DNS and Let's Encrypt SSL, engineered a Quiet Luxury Kadence WordPress site, configured SPF/DKIM email delivery, and reached a 100/100 technical SEO score.",
    challenge:
      "For an international executive search and private advisory practice, trust and discretion are everything. Leanperial's previous site was compromised by malware, triggering security warnings and degrading speed across DNS and SSL layers.",
    solution:
      "I performed a forensic cleanup, reconstructed the DNS zone and SSL certificates, and designed a refined Quiet Luxury WordPress interface using generous whitespace, custom typography, WebP assets, authenticated SMTP (SPF/DKIM), and Schema.org markup.",
    deliverables: [
      "Full forensic malware removal & security hardening",
      "DNS reconstruction & Let's Encrypt SSL setup",
      "Quiet Luxury bespoke WordPress + Kadence build",
      "SPF/DKIM authenticated SMTP form delivery",
      "Technical SEO & WebP speed optimization",
    ],
    metrics: [
      { label: "SEO Score", value: "100 / 100" },
      { label: "Security Status", value: "100% Malware-Free" },
      { label: "Email Auth", value: "SMTP + SPF/DKIM" },
      { label: "Asset Format", value: "WebP Optimized" },
    ],
    faq: [
      {
        question:
          "How quickly can an infected WordPress site be recovered without losing brand authority?",
        answer:
          "I isolate compromised files immediately, rebuild clean DNS and SSL layers first, and then deploy hardened templates with zero leftover backdoors.",
      },
      {
        question: "What defines Quiet Luxury in digital UI/UX?",
        answer:
          "Disciplined typography, generous negative space, restrained high-contrast palettes, and effortless loading speed rather than noisy visual gimmicks.",
      },
    ],
  },
  btshop: {
    slug: "btshop",
    title: "BTShop.hu — 3,200+ Product E-Commerce & ERP Automation",
    subtitle:
      "Automated WooCommerce platform integrated with Kulcs-Soft ERP, custom SEO plugin, Merchant feeds, and courier APIs.",
    category: "Enterprise E-Commerce & API Engineering",
    seoTitle: "BTShop.hu 3,200+ SKU WooCommerce Case Study | WebDude",
    seoDescription:
      "Enterprise WooCommerce store with 3,200+ SKUs, bidirectional Kulcs-Soft ERP sync, custom SEO plugin, Merchant Center feed, and MPL/Foxpost APIs.",
    directAnswer:
      "For BTShop.hu, I built an automated 3,200+ product WooCommerce engine featuring bidirectional Kulcs-Soft ERP stock and order sync, MPL and Foxpost shipping label automation, daily Google Merchant Center XML feeds, and a custom-coded WordPress SEO plugin — eliminating manual administration.",
    challenge:
      "Managing over 3,200 active SKUs manually created inventory delays and administrative overhead. BTShop needed real-time synchronization with their on-premise Kulcs-Soft accounting software plus automated courier dispatching.",
    solution:
      "Drawing on 16+ years of web development experience, I engineered a two-way ERP bridge, integrated MPL and Foxpost APIs for one-click fulfillment, built a dedicated custom SEO plugin tailored to their catalog taxonomy, and connected GA4 plus Google Merchant feeds.",
    deliverables: [
      "Bidirectional Kulcs-Soft ERP stock & order bridge",
      "Custom-built WordPress technical SEO plugin",
      "MPL & Foxpost shipping API integration",
      "Dynamic daily Google Merchant Center XML feed",
      "GA4 & Search Console conversion tracking",
    ],
    metrics: [
      { label: "Active Catalog", value: "3,200+ SKUs" },
      { label: "Admin Effort", value: "Zero Manual Entry" },
      { label: "API Bridges", value: "3 Logistics & Feed APIs" },
      { label: "SEO Engine", value: "1 Custom WP Plugin" },
    ],
    faq: [
      {
        question: "Why build a custom SEO plugin instead of off-the-shelf tools?",
        answer:
          "With 3,200+ products, bloated generic plugins slow down queries. My custom plugin targets canonical rules, category metadata, and product schema with minimal overhead.",
      },
      {
        question: "Does Kulcs-Soft sync handle both prices and orders?",
        answer:
          "Yes — stock levels and pricing export automatically to WooCommerce while incoming customer orders sync cleanly back into accounting.",
      },
    ],
  },
  "classi-co": {
    slug: "classi-co",
    title: "Classi-Co Kft. — Construction Brand & WordPress Platform",
    subtitle:
      "From-scratch digital transformation for a paving and concrete contractor with bespoke WordPress UX, copywriting, and SEO.",
    category: "Corporate Website & Local SEO",
    seoTitle: "Classi-Co Kft. WordPress & SEO Case Study | WebDude",
    seoDescription:
      "Complete digital brand launch for Classi-Co Kft.: bespoke WordPress site, sales copywriting, technical SEO, Google Business Profile, and GA4 analytics.",
    directAnswer:
      "I built Classi-Co Kft.'s digital presence from the ground up with a brand identity, custom WordPress template, conversion-focused service copywriting, Google Business Profile optimization, and technical SEO — generating steady B2B and residential paving inquiries.",
    challenge:
      "As a traditional paving and concrete contractor, Classi-Co needed an authoritative online presence capable of building instant trust and generating both residential and commercial quote requests.",
    solution:
      "I designed a cohesive visual identity, coded a fast custom WordPress theme, wrote clear sales copy across all service pages, structured local SEO signals, and integrated Google Search Console and GA4.",
    deliverables: [
      "Custom corporate brand identity & logo design",
      "Bespoke WordPress corporate website",
      "Conversion-focused service copywriting",
      "Technical & local SEO optimization",
      "Google Business Profile & GA4 setup",
    ],
    metrics: [
      { label: "Platform", value: "Custom WordPress" },
      { label: "Search Visibility", value: "Local SEO Dominance" },
      { label: "Copywriting", value: "100% Bespoke" },
      { label: "Brand System", value: "Online + Print" },
    ],
    faq: [
      {
        question:
          "What makes a construction contractor website convert visitors into leads?",
        answer:
          "Real project visuals, crystal-clear service breakdowns, fast mobile performance, and frictionless quote forms backed by an optimized Google Business Profile.",
      },
    ],
  },
  "rimai-utepito-kft-teljes-koru-digitalis-es-vizualis-arculatepites": {
    slug: "rimai-utepito-kft-teljes-koru-digitalis-es-vizualis-arculatepites",
    title: "Rimai Road Construction — 360° Visual Identity & Web Platform",
    subtitle:
      "Turnkey infrastructure, corporate branding, print materials, bespoke WordPress development, and marketing copy from zero.",
    category: "Full Brand Identity & Web Development",
    seoTitle: "Rimai Construction 360 Branding & Web Study | WebDude",
    seoDescription:
      "Complete 360-degree brand identity, print collateral, DNS/email setup, bespoke WordPress development, and SEO copywriting for Rimai Útépítő Kft.",
    directAnswer:
      "Entrusted with full creative and technical autonomy by Rimai Útépítő Kft., I delivered a complete 360-degree brand launch from scratch: DNS and email infrastructure, corporate logo and print stationery, custom WordPress site, marketing copy, and Search Console/GA4 tracking — approved without revisions.",
    challenge:
      "Rimai Útépítő Kft. previously had minimal online presence, missing authentic photography, structured service descriptions, and cohesive corporate branding to match their civil engineering scale.",
    solution:
      "I managed every layer end-to-end: DNS and email setup, full logo and print identity, high-impact posters, bespoke WordPress development, organic sales copywriting, and Search Console analytics.",
    deliverables: [
      "DNS, hosting & corporate email configuration",
      "360° visual identity, logo & print collateral",
      "Custom WordPress business website",
      "Conversion-focused copywriting across pages",
      "Google Analytics & Search Console setup",
    ],
    metrics: [
      { label: "Creative Ownership", value: "100% Autonomous" },
      { label: "Deliverables", value: "360° Online + Print" },
      { label: "Client Sign-Off", value: "Zero Revisions" },
      { label: "Foundation", value: "Built From Zero" },
    ],
    faq: [
      {
        question:
          "Can I handle branding, print graphics, and web engineering together?",
        answer:
          "Yes — my 26+ years in graphic design and 16+ years in web development mean visual branding, print materials, and website code stay 100% aligned.",
      },
    ],
  },
  "dr-danyi": {
    slug: "dr-danyi",
    title: "Dr. Danyi Clinic — Dental & Implantology Brand & Web UX",
    subtitle:
      "Empathetic medical brand identity, SEO-ready WordPress platform, and streamlined patient booking experience.",
    category: "Healthcare Branding & UX Design",
    seoTitle: "Dr. Danyi Dental Clinic Brand & Web Case Study | WebDude",
    seoDescription:
      "Modern, empathetic medical identity and SEO-optimized WordPress website with online appointment booking for Dr. Danyi Dental & Implantology Clinic.",
    directAnswer:
      "For Dr. Danyi Dental and Implantology Clinic, I created a calm, authoritative medical brand identity paired with a patient-centered, SEO-optimized WordPress website and online appointment booking — simplifying complex implant treatments for prospective patients.",
    challenge:
      "Dental and implantology clinics must project clinical precision while easing patient anxiety through clear explanations and effortless appointment scheduling.",
    solution:
      "I designed an empathetic visual identity across digital and print touchpoints, wrote patient-friendly treatment guides, and built a fast WordPress site featuring streamlined online booking.",
    deliverables: [
      "Healthcare visual identity & business cards",
      "SEO-optimized WordPress clinic website",
      "Online appointment booking integration",
      "Patient-centric UX & treatment copywriting",
    ],
    metrics: [
      { label: "Brand Tone", value: "Clinical & Empathetic" },
      { label: "Conversion Path", value: "Online Booking" },
      { label: "SEO Structure", value: "Optimized WP Pages" },
      { label: "UX Focus", value: "Patient-First Clarity" },
    ],
    faq: [
      {
        question:
          "How does healthcare web UX improve patient consultation bookings?",
        answer:
          "Clear treatment explanations, reassuring photography, transparent navigation, and prominent online booking buttons eliminate hesitation on mobile and desktop.",
      },
    ],
  },
  "bor-es-garnela": {
    slug: "bor-es-garnela",
    title: "Bor és Garnéla — Gourmet Food Truck Branding & Website",
    subtitle:
      "Distinctive culinary branding, festival booth graphics, printed menus, and a responsive WordPress showcase.",
    category: "Hospitality Branding & Web Design",
    seoTitle: "Bor és Garnéla Food Truck Brand Case Study | WebDude",
    seoDescription:
      "Complete gourmet food truck branding, festival graphics, menu design, and SEO-optimized WordPress site crafted by Balog Norbert (WebDude).",
    directAnswer:
      "To elevate Bor és Garnéla into a recognizable gourmet street-food brand, I crafted a cohesive visual identity spanning vehicle graphics, festival banners, printed menus, promotional collateral, and an SEO-ready responsive WordPress website with menu and inquiry flows.",
    challenge:
      "At crowded food festivals, a culinary brand has only seconds to communicate quality and stand out visually before hungry guests walk past.",
    solution:
      "I built an integrated branding system covering logo, food truck wrap concepts, menus, flags, gift vouchers, and a mobile-first WordPress site optimized for event organizers and foodies.",
    deliverables: [
      "Custom food truck brand identity & logo",
      "Festival banners, flags & voucher design",
      "Print & digital menu layout design",
      "Responsive WordPress site & SEO setup",
    ],
    metrics: [
      { label: "Brand System", value: "Festival-Ready 360°" },
      { label: "Collateral", value: "Menus, Flags, Vouchers" },
      { label: "Web Platform", value: "SEO WordPress Site" },
      { label: "Visual Impact", value: "Instant Recognition" },
    ],
    faq: [
      {
        question:
          "Do food and hospitality brands benefit from combined print and web design?",
        answer:
          "Yes — matching festival signage, menus, social visuals, and web pages makes the brand memorable both on-site and when event organizers search online.",
      },
    ],
  },
  "hu-mago-kft": {
    slug: "hu-mago-kft",
    title: "HU-MAGO Kft. — Industrial Machinery E-Commerce & AI Ad Tool",
    subtitle:
      "Industrial B2B transformation combining WooCommerce, GDPR compliance, offline print branding, and a custom AI ad generator.",
    category: "Industrial E-Commerce & AI Innovation",
    seoTitle: "HU-MAGO Industrial E-Commerce & AI Study | WebDude",
    seoDescription:
      "Digital transformation for HU-MAGO Kft.: WooCommerce B2B store, strategic SEO, GDPR compliance, print branding, and an AI prompt ad generator.",
    directAnswer:
      "For industrial machinery supplier HU-MAGO Kft., I delivered an end-to-end digital ecosystem uniting WooCommerce e-commerce, strategic technical SEO, GDPR compliance, offline magazine/stationery branding, and a bespoke AI prompt advertisement generator.",
    challenge:
      "HU-MAGO Kft. wanted to modernize a traditional industrial machinery business with an integrated online sales channel, compliant data workflows, and faster campaign asset creation.",
    solution:
      "I engineered a scalable WooCommerce platform, structured industrial SEO taxonomy, implemented GDPR controls, designed offline print assets, and built an AI prompt ad-copy workflow.",
    deliverables: [
      "WooCommerce industrial catalog & e-commerce",
      "Technical SEO architecture & GDPR compliance",
      "Custom AI prompt advertisement generator",
      "Magazine layouts & business card print design",
    ],
    metrics: [
      { label: "AI Capability", value: "Custom Ad Generator" },
      { label: "Compliance", value: "GDPR Ready" },
      { label: "Channels", value: "Online + Print Suite" },
      { label: "Architecture", value: "Full B2B Ecosystem" },
    ],
    faq: [
      {
        question:
          "How does an AI prompt generator help an industrial machinery company?",
        answer:
          "It turns technical product specifications into consistent, on-brand social and ad creatives in seconds while keeping messaging accurate.",
      },
    ],
  },
  "go-box-kft": {
    slug: "go-box-kft",
    title: "Go-Box Kft. — Packaging Manufacturer Branding & B2B Webshop",
    subtitle:
      "Industrial brand identity, corporate site, and fast WooCommerce B2B box-ordering store with custom quote forms and SEO/AEO.",
    category: "B2B E-Commerce & Industrial Branding",
    seoTitle: "Go-Box Kft. B2B Webshop & Brand Case Study | WebDude",
    seoDescription:
      "Full transformation for Go-Box Kft. packaging manufacturer: industrial logo, corporate website, WooCommerce B2B store, custom forms, and SEO/AEO.",
    directAnswer:
      "For packaging manufacturer Go-Box Kft., I crafted an industrial brand identity alongside a corporate website and fast WooCommerce B2B webshop featuring custom bulk-order forms, Search Console tracking, and GA4 SEO/AEO optimization for high-intent commercial searches.",
    challenge:
      "Go-Box Kft. needed an authoritative industrial visual identity and an online ordering system tailored to both standard box sizes and bespoke B2B manufacturing inquiries.",
    solution:
      "I redesigned the brand identity from logo to banners, built a fast WordPress corporate + WooCommerce B2B store with tailored quote forms, and configured full Search Console and GA4 SEO/AEO tracking.",
    deliverables: [
      "Industrial logo, brand system & business cards",
      "Corporate showcase website & copywriting",
      "B2B WooCommerce store with custom order forms",
      "SEO/AEO setup with Search Console & GA4",
    ],
    metrics: [
      { label: "Commerce Model", value: "B2B + Custom Orders" },
      { label: "Identity", value: "Industrial Branding" },
      { label: "Visibility", value: "B2B SEO & AEO Ready" },
      { label: "Analytics", value: "GA4 + Search Console" },
    ],
    faq: [
      {
        question:
          "How can a B2B manufacturer sell both standard products and custom runs online?",
        answer:
          "By combining direct WooCommerce SKU ordering for standard dimensions with bespoke specification quote forms embedded right inside product flows.",
      },
    ],
  },
  "marina-homes": {
    slug: "marina-homes",
    title: "Marina Homes — Premium Real Estate Brand & Property Site",
    subtitle:
      "Elevated architectural branding, residential development logo suite, and WordPress showcase website.",
    category: "Real Estate Branding & Web Design",
    seoTitle: "Marina Homes Real Estate Brand Case Study | WebDude",
    seoDescription:
      "Premium real estate brand identity, logo design, outdoor signage graphics, and WordPress residential showcase built for Marina Homes.",
    directAnswer:
      "For Marina Homes residential development, I created a refined real estate logo and architectural branding suite paired with outdoor signage visuals and a responsive WordPress showcase presenting available apartments, galleries, and direct buyer inquiry forms.",
    challenge:
      "New residential developments compete heavily on perceived architectural quality before construction finishes, requiring polished visuals and effortless floorplan browsing.",
    solution:
      "I crafted a timeless real estate brand identity, prepared large-format site signage graphics, and built a clean WordPress showcase highlighting apartment layouts and buyer inquiries.",
    deliverables: [
      "Residential development logo & color system",
      "Large-format outdoor property signage design",
      "WordPress property gallery & inquiry site",
      "Consistent buyer-facing marketing assets",
    ],
    metrics: [
      { label: "Sector", value: "Residential Real Estate" },
      { label: "Brand Craft", value: "Logo + Signage" },
      { label: "Web Platform", value: "WordPress Showcase" },
      { label: "Consistency", value: "Print & Digital Unified" },
    ],
    faq: [
      {
        question: "Why invest in bespoke branding for a residential project?",
        answer:
          "Premium buyers judge build quality by presentation quality; a cohesive identity from site signage to web galleries accelerates pre-sales trust.",
      },
    ],
  },
  chamomprex: {
    slug: "chamomprex",
    title: "Chamomprex — Storefront Window Graphics & Business Stationery",
    subtitle:
      "Print-ready storefront window branding, bespoke business cards, and photorealistic pre-production mockups.",
    category: "Print & Retail Environmental Design",
    seoTitle: "Chamomprex Storefront & Print Design Study | WebDude",
    seoDescription:
      "Bespoke storefront window graphics, corporate business card layout, prepress preparation, and realistic mockups created for Chamomprex.",
    directAnswer:
      "For Chamomprex, I designed cohesive storefront window graphics and matching corporate business cards delivered with complete print-ready CMYK prepress files and photorealistic architectural mockups so the physical result could be verified before manufacturing.",
    challenge:
      "Chamomprex needed physical branding across storefront glass and printed cards that stood out clearly from street level while staying straightforward to produce.",
    solution:
      "I combined my print prepress discipline with clean modern typography to craft storefront decals and stationery, validating proportions via realistic 3D mockups before printing.",
    deliverables: [
      "Bespoke business card typography & layout",
      "Storefront window graphic system",
      "CMYK print-ready prepress files",
      "Photorealistic mockup visualization",
    ],
    metrics: [
      { label: "Print Accuracy", value: "CMYK Prepress Ready" },
      { label: "Validation", value: "Realistic 3D Mockups" },
      { label: "Touchpoints", value: "Storefront + Cards" },
      { label: "Visibility", value: "Street-Level Clarity" },
    ],
    faq: [
      {
        question: "Why prepare realistic mockups prior to storefront printing?",
        answer:
          "Mockups reveal contrast, scale, and glass reflection issues before costly vinyl cutting or offset printing begins.",
      },
    ],
  },
  "dr-nagy-albert": {
    slug: "dr-nagy-albert",
    title:
      "Dr. Nagy Albert — Neurology Practice Branding & Online Payment Platform",
    subtitle:
      "Complete healthcare brand identity, patient website, e-prescription & teleconsultation checkout, and SEO/AEO infrastructure.",
    category: "Healthcare Digital Platform & Branding",
    seoTitle: "Dr. Nagy Albert Neurology Web & Payments Study | WebDude",
    seoDescription:
      "Full healthcare brand identity, bespoke website with online payments for e-prescriptions and teleconsultations, plus Search Console & GA4 SEO.",
    directAnswer:
      "For Dr. Nagy Albert's neurology clinic, I built an authoritative medical brand identity alongside a bespoke clinic website featuring online payment flows for e-prescriptions and remote teleconsultations — backed by print banners, patient-friendly copywriting, and Search Console/GA4 SEO.",
    challenge:
      "A busy specialist medical practice needed seamless digital triage: letting patients book and pay securely online for remote teleconsultations and repeat e-prescriptions while maintaining clinical credibility.",
    solution:
      "I unified visual branding (logo, stationery, banners, social ads) with a secure web platform integrating online payments for e-prescriptions and teleconsultations, complete with SEO/AEO metadata.",
    deliverables: [
      "Medical logo, identity & business stationery",
      "Clinic banners, ads & social creatives",
      "Custom clinic web platform with online checkout",
      "E-prescription & teleconsultation workflow",
      "Search Console & GA4 SEO/AEO tracking",
    ],
    metrics: [
      { label: "Online Flows", value: "E-Rx & Teleconsult" },
      { label: "Checkout", value: "Integrated Web Pay" },
      { label: "Branding", value: "Full Clinic Identity" },
      { label: "Analytics", value: "GA4 + Search Console" },
    ],
    faq: [
      {
        question:
          "How do online payments benefit a specialist medical practice?",
        answer:
          "Automating payment and booking for teleconsultations and e-prescriptions saves front-desk phone hours and gives patients instant 24/7 clarity.",
      },
    ],
  },
  "lengyel-helga-eskuvodekoracio": {
    slug: "lengyel-helga-eskuvodekoracio",
    title: "Lengyel Helga — Luxury Floral & Wedding Decor Brand + Webshop",
    subtitle:
      "Elegant visual identity, print and campaign assets, and a structured WooCommerce catalog optimized for organic discovery.",
    category: "Luxury Event Branding & E-Commerce",
    seoTitle: "Lengyel Helga Wedding Decor Brand & Webshop | WebDude",
    seoDescription:
      "Complete floral and wedding decor brand identity, stationery, campaign banners, WooCommerce webshop, and SEO/AEO setup for Lengyel Helga.",
    directAnswer:
      "For wedding decorator and floral designer Lengyel Helga, I designed an evocative, romantic brand identity spanning logo, print stationery, event banners, and a structured WooCommerce webshop — backed by Search Console and GA4 SEO/AEO optimization.",
    challenge:
      "In the luxury wedding industry, couples choose vendors based on emotional resonance and visual trust. Helga needed an elevated brand and webshop matching her bespoke floral craftsmanship.",
    solution:
      "I created an elegant typographic logo, unified print and Facebook campaign visuals, structured product categories inside WooCommerce, and configured SEO/AEO foundations.",
    deliverables: [
      "Bespoke floral logo, stationery & banners",
      "Facebook & seasonal campaign creatives",
      "WooCommerce online catalog & ordering",
      "SEO/AEO & Search Console integration",
    ],
    metrics: [
      { label: "Storefront", value: "Structured WooCommerce" },
      { label: "Brand Suite", value: "Print + Digital Ads" },
      { label: "Discovery", value: "SEO & AEO Tuned" },
      { label: "Experience", value: "High-Touch Visual UX" },
    ],
    faq: [
      {
        question:
          "How do visual storytelling and SEO work together for creative studios?",
        answer:
          "Fast WebP imagery preserves delicate floral color fidelity while structured product categories and descriptive copy capture couples searching by style and season.",
      },
    ],
  },
  "ai-prompt-hu": {
    slug: "ai-prompt-hu",
    title: "AI-Prompt.hu — Proprietary AI Prompt Engineering SaaS Platform",
    subtitle:
      "Full-stack Next.js, TypeScript, and Firebase AI SaaS integrating OpenAI, Anthropic, and Google AI with structured outputs.",
    category: "AI Engineering & SaaS Architecture",
    seoTitle: "AI-Prompt.hu Next.js AI SaaS Case Study | WebDude",
    seoDescription:
      "Proprietary Next.js, TypeScript, and Firebase SaaS platform supporting OpenAI, Anthropic, Google AI, structured JSON/CSV/XML outputs, and templates.",
    directAnswer:
      "I architected and built AI-Prompt.hu from scratch as a proprietary SaaS platform on Next.js, TypeScript, and Firebase — uniting OpenAI, Anthropic, and Google AI APIs with structured JSON/CSV/XML schema outputs, reusable prompt templates, and live user telemetry.",
    challenge:
      "Most businesses struggle to get deterministic, structured outputs from large language models without deep prompt engineering expertise.",
    solution:
      "I engineered a modern TypeScript and Next.js application backed by Firebase authentication and Firestore, integrating multi-provider LLM APIs, validation pipelines, structured JSON/CSV/XML formatters, and a responsive template dashboard.",
    deliverables: [
      "Next.js, TypeScript & Firebase SaaS core",
      "OpenAI, Anthropic & Google AI API integration",
      "Structured JSON / CSV / XML output engine",
      "Template management & validation dashboard",
    ],
    metrics: [
      { label: "AI Providers", value: "OpenAI · Claude · Gemini" },
      { label: "Output Modes", value: "JSON · CSV · XML" },
      { label: "Stack", value: "Next.js + TypeScript" },
      { label: "Backend", value: "Firebase Auth & DB" },
    ],
    faq: [
      {
        question:
          "Why support multiple LLM providers inside one custom platform?",
        answer:
          "Routing tasks across OpenAI, Anthropic, and Google AI prevents vendor lock-in and lets every workflow use the optimal model for accuracy and latency.",
      },
    ],
  },
};

export function getEnCaseStudy(slug: string): EnCaseStudyEntry | null {
  return EN_CASE_STUDIES[slug] ?? null;
}
