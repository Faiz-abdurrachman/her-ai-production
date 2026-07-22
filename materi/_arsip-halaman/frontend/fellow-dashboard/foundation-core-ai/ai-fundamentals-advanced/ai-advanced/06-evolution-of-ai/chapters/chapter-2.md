# Symbolic AI dan Expert Systems

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/chapters/chapter-2.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

Chapter 2 - 35 menit

#### Symbolic AI dan Expert Systems

Pertanyaan pembuka: kapan aturan eksplisit lebih tepat daripada model statistik?

##### ** Tujuan Pembelajaran

-   Memahami simbol, fakta, predikat, aturan, dan inferensi.
-   Membedakan forward chaining dan backward chaining.
-   Mengenali kekuatan expert system dan batasnya.

**

**Konsep Utama.** Symbolic AI menulis pengetahuan secara eksplisit. Sistem bekerja dengan fakta, aturan, knowledge base, inference engine, dan explanation trace.

##### Inti Konsep

Dalam symbolic AI, pengetahuan diperlakukan sebagai simbol yang dapat dimanipulasi. Aturan seperti `IF pembayaran gagal AND pengguna meminta refund THEN arahkan ke billing refund` membuat keputusan mudah diaudit.

Expert system seperti DENDRAL dan MYCIN menunjukkan bahwa AI bisa kuat pada domain sempit jika aturan dan pengetahuan pakar ditulis dengan teliti. Namun sistem ini mahal dirawat ketika domain ambigu atau berubah cepat.

Fakta**Aturan**Mesin Inferensi**Kesimpulan**Penjelasan

**

**Analogi.** Symbolic AI seperti petugas yang bekerja memakai SOP. Keputusannya mudah ditelusuri, tetapi kesulitan ketika situasi tidak tercakup di SOP.

###### Contoh Nyata: compliance

Aturan eksplisit cocok untuk kebijakan yang harus dipatuhi secara deterministik, misalnya validasi kelengkapan dokumen.

###### Contoh Nyata: safety layer

LLM dapat menjawab fleksibel, tetapi rule-based guardrail memastikan kebijakan wajib tidak dilanggar.

##### Lebih Teknis

    facts = {"payment_failed", "refund_requested"}
    rules = [
      ({"payment_failed", "refund_requested"}, "billing_refund"),
      ({"login_issue"}, "account_access")
    ]
    for condition, route in rules:
      if condition <= facts:
        print(route)

Forward chaining bergerak dari fakta ke kesimpulan. Backward chaining bergerak dari hipotesis ke fakta yang perlu dibuktikan. Certainty factor dapat memberi bobot saat aturan tidak sepenuhnya pasti.

##### Kesalahan Umum

1.  Menganggap symbolic AI sepenuhnya usang.
2.  Mengira aturan selalu mudah dirawat.
3.  Menyamakan explainable dengan selalu benar.
4.  Memaksa domain ambigu menjadi aturan kaku.

##### Mini-check

Buat dua aturan triase tiket fellowship dan jelaskan kapan aturan itu perlu ditinjau ulang.

##### Ringkasan

-   Symbolic AI unggul untuk domain eksplisit dan audit.
-   Expert system membutuhkan knowledge engineering yang disiplin.
-   Sistem modern masih memakai aturan untuk kontrol, compliance, dan safety.

##### Glossary

Knowledge base  
Kumpulan fakta dan aturan.

Inference engine  
Komponen yang menerapkan aturan untuk menarik kesimpulan.

Explanation trace  
Jejak aturan yang menjelaskan mengapa keputusan dibuat.

##### Referensi

1.  Newell, Shaw, and Simon, *Logic Theorist*, 1956.
2.  Feigenbaum, Buchanan, and Lederberg, DENDRAL project.
3.  Shortliffe, *MYCIN*, 1970s.
4.  Lenat, *CYC*, 1995.

## Lampiran Sumber HTML Lengkap

