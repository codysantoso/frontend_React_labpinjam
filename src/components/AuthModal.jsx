import React, { useState } from 'react';
import { X, Lock, Mail, User, Shield, GraduationCap, Loader2 } from 'lucide-react';
import api from '../api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mahasiswa');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await api.post('/login', { email, password });
        if (res.data.success) {
          onAuthSuccess(res.data.token, res.data.user);
          onClose();
        }
      } else {
        const res = await api.post('/register', { name, email, password, role });
        if (res.data.success) {
          onAuthSuccess(res.data.token, res.data.data);
          onClose();
        }
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Terjadi kesalahan saat memproses permintaan.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Quick fill helper untuk demo
  const fillDemo = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setMode('login');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">
              {mode === 'login' ? 'Masuk ke LabPinjam' : 'Buat Akun Baru'}
            </h3>
            <p className="text-xs text-slate-500">
              {mode === 'login' ? 'Gunakan token Sanctum untuk mengakses API' : 'Daftar sebagai mahasiswa laboratorium'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switch Tabs */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold text-center">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`py-2 rounded-lg transition-all ${mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Masuk (Login)
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`py-2 rounded-lg transition-all ${mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Daftar (Register)
            </button>
          </div>
        </div>

        {/* Quick Demo Login Bar */}
        {mode === 'login' && (
          <div className="px-6 pt-3">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100/80">
              <span className="text-[11px] font-bold text-emerald-800 block mb-1.5">⚡ Login Cepat Demo:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fillDemo('admin@kampus.ac.id', 'password123')}
                  className="flex-1 py-1.5 px-2 bg-white rounded-lg border border-emerald-200 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100/50 transition flex items-center justify-center gap-1 shadow-2xs"
                >
                  <Shield className="w-3 h-3 text-rose-600" />
                  Admin Lab
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo('mahasiswa@kampus.ac.id', 'password123')}
                  className="flex-1 py-1.5 px-2 bg-white rounded-lg border border-emerald-200 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100/50 transition flex items-center justify-center gap-1 shadow-2xs"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                  Mahasiswa
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="nama@kampus.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="Minimal 8 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <span>{mode === 'login' ? 'Masuk Sekarang' : 'Daftar Akun'}</span>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}

