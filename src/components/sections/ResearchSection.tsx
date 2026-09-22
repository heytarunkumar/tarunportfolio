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
      className="relative w-full bg-[#F4EEE4] text-[#202020] font-sans selection:bg-[#78000F] selection:text-[#F4EEE4] py-20 sm:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 overflow-hidden"
    >
      <div className="max-w-[1760px] mx-auto w-full relative z-10 space-y-10 sm:space-y-12">
        
        {/* Eyebrow Header */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex items-center space-x-4 mb-6"
          >
            <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F]">
              05 / APPLIED RESEARCH &amp; MACHINE LEARNING
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#78000F]/60 via-[#CFC3B3] to-transparent max-w-xs" />
          </motion.div>

          {/* Section Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111111] leading-[1.08] tracking-[-0.03em]">
              Explainable AI Research &amp; <span className="text-[#78000F] italic">Clinical Systems.</span>
            </h2>
          </motion.div>
        </div>

        {/* Primary Research Paper Feature Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="editorial-card relative w-full rounded-[4px] border border-[#CFC3B3] bg-[#FAF8F3] p-6 sm:p-10 shadow-md group overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#78000F] via-[#CFC3B3] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex items-center space-x-3 mb-2.5">
                  <span className="text-xs font-mono font-bold text-[#78000F]">
                    ACADEMIC RESEARCH //
                  </span>
                  <span className="text-[9.5px] font-mono px-2 py-0.5 border border-[#DDD2C2] bg-[#F4EEE4] text-[#78000F] rounded-[2px] uppercase font-bold">
                    {primaryResearch.status}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#111111] mb-2 leading-snug">
                  {primaryResearch.title}: {primaryResearch.subtitle}
                </h3>

                <p className="text-xs font-mono text-[#78000F] mb-3 font-semibold break-words">
                  COLLABORATIVE AUTHORS: {(primaryResearch.authors || ['Sakshi Rajput', 'Prashant Prajapati', 'Tarun Kumar']).join(' · ')}
                </p>

                <p className="text-xs sm:text-sm text-[#38342E] font-normal leading-relaxed mb-4">
                  {primaryResearch.abstract}
                </p>
              </div>

              {/* Research Methodology Items */}
              {primaryResearch.methodology && primaryResearch.methodology.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#78000F] uppercase font-bold block mb-2">
                    // METHODOLOGY &amp; CONTRIBUTIONS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {primaryResearch.methodology.map((meth: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 rounded-[3px] border border-[#DDD2C2] bg-[#F4EEE4] text-xs font-sans text-[#202020] flex items-start space-x-2"
                      >
                        <span className="text-[#78000F] font-bold">0{idx + 1}</span>
                        <span>{meth}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Explainability & Actions (5 Cols) */}
            <div className="lg:col-span-5 rounded-[4px] border border-[#DDD2C2] bg-[#F4EEE4] p-5 sm:p-7 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#78000F] uppercase font-bold block pb-2 border-b border-[#DDD2C2]">
                // EXPLAINABILITY APPROACH &amp; FOCUS
              </span>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-mono text-[#8C8275] uppercase block mb-1">CORE RESEARCH FOCUS</span>
                  <p className="text-xs text-[#202020] font-sans font-medium">{primaryResearch.focus}</p>
                </div>

                {primaryResearch.explainabilityApproach && (
                  <div>
                    <span className="text-[10px] font-mono text-[#8C8275] uppercase block mb-1">INTERPRETABILITY METHOD</span>
                    <p className="text-xs text-[#38342E] font-sans leading-relaxed">{primaryResearch.explainabilityApproach}</p>
                  </div>
                )}
              </div>

              {primaryResearch.githubUrl && (
                <div className="pt-3 border-t border-[#DDD2C2]">
                  <a
                    href={primaryResearch.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-executive-primary inline-flex items-center justify-center space-x-2 w-full py-3 text-xs font-mono font-bold tracking-[0.16em] uppercase cursor-pointer"
                  >
                    <span>EXPLORE RESEARCH REPO</span>
                    <span>→</span>
                  </a>
                </div>
              )}
            </div>

          </div>
        </motion.div>

        {/* Secondary Research Projects if any */}
        {secondaryResearch.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {secondaryResearch.map((res, idx) => (
              <div key={idx} className="editorial-card p-6 rounded-[4px] border border-[#CFC3B3] bg-[#FAF8F3] shadow-sm">
                <span className="text-[10px] font-mono font-bold text-[#78000F] uppercase tracking-wider block mb-1">
                  {res.status}
                </span>
                <h4 className="text-xl font-serif font-bold text-[#111111] mb-2">{res.title}</h4>
                <p className="text-xs text-[#38342E] leading-relaxed mb-4">{res.abstract}</p>
                {res.githubUrl && (
                  <a
                    href={res.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-[#78000F] hover:underline"
                  >
                    VIEW REPO ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ResearchSection;