````html
<article class="ai-evolution-chapter"><header class="ai-evolution-chapter-head"><span>Chapter 2 - 35 menit</span><h2>Symbolic AI dan Expert Systems</h2><p>Pertanyaan pembuka: kapan aturan eksplisit lebih tepat daripada model statistik?</p></header><section class="ai-evolution-section"><h3><i class="fas fa-bullseye"></i> Tujuan Pembelajaran</h3><ul><li>Memahami simbol, fakta, predikat, aturan, dan inferensi.</li><li>Membedakan forward chaining dan backward chaining.</li><li>Mengenali kekuatan expert system dan batasnya.</li></ul></section><section class="ai-evolution-callout"><i class="fas fa-diagram-project"></i><div><strong>Konsep Utama.</strong> Symbolic AI menulis pengetahuan secara eksplisit. Sistem bekerja dengan fakta, aturan, knowledge base, inference engine, dan explanation trace.</div></section><section class="ai-evolution-section"><h3>Inti Konsep</h3><p>Dalam symbolic AI, pengetahuan diperlakukan sebagai simbol yang dapat dimanipulasi. Aturan seperti <code>IF pembayaran gagal AND pengguna meminta refund THEN arahkan ke billing refund</code> membuat keputusan mudah diaudit.</p><p>Expert system seperti DENDRAL dan MYCIN menunjukkan bahwa AI bisa kuat pada domain sempit jika aturan dan pengetahuan pakar ditulis dengan teliti. Namun sistem ini mahal dirawat ketika domain ambigu atau berubah cepat.</p><div class="ai-evolution-flow"><span>Fakta</span><i class="fas fa-arrow-right"></i><span>Aturan</span><i class="fas fa-arrow-right"></i><span>Mesin Inferensi</span><i class="fas fa-arrow-right"></i><span>Kesimpulan</span><i class="fas fa-arrow-right"></i><span>Penjelasan</span></div></section><section class="ai-evolution-callout"><i class="fas fa-clipboard-list"></i><div><strong>Analogi.</strong> Symbolic AI seperti petugas yang bekerja memakai SOP. Keputusannya mudah ditelusuri, tetapi kesulitan ketika situasi tidak tercakup di SOP.</div></section><section class="ai-evolution-grid"><article><h4>Contoh Nyata: compliance</h4><p>Aturan eksplisit cocok untuk kebijakan yang harus dipatuhi secara deterministik, misalnya validasi kelengkapan dokumen.</p></article><article><h4>Contoh Nyata: safety layer</h4><p>LLM dapat menjawab fleksibel, tetapi rule-based guardrail memastikan kebijakan wajib tidak dilanggar.</p></article></section><section class="ai-evolution-section"><h3>Lebih Teknis</h3><pre><code>facts = {"payment_failed", "refund_requested"}
rules = [
  ({"payment_failed", "refund_requested"}, "billing_refund"),
  ({"login_issue"}, "account_access")
]
for condition, route in rules:
  if condition <= facts:
    print(route)</code></pre><p>Forward chaining bergerak dari fakta ke kesimpulan. Backward chaining bergerak dari hipotesis ke fakta yang perlu dibuktikan. Certainty factor dapat memberi bobot saat aturan tidak sepenuhnya pasti.</p></section><section class="ai-evolution-section"><h3>Kesalahan Umum</h3><ol><li>Menganggap symbolic AI sepenuhnya usang.</li><li>Mengira aturan selalu mudah dirawat.</li><li>Menyamakan explainable dengan selalu benar.</li><li>Memaksa domain ambigu menjadi aturan kaku.</li></ol></section><section class="ai-evolution-check"><h3>Mini-check</h3><p>Buat dua aturan triase tiket fellowship dan jelaskan kapan aturan itu perlu ditinjau ulang.</p></section><section class="ai-evolution-section"><h3>Ringkasan</h3><ul><li>Symbolic AI unggul untuk domain eksplisit dan audit.</li><li>Expert system membutuhkan knowledge engineering yang disiplin.</li><li>Sistem modern masih memakai aturan untuk kontrol, compliance, dan safety.</li></ul></section><section class="ai-evolution-glossary"><h3>Glossary</h3><dl><dt>Knowledge base</dt><dd>Kumpulan fakta dan aturan.</dd><dt>Inference engine</dt><dd>Komponen yang menerapkan aturan untuk menarik kesimpulan.</dd><dt>Explanation trace</dt><dd>Jejak aturan yang menjelaskan mengapa keputusan dibuat.</dd></dl></section><section class="ai-evolution-references"><h3>Referensi</h3><ol><li>Newell, Shaw, and Simon, <em>Logic Theorist</em>, 1956.</li><li>Feigenbaum, Buchanan, and Lederberg, DENDRAL project.</li><li>Shortliffe, <em>MYCIN</em>, 1970s.</li><li>Lenat, <em>CYC</em>, 1995.</li></ol></section></article>

````
