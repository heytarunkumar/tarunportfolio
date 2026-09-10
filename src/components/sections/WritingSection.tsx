import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

export const WritingSection: React.FC = () => {
  const { articles: contextArticles } = usePortfolio();
  const articlesData = (contextArticles || []).filter((a) => a.visible !== false);

  return (
    <section
      id="writing"
      className="relative w-full bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Ambient Studio Glow */}
      <div className="absolute top-1/3 left-1/4 w-[34rem] h-[34rem] bg-[#D4AF37]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-4 mb-6"
        >
          <span className="text-[11px] font-mono font-medium tracking-[0.3em] uppercase text-[#D4AF37]">
            07 / TECHNICAL DISPATCHES &amp; ESSAYS
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-[1.15]">
              Technical writing &amp; <span className="italic text-[#D4AF37]">architectural thoughts.</span>
            </h2>
          </div>

          <a
            href="https://medium.com/@haytarunkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#D4AF37] hover:underline"
          >
            <span>VIEW ALL ON MEDIUM</span>
            <span>↗</span>
          </a>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articlesData.map((article) => (
            <motion.a
              key={article.id || article.title}
              href={article.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-lift relative p-6 sm:p-8 rounded-2xl border border-[#26211B] bg-[#12100E] backdrop-blur-xl overflow-hidden group flex flex-col justify-between"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-[#8C6D4F]">
                  <span className="text-[#D4AF37] tracking-wider uppercase font-bold">
                    {article.topic} // {article.readTime}
                  </span>
                  <span>{article.date}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-normal text-white group-hover:text-[#F7E7C4] transition-colors leading-snug mb-3">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#C4BCB3] font-light leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#26211B] flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {(article.tags || []).map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-[10px] font-mono rounded-lg border border-[#26211B] bg-[#0A0908] text-[#C4BCB3]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-mono text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                  READ ARTICLE ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WritingSection;
