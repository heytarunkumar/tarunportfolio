import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { GmailService } from '../services/gmailService';
import { SupabaseMailService } from '../services/supabaseMailService';

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

    // Transmit to Serverless API (/api/contact), FormSubmit, and Web3Forms Backup Relay
    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(() => {});

      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('subject', formData.subject || 'Portfolio Inquiry');
      params.append('message', formData.message);
      params.append('_subject', formData.subject ? `[Portfolio Contact] ${formData.subject}` : `[Portfolio Contact] Message from ${formData.name}`);
      params.append('_replyto', formData.email);
      params.append('_template', 'table');
      params.append('_captcha', 'false');

      fetch('https://formsubmit.co/ajax/tarunsinghchaudharyy@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
        body: params.toString(),
      }).catch(() => {});

      // Web3Forms Instant Direct Relay to tarunsinghchaudharyy@gmail.com
      const web3Data = new FormData();
      web3Data.append('access_key', '02d99d14-3676-4d10-8b65-983df49c5e31');
      web3Data.append('name', formData.name);
      web3Data.append('email', formData.email);
      web3Data.append('subject', formData.subject ? `[Portfolio Contact] ${formData.subject}` : `[Portfolio Contact] Message from ${formData.name}`);
      web3Data.append('message', formData.message);
      web3Data.append('from_name', `${formData.name} (Portfolio Inquiry)`);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3Data,
      }).catch(() => {});
    } catch {
      // Ignore API fetch error
    }

    setTimeout(() => {
      addMessage({
        name: formData.name,
        email: formData.email,
        message: `${formData.subject ? `[${formData.subject}] ` : ''}${formData.message}`,
      });
      
      GmailService.dispatchContactFormPayload({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      SupabaseMailService.saveContactQuery({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  const contactEmail = contact?.email || profile?.email || 'imtarunchaudharyy@gmail.com';
  const linkedinUrl = profile?.socials?.linkedin || 'https://linkedin.com/in/heytarunkumar';
  const githubUrl = profile?.socials?.github || 'https://github.com/heytarunkumar';
  const mediumUrl = profile?.socials?.medium || 'https://medium.com/@heytarunkumar';

  return (
    <section
      id="contact"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-20 pb-20 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
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
                transition={{ duration: 0.8 }}
                className="flex items-center space-x-4 mb-5"
              >
                <span
                  className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  08 / GET IN TOUCH
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
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.85] select-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448]">
                    LET&apos;S BUILD
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]">
                    SOMETHING USEFUL.
                  </span>
                </h2>
              </motion.div>

              <p
                className="text-xs sm:text-[13.5px] font-light text-[#A8988B] leading-relaxed max-w-md mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Have a Python backend API to architect, cloud infrastructure task, DevOps automation pipeline, or software engineering opportunity? Send a direct dispatch below.
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-3 pt-6 border-t border-[#8C6D4F]/20 font-mono text-xs">
              <span className="text-[#8C6D4F] text-[10px] block uppercase tracking-widest">
                // DIRECT CHANNELS
              </span>
              <div className="flex flex-col space-y-2">
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-[#EAD8C7] hover:text-[#D4AF37] transition-colors flex items-center space-x-2"
                >
                  <span className="text-[#D4AF37]">EMAIL:</span>
                  <span>{contactEmail}</span>
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EAD8C7] hover:text-[#D4AF37] transition-colors"
                >
                  LINKEDIN ↗
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EAD8C7] hover:text-[#D4AF37] transition-colors"
                >
                  GITHUB ↗
                </a>
                <a
                  href={mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EAD8C7] hover:text-[#D4AF37] transition-colors"
                >
                  MEDIUM ↗
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
            className="lg:col-span-7 relative w-full rounded-sm border border-[#8C6D4F]/40 bg-[#0A0806] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Top Gold Horizon Edge */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
            
            {status === 'success' ? (
              <div className="py-16 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#D4AF37] text-[#D4AF37] text-lg font-bold">
                  ✓
                </div>
                <h3 className="text-3xl text-white font-normal uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  TRANSMISSION DELIVERED
                </h3>
                <p className="text-xs text-[#A8988B] font-light max-w-sm mx-auto" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {contact?.successMessage || 'Thank you. Your message payload has been dispatched. Tarun will review and respond shortly.'}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2 border border-[#8C6D4F]/50 text-xs font-mono text-[#D4AF37] hover:border-[#D4AF37]"
                >
                  SEND ANOTHER DISPATCH
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {status === 'error' && (
                  <div className="p-3 border border-red-500/50 bg-red-950/30 text-red-300 text-xs font-mono rounded-sm">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                      // SENDER NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                      // EMAIL ADDRESS *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                    // SUBJECT
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Engineering Inquiry / Opportunity"
                    className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 px-4 py-3 outline-none rounded-sm transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F] mb-2">
                    // MESSAGE PAYLOAD *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter your message transmission payload..."
                    className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-xs text-white placeholder-[#8C6D4F]/50 p-4 outline-none rounded-sm transition-colors resize-none"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 border border-[#8C6D4F]/50 bg-[#14100D] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#E8DFD8] hover:text-black text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] disabled:opacity-50"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {status === 'submitting' ? 'TRANSMITTING PAYLOAD...' : 'EXECUTE DISPATCH ↗'}
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