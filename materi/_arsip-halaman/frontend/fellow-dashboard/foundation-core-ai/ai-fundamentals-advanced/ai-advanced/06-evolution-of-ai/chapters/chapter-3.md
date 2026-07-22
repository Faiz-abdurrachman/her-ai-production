# Machine Learning: Belajar dari Data

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/chapters/chapter-3.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

Chapter 3 - 40 menit

#### Machine Learning: Belajar dari Data

Pertanyaan pembuka: apa yang berubah ketika aturan tidak lagi ditulis satu per satu?

##### ** Tujuan Pembelajaran

-   Memahami feature, label, loss, training, validation, dan test.
-   Membedakan supervised dan unsupervised learning.
-   Mengenali overfitting, generalization, representation learning, dan embedding.

**

**Konsep Utama.** Machine learning menggeser pekerjaan dari menulis aturan menjadi menyediakan data, label, tujuan optimisasi, dan evaluasi generalisasi.

##### Inti Konsep

Supervised learning belajar dari contoh berlabel. Model melihat input, membuat prediksi, menghitung error terhadap label, lalu memperbarui parameter agar error turun.

Unsupervised learning bekerja tanpa label eksplisit. Sistem mencari struktur seperti cluster, dimensi penting, embedding, atau pola kemiripan yang berguna untuk search, rekomendasi, dan eksplorasi data.

Data**Prediksi**Error**Update Parameter**Ulangi

**

**Analogi.** Supervised learning seperti latihan dengan kunci jawaban. Unsupervised learning seperti mengelompokkan kartu tanpa nama kategori, lalu menemukan pola sendiri.

###### Contoh Nyata: klasifikasi email

Label spam atau bukan spam membantu model belajar pola kata, pengirim, dan struktur pesan.

###### Contoh Nyata: semantic search

Embedding mengubah teks menjadi vektor sehingga dokumen serupa dapat ditemukan meski kata-katanya tidak sama.

##### Lebih Teknis

    for batch in data:
      prediction = model(batch.x)
      loss = compare(prediction, batch.y)
      gradient = backward(loss)
      update(model.parameters, gradient)

Perceptron memberi fondasi classifier linear. Backpropagation memperkuat neural network multilapis. PCA dan k-means menunjukkan cara membaca struktur tanpa label. Embedding space menyimpan kemiripan makna dalam bentuk vektor.

##### Kesalahan Umum

1.  Menganggap data lebih banyak selalu lebih baik.
2.  Menyamakan correlation dengan causation.
3.  Mengira akurasi training adalah kualitas akhir.
4.  Menganggap label selalu objektif.
5.  Memakai ML untuk business rules yang sebenarnya deterministik.

##### Mini-check

Untuk sistem rekomendasi materi, tentukan contoh feature, label, risiko overfitting, dan cara validasi.

##### Ringkasan

-   ML belajar pola dari data, bukan dari aturan manual saja.
-   Supervised, unsupervised, dan representation learning menjawab kebutuhan berbeda.
-   Generalization lebih penting daripada skor training.

##### Glossary

Feature  
Informasi input yang dipakai model.

Label  
Target jawaban pada supervised learning.

Overfitting  
Model terlalu cocok dengan data training dan buruk pada data baru.

##### Referensi

1.  Rosenblatt, *The Perceptron*, 1958.
2.  Rumelhart, Hinton, and Williams, 1986.
3.  Pearson, *Principal Components Analysis*, 1901.
4.  MacQueen, *Some Methods for Classification and Analysis of Multivariate Observations*, 1967.
5.  Bengio, Courville, and Vincent, *Representation Learning*, 2013.

## Lampiran Sumber HTML Lengkap

