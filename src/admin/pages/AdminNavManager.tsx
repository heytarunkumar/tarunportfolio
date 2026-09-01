import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminNavManager: React.FC = () => {
  const { navigation, updateNavigation } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');

  const handleToggle = (id: string) => {
    const next = navigation.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item));
    updateNavigation(next);
    setSavedMessage('Navigation order & visibility updated!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl font-sans">
      <div className="border-b border-[#8C6D4F]/30 pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          HEADER &amp; ROUTE MENU MANAGER
        </span>
        <h1
          className="text-4xl uppercase tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          NAVIGATION MANAGER
        </h1>
      </div>

      {savedMessage && (
        <div className="p-3 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono rounded-sm">
          {savedMessage}
        </div>
      )}

      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-3 font-mono text-xs">
        {navigation.map((item) => (
          <div key={item.id} className="p-3.5 bg-[#120F0C] border border-[#8C6D4F]/20 rounded-sm flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-[#8C6D4F]">ORDER #{item.order}</span>
              <span className="text-white font-bold tracking-wider">{item.name}</span>
              <span className="text-[#8C6D4F]">({item.path})</span>
            </div>
            <button
              type="button"
              onClick={() => handleToggle(item.id)}
              className={`px-3 py-1 border rounded-sm font-bold ${item.visible ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/30' : 'border-red-500/40 text-red-300 bg-red-950/30'}`}
            >
              {item.visible ? 'VISIBLE ✓' : 'HIDDEN ✕'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNavManager;
