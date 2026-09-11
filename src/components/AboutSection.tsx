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

  const eyebrow = profile.aboutEyebrow || '01 / MISSION & PHILOSOPHY';
  const headline = profile.aboutHeadline || 'Engineering intelligence. Scaling ventures.';
  const storyParagraphs = (profile.aboutStoryParagraphs && profile.aboutStoryParagraphs.length > 0)
    ? profile.aboutStoryParagraphs
    : [
        `I am ${profile?.name || 'Tarun Kumar'}, a Founder, AI Engineer, and Technology Entrepreneur focused on building intelligent systems, AI-powered solutions, and technology-driven ventures.`,
        'My work sits at the intersection of Artificial Intelligence, Generative AI, Python engineering, automation, data, and entrepreneurship. I enjoy turning complex problems into practical products and scalable solutions that create measurable value.',
      ];
  const quote = profile.aboutQuote || 'I believe technology is most powerful when it moves beyond experimentation and becomes something people can actually use, scale, and build upon.';
  const pillars = (profile.competencyPillars && profile.competencyPillars.length > 0)
    ? profile.competencyPillars
    : [
        { number: '01', title: 'AI & GENAI', subtitle: 'LLMs, Intelligent Agents & Applied AI Systems' },
        { number: '02', title: 'PYTHON & AUTOMATION', subtitle: 'Scalable Microservices, APIs & Workflows' },
        { number: '03', title: 'VENTURES & COMMUNITY', subtitle: 'OrigoHOST Founder, Developer Education & Growth' },
      ];
  const spotlight = profile.spotlightCard || {
    photoUrl: '/images/tarun-headshot.jpg',
    name: profile.name || 'Tarun Kumar',
    role: profile.primaryRole || 'Founder & AI Systems Engineer',
    leadership: 'President @ OrigoHOST',
    verifiedStatus: 'VERIFIED',
  };
  const origo = profile.origohostCard || {
    logoUrl: '/images/origohost/origohost-icon.png',
    tag: 'VENTURE & COMMUNITY',
    title: 'OrigoHOST Tech Community',
    tagline: 'WHERE BUILDERS BECOME INNOVATORS',
    description: 'As Founder & President, leading institutional engagements, technical initiatives, and community growth focused on applied AI and practical developer education.',
    role: 'ROLE: FOUNDER & PRESIDENT',
    ecosystem: 'APPLIED AI ECOSYSTEM',
  };
  const log = profile.progressionLog || {
    logTitle: 'VENTURE_&_TECH_STACK.LOG',
    version: 'v2026.AI',
    items: [
      { title: 'Applied AI & GenAI Architectures', status: '✓ ACTIVE', statusType: 'active' },
      { title: 'Python Systems & Automation', status: '✓ MASTERED', statusType: 'mastered' },
      { title: 'Community & Builder Ecosystems', status: '✓ LEADING', statusType: 'leading' },
      { title: 'Scalable AI Ventures & Products', status: '⚡ SCALING', statusType: 'scaling' },
    ],
  };

  return (
    <section 
      id="about" 
      className="relative w-full bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-16 overflow-hidden flex items-center"
    >
      {/* Background Subtle Glows */}
      <div className="absolute top-1/4 left-1/6 w-[32rem] h-[32rem] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/6 right-1/4 w-[28rem] h-[28rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-4 mb-6 sm:mb-8"
        >
          <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D4AF37]">
            {eyebrow}
          </span>
          <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Main Grid: Content + Tech Blueprint Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT CONTENT (7 COLS) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Headline */}
            <motion.div variants={fadeUpVariants} className="relative mb-5 sm:mb-6 select-none">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white tracking-normal leading-[1.15]">
                {headline}
              </h2>
            </motion.div>

            {/* Narrative Paragraph */}
            <motion.div
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[14.5px] font-light text-[#C4BCB3] leading-[1.85] tracking-wide mb-6 sm:mb-8 max-w-xl space-y-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {storyParagraphs.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
              {quote && (
                <p className="text-[#D4AF37] italic border-l-2 border-[#D4AF37]/60 pl-4 bg-[#12100E]/70 py-2 rounded-r-xl text-xs sm:text-sm">
                  &ldquo;{quote}&rdquo;
                </p>
              )}
            </motion.div>

            {/* Core Competency Pillars Grid */}
            <motion.div 
              variants={fadeUpVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-[#26211B]"
            >
              {pillars.map((pillar, pilIdx) => (
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
            
            {/* Founder Portrait Spotlight Card */}
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
              
              {/* Photo Area */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-h-[440px] overflow-hidden bg-[#0A0908]">
                <img
                  src={spotlight.photoUrl || "/images/tarun-headshot.webp"}
                  alt={`${spotlight.name} — ${spotlight.role}`}
                  loading="lazy"
                  decoding="async"
                  width="440"
                  height="550"
                  className="w-full h-full object-cover object-top sm:object-[center_10%] transition-transform duration-700 group-hover:scale-[1.02]"
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
                  <p className="text-[10px] font-mono text-[#C99E5D] truncate">{origo.tagline}</p>
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

            {/* Career Progression Roadmap */}
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
                {(log.items || []).map((item, itmIdx) => {
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