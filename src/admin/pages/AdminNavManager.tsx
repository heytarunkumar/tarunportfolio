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
      <div className="border-b border-[#8C6D4F]/30 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            HEADER, FOOTER &amp; ROUTE MENU MANAGER
          </span>
          <h1
            className="text-4xl uppercase tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            NAVIGATION MANAGER
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Add new pages/routes, edit titles &amp; paths, delete links, reorder navigation sequence, and toggle menu visibility.
          </p>
        </div>
        <span className="text-xs font-mono text-[#D4AF37] px-3 py-1 border border-[#D4AF37]/40 bg-[#1E1914] rounded-sm self-start sm:self-auto">
          {navigation.length} PAGES TOTAL / {navigation.filter((item) => item.visible !== false).length} VISIBLE IN NAVBAR
        </span>
      </div>

      {savedMessage && (
        <div className="p-4 border border-emerald-500/50 bg-emerald-950/30 text-emerald-300 text-xs font-mono rounded-sm flex items-center justify-between animate-fadeIn">
          <span>✓ {savedMessage}</span>
          <button onClick={() => setSavedMessage('')} className="text-emerald-400 font-bold hover:underline">
            DISMISS
          </button>
        </div>
      )}

      {/* Add / Edit Form */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-6">
        <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
          {editingId ? `EDIT NAVIGATION PAGE LINK` : 'ADD NEW PUBLIC PAGE / NAVIGATION LINK'}
        </h2>

        <form onSubmit={handleSaveNavItem} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                NAVIGATION LINK NAME *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. CERTIFICATIONS or BLOG"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none uppercase"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                ROUTE PATH / URL *
              </label>
              <input
                type="text"
                required
                value={path}
                onChange={(e) => setPath(e.target.value)}
                placeholder="/projects or /about or #writing"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                PUBLIC NAVBAR VISIBILITY
              </label>
              <div
                onClick={() => setVisible(!visible)}
                className={`p-2.5 border rounded-sm cursor-pointer flex items-center justify-between font-mono select-none transition-colors ${
                  visible
                    ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300'
                    : 'border-amber-500/50 bg-amber-950/30 text-amber-300'
                }`}
              >
                <span>{visible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}</span>
                <span className="text-[10px] uppercase font-bold">
                  {visible ? '[ PUBLIC ]' : '[ HIDDEN ]'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="submit"
              className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
            >
              {editingId ? 'SAVE PAGE LINK ↗' : 'ADD PAGE LINK ↗'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-3 border border-[#8C6D4F]/40 bg-[#120F0C] text-[#C4B5A5] uppercase tracking-widest hover:text-white"
              >
                CANCEL EDIT
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Cataloged Navigation Links List */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4 font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#8C6D4F]/20 pb-3 gap-2">
          <h2 className="text-lg text-white font-bold uppercase">
            PUBLIC WEBSITE PAGES &amp; NAVIGATION LINKS ({navigation.length})
          </h2>
          <span className="text-xs text-[#8C6D4F]">
            Use ▲ / ▼ or Position Selectors to reorder menu items
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {navigation.map((item, idx) => {
            const isVisible = item.visible !== false;

            return (
              <div
                key={item.id || idx}
                className={`p-4 border rounded-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors ${
                  isVisible
                    ? 'bg-[#120F0C] border-[#8C6D4F]/20 hover:border-[#D4AF37]/50'
                    : 'bg-[#0E0B08] border-amber-900/40 opacity-75'
                }`}
              >
                <div className="flex items-center space-x-3">
                  
                  {/* Order Controls */}
                  <div className="flex flex-col items-center space-y-1 bg-[#0A0806] p-1.5 border border-[#8C6D4F]/30 rounded-sm shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveUp(idx)}
                      title="Move Link Up"
                      className="p-0.5 text-[#D4AF37] hover:bg-[#1E1914] disabled:opacity-20"
                    >
                      ▲
                    </button>
                    <span className="text-[10px] font-bold text-[#F7E7C4]">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      disabled={idx === navigation.length - 1}
                      onClick={() => handleMoveDown(idx)}
                      title="Move Link Down"
                      className="p-0.5 text-[#D4AF37] hover:bg-[#1E1914] disabled:opacity-20"
                    >
                      ▼
                    </button>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="text-white font-bold tracking-wider text-sm">{item.name}</span>
                      
                      {/* Visibility Toggle Button */}
                      <button
                        type="button"
                        onClick={() => toggleVisibility(item.id)}
                        title="Click to toggle visibility in Navbar & Footer"
                        className={`text-[9px] font-mono px-2 py-0.5 border rounded-sm uppercase transition-all ${
                          isVisible
                            ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60'
                            : 'border-amber-500/50 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60'
                        }`}
                      >
                        {isVisible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}
                      </button>
                    </div>
                    <span className="text-[10.5px] text-[#8C6D4F]">Route Path: <code className="text-[#E8DFD8]">{item.path}</code></span>
                  </div>
                </div>

                {/* Action Controls & Position Selector */}
                <div className="flex items-center space-x-2 shrink-0 self-end lg:self-auto">
                  <select
                    value={idx}
                    onChange={(e) => handleMoveToPosition(idx, parseInt(e.target.value, 10))}
                    title="Change Position"
                    className="bg-[#0A0806] border border-[#8C6D4F]/40 text-[#D4AF37] text-xs px-2 py-1.5 rounded-sm outline-none hover:border-[#D4AF37]"
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
                    className="px-3 py-1.5 border border-[#8C6D4F]/40 bg-[#1A140F] text-[#D4AF37] hover:border-[#D4AF37]"
                  >
                    EDIT ✏️
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteNavItem(item.id)}
                    className="px-3 py-1.5 border border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 font-bold"
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
