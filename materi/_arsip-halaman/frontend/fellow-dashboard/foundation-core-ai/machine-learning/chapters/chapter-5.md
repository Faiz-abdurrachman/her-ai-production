# Linear Discriminative Models

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/chapters/chapter-5.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

Chapter 5

#### Linear Discriminative Models

Linear discriminative models langsung belajar batas keputusan antar kelas. Model ini sering menjadi baseline yang kuat karena cepat, relatif mudah dijelaskan, dan cocok untuk banyak data tabular maupun teks.

Learning objectives

##### Setelah materi ini, kamu mampu

-   **Menjelaskan hyperplane, logistic regression, sigmoid, dan cross-entropy.
-   **Membedakan strategi one-vs-rest dan one-vs-one untuk multi-class.
-   **Memilih metrik untuk data imbalanced dan memahami regularization.

Why it matters

##### Kenapa model linear masih penting?

Sebelum memakai model besar, baseline linear membantu menjawab: apakah fitur sudah informatif? apakah masalahnya bisa dipisahkan cukup sederhana? apakah kita butuh interpretabilitas tinggi?

****

###### Hyperplane sebagai batas

Di 2D, batasnya garis. Di 3D, batasnya bidang. Di dimensi tinggi, kita menyebutnya hyperplane. Model belajar posisi batas yang memisahkan kelas.

Formula

##### Generalized linear model dan logistic regression

`h(x) = f(w^T x + w0)`

**GLM intuition.** Gabungkan fitur secara linear, lalu masukkan ke fungsi aktivasi f untuk menghasilkan output yang sesuai.

`sigmoid(z) = 1 / (1 + exp(-z))`

**Sigmoid.** Mengubah skor z menjadi angka 0 sampai 1, sehingga bisa dibaca sebagai probabilitas kelas positif.

`cross entropy = - y log(p) - (1-y) log(1-p)`

**Loss klasifikasi.** Menghukum model saat memberi probabilitas rendah pada label benar.

Analogy

##### Analogi garis batas di peta

Bayangkan kamu memisahkan area aman dan berisiko di peta. Linear model menggambar satu garis batas. Jika data punya pola yang cukup lurus, garis itu sudah sangat berguna. Jika pola melingkar atau kompleks, kamu perlu fitur tambahan atau model non-linear.

**

###### One-vs-rest

Untuk banyak kelas, latih satu classifier per kelas: kelas A melawan semua kelas lain.

**

###### One-vs-one

Latih classifier untuk setiap pasangan kelas, lalu gabungkan voting prediksi.

Imbalance

##### Saat kelas tidak seimbang

Pada fraud detection, mungkin hanya 1% data yang fraud. Model yang selalu menjawab "aman" bisa punya accuracy 99%, tetapi tidak berguna. Karena itu, gunakan confusion matrix, precision, recall, F1, ROC-AUC, dan strategi imbalance.

**

###### Class weights

Memberi penalti lebih besar pada kelas minoritas.

**

###### Oversampling

Menambah contoh kelas minoritas pada training.

**

###### Undersampling

Mengurangi contoh kelas mayoritas agar distribusi lebih seimbang.

**

###### SMOTE

Membuat contoh sintetis kelas minoritas dari tetangga terdekat.

Regularization

##### Menahan model agar tidak terlalu liar

**

##### L2 regularization

Mendorong bobot tetap kecil dan tersebar. Sering dipakai sebagai default untuk stabilitas.

`loss + lambda sum w^2`

**

##### L1 regularization

Mendorong sebagian bobot menjadi nol, sehingga bisa membantu feature selection.

`loss + lambda sum |w|`

Mini checkpoint

##### Jawab sebentar

Pada deteksi fraud dengan fraud hanya 1%, mengapa accuracy tidak cukup? Metrik apa yang akan kamu prioritaskan dan kenapa?

Common mistakes

##### Kesalahan yang sering terjadi

-   **Menganggap logistic regression sama dengan linear regression, padahal outputnya probabilitas kelas.
-   **Melaporkan accuracy saja pada data imbalanced.
-   **Menggunakan regularization terlalu besar sampai model underfit.

