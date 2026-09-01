import React from 'react';
import { motion } from 'framer-motion';
import { ExperienceSection } from '../components/ExperienceSection';
import { WritingSection } from '../components/sections/WritingSection';
import { ResumeSection } from '../components/sections/ResumeSection';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-[#E8DFD8] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="border-b border-[#8C6D4F]/30 pb-8"
        >
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#D4AF37] block mb-2">
            CAREER &amp; TECHNICAL DISPATCHES
          </span>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            EXPERIENCE &amp; WRITING
          </h1>
          <p
            className="text-sm sm:text-base text-[#A8988B] font-light max-w-3xl leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            A chronological roadmap of engineering milestones, academic background in B.Tech CSE (AI & ML), research collaborations, and published technical dispatches on Medium.
          </p>
        </motion.div>
      </div>

      <ExperienceSection />
      <WritingSection />
      <ResumeSection />
    </div>
  );
};

export default ExperiencePage;
