# Mengevaluasi Output AI

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/chapters/chapter-2.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

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

## Lampiran Sumber HTML Lengkap

````html
<article class="ai-evaluation-chapter">
    <header class="ai-evaluation-chapter-head"><span>Chapter 2</span><h2>Mengevaluasi Output AI</h2><p>Jawaban yang lancar belum tentu relevan, faktual, lengkap, atau aman.</p></header>
    <section class="ai-evaluation-section"><h3><i class="fas fa-bullseye"></i> Tujuan Pembelajaran</h3><ul><li>Menyusun rubric evaluasi output.</li><li>Memilih human evaluation, automatic metrics, atau LLM-as-a-judge.</li><li>Memahami metrik Accuracy, Precision, Recall, F1, BLEU, ROUGE, BERTScore, pass@k, faithfulness, dan answer relevancy.</li><li>Menilai output generatif, RAG, summarization, QA, dan code generation.</li></ul></section>
    <section class="ai-evaluation-section"><h3>Inti Konsep</h3><p>Evaluasi output menjawab pertanyaan paling dekat dengan pengguna: seberapa baik hasil yang keluar dari sistem AI? Untuk tugas tertutup, accuracy bisa menjadi awal. Untuk tugas terbuka seperti ringkasan, dialog, RAG, dan code generation, tim perlu rubric yang menilai relevansi, factuality, completeness, coherence, clarity, instruction following, usefulness, safety, dan faithfulness.</p><p>Metrik otomatis membantu efisiensi, tetapi tidak otomatis membuktikan kebenaran faktual. BLEU dan ROUGE berbasis overlap teks. BERTScore membaca kemiripan semantik. pass@k berguna untuk code generation. Pada RAG, faithfulness dan answer relevancy memisahkan kualitas retrieval dan generation.</p></section>
    <section class="ai-evaluation-callout"><i class="fas fa-lightbulb"></i><div><strong>Analogi.</strong> Menilai output AI seperti menilai esai. Kita tidak hanya menghitung kata yang sama dengan kunci jawaban; kita membaca apakah argumennya relevan, faktanya benar, lengkap, jelas, dan tidak menyesatkan.</div></section>
    <section class="ai-evaluation-section"><h3>Studi Kasus</h3><p>Dokumen sumber menyebut: "Pengajuan cuti minimal tujuh hari sebelum tanggal cuti dan harus disetujui mentor." Jawaban A menulis bahwa peserta boleh mengajukan cuti kapan saja selama memberi kabar. Jawaban B menulis bahwa cuti perlu diajukan tujuh hari sebelumnya dan tetap menunggu persetujuan mentor.</p><p>Jawaban A terdengar lancar tetapi salah secara factuality dan faithfulness. Jawaban B lebih pendek tetapi lebih aman karena mengikuti sumber.</p></section>
    <section class="ai-evaluation-table-wrap"><table><thead><tr><th>Dimensi</th><th>Pertanyaan</th></tr></thead><tbody><tr><td>Relevansi</td><td>Apakah menjawab kebutuhan pengguna?</td></tr><tr><td>Factuality</td><td>Apakah klaim benar?</td></tr><tr><td>Faithfulness</td><td>Apakah klaim didukung sumber?</td></tr><tr><td>Completeness</td><td>Apakah informasi penting tercakup?</td></tr><tr><td>Safety</td><td>Apakah ada risiko instruksi berbahaya?</td></tr></tbody></table></section>
    <section class="ai-evaluation-section"><h3>Lebih Teknis</h3><p><strong>Pairwise comparison</strong> meminta evaluator memilih output yang lebih baik dari dua kandidat. <strong>Reference-based evaluation</strong> membandingkan output dengan jawaban referensi. <strong>Reference-free evaluation</strong> menilai output tanpa referensi tunggal, biasanya memakai rubric. LLM-as-a-judge perlu dikalibrasi karena dapat bias terhadap jawaban panjang, posisi opsi, atau gaya bahasa tertentu.</p></section>
    <section class="ai-evaluation-section"><h3>Kesalahan Umum</h3><ol><li>Jawaban panjang dianggap lebih baik.</li><li>Gaya bahasa lebih dipentingkan daripada fakta.</li><li>Satu evaluator dianggap cukup.</li><li>Metrik tidak sesuai tugas.</li><li>Rubric terlalu abstrak sehingga evaluator menafsirkan berbeda.</li></ol></section>
    <section class="ai-evaluation-check"><h3>Mini-check</h3><p>Buat rubric 1-4 untuk menilai jawaban chatbot akademik. Dimensi apa yang wajib ada?</p></section>
    <section class="ai-evaluation-section"><h3>Key Takeaways</h3><ul><li>Output generatif perlu rubric, bukan hanya skor kemiripan.</li><li>Skor tinggi tidak otomatis berarti faktual.</li><li>Pada RAG, evaluasi retrieval dan generation perlu dipisahkan.</li></ul></section>
    <section class="ai-evaluation-glossary"><h3>Glossary</h3><dl><dt>Faithfulness</dt><dd>Kesesuaian output dengan sumber yang diberikan.</dd><dt>LLM-as-a-judge</dt><dd>Penggunaan model bahasa sebagai evaluator output.</dd><dt>pass@k</dt><dd>Peluang minimal satu solusi benar dari k percobaan pada code generation.</dd></dl></section>
    <section class="ai-evaluation-references"><h3>Referensi</h3><ol><li>Papineni et al., <em>BLEU</em>, 2002.</li><li>Lin, <em>ROUGE</em>, 2004.</li><li>Zhang et al., <em>BERTScore</em>, 2019.</li><li>Es et al., <em>RAGAS</em>, 2023.</li></ol></section>
</article>

````
