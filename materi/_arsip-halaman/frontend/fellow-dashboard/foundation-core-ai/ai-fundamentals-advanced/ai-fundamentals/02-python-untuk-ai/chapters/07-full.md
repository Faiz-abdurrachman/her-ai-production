# Chapter 7 — Function: Membangun Pipeline Kecil

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/07-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Chapter 7 — Function: Membangun Pipeline Kecil

#### Learning Objectives

-   Membuat function dengan parameter dan return value.
-   Membedakan input function, proses, dan output.
-   Menyusun beberapa function sebagai pipeline sederhana.

#### Kenapa Materi Ini Penting?

Copy-paste membuat perbaikan sulit dan hasil tidak konsisten. Function memberi nama pada satu tanggung jawab.

#### Hubungan dengan AI

Pipeline data dapat terdiri dari `load_data()`, `clean_data()`, `summarize_data()`, dan `save_report()`.

#### Analogi

Function seperti resep. Bahan masuk sebagai parameter, langkah dilakukan di dalamnya, dan hasil dikembalikan.

#### Penjelasan Konsep

`def` mendefinisikan function. Parameter menerima input. `return` mengirim hasil agar dapat dipakai bagian lain. Function sebaiknya memiliki satu tujuan yang jelas.

#### Visual Thinking

    raw score → validate_score() → clean score

#### Contoh Nyata

Aturan kelulusan dipakai pada ratusan peserta. Simpan aturan dalam satu function agar mudah diuji.

#### Contoh AI

Function preprocessing yang sama dapat digunakan pada data training dan data baru agar transformasinya konsisten—konsep ini akan diperdalam nanti.

#### Kode Python

    def classify_score(score, threshold=75):
        """Mengembalikan status nilai peserta."""
        if score is None:
            return "missing"
        if score >= threshold:
            return "pass"
        return "review"


    status = classify_score(88)
    print(status)

#### Penjelasan Kode Baris per Baris

1.  Function menerima `score` dan threshold default.
2.  Docstring menjelaskan tanggung jawabnya.
3.  Data kosong ditangani lebih dulu.
4.  Nilai dibandingkan dengan threshold.
5.  `return` mengirim satu status.
6.  Function dipanggil dengan nilai 88.

#### Common Mistakes

-   Menggunakan `print()` ketika caller sebenarnya membutuhkan `return`.
-   Function mengerjakan terlalu banyak hal.
-   Mengubah data global secara tersembunyi.

#### Best Practices

-   Gunakan nama berupa tindakan.
-   Buat input dan output jelas.
-   Uji function dengan normal, boundary, dan missing input.

#### Mini Challenge

Buat `calculate_average(scores)` yang mengabaikan `None` dan mengembalikan rata-rata atau `None` jika tidak ada nilai valid.

#### Ringkasan

Function mengubah langkah berulang menjadi komponen pipeline yang reusable dan dapat diuji.

#### Persiapan Chapter Berikutnya

Kita akan mengenal dua alat modularitas tambahan: lambda untuk operasi singkat dan generator untuk aliran data.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h1>Chapter 7 — Function: Membangun Pipeline Kecil</h1>
<h2>Learning Objectives</h2>
<ul>
<li>Membuat function dengan parameter dan return value.</li>
<li>Membedakan input function, proses, dan output.</li>
<li>Menyusun beberapa function sebagai pipeline sederhana.</li>
</ul>
<h2>Kenapa Materi Ini Penting?</h2>
<p>Copy-paste membuat perbaikan sulit dan hasil tidak konsisten. Function memberi nama pada satu tanggung jawab.</p>
<h2>Hubungan dengan AI</h2>
<p>Pipeline data dapat terdiri dari <code>load_data()</code>, <code>clean_data()</code>, <code>summarize_data()</code>, dan <code>save_report()</code>.</p>
<h2>Analogi</h2>
<p>Function seperti resep. Bahan masuk sebagai parameter, langkah dilakukan di dalamnya, dan hasil dikembalikan.</p>
<h2>Penjelasan Konsep</h2>
<p><code>def</code> mendefinisikan function. Parameter menerima input. <code>return</code> mengirim hasil agar dapat dipakai bagian lain. Function sebaiknya memiliki satu tujuan yang jelas.</p>
<h2>Visual Thinking</h2>
<pre><code class="language-text">raw score → validate_score() → clean score
</code></pre>
<h2>Contoh Nyata</h2>
<p>Aturan kelulusan dipakai pada ratusan peserta. Simpan aturan dalam satu function agar mudah diuji.</p>
<h2>Contoh AI</h2>
<p>Function preprocessing yang sama dapat digunakan pada data training dan data baru agar transformasinya konsisten—konsep ini akan diperdalam nanti.</p>
<h2>Kode Python</h2>
<pre><code class="language-python">def classify_score(score, threshold=75):
    &quot;&quot;&quot;Mengembalikan status nilai peserta.&quot;&quot;&quot;
    if score is None:
        return &quot;missing&quot;
    if score &gt;= threshold:
        return &quot;pass&quot;
    return &quot;review&quot;


status = classify_score(88)
print(status)
</code></pre>
<h2>Penjelasan Kode Baris per Baris</h2>
<ol>
<li>Function menerima <code>score</code> dan threshold default.</li>
<li>Docstring menjelaskan tanggung jawabnya.</li>
<li>Data kosong ditangani lebih dulu.</li>
<li>Nilai dibandingkan dengan threshold.</li>
<li><code>return</code> mengirim satu status.</li>
<li>Function dipanggil dengan nilai 88.</li>
</ol>
<h2>Common Mistakes</h2>
<ul>
<li>Menggunakan <code>print()</code> ketika caller sebenarnya membutuhkan <code>return</code>.</li>
<li>Function mengerjakan terlalu banyak hal.</li>
<li>Mengubah data global secara tersembunyi.</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li>Gunakan nama berupa tindakan.</li>
<li>Buat input dan output jelas.</li>
<li>Uji function dengan normal, boundary, dan missing input.</li>
</ul>
<h2>Mini Challenge</h2>
<p>Buat <code>calculate_average(scores)</code> yang mengabaikan <code>None</code> dan mengembalikan rata-rata atau <code>None</code> jika tidak ada nilai valid.</p>
<h2>Ringkasan</h2>
<p>Function mengubah langkah berulang menjadi komponen pipeline yang reusable dan dapat diuji.</p>
<h2>Persiapan Chapter Berikutnya</h2>
<p>Kita akan mengenal dua alat modularitas tambahan: lambda untuk operasi singkat dan generator untuk aliran data.</p>
<hr>

````
