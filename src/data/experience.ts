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
}

export const experienceData: ExperienceItem[] = [
  {
    id: "01",
    year: "2024 - PRESENT",
    role: "Python Backend & Cloud Systems Exploration",
    organization: "Independent Software Projects & Open Source",
    location: "India",
    description:
      "Architecting backend REST microservices, automated python tools, Docker container workflows, and cloud automation scripts.",
    responsibilities: [
      "Designing REST APIs and modular Python software architectures.",
      "Containerizing services with multi-stage Docker builds and automated CI/CD checks.",
      "Developing machine learning server prototypes and tabular prediction systems.",
    ],
    technologies: ["Python", "Flask", "Docker", "Linux", "REST APIs", "AWS", "Git"],
    isVerified: true,
  },
  {
    id: "02",
    year: "2024",
    role: "ML & XAI Research Lead (AI-HealthGuard Project)",
    organization: "Academic Research Collaboration",
    location: "India",
    description:
      "Collaborated on machine learning risk prediction research utilizing explainable AI techniques (SHAP/LIME) for tabular health dataset analysis.",
    responsibilities: [
      "Preprocessed dataset attributes and trained ensemble classification models.",
      "Integrated SHAP explainability pipelines to evaluate feature contributions.",
      "Drafted research paper documentation alongside co-authors Sakshi Rajput and Prashant Prajapati.",
    ],
    technologies: ["Python", "Scikit-learn", "SHAP", "Pandas", "Streamlit"],
    isVerified: true,
  },
  {
    id: "03",
    year: "[VERIFY DATES — PLACEHOLDER]",
    role: "Software Engineering Intern / Trainee [PLACEHOLDER]",
    organization: "[ORGANIZATION NAME — VERIFY BEFORE PUBLISHING]",
    location: "India",
    description:
      "Hands-on software development training focused on backend engineering, database schemas, and modern web software practices.",
    responsibilities: [
      "Assisted in backend API testing, bug resolution, and documentation.",
      "Participated in database query optimization and clean code code-reviews.",
    ],
    technologies: ["Python", "SQL", "Git", "REST APIs"],
    isVerified: false,
  },
  {
    id: "04",
    year: "2022 - 2026",
    role: "B.Tech in Computer Science & Engineering (AI & ML)",
    organization: "[UNIVERSITY / COLLEGE NAME — VERIFY BEFORE PUBLISHING]",
    location: "India",
    description:
      "Specialized in Artificial Intelligence, Machine Learning, Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, and Cloud Software Foundations.",
    responsibilities: [
      "Completed specialized coursework in AI/ML algorithms, Data Structures, and System Architecture.",
      "Developed practical software projects in Python, SQL, REST APIs, and Machine Learning models.",
    ],
    technologies: ["Python", "Machine Learning", "C++", "SQL", "DSA", "OOP", "DBMS", "OS"],
    isVerified: true,
  },
];
