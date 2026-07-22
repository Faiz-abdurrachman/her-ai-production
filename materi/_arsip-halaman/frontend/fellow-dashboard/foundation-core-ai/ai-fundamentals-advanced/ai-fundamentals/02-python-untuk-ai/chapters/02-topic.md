# Chapter 4 — Sintaks Dasar: Instruksi dan Bahan Data

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/02-topic.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

### Chapter 4 — Sintaks Dasar: Instruksi dan Bahan Data

#### Learning Objectives

-   Menggunakan `print`, comment, variable, dan tipe data dasar.
-   Memilih tipe data yang sesuai.
-   Menghubungkan string dengan prompt dan metadata.

#### Kenapa Materi Ini Penting?

Setiap program Python — dari skrip sederhana hingga pipeline AI — bekerja dengan menyimpan, membaca, dan mengubah informasi. Tanpa pemahaman tentang bagaimana data disimpan dan apa operasi yang valid untuk setiap bentuk data, program akan menghasilkan error yang membingungkan atau — lebih berbahaya — hasil yang tampak benar tetapi sebenarnya salah. Misalnya menjumlahkan string "80" dan "70" menghasilkan "8070", bukan 150. Pemula sering mengira ini bug Python, padahal ini masalah pemilihan tipe data. Bab ini membangun fondasi yang membuat seluruh kode selanjutnya dapat diprediksi dan dipercaya.

#### Hubungan dengan AI

Dalam workflow AI, hampir setiap titik menyentuh tipe data yang berbeda. Prompt yang dikirim ke LLM adalah string. Skor evaluasi model adalah float. Jumlah baris dataset adalah integer. Status validasi — apakah data sudah siap diproses — adalah boolean. Ketika pipeline menerima input dari file atau API, tipe data sering datang dalam bentuk yang tidak terduga: angka terbaca sebagai string, nilai kosong menjadi None, atau kolom yang seharusnya numerik berisi teks. Memeriksa dan mengonversi tipe data di setiap tahap adalah keterampilan yang menyelamatkan waktu debugging berjam-jam.

#### Analogi

Variabel seperti wadah penyimpanan di dapur. Label pada wadah — misalnya `participant_name` atau `max_score` — memberi tahu isinya tanpa harus membuka tutup. Jenis wadah juga penting: toples kaca (string) cocok untuk label, kotak plastik (integer) untuk jumlah, dan timbangan (float) untuk berat. Menaruh bahan basah di wadah tepung akan merusak keduanya — sama seperti menyimpan skor sebagai string akan membuat operasi matematika gagal atau memberikan hasil yang menyesatkan. Memilih wadah dan label yang tepat sejak awal adalah tanda dapur yang terorganisir, bukan sekadar kebiasaan rapi.

#### Penjelasan Konsep

Python adalah bahasa yang *dynamically typed*, artinya kita tidak perlu mendeklarasikan tipe data secara eksplisit — interpreter akan mengenali jenis nilai yang disimpan. Namun kemudahan ini bukan alasan untuk mengabaikan tipe data. Memahami tipe data berarti kita tahu operasi apa yang aman dilakukan dan konsekuensi dari setiap operasi tersebut.

**str (string)** menyimpan teks — nama peserta, prompt ke model AI, atau path ke file dataset. String bisa digabung dengan operator +, dipecah menjadi potongan kecil dengan `.split()`, dan diformat ulang dengan f-string. Operasi matematika seperti pembagian tidak berlaku untuk string; ekspresi `"100" / 2` akan menghasilkan TypeError. Jika kamu menemukan angka yang sebenarnya adalah teks — misalnya dari file CSV — kamu harus mengonversinya terlebih dahulu menggunakan `int()` atau `float()`.

**int (integer)** menyimpan bilangan bulat seperti jumlah baris, jumlah peserta, atau jumlah epoch dalam pelatihan model. Integer mendukung penjumlahan, pengurangan, perkalian, dan pembagian. Namun perlu diingat: operator pembagian `/` selalu menghasilkan float meskipun hasilnya bilangan bulat. Jika kamu menginginkan hasil bagi yang dibulatkan ke bawah, gunakan operator `//`.

**float** menyimpan bilangan desimal yang mewakili ukuran kontinu — skor 87.5, temperatur 0.7, atau persentase missing value 0.05. Float memiliki keterbatasan presisi karena representasi biner di memori, sehingga operasi seperti `0.1 + 0.2` menghasilkan `0.30000000000000004`. Ini bukan bug Python, melainkan karakteristik komputasi numerik yang perlu dipahami ketika membandingkan nilai float.

**bool (boolean)** hanya memiliki dua nilai: `True` atau `False`. Boolean sering muncul sebagai hasil perbandingan — `score >= 75` menghasilkan True atau False — dan digunakan untuk mengontrol alur program dengan if/else. Boolean juga berguna sebagai status: `is_clean = True`, `has_error = False`.

