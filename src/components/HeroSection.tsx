import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { profileData } from '../data/profile';
import { Navbar } from './layout/Navbar';

const heroRoles = [
  'PYTHON DEVELOPER',
  'BACKEND ARCHITECT',
  'AUTOMATION ENGINEER',
  'CLOUD & DEVOPS',
  'CONTAINER SPECIALIST',
  'AI & ML INTEGRATOR',
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const HeroSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    if (!mediaQuery.matches) {
      const interval = setInterval(() => {
        setRoleIndex((prev) => (prev + 1) % heroRoles.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Background Video / Ambient Technical Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black flex items-center justify-end">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-screen w-auto max-w-none object-contain origin-right opacity-30 scale-95 md:scale-100"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Soft Ambient Left Edge Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black pointer-events-none" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen w-full px-6 sm:px-12 lg:px-16 pt-24 pb-12">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Technical Positioning & Headline (7 Cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 z-20"
          >
            {/* Status Badge */}
            <motion.div variants={fadeUpVariants} className="mb-4 inline-flex items-center space-x-2.5 px-3 py-1 rounded-sm border border-[#8C6D4F]/40 bg-[#120F0C]/80 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </motion.div>

            {/* Massive Display Title with Functional Hero Morphing */}
            <motion.div variants={fadeUpVariants} className="relative mb-4 select-none">
              <h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.6rem] xl:text-[7.2rem] tracking-tight uppercase leading-[0.83]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448]">
                  TARUN KUMAR
                </span>
                
                {/* Hero Role Morphing Surface */}
                <div className="h-[1.1em] overflow-hidden relative">
                  {prefersReducedMotion ? (
                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
                      PYTHON DEVELOPER
                    </span>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroRoles[roleIndex]}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]"
                      >
                        {heroRoles[roleIndex]}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </div>

                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#DFBE8A] via-[#9B7640] to-[#342410]">
                  CLOUD &amp; DEVOPS
                </span>
              </h1>
            </motion.div>

            {/* Subtitle Technologies Line */}
            <motion.div variants={fadeUpVariants} className="mb-4">
              <p
                className="text-[10.5px] sm:text-xs font-mono tracking-[0.25em] uppercase text-[#D4AF37]"
              >
                PYTHON <span className="text-[#8C6D4F]">·</span> BACKEND <span className="text-[#8C6D4F]">·</span> CLOUD <span className="text-[#8C6D4F]">·</span> DEVOPS <span className="text-[#8C6D4F]">·</span> AUTOMATION <span className="text-[#8C6D4F]">·</span> AI
              </p>
            </motion.div>

            {/* Supporting Description */}
            <motion.p
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[14px] font-light text-[#A8988B] leading-[1.8] tracking-wide max-w-xl mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {profileData.narrative}
            </motion.p>

            {/* CTA Action Buttons with Morphing Button State */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <a
                href="#work"
                className="inline-flex items-center space-x-3 px-6 sm:px-7 py-3.5 border border-[#D4AF37] bg-[#D4AF37] text-black text-[11px] font-semibold tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:bg-[#E2C054]"
              >
                <span>VIEW MY WORK</span>
                <span className="text-xs">↗</span>
              </a>

              <a
                href={profileData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 sm:px-7 py-3.5 border border-[#8C6D4F]/50 hover:border-[#D4AF37] bg-[#120F0C]/90 text-[#EAD8C7] hover:text-[#FFF5EB] text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300"
              >
                <span>DOWNLOAD RESUME</span>
                <span className="text-xs">↓</span>
              </a>

              {/* Morphing Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`inline-flex items-center space-x-2 px-5 py-3.5 border text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 ${
                  copiedEmail
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                    : 'border-[#8C6D4F]/40 hover:border-[#D4AF37] bg-[#0A0806] text-[#D4AF37]'
                }`}
              >
                <span>{copiedEmail ? 'EMAIL COPIED ✓' : 'COPY EMAIL'}</span>
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT: Technical CLI Terminal Visualizer (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1.0 }}
            className="lg:col-span-5 z-20"
          >
            <div className="rounded-sm border border-[#8C6D4F]/40 bg-[#0A0806] p-6 shadow-2xl font-mono text-xs text-[#E8DFD8] relative overflow-hidden">
              {/* Top Window Dots */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#8C6D4F]/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] text-[#8C6D4F]">bash — tarun@devops-node</span>
              </div>

              {/* Terminal Commands */}
              <div className="space-y-4">
                <div>
                  <span className="text-[#D4AF37]">$</span> whoami
                  <p className="text-[#C4B5A5] pl-4 mt-0.5">tarun-kumar</p>
                </div>

                <div>
                  <span className="text-[#D4AF37]">$</span> role --primary
                  <p className="text-[#C4B5A5] pl-4 mt-0.5">python-developer</p>
                  <span className="text-[#D4AF37]">$</span> role --target
                  <p className="text-[#C4B5A5] pl-4 mt-0.5">cloud-and-devops-engineer</p>
                </div>

                <div>
                  <span className="text-[#D4AF37]">$</span> focus --active
                  <div className="pl-4 mt-0.5 text-[11px] text-[#A8988B] space-y-1">
                    <p>› backend-apis [Flask / REST]</p>
                    <p>› containerization [Docker]</p>
                    <p>› cloud-infrastructure [AWS]</p>
                    <p>› ci-cd-pipelines [GitHub Actions]</p>
                    <p>› automation-and-ai [Python / ML]</p>
                  </div>
                </div>

                <div>
                  <span className="text-[#D4AF37]">$</span> status --availability
                  <p className="text-emerald-400 pl-4 mt-0.5">[READY_FOR_DEPLOYMENT]</p>
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