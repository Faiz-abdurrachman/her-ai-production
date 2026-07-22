# Chapter 8 — Modularitas: Lambda dan Generator

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/08-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Chapter 8 — Modularitas: Lambda dan Generator

#### Learning Objectives

-   Memahami penggunaan lambda yang tepat.
-   Membuat generator sederhana dengan `yield`.
-   Memilih keterbacaan daripada kode yang terlalu ringkas.

#### Kenapa Materi Ini Penting?

Data dapat berjumlah besar. Kita perlu cara menulis transformasi singkat dan memproses data bertahap tanpa selalu memuat semuanya ke memori.

#### Hubungan dengan AI

Lambda sering dipakai sebagai fungsi kecil saat sorting atau transformasi. Generator dapat mengalirkan record dataset satu per satu.

#### Analogi

List seperti membawa seluruh galon sekaligus; generator seperti keran yang mengalirkan air saat dibutuhkan.

#### Penjelasan Konsep

Lambda cocok untuk ekspresi singkat yang mudah dibaca. Jika memiliki kondisi rumit, gunakan `def`. Generator memakai `yield`, menghentikan sementara function, lalu melanjutkan saat nilai berikutnya diminta.

#### Visual Thinking

    File besar → record 1 → record 2 → record 3 → ...
                  generator mengirim satu per satu

#### Contoh Nyata

Urutkan peserta berdasarkan score menggunakan key function.

#### Contoh AI

Dataset besar sering dibaca per batch atau per record agar penggunaan memori terkendali.

#### Kode Python

    participants = [
        {"name": "Ayu", "score": 88},
        {"name": "Nisa", "score": 91},
    ]

    ranked = sorted(participants, key=lambda item: item["score"], reverse=True)


    def stream_names(items):
        for item in items:
            yield item["name"]


    for name in stream_names(ranked):
        print(name)

#### Penjelasan Kode Baris per Baris

1.  List menyimpan dua record.
2.  Lambda memberi tahu `sorted()` field yang digunakan.
3.  `reverse=True` mengurutkan dari tinggi ke rendah.
4.  Generator menerima collection.
5.  `yield` mengirim satu nama pada satu waktu.
6.  Loop meminta dan menampilkan setiap nama.

#### Common Mistakes

-   Membuat lambda panjang dan sulit dibaca.
-   Mengira generator dapat diulang setelah habis tanpa dibuat ulang.
-   Mengubah semua function menjadi generator tanpa kebutuhan.

#### Best Practices

-   Batasi lambda pada satu ekspresi jelas.
-   Pakai `def` untuk logika bernama atau kompleks.
-   Gunakan generator ketika aliran data atau memori memang relevan.

#### Mini Challenge

Buat generator yang hanya menghasilkan score valid dari list yang mengandung `None`.

#### Ringkasan

Lambda membantu operasi kecil; generator membantu aliran data bertahap. Keduanya berguna jika tidak mengorbankan keterbacaan.

#### Persiapan Chapter Berikutnya

Selanjutnya kita melihat bagaimana data dan perilaku dapat dibungkus dalam object sederhana.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h1>Chapter 8 — Modularitas: Lambda dan Generator</h1>
<h2>Learning Objectives</h2>
<ul>
<li>Memahami penggunaan lambda yang tepat.</li>
<li>Membuat generator sederhana dengan <code>yield</code>.</li>
<li>Memilih keterbacaan daripada kode yang terlalu ringkas.</li>
</ul>
<h2>Kenapa Materi Ini Penting?</h2>
<p>Data dapat berjumlah besar. Kita perlu cara menulis transformasi singkat dan memproses data bertahap tanpa selalu memuat semuanya ke memori.</p>
<h2>Hubungan dengan AI</h2>
<p>Lambda sering dipakai sebagai fungsi kecil saat sorting atau transformasi. Generator dapat mengalirkan record dataset satu per satu.</p>
<h2>Analogi</h2>
<p>List seperti membawa seluruh galon sekaligus; generator seperti keran yang mengalirkan air saat dibutuhkan.</p>
<h2>Penjelasan Konsep</h2>
<p>Lambda cocok untuk ekspresi singkat yang mudah dibaca. Jika memiliki kondisi rumit, gunakan <code>def</code>. Generator memakai <code>yield</code>, menghentikan sementara function, lalu melanjutkan saat nilai berikutnya diminta.</p>
<h2>Visual Thinking</h2>
<pre><code class="language-text">File besar → record 1 → record 2 → record 3 → ...
              generator mengirim satu per satu
</code></pre>
<h2>Contoh Nyata</h2>
<p>Urutkan peserta berdasarkan score menggunakan key function.</p>
<h2>Contoh AI</h2>
<p>Dataset besar sering dibaca per batch atau per record agar penggunaan memori terkendali.</p>
<h2>Kode Python</h2>
<pre><code class="language-python">participants = [
    {&quot;name&quot;: &quot;Ayu&quot;, &quot;score&quot;: 88},
    {&quot;name&quot;: &quot;Nisa&quot;, &quot;score&quot;: 91},
]

ranked = sorted(participants, key=lambda item: item[&quot;score&quot;], reverse=True)


def stream_names(items):
    for item in items:
        yield item[&quot;name&quot;]


for name in stream_names(ranked):
    print(name)
</code></pre>
<h2>Penjelasan Kode Baris per Baris</h2>
<ol>
<li>List menyimpan dua record.</li>
<li>Lambda memberi tahu <code>sorted()</code> field yang digunakan.</li>
<li><code>reverse=True</code> mengurutkan dari tinggi ke rendah.</li>
<li>Generator menerima collection.</li>
<li><code>yield</code> mengirim satu nama pada satu waktu.</li>
<li>Loop meminta dan menampilkan setiap nama.</li>
</ol>
<h2>Common Mistakes</h2>
<ul>
<li>Membuat lambda panjang dan sulit dibaca.</li>
<li>Mengira generator dapat diulang setelah habis tanpa dibuat ulang.</li>
<li>Mengubah semua function menjadi generator tanpa kebutuhan.</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li>Batasi lambda pada satu ekspresi jelas.</li>
<li>Pakai <code>def</code> untuk logika bernama atau kompleks.</li>
<li>Gunakan generator ketika aliran data atau memori memang relevan.</li>
</ul>
<h2>Mini Challenge</h2>
<p>Buat generator yang hanya menghasilkan score valid dari list yang mengandung <code>None</code>.</p>
<h2>Ringkasan</h2>
<p>Lambda membantu operasi kecil; generator membantu aliran data bertahap. Keduanya berguna jika tidak mengorbankan keterbacaan.</p>
<h2>Persiapan Chapter Berikutnya</h2>
<p>Selanjutnya kita melihat bagaimana data dan perilaku dapat dibungkus dalam object sederhana.</p>
<hr>

````
