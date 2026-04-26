# Woman in Tech - HerAI Fellowship 2026

## Cara Menjalankan Aplikasi

### Opsi 1: Menggunakan Live Server (VS Code)
1. Install ekstensi "Live Server" di VS Code
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"

### Opsi 2: Menggunakan Python HTTP Server
```bash
# Jalankan di folder root project
python -m http.server 8000
```
Buka browser: `http://localhost:8000`

### Opsi 3: Menggunakan Node.js http-server
```bash
# Install http-server (sekali saja)
npm install -g http-server

# Jalankan di folder root project
http-server -p 8000
```
Buka browser: `http://localhost:8000`

### Opsi 4: Deploy ke Hosting dengan Apache
Upload semua file termasuk `.htaccess` ke hosting Anda.
File `.htaccess` akan menangani routing SPA secara otomatis.

## Perbaikan yang Sudah Dilakukan

### 1. Dashboard Tidak Muncul ✅
- Menambahkan delay 100ms untuk memastikan DOM sudah siap
- Menambahkan console log untuk debugging
- Memperbaiki selector element dashboard

### 2. Dynamic Field di Register ✅
- Menggunakan `querySelectorAll` langsung pada parent element
- Memperbaiki selector dari class ke query yang lebih robust
- Menambahkan console log untuk debugging
- Auto-trigger event saat halaman dimuat

### 3. Refresh 404 ✅
- Menambahkan `<base href="/">` di index.html
- Membuat file `.htaccess` untuk Apache server
- Semua route akan di-redirect ke index.html

## Troubleshooting

### Jika Dashboard Masih Tidak Muncul:
1. Buka Console Browser (F12)
2. Lihat log yang dimulai dengan emoji (🔵, ✅, ❌)
3. Pastikan tidak ada error JavaScript

### Jika Dynamic Field Tidak Berfungsi:
1. Buka Console Browser
2. Cari log "📝 Register Logic Initialized"
3. Periksa apakah semua element terdeteksi (true)

### Jika Masih 404 Saat Refresh:
- **Python/Node Server**: Tidak support .htaccess, tapi aplikasi tetap berfungsi jika navigasi dari home
- **Apache Server**: Pastikan file .htaccess ter-upload dan mod_rewrite aktif
- **Nginx**: Perlu konfigurasi berbeda (lihat dokumentasi Nginx)

## Struktur File
```
woman-in-tech-fix/
├── .htaccess              # Apache rewrite rules (NEW)
├── index.html             # Entry point dengan <base href="/">
├── assets/                # Gambar dan media
├── components/            # Navbar & Footer
├── css/                   # Semua stylesheet
├── js/                    # JavaScript files
│   ├── router.js          # SPA routing (FIXED)
│   ├── dashboard.js       # Dashboard logic (FIXED)
│   ├── register.js        # Register form logic (FIXED)
│   ├── main.js
│   ├── twibbon.js
│   └── data-penduduk.js
└── pages/                 # HTML pages
    ├── home.html
    ├── dashboard.html
    ├── register.html
    └── ...
```

## Fitur Utama

- ✅ Single Page Application (SPA) dengan custom routing
- ✅ Dashboard admin dengan autentikasi
- ✅ Form registrasi dengan validasi NIK otomatis
- ✅ Dynamic form fields berdasarkan status
- ✅ Essay word counter (max 500 kata)
- ✅ Modal Terms & Conditions
- ✅ Integrasi Google Apps Script
- ✅ Responsive design

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Catatan Penting
- Dashboard memerlukan login (cek file dashboard.js untuk credentials)
- Form register terhubung ke Google Apps Script
- Semua navigasi menggunakan JavaScript routing
- Refresh tetap bekerja dengan .htaccess di Apache server
