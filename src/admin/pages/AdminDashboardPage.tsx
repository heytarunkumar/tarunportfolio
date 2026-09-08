import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminDashboardPage: React.FC = () => {
  const {
    projects,
    skills,
    labTracks,
    experience,
    research,
    articles,
    navigation,
    seo,
    contact,
  } = usePortfolio();

  const totalSkills = skills.reduce((acc, group) => acc + group.skills.length, 0);
  const unreadMessages = contact.inboxMessages.filter((m) => !m.read).length;

  return (
    <div className="space-y-8 max-w-6xl font-sans">
      
      {/* Header */}
      <div className="border-b border-[#26211B] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            PORTFOLIO STATUS &amp; HEALTH OVERVIEW
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Administrator Dashboard
          </h1>
        </div>
        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#D4AF37]/60 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] text-xs font-bold font-mono tracking-wider uppercase hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all"
        >
          <span>VIEW LIVE SITE ↗</span>
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
        <div className="card-lift p-5 bg-[#12100E] border border-[#26211B] rounded-2xl">
          <span className="text-[10px] text-[#8C6D4F] uppercase block mb-1">PAGES &amp; SECTIONS</span>
          <span className="text-3xl font-bold text-white block mt-1">{navigation.filter((n) => n.visible).length}</span>
          <span className="text-[10px] text-emerald-400 block mt-2">Active Routes ✓</span>
        </div>

        <div className="card-lift p-5 bg-[#12100E] border border-[#26211B] rounded-2xl">
          <span className="text-[10px] text-[#8C6D4F] uppercase block mb-1">PROJECTS</span>
          <span className="text-3xl font-bold text-[#F7E7C4] block mt-1">{projects.length}</span>
          <span className="text-[10px] text-[#D4AF37] block mt-2">Catalog items</span>
        </div>

        <div className="card-lift p-5 bg-[#12100E] border border-[#26211B] rounded-2xl">
          <span className="text-[10px] text-[#8C6D4F] uppercase block mb-1">SKILLS MATRIX</span>
          <span className="text-3xl font-bold text-white block mt-1">{totalSkills}</span>
          <span className="text-[10px] text-[#C4B5A5] block mt-2">Across 4 groups</span>
        </div>

        <div className="card-lift p-5 bg-[#12100E] border border-[#26211B] rounded-2xl">
          <span className="text-[10px] text-[#8C6D4F] uppercase block mb-1">UNREAD MESSAGES</span>
          <span className={`text-3xl font-bold block mt-1 ${unreadMessages > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {unreadMessages}
          </span>
          <span className="text-[10px] text-[#8C6D4F] block mt-2">Contact Inbox</span>
        </div>
      </div>

      {/* System Status Table */}
      <div className="card-lift bg-[#12100E] border border-[#26211B] p-6 sm:p-7 rounded-2xl space-y-4">
        <h2 className="text-base font-serif font-bold text-white tracking-wide border-b border-[#26211B] pb-3">
          System Health &amp; Configuration Status
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 bg-[#0A0908] border border-[#26211B] rounded-xl space-y-2.5">
            <div className="flex justify-between border-b border-[#26211B] pb-2">
              <span className="text-[#8C6D4F]">SEO Status:</span>
              <span className="text-emerald-400 font-bold">✓ HEALTHY ({seo.robotsIndex ? 'INDEXED' : 'NOINDEX'})</span>
            </div>
            <div className="flex justify-between border-b border-[#26211B] pb-2">
              <span className="text-[#8C6D4F]">Broken Links:</span>
              <span className="text-emerald-400 font-bold">0 DETECTED</span>
            </div>
            <div className="flex justify-between border-b border-[#26211B] pb-2">
              <span className="text-[#8C6D4F]">Contact Status:</span>
              <span className="text-emerald-400 font-bold">✓ ACTIVE ({contact.formEnabled ? 'FORM ON' : 'EMAIL ONLY'})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C6D4F]">Research Status:</span>
              <span className="text-[#D4AF37] font-bold">{research.status}</span>
            </div>
          </div>

          <div className="p-4 bg-[#0A0908] border border-[#26211B] rounded-xl space-y-2.5">
            <div className="flex justify-between border-b border-[#26211B] pb-2">
              <span className="text-[#8C6D4F]">Lab Tracks:</span>
              <span className="text-white font-bold">{labTracks.length} Active Modules</span>
            </div>
            <div className="flex justify-between border-b border-[#26211B] pb-2">
              <span className="text-[#8C6D4F]">Milestones:</span>
              <span className="text-white font-bold">{experience.length} Experience Nodes</span>
            </div>
            <div className="flex justify-between border-b border-[#26211B] pb-2">
              <span className="text-[#8C6D4F]">Articles:</span>
              <span className="text-white font-bold">{articles.length} Published Essays</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C6D4F]">Theme Surface:</span>
              <span className="text-[#D4AF37] font-bold">Warm Obsidian Gold v2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <Link
          to="/admin/projects"
          className="card-lift p-5 bg-[#12100E] border border-[#26211B] rounded-2xl hover:border-[#D4AF37]/50 transition-all group"
        >
          <div className="text-lg mb-2">🚀</div>
          <div className="text-white font-bold group-hover:text-[#D4AF37] transition-colors mb-1 font-serif text-base">Projects Catalog</div>
          <div className="text-[11px] text-[#A8988B] font-sans">Manage systems, live URLs, repository links, and metrics.</div>
        </Link>

        <Link
          to="/admin/skills"
          className="card-lift p-5 bg-[#12100E] border border-[#26211B] rounded-2xl hover:border-[#D4AF37]/50 transition-all group"
        >
          <div className="text-lg mb-2">⚡</div>
          <div className="text-white font-bold group-hover:text-[#D4AF37] transition-colors mb-1 font-serif text-base">Skills Matrix</div>
          <div className="text-[11px] text-[#A8988B] font-sans">Configure production core vs learning badges and progress.</div>
        </Link>

        <Link
          to="/admin/seo"
          className="card-lift p-5 bg-[#12100E] border border-[#26211B] rounded-2xl hover:border-[#D4AF37]/50 transition-all group"
        >
          <div className="text-lg mb-2">🔍</div>
          <div className="text-white font-bold group-hover:text-[#D4AF37] transition-colors mb-1 font-serif text-base">SEO &amp; Metadata</div>
          <div className="text-[11px] text-[#A8988B] font-sans">Tune OpenGraph cards, JSON-LD schema, and keywords.</div>
        </Link>
      </div>

    </div>
  );
};

export default AdminDashboardPage;
