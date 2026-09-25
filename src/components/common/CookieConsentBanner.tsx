import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  functional: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'tarun_cookie_consent_v1';

export const CookieConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    functional: true,
    timestamp: '',
  });

  useEffect(() => {
    // Check if consent has already been given
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setPreferences(parsed);
      } else {
        // Show banner after brief delay for smooth entrance
        const timer = setTimeout(() => setShowBanner(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      setShowBanner(true);
    }
  }, []);

  // Listen for custom event to open preferences modal from footer or cookies page
  useEffect(() => {
    const handleOpenPreferences = () => {
      setShowModal(true);
    };

    window.addEventListener('open_cookie_preferences', handleOpenPreferences);
    return () => window.removeEventListener('open_cookie_preferences', handleOpenPreferences);
  }, []);

  // Keyboard accessibility: Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      const finalPrefs = { ...prefs, essential: true, timestamp: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalPrefs));
      setPreferences(finalPrefs);
      setShowBanner(false);
      setShowModal(false);

      // Dispatch event for any analytics/telemetry scripts to respect choice
      window.dispatchEvent(new CustomEvent('cookie_consent_updated', { detail: finalPrefs }));
    } catch (e) {
      console.error('Failed to save cookie preferences', e);
    }
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      functional: true,
      timestamp: new Date().toISOString(),
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      functional: false,
      timestamp: new Date().toISOString(),
    });
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  return (
    <>
      {/* Floating Bottom Consent Banner */}
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.aside
            role="region"
            aria-label="Cookie and Privacy Consent"
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-50 bg-[#141210] border border-[#383229] text-[#F4EEE4] p-5 sm:p-6 rounded-[4px] shadow-2xl backdrop-blur-lg"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#D4AF37] uppercase font-bold">
                  PRIVACY &amp; COOKIE CONSENT
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#8C8275] bg-[#221F1B] px-2 py-0.5 rounded border border-[#383229]">
                DPDP &amp; GDPR READY
              </span>
            </div>

            <p className="text-xs text-[#C4BCB3] leading-relaxed mb-4 font-sans">
              We respect your digital privacy. This site uses strictly necessary cookies for core functionality and optional performance telemetry to refine the technical experience. We adhere to the <strong className="text-white font-medium">Digital Personal Data Protection (DPDP) Act 2023</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="btn-executive-primary px-4 py-2 text-[11px] font-mono font-bold tracking-wider uppercase cursor-pointer rounded-[2px]"
              >
                ACCEPT ALL
              </button>

              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-3.5 py-2 text-[11px] font-mono text-[#C4BCB3] hover:text-white bg-[#221F1B] hover:bg-[#2C2823] border border-[#383229] rounded-[2px] transition-colors cursor-pointer"
              >
                REJECT NON-ESSENTIAL
              </button>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-3.5 py-2 text-[11px] font-mono text-[#D4AF37] hover:text-[#E8C55E] underline underline-offset-4 transition-colors cursor-pointer"
              >
                PREFERENCES
              </button>

              <Link
                to="/privacy"
                className="text-[10.5px] font-mono text-[#8C8275] hover:text-[#C4BCB3] ml-auto transition-colors"
              >
                PRIVACY POLICY ↗
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Granular Cookie Preferences Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative w-full max-w-2xl bg-[#141210] border border-[#383229] rounded-[4px] p-6 sm:p-8 text-[#F4EEE4] shadow-2xl my-8 font-sans"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-5 border-b border-[#2B2620] mb-6">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D4AF37] font-bold">
                      CONSENT MANAGEMENT
                    </span>
                    <span className="text-[9px] font-mono text-[#8C8275] bg-[#221F1B] px-1.5 py-0.5 rounded border border-[#383229]">
                      DATA PRIVACY CONTROL
                    </span>
                  </div>
                  <h2 id="cookie-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Manage Cookie &amp; Data Preferences
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  aria-label="Close preferences modal"
                  className="text-[#8C8275] hover:text-white p-1 text-lg font-mono rounded transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#C4BCB3] leading-relaxed mb-6">
                Under the <strong>DPDP Act 2023</strong> (India) and global privacy standards (GDPR/CCPA), you maintain full control over the personal data and telemetry technologies utilized during your session. Configure your preferences below:
              </p>

              {/* Toggles Container */}
              <div className="space-y-4 mb-8">
                {/* 1. Strictly Necessary */}
                <div className="p-4 rounded-[3px] bg-[#1C1916] border border-[#383229] flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xs sm:text-sm font-semibold text-white">Strictly Necessary Cookies</h3>
                      <span className="text-[9px] font-mono font-bold uppercase text-[#0F6848] bg-[#E8F5EE]/10 border border-[#0F6848]/30 px-1.5 py-0.2 rounded">
                        ALWAYS ACTIVE
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A89E93] leading-relaxed">
                      Essential for navigation, network security, authentication, and core UI rendering. Cannot be disabled without breaking website operations.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    aria-label="Strictly Necessary Cookies (Always active)"
                    className="mt-1 w-4 h-4 rounded text-[#78000F] accent-[#78000F] cursor-not-allowed opacity-60"
                  />
                </div>

                {/* 2. Functional & UI Preferences */}
                <div className="p-4 rounded-[3px] bg-[#1C1916] border border-[#383229] flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xs sm:text-sm font-semibold text-white">Functional &amp; UI Preferences</h3>
                      <span className="text-[9px] font-mono text-[#C4BCB3] bg-[#2B2620] px-1.5 py-0.2 rounded">
                        LOCAL STORAGE
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A89E93] leading-relaxed">
                      Remembers your customized display theme (dark/light mode), volume levels, and interaction state across page reloads.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer mt-1">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                      aria-label="Functional and UI Preferences"
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#383229] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                  </label>
                </div>

                {/* 3. Performance & Analytics */}
                <div className="p-4 rounded-[3px] bg-[#1C1916] border border-[#383229] flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xs sm:text-sm font-semibold text-white">Aggregated Analytics &amp; Telemetry</h3>
                      <span className="text-[9px] font-mono text-[#C4BCB3] bg-[#2B2620] px-1.5 py-0.2 rounded">
                        ANONYMIZED
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A89E93] leading-relaxed">
                      Provides anonymized insights into page load speed, error frequency, and visitor traffic to help optimize performance. No advertising or cross-site tracking.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer mt-1">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      aria-label="Aggregated Analytics & Telemetry"
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#383229] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-[#2B2620]">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSaveCustom}
                    className="btn-executive-primary px-5 py-2.5 text-xs font-mono font-bold tracking-wider uppercase cursor-pointer rounded-[2px]"
                  >
                    SAVE PREFERENCES
                  </button>

                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-4 py-2.5 text-xs font-mono text-white bg-[#221F1B] hover:bg-[#2C2823] border border-[#383229] rounded-[2px] transition-colors cursor-pointer"
                  >
                    ACCEPT ALL
                  </button>

                  <button
                    type="button"
                    onClick={handleRejectNonEssential}
                    className="px-4 py-2.5 text-xs font-mono text-[#A89E93] hover:text-white transition-colors cursor-pointer"
                  >
                    REJECT ALL OPTIONAL
                  </button>
                </div>

                <Link
                  to="/cookies"
                  onClick={() => setShowModal(false)}
                  className="text-xs font-mono text-[#D4AF37] hover:underline"
                >
                  DETAILED COOKIE POLICY →
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
