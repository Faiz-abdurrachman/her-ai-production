# Bias dan Fairness

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/chapters/chapter-5.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

Chapter 5

#### Bias dan Fairness

Bias AI adalah masalah sosio-teknis, bukan sekadar dataset tidak seimbang.

##### ** Tujuan Pembelajaran

-   Membedakan bias statistik, data, label, sosial, institusional, dan harmful bias.
-   Memahami fairness, equality, equity, protected group, subgroup, dan feedback loop.
-   Memilih fairness metric sesuai konteks.
-   Menyusun mitigasi dan human review.

##### Inti Konsep

Bias dapat muncul dari pengumpulan data, representasi, label, fitur, target, metric, kebijakan, deployment, dan interaksi pengguna. Menghapus atribut sensitif tidak otomatis menghapus bias karena fitur lain bisa menjadi proxy.

Tidak ada satu metrik fairness universal. Outcome rate, true positive rate, false positive rate, demographic parity, equal opportunity, equalized odds, dan disparate impact membaca sisi berbeda dari keputusan. Pilihan metrik harus mengikuti risiko dan konteks.

**

**Analogi.** Mengaudit bias seperti memeriksa akses gedung. Rata-rata orang bisa masuk, tetapi jika kelompok tertentu selalu kesulitan, desainnya belum adil.

##### Studi Kasus

Sistem AI membantu screening pendaftar fellowship atau beasiswa. Tim perlu memeriksa kelompok terdampak, data yang perlu diperiksa, sumber bias, fairness check, human review, dan mitigasi. Untuk konteks Indonesia, audit juga perlu peka pada variasi bahasa, akses teknologi, dan latar pendidikan.

Prinsip etika AI Indonesia menekankan inklusivitas, non-diskriminasi, transparansi, akuntabilitas, perlindungan data pribadi, dan manajemen risiko. Keputusan berisiko tinggi tidak seharusnya sepenuhnya otomatis.

##### Lebih Teknis

**Subgroup evaluation** melihat performa pada kelompok tertentu. **Intersectional evaluation** memeriksa kombinasi identitas atau kondisi. Mitigasi dapat dilakukan melalui pre-processing, in-processing, atau post-processing, tetapi semua pilihan memiliki trade-off utility dan fairness.

##### Kesalahan Umum

1.  Menghapus atribut sensitif dianggap menyelesaikan bias.
2.  Hanya melihat rata-rata.
3.  Satu metric dipakai untuk semua konteks.
4.  Kelompok kecil tidak diperiksa.
5.  Fairness dianggap murni masalah teknis.

##### Mini-check

Pada screening beasiswa, false negative dan false positive berdampak pada siapa? Metrik apa yang perlu dipantau?

##### Key Takeaways

-   Bias dapat muncul dari data, model, output, dan keputusan deploy.
-   Fairness metric harus dipilih sesuai dampak keputusan.
-   Human oversight dan jalur koreksi penting untuk sistem berisiko.

##### Glossary

Disparate impact  
Perbedaan outcome rate antarkelompok.

Equalized odds  
Kriteria fairness berbasis kesetaraan error rate.

Feedback loop  
Kondisi saat output sistem memengaruhi data berikutnya dan memperkuat pola lama.

##### Referensi

1.  NIST, *AI Risk Management Framework 1.0*, 2023.
2.  Nadeem et al., *StereoSet*, 2021.
3.  Nangia et al., *CrowS-Pairs*, 2020.
4.  Parrish et al., *BBQ*, 2022.
5.  Hanif et al., *IndoBias*, 2024.
6.  Kominfo, *SE Nomor 9 Tahun 2023 tentang Etika Kecerdasan Artifisial*.

## Lampiran Sumber HTML Lengkap

