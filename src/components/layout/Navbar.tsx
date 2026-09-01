import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

export const Navbar: React.FC = () => {
  const { profile, navigation } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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
        { id: '4', name: 'ENGINEERING LAB', path: '/lab', visible: true, order: 4 },
        { id: '5', name: 'RESEARCH', path: '/research', visible: true, order: 5 },
        { id: '6', name: 'EXPERIENCE', path: '/experience', visible: true, order: 6 },
        { id: '7', name: 'CONTACT', path: '/contact', visible: true, order: 7 },
      ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-[#8C6D4F]/30 py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between">
        
        {/* Brand Identity */}
        <Link
          to="/"
          className="group flex items-center space-x-2 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#EAD8C7] hover:text-[#D4AF37] transition-colors focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] group-hover:animate-ping" />
          <span>{profile?.name || 'TARUN KUMAR'}</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden xl:flex items-center space-x-6 text-[10.5px] tracking-[0.24em] font-light uppercase text-[#C4B5A5]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {activeNavItems.map((item) => (
            <NavLink
              key={item.id || item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative group py-1 transition-colors duration-300 focus:outline-none focus:text-[#D4AF37] ${
                  isActive ? 'text-[#D4AF37] font-medium' : 'hover:text-[#FFF5EB]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-[#D4AF37] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center space-x-2 text-[10.5px] tracking-[0.22em] font-medium uppercase py-2 px-4 border border-[#8C6D4F]/50 hover:border-[#D4AF37] bg-[#120F0C]/80 text-[#EAD8C7] hover:text-[#FFF5EB] transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.1)] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>LET&apos;S CONNECT</span>
            <span className="text-xs">↗</span>
          </Link>

          {/* Hamburger Mobile Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="xl:hidden p-2 text-[#EAD8C7] hover:text-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
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
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="xl:hidden bg-[#0A0806] border-b border-[#8C6D4F]/40 px-6 pt-4 pb-8 space-y-4 shadow-2xl"
          >
            <div className="flex flex-col space-y-3 pt-2">
              {activeNavItems.map((item) => (
                <NavLink
                  key={item.id || item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-xs tracking-[0.25em] font-medium uppercase py-2 border-b border-[#8C6D4F]/15 transition-colors ${
                      isActive ? 'text-[#D4AF37]' : 'text-[#C4B5A5] hover:text-[#D4AF37]'
                    }`
                  }
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center space-x-2 text-xs tracking-[0.22em] font-medium uppercase py-3 border border-[#8C6D4F] bg-[#120F0C] text-[#EAD8C7] hover:border-[#D4AF37]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
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
