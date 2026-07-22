# Kapasitas Model

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/legacy-lessons/ml-vc-dim.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

01

#### Kapasitas Model

Tidak semua model sama fleksibelnya — bagaimana kita mengukurnya?

Model yang berbeda memiliki **kapasitas** yang berbeda — kemampuan untuk merepresentasikan fungsi yang beragam. Model dengan kapasitas terlalu rendah tidak bisa mempelajari pola yang ada. Model dengan kapasitas terlalu tinggi akan menghafal data latih termasuk noise-nya.

Terlalu rendah
Underfitting

Optimal ✓
Generalisasi baik

Terlalu tinggi
Overfitting

Kapasitas Rendah Kapasitas Tinggi

Pertanyaannya: bagaimana mengukur kapasitas secara *formal* dan *matematis*? Inilah yang dijawab oleh **VC-Dimension** — ukuran kapasitas paling fundamental dalam statistical learning theory.

‍

**Vladimir Vapnik & Alexey Chervonenkis (1971)** mengembangkan teori ini sebagai fondasi dari *Statistical Learning Theory*. Kerja mereka kemudian menjadi dasar dari Support Vector Machine (SVM) dan banyak algoritma modern lainnya.

02

#### Shatter & Definisi VC-Dimension

Konsep "memecah" (shattering) sebagai inti dari VC-dim

Untuk memahami VC-Dimension, kita perlu dulu memahami konsep **shatter**. Model H men-shatter N titik jika ia bisa mengklasifikasikan N titik tersebut dengan *semua kemungkinan pelabelan* yang ada.

Definisi · Shatter (Pemecahan)

Model H **men-shatter** N titik {x⁽¹⁾,...,x⁽ᴺ⁾} jika untuk *setiap* fungsi pelabelan y: {x⁽¹⁾,...,x⁽ᴺ⁾} → {0,1}, terdapat hipotesis h ∈ H yang konsisten dengan pelabelan tersebut.

∀ y: {x⁽¹⁾,...,x⁽ᴺ⁾} → {0,1}, ∃ h ∈ H: h(x⁽ⁱ⁾) = y(x⁽ⁱ⁾) ∀i

N titik → 2ᴺ kemungkinan pelabelan. H harus bisa handle SEMUA 2ᴺ kemungkinan.

Definisi · VC-Dimension

VC-Dimension dari model H, ditulis **VC(H)**, adalah jumlah titik *terbesar* yang bisa di-shatter oleh H.

VC(H) = max{ N | ∃ {x⁽¹⁾,...,x⁽ᴺ⁾} yang bisa di-shatter oleh H }

️ Interactive · Lihat Shatter Secara Langsung

Model Linear (Garis) — Bisa shatter 3 titik, tidak bisa 4

Jumlah titik:

2 titik

3 titik

4 titik

Pilih pelabelan:

✓ Bisa dipisahkan

2 titik 4 pelabelan ✓ Semua bisa dipisahkan

3 titik 8 pelabelan ✓ Semua bisa dipisahkan

4 titik 16 pelabelan ✗ XOR tidak bisa dipisahkan

Dalam graph lengkap dengan 4 simpul, selalu ada 2 edge yang bersilangan. Jika titik positif di ujung satu edge dan negatif di ujung edge lain yang bersilangan, tidak ada garis lurus yang bisa memisahkannya. Ini membuktikan **VC(H\_linear) \< 4**.

Berapa banyak pelabelan yang mungkin?

N titik

2ᴺ pelabelan

Model Linear bisa?

1

2

✓ Ya

2

4

✓ Ya

3

8

✓ Ya — VC-dim = 3

4

16

✗ Tidak

5

32

✗ Tidak

03

#### VC-Dim Model Linear di ℝⁿ = n+1

Bukti intuitif mengapa hyperplane di ℝⁿ memiliki VC-dim tepat n+1

Ini adalah hasil paling penting dalam teori VC: model linear (hyperplane) di ruang berdimensi n memiliki VC-Dimension tepat **n+1**. Artinya ia bisa men-shatter n+1 titik, tapi tidak bisa men-shatter n+2 titik.

Bukti Intuitif — VC(H\_linear di ℝⁿ) = n+1

Dua langkah: tunjukkan bisa shatter n+1, lalu tidak bisa n+2

✓

Bagian 1: H bisa shatter n+1 titik

Ada konfigurasi n+1 titik yang bisa di-shatter

Ambil n+1 titik: vektor basis standar e₁, e₂, ..., eₙ dan titik asal **0**.

Untuk setiap pelabelan y ∈ {0,1}ⁿ⁺¹, kita bisa membangun hyperplane pemisah. Menggunakan solusi sistem linear Wᵀxᵢ = yᵢ yang selalu memiliki solusi karena n+1 titik ini linearly independent.

Titik: {0, e₁, e₂, ..., eₙ} — n+1 titik linearly independent
 → Selalu ada hyperplane memisahkan semua 2ⁿ⁺¹ pelabelan

✗

Bagian 2: H tidak bisa shatter n+2 titik

Untuk sembarang n+2 titik, selalu ada pelabelan yang tidak bisa dipisahkan

Ambil sembarang n+2 titik di ℝⁿ. Karena dimensi ℝⁿ adalah n, pasti ada dependensi linear — satu titik bisa dinyatakan sebagai kombinasi linear titik lain:

x⁽ᵏ⁾ = Σᵢ αᵢ x⁽ⁱ⁾, dengan αᵢ ∈ ℝ

Pelabelan yang membuat titik-titik dengan koefisien positif (+) dan negatif (−) tidak bisa dipisahkan oleh hyperplane manapun — karena sifat linearitas.

ℝ¹

Threshold

VC = **2**

Garis bilangan — bisa shatter 2 titik, tidak 3

ℝ²

Garis Lurus

VC = **3**

Bidang — bisa shatter 3 titik, tidak 4 (XOR)

ℝ³

Hyperplane

VC = **4**

Ruang 3D — bisa shatter 4 titik, tidak 5

ℝⁿ

Hyperplane

VC = **n+1**

Rumus umum: n dimensi → VC = n+1

**Hubungan dengan Parameter:** Model linear di ℝⁿ memiliki n+1 parameter (n bobot + 1 bias). VC-dim = n+1 = jumlah parameter. Ini bukan kebetulan — secara umum, model dengan p parameter bebas cenderung memiliki VC-dim ≈ p. Tapi ini *bukan aturan pasti* — ada model dengan banyak parameter yang VC-dim-nya kecil.

04

#### VC-Dim Berbagai Model

Dari model sederhana hingga tak terhingga — perbandingan kapasitas

VC-Dimension berbeda-beda untuk setiap keluarga model. Tabel berikut adalah referensi penting yang harus dikuasai setiap ML practitioner.

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
Ruang
VC(H)
Penjelasan</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Threshold (f(x) = 𝟙[x ≥ θ])
<code>ℝ¹</code>
1
Hanya 1 titik yang bisa di-shatter</td>
<td align="left">Interval (𝟙[a ≤ x ≤ b])
<code>ℝ¹</code>
2
Bisa shatter 2 titik, tidak 3</td>
<td align="left">Garis lurus (linear classifier)
<code>ℝ²</code>
3
VC = n+1 = 2+1 = 3</td>
<td align="left">Hyperplane
<code>ℝⁿ</code>
n+1
Rumus umum: VC = dimensi + 1</td>
</tr>
</tbody>
</table>

️ Interactive · Perbandingan Kapasitas

