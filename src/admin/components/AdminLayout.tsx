import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';

import { GmailService } from '../../services/gmailService';

const adminNavItems = [
  { name: 'DASHBOARD', path: '/admin/dashboard', icon: '📊' },
  { name: 'PAGES MANAGER', path: '/admin/pages', icon: '📄' },
  { name: 'PROJECTS', path: '/admin/projects', icon: '🚀' },
  { name: 'SKILLS MATRIX', path: '/admin/skills', icon: '⚡' },
  { name: 'ENGINEERING LAB', path: '/admin/lab', icon: '🧪' },
  { name: 'EXPERIENCE', path: '/admin/experience', icon: '📅' },
  { name: 'RESEARCH', path: '/admin/research', icon: '📑' },
  { name: 'WRITING', path: '/admin/writing', icon: '✍️' },
  { name: 'MEDIA LIBRARY', path: '/admin/media', icon: '🖼️' },
  { name: 'Mail Center', path: '/admin/mail', icon: '✉️' },
  { name: 'NAVIGATION', path: '/admin/navigation', icon: '🧭' },
  { name: 'SEO SETTINGS', path: '/admin/seo', icon: '🔍' },
  { name: 'DESIGN & MOTION', path: '/admin/design', icon: '🎨' },
  { name: 'CONTACT & INBOX', path: '/admin/contact', icon: '📬' },
  { name: 'RESUME ASSETS', path: '/admin/resume', icon: '💼' },
  { name: 'SYSTEM SETTINGS', path: '/admin/settings', icon: '⚙️' },
];

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { username, logout } = useAuth();
  const { contact } = usePortfolio();
  const navigate = useNavigate();

  const unreadMessages = contact.inboxMessages.filter((m) => !m.read).length;
  const gmailAccount = GmailService.getAccount();
  const unreadGmailCount = gmailAccount.unreadCount || 0;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#050403] text-[#E8DFD8] font-sans flex flex-col md:flex-row">
      
      {/* Left Sidebar */}
      <aside className="w-full md:w-64 bg-[#0A0806] border-b md:border-b-0 md:border-r border-[#8C6D4F]/30 p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header Identity */}
          <div className="flex items-center space-x-3 pb-6 mb-6 border-b border-[#8C6D4F]/30">
            <span className="w-3 h-3 rounded-full bg-[#D4AF37] animate-pulse" />
            <div>
              <h1 className="text-sm font-bold tracking-widest text-white uppercase font-mono">
                TARUN CMS
              </h1>
              <span className="text-[10px] text-[#8C6D4F] font-mono block">
                ADMIN CONTROL PANEL
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 font-mono text-xs">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-sm transition-all ${
                    isActive
                      ? 'bg-[#1E1914] text-[#D4AF37] border-l-2 border-[#D4AF37] font-semibold'
                      : 'text-[#C4B5A5] hover:bg-[#120F0C] hover:text-white'
                  }`
                }
              >
                <div className="flex items-center space-x-2.5">
                  <span>{item.icon}</span>
                  <div>
                    <span className="tracking-wider block">{item.name}</span>
                    {item.name === 'Mail Center' && (
                      <span className="text-[9px] text-[#8C6D4F] font-mono block -mt-0.5">
                        Connected to Gmail
                      </span>
                    )}
                  </div>
                </div>
                {item.name === 'Mail Center' && unreadGmailCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[9px] bg-amber-500 text-black font-bold rounded-full">
                    {unreadGmailCount}
                  </span>
                )}
                {item.name === 'CONTACT & INBOX' && unreadMessages > 0 && (
                  <span className="px-1.5 py-0.5 text-[9px] bg-red-600 text-white rounded-full font-bold">
                    {unreadMessages}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Info & Quick Links */}
        <div className="pt-6 mt-6 border-t border-[#8C6D4F]/30 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[#8C6D4F]">
            <span>USER:</span>
            <span className="text-white font-medium">{username || 'heytarunkumar'}</span>
          </div>

          <Link
            to="/"
            target="_blank"
            className="w-full inline-flex items-center justify-center space-x-2 py-2 px-3 border border-[#8C6D4F]/40 bg-[#120F0C] hover:border-[#D4AF37] text-[#D4AF37] text-[11px] uppercase tracking-wider transition-all"
          >
            <span>VIEW PUBLIC SITE ↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left py-2 px-3 text-[11px] text-red-400 hover:bg-red-950/30 uppercase tracking-wider transition-colors"
          >
            LOGOUT ↵
          </button>
        </div>
      </aside>

      {/* Main Admin Content Viewport */}
      <main className="flex-1 bg-[#050403] p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>

    </div>
  );
};

export default AdminLayout;