````html
<article class="ai-evolution-chapter"><header class="ai-evolution-chapter-head"><span>Chapter 3 - 40 menit</span><h2>Machine Learning: Belajar dari Data</h2><p>Pertanyaan pembuka: apa yang berubah ketika aturan tidak lagi ditulis satu per satu?</p></header><section class="ai-evolution-section"><h3><i class="fas fa-bullseye"></i> Tujuan Pembelajaran</h3><ul><li>Memahami feature, label, loss, training, validation, dan test.</li><li>Membedakan supervised dan unsupervised learning.</li><li>Mengenali overfitting, generalization, representation learning, dan embedding.</li></ul></section><section class="ai-evolution-callout"><i class="fas fa-chart-line"></i><div><strong>Konsep Utama.</strong> Machine learning menggeser pekerjaan dari menulis aturan menjadi menyediakan data, label, tujuan optimisasi, dan evaluasi generalisasi.</div></section><section class="ai-evolution-section"><h3>Inti Konsep</h3><p>Supervised learning belajar dari contoh berlabel. Model melihat input, membuat prediksi, menghitung error terhadap label, lalu memperbarui parameter agar error turun.</p><p>Unsupervised learning bekerja tanpa label eksplisit. Sistem mencari struktur seperti cluster, dimensi penting, embedding, atau pola kemiripan yang berguna untuk search, rekomendasi, dan eksplorasi data.</p><div class="ai-evolution-flow"><span>Data</span><i class="fas fa-arrow-right"></i><span>Prediksi</span><i class="fas fa-arrow-right"></i><span>Error</span><i class="fas fa-arrow-right"></i><span>Update Parameter</span><i class="fas fa-arrow-right"></i><span>Ulangi</span></div></section><section class="ai-evolution-callout"><i class="fas fa-graduation-cap"></i><div><strong>Analogi.</strong> Supervised learning seperti latihan dengan kunci jawaban. Unsupervised learning seperti mengelompokkan kartu tanpa nama kategori, lalu menemukan pola sendiri.</div></section><section class="ai-evolution-grid"><article><h4>Contoh Nyata: klasifikasi email</h4><p>Label spam atau bukan spam membantu model belajar pola kata, pengirim, dan struktur pesan.</p></article><article><h4>Contoh Nyata: semantic search</h4><p>Embedding mengubah teks menjadi vektor sehingga dokumen serupa dapat ditemukan meski kata-katanya tidak sama.</p></article></section><section class="ai-evolution-section"><h3>Lebih Teknis</h3><pre><code>for batch in data:
  prediction = model(batch.x)
  loss = compare(prediction, batch.y)
  gradient = backward(loss)
  update(model.parameters, gradient)</code></pre><p>Perceptron memberi fondasi classifier linear. Backpropagation memperkuat neural network multilapis. PCA dan k-means menunjukkan cara membaca struktur tanpa label. Embedding space menyimpan kemiripan makna dalam bentuk vektor.</p></section><section class="ai-evolution-section"><h3>Kesalahan Umum</h3><ol><li>Menganggap data lebih banyak selalu lebih baik.</li><li>Menyamakan correlation dengan causation.</li><li>Mengira akurasi training adalah kualitas akhir.</li><li>Menganggap label selalu objektif.</li><li>Memakai ML untuk business rules yang sebenarnya deterministik.</li></ol></section><section class="ai-evolution-check"><h3>Mini-check</h3><p>Untuk sistem rekomendasi materi, tentukan contoh feature, label, risiko overfitting, dan cara validasi.</p></section><section class="ai-evolution-section"><h3>Ringkasan</h3><ul><li>ML belajar pola dari data, bukan dari aturan manual saja.</li><li>Supervised, unsupervised, dan representation learning menjawab kebutuhan berbeda.</li><li>Generalization lebih penting daripada skor training.</li></ul></section><section class="ai-evolution-glossary"><h3>Glossary</h3><dl><dt>Feature</dt><dd>Informasi input yang dipakai model.</dd><dt>Label</dt><dd>Target jawaban pada supervised learning.</dd><dt>Overfitting</dt><dd>Model terlalu cocok dengan data training dan buruk pada data baru.</dd></dl></section><section class="ai-evolution-references"><h3>Referensi</h3><ol><li>Rosenblatt, <em>The Perceptron</em>, 1958.</li><li>Rumelhart, Hinton, and Williams, 1986.</li><li>Pearson, <em>Principal Components Analysis</em>, 1901.</li><li>MacQueen, <em>Some Methods for Classification and Analysis of Multivariate Observations</em>, 1967.</li><li>Bengio, Courville, and Vincent, <em>Representation Learning</em>, 2013.</li></ol></section></article>

````
