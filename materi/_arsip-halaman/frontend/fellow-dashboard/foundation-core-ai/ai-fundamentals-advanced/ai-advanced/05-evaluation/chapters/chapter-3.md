# Benchmark dan Dataset Evaluasi

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/chapters/chapter-3.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

Chapter 3

#### Benchmark dan Dataset Evaluasi

Benchmark membuat evaluasi bisa dibandingkan, tetapi leaderboard bukan keputusan deploy.

##### ** Tujuan Pembelajaran

-   Membedakan benchmark, evaluation dataset, test set, development set, dan leaderboard.
-   Memilih benchmark berdasarkan use case, domain, bahasa, dan risiko.
-   Mengenali benchmark saturation, contamination, leakage, dan annotation artifact.
-   Memahami pentingnya konteks Indonesia.

##### Inti Konsep

Benchmark adalah alat untuk membuat evaluasi reproducible dan comparable. MMLU, BIG-bench, HELM, MT-Bench, HumanEval, TruthfulQA, HaluEval, BBQ, StereoSet, dan CrowS-Pairs menguji dimensi yang berbeda. Tidak ada satu benchmark yang mewakili semua risiko.

Benchmark bisa salah guna. Model dapat overfit terhadap benchmark populer, data benchmark dapat bocor ke training data, atau benchmark tidak cocok dengan bahasa dan budaya pengguna. Karena itu benchmark eksternal perlu dilengkapi test set internal.

**

**Analogi.** Benchmark seperti ujian masuk. Nilainya memberi sinyal kemampuan, tetapi tidak menjamin seseorang cocok untuk semua pekerjaan atau semua konteks.

##### Studi Kasus

Chatbot akademik ditujukan untuk mahasiswa Indonesia, tetapi hanya diuji dengan benchmark bahasa Inggris. Hasilnya bisa terlihat baik, tetapi gagal pada istilah lokal, gaya bahasa campuran, pertanyaan administratif, dan konteks budaya kampus.

Evaluasi yang lebih sehat memakai benchmark global sebagai baseline, lalu menambahkan IndoLEM, IndoMMLU, IndoBias, dan test set internal dari pertanyaan nyata mahasiswa.

Tugas**Domain**Bahasa**Risiko**Benchmark**Test Set Internal

##### Lebih Teknis

**Contamination detection** mencoba menemukan apakah contoh evaluasi pernah muncul pada data training. **Hidden test set** mengurangi risiko overfitting karena model tidak melihat soal. **Dynamic benchmark** memperbarui data agar benchmark tidak cepat jenuh.

##### Kesalahan Umum

1.  Memilih benchmark karena populer.
2.  Leaderboard dianggap keputusan deploy.
3.  Test set terlalu kecil dan homogen.
4.  Data evaluasi bocor ke training atau prompt tuning.
5.  Tidak memakai data organisasi sendiri.

##### Mini-check

Untuk chatbot fellowship Indonesia, benchmark eksternal apa yang membantu dan test set internal apa yang tetap harus dibuat?

##### Key Takeaways

-   Benchmark adalah alat bantu perbandingan.
-   Representativeness lebih penting daripada popularitas benchmark.
-   Produk Indonesia perlu evaluasi bahasa, domain, dan budaya lokal.

##### Glossary

Leaderboard  
Daftar peringkat model pada benchmark tertentu.

Data contamination  
Kondisi saat data evaluasi muncul dalam data training.

Benchmark saturation  
Kondisi saat benchmark tidak lagi membedakan kemampuan model.

##### Referensi

1.  Hendrycks et al., *MMLU*, 2021.
2.  Liang et al., *HELM*, 2022.
3.  Koto et al., *IndoLEM*, 2020.
4.  Koto et al., *IndoMMLU*, 2023.
5.  Hanif et al., *IndoBias*, 2024.

## Lampiran Sumber HTML Lengkap

