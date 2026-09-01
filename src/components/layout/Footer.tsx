import React from 'react';
import { profileData } from '../../data/profile';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-6 sm:px-12 lg:px-20 bg-[#030407] text-[#F1F5F9] font-sans border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-mono">
        <div>
          <span className="text-white font-bold">{profileData.name}</span> — Python Developer | Cloud &amp; DevOps Engineer
        </div>

        <div className="flex items-center space-x-6">
          <a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            GitHub
          </a>
          <a href={profileData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            LinkedIn
          </a>
          <a href={profileData.socials.x} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            X
          </a>
          <a href={profileData.socials.medium} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            Medium
          </a>
        </div>

        <div className="text-slate-500">
          © {new Date().getFullYear()} All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