**None** adalah tipe terpisah yang menandakan tidak ada nilai. None bukan nol, bukan string kosong, dan bukan False. Menyamakan None dengan nol adalah salah satu sumber bug paling umum dalam analisis data. Jika skor seorang peserta adalah None, itu berarti tidak ada data — bukan berarti skornya nol. Memeriksa None dengan `is None` harus dilakukan sebelum operasi numerik apa pun.

Python menggunakan indentasi (spasi atau tab) untuk menandai blok kode. Indentasi yang konsisten — biasanya 4 spasi — adalah bagian dari sintaks, bukan sekadar gaya penulisan. Kesalahan indentasi akan menghasilkan IndentationError dan program tidak berjalan.

#### Visual Thinking

    "Jelaskan AI" → str
    250            → int
    87.5           → float
    True           → bool
    None           → NoneType

#### Contoh Nyata

Bayangkan form pendaftaran peserta. Kolom nama diisi dengan teks (string). Kolom usia diisi dengan angka (int). Kolom nilai tes bisa berisi desimal (float). Kolom persetujuan diisi dengan centang (bool). Jika data dari form disimpan dalam dictionary, setiap field memiliki tipe yang berbeda dan perlu diperlakukan sesuai operasinya masing-masing. Jika kolom nilai kosong, sistem harus menanganinya sebagai None, bukan menganggapnya nol — karena nol akan memengaruhi rata-rata kelas.

#### Contoh AI

LLM menerima prompt sebagai string dan mengembalikan respons sebagai string. Parameter seperti temperature dan max\_tokens adalah float dan integer. Sebelum prompt dikirim ke model, semua parameter dikemas dalam dictionary yang nilainya memiliki tipe berbeda. Sistem yang baik memvalidasi bahwa temperature berada di rentang 0–2 sebelum dikirim, dan memeriksa bahwa respons yang diterima benar-benar string sebelum diproses lebih lanjut. Validasi tipe data di setiap gerbang ini mencegah error yang sulit dilacak.

#### Kode Python

    # Metadata eksperimen sederhana
    prompt = "Jelaskan AI untuk pemula"
    max_words = 100
    temperature = 0.3
    is_reviewed = False

    print(prompt)
    print(type(temperature))

#### Penjelasan Kode Baris per Baris

1.  Comment menjelaskan konteks kode tanpa memengaruhi eksekusi.
2.  `prompt` menyimpan teks sebagai string.
3.  `max_words` menyimpan bilangan bulat sebagai integer.
4.  `temperature` menyimpan desimal; di sini hanya contoh metadata, bukan pembahasan LLM.
5.  `is_reviewed` menyimpan status boolean.
6.  `type()` membantu memeriksa tipe data saat debugging.

#### Common Mistakes

-   **Menulis angka sebagai string lalu mencoba menjumlahkannya.** Jika data berasal dari form atau file CSV, angka sering terbaca sebagai string. Menjumlahkan "80" + "70" menghasilkan "8070" karena Python menggabungkan teks. Konversi dengan `int()` atau `float()` harus dilakukan sebelum operasi matematika.
-   **Nama variabel terlalu pendek tanpa konteks.** Variabel seperti `x`, `y`, atau `tmp` tidak menjelaskan perannya. Ketika kode kembali dibaca seminggu kemudian — atau oleh anggota tim lain — nama yang bermakna seperti `average_score` atau `cleaned_rows` menyelamatkan waktu menebak-nebak.
-   **Menggunakan comment untuk menjelaskan kode yang sebenarnya dapat dibuat lebih jelas.** Comment seharusnya menjelaskan *kenapa*, bukan *apa*. Jika kode membutuhkan comment untuk menjelaskan fungsinya, pertimbangkan untuk menulis ulang kodenya agar lebih ekspresif.

#### Best Practices

-   **Gunakan `snake_case` untuk nama variabel.** Python memiliki konvensi penamaan yang disepakati komunitas: huruf kecil dengan garis bawah sebagai pemisah. Konsistensi ini membuat kode lebih mudah dibaca oleh programmer Python lain.
-   **Pilih nama berdasarkan arti data.** `participant_count` lebih informatif daripada `n`, dan `missing_ratio` lebih jelas daripada `r`. Nama yang baik adalah dokumentasi pertama untuk kode kamu.
-   **Periksa tipe pada batas input.** Data dari file, form, atau API sering datang dalam tipe yang tidak terduga. Biasakan memeriksa dan mengonversi tipe data segera setelah data masuk, bukan saat data akan diproses.

#### Mini Challenge

Buat variabel `dataset_name`, `row_count`, `missing_ratio`, dan `is_clean`, lalu tampilkan nilai serta tipenya.

#### Ringkasan

