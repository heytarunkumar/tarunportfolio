import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data/skills';

export const SkillsSection: React.FC = () => {
  return (
    <section 
      id="skills" 
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-[#05060A] text-[#F1F5F9] font-sans border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xs font-mono font-semibold uppercase text-cyan-400 tracking-widest">
                02 // TECHNICAL COMPETENCIES
              </span>
              <div className="w-16 h-[1px] bg-gradient-to-r from-cyan-500/80 to-transparent" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Skills &amp; Technology Stack
            </h2>
          </div>

          <p className="text-sm text-slate-400 max-w-md mt-4 md:mt-0 font-normal">
            Categorized technical capabilities mapped into core expertise, active cloud infrastructure learning, and applied AI tools.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((group, idx) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <span className="text-sm font-bold text-white font-heading">
                    {group.title}
                  </span>
                  <span className="text-xs font-mono text-cyan-400">
                    [{group.skills.length}]
                  </span>
                </div>

                {/* Skills List */}
                <div className="space-y-2.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span className="text-xs font-medium text-slate-200 font-sans">
                          {skill.name}
                        </span>
                      </div>

                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                          skill.category === 'core'
                            ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'
                            : skill.category === 'building'
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {skill.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Note */}
              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>{group.badge}</span>
                <span className="text-cyan-400">{group.statusText}</span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;