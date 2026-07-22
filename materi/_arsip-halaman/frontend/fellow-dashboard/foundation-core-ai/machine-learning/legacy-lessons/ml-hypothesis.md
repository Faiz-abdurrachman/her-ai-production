# Vektor Fitur & Ruang Input

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/legacy-lessons/ml-hypothesis.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

01

#### Vektor Fitur & Ruang Input

Bagaimana ML merepresentasikan "dunia" sebagai angka

Sebelum algoritma apapun bisa belajar, data harus direpresentasikan dalam bentuk yang bisa diproses secara matematis. ML merepresentasikan setiap **contoh latih** sebagai sebuah **vektor fitur** — titik dalam ruang berdimensi tinggi.

Definisi · Contoh Latih (Training Example)

x = (x₁, x₂, …, xₙ)ᵀ ∈ ℝⁿ

dimana n = jumlah fitur (dimensi), setiap xᵢ adalah nilai fitur ke-i

Semua contoh membentuk sebuah **ruang input** (input space) atau **ruang contoh** (instance space) X. Setiap titik dalam X merepresentasikan satu kemungkinan contoh.

** Contoh Konkret · Fitur = Angka

Dari Objek Nyata ke Vektor Fitur

** Rumah

** Email

** Pasien

**

Rumah di Jakarta Selatan

Luas bangunan120 m²

Jumlah kamar3

Jarak ke pusat kota8.5 km

Usia bangunan12 tahun

Ada garasi?Ya (1)

encode

x ∈ ℝ⁵

x₁luas120.0

x₂kamar3.0

x₃jarak8.5

x₄usia12.0

x₅garasi1.0

Target y = Rp 2.4 M (regresi)

**

Email masuk

Jumlah kata "gratis"5

Jumlah tanda seru8

Pengirim dikenal?Tidak (0)

Ada link?Ya (1)

Panjang subjek42 karakter

encode

x ∈ ℝ⁵

x₁kata gratis5.0

x₂tanda !8.0

x₃dikenal0.0

x₄ada link1.0

x₅pjg subjek42.0

Target y = SPAM (1) (klasifikasi)

**

Data pasien

Usia54 tahun

Tekanan darah145 mmHg

Kolesterol240 mg/dL

Merokok?Ya (1)

BMI28.4

encode

x ∈ ℝ⁵

x₁usia54.0

x₂tekanan145.0

x₃kolesterol240.0

x₄rokok1.0

x₅BMI28.4

Target y = Risiko Tinggi (1) (klasifikasi)

**

**Asumsi IID:** Semua algoritma ML mengasumsikan bahwa data latih diambil secara **i.i.d.** (independent and identically distributed) — setiap contoh diambil secara independen dari distribusi yang sama P(x, y). Ini berarti urutan data tidak penting, dan tidak ada dependensi antar contoh.

** Visualisasi · Ruang Input 2 Dimensi

X = ℝ² — Setiap titik adalah satu contoh

● Kelas positif (y = 1) ● Kelas negatif (y = 0) Sumbu = fitur x₁ dan x₂

02

#### Hipotesis h: X → Y

Fungsi yang diinduksi dari data — ini yang dicari oleh algoritma ML

Tugas algoritma ML adalah menginduksi sebuah **hipotesis** — fungsi h yang memetakan setiap input x ke output ŷ. Hipotesis adalah "model terlatih" kita. Untuk klasifikasi biner, hipotesis memetakan ke {0, 1}.

Definisi · Hipotesis (Klasifikasi Biner)

h : X → {0, 1}

`h(x) = 1`→ x diprediksi masuk kelas C (positif)

`h(x) = 0`→ x diprediksi tidak masuk kelas C (negatif)

Hipotesis Konsisten

Hipotesis h **konsisten** dengan contoh latih (x, y) jika `h(x) = y`.

Konsisten dengan semua data D:

Consistent(h, D) ⟺ ∀(x,y) ∈ D: h(x) = y

Empirical Error E(h|D)

Fraksi contoh latih yang salah diklasifikasikan:

E(h|D) = (1/N) · Σᵢ 𝟙[h(x⁽ⁱ⁾) ≠ y⁽ⁱ⁾]

Hipotesis konsisten ⟺ E(h|D) = 0

**️ Interactive · Error Hipotesis

Visualisasi: Hipotesis Linear di Ruang 2D

FP: 0

FN: 0

E(h|D): 0%

Putar garis pemisah:

90°

Geser garis:

Coba temukan garis yang memisahkan ● dan ● sempurna (E = 0%).

**

**False Positives vs False Negatives:** Contoh yang diprediksi **positif tapi sebenarnya negatif** = *False Positive (FP)*. Contoh yang diprediksi **negatif tapi sebenarnya positif** = *False Negative (FN)*. Dalam domain seperti deteksi kanker, FN jauh lebih berbahaya dari FP.

03

#### Model & Ruang Hipotesis H

Bukan satu fungsi — tapi seluruh keluarga fungsi yang mungkin

Hipotesis tidak diciptakan dari nol. Kita *memilih* dari kumpulan fungsi yang telah ditentukan sebelumnya. Kumpulan ini disebut **model** atau **ruang hipotesis H**. Pilihan H adalah keputusan desain terpenting dalam ML — ini adalah bentuk "pengetahuan awal" kita tentang masalah.

Definisi · Model (Ruang Hipotesis)

H = { h | h : X → Y }

Kumpulan semua hipotesis yang mungkin — algoritma mencari h\* ∈ H yang terbaik

Pilihan Model H yang Berbeda untuk Ruang 2D

Model Linear

H = garis lurus (hyperplane)

Kapasitas Rendah

Model Persegi Panjang

H = persegi panjang axis-aligned

Kapasitas Sedang

Model Lingkaran

H = lingkaran dengan radius r

Kapasitas Sedang

Model Polinomial

H = kurva derajat tinggi

Kapasitas Tinggi

**

**Kapasitas Model:** Semakin besar H, semakin banyak fungsi yang bisa direpresentasikan, semakin tinggi kapasitas model. Model dengan kapasitas terlalu rendah → *underfitting*. Terlalu tinggi → *overfitting*. Memilih H yang tepat adalah inti dari ML.

**️

Model H

Keluarga / kelas fungsi

Contoh: "semua garis lurus di ℝ²"
 Tidak punya nilai parameter spesifik.
 Dipilih sebelum training.

H = { h(x|θ) | θ ∈ Θ }

≠

**

Hipotesis h

Satu fungsi konkret

