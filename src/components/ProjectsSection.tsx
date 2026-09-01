import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'python' | 'devops' | 'ai'>('all');

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'python') return p.category === 'Python / Backend';
    if (activeFilter === 'devops') return p.category === 'Cloud' || p.category === 'DevOps';
    if (activeFilter === 'ai') return p.category === 'AI / ML';
    return true;
  });

  return (
    <section 
      id="work" 
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-[#05060A] text-[#F1F5F9] font-sans border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xs font-mono font-semibold uppercase text-cyan-400 tracking-widest">
                03 // FEATURED ENGINEERING WORK
              </span>
              <div className="w-16 h-[1px] bg-gradient-to-r from-cyan-500/80 to-transparent" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 p-1.5 rounded-xl bg-slate-900/80 border border-white/10">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeFilter === 'all' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Projects [{projectsData.length}]
            </button>
            <button
              onClick={() => setActiveFilter('python')}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeFilter === 'python' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Python APIs
            </button>
            <button
              onClick={() => setActiveFilter('devops')}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeFilter === 'devops' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Cloud &amp; DevOps
            </button>
            <button
              onClick={() => setActiveFilter('ai')}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeFilter === 'ai' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              AI &amp; ML
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="glass-card p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                {/* Status & Number */}
                <div className="flex items-center justify-between mb-4 text-xs font-mono text-slate-400">
                  <span className="text-cyan-400 font-bold">PROJECT // {project.number}</span>
                  <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[10px]">
                    {project.status === 'completed' ? '✓ VERIFIED BUILD' : '⚡ IN PROGRESS'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 font-heading">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 font-normal leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Problem vs Solution */}
                <div className="space-y-2 mb-6 p-4 rounded-xl bg-slate-950/60 border border-white/5 text-xs font-sans">
                  <div>
                    <span className="font-bold text-red-400">PROBLEM: </span>
                    <span className="text-slate-300">{project.problem}</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-400">SOLUTION: </span>
                    <span className="text-slate-300">{project.solution}</span>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-900 border border-white/10 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics & Links */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-400">
                  {project.architectureMetrics.slice(0, 2).map((m) => (
                    <span key={m.label} className="text-cyan-300">
                      {m.label}: {m.value}
                    </span>
                  ))}
                </div>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-cyan-400 hover:text-white transition-colors"
                  >
                    <span>Source Code</span>
                    <span>↗</span>
                  </a>
                )}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;