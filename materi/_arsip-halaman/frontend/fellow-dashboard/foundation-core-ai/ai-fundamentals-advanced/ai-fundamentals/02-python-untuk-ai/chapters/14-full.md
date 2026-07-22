# Chapter 14 — Pandas: Membaca dan Membersihkan Data Tabular

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/14-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Chapter 14 — Pandas: Membaca dan Membersihkan Data Tabular

#### Learning Objectives

-   Membuat dan membaca DataFrame.
-   Memeriksa, memilih, memfilter, dan membersihkan data.
-   Melakukan agregasi sederhana dan menyimpan CSV.

#### Kenapa Materi Ini Penting?

Sebagian besar waktu project data dihabiskan untuk memahami dan membersihkan data, bukan membangun model.

#### Hubungan dengan AI

Model hanya dapat belajar dari data yang diberikan. Pandas membantu menemukan nilai kosong, duplikat, tipe salah, dan distribusi yang perlu diperiksa sebelum tahap model.

#### Analogi

DataFrame seperti spreadsheet yang dapat diberi instruksi melalui kode. Instruksinya dapat diulang pada file baru tanpa mengklik langkah yang sama.

#### Penjelasan Konsep

-   `DataFrame`: tabel dua dimensi.
-   `read_csv()`: membaca CSV.
-   `head()`, `info()`, `describe()`: memahami data.
-   Boolean filtering: memilih baris berdasarkan kondisi.
-   `fillna()`/`dropna()`: menangani missing value berdasarkan alasan yang jelas.
-   `groupby()`: merangkum per kelompok.
-   `to_csv()`: menyimpan hasil.

#### Visual Thinking

    CSV → read → inspect → clean → validate → summarize → save

#### Contoh Nyata

Kolom nilai berisi satu data kosong dan track peserta perlu dibandingkan.

#### Contoh AI

Cleaning yang konsisten menghasilkan dataset yang lebih siap untuk tahap analisis atau model pada modul berikutnya.

#### Kode Python

    import pandas as pd

    data = {
        "name": ["Ayu", "Nisa", "Rani", "Sari"],
        "track": ["data", "data", "product", "product"],
        "score": [88, 91, None, 76],
    }

    df = pd.DataFrame(data)
    df["score"] = df["score"].fillna(df["score"].median())
    passed = df[df["score"] >= 75]
    summary = df.groupby("track")["score"].mean()

    passed.to_csv("participants_clean.csv", index=False)
    print(summary)

#### Penjelasan Kode Baris per Baris

1.  Pandas diimpor sebagai `pd`.
2.  Dictionary menyediakan data kolom.
3.  `DataFrame` mengubahnya menjadi tabel.
4.  Missing score diisi median sebagai keputusan contoh; pada data nyata keputusan harus dibenarkan.
5.  Boolean filter memilih nilai minimal 75.
6.  `groupby` menghitung rata-rata per track.
7.  Data bersih disimpan tanpa index tambahan.
8.  Ringkasan ditampilkan.

#### Common Mistakes

-   Mengubah data tanpa memeriksa salinan raw.
-   Mengisi semua missing value dengan nol.
-   Mengabaikan tipe data dan duplikat.
-   Menganggap hasil agregasi membuktikan sebab-akibat.

#### Best Practices

-   Mulai dengan `head()`, `shape`, `info()`, dan pemeriksaan missing value.
-   Dokumentasikan setiap keputusan cleaning.
-   Simpan output ke file baru.
-   Validasi jumlah baris sebelum dan sesudah transformasi.

#### Mini Challenge

Tambahkan satu record duplikat. Deteksi dengan `duplicated()`, hapus dengan `drop_duplicates()`, lalu bandingkan jumlah baris.

#### Ringkasan

Pandas mengubah proses cleaning dan analisis tabel menjadi langkah yang dapat diulang serta diaudit.

#### Persiapan Chapter Berikutnya