Tipe data adalah fondasi setiap program Python. String, integer, float, boolean, dan None masing-masing memiliki aturan dan operasi yang berbeda. Memilih tipe yang tepat dan memvalidasi tipe data di titik masuk — terutama ketika data berasal dari sumber eksternal — adalah kebiasaan yang mencegah bug paling umum dalam analisis data. Dari sini kita akan membangun struktur data yang lebih kompleks menggunakan collection.

#### Persiapan Chapter Berikutnya

Satu nilai belum cukup untuk dataset. Berikutnya kita menyimpan banyak nilai dan metadata dalam collection.

* * * * *

### Chapter 5 — Collection: Wadah Data

#### Learning Objectives

-   Menggunakan list, tuple, dictionary, dan set.
-   Memilih collection berdasarkan kebutuhan.
-   Memodelkan baris dataset dan payload JSON sederhana.

#### Kenapa Materi Ini Penting?

Data di dunia nyata hampir tidak pernah berdiri sendiri. Satu peserta memiliki nama, skor, track, dan metadata lain; seribu peserta berarti seribu kumpulan field yang perlu disimpan, diakses, dan diproses. Collection adalah alat untuk mengatur banyak data dalam satu struktur yang terprediksi. Tanpa collection, kita harus membuat variabel terpisah untuk setiap record — pendekatan yang jelas tidak mungkin untuk dataset realistis. Memilih collection yang tepat — apakah list, dictionary, set, atau tuple — menentukan seberapa mudah data dapat diakses, diubah, dan dianalisis.

#### Hubungan dengan AI

Dalam workflow AI, list sering digunakan untuk menyimpan urutan record dataset. Dictionary merepresentasikan satu record — mirip dengan object JSON yang dikirim dan diterima oleh API AI. Set berguna untuk menghimpun kategori unik dari ribuan entri, misalnya semua track yang tersedia dalam program fellowship. Tuple cocok untuk pasangan nilai yang strukturnya tetap, seperti koordinat atau rentang nilai minimum-maksimum. Memahami collection berarti memahami bagaimana data mengalir antara Python, file, dan layanan eksternal.

#### Analogi

List seperti antrean di kasir: orang datang dan pergi, urutannya terjaga, dan kita bisa menambah atau menghapus orang dari antrean. Tuple seperti koordinat GPS: sekali ditulis (lintang, bujur), tidak berubah. Dictionary seperti kartu identitas: setiap label (NIK, nama, alamat) memiliki satu nilai, dan kita mencari berdasarkan label, bukan berdasarkan nomor urut. Set seperti daftar tamu undangan: setiap nama hanya muncul sekali, tidak ada duplikasi, dan urutan tidak penting. Memilih struktur yang tepat sejak awal sama pentingnya dengan memilih wadah yang tepat untuk menyimpan bahan makanan — wadah yang salah akan membuat isinya tumpah atau sulit diambil.

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

**List** adalah collection paling serbaguna. Ia menjaga urutan penyisipan, dapat diubah (ditambah, dihapus, diubah elemennya), dan mengizinkan duplikasi. Gunakan list ketika urutan berarti — misalnya daftar peserta sesuai urutan pendaftaran — atau ketika data akan diakses berdasarkan posisi (indeks). List juga cocok untuk menampung kumpulan record yang akan diproses dalam loop.

**Tuple** mirip dengan list tetapi tidak dapat diubah setelah dibuat. Sifat immutability ini membuat tuple aman digunakan sebagai key dalam dictionary atau ketika struktur data harus tetap konstan — misalnya koordinat (lat, lon) atau pasangan (nama\_kolom, tipe\_data). Tuple juga lebih ringan secara memori dibandingkan list.

**Dictionary** menyimpan pasangan key-value. Key harus unik dan immutable (biasanya string atau tuple), sedangkan value bisa berupa tipe apa pun — termasuk list atau dictionary lain. Dictionary sangat cocok untuk merepresentasikan satu record dengan field bernama model, mirip dengan object JSON. Mengakses nilai dengan `dict["key"]` lebih cepat daripada mencari dalam list, tetapi key harus dieja dengan tepat.

**Set** menyimpan nilai unik tanpa urutan tertentu. Operasi utama set adalah membership test ("apakah nilai ini ada?") dan operasi himpunan seperti gabungan, irisan, dan selisih. Set berguna untuk menghapus duplikat dari list atau mencari nilai yang muncul di dua kumpulan data berbeda. Namun set tidak dapat diakses berdasarkan indeks dan tidak dapat menyimpan nilai yang sama dua kali.

Collection dapat bersarang — misalnya list yang berisi dictionary, atau dictionary yang value-nya adalah list. Struktur bersarang ini adalah fondasi dari data tabular di Python dan akan sering ditemui saat bekerja dengan file JSON atau Pandas DataFrame.

#### Visual Thinking

    participant = {
      "name": "Ayu",
      "scores": [80, 90, 85],
      "location": ("Jakarta", "ID")
    }

#### Contoh Nyata

