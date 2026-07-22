# Evaluation AI

> Ekspor lengkap dari sumber materi HerAI yang tersedia di repository.
> Mencakup materi, latihan, kuis, diskusi, pembahasan, versi legacy, dan/atau data interaktif bila tersedia.

## Mengapa AI Perlu Dievaluasi?

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/chapters/chapter-1.html`

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

## Mengevaluasi Output AI

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/chapters/chapter-2.html`

Chapter 2

#### Mengevaluasi Output AI

Jawaban yang lancar belum tentu relevan, faktual, lengkap, atau aman.

##### ** Tujuan Pembelajaran

-   Menyusun rubric evaluasi output.
-   Memilih human evaluation, automatic metrics, atau LLM-as-a-judge.
-   Memahami metrik Accuracy, Precision, Recall, F1, BLEU, ROUGE, BERTScore, pass@k, faithfulness, dan answer relevancy.
-   Menilai output generatif, RAG, summarization, QA, dan code generation.

##### Inti Konsep

Evaluasi output menjawab pertanyaan paling dekat dengan pengguna: seberapa baik hasil yang keluar dari sistem AI? Untuk tugas tertutup, accuracy bisa menjadi awal. Untuk tugas terbuka seperti ringkasan, dialog, RAG, dan code generation, tim perlu rubric yang menilai relevansi, factuality, completeness, coherence, clarity, instruction following, usefulness, safety, dan faithfulness.

Metrik otomatis membantu efisiensi, tetapi tidak otomatis membuktikan kebenaran faktual. BLEU dan ROUGE berbasis overlap teks. BERTScore membaca kemiripan semantik. pass@k berguna untuk code generation. Pada RAG, faithfulness dan answer relevancy memisahkan kualitas retrieval dan generation.

**

**Analogi.** Menilai output AI seperti menilai esai. Kita tidak hanya menghitung kata yang sama dengan kunci jawaban; kita membaca apakah argumennya relevan, faktanya benar, lengkap, jelas, dan tidak menyesatkan.

##### Studi Kasus

Dokumen sumber menyebut: "Pengajuan cuti minimal tujuh hari sebelum tanggal cuti dan harus disetujui mentor." Jawaban A menulis bahwa peserta boleh mengajukan cuti kapan saja selama memberi kabar. Jawaban B menulis bahwa cuti perlu diajukan tujuh hari sebelumnya dan tetap menunggu persetujuan mentor.

Jawaban A terdengar lancar tetapi salah secara factuality dan faithfulness. Jawaban B lebih pendek tetapi lebih aman karena mengikuti sumber.

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Dimensi
Pertanyaan</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Relevansi
Apakah menjawab kebutuhan pengguna?</td>
<td align="left">Factuality
Apakah klaim benar?</td>
</tr>
</tbody>
</table>

##### Lebih Teknis

**Pairwise comparison** meminta evaluator memilih output yang lebih baik dari dua kandidat. **Reference-based evaluation** membandingkan output dengan jawaban referensi. **Reference-free evaluation** menilai output tanpa referensi tunggal, biasanya memakai rubric. LLM-as-a-judge perlu dikalibrasi karena dapat bias terhadap jawaban panjang, posisi opsi, atau gaya bahasa tertentu.

##### Kesalahan Umum

1.  Jawaban panjang dianggap lebih baik.
2.  Gaya bahasa lebih dipentingkan daripada fakta.
3.  Satu evaluator dianggap cukup.
4.  Metrik tidak sesuai tugas.
5.  Rubric terlalu abstrak sehingga evaluator menafsirkan berbeda.

##### Mini-check

Buat rubric 1-4 untuk menilai jawaban chatbot akademik. Dimensi apa yang wajib ada?

##### Key Takeaways

-   Output generatif perlu rubric, bukan hanya skor kemiripan.
-   Skor tinggi tidak otomatis berarti faktual.
-   Pada RAG, evaluasi retrieval dan generation perlu dipisahkan.

##### Glossary

Faithfulness  
Kesesuaian output dengan sumber yang diberikan.

