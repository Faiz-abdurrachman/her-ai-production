# Integrasi — Reason, Plan, Act, Observe, Update, Answer

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/06-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Integrasi — Reason, Plan, Act, Observe, Update, Answer

#### 5.1 Model Terpadu

Keempat submateri dapat digabungkan ke dalam satu siklus:

    REASON
    Apa tujuan, informasi, dan batasannya?
            ↓
    PLAN
    Langkah dan tool apa yang diperlukan?
            ↓
    ACT
    Jalankan langkah atau panggil tool
            ↓
    OBSERVE
    Baca hasil tindakan atau tool
            ↓
    UPDATE
    Apakah pemahaman atau rencana perlu diubah?
            ↓
    ANSWER
    Sampaikan hasil, asumsi, dan keterbatasan

Alur tersebut tidak selalu linear.

    Reason
    → Plan
    → Act
    → Observe
    → Plan ulang
    → Act lagi
    → Observe
    → Answer

ReAct menunjukkan pola interleaving antara reasoning dan tindakan: reasoning membantu melacak serta memperbarui rencana, sedangkan tindakan memperoleh informasi dari lingkungan atau sumber eksternal [5].

* * * * *

#### 5.2 Studi Kasus Terpadu — Anggaran Berdasarkan Spreadsheet

##### Tugas

> Berdasarkan data peserta dalam spreadsheet, hitung kebutuhan konsumsi, bandingkan dengan anggaran, lalu berikan rekomendasi.

##### Data Awal

    Anggaran: Rp5.000.000
    Harga konsumsi: Rp32.000
    Biaya transportasi: Rp450.000
    Jumlah peserta: berada di spreadsheet

##### Reason

-   jumlah peserta belum diketahui;
-   data berada di spreadsheet;
-   data mungkin memiliki duplikasi;
-   total biaya harus dibandingkan dengan anggaran;
-   jawaban perlu menyatakan asumsi dan kualitas data.

##### Plan

1.  Buka spreadsheet.
2.  Identifikasi sheet dan kolom peserta.
3.  Hitung seluruh data.
4.  Periksa data kosong.
5.  Periksa peserta ganda.
6.  Hitung peserta valid.
7.  Hitung biaya konsumsi.
8.  Tambahkan transportasi.
9.  Bandingkan dengan anggaran.
10. Buat rekomendasi.

##### Act

Gunakan spreadsheet atau Python.

##### Observe

    Peserta terdaftar: 130
    Data ganda: 5
    Data kosong: 0
    Peserta valid: 125

##### Update

Rencana perhitungan menggunakan 125 peserta valid, bukan 130 baris mentah.

##### Calculation

    Konsumsi:
    125 × Rp32.000 = Rp4.000.000

    Total:
    Rp4.000.000 + Rp450.000 = Rp4.450.000

    Sisa:
    Rp5.000.000 − Rp4.450.000 = Rp550.000

##### Answer

> Berdasarkan 125 peserta valid, total kebutuhan adalah Rp4.450.000. Anggaran mencukupi dengan sisa Rp550.000. Perhitungan mengecualikan lima data peserta yang terdeteksi ganda.

##### Mengapa Jawaban Ini Lebih Baik?

Jawaban tersebut menjelaskan:

-   sumber data;
-   pembersihan data;
-   jumlah peserta valid;
-   perhitungan;
-   sisa anggaran;
-   asumsi yang digunakan.

Kualitas hasil tidak berasal dari CoT saja. Kualitas berasal dari gabungan:

-   pemahaman tujuan;
-   planning;
-   pemilihan tool;
-   validasi data;
-   perhitungan;
-   pemeriksaan;
-   komunikasi hasil.

* * * * *

#### 5.3 Checklist Akhir

    Sebelum menerima jawaban AI, periksa:

    □ Tujuan dipahami dengan benar
    □ Informasi relevan sudah digunakan
    □ Informasi yang hilang dikenali
    □ Fakta dan asumsi dibedakan
    □ Masalah dipecah menjadi langkah
    □ Urutan mengikuti dependensi
    □ Tool dipilih dengan tepat
    □ Parameter tool sesuai
    □ Observation dibaca dengan benar
    □ Output tool divalidasi
    □ Rencana diperbarui bila diperlukan
    □ Jawaban akhir menjelaskan hasil
    □ Keterbatasan disebutkan
    □ Tindakan memiliki izin

* * * * *

