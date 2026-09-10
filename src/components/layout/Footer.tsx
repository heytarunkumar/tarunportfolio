import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { profile, navigation } = usePortfolio();

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
        <div className="text-center md:text-left">
          <Link
            to="/"
            className="text-base font-serif font-normal text-white block mb-1 hover:text-[#D4AF37] transition-colors"
          >
            {profile?.name || 'TARUN KUMAR'}
          </Link>
          <span className="text-xs font-mono text-[#8C6D4F] block">
            Founder | AI & Technology • OrigoHOST Community
          </span>
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
          <span>© {new Date().getFullYear()} {profile?.name || 'Tarun Kumar'}. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