LLM-as-a-judge  
Penggunaan model bahasa sebagai evaluator output.

pass@k  
Peluang minimal satu solusi benar dari k percobaan pada code generation.

##### Referensi

1.  Papineni et al., *BLEU*, 2002.
2.  Lin, *ROUGE*, 2004.
3.  Zhang et al., *BERTScore*, 2019.
4.  Es et al., *RAGAS*, 2023.

## Benchmark dan Dataset Evaluasi

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/chapters/chapter-3.html`

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

## Reliability dan Robustness

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/chapters/chapter-4.html`

Chapter 4

#### Reliability dan Robustness

Model yang sering benar belum tentu dapat dipercaya saat kondisi berubah.

##### ** Tujuan Pembelajaran

-   Memahami reliability, consistency, robustness, calibration, confidence, dan uncertainty.
-   Mengenali hallucination, distribution shift, adversarial input, prompt injection, dan edge case.
-   Menyusun stress-test plan.
-   Membaca Expected Calibration Error dan Brier score secara konseptual.

##### Inti Konsep

Reliability berarti sistem menunjukkan perilaku yang dapat dipercaya secara konsisten. Robustness berarti sistem tetap berfungsi ketika bentuk input berubah: typo, bahasa informal, pertanyaan ambigu, dokumen panjang, atau input di luar domain. Calibration berarti confidence sejalan dengan kemungkinan jawaban benar.

Untuk LLM, reliability juga mencakup factual reliability. Sistem harus mampu menyatakan keterbatasan ketika sumber tidak tersedia. TruthfulQA, HaluEval, SelfCheckGPT, dan Robustness Gym dapat menjadi inspirasi untuk stress test.

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Kondisi
Expected behavior</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Typo
Tetap memahami atau meminta klarifikasi.</td>
<td align="left">Pertanyaan ambigu
Meminta klarifikasi.</td>
</tr>
</tbody>
</table>

**

**Analogi.** Sopir yang baik bukan hanya cepat di jalan kosong. Ia tetap aman saat hujan, rute berubah, atau penumpang memberi instruksi membingungkan.

##### Lebih Teknis

**Repeated sampling** membandingkan beberapa output untuk pertanyaan yang sama. **Perturbation test** mengubah input sedikit untuk melihat kestabilan jawaban. **Out-of-distribution evaluation** menguji input yang berbeda dari data biasa. Confidence binning membantu membaca calibration tanpa memaksa peserta menghitung formula kompleks.

##### Kesalahan Umum

1.  Confidence dianggap probabilitas kebenaran tanpa validasi.
2.  Hanya menguji input bersih.
3.  Failure behavior tidak ditentukan.
4.  Tidak menguji perubahan distribusi.
5.  Tidak melakukan monitoring pascadeploy.

##### Mini-check

Jika chatbot menjawab dengan yakin ketika sumber tidak tersedia, evaluasi apa yang perlu ditambahkan?

##### Key Takeaways

-   Reliability menguji konsistensi, batas, dan cara sistem gagal.
-   Robustness wajib mencakup variasi input dunia nyata.
-   Monitoring pascadeploy adalah bagian dari evaluasi reliability.

##### Glossary

Calibration  
Kesesuaian confidence model dengan peluang benar.

Hallucination  
Output tanpa dasar yang memadai.

Distribution shift  
Perubahan pola input dari kondisi evaluasi awal.

##### Referensi

1.  Guo et al., *On Calibration of Modern Neural Networks*, 2017.
2.  Manakul et al., *SelfCheckGPT*, 2023.
3.  Lin et al., *TruthfulQA*, 2021.
4.  Li et al., *HaluEval*, 2023.
5.  Goel et al., *Robustness Gym*, 2021.

## Bias dan Fairness

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/chapters/chapter-5.html`

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

## Kualitas Sistem AI dan Evaluation Plan

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/chapters/chapter-6.html`

Chapter 6

#### Kualitas Sistem AI dan Evaluation Plan

Model yang tinggi benchmark belum tentu menjadi sistem yang layak digunakan.

##### ** Tujuan Pembelajaran

