# Intuisi Dasar — Target vs Prediksi

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/legacy-lessons/ml-bias-variance.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

01

#### Intuisi Dasar — Target vs Prediksi

Analogi dart board yang menjelaskan bias dan variance secara visual

Bayangkan kamu melempar dart ke papan. **Bias** adalah seberapa jauh rata-rata lemparanmu dari target. **Variance** adalah seberapa tersebar lemparanmu satu sama lain. Keduanya independen — kamu bisa punya kombinasi apapun dari keduanya.

Low Bias · Low Variance

Ideal — akurat dan konsisten

High Bias · Low Variance

Konsisten tapi sistematis salah

Low Bias · High Variance

Rata-rata tepat tapi tidak stabil

High Bias · High Variance

Kasus terburuk — salah dan tidak stabil

️ Interactive · Sesuaikan Kompleksitas Model

Polynomial Regression — Lihat Bias-Variance Berubah

Derajat Polinomial 1

Train Error—

Test Error—

Status—

02

#### Dekomposisi Error — Bias² + Variance + σ²

Penurunan matematis Expected Prediction Error (EPE)

Expected Prediction Error (EPE) di titik x bisa didekomposisi menjadi tiga komponen yang independen. Ini adalah hasil fundamental dalam ML theory yang menjelaskan *mengapa* tidak ada model yang sempurna.

Bias-Variance Decomposition (untuk regresi dengan squared loss)

EPE(x) = E[(y − ĥ(x))²]

Bias²(ĥ(x)) + Var(ĥ(x)) + σ²

**Bias²** = (E[ĥ(x)] − f(x))² — seberapa jauh rata-rata prediksi dari nilai sebenarnya

**Variance** = E[(ĥ(x) − E[ĥ(x)])²] — seberapa bervariasi prediksi antar training set berbeda

**σ²** = Irreducible error — noise inheren dalam data, tidak bisa dihilangkan oleh model apapun

Penurunan Matematis Lengkap

Dari E[(y−ĥ)²] ke Bias² + Var + σ²

1

Expand dengan menambah dan mengurangi E[ĥ(x)]

E[(y − ĥ)²] = E[(y − f + f − E[ĥ] + E[ĥ] − ĥ)²]

dimana f(x) = fungsi target sebenarnya, y = f(x) + ε

2

Cross terms hilang karena ε independen dari ĥ

= E[(f − E[ĥ])²] + E[(E[ĥ] − ĥ)²] + E[ε²]

3

Setiap term memiliki interpretasi jelas

= (E[ĥ(x)] − f(x))² + Var[ĥ(x)] + σ²

= Bias² + Variance + Irreducible Error

Visualisasi: 100 model yang dilatih pada dataset berbeda

Low Bias, Low Var

High Bias, Low Var

Low Bias, High Var

High Bias, High Var

⚠️

**σ² tidak bisa diminimasi** — ini adalah batas bawah absolut error yang bisa dicapai. Bahkan oracle yang tahu fungsi target f(x) sepenuhnya pun masih punya error σ². Oleh karena itu, tujuan sebenarnya adalah meminimasi *Bias² + Variance*, bukan total error.

03

#### High Bias — Underfitting

Model terlalu kaku untuk menangkap pola yang ada di data

**Underfitting** terjadi ketika model H terlalu sederhana — kapasitasnya tidak cukup untuk merepresentasikan fungsi target f(x). Model membuat asumsi yang terlalu kuat tentang bentuk fungsi.

⬆ High Bias — Karakteristik

Training error tinggi

Model bahkan tidak bisa fit data latihnya sendiri. E\_train ≫ 0.

Test error ≈ Train error

Gap kecil antara train dan test — keduanya sama-sama buruk.

Plateau cepat pada learning curve

Menambah lebih banyak data tidak membantu — masalah bukan di data.

Asumsi model terlalu kuat

Contoh: pakai linear model untuk data yang fundamentally non-linear.

Contoh nyata underfitting:

Regresi linear pada data sinusoidal

Decision tree depth=1 untuk XOR

MLP 1 neuron untuk MNIST

Naive Bayes ketika fitur sangat berkorelasi

Solusi untuk High Bias

1

**Tambah fitur** — Feature engineering, polynomial features, interaction terms

2

**Model lebih kompleks** — Naik ke arsitektur yang lebih expressive (linear → polynomial → neural net)

3

**Kurangi regularisasi** — Turunkan λ pada L1/L2, kurangi dropout rate

4

**Latih lebih lama** — Biarkan training berjalan lebih banyak epoch

04

#### High Variance — Overfitting

Model terlalu sensitif terhadap noise — menghafal bukan belajar

**Overfitting** terjadi ketika model terlalu fleksibel — ia belajar tidak hanya pola sebenarnya tapi juga noise dalam data latih. Model yang overfit punya training error sangat rendah tapi generalisasi buruk ke data baru.

⬆ High Variance — Karakteristik

✅

Training error sangat rendah

Model "hafal" semua data latih, termasuk noise-nya. E\_train ≈ 0.

❌

Test error jauh lebih tinggi

Gap besar antara train dan test error — tanda overfitting yang jelas.

Prediksi sangat bervariasi

Ganti sedikit data latih → prediksi berubah drastis. Var[ĥ(x)] besar.

Membaik dengan lebih banyak data

Tidak seperti underfitting — menambah data latih membantu mengurangi variance.

️ Interactive · Noise & Overfitting

Lihat bagaimana model degree-10 bereaksi terhadap noise

Level Noise σ 15

Jumlah Data N 16

Resample Data

Solusi untuk High Variance

1

**Regularisasi** — L1 (Lasso), L2 (Ridge), Elastic Net. Dropout untuk neural network.

2

**Tambah data latih** — Lebih banyak data membatasi variance secara alami. Data augmentation juga membantu.

3

**Kurangi kompleksitas model** — Pakai model yang lebih sederhana, kurangi parameter.

4

**Early Stopping** — Berhenti training ketika validation error mulai naik.

5

**Dimensionality Reduction** — PCA, feature selection untuk mengurangi noise dimensions.

05

#### Inductive Bias — Asumsi yang Memungkinkan Belajar

Setiap algoritma punya asumsi implisit tentang struktur data

**Inductive bias** adalah kumpulan asumsi yang dibuat algoritma ML untuk melakukan generalisasi dari data latih ke data baru. Tanpa asumsi ini, generalisasi tidak mungkin (lihat No Free Lunch Theorem). Setiap pilihan algoritma adalah pilihan tentang asumsi apa yang kita percayai tentang data.

1

Relational Bias

Asumsi tentang struktur hubungan antar fitur

Linear Model Hubungan antar fitur dan target adalah linear

