import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { CustomMetaTag } from '../../context/PortfolioContext';

export const AdminSeoManager: React.FC = () => {
  const { seo, updateSeo } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'basic' | 'social' | 'technical' | 'custom'>('basic');

  // Basic SEO State
  const [siteTitle, setSiteTitle] = useState(seo.siteTitle || '');
  const [metaDescription, setMetaDescription] = useState(seo.metaDescription || '');
  const [keywords, setKeywords] = useState(seo.keywords || '');
  const [canonicalUrl, setCanonicalUrl] = useState(seo.canonicalUrl || 'https://heytarunkumar.vercel.app');

  // Social / OpenGraph State
  const [ogTitle, setOgTitle] = useState(seo.ogTitle || seo.siteTitle || '');
  const [ogDescription, setOgDescription] = useState(seo.ogDescription || seo.metaDescription || '');
  const [ogImage, setOgImage] = useState(seo.ogImage || 'https://heytarunkumar.vercel.app/og-image.png');
  const [ogType, setOgType] = useState(seo.ogType || 'website');
  const [twitterCard, setTwitterCard] = useState(seo.twitterCard || 'summary_large_image');
  const [twitterCreator, setTwitterCreator] = useState(seo.twitterCreator || '@heytarunkumar');

  // Technical SEO State
  const [robotsIndex, setRobotsIndex] = useState(seo.robotsIndex !== false);
  const [sitemapEnabled, setSitemapEnabled] = useState(seo.sitemapEnabled !== false);
  const [structuredDataEnabled, setStructuredDataEnabled] = useState(seo.structuredDataEnabled !== false);

  // Custom Meta Tags State
  const [customMetaTags, setCustomMetaTags] = useState<CustomMetaTag[]>(seo.customMetaTags || [
    { id: 'meta-1', nameProperty: 'name', key: 'author', content: 'Tarun Kumar', enabled: true },
    { id: 'meta-2', nameProperty: 'name', key: 'theme-color', content: '#0A0806', enabled: true },
    { id: 'meta-3', nameProperty: 'name', key: 'geo.region', content: 'IN', enabled: true },
  ]);

  const [editingMetaId, setEditingMetaId] = useState<string | null>(null);

  // New Custom Meta Tag Form State
  const [newAttrType, setNewAttrType] = useState<'name' | 'property'>('name');
  const [newMetaKey, setNewMetaKey] = useState('');
  const [newMetaContent, setNewMetaContent] = useState('');

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeo({
      siteTitle,
      metaDescription,
      keywords,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage,
      ogType,
      twitterCard,
      twitterCreator,
      robotsIndex,
      sitemapEnabled,
      structuredDataEnabled,
      customMetaTags,
    });
    setSavedMessage('SEO & Metadata configurations saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  // Custom Meta Tag Handlers
  const handleAddCustomMeta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMetaKey.trim() || !newMetaContent.trim()) return;

    const newTag: CustomMetaTag = {
      id: Date.now().toString(),
      nameProperty: newAttrType,
      key: newMetaKey.trim(),
      content: newMetaContent.trim(),
      enabled: true,
    };

    const nextTags = [...customMetaTags, newTag];
    setCustomMetaTags(nextTags);
    updateSeo({ customMetaTags: nextTags });

    setNewMetaKey('');
    setNewMetaContent('');
    setSavedMessage(`Added custom meta tag "${newMetaKey.trim()}"!`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleDeleteCustomMeta = (id: string) => {
    const target = customMetaTags.find((t) => t.id === id);
    const nextTags = customMetaTags.filter((t) => t.id !== id);
    setCustomMetaTags(nextTags);
    updateSeo({ customMetaTags: nextTags });
    if (editingMetaId === id) setEditingMetaId(null);
    setSavedMessage(`Deleted custom meta tag "${target?.key || id}".`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const toggleCustomMetaEnabled = (id: string) => {
    const nextTags = customMetaTags.map((t) =>
      t.id === id ? { ...t, enabled: !t.enabled } : t
    );
    setCustomMetaTags(nextTags);
    updateSeo({ customMetaTags: nextTags });
    const target = customMetaTags.find((t) => t.id === id);
    setSavedMessage(`Custom meta tag "${target?.key}" set to ${!target?.enabled ? 'ACTIVE 👁' : 'DISABLED 🙈'}.`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  // JSON-LD Structured Data Sample Preview
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tarun Kumar',
    jobTitle: 'Python Developer | Cloud & DevOps Engineer',
    url: canonicalUrl,
    sameAs: [
      'https://github.com/heytarunkumar',
      'https://linkedin.com/in/heytarunkumar',
      'https://medium.com/@heytarunkumar',
    ],
    knowsAbout: [
      'Python',
      'REST APIs',
      'Flask',
      'Docker',
      'AWS',
      'DevOps',
      'Machine Learning',
    ],
  };

  return (
    <div className="space-y-8 max-w-6xl font-sans text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#8C6D4F]/30 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            GLOBAL SEARCH &amp; METADATA COMMAND CENTER
          </span>
          <h1
            className="text-4xl uppercase tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            SEO &amp; METADATA MANAGER
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Manage meta tags, OpenGraph preview cards, technical indexing, custom meta tags, and JSON-LD schema markup.
          </p>
        </div>
        <span className="text-xs font-mono text-[#D4AF37] px-3 py-1 border border-[#D4AF37]/40 bg-[#1E1914] rounded-sm self-start sm:self-auto">
          {customMetaTags.length} CUSTOM META TAGS MANAGED
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

      {/* SEO Management Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#8C6D4F]/30 pb-2 font-mono text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 rounded-sm border uppercase transition-colors ${
            activeTab === 'basic'
              ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-bold'
              : 'border-[#8C6D4F]/30 bg-[#120F0C] text-[#C4B5A5] hover:text-white'
          }`}
        >
          1. SEARCH SNIPPETS &amp; METADATA
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={`px-4 py-2 rounded-sm border uppercase transition-colors ${
            activeTab === 'social'
              ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-bold'
              : 'border-[#8C6D4F]/30 bg-[#120F0C] text-[#C4B5A5] hover:text-white'
          }`}
        >
          2. OPENGRAPH &amp; SOCIAL CARDS
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('technical')}
          className={`px-4 py-2 rounded-sm border uppercase transition-colors ${
            activeTab === 'technical'
              ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-bold'
              : 'border-[#8C6D4F]/30 bg-[#120F0C] text-[#C4B5A5] hover:text-white'
          }`}
        >
          3. TECHNICAL INDEXING &amp; SCHEMA
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('custom')}
          className={`px-4 py-2 rounded-sm border uppercase transition-colors ${
            activeTab === 'custom'
              ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-bold'
              : 'border-[#8C6D4F]/30 bg-[#120F0C] text-[#C4B5A5] hover:text-white'
          }`}
        >
          4. CUSTOM META TAGS MANAGER ({customMetaTags.length})
        </button>
      </div>

      {/* TAB 1: BASIC SEARCH METADATA */}
      {activeTab === 'basic' && (
        <form onSubmit={handleSaveSeo} className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-6 font-mono text-xs">
          <h2 className="text-sm text-[#D4AF37] tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
            SEARCH ENGINE SNIPPET CONFIGURATION
          </h2>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              PRIMARY TITLE TAG (&lt;title&gt;) *
            </label>
            <input
              type="text"
              required
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              placeholder="Tarun Kumar — Python Developer | Cloud & DevOps Engineer"
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
            <span className="text-[10px] text-[#8C6D4F] mt-1 block">
              Length: {siteTitle.length} characters (Optimal: 50–60 characters)
            </span>
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              META DESCRIPTION *
            </label>
            <textarea
              required
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Portfolio of Tarun Kumar. Python Developer building backend services..."
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none resize-none"
            />
            <span className="text-[10px] text-[#8C6D4F] mt-1 block">
              Length: {metaDescription.length} characters (Optimal: 140–160 characters)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                KEYWORDS (Comma-separated)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Tarun Kumar, Python Developer, Cloud Engineer, DevOps..."
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                CANONICAL BASE URL *
              </label>
              <input
                type="url"
                required
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder="https://heytarunkumar.vercel.app"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          {/* Search Result Snippet Preview Card */}
          <div className="p-4 border border-[#8C6D4F]/40 bg-[#120F0C] rounded-sm space-y-1">
            <span className="text-[10px] text-[#8C6D4F] uppercase block font-bold mb-2">
              🔍 GOOGLE SEARCH RESULT SNIPPET PREVIEW:
            </span>
            <span className="text-blue-400 text-sm font-sans font-medium hover:underline block truncate">
              {siteTitle || 'Tarun Kumar — Python Developer'}
            </span>
            <span className="text-emerald-500 text-[11px] font-sans block truncate">
              {canonicalUrl || 'https://heytarunkumar.vercel.app'}
            </span>
            <p className="text-gray-300 text-xs font-sans line-clamp-2">
              {metaDescription || 'Portfolio of Tarun Kumar...'}
            </p>
          </div>

          <button
            type="submit"
            className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
          >
            SAVE SEARCH METADATA ↗
          </button>
        </form>
      )}

      {/* TAB 2: OPEN GRAPH & SOCIAL CARDS */}
      {activeTab === 'social' && (
        <form onSubmit={handleSaveSeo} className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-6 font-mono text-xs">
          <h2 className="text-sm text-[#D4AF37] tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
            OPENGRAPH (OG) &amp; TWITTER CARD METADATA
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                OPEN GRAPH TITLE (og:title)
              </label>
              <input
                type="text"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                placeholder="Tarun Kumar — Python Developer | Cloud & DevOps Engineer"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                OPEN GRAPH TYPE (og:type)
              </label>
              <select
                value={ogType}
                onChange={(e) => setOgType(e.target.value)}
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              >
                <option value="website">website</option>
                <option value="profile">profile</option>
                <option value="article">article</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              OPEN GRAPH DESCRIPTION (og:description)
            </label>
            <textarea
              rows={2}
              value={ogDescription}
              onChange={(e) => setOgDescription(e.target.value)}
              placeholder="Python-focused developer building backend services..."
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                SOCIAL PREVIEW IMAGE URL (og:image)
              </label>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="https://heytarunkumar.vercel.app/og-image.png"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                TWITTER CARD TYPE
              </label>
              <select
                value={twitterCard}
                onChange={(e) => setTwitterCard(e.target.value)}
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              >
                <option value="summary_large_image">summary_large_image</option>
                <option value="summary">summary</option>
              </select>
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                TWITTER CREATOR HANDLE
              </label>
              <input
                type="text"
                value={twitterCreator}
                onChange={(e) => setTwitterCreator(e.target.value)}
                placeholder="@heytarunkumar"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
          >
            SAVE SOCIAL CARD METADATA ↗
          </button>
        </form>
      )}

      {/* TAB 3: TECHNICAL INDEXING & SCHEMA */}
      {activeTab === 'technical' && (
        <form onSubmit={handleSaveSeo} className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-6 font-mono text-xs">
          <h2 className="text-sm text-[#D4AF37] tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
            TECHNICAL SEARCH ENGINE INDEXING &amp; STRUCTURED SCHEMA
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => setRobotsIndex(!robotsIndex)}
              className={`p-4 border rounded-sm cursor-pointer flex flex-col justify-between space-y-2 font-mono select-none transition-colors ${
                robotsIndex
                  ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300'
                  : 'border-red-500/50 bg-red-950/30 text-red-300'
              }`}
            >
              <span className="text-[#8C6D4F] uppercase font-bold text-[10px]">SEARCH ENGINE INDEXING:</span>
              <span className="font-bold text-sm">{robotsIndex ? 'INDEX, FOLLOW ✓' : 'NOINDEX, NOFOLLOW ✕'}</span>
              <span className="text-[10px] opacity-80">{robotsIndex ? 'Search engines will crawl & index portfolio pages' : 'Blocked from search engines'}</span>
            </div>

            <div
              onClick={() => setSitemapEnabled(!sitemapEnabled)}
              className={`p-4 border rounded-sm cursor-pointer flex flex-col justify-between space-y-2 font-mono select-none transition-colors ${
                sitemapEnabled
                  ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300'
                  : 'border-amber-500/50 bg-amber-950/30 text-amber-300'
              }`}
            >
              <span className="text-[#8C6D4F] uppercase font-bold text-[10px]">XML SITEMAP ENGINE:</span>
              <span className="font-bold text-sm">{sitemapEnabled ? 'SITEMAP ENABLED ✓' : 'SITEMAP DISABLED ✕'}</span>
              <span className="text-[10px] opacity-80">Generates sitemap.xml endpoints for search bots</span>
            </div>

            <div
              onClick={() => setStructuredDataEnabled(!structuredDataEnabled)}
              className={`p-4 border rounded-sm cursor-pointer flex flex-col justify-between space-y-2 font-mono select-none transition-colors ${
                structuredDataEnabled
                  ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300'
                  : 'border-amber-500/50 bg-amber-950/30 text-amber-300'
              }`}
            >
              <span className="text-[#8C6D4F] uppercase font-bold text-[10px]">JSON-LD SCHEMA MARKUP:</span>
              <span className="font-bold text-sm">{structuredDataEnabled ? 'SCHEMA ACTIVE ✓' : 'SCHEMA INACTIVE ✕'}</span>
              <span className="text-[10px] opacity-80">Rich snippet Person &amp; Software JSON-LD schema</span>
            </div>
          </div>

          {/* JSON-LD Schema Live Preview */}
          <div className="space-y-2">
            <span className="text-[#8C6D4F] uppercase block font-bold">
              📑 LIVE JSON-LD STRUCTURED DATA MARKUP CODE:
            </span>
            <pre className="p-4 bg-[#120F0C] border border-[#8C6D4F]/30 rounded-sm text-[11px] text-emerald-400 overflow-x-auto">
              {JSON.stringify(jsonLdSchema, null, 2)}
            </pre>
          </div>

          <button
            type="submit"
            className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
          >
            SAVE TECHNICAL SETTINGS ↗
          </button>
        </form>
      )}

      {/* TAB 4: CUSTOM HTML META TAGS MANAGER */}
      {activeTab === 'custom' && (
        <div className="space-y-6 font-mono text-xs">
          
          {/* Add Custom Meta Tag Form */}
          <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
            <h2 className="text-sm text-[#D4AF37] tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
              ADD NEW CUSTOM HTML META TAG
            </h2>

            <form onSubmit={handleAddCustomMeta} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#8C6D4F] uppercase mb-1">
                    ATTRIBUTE TYPE *
                  </label>
                  <select
                    value={newAttrType}
                    onChange={(e) => setNewAttrType(e.target.value as any)}
                    className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-3 rounded-sm outline-none"
                  >
                    <option value="name">name="..."</option>
                    <option value="property">property="..."</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#8C6D4F] uppercase mb-1">
                    META KEY / PROPERTY NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMetaKey}
                    onChange={(e) => setNewMetaKey(e.target.value)}
                    placeholder="e.g. google-site-verification or theme-color"
                    className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#8C6D4F] uppercase mb-1">
                    META CONTENT VALUE *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMetaContent}
                    onChange={(e) => setNewMetaContent(e.target.value)}
                    placeholder="e.g. 9f8e7d6c5b4a... or #0A0806"
                    className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
              >
                + ADD CUSTOM META TAG ↗
              </button>
            </form>
          </div>

          {/* Cataloged Custom Meta Tags List */}
          <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
            <h2 className="text-lg text-white font-bold uppercase border-b border-[#8C6D4F]/20 pb-3">
              MANAGED CUSTOM HTML META TAGS ({customMetaTags.length})
            </h2>

            <div className="space-y-3">
              {customMetaTags.map((tag) => (
                <div
                  key={tag.id}
                  className={`p-4 border rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                    tag.enabled
                      ? 'bg-[#120F0C] border-[#8C6D4F]/20 hover:border-[#D4AF37]/50'
                      : 'bg-[#0E0B08] border-amber-900/40 opacity-75'
                  }`}
                >
                  <div className="space-y-1 truncate">
                    <div className="flex items-center space-x-2">
                      <code className="text-[#D4AF37] font-bold text-sm">
                        &lt;meta {tag.nameProperty}=&quot;{tag.key}&quot; content=&quot;{tag.content}&quot; /&gt;
                      </code>
                    </div>
                    <span className="text-[10px] text-[#8C6D4F] block">
                      Type: {tag.nameProperty} · Key: {tag.key} · Content: {tag.content}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                    {/* Enable / Disable Button */}
                    <button
                      type="button"
                      onClick={() => toggleCustomMetaEnabled(tag.id)}
                      className={`px-3 py-1.5 border rounded-sm font-bold uppercase text-[10px] ${
                        tag.enabled
                          ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
                          : 'border-amber-500/50 bg-amber-950/40 text-amber-300'
                      }`}
                    >
                      {tag.enabled ? 'ACTIVE 👁' : 'DISABLED 🙈'}
                    </button>

                    {/* Delete Custom Meta Tag */}
                    <button
                      type="button"
                      onClick={() => handleDeleteCustomMeta(tag.id)}
                      className="px-3 py-1.5 border border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 font-bold uppercase text-[10px]"
                    >
                      DELETE 🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default AdminSeoManager;