````html
<article class="ai-evaluation-chapter">
    <header class="ai-evaluation-chapter-head"><span>Chapter 5</span><h2>Bias dan Fairness</h2><p>Bias AI adalah masalah sosio-teknis, bukan sekadar dataset tidak seimbang.</p></header>
    <section class="ai-evaluation-section"><h3><i class="fas fa-bullseye"></i> Tujuan Pembelajaran</h3><ul><li>Membedakan bias statistik, data, label, sosial, institusional, dan harmful bias.</li><li>Memahami fairness, equality, equity, protected group, subgroup, dan feedback loop.</li><li>Memilih fairness metric sesuai konteks.</li><li>Menyusun mitigasi dan human review.</li></ul></section>
    <section class="ai-evaluation-section"><h3>Inti Konsep</h3><p>Bias dapat muncul dari pengumpulan data, representasi, label, fitur, target, metric, kebijakan, deployment, dan interaksi pengguna. Menghapus atribut sensitif tidak otomatis menghapus bias karena fitur lain bisa menjadi proxy.</p><p>Tidak ada satu metrik fairness universal. Outcome rate, true positive rate, false positive rate, demographic parity, equal opportunity, equalized odds, dan disparate impact membaca sisi berbeda dari keputusan. Pilihan metrik harus mengikuti risiko dan konteks.</p></section>
    <section class="ai-evaluation-callout"><i class="fas fa-lightbulb"></i><div><strong>Analogi.</strong> Mengaudit bias seperti memeriksa akses gedung. Rata-rata orang bisa masuk, tetapi jika kelompok tertentu selalu kesulitan, desainnya belum adil.</div></section>
    <section class="ai-evaluation-section"><h3>Studi Kasus</h3><p>Sistem AI membantu screening pendaftar fellowship atau beasiswa. Tim perlu memeriksa kelompok terdampak, data yang perlu diperiksa, sumber bias, fairness check, human review, dan mitigasi. Untuk konteks Indonesia, audit juga perlu peka pada variasi bahasa, akses teknologi, dan latar pendidikan.</p><p>Prinsip etika AI Indonesia menekankan inklusivitas, non-diskriminasi, transparansi, akuntabilitas, perlindungan data pribadi, dan manajemen risiko. Keputusan berisiko tinggi tidak seharusnya sepenuhnya otomatis.</p></section>
    <section class="ai-evaluation-section"><h3>Lebih Teknis</h3><p><strong>Subgroup evaluation</strong> melihat performa pada kelompok tertentu. <strong>Intersectional evaluation</strong> memeriksa kombinasi identitas atau kondisi. Mitigasi dapat dilakukan melalui pre-processing, in-processing, atau post-processing, tetapi semua pilihan memiliki trade-off utility dan fairness.</p></section>
    <section class="ai-evaluation-section"><h3>Kesalahan Umum</h3><ol><li>Menghapus atribut sensitif dianggap menyelesaikan bias.</li><li>Hanya melihat rata-rata.</li><li>Satu metric dipakai untuk semua konteks.</li><li>Kelompok kecil tidak diperiksa.</li><li>Fairness dianggap murni masalah teknis.</li></ol></section>
    <section class="ai-evaluation-check"><h3>Mini-check</h3><p>Pada screening beasiswa, false negative dan false positive berdampak pada siapa? Metrik apa yang perlu dipantau?</p></section>
    <section class="ai-evaluation-section"><h3>Key Takeaways</h3><ul><li>Bias dapat muncul dari data, model, output, dan keputusan deploy.</li><li>Fairness metric harus dipilih sesuai dampak keputusan.</li><li>Human oversight dan jalur koreksi penting untuk sistem berisiko.</li></ul></section>
    <section class="ai-evaluation-glossary"><h3>Glossary</h3><dl><dt>Disparate impact</dt><dd>Perbedaan outcome rate antarkelompok.</dd><dt>Equalized odds</dt><dd>Kriteria fairness berbasis kesetaraan error rate.</dd><dt>Feedback loop</dt><dd>Kondisi saat output sistem memengaruhi data berikutnya dan memperkuat pola lama.</dd></dl></section>
    <section class="ai-evaluation-references"><h3>Referensi</h3><ol><li>NIST, <em>AI Risk Management Framework 1.0</em>, 2023.</li><li>Nadeem et al., <em>StereoSet</em>, 2021.</li><li>Nangia et al., <em>CrowS-Pairs</em>, 2020.</li><li>Parrish et al., <em>BBQ</em>, 2022.</li><li>Hanif et al., <em>IndoBias</em>, 2024.</li><li>Kominfo, <em>SE Nomor 9 Tahun 2023 tentang Etika Kecerdasan Artifisial</em>.</li></ol></section>
</article>

````
