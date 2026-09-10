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
  const [visible, setVisible] = useState<boolean>(true);

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
    setVisible(proj.visible !== false);
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
    setVisible(true);
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
      visible,
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

  const toggleVisibility = (slugToToggle: string) => {
    const updated = projects.map((p) =>
      p.slug === slugToToggle ? { ...p, visible: p.visible === false ? true : false } : p
    );
    updateProjectsOrder(updated);
    const targetProject = projects.find((p) => p.slug === slugToToggle);
    const isNowVisible = targetProject?.visible === false;
    setSavedMessage(`Project "${targetProject?.title || slugToToggle}" visibility set to ${isNowVisible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}.`);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#26211B] pb-5 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Projects Catalog Manager
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Add, edit, delete, reorder, and toggle visibility for portfolio projects.
          </p>
        </div>
        <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 border border-[#26211B] bg-[#12100E] rounded-full self-start sm:self-auto">
          {projects.length} TOTAL / {projects.filter((p) => p.visible !== false).length} VISIBLE ON SITE
        </span>
      </div>

      {savedMessage && (
        <div className="p-4 border border-emerald-500/40 bg-emerald-950/20 text-emerald-300 text-xs font-mono rounded-xl flex items-center justify-between animate-fadeIn">
          <span>✓ {savedMessage}</span>
          <button onClick={() => setSavedMessage('')} className="text-emerald-400 font-bold hover:underline cursor-pointer">
            DISMISS
          </button>
        </div>
      )}

      {/* Edit / Create Form */}
      <div className="card-lift bg-[#12100E] border border-[#26211B] p-6 sm:p-7 rounded-2xl space-y-6">
        <h2 className="text-xs font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 font-bold">
          {editingSlug ? `EDIT PROJECT: ${editingSlug}` : 'CREATE NEW PROJECT DISPATCH'}
        </h2>

        <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1.5 text-[10px]">
                // PROJECT TITLE *
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
                placeholder="e.g. Automated API Gateway & Microservices"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1.5 text-[10px]">
                // URL SLUG *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="api-gateway-microservices"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1.5 text-[10px]">
                // CATEGORY *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
              >
                <option value="Python / Backend">Python / Backend</option>
                <option value="DevOps">DevOps</option>
                <option value="Cloud">Cloud</option>
                <option value="AI / ML">AI / ML</option>
              </select>
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1.5 text-[10px]">
                // EXECUTION STATUS *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
              >
                <option value="completed">Completed (Production)</option>
                <option value="building">Building (Active)</option>
                <option value="learning">Learning (Lab)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1.5 text-[10px]">
                // PUBLIC VISIBILITY
              </label>
              <div
                onClick={() => setVisible(!visible)}
                className={`p-3 border rounded-xl cursor-pointer flex items-center justify-between font-mono select-none transition-colors ${
                  visible
                    ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                    : 'border-amber-500/40 bg-amber-950/20 text-amber-300'
                }`}
              >
                <span>{visible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}</span>
                <span className="text-[10px] uppercase font-bold">
                  {visible ? '[ PUBLIC ]' : '[ DRAFT ]'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1.5 text-[10px]">
              // SHORT DESCRIPTION *
            </label>
            <textarea
              required
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="High-level architectural summary of what this project executes..."
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1.5 text-[10px]">
                // PROBLEM STATEMENT
              </label>
              <textarea
                rows={2}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1.5 text-[10px]">
                // ENGINEERING SOLUTION
              </label>
              <textarea
                rows={2}
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1.5 text-[10px]">
                // TECHNOLOGIES (Comma-separated)
              </label>
              <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="Python, Flask, Docker, Redis"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1.5 text-[10px]">
                // GITHUB REPO URL
              </label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/haytarunkumar/..."
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
            >
              {editingSlug ? 'UPDATE PROJECT ↗' : 'SAVE PROJECT ↗'}
            </button>
            {editingSlug && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-3 rounded-xl border border-[#26211B] bg-[#0A0908] text-[#C4BCB3] uppercase tracking-wider hover:text-white cursor-pointer"
              >
                CANCEL EDIT
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Existing Projects List with Ordering & Visibility Controls */}
      <div className="card-lift bg-[#12100E] border border-[#26211B] p-6 sm:p-7 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#26211B] pb-3 gap-2">
          <h2 className="text-base font-serif font-bold text-white tracking-wide">
            Cataloged Projects &amp; Sequence ({projects.length})
          </h2>
          <span className="text-xs font-mono text-[#8C6D4F]">
            Use VISIBLE 👁 / HIDDEN 🙈 buttons or arrows to configure display
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {projects.map((proj, idx) => {
            const isVisible = proj.visible !== false;
            const isEditing = editingSlug === proj.slug;

            return (
              <div
                key={proj.slug || idx}
                className={`p-4 rounded-xl border transition-all ${
                  isEditing
                    ? 'border-[#D4AF37] bg-[#1A1714]'
                    : isVisible
                    ? 'bg-[#0A0908] border-[#26211B] hover:border-[#D4AF37]/40'
                    : 'bg-[#0A0908]/50 border-dashed border-[#26211B] opacity-75'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Identity & Position Controls */}
                  <div className="flex items-start space-x-3">
                    <div className="flex flex-col items-center space-y-1 bg-[#12100E] p-2 border border-[#26211B] rounded-xl shrink-0">
                      <span className="text-[10px] text-[#D4AF37] font-bold">#{String(idx + 1).padStart(2, '0')}</span>
                      <div className="flex space-x-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveUp(idx)}
                          className="px-1 py-0.5 text-[9px] bg-[#0A0908] border border-[#26211B] text-[#C4BCB3] hover:text-[#D4AF37] disabled:opacity-30 rounded"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          disabled={idx === projects.length - 1}
                          onClick={() => handleMoveDown(idx)}
                          className="px-1 py-0.5 text-[9px] bg-[#0A0908] border border-[#26211B] text-[#C4BCB3] hover:text-[#D4AF37] disabled:opacity-30 rounded"
                        >
                          ▼
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-sans font-bold text-sm">{proj.title}</span>
                        <span className="text-[10px] text-[#8C6D4F] border border-[#26211B] px-1.5 py-0.2 rounded-md">
                          {proj.category}
                        </span>
                      </div>
                      <div className="text-[10.5px] text-[#A8988B] line-clamp-1 font-sans font-light">
                        {proj.description}
                      </div>
                      <div className="text-[10px] text-[#8C6D4F] mt-1">
                        slug: <span className="text-[#D4AF37]">{proj.slug}</span> | stack: {proj.technologies.slice(0, 3).join(', ')}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions Toolbar */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <select
                      value={idx}
                      onChange={(e) => handleMoveToPosition(idx, parseInt(e.target.value, 10))}
                      className="bg-[#12100E] border border-[#26211B] text-[#D4AF37] text-xs px-2.5 py-1.5 rounded-xl outline-none"
                    >
                      {projects.map((_, pIdx) => (
                        <option key={pIdx} value={pIdx}>Pos #{String(pIdx + 1).padStart(2, '0')}</option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => toggleVisibility(proj.slug)}
                      className={`px-3 py-1.5 border rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                        isVisible
                          ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                          : 'border-amber-500/40 bg-amber-950/20 text-amber-300'
                      }`}
                    >
                      {isVisible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}
                    </button>

                    <button
                      type="button"
                      onClick={() => startEdit(proj)}
                      className="px-3 py-1.5 border border-[#26211B] bg-[#12100E] text-[#D4AF37] hover:border-[#D4AF37] rounded-xl cursor-pointer"
                    >
                      EDIT
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete project "${proj.title}" permanently?`)) {
                          deleteProject(proj.slug);
                          setSavedMessage(`Project "${proj.title}" deleted.`);
                          setTimeout(() => setSavedMessage(''), 3000);
                        }
                      }}
                      className="px-3 py-1.5 border border-red-500/30 bg-red-950/20 text-red-400 hover:border-red-500 rounded-xl cursor-pointer"
                    >
                      DELETE
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

export default AdminProjectManager;
