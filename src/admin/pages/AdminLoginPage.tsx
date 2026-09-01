import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [username, setUsernameInput] = useState('heytarunkumar');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(password, username);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid admin credentials. Please enter a valid password.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#E8DFD8] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-[#0A0806] border border-[#8C6D4F]/40 p-8 rounded-sm shadow-2xl relative overflow-hidden">
        {/* Top Gold Flare */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#14100D] border border-[#8C6D4F]/30 rounded-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
              PORTFOLIO ADMIN CMS
            </span>
          </div>
          <h1
            className="text-4xl uppercase tracking-tight text-white mb-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            TARUN KUMAR ADMIN LOGIN
          </h1>
          <p className="text-xs text-[#A8988B] font-mono">
            Enter administrator password to manage portfolio content.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 border border-red-500/40 bg-red-950/30 text-red-300 text-xs font-mono rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
          <div>
            <label className="block text-[#8C6D4F] uppercase tracking-wider mb-2">
              ADMIN USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsernameInput(e.target.value)}
              required
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[#8C6D4F] uppercase tracking-wider mb-2">
              ADMIN PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (e.g. admin123)"
              required
              className="w-full bg-[#120F0C] border border-[#8C6D4F]/30 focus:border-[#D4AF37] text-white p-3 rounded-sm outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054] transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            AUTHENTICATE &amp; ENTER ↗
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-[#8C6D4F]/20 text-[10.5px] font-mono text-[#8C6D4F]">
          Protected route · Server-side authorization ready
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
