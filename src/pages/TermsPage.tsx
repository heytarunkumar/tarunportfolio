import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { SITE_CONFIG } from '../config/site';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#202020] font-sans selection:bg-[#78000F] selection:text-[#F4EEE4] pt-28 sm:pt-32 pb-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <SEO
        title="Terms &amp; Conditions of Use"
        description="Official Terms of Use and Master Service Agreement for Tarun Kumar (@heytarunkumar) and affiliated developer ecosystems."
        path="/terms"
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
              LEGAL TERMS // MASTER AGREEMENT
            </span>
            <span className="text-[10px] font-mono bg-[#E8F5EE] border border-[#B5DFCA] text-[#0F6848] px-2.5 py-0.5 rounded font-semibold uppercase">
              TERMS OF USE &amp; SERVICE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111111] leading-[1.08] tracking-[-0.03em] mb-4">
            Terms &amp; Conditions of Use
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[#736B60]">
            Effective Date: September 2026 • Last Updated: September 25, 2026 • Jurisdiction: New Delhi, India
          </p>
        </motion.div>

        {/* Content Body */}
        <div className="space-y-12 text-sm sm:text-base leading-relaxed text-[#38342E]">

          {/* Section 1: Agreement to Terms */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing the web presence of <strong>Tarun Kumar</strong> (operating at <a href={SITE_CONFIG.url} className="text-[#78000F] underline">{SITE_CONFIG.url}</a> and associated domains), or engaging with associated developer platforms including the <strong>OrigoHOST Tech Community</strong> (<a href="https://origohost.in" target="_blank" rel="noopener noreferrer" className="text-[#78000F] underline">origohost.in</a>), you acknowledge that you have read, understood, and agree to be bound by these Terms &amp; Conditions and our <Link to="/privacy" className="text-[#78000F] underline">Privacy Policy</Link>.
            </p>
            <p>
              If you do not agree to these Terms, you must immediately discontinue use of this website and its affiliated resources.
            </p>
          </section>

          {/* Section 2: Intellectual Property & Copyright */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              2. Intellectual Property, Copyright &amp; Licenses
            </h2>
            <p>
              All content published on this website — including editorial texts, monographs, design schemas, photography, brand identity assets, custom graphics, typography pairings, and research documentation — is the exclusive intellectual property of <strong>Tarun Kumar</strong>, protected by Indian and international copyright and trademark laws.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] text-xs">
                <strong className="text-[#78000F] font-serif text-sm block mb-1">A. Proprietary Rights &amp; Photography</strong>
                Personal photography, executive headshots, brand monograms (<code>TK</code> crest), and the editorial layout are proprietary. Unauthorized reproduction, scraping, deep-linking for commercial reuse, or AI training on private personal images without written consent is strictly prohibited.
              </div>

              <div className="p-4 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] text-xs">
                <strong className="text-[#78000F] font-serif text-sm block mb-1">B. Open-Source Code Repositories</strong>
                Public software repositories linked via GitHub (<a href={SITE_CONFIG.socials.github} target="_blank" rel="noopener noreferrer" className="text-[#78000F] underline">github.com/heytarunkumar</a>) are governed by their respective repository licenses (e.g. MIT, Apache 2.0, BSD-3-Clause).
              </div>
            </div>
          </section>

          {/* Section 3: Permitted & Acceptable Use */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              3. Acceptable Use Policy
            </h2>
            <p>You agree to access and use this site solely for lawful, legitimate, and professional purposes. You shall not:</p>
            <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm pl-2">
              <li>Deploy automated bots, spiders, or scrapers that exceed reasonable rate limits or violate <code>robots.txt</code> directives.</li>
              <li>Attempt unauthorized penetration testing, denial-of-service (DoS/DDoS) attacks, or server tampering against hosting infrastructure.</li>
              <li>Submit fraudulent, abusive, defamatory, or unsolicited commercial bulk transmissions (spam) through the contact dispatch system.</li>
              <li>Misrepresent your identity, affiliation, or authority when transmitting inquiries or consulting requests.</li>
            </ul>
          </section>

          {/* Section 4: Professional Services & Advisory Engagements */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              4. Professional Advisory &amp; Engineering Engagements
            </h2>
            <p>
              Information displayed regarding AI engineering, systems architectures, research benchmarks, and consulting services is presented for informational and portfolio review purposes.
            </p>
            <p>
              Formal client engagements, architectural reviews, institutional workshops, or custom development projects are governed by separate, mutually executed Master Services Agreements (MSAs), Statements of Work (SOWs), or signed consulting agreements outlining deliverables, payment schedules, and liability limits.
            </p>
          </section>

          {/* Section 5: OrigoHOST Community & Conduct */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              5. OrigoHOST Tech Community Ecosystem
            </h2>
            <p>
              Participation in <strong>OrigoHOST Tech Community</strong> (<a href="https://origohost.in" target="_blank" rel="noopener noreferrer" className="text-[#78000F] underline">origohost.in</a>) bootcamps, workshops, hackathons, and developer forums requires adherence to community guidelines that promote inclusivity, academic integrity, respect, and constructive technical collaboration.
            </p>
          </section>

          {/* Section 6: Third-Party Links & Disclaimers */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              6. External Links &amp; Third-Party Services
            </h2>
            <p>
              This site contains links to third-party platforms (including GitHub, LinkedIn, Medium, X, Instagram, Vercel, and Linktree). We do not control, endorse, or assume responsibility for the content, privacy practices, or availability of third-party platforms. You access third-party links at your own discretion.
            </p>
          </section>

          {/* Section 7: Disclaimer of Warranties & Limitation of Liability */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              7. Disclaimer of Warranties &amp; Limitation of Liability
            </h2>
            <div className="p-4 sm:p-5 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] text-xs space-y-2">
              <p>
                <strong>AS-IS DISCLAIMER:</strong> This website, its content, research demonstrations, and code snippets are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express, statutory, or implied.
              </p>
              <p>
                <strong>LIMITATION OF LIABILITY:</strong> To the maximum extent permitted under applicable law, Tarun Kumar and affiliated entities shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use or inability to use this website, software examples, or technical documentation.
              </p>
            </div>
          </section>

          {/* Section 8: Governing Law & Jurisdiction */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              8. Governing Law &amp; Dispute Resolution
            </h2>
            <p>
              These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of the <strong>Republic of India</strong>, without regard to conflict of law principles.
            </p>
            <p>
              Any disputes, controversies, or claims arising out of or in connection with these Terms or the website shall be subject to the exclusive jurisdiction of the competent courts situated in <strong>New Delhi, India</strong>.
            </p>
          </section>

          {/* Section 9: Inquiries & Contact Details */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              9. Contact &amp; Legal Notices
            </h2>
            <div className="p-4 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] font-mono text-xs space-y-1">
              <div><strong className="text-[#111111]">Legal Contact:</strong> Tarun Kumar</div>
              <div><strong className="text-[#111111]">Email:</strong> <a href="mailto:tarunsinghchaudharyy@gmail.com" className="text-[#78000F] underline">tarunsinghchaudharyy@gmail.com</a></div>
              <div><strong className="text-[#111111]">Location:</strong> Delhi NCR / Uttar Pradesh, India</div>
            </div>
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
            <Link to="/cookies" className="hover:text-[#111111] transition-colors">COOKIE POLICY</Link>
            <span>•</span>
            <Link to="/refund-policy" className="hover:text-[#111111] transition-colors">REFUND POLICY</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TermsPage;
