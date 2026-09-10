import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const statusBadgeStyles: Record<string, string> = {
  Completed: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300',
  Applied: 'border-amber-500/40 bg-amber-950/30 text-amber-300',
  Building: 'border-amber-500/40 bg-amber-950/30 text-amber-300',
  Learning: 'border-amber-500/40 bg-amber-950/30 text-amber-300',
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
      className="relative w-full bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden"
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
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-4 mb-6"
        >
          <span className="text-[11px] font-mono font-medium tracking-[0.3em] uppercase text-[#D4AF37]">
            04 / CONTINUOUS GROWTH &amp; LABS
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-[1.15]">
              Engineering lab &amp; <span className="italic text-[#D4AF37]">active blueprints.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-light text-[#C4BCB3] max-w-md leading-relaxed">
            A practical roadmap demonstrating progression from Python backend engineering into Linux sysadmin, Docker containerization, CI/CD automation, and cloud systems.
          </p>
        </motion.div>

        {/* Infrastructure Progression Flow Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 p-4 rounded-2xl border border-[#26211B] bg-[#12100E] overflow-x-auto"
        >
          <div className="flex items-center space-x-3 min-w-max text-xs font-mono">
            <span className="text-[#D4AF37] font-bold uppercase tracking-wider">ROADMAP:</span>
            {tracks.map((item, idx) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => setActiveTrackState(item)}
                  className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                    activeTrack.id === item.id
                      ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-semibold shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                      : 'border-[#26211B] bg-[#0A0908] text-[#C4BCB3] hover:border-[#D4AF37]/50'
                  }`}
                >
                  {item.stepNumber || idx + 1}. {(item.category || '').split(' ')[0]}
                </button>
                {idx < tracks.length - 1 && (
                  <span className="text-[#8C6D4F]">→</span>
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
                  className={`card-lift p-4.5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#1A1714] shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                      : 'border-[#26211B] bg-[#12100E] hover:border-[#D4AF37]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-[#D4AF37]">
                      STEP {track.stepNumber || idx + 1} // {track.category}
                    </span>
                    <span
                      className={`text-[9.5px] font-mono px-2.5 py-0.5 rounded-full border uppercase ${
                        statusBadgeStyles[track.status] || statusBadgeStyles.Building
                      }`}
                    >
                      {track.status}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-sans font-semibold text-white group-hover:text-[#F7E7C4] transition-colors leading-snug">
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
              className="card-lift relative p-7 sm:p-8 rounded-2xl border border-[#26211B] bg-[#12100E] shadow-2xl h-full flex flex-col justify-between"
            >
              {/* Gold Top Light Horizon */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

              <div>
                <div className="flex items-center justify-between mb-4 border-b border-[#26211B] pb-4">
                  <div>
                    <span className="text-xs font-mono text-[#D4AF37] block mb-1">
                      PROGRESSION TRACK #{activeTrack.stepNumber || '01'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-normal text-white tracking-tight leading-snug">
                      {activeTrack.title}
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-mono px-3 py-1 rounded-full border uppercase ${
                      statusBadgeStyles[activeTrack.status] || statusBadgeStyles.Building
                    }`}
                  >
                    {activeTrack.status}
                  </span>
                </div>

                {/* Objective */}
                <div className="mb-5">
                  <span className="text-[10px] font-mono tracking-widest text-[#8C6D4F] uppercase block mb-1.5">
                    // OBJECTIVE &amp; SCOPE
                  </span>
                  <p className="text-xs sm:text-[13.5px] text-[#C4BCB3] font-light leading-relaxed">
                    {activeTrack.objective}
                  </p>
                </div>

                {/* Architecture Blueprint */}
                <div className="mb-5 p-4 rounded-xl border border-[#26211B] bg-[#0A0908]">
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block mb-1">
                    // SYSTEM ARCHITECTURE / WORKFLOW
                  </span>
                  <code className="text-xs font-mono text-[#F5F2EB] block">
                    {activeTrack.architecture}
                  </code>
                </div>

                {/* Key Learnings */}
                <div className="mb-5">
                  <span className="text-[10px] font-mono tracking-widest text-[#8C6D4F] uppercase block mb-2">
                    // WHAT I AM LEARNING &amp; BUILDING
                  </span>
                  <ul className="space-y-1.5">
                    {(activeTrack.keyLearnings || []).map((learning: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-[#C4BCB3]">
                        <span className="text-[#D4AF37] font-bold">›</span>
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-5 border-t border-[#26211B] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {(activeTrack.technologies || []).map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-[10.5px] font-mono rounded-lg border border-[#26211B] bg-[#0A0908] text-[#F5F2EB]"
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
