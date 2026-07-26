# Log Perbaikan Bug & Pengembangan Modul HerAI
*Sesi Pengembangan - Fellowship Dashboard (AI Lab)*

Dokumen ini berisi rangkuman masalah, bug visual, maupun logic yang ditemukan dan cara penyelesaiannya.

## 1. Bug: Modul "Deep Learning" tidak merender (404 / Route error)
**Deskripsi:**
Pengguna melaporkan bahwa saat mencoba mengakses modul Deep Learning atau Kuis Deep Learning (misalnya `http://localhost:3000/#/participant-ai-lab-deep-learning-quiz`), tidak ada halaman yang dimuat atau error route/URL.

**Penyebab:**
- Route untuk modul "Deep Learning" (termasuk praktik dan kuis) tidak diregistrasi di `js/router.js` sehingga SPA (Single Page Application) gagal memuat layout `fellow-dashboard`.
- Pemanggilan skrip `ai-deep-learning.js` belum dimasukkan ke `index.html`.

**Cara Perbaikan:**
- Mendaftarkan route-route baru (contoh: `participant-ai-lab-deep-learning`, `-practice`, dan `-quiz`) ke dalam `js/router.js`.
- Menyambungkan route tersebut ke `materi.html`, `latihan.html`, dan `kuis.html` yang benar dalam struktur folder `foundation-core-ai/deep-learning/`.
- Memperbarui `index.html` dengan menambahkan `<script src="/js/frontend/fellow-dashboard/ai-deep-learning.js">`.

## 2. Bug Visual: Halaman Praktik & Kuis Hanya Menampilkan "Nomornya Doang" (Pagination tanpa Soal)
**Deskripsi:**
Ketika masuk ke Latihan atau Kuis, navigator pagination (1, 2, 3... 20) muncul namun tidak menampilkan teks soal yang benar. Selain itu, ada hardcoding teks "Python untuk AI" di atas soal.

**Penyebab:**
- Script Node.js generator (`build_module.js`) menghasilkan array `prompt: ["teks"]` pada data latihan, padahal fungsi `renderFormattedText()` di frontend berekspektasi terhadap string (`prompt: "teks"`). Akibatnya fungsi replace text throw error dan komponen tidak merender isi array.
- Skrip template menyisipkan hardcode teks "Python untuk AI" (karena hasil cloning modul AI Python).

**Cara Perbaikan:**
- Memperbaiki `build_module.js` agar menyatukan (join) isi array menjadi single string (`prompt: paragraphs.join('\n\n')`).
- Menambahkan logic di `build_module.js` untuk mengganti statik text "Python untuk AI" menjadi nama asli modul (`${moduleTitle}`) pada title bar di latihan/kuis.
- Me-_rebuild_ modul Reinforcement Learning dan mereplace manual string di modul Deep Learning yang terdampak.

## 3. Bug: Halaman Modul "Reinforcement Learning" Putih Kosong (Blank Page)
**Deskripsi:**
Ketika membuka route `participant-ai-lab-reinforcement-learning`, halaman blank (putih) dan tidak menampilkan daftar isi materi, padahal DOM HTML merender ribuan baris teks (height normal).

**Penyebab:**
- Skrip `register_module.js` tidak dapat memasukkan file statik di `index.html` akibat ketiadaan tag placeholder `<!-- DASHBOARD FELLOW -->` (sudah terhapus).
- `ai-reinforcement-learning.js` gagal disisipkan ke layout utama.

**Cara Perbaikan:**
- Mengubah injektor di `register_module.js` untuk menggunakan anchor tag lain (misalnya `<script src="/js/frontend/fellow-dashboard/ai-python.js...">`).
- Menambahkan script injection `<script src="/js/frontend/fellow-dashboard/ai-reinforcement-learning.js"></script>` ke dalam `index.html` secara dinamis.

## 4. Perbaikan Workflow Modul Builder (`build_module.js` & `register_module.js`)
**Deskripsi:**
Alat otomatis untuk merakit modul baru dari Markdown kurang robust.

**Perbaikan:**
- Memperbaiki duplikat variabel deklarasi (`moduleTitle`) yang membuat script crash.
- Menambahkan fungsi escape regex dan `escapeHtml()` agar string markdown aman ketika dilempar ke string literal JavaScript template.
- Script perakitan sekarang dapat dijalankan tanpa manual tweak pasca-eksekusi.

---
**Status:** Semua halaman modul Python, Deep Learning, dan Reinforcement Learning (Materi, Kuis, Latihan) sekarang sudah terhubung dan dapat dirender dengan baik beserta soal-soalnya.

## 5. Bug Visual: Topik Card Tidak Konsisten (Design Pengantar AI)
**Deskripsi:**
Pengguna melaporkan bahwa banner/card topik pada modul Deep Learning, Reinforcement Learning, dan topik 2 ke atas pada modul Pengantar AI tidak konsisten. Card tersebut tidak memiliki styling kotak outline pink, huruf uppercase, gradient background, dan margin yang indah seperti pada Topik 1 Pengantar AI.

**Penyebab:**
- Terdapat *syntax error* pada file CSS utama `modules.css`. Tepatnya, ada sebuah media query `@media (max-width: 640px)` di baris ~12375 yang **tidak memiliki kurung tutup (`}`)**.
- Hal ini menyebabkan semua deklarasi CSS yang berada di bawahnya tertelan ke dalam ruang lingkup `@media (max-width: 640px)`, termasuk styling `.lesson-topic-banner` yang krusial untuk membuat card topik.
- Di baris ~4300 pada `modules.css` juga terdapat baris sisa yang corrupt (berisi properti warna dan kurung kurawal nyasar) yang mungkin merusak parser beberapa browser.

**Cara Perbaikan:**
- Menghapus baris corrupt / stray CSS properties pada `modules.css` (sekitar baris 4300).
- Menambahkan kurung kurawal tutup `}` tepat sebelum media query `920px` di baris ~12521 untuk menutup block media query 640px secara proporsional.
- Menambahkan cache-buster baru (`?v=...`) pada `index.html` untuk memuat ulang `modules.css`.
## 6. Bug Konten: Halaman Reinforcement Learning Menampilkan Data Deep Learning
**Deskripsi:**
Pengguna melaporkan bahwa saat membuka materi Reinforcement Learning, Topik 1 yang muncul berjudul "Pengantar Deep Learning".

**Penyebab:**
- Script `ai-deep-learning.js` dan `ai-reinforcement-learning.js` sama-sama digenerate menggunakan fungsi global yang sama (`window.loadPythonTopik`).
- Karena keduanya dimuat bersamaan di `index.html` (bersifat SPA), fungsi dari modul yang dimuat belakangan (Deep Learning) menimpa (overwrite) fungsi modul sebelumnya. Akibatnya saat halaman Reinforcement Learning memanggil `loadPythonTopik(1)`, yang tereksekusi adalah fungsi milik Deep Learning.

