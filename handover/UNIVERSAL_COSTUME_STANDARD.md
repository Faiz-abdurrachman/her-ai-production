# Universal Costume Standard - HerAI Fellowship SuperApp

**Tanggal:** 17 Juli 2026
**Tujuan:** Standar konsistensi kode untuk seluruh developer yang bekerja di project ini.

---

> File ini hanya berisi standar implementasi. Untuk ID sistem, status deploy,
> data akun, dan task aktif, ikuti
> [`AI_HANDOFF_CURRENT_STATE.md`](AI_HANDOFF_CURRENT_STATE.md).

## 1. Stack & Konvensi Dasar

### Stack Resmi
| Layer | Pilihan |
|---|---|
| Frontend | **Vanilla JavaScript** - tidak ada framework (React/Vue/Angular) |
| Routing | **Hash routing** via `js/router.js` - format `#/nama-route` |
| CSS | **CSS murni** - tidak ada preprocessor (SCSS/Less) atau utility framework |
| Icons | **Font Awesome** (`fas fa-...`) |
| Backend | **Google Apps Script** (`gas/Code.gs`) |
| Gateway | **Node.js** (`server.js`) |
| Real-time | **Go** (`signaling/main.go`, `messaging/main.go`) |

### 1.1 Larangan
- Jangan nambah framework JS (React, Vue, Svelte, dll) - ini SPA vanilla.
- Jangan nambah bundler (Webpack, Vite, esbuild).
- Jangan nambah CSS framework (Tailwind, Bootstrap) - konsistensi rusak.
- Tidak ada TypeScript di project ini.
- Commit langsung ke main/master tanpa testing.

---

## 2. Routing Convention

### 2.1 Hash Format
```
#/home                          # Public
#/dashboard                     # Admin
#/participant-dashboard         # Participant
#/participant-ai-python         # Learning module
#/participant-ai-lab-cv-cnn     # AI Lab
#/participant-specialization-*  # Specialization
```

### 2.2 Naming Rules
- **Public routes:** `#/nama-pendek` (home, register, profile, meeting)
- **Admin routes:** `#/nama-modul` (dashboard, skoring, ai-prescreening)
- **Participant routes:** `#/participant-<area>-<modul>-<page>`
  - `participant-ai-python` - materi
  - `participant-ai-python-practice` - latihan
  - `participant-ai-python-quiz` - kuis
  - `participant-ai-python-discussion` - diskusi
- **AI Lab routes:** `#/participant-ai-lab-<domain>-<topic>`

### 2.3 File Mapping
- Setiap route di `router.routes` harus mapping ke file `.html` absolute dari root (`/pages/...`)
- Route alias di `router.routeAliases`
- Admin routes harus dicek di `adminPages` array untuk layout khusus

### 2.4 Initializer Pattern
```javascript
// Setiap halaman punya initializer di window
window.initNamaHalaman = function() {
    // bind event, render data
};

// Router panggil setelah fetch partial HTML:
if (typeof window.initNamaHalaman === "function") {
    window.initNamaHalaman();
}
```

### 2.5 Semantic Route Gate

- Keberadaan file target bukan bukti route selesai.
- Route course yang berstatus siap tidak boleh menunjuk
  `under-development.html`.
- QA route harus memeriksa target yang diharapkan, initializer, next/previous
  navigation, dan render activity.
- Jangan memberi status Production hanya karena HTML besar atau tampilan lengkap.

---

## 3. File & Folder Convention

### 3.1 HTML Pages
| Folder | Konten |
|---|---|
| `pages/frontend/` | Halaman publik/peserta |
| `pages/frontend/fellow-dashboard/` | Participant dashboard (termasuk learning) |
| `pages/dashboard/` | Halaman admin |

**Aturan:**
- Satu file HTML per halaman
- Jangan inline logic JS berat di HTML
- HTML partial di-fetch oleh router, bukan di-load browser langsung

### 3.2 JavaScript
| Folder | Konten |
|---|---|
| `js/frontend/` | Logic halaman publik + `fellow-dashboard/` untuk participant |
| `js/dashboard/` | Logic admin |
| `js/main.js` | Global settings, navbar init |
| `js/router.js` | Router, routing logic, initializer dispatcher |

**Aturan:**
- Initializer function: `window.initNamaModul = async function() { ... }`
- Files di `js/frontend/fellow-dashboard/ai-lab/` untuk interactive lab lessons
- Files di `js/frontend/fellow-dashboard/` untuk fitur participant dashboard

### 3.3 CSS
| Folder | Konten |
|---|---|
| `css/style.css` | Global style |
| `css/components/` | Navbar, footer CSS |
| `css/frontend/` | Per-halaman CSS |
| `css/frontend/fellow-dashboard/` | Participant dashboard CSS |

**Aturan:**
- Satu CSS file per halaman atau grup halaman
- Gunakan scope class, hindari global style tanpa prefix
- Nama file: `nama-halaman.css` atau `nama-modul.css`
- CSS untuk learning content: `ai-lab-lesson.css`

