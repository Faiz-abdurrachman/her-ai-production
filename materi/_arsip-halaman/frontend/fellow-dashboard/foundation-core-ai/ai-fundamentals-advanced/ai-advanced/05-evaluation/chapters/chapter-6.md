# Kualitas Sistem AI dan Evaluation Plan

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/05-evaluation/chapters/chapter-6.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

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

## Lampiran Sumber HTML Lengkap

````html
<article class="ai-evaluation-chapter">
    <header class="ai-evaluation-chapter-head"><span>Chapter 6</span><h2>Kualitas Sistem AI dan Evaluation Plan</h2><p>Model yang tinggi benchmark belum tentu menjadi sistem yang layak digunakan.</p></header>
    <section class="ai-evaluation-section"><h3><i class="fas fa-bullseye"></i> Tujuan Pembelajaran</h3><ul><li>Membedakan model quality dan system quality.</li><li>Memahami AI lifecycle, release criteria, monitoring, incident response, rollback, dan audit trail.</li><li>Mengenal NIST AI RMF, NIST TEVV, ISO/IEC 25059, dan ISO/IEC 42001 secara konseptual.</li><li>Menyusun AI Evaluation Plan.</li></ul></section>
    <section class="ai-evaluation-section"><h3>Inti Konsep</h3><p>Kualitas sistem AI mencakup model, data, UX, kontrol manusia, monitoring, dokumentasi, dan proses organisasi. Sistem dapat gagal bila tidak memiliki fallback, tidak dapat dihentikan, tidak punya human review, tidak punya incident response, atau perubahan model tidak terdokumentasi.</p><p>ISO/IEC 25059 membantu memberi bahasa mutu produk AI, sedangkan ISO/IEC 42001 membawa perspektif sistem manajemen AI. NIST AI RMF dan TEVV membantu menghubungkan evaluasi teknis dengan governance: map, measure, manage, release, monitor, investigate, improve, evaluate again.</p></section>
    <section class="ai-evaluation-flow"><span>Map</span><i class="fas fa-arrow-right"></i><span>Measure</span><i class="fas fa-arrow-right"></i><span>Manage</span><i class="fas fa-arrow-right"></i><span>Release</span><i class="fas fa-arrow-right"></i><span>Monitor</span><i class="fas fa-arrow-right"></i><span>Improve</span></section>
    <section class="ai-evaluation-callout"><i class="fas fa-lightbulb"></i><div><strong>Analogi.</strong> Model AI seperti mesin mobil. Sistem AI adalah mobil lengkap dengan rem, spion, dashboard, aturan servis, pengemudi, dan prosedur darurat.</div></section>
    <section class="ai-evaluation-section"><h3>Template AI Evaluation Plan</h3><ol class="ai-evaluation-two-col"><li>Nama sistem</li><li>Tujuan</li><li>Pengguna</li><li>Konteks penggunaan</li><li>Risiko</li><li>Failure paling berbahaya</li><li>Kriteria output</li><li>Benchmark</li><li>Test set</li><li>Metrik</li><li>Reliability test</li><li>Bias audit</li><li>Human review</li><li>Release criteria</li><li>Monitoring</li><li>Incident response</li><li>Escalation</li><li>Rollback</li><li>Evaluasi ulang</li><li>Change log</li></ol></section>
    <section class="ai-evaluation-section"><h3>Lebih Teknis</h3><p><strong>Model card</strong> dan <strong>system card</strong> membantu mendokumentasikan tujuan, data, batasan, dan hasil evaluasi. <strong>Change management</strong> memastikan perubahan model, prompt, data, atau kebijakan diuji ulang sebelum rilis. <strong>Rollback</strong> adalah kemampuan kembali ke versi aman ketika incident terjadi.</p></section>
    <section class="ai-evaluation-section"><h3>Kesalahan Umum</h3><ol><li>Evaluation plan dianggap dokumen formalitas.</li><li>Release criteria tidak terukur.</li><li>Tidak punya incident response dan rollback.</li><li>Monitoring hanya melihat uptime, bukan kualitas output.</li><li>Evaluasi ulang tidak dijadwalkan setelah model berubah.</li></ol></section>
    <section class="ai-evaluation-check"><h3>Mini-check</h3><p>Susun tiga release criteria untuk asisten AI HerAI yang menjawab materi, jadwal, tugas, dan aturan fellowship.</p></section>
    <section class="ai-evaluation-section"><h3>Key Takeaways</h3><ul><li>Kualitas sistem AI adalah gabungan performa, kontrol, monitoring, dan governance.</li><li>Evaluation plan mengubah evaluasi dari ad hoc menjadi proses yang dapat diulang.</li><li>Sistem AI yang baik selalu punya mekanisme perbaikan berkelanjutan.</li></ul></section>
    <section class="ai-evaluation-glossary"><h3>Glossary</h3><dl><dt>System quality</dt><dd>Kualitas produk AI sebagai sistem lengkap, bukan hanya model.</dd><dt>Rollback</dt><dd>Kemampuan kembali ke versi aman ketika rilis bermasalah.</dd><dt>Incident response</dt><dd>Prosedur menangani kesalahan serius atau dampak tak diinginkan.</dd></dl></section>
    <section class="ai-evaluation-references"><h3>Referensi</h3><ol><li>NIST, <em>AI Risk Management Framework 1.0</em>, 2023.</li><li>NIST, <em>AI Test, Evaluation, Validation and Verification</em>.</li><li>ISO/IEC 25059:2023, <em>Quality model for AI systems</em>.</li><li>ISO/IEC 42001:2023, <em>Artificial intelligence management system</em>.</li></ol></section>
</article>

````
