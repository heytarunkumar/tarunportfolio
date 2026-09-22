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

  const handleNavClick = (_e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F4EEE4]/95 backdrop-blur-md border-b border-[#CFC3B3] py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 flex items-center justify-between">
        
        {/* Brand Identity */}
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="group flex items-center space-x-2.5 sm:space-x-3 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-colors focus:outline-none min-w-0 text-[#202020] hover:text-[#78000F]"
        >
          <div className="w-8 h-8 rounded-[3px] overflow-hidden bg-[#FAF8F3] p-1 border border-[#CFC3B3] shrink-0 group-hover:border-[#78000F] transition-all">
            <img
              src={profile.monogramUrl || "/images/brand/tarun-monogram-64.webp"}
              alt={`${profile.name || 'Tarun Kumar'} Logo`}
              width="32"
              height="32"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-serif font-bold text-sm sm:text-base tracking-[0.04em] leading-none truncate max-w-[140px] sm:max-w-none text-[#78000F]">
              {profile?.name || 'TARUN KUMAR'}
            </span>
            <span className="text-[9px] font-mono tracking-wider font-normal mt-0.5 truncate max-w-[140px] sm:max-w-none text-[#736B60]">
              {profile.brandRole || 'FOUNDER · AI & TECH'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-[11px] tracking-[0.18em] font-mono font-medium uppercase">
          {activeNavItems.map((item) => (
            <NavLink
              key={item.id || item.name}
              to={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
              className={({ isActive }) =>
                `relative group py-1 transition-colors duration-200 focus:outline-none ${
                  isActive
                    ? 'text-[#78000F] font-bold'
                    : 'text-[#555047] hover:text-[#78000F]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.name}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#78000F] transition-all duration-300 ${
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
            className="hidden sm:inline-flex items-center space-x-2 text-[10.5px] font-mono tracking-[0.18em] font-medium uppercase py-2.5 px-5 rounded-[4px] border border-[#111111] bg-[#111111] hover:bg-[#78000F] hover:border-[#78000F] text-[#F4EEE4] transition-all duration-300 shadow-sm focus:outline-none cursor-pointer"
          >
            <span>{profile.connectCtaText || "LET'S CONNECT"}</span>
            <span className="text-xs">→</span>
          </Link>

          {/* Sliding Theme Toggle Button */}
          <button
            type="button"
            role="switch"
            aria-checked={theme === 'dark'}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className={`w-14 h-8 rounded-full p-1 flex items-center transition-colors duration-300 border cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#78000F] relative select-none ${
              theme === 'dark'
                ? 'bg-[#141210] border-[#3D342B] justify-end shadow-inner'
                : 'bg-[#DDD2C2] border-[#CFC3B3] justify-start shadow-inner'
            }`}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`w-6 h-6 rounded-full flex items-center justify-center shadow-sm relative z-10 ${
                theme === 'dark'
                  ? 'bg-[#202020] border border-[#78000F] text-[#F4EEE4]'
                  : 'bg-[#FAF8F3] border border-[#CFC3B3] text-[#78000F]'
              }`}
            >
              {theme === 'dark' ? (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.3 2a10 10 0 0 0-.19 2 10 10 0 0 0 10 10c.69 0 1.36-.07 2-.19A10 10 0 0 1 12.3 2z" />
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
            className="lg:hidden w-9 h-9 rounded-[4px] border border-[#CFC3B3] bg-[#FAF8F3] text-[#202020] hover:text-[#78000F] hover:border-[#78000F] flex items-center justify-center transition-all duration-200 focus:outline-none cursor-pointer"
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
                  clipRule="evenodd"
                  d="M4 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            className="lg:hidden fixed inset-x-0 top-[65px] bg-[#FAF8F3] border-b border-[#CFC3B3] shadow-2xl z-40 p-6 max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              {activeNavItems.map((item, idx) => (
                <NavLink
                  key={item.id || item.name}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-2.5 text-sm font-mono tracking-[0.16em] uppercase border-b border-[#DDD2C2] ${
                      isActive ? 'text-[#78000F] font-bold' : 'text-[#38342E]'
                    }`
                  }
                >
                  <span>{item.name}</span>
                  <span className="text-xs text-[#8C8275]">0{idx + 1}</span>
                </NavLink>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <Link
                  to={profile.connectCtaLink || "/contact"}
                  onClick={(e) => handleNavClick(e, profile.connectCtaLink || '/contact')}
                  className="w-full text-center py-3 rounded-[4px] bg-[#111111] hover:bg-[#78000F] text-[#F4EEE4] text-xs font-mono tracking-[0.18em] uppercase transition-colors"
                >
                  {profile.connectCtaText || "LET'S CONNECT →"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
