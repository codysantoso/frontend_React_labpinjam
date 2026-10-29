import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import AlatCard from './components/AlatCard';
import PinjamModal from './components/PinjamModal';
import AlatFormModal from './components/AlatFormModal';
import PeminjamanTable from './components/PeminjamanTable';
import api from './api';
import { 
  Plus, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Microscope, 
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('labpinjam_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState('katalog'); // 'katalog' | 'peminjaman'
  const [alats, setAlats] = useState([]);
  const [peminjamans, setPeminjamans] = useState([]);
  const [loadingAlat, setLoadingAlat] = useState(true);
  const [loadingPeminjaman, setLoadingPeminjaman] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [pinjamModalOpen, setPinjamModalOpen] = useState(false);
  const [alatFormModalOpen, setAlatFormModalOpen] = useState(false);
  const [selectedAlat, setSelectedAlat] = useState(null);

  // Alert Banner
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  // Fetch Alats
  const loadAlats = async () => {
    setLoadingAlat(true);
    try {
      const res = await api.get('/alats');
      setAlats(res.data.data || []);
    } catch (err) {
      console.error('Gagal mengambil daftar alat:', err);
    } finally {
      setLoadingAlat(false);
    }
  };

  // Fetch Peminjamans
  const loadPeminjamans = async () => {
    if (!user) return;
    setLoadingPeminjaman(true);
    try {
      const res = await api.get('/peminjamans');
      setPeminjamans(res.data.data || []);
    } catch (err) {
      console.error('Gagal mengambil riwayat peminjaman:', err);
    } finally {
      setLoadingPeminjaman(false);
    }
  };

  useEffect(() => {
    loadAlats();
  }, []);

  useEffect(() => {
    if (user && activeTab === 'peminjaman') {
      loadPeminjamans();
    }
  }, [user, activeTab]);

  // Auth Handlers
  const handleAuthSuccess = (token, userData) => {
    localStorage.setItem('labpinjam_token', token);
    localStorage.setItem('labpinjam_user', JSON.stringify(userData));
    setUser(userData);
    showAlert(`Selamat datang kembali, ${userData.name}!`);
    loadAlats();
    if (activeTab === 'peminjaman') {
      loadPeminjamans();
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      // Ignore network errors on logout
    }
    localStorage.removeItem('labpinjam_token');
    localStorage.removeItem('labpinjam_user');
    setUser(null);
    setPeminjamans([]);
    showAlert('Anda telah berhasil keluar (token dicabut).');
  };

  // Mahasiswa Pinjam Alat
  const handleOpenPinjam = (alat) => {
    if (!user) {
      setAuthMode('login');
      setAuthModalOpen(true);
      showAlert('Silakan login terlebih dahulu untuk mengajukan peminjaman.', 'error');
      return;
    }
    setSelectedAlat(alat);
    setPinjamModalOpen(true);
  };

  // Admin Edit Alat
  const handleOpenEditAlat = (alat) => {
    setSelectedAlat(alat);
    setAlatFormModalOpen(true);
  };

  // Admin Add Alat
  const handleOpenAddAlat = () => {
    setSelectedAlat(null);
    setAlatFormModalOpen(true);
  };

  // Admin Delete Alat
  const handleDeleteAlat = async (id) => {
    if (!window.confirm('Yakin ingin menghapus item alat ini dari inventaris?')) return;
    try {
      await api.delete(`/alats/${id}`);
      showAlert('Alat laboratorium berhasil dihapus dari inventaris.');
      loadAlats();
    } catch (err) {
      showAlert(err.response?.data?.message || 'Gagal menghapus alat.', 'error');
    }
  };

  // Filter Alats by Search
  const filteredAlats = alats.filter((item) => 
    item.nama_alat?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.kode_alat?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      
      {/* Top Navbar */}
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setAuthModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">

        {/* Alert Notification */}
        {alert && (
          <div className={`p-4 rounded-2xl flex items-center justify-between text-xs font-semibold shadow-sm transition-all animate-in fade-in ${
            alert.type === 'error'
              ? 'bg-rose-50 text-rose-800 border border-rose-200'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          }`}>
            <div className="flex items-center gap-2">
              {alert.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              <span>{alert.message}</span>
            </div>
            <button onClick={() => setAlert(null)} className="text-slate-400 hover:text-slate-600">×</button>
          </div>
        )}

        {/* Hero Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Terhubung ke RESTful API Laravel (v1)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Sistem Peminjaman & Inventaris Lab
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Frontend React modern yang terintegrasi dengan backend Laravel Sanctum. 
              Mendukung transaksi pengurangan stok atomik, proteksi peran (Admin & Mahasiswa), serta data real-time.
            </p>
          </div>
          
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-8 translate-y-8">
            <Microscope className="w-72 h-72 text-white" />
          </div>
        </div>

        {/* Tab 1: Katalog Alat */}
        {activeTab === 'katalog' && (
          <section className="space-y-6">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Cari alat laboratorium atau kode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs transition"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={loadAlats}
                  className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition"
                  title="Segarkan Data"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingAlat ? 'animate-spin text-emerald-600' : ''}`} />
                </button>

                {user?.role === 'admin' && (
                  <button
                    onClick={handleOpenAddAlat}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-sm shadow-emerald-600/30 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Alat</span>
                  </button>
                )}
              </div>
            </div>

            {/* Grid Alat Cards */}
            {loadingAlat ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-44 bg-white rounded-2xl border border-slate-200 animate-pulse p-5">
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-100 rounded w-1/2 mb-6"></div>
                    <div className="h-8 bg-slate-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredAlats.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredAlats.map((alat) => (
                  <AlatCard
                    key={alat.id}
                    alat={alat}
                    user={user}
                    onPinjam={handleOpenPinjam}
                    onEdit={handleOpenEditAlat}
                    onDelete={handleDeleteAlat}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center max-w-md mx-auto">
                <Layers className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <h4 className="font-bold text-slate-800 text-sm">Tidak ada alat ditemukan</h4>
                <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian Anda.</p>
              </div>
            )}

          </section>
        )}

        {/* Tab 2: Riwayat Peminjaman */}
        {activeTab === 'peminjaman' && (
          <section className="space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {user?.role === 'admin' ? 'Seluruh Riwayat Peminjaman (Admin)' : 'Peminjaman Saya'}
                </h3>
                <p className="text-xs text-slate-500">
                  {user?.role === 'admin'
                    ? 'Kelola persetujuan dan pengembalian stok alat mahasiswa'
                    : 'Pantau status permohonan peminjaman alat laboratorium Anda'}
                </p>
              </div>

              {user && (
                <button
                  onClick={loadPeminjamans}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold shadow-2xs transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingPeminjaman ? 'animate-spin text-emerald-600' : ''}`} />
                  <span>Segarkan</span>
                </button>
              )}
            </div>

            {!user ? (
              <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center max-w-md mx-auto space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center font-bold">
                  🔒
                </div>
                <h4 className="font-bold text-slate-800 text-sm">Autentikasi Diperlukan</h4>
                <p className="text-xs text-slate-500">
                  Silakan masuk terlebih dahulu untuk melihat riwayat peminjaman alat laboratorium Anda.
                </p>
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setAuthModalOpen(true);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition"
                >
                  Masuk Sekarang
                </button>
              </div>
            ) : loadingPeminjaman ? (
              <div className="p-12 text-center text-xs text-slate-400">
                Memuat data riwayat peminjaman...
              </div>
            ) : (
              <PeminjamanTable
                peminjamans={peminjamans}
                user={user}
                onReload={() => {
                  loadPeminjamans();
                  loadAlats(); // Segarkan stok alat
                }}
                onAlert={showAlert}
              />
            )}

          </section>
        )}

      </main>

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authMode}
      />

      <PinjamModal
        isOpen={pinjamModalOpen}
        onClose={() => setPinjamModalOpen(false)}
        alat={selectedAlat}
        onSuccess={(msg) => {
          showAlert(msg);
          loadAlats();
          if (activeTab === 'peminjaman') {
            loadPeminjamans();
          }
        }}
      />

      <AlatFormModal
        isOpen={alatFormModalOpen}
        onClose={() => setAlatFormModalOpen(false)}
        alat={selectedAlat}
        onSuccess={(msg) => {
          showAlert(msg);
          loadAlats();
        }}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            <strong>LabPinjam Frontend</strong> — Aplikasi Klien React 18 & Tailwind CSS.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="http://127.0.0.1:8000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-emerald-600 hover:underline"
            >
              <span>Server Laravel API</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

