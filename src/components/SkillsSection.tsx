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
      className="relative w-full bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37] selection:text-black pt-8 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-center"
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
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-7"
        >
          <span
            className="text-[11px] font-semibold tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            02 / TECHNICAL ECOSYSTEM
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#E8E3D8] to-[#7A6E62]">
                TECHNICAL STACK.
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#634824]">
                SKILL &amp; LEARNING ROADMAP.
              </span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10.5px]">
            {(['all', 'core', 'building', 'applied'] as const).map((cat) => {
              const label =
                cat === 'all'
                  ? 'ALL'
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
                  className={`px-3.5 py-1.5 uppercase tracking-widest transition-all duration-300 border rounded-sm ${
                    isActive
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                      : 'border-[#8C6D4F]/30 bg-[#12100E] text-[#C4BCB3] hover:text-white hover:border-[#D4AF37]/60'
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
            className="card-lift lg:col-span-4 lg:sticky lg:top-28 rounded-sm border border-[#8C6D4F]/35 bg-[#12100E]/95 p-6 shadow-2xl font-mono text-xs text-[#F5F2EB] relative overflow-hidden backdrop-blur-md"
          >
            {/* Header Status Bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#8C6D4F]/25">
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
                  <span className="text-2xl font-bold tracking-tight text-white block mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {activeSkill.name}
                  </span>
                  <div className={`inline-block px-2 py-0.5 border text-[10px] uppercase rounded-sm ${
                    activeSkill.category === 'building'
                      ? 'border-amber-500/40 bg-amber-950/30 text-amber-300'
                      : 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                  }`}>
                    STATUS: {activeSkill.status}
                  </div>
                </div>

                <p className="text-[#C4BCB3] text-[12px] font-sans font-light leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {activeSkill.description}
                </p>

                {/* Related Projects Linkage */}
                <div className="pt-3 border-t border-[#8C6D4F]/20">
                  <span className="text-[10px] text-[#8C6D4F] tracking-widest uppercase block mb-2">
                    DEMONSTRATED PROJECTS ({activeSkill.relatedProjects.length})
                  </span>
                  {activeSkill.relatedProjects.length > 0 ? (
                    <div className="space-y-2">
                      {activeSkill.relatedProjects.map((slug) => {
                        const proj = projectsData.find((p) => p.slug === slug);
                        if (!proj) return null;
                        return (
                          <a
                            key={slug}
                            href="#work"
                            className="block p-2.5 rounded-sm border border-[#8C6D4F]/25 bg-[#1A1714] hover:border-[#D4AF37] hover:bg-[#221D18] transition-all group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-[#F5F2EB] group-hover:text-[#D4AF37] font-medium">
                                {proj.title}
                              </span>
                              <span className="text-[10px] text-[#8C6D4F] group-hover:text-[#D4AF37]">↗</span>
                            </div>
                            <span className="text-[9.5px] text-[#8C6D4F] block mt-0.5">
                              {proj.category} · {proj.status}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-[10.5px] text-[#8C6D4F] italic">
                      Hands-on practice in active Engineering Lab learning track.
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
                  className="card-lift md:col-span-12 relative p-7 rounded-sm border border-[#8C6D4F]/30 bg-[#12100E] backdrop-blur-xl overflow-hidden group"
                >
                  {/* Top Subtle Flare */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

                  {/* Header Badge & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37]">
                      {block.badge}
                    </span>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 border rounded-sm uppercase ${
                      isLearningTrack
                        ? 'border-amber-500/40 bg-amber-950/30 text-amber-300 font-medium'
                        : 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300 font-medium'
                    }`}>
                      {block.statusText}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl sm:text-3xl font-normal tracking-wide text-white mb-2"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {block.title}
                  </h3>

                  <p
                    className="text-xs text-[#C4BCB3] font-light leading-relaxed mb-5"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {block.description}
                  </p>

                  {/* Interactive Skill Badges */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[#8C6D4F]/20">
                    {block.skills.map((tech) => {
                      const isSelected = activeSkill.id === tech.id;
                      const isBuilding = tech.category === 'building';

                      return (
                        <button
                          key={tech.id}
                          onClick={() => setSelectedSkill(tech)}
                          onMouseEnter={() => setSelectedSkill(tech)}
                          onFocus={() => setSelectedSkill(tech)}
                          className={`px-3.5 py-1.5 text-[10.5px] font-medium tracking-[0.16em] uppercase rounded-sm border text-left transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] ${
                            isSelected
                              ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                              : isBuilding
                              ? 'border-amber-500/30 bg-amber-950/20 text-amber-200 hover:border-amber-400 hover:bg-amber-950/40'
                              : 'border-[#8C6D4F]/30 bg-[#1A1714] text-[#F5F2EB] hover:border-[#D4AF37]/50 hover:bg-[#221D18]'
                          }`}
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          <span>{tech.name}</span>
                          {tech.relatedProjects.length > 0 && (
                            <span className="ml-1.5 opacity-60 text-[9px]">({tech.relatedProjects.length})</span>
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