import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminContactManager: React.FC = () => {
  const {
    contact,
    updateContact,
    addMessage,
    toggleMessageRead,
    deleteMessage,
    clearAllMessages,
    profile,
    updateProfile,
  } = usePortfolio();

  const [savedMessage, setSavedMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'settings' | 'inbox' | 'socials'>('inbox');
  const [inboxFilter, setInboxFilter] = useState<'all' | 'unread' | 'read'>('all');

  // Contact Form Settings State
  const [email, setEmail] = useState(contact.email || profile.email || 'imtarunchaudharyy@gmail.com');
  const [formEnabled, setFormEnabled] = useState(contact.formEnabled !== false);
  const [spamProtection, setSpamProtection] = useState(contact.spamProtection !== false);
  const [successMessage, setSuccessMessage] = useState(
    contact.successMessage || 'Thank you. Your message payload has been dispatched. Tarun will review and respond shortly.'
  );

  // Social Channels State
  const [github, setGithub] = useState(profile.socials?.github || 'https://github.com/heytarunkumar');
  const [linkedin, setLinkedin] = useState(profile.socials?.linkedin || 'https://linkedin.com/in/heytarunkumar');
  const [medium, setMedium] = useState(profile.socials?.medium || 'https://medium.com/@heytarunkumar');
  const [xSocial, setXSocial] = useState(profile.socials?.x || 'https://x.com/heytarunkumar');

  // Manual Add Message Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newMessagePayload, setNewMessagePayload] = useState('');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact({
      email,
      formEnabled,
      spamProtection,
      successMessage,
    });
    updateProfile({
      email,
    });
    setSavedMessage('Contact form & inbox settings updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleSaveSocials = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      email,
      socials: {
        github,
        linkedin,
        medium,
        x: xSocial,
      },
    });
    setSavedMessage('Direct contact channels & social URLs updated!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleAddManualMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim() || !newMessagePayload.trim()) return;

    addMessage({
      name: newName.trim(),
      email: newEmail.trim(),
      message: newMessagePayload.trim(),
    });

    setNewName('');
    setNewEmail('');
    setNewMessagePayload('');
    setSavedMessage(`Simulated message dispatch from "${newName.trim()}" added to Inbox!`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleDeleteSingleMessage = (id: string, senderName: string) => {
    deleteMessage(id);
    setSavedMessage(`Deleted message from "${senderName}".`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleClearInbox = () => {
    if (window.confirm('Are you sure you want to clear all messages from your Admin Inbox?')) {
      clearAllMessages();
      setSavedMessage('All inbox messages cleared!');
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  const messages = contact.inboxMessages || [];
  const unreadCount = messages.filter((m) => !m.read).length;

  const filteredMessages = messages.filter((m) => {
    if (inboxFilter === 'unread') return !m.read;
    if (inboxFilter === 'read') return m.read;
    return true;
  });

  return (
    <div className="space-y-8 max-w-6xl font-sans text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#8C6D4F]/30 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            CONTACT TERMINAL &amp; DISPATCH INBOX COMMAND CENTER
          </span>
          <h1
            className="text-4xl uppercase tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            CONTACT &amp; INBOX MANAGER
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Manage contact form settings, dispatch messages, inbox filtering, social channels, and transmission payloads.
          </p>
        </div>
        <span className="text-xs font-mono text-[#D4AF37] px-3 py-1 border border-[#D4AF37]/40 bg-[#1E1914] rounded-sm self-start sm:self-auto">
          {unreadCount} UNREAD / {messages.length} TOTAL INBOX MESSAGES
        </span>
      </div>

      {savedMessage && (
        <div className="p-4 border border-emerald-500/50 bg-emerald-950/30 text-emerald-300 text-xs font-mono rounded-sm flex items-center justify-between animate-fadeIn">
          <span>✓ {savedMessage}</span>
          <button onClick={() => setSavedMessage('')} className="text-emerald-400 font-bold hover:underline">
            DISMISS
          </button>
        </div>
      )}

      {/* Contact Manager Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#8C6D4F]/30 pb-2 font-mono text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('inbox')}
          className={`px-4 py-2 rounded-sm border uppercase transition-colors flex items-center space-x-2 ${
            activeTab === 'inbox'
              ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-bold'
              : 'border-[#8C6D4F]/30 bg-[#120F0C] text-[#C4B5A5] hover:text-white'
          }`}
        >
          <span>1. DISPATCH INBOX ({messages.length})</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 text-[9px] bg-amber-500 text-black font-bold rounded-full">
              {unreadCount} NEW
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-sm border uppercase transition-colors ${
            activeTab === 'settings'
              ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-bold'
              : 'border-[#8C6D4F]/30 bg-[#120F0C] text-[#C4B5A5] hover:text-white'
          }`}
        >
          2. CONTACT FORM &amp; RATE LIMITING
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('socials')}
          className={`px-4 py-2 rounded-sm border uppercase transition-colors ${
            activeTab === 'socials'
              ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-bold'
              : 'border-[#8C6D4F]/30 bg-[#120F0C] text-[#C4B5A5] hover:text-white'
          }`}
        >
          3. DIRECT CHANNELS &amp; SOCIAL URLS
        </button>
      </div>

      {/* TAB 1: DISPATCH INBOX */}
      {activeTab === 'inbox' && (
        <div className="space-y-6 font-mono text-xs">
          
          {/* Inbox Filter & Action Bar */}
          <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-[#8C6D4F] uppercase font-bold text-[10px]">FILTER:</span>
              <button
                type="button"
                onClick={() => setInboxFilter('all')}
                className={`px-3 py-1 rounded-sm border ${
                  inboxFilter === 'all'
                    ? 'border-[#D4AF37] bg-[#1E1914] text-[#F7E7C4] font-bold'
                    : 'border-[#8C6D4F]/30 text-[#8C6D4F] hover:text-white'
                }`}
              >
                ALL ({messages.length})
              </button>
              <button
                type="button"
                onClick={() => setInboxFilter('unread')}
                className={`px-3 py-1 rounded-sm border ${
                  inboxFilter === 'unread'
                    ? 'border-amber-500 bg-amber-950/40 text-amber-300 font-bold'
                    : 'border-[#8C6D4F]/30 text-[#8C6D4F] hover:text-white'
                }`}
              >
                UNREAD ({unreadCount})
              </button>
              <button
                type="button"
                onClick={() => setInboxFilter('read')}
                className={`px-3 py-1 rounded-sm border ${
                  inboxFilter === 'read'
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-bold'
                    : 'border-[#8C6D4F]/30 text-[#8C6D4F] hover:text-white'
                }`}
              >
                READ ({messages.length - unreadCount})
              </button>
            </div>

            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleClearInbox}
                className="px-3 py-1 border border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 font-bold uppercase"
              >
                CLEAR ALL INBOX 🧹
              </button>
            )}
          </div>

          {/* Add / Simulate Message Dispatch */}
          <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
            <h2 className="text-sm text-[#D4AF37] tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
              SIMULATE / DISPATCH TEST INBOX MESSAGE
            </h2>

            <form onSubmit={handleAddManualMessage} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8C6D4F] uppercase mb-1">
                    SENDER NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Senior Tech Recruiter"
                    className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#8C6D4F] uppercase mb-1">
                    SENDER EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="recruiter@company.com"
                    className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8C6D4F] uppercase mb-1">
                  MESSAGE PAYLOAD *
                </label>
                <textarea
                  required
                  rows={2}
                  value={newMessagePayload}
                  onChange={(e) => setNewMessagePayload(e.target.value)}
                  placeholder="Enter message text..."
                  className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
              >
                + ADD MESSAGE TO INBOX ↗
              </button>
            </form>
          </div>

          {/* Messages List */}
          <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
            <h2 className="text-lg text-white font-bold uppercase border-b border-[#8C6D4F]/20 pb-3">
              INBOX MESSAGES DISPATCHED ({filteredMessages.length})
            </h2>

            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-[#8C6D4F] font-mono text-xs border border-dashed border-[#8C6D4F]/30">
                NO MESSAGES MATCH CURRENT FILTER CRITERIA
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-5 border rounded-sm space-y-3 transition-colors ${
                      msg.read
                        ? 'bg-[#0E0C0A] border-[#8C6D4F]/20'
                        : 'bg-[#18130E] border-[#D4AF37]/60 shadow-[0_0_12px_rgba(212,175,55,0.1)]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#8C6D4F]/20 pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-bold text-sm">{msg.name}</span>
                          <span className="text-[#8C6D4F]">&lt;{msg.email}&gt;</span>
                          {!msg.read && (
                            <span className="px-2 py-0.5 text-[9px] bg-amber-500 text-black font-bold uppercase rounded-sm">
                              NEW / UNREAD
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#8C6D4F] block mt-0.5">DISPATCH DATE: {msg.date}</span>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={() => toggleMessageRead(msg.id)}
                          className={`px-3 py-1.5 border rounded-sm font-bold text-[10px] uppercase transition-all ${
                            msg.read
                              ? 'border-[#8C6D4F]/40 bg-[#120F0C] text-[#C4B5A5] hover:text-white'
                              : 'border-[#D4AF37] bg-[#D4AF37] text-black font-bold'
                          }`}
                        >
                          {msg.read ? 'MARK UNREAD ✉️' : 'MARK READ ✓'}
                        </button>

                        <a
                          href={`mailto:${msg.email}?subject=Re:%20Engineering%20Inquiry`}
                          className="px-3 py-1.5 border border-[#8C6D4F]/40 bg-[#1A140F] text-[#D4AF37] hover:border-[#D4AF37] text-[10px] font-bold uppercase"
                        >
                          REPLY ✉️
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDeleteSingleMessage(msg.id, msg.name)}
                          className="px-3 py-1.5 border border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 text-[10px] font-bold uppercase"
                        >
                          DELETE 🗑️
                        </button>
                      </div>
                    </div>

                    <p className="text-[#E8DFD8] text-xs font-sans leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: CONTACT FORM & RATE LIMITING */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-6 font-mono text-xs">
          <h2 className="text-sm text-[#D4AF37] tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
            TERMINAL CONTACT FORM &amp; RATE LIMITING CONFIGURATION
          </h2>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              PUBLIC DISPLAY CONTACT EMAIL *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="imtarunchaudharyy@gmail.com"
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setFormEnabled(!formEnabled)}
              className={`p-4 border rounded-sm cursor-pointer flex flex-col justify-between space-y-2 font-mono select-none transition-colors ${
                formEnabled
                  ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300'
                  : 'border-red-500/50 bg-red-950/30 text-red-300'
              }`}
            >
              <span className="text-[#8C6D4F] uppercase font-bold text-[10px]">PUBLIC CONTACT FORM STATUS:</span>
              <span className="font-bold text-sm">{formEnabled ? 'FORM ENABLED ✓' : 'FORM DISABLED ✕'}</span>
              <span className="text-[10px] opacity-80">{formEnabled ? 'Visitors can submit payloads directly to Admin Inbox' : 'Contact form disabled'}</span>
            </div>

            <div
              onClick={() => setSpamProtection(!spamProtection)}
              className={`p-4 border rounded-sm cursor-pointer flex flex-col justify-between space-y-2 font-mono select-none transition-colors ${
                spamProtection
                  ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300'
                  : 'border-amber-500/50 bg-amber-950/30 text-amber-300'
              }`}
            >
              <span className="text-[#8C6D4F] uppercase font-bold text-[10px]">CLIENT SPAM PROTECTION &amp; RATE LIMITING:</span>
              <span className="font-bold text-sm">{spamProtection ? 'SPAM SHIELD ACTIVE ✓' : 'SPAM SHIELD INACTIVE ✕'}</span>
              <span className="text-[10px] opacity-80">Validates email syntax &amp; prevents bot flood</span>
            </div>
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              TRANSMISSION SUCCESS CONFIRMATION PAYLOAD *
            </label>
            <textarea
              required
              rows={3}
              value={successMessage}
              onChange={(e) => setSuccessMessage(e.target.value)}
              placeholder="Thank you. Your message payload has been dispatched..."
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
          >
            SAVE CONTACT FORM CONFIGURATION ↗
          </button>
        </form>
      )}

      {/* TAB 3: DIRECT CHANNELS & SOCIAL URLS */}
      {activeTab === 'socials' && (
        <form onSubmit={handleSaveSocials} className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-6 font-mono text-xs">
          <h2 className="text-sm text-[#D4AF37] tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
            DIRECT CONTACT CHANNELS &amp; SOCIAL PROFILE HANDLES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                GITHUB PROFILE URL
              </label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/heytarunkumar"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                LINKEDIN PROFILE URL
              </label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/heytarunkumar"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                MEDIUM PROFILE URL
              </label>
              <input
                type="url"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                placeholder="https://medium.com/@heytarunkumar"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[#8C6D4F] uppercase mb-1">
                X / TWITTER PROFILE URL
              </label>
              <input
                type="url"
                value={xSocial}
                onChange={(e) => setXSocial(e.target.value)}
                placeholder="https://x.com/heytarunkumar"
                className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
          >
            SAVE SOCIAL PROFILES ↗
          </button>
        </form>
      )}

    </div>
  );
};

export default AdminContactManager;
