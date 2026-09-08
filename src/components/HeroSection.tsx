import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Navbar } from './layout/Navbar';

const heroRoles = [
  'FOUNDER & AI ENGINEER',
  'TECHNOLOGY ENTREPRENEUR',
  'INTELLIGENT SYSTEMS ARCHITECT',
  'FOUNDER @ ORIGOHOST',
  'GENERATIVE AI & AUTOMATION',
  'PYTHON ENGINEERING',
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

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Ambient Technical Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-end">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-screen w-auto max-w-none object-contain origin-right opacity-25 scale-95 md:scale-100"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Ambient Subtle Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0908] via-[#0A0908]/92 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0908]/80 via-transparent to-[#0A0908] pointer-events-none" />
        
        {/* Soft Radial Ambient Lights */}
        <div className="absolute top-1/4 left-1/4 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[160px] pointer-events-none" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen w-full px-6 sm:px-12 lg:px-16 pt-28 pb-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Technical Positioning & Headline (7 Cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 z-20"
          >
            {/* Status & Venture Badges */}
            <motion.div variants={fadeUpVariants} className="mb-5 flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-sm border border-[#8C6D4F]/40 bg-[#12100E]/80 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">
                  FOUNDER &amp; AI SYSTEMS ENGINEER
                </span>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-sm border border-[#8C6D4F]/20 bg-[#141210]/60 backdrop-blur-md">
                <span className="text-[9.5px] font-mono text-[#C4BCB3]">
                  PRESIDENT @ <span className="text-white font-medium">ORIGOHOST</span>
                </span>
              </div>
            </motion.div>

            {/* Editorial Display Title with Dynamic Role Morphing */}
            <motion.div variants={fadeUpVariants} className="relative mb-5 select-none">
              <h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.4rem] xl:text-[7rem] tracking-tight uppercase leading-[0.85]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#E8E3D8] to-[#7A6E62]">
                  TARUN KUMAR
                </span>
                
                {/* Hero Role Morphing Surface */}
                <div className="h-[1.12em] overflow-hidden relative">
                  {prefersReducedMotion ? (
                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
                      AI ENGINEER
                    </span>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroRoles[roleIndex]}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -24 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#634824]"
                      >
                        {heroRoles[roleIndex]}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </div>

                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#DFBE8A] via-[#9B7640] to-[#3B2912]">
                  INTELLIGENT SYSTEMS
                </span>
              </h1>
            </motion.div>

            {/* Subtitle Technologies Line */}
            <motion.div variants={fadeUpVariants} className="mb-5">
              <p
                className="text-[10px] sm:text-xs font-mono tracking-[0.22em] uppercase text-[#D4AF37]"
              >
                APPLIED AI <span className="text-[#8C6D4F]">·</span> GENAI <span className="text-[#8C6D4F]">·</span> PYTHON <span className="text-[#8C6D4F]">·</span> AUTOMATION <span className="text-[#8C6D4F]">·</span> VENTURES <span className="text-[#8C6D4F]">·</span> ORIGOHOST
              </p>
            </motion.div>

            {/* Supporting Description */}
            <motion.p
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[14px] font-light text-[#C4BCB3] leading-[1.8] tracking-wide max-w-xl mb-8"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {profile.narrative}
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-4 sm:gap-5"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <a
                href="#work"
                className="inline-flex items-center space-x-2.5 px-6 sm:px-7 py-3.5 border border-[#D4AF37] bg-[#D4AF37] text-black text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.22)] hover:bg-[#E2C054] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]"
              >
                <span>EXPLORE WORK</span>
                <span className="text-xs">↗</span>
              </a>

              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 sm:px-7 py-3.5 border border-[#8C6D4F]/50 hover:border-[#D4AF37] bg-[#12100E]/90 text-[#F5F2EB] hover:text-[#FFF5EB] text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300"
              >
                <span>DOWNLOAD RESUME</span>
                <span className="text-xs text-[#D4AF37]">↓</span>
              </a>

              {/* Morphing Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex items-center space-x-2 px-5 py-3.5 border text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
                  copiedEmail
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                    : 'border-[#8C6D4F]/40 hover:border-[#D4AF37] bg-[#0A0908] text-[#D4AF37]'
                }`}
              >
                <span>{copiedEmail ? 'EMAIL COPIED ✓' : 'COPY EMAIL'}</span>
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Technical CLI Terminal Visualizer (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 z-20"
          >
            <div className="card-lift rounded-sm border border-[#8C6D4F]/40 bg-[#12100E]/95 p-6 shadow-2xl font-mono text-xs text-[#F5F2EB] relative overflow-hidden backdrop-blur-md">
              {/* Top Window Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

              {/* Window Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#8C6D4F]/20 text-[#8C6D4F]">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] text-[#8C6D4F]">system — tarun@ai-venture</span>
              </div>

              {/* Terminal Commands & Insights */}
              <div className="space-y-4">
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
                    <p>› python-engineering [FastAPI / Flask / Microservices]</p>
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