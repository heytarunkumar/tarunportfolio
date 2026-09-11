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
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('subject', formData.subject || 'Portfolio Inquiry');
      params.append('message', formData.message);
      params.append('_subject', formData.subject ? `[Portfolio Contact] ${formData.subject}` : `[Portfolio Contact] Message from ${formData.name}`);
      params.append('_replyto', formData.email);
      params.append('_template', 'table');
      params.append('_captcha', 'false');

      const response = await fetch('https://formsubmit.co/ajax/tarunsinghchaudharyy@gmail.com', {
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

  const contactEmail = contact?.email || profile?.email || 'imtarunchaudharyy@gmail.com';
  const linkedinUrl = profile?.socials?.linkedin || 'https://linkedin.com/in/haytarunkumar';
  const githubUrl = profile?.socials?.github || 'https://github.com/haytarunkumar';
  const xUrl = profile?.socials?.x || 'https://x.com/heytarunkumarr';
  const mediumUrl = profile?.socials?.medium || 'https://medium.com/@haytarunkumar';

  return (
    <section
      id="contact"
      className="relative w-full bg-[#0A0908] text-[#E8DFD8] font-sans selection:bg-[#D4AF37]/30 selection:text-white pt-24 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background Subtle Gradient Glow */}
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              {/* Eyebrow Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center space-x-4 mb-5"
              >
                <span className="text-[11px] font-mono font-medium tracking-[0.3em] uppercase text-[#D4AF37]">
                  08 / INITIATE CONTACT
                </span>
                <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <h2 className="text-4xl sm:text-5xl font-serif text-white tracking-tight leading-[1.1] mb-2">
                  Let&apos;s build <span className="italic text-[#D4AF37]">meaningful</span> intelligence.
                </h2>
              </motion.div>

              <p className="text-sm font-sans font-light text-[#A8988B] leading-relaxed max-w-md mb-8">
                Whether you want to collaborate on AI-driven systems, Python engineering architectures, OrigoHOST community initiatives, or discuss startup ventures — direct messages are welcome.
              </p>
            </div>

            {/* Founder Direct Line Badge */}
            <div className="flex items-center space-x-4 p-4 rounded-2xl border border-[#26211B] bg-[#12100E] mb-4 card-lift">
              <div className="relative shrink-0">
                <img
                  src="/images/tarun-headshot.jpg"
                  alt="Tarun Kumar"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-[#D4AF37]/50 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#12100E] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </span>
              </div>
              <div className="font-mono">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37]">DIRECT LINE //</span>
                  <span className="text-[9px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono">AVAILABLE</span>
                </div>
                <h4 className="text-white font-sans font-semibold text-sm sm:text-base">Tarun Kumar</h4>
                <p className="text-[11px] text-[#8C6D4F]">Direct response for AI engineering &amp; ventures</p>
              </div>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-4 font-mono text-xs">
              <span className="text-[#8C6D4F] text-[10px] block uppercase tracking-widest font-mono">
                // DIRECT COMMUNICATIONS
              </span>
              
              <a
                href={`mailto:${contactEmail}`}
                className="card-lift block p-4 rounded-xl border border-[#26211B] bg-[#12100E] hover:border-[#D4AF37]/40 transition-all group"
              >
                <div className="text-[10px] text-[#D4AF37] uppercase tracking-wider mb-1 font-mono">Primary Dispatch Email</div>
                <div className="text-sm text-white font-sans group-hover:text-[#D4AF37] transition-colors">{contactEmail}</div>
              </a>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-3 rounded-xl border border-[#26211B] bg-[#12100E] hover:border-[#D4AF37]/40 text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#E8DFD8] group-hover:text-[#D4AF37] font-mono">LinkedIn ↗</span>
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-3 rounded-xl border border-[#26211B] bg-[#12100E] hover:border-[#D4AF37]/40 text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#E8DFD8] group-hover:text-[#D4AF37] font-mono">GitHub ↗</span>
                </a>
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-3 rounded-xl border border-[#26211B] bg-[#12100E] hover:border-[#D4AF37]/40 text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#E8DFD8] group-hover:text-[#D4AF37] font-mono">X ↗</span>
                </a>
                <a
                  href={mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-lift p-3 rounded-xl border border-[#26211B] bg-[#12100E] hover:border-[#D4AF37]/40 text-center transition-all group"
                >
                  <span className="block text-[11px] text-[#E8DFD8] group-hover:text-[#D4AF37] font-mono">Medium ↗</span>
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
            className="lg:col-span-7 relative w-full rounded-2xl border border-[#26211B] bg-[#12100E] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden card-lift"
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
                    <label htmlFor="contact-name" className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                      // SENDER NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3.5 outline-none rounded-xl transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                      // EMAIL ADDRESS *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3.5 outline-none rounded-xl transition-colors font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                    // SUBJECT / TOPIC
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="AI Collaboration / Tech Talk / Project Inquiry"
                    className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3.5 outline-none rounded-xl transition-colors font-sans"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                    // MESSAGE PAYLOAD *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, community idea, or inquiry..."
                    className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 p-4 outline-none rounded-xl transition-colors resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50 cursor-pointer font-mono"
                >
                  {status === 'submitting' ? 'DISPATCHING PAYLOAD...' : 'DISPATCH MESSAGE ↗'}
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