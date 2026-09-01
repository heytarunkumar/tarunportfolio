import React, { useState } from 'react';
import { GmailService, TARGET_GMAIL_ACCOUNT } from '../../../services/gmailService';
import type { OAuthCredentials } from '../../../types/gmail';

interface MailSettingsPanelProps {
  credentials: OAuthCredentials;
  onSaveCredentials: (creds: Partial<OAuthCredentials>) => void;
  onDisconnect: () => void;
  isConnected: boolean;
}

export const MailSettingsPanel: React.FC<MailSettingsPanelProps> = ({
  credentials,
  onSaveCredentials,
  onDisconnect,
  isConnected,
}) => {
  const [clientId, setClientId] = useState(credentials.clientId || '');
  const [clientSecret, setClientSecret] = useState(credentials.clientSecret || '');
  const [redirectUri, setRedirectUri] = useState(credentials.redirectUri || '');
  const [refreshToken, setRefreshToken] = useState(credentials.refreshToken || '');

  const [savedMessage, setSavedMessage] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCredentials({
      clientId: clientId.trim(),
      clientSecret: clientSecret.trim(),
      redirectUri: redirectUri.trim(),
      refreshToken: refreshToken.trim(),
    });
    setSavedMessage('OAuth 2.0 credentials & refresh token saved!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const authUrl = GmailService.getGoogleAuthUrl();

  const handleConnectClick = (e: React.MouseEvent) => {
    if (!clientId.trim() || clientId.includes('YOUR_GOOGLE_CLIENT_ID')) {
      e.preventDefault();
      setSavedMessage('⚠️ Please paste your Google Client ID in the form below and click "SAVE OAUTH CREDENTIALS" first!');
      setTimeout(() => setSavedMessage(''), 5000);
    }
  };

  return (
    <div className="flex-1 bg-[#050403] p-6 sm:p-10 overflow-y-auto space-y-8 font-mono text-xs text-[#E8DFD8]">
      
      {/* Header */}
      <div className="border-b border-[#8C6D4F]/30 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase block mb-1">
            GMAIL API &amp; OAUTH 2.0 INTEGRATION CENTER
          </span>
          <h1
            className="text-4xl uppercase tracking-tight text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            MAIL SETTINGS &amp; CONNECTION
          </h1>
          <p className="text-xs text-[#A8988B] mt-1 font-mono">
            Connect to Tarun Kumar&apos;s official Gmail account (<code className="text-[#D4AF37]">{TARGET_GMAIL_ACCOUNT}</code>) via Google OAuth 2.0 and Gmail API REST endpoints.
          </p>
        </div>

        <div className="shrink-0 self-start sm:self-auto">
          <span
            className={`px-3 py-1.5 border rounded-sm font-bold text-xs uppercase flex items-center space-x-2 ${
              isConnected
                ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
                : 'border-amber-500/50 bg-amber-950/40 text-amber-300'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>{isConnected ? 'GMAIL CONNECTED ✓' : 'SANDBOX SIMULATOR MODE'}</span>
          </span>
        </div>
      </div>

      {savedMessage && (
        <div className="p-4 border border-amber-500/50 bg-amber-950/40 text-amber-200 text-xs font-mono rounded-sm flex items-center justify-between animate-fadeIn">
          <span>{savedMessage}</span>
          <button onClick={() => setSavedMessage('')} className="text-amber-300 font-bold hover:underline">
            DISMISS
          </button>
        </div>
      )}

      {/* Target Mailbox Status Card */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
        <h2 className="text-sm text-[#D4AF37] tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
          TARGET MAILBOX CONNECTION METADATA
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-[#120F0C] border border-[#8C6D4F]/20 rounded-sm">
            <span className="text-[#8C6D4F] uppercase text-[10px] block mb-1">CONFIGURED GMAIL MAILBOX</span>
            <span className="text-white font-bold text-sm block truncate">{TARGET_GMAIL_ACCOUNT}</span>
          </div>

          <div className="p-4 bg-[#120F0C] border border-[#8C6D4F]/20 rounded-sm">
            <span className="text-[#8C6D4F] uppercase text-[10px] block mb-1">API CONNECTION STATE</span>
            <span className="text-white font-bold text-sm block">
              {isConnected ? 'OAuth 2.0 Active' : 'Offline / Sandbox Client'}
            </span>
          </div>

          <div className="p-4 bg-[#120F0C] border border-[#8C6D4F]/20 rounded-sm">
            <span className="text-[#8C6D4F] uppercase text-[10px] block mb-1">REQUIRED GMAIL SCOPES</span>
            <span className="text-white font-bold text-xs block">readonly, send, compose, modify, labels</span>
          </div>
        </div>

        {/* OAuth Authentication Button */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={authUrl}
            onClick={handleConnectClick}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054] inline-flex items-center space-x-2"
          >
            <span>🔐 CONNECT VIA GOOGLE OAUTH 2.0 ↗</span>
          </a>

          {isConnected && (
            <button
              type="button"
              onClick={onDisconnect}
              className="px-4 py-3 border border-red-500/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 font-bold uppercase"
            >
              DISCONNECT GMAIL MAILBOX ✕
            </button>
          )}
        </div>
      </div>

      {/* OAuth Credentials Form */}
      <form onSubmit={handleSave} className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-6 font-mono text-xs">
        <h2 className="text-sm text-[#D4AF37] tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
          GOOGLE CLOUD OAUTH 2.0 CREDENTIALS CONFIGURATION
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              GOOGLE CLIENT ID (GOOGLE_CLIENT_ID)
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="e.g. 1234567890-abc.apps.googleusercontent.com"
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              GOOGLE CLIENT SECRET (GOOGLE_CLIENT_SECRET)
            </label>
            <input
              type="password"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
              placeholder="••••••••••••••••••••"
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              AUTHORIZED OAUTH REDIRECT URI (GOOGLE_REDIRECT_URI)
            </label>
            <input
              type="text"
              value={redirectUri}
              onChange={(e) => setRedirectUri(e.target.value)}
              placeholder="https://heytarunkumar.vercel.app/admin/mail/settings"
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase mb-1">
              PERSISTED REFRESH TOKEN (GMAIL_REFRESH_TOKEN)
            </label>
            <input
              type="password"
              value={refreshToken}
              onChange={(e) => setRefreshToken(e.target.value)}
              placeholder="1//04... (Stored securely server-side)"
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
        >
          SAVE OAUTH CREDENTIALS ↗
        </button>
      </form>

      {/* Google Cloud Setup Guide */}
      <div className="bg-[#0A0806] border border-[#8C6D4F]/30 p-6 rounded-sm space-y-4">
        <h2 className="text-sm text-[#D4AF37] tracking-wider uppercase border-b border-[#8C6D4F]/20 pb-3">
          📖 GOOGLE CLOUD PROJECT &amp; GMAIL API SETUP INSTRUCTIONS
        </h2>

        <ol className="list-decimal list-inside space-y-3 text-[#A8988B] font-mono leading-relaxed text-xs">
          <li>
            <strong className="text-white">Create Google Cloud Project:</strong> Navigate to{' '}
            <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer" className="text-[#D4AF37] underline">
              Google Cloud Console
            </a>{' '}
            and create a project named <code className="text-white">Tarun Portfolio Mail Center</code>.
          </li>
          <li>
            <strong className="text-white">Enable Gmail API:</strong> Go to <em>APIs &amp; Services &gt; Library</em>, search for <strong>Gmail API</strong>, and click <strong>Enable</strong>.
          </li>
          <li>
            <strong className="text-white">Configure OAuth Consent Screen:</strong> Set User Type to <strong>External</strong> or <strong>Internal</strong>, add support email <code className="text-white">{TARGET_GMAIL_ACCOUNT}</code>, and add target test user <code className="text-white">{TARGET_GMAIL_ACCOUNT}</code>.
          </li>
          <li>
            <strong className="text-white">Grant Least-Privilege Scopes:</strong> Add the following Gmail API scopes:
            <div className="p-3 bg-[#120F0C] border border-[#8C6D4F]/30 rounded-sm text-emerald-400 mt-1 font-mono text-[11px]">
              https://www.googleapis.com/auth/gmail.readonly<br />
              https://www.googleapis.com/auth/gmail.send<br />
              https://www.googleapis.com/auth/gmail.compose<br />
              https://www.googleapis.com/auth/gmail.modify<br />
              https://www.googleapis.com/auth/gmail.labels
            </div>
          </li>
          <li>
            <strong className="text-white">Create OAuth 2.0 Web Client:</strong> Go to <em>Credentials &gt; Create Credentials &gt; OAuth client ID</em>. Choose <strong>Web Application</strong>.
          </li>
          <li>
            <strong className="text-white">Set Redirect URI:</strong> Add Authorized redirect URI:
            <code className="text-[#D4AF37] block mt-1">https://heytarunkumar.vercel.app/admin/mail/settings</code>
          </li>
          <li>
            <strong className="text-white">Copy Client ID &amp; Secret:</strong> Copy the generated Client ID and Client Secret into the form above or set environment variables in Vercel:
            <div className="p-3 bg-[#120F0C] border border-[#8C6D4F]/30 rounded-sm text-[#C4B5A5] mt-1 font-mono text-[11px]">
              VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com<br />
              VITE_GOOGLE_CLIENT_SECRET=your-client-secret<br />
              VITE_GOOGLE_REDIRECT_URI=https://heytarunkumar.vercel.app/admin/mail/settings<br />
              VITE_GMAIL_REFRESH_TOKEN=your-refresh-token
            </div>
          </li>
        </ol>
      </div>

    </div>
  );
};