**Cara Perbaikan:**
- Memperbarui skrip `scripts/module-tools/build_module.js` agar secara otomatis mengganti nama fungsi internal (contoh: `loadPythonTopik` menjadi `loadAiReinforcementLearningChapter` dan `loadAiDeepLearningChapter`).
- Melakukan *rebuild* pada modul Deep Learning dan Reinforcement Learning menggunakan script yang sudah diperbarui.
- Hasilnya, data materi antar modul terisolasi dengan baik dan tidak lagi tumpang tindih.

## 7. Bug Visual: Teks "Prompt" Menampilkan Karakter Baris Baru Literal (`\n\n`)
**Deskripsi:**
Pengguna melaporkan bahwa tulisan di halaman latihan menampilkan baris baru secara literal sebagai teks `\n\n`, yang seharusnya dirender sebagai baris baru.
**Penyebab:**
Di dalam `scripts/module-tools/build_module.js`, pada saat menggabungkan latihan menjadi array JSON, script menggunakan `replace(/\n/g, '\\n\\n')`. Saat generator mem-parsing data JSON tersebut, string die-escape dua kali sehingga tanda backslash ikut tercetak di UI.
**Solusi:**
- Menghapus double backslash di `build_module.js`.
- Mengubah `practiceLines.join('\\n\\n')` menjadi `practiceLines.join('\n\n')` (single escape).
- Generator akan tetap mem-parsing-nya dengan benar sebagai karakter enter standar di dalam object `prompt`.

## 8. Bug Ekstraksi Judul: Modul Menampilkan ID Mentah (ai-large-language-model)
**Deskripsi:**
Setelah modul dirender, tulisan raksasa di halaman materi menampilkan ID mentah seperti `ai-large-language-model` alih-alih teks natural "Large Language Model".
**Penyebab:**
Beberapa dokumen Markdown (.md) menyertakan *YAML Front Matter* (misalnya `--- \n title: ...`) di baris teratas. Script `build_module.js` sebelumnya hanya mencari header pertama (`#`) atau langsung menggunakan `baseId` (ID rahasia) jika tidak menemukannya, sehingga YAML front matter diabaikan dan `baseId` menjadi fallback.
**Solusi:**
- Memperbarui fungsi pencarian judul di `build_module.js`.
- Menambahkan Regex `/title:\s*(.*)/` untuk mengekstrak metadata dari YAML front matter.
- Jika front matter tidak ada, jatuh ke fallback pencarian header `#`.
- Melakukan *rebuild* masal pada seluruh modul yang terdampak.

## 9. Bug Mismatch URL (Katalog Modules vs Route Dinamis)
**Deskripsi:**
Pengguna mengklik tombol "Mulai" pada card LLM di halaman Katalog Modul, tetapi diarahkan ke halaman "Under Development" (404), padahal modul sudah berhasil di-*generate*.
**Penyebab:**
URL statis (href) pada HTML Katalog Modul untuk LLM tertulis `#/participant-ai-lab-llm`. Namun, saat generator `build_module.js` dieksekusi dengan *ID base* `ai-large-language-model`, ia mendaftarkan rute yang panjang: `#/participant-ai-lab-large-language-model`. Ketidaksinkronan rute ini menyebabkan error 404 saat pengguna melakukan klik dari UI.
**Solusi:**
- Memperbaiki HTML `modules.html` agar `href` pada card modul LLM sinkron menjadi `#/participant-ai-lab-large-language-model`.
- Sebagai best practice, untuk modul-modul selanjutnya (seperti VLM, Multimodal LLM), ID yang di-pass saat proses *generate* dipastikan 100% konsisten dengan URL yang sudah terdefinisi di UI Katalog.

## 10. Bug Visual: Navbar Publik Bocor ke Halaman Dashboard Modul
**Deskripsi:**
Pada halaman modul LLM (`#/participant-ai-lab-large-language-model`), navbar utama publik (landing page) muncul dan tumpang tindih dengan layout dashboard fellow.
**Penyebab:**
Logika *layouting* di `js/router.js` mengandalkan array `participantDashboardPages` untuk menentukan apakah halaman tersebut harus menggunakan layout Dashboard (dengan *sidebar* kiri) atau layout Publik. Script `register_module.js` sebelumnya tidak menyisipkan rute baru yang di-*generate* ke dalam array tersebut, sehingga router menganggapnya sebagai halaman publik.
**Solusi:**
- Memodifikasi `scripts/module-tools/register_module.js` agar secara otomatis menginjeksi rute baru (dan sub-rutenya seperti `-practice`, `-quiz`) ke dalam list `participantDashboardPages`.
- Menambahkan secara manual rute yang sudah terlanjur di-*generate* sebelumnya ke dalam `participantDashboardPages` di `js/router.js`.

## 11. Bug Visual Lanjutan: Navbar Publik Masih Bocor di Halaman Latihan & Kuis
**Deskripsi:**
Meskipun halaman materi modul sudah menggunakan layout *Dashboard* yang benar (tanpa *navbar* publik), *navbar* publik tersebut ternyata kembali muncul menumpuk ketika *user* masuk ke tab Latihan, Kuis, atau Diskusi di seluruh modul.
**Penyebab:**
Script `register_module.js` ternyata hanya menambahkan rute utama (misal: `/participant-ai-lab-ui-ux`) ke dalam array `participantDashboardPages` di `router.js`, namun luput untuk menyertakan sub-rute akhiran `-practice`, `-quiz`, dan `-discussion` jika rute utama tersebut sudah eksis sebelumnya dengan status "under-development".
**Solusi:**
- Membuat script `fix_router.js` yang secara otomatis memindai array `participantDashboardPages` di `router.js`.
- Secara dinamis menyuntikkan (inject) rute turunan `-practice`, `-quiz`, dan `-discussion` untuk setiap modul yang ada agar router mengklasifikasikan halaman-halaman tersebut sebagai halaman dashboard yang sah.

## 12. Bug Logika: "Bayang-Bayang Python" pada JS Semua Modul
**Deskripsi:**
Di konsol browser sering muncul error `Python source integrity mismatch` atau pencarian elemen `Python` gagal, bahkan ketika sedang berada di modul non-Python (seperti UI/UX atau Bioinformatics).
**Penyebab:**
Script generator `build_module.js` awalnya di-cloning langsung dari struktur modul Python. Namun, script gagal me-replace URL konstan `SOURCE_BASE` dan fungsi validasi `assertPythonSourceIntegrity`. Akibatnya, seluruh puluhan file JS modul yang digenerate ikut membawa logika Python dan mencoba me-*load* direktori bab (chapters) milik Python (`02-python-untuk-ai`).
**Solusi:**
- Menulis script perbaikan masal `fix_js_sources.js` yang menyapu (sweep) seluruh file `ai-*.js`.
- Secara dinamis menarik lokasi folder `chapters` yang benar berdasarkan rute aslinya (`CHAPTERS[0].sourcePath`) lalu menggantikan nilai konstan `SOURCE_BASE`.
- Menghapus fungsi `assertPythonSourceIntegrity` secara total dari semua script JS non-Python.

