import React from 'react';
import { motion } from 'framer-motion';
import { researchData } from '../../data/research';

export const ResearchSection: React.FC = () => {
  return (
    <section 
      id="research" 
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-[#05060A] text-[#F1F5F9] font-sans border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xs font-mono font-semibold uppercase text-cyan-400 tracking-widest">
                05 // ACADEMIC RESEARCH &amp; PUBLICATIONS
              </span>
              <div className="w-16 h-[1px] bg-gradient-to-r from-cyan-500/80 to-transparent" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Explainable AI Research
            </h2>
          </div>

          <p className="text-sm text-slate-400 max-w-md mt-4 md:mt-0 font-normal">
            Academic research focused on interpretable machine learning models for early risk detection.
          </p>
        </div>

        {/* Research Paper Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card p-8 sm:p-10 rounded-3xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Details (7 Cols) */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-6">
                <span>{researchData.status}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 font-heading leading-tight">
                {researchData.title}
              </h3>

              {/* Authors */}
              <p className="text-xs font-mono text-slate-400 mb-6">
                Authors: <span className="text-cyan-300 font-bold">{researchData.authors.join(', ')}</span>
              </p>

              {/* Abstract */}
              <p className="text-sm text-slate-300 font-normal leading-relaxed mb-6">
                {researchData.abstract}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={researchData.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-6 py-2.5 text-xs font-semibold"
                >
                  View Research Repository ↗
                </a>
              </div>
            </div>

            {/* Right: XAI Visualizer Panel (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-white/10 font-mono text-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-cyan-400 font-bold">SHAP_EXPLAINABILITY.PLOT</span>
                  <span className="text-emerald-400">Feature Importance</span>
                </div>

                <div className="space-y-3 text-[11px]">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Serum Cholesterol</span>
                      <span className="text-cyan-400">+0.42 SHAP</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div className="w-[85%] h-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Resting Blood Pressure</span>
                      <span className="text-cyan-400">+0.31 SHAP</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div className="w-[65%] h-full bg-gradient-to-r from-cyan-500 to-indigo-500" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Max Heart Rate Reached</span>
                      <span className="text-amber-400">-0.24 SHAP</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div className="w-[50%] h-full bg-gradient-to-r from-amber-500 to-red-500" />
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 border-t border-white/10">
                  Methodology: {researchData.explainabilityApproach}
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ResearchSection;
