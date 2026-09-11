export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  topic: 'Python' | 'Backend' | 'Cloud' | 'DevOps' | 'AI / ML' | 'Automation';
  date: string;
  readTime: string;
  mediumUrl: string;
  tags: string[];
  visible?: boolean;
}

export const articlesData: Article[] = [
  {
    id: "01",
    title: "Building Production-Ready REST APIs with Python & Flask: Architectural Best Practices",
    slug: "building-production-ready-rest-apis-python-flask",
    summary:
      "A deep dive into modular Flask application structures, blueprint isolation, custom error handling middlewares, and database connection pooling.",
    topic: "Python",
    date: "AUG 2026",
    readTime: "6 MIN READ",
    mediumUrl: "https://medium.com/@heytarunkumar/building-production-ready-rest-apis-python-flask",
    tags: ["Python", "Flask", "REST APIs", "Backend"],
  },
  {
    id: "02",
    title: "From Code to Container: Multi-Stage Docker Builds for Python Microservices",
    slug: "multi-stage-docker-builds-python-microservices",
    summary:
      "How to optimize Docker container image size from 900MB down to 120MB using Alpine base images, virtual environments, and multi-stage build layers.",
    topic: "DevOps",
    date: "JUL 2026",
    readTime: "8 MIN READ",
    mediumUrl: "https://medium.com/@heytarunkumar/multi-stage-docker-builds-python-microservices",
    tags: ["Docker", "DevOps", "Python", "Containers"],
  },
  {
    id: "03",
    title: "Automating Testing & Linting for Python Projects with GitHub Actions",
    slug: "automating-testing-linting-python-github-actions",
    summary:
      "Step-by-step guide to writing GitHub Actions YAML workflow files that run pytest, flake8, and container build checks automatically on every pull request.",
    topic: "Automation",
    date: "JUN 2026",
    readTime: "5 MIN READ",
    mediumUrl: "https://medium.com/@heytarunkumar/automating-testing-linting-python-github-actions",
    tags: ["GitHub Actions", "CI/CD", "Automation", "Python"],
  },
  {
    id: "04",
    title: "Demystifying SHAP: Making Machine Learning Classifiers Explainable in Python",
    slug: "demystifying-shap-explainable-machine-learning-python",
    summary:
      "Understanding Shapley values for medical and tabular machine learning models, transforming black-box predictions into interpretable feature breakdowns.",
    topic: "AI / ML",
    date: "MAY 2026",
    readTime: "7 MIN READ",
    mediumUrl: "https://medium.com/@heytarunkumar/demystifying-shap-explainable-machine-learning-python",
    tags: ["Machine Learning", "Explainable AI", "SHAP", "Python"],
  },
];