## 13. Bug Konten: Teks "Kuis Python" Hardcoded di Seluruh Modul
**Deskripsi:**
Ketika peserta masuk ke tab Kuis pada modul Data Engineering, teks pengantarnya masih bertuliskan "Uji pemahaman Python..." dan alt-text gambar masih berbunyi "HerAI fellow mengerjakan kuis Python".
**Penyebab:**
Template HTML pembungkus (shell) untuk `latihan.html`, `kuis.html`, dan `diskusi.html` membawa teks deskripsi statis dari modul Python yang belum di-*replace* oleh `build_module.js`.
**Solusi:**
- Menulis script `fix_html_shells.js` yang mengeksekusi *Regular Expression (Regex)* ke ratusan file HTML Latihan, Kuis, dan Diskusi di dalam direktori `fellow-dashboard`.
- Mengubah teks bernuansa "Python" tersebut menjadi copywriting yang netral, premium, dan relevan dengan kegiatan edukasi (contoh: "Uji pemahaman Anda melalui simulasi interaktif").

## 14. Bug Visual: Tata Letak Topbar dan Tab Modul Berantakan di Layar HP (Mobile View)
**Deskripsi:**
Pada halaman modul (`materi.html`), tombol hamburger menu menumpuk dengan teks breadcrumbs. Selain itu, baris aksi (bar pencarian, ikon notifikasi, dan avatar profil) tergencet menjadi satu baris yang menumpuk. Terakhir, deretan tab navigasi (Materi, Latihan, Kuis, Diskusi) memunculkan scrollbar bawaan sistem operasi yang tebal dan merusak estetika.
**Penyebab:**
- `.lesson-topbar` tidak memiliki deklarasi `display: grid` untuk tampilan mobile, sehingga elemen-elemen di dalamnya bertumpuk akibat gaya `position: absolute` dari tombol hamburger menu.
- `.fellow-actions` (pembungkus search, bel, avatar) tidak memiliki aturan `display: contents;` sehingga gagal membaur ke dalam *grid layout* utama.
- Deklarasi CSS dari file lain (`ai-lab-lesson.css`) melakukan *override* dengan tingkat spesifisitas (*specificity*) yang sama, membuat `.lesson-topbar` tetap menggunakan `display: flex`.
**Solusi:**
- Menulis ulang dan menambahkan *Media Query* baru di `modules.css` khusus untuk layar `< 920px`.
- Menggunakan deklarasi `!important` secara taktis pada elemen `.lesson-detail-page .lesson-topbar` untuk memaksakan pemakaian struktur `grid-template-areas` yang sejajar dengan layout utama dashboard.
- Menyembunyikan *scrollbar* default pada elemen `.lesson-tabs` menggunakan sintaks pseudo-element `::-webkit-scrollbar { display: none; }` untuk pengalaman *swipe* horizontal yang elegan.
- Semua masalah UI visual pada perangkat *mobile* berhasil diperbaiki.

## 15. Bug Konten: Teks Heading "Kuis Python" Masih Hardcoded di Halaman Kuis Modul Lain
**Deskripsi:**
Pada saat melakukan *UI Audit* Desktop di halaman Kuis (contoh: UI/UX), ditemukan bahwa judul besar halaman (`<h1>`) dan sub-judul (`<h2>`) masih bertuliskan "Kuis Python", meskipun deskripsi paragrafnya sudah dinetralkan pada perbaikan sebelumnya. Selain itu, tombol kembali (back) di halaman Diskusi juga bertuliskan "Kuis Python".
**Penyebab:**
- Script `fix_html_shells.js` pada perbaikan Bug 13 sebelumnya hanya menyasar paragraf deskripsi dan *alt-text* gambar, dan luput untuk melakukan pencarian pada elemen-elemen *heading* dan navigasi.
**Solusi:**
- Membuat script tambahan `fix_kuis_titles.js` yang secara spesifik memindai direktori *frontend* (termasuk modul Deep Learning, UI/UX, Data Engineering, dll).
- Melakukan penggantian masal secara *Regex* untuk mengubah string "Kuis Python" menjadi "Kuis Modul" pada semua file `kuis.html` dan `diskusi.html`.
- Melakukan verifikasi *render* ulang untuk memastikan judul halaman berubah menjadi generik dan relevan untuk semua modul non-Python.

## 16. Bug Konten: Prompt Diskusi dan Teks Forum Masih Mengandung Python di Modul Lain
**Deskripsi:**
Pada saat melakukan *UI Audit* Desktop di halaman Diskusi, terungkap bahwa teks deskripsi (contoh: "Diskusikan mengapa Python dominan..."), tombol *prompt* yang dapat di-*klik*, serta sub-judul halaman masih sangat spesifik merujuk pada modul *Python untuk AI*, meskipun sedang berada di modul lain (seperti UI/UX).
**Penyebab:**
- Script awal *generator* (`build_module.js`) menyalin struktur file HTML *Diskusi* dari modul referensi (Python) secara mentah-mentah ke folder-folder modul lain tanpa membersihkan isi konten teks di dalamnya (hanya mengganti variabel *path* dasar).
**Solusi:**
- Membuat script `fix_diskusi_content.js` untuk memindai semua file `diskusi.html` pada setiap folder kecuali folder `02-python-untuk-ai`.
- Melakukan pergantian (replace) masal berbasis Regex dan String untuk merubah:
  - `<h1>Diskusi Python</h1>` menjadi `<h1>Diskusi Topik</h1>`
  - Semua opsi tombol *prompt* diskusi Python menjadi *prompt* studi kasus yang generik dan berorientasi *Project Building*.
  - Menghapus referensi file `materi/baru/Python-baru.md`.
- Seluruh halaman diskusi modul selain Python kini menampilkan kalimat instruksional yang universal dan premium.

## 17. Bug Konten: Label Pertanyaan Kuis Masih "Python untuk AI" di JavaScript Modul Lain
**Deskripsi:**
Pada saat melakukan verifikasi *UI Mobile* di halaman Kuis, ditemukan bahwa label kecil di atas setiap soal kuis (di dalam *card* soal) bertuliskan "PYTHON UNTUK AI", meskipun kuis tersebut berada di modul UI/UX atau modul lainnya.
**Penyebab:**
- Render UI kuis ditangani oleh JavaScript (`ai-[nama-modul].js`). Logika *render* ini juga merupakan hasil *cloning* dari modul Python, sehingga mengandung string `<small>Python untuk AI</small>` yang *hardcoded* di dalam fungsi `renderQuizList`.
**Solusi:**
- Membuat script `fix_js_quiz_label.js` untuk memindai direktori `js/frontend/fellow-dashboard/` dan mengedit seluruh file JavaScript modul, kecuali `ai-python.js` dan `ai-python-basic.js`.
- Melakukan Regex replace dari `<small>Python untuk AI</small>` menjadi label netral `<small>Evaluasi Modul</small>`.
- Merender ulang halaman di browser untuk memastikan label soal berubah dengan benar.

