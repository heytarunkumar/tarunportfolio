import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { profileData } from '../data/profile';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
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
  return (
    <section 
      id="about" 
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-[#05060A] text-[#F1F5F9] font-sans overflow-hidden border-t border-white/5"
    >
      {/* Background Orbs */}
      <div className="glow-orb-cyan top-1/3 right-10" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-3 mb-8"
        >
          <span className="text-xs font-mono font-semibold uppercase text-cyan-400 tracking-widest">
            01 // ABOUT MY JOURNEY
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-cyan-500/80 to-transparent" />
        </motion.div>

        {/* Main Grid: Content + Interactive Roadmap Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT CONTENT (7 COLS) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Headline */}
            <motion.div variants={fadeUpVariants} className="relative mb-6 select-none">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                <span className="block text-white">
                  Engineered Python Backends.
                </span>
                <span className="block text-gradient-cyan">
                  Evolving Cloud &amp; DevOps.
                </span>
              </h2>
            </motion.div>

            {/* Detailed Narrative */}
            <motion.p
              variants={fadeUpVariants}
              className="text-base text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl"
            >
              {profileData.bio}
            </motion.p>

            {/* Core Pillars Grid */}
            <motion.div 
              variants={fadeUpVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10"
            >
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold mb-3">
                  01
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Backend APIs</h3>
                <p className="text-xs text-slate-400 font-mono">Python · Flask · REST · SQL · OOP</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold mb-3">
                  02
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Cloud &amp; DevOps</h3>
                <p className="text-xs text-slate-400 font-mono">Docker · Linux · AWS · CI/CD · IaC</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-emerald-500/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold mb-3">
                  03
                </div>
                <h3 className="text-sm font-bold text-white mb-1">AI &amp; Automation</h3>
                <p className="text-xs text-slate-400 font-mono">Machine Learning · Streamlit · GenAI</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT ROADMAP BLUEPRINT CARD (5 COLS) */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-7 rounded-2xl w-full font-mono text-xs overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 text-slate-400">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                  TECHNICAL_ROADMAP.LOG
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[10px]">
                  VERIFIED
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-emerald-500/30 flex items-center justify-between">
                  <span className="text-slate-200 font-sans font-medium text-xs">1. Python Core &amp; OOP</span>
                  <span className="text-emerald-400 font-bold">✓ APPLIED</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-emerald-500/30 flex items-center justify-between">
                  <span className="text-slate-200 font-sans font-medium text-xs">2. REST APIs &amp; Databases</span>
                  <span className="text-emerald-400 font-bold">✓ APPLIED</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-cyan-500/30 flex items-center justify-between">
                  <span className="text-slate-200 font-sans font-medium text-xs">3. Linux Systems Administration</span>
                  <span className="text-cyan-300 font-bold">✓ APPLIED</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-amber-500/30 flex items-center justify-between">
                  <span className="text-slate-200 font-sans font-medium text-xs">4. Docker &amp; CI/CD Automation</span>
                  <span className="text-amber-400 font-bold">⚡ BUILDING</span>
                </div>

                <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-950/40 to-indigo-950/40 border border-cyan-500/40 flex items-center justify-between">
                  <span className="text-cyan-200 font-sans font-semibold text-xs">5. AWS Cloud &amp; Terraform IaC</span>
                  <span className="text-cyan-300 font-bold">⚡ BUILDING</span>
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