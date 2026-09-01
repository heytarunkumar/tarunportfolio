import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Project } from '../../data/projects';

export const AdminProjectManager: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject, updateProjectsOrder } = usePortfolio();
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<'Python / Backend' | 'Cloud' | 'DevOps' | 'AI / ML'>('Python / Backend');
  const [description, setDescription] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [github, setGithub] = useState('');
  const [status, setStatus] = useState<'completed' | 'building' | 'learning'>('completed');

  const startEdit = (proj: Project) => {
    setEditingSlug(proj.slug);
    setTitle(proj.title);
    setSlug(proj.slug);
    setCategory(proj.category);
    setDescription(proj.description);
    setProblem(proj.problem);
    setSolution(proj.solution);
    setTechnologies(proj.technologies.join(', '));
    setGithub(proj.github || '');
    setStatus(proj.status);
  };

  const resetForm = () => {
    setEditingSlug(null);
    setTitle('');
    setSlug('');
    setCategory('Python / Backend');
    setDescription('');
    setProblem('');
    setSolution('');
    setTechnologies('');
    setGithub('');
    setStatus('completed');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = technologies.split(',').map((t) => t.trim()).filter(Boolean);

    const projectData: Project = {
      number: editingSlug ? (projects.find(p => p.slug === editingSlug)?.number || '01') : String(projects.length + 1).padStart(2, '0'),
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      description,
      problem,
      solution,
      technologies: techArray,
      architectureMetrics: [
        { label: 'STATUS', value: status.toUpperCase() },
        { label: 'CATEGORY', value: category },
        { label: 'STACK', value: techArray[0] || 'Python' },
      ],
      github: github || undefined,
      featured: true,
      status,
    };

    if (editingSlug) {
      updateProject(editingSlug, projectData);
      setSavedMessage(`Project "${title}" updated successfully.`);
    } else {
      addProject(projectData);
      setSavedMessage(`Project "${title}" added successfully to portfolio catalog.`);
    }

    resetForm();
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const nextProjects = [...projects];
    const temp = nextProjects[index];
    nextProjects[index] = nextProjects[index - 1];
    nextProjects[index - 1] = temp;
    updateProjectsOrder(nextProjects);
    setSavedMessage('Project order updated and re-serialized.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveDown = (index: number) => {
    if (index >= projects.length - 1) return;
    const nextProjects = [...projects];
    const temp = nextProjects[index];
    nextProjects[index] = nextProjects[index + 1];
    nextProjects[index + 1] = temp;
    updateProjectsOrder(nextProjects);
    setSavedMessage('Project order updated and re-serialized.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveToPosition = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= projects.length || fromIndex === toIndex) return;
    const nextProjects = [...projects];
    const [moved] = nextProjects.splice(fromIndex, 1);
    nextProjects.splice(toIndex, 0, moved);
    updateProjectsOrder(nextProjects);
    setSavedMessage(`Project moved to Position #${String(toIndex + 1).padStart(2, '0')}. Serialized.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 font-sans text-[#E8DFD8]">
      
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#8C6D4F]/30 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-wider text-white font-mono">
            PROJECT CATALOG &amp; SERIALIZATION MANAGER
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Add, edit, delete, and reorder/serialize featured portfolio projects. Order changes reflect instantly on the public website.
          </p>
        </div>
        <span className="text-xs font-mono text-[#D4AF37] px-3 py-1 border border-[#D4AF37]/40 bg-[#1E1914] rounded-sm self-start sm:self-auto">
          {projects.length} PROJECTS CATALOGED
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

      {/* Edit / Create Form */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-6">
        <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
          {editingSlug ? `EDIT PROJECT: ${editingSlug}` : 'CREATE NEW PROJECT DISPATCH'}
        </h2>

        <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1">
                PROJECT TITLE *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!editingSlug) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }
                }}
                placeholder="e.g. Automated API Gateway & Microservices Dispatcher"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1">
                URL SLUG *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="api-gateway-microservices"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1">
                CATEGORY *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              >
                <option value="Python / Backend">Python / Backend</option>
                <option value="DevOps">DevOps</option>
                <option value="Cloud">Cloud</option>
                <option value="AI / ML">AI / ML</option>
              </select>
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1">
                EXECUTION STATUS *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              >
                <option value="completed">Completed (Production)</option>
                <option value="building">Building (Active)</option>
                <option value="learning">Learning (Lab)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1">
              SHORT DESCRIPTION / SUMMARY *
            </label>
            <textarea
              required
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="High-level architectural summary of what this project executes..."
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1">
                PROBLEM STATEMENT
              </label>
              <textarea
                rows={2}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1">
                ENGINEERING SOLUTION
              </label>
              <textarea
                rows={2}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1">
                TECHNOLOGIES (Comma-separated)
              </label>
              <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="Python, Flask, Docker, Redis"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1">
                GITHUB CODE REPOSITORY URL
              </label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/heytarunkumar/..."
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="submit"
              className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
            >
              {editingSlug ? 'UPDATE PROJECT ↗' : 'SAVE PROJECT ↗'}
            </button>
            {editingSlug && (
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

      {/* Existing Projects List with Ordering & Serialization Controls */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#8C6D4F]/20 pb-3 gap-2">
          <h2 className="text-lg font-mono text-white tracking-wider uppercase">
            CATALOGED PROJECTS &amp; SERIAL SEQUENCE ({projects.length})
          </h2>
          <span className="text-xs font-mono text-[#8C6D4F]">
            Use ↑ / ↓ or Position Selectors to reorder display sequence
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {projects.map((proj, idx) => (
            <div
              key={proj.slug || idx}
              className="p-4 bg-[#120F0C] border border-[#8C6D4F]/20 rounded-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 group hover:border-[#D4AF37]/50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                
                {/* Serial Order Controls (Up / Down / Position) */}
                <div className="flex flex-col items-center space-y-1 bg-[#0A0806] p-2 border border-[#8C6D4F]/30 rounded-sm shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMoveUp(idx)}
                    title="Move Project Up"
                    className="p-1 text-[#D4AF37] hover:bg-[#1E1914] disabled:opacity-20 disabled:hover:bg-transparent"
                  >
                    ▲
                  </button>
                  <span className="text-[11px] font-bold text-[#F7E7C4]">
                    #{proj.number || String(idx + 1).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    disabled={idx === projects.length - 1}
                    onClick={() => handleMoveDown(idx)}
                    title="Move Project Down"
                    className="p-1 text-[#D4AF37] hover:bg-[#1E1914] disabled:opacity-20 disabled:hover:bg-transparent"
                  >
                    ▼
                  </button>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-white font-bold tracking-wider text-sm">{proj.title}</span>
                    <span className="text-[9px] px-2 py-0.5 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 rounded-sm uppercase">
                      {proj.status}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 border border-[#8C6D4F]/40 bg-[#16120E] text-[#D4AF37] rounded-sm uppercase">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A8988B] line-clamp-1 mb-1">
                    {proj.description}
                  </p>
                  <span className="text-[10px] text-[#8C6D4F] block">
                    Tech: {(proj.technologies || []).join(', ')}
                  </span>
                </div>

              </div>

              {/* Action Controls & Position Selector */}
              <div className="flex items-center space-x-2 shrink-0 self-end lg:self-auto">
                <select
                  value={idx}
                  onChange={(e) => handleMoveToPosition(idx, parseInt(e.target.value, 10))}
                  title="Change Serial Position"
                  className="bg-[#0A0806] border border-[#8C6D4F]/40 text-[#D4AF37] text-xs px-2 py-1.5 rounded-sm outline-none hover:border-[#D4AF37]"
                >
                  {projects.map((_, posIdx) => (
                    <option key={posIdx} value={posIdx}>
                      Position #{String(posIdx + 1).padStart(2, '0')}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => startEdit(proj)}
                  className="px-3 py-1.5 border border-[#8C6D4F]/40 bg-[#1A140F] text-[#D4AF37] hover:border-[#D4AF37]"
                >
                  EDIT
                </button>
                <button
                  type="button"
                  onClick={() => deleteProject(proj.slug)}
                  className="px-3 py-1.5 border border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-950/40"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminProjectManager;
