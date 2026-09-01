export type SkillCategory = 'core' | 'building' | 'applied';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  status: string;
  description: string;
  relatedProjects: string[]; // Project slugs or titles
  iconName?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  category: SkillCategory;
  badge: string;
  statusText: string;
  description: string;
  skills: SkillItem[];
  colSpan: string;
}

export const skillsData: SkillGroup[] = [
  {
    id: "core-stack",
    title: "PYTHON & BACKEND",
    category: "core",
    badge: "CORE STACK",
    statusText: "PRODUCTION READY",
    description:
      "Core foundation in clean object-oriented Python, data structures, RESTful API design, database schemas, automated testing, and backend application architecture.",
    colSpan: "lg:col-span-7",
    skills: [
      {
        id: "python",
        name: "Python",
        category: "core",
        status: "Core Primary Language",
        description: "OOP, data structures, backend algorithms, microservices, data processing, and scripting.",
        relatedProjects: ["api-gateway-microservices", "docker-flask-cicd-pipeline", "predictive-analytics-streamlit", "ai-healthguard-research"],
      },
      {
        id: "flask",
        name: "Flask",
        category: "core",
        status: "Verified Microframework",
        description: "Lightweight REST API endpoints, middleware routing, and microservice architectures.",
        relatedProjects: ["api-gateway-microservices", "docker-flask-cicd-pipeline"],
      },
      {
        id: "rest-apis",
        name: "REST APIs",
        category: "core",
        status: "Production Standard",
        description: "JSON payloads, HTTP verbs, status codes, token auth, rate limiting, and CORS.",
        relatedProjects: ["api-gateway-microservices", "docker-flask-cicd-pipeline", "predictive-analytics-streamlit"],
      },
      {
        id: "sql",
        name: "SQL & MySQL",
        category: "core",
        status: "Relational Storage",
        description: "Relational database queries, schema design, indexes, and transactional integrity.",
        relatedProjects: ["api-gateway-microservices"],
      },
      {
        id: "oop-dsa",
        name: "OOP & DSA",
        category: "core",
        status: "Computer Science Foundation",
        description: "Object-oriented design patterns, algorithmic complexity (Big-O), search, and sorting.",
        relatedProjects: ["api-gateway-microservices", "predictive-analytics-streamlit"],
      },
      {
        id: "testing",
        name: "Testing & Debugging",
        category: "core",
        status: "Code Quality Standard",
        description: "Unit testing, exception handling, log analysis, and defensive programming.",
        relatedProjects: ["docker-flask-cicd-pipeline", "api-gateway-microservices"],
      },
    ],
  },
  {
    id: "currently-building",
    title: "CLOUD & DEVOPS",
    category: "building",
    badge: "CURRENTLY BUILDING",
    statusText: "ACTIVE LEARNING TRACK",
    description:
      "Actively developing hands-on competence in Linux sysadmin tools, Docker containerization, AWS cloud environments, GitHub Actions CI/CD pipelines, and infrastructure automation.",
    colSpan: "lg:col-span-5",
    skills: [
      {
        id: "linux",
        name: "Linux (CLI & Admin)",
        category: "building",
        status: "Practicing / Applied",
        description: "Shell commands, file permissions, process monitoring (htop/journalctl), and bash scripting.",
        relatedProjects: ["docker-flask-cicd-pipeline", "terraform-aws-cloud-automation"],
      },
      {
        id: "docker",
        name: "Docker Containers",
        category: "building",
        status: "Practicing / Applied",
        description: "Multi-stage Dockerfiles, image optimization, volume mounts, and container networks.",
        relatedProjects: ["docker-flask-cicd-pipeline", "api-gateway-microservices"],
      },
      {
        id: "cicd",
        name: "CI/CD & GitHub Actions",
        category: "building",
        status: "Building Pipelines",
        description: "Automating unit test runs, linter checks, and Docker container registry image pushes.",
        relatedProjects: ["docker-flask-cicd-pipeline"],
      },
      {
        id: "aws",
        name: "AWS Fundamentals",
        category: "building",
        status: "Cloud Learning Track",
        description: "EC2 compute, S3 storage buckets, VPC networking basics, IAM roles, and Security Groups.",
        relatedProjects: ["terraform-aws-cloud-automation"],
      },
      {
        id: "terraform",
        name: "Terraform (IaC)",
        category: "building",
        status: "Infrastructure Learning",
        description: "Writing declarative HCL blueprints to provision cloud resources reproducibly.",
        relatedProjects: ["terraform-aws-cloud-automation"],
      },
      {
        id: "kubernetes",
        name: "Kubernetes (Orchestration)",
        category: "building",
        status: "Learning Core Concepts",
        description: "Pods, Deployments, Services, ConfigMaps, and cluster architecture fundamentals.",
        relatedProjects: [],
      },
    ],
  },
  {
    id: "ai-automation",
    title: "AI, ML & AUTOMATION",
    category: "applied",
    badge: "INTELLIGENCE",
    statusText: "APPLIED IN RESEARCH & LABS",
    description:
      "Leveraging Machine Learning algorithms, tabular data processing, predictive modeling, Explainable AI (SHAP), and Python workflow automation.",
    colSpan: "lg:col-span-6",
    skills: [
      {
        id: "scikit-learn",
        name: "Scikit-learn & ML",
        category: "applied",
        status: "Applied in Projects",
        description: "Ensemble classification, Random Forest, Logistic Regression, feature scaling, and evaluation metrics.",
        relatedProjects: ["predictive-analytics-streamlit", "ai-healthguard-research"],
      },
      {
        id: "explainable-ai",
        name: "Explainable AI (SHAP)",
        category: "applied",
        status: "Research Applied",
        description: "Model interpretability, SHAP values, feature importance breakdown, and transparency.",
        relatedProjects: ["ai-healthguard-research"],
      },
      {
        id: "pandas-numpy",
        name: "Pandas & NumPy",
        category: "applied",
        status: "Data Manipulation",
        description: "Tabular data cleaning, vector operations, missing value imputation, and matrix math.",
        relatedProjects: ["predictive-analytics-streamlit", "ai-healthguard-research"],
      },
      {
        id: "streamlit",
        name: "Streamlit UI",
        category: "applied",
        status: "Rapid ML Prototyping",
        description: "Building interactive web dashboards in Python for model serving and risk scoring.",
        relatedProjects: ["predictive-analytics-streamlit"],
      },
      {
        id: "generative-ai",
        name: "Generative AI & Prompting",
        category: "applied",
        status: "API Integration",
        description: "LLM API integration, prompt structuring, automated text processing, and tool chaining.",
        relatedProjects: [],
      },
    ],
  },
  {
    id: "tools-git",
    title: "DEVELOPER TOOLS & WORKFLOW",
    category: "core",
    badge: "DEVELOPER TOOLS",
    statusText: "DAILY WORKFLOW",
    description:
      "Git version control, GitHub collaboration, terminal command-line navigation, VS Code configuration, and documentation.",
    colSpan: "lg:col-span-6",
    skills: [
      {
        id: "git",
        name: "Git & GitHub",
        category: "core",
        status: "Daily Version Control",
        description: "Branching strategies, pull requests, commit hygiene, rebase, and code reviews.",
        relatedProjects: ["api-gateway-microservices", "docker-flask-cicd-pipeline", "terraform-aws-cloud-automation", "predictive-analytics-streamlit"],
      },
      {
        id: "vscode-cli",
        name: "VS Code & Bash CLI",
        category: "core",
        status: "Primary IDE",
        description: "Custom keybindings, debugging tools, extensions, and terminal productivity.",
        relatedProjects: ["api-gateway-microservices", "docker-flask-cicd-pipeline"],
      },
    ],
  },
];
