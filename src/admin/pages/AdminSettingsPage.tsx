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
    <div className="space-y-8 max-w-5xl font-sans text-[#E8DFD8]">
      <div className="border-b border-[#26211B] pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          SYSTEM CONFIGURATION &amp; DEPLOYMENT PREFERENCES
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
          Settings Manager
        </h1>
        <p className="text-xs text-[#A8988B] mt-1 font-mono">
          Configure site identity, canonical domain, server timezones, and persistence parameters.
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

      <form onSubmit={handleSave} className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift font-sans text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              SITE NAME *
            </label>
            <input
              type="text"
              required
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              SITE CANONICAL URL *
            </label>
            <input
              type="url"
              required
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              SYSTEM TIMEZONE
            </label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              DEFAULT PUBLISHING STATE
            </label>
            <select
              value={defaultStatus}
              onChange={(e) => setDefaultStatus(e.target.value)}
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
            >
              <option value="Published">Published (Live immediately)</option>
              <option value="Draft">Draft (Requires explicit publish)</option>
            </select>
          </div>
        </div>

        <div className="p-5 bg-[#0A0908] border border-[#26211B] rounded-xl space-y-2">
          <span className="text-[#D4AF37] font-mono font-bold text-xs uppercase block">
            ARCHITECTURE NOTE: CMS PERSISTENCE &amp; DB INTEGRATION
          </span>
          <p className="text-[#A8988B] text-[11px] leading-relaxed font-sans">
            Data layer is served through reactive data contexts (`PortfolioContext.tsx`). If browser-based multi-user editing with server-side database persistence is enabled in production, PostgreSQL with Prisma ORM can be attached directly to these endpoints without altering any front-facing components.
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
        >
          Save System Settings ↗
        </button>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