````html
<article class="ai-evaluation-chapter">
    <header class="ai-evaluation-chapter-head"><span>Chapter 3</span><h2>Benchmark dan Dataset Evaluasi</h2><p>Benchmark membuat evaluasi bisa dibandingkan, tetapi leaderboard bukan keputusan deploy.</p></header>
    <section class="ai-evaluation-section"><h3><i class="fas fa-bullseye"></i> Tujuan Pembelajaran</h3><ul><li>Membedakan benchmark, evaluation dataset, test set, development set, dan leaderboard.</li><li>Memilih benchmark berdasarkan use case, domain, bahasa, dan risiko.</li><li>Mengenali benchmark saturation, contamination, leakage, dan annotation artifact.</li><li>Memahami pentingnya konteks Indonesia.</li></ul></section>
    <section class="ai-evaluation-section"><h3>Inti Konsep</h3><p>Benchmark adalah alat untuk membuat evaluasi reproducible dan comparable. MMLU, BIG-bench, HELM, MT-Bench, HumanEval, TruthfulQA, HaluEval, BBQ, StereoSet, dan CrowS-Pairs menguji dimensi yang berbeda. Tidak ada satu benchmark yang mewakili semua risiko.</p><p>Benchmark bisa salah guna. Model dapat overfit terhadap benchmark populer, data benchmark dapat bocor ke training data, atau benchmark tidak cocok dengan bahasa dan budaya pengguna. Karena itu benchmark eksternal perlu dilengkapi test set internal.</p></section>
    <section class="ai-evaluation-callout"><i class="fas fa-lightbulb"></i><div><strong>Analogi.</strong> Benchmark seperti ujian masuk. Nilainya memberi sinyal kemampuan, tetapi tidak menjamin seseorang cocok untuk semua pekerjaan atau semua konteks.</div></section>
    <section class="ai-evaluation-section"><h3>Studi Kasus</h3><p>Chatbot akademik ditujukan untuk mahasiswa Indonesia, tetapi hanya diuji dengan benchmark bahasa Inggris. Hasilnya bisa terlihat baik, tetapi gagal pada istilah lokal, gaya bahasa campuran, pertanyaan administratif, dan konteks budaya kampus.</p><p>Evaluasi yang lebih sehat memakai benchmark global sebagai baseline, lalu menambahkan IndoLEM, IndoMMLU, IndoBias, dan test set internal dari pertanyaan nyata mahasiswa.</p></section>
    <section class="ai-evaluation-flow"><span>Tugas</span><i class="fas fa-arrow-right"></i><span>Domain</span><i class="fas fa-arrow-right"></i><span>Bahasa</span><i class="fas fa-arrow-right"></i><span>Risiko</span><i class="fas fa-arrow-right"></i><span>Benchmark</span><i class="fas fa-arrow-right"></i><span>Test Set Internal</span></section>
    <section class="ai-evaluation-section"><h3>Lebih Teknis</h3><p><strong>Contamination detection</strong> mencoba menemukan apakah contoh evaluasi pernah muncul pada data training. <strong>Hidden test set</strong> mengurangi risiko overfitting karena model tidak melihat soal. <strong>Dynamic benchmark</strong> memperbarui data agar benchmark tidak cepat jenuh.</p></section>
    <section class="ai-evaluation-section"><h3>Kesalahan Umum</h3><ol><li>Memilih benchmark karena populer.</li><li>Leaderboard dianggap keputusan deploy.</li><li>Test set terlalu kecil dan homogen.</li><li>Data evaluasi bocor ke training atau prompt tuning.</li><li>Tidak memakai data organisasi sendiri.</li></ol></section>
    <section class="ai-evaluation-check"><h3>Mini-check</h3><p>Untuk chatbot fellowship Indonesia, benchmark eksternal apa yang membantu dan test set internal apa yang tetap harus dibuat?</p></section>
    <section class="ai-evaluation-section"><h3>Key Takeaways</h3><ul><li>Benchmark adalah alat bantu perbandingan.</li><li>Representativeness lebih penting daripada popularitas benchmark.</li><li>Produk Indonesia perlu evaluasi bahasa, domain, dan budaya lokal.</li></ul></section>
    <section class="ai-evaluation-glossary"><h3>Glossary</h3><dl><dt>Leaderboard</dt><dd>Daftar peringkat model pada benchmark tertentu.</dd><dt>Data contamination</dt><dd>Kondisi saat data evaluasi muncul dalam data training.</dd><dt>Benchmark saturation</dt><dd>Kondisi saat benchmark tidak lagi membedakan kemampuan model.</dd></dl></section>
    <section class="ai-evaluation-references"><h3>Referensi</h3><ol><li>Hendrycks et al., <em>MMLU</em>, 2021.</li><li>Liang et al., <em>HELM</em>, 2022.</li><li>Koto et al., <em>IndoLEM</em>, 2020.</li><li>Koto et al., <em>IndoMMLU</em>, 2023.</li><li>Hanif et al., <em>IndoBias</em>, 2024.</li></ol></section>
</article>

````