### Evaluasi Akhir Modul

#### Studi Kasus

Sebuah tim fellowship ingin menyelenggarakan kelas AI untuk 75 peserta. Data kehadiran berada di spreadsheet. Anggaran tersedia Rp4.000.000. Konsumsi berharga Rp38.000 per peserta. Ruangan hanya dapat digunakan selama 120 menit dan proyektor tidak tersedia selama 20 menit pertama.

Susun analisis dengan format:

1.  **Reason**
2.  tujuan;
3.  data tersedia;
4.  data hilang;
5.  asumsi;
6.  batasan.

7.  **Plan**

8.  subtugas;
9.  dependensi;
10. urutan;
11. success criteria;
12. rencana cadangan.

13. **Tool**

14. tool yang diperlukan;
15. parameter;
16. izin;
17. hasil yang diharapkan.

18. **Observe**

19. cara membaca hasil;
20. cara menangani data kosong atau ganda.

21. **Update**

22. perubahan rencana jika jumlah peserta valid berbeda;
23. perubahan jadwal karena proyektor.

24. **Answer**

25. kesimpulan anggaran;
26. sisa atau kekurangan;
27. rekomendasi;
28. asumsi dan keterbatasan.

* * * * *

### Glosarium

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Istilah
Pengertian</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Reasoning
Proses menghubungkan informasi untuk menghasilkan kesimpulan atau langkah</td>
<td align="left">Planning
Proses mengubah tujuan menjadi urutan tindakan</td>
</tr>
</tbody>
</table>

* * * * *

### Referensi

1.  Wang, L., Xu, W., Lan, Y., Hu, Z., Lan, Y., Lee, R. K.-W., & Lim, E.-P. (2023). **Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models.** arXiv:2305.04091.
     https://arxiv.org/abs/2305.04091

2.  Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E. H., Le, Q. V., & Zhou, D. (2022). **Chain-of-Thought Prompting Elicits Reasoning in Large Language Models.** arXiv:2201.11903.
     https://arxiv.org/abs/2201.11903

3.  Kojima, T., Gu, S. S., Reid, M., Matsuo, Y., & Iwasawa, Y. (2022). **Large Language Models are Zero-Shot Reasoners.** arXiv:2205.11916.
     https://arxiv.org/abs/2205.11916

4.  Schick, T., Dwivedi-Yu, J., Dessì, R., Raileanu, R., Lomeli, M., Zettlemoyer, L., Cancedda, N., & Scialom, T. (2023). **Toolformer: Language Models Can Teach Themselves to Use Tools.** arXiv:2302.04761.
     https://arxiv.org/abs/2302.04761

5.  Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2022). **ReAct: Synergizing Reasoning and Acting in Language Models.** arXiv:2210.03629.
     https://arxiv.org/abs/2210.03629

6.  Mialon, G., Dessì, R., Lomeli, M., Nalmpantis, C., Pasunuru, R., Raileanu, R., Rozière, B., Schick, T., Dwivedi-Yu, J., Celikyilmaz, A., Grave, E., LeCun, Y., & Scialom, T. (2023). **Augmented Language Models: a Survey.** arXiv:2302.07842.
     https://arxiv.org/abs/2302.07842

7.  Turpin, M., Michael, J., Perez, E., & Bowman, S. R. (2023). **Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting.** arXiv:2305.04388.
     https://arxiv.org/abs/2305.04388

* * * * *

### Catatan Implementasi HerAI

Dokumen ini berisi **isi pembelajaran**, bukan instruksi implementasi kode.

Struktur integrasi yang direkomendasikan:

    Reasoning
    ├── how-ai-reasons
    │   ├── materi
    │   ├── latihan
    │   ├── kuis
    │   └── diskusi
    ├── planning-and-decomposition
    │   ├── materi
    │   ├── latihan
    │   ├── kuis
    │   └── diskusi
    ├── chain-of-thought
    │   ├── materi
    │   ├── latihan
    │   ├── kuis
    │   └── diskusi
    └── tool-use
        ├── materi
        ├── latihan
        ├── kuis
        └── diskusi

Planning dan tool use pada modul ini dibatasi sebagai fondasi konseptual. Implementasi teknis seperti planner–executor, function calling schema, tool registry, retry, memory, orchestration, sandbox, dan guardrail lanjutan tetap menjadi ruang lingkup course **Agentic AI**.

## Lampiran Sumber HTML Lengkap

