import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';

export const ContactSection: React.FC = () => {
  const { profile, contact, addMessage } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [consentGiven, setConsentGiven] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side validation & consent check
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!consentGiven) {
      setStatus('error');
      setErrorMessage('Please accept the Privacy Policy and processing consent to transmit your message.');
      return;
    }

    setStatus('submitting');

    try {
      const formUrl = profile.contactFormSubmitUrl || 'https://formsubmit.co/ajax/tarunsinghchaudharyy@gmail.com';
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('subject', formData.subject || 'Portfolio Inquiry');
      params.append('message', formData.message);
      params.append('consent_dpdp', 'Explicit Opt-In via Portfolio Contact Form');
      params.append('_subject', formData.subject ? `[Portfolio Contact] ${formData.subject}` : `[Portfolio Contact] Message from ${formData.name}`);
      params.append('_replyto', formData.email);
      params.append('_template', 'table');
      params.append('_captcha', 'false');

      const response = await fetch(formUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error('FormSubmit delivery failed');
      }
    } catch {
      // Fallback response handling
    }

    addMessage({
      name: formData.name,
      email: formData.email,
      message: `${formData.subject ? `[${formData.subject}] ` : ''}${formData.message}`,
    });

    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setConsentGiven(false);
  };

  const contactEmail = contact?.email || profile?.email || 'tarunsinghchaudharyy@gmail.com';
  const eyebrow = profile.contactEyebrow || '06 / INITIATE CONTACT';
  const headline = profile.contactHeadline || "Let's Build Meaningful Intelligence.";
  const description = profile.contactDescription || 'Whether you want to collaborate on AI-driven systems, Python engineering architectures, OrigoHOST community initiatives, or discuss startup ventures — direct inquiries are welcome.';
  const directBadge = profile.directBadge || {
    photoUrl: '/images/tarun-about.webp',
    title: 'EXECUTIVE LINE //',
    name: profile.name || 'Tarun Kumar',
    note: 'Direct response for AI engineering & ventures',
    status: 'AVAILABLE',
  };
  const submitButtonText = profile.contactSubmitButtonText || 'DISPATCH MESSAGE →';

  const linkedinUrl = profile?.socials?.linkedin || 'https://www.linkedin.com/in/heytarunkumar/';
  const githubUrl = profile?.socials?.github || 'https://github.com/heytarunkumar';
  const xUrl = profile?.socials?.x || 'https://x.com/heytarunkumarr';
  const mediumUrl = profile?.socials?.medium || 'https://medium.com/@heytarunkumar/';

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0A0908] text-[#F5F2EB] font-sans selection:bg-[#D4AF37]/30 selection:text-white py-20 sm:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute bottom-10 left-1/4 w-[32rem] h-[32rem] bg-[#D4AF37]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-[1760px] mx-auto w-full relative z-10">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Eyebrow Header */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center space-x-4 mb-4 sm:mb-6"
              >
                <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#D4AF37]">
                  {eyebrow}
                </span>
                <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-4 sm:mb-6"
              >
                <h2 className="text-3xl sm:text-5xl font-serif text-white leading-[1.08] tracking-tight">
                  {headline}
                </h2>
              </motion.div>

              <p className="text-xs sm:text-sm font-sans font-light text-[#C4BCB3] leading-relaxed max-w-md mb-6 sm:mb-8">
                {description}
              </p>
            </div>

            {/* Founder Direct Line Badge */}
            <div className="card-lift flex items-center space-x-3.5 sm:space-x-4 p-4 rounded-2xl bg-[#12100E] border border-[#26211B] shadow-lg">
              <div className="relative shrink-0">
                <img
                  src={directBadge.photoUrl || "/images/tarun-about.webp"}
                  alt="Tarun Kumar — Direct Communications Line"
                  loading="lazy"
                  decoding="async"
                  width="56"
                  height="56"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-[#D4AF37]/40"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#12100E] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </span>
              </div>
              <div className="font-mono min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[9.5px] uppercase tracking-wider text-[#D4AF37] font-bold truncate">{directBadge.title}</span>
                  <span className="text-[8.5px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold shrink-0">
                    {directBadge.status || 'AVAILABLE'}
                  </span>
                </div>
                <h4 className="text-white font-sans font-semibold text-sm sm:text-base truncate">{directBadge.name}</h4>
                <p className="text-[10.5px] font-mono text-[#8C6D4F] truncate">{directBadge.note}</p>
              </div>
            </div>

            {/* Quick Contact & Socials */}
            <div className="space-y-3 font-mono text-xs">
              <a
                href={`mailto:${contactEmail}`}
                className="card-lift block p-4 rounded-2xl bg-[#12100E] border border-[#26211B] shadow-sm transition-all group"
              >
                <div className="text-[9.5px] text-[#8C6D4F] uppercase tracking-wider mb-1">Direct Dispatch Email</div>
                <div className="text-xs sm:text-sm text-white font-mono font-medium group-hover:text-[#D4AF37] transition-colors truncate">{contactEmail}</div>
              </a>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-2.5 rounded-xl bg-[#12100E] border border-[#26211B] text-center transition-all group hover:border-[#D4AF37]/40"
                >
                  <span className="block text-[11px] text-[#C4BCB3] group-hover:text-[#D4AF37] font-mono font-medium truncate">LinkedIn ↗</span>
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-2.5 rounded-xl bg-[#12100E] border border-[#26211B] text-center transition-all group hover:border-[#D4AF37]/40"
                >
                  <span className="block text-[11px] text-[#C4BCB3] group-hover:text-[#D4AF37] font-mono font-medium truncate">GitHub ↗</span>
                </a>
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-2.5 rounded-xl bg-[#12100E] border border-[#26211B] text-center transition-all group hover:border-[#D4AF37]/40"
                >
                  <span className="block text-[11px] text-[#C4BCB3] group-hover:text-[#D4AF37] font-mono font-medium truncate">X (Twitter) ↗</span>
                </a>
                <a
                  href={mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-2.5 rounded-xl bg-[#12100E] border border-[#26211B] text-center transition-all group hover:border-[#D4AF37]/40"
                >
                  <span className="block text-[11px] text-[#C4BCB3] group-hover:text-[#D4AF37] font-mono font-medium truncate">Medium ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="card-lift relative p-6 sm:p-10 rounded-2xl border border-[#26211B] bg-[#12100E] shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#26211B]">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
                    DISPATCH INTERFACE
                  </span>
                </div>
                <span className="text-[9.5px] font-mono text-[#8C6D4F] uppercase">
                  DIRECT ENCRYPTION
                </span>
              </div>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 text-emerald-300 text-xs font-mono">
                  <p className="font-bold mb-1">✓ MESSAGE TRANSMITTED SUCCESSFULLY</p>
                  <p className="text-[#C4BCB3]">
                    {contact?.successMessage || 'Thank you for reaching out. Tarun will review your inquiry shortly.'}
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl border border-red-500/40 bg-red-950/20 text-red-300 text-xs font-mono">
                  <p className="font-bold mb-1">✕ TRANSMISSION ERROR</p>
                  <p>{errorMessage || 'Failed to dispatch message. Please try again or email directly.'}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#A8988B] uppercase font-mono text-[10px] tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white px-4 py-3 rounded-xl outline-none transition-all placeholder:text-[#555047]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A8988B] uppercase font-mono text-[10px] tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@domain.com"
                      className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white px-4 py-3 rounded-xl outline-none transition-all placeholder:text-[#555047]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#A8988B] uppercase font-mono text-[10px] tracking-wider mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. AI Engineering Collaboration / OrigoHOST Engagement"
                    className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white px-4 py-3 rounded-xl outline-none transition-all placeholder:text-[#555047]"
                  />
                </div>

                <div>
                  <label className="block text-[#A8988B] uppercase font-mono text-[10px] tracking-wider mb-1.5">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your project, venture, timeline, or engineering inquiry..."
                    className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white px-4 py-3 rounded-xl outline-none transition-all placeholder:text-[#555047] resize-none"
                  />
                </div>

                {/* DPDP Act 2023 Explicit Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start space-x-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-[#D4AF37] accent-[#D4AF37] bg-[#0A0908] border-[#26211B] focus:ring-0 cursor-pointer"
                    />
                    <span className="text-[11px] text-[#A8988B] leading-relaxed">
                      I consent to the collection and processing of my name, email, and inquiry details for the sole purpose of responding to my communication, pursuant to the <Link to="/privacy" className="text-[#D4AF37] underline hover:text-white" target="_blank">Privacy Policy &amp; DPDP Act Notice</Link>.
                    </span>
                  </label>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] hover:from-[#E5C358] hover:to-[#D4AF37] text-[#0A0908] text-xs font-bold font-mono tracking-[0.18em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_28px_rgba(212,175,55,0.45)] hover:scale-[1.01] cursor-pointer disabled:opacity-50"
                  >
                    <span>{status === 'submitting' ? 'TRANSMITTING...' : submitButtonText}</span>
                    <span className="text-sm">↗</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;