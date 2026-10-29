import React from 'react';
import { Cpu, Edit, Trash2, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AlatCard({ alat, user, onPinjam, onEdit, onDelete }) {
  const isAvailable = alat.stok > 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      
      <div>
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
            {alat.kode_alat}
          </span>

          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            isAvailable 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}>
            {isAvailable ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Stok: {alat.stok}
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 text-rose-600" />
                Habis
              </>
            )}
          </span>
        </div>

        {/* Title & Detail */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition line-clamp-1">
              {alat.nama_alat}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] text-slate-500">Kondisi:</span>
              <span className="text-[11px] font-medium text-slate-700 px-1.5 py-0.5 bg-slate-100 rounded">
                {alat.kondisi || 'Baik'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        {user?.role === 'admin' ? (
          <div className="flex items-center gap-2 w-full">
            <button
              onClick={() => onEdit(alat)}
              className="flex-1 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => onDelete(alat.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
              title="Hapus Alat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => onPinjam(alat)}
            disabled={!isAvailable}
            className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              isAvailable
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>{isAvailable ? 'Pinjam Alat' : 'Stok Kosong'}</span>
            {isAvailable && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

    </div>
  );
}

