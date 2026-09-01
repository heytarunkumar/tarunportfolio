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
    <div className="space-y-8 max-w-5xl font-sans">
      <div className="border-b border-[#8C6D4F]/30 pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          BRAND TOKENS &amp; MORPHING MOTION SYSTEM
        </span>
        <h1
          className="text-4xl uppercase tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          DESIGN &amp; MOTION MANAGER
        </h1>
      </div>

      {savedMessage && (
        <div className="p-3 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono rounded-sm">
          {savedMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-5 font-mono text-xs">
        <div>
          <label className="block text-[#8C6D4F] uppercase mb-2">ANIMATION INTENSITY LEVEL</label>
          <select
            value={animationIntensity}
            onChange={(e) => setAnimationIntensity(e.target.value as any)}
            className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-3 rounded-sm outline-none"
          >
            <option value="low">LOW (Subtle transitions only)</option>
            <option value="medium">MEDIUM (Standard motion tokens)</option>
            <option value="high">HIGH (Full functional morphing &amp; hero role cycle)</option>
          </select>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="morphingEnabled"
              checked={morphingEnabled}
              onChange={(e) => setMorphingEnabled(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37]"
            />
            <label htmlFor="morphingEnabled" className="text-white uppercase">
              ENABLE FUNCTIONAL MORPHING INTERACTION SYSTEM
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="pageTransitionsEnabled"
              checked={pageTransitionsEnabled}
              onChange={(e) => setPageTransitionsEnabled(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37]"
            />
            <label htmlFor="pageTransitionsEnabled" className="text-white uppercase">
              ENABLE CLIENT-SIDE PAGE ROUTE TRANSITIONS
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
        >
          SAVE DESIGN TOKENS ↗
        </button>
      </form>
    </div>
  );
};

export default AdminDesignManager;
