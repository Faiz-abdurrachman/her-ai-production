# Chapter 10 — Error Handling: Program yang Tahan Gangguan

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/10-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Chapter 10 — Error Handling: Program yang Tahan Gangguan

#### Learning Objectives

-   Membaca error sebagai informasi.
-   Menggunakan `try`, `except`, `else`, dan `finally`.
-   Menangkap exception secara spesifik.

#### Kenapa Materi Ini Penting?

Program data bertemu file hilang, teks di kolom angka, dan input kosong. Error handling bukan menyembunyikan masalah, melainkan meresponsnya dengan jelas.

#### Hubungan dengan AI

Pipeline data harus berhenti atau memberi fallback ketika input tidak valid. Data buruk yang diam-diam lolos dapat menghasilkan output yang menyesatkan.

#### Analogi

Sabuk pengaman tidak mencegah semua kecelakaan, tetapi mengurangi dampak ketika masalah terjadi.

#### Penjelasan Konsep

Kode berisiko ditempatkan dalam `try`. `except` menangani error tertentu. `else` berjalan jika tidak ada error. `finally` selalu berjalan, misalnya untuk menutup resource.

#### Visual Thinking

    Try process → sukses → else
           └────→ error spesifik → except
                        ↓
                     finally

#### Contoh Nyata

Input nilai dari form masih berupa teks dan mungkin berisi kata “delapan puluh”.

#### Contoh AI

Sebelum data diproses, pipeline memvalidasi tipe dan mencatat record yang gagal.

#### Kode Python

    raw_score = "88"

    try:
        score = float(raw_score)
    except ValueError:
        print("Nilai harus berupa angka")
    else:
        print(f"Nilai valid: {score}")
    finally:
        print("Validasi selesai")

#### Penjelasan Kode Baris per Baris

1.  Input awal masih string.
2.  `try` mencoba mengubahnya menjadi float.
3.  `ValueError` ditangani jika format salah.
4.  `else` hanya berjalan saat konversi berhasil.
5.  `finally` memberi penutup yang selalu dijalankan.

#### Common Mistakes

-   Memakai `except:` yang menangkap semua error.
-   Mengabaikan error tanpa log atau pesan.
-   Menggunakan exception untuk alur normal yang mudah diperiksa dengan `if`.

#### Best Practices

-   Tangkap exception paling spesifik.
-   Berikan pesan yang membantu tindakan berikutnya.
-   Jangan melanjutkan pipeline dengan data rusak tanpa keputusan eksplisit.

#### Mini Challenge

Buat function `parse_score(value)` yang mengembalikan float atau `None` dengan pesan yang jelas.

#### Ringkasan

Error handling membuat kegagalan terlihat, terkontrol, dan dapat diperbaiki.

#### Persiapan Chapter Berikutnya

Berikutnya kita membawa program keluar dari memori dengan membaca dan menulis file.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h1>Chapter 10 — Error Handling: Program yang Tahan Gangguan</h1>
<h2>Learning Objectives</h2>
<ul>
<li>Membaca error sebagai informasi.</li>
<li>Menggunakan <code>try</code>, <code>except</code>, <code>else</code>, dan <code>finally</code>.</li>
<li>Menangkap exception secara spesifik.</li>
</ul>
<h2>Kenapa Materi Ini Penting?</h2>
<p>Program data bertemu file hilang, teks di kolom angka, dan input kosong. Error handling bukan menyembunyikan masalah, melainkan meresponsnya dengan jelas.</p>
<h2>Hubungan dengan AI</h2>
<p>Pipeline data harus berhenti atau memberi fallback ketika input tidak valid. Data buruk yang diam-diam lolos dapat menghasilkan output yang menyesatkan.</p>
<h2>Analogi</h2>
<p>Sabuk pengaman tidak mencegah semua kecelakaan, tetapi mengurangi dampak ketika masalah terjadi.</p>
<h2>Penjelasan Konsep</h2>
<p>Kode berisiko ditempatkan dalam <code>try</code>. <code>except</code> menangani error tertentu. <code>else</code> berjalan jika tidak ada error. <code>finally</code> selalu berjalan, misalnya untuk menutup resource.</p>
<h2>Visual Thinking</h2>
<pre><code class="language-text">Try process → sukses → else
       └────→ error spesifik → except
                    ↓
                 finally
</code></pre>
<h2>Contoh Nyata</h2>
<p>Input nilai dari form masih berupa teks dan mungkin berisi kata “delapan puluh”.</p>
<h2>Contoh AI</h2>
<p>Sebelum data diproses, pipeline memvalidasi tipe dan mencatat record yang gagal.</p>
<h2>Kode Python</h2>
<pre><code class="language-python">raw_score = &quot;88&quot;

try:
    score = float(raw_score)
except ValueError:
    print(&quot;Nilai harus berupa angka&quot;)
else:
    print(f&quot;Nilai valid: {score}&quot;)
finally:
    print(&quot;Validasi selesai&quot;)
</code></pre>
<h2>Penjelasan Kode Baris per Baris</h2>
<ol>
<li>Input awal masih string.</li>
<li><code>try</code> mencoba mengubahnya menjadi float.</li>
<li><code>ValueError</code> ditangani jika format salah.</li>
<li><code>else</code> hanya berjalan saat konversi berhasil.</li>
<li><code>finally</code> memberi penutup yang selalu dijalankan.</li>
</ol>
<h2>Common Mistakes</h2>
<ul>
<li>Memakai <code>except:</code> yang menangkap semua error.</li>
<li>Mengabaikan error tanpa log atau pesan.</li>
<li>Menggunakan exception untuk alur normal yang mudah diperiksa dengan <code>if</code>.</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li>Tangkap exception paling spesifik.</li>
<li>Berikan pesan yang membantu tindakan berikutnya.</li>
<li>Jangan melanjutkan pipeline dengan data rusak tanpa keputusan eksplisit.</li>
</ul>
<h2>Mini Challenge</h2>
<p>Buat function <code>parse_score(value)</code> yang mengembalikan float atau <code>None</code> dengan pesan yang jelas.</p>
<h2>Ringkasan</h2>
<p>Error handling membuat kegagalan terlihat, terkontrol, dan dapat diperbaiki.</p>
<h2>Persiapan Chapter Berikutnya</h2>
<p>Berikutnya kita membawa program keluar dari memori dengan membaca dan menulis file.</p>
<hr>

````
