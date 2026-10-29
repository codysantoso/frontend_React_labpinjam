# 🔬 Dokumentasi Frontend React — LabPinjam

Dokumentasi antarmuka klien berbasis **React 18**, **Vite**, dan **Tailwind CSS** yang terhubung ke backend **LabPinjam API** (Laravel Sanctum).

---

## 📂 Struktur Proyek Frontend

Direktori proyek: `D:\laragondev\www\frontend_React_labpinjam/`

```text
D:\laragondev\www\frontend_React_labpinjam/
├── src/
│   ├── api.js                      <-- Axios Client & Interceptor Token Sanctum (Bearer)
│   ├── App.jsx                     <-- State Utama & Routing Tab (Katalog & Peminjaman)
│   ├── main.jsx & index.css        <-- Bootstrap React & Konfigurasi Tailwind CSS
│   └── components/
│       ├── Navbar.jsx              <-- Header navigasi, tab switch, & info sesi user
│       ├── AuthModal.jsx           <-- Modal Login & Register (+ 1-Click Demo Login)
│       ├── AlatCard.jsx            <-- Kartu alat lab, status stok, & tombol aksi
│       ├── PinjamModal.jsx         <-- Form pengajuan peminjaman (jumlah & tanggal)
│       ├── AlatFormModal.jsx       <-- Form Tambah/Edit Master Alat (Khusus Admin)
│       └── PeminjamanTable.jsx     <-- Tabel riwayat peminjaman & aksi status admin
├── .env                            <-- VITE_API_URL=http://127.0.0.1:8000/api/v1
├── package.json                    <-- React 18, Vite, Tailwind CSS, Lucide Icons, Axios
└── README.md                       <-- Panduan menjalankan aplikasi
```

---

## ✨ Fitur Unggulan Antarmuka

- **Autentikasi Token Sanctum Otomatis (`api.js`):**  
  Token disimpan di `localStorage` dan secara otomatis disisipkan ke header `Authorization: Bearer <token>` pada setiap permintaan API. Jika sesi kedaluwarsa (`401 Unauthorized`), token otomatis dibersihkan.
- **1-Click Demo Login (`AuthModal.jsx`):**  
  Tombol instan untuk langsung mengisi kredensial Admin Lab (`admin@kampus.ac.id`) atau Mahasiswa (`mahasiswa@kampus.ac.id`) tanpa perlu mengetik manual.
- **Katalog Alat & Pencarian Cepat:**  
  Menampilkan daftar alat laboratorium, indikator stok dinamis (*In Stock* / *Habis*), kondisi alat, dan pencarian instan berdasarkan nama atau kode alat.
- **Alur Peminjaman Interaktif (`PinjamModal.jsx`):**  
  Mahasiswa dapat meminjam alat dengan memilih jumlah dan tanggal peminjaman. Stok pada backend akan otomatis berkurang secara atomik.
- **Panel Kontrol Admin:**  
  Tambah, edit, dan hapus master alat inventaris. Setujui peminjaman (`disetujui`), tolak (`ditolak`), atau tandai selesai (`selesai`). Saat peminjaman selesai/ditolak, stok alat otomatis bertambah kembali di katalog.

---

## 🚀 Cara Menjalankan Aplikasi

Jalankan backend Laravel dan frontend React di dua terminal terpisah:

### 1. Jalankan Backend Laravel (Terminal 1)
```powershell
cd D:\laragondev\www\labpinjam-api
php artisan serve
```
> Server backend aktif di: `http://127.0.0.1:8000`

### 2. Jalankan Frontend React (Terminal 2)
```powershell
cd D:\laragondev\www\frontend_React_labpinjam
npm run dev
```
> Aplikasi web frontend aktif di: `http://localhost:5173`

Buka peramban di `http://localhost:5173` untuk langsung mencoba sistem peminjaman alat laboratorium!
