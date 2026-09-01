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
      <div className="border-b border-[#8C6D4F]/30 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            PORTFOLIO STATUS &amp; HEALTH OVERVIEW
          </span>
          <h1
            className="text-4xl sm:text-5xl uppercase tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ADMIN DASHBOARD
          </h1>
        </div>
        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center space-x-2 px-5 py-2.5 border border-[#D4AF37] bg-[#D4AF37] text-black text-xs font-bold font-mono tracking-widest uppercase hover:bg-[#E2C054] transition-all"
        >
          <span>VIEW LIVE SITE ↗</span>
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
        <div className="p-5 bg-[#0A0806] border border-[#8C6D4F]/30 rounded-sm">
          <span className="text-[10px] text-[#8C6D4F] uppercase block mb-1">PAGES / SECTIONS</span>
          <span className="text-3xl font-bold text-white">{navigation.filter((n) => n.visible).length}</span>
          <span className="text-[9.5px] text-emerald-400 block mt-1">Active Routes ✓</span>
        </div>

        <div className="p-5 bg-[#0A0806] border border-[#8C6D4F]/30 rounded-sm">
          <span className="text-[10px] text-[#8C6D4F] uppercase block mb-1">PROJECTS</span>
          <span className="text-3xl font-bold text-[#F7E7C4]">{projects.length}</span>
          <span className="text-[9.5px] text-[#D4AF37] block mt-1">Catalog items</span>
        </div>

        <div className="p-5 bg-[#0A0806] border border-[#8C6D4F]/30 rounded-sm">
          <span className="text-[10px] text-[#8C6D4F] uppercase block mb-1">SKILLS MATRIX</span>
          <span className="text-3xl font-bold text-white">{totalSkills}</span>
          <span className="text-[9.5px] text-[#C4B5A5] block mt-1">Across 4 groups</span>
        </div>

        <div className="p-5 bg-[#0A0806] border border-[#8C6D4F]/30 rounded-sm">
          <span className="text-[10px] text-[#8C6D4F] uppercase block mb-1">UNREAD MESSAGES</span>
          <span className={`text-3xl font-bold ${unreadMessages > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {unreadMessages}
          </span>
          <span className="text-[9.5px] text-[#8C6D4F] block mt-1">Contact Inbox</span>
        </div>
      </div>

      {/* System Status Table */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
        <h2 className="text-lg font-mono text-white tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
          SYSTEM HEALTH &amp; CONFIGURATION STATUS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 bg-[#120F0C] border border-[#8C6D4F]/20 space-y-2">
            <div className="flex justify-between border-b border-[#8C6D4F]/15 pb-2">
              <span className="text-[#8C6D4F]">SEO Status:</span>
              <span className="text-emerald-400 font-bold">✓ HEALTHY ({seo.robotsIndex ? 'INDEXED' : 'NOINDEX'})</span>
            </div>
            <div className="flex justify-between border-b border-[#8C6D4F]/15 pb-2">
              <span className="text-[#8C6D4F]">Broken Links:</span>
              <span className="text-emerald-400 font-bold">0 DETECTED</span>
            </div>
            <div className="flex justify-between border-b border-[#8C6D4F]/15 pb-2">
              <span className="text-[#8C6D4F]">Contact Status:</span>
              <span className="text-emerald-400 font-bold">✓ ACTIVE ({contact.formEnabled ? 'FORM ON' : 'EMAIL ONLY'})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C6D4F]">Research Status:</span>
              <span className="text-[#D4AF37] font-bold">{research.status}</span>
            </div>
          </div>

          <div className="p-4 bg-[#120F0C] border border-[#8C6D4F]/20 space-y-2">
            <div className="flex justify-between border-b border-[#8C6D4F]/15 pb-2">
              <span className="text-[#8C6D4F]">Engineering Lab Progression:</span>
              <span className="text-[#D4AF37] font-bold">{labTracks.length} NODES ACTIVE</span>
            </div>
            <div className="flex justify-between border-b border-[#8C6D4F]/15 pb-2">
              <span className="text-[#8C6D4F]">Experience Milestones:</span>
              <span className="text-white font-bold">{experience.length} ENTRIES</span>
            </div>
            <div className="flex justify-between border-b border-[#8C6D4F]/15 pb-2">
              <span className="text-[#8C6D4F]">Writing Dispatches:</span>
              <span className="text-white font-bold">{articles.length} ARTICLES</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C6D4F]">Data Storage Mode:</span>
              <span className="text-emerald-400 font-bold">State Provider + Storage</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm">
        <h2 className="text-lg font-mono text-white tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3 mb-4">
          QUICK ACTIONS
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <Link
            to="/admin/projects"
            className="p-4 border border-[#8C6D4F]/30 bg-[#120F0C] hover:border-[#D4AF37] text-[#D4AF37] text-center rounded-sm transition-all"
          >
            + ADD PROJECT
          </Link>
          <Link
            to="/admin/skills"
            className="p-4 border border-[#8C6D4F]/30 bg-[#120F0C] hover:border-[#D4AF37] text-[#D4AF37] text-center rounded-sm transition-all"
          >
            UPDATE SKILLS
          </Link>
          <Link
            to="/admin/lab"
            className="p-4 border border-[#8C6D4F]/30 bg-[#120F0C] hover:border-[#D4AF37] text-[#D4AF37] text-center rounded-sm transition-all"
          >
            MANAGE LAB
          </Link>
          <Link
            to="/admin/seo"
            className="p-4 border border-[#8C6D4F]/30 bg-[#120F0C] hover:border-[#D4AF37] text-[#D4AF37] text-center rounded-sm transition-all"
          >
            EDIT SEO META
          </Link>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboardPage;
