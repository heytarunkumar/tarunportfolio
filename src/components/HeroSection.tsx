import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const heroRoles = [
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
      ease: [0.22, 0.61, 0.36, 1],
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
    : heroRoles;

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
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  const resumeUrl = profile.heroSecondaryCtaLink || profile.resumeUrl || '/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf';
  const heroSubtitle = profile.heroSubtitle || 'Building practical intelligence & scalable systems.';
  const heroBadgeText = profile.heroBadgeText || 'FOUNDER & AI SYSTEMS ENGINEER';
  const heroVentureBadge = profile.heroVentureBadge || 'PRESIDENT @ ORIGOHOST';
  const primaryCtaText = profile.heroPrimaryCtaText || 'EXPLORE WORK';
  const primaryCtaLink = profile.heroPrimaryCtaLink || '#projects';
  const secondaryCtaText = profile.heroSecondaryCtaText || 'DOWNLOAD RESUME';
  
  const terminal = profile.heroTerminal || {
    title: 'tarun@editorial-executive ~ zsh',
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
    avatarUrl: '/images/tarun-light-portrait.webp',
  };

  return (
    <section className="relative w-full min-h-screen bg-[#F4EEE4] text-[#202020] font-sans selection:bg-[#78000F] selection:text-[#F4EEE4] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      
      {/* Background Subtle Paper Texture & Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-gradient-to-bl from-[#DDD2C2]/40 via-[#F4EEE4]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-gradient-to-tr from-[#FAF8F3]/70 via-[#DDD2C2]/20 to-transparent rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* LEFT: Oversized Editorial Identity & Positioning (7 Cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Top Badges / Architectural Markers */}
            <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-[3px] bg-[#FAF8F3] border border-[#CFC3B3] text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#78000F] font-semibold uppercase shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#78000F] animate-pulse" />
                <span>{heroBadgeText}</span>
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-[3px] bg-[#FAF8F3]/60 border border-[#DDD2C2] text-[10px] sm:text-[11px] font-mono tracking-[0.18em] text-[#555047] uppercase">
                {heroVentureBadge}
              </span>
            </motion.div>

            {/* Oversized Signature Display Typography */}
            <motion.div variants={fadeUpVariants} className="mb-4 sm:mb-6 select-none">
              <div className="flex flex-col">
                <h1 className="font-serif font-bold text-[#78000F] leading-[0.84] tracking-[-0.05em] text-[4.5rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[7rem] xl:text-[8.5rem] 2xl:text-[10rem]">
                  <span className="block italic font-normal text-[0.85em] tracking-[-0.04em] text-[#78000F]">Mr.</span>
                  <span className="block text-[#78000F]">Tarun</span>
                  <span className="block text-[#78000F]">Kumar</span>
                </h1>
              </div>
            </motion.div>

            {/* Dynamic Role Subtitle */}
            <motion.div variants={fadeUpVariants} className="mb-4 sm:mb-5">
              <div className="min-h-[1.4em] flex items-center">
                <span className="text-xs sm:text-sm font-mono tracking-[0.22em] uppercase text-[#78000F] font-bold mr-2">
                  FOCUS:
                </span>
                {prefersReducedMotion ? (
                  <span className="text-xs sm:text-sm font-mono tracking-[0.16em] uppercase text-[#202020] font-medium">
                    {activeHeroRoles[0] || 'FOUNDER & AI SYSTEMS ENGINEER'}
                  </span>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeHeroRoles[roleIndex % activeHeroRoles.length] || 'role'}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                      className="text-xs sm:text-sm font-mono tracking-[0.16em] uppercase text-[#202020] font-semibold"
                    >
                      {activeHeroRoles[roleIndex % activeHeroRoles.length]}
                    </motion.span>
                  </AnimatePresence>
                )}
              </div>
              <p className="text-sm sm:text-base font-serif italic text-[#4A4640] mt-1.5 font-normal">
                Python Developer · AI Engineer · Researcher · Author · Founder
              </p>
              <p className="text-xs font-sans text-[#736B60] mt-0.5">
                {heroSubtitle}
              </p>
            </motion.div>

            {/* Narrative Excerpt */}
            <motion.p
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[14.5px] font-normal text-[#38342E] leading-[1.8] max-w-xl mb-7 sm:mb-9"
            >
              {profile.narrative}
            </motion.p>

            {/* Executive Action CTAs */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
            >
              {/* Primary CTA */}
              <a
                href={primaryCtaLink}
                className="btn-executive-primary inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3.5 text-xs font-mono tracking-[0.18em] uppercase cursor-pointer"
              >
                <span>{primaryCtaText}</span>
                <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>

              {/* Secondary CTA */}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-executive-secondary inline-flex items-center justify-center space-x-2 px-5 sm:px-6 py-3.5 text-xs font-mono tracking-[0.18em] uppercase cursor-pointer"
              >
                <span>{secondaryCtaText}</span>
                <span className="text-xs text-[#78000F]">↓</span>
              </a>

              {/* Copy Email Action */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex items-center justify-center space-x-2 px-4 sm:px-5 py-3.5 rounded-[4px] border text-xs font-mono tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer ${
                  copiedEmail
                    ? 'border-[#0F6848] bg-[#E8F5EE] text-[#0F6848] font-semibold'
                    : 'border-[#CFC3B3] hover:border-[#78000F] bg-[#FAF8F3] text-[#202020] hover:text-[#78000F]'
                }`}
              >
                <span>{copiedEmail ? 'COPIED ✓' : 'COPY EMAIL'}</span>
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Executive Portrait Photography & Architectural Spec (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center w-full"
          >
            <div className="w-full max-w-lg relative">
              
              {/* Architectural Frame & Corner Marks */}
              <div className="relative rounded-[4px] overflow-hidden border border-[#CFC3B3] bg-[#FAF8F3] p-2.5 sm:p-3.5 shadow-xl">
                
                {/* Image Container with Elegant Subtle Zoom on Hover */}
                <div className="relative overflow-hidden rounded-[2px] bg-[#FAF8F3] aspect-[4/5] w-full group">
                  <img
                    src="/images/tarun-light-portrait.webp"
                    alt="Mr. Tarun Kumar — Founder & AI Systems Engineer"
                    width="600"
                    height="750"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                  
                  {/* Subtle Vignette & Frame Lighting */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Badge Over Portrait */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-[#F4EEE4] font-mono text-[10px] sm:text-[11px] tracking-[0.16em]">
                    <div className="flex items-center space-x-1.5 bg-[#111111]/85 backdrop-blur-md px-2.5 py-1 rounded-[2px] border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="font-medium uppercase">FOUNDER IDENTITY</span>
                    </div>
                    <span className="bg-[#78000F]/90 backdrop-blur-md px-2 py-1 rounded-[2px] font-semibold text-white">
                      AUTONOMOUS SYSTEMS
                    </span>
                  </div>
                </div>

                {/* Minimal Architectural Spec Below Portrait */}
                <div className="mt-3 pt-3 border-t border-[#DDD2C2] grid grid-cols-2 gap-2 text-left font-mono text-[10.5px]">
                  <div>
                    <span className="text-[#8C8275] block text-[9px] uppercase tracking-wider">VENTURE ROLE</span>
                    <span className="text-[#202020] font-medium font-sans text-xs truncate block">{terminal.ventureQuote}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#8C8275] block text-[9px] uppercase tracking-wider">STATUS</span>
                    <span className="text-[#78000F] font-bold truncate block">{terminal.status}</span>
                  </div>
                </div>

              </div>

              {/* Decorative Architectural Accent Line */}
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-[#8C8275] px-1">
                <span>EST. 2026 // IDENTITY SYSTEM</span>
                <span className="text-[#78000F] font-semibold">OXBLOOD × IVORY</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;