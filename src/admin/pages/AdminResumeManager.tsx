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
    <div className="space-y-8 max-w-5xl font-sans">
      <div className="border-b border-[#8C6D4F]/30 pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          PUBLIC RESUME ASSET &amp; VERSION SELECTOR
        </span>
        <h1
          className="text-4xl uppercase tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          RESUME ASSETS MANAGER
        </h1>
      </div>

      {savedMessage && (
        <div className="p-3 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono rounded-sm">
          {savedMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4 font-mono text-xs">
        <div>
          <label className="block text-[#8C6D4F] uppercase mb-1">ACTIVE PUBLIC RESUME PDF URL</label>
          <input
            type="text"
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-3 rounded-sm outline-none"
          />
        </div>

        <div className="p-4 bg-[#120F0C] border border-[#8C6D4F]/20 rounded-sm space-y-2">
          <span className="text-white font-bold block">AVAILABLE RESUME ASSETS IN PUBLIC DIRECTORY:</span>
          <ul className="space-y-1 text-[#A8988B]">
            <li>• `/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf` (Current Active ATS Resume)</li>
            <li>• `/resume/tarun-kumar-resume.pdf` (Standard Alias Path)</li>
          </ul>
        </div>

        <div className="flex items-center space-x-3 pt-2">
          <button
            type="submit"
            className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
          >
            UPDATE RESUME SELECTION ↗
          </button>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 border border-[#8C6D4F]/40 bg-[#120F0C] text-[#D4AF37] uppercase tracking-widest hover:border-[#D4AF37]"
          >
            PREVIEW ACTIVE RESUME PDF ↗
          </a>
        </div>
      </form>
    </div>
  );
};

export default AdminResumeManager;
