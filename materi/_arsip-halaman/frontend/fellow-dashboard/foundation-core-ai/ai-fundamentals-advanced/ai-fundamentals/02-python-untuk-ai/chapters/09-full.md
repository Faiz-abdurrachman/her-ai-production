# Chapter 9 — Object-Oriented Programming Dasar

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/09-full.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Chapter 9 — Object-Oriented Programming Dasar

#### Learning Objectives

-   Memahami class, object, attribute, dan method.
-   Membuat class kecil dengan tanggung jawab jelas.
-   Mengetahui kapan OOP tidak diperlukan.

#### Kenapa Materi Ini Penting?

Saat program bertambah, data dan function yang saling terkait perlu diorganisasi. OOP adalah salah satu cara, bukan satu-satunya cara.

#### Hubungan dengan AI

Banyak library menggunakan object: dataset, transformer data, model, atau evaluator. Memahami object membantu membaca API library nanti.

#### Analogi

Class adalah blueprint formulir peserta; object adalah satu formulir yang sudah berisi data Ayu.

#### Penjelasan Konsep

-   **Class:** blueprint.
-   **Object:** instance.
-   **Attribute:** data milik object.
-   **Method:** perilaku object.
-   `self`: object aktif.

#### Visual Thinking

    Participant (class)
    ├── name, score (attributes)
    └── status() (method)

#### Contoh Nyata

Setiap peserta memiliki nama, nilai, dan aturan status yang sama.

#### Contoh AI

Library sering menawarkan pola `object.fit()` atau `object.transform()`. Kita belum mempelajari modelnya, hanya pola interaksi object.

#### Kode Python

    class Participant:
        def __init__(self, name, score):
            self.name = name
            self.score = score

        def status(self):
            return "pass" if self.score >= 75 else "review"


    ayu = Participant("Ayu", 88)
    print(ayu.status())

#### Penjelasan Kode Baris per Baris

1.  `class Participant` membuat blueprint.
2.  `__init__` berjalan saat object dibuat.
3.  Attribute menyimpan nama dan score.
4.  Method `status` memakai data object.
5.  `ayu` adalah instance.
6.  Method dipanggil dengan titik.

#### Common Mistakes

-   Membuat class untuk satu function sederhana.
-   Lupa `self`.
-   Menaruh terlalu banyak tanggung jawab dalam satu class.

#### Best Practices

-   Mulai dengan function; gunakan class jika data dan perilaku benar-benar menyatu.
-   Beri class satu peran jelas.
-   Hindari inheritance kompleks pada tahap pemula.

#### Mini Challenge

Tambahkan method `summary()` yang mengembalikan teks nama, nilai, dan status.

#### Ringkasan

OOP membantu mengorganisasi state dan perilaku, serta mempersiapkan peserta membaca API library AI.

#### Persiapan Chapter Berikutnya

Data dan file tidak selalu bersih. Berikutnya kita membuat program gagal dengan aman.

* * * * *

## Lampiran Sumber HTML Lengkap

````html
<h1>Chapter 9 — Object-Oriented Programming Dasar</h1>
<h2>Learning Objectives</h2>
<ul>
<li>Memahami class, object, attribute, dan method.</li>
<li>Membuat class kecil dengan tanggung jawab jelas.</li>
<li>Mengetahui kapan OOP tidak diperlukan.</li>
</ul>
<h2>Kenapa Materi Ini Penting?</h2>
<p>Saat program bertambah, data dan function yang saling terkait perlu diorganisasi. OOP adalah salah satu cara, bukan satu-satunya cara.</p>
<h2>Hubungan dengan AI</h2>
<p>Banyak library menggunakan object: dataset, transformer data, model, atau evaluator. Memahami object membantu membaca API library nanti.</p>
<h2>Analogi</h2>
<p>Class adalah blueprint formulir peserta; object adalah satu formulir yang sudah berisi data Ayu.</p>
<h2>Penjelasan Konsep</h2>
<ul>
<li><strong>Class:</strong> blueprint.</li>
<li><strong>Object:</strong> instance.</li>
<li><strong>Attribute:</strong> data milik object.</li>
<li><strong>Method:</strong> perilaku object.</li>
<li><code>self</code>: object aktif.</li>
</ul>
<h2>Visual Thinking</h2>
<pre><code class="language-text">Participant (class)
├── name, score (attributes)
└── status() (method)
</code></pre>
<h2>Contoh Nyata</h2>
<p>Setiap peserta memiliki nama, nilai, dan aturan status yang sama.</p>
<h2>Contoh AI</h2>
<p>Library sering menawarkan pola <code>object.fit()</code> atau <code>object.transform()</code>. Kita belum mempelajari modelnya, hanya pola interaksi object.</p>
<h2>Kode Python</h2>
<pre><code class="language-python">class Participant:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def status(self):
        return &quot;pass&quot; if self.score &gt;= 75 else &quot;review&quot;


ayu = Participant(&quot;Ayu&quot;, 88)
print(ayu.status())
</code></pre>
<h2>Penjelasan Kode Baris per Baris</h2>
<ol>
<li><code>class Participant</code> membuat blueprint.</li>
<li><code>__init__</code> berjalan saat object dibuat.</li>
<li>Attribute menyimpan nama dan score.</li>
<li>Method <code>status</code> memakai data object.</li>
<li><code>ayu</code> adalah instance.</li>
<li>Method dipanggil dengan titik.</li>
</ol>
<h2>Common Mistakes</h2>
<ul>
<li>Membuat class untuk satu function sederhana.</li>
<li>Lupa <code>self</code>.</li>
<li>Menaruh terlalu banyak tanggung jawab dalam satu class.</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li>Mulai dengan function; gunakan class jika data dan perilaku benar-benar menyatu.</li>
<li>Beri class satu peran jelas.</li>
<li>Hindari inheritance kompleks pada tahap pemula.</li>
</ul>
<h2>Mini Challenge</h2>
<p>Tambahkan method <code>summary()</code> yang mengembalikan teks nama, nilai, dan status.</p>
<h2>Ringkasan</h2>
<p>OOP membantu mengorganisasi state dan perilaku, serta mempersiapkan peserta membaca API library AI.</p>
<h2>Persiapan Chapter Berikutnya</h2>
<p>Data dan file tidak selalu bersih. Berikutnya kita membuat program gagal dengan aman.</p>
<hr>

````
