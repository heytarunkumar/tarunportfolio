import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileData } from '../../data/profile';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#work' },
  { name: 'Lab', href: '#lab' },
  { name: 'Research', href: '#research' },
  { name: 'Experience', href: '#experience' },
  { name: 'Writing', href: '#writing' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = navItems.map((item) => item.href.replace('#', ''));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05060A]/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 flex items-center justify-between">
        
        {/* Brand Logo Badge */}
        <a
          href="#"
          className="group flex items-center space-x-3 text-sm font-bold tracking-tight text-white focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
            <span className="font-mono text-cyan-400 font-bold text-base">TK</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#05060A] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
              {profileData.name}
            </span>
            <span className="text-[10px] font-mono text-slate-400 hidden sm:block">
              Python · Cloud &amp; DevOps
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 p-1.5 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center space-x-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all"
          >
            <span>Let&apos;s Connect</span>
            <span>↗</span>
          </a>

          {/* Hamburger Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2.5 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0A0D14]/95 border-b border-white/10 px-6 pt-4 pb-8 space-y-3 backdrop-blur-2xl shadow-2xl"
          >
            <div className="flex flex-col space-y-2 pt-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="pt-3">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center space-x-2 text-xs font-semibold py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
              >
                <span>Let&apos;s Connect ↗</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
