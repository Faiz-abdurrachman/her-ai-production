# Pengantar Machine Learning

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/chapters/chapter-1.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

Chapter 1

#### Pengantar Machine Learning

Machine Learning adalah cara membuat sistem yang belajar pola dari data, lalu memakai pola itu untuk memprediksi, mengelompokkan, atau mengambil keputusan pada data baru.

Learning objectives

##### Setelah materi ini, kamu mampu

-   **Membedakan pemrograman rule-based dan Machine Learning.
-   **Menjelaskan supervised, unsupervised, dan reinforcement learning.
-   **Membaca istilah dasar seperti fitur, label, model, hipotesis, dan generalisasi.

Why it matters

##### Kenapa ML penting di AI?

AI modern jarang hanya berisi aturan manual. Sistem rekomendasi, filter spam, deteksi fraud, computer vision, dan NLP membutuhkan model yang bisa menemukan pola dari contoh. ML menjadi jembatan antara data mentah dan keputusan yang adaptif.

**Data** Contoh historis: input, label, perilaku, teks, gambar, transaksi.

**

**Learning** Algoritma mencari pola yang menurunkan error pada contoh data.

**

**Prediction** Model memberi output untuk data baru yang belum pernah dilihat.

Core idea

##### Rule-based vs Machine Learning

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Pendekatan
Cara kerja
Cocok saat
Risiko</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Rule-based
Developer menulis aturan eksplisit, misalnya if nominal &gt; 10 juta maka review manual.
Aturannya stabil, jelas, dan mudah diaudit.
Rapuh saat pola berubah atau kombinasinya terlalu banyak.</td>
<td align="left">Machine Learning
Model belajar dari contoh data untuk menemukan pola yang tidak mudah ditulis manual.
Ada data historis dan pola bisa berubah.
Butuh evaluasi, data bersih, dan kontrol bias.</td>
</tr>
</tbody>
</table>

Analogy

##### Analogi belajar dari contoh

Bayangkan kamu mengajari teman membedakan email spam. Cara rule-based adalah memberi daftar aturan tetap. Cara ML adalah memberi banyak contoh email spam dan non-spam, lalu temanmu belajar pola seperti kata tertentu, link mencurigakan, atau pengirim tidak dikenal.

**

##### Supervised

Belajar dari data berlabel. Contoh: email ini spam atau bukan spam.

`input x -> label y`

**

##### Unsupervised

Mencari struktur tanpa label. Contoh: segmentasi pelanggan dari pola belanja.

`input x -> struktur`

**

##### Reinforcement

Agen belajar dari reward dan konsekuensi aksi. Contoh: strategi game atau robot navigasi.

`aksi -> reward`

Formula

##### Bahasa dasar model

`x in R^n`

**Feature vector.** Satu data direpresentasikan sebagai kumpulan angka. Jika n = 5, berarti ada 5 fitur, misalnya umur akun, jumlah klik, durasi belajar, nilai latihan, dan jumlah diskusi.

`h: X -> Y`

**Hypothesis.** Model belajar fungsi yang memetakan input X menjadi output Y. Pada klasifikasi, Y bisa berupa kelas; pada regresi, Y berupa angka.

`generalization = performa pada data baru`

**Generalisasi.** Tujuan ML bukan menghafal data train, tetapi membuat prediksi yang tetap bagus pada data yang belum pernah dilihat.

Real examples

##### Contoh penggunaan nyata

**Rekomendasi belajar**

Model mempelajari minat, progres, dan performa peserta untuk menyarankan materi berikutnya.

**Deteksi fraud**

Model melihat kombinasi nominal, lokasi, jam, dan riwayat transaksi untuk menandai risiko.

**Computer vision**

Model mengenali pola piksel untuk klasifikasi gambar, deteksi objek, atau inspeksi kualitas.

Mini checkpoint

##### Jawab sebentar

Jika aturan bisnisnya stabil dan bisa ditulis jelas, apakah kamu tetap perlu ML? Jelaskan satu alasan pro dan satu alasan kontra.

Common mistakes

##### Kesalahan yang sering terjadi

