import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminResearchManager: React.FC = () => {
  const { research, updateResearch } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');

  // Form State
  const [title, setTitle] = useState(research.title || '');
  const [subtitle, setSubtitle] = useState(research.subtitle || '');
  const [authors, setAuthors] = useState((research.authors || []).join(', '));
  const [role, setRole] = useState(research.role || '');
  const [focus, setFocus] = useState(research.focus || '');
  const [abstract, setAbstract] = useState(research.abstract || '');
  const [methodology, setMethodology] = useState((research.methodology || []).join('\n'));
  const [technologies, setTechnologies] = useState((research.technologies || []).join(', '));
  const [explainabilityApproach, setExplainabilityApproach] = useState(research.explainabilityApproach || '');
  const [status, setStatus] = useState(research.status || '');
  const [paperUrl, setPaperUrl] = useState(research.paperUrl || '');
  const [githubUrl, setGithubUrl] = useState(research.githubUrl || '');
  const [visible, setVisible] = useState(research.visible !== false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const authorsArray = authors
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const methodologyArray = methodology
      .split('\n')
      .map((m) => m.trim())
      .filter(Boolean);

    const techArray = technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    updateResearch({
      title,
      subtitle,
      authors: authorsArray,
      role,
      focus,
      abstract,
      methodology: methodologyArray,
      technologies: techArray,
      explainabilityApproach,
      status,
      paperUrl,
      githubUrl,
      visible,
    });

    setSavedMessage('Research project details updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const toggleVisibility = () => {
    const nextVis = !visible;
    setVisible(nextVis);
    updateResearch({ visible: nextVis });
    setSavedMessage(`Research section visibility set to ${nextVis ? 'VISIBLE 👁' : 'HIDDEN 🙈'}.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl font-sans text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#8C6D4F]/30 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            EXPLAINABLE AI RESEARCH PAPER MANAGER
          </span>
          <h1
            className="text-4xl uppercase tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            RESEARCH MANAGER
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Modify research title, abstract, methodology, authors, URLs, status, and public visibility.
          </p>
        </div>

        {/* Public Visibility Badge Button */}
        <button
          type="button"
          onClick={toggleVisibility}
          className={`px-4 py-2 border rounded-sm font-mono text-xs uppercase flex items-center space-x-2 self-start sm:self-auto transition-colors ${
            visible
              ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60'
              : 'border-amber-500/50 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60'
          }`}
        >
          <span>PUBLIC SECTION VISIBILITY:</span>
          <span className="font-bold">{visible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}</span>
        </button>
      </div>

      {savedMessage && (
        <div className="p-4 border border-emerald-500/50 bg-emerald-950/30 text-emerald-300 text-xs font-mono rounded-sm flex items-center justify-between animate-fadeIn">
          <span>✓ {savedMessage}</span>
          <button onClick={() => setSavedMessage('')} className="text-emerald-400 font-bold hover:underline">
            DISMISS
          </button>
        </div>
      )}

      {/* Edit Form */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-6">
        <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
          EDIT RESEARCH PROJECT DISPATCH
        </h2>

        <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                RESEARCH TITLE *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="AI-HealthGuard"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                SUBTITLE / FULL TITLE *
              </label>
              <input
                type="text"
                required
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="An Explainable AI-Based Ischemic Heart Disease Risk Prediction..."
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                CO-AUTHORS (Comma-separated) *
              </label>
              <input
                type="text"
                required
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                placeholder="Tarun Kumar, Sakshi Rajput, Prashant Prajapati"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                AUTHOR ROLE *
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Lead Co-Author & ML Implementation Engineer"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                RESEARCH FOCUS AREA *
              </label>
              <input
                type="text"
                required
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                placeholder="Explainable Machine Learning (XAI)"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              ABSTRACT *
            </label>
            <textarea
              required
              rows={3}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Full abstract text..."
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              METHODOLOGY BULLETS (One bullet per line)
            </label>
            <textarea
              rows={3}
              value={methodology}
              onChange={(e) => setMethodology(e.target.value)}
              placeholder="Preprocessing clinical tabular datasets&#10;Evaluating Random Forest, XGBoost, Logistic Regression&#10;Applying SHAP feature explainability"
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              EXPLAINABILITY APPROACH (SHAP / LIME Details)
            </label>
            <textarea
              rows={2}
              value={explainabilityApproach}
              onChange={(e) => setExplainabilityApproach(e.target.value)}
              placeholder="Utilizes SHAP breakdown plots to display exact feature contributions..."
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                TECHNOLOGIES / LIBRARIES
              </label>
              <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="Python, Scikit-learn, SHAP, Pandas, Streamlit"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                PUBLICATION STATUS METADATA *
              </label>
              <input
                type="text"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="[RESEARCH MANUSCRIPT IN PREPARATION]"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                PAPER / REPOSITORY URL
              </label>
              <input
                type="url"
                value={paperUrl || githubUrl}
                onChange={(e) => {
                  setPaperUrl(e.target.value);
                  setGithubUrl(e.target.value);
                }}
                placeholder="https://github.com/heytarunkumar/ai-healthguard-research"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center space-x-3">
            <button
              type="submit"
              className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
            >
              SAVE RESEARCH DETAILS ↗
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default AdminResearchManager;
