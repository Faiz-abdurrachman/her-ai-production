# Apa itu Machine Learning?

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/legacy-lessons/ml-intro.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

01

#### Apa itu Machine Learning?

Perbedaan fundamental antara pemrograman klasik dan ML

Pemrograman klasik bekerja dengan cara sederhana: programmer menulis **aturan eksplisit**, komputer mengeksekusinya. Tapi ada kelas masalah — mengenali wajah, memahami kalimat, memprediksi harga saham — di mana tidak ada manusia yang bisa menuliskan aturannya secara eksplisit. Di sinilah **Machine Learning** masuk.

Pemrograman Klasik

** Data Input

+

** Aturan (oleh programmer)

↓

** Output / Jawaban

Contoh: `if suhu > 38: return "demam"`

VS

Machine Learning

** Data Input

+

** Jawaban (label/output)

↓

** Aturan ditemukan sendiri oleh model

Contoh: `model.fit(data_pasien, diagnosa)`

**

**Definisi formal (Tom Mitchell, 1997):** "A computer program is said to learn from experience E with respect to some task T and performance measure P, if its performance on T, as measured by P, improves with experience E."
 Dengan kata lain: ML adalah program yang **menjadi lebih baik seiring bertambahnya data**.

** Motivasi

Mengapa ML Dibutuhkan?

**

Masalah Terlalu Kompleks

Pengenalan wajah, penerjemahan bahasa, diagnosis medis — tidak ada manusia yang bisa menulis aturannya secara eksplisit.

**

Data Tersedia Masif

Internet menghasilkan miliaran titik data setiap hari. ML bisa memanfaatkan data ini untuk menemukan pola yang tidak terlihat manusia.

**

Lingkungan Dinamis

Filter spam harus adaptif — spammer terus berubah taktik. Aturan statis tidak bisa mengikuti, tapi model ML bisa belajar terus.

**

Menemukan Pola Tersembunyi

Pola dalam data genomik, perilaku finansial, atau cuaca — terlalu kompleks dan multidimensional untuk ditemukan secara manual.

02

#### Tiga Paradigma Utama ML

Cara yang berbeda untuk belajar dari data, tergantung informasi apa yang tersedia

ML bukan satu algoritma — melainkan keluarga besar pendekatan. Perbedaan paling mendasar ada di **jenis sinyal pembelajaran**: apakah kita punya jawaban benar? Apakah data sudah berlabel? Dari sini muncul tiga paradigma utama.

01

**

Supervised Learning

Belajar dari contoh berlabel

Setiap data latih memiliki label yang diketahui. Model belajar memetakan input ke output yang benar.

Sinyal: Label eksplisit y untuk setiap x

Klasifikasi emailspam / bukan spam

Prediksi harga rumahnilai numerik Rp

Deteksi penyakitpositif / negatif

02

**

Unsupervised Learning

Temukan struktur tanpa label

Tidak ada label. Model harus menemukan sendiri pola, kelompok, atau struktur tersembunyi dalam data.

Sinyal: Hanya data x, tanpa label y

Segmentasi pelanggancluster otomatis

Kompresi datarepresentasi ringkas

Anomali detectionpola tidak biasa

03

**

Reinforcement Learning

Belajar dari interaksi & reward

Agen belajar dengan mencoba aksi dan menerima sinyal reward/penalti dari lingkungan. Tidak ada dataset statis.

Sinyal: Reward r setelah aksi a di state s

AlphaGo / chess AImenang / kalah

Robot navigasireach target

Rekomendasi kontenklik / scroll

03

#### Supervised Learning — Lebih Dalam

Paradigma paling umum — fondasi sebagian besar aplikasi ML di industri

Supervised learning adalah paradigma paling dominan di industri. Hampir semua model produksi — dari filter konten hingga sistem rekomendasi — dibangun di atasnya. Ada dua sub-tugas utama: **klasifikasi** dan **regresi**.

**️

Klasifikasi

Output diskrit

h : X → {C₁, C₂, …, Cₖ}

Menetapkan kelas kategorikal ke setiap input. Bisa binary (2 kelas) atau multi-class (k kelas).

Email → spam / ham

Foto → anjing / kucing / burung

Transaksi → fraud / normal

**

Regresi

Output kontinu

h : X → ℝ

Memprediksi nilai numerik kontinu. Perbedaannya dengan klasifikasi hanya pada tipe output.

Fitur rumah → harga Rp

Data cuaca → suhu besok °C

Profil pengguna → revenue prediksi

⚙️ Bagaimana Supervised Learning Bekerja

Pipeline Lengkap — 4 Langkah

1

Kumpulkan Training Data

Dataset D = {(x⁽¹⁾, y⁽¹⁾), ..., (x⁽ᴺ⁾, y⁽ᴺ⁾)}. Setiap contoh adalah pasangan input-output. Kualitas dan kuantitas data sangat menentukan hasil.

↓

2

Pilih Model (Ruang Hipotesis H)

Tentukan keluarga fungsi yang akan dicari: linear, polynomial, decision tree, neural network. Pilihan ini disebut *induktif bias*.

