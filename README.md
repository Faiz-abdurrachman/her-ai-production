<div align="center">
  <img src="./assets/branding/logo-her-ai-transparent.png" alt="HerAI" width="180">

  # HerAI Fellowship SuperApp

  **Platform pembelajaran, kolaborasi, dan operasional fellowship AI dalam satu aplikasi.**

  *Learn, build, and create meaningful impact with AI.*
</div>

## Tentang HerAI

HerAI Fellowship SuperApp menghubungkan pengalaman publik, pembelajaran peserta,
kolaborasi tim, dan operasi admin dalam satu Single Page Application. Platform ini
dibangun untuk mendukung perjalanan fellowship dari registrasi dan pembelajaran
hingga Final Project dan showcase publik.

Kemampuan utama HerAI meliputi:

- portal publik untuk informasi program, registrasi, dan Public Showcase;
- dashboard peserta untuk modul, progres, latihan, kuis, diskusi, dan leaderboard;
- workspace Final Project berbasis tim;
- dashboard admin untuk pengaturan, monitoring, akun, konten, dan operasi program;
- backend terautentikasi dengan Google Apps Script dan Google Sheets;
- kurikulum Math for AI dengan renderer Markdown dan KaTeX lokal.

> [!IMPORTANT]
> Repository ini terhubung dengan live production. Perubahan frontend, backend,
> data, akun, dan deployment harus diperlakukan sebagai permukaan rilis yang berbeda.

## Arsitektur

```text
index.html
  -> js/router.js
  -> HTML fragment dari pages/
  -> page initializer atau lazy module loader

participant browser
  -> /__gas
  -> api/gas.js
  -> Google Apps Script
  -> Google Sheets / CacheService / supported storage

settings browser
  -> /__settings
  -> api/settings.js
  -> Google Apps Script Settings
```

HerAI menggunakan hash-based routing. Keberadaan route atau file materi tidak otomatis
berarti sebuah modul sudah dirilis; route, tracking, persistence, assessment,
dashboard, dan release gate harus bergerak bersama.

## Teknologi

| Area | Teknologi |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Routing | Hash-based SPA router |
| Local runtime | Node.js static server |
| Serverless proxy | Vercel Functions |
| Backend | Google Apps Script |
| Data | Google Sheets dan CacheService |
| Materi matematika | Markdown, Marked, dan KaTeX lokal |
| Deployment | Git/Vercel untuk frontend, deployment GAS existing untuk backend |

Project ini tidak memiliki root `package.json`. Jangan menjalankan atau menciptakan
`npm install`, `npm test`, atau build script yang tidak tersedia.

## Menjalankan Secara Lokal

### Prasyarat

- Git;
- Node.js yang mendukung built-in `node:` modules;
- checkout repository HerAI yang lengkap.

### Safe local preview

Jalankan server dengan proxy live GAS dinonaktifkan:

```bash
HERAI_ALLOW_LIVE_GAS_PROXY=false node server.js
```

Buka:

```text
http://127.0.0.1:3000
```

Health check lokal tersedia di:

```text
http://127.0.0.1:3000/healthz
```

Jangan menjalankan `node server.js` tanpa flag pengaman di atas untuk preview biasa.
Server lokal dapat terhubung ke backend live bila proxy tidak dinonaktifkan secara
eksplisit.

## Surface dan Ownership

| Surface | Akses | Ownership |
|---|---|---|
| `#/projects` | Publik, tanpa login | Showcase read-only dengan data tersanitasi |
| `#/participant-projects` | Session peserta | Workspace submit/edit/delete milik tim peserta |
| Participant learning | Session peserta | Modul, progres, assessment, dan diskusi |
| Admin dashboard | Signed admin session | Operasi program sesuai backend RBAC |
| Final Project admin tracker | Signed admin session | Data dan tindakan admin |

Public Showcase tidak boleh memiliki submit, edit, atau delete. Participant workspace
tidak boleh memakai raw admin data. Menyembunyikan tombol atau route bukan mekanisme
authorization; backend signed token dan RBAC tetap menjadi authority.

## Struktur Repository

```text
Her-AI/
├── index.html                  # SPA entry point dan global asset order
├── server.js                  # local static server dan optional GAS proxy
├── vercel.json                # serverless route rewrites
├── api/                       # Vercel proxy functions
├── assets/                    # branding, images, dan visual assets
├── components/                # shared HTML fragments
├── css/                       # public, participant, dan admin styles
├── js/
│   ├── router.js              # route map, guards, dan initializer dispatch
│   ├── frontend/              # public dan participant controllers
│   └── dashboard/             # admin dashboard controllers
├── pages/                     # HTML fragments yang dimuat router
├── gas/
│   └── Code.gs                # canonical backend source
├── materi2/                   # tracked canonical Math runtime content
├── scripts/                   # deterministic validation scripts
└── vendor/                    # local third-party runtime assets
```

