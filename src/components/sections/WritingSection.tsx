import React from 'react';
import { motion } from 'framer-motion';
import { articlesData } from '../../data/articles';

export const WritingSection: React.FC = () => {
  return (
    <section 
      id="writing" 
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-[#05060A] text-[#F1F5F9] font-sans border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xs font-mono font-semibold uppercase text-cyan-400 tracking-widest">
                07 // TECHNICAL DISPATCHES &amp; WRITING
              </span>
              <div className="w-16 h-[1px] bg-gradient-to-r from-cyan-500/80 to-transparent" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Articles &amp; Dispatches
            </h2>
          </div>

          <p className="text-sm text-slate-400 max-w-md mt-4 md:mt-0 font-normal">
            Technical writing on Python REST microservices, Docker containerization, and Cloud CI/CD automation.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articlesData.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-card p-7 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono">
                  <span className="text-cyan-400">{article.topic}</span>
                  <span className="text-slate-400">{article.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 font-heading leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-300 font-normal leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-white/10 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={article.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-cyan-400 hover:text-white transition-colors"
                >
                  Read Dispatch ↗
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WritingSection;