Pilih model — lihat apa yang bisa dan tidak bisa ia shatter

Garis (VC=3)

Persegi (VC=4)

Lingkaran (VC=1)

VC-Dim = 3

Model garis lurus bisa men-shatter 3 titik (semua 8 pelabelan), tapi tidak bisa men-shatter 4 titik karena XOR tidak linearly separable.

05

#### Worked Problems — Hitung VC-Dim

Latihan formal: buktikan VC-dim dengan dua langkah — shatter N, gagal N+1

Membuktikan VC(H) = N selalu membutuhkan **dua langkah**: (1) tunjukkan ada konfigurasi N titik yang bisa di-shatter, dan (2) tunjukkan untuk sembarang N+1 titik, selalu ada pelabelan yang tidak bisa dipisahkan. Jika hanya langkah 1, itu hanya membuktikan VC(H) ≥ N.

✏️ Contoh 1 · Interval [a, b] di ℝ¹

Buktikan VC(H\_interval) = 2

✓

Langkah 1 — H bisa shatter 2 titik

Ambil 2 titik: x₁ \< x₂. Ada 4 pelabelan:

y₁y₂Interval yang memisahkan

00[∞, −∞] (kosong)✓

10[x₁−ε, x₁+ε]✓

01[x₂−ε, x₂+ε]✓

11[x₁−ε, x₂+ε]✓

Semua 2² = 4 pelabelan bisa direpresentasikan → H *shatter* 2 titik.

✗

Langkah 2 — H tidak bisa shatter 3 titik

Ambil sembarang 3 titik: x₁ \< x₂ \< x₃. Pertimbangkan pelabelan y = (1, 0, 1):

Agar x₁ positif, interval harus mencakup x₁. Agar x₃ positif, interval harus mencakup x₃. Tapi interval adalah *kontinu* — jika mencakup x₁ dan x₃, ia *pasti* mencakup x₂ di antaranya. Kontradiksi dengan y₂ = 0.

Pelabelan (1,0,1) ≡ XOR-like — tidak bisa direalisasikan oleh interval kontinu apapun.
∴ VC(H\_interval) \< 3, sehingga VC(H\_interval) = 2. □

✏️ Contoh 2 · Persegi Panjang Axis-Aligned di ℝ²

Buktikan VC(H\_rect) = 4

✓

Langkah 1 — H bisa shatter 4 titik

Ambil 4 titik membentuk "diamond" (bukan persegi): N, S, E, W. Untuk setiap subset titik yang ingin diberi label 1, ambil persegi panjang terkecil yang mencakup tepat titik-titik tersebut.

Semua 2⁴ = 16 pelabelan bisa direpresentasikan (termasuk ∅ = persegi panjang di luar semua titik).

✗

Langkah 2 — H tidak bisa shatter 5 titik

Ambil sembarang 5 titik. Dari 5 titik tersebut, selalu ada satu yang berada *di dalam* convex hull dari 4 titik lainnya. Sebut titik tersebut x\_mid.

Pertimbangkan pelabelan: semua titik luar = 1, x\_mid = 0. Persegi panjang apapun yang mencakup 4 titik luar *pasti* mencakup x\_mid juga. Tidak ada persegi panjang yang bisa merealisasikan pelabelan ini.

∴ VC(H\_rect) \< 5, sehingga VC(H\_rect) = 4. □

Contoh 3 · 1-Nearest Neighbor (Paradoks)

VC(H\_1NN) = ∞ — tapi parameternya 0!

1-NN tidak punya parameter yang dioptimalkan saat training. Tapi VC-dimensinya tak terhingga — ini membuktikan bahwa VC-dim ≠ jumlah parameter.

✓

1-NN bisa shatter N titik sembarang untuk N berapa saja

Untuk sembarang N titik dengan pelabelan apapun: 1-NN mengklasifikasikan setiap titik sesuai label titik terdekatnya di training set. Jika training set = test set, semua titik diklasifikasikan benar.

Untuk sembarang {x⁽¹⁾,...,x⁽ᴺ⁾} dan sembarang labeling y:
 h\_1NN dilatih pada {(x⁽ⁱ⁾, yᵢ)} → h\_1NN(x⁽ⁱ⁾) = yᵢ ∀i
 ∴ 1-NN shatter sembarang N titik → VC(H\_1NN) = ∞

Model\# ParameterVC-DimKeterangan

Linear ℝⁿn+1n+1Parameter = VC-dim

Polynomial degree dC(n+d,d)C(n+d,d)Sesuai jumlah parameter

1-Nearest Neighbor0∞0 parameter, kapasitas ∞!

Lookup TableN∞Menghafal data, tidak generalisasi

SVM (hard margin)n+1≤ R²/γ²VC-dim bergantung margin γ, bukan n!

**Pelajaran:** VC-dim mengukur kapasitas *fungsional*, bukan jumlah parameter. SVM bisa punya VC-dim kecil meski berdimensi tinggi — karena memaksimalkan margin γ secara efektif membatasi kapasitas. Inilah mengapa SVM generalisasi baik di ruang berdimensi tinggi.

Teori Lanjutan · Growth Function & Sauer's Lemma

Mengapa VC-dim cukup untuk karakterisasi learnability?

VC-dim bekerja melalui konsep **growth function** — jumlah maksimal pola berbeda yang bisa direalisasikan model pada N titik.

Definisi · Growth Function Π\_H(N)

Π\_H(N) = max<sub>{x⁽¹⁾,...,x⁽ᴺ⁾}</sub> |{ (h(x⁽¹⁾),...,h(x⁽ᴺ⁾)) | h ∈ H }|

Jumlah pola klasifikasi berbeda yang bisa dihasilkan H pada N titik terbaik

Sauer's Lemma (1972)

Jika VC(H) = d, maka:   Π\_H(N) ≤ Σₖ₌₀ᵈ C(N,k) ≤ (eN/d)ᵈ

Jika N ≤ d: Π\_H(N) = 2ᴺ — semua pelabelan mungkin (exponential)

Jika N \> d: Π\_H(N) ≤ O(Nᵈ) — polynomial dalam N! Growth "patah"

"Patahnya" growth function dari exponential ke polynomial inilah yang memungkinkan generalisasi. Model dengan VC-dim terhingga *pasti* bisa belajar dengan data yang cukup.

06

#### VC-Dim & Batas Atas Error Generalisasi

Teorema fundamental: hubungan antara kapasitas, data, dan kemampuan belajar

VC-Dimension bukan hanya ukuran teoretis — ia memberikan **batas atas (upper bound)** yang dapat dihitung untuk error generalisasi model kita. Ini adalah jantung dari Statistical Learning Theory.

Teorema · VC Generalization Bound

E\*(h) ≤ E(h|D) + √( VC(H)·[log(2N/VC(H)) + 1] − log(η/4) ) / N

E\*(h)Error generalisasi (yang ingin kita minimasi)

E(h|D)Empirical error pada training data

VC(H)VC-Dimension model

NJumlah training examples

ηProbabilitas bound tidak berlaku (biasanya 0.05)

Bound ini berlaku dengan probabilitas ≥ 1−η untuk semua h ∈ H secara simultan.

Kalkulator · VC Bound Real-time

Lihat bagaimana N dan VC(H) mempengaruhi batas error

Training examples N 100

VC-Dimension VC(H) 5

Empirical error E(h|D) 5%

Complexity penalty (VC confidence) —

Empirical error 5%

Batas atas error generalisasi —

── Empirical error ── Complexity penalty ── Upper bound generalisasi ── True generalization error (approx)

