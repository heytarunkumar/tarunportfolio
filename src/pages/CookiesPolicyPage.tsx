import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { SITE_CONFIG } from '../config/site';

export const CookiesPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenConsentManager = () => {
    window.dispatchEvent(new CustomEvent('open_cookie_preferences'));
  };

  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#202020] font-sans selection:bg-[#78000F] selection:text-[#F4EEE4] pt-28 sm:pt-32 pb-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <SEO
        title="Cookie &amp; Tracking Policy"
        description="Comprehensive Cookie, Local Storage, and Telemetry Policy for Tarun Kumar's portfolio and affiliated developer platforms."
        path="/cookies"
      />
      <div className="max-w-4xl mx-auto">
        
        {/* Header Eyebrow & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="mb-12 sm:mb-16 border-b border-[#DDD2C2] pb-8 sm:pb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F]">
              TELEMETRY &amp; TRACKING POLICY
            </span>
            <span className="text-[10px] font-mono bg-[#E8F5EE] border border-[#B5DFCA] text-[#0F6848] px-2.5 py-0.5 rounded font-semibold uppercase">
              TRANSPARENT PRIVACY
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111111] leading-[1.08] tracking-[-0.03em] mb-4">
            Cookie &amp; Tracking Policy
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[#736B60]">
            Effective Date: September 2026 • Compliant with DPDP Act 2023 &amp; Global ePrivacy Standards
          </p>
        </motion.div>

        {/* Content Body */}
        <div className="space-y-12 text-sm sm:text-base leading-relaxed text-[#38342E]">

          {/* Quick Action: Open Preferences */}
          <div className="p-6 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-serif font-bold text-[#111111] mb-1">
                Your Active Consent Status
              </h2>
              <p className="text-xs text-[#555047]">
                You can review, modify, or revoke your cookie choices at any time.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenConsentManager}
              className="btn-executive-primary px-5 py-2.5 text-xs font-mono font-bold tracking-wider uppercase cursor-pointer shrink-0"
            >
              OPEN CONSENT MANAGER ⚙
            </button>
          </div>

          {/* Section 1: What Are Cookies */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              1. What Are Cookies and Local Storage?
            </h2>
            <p>
              Cookies are small text files stored in your web browser by websites you visit. Similar technologies include HTML5 Local Storage, Session Storage, and browser cache. These mechanisms allow web applications to maintain state, recognize security tokens, and provide a continuous user experience without requiring repeated configuration.
            </p>
            <p>
              On <strong>Tarun Kumar's portfolio</strong> (<a href={SITE_CONFIG.url} className="text-[#78000F] underline">{SITE_CONFIG.url}</a>), we minimize the use of tracking technologies to the absolute minimum necessary for security and seamless user experience.
            </p>
          </section>

          {/* Section 2: Categories of Storage & Cookies Used */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              2. Categories of Cookies &amp; Storage Used
            </h2>

            <div className="space-y-4 pt-2">
              {/* Category A */}
              <div className="p-5 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3]">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-serif font-bold text-[#111111] text-base">
                    A. Strictly Necessary &amp; Security Cookies
                  </h3>
                  <span className="text-[9.5px] font-mono bg-[#E8F5EE] border border-[#B5DFCA] text-[#0F6848] px-2 py-0.5 rounded font-semibold uppercase">
                    MANDATORY / ALWAYS ON
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#555047] mb-3">
                  Required for core website infrastructure, routing, CSRF prevention, and CDN asset delivery. Without these, the site cannot function safely.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs text-[#38342E] border-collapse">
                    <thead>
                      <tr className="border-b border-[#DDD2C2] text-[#78000F]">
                        <th className="py-2 pr-4">Key / Name</th>
                        <th className="py-2 pr-4">Provider</th>
                        <th className="py-2 pr-4">Purpose</th>
                        <th className="py-2">Lifespan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EADFCF]">
                      <tr>
                        <td className="py-2 pr-4 font-bold">__cf_bm / _vercel</td>
                        <td className="py-2 pr-4">Vercel / Cloudflare</td>
                        <td className="py-2 pr-4">DDoS protection &amp; bot traffic defense</td>
                        <td className="py-2">Session / 30 mins</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-bold">tarun_cookie_consent_v1</td>
                        <td className="py-2 pr-4">Local Storage</td>
                        <td className="py-2 pr-4">Stores your explicit privacy &amp; cookie preferences</td>
                        <td className="py-2">12 Months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Category B */}
              <div className="p-5 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3]">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-serif font-bold text-[#111111] text-base">
                    B. Functional &amp; User Interface Preferences
                  </h3>
                  <span className="text-[9.5px] font-mono bg-[#FAF0E6] border border-[#E8D0B8] text-[#8C581E] px-2 py-0.5 rounded font-semibold uppercase">
                    OPTIONAL / LOCAL
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#555047] mb-3">
                  Remembers personal presentation preferences such as color scheme mode to avoid visual jarring on subsequent page loads.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs text-[#38342E] border-collapse">
                    <thead>
                      <tr className="border-b border-[#DDD2C2] text-[#78000F]">
                        <th className="py-2 pr-4">Key / Name</th>
                        <th className="py-2 pr-4">Provider</th>
                        <th className="py-2 pr-4">Purpose</th>
                        <th className="py-2">Lifespan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EADFCF]">
                      <tr>
                        <td className="py-2 pr-4 font-bold">tarun_portfolio_theme</td>
                        <td className="py-2 pr-4">Local Storage</td>
                        <td className="py-2 pr-4">Preserves chosen light/dark editorial theme</td>
                        <td className="py-2">Persistent (Client)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Category C */}
              <div className="p-5 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3]">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-serif font-bold text-[#111111] text-base">
                    C. Aggregated Performance &amp; Analytics (Telemetry)
                  </h3>
                  <span className="text-[9.5px] font-mono bg-[#EBF3FB] border border-[#BBD5F2] text-[#1E5F99] px-2 py-0.5 rounded font-semibold uppercase">
                    GATED / CONSENT REQUIRED
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#555047]">
                  Aggregated telemetry helps diagnose frontend performance bottlenecks, Core Web Vitals, and load latency. We do not use third-party behavioral advertising or cross-site tracking cookies.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Third-Party Embeds & Privacy */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              3. Third-Party Embeds &amp; External Integrations
            </h2>
            <p>
              When viewing external links or embedded assets (such as GitHub repositories, research PDFs, YouTube videos, or Google Fonts), these external services may set their own tracking technologies according to their independent privacy policies:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li><strong>Google Fonts:</strong> Served via optimized Google CDN domains (<code>fonts.googleapis.com</code>) without tracking cookies.</li>
              <li><strong>GitHub &amp; External Links:</strong> All external hyperlinks are marked with <code>rel="noopener noreferrer"</code> to prevent window hijacking and referrer leakage.</li>
              <li><strong>FormSubmit Gateway:</strong> Operates as a stateless proxy to relay contact form messages directly without retaining permanent visitor cookies.</li>
            </ul>
          </section>

          {/* Section 4: How to Control & Clear Cookies in Your Browser */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              4. Managing &amp; Disabling Cookies via Browser Settings
            </h2>
            <p>
              In addition to our on-site Consent Manager, you can configure your browser to block, alert, or delete cookies:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-2">
              <div className="p-3 rounded-[3px] bg-[#FAF8F3] border border-[#CFC3B3]">
                <strong className="text-[#111111] block mb-0.5">Google Chrome:</strong>
                Settings → Privacy and security → Third-party cookies
              </div>
              <div className="p-3 rounded-[3px] bg-[#FAF8F3] border border-[#CFC3B3]">
                <strong className="text-[#111111] block mb-0.5">Mozilla Firefox:</strong>
                Settings → Privacy &amp; Security → Enhanced Tracking Protection
              </div>
              <div className="p-3 rounded-[3px] bg-[#FAF8F3] border border-[#CFC3B3]">
                <strong className="text-[#111111] block mb-0.5">Apple Safari:</strong>
                Preferences → Privacy → Prevent cross-site tracking
              </div>
              <div className="p-3 rounded-[3px] bg-[#FAF8F3] border border-[#CFC3B3]">
                <strong className="text-[#111111] block mb-0.5">Microsoft Edge:</strong>
                Settings → Cookies and site permissions → Manage and delete cookies
              </div>
            </div>
          </section>

          {/* Section 5: Inquiries & Privacy Contact */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              5. Questions Regarding Cookies
            </h2>
            <p>
              If you have any questions or require clarification regarding our cookie and telemetry policies, contact our privacy desk directly at <a href="mailto:tarunsinghchaudharyy@gmail.com" className="text-[#78000F] underline">tarunsinghchaudharyy@gmail.com</a>.
            </p>
          </section>

        </div>

        {/* Footer Navigation Back to Site */}
        <div className="mt-16 pt-8 border-t border-[#DDD2C2] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <Link
            to="/"
            className="text-[#78000F] hover:underline font-bold flex items-center space-x-1"
          >
            <span>← RETURN TO PORTFOLIO</span>
          </Link>

          <div className="flex items-center space-x-4 text-[#736B60]">
            <Link to="/privacy" className="hover:text-[#111111] transition-colors">PRIVACY POLICY</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-[#111111] transition-colors">TERMS OF USE</Link>
            <span>•</span>
            <Link to="/refund-policy" className="hover:text-[#111111] transition-colors">REFUND POLICY</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CookiesPolicyPage;
