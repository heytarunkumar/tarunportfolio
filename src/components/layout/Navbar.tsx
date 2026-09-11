import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

export const Navbar: React.FC = () => {
  const { profile, navigation, theme, toggleTheme } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const activeNavItems = navigation
    ? [...navigation].filter((item) => item.visible).sort((a, b) => a.order - b.order)
    : [
        { id: '1', name: 'HOME', path: '/', visible: true, order: 1 },
        { id: '2', name: 'ABOUT', path: '/about', visible: true, order: 2 },
        { id: '3', name: 'PROJECTS', path: '/projects', visible: true, order: 3 },
        { id: '4', name: 'LAB', path: '/lab', visible: true, order: 4 },
        { id: '5', name: 'RESEARCH', path: '/research', visible: true, order: 5 },
        { id: '6', name: 'EXPERIENCE', path: '/experience', visible: true, order: 6 },
        { id: '7', name: 'CONTACT', path: '/contact', visible: true, order: 7 },
      ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    const isHomePage = location.pathname === '/';
    const sectionId = path.replace('/', '');

    if (isHomePage) {
      if (path === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileMenuOpen(false);
        return;
      }

      if (sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
          setMobileMenuOpen(false);
          return;
        }
      }
    }

    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'dark'
            ? 'bg-[#0A0908]/92 backdrop-blur-md border-b border-[#26211B] py-3.5 shadow-2xl'
            : 'bg-[#FAF8F5]/92 backdrop-blur-md border-b border-[#E2DBD0] py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 2xl:px-20 flex items-center justify-between">
        
        {/* Brand Identity */}
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, '/')}
          className={`group flex items-center space-x-3 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-colors focus:outline-none ${
            theme === 'dark' ? 'text-[#F5F2EB] hover:text-[#D4AF37]' : 'text-[#171513] hover:text-[#9E7815]'
          }`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-white p-0.5 border border-[#D4AF37]/50 shadow-[0_0_12px_rgba(212,175,55,0.25)] shrink-0 group-hover:scale-105 transition-transform">
            <img
              src={profile.monogramUrl || "/images/brand/tarun-monogram.png"}
              alt={`${profile.name || 'Tarun Kumar'} Logo`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-widest leading-none">{profile?.name || 'TARUN KUMAR'}</span>
            <span className={`text-[9.5px] font-mono tracking-wider font-normal mt-0.5 ${
              theme === 'dark' ? 'text-[#8C6D4F]' : 'text-[#736250]'
            }`}>
              {profile.brandRole || 'FOUNDER · AI & TECH'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden lg:flex items-center space-x-6 xl:space-x-9 text-[11px] tracking-[0.18em] font-medium uppercase"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {activeNavItems.map((item) => (
            <NavLink
              key={item.id || item.name}
              to={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
                className={({ isActive }) =>
                  `relative group py-1 transition-colors duration-200 focus:outline-none ${
                    isActive
                      ? theme === 'dark'
                        ? 'text-[#D4AF37] font-semibold'
                        : 'text-[#9E7815] font-semibold'
                      : theme === 'dark'
                      ? 'text-[#C4BCB3] hover:text-[#FFF5EB]'
                      : 'text-[#4A443C] hover:text-[#171513]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.name}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-[#D4AF37] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
          ))}
        </nav>

        {/* Action Button, Theme Toggle & Mobile Toggle */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          
          {/* Connect Button */}
          <Link
            to={profile.connectCtaLink || "/contact"}
            onClick={(e) => handleNavClick(e, profile.connectCtaLink || '/contact')}
            className={`hidden sm:inline-flex items-center space-x-2 text-[10.5px] tracking-[0.18em] font-semibold uppercase py-2.5 px-5 rounded-full border transition-all duration-300 backdrop-blur-sm focus:outline-none cursor-pointer ${
              theme === 'dark'
                ? 'border-[#26211B] hover:border-[#D4AF37]/60 bg-[#12100E] text-[#F5F2EB] hover:text-white shadow-[0_0_15px_rgba(212,175,55,0.06)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                : 'border-[#D5CEBF] hover:border-[#9E7815] bg-white text-[#171513] hover:text-[#9E7815] shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_16px_rgba(158,120,21,0.2)]'
            }`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span>{profile.connectCtaText || "LET'S CONNECT"}</span>
            <span className={`text-xs ${theme === 'dark' ? 'text-[#D4AF37]' : 'text-[#9E7815]'}`}>↗</span>
          </Link>

          {/* Sliding Theme Toggle Button (Right of Let's Connect) */}
          <button
            type="button"
            role="switch"
            aria-checked={theme === 'dark'}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
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

          {/* Hamburger Mobile Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className={`lg:hidden w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 focus:outline-none cursor-pointer ${
              theme === 'dark'
                ? 'border-[#26211B] bg-[#12100E] text-[#F5F2EB] hover:text-[#D4AF37] hover:border-[#D4AF37]/40'
                : 'border-[#D5CEBF] bg-white text-[#171513] hover:text-[#9E7815] hover:border-[#9E7815]'
            }`}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:hidden border-b px-6 pt-4 pb-8 space-y-4 shadow-2xl backdrop-blur-xl ${
              theme === 'dark'
                ? 'bg-[#0A0908]/98 border-[#26211B]'
                : 'bg-[#FAF8F5]/98 border-[#E2DBD0]'
            }`}
          >
            <div className="flex flex-col space-y-2 pt-2">
              {activeNavItems.map((item) => (
                <NavLink
                  key={item.id || item.name}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={({ isActive }) =>
                    `text-xs tracking-[0.2em] font-medium uppercase py-3 border-b transition-colors flex items-center justify-between ${
                      theme === 'dark' ? 'border-[#26211B]' : 'border-[#E2DBD0]'
                    } ${
                      isActive
                        ? theme === 'dark'
                          ? 'text-[#D4AF37] font-semibold'
                          : 'text-[#9E7815] font-semibold'
                        : theme === 'dark'
                        ? 'text-[#C4BCB3] hover:text-[#D4AF37]'
                        : 'text-[#4A443C] hover:text-[#9E7815]'
                    }`
                  }
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  <span>{item.name}</span>
                  <span className="text-[10px] opacity-40">›</span>
                </NavLink>
              ))}
            </div>

            <div className="pt-4 flex flex-col space-y-3">
              <div
                onClick={toggleTheme}
                role="switch"
                aria-checked={theme === 'dark'}
                className={`w-full flex items-center justify-between py-3 px-4 rounded-xl border text-xs font-mono uppercase transition-all duration-200 cursor-pointer ${
                  theme === 'dark'
                    ? 'border-[#3D342B] bg-[#161310] text-[#F5F2EB]'
                    : 'border-[#D5CEBF] bg-white text-[#171513]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-sm">{theme === 'dark' ? '☀️' : '🌙'}</span>
                  <span className="tracking-wider">{theme === 'dark' ? 'DARK THEME' : 'LIGHT THEME'}</span>
                </div>
                
                {/* Mini Sliding Switch */}
                <div
                  className={`w-12 h-6 rounded-full p-0.5 flex items-center transition-colors duration-300 border relative ${
                    theme === 'dark'
                      ? 'bg-[#141210] border-[#3D342B] justify-end'
                      : 'bg-[#EDE7DC] border-[#D5CEBF] justify-start'
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

              <Link
                to="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                className="w-full inline-flex items-center justify-center space-x-2 text-xs tracking-[0.18em] font-semibold uppercase py-3.5 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] shadow-[0_4px_20px_rgba(212,175,55,0.25)] cursor-pointer"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span>LET&apos;S CONNECT ↗</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
