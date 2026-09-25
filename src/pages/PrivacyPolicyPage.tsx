import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { SITE_CONFIG } from '../config/site';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white pt-28 sm:pt-32 pb-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <SEO
        title="Privacy Policy &amp; DPDP Act Compliance"
        description="Official Privacy Policy and Data Protection Notice under the Digital Personal Data Protection (DPDP) Act 2023 for Tarun Kumar (@heytarunkumar)."
        path="/privacy"
      />
      <div className="max-w-4xl mx-auto">
        
        {/* Header Eyebrow & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16 border-b border-[#26211B] pb-8 sm:pb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D4AF37]">
              LEGAL NOTICE // COMPLIANCE
            </span>
            <span className="text-[10px] font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 px-2.5 py-0.5 rounded font-semibold uppercase">
              DPDP ACT 2023 (INDIA) &amp; GDPR COMPLIANT
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-white leading-[1.08] tracking-tight mb-4">
            Privacy Policy &amp; Data Protection
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[#8C6D4F]">
            Effective Date: September 2026 • Last Updated: September 25, 2026 • Version 2.0 (DPDP Fiduciary Protocol)
          </p>
        </motion.div>

        {/* Content Body */}
        <div className="space-y-12 text-sm sm:text-base leading-relaxed text-[#C4BCB3]">

          {/* Section 1: Introduction & Data Fiduciary */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-white border-l-2 border-[#D4AF37] pl-4">
              1. Introduction &amp; Data Fiduciary Details
            </h2>
            <p>
              This Privacy Policy governs the processing of personal data across the portfolio website and digital presence of <strong className="text-white">Tarun Kumar</strong> (operating online as <code>@heytarunkumar</code>, reachable at <a href={SITE_CONFIG.url} className="text-[#D4AF37] underline">{SITE_CONFIG.url}</a>) and affiliated initiatives including the <strong className="text-white">OrigoHOST Tech Community</strong> (<a href="https://origohost.in" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] underline">origohost.in</a>).
            </p>
            <p>
              Under the <strong className="text-white">Digital Personal Data Protection Act, 2023 (India)</strong> (&quot;DPDP Act&quot;) and applicable international frameworks (such as the General Data Protection Regulation - GDPR), <strong className="text-white">Tarun Kumar</strong> acts as the <em>Data Fiduciary</em> (or Data Controller) regarding personal data collected through this website.
            </p>
            
            <div className="p-4 sm:p-5 rounded-xl bg-[#12100E] border border-[#26211B] font-mono text-xs space-y-1.5">
              <div className="text-[#D4AF37] font-bold uppercase tracking-wider mb-2">// DATA FIDUCIARY IDENTIFICATION</div>
              <div><strong className="text-white">Fiduciary Name:</strong> Tarun Kumar</div>
              <div><strong className="text-white">Affiliated Entity:</strong> OrigoHOST Tech Community (Founder &amp; President)</div>
              <div><strong className="text-white">Jurisdiction:</strong> Delhi NCR / Uttar Pradesh, India</div>
              <div><strong className="text-white">Direct Privacy Desk:</strong> <a href="mailto:tarunsinghchaudharyy@gmail.com" className="text-[#D4AF37] underline">tarunsinghchaudharyy@gmail.com</a></div>
            </div>
          </section>

          {/* Section 2: Personal Data Collected & Data Minimization */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-white border-l-2 border-[#D4AF37] pl-4">
              2. Personal Data Collected &amp; Data Minimization Principle
            </h2>
            <p>
              In strict adherence to the <em>Data Minimization Principle</em> (DPDP Act Section 6 &amp; GDPR Article 5(1)(c)), we collect only the personal data that is strictly necessary for fulfilling legitimate interaction requests. We do not engage in covert background tracking, unauthorized profiling, or harvesting of sensitive personal data.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-[#12100E] border border-[#26211B]">
                <h3 className="font-serif text-white text-base mb-1">A. Direct Inquiries &amp; Communications</h3>
                <p className="text-xs sm:text-sm text-[#A8988B] mb-2">
                  When you submit a message via the portfolio contact form or send direct correspondence:
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm space-y-1 text-[#C4BCB3]">
                  <li><strong className="text-white">Full Name:</strong> To address you properly in correspondence.</li>
                  <li><strong className="text-white">Email Address:</strong> To deliver direct responses to your inquiry.</li>
                  <li><strong className="text-white">Subject &amp; Inquiry Message:</strong> To understand and review your technical, consulting, or community request.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#12100E] border border-[#26211B]">
                <h3 className="font-serif text-white text-base mb-1">B. Technical Logs &amp; Security Telemetry</h3>
                <p className="text-xs sm:text-sm text-[#A8988B] mb-2">
                  Standard web hosting infrastructure (via Vercel edge network) automatically registers minimal technical diagnostic data for firewall security, anti-DDoS mitigation, and server reliability:
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm space-y-1 text-[#C4BCB3]">
                  <li>Truncated/Anonymized IP Address &amp; User-Agent header (for request routing and rate limiting).</li>
                  <li>HTTP request timestamps, status codes, and referrer headers.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#12100E] border border-[#26211B]">
                <h3 className="font-serif text-white text-base mb-1">C. Client-Side Preferences (Local Storage Only)</h3>
                <p className="text-xs sm:text-sm text-[#A8988B]">
                  Cookie Consent selections and interaction states are saved locally on your browser via HTML5 Local Storage. This data never leaves your device and is not synchronized with any external server.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Legal Basis & Purpose of Processing */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-white border-l-2 border-[#D4AF37] pl-4">
              3. Purpose &amp; Lawful Basis of Processing
            </h2>
            <p>Under Section 4 and Section 6 of the DPDP Act 2023, personal data is processed strictly for specified, legitimate purposes:</p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm pl-2">
              <li><strong className="text-white">Responding to Communications (Consent):</strong> Processing your contact message, project consultation request, or mentorship inquiry upon explicit consent provided when submitting the form.</li>
              <li><strong className="text-white">Systems Reliability &amp; Defense (Legitimate Interest):</strong> Protecting server infrastructure against malicious traffic, bot spam, brute force attacks, or service abuse.</li>
              <li><strong className="text-white">Community Engagement:</strong> Facilitating OrigoHOST Tech Community communications, research collaborations, or speaking invitations where requested by you.</li>
            </ul>
          </section>

          {/* Section 4: Third-Party Service Providers & Embeds */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-white border-l-2 border-[#D4AF37] pl-4">
              4. Third-Party Service Providers &amp; Embeds
            </h2>
            <p>We do not sell, rent, monetize, or trade your personal data. We utilize vetted technical infrastructure providers who adhere to strict security protocols:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-2">
              <div className="p-3.5 rounded-xl bg-[#12100E] border border-[#26211B]">
                <strong className="text-[#D4AF37] block mb-1">Vercel Inc. (Hosting &amp; Edge Delivery)</strong>
                Serves web application assets and enforces SSL/TLS encryption. Compliant with ISO 27001 and SOC 2 Type II.
              </div>
              <div className="p-3.5 rounded-xl bg-[#12100E] border border-[#26211B]">
                <strong className="text-[#D4AF37] block mb-1">FormSubmit / Direct SMTP Gateway</strong>
                Securely transports contact form submissions to the executive inbox via end-to-end TLS encryption.
              </div>
              <div className="p-3.5 rounded-xl bg-[#12100E] border border-[#26211B]">
                <strong className="text-[#D4AF37] block mb-1">Google Fonts &amp; GitHub Embeds</strong>
                Typography assets served with preconnect optimization. External links open with <code>rel=&quot;noopener noreferrer&quot;</code>.
              </div>
              <div className="p-3.5 rounded-xl bg-[#12100E] border border-[#26211B]">
                <strong className="text-[#D4AF37] block mb-1">OrigoHOST Community Infrastructure</strong>
                Community portals operating under strict data protection protocols for builders and students.
              </div>
            </div>
          </section>

          {/* Section 5: Data Retention & Security Measures */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-white border-l-2 border-[#D4AF37] pl-4">
              5. Data Retention &amp; Security Safeguards
            </h2>
            <p>
              We implement industry-grade technical and organizational safeguards to protect personal data from accidental loss, unauthorized access, alteration, or disclosure.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li><strong className="text-white">Data Retention:</strong> Inquiries submitted through the contact form are retained only for the duration required to address the matter or fulfill active professional engagements, after which they are securely archived or deleted.</li>
              <li><strong className="text-white">Encryption in Transit:</strong> All HTTP traffic is strictly enforced over HTTPS with TLS 1.3 encryption and HSTS headers.</li>
              <li><strong className="text-white">Access Controls:</strong> Administrative consoles and communication channels are guarded by multi-factor authentication (MFA) and cryptographic credentials.</li>
            </ul>
          </section>

          {/* Section 6: Rights of Data Principals (DPDP Act 2023 & GDPR) */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-white border-l-2 border-[#D4AF37] pl-4">
              6. Your Statutory Rights as a Data Principal
            </h2>
            <p>
              Under Chapter III of the <strong className="text-white">DPDP Act, 2023</strong> and Article 15–22 of the GDPR, you possess irrevocable rights regarding your personal data:
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#12100E] border border-[#26211B] text-xs">
                <strong className="text-white font-serif text-sm block mb-1">1. Right to Access Summary of Personal Data (DPDP Act § 11)</strong>
                You may request a copy of the personal data processed, along with processing identities and third parties with whom data was shared.
              </div>

              <div className="p-3.5 rounded-xl bg-[#12100E] border border-[#26211B] text-xs">
                <strong className="text-white font-serif text-sm block mb-1">2. Right to Correction &amp; Erasure (DPDP Act § 12)</strong>
                You may request correction of inaccurate or misleading data, updating of incomplete data, or complete erasure of your personal data when no longer necessary.
              </div>

              <div className="p-3.5 rounded-xl bg-[#12100E] border border-[#26211B] text-xs">
                <strong className="text-white font-serif text-sm block mb-1">3. Right of Grievance Redressal (DPDP Act § 13)</strong>
                You have the right to register a grievance with our appointed Grievance Redressal Officer and receive an expeditious, reasoned response within statutory timelines.
              </div>

              <div className="p-3.5 rounded-xl bg-[#12100E] border border-[#26211B] text-xs">
                <strong className="text-white font-serif text-sm block mb-1">4. Right to Withdraw Consent &amp; Right to Nominate (DPDP Act § 6(4) &amp; § 14)</strong>
                Consent given for communication may be withdrawn at any time with equal ease. You may also nominate an individual to exercise your rights in the event of death or incapacity.
              </div>
            </div>
          </section>

          {/* Section 7: Grievance Redressal Mechanism & Officer Contact */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-white border-l-2 border-[#D4AF37] pl-4">
              7. Grievance Redressal Officer &amp; Inquiries
            </h2>
            <p>
              In compliance with Section 13 of the DPDP Act 2023, any inquiry, access request, correction demand, or grievance regarding data handling may be directed to our appointed Grievance Officer:
            </p>

            <div className="p-5 rounded-xl bg-[#12100E] border border-[#26211B] font-mono text-xs space-y-2">
              <div className="text-[#D4AF37] font-bold uppercase tracking-wider mb-2">// STATUTORY GRIEVANCE DESK</div>
              <div><strong className="text-white">Designated Grievance Officer:</strong> Tarun Kumar</div>
              <div><strong className="text-white">Official Inquiries Email:</strong> <a href="mailto:tarunsinghchaudharyy@gmail.com" className="text-[#D4AF37] underline">tarunsinghchaudharyy@gmail.com</a></div>
              <div><strong className="text-white">Response SLA:</strong> Inquiries are acknowledged within 48 hours and resolved within statutory guidelines (under 30 days).</div>
              <div><strong className="text-white">Appellate Authority:</strong> If dissatisfied with our resolution, data principals in India have the right to appeal to the <em>Data Protection Board of India</em>.</div>
            </div>
          </section>

          {/* Section 8: Children's Data & Policy Updates */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-white border-l-2 border-[#D4AF37] pl-4">
              8. Protection of Children &amp; Policy Updates
            </h2>
            <p>
              This website is intended for professional, educational, and developer audiences. We do not knowingly collect personal data from individuals under 18 years of age without verifiable parental consent. If we become aware of inadvertent collection of a minor&apos;s data, it will be immediately expunged.
            </p>
            <p>
              We may update this Privacy Policy periodically to reflect technological changes or statutory regulations. Any revisions will be published here with an updated revision date.
            </p>
          </section>

        </div>

        {/* Footer Navigation Back to Site */}
        <div className="mt-16 pt-8 border-t border-[#26211B] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <Link
            to="/"
            className="text-[#D4AF37] hover:underline font-bold flex items-center space-x-1"
          >
            <span>← RETURN TO PORTFOLIO</span>
          </Link>

          <div className="flex items-center space-x-4 text-[#8C6D4F]">
            <Link to="/terms" className="hover:text-white transition-colors">TERMS OF USE</Link>
            <span>•</span>
            <Link to="/cookies" className="hover:text-white transition-colors">COOKIE POLICY</Link>
            <span>•</span>
            <Link to="/refund-policy" className="hover:text-white transition-colors">REFUND POLICY</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
