import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { type Project } from '../data/projects';

const categories = ['ALL', 'Python / Backend', 'DevOps', 'Cloud', 'AI / ML'] as const;

export const ProjectsSection: React.FC = () => {
  const { projects: contextProjects } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const projectsData = (contextProjects || []).filter((p) => p.visible !== false);

  const filteredProjects = selectedCategory === 'ALL'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  const toggleExpand = (slug: string) => {
    setExpandedSlug(expandedSlug === slug ? null : slug);
  };

  return (
    <section
      id="projects"
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
            03 / CASE STUDIES &amp; ARCHITECTED SYSTEMS
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#78000F]/60 via-[#CFC3B3] to-transparent max-w-xs" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111111] leading-[1.08] tracking-[-0.03em]">
              Case Studies &amp; <span className="text-[#78000F] italic">Systems.</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#736B60] mt-2 uppercase tracking-[0.16em]">
              PRODUCTION PIPELINES · RESEARCH IMPLEMENTATIONS · AUTOMATION
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-[11px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 uppercase tracking-wider rounded-[3px] border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'border-[#78000F] bg-[#78000F] text-white font-bold shadow-sm'
                    : 'border-[#CFC3B3] bg-[#FAF8F3] text-[#38342E] hover:text-[#78000F] hover:border-[#78000F]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Cards Stack - Case Study Format */}
        <div className="flex flex-col space-y-8">
          {filteredProjects.map((project: Project, idx: number) => {
            const isExpanded = expandedSlug === project.slug;

            return (
              <motion.div
                key={project.slug || project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.22, 0.61, 0.36, 1] }}
                className="editorial-card relative w-full rounded-[4px] border border-[#CFC3B3] bg-[#FAF8F3] p-6 sm:p-10 shadow-sm group overflow-hidden"
              >
                {/* Subtle top rule */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#78000F] via-[#CFC3B3] to-transparent" />

                {/* Big Watermark Number */}
                <span className="absolute top-4 right-6 text-6xl sm:text-8xl font-serif font-bold text-[#78000F]/[0.06] select-none pointer-events-none leading-none">
                  0{idx + 1}
                </span>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                  
                  {/* Left Specs (7 Cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Meta Tags */}
                      <div className="flex flex-wrap items-center gap-2 mb-2.5">
                        <span className="text-[10px] font-mono tracking-widest text-[#78000F] uppercase font-bold">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#8C8275]">•</span>
                        <span className="text-[10px] font-mono text-[#555047] uppercase font-medium">
                          {project.status || 'COMPLETED'}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#111111] mb-3 group-hover:text-[#78000F] transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm font-normal text-[#38342E] leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {(project.technologies || []).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-[2px] text-[10px] font-mono bg-[#F4EEE4] border border-[#DDD2C2] text-[#202020] font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Interactive CTAs */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-3">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-executive-primary inline-flex items-center justify-center space-x-2 px-5 py-2.5 text-xs font-mono tracking-[0.16em] uppercase cursor-pointer"
                        >
                          <span>LIVE SYSTEM</span>
                          <span className="text-sm">→</span>
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-executive-secondary inline-flex items-center justify-center space-x-2 px-4 py-2.5 text-xs font-mono tracking-[0.16em] uppercase cursor-pointer"
                        >
                          <span>GITHUB REPO</span>
                          <span className="text-xs">↗</span>
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleExpand(project.slug)}
                        className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 text-xs font-mono text-[#78000F] font-bold hover:underline cursor-pointer"
                      >
                        <span>{isExpanded ? 'HIDE SPECS' : 'VIEW APPROACH'}</span>
                        <span>{isExpanded ? '↑' : '↓'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Metrics & Architecture Highlights (5 Cols) */}
                  <div className="lg:col-span-5 rounded-[4px] border border-[#DDD2C2] bg-[#F4EEE4] p-5 sm:p-6 font-mono text-xs shadow-inner">
                    <div className="text-[10px] text-[#78000F] uppercase tracking-widest mb-3 pb-2 border-b border-[#DDD2C2] font-bold">
                      // SYSTEM METRICS &amp; ARCHITECTURE
                    </div>

                    <div className="space-y-2.5">
                      {(project.architectureMetrics || []).map((metric, i) => (
                        <div key={i} className="flex items-center justify-between py-1 border-b border-[#DDD2C2]/60 last:border-0">
                          <span className="text-[10px] text-[#8C8275] uppercase">{metric.label}</span>
                          <span className="text-[#111111] text-[11px] font-sans font-semibold">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Expandable Technical Deep-Dive */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-[#DDD2C2] text-xs font-sans"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F4EEE4] p-5 rounded-[4px] border border-[#DDD2C2]">
                        <div>
                          <span className="text-[10px] font-mono text-[#78000F] uppercase tracking-widest font-bold block mb-1.5">
                            PROBLEM STATEMENT &amp; OBJECTIVE
                          </span>
                          <p className="text-[#38342E] text-xs font-normal leading-relaxed">
                            {project.problem || 'Designed and developed to resolve performance bottlenecks and provide resilient backend services.'}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[#78000F] uppercase tracking-widest font-bold block mb-1.5">
                            ENGINEERING ARCHITECTURE &amp; IMPACT
                          </span>
                          <p className="text-[#38342E] text-xs font-normal leading-relaxed">
                            {project.solution || 'Employed clean modular architecture with automated pipelines and validated unit coverage.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;