````html
<h1>Integrasi — Reason, Plan, Act, Observe, Update, Answer</h1>
<h2>5.1 Model Terpadu</h2>
<p>Keempat submateri dapat digabungkan ke dalam satu siklus:</p>
<pre><code class="language-text">REASON
Apa tujuan, informasi, dan batasannya?
        ↓
PLAN
Langkah dan tool apa yang diperlukan?
        ↓
ACT
Jalankan langkah atau panggil tool
        ↓
OBSERVE
Baca hasil tindakan atau tool
        ↓
UPDATE
Apakah pemahaman atau rencana perlu diubah?
        ↓
ANSWER
Sampaikan hasil, asumsi, dan keterbatasan
</code></pre>
<p>Alur tersebut tidak selalu linear.</p>
<pre><code class="language-text">Reason
→ Plan
→ Act
→ Observe
→ Plan ulang
→ Act lagi
→ Observe
→ Answer
</code></pre>
<p>ReAct menunjukkan pola interleaving antara reasoning dan tindakan: reasoning membantu melacak serta memperbarui rencana, sedangkan tindakan memperoleh informasi dari lingkungan atau sumber eksternal [5].</p>
<hr />
<h2>5.2 Studi Kasus Terpadu — Anggaran Berdasarkan Spreadsheet</h2>
<h3>Tugas</h3>
<blockquote>
<p>Berdasarkan data peserta dalam spreadsheet, hitung kebutuhan konsumsi, bandingkan dengan anggaran, lalu berikan rekomendasi.</p>
</blockquote>
<h3>Data Awal</h3>
<pre><code class="language-text">Anggaran: Rp5.000.000
Harga konsumsi: Rp32.000
Biaya transportasi: Rp450.000
Jumlah peserta: berada di spreadsheet
</code></pre>
<h3>Reason</h3>
<ul>
<li>jumlah peserta belum diketahui;</li>
<li>data berada di spreadsheet;</li>
<li>data mungkin memiliki duplikasi;</li>
<li>total biaya harus dibandingkan dengan anggaran;</li>
<li>jawaban perlu menyatakan asumsi dan kualitas data.</li>
</ul>
<h3>Plan</h3>
<ol>
<li>Buka spreadsheet.</li>
<li>Identifikasi sheet dan kolom peserta.</li>
<li>Hitung seluruh data.</li>
<li>Periksa data kosong.</li>
<li>Periksa peserta ganda.</li>
<li>Hitung peserta valid.</li>
<li>Hitung biaya konsumsi.</li>
<li>Tambahkan transportasi.</li>
<li>Bandingkan dengan anggaran.</li>
<li>Buat rekomendasi.</li>
</ol>
<h3>Act</h3>
<p>Gunakan spreadsheet atau Python.</p>
<h3>Observe</h3>
<pre><code class="language-text">Peserta terdaftar: 130
Data ganda: 5
Data kosong: 0
Peserta valid: 125
</code></pre>
<h3>Update</h3>
<p>Rencana perhitungan menggunakan 125 peserta valid, bukan 130 baris mentah.</p>
<h3>Calculation</h3>
<pre><code class="language-text">Konsumsi:
125 × Rp32.000 = Rp4.000.000

Total:
Rp4.000.000 + Rp450.000 = Rp4.450.000

Sisa:
Rp5.000.000 − Rp4.450.000 = Rp550.000
</code></pre>
<h3>Answer</h3>
<blockquote>
<p>Berdasarkan 125 peserta valid, total kebutuhan adalah Rp4.450.000. Anggaran mencukupi dengan sisa Rp550.000. Perhitungan mengecualikan lima data peserta yang terdeteksi ganda.</p>
</blockquote>
<h3>Mengapa Jawaban Ini Lebih Baik?</h3>
<p>Jawaban tersebut menjelaskan:</p>
<ul>
<li>sumber data;</li>
<li>pembersihan data;</li>
<li>jumlah peserta valid;</li>
<li>perhitungan;</li>
<li>sisa anggaran;</li>
<li>asumsi yang digunakan.</li>
</ul>
<p>Kualitas hasil tidak berasal dari CoT saja. Kualitas berasal dari gabungan:</p>
<ul>
<li>pemahaman tujuan;</li>
<li>planning;</li>
<li>pemilihan tool;</li>
<li>validasi data;</li>
<li>perhitungan;</li>
<li>pemeriksaan;</li>
<li>komunikasi hasil.</li>
</ul>
<hr />
<h2>5.3 Checklist Akhir</h2>
<pre><code class="language-text">Sebelum menerima jawaban AI, periksa:

