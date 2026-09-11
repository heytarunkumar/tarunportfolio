export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  organization: string;
  location?: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  isVerified: boolean;
  visible?: boolean;
  logoUrl?: string;
  tagline?: string;
  link?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "01",
    year: "2024 - PRESENT",
    role: "Founder & President",
    organization: "OrigoHOST Tech Community",
    location: "India",
    tagline: "WHERE BUILDERS BECOME INNOVATORS",
    logoUrl: "/images/origohost/origohost-icon.webp",
    description:
      "Leading institutional engagements, technical initiatives, and developer community growth focused on applied AI, intelligent systems, and modern software engineering education.",
    responsibilities: [
      "Leading institutional engagements, technical bootcamps, and developer initiatives on applied AI and modern engineering stacks.",
      "Enabling students and emerging engineers to gain practical hands-on exposure to intelligent systems and production-grade technologies.",
      "Spearheading open-source initiatives, hackathons, and collaborative engineering projects for student builders.",
      "Cultivating an ecosystem where builders transition into impactful innovators and entrepreneurs.",
    ],
    technologies: ["Applied AI", "Generative AI", "Community Leadership", "Python", "Technical Mentorship", "System Architecture"],
    isVerified: true,
  },
  {
    id: "02",
    year: "2024 - PRESENT",
    role: "AI Engineer & Founder (Applied AI & Systems)",
    organization: "Independent Ventures & Intelligent Systems",
    location: "India · Remote",
    description:
      "Architecting AI-powered solutions, Generative AI applications, backend REST microservices, and automation pipelines turning complex problems into scalable products.",
    responsibilities: [
      "Designing intelligent systems and GenAI integrations combining LLM workflows with backend services.",
      "Developing scalable Python backend architectures, automated data pipelines, and microservices.",
      "Prototyping practical AI products with measurable business impact and user-centric value.",
    ],
    technologies: ["Artificial Intelligence", "Generative AI", "Python", "LLMs", "Docker", "REST APIs", "Cloud & Automation"],
    isVerified: true,
  },
  {
    id: "03",
    year: "2024",
    role: "ML & XAI Research Lead (AI-HealthGuard Project)",
    organization: "Academic Research Collaboration",
    location: "India",
    description:
      "Collaborated on machine learning risk prediction research utilizing explainable AI techniques (SHAP/LIME) for tabular health dataset analysis.",
    responsibilities: [
      "Preprocessed dataset attributes and trained ensemble classification models.",
      "Integrated SHAP explainability pipelines to evaluate feature contributions and model transparency.",
      "Drafted research paper documentation alongside co-authors Sakshi Rajput and Prashant Prajapati.",
    ],
    technologies: ["Python", "Scikit-learn", "SHAP", "Pandas", "Streamlit", "Explainable AI"],
    isVerified: true,
  },
  {
    id: "04",
    year: "2022 - 2026",
    role: "B.Tech in Computer Science & Engineering (AI & ML)",
    organization: "G. L. Bajaj Group of Institutions, Mathura · AKTU Lucknow",
    location: "Mathura / Lucknow, India",
    description:
      "Specialized in Artificial Intelligence, Machine Learning, Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, and Cloud Software Foundations.",
    responsibilities: [
      "Pursuing B.Tech in Computer Science & Engineering with specialization in AI & Machine Learning.",
      "G. L. Bajaj Group of Institutions, Mathura (College) affiliated with Dr. A. P. J. Abdul Kalam Technical University (AKTU), Lucknow.",
      "Rigorous hands-on curriculum: AI/ML algorithms, Data Structures, Algorithms, OOP, Database Systems, and Cloud Architectures.",
      "Applying theoretical computer science foundations to real-world software engineering, community building, and venture systems.",
    ],
    technologies: [
      "Artificial Intelligence",
      "Machine Learning",
      "Python",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems (DBMS)",
      "Operating Systems",
      "Cloud Foundations",
    ],
    isVerified: true,
  },
];

