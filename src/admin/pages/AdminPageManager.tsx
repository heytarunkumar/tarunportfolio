import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminPageManager: React.FC = () => {
  const { profile, updateProfile, navigation, updateNavigation } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');

  const [heroTitle, setHeroTitle] = useState(profile.title);
  const [heroSubtitle, setHeroSubtitle] = useState(profile.subtitle);
  const [heroNarrative, setHeroNarrative] = useState(profile.narrative);

  const handleToggleNav = (id: string) => {
    const next = navigation.map((n) => (n.id === id ? { ...n, visible: !n.visible } : n));
    updateNavigation(next);
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      title: heroTitle,
      subtitle: heroSubtitle,
      narrative: heroNarrative,
    });
    setSavedMessage('Hero settings updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl font-sans">
      
      {/* Header */}
      <div className="border-b border-[#8C6D4F]/30 pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          PAGE &amp; SECTION MANAGER
        </span>
        <h1
          className="text-4xl uppercase tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          PAGES &amp; SECTIONS MANAGER
        </h1>
      </div>

      {savedMessage && (
        <div className="p-3 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono rounded-sm">
          {savedMessage}
        </div>
      )}

      {/* Page Visibility List */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
        <h2 className="text-lg font-mono text-white tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
          PAGE ROUTE VISIBILITY
        </h2>

        <div className="space-y-2 font-mono text-xs">
          {navigation.map((page) => (
            <div
              key={page.id}
              className="p-3.5 bg-[#120F0C] border border-[#8C6D4F]/20 rounded-sm flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <span className="text-[#8C6D4F]">#{page.order}</span>
                <span className="text-white font-bold tracking-wider">{page.name}</span>
                <span className="text-[#8C6D4F]">({page.path})</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-2 py-0.5 rounded-sm ${page.visible ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'bg-red-950 text-red-300 border border-red-500/40'}`}>
                  {page.visible ? 'PUBLISHED' : 'HIDDEN'}
                </span>
                <button
                  type="button"
                  onClick={() => handleToggleNav(page.id)}
                  className="px-3 py-1 border border-[#8C6D4F]/40 bg-[#1A140F] text-[#D4AF37] hover:border-[#D4AF37]"
                >
                  TOGGLE VISIBILITY
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Home Hero Content Editor */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
        <h2 className="text-lg font-mono text-white tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
          HOME HERO SECTION CONTENT EDITOR
        </h2>

        <form onSubmit={handleSaveHero} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[#8C6D4F] uppercase tracking-wider mb-2">
              PRIMARY TITLE / POSITIONING
            </label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase tracking-wider mb-2">
              SUBTITLE / SECONDARY FOCUS
            </label>
            <input
              type="text"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase tracking-wider mb-2">
              HERO NARRATIVE DESCRIPTION
            </label>
            <textarea
              rows={4}
              value={heroNarrative}
              onChange={(e) => setHeroNarrative(e.target.value)}
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054] transition-all"
          >
            SAVE HERO CHANGES ↗
          </button>
        </form>
      </div>

    </div>
  );
};

export default AdminPageManager;