Sekarang kita menggabungkan seluruh fondasi menjadi satu mini workflow data berorientasi AI.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h1>Chapter 14 — Pandas: Membaca dan Membersihkan Data Tabular</h1>
<h2>Learning Objectives</h2>
<ul>
<li>Membuat dan membaca DataFrame.</li>
<li>Memeriksa, memilih, memfilter, dan membersihkan data.</li>
<li>Melakukan agregasi sederhana dan menyimpan CSV.</li>
</ul>
<h2>Kenapa Materi Ini Penting?</h2>
<p>Sebagian besar waktu project data dihabiskan untuk memahami dan membersihkan data, bukan membangun model.</p>
<h2>Hubungan dengan AI</h2>
<p>Model hanya dapat belajar dari data yang diberikan. Pandas membantu menemukan nilai kosong, duplikat, tipe salah, dan distribusi yang perlu diperiksa sebelum tahap model.</p>
<h2>Analogi</h2>
<p>DataFrame seperti spreadsheet yang dapat diberi instruksi melalui kode. Instruksinya dapat diulang pada file baru tanpa mengklik langkah yang sama.</p>
<h2>Penjelasan Konsep</h2>
<ul>
<li><code>DataFrame</code>: tabel dua dimensi.</li>
<li><code>read_csv()</code>: membaca CSV.</li>
<li><code>head()</code>, <code>info()</code>, <code>describe()</code>: memahami data.</li>
<li>Boolean filtering: memilih baris berdasarkan kondisi.</li>
<li><code>fillna()</code>/<code>dropna()</code>: menangani missing value berdasarkan alasan yang jelas.</li>
<li><code>groupby()</code>: merangkum per kelompok.</li>
<li><code>to_csv()</code>: menyimpan hasil.</li>
</ul>
<h2>Visual Thinking</h2>
<pre><code class="language-text">CSV → read → inspect → clean → validate → summarize → save
</code></pre>
<h2>Contoh Nyata</h2>
<p>Kolom nilai berisi satu data kosong dan track peserta perlu dibandingkan.</p>
<h2>Contoh AI</h2>
<p>Cleaning yang konsisten menghasilkan dataset yang lebih siap untuk tahap analisis atau model pada modul berikutnya.</p>
<h2>Kode Python</h2>
<pre><code class="language-python">import pandas as pd

data = {
    &quot;name&quot;: [&quot;Ayu&quot;, &quot;Nisa&quot;, &quot;Rani&quot;, &quot;Sari&quot;],
    &quot;track&quot;: [&quot;data&quot;, &quot;data&quot;, &quot;product&quot;, &quot;product&quot;],
    &quot;score&quot;: [88, 91, None, 76],
}

df = pd.DataFrame(data)
df[&quot;score&quot;] = df[&quot;score&quot;].fillna(df[&quot;score&quot;].median())
passed = df[df[&quot;score&quot;] &gt;= 75]
summary = df.groupby(&quot;track&quot;)[&quot;score&quot;].mean()

passed.to_csv(&quot;participants_clean.csv&quot;, index=False)
print(summary)
</code></pre>
<h2>Penjelasan Kode Baris per Baris</h2>
<ol>
<li>Pandas diimpor sebagai <code>pd</code>.</li>
<li>Dictionary menyediakan data kolom.</li>
<li><code>DataFrame</code> mengubahnya menjadi tabel.</li>
<li>Missing score diisi median sebagai keputusan contoh; pada data nyata keputusan harus dibenarkan.</li>
<li>Boolean filter memilih nilai minimal 75.</li>
<li><code>groupby</code> menghitung rata-rata per track.</li>
<li>Data bersih disimpan tanpa index tambahan.</li>
<li>Ringkasan ditampilkan.</li>
</ol>
<h2>Common Mistakes</h2>
<ul>
<li>Mengubah data tanpa memeriksa salinan raw.</li>
<li>Mengisi semua missing value dengan nol.</li>
<li>Mengabaikan tipe data dan duplikat.</li>
<li>Menganggap hasil agregasi membuktikan sebab-akibat.</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li>Mulai dengan <code>head()</code>, <code>shape</code>, <code>info()</code>, dan pemeriksaan missing value.</li>
<li>Dokumentasikan setiap keputusan cleaning.</li>
<li>Simpan output ke file baru.</li>
<li>Validasi jumlah baris sebelum dan sesudah transformasi.</li>
</ul>
<h2>Mini Challenge</h2>
<p>Tambahkan satu record duplikat. Deteksi dengan <code>duplicated()</code>, hapus dengan <code>drop_duplicates()</code>, lalu bandingkan jumlah baris.</p>
<h2>Ringkasan</h2>
<p>Pandas mengubah proses cleaning dan analisis tabel menjadi langkah yang dapat diulang serta diaudit.</p>
<h2>Persiapan Chapter Berikutnya</h2>
<p>Sekarang kita menggabungkan seluruh fondasi menjadi satu mini workflow data berorientasi AI.</p>
<hr>

````
