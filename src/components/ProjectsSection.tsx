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
      id="work"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-20 pb-32 px-6 sm:px-12 lg:px-20"
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
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-5"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            04 / FEATURED PROJECTS
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448]">
              SELECTED PROJECTS.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
              ENGINEERED SOLUTIONS.
            </span>
          </h2>

          <p
            className="text-xs sm:text-sm font-light text-[#A8988B] max-w-sm mt-4 md:mt-0 leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Hands-on projects solving real backend, cloud infrastructure, containerization, and machine learning problems.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase rounded-sm border transition-all ${
                selectedCategory === cat
                  ? 'border-[#D4AF37] bg-[#1E1914] text-[#F7E7C4] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                  : 'border-[#8C6D4F]/30 bg-[#0E0C0A] text-[#A8988B] hover:border-[#8C6D4F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Cards Stack */}
        <div className="flex flex-col space-y-10 sm:space-y-12">
          {filteredProjects.map((project: Project, idx: number) => {
            const isExpanded = expandedSlug === project.slug;

            return (
              <motion.div
                key={project.slug || project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative w-full rounded-2xl border border-[#8C6D4F]/50 bg-[#0E0C0A] p-8 sm:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.98)] group overflow-hidden transition-colors duration-500 hover:border-[#D4AF37]"
              >
                {/* Top Gold Border Light Flare */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

                {/* Big Watermark Number */}
                <span
                  className="absolute -bottom-6 -right-3 text-8xl sm:text-9xl font-bold text-[#EAD8C7]/5 select-none pointer-events-none leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {project.number}
                </span>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                  
                  {/* Left Column (7 Cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-xs font-mono font-bold text-[#D4AF37]">
                          {project.number} //
                        </span>
                        <span className="text-[10.5px] font-mono tracking-[0.25em] uppercase text-[#A8988B]">
                          {project.category}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 rounded-sm uppercase">
                          {project.status}
                        </span>
                      </div>

                      <h3
                        className="text-4xl sm:text-5xl lg:text-5xl font-normal tracking-tight text-white mb-3 group-hover:text-[#F7E7C4] transition-colors uppercase leading-[0.9]"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {project.title}
                      </h3>

                      <p
                        className="text-xs sm:text-sm font-light text-[#C4B5A5] leading-relaxed mb-6"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      {project.technologies.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[10px] font-mono tracking-wider text-[#EAD8C7] bg-[#1A1511] border border-[#8C6D4F]/30 rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Expand/Collapse Button */}
                    <div className="pt-4">
                      <button
                        onClick={() => toggleExpand(project.slug)}
                        className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-widest uppercase text-[#D4AF37] hover:text-[#FFF5EB] transition-colors"
                      >
                        <span>{isExpanded ? '[ HIDE ENGINEERING DETAILS ]' : '[ EXPLORE ARCHITECTURE DETAILS ]'}</span>
                        <span className="text-xs">{isExpanded ? '↑' : '↓'}</span>
                      </button>
                    </div>

                    {/* Morphing Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="space-y-6 pt-6 border-t border-[#8C6D4F]/30 overflow-hidden"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-4 bg-[#14100C] border border-[#8C6D4F]/20 rounded-sm">
                              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block mb-1">
                                PROBLEM STATEMENT
                              </span>
                              <p className="text-xs text-[#C4B5A5] leading-relaxed">
                                {project.problem}
                              </p>
                            </div>
                            <div className="p-4 bg-[#14100C] border border-[#8C6D4F]/20 rounded-sm">
                              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block mb-1">
                                ARCHITECTURAL SOLUTION
                              </span>
                              <p className="text-xs text-[#C4B5A5] leading-relaxed">
                                {project.solution}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Right Column (5 Cols) — Architecture Metrics */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full bg-[#120F0C] border border-[#8C6D4F]/30 p-6 sm:p-8 rounded-xl space-y-6">
                    <div>
                      <span
                        className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#D4AF37] block mb-4"
                      >
                        // SYSTEM METRICS
                      </span>

                      <div className="space-y-4">
                        {project.architectureMetrics.map((m, i) => (
                          <div key={i} className="flex items-center justify-between border-b border-[#8C6D4F]/20 pb-3">
                            <span className="text-xs font-mono text-[#A8988B] uppercase">{m.label}</span>
                            <span className="text-sm font-mono font-bold text-[#F7E7C4]">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="pt-4 space-y-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center space-x-3 px-6 py-3.5 border border-[#8C6D4F] bg-[#16120E] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#EAD8C7] hover:text-black text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          <span>VIEW CODE ON GITHUB</span>
                          <span className="text-xs">↗</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;