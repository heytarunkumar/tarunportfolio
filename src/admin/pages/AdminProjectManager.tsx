import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Project } from '../../data/projects';

export const AdminProjectManager: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
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
      number: String(projects.length + 1).padStart(2, '0'),
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      description,
      problem,
      solution,
      technologies: techArray,
      architectureMetrics: [
        { label: 'STATUS', value: status.toUpperCase() },
        { label: 'CATEGORY', value: category.toUpperCase() },
      ],
      github,
      featured: true,
      status,
    };

    if (editingSlug) {
      updateProject(editingSlug, projectData);
      setSavedMessage('Project updated successfully!');
    } else {
      addProject(projectData);
      setSavedMessage('Project added to catalog!');
    }

    resetForm();
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl font-sans">
      
      {/* Header */}
      <div className="border-b border-[#8C6D4F]/30 pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            PROJECT CATALOG &amp; SYSTEM ARCHITECTURE MANAGER
          </span>
          <h1
            className="text-4xl uppercase tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            PROJECT MANAGER
          </h1>
        </div>
        <button
          onClick={resetForm}
          className="px-4 py-2 border border-[#D4AF37] bg-[#D4AF37] text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#E2C054]"
        >
          + NEW PROJECT
        </button>
      </div>

      {savedMessage && (
        <div className="p-3 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono rounded-sm">
          {savedMessage}
        </div>
      )}

      {/* Project Form Editor */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
        <h2 className="text-lg font-mono text-white tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
          {editingSlug ? `EDITING: ${title}` : 'ADD NEW PROJECT TO CATALOG'}
        </h2>

        <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1">
                PROJECT TITLE
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1">
                SLUG / URL IDENTIFIER
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. python-api-gateway"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1">
                CATEGORY
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
                STATUS
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              >
                <option value="completed">Completed</option>
                <option value="building">Building</option>
                <option value="learning">Learning</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase tracking-wider mb-1">
              DESCRIPTION
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
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

      {/* Existing Projects List */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
        <h2 className="text-lg font-mono text-white tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
          CATALOGED PROJECTS ({projects.length})
        </h2>

        <div className="space-y-3 font-mono text-xs">
          {projects.map((proj) => (
            <div
              key={proj.slug}
              className="p-4 bg-[#120F0C] border border-[#8C6D4F]/20 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-[#D4AF37] font-bold">#{proj.number}</span>
                  <span className="text-white font-bold tracking-wider">{proj.title}</span>
                  <span className="text-[9px] px-2 py-0.5 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 rounded-sm uppercase">
                    {proj.status}
                  </span>
                </div>
                <span className="text-[10.5px] text-[#8C6D4F] block">
                  Category: {proj.category} · Tech: {proj.technologies.join(', ')}
                </span>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
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
