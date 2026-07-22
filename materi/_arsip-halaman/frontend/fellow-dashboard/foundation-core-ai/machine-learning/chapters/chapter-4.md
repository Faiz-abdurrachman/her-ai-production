# Probabilistic Models

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/machine-learning/chapters/chapter-4.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

Chapter 4

#### Probabilistic Models

Probabilistic models melihat prediksi sebagai ketidakpastian yang bisa dihitung. Alih-alih hanya memberi kelas, model dapat berkata "kemungkinan kelas A lebih besar daripada kelas B".

Learning objectives

##### Setelah materi ini, kamu mampu

-   **Membaca konsep probability, expectation, variance, dan independence dalam konteks ML.
-   **Menjelaskan Bayes theorem, MLE, Naive Bayes, dan Laplace smoothing.
-   **Memahami kapan Bayesian Network berguna untuk relasi antar variabel.

Why it matters

##### Kenapa probabilitas penting?

Data dunia nyata penuh ketidakpastian. Email dengan kata "gratis" belum tentu spam. Gejala tertentu belum tentu penyakit tertentu. Probabilistic models membantu model menyatakan tingkat keyakinan dan menggabungkan bukti.

**

##### Probability

Ukuran peluang sebuah kejadian terjadi, dari 0 sampai 1.

**

##### Expectation & variance

Expectation membaca nilai rata-rata jangka panjang; variance membaca sebaran atau ketidakstabilan.

**

##### Independence

Dua variabel independen jika mengetahui satu variabel tidak mengubah peluang variabel lain.

Formula

##### Bayes theorem dan Naive Bayes

`P(A|B) = P(B|A) P(A) / P(B)`

**Bayes theorem.** Mengubah prior belief P(A) menjadi posterior P(A|B) setelah melihat bukti B.

`argmax_c P(c) product_j P(x_j|c)`

**Naive Bayes.** Pilih kelas c yang paling mungkin berdasarkan prior kelas dan peluang tiap fitur pada kelas tersebut.

`P(word|class) = (count + alpha) / (total + alpha V)`

**Laplace smoothing.** Mencegah peluang menjadi nol saat kata tertentu belum pernah muncul pada kelas tertentu.

Analogy

##### Analogi detektif

Seorang detektif tidak langsung menyimpulkan. Ia mulai dari dugaan awal, lalu memperbarui keyakinan setelah melihat bukti. Naive Bayes melakukan hal serupa: prior kelas diperbarui oleh bukti fitur, meski dengan asumsi fitur saling independen dalam kelas.

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Konsep
Makna manusiawi
Contoh spam filter</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Prior
Keyakinan sebelum melihat isi email.
30% email historis adalah spam.</td>
<td align="left">Likelihood
Seberapa cocok bukti dengan kelas tertentu.
Kata &quot;hadiah&quot; sering muncul di email spam.</td>
<td align="left">Posterior
Keyakinan setelah bukti digabungkan.
Email ini 86% mungkin spam.</td>
</tr>
</tbody>
</table>

Real examples

##### Contoh penggunaan nyata

**Text classification**

Naive Bayes sering menjadi baseline kuat untuk spam detection dan klasifikasi dokumen.

**Medical triage**

Probabilitas membantu membaca risiko berdasarkan gejala, usia, dan histori.

**Risk scoring**

Model probabilistik dapat memberi skor risiko alih-alih keputusan hitam-putih.

Bayesian Network

##### Relasi antar variabel

Bayesian Network memakai Directed Acyclic Graph (DAG) untuk memodelkan ketergantungan antar variabel. Ini berguna saat kamu ingin menyatakan struktur sebab-akibat atau dependensi yang lebih eksplisit daripada asumsi Naive Bayes.

**Cause** Contoh: kondisi cuaca.

**

**Evidence** Contoh: jalan basah, keterlambatan.

**

**Belief update** Model memperbarui probabilitas kejadian terkait.

Mini checkpoint

##### Jawab sebentar

Naive Bayes mengasumsikan fitur independen dalam kelas. Menurutmu, kenapa asumsi yang tidak selalu realistis ini masih bisa bekerja baik untuk klasifikasi teks?

Common mistakes

##### Kesalahan yang sering terjadi

