import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

export const ResumeSection: React.FC = () => {
  const { profile } = usePortfolio();
  const resumeUrl = profile?.resumeUrl || '/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf';

  return (
    <section
      id="resume"
      className="relative w-full bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white py-20 sm:py-24 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="card-lift relative p-8 sm:p-12 rounded-2xl border border-[#26211B] bg-[#12100E] text-center shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Top Gold Edge */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

          <span className="text-[11px] font-mono font-medium tracking-[0.3em] uppercase text-[#D4AF37] block mb-3">
            VERIFIED CREDENTIALS &amp; CURRICULUM VITAE
          </span>

          <h2 className="text-3xl sm:text-4xl font-serif text-white mb-4">
            Looking for the complete technical profile?
          </h2>

          <p className="text-xs sm:text-sm font-light text-[#C4BCB3] max-w-xl mx-auto mb-8 leading-relaxed">
            Download the official engineering resume to review production software architectures, machine learning research publications, OrigoHOST community metrics, and academic coursework.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            {/* View Resume Button */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] cursor-pointer"
            >
              <span>VIEW RESUME</span>
              <span className="text-xs">↗</span>
            </a>

            {/* Download Resume Button */}
            <a
              href={resumeUrl}
              download
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl border border-[#26211B] hover:border-[#D4AF37]/60 bg-[#0A0908] text-[#F5F2EB] hover:text-white text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer"
            >
              <span>DOWNLOAD ATS PDF</span>
              <span className="text-xs text-[#D4AF37]">↓</span>
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
