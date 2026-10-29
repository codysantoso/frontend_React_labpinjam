import React, { useState, useEffect } from 'react';
import { X, Tag, Package, Hash, CheckSquare, Loader2 } from 'lucide-react';
import api from '../api';

export default function AlatFormModal({ isOpen, onClose, alat, onSuccess }) {
  if (!isOpen) return null;

  const isEdit = Boolean(alat);

  const [kodeAlat, setKodeAlat] = useState('');
  const [namaAlat, setNamaAlat] = useState('');
  const [stok, setStok] = useState(1);
  const [kondisi, setKondisi] = useState('Baik');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (alat) {
      setKodeAlat(alat.kode_alat || '');
      setNamaAlat(alat.nama_alat || '');
      setStok(alat.stok || 0);
      setKondisi(alat.kondisi || 'Baik');
    } else {
      setKodeAlat('');
      setNamaAlat('');
      setStok(1);
      setKondisi('Baik');
    }
  }, [alat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        kode_alat: kodeAlat,
        nama_alat: namaAlat,
        stok: parseInt(stok, 10),
        kondisi: kondisi,
      };

      if (isEdit) {
        await api.put(`/alats/${alat.id}`, payload);
        onSuccess('Alat laboratorium berhasil diperbarui!');
      } else {
        await api.post('/alats', payload);
        onSuccess('Alat laboratorium baru berhasil ditambahkan!');
      }
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal menyimpan data alat.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">
              {isEdit ? 'Edit Alat Laboratorium' : 'Tambah Alat Baru'}
            </h3>
            <p className="text-xs text-slate-500">Kelola master inventaris alat</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Kode Alat</label>
            <div className="relative">
              <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                placeholder="Contoh: LAB-005"
                value={kodeAlat}
                onChange={(e) => setKodeAlat(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nama Alat</label>
            <div className="relative">
              <Package className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                placeholder="Contoh: Logic Analyzer 24MHz"
                value={namaAlat}
                onChange={(e) => setNamaAlat(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Stok Awal</label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="number"
                  min="0"
                  required
                  value={stok}
                  onChange={(e) => setStok(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kondisi</label>
              <div className="relative">
                <CheckSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={kondisi}
                  onChange={(e) => setKondisi(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                >
                  <option value="Baik">Baik</option>
                  <option value="Sangat Baik">Sangat Baik</option>
                  <option value="Cukup">Cukup</option>
                  <option value="Perlu Perbaikan">Perlu Perbaikan</option>
                </select>
              </div>
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
                <span>Menyimpan Data...</span>
              </>
            ) : (
              <span>{isEdit ? 'Simpan Perubahan' : 'Tambahkan Alat'}</span>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}

