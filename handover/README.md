# HerAI Fellowship SuperApp

**Tanggal awal:** 17 Juli 2026  
**Checkpoint terbaru:** 19 Juli 2026  
**Repository Lokal:** `/home/faiz/her6/Her-AI`
**Stack:** Vanilla JS SPA (hash-router) + Node.js Gateway + Google Apps Script + Go Services

---

## Mulai dari sini

Untuk melanjutkan pekerjaan dengan AI/developer baru, baca
[`AI_HANDOFF_CURRENT_STATE.md`](AI_HANDOFF_CURRENT_STATE.md) terlebih dahulu.
File tersebut adalah sumber kebenaran utama dan mengoreksi ID GAS, status akun,
prosedur deployment, serta instruksi provisioning dari snapshot 17 Juli.

Audit materi dan feature gap terbaru:
[`../reports/MATERIAL_AND_FEATURE_GAP_AUDIT_2026-07-19.md`](../reports/MATERIAL_AND_FEATURE_GAP_AUDIT_2026-07-19.md).

Versi ringkas yang dapat dikirim lewat WhatsApp:

- [`../reports/MATERIAL_FEATURE_STATUS_WHATSAPP_2026-07-19.md`](../reports/MATERIAL_FEATURE_STATUS_WHATSAPP_2026-07-19.md)
- [`../reports/MATERIAL_FEATURE_STATUS_WHATSAPP_2026-07-19.txt`](../reports/MATERIAL_FEATURE_STATUS_WHATSAPP_2026-07-19.txt)

Prompt siap tempel untuk memindahkan pekerjaan ke AI lain:
[`NEXT_AI_TRANSFER_PROMPT.txt`](NEXT_AI_TRANSFER_PROMPT.txt).

Status singkat checkpoint 19 Juli:

- Spreadsheet canonical: `1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w`.
- Kode GAS canonical: `gas/Code.gs`.
- 187 akun existing di `ParticipantAccounts`; jangan provision/reset ulang.
- Login peserta sudah diperbaiki dan lolos regression test lokal.
- Login/dashboard admin tidak diubah dari baseline.
- Deployment GAS terbaru belum dikonfirmasi selesai.
- Port lokal 3000 sedang kosong pada akhir checkpoint.
- Folder `materi/` berisi 200 Markdown dan 111.574 baris.
- Sebanyak 72 route AI Lab/track masih menuju Under Development.
- Math, Machine Learning, NLP, dan Computer Vision sudah memiliki materi
  substantif, tetapi belum diaktifkan di router.
- Dua puluh course masih placeholder dan enam specialization track masih scaffold.
- Halaman Pengaturan peserta ada, tetapi masih prototype visual dengan data contoh.
- Fitur ganti password mandiri peserta belum tersedia.
- Edit profil dasar tersedia melalui halaman profil terpisah dan action
  `updateParticipantProfile`.
- Route checker melaporkan 114/114 karena hanya mengecek file target; route yang
  menuju Under Development masih dihitung lulus.
- Worktree masih dirty dan perubahan berasal dari beberapa rangkaian pekerjaan;
  jangan melakukan reset atau cleanup massal.

---

## Ringkasan Sistem

Aplikasi ini adalah platform fellowship/event control panel berbasis SPA dengan:

| Layer | Teknologi | Fungsi Utama |
|---|---|---|
| Frontend SPA | HTML, CSS, Vanilla JS | Halaman publik, participant dashboard, admin dashboard, AI learning modules, meeting, messaging |
| Development Gateway | `server.js` (Node.js) | Static serve, GAS proxy `/__gas`, local settings, fallback data opt-in |
| Database/API | Google Apps Script + Google Sheets | Registrasi, peserta, admin, AI screening, competency test, re-test, project, sertifikat, learning content |
| Meeting/Signaling | Go (`signaling/main.go`) | WebRTC signaling, LiveKit token/config, room monitor, GAS proxy |
| Messaging | Go (`messaging/main.go`) | Chat backend, WebSocket, friends, rooms, messages |
| Participant Portal | Go (`participant-portal/main.go`) | Settings/provisioning service |

## Jumlah Aset (Hasil Audit 17 Juli 2026)

| Kategori | Jumlah |
|---|---|
| Public HTML (frontend/) | 21 file |
| Dashboard Admin HTML | 18 file |
| Participant Dashboard HTML | 131 file (33.596 baris) |
| Frontend JS (js/frontend/) | 10 file |
| Dashboard JS (js/dashboard/) | 7 file |
| Fellow Dashboard JS | 55 file (23.146 baris) |
| CSS files | 33 file |
| Go services | 3 service (signaling, messaging, participant-portal) |
| Google Apps Script | 2.071 baris, 20+ sheets, 40+ actions |
| QA Scripts | 4+ file |
| Total HTML pages | ~170+ |

