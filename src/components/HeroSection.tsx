import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { profileData } from '../data/profile';
import { Navbar } from './layout/Navbar';

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
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
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

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sys' | 'arch' | 'stack'>('sys');

  return (
    <section className="relative w-full min-h-screen bg-[#05060A] text-[#F1F5F9] font-sans overflow-hidden bg-grid-pattern">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Ambient Gradient Orbs */}
      <div className="glow-orb-cyan top-1/4 -left-20" />
      <div className="glow-orb-indigo bottom-1/4 -right-20" />

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen w-full px-6 sm:px-12 lg:px-16 pt-28 pb-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Headline & Value Proposition (7 Cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            {/* Live Availability Badge */}
            <motion.div variants={fadeUpVariants} className="mb-6 inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{profileData.location}</span>
            </motion.div>

            {/* Massive Display Title */}
            <motion.div variants={fadeUpVariants} className="relative mb-6 select-none">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-extrabold tracking-tight leading-[1.02]">
                <span className="block text-white">
                  Hi, I&apos;m {profileData.name}
                </span>
                <span className="block text-gradient-cyan">
                  Python Developer
                </span>
                <span className="block text-gradient-gold">
                  Cloud &amp; DevOps Engineer
                </span>
              </h1>
            </motion.div>

            {/* Concise Narrative */}
            <motion.p
              variants={fadeUpVariants}
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mb-8"
            >
              {profileData.narrative}
            </motion.p>

            {/* Tech Badges */}
            <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-2 mb-10">
              {profileData.focusAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 text-xs font-mono rounded-full bg-slate-900/80 border border-white/10 text-slate-300 shadow-sm"
                >
                  ⚡ {area}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-4 sm:gap-5"
            >
              <a
                href="#work"
                className="btn-primary px-7 py-3.5 text-sm font-semibold flex items-center space-x-2"
              >
                <span>View My Work</span>
                <span className="text-base">↗</span>
              </a>

              <a
                href={profileData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-7 py-3.5 text-sm font-medium flex items-center space-x-2"
              >
                <span>Download Resume</span>
                <span className="text-base">↓</span>
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Interactive Glass Terminal & System Status (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl border border-white/15 bg-slate-950/80 backdrop-blur-2xl shadow-2xl overflow-hidden">
              
              {/* Window Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                
                {/* Tab Controls */}
                <div className="flex items-center space-x-1 font-mono text-[11px]">
                  <button
                    onClick={() => setActiveTab('sys')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeTab === 'sys' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    sys.py
                  </button>
                  <button
                    onClick={() => setActiveTab('arch')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeTab === 'arch' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    pipeline.sh
                  </button>
                  <button
                    onClick={() => setActiveTab('stack')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeTab === 'stack' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    stack.json
                  </button>
                </div>
              </div>

              {/* Terminal Code View */}
              <div className="p-6 font-mono text-xs text-slate-200 leading-relaxed min-h-[300px]">
                {activeTab === 'sys' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <p className="text-slate-500"># System Identity Script</p>
                    <p><span className="text-purple-400">class</span> <span className="text-yellow-300">Developer</span>:</p>
                    <div className="pl-4 border-l-2 border-slate-800 space-y-1.5">
                      <p><span className="text-cyan-400">name</span> = <span className="text-emerald-300">&quot;{profileData.name}&quot;</span></p>
                      <p><span className="text-cyan-400">primary_role</span> = <span className="text-emerald-300">&quot;Python Developer&quot;</span></p>
                      <p><span className="text-cyan-400">target_role</span> = <span className="text-emerald-300">&quot;Cloud &amp; DevOps Engineer&quot;</span></p>
                      <p><span className="text-cyan-400">specialization</span> = <span className="text-emerald-300">&quot;AI &amp; Automation&quot;</span></p>
                      <p><span className="text-cyan-400">status</span> = <span className="text-emerald-400">&quot;ACTIVE_BUILDING&quot;</span></p>
                    </div>
                    <p className="pt-2 text-cyan-400 font-bold">$ python3 sys.py --exec</p>
                    <p className="text-emerald-400">✓ Systems operational. Ready to deploy.</p>
                  </motion.div>
                )}

                {activeTab === 'arch' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <p className="text-slate-500"># Infrastructure Pipeline Workflow</p>
                    <p><span className="text-cyan-400">1. Client Request</span> → REST API Gateway (Flask)</p>
                    <p><span className="text-cyan-400">2. Container</span> → Docker Multi-Stage Image</p>
                    <p><span className="text-cyan-400">3. Automation</span> → GitHub Actions CI/CD Pipeline</p>
                    <p><span className="text-cyan-400">4. Cloud Target</span> → AWS Cloud Infrastructure</p>
                    <p><span className="text-cyan-400">5. IaC Blueprint</span> → Terraform State Provisioning</p>
                  </motion.div>
                )}

                {activeTab === 'stack' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                    <p className="text-slate-500">// Technical Competencies Matrix</p>
                    <pre className="text-cyan-300 text-[11px]">
{`{
  "core": ["Python", "Flask", "REST APIs", "SQL", "OOP"],
  "devops": ["Docker", "Linux", "CI/CD", "AWS", "Terraform"],
  "ai_data": ["Scikit-learn", "Generative AI", "Pandas"],
  "status": "Production Ready"
}`}
                    </pre>
                  </motion.div>
                )}
              </div>

              {/* Terminal Status Bar */}
              <div className="px-6 py-2.5 bg-slate-900/90 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>tarun@devops-node:~$</span>
                </span>
                <span className="text-cyan-400">UTF-8</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;