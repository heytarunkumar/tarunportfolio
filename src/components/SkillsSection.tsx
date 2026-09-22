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
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 0.61, 0.36, 1],
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
      className="relative w-full bg-[#F4EEE4] text-[#202020] font-sans selection:bg-[#78000F] selection:text-[#F4EEE4] py-20 sm:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 overflow-hidden"
    >
      <div className="max-w-[1760px] mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="flex items-center space-x-4 mb-6 sm:mb-8"
        >
          <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F]">
            02 / TECHNOLOGIES I WORK WITH
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#78000F]/60 via-[#CFC3B3] to-transparent max-w-xs" />
        </motion.div>

        {/* Section Title & Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="mb-10 sm:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111111] leading-[1.08] tracking-[-0.03em]">
              Technologies I Work With.
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#736B60] mt-2 uppercase tracking-[0.16em]">
              CORE ARCHITECTURES · PRODUCTION STACKS · EXPERIMENTAL LABS
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-[11px]">
            {(['all', 'core', 'building', 'applied'] as const).map((cat) => {
              const label =
                cat === 'all'
                  ? 'ALL STACKS'
                  : cat === 'core'
                  ? 'CORE PRODUCTION'
                  : cat === 'building'
                  ? 'CURRENTLY BUILDING'
                  : 'APPLIED & RESEARCH';
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 uppercase tracking-wider transition-all duration-300 border rounded-[3px] cursor-pointer ${
                    isActive
                      ? 'border-[#78000F] bg-[#78000F] text-white font-bold shadow-sm'
                      : 'border-[#CFC3B3] bg-[#FAF8F3] text-[#38342E] hover:text-[#78000F] hover:border-[#78000F]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Grid: Interactive Detail Panel (Left 4 cols) + Tech Groups (Right 8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT: Skill Detail Inspector Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="editorial-card lg:col-span-4 lg:sticky lg:top-28 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] p-6 shadow-md font-mono text-xs text-[#202020] relative overflow-hidden"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#DDD2C2]">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#78000F] animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-[#78000F] uppercase">
                  SKILL INSPECTOR
                </span>
              </div>
              <span className="text-[9.5px] text-[#8C8275] uppercase font-semibold">
                {activeSkill.category}
              </span>
            </div>

            {/* Selected Skill Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkill.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                <div>
                  <span className="text-2xl font-serif font-bold text-[#111111] block mb-1.5">
                    {activeSkill.name}
                  </span>
                  <div className={`inline-block px-2.5 py-0.5 border text-[9.5px] uppercase rounded-[2px] font-semibold ${
                    activeSkill.category === 'building'
                      ? 'border-[#CFC3B3] bg-[#F4EEE4] text-[#78000F]'
                      : 'border-[#B5DFCA] bg-[#E8F5EE] text-[#0F6848]'
                  }`}>
                    STATUS: {activeSkill.status}
                  </div>
                </div>

                <p className="text-[#38342E] text-[13px] font-sans font-normal leading-relaxed">
                  {activeSkill.description}
                </p>

                {/* Related Projects Linkage */}
                <div className="pt-3.5 border-t border-[#DDD2C2]">
                  <span className="text-[9.5px] text-[#8C8275] tracking-widest uppercase font-bold block mb-2">
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
                            className="block p-3 rounded-[3px] border border-[#DDD2C2] bg-[#FAF8F3] hover:border-[#78000F] hover:bg-[#F4EEE4] transition-all group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[12px] text-[#111111] group-hover:text-[#78000F] font-sans font-semibold">
                                {proj.title}
                              </span>
                              <span className="text-[10px] text-[#78000F]">↗</span>
                            </div>
                            <span className="text-[10px] text-[#736B60] block mt-0.5">
                              {proj.category} · {proj.status}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-[11px] text-[#736B60] italic">
                      Active hands-on progression in Engineering Lab track.
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* RIGHT: Editorial Catalog Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-8 grid grid-cols-1 gap-6"
          >
            {filteredGroups.map((block, bIdx) => {
              const isLearningTrack = block.category === 'building';

              return (
                <motion.div
                  key={block.id}
                  variants={cardVariants}
                  className={`editorial-card p-6 sm:p-7 rounded-[4px] border ${
                    isLearningTrack 
                      ? 'border-[#78000F]/40 bg-[#FAF8F3] shadow-md' 
                      : 'border-[#CFC3B3] bg-[#FAF8F3] shadow-sm'
                  }`}
                >
                  {/* Header Badge & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-[#78000F]">0{bIdx + 1}</span>
                      <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#78000F] font-semibold">
                        {block.badge}
                      </span>
                    </div>
                    <span className={`text-[9.5px] font-mono px-2 py-0.5 border rounded-[2px] uppercase font-semibold ${
                      isLearningTrack
                        ? 'border-[#78000F]/30 bg-[#F4EEE4] text-[#78000F]'
                        : 'border-[#B5DFCA] bg-[#E8F5EE] text-[#0F6848]'
                    }`}>
                      {block.statusText}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] mb-2">
                    {block.title}
                  </h3>

                  <p className="text-xs text-[#38342E] font-normal leading-relaxed mb-4 max-w-2xl">
                    {block.description}
                  </p>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[#DDD2C2]">
                    {block.skills.map((tech) => {
                      const isSelected = activeSkill.id === tech.id;
                      const isBuilding = tech.category === 'building';

                      return (
                        <button
                          key={tech.id}
                          onClick={() => setSelectedSkill(tech)}
                          onMouseEnter={() => setSelectedSkill(tech)}
                          onFocus={() => setSelectedSkill(tech)}
                          className={`px-3 py-1.5 text-[11px] font-mono font-medium tracking-wide rounded-[3px] border text-left transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'border-[#78000F] bg-[#78000F] text-white font-bold shadow-sm'
                              : isBuilding
                              ? 'border-[#DDD2C2] bg-[#F4EEE4] text-[#78000F] hover:border-[#78000F]'
                              : 'border-[#CFC3B3] bg-[#FAF8F3] text-[#202020] hover:border-[#78000F] hover:text-[#78000F]'
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