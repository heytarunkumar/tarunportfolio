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
    <footer className="w-full bg-[#070605] border-t border-[#26211B] text-[#E8DFD8] py-14 px-6 sm:px-12 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Identity */}
        <div className="text-center md:text-left flex flex-col md:flex-row items-center md:items-start space-y-3 md:space-y-0 md:space-x-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-white p-1 border border-[#D4AF37]/50 shadow-md shrink-0">
            <img
              src="/images/brand/tarun-monogram.png"
              alt="Tarun Kumar Monogram"
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
              Founder | AI &amp; Technology • OrigoHOST Community
            </span>
          </div>
        </div>

        {/* Center Quick Page Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#C4B5A5]">
          {activeNavItems.map((item) => (
            <Link key={item.id} to={item.path} className="hover:text-[#D4AF37] transition-colors uppercase">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Social & Copyright */}
        <div className="text-center md:text-right text-xs font-mono text-[#8C6D4F]">
          <div className="flex flex-wrap justify-center md:justify-end gap-5 mb-2 text-[#C4B5A5]">
            <a
              href={profile?.socials?.linktree || 'https://linktr.ee/heytarunkumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
            >
              LINKTREE ↗
            </a>
            <a
              href={profile?.socials?.instagram || 'https://instagram.com/heytarunkumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
            >
              INSTAGRAM ↗
            </a>
            <a
              href={profile?.socials?.github || 'https://github.com/haytarunkumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
            >
              GITHUB ↗
            </a>
            <a
              href={profile?.socials?.linkedin || 'https://linkedin.com/in/haytarunkumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
            >
              LINKEDIN ↗
            </a>
            <a
              href={profile?.socials?.x || 'https://x.com/heytarunkumarr'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
            >
              X ↗
            </a>
            <a
              href={profile?.socials?.medium || 'https://medium.com/@haytarunkumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
            >
              MEDIUM ↗
            </a>
          </div>
          <span 
            onClick={handleSecretTrigger} 
            className="cursor-default select-none transition-colors duration-200"
            title=""
          >
            © {new Date().getFullYear()} {profile?.name || 'Tarun Kumar'}. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
