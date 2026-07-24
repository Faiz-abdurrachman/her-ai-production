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
