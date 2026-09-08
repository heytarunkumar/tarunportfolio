import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { NavItemSetting } from '../../context/PortfolioContext';

export const AdminNavManager: React.FC = () => {
  const { navigation, updateNavigation } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [visible, setVisible] = useState(true);

  const startEdit = (item: NavItemSetting) => {
    setEditingId(item.id);
    setName(item.name);
    setPath(item.path);
    setVisible(item.visible !== false);
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPath('');
    setVisible(true);
  };

  const handleSaveNavItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !path.trim()) return;

    const nextNav = [...navigation];

    if (editingId) {
      const idx = nextNav.findIndex((item) => item.id === editingId);
      if (idx !== -1) {
        nextNav[idx] = {
          ...nextNav[idx],
          name: name.toUpperCase().trim(),
          path: path.trim(),
          visible,
        };
      }
      setSavedMessage(`Navigation page "${name}" updated successfully.`);
    } else {
      const newId = Date.now().toString();
      nextNav.push({
        id: newId,
        name: name.toUpperCase().trim(),
        path: path.trim(),
        visible,
        order: nextNav.length + 1,
      });
      setSavedMessage(`Added "${name}" to Public Navigation Menu.`);
    }

    // Auto-serialize order numbers
    const serialized = nextNav.map((item, i) => ({
      ...item,
      order: i + 1,
    }));

    updateNavigation(serialized);
    resetForm();
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleDeleteNavItem = (id: string) => {
    const target = navigation.find((item) => item.id === id);
    const nextNav = navigation.filter((item) => item.id !== id);
    const serialized = nextNav.map((item, i) => ({
      ...item,
      order: i + 1,
    }));
    updateNavigation(serialized);
    if (editingId === id) resetForm();
    setSavedMessage(`Deleted Navigation Link "${target?.name || id}".`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const toggleVisibility = (idToToggle: string) => {
    const nextNav = navigation.map((item) =>
      item.id === idToToggle ? { ...item, visible: item.visible === false ? true : false } : item
    );
    updateNavigation(nextNav);
    const target = navigation.find((item) => item.id === idToToggle);
    const isNowVisible = target?.visible === false;
    setSavedMessage(`Navigation link "${target?.name || idToToggle}" set to ${isNowVisible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const next = [...navigation];
    const temp = next[index];
    next[index] = next[index - 1];
    next[index - 1] = temp;
    const serialized = next.map((item, i) => ({ ...item, order: i + 1 }));
    updateNavigation(serialized);
    setSavedMessage('Navigation menu order updated.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveDown = (index: number) => {
    if (index >= navigation.length - 1) return;
    const next = [...navigation];
    const temp = next[index];
    next[index] = next[index + 1];
    next[index + 1] = temp;
    const serialized = next.map((item, i) => ({ ...item, order: i + 1 }));
    updateNavigation(serialized);
    setSavedMessage('Navigation menu order updated.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveToPosition = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= navigation.length || fromIndex === toIndex) return;
    const next = [...navigation];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    const serialized = next.map((item, i) => ({ ...item, order: i + 1 }));
    updateNavigation(serialized);
    setSavedMessage(`Moved navigation page to Position #${String(toIndex + 1).padStart(2, '0')}.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl font-sans text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#26211B] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            SITE ROUTING &amp; NAVIGATION MANAGER
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
            Navigation Manager
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Add new pages/routes, edit titles &amp; paths, delete links, reorder navigation sequence, and toggle menu visibility.
          </p>
        </div>
        <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 border border-[#D4AF37]/30 bg-[#1A1612] rounded-full self-start sm:self-auto shadow-sm">
          {navigation.length} PAGES TOTAL · {navigation.filter((item) => item.visible !== false).length} VISIBLE IN NAVBAR
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

      {/* Add / Edit Form */}
      <div className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift">
        <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
          {editingId ? `Edit Navigation Page Link` : 'Add New Public Page / Navigation Link'}
        </h2>

        <form onSubmit={handleSaveNavItem} className="space-y-5 font-sans text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                NAVIGATION LINK NAME *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. CERTIFICATIONS or BLOG"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none uppercase font-mono transition-all"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                ROUTE PATH / URL *
              </label>
              <input
                type="text"
                required
                value={path}
                onChange={(e) => setPath(e.target.value)}
                placeholder="/projects or /about or #writing"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                PUBLIC NAVBAR VISIBILITY
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
                  {visible ? '[ PUBLIC ]' : '[ HIDDEN ]'}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
            >
              {editingId ? 'Save Page Link ↗' : 'Add Page Link ↗'}
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

      {/* Cataloged Navigation Links List */}
      <div className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#26211B] pb-3 gap-2">
          <h2 className="text-base text-white font-mono uppercase tracking-wider font-semibold">
            Public Website Pages &amp; Navigation Links ({navigation.length})
          </h2>
          <span className="text-xs text-[#8C6D4F] font-mono">
            Use ▲ / ▼ or Position Selectors to reorder menu items
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {navigation.map((item, idx) => {
            const isVisible = item.visible !== false;

            return (
              <div
                key={item.id || idx}
                className={`p-5 border rounded-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all card-lift ${
                  isVisible
                    ? 'bg-[#0A0908] border-[#26211B] hover:border-[#D4AF37]/40'
                    : 'bg-[#0E0C0A] border-amber-900/30 opacity-75'
                }`}
              >
                <div className="flex items-center space-x-3">
                  
                  {/* Order Controls */}
                  <div className="flex flex-col items-center space-y-1 bg-[#171411] p-1.5 border border-[#26211B] rounded-lg shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveUp(idx)}
                      title="Move Link Up"
                      className="p-1 text-[#D4AF37] hover:bg-[#26211B] rounded disabled:opacity-20 transition-colors"
                    >
                      ▲
                    </button>
                    <span className="text-[10px] font-mono font-bold text-[#F7E7C4]">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      disabled={idx === navigation.length - 1}
                      onClick={() => handleMoveDown(idx)}
                      title="Move Link Down"
                      className="p-1 text-[#D4AF37] hover:bg-[#26211B] rounded disabled:opacity-20 transition-colors"
                    >
                      ▼
                    </button>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-white font-mono font-bold tracking-wider text-sm">{item.name}</span>
                      
                      {/* Visibility Toggle Button */}
                      <button
                        type="button"
                        onClick={() => toggleVisibility(item.id)}
                        title="Click to toggle visibility in Navbar & Footer"
                        className={`text-[9px] font-mono px-2 py-0.5 border rounded-full uppercase transition-all ${
                          isVisible
                            ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60'
                            : 'border-amber-500/40 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60'
                        }`}
                      >
                        {isVisible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}
                      </button>
                    </div>
                    <span className="text-[11px] text-[#8C6D4F] font-mono">Route Path: <code className="text-[#D4AF37]">{item.path}</code></span>
                  </div>
                </div>

                {/* Action Controls & Position Selector */}
                <div className="flex items-center space-x-2 shrink-0 self-end lg:self-auto">
                  <select
                    value={idx}
                    onChange={(e) => handleMoveToPosition(idx, parseInt(e.target.value, 10))}
                    title="Change Position"
                    className="bg-[#171411] border border-[#26211B] text-[#D4AF37] text-xs font-mono px-2.5 py-1.5 rounded-lg outline-none hover:border-[#D4AF37]/50 transition-colors"
                  >
                    {navigation.map((_, posIdx) => (
                      <option key={posIdx} value={posIdx}>
                        Position #{String(posIdx + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="px-3.5 py-1.5 rounded-lg border border-[#D4AF37]/30 bg-[#1A1612] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                  >
                    EDIT ✏️
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteNavItem(item.id)}
                    className="px-3.5 py-1.5 rounded-lg border border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-950/40 font-bold transition-colors"
                  >
                    DELETE 🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default AdminNavManager;
