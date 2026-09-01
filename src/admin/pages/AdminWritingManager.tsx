import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { Article } from '../../data/articles';

export const AdminWritingManager: React.FC = () => {
  const { articles, updateArticles } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [topic, setTopic] = useState<'Python' | 'Backend' | 'Cloud' | 'DevOps' | 'AI / ML' | 'Automation'>('Python');
  const [date, setDate] = useState('AUG 2026');
  const [readTime, setReadTime] = useState('5 MIN READ');
  const [mediumUrl, setMediumUrl] = useState('');
  const [tags, setTags] = useState('');
  const [visible, setVisible] = useState(true);

  const startEdit = (article: Article) => {
    setEditingId(article.id);
    setTitle(article.title);
    setSlug(article.slug || '');
    setSummary(article.summary);
    setTopic(article.topic);
    setDate(article.date);
    setReadTime(article.readTime);
    setMediumUrl(article.mediumUrl);
    setTags((article.tags || []).join(', '));
    setVisible(article.visible !== false);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setSummary('');
    setTopic('Python');
    setDate('AUG 2026');
    setReadTime('5 MIN READ');
    setMediumUrl('');
    setTags('');
    setVisible(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tagArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const nextArticles = [...articles];

    if (editingId) {
      const idx = nextArticles.findIndex((a) => a.id === editingId);
      if (idx !== -1) {
        nextArticles[idx] = {
          ...nextArticles[idx],
          title,
          slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          summary,
          topic,
          date,
          readTime,
          mediumUrl: mediumUrl || 'https://medium.com/@heytarunkumar',
          tags: tagArray,
          visible,
        };
      }
      setSavedMessage(`Article "${title}" updated successfully.`);
    } else {
      const newId = String(nextArticles.length + 1).padStart(2, '0');
      nextArticles.push({
        id: newId,
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        summary,
        topic,
        date,
        readTime,
        mediumUrl: mediumUrl || 'https://medium.com/@heytarunkumar',
        tags: tagArray,
        visible,
      });
      setSavedMessage(`Added "${title}" to Technical Dispatches catalog.`);
    }

    updateArticles(nextArticles);
    resetForm();
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleDeleteArticle = (id: string) => {
    const target = articles.find((a) => a.id === id);
    const nextArticles = articles.filter((a) => a.id !== id);
    updateArticles(nextArticles);
    if (editingId === id) resetForm();
    setSavedMessage(`Deleted Article "${target?.title || id}".`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const toggleVisibility = (idToToggle: string) => {
    const nextArticles = articles.map((a) =>
      a.id === idToToggle ? { ...a, visible: a.visible === false ? true : false } : a
    );
    updateArticles(nextArticles);
    const target = articles.find((a) => a.id === idToToggle);
    const isNowVisible = target?.visible === false;
    setSavedMessage(`Article "${target?.title || idToToggle}" set to ${isNowVisible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const next = [...articles];
    const temp = next[index];
    next[index] = next[index - 1];
    next[index - 1] = temp;
    updateArticles(next);
    setSavedMessage('Article sequence updated.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveDown = (index: number) => {
    if (index >= articles.length - 1) return;
    const next = [...articles];
    const temp = next[index];
    next[index] = next[index + 1];
    next[index + 1] = temp;
    updateArticles(next);
    setSavedMessage('Article sequence updated.');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleMoveToPosition = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= articles.length || fromIndex === toIndex) return;
    const next = [...articles];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    updateArticles(next);
    setSavedMessage(`Moved article to Position #${String(toIndex + 1).padStart(2, '0')}.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl font-sans text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#8C6D4F]/30 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            TECHNICAL ARTICLES &amp; DISPATCHES
          </span>
          <h1
            className="text-4xl uppercase tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            WRITING MANAGER
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Create, edit, delete, reorder, and toggle visibility for technical articles &amp; Medium dispatches.
          </p>
        </div>
        <span className="text-xs font-mono text-[#D4AF37] px-3 py-1 border border-[#D4AF37]/40 bg-[#1E1914] rounded-sm self-start sm:self-auto">
          {articles.length} ARTICLES TOTAL / {articles.filter((a) => a.visible !== false).length} VISIBLE
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
          {editingId ? `EDIT TECHNICAL ARTICLE DISPATCH` : 'ADD NEW TECHNICAL ARTICLE DISPATCH'}
        </h2>

        <form onSubmit={handleSaveArticle} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                ARTICLE TITLE *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!editingId) {
                    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }
                }}
                placeholder="Building Production-Ready REST APIs with Python & Flask..."
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                URL SLUG
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="building-production-ready-rest-apis-python-flask"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                TOPIC CATEGORY *
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value as any)}
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              >
                <option value="Python">Python</option>
                <option value="Backend">Backend</option>
                <option value="DevOps">DevOps</option>
                <option value="Cloud">Cloud</option>
                <option value="AI / ML">AI / ML</option>
                <option value="Automation">Automation</option>
              </select>
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                PUBLICATION DATE *
              </label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="AUG 2026"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                READ TIME *
              </label>
              <input
                type="text"
                required
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="6 MIN READ"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
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
              SUMMARY / SYNOPSIS *
            </label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of article insights, architectural takeaways, and engineering scope..."
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                MEDIUM / EXTERNAL ARTICLE URL
              </label>
              <input
                type="url"
                value={mediumUrl}
                onChange={(e) => setMediumUrl(e.target.value)}
                placeholder="https://medium.com/@heytarunkumar/..."
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                TAGS (Comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Python, Flask, REST APIs, Microservices"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <button
              type="submit"
              className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
            >
              {editingId ? 'SAVE ARTICLE ↗' : 'ADD ARTICLE DISPATCH ↗'}
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

      {/* Cataloged Articles List */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#8C6D4F]/20 pb-3 gap-2">
          <h2 className="text-lg font-mono text-white tracking-wider uppercase">
            CATALOGED ARTICLES &amp; DISPATCHES ({articles.length})
          </h2>
          <span className="text-xs font-mono text-[#8C6D4F]">
            Use ▲ / ▼ or Position Selectors to reorder display sequence
          </span>
        </div>

        <div className="space-y-4 font-mono text-xs">
          {articles.map((art, idx) => {
            const isVisible = art.visible !== false;

            return (
              <div
                key={art.id || idx}
                className={`p-5 border rounded-sm space-y-3 transition-colors ${
                  isVisible
                    ? 'bg-[#120F0C] border-[#8C6D4F]/30 hover:border-[#D4AF37]/50'
                    : 'bg-[#0E0B08] border-amber-900/40 opacity-75'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#8C6D4F]/20 pb-3">
                  <div className="flex items-start space-x-3">
                    
                    {/* Order Controls */}
                    <div className="flex flex-col items-center space-y-1 bg-[#0A0806] p-2 border border-[#8C6D4F]/30 rounded-sm shrink-0">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveUp(idx)}
                        title="Move Article Up"
                        className="p-1 text-[#D4AF37] hover:bg-[#1E1914] disabled:opacity-20 disabled:hover:bg-transparent"
                      >
                        ▲
                      </button>
                      <span className="text-[11px] font-bold text-[#F7E7C4]">
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                      <button
                        type="button"
                        disabled={idx === articles.length - 1}
                        onClick={() => handleMoveDown(idx)}
                        title="Move Article Down"
                        className="p-1 text-[#D4AF37] hover:bg-[#1E1914] disabled:opacity-20 disabled:hover:bg-transparent"
                      >
                        ▼
                      </button>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs text-[#D4AF37] font-bold uppercase">{art.topic} // {art.readTime}</span>
                        <span className="text-[10px] text-[#8C6D4F]">{art.date}</span>

                        {/* Visibility Badge Toggle Button */}
                        <button
                          type="button"
                          onClick={() => toggleVisibility(art.id)}
                          title="Click to toggle visibility on public website"
                          className={`text-[9px] font-mono px-2 py-0.5 border rounded-sm uppercase transition-all ${
                            isVisible
                              ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60'
                              : 'border-amber-500/50 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60'
                          }`}
                        >
                          {isVisible ? 'VISIBLE 👁' : 'HIDDEN 🙈'}
                        </button>
                      </div>

                      <h3 className="text-xl font-bold text-white uppercase">{art.title}</h3>
                    </div>
                  </div>

                  {/* Actions & Position Selector */}
                  <div className="flex items-center space-x-2 shrink-0 self-end lg:self-auto">
                    <select
                      value={idx}
                      onChange={(e) => handleMoveToPosition(idx, parseInt(e.target.value, 10))}
                      title="Change Article Position"
                      className="bg-[#0A0806] border border-[#8C6D4F]/40 text-[#D4AF37] text-xs px-2 py-1.5 rounded-sm outline-none hover:border-[#D4AF37]"
                    >
                      {articles.map((_, posIdx) => (
                        <option key={posIdx} value={posIdx}>
                          Position #{String(posIdx + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => startEdit(art)}
                      className="px-3 py-1.5 border border-[#8C6D4F]/40 bg-[#1A140F] text-[#D4AF37] hover:border-[#D4AF37]"
                    >
                      EDIT ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteArticle(art.id)}
                      className="px-3 py-1.5 border border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 font-bold"
                    >
                      DELETE 🗑️
                    </button>
                  </div>
                </div>

                <p className="text-[#A8988B] text-xs font-light">{art.summary}</p>

                <div className="flex items-center justify-between pt-1 text-[10.5px]">
                  <div className="flex flex-wrap gap-1.5">
                    {(art.tags || []).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 border border-[#8C6D4F]/25 bg-[#0A0806] text-[#C4B5A5]">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {art.mediumUrl && (
                    <a
                      href={art.mediumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D4AF37] hover:underline"
                    >
                      READ ON MEDIUM ↗
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default AdminWritingManager;
