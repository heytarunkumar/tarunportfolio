import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export const ExperienceSection: React.FC = () => {
  const { experience: contextExperience } = usePortfolio();
  const experienceData = (contextExperience || []).filter((item) => item.visible !== false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#D4AF37]/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-4 mb-6"
        >
          <span className="text-[11px] font-mono font-medium tracking-[0.3em] uppercase text-[#D4AF37]">
            06 / EXPERIENCE &amp; MILESTONES
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-normal leading-[1.15]">
            Venture &amp; leadership <span className="italic text-[#D4AF37]">milestones.</span>
          </h2>
        </motion.div>

        {/* Route Map Timeline */}
        <div className="relative w-full">
          
          {/* Track Line */}
          <div className="absolute left-[19px] md:left-[140px] top-4 bottom-8 w-[1px] bg-[#26211B]" />
          
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[19px] md:left-[140px] top-4 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#C99E5D] to-[#8C6D4F]/20 origin-top"
          />

          <div className="space-y-12">
            {experienceData.map((item, idx) => {
              const isExpanded = expandedId === item.id;

              return (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="relative flex flex-col md:flex-row items-start group"
                >
                  {/* Year Label */}
                  <div className="hidden md:block w-[140px] shrink-0 pr-8 pt-0.5 text-right">
                    <span className="text-[11px] font-mono tracking-[0.2em] text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors">
                      {item.year}
                    </span>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-[19px] md:left-[140px] top-1.5 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#12100E] border border-[#8C6D4F] group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="ml-12 md:ml-10 pl-2 w-full">
                    <div className="md:hidden mb-1.5">
                      <span className="text-[10px] font-mono tracking-[0.2em] text-[#D4AF37]">
                        {item.year}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      {item.logoUrl && (
                        <img
                          src={item.logoUrl}
                          alt={item.organization}
                          className="w-7 h-7 object-contain rounded-lg bg-[#0A0908] border border-[#26211B] p-0.5"
                        />
                      )}
                      <h3 className="text-xl sm:text-2xl font-serif font-normal text-white group-hover:text-[#F7E7C4] transition-colors leading-tight">
                        {item.role}
                      </h3>
                      {!item.isVerified && (
                        <span className="text-[9.5px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 border border-amber-500/30 rounded-md">
                          VERIFY
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono tracking-[0.18em] uppercase text-[#D4AF37]">
                        {item.organization}
                      </span>
                      {item.tagline && (
                        <span className="text-[9.5px] font-mono text-[#8C6D4F] border border-[#26211B] px-2 py-0.5 rounded-md bg-[#12100E]">
                          &quot;{item.tagline}&quot;
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs sm:text-[13.5px] font-light text-[#C4BCB3] leading-[1.7] max-w-xl mb-3">
                      {item.description}
                    </p>

                    {/* Morphing Toggle for Responsibilities */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      className="inline-flex items-center space-x-1.5 text-[10.5px] font-mono text-[#D4AF37] hover:underline uppercase mb-3 focus:outline-none cursor-pointer"
                    >
                      <span>{isExpanded ? '[- HIDE DETAILS]' : '[+ VIEW KEY CONTRIBUTIONS]'}</span>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="mb-4 pl-3.5 border-l-2 border-[#D4AF37]/50 space-y-1.5 overflow-hidden"
                        >
                          <span className="text-[10px] font-mono text-[#8C6D4F] uppercase block mb-1">
                            KEY SCOPE &amp; CONTRIBUTIONS:
                          </span>
                          {(item.responsibilities || []).map((resp, i) => (
                            <p key={i} className="text-xs text-[#E8E3D8] font-light flex items-start space-x-2">
                              <span className="text-[#D4AF37]">›</span>
                              <span>{resp}</span>
                            </p>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-wrap gap-1.5">
                      {(item.technologies || []).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 text-[10px] font-mono rounded-lg border border-[#26211B] bg-[#12100E] text-[#C4BCB3]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;