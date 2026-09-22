import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { profile, navigation } = usePortfolio();
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);

  const handleSecretTrigger = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    if (nextCount >= 3) {
      setClickCount(0);
      navigate('/admin/dashboard');
    }
    setTimeout(() => setClickCount(0), 2000);
  };

  const activeNavItems = navigation
    ? [...navigation].filter((item) => item.visible).sort((a, b) => a.order - b.order)
    : [
        { id: '1', name: 'HOME', path: '/', visible: true, order: 1 },
        { id: '2', name: 'ABOUT', path: '/about', visible: true, order: 2 },
        { id: '3', name: 'PROJECTS', path: '/projects', visible: true, order: 3 },
        { id: '4', name: 'ENGINEERING LAB', path: '/lab', visible: true, order: 4 },
        { id: '5', name: 'RESEARCH', path: '/research', visible: true, order: 5 },
        { id: '6', name: 'EXPERIENCE', path: '/experience', visible: true, order: 6 },
        { id: '7', name: 'CONTACT', path: '/contact', visible: true, order: 7 },
      ];

  return (
    <footer className="w-full bg-[#111111] border-t border-[#26211B] text-[#F4EEE4] py-14 sm:py-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 font-sans">
      <div className="w-full max-w-[1760px] mx-auto">
        
        {/* Top Editorial Identity & Grid */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b border-white/10">
          
          {/* Left Monogram & Large Name Stamp */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-[4px] overflow-hidden bg-[#FAF8F3] p-1 border border-[#CFC3B3] shrink-0">
              <img
                src={profile.monogramUrl || "/images/brand/tarun-monogram-64.webp"}
                alt={`${profile.name || 'Tarun Kumar'} Monogram`}
                width="48"
                height="48"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <Link
                to="/"
                className="text-xl sm:text-2xl font-serif font-bold text-[#F4EEE4] hover:text-[#C51E31] transition-colors block leading-tight"
              >
                {profile?.name || 'Mr. Tarun Kumar'}
              </Link>
              <span className="text-[11px] font-mono tracking-wider text-[#A8988B] block mt-0.5 uppercase">
                {profile.footerSubtitle || 'Founder | AI & Technology • OrigoHOST Community'}
              </span>
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-2 text-[11px] font-mono tracking-[0.16em] uppercase text-[#C4BCB3]">
            {activeNavItems.map((item) => (
              <Link 
                key={item.id} 
                to={item.path} 
                className="hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

        </div>

        {/* Bottom Socials & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#8C8275]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[#C4BCB3]">
            <a
              href={profile?.socials?.linkedin || 'https://www.linkedin.com/in/heytarunkumar/'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LINKEDIN ↗
            </a>
            <a
              href={profile?.socials?.github || 'https://github.com/heytarunkumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GITHUB ↗
            </a>
            <a
              href={profile?.socials?.x || 'https://x.com/heytarunkumarr'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              X ↗
            </a>
            <a
              href={profile?.socials?.medium || 'https://medium.com/@heytarunkumar/'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              MEDIUM ↗
            </a>
            <a
              href={profile?.socials?.linktree || 'https://linktr.ee/heytarunkumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LINKTREE ↗
            </a>
          </div>

          <span 
            onClick={handleSecretTrigger} 
            className="cursor-default select-none transition-colors duration-200 block text-[10.5px] sm:text-xs"
            title=""
          >
            {profile.footerCopyright || `© ${new Date().getFullYear()} ${profile?.name || 'Mr. Tarun Kumar'}. All rights reserved.`}
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
