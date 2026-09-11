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
    <div className="min-h-screen bg-[#0A0908] text-[#F5F2EB] flex items-center justify-center p-6 font-sans selection:bg-[#D4AF37]/30 selection:text-white">
      <div className="w-full max-w-md bg-[#12100E] border border-[#26211B] p-8 sm:p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden card-lift">
        {/* Top Gold Flare */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden bg-white p-2 border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.25)] mb-4">
            <img
              src="/images/brand/tarun-monogram.png"
              alt="Tarun Kumar Monogram"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#1A1714] border border-[#26211B] rounded-full mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
              PORTFOLIO ADMIN CMS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-white mb-2">
            Administrator Portal
          </h1>
          <p className="text-xs text-[#A8988B] font-sans font-light">
            Enter administrator credentials to access the portfolio CMS.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 border border-red-500/40 bg-red-950/20 text-red-300 text-xs font-mono rounded-xl">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
          <div>
            <label className="block text-[10px] text-[#8C6D4F] uppercase tracking-widest mb-2 font-mono">
              // ADMIN USERNAME
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsernameInput(e.target.value)}
              required
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white px-4 py-3.5 rounded-xl outline-none transition-colors font-sans text-xs"
            />
          </div>

          <div>
            <label className="block text-[10px] text-[#8C6D4F] uppercase tracking-widest mb-2 font-mono">
              // ADMIN PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full bg-[#0A0908] border border-[#26211B] focus:border-[#D4AF37] text-white px-4 py-3.5 rounded-xl outline-none transition-colors font-sans text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37] to-[#C49B2C] text-[#0A0908] font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer font-mono"
          >
            AUTHENTICATE &amp; ENTER ↗
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-[#26211B] text-[10.5px] font-mono text-[#8C6D4F]">
          Protected route · Multi-layered authentication active
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