Summary

##### Ringkasan

Linear discriminative models belajar batas keputusan langsung dari data. Logistic regression memakai sigmoid dan cross-entropy, regularization menjaga bobot tetap terkendali, dan evaluasi perlu sensitif terhadap imbalance.

[Lanjut ke Support Vector Machine **](#/participant-ai-lab-ml-svm)

## Lampiran Sumber HTML Lengkap

````html
<article class="ml-chapter ai-ml-chapter">
    <header class="ml-chapter-header">
        <span>Chapter 5</span>
        <h2>Linear Discriminative Models</h2>
        <p>Linear discriminative models langsung belajar batas keputusan antar kelas. Model ini sering menjadi baseline yang kuat karena cepat, relatif mudah dijelaskan, dan cocok untuk banyak data tabular maupun teks.</p>
    </header>

    <section class="ai-ml-learning-card">
        <div class="ml-section-head">
            <span>Learning objectives</span>
            <h3>Setelah materi ini, kamu mampu</h3>
        </div>
        <ul class="ai-ml-objectives">
            <li><i class="fas fa-circle-check"></i><span>Menjelaskan hyperplane, logistic regression, sigmoid, dan cross-entropy.</span></li>
            <li><i class="fas fa-circle-check"></i><span>Membedakan strategi one-vs-rest dan one-vs-one untuk multi-class.</span></li>
            <li><i class="fas fa-circle-check"></i><span>Memilih metrik untuk data imbalanced dan memahami regularization.</span></li>
        </ul>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Why it matters</span>
            <h3>Kenapa model linear masih penting?</h3>
            <p>Sebelum memakai model besar, baseline linear membantu menjawab: apakah fitur sudah informatif? apakah masalahnya bisa dipisahkan cukup sederhana? apakah kita butuh interpretabilitas tinggi?</p>
        </div>
        <div class="ml-boundary-demo" aria-label="Ilustrasi hyperplane">
            <div class="ml-axis">
                <b></b>
                <span class="dot"></span>
                <span class="dot d2"></span>
                <span class="dot d3"></span>
                <span class="dot green"></span>
                <span class="dot green d2"></span>
                <span class="dot green d3"></span>
            </div>
            <div class="ml-network-copy">
                <h4>Hyperplane sebagai batas</h4>
                <p>Di 2D, batasnya garis. Di 3D, batasnya bidang. Di dimensi tinggi, kita menyebutnya hyperplane. Model belajar posisi batas yang memisahkan kelas.</p>
            </div>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Formula</span>
            <h3>Generalized linear model dan logistic regression</h3>
        </div>
        <div class="ai-ml-formula-list">
            <article>
                <code>h(x) = f(w^T x + w0)</code>
                <p><b>GLM intuition.</b> Gabungkan fitur secara linear, lalu masukkan ke fungsi aktivasi f untuk menghasilkan output yang sesuai.</p>
            </article>
            <article>
                <code>sigmoid(z) = 1 / (1 + exp(-z))</code>
                <p><b>Sigmoid.</b> Mengubah skor z menjadi angka 0 sampai 1, sehingga bisa dibaca sebagai probabilitas kelas positif.</p>
            </article>
            <article>
                <code>cross entropy = - y log(p) - (1-y) log(1-p)</code>
                <p><b>Loss klasifikasi.</b> Menghukum model saat memberi probabilitas rendah pada label benar.</p>
            </article>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Analogy</span>
            <h3>Analogi garis batas di peta</h3>
            <p>Bayangkan kamu memisahkan area aman dan berisiko di peta. Linear model menggambar satu garis batas. Jika data punya pola yang cukup lurus, garis itu sudah sangat berguna. Jika pola melingkar atau kompleks, kamu perlu fitur tambahan atau model non-linear.</p>
        </div>
        <div class="ml-card-grid two">
            <article class="ml-info-card">
                <i class="fas fa-people-arrows"></i>
                <h4>One-vs-rest</h4>
                <p>Untuk banyak kelas, latih satu classifier per kelas: kelas A melawan semua kelas lain.</p>
            </article>
            <article class="ml-info-card">
                <i class="fas fa-code-compare"></i>
                <h4>One-vs-one</h4>
                <p>Latih classifier untuk setiap pasangan kelas, lalu gabungkan voting prediksi.</p>
            </article>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Imbalance</span>
            <h3>Saat kelas tidak seimbang</h3>
            <p>Pada fraud detection, mungkin hanya 1% data yang fraud. Model yang selalu menjawab "aman" bisa punya accuracy 99%, tetapi tidak berguna. Karena itu, gunakan confusion matrix, precision, recall, F1, ROC-AUC, dan strategi imbalance.</p>
        </div>
        <div class="ml-algorithm-strip">
            <article>
                <i class="fas fa-weight-scale"></i>
                <h4>Class weights</h4>
                <p>Memberi penalti lebih besar pada kelas minoritas.</p>
            </article>
            <article>
                <i class="fas fa-copy"></i>
                <h4>Oversampling</h4>
                <p>Menambah contoh kelas minoritas pada training.</p>
            </article>
            <article>
                <i class="fas fa-scissors"></i>
                <h4>Undersampling</h4>
                <p>Mengurangi contoh kelas mayoritas agar distribusi lebih seimbang.</p>
            </article>
            <article>
                <i class="fas fa-wand-magic-sparkles"></i>
                <h4>SMOTE</h4>
                <p>Membuat contoh sintetis kelas minoritas dari tetangga terdekat.</p>
            </article>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Regularization</span>
            <h3>Menahan model agar tidak terlalu liar</h3>
        </div>
        <div class="ml-card-grid two">
            <article class="ml-concept-card">
                <i class="fas fa-compress"></i>
                <h3>L2 regularization</h3>
                <p>Mendorong bobot tetap kecil dan tersebar. Sering dipakai sebagai default untuk stabilitas.</p>
                <code>loss + lambda sum w^2</code>
            </article>
            <article class="ml-concept-card">
                <i class="fas fa-filter"></i>
                <h3>L1 regularization</h3>
                <p>Mendorong sebagian bobot menjadi nol, sehingga bisa membantu feature selection.</p>
                <code>loss + lambda sum |w|</code>
            </article>
        </div>
    </section>

    <section class="ai-ml-checkpoint">
        <div>
            <span>Mini checkpoint</span>
            <h3>Jawab sebentar</h3>
            <p>Pada deteksi fraud dengan fraud hanya 1%, mengapa accuracy tidak cukup? Metrik apa yang akan kamu prioritaskan dan kenapa?</p>
        </div>
    </section>

    <section class="ai-ml-mistakes">
        <div class="ml-section-head">
            <span>Common mistakes</span>
            <h3>Kesalahan yang sering terjadi</h3>
        </div>
        <ul class="ml-check-list">
            <li><i class="fas fa-triangle-exclamation"></i><span>Menganggap logistic regression sama dengan linear regression, padahal outputnya probabilitas kelas.</span></li>
            <li><i class="fas fa-triangle-exclamation"></i><span>Melaporkan accuracy saja pada data imbalanced.</span></li>
            <li><i class="fas fa-triangle-exclamation"></i><span>Menggunakan regularization terlalu besar sampai model underfit.</span></li>
        </ul>
    </section>

    <section class="ai-ml-summary">
        <div>
            <span>Summary</span>
            <h3>Ringkasan</h3>
            <p>Linear discriminative models belajar batas keputusan langsung dari data. Logistic regression memakai sigmoid dan cross-entropy, regularization menjaga bobot tetap terkendali, dan evaluasi perlu sensitif terhadap imbalance.</p>
        </div>
        <a href="#/participant-ai-lab-ml-svm" class="ml-inline-next" data-ml-next="6">Lanjut ke Support Vector Machine <i class="fas fa-arrow-right"></i></a>
    </section>
</article>

````