↓

3

Training — Minimalkan Loss

Cari parameter θ yang meminimalkan fungsi loss L(θ) — ukuran kesalahan prediksi di atas training data. Biasanya via gradient descent.

↓

4

Evaluasi Generalisasi

Uji pada test set yang tidak pernah dilihat model. Tujuan bukan menghafal data latih — tapi bisa memprediksi data baru dengan akurat.

04

#### Unsupervised Learning

Menemukan struktur tersembunyi tanpa label

Memberi label data itu mahal dan lambat. Untungnya, banyak hal berguna bisa dipelajari dari data yang **tidak berlabel** — menemukan kelompok alami, memampatkan representasi, atau mendeteksi anomali.

**

Clustering

Mengelompokkan data berdasarkan kemiripan tanpa label. **K-Means** mencari K cluster dengan meminimalkan jarak intra-cluster. **DBSCAN** menemukan cluster bentuk arbitrer berdasarkan density.

K-Means DBSCAN Agglomerative GMM

**

Dimensionality Reduction

Meringkas data berdimensi tinggi ke representasi lebih padat tanpa kehilangan informasi penting. Berguna untuk visualisasi, kompresi, dan feature engineering sebelum supervised learning.

PCA t-SNE Autoencoder UMAP

**

Anomaly Detection

Mengidentifikasi titik data yang menyimpang jauh dari pola normal. Tidak perlu label "anomali" — cukup pelajari distribusi data normal, lalu flagging yang tidak cocok.

Isolation Forest Autoencoder LOF

05

#### Reinforcement Learning

Belajar dari konsekuensi aksi — seperti cara manusia belajar

RL paling mirip dengan cara manusia belajar secara alami: mencoba sesuatu, melihat hasilnya, dan menyesuaikan perilaku. Tidak ada dataset statis — agen **mengumpulkan pengalamannya sendiri** melalui interaksi dengan lingkungan.

**

Agent

**

Environment

aksi a

state s, reward r

State `s`

Representasi situasi lingkungan saat ini yang dilihat agen. Misalnya: posisi robot, posisi bidak catur, frame video game.

Action `a`

Pilihan yang bisa dilakukan agen di suatu state. Bisa diskrit (maju/mundur/kiri/kanan) atau kontinu (torsi motor 0–100%).

Reward `r`

Sinyal skalar dari lingkungan setelah agen melakukan aksi. Positif = bagus (menang, skor naik), negatif = buruk (jatuh, kalah). Ini *satu-satunya* sinyal pembelajaran.

Policy `π`

Strategi agen — fungsi yang memetakan state ke aksi: π(s) = a. Tujuan RL adalah menemukan policy optimal yang memaksimalkan cumulative reward.

**

**AlphaGo Zero (DeepMind, 2017)** — belajar bermain Go dari nol hanya dengan RL, tanpa data partai manusia sama sekali. Setelah 3 hari, ia mengalahkan AlphaGo versi sebelumnya (yang sudah mengalahkan juara dunia manusia) dengan skor 100-0.

06

#### Kapan Pakai ML — dan Kapan Tidak

ML bukan solusi untuk semua masalah. Memilih dengan tepat sama pentingnya dengan kemampuan teknis.

Salah satu skill paling berharga seorang ML practitioner adalah tahu kapan *tidak* menggunakan ML. ML butuh data, waktu, dan sumber daya — sering ada solusi lebih sederhana yang lebih baik.

** Gunakan ML

**

Aturan tidak bisa ditulis manual

Pengenalan wajah, pemahaman bahasa natural — terlalu kompleks untuk di-hardcode.

**

Data latih tersedia banyak

ML butuh data untuk belajar. Semakin banyak data berkualitas, semakin baik hasilnya.

**

Performa bisa diukur

Ada metrik jelas (accuracy, F1, RMSE) untuk menentukan apakah model cukup baik.

**

Pola bisa berubah seiring waktu

Model bisa di-retrain dengan data baru, sedangkan aturan statis butuh update manual.

** Jangan Pakai ML

**

Aturan sudah jelas dan simpel

if-else yang simpel lebih cepat, lebih mudah di-debug, dan lebih explainable dari model ML manapun.

**️

Data sangat sedikit

Model ML butuh data yang cukup untuk generalisasi. Dengan data terlalu sedikit, hasil tidak bisa dipercaya.

**

Interpretabilitas kritis

Sistem hukum, medis, keuangan sering butuh penjelasan tiap keputusan — "black box" tidak bisa diterima.

**

Biaya lebih besar dari manfaat

Mengumpulkan data, training, deployment, monitoring — semua berbiaya. Pastikan ROI-nya worth it.

Lesson berikutnya

##### Hipotesis & Model →

Sekarang kamu tahu APA itu ML — saatnya pelajari bahasa matematisnya. Apa itu hipotesis, ruang hipotesis H, dan bagaimana model diparameterisasi.

