export interface SkillItem {
  name: string;
  category: 'core' | 'building' | 'applied';
  description?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  badge: string;
  statusText: string;
  description: string;
  skills: SkillItem[];
  colSpan: string;
}

export const skillsData: SkillGroup[] = [
  {
    id: "python-backend",
    title: "PYTHON & BACKEND",
    badge: "CORE STACK",
    statusText: "PRODUCTION READY",
    description:
      "Core foundation in clean object-oriented Python, data structures, RESTful API design, database schemas, automated testing, and backend application architecture.",
    skills: [
      { name: "Python", category: "core" },
      { name: "OOP", category: "core" },
      { name: "DSA", category: "core" },
      { name: "Flask", category: "core" },
      { name: "REST APIs", category: "core" },
      { name: "SQL", category: "core" },
      { name: "MySQL", category: "core" },
      { name: "Debugging", category: "core" },
      { name: "Software Testing", category: "core" },
    ],
    colSpan: "lg:col-span-7",
  },
  {
    id: "cloud-devops",
    title: "CLOUD & DEVOPS",
    badge: "CURRENTLY BUILDING",
    statusText: "ACTIVE LEARNING",
    description:
      "Actively developing hands-on competence in Linux systems, Docker containerization, AWS cloud environments, GitHub Actions CI/CD pipelines, and infrastructure automation.",
    skills: [
      { name: "Linux", category: "building" },
      { name: "Docker", category: "building" },
      { name: "AWS Fundamentals", category: "building" },
      { name: "CI/CD Pipelines", category: "building" },
      { name: "GitHub Actions", category: "building" },
      { name: "Terraform", category: "building" },
      { name: "Kubernetes", category: "building" },
      { name: "IaC", category: "building" },
      { name: "Monitoring", category: "building" },
    ],
    colSpan: "lg:col-span-5",
  },
  {
    id: "ai-data",
    title: "AI & DATA SCIENCE",
    badge: "INTELLIGENCE",
    statusText: "COMPLEMENTARY",
    description:
      "Leveraging Machine Learning algorithms, tabular data processing, predictive modeling, Generative AI APIs, and prompt engineering for intelligent automation.",
    skills: [
      { name: "Machine Learning", category: "core" },
      { name: "Scikit-learn", category: "core" },
      { name: "TensorFlow", category: "core" },
      { name: "Generative AI", category: "core" },
      { name: "Prompt Engineering", category: "core" },
      { name: "Pandas", category: "core" },
      { name: "NumPy", category: "core" },
    ],
    colSpan: "lg:col-span-5",
  },
  {
    id: "tools-workflow",
    title: "DEVELOPER TOOLS",
    badge: "WORKFLOW",
    statusText: "PRACTICAL",
    description:
      "Modern development environment tooling, version control, API client integration, rapid UI prototyping, and collaborative software engineering workflows.",
    skills: [
      { name: "Git", category: "core" },
      { name: "GitHub", category: "core" },
      { name: "Streamlit", category: "core" },
      { name: "API Integration", category: "core" },
      { name: "VS Code / Linux CLI", category: "core" },
    ],
    colSpan: "lg:col-span-7",
  },
];
