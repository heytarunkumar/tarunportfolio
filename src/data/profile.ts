export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface CompetencyPillar {
  number: string;
  title: string;
  subtitle: string;
}

export interface SpotlightCardConfig {
  photoUrl: string;
  name: string;
  role: string;
  leadership: string;
  verifiedStatus: string;
}

export interface OrigoHostCardConfig {
  logoUrl: string;
  tag: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  ecosystem: string;
}

export interface ProgressionLogItem {
  title: string;
  status: string;
  statusType?: 'active' | 'mastered' | 'leading' | 'scaling';
}

export interface ProgressionLogConfig {
  logTitle: string;
  version: string;
  items: ProgressionLogItem[];
}

export interface HeroTerminalConfig {
  title: string;
  whoami: string;
  venture: string;
  ventureQuote: string;
  status: string;
  mission: string;
  stack: string[];
  avatarUrl?: string;
}

export interface DirectBadgeConfig {
  photoUrl: string;
  title: string;
  name: string;
  note: string;
  status: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  primaryRole: string;
  secondaryRole: string;
  focusAreas: string[];
  narrative: string;
  bio: string;
  location: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    x: string;
    medium: string;
    instagram?: string;
    linktree?: string;
  };
  resumeUrl: string;

  // Hero Section Customizations
  heroTitle?: string;
  heroRoles?: string[];
  heroSubtitle?: string;
  heroTagline?: string;
  heroBadgeText?: string;
  heroVentureBadge?: string;
  heroPrimaryCtaText?: string;
  heroPrimaryCtaLink?: string;
  heroSecondaryCtaText?: string;
  heroSecondaryCtaLink?: string;
  heroVideoUrl?: string;
  heroTerminal?: HeroTerminalConfig;

  // About Section Customizations
  aboutEyebrow?: string;
  aboutHeadline?: string;
  aboutStoryParagraphs?: string[];
  aboutQuote?: string;
  competencyPillars?: CompetencyPillar[];
  spotlightCard?: SpotlightCardConfig;
  origohostCard?: OrigoHostCardConfig;
  progressionLog?: ProgressionLogConfig;

  // Resume Section Customizations
  resumeBadge?: string;
  resumeHeadline?: string;
  resumeDescription?: string;
  resumeViewCta?: string;
  resumeDownloadCta?: string;

  // Contact Section Customizations
  contactEyebrow?: string;
  contactHeadline?: string;
  contactDescription?: string;
  directBadge?: DirectBadgeConfig;
  contactFormSubmitUrl?: string;
  contactSubmitButtonText?: string;

  // Brand, Header & Footer Customizations
  brandRole?: string;
  monogramUrl?: string;
  connectCtaText?: string;
  connectCtaLink?: string;
  footerSubtitle?: string;
  footerCopyright?: string;
}

