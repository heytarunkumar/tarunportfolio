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
      className="relative w-full bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white py-20 sm:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-4 mb-6 sm:mb-8"
        >
          <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D4AF37]">
            04 / EXPERIENCE &amp; LEADERSHIP
          </span>
          <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.08] tracking-tight">
            Venture &amp; Leadership <span className="italic text-[#D4AF37]">Milestones.</span>
          </h2>
        </motion.div>

        {/* Route Map Timeline */}
        <div className="relative w-full">
          
          {/* Track Line */}
          <div className="absolute left-[14px] md:left-[140px] top-4 bottom-8 w-[1px] bg-[#26211B]" />
          
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[14px] md:left-[140px] top-4 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/80 to-[#D4AF37]/20 origin-top"
          />

          <div className="space-y-8 sm:space-y-12">
            {experienceData.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="relative flex flex-col md:flex-row items-start md:items-baseline gap-6 md:gap-12 pl-10 md:pl-0"
              >
                {/* Year Marker */}
                <div className="md:w-[120px] shrink-0 md:text-right font-mono text-xs sm:text-sm text-[#D4AF37] font-semibold tracking-wider">
                  {item.year}
                </div>

                {/* Node Pill */}
                <div className="absolute left-[9px] md:left-[135px] top-1.5 w-3 h-3 rounded-full bg-[#D4AF37] border-2 border-[#0A0908] ring-4 ring-[#12100E] shadow-[0_0_10px_rgba(212,175,55,0.4)]" />

                {/* Card Detail */}
                <div className="flex-1 card-lift p-6 sm:p-7 rounded-2xl border border-[#26211B] bg-[#12100E] w-full">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">
                      {item.organization}
                    </span>
                    <span className="text-[10px] font-mono text-[#8C6D4F] uppercase">
                      {item.location}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif text-white font-normal mb-3">
                    {item.role}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#C4BCB3] font-light leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Responsibilities List */}
                  {item.responsibilities && item.responsibilities.length > 0 && (
                    <ul className="space-y-1.5 pt-2 border-t border-[#26211B] text-xs text-[#E8DFD8]">
                      {item.responsibilities.map((resp: string, rIdx: number) => (
                        <li key={rIdx} className="flex items-start space-x-2">
                          <span className="text-[#D4AF37] font-bold">›</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Technologies */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-4">
                      {item.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-[#0A0908] border border-[#26211B] text-[#A8988B]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;