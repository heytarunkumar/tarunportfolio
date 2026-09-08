import React, { useState, useEffect } from 'react';

export interface MediaAssetItem {
  id: string;
  name: string;
  type: string;
  size: string;
  path: string;
  usage: string;
  visible?: boolean;
}

const INITIAL_ASSETS: MediaAssetItem[] = [
  { id: '1', name: 'Tarun_Kumar_Resume_ATS_OnePage.pdf', type: 'PDF Document', size: '157.3 kB', path: '/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf', usage: 'Resume Asset', visible: true },
  { id: '2', name: 'favicon.svg', type: 'SVG Icon', size: '1.2 kB', path: '/favicon.svg', usage: 'Browser Favicon Logo', visible: true },
  { id: '3', name: 'hero.mp4', type: 'MP4 Video', size: '4.8 MB', path: '/videos/hero.mp4', usage: 'Hero Ambient Overlay', visible: true },
  { id: '4', name: 'healthguard.png', type: 'PNG Image', size: '420.5 kB', path: '/images/healthguard.png', usage: 'AI-HealthGuard Project', visible: true },
];

const STORAGE_KEY = 'tarun_portfolio_cms_media_assets';

export const AdminMediaPage: React.FC = () => {
  const [assets, setAssets] = useState<MediaAssetItem[]>(() => {
    if (typeof window === 'undefined') return INITIAL_ASSETS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ASSETS;
    } catch {
      return INITIAL_ASSETS;
    }
  });

  const [savedMessage, setSavedMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState('PNG Image');
  const [size, setSize] = useState('250 kB');
  const [path, setPath] = useState('');
  const [usage, setUsage] = useState('');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
      } catch {
        // ignore
      }
    }
  }, [assets]);

  const startEdit = (asset: MediaAssetItem) => {
    setEditingId(asset.id);
    setName(asset.name);
    setType(asset.type);
    setSize(asset.size);
    setPath(asset.path);
    setUsage(asset.usage);
    setVisible(asset.visible !== false);
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setType('PNG Image');
    setSize('250 kB');
    setPath('');
    setUsage('');
    setVisible(true);
  };

  const handleSaveAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !path.trim()) return;

    const nextAssets = [...assets];

    if (editingId) {
      const idx = nextAssets.findIndex((a) => a.id === editingId);
      if (idx !== -1) {
        nextAssets[idx] = {
          ...nextAssets[idx],
          name,
          type,
          size: size || 'Unknown',
          path,
          usage: usage || 'General Asset',
          visible,
        };
      }
      setSavedMessage(`Media asset "${name}" updated successfully.`);
    } else {
      const newId = Date.now().toString();
      nextAssets.push({
        id: newId,
        name,
        type,
        size: size || 'Unknown',
        path,
        usage: usage || 'General Asset',
        visible,
      });
      setSavedMessage(`Added "${name}" to Media Library.`);
    }

    setAssets(nextAssets);
    resetForm();
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleDeleteAsset = (id: string) => {
    const target = assets.find((a) => a.id === id);
    const nextAssets = assets.filter((a) => a.id !== id);
    setAssets(nextAssets);
    if (editingId === id) resetForm();
    setSavedMessage(`Deleted Media Asset "${target?.name || id}".`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const toggleVisibility = (idToToggle: string) => {
    const nextAssets = assets.map((a) =>
      a.id === idToToggle ? { ...a, visible: a.visible === false ? true : false } : a
    );
    setAssets(nextAssets);
    const target = assets.find((a) => a.id === idToToggle);
    const isNowVisible = target?.visible === false;
    setSavedMessage(`Media asset "${target?.name || idToToggle}" set to ${isNowVisible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const next = [...assets];
    const temp = next[index];
    next[index] = next[index - 1];
    next[index - 1] = temp;
    setAssets(next);
    setSavedMessage('Asset order updated.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveDown = (index: number) => {
    if (index >= assets.length - 1) return;
    const next = [...assets];
    const temp = next[index];
    next[index] = next[index + 1];
    next[index + 1] = temp;
    setAssets(next);
    setSavedMessage('Asset order updated.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveToPosition = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= assets.length || fromIndex === toIndex) return;
    const next = [...assets];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setAssets(next);
    setSavedMessage(`Moved asset to Position #${String(toIndex + 1).padStart(2, '0')}.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const copyToClipboard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setSavedMessage(`Copied path "${text}" to clipboard!`);
      setTimeout(() => setSavedMessage(''), 3000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-8 max-w-6xl font-sans text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#26211B] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            ASSET &amp; MEDIA REPOSITORY
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
            Media Library Manager
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Register, catalog, reorder, preview, and manage public media assets and documents.
          </p>
        </div>
        <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 border border-[#D4AF37]/30 bg-[#1A1612] rounded-full self-start sm:self-auto shadow-sm">
          {assets.length} ASSETS REGISTERED · {assets.filter((a) => a.visible !== false).length} ACTIVE
        </span>
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

      {/* Add / Edit Asset Form */}
      <div className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift">
        <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
          {editingId ? `Edit Media Asset Registration` : 'Register New Media Asset / Document'}
        </h2>

        <form onSubmit={handleSaveAsset} className="space-y-5 font-sans text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                ASSET FILENAME *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. project_arch_diagram.png"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                FILE PATH / URL *
              </label>
              <input
                type="text"
                required
                value={path}
                onChange={(e) => setPath(e.target.value)}
                placeholder="/images/project_arch_diagram.png or https://..."
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none transition-all font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                ASSET TYPE *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none transition-all"
              >
                <option value="PNG Image">PNG Image</option>
                <option value="JPG Image">JPG Image</option>
                <option value="SVG Icon">SVG Icon</option>
                <option value="PDF Document">PDF Document</option>
                <option value="MP4 Video">MP4 Video</option>
                <option value="External URL">External Link / URL</option>
              </select>
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                FILE SIZE / APPROX
              </label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="320 kB"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                USAGE CONTEXT
              </label>
              <input
                type="text"
                value={usage}
                onChange={(e) => setUsage(e.target.value)}
                placeholder="Hero Section Video / Resume"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                ASSET VISIBILITY
              </label>
              <button
                type="button"
                onClick={() => setVisible(!visible)}
                className={`w-full p-3 border rounded-xl cursor-pointer flex items-center justify-between font-mono select-none transition-all ${
                  visible
                    ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                    : 'border-amber-500/40 bg-amber-950/20 text-amber-300'
                }`}
              >
                <span>{visible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}</span>
                <span className="text-[10px] uppercase font-bold">
                  {visible ? '[ ACTIVE ]' : '[ HIDDEN ]'}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
            >
              {editingId ? 'Save Media Asset ↗' : 'Register Media Asset ↗'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-3 rounded-xl border border-[#26211B] bg-[#171411] text-[#E8DFD8] text-xs font-mono uppercase tracking-wider hover:border-[#D4AF37]/50 hover:text-white transition-all cursor-pointer"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Cataloged Assets Grid */}
      <div className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#26211B] pb-3 gap-2">
          <h2 className="text-base text-white font-mono uppercase tracking-wider font-semibold">
            Registered Public Media Assets ({assets.length})
          </h2>
          <span className="text-xs text-[#8C6D4F] font-mono">
            Use ▲ / ▼ or Position Selectors to reorder asset sequence
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assets.map((asset, idx) => {
            const isVisible = asset.visible !== false;

            return (
              <div
                key={asset.id || idx}
                className={`p-5 border rounded-xl space-y-3 transition-all card-lift ${
                  isVisible
                    ? 'bg-[#0A0908] border-[#26211B] hover:border-[#D4AF37]/40'
                    : 'bg-[#0E0C0A] border-amber-900/30 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  
                  {/* Order Controls */}
                  <div className="flex flex-col items-center space-y-1 bg-[#171411] p-1.5 border border-[#26211B] rounded-lg shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveUp(idx)}
                      title="Move Asset Up"
                      className="p-1 text-[#D4AF37] hover:bg-[#26211B] rounded disabled:opacity-20 transition-colors"
                    >
                      ▲
                    </button>
                    <span className="text-[10px] font-mono font-bold text-[#F7E7C4]">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      disabled={idx === assets.length - 1}
                      onClick={() => handleMoveDown(idx)}
                      title="Move Asset Down"
                      className="p-1 text-[#D4AF37] hover:bg-[#26211B] rounded disabled:opacity-20 transition-colors"
                    >
                      ▼
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-white font-mono font-bold text-sm truncate">{asset.name}</span>
                      
                      {/* Visibility Toggle Button */}
                      <button
                        type="button"
                        onClick={() => toggleVisibility(asset.id)}
                        title="Toggle Asset Visibility"
                        className={`text-[9px] font-mono px-2 py-0.5 border rounded-full uppercase shrink-0 ${
                          isVisible
                            ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                            : 'border-amber-500/40 bg-amber-950/40 text-amber-300'
                        }`}
                      >
                        {isVisible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}
                      </button>
                    </div>
                    <p className="text-[11px] text-[#A8988B] truncate font-mono">
                      {asset.type} · {asset.size} · Context: {asset.usage}
                    </p>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#26211B]">
                  <span className="text-[10px] text-[#8C6D4F] font-mono truncate max-w-[180px]" title={asset.path}>
                    {asset.path}
                  </span>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(asset.path)}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-lg border border-[#26211B] bg-[#171411] text-[#C4B5A5] hover:text-white hover:border-[#D4AF37]/40 transition-all"
                    >
                      COPY PATH 📋
                    </button>

                    <select
                      value={idx}
                      onChange={(e) => handleMoveToPosition(idx, parseInt(e.target.value, 10))}
                      title="Change Position"
                      className="bg-[#171411] border border-[#26211B] text-[#D4AF37] text-[10px] font-mono px-2 py-1 rounded-lg outline-none"
                    >
                      {assets.map((_, posIdx) => (
                        <option key={posIdx} value={posIdx}>
                          Pos #{String(posIdx + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => startEdit(asset)}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-lg border border-[#D4AF37]/30 bg-[#1A1612] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                    >
                      EDIT ✏️
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteAsset(asset.id)}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-lg border border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-950/40 font-bold transition-colors"
                    >
                      DELETE 🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default AdminMediaPage;
