import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export const ExperienceSection: React.FC = () => {
  const { experience: contextExperience } = usePortfolio();
  const experienceData = (contextExperience || []).filter((item) => item.visible !== false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-[#F4EEE4] text-[#202020] font-sans selection:bg-[#78000F] selection:text-[#F4EEE4] py-20 sm:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="flex items-center space-x-4 mb-6 sm:mb-8"
        >
          <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F]">
            04 / EXPERIENCE &amp; LEADERSHIP
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#78000F]/60 via-[#CFC3B3] to-transparent max-w-xs" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111111] leading-[1.08] tracking-[-0.03em]">
            Venture &amp; Leadership <span className="text-[#78000F] italic">Milestones.</span>
          </h2>
        </motion.div>

        {/* Route Map Timeline */}
        <div className="relative w-full">
          
          {/* Track Line */}
          <div className="absolute left-[14px] md:left-[140px] top-4 bottom-8 w-[1px] bg-[#CFC3B3]" />
          
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[14px] md:left-[140px] top-4 w-[2px] bg-gradient-to-b from-[#78000F] via-[#78000F]/80 to-[#78000F]/20 origin-top"
          />

          <div className="space-y-10 sm:space-y-12">
            {experienceData.map((item, idx) => {
              return (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
                  className="relative flex flex-col md:flex-row items-start group"
                >
                  {/* Year Label */}
                  <div className="hidden md:block w-[140px] shrink-0 pr-8 pt-0.5 text-right">
                    <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#78000F] group-hover:text-[#111111] transition-colors">
                      {item.year}
                    </span>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-[14px] md:left-[140px] top-1.5 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FAF8F3] border-2 border-[#78000F] group-hover:bg-[#78000F] transition-colors duration-300 shadow-sm" />
                  </div>

                  {/* Content Card */}
                  <div className="ml-9 md:ml-10 pl-1 sm:pl-2 w-full">
                    <div className="md:hidden mb-1.5">
                      <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#78000F]">
                        {item.year}
                      </span>
                    </div>

                    <div className="editorial-card p-5 sm:p-7 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <h3 className="text-lg sm:text-xl font-serif font-bold text-[#111111]">
                          {item.role}
                        </h3>
                        <span className="text-xs font-mono text-[#78000F] font-semibold">
                          {item.organization}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-normal text-[#38342E] leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {item.responsibilities && item.responsibilities.length > 0 && (
                        <div className="mb-4">
                          <ul className="space-y-1.5 text-xs text-[#555047] list-disc list-inside">
                            {item.responsibilities.map((resp, rIdx) => (
                              <li key={rIdx}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech Tags */}
                      {item.technologies && item.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#DDD2C2]">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-[2px] text-[9.5px] font-mono bg-[#F4EEE4] border border-[#DDD2C2] text-[#202020] font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
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