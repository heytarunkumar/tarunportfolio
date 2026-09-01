import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const statusBadgeStyles: Record<string, string> = {
  Completed: 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300',
  Applied: 'border-amber-500/50 bg-amber-950/30 text-amber-300',
  Building: 'border-sky-500/50 bg-sky-950/30 text-sky-300',
  Learning: 'border-purple-500/50 bg-purple-950/30 text-purple-300',
};

export const EngineeringLabSection: React.FC = () => {
  const { labTracks } = usePortfolio();
  const tracks = labTracks && labTracks.length > 0 ? labTracks : [];
  const [activeTrackState, setActiveTrackState] = useState<any>(null);

  const activeTrack = activeTrackState || tracks[0] || {
    id: 'track-1',
    nodeNumber: '01',
    title: 'Python Backend Fundamentals',
    category: 'Backend Architecture',
    status: 'Completed',
    summary: 'Core Python OOP & API development',
    evidence: ['Python 3.12', 'Flask REST API'],
    nextObjective: 'Cloud integration',
    repositoryUrl: 'https://github.com/heytarunkumar',
  };

  return (
    <section
      id="lab"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Studio Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

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
            03 / CONTINUOUS GROWTH
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] tracking-tight uppercase leading-[0.85] select-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448]">
                ENGINEERING LAB.
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
                CURRENTLY BUILDING.
              </span>
            </h2>
          </div>

          <p
            className="text-xs sm:text-sm font-light text-[#A8988B] max-w-md mt-4 md:mt-0 leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            A practical roadmap demonstrating progression from Python backend application development into Linux, Docker containerization, CI/CD automation, AWS cloud, and Infrastructure as Code.
          </p>
        </motion.div>

        {/* Infrastructure Progression Flow Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-4 rounded-sm border border-[#8C6D4F]/30 bg-[#0E0C0A] overflow-x-auto"
        >
          <div className="flex items-center space-x-3 min-w-max text-xs font-mono">
            <span className="text-[#D4AF37] font-bold uppercase tracking-wider">ROADMAP:</span>
            {tracks.map((item, idx) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => setActiveTrackState(item)}
                  className={`px-3 py-1 rounded-sm border transition-all ${
                    activeTrack.id === item.id
                      ? 'border-[#D4AF37] bg-[#1E1914] text-[#F7E7C4] shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                      : 'border-[#8C6D4F]/30 bg-[#120F0C] text-[#A8988B] hover:border-[#8C6D4F]'
                  }`}
                >
                  {item.stepNumber || idx + 1}. {(item.category || '').split(' ')[0]}
                </button>
                {idx < tracks.length - 1 && (
                  <span className="text-[#8C6D4F]">↓</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Interactive Lab Content Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Track Navigation List (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {tracks.map((track, idx) => {
              const isSelected = activeTrack.id === track.id;
              return (
                <div
                  key={track.id || idx}
                  onClick={() => setActiveTrackState(track)}
                  className={`p-4 rounded-sm border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#14100D] shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                      : 'border-[#8C6D4F]/25 bg-[#0A0806] hover:border-[#8C6D4F]/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-[#D4AF37]">
                      STEP {track.stepNumber || idx + 1} // {track.category}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-sm border uppercase ${
                        statusBadgeStyles[track.status] || statusBadgeStyles.Building
                      }`}
                    >
                      {track.status}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-medium text-white group-hover:text-[#F7E7C4] transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
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
              transition={{ duration: 0.4 }}
              className="relative p-8 rounded-sm border border-[#8C6D4F]/40 bg-[#0E0C0A] shadow-2xl h-full flex flex-col justify-between"
            >
              {/* Gold Top Light Horizon */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

              <div>
                <div className="flex items-center justify-between mb-4 border-b border-[#8C6D4F]/20 pb-4">
                  <div>
                    <span className="text-xs font-mono text-[#D4AF37] block mb-1">
                      PROGRESSION TRACK #{activeTrack.stepNumber}
                    </span>
                    <h3
                      className="text-3xl sm:text-4xl uppercase text-white tracking-tight"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {activeTrack.title}
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-mono px-3 py-1 rounded-sm border uppercase ${
                      statusBadgeStyles[activeTrack.status]
                    }`}
                  >
                    {activeTrack.status}
                  </span>
                </div>

                {/* Objective */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-[#8C6D4F] uppercase block mb-1.5">
                    // OBJECTIVE
                  </span>
                  <p
                    className="text-xs sm:text-sm text-[#C4B5A5] font-light leading-relaxed"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {activeTrack.objective}
                  </p>
                </div>

                {/* Architecture Blueprint */}
                <div className="mb-6 p-4 rounded-sm border border-[#8C6D4F]/25 bg-[#050403]">
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block mb-1">
                    // SYSTEM ARCHITECTURE / WORKFLOW
                  </span>
                  <code className="text-xs font-mono text-[#E8DFD8]">
                    {activeTrack.architecture}
                  </code>
                </div>

                {/* Key Learnings */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-[#8C6D4F] uppercase block mb-2">
                    // WHAT I AM LEARNING & BUILDING
                  </span>
                  <ul className="space-y-2">
                    {activeTrack.keyLearnings.map((learning, idx) => (
                      <li
                        key={idx}
                        className="flex items-start space-x-2 text-xs text-[#B3A497]"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        <span className="text-[#D4AF37] font-bold">›</span>
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-6 border-t border-[#8C6D4F]/25 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {activeTrack.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-[10px] font-mono rounded-sm border border-[#8C6D4F]/35 bg-[#171310] text-[#E8D7C5]"
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
                    className="text-xs font-mono text-[#D4AF37] hover:underline flex items-center space-x-1"
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
