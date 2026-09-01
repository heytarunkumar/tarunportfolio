import React from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '../data/experience';

export const ExperienceSection: React.FC = () => {
  return (
    <section 
      id="experience" 
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-[#05060A] text-[#F1F5F9] font-sans border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xs font-mono font-semibold uppercase text-cyan-400 tracking-widest">
                06 // MILESTONES &amp; EDUCATION
              </span>
              <div className="w-16 h-[1px] bg-gradient-to-r from-cyan-500/80 to-transparent" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Experience &amp; Background
            </h2>
          </div>

          <p className="text-sm text-slate-400 max-w-md mt-4 md:mt-0 font-normal">
            Academic milestones, independent engineering projects, and research activities.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="space-y-6">
          {experienceData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      {item.year}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        item.isVerified
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {item.isVerified ? 'VERIFIED' : 'PLACEHOLDER'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    {item.role}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    {item.organization} {item.location ? `· ${item.location}` : ''}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 font-normal leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Responsibilities */}
              <ul className="space-y-1.5 mb-6 text-xs text-slate-300 font-sans">
                {item.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-cyan-400 font-bold">›</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-900 border border-white/10 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;