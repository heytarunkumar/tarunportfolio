import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const AdminSettingsPage: React.FC = () => {
  const { updateAdminPassword } = useAuth();
  const [savedMessage, setSavedMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [siteName, setSiteName] = useState('Tarun Kumar Portfolio');
  const [siteUrl, setSiteUrl] = useState('https://www.heytarunkumar.com');
  const [timezone, setTimezone] = useState('Asia/Kolkata (UTC+5:30)');
  const [defaultStatus, setDefaultStatus] = useState('Published');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage('System settings updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    const res = updateAdminPassword(currentPassword, newPassword);
    if (res.success) {
      setPasswordMessage({ type: 'success', text: res.message });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordMessage(null), 4000);
    } else {
      setPasswordMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="space-y-8 max-w-5xl font-sans text-[#E8DFD8]">
      <div className="border-b border-[#26211B] pb-6">
        <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
          SYSTEM CONFIGURATION &amp; DEPLOYMENT PREFERENCES
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
          Settings Manager
        </h1>
        <p className="text-xs text-[#A8988B] mt-1 font-mono">
          Configure site identity, canonical domain, security credentials, and persistence parameters.
        </p>
      </div>

      {savedMessage && (
        <div className="p-4 border border-emerald-500/40 bg-emerald-950/20 text-emerald-300 text-xs font-mono rounded-xl flex items-center justify-between animate-fadeIn">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            ✓ {savedMessage}
          </span>
          <button onClick={() => setSavedMessage('')} className="text-emerald-400 font-bold hover:underline">
            DISMISS
          </button>
        </div>
      )}

      {/* General Settings */}
      <form onSubmit={handleSave} className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift font-sans text-xs">
        <h3 className="text-sm font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
          // SITE CONFIGURATION
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              SITE NAME *
            </label>
            <input
              type="text"
              required
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              SITE CANONICAL URL *
            </label>
            <input
              type="url"
              required
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              SYSTEM TIMEZONE
            </label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              DEFAULT PUBLISHING STATE
            </label>
            <select
              value={defaultStatus}
              onChange={(e) => setDefaultStatus(e.target.value)}
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
            >
              <option value="Published">Published (Live immediately)</option>
              <option value="Draft">Draft (Requires explicit publish)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer font-mono"
        >
          Save System Settings ↗
        </button>
      </form>

      {/* Admin Security & Password Section */}
      <form onSubmit={handlePasswordUpdate} className="bg-[#12100E] border border-[#26211B] p-6 sm:p-8 rounded-2xl space-y-6 card-lift font-sans text-xs">
        <div>
          <h3 className="text-sm font-mono text-[#D4AF37] uppercase tracking-wider font-bold mb-1">
            // ADMIN SECURITY &amp; ACCESS CREDENTIALS
          </h3>
          <p className="text-[11px] text-[#A8988B] font-mono">
            Only you can access this CMS. Use this form to update your master admin password.
          </p>
        </div>

        {passwordMessage && (
          <div className={`p-4 border text-xs font-mono rounded-xl flex items-center justify-between ${
            passwordMessage.type === 'success'
              ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
              : 'border-red-500/40 bg-red-950/20 text-red-300'
          }`}>
            <span>{passwordMessage.type === 'success' ? '✓' : '⚠️'} {passwordMessage.text}</span>
            <button type="button" onClick={() => setPasswordMessage(null)} className="font-bold hover:underline">
              DISMISS
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              CURRENT PASSWORD *
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              NEW PASSWORD *
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min 8 characters"
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
            />
          </div>

          <div>
            <label className="block text-[#A8988B] uppercase font-mono text-[11px] mb-1.5">
              CONFIRM NEW PASSWORD *
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white p-3.5 rounded-xl outline-none font-mono transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl border border-[#26211B] hover:border-[#D4AF37] bg-[#0A0908] text-[#D4AF37] hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer font-mono"
        >
          Update Admin Password 🔒
        </button>
      </form>
    </div>
  );
};

export default AdminSettingsPage;
