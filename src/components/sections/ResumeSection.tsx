import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

export const ResumeSection: React.FC = () => {
  const { profile } = usePortfolio();
  const resumeUrl = profile.resumeUrl || '/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf';
  const badge = profile.resumeBadge || 'VERIFIED CREDENTIALS & CURRICULUM VITAE';
  const headline = profile.resumeHeadline || 'Looking for the complete technical profile?';
  const description = profile.resumeDescription || 'Download the official executive engineering resume to review production software architectures, machine learning research publications, OrigoHOST community metrics, and academic coursework.';
  const viewCta = profile.resumeViewCta || 'VIEW RESUME';
  const downloadCta = profile.resumeDownloadCta || 'DOWNLOAD ATS PDF';

  return (
    <section
      id="resume"
      className="relative w-full bg-[#F4EEE4] text-[#202020] font-sans selection:bg-[#78000F] selection:text-[#F4EEE4] py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="editorial-card relative p-6 sm:p-12 rounded-[4px] border border-[#CFC3B3] bg-[#FAF8F3] text-center shadow-md overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#78000F] via-[#CFC3B3] to-transparent" />

          <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F] block mb-3">
            {badge}
          </span>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#111111] mb-3 sm:mb-4 leading-snug">
            {headline}
          </h2>

          <p className="text-xs sm:text-sm font-normal text-[#38342E] max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-executive-primary w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 text-xs font-mono font-bold tracking-[0.18em] uppercase cursor-pointer"
            >
              <span>{viewCta}</span>
              <span className="text-xs">↗</span>
            </a>

            <a
              href={resumeUrl}
              download
              className="btn-executive-secondary w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 text-xs font-mono font-bold tracking-[0.18em] uppercase cursor-pointer"
            >
              <span>{downloadCta}</span>
              <span className="text-xs text-[#78000F]">↓</span>
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