-   Membedakan model quality dan system quality.
-   Memahami AI lifecycle, release criteria, monitoring, incident response, rollback, dan audit trail.
-   Mengenal NIST AI RMF, NIST TEVV, ISO/IEC 25059, dan ISO/IEC 42001 secara konseptual.
-   Menyusun AI Evaluation Plan.

##### Inti Konsep

Kualitas sistem AI mencakup model, data, UX, kontrol manusia, monitoring, dokumentasi, dan proses organisasi. Sistem dapat gagal bila tidak memiliki fallback, tidak dapat dihentikan, tidak punya human review, tidak punya incident response, atau perubahan model tidak terdokumentasi.

ISO/IEC 25059 membantu memberi bahasa mutu produk AI, sedangkan ISO/IEC 42001 membawa perspektif sistem manajemen AI. NIST AI RMF dan TEVV membantu menghubungkan evaluasi teknis dengan governance: map, measure, manage, release, monitor, investigate, improve, evaluate again.

Map**Measure**Manage**Release**Monitor**Improve

**

**Analogi.** Model AI seperti mesin mobil. Sistem AI adalah mobil lengkap dengan rem, spion, dashboard, aturan servis, pengemudi, dan prosedur darurat.

##### Template AI Evaluation Plan

1.  Nama sistem
2.  Tujuan
3.  Pengguna
4.  Konteks penggunaan
5.  Risiko
6.  Failure paling berbahaya
7.  Kriteria output
8.  Benchmark
9.  Test set
10. Metrik
11. Reliability test
12. Bias audit
13. Human review
14. Release criteria
15. Monitoring
16. Incident response
17. Escalation
18. Rollback
19. Evaluasi ulang
20. Change log

##### Lebih Teknis

**Model card** dan **system card** membantu mendokumentasikan tujuan, data, batasan, dan hasil evaluasi. **Change management** memastikan perubahan model, prompt, data, atau kebijakan diuji ulang sebelum rilis. **Rollback** adalah kemampuan kembali ke versi aman ketika incident terjadi.

##### Kesalahan Umum

1.  Evaluation plan dianggap dokumen formalitas.
2.  Release criteria tidak terukur.
3.  Tidak punya incident response dan rollback.
4.  Monitoring hanya melihat uptime, bukan kualitas output.
5.  Evaluasi ulang tidak dijadwalkan setelah model berubah.

##### Mini-check

Susun tiga release criteria untuk asisten AI HerAI yang menjawab materi, jadwal, tugas, dan aturan fellowship.

##### Key Takeaways

-   Kualitas sistem AI adalah gabungan performa, kontrol, monitoring, dan governance.
-   Evaluation plan mengubah evaluasi dari ad hoc menjadi proses yang dapat diulang.
-   Sistem AI yang baik selalu punya mekanisme perbaikan berkelanjutan.

##### Glossary

System quality  
Kualitas produk AI sebagai sistem lengkap, bukan hanya model.

Rollback  
Kemampuan kembali ke versi aman ketika rilis bermasalah.

Incident response  
Prosedur menangani kesalahan serius atau dampak tak diinginkan.

##### Referensi

1.  NIST, *AI Risk Management Framework 1.0*, 2023.
2.  NIST, *AI Test, Evaluation, Validation and Verification*.
3.  ISO/IEC 25059:2023, *Quality model for AI systems*.
4.  ISO/IEC 42001:2023, *Artificial intelligence management system*.

## Diskusi Evaluation AI

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/diskusi.html`

### Diskusi Evaluation AI

Refleksi final dirender melalui shell canonical Evaluation.

[Buka Refleksi Evaluation AI](#/participant-ai-evaluation?activity=diskusi)

## Kuis Evaluation AI

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/kuis.html`

### Kuis Evaluation AI

Kuis final dirender melalui shell canonical Evaluation.