Seorang peserta memiliki nama (string) dan beberapa nilai (list of float). Banyak peserta menjadi list yang berisi dictionary — ini adalah struktur yang sama dengan data tabular. Jika kita ingin mengambil semua track unik dari ratusan peserta, set memberikan hasil instan tanpa perlu menulis loop manual. Jika data peserta perlu dikirim ke API, dictionary dapat langsung dikonversi menjadi JSON tanpa perubahan struktur.

#### Contoh AI

Respons dari API model AI hampir selalu berbentuk dictionary bersarang. Misalnya respons LLM dapat berisi key `"choices"` yang value-nya adalah list, dan setiap elemen list adalah dictionary dengan key `"message"` dan `"finish_reason"`. Memahami cara mengakses data bertingkat ini — `response["choices"][0]["message"]["content"]` — adalah keterampilan dasar yang akan dipakai terus menerus saat mengintegrasikan Python dengan layanan AI.

#### Kode Python

    participants = [
        {"name": "Ayu", "score": 88, "track": "data"},
        {"name": "Nisa", "score": 91, "track": "data"},
    ]

    tracks = {item["track"] for item in participants}
    print(participants[0]["name"])
    print(tracks)

#### Penjelasan Kode Baris per Baris

1.  `participants` adalah list yang menyimpan dua record.
2.  Setiap item dalam list adalah dictionary dengan schema yang sama: name, score, track.
3.  Set comprehension `{item["track"] for item in participants}` mengambil track unik — dalam contoh ini hanya "data" — tanpa perlu loop manual.
4.  Index `0` memilih peserta pertama dari list; key `["name"]` memilih field nama dari dictionary tersebut.
5.  Set track ditampilkan — perhatikan bahwa meskipun "data" muncul dua kali, set hanya menyimpannya sekali.

#### Common Mistakes

-   **Mengakses index yang tidak ada.** List dengan 3 elemen hanya memiliki index 0, 1, dan 2. Mengakses index 3 menghasilkan IndexError. Selalu periksa panjang list dengan `len()` sebelum mengakses index yang tidak pasti.
-   **Mengakses key yang salah eja.** Dictionary mengandalkan kecocokan persis nama key. `participant["name"]` berbeda dengan `participant["nama"]`. Satu huruf yang salah eja menghasilkan KeyError. Gunakan `.get()` jika key boleh tidak ada.
-   **Mengubah list saat sedang di-loop tanpa rencana.** Menghapus elemen dari list yang sedang di-loop dapat menyebabkan elemen terlewat atau error. Jika perlu memfilter, buat list baru daripada menghapus dari list yang sedang diproses.

#### Best Practices

-   **Gunakan struktur konsisten untuk setiap record.** Jika satu record memiliki key "name", semua record lain juga harus memiliki key "name". Inkonsistensi schema adalah sumber bug yang sulit dilacak.
-   **Pakai `.get()` jika key boleh tidak tersedia.** `participant.get("score", 0)` mengembalikan 0 sebagai default jika key "score" tidak ada, tanpa melempar KeyError. Nilai default harus dipilih dengan hati-hati — jangan asumsi nol selalu aman.
-   **Jangan memakai set ketika urutan atau duplikat bermakna.** Set tidak menjamin urutan dan menghapus duplikat secara otomatis. Jika urutan penyisipan penting atau duplikat memiliki arti — misalnya peserta dapat mengikuti beberapa track — set bukan pilihan yang tepat.

#### Mini Challenge

Tambahkan satu peserta, ambil semua nilai menjadi list baru, dan tampilkan track unik.

#### Ringkasan

List, tuple, dictionary, dan set masing-masing memiliki karakteristik yang membuatnya cocok untuk tugas tertentu. List untuk urutan yang dapat berubah, tuple untuk struktur tetap, dictionary untuk data bernama, dan set untuk keunikan. Collection dapat bersarang membentuk struktur data kompleks yang mendekati data dunia nyata. Pemilihan collection yang tepat sejak awal mengurangi kerumitan kode dan mencegah bug yang berkaitan dengan akses dan modifikasi data.

#### Persiapan Chapter Berikutnya

