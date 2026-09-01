import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';

export const ResumeSection: React.FC = () => {
  return (
    <section 
      id="resume" 
      className="relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-[#05060A] text-[#F1F5F9] font-sans border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card p-10 sm:p-14 rounded-3xl relative overflow-hidden text-center"
        >
          <div className="glow-orb-cyan top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono font-semibold uppercase text-cyan-400 tracking-widest">
              08 // COMPLETE TECHNICAL PROFILE
            </span>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-heading">
              Ready to review full qualifications?
            </h2>

            <p className="text-base text-slate-300 font-normal leading-relaxed">
              Download the official technical resume detailing core Python development capabilities, active cloud infrastructure tracks, and research accomplishments.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
              <a
                href={profileData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4 text-sm font-semibold flex items-center space-x-2"
              >
                <span>View Full Resume</span>
                <span className="text-base">↗</span>
              </a>

              <a
                href={profileData.resumeUrl}
                download="tarun-kumar-resume.pdf"
                className="btn-secondary px-8 py-4 text-sm font-medium flex items-center space-x-2"
              >
                <span>Download PDF</span>
                <span className="text-base">↓</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ResumeSection;
