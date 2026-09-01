import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminLabManager: React.FC = () => {
  const { labTracks, updateLabTracks } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');

  const handleStatusChange = (id: string, newStatus: any) => {
    const next = labTracks.map((t) => (t.id === id ? { ...t, status: newStatus } : t));
    updateLabTracks(next);
    setSavedMessage('Engineering Lab node status updated!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl font-sans">
      
      {/* Header */}
      <div className="border-b border-[#8C6D4F]/30 pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          INFRASTRUCTURE PROGRESSION ROADMAP MANAGER
        </span>
        <h1
          className="text-4xl uppercase tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          ENGINEERING LAB MANAGER
        </h1>
      </div>

      {savedMessage && (
        <div className="p-3 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono rounded-sm">
          {savedMessage}
        </div>
      )}

      {/* Lab Nodes List */}
      <div className="space-y-4 font-mono text-xs">
        {labTracks.map((track) => (
          <div
            key={track.id}
            className="p-5 bg-[#0A0806] border border-[#8C6D4F]/30 rounded-sm space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#8C6D4F]/20 pb-3">
              <div>
                <span className="text-[10px] text-[#D4AF37]">NODE #{track.stepNumber} // {track.category}</span>
                <h3 className="text-xl font-bold text-white uppercase">{track.title}</h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-[#8C6D4F]">STATUS:</span>
                <select
                  value={track.status}
                  onChange={(e) => handleStatusChange(track.id, e.target.value as any)}
                  className="bg-[#120F0C] border border-[#8C6D4F]/40 text-white p-2 rounded-sm outline-none"
                >
                  <option value="Completed">Completed</option>
                  <option value="Applied">Applied</option>
                  <option value="Building">Building</option>
                  <option value="Learning">Learning</option>
                </select>
              </div>
            </div>

            <p className="text-[#A8988B] text-xs font-light">{track.objective}</p>

            <div className="p-3 bg-[#120F0C] border border-[#8C6D4F]/20 rounded-sm text-[11px]">
              <span className="text-[#8C6D4F] block mb-1">BLUEPRINT:</span>
              <code className="text-[#E8DFD8]">{track.architecture}</code>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminLabManager;
