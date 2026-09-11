export interface LabTrack {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  category: string;
  objective: string;
  technologies: string[];
  architecture: string;
  keyLearnings: string[];
  status: 'Learning' | 'Building' | 'Applied' | 'Completed';
  githubUrl?: string;
  demoUrl?: string;
  visible?: boolean;
}

export const engineeringLabTracks: LabTrack[] = [
  {
    id: "python-foundations",
    stepNumber: "01",
    title: "Python Backend Architecture & APIs",
    subtitle: "Core Engineering Foundation",
    category: "Python / Backend",
    objective: "Build modular Python services, OOP abstractions, clean REST API endpoints, database access layers, and automated tests.",
    technologies: ["Python", "Flask", "OOP", "SQL", "MySQL", "PyTest"],
    architecture: "Modular Flask Application -> Layered Services -> MySQL Database",
    keyLearnings: [
      "Structuring clean Python application packages and blueprints.",
      "Writing reusable Object-Oriented patterns and database connection pools.",
      "Implementing structured API response formats and error handling.",
    ],
    status: "Completed",
    githubUrl: "https://github.com/heytarunkumar",
  },
  {
    id: "linux-sysadmin",
    stepNumber: "02",
    title: "Linux System Administration & Shell Scripting",
    subtitle: "OS & Server Fundamentals",
    category: "System Administration",
    objective: "Master Linux CLI tools, process management, file permissions, shell scripting, environment configs, and networking tools.",
    technologies: ["Linux", "Bash", "Shell Scripting", "SSH", "Systemd"],
    architecture: "POSIX Shell Scripts -> Linux System Daemon Services",
    keyLearnings: [
      "Automating daily system tasks and log rotation with Bash scripts.",
      "Managing Linux users, file permissions (chmod/chown), and SSH keys.",
      "Diagnosing system performance using htop, netstat, journalctl, and curl.",
    ],
    status: "Applied",
    githubUrl: "https://github.com/heytarunkumar",
  },
  {
    id: "docker-containers",
    stepNumber: "03",
    title: "Docker Containerization & Compose",
    subtitle: "Container Runtime Isolation",
    category: "Containerization",
    objective: "Package Python applications and dependent datastores into multi-stage container images for reproducible deployment.",
    technologies: ["Docker", "Docker Compose", "Multi-stage Builds", "Python"],
    architecture: "Client -> Docker Container (Flask) -> Docker Container (Database)",
    keyLearnings: [
      "Crafting multi-stage Dockerfiles to minimize final image footprint.",
      "Composing multi-container services with healthchecks and network bridges.",
      "Managing container persistence with named volumes and bind mounts.",
    ],
    status: "Completed",
    githubUrl: "https://github.com/heytarunkumar",
  },
  {
    id: "github-actions-cicd",
    stepNumber: "04",
    title: "GitHub Actions CI/CD Automation",
    subtitle: "Continuous Integration & Delivery",
    category: "CI/CD & Automation",
    objective: "Design automated testing, linting, code quality checks, and container image build pipelines triggered by git events.",
    technologies: ["GitHub Actions", "YAML", "CI/CD", "PyTest", "Flake8"],
    architecture: "Git Push / PR -> GitHub Runner -> Test & Lint Matrix -> Build Artifact",
    keyLearnings: [
      "Writing reusable GitHub Actions YAML workflows and matrix jobs.",
      "Caching pip packages and Docker layers to accelerate pipeline speed.",
      "Enforcing automated gate checks on pull requests before branch merges.",
    ],
    status: "Completed",
    githubUrl: "https://github.com/heytarunkumar",
  },
  {
    id: "aws-cloud-foundations",
    stepNumber: "05",
    title: "AWS Cloud Foundations & Compute",
    subtitle: "Cloud Infrastructure",
    category: "Cloud Engineering",
    objective: "Deploy Python applications to cloud virtual machines, configure security groups, IAM roles, and storage buckets.",
    technologies: ["AWS", "EC2", "S3", "IAM", "VPC Security"],
    architecture: "Internet -> AWS Route 53 -> EC2 (Python App) -> S3 (Static Assets)",
    keyLearnings: [
      "Provisioning and hardening Ubuntu EC2 instances with SSH key pairs.",
      "Configuring VPC Security Groups for strict port and IP whitelisting.",
      "Connecting application workloads to S3 for object storage.",
    ],
    status: "Building",
    githubUrl: "https://github.com/heytarunkumar",
  },
  {
    id: "terraform-iac",
    stepNumber: "06",
    title: "Infrastructure as Code with Terraform",
    subtitle: "Declarative Infrastructure",
    category: "Infrastructure as Code",
    objective: "Define and manage reproducible cloud resources declaratively using HashiCorp Terraform modules.",
    technologies: ["Terraform", "HCL", "AWS Provider", "IaC"],
    architecture: "Terraform HCL -> Terraform State -> AWS API -> Cloud Resources",
    keyLearnings: [
      "Writing modular HCL definitions for VPCs, subnets, and EC2 instances.",
      "Managing remote state files securely with S3 and DynamoDB locking.",
      "Executing plan and apply workflows for deterministic cloud rollouts.",
    ],
    status: "Building",
    githubUrl: "https://github.com/heytarunkumar",
  },
  {
    id: "production-monitoring",
    stepNumber: "07",
    title: "Observability, Logging & Health Monitoring",
    subtitle: "Reliability & Performance",
    category: "Observability & SRE",
    objective: "Implement structured JSON logging, health endpoints, application uptime monitoring, and alerting dashboards.",
    technologies: ["Prometheus", "Grafana", "Uptime Kuma", "Structured Logging"],
    architecture: "Python App -> Metrics Exporter -> Prometheus -> Grafana Dashboard",
    keyLearnings: [
      "Exposing /healthz and /metrics endpoints on Python microservices.",
      "Scraping service health metrics into time-series datastores.",
      "Visualizing application throughput, error rates, and p99 latencies.",
    ],
    status: "Learning",
    githubUrl: "https://github.com/heytarunkumar",
  },
];