[Lanjut ke Hipotesis & Model](#/participant-ai-lab-ml-hypothesis)

## Lampiran Sumber HTML Lengkap

````html
<section class="fellow-dashboard fellow-modules-page lesson-detail-page ml-lesson-page" data-fellow-page="modules">
<button class="fellow-menu-toggle" type="button" aria-label="Buka navigasi peserta" aria-expanded="false"><i class="fas fa-bars"></i></button>
<div class="fellow-sidebar-scrim" aria-hidden="true"></div>
<aside class="fellow-sidebar" aria-label="Navigasi peserta">
<a href="#/participant-dashboard" class="fellow-logo" aria-label="Buka sidebar peserta"><img src="/assets/branding/logo-her-ai-transparent.png" alt="HerAI Fellowship"></a>
<nav class="fellow-menu">
<a href="#/participant-dashboard" data-fellow-nav="dashboard"><i class="fas fa-house"></i><span>Beranda</span></a>
<a href="#/messaging" data-fellow-nav="chatroom"><i class="far fa-comment-dots"></i><span>Chatroom</span><strong>3</strong></a>
<a href="#/participant-mentor" data-fellow-nav="mentor"><i class="fas fa-user-group"></i><span>Mentor</span></a>
<a class="active" href="#/participant-modules" data-fellow-nav="modules"><i class="fas fa-book-open"></i><span>Modul</span></a>
<a href="#/participant-tasks" data-fellow-nav="tasks"><i class="fas fa-list-check"></i><span>Tugas</span></a>
<a href="#/participant-projects" data-fellow-nav="projects"><i class="far fa-folder-open"></i><span>Proyek</span></a>
<a href="#/participant-events" data-fellow-nav="events"><i class="far fa-calendar-days"></i><span>Events</span></a>
<a href="#/participant-community" data-fellow-nav="community"><i class="fas fa-users"></i><span>Komunitas</span></a>
</nav>
<nav class="fellow-menu secondary">
<a href="#/participant-certificates" data-fellow-nav="certificates"><i class="fas fa-certificate"></i><span>Sertifikat</span></a>
<a href="#/participant-leaderboard" data-fellow-nav="leaderboard"><i class="fas fa-ranking-star"></i><span>Leaderboard</span></a>
<a href="#/participant-help" data-fellow-nav="faq"><i class="far fa-circle-question"></i><span>FAQ &amp; Bantuan</span></a>
<a href="#/participant-settings" data-fellow-nav="settings"><i class="fas fa-gear"></i><span>Pengaturan</span></a>
</nav>
<div class="invite-card course-help-mini">
<div><strong>Butuh bantuan?</strong><p>Tanya HerAI Assistant tentang modul dan pembelajaran.</p></div>
<button type="button">Chat Sekarang</button>
</div>
</aside>
<main class="fellow-main">
<header class="lesson-topbar">
<nav class="lesson-breadcrumb" aria-label="Breadcrumb materi">
<a href="#/participant-ai-lab-ml"><i class="fas fa-arrow-left"></i><span>Machine Learning</span></a>
<span class="lesson-breadcrumb-separator"><i class="fas fa-arrow-right"></i></span>
<span>Pengantar ML</span>
</nav>
<div class="fellow-actions">
<label class="fellow-search"><i class="fas fa-magnifying-glass"></i><input type="search" placeholder="Cari modul, topik, atau materi..."></label>
<button type="button" class="fellow-icon-button" aria-label="Notifikasi"><i class="far fa-bell"></i><span>5</span></button>
<a href="#/participant-profile" class="fellow-user-button"><span class="avatar-img"></span><span><strong>Aisyah Putri</strong><small>Peserta</small></span><i class="fas fa-chevron-down"></i></a>
</div>
</header>
<div class="lesson-layout">
<div class="lesson-main-content">
<section class="lesson-hero compact">
<div class="lesson-hero-copy">
<h1>Pengantar Machine Learning</h1>
<p>Perbedaan fundamental antara pemrograman klasik dan ML — dari aturan eksplisit ke induksi dari data.</p>
<div class="lesson-meta-row">
<span><i class="far fa-clock"></i> 40 menit</span>
<span><i class="fas fa-layer-group"></i> ML · Pengantar ML</span>
<b>Fondasi</b>
</div>
</div>
<img src="/assets/messaging/herai-chat-persona.png" alt="HerAI ML learning">
</section>
<section class="lesson-material-panel">
<div class="lesson-tabs" role="tablist" aria-label="Jenis materi">
<a href="#/participant-ai-lab-ml-intro" class="active"><i class="fas fa-book-open"></i> Materi</a>
<a href="#/participant-ai-lab-ml"><i class="fas fa-layer-group"></i> Katalog ML</a>
</div>
<article class="lesson-article ai-lab-content" id="mlintro-content">


      <!-- ═══ SEC 1: DEFINISI ═══ -->
      <section class="lesson-sec" id="sec-definisi">
        <div class="sec-header">
          <span class="sec-num">01</span>
          <div>
            <h2 class="sec-title">Apa itu Machine Learning?</h2>
            <p class="sec-sub">Perbedaan fundamental antara pemrograman klasik dan ML</p>
          </div>
        </div>

        <div class="prose">
          Pemrograman klasik bekerja dengan cara sederhana: programmer menulis <strong>aturan eksplisit</strong>,
          komputer mengeksekusinya. Tapi ada kelas masalah — mengenali wajah, memahami kalimat,
          memprediksi harga saham — di mana tidak ada manusia yang bisa menuliskan aturannya secara eksplisit.
          Di sinilah <strong>Machine Learning</strong> masuk.
        </div>

        <!-- Classic vs ML diagram -->
        <div class="paradigm-compare">
          <div class="pc-col">
            <div class="pc-header classic">Pemrograman Klasik</div>
            <div class="pc-flow">
              <div class="pc-box input"><i class="fas fa-inbox"></i> Data Input</div>
              <div class="pc-arrow">+</div>
              <div class="pc-box rules"><i class="fas fa-clipboard"></i> Aturan (oleh programmer)</div>
              <div class="pc-arrow">↓</div>
              <div class="pc-box output"><i class="fas fa-paper-plane"></i> Output / Jawaban</div>
            </div>
            <div class="pc-example">
              <span class="pce-label">Contoh:</span>
              <code>if suhu > 38: return "demam"</code>
            </div>
          </div>

          <div class="pc-vs">VS</div>

          <div class="pc-col">
            <div class="pc-header ml">Machine Learning</div>
            <div class="pc-flow">
              <div class="pc-box input"><i class="fas fa-inbox"></i> Data Input</div>
              <div class="pc-arrow">+</div>
              <div class="pc-box answers"><i class="fas fa-circle-check"></i> Jawaban (label/output)</div>
              <div class="pc-arrow">↓</div>
              <div class="pc-box rules ml-rules"><i class="fas fa-robot"></i> Aturan ditemukan sendiri oleh model</div>
            </div>
            <div class="pc-example">
              <span class="pce-label">Contoh:</span>
              <code>model.fit(data_pasien, diagnosa)</code>
            </div>
          </div>
        </div>

        <div class="insight-callout">
          <div class="ic-icon"><i class="fas fa-lightbulb"></i></div>
          <div class="ic-body">
            <strong>Definisi formal (Tom Mitchell, 1997):</strong> "A computer program is said to learn from
            experience E with respect to some task T and performance measure P, if its performance on T,
            as measured by P, improves with experience E."
            <br><br>
            Dengan kata lain: ML adalah program yang <strong>menjadi lebih baik seiring bertambahnya data</strong>.
          </div>
        </div>

        <!-- Why ML exists -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-bullseye"></i> Motivasi</div>
          <div class="wb-title">Mengapa ML Dibutuhkan?</div>
          <div class="motivation-grid">
            <div class="motiv-card">
              <div class="motiv-icon"><i class="fas fa-puzzle-piece"></i></div>
              <div class="motiv-title">Masalah Terlalu Kompleks</div>
              <div class="motiv-desc">Pengenalan wajah, penerjemahan bahasa, diagnosis medis — tidak ada manusia yang bisa menulis aturannya secara eksplisit.</div>
            </div>
            <div class="motiv-card">
              <div class="motiv-icon"><i class="fas fa-chart-simple"></i></div>
              <div class="motiv-title">Data Tersedia Masif</div>
              <div class="motiv-desc">Internet menghasilkan miliaran titik data setiap hari. ML bisa memanfaatkan data ini untuk menemukan pola yang tidak terlihat manusia.</div>
            </div>
            <div class="motiv-card">
              <div class="motiv-icon"><i class="fas fa-arrows-rotate"></i></div>
              <div class="motiv-title">Lingkungan Dinamis</div>
              <div class="motiv-desc">Filter spam harus adaptif — spammer terus berubah taktik. Aturan statis tidak bisa mengikuti, tapi model ML bisa belajar terus.</div>
            </div>
            <div class="motiv-card">
              <div class="motiv-icon"><i class="fas fa-magnifying-glass"></i></div>
              <div class="motiv-title">Menemukan Pola Tersembunyi</div>
              <div class="motiv-desc">Pola dalam data genomik, perilaku finansial, atau cuaca — terlalu kompleks dan multidimensional untuk ditemukan secara manual.</div>
            </div>
          </div>
        </div>

      </section>

      <!-- ═══ SEC 2: PARADIGMA ═══ -->
      <section class="lesson-sec" id="sec-paradigma">
        <div class="sec-header">
          <span class="sec-num">02</span>
          <div>
            <h2 class="sec-title">Tiga Paradigma Utama ML</h2>
            <p class="sec-sub">Cara yang berbeda untuk belajar dari data, tergantung informasi apa yang tersedia</p>
          </div>
        </div>

        <div class="prose">
          ML bukan satu algoritma — melainkan keluarga besar pendekatan. Perbedaan paling mendasar ada di
          <strong>jenis sinyal pembelajaran</strong>: apakah kita punya jawaban benar? Apakah data sudah berlabel?
          Dari sini muncul tiga paradigma utama.
        </div>

        <div class="three-paradigms">
          <div class="para-card supervised">
            <div class="para-num">01</div>
            <div class="para-icon"><i class="fas fa-bullseye"></i></div>
            <div class="para-title">Supervised Learning</div>
            <div class="para-tagline">Belajar dari contoh berlabel</div>
            <div class="para-desc">
              Setiap data latih memiliki label yang diketahui. Model belajar memetakan
              input ke output yang benar.
            </div>
            <div class="para-signal">
              <span class="ps-label">Sinyal:</span>
              <span class="ps-val supervised">Label eksplisit y untuk setiap x</span>
            </div>
            <div class="para-examples">
              <div class="pe-row"><span class="pe-task">Klasifikasi email</span><span class="pe-label-ex">spam / bukan spam</span></div>
              <div class="pe-row"><span class="pe-task">Prediksi harga rumah</span><span class="pe-label-ex">nilai numerik Rp</span></div>
              <div class="pe-row"><span class="pe-task">Deteksi penyakit</span><span class="pe-label-ex">positif / negatif</span></div>
            </div>
          </div>

          <div class="para-card unsupervised">
            <div class="para-num">02</div>
            <div class="para-icon"><i class="fas fa-magnifying-glass"></i></div>
            <div class="para-title">Unsupervised Learning</div>
            <div class="para-tagline">Temukan struktur tanpa label</div>
            <div class="para-desc">
              Tidak ada label. Model harus menemukan sendiri pola, kelompok,
              atau struktur tersembunyi dalam data.
            </div>
            <div class="para-signal">
              <span class="ps-label">Sinyal:</span>
              <span class="ps-val unsupervised">Hanya data x, tanpa label y</span>
            </div>
            <div class="para-examples">
              <div class="pe-row"><span class="pe-task">Segmentasi pelanggan</span><span class="pe-label-ex">cluster otomatis</span></div>
              <div class="pe-row"><span class="pe-task">Kompresi data</span><span class="pe-label-ex">representasi ringkas</span></div>
              <div class="pe-row"><span class="pe-task">Anomali detection</span><span class="pe-label-ex">pola tidak biasa</span></div>
            </div>
          </div>

          <div class="para-card reinforcement">
            <div class="para-num">03</div>
            <div class="para-icon"><i class="fas fa-gamepad"></i></div>
            <div class="para-title">Reinforcement Learning</div>
            <div class="para-tagline">Belajar dari interaksi & reward</div>
            <div class="para-desc">
              Agen belajar dengan mencoba aksi dan menerima sinyal reward/penalti
              dari lingkungan. Tidak ada dataset statis.
            </div>
            <div class="para-signal">
              <span class="ps-label">Sinyal:</span>
              <span class="ps-val reinforcement">Reward r setelah aksi a di state s</span>
            </div>
            <div class="para-examples">
              <div class="pe-row"><span class="pe-task">AlphaGo / chess AI</span><span class="pe-label-ex">menang / kalah</span></div>
              <div class="pe-row"><span class="pe-task">Robot navigasi</span><span class="pe-label-ex">reach target</span></div>
              <div class="pe-row"><span class="pe-task">Rekomendasi konten</span><span class="pe-label-ex">klik / scroll</span></div>
            </div>
          </div>
        </div>

      </section>

      <!-- ═══ SEC 3: SUPERVISED ═══ -->
      <section class="lesson-sec" id="sec-supervised">
        <div class="sec-header">
          <span class="sec-num">03</span>
          <div>
            <h2 class="sec-title">Supervised Learning — Lebih Dalam</h2>
            <p class="sec-sub">Paradigma paling umum — fondasi sebagian besar aplikasi ML di industri</p>
          </div>
        </div>

        <div class="prose">
          Supervised learning adalah paradigma paling dominan di industri. Hampir semua model produksi —
          dari filter konten hingga sistem rekomendasi — dibangun di atasnya. Ada dua sub-tugas utama:
          <strong>klasifikasi</strong> dan <strong>regresi</strong>.
        </div>

        <div class="task-split">
          <div class="ts-col">
            <div class="ts-header">
              <span class="ts-icon"><i class="fas fa-tag"></i>️</span>
              <div>
                <div class="ts-title">Klasifikasi</div>
                <div class="ts-sub">Output diskrit</div>
              </div>
            </div>
            <div class="ts-formula">
              <span class="math-term blue">h</span>
              <span class="math-op">:</span>
              <span class="math-term">X</span>
              <span class="math-op">→</span>
              <span class="math-term purple">{C₁, C₂, …, Cₖ}</span>
            </div>
            <div class="ts-desc">Menetapkan kelas kategorikal ke setiap input. Bisa binary (2 kelas) atau multi-class (k kelas).</div>
            <div class="ts-examples">
              <div class="tse-item">Email → spam / ham</div>
              <div class="tse-item">Foto → anjing / kucing / burung</div>
              <div class="tse-item">Transaksi → fraud / normal</div>
            </div>
          </div>
          <div class="ts-divider"></div>
          <div class="ts-col">
            <div class="ts-header">
              <span class="ts-icon"><i class="fas fa-chart-line"></i></span>
              <div>
                <div class="ts-title">Regresi</div>
                <div class="ts-sub">Output kontinu</div>
              </div>
            </div>
            <div class="ts-formula">
              <span class="math-term blue">h</span>
              <span class="math-op">:</span>
              <span class="math-term">X</span>
              <span class="math-op">→</span>
              <span class="math-term green">ℝ</span>
            </div>
            <div class="ts-desc">Memprediksi nilai numerik kontinu. Perbedaannya dengan klasifikasi hanya pada tipe output.</div>
            <div class="ts-examples">
              <div class="tse-item">Fitur rumah → harga Rp</div>
              <div class="tse-item">Data cuaca → suhu besok °C</div>
              <div class="tse-item">Profil pengguna → revenue prediksi</div>
            </div>
          </div>
        </div>

        <div class="worked-box">
          <div class="wb-badge">⚙️ Bagaimana Supervised Learning Bekerja</div>
          <div class="wb-title">Pipeline Lengkap — 4 Langkah</div>
          <div class="pipeline-steps">
            <div class="ps-step">
              <div class="ps-circle">1</div>
              <div class="ps-content">
                <div class="ps-title">Kumpulkan Training Data</div>
                <div class="ps-desc">Dataset D = {(x⁽¹⁾, y⁽¹⁾), ..., (x⁽ᴺ⁾, y⁽ᴺ⁾)}. Setiap contoh adalah pasangan input-output. Kualitas dan kuantitas data sangat menentukan hasil.</div>
              </div>
            </div>
            <div class="ps-arrow">↓</div>
            <div class="ps-step">
              <div class="ps-circle">2</div>
              <div class="ps-content">
                <div class="ps-title">Pilih Model (Ruang Hipotesis H)</div>
                <div class="ps-desc">Tentukan keluarga fungsi yang akan dicari: linear, polynomial, decision tree, neural network. Pilihan ini disebut <em>induktif bias</em>.</div>
              </div>
            </div>
            <div class="ps-arrow">↓</div>
            <div class="ps-step">
              <div class="ps-circle">3</div>
              <div class="ps-content">
                <div class="ps-title">Training — Minimalkan Loss</div>
                <div class="ps-desc">Cari parameter θ yang meminimalkan fungsi loss L(θ) — ukuran kesalahan prediksi di atas training data. Biasanya via gradient descent.</div>
              </div>
            </div>
            <div class="ps-arrow">↓</div>
            <div class="ps-step">
              <div class="ps-circle">4</div>
              <div class="ps-content">
                <div class="ps-title">Evaluasi Generalisasi</div>
                <div class="ps-desc">Uji pada test set yang tidak pernah dilihat model. Tujuan bukan menghafal data latih — tapi bisa memprediksi data baru dengan akurat.</div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <!-- ═══ SEC 4: UNSUPERVISED ═══ -->
      <section class="lesson-sec" id="sec-unsupervised">
        <div class="sec-header">
          <span class="sec-num">04</span>
          <div>
            <h2 class="sec-title">Unsupervised Learning</h2>
            <p class="sec-sub">Menemukan struktur tersembunyi tanpa label</p>
          </div>
        </div>

        <div class="prose">
          Memberi label data itu mahal dan lambat. Untungnya, banyak hal berguna bisa dipelajari dari
          data yang <strong>tidak berlabel</strong> — menemukan kelompok alami, memampatkan representasi,
          atau mendeteksi anomali.
        </div>

        <div class="unsup-tasks">
          <div class="ut-card">
            <div class="ut-accent" style="background:#2997ff"></div>
            <div class="ut-icon"><i class="fas fa-bullseye"></i></div>
            <div class="ut-title">Clustering</div>
            <div class="ut-desc">Mengelompokkan data berdasarkan kemiripan tanpa label. <strong>K-Means</strong> mencari K cluster dengan meminimalkan jarak intra-cluster. <strong>DBSCAN</strong> menemukan cluster bentuk arbitrer berdasarkan density.</div>
            <div class="ut-algos">
              <span class="uta">K-Means</span>
              <span class="uta">DBSCAN</span>
              <span class="uta">Agglomerative</span>
              <span class="uta">GMM</span>
            </div>
          </div>
          <div class="ut-card">
            <div class="ut-accent" style="background:#a855f7"></div>
            <div class="ut-icon"><i class="fas fa-chart-line-down"></i></div>
            <div class="ut-title">Dimensionality Reduction</div>
            <div class="ut-desc">Meringkas data berdimensi tinggi ke representasi lebih padat tanpa kehilangan informasi penting. Berguna untuk visualisasi, kompresi, dan feature engineering sebelum supervised learning.</div>
            <div class="ut-algos">
              <span class="uta">PCA</span>
              <span class="uta">t-SNE</span>
              <span class="uta">Autoencoder</span>
              <span class="uta">UMAP</span>
            </div>
          </div>
          <div class="ut-card">
            <div class="ut-accent" style="background:#ff375f"></div>
            <div class="ut-icon"><i class="fas fa-triangle-exclamation"></i></div>
            <div class="ut-title">Anomaly Detection</div>
            <div class="ut-desc">Mengidentifikasi titik data yang menyimpang jauh dari pola normal. Tidak perlu label "anomali" — cukup pelajari distribusi data normal, lalu flagging yang tidak cocok.</div>
            <div class="ut-algos">
              <span class="uta">Isolation Forest</span>
              <span class="uta">Autoencoder</span>
              <span class="uta">LOF</span>
            </div>
          </div>
        </div>

      </section>

      <!-- ═══ SEC 5: REINFORCEMENT ═══ -->
      <section class="lesson-sec" id="sec-reinforcement">
        <div class="sec-header">
          <span class="sec-num">05</span>
          <div>
            <h2 class="sec-title">Reinforcement Learning</h2>
            <p class="sec-sub">Belajar dari konsekuensi aksi — seperti cara manusia belajar</p>
          </div>
        </div>

        <div class="prose">
          RL paling mirip dengan cara manusia belajar secara alami: mencoba sesuatu, melihat hasilnya,
          dan menyesuaikan perilaku. Tidak ada dataset statis — agen <strong>mengumpulkan pengalamannya sendiri</strong>
          melalui interaksi dengan lingkungan.
        </div>

        <!-- RL Loop -->
        <div class="rl-loop">
          <div class="rll-center">
            <div class="rll-agent">
              <div class="rll-icon"><i class="fas fa-robot"></i></div>
              <div class="rll-label">Agent</div>
            </div>
            <div class="rll-env">
              <div class="rll-icon"><i class="fas fa-globe"></i></div>
              <div class="rll-label">Environment</div>
            </div>
          </div>
          <div class="rll-arrows">
            <div class="rll-arrow top">
              <div class="rll-arrow-line"></div>
              <div class="rll-arrow-label">aksi <span class="math-term blue">a</span></div>
            </div>
            <div class="rll-arrow bottom">
              <div class="rll-arrow-line"></div>
              <div class="rll-arrow-label">state <span class="math-term green">s</span>, reward <span class="math-term purple">r</span></div>
            </div>
          </div>
        </div>

        <div class="rl-concepts">
          <div class="rlc-row">
            <div class="rlc-term">State <code>s</code></div>
            <div class="rlc-def">Representasi situasi lingkungan saat ini yang dilihat agen. Misalnya: posisi robot, posisi bidak catur, frame video game.</div>
          </div>
          <div class="rlc-row">
            <div class="rlc-term">Action <code>a</code></div>
            <div class="rlc-def">Pilihan yang bisa dilakukan agen di suatu state. Bisa diskrit (maju/mundur/kiri/kanan) atau kontinu (torsi motor 0–100%).</div>
          </div>
          <div class="rlc-row">
            <div class="rlc-term">Reward <code>r</code></div>
            <div class="rlc-def">Sinyal skalar dari lingkungan setelah agen melakukan aksi. Positif = bagus (menang, skor naik), negatif = buruk (jatuh, kalah). Ini <em>satu-satunya</em> sinyal pembelajaran.</div>
          </div>
          <div class="rlc-row">
            <div class="rlc-term">Policy <code>π</code></div>
            <div class="rlc-def">Strategi agen — fungsi yang memetakan state ke aksi: π(s) = a. Tujuan RL adalah menemukan policy optimal yang memaksimalkan cumulative reward.</div>
          </div>
        </div>

        <div class="insight-callout">
          <div class="ic-icon"><i class="fas fa-gamepad"></i></div>
          <div class="ic-body">
            <strong>AlphaGo Zero (DeepMind, 2017)</strong> — belajar bermain Go dari nol hanya dengan RL,
            tanpa data partai manusia sama sekali. Setelah 3 hari, ia mengalahkan AlphaGo versi sebelumnya
            (yang sudah mengalahkan juara dunia manusia) dengan skor 100-0.
          </div>
        </div>

      </section>

      <!-- ═══ SEC 6: KAPAN PAKAI ML ═══ -->
      <section class="lesson-sec" id="sec-kapan">
        <div class="sec-header">
          <span class="sec-num">06</span>
          <div>
            <h2 class="sec-title">Kapan Pakai ML — dan Kapan Tidak</h2>
            <p class="sec-sub">ML bukan solusi untuk semua masalah. Memilih dengan tepat sama pentingnya dengan kemampuan teknis.</p>
          </div>
        </div>

        <div class="prose">
          Salah satu skill paling berharga seorang ML practitioner adalah tahu kapan <em>tidak</em> menggunakan ML.
          ML butuh data, waktu, dan sumber daya — sering ada solusi lebih sederhana yang lebih baik.
        </div>

        <div class="when-grid">
          <div class="when-col use">
            <div class="when-header"><i class="fas fa-circle-check"></i> Gunakan ML</div>
            <div class="when-list">
              <div class="wl-item">
                <div class="wl-icon"><i class="fas fa-box"></i></div>
                <div class="wl-content">
                  <div class="wl-title">Aturan tidak bisa ditulis manual</div>
                  <div class="wl-desc">Pengenalan wajah, pemahaman bahasa natural — terlalu kompleks untuk di-hardcode.</div>
                </div>
              </div>
              <div class="wl-item">
                <div class="wl-icon"><i class="fas fa-chart-simple"></i></div>
                <div class="wl-content">
                  <div class="wl-title">Data latih tersedia banyak</div>
                  <div class="wl-desc">ML butuh data untuk belajar. Semakin banyak data berkualitas, semakin baik hasilnya.</div>
                </div>
              </div>
              <div class="wl-item">
                <div class="wl-icon"><i class="fas fa-bullseye"></i></div>
                <div class="wl-content">
                  <div class="wl-title">Performa bisa diukur</div>
                  <div class="wl-desc">Ada metrik jelas (accuracy, F1, RMSE) untuk menentukan apakah model cukup baik.</div>
                </div>
              </div>
              <div class="wl-item">
                <div class="wl-icon"><i class="fas fa-arrows-rotate"></i></div>
                <div class="wl-content">
                  <div class="wl-title">Pola bisa berubah seiring waktu</div>
                  <div class="wl-desc">Model bisa di-retrain dengan data baru, sedangkan aturan statis butuh update manual.</div>
                </div>
              </div>
            </div>
          </div>

          <div class="when-col avoid">
            <div class="when-header"><i class="fas fa-circle-xmark"></i> Jangan Pakai ML</div>
            <div class="when-list">
              <div class="wl-item">
                <div class="wl-icon"><i class="fas fa-clipboard"></i></div>
                <div class="wl-content">
                  <div class="wl-title">Aturan sudah jelas dan simpel</div>
                  <div class="wl-desc">if-else yang simpel lebih cepat, lebih mudah di-debug, dan lebih explainable dari model ML manapun.</div>
                </div>
              </div>
              <div class="wl-item">
                <div class="wl-icon"><i class="fas fa-file-lines"></i>️</div>
                <div class="wl-content">
                  <div class="wl-title">Data sangat sedikit</div>
                  <div class="wl-desc">Model ML butuh data yang cukup untuk generalisasi. Dengan data terlalu sedikit, hasil tidak bisa dipercaya.</div>
                </div>
              </div>
              <div class="wl-item">
                <div class="wl-icon"><i class="fas fa-scale-balanced"></i></div>
                <div class="wl-content">
                  <div class="wl-title">Interpretabilitas kritis</div>
                  <div class="wl-desc">Sistem hukum, medis, keuangan sering butuh penjelasan tiap keputusan — "black box" tidak bisa diterima.</div>
                </div>
              </div>
              <div class="wl-item">
                <div class="wl-icon"><i class="fas fa-sack-dollar"></i></div>
                <div class="wl-content">
                  <div class="wl-title">Biaya lebih besar dari manfaat</div>
                  <div class="wl-desc">Mengumpulkan data, training, deployment, monitoring — semua berbiaya. Pastikan ROI-nya worth it.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Next lesson CTA -->
        <div class="next-lesson-cta">
          <div class="nlc-inner">
            <span class="nlc-label">Lesson berikutnya</span>
            <h3 class="nlc-title">Hipotesis & Model →</h3>
            <p class="nlc-desc">Sekarang kamu tahu APA itu ML — saatnya pelajari bahasa matematisnya. Apa itu hipotesis, ruang hipotesis H, dan bagaimana model diparameterisasi.</p>
            <a href="#/participant-ai-lab-ml-hypothesis" class="nlc-btn">Lanjut ke Hipotesis & Model</a>
          </div>
        </div>

      </section>

    </div><!-- /lesson-body -->
  </main>
</div><!-- /lesson-layout -->

</article>
<footer class="lesson-nav-footer">
<a href="#/participant-ai-lab-ml"><i class="fas fa-chevron-left"></i> Kembali ke Katalog</a>
<a href="#/participant-ai-lab-ml-hypothesis">Selanjutnya <i class="fas fa-arrow-right"></i></a>
</footer>
</section>
</div>
<aside class="lesson-right-panel">
<section class="module-side-card lesson-progress-card">
<h2>Progres Materi</h2>
<div class="lesson-progress-mini"><b style="--value:0%"></b><strong>0%</strong></div>
<p>Pengantar Machine Learning</p>
<a href="#/participant-ai-lab-ml">Kembali ke Katalog</a>
</section>
<section class="module-side-card lesson-list-card">
<h2>Daftar Section</h2>
<ol>
<li class="active"><span>1</span><a href="#sec-definisi">Apa itu ML?</a><i class="far fa-circle-play"></i></li>
<li><span>2</span><a href="#sec-paradigma">Tiga Paradigma</a><i class="far fa-circle"></i></li>
<li><span>3</span><a href="#sec-supervised">Supervised Learning</a><i class="far fa-circle"></i></li>
<li><span>4</span><a href="#sec-unsupervised">Unsupervised Learning</a><i class="far fa-circle"></i></li>
<li><span>5</span><a href="#sec-reinforcement">Reinforcement Learning</a><i class="far fa-circle"></i></li>
<li><span>6</span><a href="#sec-kapan">Kapan Pakai ML?</a><i class="far fa-circle"></i></li>
</ol>
</section>
</aside>
</div>
</main>
</section>

````