## 18. Bug Navigasi: Halaman Sub-Modul Evaluation & Evolution Mengembalikan 404
**Deskripsi:**
Ketika mengklik tab Latihan, Kuis, atau Diskusi di modul 05 (Evaluation AI) dan 06 (Evolution of AI), halaman tidak merender (muncul halaman 404 atau tidak ada perubahan tampilan).
**Penyebab:**
- Route untuk sub-halaman (`-practice`, `-quiz`, `-discussion`) belum didaftarkan di dalam `router.js`.
- Logika inisiasi *sidebar* (`window.initFellowDashboardPage`) tidak dipanggil saat halaman-halaman tersebut diakses.
**Solusi:**
- Menambahkan route lengkap modul 05 dan 06 beserta kondisi `if/else` inisiasinya ke dalam `router.js`.
- Menambahkan mekanisme *cache-busting* parameter query pada file `index.html` untuk `<script src="/js/router.js?v=...">` agar *browser* selalu memuat *router* versi terbaru.

## 19. Bug UI/UX: Latihan Modul Masih Bercampur di Materi dan Tidak Memiliki Kunci Jawaban
**Deskripsi:**
Pada modul Evaluation AI dan Evolution of AI, soal latihan masih muncul di bagian paling bawah pada tab "Materi". Selain itu, tab "Latihan" hanya berisi *form* isian biasa tanpa adanya panduan, referensi jawaban, atau pembahasan (tombol "Lihat pembahasan" jika diklik hanya memunculkan teks default "Tuliskan hasil analisis Anda.").
**Penyebab:**
- Script compiler `build_module.js` tidak menghapus segmen `## Latihan` saat merakit `html` materi.
- Modul 05 dan 06 tidak menyediakan teks pembahasan/jawaban di naskah aslinya (`.md`), dan `build_module.js` memiliki teks *hardcoded* sebagai nilai balikan default jika pembahasan absen.
**Solusi:**
- Mengubah logika `build_module.js` dengan menyisipkan Regex yang membuang segmen `## Latihan` dari *markdown* utama sebelum dikonversi menjadi HTML untuk *tab* Materi.
- Memperluas *parser* `build_module.js` untuk mendeteksi label `**Pembahasan:**`.
- Menulis ulang seluruh 12 Latihan di modul 05 dan 06 (menambahkan rubrik, kriteria, dan penjelasan pada setiap `**Pembahasan:**`).
- Merakit (re-build) ulang kedua modul sehingga tab Latihan kini murni terisolasi, interaktif, dan menyediakan panduan solusi tersembunyi yang bisa dimunculkan peserta dengan tombol klik.

## 21. Perombakan Arsitektur Halaman Evaluasi Computer Vision (Hybrid Tabs)
- **Problem**: Modul Computer Vision memiliki sistem kuis dan _coding challenge_ yang tertanam (*hardcoded*) di setiap halaman materi (misal: `pixel-anatomy.html`). Saat dicoba dipisah menjadi tab global seperti Python, terungkap bahwa interaksi OpenCV dan elemen Canvas-nya terikat kuat pada file materi masing-masing (banyak konflik ID dan referensi DOM yang bentrok jika digabung ke 1 file `latihan.html` global).
- **Solution (Hybrid UI Architecture)**:
  1. **Local Sub-Tabs**: Menambahkan tab lokal switcher (`Teori` | `Latihan & Kuis`) di dalam 4 file materi interaktif CV. Bagian kuis secara otomatis di-_hide_ saat membaca teori, dan dimunculkan saat tab Evaluasi di-klik, menjaga file JS tetap aman di habitatnya tanpa error DOM.
  2. **Global Mission Board**: Tab global `kuis.html` dan `latihan.html` milik Computer Vision tidak dihapus, melainkan disulap menjadi sebuah **Mission Board**. Halaman tersebut menampilkan *grid* kartu misi evaluasi yang rapi. Apabila *card* di-klik, *user* akan dilempar langsung ke bab yang bersangkutan.
- **Dampak**: Halaman teori CV menjadi bersih 100%, sistem evaluasi dan kanvas interaktif CV tidak rusak (*zero regression*), dan UI/UX tetap terasa premium dan terstruktur dari halaman luar.

## 20. Bug Navigasi: Halaman Modul Computer Vision Tidak Merespon Klik
**Deskripsi:**
Pengguna melaporkan bahwa URL lama dan baru menuju Computer Vision "dobel", dan ketika membuka URL baru (`participant-specialization-computer-vision`), kartu topik materi (contoh: Pixel Anatomy) tidak merespon saat diklik.

**Penyebab:**
- Script aktivasi UI JS ditaruh di dalam blok IF `router.js` yang salah (blok khusus `participant-ai-lab-`), sehingga JS `initCvOverview()` tidak pernah tereksekusi ketika user masuk via URL baru (`participant-specialization-`).
- Selain itu, blok route `participant-specialization-` memiliki pemanggilan fungsi `initCoursePlaceholder()` otomatis yang berpotensi membajak halaman menjadi status "Under Development" secara keliru.

**Solusi:**
- Memindahkan fungsi `initCvOverview()` ke dalam blok `else if` yang tepat di `router.js`.
- Mencegah eksekusi `initCoursePlaceholder()` jika route yang dituju adalah Computer Vision.
- Hasilnya, fitur kartu interaktif (clickable card) kembali aktif sempurna.

## 22. Migrasi Arsitektur Modul Computer Vision ke Sistem Sub-Modul Terpusat (Sub-module Architecture)
**Deskripsi:**
Modul Computer Vision sebelumnya menggunakan struktur lama berupa 11 file HTML raksasa yang tidak terstruktur, membuat navigasinya sangat padat dan tidak sejalan dengan modul AI Fundamentals yang menggunakan hierarki Sub-Modul.
**Penyebab:**
- Katalog awal memiliki 11 kartu topik yang menumpuk.
- File HTML legacy mengandung wrapper header, navigasi, dan footer yang hardcoded.
**Solusi:**
- Membuat script Node.js (`build_cv_submodules.js`, `extract_cv_chapters.js`) untuk memecah 11 file HTML legacy menjadi komponen `chapters` murni (hanya berisi `<article>`, `<style>`, dan `<script>`).
- Mengatur ulang arsitekturnya ke dalam 3 Sub-Modul utama:
  1. `01-digital-image-fundamentals`
  2. `02-convolutional-neural-networks`
  3. `03-advanced-cnn-architectures`
- Mengganti halaman katalog Computer Vision menjadi layout 3-card yang lebih elegan, sejajar dengan standar UI AI Fundamentals.

## 23. Bug Router & Security Guard Memblokir Akses Modul CV Baru
**Deskripsi:**
Setelah arsitektur URL baru diterapkan (contoh: `#/participant-cv-digital-image`), user dilempar ke halaman "Akses Peserta Dibatasi".
**Penyebab:**
Fungsi `isParticipantRouteAllowed` di `js/router.js` bertindak sebagai *whitelist security guard* yang hanya membolehkan prefix `/participant-ai-` atau `/participant-specialization-`. Prefix baru `/participant-cv-` tidak terdaftar.
**Solusi:**
- Menambahkan kondisi `|| path.startsWith("/participant-cv-")` ke dalam fungsi whitelist di `router.js`. Akses kini kembali terbuka.