CNN Spatial invariance — fitur penting sama di seluruh gambar

RNN/LSTM Urutan waktu penting, ada dependensi jangka panjang

k-NN Titik yang dekat di ruang fitur cenderung punya label sama

Naive Bayes Fitur independen secara kondisional diberikan kelas

2

Strength of Bias

Seberapa kuat asumsi diberlakukan

Parametrik (Strong Bias)

Bentuk fungsi diasumsikan (misal: linear)

Jumlah parameter tetap, tidak bergantung N

Butuh lebih sedikit data untuk konvergen

Salah jika asumsi tidak tepat

Linear Reg, Logistic Reg, Naive Bayes

Non-parametrik (Weak Bias)

Asumsi minimal tentang bentuk fungsi

Kompleksitas tumbuh dengan N

Butuh lebih banyak data untuk konvergen

Lebih fleksibel, tapi lebih mudah overfit

k-NN, Decision Tree, Kernel SVM

**CNN dan Spatial Invariance:** CNN secara eksplisit encode asumsi bahwa fitur visual (tepi, tekstur, bentuk) sama pentingnya di semua lokasi gambar — itulah mengapa weight sharing bekerja. Tanpa asumsi ini, kita butuh jauh lebih banyak parameter dan data untuk mencapai performa yang sama.

06

#### No Free Lunch Theorem

Tidak ada algoritma terbaik untuk semua masalah — ini bukan opini, ini teorema

NFL Theorem (Wolpert, 1996) membuktikan secara matematis bahwa jika kita rata-rata performa semua algoritma ML di *semua* distribusi data yang mungkin, semua algoritma punya performa yang **sama**.

Pernyataan Formal (simplified)

Σ\_f E[L | f, A₁] = Σ\_f E[L | f, A₂]   untuk sembarang A₁, A₂

dimana jumlah dilakukan atas semua possible target function f, dan L adalah loss.

Implikasi Praktis

✅

Yang berarti...

Setiap algoritma punya "niche" — ada distribusi data di mana ia unggul. Tidak ada yang universal inferior.

❌

Yang tidak berarti...

Bukan berarti semua algoritma sama baik pada masalah spesifik! Pada domain tertentu (misal: gambar), CNN jelas unggul.

Kesimpulan utama

Pilih algoritma berdasarkan asumsi yang sesuai dengan struktur masalahmu. Domain knowledge sangat penting.

Ilustrasi: Algoritma A unggul di distribusi P, kalah di distribusi Q

07

#### Diagnosis — Learning & Complexity Curves

Cara sistematis mendiagnosis apakah masalahnya bias atau variance

Sebelum menerapkan solusi, kita perlu *mendiagnosis* masalahnya dengan tepat. Dua alat utama: **Learning Curves** (error vs ukuran dataset) dan **Complexity Curves** (error vs kompleksitas model).

Learning Curves — Error vs Jumlah Data N

Pilih skenario untuk melihat pola diagnostik

Underfitting

Overfitting

Good Fit

**Underfitting:** Training dan validation error keduanya tinggi dan konvergen ke nilai yang sama. Menambah data tidak membantu. Masalah ada di model, bukan data.

Complexity Curves — Error vs Derajat Kebebasan Model

Temukan sweet spot kompleksitas optimal

── Training error ── Validation error ★ Model optimal

High Bias Region

Sweet Spot

High Variance Region

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Gejala
Diagnosa
Solusi</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Train error tinggi, Val error ≈ Train error
High Bias
Model lebih kompleks, lebih banyak fitur</td>
<td align="left">Train error rendah, Val error jauh lebih tinggi
High Variance
Regularisasi, lebih banyak data</td>
<td align="left">Keduanya tinggi, gap besar
Bias + Variance
Model berbeda, lebih banyak data dan reg</td>
</tr>
</tbody>
</table>

08

#### Mitigasi — Regularisasi & Ensemble

Teknik spesifik untuk mengurangi bias atau variance

️ Regularisasi — Mengurangi Variance

L1, L2, dan Dropout: cara kerja matematis

L1 Regularisasi (Lasso)

L\_total = L(θ) + λ·Σ|θᵢ|

Mendorong banyak weight → **tepat nol**

Efek: **feature selection otomatis**

Solusi: sparse weight vector

L2 Regularisasi (Ridge)

L\_total = L(θ) + λ·Σθᵢ²

Mendorong weight → **kecil tapi tidak nol**

Efek: **weight decay** yang halus

Solusi: weight tersebar merata

Dropout (Neural Networks)

p(neuron aktif) = 1 − p\_drop

Matikan neuron acak saat training

Efek: ensemble dari 2ᴺ sub-network

Mencegah co-adaptation

Ensemble Methods — Bagging vs Boosting

Dua strategi berbeda untuk target yang berbeda

Bagging

Target: kurangi **Variance**

Train banyak model secara **paralel**

↓

Setiap model pada **bootstrap sample** berbeda

↓

Rata-rata prediksi → variance berkurang √k kali

Var[ĥ̄] = σ²/k (jika model independen)

Contoh: **Random Forest**

Boosting

Target: kurangi **Bias**

Train model **sekuensial**

↓

Model baru fokus pada **error model sebelumnya**

↓

Gabungkan → weak learners → strong learner

F\_T(x) = Σₜ αₜ · hₜ(x)

Contoh: **XGBoost, AdaBoost**

09

#### Paradoks Modern — Double Descent

Deep learning melanggar "hukum" bias-variance klasik — dan ternyata ada penjelasannya

Classical ML theory memprediksi kurva U-shape untuk test error sebagai fungsi kompleksitas model. Tapi model modern seperti deep neural networks menunjukkan fenomena **double descent** — setelah "puncak" overfitting, error turun lagi ketika model menjadi *sangat* over-parameterized.

Fenomena Double Descent

Classical U-curve vs Modern Double Descent

── Classical theory (U-curve) ── Modern observation (double descent) ── Interpolation threshold

Mengapa ini terjadi?

Zona 1: Under-parameterized

Model tidak cukup parameter untuk fit semua data. Sesuai teori klasik — lebih banyak parameter = lebih baik.

Zona 2: Interpolation Threshold

Model bisa persis fit semua training data. Ini adalah puncak test error — model harus "bergelut" untuk fit semua titik.

Zona 3: Over-parameterized (benign overfitting)

Model punya banyak lebih banyak parameter dari data. Tapi SGD+inductive bias memilih solusi yang "smooth" — dan error generalisasi turun kembali!

