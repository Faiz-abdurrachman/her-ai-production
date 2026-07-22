# Mengapa AI Perlu Dievaluasi?

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/chapters/chapter-1.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

Chapter 1

#### Mengapa AI Perlu Dievaluasi?

Sistem AI terlihat pintar, tetapi bukti apa yang menunjukkan sistem itu benar-benar layak digunakan?

##### ** Tujuan Pembelajaran

-   Membedakan software testing dan AI evaluation.
-   Menjelaskan mengapa akurasi saja tidak cukup.
-   Menghubungkan tujuan, pengguna, risiko, metrik, dan release decision.
-   Membedakan output evaluation, model evaluation, dan system evaluation.
-   Memahami TEVV dan monitoring pascadeploy secara konseptual.

##### Inti Konsep

Software biasa biasanya diuji dengan pertanyaan seperti: tombol bekerja, API menjawab, validasi form berjalan, dan error state muncul. Sistem AI perlu pertanyaan tambahan: apakah output benar dalam konteks pengguna, konsisten saat input berubah, aman untuk keputusan yang dibantu, dan jelas ketika sistem tidak tahu?

AI bersifat probabilistik. Satu prompt dapat menghasilkan keluaran berbeda. Performa rata-rata dapat menyembunyikan failure case yang mahal. Karena itu, evaluasi AI harus dimulai dari use case, pengguna, risiko, dan kriteria keberhasilan, bukan dari metrik yang terlihat populer.

Tujuan**Pengguna**Risiko**Metrik**Release**Monitoring

**

**Analogi.** Mengevaluasi AI seperti menguji calon pengemudi. Tidak cukup melihat ia dapat menjalankan kendaraan; kita juga perlu melihat cara ia bereaksi saat hujan, rute berubah, atau ada risiko keselamatan.

###### Chatbot fellowship

Jawaban salah tentang deadline tugas dapat merugikan peserta. Evaluasi perlu memeriksa factuality, sumber, dan kapan chatbot harus mengalihkan ke manusia.

###### AI penilai tugas

Skor rata-rata tinggi tidak cukup bila sistem sering merugikan jenis jawaban tertentu atau tidak konsisten antar percobaan.

##### Lebih Teknis

**Verification** memeriksa apakah sistem dibangun sesuai spesifikasi. **Validation** memeriksa apakah sistem cocok untuk kebutuhan pengguna. **Evaluation** mengukur perilaku dan kualitas sistem dengan data, rubric, dan skenario uji. Dalam kerangka NIST, TEVV melekat sepanjang lifecycle, bukan hanya sebelum deploy.

Release gate sebaiknya tertulis: metrik minimum, failure yang tidak boleh muncul, review manusia, dan kondisi rollback. Risk register membantu tim mencatat risiko, dampak, mitigasi, dan pemilik keputusan.

##### Kesalahan Umum

1.  Memilih metrik sebelum memahami keputusan yang dibantu AI.
2.  Hanya melihat average score dan mengabaikan failure case.
3.  Menganggap evaluasi selesai setelah sistem deploy.
4.  Tidak mendokumentasikan hasil uji, asumsi, dan batasan.

##### Mini-check

Pilih satu AI yang kamu gunakan. Siapa penggunanya, keputusan apa yang dibantu, dan kesalahan apa yang paling berbahaya?

##### Key Takeaways

-   Evaluasi AI adalah pembuktian kelayakan, bukan sekadar penghitungan skor.
-   Akurasi perlu dilengkapi reliability, fairness, safety, dan monitoring.
-   Evaluation plan harus terhubung ke pengguna dan risiko nyata.

##### Glossary

TEVV  
Test, evaluation, validation, and verification sepanjang lifecycle AI.

Release gate  
Syarat terukur sebelum sistem boleh dipakai pengguna.

Risk register  
Daftar risiko, dampak, mitigasi, dan pemilik tindak lanjut.

##### Referensi

1.  NIST, *AI Risk Management Framework 1.0*, 2023.
2.  NIST, *AI Test, Evaluation, Validation and Verification*.
3.  ISO/IEC 25059:2023, *Quality model for AI systems*.

## Lampiran Sumber HTML Lengkap

