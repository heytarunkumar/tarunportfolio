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
      ease: [0.16, 1, 0.3, 1],
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
    name: profile.name || 'Tarun Kumar',
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
      { title: 'Explainable Machine Learning Research', status: '⟳ SCALING', statusType: 'scaling' },
    ],
  };

  return (
    <section
      id="about"
      className="relative w-full bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white py-20 sm:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 overflow-hidden"
    >
      {/* Background Subtle Studio Flare */}
      <div className="absolute top-1/4 -right-20 w-[35rem] h-[35rem] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1760px] mx-auto w-full relative z-10">
        
        {/* Section Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT NARRATIVE & PILLARS (7 COLS) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7 flex flex-col justify-between space-y-8"
          >
            {/* Eyebrow Header */}
            <div>
              <motion.div variants={fadeUpVariants} className="flex items-center space-x-4 mb-4 sm:mb-6">
                <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D4AF37]">
                  {eyebrow}
                </span>
                <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
              </motion.div>

              {/* Editorial Headline */}
              <motion.h2
                variants={fadeUpVariants}
                className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.08] tracking-tight mb-6"
              >
                {headline}
              </motion.h2>
            </div>

            {/* In-depth Narrative Body */}
            <motion.div variants={fadeUpVariants} className="space-y-4 text-xs sm:text-sm md:text-[14.5px] font-normal text-[#C4BCB3] leading-[1.85]">
              {storyParagraphs.map((para: string, idx: number) => (
                <p key={idx}>{para}</p>
              ))}
            </motion.div>

            {/* Blockquote */}
            <motion.blockquote
              variants={fadeUpVariants}
              className="p-5 sm:p-6 rounded-xl border-l-2 border-[#D4AF37] bg-[#12100E] text-xs sm:text-sm md:text-base font-serif italic text-[#F5F2EB] leading-relaxed shadow-sm"
            >
              &quot;{quote}&quot;
            </motion.blockquote>

            {/* Core Competency Pillars */}
            <motion.div variants={fadeUpVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {pillars.map((pillar: any, pilIdx: number) => (
                <div key={pilIdx} className="card-lift p-4 rounded-xl border border-[#26211B] bg-[#12100E]">
                  <span className="text-[10px] font-mono text-[#D4AF37] block mb-1">
                    {pillar.number} // {pillar.title}
                  </span>
                  <p className="text-xs font-sans text-[#F5F2EB] font-medium">
                    {pillar.subtitle}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT ARCHITECTURE BLUEPRINT & COMMUNITY CARD (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col space-y-5 relative">
            
            {/* Founder Portrait Spotlight Card - 4:3 Aspect Ratio matching natural image proportions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="card-lift relative rounded-2xl border border-[#26211B] bg-[#12100E] shadow-2xl overflow-hidden group"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent z-10" />

              {/* Card Header Tag */}
              <div className="px-4 sm:px-5 py-3.5 flex items-center justify-between border-b border-[#26211B] bg-[#141210]">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">FOUNDER SPOTLIGHT</span>
                </div>
                <span className="px-2.5 py-0.5 text-[9.5px] font-mono bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 rounded-md font-medium">
                  {spotlight.verifiedStatus || 'VERIFIED'}
                </span>
              </div>
              
              {/* Photo Area with 4:3 ratio matching natural image proportions */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0A0908]">
                <img
                  src={spotlight.photoUrl || "/images/tarun-executive.webp"}
                  alt={`${spotlight.name} — ${spotlight.role}`}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="600"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-black/10 pointer-events-none" />
              </div>

              {/* Clean Footer Info Bar */}
              <div className="px-4 sm:px-5 py-4 bg-[#12100E] border-t border-[#26211B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-medium text-white tracking-wide">{spotlight.name}</h3>
                  <p className="text-[11px] font-mono text-[#D4AF37] mt-0.5">{spotlight.role}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[9.5px] font-mono text-[#A8988B] block">LEADERSHIP</span>
                  <span className="text-[11px] font-mono text-[#C4BCB3]">{spotlight.leadership}</span>
                </div>
              </div>
            </motion.div>

            {/* OrigoHOST Highlight Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="card-lift relative p-5 sm:p-7 border border-[#26211B] rounded-2xl bg-[#12100E] shadow-2xl overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
              
              <div className="flex items-center space-x-3.5 sm:space-x-4 mb-4">
                <img
                  src={origo.logoUrl || "/images/origohost/origohost-icon-64.webp"}
                  alt={origo.title}
                  loading="lazy"
                  decoding="async"
                  width="48"
                  height="48"
                  className="w-11 h-11 sm:w-12 sm:h-12 object-contain rounded-xl bg-[#0A0908] border border-[#26211B] p-1.5 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase truncate">{origo.tag}</span>
                    <span className="px-1.5 py-0.2 text-[9px] font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 rounded-md">ACTIVE</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-normal text-white tracking-wide truncate">
                    {origo.title}
                  </h3>
                  <p className="text-[10px] font-mono text-[#E6C665] truncate">{origo.tagline}</p>
                </div>
              </div>

              <p className="text-xs font-light text-[#C4BCB3] leading-relaxed mb-4">
                {origo.description}
              </p>

              <div className="pt-3 border-t border-[#26211B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-0 text-[11px] font-mono text-[#A8988B]">
                <span>{origo.role}</span>
                <a
                  href="https://origohost.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline inline-flex items-center space-x-1"
                >
                  <span>{origo.ecosystem}</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </motion.div>

            {/* Capabilities Log */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="card-lift relative p-5 sm:p-7 border border-[#26211B] rounded-2xl bg-[#12100E]/90 shadow-2xl w-full font-mono text-xs overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#26211B] text-[#A8988B]">
                <span className="text-[10px] truncate max-w-[200px]">{log.logTitle}</span>
                <span className="text-[#D4AF37]">{log.version}</span>
              </div>

              <div className="space-y-2.5 text-[11px]">
                {(log.items || []).map((item: any, itmIdx: number) => {
                  const isHighlight = item.statusType === 'scaling' || itmIdx === log.items.length - 1;
                  return (
                    <div
                      key={itmIdx}
                      className={`p-2.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 ${
                        isHighlight
                          ? 'border-[#D4AF37]/30 bg-[#16130F]'
                          : 'border-[#26211B] bg-[#0A0908]'
                      }`}
                    >
                      <span className={isHighlight ? 'text-[#F7E7C4] font-sans' : 'text-white font-sans'}>
                        {item.title}
                      </span>
                      <span className={isHighlight ? 'text-[#D4AF37] font-mono font-semibold shrink-0' : 'text-emerald-400 font-mono font-semibold shrink-0'}>
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
