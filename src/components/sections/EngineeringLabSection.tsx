import React from 'react';
import { motion } from 'framer-motion';
import { engineeringLabTracks } from '../../data/engineeringLab';

export const EngineeringLabSection: React.FC = () => {
  return (
    <section 
      id="lab" 
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-[#05060A] text-[#F1F5F9] font-sans border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xs font-mono font-semibold uppercase text-cyan-400 tracking-widest">
                04 // ENGINEERING LAB &amp; ROADMAP
              </span>
              <div className="w-16 h-[1px] bg-gradient-to-r from-cyan-500/80 to-transparent" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Cloud &amp; DevOps Progression Track
            </h2>
          </div>

          <p className="text-sm text-slate-400 max-w-md mt-4 md:mt-0 font-normal">
            Transparent breakdown of active learning modules, hands-on infrastructure exercises, and applied DevOps technologies.
          </p>
        </div>

        {/* Timeline Stepper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineeringLabTracks.map((track, idx) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                {/* Step Index & Status */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    MODULE // {track.stepNumber}
                  </span>

                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded font-semibold ${
                      track.status === 'Completed' || track.status === 'Applied'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                        : track.status === 'Building'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                        : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40'
                    }`}
                  >
                    ● {track.status.toUpperCase()}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 font-heading">
                  {track.title}
                </h3>

                <p className="text-xs font-mono text-cyan-300 mb-4">
                  Focus: {track.subtitle}
                </p>

                {/* Key Learnings */}
                <ul className="space-y-2 mb-6 text-xs text-slate-300 font-sans">
                  {track.keyLearnings.map((learning, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-cyan-400 text-xs">›</span>
                      <span>{learning}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">Hands-on Track</span>
                {track.githubUrl && (
                  <a
                    href={track.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-cyan-400 hover:text-white font-bold transition-colors"
                  >
                    GitHub Track ↗
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

export default EngineeringLabSection;
