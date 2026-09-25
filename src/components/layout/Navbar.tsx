import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

export const Navbar: React.FC = () => {
  const { profile, navigation } = usePortfolio();
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
          ? 'bg-[#0A0908]/92 backdrop-blur-md border-b border-[#26211B] py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 flex items-center justify-between">
        
        {/* Brand Identity */}
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="group flex items-center space-x-2.5 sm:space-x-3 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-colors focus:outline-none min-w-0 text-[#F5F2EB] hover:text-[#D4AF37]"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden bg-[#12100E] p-1 border border-[#26211B] shrink-0 group-hover:border-[#D4AF37]/60 group-hover:shadow-[0_0_12px_rgba(212,175,55,0.25)] transition-all">
            <img
              src={profile.monogramUrl || "/images/brand/tarun-monogram-64.webp"}
              alt={`${profile.name || 'Tarun Kumar'} Logo`}
              width="36"
              height="36"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-serif font-bold text-sm sm:text-base tracking-[0.04em] leading-none truncate max-w-[140px] sm:max-w-none text-white group-hover:text-[#D4AF37] transition-colors">
              {profile?.name || 'TARUN KUMAR'}
            </span>
            <span className="text-[9px] font-mono tracking-wider font-normal mt-0.5 truncate max-w-[140px] sm:max-w-none text-[#8C6D4F]">
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
                    ? 'text-[#D4AF37] font-semibold'
                    : 'text-[#C4BCB3] hover:text-[#D4AF37]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.name}</span>
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

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          
          {/* Connect Button */}
          <Link
            to={profile.connectCtaLink || "/contact"}
            onClick={(e) => handleNavClick(e, profile.connectCtaLink || '/contact')}
            className="hidden sm:inline-flex items-center space-x-2 text-[10.5px] font-mono tracking-[0.18em] font-semibold uppercase py-2.5 px-5 rounded-xl border border-[#D4AF37]/60 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] hover:from-[#E5C358] hover:to-[#D4AF37] text-[#0A0908] transition-all duration-300 shadow-[0_2px_15px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_22px_rgba(212,175,55,0.4)] focus:outline-none cursor-pointer"
          >
            <span>{profile.connectCtaText || "LET'S CONNECT"}</span>
            <span className="text-xs">↗</span>
          </Link>

          {/* Hamburger Mobile Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-10 h-10 rounded-xl border border-[#26211B] bg-[#12100E] text-[#F5F2EB] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 flex items-center justify-center transition-all duration-200 focus:outline-none cursor-pointer"
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed inset-x-0 top-[65px] bg-[#0A0908]/98 border-b border-[#26211B] shadow-2xl z-40 p-6 max-h-[85vh] overflow-y-auto backdrop-blur-xl"
          >
            <div className="flex flex-col space-y-3">
              {activeNavItems.map((item, idx) => (
                <NavLink
                  key={item.id || item.name}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-2.5 text-xs font-mono tracking-[0.18em] uppercase border-b border-[#26211B] ${
                      isActive ? 'text-[#D4AF37] font-bold' : 'text-[#C4BCB3] hover:text-[#D4AF37]'
                    }`
                  }
                >
                  <span>{item.name}</span>
                  <span className="text-xs text-[#8C6D4F]">0{idx + 1}</span>
                </NavLink>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <Link
                  to={profile.connectCtaLink || "/contact"}
                  onClick={(e) => handleNavClick(e, profile.connectCtaLink || '/contact')}
                  className="w-full text-center py-3.5 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] text-xs font-mono tracking-[0.18em] font-bold uppercase transition-all shadow-[0_2px_15px_rgba(212,175,55,0.25)]"
                >
                  {profile.connectCtaText || "LET'S CONNECT ↗"}
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
