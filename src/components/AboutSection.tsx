import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const AboutSection: React.FC = () => {
  const { profile } = usePortfolio();

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-24 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden flex items-center"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/6 w-[32rem] h-[32rem] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/6 right-1/4 w-[28rem] h-[28rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-4 mb-10"
        >
          <span 
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            01 / ABOUT MY JOURNEY
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Main Grid: Content + Tech Blueprint Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT CONTENT (7 COLS) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Headline */}
            <motion.div variants={fadeUpVariants} className="relative mb-6 select-none">
              <h2
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] tracking-tight uppercase leading-[0.88]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448]">
                  BUILDING BACKEND APIS.
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
                  EVOLVING CLOUD &amp; DEVOPS.
                </span>
              </h2>
            </motion.div>

            {/* Narrative Paragraph */}
            <motion.p
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[14.5px] font-light text-[#B3A497] leading-[1.85] tracking-wide mb-8 max-w-xl"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              I am <span className="text-[#F3DBB3] font-medium">{profile?.name || 'Tarun Kumar'}</span>, a software developer specializing in Python backend systems, REST APIs, automation workflows, and cloud-based architecture.
              <br /><br />
              {profile?.narrative || 'My software engineering philosophy is grounded in clean code principles, system reliability, and continuous learning.'}
            </motion.p>

            {/* Core Competency Pillars Grid */}
            <motion.div 
              variants={fadeUpVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#8C6D4F]/25"
            >
              <div className="p-4 rounded-sm border border-[#8C6D4F]/25 bg-[#0E0C0A]">
                <span className="text-[10px] font-mono text-[#D4AF37] block mb-1">
                  01 // BACKEND & APIS
                </span>
                <p className="text-xs font-mono text-[#E8DFD8]">
                  Python, Flask, OOP &amp; REST API Design
                </p>
              </div>

              <div className="p-4 rounded-sm border border-[#8C6D4F]/25 bg-[#0E0C0A]">
                <span className="text-[10px] font-mono text-[#D4AF37] block mb-1">
                  02 // CLOUD & DEVOPS
                </span>
                <p className="text-xs font-mono text-[#E8DFD8]">
                  Linux, Docker, AWS &amp; CI/CD Pipelines
                </p>
              </div>

              <div className="p-4 rounded-sm border border-[#8C6D4F]/25 bg-[#0E0C0A]">
                <span className="text-[10px] font-mono text-[#D4AF37] block mb-1">
                  03 // AI & AUTOMATION
                </span>
                <p className="text-xs font-mono text-[#E8DFD8]">
                  Machine Learning &amp; Streamlit Apps
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT ARCHITECTURE BLUEPRINT CARD (5 COLS) */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0 }}
              className="relative p-6 border border-[#8C6D4F]/40 rounded-sm bg-[#0E0C0A] shadow-2xl w-full font-mono text-xs overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#8C6D4F]/20 text-[#8C6D4F]">
                <span className="text-[10px]">CAREER_PROGRESSION_ROADMAP.LOG</span>
                <span className="text-[#D4AF37]">v2026.1</span>
              </div>

              <div className="space-y-3 text-[11px]">
                <div className="p-2.5 rounded border border-[#8C6D4F]/20 bg-[#14100D] flex items-center justify-between">
                  <span className="text-white">Python Development</span>
                  <span className="text-emerald-400">✓ MASTERED</span>
                </div>

                <div className="text-center text-[#8C6D4F] text-[10px]">↓</div>

                <div className="p-2.5 rounded border border-[#8C6D4F]/20 bg-[#14100D] flex items-center justify-between">
                  <span className="text-white">Backend APIs &amp; Databases</span>
                  <span className="text-emerald-400">✓ MASTERED</span>
                </div>

                <div className="text-center text-[#8C6D4F] text-[10px]">↓</div>

                <div className="p-2.5 rounded border border-[#8C6D4F]/20 bg-[#14100D] flex items-center justify-between">
                  <span className="text-white">Linux &amp; Shell Scripting</span>
                  <span className="text-emerald-400">✓ APPLIED</span>
                </div>

                <div className="text-center text-[#8C6D4F] text-[10px]">↓</div>

                <div className="p-2.5 rounded border border-[#8C6D4F]/20 bg-[#14100D] flex items-center justify-between">
                  <span className="text-white">Docker &amp; CI/CD Pipelines</span>
                  <span className="text-amber-400">⚡ BUILDING</span>
                </div>

                <div className="text-center text-[#8C6D4F] text-[10px]">↓</div>

                <div className="p-2.5 rounded border border-[#D4AF37]/40 bg-[#1E1914] flex items-center justify-between">
                  <span className="text-[#F7E7C4]">AWS Cloud &amp; Terraform</span>
                  <span className="text-[#D4AF37]">⚡ BUILDING</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;