□ Tujuan dipahami dengan benar
□ Informasi relevan sudah digunakan
□ Informasi yang hilang dikenali
□ Fakta dan asumsi dibedakan
□ Masalah dipecah menjadi langkah
□ Urutan mengikuti dependensi
□ Tool dipilih dengan tepat
□ Parameter tool sesuai
□ Observation dibaca dengan benar
□ Output tool divalidasi
□ Rencana diperbarui bila diperlukan
□ Jawaban akhir menjelaskan hasil
□ Keterbatasan disebutkan
□ Tindakan memiliki izin
</code></pre>
<hr />
<h1>Evaluasi Akhir Modul</h1>
<h2>Studi Kasus</h2>
<p>Sebuah tim fellowship ingin menyelenggarakan kelas AI untuk 75 peserta. Data kehadiran berada di spreadsheet. Anggaran tersedia Rp4.000.000. Konsumsi berharga Rp38.000 per peserta. Ruangan hanya dapat digunakan selama 120 menit dan proyektor tidak tersedia selama 20 menit pertama.</p>
<p>Susun analisis dengan format:</p>
<ol>
<li><strong>Reason</strong></li>
<li>tujuan;</li>
<li>data tersedia;</li>
<li>data hilang;</li>
<li>asumsi;</li>
<li>
<p>batasan.</p>
</li>
<li>
<p><strong>Plan</strong></p>
</li>
<li>subtugas;</li>
<li>dependensi;</li>
<li>urutan;</li>
<li>success criteria;</li>
<li>
<p>rencana cadangan.</p>
</li>
<li>
<p><strong>Tool</strong></p>
</li>
<li>tool yang diperlukan;</li>
<li>parameter;</li>
<li>izin;</li>
<li>
<p>hasil yang diharapkan.</p>
</li>
<li>
<p><strong>Observe</strong></p>
</li>
<li>cara membaca hasil;</li>
<li>
<p>cara menangani data kosong atau ganda.</p>
</li>
<li>
<p><strong>Update</strong></p>
</li>
<li>perubahan rencana jika jumlah peserta valid berbeda;</li>
<li>
<p>perubahan jadwal karena proyektor.</p>
</li>
<li>
<p><strong>Answer</strong></p>
</li>
<li>kesimpulan anggaran;</li>
<li>sisa atau kekurangan;</li>
<li>rekomendasi;</li>
<li>asumsi dan keterbatasan.</li>
</ol>
<hr />
<h1>Glosarium</h1>
<table>
<thead>
<tr>
<th>Istilah</th>
<th>Pengertian</th>
</tr>
</thead>
<tbody>
<tr>
<td>Reasoning</td>
<td>Proses menghubungkan informasi untuk menghasilkan kesimpulan atau langkah</td>
</tr>
<tr>
<td>Planning</td>
<td>Proses mengubah tujuan menjadi urutan tindakan</td>
</tr>
<tr>
<td>Goal</td>
<td>Hasil akhir yang ingin dicapai</td>
</tr>
<tr>
<td>Initial State</td>
<td>Kondisi awal sebelum tindakan</td>
</tr>
<tr>
<td>Constraint</td>
<td>Batasan yang harus dipatuhi</td>
</tr>
<tr>
<td>Subtask</td>
<td>Bagian kecil dari tugas besar</td>
</tr>
<tr>
<td>Dependency</td>
<td>Ketergantungan antara satu tugas dan tugas lain</td>
</tr>
<tr>
<td>Success Criteria</td>
<td>Kriteria yang menunjukkan tugas selesai</td>
</tr>
<tr>
<td>Static Planning</td>
<td>Rencana yang tidak berubah selama pelaksanaan</td>
</tr>
<tr>
<td>Dynamic Planning</td>
<td>Rencana yang dapat diperbarui</td>
</tr>
<tr>
<td>Chain-of-Thought</td>
<td>Langkah perantara berbentuk bahasa</td>
</tr>
<tr>
<td>Zero-Shot CoT</td>
<td>Instruksi reasoning tanpa contoh</td>
</tr>
<tr>
<td>Few-Shot CoT</td>
<td>Prompt dengan beberapa contoh langkah penyelesaian</td>
</tr>
<tr>
<td>Faithfulness</td>
<td>Tingkat kesesuaian penjelasan dengan faktor yang memengaruhi jawaban</td>
</tr>
<tr>
<td>Tool Use</td>
<td>Penggunaan alat eksternal oleh sistem AI</td>
</tr>
<tr>
<td>Tool Call</td>
<td>Permintaan terstruktur kepada tool</td>
</tr>
<tr>
<td>Parameter</td>
<td>Input yang dikirim ke tool</td>
</tr>
<tr>
<td>Observation</td>
<td>Hasil yang dikembalikan tool</td>
</tr>
<tr>
<td>Validation</td>
<td>Pemeriksaan terhadap hasil</td>
</tr>
<tr>
<td>Replanning</td>
<td>Memperbarui rencana berdasarkan informasi baru</td>
</tr>
<tr>
<td>ReAct</td>
<td>Pola yang menggabungkan reasoning dan tindakan</td>
</tr>
</tbody>
</table>
<hr />
<h1>Referensi</h1>
<ol>
<li>
<p>Wang, L., Xu, W., Lan, Y., Hu, Z., Lan, Y., Lee, R. K.-W., &amp; Lim, E.-P. (2023). <strong>Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models.</strong> arXiv:2305.04091.<br />
   https://arxiv.org/abs/2305.04091</p>
