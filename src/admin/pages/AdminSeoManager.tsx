import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { CustomMetaTag } from '../../context/PortfolioContext';
import { SITE_URL } from '../../config/site';

export const AdminSeoManager: React.FC = () => {
  const { seo, updateSeo } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'basic' | 'social' | 'technical' | 'custom'>('basic');

  // Basic SEO State
  const [siteTitle, setSiteTitle] = useState(seo.siteTitle || '');
  const [metaDescription, setMetaDescription] = useState(seo.metaDescription || '');
  const [keywords, setKeywords] = useState(seo.keywords || '');
  const [canonicalUrl, setCanonicalUrl] = useState(seo.canonicalUrl || SITE_URL);

  // Social / OpenGraph State
  const [ogTitle, setOgTitle] = useState(seo.ogTitle || seo.siteTitle || '');
  const [ogDescription, setOgDescription] = useState(seo.ogDescription || seo.metaDescription || '');
  const [ogImage, setOgImage] = useState(seo.ogImage || `${SITE_URL}/images/tarun-executive.webp`);
  const [ogType, setOgType] = useState(seo.ogType || 'website');
  const [twitterCard, setTwitterCard] = useState(seo.twitterCard || 'summary_large_image');
  const [twitterCreator, setTwitterCreator] = useState(seo.twitterCreator || '@heytarunkumarr');

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
    '@id': `${canonicalUrl}#person`,
    name: 'Tarun Kumar',
    alternateName: 'heytarunkumar',
    jobTitle: 'Python Developer | AI Engineer | Researcher | Author | Founder',
    url: canonicalUrl,
    sameAs: [
      'https://www.linkedin.com/in/heytarunkumar/',
      'https://github.com/heytarunkumar',
      'https://medium.com/@heytarunkumar/',
      'https://www.instagram.com/heytarunkumar/',
      'https://x.com/heytarunkumarr',
      'https://linktr.ee/heytarunkumar',
    ],
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://origohost.in/#organization',
      name: 'OrigoHOST Tech Community',
      url: 'https://origohost.in',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Generative AI',
      'Python',
      'Machine Learning',
      'Explainable AI (XAI)',
      'REST APIs',
      'Software Architecture',
      'Automation',
      'OrigoHOST Tech Community',
    ],
  };

  return (
    <div className="space-y-8 max-w-6xl font-sans text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#26211B] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            GLOBAL SEARCH &amp; METADATA COMMAND CENTER
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
            SEO &amp; Metadata Manager
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Manage meta tags, OpenGraph preview cards, technical indexing, custom meta tags, and JSON-LD schema markup.
          </p>
        </div>
        <span className="text-xs font-mono text-[#D4AF37] px-3.5 py-1.5 border border-[#D4AF37]/30 bg-[#1A1612] rounded-full self-start sm:self-auto shadow-sm">
          {customMetaTags.length} CUSTOM META TAGS MANAGED
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

      {/* SEO Management Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#26211B] pb-2 font-mono text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2.5 rounded-xl border uppercase transition-all cursor-pointer ${
            activeTab === 'basic'
              ? 'border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'border-[#26211B] bg-[#12100E] text-[#A8988B] hover:text-white hover:border-[#D4AF37]/30'
          }`}
        >
          1. Search Snippets
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={`px-4 py-2.5 rounded-xl border uppercase transition-all cursor-pointer ${
            activeTab === 'social'
              ? 'border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'border-[#26211B] bg-[#12100E] text-[#A8988B] hover:text-white hover:border-[#D4AF37]/30'
          }`}
        >
          2. OpenGraph &amp; Social
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('technical')}
          className={`px-4 py-2.5 rounded-xl border uppercase transition-all cursor-pointer ${
            activeTab === 'technical'
              ? 'border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'border-[#26211B] bg-[#12100E] text-[#A8988B] hover:text-white hover:border-[#D4AF37]/30'
          }`}
        >
          3. Technical Indexing
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('custom')}
          className={`px-4 py-2.5 rounded-xl border uppercase transition-all cursor-pointer ${
            activeTab === 'custom'
              ? 'border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'border-[#26211B] bg-[#12100E] text-[#A8988B] hover:text-white hover:border-[#D4AF37]/30'
          }`}
        >
          4. Custom Meta ({customMetaTags.length})
        </button>
      </div>

      {/* TAB 1: BASIC SEARCH METADATA */}
      {activeTab === 'basic' && (
        <form onSubmit={handleSaveSeo} className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift font-sans text-xs">
          <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            Search Engine Snippet Configuration
          </h2>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              PRIMARY TITLE TAG (&lt;title&gt;) *
            </label>
            <input
              type="text"
              required
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              placeholder="Tarun Kumar — Python Developer | Cloud & DevOps Engineer"
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
            />
            <span className="text-[10px] text-[#8C6D4F] font-mono mt-1.5 block">
              Length: {siteTitle.length} characters (Optimal: 50–60 characters)
            </span>
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              META DESCRIPTION *
            </label>
            <textarea
              required
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Portfolio of Tarun Kumar. Python Developer building backend services..."
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none resize-none leading-relaxed transition-all"
            />
            <span className="text-[10px] text-[#8C6D4F] font-mono mt-1.5 block">
              Length: {metaDescription.length} characters (Optimal: 140–160 characters)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                KEYWORDS (Comma-separated)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Tarun Kumar, Python Developer, Cloud Engineer, DevOps..."
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                CANONICAL BASE URL *
              </label>
              <input
                type="url"
                required
                value={canonicalUrl}
                onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder="https://heytarunkumar.vercel.app"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
              />
            </div>
          </div>

          {/* Search Result Snippet Preview Card */}
          <div className="p-5 border border-[#26211B] bg-[#0A0908] rounded-xl space-y-2 card-lift">
            <span className="text-[10px] text-[#D4AF37] uppercase font-mono font-bold tracking-wider block">
              🔍 Google Search Result Snippet Live Preview:
            </span>
            <span className="text-blue-400 text-sm font-sans font-medium hover:underline block truncate">
              {siteTitle || 'Tarun Kumar — Python Developer'}
            </span>
            <span className="text-emerald-500 text-[11px] font-mono block truncate">
              {canonicalUrl || 'https://heytarunkumar.vercel.app'}
            </span>
            <p className="text-[#A8988B] text-xs font-sans line-clamp-2 leading-relaxed">
              {metaDescription || 'Portfolio of Tarun Kumar...'}
            </p>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
          >
            Save Search Metadata ↗
          </button>
        </form>
      )}

      {/* TAB 2: OPEN GRAPH & SOCIAL CARDS */}
      {activeTab === 'social' && (
        <form onSubmit={handleSaveSeo} className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift font-sans text-xs">
          <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            OpenGraph (OG) &amp; Twitter Card Metadata
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                OPEN GRAPH TITLE (og:title)
              </label>
              <input
                type="text"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                placeholder="Tarun Kumar — Python Developer | Cloud & DevOps Engineer"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                OPEN GRAPH TYPE (og:type)
              </label>
              <select
                value={ogType}
                onChange={(e) => setOgType(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none transition-all"
              >
                <option value="website">website</option>
                <option value="profile">profile</option>
                <option value="article">article</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              OPEN GRAPH DESCRIPTION (og:description)
            </label>
            <textarea
              rows={2}
              value={ogDescription}
              onChange={(e) => setOgDescription(e.target.value)}
              placeholder="Python-focused developer building backend services..."
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none resize-none leading-relaxed transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                SOCIAL PREVIEW IMAGE URL (og:image)
              </label>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="https://heytarunkumar.vercel.app/og-image.png"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                TWITTER CARD TYPE
              </label>
              <select
                value={twitterCard}
                onChange={(e) => setTwitterCard(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none transition-all"
              >
                <option value="summary_large_image">summary_large_image</option>
                <option value="summary">summary</option>
              </select>
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                TWITTER CREATOR HANDLE
              </label>
              <input
                type="text"
                value={twitterCreator}
                onChange={(e) => setTwitterCreator(e.target.value)}
                placeholder="@heytarunkumarr"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
          >
            Save Social Card Metadata ↗
          </button>
        </form>
      )}

      {/* TAB 3: TECHNICAL INDEXING & SCHEMA */}
      {activeTab === 'technical' && (
        <form onSubmit={handleSaveSeo} className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift font-sans text-xs">
          <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            Technical Search Engine Indexing &amp; Structured Schema
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              onClick={() => setRobotsIndex(!robotsIndex)}
              className={`p-5 border rounded-xl cursor-pointer flex flex-col justify-between space-y-2 font-mono select-none transition-all card-lift ${
                robotsIndex
                  ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                  : 'border-red-500/40 bg-red-950/20 text-red-300'
              }`}
            >
              <span className="text-[#8C6D4F] uppercase font-bold text-[10px]">SEARCH ENGINE INDEXING:</span>
              <span className="font-bold text-sm">{robotsIndex ? 'INDEX, FOLLOW ✓' : 'NOINDEX, NOFOLLOW ✕'}</span>
              <span className="text-[10px] opacity-80">{robotsIndex ? 'Search engines will crawl & index portfolio pages' : 'Blocked from search engines'}</span>
            </div>

            <div
              onClick={() => setSitemapEnabled(!sitemapEnabled)}
              className={`p-5 border rounded-xl cursor-pointer flex flex-col justify-between space-y-2 font-mono select-none transition-all card-lift ${
                sitemapEnabled
                  ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                  : 'border-amber-500/40 bg-amber-950/20 text-amber-300'
              }`}
            >
              <span className="text-[#8C6D4F] uppercase font-bold text-[10px]">XML SITEMAP ENGINE:</span>
              <span className="font-bold text-sm">{sitemapEnabled ? 'SITEMAP ENABLED ✓' : 'SITEMAP DISABLED ✕'}</span>
              <span className="text-[10px] opacity-80">Generates sitemap.xml endpoints for search bots</span>
            </div>

            <div
              onClick={() => setStructuredDataEnabled(!structuredDataEnabled)}
              className={`p-5 border rounded-xl cursor-pointer flex flex-col justify-between space-y-2 font-mono select-none transition-all card-lift ${
                structuredDataEnabled
                  ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                  : 'border-amber-500/40 bg-amber-950/20 text-amber-300'
              }`}
            >
              <span className="text-[#8C6D4F] uppercase font-bold text-[10px]">JSON-LD SCHEMA MARKUP:</span>
              <span className="font-bold text-sm">{structuredDataEnabled ? 'SCHEMA ACTIVE ✓' : 'SCHEMA INACTIVE ✕'}</span>
              <span className="text-[10px] opacity-80">Rich snippet Person &amp; Software JSON-LD schema</span>
            </div>
          </div>

          {/* JSON-LD Schema Live Preview */}
          <div className="space-y-2">
            <span className="text-[#D4AF37] uppercase block font-mono text-xs font-semibold">
              📑 Live JSON-LD Structured Data Markup Code:
            </span>
            <pre className="p-4 bg-[#0A0908] border border-[#26211B] rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto">
              {JSON.stringify(jsonLdSchema, null, 2)}
            </pre>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
          >
            Save Technical Settings ↗
          </button>
        </form>
      )}

      {/* TAB 4: CUSTOM HTML META TAGS MANAGER */}
      {activeTab === 'custom' && (
        <div className="space-y-6 font-sans text-xs">
          
          {/* Add Custom Meta Tag Form */}
          <div className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-5 card-lift">
            <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              Add New Custom HTML Meta Tag
            </h2>

            <form onSubmit={handleAddCustomMeta} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                    ATTRIBUTE TYPE *
                  </label>
                  <select
                    value={newAttrType}
                    onChange={(e) => setNewAttrType(e.target.value as any)}
                    className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
                  >
                    <option value="name">name="..."</option>
                    <option value="property">property="..."</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                    META KEY / PROPERTY NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMetaKey}
                    onChange={(e) => setNewMetaKey(e.target.value)}
                    placeholder="e.g. google-site-verification or theme-color"
                    className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                    META CONTENT VALUE *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMetaContent}
                    onChange={(e) => setNewMetaContent(e.target.value)}
                    placeholder="e.g. 9f8e7d6c5b4a... or #0A0806"
                    className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
              >
                + Add Custom Meta Tag ↗
              </button>
            </form>
          </div>

          {/* Cataloged Custom Meta Tags List */}
          <div className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6">
            <h2 className="text-base text-white font-mono uppercase tracking-wider font-semibold border-b border-[#26211B] pb-3">
              Managed Custom HTML Meta Tags ({customMetaTags.length})
            </h2>

            <div className="space-y-3 font-mono">
              {customMetaTags.map((tag) => (
                <div
                  key={tag.id}
                  className={`p-5 border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all card-lift ${
                    tag.enabled
                      ? 'bg-[#0A0908] border-[#26211B] hover:border-[#D4AF37]/40'
                      : 'bg-[#0E0C0A] border-amber-900/30 opacity-75'
                  }`}
                >
                  <div className="space-y-1 truncate">
                    <div className="flex items-center space-x-2">
                      <code className="text-[#D4AF37] font-mono font-bold text-sm">
                        &lt;meta {tag.nameProperty}=&quot;{tag.key}&quot; content=&quot;{tag.content}&quot; /&gt;
                      </code>
                    </div>
                    <span className="text-[11px] text-[#8C6D4F] block">
                      Type: {tag.nameProperty} · Key: {tag.key} · Content: {tag.content}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                    {/* Enable / Disable Button */}
                    <button
                      type="button"
                      onClick={() => toggleCustomMetaEnabled(tag.id)}
                      className={`px-3 py-1.5 border rounded-full font-bold uppercase text-[10px] font-mono transition-all ${
                        tag.enabled
                          ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                          : 'border-amber-500/40 bg-amber-950/40 text-amber-300'
                      }`}
                    >
                      {tag.enabled ? 'ACTIVE 👁' : 'DISABLED 🙈'}
                    </button>

                    {/* Delete Custom Meta Tag */}
                    <button
                      type="button"
                      onClick={() => handleDeleteCustomMeta(tag.id)}
                      className="px-3 py-1.5 border border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-950/40 font-bold uppercase text-[10px] font-mono rounded-lg transition-colors"
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
