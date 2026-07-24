# HANDOVER DOCUMENT & CHECKPOINT: HER-AI FELLOWSHIP PROJECT
**Date:** July 23, 2026
**Target:** New AI Agent / Developer taking over the next session.

---

## 1. PROJECT STATUS & CURRENT CHECKPOINT
Sistem HerAI Fellowship beroperasi sebagai Single Page Application (SPA) murni dengan **Hash Routing** (Vanilla JS). Sampai sesi ini, pengerjaan difokuskan pada tiga ranah utama:
1. **Penyelarasan UI/UX Modul Peserta** (Front-End)
2. **Keamanan Data dan Integrasi Google Apps Script (GAS)** (Back-End)
3. **Optimalisasi Deployment di Vercel & Bug Fixing Performa Router** (DevOps/Deployment)

---

## 2. DETAIL PERUBAHAN & IMPLEMENTASI TERAKHIR

### A. Refactoring Layout Modul Peserta (Frontend)
- **Tujuan:** Menyamakan tata letak (layout) seluruh modul materi AI (Python, Reasoning, Modern AI, ML Basic, Evaluation, Evolution) agar sama persis dengan desain premium pada modul `01-pengantar-ai`.
- **Eksekusi:** 
  - Tidak lagi menggunakan file HTML pecahan (`materi.html`, `latihan.html`, `kuis.html`, `diskusi.html`) untuk setiap sub-modul karena menyusahkan pengelolaan layout.
  - Semua HTML sekarang digenerate secara dinamis (inject DOM) melalui file `.js` spesifik masing-masing modul (contoh: `js/frontend/fellow-dashboard/ai-python.js`, `ai-reasoning.js`, dll).
- **Perubahan Nomenklatur:**
  - Semua fungsi yang mengandung kata `Chapter` telah diubah menjadi `Topik` untuk menyesuaikan terminologi UI (Misal: `loadPythonChapter` menjadi `loadPythonTopik`).
  - **WARNING:** Jika ada error `404 Halaman Tidak Ditemukan` saat klik materi, cek kembali di file `.js` modul bersangkutan. Pastikan tidak ada fungsi lawas yang tersisa (misal masih memanggil `window.load...Chapter`).

### B. Optimalisasi Vercel Deployment (Sangat Krusial!)
Aplikasi ini di-deploy di Vercel tanpa Node.js Framework bawaan (murni Static HTML/JS). Ada 2 masalah fatal yang berhasil diperbaiki:
1. **White Screen (83 MIME Type Errors):**
   - **Masalah:** Vercel me-rewrite file statis `.css` dan `.js` menjadi `index.html`, sehingga browser menolak mengeksekusi file tersebut.
   - **Solusi:** Menghapus aturan rewrite serakah `/:path*` di `vercel.json`. Karena kita menggunakan **Hash Routing** (`#/`), kita sama sekali tidak membutuhkan Fallback Routing History API.
   - **ATURAN WAJIB VERCEL:** Di Vercel Dashboard -> *Settings* -> *General*, **Framework Preset HARUS diset ke "Other"**. Jika diset ke React/Vite, Vercel akan merusak rendering static file.
2. **Lag Ekstrem saat Pindah Halaman:**
   - **Masalah:** Sempat ditambahkan atribut `"cleanUrls": true` di `vercel.json`. Ini membuat setiap request `fetch("/pages/.../materi.html")` di Vercel terkena redirect 308, yang mengakibatkan lag luar biasa.
   - **Solusi:** `cleanUrls` telah DIHAPUS dari `vercel.json`. **JANGAN TAMBAHKAN LAGI.**

### C. Optimasi Performa Router (`js/router.js`)
- **Masalah:** Router mengalami *lag* saat dijalankan di Vercel (namun lancar di Localhost).
- **Penyebab:** Pada `router.js`, terdapat pemanggilan `await window.getGlobalSettingsAsync()` setiap kali *hashchange* terjadi. Di localhost, waktu tempuh API instan (<1ms). Di Vercel (Serverless Function), fungsi ini menambahkan *latency* internet 100-300ms di **setiap klik navigasi**.
- **Solusi:** Pemanggilan tersebut sudah diubah menjadi sinkron `window.getGlobalSettings()` (membaca dari localStorage/memory). Proses fetch asinkron ke server digeser ke proses inisialisasi di latar belakang (saat web pertama kali di-load).