</li>
<li>
<p>Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E. H., Le, Q. V., &amp; Zhou, D. (2022). <strong>Chain-of-Thought Prompting Elicits Reasoning in Large Language Models.</strong> arXiv:2201.11903.<br />
   https://arxiv.org/abs/2201.11903</p>
</li>
<li>
<p>Kojima, T., Gu, S. S., Reid, M., Matsuo, Y., &amp; Iwasawa, Y. (2022). <strong>Large Language Models are Zero-Shot Reasoners.</strong> arXiv:2205.11916.<br />
   https://arxiv.org/abs/2205.11916</p>
</li>
<li>
<p>Schick, T., Dwivedi-Yu, J., Dessì, R., Raileanu, R., Lomeli, M., Zettlemoyer, L., Cancedda, N., &amp; Scialom, T. (2023). <strong>Toolformer: Language Models Can Teach Themselves to Use Tools.</strong> arXiv:2302.04761.<br />
   https://arxiv.org/abs/2302.04761</p>
</li>
<li>
<p>Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., &amp; Cao, Y. (2022). <strong>ReAct: Synergizing Reasoning and Acting in Language Models.</strong> arXiv:2210.03629.<br />
   https://arxiv.org/abs/2210.03629</p>
</li>
<li>
<p>Mialon, G., Dessì, R., Lomeli, M., Nalmpantis, C., Pasunuru, R., Raileanu, R., Rozière, B., Schick, T., Dwivedi-Yu, J., Celikyilmaz, A., Grave, E., LeCun, Y., &amp; Scialom, T. (2023). <strong>Augmented Language Models: a Survey.</strong> arXiv:2302.07842.<br />
   https://arxiv.org/abs/2302.07842</p>
</li>
<li>
<p>Turpin, M., Michael, J., Perez, E., &amp; Bowman, S. R. (2023). <strong>Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting.</strong> arXiv:2305.04388.<br />
   https://arxiv.org/abs/2305.04388</p>
</li>
</ol>
<hr />
<h1>Catatan Implementasi HerAI</h1>
<p>Dokumen ini berisi <strong>isi pembelajaran</strong>, bukan instruksi implementasi kode.</p>
<p>Struktur integrasi yang direkomendasikan:</p>
<pre><code class="language-text">Reasoning
├── how-ai-reasons
│   ├── materi
│   ├── latihan
│   ├── kuis
│   └── diskusi
├── planning-and-decomposition
│   ├── materi
│   ├── latihan
│   ├── kuis
│   └── diskusi
├── chain-of-thought
│   ├── materi
│   ├── latihan
│   ├── kuis
│   └── diskusi
└── tool-use
    ├── materi
    ├── latihan
    ├── kuis
    └── diskusi
</code></pre>
<p>Planning dan tool use pada modul ini dibatasi sebagai fondasi konseptual. Implementasi teknis seperti planner–executor, function calling schema, tool registry, retry, memory, orchestration, sandbox, dan guardrail lanjutan tetap menjadi ruang lingkup course <strong>Agentic AI</strong>.</p>

````
