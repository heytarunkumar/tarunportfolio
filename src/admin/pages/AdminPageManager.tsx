import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type {
  CompetencyPillar,
  ProgressionLogItem,
} from '../../data/profile';

export const AdminPageManager: React.FC = () => {
  const { profile, updateProfile, contact, updateContact, navigation, updateNavigation } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'resume' | 'contact' | 'brand' | 'visibility'>('hero');

  // ==================== TAB 1: HERO & TERMINAL STATE ====================
  const [heroTitle, setHeroTitle] = useState(profile.heroTitle || profile.name || 'Tarun Kumar');
  const [heroBadgeText, setHeroBadgeText] = useState(profile.heroBadgeText || 'FOUNDER & AI SYSTEMS ENGINEER');
  const [heroVentureBadge, setHeroVentureBadge] = useState(profile.heroVentureBadge || 'PRESIDENT @ ORIGOHOST');
  const [heroSubtitle, setHeroSubtitle] = useState(profile.heroSubtitle || 'Building practical intelligence & scalable systems.');
  const [heroTagline, setHeroTagline] = useState(profile.heroTagline || 'APPLIED AI · GENAI · PYTHON · AUTOMATION · VENTURES · ORIGOHOST');
  const [heroNarrative, setHeroNarrative] = useState(profile.narrative || '');
  const [heroRoles, setHeroRoles] = useState<string[]>(
    profile.heroRoles && profile.heroRoles.length > 0
      ? profile.heroRoles
      : [
          'FOUNDER & AI ENGINEER',
          'TECHNOLOGY ENTREPRENEUR',
          'INTELLIGENT SYSTEMS ARCHITECT',
          'FOUNDER @ ORIGOHOST',
          'GENERATIVE AI & AUTOMATION',
          'PYTHON SYSTEMS ARCHITECT',
        ]
  );
  const [newHeroRole, setNewHeroRole] = useState('');
  const [heroPrimaryCtaText, setHeroPrimaryCtaText] = useState(profile.heroPrimaryCtaText || 'EXPLORE WORK');
  const [heroPrimaryCtaLink, setHeroPrimaryCtaLink] = useState(profile.heroPrimaryCtaLink || '#projects');
  const [heroSecondaryCtaText, setHeroSecondaryCtaText] = useState(profile.heroSecondaryCtaText || 'DOWNLOAD RESUME');
  const [heroSecondaryCtaLink, setHeroSecondaryCtaLink] = useState(profile.heroSecondaryCtaLink || profile.resumeUrl || '/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf');
  const [heroVideoUrl, setHeroVideoUrl] = useState(profile.heroVideoUrl || '/videos/hero.mp4');

  // Terminal State
  const [terminalTitle, setTerminalTitle] = useState(profile.heroTerminal?.title || 'tarun@ai-venture ~ bash');
  const [terminalWhoami, setTerminalWhoami] = useState(profile.heroTerminal?.whoami || 'tarun-kumar [Founder & AI Engineer]');
  const [terminalVenture, setTerminalVenture] = useState(profile.heroTerminal?.venture || 'OrigoHOST Tech Community');
  const [terminalVentureQuote, setTerminalVentureQuote] = useState(profile.heroTerminal?.ventureQuote || 'WHERE BUILDERS BECOME INNOVATORS');
  const [terminalStatus, setTerminalStatus] = useState(profile.heroTerminal?.status || 'ACTIVE · BUILDING VENTURES');
  const [terminalMission, setTerminalMission] = useState(profile.heroTerminal?.mission || '[TURNING_PROBLEMS_INTO_SCALABLE_PRODUCTS]');
  const [terminalStack, setTerminalStack] = useState<string[]>(
    profile.heroTerminal?.stack && profile.heroTerminal.stack.length > 0
      ? profile.heroTerminal.stack
      : [
          'applied-ai [LLMs / Intelligent Agents / XAI]',
          'python-engineering [FastAPI / Microservices]',
          'data-systems [ML Pipelines / Tabular Risk Scoring]',
          'devops-track [LEARNING & EXPLORING]',
        ]
  );
  const [newStackItem, setNewStackItem] = useState('');
  const [terminalAvatarUrl, setTerminalAvatarUrl] = useState(profile.heroTerminal?.avatarUrl || '/images/tarun-executive.jpg');

  // ==================== TAB 2: ABOUT & STORY STATE ====================
  const [aboutEyebrow, setAboutEyebrow] = useState(profile.aboutEyebrow || '01 / MISSION & PHILOSOPHY');
  const [aboutHeadline, setAboutHeadline] = useState(profile.aboutHeadline || 'Engineering intelligence. Scaling ventures.');
  const [aboutStoryParagraphs, setAboutStoryParagraphs] = useState<string[]>(
    profile.aboutStoryParagraphs && profile.aboutStoryParagraphs.length > 0
      ? profile.aboutStoryParagraphs
      : [
          `I am ${profile?.name || 'Tarun Kumar'}, a Founder, AI Engineer, and Technology Entrepreneur focused on building intelligent systems, AI-powered solutions, and technology-driven ventures.`,
          'My work sits at the intersection of Artificial Intelligence, Generative AI, Python engineering, automation, data, and entrepreneurship. I enjoy turning complex problems into practical products and scalable solutions that create measurable value.',
        ]
  );
  const [newStoryParagraph, setNewStoryParagraph] = useState('');
  const [aboutQuote, setAboutQuote] = useState(profile.aboutQuote || 'I believe technology is most powerful when it moves beyond experimentation and becomes something people can actually use, scale, and build upon.');
  
  // Pillars State
  const [competencyPillars, setCompetencyPillars] = useState<CompetencyPillar[]>(
    profile.competencyPillars && profile.competencyPillars.length > 0
      ? profile.competencyPillars
      : [
          { number: '01', title: 'AI & GENAI', subtitle: 'LLMs, Intelligent Agents & Applied AI Systems' },
          { number: '02', title: 'PYTHON & AUTOMATION', subtitle: 'Scalable Microservices, APIs & Workflows' },
          { number: '03', title: 'VENTURES & COMMUNITY', subtitle: 'OrigoHOST Founder, Developer Education & Growth' },
        ]
  );

  // Spotlight Card State
  const [spotlightPhotoUrl, setSpotlightPhotoUrl] = useState(profile.spotlightCard?.photoUrl || '/images/tarun-headshot.jpg');
  const [spotlightName, setSpotlightName] = useState(profile.spotlightCard?.name || profile.name || 'Tarun Kumar');
  const [spotlightRole, setSpotlightRole] = useState(profile.spotlightCard?.role || profile.primaryRole || 'Founder & AI Systems Engineer');
  const [spotlightLeadership, setSpotlightLeadership] = useState(profile.spotlightCard?.leadership || 'President @ OrigoHOST');
  const [spotlightVerifiedStatus, setSpotlightVerifiedStatus] = useState(profile.spotlightCard?.verifiedStatus || 'VERIFIED');

  // OrigoHOST Card State
  const [origoLogoUrl, setOrigoLogoUrl] = useState(profile.origohostCard?.logoUrl || '/images/origohost/origohost-icon.png');
  const [origoTag, setOrigoTag] = useState(profile.origohostCard?.tag || 'VENTURE & COMMUNITY');
  const [origoTitle, setOrigoTitle] = useState(profile.origohostCard?.title || 'OrigoHOST Tech Community');
  const [origoTagline, setOrigoTagline] = useState(profile.origohostCard?.tagline || 'WHERE BUILDERS BECOME INNOVATORS');
  const [origoDescription, setOrigoDescription] = useState(profile.origohostCard?.description || 'As Founder & President, leading institutional engagements, technical initiatives, and community growth focused on applied AI and practical developer education.');
  const [origoRole, setOrigoRole] = useState(profile.origohostCard?.role || 'ROLE: FOUNDER & PRESIDENT');
  const [origoEcosystem, setOrigoEcosystem] = useState(profile.origohostCard?.ecosystem || 'APPLIED AI ECOSYSTEM');

  // Progression Log State
  const [logTitle, setLogTitle] = useState(profile.progressionLog?.logTitle || 'VENTURE_&_TECH_STACK.LOG');
  const [logVersion, setLogVersion] = useState(profile.progressionLog?.version || 'v2026.AI');
  const [progressionItems, setProgressionItems] = useState<ProgressionLogItem[]>(
    profile.progressionLog?.items && profile.progressionLog.items.length > 0
      ? profile.progressionLog.items
      : [
          { title: 'Applied AI & GenAI Architectures', status: '✓ ACTIVE', statusType: 'active' },
          { title: 'Python Systems & Automation', status: '✓ MASTERED', statusType: 'mastered' },
          { title: 'Community & Builder Ecosystems', status: '✓ LEADING', statusType: 'leading' },
          { title: 'Scalable AI Ventures & Products', status: '⚡ SCALING', statusType: 'scaling' },
        ]
  );
  const [newLogTitle, setNewLogTitle] = useState('');
  const [newLogStatus, setNewLogStatus] = useState('');

  // ==================== TAB 3: RESUME STATE ====================
  const [resumeBadge, setResumeBadge] = useState(profile.resumeBadge || 'VERIFIED CREDENTIALS & CURRICULUM VITAE');
  const [resumeHeadline, setResumeHeadline] = useState(profile.resumeHeadline || 'Looking for the complete technical profile?');
  const [resumeDescription, setResumeDescription] = useState(profile.resumeDescription || 'Download the official engineering resume to review production software architectures, machine learning research publications, OrigoHOST community metrics, and academic coursework.');
  const [resumeViewCta, setResumeViewCta] = useState(profile.resumeViewCta || 'VIEW RESUME');
  const [resumeDownloadCta, setResumeDownloadCta] = useState(profile.resumeDownloadCta || 'DOWNLOAD ATS PDF');
  const [resumePdfUrl, setResumePdfUrl] = useState(profile.resumeUrl || '/resume/Tarun_Kumar_Resume_ATS_OnePage.pdf');

  // ==================== TAB 4: CONTACT & SOCIALS STATE ====================
  const [contactEyebrow, setContactEyebrow] = useState(profile.contactEyebrow || '08 / INITIATE CONTACT');
  const [contactHeadline, setContactHeadline] = useState(profile.contactHeadline || "Let's build meaningful intelligence.");
  const [contactDescription, setContactDescription] = useState(profile.contactDescription || 'Whether you want to collaborate on AI-driven systems, Python engineering architectures, OrigoHOST community initiatives, or discuss startup ventures — direct messages are welcome.');
  const [directPhotoUrl, setDirectPhotoUrl] = useState(profile.directBadge?.photoUrl || '/images/tarun-about.jpg');
  const [directTitle, setDirectTitle] = useState(profile.directBadge?.title || 'DIRECT LINE //');
  const [directName, setDirectName] = useState(profile.directBadge?.name || profile.name || 'Tarun Kumar');
  const [directNote, setDirectNote] = useState(profile.directBadge?.note || 'Direct response for AI engineering & ventures');
  const [directStatus, setDirectStatus] = useState(profile.directBadge?.status || 'AVAILABLE');
  const [contactEmail, setContactEmail] = useState(contact?.email || profile.email || 'imtarunchaudharyy@gmail.com');
  const [formSubmitUrl, setFormSubmitUrl] = useState(profile.contactFormSubmitUrl || 'https://formsubmit.co/ajax/tarunsinghchaudharyy@gmail.com');
  const [submitButtonText, setSubmitButtonText] = useState(profile.contactSubmitButtonText || 'DISPATCH MESSAGE ↗');
  const [successMessage, setSuccessMessage] = useState(contact?.successMessage || 'Thank you. Your message payload has been dispatched. Tarun will review and respond shortly.');

  // Social Links
  const [linktree, setLinktree] = useState(profile.socials?.linktree || 'https://linktr.ee/heytarunkumar');
  const [instagram, setInstagram] = useState(profile.socials?.instagram || 'https://instagram.com/heytarunkumar');
  const [github, setGithub] = useState(profile.socials?.github || 'https://github.com/haytarunkumar');
  const [linkedin, setLinkedin] = useState(profile.socials?.linkedin || 'https://linkedin.com/in/haytarunkumar');
  const [medium, setMedium] = useState(profile.socials?.medium || 'https://medium.com/@haytarunkumar');
  const [xSocial, setXSocial] = useState(profile.socials?.x || 'https://x.com/heytarunkumarr');

  // ==================== TAB 5: BRAND, NAVBAR & FOOTER STATE ====================
  const [brandName, setBrandName] = useState(profile.name || 'Tarun Kumar');
  const [brandRole, setBrandRole] = useState(profile.brandRole || 'FOUNDER · AI & TECH');
  const [monogramUrl, setMonogramUrl] = useState(profile.monogramUrl || '/images/brand/tarun-monogram.png');
  const [connectCtaText, setConnectCtaText] = useState(profile.connectCtaText || "LET'S CONNECT");
  const [connectCtaLink, setConnectCtaLink] = useState(profile.connectCtaLink || '/contact');
  const [footerSubtitle, setFooterSubtitle] = useState(profile.footerSubtitle || 'Founder | AI & Technology • OrigoHOST Community');
  const [footerCopyright, setFooterCopyright] = useState(profile.footerCopyright || `© ${new Date().getFullYear()} ${profile.name || 'Tarun Kumar'}. All rights reserved.`);

  // ==================== SAVE HANDLERS ====================
  const handleToggleNavVisibility = (id: string) => {
    const next = navigation.map((n) => (n.id === id ? { ...n, visible: !n.visible } : n));
    updateNavigation(next);
    setSavedMessage('Page route visibility updated!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      heroTitle,
      heroRoles,
      heroSubtitle,
      heroTagline,
      heroBadgeText,
      heroVentureBadge,
      heroPrimaryCtaText,
      heroPrimaryCtaLink,
      heroSecondaryCtaText,
      heroSecondaryCtaLink,
      heroVideoUrl,
      narrative: heroNarrative,
      heroTerminal: {
        title: terminalTitle,
        whoami: terminalWhoami,
        venture: terminalVenture,
        ventureQuote: terminalVentureQuote,
        status: terminalStatus,
        mission: terminalMission,
        stack: terminalStack,
        avatarUrl: terminalAvatarUrl,
      },
    });
    setSavedMessage('Hero section & terminal visualizer updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      aboutEyebrow,
      aboutHeadline,
      aboutStoryParagraphs,
      aboutQuote,
      competencyPillars,
      spotlightCard: {
        photoUrl: spotlightPhotoUrl,
        name: spotlightName,
        role: spotlightRole,
        leadership: spotlightLeadership,
        verifiedStatus: spotlightVerifiedStatus,
      },
      origohostCard: {
        logoUrl: origoLogoUrl,
        tag: origoTag,
        title: origoTitle,
        tagline: origoTagline,
        description: origoDescription,
        role: origoRole,
        ecosystem: origoEcosystem,
      },
      progressionLog: {
        logTitle,
        version: logVersion,
        items: progressionItems,
      },
    });
    setSavedMessage('About section, story, cards & progression roadmap updated!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleSaveResume = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      resumeBadge,
      resumeHeadline,
      resumeDescription,
      resumeViewCta,
      resumeDownloadCta,
      resumeUrl: resumePdfUrl,
    });
    setSavedMessage('Resume section copy, credentials & download link updated!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      email: contactEmail,
      contactEyebrow,
      contactHeadline,
      contactDescription,
      directBadge: {
        photoUrl: directPhotoUrl,
        title: directTitle,
        name: directName,
        note: directNote,
        status: directStatus,
      },
      contactFormSubmitUrl: formSubmitUrl,
      contactSubmitButtonText: submitButtonText,
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
      email: contactEmail,
      successMessage,
    });

    setSavedMessage('Contact channels, inbox form & all social handles updated!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: brandName,
      brandRole,
      monogramUrl,
      connectCtaText,
      connectCtaLink,
      footerSubtitle,
      footerCopyright,
    });
    setSavedMessage('Global brand identity, header & footer configuration updated!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl font-sans text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#26211B] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            COMPLETE PUBLIC WEBSITE VISUAL &amp; COPY CMS
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
            Website Content &amp; Pages Editor
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Edit 100% of every section: text copy, rotating roles, cards, terminal, quotes, badges, links, and branding.
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

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#26211B] pb-2 font-mono text-xs">
        {[
          { id: 'hero', label: '1. Hero & Terminal' },
          { id: 'about', label: '2. About & Story' },
          { id: 'resume', label: '3. Resume & CV' },
          { id: 'contact', label: '4. Contact & Socials' },
          { id: 'brand', label: '5. Header & Footer' },
          { id: 'visibility', label: '6. Page Visibility' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl border uppercase transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                : 'border-[#26211B] bg-[#12100E] text-[#A8988B] hover:text-white hover:border-[#D4AF37]/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ==================== TAB 1: HERO & TERMINAL ==================== */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSaveHero} className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-8 card-lift font-sans text-xs">
          <div>
            <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              Hero Main Display &amp; Typography
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                HERO DISPLAY TITLE (H1) *
              </label>
              <input
                type="text"
                required
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                HERO PRIMARY BADGE
              </label>
              <input
                type="text"
                value={heroBadgeText}
                onChange={(e) => setHeroBadgeText(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                HERO VENTURE BADGE
              </label>
              <input
                type="text"
                value={heroVentureBadge}
                onChange={(e) => setHeroVentureBadge(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              HERO SUB-HEADLINE *
            </label>
            <input
              type="text"
              required
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-sans text-sm"
            />
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              HERO TAGLINE / TECHNOLOGIES LIST *
            </label>
            <input
              type="text"
              required
              value={heroTagline}
              onChange={(e) => setHeroTagline(e.target.value)}
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono"
            />
          </div>

          {/* Dynamic Rotating Roles */}
          <div className="p-5 border border-[#26211B] bg-[#0A0908] rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold">
                Dynamic Rotating Hero Roles ({heroRoles.length})
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {heroRoles.map((role, rIdx) => (
                <span
                  key={rIdx}
                  className="px-3 py-1.5 rounded-lg border border-[#26211B] bg-[#141210] text-[#E8DFD8] text-xs font-mono flex items-center gap-2"
                >
                  <span>{role}</span>
                  <button
                    type="button"
                    onClick={() => setHeroRoles(heroRoles.filter((_, i) => i !== rIdx))}
                    className="text-red-400 hover:text-red-300 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newHeroRole}
                onChange={(e) => setNewHeroRole(e.target.value)}
                placeholder="e.g. AUTONOMOUS AGENTS ARCHITECT"
                className="flex-1 bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded-lg outline-none font-mono text-xs"
              />
              <button
                type="button"
                onClick={() => {
                  if (newHeroRole.trim()) {
                    setHeroRoles([...heroRoles, newHeroRole.trim().toUpperCase()]);
                    setNewHeroRole('');
                  }
                }}
                className="px-4 py-2 border border-[#D4AF37]/50 bg-[#D4AF37] text-black font-bold rounded-lg uppercase text-xs font-mono"
              >
                + Add Role
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              HERO SUPPORTING NARRATIVE *
            </label>
            <textarea
              required
              rows={3}
              value={heroNarrative}
              onChange={(e) => setHeroNarrative(e.target.value)}
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none resize-none leading-relaxed font-sans"
            />
          </div>

          {/* CTA Buttons & Background Video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                PRIMARY CTA BUTTON (TEXT / LINK)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={heroPrimaryCtaText}
                  onChange={(e) => setHeroPrimaryCtaText(e.target.value)}
                  placeholder="EXPLORE WORK"
                  className="bg-[#0A0908] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
                <input
                  type="text"
                  value={heroPrimaryCtaLink}
                  onChange={(e) => setHeroPrimaryCtaLink(e.target.value)}
                  placeholder="#projects"
                  className="bg-[#0A0908] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                SECONDARY CTA BUTTON (TEXT / LINK)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={heroSecondaryCtaText}
                  onChange={(e) => setHeroSecondaryCtaText(e.target.value)}
                  placeholder="DOWNLOAD RESUME"
                  className="bg-[#0A0908] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
                <input
                  type="text"
                  value={heroSecondaryCtaLink}
                  onChange={(e) => setHeroSecondaryCtaLink(e.target.value)}
                  placeholder="/resume/...pdf"
                  className="bg-[#0A0908] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              HERO BACKGROUND VIDEO PATH / URL
            </label>
            <input
              type="text"
              value={heroVideoUrl}
              onChange={(e) => setHeroVideoUrl(e.target.value)}
              placeholder="/videos/hero.mp4"
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono"
            />
          </div>

          {/* Interactive Terminal Visualizer */}
          <div className="p-6 border border-[#26211B] bg-[#0A0908] rounded-xl space-y-4">
            <h3 className="text-xs font-mono text-[#D4AF37] uppercase font-bold tracking-wider">
              // INTERACTIVE HERO CLI TERMINAL SETTINGS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[10px] mb-1">
                  TERMINAL WINDOW TITLE
                </label>
                <input
                  type="text"
                  value={terminalTitle}
                  onChange={(e) => setTerminalTitle(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[10px] mb-1">
                  WHOAMI COMMAND OUTPUT
                </label>
                <input
                  type="text"
                  value={terminalWhoami}
                  onChange={(e) => setTerminalWhoami(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[10px] mb-1">
                  ACTIVE VENTURE TITLE
                </label>
                <input
                  type="text"
                  value={terminalVenture}
                  onChange={(e) => setTerminalVenture(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[10px] mb-1">
                  VENTURE QUOTE / MOTTO
                </label>
                <input
                  type="text"
                  value={terminalVentureQuote}
                  onChange={(e) => setTerminalVentureQuote(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[10px] mb-1">
                  STATUS BADGE
                </label>
                <input
                  type="text"
                  value={terminalStatus}
                  onChange={(e) => setTerminalStatus(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[10px] mb-1">
                  CURRENT MISSION
                </label>
                <input
                  type="text"
                  value={terminalMission}
                  onChange={(e) => setTerminalMission(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[10px] mb-1">
                  TERMINAL AVATAR IMAGE
                </label>
                <input
                  type="text"
                  value={terminalAvatarUrl}
                  onChange={(e) => setTerminalAvatarUrl(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
              </div>
            </div>

            {/* Terminal Stack Items */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono text-[#8C6D4F] block">
                CORE STACK TERMINAL COMMAND ITEMS:
              </span>
              <div className="space-y-2">
                {terminalStack.map((st, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={st}
                      onChange={(e) => {
                        const updated = [...terminalStack];
                        updated[idx] = e.target.value;
                        setTerminalStack(updated);
                      }}
                      className="flex-1 bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded-lg outline-none font-mono text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setTerminalStack(terminalStack.filter((_, i) => i !== idx))}
                      className="text-red-400 font-bold px-2 py-1 bg-red-950/20 border border-red-500/20 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newStackItem}
                  onChange={(e) => setNewStackItem(e.target.value)}
                  placeholder="e.g. generative-ai [Fine-tuning & Local LLMs]"
                  className="flex-1 bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded-lg outline-none font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newStackItem.trim()) {
                      setTerminalStack([...terminalStack, newStackItem.trim()]);
                      setNewStackItem('');
                    }
                  }}
                  className="px-4 py-2 border border-[#D4AF37]/50 bg-[#D4AF37] text-black font-bold rounded-lg uppercase text-xs font-mono"
                >
                  + Add Stack
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
          >
            Save Hero &amp; Terminal Settings ↗
          </button>
        </form>
      )}

      {/* ==================== TAB 2: ABOUT & STORY ==================== */}
      {activeTab === 'about' && (
        <form onSubmit={handleSaveAbout} className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-8 card-lift font-sans text-xs">
          <div>
            <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              About Section Story &amp; Headline
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                SECTION EYEBROW TAG *
              </label>
              <input
                type="text"
                required
                value={aboutEyebrow}
                onChange={(e) => setAboutEyebrow(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                MAIN SECTION HEADLINE *
              </label>
              <input
                type="text"
                required
                value={aboutHeadline}
                onChange={(e) => setAboutHeadline(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-serif text-sm"
              />
            </div>
          </div>

          {/* Story Paragraphs */}
          <div className="p-5 border border-[#26211B] bg-[#0A0908] rounded-xl space-y-3">
            <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold block">
              Story Paragraphs ({aboutStoryParagraphs.length})
            </span>
            <div className="space-y-3">
              {aboutStoryParagraphs.map((para, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8C6D4F]">
                    <span>PARAGRAPH #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setAboutStoryParagraphs(aboutStoryParagraphs.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={para}
                    onChange={(e) => {
                      const updated = [...aboutStoryParagraphs];
                      updated[idx] = e.target.value;
                      setAboutStoryParagraphs(updated);
                    }}
                    className="w-full bg-[#12100E] border border-[#26211B] text-white p-3 rounded-lg outline-none font-sans text-xs"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newStoryParagraph}
                onChange={(e) => setNewStoryParagraph(e.target.value)}
                placeholder="Add a new story paragraph..."
                className="flex-1 bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded-lg outline-none font-sans text-xs"
              />
              <button
                type="button"
                onClick={() => {
                  if (newStoryParagraph.trim()) {
                    setAboutStoryParagraphs([...aboutStoryParagraphs, newStoryParagraph.trim()]);
                    setNewStoryParagraph('');
                  }
                }}
                className="px-4 py-2 border border-[#D4AF37]/50 bg-[#D4AF37] text-black font-bold rounded-lg uppercase text-xs font-mono"
              >
                + Add Paragraph
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              HIGHLIGHT MISSION QUOTE *
            </label>
            <textarea
              rows={2}
              value={aboutQuote}
              onChange={(e) => setAboutQuote(e.target.value)}
              className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-serif italic"
            />
          </div>

          {/* 3 Core Competency Pillars */}
          <div className="p-5 border border-[#26211B] bg-[#0A0908] rounded-xl space-y-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold block">
              Core Competency Pillars (3 Pillars)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {competencyPillars.map((pil, pIdx) => (
                <div key={pIdx} className="p-3 bg-[#12100E] border border-[#26211B] rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#D4AF37]">
                    <span>PILLAR #{pil.number}</span>
                  </div>
                  <input
                    type="text"
                    value={pil.title}
                    onChange={(e) => {
                      const updated = [...competencyPillars];
                      updated[pIdx].title = e.target.value;
                      setCompetencyPillars(updated);
                    }}
                    placeholder="Title"
                    className="w-full bg-[#0A0908] border border-[#26211B] text-white p-2 rounded text-xs font-mono"
                  />
                  <input
                    type="text"
                    value={pil.subtitle}
                    onChange={(e) => {
                      const updated = [...competencyPillars];
                      updated[pIdx].subtitle = e.target.value;
                      setCompetencyPillars(updated);
                    }}
                    placeholder="Subtitle"
                    className="w-full bg-[#0A0908] border border-[#26211B] text-[#C4BCB3] p-2 rounded text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Founder Spotlight Card & OrigoHOST Feature Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 border border-[#26211B] bg-[#0A0908] rounded-xl space-y-3">
              <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold block">
                Founder Spotlight Card
              </span>
              <div>
                <label className="block text-[#A8988B] text-[10px] font-mono mb-1">PHOTO URL</label>
                <input
                  type="text"
                  value={spotlightPhotoUrl}
                  onChange={(e) => setSpotlightPhotoUrl(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded text-xs font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#A8988B] text-[10px] font-mono mb-1">NAME</label>
                  <input
                    type="text"
                    value={spotlightName}
                    onChange={(e) => setSpotlightName(e.target.value)}
                    className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[#A8988B] text-[10px] font-mono mb-1">ROLE</label>
                  <input
                    type="text"
                    value={spotlightRole}
                    onChange={(e) => setSpotlightRole(e.target.value)}
                    className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#A8988B] text-[10px] font-mono mb-1">LEADERSHIP</label>
                  <input
                    type="text"
                    value={spotlightLeadership}
                    onChange={(e) => setSpotlightLeadership(e.target.value)}
                    className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[#A8988B] text-[10px] font-mono mb-1">VERIFIED STATUS</label>
                  <input
                    type="text"
                    value={spotlightVerifiedStatus}
                    onChange={(e) => setSpotlightVerifiedStatus(e.target.value)}
                    className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="p-5 border border-[#26211B] bg-[#0A0908] rounded-xl space-y-3">
              <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold block">
                OrigoHOST Venture Card
              </span>
              <div>
                <label className="block text-[#A8988B] text-[10px] font-mono mb-1">LOGO URL</label>
                <input
                  type="text"
                  value={origoLogoUrl}
                  onChange={(e) => setOrigoLogoUrl(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded text-xs font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#A8988B] text-[10px] font-mono mb-1">TAG</label>
                  <input
                    type="text"
                    value={origoTag}
                    onChange={(e) => setOrigoTag(e.target.value)}
                    className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#A8988B] text-[10px] font-mono mb-1">TITLE</label>
                  <input
                    type="text"
                    value={origoTitle}
                    onChange={(e) => setOrigoTitle(e.target.value)}
                    className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#A8988B] text-[10px] font-mono mb-1">ROLE / POSITION</label>
                  <input
                    type="text"
                    value={origoRole}
                    onChange={(e) => setOrigoRole(e.target.value)}
                    className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[#A8988B] text-[10px] font-mono mb-1">ECOSYSTEM BADGE</label>
                  <input
                    type="text"
                    value={origoEcosystem}
                    onChange={(e) => setOrigoEcosystem(e.target.value)}
                    className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded text-xs font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#A8988B] text-[10px] font-mono mb-1">TAGLINE</label>
                <input
                  type="text"
                  value={origoTagline}
                  onChange={(e) => setOrigoTagline(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[#A8988B] text-[10px] font-mono mb-1">DESCRIPTION</label>
                <textarea
                  rows={2}
                  value={origoDescription}
                  onChange={(e) => setOrigoDescription(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded text-xs"
                />
              </div>
            </div>
          </div>

          {/* Career Progression Log */}
          <div className="p-5 border border-[#26211B] bg-[#0A0908] rounded-xl space-y-3">
            <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold block">
              Venture &amp; Tech Stack Progression Roadmap Log
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#A8988B] text-[10px] font-mono mb-1">LOG TITLE</label>
                <input
                  type="text"
                  value={logTitle}
                  onChange={(e) => setLogTitle(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-[#A8988B] text-[10px] font-mono mb-1">VERSION TAG</label>
                <input
                  type="text"
                  value={logVersion}
                  onChange={(e) => setLogVersion(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded font-mono text-xs"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {progressionItems.map((itm, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={itm.title}
                    onChange={(e) => {
                      const updated = [...progressionItems];
                      updated[idx].title = e.target.value;
                      setProgressionItems(updated);
                    }}
                    placeholder="Track Title"
                    className="flex-1 bg-[#12100E] border border-[#26211B] text-white p-2 rounded text-xs"
                  />
                  <input
                    type="text"
                    value={itm.status}
                    onChange={(e) => {
                      const updated = [...progressionItems];
                      updated[idx].status = e.target.value;
                      setProgressionItems(updated);
                    }}
                    placeholder="Status (e.g. ✓ ACTIVE)"
                    className="w-36 bg-[#12100E] border border-[#26211B] text-white p-2 rounded font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setProgressionItems(progressionItems.filter((_, i) => i !== idx))}
                    className="text-red-400 px-2 py-1 bg-red-950/20 border border-red-500/20 rounded"
                  >
                    ×
                  </button>
                </div>
              ))}

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newLogTitle}
                  onChange={(e) => setNewLogTitle(e.target.value)}
                  placeholder="New track title..."
                  className="flex-1 bg-[#12100E] border border-[#26211B] text-white p-2 rounded text-xs"
                />
                <input
                  type="text"
                  value={newLogStatus}
                  onChange={(e) => setNewLogStatus(e.target.value)}
                  placeholder="Status (e.g. ✓ SCALING)"
                  className="w-36 bg-[#12100E] border border-[#26211B] text-white p-2 rounded font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newLogTitle.trim()) {
                      setProgressionItems([
                        ...progressionItems,
                        { title: newLogTitle.trim(), status: newLogStatus.trim() || '✓ ACTIVE', statusType: 'active' },
                      ]);
                      setNewLogTitle('');
                      setNewLogStatus('');
                    }
                  }}
                  className="px-3 py-2 bg-[#D4AF37] text-black font-bold font-mono text-xs rounded"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
          >
            Save About Section Settings ↗
          </button>
        </form>
      )}

      {/* ==================== TAB 3: RESUME & CV ==================== */}
      {activeTab === 'resume' && (
        <form onSubmit={handleSaveResume} className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift font-sans text-xs">
          <div>
            <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              Resume Section Copy &amp; PDF Configuration
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                SECTION BADGE TEXT *
              </label>
              <input
                type="text"
                required
                value={resumeBadge}
                onChange={(e) => setResumeBadge(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                SECTION HEADLINE *
              </label>
              <input
                type="text"
                required
                value={resumeHeadline}
                onChange={(e) => setResumeHeadline(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-serif text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              DESCRIPTION NARRATIVE *
            </label>
            <textarea
              required
              rows={3}
              value={resumeDescription}
              onChange={(e) => setResumeDescription(e.target.value)}
              className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none leading-relaxed font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                VIEW CTA BUTTON LABEL
              </label>
              <input
                type="text"
                value={resumeViewCta}
                onChange={(e) => setResumeViewCta(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                DOWNLOAD CTA BUTTON LABEL
              </label>
              <input
                type="text"
                value={resumeDownloadCta}
                onChange={(e) => setResumeDownloadCta(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                RESUME PDF FILE PATH / URL
              </label>
              <input
                type="text"
                value={resumePdfUrl}
                onChange={(e) => setResumePdfUrl(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
          >
            Save Resume Settings ↗
          </button>
        </form>
      )}

      {/* ==================== TAB 4: CONTACT & SOCIALS ==================== */}
      {activeTab === 'contact' && (
        <form onSubmit={handleSaveContact} className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift font-sans text-xs">
          <div>
            <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              Contact Section Copy, Direct Badge &amp; Inbox Transmission
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                CONTACT EYEBROW TAG *
              </label>
              <input
                type="text"
                required
                value={contactEyebrow}
                onChange={(e) => setContactEyebrow(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                CONTACT HEADLINE *
              </label>
              <input
                type="text"
                required
                value={contactHeadline}
                onChange={(e) => setContactHeadline(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-serif text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              CONTACT DESCRIPTION *
            </label>
            <textarea
              required
              rows={2}
              value={contactDescription}
              onChange={(e) => setContactDescription(e.target.value)}
              className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-sans"
            />
          </div>

          {/* Founder Direct Line Badge */}
          <div className="p-5 border border-[#26211B] bg-[#0A0908] rounded-xl space-y-3">
            <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold block">
              Founder Direct Line Badge Card
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[#A8988B] text-[10px] font-mono mb-1">PHOTO URL</label>
                <input
                  type="text"
                  value={directPhotoUrl}
                  onChange={(e) => setDirectPhotoUrl(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-[#A8988B] text-[10px] font-mono mb-1">TAG TITLE</label>
                <input
                  type="text"
                  value={directTitle}
                  onChange={(e) => setDirectTitle(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-[#A8988B] text-[10px] font-mono mb-1">AVAILABILITY STATUS</label>
                <input
                  type="text"
                  value={directStatus}
                  onChange={(e) => setDirectStatus(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded font-mono text-xs"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#A8988B] text-[10px] font-mono mb-1">NAME</label>
                <input
                  type="text"
                  value={directName}
                  onChange={(e) => setDirectName(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-[#A8988B] text-[10px] font-mono mb-1">NOTE / SUBTITLE</label>
                <input
                  type="text"
                  value={directNote}
                  onChange={(e) => setDirectNote(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-2.5 rounded text-xs"
                />
              </div>
            </div>
          </div>

          {/* Form Endpoint & Recipient Email */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                PRIMARY DISPATCH EMAIL *
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                FORMSUBMIT.CO API ENDPOINT
              </label>
              <input
                type="url"
                value={formSubmitUrl}
                onChange={(e) => setFormSubmitUrl(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                SUBMIT BUTTON TEXT
              </label>
              <input
                type="text"
                value={submitButtonText}
                onChange={(e) => setSubmitButtonText(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
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
              className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none resize-none font-sans"
            />
          </div>

          {/* Social Handles (All 6 platforms) */}
          <div className="p-5 border border-[#26211B] bg-[#0A0908] rounded-xl space-y-4">
            <span className="text-xs font-mono text-[#D4AF37] uppercase font-bold block">
              Social Media Handles &amp; Channel URLs
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[10px] mb-1">
                  LINKTREE PROFILE URL (@heytarunkumar)
                </label>
                <input
                  type="url"
                  value={linktree}
                  onChange={(e) => setLinktree(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[10px] mb-1">
                  INSTAGRAM PROFILE URL (@heytarunkumar)
                </label>
                <input
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[10px] mb-1">
                  GITHUB PROFILE URL
                </label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[10px] mb-1">
                  LINKEDIN PROFILE URL
                </label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[10px] mb-1">
                  MEDIUM PROFILE URL
                </label>
                <input
                  type="url"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[#A8988B] uppercase font-mono text-[10px] mb-1">
                  X / TWITTER PROFILE URL
                </label>
                <input
                  type="url"
                  value={xSocial}
                  onChange={(e) => setXSocial(e.target.value)}
                  className="w-full bg-[#12100E] border border-[#26211B] text-white p-3 rounded-lg outline-none font-mono"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
          >
            Save Contact &amp; Social Channels ↗
          </button>
        </form>
      )}

      {/* ==================== TAB 5: BRAND, NAVBAR & FOOTER ==================== */}
      {activeTab === 'brand' && (
        <form onSubmit={handleSaveBrand} className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift font-sans text-xs">
          <div>
            <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase border-b border-[#26211B] pb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              Global Brand Monogram, Header &amp; Footer Configurations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                BRAND NAME *
              </label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                NAVBAR ROLE SUBTITLE
              </label>
              <input
                type="text"
                value={brandRole}
                onChange={(e) => setBrandRole(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                BRAND MONOGRAM / LOGO URL
              </label>
              <input
                type="text"
                value={monogramUrl}
                onChange={(e) => setMonogramUrl(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                NAVBAR CONNECT BUTTON TEXT
              </label>
              <input
                type="text"
                value={connectCtaText}
                onChange={(e) => setConnectCtaText(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                NAVBAR CONNECT BUTTON LINK PATH
              </label>
              <input
                type="text"
                value={connectCtaLink}
                onChange={(e) => setConnectCtaLink(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                FOOTER TAGLINE / SUBTITLE
              </label>
              <input
                type="text"
                value={footerSubtitle}
                onChange={(e) => setFooterSubtitle(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
                FOOTER COPYRIGHT TEXT
              </label>
              <input
                type="text"
                value={footerCopyright}
                onChange={(e) => setFooterCopyright(e.target.value)}
                className="w-full bg-[#0A0908] border border-[#26211B] text-white p-3.5 rounded-xl outline-none font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3.5 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
          >
            Save Brand &amp; Navigation Settings ↗
          </button>
        </form>
      )}

      {/* ==================== TAB 6: PAGE ROUTE VISIBILITY ==================== */}
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
                    className="px-3.5 py-1.5 border border-[#D4AF37]/30 bg-[#1A1612] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors rounded-lg cursor-pointer"
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
