export interface ResearchProject {
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
  paperUrl?: string;
  githubUrl?: string;
}

export const researchData: ResearchProject = {
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
  status: "[RESEARCH MANUSCRIPT IN PREPARATION — VERIFY BEFORE PUBLISHING]",
  paperUrl: "https://github.com/heytarunkumar/ai-healthguard-research",
  githubUrl: "https://github.com/heytarunkumar/ai-healthguard-research",
};
