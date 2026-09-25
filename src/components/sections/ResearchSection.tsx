import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

export const ResearchSection: React.FC = () => {
  const { research: contextResearch, researchList } = usePortfolio();
  
  const allResearch = (researchList && researchList.length > 0)
    ? researchList
    : (contextResearch ? [contextResearch] : []);

  const visibleResearch = allResearch.filter((r) => r.visible !== false);

  if (visibleResearch.length === 0) {
    return null;
  }

  const primaryResearch = visibleResearch[0];
  const secondaryResearch = visibleResearch.slice(1);

  return (
    <section
      id="research"
      className="relative w-full bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white py-20 sm:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[32rem] h-[32rem] bg-[#D4AF37]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-[1760px] mx-auto w-full relative z-10 space-y-10 sm:space-y-12">
        
        {/* Eyebrow Header */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center space-x-4 mb-6"
          >
            <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D4AF37]">
              05 / APPLIED RESEARCH &amp; MACHINE LEARNING
            </span>
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
          </motion.div>

          {/* Section Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.08] tracking-tight">
              Explainable AI Research &amp; <span className="italic text-[#D4AF37]">Clinical Systems.</span>
            </h2>
          </motion.div>
        </div>

        {/* Primary Research Paper Feature Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-lift relative p-6 sm:p-10 rounded-2xl border border-[#26211B] bg-[#12100E] shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Top Gold Accent Border Flare */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Abstract & Contribution (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-[#D4AF37]/40 bg-[#1A1612] text-[#D4AF37] uppercase font-semibold">
                  FEATURED MANUSCRIPT
                </span>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 uppercase font-medium">
                  {primaryResearch.status}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-white leading-tight mb-2">
                  {primaryResearch.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#D4AF37]">
                  {primaryResearch.subtitle}
                </p>
              </div>

              {/* Authors */}
              <div className="flex items-center space-x-2 text-xs font-mono text-[#A8988B] border-y border-[#26211B] py-2.5">
                <span className="text-[#D4AF37] font-semibold">AUTHORS:</span>
                <span className="text-[#F5F2EB]">
                  {(primaryResearch.authors || []).join(' · ')}
                </span>
              </div>

              {/* Abstract */}
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#A8988B] uppercase block mb-1.5">
                  // EXECUTIVE ABSTRACT
                </span>
                <p className="text-xs sm:text-[13.5px] font-light text-[#C4BCB3] leading-relaxed">
                  {primaryResearch.abstract}
                </p>
              </div>

              {/* Research Methodology Items */}
              {primaryResearch.methodology && primaryResearch.methodology.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#A8988B] uppercase block mb-2.5">
                    // METHODOLOGY &amp; TECHNICAL CONTRIBUTIONS
                  </span>
                  <div className="space-y-2">
                    {primaryResearch.methodology.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-xs text-[#C4BCB3]">
                        <span className="text-[#D4AF37] font-bold">›</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#26211B]">
                {(primaryResearch.technologies || []).map((t: string) => (
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
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#A8988B] block">
                  // EXPLAINABLE AI (XAI) VISUALIZER
                </span>

                <div className="p-5 rounded-xl border border-[#26211B] bg-[#0A0908] space-y-3.5">
                  <span className="text-xs font-mono text-[#D4AF37] block font-bold">
                    SHAP FEATURE IMPORTANCE RANKING
                  </span>
                  
                  {/* Mini SHAP Bar Chart */}
                  <div className="space-y-2.5 text-[10.5px] font-mono">
                    <div>
                      <div className="flex justify-between text-[#C4BCB3] mb-1">
                        <span>Max Heart Rate (thalach)</span>
                        <span className="text-emerald-400">+0.38 SHAP</span>
                      </div>
                      <div className="w-full bg-[#120F0C] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[85%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#C4BCB3] mb-1">
                        <span>Chest Pain Type (cp)</span>
                        <span className="text-emerald-400">+0.31 SHAP</span>
                      </div>
                      <div className="w-full bg-[#120F0C] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[70%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#C4BCB3] mb-1">
                        <span>Serum Cholestoral (chol)</span>
                        <span className="text-amber-400">+0.22 SHAP</span>
                      </div>
                      <div className="w-full bg-[#120F0C] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full w-[52%]" />
                      </div>
                    </div>
                  </div>

                  <p className="text-[11.5px] text-[#A8988B] font-light leading-relaxed pt-1">
                    {primaryResearch.explainabilityApproach}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#26211B] bg-[#0A0908] space-y-1">
                  <span className="text-[10px] font-mono text-[#A8988B] block">
                    RESEARCH FOCUS AREA
                  </span>
                  <span className="text-xs font-mono text-[#F7E7C4] block">
                    {primaryResearch.focus}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                {(primaryResearch.paperUrl || primaryResearch.githubUrl) && (
                  <a
                    href={primaryResearch.paperUrl || primaryResearch.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] text-xs font-bold font-mono tracking-[0.18em] uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] cursor-pointer"
                  >
                    <span>EXPLORE RESEARCH CODE</span>
                    <span className="text-xs">↗</span>
                  </a>
                )}
              </div>

            </div>

          </div>
        </motion.div>

        {/* Secondary Research Papers Grid */}
        {secondaryResearch.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {secondaryResearch.map((paper, pIdx) => (
              <motion.div
                key={paper.id || pIdx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-lift p-7 rounded-2xl border border-[#26211B] bg-[#12100E] space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40 bg-[#1A1612] text-[#D4AF37] uppercase font-semibold">
                      {paper.focus}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-amber-500/30 bg-amber-950/20 text-amber-300 uppercase">
                      {paper.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-normal text-white leading-snug">
                    {paper.title}
                  </h3>
                  <p className="text-xs text-[#A8988B] font-sans">
                    {paper.subtitle}
                  </p>
                  <p className="text-xs text-[#C4BCB3] font-light leading-relaxed">
                    {paper.abstract}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#26211B]">
                  <div className="flex flex-wrap gap-1.5">
                    {(paper.technologies || []).map((t: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-[#26211B] bg-[#0A0908] text-[#C4B5A5]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {(paper.paperUrl || paper.githubUrl) && (
                    <a
                      href={paper.paperUrl || paper.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-xs font-mono text-[#D4AF37] hover:underline"
                    >
                      <span>VIEW MANUSCRIPT / REPO</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ResearchSection;