[Buka Kuis Evaluation AI](#/participant-ai-evaluation?activity=kuis)

## Latihan Evaluation AI

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/latihan.html`

### Latihan Evaluation AI

Latihan final dirender melalui shell canonical Evaluation.

[Buka Latihan Evaluation AI](#/participant-ai-evaluation?activity=latihan)

## materi

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/materi.html`

**

Memuat materi Evaluation AI...

## Konten Dinamis dan Interaktif

> Data berikut diekstrak dari JavaScript runtime untuk `evaluation`, termasuk teks yang baru muncul setelah interaksi.

#### MODULES

#### Mengapa AI Perlu Dievaluasi?

- **slug:** why-evaluate-ai
- **title:** Mengapa AI Perlu Dievaluasi?
- **summary:** Hubungan tujuan, pengguna, risiko, metrik, release decision, dan monitoring.
- **chapter:** chapter-1.html
- **duration:** 25 menit

#### Mengevaluasi Output AI

- **slug:** output-evaluation
- **title:** Mengevaluasi Output AI
- **summary:** Rubric output, human evaluation, metrik otomatis, LLM-as-a-judge, dan RAG evaluation.
- **chapter:** chapter-2.html
- **duration:** 35 menit

#### Benchmark dan Dataset Evaluasi

- **slug:** benchmark-and-dataset
- **title:** Benchmark dan Dataset Evaluasi
- **summary:** Benchmark, test set, leaderboard, contamination, dan konteks Indonesia.
- **chapter:** chapter-3.html
- **duration:** 30 menit

#### Reliability dan Robustness

- **slug:** reliability-and-robustness
- **title:** Reliability dan Robustness
- **summary:** Consistency, robustness, calibration, hallucination, stress test, dan monitoring.
- **chapter:** chapter-4.html
- **duration:** 35 menit

#### Bias dan Fairness

- **slug:** bias-and-fairness
- **title:** Bias dan Fairness
- **summary:** Bias statistik, sosial, harmful bias, fairness metric, dan audit konteks Indonesia.
- **chapter:** chapter-5.html
- **duration:** 35 menit

#### Kualitas Sistem AI dan Evaluation Plan

- **slug:** system-quality-evaluation-plan
- **title:** Kualitas Sistem AI dan Evaluation Plan
- **summary:** System quality, lifecycle, release criteria, monitoring, incident response, dan evaluation plan.
- **chapter:** chapter-6.html
- **duration:** 40 menit

#### EXERCISES

#### Menentukan tujuan evaluasi

- **id:** ex-1
- **module:** why-evaluate-ai
- **title:** Menentukan tujuan evaluasi
- **scenario:** Chatbot fellowship menjawab jadwal, tugas, mentor, dan aturan program.
- **instruction:** Tulis pengguna target, tujuan sistem, failure paling berbahaya, indikator keberhasilan, dan metrik awal.
- **modelAnswer:** Tujuan evaluasi harus berangkat dari keputusan yang dibantu AI, bukan dari metrik populer.

#### Output, model, atau system evaluation?

- **id:** ex-2
- **module:** why-evaluate-ai
- **title:** Output, model, atau system evaluation?
- **scenario:** Tim menguji ringkasan, skor benchmark, dan proses rollback.
- **instruction:** Klasifikasikan mana output evaluation, model evaluation, dan system evaluation.
- **modelAnswer:** Output menilai hasil user, model menilai kemampuan teknis, system menilai produk lengkap.

#### Menilai dua output dengan rubric

- **id:** ex-3
- **module:** output-evaluation
- **title:** Menilai dua output dengan rubric
- **scenario:** Satu jawaban lancar tetapi mengarang fakta; satu jawaban lebih pendek tetapi setia pada sumber.
- **instruction:** Beri skor 1-4 untuk relevansi, factuality, completeness, clarity, safety.
- **modelAnswer:** Jawaban yang setia sumber lebih aman walau tidak selalu paling panjang.

#### Memilih metrik

- **id:** ex-4
- **module:** output-evaluation
- **title:** Memilih metrik
- **scenario:** Tim mengevaluasi summarizer, RAG assistant, dan code generator.
- **instruction:** Pilih metrik yang masuk akal untuk setiap tugas.
- **modelAnswer:** Summarizer dapat memakai ROUGE/BERTScore plus rubric; RAG perlu faithfulness; code perlu pass@k.

#### Mengkritik LLM-as-a-judge

- **id:** ex-5
- **module:** output-evaluation
- **title:** Mengkritik LLM-as-a-judge
- **scenario:** Evaluator AI lebih menyukai jawaban yang panjang dan formal.
- **instruction:** Tulis risiko bias judge dan cara kalibrasinya.
- **modelAnswer:** LLM judge perlu rubric, human calibration, dan audit bias seperti verbosity atau position bias.

#### Memilih benchmark

- **id:** ex-6
- **module:** benchmark-and-dataset
- **title:** Memilih benchmark
- **scenario:** Chatbot akademik Indonesia diuji sebelum pilot.
- **instruction:** Pilih benchmark eksternal dan test set internal yang diperlukan.
- **modelAnswer:** Gunakan baseline global, tetapi wajib tambah data Indonesia, domain kampus, dan skenario lokal.

#### Mendeteksi mismatch benchmark

- **id:** ex-7
- **module:** benchmark-and-dataset
- **title:** Mendeteksi mismatch benchmark
- **scenario:** Skor benchmark Inggris tinggi, tetapi user memakai bahasa Indonesia informal.
- **instruction:** Jelaskan mismatch bahasa, domain, dan budaya.
- **modelAnswer:** Benchmark populer tidak cukup jika tidak representatif terhadap pengguna.

#### Membuat reliability stress test

- **id:** ex-8
- **module:** reliability-and-robustness
- **title:** Membuat reliability stress test
- **scenario:** RAG assistant menjawab kebijakan internal.
- **instruction:** Buat test untuk typo, ambiguity, dokumen panjang, prompt injection, dan unknown answer.
- **modelAnswer:** Expected behavior harus mencakup klarifikasi, menolak instruksi berbahaya, dan mengakui keterbatasan.

#### Correctness dan confidence

- **id:** ex-9
- **module:** reliability-and-robustness
- **title:** Correctness dan confidence
- **scenario:** Model salah tetapi menjawab sangat yakin.
- **instruction:** Tentukan evaluasi tambahan untuk masalah ini.
- **modelAnswer:** Calibration, uncertainty handling, dan failure taxonomy perlu ditambahkan.

#### Mendeteksi hallucination

- **id:** ex-10
- **module:** reliability-and-robustness
- **title:** Mendeteksi hallucination
- **scenario:** Jawaban menyebut aturan yang tidak ada di sumber.
- **instruction:** Tuliskan sinyal hallucination dan cara memverifikasi.
- **modelAnswer:** Periksa dukungan sumber, consistency, dan jawaban saat informasi tidak tersedia.

#### Mengidentifikasi sumber bias

- **id:** ex-11
- **module:** bias-and-fairness
- **title:** Mengidentifikasi sumber bias
- **scenario:** AI membantu screening beasiswa dari esai dan metadata sekolah.
- **instruction:** Identifikasi kelompok terdampak, sumber bias, dan data tambahan.
- **modelAnswer:** Bias bisa muncul dari data historis, label, fitur proxy, dan kebijakan deploy.

#### Memilih fairness check

- **id:** ex-12
- **module:** bias-and-fairness
- **title:** Memilih fairness check
- **scenario:** Akurasi dua kelompok mirip tetapi false positive rate berbeda.
- **instruction:** Pilih fairness check yang perlu dibaca.
- **modelAnswer:** TPR/FPR lintas kelompok dan dampak keputusan harus diperiksa, bukan hanya akurasi rata-rata.

#### Menentukan release criteria

- **id:** ex-13
- **module:** system-quality-evaluation-plan
- **title:** Menentukan release criteria
- **scenario:** Asisten AI HerAI akan dipilotkan ke peserta.
- **instruction:** Tulis minimal tiga release criteria yang dapat diuji.
- **modelAnswer:** Release criteria harus operasional: failure kritis, threshold kualitas, human review, dan rollback.

#### Membuat monitoring plan

- **id:** ex-14
- **module:** system-quality-evaluation-plan
- **title:** Membuat monitoring plan
- **scenario:** Setelah deploy, pertanyaan user berubah dan ada keluhan jawaban salah.
- **instruction:** Tentukan sinyal monitoring, pemilik tindak lanjut, dan escalation path.
- **modelAnswer:** Monitoring perlu membaca kualitas output, incident, feedback, dan perubahan distribusi.

#### Mini AI Evaluation Plan

- **id:** ex-15
- **module:** system-quality-evaluation-plan
- **title:** Mini AI Evaluation Plan
- **scenario:** Pilih chatbot fellowship, AI summarizer, rekomendasi materi, AI screening, atau RAG assistant.
- **instruction:** Isi tujuan, pengguna, risiko, benchmark, metrik, stress test, bias audit, human review, release, monitoring, incident, rollback.
- **modelAnswer:** Evaluation plan menyatukan evaluasi teknis dan governance.

#### QUIZ

#### Item 1

- **id:** q-1
- **module:** why-evaluate-ai
- **question:** Sebuah AI punya akurasi tinggi tetapi sering salah pada kasus ambigu. Evaluasi apa yang paling tepat ditambahkan?
##### options

- Warna UI
- Robustness dan failure-case analysis
- Jumlah parameter
- Nama model

- **answer:** 1
- **explanation:** Akurasi rata-rata dapat menyembunyikan failure case.
- **difficulty:** analisis
- **tag:** why-evaluate-ai

#### Item 2

- **id:** q-2
- **module:** why-evaluate-ai
- **question:** Mengapa evaluasi AI tidak cukup seperti testing tombol?
##### options

- AI selalu deterministik
- AI menghasilkan output probabilistik dan berdampak pada keputusan
- Testing tombol tidak penting
- AI tidak perlu validasi

- **answer:** 1
- **explanation:** AI perlu diuji terhadap konteks, risiko, dan variasi input.
- **difficulty:** penerapan
- **tag:** why-evaluate-ai

#### Item 3

- **id:** q-3
- **module:** why-evaluate-ai
- **question:** Urutan awal evaluation plan yang sehat adalah...
##### options

- Metrik lalu tujuan
- Tujuan, pengguna, risiko, kriteria, metrik
- Leaderboard lalu deploy
- Model lalu logo

- **answer:** 1
- **explanation:** Metrik harus mengikuti tujuan dan risiko.
- **difficulty:** penerapan
- **tag:** why-evaluate-ai

#### Item 4

- **id:** q-4
- **module:** why-evaluate-ai
- **question:** Apa fungsi release gate?
##### options

- Menghias dashboard
- Menentukan syarat terukur sebelum rilis
- Menghapus data
- Mengganti mentor

- **answer:** 1
- **explanation:** Release gate menghubungkan evaluasi dengan keputusan deploy.
- **difficulty:** penerapan
- **tag:** why-evaluate-ai

#### Item 5

- **id:** q-5
- **module:** output-evaluation
- **question:** ROUGE tinggi tetapi ringkasan menghapus peringatan penting. Apa masalahnya?
##### options

- Latency
- Completeness dan factuality
- Warna
- Ukuran model

- **answer:** 1
- **explanation:** Overlap teks tidak menjamin informasi penting tercakup.
- **difficulty:** analisis
- **tag:** output-evaluation

#### Item 6

- **id:** q-6
- **module:** output-evaluation
- **question:** Pada RAG, faithfulness menilai...
##### options

- Kecepatan server
- Kesesuaian jawaban dengan sumber
- Jumlah user
- Desain icon

- **answer:** 1
- **explanation:** Faithfulness memeriksa grounding terhadap konteks.
- **difficulty:** penerapan
- **tag:** output-evaluation

#### Item 7

- **id:** q-7
- **module:** output-evaluation
- **question:** Risiko LLM-as-a-judge adalah...
##### options

- Tidak bisa membaca teks
- Bias terhadap jawaban panjang atau posisi opsi
- Selalu lebih lambat dari manusia
- Tidak dapat dipakai sama sekali

- **answer:** 1
- **explanation:** LLM judge perlu rubric dan kalibrasi.
- **difficulty:** penerapan
- **tag:** output-evaluation

#### Item 8

- **id:** q-8
- **module:** output-evaluation
- **question:** pass@k paling relevan untuk...
##### options

- Code generation
- Warna tombol
- Estimasi biaya konsumsi
- Sidebar

- **answer:** 0
- **explanation:** pass@k mengukur peluang solusi kode benar dari k sampel.
- **difficulty:** penerapan
- **tag:** output-evaluation

#### Item 9

- **id:** q-9
- **module:** benchmark-and-dataset
- **question:** Benchmark global Inggris untuk chatbot akademik Indonesia berisiko karena...
##### options

- Terlalu murah
- Mismatch bahasa, domain, dan budaya
- Selalu mudah
- Tidak punya tabel

- **answer:** 1
- **explanation:** Representativeness adalah kunci.
- **difficulty:** analisis
- **tag:** benchmark-and-dataset

#### Item 10

- **id:** q-10
- **module:** benchmark-and-dataset
- **question:** Leaderboard sebaiknya dipakai sebagai...
##### options

- Satu-satunya keputusan deploy
- Sinyal pembanding awal
- Pengganti test set internal
- Alasan hapus monitoring

- **answer:** 1
- **explanation:** Leaderboard bukan validasi konteks deploy.
- **difficulty:** penerapan
- **tag:** benchmark-and-dataset

#### Item 11

- **id:** q-11
- **module:** benchmark-and-dataset
- **question:** Data contamination membuat skor...
##### options

- Lebih dapat dipercaya
- Terlalu optimistis
- Selalu turun
- Tidak berubah

- **answer:** 1
- **explanation:** Model mungkin pernah melihat data evaluasi.
- **difficulty:** penerapan
- **tag:** benchmark-and-dataset

#### Item 12

- **id:** q-12
- **module:** benchmark-and-dataset
- **question:** IndoBias paling relevan untuk...
##### options

- Audit bias lokal bahasa Indonesia
- Mengukur GPU
- Membuat CSS
- Menghapus quiz

- **answer:** 0
- **explanation:** IndoBias membantu konteks sosial-budaya lokal.
- **difficulty:** penerapan
- **tag:** benchmark-and-dataset

#### Item 13

- **id:** q-13
- **module:** reliability-and-robustness
- **question:** Model salah tetapi confidence tinggi menunjukkan masalah...
##### options

- Calibration
- Typography
- Routing
- Avatar

- **answer:** 0
- **explanation:** Calibration membaca kesesuaian confidence dan correctness.
- **difficulty:** analisis
- **tag:** reliability-and-robustness

#### Item 14

- **id:** q-14
- **module:** reliability-and-robustness
- **question:** Prompt injection perlu diuji dalam...
##### options

- Stress test reliability
- Logo test
- Color palette
- Leaderboard saja

- **answer:** 0
- **explanation:** Prompt injection adalah input adversarial.
- **difficulty:** penerapan
- **tag:** reliability-and-robustness

#### Item 15

- **id:** q-15
- **module:** reliability-and-robustness
- **question:** Jika sumber tidak tersedia, expected behavior yang sehat adalah...
##### options

- Mengarang jawaban
- Mengakui keterbatasan atau eskalasi
- Menjawab makin yakin
- Menghapus pertanyaan

- **answer:** 1
- **explanation:** Failure behavior harus aman.
- **difficulty:** penerapan
- **tag:** reliability-and-robustness

#### Item 16

- **id:** q-16
- **module:** reliability-and-robustness
- **question:** SelfCheckGPT menginspirasi pemeriksaan...
##### options

- Konsistensi antarsampel untuk hallucination
- Ukuran font
- Login admin
- Animasi

- **answer:** 0
- **explanation:** Konsistensi respons dapat memberi sinyal factuality.
- **difficulty:** penerapan
- **tag:** reliability-and-robustness

#### Item 17

- **id:** q-17
- **module:** bias-and-fairness
- **question:** Akurasi rata-rata tinggi tetapi subgroup dirugikan berarti perlu...
##### options

- Subgroup evaluation
- Menghapus semua data
- Ganti logo
- Tambah warna

- **answer:** 0
- **explanation:** Rata-rata dapat menutupi dampak kelompok.
- **difficulty:** analisis
- **tag:** bias-and-fairness

#### Item 18

- **id:** q-18
- **module:** bias-and-fairness
- **question:** Menghapus atribut sensitif...
##### options

- Selalu menyelesaikan bias
- Tidak selalu cukup karena proxy bisa tersisa
- Membuat model tidak jalan
- Menghapus fairness

- **answer:** 1
- **explanation:** Fitur lain dapat membawa sinyal yang sama.
- **difficulty:** penerapan
- **tag:** bias-and-fairness

#### Item 19

- **id:** q-19
- **module:** bias-and-fairness
- **question:** Equalized odds berhubungan dengan...
##### options

- Kesetaraan error rate
- Ukuran dataset saja
- Warna kartu
- Jumlah chapter

- **answer:** 0
- **explanation:** Equalized odds membaca error lintas kelompok.
- **difficulty:** penerapan
- **tag:** bias-and-fairness

#### Item 20

- **id:** q-20
- **module:** bias-and-fairness
- **question:** Fairness metric harus dipilih berdasarkan...
##### options

- Konteks keputusan dan dampak
- Nama model
- Jumlah icon
- Urutan script

- **answer:** 0
- **explanation:** Tidak ada metrik fairness universal.
- **difficulty:** penerapan
- **tag:** bias-and-fairness

#### Item 21

- **id:** q-21
- **module:** system-quality-evaluation-plan
- **question:** Model bagus di benchmark tetapi tanpa rollback berarti...
##### options

- Sistem belum siap operasional
- Pasti aman
- Tidak perlu monitoring
- Tidak perlu human review

- **answer:** 0
- **explanation:** System quality mencakup kontrol operasional.
- **difficulty:** analisis
- **tag:** system-quality-evaluation-plan

#### Item 22

- **id:** q-22
- **module:** system-quality-evaluation-plan
- **question:** AI Evaluation Plan minimal menghubungkan...
##### options

- Risiko, metrik, release, monitoring
- Logo dan font
- Avatar dan badge
- Cache browser saja

- **answer:** 0
- **explanation:** Plan menyatukan evaluasi dan governance.
- **difficulty:** penerapan
- **tag:** system-quality-evaluation-plan

#### Item 23

- **id:** q-23
- **module:** system-quality-evaluation-plan
- **question:** ISO/IEC 42001 paling dekat dengan...
##### options

- AI management system
- Syntax CSS
- Prompt injection
- BLEU score

- **answer:** 0
- **explanation:** ISO/IEC 42001 membahas sistem manajemen AI.
- **difficulty:** penerapan
- **tag:** system-quality-evaluation-plan

#### Item 24

- **id:** q-24
- **module:** system-quality-evaluation-plan
- **question:** Monitoring pascadeploy perlu karena...
##### options

- Input dan risiko berubah setelah sistem dipakai
- Agar warna berubah
- Supaya benchmark hilang
- Agar route tidak ada

- **answer:** 0
- **explanation:** Evaluasi hidup sepanjang lifecycle.
- **difficulty:** penerapan
- **tag:** system-quality-evaluation-plan

#### DISCUSSIONS

- **why-evaluate-ai:** Apakah sistem yang sering benar otomatis dapat dipercaya? Jelaskan bukti evaluasi apa yang kamu butuhkan.
- **output-evaluation:** Mana yang lebih berbahaya: jawaban tidak relevan atau fakta palsu yang meyakinkan?
- **benchmark-and-dataset:** Mengapa leaderboard tidak cukup untuk memutuskan deployment di konteks Indonesia?
- **reliability-and-robustness:** Bagaimana sistem harus bersikap saat tidak yakin atau sumber tidak tersedia?
- **bias-and-fairness:** Apakah fairness dapat diwakili satu angka? Kapan metrik perlu dibaca bersama contoh kasus?
- **system-quality-evaluation-plan:** Siapa yang bertanggung jawab saat AI gagal di produksi, dan bagaimana incident seharusnya ditangani?
