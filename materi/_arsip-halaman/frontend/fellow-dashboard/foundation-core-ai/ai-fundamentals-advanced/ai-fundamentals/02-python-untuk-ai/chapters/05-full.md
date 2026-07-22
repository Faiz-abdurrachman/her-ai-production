# Chapter 5 — Collection: Wadah Data

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/05-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Chapter 5 — Collection: Wadah Data

#### Learning Objectives

-   Menggunakan list, tuple, dictionary, dan set.
-   Memilih collection berdasarkan kebutuhan.
-   Memodelkan baris dataset dan payload JSON sederhana.

#### Kenapa Materi Ini Penting?

Data nyata terdiri dari banyak observasi. Collection memungkinkan kita menyimpan dan mengorganisasi data tersebut.

#### Hubungan dengan AI

List dapat menyimpan kumpulan label, dictionary menyerupai object JSON dari API, tuple cocok untuk pasangan tetap, dan set berguna mencari kategori unik.

#### Analogi

List seperti antrean yang dapat berubah. Tuple seperti koordinat yang strukturnya tetap. Dictionary seperti kartu identitas dengan label field. Set seperti daftar tamu unik tanpa duplikasi.

#### Penjelasan Konsep

<table>
<colgroup>
<col width="20%" />
<col width="20%" />
<col width="20%" />
<col width="20%" />
<col width="20%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Collection
Berurutan
Dapat diubah
Duplikat
Penggunaan</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">List
Ya
Ya
Ya
Kumpulan record/nilai</td>
<td align="left">Tuple
Ya
Tidak
Ya
Struktur tetap</td>
<td align="left">Dictionary
Key order terjaga
Ya
Key unik
Metadata/JSON</td>
<td align="left">Set
Tidak untuk indexing
Ya
Tidak
Nilai unik</td>
</tr>
</tbody>
</table>

#### Visual Thinking

    participant = {
      "name": "Ayu",
      "scores": [80, 90, 85],
      "location": ("Jakarta", "ID")
    }

#### Contoh Nyata

Satu peserta memiliki nama dan beberapa nilai. Banyak peserta menjadi list berisi dictionary.

#### Contoh AI

Respons API sering direpresentasikan sebagai dictionary bersarang yang dapat diubah menjadi JSON.

#### Kode Python

    participants = [
        {"name": "Ayu", "score": 88, "track": "data"},
        {"name": "Nisa", "score": 91, "track": "data"},
    ]

    tracks = {item["track"] for item in participants}
    print(participants[0]["name"])
    print(tracks)

#### Penjelasan Kode Baris per Baris

1.  `participants` adalah list.
2.  Setiap item adalah dictionary dengan schema yang sama.
3.  Set comprehension mengambil track unik.
4.  Index `0` memilih peserta pertama; key `name` memilih field nama.
5.  Set track ditampilkan.

#### Common Mistakes

-   Mengakses index yang tidak ada.
-   Mengakses key yang salah eja.
-   Mengubah list saat sedang di-loop tanpa rencana.

#### Best Practices

-   Gunakan struktur konsisten untuk setiap record.
-   Pakai `.get()` jika key boleh tidak tersedia.
-   Jangan memakai set ketika urutan atau duplikat bermakna.

#### Mini Challenge

Tambahkan satu peserta, ambil semua nilai menjadi list baru, dan tampilkan track unik.

#### Ringkasan

Collection mengubah nilai terpisah menjadi struktur data yang dapat diproses sebagai dataset kecil.

#### Persiapan Chapter Berikutnya