Berikutnya kita membuat program mengambil keputusan dan mengulang proses pada setiap record menggunakan control flow.

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
<p>Setiap program Python — dari skrip sederhana hingga pipeline AI — bekerja dengan menyimpan, membaca, dan mengubah informasi. Tanpa pemahaman tentang bagaimana data disimpan dan apa operasi yang valid untuk setiap bentuk data, program akan menghasilkan error yang membingungkan atau — lebih berbahaya — hasil yang tampak benar tetapi sebenarnya salah. Misalnya menjumlahkan string "80" dan "70" menghasilkan "8070", bukan 150. Pemula sering mengira ini bug Python, padahal ini masalah pemilihan tipe data. Bab ini membangun fondasi yang membuat seluruh kode selanjutnya dapat diprediksi dan dipercaya.</p>
<h2>Hubungan dengan AI</h2>
<p>Dalam workflow AI, hampir setiap titik menyentuh tipe data yang berbeda. Prompt yang dikirim ke LLM adalah string. Skor evaluasi model adalah float. Jumlah baris dataset adalah integer. Status validasi — apakah data sudah siap diproses — adalah boolean. Ketika pipeline menerima input dari file atau API, tipe data sering datang dalam bentuk yang tidak terduga: angka terbaca sebagai string, nilai kosong menjadi None, atau kolom yang seharusnya numerik berisi teks. Memeriksa dan mengonversi tipe data di setiap tahap adalah keterampilan yang menyelamatkan waktu debugging berjam-jam.</p>
<h2>Analogi</h2>
<p>Variabel seperti wadah penyimpanan di dapur. Label pada wadah — misalnya <code>participant_name</code> atau <code>max_score</code> — memberi tahu isinya tanpa harus membuka tutup. Jenis wadah juga penting: toples kaca (string) cocok untuk label, kotak plastik (integer) untuk jumlah, dan timbangan (float) untuk berat. Menaruh bahan basah di wadah tepung akan merusak keduanya — sama seperti menyimpan skor sebagai string akan membuat operasi matematika gagal atau memberikan hasil yang menyesatkan. Memilih wadah dan label yang tepat sejak awal adalah tanda dapur yang terorganisir, bukan sekadar kebiasaan rapi.</p>
<h2>Penjelasan Konsep</h2>
<p>Python adalah bahasa yang <em>dynamically typed</em>, artinya kita tidak perlu mendeklarasikan tipe data secara eksplisit — interpreter akan mengenali jenis nilai yang disimpan. Namun kemudahan ini bukan alasan untuk mengabaikan tipe data. Memahami tipe data berarti kita tahu operasi apa yang aman dilakukan dan konsekuensi dari setiap operasi tersebut.</p>
<p><strong>str (string)</strong> menyimpan teks — nama peserta, prompt ke model AI, atau path ke file dataset. String bisa digabung dengan operator +, dipecah menjadi potongan kecil dengan <code>.split()</code>, dan diformat ulang dengan f-string. Operasi matematika seperti pembagian tidak berlaku untuk string; ekspresi <code>"100" / 2</code> akan menghasilkan TypeError. Jika kamu menemukan angka yang sebenarnya adalah teks — misalnya dari file CSV — kamu harus mengonversinya terlebih dahulu menggunakan <code>int()</code> atau <code>float()</code>.</p>
<p><strong>int (integer)</strong> menyimpan bilangan bulat seperti jumlah baris, jumlah peserta, atau jumlah epoch dalam pelatihan model. Integer mendukung penjumlahan, pengurangan, perkalian, dan pembagian. Namun perlu diingat: operator pembagian <code>/</code> selalu menghasilkan float meskipun hasilnya bilangan bulat. Jika kamu menginginkan hasil bagi yang dibulatkan ke bawah, gunakan operator <code>//</code>.</p>
<p><strong>float</strong> menyimpan bilangan desimal yang mewakili ukuran kontinu — skor 87.5, temperatur 0.7, atau persentase missing value 0.05. Float memiliki keterbatasan presisi karena representasi biner di memori, sehingga operasi seperti <code>0.1 + 0.2</code> menghasilkan <code>0.30000000000000004</code>. Ini bukan bug Python, melainkan karakteristik komputasi numerik yang perlu dipahami ketika membandingkan nilai float.</p>
<p><strong>bool (boolean)</strong> hanya memiliki dua nilai: <code>True</code> atau <code>False</code>. Boolean sering muncul sebagai hasil perbandingan — <code>score >= 75</code> menghasilkan True atau False — dan digunakan untuk mengontrol alur program dengan if/else. Boolean juga berguna sebagai status: <code>is_clean = True</code>, <code>has_error = False</code>.</p>
<p><strong>None</strong> adalah tipe terpisah yang menandakan tidak ada nilai. None bukan nol, bukan string kosong, dan bukan False. Menyamakan None dengan nol adalah salah satu sumber bug paling umum dalam analisis data. Jika skor seorang peserta adalah None, itu berarti tidak ada data — bukan berarti skornya nol. Memeriksa None dengan <code>is None</code> harus dilakukan sebelum operasi numerik apa pun.</p>
<p>Python menggunakan indentasi (spasi atau tab) untuk menandai blok kode. Indentasi yang konsisten — biasanya 4 spasi — adalah bagian dari sintaks, bukan sekadar gaya penulisan. Kesalahan indentasi akan menghasilkan IndentationError dan program tidak berjalan.</p>
<h2>Visual Thinking</h2>
<pre><code class="language-text">"Jelaskan AI" → str
250            → int
87.5           → float
True           → bool
None           → NoneType
</code></pre>
<h2>Contoh Nyata</h2>
<p>Bayangkan form pendaftaran peserta. Kolom nama diisi dengan teks (string). Kolom usia diisi dengan angka (int). Kolom nilai tes bisa berisi desimal (float). Kolom persetujuan diisi dengan centang (bool). Jika data dari form disimpan dalam dictionary, setiap field memiliki tipe yang berbeda dan perlu diperlakukan sesuai operasinya masing-masing. Jika kolom nilai kosong, sistem harus menanganinya sebagai None, bukan menganggapnya nol — karena nol akan memengaruhi rata-rata kelas.</p>
<h2>Contoh AI</h2>
<p>LLM menerima prompt sebagai string dan mengembalikan respons sebagai string. Parameter seperti temperature dan max_tokens adalah float dan integer. Sebelum prompt dikirim ke model, semua parameter dikemas dalam dictionary yang nilainya memiliki tipe berbeda. Sistem yang baik memvalidasi bahwa temperature berada di rentang 0–2 sebelum dikirim, dan memeriksa bahwa respons yang diterima benar-benar string sebelum diproses lebih lanjut. Validasi tipe data di setiap gerbang ini mencegah error yang sulit dilacak.</p>
<h2>Kode Python</h2>
<pre><code class="language-python"># Metadata eksperimen sederhana
prompt = "Jelaskan AI untuk pemula"
max_words = 100
temperature = 0.3
is_reviewed = False

