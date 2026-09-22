import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export const AboutSection: React.FC = () => {
  const { profile } = usePortfolio();

  const eyebrow = profile.aboutEyebrow || '01 / EXECUTIVE PROFILE & PHILOSOPHY';
  const headline = profile.aboutHeadline || 'Turning Ideas Into Intelligent, Production Systems.';
  const storyParagraphs = (profile.aboutStoryParagraphs && profile.aboutStoryParagraphs.length > 0)
    ? profile.aboutStoryParagraphs
    : [
      `I am ${profile?.name || 'Tarun Kumar'} (known across engineering platforms as @heytarunkumar) — a Python Developer, AI Systems Engineer, Researcher, Author, and Founder building practical intelligence, Generative AI architectures, and scalable ventures.`,
      'My work sits at the intersection of applied machine learning, autonomous agents, high-performance Python microservices, and empirical software research. As Founder & President of OrigoHOST Tech Community (origohost.in), I spearhead national developer hackathons, technical bootcamps, and builder ecosystems.',
    ];
  const quote = profile.aboutQuote || 'I believe technology is most powerful when it moves beyond experimentation and becomes something people can actually use, scale, and build upon.';
  const pillars = (profile.competencyPillars && profile.competencyPillars.length > 0)
    ? profile.competencyPillars
    : [
      { number: '01', title: 'APPLIED AI & AGENTS', subtitle: 'LLMs, Tool-Use Architectures & Explainable Systems' },
      { number: '02', title: 'PYTHON & BACKEND', subtitle: 'Scalable Microservices, Asynchronous APIs & Data Workflows' },
      { number: '03', title: 'VENTURES & COMMUNITY', subtitle: 'OrigoHOST President, Builder Hackathons & Developer Education' },
    ];
  const spotlight = profile.spotlightCard || {
    photoUrl: '/images/tarun-executive.webp',
    name: profile.name || 'Mr. Tarun Kumar',
    role: profile.primaryRole || 'Founder & AI Systems Engineer',
    leadership: 'President @ OrigoHOST',
    verifiedStatus: 'VERIFIED',
  };
  const origo = profile.origohostCard || {
    logoUrl: '/images/origohost/origohost-icon-64.webp',
    tag: 'VENTURE & ECOSYSTEM',
    title: 'OrigoHOST Tech Community',
    tagline: 'WHERE BUILDERS BECOME INNOVATORS',
    description: 'As Founder & President, leading institutional engagements, technical initiatives, and community growth focused on applied AI and practical developer education.',
    role: 'ROLE: FOUNDER & PRESIDENT',
    ecosystem: 'APPLIED AI ECOSYSTEM',
  };
  const log = profile.progressionLog || {
    logTitle: 'EXECUTIVE_CAPABILITIES.LOG',
    version: 'v2026.AI',
    items: [
      { title: 'Applied AI & GenAI Architectures', status: '✓ ACTIVE', statusType: 'active' },
      { title: 'Python Systems & Automation', status: '✓ MASTERED', statusType: 'mastered' },
      { title: 'Community & Builder Ecosystems', status: '✓ LEADING', statusType: 'leading' },
      { title: 'Cloud & Scalable AI Ventures', status: '⚡ SCALING', statusType: 'scaling' },
    ],
  };

  return (
    <section
      id="about"
      className="relative w-full bg-[#F4EEE4] text-[#202020] font-sans selection:bg-[#78000F] selection:text-[#F4EEE4] py-20 sm:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 overflow-hidden"
    >
      <div className="max-w-[1760px] mx-auto w-full relative z-10">

        {/* Eyebrow Section Marker */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="flex items-center space-x-4 mb-8 sm:mb-12"
        >
          <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F]">
            {eyebrow}
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#78000F]/60 via-[#CFC3B3] to-transparent max-w-xs" />
        </motion.div>

        {/* Main Grid: Editorial Story (7 Cols) + Magazine Feature Cards (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT: Magazine Article / Story (7 Cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="lg:col-span-7 flex flex-col"
          >
            {/* Display Headline */}
            <motion.div variants={fadeUpVariants} className="mb-6 sm:mb-8 select-none">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111111] leading-[1.08] tracking-[-0.03em]">
                {headline}
              </h2>
            </motion.div>

            {/* Narrative Body */}
            <motion.div
              variants={fadeUpVariants}
              className="text-sm sm:text-base font-normal text-[#38342E] leading-[1.85] mb-8 space-y-4 max-w-2xl"
            >
              {storyParagraphs.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}

              {quote && (
                <div className="my-6 border-l-2 border-[#78000F] pl-5 py-3 bg-[#FAF8F3] rounded-r-[4px] border-t border-r border-b border-[#DDD2C2]">
                  <p className="font-serif italic text-base sm:text-lg text-[#78000F] leading-relaxed">
                    &ldquo;{quote}&rdquo;
                  </p>
                </div>
              )}
            </motion.div>

            {/* Competency Pillars - Clean Editorial Grid */}
            <motion.div
              variants={fadeUpVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#DDD2C2]"
            >
              {pillars.map((pillar, pilIdx) => (
                <div key={pilIdx} className="editorial-card p-4 sm:p-5 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3]">
                  <span className="text-[10px] font-mono font-bold text-[#78000F] block mb-1 tracking-widest">
                    {pillar.number} // {pillar.title}
                  </span>
                  <p className="text-xs font-sans text-[#202020] font-medium leading-snug">
                    {pillar.subtitle}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Magazine Spotlight Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">

            {/* Founder Profile Feature Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
              className="editorial-card rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-md overflow-hidden"
            >
              {/* Card Header Bar */}
              <div className="px-5 py-3 flex items-center justify-between border-b border-[#DDD2C2] bg-[#F4EEE4]">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#78000F] animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#78000F] font-bold">
                    EXECUTIVE SPOTLIGHT
                  </span>
                </div>
                <span className="px-2 py-0.5 text-[9px] font-mono bg-[#E8F5EE] border border-[#B5DFCA] text-[#0F6848] rounded-[2px] font-semibold">
                  {spotlight.verifiedStatus || 'VERIFIED'}
                </span>
              </div>

              {/* Photo */}
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#FAF8F3]">
                <img
                  src={spotlight.photoUrl || "/images/tarun-executive.webp"}
                  alt={`${spotlight.name} — ${spotlight.role}`}
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="750"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Info Bar */}
              <div className="px-5 py-4 bg-[#FAF8F3] border-t border-[#DDD2C2] flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#111111]">{spotlight.name}</h3>
                  <p className="text-[11px] font-mono text-[#78000F] mt-0.5 font-medium">{spotlight.role}</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono text-[#8C8275] block uppercase tracking-wider">LEADERSHIP</span>
                  <span className="text-[11px] font-mono text-[#202020] font-semibold">{spotlight.leadership}</span>
                </div>
              </div>
            </motion.div>

            {/* OrigoHOST Highlight Feature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              className="editorial-card p-5 sm:p-6 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-md"
            >
              <div className="flex items-center space-x-3.5 mb-4">
                <img
                  src={origo.logoUrl || "/images/origohost/origohost-icon-64.webp"}
                  alt={origo.title}
                  loading="lazy"
                  decoding="async"
                  width="44"
                  height="44"
                  className="w-10 h-10 object-contain rounded-[4px] bg-[#F4EEE4] border border-[#DDD2C2] p-1 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[9.5px] font-mono text-[#78000F] tracking-widest uppercase font-bold">{origo.tag}</span>
                    <span className="px-1.5 py-0.2 text-[8.5px] font-mono bg-[#E8F5EE] text-[#0F6848] rounded-[2px] font-semibold">ACTIVE</span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#111111] truncate">
                    {origo.title}
                  </h3>
                  <p className="text-[10px] font-mono text-[#736B60] truncate">{origo.tagline}</p>
                </div>
              </div>

              <p className="text-xs font-normal text-[#38342E] leading-relaxed mb-4">
                {origo.description}
              </p>

              <div className="pt-3 border-t border-[#DDD2C2] flex items-center justify-between text-[11px] font-mono text-[#555047]">
                <span className="font-semibold">{origo.role}</span>
                <a
                  href="https://origohost.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#78000F] font-bold hover:underline inline-flex items-center space-x-1"
                >
                  <span>{origo.ecosystem}</span>
                  <span>↗</span>
                </a>
              </div>
            </motion.div>

            {/* Progression & Capability Log */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
              className="editorial-card p-5 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-md font-mono text-xs"
            >
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#DDD2C2] text-[#8C8275] text-[10px]">
                <span className="truncate font-semibold">{log.logTitle}</span>
                <span className="text-[#78000F] font-bold">{log.version}</span>
              </div>

              <div className="space-y-2 text-[11px]">
                {(log.items || []).map((item, itmIdx) => {
                  const isHighlight = item.statusType === 'scaling' || itmIdx === log.items.length - 1;
                  return (
                    <div
                      key={itmIdx}
                      className={`p-2 rounded-[3px] border flex items-center justify-between ${isHighlight
                        ? 'border-[#78000F]/30 bg-[#F4EEE4]'
                        : 'border-[#DDD2C2] bg-[#FAF8F3]'
                        }`}
                    >
                      <span className="text-[#202020] font-sans font-medium">
                        {item.title}
                      </span>
                      <span className={isHighlight ? 'text-[#78000F] font-mono font-bold' : 'text-[#0F6848] font-mono font-bold'}>
                        {item.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
