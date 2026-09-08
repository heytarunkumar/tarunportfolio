import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminResearchManager: React.FC = () => {
  const { research, updateResearch } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');

  // Form State
  const [title, setTitle] = useState(research?.title || 'AI-HealthGuard');
  const [subtitle, setSubtitle] = useState(research?.subtitle || 'An Explainable AI-Based Ischemic Heart Disease Risk Prediction and Prevention System');
  const [authors, setAuthors] = useState((research?.authors || ['Sakshi Rajput', 'Prashant Prajapati', 'Tarun Kumar']).join(', '));
  const [abstract, setAbstract] = useState(research?.abstract || '');
  const [methodology, setMethodology] = useState((research?.methodology || []).join('\n'));
  const [technologies, setTechnologies] = useState((research?.technologies || []).join(', '));
  const [status, setStatus] = useState(research?.status || 'Research Project & Manuscript');
  const [explainabilityApproach, setExplainabilityApproach] = useState(research?.explainabilityApproach || '');
  const [focus, setFocus] = useState(research?.focus || 'Explainable Healthcare Predictive Analytics & Machine Learning');
  const [paperUrl, setPaperUrl] = useState(research?.paperUrl || '');
  const [githubUrl, setGithubUrl] = useState(research?.githubUrl || '');
  const [visible, setVisible] = useState(research?.visible !== false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const authorsArray = authors.split(',').map((a) => a.trim()).filter(Boolean);
    const methodologyArray = methodology.split('\n').map((m) => m.trim()).filter(Boolean);
    const techArray = technologies.split(',').map((t) => t.trim()).filter(Boolean);

    updateResearch({
      title,
      subtitle,
      authors: authorsArray,
      abstract,
      methodology: methodologyArray,
      technologies: techArray,
      status,
      explainabilityApproach,
      focus,
      paperUrl: paperUrl || githubUrl || undefined,
      githubUrl: githubUrl || paperUrl || undefined,
      visible,
    });

    setSavedMessage('Research metadata and XAI parameters saved successfully.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const toggleVisibility = () => {
    const nextVis = !visible;
    setVisible(nextVis);
    updateResearch({ visible: nextVis });
    setSavedMessage(`Research section set to ${nextVis ? 'VISIBLE 👁' : 'HIDDEN 🙈'}.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl font-sans text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#26211B] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            EXPLAINABLE AI RESEARCH PAPER MANAGER
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Research Manager
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Modify research title, abstract, methodology, authors, URLs, status, and public visibility.
          </p>
        </div>

        {/* Public Visibility Badge Button */}
        <button
          type="button"
          onClick={toggleVisibility}
          className={`px-4 py-2 border rounded-full font-mono text-xs uppercase flex items-center space-x-2 self-start sm:self-auto transition-colors cursor-pointer ${
            visible
              ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
              : 'border-amber-500/40 bg-amber-950/20 text-amber-300'
          }`}
        >
          <span>PUBLIC SECTION VISIBILITY:</span>
          <span className="font-bold">{visible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}</span>
        </button>
      </div>

      {savedMessage && (
        <div className="p-4 border border-emerald-500/40 bg-emerald-950/20 text-emerald-300 text-xs font-mono rounded-xl flex items-center justify-between animate-fadeIn">
          <span>✓ {savedMessage}</span>
          <button onClick={() => setSavedMessage('')} className="text-emerald-400 font-bold hover:underline cursor-pointer">
            DISMISS
          </button>
        </div>
      )}

      {/* Edit Form */}
      <div className="card-lift bg-[#12100E] border border-[#26211B] p-6 sm:p-7 rounded-2xl space-y-6">
        <h2 className="text-xs font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 font-bold">
          EDIT RESEARCH PROJECT DISPATCH
        </h2>

        <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1.5 text-[10px]">
                // SHORT PROJECT NAME *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="AI-HealthGuard"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1.5 text-[10px]">
                // DOMAIN / FOCUS AREA *
              </label>
              <input
                type="text"
                required
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                placeholder="Explainable Healthcare Predictive Analytics"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1.5 text-[10px]">
              // FULL RESEARCH TITLE / SUBTITLE *
            </label>
            <input
              type="text"
              required
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="An Explainable AI-Based Ischemic Heart Disease Risk Prediction and Prevention System"
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
            />
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1.5 text-[10px]">
              // CO-AUTHORS / RESEARCH COLLABORATORS (Comma-separated)
            </label>
            <input
              type="text"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              placeholder="Sakshi Rajput, Prashant Prajapati, Tarun Kumar"
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
            />
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1.5 text-[10px]">
              // RESEARCH ABSTRACT / SUMMARY *
            </label>
            <textarea
              required
              rows={3}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="A machine learning system applying SHAP and LIME feature attribution..."
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
            />
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1.5 text-[10px]">
              // METHODOLOGY &amp; TECHNICAL HIGHLIGHTS (One point per line)
            </label>
            <textarea
              rows={3}
              value={methodology}
              onChange={(e) => setMethodology(e.target.value)}
              placeholder="Preprocessed clinical tabular attributes and trained ensemble classification models.&#10;Integrated SHAP explainability pipelines to evaluate feature contributions."
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
            />
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1.5 text-[10px]">
              // EXPLAINABILITY APPROACH (SHAP / LIME Details)
            </label>
            <textarea
              rows={2}
              value={explainabilityApproach}
              onChange={(e) => setExplainabilityApproach(e.target.value)}
              placeholder="Utilizes SHAP breakdown plots to display exact feature contributions..."
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none resize-none font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1.5 text-[10px]">
                // TECHNOLOGIES / LIBRARIES
              </label>
              <input
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="Python, Scikit-learn, SHAP, Pandas, Streamlit"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1.5 text-[10px]">
                // PUBLICATION STATUS *
              </label>
              <input
                type="text"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="[RESEARCH MANUSCRIPT IN PREPARATION]"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1.5 text-[10px]">
                // PAPER / REPO URL
              </label>
              <input
                type="url"
                value={paperUrl || githubUrl}
                onChange={(e) => {
                  setPaperUrl(e.target.value);
                  setGithubUrl(e.target.value);
                }}
                placeholder="https://github.com/heytarunkumar/..."
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3 rounded-xl outline-none font-sans"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center space-x-3">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer"
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