export const profileData: Profile = {
  name: "Tarun Kumar",
  title: "Python Developer | AI Engineer | Researcher | Author | Founder",
  subtitle: "Intelligent Systems · GenAI · Python · Research · Ventures",
  primaryRole: "Python Developer & AI Engineer",
  secondaryRole: "Researcher, Author & Founder",
  focusAreas: [
    "Artificial Intelligence & GenAI",
    "Python Engineering & Systems Architecture",
    "Machine Learning & Explainable AI (XAI) Research",
    "Technical Writing & Authorship",
    "Scalable Tech Ventures",
    "Community Leadership (OrigoHOST)",
  ],
  narrative:
    "Python Developer, AI Engineer, Researcher, Author, and Founder building practical intelligence, Generative AI architectures, and scalable technology ventures. Turning complex problems into production-grade systems and developer-centric products.",
  bio:
    "My work sits at the intersection of Python engineering, Artificial Intelligence, Generative AI, machine learning research, and entrepreneurship. Beyond engineering software, I am an author of technical guides and founder of developer ecosystems. As the Founder & President of OrigoHOST Tech Community (origohost.in), I lead institutional engagements, technical bootcamps, and developer initiatives focused on applied AI and engineering education. I believe technology is most powerful when it moves beyond experimentation and becomes something people can actually use, scale, and build upon.",
  location: "India · Global / Remote",
  email: "tarunsinghchaudharyy@gmail.com",
  socials: {
    github: "https://github.com/heytarunkumar",
    linkedin: "https://www.linkedin.com/in/heytarunkumar/",
    instagram: "https://www.instagram.com/heytarunkumar/",
    medium: "https://medium.com/@heytarunkumar/",
    x: "https://x.com/heytarunkumarr",
    linktree: "https://linktr.ee/heytarunkumar",
  },
  resumeUrl: "/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf",

  // Hero Defaults
  heroTitle: "Tarun Kumar",
  heroRoles: [
    "PYTHON DEVELOPER",
    "AI SYSTEMS ENGINEER",
    "RESEARCHER & AUTHOR",
    "FOUNDER @ ORIGOHOST",
    "GENERATIVE AI ARCHITECT",
    "TECHNOLOGY ENTREPRENEUR",
  ],
  heroSubtitle: "Building practical intelligence & scalable systems.",
  heroTagline: "PYTHON DEVELOPER · AI ENGINEER · RESEARCHER · AUTHOR · FOUNDER · ORIGOHOST",
  heroBadgeText: "PYTHON DEVELOPER & AI ENGINEER",
  heroVentureBadge: "PRESIDENT @ ORIGOHOST",
  heroPrimaryCtaText: "EXPLORE WORK",
  heroPrimaryCtaLink: "#projects",
  heroSecondaryCtaText: "OFFICIAL LINKS",
  heroSecondaryCtaLink: "/links",
  heroVideoUrl: "/videos/hero.mp4",
  heroTerminal: {
    title: "tarun@heytarunkumar ~ bash",
    whoami: "tarun-kumar [Python Dev · AI Engineer · Founder]",
    venture: "OrigoHOST Tech Community (origohost.in)",
    ventureQuote: "WHERE BUILDERS BECOME INNOVATORS",
    status: "ACTIVE · BUILDING INTELLIGENT SYSTEMS",
    mission: "[TURNING_PROBLEMS_INTO_SCALABLE_PRODUCTS]",
    stack: [
      "applied-ai [LLMs / GenAI / Explainable AI (XAI)]",
      "python-engineering [FastAPI / Flask / Microservices]",
      "research-track [ML Benchmarks / Tabular Risk Scoring]",
      "authorship [Technical Guides / Open Source / Community]",
    ],
    avatarUrl: "/images/tarun-executive.webp",
  },

  // About Defaults
  aboutEyebrow: "01 / IDENTITY & PHILOSOPHY",
  aboutHeadline: "Engineering intelligence. Scaling ventures.",
  aboutStoryParagraphs: [
    "I am Tarun Kumar (known across platforms as @heytarunkumar) — a Python Developer, AI Engineer, Researcher, Author, and Founder building practical intelligence, Generative AI architectures, and scalable technology ventures.",
    "My work sits at the intersection of Artificial Intelligence, Generative AI, Python systems engineering, automated workflows, and empirical research. As the Founder & President of OrigoHOST Tech Community (https://origohost.in), I lead technical initiatives, builder hackathons, and community growth focused on applied AI and developer education.",
  ],
  aboutQuote: "I believe technology is most powerful when it moves beyond experimentation and becomes something people can actually use, scale, and build upon.",
  competencyPillars: [
    {
      number: "01",
      title: "PYTHON & AI SYSTEMS",
      subtitle: "LLMs, GenAI Agents, Microservices & Automated Pipelines",
    },
    {
      number: "02",
      title: "RESEARCH & AUTHORSHIP",
      subtitle: "Machine Learning Papers, XAI Benchmarks & Technical Guides",
    },
    {
      number: "03",
      title: "ORIGOHOST & VENTURES",
      subtitle: "Community Ecosystems, Developer Education & Startup Initiatives",
    },
  ],
  spotlightCard: {
    photoUrl: "/images/tarun-headshot.webp",
    name: "Tarun Kumar",
    role: "Python Developer & AI Engineer",
    leadership: "President @ OrigoHOST",
    verifiedStatus: "VERIFIED",
  },
  origohostCard: {
    logoUrl: "/images/origohost/origohost-icon.webp",
    tag: "VENTURE & COMMUNITY",
    title: "OrigoHOST Tech Community",
    tagline: "WHERE BUILDERS BECOME INNOVATORS",
    description: "As Founder & President, leading institutional engagements, technical initiatives, and community growth focused on applied AI and practical developer education.",
    role: "ROLE: FOUNDER & PRESIDENT",
    ecosystem: "APPLIED AI ECOSYSTEM",
  },
  progressionLog: {
    logTitle: "VENTURE_&_TECH_STACK.LOG",
    version: "v2026.AI",
    items: [
      { title: "Python Systems & API Architecture", status: "✓ MASTERED", statusType: "mastered" },
      { title: "Applied AI & GenAI Architectures", status: "✓ ACTIVE", statusType: "active" },
      { title: "Machine Learning & XAI Research", status: "✓ PUBLISHING", statusType: "active" },
      { title: "OrigoHOST Builder Ecosystem", status: "✓ LEADING", statusType: "leading" },
    ],
  },

  // Resume Defaults
  resumeBadge: "VERIFIED CREDENTIALS & CURRICULUM VITAE",
  resumeHeadline: "Looking for the complete technical profile?",
  resumeDescription: "Download the official engineering resume to review production software architectures, machine learning research publications, OrigoHOST community metrics, and academic coursework.",
  resumeViewCta: "VIEW RESUME",
  resumeDownloadCta: "DOWNLOAD ATS PDF",

  // Contact Defaults
  contactEyebrow: "08 / INITIATE CONTACT",
  contactHeadline: "Let's build meaningful intelligence.",
  contactDescription: "Whether you want to collaborate on AI-driven systems, Python engineering architectures, OrigoHOST community initiatives, or discuss startup ventures — direct messages are welcome.",
  directBadge: {
    photoUrl: "/images/tarun-about.webp",
    title: "DIRECT LINE //",
    name: "Tarun Kumar",
    note: "Direct response for AI engineering & ventures",
    status: "AVAILABLE",
  },
  contactFormSubmitUrl: "https://formsubmit.co/ajax/tarunsinghchaudharyy@gmail.com",
  contactSubmitButtonText: "DISPATCH MESSAGE ↗",

  // Brand, Header & Footer Defaults
  brandRole: "FOUNDER · AI & TECH",
  monogramUrl: "/images/brand/tarun-monogram.webp",
  connectCtaText: "LET'S CONNECT",
  connectCtaLink: "/contact",
  footerSubtitle: "Founder | AI & Technology • OrigoHOST Community",
  footerCopyright: `© ${new Date().getFullYear()} Tarun Kumar. All rights reserved.`,
};

