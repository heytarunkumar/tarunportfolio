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
      "Authoring efficient multi-stage Dockerfiles with minimal image size.",
      "Orchestrating multi-container environments using Docker Compose.",
      "Managing persistent container volumes and network bridges.",
    ],
    status: "Applied",
    githubUrl: "https://github.com/heytarunkumar",
  },
  {
    id: "cicd-automation",
    stepNumber: "04",
    title: "CI/CD Pipeline Automation",
    subtitle: "Continuous Integration & Delivery",
    category: "DevOps Pipeline",
    objective: "Construct automated GitHub Actions workflows for automated code linting, test execution, and container build checks on pull requests.",
    technologies: ["GitHub Actions", "CI/CD", "YAML", "Git", "Docker"],
    architecture: "Git Commit -> GitHub Event -> Workflow Runner -> Build Artifacts",
    keyLearnings: [
      "Designing matrix build pipelines and secrets management in GitHub Actions.",
      "Automating static code analysis and test execution before merge.",
      "Publishing container tags to container registries automatically.",
    ],
    status: "Building",
    githubUrl: "https://github.com/heytarunkumar",
  },
  {
    id: "aws-cloud",
    stepNumber: "05",
    title: "AWS Cloud Fundamentals & Hosting",
    subtitle: "Cloud Infrastructure",
    category: "Cloud Engineering",
    objective: "Deploy cloud virtual instances (EC2), configure S3 storage buckets, setup Security Groups, and deploy backend microservices.",
    technologies: ["AWS EC2", "AWS S3", "VPC", "Security Groups", "Cloud"],
    architecture: "Internet Gateway -> VPC Security Group -> AWS EC2 (Python App) -> S3 Bucket",
    keyLearnings: [
      "Configuring AWS Virtual Private Clouds (VPC) and subnets.",
      "Deploying and provisioning Python web servers on Linux EC2 instances.",
      "Applying least-privilege IAM policies and cloud security practices.",
    ],
    status: "Building",
    githubUrl: "https://github.com/heytarunkumar",
  },
  {
    id: "terraform-iac",
    stepNumber: "06",
    title: "Terraform Infrastructure as Code",
    subtitle: "Declarative Infrastructure",
    category: "Infrastructure as Code",
    objective: "Declare AWS infrastructure blueprints declaratively using HCL (HashiCorp Configuration Language) and manage infrastructure state.",
    technologies: ["Terraform", "HCL", "IaC", "AWS Provider"],
    architecture: "HCL Code -> Terraform Plan / Apply -> AWS Cloud Resources",
    keyLearnings: [
      "Writing modular Terraform resource definitions and variables.",
      "Understanding state files, locks, and plan verification workflows.",
      "Automating cloud resource creation and teardown reliably.",
    ],
    status: "Learning",
    githubUrl: "https://github.com/heytarunkumar",
  },
  {
    id: "kubernetes-orchestration",
    stepNumber: "07",
    title: "Kubernetes Orchestration & Service Mesh",
    subtitle: "Cloud Native Orchestration",
    category: "Container Orchestration",
    objective: "Understand pod lifecycle, deployments, service discovery, ingress controllers, and config maps for containerized applications.",
    technologies: ["Kubernetes", "kubectl", "Pods", "Deployments", "Services"],
    architecture: "Ingress Router -> K8s Service -> Pod Replica Set (Docker Containers)",
    keyLearnings: [
      "Defining Kubernetes Deployment and Service YAML manifests.",
      "Configuring rolling updates, health probes, and replica counts.",
      "Understanding cluster networking and service exposition concepts.",
    ],
    status: "Learning",
    githubUrl: "https://github.com/heytarunkumar",
  },
];