### D. Sistem Keamanan & Auth (Backend GAS)
- Modifikasi menyeluruh pada `gas/Code.gs` dan API bridge (`api/gas.js`, `server.js`, `signaling/main.go`).
- **Implementasi:** Seluruh *request* dari user untuk mengubah atau mengambil data (seperti progres, skor, presensi) WAJIB menyertakan `participantToken` yang valid. Google Apps Script sekarang memvalidasi sesi token tersebut sebelum membiarkan akses ke Spreadsheet.
- Backend saat ini sudah **TIDAK ADA MASALAH** alias solid.

---

## 3. CHECKLIST UNTUK AI SELANJUTNYA
Jika AI baru akan melanjutkan project ini, perhatikan rambu-rambu berikut:
1. **BACA DULU** struktur SPA. Jangan langsung buat file `.html` baru jika ingin menambahkan sub-materi. Cukup masukkan kontennya di dalam array JS modul tersebut.
2. **JANGAN UBAH `vercel.json`** kecuali ada penambahan API Route baru. Konfigurasi yang ada sekarang adalah yang paling aman untuk mencegah file `.css` dan `.js` tersumbat oleh Vercel.
3. **CEK CACHE BUSTER:** Saat *development*, kalau CSS/JS tidak berubah di browser, gunakan cara *hard refresh* di browser, karena Vercel memaksa `Cache-Control: public, max-age=0, must-revalidate`.
4. Untuk **Desain / UI**, patokan utama *layout* materi ada di file `js/frontend/fellow-dashboard/ai-modern.js` atau `ai-python.js`. Keduanya sudah mengadaptasi desain ter-update.

---
**Status Saat Ini:** Semua fitur dasar berjalan normal, web responsif bebas lag, error MIME Vercel terselesaikan, desain UI seragam.

---

## 4. UPDATE TERBARU (Sesi 24 Juli 2026)
Pada sesi terbaru, fokus perbaikan beralih kepada standarisasi tampilan modul AI lanjut (Deep Learning & Reinforcement Learning) dan perbaikan *tools* internal:

### A. Perbaikan CSS Parser (Topic Cards)
- **Masalah:** Card/Banner topik untuk modul lanjutan dan topik ke-2 ke atas pada modul Pengantar AI tidak memiliki desain "kotak pink outline" dan huruf *uppercase* seperti pada desain referensi.
- **Penyebab:** Terdapat *syntax error* berupa kurangnya kurung kurawal tutup (`}`) pada media query `@media (max-width: 640px)` di `modules.css`. Akibatnya browser salah menelan (swallow) block `.lesson-topic-banner` saat merender UI Desktop.
- **Solusi:** Menambahkan kurung tutup dan menghapus *corrupt styles* di `modules.css`, kemudian menggunakan cache-buster baru di `index.html`.

### B. Isolasi Data Modul (Data Collision Bug)
- **Masalah:** Saat mengklik halaman Reinforcement Learning, data yang ditampilkan malah berjudul "Pengantar Deep Learning".
- **Penyebab:** Kedua modul di-generate oleh `scripts/module-tools/build_module.js` menggunakan *template* `ai-python.js` tanpa mengubah nama fungsi global `window.loadPythonTopik`. Akibatnya modul yang di-*load* terakhir (Deep Learning) menimpa (*overwrite*) fungsi dari modul sebelumnya (Reinforcement Learning) di dalam ekosistem SPA (`index.html`).
- **Solusi:** Memodifikasi `build_module.js` agar secara otomatis membuat nama fungsi unik sesuai modul (misal: `loadAiReinforcementLearningChapter`), lalu men-generate ulang file `.js` untuk semua modul tersebut.

### C. Bug Karakter Literal Newline (`\n\n`) di Prompt
- **Masalah:** Pada bagian soal Latihan, paragraf latihan tergabung dan memunculkan tulisan `\n\n- state,` secara literal (teks utuh, bukan baris baru).
- **Penyebab:** `build_module.js` menggabungkan *prompt* dengan delimiter string literal ganda `\\n\\n`, sehingga ketika di-*stringify* JSON dan dibaca browser, nilainya menjadi string `\n\n` yang gagal dipecah oleh fungsi `text.split("\n")`.
- **Solusi:** Mengganti delimiter ke `\n\n` standar, melakukan *rebuild* pada modul terkait, sehingga baris baru berhasil di-*render* sempurna.

### Aturan Tambahan Penggunaan `build_module.js`:
Jika ingin me-*rebuild* atau menambah modul masa depan berbasis Markdown menggunakan generator ini, jalankan:
`node scripts/module-tools/build_module.js "<path-ke-md>" <id-modul> <kategori-folder> <modul-folder>`
**Contoh:** `node scripts/module-tools/build_module.js "nazril/modul-materi-herai/foundation-core-ai/Modul_Deep_Learning_HerAI.md" ai-deep-learning foundation-core-ai deep-learning`
