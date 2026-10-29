import React from 'react';
import { CheckCircle2, Clock, XCircle, ArrowUpRight, Trash2, Calendar, Package, User } from 'lucide-react';
import api from '../api';

export default function PeminjamanTable({ peminjamans, user, onReload, onAlert }) {
  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await api.patch(`/peminjamans/${id}/status`, { status });
      if (res.data.success) {
        onAlert(res.data.message || `Status berhasil diubah menjadi ${status}`);
        onReload();
      }
    } catch (err) {
      onAlert(err.response?.data?.message || 'Gagal mengubah status peminjaman.', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus catatan peminjaman ini?')) return;
    try {
      await api.delete(`/peminjamans/${id}`);
      onAlert('Catatan peminjaman berhasil dihapus.');
      onReload();
    } catch (err) {
      onAlert(err.response?.data?.message || 'Gagal menghapus catatan peminjaman.', 'error');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'disetujui':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <CheckCircle2 className="w-3 h-3 text-sky-500" />
            Disetujui
          </span>
        );
      case 'selesai':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            Selesai
          </span>
        );
      case 'ditolak':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-500" />
            Ditolak
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-500 animate-spin" />
            Menunggu
          </span>
        );
    }
  };

  if (peminjamans.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/80 max-w-lg mx-auto shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
          <Clock className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-slate-800 text-sm mb-1">Belum Ada Riwayat Peminjaman</h4>
        <p className="text-xs text-slate-500">
          {user?.role === 'admin'
            ? 'Belum ada mahasiswa yang mengajukan peminjaman alat.'
            : 'Anda belum pernah mengajukan peminjaman alat laboratorium.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      
      {/* 📱 Mobile Card View (Muncul di layar HP / Layar Kecil) */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {peminjamans.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
            
            {/* Header: Kode & Status */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                {item.kode_pinjam}
              </span>
              {getStatusBadge(item.status)}
            </div>

            {/* Alat & Jumlah */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Package className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-xs text-slate-900 truncate">
                  {item.alat?.nama_alat || `Alat #${item.alat_id}`}
                </h5>
                <p className="text-[11px] text-slate-500 font-mono">
                  {item.alat?.kode_alat} • <span className="font-semibold text-slate-700">{item.jumlah} unit</span>
                </p>
              </div>
            </div>

            {/* Info Peminjam & Jadwal */}
            <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl">
              <div>
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Peminjam</span>
                <span className="font-semibold text-slate-700 truncate block">
                  {item.user?.name || `User #${item.user_id}`}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Jadwal Pinjam</span>
                <span className="text-slate-700 block">
                  {item.tanggal_pinjam} s/d <strong>{item.tanggal_kembali}</strong>
                </span>
              </div>
            </div>

            {/* Aksi Khusus Admin di Mobile */}
            {user?.role === 'admin' && (
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                {item.status === 'menunggu' && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'disetujui')}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold text-xs border border-sky-200 transition text-center"
                    >
                      Setujui
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(item.id, 'ditolak')}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs border border-rose-200 transition text-center"
                    >
                      Tolak
                    </button>
                  </>
                )}

                {item.status === 'disetujui' && (
                  <button
                    onClick={() => handleUpdateStatus(item.id, 'selesai')}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs border border-emerald-200 transition flex items-center justify-center gap-1"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Tandai Kembali</span>
                  </button>
                )}

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* 💻 Desktop Table View (Muncul di layar Tablet & Desktop) */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Kode Pinjam</th>
                <th className="py-3.5 px-4">Peminjam</th>
                <th className="py-3.5 px-4">Alat Laboratorium</th>
                <th className="py-3.5 px-4">Jumlah</th>
                <th className="py-3.5 px-4">Jadwal Pinjam</th>
                <th className="py-3.5 px-4">Status</th>
                {user?.role === 'admin' && <th className="py-3.5 px-4 text-right">Aksi Admin</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {peminjamans.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {item.kode_pinjam}
                  </td>
                  
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{item.user?.name || `User #${item.user_id}`}</div>
                    <div className="text-[11px] text-slate-400">{item.user?.email}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{item.alat?.nama_alat || `Alat #${item.alat_id}`}</div>
                    <div className="font-mono text-[10px] text-slate-400">{item.alat?.kode_alat}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {item.jumlah} unit
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-slate-700 font-medium">{item.tanggal_pinjam}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <span>s/d</span>
                      <span className="font-semibold text-slate-600">{item.tanggal_kembali}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {getStatusBadge(item.status)}
                  </td>

                  {user?.role === 'admin' && (
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.status === 'menunggu' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'disetujui')}
                              className="px-2 py-1 rounded bg-sky-50 text-sky-700 hover:bg-sky-100 font-semibold text-[11px] border border-sky-200 transition"
                            >
                              Setujui
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'ditolak')}
                              className="px-2 py-1 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-[11px] border border-rose-200 transition"
                            >
                              Tolak
                            </button>
                          </>
                        )}

                        {item.status === 'disetujui' && (
                          <button
                            onClick={() => handleUpdateStatus(item.id, 'selesai')}
                            className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold text-[11px] border border-emerald-200 transition flex items-center gap-1"
                          >
                            <ArrowUpRight className="w-3 h-3" />
                            <span>Kembali</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
