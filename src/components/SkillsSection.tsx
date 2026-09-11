import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import type { SkillItem, SkillCategory } from '../data/skills';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const SkillsSection: React.FC = () => {
  const { skills: contextSkills, projects: contextProjects } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<'all' | SkillCategory>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const skillsData = contextSkills || [];
  const projectsData = contextProjects || [];

  // Flatten all skills for quick lookup
  const allSkills = skillsData.flatMap((group) => group.skills);

  // Filter skills based on category tab
  const filteredGroups = skillsData
    .map((group) => {
      if (activeCategory === 'all') return group;
      const matchingSkills = group.skills.filter((s) => s.category === activeCategory);
      if (matchingSkills.length === 0) return null;
      return { ...group, skills: matchingSkills };
    })
    .filter((g): g is typeof skillsData[0] => g !== null);

  const activeSkill = selectedSkill || allSkills[0];

  return (
    <section
      id="skills"
      className="relative w-full bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden flex flex-col justify-center"
    >
      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[34rem] h-[34rem] bg-[#D4AF37]/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] bg-[#8C6D4F]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-4 mb-6"
        >
          <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D4AF37]">
            02 / TECHNICAL ECOSYSTEM
          </span>
          <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Header & Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6"
        >
          <div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-normal leading-[1.15]">
              Technical stack &amp; <span className="italic text-[#D4AF37]">learning roadmap.</span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[9.5px] sm:text-[10.5px]">
            {(['all', 'core', 'building', 'applied'] as const).map((cat) => {
              const label =
                cat === 'all'
                  ? 'ALL STACKS'
                  : cat === 'core'
                  ? 'CORE PRODUCTION'
                  : cat === 'building'
                  ? 'CURRENTLY EXPLORING'
                  : 'APPLIED & RESEARCH';
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 sm:px-3.5 py-1.5 uppercase tracking-wider transition-all duration-300 border rounded-full cursor-pointer ${
                    isActive
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                      : 'border-[#26211B] bg-[#12100E] text-[#C4BCB3] hover:text-white hover:border-[#D4AF37]/50'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Grid: Interactive Detail Panel (Left 4 cols) + Tech Groups (Right 8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Interactive Skill Detail Inspector Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-lift lg:col-span-4 lg:sticky lg:top-28 rounded-2xl border border-[#26211B] bg-[#12100E]/95 p-5 sm:p-7 shadow-2xl font-mono text-xs text-[#F5F2EB] relative overflow-hidden backdrop-blur-md"
          >
            {/* Header Status Bar */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#26211B]">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase">
                  SKILL INSPECTOR
                </span>
              </div>
              <span className="text-[9.5px] text-[#8C6D4F] uppercase">
                {activeSkill.category}
              </span>
            </div>

            {/* Selected Skill Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                <div>
                  <span className="text-xl sm:text-2xl font-serif font-normal text-white block mb-1.5">
                    {activeSkill.name}
                  </span>
                  <div className={`inline-block px-2.5 py-0.5 border text-[10px] uppercase rounded-full ${
                    activeSkill.category === 'building'
                      ? 'border-amber-500/40 bg-amber-950/30 text-amber-300'
                      : 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                  }`}>
                    STATUS: {activeSkill.status}
                  </div>
                </div>

                <p className="text-[#C4BCB3] text-[13px] font-sans font-light leading-relaxed">
                  {activeSkill.description}
                </p>

                {/* Related Projects Linkage */}
                <div className="pt-3.5 border-t border-[#26211B]">
                  <span className="text-[10px] text-[#8C6D4F] tracking-widest uppercase block mb-2.5">
                    DEMONSTRATED IN PROJECTS ({activeSkill.relatedProjects.length})
                  </span>
                  {activeSkill.relatedProjects.length > 0 ? (
                    <div className="space-y-2">
                      {activeSkill.relatedProjects.map((slug) => {
                        const proj = projectsData.find((p) => p.slug === slug);
                        if (!proj) return null;
                        return (
                          <a
                            key={slug}
                            href="#projects"
                            className="block p-3 rounded-xl border border-[#26211B] bg-[#0A0908] hover:border-[#D4AF37]/50 hover:bg-[#16130F] transition-all group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[12px] text-[#F5F2EB] group-hover:text-[#D4AF37] font-sans font-medium">
                                {proj.title}
                              </span>
                              <span className="text-[10px] text-[#8C6D4F] group-hover:text-[#D4AF37]">↗</span>
                            </div>
                            <span className="text-[10px] text-[#8C6D4F] block mt-0.5">
                              {proj.category} · {proj.status}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-[11px] text-[#8C6D4F] italic">
                      Active hands-on progression in Engineering Lab track.
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* RIGHT: Bento Grid Skill Blocks */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {filteredGroups.map((block) => {
              const isLearningTrack = block.category === 'building';

              return (
                <motion.div
                  key={block.id}
                  variants={cardVariants}
                  className="card-lift md:col-span-12 relative p-6 sm:p-7 rounded-2xl border border-[#26211B] bg-[#12100E] backdrop-blur-xl overflow-hidden group"
                >
                  {/* Top Subtle Flare */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

                  {/* Header Badge & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37]">
                      {block.badge}
                    </span>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 border rounded-full uppercase ${
                      isLearningTrack
                        ? 'border-amber-500/40 bg-amber-950/30 text-amber-300 font-medium'
                        : 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300 font-medium'
                    }`}>
                      {block.statusText}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-normal text-white mb-2">
                    {block.title}
                  </h3>

                  <p className="text-xs text-[#C4BCB3] font-light leading-relaxed mb-5">
                    {block.description}
                  </p>

                  {/* Interactive Skill Badges */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[#26211B]">
                    {block.skills.map((tech) => {
                      const isSelected = activeSkill.id === tech.id;
                      const isBuilding = tech.category === 'building';

                      return (
                        <button
                          key={tech.id}
                          onClick={() => setSelectedSkill(tech)}
                          onMouseEnter={() => setSelectedSkill(tech)}
                          onFocus={() => setSelectedSkill(tech)}
                          className={`px-3.5 py-2 text-[11px] font-medium tracking-wide rounded-xl border text-left transition-all duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                            isSelected
                              ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                              : isBuilding
                              ? 'border-amber-500/30 bg-amber-950/20 text-amber-200 hover:border-amber-400 hover:bg-amber-950/40'
                              : 'border-[#26211B] bg-[#0A0908] text-[#F5F2EB] hover:border-[#D4AF37]/50 hover:bg-[#16130F]'
                          }`}
                        >
                          <span>{tech.name}</span>
                          {tech.relatedProjects.length > 0 && (
                            <span className="ml-1.5 opacity-60 text-[9.5px]">({tech.relatedProjects.length})</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default SkillsSection;