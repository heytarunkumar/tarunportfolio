import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminExperienceManager: React.FC = () => {
  const { experience } = usePortfolio();

  return (
    <div className="space-y-8 max-w-5xl font-sans">
      <div className="border-b border-[#8C6D4F]/30 pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          CAREER &amp; ACADEMIC MILESTONES
        </span>
        <h1
          className="text-4xl uppercase tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          EXPERIENCE MANAGER
        </h1>
      </div>

      <div className="space-y-4 font-mono text-xs">
        {experience.map((item) => (
          <div key={item.id} className="p-5 bg-[#0A0806] border border-[#8C6D4F]/30 rounded-sm space-y-3">
            <div className="flex justify-between items-center border-b border-[#8C6D4F]/20 pb-3">
              <div>
                <span className="text-[#D4AF37] font-bold">{item.year}</span>
                <h3 className="text-xl font-bold text-white uppercase">{item.role}</h3>
                <span className="text-[#8C6D4F] block">{item.organization}</span>
              </div>
              <span className={`px-2 py-1 rounded-sm border uppercase ${item.isVerified ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300' : 'border-amber-500/40 bg-amber-950/30 text-amber-300'}`}>
                {item.isVerified ? 'VERIFIED' : 'VERIFY REQUIRED'}
              </span>
            </div>

            <p className="text-[#A8988B] text-xs font-light">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminExperienceManager;
