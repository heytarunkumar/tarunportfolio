import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
  { name: 'NAVIGATION', path: '/admin/navigation', icon: '🧭' },
  { name: 'SEO SETTINGS', path: '/admin/seo', icon: '🔍' },
  { name: 'DESIGN & MOTION', path: '/admin/design', icon: '🎨' },
  { name: 'RESUME ASSETS', path: '/admin/resume', icon: '💼' },
  { name: 'SYSTEM SETTINGS', path: '/admin/settings', icon: '⚙️' },
];

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] font-sans flex flex-col md:flex-row selection:bg-[#D4AF37]/30 selection:text-white">
      
      {/* Left Sidebar */}
      <aside className="w-full md:w-64 bg-[#0E0C0A] border-b md:border-b-0 md:border-r border-[#26211B] p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header Identity */}
          <div className="flex items-center space-x-3 pb-6 mb-6 border-b border-[#26211B]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
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
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1E1914] text-[#D4AF37] border border-[#D4AF37]/40 font-semibold shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                      : 'text-[#C4BCB3] hover:bg-[#141210] hover:text-white border border-transparent'
                  }`
                }
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-sm">{item.icon}</span>
                  <span className="tracking-wider block text-[11px]">{item.name}</span>
                </div>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User Info & Quick Links */}
        <div className="pt-6 mt-6 border-t border-[#26211B] space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[#8C6D4F] text-[11px]">
            <span>USER:</span>
            <span className="text-white font-medium">{username || 'heytarunkumar'}</span>
          </div>

          <Link
            to="/"
            target="_blank"
            className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl border border-[#26211B] bg-[#141210] hover:border-[#D4AF37]/60 text-[#D4AF37] text-[10.5px] uppercase tracking-wider transition-all"
          >
            <span>VIEW PUBLIC SITE ↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left py-2 px-3 text-[11px] text-red-400 hover:bg-red-950/30 rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
          >
            LOGOUT ↵
          </button>
        </div>
      </aside>

      {/* Main Admin Content Viewport */}
      <main className="flex-1 bg-[#0A0908] p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>

    </div>
  );
};

export default AdminLayout;
