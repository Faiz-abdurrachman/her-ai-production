# Chapter 11 — File I/O: Bertemu Dataset

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/11-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Chapter 11 — File I/O: Bertemu Dataset

#### Learning Objectives

-   Membaca dan menulis file teks serta CSV dasar.
-   Menggunakan context manager `with`.
-   Memahami path, encoding, dan schema sederhana.

#### Kenapa Materi Ini Penting?

Data jarang diketik langsung ke kode. Ia datang dari file, database, form, atau API. File I/O adalah jembatan pertama menuju dataset nyata.

#### Hubungan dengan AI

Dataset CSV, konfigurasi JSON, dan output eksperimen perlu dibaca serta disimpan secara konsisten.

#### Analogi

Program adalah pekerja di meja; file adalah lemari arsip. Membuka file berarti mengambil arsip, membaca atau mengubahnya, lalu menutup lemari.

#### Penjelasan Konsep

Mode umum: `r` membaca, `w` menulis ulang, `a` menambah. Context manager `with` menutup file otomatis. Encoding `utf-8` membantu menangani karakter Indonesia.

#### Visual Thinking

    participants.csv → open/read → Python → process → report.txt

#### Contoh Nyata

Panitia menyimpan nilai dalam CSV lalu membuat laporan teks.

#### Contoh AI

CSV dapat menjadi input tahap cleaning sebelum digunakan lebih lanjut pada workflow AI.

#### Kode Python

    from pathlib import Path

    report_path = Path("report.txt")

    with report_path.open("w", encoding="utf-8") as file:
        file.write("Rata-rata nilai: 84.5\n")

    with report_path.open("r", encoding="utf-8") as file:
        report = file.read()

    print(report)

#### Penjelasan Kode Baris per Baris

1.  `Path` membantu mengelola lokasi file.
2.  Path output dibuat.
3.  File dibuka dalam mode tulis dengan UTF-8.
4.  Teks dan newline ditulis.
5.  File dibuka kembali dalam mode baca.
6.  Isi disimpan ke variable dan ditampilkan.

#### Common Mistakes

-   Memakai `w` lalu tidak sengaja menimpa file.
-   Mengandalkan working directory tanpa memahami path.
-   Tidak menentukan encoding.

#### Best Practices

-   Gunakan `with` dan `pathlib.Path`.
-   Pisahkan folder data mentah dan output.
-   Jangan menimpa raw dataset; simpan hasil sebagai file baru.

#### Mini Challenge

Tulis tiga baris ringkasan ke `summary.txt`, baca kembali, dan tampilkan.

#### Ringkasan

File I/O memungkinkan data bertahan setelah program selesai dan menjadi input untuk proses berikutnya.

#### Persiapan Chapter Berikutnya

Python dasar dapat melakukan banyak hal, tetapi library membuat pekerjaan data jauh lebih efisien.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h1>Chapter 11 — File I/O: Bertemu Dataset</h1>
<h2>Learning Objectives</h2>
<ul>
<li>Membaca dan menulis file teks serta CSV dasar.</li>
<li>Menggunakan context manager <code>with</code>.</li>
<li>Memahami path, encoding, dan schema sederhana.</li>
</ul>
<h2>Kenapa Materi Ini Penting?</h2>
<p>Data jarang diketik langsung ke kode. Ia datang dari file, database, form, atau API. File I/O adalah jembatan pertama menuju dataset nyata.</p>
<h2>Hubungan dengan AI</h2>
<p>Dataset CSV, konfigurasi JSON, dan output eksperimen perlu dibaca serta disimpan secara konsisten.</p>
<h2>Analogi</h2>
<p>Program adalah pekerja di meja; file adalah lemari arsip. Membuka file berarti mengambil arsip, membaca atau mengubahnya, lalu menutup lemari.</p>
<h2>Penjelasan Konsep</h2>
<p>Mode umum: <code>r</code> membaca, <code>w</code> menulis ulang, <code>a</code> menambah. Context manager <code>with</code> menutup file otomatis. Encoding <code>utf-8</code> membantu menangani karakter Indonesia.</p>
<h2>Visual Thinking</h2>
<pre><code class="language-text">participants.csv → open/read → Python → process → report.txt
</code></pre>
<h2>Contoh Nyata</h2>
<p>Panitia menyimpan nilai dalam CSV lalu membuat laporan teks.</p>
<h2>Contoh AI</h2>
<p>CSV dapat menjadi input tahap cleaning sebelum digunakan lebih lanjut pada workflow AI.</p>
<h2>Kode Python</h2>
<pre><code class="language-python">from pathlib import Path

report_path = Path(&quot;report.txt&quot;)

with report_path.open(&quot;w&quot;, encoding=&quot;utf-8&quot;) as file:
    file.write(&quot;Rata-rata nilai: 84.5\n&quot;)

with report_path.open(&quot;r&quot;, encoding=&quot;utf-8&quot;) as file:
    report = file.read()

print(report)
</code></pre>
<h2>Penjelasan Kode Baris per Baris</h2>
<ol>
<li><code>Path</code> membantu mengelola lokasi file.</li>
<li>Path output dibuat.</li>
<li>File dibuka dalam mode tulis dengan UTF-8.</li>
<li>Teks dan newline ditulis.</li>
<li>File dibuka kembali dalam mode baca.</li>
<li>Isi disimpan ke variable dan ditampilkan.</li>
</ol>
<h2>Common Mistakes</h2>
<ul>
<li>Memakai <code>w</code> lalu tidak sengaja menimpa file.</li>
<li>Mengandalkan working directory tanpa memahami path.</li>
<li>Tidak menentukan encoding.</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li>Gunakan <code>with</code> dan <code>pathlib.Path</code>.</li>
<li>Pisahkan folder data mentah dan output.</li>
<li>Jangan menimpa raw dataset; simpan hasil sebagai file baru.</li>
</ul>
<h2>Mini Challenge</h2>
<p>Tulis tiga baris ringkasan ke <code>summary.txt</code>, baca kembali, dan tampilkan.</p>
<h2>Ringkasan</h2>
<p>File I/O memungkinkan data bertahan setelah program selesai dan menjadi input untuk proses berikutnya.</p>
<h2>Persiapan Chapter Berikutnya</h2>
<p>Python dasar dapat melakukan banyak hal, tetapi library membuat pekerjaan data jauh lebih efisien.</p>
<hr>

````
