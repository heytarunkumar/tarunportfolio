import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

export const Navbar: React.FC = () => {
  const { profile, navigation, theme, toggleTheme } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0908]/92 backdrop-blur-md border-b border-[#26211B] py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        
        {/* Brand Identity */}
        <Link
          to="/"
          className="group flex items-center space-x-2.5 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#F5F2EB] hover:text-[#D4AF37] transition-colors focus:outline-none"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
          <span className="font-bold tracking-widest">{profile?.name || 'TARUN KUMAR'}</span>
          <span className="hidden md:inline-block text-[10px] font-mono text-[#8C6D4F] border-l border-[#26211B] pl-2 ml-1 font-normal lowercase">
            founder · ai
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden xl:flex items-center space-x-7 text-[11px] tracking-[0.18em] font-medium uppercase text-[#C4BCB3]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {activeNavItems.map((item) => (
            <NavLink
              key={item.id || item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative group py-1 transition-colors duration-200 focus:outline-none focus:text-[#D4AF37] ${
                  isActive ? 'text-[#D4AF37] font-semibold' : 'hover:text-[#FFF5EB]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 ${
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
          
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 sm:p-2.5 rounded-full border border-[#26211B] hover:border-[#D4AF37]/60 bg-[#12100E] text-[#F5F2EB] hover:text-[#D4AF37] transition-all duration-300 backdrop-blur-sm shadow-sm flex items-center justify-center cursor-pointer group"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#D4AF37] flex items-center justify-center"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
                  </svg>
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#9E7815] flex items-center justify-center"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.3 2a10 10 0 0 0-.19 2 10 10 0 0 0 10 10c.69 0 1.36-.07 2-.19A10 10 0 0 1 12.3 2z" />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center space-x-2 text-[10.5px] tracking-[0.18em] font-semibold uppercase py-2.5 px-5 rounded-full border border-[#26211B] hover:border-[#D4AF37]/60 bg-[#12100E] text-[#F5F2EB] hover:text-white transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.06)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] focus:outline-none cursor-pointer"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span>LET&apos;S CONNECT</span>
            <span className="text-xs text-[#D4AF37]">↗</span>
          </Link>

          {/* Hamburger Mobile Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="xl:hidden p-2 rounded-lg border border-[#26211B] bg-[#12100E] text-[#F5F2EB] hover:text-[#D4AF37] focus:outline-none cursor-pointer"
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
            className="xl:hidden bg-[#0A0908] border-b border-[#26211B] px-6 pt-4 pb-8 space-y-4 shadow-2xl"
          >
            <div className="flex flex-col space-y-3 pt-2">
              {activeNavItems.map((item) => (
                <NavLink
                  key={item.id || item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-xs tracking-[0.2em] font-medium uppercase py-2.5 border-b border-[#26211B] transition-colors ${
                      isActive ? 'text-[#D4AF37]' : 'text-[#C4BCB3] hover:text-[#D4AF37]'
                    }`
                  }
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            <div className="pt-4 flex flex-col space-y-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="w-full flex items-center justify-between py-3 px-4 rounded-xl border border-[#26211B] bg-[#12100E] text-xs font-mono uppercase text-[#F5F2EB]"
              >
                <span>THEME APPEARANCE</span>
                <span className="text-[#D4AF37] font-bold">
                  {theme === 'dark' ? '☀️ SWITCH TO LIGHT' : '🌙 SWITCH TO DARK'}
                </span>
              </button>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center space-x-2 text-xs tracking-[0.18em] font-semibold uppercase py-3.5 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908]"
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
