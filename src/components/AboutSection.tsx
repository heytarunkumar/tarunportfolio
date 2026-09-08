import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.12,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const AboutSection: React.FC = () => {
  const { profile } = usePortfolio();

  return (
    <section 
      id="about" 
      className="relative w-full min-h-screen bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37] selection:text-black py-24 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden flex items-center"
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
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center space-x-4 mb-10"
        >
          <span 
            className="text-[11px] font-semibold tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            01 / MISSION &amp; PHILOSOPHY
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
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#E8E3D8] to-[#7A6E62]">
                  ENGINEERING INTELLIGENCE.
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#634824]">
                  SCALING VENTURES.
                </span>
              </h2>
            </motion.div>

            {/* Narrative Paragraph */}
            <motion.div
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[14.5px] font-light text-[#C4BCB3] leading-[1.85] tracking-wide mb-8 max-w-xl space-y-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <p>
                I am <span className="text-[#F7E7C4] font-medium">{profile?.name || 'Tarun Kumar'}</span>, a Founder, AI Engineer, and Technology Entrepreneur focused on building intelligent systems, AI-powered solutions, and technology-driven ventures.
              </p>
              <p>
                My work sits at the intersection of <span className="text-white font-medium">Artificial Intelligence, Generative AI, Python engineering, automation, data, and entrepreneurship</span>. I enjoy turning complex problems into practical products and scalable solutions that create measurable value.
              </p>
              <p className="text-[#D4AF37] italic border-l-2 border-[#D4AF37]/50 pl-3.5 bg-[#12100E]/40 py-1 rounded-r">
                &ldquo;I believe technology is most powerful when it moves beyond experimentation and becomes something people can actually use, scale, and build upon.&rdquo;
              </p>
            </motion.div>

            {/* Core Competency Pillars Grid */}
            <motion.div 
              variants={fadeUpVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#8C6D4F]/25"
            >
              <div className="card-lift p-4 rounded-sm border border-[#8C6D4F]/25 bg-[#12100E]">
                <span className="text-[10px] font-mono text-[#D4AF37] block mb-1">
                  01 // AI &amp; GENAI
                </span>
                <p className="text-xs font-mono text-[#F5F2EB]">
                  LLMs, Intelligent Agents &amp; Applied AI Systems
                </p>
              </div>

              <div className="card-lift p-4 rounded-sm border border-[#8C6D4F]/25 bg-[#12100E]">
                <span className="text-[10px] font-mono text-[#D4AF37] block mb-1">
                  02 // PYTHON &amp; AUTOMATION
                </span>
                <p className="text-xs font-mono text-[#F5F2EB]">
                  Scalable Microservices, APIs &amp; Workflows
                </p>
              </div>

              <div className="card-lift p-4 rounded-sm border border-[#8C6D4F]/25 bg-[#12100E]">
                <span className="text-[10px] font-mono text-[#D4AF37] block mb-1">
                  03 // VENTURES &amp; COMMUNITY
                </span>
                <p className="text-xs font-mono text-[#F5F2EB]">
                  OrigoHOST Founder, Developer Education &amp; Growth
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT ARCHITECTURE BLUEPRINT & COMMUNITY CARD (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col space-y-6 relative">
            
            {/* OrigoHOST Highlight Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="card-lift relative p-6 border border-[#8C6D4F]/40 rounded-sm bg-[#12100E] shadow-2xl overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />
              
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src="/images/origohost/origohost-icon.png"
                  alt="OrigoHOST Tech Community"
                  className="w-12 h-12 object-contain rounded-md bg-[#0A0908] border border-[#8C6D4F]/30 p-1"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase">VENTURE &amp; COMMUNITY</span>
                    <span className="px-1.5 py-0.2 text-[9px] font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 rounded-sm">ACTIVE</span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    OrigoHOST Tech Community
                  </h3>
                  <p className="text-[10px] font-mono text-[#C99E5D]">WHERE BUILDERS BECOME INNOVATORS</p>
                </div>
              </div>

              <p className="text-xs font-light text-[#C4BCB3] leading-relaxed mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                As Founder &amp; President, leading institutional engagements, technical initiatives, and community growth focused on applied AI and practical developer education.
              </p>

              <div className="pt-3 border-t border-[#8C6D4F]/20 flex items-center justify-between text-[11px] font-mono text-[#8C6D4F]">
                <span>ROLE: FOUNDER &amp; PRESIDENT</span>
                <span className="text-[#D4AF37]">APPLIED AI ECOSYSTEM</span>
              </div>
            </motion.div>

            {/* Career Progression Roadmap */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="card-lift relative p-6 border border-[#8C6D4F]/35 rounded-sm bg-[#12100E]/90 shadow-2xl w-full font-mono text-xs overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#8C6D4F]/20 text-[#8C6D4F]">
                <span className="text-[10px]">VENTURE_&amp;_TECH_STACK.LOG</span>
                <span className="text-[#D4AF37]">v2026.AI</span>
              </div>

              <div className="space-y-2.5 text-[11px]">
                <div className="p-2 rounded border border-[#8C6D4F]/20 bg-[#1A1714] flex items-center justify-between">
                  <span className="text-white">Applied AI &amp; GenAI Architectures</span>
                  <span className="text-emerald-400 font-semibold">✓ ACTIVE</span>
                </div>

                <div className="p-2 rounded border border-[#8C6D4F]/20 bg-[#1A1714] flex items-center justify-between">
                  <span className="text-white">Python Systems &amp; Automation</span>
                  <span className="text-emerald-400 font-semibold">✓ MASTERED</span>
                </div>

                <div className="p-2 rounded border border-[#8C6D4F]/20 bg-[#1A1714] flex items-center justify-between">
                  <span className="text-white">Community &amp; Builder Ecosystems</span>
                  <span className="text-emerald-400 font-semibold">✓ LEADING</span>
                </div>

                <div className="p-2 rounded border border-[#D4AF37]/40 bg-[#1E1914] flex items-center justify-between">
                  <span className="text-[#F7E7C4]">Scalable AI Ventures &amp; Products</span>
                  <span className="text-[#D4AF37] font-semibold">⚡ SCALING</span>
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