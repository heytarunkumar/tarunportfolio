import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminResumeManager: React.FC = () => {
  const { profile, updateProfile } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');
  const [resumeUrl, setResumeUrl] = useState(profile.resumeUrl);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ resumeUrl });
    setSavedMessage('Active resume PDF asset link updated!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl font-sans text-[#E8DFD8]">
      <div className="border-b border-[#26211B] pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          PUBLIC RESUME ASSET &amp; VERSION SELECTOR
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
          Resume Assets Manager
        </h1>
        <p className="text-xs text-[#A8988B] mt-1 font-mono">
          Configure the active PDF asset download link used by recruiters and visitors across the site.
        </p>
      </div>

      {savedMessage && (
        <div className="p-4 border border-emerald-500/40 bg-emerald-950/20 text-emerald-300 text-xs font-mono rounded-xl flex items-center justify-between animate-fadeIn">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            ✓ {savedMessage}
          </span>
          <button onClick={() => setSavedMessage('')} className="text-emerald-400 font-bold hover:underline">
            DISMISS
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-5 card-lift font-sans text-xs">
        <div>
          <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
            ACTIVE PUBLIC RESUME PDF URL *
          </label>
          <input
            type="text"
            required
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
          />
        </div>

        <div className="p-5 bg-[#0A0908] border border-[#26211B] rounded-xl space-y-2">
          <span className="text-white font-mono font-bold text-xs uppercase block">
            AVAILABLE RESUME ASSETS IN PUBLIC DIRECTORY:
          </span>
          <ul className="space-y-1.5 text-[#A8988B] font-mono text-[11px]">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              `/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf` (Current Active ATS Resume)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              `/resume/tarun-kumar-resume.pdf` (Standard Alias Path)
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
          >
            Update Resume Selection ↗
          </button>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl border border-[#26211B] bg-[#171411] text-[#E8DFD8] text-xs font-mono uppercase tracking-wider hover:border-[#D4AF37]/50 hover:text-white transition-all cursor-pointer"
          >
            Preview Active Resume PDF ↗
          </a>
        </div>
      </form>
    </div>
  );
};

export default AdminResumeManager;
