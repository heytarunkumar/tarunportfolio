import React from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../../data/profile';

export const ResumeSection: React.FC = () => {
  return (
    <section
      id="resume"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-20 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-8 sm:p-14 rounded-sm border border-[#8C6D4F]/50 bg-[#0E0C0A] text-center shadow-[0_25px_70px_rgba(0,0,0,0.98)] overflow-hidden"
        >
          {/* Top Gold Edge */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37] block mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            THE COMPLETE PROFILE
          </span>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-white mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            WANT THE COMPLETE TECHNICAL PICTURE?
          </h2>

          <p
            className="text-xs sm:text-sm font-light text-[#A8988B] max-w-xl mx-auto mb-8 leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Download my technical resume to review detailed software engineering competencies, architecture projects, academic background, and technical toolsets.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {/* View Resume Button */}
            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 border border-[#D4AF37] bg-[#D4AF37] text-black text-xs font-semibold tracking-[0.24em] uppercase transition-all duration-300 hover:bg-[#E2C054] shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            >
              <span>VIEW RESUME</span>
              <span className="text-xs">↗</span>
            </a>

            {/* Download Resume Button */}
            <a
              href={profileData.resumeUrl}
              download
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 border border-[#8C6D4F]/50 hover:border-[#D4AF37] bg-[#120F0C] text-[#EAD8C7] hover:text-[#FFF5EB] text-xs font-medium tracking-[0.24em] uppercase transition-all duration-300"
            >
              <span>DOWNLOAD RESUME</span>
              <span className="text-xs">↓</span>
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
