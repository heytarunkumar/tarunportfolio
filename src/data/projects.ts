export interface Project {
  number: string;
  title: string;
  slug: string;
  category: 'Python / Backend' | 'Cloud' | 'DevOps' | 'AI / ML';
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  architectureMetrics: { label: string; value: string }[];
  github?: string;
  demo?: string;
  featured: boolean;
  status: 'completed' | 'building' | 'learning';
  visible?: boolean;
}

export const projectsData: Project[] = [
  {
    number: "01",
    title: "Automated API Gateway & Microservices Dispatcher",
    slug: "api-gateway-microservices",
    category: "Python / Backend",
    description:
      "A modular Python-backed API gateway built with Flask and Redis. Handles request routing, API key authorization, rate limiting, and structured logging for backend microservices.",
    problem:
      "Monolithic backends often face bottlenecks handling disparate client requests without unified rate limiting, authentication headers, or service discovery.",
    solution:
      "Architected a lightweight Python API Gateway that intercepts incoming HTTP requests, enforces API token validation, throttles traffic per client IP using Redis leaky bucket logic, and proxies clean payloads upstream.",
    technologies: ["Python", "Flask", "Redis", "REST APIs", "SQL", "Docker", "Git"],
    architectureMetrics: [
      { label: "ROUTING", value: "Dynamic Microservices" },
      { label: "SECURITY", value: "API Key Auth & Rate Limit" },
      { label: "CACHE / STORE", value: "Redis In-Memory State" },
    ],
    github: "https://github.com/heytarunkumar/python-api-gateway",
    featured: true,
    status: "completed",
  },
  {
    number: "02",
    title: "Containerized Flask Microservice & CI/CD Pipeline",
    slug: "docker-flask-cicd-pipeline",
    category: "DevOps",
    description:
      "Multi-stage Dockerized Python web microservice integrated with GitHub Actions CI/CD workflows for automated linting, unit testing, and container registry publishing.",
    problem:
      "Inconsistent local execution environments lead to deployment failures and manual overhead during application delivery.",
    solution:
      "Containerized the Flask application with multi-stage Docker builds to reduce image footprints and configured GitHub Actions workflows that run unit tests on pull requests before building and pushing image tags.",
    technologies: ["Python", "Flask", "Docker", "GitHub Actions", "Linux CLI", "CI/CD"],
    architectureMetrics: [
      { label: "CONTAINER", value: "Multi-Stage Dockerfile" },
      { label: "PIPELINE", value: "Automated Build & Test" },
      { label: "REGISTRY", value: "GitHub Container Registry" },
    ],
    github: "https://github.com/heytarunkumar/docker-flask-cicd",
    featured: true,
    status: "completed",
  },
  {
    number: "03",
    title: "Cloud Infrastructure Provisioning Automation",
    slug: "terraform-aws-cloud-automation",
    category: "Cloud",
    description:
      "Infrastructure as Code (IaC) deployment configurations using Terraform to provision AWS EC2 compute instances, VPC networking, security groups, and cloud storage buckets.",
    problem:
      "Manual cloud console configuration is prone to human error, configuration drift, and lacks version control auditability.",
    solution:
      "Developed modular Terraform scripts defining repeatable AWS infrastructure blueprints with strict security group ingress/egress rules and automated environment initialization.",
    technologies: ["AWS", "Terraform", "Linux", "IaC", "Bash", "Cloud Fundamentals"],
    architectureMetrics: [
      { label: "PARADIGM", value: "Infrastructure as Code" },
      { label: "PROVIDER", value: "Amazon Web Services (AWS)" },
      { label: "TOOLING", value: "HashiCorp Terraform" },
    ],
    github: "https://github.com/heytarunkumar/terraform-aws-infra",
    featured: true,
    status: "building",
  },
  {
    number: "04",
    title: "Predictive Analytics & Model Serving Dashboard",
    slug: "predictive-analytics-streamlit",
    category: "AI / ML",
    description:
      "Interactive Streamlit web application serving trained Machine Learning classification models for automated tabular data analysis and real-time risk predictions.",
    problem:
      "Machine learning models often remain locked in Jupyter Notebooks without accessible web interfaces for non-technical evaluation.",
    solution:
      "Exported serialized Scikit-learn Random Forest and Logistic Regression estimators, wrapping them in a clean Python Streamlit web dashboard with interactive feature input forms and clear model output visualizations.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Streamlit", "REST APIs"],
    architectureMetrics: [
      { label: "MODEL", value: "Scikit-learn Classifier" },
      { label: "INTERFACE", value: "Python Streamlit UI" },
      { label: "PIPELINE", value: "Serialized Pickle Model" },
    ],
    github: "https://github.com/heytarunkumar/ml-predictive-dashboard",
    featured: true,
    status: "completed",
  },
];
