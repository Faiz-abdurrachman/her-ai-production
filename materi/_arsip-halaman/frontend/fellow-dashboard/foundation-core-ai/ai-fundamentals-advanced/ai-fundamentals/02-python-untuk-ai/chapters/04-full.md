# Chapter 4 — Sintaks Dasar: Instruksi dan Bahan Data

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/04-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Chapter 4 — Sintaks Dasar: Instruksi dan Bahan Data

#### Learning Objectives

-   Menggunakan `print`, comment, variable, dan tipe data dasar.
-   Memilih tipe data yang sesuai.
-   Menghubungkan string dengan prompt dan metadata.

#### Kenapa Materi Ini Penting?

Variabel dan tipe data adalah cara program memberi nama serta makna pada informasi.

#### Hubungan dengan AI

Prompt adalah string, skor dapat berupa float, jumlah data berupa integer, dan status validasi berupa boolean. Tipe yang salah dapat merusak proses berikutnya.

#### Analogi

Variabel seperti label pada wadah. Label `participant_name` memberi tahu bahwa wadah menyimpan nama, bukan nilai ujian.

#### Penjelasan Konsep

-   `str`: teks.
-   `int`: bilangan bulat.
-   `float`: bilangan desimal.
-   `bool`: `True` atau `False`.
-   comment `#`: catatan untuk pembaca kode.

Python menggunakan indentasi untuk menandai blok. Nama variabel peka huruf besar-kecil.

#### Visual Thinking

    "Jelaskan AI" → str
    250            → int
    87.5           → float
    True           → bool

#### Contoh Nyata

Form pendaftaran memiliki nama, usia, nilai tes, dan status persetujuan.

#### Contoh AI

Prompt dan parameter konfigurasi disimpan sebagai string atau angka sebelum dikirim ke sistem AI.

#### Kode Python

    # Metadata eksperimen sederhana
    prompt = "Jelaskan AI untuk pemula"
    max_words = 100
    temperature = 0.3
    is_reviewed = False

    print(prompt)
    print(type(temperature))

#### Penjelasan Kode Baris per Baris

1.  Comment menjelaskan konteks kode.
2.  `prompt` menyimpan teks.
3.  `max_words` menyimpan bilangan bulat.
4.  `temperature` menyimpan desimal; di sini hanya contoh metadata, bukan pembahasan LLM.
5.  `is_reviewed` menyimpan status boolean.
6.  `type()` membantu memeriksa tipe data.

#### Common Mistakes

-   Menulis angka sebagai string lalu mencoba menjumlahkannya.
-   Nama variabel terlalu pendek seperti `x` tanpa konteks.
-   Menggunakan comment untuk menjelaskan kode yang sebenarnya dapat dibuat lebih jelas.

#### Best Practices

-   Gunakan `snake_case`.
-   Pilih nama berdasarkan arti data.
-   Periksa tipe pada batas input, misalnya data dari form atau file.

#### Mini Challenge

Buat variabel `dataset_name`, `row_count`, `missing_ratio`, dan `is_clean`, lalu tampilkan nilai serta tipenya.

#### Ringkasan

Sintaks dasar membantu kita menyimpan, menjelaskan, dan memeriksa data yang akan mengalir dalam program.

#### Persiapan Chapter Berikutnya

Satu nilai belum cukup untuk dataset. Berikutnya kita menyimpan banyak nilai dan metadata dalam collection.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h1>Chapter 4 — Sintaks Dasar: Instruksi dan Bahan Data</h1>
<h2>Learning Objectives</h2>
<ul>
<li>Menggunakan <code>print</code>, comment, variable, dan tipe data dasar.</li>
<li>Memilih tipe data yang sesuai.</li>
<li>Menghubungkan string dengan prompt dan metadata.</li>
</ul>
<h2>Kenapa Materi Ini Penting?</h2>
<p>Variabel dan tipe data adalah cara program memberi nama serta makna pada informasi.</p>
<h2>Hubungan dengan AI</h2>
<p>Prompt adalah string, skor dapat berupa float, jumlah data berupa integer, dan status validasi berupa boolean. Tipe yang salah dapat merusak proses berikutnya.</p>
<h2>Analogi</h2>
<p>Variabel seperti label pada wadah. Label <code>participant_name</code> memberi tahu bahwa wadah menyimpan nama, bukan nilai ujian.</p>
<h2>Penjelasan Konsep</h2>
<ul>
<li><code>str</code>: teks.</li>
<li><code>int</code>: bilangan bulat.</li>
<li><code>float</code>: bilangan desimal.</li>
<li><code>bool</code>: <code>True</code> atau <code>False</code>.</li>
<li>comment <code>#</code>: catatan untuk pembaca kode.</li>
</ul>
<p>Python menggunakan indentasi untuk menandai blok. Nama variabel peka huruf besar-kecil.</p>
<h2>Visual Thinking</h2>
<pre><code class="language-text">&quot;Jelaskan AI&quot; → str
250            → int
87.5           → float
True           → bool
</code></pre>
<h2>Contoh Nyata</h2>
<p>Form pendaftaran memiliki nama, usia, nilai tes, dan status persetujuan.</p>
<h2>Contoh AI</h2>
<p>Prompt dan parameter konfigurasi disimpan sebagai string atau angka sebelum dikirim ke sistem AI.</p>
<h2>Kode Python</h2>
<pre><code class="language-python"># Metadata eksperimen sederhana
prompt = &quot;Jelaskan AI untuk pemula&quot;
max_words = 100
temperature = 0.3
is_reviewed = False

print(prompt)
print(type(temperature))
</code></pre>
<h2>Penjelasan Kode Baris per Baris</h2>
<ol>
<li>Comment menjelaskan konteks kode.</li>
<li><code>prompt</code> menyimpan teks.</li>
<li><code>max_words</code> menyimpan bilangan bulat.</li>
<li><code>temperature</code> menyimpan desimal; di sini hanya contoh metadata, bukan pembahasan LLM.</li>
<li><code>is_reviewed</code> menyimpan status boolean.</li>
<li><code>type()</code> membantu memeriksa tipe data.</li>
</ol>
<h2>Common Mistakes</h2>
<ul>
<li>Menulis angka sebagai string lalu mencoba menjumlahkannya.</li>
<li>Nama variabel terlalu pendek seperti <code>x</code> tanpa konteks.</li>
<li>Menggunakan comment untuk menjelaskan kode yang sebenarnya dapat dibuat lebih jelas.</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li>Gunakan <code>snake_case</code>.</li>
<li>Pilih nama berdasarkan arti data.</li>
<li>Periksa tipe pada batas input, misalnya data dari form atau file.</li>
</ul>
<h2>Mini Challenge</h2>
<p>Buat variabel <code>dataset_name</code>, <code>row_count</code>, <code>missing_ratio</code>, dan <code>is_clean</code>, lalu tampilkan nilai serta tipenya.</p>
<h2>Ringkasan</h2>
<p>Sintaks dasar membantu kita menyimpan, menjelaskan, dan memeriksa data yang akan mengalir dalam program.</p>
<h2>Persiapan Chapter Berikutnya</h2>
<p>Satu nilai belum cukup untuk dataset. Berikutnya kita menyimpan banyak nilai dan metadata dalam collection.</p>
<hr>

````
