import React from 'react';
import { profileData } from '../../data/profile';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050403] border-t border-[#8C6D4F]/20 text-[#E8DFD8] py-12 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Identity */}
        <div className="text-center md:text-left">
          <span
            className="text-sm font-semibold tracking-[0.3em] uppercase text-white block mb-1"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {profileData.name}
          </span>
          <span className="text-xs font-mono text-[#8C6D4F]">
            {profileData.title}
          </span>
        </div>

        {/* Center Social Links */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#C4B5A5]"
        >
          <a
            href={profileData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D4AF37] transition-colors"
          >
            GITHUB ↗
          </a>
          <a
            href={profileData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D4AF37] transition-colors"
          >
            LINKEDIN ↗
          </a>
          <a
            href={profileData.socials.x}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D4AF37] transition-colors"
          >
            X ↗
          </a>
          <a
            href={profileData.socials.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D4AF37] transition-colors"
          >
            MEDIUM ↗
          </a>
          <a
            href={`mailto:${profileData.email}`}
            className="hover:text-[#D4AF37] transition-colors"
          >
            EMAIL ↗
          </a>
        </div>

        {/* Right Copyright */}
        <div className="text-center md:text-right text-xs font-mono text-[#8C6D4F]">
          © {new Date().getFullYear()} TARUN KUMAR
        </div>

      </div>
    </footer>
  );
};

export default Footer;
