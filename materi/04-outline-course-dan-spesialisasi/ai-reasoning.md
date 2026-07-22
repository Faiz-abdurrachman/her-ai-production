# Cara AI Menalar, Merencanakan, dan Menggunakan Tools

> Route sumber: `/participant-ai-reasoning`
> Status sumber: **Scaffold aktif dengan konten diperkaya**

- **title:** Reasoning
- **displayTitle:** Cara AI Menalar, Merencanakan, dan Menggunakan Tools
- **category:** Foundation & Core AI
- **parentCourse:** AI Fundamentals & Advanced
- **icon:** fas fa-code-branch
- **status:** Scaffold aktif dengan konten diperkaya
- **moduleStatus:** Submateri scaffold
- **duration:** 90-120 menit
- **level:** Fundamental
- **contentProgress:** 100
- **progressTitle:** Status Konten
- **progressCopy:** Konten pembelajaran scaffold lengkap. Review mentor tetap diperlukan sebelum menjadi final canonical.
- **unitLabel:** submateri
- **actionLabel:** Buka submateri
- **sectionLabel:** Bagian pembelajaran
- **sectionTitle:** Empat submateri Reasoning
- **detailLabel:** Submateri Reasoning
### activityTitles

- **materi:** Materi scaffold Reasoning diperkaya
- **latihan:** Latihan scaffold Reasoning siap digunakan
- **kuis:** Kuis scaffold Reasoning dengan pembahasan
- **diskusi:** Panduan diskusi scaffold Reasoning

- **summary:** Pelajari bagaimana AI mengolah masalah, menyusun rencana, menghasilkan langkah penyelesaian, dan menggunakan alat eksternal untuk memperoleh jawaban yang lebih akurat.
### overviewHtml

**

Tujuan pembelajaran

##### Setelah menyelesaikan materi, peserta mampu:

1.  Menjelaskan reasoning dalam konteks AI tanpa menyamakannya dengan pikiran manusia.
2.  Menjelaskan bagaimana LLM memanfaatkan token dan konteks untuk menghasilkan respons.
3.  Membedakan reasoning, planning, action, observation, update, dan answer.
4.  Mengidentifikasi informasi relevan, batasan, informasi yang hilang, dan asumsi.
5.  Memecah masalah besar menjadi subtugas yang dapat dikerjakan dan diperiksa.
6.  Menyusun serta membedakan rencana statis dan dinamis.
7.  Menjelaskan fungsi Chain-of-Thought dan langkah penyelesaian terstruktur.
8.  Memahami bahwa penjelasan langkah bukan akses penuh ke proses internal model.
9.  Menentukan kapan tool eksternal diperlukan dan kapan tidak diperlukan.
10. Memilih tool yang sesuai berdasarkan tujuan, data, presisi, dan izin.
11. Memeriksa observation dan output tool sebelum menggunakannya.
12. Menilai apakah jawaban AI cukup dapat dipercaya untuk konteks tugas.

**

Gambaran besar

##### Satu alur, enam tahap yang saling terhubung

**Reason**Memahami masalah dan informasi

**

**Plan**Menentukan langkah

**

**Act**Menjawab atau memakai tool

**

**Observe**Membaca hasil tindakan

**

**Update**Memperbaiki rencana

**

**Answer**Memberikan hasil akhir

Studi kasus terpadu

##### Apakah anggaran konsumsi cukup?

**Tugas:** Berdasarkan data peserta di spreadsheet, tentukan apakah anggaran Rp5.000.000 cukup untuk konsumsi Rp32.000 per peserta dan transportasi Rp450.000.

Reason  
Jumlah peserta belum diketahui; data peserta berada di spreadsheet dan perlu divalidasi.

Plan  
Baca data, cari duplikasi, hitung peserta valid, hitung konsumsi dan transportasi, lalu bandingkan dengan anggaran.

Act  
Gunakan spreadsheet atau Python untuk membaca dan menghitung data.

Observe  
Tool menemukan 130 baris, lima data ganda, dan 125 peserta valid.

Update  
Gunakan 125 peserta: konsumsi Rp4.000.000, total Rp4.450.000, dan sisa Rp550.000.

Answer  
Anggaran cukup dengan sisa Rp550.000; jelaskan bahwa lima data ganda tidak dihitung.

##### ** Checklist sebelum memberi jawaban

-   Tujuan dipahami dengan benar.
-   Informasi relevan sudah digunakan.
-   Informasi yang hilang dikenali.
-   Asumsi sudah disebutkan.
-   Masalah dipecah menjadi langkah.
-   Urutan langkah masuk akal.
-   Tool dipilih dengan tepat.
-   Parameter tool sesuai.
-   Output tool sudah diperiksa.
-   Rencana diperbarui bila diperlukan.
-   Jawaban akhir menjelaskan hasil.
-   Ketidakpastian atau keterbatasan disebutkan.

##### Referensi Singkat