-   **Menganggap ML selalu lebih baik dari aturan sederhana.
-   **Melatih model tanpa mendefinisikan target dan metrik sukses.
-   **Mengira akurasi train tinggi otomatis berarti model siap dipakai.

Summary

##### Ringkasan

Machine Learning dipakai saat sistem perlu belajar pola dari data. Fondasinya adalah fitur, label, hipotesis, model, dan generalisasi. Di chapter berikutnya, kamu akan masuk ke supervised learning secara lebih sistematis.

[Lanjut ke Supervised Learning **](#/participant-ai-lab-ml-supervised)

## Lampiran Sumber HTML Lengkap

````html
<article class="ml-chapter ai-ml-chapter">
    <header class="ml-chapter-header">
        <span>Chapter 1</span>
        <h2>Pengantar Machine Learning</h2>
        <p>Machine Learning adalah cara membuat sistem yang belajar pola dari data, lalu memakai pola itu untuk memprediksi, mengelompokkan, atau mengambil keputusan pada data baru.</p>
    </header>

    <section class="ai-ml-learning-card">
        <div class="ml-section-head">
            <span>Learning objectives</span>
            <h3>Setelah materi ini, kamu mampu</h3>
        </div>
        <ul class="ai-ml-objectives">
            <li><i class="fas fa-circle-check"></i><span>Membedakan pemrograman rule-based dan Machine Learning.</span></li>
            <li><i class="fas fa-circle-check"></i><span>Menjelaskan supervised, unsupervised, dan reinforcement learning.</span></li>
            <li><i class="fas fa-circle-check"></i><span>Membaca istilah dasar seperti fitur, label, model, hipotesis, dan generalisasi.</span></li>
        </ul>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Why it matters</span>
            <h3>Kenapa ML penting di AI?</h3>
            <p>AI modern jarang hanya berisi aturan manual. Sistem rekomendasi, filter spam, deteksi fraud, computer vision, dan NLP membutuhkan model yang bisa menemukan pola dari contoh. ML menjadi jembatan antara data mentah dan keputusan yang adaptif.</p>
        </div>
        <div class="ml-flow">
            <div class="ml-flow-step">
                <strong>Data</strong>
                <span>Contoh historis: input, label, perilaku, teks, gambar, transaksi.</span>
            </div>
            <i class="fas fa-arrow-right"></i>
            <div class="ml-flow-step">
                <strong>Learning</strong>
                <span>Algoritma mencari pola yang menurunkan error pada contoh data.</span>
            </div>
            <i class="fas fa-arrow-right"></i>
            <div class="ml-flow-step">
                <strong>Prediction</strong>
                <span>Model memberi output untuk data baru yang belum pernah dilihat.</span>
            </div>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Core idea</span>
            <h3>Rule-based vs Machine Learning</h3>
        </div>
        <div class="ml-table-card">
            <table>
                <thead>
                    <tr>
                        <th>Pendekatan</th>
                        <th>Cara kerja</th>
                        <th>Cocok saat</th>
                        <th>Risiko</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Rule-based</td>
                        <td>Developer menulis aturan eksplisit, misalnya if nominal &gt; 10 juta maka review manual.</td>
                        <td>Aturannya stabil, jelas, dan mudah diaudit.</td>
                        <td>Rapuh saat pola berubah atau kombinasinya terlalu banyak.</td>
                    </tr>
                    <tr>
                        <td>Machine Learning</td>
                        <td>Model belajar dari contoh data untuk menemukan pola yang tidak mudah ditulis manual.</td>
                        <td>Ada data historis dan pola bisa berubah.</td>
                        <td>Butuh evaluasi, data bersih, dan kontrol bias.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Analogy</span>
            <h3>Analogi belajar dari contoh</h3>
            <p>Bayangkan kamu mengajari teman membedakan email spam. Cara rule-based adalah memberi daftar aturan tetap. Cara ML adalah memberi banyak contoh email spam dan non-spam, lalu temanmu belajar pola seperti kata tertentu, link mencurigakan, atau pengirim tidak dikenal.</p>
        </div>
        <div class="ml-card-grid three">
            <article class="ml-concept-card">
                <i class="fas fa-tags"></i>
                <h3>Supervised</h3>
                <p>Belajar dari data berlabel. Contoh: email ini spam atau bukan spam.</p>
                <code>input x -> label y</code>
            </article>
            <article class="ml-concept-card">
                <i class="fas fa-object-group"></i>
                <h3>Unsupervised</h3>
                <p>Mencari struktur tanpa label. Contoh: segmentasi pelanggan dari pola belanja.</p>
                <code>input x -> struktur</code>
            </article>
            <article class="ml-concept-card">
                <i class="fas fa-route"></i>
                <h3>Reinforcement</h3>
                <p>Agen belajar dari reward dan konsekuensi aksi. Contoh: strategi game atau robot navigasi.</p>
                <code>aksi -> reward</code>
            </article>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Formula</span>
            <h3>Bahasa dasar model</h3>
        </div>
        <div class="ai-ml-formula-list">
            <article>
                <code>x in R^n</code>
                <p><b>Feature vector.</b> Satu data direpresentasikan sebagai kumpulan angka. Jika n = 5, berarti ada 5 fitur, misalnya umur akun, jumlah klik, durasi belajar, nilai latihan, dan jumlah diskusi.</p>
            </article>
            <article>
                <code>h: X -> Y</code>
                <p><b>Hypothesis.</b> Model belajar fungsi yang memetakan input X menjadi output Y. Pada klasifikasi, Y bisa berupa kelas; pada regresi, Y berupa angka.</p>
            </article>
            <article>
                <code>generalization = performa pada data baru</code>
                <p><b>Generalisasi.</b> Tujuan ML bukan menghafal data train, tetapi membuat prediksi yang tetap bagus pada data yang belum pernah dilihat.</p>
            </article>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Real examples</span>
            <h3>Contoh penggunaan nyata</h3>
        </div>
        <div class="ml-case-grid">
            <article>
                <b>Rekomendasi belajar</b>
                <p>Model mempelajari minat, progres, dan performa peserta untuk menyarankan materi berikutnya.</p>
            </article>
            <article>
                <b>Deteksi fraud</b>
                <p>Model melihat kombinasi nominal, lokasi, jam, dan riwayat transaksi untuk menandai risiko.</p>
            </article>
            <article>
                <b>Computer vision</b>
                <p>Model mengenali pola piksel untuk klasifikasi gambar, deteksi objek, atau inspeksi kualitas.</p>
            </article>
        </div>
    </section>

    <section class="ai-ml-checkpoint">
        <div>
            <span>Mini checkpoint</span>
            <h3>Jawab sebentar</h3>
            <p>Jika aturan bisnisnya stabil dan bisa ditulis jelas, apakah kamu tetap perlu ML? Jelaskan satu alasan pro dan satu alasan kontra.</p>
        </div>
    </section>

    <section class="ai-ml-mistakes">
        <div class="ml-section-head">
            <span>Common mistakes</span>
            <h3>Kesalahan yang sering terjadi</h3>
        </div>
        <ul class="ml-check-list">
            <li><i class="fas fa-triangle-exclamation"></i><span>Menganggap ML selalu lebih baik dari aturan sederhana.</span></li>
            <li><i class="fas fa-triangle-exclamation"></i><span>Melatih model tanpa mendefinisikan target dan metrik sukses.</span></li>
            <li><i class="fas fa-triangle-exclamation"></i><span>Mengira akurasi train tinggi otomatis berarti model siap dipakai.</span></li>
        </ul>
    </section>

    <section class="ai-ml-summary">
        <div>
            <span>Summary</span>
            <h3>Ringkasan</h3>
            <p>Machine Learning dipakai saat sistem perlu belajar pola dari data. Fondasinya adalah fitur, label, hipotesis, model, dan generalisasi. Di chapter berikutnya, kamu akan masuk ke supervised learning secara lebih sistematis.</p>
        </div>
        <a href="#/participant-ai-lab-ml-supervised" class="ml-inline-next" data-ml-next="2">Lanjut ke Supervised Learning <i class="fas fa-arrow-right"></i></a>
    </section>
</article>

````
