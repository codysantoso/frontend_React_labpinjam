# 🔬 LabPinjam — Frontend React

Frontend modern berbasis **React 18**, **Vite**, dan **Tailwind CSS** untuk mengonsumsi RESTful API **LabPinjam API** (Laravel Sanctum).

## 🚀 Fitur Aplikasi
- 🔐 **Autentikasi Token Sanctum**: Login, Register, Logout (dengan 1-Click demo login untuk Admin & Mahasiswa).
- 📦 **Katalog Alat Laboratorium**: Tampilan kartu inventaris, pencarian instan, dan indikator ketersediaan stok.
- 📋 **Formulir Peminjaman Alat**: Transaksi peminjaman alat dengan validasi tanggal dan jumlah stok.
- 🛡️ **Panel Kontrol Admin/Laboran**:
  - Tambah, edit, dan hapus master alat.
  - Verifikasi persetujuan peminjaman (`disetujui`, `ditolak`, `selesai`).
  - Pemulihan stok alat otomatis saat barang dikembalikan.

## 🛠️ Cara Menjalankan

1. **Pastikan Backend Laravel Berjalan:**
   ```bash
   cd D:\laragondev\www\labpinjam-api
   php artisan serve
   ```
   Backend aktif di: `http://127.0.0.1:8000`

2. **Install Dependensi Frontend:**
   ```bash
   cd D:\laragondev\www\frontend_React_labpinjam
   npm install
   ```

3. **Jalankan Server Development:**
   ```bash
   npm run dev
   ```
   Akses antarmuka di: `http://localhost:5173`