````html
<article class="ai-evaluation-chapter">
    <header class="ai-evaluation-chapter-head">
        <span>Chapter 1</span>
        <h2>Mengapa AI Perlu Dievaluasi?</h2>
        <p>Sistem AI terlihat pintar, tetapi bukti apa yang menunjukkan sistem itu benar-benar layak digunakan?</p>
    </header>
    <section class="ai-evaluation-section">
        <h3><i class="fas fa-bullseye"></i> Tujuan Pembelajaran</h3>
        <ul>
            <li>Membedakan software testing dan AI evaluation.</li>
            <li>Menjelaskan mengapa akurasi saja tidak cukup.</li>
            <li>Menghubungkan tujuan, pengguna, risiko, metrik, dan release decision.</li>
            <li>Membedakan output evaluation, model evaluation, dan system evaluation.</li>
            <li>Memahami TEVV dan monitoring pascadeploy secara konseptual.</li>
        </ul>
    </section>
    <section class="ai-evaluation-section">
        <h3>Inti Konsep</h3>
        <p>Software biasa biasanya diuji dengan pertanyaan seperti: tombol bekerja, API menjawab, validasi form berjalan, dan error state muncul. Sistem AI perlu pertanyaan tambahan: apakah output benar dalam konteks pengguna, konsisten saat input berubah, aman untuk keputusan yang dibantu, dan jelas ketika sistem tidak tahu?</p>
        <p>AI bersifat probabilistik. Satu prompt dapat menghasilkan keluaran berbeda. Performa rata-rata dapat menyembunyikan failure case yang mahal. Karena itu, evaluasi AI harus dimulai dari use case, pengguna, risiko, dan kriteria keberhasilan, bukan dari metrik yang terlihat populer.</p>
        <div class="ai-evaluation-flow" aria-label="Flow evaluasi awal">
            <span>Tujuan</span><i class="fas fa-arrow-right"></i><span>Pengguna</span><i class="fas fa-arrow-right"></i><span>Risiko</span><i class="fas fa-arrow-right"></i><span>Metrik</span><i class="fas fa-arrow-right"></i><span>Release</span><i class="fas fa-arrow-right"></i><span>Monitoring</span>
        </div>
    </section>
    <section class="ai-evaluation-callout">
        <i class="fas fa-lightbulb"></i>
        <div><strong>Analogi.</strong> Mengevaluasi AI seperti menguji calon pengemudi. Tidak cukup melihat ia dapat menjalankan kendaraan; kita juga perlu melihat cara ia bereaksi saat hujan, rute berubah, atau ada risiko keselamatan.</div>
    </section>
    <section class="ai-evaluation-grid">
        <article><h4>Chatbot fellowship</h4><p>Jawaban salah tentang deadline tugas dapat merugikan peserta. Evaluasi perlu memeriksa factuality, sumber, dan kapan chatbot harus mengalihkan ke manusia.</p></article>
        <article><h4>AI penilai tugas</h4><p>Skor rata-rata tinggi tidak cukup bila sistem sering merugikan jenis jawaban tertentu atau tidak konsisten antar percobaan.</p></article>
    </section>
    <section class="ai-evaluation-section">
        <h3>Lebih Teknis</h3>
        <p><strong>Verification</strong> memeriksa apakah sistem dibangun sesuai spesifikasi. <strong>Validation</strong> memeriksa apakah sistem cocok untuk kebutuhan pengguna. <strong>Evaluation</strong> mengukur perilaku dan kualitas sistem dengan data, rubric, dan skenario uji. Dalam kerangka NIST, TEVV melekat sepanjang lifecycle, bukan hanya sebelum deploy.</p>
        <p>Release gate sebaiknya tertulis: metrik minimum, failure yang tidak boleh muncul, review manusia, dan kondisi rollback. Risk register membantu tim mencatat risiko, dampak, mitigasi, dan pemilik keputusan.</p>
    </section>
    <section class="ai-evaluation-section">
        <h3>Kesalahan Umum</h3>
        <ol>
            <li>Memilih metrik sebelum memahami keputusan yang dibantu AI.</li>
            <li>Hanya melihat average score dan mengabaikan failure case.</li>
            <li>Menganggap evaluasi selesai setelah sistem deploy.</li>
            <li>Tidak mendokumentasikan hasil uji, asumsi, dan batasan.</li>
        </ol>
    </section>
    <section class="ai-evaluation-check">
        <h3>Mini-check</h3>
        <p>Pilih satu AI yang kamu gunakan. Siapa penggunanya, keputusan apa yang dibantu, dan kesalahan apa yang paling berbahaya?</p>
    </section>
    <section class="ai-evaluation-section">
        <h3>Key Takeaways</h3>
        <ul>
            <li>Evaluasi AI adalah pembuktian kelayakan, bukan sekadar penghitungan skor.</li>
            <li>Akurasi perlu dilengkapi reliability, fairness, safety, dan monitoring.</li>
            <li>Evaluation plan harus terhubung ke pengguna dan risiko nyata.</li>
        </ul>
    </section>
    <section class="ai-evaluation-glossary">
        <h3>Glossary</h3>
        <dl><dt>TEVV</dt><dd>Test, evaluation, validation, and verification sepanjang lifecycle AI.</dd><dt>Release gate</dt><dd>Syarat terukur sebelum sistem boleh dipakai pengguna.</dd><dt>Risk register</dt><dd>Daftar risiko, dampak, mitigasi, dan pemilik tindak lanjut.</dd></dl>
    </section>
    <section class="ai-evaluation-references"><h3>Referensi</h3><ol><li>NIST, <em>AI Risk Management Framework 1.0</em>, 2023.</li><li>NIST, <em>AI Test, Evaluation, Validation and Verification</em>.</li><li>ISO/IEC 25059:2023, <em>Quality model for AI systems</em>.</li></ol></section>
</article>

````
