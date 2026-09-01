import React, { useState } from 'react';

export const AdminSettingsPage: React.FC = () => {
  const [savedMessage, setSavedMessage] = useState('');
  const [siteName, setSiteName] = useState('Tarun Kumar Portfolio');
  const [siteUrl, setSiteUrl] = useState('https://heytarunkumar.vercel.app');
  const [timezone, setTimezone] = useState('Asia/Kolkata (UTC+5:30)');
  const [defaultStatus, setDefaultStatus] = useState('Published');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage('System settings updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl font-sans">
      <div className="border-b border-[#8C6D4F]/30 pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          SYSTEM CONFIGURATION &amp; PUBLISHING SETTINGS
        </span>
        <h1
          className="text-4xl uppercase tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          SETTINGS MANAGER
        </h1>
      </div>

      {savedMessage && (
        <div className="p-3 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono rounded-sm">
          {savedMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4 font-mono text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">SITE NAME</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-3 rounded-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">SITE CANONICAL URL</label>
            <input
              type="url"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-3 rounded-sm outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">TIMEZONE</label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-3 rounded-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">DEFAULT PUBLISHING STATE</label>
            <select
              value={defaultStatus}
              onChange={(e) => setDefaultStatus(e.target.value)}
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-3 rounded-sm outline-none"
            >
              <option value="Published">Published (Live immediately)</option>
              <option value="Draft">Draft (Requires explicit publish)</option>
            </select>
          </div>
        </div>

        <div className="p-4 bg-[#120F0C] border border-[#8C6D4F]/20 rounded-sm space-y-2">
          <span className="text-white font-bold block">FUTURE PERSISTENCE &amp; DATABASE MIGRATION ARCHITECTURE:</span>
          <p className="text-[#A8988B] text-[11px] leading-relaxed">
            Data layer is served through abstract data services (`PortfolioContext.tsx`). If browser-based multi-user editing with server-side database persistence is required in the future, PostgreSQL with Prisma ORM can be attached directly to these methods without altering public UI components.
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
        >
          SAVE SYSTEM SETTINGS ↗
        </button>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
