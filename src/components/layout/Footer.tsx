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
    <footer className="w-full bg-[#070605] border-t border-[#26211B] text-[#E8DFD8] py-12 sm:py-14 px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 2xl:px-24 font-sans">
      <div className="w-full max-w-[1760px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
        
        {/* Left Identity */}
        <div className="text-center lg:text-left flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 shrink-0">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white p-1 border border-[#D4AF37]/50 shadow-md shrink-0">
            <img
              src={profile.monogramUrl || "/images/brand/tarun-monogram.png"}
              alt={`${profile.name || 'Tarun Kumar'} Monogram`}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <Link
              to="/"
              className="text-base font-serif font-normal text-white block mb-0.5 hover:text-[#D4AF37] transition-colors"
            >
              {profile?.name || 'TARUN KUMAR'}
            </Link>
            <span className="text-xs font-mono text-[#8C6D4F] block">
              {profile.footerSubtitle || 'Founder | AI & Technology • OrigoHOST Community'}
            </span>
          </div>
        </div>

        {/* Center Quick Page Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 text-xs font-mono text-[#C4B5A5]">
          {activeNavItems.map((item) => (
            <Link 
              key={item.id} 
              to={item.path} 
              className="hover:text-[#D4AF37] transition-colors uppercase whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Social & Copyright */}
        <div className="text-center lg:text-right text-xs font-mono text-[#8C6D4F] shrink-0">
          <div className="flex flex-wrap justify-center lg:justify-end gap-x-5 sm:gap-x-6 gap-y-2 mb-2 text-[#C4B5A5]">
            <a
              href={profile?.socials?.linktree || 'https://linktr.ee/heytarunkumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap"
            >
              LINKTREE ↗
            </a>
            <a
              href={profile?.socials?.instagram || 'https://instagram.com/heytarunkumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap"
            >
              INSTAGRAM ↗
            </a>
            <a
              href={profile?.socials?.github || 'https://github.com/haytarunkumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap"
            >
              GITHUB ↗
            </a>
            <a
              href={profile?.socials?.linkedin || 'https://linkedin.com/in/haytarunkumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap"
            >
              LINKEDIN ↗
            </a>
            <a
              href={profile?.socials?.x || 'https://x.com/heytarunkumarr'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap"
            >
              X ↗
            </a>
            <a
              href={profile?.socials?.medium || 'https://medium.com/@haytarunkumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors whitespace-nowrap"
            >
              MEDIUM ↗
            </a>
          </div>
          <span 
            onClick={handleSecretTrigger} 
            className="cursor-default select-none transition-colors duration-200 block"
            title=""
          >
            {profile.footerCopyright || `© ${new Date().getFullYear()} ${profile?.name || 'Tarun Kumar'}. All rights reserved.`}
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