Contoh: "garis y = 2x₁ − 3x₂ + 1"
 Parameter θ sudah ditetapkan.
 Hasil setelah training.

h = h(x|θ\*) untuk θ\* spesifik

04

#### Parametrisasi Model

Cara praktis mendefinisikan H — melalui parameter θ

Mendefinisikan H sebagai "himpunan semua fungsi" terlalu abstrak untuk implementasi. Dalam praktik, kita merepresentasikan model sebagai **fungsi yang diparameterisasi**: `h(x|θ)`. Training ML = mencari θ\* yang optimal.

Definisi · Model Terparameterisasi

H = { h(·|θ) | θ ∈ Θ }

θ = vektor parameter, Θ = ruang parameter (semua nilai θ yang mungkin)

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Model H
Hipotesis h(x|θ)
Parameter θ
Jumlah Param</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Regresi Linear
<code>h(x) = θᵀx + θ₀</code>
<code>θ ∈ ℝⁿ, θ₀ ∈ ℝ</code>
n + 1</td>
<td align="left">Persegi Panjang (ℝ²)
<code>h(x) = 𝟙[θ_x1 ≤ x₁ ≤ θ_x2 ∧ θ_y1 ≤ x₂ ≤ θ_y2]</code>
<code>θ = (θ_x1, θ_x2, θ_y1, θ_y2)</code>
4</td>
<td align="left">Lingkaran (ℝ²)
<code>h(x) = 𝟙[x₁² + x₂² ≤ θ]</code>
<code>θ ∈ ℝ (radius²)</code>
1</td>
<td align="left">MLP (1 hidden layer)
<code>h(x) = σ(W₂·σ(W₁x + b₁) + b₂)</code>
<code>W₁, b₁, W₂, b₂</code>
n·h + h·k + h + k</td>
</tr>
</tbody>
</table>

⚙️ Training = Optimisasi

Tiga Komponen Algoritma ML

1

Model H = { h(·|θ) }

Keluarga fungsi yang diparameterisasi. Menentukan bentuk solusi yang bisa ditemukan.

Contoh: H = semua garis lurus → θ = (w, b)

→

2

Loss Function L(θ|D)

Mengukur seberapa besar kesalahan prediksi model pada data latih D.

Contoh: L = MSE = (1/N)Σ(h(xᵢ) − yᵢ)²

→

3

Optimisasi: θ\* = argmin L

Cari parameter θ\* yang meminimalkan loss. Gradient descent, closed-form solution, dll.

Hasil: hipotesis h\* = h(·|θ\*)

**

Ketiga pilihan ini — model, loss, optimisasi — sepenuhnya menentukan **induktif bias** algoritma. Dua algoritma dengan model yang sama tapi loss berbeda akan menghasilkan hipotesis yang berbeda.

05

#### Ruang Inaˇcica (Version Space)

Semua hipotesis yang konsisten dengan data — tidak hanya satu!

Satu set data latih D biasanya tidak cukup untuk menentukan *satu* hipotesis unik. Ada banyak (bahkan tak terhingga) hipotesis dalam H yang konsisten dengan D. Kumpulan semua hipotesis konsisten tersebut disebut **Ruang Inaˇcica** (Version Space).

Definisi · Ruang Inaˇcica (Version Space)

VS<sub>H,D</sub> = { h ∈ H | Consistent(h, D) }

Himpunan semua hipotesis di H yang konsisten (tidak ada error) pada training data D

** Visualisasi · Ruang Inaˇcica

Model persegi panjang — banyak hipotesis konsisten

Positif (y=1)

Negatif (y=0)

Hipotesis spesifik (S) — terkecil

Hipotesis umum (G) — terbesar

Version Space — semua di antara S dan G

**Boundary S (paling spesifik):** persegi panjang terkecil yang masih mencakup semua titik positif.
 **Boundary G (paling umum):** persegi panjang terbesar yang tidak mencakup titik negatif manapun.
 **Version Space:** semua persegi panjang antara S dan G — semuanya konsisten dengan D.

Fakta bahwa version space sangat besar adalah alasan mengapa kita butuh **induktif bias** — asumsi tambahan untuk memilih satu hipotesis dari sekian banyak yang konsisten.

**

**Active Learning:** Strategi optimal untuk memperkecil version space adalah memilih contoh x yang membagi version space menjadi dua bagian sama besar — yaitu contoh yang diklasifikasikan berbeda oleh setengah hipotesis dalam VS. Dengan strategi ini, dibutuhkan hanya O(log|VS|) pertanyaan untuk menentukan hipotesis benar.

06

#### Induktif Bias

Asumsi yang memungkinkan generalisasi — tanpanya, ML tidak mungkin

Ini adalah konsep paling fundamental — dan paling sering diabaikan — dalam ML. Pembelajaran tanpa asumsi tambahan adalah *mustahil*. Fakta ini diformalisasikan dalam **No Free Lunch Theorem**.

**️

No Free Lunch Theorem

Tidak ada algoritma ML yang secara universal lebih baik dari algoritma lain untuk *semua* masalah. Jika satu algoritma unggul di satu kelas masalah, pasti ada kelas masalah lain di mana ia lebih buruk. Setiap keunggulan datang dari asumsi (induktif bias) yang sesuai dengan masalah spesifik.

1

Bias Pembatasan

(Restriction / Language Bias)

Membatasi ruang hipotesis H — hanya fungsi dari keluarga tertentu yang dipertimbangkan.

Contoh:

H = hanya garis lurus → tidak bisa belajar XOR

H = hanya pohon keputusan dengan max depth 5

H = hanya fungsi yang mulus (smooth)

✓ Lebih mudah dioptimalkan ✗ Mungkin tidak cukup ekspresif

2

Bias Preferensi

(Preference / Search Bias)

H tidak dibatasi, tapi ada preferensi — hipotesis tertentu diutamakan atas yang lain.

Contoh:

Pilih hipotesis paling sederhana (Occam's Razor)

Pilih hipotesis dengan margin terbesar (SVM)

Pilih hipotesis dengan probabilitas posterior tertinggi (Bayes)

✓ Lebih fleksibel ✗ Harder to optimize (search over all H)

**

**Occam's Razor dalam ML:** Di antara semua hipotesis yang sama-sama konsisten dengan data, pilihlah yang *paling sederhana*. Ini bukan hanya prinsip estetis — model lebih sederhana punya lebih sedikit parameter, lebih sulit overfit, dan lebih mudah diinterpretasi. Formalisasi matematisnya adalah **Minimum Description Length (MDL)**.

**️ Peta Konsep · Hubungan Semua Konsep

Dari Data ke Hipotesis — Alur Lengkap

**

Data D

{ (x⁽ⁱ⁾, y⁽ⁱ⁾) }ᴺ

+

**️

Model H

{ h(·|θ) }

+

**

Induktif Bias

Preferensi / Pembatasan

⟹

**

Hipotesis h\*

h(·|θ\*) optimal

Lesson berikutnya

##### VC-Dimension →

Sekarang kamu tahu apa itu Model H dan Hipotesis h. Pertanyaan selanjutnya: berapa kapasitas model? VC-Dimension memberikan jawaban formal — dan menentukan apakah model bisa generalisasi.

[Lanjut ke VC-Dimension](#/participant-ai-lab-ml-vc-dim)

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
<div class="invite-card course-help-mini"><div><strong>Butuh bantuan?</strong><p>Tanya HerAI Assistant.</p></div><button type="button">Chat Sekarang</button></div>
</aside>
<main class="fellow-main">
<header class="lesson-topbar">
<nav class="lesson-breadcrumb" aria-label="Breadcrumb materi">
<a href="#/participant-ai-lab-ml"><i class="fas fa-arrow-left"></i><span>Machine Learning</span></a>
<span class="lesson-breadcrumb-separator"><i class="fas fa-arrow-right"></i></span>
<span>Hipotesis &amp; Model</span>
</nav>
<div class="fellow-actions">
<label class="fellow-search"><i class="fas fa-magnifying-glass"></i><input type="search" placeholder="Cari..."></label>
<button type="button" class="fellow-icon-button" aria-label="Notifikasi"><i class="far fa-bell"></i><span>5</span></button>
<a href="#/participant-profile" class="fellow-user-button"><span class="avatar-img"></span><span><strong>Aisyah Putri</strong><small>Peserta</small></span><i class="fas fa-chevron-down"></i></a>
</div>
</header>
<div class="lesson-layout">
<div class="lesson-main-content">
<section class="lesson-hero compact">
<div class="lesson-hero-copy">
<h1>Hipotesis, Model &amp; Ruang Fitur</h1>
<p>Mendefinisikan contoh latih sebagai vektor fitur x ∈ ℝⁿ. Dari ruang hipotesis ke pemilihan model terbaik.</p>
<div class="lesson-meta-row">
<span><i class="far fa-clock"></i> 50 menit</span>
<span><i class="fas fa-layer-group"></i> ML · Pengantar ML</span>
<b><i class="fas fa-chart-simple"></i> Matematis</b>
</div>
</div>
<img src="/assets/messaging/herai-chat-persona.png" alt="HerAI ML Hypothesis">
</section>
<section class="lesson-material-panel">
<div class="lesson-tabs" role="tablist" aria-label="Jenis materi">
<a href="#/participant-ai-lab-ml-hypothesis" class="active"><i class="fas fa-book-open"></i> Materi</a>
<a href="#/participant-ai-lab-ml"><i class="fas fa-layer-group"></i> Katalog ML</a>
</div>
<article class="lesson-article ai-lab-content" id="mlhypothesis-content">


      <!-- ═══ SEC 1: VEKTOR FITUR ═══ -->
      <section class="lesson-sec" id="sec-vektor">
        <div class="sec-header">
          <span class="sec-num">01</span>
          <div>
            <h2 class="sec-title">Vektor Fitur & Ruang Input</h2>
            <p class="sec-sub">Bagaimana ML merepresentasikan "dunia" sebagai angka</p>
          </div>
        </div>

        <div class="prose">
          Sebelum algoritma apapun bisa belajar, data harus direpresentasikan dalam bentuk yang bisa diproses secara matematis.
          ML merepresentasikan setiap <strong>contoh latih</strong> sebagai sebuah <strong>vektor fitur</strong> — titik dalam ruang berdimensi tinggi.
        </div>

        <div class="def-box">
          <div class="def-label">Definisi · Contoh Latih (Training Example)</div>
          <div class="def-eq">
            <span class="math-term blue">x</span>
            <span class="math-op">=</span>
            <span class="math-term">(x₁, x₂, …, xₙ)ᵀ</span>
            <span class="math-op">∈</span>
            <span class="math-term green">ℝⁿ</span>
          </div>
          <div class="def-note">dimana n = jumlah fitur (dimensi), setiap xᵢ adalah nilai fitur ke-i</div>
        </div>

        <div class="prose">
          Semua contoh membentuk sebuah <strong>ruang input</strong> (input space) atau <strong>ruang contoh</strong> (instance space) X.
          Setiap titik dalam X merepresentasikan satu kemungkinan contoh.
        </div>

        <!-- Interactive feature vector demo -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-bullseye"></i> Contoh Konkret · Fitur = Angka</div>
          <div class="wb-title">Dari Objek Nyata ke Vektor Fitur</div>

          <div class="fv-demo">
            <div class="fv-tabs">
              <button class="fv-tab active" onclick="switchDemo('rumah')"><i class="fas fa-circle"></i> Rumah</button>
              <button class="fv-tab" onclick="switchDemo('email')"><i class="fas fa-circle"></i> Email</button>
              <button class="fv-tab" onclick="switchDemo('pasien')"><i class="fas fa-circle"></i> Pasien</button>
            </div>

            <div class="fv-content" id="demo-rumah">
              <div class="fv-split">
                <div class="fv-left">
                  <div class="fv-object"><i class="fas fa-circle"></i></div>
                  <div class="fv-object-label">Rumah di Jakarta Selatan</div>
                  <div class="fv-attrs">
                    <div class="fv-attr"><span class="fva-key">Luas bangunan</span><span class="fva-val">120 m²</span></div>
                    <div class="fv-attr"><span class="fva-key">Jumlah kamar</span><span class="fva-val">3</span></div>
                    <div class="fv-attr"><span class="fva-key">Jarak ke pusat kota</span><span class="fva-val">8.5 km</span></div>
                    <div class="fv-attr"><span class="fva-key">Usia bangunan</span><span class="fva-val">12 tahun</span></div>
                    <div class="fv-attr"><span class="fva-key">Ada garasi?</span><span class="fva-val">Ya (1)</span></div>
                  </div>
                </div>
                <div class="fv-arrow-col">
                  <div class="fv-transform-label">encode</div>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8 16h16M18 10l6 6-6 6" stroke="#2997ff" stroke-width="2" stroke-linecap="round"/></svg>
                </div>
                <div class="fv-right">
                  <div class="fv-vector-label">x ∈ ℝ⁵</div>
                  <div class="fv-vector">
                    <div class="fv-vec-row"><span class="fvr-idx">x₁</span><span class="fvr-name">luas</span><span class="fvr-val blue">120.0</span><div class="fvr-bar" style="width:60%"></div></div>
                    <div class="fv-vec-row"><span class="fvr-idx">x₂</span><span class="fvr-name">kamar</span><span class="fvr-val blue">3.0</span><div class="fvr-bar" style="width:30%"></div></div>
                    <div class="fv-vec-row"><span class="fvr-idx">x₃</span><span class="fvr-name">jarak</span><span class="fvr-val blue">8.5</span><div class="fvr-bar" style="width:42%"></div></div>
                    <div class="fv-vec-row"><span class="fvr-idx">x₄</span><span class="fvr-name">usia</span><span class="fvr-val blue">12.0</span><div class="fvr-bar" style="width:24%"></div></div>
                    <div class="fv-vec-row"><span class="fvr-idx">x₅</span><span class="fvr-name">garasi</span><span class="fvr-val green">1.0</span><div class="fvr-bar green-bar" style="width:100%"></div></div>
                  </div>
                  <div class="fv-target">
                    <span class="fvt-label">Target y =</span>
                    <span class="fvt-val">Rp 2.4 M</span>
                    <span class="fvt-type">(regresi)</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="fv-content hidden" id="demo-email">
              <div class="fv-split">
                <div class="fv-left">
                  <div class="fv-object"><i class="fas fa-circle"></i></div>
                  <div class="fv-object-label">Email masuk</div>
                  <div class="fv-attrs">
                    <div class="fv-attr"><span class="fva-key">Jumlah kata "gratis"</span><span class="fva-val">5</span></div>
                    <div class="fv-attr"><span class="fva-key">Jumlah tanda seru</span><span class="fva-val">8</span></div>
                    <div class="fv-attr"><span class="fva-key">Pengirim dikenal?</span><span class="fva-val">Tidak (0)</span></div>
                    <div class="fv-attr"><span class="fva-key">Ada link?</span><span class="fva-val">Ya (1)</span></div>
                    <div class="fv-attr"><span class="fva-key">Panjang subjek</span><span class="fva-val">42 karakter</span></div>
                  </div>
                </div>
                <div class="fv-arrow-col">
                  <div class="fv-transform-label">encode</div>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8 16h16M18 10l6 6-6 6" stroke="#2997ff" stroke-width="2" stroke-linecap="round"/></svg>
                </div>
                <div class="fv-right">
                  <div class="fv-vector-label">x ∈ ℝ⁵</div>
                  <div class="fv-vector">
                    <div class="fv-vec-row"><span class="fvr-idx">x₁</span><span class="fvr-name">kata gratis</span><span class="fvr-val red">5.0</span><div class="fvr-bar red-bar" style="width:50%"></div></div>
                    <div class="fv-vec-row"><span class="fvr-idx">x₂</span><span class="fvr-name">tanda !</span><span class="fvr-val red">8.0</span><div class="fvr-bar red-bar" style="width:80%"></div></div>
                    <div class="fv-vec-row"><span class="fvr-idx">x₃</span><span class="fvr-name">dikenal</span><span class="fvr-val purple">0.0</span><div class="fvr-bar" style="width:0%"></div></div>
                    <div class="fv-vec-row"><span class="fvr-idx">x₄</span><span class="fvr-name">ada link</span><span class="fvr-val red">1.0</span><div class="fvr-bar red-bar" style="width:100%"></div></div>
                    <div class="fv-vec-row"><span class="fvr-idx">x₅</span><span class="fvr-name">pjg subjek</span><span class="fvr-val blue">42.0</span><div class="fvr-bar" style="width:42%"></div></div>
                  </div>
                  <div class="fv-target spam">
                    <span class="fvt-label">Target y =</span>
                    <span class="fvt-val">SPAM (1)</span>
                    <span class="fvt-type">(klasifikasi)</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="fv-content hidden" id="demo-pasien">
              <div class="fv-split">
                <div class="fv-left">
                  <div class="fv-object"><i class="fas fa-circle"></i></div>
                  <div class="fv-object-label">Data pasien</div>
                  <div class="fv-attrs">
                    <div class="fv-attr"><span class="fva-key">Usia</span><span class="fva-val">54 tahun</span></div>
                    <div class="fv-attr"><span class="fva-key">Tekanan darah</span><span class="fva-val">145 mmHg</span></div>
                    <div class="fv-attr"><span class="fva-key">Kolesterol</span><span class="fva-val">240 mg/dL</span></div>
                    <div class="fv-attr"><span class="fva-key">Merokok?</span><span class="fva-val">Ya (1)</span></div>
                    <div class="fv-attr"><span class="fva-key">BMI</span><span class="fva-val">28.4</span></div>
                  </div>
                </div>
                <div class="fv-arrow-col">
                  <div class="fv-transform-label">encode</div>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8 16h16M18 10l6 6-6 6" stroke="#2997ff" stroke-width="2" stroke-linecap="round"/></svg>
                </div>
                <div class="fv-right">
                  <div class="fv-vector-label">x ∈ ℝ⁵</div>
                  <div class="fv-vector">
                    <div class="fv-vec-row"><span class="fvr-idx">x₁</span><span class="fvr-name">usia</span><span class="fvr-val blue">54.0</span><div class="fvr-bar" style="width:54%"></div></div>
                    <div class="fv-vec-row"><span class="fvr-idx">x₂</span><span class="fvr-name">tekanan</span><span class="fvr-val red">145.0</span><div class="fvr-bar red-bar" style="width:72%"></div></div>
                    <div class="fv-vec-row"><span class="fvr-idx">x₃</span><span class="fvr-name">kolesterol</span><span class="fvr-val red">240.0</span><div class="fvr-bar red-bar" style="width:80%"></div></div>
                    <div class="fv-vec-row"><span class="fvr-idx">x₄</span><span class="fvr-name">rokok</span><span class="fvr-val red">1.0</span><div class="fvr-bar red-bar" style="width:100%"></div></div>
                    <div class="fv-vec-row"><span class="fvr-idx">x₅</span><span class="fvr-name">BMI</span><span class="fvr-val blue">28.4</span><div class="fvr-bar" style="width:47%"></div></div>
                  </div>
                  <div class="fv-target danger">
                    <span class="fvt-label">Target y =</span>
                    <span class="fvt-val">Risiko Tinggi (1)</span>
                    <span class="fvt-type">(klasifikasi)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="insight-callout">
          <div class="ic-icon"><i class="fas fa-lightbulb"></i></div>
          <div class="ic-body">
            <strong>Asumsi IID:</strong> Semua algoritma ML mengasumsikan bahwa data latih diambil secara <strong>i.i.d.</strong> (independent and identically distributed) — setiap contoh diambil secara independen dari distribusi yang sama P(x, y). Ini berarti urutan data tidak penting, dan tidak ada dependensi antar contoh.
          </div>
        </div>

        <!-- 2D input space visualization -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-chart-simple"></i> Visualisasi · Ruang Input 2 Dimensi</div>
          <div class="wb-title">X = ℝ² — Setiap titik adalah satu contoh</div>
          <div class="canvas-wrap">
            <canvas id="inputSpaceCanvas" width="560" height="340"></canvas>
          </div>
          <div class="canvas-legend">
            <span class="cl-item pos">● Kelas positif (y = 1)</span>
            <span class="cl-item neg">● Kelas negatif (y = 0)</span>
            <span class="cl-item">Sumbu = fitur x₁ dan x₂</span>
          </div>
        </div>

      </section>

      <!-- ═══ SEC 2: HIPOTESIS ═══ -->
      <section class="lesson-sec" id="sec-hipotesis">
        <div class="sec-header">
          <span class="sec-num">02</span>
          <div>
            <h2 class="sec-title">Hipotesis h: X → Y</h2>
            <p class="sec-sub">Fungsi yang diinduksi dari data — ini yang dicari oleh algoritma ML</p>
          </div>
        </div>

        <div class="prose">
          Tugas algoritma ML adalah menginduksi sebuah <strong>hipotesis</strong> — fungsi h yang memetakan setiap
          input x ke output ŷ. Hipotesis adalah "model terlatih" kita.
          Untuk klasifikasi biner, hipotesis memetakan ke {0, 1}.
        </div>

        <div class="def-box">
          <div class="def-label">Definisi · Hipotesis (Klasifikasi Biner)</div>
          <div class="def-eq">
            <span class="math-term blue">h</span>
            <span class="math-op">:</span>
            <span class="math-term">X</span>
            <span class="math-op">→</span>
            <span class="math-term purple">{0, 1}</span>
          </div>
          <div class="def-note-grid">
            <div class="dng-row"><code>h(x) = 1</code><span>→ x diprediksi masuk kelas C (positif)</span></div>
            <div class="dng-row"><code>h(x) = 0</code><span>→ x diprediksi tidak masuk kelas C (negatif)</span></div>
          </div>
        </div>

        <div class="two-defs">
          <div class="tdef-card">
            <div class="tdef-title">Hipotesis Konsisten</div>
            <div class="tdef-body">
              <p>Hipotesis h <strong>konsisten</strong> dengan contoh latih (x, y) jika <code>h(x) = y</code>.</p>
              <p>Konsisten dengan semua data D:</p>
              <div class="tdef-formula">
                Consistent(h, D) ⟺ ∀(x,y) ∈ D: h(x) = y
              </div>
            </div>
          </div>
          <div class="tdef-card">
            <div class="tdef-title">Empirical Error E(h|D)</div>
            <div class="tdef-body">
              <p>Fraksi contoh latih yang salah diklasifikasikan:</p>
              <div class="tdef-formula">
                E(h|D) = (1/N) · Σᵢ 𝟙[h(x⁽ⁱ⁾) ≠ y⁽ⁱ⁾]
              </div>
              <p>Hipotesis konsisten ⟺ E(h|D) = 0</p>
            </div>
          </div>
        </div>

        <!-- Interactive: drag points, see hypothesis change -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-circle"></i>️ Interactive · Error Hipotesis</div>
          <div class="wb-title">Visualisasi: Hipotesis Linear di Ruang 2D</div>
          <div class="hypo-demo">
            <div class="hypo-canvas-wrap">
              <canvas id="hypothesisCanvas" width="500" height="340"></canvas>
              <div class="hypo-overlay">
                <div class="hypo-stat">
                  FP: <span id="fpCount" class="stat-red">0</span>
                </div>
                <div class="hypo-stat">
                  FN: <span id="fnCount" class="stat-orange">0</span>
                </div>
                <div class="hypo-stat">
                  E(h|D): <span id="errorRate" class="stat-val">0%</span>
                </div>
              </div>
            </div>
            <div class="hypo-controls">
              <div class="hc-label">Putar garis pemisah:</div>
              <input type="range" id="slAngle" min="0" max="180" value="90">
              <div class="hc-val" id="angleVal">90°</div>
              <div class="hc-label" style="margin-top:12px">Geser garis:</div>
              <input type="range" id="slOffset" min="-120" max="120" value="0">
              <div class="hc-desc">
                Coba temukan garis yang memisahkan ● dan ● sempurna (E = 0%).
              </div>
            </div>
          </div>
        </div>

        <div class="insight-callout">
          <div class="ic-icon"><i class="fas fa-triangle-exclamation"></i></div>
          <div class="ic-body">
            <strong>False Positives vs False Negatives:</strong>
            Contoh yang diprediksi <strong>positif tapi sebenarnya negatif</strong> = <em>False Positive (FP)</em>.
            Contoh yang diprediksi <strong>negatif tapi sebenarnya positif</strong> = <em>False Negative (FN)</em>.
            Dalam domain seperti deteksi kanker, FN jauh lebih berbahaya dari FP.
          </div>
        </div>

      </section>

      <!-- ═══ SEC 3: MODEL ═══ -->
      <section class="lesson-sec" id="sec-model">
        <div class="sec-header">
          <span class="sec-num">03</span>
          <div>
            <h2 class="sec-title">Model & Ruang Hipotesis H</h2>
            <p class="sec-sub">Bukan satu fungsi — tapi seluruh keluarga fungsi yang mungkin</p>
          </div>
        </div>

        <div class="prose">
          Hipotesis tidak diciptakan dari nol. Kita <em>memilih</em> dari kumpulan fungsi yang telah ditentukan sebelumnya.
          Kumpulan ini disebut <strong>model</strong> atau <strong>ruang hipotesis H</strong>.
          Pilihan H adalah keputusan desain terpenting dalam ML — ini adalah bentuk "pengetahuan awal" kita tentang masalah.
        </div>

        <div class="def-box accent-purple">
          <div class="def-label">Definisi · Model (Ruang Hipotesis)</div>
          <div class="def-eq">
            <span class="math-term purple">H</span>
            <span class="math-op">=</span>
            <span class="math-term">{ h | h : X → Y }</span>
          </div>
          <div class="def-note">Kumpulan semua hipotesis yang mungkin — algoritma mencari h* ∈ H yang terbaik</div>
        </div>

        <!-- Model zoo — different H choices -->
        <div class="model-zoo">
          <div class="mz-title">Pilihan Model H yang Berbeda untuk Ruang 2D</div>
          <div class="mz-grid">

            <div class="mz-card" onclick="showModel('linear')">
              <canvas class="mz-canvas" id="mz-linear" width="160" height="120"></canvas>
              <div class="mz-name">Model Linear</div>
              <div class="mz-desc">H = garis lurus (hyperplane)</div>
              <div class="mz-capacity low">Kapasitas Rendah</div>
            </div>

            <div class="mz-card" onclick="showModel('rect')">
              <canvas class="mz-canvas" id="mz-rect" width="160" height="120"></canvas>
              <div class="mz-name">Model Persegi Panjang</div>
              <div class="mz-desc">H = persegi panjang axis-aligned</div>
              <div class="mz-capacity mid">Kapasitas Sedang</div>
            </div>

            <div class="mz-card" onclick="showModel('circle')">
              <canvas class="mz-canvas" id="mz-circle" width="160" height="120"></canvas>
              <div class="mz-name">Model Lingkaran</div>
              <div class="mz-desc">H = lingkaran dengan radius r</div>
              <div class="mz-capacity mid">Kapasitas Sedang</div>
            </div>

            <div class="mz-card" onclick="showModel('poly')">
              <canvas class="mz-canvas" id="mz-poly" width="160" height="120"></canvas>
              <div class="mz-name">Model Polinomial</div>
              <div class="mz-desc">H = kurva derajat tinggi</div>
              <div class="mz-capacity high">Kapasitas Tinggi</div>
            </div>

          </div>
        </div>

        <div class="insight-callout">
          <div class="ic-icon"><i class="fas fa-key"></i></div>
          <div class="ic-body">
            <strong>Kapasitas Model:</strong> Semakin besar H, semakin banyak fungsi yang bisa direpresentasikan, semakin tinggi kapasitas model.
            Model dengan kapasitas terlalu rendah → <em>underfitting</em>. Terlalu tinggi → <em>overfitting</em>.
            Memilih H yang tepat adalah inti dari ML.
          </div>
        </div>

        <!-- Key distinction -->
        <div class="distinction-box">
          <div class="dist-col model-col">
            <div class="dist-icon"><i class="fas fa-circle"></i>️</div>
            <div class="dist-title">Model H</div>
            <div class="dist-sub">Keluarga / kelas fungsi</div>
            <div class="dist-body">
              Contoh: "semua garis lurus di ℝ²"<br>
              Tidak punya nilai parameter spesifik.<br>
              Dipilih sebelum training.
            </div>
            <div class="dist-formula">H = { h(x|θ) | θ ∈ Θ }</div>
          </div>
          <div class="dist-arrow">≠</div>
          <div class="dist-col hyp-col">
            <div class="dist-icon"><i class="fas fa-circle"></i></div>
            <div class="dist-title">Hipotesis h</div>
            <div class="dist-sub">Satu fungsi konkret</div>
            <div class="dist-body">
              Contoh: "garis y = 2x₁ − 3x₂ + 1"<br>
              Parameter θ sudah ditetapkan.<br>
              Hasil setelah training.
            </div>
            <div class="dist-formula">h = h(x|θ*) untuk θ* spesifik</div>
          </div>
        </div>

      </section>

      <!-- ═══ SEC 4: PARAMETRISASI ═══ -->
      <section class="lesson-sec" id="sec-parameter">
        <div class="sec-header">
          <span class="sec-num">04</span>
          <div>
            <h2 class="sec-title">Parametrisasi Model</h2>
            <p class="sec-sub">Cara praktis mendefinisikan H — melalui parameter θ</p>
          </div>
        </div>

        <div class="prose">
          Mendefinisikan H sebagai "himpunan semua fungsi" terlalu abstrak untuk implementasi.
          Dalam praktik, kita merepresentasikan model sebagai <strong>fungsi yang diparameterisasi</strong>:
          <code>h(x|θ)</code>. Training ML = mencari θ* yang optimal.
        </div>

        <div class="def-box">
          <div class="def-label">Definisi · Model Terparameterisasi</div>
          <div class="def-eq">
            <span class="math-term purple">H</span>
            <span class="math-op">=</span>
            <span class="math-term">{ h(·|θ) | θ ∈ Θ }</span>
          </div>
          <div class="def-note">θ = vektor parameter, Θ = ruang parameter (semua nilai θ yang mungkin)</div>
        </div>

        <!-- Model examples table -->
        <div class="model-table-wrap">
          <table class="model-table">
            <thead>
              <tr>
                <th>Model H</th>
                <th>Hipotesis h(x|θ)</th>
                <th>Parameter θ</th>
                <th>Jumlah Param</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="mt-name">Regresi Linear</td>
                <td><code>h(x) = θᵀx + θ₀</code></td>
                <td><code>θ ∈ ℝⁿ, θ₀ ∈ ℝ</code></td>
                <td class="mt-num blue">n + 1</td>
              </tr>
              <tr>
                <td class="mt-name">Persegi Panjang (ℝ²)</td>
                <td><code>h(x) = 𝟙[θ_x1 ≤ x₁ ≤ θ_x2 ∧ θ_y1 ≤ x₂ ≤ θ_y2]</code></td>
                <td><code>θ = (θ_x1, θ_x2, θ_y1, θ_y2)</code></td>
                <td class="mt-num blue">4</td>
              </tr>
              <tr>
                <td class="mt-name">Lingkaran (ℝ²)</td>
                <td><code>h(x) = 𝟙[x₁² + x₂² ≤ θ]</code></td>
                <td><code>θ ∈ ℝ (radius²)</code></td>
                <td class="mt-num blue">1</td>
              </tr>
              <tr>
                <td class="mt-name">MLP (1 hidden layer)</td>
                <td><code>h(x) = σ(W₂·σ(W₁x + b₁) + b₂)</code></td>
                <td><code>W₁, b₁, W₂, b₂</code></td>
                <td class="mt-num purple">n·h + h·k + h + k</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Training = optimization -->
        <div class="worked-box">
          <div class="wb-badge">⚙️ Training = Optimisasi</div>
          <div class="wb-title">Tiga Komponen Algoritma ML</div>
          <div class="three-components">
            <div class="tc-item">
              <div class="tc-num">1</div>
              <div class="tc-content">
                <div class="tc-title">Model H = { h(·|θ) }</div>
                <div class="tc-desc">Keluarga fungsi yang diparameterisasi. Menentukan bentuk solusi yang bisa ditemukan.</div>
                <div class="tc-example">Contoh: H = semua garis lurus → θ = (w, b)</div>
              </div>
            </div>
            <div class="tc-arrow">→</div>
            <div class="tc-item">
              <div class="tc-num">2</div>
              <div class="tc-content">
                <div class="tc-title">Loss Function L(θ|D)</div>
                <div class="tc-desc">Mengukur seberapa besar kesalahan prediksi model pada data latih D.</div>
                <div class="tc-example">Contoh: L = MSE = (1/N)Σ(h(xᵢ) − yᵢ)²</div>
              </div>
            </div>
            <div class="tc-arrow">→</div>
            <div class="tc-item">
              <div class="tc-num">3</div>
              <div class="tc-content">
                <div class="tc-title">Optimisasi: θ* = argmin L</div>
                <div class="tc-desc">Cari parameter θ* yang meminimalkan loss. Gradient descent, closed-form solution, dll.</div>
                <div class="tc-example">Hasil: hipotesis h* = h(·|θ*)</div>
              </div>
            </div>
          </div>
          <div class="insight-callout" style="margin-top:16px">
            <div class="ic-icon"><i class="fas fa-brain"></i></div>
            <div class="ic-body">
              Ketiga pilihan ini — model, loss, optimisasi — sepenuhnya menentukan <strong>induktif bias</strong> algoritma.
              Dua algoritma dengan model yang sama tapi loss berbeda akan menghasilkan hipotesis yang berbeda.
            </div>
          </div>
        </div>

      </section>

      <!-- ═══ SEC 5: VERSION SPACE ═══ -->
      <section class="lesson-sec" id="sec-versi">
        <div class="sec-header">
          <span class="sec-num">05</span>
          <div>
            <h2 class="sec-title">Ruang Inaˇcica (Version Space)</h2>
            <p class="sec-sub">Semua hipotesis yang konsisten dengan data — tidak hanya satu!</p>
          </div>
        </div>

        <div class="prose">
          Satu set data latih D biasanya tidak cukup untuk menentukan <em>satu</em> hipotesis unik.
          Ada banyak (bahkan tak terhingga) hipotesis dalam H yang konsisten dengan D.
          Kumpulan semua hipotesis konsisten tersebut disebut <strong>Ruang Inaˇcica</strong> (Version Space).
        </div>

        <div class="def-box accent-green">
          <div class="def-label">Definisi · Ruang Inaˇcica (Version Space)</div>
          <div class="def-eq">
            <span class="math-term green">VS</span><sub>H,D</sub>
            <span class="math-op">=</span>
            <span class="math-term">{ h ∈ H | Consistent(h, D) }</span>
          </div>
          <div class="def-note">Himpunan semua hipotesis di H yang konsisten (tidak ada error) pada training data D</div>
        </div>

        <!-- Version space visualization -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-ruler-combined"></i> Visualisasi · Ruang Inaˇcica</div>
          <div class="wb-title">Model persegi panjang — banyak hipotesis konsisten</div>
          <div class="vs-demo">
            <canvas id="versionSpaceCanvas" width="520" height="340"></canvas>
            <div class="vs-legend">
              <div class="vsl-item"><span class="vsl-dot pos"></span>Positif (y=1)</div>
              <div class="vsl-item"><span class="vsl-dot neg"></span>Negatif (y=0)</div>
              <div class="vsl-item"><span class="vsl-rect s"></span>Hipotesis spesifik (S) — terkecil</div>
              <div class="vsl-item"><span class="vsl-rect g"></span>Hipotesis umum (G) — terbesar</div>
              <div class="vsl-item"><span class="vsl-rect vs"></span>Version Space — semua di antara S dan G</div>
            </div>
          </div>
          <div class="vs-insight">
            <strong>Boundary S (paling spesifik):</strong> persegi panjang terkecil yang masih mencakup semua titik positif.<br>
            <strong>Boundary G (paling umum):</strong> persegi panjang terbesar yang tidak mencakup titik negatif manapun.<br>
            <strong>Version Space:</strong> semua persegi panjang antara S dan G — semuanya konsisten dengan D.
          </div>
        </div>

        <div class="prose">
          Fakta bahwa version space sangat besar adalah alasan mengapa kita butuh <strong>induktif bias</strong> —
          asumsi tambahan untuk memilih satu hipotesis dari sekian banyak yang konsisten.
        </div>

        <!-- Active learning note -->
        <div class="insight-callout">
          <div class="ic-icon"><i class="fas fa-bullseye"></i></div>
          <div class="ic-body">
            <strong>Active Learning:</strong> Strategi optimal untuk memperkecil version space adalah memilih
            contoh x yang membagi version space menjadi dua bagian sama besar — yaitu contoh yang
            diklasifikasikan berbeda oleh setengah hipotesis dalam VS. Dengan strategi ini, dibutuhkan
            hanya O(log|VS|) pertanyaan untuk menentukan hipotesis benar.
          </div>
        </div>

      </section>

      <!-- ═══ SEC 6: INDUKTIF BIAS ═══ -->
      <section class="lesson-sec" id="sec-bias">
        <div class="sec-header">
          <span class="sec-num">06</span>
          <div>
            <h2 class="sec-title">Induktif Bias</h2>
            <p class="sec-sub">Asumsi yang memungkinkan generalisasi — tanpanya, ML tidak mungkin</p>
          </div>
        </div>

        <div class="prose">
          Ini adalah konsep paling fundamental — dan paling sering diabaikan — dalam ML.
          Pembelajaran tanpa asumsi tambahan adalah <em>mustahil</em>.
          Fakta ini diformalisasikan dalam <strong>No Free Lunch Theorem</strong>.
        </div>

        <div class="nfl-box">
          <div class="nfl-icon"><i class="fas fa-circle"></i>️</div>
          <div class="nfl-content">
            <div class="nfl-title">No Free Lunch Theorem</div>
            <div class="nfl-body">
              Tidak ada algoritma ML yang secara universal lebih baik dari algoritma lain untuk <em>semua</em> masalah.
              Jika satu algoritma unggul di satu kelas masalah, pasti ada kelas masalah lain di mana ia lebih buruk.
              Setiap keunggulan datang dari asumsi (induktif bias) yang sesuai dengan masalah spesifik.
            </div>
          </div>
        </div>

        <!-- Two types of bias -->
        <div class="bias-types">
          <div class="bt-card restriction">
            <div class="bt-num">1</div>
            <div class="bt-title">Bias Pembatasan</div>
            <div class="bt-subtitle">(Restriction / Language Bias)</div>
            <div class="bt-desc">
              Membatasi ruang hipotesis H — hanya fungsi dari keluarga tertentu yang dipertimbangkan.
            </div>
            <div class="bt-example">
              <div class="bte-label">Contoh:</div>
              <div class="bte-item">H = hanya garis lurus → tidak bisa belajar XOR</div>
              <div class="bte-item">H = hanya pohon keputusan dengan max depth 5</div>
              <div class="bte-item">H = hanya fungsi yang mulus (smooth)</div>
            </div>
            <div class="bt-tradeoff">
              <span class="btt-plus">✓ Lebih mudah dioptimalkan</span>
              <span class="btt-minus">✗ Mungkin tidak cukup ekspresif</span>
            </div>
          </div>

          <div class="bt-card preference">
            <div class="bt-num">2</div>
            <div class="bt-title">Bias Preferensi</div>
            <div class="bt-subtitle">(Preference / Search Bias)</div>
            <div class="bt-desc">
              H tidak dibatasi, tapi ada preferensi — hipotesis tertentu diutamakan atas yang lain.
            </div>
            <div class="bt-example">
              <div class="bte-label">Contoh:</div>
              <div class="bte-item">Pilih hipotesis paling sederhana (Occam's Razor)</div>
              <div class="bte-item">Pilih hipotesis dengan margin terbesar (SVM)</div>
              <div class="bte-item">Pilih hipotesis dengan probabilitas posterior tertinggi (Bayes)</div>
            </div>
            <div class="bt-tradeoff">
              <span class="btt-plus">✓ Lebih fleksibel</span>
              <span class="btt-minus">✗ Harder to optimize (search over all H)</span>
            </div>
          </div>
        </div>

        <div class="insight-callout">
          <div class="ic-icon"><i class="fas fa-circle"></i></div>
          <div class="ic-body">
            <strong>Occam's Razor dalam ML:</strong> Di antara semua hipotesis yang sama-sama konsisten dengan data,
            pilihlah yang <em>paling sederhana</em>. Ini bukan hanya prinsip estetis — model lebih sederhana
            punya lebih sedikit parameter, lebih sulit overfit, dan lebih mudah diinterpretasi.
            Formalisasi matematisnya adalah <strong>Minimum Description Length (MDL)</strong>.
          </div>
        </div>

        <!-- Summary diagram -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-circle"></i>️ Peta Konsep · Hubungan Semua Konsep</div>
          <div class="wb-title">Dari Data ke Hipotesis — Alur Lengkap</div>
          <div class="summary-flow">
            <div class="sf-node data">
              <div class="sfn-icon"><i class="fas fa-box"></i></div>
              <div class="sfn-title">Data D</div>
              <div class="sfn-desc">{ (x⁽ⁱ⁾, y⁽ⁱ⁾) }ᴺ</div>
            </div>
            <div class="sf-arrow">+</div>
            <div class="sf-node model">
              <div class="sfn-icon"><i class="fas fa-circle"></i>️</div>
              <div class="sfn-title">Model H</div>
              <div class="sfn-desc">{ h(·|θ) }</div>
            </div>
            <div class="sf-arrow">+</div>
            <div class="sf-node bias">
              <div class="sfn-icon"><i class="fas fa-scale-balanced"></i></div>
              <div class="sfn-title">Induktif Bias</div>
              <div class="sfn-desc">Preferensi / Pembatasan</div>
            </div>
            <div class="sf-arrow big">⟹</div>
            <div class="sf-node hypothesis">
              <div class="sfn-icon"><i class="fas fa-bullseye"></i></div>
              <div class="sfn-title">Hipotesis h*</div>
              <div class="sfn-desc">h(·|θ*) optimal</div>
            </div>
          </div>
        </div>

        <!-- Next lesson CTA -->
        <div class="next-lesson-cta">
          <div class="nlc-inner">
            <span class="nlc-label">Lesson berikutnya</span>
            <h3 class="nlc-title">VC-Dimension →</h3>
            <p class="nlc-desc">Sekarang kamu tahu apa itu Model H dan Hipotesis h. Pertanyaan selanjutnya: berapa kapasitas model? VC-Dimension memberikan jawaban formal — dan menentukan apakah model bisa generalisasi.</p>
            <a href="#/participant-ai-lab-ml-vc-dim" class="nlc-btn">Lanjut ke VC-Dimension</a>
          </div>
        </div>

      </section>

</article>
<footer class="lesson-nav-footer">
<a href="#/participant-ai-lab-ml-intro"><i class="fas fa-chevron-left"></i> Sebelumnya</a>
<a href="#/participant-ai-lab-ml-vc-dim">Selanjutnya <i class="fas fa-arrow-right"></i></a>
</footer>
</section>
</div>
<aside class="lesson-right-panel">
<section class="module-side-card lesson-progress-card"><h2>Progres</h2><div class="lesson-progress-mini"><b style="--value:0%"></b><strong>0%</strong></div><p>Hipotesis & Model</p><a href="#/participant-ai-lab-ml">Katalog ML</a></section>
<section class="module-side-card lesson-list-card"><h2>Daftar Section</h2><ol>
<li class="active"><span>1</span><a href="#sec-vektor">Vektor Fitur</a><i class="far fa-circle-play"></i></li>
<li><span>2</span><a href="#sec-hipotesis">Hipotesis</a><i class="far fa-circle"></i></li>
<li><span>3</span><a href="#sec-model">Model & Ruang Hipotesis</a><i class="far fa-circle"></i></li>
<li><span>4</span><a href="#sec-parameter">Parameter & Learning</a><i class="far fa-circle"></i></li>
<li><span>5</span><a href="#sec-versi">Versi Hipotesis</a><i class="far fa-circle"></i></li>
<li><span>6</span><a href="#sec-bias">Inductive Bias</a><i class="far fa-circle"></i></li>
</ol></section>
</aside>
</div>
</main>
</section>

````