## Session dan Authorization

- Session peserta: `sessionStorage.heraiParticipantSession`.
- Profil/token admin: `localStorage.heraiAdminProfile`.
- Public action harus berada pada allowlist backend yang eksplisit.
- Participant action wajib memakai signed participant token dan identity binding.
- Action lain mengikuti admin default-deny dan role enforcement.
- Mutation dan authentication tidak boleh dimasukkan ke response cache.

Jangan menyimpan atau mencetak NIK, password, email/PII, token, hash, PAT, maupun
secret. File `.env` tidak boleh masuk Git.

## Workflow Pengembangan

1. Periksa `git status`, log, diff, dan current code sebelum mengubah file.
2. Pertahankan seluruh dirty atau untracked work yang bukan milik task aktif.
3. Buat diff sekecil mungkin dan hanya pada ownership yang dipilih.
4. Jalankan local preview dengan proxy live dinonaktifkan.
5. Verifikasi syntax, route, authorization, persistence, responsive behavior, dan
   regression sesuai risiko perubahan.
6. Bump cachebuster yang relevan setelah perubahan JS atau CSS.
7. Commit per logical feature setelah review.
8. Push, frontend release, GAS deploy, dan production mutation membutuhkan keputusan
   terpisah.

Jangan menggunakan destructive Git operation untuk membuat worktree tampak bersih.
Jangan melakukan unrelated cleanup, refactor, dependency upgrade, atau perubahan
schema sebagai bagian dari task lain.

## Verifikasi Deterministik

Tidak ada satu command test global. Gunakan pemeriksaan yang sesuai dengan perubahan.

### Syntax dan diff

```bash
node --check js/router.js
node --check js/frontend/fellow-dashboard/settings.js
git diff --check
```

### Final Project security contract

```bash
node scripts/test-project-security.mjs
```

### Math runtime dan release contract

```bash
node scripts/validate-math-runtime.mjs
node scripts/test-math-release-gate.mjs
node scripts/test-math-progress-ids.mjs
node scripts/test-math-response-persistence.mjs
node scripts/test-progress-scoring.mjs
```

Historical test result bukan bukti untuk diff baru. Authenticated production testing
membutuhkan akun QA khusus dan izin eksplisit; jangan pernah memakai akun peserta asli.

## Aturan UI

- Gunakan selector yang scoped dan ber-prefix; hindari `.card`, `.header`, atau
  `.badge` yang global.
- Feature stylesheet tidak boleh mengambil alih shared dashboard shell.
- Pertahankan visible focus, contrast, target sentuh minimal 44px, responsive layout,
  dan `prefers-reduced-motion`.
- Participant learning memakai visual light/pink HerAI.
- UI peserta tidak boleh menampilkan QA notes, filename internal, STOP gate,
  authoring metadata, atau workflow deployment.

## Production Safety

- `gas/Code.gs` adalah canonical backend source.
- Frontend release dan GAS deployment adalah dua proses berbeda.
- Gunakan deployment GAS existing; jangan membuat endpoint deployment baru.
- Jangan menampilkan atau menyalin URL deployment GAS.
- UI route visibility bukan authorization.
- Success persistence hanya boleh ditampilkan setelah acknowledgment dan read-back.
- Database, Google Sheets, account, seed, reset, migration, dan reconciliation tidak
  boleh dimutasi tanpa target, backup, rollback, cleanup, serta izin eksplisit.
- Credential hanya boleh dibaca dari environment dan tidak boleh muncul di output.

## Dokumentasi Operasional

Maintainer production menggunakan rules dan handover operasional yang disimpan pada
workspace terkontrol. Sebagian besar dokumen tersebut sengaja tidak dikirim ke branch
production. Mintalah handover terbaru sebelum mengerjakan authentication, persistence,
release, deployment, atau data production; clone repository saja tidak selalu memuat
seluruh konteks operasional.

## Kontribusi

Kontribusi harus menjaga pemisahan public, participant, dan admin ownership; backend
authorization; acknowledged persistence; serta release gate setiap learning module.
Sebelum mengusulkan perubahan, sertakan:

- masalah dan root cause yang dapat direproduksi;
- scope serta file ownership;
- dampak authorization, data, cache, dan production;
- hasil targeted verification;
- rollback atau recovery path bila perubahan menyentuh backend/data.

---

<div align="center">
  Built for the HerAI Fellowship learning community.
</div>