print(prompt)
print(type(temperature))
</code></pre>
<h2>Penjelasan Kode Baris per Baris</h2>
<ol>
<li>Comment menjelaskan konteks kode tanpa memengaruhi eksekusi.</li>
<li><code>prompt</code> menyimpan teks sebagai string.</li>
<li><code>max_words</code> menyimpan bilangan bulat sebagai integer.</li>
<li><code>temperature</code> menyimpan desimal; di sini hanya contoh metadata, bukan pembahasan LLM.</li>
<li><code>is_reviewed</code> menyimpan status boolean.</li>
<li><code>type()</code> membantu memeriksa tipe data saat debugging.</li>
</ol>
<h2>Common Mistakes</h2>
<ul>
<li><strong>Menulis angka sebagai string lalu mencoba menjumlahkannya.</strong> Jika data berasal dari form atau file CSV, angka sering terbaca sebagai string. Menjumlahkan "80" + "70" menghasilkan "8070" karena Python menggabungkan teks. Konversi dengan <code>int()</code> atau <code>float()</code> harus dilakukan sebelum operasi matematika.</li>
<li><strong>Nama variabel terlalu pendek tanpa konteks.</strong> Variabel seperti <code>x</code>, <code>y</code>, atau <code>tmp</code> tidak menjelaskan perannya. Ketika kode kembali dibaca seminggu kemudian — atau oleh anggota tim lain — nama yang bermakna seperti <code>average_score</code> atau <code>cleaned_rows</code> menyelamatkan waktu menebak-nebak.</li>
<li><strong>Menggunakan comment untuk menjelaskan kode yang sebenarnya dapat dibuat lebih jelas.</strong> Comment seharusnya menjelaskan <em>kenapa</em>, bukan <em>apa</em>. Jika kode membutuhkan comment untuk menjelaskan fungsinya, pertimbangkan untuk menulis ulang kodenya agar lebih ekspresif.</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li><strong>Gunakan <code>snake_case</code> untuk nama variabel.</strong> Python memiliki konvensi penamaan yang disepakati komunitas: huruf kecil dengan garis bawah sebagai pemisah. Konsistensi ini membuat kode lebih mudah dibaca oleh programmer Python lain.</li>
<li><strong>Pilih nama berdasarkan arti data.</strong> <code>participant_count</code> lebih informatif daripada <code>n</code>, dan <code>missing_ratio</code> lebih jelas daripada <code>r</code>. Nama yang baik adalah dokumentasi pertama untuk kode kamu.</li>
<li><strong>Periksa tipe pada batas input.</strong> Data dari file, form, atau API sering datang dalam tipe yang tidak terduga. Biasakan memeriksa dan mengonversi tipe data segera setelah data masuk, bukan saat data akan diproses.</li>
</ul>
<h2>Mini Challenge</h2>
<p>Buat variabel <code>dataset_name</code>, <code>row_count</code>, <code>missing_ratio</code>, dan <code>is_clean</code>, lalu tampilkan nilai serta tipenya.</p>
<h2>Ringkasan</h2>
<p>Tipe data adalah fondasi setiap program Python. String, integer, float, boolean, dan None masing-masing memiliki aturan dan operasi yang berbeda. Memilih tipe yang tepat dan memvalidasi tipe data di titik masuk — terutama ketika data berasal dari sumber eksternal — adalah kebiasaan yang mencegah bug paling umum dalam analisis data. Dari sini kita akan membangun struktur data yang lebih kompleks menggunakan collection.</p>
<h2>Persiapan Chapter Berikutnya</h2>
<p>Satu nilai belum cukup untuk dataset. Berikutnya kita menyimpan banyak nilai dan metadata dalam collection.</p>
<hr>
<h1>Chapter 5 — Collection: Wadah Data</h1>
<h2>Learning Objectives</h2>
<ul>
<li>Menggunakan list, tuple, dictionary, dan set.</li>
<li>Memilih collection berdasarkan kebutuhan.</li>
<li>Memodelkan baris dataset dan payload JSON sederhana.</li>
</ul>
<h2>Kenapa Materi Ini Penting?</h2>
<p>Data di dunia nyata hampir tidak pernah berdiri sendiri. Satu peserta memiliki nama, skor, track, dan metadata lain; seribu peserta berarti seribu kumpulan field yang perlu disimpan, diakses, dan diproses. Collection adalah alat untuk mengatur banyak data dalam satu struktur yang terprediksi. Tanpa collection, kita harus membuat variabel terpisah untuk setiap record — pendekatan yang jelas tidak mungkin untuk dataset realistis. Memilih collection yang tepat — apakah list, dictionary, set, atau tuple — menentukan seberapa mudah data dapat diakses, diubah, dan dianalisis.</p>
<h2>Hubungan dengan AI</h2>
<p>Dalam workflow AI, list sering digunakan untuk menyimpan urutan record dataset. Dictionary merepresentasikan satu record — mirip dengan object JSON yang dikirim dan diterima oleh API AI. Set berguna untuk menghimpun kategori unik dari ribuan entri, misalnya semua track yang tersedia dalam program fellowship. Tuple cocok untuk pasangan nilai yang strukturnya tetap, seperti koordinat atau rentang nilai minimum-maksimum. Memahami collection berarti memahami bagaimana data mengalir antara Python, file, dan layanan eksternal.</p>
<h2>Analogi</h2>
<p>List seperti antrean di kasir: orang datang dan pergi, urutannya terjaga, dan kita bisa menambah atau menghapus orang dari antrean. Tuple seperti koordinat GPS: sekali ditulis (lintang, bujur), tidak berubah. Dictionary seperti kartu identitas: setiap label (NIK, nama, alamat) memiliki satu nilai, dan kita mencari berdasarkan label, bukan berdasarkan nomor urut. Set seperti daftar tamu undangan: setiap nama hanya muncul sekali, tidak ada duplikasi, dan urutan tidak penting. Memilih struktur yang tepat sejak awal sama pentingnya dengan memilih wadah yang tepat untuk menyimpan bahan makanan — wadah yang salah akan membuat isinya tumpah atau sulit diambil.</p>
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
<p><strong>List</strong> adalah collection paling serbaguna. Ia menjaga urutan penyisipan, dapat diubah (ditambah, dihapus, diubah elemennya), dan mengizinkan duplikasi. Gunakan list ketika urutan berarti — misalnya daftar peserta sesuai urutan pendaftaran — atau ketika data akan diakses berdasarkan posisi (indeks). List juga cocok untuk menampung kumpulan record yang akan diproses dalam loop.</p>
<p><strong>Tuple</strong> mirip dengan list tetapi tidak dapat diubah setelah dibuat. Sifat immutability ini membuat tuple aman digunakan sebagai key dalam dictionary atau ketika struktur data harus tetap konstan — misalnya koordinat (lat, lon) atau pasangan (nama_kolom, tipe_data). Tuple juga lebih ringan secara memori dibandingkan list.</p>
<p><strong>Dictionary</strong> menyimpan pasangan key-value. Key harus unik dan immutable (biasanya string atau tuple), sedangkan value bisa berupa tipe apa pun — termasuk list atau dictionary lain. Dictionary sangat cocok untuk merepresentasikan satu record dengan field bernama model, mirip dengan object JSON. Mengakses nilai dengan <code>dict["key"]</code> lebih cepat daripada mencari dalam list, tetapi key harus dieja dengan tepat.</p>
<p><strong>Set</strong> menyimpan nilai unik tanpa urutan tertentu. Operasi utama set adalah membership test ("apakah nilai ini ada?") dan operasi himpunan seperti gabungan, irisan, dan selisih. Set berguna untuk menghapus duplikat dari list atau mencari nilai yang muncul di dua kumpulan data berbeda. Namun set tidak dapat diakses berdasarkan indeks dan tidak dapat menyimpan nilai yang sama dua kali.</p>
<p>Collection dapat bersarang — misalnya list yang berisi dictionary, atau dictionary yang value-nya adalah list. Struktur bersarang ini adalah fondasi dari data tabular di Python dan akan sering ditemui saat bekerja dengan file JSON atau Pandas DataFrame.</p>
<h2>Visual Thinking</h2>
<pre><code class="language-text">participant = {
  "name": "Ayu",
  "scores": [80, 90, 85],
  "location": ("Jakarta", "ID")
}
</code></pre>
<h2>Contoh Nyata</h2>
<p>Seorang peserta memiliki nama (string) dan beberapa nilai (list of float). Banyak peserta menjadi list yang berisi dictionary — ini adalah struktur yang sama dengan data tabular. Jika kita ingin mengambil semua track unik dari ratusan peserta, set memberikan hasil instan tanpa perlu menulis loop manual. Jika data peserta perlu dikirim ke API, dictionary dapat langsung dikonversi menjadi JSON tanpa perubahan struktur.</p>
<h2>Contoh AI</h2>
<p>Respons dari API model AI hampir selalu berbentuk dictionary bersarang. Misalnya respons LLM dapat berisi key <code>"choices"</code> yang value-nya adalah list, dan setiap elemen list adalah dictionary dengan key <code>"message"</code> dan <code>"finish_reason"</code>. Memahami cara mengakses data bertingkat ini — <code>response["choices"][0]["message"]["content"]</code> — adalah keterampilan dasar yang akan dipakai terus menerus saat mengintegrasikan Python dengan layanan AI.</p>
<h2>Kode Python</h2>
<pre><code class="language-python">participants = [
    {"name": "Ayu", "score": 88, "track": "data"},
    {"name": "Nisa", "score": 91, "track": "data"},
]