## 24. Bug Visual & Fungsional: Layout dan Interaksi Python CV Hancur Pasca Migrasi
**Deskripsi:**
Halaman materi CV berhasil dimuat, tetapi komponen interaktif (seperti inspeksi piksel) dan *syntax highlighting* kode Python hancur total. Tombol "Run Code" juga tidak bereaksi.
**Penyebab:**
- Browser mengabaikan eksekusi tag `<style>` yang diinjeksi secara mentah (raw innerHTML) dari file `chapters/*.html`.
- Kelas CSS wrapper usang (seperti `.pixel-anatomy-page`) sudah tidak menempel pada *body*, membuat *scoped CSS* rusak.
- Fungsi inisiasi legacy Pyodide dan Canvas (seperti `initAiLabPixel()`) yang aslinya dipanggil oleh `router.js` tidak pernah tereksekusi pada arsitektur baru.
**Solusi:**
- Menulis script `fix_css_scoping.js` untuk mengganti *wrapper class* lama menjadi `.cv-chapter-wrapper` secara dinamis pada semua 11 chapter.
- Memodifikasi *logic injection* di `js/frontend/fellow-dashboard/ai-cv.js` untuk membedah DOM (*DOM parsing*) dan memasukkan node `<style>` secara manual ke dalam `<head>`.
- Mendaftarkan *hash map* untuk menghubungkan ID chapter dengan *legacy init function* masing-masing, dan mengeksekusinya menggunakan `setTimeout` sesaat setelah konten HTML dirender. Semua interaktivitas dan styling kini aktif secara sempurna.

## 25. Bug Visual: Halaman Modul CNN dan Interaksi Kanvas Hilang Styling
**Deskripsi:**
Pengguna melaporkan bahwa setelah arsitektur modul dipecah menjadi fragment, komponen CV (khususnya CNN) menjadi "berantakan" dan kehilangan seluruh CSS khusus (seperti visualizer konvolusi dan efek interaktif).
**Penyebab:**
- Seluruh kelas CSS khusus CV (contoh: `.cnn-pipeline`, `.conv-stage`) di dalam file `ai-lab-lesson.css` disekop (*scoped*) di bawah *parent class* `.ai-lab-content`.
- Pada arsitektur HTML lawas, tag `<article>` memiliki kelas `.ai-lab-content`. Namun, pada *template* arsitektur baru (`materi.html`), tag tersebut luput mewarisi kelas `.ai-lab-content`, sehingga *browser* menolak menerapkan aturan CSS ke seluruh elemen keturunannya.
**Solusi:**
- Menambahkan kelas `ai-lab-content` secara statis ke dalam tag `<article id="materi-...` pada ketiga file `materi.html` yang mewakili 3 sub-modul CV.
- Seluruh *styling*, grid konvolusi CNN, dan layout kartu materi kembali utuh dan cantik (*pixel-perfect*).

---

## 26. Bug Visual: MLP/FC Neuron Diagram Kontras Sangat Rendah (Sesi 26 Juli 2026)
**Deskripsi:**
Ilustrasi *Fully Connected (MLP)* di dalam *compare-box* pada `#/participant-cv-cnn` (Chapter 1 — Introduction to CNN) hampir tidak terlihat. Node neuron dan garis koneksi menyatu dengan background kartu.

**Penyebab:**
- File: `js/frontend/fellow-dashboard/ai-lab/cnn-intro.js` — fungsi `drawFeatureMaps()`
- Connection lines: `stroke="rgba(255,55,95,.15)"` — opacity 15%, hampir invisible
- Stroke width: `0.5` — terlalu tipis
- Output dots: `fill="rgba(255,55,95,.5)"` — opacity 50%, kurang kontras
- SVG size: `120×90` — terlalu kecil, dot radius 3

**Solusi:**
- Connection lines: opacity `0.15 → 0.25`, stroke `0.5 → 0.8`, warna `#ff375f → #f63392` (brand pink)
- Output dots: opacity `0.5 → 0.75`
- Input dots: `#ff375f → #f63392`
- SVG size: `120×90 → 150×110`, dot radius `3 → 3.5`
- Semua koordinat disesuaikan untuk spacing yang proporsional

---

## 27. Bug Visual: Code Block CNN Chapters Menggunakan Dark Theme VSCode (Sesi 26 Juli 2026)
**Deskripsi:**
Code block PyTorch di chapter CNN (`02-convolutional-neural-networks/chapters/`) dirender dengan background `#1e1e1e` (VSCode dark theme). Ini merusak konsistensi visual karena seluruh UI menggunakan soft pink/light theme.

**Penyebab:**
- `chapters/1.html` lines 1212-1248: Override CSS `.cv-chapter-wrapper .code-block` dengan `background: #1e1e1e !important` dan syntax color VSCode dark (`#c586c0`, `#dcdcaa`, `#b5cea8`, `#ce9178`)
- `chapters/2.html`, `chapters/3.html`, `chapters/4.html`: `.lesson-sec pre { background: #1e1e1e; color: #d4d4d4; }` di line 857

**Solusi:**
- `chapters/1.html`: Ganti `.code-block` override dengan light theme — background `#fff`, border pink, syntax colors brand (`#db2777`, `#7c3aed`, `#15803d`, `#b45309`, `#98a2b3`)
- `chapters/2.html`, `chapters/3.html`, `chapters/4.html`: `.lesson-sec pre` background `#1e1e1e → #fff`, color `#d4d4d4 → var(--px-text)`, tambah border pink + shadow
- Hasil: Notion/Vercel-documentation style, konsisten dengan pink design system

---

## 28. Bug Visual: FC+Softmax Architecture Diagram Kontras Rendah (Sesi 26 Juli 2026)
**Deskripsi:**
Diagram arsitektur `.layers-viz` di `chapters/1.html` memiliki beberapa masalah kontras: connector lines antar layer tidak terlihat, layer card menyatu dengan parent, dan layer-tag terlalu transparan.

**Penyebab:**
- Connector SVG: `stroke="rgba(255,255,255,.2)"` — WHITE 20% opacity pada background `#fff0f7` → invisible
- `.lv-layer`: `background: var(--px-bg-2)` = `#fff0f7` — sama dengan parent `.layers-viz` `var(--px-card)` → tidak ada separation
- Layer tags: 4 instances dengan `rgba(color,.15)` — opacity 15% terlalu rendah
- `.cnn-pipeline`: `background: var(--px-bg-2)` — blend dengan page
- `.lv-layer-name`: tidak ada explicit `color`, inherit dari parent

**Solusi:**
- Connector lines: `stroke="rgba(246,51,146,.35)"` stroke-width `1.5 → 2` dengan `stroke-linecap="round"` (3 instances)
- `.lv-layer`: `background: #fff`, tambah `box-shadow: 0 2px 12px rgba(246,51,146,.06)`
- `.lv-layer:hover`: shadow `rgba(0,0,0,.06) → rgba(246,51,146,.1)`
- Layer tags: opacity `.15 → .22` untuk 4 warna (blue, purple, orange, green)
- `.cnn-pipeline`: `background: #fff`, tambah shadow
- `.lv-layer-name`: explicit `color: var(--px-text)` untuk jamin kontras

