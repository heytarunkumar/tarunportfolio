import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

export const ResearchSection: React.FC = () => {
  const { research: contextResearch } = usePortfolio();
  const researchData = contextResearch || {
    title: 'AI-HealthGuard',
    subtitle: 'Explainable AI for Cardiovascular Risk Prediction',
    authors: ['Tarun Kumar'],
    status: 'Research Manuscript',
    abstract: 'A machine learning system applying SHAP feature attribution to heart disease prediction datasets.',
    methodology: ['Random Forest & XGBoost classifiers', 'SHAP explainer values'],
    technologies: ['Python', 'Scikit-Learn', 'SHAP', 'Streamlit'],
    explainabilityApproach: 'Quantifying feature contributions to generate model interpretability plots.',
    focus: 'Explainable Healthcare Predictive Analytics',
    paperUrl: 'https://github.com/heytarunkumar',
    visible: true,
  };

  if (researchData && (researchData as any).visible === false) {
    return null;
  }

  return (
    <section
      id="research"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
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
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            05 / ACADEMIC RESEARCH
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
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448]">
              EXPLAINABLE AI RESEARCH.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
              MACHINE LEARNING IN PRACTICE.
            </span>
          </h2>
        </motion.div>

        {/* Research Paper Feature Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative w-full rounded-sm border border-[#8C6D4F]/40 bg-[#0E0C0A] p-8 sm:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.98)] group overflow-hidden"
        >
          {/* Top Gold Horizon Edge */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-xs font-mono font-bold text-[#D4AF37]">
                    RESEARCH PROJECT //
                  </span>
                  <span className="text-[10.5px] font-mono px-2.5 py-0.5 border border-amber-500/40 bg-amber-950/30 text-amber-300 rounded-sm uppercase">
                    {researchData.status}
                  </span>
                </div>

                <h3
                  className="text-4xl sm:text-5xl lg:text-5xl font-normal tracking-tight text-white mb-2 uppercase leading-[0.95]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {researchData.title}: {researchData.subtitle}
                </h3>

                <p className="text-xs font-mono text-[#D4AF37] mb-4">
                  AUTHORS: {(researchData.authors || []).join(' · ')}
                </p>

                <p
                  className="text-xs sm:text-sm text-[#C4B5A5] font-light leading-relaxed mb-6"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {researchData.abstract}
                </p>
              </div>

              {/* Research Methodology Items */}
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#8C6D4F] uppercase block mb-2">
                  // METHODOLOGY & TECHNICAL FOCUS
                </span>
                <div className="space-y-2">
                  {(researchData.methodology || []).map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-[#B3A497]">
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
                    className="px-3 py-1 text-[10px] font-mono uppercase rounded-sm border border-[#8C6D4F]/35 bg-[#16120E] text-[#E8D7C5]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Explainability Architecture (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:pl-6 lg:border-l lg:border-[#8C6D4F]/25">
              <div className="space-y-4">
                <span className="text-[9.5px] font-mono tracking-widest uppercase text-[#8C6D4F] block">
                  // EXPLAINABLE AI (XAI) APPROACH
                </span>

                <div className="p-4 rounded-sm border border-[#8C6D4F]/30 bg-[#050403] space-y-2">
                  <span className="text-xs font-mono text-[#D4AF37] block font-bold">
                    SHAP FEATURE ATTRIBUTION
                  </span>
                  <p
                    className="text-xs text-[#A8988B] font-light leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {researchData.explainabilityApproach}
                  </p>
                </div>

                <div className="p-4 rounded-sm border border-[#8C6D4F]/20 bg-[#0A0806] space-y-1">
                  <span className="text-[10px] font-mono text-[#8C6D4F] block">
                    RESEARCH FOCUS AREA
                  </span>
                  <span className="text-xs font-mono text-[#F7E7C4] block">
                    {researchData.focus}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                {researchData.paperUrl && (
                  <a
                    href={researchData.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-3 px-6 py-3.5 border border-[#8C6D4F] bg-[#16120E] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#EAD8C7] hover:text-black text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span>READ RESEARCH DETAILS</span>
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
