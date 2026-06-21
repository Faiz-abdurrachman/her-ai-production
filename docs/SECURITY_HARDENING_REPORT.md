# HerAI Security Hardening Report

Tanggal: 14 Juni 2026

## Ringkasan

Perubahan ini memperkuat lapisan backend dan gateway agar data tidak bergantung pada validasi JavaScript saja. Fokus hardening:

- Password messaging disimpan dengan bcrypt.
- Data password lama pada messaging dimigrasikan otomatis dari plaintext ke bcrypt saat load/login.
- Session messaging memiliki expiry.
- Endpoint data messaging wajib memakai bearer token dan Origin yang diizinkan.
- WebSocket messaging mengecek membership room sebelum memproses message, receipt, typing, dan call event.
- Presence tidak lagi membocorkan seluruh user online; hanya self, friend, dan rekan satu room.
- Gateway Node menolak request sensitif tanpa Origin/Referer app yang valid.
- Static server memblokir path source/internal seperti `.git`, `.env`, `gas/`, `messaging/`, `signaling/`, `.cursor/`, `reports/`, dan source map.
- Signaling app gate mendukung `APP_ACCESS_PASSWORD_HASH` berbasis bcrypt.
- GAS password peserta/admin memakai hash bertag dan migrasi otomatis dari plaintext saat login berhasil.

## Messaging Backend

File:

- `messaging/main.go`
- `messaging/go.mod`
- `messaging/go.sum`

Proteksi:

- Register menghasilkan `password_hash` bcrypt.
- Login memakai `bcrypt.CompareHashAndPassword`.
- Data lama dengan field `password` dimigrasikan ke `password_hash`.
- Response user selalu menghapus `password` dan `password_hash`.
- Session token memiliki TTL 24 jam.
- CORS tidak lagi wildcard.
- Protected endpoint butuh Origin yang masuk `HERAI_ALLOWED_ORIGINS`.
- Direct curl tanpa Origin untuk `/api/*` protected akan ditolak.
- User hanya bisa membuat room dengan member yang sudah menjadi friend.
- WebSocket event ditolak jika user bukan member room.

Environment:

```text
HERAI_ALLOWED_ORIGINS=http://127.0.0.1:3000,http://localhost:3000,https://her-ai.data-sorcerers.com,https://herai-signaling.onrender.com
HERAI_STRICT_ORIGIN=true
```

## Node Gateway

File:

- `server.js`

Proteksi:

- Security headers:
  - `X-Content-Type-Options`
  - `Referrer-Policy`
  - `X-Frame-Options`
  - `Permissions-Policy`
  - `Cross-Origin-Resource-Policy`
- `/__gas`, `/__settings` POST, dan `/__debug` menolak request tanpa Origin/Referer app.
- Source/internal paths tidak bisa di-serve sebagai static files.
- Fallback local participant password memakai hash `scrypt$1$...`.

## Google Apps Script

File:

- `gas/Code.gs`

Proteksi:

- `participant_password` tidak lagi ditulis plaintext untuk password baru.
- Admin password dari `normalizeAdmin` dan seed default di-hash.
- Login peserta/admin mendukung verifikasi hash.
- Password lama plaintext dimigrasikan ke hash saat login berhasil.
- Field password tidak dikembalikan ke frontend.

Catatan: Apps Script tidak menyediakan bcrypt native. Untuk benar-benar bcrypt menyeluruh, auth peserta/admin sebaiknya dipindahkan ke backend Go/Node, lalu GAS hanya menjadi data layer internal atau reporting/export.

## Signaling / Meeting

File:

- `signaling/main.go`
- `render.yaml`

Proteksi:

- App access gate sekarang mendukung bcrypt melalui `APP_ACCESS_PASSWORD_HASH`.
- Jika env hash tersedia, plaintext `APP_ACCESS_PASSWORD` tidak perlu dipakai.
- Cookie app gate tetap `HttpOnly`, `SameSite=Lax`, dan `Secure` saat HTTPS.

Environment production yang disarankan:

```text
APP_ACCESS_PASSWORD_HASH=$2a$10$...
APP_ACCESS_PASSWORD=
```

## Batasan Penting

Tidak ada sistem web publik yang benar-benar “anti curl” hanya dengan menyembunyikan route atau meminify JavaScript. Browser selalu bisa diinspeksi. Proteksi yang benar adalah:

1. Semua data sensitif harus lewat backend.
2. Backend wajib memvalidasi auth, role, permission, origin, dan payload.
3. Secret tidak boleh ada di frontend.
4. Token/session harus punya expiry.
5. Semua action mutasi data harus diaudit.
6. Direct access ke database/GAS harus diminimalkan atau diproteksi proxy.

## Next Security Work

- Pindahkan auth peserta/admin dari GAS ke backend Go/Node agar bcrypt penuh.
- Tambahkan CSRF token berbasis cookie untuk gateway Node jika memakai cookie auth.
- Tambahkan rate limiting login/register.
- Tambahkan lockout sementara setelah percobaan login gagal berulang.
- Tambahkan audit trail untuk messaging admin actions.
- Simpan attachment di object storage dengan signed URL.
- Tambahkan dependency scanning dan secret scanning di CI.
