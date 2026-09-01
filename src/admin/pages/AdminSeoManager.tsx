import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminSeoManager: React.FC = () => {
  const { seo, updateSeo } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');

  const [siteTitle, setSiteTitle] = useState(seo.siteTitle);
  const [metaDescription, setMetaDescription] = useState(seo.metaDescription);
  const [keywords, setKeywords] = useState(seo.keywords);
  const [robotsIndex, setRobotsIndex] = useState(seo.robotsIndex);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeo({ siteTitle, metaDescription, keywords, robotsIndex });
    setSavedMessage('SEO metadata updated!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl font-sans">
      <div className="border-b border-[#8C6D4F]/30 pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          GLOBAL &amp; PAGE METADATA CONFIGURATION
        </span>
        <h1
          className="text-4xl uppercase tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          SEO MANAGER
        </h1>
      </div>

      {savedMessage && (
        <div className="p-3 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono rounded-sm">
          {savedMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4 font-mono text-xs">
        <div>
          <label className="block text-[#8C6D4F] uppercase mb-1">SITE TITLE TAG</label>
          <input
            type="text"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
            className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-3 rounded-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-[#8C6D4F] uppercase mb-1">META DESCRIPTION</label>
          <textarea
            rows={3}
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-3 rounded-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-[#8C6D4F] uppercase mb-1">KEYWORDS (Comma-separated)</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-3 rounded-sm outline-none"
          />
        </div>

        <div className="flex items-center space-x-3 pt-2">
          <input
            type="checkbox"
            id="robotsIndex"
            checked={robotsIndex}
            onChange={(e) => setRobotsIndex(e.target.checked)}
            className="w-4 h-4 accent-[#D4AF37]"
          />
          <label htmlFor="robotsIndex" className="text-white uppercase">ENABLE SEARCH ENGINE INDEXING (ROBOTS INDEX)</label>
        </div>

        <button
          type="submit"
          className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
        >
          SAVE SEO CONFIGURATION ↗
        </button>
      </form>
    </div>
  );
};

export default AdminSeoManager;
