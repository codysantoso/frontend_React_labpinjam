import React from 'react';
import { Microscope, LogIn, LogOut, User as UserIcon, Shield, Clock } from 'lucide-react';

export default function Navbar({ user, onOpenAuth, onLogout, activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('katalog')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Microscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">LabPinjam</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                React App
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">Sistem Inventaris & Peminjaman Lab</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('katalog')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'katalog'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Katalog Alat
          </button>
          
          <button
            onClick={() => setActiveTab('peminjaman')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'peminjaman'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Peminjaman</span>
          </button>
        </nav>

        {/* User Info / Auth Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-800">{user.name}</span>
                <span className="text-[10px] font-medium text-slate-500 flex items-center justify-end gap-1">
                  {user.role === 'admin' ? (
                    <span className="inline-flex items-center gap-0.5 text-rose-600 font-semibold">
                      <Shield className="w-3 h-3" /> Admin/Laboran
                    </span>
                  ) : (
                    <span className="text-emerald-600 font-semibold">Mahasiswa</span>
                  )}
                </span>
              </div>
              
              <button
                onClick={onLogout}
                title="Keluar"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 transition border border-slate-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/30 transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Masuk / Login</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}