**Benign Overfitting (Bartlett et al., 2020):** Model yang persis menginterpolasi training data bisa tetap generalisasi baik jika dimensi fitur jauh lebih besar dari jumlah data. Inilah mengapa GPT-4 (trillions parameter) generalisasi baik meski kapasitasnya jauh melebihi ukuran training set yang terlihat. Bias-variance tradeoff klasik tidak ditinggalkan — tapi perlu diperluas.

Ringkasan — Bias-Variance dalam Satu Pandangan

**Bias** → model terlalu sederhana, asumsi terlalu kuat

**Variance** → model terlalu kompleks, sensitif terhadap noise

**σ²** → tidak bisa dihilangkan, batas bawah absolut

**Optimal** → minimasi Bias² + Variance secara bersamaan

Modul berikutnya

##### Supervised Learning →

Fondasi teoritis sudah kamu kuasai. Saatnya masuk ke algoritma konkret — regresi, klasifikasi Bayesian, logistic regression, SVM, dan neural networks.

[Kembali ke ML Overview](/pages/ai-lab/machine-learning.html)

## Lampiran Sumber HTML Lengkap

````html
<section class="fellow-dashboard fellow-modules-page lesson-detail-page ml-lesson-page" data-fellow-page="modules">
<button class="fellow-menu-toggle" type="button" aria-label="Buka navigasi peserta" aria-expanded="false"><i class="fas fa-bars"></i></button>
<div class="fellow-sidebar-scrim" aria-hidden="true"></div>
<aside class="fellow-sidebar" aria-label="Navigasi peserta">
<a href="#/participant-dashboard" class="fellow-logo"><img src="/assets/branding/logo-her-ai-transparent.png" alt="HerAI"></a>
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
<a href="#/participant-help" data-fellow-nav="faq"><i class="far fa-circle-question"></i><span>FAQ</span></a>
<a href="#/participant-settings" data-fellow-nav="settings"><i class="fas fa-gear"></i><span>Pengaturan</span></a>
</nav>
</aside>
<main class="fellow-main">
<header class="lesson-topbar">
<nav class="lesson-breadcrumb"><a href="#/participant-ai-lab-ml"><i class="fas fa-arrow-left"></i><span>ML</span></a><span class="lesson-breadcrumb-separator"><i class="fas fa-arrow-right"></i></span><span>Bias-Variance</span></nav>
<div class="fellow-actions">
<label class="fellow-search"><i class="fas fa-magnifying-glass"></i><input type="search" placeholder="Cari..."></label>
<button type="button" class="fellow-icon-button" aria-label="Notifikasi"><i class="far fa-bell"></i><span>5</span></button>
<a href="#/participant-profile" class="fellow-user-button"><span class="avatar-img"></span><span><strong>Aisyah Putri</strong><small>Peserta</small></span><i class="fas fa-chevron-down"></i></a>
</div>
</header>
<div class="lesson-layout"><div class="lesson-main-content">
<section class="lesson-hero compact"><div class="lesson-hero-copy">
<h1>Bias-Variance Tradeoff</h1>
<p>Overfitting terjadi saat model terlalu kompleks. Underfitting saat terlalu sederhana. The No Free Lunch Theorem.</p>
<div class="lesson-meta-row"><span><i class="far fa-clock"></i> 55 menit</span><span><i class="fas fa-layer-group"></i> ML · Pengantar ML</span><b><i class="fas fa-scale-balanced"></i> Interaktif</b></div>
</div><img src="/assets/messaging/herai-chat-persona.png" alt="HerAI Bias-Variance"></section>
<section class="lesson-material-panel">
<div class="lesson-tabs"><a href="#/participant-ai-lab-ml-bias-variance" class="active"><i class="fas fa-book-open"></i> Materi</a><a href="#/participant-ai-lab-ml"><i class="fas fa-layer-group"></i> Katalog ML</a></div>
<article class="lesson-article ai-lab-content" id="biasvariance-content">

      <section class="lesson-sec" id="sec-intuisi">
        <div class="sec-header">
          <span class="sec-num">01</span>
          <div>
            <h2 class="sec-title">Intuisi Dasar — Target vs Prediksi</h2>
            <p class="sec-sub">Analogi dart board yang menjelaskan bias dan variance secara visual</p>
          </div>
        </div>

        <div class="prose">
          Bayangkan kamu melempar dart ke papan. <strong>Bias</strong> adalah seberapa jauh rata-rata
          lemparanmu dari target. <strong>Variance</strong> adalah seberapa tersebar lemparanmu
          satu sama lain. Keduanya independen — kamu bisa punya kombinasi apapun dari keduanya.
        </div>

        <!-- Dartboard 2x2 -->
        <div class="dartboard-grid">
          <div class="db-cell">
            <canvas class="db-canvas" id="db-lb" width="180" height="180"></canvas>
            <div class="db-label"><span class="db-good">Low Bias</span> · <span class="db-good">Low Variance</span></div>
            <div class="db-desc">Ideal — akurat dan konsisten</div>
          </div>
          <div class="db-cell">
            <canvas class="db-canvas" id="db-hb" width="180" height="180"></canvas>
            <div class="db-label"><span class="db-bad">High Bias</span> · <span class="db-good">Low Variance</span></div>
            <div class="db-desc">Konsisten tapi sistematis salah</div>
          </div>
          <div class="db-cell">
            <canvas class="db-canvas" id="db-hv" width="180" height="180"></canvas>
            <div class="db-label"><span class="db-good">Low Bias</span> · <span class="db-bad">High Variance</span></div>
            <div class="db-desc">Rata-rata tepat tapi tidak stabil</div>
          </div>
          <div class="db-cell">
            <canvas class="db-canvas" id="db-hbhv" width="180" height="180"></canvas>
            <div class="db-label"><span class="db-bad">High Bias</span> · <span class="db-bad">High Variance</span></div>
            <div class="db-desc">Kasus terburuk — salah dan tidak stabil</div>
          </div>
        </div>

        <!-- Interactive polynomial fit -->
        <div class="worked-box">
          <div class="wb-badge">️ Interactive · Sesuaikan Kompleksitas Model</div>
          <div class="wb-title">Polynomial Regression — Lihat Bias-Variance Berubah</div>
          <div class="poly-demo">
            <div class="poly-controls">
              <div class="pc-row">
                <span class="pc-label">Derajat Polinomial</span>
                <input type="range" id="slDegree" min="1" max="12" step="1" value="1">
                <span class="pc-val" id="valDegree">1</span>
              </div>
              <div class="pc-stats">
                <div class="pcs-item"><span class="pcs-label">Train Error</span><span class="pcs-val blue" id="trainErr">—</span></div>
                <div class="pcs-item"><span class="pcs-label">Test Error</span><span class="pcs-val" id="testErr">—</span></div>
                <div class="pcs-item"><span class="pcs-label">Status</span><span class="pcs-val" id="fitStatus">—</span></div>
              </div>
            </div>
            <canvas id="polyCanvas" width="520" height="300"></canvas>
          </div>
        </div>
      </section>

      <!-- ═══ SEC 2: DEKOMPOSISI ═══ -->
      <section class="lesson-sec" id="sec-decomp">
        <div class="sec-header">
          <span class="sec-num">02</span>
          <div>
            <h2 class="sec-title">Dekomposisi Error — Bias² + Variance + σ²</h2>
            <p class="sec-sub">Penurunan matematis Expected Prediction Error (EPE)</p>
          </div>
        </div>

        <div class="prose">
          Expected Prediction Error (EPE) di titik x bisa didekomposisi menjadi tiga komponen
          yang independen. Ini adalah hasil fundamental dalam ML theory yang menjelaskan
          <em>mengapa</em> tidak ada model yang sempurna.
        </div>

        <!-- Main decomposition formula -->
        <div class="decomp-formula-box">
          <div class="dfb-label">Bias-Variance Decomposition (untuk regresi dengan squared loss)</div>
          <div class="dfb-main">
            EPE(x) = E[(y − ĥ(x))²]
          </div>
          <div class="dfb-expand">
            <span class="dfb-term bias">Bias²(ĥ(x))</span>
            <span class="dfb-plus">+</span>
            <span class="dfb-term var">Var(ĥ(x))</span>
            <span class="dfb-plus">+</span>
            <span class="dfb-term irr">σ²</span>
          </div>
          <div class="dfb-legend">
            <div class="dfbl-item"><span class="dfbl-dot bias"></span><strong>Bias²</strong> = (E[ĥ(x)] − f(x))² — seberapa jauh rata-rata prediksi dari nilai sebenarnya</div>
            <div class="dfbl-item"><span class="dfbl-dot var"></span><strong>Variance</strong> = E[(ĥ(x) − E[ĥ(x)])²] — seberapa bervariasi prediksi antar training set berbeda</div>
            <div class="dfbl-item"><span class="dfbl-dot irr"></span><strong>σ²</strong> = Irreducible error — noise inheren dalam data, tidak bisa dihilangkan oleh model apapun</div>
          </div>
        </div>

        <!-- Step-by-step derivation -->
        <div class="worked-box">
          <div class="wb-badge"> Penurunan Matematis Lengkap</div>
          <div class="wb-title">Dari E[(y−ĥ)²] ke Bias² + Var + σ²</div>
          <div class="derivation-steps">
            <div class="ds-step">
              <div class="ds-num">1</div>
              <div class="ds-content">
                <div class="ds-title">Expand dengan menambah dan mengurangi E[ĥ(x)]</div>
                <div class="ds-formula">
                  E[(y − ĥ)²] = E[(y − f + f − E[ĥ] + E[ĥ] − ĥ)²]
                </div>
                <div class="ds-note">dimana f(x) = fungsi target sebenarnya, y = f(x) + ε</div>
              </div>
            </div>
            <div class="ds-step">
              <div class="ds-num">2</div>
              <div class="ds-content">
                <div class="ds-title">Cross terms hilang karena ε independen dari ĥ</div>
                <div class="ds-formula">
                  = E[(f − E[ĥ])²] + E[(E[ĥ] − ĥ)²] + E[ε²]
                </div>
              </div>
            </div>
            <div class="ds-step">
              <div class="ds-num">3</div>
              <div class="ds-content">
                <div class="ds-title">Setiap term memiliki interpretasi jelas</div>
                <div class="ds-formula">
                  = <span style="color:#ef4444">(E[ĥ(x)] − f(x))²</span> + <span style="color:#2997ff">Var[ĥ(x)]</span> + <span style="color:#6e6e73">σ²</span>
                </div>
                <div class="ds-formula" style="margin-top:8px">
                  = <span style="color:#ef4444">Bias²</span> + <span style="color:#2997ff">Variance</span> + <span style="color:#6e6e73">Irreducible Error</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Visualization of decomposition -->
        <div class="decomp-viz">
          <div class="dv-title">Visualisasi: 100 model yang dilatih pada dataset berbeda</div>
          <canvas id="decompCanvas" width="560" height="280"></canvas>
          <div class="dv-controls">
            <button class="dv-btn active" onclick="setDecompMode('low-bias-low-var')">Low Bias, Low Var</button>
            <button class="dv-btn" onclick="setDecompMode('high-bias-low-var')">High Bias, Low Var</button>
            <button class="dv-btn" onclick="setDecompMode('low-bias-high-var')">Low Bias, High Var</button>
            <button class="dv-btn" onclick="setDecompMode('high-bias-high-var')">High Bias, High Var</button>
          </div>
          <div class="dv-stats" id="dvStats"></div>
        </div>

        <div class="insight-callout">
          <div class="ic-icon">⚠️</div>
          <div class="ic-body">
            <strong>σ² tidak bisa diminimasi</strong> — ini adalah batas bawah absolut error yang bisa dicapai.
            Bahkan oracle yang tahu fungsi target f(x) sepenuhnya pun masih punya error σ².
            Oleh karena itu, tujuan sebenarnya adalah meminimasi <em>Bias² + Variance</em>, bukan total error.
          </div>
        </div>
      </section>

      <!-- ═══ SEC 3: HIGH BIAS ═══ -->
      <section class="lesson-sec" id="sec-highbias">
        <div class="sec-header">
          <span class="sec-num">03</span>
          <div>
            <h2 class="sec-title">High Bias — Underfitting</h2>
            <p class="sec-sub">Model terlalu kaku untuk menangkap pola yang ada di data</p>
          </div>
        </div>

        <div class="prose">
          <strong>Underfitting</strong> terjadi ketika model H terlalu sederhana — kapasitasnya tidak cukup
          untuk merepresentasikan fungsi target f(x). Model membuat asumsi yang terlalu kuat
          tentang bentuk fungsi.
        </div>

        <div class="bv-characteristics">
          <div class="bvc-header bias">⬆ High Bias — Karakteristik</div>
          <div class="bvc-grid">
            <div class="bvc-item">
              <div class="bvci-icon"></div>
              <div class="bvci-title">Training error tinggi</div>
              <div class="bvci-desc">Model bahkan tidak bisa fit data latihnya sendiri. E_train ≫ 0.</div>
            </div>
            <div class="bvc-item">
              <div class="bvci-icon"></div>
              <div class="bvci-title">Test error ≈ Train error</div>
              <div class="bvci-desc">Gap kecil antara train dan test — keduanya sama-sama buruk.</div>
            </div>
            <div class="bvc-item">
              <div class="bvci-icon"></div>
              <div class="bvci-title">Plateau cepat pada learning curve</div>
              <div class="bvci-desc">Menambah lebih banyak data tidak membantu — masalah bukan di data.</div>
            </div>
            <div class="bvc-item">
              <div class="bvci-icon"></div>
              <div class="bvci-title">Asumsi model terlalu kuat</div>
              <div class="bvci-desc">Contoh: pakai linear model untuk data yang fundamentally non-linear.</div>
            </div>
          </div>
        </div>

        <div class="bias-examples">
          <div class="be-title">Contoh nyata underfitting:</div>
          <div class="be-grid">
            <div class="be-item"><span class="be-icon"></span><span>Regresi linear pada data sinusoidal</span></div>
            <div class="be-item"><span class="be-icon"></span><span>Decision tree depth=1 untuk XOR</span></div>
            <div class="be-item"><span class="be-icon"></span><span>MLP 1 neuron untuk MNIST</span></div>
            <div class="be-item"><span class="be-icon"></span><span>Naive Bayes ketika fitur sangat berkorelasi</span></div>
          </div>
        </div>

        <!-- Solutions -->
        <div class="solution-box bias-sol">
          <div class="sb-header"> Solusi untuk High Bias</div>
          <div class="sb-items">
            <div class="sbi"><span class="sbi-num">1</span><div><strong>Tambah fitur</strong> — Feature engineering, polynomial features, interaction terms</div></div>
            <div class="sbi"><span class="sbi-num">2</span><div><strong>Model lebih kompleks</strong> — Naik ke arsitektur yang lebih expressive (linear → polynomial → neural net)</div></div>
            <div class="sbi"><span class="sbi-num">3</span><div><strong>Kurangi regularisasi</strong> — Turunkan λ pada L1/L2, kurangi dropout rate</div></div>
            <div class="sbi"><span class="sbi-num">4</span><div><strong>Latih lebih lama</strong> — Biarkan training berjalan lebih banyak epoch</div></div>
          </div>
        </div>
      </section>

      <!-- ═══ SEC 4: HIGH VARIANCE ═══ -->
      <section class="lesson-sec" id="sec-highvar">
        <div class="sec-header">
          <span class="sec-num">04</span>
          <div>
            <h2 class="sec-title">High Variance — Overfitting</h2>
            <p class="sec-sub">Model terlalu sensitif terhadap noise — menghafal bukan belajar</p>
          </div>
        </div>

        <div class="prose">
          <strong>Overfitting</strong> terjadi ketika model terlalu fleksibel — ia belajar tidak hanya
          pola sebenarnya tapi juga noise dalam data latih. Model yang overfit punya training error
          sangat rendah tapi generalisasi buruk ke data baru.
        </div>

        <div class="bv-characteristics">
          <div class="bvc-header variance">⬆ High Variance — Karakteristik</div>
          <div class="bvc-grid">
            <div class="bvc-item">
              <div class="bvci-icon">✅</div>
              <div class="bvci-title">Training error sangat rendah</div>
              <div class="bvci-desc">Model "hafal" semua data latih, termasuk noise-nya. E_train ≈ 0.</div>
            </div>
            <div class="bvc-item">
              <div class="bvci-icon">❌</div>
              <div class="bvci-title">Test error jauh lebih tinggi</div>
              <div class="bvci-desc">Gap besar antara train dan test error — tanda overfitting yang jelas.</div>
            </div>
            <div class="bvci-item">
              <div class="bvci-icon"></div>
              <div class="bvci-title">Prediksi sangat bervariasi</div>
              <div class="bvci-desc">Ganti sedikit data latih → prediksi berubah drastis. Var[ĥ(x)] besar.</div>
            </div>
            <div class="bvc-item">
              <div class="bvci-icon"></div>
              <div class="bvci-title">Membaik dengan lebih banyak data</div>
              <div class="bvci-desc">Tidak seperti underfitting — menambah data latih membantu mengurangi variance.</div>
            </div>
          </div>
        </div>

        <!-- Interactive: show overfitting with noise -->
        <div class="worked-box">
          <div class="wb-badge">️ Interactive · Noise & Overfitting</div>
          <div class="wb-title">Lihat bagaimana model degree-10 bereaksi terhadap noise</div>
          <div class="noise-demo">
            <div class="nd-controls">
              <div class="ndc-row">
                <span class="ndc-label">Level Noise σ</span>
                <input type="range" id="slNoise" min="0" max="50" step="5" value="15">
                <span class="ndc-val" id="valNoise">15</span>
              </div>
              <div class="ndc-row">
                <span class="ndc-label">Jumlah Data N</span>
                <input type="range" id="slDataN" min="8" max="40" step="4" value="16">
                <span class="ndc-val" id="valDataN">16</span>
              </div>
              <button class="nd-resample" onclick="resampleNoise()"> Resample Data</button>
            </div>
            <canvas id="noiseCanvas" width="460" height="280"></canvas>
          </div>
        </div>

        <div class="solution-box var-sol">
          <div class="sb-header"> Solusi untuk High Variance</div>
          <div class="sb-items">
            <div class="sbi"><span class="sbi-num">1</span><div><strong>Regularisasi</strong> — L1 (Lasso), L2 (Ridge), Elastic Net. Dropout untuk neural network.</div></div>
            <div class="sbi"><span class="sbi-num">2</span><div><strong>Tambah data latih</strong> — Lebih banyak data membatasi variance secara alami. Data augmentation juga membantu.</div></div>
            <div class="sbi"><span class="sbi-num">3</span><div><strong>Kurangi kompleksitas model</strong> — Pakai model yang lebih sederhana, kurangi parameter.</div></div>
            <div class="sbi"><span class="sbi-num">4</span><div><strong>Early Stopping</strong> — Berhenti training ketika validation error mulai naik.</div></div>
            <div class="sbi"><span class="sbi-num">5</span><div><strong>Dimensionality Reduction</strong> — PCA, feature selection untuk mengurangi noise dimensions.</div></div>
          </div>
        </div>
      </section>

      <!-- ═══ SEC 5: INDUCTIVE BIAS ═══ -->
      <section class="lesson-sec" id="sec-inductive">
        <div class="sec-header">
          <span class="sec-num">05</span>
          <div>
            <h2 class="sec-title">Inductive Bias — Asumsi yang Memungkinkan Belajar</h2>
            <p class="sec-sub">Setiap algoritma punya asumsi implisit tentang struktur data</p>
          </div>
        </div>

        <div class="prose">
          <strong>Inductive bias</strong> adalah kumpulan asumsi yang dibuat algoritma ML untuk
          melakukan generalisasi dari data latih ke data baru. Tanpa asumsi ini, generalisasi
          tidak mungkin (lihat No Free Lunch Theorem). Setiap pilihan algoritma adalah
          pilihan tentang asumsi apa yang kita percayai tentang data.
        </div>

        <div class="inductive-types">
          <div class="it-card">
            <div class="it-num">1</div>
            <div class="it-title">Relational Bias</div>
            <div class="it-subtitle">Asumsi tentang struktur hubungan antar fitur</div>
            <div class="it-examples">
              <div class="ite-row">
                <span class="ite-algo">Linear Model</span>
                <span class="ite-bias">Hubungan antar fitur dan target adalah linear</span>
              </div>
              <div class="ite-row">
                <span class="ite-algo">CNN</span>
                <span class="ite-bias">Spatial invariance — fitur penting sama di seluruh gambar</span>
              </div>
              <div class="ite-row">
                <span class="ite-algo">RNN/LSTM</span>
                <span class="ite-bias">Urutan waktu penting, ada dependensi jangka panjang</span>
              </div>
              <div class="ite-row">
                <span class="ite-algo">k-NN</span>
                <span class="ite-bias">Titik yang dekat di ruang fitur cenderung punya label sama</span>
              </div>
              <div class="ite-row">
                <span class="ite-algo">Naive Bayes</span>
                <span class="ite-bias">Fitur independen secara kondisional diberikan kelas</span>
              </div>
            </div>
          </div>

          <div class="it-card">
            <div class="it-num">2</div>
            <div class="it-title">Strength of Bias</div>
            <div class="it-subtitle">Seberapa kuat asumsi diberlakukan</div>
            <div class="it-strength-compare">
              <div class="itsc-col">
                <div class="itsc-header">Parametrik (Strong Bias)</div>
                <div class="itsc-items">
                  <div class="itsc-item">Bentuk fungsi diasumsikan (misal: linear)</div>
                  <div class="itsc-item">Jumlah parameter tetap, tidak bergantung N</div>
                  <div class="itsc-item">Butuh lebih sedikit data untuk konvergen</div>
                  <div class="itsc-item">Salah jika asumsi tidak tepat</div>
                </div>
                <div class="itsc-examples">Linear Reg, Logistic Reg, Naive Bayes</div>
              </div>
              <div class="itsc-col">
                <div class="itsc-header">Non-parametrik (Weak Bias)</div>
                <div class="itsc-items">
                  <div class="itsc-item">Asumsi minimal tentang bentuk fungsi</div>
                  <div class="itsc-item">Kompleksitas tumbuh dengan N</div>
                  <div class="itsc-item">Butuh lebih banyak data untuk konvergen</div>
                  <div class="itsc-item">Lebih fleksibel, tapi lebih mudah overfit</div>
                </div>
                <div class="itsc-examples">k-NN, Decision Tree, Kernel SVM</div>
              </div>
            </div>
          </div>
        </div>

        <div class="insight-callout">
          <div class="ic-icon"></div>
          <div class="ic-body">
            <strong>CNN dan Spatial Invariance:</strong> CNN secara eksplisit encode asumsi bahwa
            fitur visual (tepi, tekstur, bentuk) sama pentingnya di semua lokasi gambar —
            itulah mengapa weight sharing bekerja. Tanpa asumsi ini, kita butuh jauh lebih
            banyak parameter dan data untuk mencapai performa yang sama.
          </div>
        </div>
      </section>

      <!-- ═══ SEC 6: NO FREE LUNCH ═══ -->
      <section class="lesson-sec" id="sec-nfl">
        <div class="sec-header">
          <span class="sec-num">06</span>
          <div>
            <h2 class="sec-title">No Free Lunch Theorem</h2>
            <p class="sec-sub">Tidak ada algoritma terbaik untuk semua masalah — ini bukan opini, ini teorema</p>
          </div>
        </div>

        <div class="prose">
          NFL Theorem (Wolpert, 1996) membuktikan secara matematis bahwa jika kita rata-rata
          performa semua algoritma ML di <em>semua</em> distribusi data yang mungkin,
          semua algoritma punya performa yang <strong>sama</strong>.
        </div>

        <div class="nfl-formal">
          <div class="nfl-label">Pernyataan Formal (simplified)</div>
          <div class="nfl-formula">
            Σ_f E[L | f, A₁] = Σ_f E[L | f, A₂] &nbsp; untuk sembarang A₁, A₂
          </div>
          <div class="nfl-note">
            dimana jumlah dilakukan atas semua possible target function f, dan L adalah loss.
          </div>
        </div>

        <div class="nfl-implications">
          <div class="nfli-title">Implikasi Praktis</div>
          <div class="nfli-grid">
            <div class="nfli-card good">
              <div class="nflic-icon">✅</div>
              <div class="nflic-title">Yang berarti...</div>
              <div class="nflic-body">Setiap algoritma punya "niche" — ada distribusi data di mana ia unggul. Tidak ada yang universal inferior.</div>
            </div>
            <div class="nfli-card bad">
              <div class="nflic-icon">❌</div>
              <div class="nflic-title">Yang tidak berarti...</div>
              <div class="nflic-body">Bukan berarti semua algoritma sama baik pada masalah spesifik! Pada domain tertentu (misal: gambar), CNN jelas unggul.</div>
            </div>
            <div class="nfli-card key">
              <div class="nflic-icon"></div>
              <div class="nflic-title">Kesimpulan utama</div>
              <div class="nflic-body">Pilih algoritma berdasarkan asumsi yang sesuai dengan struktur masalahmu. Domain knowledge sangat penting.</div>
            </div>
          </div>
        </div>

        <div class="nfl-compare">
          <div class="nfl-compare-title">Ilustrasi: Algoritma A unggul di distribusi P, kalah di distribusi Q</div>
          <canvas id="nflCanvas" width="560" height="200"></canvas>
        </div>
      </section>

      <!-- ═══ SEC 7: DIAGNOSIS ═══ -->
      <section class="lesson-sec" id="sec-diagnosis">
        <div class="sec-header">
          <span class="sec-num">07</span>
          <div>
            <h2 class="sec-title">Diagnosis — Learning & Complexity Curves</h2>
            <p class="sec-sub">Cara sistematis mendiagnosis apakah masalahnya bias atau variance</p>
          </div>
        </div>

        <div class="prose">
          Sebelum menerapkan solusi, kita perlu <em>mendiagnosis</em> masalahnya dengan tepat.
          Dua alat utama: <strong>Learning Curves</strong> (error vs ukuran dataset) dan
          <strong>Complexity Curves</strong> (error vs kompleksitas model).
        </div>

        <!-- Learning curves -->
        <div class="worked-box">
          <div class="wb-badge"> Learning Curves — Error vs Jumlah Data N</div>
          <div class="wb-title">Pilih skenario untuk melihat pola diagnostik</div>
          <div class="lc-demo">
            <div class="lc-tabs">
              <button class="lc-tab active" onclick="setLC('underfit')">Underfitting</button>
              <button class="lc-tab" onclick="setLC('overfit')">Overfitting</button>
              <button class="lc-tab" onclick="setLC('good')">Good Fit</button>
            </div>
            <canvas id="lcCanvas" width="540" height="240"></canvas>
            <div class="lc-insight" id="lcInsight">
              <strong>Underfitting:</strong> Training dan validation error keduanya tinggi dan konvergen ke nilai yang sama. Menambah data tidak membantu. Masalah ada di model, bukan data.
            </div>
          </div>
        </div>

        <!-- Complexity curves -->
        <div class="worked-box">
          <div class="wb-badge"> Complexity Curves — Error vs Derajat Kebebasan Model</div>
          <div class="wb-title">Temukan sweet spot kompleksitas optimal</div>
          <canvas id="ccCanvas" width="560" height="240"></canvas>
          <div class="cc-legend">
            <span class="ccl-item train">── Training error</span>
            <span class="ccl-item val">── Validation error</span>
            <span class="ccl-item opt">★ Model optimal</span>
          </div>
          <div class="cc-annotations">
            <div class="cca-item bias-zone">High Bias Region</div>
            <div class="cca-item sweet-zone">Sweet Spot</div>
            <div class="cca-item var-zone">High Variance Region</div>
          </div>
        </div>

        <!-- Diagnosis table -->
        <div class="diagnosis-table-wrap">
          <table class="diagnosis-table">
            <thead>
              <tr><th>Gejala</th><th>Diagnosa</th><th>Solusi</th></tr>
            </thead>
            <tbody>
              <tr><td>Train error tinggi, Val error ≈ Train error</td><td class="dt-bias">High Bias</td><td>Model lebih kompleks, lebih banyak fitur</td></tr>
              <tr><td>Train error rendah, Val error jauh lebih tinggi</td><td class="dt-var">High Variance</td><td>Regularisasi, lebih banyak data</td></tr>
              <tr><td>Keduanya tinggi, gap besar</td><td class="dt-both">Bias + Variance</td><td>Model berbeda, lebih banyak data dan reg</td></tr>
              <tr><td>Train ≈ Val error, keduanya rendah</td><td class="dt-good">Good Fit ✓</td><td>Maintain; cek distribusi shift</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ═══ SEC 8: MITIGASI ═══ -->
      <section class="lesson-sec" id="sec-mitigasi">
        <div class="sec-header">
          <span class="sec-num">08</span>
          <div>
            <h2 class="sec-title">Mitigasi — Regularisasi & Ensemble</h2>
            <p class="sec-sub">Teknik spesifik untuk mengurangi bias atau variance</p>
          </div>
        </div>

        <!-- Regularization -->
        <div class="worked-box">
          <div class="wb-badge">️ Regularisasi — Mengurangi Variance</div>
          <div class="wb-title">L1, L2, dan Dropout: cara kerja matematis</div>
          <div class="reg-compare">
            <div class="rc-card l1">
              <div class="rc-name">L1 Regularisasi (Lasso)</div>
              <div class="rc-formula">L_total = L(θ) + λ·Σ|θᵢ|</div>
              <div class="rc-effect">
                <div class="rce-item">Mendorong banyak weight → <strong>tepat nol</strong></div>
                <div class="rce-item">Efek: <strong>feature selection otomatis</strong></div>
                <div class="rce-item">Solusi: sparse weight vector</div>
              </div>
              <canvas class="rc-canvas" id="l1Canvas" width="200" height="120"></canvas>
            </div>
            <div class="rc-card l2">
              <div class="rc-name">L2 Regularisasi (Ridge)</div>
              <div class="rc-formula">L_total = L(θ) + λ·Σθᵢ²</div>
              <div class="rc-effect">
                <div class="rce-item">Mendorong weight → <strong>kecil tapi tidak nol</strong></div>
                <div class="rce-item">Efek: <strong>weight decay</strong> yang halus</div>
                <div class="rce-item">Solusi: weight tersebar merata</div>
              </div>
              <canvas class="rc-canvas" id="l2Canvas" width="200" height="120"></canvas>
            </div>
            <div class="rc-card dropout">
              <div class="rc-name">Dropout (Neural Networks)</div>
              <div class="rc-formula">p(neuron aktif) = 1 − p_drop</div>
              <div class="rc-effect">
                <div class="rce-item">Matikan neuron acak saat training</div>
                <div class="rce-item">Efek: ensemble dari 2ᴺ sub-network</div>
                <div class="rce-item">Mencegah co-adaptation</div>
              </div>
              <canvas class="rc-canvas" id="dropCanvas" width="200" height="120"></canvas>
            </div>
          </div>
        </div>

        <!-- Ensemble methods -->
        <div class="worked-box">
          <div class="wb-badge"> Ensemble Methods — Bagging vs Boosting</div>
          <div class="wb-title">Dua strategi berbeda untuk target yang berbeda</div>
          <div class="ensemble-compare">
            <div class="ec-col bagging">
              <div class="ec-header">Bagging</div>
              <div class="ec-target">Target: kurangi <strong>Variance</strong></div>
              <div class="ec-how">
                <div class="ech-step">Train banyak model secara <strong>paralel</strong></div>
                <div class="ech-arrow">↓</div>
                <div class="ech-step">Setiap model pada <strong>bootstrap sample</strong> berbeda</div>
                <div class="ech-arrow">↓</div>
                <div class="ech-step">Rata-rata prediksi → variance berkurang √k kali</div>
              </div>
              <div class="ec-math">Var[ĥ̄] = σ²/k (jika model independen)</div>
              <div class="ec-example">Contoh: <strong>Random Forest</strong></div>
            </div>
            <div class="ec-col boosting">
              <div class="ec-header">Boosting</div>
              <div class="ec-target">Target: kurangi <strong>Bias</strong></div>
              <div class="ec-how">
                <div class="ech-step">Train model <strong>sekuensial</strong></div>
                <div class="ech-arrow">↓</div>
                <div class="ech-step">Model baru fokus pada <strong>error model sebelumnya</strong></div>
                <div class="ech-arrow">↓</div>
                <div class="ech-step">Gabungkan → weak learners → strong learner</div>
              </div>
              <div class="ec-math">F_T(x) = Σₜ αₜ · hₜ(x)</div>
              <div class="ec-example">Contoh: <strong>XGBoost, AdaBoost</strong></div>
            </div>
          </div>
          <canvas id="ensembleCanvas" width="560" height="180"></canvas>
        </div>
      </section>

      <!-- ═══ SEC 9: DOUBLE DESCENT ═══ -->
      <section class="lesson-sec" id="sec-double">
        <div class="sec-header">
          <span class="sec-num">09</span>
          <div>
            <h2 class="sec-title">Paradoks Modern — Double Descent</h2>
            <p class="sec-sub">Deep learning melanggar "hukum" bias-variance klasik — dan ternyata ada penjelasannya</p>
          </div>
        </div>

        <div class="prose">
          Classical ML theory memprediksi kurva U-shape untuk test error sebagai fungsi
          kompleksitas model. Tapi model modern seperti deep neural networks menunjukkan
          fenomena <strong>double descent</strong> — setelah "puncak" overfitting,
          error turun lagi ketika model menjadi <em>sangat</em> over-parameterized.
        </div>

        <div class="worked-box">
          <div class="wb-badge"> Fenomena Double Descent</div>
          <div class="wb-title">Classical U-curve vs Modern Double Descent</div>
          <canvas id="ddCanvas" width="620" height="280"></canvas>
          <div class="dd-legend">
            <span class="ddl-item classical">── Classical theory (U-curve)</span>
            <span class="ddl-item modern">── Modern observation (double descent)</span>
            <span class="ddl-item threshold">── Interpolation threshold</span>
          </div>
        </div>

        <div class="dd-explanation">
          <div class="dde-title">Mengapa ini terjadi?</div>
          <div class="dde-phases">
            <div class="ddep">
              <div class="ddep-phase">Zona 1: Under-parameterized</div>
              <div class="ddep-desc">Model tidak cukup parameter untuk fit semua data. Sesuai teori klasik — lebih banyak parameter = lebih baik.</div>
            </div>
            <div class="ddep">
              <div class="ddep-phase">Zona 2: Interpolation Threshold</div>
              <div class="ddep-desc">Model bisa persis fit semua training data. Ini adalah puncak test error — model harus "bergelut" untuk fit semua titik.</div>
            </div>
            <div class="ddep">
              <div class="ddep-phase">Zona 3: Over-parameterized (benign overfitting)</div>
              <div class="ddep-desc">Model punya banyak lebih banyak parameter dari data. Tapi SGD+inductive bias memilih solusi yang "smooth" — dan error generalisasi turun kembali!</div>
            </div>
          </div>
        </div>

        <div class="insight-callout">
          <div class="ic-icon"></div>
          <div class="ic-body">
            <strong>Benign Overfitting (Bartlett et al., 2020):</strong> Model yang persis
            menginterpolasi training data bisa tetap generalisasi baik jika dimensi fitur jauh
            lebih besar dari jumlah data. Inilah mengapa GPT-4 (trillions parameter) generalisasi
            baik meski kapasitasnya jauh melebihi ukuran training set yang terlihat.
            Bias-variance tradeoff klasik tidak ditinggalkan — tapi perlu diperluas.
          </div>
        </div>

        <!-- Summary -->
        <div class="bv-summary">
          <div class="bvs-title">Ringkasan — Bias-Variance dalam Satu Pandangan</div>
          <canvas id="summaryCanvas" width="620" height="200"></canvas>
          <div class="bvs-takeaways">
            <div class="bvst-item"><span class="bvsti-dot bias"></span><strong>Bias</strong> → model terlalu sederhana, asumsi terlalu kuat</div>
            <div class="bvst-item"><span class="bvsti-dot var"></span><strong>Variance</strong> → model terlalu kompleks, sensitif terhadap noise</div>
            <div class="bvst-item"><span class="bvsti-dot irr"></span><strong>σ²</strong> → tidak bisa dihilangkan, batas bawah absolut</div>
            <div class="bvst-item"><span class="bvsti-dot opt"></span><strong>Optimal</strong> → minimasi Bias² + Variance secara bersamaan</div>
          </div>
        </div>

        <!-- Next CTA -->
        <div class="next-lesson-cta">
          <div class="nlc-inner">
            <span class="nlc-label">Modul berikutnya</span>
            <h3 class="nlc-title">Supervised Learning →</h3>
            <p class="nlc-desc">Fondasi teoritis sudah kamu kuasai. Saatnya masuk ke algoritma konkret — regresi, klasifikasi Bayesian, logistic regression, SVM, dan neural networks.</p>
            <a href="/pages/ai-lab/machine-learning.html" class="nlc-btn">Kembali ke ML Overview</a>
          </div>
        </div>
      </section>

    </div><!-- /lesson-body -->
  </main>