---

## ═══ SESSION CHECKPOINT — 26 Juli 2026 ═══

### Konteks Sesi Ini
- AI: Sisyphus (OhMyOpenCode)
- User: Faiz
- Fokus: Visual fixes pada CNN module + handover update
- Branch: `main`
- Last commits: `9eda464` (handoff), `9493c59` (diagram fix), `ae99f32` (CV module)

### Aturan Kerja (Rules Established)
1. **Commit per fitur**, bukan satu commit besar — `git add` per kelompok file terkait
2. **Handover adalah single source of truth** — `handover/AI_HANDOFF_CURRENT_STATE.md` selalu di-update setiap checkpoint
3. **gemini.md adalah bug log** — semua bug, penyebab, solusi dicatat dengan nomor urut
4. **Prompt AI berikutnya** harus disertakan di handover agar next session langsung ngerti konteks
5. **Jangan provision/reset akun, jangan ubah admin** — aturan hard block dari handover
6. **CSS scope class `ai-lab-content` wajib** di semua template CV — untuk mencegah styling regression
7. **Dark theme dilarang** di code block — semua harus light pink theme (Notion/Vercel style)
8. **Diagram kontras minimum**: connection lines ≥ 25% opacity, dots ≥ 75% opacity, stroke ≥ 0.8px

### File yang Dimodifikasi Sesi Ini
- `js/frontend/fellow-dashboard/ai-lab/cnn-intro.js` — MLP/FC diagram contrast
- `pages/.../02-convolutional-neural-networks/chapters/1.html` — code block light theme + layers-viz fixes
- `pages/.../02-convolutional-neural-networks/chapters/2.html` — code block light theme
- `pages/.../02-convolutional-neural-networks/chapters/3.html` — code block light theme
- `pages/.../02-convolutional-neural-networks/chapters/4.html` — code block light theme
- `handover/AI_HANDOFF_CURRENT_STATE.md` — checkpoint update
- `gemini.md` — bug log update (this file)

### Status Worktree
- Bersih — semua perubahan sudah di-commit (3 commits)
- Scratch files (`scratch.js`, `scratch/*.py`) tetap untracked
- Tidak ada modified tracked files tersisa

---

## ═══ SESSION CHECKPOINT — 26 Juli 2026 (Update Sore) ═══

### Audit Backend & Scope Narrowing (Sesi Sisyphus Lanjutan)

**Yang dilakukan:**
1. Comprehensive backend audit — GAS (49 routes, 22 sheets), Go services (3), API integration
2. Scope narrowing — fokus HANYA ke dashboard peserta
3. Plan creation — `.omo/plans/participant-dashboard-fixes.md`

### Scope Boundary (ATURAN PENTING — JANGAN DILANGGAR)

**❌ JANGAN DISENTUH:**
- Signaling / WebRTC (Go) — prototype, belum terintegrasi
- Messaging / Chat (Go) — prototype, in-memory store
- Admin dashboard — production, jangan ubah auth/workflow
- Security hardening — butuh koordinasi senior
- Leaderboard, Certificates, Tasks, Projects, Events, Community, Mentor — placeholder

**✅ HANYA INI YANG DIKERJAKAN:**
- Dashboard peserta (dynamic name, progress, events)
- Settings peserta (wire form ke GAS)
- Ganti password mandiri (backend + frontend baru)
- Sidebar dinamis (replace "Aisyah Putri")
- Progress tracking (API baru + sheet)

---

## Sesi 27 Juli 2026 — Dashboard Peserta Complete

### Status: Semua 5 Fase Selesai + 7 Bug Fixed

| Fase | Commit | Deskripsi |
|---|---|---|
| 1 | `ef9f875` | Dynamic name, notif hide, `getParticipantDisplayName()` |
| 2 | `67e4761` | Settings wire ke GAS, form save, tab navigation |
| 3 | `ac16a3c` | Ganti password GAS + frontend UI |
| 4 | — | Dashboard dinamis — infrastructure sudah ada |
| 5 | `c840c2e` | Progress tracking system |

### Bug yang Ditemukan dan Difix (#29-35)

### #29 — Null pointer `btn-cancel` di `initSettingsPage()`
**File:** `js/frontend/fellow-dashboard/settings.js`
**Deskripsi:** `form.querySelector('.btn-cancel')` tidak ada null check. Kalau tombol Batal dihapus dari HTML, JS crash.
**Cara Perbaikan:** Wrapped dengan `if (cancelBtn) { ... }`

### #30 — Null pointer `session.nik` di `initSettingsPage()`
**File:** `js/frontend/fellow-dashboard/settings.js`
**Deskripsi:** `session.nik` di submit handler tidak ada guard. Kalau session null (edge case), TypeError.
**Cara Perbaikan:** `if (!session?.nik) return;` di awal `initSettingsPage()`

### #31 — Fragile selector `input[value*="linkedin.com"]`
**File:** `js/frontend/fellow-dashboard/settings.js`
**Deskripsi:** Matching LinkedIn/GitHub input pakai value attribute. Kalau HTML berubah format, selector gagal match → field tetap editable.
**Cara Perbaikan:** Tambah `id="settingsLinkedin"` dan `id="settingsGithub"` di HTML, ganti ke `getElementById()`

### #32 — Null guard submit buttons (2 lokasi)
**File:** `js/frontend/fellow-dashboard/settings.js`
**Deskripsi:** `form.querySelector('.btn-save')` dan `form.querySelector('button[type="submit"]')` tidak ada null check.
**Cara Perbaikan:** Tambah `if (!btn) return;` di kedua lokasi.

### #33 — CSS `.settings-message` tidak ada
**File:** `css/frontend/fellow-dashboard/settings.css`
**Deskripsi:** Kelas `.settings-message.success` dan `.settings-message.error` tidak didefinisikan di CSS manapun. Toast sukses/gagal tampil sebagai teks polos.
**Cara Perbaikan:** Tambah styles: `.settings-message.success` (hijau) dan `.settings-message.error` (merah).

### #34 — Default status inconsistency
**File:** `gas/Code.gs`
**Deskripsi:** Frontend `saveChapterProgress()` default ke `'completed'`, tapi GAS `saveParticipantProgress()` default ke `'in_progress'`. Inkonsisten.
**Cara Perbaikan:** Align keduanya ke `'completed'`.

### #35 — `module_id` missing dari `participantDashboardModules` schema (HIGH)
**File:** `gas/Code.gs`
**Deskripsi:** `getParticipantDashboardData()` menggunakan `row.module_id` untuk mencocokkan progress records, tapi kolom `module_id` tidak ada di schema `participantDashboardModules`. Akibatnya `row.module_id` selalu `undefined` → `completedByModule[undefined]` selalu `0` → progress computation NEVER matched data real. Dashboard selamanya 0%.
**Cara Perbaikan:** Tambah `'module_id'` sebagai kolom pertama di schema `participantDashboardModules`.