1.  Wang, L., dkk. (2023). [Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models **](https://arxiv.org/abs/2305.04091). arXiv:2305.04091.
2.  Wei, J., dkk. (2022). [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models **](https://arxiv.org/abs/2201.11903). arXiv:2201.11903.
3.  Kojima, T., dkk. (2022). [Large Language Models are Zero-Shot Reasoners **](https://arxiv.org/abs/2205.11916). arXiv:2205.11916.
4.  Schick, T., dkk. (2023). [Toolformer: Language Models Can Teach Themselves to Use Tools **](https://arxiv.org/abs/2302.04761). arXiv:2302.04761.
5.  Yao, S., dkk. (2022). [ReAct: Synergizing Reasoning and Acting in Language Models **](https://arxiv.org/abs/2210.03629). arXiv:2210.03629.
6.  Mialon, G., dkk. (2023). [Augmented Language Models: a Survey **](https://arxiv.org/abs/2302.07842). arXiv:2302.07842.

### modules

### Bagaimana AI Melakukan Penalaran?

- **slug:** how-ai-reasons
- **title:** Bagaimana AI Melakukan Penalaran?
- **summary:** Memahami bagaimana AI menghubungkan instruksi, konteks, informasi yang tersedia, dan hasil sebelumnya untuk menentukan respons berikutnya.
- **duration:** 25-30 menit
#### learningObjectives

- Menjelaskan reasoning sebagai perilaku pemecahan masalah pada LLM, bukan pikiran manusia.
- Memisahkan fakta, asumsi, langkah, dan kesimpulan.
- Menyusun serta memeriksa urutan reasoning untuk kasus numerik dan nonnumerik.

#### references

- [3]
- [6]

- **materi:** Model mental reasoning AI: memahami tujuan, memilih informasi relevan, menentukan langkah, menjalankan langkah, memeriksa hasil, lalu menjawab.
- **latihan:** Empat latihan untuk memilah fakta dan asumsi, mengurutkan langkah, memperbaiki perhitungan, serta menentukan prioritas.
- **kuis:** Enam soal interaktif tentang reasoning AI, konteks LLM, fakta dan asumsi, urutan langkah, pemeriksaan, dan keterbatasan jawaban.
- **diskusi:** Bahas apakah jawaban yang runtut berarti AI benar-benar memahami masalah.
#### rich

##### materi

Seorang peserta meminta AI menghitung kebutuhan konsumsi acara. AI menerima jumlah peserta, harga makanan, anggaran, dan beberapa informasi tambahan. Sebelum menjawab, sistem perlu menentukan data mana yang penting, operasi apa yang diperlukan, serta bagaimana memastikan hasilnya masuk akal.

Kemampuan menjawab pertanyaan sederhana tidak sama dengan menyelesaikan masalah bertahap. Menjawab "Apa ibu kota Indonesia?" terutama membutuhkan recall atau pengambilan informasi yang dikenali. Menghitung anggaran, menyusun prioritas bug, atau memberi rekomendasi membutuhkan hubungan antara beberapa informasi, batasan, dan tujuan.

Recall

##### Mengambil informasi

Menghasilkan fakta atau pola yang sudah dikenali dari konteks dan data pelatihan. Biasanya tidak memerlukan banyak langkah.

Reasoning

##### Menghubungkan informasi

Mengolah beberapa fakta dan batasan untuk membentuk kesimpulan, keputusan, urutan tindakan, atau jawaban baru.

**

**Istilah praktis, bukan klaim kesadaran.** Dalam konteks LLM, reasoning menggambarkan kemampuan model memakai konteks, pola, langkah perantara, dan hasil sebelumnya untuk menghasilkan respons sesuai tugas. Istilah ini tidak berarti model memiliki pikiran atau pemahaman biologis seperti manusia.

Apa yang dilakukan LLM?

##### Dari token menuju respons

LLM menerima prompt sebagai rangkaian token, yaitu potongan teks yang dapat berupa kata, bagian kata, atau simbol. Model membentuk representasi hubungan antartoken dalam konteks, lalu memprediksi token berikutnya. Prediksi itu diulang sampai respons selesai.

1.  Menerima token dari prompt dan konteks.
2.  Membentuk representasi hubungan antarbagian informasi.
3.  Memperkirakan token berikutnya berdasarkan pola yang dipelajari.
4.  Mengulangi prediksi sampai respons selesai.
5.  Pada tugas tertentu, menghasilkan langkah perantara yang membantu penyelesaian.
6.  Jika sistem mendukung tool, memasukkan observation dari tool sebagai konteks tambahan.

LLM tetap bekerja melalui prediksi token. Namun rangkaian prediksi itu dapat menghasilkan perilaku yang tampak seperti klasifikasi, perhitungan bertahap, perencanaan, atau diagnosis awal. Penelitian zero-shot reasoning menunjukkan bahwa instruksi untuk bekerja bertahap dapat meningkatkan hasil pada sejumlah tugas yang diuji, tetapi tidak menghilangkan kesalahan [3].

**1. Permintaan**Kenali tugas dan format

**

**2. Tujuan**Tentukan hasil akhir

**

**3. Informasi**Pilih fakta relevan

**

**4. Celah**Kenali data yang hilang

**

**5. Hubungan**Sambungkan informasi

**

**6. Langkah**Susun urutan

**

**7. Hasil**Kerjakan penyelesaian

**

**8. Periksa**Validasi jawaban

Membaca permintaan

##### Tujuan, format, dan batasan harus dipisahkan

Pada permintaan "Buat jadwal belajar AI selama satu minggu, maksimal dua jam per hari, dengan fokus machine learning", tujuan bukan sekadar membuat jadwal. Ada durasi satu minggu, batas dua jam per hari, dan fokus materi tertentu. Jika tingkat kemampuan peserta belum diketahui, AI dapat meminta klarifikasi, memberi beberapa opsi, atau membuat asumsi secara transparan.

Informasi yang tersedia adalah jumlah hari, batas waktu, dan topik. Informasi yang belum tersedia mencakup tingkat kemampuan, waktu belajar yang disukai, serta bentuk evaluasi. Mengakui celah informasi lebih aman daripada mengarang detail.

Contoh anggaran

##### Menghitung konsumsi kegiatan

Anggaran Rp3.000.000, peserta 60 orang, konsumsi Rp35.000 per orang, dan biaya administrasi Rp250.000.

`60 x Rp35.000 = Rp2.100.000``Rp2.100.000 + Rp250.000 = Rp2.350.000``Rp3.000.000 - Rp2.350.000 = Rp650.000`

Kesimpulan: anggaran mencukupi dengan sisa Rp650.000. Jawaban perlu menyebut biaya administrasi; melewatkannya menghasilkan sisa yang salah meskipun perkalian konsumsi benar.

Contoh nonnumerik

##### Menentukan prioritas pekerjaan

Tim memiliki tiga pekerjaan: memperbaiki bug login, mengganti ikon, dan menambah animasi. Bug login membuat pengguna tidak dapat masuk. Reasoning menghubungkan dampak, urgensi, dependensi, dan risiko.

1.  Perbaiki bug login karena memblokir fungsi utama.
2.  Uji autentikasi agar perbaikan stabil.
3.  Ganti ikon setelah akses pengguna pulih.
4.  Tambahkan animasi setelah fungsi utama aman.

Reasoning tidak hanya dipakai untuk angka. Pola yang sama mendukung prioritas, klasifikasi, perbandingan, rekomendasi, dan diagnosis awal.

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Elemen
Arti
Contoh</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Fakta
Informasi yang diberikan atau diverifikasi
Peserta berjumlah 60</td>
<td align="left">Asumsi
Informasi yang dianggap benar agar proses dapat dilanjutkan
Semua peserta mendapat konsumsi</td>
<td align="left">Langkah
Proses mengolah informasi
Mengalikan peserta dengan biaya</td>
</tr>
</tbody>
</table>

**

**Contoh buruk:** "Anggaran pasti cukup karena kegiatan sebelumnya juga cukup." Pengalaman lama bukan bukti jika jumlah peserta, harga, atau komponen biaya berubah.

Kapan digunakan?

##### Tugas yang membutuhkan hubungan

Gunakan reasoning terstruktur untuk masalah multi-langkah, perhitungan, prioritas, perbandingan, diagnosis awal, rekomendasi, atau tugas dengan beberapa batasan.

Kapan tidak diperlukan?

##### Tugas sederhana dan langsung

Jawaban fakta sederhana, salam, perubahan format teks, atau instruksi satu langkah sering tidak membutuhkan uraian panjang. Struktur berlebihan dapat memperlambat dan membingungkan.

Kesalahan umum

##### Bahasa percaya diri dapat menyembunyikan masalah

1.  Salah memahami tujuan pengguna.
2.  Mengabaikan format atau batasan.
3.  Menggunakan informasi yang tidak relevan.
4.  Membuat asumsi tersembunyi.
5.  Mengarang fakta yang tidak tersedia.
6.  Menjalankan langkah dalam urutan yang salah.
7.  Salah menghitung atau mencampur satuan.
8.  Tidak memeriksa hasil.
9.  Memberi keyakinan terlalu tinggi.
10. Menghasilkan penjelasan meyakinkan tetapi tidak valid.

**

**Penjelasan yang terdengar meyakinkan bukan bukti bahwa jawabannya benar.** Jawaban tetap dapat salah karena pertanyaan disalahpahami, informasi tidak relevan dipakai, asumsi tidak disebutkan, langkah terlewat, atau perhitungan keliru.

##### ** Cara memeriksa reasoning AI

-   Apakah AI menjawab pertanyaan yang benar?
-   Apakah informasi yang dipakai tersedia?
-   Apakah asumsi disebutkan?
-   Apakah urutan langkah masuk akal?
-   Apakah perhitungan dapat diulang?
-   Apakah kesimpulan mengikuti data?
-   Apakah alternatif penting dipertimbangkan?
-   Apakah tingkat keyakinannya sesuai?

Ketika informasi belum lengkap

##### Jangan menutup celah dengan tebakan tersembunyi

AI memiliki beberapa pilihan yang lebih aman. Sistem dapat meminta klarifikasi jika data menentukan hasil, menawarkan beberapa skenario jika ada nilai yang masuk akal, menyebutkan asumsi secara eksplisit, atau memberikan solusi sementara dengan batasan. Contohnya, jika jumlah peserta belum pasti, jawaban dapat menampilkan rumus biaya per peserta dan dua skenario kehadiran. Pengguna kemudian mengetahui bagian mana yang faktual dan bagian mana yang masih menunggu konfirmasi.

##### ** Ringkasan poin penting

Reasoning pada LLM adalah perilaku menghubungkan konteks, informasi, dan langkah untuk menyelesaikan tugas. Kualitasnya bergantung pada pemahaman tujuan, data yang benar, asumsi transparan, urutan yang masuk akal, serta pemeriksaan hasil. Reasoning membantu, tetapi tidak membuat AI otomatis benar.

Kojima dkk. melaporkan peningkatan pada beberapa benchmark reasoning melalui instruksi langkah bertahap pada model yang diuji [3]. Kajian augmented language models juga menempatkan reasoning sebagai salah satu cara memperluas kemampuan model bersama tool dan retrieval [6].

##### latihan

Latihan 1

##### Pisahkan fakta, asumsi, dan kesimpulan

Acara memiliki anggaran Rp4.000.000 dan 75 pendaftar. Panitia memperkirakan semua pendaftar hadir dan menyimpulkan konsumsi Rp40.000 per orang pasti cukup.

Tandai fakta, asumsi, dan kesimpulan. Sebutkan data apa yang masih dibutuhkan.

** Lihat pembahasan

**Pembahasan**

**Fakta:** anggaran dan jumlah pendaftar. **Asumsi:** semua pendaftar hadir. **Kesimpulan:** konsumsi pasti cukup. Harga konsumsi, biaya lain, dan jumlah peserta terkonfirmasi masih dibutuhkan.

Latihan 2

##### Urutkan langkah perhitungan

Urutkan: menghitung sisa; memeriksa komponen biaya; mengalikan peserta dengan biaya konsumsi; membaca anggaran; menjumlahkan seluruh kebutuhan.

** Lihat pembahasan

**Pembahasan**

1.  Baca anggaran dan data peserta.
2.  Periksa seluruh komponen biaya.
3.  Hitung konsumsi.
4.  Jumlahkan kebutuhan.
5.  Hitung sisa dan periksa hasil.

Latihan 3

##### Temukan komponen yang hilang

AI menghitung 60 x Rp35.000 = Rp2.100.000 dan menyatakan sisa dari Rp3.000.000 adalah Rp900.000. Prompt juga menyebut biaya administrasi Rp250.000. Perbaiki jawaban.

** Lihat pembahasan

**Pembahasan**

Total kebutuhan adalah Rp2.350.000 setelah administrasi ditambahkan. Sisa yang benar Rp650.000. Kesalahan terjadi karena satu fakta relevan dilewatkan.

Latihan 4

##### Reasoning nonnumerik

Urutkan prioritas: memperbaiki login yang gagal, mengganti ikon, dan menambah animasi. Jelaskan alasan menggunakan dampak, urgensi, dependensi, dan risiko.

** Lihat pembahasan

**Pembahasan**

Perbaiki dan uji login terlebih dahulu karena memblokir akses. Ikon dapat dikerjakan setelah fungsi pulih. Animasi terakhir karena nilainya tidak mengatasi masalah utama dan dapat menambah risiko perubahan.

##### kuis

##### 1Apa arti reasoning dalam konteks sistem AI?

**A**AI memiliki kesadaran seperti manusia**B**Proses menghubungkan tujuan, konteks, informasi, dan langkah untuk menghasilkan respons**C**Kemampuan menghafal semua jawaban**D**Proses menjalankan tool tanpa tujuan

** Periksa jawaban

##### 2Manakah yang termasuk asumsi, bukan fakta?

**A**Anggaran tertulis Rp3.000.000**B**Jumlah peserta pada daftar adalah 60**C**Semua peserta pasti hadir**D**Harga konsumsi tertulis Rp35.000

** Periksa jawaban

##### 3Apa fungsi utama tahap pemeriksaan?

**A**Membuat jawaban lebih panjang**B**Memastikan data, langkah, dan kesimpulan saling sesuai**C**Menghilangkan semua asumsi**D**Mengganti tujuan pengguna

** Periksa jawaban

##### 4AI diminta membuat jadwal tujuh hari maksimal dua jam per hari. Langkah pertama yang paling tepat adalah...

**A**Langsung membuat 14 jam materi tanpa pembagian**B**Mengabaikan batas dua jam agar topik lebih lengkap**C**Mengenali tujuan, durasi, batas harian, dan fokus materi**D**Memilih tool kalender tanpa memeriksa kebutuhan

** Periksa jawaban

##### 5Dalam kasus anggaran, mengapa biaya administrasi harus dimasukkan?

**A**Karena semua angka di prompt selalu harus dikalikan**B**Karena biaya tersebut relevan terhadap total kebutuhan**C**Agar jawaban terlihat lebih panjang**D**Karena administrasi selalu lebih mahal dari konsumsi

** Periksa jawaban

##### 6Mengapa jawaban yang terlihat runtut belum tentu benar?

**A**Karena semua langkah perantara selalu palsu**B**Karena AI tidak boleh menghitung**C**Karena langkah dapat memakai asumsi atau data yang salah**D**Karena jawaban singkat selalu lebih akurat

** Periksa jawaban

##### diskusi

**

Topik diskusi

##### Apakah AI yang menghasilkan jawaban runtut dapat dikatakan benar-benar memahami masalah?

Jawaban runtut memudahkan pemeriksaan, tetapi tidak otomatis membuktikan pemahaman atau kebenaran.

Gunakan pertanyaan berikut untuk menjaga diskusi tetap terarah:

-   Apa perbedaan jawaban benar dan proses yang benar?
-   Dapatkah AI memperoleh jawaban benar secara kebetulan?
-   Mengapa bahasa yang meyakinkan dapat berbahaya?
-   Kapan hasil AI harus diperiksa manusia?
-   Apakah semua asumsi AI perlu ditampilkan?

**Refleksi pribadi**

Ceritakan satu pengalaman ketika jawaban AI terdengar meyakinkan tetapi ternyata salah atau tidak lengkap.

**Tanggapi peserta lain**

Pilih satu pendapat peserta lain, lalu ajukan satu pertanyaan kritis tentang bukti, asumsi, atau cara verifikasinya.



### Planning dan Problem Decomposition

- **slug:** planning-and-decomposition
- **title:** Planning dan Problem Decomposition
- **summary:** Memahami cara AI mengubah tujuan besar menjadi subtugas, menyusun urutan tindakan, dan memperbarui rencana saat kondisi berubah.
- **duration:** 25-30 menit
#### learningObjectives

- Membedakan reasoning, planning, dan problem decomposition.
- Menyusun goal, initial state, constraints, actions, dependencies, dan success criteria.
- Membandingkan rencana statis, dinamis, dan hierarkis serta memeriksa kualitasnya.

#### references

- [1]

- **materi:** Bedakan reasoning dan planning, lalu gunakan goal, initial state, constraints, subtasks, sequence, serta success criteria untuk menyusun rencana.
- **latihan:** Empat latihan untuk membangun, mengurutkan, menilai, dan memperbarui rencana workshop.
- **kuis:** Enam soal interaktif tentang komponen planning, decomposition, dependencies, success criteria, serta rencana statis dan dinamis.
- **diskusi:** Bahas kapan AI harus mempertahankan atau memperbarui rencana awal.
#### rich

##### materi

Permintaan "buat workshop AI" terlalu besar untuk dikerjakan sebagai satu tindakan. Sistem perlu memecahnya menjadi profil peserta, tujuan belajar, materi, jadwal, fasilitas, latihan, evaluasi, dan anggaran. Planning mengubah tujuan yang kabur menjadi urutan kerja yang dapat dilaksanakan.

Reasoning

Apa masalahnya, informasi apa yang penting, dan hubungan apa yang perlu dipahami?

Planning

Langkah apa yang harus dilakukan untuk mencapai tujuan?

Reasoning dan planning saling berhubungan tetapi tidak sama. Reasoning membantu memahami keadaan; planning menerjemahkan pemahaman itu menjadi tindakan. Rencana yang baik juga perlu diperiksa kembali ketika informasi berubah.

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Komponen
Pertanyaan
Contoh workshop</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Goal
Hasil akhir apa yang ingin dicapai?
Workshop AI dua jam untuk 50 pemula dengan satu praktik</td>
<td align="left">Initial state
Sumber daya apa yang tersedia?
Satu mentor, satu ruangan, satu proyektor</td>
<td align="left">Constraints
Batasan apa yang harus dipatuhi?
Durasi, kapasitas, anggaran, akses internet</td>
</tr>
</tbody>
</table>

Goal yang dapat diperiksa

##### Dari "workshop bagus" menjadi target terukur

Goal "membuat workshop bagus" sulit diperiksa karena kata bagus tidak memiliki ukuran. Goal yang lebih berguna adalah "membuat workshop pengenalan AI selama dua jam untuk 50 peserta pemula dengan satu sesi praktik". Goal itu memberi durasi, audiens, dan hasil yang dapat diuji.

Initial state mencatat kondisi awal seperti jumlah mentor, fasilitas, data peserta, waktu, dan kemampuan tim. Constraints bukan gangguan yang boleh diabaikan; batasan menentukan bentuk rencana yang realistis.

**Tujuan besar**Nyatakan hasil akhir

**

**Pecah**Buat subtugas

**

**Hubungkan**Catat dependency

**

**Urutkan**Susun sequence

**

**Periksa**Uji batas dan kriteria

Contoh dekomposisi

##### Workshop pengenalan AI selama dua jam untuk 50 mahasiswa

1.  Kenali profil peserta.
2.  Tentukan tujuan pembelajaran.
3.  Pilih materi inti.
4.  Bagi durasi sesi.
5.  Tentukan kebutuhan perangkat.
6.  Siapkan latihan.
7.  Siapkan evaluasi.
8.  Periksa kesesuaian waktu dan sumber daya.

Subtugas berkualitas

##### Cukup kecil untuk dikerjakan, cukup besar untuk bermakna

Subtugas yang baik memiliki tujuan, input, output, dan kondisi selesai. "Kerjakan workshop" masih terlalu besar. Sebaliknya, "ubah warna satu kata pada slide 12" terlalu kecil untuk level rencana utama. Pecah pekerjaan sampai setiap bagian dapat diberikan kepada orang atau tool, diurutkan, dan diperiksa hasilnya.

Dependency menentukan urutan. Materi harus selesai sebelum slide dibuat. Data peserta harus tersedia sebelum kelompok dibagi. Jika dependency dilanggar, tim berisiko mengulang pekerjaan.

Hierarchical planning

##### Rencana dapat memiliki beberapa tingkat

**Tujuan utama:** Menyelenggarakan workshop AI

-   Persiapan materi
    -   Tentukan topik
    -   Buat contoh
    -   Buat latihan
-   Persiapan teknis
    -   Periksa ruangan
    -   Periksa proyektor
    -   Periksa internet
-   Evaluasi
    -   Buat kuis
    -   Siapkan formulir umpan balik

Hierarki membantu melihat gambaran besar tanpa kehilangan tindakan konkret. Materi ini hanya mengenalkan konsepnya; implementasi planner-executor yang otonom berada pada course Agentic AI.

Static planning

Rencana dibuat di awal lalu dijalankan tanpa perubahan: Plan -\> Step 1 -\> Step 2 -\> Step 3 -\> Result.

Dynamic planning

Setelah action dan observation, sistem menilai apakah rencana masih sesuai. Jika tidak, rencana diperbarui.

Contoh perubahan kondisi

##### Proyektor tidak tersedia selama 30 menit pertama

Observe  
Rencana awal tidak dapat dijalankan sesuai urutan.

Update  
Pindahkan diskusi tujuan dan aktivitas berbasis kertas ke awal sesi.

Check  
Pastikan total durasi tetap dua jam dan sesi demo tetap mendapat waktu.

Dynamic planning bukan berarti tujuan berubah sesuka hati. Goal dan batas otorisasi tetap dijaga; yang diperbarui adalah cara mencapainya.

Kapan digunakan?

##### Tujuan besar atau banyak dependensi

Planning berguna untuk workshop, proyek, riset, penulisan laporan, jadwal belajar, dan tugas yang memiliki urutan, sumber daya, atau risiko.

Kapan tidak diperlukan?

##### Tindakan tunggal yang jelas

Permintaan seperti "ubah judul ini menjadi huruf kapital" tidak membutuhkan rencana panjang. Planning berlebihan menambah biaya dan waktu tanpa meningkatkan hasil.

Kesalahan umum

##### Rencana dapat terlihat rapi tetapi tidak dapat dijalankan

1.  Goal terlalu kabur.
2.  Initial state tidak dicatat.
3.  Constraint diabaikan.
4.  Subtugas terlalu besar atau terlalu kecil.
5.  Dependency tidak dikenali.
6.  Tidak ada pemilik atau output langkah.
7.  Urutan tidak realistis.
8.  Tidak ada success criteria.
9.  Rencana tidak diperbarui setelah observation berubah.
10. AI mengubah tujuan atau melakukan aksi berisiko tanpa izin.

##### ** Cara memeriksa rencana AI

-   Goal spesifik dan terukur.
-   Initial state sesuai fakta.
-   Constraint tercakup.
-   Setiap subtugas punya output.
-   Dependency dan urutan masuk akal.
-   Durasi serta sumber daya realistis.
-   Success criteria dapat diuji.
-   Ada titik untuk observation dan update.

Granularitas dan ownership

##### Subtugas perlu dapat diserahkan dan ditutup

Subtugas yang berguna menjawab empat hal: siapa atau apa yang mengerjakan, input apa yang dibutuhkan, output apa yang dihasilkan, dan kapan dianggap selesai. "Siapkan materi" dapat dipecah menjadi outline, contoh, latihan, dan review. Setiap output dapat diperiksa sebelum menjadi input bagi langkah berikutnya.

Rencana juga perlu menyisakan ruang untuk risiko. Jika internet gagal, apakah latihan masih dapat berjalan? Jika mentor terlambat, siapa mengambil alih pembuka? Menambahkan checkpoint dan alternatif tidak berarti membuat arsitektur agent yang rumit; ini adalah kebiasaan dasar agar rencana manusia maupun AI lebih tahan terhadap perubahan.

Rencana yang baik juga menunjukkan prioritas. Langkah yang memblokir pekerjaan lain atau melindungi fungsi utama dikerjakan lebih dahulu. Langkah kosmetik dapat menunggu. Ketika dua tugas dapat berjalan paralel, rencana boleh membaginya selama sumber daya tersedia dan hasil keduanya tetap diperiksa sebelum digabungkan. Prioritas perlu dijelaskan agar pengguna dapat mengoreksi tradeoff yang tidak sesuai.

##### ** Ringkasan poin penting

Planning menentukan jalan dari kondisi awal menuju goal. Problem decomposition memecah jalan itu menjadi subtugas yang dapat dikerjakan dan diperiksa. Rencana berkualitas menghormati constraint, dependency, urutan, dan success criteria, serta dapat diperbarui ketika kondisi nyata berubah.

Pendekatan Plan-and-Solve memisahkan penyelesaian menjadi pembuatan rencana dan pelaksanaan subtugas berdasarkan rencana tersebut pada eksperimen yang dilaporkan [1]. Temuan ini tidak berarti semua jenis planning AI selalu lebih baik.

##### latihan

Latihan 1

##### Bangun rencana kelas

Susun kelas pengenalan AI dua jam untuk 30 peserta dengan satu mentor dan satu proyektor. Isi goal, initial state, constraints, subtasks, sequence, dan success criteria.

** Lihat pembahasan

**Pembahasan**

Contoh: goal berupa kelas dua jam dengan satu praktik; initial state mencatat mentor, peserta, ruang, proyektor; constraint mencakup waktu dan perangkat; subtasks meliputi materi, demo, praktik, evaluasi; sequence mengikuti dependency; success criteria memastikan durasi dan tujuan terpenuhi.

Latihan 2

##### Susun dependency

Urutkan: membuat slide, menentukan tujuan belajar, menguji latihan, memilih topik, menyiapkan formulir evaluasi. Tandai langkah yang dapat berjalan paralel.

** Lihat pembahasan

**Pembahasan**

Pilih topik dan tujuan belajar lebih dulu. Slide dan rancangan latihan mengikuti keduanya. Latihan diuji setelah dibuat. Formulir evaluasi dapat disiapkan paralel setelah tujuan belajar jelas.

Latihan 3

##### Perbarui rencana

Proyektor tidak dapat digunakan selama 30 menit pertama. Tentukan langkah yang berubah dan cara menjaga goal tetap sama.

** Lihat pembahasan

**Pembahasan**

Mulai dengan pengantar, diskusi, atau aktivitas kertas. Pindahkan demo visual setelah proyektor tersedia. Periksa ulang durasi agar praktik dan evaluasi tidak terpotong.

Latihan 4

##### Audit rencana yang buruk

AI membuat rencana: "Siapkan materi, adakan workshop, selesai." Temukan minimal empat kekurangan.

** Lihat pembahasan

**Pembahasan**

Goal tidak terukur, initial state dan constraints hilang, subtugas terlalu besar, dependency tidak terlihat, sequence tidak rinci, serta tidak ada success criteria atau mekanisme update.

##### kuis

##### 1Apa fungsi utama planning?

**A**Menentukan langkah untuk mencapai tujuan**B**Menghapus semua batasan**C**Menambah panjang jawaban**D**Menjalankan semua tool

** Periksa jawaban

##### 2Apa manfaat problem decomposition?

**A**Membuat tugas selalu selesai otomatis**B**Memecah tujuan besar menjadi subtugas yang lebih mudah dikelola**C**Menghindari pemeriksaan hasil**D**Mengganti goal di tengah proses

** Periksa jawaban

##### 3Proyektor tidak tersedia selama 30 menit pertama termasuk komponen apa?

**A**Goal**B**Constraint**C**Success criteria**D**Final answer

** Periksa jawaban

##### 4Materi harus selesai sebelum slide dibuat. Hubungan ini disebut...

**A**Assumption**B**Dependency**C**Final answer**D**Observation error

** Periksa jawaban

##### 5Manakah success criteria yang paling dapat diperiksa?

**A**Workshop terasa menarik**B**Peserta tampak senang**C**Jadwal selesai dalam dua jam dan seluruh peserta menyelesaikan latihan**D**Materi dibuat sebaik mungkin

** Periksa jawaban

##### 6Apa ciri dynamic planning?

**A**Rencana tidak pernah berubah**B**Tidak memiliki tujuan**C**Rencana dapat diperbarui berdasarkan observation**D**Semua langkah dijalankan bersamaan

** Periksa jawaban

##### diskusi

**

Topik diskusi

##### Apakah AI sebaiknya selalu mengikuti rencana awal, atau boleh mengubahnya ketika menemukan informasi baru?

Rencana membantu konsistensi, tetapi lingkungan nyata dapat menghasilkan observation yang tidak diperkirakan.

Gunakan pertanyaan berikut untuk menjaga diskusi tetap terarah:

-   Kapan perubahan rencana menjadi keputusan yang tepat?
-   Apa beda memperbarui langkah dengan mengubah goal?
-   Batas apa yang tidak boleh diubah tanpa persetujuan pengguna?
-   Bagaimana AI menjelaskan alasan perubahan rencana?
-   Siapa yang bertanggung jawab bila rencana baru menimbulkan risiko?

**Refleksi pribadi**

Ceritakan satu situasi ketika kamu perlu mengubah rencana karena informasi atau sumber daya baru.

**Tanggapi peserta lain**

Tanggapi satu rencana peserta lain dengan menunjukkan satu constraint atau dependency yang mungkin belum dipertimbangkan.



### Chain-of-Thought dan Langkah Penyelesaian

- **slug:** chain-of-thought
- **title:** Chain-of-Thought dan Langkah Penyelesaian
- **summary:** Memahami fungsi langkah perantara pada tugas kompleks tanpa menganggapnya sebagai akses penuh ke proses internal model.
- **duration:** 20-25 menit
#### learningObjectives

- Menjelaskan Chain-of-Thought sebagai langkah perantara yang dihasilkan model.
- Menentukan kapan langkah penyelesaian terstruktur membantu dan kapan tidak diperlukan.
- Memeriksa langkah, bukti, perhitungan, dan kesimpulan tanpa menganggapnya pasti benar.

#### references

- [2]
- [3]

- **materi:** Chain-of-Thought adalah rangkaian langkah perantara yang dihasilkan model sebelum jawaban akhir; langkah ini membantu pemeriksaan tetapi tidak menjamin kebenaran.
- **latihan:** Empat latihan untuk membandingkan prompt, menyusun langkah yang dapat diperiksa, menemukan kesalahan, dan memilih tingkat detail.
- **kuis:** Enam soal interaktif tentang definisi, pola prompt, kegunaan, verifikasi, dan keterbatasan Chain-of-Thought.
- **diskusi:** Bahas apakah langkah penyelesaian AI harus selalu ditampilkan kepada pengguna.
#### rich

##### materi

Bayangkan AI diminta menghitung total biaya acara yang memiliki konsumsi, transportasi, dan diskon. Jawaban akhir saja sulit diperiksa. Dengan langkah penyelesaian terstruktur, pengguna dapat melihat data yang dipakai, operasi yang dilakukan, dan titik kesalahan bila hasilnya keliru.

**Chain-of-Thought** adalah rangkaian langkah perantara yang dihasilkan model sebelum memberikan jawaban akhir. Dalam pengalaman belajar ini, istilah UI yang dipakai adalah **langkah penyelesaian yang dapat diperiksa**. Teks tersebut berguna untuk menilai alur jawaban, tetapi bukan rekaman lengkap atau pasti dari proses internal model.

**Pertanyaan**Masalah awal

**

**Langkah perantara**Urutan penyelesaian

**

**Pemeriksaan**Validasi

**

**Jawaban akhir**Hasil ringkas

Jawaban langsung

Sisa anggarannya adalah Rp900.000.

Jawaban terstruktur

60 x Rp35.000 = Rp2.100.000. Rp3.000.000 - Rp2.100.000 = Rp900.000. Jadi anggaran mencukupi.

Mengapa langkah perantara membantu?

##### Masalah kompleks menjadi bagian yang dapat diperiksa

Langkah perantara membantu model menjaga urutan, menuliskan hasil sementara, dan menghubungkan satu hasil dengan langkah berikutnya. Bagi pengguna, format ini membuat asumsi dan perhitungan lebih mudah terlihat. Namun manfaat tersebut bergantung pada kualitas konteks dan langkah yang dihasilkan.

Chain-of-Thought prompting dapat memakai contoh few-shot yang berisi langkah perantara, atau instruksi zero-shot yang meminta model bekerja bertahap. Studi Wei dkk. dan Kojima dkk. melaporkan peningkatan pada beberapa tugas dan model yang mereka uji [2][3]. Hasil itu tidak membuktikan bahwa satu pola prompt selalu terbaik untuk semua model dan tugas.

Pola yang aman

##### Langkah penyelesaian yang dapat diperiksa

1.  Identifikasi tujuan.
2.  Catat informasi relevan.
3.  Pecah masalah menjadi beberapa langkah.
4.  Kerjakan setiap langkah.
5.  Periksa hasilnya.
6.  Berikan jawaban akhir secara ringkas.

Contoh 1: perhitungan

##### Biaya workshop dengan diskon

Biaya awal Rp2.400.000, diskon 10%, dan transportasi Rp300.000.

`Diskon = 10% x Rp2.400.000 = Rp240.000``Setelah diskon = Rp2.160.000``Total = Rp2.160.000 + Rp300.000 = Rp2.460.000`

Setiap hasil sementara dapat diperiksa. Kesalahan umum adalah menerapkan diskon setelah transportasi, padahal diskon hanya berlaku pada biaya awal.

Contoh 2: perbandingan

##### Memilih format pelatihan

Tim membandingkan kelas daring dan luring. Langkah yang dapat diperiksa mencatat tujuan, jumlah peserta, kebutuhan praktik, akses internet, biaya, dan risiko. Jawaban akhir tidak cukup mengatakan "luring lebih baik"; rekomendasi perlu menunjukkan kriteria dan tradeoff.

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Kriteria
Daring
Luring</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Akses peserta jauh
Lebih mudah
Memerlukan perjalanan</td>
<td align="left">Praktik perangkat
Bergantung perangkat peserta
Dapat didampingi langsung</td>
<td align="left">Biaya tempat
Lebih rendah
Lebih tinggi</td>
</tr>
</tbody>
</table>

Kapan digunakan?

##### Multi-langkah dan mudah salah

Gunakan untuk perhitungan bertahap, beberapa batasan, perbandingan alternatif, perencanaan, diagnosis awal, atau jawaban yang harus dapat diaudit.

Kapan tidak diperlukan?

##### Jawaban langsung yang sederhana

Salam, perubahan format, ekstraksi singkat, dan fakta sederhana biasanya tidak memerlukan langkah panjang. Penjelasan berlebihan dapat mengaburkan hasil utama.

**

**Chain-of-Thought tidak menjamin jawaban benar.** Teks langkah perantara juga tidak selalu menjadi gambaran lengkap proses internal model. Perlakukan sebagai langkah penyelesaian yang dapat diperiksa, bukan "isi pikiran rahasia AI".

Kesalahan umum

##### Langkah panjang juga dapat salah

1.  Tujuan awal disalahpahami.
2.  Fakta yang tidak tersedia ditambahkan.
3.  Asumsi disembunyikan.
4.  Satu langkah perhitungan keliru tetapi dipakai langkah berikutnya.
5.  Urutan logis tampak rapi tetapi tidak didukung bukti.
6.  Jawaban akhir tidak sesuai dengan hasil langkah.
7.  Model terlalu percaya diri.
8.  Pengguna menganggap seluruh teks sebagai proses internal yang pasti.

##### ** Cara memeriksa langkah penyelesaian

-   Tujuan awal ditulis dengan benar.
-   Data berasal dari prompt atau sumber yang jelas.
-   Asumsi dinyatakan.
-   Setiap operasi dapat diulang.
-   Satuan konsisten.
-   Tidak ada langkah yang melompat.
-   Kesimpulan mengikuti hasil.
-   Jawaban akhir tetap ringkas dan sesuai kebutuhan.

Dua lapisan jawaban

##### Proses pemeriksaan dan komunikasi akhir tidak harus sama panjang

Untuk tugas kompleks, sistem dapat bekerja dengan struktur yang rinci lalu menyajikan jawaban akhir yang lebih ringkas: hasil, asumsi penting, bukti utama, dan cara memeriksa. Pengguna tidak selalu membutuhkan setiap token langkah perantara. Pada antarmuka produk, ringkasan yang dapat diaudit sering lebih berguna daripada penjelasan sangat panjang.

Contohnya, laporan anggaran dapat menampilkan rumus utama, komponen yang dikecualikan, dan total akhir. Detail tabel per baris dapat disimpan sebagai bukti pendukung. Pola ini menjaga transparansi tanpa membanjiri peserta dengan teks.

Failure modes

##### Jawaban akhir benar belum tentu prosesnya sehat

Model dapat mencapai angka benar melalui operasi yang salah dan kebetulan saling meniadakan. Sebaliknya, proses awal dapat benar tetapi satu kesalahan aritmetika menghasilkan kesimpulan salah. Karena itu, pemeriksaan perlu menyentuh proses dan hasil. Ulangi operasi penting dengan kalkulator, bandingkan data ke sumber, dan uji apakah kesimpulan berubah ketika asumsi diubah.

Pada tugas rekomendasi, periksa kriteria yang dipakai. Model mungkin memilih opsi yang masuk akal tetapi mengabaikan aksesibilitas, privasi, atau batas anggaran. Langkah yang dapat diperiksa membantu menemukan kriteria hilang, tetapi pengguna tetap bertanggung jawab menilai relevansi dan dampaknya.

Prompt yang proporsional

##### Minta struktur, bukan pertunjukan kepastian

Instruksi seperti "identifikasi tujuan, gunakan data yang tersedia, sebutkan asumsi, hitung, lalu periksa" memberi model kerangka yang konkret. Instruksi "berpikirlah sangat mendalam dan jangan pernah salah" tidak memberi kriteria pemeriksaan. Prompt yang baik menentukan output yang dapat diuji, misalnya tabel perbandingan, rumus, sumber, atau daftar batasan.

Jika risiko tinggi, jangan hanya mengandalkan langkah teks. Gunakan tool presisi, sumber resmi, atau review manusia. Chain-of-Thought adalah bantuan penyusunan, bukan pengganti bukti eksternal.

Pada pertanyaan yang sensitif, pengguna dapat meminta ringkasan alasan, sumber, asumsi, dan hasil verifikasi tanpa meminta uraian internal yang panjang. Bentuk ini lebih fokus pada bukti yang dapat diuji dan mengurangi risiko menganggap teks penjelasan sebagai kebenaran hanya karena terdengar lancar.

##### ** Ringkasan poin penting

Chain-of-Thought membantu menyusun masalah kompleks menjadi langkah perantara dan membuat jawaban lebih mudah diperiksa. Manfaatnya tidak universal, tidak menjamin kebenaran, dan tidak membuka seluruh proses internal model. Fokus pengguna sebaiknya pada data, asumsi, operasi, bukti, dan jawaban akhir yang dapat diverifikasi.

Wei dkk. memperkenalkan Chain-of-Thought prompting melalui contoh yang berisi langkah reasoning perantara dan melaporkan peningkatan pada beberapa tugas aritmetika, commonsense, dan symbolic reasoning, pada eksperimen dan model yang diuji [2].

##### latihan

Latihan 1

##### Bandingkan dua prompt

`Hitung kebutuhan konsumsi acara ini.``Identifikasi data, susun langkah, kerjakan, periksa hasil, lalu berikan jawaban akhir.`

Bandingkan kelengkapan, kejelasan, ketepatan, dan kemudahan verifikasi.

** Lihat pembahasan

**Pembahasan**

Prompt kedua memberi struktur yang lebih mudah diperiksa pada tugas bertahap. Namun hasil tetap bergantung pada data yang lengkap dan perhitungan benar; prompt panjang bukan jaminan otomatis.

Latihan 2

##### Temukan kesalahan hitung

AI menulis: "50 peserta x Rp40.000 = Rp1.500.000, jadi anggaran Rp1.800.000 tersisa Rp300.000." Perbaiki langkah dan kesimpulan.

** Lihat pembahasan

**Pembahasan**

Perkalian yang benar Rp2.000.000. Anggaran Rp1.800.000 kurang Rp200.000, bukan tersisa Rp300.000. Kesalahan hasil sementara mengubah kesimpulan akhir.

Latihan 3

##### Susun langkah yang dapat diperiksa

Buat langkah untuk membandingkan dua venue berdasarkan kapasitas, biaya, aksesibilitas, dan jarak. Akhiri dengan rekomendasi bersyarat.

** Lihat pembahasan

**Pembahasan**

Tentukan kebutuhan acara; catat data tiap venue; bandingkan setiap kriteria dengan bobot yang disepakati; periksa data yang hilang; lalu rekomendasikan venue beserta tradeoff dan asumsi.

Latihan 4

##### Pilih tingkat detail

Tentukan mana yang memerlukan langkah rinci: menyapa peserta, menghitung biaya tiga komponen, mengubah teks menjadi huruf kapital, atau memilih jadwal dari lima batasan.

** Lihat pembahasan

**Pembahasan**

Perhitungan tiga komponen dan pemilihan jadwal multi-batasan memerlukan langkah terstruktur. Salam dan perubahan huruf biasanya cukup dengan jawaban langsung.

##### kuis

##### 1Apa definisi sederhana Chain-of-Thought?

**A**Akses penuh ke proses internal model**B**Rangkaian langkah perantara yang dihasilkan sebelum jawaban akhir**C**Database fakta milik AI**D**Tool untuk mencari informasi terbaru

** Periksa jawaban

##### 2Kapan langkah perantara paling berguna?

**A**Saat tugas terdiri dari beberapa tahap dan perlu diperiksa**B**Untuk setiap salam singkat**C**Hanya saat memakai internet**D**Saat pengguna tidak memberi tujuan

** Periksa jawaban

##### 3Pernyataan mana yang tepat tentang keterbatasan CoT?

**A**Selalu menunjukkan seluruh proses internal model**B**Selalu menghasilkan jawaban benar**C**Dapat membantu pemeriksaan tetapi tetap dapat berisi kesalahan**D**Tidak boleh digunakan untuk perhitungan

** Periksa jawaban

##### 4Prompt mana yang paling tepat untuk perhitungan multi-langkah?

**A**Jawab secepat mungkin tanpa memeriksa**B**Tuliskan tujuan, data, langkah perhitungan, pemeriksaan, dan jawaban akhir**C**Gunakan sebanyak mungkin istilah teknis**D**Berikan jawaban paling panjang

** Periksa jawaban

##### 5Jika langkah menghasilkan Rp2.000.000 tetapi jawaban akhir menyebut Rp1.500.000, apa yang harus dilakukan?

**A**Memilih angka yang lebih kecil**B**Mengabaikan langkah dan percaya jawaban akhir**C**Memeriksa kembali operasi dan menyelaraskan kesimpulan dengan hasil yang valid**D**Menambahkan penjelasan agar terlihat yakin

** Periksa jawaban

##### 6Mengapa CoT tidak menjamin kebenaran?

**A**Karena langkah yang runtut dapat dibangun dari pemahaman atau data yang salah**B**Karena model tidak dapat menghasilkan teks**C**Karena jawaban akhir selalu acak**D**Karena semua tugas harus memakai tool

** Periksa jawaban

##### diskusi

**

Topik diskusi

##### Apakah langkah penyelesaian AI harus selalu ditampilkan kepada pengguna?

Langkah yang dapat diperiksa membantu pada tugas berisiko, tetapi tidak setiap interaksi memerlukan uraian panjang.

Gunakan pertanyaan berikut untuk menjaga diskusi tetap terarah:

-   Kapan transparansi langkah membantu verifikasi?
-   Kapan langkah panjang mengganggu kesederhanaan antarmuka?
-   Apa risiko penjelasan yang masuk akal tetapi tidak akurat?
-   Bukti apa yang lebih berguna daripada penjelasan sangat panjang?
-   Bagaimana menyeimbangkan auditabilitas dan privasi atau keamanan sistem?

**Refleksi pribadi**

Ceritakan pengalaman ketika langkah AI membantu menemukan kesalahan atau justru membuatmu terlalu percaya.

**Tanggapi peserta lain**

Pilih satu jawaban peserta lain dan usulkan bentuk penjelasan yang lebih singkat tetapi tetap dapat diverifikasi.



### Tool Use: Ketika AI Membutuhkan Alat Eksternal

- **slug:** tool-use
- **title:** Tool Use: Ketika AI Membutuhkan Alat Eksternal
- **summary:** Memahami cara AI memilih, memanggil, membaca, dan memeriksa hasil tool ketika teks saja tidak cukup menyelesaikan tugas.
- **duration:** 30-35 menit
#### learningObjectives

- Menentukan apakah suatu tugas membutuhkan tool dan memilih tool yang sesuai.
- Menjelaskan parameter, tool call, observation, validation, dan update.
- Membedakan read dan write action serta menerapkan kesadaran izin dan risiko.

#### references

- [4]
- [5]
- [6]

- **materi:** Tool use membantu perhitungan presisi, informasi terbaru, dokumen, spreadsheet, kode, kalender, database, dan layanan eksternal.
- **latihan:** Lima latihan untuk memilih tool, menentukan parameter, membaca observation, memeriksa izin, dan memperbaiki tool loop.
- **kuis:** Tujuh soal interaktif tentang kebutuhan tool, pemilihan, parameter, observation, error, izin, dan validasi output.
- **diskusi:** Bahas batas otorisasi ketika AI menggunakan tool atau mengambil tindakan.
#### rich

##### materi

Seorang peserta meminta AI menghitung rata-rata 10.000 nilai dari spreadsheet, memeriksa cuaca hari ini, atau mencari slot rapat minggu depan. Model tidak seharusnya menebak data itu dari pola teks. Sistem membutuhkan alat eksternal yang tepat dan izin yang sesuai.

**Tool use** adalah kemampuan sistem AI menggunakan alat atau layanan eksternal ketika tugas tidak cukup diselesaikan hanya dengan menghasilkan teks. Tool dapat menambah presisi, membaca data yang tidak ada di prompt, memperoleh informasi terbaru, atau menjalankan tindakan. Tool tidak membuat sistem otomatis benar; input, izin, output, dan interpretasinya tetap harus diperiksa.

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Kebutuhan
Tool yang sesuai
Contoh</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Perhitungan presisi
Kalkulator
Operasi angka yang harus tepat</td>
<td align="left">Pengolahan data
Python atau spreadsheet
Nilai, rata-rata, filter, transformasi</td>
<td align="left">Informasi terbaru
Web search atau API
Cuaca, berita, harga</td>
</tr>
</tbody>
</table>

Tool selection

##### Pilih berdasarkan tujuan, data, kemampuan, dan izin

1.  Apa tujuan tugas?
2.  Data apa yang dibutuhkan?
3.  Apakah data sudah tersedia di prompt?
4.  Apakah data mudah berubah?
5.  Apakah hasil membutuhkan presisi atau eksekusi?
6.  Tool mana yang memiliki kemampuan paling sesuai?
7.  Apakah pengguna memberi izin untuk membaca atau mengubah data?

Menghitung rata-rata 10.000 nilai melalui generasi teks adalah pilihan buruk. Spreadsheet atau Python dapat membaca semua baris, memvalidasi format, dan menghitung agregasi secara konsisten.

Tool call konseptual

##### Nama, parameter, batasan, dan output

**Tool:** calculator

**Input:** (80 x 27500) + 350000

**Output:** 2550000

Parameter harus merepresentasikan tugas yang benar. Angka, satuan, rentang tanggal, zona waktu, nama file, atau kolom yang salah dapat menghasilkan observation yang valid secara format tetapi salah untuk tujuan pengguna.

Observation

##### Hasil tool menjadi konteks baru, bukan kebenaran otomatis

Observation adalah hasil yang dikembalikan tool kepada AI. Sistem perlu membaca apakah hasil relevan, lengkap, terbaru, dan bebas error. Jika spreadsheet melaporkan "kolom nilai akhir tidak ditemukan", AI tidak boleh mengarang rata-rata. Sistem harus mencari kolom alternatif yang masuk akal, meminta klarifikasi, atau menjelaskan bahwa data belum tersedia.

**Reason**Pahami kebutuhan

**

**Plan**Tentukan data dan tool

**

**Act**Panggil tool

**

**Observe**Baca hasil

**

**Validate**Periksa output

**

**Update**Ubah rencana

**

**Answer**Sampaikan hasil

Contoh lengkap: spreadsheet

##### Menghitung rata-rata nilai peserta

Reason  
Data nilai berada di file, bukan di prompt.

Plan  
Buka file, temukan sheet dan kolom nilai, periksa data kosong dan nonnumerik, hitung rata-rata, lalu laporkan jumlah data.

Action  
Gunakan spreadsheet atau Python.

Observation  
50 baris: 47 nilai valid, dua kosong, satu tidak valid, rata-rata valid 82,4.

Validate  
Pastikan nilai kosong dan tidak valid tidak dihitung serta rentang kolom benar.

Answer  
Dari 50 data, 47 nilai valid memiliki rata-rata 82,4; tiga data lain tidak dimasukkan dan alasannya dijelaskan.

Jawaban ini lebih baik daripada hanya "82,4" karena pengguna mengetahui cakupan, kualitas data, dan keputusan pembersihan yang memengaruhi hasil.

Contoh informasi terbaru

##### Cuaca hari ini

Model memerlukan lokasi, tanggal yang dimaksud, sumber cuaca terbaru, dan satuan. Jika lokasi tidak tersedia, AI harus meminta lokasi atau memberi petunjuk cara memeriksa, bukan menebak kota pengguna.

Contoh calendar

##### Mencari waktu rapat dua jam

1.  Tentukan tanggal "minggu depan" dan zona waktu.
2.  Baca agenda yang diizinkan.
3.  Cari slot dua jam tanpa konflik.
4.  Tampilkan beberapa alternatif.
5.  Jangan membuat event jika pengguna hanya meminta rekomendasi.

Read action

Melihat jadwal atau data. Tetap membutuhkan izin jika datanya pribadi.

Write action

Membuat, mengubah, mengirim, atau menghapus. Dampaknya lebih besar dan biasanya memerlukan konfirmasi.

Tool perlu digunakan

Data belum ada di konteks, informasi mudah berubah, hasil membutuhkan presisi, tugas perlu dieksekusi, atau hasil harus diverifikasi ke sistem eksternal.

Tool tidak perlu digunakan

Informasi sudah ada di prompt, tugas hanya menyusun ulang teks, pertanyaan konseptual dapat dijawab dari konteks, atau tool tidak menambah manfaat.

Izin dan dampak

##### Semakin besar dampak, semakin penting konfirmasi

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Tingkat
Contoh
Kontrol</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Rendah
Kalkulator, pencarian publik, membaca data yang diberikan
Validasi input dan output</td>
<td align="left">Sedang
Membaca kalender atau dokumen pribadi, membuat draft email
Izin akses dan transparansi data</td>
<td align="left">Tinggi
Mengirim email, menghapus data, transaksi, mengubah jadwal
Konfirmasi eksplisit, batas otorisasi, dan audit trail</td>
</tr>
</tbody>
</table>

Tool error

##### Jangan mengklaim tindakan berhasil saat akses ditolak

Respons salah

"Email berhasil dikirim" setelah tool mengembalikan permission denied.

Respons benar

"Saya tidak dapat mengirim email karena akses ditolak. Tidak ada pesan yang terkirim."

Kesalahan umum

##### Tool tetap perlu diawasi

1.  Tool tidak tersedia.
2.  Tool yang dipilih tidak sesuai.
3.  Tool digunakan padahal tidak diperlukan.
4.  Parameter atau rentang data salah.
5.  Data kosong atau format output berubah.
6.  Network error atau permission denied diabaikan.
7.  Data kedaluwarsa atau ambigu.
8.  AI salah membaca hasil.
9.  Output dianggap pasti benar.
10. AI menyatakan berhasil walaupun tool gagal.

##### ** Cara memeriksa tool use

-   Tool sesuai dengan tujuan.
-   Parameter dan rentang data benar.
-   Satuan serta zona waktu konsisten.
-   Output lengkap dan terbaru.
-   Error atau data kosong dikenali.
-   Hasil sesuai permintaan.
-   Observation dibaca dengan tepat.
-   Tindakan memiliki izin yang cukup.

Validasi berlapis

##### Periksa input, eksekusi, dan interpretasi

Validasi tidak berhenti ketika tool mengembalikan status sukses. Periksa apakah input mengarah ke file, kolom, tanggal, dan pengguna yang benar; apakah eksekusi selesai tanpa error; serta apakah AI menafsirkan output sesuai tujuan. Tiga lapisan ini membantu membedakan tool yang berhasil berjalan dari tugas pengguna yang benar-benar terselesaikan.

##### ** Ringkasan poin penting

Tool use memperluas kemampuan LLM dengan data, perhitungan, atau tindakan eksternal. Sistem perlu memilih tool yang tepat, menyiapkan parameter, membaca observation, memvalidasi output, memperbarui rencana, dan hanya mengambil tindakan dalam batas izin. Implementasi function calling, registry, retry, memory, dan guardrail teknis dibahas lebih lanjut pada Agentic AI.

Toolformer mempelajari keputusan mengenai tool, waktu pemanggilan, argumen, dan penggunaan hasil dalam generasi berikutnya [4]. ReAct menggabungkan reasoning dan tindakan agar observation memengaruhi langkah berikutnya [5]. Kajian augmented language models membahas perluasan model melalui reasoning, tool, dan retrieval [6]. Ketiganya adalah pendekatan riset, bukan arsitektur wajib semua sistem.

##### latihan

Latihan 1

##### Pilih tool untuk sepuluh tugas

Klasifikasikan: menjelaskan ML; menghitung 287 x 9.451; cuaca hari ini; merangkum teks yang diberikan; menganalisis 10.000 baris; agenda minggu depan; mencari rute; mengubah judul; membaca laporan tertentu; mengirim email.

** Lihat pembahasan

**Pembahasan**

Tanpa tool: menjelaskan konsep, merangkum konteks yang tersedia, dan mengubah judul. Tool: kalkulator, cuaca/web, Python/spreadsheet, calendar, maps, document retrieval, dan email. Mengirim email juga memerlukan konfirmasi.

Latihan 2

##### Tentukan parameter calendar

Untuk tugas "cari agenda minggu depan", tentukan rentang tanggal, durasi, zona waktu, kalender, peserta, dan jenis aksi.

** Lihat pembahasan

**Pembahasan**

Gunakan tanggal eksplisit awal-akhir, durasi slot, zona waktu pengguna, kalender yang diizinkan, peserta terkait, dan aksi read-only. Jangan membuat event tanpa permintaan atau konfirmasi.

Latihan 3

##### Baca observation dengan data kosong

Tool mengembalikan 50 baris, 47 nilai valid, dua kosong, dan satu teks "belum dinilai". Susun respons aman.

** Lihat pembahasan

**Pembahasan**

Hitung rata-rata hanya dari 47 nilai valid, jelaskan tiga data yang dikecualikan, dan jangan mengubah "belum dinilai" menjadi angka tanpa aturan dari pengguna.

Latihan 4

##### Permission check

Kelompokkan: kalkulasi lokal, membaca kalender pribadi, membuat draft email, mengirim email, menghapus file, dan mengubah jadwal.

** Lihat pembahasan

**Pembahasan**

Kalkulasi lokal berdampak rendah. Membaca data pribadi dan draft email membutuhkan izin akses. Mengirim, menghapus, atau mengubah data berdampak tinggi dan membutuhkan konfirmasi eksplisit.

Latihan 5

##### Perbaiki tool loop

Alur buruk: Reason -\> pilih tool -\> panggil tool -\> langsung Answer. Tambahkan tahap yang hilang dan jelaskan fungsinya.

** Lihat pembahasan

**Pembahasan**

Tambahkan Plan untuk parameter, Observe untuk membaca hasil, Validate untuk memeriksa error/data/satuan, dan Update untuk memperbaiki rencana sebelum Answer.

##### kuis

##### 1Apa yang dimaksud dengan tool use?

**A**Kemampuan AI menggunakan layanan eksternal untuk membantu menyelesaikan tugas**B**Kemampuan AI menghafal semua data**C**Cara membuat jawaban lebih panjang**D**Proses menghapus konteks pengguna

** Periksa jawaban

##### 2Tool apa yang paling sesuai untuk menghitung rata-rata 10.000 baris nilai?

**A**Calendar**B**Python atau spreadsheet**C**Maps**D**Email

** Periksa jawaban

##### 3Apa risiko parameter tool yang salah?

**A**Tool selalu memperbaikinya otomatis**B**Hasil dapat menggunakan data, rentang, atau operasi yang keliru**C**Jawaban pasti menjadi lebih singkat**D**Tidak ada dampak pada hasil

** Periksa jawaban

##### 4Apa yang harus dilakukan setelah menerima observation dari tool?

**A**Langsung menganggapnya benar**B**Memeriksa hasil dan memperbarui rencana atau jawaban**C**Menghapus tujuan awal**D**Selalu memanggil tool kedua

** Periksa jawaban

##### 5Tool email mengembalikan permission denied. Respons terbaik adalah...

**A**Mengatakan email berhasil agar pengguna tenang**B**Mencoba mengirim ke penerima lain tanpa izin**C**Menjelaskan akses ditolak dan tidak ada email yang terkirim**D**Menghapus error dari jawaban

** Periksa jawaban

##### 6Tindakan mana yang paling membutuhkan konfirmasi eksplisit?

**A**Menghitung 12 x 8**B**Merangkum teks yang diberikan**C**Mengirim email kepada seluruh peserta**D**Menjelaskan konsep API

** Periksa jawaban

##### 7Kapan tool biasanya tidak diperlukan?

**A**Saat pengguna meminta cuaca hari ini**B**Saat data ada di spreadsheet besar**C**Saat pengguna meminta merangkum teks yang sudah diberikan**D**Saat jadwal aktual harus diperiksa

** Periksa jawaban

##### diskusi

**

Topik diskusi

##### Seberapa jauh AI boleh menggunakan tool dan mengambil tindakan atas nama pengguna?

Tool dapat meningkatkan kenyamanan dan efisiensi, tetapi read dan write action memiliki risiko privasi, keamanan, serta dampak yang berbeda.

Gunakan pertanyaan berikut untuk menjaga diskusi tetap terarah:

-   Tindakan apa yang boleh dilakukan tanpa konfirmasi?
-   Bagaimana sistem menjelaskan tool, data, dan tujuan yang digunakan?
-   Apa risiko ketika tool mengakses data pribadi?
-   Kapan audit trail diperlukan?
-   Siapa yang bertanggung jawab atas tindakan otomatis yang keliru?
-   Bagaimana manusia tetap memiliki kontrol akhir?

**Refleksi pribadi**

Pilih satu tool yang pernah kamu gunakan. Jelaskan data yang diakses, potensi dampak, dan konfirmasi yang seharusnya diminta.

**Tanggapi peserta lain**

Tanggapi satu peserta lain dengan mengusulkan satu batas otorisasi atau bukti audit yang belum disebutkan.
