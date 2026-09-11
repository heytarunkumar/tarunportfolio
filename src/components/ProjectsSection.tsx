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
      className="relative w-full bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-16"
    >
      {/* Studio Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

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
            03 / FEATURED PROJECTS &amp; SYSTEMS
          </span>
          <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-5 sm:gap-6"
        >
          <div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-normal leading-[1.15]">
              Selected projects &amp; <span className="italic text-[#D4AF37]">architected systems.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-light text-[#C4BCB3] max-w-sm leading-relaxed">
            Demonstrating applied engineering across intelligent systems, Python REST microservices, automation, and cloud deployments.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-8 sm:mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[10.5px] font-mono tracking-wider uppercase rounded-full border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                  : 'border-[#26211B] bg-[#12100E] text-[#C4BCB3] hover:text-white hover:border-[#D4AF37]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Cards Stack */}
        <div className="flex flex-col space-y-6 sm:space-y-10">
          {filteredProjects.map((project: Project, idx: number) => {
            const isExpanded = expandedSlug === project.slug;

            return (
              <motion.div
                key={project.slug || project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.06 }}
                className="card-lift relative w-full rounded-2xl border border-[#26211B] bg-[#12100E] p-5 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group overflow-hidden"
              >
                {/* Top Gold Border Light Flare */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

                {/* Big Watermark Number */}
                <span className="absolute -bottom-6 -right-3 text-7xl sm:text-9xl font-bold text-white/[0.02] select-none pointer-events-none leading-none font-serif">
                  0{idx + 1}
                </span>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start relative z-10">
                  
                  {/* Left Specs (7 Cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Meta Tags */}
                      <div className="flex flex-wrap items-center gap-2 mb-2.5 sm:mb-3">
                        <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#8C6D4F]">•</span>
                        <span className="text-[10px] font-mono text-[#C4BCB3] uppercase">
                          {project.status || 'COMPLETED'}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-xl sm:text-3xl font-serif font-normal text-white mb-2 sm:mb-3">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13.5px] font-light text-[#C4BCB3] leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                      {(project.technologies || []).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2.5 sm:px-3 py-1 rounded-xl text-[9.5px] sm:text-[10px] font-mono bg-[#0A0908] border border-[#26211B] text-[#E8DFD8]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Interactive CTAs */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 sm:pt-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-mono border border-[#26211B] hover:border-[#D4AF37]/60 bg-[#0A0908] text-white hover:text-[#D4AF37] transition-all cursor-pointer"
                        >
                          <span>GITHUB REPO</span>
                          <span>↗</span>
                        </a>
                      )}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-mono border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-semibold hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
                        >
                          <span>LIVE SYSTEM</span>
                          <span>↗</span>
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleExpand(project.slug)}
                        className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-mono text-[#D4AF37] hover:text-white border border-[#26211B] sm:border-transparent hover:border-[#26211B] bg-[#0A0908] sm:bg-transparent transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? 'COLLAPSE SPECS' : 'VIEW APPROACH'}</span>
                        <span>{isExpanded ? '↑' : '↓'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Metrics & Architecture Highlights (5 Cols) */}
                  <div className="lg:col-span-5 rounded-xl border border-[#26211B] bg-[#0A0908] p-5 sm:p-6 font-mono text-xs">
                    <div className="text-[10px] text-[#D4AF37] uppercase tracking-widest mb-3 pb-2 border-b border-[#26211B]">
                      // SYSTEM METRICS &amp; ARCHITECTURE
                    </div>

                    <div className="space-y-3">
                      {(project.architectureMetrics || []).map((metric, i) => (
                        <div key={i} className="flex items-center justify-between py-1 border-b border-[#26211B]/50 last:border-0">
                          <span className="text-[10px] text-[#8C6D4F] uppercase">{metric.label}</span>
                          <span className="text-white text-[11px] font-sans font-medium">{metric.value}</span>
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
                      className="mt-6 pt-6 border-t border-[#26211B] text-xs font-sans"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0A0908] p-5 rounded-xl border border-[#26211B]">
                        <div>
                          <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block mb-1.5">
                            PROBLEM STATEMENT &amp; OBJECTIVE
                          </span>
                          <p className="text-[#C4BCB3] text-xs font-light leading-relaxed">
                            {project.problem || 'Designed and developed to resolve performance bottlenecks and provide resilient backend services.'}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block mb-1.5">
                            ENGINEERING ARCHITECTURE &amp; IMPACT
                          </span>
                          <p className="text-[#C4BCB3] text-xs font-light leading-relaxed">
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