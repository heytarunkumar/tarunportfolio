import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { ExperienceItem } from '../../data/experience';

export const AdminExperienceManager: React.FC = () => {
  const { experience, updateExperience } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [year, setYear] = useState('');
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [isVerified, setIsVerified] = useState(true);
  const [visible, setVisible] = useState(true);

  const startEdit = (item: ExperienceItem) => {
    setEditingId(item.id);
    setYear(item.year);
    setRole(item.role);
    setOrganization(item.organization);
    setLocation(item.location || '');
    setDescription(item.description);
    setResponsibilities((item.responsibilities || []).join('\n'));
    setTechnologies((item.technologies || []).join(', '));
    setIsVerified(item.isVerified !== false);
    setVisible(item.visible !== false);
  };

  const resetForm = () => {
    setEditingId(null);
    setYear('');
    setRole('');
    setOrganization('');
    setLocation('');
    setDescription('');
    setResponsibilities('');
    setTechnologies('');
    setIsVerified(true);
    setVisible(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim() || !organization.trim()) return;

    const respArray = responsibilities
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const techArray = technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const nextExperience = [...experience];

    if (editingId) {
      const idx = nextExperience.findIndex((e) => e.id === editingId);
      if (idx !== -1) {
        nextExperience[idx] = {
          ...nextExperience[idx],
          year: year || '2024 - PRESENT',
          role,
          organization,
          location: location || undefined,
          description,
          responsibilities: respArray,
          technologies: techArray,
          isVerified,
          visible,
        };
      }
      setSavedMessage(`Experience milestone "${role}" updated successfully.`);
    } else {
      const newId = String(nextExperience.length + 1).padStart(2, '0');
      nextExperience.push({
        id: newId,
        year: year || '2024 - PRESENT',
        role,
        organization,
        location: location || undefined,
        description,
        responsibilities: respArray.length > 0 ? respArray : [description],
        technologies: techArray,
        isVerified,
        visible,
      });
      setSavedMessage(`Added "${role}" to Experience timeline.`);
    }

    updateExperience(nextExperience);
    resetForm();
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleDeleteItem = (id: string) => {
    const itemToDelete = experience.find((e) => e.id === id);
    const nextExperience = experience.filter((e) => e.id !== id);
    updateExperience(nextExperience);
    if (editingId === id) resetForm();
    setSavedMessage(`Deleted Experience entry "${itemToDelete?.role || id}".`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const toggleVisibility = (idToToggle: string) => {
    const nextExperience = experience.map((item) =>
      item.id === idToToggle ? { ...item, visible: item.visible === false ? true : false } : item
    );
    updateExperience(nextExperience);
    const target = experience.find((item) => item.id === idToToggle);
    const isNowVisible = target?.visible === false;
    setSavedMessage(`Experience milestone "${target?.role || idToToggle}" set to ${isNowVisible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const next = [...experience];
    const temp = next[index];
    next[index] = next[index - 1];
    next[index - 1] = temp;
    updateExperience(next);
    setSavedMessage('Timeline sequence updated.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveDown = (index: number) => {
    if (index >= experience.length - 1) return;
    const next = [...experience];
    const temp = next[index];
    next[index] = next[index + 1];
    next[index + 1] = temp;
    updateExperience(next);
    setSavedMessage('Timeline sequence updated.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveToPosition = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= experience.length || fromIndex === toIndex) return;
    const next = [...experience];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    updateExperience(next);
    setSavedMessage(`Moved entry to Position #${String(toIndex + 1).padStart(2, '0')}.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl font-sans text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#8C6D4F]/30 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            CAREER &amp; ACADEMIC MILESTONES
          </span>
          <h1
            className="text-4xl uppercase tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            EXPERIENCE MANAGER
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Add, edit, delete, reorder, and toggle visibility for career and academic milestones.
          </p>
        </div>
        <span className="text-xs font-mono text-[#D4AF37] px-3 py-1 border border-[#D4AF37]/40 bg-[#1E1914] rounded-sm self-start sm:self-auto">
          {experience.length} MILESTONES TOTAL / {experience.filter((e) => e.visible !== false).length} VISIBLE
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

      {/* Create / Edit Form */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-6">
        <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
          {editingId ? `EDIT EXPERIENCE MILESTONE` : 'ADD NEW EXPERIENCE MILESTONE'}
        </h2>

        <form onSubmit={handleSaveItem} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                TIMELINE PERIOD / YEAR *
              </label>
              <input
                type="text"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2024 - PRESENT"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                ROLE / TITLE *
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Python Backend & Cloud Systems Engineer"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                ORGANIZATION / COMPANY *
              </label>
              <input
                type="text"
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Independent Projects & Open Source"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                LOCATION (Optional)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="India / Remote"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                VERIFICATION BADGE *
              </label>
              <select
                value={isVerified ? 'true' : 'false'}
                onChange={(e) => setIsVerified(e.target.value === 'true')}
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              >
                <option value="true">Verified Milestone ✓</option>
                <option value="false">Verify Required ⚠️</option>
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
              EXECUTIVE SUMMARY *
            </label>
            <textarea
              required
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="High-level architectural summary of responsibilities and achievements..."
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              KEY RESPONSIBILITIES &amp; SCOPE (One bullet per line)
            </label>
            <textarea
              rows={3}
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder="Designing REST APIs and modular Python software architectures&#10;Containerizing services with multi-stage Docker builds&#10;Automating CI/CD pipelines"
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              TECHNOLOGIES / TOOLS (Comma-separated)
            </label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="Python, Flask, Docker, Linux, REST APIs, AWS, Git"
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="submit"
              className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
            >
              {editingId ? 'SAVE MILESTONE ↗' : 'ADD MILESTONE ↗'}
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

      {/* Existing Experience Items List */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#8C6D4F]/20 pb-3 gap-2">
          <h2 className="text-lg font-mono text-white tracking-wider uppercase">
            CATALOGED MILESTONES &amp; TIMELINE ({experience.length})
          </h2>
          <span className="text-xs font-mono text-[#8C6D4F]">
            Use ▲ / ▼ or Position Selectors to reorder display sequence
          </span>
        </div>

        <div className="space-y-4 font-mono text-xs">
          {experience.map((item, idx) => {
            const isVisible = item.visible !== false;

            return (
              <div
                key={item.id || idx}
                className={`p-5 border rounded-sm space-y-3 transition-colors ${
                  isVisible
                    ? 'bg-[#120F0C] border-[#8C6D4F]/30 hover:border-[#D4AF37]/50'
                    : 'bg-[#0E0B08] border-amber-900/40 opacity-75'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#8C6D4F]/20 pb-3">
                  <div className="flex items-start space-x-3">
                    
                    {/* Timeline Position Controls */}
                    <div className="flex flex-col items-center space-y-1 bg-[#0A0806] p-2 border border-[#8C6D4F]/30 rounded-sm shrink-0">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveUp(idx)}
                        title="Move Item Up"
                        className="p-1 text-[#D4AF37] hover:bg-[#1E1914] disabled:opacity-20 disabled:hover:bg-transparent"
                      >
                        ▲
                      </button>
                      <span className="text-[11px] font-bold text-[#F7E7C4]">
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                      <button
                        type="button"
                        disabled={idx === experience.length - 1}
                        onClick={() => handleMoveDown(idx)}
                        title="Move Item Down"
                        className="p-1 text-[#D4AF37] hover:bg-[#1E1914] disabled:opacity-20 disabled:hover:bg-transparent"
                      >
                        ▼
                      </button>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs text-[#D4AF37] font-bold tracking-wider">{item.year}</span>
                        
                        {/* Visibility Badge Toggle Button */}
                        <button
                          type="button"
                          onClick={() => toggleVisibility(item.id)}
                          title="Click to toggle visibility on public website"
                          className={`text-[9px] font-mono px-2 py-0.5 border rounded-sm uppercase transition-all ${
                            isVisible
                              ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60'
                              : 'border-amber-500/50 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60'
                          }`}
                        >
                          {isVisible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}
                        </button>

                        <span className={`text-[9px] px-2 py-0.5 border rounded-sm uppercase ${
                          item.isVerified
                            ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                            : 'border-amber-500/40 bg-amber-950/30 text-amber-300'
                        }`}>
                          {item.isVerified ? 'VERIFIED' : 'VERIFY REQUIRED'}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white uppercase">{item.role}</h3>
                      <span className="text-[11px] text-[#8C6D4F] block">{item.organization}</span>
                    </div>
                  </div>

                  {/* Actions & Position Selector */}
                  <div className="flex items-center space-x-2 shrink-0 self-end lg:self-auto">
                    <select
                      value={idx}
                      onChange={(e) => handleMoveToPosition(idx, parseInt(e.target.value, 10))}
                      title="Change Timeline Position"
                      className="bg-[#0A0806] border border-[#8C6D4F]/40 text-[#D4AF37] text-xs px-2 py-1.5 rounded-sm outline-none hover:border-[#D4AF37]"
                    >
                      {experience.map((_, posIdx) => (
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
                      onClick={() => handleDeleteItem(item.id)}
                      className="px-3 py-1.5 border border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 font-bold"
                    >
                      DELETE 🗑️
                    </button>
                  </div>
                </div>

                <p className="text-[#A8988B] text-xs font-light">{item.description}</p>

                {(item.technologies || []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[9.5px] border border-[#8C6D4F]/25 bg-[#0A0806] text-[#C4B5A5]">
                        {t}
                      </span>
                    ))}
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

export default AdminExperienceManager;