## Cara Menjalankan Lokal

```bash
# Frontend SPA + Gateway
cd /home/faiz/her6/Her-AI
node server.js
# Buka: http://127.0.0.1:3000

# Meeting signaling (opsional)
cd signaling && go run .

# Messaging (opsional)
cd messaging && go run .

# Participant portal (opsional)
cd participant-portal && go run .
```

## Route Utama

| Route | Halaman | Tipe |
|---|---|---|
| `#/home` | Landing page | Public |
| `#/register` | Pendaftaran peserta | Public |
| `#/announcement` | Pengumuman (stage 1/2/final) | Public |
| `#/participant-login` | Login peserta NIK/password | Participant |
| `#/participant-dashboard` | Dashboard peserta | Participant |
| `#/participant-modules` | Katalog modul learning | Participant |
| `#/participant-settings` | Prototype pengaturan peserta; belum account settings penuh | Participant |
| `#/participant-ai-python` | Python untuk AI (dan 50+ route learning) | Participant |
| `#/competency-test` | Tes kompetensi tahap 2 | Participant |
| `#/retest` | Re-test | Participant |
| `#/meeting` | Meeting room | Participant |
| `#/messaging` | Chatroom prototype statis | Participant |
| `#/messaging-alt` | Client untuk Go messaging | Participant |
| `#/dashboard` | Admin dashboard | Admin |
| `#/skoring` | Sistem skoring | Admin |
| `#/ai-prescreening` | AI Pre-screening | Admin |
| `#/competency-monitor` | Monitor tes | Admin |
| `#/video-conference` | Room control meeting | Admin |
| `#/learning-content` | Editor learning content lokal; GAS contract belum ada | Admin |
| `#/rbac` | Role/admin access control | Admin |
| `#/audit-trail` | Log aktivitas admin | Admin |
| `#/global-settings` | Settings acara | Admin |

## Struktur File

```
Her-AI/
├── index.html                 # SPA shell + script registry
├── server.js                  # Node.js gateway (1222 baris)
├── .htaccess                  # Apache rewrite rules
├── handover/                  # Dokumen handover (baru)
│   ├── README.md
│   ├── AI_HANDOFF_CURRENT_STATE.md
│   ├── SECURITY_AUTH_UPDATE_2026-07-19.md
│   ├── NEXT_AI_TRANSFER_PROMPT.txt
│   ├── HANDOVER_UPDATE.md
│   ├── UNIVERSAL_COSTUME_STANDARD.md
│   ├── REGRESSION_AND_ERROR_PLAYBOOK.md
│   └── MODULE_STATUS_MAP.md
├── pages/
│   ├── frontend/              # Halaman publik (21 file)
│   │   ├── fellow-dashboard/  # Participant dashboard (131 file)
│   │   │   ├── foundation-core-ai/  # AI learning paths
│   │   │   ├── data-engineering-domains/
│   │   │   ├── business-industry-applications/
│   │   │   ├── generative-multimodal-ai/
│   │   │   ├── specialization-tracks/
│   │   │   └── ai-lab/
│   │   └── ...
│   └── dashboard/             # Halaman admin (18 file)
├── js/
│   ├── router.js              # Hash router (962 baris)
│   ├── main.js                # Global settings, navbar (362 baris)
│   ├── frontend/              # Public JS (10 file)
│   └── dashboard/             # Admin JS (7 file)
├── css/
│   ├── style.css
│   ├── components/            # Navbar, footer CSS
│   └── frontend/              # Page-specific CSS (33 file)
├── components/                # Navbar, sidebar, footer HTML
├── gas/Code.gs                # Google Apps Script canonical (2071 baris)
├── api/                       # JS API helpers
│   ├── gas.js
│   └── settings.js
├── signaling/                 # Go meeting/signaling (1488 baris)
├── messaging/                 # Go messaging (1002 baris)
├── participant-portal/        # Go participant portal (210 baris)
├── scripts/                   # QA automation
│   ├── qa-smoke.mjs
│   ├── check-participant-routes.mjs
│   ├── test-gas-auth.mjs
│   └── harden-public.mjs
├── reports/                   # QA, audit materi/fitur, dan versi ringkas WhatsApp
├── docs/                      # Dokumentasi lama
└── assets/                    # Branding, images, referensi
```
