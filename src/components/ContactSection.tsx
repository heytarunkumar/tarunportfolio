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
  const eyebrow = profile.contactEyebrow || '05 / INITIATE CONTACT';
  const headline = profile.contactHeadline || "Let's Build Meaningful Intelligence.";
  const description = profile.contactDescription || 'Whether you want to collaborate on AI-driven systems, Python engineering architectures, OrigoHOST community initiatives, or discuss startup ventures — direct inquiries are welcome.';
  const directBadge = profile.directBadge || {
    photoUrl: '/images/tarun-about.webp',
    title: 'EXECUTIVE LINE //',
    name: profile.name || 'Mr. Tarun Kumar',
    note: 'Direct response for AI engineering & ventures',
    status: 'AVAILABLE',
  };
  const submitButtonText = profile.contactSubmitButtonText || 'DISPATCH MESSAGE →';

  const linktreeUrl = profile?.socials?.linktree || 'https://linktr.ee/heytarunkumar';
  const instagramUrl = profile?.socials?.instagram || 'https://www.instagram.com/heytarunkumar/';
  const linkedinUrl = profile?.socials?.linkedin || 'https://www.linkedin.com/in/heytarunkumar/';
  const githubUrl = profile?.socials?.github || 'https://github.com/heytarunkumar';
  const xUrl = profile?.socials?.x || 'https://x.com/heytarunkumarr';
  const mediumUrl = profile?.socials?.medium || 'https://medium.com/@heytarunkumar/';

  return (
    <section
      id="contact"
      className="relative w-full bg-[#F4EEE4] text-[#202020] font-sans selection:bg-[#78000F] selection:text-[#F4EEE4] py-20 sm:py-28 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 overflow-hidden"
    >
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
                transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                className="flex items-center space-x-4 mb-4 sm:mb-6"
              >
                <span className="text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.25em] uppercase text-[#78000F]">
                  {eyebrow}
                </span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-[#78000F]/60 via-[#CFC3B3] to-transparent max-w-xs" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
                className="mb-4 sm:mb-6"
              >
                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#111111] leading-[1.08] tracking-[-0.03em]">
                  {headline}
                </h2>
              </motion.div>

              <p className="text-xs sm:text-sm font-sans font-normal text-[#38342E] leading-relaxed max-w-md mb-6 sm:mb-8">
                {description}
              </p>
            </div>

            {/* Founder Direct Line Badge */}
            <div className="editorial-card flex items-center space-x-3.5 sm:space-x-4 p-4 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-sm">
              <div className="relative shrink-0">
                <img
                  src={directBadge.photoUrl || "/images/tarun-about.webp"}
                  alt="Mr. Tarun Kumar — Direct Communications Line"
                  loading="lazy"
                  decoding="async"
                  width="56"
                  height="56"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-[3px] object-cover border border-[#CFC3B3]"
                />
                <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#FAF8F3] flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                </span>
              </div>
              <div className="font-mono min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[9.5px] uppercase tracking-wider text-[#78000F] font-bold truncate">{directBadge.title}</span>
                  <span className="text-[8.5px] text-[#0F6848] bg-[#E8F5EE] border border-[#B5DFCA] px-1.5 py-0.2 rounded font-semibold shrink-0">
                    {directBadge.status || 'AVAILABLE'}
                  </span>
                </div>
                <h4 className="text-[#111111] font-serif font-bold text-sm sm:text-base truncate">{directBadge.name}</h4>
                <p className="text-[10.5px] font-mono text-[#736B60] truncate">{directBadge.note}</p>
              </div>
            </div>

            {/* Quick Contact & Socials */}
            <div className="space-y-3 font-mono text-xs">
              <a
                href={`mailto:${contactEmail}`}
                className="editorial-card block p-4 rounded-[4px] bg-[#FAF8F3] border border-[#CFC3B3] shadow-sm transition-all group"
              >
                <div className="text-[9.5px] text-[#78000F] uppercase tracking-wider mb-1 font-bold">Direct Dispatch Email</div>
                <div className="text-xs sm:text-sm text-[#111111] font-mono font-semibold group-hover:text-[#78000F] transition-colors truncate">{contactEmail}</div>
              </a>

              <div className="grid grid-cols-3 gap-2">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-card p-2.5 rounded-[3px] bg-[#FAF8F3] border border-[#CFC3B3] text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#202020] group-hover:text-[#78000F] font-mono font-medium truncate">LinkedIn ↗</span>
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-card p-2.5 rounded-[3px] bg-[#FAF8F3] border border-[#CFC3B3] text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#202020] group-hover:text-[#78000F] font-mono font-medium truncate">GitHub ↗</span>
                </a>
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-card p-2.5 rounded-[3px] bg-[#FAF8F3] border border-[#CFC3B3] text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#202020] group-hover:text-[#78000F] font-mono font-medium truncate">X ↗</span>
                </a>
                <a
                  href={mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-card p-2.5 rounded-[3px] bg-[#FAF8F3] border border-[#CFC3B3] text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#202020] group-hover:text-[#78000F] font-mono font-medium truncate">Medium ↗</span>
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-card p-2.5 rounded-[3px] bg-[#FAF8F3] border border-[#CFC3B3] text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#202020] group-hover:text-[#78000F] font-mono font-medium truncate">Instagram ↗</span>
                </a>
                <a
                  href={linktreeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-card p-2.5 rounded-[3px] bg-[#FAF8F3] border border-[#CFC3B3] text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#202020] group-hover:text-[#78000F] font-mono font-medium truncate">Linktree ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Contact Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="editorial-card lg:col-span-7 relative w-full rounded-[4px] border border-[#CFC3B3] bg-[#FAF8F3] p-6 sm:p-10 shadow-md overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#78000F] via-[#CFC3B3] to-transparent" />
            
            {status === 'success' ? (
              <div className="py-16 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#78000F] text-[#78000F] text-lg font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#111111]">
                  Transmission Delivered
                </h3>
                <p className="text-xs text-[#555047] font-normal max-w-sm mx-auto">
                  {contact?.successMessage || 'Thank you. Your message has been received. Tarun will review and respond promptly.'}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2 rounded-[3px] border border-[#CFC3B3] text-xs font-mono text-[#78000F] font-bold hover:border-[#78000F] transition-colors"
                >
                  SEND ANOTHER DISPATCH
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {status === 'error' && (
                  <div className="p-3.5 border border-red-300 bg-red-50 text-red-700 text-xs font-mono rounded-[3px]">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#78000F] font-bold mb-2">
                      // SENDER NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full bg-[#FAF8F3] border border-[#CFC3B3] focus:border-[#78000F] text-xs text-[#202020] placeholder-[#8C8275] px-4 py-3.5 outline-none rounded-[3px] transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#78000F] font-bold mb-2">
                      // EMAIL ADDRESS *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-[#FAF8F3] border border-[#CFC3B3] focus:border-[#78000F] text-xs text-[#202020] placeholder-[#8C8275] px-4 py-3.5 outline-none rounded-[3px] transition-colors font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#78000F] font-bold mb-2">
                    // SUBJECT / INQUIRY
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="AI Collaboration / Tech Talk / Project Inquiry"
                    className="w-full bg-[#FAF8F3] border border-[#CFC3B3] focus:border-[#78000F] text-xs text-[#202020] placeholder-[#8C8275] px-4 py-3.5 outline-none rounded-[3px] transition-colors font-sans"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#78000F] font-bold mb-2">
                    // MESSAGE *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, community idea, or inquiry..."
                    className="w-full bg-[#FAF8F3] border border-[#CFC3B3] focus:border-[#78000F] text-xs text-[#202020] placeholder-[#8C8275] p-4 outline-none rounded-[3px] transition-colors resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-executive-primary w-full py-4 text-xs font-mono font-bold tracking-[0.2em] uppercase cursor-pointer disabled:opacity-50"
                >
                  {status === 'submitting' ? 'DISPATCHING MESSAGE...' : submitButtonText}
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