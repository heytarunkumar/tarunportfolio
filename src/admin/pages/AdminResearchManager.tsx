import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { ResearchProject } from '../../data/research';

export const AdminResearchManager: React.FC = () => {
  const { researchList, updateResearchList } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [focus, setFocus] = useState<'Explainable AI (XAI)' | 'Clinical Healthcare ML' | 'Tabular Deep Learning' | 'Predictive Modeling' | 'Feature Attribution' | 'Applied Machine Learning'>('Explainable AI (XAI)');
  const [authors, setAuthors] = useState('Tarun Kumar, Sakshi Rajput, Prashant Prajapati');
  const [role, setRole] = useState('Lead Co-Author & ML Implementation Engineer');
  const [status, setStatus] = useState<'Research Manuscript in Preparation' | 'Preprint Available' | 'Conference Accepted' | 'Under Peer Review' | 'Technical Working Paper'>('Research Manuscript in Preparation');
  const [date, setDate] = useState('AUG 2026');
  const [abstract, setAbstract] = useState('');
  const [explainabilityApproach, setExplainabilityApproach] = useState('');
  const [technologies, setTechnologies] = useState('Python, Scikit-learn, SHAP, Pandas, Streamlit');
  const [paperUrl, setPaperUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [visible, setVisible] = useState(true);

  const startEdit = (project: ResearchProject) => {
    setEditingId(project.id || 'res-1');
    setTitle(project.title);
    setSubtitle(project.subtitle || '');
    setFocus((project.focus as any) || 'Explainable AI (XAI)');
    setAuthors((project.authors || []).join(', '));
    setRole(project.role || 'Lead Co-Author & ML Implementation Engineer');
    setStatus((project.status as any) || 'Research Manuscript in Preparation');
    setDate(project.date || 'AUG 2026');
    setAbstract(project.abstract || '');
    setExplainabilityApproach(project.explainabilityApproach || '');
    setTechnologies((project.technologies || []).join(', '));
    setPaperUrl(project.paperUrl || '');
    setGithubUrl(project.githubUrl || '');
    setVisible(project.visible !== false);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSubtitle('');
    setFocus('Explainable AI (XAI)');
    setAuthors('Tarun Kumar, Sakshi Rajput, Prashant Prajapati');
    setRole('Lead Co-Author & ML Implementation Engineer');
    setStatus('Research Manuscript in Preparation');
    setDate('AUG 2026');
    setAbstract('');
    setExplainabilityApproach('');
    setTechnologies('Python, Scikit-learn, SHAP, Pandas, Streamlit');
    setPaperUrl('');
    setGithubUrl('');
    setVisible(true);
  };

  const handleSaveResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const authorList = authors
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const techList = technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const nextList = [...(researchList || [])];

    if (editingId) {
      const idx = nextList.findIndex((r) => r.id === editingId);
      if (idx !== -1) {
        nextList[idx] = {
          ...nextList[idx],
          title,
          subtitle,
          focus,
          authors: authorList,
          role,
          status,
          date,
          abstract,
          explainabilityApproach,
          technologies: techList,
          paperUrl: paperUrl || undefined,
          githubUrl: githubUrl || paperUrl || undefined,
          visible,
        };
      }
      setSavedMessage(`Research paper "${title}" updated successfully.`);
    } else {
      const newId = `res-${Date.now()}`;
      nextList.push({
        id: newId,
        title,
        subtitle,
        focus,
        authors: authorList,
        role,
        status,
        date,
        abstract,
        explainabilityApproach,
        technologies: techList,
        methodology: [
          'Preprocessed clinical tabular attributes and trained ensemble classification models.',
          'Integrated SHAP explainability pipelines to evaluate feature contributions and model transparency.',
          'Constructed risk factor ranking and actionable counterfactual prevention recommendations.'
        ],
        paperUrl: paperUrl || undefined,
        githubUrl: githubUrl || paperUrl || undefined,
        visible,
      });
      setSavedMessage(`Added "${title}" to Academic Research catalog.`);
    }

    updateResearchList(nextList);
    resetForm();
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleDeleteResearch = (id: string) => {
    const target = (researchList || []).find((r) => r.id === id);
    if (!target) return;
    if (confirm(`Delete research paper "${target.title}"?`)) {
      const nextList = (researchList || []).filter((r) => r.id !== id);
      updateResearchList(nextList);
      if (editingId === id) resetForm();
      setSavedMessage(`Deleted research paper "${target.title}".`);
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  const toggleVisibility = (idToToggle: string) => {
    const nextList = (researchList || []).map((r) =>
      r.id === idToToggle ? { ...r, visible: r.visible === false ? true : false } : r
    );
    updateResearchList(nextList);
    const target = (researchList || []).find((r) => r.id === idToToggle);
    const isNowVisible = target?.visible === false;
    setSavedMessage(`Research paper "${target?.title}" set to ${isNowVisible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const next = [...(researchList || [])];
    const temp = next[index];
    next[index] = next[index - 1];
    next[index - 1] = temp;
    updateResearchList(next);
    setSavedMessage('Research sequence order updated.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveDown = (index: number) => {
    if (index >= (researchList || []).length - 1) return;
    const next = [...(researchList || [])];
    const temp = next[index];
    next[index] = next[index + 1];
    next[index + 1] = temp;
    updateResearchList(next);
    setSavedMessage('Research sequence order updated.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveToPosition = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= (researchList || []).length || fromIndex === toIndex) return;
    const next = [...(researchList || [])];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    updateResearchList(next);
    setSavedMessage(`Moved research paper to Position #${String(toIndex + 1).padStart(2, '0')}.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const activeCount = (researchList || []).filter((r) => r.visible !== false).length;

  return (
    <div className="space-y-8 max-w-6xl font-sans text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#26211B] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            ACADEMIC RESEARCH &amp; SCIENTIFIC PUBLICATIONS
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
            Research &amp; Publications Manager
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Register, edit, delete, reorder, and manage academic manuscripts, explainability research papers, and technical preprints.
          </p>
        </div>
        <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 border border-[#D4AF37]/30 bg-[#1A1612] rounded-full self-start sm:self-auto shadow-sm">
          {(researchList || []).length} PAPERS CATALOGED · {activeCount} ACTIVE ON WEBSITE
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

      {/* Add / Edit Research Form */}
      <div className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift">
        <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
          {editingId ? `Edit Academic Research Publication` : 'Register New Academic Research Paper / Publication'}
        </h2>

        <form onSubmit={handleSaveResearch} className="space-y-5 font-sans text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                RESEARCH PAPER TITLE *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. AI-HealthGuard: Explainable Cardiac Risk Prediction"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-sans text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                SUBTITLE / CORE HYPOTHESIS *
              </label>
              <input
                type="text"
                required
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="An Explainable AI-Based Risk Stratification System"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-sans text-sm transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                RESEARCH DOMAIN / CATEGORY *
              </label>
              <select
                value={focus}
                onChange={(e) => setFocus(e.target.value as any)}
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none transition-all font-mono"
              >
                <option value="Explainable AI (XAI)">Explainable AI (XAI)</option>
                <option value="Clinical Healthcare ML">Clinical Healthcare ML</option>
                <option value="Tabular Deep Learning">Tabular Deep Learning</option>
                <option value="Predictive Modeling">Predictive Modeling</option>
                <option value="Feature Attribution">Feature Attribution</option>
                <option value="Applied Machine Learning">Applied Machine Learning</option>
              </select>
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                STATUS / PUBLICATION VENUE *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none transition-all font-mono"
              >
                <option value="Research Manuscript in Preparation">Research Manuscript in Preparation</option>
                <option value="Preprint Available">Preprint Available</option>
                <option value="Conference Accepted">Conference Accepted</option>
                <option value="Under Peer Review">Under Peer Review</option>
                <option value="Technical Working Paper">Technical Working Paper</option>
              </select>
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                DATE / TIMELINE
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="AUG 2026"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                SECTION VISIBILITY
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                AUTHORS (Comma-separated) *
              </label>
              <input
                type="text"
                required
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                placeholder="Tarun Kumar, Sakshi Rajput, Prashant Prajapati"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-sans transition-all"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                AUTHOR ROLE / CONTRIBUTION
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Lead Co-Author & ML Implementation Engineer"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-sans transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              RESEARCH ABSTRACT &amp; PROBLEM STATEMENT *
            </label>
            <textarea
              required
              rows={3}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Describe the clinical/theoretical research problem, methodology, and key explainable conclusions..."
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none resize-none leading-relaxed transition-all font-sans"
            />
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              EXPLAINABILITY APPROACH &amp; INTERPRETABILITY DETAILS
            </label>
            <textarea
              rows={2}
              value={explainabilityApproach}
              onChange={(e) => setExplainabilityApproach(e.target.value)}
              placeholder="e.g. Utilizes SHAP TreeExplainer to generate exact feature attribution plots for individual clinical risk scores..."
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none resize-none leading-relaxed transition-all font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                PAPER PDF / MANUSCRIPT URL
              </label>
              <input
                type="url"
                value={paperUrl}
                onChange={(e) => setPaperUrl(e.target.value)}
                placeholder="https://arxiv.org/abs/... or https://github.com/..."
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                TECHNOLOGIES &amp; PACKAGES (Comma-separated)
              </label>
              <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="Python, Scikit-learn, SHAP, Pandas, Streamlit, Matplotlib"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
            >
              {editingId ? 'Save Research Paper ↗' : 'Register Research Paper ↗'}
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

      {/* Cataloged Research Publications List */}
      <div className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#26211B] pb-3 gap-2">
          <h2 className="text-base text-white font-mono uppercase tracking-wider font-semibold">
            Registered Academic Papers &amp; Manuscripts ({(researchList || []).length})
          </h2>
          <span className="text-xs text-[#8C6D4F] font-mono">
            Use ▲ / ▼ or Position Selectors to reorder research sequence
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(researchList || []).map((project, idx) => {
            const isVisible = project.visible !== false;

            return (
              <div
                key={project.id || idx}
                className={`p-5 border rounded-xl space-y-4 transition-all card-lift ${
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
                      title="Move Paper Up"
                      className="p-1 text-[#D4AF37] hover:bg-[#26211B] rounded disabled:opacity-20 transition-colors"
                    >
                      ▲
                    </button>
                    <span className="text-[10px] font-mono font-bold text-[#F7E7C4]">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      disabled={idx === (researchList || []).length - 1}
                      onClick={() => handleMoveDown(idx)}
                      title="Move Paper Down"
                      className="p-1 text-[#D4AF37] hover:bg-[#26211B] rounded disabled:opacity-20 transition-colors"
                    >
                      ▼
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#D4AF37]/40 bg-[#1A1612] text-[#D4AF37] uppercase font-semibold">
                        {project.focus || 'Explainable AI'}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-950/20 text-amber-300 uppercase">
                        {project.status}
                      </span>
                      
                      {/* Visibility Toggle Button */}
                      <button
                        type="button"
                        onClick={() => toggleVisibility(project.id || 'res-1')}
                        title="Toggle Section Visibility"
                        className={`text-[9px] font-mono px-2 py-0.5 border rounded-full uppercase ml-auto shrink-0 transition-all ${
                          isVisible
                            ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                            : 'border-amber-500/40 bg-amber-950/40 text-amber-300'
                        }`}
                      >
                        {isVisible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}
                      </button>
                    </div>

                    <h3 className="text-white font-serif font-bold text-lg leading-snug line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#A8988B] line-clamp-1 font-sans mt-0.5">
                      {project.subtitle}
                    </p>
                    <p className="text-[11px] text-[#D4AF37] font-mono mt-1 truncate">
                      Authors: {(project.authors || []).join(' · ')}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#8C6D4F] line-clamp-2 leading-relaxed font-sans">
                  {project.abstract}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(project.technologies || []).slice(0, 5).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[9.5px] font-mono px-2 py-0.5 rounded-md border border-[#26211B] bg-[#12100E] text-[#C4B5A5]"
                    >
                      {tech}
                    </span>
                  ))}
                  {(project.technologies || []).length > 5 && (
                    <span className="text-[9.5px] font-mono text-[#8C6D4F]">
                      +{(project.technologies || []).length - 5}
                    </span>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#26211B]">
                  {project.paperUrl || project.githubUrl ? (
                    <a
                      href={project.paperUrl || project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-[#D4AF37] hover:underline flex items-center gap-1"
                    >
                      VIEW PAPER ↗
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-[#8C6D4F]">MANUSCRIPT IN PREP</span>
                  )}

                  <div className="flex items-center space-x-2">
                    <select
                      value={idx}
                      onChange={(e) => handleMoveToPosition(idx, parseInt(e.target.value, 10))}
                      title="Change Position"
                      className="bg-[#171411] border border-[#26211B] text-[#D4AF37] text-[10px] font-mono px-2 py-1 rounded-lg outline-none hover:border-[#D4AF37]/40 transition-colors"
                    >
                      {(researchList || []).map((_, posIdx) => (
                        <option key={posIdx} value={posIdx}>
                          Pos #{String(posIdx + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => startEdit(project)}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-lg border border-[#D4AF37]/30 bg-[#1A1612] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                    >
                      EDIT ✏️
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteResearch(project.id || 'res-1')}
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

export default AdminResearchManager;