Lebih banyak data N → bound lebih ketat

Complexity penalty ∝ 1/√N. Dengan N → ∞, bound mendekati empirical error. Ini membenarkan "lebih banyak data selalu membantu".

⬆️

VC(H) lebih besar → bound lebih longgar

Model dengan kapasitas tinggi punya complexity penalty lebih besar. Bahkan jika empirical error = 0, bound generalisasi bisa sangat besar.

⚖️

Tradeoff fundamental

Kapasitas lebih besar → empirical error lebih kecil, tapi complexity penalty lebih besar. Kapasitas optimal meminimalkan jumlah keduanya.

07

#### Structural Risk Minimization (SRM)

Menggunakan VC-bound untuk memilih model yang optimal

VC bound memberikan resep praktis untuk pemilihan model: pilih model yang meminimalkan *jumlah* empirical error dan complexity penalty. Prinsip ini disebut **Structural Risk Minimization (SRM)**.

── Empirical error E(h|D) — turun seiring kapasitas naik

── VC confidence — naik seiring kapasitas naik

── Upper bound E\* = E(h|D) + VC confidence

★ Model optimal H\* — minimum upper bound

1

Susun keluarga model H₁ ⊂ H₂ ⊂ ... ⊂ Hₙ

Urutkan model dari VC-dim kecil ke besar: VC(H₁) ≤ VC(H₂) ≤ ... ≤ VC(Hₙ). Contoh: linear → polynomial degree 2 → degree 3 → ...

2

Untuk setiap Hₖ, latih hipotesis terbaik hₖ\*

hₖ\* = argmin E(h|D) untuk h ∈ Hₖ. Hitung empirical error E(hₖ\*|D) dan VC confidence Ωₖ = f(VC(Hₖ), N).

3

Pilih k\* yang meminimalkan E(hₖ\*|D) + Ωₖ

Model optimal adalah yang meminimalkan batas atas generalisasi, bukan hanya empirical error. Ini secara eksplisit mencegah overfitting.

**Mengapa SVM optimal secara VC?** Support Vector Machine secara eksplisit memaksimalkan margin — dan terbukti bahwa memaksimalkan margin ekuivalen dengan meminimalkan VC-dimension yang efektif, yang meminimalkan upper bound generalisasi. Ini adalah alasan matematis mengapa SVM bekerja dengan baik bahkan di dimensi tinggi.

⚠️ Keterbatasan VC-Dimension

**Bound sangat pesimistis** — dalam praktik, model sering generalisasi jauh lebih baik dari yang dijamin bound. VC bound adalah *worst-case*.

**Mengabaikan distribusi data** — VC-dim tidak memperhitungkan bahwa beberapa pelabelan lebih mungkin daripada yang lain.

**Sulit dihitung** — untuk model kompleks seperti deep neural network, menghitung VC-dim eksak sangat sulit. Alternatif modern: Rademacher complexity, PAC-Bayes bounds.

Lesson berikutnya

##### Bias-Variance Tradeoff →

VC-dim memberi kita upper bound teoritis. Bias-Variance decomposition memberi perspektif berbeda — bagaimana error model bisa didekomposisi menjadi komponen yang bisa dianalisis dan diminimasi.

