import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminDesignManager: React.FC = () => {
  const { design, updateDesign } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');

  const [morphingEnabled, setMorphingEnabled] = useState(design.morphingEnabled);
  const [pageTransitionsEnabled, setPageTransitionsEnabled] = useState(design.pageTransitionsEnabled);
  const [animationIntensity, setAnimationIntensity] = useState(design.animationIntensity);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateDesign({ morphingEnabled, pageTransitionsEnabled, animationIntensity });
    setSavedMessage('Design tokens & motion settings updated!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl font-sans text-[#E8DFD8]">
      <div className="border-b border-[#26211B] pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          BRAND TOKENS &amp; INTERACTION MOTION SYSTEM
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
          Design &amp; Motion Manager
        </h1>
        <p className="text-xs text-[#A8988B] mt-1 font-mono">
          Configure client-side transition effects, physics responsiveness, and interactive motion tokens.
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
        <div>
          <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
            ANIMATION INTENSITY LEVEL
          </label>
          <select
            value={animationIntensity}
            onChange={(e) => setAnimationIntensity(e.target.value as any)}
            className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-sans text-sm transition-all"
          >
            <option value="low">LOW (Subtle transitions only)</option>
            <option value="medium">MEDIUM (Standard motion tokens)</option>
            <option value="high">HIGH (Full functional morphing &amp; hero role cycle)</option>
          </select>
        </div>

        <div className="space-y-4 pt-2">
          <label className="flex items-center space-x-3 p-4 bg-[#0A0908] border border-[#26211B] rounded-xl cursor-pointer hover:border-[#D4AF37]/30 transition-all">
            <input
              type="checkbox"
              id="morphingEnabled"
              checked={morphingEnabled}
              onChange={(e) => setMorphingEnabled(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37] rounded"
            />
            <span className="text-white uppercase font-mono text-xs font-semibold">
              ENABLE FUNCTIONAL MORPHING INTERACTION SYSTEM
            </span>
          </label>

          <label className="flex items-center space-x-3 p-4 bg-[#0A0908] border border-[#26211B] rounded-xl cursor-pointer hover:border-[#D4AF37]/30 transition-all">
            <input
              type="checkbox"
              id="pageTransitionsEnabled"
              checked={pageTransitionsEnabled}
              onChange={(e) => setPageTransitionsEnabled(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37] rounded"
            />
            <span className="text-white uppercase font-mono text-xs font-semibold">
              ENABLE CLIENT-SIDE PAGE ROUTE TRANSITIONS
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
        >
          Save Design Tokens ↗
        </button>
      </form>
    </div>
  );
};

export default AdminDesignManager;
