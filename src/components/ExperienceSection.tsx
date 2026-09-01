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
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#D4AF37]/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-7"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            06 / EXPERIENCE &amp; MILESTONES
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448]">
              ENGINEERING ROADMAP &amp;
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
              MILESTONES.
            </span>
          </h2>
        </motion.div>

        {/* Route Map Timeline */}
        <div className="relative w-full">
          
          {/* Track Line */}
          <div className="absolute left-[19px] md:left-[140px] top-4 bottom-8 w-[1px] bg-[#8C6D4F]/20" />
          
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[19px] md:left-[140px] top-4 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#C99E5D] to-[#8C6D4F]/10 origin-top"
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
                  transition={{ duration: 0.7, delay: idx * 0.08 }}
                  className="relative flex flex-col md:flex-row items-start group"
                >
                  {/* Year Label */}
                  <div className="hidden md:block w-[140px] shrink-0 pr-8 pt-0.5 text-right">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors">
                      {item.year}
                    </span>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-[19px] md:left-[140px] top-1.5 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#120F0C] border border-[#8C6D4F] group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="ml-14 md:ml-12 pl-2 w-full">
                    <div className="md:hidden mb-1.5">
                      <span className="text-[10px] font-mono tracking-[0.2em] text-[#D4AF37]">
                        {item.year}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center space-x-2 mb-1">
                      <h3
                        className="text-3xl sm:text-4xl tracking-wide text-white group-hover:text-[#F7E7C4] transition-colors leading-none"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {item.role}
                      </h3>
                      {!item.isVerified && (
                        <span className="text-[9px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 border border-amber-500/30 rounded-sm">
                          VERIFY
                        </span>
                      )}
                    </div>
                    
                    <span 
                      className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2"
                    >
                      {item.organization}
                    </span>
                    
                    <p 
                      className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-[1.7] max-w-lg mb-3"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {item.description}
                    </p>

                    {/* Morphing Toggle for Responsibilities */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      className="inline-flex items-center space-x-2 text-[10px] font-mono text-[#D4AF37] hover:underline uppercase mb-3 focus:outline-none"
                    >
                      <span>{isExpanded ? '[- HIDE RESPONSIBILITIES & CONTRIBUTIONS]' : '[+ VIEW RESPONSIBILITIES & CONTRIBUTIONS]'}</span>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="mb-4 pl-3 border-l border-[#8C6D4F]/30 space-y-1.5 overflow-hidden"
                        >
                          <span className="text-[9.5px] font-mono text-[#8C6D4F] uppercase block mb-1">
                            KEY RESPONSIBILITIES &amp; SCOPE:
                          </span>
                          {(item.responsibilities || []).map((resp, i) => (
                            <p key={i} className="text-xs text-[#C4B5A5] font-light flex items-start space-x-2">
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
                          className="px-2 py-0.5 text-[9.5px] font-mono rounded-sm border border-[#8C6D4F]/25 bg-[#120F0C] text-[#C4B5A5]"
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