import React from 'react';
import { motion } from 'framer-motion';
import { articlesData } from '../../data/articles';

export const WritingSection: React.FC = () => {
  return (
    <section
      id="writing"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black py-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Ambient Studio Glow */}
      <div className="absolute top-1/3 left-1/4 w-[34rem] h-[34rem] bg-[#D4AF37]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-5"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            07 / TECHNICAL DISPATCHES
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] tracking-tight uppercase leading-[0.85] select-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448]">
                TECHNICAL WRITING.
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
                KNOWLEDGE SHARING.
              </span>
            </h2>
          </div>

          <a
            href="https://medium.com/@tarunkumar-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#D4AF37] hover:underline mt-4 md:mt-0"
          >
            <span>VIEW ALL ON MEDIUM</span>
            <span>↗</span>
          </a>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articlesData.map((article) => (
            <motion.a
              key={article.id}
              href={article.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="relative p-6 sm:p-8 rounded-sm border border-[#8C6D4F]/35 bg-[#100D0B]/85 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-[#D4AF37] group flex flex-col justify-between"
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

                <h3
                  className="text-2xl sm:text-3xl uppercase text-white group-hover:text-[#F7E7C4] transition-colors leading-tight mb-3"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {article.title}
                </h3>

                <p
                  className="text-xs text-[#A8988B] font-light leading-relaxed mb-6"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#8C6D4F]/20 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[9.5px] font-mono rounded-sm border border-[#8C6D4F]/25 bg-[#171310] text-[#C4B5A5]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-mono text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                  READ ↗
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