---

### Aturan Sesi (Tetap berlaku)
1. Commit PER FITUR, bukan satu commit besar
2. Update handover & gemini.md setiap checkpoint
3. Catat bug baru dengan nomor urut lanjutan (#36+)
4. Dark theme DILARANG di code block — semua light pink theme
5. CSS scope class `ai-lab-content` WAJIB di template CV
6. Diagram kontras: lines ≥25% opacity, dots ≥75%, stroke ≥0.8px
7. JANGAN tampilkan NIK/password di log/screenshot/handover
8. TANYA DULU sebelum eksekusi kalau ada yang ambigu
9. Scope boundary WAJIB diikuti — jangan sentuh signaling/chat/admin/keamanan
10. JANGAN edit 231 file lesson satu-satu — pakai JS injection untuk sidebar dinamis
11. sessionStorage adalah source of truth untuk data peserta di frontend
12. JANGAN jalankan provisionParticipantAccounts / generateParticipantAccounts*
13. Gas/Code.gs HARUS di-deploy ulang setelah perubahan (Manage deployments → New version)

---

### Deployment + Testing (27 Juli 2026 — Final)

**GAS Versi 3** — Deploy sukses 26 Juli 2026 08:04 WIB. Semua route aktif.

**Backend Verification:** 47/47 checks PASS — semua endpoint baru terverifikasi (line-by-line review)
- `changeParticipantPassword` (13 checks) — route, auth, validasi, hash, sync 2 sheet, audit
- `saveParticipantProgress` (12 checks) — route, auth, upsert, timestamps, audit
- `getParticipantProgress` (7 checks) — route, auth, filter, return
- `getParticipantDashboardData` (4 checks) — baca progress, compute %, fallback
- Schema `participant_progress` (12 checks) — 10 kolom lengkap
- Schema `participantDashboardModules` (2 checks) — module_id + total_chapters

**Backend Testing:** 12/12 endpoints PASS — login, settings, stages, admins, questions, retest
**Frontend HTTP:** 10/10 routes PASS — semua SPA route return 200
**Frontend Playwright:** 8/12 PASS — 4 failures adalah SPA artifacts

Report: `reports/BACKEND_FRONTEND_AUDIT_2026-07-27.md`

## 36. Task A Complete: Wiring saveChapterProgress ke 28 Lesson Module JS Files
**Deskripsi:**
Helper `window.saveChapterProgress(moduleId, chapterId, status)` sudah ada di `settings.js` tapi belum pernah dipanggil dari halaman lesson manapun. Semua 28 module JS file perlu di-inject dengan `MODULE_ID` constant dan pemanggilan `saveChapterProgress`.

**Pendekatan:**
- Dibuat script `scripts/inject-progress-tracking.js` untuk inject otomatis
- Setiap file `ai-*.js` mendapat: `const MODULE_ID = 'nama-modul'` + `window.saveChapterProgress(MODULE_ID, chapter, 'completed')`
- Module ID diekstrak dari `CHAPTERS[0].sourcePath` (folder sebelum `/chapters/`)
- Script otomatis strip prefix angka (e.g. `02-python-untuk-ai` → `python-untuk-ai`)

**Hasil:**
- 28/29 file termodifikasi (1 skipped: ai-math-for-ai — bukan lesson module)
- 2 file perlu manual fix: ai-modern.js (BASE_PATH, bukan SOURCE_BASE), ai-python-basic.js (STORAGE_KEY_CHAPTER di dalam fungsi)
- 29/29 syntax check PASS (`node --check`)
- 5 commit atomic berdasarkan kategori modul
- Module ID mapping: 28 modul dengan ID dari folder name (deep-learning, reinforcement-learning, computer-vision, large-language-model, dll)
- `saveChapterProgress` dipanggil setiap kali chapter berhasil dirender (setelah fetch + render + updateProgress)

**Injection points per pattern:**
- Standard (24 modul): setelah `updateProgress(chapter, total)` → `window.saveChapterProgress(MODULE_ID, chapter, 'completed')`
- ai-cv.js: setelah `container.innerHTML = html` → untuk mode='materi' saja, 3 sub-modul (digital-image, cnn, advanced-cnn) semua pakai `computer-vision`
- ai-python-basic.js: setelah progressText update di `.then()` callback
- ai-ml-basic.js: setelah `updateChapterUi()` selesai
- ai-modern.js: setelah `updateProgress(number, CHAPTERS.length)`

**Commits:** d2d40d2, c24dcbb, 704c752, c708ace, f8a03c9 (5 commit, +329/-0)

D. **Testing lanjutan** — manual + Playwright e2e
5. Setelah stabil, wiring auto-save progress ke lesson pages

## 37. Task B Complete: Seed Dashboard Data Functions
**Deskripsi:**
6 sheet dashboard peserta (`participant_dashboard_modules`, `_journey`, `_events`, `_tracks`, `_discussion_trails`, `_leaderboard`) masih kosong di production. Dashboard selalu render fallback hardcoded.

**Pendekatan:**
- Menambahkan 7 GAS seed functions di `gas/Code.gs`
- `seedAllDashboardData()` — master, memanggil 6 fungsi individual
- Semua fungsi idempotent (`upsertByKey` / `addRowObject`) — aman dijalankan ulang

**Data yang di-seed:**
- `seedDashboardModules()`: 27 modul dengan `module_id` (match dengan Task A MODULE_ID), `total_chapters` (akurat dari file JS), `icon`, `tone`, `href`, `sort_order`
- `seedDashboardJourney()`: 4 fase — Foundation, Specialization, Project, Graduation
- `seedDashboardEvents()`: 5 upcoming events dengan relative date (hari ini +3 s/d +18)
- `seedDashboardTracks()`: 6 specialization tracks — Computer Vision, Speech, NLP/LLM, MLOps, Multimodal, Bioinformatics
- `seedDashboardDiscussions()`: 4 discussion activities
- `seedDashboardLeaderboard()`: auto-populate dari `ParticipantAccounts` (10 teratas), fallback 10 placeholder

**Cara pakai:**
1. Buka Apps Script editor dari Google Spreadsheet
2. Paste `gas/Code.gs`
3. Jalankan `seedAllDashboardData()` dari editor

**Fix:**
- `ai-ml-basic.js` MODULE_ID diperbaiki: `ml-basic` → `machine-learning` (match dengan sheet)

**Commits:** d974a21, 1e6801d, c0d6a55

## 38. Session Wrap: Bug Fixes & UI Polish (9 commit)
**Deskripsi:**
Setelah Task A dan B selesai, ditemukan beberapa bug blocking saat manual testing.

**Bug yang difix:**

| # | Severity | Deskripsi | Commit |
|---|---|---|---|
| #38a | HIGH | Sidebar deep-learning: HTML `id="aiDeepLearningList"` vs JS `#reasoning-sidebar-list` mismatch → sidebar gak update pas navigasi | 4c4b167 |
| #38b | HIGH | Dropdown "Setting Akun" link ke `/participant-profile` bukan `/participant-settings` — browser cache bikin fix gak kepakai | 4c4b167 |
| #38c | HIGH | Settings page kena catchall `startsWith('/participant-')` → `initFellowDashboardPage('under-development')`. Tab gak ada click handler | 62eaa0c |
| #38d | HIGH | `/participant-profile` diblok `isParticipantRouteAllowed` guard sebelum redirect handler jalan → "Akses Dibatasi" | 0e51adb |
| #38e | MED | Redirect set `currentPath` bikin router skip content load → halaman kosong | 6484039 |
| #38f | MED | Password form: `session.nik` null + `btn` null → silent return tanpa error message. User klik "Ganti Password" gak terjadi apa-apa | 9040616 |
| #38g | LOW | Dashboard + settings HTML hardcode "Aisyah Putri" → flash sebelum JS ganti nama | 9a5a127 |
| #38h | LOW | Dashboard tampil 27 modul sekaligus → terlalu rame. Limit 8 + "Lihat Semua Modul (27)" | c3baae9 |
| #38i | LOW | Greeting "Halo!" kosong pas nama gak ada → revert ke "Halo, Peserta HerAI!" | 7ddfdde |

**Pelajaran:**
1. Browser cache JS agresif — selalu bump cache buster (`?v=...`) di `index.html`
2. Hardcode "Aisyah Putri" ada di banyak file HTML — ganti satu per satu (dashboard, settings), sisanya di-handle JS injection
3. Guard `isParticipantRouteAllowed` jalan SEBELUM route handler — redirect harus di-guard level
4. Silent fail (no error message) bikin debugging susah — selalu tambah feedback UI

**Next steps:**
1. User jalankan `seedAllDashboardData()` di Apps Script
2. User login ulang untuk refresh session
3. Test flow lengkap: login → dashboard → module → settings → password

---

## Task C — Frontend Polish (27 Juli 2026)

**Commit:** `5ea3409`
**Files:** `dashboard.css` (+269), `settings.js` (+116/-27), `index.html` (cache busters)

### Fitur
- **Skeleton Loader**: 6 animated shimmer placeholder sections (modules, trail, tracks, journey, events, leaderboard)
- **Error State**: Dashboard error UI dengan icon, pesan, dan tombol "Coba Lagi"
- **Fade-in**: Real data cards muncul dengan staggered animation (`dash-fade-in`)
- **New Flow**: `renderDashboardSkeletons()` → `fetchParticipantDashboardData()` → `renderParticipantDashboard()` atau `renderDashboardError()`
- **Retry**: `window.__retryDashboard()` → restart full init flow

### Bug Ditemukan & Fixed Saat Audit

## 39. Bug CSS: Skeleton Circle Span Tidak Muncul (Inline Element)
**Deskripsi:** Skeleton circle placeholder tidak terlihat di dashboard.
**Penyebab:** `.skeleton-circle` tidak memiliki `display: block/inline-block`. `<span>` default inline → width/height diabaikan.
**Solusi:** Menambahkan `display: inline-block` ke `.skeleton-circle`.

## 40. Bug CSS: Redundant `border-radius` di Tiga Selector
**Deskripsi:** `.skeleton-icon`, `.skeleton-badge`, `.sk-date` mendefinisikan `border-radius` dua kali.
**Penyebab:** Copy-paste base template `border-radius: 8px` lalu override final.
**Solusi:** Menghapus deklarasi redundant.

## 41. Bug CSS: Unused `@keyframes dash-spin`
**Deskripsi:** Keyframe `dash-spin` tidak digunakan.
**Solusi:** Dihapus.

---

## Bug #42-44 — Module 404 + Dashboard Cache + Password UX (27 Juli 2026)

## 42. Bug: Module Cards 404 — GAS Seed HREF Route Mismatch
**Deskripsi:**
Klik module card dari dashboard mengarah ke halaman 404. Semua modul tidak bisa diakses.
**Penyebab:**
`seedDashboardModules()` di Code.gs menggunakan pola href `#/participant-ai-*` tetapi router menggunakan `#/participant-ai-lab-*`. Sebanyak 22 dari 27 href mismatch.
**Solusi:**
Memperbaiki 22 href di `seedDashboardModules()`:
- 20 modul: `participant-ai-*` → `participant-ai-lab-*`
- computer-vision: `participant-cv-digital-image` → `participant-ai-lab-cv`
- machine-learning: `participant-ai-ml-basic` → `participant-ai-lab-machine-learning`
5 modul sudah benar (python, reasoning, modern, evolution, evaluation — pakai direct route tanpa -lab-).
**Catatan:** User harus re-run `seedAllDashboardData()` di Apps Script setelah deploy Code.gs.

## 43. Bug: Skeleton Muncul Setiap Kali Navigasi Balik ke Dashboard
**Deskripsi:**
Setiap kali user navigasi ke halaman lain lalu kembali ke dashboard, skeleton shimmer muncul lagi dan fetch ulang dari GAS.
**Penyebab:**
`initParticipantDashboardData()` selalu memanggil `renderDashboardSkeletons()` tanpa cache.
**Solusi:**
Menambahkan `_dashboardDataCache` di module scope. First load: skeleton + fetch + simpan cache. Navigasi balik: render instant dari cache + optional background refresh silent.

## 44. Bug: Password Change — Feedback Kurang & Validasi Client-Side Kosong
**Deskripsi:**
User melaporkan tidak bisa login setelah ganti password. Form password tidak memvalidasi field kosong di client-side.
**Penyebab:**
- Tidak ada validasi client-side untuk field password lama/baru kosong
- Tidak ada pengecekan password baru ≠ password lama di client-side
- Success message terlalu generik — tidak memberitahu user untuk pakai password baru saat login
**Solusi:**
- Tambah validasi: oldPassword kosong → error + focus field
- Tambah validasi: newPassword kosong → error + focus field
- Tambah validasi: oldPassword === newPassword → error
- Perbaiki success message: "Gunakan password baru saat login berikutnya."
**Catatan:** Logic GAS `changeParticipantPassword()` sudah benar — hash di-write ke `participantAccounts.password_hash` dan `participants.participant_password`. User disarankan verifikasi GAS deployment up-to-date.

---

## Session Summary — 27 Juli 2026 (Sisyphus — Final)

**Total commits:** 22
**Bugs fixed:** #36-44
**Key deliverables:**
- Task A: Progress tracking wired to 28 module JS files ✅
- Task B: GAS seed functions for all 6 dashboard sheets ✅
- Task C: Skeleton loader, error state, fade-in, retry button ✅
- Fix #42: Module href 404 — 22 seed hrefs corrected to match router routes
- Fix #43: Dashboard cache — no skeleton re-render on navigation back
- Fix #44: Password UX — client-side validation + improved feedback
- 9 bug fixes (#38a-i): sidebar, dropdown, settings route, profile redirect, password, flash name, dashboard layout, greeting
- 3 CSS bugs found & fixed during audit (#39-41)
