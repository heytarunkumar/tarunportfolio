import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { profile } = usePortfolio();

  return (
    <footer className="w-full bg-[#050403] border-t border-[#8C6D4F]/20 text-[#E8DFD8] py-12 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Identity */}
        <div className="text-center md:text-left">
          <Link
            to="/"
            className="text-sm font-semibold tracking-[0.3em] uppercase text-white block mb-1 hover:text-[#D4AF37] transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {profile?.name || 'TARUN KUMAR'}
          </Link>
          <span className="text-xs font-mono text-[#8C6D4F]">
            {profile?.title || 'Python Developer | Cloud & DevOps Engineer'}
          </span>
        </div>

        {/* Center Quick Page Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#C4B5A5]">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">
            HOME
          </Link>
          <Link to="/about" className="hover:text-[#D4AF37] transition-colors">
            ABOUT
          </Link>
          <Link to="/projects" className="hover:text-[#D4AF37] transition-colors">
            PROJECTS
          </Link>
          <Link to="/lab" className="hover:text-[#D4AF37] transition-colors">
            ENGINEERING LAB
          </Link>
          <Link to="/research" className="hover:text-[#D4AF37] transition-colors">
            RESEARCH
          </Link>
          <Link to="/experience" className="hover:text-[#D4AF37] transition-colors">
            EXPERIENCE
          </Link>
          <Link to="/contact" className="hover:text-[#D4AF37] transition-colors">
            CONTACT
          </Link>
        </div>

        {/* Right Social & Copyright */}
        <div className="text-center md:text-right text-xs font-mono text-[#8C6D4F]">
          <div className="flex justify-center md:justify-end gap-4 mb-2 text-[#C4B5A5]">
            <a
              href={profile?.socials?.github || 'https://github.com/heytarunkumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
            >
              GITHUB ↗
            </a>
            <a
              href={profile?.socials?.linkedin || 'https://linkedin.com/in/heytarunkumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
            >
              LINKEDIN ↗
            </a>
            <a
              href={profile?.socials?.x || 'https://x.com/heytarunkumar'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
            >
              X ↗
            </a>
          </div>
          © {new Date().getFullYear()} {profile?.name || 'TARUN KUMAR'}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
