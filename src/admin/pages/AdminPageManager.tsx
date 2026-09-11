import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminPageManager: React.FC = () => {
  const { profile, updateProfile, contact, updateContact, navigation, updateNavigation } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'contact' | 'visibility'>('hero');

  // Hero & Identity Form State
  const [name, setName] = useState(profile.name || 'Tarun Kumar');
  const [title, setTitle] = useState(profile.title || '');
  const [subtitle, setSubtitle] = useState(profile.subtitle || '');
  const [primaryRole, setPrimaryRole] = useState(profile.primaryRole || 'Python Developer');
  const [secondaryRole, setSecondaryRole] = useState(profile.secondaryRole || 'Cloud & DevOps Engineer');
  const [narrative, setNarrative] = useState(profile.narrative || '');
  const [resumeUrl, setResumeUrl] = useState(profile.resumeUrl || '');

  // About Form State
  const [bio, setBio] = useState(profile.bio || '');
  const [location, setLocation] = useState(profile.location || '');
  const [focusAreas, setFocusAreas] = useState((profile.focusAreas || []).join(', '));

  // Contact Form State
  const [email, setEmail] = useState(profile.email || contact?.email || 'imtarunchaudharyy@gmail.com');
  const [linktree, setLinktree] = useState(profile.socials?.linktree || 'https://linktr.ee/heytarunkumar');
  const [instagram, setInstagram] = useState(profile.socials?.instagram || 'https://instagram.com/heytarunkumar');
  const [github, setGithub] = useState(profile.socials?.github || 'https://github.com/haytarunkumar');
  const [linkedin, setLinkedin] = useState(profile.socials?.linkedin || 'https://linkedin.com/in/haytarunkumar');
  const [medium, setMedium] = useState(profile.socials?.medium || 'https://medium.com/@haytarunkumar');
  const [xSocial, setXSocial] = useState(profile.socials?.x || 'https://x.com/heytarunkumarr');
  const [successMessage, setSuccessMessage] = useState(contact?.successMessage || 'Thank you. Your message payload has been dispatched. Tarun will review and respond shortly.');

  const handleToggleNavVisibility = (id: string) => {
    const next = navigation.map((n) => (n.id === id ? { ...n, visible: !n.visible } : n));
    updateNavigation(next);
    setSavedMessage('Page route visibility updated!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      title,
      subtitle,
      primaryRole,
      secondaryRole,
      narrative,
      resumeUrl,
    });
    setSavedMessage('Hero & Identity page copy updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    const focusArray = focusAreas
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    updateProfile({
      bio,
      location,
      focusAreas: focusArray,
    });
    setSavedMessage('About page copy and biography updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      email,
      socials: {
        github,
        linkedin,
        medium,
        x: xSocial,
        instagram,
        linktree,
      },
    });

    updateContact({
      email,
      successMessage,
    });

    setSavedMessage('Contact page copy, social channels, and inbox response message updated!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl font-sans text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#26211B] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            WEBSITE PAGES &amp; COPY CONTENT MANAGER
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
            Pages &amp; Content Editor
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Edit text copy, biography, hero titles, about narrative, contact channels, and page visibility across the website.
          </p>
        </div>
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

      {/* Page Content Editor Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#26211B] pb-2 font-mono text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2.5 rounded-xl border uppercase transition-all cursor-pointer ${
            activeTab === 'hero'
              ? 'border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'border-[#26211B] bg-[#12100E] text-[#A8988B] hover:text-white hover:border-[#D4AF37]/30'
          }`}
        >
          1. Hero &amp; Home Page
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('about')}
          className={`px-4 py-2.5 rounded-xl border uppercase transition-all cursor-pointer ${
            activeTab === 'about'
              ? 'border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'border-[#26211B] bg-[#12100E] text-[#A8988B] hover:text-white hover:border-[#D4AF37]/30'
          }`}
        >
          2. About Page &amp; Bio
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2.5 rounded-xl border uppercase transition-all cursor-pointer ${
            activeTab === 'contact'
              ? 'border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'border-[#26211B] bg-[#12100E] text-[#A8988B] hover:text-white hover:border-[#D4AF37]/30'
          }`}
        >
          3. Contact &amp; Socials
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('visibility')}
          className={`px-4 py-2.5 rounded-xl border uppercase transition-all cursor-pointer ${
            activeTab === 'visibility'
              ? 'border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
              : 'border-[#26211B] bg-[#12100E] text-[#A8988B] hover:text-white hover:border-[#D4AF37]/30'
          }`}
        >
          4. Page Visibility
        </button>
      </div>

      {/* TAB 1: HERO & HOME PAGE */}
      {activeTab === 'hero' && (
        <div className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift">
          <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            Hero &amp; Home Section Copy Editor
          </h2>

          <form onSubmit={handleSaveHero} className="space-y-5 font-sans text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                  FULL NAME / BRAND NAME *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                  PRIMARY POSITIONING TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Python Developer | Cloud & DevOps Engineer"
                  className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                  SECONDARY SUBTITLE / FOCUS
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="AI, Machine Learning & Automation"
                  className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                  PRIMARY ROLE BADGE
                </label>
                <input
                  type="text"
                  value={primaryRole}
                  onChange={(e) => setPrimaryRole(e.target.value)}
                  placeholder="Python Developer"
                  className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                  SECONDARY ROLE BADGE
                </label>
                <input
                  type="text"
                  value={secondaryRole}
                  onChange={(e) => setSecondaryRole(e.target.value)}
                  placeholder="Cloud & DevOps Engineer"
                  className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                HERO NARRATIVE DESCRIPTION *
              </label>
              <textarea
                required
                rows={3}
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                placeholder="A Python-focused developer building backend applications..."
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none resize-none leading-relaxed transition-all"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                RESUME DOWNLOAD PATH / URL
              </label>
              <input
                type="text"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
            >
              Save Hero Content ↗
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: ABOUT PAGE & BIO */}
      {activeTab === 'about' && (
        <div className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift">
          <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            About Page &amp; Biography Content Editor
          </h2>

          <form onSubmit={handleSaveAbout} className="space-y-5 font-sans text-xs">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                FULL DETAILED BIOGRAPHY &amp; NARRATIVE *
              </label>
              <textarea
                required
                rows={6}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write your complete engineering biography..."
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-4 rounded-xl outline-none resize-none leading-relaxed transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                  LOCATION / BASE
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="India · Open to Remote"
                  className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                  TECHNICAL FOCUS AREAS (Comma-separated)
                </label>
                <input
                  type="text"
                  value={focusAreas}
                  onChange={(e) => setFocusAreas(e.target.value)}
                  placeholder="Python Backend APIs, Cloud Infrastructure, Docker, CI/CD"
                  className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
            >
              Save About Content ↗
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: CONTACT & SOCIALS */}
      {activeTab === 'contact' && (
        <div className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift">
          <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            Contact Channels &amp; Inbox Configuration
          </h2>

          <form onSubmit={handleSaveContact} className="space-y-5 font-sans text-xs">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                PRIMARY CONTACT EMAIL ADDRESS *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="imtarunchaudharyy@gmail.com"
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                  LINKTREE PROFILE URL (@heytarunkumar)
                </label>
                <input
                  type="url"
                  value={linktree}
                  onChange={(e) => setLinktree(e.target.value)}
                  placeholder="https://linktr.ee/heytarunkumar"
                  className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                  INSTAGRAM PROFILE URL (@heytarunkumar)
                </label>
                <input
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="https://instagram.com/heytarunkumar"
                  className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                  GITHUB PROFILE URL
                </label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/haytarunkumar"
                  className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                  LINKEDIN PROFILE URL
                </label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/haytarunkumar"
                  className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                  MEDIUM PROFILE URL
                </label>
                <input
                  type="url"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  placeholder="https://medium.com/@haytarunkumar"
                  className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
                />
              </div>

              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                  X / TWITTER PROFILE URL
                </label>
                <input
                  type="url"
                  value={xSocial}
                  onChange={(e) => setXSocial(e.target.value)}
                  placeholder="https://x.com/heytarunkumarr"
                  className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                INBOX TRANSMISSION SUCCESS MESSAGE
              </label>
              <textarea
                rows={2}
                value={successMessage}
                onChange={(e) => setSuccessMessage(e.target.value)}
                placeholder="Thank you. Your message payload has been dispatched..."
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none resize-none leading-relaxed transition-all"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
            >
              Save Contact Channels ↗
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: PAGE ROUTE VISIBILITY */}
      {activeTab === 'visibility' && (
        <div className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift">
          <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            Public Website Page Route Visibility &amp; Status
          </h2>

          <div className="space-y-3 font-mono text-xs">
            {navigation.map((page) => (
              <div
                key={page.id}
                className="p-5 bg-[#0A0908] border border-[#26211B] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-lift"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-[#D4AF37] font-bold">#{String(page.order).padStart(2, '0')}</span>
                  <span className="text-white font-bold tracking-wider text-sm">{page.name}</span>
                  <span className="text-[#8C6D4F]">({page.path})</span>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full uppercase text-[10px] font-bold ${page.visible !== false ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/40' : 'bg-amber-950/40 text-amber-300 border border-amber-500/40'}`}>
                    {page.visible !== false ? 'PUBLISHED 👁' : 'HIDDEN 🙈'}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleNavVisibility(page.id)}
                    className="px-3.5 py-1.5 border border-[#D4AF37]/30 bg-[#1A1612] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors rounded-lg"
                  >
                    TOGGLE VISIBILITY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPageManager;