-   **Membaca probabilitas model sebagai kepastian mutlak.
-   **Lupa smoothing sehingga satu kata yang tidak pernah muncul membuat peluang kelas menjadi nol.
-   **Mengabaikan calibration saat probabilitas dipakai untuk keputusan berisiko tinggi.

Summary

##### Ringkasan

Probabilistic models membantu AI bekerja dengan ketidakpastian. Bayes theorem menggabungkan prior dan bukti, Naive Bayes memberi baseline cepat, dan Bayesian Network memperkaya relasi antar variabel.

[Lanjut ke Linear Discriminative Models **](#/participant-ai-lab-ml-linear-discriminative)

## Lampiran Sumber HTML Lengkap

````html
<article class="ml-chapter ai-ml-chapter">
    <header class="ml-chapter-header">
        <span>Chapter 4</span>
        <h2>Probabilistic Models</h2>
        <p>Probabilistic models melihat prediksi sebagai ketidakpastian yang bisa dihitung. Alih-alih hanya memberi kelas, model dapat berkata "kemungkinan kelas A lebih besar daripada kelas B".</p>
    </header>

    <section class="ai-ml-learning-card">
        <div class="ml-section-head">
            <span>Learning objectives</span>
            <h3>Setelah materi ini, kamu mampu</h3>
        </div>
        <ul class="ai-ml-objectives">
            <li><i class="fas fa-circle-check"></i><span>Membaca konsep probability, expectation, variance, dan independence dalam konteks ML.</span></li>
            <li><i class="fas fa-circle-check"></i><span>Menjelaskan Bayes theorem, MLE, Naive Bayes, dan Laplace smoothing.</span></li>
            <li><i class="fas fa-circle-check"></i><span>Memahami kapan Bayesian Network berguna untuk relasi antar variabel.</span></li>
        </ul>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Why it matters</span>
            <h3>Kenapa probabilitas penting?</h3>
            <p>Data dunia nyata penuh ketidakpastian. Email dengan kata "gratis" belum tentu spam. Gejala tertentu belum tentu penyakit tertentu. Probabilistic models membantu model menyatakan tingkat keyakinan dan menggabungkan bukti.</p>
        </div>
        <div class="ml-card-grid three">
            <article class="ml-concept-card">
                <i class="fas fa-percent"></i>
                <h3>Probability</h3>
                <p>Ukuran peluang sebuah kejadian terjadi, dari 0 sampai 1.</p>
            </article>
            <article class="ml-concept-card">
                <i class="fas fa-wave-square"></i>
                <h3>Expectation &amp; variance</h3>
                <p>Expectation membaca nilai rata-rata jangka panjang; variance membaca sebaran atau ketidakstabilan.</p>
            </article>
            <article class="ml-concept-card">
                <i class="fas fa-link"></i>
                <h3>Independence</h3>
                <p>Dua variabel independen jika mengetahui satu variabel tidak mengubah peluang variabel lain.</p>
            </article>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Formula</span>
            <h3>Bayes theorem dan Naive Bayes</h3>
        </div>
        <div class="ai-ml-formula-list">
            <article>
                <code>P(A|B) = P(B|A) P(A) / P(B)</code>
                <p><b>Bayes theorem.</b> Mengubah prior belief P(A) menjadi posterior P(A|B) setelah melihat bukti B.</p>
            </article>
            <article>
                <code>argmax_c P(c) product_j P(x_j|c)</code>
                <p><b>Naive Bayes.</b> Pilih kelas c yang paling mungkin berdasarkan prior kelas dan peluang tiap fitur pada kelas tersebut.</p>
            </article>
            <article>
                <code>P(word|class) = (count + alpha) / (total + alpha V)</code>
                <p><b>Laplace smoothing.</b> Mencegah peluang menjadi nol saat kata tertentu belum pernah muncul pada kelas tertentu.</p>
            </article>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Analogy</span>
            <h3>Analogi detektif</h3>
            <p>Seorang detektif tidak langsung menyimpulkan. Ia mulai dari dugaan awal, lalu memperbarui keyakinan setelah melihat bukti. Naive Bayes melakukan hal serupa: prior kelas diperbarui oleh bukti fitur, meski dengan asumsi fitur saling independen dalam kelas.</p>
        </div>
        <div class="ml-table-card">
            <table>
                <thead>
                    <tr>
                        <th>Konsep</th>
                        <th>Makna manusiawi</th>
                        <th>Contoh spam filter</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Prior</td>
                        <td>Keyakinan sebelum melihat isi email.</td>
                        <td>30% email historis adalah spam.</td>
                    </tr>
                    <tr>
                        <td>Likelihood</td>
                        <td>Seberapa cocok bukti dengan kelas tertentu.</td>
                        <td>Kata "hadiah" sering muncul di email spam.</td>
                    </tr>
                    <tr>
                        <td>Posterior</td>
                        <td>Keyakinan setelah bukti digabungkan.</td>
                        <td>Email ini 86% mungkin spam.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Real examples</span>
            <h3>Contoh penggunaan nyata</h3>
        </div>
        <div class="ml-case-grid">
            <article>
                <b>Text classification</b>
                <p>Naive Bayes sering menjadi baseline kuat untuk spam detection dan klasifikasi dokumen.</p>
            </article>
            <article>
                <b>Medical triage</b>
                <p>Probabilitas membantu membaca risiko berdasarkan gejala, usia, dan histori.</p>
            </article>
            <article>
                <b>Risk scoring</b>
                <p>Model probabilistik dapat memberi skor risiko alih-alih keputusan hitam-putih.</p>
            </article>
        </div>
    </section>

    <section class="ml-topic-block">
        <div class="ml-section-head">
            <span>Bayesian Network</span>
            <h3>Relasi antar variabel</h3>
            <p>Bayesian Network memakai Directed Acyclic Graph (DAG) untuk memodelkan ketergantungan antar variabel. Ini berguna saat kamu ingin menyatakan struktur sebab-akibat atau dependensi yang lebih eksplisit daripada asumsi Naive Bayes.</p>
        </div>
        <div class="ml-flow">
            <div class="ml-flow-step">
                <strong>Cause</strong>
                <span>Contoh: kondisi cuaca.</span>
            </div>
            <i class="fas fa-arrow-right"></i>
            <div class="ml-flow-step">
                <strong>Evidence</strong>
                <span>Contoh: jalan basah, keterlambatan.</span>
            </div>
            <i class="fas fa-arrow-right"></i>
            <div class="ml-flow-step">
                <strong>Belief update</strong>
                <span>Model memperbarui probabilitas kejadian terkait.</span>
            </div>
        </div>
    </section>

    <section class="ai-ml-checkpoint">
        <div>
            <span>Mini checkpoint</span>
            <h3>Jawab sebentar</h3>
            <p>Naive Bayes mengasumsikan fitur independen dalam kelas. Menurutmu, kenapa asumsi yang tidak selalu realistis ini masih bisa bekerja baik untuk klasifikasi teks?</p>
        </div>
    </section>

    <section class="ai-ml-mistakes">
        <div class="ml-section-head">
            <span>Common mistakes</span>
            <h3>Kesalahan yang sering terjadi</h3>
        </div>
        <ul class="ml-check-list">
            <li><i class="fas fa-triangle-exclamation"></i><span>Membaca probabilitas model sebagai kepastian mutlak.</span></li>
            <li><i class="fas fa-triangle-exclamation"></i><span>Lupa smoothing sehingga satu kata yang tidak pernah muncul membuat peluang kelas menjadi nol.</span></li>
            <li><i class="fas fa-triangle-exclamation"></i><span>Mengabaikan calibration saat probabilitas dipakai untuk keputusan berisiko tinggi.</span></li>
        </ul>
    </section>

    <section class="ai-ml-summary">
        <div>
            <span>Summary</span>
            <h3>Ringkasan</h3>
            <p>Probabilistic models membantu AI bekerja dengan ketidakpastian. Bayes theorem menggabungkan prior dan bukti, Naive Bayes memberi baseline cepat, dan Bayesian Network memperkaya relasi antar variabel.</p>
        </div>
        <a href="#/participant-ai-lab-ml-linear-discriminative" class="ml-inline-next" data-ml-next="5">Lanjut ke Linear Discriminative Models <i class="fas fa-arrow-right"></i></a>
    </section>
</article>

````
