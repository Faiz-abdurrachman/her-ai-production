# Regresi & Klasifikasi Dasar

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/chapters/chapter-3.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

Chapter 3

#### Regresi & Klasifikasi Dasar

Regresi memprediksi angka kontinu, sedangkan klasifikasi memprediksi kategori. Dua bentuk ini menjadi pintu masuk untuk membaca banyak algoritma ML klasik.

Learning objectives

##### Setelah materi ini, kamu mampu

-   **Membedakan regresi dan klasifikasi dari tipe targetnya.
-   **Menjelaskan intuisi linear regression, decision tree, random forest, boosting, dan k-NN.
-   **Membaca overfitting, underfitting, dan pilihan metrik evaluasi dasar.

Why it matters

##### Kenapa chapter ini penting?

Sebelum masuk model probabilistik, SVM, dan neural network, kamu perlu kuat di dua pertanyaan praktis: output yang diprediksi angka atau kelas? Lalu algoritma apa yang paling masuk akal untuk data dan kebutuhan interpretasi?

**

##### Regresi

Target berupa angka kontinu: harga rumah, suhu besok, estimasi durasi pengerjaan, atau nilai penjualan.

`y_hat = angka`

**

##### Klasifikasi

Target berupa kelas: spam/non-spam, lulus/tidak, fraud/aman, atau kategori sentimen.

`y_hat = kelas`

Formula

##### Regresi linear dan least squares

`y_hat = w^T x + w0`

**Prediksi linear.** Model menjumlahkan fitur yang diberi bobot. Bobot positif menaikkan prediksi, bobot negatif menurunkan prediksi.

`residual = y - y_hat`

**Residual.** Selisih antara nilai aktual dan prediksi. Residual besar berarti model masih jauh dari jawaban benar.

`min sum (y_i - y_hat_i)^2`

**Least squares.** Training mencari bobot yang membuat total error kuadrat sekecil mungkin. Error kuadrat memberi penalti besar untuk prediksi yang sangat meleset.

Analogy

##### Analogi garis dan aturan bertanya

Linear regression seperti menarik garis terbaik di tengah titik data. Decision tree seperti permainan dua puluh pertanyaan: apakah usia akun lebih dari 30 hari? apakah progres modul di bawah 50%? Jawaban dari pertanyaan bertingkat menentukan prediksi.

###### Decision Tree

Membagi data berdasarkan pertanyaan fitur. Split dipilih dengan ukuran seperti Information Gain atau Gini.

###### Random Forest

Menggabungkan banyak tree dari sampel dan fitur berbeda. Bagging membantu menurunkan variance.

###### Boosting

Membangun model bertahap untuk memperbaiki error model sebelumnya. Contoh populer: XGBoost dan LightGBM.

k-NN

##### Belajar dari tetangga terdekat

k-Nearest Neighbors menyimpan data training dan memprediksi data baru dari k tetangga terdekat. Ia disebut lazy learning karena tidak banyak membangun model saat training.

**

###### Jarak

Euclidean cocok untuk jarak lurus di ruang fitur. Manhattan cocok saat jarak dihitung per langkah fitur. Skala fitur harus dinormalisasi agar satu fitur tidak mendominasi.

**

###### Curse of dimensionality

Saat jumlah fitur terlalu banyak, konsep "dekat" menjadi kurang bermakna. k-NN bisa lambat karena prediksi perlu membandingkan data baru dengan banyak contoh.

Evaluation

##### Overfitting, underfitting, dan metrik

###### Underfitting

Train rendah, test rendah

Model terlalu sederhana atau fitur kurang informatif.

###### Overfitting

Train tinggi, test rendah

Model menghafal noise dan gagal generalisasi.

###### Good fit

Train dan test stabil

Model cukup belajar pola tanpa terlalu menghafal.

**Pred PositifPred Negatif** **Aktual PositifTPFN** **Aktual NegatifFPTN**

**Accuracy**Proporsi prediksi benar. Bisa menipu pada data imbalanced.

**Precision**Dari yang diprediksi positif, berapa yang benar positif.

**Recall**Dari semua aktual positif, berapa yang berhasil ditemukan.

**F1-score**Rata-rata harmonik precision dan recall.

Mini checkpoint

##### Jawab sebentar

Untuk prediksi harga kos, apakah targetnya regresi atau klasifikasi? Untuk deteksi spam, metrik mana yang akan kamu cek selain accuracy?

Common mistakes

##### Kesalahan yang sering terjadi