### 3.4 Components
| File | Fungsi |
|---|---|
| `components/navbar.html` | Navigasi publik |
| `components/sidebar.html` | Sidebar admin |
| `components/footer.html` | Footer publik |

- Dimuat sekali oleh router di `router.loadComponents()` saat `DOMContentLoaded`

---

## 4. JavaScript Convention

### 4.1 Code Style
- **Indentasi:** 4 spasi (bukan 2)
- **Quotes:** Double quotes (`"`) - konsisten
- **Semicolons:** Wajib di akhir statement
- **Variabel:** `const` > `let` > `var` (var dihindari)
- **Arrow functions:** `const fn = () => { ... }`
- **Async:** `async function` dengan `await` untuk API/GAS calls

### 4.2 Naming Convention
| Entity | Convention | Contoh |
|---|---|---|
| Variable | camelCase | `participantData` |
| Function | camelCase | `loadParticipantData()` |
| Window initializer | PascalCase | `window.initDashboardLogic()` |
| CSS class | kebab-case | `.participant-card` |
| HTML ID | kebab-case | `#app-content` |
| Route path | kebab-case | `/participant-ai-python` |
| GAS action | camelCase | `getParticipantDashboardData` |
| Constants | UPPER_SNAKE | `GAS_WEB_APP_URL` |

### 4.3 Data Flow Pattern
```javascript
// 1. Fetch dari GAS via proxy:
async function loadData() {
    const res = await fetch('/__gas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'namaAction', ...data })
    });
    const result = await res.json();
    if (result.status !== 'success') throw new Error(result.message);
    return result.data;
}

// 2. Render ke DOM:
function renderData(containerId, data) {
    const container = document.getElementById(containerId);
    container.innerHTML = buildHTML(data);
}
```

---

## 5. GAS Convention (Google Apps Script)

### 5.1 Action Pattern
```javascript
function doPost(e) {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    const routes = {
        myAction: () => handleMyAction(payload)
    };
    return json(routes[action]());
}
```

### 5.2 Response Format
```json
// Success
{ "status": "success", "data": [] }

// Error
{ "status": "error", "message": "Pesan error" }
```

### 5.3 Standard Utility
| Function | Fungsi |
|---|---|
| `getRows(sheetName)` | Ambil semua row sebagai array of objects |
| `addRowObject(sheetName, obj)` | Tambah row baru |
| `upsertByKey(sheetName, key, value, obj)` | Insert atau update |
| `deleteByKey(sheetName, key, value)` | Hapus row |
| `getSettingsObject()` | Baca settings sebagai object |
| `hashPasswordValue(value)` | Hash password (prefix `pw$1$`) |
| `verifyPasswordValue(storedValue, input)` | Verifikasi password hash |

---

## 6. HTML Structure Convention

### 6.1 Container Structure (index.html)
```html
<div id="app-content">
    <!-- Router inject partial HTML here -->
</div>
<div id="navbar-container"></div>
<div id="sidebar-container"></div>
<div id="footer-container"></div>
```

### 6.2 Partial Page Structure
```html
<!-- Setiap halaman partial -->
<div class="page-wrapper">
    <section class="hero-section">
        <div class="container">
            <!-- Konten -->
        </div>
    </section>
</div>
```

---

## 7. File Size Limits

| Jenis File | Maks Baris | Catatan |
|---|---|---|
| JS file | 2000 baris | Jika lebih, refactor jadi multiple files |
| HTML page | 1500 baris | Jika lebih, split jadi partials |
| CSS file | 500 baris | Jika lebih, split per section |
| Go file | 1500 baris | Jika lebih, refactor ke package |

---

## 8. Commit Convention

Format: `[area] Pesan singkat (bahasa Indonesia/Inggris)`

| Prefix | Area |
|---|---|
| `[gas]` | Google Apps Script |
| `[router]` | Routing SPA |
| `[ui]` | HTML/CSS |
| `[js]` | JavaScript logic |
| `[signaling]` | Go meeting service |
| `[messaging]` | Go messaging service |
| `[portal]` | Participant portal |
| `[docs]` | Dokumentasi |
| `[qa]` | Testing/QA |
| `[hardening]` | Security |
| `[handover]` | Handover docs |

---

## 9. Status Implementasi

Gunakan klasifikasi berikut pada audit dan handover:

| Status | Arti |
|---|---|
| Aktif | Konten/fitur substantif dan route/workflow utama dapat digunakan |
| Foundation dinamis | Ada backend contract, tetapi masih memiliki fallback atau gap |
| Parsial | Hanya sebagian use case selesai |
| Tersedia tetapi diblokir | File/logic ada, tetapi route aktif belum membukanya |
| Prototype visual | UI ada, tetapi data/aksi utama hard-coded atau lokal |
| Outline/Placeholder | Baru struktur atau draft generik |

Status harus ditentukan dari route, event binding, sumber data, mutation backend,
auth, persistence, dan hasil test—bukan dari jumlah file atau baris.
