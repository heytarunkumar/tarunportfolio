import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const defaultHeroRoles = [
  'FOUNDER & AI SYSTEMS ENGINEER',
  'PYTHON SYSTEMS ARCHITECT',
  'INTELLIGENT SYSTEMS RESEARCHER',
  'PRESIDENT @ ORIGOHOST COMMUNITY',
  'GENERATIVE AI & AGENTIC ARCHITECT',
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const HeroSection: React.FC = () => {
  const { profile } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const activeHeroRoles = (profile.heroRoles && profile.heroRoles.length > 0)
    ? profile.heroRoles
    : defaultHeroRoles;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      if (!mediaQuery.matches && activeHeroRoles.length > 0) {
        const interval = setInterval(() => {
          setRoleIndex((prev) => (prev + 1) % activeHeroRoles.length);
        }, 3600);
        return () => clearInterval(interval);
      }
    }
  }, [activeHeroRoles.length]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email || 'tarunsinghchaudharyy@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  const resumeUrl = profile.heroSecondaryCtaLink || profile.resumeUrl || '/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf';
  const heroSubtitle = profile.heroSubtitle || 'Building practical intelligence & scalable systems.';
  const heroTagline = profile.heroTagline || 'PYTHON · GENERATIVE AI · AGENTIC SYSTEMS · FASTAPI · RESEARCH';
  const heroBadgeText = profile.heroBadgeText || 'FOUNDER & AI SYSTEMS ENGINEER';
  const heroVentureBadge = profile.heroVentureBadge || 'PRESIDENT @ ORIGOHOST';
  const primaryCtaText = profile.heroPrimaryCtaText || 'EXPLORE WORK';
  const primaryCtaLink = profile.heroPrimaryCtaLink || '#projects';
  const secondaryCtaText = profile.heroSecondaryCtaText || 'DOWNLOAD RESUME';
  
  const terminal = profile.heroTerminal || {
    title: 'tarun@ai-venture ~ bash',
    whoami: 'Tarun Kumar [Founder & AI Systems Engineer]',
    venture: 'OrigoHOST Tech Community (origohost.in)',
    ventureQuote: 'WHERE BUILDERS BECOME INNOVATORS',
    status: 'ACTIVE · SCALING APPLIED AI VENTURES',
    mission: '[TURNING_PROBLEMS_INTO_SCALABLE_PRODUCTS]',
    stack: [
      'applied-ai [LLMs / Intelligent Agents / XAI]',
      'python-engineering [FastAPI / Microservices / AsyncIO]',
      'data-systems [ML Pipelines / Tabular Risk Scoring]',
      'cloud-devops [AWS / Docker / Kubernetes / CI/CD]',
    ],
    avatarUrl: '/images/tarun-executive.webp',
  };

  return (
    <section className="relative w-full min-h-screen bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      
      {/* Background Ambient Studio Lighting & Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] sm:w-[54rem] h-[30rem] bg-[#D4AF37]/5 rounded-full blur-[170px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8C6D4F]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* LEFT: Typography, Positioning & Narrative (7 Cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Top Badges / Architectural Markers */}
            <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#12100E] border border-[#D4AF37]/40 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#D4AF37] font-semibold uppercase shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{heroBadgeText}</span>
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#12100E]/70 border border-[#26211B] text-[10px] sm:text-[11px] font-mono tracking-[0.18em] text-[#A8988B] uppercase">
                {heroVentureBadge}
              </span>
            </motion.div>

            {/* Oversized Signature Display Typography */}
            <motion.div variants={fadeUpVariants} className="mb-4 sm:mb-6 select-none">
              <div className="flex flex-col">
                <h1 className="font-serif font-medium text-white leading-[0.9] tracking-tight text-[3.5rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[6rem] xl:text-[7.5rem]">
                  Tarun Kumar
                </h1>
              </div>
            </motion.div>

            {/* Dynamic Role Subtitle */}
            <motion.div variants={fadeUpVariants} className="mb-4 sm:mb-5">
              <div className="min-h-[1.4em] flex items-center">
                <span className="text-xs sm:text-sm font-mono tracking-[0.22em] uppercase text-[#D4AF37] font-bold mr-2">
                  FOCUS:
                </span>
                {prefersReducedMotion ? (
                  <span className="text-xs sm:text-sm font-mono tracking-[0.16em] uppercase text-[#F5F2EB] font-medium">
                    {activeHeroRoles[0] || 'FOUNDER & AI SYSTEMS ENGINEER'}
                  </span>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeHeroRoles[roleIndex % activeHeroRoles.length] || 'role'}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="text-xs sm:text-sm font-mono tracking-[0.16em] uppercase text-[#F7E7C4] font-semibold"
                    >
                      {activeHeroRoles[roleIndex % activeHeroRoles.length]}
                    </motion.span>
                  </AnimatePresence>
                )}
              </div>
              <p className="text-sm sm:text-base font-serif italic text-[#C4BCB3] mt-1.5 font-normal">
                Python Developer · AI Engineer · Researcher · Author · Founder
              </p>
              <p className="text-xs font-sans text-[#A8988B] mt-0.5">
                {heroSubtitle}
              </p>
              <p className="text-xs font-mono text-[#8C6D4F] mt-1 tracking-wider uppercase">
                {heroTagline}
              </p>
            </motion.div>

            {/* Narrative Excerpt */}
            <motion.p
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[14.5px] font-normal text-[#C4BCB3] leading-[1.8] max-w-xl mb-7 sm:mb-9"
            >
              {profile.narrative}
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
            >
              {/* Primary CTA */}
              <a
                href={primaryCtaLink}
                className="inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3.5 rounded-xl border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] hover:from-[#E5C358] hover:to-[#D4AF37] text-[#0A0908] text-xs font-bold font-mono tracking-[0.18em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_28px_rgba(212,175,55,0.45)] hover:scale-[1.02] cursor-pointer"
              >
                <span>{primaryCtaText}</span>
                <span className="text-sm">↗</span>
              </a>

              {/* Secondary CTA */}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-5 sm:px-6 py-3.5 rounded-xl border border-[#26211B] hover:border-[#D4AF37]/60 bg-[#12100E] text-[#F5F2EB] hover:text-white text-xs font-medium font-mono tracking-[0.18em] uppercase transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <span>{secondaryCtaText}</span>
                <span className="text-xs text-[#D4AF37]">↓</span>
              </a>

              {/* Copy Email Action */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex items-center justify-center space-x-2 px-4 sm:px-5 py-3.5 rounded-xl border text-xs font-mono tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer ${
                  copiedEmail
                    ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300 font-semibold'
                    : 'border-[#26211B] hover:border-[#D4AF37]/50 bg-[#12100E] text-[#C4BCB3] hover:text-[#D4AF37]'
                }`}
              >
                <span>{copiedEmail ? 'COPIED ✓' : 'COPY EMAIL'}</span>
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Technical CLI Terminal Visualizer (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center w-full"
          >
            <div className="w-full max-w-lg card-lift rounded-2xl border border-[#26211B] bg-[#12100E]/95 p-5 sm:p-7 shadow-2xl font-mono text-xs text-[#F5F2EB] relative overflow-hidden backdrop-blur-md">
              {/* Top Window Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

              {/* Window Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#26211B] text-[#8C6D4F]">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] text-[#8C6D4F] truncate max-w-[200px]">{terminal.title || 'tarun@ai-venture ~ bash'}</span>
              </div>

              {/* Founder Identity Card */}
              <div className="flex items-center space-x-3 sm:space-x-3.5 p-3 rounded-xl bg-[#0A0908] border border-[#26211B] mb-4">
                <img
                  src={terminal.avatarUrl || "/images/tarun-executive.webp"}
                  alt="Tarun Kumar — Python Developer and AI Engineer"
                  width="48"
                  height="48"
                  decoding="async"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-[#D4AF37]/50 shadow-md shrink-0"
                />
                <div className="font-mono min-w-0 flex-1">
                  <div className="text-[#F5F2EB] font-sans font-semibold text-xs sm:text-[13px] truncate">{profile.name}</div>
                  <div className="text-[#D4AF37] text-[10px] sm:text-[10.5px] truncate">{profile.primaryRole || 'Founder & AI Systems Engineer'}</div>
                  <div className="text-[9px] sm:text-[9.5px] text-emerald-400 flex items-center space-x-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="truncate">{terminal.status || 'ACTIVE · BUILDING VENTURES'}</span>
                  </div>
                </div>
              </div>

              {/* Terminal Commands & Insights */}
              <div className="space-y-3.5 sm:space-y-4 text-xs break-words">
                <div>
                  <span className="text-[#D4AF37]">$</span> whoami
                  <p className="text-[#E8E3D8] pl-3.5 mt-0.5 font-medium break-words">{terminal.whoami}</p>
                </div>

                <div>
                  <span className="text-[#D4AF37]">$</span> ventures --active
                  <p className="text-[#F7E7C4] pl-3.5 mt-0.5 break-words">› {terminal.venture}</p>
                  <p className="text-[#8C827A] pl-3.5 text-[10.5px] break-words">  &quot;{terminal.ventureQuote}&quot;</p>
                </div>

                <div>
                  <span className="text-[#D4AF37]">$</span> core-stack --status
                  <div className="pl-3.5 mt-0.5 text-[11px] text-[#C4BCB3] space-y-1">
                    {(terminal.stack || []).map((st: string, sIdx: number) => (
                      <p key={sIdx} className="break-words">› {st}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[#D4AF37]">$</span> current-mission
                  <p className="text-emerald-400 pl-3.5 mt-0.5 font-semibold break-words">{terminal.mission}</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;