</div><!-- /lesson-layout -->

<div id="footer-placeholder"></div>
<script src="/js/shared.js"></script>
<script src="/js/lang.js"></script>
<script src="/js/ml-bias-variance.js"></script>
</body>
</html>
</article>
<footer class="lesson-nav-footer"><a href="#/participant-ai-lab-ml-vc-dim"><i class="fas fa-chevron-left"></i> Sebelumnya</a><a href="#/participant-ai-lab-ml">Katalog ML <i class="fas fa-arrow-right"></i></a></footer>
</section></div>
<aside class="lesson-right-panel">
<section class="module-side-card lesson-progress-card"><h2>Progres</h2><div class="lesson-progress-mini"><b style="--value:0%"></b><strong>0%</strong></div><p>Bias-Variance</p><a href="#/participant-ai-lab-ml">Katalog ML</a></section>
<section class="module-side-card lesson-list-card"><h2>Section</h2><ol>
<li class="active"><span>1</span><a href="#sec-intuisi">Intuisi</a><i class="far fa-circle-play"></i></li>
<li><span>2</span><a href="#sec-decomp">Dekomposisi Error</a><i class="far fa-circle"></i></li>
<li><span>3</span><a href="#sec-highbias">High Bias</a><i class="far fa-circle"></i></li>
<li><span>4</span><a href="#sec-highvar">High Variance</a><i class="far fa-circle"></i></li>
<li><span>5</span><a href="#sec-inductive">Inductive Bias</a><i class="far fa-circle"></i></li>
<li><span>6</span><a href="#sec-nfl">No Free Lunch</a><i class="far fa-circle"></i></li>
<li><span>7</span><a href="#sec-diagnosis">Diagnosis & Curves</a><i class="far fa-circle"></i></li>
<li><span>8</span><a href="#sec-mitigasi">Mitigasi</a><i class="far fa-circle"></i></li>
<li><span>9</span><a href="#sec-double">Double Descent</a><i class="far fa-circle"></i></li>
</ol></section>
</aside></div></main></section>

````
