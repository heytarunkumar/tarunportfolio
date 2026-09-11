import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

interface HubLink {
  title: string;
  subtitle: string;
  url: string;
  isExternal: boolean;
  tag?: string;
  iconText: string;
}

interface HubCategory {
  category: string;
  description: string;
  links: HubLink[];
}

export const LinksPage: React.FC = () => {
  const { profile } = usePortfolio();

  useEffect(() => {
    document.title = 'Tarun Kumar | Official Links & Verified Profiles (@heytarunkumar)';
    window.scrollTo(0, 0);
  }, []);

  const categories: HubCategory[] = [
    {
      category: 'OFFICIAL PLATFORMS & VENTURES',
      description: 'Primary web assets, ventures, and career credentials',
      links: [
        {
          title: 'Official Portfolio',
          subtitle: 'Main website, project blueprints & technical architecture',
          url: 'https://www.tarunkumarai.vercel.app',
          isExternal: true,
          tag: 'PRIMARY',
          iconText: '🌐',
        },
        {
          title: 'OrigoHOST Tech Community',
          subtitle: 'Where builders become innovators • Applied AI & tech ecosystem',
          url: 'https://origohost.in',
          isExternal: true,
          tag: 'VENTURE',
          iconText: '⚡',
        },
        {
          title: 'Curriculum Vitae (ATS Resume)',
          subtitle: 'Verified engineering credentials, publications & skill metrics',
          url: profile.resumeUrl || '/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf',
          isExternal: true,
          tag: 'CV / PDF',
          iconText: '📄',
        },
      ],
    },
    {
      category: 'PROFESSIONAL NETWORKS & CODE',
      description: 'Code repositories, engineering contributions & career network',
      links: [
        {
          title: 'LinkedIn Profile',
          subtitle: 'Professional network, career updates & leadership posts',
          url: profile.socials?.linkedin || 'https://www.linkedin.com/in/heytarunkumar/',
          isExternal: true,
          tag: 'NETWORK',
          iconText: '💼',
        },
        {
          title: 'GitHub Repositories',
          subtitle: 'Open-source Python tools, AI architectures & research code',
          url: profile.socials?.github || 'https://github.com/heytarunkumar',
          isExternal: true,
          tag: 'CODE',
          iconText: '💻',
        },
      ],
    },
    {
      category: 'WRITING, LAB & RESEARCH',
      description: 'Published technical papers, architectural guides & hands-on tracks',
      links: [
        {
          title: 'Medium Technical Articles',
          subtitle: 'In-depth engineering dispatches on Python, Docker & XAI',
          url: profile.socials?.medium || 'https://medium.com/@heytarunkumar',
          isExternal: true,
          tag: 'AUTHOR',
          iconText: '✍️',
        },
        {
          title: 'Explainable AI & ML Research',
          subtitle: 'AI-HealthGuard research manuscript & clinical benchmarks',
          url: '/research',
          isExternal: false,
          tag: 'RESEARCH',
          iconText: '🔬',
        },
        {
          title: 'Systems Engineering Lab',
          subtitle: 'Progressive tracks spanning Python, Docker, CI/CD & Cloud',
          url: '/lab',
          isExternal: false,
          tag: 'LAB',
          iconText: '⚙️',
        },
      ],
    },
    {
      category: 'SOCIAL & COMMUNITY CHANNELS',
      description: 'Direct commentary, thoughts on AI & multimedia updates',
      links: [
        {
          title: 'X (Twitter)',
          subtitle: 'Thoughts on AI agents, Python systems & venture building',
          url: profile.socials?.x || 'https://x.com/heytarunkumarr',
          isExternal: true,
          tag: '@heytarunkumarr',
          iconText: '𝕏',
        },
        {
          title: 'Instagram',
          subtitle: 'Behind-the-scenes, community hackathons & lifestyle',
          url: profile.socials?.instagram || 'https://www.instagram.com/heytarunchaudhary/',
          isExternal: true,
          tag: '@heytarunchaudhary',
          iconText: '📸',
        },
        {
          title: 'Linktree Hub',
          subtitle: 'Unified link directory for all profiles & initiatives',
          url: profile.socials?.linktree || 'https://linktr.ee/heytarunkumar',
          isExternal: true,
          tag: 'DIRECTORY',
          iconText: '🌲',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white pt-24 sm:pt-28 pb-20 px-4 sm:px-8 max-w-4xl mx-auto">
      
      {/* Header Profile Identity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12 sm:mb-16"
      >
        <div className="relative inline-block mb-4">
          <img
            src="/images/tarun-headshot.webp"
            alt="Tarun Kumar — Python Developer and AI Engineer"
            width="112"
            height="112"
            loading="lazy"
            decoding="async"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover object-top border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.25)] mx-auto"
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0A0908] flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-normal mb-2">
          Tarun Kumar
        </h1>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#8C6D4F]/40 bg-[#12100E] mb-3">
          <span className="text-[11px] font-mono text-[#D4AF37] tracking-wider uppercase">
            @heytarunkumar
          </span>
        </div>

        <p className="text-xs sm:text-sm font-mono text-[#C4BCB3] max-w-lg mx-auto leading-relaxed">
          Python Developer | AI Engineer | Researcher | Author | Founder
        </p>
        <p className="text-[11px] font-mono text-[#8C6D4F] mt-1">
          Founder &amp; President @ <a href="https://origohost.in" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">OrigoHOST Tech Community</a>
        </p>
      </motion.div>

      {/* Grouped Link Categories */}
      <div className="space-y-10 sm:space-y-12">
        {categories.map((cat, cIdx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: cIdx * 0.1 }}
            className="space-y-3"
          >
            {/* Category Header */}
            <div className="border-b border-[#26211B] pb-2 mb-3">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] font-semibold">
                // {cat.category}
              </span>
              <p className="text-[11px] text-[#8C6D4F] font-sans font-light mt-0.5">
                {cat.description}
              </p>
            </div>

            {/* Links List */}
            <div className="space-y-2.5">
              {cat.links.map((item) => {
                const CardContent = (
                  <div className="p-4 sm:p-4.5 rounded-xl border border-[#26211B] bg-[#12100E] hover:border-[#D4AF37]/60 hover:bg-[#161310] transition-all duration-300 flex items-center justify-between group shadow-md card-lift">
                    <div className="flex items-center space-x-3.5 sm:space-x-4 min-w-0 flex-1">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#1D1814] border border-[#26211B] flex items-center justify-center text-base sm:text-lg shrink-0 group-hover:scale-105 transition-transform">
                        {item.iconText}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-xs sm:text-sm font-medium text-white group-hover:text-[#D4AF37] transition-colors truncate">
                            {item.title}
                          </h3>
                          {item.tag && (
                            <span className="px-1.5 py-0.2 text-[9px] font-mono bg-[#1D1814] border border-[#8C6D4F]/40 text-[#D4AF37] rounded">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#A8988B] font-light truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-[#8C6D4F] group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all ml-3 shrink-0">
                      {item.isExternal ? '↗' : '→'}
                    </div>
                  </div>
                );

                return item.isExternal ? (
                  <a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {CardContent}
                  </a>
                ) : (
                  <Link key={item.title} to={item.url} className="block">
                    {CardContent}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reciprocal Verification Note */}
      <div className="mt-14 pt-8 border-t border-[#26211B] text-center text-xs font-mono text-[#8C6D4F]">
        <p>
          Canonical Entity: <span className="text-[#F5F2EB]">Tarun Kumar</span> (<span className="text-[#D4AF37]">@heytarunkumar</span>)
        </p>
        <p className="text-[11px] text-[#8C6D4F] mt-1">
          Official Domain: <a href="https://www.tarunkumarai.vercel.app" className="text-[#D4AF37] hover:underline">https://www.tarunkumarai.vercel.app</a>
        </p>
      </div>

    </div>
  );
};

export default LinksPage;
