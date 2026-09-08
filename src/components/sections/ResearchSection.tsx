import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

export const ResearchSection: React.FC = () => {
  const { research: contextResearch } = usePortfolio();
  const researchData = contextResearch || {
    title: 'AI-HealthGuard',
    subtitle: 'An Explainable AI-Based Ischemic Heart Disease Risk Prediction and Prevention System',
    authors: ['Sakshi Rajput', 'Prashant Prajapati', 'Tarun Kumar'],
    status: 'Research Project & Manuscript',
    abstract: 'A machine learning system applying SHAP and LIME feature attribution to heart disease prediction datasets, quantifying biomarker contributions for transparent risk scoring.',
    methodology: [
      'Preprocessed clinical tabular attributes and trained ensemble classification models.',
      'Integrated SHAP explainability pipelines to evaluate feature contributions and model transparency.',
      'Constructed risk factor ranking and actionable counterfactual prevention recommendations.'
    ],
    technologies: ['Python', 'Scikit-Learn', 'SHAP', 'Pandas', 'Streamlit', 'Explainable AI'],
    explainabilityApproach: 'Quantifying feature contributions using TreeExplainer and KernelExplainer to generate local and global model interpretability plots.',
    focus: 'Explainable Healthcare Predictive Analytics & Machine Learning',
    paperUrl: 'https://github.com/heytarunkumar',
    visible: true,
  };

  if (researchData && (researchData as any).visible === false) {
    return null;
  }

  return (
    <section
      id="research"
      className="relative w-full bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Studio Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-4 mb-6"
        >
          <span className="text-[11px] font-mono font-medium tracking-[0.3em] uppercase text-[#D4AF37]">
            05 / APPLIED RESEARCH &amp; MACHINE LEARNING
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-[1.15]">
            Explainable AI research &amp; <span className="italic text-[#D4AF37]">clinical predictive systems.</span>
          </h2>
        </motion.div>

        {/* Research Paper Feature Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-lift relative w-full rounded-2xl border border-[#26211B] bg-[#12100E] p-7 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group overflow-hidden"
        >
          {/* Top Gold Horizon Edge */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            
            {/* Left Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-xs font-mono font-bold text-[#D4AF37]">
                    ACADEMIC RESEARCH //
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 border border-amber-500/40 bg-amber-950/30 text-amber-300 rounded-full uppercase font-semibold">
                    {researchData.status}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2 leading-snug">
                  {researchData.title}: {researchData.subtitle}
                </h3>

                <p className="text-xs font-mono text-[#D4AF37] mb-4">
                  COLLABORATIVE AUTHORS: {(researchData.authors || ['Sakshi Rajput', 'Prashant Prajapati', 'Tarun Kumar']).join(' · ')}
                </p>

                <p className="text-xs sm:text-[13.5px] text-[#C4BCB3] font-light leading-relaxed mb-6">
                  {researchData.abstract}
                </p>
              </div>

              {/* Research Methodology Items */}
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#8C6D4F] uppercase block mb-2.5">
                  // METHODOLOGY &amp; TECHNICAL CONTRIBUTIONS
                </span>
                <div className="space-y-2">
                  {(researchData.methodology || []).map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-[#C4BCB3]">
                      <span className="text-[#D4AF37] font-bold">›</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#26211B]">
                {(researchData.technologies || []).map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-[10.5px] font-mono uppercase rounded-lg border border-[#26211B] bg-[#0A0908] text-[#F5F2EB]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Explainability Architecture (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:pl-6 lg:border-l lg:border-[#26211B]">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C6D4F] block">
                  // EXPLAINABLE AI (XAI) VISUALIZER
                </span>

                <div className="p-5 rounded-xl border border-[#26211B] bg-[#0A0908] space-y-3.5">
                  <span className="text-xs font-mono text-[#D4AF37] block font-bold">
                    SHAP FEATURE IMPORTANCE RANKING
                  </span>
                  
                  {/* Mini SHAP Bar Chart Mockup */}
                  <div className="space-y-2.5 text-[10.5px] font-mono">
                    <div>
                      <div className="flex justify-between text-[#C4BCB3] mb-1">
                        <span>Max Heart Rate (thalach)</span>
                        <span className="text-emerald-400">+0.38 SHAP</span>
                      </div>
                      <div className="w-full bg-[#12100E] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[85%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#C4BCB3] mb-1">
                        <span>Chest Pain Type (cp)</span>
                        <span className="text-emerald-400">+0.31 SHAP</span>
                      </div>
                      <div className="w-full bg-[#12100E] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[70%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#C4BCB3] mb-1">
                        <span>Serum Cholestoral (chol)</span>
                        <span className="text-amber-400">+0.22 SHAP</span>
                      </div>
                      <div className="w-full bg-[#12100E] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full w-[52%]" />
                      </div>
                    </div>
                  </div>

                  <p className="text-[11.5px] text-[#A8988B] font-light leading-relaxed pt-1">
                    {researchData.explainabilityApproach}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#26211B] bg-[#0A0908] space-y-1">
                  <span className="text-[10px] font-mono text-[#8C6D4F] block">
                    RESEARCH FOCUS AREA
                  </span>
                  <span className="text-xs font-mono text-[#F7E7C4] block">
                    {researchData.focus}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                {researchData.paperUrl && (
                  <a
                    href={researchData.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] cursor-pointer font-mono"
                  >
                    <span>EXPLORE RESEARCH CODE</span>
                    <span className="text-xs">↗</span>
                  </a>
                )}
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ResearchSection;
