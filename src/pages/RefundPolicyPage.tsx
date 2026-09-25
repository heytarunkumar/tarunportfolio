import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../config/site';

export const RefundPolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Refund & Cancellation Policy | Tarun Kumar (@heytarunkumar)';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#202020] font-sans selection:bg-[#78000F] selection:text-[#F4EEE4] pt-28 sm:pt-32 pb-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
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
              COMMERCIAL TERMS // SETTLEMENT
            </span>
            <span className="text-[10px] font-mono bg-[#E8F5EE] border border-[#B5DFCA] text-[#0F6848] px-2.5 py-0.5 rounded font-semibold uppercase">
              TRANSPARENT REFUND PROTOCOL
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#111111] leading-[1.08] tracking-[-0.03em] mb-4">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[#736B60]">
            Effective Date: September 2026 • Last Updated: September 25, 2026 • Tarun Kumar &amp; OrigoHOST Community
          </p>
        </motion.div>

        {/* Content Body */}
        <div className="space-y-12 text-sm sm:text-base leading-relaxed text-[#38342E]">

          {/* Section 1: Overview & Scope */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              1. Overview &amp; Applicability
            </h2>
            <p>
              This Refund &amp; Cancellation Policy defines the terms, timelines, and conditions governing monetary transactions, commercial engagements, and event registrations conducted through <strong>Tarun Kumar</strong> (<a href={SITE_CONFIG.url} className="text-[#78000F] underline">{SITE_CONFIG.url}</a>) and affiliated initiatives including the <strong>OrigoHOST Tech Community</strong> (<a href="https://origohost.in" target="_blank" rel="noopener noreferrer" className="text-[#78000F] underline">origohost.in</a>).
            </p>
            <p>
              We maintain a transparent, fair, and professional approach to all engagements, ensuring clear cancellation terms prior to the commencement of technical work or community programs.
            </p>
          </section>

          {/* Section 2: Technical Advisory & Consulting Services */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              2. Technical Consulting &amp; Advisory Sessions
            </h2>
            <p>
              For 1-on-1 architecture reviews, AI consulting sessions, and technical advisory calls:
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] text-xs">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-[#111111] font-serif text-sm">Cancellations &gt; 72 Hours in Advance</strong>
                  <span className="font-mono text-[#0F6848] font-bold bg-[#E8F5EE] px-2 py-0.5 rounded border border-[#B5DFCA]">100% FULL REFUND</span>
                </div>
                <p className="text-[#555047]">
                  If you cancel or request rescheduling more than 72 hours prior to the scheduled session, you are eligible for a 100% refund or cost-free reschedule.
                </p>
              </div>

              <div className="p-4 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] text-xs">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-[#111111] font-serif text-sm">Cancellations Between 24 to 72 Hours</strong>
                  <span className="font-mono text-[#8C581E] font-bold bg-[#FAF0E6] px-2 py-0.5 rounded border border-[#E8D0B8]">50% PARTIAL REFUND</span>
                </div>
                <p className="text-[#555047]">
                  Cancellations within 24 to 72 hours are eligible for a 50% refund to offset pre-session technical discovery, research analysis, and calendar locking.
                </p>
              </div>

              <div className="p-4 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] text-xs">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-[#111111] font-serif text-sm">Cancellations &lt; 24 Hours / No-Shows</strong>
                  <span className="font-mono text-[#78000F] font-bold bg-[#FDF2F2] px-2 py-0.5 rounded border border-[#F5C2C2]">NON-REFUNDABLE</span>
                </div>
                <p className="text-[#555047]">
                  Cancellations made under 24 hours before the session or non-attendance without prior written notice are non-refundable. One-time emergency rescheduling may be granted at mutual discretion.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Custom Software Development & Milestone Contracts */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              3. Custom Engineering &amp; Milestone Contracts
            </h2>
            <p>
              Bespoke AI system implementations, Python microservice developments, and enterprise architecture contracts are governed by their respective <strong>Statement of Work (SOW)</strong> and milestones:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li><strong>Initial Deposit / Retainer:</strong> Retainers cover discovery, architecture blueprinting, and development resource allocation and are non-refundable once milestone execution has commenced.</li>
              <li><strong>Milestone Sign-Off:</strong> Milestone payments are released upon mutual acceptance of defined deliverables. Once a milestone is approved, that portion is deemed completed and non-refundable.</li>
              <li><strong>Contract Termination:</strong> In the event of early termination, payment is calculated pro-rata based on completed work and verified code deliverables submitted up to the termination date.</li>
            </ul>
          </section>

          {/* Section 4: OrigoHOST Community Events & Bootcamps */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              4. OrigoHOST Community Workshops &amp; Bootcamps
            </h2>
            <p>
              For paid workshops, builder hackathons, and technical bootcamps organized under the <strong>OrigoHOST Tech Community</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li><strong>Full Refund:</strong> 100% refund is available if cancellation is requested at least 7 days prior to the bootcamp start date.</li>
              <li><strong>Ticket Transfers:</strong> Registrations are fully transferable to another student or builder at no extra fee up to 24 hours before the event.</li>
              <li><strong>Organizer Postponement / Cancellation:</strong> If an event is cancelled by OrigoHOST, participants receive a 100% automatic refund or priority credit for the rescheduled session.</li>
            </ul>
          </section>

          {/* Section 5: Digital Products & Research Documentation */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              5. Digital Products, Guides &amp; Research Downloads
            </h2>
            <p>
              Due to the immutable, instant-access nature of downloadable digital assets (including PDF engineering guides, research datasets, and boilerplate templates), digital download purchases are <strong>final and non-refundable</strong> once file access or decryption keys have been dispatched.
            </p>
          </section>

          {/* Section 6: Refund Request Process & Timeline */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#111111] border-l-2 border-[#78000F] pl-4">
              6. Refund Claim Procedure &amp; Settlement Timelines
            </h2>
            <p>
              To request a cancellation or refund under eligible terms:
            </p>
            <div className="p-5 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] font-mono text-xs space-y-2">
              <div className="text-[#78000F] font-bold uppercase tracking-wider mb-2">// REFUND PROCESSING PROTOCOL</div>
              <div><strong className="text-[#111111]">1. Submission:</strong> Email your refund claim to <a href="mailto:tarunsinghchaudharyy@gmail.com" className="text-[#78000F] underline">tarunsinghchaudharyy@gmail.com</a> with subject <code>[Refund Request] - Your Name / Invoice ID</code>.</div>
              <div><strong className="text-[#111111]">2. Verification:</strong> Claims are reviewed against time-stamped communication records within 48 business hours.</div>
              <div><strong className="text-[#111111]">3. Settlement Timeline:</strong> Approved refunds are credited back to the original payment source (UPI, Bank Transfer, Stripe, or Card) within <strong>5 to 7 business days</strong>.</div>
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
            <Link to="/terms" className="hover:text-[#111111] transition-colors">TERMS OF USE</Link>
            <span>•</span>
            <Link to="/cookies" className="hover:text-[#111111] transition-colors">COOKIE POLICY</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RefundPolicyPage;
