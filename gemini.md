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
