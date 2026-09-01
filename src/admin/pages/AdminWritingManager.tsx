import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminWritingManager: React.FC = () => {
  const { articles } = usePortfolio();

  return (
    <div className="space-y-8 max-w-5xl font-sans">
      <div className="border-b border-[#8C6D4F]/30 pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          TECHNICAL ARTICLES &amp; DISPATCHES
        </span>
        <h1
          className="text-4xl uppercase tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          WRITING MANAGER
        </h1>
      </div>

      <div className="space-y-4 font-mono text-xs">
        {articles.map((art) => (
          <div key={art.id} className="p-5 bg-[#0A0806] border border-[#8C6D4F]/30 rounded-sm space-y-2">
            <div className="flex justify-between items-center border-b border-[#8C6D4F]/20 pb-2">
              <span className="text-[#D4AF37]">{art.topic} · {art.date}</span>
              <span className="text-[#8C6D4F]">{art.readTime}</span>
            </div>
            <h3 className="text-xl font-bold text-white uppercase">{art.title}</h3>
            <p className="text-[#A8988B] text-xs font-light">TAGS: {art.tags.join(', ')}</p>
            <a href={art.mediumUrl} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline block pt-2">
              MEDIUM URL ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminWritingManager;
