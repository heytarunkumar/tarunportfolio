import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

export const WritingSection: React.FC = () => {
  const { articles: contextArticles } = usePortfolio();
  const articlesData = (contextArticles || []).filter((a) => a.visible !== false);

  return (
    <section
      id="writing"
      className="relative w-full bg-[#F4EEE4] text-[#202020] font-sans selection:bg-[#78000F] selection:text-[#F4EEE4] py-20 sm:py-24 lg:py-28 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 overflow-hidden"
    >
      <div className="max-w-[1760px] mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="flex items-center space-x-4 mb-6"
        >
          <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F]">
            06 / TECHNICAL DISPATCHES &amp; ESSAYS
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#78000F]/60 via-[#CFC3B3] to-transparent max-w-xs" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111111] leading-[1.08] tracking-[-0.03em]">
              Technical Writing &amp; <span className="text-[#78000F] italic">Essays.</span>
            </h2>
          </div>

          <a
            href="https://medium.com/@heytarunkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#78000F] hover:underline"
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
              className="editorial-card relative p-6 sm:p-8 rounded-[4px] border border-[#CFC3B3] bg-[#FAF8F3] shadow-sm flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-[#8C8275]">
                  <span className="text-[#78000F] tracking-wider uppercase font-bold">
                    {article.topic} // {article.readTime}
                  </span>
                  <span>{article.date}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] group-hover:text-[#78000F] transition-colors leading-snug mb-3">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#38342E] font-normal leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#DDD2C2] flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {(article.tags || []).map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-[10px] font-mono rounded-[2px] border border-[#DDD2C2] bg-[#F4EEE4] text-[#202020] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-mono font-bold text-[#78000F] group-hover:translate-x-1 transition-transform">
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