-   **Memakai accuracy pada data sangat tidak seimbang tanpa melihat precision, recall, atau F1.
-   **Memakai k-NN tanpa scaling fitur.
-   **Menganggap model kompleks selalu lebih baik dari baseline linear atau tree sederhana.

Summary

##### Ringkasan

Regresi memprediksi angka, klasifikasi memprediksi kelas. Linear model, tree-based model, boosting, dan k-NN punya kekuatan dan risiko masing-masing. Evaluasi perlu membaca gap train-test dan metrik yang sesuai masalah.

[Lanjut ke Probabilistic Models **](#/participant-ai-lab-ml-probabilistic)

## Lampiran Sumber HTML Lengkap

````html
<article class="ml-chapter ai-ml-chapter">
    <header class="ml-chapter-header">
        <span>Chapter 3</span>
        <h2>Regresi &amp; Klasifikasi Dasar</h2>
        <p>Regresi memprediksi angka kontinu, sedangkan klasifikasi memprediksi kategori. Dua bentuk ini menjadi pintu masuk untuk membaca banyak algoritma ML klasik.</p>
    </header>

    <section class="ai-ml-learning-card">
        <div class="ml-section-head">
            <span>Learning objectives</span>
            <h3>Setelah materi ini, kamu mampu</h3>
        </div>
        <ul class="ai-ml-objectives">
            <li><i class="fas fa-circle-check"></i><span>Membedakan regresi dan klasifikasi dari tipe targetnya.</span></li>
            <li><i class="fas fa-circle-check"></i><span>Menjelaskan intuisi linear regression, decision tree, random forest, boosting, dan k-NN.</span></li>
            <li><i class="fas fa-circle-check"></i><span>Membaca overfitting, underfitting, dan pilihan metrik evaluasi dasar.</span></li>
        </ul>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Why it matters</span>
            <h3>Kenapa chapter ini penting?</h3>
            <p>Sebelum masuk model probabilistik, SVM, dan neural network, kamu perlu kuat di dua pertanyaan praktis: output yang diprediksi angka atau kelas? Lalu algoritma apa yang paling masuk akal untuk data dan kebutuhan interpretasi?</p>
        </div>
        <div class="ml-card-grid two">
            <article class="ml-concept-card">
                <i class="fas fa-chart-line"></i>
                <h3>Regresi</h3>
                <p>Target berupa angka kontinu: harga rumah, suhu besok, estimasi durasi pengerjaan, atau nilai penjualan.</p>
                <code>y_hat = angka</code>
            </article>
            <article class="ml-concept-card">
                <i class="fas fa-tags"></i>
                <h3>Klasifikasi</h3>
                <p>Target berupa kelas: spam/non-spam, lulus/tidak, fraud/aman, atau kategori sentimen.</p>
                <code>y_hat = kelas</code>
            </article>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Formula</span>
            <h3>Regresi linear dan least squares</h3>
        </div>
        <div class="ai-ml-formula-list">
            <article>
                <code>y_hat = w^T x + w0</code>
                <p><b>Prediksi linear.</b> Model menjumlahkan fitur yang diberi bobot. Bobot positif menaikkan prediksi, bobot negatif menurunkan prediksi.</p>
            </article>
            <article>
                <code>residual = y - y_hat</code>
                <p><b>Residual.</b> Selisih antara nilai aktual dan prediksi. Residual besar berarti model masih jauh dari jawaban benar.</p>
            </article>
            <article>
                <code>min sum (y_i - y_hat_i)^2</code>
                <p><b>Least squares.</b> Training mencari bobot yang membuat total error kuadrat sekecil mungkin. Error kuadrat memberi penalti besar untuk prediksi yang sangat meleset.</p>
            </article>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Analogy</span>
            <h3>Analogi garis dan aturan bertanya</h3>
            <p>Linear regression seperti menarik garis terbaik di tengah titik data. Decision tree seperti permainan dua puluh pertanyaan: apakah usia akun lebih dari 30 hari? apakah progres modul di bawah 50%? Jawaban dari pertanyaan bertingkat menentukan prediksi.</p>
        </div>
        <div class="ml-algorithm-map">
            <article>
                <h4>Decision Tree</h4>
                <p>Membagi data berdasarkan pertanyaan fitur. Split dipilih dengan ukuran seperti Information Gain atau Gini.</p>
            </article>
            <article>
                <h4>Random Forest</h4>
                <p>Menggabungkan banyak tree dari sampel dan fitur berbeda. Bagging membantu menurunkan variance.</p>
            </article>
            <article>
                <h4>Boosting</h4>
                <p>Membangun model bertahap untuk memperbaiki error model sebelumnya. Contoh populer: XGBoost dan LightGBM.</p>
            </article>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>k-NN</span>
            <h3>Belajar dari tetangga terdekat</h3>
            <p>k-Nearest Neighbors menyimpan data training dan memprediksi data baru dari k tetangga terdekat. Ia disebut lazy learning karena tidak banyak membangun model saat training.</p>
        </div>
        <div class="ml-card-grid two">
            <article class="ml-info-card">
                <i class="fas fa-ruler-combined"></i>
                <h4>Jarak</h4>
                <p>Euclidean cocok untuk jarak lurus di ruang fitur. Manhattan cocok saat jarak dihitung per langkah fitur. Skala fitur harus dinormalisasi agar satu fitur tidak mendominasi.</p>
            </article>
            <article class="ml-info-card">
                <i class="fas fa-triangle-exclamation"></i>
                <h4>Curse of dimensionality</h4>
                <p>Saat jumlah fitur terlalu banyak, konsep "dekat" menjadi kurang bermakna. k-NN bisa lambat karena prediksi perlu membandingkan data baru dengan banyak contoh.</p>
            </article>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Evaluation</span>
            <h3>Overfitting, underfitting, dan metrik</h3>
        </div>
        <div class="ml-fit-grid">
            <article>
                <h4>Underfitting</h4>
                <small>Train rendah, test rendah</small>
                <p>Model terlalu sederhana atau fitur kurang informatif.</p>
            </article>
            <article>
                <h4>Overfitting</h4>
                <small>Train tinggi, test rendah</small>
                <p>Model menghafal noise dan gagal generalisasi.</p>
            </article>
            <article class="is-balanced">
                <h4>Good fit</h4>
                <small>Train dan test stabil</small>
                <p>Model cukup belajar pola tanpa terlalu menghafal.</p>
            </article>
        </div>
        <div class="ml-matrix-card" aria-label="Confusion matrix contoh">
            <span></span><b>Pred Positif</b><b>Pred Negatif</b>
            <b>Aktual Positif</b><strong>TP</strong><strong>FN</strong>
            <b>Aktual Negatif</b><strong>FP</strong><strong>TN</strong>
        </div>
        <div class="ml-metric-list">
            <article><strong>Accuracy</strong><span>Proporsi prediksi benar. Bisa menipu pada data imbalanced.</span></article>
            <article><strong>Precision</strong><span>Dari yang diprediksi positif, berapa yang benar positif.</span></article>
            <article><strong>Recall</strong><span>Dari semua aktual positif, berapa yang berhasil ditemukan.</span></article>
            <article><strong>F1-score</strong><span>Rata-rata harmonik precision dan recall.</span></article>
        </div>
    </section>

    <section class="ai-ml-checkpoint">
        <div>
            <span>Mini checkpoint</span>
            <h3>Jawab sebentar</h3>
            <p>Untuk prediksi harga kos, apakah targetnya regresi atau klasifikasi? Untuk deteksi spam, metrik mana yang akan kamu cek selain accuracy?</p>
        </div>
    </section>

    <section class="ai-ml-mistakes">
        <div class="ml-section-head">
            <span>Common mistakes</span>
            <h3>Kesalahan yang sering terjadi</h3>
        </div>
        <ul class="ml-check-list">
            <li><i class="fas fa-triangle-exclamation"></i><span>Memakai accuracy pada data sangat tidak seimbang tanpa melihat precision, recall, atau F1.</span></li>
            <li><i class="fas fa-triangle-exclamation"></i><span>Memakai k-NN tanpa scaling fitur.</span></li>
            <li><i class="fas fa-triangle-exclamation"></i><span>Menganggap model kompleks selalu lebih baik dari baseline linear atau tree sederhana.</span></li>
        </ul>
    </section>

    <section class="ai-ml-summary">
        <div>
            <span>Summary</span>
            <h3>Ringkasan</h3>
            <p>Regresi memprediksi angka, klasifikasi memprediksi kelas. Linear model, tree-based model, boosting, dan k-NN punya kekuatan dan risiko masing-masing. Evaluasi perlu membaca gap train-test dan metrik yang sesuai masalah.</p>
        </div>
        <a href="#/participant-ai-lab-ml-probabilistic" class="ml-inline-next" data-ml-next="4">Lanjut ke Probabilistic Models <i class="fas fa-arrow-right"></i></a>
    </section>
</article>

````
