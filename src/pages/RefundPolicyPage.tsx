import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { SITE_CONFIG } from '../config/site';

export const RefundPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white pt-28 sm:pt-32 pb-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <SEO
        title="Refund &amp; Cancellation Policy"
        description="Official Refund &amp; Cancellation Policy for technical consulting, workshops, and OrigoHOST events by Tarun Kumar (@heytarunkumar)."
        path="/refund-policy"
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
              COMMERCIAL TERMS // SETTLEMENT
            </span>
            <span className="text-[10px] font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 px-2.5 py-0.5 rounded font-semibold uppercase">
              TRANSPARENT REFUND PROTOCOL
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-white leading-[1.08] tracking-tight mb-4">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[#8C6D4F]">
            Effective Date: September 2026 • Last Updated: September 25, 2026 • Tarun Kumar &amp; OrigoHOST Community
          </p>
        </motion.div>

        {/* Content Body */}
        <div className="space-y-12 text-sm sm:text-base leading-relaxed text-[#C4BCB3]">

          {/* Section 1: Overview & Scope */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-white border-l-2 border-[#D4AF37] pl-4">
              1. Overview &amp; Applicability
            </h2>
            <p>
              This Refund &amp; Cancellation Policy defines the terms, timelines, and conditions governing monetary transactions, commercial engagements, and event registrations conducted through <strong className="text-white">Tarun Kumar</strong> (<a href={SITE_CONFIG.url} className="text-[#D4AF37] underline">{SITE_CONFIG.url}</a>) and affiliated initiatives including the <strong className="text-white">OrigoHOST Tech Community</strong> (<a href="https://origohost.in" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] underline">origohost.in</a>).
            </p>
            <p>
              We maintain a transparent, fair, and professional approach to all engagements, ensuring clear cancellation terms prior to the commencement of technical work or community programs.
            </p>
          </section>

          {/* Section 2: Technical Advisory & Consulting Services */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-white border-l-2 border-[#D4AF37] pl-4">
              2. Technical Consulting &amp; Advisory Sessions
            </h2>
            <p>
              For 1-on-1 architecture reviews, AI consulting sessions, and technical advisory calls:
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-[#12100E] border border-[#26211B] text-xs">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-white font-serif text-sm">Cancellations &gt; 72 Hours in Advance</strong>
                  <span className="font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">100% FULL REFUND</span>
                </div>
                <p className="text-[#A8988B]">
                  If you cancel or request rescheduling more than 72 hours prior to the scheduled session, you are eligible for a 100% refund or cost-free reschedule.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#12100E] border border-[#26211B] text-xs">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-white font-serif text-sm">Cancellations Between 24 to 72 Hours</strong>
                  <span className="font-mono text-amber-300 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">50% PARTIAL REFUND</span>
                </div>
                <p className="text-[#A8988B]">
                  Cancellations within 24 to 72 hours are eligible for a 50% refund to offset pre-session technical discovery, research analysis, and calendar locking.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#12100E] border border-[#26211B] text-xs">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-white font-serif text-sm">Cancellations &lt; 24 Hours / No-Shows</strong>
                  <span className="font-mono text-red-400 font-bold bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">NON-REFUNDABLE</span>
                </div>
                <p className="text-[#A8988B]">
                  Cancellations made under 24 hours before the session or non-attendance without prior written notice are non-refundable. One-time emergency rescheduling may be granted at mutual discretion.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Custom Software Development & Milestone Contracts */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-white border-l-2 border-[#D4AF37] pl-4">
              3. Custom Engineering &amp; Milestone Contracts
            </h2>
            <p>
              Bespoke AI system implementations, Python microservice developments, and enterprise architecture contracts are governed by their respective <strong className="text-white">Statement of Work (SOW)</strong> and milestones:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li><strong className="text-white">Initial Deposit / Retainer:</strong> Retainers cover discovery, architecture blueprinting, and development resource allocation and are non-refundable once milestone execution has commenced.</li>
              <li><strong className="text-white">Milestone Sign-Off:</strong> Milestone payments are released upon mutual acceptance of defined deliverables. Once a milestone is approved, that portion is deemed completed and non-refundable.</li>
              <li><strong className="text-white">Contract Termination:</strong> In the event of early termination, payment is calculated pro-rata based on completed work and verified code deliverables submitted up to the termination date.</li>
            </ul>
          </section>

          {/* Section 4: OrigoHOST Community Events & Bootcamps */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-white border-l-2 border-[#D4AF37] pl-4">
              4. OrigoHOST Community Workshops &amp; Bootcamps
            </h2>
            <p>
              For paid workshops, builder hackathons, and technical bootcamps organized under the <strong className="text-white">OrigoHOST Tech Community</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li><strong className="text-white">Full Refund:</strong> 100% refund is available if cancellation is requested at least 7 days prior to the bootcamp start date.</li>
              <li><strong className="text-white">Ticket Transfers:</strong> Registrations are fully transferable to another student or builder at no extra fee up to 24 hours before the event.</li>
              <li><strong className="text-white">Organizer Postponement / Cancellation:</strong> If an event is cancelled by OrigoHOST, participants receive a 100% automatic refund or priority credit for the rescheduled session.</li>
            </ul>
          </section>

          {/* Section 5: Digital Products & Research Documentation */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-white border-l-2 border-[#D4AF37] pl-4">
              5. Digital Products, Guides &amp; Research Downloads
            </h2>
            <p>
              Due to the immutable, instant-access nature of downloadable digital assets (including PDF engineering guides, research datasets, and boilerplate templates), digital download purchases are <strong className="text-white">final and non-refundable</strong> once file access or decryption keys have been dispatched.
            </p>
          </section>

          {/* Section 6: Refund Request Process & Timeline */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif text-white border-l-2 border-[#D4AF37] pl-4">
              6. Refund Claim Procedure &amp; Settlement Timelines
            </h2>
            <p>
              To request a cancellation or refund under eligible terms:
            </p>
            <div className="p-5 rounded-xl bg-[#12100E] border border-[#26211B] font-mono text-xs space-y-2">
              <div className="text-[#D4AF37] font-bold uppercase tracking-wider mb-2">// REFUND PROCESSING PROTOCOL</div>
              <div><strong className="text-white">1. Submission:</strong> Email your refund claim to <a href="mailto:tarunsinghchaudharyy@gmail.com" className="text-[#D4AF37] underline">tarunsinghchaudharyy@gmail.com</a> with subject <code>[Refund Request] - Your Name / Invoice ID</code>.</div>
              <div><strong className="text-white">2. Verification:</strong> Claims are reviewed against time-stamped communication records within 48 business hours.</div>
              <div><strong className="text-white">3. Settlement Timeline:</strong> Approved refunds are credited back to the original payment source (UPI, Bank Transfer, Stripe, or Card) within <strong className="text-white">5 to 7 business days</strong>.</div>
            </div>
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
            <Link to="/privacy" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition-colors">TERMS OF USE</Link>
            <span>•</span>
            <Link to="/cookies" className="hover:text-white transition-colors">COOKIE POLICY</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RefundPolicyPage;
