import React from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';

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
  const { theme, toggleTheme } = usePortfolio();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const currentNav = adminNavItems.find((item) => item.path === location.pathname) || {
    name: 'ADMIN CONTROL PANEL',
    icon: '⚡',
  };

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] font-sans flex flex-col md:flex-row selection:bg-[#D4AF37]/30 selection:text-white">
      
      {/* Left Sidebar */}
      <aside className="w-full md:w-64 bg-[#0E0C0A] border-b md:border-b-0 md:border-r border-[#26211B] p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header Identity */}
          <div className="flex items-center space-x-3 pb-5 mb-5 border-b border-[#26211B]">
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

        {/* User Info, Sliding Theme Toggle & Quick Links */}
        <div className="pt-5 mt-5 border-t border-[#26211B] space-y-3 font-mono text-xs">
          
          {/* Sidebar Sliding Theme Switcher */}
          <div
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label="Toggle admin light/dark mode"
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#26211B] bg-[#141210] hover:border-[#D4AF37]/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <span className="text-xs">{theme === 'dark' ? '🌙' : '☀️'}</span>
              <span className="text-[10.5px] text-[#C4BCB3] tracking-wider uppercase font-medium">
                {theme === 'dark' ? 'DARK CMS' : 'LIGHT CMS'}
              </span>
            </div>

            {/* Sliding Pill Toggle */}
            <div
              className={`w-12 h-6 rounded-full p-0.5 flex items-center transition-colors duration-300 border relative select-none ${
                theme === 'dark'
                  ? 'bg-[#0A0908] border-[#3D342B] justify-end shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]'
                  : 'bg-[#EDE7DC] border-[#D5CEBF] justify-start shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]'
              }`}
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`w-5 h-5 rounded-full flex items-center justify-center shadow-sm ${
                  theme === 'dark'
                    ? 'bg-[#241F1A] border border-[#D4AF37]/60 text-[#F5C542]'
                    : 'bg-white border border-[#D5CEBF] text-[#9E7815]'
                }`}
              >
                {theme === 'dark' ? (
                  <span className="text-[9px]">☀️</span>
                ) : (
                  <span className="text-[9px]">🌙</span>
                )}
              </motion.div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[#8C6D4F] text-[11px] px-1">
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

      {/* Main Admin Content Viewport with Header Bar */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar with Separate Sliding Toggle Switch */}
        <header className="sticky top-0 z-30 bg-[#0E0C0A]/95 backdrop-blur-md border-b border-[#26211B] px-6 sm:px-10 py-3.5 flex items-center justify-between shadow-sm">
          
          {/* Breadcrumb / Current Module Title */}
          <div className="flex items-center space-x-2.5">
            <span className="text-base">{currentNav.icon}</span>
            <span className="text-xs font-mono text-[#D4AF37] font-bold tracking-widest uppercase">
              {currentNav.name}
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono text-[#8C6D4F] border-l border-[#26211B] pl-2 ml-1">
              CMS V2.4
            </span>
          </div>

          {/* Right Header Actions: Sliding Toggle + Public Link */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Dedicated Sliding Theme Switch in Top Bar */}
            <div className="flex items-center space-x-2.5">
              <span className="hidden md:inline-block text-[10.5px] font-mono text-[#8C6D4F] uppercase tracking-wider">
                APPEARANCE:
              </span>
              
              <button
                type="button"
                role="switch"
                aria-checked={theme === 'dark'}
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode in Admin`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className={`w-14 h-8 rounded-full p-1 flex items-center transition-colors duration-300 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37] relative select-none ${
                  theme === 'dark'
                    ? 'bg-[#141210] border-[#3D342B] justify-end shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]'
                    : 'bg-[#EDE7DC] border-[#D5CEBF] justify-start shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)]'
                }`}
              >
                {/* Ambient background icons */}
                <div className="absolute inset-0 px-2 flex items-center justify-between pointer-events-none text-[10px]">
                  <span className={`transition-opacity duration-200 ${theme === 'light' ? 'opacity-0' : 'opacity-40 text-[#D4AF37]'}`}>
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" />
                    </svg>
                  </span>
                  <span className={`transition-opacity duration-200 ${theme === 'dark' ? 'opacity-0' : 'opacity-40 text-[#8C6D4F]'}`}>
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M12.3 2a10 10 0 0 0-.19 2 10 10 0 0 0 10 10c.69 0 1.36-.07 2-.19A10 10 0 0 1 12.3 2z" />
                    </svg>
                  </span>
                </div>

                {/* Sliding thumb knob */}
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md relative z-10 ${
                    theme === 'dark'
                      ? 'bg-[#241F1A] border border-[#D4AF37]/60 text-[#F5C542] shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
                      : 'bg-white border border-[#D5CEBF] text-[#9E7815] shadow-[0_2px_8px_rgba(0,0,0,0.18)]'
                  }`}
                >
                  {theme === 'dark' ? (
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="4" fill="#F5C542" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                  ) : (
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </motion.div>
              </button>
            </div>

            {/* Public Site Quick Link */}
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[#26211B] hover:border-[#D4AF37]/50 bg-[#12100E] text-[10.5px] font-mono text-[#C4BCB3] hover:text-white transition-all"
            >
              <span>PUBLIC SITE</span>
              <span className="text-[#D4AF37]">↗</span>
            </Link>

          </div>
        </header>

        {/* Main Admin Page Content */}
        <main className="flex-1 bg-[#0A0908] p-6 sm:p-10 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