Berikutnya kita membuat program mengambil keputusan dan mengulang proses pada setiap record.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h1>Chapter 5 — Collection: Wadah Data</h1>
<h2>Learning Objectives</h2>
<ul>
<li>Menggunakan list, tuple, dictionary, dan set.</li>
<li>Memilih collection berdasarkan kebutuhan.</li>
<li>Memodelkan baris dataset dan payload JSON sederhana.</li>
</ul>
<h2>Kenapa Materi Ini Penting?</h2>
<p>Data nyata terdiri dari banyak observasi. Collection memungkinkan kita menyimpan dan mengorganisasi data tersebut.</p>
<h2>Hubungan dengan AI</h2>
<p>List dapat menyimpan kumpulan label, dictionary menyerupai object JSON dari API, tuple cocok untuk pasangan tetap, dan set berguna mencari kategori unik.</p>
<h2>Analogi</h2>
<p>List seperti antrean yang dapat berubah. Tuple seperti koordinat yang strukturnya tetap. Dictionary seperti kartu identitas dengan label field. Set seperti daftar tamu unik tanpa duplikasi.</p>
<h2>Penjelasan Konsep</h2>
<table>
<thead>
<tr>
<th>Collection</th>
<th align="right">Berurutan</th>
<th align="right">Dapat diubah</th>
<th align="right">Duplikat</th>
<th>Penggunaan</th>
</tr>
</thead>
<tbody><tr>
<td>List</td>
<td align="right">Ya</td>
<td align="right">Ya</td>
<td align="right">Ya</td>
<td>Kumpulan record/nilai</td>
</tr>
<tr>
<td>Tuple</td>
<td align="right">Ya</td>
<td align="right">Tidak</td>
<td align="right">Ya</td>
<td>Struktur tetap</td>
</tr>
<tr>
<td>Dictionary</td>
<td align="right">Key order terjaga</td>
<td align="right">Ya</td>
<td align="right">Key unik</td>
<td>Metadata/JSON</td>
</tr>
<tr>
<td>Set</td>
<td align="right">Tidak untuk indexing</td>
<td align="right">Ya</td>
<td align="right">Tidak</td>
<td>Nilai unik</td>
</tr>
</tbody></table>
<h2>Visual Thinking</h2>
<pre><code class="language-text">participant = {
  &quot;name&quot;: &quot;Ayu&quot;,
  &quot;scores&quot;: [80, 90, 85],
  &quot;location&quot;: (&quot;Jakarta&quot;, &quot;ID&quot;)
}
</code></pre>
<h2>Contoh Nyata</h2>
<p>Satu peserta memiliki nama dan beberapa nilai. Banyak peserta menjadi list berisi dictionary.</p>
<h2>Contoh AI</h2>
<p>Respons API sering direpresentasikan sebagai dictionary bersarang yang dapat diubah menjadi JSON.</p>
<h2>Kode Python</h2>
<pre><code class="language-python">participants = [
    {&quot;name&quot;: &quot;Ayu&quot;, &quot;score&quot;: 88, &quot;track&quot;: &quot;data&quot;},
    {&quot;name&quot;: &quot;Nisa&quot;, &quot;score&quot;: 91, &quot;track&quot;: &quot;data&quot;},
]

tracks = {item[&quot;track&quot;] for item in participants}
print(participants[0][&quot;name&quot;])
print(tracks)
</code></pre>
<h2>Penjelasan Kode Baris per Baris</h2>
<ol>
<li><code>participants</code> adalah list.</li>
<li>Setiap item adalah dictionary dengan schema yang sama.</li>
<li>Set comprehension mengambil track unik.</li>
<li>Index <code>0</code> memilih peserta pertama; key <code>name</code> memilih field nama.</li>
<li>Set track ditampilkan.</li>
</ol>
<h2>Common Mistakes</h2>
<ul>
<li>Mengakses index yang tidak ada.</li>
<li>Mengakses key yang salah eja.</li>
<li>Mengubah list saat sedang di-loop tanpa rencana.</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li>Gunakan struktur konsisten untuk setiap record.</li>
<li>Pakai <code>.get()</code> jika key boleh tidak tersedia.</li>
<li>Jangan memakai set ketika urutan atau duplikat bermakna.</li>
</ul>
<h2>Mini Challenge</h2>
<p>Tambahkan satu peserta, ambil semua nilai menjadi list baru, dan tampilkan track unik.</p>
<h2>Ringkasan</h2>
<p>Collection mengubah nilai terpisah menjadi struktur data yang dapat diproses sebagai dataset kecil.</p>
<h2>Persiapan Chapter Berikutnya</h2>
<p>Berikutnya kita membuat program mengambil keputusan dan mengulang proses pada setiap record.</p>
<hr>

````
