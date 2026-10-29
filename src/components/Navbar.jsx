import React from 'react';
import { Microscope, LogIn, LogOut, Shield, Clock, Package, User as UserIcon } from 'lucide-react';

export default function Navbar({ user, onOpenAuth, onLogout, activeTab, setActiveTab }) {
  return (
    <>
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('katalog')}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 shrink-0">
              <Microscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">LabPinjam</span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  React
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 hidden sm:block">Sistem Inventaris & Peminjaman Lab</p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
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

          {/* User Info & Auth Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-800 block truncate max-w-[120px] sm:max-w-none">{user.name}</span>
                  <span className="text-[10px] font-medium text-slate-500 flex items-center justify-end gap-1">
                    {user.role === 'admin' ? (
                      <span className="inline-flex items-center gap-0.5 text-rose-600 font-semibold">
                        <Shield className="w-3 h-3" /> Admin
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-semibold">Mahasiswa</span>
                    )}
                  </span>
                </div>
                
                <button
                  onClick={onLogout}
                  title="Keluar"
                  className="inline-flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 text-xs font-medium rounded-lg text-slate-700 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 transition border border-slate-200"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/30 transition"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Masuk</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Bottom Navigation Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 md:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.05)] safe-area-pb">
        <div className="grid grid-cols-2 h-14">
          <button
            onClick={() => setActiveTab('katalog')}
            className={`flex flex-col items-center justify-center gap-1 transition-all ${
              activeTab === 'katalog'
                ? 'text-emerald-600 font-bold'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-[10px]">Katalog Alat</span>
          </button>

          <button
            onClick={() => setActiveTab('peminjaman')}
            className={`flex flex-col items-center justify-center gap-1 transition-all ${
              activeTab === 'peminjaman'
                ? 'text-emerald-600 font-bold'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="text-[10px]">Peminjaman</span>
          </button>
        </div>
      </nav>
    </>
  );
}
