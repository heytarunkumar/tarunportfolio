import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const heroRoles = [
  'FOUNDER & AI ENGINEER',
  'TECHNOLOGY ENTREPRENEUR',
  'INTELLIGENT SYSTEMS ARCHITECT',
  'FOUNDER @ ORIGOHOST',
  'GENERATIVE AI & AUTOMATION',
  'PYTHON SYSTEMS ARCHITECT',
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const HeroSection: React.FC = () => {
  const { profile } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      if (!mediaQuery.matches) {
        const interval = setInterval(() => {
          setRoleIndex((prev) => (prev + 1) % heroRoles.length);
        }, 3200);
        return () => clearInterval(interval);
      }
    }
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  const resumeUrl = profile?.resumeUrl || '/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf';

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white flex items-center">
      
      {/* Ambient Technical Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-end">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-screen w-auto max-w-none object-contain origin-right opacity-20 scale-95 md:scale-100"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Ambient Subtle Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0908] via-[#0A0908]/90 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0908]/80 via-transparent to-[#0A0908] pointer-events-none" />
        
        {/* Soft Radial Ambient Lights */}
        <div className="absolute top-1/4 left-1/4 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[160px] pointer-events-none" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pt-32 pb-20 sm:pt-36 sm:pb-24">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT: Technical Positioning & Headline (7 Cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 z-20"
          >
            {/* Status & Venture Badges */}
            <motion.div variants={fadeUpVariants} className="mb-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full border border-[#8C6D4F]/30 bg-[#12100E]/80 backdrop-blur-md">
                <img
                  src="/images/tarun-executive.jpg"
                  alt="Tarun Kumar"
                  className="w-5 h-5 rounded-full object-cover border border-[#D4AF37]/60 shrink-0"
                />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">
                  FOUNDER &amp; AI SYSTEMS ENGINEER
                </span>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#8C6D4F]/25 bg-[#141210]/60 backdrop-blur-md">
                <span className="text-[10px] font-mono text-[#C4BCB3]">
                  PRESIDENT @ <span className="text-white font-medium">ORIGOHOST</span>
                </span>
              </div>
            </motion.div>

            {/* Editorial Display Title with Dynamic Role Morphing */}
            <motion.div variants={fadeUpVariants} className="relative mb-5 select-none">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.05]">
                <span>Tarun Kumar</span>
                
                {/* Hero Role Morphing Surface */}
                <div className="h-[1.25em] overflow-hidden relative my-1 text-[#D4AF37] italic font-normal">
                  {prefersReducedMotion ? (
                    <span className="block">
                      Founder &amp; AI Engineer
                    </span>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroRoles[roleIndex]}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="block"
                      >
                        {heroRoles[roleIndex]}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </div>

                <span className="text-2xl sm:text-3xl md:text-4xl font-sans font-light text-[#C4BCB3] tracking-normal block mt-1">
                  Building practical intelligence &amp; scalable systems.
                </span>
              </div>
            </motion.div>

            {/* Subtitle Technologies Line */}
            <motion.div variants={fadeUpVariants} className="mb-6">
              <p className="text-[10.5px] sm:text-xs font-mono tracking-[0.2em] uppercase text-[#D4AF37]">
                APPLIED AI <span className="text-[#8C6D4F]">·</span> GENAI <span className="text-[#8C6D4F]">·</span> PYTHON <span className="text-[#8C6D4F]">·</span> AUTOMATION <span className="text-[#8C6D4F]">·</span> VENTURES <span className="text-[#8C6D4F]">·</span> ORIGOHOST
              </p>
            </motion.div>

            {/* Supporting Description */}
            <motion.p
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[14.5px] font-light text-[#C4BCB3] leading-[1.8] max-w-xl mb-8"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {profile.narrative}
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
            >
              {/* Primary CTA */}
              <a
                href="#projects"
                className="inline-flex items-center space-x-2 px-6 sm:px-7 py-3.5 rounded-xl border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_28px_rgba(212,175,55,0.45)] hover:scale-[1.02] cursor-pointer"
              >
                <span>EXPLORE WORK</span>
                <span className="text-xs">↗</span>
              </a>

              {/* Secondary CTA */}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 sm:px-6 py-3.5 rounded-xl border border-[#26211B] hover:border-[#D4AF37]/60 bg-[#12100E] text-[#F5F2EB] hover:text-white text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <span>DOWNLOAD RESUME</span>
                <span className="text-xs text-[#D4AF37]">↓</span>
              </a>

              {/* Morphing Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex items-center space-x-2 px-4 sm:px-5 py-3.5 rounded-xl border text-xs font-mono tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer ${
                  copiedEmail
                    ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300'
                    : 'border-[#26211B] hover:border-[#D4AF37]/50 bg-[#12100E] text-[#D4AF37]'
                }`}
              >
                <span>{copiedEmail ? 'COPIED ✓' : 'COPY EMAIL'}</span>
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Technical CLI Terminal Visualizer (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 z-20"
          >
            <div className="card-lift rounded-2xl border border-[#26211B] bg-[#12100E]/95 p-6 sm:p-7 shadow-2xl font-mono text-xs text-[#F5F2EB] relative overflow-hidden backdrop-blur-md">
              {/* Top Window Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

              {/* Window Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#26211B] text-[#8C6D4F]">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] text-[#8C6D4F]">tarun@ai-venture ~ bash</span>
              </div>

              {/* Founder Identity Card */}
              <div className="flex items-center space-x-3.5 p-3 rounded-xl bg-[#0A0908] border border-[#26211B] mb-4">
                <img
                  src="/images/tarun-executive.jpg"
                  alt="Tarun Kumar"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-[#D4AF37]/50 shadow-md shrink-0"
                />
                <div className="font-mono min-w-0">
                  <div className="text-[#F5F2EB] font-sans font-semibold text-xs sm:text-[13px] truncate">Tarun Kumar</div>
                  <div className="text-[#D4AF37] text-[10.5px] truncate">Founder &amp; AI Systems Engineer</div>
                  <div className="text-[9.5px] text-emerald-400 flex items-center space-x-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ACTIVE · BUILDING VENTURES</span>
                  </div>
                </div>
              </div>

              {/* Terminal Commands & Insights */}
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[#D4AF37]">$</span> whoami
                  <p className="text-[#E8E3D8] pl-3.5 mt-0.5 font-medium">tarun-kumar [Founder &amp; AI Engineer]</p>
                </div>

                <div>
                  <span className="text-[#D4AF37]">$</span> ventures --active
                  <p className="text-[#F7E7C4] pl-3.5 mt-0.5">› OrigoHOST Tech Community</p>
                  <p className="text-[#8C827A] pl-3.5 text-[10.5px]">  &quot;WHERE BUILDERS BECOME INNOVATORS&quot;</p>
                </div>

                <div>
                  <span className="text-[#D4AF37]">$</span> core-stack --status
                  <div className="pl-3.5 mt-0.5 text-[11px] text-[#C4BCB3] space-y-1">
                    <p>› applied-ai [LLMs / Intelligent Agents / XAI]</p>
                    <p>› python-engineering [FastAPI / Microservices]</p>
                    <p>› data-systems [ML Pipelines / Tabular Risk Scoring]</p>
                    <p>› devops-track <span className="text-amber-400 text-[10px] font-semibold">[LEARNING &amp; EXPLORING]</span></p>
                  </div>
                </div>

                <div>
                  <span className="text-[#D4AF37]">$</span> current-mission
                  <p className="text-emerald-400 pl-3.5 mt-0.5 font-semibold">[TURNING_PROBLEMS_INTO_SCALABLE_PRODUCTS]</p>
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