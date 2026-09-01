import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminResearchManager: React.FC = () => {
  const { research, updateResearch } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');
  const [status, setStatus] = useState(research.status);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateResearch({ status });
    setSavedMessage('Research metadata updated!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl font-sans">
      <div className="border-b border-[#8C6D4F]/30 pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          EXPLAINABLE AI RESEARCH PAPER MANAGER
        </span>
        <h1
          className="text-4xl uppercase tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          RESEARCH MANAGER
        </h1>
      </div>

      {savedMessage && (
        <div className="p-3 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono rounded-sm">
          {savedMessage}
        </div>
      )}

      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4 font-mono text-xs">
        <h2 className="text-lg text-white font-bold uppercase border-b border-[#8C6D4F]/20 pb-3">
          {research.title}
        </h2>

        <div>
          <span className="text-[#8C6D4F] block mb-1">CO-AUTHORS:</span>
          <span className="text-white">{research.authors.join(', ')}</span>
        </div>

        <div>
          <span className="text-[#8C6D4F] block mb-1">METHODOLOGY &amp; EXPLAINABILITY:</span>
          <p className="text-[#A8988B] leading-relaxed">{research.explainabilityApproach}</p>
        </div>

        <form onSubmit={handleSave} className="pt-4 border-t border-[#8C6D4F]/20 space-y-3">
          <label className="block text-[#8C6D4F] uppercase">PUBLICATION STATUS METADATA</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-3 rounded-sm outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase"
          >
            UPDATE RESEARCH STATUS ↗
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminResearchManager;