tracks = {item["track"] for item in participants}
print(participants[0]["name"])
print(tracks)
</code></pre>
<h2>Penjelasan Kode Baris per Baris</h2>
<ol>
<li><code>participants</code> adalah list yang menyimpan dua record.</li>
<li>Setiap item dalam list adalah dictionary dengan schema yang sama: name, score, track.</li>
<li>Set comprehension <code>{item["track"] for item in participants}</code> mengambil track unik — dalam contoh ini hanya "data" — tanpa perlu loop manual.</li>
<li>Index <code>0</code> memilih peserta pertama dari list; key <code>["name"]</code> memilih field nama dari dictionary tersebut.</li>
<li>Set track ditampilkan — perhatikan bahwa meskipun "data" muncul dua kali, set hanya menyimpannya sekali.</li>
</ol>
<h2>Common Mistakes</h2>
<ul>
<li><strong>Mengakses index yang tidak ada.</strong> List dengan 3 elemen hanya memiliki index 0, 1, dan 2. Mengakses index 3 menghasilkan IndexError. Selalu periksa panjang list dengan <code>len()</code> sebelum mengakses index yang tidak pasti.</li>
<li><strong>Mengakses key yang salah eja.</strong> Dictionary mengandalkan kecocokan persis nama key. <code>participant["name"]</code> berbeda dengan <code>participant["nama"]</code>. Satu huruf yang salah eja menghasilkan KeyError. Gunakan <code>.get()</code> jika key boleh tidak ada.</li>
<li><strong>Mengubah list saat sedang di-loop tanpa rencana.</strong> Menghapus elemen dari list yang sedang di-loop dapat menyebabkan elemen terlewat atau error. Jika perlu memfilter, buat list baru daripada menghapus dari list yang sedang diproses.</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li><strong>Gunakan struktur konsisten untuk setiap record.</strong> Jika satu record memiliki key "name", semua record lain juga harus memiliki key "name". Inkonsistensi schema adalah sumber bug yang sulit dilacak.</li>
<li><strong>Pakai <code>.get()</code> jika key boleh tidak tersedia.</strong> <code>participant.get("score", 0)</code> mengembalikan 0 sebagai default jika key "score" tidak ada, tanpa melempar KeyError. Nilai default harus dipilih dengan hati-hati — jangan asumsi nol selalu aman.</li>
<li><strong>Jangan memakai set ketika urutan atau duplikat bermakna.</strong> Set tidak menjamin urutan dan menghapus duplikat secara otomatis. Jika urutan penyisipan penting atau duplikat memiliki arti — misalnya peserta dapat mengikuti beberapa track — set bukan pilihan yang tepat.</li>
</ul>
<h2>Mini Challenge</h2>
<p>Tambahkan satu peserta, ambil semua nilai menjadi list baru, dan tampilkan track unik.</p>
<h2>Ringkasan</h2>
<p>List, tuple, dictionary, dan set masing-masing memiliki karakteristik yang membuatnya cocok untuk tugas tertentu. List untuk urutan yang dapat berubah, tuple untuk struktur tetap, dictionary untuk data bernama, dan set untuk keunikan. Collection dapat bersarang membentuk struktur data kompleks yang mendekati data dunia nyata. Pemilihan collection yang tepat sejak awal mengurangi kerumitan kode dan mencegah bug yang berkaitan dengan akses dan modifikasi data.</p>
<h2>Persiapan Chapter Berikutnya</h2>
<p>Berikutnya kita membuat program mengambil keputusan dan mengulang proses pada setiap record menggunakan control flow.</p>
<hr>

````