[Lanjut ke Bias-Variance](#/participant-ai-lab-ml-bias-variance)

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
<nav class="lesson-breadcrumb"><a href="#/participant-ai-lab-ml"><i class="fas fa-arrow-left"></i><span>ML</span></a><span class="lesson-breadcrumb-separator"><i class="fas fa-arrow-right"></i></span><span>VC Dimension</span></nav>
<div class="fellow-actions">
<label class="fellow-search"><i class="fas fa-magnifying-glass"></i><input type="search" placeholder="Cari..."></label>
<button type="button" class="fellow-icon-button" aria-label="Notifikasi"><i class="far fa-bell"></i><span>5</span></button>
<a href="#/participant-profile" class="fellow-user-button"><span class="avatar-img"></span><span><strong>Aisyah Putri</strong><small>Peserta</small></span><i class="fas fa-chevron-down"></i></a>
</div>
</header>
<div class="lesson-layout"><div class="lesson-main-content">
<section class="lesson-hero compact"><div class="lesson-hero-copy">
<h1>VC Dimension &amp; Kapasitas Model</h1>
<p>Vapnik-Chervonenkis dimension sebagai ukuran kapasitas model — berapa banyak titik yang bisa di-shatter oleh H.</p>
<div class="lesson-meta-row"><span><i class="far fa-clock"></i> 55 menit</span><span><i class="fas fa-layer-group"></i> ML · Pengantar ML</span><b><i class="fas fa-ruler-combined"></i> Matematis</b></div>
</div><img src="/assets/messaging/herai-chat-persona.png" alt="HerAI VC-Dim"></section>
<section class="lesson-material-panel">
<div class="lesson-tabs"><a href="#/participant-ai-lab-ml-vc-dim" class="active"><i class="fas fa-book-open"></i> Materi</a><a href="#/participant-ai-lab-ml"><i class="fas fa-layer-group"></i> Katalog ML</a></div>
<article class="lesson-article ai-lab-content" id="vcdim-content">


      <!-- ═══ SEC 1: KAPASITAS ═══ -->
      <section class="lesson-sec" id="sec-kapasitas">
        <div class="sec-header">
          <span class="sec-num">01</span>
          <div>
            <h2 class="sec-title">Kapasitas Model</h2>
            <p class="sec-sub">Tidak semua model sama fleksibelnya — bagaimana kita mengukurnya?</p>
          </div>
        </div>

        <div class="prose">
          Model yang berbeda memiliki <strong>kapasitas</strong> yang berbeda — kemampuan untuk
          merepresentasikan fungsi yang beragam. Model dengan kapasitas terlalu rendah
          tidak bisa mempelajari pola yang ada. Model dengan kapasitas terlalu tinggi
          akan menghafal data latih termasuk noise-nya.
        </div>

        <!-- Capacity spectrum visual -->
        <div class="capacity-spectrum">
          <div class="cs-track">
            <div class="cs-fill"></div>
            <div class="cs-marker" style="left:15%">
              <div class="csm-dot low"></div>
              <div class="csm-label">Terlalu rendah<br><span>Underfitting</span></div>
            </div>
            <div class="cs-marker sweet" style="left:50%">
              <div class="csm-dot sweet"></div>
              <div class="csm-label sweet">Optimal ✓<br><span>Generalisasi baik</span></div>
            </div>
            <div class="cs-marker" style="left:85%">
              <div class="csm-dot high"></div>
              <div class="csm-label right">Terlalu tinggi<br><span>Overfitting</span></div>
            </div>
          </div>
          <div class="cs-axis">
            <span>Kapasitas Rendah</span>
            <span>Kapasitas Tinggi</span>
          </div>
        </div>

        <div class="prose">
          Pertanyaannya: bagaimana mengukur kapasitas secara <em>formal</em> dan <em>matematis</em>?
          Inilah yang dijawab oleh <strong>VC-Dimension</strong> — ukuran kapasitas paling fundamental
          dalam statistical learning theory.
        </div>

        <div class="insight-callout">
          <div class="ic-icon">‍</div>
          <div class="ic-body">
            <strong>Vladimir Vapnik & Alexey Chervonenkis (1971)</strong> mengembangkan teori ini
            sebagai fondasi dari <em>Statistical Learning Theory</em>. Kerja mereka kemudian
            menjadi dasar dari Support Vector Machine (SVM) dan banyak algoritma modern lainnya.
          </div>
        </div>
      </section>

      <!-- ═══ SEC 2: SHATTER ═══ -->
      <section class="lesson-sec" id="sec-shatter">
        <div class="sec-header">
          <span class="sec-num">02</span>
          <div>
            <h2 class="sec-title">Shatter & Definisi VC-Dimension</h2>
            <p class="sec-sub">Konsep "memecah" (shattering) sebagai inti dari VC-dim</p>
          </div>
        </div>

        <div class="prose">
          Untuk memahami VC-Dimension, kita perlu dulu memahami konsep <strong>shatter</strong>.
          Model H men-shatter N titik jika ia bisa mengklasifikasikan N titik tersebut
          dengan <em>semua kemungkinan pelabelan</em> yang ada.
        </div>

        <div class="def-box">
          <div class="def-label">Definisi · Shatter (Pemecahan)</div>
          <div class="def-body">
            Model H <strong>men-shatter</strong> N titik {x⁽¹⁾,...,x⁽ᴺ⁾} jika untuk
            <em>setiap</em> fungsi pelabelan y: {x⁽¹⁾,...,x⁽ᴺ⁾} → {0,1},
            terdapat hipotesis h ∈ H yang konsisten dengan pelabelan tersebut.
          </div>
          <div class="def-formula">
            ∀ y: {x⁽¹⁾,...,x⁽ᴺ⁾} → {0,1},  ∃ h ∈ H: h(x⁽ⁱ⁾) = y(x⁽ⁱ⁾) ∀i
          </div>
          <div class="def-note">
            N titik → 2ᴺ kemungkinan pelabelan. H harus bisa handle SEMUA 2ᴺ kemungkinan.
          </div>
        </div>

        <div class="def-box accent-blue">
          <div class="def-label">Definisi · VC-Dimension</div>
          <div class="def-body">
            VC-Dimension dari model H, ditulis <strong>VC(H)</strong>, adalah
            jumlah titik <em>terbesar</em> yang bisa di-shatter oleh H.
          </div>
          <div class="def-formula">
            VC(H) = max{ N | ∃ {x⁽¹⁾,...,x⁽ᴺ⁾} yang bisa di-shatter oleh H }
          </div>
        </div>

        <!-- Interactive shatter demo -->
        <div class="worked-box">
          <div class="wb-badge">️ Interactive · Lihat Shatter Secara Langsung</div>
          <div class="wb-title">Model Linear (Garis) — Bisa shatter 3 titik, tidak bisa 4</div>

          <div class="shatter-demo">
            <div class="sd-controls">
              <div class="sd-ctrl-label">Jumlah titik:</div>
              <div class="sd-btns">
                <button class="sd-btn active" onclick="setPoints(2)">2 titik</button>
                <button class="sd-btn" onclick="setPoints(3)">3 titik</button>
                <button class="sd-btn" onclick="setPoints(4)">4 titik</button>
              </div>
              <div class="sd-ctrl-label" style="margin-top:12px">Pilih pelabelan:</div>
              <div class="sd-labelings" id="labelingBtns"></div>
            </div>
            <div class="sd-canvas-wrap">
              <canvas id="shatterCanvas" width="360" height="300"></canvas>
              <div class="sd-status" id="shatterStatus">
                <span class="ss-icon" id="ssIcon">✓</span>
                <span id="ssText">Bisa dipisahkan</span>
              </div>
            </div>
          </div>

          <div class="shatter-summary" id="shatterSummary">
            <div class="ss-row">
              <span class="ssr-n">2 titik</span>
              <span class="ssr-count">4 pelabelan</span>
              <span class="ssr-result ok">✓ Semua bisa dipisahkan</span>
            </div>
            <div class="ss-row">
              <span class="ssr-n">3 titik</span>
              <span class="ssr-count">8 pelabelan</span>
              <span class="ssr-result ok">✓ Semua bisa dipisahkan</span>
            </div>
            <div class="ss-row active">
              <span class="ssr-n">4 titik</span>
              <span class="ssr-count">16 pelabelan</span>
              <span class="ssr-result fail">✗ XOR tidak bisa dipisahkan</span>
            </div>
          </div>
          <div class="insight-callout" style="margin-top:12px">
            <div class="ic-icon"></div>
            <div class="ic-body">
              Dalam graph lengkap dengan 4 simpul, selalu ada 2 edge yang bersilangan.
              Jika titik positif di ujung satu edge dan negatif di ujung edge lain yang bersilangan,
              tidak ada garis lurus yang bisa memisahkannya. Ini membuktikan <strong>VC(H_linear) &lt; 4</strong>.
            </div>
          </div>
        </div>

        <div class="shatter-count-table">
          <div class="sct-title">Berapa banyak pelabelan yang mungkin?</div>
          <div class="sct-grid">
            <div class="sct-header">N titik</div>
            <div class="sct-header">2ᴺ pelabelan</div>
            <div class="sct-header">Model Linear bisa?</div>
            <div class="sct-val">1</div><div class="sct-val">2</div><div class="sct-val ok">✓ Ya</div>
            <div class="sct-val">2</div><div class="sct-val">4</div><div class="sct-val ok">✓ Ya</div>
            <div class="sct-val highlight">3</div><div class="sct-val highlight">8</div><div class="sct-val ok highlight">✓ Ya — VC-dim = 3</div>
            <div class="sct-val">4</div><div class="sct-val">16</div><div class="sct-val fail">✗ Tidak</div>
            <div class="sct-val">5</div><div class="sct-val">32</div><div class="sct-val fail">✗ Tidak</div>
          </div>
        </div>
      </section>

      <!-- ═══ SEC 3: LINEAR MODEL VC-DIM ═══ -->
      <section class="lesson-sec" id="sec-linear">
        <div class="sec-header">
          <span class="sec-num">03</span>
          <div>
            <h2 class="sec-title">VC-Dim Model Linear di ℝⁿ = n+1</h2>
            <p class="sec-sub">Bukti intuitif mengapa hyperplane di ℝⁿ memiliki VC-dim tepat n+1</p>
          </div>
        </div>

        <div class="prose">
          Ini adalah hasil paling penting dalam teori VC: model linear (hyperplane) di ruang
          berdimensi n memiliki VC-Dimension tepat <strong>n+1</strong>.
          Artinya ia bisa men-shatter n+1 titik, tapi tidak bisa men-shatter n+2 titik.
        </div>

        <!-- Step by step proof intuition -->
        <div class="worked-box">
          <div class="wb-badge"> Bukti Intuitif — VC(H_linear di ℝⁿ) = n+1</div>
          <div class="wb-title">Dua langkah: tunjukkan bisa shatter n+1, lalu tidak bisa n+2</div>

          <div class="proof-steps">
            <div class="ps-part">
              <div class="psp-header ok">
                <span class="psp-icon">✓</span>
                <div>
                  <div class="psp-title">Bagian 1: H bisa shatter n+1 titik</div>
                  <div class="psp-sub">Ada konfigurasi n+1 titik yang bisa di-shatter</div>
                </div>
              </div>
              <div class="psp-body">
                <p>Ambil n+1 titik: vektor basis standar e₁, e₂, ..., eₙ dan titik asal <strong>0</strong>.</p>
                <p>Untuk setiap pelabelan y ∈ {0,1}ⁿ⁺¹, kita bisa membangun hyperplane pemisah. Menggunakan solusi sistem linear Wᵀxᵢ = yᵢ yang selalu memiliki solusi karena n+1 titik ini linearly independent.</p>
                <div class="proof-formula">
                  Titik: {0, e₁, e₂, ..., eₙ} — n+1 titik linearly independent<br>
                  → Selalu ada hyperplane memisahkan semua 2ⁿ⁺¹ pelabelan
                </div>
              </div>
            </div>

            <div class="ps-part">
              <div class="psp-header fail">
                <span class="psp-icon">✗</span>
                <div>
                  <div class="psp-title">Bagian 2: H tidak bisa shatter n+2 titik</div>
                  <div class="psp-sub">Untuk sembarang n+2 titik, selalu ada pelabelan yang tidak bisa dipisahkan</div>
                </div>
              </div>
              <div class="psp-body">
                <p>Ambil sembarang n+2 titik di ℝⁿ. Karena dimensi ℝⁿ adalah n, pasti ada dependensi linear — satu titik bisa dinyatakan sebagai kombinasi linear titik lain:</p>
                <div class="proof-formula">
                  x⁽ᵏ⁾ = Σᵢ αᵢ x⁽ⁱ⁾,  dengan αᵢ ∈ ℝ
                </div>
                <p>Pelabelan yang membuat titik-titik dengan koefisien positif (+) dan negatif (−) tidak bisa dipisahkan oleh hyperplane manapun — karena sifat linearitas.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Dimension examples -->
        <div class="dim-examples">
          <div class="de-item">
            <div class="de-dim">ℝ¹</div>
            <div class="de-model">Threshold</div>
            <div class="de-vc">VC = <strong>2</strong></div>
            <div class="de-desc">Garis bilangan — bisa shatter 2 titik, tidak 3</div>
            <canvas class="de-canvas" id="de1" width="200" height="80"></canvas>
          </div>
          <div class="de-item">
            <div class="de-dim">ℝ²</div>
            <div class="de-model">Garis Lurus</div>
            <div class="de-vc">VC = <strong>3</strong></div>
            <div class="de-desc">Bidang — bisa shatter 3 titik, tidak 4 (XOR)</div>
            <canvas class="de-canvas" id="de2" width="200" height="80"></canvas>
          </div>
          <div class="de-item">
            <div class="de-dim">ℝ³</div>
            <div class="de-model">Hyperplane</div>
            <div class="de-vc">VC = <strong>4</strong></div>
            <div class="de-desc">Ruang 3D — bisa shatter 4 titik, tidak 5</div>
            <canvas class="de-canvas" id="de3" width="200" height="80"></canvas>
          </div>
          <div class="de-item">
            <div class="de-dim">ℝⁿ</div>
            <div class="de-model">Hyperplane</div>
            <div class="de-vc">VC = <strong>n+1</strong></div>
            <div class="de-desc">Rumus umum: n dimensi → VC = n+1</div>
            <canvas class="de-canvas" id="den" width="200" height="80"></canvas>
          </div>
        </div>

        <div class="insight-callout">
          <div class="ic-icon"></div>
          <div class="ic-body">
            <strong>Hubungan dengan Parameter:</strong> Model linear di ℝⁿ memiliki n+1 parameter
            (n bobot + 1 bias). VC-dim = n+1 = jumlah parameter. Ini bukan kebetulan — secara
            umum, model dengan p parameter bebas cenderung memiliki VC-dim ≈ p.
            Tapi ini <em>bukan aturan pasti</em> — ada model dengan banyak parameter yang VC-dim-nya kecil.
          </div>
        </div>
      </section>

      <!-- ═══ SEC 4: VC-DIM BERBAGAI MODEL ═══ -->
      <section class="lesson-sec" id="sec-models">
        <div class="sec-header">
          <span class="sec-num">04</span>
          <div>
            <h2 class="sec-title">VC-Dim Berbagai Model</h2>
            <p class="sec-sub">Dari model sederhana hingga tak terhingga — perbandingan kapasitas</p>
          </div>
        </div>

        <div class="prose">
          VC-Dimension berbeda-beda untuk setiap keluarga model. Tabel berikut adalah
          referensi penting yang harus dikuasai setiap ML practitioner.
        </div>

        <div class="vc-table-wrap">
          <table class="vc-table">
            <thead>
              <tr>
                <th>Model H</th>
                <th>Ruang</th>
                <th>VC(H)</th>
                <th>Penjelasan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="vct-model">Threshold (f(x) = 𝟙[x ≥ θ])</td>
                <td><code>ℝ¹</code></td>
                <td class="vct-num">1</td>
                <td>Hanya 1 titik yang bisa di-shatter</td>
              </tr>
              <tr>
                <td class="vct-model">Interval (𝟙[a ≤ x ≤ b])</td>
                <td><code>ℝ¹</code></td>
                <td class="vct-num">2</td>
                <td>Bisa shatter 2 titik, tidak 3</td>
              </tr>
              <tr class="vct-highlight">
                <td class="vct-model">Garis lurus (linear classifier)</td>
                <td><code>ℝ²</code></td>
                <td class="vct-num blue">3</td>
                <td>VC = n+1 = 2+1 = 3</td>
              </tr>
              <tr class="vct-highlight">
                <td class="vct-model">Hyperplane</td>
                <td><code>ℝⁿ</code></td>
                <td class="vct-num blue">n+1</td>
                <td>Rumus umum: VC = dimensi + 1</td>
              </tr>
              <tr>
                <td class="vct-model">Persegi panjang axis-aligned</td>
                <td><code>ℝ²</code></td>
                <td class="vct-num purple">4</td>
                <td>4 parameter (x1,x2,y1,y2) → VC = 4</td>
              </tr>
              <tr>
                <td class="vct-model">Lingkaran di pusat asal</td>
                <td><code>ℝ²</code></td>
                <td class="vct-num purple">1</td>
                <td>Hanya 1 parameter (radius) → kapasitas kecil</td>
              </tr>
              <tr>
                <td class="vct-model">Poligon konveks (k sisi)</td>
                <td><code>ℝ²</code></td>
                <td class="vct-num orange">2k</td>
                <td>Semakin banyak sisi, kapasitas makin besar</td>
              </tr>
              <tr>
                <td class="vct-model">Neural Network (1 hidden, h unit)</td>
                <td><code>ℝⁿ</code></td>
                <td class="vct-num orange">O(h·n·log(h·n))</td>
                <td>Tumbuh dengan jumlah unit tersembunyi</td>
              </tr>
              <tr>
                <td class="vct-model">Lookup table (memorize)</td>
                <td><code>ℝⁿ</code></td>
                <td class="vct-num red">∞</td>
                <td>Bisa shatter sembarang jumlah titik — tapi tidak bisa generalisasi!</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Interactive: compare models -->
        <div class="worked-box">
          <div class="wb-badge">️ Interactive · Perbandingan Kapasitas</div>
          <div class="wb-title">Pilih model — lihat apa yang bisa dan tidak bisa ia shatter</div>
          <div class="model-compare">
            <div class="mc-selector">
              <button class="mc-btn active" onclick="selectModel('line')">Garis (VC=3)</button>
              <button class="mc-btn" onclick="selectModel('rect')">Persegi (VC=4)</button>
              <button class="mc-btn" onclick="selectModel('circle')">Lingkaran (VC=1)</button>
            </div>
            <div class="mc-canvas-wrap">
              <canvas id="modelCompareCanvas" width="480" height="280"></canvas>
            </div>
            <div class="mc-info" id="mcInfo">
              <div class="mci-vc">VC-Dim = <span id="mcVcVal">3</span></div>
              <div class="mci-desc" id="mcDesc">Model garis lurus bisa men-shatter 3 titik (semua 8 pelabelan), tapi tidak bisa men-shatter 4 titik karena XOR tidak linearly separable.</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ SEC 5: WORKED PROBLEMS ═══ -->
      <section class="lesson-sec" id="sec-worked">
        <div class="sec-header">
          <span class="sec-num">05</span>
          <div>
            <h2 class="sec-title">Worked Problems — Hitung VC-Dim</h2>
            <p class="sec-sub">Latihan formal: buktikan VC-dim dengan dua langkah — shatter N, gagal N+1</p>
          </div>
        </div>

        <div class="prose">
          Membuktikan VC(H) = N selalu membutuhkan <strong>dua langkah</strong>:
          (1) tunjukkan ada konfigurasi N titik yang bisa di-shatter, dan
          (2) tunjukkan untuk sembarang N+1 titik, selalu ada pelabelan yang tidak bisa dipisahkan.
          Jika hanya langkah 1, itu hanya membuktikan VC(H) ≥ N.
        </div>

        <!-- Worked 1: Interval -->
        <div class="worked-box">
          <div class="wb-badge">✏️ Contoh 1 · Interval [a, b] di ℝ¹</div>
          <div class="wb-title">Buktikan VC(H_interval) = 2</div>
          <div class="wp-proof">
            <div class="wpp-step">
              <div class="wpp-num ok">✓</div>
              <div class="wpp-body">
                <div class="wpp-title">Langkah 1 — H bisa shatter 2 titik</div>
                <p>Ambil 2 titik: x₁ &lt; x₂. Ada 4 pelabelan:</p>
                <div class="wp-table">
                  <div class="wpt-row header"><span>y₁</span><span>y₂</span><span>Interval yang memisahkan</span><span></span></div>
                  <div class="wpt-row"><span>0</span><span>0</span><span>[∞, −∞] (kosong)</span><span class="ok">✓</span></div>
                  <div class="wpt-row"><span>1</span><span>0</span><span>[x₁−ε, x₁+ε]</span><span class="ok">✓</span></div>
                  <div class="wpt-row"><span>0</span><span>1</span><span>[x₂−ε, x₂+ε]</span><span class="ok">✓</span></div>
                  <div class="wpt-row"><span>1</span><span>1</span><span>[x₁−ε, x₂+ε]</span><span class="ok">✓</span></div>
                </div>
                <p>Semua 2² = 4 pelabelan bisa direpresentasikan → H <em>shatter</em> 2 titik.</p>
              </div>
            </div>
            <div class="wpp-step">
              <div class="wpp-num fail">✗</div>
              <div class="wpp-body">
                <div class="wpp-title">Langkah 2 — H tidak bisa shatter 3 titik</div>
                <p>Ambil sembarang 3 titik: x₁ &lt; x₂ &lt; x₃. Pertimbangkan pelabelan y = (1, 0, 1):</p>
                <div class="wp-visual" id="wp-interval-vis">
                  <canvas id="wpIntervalCanvas" width="500" height="90"></canvas>
                </div>
                <p>Agar x₁ positif, interval harus mencakup x₁. Agar x₃ positif, interval harus mencakup x₃. Tapi interval adalah <em>kontinu</em> — jika mencakup x₁ dan x₃, ia <em>pasti</em> mencakup x₂ di antaranya. Kontradiksi dengan y₂ = 0.</p>
                <div class="proof-formula">
                  Pelabelan (1,0,1) ≡ XOR-like — tidak bisa direalisasikan oleh interval kontinu apapun.
                  <br>∴ VC(H_interval) &lt; 3, sehingga VC(H_interval) = 2. □
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Worked 2: Rectangle -->
        <div class="worked-box">
          <div class="wb-badge">✏️ Contoh 2 · Persegi Panjang Axis-Aligned di ℝ²</div>
          <div class="wb-title">Buktikan VC(H_rect) = 4</div>
          <div class="wp-proof">
            <div class="wpp-step">
              <div class="wpp-num ok">✓</div>
              <div class="wpp-body">
                <div class="wpp-title">Langkah 1 — H bisa shatter 4 titik</div>
                <p>Ambil 4 titik membentuk "diamond" (bukan persegi): N, S, E, W.
                Untuk setiap subset titik yang ingin diberi label 1, ambil persegi panjang terkecil yang mencakup tepat titik-titik tersebut.</p>
                <canvas id="wpRectCanvas" width="500" height="160"></canvas>
                <p style="margin-top:8px">Semua 2⁴ = 16 pelabelan bisa direpresentasikan (termasuk ∅ = persegi panjang di luar semua titik).</p>
              </div>
            </div>
            <div class="wpp-step">
              <div class="wpp-num fail">✗</div>
              <div class="wpp-body">
                <div class="wpp-title">Langkah 2 — H tidak bisa shatter 5 titik</div>
                <p>Ambil sembarang 5 titik. Dari 5 titik tersebut, selalu ada satu yang berada <em>di dalam</em> convex hull dari 4 titik lainnya. Sebut titik tersebut x_mid.</p>
                <p>Pertimbangkan pelabelan: semua titik luar = 1, x_mid = 0. Persegi panjang apapun yang mencakup 4 titik luar <em>pasti</em> mencakup x_mid juga. Tidak ada persegi panjang yang bisa merealisasikan pelabelan ini.</p>
                <div class="proof-formula">
                  ∴ VC(H_rect) &lt; 5, sehingga VC(H_rect) = 4. □
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Worked 3: 1-NN paradox -->
        <div class="worked-box">
          <div class="wb-badge"> Contoh 3 · 1-Nearest Neighbor (Paradoks)</div>
          <div class="wb-title">VC(H_1NN) = ∞ — tapi parameternya 0!</div>
          <div class="prose" style="margin-bottom:16px">
            1-NN tidak punya parameter yang dioptimalkan saat training. Tapi VC-dimensinya tak terhingga — ini membuktikan bahwa VC-dim ≠ jumlah parameter.
          </div>
          <div class="wp-proof">
            <div class="wpp-step">
              <div class="wpp-num ok">✓</div>
              <div class="wpp-body">
                <div class="wpp-title">1-NN bisa shatter N titik sembarang untuk N berapa saja</div>
                <p>Untuk sembarang N titik dengan pelabelan apapun: 1-NN mengklasifikasikan setiap titik sesuai label titik terdekatnya di training set. Jika training set = test set, semua titik diklasifikasikan benar.</p>
                <div class="proof-formula">
                  Untuk sembarang {x⁽¹⁾,...,x⁽ᴺ⁾} dan sembarang labeling y:<br>
                  h_1NN dilatih pada {(x⁽ⁱ⁾, yᵢ)} → h_1NN(x⁽ⁱ⁾) = yᵢ ∀i<br>
                  ∴ 1-NN shatter sembarang N titik → VC(H_1NN) = ∞
                </div>
              </div>
            </div>
          </div>
          <div class="paradox-table">
            <div class="pt-row header"><span>Model</span><span># Parameter</span><span>VC-Dim</span><span>Keterangan</span></div>
            <div class="pt-row"><span>Linear ℝⁿ</span><span class="mono">n+1</span><span class="mono blue">n+1</span><span>Parameter = VC-dim</span></div>
            <div class="pt-row"><span>Polynomial degree d</span><span class="mono">C(n+d,d)</span><span class="mono blue">C(n+d,d)</span><span>Sesuai jumlah parameter</span></div>
            <div class="pt-row highlight"><span>1-Nearest Neighbor</span><span class="mono">0</span><span class="mono red">∞</span><span>0 parameter, kapasitas ∞!</span></div>
            <div class="pt-row highlight"><span>Lookup Table</span><span class="mono">N</span><span class="mono red">∞</span><span>Menghafal data, tidak generalisasi</span></div>
            <div class="pt-row"><span>SVM (hard margin)</span><span class="mono">n+1</span><span class="mono green">≤ R²/γ²</span><span>VC-dim bergantung margin γ, bukan n!</span></div>
          </div>
          <div class="insight-callout" style="margin-top:16px">
            <div class="ic-icon"></div>
            <div class="ic-body">
              <strong>Pelajaran:</strong> VC-dim mengukur kapasitas <em>fungsional</em>, bukan jumlah parameter.
              SVM bisa punya VC-dim kecil meski berdimensi tinggi — karena memaksimalkan margin γ
              secara efektif membatasi kapasitas. Inilah mengapa SVM generalisasi baik di ruang berdimensi tinggi.
            </div>
          </div>
        </div>

        <!-- Growth function & Sauer's lemma -->
        <div class="worked-box">
          <div class="wb-badge"> Teori Lanjutan · Growth Function & Sauer's Lemma</div>
          <div class="wb-title">Mengapa VC-dim cukup untuk karakterisasi learnability?</div>
          <div class="prose" style="margin-bottom:16px">
            VC-dim bekerja melalui konsep <strong>growth function</strong> — jumlah maksimal pola berbeda
            yang bisa direalisasikan model pada N titik.
          </div>
          <div class="def-box" style="margin:0 0 16px">
            <div class="def-label">Definisi · Growth Function Π_H(N)</div>
            <div class="def-body">
              Π_H(N) = max<sub>{x⁽¹⁾,...,x⁽ᴺ⁾}</sub> |{ (h(x⁽¹⁾),...,h(x⁽ᴺ⁾)) | h ∈ H }|
            </div>
            <div class="def-note">Jumlah pola klasifikasi berbeda yang bisa dihasilkan H pada N titik terbaik</div>
          </div>
          <div class="sauer-box">
            <div class="sb-title">Sauer's Lemma (1972)</div>
            <div class="sb-formula">
              Jika VC(H) = d, maka: &nbsp; Π_H(N) ≤ Σₖ₌₀ᵈ C(N,k) ≤ (eN/d)ᵈ
            </div>
            <div class="sb-insight">
              <div class="sbi-item">
                <span class="sbi-label">Jika N ≤ d:</span>
                <span>Π_H(N) = 2ᴺ — semua pelabelan mungkin (exponential)</span>
              </div>
              <div class="sbi-item">
                <span class="sbi-label">Jika N &gt; d:</span>
                <span>Π_H(N) ≤ O(Nᵈ) — polynomial dalam N! Growth "patah"</span>
              </div>
            </div>
            <div class="sb-chart-wrap">
              <canvas id="growthCanvas" width="560" height="180"></canvas>
            </div>
            <div class="sb-note">
              "Patahnya" growth function dari exponential ke polynomial inilah yang memungkinkan generalisasi.
              Model dengan VC-dim terhingga <em>pasti</em> bisa belajar dengan data yang cukup.
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ SEC 6: GENERALISASI ═══ -->
      <section class="lesson-sec" id="sec-generalisasi">
        <div class="sec-header">
          <span class="sec-num">06</span>
          <div>
            <h2 class="sec-title">VC-Dim & Batas Atas Error Generalisasi</h2>
            <p class="sec-sub">Teorema fundamental: hubungan antara kapasitas, data, dan kemampuan belajar</p>
          </div>
        </div>

        <div class="prose">
          VC-Dimension bukan hanya ukuran teoretis — ia memberikan <strong>batas atas (upper bound)</strong>
          yang dapat dihitung untuk error generalisasi model kita. Ini adalah jantung dari
          Statistical Learning Theory.
        </div>

        <!-- VC bound formula -->
        <div class="vc-bound-box">
          <div class="vbb-label">Teorema · VC Generalization Bound</div>
          <div class="vbb-formula">
            E*(h) ≤ E(h|D) + √( VC(H)·[log(2N/VC(H)) + 1] − log(η/4) ) / N
          </div>
          <div class="vbb-legend">
            <div class="vbbl-item"><span class="vbbl-sym blue">E*(h)</span><span>Error generalisasi (yang ingin kita minimasi)</span></div>
            <div class="vbbl-item"><span class="vbbl-sym">E(h|D)</span><span>Empirical error pada training data</span></div>
            <div class="vbbl-item"><span class="vbbl-sym purple">VC(H)</span><span>VC-Dimension model</span></div>
            <div class="vbbl-item"><span class="vbbl-sym green">N</span><span>Jumlah training examples</span></div>
            <div class="vbbl-item"><span class="vbbl-sym orange">η</span><span>Probabilitas bound tidak berlaku (biasanya 0.05)</span></div>
          </div>
          <div class="vbb-note">
            Bound ini berlaku dengan probabilitas ≥ 1−η untuk semua h ∈ H secara simultan.
          </div>
        </div>

        <!-- Interactive VC bound calculator -->
        <div class="worked-box">
          <div class="wb-badge"> Kalkulator · VC Bound Real-time</div>
          <div class="wb-title">Lihat bagaimana N dan VC(H) mempengaruhi batas error</div>

          <div class="vc-calc">
            <div class="vcc-sliders">
              <div class="vcc-row">
                <label class="vcc-label">Training examples <span class="vcc-hint">N</span></label>
                <input type="range" id="slN" min="10" max="2000" step="10" value="100">
                <span class="vcc-val" id="valN">100</span>
              </div>
              <div class="vcc-row">
                <label class="vcc-label">VC-Dimension <span class="vcc-hint">VC(H)</span></label>
                <input type="range" id="slVC" min="1" max="50" step="1" value="5">
                <span class="vcc-val" id="valVC">5</span>
              </div>
              <div class="vcc-row">
                <label class="vcc-label">Empirical error <span class="vcc-hint">E(h|D)</span></label>
                <input type="range" id="slErr" min="0" max="30" step="1" value="5">
                <span class="vcc-val" id="valErr">5%</span>
              </div>
            </div>
            <div class="vcc-result">
              <div class="vcc-res-row">
                <span class="vcc-res-label">Complexity penalty (VC confidence)</span>
                <span class="vcc-res-val" id="resComplexity">—</span>
              </div>
              <div class="vcc-res-row">
                <span class="vcc-res-label">Empirical error</span>
                <span class="vcc-res-val blue" id="resEmpErr">5%</span>
              </div>
              <div class="vcc-res-row total">
                <span class="vcc-res-label">Batas atas error generalisasi</span>
                <span class="vcc-res-val" id="resTotal">—</span>
              </div>
            </div>
          </div>

          <!-- Bound visualization chart -->
          <div class="bound-chart-wrap">
            <canvas id="boundChart" width="680" height="220"></canvas>
          </div>
          <div class="bc-legend">
            <span class="bcl-item emp">── Empirical error</span>
            <span class="bcl-item complex">── Complexity penalty</span>
            <span class="bcl-item bound">── Upper bound generalisasi</span>
            <span class="bcl-item gen">── True generalization error (approx)</span>
          </div>
        </div>

        <div class="vc-insights">
          <div class="vci-card">
            <div class="vci-icon"></div>
            <div class="vci-title">Lebih banyak data N → bound lebih ketat</div>
            <div class="vci-body">Complexity penalty ∝ 1/√N. Dengan N → ∞, bound mendekati empirical error. Ini membenarkan "lebih banyak data selalu membantu".</div>
          </div>
          <div class="vci-card">
            <div class="vci-icon">⬆️</div>
            <div class="vci-title">VC(H) lebih besar → bound lebih longgar</div>
            <div class="vci-body">Model dengan kapasitas tinggi punya complexity penalty lebih besar. Bahkan jika empirical error = 0, bound generalisasi bisa sangat besar.</div>
          </div>
          <div class="vci-card">
            <div class="vci-icon">⚖️</div>
            <div class="vci-title">Tradeoff fundamental</div>
            <div class="vci-body">Kapasitas lebih besar → empirical error lebih kecil, tapi complexity penalty lebih besar. Kapasitas optimal meminimalkan jumlah keduanya.</div>
          </div>
        </div>
      </section>

      <!-- ═══ SEC 6: SRM ═══ -->
      <section class="lesson-sec" id="sec-srmvc">
        <div class="sec-header">
          <span class="sec-num">07</span>
          <div>
            <h2 class="sec-title">Structural Risk Minimization (SRM)</h2>
            <p class="sec-sub">Menggunakan VC-bound untuk memilih model yang optimal</p>
          </div>
        </div>

        <div class="prose">
          VC bound memberikan resep praktis untuk pemilihan model: pilih model yang
          meminimalkan <em>jumlah</em> empirical error dan complexity penalty. Prinsip ini
          disebut <strong>Structural Risk Minimization (SRM)</strong>.
        </div>

        <!-- SRM diagram -->
        <div class="srm-diagram">
          <div class="srmd-canvas-wrap">
            <canvas id="srmCanvas" width="620" height="300"></canvas>
          </div>
          <div class="srmd-labels">
            <div class="srmdl-item emp">── Empirical error E(h|D) — turun seiring kapasitas naik</div>
            <div class="srmdl-item conf">── VC confidence — naik seiring kapasitas naik</div>
            <div class="srmdl-item bound">── Upper bound E* = E(h|D) + VC confidence</div>
            <div class="srmdl-item opt">★ Model optimal H* — minimum upper bound</div>
          </div>
        </div>

        <div class="srm-steps">
          <div class="srms-step">
            <div class="srms-num">1</div>
            <div class="srms-content">
              <div class="srms-title">Susun keluarga model H₁ ⊂ H₂ ⊂ ... ⊂ Hₙ</div>
              <div class="srms-desc">Urutkan model dari VC-dim kecil ke besar: VC(H₁) ≤ VC(H₂) ≤ ... ≤ VC(Hₙ). Contoh: linear → polynomial degree 2 → degree 3 → ...</div>
            </div>
          </div>
          <div class="srms-step">
            <div class="srms-num">2</div>
            <div class="srms-content">
              <div class="srms-title">Untuk setiap Hₖ, latih hipotesis terbaik hₖ*</div>
              <div class="srms-desc">hₖ* = argmin E(h|D) untuk h ∈ Hₖ. Hitung empirical error E(hₖ*|D) dan VC confidence Ωₖ = f(VC(Hₖ), N).</div>
            </div>
          </div>
          <div class="srms-step">
            <div class="srms-num">3</div>
            <div class="srms-content">
              <div class="srms-title">Pilih k* yang meminimalkan E(hₖ*|D) + Ωₖ</div>
              <div class="srms-desc">Model optimal adalah yang meminimalkan batas atas generalisasi, bukan hanya empirical error. Ini secara eksplisit mencegah overfitting.</div>
            </div>
          </div>
        </div>

        <div class="insight-callout">
          <div class="ic-icon"></div>
          <div class="ic-body">
            <strong>Mengapa SVM optimal secara VC?</strong> Support Vector Machine secara eksplisit
            memaksimalkan margin — dan terbukti bahwa memaksimalkan margin ekuivalen dengan
            meminimalkan VC-dimension yang efektif, yang meminimalkan upper bound generalisasi.
            Ini adalah alasan matematis mengapa SVM bekerja dengan baik bahkan di dimensi tinggi.
          </div>
        </div>

        <div class="vc-limitations">
          <div class="vcl-title">⚠️ Keterbatasan VC-Dimension</div>
          <div class="vcl-items">
            <div class="vcl-item">
              <span class="vcli-icon"></span>
              <div>
                <strong>Bound sangat pesimistis</strong> — dalam praktik, model sering generalisasi
                jauh lebih baik dari yang dijamin bound. VC bound adalah <em>worst-case</em>.
              </div>
            </div>
            <div class="vcl-item">
              <span class="vcli-icon"></span>
              <div>
                <strong>Mengabaikan distribusi data</strong> — VC-dim tidak memperhitungkan
                bahwa beberapa pelabelan lebih mungkin daripada yang lain.
              </div>
            </div>
            <div class="vcl-item">
              <span class="vcli-icon"></span>
              <div>
                <strong>Sulit dihitung</strong> — untuk model kompleks seperti deep neural network,
                menghitung VC-dim eksak sangat sulit. Alternatif modern: Rademacher complexity,
                PAC-Bayes bounds.
              </div>
            </div>
          </div>
        </div>

        <!-- Next lesson CTA -->
        <div class="next-lesson-cta">
          <div class="nlc-inner">
            <span class="nlc-label">Lesson berikutnya</span>
            <h3 class="nlc-title">Bias-Variance Tradeoff →</h3>
            <p class="nlc-desc">VC-dim memberi kita upper bound teoritis. Bias-Variance decomposition memberi perspektif berbeda — bagaimana error model bisa didekomposisi menjadi komponen yang bisa dianalisis dan diminimasi.</p>
            <a href="#/participant-ai-lab-ml-bias-variance" class="nlc-btn">Lanjut ke Bias-Variance</a>
          </div>
        </div>

      </section>

</article>
<footer class="lesson-nav-footer"><a href="#/participant-ai-lab-ml-hypothesis"><i class="fas fa-chevron-left"></i> Sebelumnya</a><a href="#/participant-ai-lab-ml-bias-variance">Selanjutnya <i class="fas fa-arrow-right"></i></a></footer>
</section></div>
<aside class="lesson-right-panel">
<section class="module-side-card lesson-progress-card"><h2>Progres</h2><div class="lesson-progress-mini"><b style="--value:0%"></b><strong>0%</strong></div><p>VC Dimension</p><a href="#/participant-ai-lab-ml">Katalog ML</a></section>
<section class="module-side-card lesson-list-card"><h2>Section</h2><ol>
<li class="active"><span>1</span><a href="#sec-kapasitas">Kapasitas Model</a><i class="far fa-circle-play"></i></li>
<li><span>2</span><a href="#sec-shatter">Shatter</a><i class="far fa-circle"></i></li>
<li><span>3</span><a href="#sec-linear">Linear Models</a><i class="far fa-circle"></i></li>
<li><span>4</span><a href="#sec-models">VC Models</a><i class="far fa-circle"></i></li>
<li><span>5</span><a href="#sec-worked">Worked Examples</a><i class="far fa-circle"></i></li>
<li><span>6</span><a href="#sec-generalisasi">Generalisasi</a><i class="far fa-circle"></i></li>
<li><span>7</span><a href="#sec-srmvc">SRM+VC</a><i class="far fa-circle"></i></li>
</ol></section>
</aside></div></main></section>

````
