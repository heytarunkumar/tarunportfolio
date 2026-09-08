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
      className="relative w-full bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37] selection:text-black py-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Studio Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-5"
        >
          <span
            className="text-[11px] font-semibold tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            05 / APPLIED RESEARCH
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#E8E3D8] to-[#7A6E62]">
              EXPLAINABLE AI RESEARCH.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#634824]">
              TRANSPARENT PREDICTION SYSTEMS.
            </span>
          </h2>
        </motion.div>

        {/* Research Paper Feature Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-lift relative w-full rounded-2xl border border-[#8C6D4F]/40 bg-[#12100E] p-8 sm:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.85)] group overflow-hidden"
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
                  <span className="text-[10px] font-mono px-2.5 py-0.5 border border-amber-500/40 bg-amber-950/30 text-amber-300 rounded-sm uppercase font-semibold">
                    {researchData.status}
                  </span>
                </div>

                <h3
                  className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white mb-2 uppercase leading-[0.95]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {researchData.title}: {researchData.subtitle}
                </h3>

                <p className="text-xs font-mono text-[#D4AF37] mb-4">
                  COLLABORATIVE AUTHORS: {(researchData.authors || ['Sakshi Rajput', 'Prashant Prajapati', 'Tarun Kumar']).join(' · ')}
                </p>

                <p
                  className="text-xs sm:text-sm text-[#C4BCB3] font-light leading-relaxed mb-6"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {researchData.abstract}
                </p>
              </div>

              {/* Research Methodology Items */}
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#8C6D4F] uppercase block mb-2.5">
                  // METHODOLOGY &amp; TECHNICAL CONTRIBUTIONS
                </span>
                <div className="space-y-2.5">
                  {(researchData.methodology || []).map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-[#C4BCB3]">
                      <span className="text-[#D4AF37] font-bold">›</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#8C6D4F]/25">
                {(researchData.technologies || []).map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-[10px] font-mono uppercase rounded-sm border border-[#8C6D4F]/35 bg-[#1A1714] text-[#F5F2EB]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Explainability Architecture (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:pl-6 lg:border-l lg:border-[#8C6D4F]/25">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C6D4F] block">
                  // EXPLAINABLE AI (XAI) VISUALIZER
                </span>

                <div className="p-4 rounded-sm border border-[#8C6D4F]/30 bg-[#1A1714] space-y-3">
                  <span className="text-xs font-mono text-[#D4AF37] block font-bold">
                    SHAP FEATURE IMPORTANCE RANKING
                  </span>
                  
                  {/* Mini SHAP Bar Chart Mockup */}
                  <div className="space-y-2 text-[10px] font-mono">
                    <div>
                      <div className="flex justify-between text-[#C4BCB3] mb-0.5">
                        <span>Max Heart Rate (thalach)</span>
                        <span className="text-emerald-400">+0.38 SHAP</span>
                      </div>
                      <div className="w-full bg-[#12100E] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[85%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#C4BCB3] mb-0.5">
                        <span>Chest Pain Type (cp)</span>
                        <span className="text-emerald-400">+0.31 SHAP</span>
                      </div>
                      <div className="w-full bg-[#12100E] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[70%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#C4BCB3] mb-0.5">
                        <span>Serum Cholestoral (chol)</span>
                        <span className="text-amber-400">+0.22 SHAP</span>
                      </div>
                      <div className="w-full bg-[#12100E] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full w-[52%]" />
                      </div>
                    </div>
                  </div>

                  <p
                    className="text-[11.5px] text-[#A8988B] font-light leading-relaxed pt-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {researchData.explainabilityApproach}
                  </p>
                </div>

                <div className="p-4 rounded-sm border border-[#8C6D4F]/20 bg-[#141210] space-y-1">
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
                    className="w-full inline-flex items-center justify-center space-x-3 px-6 py-3.5 border border-[#8C6D4F] bg-[#12100E] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#F5F2EB] hover:text-black text-[11px] font-semibold tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.08)]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
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
