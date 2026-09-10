export interface ResearchProject {
  id?: string;
  title: string;
  subtitle: string;
  authors: string[];
  role: string;
  abstract: string;
  focus: string;
  methodology: string[];
  technologies: string[];
  explainabilityApproach: string;
  status: string;
  date?: string;
  paperUrl?: string;
  githubUrl?: string;
  visible?: boolean;
}

export const researchData: ResearchProject = {
  id: "res-1",
  title: "AI-HealthGuard",
  subtitle: "An Explainable AI-Based Ischemic Heart Disease Risk Prediction and Prevention System",
  authors: ["Tarun Kumar", "Sakshi Rajput", "Prashant Prajapati"],
  role: "Lead Co-Author & ML Implementation Engineer",
  abstract:
    "A Machine Learning research exploration focusing on predictive risk stratification for ischemic heart disease using tabular health metrics. Integrates feature selection, ensemble classifiers, and explainable AI (SHAP / LIME) methods to illuminate decision thresholds for clinical interpretability.",
  focus: "Explainable Machine Learning (XAI) & Medical Tabular Data Analysis",
  methodology: [
    "Preprocessing and normalizing clinical health tabular datasets.",
    "Evaluating Random Forest, XGBoost, and Logistic Regression algorithms.",
    "Applying SHAP (SHapley Additive exPlanations) values for global and local feature importance.",
    "Designing actionable risk score visualizations based on input features.",
  ],
  technologies: ["Python", "Scikit-learn", "SHAP", "Pandas", "NumPy", "Matplotlib", "Streamlit"],
  explainabilityApproach:
    "Utilizes SHAP breakdown plots to display exact feature contributions (e.g., blood pressure, cholesterol levels) driving individual risk score predictions, replacing black-box models with interpretable feature attributions.",
  status: "Research Manuscript in Preparation",
  date: "AUG 2026",
  paperUrl: "https://github.com/haytarunkumar/ai-healthguard-research",
  githubUrl: "https://github.com/haytarunkumar/ai-healthguard-research",
  visible: true,
};

export const initialResearchProjects: ResearchProject[] = [
  researchData,
  {
    id: "res-2",
    title: "Comparative Benchmarks on Tabular Clinical Regimes",
    subtitle: "Evaluating Gradient Boosted Ensembles vs. Neural Tabular Architectures under Extreme Sparsity",
    authors: ["Tarun Kumar"],
    role: "Principal Author & Researcher",
    abstract:
      "Empirical study benchmarking inference latencies and calibration curves across XGBoost, LightGBM, and TabNet neural architectures on heterogeneous clinical tabular datasets.",
    focus: "Tabular Machine Learning & Predictive Modeling",
    methodology: [
      "Benchmarking LightGBM, CatBoost, and TabNet on clinical cohorts.",
      "Hyperparameter optimization using Bayesian surrogate modeling.",
      "Evaluating calibration curves and Brier scores across imbalanced target splits.",
    ],
    technologies: ["Python", "PyTorch", "LightGBM", "CatBoost", "Optuna", "Scikit-learn"],
    explainabilityApproach:
      "Integrated gradients and permutation importance metrics computed across high-dimensional sparse representations.",
    status: "Technical Working Paper",
    date: "JUL 2026",
    paperUrl: "https://github.com/haytarunkumar",
    githubUrl: "https://github.com/haytarunkumar",
    visible: true,
  },
];
