import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminContactManager: React.FC = () => {
  const { contact, updateContact, markMessageRead } = usePortfolio();
  const [savedMessage, setSavedMessage] = useState('');

  const [email, setEmail] = useState(contact.email);
  const [formEnabled, setFormEnabled] = useState(contact.formEnabled);
  const [spamProtection, setSpamProtection] = useState(contact.spamProtection);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact({ email, formEnabled, spamProtection });
    setSavedMessage('Contact settings updated!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl font-sans">
      <div className="border-b border-[#8C6D4F]/30 pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          CONTACT FORM &amp; INBOX MANAGEMENT
        </span>
        <h1
          className="text-4xl uppercase tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          CONTACT &amp; INBOX MANAGER
        </h1>
      </div>

      {savedMessage && (
        <div className="p-3 border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono rounded-sm">
          {savedMessage}
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4 font-mono text-xs">
        <div>
          <label className="block text-[#8C6D4F] uppercase mb-1">PUBLIC DISPLAY EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 text-white p-3 rounded-sm outline-none"
          />
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="formEnabled"
              checked={formEnabled}
              onChange={(e) => setFormEnabled(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37]"
            />
            <label htmlFor="formEnabled" className="text-white uppercase">ENABLE INTERACTIVE TERMINAL CONTACT FORM</label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="spamProtection"
              checked={spamProtection}
              onChange={(e) => setSpamProtection(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37]"
            />
            <label htmlFor="spamProtection" className="text-white uppercase">ENABLE CLIENT SPAM PROTECTION &amp; RATE LIMITING</label>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
        >
          SAVE CONTACT SETTINGS ↗
        </button>
      </form>

      {/* Messages Inbox View */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4 font-mono text-xs">
        <h2 className="text-lg text-white font-bold uppercase border-b border-[#8C6D4F]/20 pb-3">
          CONTACT INBOX MESSAGES ({contact.inboxMessages.length})
        </h2>

        <div className="space-y-3">
          {contact.inboxMessages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 border rounded-sm space-y-2 ${
                msg.read ? 'bg-[#0E0C0A] border-[#8C6D4F]/20' : 'bg-[#18130E] border-[#D4AF37]/50'
              }`}
            >
              <div className="flex justify-between items-center border-b border-[#8C6D4F]/20 pb-2">
                <div>
                  <span className="text-white font-bold">{msg.name}</span>
                  <span className="text-[#8C6D4F] ml-2">&lt;{msg.email}&gt;</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-[#8C6D4F]">{msg.date}</span>
                  {!msg.read && (
                    <button
                      type="button"
                      onClick={() => markMessageRead(msg.id)}
                      className="px-2 py-0.5 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                    >
                      MARK READ
                    </button>
                  )}
                </div>
              </div>
              <p className="text-[#E8DFD8] text-xs font-sans">{msg.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminContactManager;
