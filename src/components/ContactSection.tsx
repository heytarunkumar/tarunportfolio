import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profile';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <section 
      id="contact" 
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-[#05060A] text-[#F1F5F9] font-sans border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-xs font-mono font-semibold uppercase text-cyan-400 tracking-widest">
                09 // GET IN TOUCH
              </span>
              <div className="w-16 h-[1px] bg-gradient-to-r from-cyan-500/80 to-transparent" />
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Let&apos;s Connect
            </h2>
          </div>

          <p className="text-sm text-slate-400 max-w-md mt-4 md:mt-0 font-normal">
            Open to Python backend developer roles, cloud engineering opportunities, and collaborative technical projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-8 rounded-2xl space-y-6">
              <h3 className="text-xl font-bold text-white font-heading">
                Direct Communication
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                  <span className="text-slate-400">EMAIL:</span>
                  <a href={`mailto:${profileData.email}`} className="text-cyan-400 hover:underline">
                    {profileData.email}
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                  <span className="text-slate-400">LOCATION:</span>
                  <span className="text-slate-200">{profileData.location}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center space-x-4">
                <a
                  href={profileData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  GitHub ↗
                </a>
                <a
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={profileData.socials.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  Medium ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Panel (7 Cols) */}
          <div className="lg:col-span-7">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="glass-card p-8 sm:p-10 rounded-2xl space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-2">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-lg bg-slate-950/80 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-2">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 rounded-lg bg-slate-950/80 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-slate-300 mb-2">
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Opportunity / Collaboration"
                  className="w-full px-4 py-3 rounded-lg bg-slate-950/80 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-2">
                  MESSAGE *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hello Tarun, I would like to discuss..."
                  className="w-full px-4 py-3 rounded-lg bg-slate-950/80 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors font-sans resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-xs font-mono text-red-300">
                  {errorMessage}
                </div>
              )}

              {status === 'success' && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-300">
                  ✓ Message transmitted successfully. I will get back to you shortly!
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full btn-primary py-3.5 text-sm font-semibold flex items-center justify-center space-x-2"
              >
                <span>{status === 'submitting' ? 'Transmitting...' : 'Send Message ↗'}</span>
              </button>
            </motion.form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;