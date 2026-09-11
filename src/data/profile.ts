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
  title: "Founder & AI Engineer | Technology Entrepreneur",
  subtitle: "Intelligent Systems · GenAI · Automation · Ventures",
  primaryRole: "Founder & AI Engineer",
  secondaryRole: "Technology Entrepreneur",
  focusAreas: [
    "Artificial Intelligence & GenAI",
    "Intelligent Systems & Architecture",
    "Python Engineering & Automation",
    "Scalable Tech Ventures",
    "Applied AI & Developer Education",
    "Community Building (OrigoHOST)",
  ],
  narrative:
    "Founder, AI Engineer, and Technology Entrepreneur building intelligent systems, AI-powered solutions, and technology-driven ventures. Turning complex problems into practical products and scalable solutions that create measurable value.",
  bio:
    "My work sits at the intersection of Artificial Intelligence, Generative AI, Python engineering, automation, data, and entrepreneurship. Beyond building technology, I work on creating developer communities and enabling students and emerging engineers to gain practical exposure to modern technologies. As the Founder & President of OrigoHOST Tech Community, I lead institutional engagements, technical initiatives, and community growth focused on applied AI and developer education. I believe technology is most powerful when it moves beyond experimentation and becomes something people can actually use, scale, and build upon.",
  location: "India · Global / Remote",
  email: "imtarunchaudharyy@gmail.com",
  socials: {
    github: "https://github.com/haytarunkumar",
    linkedin: "https://linkedin.com/in/haytarunkumar",
    x: "https://x.com/heytarunkumarr",
    medium: "https://medium.com/@haytarunkumar",
    instagram: "https://instagram.com/heytarunkumar",
    linktree: "https://linktr.ee/heytarunkumar",
  },
  resumeUrl: "/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf",

  // Hero Defaults
  heroTitle: "Tarun Kumar",
  heroRoles: [
    "FOUNDER & AI ENGINEER",
    "TECHNOLOGY ENTREPRENEUR",
    "INTELLIGENT SYSTEMS ARCHITECT",
    "FOUNDER @ ORIGOHOST",
    "GENERATIVE AI & AUTOMATION",
    "PYTHON SYSTEMS ARCHITECT",
  ],
  heroSubtitle: "Building practical intelligence & scalable systems.",
  heroTagline: "APPLIED AI · GENAI · PYTHON · AUTOMATION · VENTURES · ORIGOHOST",
  heroBadgeText: "FOUNDER & AI SYSTEMS ENGINEER",
  heroVentureBadge: "PRESIDENT @ ORIGOHOST",
  heroPrimaryCtaText: "EXPLORE WORK",
  heroPrimaryCtaLink: "#projects",
  heroSecondaryCtaText: "DOWNLOAD RESUME",
  heroSecondaryCtaLink: "/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf",
  heroVideoUrl: "/videos/hero.mp4",
  heroTerminal: {
    title: "tarun@ai-venture ~ bash",
    whoami: "tarun-kumar [Founder & AI Engineer]",
    venture: "OrigoHOST Tech Community",
    ventureQuote: "WHERE BUILDERS BECOME INNOVATORS",
    status: "ACTIVE · BUILDING VENTURES",
    mission: "[TURNING_PROBLEMS_INTO_SCALABLE_PRODUCTS]",
    stack: [
      "applied-ai [LLMs / Intelligent Agents / XAI]",
      "python-engineering [FastAPI / Microservices]",
      "data-systems [ML Pipelines / Tabular Risk Scoring]",
      "devops-track [LEARNING & EXPLORING]",
    ],
    avatarUrl: "/images/tarun-executive.jpg",
  },

  // About Defaults
  aboutEyebrow: "01 / MISSION & PHILOSOPHY",
  aboutHeadline: "Engineering intelligence. Scaling ventures.",
  aboutStoryParagraphs: [
    "I am Tarun Kumar, a Founder, AI Engineer, and Technology Entrepreneur focused on building intelligent systems, AI-powered solutions, and technology-driven ventures.",
    "My work sits at the intersection of Artificial Intelligence, Generative AI, Python engineering, automation, data, and entrepreneurship. I enjoy turning complex problems into practical products and scalable solutions that create measurable value.",
  ],
  aboutQuote: "I believe technology is most powerful when it moves beyond experimentation and becomes something people can actually use, scale, and build upon.",
  competencyPillars: [
    {
      number: "01",
      title: "AI & GENAI",
      subtitle: "LLMs, Intelligent Agents & Applied AI Systems",
    },
    {
      number: "02",
      title: "PYTHON & AUTOMATION",
      subtitle: "Scalable Microservices, APIs & Workflows",
    },
    {
      number: "03",
      title: "VENTURES & COMMUNITY",
      subtitle: "OrigoHOST Founder, Developer Education & Growth",
    },
  ],
  spotlightCard: {
    photoUrl: "/images/tarun-headshot.jpg",
    name: "Tarun Kumar",
    role: "Founder & AI Systems Engineer",
    leadership: "President @ OrigoHOST",
    verifiedStatus: "VERIFIED",
  },
  origohostCard: {
    logoUrl: "/images/origohost/origohost-icon.png",
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
      { title: "Applied AI & GenAI Architectures", status: "✓ ACTIVE", statusType: "active" },
      { title: "Python Systems & Automation", status: "✓ MASTERED", statusType: "mastered" },
      { title: "Community & Builder Ecosystems", status: "✓ LEADING", statusType: "leading" },
      { title: "Scalable AI Ventures & Products", status: "⚡ SCALING", statusType: "scaling" },
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
    photoUrl: "/images/tarun-about.jpg",
    title: "DIRECT LINE //",
    name: "Tarun Kumar",
    note: "Direct response for AI engineering & ventures",
    status: "AVAILABLE",
  },
  contactFormSubmitUrl: "https://formsubmit.co/ajax/tarunsinghchaudharyy@gmail.com",
  contactSubmitButtonText: "DISPATCH MESSAGE ↗",

  // Brand, Header & Footer Defaults
  brandRole: "FOUNDER · AI & TECH",
  monogramUrl: "/images/brand/tarun-monogram.png",
  connectCtaText: "LET'S CONNECT",
  connectCtaLink: "/contact",
  footerSubtitle: "Founder | AI & Technology • OrigoHOST Community",
  footerCopyright: `© ${new Date().getFullYear()} Tarun Kumar. All rights reserved.`,
};

