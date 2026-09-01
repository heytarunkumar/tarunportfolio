import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { LabTrack } from '../../data/engineeringLab';

export const AdminLabManager: React.FC = () => {
  const { labTracks, updateLabTracks } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');
  const [editingTrackId, setEditingTrackId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Python / Backend');
  const [objective, setObjective] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [architecture, setArchitecture] = useState('');
  const [status, setStatus] = useState<'Learning' | 'Building' | 'Applied' | 'Completed'>('Completed');
  const [githubUrl, setGithubUrl] = useState('');
  const [visible, setVisible] = useState(true);

  const startEdit = (track: LabTrack) => {
    setEditingTrackId(track.id);
    setTitle(track.title);
    setSubtitle(track.subtitle || '');
    setCategory(track.category);
    setObjective(track.objective);
    setTechnologies((track.technologies || []).join(', '));
    setArchitecture(track.architecture || '');
    setStatus(track.status);
    setGithubUrl(track.githubUrl || '');
    setVisible(track.visible !== false);
  };

  const resetForm = () => {
    setEditingTrackId(null);
    setTitle('');
    setSubtitle('');
    setCategory('Python / Backend');
    setObjective('');
    setTechnologies('');
    setArchitecture('');
    setStatus('Completed');
    setGithubUrl('');
    setVisible(true);
  };

  const handleSaveTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const techArray = technologies.split(',').map((t) => t.trim()).filter(Boolean);

    const nextTracks = [...labTracks];

    if (editingTrackId) {
      const idx = nextTracks.findIndex((t) => t.id === editingTrackId);
      if (idx !== -1) {
        nextTracks[idx] = {
          ...nextTracks[idx],
          title,
          subtitle: subtitle || 'Core Engineering Node',
          category,
          objective,
          technologies: techArray,
          architecture: architecture || `${title} Blueprint`,
          status,
          githubUrl: githubUrl || undefined,
          visible,
        };
      }
      setSavedMessage(`Lab Track "${title}" updated successfully.`);
    } else {
      const newId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      nextTracks.push({
        id: newId,
        stepNumber: String(nextTracks.length + 1).padStart(2, '0'),
        title,
        subtitle: subtitle || 'Core Engineering Node',
        category,
        objective,
        technologies: techArray,
        architecture: architecture || `${title} Blueprint`,
        keyLearnings: [objective],
        status,
        githubUrl: githubUrl || undefined,
        visible,
      });
      setSavedMessage(`Lab Track "${title}" added to Engineering Lab roadmap.`);
    }

    // Auto-serialize step numbers ("01", "02", "03"...)
    const serialized = nextTracks.map((t, i) => ({
      ...t,
      stepNumber: String(i + 1).padStart(2, '0'),
    }));

    updateLabTracks(serialized);
    resetForm();
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleDeleteTrack = (id: string) => {
    const trackToDelete = labTracks.find((t) => t.id === id);
    const nextTracks = labTracks.filter((t) => t.id !== id);
    const serialized = nextTracks.map((t, i) => ({
      ...t,
      stepNumber: String(i + 1).padStart(2, '0'),
    }));
    updateLabTracks(serialized);
    if (editingTrackId === id) resetForm();
    setSavedMessage(`Deleted Lab Track "${trackToDelete?.title || id}". Roadmap re-serialized.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const toggleVisibility = (idToToggle: string) => {
    const nextTracks = labTracks.map((t) =>
      t.id === idToToggle ? { ...t, visible: t.visible === false ? true : false } : t
    );
    updateLabTracks(nextTracks);
    const targetTrack = labTracks.find((t) => t.id === idToToggle);
    const isNowVisible = targetTrack?.visible === false;
    setSavedMessage(`Lab Track "${targetTrack?.title || idToToggle}" set to ${isNowVisible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const next = [...labTracks];
    const temp = next[index];
    next[index] = next[index - 1];
    next[index - 1] = temp;
    const serialized = next.map((t, i) => ({ ...t, stepNumber: String(i + 1).padStart(2, '0') }));
    updateLabTracks(serialized);
    setSavedMessage('Lab track sequence updated and re-serialized.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveDown = (index: number) => {
    if (index >= labTracks.length - 1) return;
    const next = [...labTracks];
    const temp = next[index];
    next[index] = next[index + 1];
    next[index + 1] = temp;
    const serialized = next.map((t, i) => ({ ...t, stepNumber: String(i + 1).padStart(2, '0') }));
    updateLabTracks(serialized);
    setSavedMessage('Lab track sequence updated and re-serialized.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveToPosition = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= labTracks.length || fromIndex === toIndex) return;
    const next = [...labTracks];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    const serialized = next.map((t, i) => ({ ...t, stepNumber: String(i + 1).padStart(2, '0') }));
    updateLabTracks(serialized);
    setSavedMessage(`Lab track moved to Position #${String(toIndex + 1).padStart(2, '0')}. Serialized.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl font-sans text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#8C6D4F]/30 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            INFRASTRUCTURE PROGRESSION ROADMAP MANAGER
          </span>
          <h1
            className="text-4xl uppercase tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ENGINEERING LAB MANAGER
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Create, edit, delete, reorder, and toggle visibility for engineering lab nodes.
          </p>
        </div>
        <span className="text-xs font-mono text-[#D4AF37] px-3 py-1 border border-[#D4AF37]/40 bg-[#1E1914] rounded-sm self-start sm:self-auto">
          {labTracks.length} NODES TOTAL / {labTracks.filter((t) => t.visible !== false).length} VISIBLE
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
          {editingTrackId ? `EDIT LAB TRACK NODE` : 'ADD NEW ENGINEERING LAB NODE'}
        </h2>

        <form onSubmit={handleSaveTrack} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                NODE TITLE *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Distributed Caching & Redis Pipelines"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                CATEGORY / DOMAIN *
              </label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Python / Backend / Caching"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                SUBTITLE / FOCUS
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Core Infrastructure Layer"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                ROADMAP STATUS *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              >
                <option value="Completed">Completed</option>
                <option value="Applied">Applied</option>
                <option value="Building">Building</option>
                <option value="Learning">Learning</option>
              </select>
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                PUBLIC VISIBILITY
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

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              ENGINEERING OBJECTIVE *
            </label>
            <textarea
              required
              rows={2}
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              placeholder="What core architectural competency or infrastructure goal does this node validate..."
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                TECHNOLOGIES / TOOLS (Comma-separated)
              </label>
              <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="Python, Redis, Celery, Docker"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                ARCHITECTURE BLUEPRINT / PIPELINE FLOW
              </label>
              <input
                type="text"
                value={architecture}
                onChange={(e) => setArchitecture(e.target.value)}
                placeholder="API Gateway -> Redis Cluster -> Worker Nodes"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              GITHUB CODE REPOSITORY URL (Optional)
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/heytarunkumar/..."
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="submit"
              className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
            >
              {editingTrackId ? 'SAVE LAB TRACK ↗' : 'ADD LAB TRACK NODE ↗'}
            </button>
            {editingTrackId && (
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

      {/* Existing Lab Nodes List */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#8C6D4F]/20 pb-3 gap-2">
          <h2 className="text-lg font-mono text-white tracking-wider uppercase">
            CATALOGED LAB NODES &amp; SEQUENCING ({labTracks.length})
          </h2>
          <span className="text-xs font-mono text-[#8C6D4F]">
            Use ▲ / ▼ or Position Selectors to reorder sequence
          </span>
        </div>

        <div className="space-y-4 font-mono text-xs">
          {labTracks.map((track, idx) => {
            const isVisible = track.visible !== false;

            return (
              <div
                key={track.id || idx}
                className={`p-5 border rounded-sm space-y-3 transition-colors ${
                  isVisible
                    ? 'bg-[#120F0C] border-[#8C6D4F]/30 hover:border-[#D4AF37]/50'
                    : 'bg-[#0E0B08] border-amber-900/40 opacity-75'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#8C6D4F]/20 pb-3">
                  <div className="flex items-start space-x-3">
                    
                    {/* Serial Order Controls */}
                    <div className="flex flex-col items-center space-y-1 bg-[#0A0806] p-2 border border-[#8C6D4F]/30 rounded-sm shrink-0">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveUp(idx)}
                        title="Move Node Up"
                        className="p-1 text-[#D4AF37] hover:bg-[#1E1914] disabled:opacity-20 disabled:hover:bg-transparent"
                      >
                        ▲
                      </button>
                      <span className="text-[11px] font-bold text-[#F7E7C4]">
                        #{track.stepNumber || String(idx + 1).padStart(2, '0')}
                      </span>
                      <button
                        type="button"
                        disabled={idx === labTracks.length - 1}
                        onClick={() => handleMoveDown(idx)}
                        title="Move Node Down"
                        className="p-1 text-[#D4AF37] hover:bg-[#1E1914] disabled:opacity-20 disabled:hover:bg-transparent"
                      >
                        ▼
                      </button>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] text-[#D4AF37] uppercase font-bold">
                          NODE #{track.stepNumber || String(idx + 1).padStart(2, '0')} // {track.category}
                        </span>
                        
                        {/* Visibility Badge Toggle Button */}
                        <button
                          type="button"
                          onClick={() => toggleVisibility(track.id)}
                          title="Click to toggle visibility on public website"
                          className={`text-[9px] font-mono px-2 py-0.5 border rounded-sm uppercase transition-all ${
                            isVisible
                              ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60'
                              : 'border-amber-500/50 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60'
                          }`}
                        >
                          {isVisible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}
                        </button>

                        <span className="text-[9px] px-2 py-0.5 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 rounded-sm uppercase">
                          {track.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white uppercase">{track.title}</h3>
                    </div>
                  </div>

                  {/* Actions & Position Selector */}
                  <div className="flex items-center space-x-2 shrink-0 self-end lg:self-auto">
                    <select
                      value={idx}
                      onChange={(e) => handleMoveToPosition(idx, parseInt(e.target.value, 10))}
                      title="Change Node Position"
                      className="bg-[#0A0806] border border-[#8C6D4F]/40 text-[#D4AF37] text-xs px-2 py-1.5 rounded-sm outline-none hover:border-[#D4AF37]"
                    >
                      {labTracks.map((_, posIdx) => (
                        <option key={posIdx} value={posIdx}>
                          Position #{String(posIdx + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => startEdit(track)}
                      className="px-3 py-1.5 border border-[#8C6D4F]/40 bg-[#1A140F] text-[#D4AF37] hover:border-[#D4AF37]"
                    >
                      EDIT ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTrack(track.id)}
                      className="px-3 py-1.5 border border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 font-bold"
                    >
                      DELETE 🗑️
                    </button>
                  </div>
                </div>

                <p className="text-[#A8988B] text-xs font-light">{track.objective}</p>

                {track.architecture && (
                  <div className="p-3 bg-[#0A0806] border border-[#8C6D4F]/20 rounded-sm text-[11px]">
                    <span className="text-[#8C6D4F] block mb-1 font-bold">BLUEPRINT:</span>
                    <code className="text-[#E8DFD8]">{track.architecture}</code>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default AdminLabManager;
