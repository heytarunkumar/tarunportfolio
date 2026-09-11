import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export const ContactSection: React.FC = () => {
  const { profile, contact, addMessage } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side validation
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

    setStatus('submitting');

    try {
      const formUrl = profile.contactFormSubmitUrl || 'https://formsubmit.co/ajax/tarunsinghchaudharyy@gmail.com';
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('subject', formData.subject || 'Portfolio Inquiry');
      params.append('message', formData.message);
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
  };

  const contactEmail = contact?.email || profile?.email || 'tarunsinghchaudharyy@gmail.com';
  const eyebrow = profile.contactEyebrow || '08 / INITIATE CONTACT';
  const headline = profile.contactHeadline || "Let's build meaningful intelligence.";
  const description = profile.contactDescription || 'Whether you want to collaborate on AI-driven systems, Python engineering architectures, OrigoHOST community initiatives, or discuss startup ventures — direct messages are welcome.';
  const directBadge = profile.directBadge || {
    photoUrl: '/images/tarun-about.webp',
    title: 'DIRECT LINE //',
    name: profile.name || 'Tarun Kumar',
    note: 'Direct response for AI engineering & ventures',
    status: 'AVAILABLE',
  };
  const submitButtonText = profile.contactSubmitButtonText || 'DISPATCH MESSAGE ↗';

  const linktreeUrl = profile?.socials?.linktree || 'https://linktr.ee/heytarunkumar';
  const instagramUrl = profile?.socials?.instagram || 'https://www.instagram.com/heytarunkumar/';
  const linkedinUrl = profile?.socials?.linkedin || 'https://www.linkedin.com/in/heytarunkumar/';
  const githubUrl = profile?.socials?.github || 'https://github.com/heytarunkumar';
  const xUrl = profile?.socials?.x || 'https://x.com/heytarunkumarr';
  const mediumUrl = profile?.socials?.medium || 'https://medium.com/@heytarunkumar/';

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0A0908] text-[#E8DFD8] font-sans selection:bg-[#D4AF37]/30 selection:text-white pt-16 sm:pt-24 pb-20 sm:pb-24 px-4 sm:px-8 lg:px-20 overflow-hidden"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div>
              {/* Eyebrow Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center space-x-4 mb-4 sm:mb-5"
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
                transition={{ duration: 0.8 }}
                className="mb-4 sm:mb-6"
              >
                <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-normal leading-[1.15] mb-2">
                  {headline}
                </h2>
              </motion.div>

              <p className="text-xs sm:text-sm font-sans font-light text-[#A8988B] leading-relaxed max-w-md mb-6 sm:mb-8">
                {description}
              </p>
            </div>

            {/* Founder Direct Line Badge */}
            <div className="flex items-center space-x-3.5 sm:space-x-4 p-3.5 sm:p-4 rounded-2xl border border-[#26211B] bg-[#12100E] mb-4 card-lift">
              <div className="relative shrink-0">
                <img
                  src={directBadge.photoUrl || "/images/tarun-about.webp"}
                  alt="Tarun Kumar — Direct Communications Line"
                  loading="lazy"
                  decoding="async"
                  width="56"
                  height="56"
                  className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl object-cover border border-[#D4AF37]/50 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#12100E] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </span>
              </div>
              <div className="font-mono min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] truncate">{directBadge.title}</span>
                  <span className="text-[9px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono shrink-0">
                    {directBadge.status || 'AVAILABLE'}
                  </span>
                </div>
                <h4 className="text-white font-sans font-semibold text-sm sm:text-base truncate">{directBadge.name}</h4>
                <p className="text-[10.5px] sm:text-[11px] text-[#8C6D4F] truncate">{directBadge.note}</p>
              </div>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-4 font-mono text-xs">
              <span className="text-[#8C6D4F] text-[10px] block uppercase tracking-widest font-mono">
                // DIRECT COMMUNICATIONS
              </span>
              
              <a
                href={`mailto:${contactEmail}`}
                className="card-lift block p-3.5 sm:p-4 rounded-xl border border-[#26211B] bg-[#12100E] hover:border-[#D4AF37]/40 transition-all group"
              >
                <div className="text-[10px] text-[#D4AF37] uppercase tracking-wider mb-1 font-mono">Primary Dispatch Email</div>
                <div className="text-xs sm:text-sm text-white font-sans group-hover:text-[#D4AF37] transition-colors truncate">{contactEmail}</div>
              </a>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <a
                  href={linktreeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-2.5 rounded-xl border border-[#26211B] bg-[#12100E] hover:border-[#D4AF37]/40 text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#E8DFD8] group-hover:text-[#D4AF37] font-mono truncate">Linktree ↗</span>
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-2.5 rounded-xl border border-[#26211B] bg-[#12100E] hover:border-[#D4AF37]/40 text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#E8DFD8] group-hover:text-[#D4AF37] font-mono truncate">Instagram ↗</span>
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-2.5 rounded-xl border border-[#26211B] bg-[#12100E] hover:border-[#D4AF37]/40 text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#E8DFD8] group-hover:text-[#D4AF37] font-mono truncate">LinkedIn ↗</span>
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-2.5 rounded-xl border border-[#26211B] bg-[#12100E] hover:border-[#D4AF37]/40 text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#E8DFD8] group-hover:text-[#D4AF37] font-mono truncate">GitHub ↗</span>
                </a>
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-2.5 rounded-xl border border-[#26211B] bg-[#12100E] hover:border-[#D4AF37]/40 text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#E8DFD8] group-hover:text-[#D4AF37] font-mono truncate">X ↗</span>
                </a>
                <a
                  href={mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-2.5 rounded-xl border border-[#26211B] bg-[#12100E] hover:border-[#D4AF37]/40 text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#E8DFD8] group-hover:text-[#D4AF37] font-mono truncate">Medium ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative w-full rounded-2xl border border-[#26211B] bg-[#12100E] p-5 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden card-lift"
          >
            {/* Top Gold Horizon Edge */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
            
            {status === 'success' ? (
              <div className="py-16 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#D4AF37] text-[#D4AF37] text-lg font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-serif text-white">
                  Transmission Delivered
                </h3>
                <p className="text-xs text-[#A8988B] font-light max-w-sm mx-auto">
                  {contact?.successMessage || 'Thank you. Your message payload has been dispatched. Tarun will review and respond shortly.'}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2 rounded-lg border border-[#8C6D4F]/50 text-xs font-mono text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
                >
                  SEND ANOTHER DISPATCH
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {status === 'error' && (
                  <div className="p-3.5 border border-red-500/40 bg-red-950/20 text-red-300 text-xs font-mono rounded-xl">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#C4A482] font-medium mb-2">
                      // SENDER NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-xs text-white placeholder-[#A8988B]/60 px-4 py-3.5 outline-none rounded-xl transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#C4A482] font-medium mb-2">
                      // EMAIL ADDRESS *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-xs text-white placeholder-[#A8988B]/60 px-4 py-3.5 outline-none rounded-xl transition-colors font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#C4A482] font-medium mb-2">
                    // SUBJECT / TOPIC
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="AI Collaboration / Tech Talk / Project Inquiry"
                    className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-xs text-white placeholder-[#A8988B]/60 px-4 py-3.5 outline-none rounded-xl transition-colors font-sans"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#C4A482] font-medium mb-2">
                    // MESSAGE PAYLOAD *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, community idea, or inquiry..."
                    className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-xs text-white placeholder-[#A8988B]/60 p-4 outline-none rounded-xl transition-colors resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50 cursor-pointer font-mono"
                >
                  {status === 'submitting' ? 'DISPATCHING PAYLOAD...' : submitButtonText}
                </button>

              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;