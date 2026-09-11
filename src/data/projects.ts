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
    technologies: ["Terraform", "AWS (EC2, VPC, S3)", "Infrastructure as Code", "Linux", "DevOps"],
    architectureMetrics: [
      { label: "PROVISIONER", value: "HashiCorp Terraform" },
      { label: "CLOUD", value: "AWS High-Availability" },
      { label: "NETWORKING", value: "VPC Subnet Isolation" },
    ],
    github: "https://github.com/heytarunkumar/terraform-aws-infra",
    featured: false,
    status: "completed",
  },
  {
    number: "04",
    title: "Predictive Analytics & Tabular ML Dashboard",
    slug: "predictive-analytics-streamlit",
    category: "AI / ML",
    description:
      "Interactive Streamlit and Scikit-Learn data app providing predictive classification scoring and exploratory data analysis over tabular datasets.",
    problem:
      "Non-technical stakeholders struggle to interpret raw statistical models and require visual parameter controls for exploratory inference.",
    solution:
      "Developed an interactive Python Streamlit web dashboard that loads trained Scikit-Learn classification pipelines, accepts real-time feature sliders, and renders instant probability distributions and confusion matrices.",
    technologies: ["Python", "Scikit-learn", "Streamlit", "Pandas", "Matplotlib", "Seaborn"],
    architectureMetrics: [
      { label: "MODEL", value: "Random Forest & Logistic Reg." },
      { label: "INTERFACE", value: "Streamlit Real-Time GUI" },
      { label: "EVALUATION", value: "ROC-AUC & F1-Score Plots" },
    ],
    github: "https://github.com/heytarunkumar/ml-predictive-dashboard",
    featured: false,
    status: "completed",
  },
];
