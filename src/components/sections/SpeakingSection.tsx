import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { speakingEventsData } from '../../data/speaking';

interface SpeakingSectionProps {
  id?: string;
  eyebrowNumber?: string;
  showAllLink?: boolean;
}

export const SpeakingSection: React.FC<SpeakingSectionProps> = ({
  id = 'speaking',
  eyebrowNumber = '05',
}) => {
  const event = speakingEventsData[0];
  const primaryPhoto = event.photos.find((p) => p.role === 'primary') || event.photos[0];

  return (
    <section
      id={id}
      className="relative w-full bg-[#F4EEE4] text-[#202020] font-sans selection:bg-[#78000F] selection:text-[#F4EEE4] py-20 sm:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 overflow-hidden border-t border-[#CFC3B3]/60"
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
            {eyebrowNumber} / WORKSHOPS &amp; SPEAKING
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#78000F]/60 via-[#CFC3B3] to-transparent max-w-xs" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111111] leading-[1.08] tracking-[-0.03em]">
              Leadership Masterclasses &amp; <span className="text-[#78000F] italic">Keynotes.</span>
            </h2>
            <p className="text-sm sm:text-base font-sans text-[#555047] mt-3 max-w-2xl">
              Practical sessions delivering operational frameworks, cognitive bias checks, and leadership habits for emerging founders, engineers, and student builders.
            </p>
          </div>

          <Link
            to={`/speaking/${event.slug}`}
            className="hidden sm:inline-flex items-center space-x-2 text-xs font-mono tracking-[0.16em] uppercase text-[#78000F] font-bold hover:text-[#5D000B] group self-start md:self-end pb-1 border-b border-[#78000F]"
          >
            <span>VIEW COMPLETE SESSION DISPATCH</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>

        {/* Featured Masterclass Editorial Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="editorial-card rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Image & Media Preview (5 Cols) */}
            <div className="lg:col-span-5 relative group">
              <Link to={`/speaking/${event.slug}`} className="block relative overflow-hidden rounded-[4px] border border-[#CFC3B3] bg-[#F4EEE4] aspect-[3/4] shadow-sm">
                <picture>
                  <source srcSet={primaryPhoto.webpUrl} type="image/webp" />
                  <img
                    src={primaryPhoto.url}
                    alt={primaryPhoto.alt}
                    width={primaryPhoto.width}
                    height={primaryPhoto.height}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-[#FAF8F3]">
                  <span className="inline-block text-[9px] font-mono tracking-[0.2em] uppercase px-2 py-0.5 rounded-[2px] bg-[#78000F] text-[#FAF8F3] font-bold mb-1.5">
                    17 OCTOBER 2026 · NSUT DELHI
                  </span>
                  <p className="text-xs font-sans line-clamp-2">
                    {primaryPhoto.caption}
                  </p>
                </div>
              </Link>
            </div>

            {/* Right Column: Editorial Details & Curriculum Preview (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              
              <div>
                {/* Meta Pills */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                  <span className="inline-flex items-center text-[10px] font-mono tracking-wider uppercase font-bold text-[#78000F] bg-[#78000F]/10 px-2.5 py-1 rounded-[2px] border border-[#78000F]/20">
                    GDG NSUT &amp; SHUNYA 2026
                  </span>
                  <span className="inline-flex items-center text-[10px] font-mono tracking-wider uppercase font-bold text-[#111111] bg-[#CFC3B3]/30 px-2.5 py-1 rounded-[2px]">
                    NETAJI SUBHAS UNIVERSITY OF TECHNOLOGY
                  </span>
                  <span className="inline-flex items-center text-[10px] font-mono tracking-wider uppercase font-bold text-[#1E7E34] bg-[#1E7E34]/10 px-2.5 py-1 rounded-[2px] border border-[#1E7E34]/20">
                    ✓ LETTER OF APPRECIATION VERIFIED
                  </span>
                </div>

                {/* Session Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#111111] mb-3 leading-tight">
                  <Link
                    to={`/speaking/${event.slug}`}
                    className="hover:text-[#78000F] transition-colors"
                  >
                    {event.sessionTitle}
                  </Link>
                </h3>

                {/* Key Quote / Thesis */}
                <div className="p-4 sm:p-5 rounded-[4px] bg-[#F4EEE4] border-l-2 border-[#78000F] mb-6">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#78000F] font-bold block mb-1">
                    SESSION PREMISE
                  </span>
                  <p className="text-base sm:text-lg font-serif italic text-[#111111] leading-snug">
                    &ldquo;{event.thesis}&rdquo;
                  </p>
                </div>

                {/* Narrative Summary */}
                <p className="text-sm font-sans text-[#38342E] leading-relaxed mb-6">
                  {event.summary} Conducted for university engineering students at NSUT Delhi, the masterclass focused on cognitive traps, non-hierarchical influence, psychological safety, and establishing daily leadership repetitions before holding any formal designation.
                </p>

                {/* Modules Snapshot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  <div className="p-3.5 rounded-[4px] bg-[#F4EEE4] border border-[#CFC3B3]/60">
                    <span className="text-[10px] font-mono text-[#78000F] font-bold block mb-0.5">
                      PART 01
                    </span>
                    <h4 className="text-xs font-sans font-bold text-[#111111] mb-1">
                      The Traps of Judgment
                    </h4>
                    <p className="text-[11px] font-sans text-[#736B60] leading-snug">
                      Confirmation bias, overconfidence, sunk cost, halo/horns, groupthink.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-[4px] bg-[#F4EEE4] border border-[#CFC3B3]/60">
                    <span className="text-[10px] font-mono text-[#78000F] font-bold block mb-0.5">
                      PART 02
                    </span>
                    <h4 className="text-xs font-sans font-bold text-[#111111] mb-1">
                      Leading Others
                    </h4>
                    <p className="text-[11px] font-sans text-[#736B60] leading-snug">
                      Communication, assertiveness &amp; safety, constructive feedback, coaching.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#CFC3B3]">
                <Link
                  to={`/speaking/${event.slug}`}
                  className="py-3 px-6 rounded-[4px] bg-[#78000F] hover:bg-[#5D000B] text-[#FAF8F3] text-xs font-mono tracking-[0.16em] uppercase font-bold transition-all shadow-sm focus:outline-none"
                >
                  EXPLORE MASTERCLASS &amp; DOCUMENTATION →
                </Link>

                <a
                  href={event.appreciationLetter.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 rounded-[4px] bg-transparent hover:bg-[#F4EEE4] border border-[#111111] text-[#111111] hover:text-[#78000F] hover:border-[#78000F] text-xs font-mono tracking-[0.16em] uppercase font-medium transition-all focus:outline-none"
                >
                  VIEW APPRECIATION LETTER (PDF) ↗
                </a>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SpeakingSection;
