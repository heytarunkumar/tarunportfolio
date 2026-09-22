import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const statusBadgeStyles: Record<string, string> = {
  Completed: 'border-[#B5DFCA] bg-[#E8F5EE] text-[#0F6848]',
  Applied: 'border-[#DDD2C2] bg-[#F4EEE4] text-[#78000F]',
  Building: 'border-[#DDD2C2] bg-[#F4EEE4] text-[#78000F]',
  Learning: 'border-[#DDD2C2] bg-[#F4EEE4] text-[#78000F]',
};

export const EngineeringLabSection: React.FC = () => {
  const { labTracks } = usePortfolio();
  const tracks = (labTracks && labTracks.length > 0 ? labTracks : []).filter((t) => t.visible !== false);
  const [activeTrackState, setActiveTrackState] = useState<any>(null);

  const activeTrack = activeTrackState || tracks[0] || {
    id: 'track-1',
    nodeNumber: '01',
    stepNumber: '01',
    title: 'Python Backend Fundamentals',
    category: 'Backend Architecture',
    status: 'Completed',
    objective: 'Core Python OOP & API development',
    architecture: 'Python 3.12 / FastAPI / PyTest',
    keyLearnings: ['REST API design', 'Data models validation with Pydantic', 'Modular services'],
    technologies: ['Python 3.12', 'FastAPI', 'PyTest'],
    githubUrl: 'https://github.com/heytarunkumar',
  };

  return (
    <section
      id="lab"
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
            04 / ENGINEERING LAB &amp; BLUEPRINTS
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
              Engineering Lab &amp; <span className="text-[#78000F] italic">Blueprints.</span>
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#736B60] mt-2 uppercase tracking-[0.16em]">
              LINUX · DOCKER · KUBERNETES · CI/CD AUTOMATION · AWS CLOUD
            </p>
          </div>

          <p className="text-xs sm:text-sm font-normal text-[#38342E] max-w-md leading-relaxed">
            Practical progression tracks demonstrating real systems development, containerization pipelines, and cloud deployments.
          </p>
        </motion.div>

        {/* Infrastructure Progression Flow Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 p-3 sm:p-4 rounded-[4px] border border-[#CFC3B3] bg-[#FAF8F3] overflow-x-auto no-scrollbar shadow-sm"
        >
          <div className="flex items-center space-x-3 min-w-max text-[11px] sm:text-xs font-mono">
            <span className="text-[#78000F] font-bold uppercase tracking-wider">ROADMAP:</span>
            {tracks.map((item, idx) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => setActiveTrackState(item)}
                  className={`px-3.5 py-1.5 rounded-[3px] border transition-all cursor-pointer font-medium ${
                    activeTrack.id === item.id
                      ? 'border-[#78000F] bg-[#78000F] text-white font-bold shadow-sm'
                      : 'border-[#DDD2C2] bg-[#F4EEE4] text-[#38342E] hover:border-[#78000F] hover:text-[#78000F]'
                  }`}
                >
                  {item.stepNumber || idx + 1}. {(item.category || '').split(' ')[0]}
                </button>
                {idx < tracks.length - 1 && (
                  <span className="text-[#CFC3B3]">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Interactive Lab Content Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Track Navigation List (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {tracks.map((track, idx) => {
              const isSelected = activeTrack.id === track.id;
              return (
                <div
                  key={track.id || idx}
                  onClick={() => setActiveTrackState(track)}
                  className={`editorial-card p-4 sm:p-5 rounded-[4px] border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#78000F] bg-[#FAF8F3] shadow-md'
                      : 'border-[#CFC3B3] bg-[#FAF8F3] hover:border-[#78000F]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <span className="text-[11px] font-mono font-bold tracking-wide text-[#78000F] truncate">
                      STEP {track.stepNumber || idx + 1} // {track.category}
                    </span>
                    <span
                      className={`text-[9.5px] font-mono font-semibold px-2 py-0.5 rounded-[2px] border uppercase shrink-0 ${
                        statusBadgeStyles[track.status] || statusBadgeStyles.Building
                      }`}
                    >
                      {track.status}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-[15px] font-serif font-bold text-[#111111] leading-snug">
                    {track.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Active Track Focus Card (7 Cols) */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeTrack.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="editorial-card relative p-6 sm:p-8 rounded-[4px] border border-[#CFC3B3] bg-[#FAF8F3] shadow-md h-full flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#78000F] via-[#CFC3B3] to-transparent" />

              <div>
                <div className="flex items-center justify-between mb-5 border-b border-[#DDD2C2] pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#78000F] block mb-1">
                      PROGRESSION TRACK #{activeTrack.stepNumber || '01'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] tracking-tight leading-snug">
                      {activeTrack.title}
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-mono font-semibold px-3 py-1 rounded-[2px] border uppercase ${
                      statusBadgeStyles[activeTrack.status] || statusBadgeStyles.Building
                    }`}
                  >
                    {activeTrack.status}
                  </span>
                </div>

                {/* Objective */}
                <div className="mb-5">
                  <span className="text-[10px] font-mono tracking-widest text-[#78000F] uppercase font-bold block mb-1.5">
                    // OBJECTIVE &amp; SCOPE
                  </span>
                  <p className="text-xs sm:text-sm text-[#38342E] font-normal leading-relaxed">
                    {activeTrack.objective}
                  </p>
                </div>

                {/* Architecture Blueprint */}
                <div className="mb-5 p-4 rounded-[3px] border border-[#DDD2C2] bg-[#F4EEE4]">
                  <span className="text-[10px] font-mono tracking-widest text-[#78000F] uppercase font-bold block mb-1">
                    // SYSTEM ARCHITECTURE / WORKFLOW
                  </span>
                  <code className="text-xs font-mono text-[#111111] font-semibold block">
                    {activeTrack.architecture}
                  </code>
                </div>

                {/* Key Learnings */}
                <div className="mb-5">
                  <span className="text-[10px] font-mono tracking-widest text-[#78000F] uppercase font-bold block mb-2">
                    // WHAT I AM LEARNING &amp; BUILDING
                  </span>
                  <ul className="space-y-1.5">
                    {(activeTrack.keyLearnings || []).map((learning: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-[#38342E]">
                        <span className="text-[#78000F] font-bold">›</span>
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-5 border-t border-[#DDD2C2] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {(activeTrack.technologies || []).map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[10.5px] font-mono rounded-[2px] border border-[#DDD2C2] bg-[#F4EEE4] text-[#202020] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {activeTrack.githubUrl && (
                  <a
                    href={activeTrack.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-[#78000F] hover:underline flex items-center space-x-1"
                  >
                    <span>GITHUB REPO</span>
                    <span>↗</span>
                  </a>
                )}
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EngineeringLabSection;
