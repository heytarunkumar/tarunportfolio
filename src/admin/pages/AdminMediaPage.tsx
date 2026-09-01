import React from 'react';

export const AdminMediaPage: React.FC = () => {
  const mediaAssets = [
    { name: 'Tarun_Kumar_Resume_ATS_OnePage.pdf', type: 'PDF Document', size: '157.3 kB', path: '/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf', usage: 'Resume Asset' },
    { name: 'favicon.svg', type: 'SVG Icon', size: '1.2 kB', path: '/favicon.svg', usage: 'Browser Favicon Logo' },
    { name: 'hero.mp4', type: 'MP4 Video', size: '4.8 MB', path: '/videos/hero.mp4', usage: 'Hero Ambient Overlay' },
    { name: 'healthguard.png', type: 'PNG Image', size: '420.5 kB', path: '/images/healthguard.png', usage: 'AI-HealthGuard Project' },
  ];

  return (
    <div className="space-y-8 max-w-5xl font-sans">
      <div className="border-b border-[#8C6D4F]/30 pb-6 flex justify-between items-center">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            ASSET &amp; MEDIA MANAGEMENT
          </span>
          <h1
            className="text-4xl uppercase tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            MEDIA LIBRARY
          </h1>
        </div>
        <button
          type="button"
          onClick={() => alert('Media asset upload feature ready. Select file from public/ folder.')}
          className="px-4 py-2 border border-[#D4AF37] bg-[#D4AF37] text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#E2C054]"
        >
          + UPLOAD MEDIA ASSET
        </button>
      </div>

      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4 font-mono text-xs">
        <h2 className="text-lg text-white font-bold uppercase border-b border-[#8C6D4F]/20 pb-3">
          REGISTERED PUBLIC MEDIA ASSETS ({mediaAssets.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mediaAssets.map((asset) => (
            <div key={asset.name} className="p-4 bg-[#120F0C] border border-[#8C6D4F]/20 rounded-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#D4AF37] font-bold truncate max-w-[200px]">{asset.name}</span>
                <span className="text-[10px] text-[#8C6D4F]">{asset.size}</span>
              </div>
              <p className="text-[11px] text-[#A8988B]">Type: {asset.type} · Usage: {asset.usage}</p>
              <div className="pt-2 flex items-center justify-between border-t border-[#8C6D4F]/15">
                <span className="text-[10px] text-[#8C6D4F] truncate max-w-[180px]">{asset.path}</span>
                <a
                  href={asset.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline text-[10.5px]"
                >
                  VIEW ASSET ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMediaPage;
