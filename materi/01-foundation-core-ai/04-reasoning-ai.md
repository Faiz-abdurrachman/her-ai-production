# Reasoning AI

> Ekspor lengkap dari sumber materi HerAI yang tersedia di repository.
> Mencakup materi, latihan, kuis, diskusi, pembahasan, versi legacy, dan/atau data interaktif bila tersedia.

## Reasoning AI: Cara AI Menalar, Merencanakan, dan Menggunakan Tools

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/01-full.html`

### Reasoning AI: Cara AI Menalar, Merencanakan, dan Menggunakan Tools

#### Deskripsi Modul

Ketika pengguna memberikan sebuah masalah, sistem AI tidak selalu cukup hanya mengambil satu fakta atau menghasilkan satu kalimat. Tugas yang lebih kompleks dapat mengharuskan AI memahami tujuan, memilah informasi, menyusun urutan langkah, menggunakan alat eksternal, membaca hasil alat, memperbarui rencana, dan memeriksa jawaban sebelum menyampaikannya kepada pengguna.

Modul ini membahas empat kemampuan yang saling berkaitan:

1.  **Reasoning** — bagaimana AI mengolah konteks dan menghubungkan informasi untuk menyelesaikan tugas.
2.  **Planning** — bagaimana AI mengubah tujuan besar menjadi subtugas dan urutan tindakan.
3.  **Chain-of-Thought** — bagaimana langkah perantara dapat membantu penyelesaian masalah yang bertahap.
4.  **Tool Use** — bagaimana AI menggunakan alat eksternal ketika informasi atau kemampuan di dalam model tidak mencukupi.

Keempat kemampuan tersebut akan dihubungkan melalui alur:

    REASON → PLAN → ACT → OBSERVE → UPDATE → ANSWER

> **Catatan penting:** Istilah “AI menalar” digunakan untuk menggambarkan perilaku sistem ketika mengolah masalah. Istilah ini tidak berarti bahwa AI memiliki pikiran, kesadaran, atau cara memahami dunia yang sama dengan manusia.

* * * * *

#### Tujuan Pembelajaran

Setelah menyelesaikan modul ini, peserta diharapkan mampu:

-   menjelaskan reasoning dalam konteks sistem AI;
-   menjelaskan hubungan konteks, instruksi, langkah perantara, dan jawaban AI;
-   membedakan reasoning, planning, action, observation, update, dan answer;
-   memisahkan fakta, asumsi, batasan, dan kesimpulan;
-   memecah tugas besar menjadi subtugas yang dapat dikerjakan;
-   menyusun rencana statis dan dinamis;
-   menjelaskan fungsi serta keterbatasan Chain-of-Thought;
-   menentukan kapan sebuah tool perlu digunakan;
-   memilih tool sesuai kebutuhan tugas;
-   memeriksa parameter dan output tool;
-   mengidentifikasi kegagalan reasoning, planning, dan tool use;
-   mengevaluasi apakah jawaban AI cukup layak dipercaya.

* * * * *

#### Peta Pembelajaran

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Submateri
Fokus Utama
Hasil yang Diharapkan</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">1. Bagaimana AI Melakukan Penalaran
Tujuan, fakta, asumsi, hubungan, kesimpulan
Peserta dapat membedah proses penyelesaian AI</td>
<td align="left">2. Planning dan Problem Decomposition
Goal, constraints, subtasks, dependencies, replanning
Peserta dapat menyusun dan mengevaluasi rencana</td>
<td align="left">3. Chain-of-Thought
Langkah perantara, prompt terstruktur, verifikasi, faithfulness
Peserta memahami manfaat dan batas CoT</td>
</tr>
</tbody>
</table>

* * * * *

### Submateri 1 — Bagaimana AI Melakukan Penalaran?

#### 1.1 Pembuka: Menjawab Tidak Selalu Sama dengan Menyelesaikan

Bayangkan seorang peserta meminta AI:

> “Hitung apakah anggaran konsumsi acara cukup untuk seluruh peserta.”

Untuk menjawab dengan benar, AI perlu memahami beberapa hal:

-   berapa jumlah peserta;
-   berapa biaya konsumsi per peserta;
-   apakah ada biaya tambahan;
-   berapa anggaran yang tersedia;
-   operasi apa yang harus dilakukan;
-   bagaimana menentukan bahwa anggaran cukup atau tidak.

Pertanyaan tersebut berbeda dari pertanyaan sederhana seperti:

> “Apa arti kata algoritma?”

Pada pertanyaan kedua, AI dapat menghasilkan definisi berdasarkan konteks dan pola yang telah dipelajari. Pada pertanyaan anggaran, AI perlu menghubungkan beberapa data dan menjalankan urutan penyelesaian.

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Recall atau pengambilan informasi
Reasoning atau penalaran</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Menghasilkan informasi yang sudah dikenali
Menghubungkan beberapa informasi untuk memperoleh hasil baru</td>
<td align="left">Biasanya dapat dijawab dalam satu langkah
Sering membutuhkan beberapa langkah</td>
</tr>
</tbody>
</table>

#### 1.2 Apa yang Dimaksud dengan Reasoning dalam AI?

Dalam konteks LLM, **reasoning** adalah istilah praktis untuk menggambarkan kemampuan model menggunakan instruksi, konteks, pola yang dipelajari, langkah perantara, dan hasil sebelumnya untuk menghasilkan respons yang sesuai dengan tugas.

LLM pada dasarnya bekerja dengan memprediksi token berikutnya berdasarkan token yang sudah ada. Proses ini diulang hingga respons selesai. Meskipun mekanisme dasarnya adalah prediksi token, pola yang dipelajari dalam skala besar dapat menghasilkan perilaku seperti:

-   mengikuti aturan;
-   membandingkan alternatif;
-   menghubungkan beberapa fakta;
-   melakukan perhitungan bertahap;
-   menyusun rencana;
-   memperbaiki jawaban setelah menerima informasi baru.

<!-- -->

    Prompt dan konteks
            ↓
    Representasi hubungan informasi
            ↓
    Prediksi token berikutnya
            ↓
    Token menjadi konteks baru
            ↓
    Prediksi berikutnya
            ↓
    Respons lengkap

Model bahasa dapat diperluas dengan kemampuan reasoning, retrieval, dan penggunaan alat eksternal. Pendekatan semacam ini sering dibahas sebagai **augmented language models** [6].

#### 1.3 Tahapan Penalaran Sederhana

Model mental berikut dapat digunakan untuk membaca bagaimana AI menyelesaikan sebuah tugas:

    1. Memahami permintaan
            ↓
    2. Mengidentifikasi tujuan
            ↓
    3. Mengambil informasi relevan
            ↓
    4. Mengenali informasi yang hilang
            ↓
    5. Menentukan hubungan antar informasi
            ↓
    6. Menyusun langkah penyelesaian
            ↓
    7. Menghasilkan hasil
            ↓
    8. Memeriksa hasil

##### Tahap 1 — Memahami Permintaan

AI harus mengenali tugas utama yang diberikan. Permintaan pengguna dapat berupa:

-   menjelaskan konsep;
-   menghitung;
-   membandingkan;
-   membuat rencana;
-   menganalisis data;
-   memberikan rekomendasi;
-   melakukan tindakan melalui tool.

Perhatikan prompt berikut:

> “Buat jadwal belajar machine learning selama satu minggu, maksimal dua jam per hari, untuk peserta pemula.”

Informasi penting yang harus dipahami:

-   output: jadwal belajar;
-   durasi: satu minggu;
-   batas waktu harian: maksimal dua jam;
-   topik: machine learning;
-   tingkat peserta: pemula.

Jawaban yang berisi materi tingkat lanjut selama empat jam per hari mungkin terlihat lengkap, tetapi tetap gagal karena tidak mengikuti tujuan dan batasan.

##### Tahap 2 — Mengidentifikasi Informasi yang Tersedia

AI perlu memisahkan informasi yang sudah tersedia dan informasi yang belum tersedia.

    Informasi tersedia:
    - durasi satu minggu;
    - maksimal dua jam per hari;
    - fokus machine learning;
    - peserta pemula.

    Informasi belum tersedia:
    - apakah peserta sudah memahami Python;
    - waktu belajar yang disukai;
    - perangkat yang tersedia;
    - bentuk evaluasi yang diinginkan.

Ketika ada informasi yang hilang, AI dapat:

1.  meminta klarifikasi;
2.  membuat asumsi yang dinyatakan secara terbuka;
3.  memberikan beberapa opsi;
4.  memberi solusi sementara beserta keterbatasannya.

Contoh asumsi transparan:

> “Saya mengasumsikan peserta sudah memahami dasar Python. Jika belum, sesi hari pertama perlu dialihkan untuk pengenalan Python.”

##### Tahap 3 — Menentukan Informasi yang Relevan

Tidak semua informasi dalam prompt harus digunakan.

Contoh:

> “Acara diselenggarakan di aula berwarna biru. Pesertanya 60 orang, biaya konsumsi Rp35.000 per orang, dan anggarannya Rp3.000.000.”

Warna aula tidak relevan untuk perhitungan konsumsi. Jumlah peserta, biaya per peserta, dan anggaran adalah informasi relevan.

Kemampuan memilih informasi relevan membantu AI menghindari jawaban yang terlalu panjang atau salah fokus.

##### Tahap 4 — Menentukan Hubungan Antar Informasi

AI perlu mengetahui bagaimana data saling berhubungan.

    jumlah peserta × biaya per peserta = total konsumsi

    anggaran − total kebutuhan = sisa anggaran

Urutan hubungan ini penting. AI tidak dapat menghitung sisa anggaran sebelum mengetahui total kebutuhan.

##### Tahap 5 — Menyusun Langkah Penyelesaian

Tugas yang kompleks sebaiknya dipecah menjadi langkah yang jelas.

    1. Hitung total konsumsi.
    2. Tambahkan biaya lain.
    3. Bandingkan total dengan anggaran.
    4. Hitung sisa atau kekurangan.
    5. Tuliskan kesimpulan.

##### Tahap 6 — Memeriksa Hasil

AI atau pengguna perlu memeriksa:

-   apakah semua data relevan sudah dipakai;
-   apakah satuan konsisten;
-   apakah operasi benar;
-   apakah ada batasan yang dilanggar;
-   apakah kesimpulan mengikuti hasil;
-   apakah tingkat keyakinan sesuai dengan bukti.

* * * * *

## 1.4 Fakta, Asumsi, Langkah, dan Kesimpulan

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/02-full.html`

#### 1.4 Fakta, Asumsi, Langkah, dan Kesimpulan

Empat elemen berikut sering tercampur dalam jawaban AI.

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Elemen
Pengertian
Contoh</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Fakta
Informasi yang diberikan atau sudah diverifikasi
Peserta berjumlah 60 orang</td>
<td align="left">Asumsi
Informasi yang dianggap benar agar proses dapat dilanjutkan
Semua peserta menerima satu paket konsumsi</td>
<td align="left">Langkah
Operasi atau proses yang dilakukan
60 × Rp35.000</td>
</tr>
</tbody>
</table>

##### Contoh Jawaban Bermasalah

> “Anggarannya pasti cukup karena acara sebelumnya juga memiliki anggaran yang cukup.”

Masalah dalam jawaban tersebut:

-   menggunakan pengalaman sebelumnya sebagai dasar utama;
-   tidak menghitung kebutuhan acara sekarang;
-   mengabaikan kemungkinan perbedaan harga;
-   mengabaikan kemungkinan perbedaan jumlah peserta;
-   menggunakan kata “pasti” tanpa bukti yang cukup.

* * * * *

#### 1.5 Contoh Terurai 1 — Perhitungan Anggaran

##### Kasus

    Anggaran: Rp3.000.000
    Peserta: 60 orang
    Konsumsi: Rp35.000 per orang
    Biaya administrasi: Rp250.000

##### Langkah 1 — Hitung konsumsi

    60 × Rp35.000 = Rp2.100.000

##### Langkah 2 — Tambahkan biaya administrasi

    Rp2.100.000 + Rp250.000 = Rp2.350.000

##### Langkah 3 — Bandingkan dengan anggaran

    Rp3.000.000 − Rp2.350.000 = Rp650.000

##### Kesimpulan

> Anggaran mencukupi. Setelah biaya konsumsi dan administrasi, terdapat sisa Rp650.000.

##### Kesalahan yang Mungkin Terjadi

1.  **Melupakan biaya administrasi**
     AI hanya menghitung konsumsi dan menyatakan sisa Rp900.000.

2.  **Salah membaca angka**
     Rp35.000 dibaca sebagai Rp350.000.

3.  **Salah operasi**
     Anggaran dikalikan dengan jumlah peserta.

4.  **Kesimpulan tanpa perhitungan**
     AI menyatakan anggaran cukup karena Rp3.000.000 “terlihat besar”.

5.  **Tidak menyatakan asumsi**
     AI menganggap seluruh peserta menerima konsumsi, padahal panitia mungkin termasuk dalam perhitungan.

* * * * *

#### 1.6 Contoh Terurai 2 — Menentukan Prioritas

##### Kasus

Sebuah tim memiliki tiga pekerjaan:

1.  memperbaiki bug login;
2.  mengganti ikon menu;
3.  menambahkan animasi transisi.

Bug login membuat sebagian pengguna tidak dapat masuk ke aplikasi.

##### Informasi Relevan

-   bug login menghalangi fungsi utama;
-   ikon dan animasi lebih bersifat visual;
-   fitur lain tidak bermanfaat jika pengguna tidak dapat masuk.

##### Urutan yang Wajar

    1. Perbaiki bug login.
    2. Uji autentikasi dan sesi pengguna.
    3. Ganti ikon menu.
    4. Tambahkan animasi setelah fungsi utama stabil.

##### Dasar Penalaran

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Kriteria
Bug Login
Ikon
Animasi</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Dampak pada fungsi utama
Sangat tinggi
Rendah
Rendah</td>
<td align="left">Urgensi
Tinggi
Rendah
Rendah</td>
<td align="left">Risiko jika ditunda
Tinggi
Rendah
Rendah</td>
<td align="left">Ketergantungan pekerjaan lain
Tinggi
Rendah
Rendah</td>
</tr>
</tbody>
</table>

Reasoning tidak hanya digunakan untuk matematika. Reasoning juga dapat digunakan untuk:

-   menentukan prioritas;
-   memilih alternatif;
-   menyusun rekomendasi;
-   menganalisis penyebab;
-   memeriksa konsistensi;
-   membuat keputusan berdasarkan beberapa kriteria.

* * * * *

#### 1.7 Kesalahan Umum dalam Reasoning AI

##### 1. Salah Memahami Tujuan

AI menjawab topik yang berhubungan, tetapi tidak menjawab tugas utama.

##### 2. Mengabaikan Batasan

AI memberikan solusi yang melebihi anggaran, waktu, atau kapasitas.

##### 3. Menggunakan Informasi Tidak Relevan

AI memasukkan detail yang tidak memengaruhi hasil.

##### 4. Membuat Asumsi Tersembunyi

AI menganggap sesuatu benar tanpa mengatakannya.

##### 5. Mengarang Fakta

AI menambahkan data, sumber, atau kondisi yang tidak tersedia.

##### 6. Salah Urutan Langkah

AI menggunakan hasil yang belum dihitung atau melewati dependensi.

##### 7. Salah Perhitungan

Langkah terlihat benar, tetapi operasi atau angkanya salah.

##### 8. Tidak Memeriksa Hasil

AI berhenti setelah memperoleh angka tanpa memeriksa apakah angka masuk akal.

##### 9. Terlalu Percaya Diri

AI menggunakan kata “pasti” pada hasil yang masih bergantung pada asumsi.

##### 10. Penjelasan Meyakinkan tetapi Tidak Valid

Bahasa yang lancar dapat menutupi kesalahan logika.

> **Prinsip penting:** Penjelasan yang terdengar meyakinkan bukan bukti bahwa jawabannya benar.

* * * * *

#### 1.8 Cara Memeriksa Reasoning AI

Gunakan checklist berikut:

    □ Apakah AI menjawab pertanyaan yang benar?
    □ Apakah tujuan dan batasan dipahami?
    □ Apakah informasi yang dipakai tersedia?
    □ Apakah fakta dan asumsi dibedakan?
    □ Apakah asumsi penting disebutkan?
    □ Apakah urutan langkah masuk akal?
    □ Apakah perhitungan dapat diulang?
    □ Apakah kesimpulan mengikuti data?
    □ Apakah ada alternatif yang perlu dipertimbangkan?
    □ Apakah tingkat keyakinan sesuai dengan bukti?

* * * * *

#### 1.9 Kapan Reasoning Terstruktur Berguna?

Reasoning terstruktur berguna ketika tugas:

-   memiliki lebih dari satu langkah;
-   mengandung beberapa batasan;
-   melibatkan perhitungan;
-   membutuhkan perbandingan;
-   membutuhkan prioritas;
-   membutuhkan justifikasi;
-   menggunakan data dari beberapa sumber;
-   berpotensi memiliki asumsi tersembunyi.

Reasoning panjang tidak selalu diperlukan untuk:

-   memperbaiki satu typo;
-   menerjemahkan satu frasa;
-   menjawab definisi sederhana;
-   mengubah format teks;
-   memberikan jawaban satu langkah yang sudah jelas.

* * * * *

#### 1.10 Ringkasan Submateri

-   Reasoning menghubungkan informasi untuk menghasilkan kesimpulan atau langkah berikutnya.
-   LLM tetap bekerja melalui prediksi token, tetapi dapat menghasilkan perilaku penyelesaian masalah bertahap.
-   Reasoning yang baik dimulai dari memahami tujuan dan batasan.
-   Fakta, asumsi, langkah, dan kesimpulan harus dibedakan.
-   Jawaban yang runtut belum tentu benar.
-   Hasil AI perlu diperiksa dari sisi logika, data, perhitungan, dan kesesuaian tujuan.

* * * * *

## Submateri 2 — Planning dan Problem Decomposition

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/03-full.html`

### Submateri 2 — Planning dan Problem Decomposition

#### 2.1 Pembuka: Tujuan Besar Tidak Dikerjakan dalam Satu Langkah

Permintaan berikut terlihat sederhana:

> “Buat workshop pengenalan AI.”

Namun, permintaan tersebut sebenarnya terdiri atas banyak keputusan:

-   siapa pesertanya;
-   apa tujuan belajarnya;
-   berapa durasinya;
-   materi apa yang dipilih;
-   bagaimana bentuk latihan;
-   fasilitas apa yang tersedia;
-   bagaimana keberhasilannya diukur.

Sistem AI yang langsung menghasilkan jadwal tanpa memahami bagian-bagian tersebut berisiko membuat rencana yang tidak realistis.

    Reasoning:
    Apa masalahnya, informasi apa yang penting,
    dan hubungan apa yang perlu dipahami?

    Planning:
    Langkah apa yang perlu dilakukan
    untuk mencapai tujuan?

#### 2.2 Apa Itu Planning?

**Planning** adalah proses mengubah tujuan menjadi urutan langkah yang dapat dilaksanakan.

Planning menjawab pertanyaan seperti:

-   apa hasil akhirnya;
-   apa kondisi awalnya;
-   apa batasannya;
-   tugas kecil apa yang diperlukan;
-   apa urutan yang tepat;
-   kapan rencana dinyatakan selesai;
-   apa yang dilakukan jika kondisi berubah.

Pendekatan Plan-and-Solve membagi proses menjadi dua bagian: menyusun rencana yang memecah tugas menjadi subtugas, kemudian menjalankan subtugas tersebut berdasarkan rencana [1].

#### 2.3 Komponen Utama Planning

##### 1. Goal

Goal adalah hasil akhir yang ingin dicapai.

Contoh terlalu kabur:

> “Membuat workshop yang bagus.”

Contoh lebih terukur:

> “Menyelenggarakan workshop pengenalan AI selama dua jam untuk 50 peserta pemula, dengan satu sesi praktik dan satu kuis akhir.”

Goal yang jelas membantu AI menentukan apakah rencana sudah sesuai.

##### 2. Initial State

Initial state adalah kondisi awal sebelum tindakan dilakukan.

Contoh:

-   peserta berjumlah 50;
-   tersedia dua mentor;
-   hanya ada satu proyektor;
-   internet tidak stabil;
-   ruangan tersedia selama 120 menit.

##### 3. Constraints

Constraints adalah batasan yang harus dipatuhi.

Batasan dapat berupa:

-   waktu;
-   anggaran;
-   jumlah orang;
-   kapasitas ruangan;
-   kebijakan;
-   akses alat;
-   kemampuan peserta;
-   tenggat;
-   izin.

##### 4. Actions

Actions adalah tindakan yang dapat dilakukan untuk mendekati goal.

Contoh:

-   menentukan materi;
-   membuat slide;
-   menyiapkan demo;
-   membagi kelompok;
-   membuat kuis.

##### 5. Dependencies

Dependencies adalah hubungan ketergantungan antarpekerjaan.

    Materi selesai
        ↓
    Slide dapat dibuat
        ↓
    Latihan disesuaikan
        ↓
    Kuis disusun

##### 6. Success Criteria

Success criteria menentukan kapan rencana dianggap berhasil.

Contoh:

-   total durasi tepat 120 menit;
-   peserta memperoleh satu aktivitas praktik;
-   semua sesi memiliki tujuan;
-   tidak ada kebutuhan alat yang melebihi fasilitas;
-   terdapat evaluasi akhir.

* * * * *

#### 2.4 Problem Decomposition

**Problem decomposition** adalah proses memecah tugas besar menjadi bagian yang lebih kecil, lebih jelas, dan dapat dikerjakan.

    Tugas besar:
    Menyelenggarakan workshop AI

    Subtugas:
    1. Menentukan profil peserta.
    2. Menentukan tujuan belajar.
    3. Memilih materi.
    4. Menentukan metode.
    5. Membuat jadwal.
    6. Menentukan kebutuhan fasilitas.
    7. Membuat latihan.
    8. Menyiapkan evaluasi.
    9. Memeriksa risiko.

Subtugas yang baik seharusnya:

-   memiliki tujuan yang jelas;
-   memiliki input;
-   menghasilkan output;
-   dapat dikerjakan;
-   dapat diperiksa;
-   tidak terlalu besar;
-   tidak terlalu kecil;
-   memiliki hubungan yang jelas dengan goal utama.

##### Subtugas Terlalu Besar

> “Selesaikan seluruh persiapan workshop.”

Subtugas ini masih terlalu luas.

##### Subtugas Terlalu Kecil

> “Tekan tombol Enter setelah menulis judul.”

Subtugas ini terlalu detail untuk planning tingkat modul.

##### Subtugas yang Lebih Baik

> “Buat outline materi yang mencakup pengertian AI, contoh penggunaan, risiko, dan latihan.”

* * * * *

#### 2.5 Hierarchical Planning

Planning dapat disusun dalam beberapa tingkat.

    Tujuan utama
    ├── Persiapan materi
    │   ├── Menentukan topik
    │   ├── Membuat contoh
    │   └── Membuat latihan
    ├── Persiapan teknis
    │   ├── Memeriksa ruangan
    │   ├── Memeriksa proyektor
    │   └── Menyiapkan demo offline
    └── Evaluasi
        ├── Membuat kuis
        └── Mengumpulkan feedback

Struktur hierarkis membantu AI dan manusia melihat hubungan antara tujuan besar dan pekerjaan kecil.

#### 2.6 Urutan dan Dependensi

Perhatikan rencana berikut:

    1. Mencetak sertifikat.
    2. Menentukan nama peserta.
    3. Membuka pendaftaran.

Urutannya salah. Nama peserta belum tersedia sebelum pendaftaran dibuka.

Urutan yang lebih tepat:

    1. Membuka pendaftaran.
    2. Mengumpulkan nama peserta.
    3. Memverifikasi kehadiran.
    4. Mencetak sertifikat.

Kesalahan dependensi dapat menghasilkan:

-   pekerjaan ulang;
-   waktu terbuang;
-   data tidak akurat;
-   output yang harus dibuat ulang;
-   konflik jadwal.

* * * * *

#### 2.7 Static Planning dan Dynamic Planning

##### Static Planning

Rencana statis dibuat di awal dan dijalankan tanpa perubahan.

    Plan → Step 1 → Step 2 → Step 3 → Result

Cocok ketika:

-   kondisi stabil;
-   data lengkap;
-   langkah sudah jelas;
-   risiko perubahan rendah;
-   tugas berulang dengan pola yang sama.

Contoh:

> Mengubah ukuran 20 gambar ke dimensi yang sama menggunakan satu proses otomatis.

##### Dynamic Planning

Rencana dinamis dapat diperbarui berdasarkan hasil atau informasi baru.

    Buat rencana
        ↓
    Jalankan langkah
        ↓
    Amati hasil
        ↓
    Apakah kondisi sesuai?
     ├── Ya → lanjut
     └── Tidak → ubah rencana

Contoh:

> Workshop direncanakan menggunakan demo online. Tiga puluh menit sebelum acara, internet tidak tersedia. Rencana perlu diperbarui menjadi demo offline atau simulasi berbasis tangkapan layar.

Replanning bukan selalu tanda kegagalan. Dalam lingkungan yang berubah, replanning justru dapat menunjukkan bahwa sistem menggunakan observation untuk menyesuaikan tindakan.

* * * * *

#### 2.8 Contoh Terurai — Merencanakan Workshop AI

##### Kondisi Awal

    Peserta: 50
    Durasi: 120 menit
    Mentor: 2
    Proyektor: 1
    Internet: tidak stabil
    Target: peserta memahami konsep dasar AI dan mencoba satu aktivitas

##### Goal

Menyelenggarakan workshop pengenalan AI selama 120 menit untuk 50 peserta pemula, dengan penjelasan konsep, demonstrasi, aktivitas praktik, dan evaluasi.

##### Constraints

-   total waktu tidak boleh melebihi 120 menit;
-   hanya tersedia satu proyektor;
-   internet tidak stabil;
-   hanya terdapat dua mentor;
-   seluruh peserta harus dapat mengikuti aktivitas.

##### Dekomposisi

1.  Pembukaan dan orientasi.
2.  Pengenalan konsep AI.
3.  Contoh penggunaan AI.
4.  Demonstrasi offline.
5.  Latihan kelompok.
6.  Pembahasan hasil.
7.  Kuis singkat.
8.  Penutup.

##### Jadwal

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Sesi
Durasi</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Pembukaan
10 menit</td>
<td align="left">Konsep dasar AI
25 menit</td>
</tr>
</tbody>
</table>

##### Dependensi

-   latihan harus dibuat setelah tujuan belajar ditentukan;
-   demo harus diuji sebelum acara;
-   kuis harus mengukur materi yang benar-benar disampaikan;
-   pembagian kelompok harus mempertimbangkan jumlah mentor.

##### Skenario Perubahan

> Proyektor tidak dapat digunakan selama 30 menit pertama.

##### Replanning

    Menit 0–10:
    Pembukaan tanpa proyektor.

    Menit 10–30:
    Diskusi contoh AI dari pengalaman peserta.

    Menit 30–50:
    Konsep dasar menggunakan papan tulis atau handout.

    Setelah proyektor tersedia:
    Demo dan materi visual dilanjutkan.

Rencana yang baik tidak hanya menyusun urutan ideal, tetapi juga mengenali titik yang mungkin gagal.

* * * * *

#### 2.9 Planning Failure

##### 1. Goal Terlalu Kabur

Tanpa target terukur, AI tidak tahu kapan rencana selesai.

##### 2. Subtugas Tidak Lengkap

Rencana melupakan evaluasi, izin, atau kebutuhan teknis.

##### 3. Dependensi Terlewat

Sertifikat dicetak sebelum peserta terverifikasi.

##### 4. Batasan Tidak Diperhitungkan

Total sesi menjadi 150 menit padahal ruangan hanya tersedia 120 menit.

##### 5. Rencana Terlalu Kaku

Rencana tetap memaksakan demo online meskipun internet mati.

##### 6. Terlalu Banyak Langkah

Rencana menjadi sangat detail hingga sulit digunakan.

##### 7. Tidak Ada Success Criteria

AI tidak dapat memeriksa apakah tujuan sudah tercapai.

##### 8. Tidak Mengantisipasi Risiko

Tidak ada alternatif ketika alat utama gagal.

##### 9. Tidak Memperbarui Rencana

Observation baru diabaikan.

* * * * *

#### 2.10 Cara Memeriksa Rencana AI

    □ Tujuan dapat diukur
    □ Kondisi awal sudah dicatat
    □ Batasan sudah dikenali
    □ Subtugas mencakup seluruh kebutuhan
    □ Subtugas memiliki output yang jelas
    □ Urutan mengikuti dependensi
    □ Total waktu dan sumber daya masuk akal
    □ Risiko penting sudah dipertimbangkan
    □ Rencana dapat diperbarui jika kondisi berubah
    □ Kriteria selesai sudah jelas

* * * * *

#### 2.11 Kapan Planning Diperlukan?

Planning diperlukan ketika:

-   tugas terdiri atas banyak langkah;
-   terdapat dependensi;
-   terdapat batasan waktu atau sumber daya;
-   hasil membutuhkan koordinasi;
-   tugas dapat berubah berdasarkan observation;
-   kegagalan satu langkah memengaruhi langkah lain.

Planning sederhana atau eksplisit tidak selalu diperlukan untuk:

-   jawaban fakta satu langkah;
-   formatting teks;
-   koreksi typo;
-   operasi yang sangat kecil dan langsung.

* * * * *

#### 2.12 Ringkasan Submateri

-   Planning mengubah tujuan menjadi urutan tindakan.
-   Goal, initial state, constraints, actions, dependencies, dan success criteria adalah komponen utama rencana.
-   Problem decomposition memecah tugas besar menjadi subtugas yang dapat dikerjakan.
-   Urutan harus mengikuti dependensi.
-   Static plan cocok untuk kondisi stabil.
-   Dynamic plan cocok untuk kondisi yang dapat berubah.
-   Rencana AI tetap harus diperiksa dari sisi kelengkapan, kelayakan, risiko, dan batasan.

* * * * *

## Submateri 3 — Chain-of-Thought dan Langkah Penyelesaian Terstruktur

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/04-full.html`

### Submateri 3 — Chain-of-Thought dan Langkah Penyelesaian Terstruktur

#### 3.1 Pembuka: Jawaban Akhir dan Langkah Perantara

Bandingkan dua jawaban berikut.

##### Jawaban Langsung

> “Anggaran cukup.”

##### Jawaban Terstruktur

> “Total konsumsi Rp2.100.000. Setelah ditambah biaya administrasi Rp250.000, total kebutuhan menjadi Rp2.350.000. Dari anggaran Rp3.000.000, tersisa Rp650.000. Jadi, anggaran cukup.”

Jawaban kedua lebih mudah diperiksa karena pengguna dapat melihat:

-   data yang dipakai;
-   operasi yang dilakukan;
-   hasil antara;
-   dasar kesimpulan.

#### 3.2 Apa Itu Chain-of-Thought?

**Chain-of-Thought (CoT)** adalah rangkaian langkah perantara berbentuk bahasa yang dihasilkan model sebelum atau bersama jawaban akhir.

    Pertanyaan
       ↓
    Langkah perantara
       ↓
    Pemeriksaan
       ↓
    Jawaban akhir

Penelitian Chain-of-Thought menunjukkan bahwa contoh yang berisi langkah reasoning perantara dapat meningkatkan performa model besar pada beberapa tugas aritmetika, commonsense, dan symbolic reasoning dalam eksperimen yang diuji [2].

> **Istilah yang disarankan untuk peserta:** “Langkah penyelesaian yang dapat diperiksa.”

CoT tidak boleh digambarkan sebagai:

-   isi pikiran rahasia AI;
-   rekaman lengkap proses mental;
-   bukti kesadaran;
-   jaminan bahwa alasan model benar.

#### 3.3 Bentuk Langkah Perantara

##### A. Langkah Aritmetika

    jumlah × harga
    → total biaya
    → tambah biaya lain
    → bandingkan dengan anggaran

##### B. Pelacakan Batasan

    durasi maksimal 120 menit
    → susun sesi
    → jumlahkan durasi
    → kurangi atau ubah sesi jika melebihi batas

##### C. Perbandingan Alternatif

    Alternatif A
    → kelebihan
    → kekurangan
    → risiko

    Alternatif B
    → kelebihan
    → kekurangan
    → risiko

##### D. Multi-Hop Reasoning

    Informasi A berhubungan dengan B
    B berhubungan dengan C
    hubungan A dan C diperiksa melalui B

##### E. Troubleshooting

    Gejala
    → kemungkinan penyebab
    → pemeriksaan
    → hasil pemeriksaan
    → penyebab berikutnya atau solusi

* * * * *

#### 3.4 Zero-Shot dan Few-Shot Chain-of-Thought

##### Zero-Shot Structured Instruction

Pengguna meminta penyelesaian bertahap tanpa memberi contoh.

    Identifikasi tujuan dan data penting.
    Susun langkah penyelesaian.
    Kerjakan langkah tersebut.
    Periksa hasilnya.
    Berikan jawaban akhir secara ringkas.

Penelitian Zero-Shot-CoT menunjukkan bahwa instruksi sederhana yang mendorong penyelesaian bertahap dapat meningkatkan performa pada sejumlah benchmark reasoning untuk model yang diuji [3].

##### Few-Shot Chain-of-Thought

Prompt memberikan contoh soal dan langkah penyelesaiannya, lalu meminta model menyelesaikan soal baru menggunakan pola serupa.

    Contoh 1:
    Pertanyaan → langkah → jawaban

    Contoh 2:
    Pertanyaan → langkah → jawaban

    Tugas baru:
    Pertanyaan → model melanjutkan pola

Kualitas contoh sangat penting. Contoh yang salah, tidak relevan, atau terlalu berbeda dapat mengarahkan model ke pola yang buruk.

* * * * *

#### 3.5 CoT Bukan Sekadar Penjelasan Panjang

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Penjelasan Panjang
Langkah Terstruktur</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Banyak kalimat
Setiap langkah memiliki fungsi</td>
<td align="left">Dapat berulang
Ringkas dan berurutan</td>
</tr>
</tbody>
</table>

Langkah terstruktur yang baik seharusnya:

-   relevan terhadap tugas;
-   mengikuti urutan;
-   menggunakan data yang tersedia;
-   menyatakan asumsi penting;
-   tidak berulang;
-   menghasilkan output yang dapat diperiksa;
-   berakhir pada jawaban yang jelas.

* * * * *

#### 3.6 Contoh Terurai 1 — Anggaran

##### Data

    Peserta: 80
    Biaya konsumsi: Rp27.500 per peserta
    Transportasi: Rp350.000
    Anggaran: Rp3.000.000

##### Langkah

    1. Hitung konsumsi:
       80 × Rp27.500 = Rp2.200.000

    2. Tambahkan transportasi:
       Rp2.200.000 + Rp350.000 = Rp2.550.000

    3. Hitung sisa:
       Rp3.000.000 − Rp2.550.000 = Rp450.000

    4. Kesimpulan:
       Anggaran cukup dengan sisa Rp450.000.

##### Contoh Kesalahan

    80 × Rp27.500 = Rp2.020.000

Meskipun struktur langkahnya terlihat benar, hasil perkalian salah. Inilah alasan CoT tetap perlu diverifikasi.

* * * * *

#### 3.7 Contoh Terurai 2 — Rencana Belajar Python

##### Kasus

> Peserta pemula memiliki waktu satu jam per hari dan ingin belajar Python selama dua minggu.

##### Langkah Terstruktur

1.  Identifikasi kemampuan awal.
2.  Tentukan hasil yang realistis untuk 14 jam belajar.
3.  Pilih materi minimum:
4.  sintaks dasar;
5.  variabel dan tipe data;
6.  kondisi;
7.  perulangan;
8.  fungsi;
9.  struktur data sederhana.
10. Sisipkan praktik setiap hari.
11. Sisakan satu hari untuk proyek kecil.
12. Sisakan satu hari untuk evaluasi dan perbaikan.
13. Periksa agar durasi setiap hari tidak melebihi satu jam.

CoT tidak hanya berguna untuk soal matematika. Langkah perantara juga dapat membantu tugas perencanaan, analisis, perbandingan, dan troubleshooting.

* * * * *

#### 3.8 Kapan Chain-of-Thought Berguna?

CoT atau langkah terstruktur dapat berguna pada:

-   masalah multi-langkah;
-   perhitungan;
-   perencanaan;
-   analisis perbandingan;
-   tugas dengan banyak batasan;
-   troubleshooting;
-   pemeriksaan konsistensi;
-   evaluasi beberapa alternatif.

#### 3.9 Kapan Chain-of-Thought Tidak Perlu Dipaksakan?

CoT tidak selalu diperlukan pada:

-   pertanyaan fakta sederhana;
-   terjemahan satu kalimat;
-   perbaikan typo;
-   perubahan format;
-   jawaban satu langkah;
-   kondisi ketika pengguna hanya membutuhkan hasil sangat ringkas.

Penjelasan yang terlalu panjang dapat:

-   memperlambat respons;
-   menambah token;
-   menambah peluang kesalahan;
-   mengaburkan jawaban utama;
-   membuat pengguna sulit menemukan hasil.

* * * * *

#### 3.10 Faithfulness: Apakah Langkah AI Selalu Menunjukkan Proses yang Sebenarnya?

Teks langkah penyelesaian yang dihasilkan model tidak selalu menjadi gambaran lengkap atau setia dari seluruh faktor yang memengaruhi jawabannya.

Penelitian tentang *unfaithful explanations* menunjukkan bahwa model dapat dipengaruhi petunjuk bias dalam prompt tanpa menyebutkan pengaruh tersebut dalam penjelasan, bahkan dapat membuat alasan yang merasionalisasi jawaban salah [7].

Kemungkinan yang perlu dipahami:

-   model menghasilkan alasan setelah memilih jawaban;
-   model mengikuti pola penjelasan yang terdengar masuk akal;
-   petunjuk tertentu memengaruhi jawaban tetapi tidak diakui;
-   langkah terlihat benar, tetapi hasil salah;
-   hasil benar, tetapi sebagian langkah tidak valid.

> **Prinsip penting:** Chain-of-Thought membantu struktur dan pemeriksaan, tetapi bukan bukti mutlak bahwa model benar-benar menggunakan alasan yang ditampilkan.

* * * * *

#### 3.11 Pola Prompt Praktis

##### Template Lengkap

    Tugas:
    [masukkan masalah]

    Kerjakan dengan format:
    1. Tujuan
    2. Informasi yang tersedia
    3. Informasi yang belum tersedia
    4. Batasan atau asumsi
    5. Langkah penyelesaian utama
    6. Pemeriksaan
    7. Jawaban akhir

##### Template Ringkas

    Berikan langkah utama yang dapat diverifikasi,
    kemudian tampilkan jawaban akhir secara ringkas.

##### Template Perbandingan

    Bandingkan alternatif A dan B berdasarkan:
    - manfaat;
    - biaya;
    - risiko;
    - batasan;
    - rekomendasi akhir.

##### Template Verifikasi

    Periksa kembali jawaban berikut.
    Cari kesalahan data, asumsi, urutan, perhitungan,
    dan kesimpulan. Tulis hanya perbaikan yang diperlukan.

Hindari instruksi:

> “Ungkapkan seluruh pikiran internalmu.”

Fokus pembelajaran sebaiknya pada **langkah utama yang dapat diverifikasi**, bukan klaim akses ke proses internal model.

* * * * *

#### 3.12 Cara Memeriksa CoT

    □ Setiap langkah relevan terhadap tujuan
    □ Data yang digunakan tersedia
    □ Asumsi disebutkan
    □ Urutan langkah benar
    □ Tidak ada langkah yang hilang
    □ Perhitungan dapat diulang
    □ Tidak ada kontradiksi
    □ Kesimpulan mengikuti langkah
    □ Jawaban akhir mudah ditemukan
    □ Penjelasan tidak terlalu panjang

* * * * *

#### 3.13 Ringkasan Submateri

-   CoT adalah rangkaian langkah perantara berbentuk bahasa.
-   CoT dapat membantu tugas bertahap dan membuat jawaban lebih mudah diperiksa.
-   Zero-shot CoT menggunakan instruksi bertahap tanpa contoh.
-   Few-shot CoT menggunakan contoh langkah penyelesaian.
-   CoT bukan sekadar penjelasan panjang.
-   CoT tidak menjamin jawaban benar.
-   CoT tidak selalu menjadi penjelasan setia tentang seluruh faktor internal model.
-   Gunakan langkah utama yang dapat diverifikasi dan jawaban akhir yang jelas.

* * * * *

## Submateri 4 — Tool Use: Ketika AI Membutuhkan Alat Eksternal

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/05-full.html`

### Submateri 4 — Tool Use: Ketika AI Membutuhkan Alat Eksternal

#### 4.1 Pembuka: Model Tidak Memiliki Semua Data dan Kemampuan

Pengguna dapat meminta AI:

-   mengetahui cuaca hari ini;
-   membaca spreadsheet;
-   menghitung statistik ribuan data;
-   memeriksa isi dokumen;
-   mencari slot kalender;
-   menjalankan kode;
-   mengirim email.

Sebagian tugas tersebut tidak dapat diselesaikan secara andal hanya dengan menghasilkan teks dari parameter model.

**Tool use** memungkinkan sistem AI menggunakan alat atau layanan eksternal, menerima hasilnya, lalu menggunakan hasil tersebut untuk melanjutkan tugas.

Toolformer mempelajari kapan tool perlu dipanggil, tool apa yang digunakan, argumen apa yang diberikan, dan bagaimana hasil tool dimasukkan ke generasi berikutnya [4]. ReAct menggabungkan reasoning dan tindakan secara bergantian sehingga hasil tindakan dapat memengaruhi rencana berikutnya [5].

* * * * *

#### 4.2 Mengapa AI Membutuhkan Tool?

##### A. Informasi Tidak Selalu Terbaru

Model mungkin tidak memiliki:

-   cuaca hari ini;
-   harga saat ini;
-   jadwal terbaru;
-   berita terbaru;
-   status server;
-   stok produk.

Informasi semacam itu memerlukan sumber aktual.

##### B. Perhitungan Tidak Selalu Presisi

LLM dapat salah dalam:

-   aritmetika panjang;
-   statistik;
-   pengolahan ribuan data;
-   konversi berulang;
-   agregasi tabel.

Kalkulator, spreadsheet, atau Python lebih tepat untuk eksekusi deterministik.

##### C. Data Pengguna Tidak Ada dalam Prompt

AI memerlukan tool untuk mengakses:

-   file;
-   spreadsheet;
-   email;
-   kalender;
-   database;
-   dokumen organisasi.

##### D. Tindakan Tidak Dapat Dilakukan Hanya dengan Teks

Mengatakan “email sudah dikirim” berbeda dari benar-benar memanggil layanan email.

Tool diperlukan untuk:

-   membuat agenda;
-   mengirim email;
-   menyimpan file;
-   memperbarui data;
-   menjalankan kode;
-   mengambil informasi dari aplikasi lain.

* * * * *

#### 4.3 Jenis-Jenis Tool

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Kebutuhan
Tool
Contoh Output</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Perhitungan
Calculator
Hasil aritmetika</td>
<td align="left">Analisis data
Python
Statistik dan transformasi</td>
<td align="left">Data tabel
Spreadsheet
Filter, rata-rata, agregasi</td>
</tr>
</tbody>
</table>

* * * * *

#### 4.4 Siklus Tool Use

    REASON
    Memahami kebutuhan
       ↓
    PLAN
    Menentukan data dan tool
       ↓
    ACT
    Memanggil tool
       ↓
    OBSERVE
    Membaca hasil
       ↓
    VALIDATE
    Memeriksa hasil
       ↓
    UPDATE
    Mengubah rencana jika perlu
       ↓
    ANSWER
    Menyampaikan hasil

##### Reason

AI menentukan apakah informasi di dalam prompt sudah cukup.

##### Plan

AI menentukan data apa yang dibutuhkan dan tool apa yang paling sesuai.

##### Act

AI menyiapkan tool call beserta parameter.

##### Observe

Tool mengembalikan hasil atau error.

##### Validate

AI memeriksa kelengkapan, format, satuan, dan konsistensi.

##### Update

Rencana diperbarui jika hasil belum cukup atau tool gagal.

##### Answer

AI menyampaikan hasil berdasarkan observation yang benar-benar diterima.

* * * * *

#### 4.5 Memilih Tool

Gunakan pertanyaan berikut:

1.  Apa tujuan tugas?
2.  Data apa yang dibutuhkan?
3.  Apakah data sudah tersedia dalam prompt?
4.  Apakah data dapat berubah?
5.  Apakah tugas membutuhkan presisi?
6.  Tool mana yang paling sesuai?
7.  Apakah pengguna memberikan izin?
8.  Apa dampak tindakan tool?

##### Contoh Pemilihan Buruk

    Tugas:
    Menghitung rata-rata 10.000 nilai.

    Pilihan buruk:
    Menghitung melalui generasi teks satu per satu.

##### Pilihan Lebih Baik

    Gunakan spreadsheet atau Python untuk:
    - membaca kolom;
    - membersihkan data;
    - menghitung jumlah data valid;
    - menghitung rata-rata.

* * * * *

#### 4.6 Tool Call dan Parameter

Tool call biasanya memiliki:

-   nama tool;
-   parameter;
-   format input;
-   batasan;
-   output.

##### Contoh Kalkulator

    Tool:
    calculator

    Input:
    (80 × 27500) + 350000

    Output:
    2550000

##### Contoh Kalender

    Tool:
    calendar.search

    Input:
    - tanggal mulai;
    - tanggal akhir;
    - durasi dua jam;
    - zona waktu;
    - kalender yang diperiksa.

    Output:
    daftar slot kosong

Parameter yang salah dapat menghasilkan output yang salah meskipun tool bekerja dengan benar.

Contoh:

-   tanggal salah;
-   zona waktu salah;
-   kolom spreadsheet salah;
-   satuan meter dibaca kilometer;
-   filter data tidak lengkap.

* * * * *

#### 4.7 Observation

**Observation** adalah hasil yang dikembalikan tool kepada AI.

Observation dapat berupa:

-   data;
-   daftar hasil;
-   nilai numerik;
-   file;
-   status berhasil;
-   status gagal;
-   permission denied;
-   data kosong;
-   format tidak dikenal.

##### Contoh Observation yang Tidak Sesuai Harapan

    Tool result:
    File tidak memiliki kolom “nilai akhir”.

AI tidak boleh mengarang rata-rata.

Respons yang lebih tepat:

> “Kolom ‘nilai akhir’ tidak ditemukan. File memiliki kolom ‘nilai tugas’ dan ‘nilai kuis’. Saya perlu mengetahui kolom mana yang ingin digunakan.”

* * * * *

#### 4.8 Contoh Terurai 1 — Spreadsheet

##### Tugas

> Hitung rata-rata nilai peserta dari spreadsheet.

##### Reason

Data nilai berada di file, bukan di prompt.

##### Plan

1.  Buka file.
2.  Temukan sheet yang relevan.
3.  Identifikasi kolom nilai.
4.  Periksa data kosong.
5.  Periksa nilai nonnumerik.
6.  Hitung jumlah data valid.
7.  Hitung rata-rata.
8.  Laporkan data yang tidak digunakan.

##### Observation

    Jumlah baris: 50
    Nilai valid: 47
    Nilai kosong: 2
    Nilai tidak valid: 1
    Rata-rata nilai valid: 82,4

##### Jawaban

> “Dari 50 baris data, terdapat 47 nilai valid. Rata-rata nilai valid adalah 82,4. Dua nilai kosong dan satu nilai tidak valid tidak dimasukkan dalam perhitungan.”

Jawaban ini lebih baik daripada hanya menyebut “82,4” karena menjelaskan kualitas data.

* * * * *

#### 4.9 Contoh Terurai 2 — Informasi Terbaru

##### Tugas

> “Bagaimana cuaca hari ini?”

AI memerlukan:

-   lokasi;
-   tanggal;
-   sumber cuaca aktual;
-   satuan yang sesuai.

Jika lokasi tidak diketahui, AI tidak boleh menebak.

Alur:

    Reason:
    Informasi cuaca berubah dan membutuhkan lokasi.

    Plan:
    1. Dapatkan lokasi.
    2. Panggil weather tool.
    3. Baca kondisi dan waktu data.
    4. Sampaikan hasil.

    Act:
    Panggil weather tool.

    Observe:
    Data cuaca aktual.

    Answer:
    Sampaikan suhu, kondisi, dan waktu pembaruan.

* * * * *

#### 4.10 Contoh Terurai 3 — Kalender

##### Tugas

> “Cari waktu rapat dua jam minggu depan.”

AI perlu:

1.  menentukan tanggal “minggu depan” berdasarkan zona waktu;
2.  membaca kalender;
3.  menemukan slot dua jam;
4.  menghindari konflik;
5.  menampilkan satu atau beberapa alternatif.

Perlu membedakan:

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Read Action
Write Action</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Melihat jadwal
Membuat event</td>
<td align="left">Mencari slot kosong
Mengubah waktu rapat</td>
</tr>
</tbody>
</table>

Jika pengguna hanya meminta rekomendasi, AI tidak boleh langsung membuat event tanpa izin.

* * * * *

#### 4.11 Permission dan Otorisasi

##### Low Impact

-   menggunakan kalkulator;
-   mencari informasi publik;
-   membaca data yang diberikan dalam prompt.

##### Medium Impact

-   membaca kalender;
-   membaca dokumen pribadi;
-   membuat draft email;
-   menganalisis file pengguna.

##### High Impact

-   mengirim email;
-   menghapus data;
-   melakukan transaksi;
-   mengubah jadwal;
-   memublikasikan informasi;
-   mengubah konfigurasi sistem.

> **Prinsip:** Semakin besar dampak tindakan, semakin penting persetujuan, konfirmasi, dan batas otorisasi.

* * * * *

#### 4.12 Tool Errors

##### 1. Tool Tidak Tersedia

AI harus menjelaskan keterbatasan, bukan berpura-pura telah menggunakan tool.

##### 2. Parameter Salah

AI harus memperbaiki input atau meminta informasi.

##### 3. Data Kosong

AI harus menyatakan bahwa data tidak ditemukan.

##### 4. Format Berubah

AI perlu mengenali struktur baru sebelum memproses.

##### 5. Network Error

AI tidak boleh menyatakan tindakan berhasil.

##### 6. Permission Denied

AI harus menyebut akses ditolak.

##### 7. Data Kedaluwarsa

AI perlu memeriksa waktu pembaruan.

##### 8. Hasil Ambigu

AI perlu membandingkan atau meminta klarifikasi.

##### 9. Salah Membaca Output

Kesalahan dapat terjadi setelah tool memberikan data benar.

##### 10. Menjawab Seolah Tool Berhasil

Ini adalah kegagalan serius karena jawaban tidak sesuai observation.

###### Contoh

    Tool error:
    Permission denied.

Respons salah:

> “Email berhasil dikirim.”

Respons benar:

> “Email belum terkirim karena akses pengiriman ditolak.”

* * * * *

#### 4.13 Output Tool Bukan Kebenaran Mutlak

Tool dapat memiliki:

-   input salah;
-   data lama;
-   bug;
-   hasil parsial;
-   unit berbeda;
-   izin terbatas;
-   sumber yang kurang tepercaya.

Gunakan checklist:

    □ Tool sesuai dengan tugas
    □ Parameter benar
    □ Rentang data benar
    □ Zona waktu benar
    □ Satuan konsisten
    □ Output lengkap
    □ Tidak ada error tersembunyi
    □ Data masih aktual
    □ Hasil sesuai dengan tujuan
    □ Tindakan memiliki izin

* * * * *

#### 4.14 Kapan Tool Diperlukan?

Gunakan tool ketika:

-   informasi berubah dari waktu ke waktu;
-   data tidak tersedia di konteks;
-   perhitungan membutuhkan presisi;
-   jumlah data besar;
-   tugas membutuhkan eksekusi;
-   pengguna meminta akses ke aplikasi atau file;
-   hasil perlu diverifikasi dengan sistem eksternal.

Tool tidak selalu diperlukan ketika:

-   informasi sudah tersedia;
-   tugas hanya meminta penulisan ulang;
-   pertanyaan konseptual stabil;
-   tugas sederhana dapat diselesaikan langsung;
-   penggunaan tool tidak menambah akurasi.

* * * * *

#### 4.15 Ringkasan Submateri

-   Tool use memperluas kemampuan AI di luar generasi teks.
-   AI harus menentukan apakah tool benar-benar diperlukan.
-   Pemilihan tool dan parameter sama pentingnya dengan kemampuan tool.
-   Observation harus dibaca dan divalidasi.
-   Tool dapat gagal dan output tool juga dapat salah.
-   Read action dan write action memiliki tingkat dampak berbeda.
-   Tindakan berdampak tinggi memerlukan izin dan kontrol lebih kuat.
-   Jawaban AI harus sesuai dengan hasil tool yang benar-benar diterima.

* * * * *

## Integrasi — Reason, Plan, Act, Observe, Update, Answer

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/06-full.html`

### Integrasi — Reason, Plan, Act, Observe, Update, Answer

#### 5.1 Model Terpadu

Keempat submateri dapat digabungkan ke dalam satu siklus:

    REASON
    Apa tujuan, informasi, dan batasannya?
            ↓
    PLAN
    Langkah dan tool apa yang diperlukan?
            ↓
    ACT
    Jalankan langkah atau panggil tool
            ↓
    OBSERVE
    Baca hasil tindakan atau tool
            ↓
    UPDATE
    Apakah pemahaman atau rencana perlu diubah?
            ↓
    ANSWER
    Sampaikan hasil, asumsi, dan keterbatasan

Alur tersebut tidak selalu linear.

    Reason
    → Plan
    → Act
    → Observe
    → Plan ulang
    → Act lagi
    → Observe
    → Answer

ReAct menunjukkan pola interleaving antara reasoning dan tindakan: reasoning membantu melacak serta memperbarui rencana, sedangkan tindakan memperoleh informasi dari lingkungan atau sumber eksternal [5].

* * * * *

#### 5.2 Studi Kasus Terpadu — Anggaran Berdasarkan Spreadsheet

##### Tugas

> Berdasarkan data peserta dalam spreadsheet, hitung kebutuhan konsumsi, bandingkan dengan anggaran, lalu berikan rekomendasi.

##### Data Awal

    Anggaran: Rp5.000.000
    Harga konsumsi: Rp32.000
    Biaya transportasi: Rp450.000
    Jumlah peserta: berada di spreadsheet

##### Reason

-   jumlah peserta belum diketahui;
-   data berada di spreadsheet;
-   data mungkin memiliki duplikasi;
-   total biaya harus dibandingkan dengan anggaran;
-   jawaban perlu menyatakan asumsi dan kualitas data.

##### Plan

1.  Buka spreadsheet.
2.  Identifikasi sheet dan kolom peserta.
3.  Hitung seluruh data.
4.  Periksa data kosong.
5.  Periksa peserta ganda.
6.  Hitung peserta valid.
7.  Hitung biaya konsumsi.
8.  Tambahkan transportasi.
9.  Bandingkan dengan anggaran.
10. Buat rekomendasi.

##### Act

Gunakan spreadsheet atau Python.

##### Observe

    Peserta terdaftar: 130
    Data ganda: 5
    Data kosong: 0
    Peserta valid: 125

##### Update

Rencana perhitungan menggunakan 125 peserta valid, bukan 130 baris mentah.

##### Calculation

    Konsumsi:
    125 × Rp32.000 = Rp4.000.000

    Total:
    Rp4.000.000 + Rp450.000 = Rp4.450.000

    Sisa:
    Rp5.000.000 − Rp4.450.000 = Rp550.000

##### Answer

> Berdasarkan 125 peserta valid, total kebutuhan adalah Rp4.450.000. Anggaran mencukupi dengan sisa Rp550.000. Perhitungan mengecualikan lima data peserta yang terdeteksi ganda.

##### Mengapa Jawaban Ini Lebih Baik?

Jawaban tersebut menjelaskan:

-   sumber data;
-   pembersihan data;
-   jumlah peserta valid;
-   perhitungan;
-   sisa anggaran;
-   asumsi yang digunakan.

Kualitas hasil tidak berasal dari CoT saja. Kualitas berasal dari gabungan:

-   pemahaman tujuan;
-   planning;
-   pemilihan tool;
-   validasi data;
-   perhitungan;
-   pemeriksaan;
-   komunikasi hasil.

* * * * *

#### 5.3 Checklist Akhir

    Sebelum menerima jawaban AI, periksa:

    □ Tujuan dipahami dengan benar
    □ Informasi relevan sudah digunakan
    □ Informasi yang hilang dikenali
    □ Fakta dan asumsi dibedakan
    □ Masalah dipecah menjadi langkah
    □ Urutan mengikuti dependensi
    □ Tool dipilih dengan tepat
    □ Parameter tool sesuai
    □ Observation dibaca dengan benar
    □ Output tool divalidasi
    □ Rencana diperbarui bila diperlukan
    □ Jawaban akhir menjelaskan hasil
    □ Keterbatasan disebutkan
    □ Tindakan memiliki izin

* * * * *

### Evaluasi Akhir Modul

#### Studi Kasus

Sebuah tim fellowship ingin menyelenggarakan kelas AI untuk 75 peserta. Data kehadiran berada di spreadsheet. Anggaran tersedia Rp4.000.000. Konsumsi berharga Rp38.000 per peserta. Ruangan hanya dapat digunakan selama 120 menit dan proyektor tidak tersedia selama 20 menit pertama.

Susun analisis dengan format:

1.  **Reason**
2.  tujuan;
3.  data tersedia;
4.  data hilang;
5.  asumsi;
6.  batasan.

7.  **Plan**

8.  subtugas;
9.  dependensi;
10. urutan;
11. success criteria;
12. rencana cadangan.

13. **Tool**

14. tool yang diperlukan;
15. parameter;
16. izin;
17. hasil yang diharapkan.

18. **Observe**

19. cara membaca hasil;
20. cara menangani data kosong atau ganda.

21. **Update**

22. perubahan rencana jika jumlah peserta valid berbeda;
23. perubahan jadwal karena proyektor.

24. **Answer**

25. kesimpulan anggaran;
26. sisa atau kekurangan;
27. rekomendasi;
28. asumsi dan keterbatasan.

* * * * *

### Glosarium

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Istilah
Pengertian</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Reasoning
Proses menghubungkan informasi untuk menghasilkan kesimpulan atau langkah</td>
<td align="left">Planning
Proses mengubah tujuan menjadi urutan tindakan</td>
</tr>
</tbody>
</table>

* * * * *

### Referensi

1.  Wang, L., Xu, W., Lan, Y., Hu, Z., Lan, Y., Lee, R. K.-W., & Lim, E.-P. (2023). **Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models.** arXiv:2305.04091.
     https://arxiv.org/abs/2305.04091

2.  Wei, J., Wang, X., Schuurmans, D., Bosma, M., Ichter, B., Xia, F., Chi, E. H., Le, Q. V., & Zhou, D. (2022). **Chain-of-Thought Prompting Elicits Reasoning in Large Language Models.** arXiv:2201.11903.
     https://arxiv.org/abs/2201.11903

3.  Kojima, T., Gu, S. S., Reid, M., Matsuo, Y., & Iwasawa, Y. (2022). **Large Language Models are Zero-Shot Reasoners.** arXiv:2205.11916.
     https://arxiv.org/abs/2205.11916

4.  Schick, T., Dwivedi-Yu, J., Dessì, R., Raileanu, R., Lomeli, M., Zettlemoyer, L., Cancedda, N., & Scialom, T. (2023). **Toolformer: Language Models Can Teach Themselves to Use Tools.** arXiv:2302.04761.
     https://arxiv.org/abs/2302.04761

5.  Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2022). **ReAct: Synergizing Reasoning and Acting in Language Models.** arXiv:2210.03629.
     https://arxiv.org/abs/2210.03629

6.  Mialon, G., Dessì, R., Lomeli, M., Nalmpantis, C., Pasunuru, R., Raileanu, R., Rozière, B., Schick, T., Dwivedi-Yu, J., Celikyilmaz, A., Grave, E., LeCun, Y., & Scialom, T. (2023). **Augmented Language Models: a Survey.** arXiv:2302.07842.
     https://arxiv.org/abs/2302.07842

7.  Turpin, M., Michael, J., Perez, E., & Bowman, S. R. (2023). **Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting.** arXiv:2305.04388.
     https://arxiv.org/abs/2305.04388

* * * * *

### Catatan Implementasi HerAI

Dokumen ini berisi **isi pembelajaran**, bukan instruksi implementasi kode.

Struktur integrasi yang direkomendasikan:

    Reasoning
    ├── how-ai-reasons
    │   ├── materi
    │   ├── latihan
    │   ├── kuis
    │   └── diskusi
    ├── planning-and-decomposition
    │   ├── materi
    │   ├── latihan
    │   ├── kuis
    │   └── diskusi
    ├── chain-of-thought
    │   ├── materi
    │   ├── latihan
    │   ├── kuis
    │   └── diskusi
    └── tool-use
        ├── materi
        ├── latihan
        ├── kuis
        └── diskusi

Planning dan tool use pada modul ini dibatasi sebagai fondasi konseptual. Implementasi teknis seperti planner–executor, function calling schema, tool registry, retry, memory, orchestration, sandbox, dan guardrail lanjutan tetap menjadi ruang lingkup course **Agentic AI**.

## 1.13 Diskusi

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/discussion-source-full.html`

#### 1.13 Diskusi

##### Topik

**Apakah AI yang dapat memberikan alasan runtut berarti benar-benar memahami masalah?**

##### Pertanyaan Pemandu

1.  Apa perbedaan antara jawaban benar dan proses yang benar?
2.  Dapatkah AI memperoleh jawaban benar melalui pola atau kebetulan?
3.  Mengapa bahasa yang percaya diri dapat membuat kesalahan AI lebih berbahaya?
4.  Dalam situasi apa pemeriksaan manusia wajib dilakukan?
5.  Apakah semua asumsi AI perlu ditampilkan?
6.  Bagaimana cara menyeimbangkan penjelasan dan jawaban yang tetap ringkas?

##### Refleksi Pribadi

Ceritakan satu pengalaman ketika jawaban AI terdengar meyakinkan tetapi setelah diperiksa ternyata salah atau tidak lengkap.

##### Tanggapan kepada Peserta Lain

Pilih satu pengalaman peserta lain. Berikan satu pertanyaan kritis yang dapat membantu mereka memeriksa penyebab kesalahan AI.

* * * * *

#### 2.15 Diskusi

##### Topik

**Apakah AI sebaiknya mempertahankan rencana awal atau terus menyesuaikan rencana?**

##### Pertanyaan Pemandu

1.  Apa keuntungan rencana yang stabil?
2.  Apa risiko rencana yang terlalu kaku?
3.  Kapan perubahan rencana membutuhkan persetujuan manusia?
4.  Berapa biaya yang dapat muncul karena terlalu sering melakukan replanning?
5.  Bagaimana AI membedakan perubahan penting dan gangguan kecil?
6.  Apakah setiap rencana perlu memiliki rencana cadangan?

##### Refleksi Pribadi

Pilih satu kegiatan yang pernah kamu rencanakan. Jelaskan satu perubahan kondisi yang memaksamu mengubah rencana.

##### Tanggapan kepada Peserta Lain

Berikan satu saran untuk membuat rencana peserta lain lebih tahan terhadap perubahan.

* * * * *

#### 3.16 Diskusi

##### Topik

**Haruskah AI selalu menampilkan langkah penyelesaiannya?**

##### Pertanyaan Pemandu

1.  Apakah penjelasan meningkatkan kepercayaan atau dapat menciptakan kepercayaan palsu?
2.  Kapan pengguna hanya membutuhkan jawaban akhir?
3.  Bagaimana menjaga transparansi tanpa membanjiri pengguna?
4.  Siapa yang bertanggung jawab memverifikasi langkah?
5.  Apakah langkah boleh disederhanakan?
6.  Apakah penjelasan yang panjang selalu lebih baik?

##### Refleksi Pribadi

Pilih satu tugas yang menurutmu membutuhkan langkah terstruktur dan satu tugas yang tidak membutuhkannya. Jelaskan alasanmu.

##### Tanggapan kepada Peserta Lain

Tinjau pilihan peserta lain. Tanyakan apakah ada batasan tugas yang dapat mengubah kebutuhan CoT.

* * * * *

#### 4.18 Diskusi

##### Topik

**Seberapa jauh AI boleh menggunakan tool dan mengambil tindakan atas nama pengguna?**

##### Pertanyaan Pemandu

1.  Apa perbedaan antara membaca data dan mengubah data?
2.  Tindakan apa yang harus selalu memerlukan persetujuan?
3.  Bagaimana menjaga privasi ketika AI membaca dokumen pribadi?
4.  Siapa yang bertanggung jawab jika AI salah mengirim email?
5.  Apakah setiap tool call perlu dicatat?
6.  Bagaimana menyeimbangkan kenyamanan dan kontrol pengguna?

##### Refleksi Pribadi

Pilih satu aktivitas digital yang bersedia kamu delegasikan kepada AI dan satu aktivitas yang tidak ingin kamu delegasikan. Jelaskan alasannya.

##### Tanggapan kepada Peserta Lain

Tinjau batas otorisasi yang dibuat peserta lain. Berikan satu risiko yang mungkin belum mereka pertimbangkan.

* * * * *

## 1.11 Latihan

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/practice-full.html`

#### 1.11 Latihan

##### Latihan 1 — Fakta atau Asumsi?

Kasus:

> Sebuah kelas memiliki 40 peserta. Biaya modul Rp20.000 per orang. Panitia menyiapkan anggaran Rp1.000.000. AI menghitung seluruh peserta memperoleh satu modul.

Klasifikasikan pernyataan berikut:

1.  Peserta berjumlah 40 orang.
2.  Biaya modul Rp20.000 per orang.
3.  Semua peserta memperoleh satu modul.
4.  Total biaya modul Rp800.000.
5.  Anggaran cukup.

###### Pembahasan

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Pernyataan
Kategori</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Peserta berjumlah 40 orang
Fakta</td>
<td align="left">Biaya modul Rp20.000 per orang
Fakta</td>
</tr>
</tbody>
</table>

##### Latihan 2 — Urutkan Langkah

Urutkan langkah berikut:

-   bandingkan total kebutuhan dengan anggaran;
-   hitung sisa anggaran;
-   identifikasi jumlah peserta;
-   hitung total konsumsi;
-   identifikasi harga per peserta.

###### Pembahasan

    1. Identifikasi jumlah peserta.
    2. Identifikasi harga per peserta.
    3. Hitung total konsumsi.
    4. Bandingkan total kebutuhan dengan anggaran.
    5. Hitung sisa anggaran.

##### Latihan 3 — Temukan Kesalahan

Jawaban AI:

> “Untuk 50 peserta dengan harga Rp25.000 per orang dan biaya sewa Rp400.000, total kebutuhannya adalah Rp1.250.000. Anggaran Rp1.500.000 berarti tersisa Rp250.000.”

###### Pembahasan

AI melupakan biaya sewa.

    Konsumsi:
    50 × Rp25.000 = Rp1.250.000

    Total:
    Rp1.250.000 + Rp400.000 = Rp1.650.000

    Kekurangan:
    Rp1.650.000 − Rp1.500.000 = Rp150.000

##### Latihan 4 — Prioritas Nonnumerik

Urutkan pekerjaan berikut:

-   memperbaiki tombol pembayaran yang gagal;
-   mengubah warna kartu;
-   menambah ilustrasi kosong.

###### Pembahasan

Tombol pembayaran harus diprioritaskan karena memengaruhi fungsi dan transaksi utama. Perubahan visual dapat dikerjakan setelah fungsi kritis stabil.

* * * * *

#### 2.13 Latihan

##### Latihan 1 — Pecah Tujuan

Tugas:

> Buat program mentoring AI selama empat minggu untuk peserta pemula.

Buat 6–10 subtugas.

###### Contoh Pembahasan

1.  Mengidentifikasi kemampuan awal peserta.
2.  Menentukan tujuan empat minggu.
3.  Membagi materi per minggu.
4.  Menentukan mentor.
5.  Menyiapkan contoh dan latihan.
6.  Menentukan jadwal.
7.  Menyiapkan kanal diskusi.
8.  Membuat evaluasi mingguan.
9.  Membuat proyek akhir.
10. Mengumpulkan feedback.

##### Latihan 2 — Temukan Dependensi

Urutkan:

-   melakukan evaluasi akhir;
-   menetapkan tujuan belajar;
-   membuat latihan;
-   memilih materi;
-   menjalankan sesi.

###### Pembahasan

    1. Menetapkan tujuan belajar.
    2. Memilih materi.
    3. Membuat latihan.
    4. Menjalankan sesi.
    5. Melakukan evaluasi akhir.

##### Latihan 3 — Replanning

Rencana awal menggunakan laboratorium komputer. Pada hari pelaksanaan, setengah komputer tidak dapat digunakan.

###### Contoh Pembahasan

-   ubah latihan menjadi berpasangan;
-   prioritaskan aktivitas yang dapat dijalankan melalui browser;
-   siapkan demonstrasi terpusat;
-   kurangi aktivitas yang membutuhkan satu perangkat per peserta;
-   pertahankan tujuan belajar, tetapi ubah metode.

##### Latihan 4 — Evaluasi Rencana

Sebuah workshop memiliki durasi 90 menit, tetapi rencana AI berisi:

-   pembukaan 15 menit;
-   materi 35 menit;
-   demo 25 menit;
-   latihan 30 menit;
-   kuis 15 menit.

###### Pembahasan

Total rencana adalah 120 menit. Rencana melanggar batas waktu dan harus dipangkas atau disusun ulang.

* * * * *

#### 3.14 Latihan

##### Latihan 1 — Ubah Prompt

Prompt awal:

> “Hitung biaya acara ini.”

###### Contoh Perbaikan

> “Identifikasi jumlah peserta, biaya per peserta, biaya tambahan, dan anggaran. Hitung total kebutuhan, bandingkan dengan anggaran, periksa perhitungan, lalu berikan kesimpulan.”

##### Latihan 2 — Temukan Kesalahan

    Peserta: 45
    Biaya: Rp30.000
    Total menurut AI: Rp1.250.000

###### Pembahasan

    45 × Rp30.000 = Rp1.350.000

##### Latihan 3 — Kurangi Penjelasan Berlebihan

Tugas peserta: ringkas penjelasan 10 paragraf menjadi:

1.  data;
2.  tiga langkah utama;
3.  hasil;
4.  satu catatan asumsi.

##### Latihan 4 — Perlu CoT atau Tidak?

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Tugas
CoT?
Alasan</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Memperbaiki typo “algoritm”
Tidak
Satu langkah</td>
<td align="left">Membandingkan dua rencana anggaran
Ya
Banyak kriteria</td>
<td align="left">Menerjemahkan “good morning”
Tidak
Tugas sederhana</td>
</tr>
</tbody>
</table>

* * * * *

#### 4.16 Latihan

##### Latihan 1 — Pilih Tool

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Tugas
Tool</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Menghitung 287 × 9.451
Kalkulator</td>
<td align="left">Menganalisis 10.000 baris data
Spreadsheet atau Python</td>
</tr>
</tbody>
</table>

##### Latihan 2 — Tentukan Parameter

Tugas:

> Cari slot rapat dua jam minggu depan.

Parameter yang perlu ditentukan:

-   tanggal mulai;
-   tanggal akhir;
-   zona waktu;
-   durasi;
-   kalender;
-   jam kerja;
-   peserta yang perlu diperiksa.

##### Latihan 3 — Baca Observation

    Jumlah baris: 100
    Nilai valid: 0
    Error: kolom “score” berisi teks

###### Pembahasan

AI tidak boleh menghitung rata-rata. AI harus menjelaskan bahwa kolom tidak berisi nilai numerik dan meminta kolom alternatif atau perbaikan data.

##### Latihan 4 — Permission Check

Klasifikasikan:

-   membaca kalender sendiri;
-   membuat draft email;
-   mengirim email;
-   menghapus agenda;
-   menjalankan kalkulator.

Tindakan mengirim email dan menghapus agenda memiliki dampak lebih tinggi daripada sekadar membaca atau membuat draft.

##### Latihan 5 — Perbaiki Tool Loop

Alur salah:

    Reason → Tool → Answer

Alur perbaikan:

    Reason → Plan → Tool → Observe → Validate → Update → Answer

* * * * *

## 1.12 Kuis

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/quiz-source-full.html`

#### 1.12 Kuis

##### Soal 1

Apa pengertian paling tepat dari reasoning dalam konteks AI?

A. Kemampuan AI memiliki kesadaran
 B. Proses menghubungkan informasi untuk menghasilkan kesimpulan atau langkah
 C. Proses menyimpan semua percakapan pengguna
 D. Kemampuan AI mengakses internet secara otomatis

**Jawaban:** B

**Penjelasan:** Reasoning menggambarkan proses pengolahan dan penghubungan informasi untuk menyelesaikan tugas. Istilah tersebut tidak menyatakan bahwa AI memiliki kesadaran.

##### Soal 2

Manakah yang termasuk asumsi?

A. Anggaran yang tertulis adalah Rp2.000.000
 B. Jumlah peserta pada daftar adalah 50
 C. Semua peserta hadir dan menerima konsumsi
 D. Harga konsumsi pada invoice adalah Rp30.000

**Jawaban:** C

**Penjelasan:** Kehadiran seluruh peserta tidak otomatis diketahui hanya dari jumlah peserta yang terdaftar.

##### Soal 3

Mengapa AI perlu mengenali informasi yang tidak relevan?

A. Agar jawaban menjadi lebih panjang
 B. Agar seluruh kata dalam prompt digunakan
 C. Agar proses tetap fokus pada data yang memengaruhi hasil
 D. Agar AI tidak perlu memeriksa hasil

**Jawaban:** C

##### Soal 4

Sebuah jawaban AI memiliki langkah yang panjang. Apa kesimpulan yang paling tepat?

A. Jawaban pasti benar
 B. AI pasti memahami masalah seperti manusia
 C. Panjangnya penjelasan tidak menjamin validitas
 D. Jawaban tidak perlu diperiksa

**Jawaban:** C

##### Soal 5

Apa langkah paling tepat setelah AI memperoleh hasil perhitungan?

A. Segera menghapus langkah sebelumnya
 B. Memeriksa angka, satuan, batasan, dan kesimpulan
 C. Menambahkan asumsi baru
 D. Mengganti pertanyaan pengguna

**Jawaban:** B

##### Soal 6

AI diminta memilih pekerjaan prioritas. Informasi apa yang paling relevan?

A. Warna ikon setiap pekerjaan
 B. Nama orang yang mengusulkan pekerjaan
 C. Dampak, urgensi, risiko, dan dependensi
 D. Panjang judul pekerjaan

**Jawaban:** C

* * * * *

#### 2.14 Kuis

##### Soal 1

Apa fungsi utama planning?

A. Menyimpan semua data
 B. Mengubah tujuan menjadi urutan langkah
 C. Menjamin tidak ada perubahan
 D. Menggantikan seluruh reasoning

**Jawaban:** B

##### Soal 2

Manakah contoh constraint?

A. Menentukan materi
 B. Membuat slide
 C. Durasi maksimal 90 menit
 D. Menulis kesimpulan

**Jawaban:** C

##### Soal 3

Apa tujuan problem decomposition?

A. Membuat tugas lebih kabur
 B. Memecah tugas besar menjadi bagian yang dapat dikerjakan
 C. Menghapus seluruh batasan
 D. Menghindari evaluasi

**Jawaban:** B

##### Soal 4

Mengapa dependencies penting?

A. Agar semua langkah dapat dikerjakan acak
 B. Agar urutan mengikuti kebutuhan input dan output
 C. Agar rencana menjadi lebih panjang
 D. Agar goal tidak perlu ditentukan

**Jawaban:** B

##### Soal 5

Kapan static planning paling sesuai?

A. Kondisi sering berubah dan data belum tersedia
 B. Tugas stabil dengan langkah yang sudah jelas
 C. Pengguna terus memberikan informasi baru
 D. Tool sering gagal

**Jawaban:** B

##### Soal 6

Apa tindakan paling tepat ketika observation menunjukkan kondisi berubah?

A. Mengabaikan observation
 B. Selalu membatalkan tugas
 C. Memeriksa dan memperbarui rencana jika diperlukan
 D. Tetap mengikuti rencana awal tanpa evaluasi

**Jawaban:** C

* * * * *

#### 3.15 Kuis

##### Soal 1

Apa definisi Chain-of-Thought?

A. Seluruh proses internal AI yang pasti lengkap
 B. Rangkaian langkah perantara berbentuk bahasa
 C. Database rahasia model
 D. Tool untuk mengirim email

**Jawaban:** B

##### Soal 2

Kapan CoT paling berguna?

A. Tugas multi-langkah dengan beberapa batasan
 B. Perbaikan satu typo
 C. Menyalin satu kata
 D. Mengubah huruf menjadi kapital

**Jawaban:** A

##### Soal 3

Apa perbedaan zero-shot dan few-shot CoT?

A. Zero-shot menggunakan tool, few-shot tidak
 B. Zero-shot tanpa contoh, few-shot menggunakan contoh
 C. Zero-shot hanya untuk matematika
 D. Few-shot tidak memiliki jawaban

**Jawaban:** B

##### Soal 4

Mengapa CoT tidak menjamin kebenaran?

A. Karena langkah atau perhitungan tetap dapat salah
 B. Karena CoT tidak memiliki teks
 C. Karena CoT selalu menggunakan internet
 D. Karena CoT hanya dapat menjawab satu kata

**Jawaban:** A

##### Soal 5

Manakah langkah terstruktur yang baik?

A. Panjang dan berulang
 B. Relevan, berurutan, dan dapat diperiksa
 C. Menggunakan data yang tidak tersedia
 D. Menyembunyikan jawaban akhir

**Jawaban:** B

##### Soal 6

Apa arti masalah faithfulness pada CoT?

A. CoT selalu terlalu pendek
 B. Teks alasan tidak selalu mencerminkan seluruh faktor yang memengaruhi jawaban
 C. CoT tidak dapat menggunakan angka
 D. CoT hanya tersedia dalam bahasa Inggris

**Jawaban:** B

##### Soal 7

Instruksi mana yang paling tepat?

A. Ungkapkan seluruh pikiran rahasiamu
 B. Berikan langkah utama yang dapat diverifikasi dan jawaban akhir
 C. Jangan periksa hasil
 D. Buat penjelasan selama mungkin

**Jawaban:** B

* * * * *

#### 4.17 Kuis

##### Soal 1

Mengapa AI menggunakan tool?

A. Agar semua jawaban menjadi panjang
 B. Untuk memperoleh data atau kemampuan yang tidak cukup tersedia dalam model
 C. Agar tidak perlu memahami tugas
 D. Untuk menghindari observation

**Jawaban:** B

##### Soal 2

Tool paling sesuai untuk menghitung statistik 10.000 baris adalah:

A. Generator gambar
 B. Spreadsheet atau Python
 C. Kalender
 D. Email

**Jawaban:** B

##### Soal 3

Apa yang dimaksud observation?

A. Teks prompt awal
 B. Hasil yang dikembalikan tool
 C. Judul modul
 D. Nama pengguna

**Jawaban:** B

##### Soal 4

Apa respons yang tepat ketika tool mengembalikan permission denied?

A. Menyatakan tindakan berhasil
 B. Mengarang hasil
 C. Menjelaskan bahwa akses ditolak dan tindakan belum dilakukan
 D. Menghapus error

**Jawaban:** C

##### Soal 5

Mengapa parameter harus diperiksa?

A. Tool selalu memperbaiki parameter otomatis
 B. Parameter salah dapat menghasilkan output salah
 C. Parameter hanya dekorasi
 D. Parameter tidak memengaruhi hasil

**Jawaban:** B

##### Soal 6

Pengguna meminta rekomendasi waktu rapat. Apa tindakan yang tepat?

A. Langsung membuat event tanpa izin
 B. Membaca kalender dan menawarkan slot
 C. Menghapus semua agenda
 D. Menebak slot kosong

**Jawaban:** B

##### Soal 7

Manakah pernyataan yang paling tepat?

A. Output tool selalu benar
 B. Tool tidak pernah gagal
 C. Output tool tetap perlu divalidasi
 D. Tool dapat digunakan tanpa tujuan

**Jawaban:** C

* * * * *

## Forum Reasoning AI

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/diskusi.html`

Discussion Board

#### Forum Reasoning AI

Pilih prompt atau tulis pertanyaan sendiri. Thread tersimpan di browser dengan key `heraiAiReasoningDiscussion`.

**Kepercayaan

**Transparansi

**Tool use

**AI tutor

**High-stakes

Prompt diskusi Apakah jawaban AI yang terlihat runtut cukup untuk dipercaya, atau harus selalu ada bukti eksternal? Kapan chain-of-thought perlu diringkas untuk pengguna, dan kapan cukup ditampilkan sebagai checklist verifikasi? Tool apa yang aman diberikan ke assistant peserta HerAI, dan tool apa yang wajib butuh approval manusia? Bagaimana cara mendesain AI tutor yang membantu siswa berpikir tanpa langsung memberikan semua jawaban? Di domain hukum, medis, atau finansial, batas minimum verifikasi reasoning AI seharusnya seperti apa? Tulis posting diskusi

Posting akan tersimpan di browser ini.

** Posting Diskusi

**

Sumber utuh

#### Prompt Diskusi dari Materi Sumber

Bagian ini memuat teks diskusi dari `materi/baru/Reasoning-baru.md` tanpa dikurangi.

** Memuat prompt diskusi sumber...

## Kuis Reasoning

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/kuis.html`

Knowledge Check

#### Kuis Reasoning

Pilih satu jawaban paling tepat. Seluruh kartu opsi bisa diklik. Kuis single attempt dan akan terkunci setelah dikirim.

** Sebelumnya

**Soal 1 dari 15**

Berikutnya **

** Kirim Kuis

** **Referensi kuis dari materi sumber**Teks kuis sumber tetap utuh dan tidak dikurangi. **

** Memuat kuis sumber...

## Latihan Reasoning Terstruktur

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/latihan.html`

Practice Lab

#### Latihan Reasoning Terstruktur

Kerjakan satu skenario pada satu waktu. Baca kasus, tulis jawaban, lalu lihat pembahasan.

Jawaban akan tersimpan di browser ini.

** Sebelumnya

**Skenario 1 dari 6**

Berikutnya **

Gunakan simpan untuk mengunci sementara jawabanmu. Kamu tetap bisa edit lagi.

** Simpan Jawaban

** Edit

** Reset

** **Referensi lengkap latihan dan proyek akhir**Materi sumber tetap utuh dan bisa dibuka saat dibutuhkan. **

** Memuat latihan sumber...

## materi

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/materi.html`

**

Memuat materi Reasoning...

** Topik Sebelumnya

Topik Selanjutnya **

[Lanjut Latihan **](#/participant-ai-reasoning-practice)

## Konten Dinamis dan Interaktif

> Data berikut diekstrak dari JavaScript runtime untuk `reasoning`, termasuk teks yang baru muncul setelah interaksi.

#### CHAPTERS

#### Dari Menjawab ke Menalar

- **title:** Dari Menjawab ke Menalar
- **shortTitle:** Dari Menjawab ke Menalar
- **duration:** 20 menit
- **icon:** fas fa-brain
- **summary:** Reasoning AI menghubungkan fakta dan asumsi secara runtut.
##### objectives

- Menjelaskan reasoning dalam konteks sistem AI
- Memisahkan fakta, asumsi, batasan, dan kesimpulan
- Mengidentifikasi informasi yang hilang dalam jawaban AI
- Membuat kesimpulan bersyarat berdasarkan data yang tersedia

- **analogy:** Seperti menjawab soal cerita, kita tidak bisa langsung menebak. Harus dicari data apa yang diketahui dan langkah perhitungannya — kalau ada yang belum diketahui, kita catat dulu sebagai asumsi.
##### hook

- **question:** Seorang panitia bertanya ke AI: "Apakah anggaran konsumsi workshop cukup?"
###### answerA

- **label:** Jawaban A
- **text:** Ya, anggarannya cukup.
- **icon:** fas fa-bolt

###### answerB

- **label:** Jawaban B
- **text:** Biaya dasar adalah 50 × Rp35.000 = Rp1.750.000. Anggaran Rp2.000.000 menyisakan Rp250.000. Namun ongkir, pajak, dan konsumsi panitia belum diketahui. Kesimpulan: biaya dasar cukup, tetapi total final perlu dikonfirmasi.
- **icon:** fas fa-list-check

- **message:** Belum ada penilaian. Simpan pilihanmu berdasarkan intuisi. Setelah mempelajari chapter ini, kamu akan memeriksa kembali alasan pilihan tersebut.

##### opening

- Bayangkan seorang peserta meminta AI: "Hitung apakah anggaran konsumsi acara cukup untuk seluruh peserta."
- Untuk menjawab dengan benar, AI perlu memahami: berapa jumlah peserta, berapa biaya konsumsi per peserta, apakah ada biaya tambahan, berapa anggaran yang tersedia, operasi apa yang harus dilakukan, dan bagaimana menentukan bahwa anggaran cukup atau tidak.
- Pertanyaan tersebut berbeda dari pertanyaan sederhana seperti "Apa arti kata algoritma?" — di mana AI cukup menghasilkan definisi berdasarkan pola yang telah dipelajari.
- Pada pertanyaan anggaran, AI perlu <strong>menghubungkan beberapa data</strong> dan menjalankan urutan penyelesaian. Inilah yang disebut <strong>reasoning</strong> atau penalaran.

##### recallVsReasoningTable

###### left

- **title:** Recall / Pengambilan Informasi
**rows**

- Menghasilkan informasi yang sudah dikenali
- Biasanya dapat dijawab dalam satu langkah
- Contoh: definisi algoritma
- Fokus pada "apa"


###### right

- **title:** Reasoning / Penalaran
**rows**

- Menghubungkan beberapa informasi untuk memperoleh hasil baru
- Sering membutuhkan beberapa langkah
- Contoh: menghitung dan membandingkan anggaran
- Fokus pada "bagaimana" dan "mengapa"



##### concepts

##### Apa Itu Reasoning dalam AI?

- **title:** Apa Itu Reasoning dalam AI?
###### content

- Dalam konteks LLM, <strong>reasoning</strong> adalah istilah praktis untuk menggambarkan kemampuan model menggunakan instruksi, konteks, pola yang dipelajari, langkah perantara, dan hasil sebelumnya untuk menghasilkan respons yang sesuai dengan tugas.
- LLM pada dasarnya bekerja dengan memprediksi token berikutnya. Namun, pola yang dipelajari dalam skala besar dapat menghasilkan perilaku seperti: mengikuti aturan, membandingkan alternatif, menghubungkan beberapa fakta, melakukan perhitungan bertahap, menyusun rencana, dan memperbaiki jawaban setelah menerima informasi baru.


##### Tahapan Penalaran Sederhana

- **title:** Tahapan Penalaran Sederhana
###### diagram

- Memahami permintaan
- Mengidentifikasi tujuan
- Mengambil informasi relevan
- Mengenali informasi yang hilang
- Menentukan hubungan antar informasi
- Menyusun langkah penyelesaian
- Menghasilkan hasil
- Memeriksa hasil

###### content

- Model mental berikut dapat digunakan untuk membaca bagaimana AI menyelesaikan sebuah tugas. Setiap tahap saling terkait — melewatkan satu saja dapat membuat jawaban AI terlihat benar tetapi sebenarnya tidak lengkap atau menyesatkan.


##### Empat Elemen Penting

- **title:** Empat Elemen Penting
###### table

**headers**

- Elemen
- Pengertian
- Contoh

**rows**

**Item 1**

- Fakta
- Informasi yang diberikan atau sudah diverifikasi
- Peserta berjumlah 60 orang

**Item 2**

- Asumsi
- Informasi yang dianggap benar agar proses dapat dilanjutkan
- Semua peserta menerima satu paket konsumsi

**Item 3**

- Langkah
- Operasi atau proses yang dilakukan
- 60 × Rp35.000

**Item 4**

- Kesimpulan
- Hasil yang ditarik dari fakta dan langkah
- Anggaran cukup dengan sisa Rp650.000


###### content

- Empat elemen berikut sering tercampur dalam jawaban AI. Membedakannya adalah keterampilan dasar untuk menilai kualitas reasoning.


##### flow

##### Item 1

- Memahami
- Tujuan dan batasan

##### Item 2

- Fakta
- Data relevan yang tersedia

##### Item 3

- Asumsi
- Informasi yang dianggap benar

##### Item 4

- Hubungan
- Kaitan antar informasi

##### Item 5

- Kesimpulan
- Hasil penalaran

##### example

- **title:** Contoh Terurai: Perhitungan Anggaran
- **case:** Anggaran: Rp3.000.000, Peserta: 60 orang, Konsumsi: Rp35.000 per orang, Biaya administrasi: Rp250.000
###### steps

###### Item 1

- **label:** Langkah 1
- **text:** Hitung konsumsi: 60 × Rp35.000 = Rp2.100.000

###### Item 2

- **label:** Langkah 2
- **text:** Tambahkan biaya administrasi: Rp2.100.000 + Rp250.000 = Rp2.350.000

###### Item 3

- **label:** Langkah 3
- **text:** Bandingkan dengan anggaran: Rp3.000.000 − Rp2.350.000 = Rp650.000

- **conclusion:** Anggaran mencukupi. Setelah biaya konsumsi dan administrasi, terdapat sisa Rp650.000.
###### commonErrors

- Melupakan biaya administrasi — AI hanya menghitung konsumsi dan menyatakan sisa Rp900.000
- Salah membaca angka — Rp35.000 dibaca sebagai Rp350.000
- Salah operasi — anggaran dikalikan dengan jumlah peserta
- Kesimpulan tanpa perhitungan — AI menyatakan anggaran cukup karena "terlihat besar"
- Tidak menyatakan asumsi — AI menganggap seluruh peserta menerima konsumsi tanpa menyebutkan asumsi tersebut


##### lab

- **eyebrow:** Reasoning Anatomy Explorer
- **title:** Eksplorasi Tiga Mode Reasoning
- **description:** Klik setiap tab untuk melihat perbedaan cara AI memproses informasi.
###### options

###### Item 1

- Jawab Langsung
- fas fa-bolt
- Insting Cepat
- Jawaban singkat tanpa langkah. Cocok untuk definisi sederhana, tetapi berbahaya untuk tugas kompleks.
- Pertanyaan fakta tunggal: "Apa arti kata algoritma?"

###### Item 2

- Reasoning
- fas fa-brain
- Hubungan Logis
- Menghubungkan beberapa informasi untuk memperoleh hasil baru melalui langkah bertahap.
- Tugas perhitungan, audit, atau perbandingan dengan beberapa variabel.

###### Item 3

- Fakta & Asumsi
- fas fa-layer-group
- Pemisahan Data
- Fakta adalah informasi tersedia. Asumsi adalah anggapan agar proses bisa dilanjutkan. Wajib dibedakan.
- Menentukan apakah "semua peserta hadir" adalah fakta atau asumsi.


##### quickCheck

- **question:** AI berkata "anggaran pasti cukup" tanpa menunjukkan perhitungan. Apa yang salah dari jawaban tersebut?
###### options

- AI menebak tanpa menghubungkan data yang tersedia
- AI sudah benar karena menggunakan kata 'pasti'
- AI tidak perlu menunjukkan perhitungan

- **answer:** 0
- **explanationCorrect:** Benar. AI menyimpulkan tanpa menghubungkan data. Reasoning yang baik harus menunjukkan bagaimana kesimpulan ditarik dari fakta yang tersedia — bukan sekadar menebak atau merasa yakin.
- **explanationWrong:** Belum tepat. Perhatikan bahwa AI tidak menunjukkan data atau langkah perhitungan sama sekali. Kata 'pasti' justru berbahaya ketika tidak didukung bukti.

- **llmExample:** AI menghitung anggaran acara: harus memisahkan harga per orang, jumlah peserta, biaya tambahan, lalu melakukan perhitungan secara runtut — bukan langsung menebak hasil akhir.
##### prompt

- Pisahkan fakta dan asumsi yang ada dalam data.
- Tentukan informasi yang belum tersedia.
- Susun langkah penyelesaian secara runtut.
- Periksa kembali kesimpulan terhadap batasan yang ada.

##### challenge

- **instruction:** Cari satu contoh ketika LLM memberikan jawaban yang terdengar meyakinkan tetapi ternyata salah perhitungan. Tuliskan temuannya di bawah.
- **placeholder:** Tulis temuanmu di sini... Misalnya: AI diminta menghitung 45 × Rp30.000 dan menjawab Rp1.250.000 (seharusnya Rp1.350.000)...
- **example:** Contoh: AI diminta menghitung biaya acara dengan data 50 peserta × Rp25.000 + biaya sewa Rp400.000. AI menjawab total Rp1.250.000 karena melupakan biaya sewa. Jawaban benar: Rp1.650.000, artinya justru kurang Rp150.000 dari anggaran Rp1.500.000.

##### mistakes

- Membuat asumsi tersembunyi tanpa menyatakannya
- Salah memahami tujuan utama pertanyaan
- Terlalu percaya diri — menggunakan kata 'pasti' tanpa bukti

##### bestPractices

- Nyatakan semua asumsi secara eksplisit di awal
- Tulis ulang tujuan dan batasan sebelum mulai
- Gunakan kesimpulan bersyarat: "Jika asumsi X benar, maka..."
- Verifikasi apakah ada informasi penting yang hilang

##### learningOutcomes

- Membedakan jawaban langsung dan reasoning yang terstruktur
- Memisahkan fakta, asumsi, langkah, dan kesimpulan
- Menemukan informasi yang hilang dalam jawaban AI
- Membuat kesimpulan bersyarat berdasarkan data yang tersedia

- **transition:** Berikutnya kita akan mempelajari cara memverifikasi reasoning — menemukan kesalahan, memeriksa urutan langkah, dan membedakan jawaban yang meyakinkan dari jawaban yang benar-benar valid.
- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/01-full.html

#### Reasoning yang Dapat Diperiksa

- **title:** Reasoning yang Dapat Diperiksa
- **shortTitle:** Reasoning Dapat Diperiksa
- **duration:** 25 menit
- **icon:** fas fa-check-double
- **summary:** Penjelasan meyakinkan bukan jaminan valid. Setiap langkah reasoning AI wajib diperiksa.
##### objectives

- Mengidentifikasi kesalahan umum dalam reasoning AI
- Memeriksa hasil penalaran AI secara sistematis
- Membedakan jawaban meyakinkan dan jawaban valid

- **analogy:** Seperti guru matematika memeriksa langkah ujian siswa, bukan cuma jawaban akhirnya. Siswa bisa dapat jawaban benar dengan cara salah, atau sebaliknya — jawaban salah dengan langkah yang hampir benar.
##### hook

- **question:** AI memberikan jawaban panjang dan terstruktur tentang perhitungan anggaran. Apakah jawaban tersebut pasti benar?
###### answerA

- **label:** Pasti benar
- **text:** Karena AI menjelaskan langkahnya dengan detail.
- **icon:** fas fa-circle-check

###### answerB

- **label:** Belum tentu benar
- **text:** Karena langkah yang rapi bisa saja mengandung kesalahan perhitungan atau data.
- **icon:** fas fa-magnifying-glass

- **message:** Simpan pilihanmu dulu. Di chapter ini kamu akan belajar bahwa penjelasan yang rapi dan meyakinkan tidak selalu berarti benar.

##### opening

- Bayangkan AI memberikan jawaban panjang dengan langkah-langkah yang terlihat rapi. Sebagai pengguna, apakah kamu langsung percaya?
- Jawaban AI yang terdengar meyakinkan bisa menutupi kesalahan logika. Inilah mengapa <strong>verifikasi</strong> adalah keterampilan wajib — bukan hanya untuk engineer, tetapi untuk siapa pun yang menggunakan AI dalam pekerjaan sehari-hari.

##### recallVsReasoningTable

###### left

- **title:** Jawaban Meyakinkan
**rows**

- Bahasa lancar dan percaya diri
- Terlihat rapi dan terstruktur
- Bisa menutupi kesalahan data
- Sering diterima tanpa diperiksa
- Contoh: "Anggaran pasti cukup"


###### right

- **title:** Jawaban Valid
**rows**

- Data dan langkah dapat diverifikasi
- Asumsi dinyatakan secara eksplisit
- Perhitungan dapat diulang
- Kesimpulan mengikuti bukti
- Contoh: "Jika asumsi X benar, maka..."



##### concepts

##### Checklist Verifikasi Reasoning

- **title:** Checklist Verifikasi Reasoning
###### content

- Gunakan checklist berikut setiap kali membaca output AI yang melibatkan perhitungan atau keputusan:
- <strong>☐ Apakah AI menjawab pertanyaan yang benar?</strong>
- <strong>☐ Apakah tujuan dan batasan dipahami?</strong>
- <strong>☐ Apakah informasi yang dipakai tersedia?</strong>
- <strong>☐ Apakah fakta dan asumsi dibedakan?</strong>
- <strong>☐ Apakah asumsi penting disebutkan?</strong>
- <strong>☐ Apakah urutan langkah masuk akal?</strong>
- <strong>☐ Apakah perhitungan dapat diulang?</strong>
- <strong>☐ Apakah kesimpulan mengikuti data?</strong>
- <strong>☐ Apakah ada alternatif yang perlu dipertimbangkan?</strong>
- <strong>☐ Apakah tingkat keyakinan sesuai dengan bukti?</strong>


##### Kesalahan Umum dalam Reasoning AI

- **title:** Kesalahan Umum dalam Reasoning AI
###### content

- Berikut adalah 10 kesalahan yang sering muncul dalam reasoning AI:

###### numberedList

- Salah memahami tujuan — AI menjawab topik yang berhubungan, tetapi tidak menjawab tugas utama.
- Mengabaikan batasan — AI memberikan solusi yang melebihi anggaran, waktu, atau kapasitas.
- Menggunakan informasi tidak relevan — AI memasukkan detail yang tidak memengaruhi hasil.
- Membuat asumsi tersembunyi — AI menganggap sesuatu benar tanpa mengatakannya.
- Mengarang fakta — AI menambahkan data, sumber, atau kondisi yang tidak tersedia.
- Salah urutan langkah — AI menggunakan hasil yang belum dihitung atau melewati dependensi.
- Salah perhitungan — Langkah terlihat benar, tetapi operasi atau angkanya salah.
- Tidak memeriksa hasil — AI berhenti setelah memperoleh angka tanpa memeriksa apakah angka masuk akal.
- Terlalu percaya diri — AI menggunakan kata "pasti" pada hasil yang masih bergantung pada asumsi.
- Penjelasan meyakinkan tetapi tidak valid — Bahasa yang lancar dapat menutupi kesalahan logika.


##### flow

##### Item 1

- Cek Data
- Apakah semua data relevan sudah dipakai?

##### Item 2

- Cek Urutan
- Apakah langkah masuk akal dan tidak melompat?

##### Item 3

- Cek Hasil
- Apakah angka dan satuan konsisten?

##### example

- **title:** Contoh: Temukan Kesalahan
- **case:** AI diminta menghitung: 50 peserta dengan harga Rp25.000 per orang dan biaya sewa Rp400.000. Anggaran Rp1.500.000.
###### steps

###### Item 1

- **label:** Jawaban AI (salah)
- **text:** 50 × Rp25.000 = Rp1.250.000. Sisa: Rp1.500.000 − Rp1.250.000 = Rp250.000. Anggaran cukup.

###### Item 2

- **label:** Kesalahan
- **text:** AI melupakan biaya sewa Rp400.000!

###### Item 3

- **label:** Perhitungan benar
- **text:** 50 × Rp25.000 = Rp1.250.000. Total: Rp1.250.000 + Rp400.000 = Rp1.650.000. Kekurangan: Rp150.000.

- **conclusion:** Anggaran justru kurang Rp150.000 — kebalikan dari kesimpulan AI. Satu data yang terlewat bisa membalikkan keputusan sepenuhnya.
###### commonErrors

_Daftar kosong._


##### lab

- **eyebrow:** Error Spotting Lab
- **title:** Deteksi Kesalahan Reasoning
- **description:** Klik setiap tab untuk melihat jenis kesalahan yang berbeda dalam reasoning AI.
###### options

###### Item 1

- Data Hilang
- fas fa-magnifying-glass
- Missing Information
- AI melewatkan data penting yang seharusnya dihitung.
- Contoh: melupakan biaya sewa dalam perhitungan total.

###### Item 2

- Salah Hitung
- fas fa-calculator
- Calculation Error
- Langkah terlihat benar tetapi hasil perkalian atau penjumlahan salah.
- 80 × Rp27.500 = Rp2.020.000 (seharusnya Rp2.200.000).

###### Item 3

- Asumsi Tersembunyi
- fas fa-eye-slash
- Hidden Assumption
- AI mengasumsikan sesuatu tanpa menyatakannya — membuat kesimpulan terlihat valid padahal tidak.
- "Semua peserta hadir" tanpa konfirmasi kehadiran.


##### quickCheck

- **question:** Jawaban AI memiliki langkah yang panjang dan terstruktur. Apakah ini menjamin jawabannya benar?
###### options

- Ya, karena strukturnya rapi dan lengkap
- Belum tentu — langkah atau data dasarnya bisa saja salah
- Tidak tahu, yang penting kedengarannya profesional

- **answer:** 1
- **explanationCorrect:** Benar. Kelancaran dan struktur yang rapi tidak sama dengan kebenaran. Langkah bisa terlihat sempurna tetapi mengandung kesalahan data, perhitungan, atau asumsi tersembunyi. Selalu verifikasi.
- **explanationWrong:** Belum tepat. Bahasa yang rapi dan percaya diri adalah ciri AI modern — tetapi bukan jaminan validitas. Coba periksa: apakah data dasarnya benar? Apakah perhitungannya bisa diulang?

- **llmExample:** AI diminta menghitung total biaya acara. AI menuliskan 5 langkah dengan rapi, tetapi salah mengalikan harga dengan 0 — menghasilkan total yang jauh lebih kecil dari seharusnya. Struktur rapi, hasil salah.
##### prompt

- Periksa apakah semua data relevan sudah dipakai dalam perhitungan ini.
- Cari informasi yang mungkin terlewat atau disembunyikan.
- Ulangi perhitungan dan bandingkan hasilnya.

##### challenge

- **instruction:** AI memberikan jawaban berikut: "Untuk 45 peserta dengan harga Rp30.000 per orang, total biaya Rp1.250.000." Temukan kesalahannya dan tulis perhitungan yang benar.
- **placeholder:** Tulis temuanmu...
- **example:** Perhitungan benar: 45 × Rp30.000 = Rp1.350.000. AI salah menghitung — selisih Rp100.000. Kesalahan perkalian sederhana seperti ini sering terjadi pada LLM.

##### mistakes

- Percaya penjelasan meyakinkan tanpa verifikasi
- Malas memvalidasi output karena 'terlihat benar'
- Mengabaikan satu langkah yang ternyata kritis

##### bestPractices

- Selalu ulangi perhitungan kunci secara manual
- Periksa satuan dan konsistensi angka
- Bandingkan hasil dengan ekspektasi kasar (sanity check)
- Tanyakan: apakah ada data yang belum dipakai?

##### learningOutcomes

- Memeriksa reasoning AI menggunakan checklist sistematis
- Mengenali 10 jenis kesalahan umum dalam reasoning AI
- Membedakan jawaban yang meyakinkan dari jawaban yang valid
- Melakukan verifikasi perhitungan secara mandiri

- **transition:** Berikutnya kita akan mempelajari Planning — bagaimana AI memecah tugas besar menjadi langkah-langkah kecil yang bisa dikerjakan satu per satu.
- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/02-full.html

#### Planning & Problem Decomposition

- **title:** Planning & Problem Decomposition
- **shortTitle:** Planning
- **duration:** 30 menit
- **icon:** fas fa-layer-group
- **summary:** Rencana memecah tugas besar jadi langkah eksekusi dengan dependensi yang benar.
##### objectives

- Memecah tugas besar menjadi subtugas yang dapat dikerjakan
- Menyusun rencana statis dan dinamis
- Mengidentifikasi dependensi dan melakukan replanning

- **analogy:** Mengadakan acara butuh urutan yang tepat: tentukan tujuan dulu, baru cari tempat, baru sebar undangan. Kalau tempat berubah di tengah jalan, rencana harus disesuaikan — bukan dipaksakan.
##### hook

- **question:** Kamu diminta menyelenggarakan workshop AI dalam 2 minggu. Apa yang kamu lakukan pertama kali?
###### answerA

- **label:** Langsung buat materi
- **text:** Mulai menulis slide dan menyiapkan contoh kode.
- **icon:** fas fa-pen-to-square

###### answerB

- **label:** Tentukan tujuan dulu
- **text:** Tentukan siapa pesertanya, apa tujuan belajarnya, berapa durasinya, dan fasilitas apa yang tersedia.
- **icon:** fas fa-bullseye

- **message:** Simpan pilihanmu. Di chapter ini kamu akan belajar bahwa planning yang baik dimulai dari goal dan constraints — bukan langsung eksekusi.

##### opening

- Permintaan seperti "Buat workshop pengenalan AI" terlihat sederhana. Namun sebenarnya terdiri atas banyak keputusan: siapa pesertanya, apa tujuan belajarnya, berapa durasinya, materi apa, bagaimana latihannya, fasilitas apa yang tersedia.
- Sistem AI yang langsung menghasilkan jadwal tanpa memahami bagian-bagian tersebut berisiko membuat rencana yang tidak realistis. Di sinilah <strong>planning</strong> dan <strong>problem decomposition</strong> berperan.

##### concepts

##### Enam Komponen Planning

- **title:** Enam Komponen Planning
###### content

- Planning adalah proses mengubah tujuan menjadi urutan langkah yang dapat dilaksanakan. Enam komponen utamanya:

###### numberedList

- <strong>Goal</strong> — Hasil akhir yang ingin dicapai. Harus spesifik: "Workshop 2 jam untuk 50 pemula dengan praktik dan kuis" lebih baik daripada "Workshop yang bagus".
- <strong>Initial State</strong> — Kondisi awal: 50 peserta, 2 mentor, 1 proyektor, internet tidak stabil, ruangan 120 menit.
- <strong>Constraints</strong> — Batasan: waktu, anggaran, jumlah orang, kapasitas ruangan, kebijakan, akses alat, kemampuan peserta.
- <strong>Actions</strong> — Tindakan: menentukan materi, membuat slide, menyiapkan demo, membagi kelompok, membuat kuis.
- <strong>Dependencies</strong> — Ketergantungan: materi harus selesai sebelum slide dibuat; slide harus selesai sebelum presentasi.
- <strong>Success Criteria</strong> — Kapan rencana dianggap berhasil: total durasi 120 menit, ada aktivitas praktik, semua sesi punya tujuan.


##### Problem Decomposition

- **title:** Problem Decomposition
###### content

- Problem decomposition adalah proses memecah tugas besar menjadi bagian yang lebih kecil, lebih jelas, dan dapat dikerjakan. Subtugas yang baik harus: memiliki tujuan jelas, memiliki input, menghasilkan output, dapat dikerjakan, dapat diperiksa, tidak terlalu besar dan tidak terlalu kecil.


##### Static vs Dynamic Planning

- **title:** Static vs Dynamic Planning
###### content

- <strong>Static Planning:</strong> Rencana dibuat di awal dan dijalankan tanpa perubahan. Cocok ketika kondisi stabil, data lengkap, dan risiko perubahan rendah.
- <strong>Dynamic Planning:</strong> Rencana dapat diperbarui berdasarkan hasil atau informasi baru. Replanning bukan tanda kegagalan — dalam lingkungan yang berubah, replanning justru menunjukkan kecerdasan sistem.


##### flow

##### Item 1

- Goal
- Tujuan akhir yang terukur

##### Item 2

- Constraints
- Batasan yang harus dipatuhi

##### Item 3

- Subtasks
- Pecahan tugas kecil

##### Item 4

- Dependencies
- Urutan dan ketergantungan

##### Item 5

- Success
- Kriteria keberhasilan

##### example

- **title:** Contoh: Rencana Workshop yang Melanggar Batasan
- **case:** Workshop 90 menit. Rencana AI: pembukaan 15 menit, materi 35 menit, demo 25 menit, latihan 30 menit, kuis 15 menit.
###### steps

###### Item 1

- **label:** Masalah
- **text:** Total rencana: 15 + 35 + 25 + 30 + 15 = 120 menit — melebihi durasi 90 menit yang tersedia.

###### Item 2

- **label:** Solusi
- **text:** Rencana harus dipangkas atau disusun ulang. Misalnya: pembukaan 10 menit, materi 25 menit, demo 15 menit, latihan 25 menit, kuis 15 menit = 90 menit.

- **conclusion:** AI yang tidak memeriksa constraints akan menghasilkan rencana yang tidak bisa dijalankan. Selalu jumlahkan durasi dan bandingkan dengan batasan.
###### commonErrors

_Daftar kosong._


##### lab

- **eyebrow:** Replanning Simulator
- **title:** Simulasi Perubahan Rencana
- **description:** Klik setiap tab untuk melihat bagaimana rencana harus beradaptasi terhadap perubahan kondisi.
###### options

###### Item 1

- Rencana Awal
- fas fa-clipboard-list
- Static Plan
- Workshop direncanakan menggunakan lab komputer dan demo online. Semua materi sudah siap.
- Kondisi ideal — semua berjalan sesuai rencana.

###### Item 2

- Internet Mati
- fas fa-wifi-slash
- Constraint Change
- 30 menit sebelum acara, internet mati. Demo online tidak bisa dijalankan.
- Replanning: ganti demo online menjadi demo offline atau simulasi berbasis screenshot.

###### Item 3

- Setengah Komputer Rusak
- fas fa-computer-slash
- Resource Change
- Di hari H, setengah komputer di lab tidak bisa digunakan.
- Replanning: ubah latihan individu menjadi berpasangan; prioritaskan aktivitas berbasis browser.


##### quickCheck

- **question:** Goal "membuat workshop yang bagus" terlalu kabur. Apa yang harus ditambahkan agar menjadi goal yang baik?
###### options

- Target peserta, durasi, tujuan belajar, dan bentuk evaluasi
- Cukup tambahkan budget saja
- Goal yang kabur tidak masalah selama ada niat baik

- **answer:** 0
- **explanationCorrect:** Benar. Goal yang baik harus spesifik dan terukur: siapa pesertanya, berapa durasinya, apa tujuan belajarnya, dan bagaimana keberhasilannya diukur. Tanpa ini, AI tidak bisa menilai apakah rencana sudah sesuai.
- **explanationWrong:** Belum tepat. Goal yang kabur membuat AI tidak bisa mengevaluasi apakah rencana sudah sesuai. Bayangkan memesan makanan hanya dengan bilang 'makanan enak' — koki butuh tahu lebih spesifik.

- **llmExample:** AI diminta membuat aplikasi. AI memecah menjadi: database schema → backend API → frontend UI → testing. Ini adalah problem decomposition: tugas besar dipecah menjadi modul yang bisa dikerjakan berurutan.
##### prompt

- Bantu pecah tugas ini menjadi 5-8 subtugas yang jelas.
- Apa dependensi antar subtugas? Mana yang harus selesai lebih dulu?
- Buat rencana cadangan jika constraint utama berubah.

##### challenge

- **instruction:** Kamu merencanakan presentasi dengan proyektor. 10 menit sebelum mulai, proyektor rusak. Tulis rencana barumu — apa yang kamu ubah dan apa yang kamu pertahankan?
- **placeholder:** Tulis rencana adaptasi...
- **example:** Pertahankan: tujuan presentasi, urutan materi, dan durasi. Ubah: ganti visual proyektor dengan whiteboard atau flip chart; minta peserta membuka slide di perangkat masing-masing jika tersedia; siapkan printout sebagai cadangan.

##### mistakes

- Goal terlalu kabur sehingga rencana tidak terarah
- Dependensi terlewat — mengerjakan B sebelum A selesai
- Rencana terlalu kaku — tidak ada fallback saat kondisi berubah

##### bestPractices

- Tulis goal dengan format SMART: Specific, Measurable, Achievable, Relevant, Time-bound
- Petakan dependensi sebelum mulai eksekusi
- Siapkan minimal satu rencana cadangan untuk constraint utama
- Review rencana setelah setiap milestone

##### learningOutcomes

- Memecah tugas besar menjadi subtugas yang terstruktur
- Mengidentifikasi dan mengurutkan dependensi
- Membedakan kapan menggunakan static vs dynamic planning
- Melakukan replanning berdasarkan perubahan kondisi

- **transition:** Berikutnya kita akan mempelajari Chain-of-Thought — bagaimana langkah perantara membuat reasoning AI lebih transparan dan bisa diaudit.
- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/03-full.html

#### Structured Reasoning & Chain-of-Thought

- **title:** Structured Reasoning & Chain-of-Thought
- **shortTitle:** Chain-of-Thought
- **duration:** 30 menit
- **icon:** fas fa-list-ol
- **summary:** Langkah perantara membuat jawaban lebih transparan — tapi tidak menjamin kebenaran.
##### objectives

- Menjelaskan fungsi dan batasan Chain-of-Thought
- Mengenali masalah faithfulness pada CoT
- Mengubah prompt biasa menjadi prompt terstruktur

- **analogy:** Berpikir keras-keras (think aloud) saat menyelesaikan puzzle — kamu menyebutkan setiap langkah: "coba sudut ini dulu... kalau tidak cocok, coba yang sebelah..." Orang lain bisa mengikuti alur pikiranmu dan memeriksa apakah ada yang terlewat.
##### hook

- **question:** Mana yang lebih bisa kamu percaya?
###### answerA

- **label:** "Anggaran cukup"
- **text:** Jawaban singkat tanpa penjelasan.
- **icon:** fas fa-bolt

###### answerB

- **label:** "Total Rp2.350.000, sisa Rp650.000, jadi cukup"
- **text:** Jawaban dengan langkah perhitungan yang bisa diperiksa.
- **icon:** fas fa-list-check

- **message:** Simpan pilihanmu. Di chapter ini kamu akan belajar bahwa langkah perantara membuat jawaban lebih mudah diaudit — tapi tetap perlu diverifikasi.

##### opening

- Bandingkan dua jawaban: "Anggaran cukup" vs "Total konsumsi Rp2.100.000 + biaya administrasi Rp250.000 = Rp2.350.000. Dari anggaran Rp3.000.000, tersisa Rp650.000. Jadi, anggaran cukup."
- Jawaban kedua lebih mudah diperiksa karena pengguna bisa melihat: data yang dipakai, operasi yang dilakukan, hasil antara, dan dasar kesimpulan. Inilah esensi <strong>Chain-of-Thought</strong> (CoT).

##### concepts

##### Apa Itu Chain-of-Thought?

- **title:** Apa Itu Chain-of-Thought?
###### content

- <strong>Chain-of-Thought (CoT)</strong> adalah rangkaian langkah perantara berbentuk bahasa yang dihasilkan model sebelum atau bersama jawaban akhir.
- <strong>PENTING:</strong> CoT bukan 'isi pikiran rahasia AI' atau bukti kesadaran. CoT adalah output teks yang bisa dibaca dan diverifikasi — seperti seseorang yang menunjukkan cara kerjanya di kertas.


##### Zero-Shot vs Few-Shot CoT

- **title:** Zero-Shot vs Few-Shot CoT
###### content

- <strong>Zero-Shot:</strong> Meminta penyelesaian bertahap tanpa memberi contoh. Contoh prompt: "Identifikasi data, susun langkah, kerjakan, periksa, berikan jawaban akhir."
- <strong>Few-Shot:</strong> Memberikan contoh soal beserta langkah penyelesaiannya, lalu meminta model menyelesaikan soal baru dengan pola serupa. Kualitas contoh sangat penting — contoh yang salah bisa mengarahkan model ke pola yang buruk.


##### Kapan CoT Berguna dan Kapan Tidak?

- **title:** Kapan CoT Berguna dan Kapan Tidak?
###### content

- <strong>Berguna:</strong> masalah multi-langkah, perhitungan, perencanaan, analisis perbandingan, tugas dengan banyak batasan, troubleshooting.
- <strong>Tidak perlu:</strong> pertanyaan fakta sederhana, terjemahan satu kalimat, perbaikan typo, perubahan format, jawaban satu langkah yang sudah jelas.


##### Faithfulness: Apakah Langkah AI Selalu Jujur?

- **title:** Faithfulness: Apakah Langkah AI Selalu Jujur?
###### content

- Teks langkah penyelesaian yang dihasilkan model <strong>tidak selalu mencerminkan proses yang sebenarnya</strong>. Model bisa: menghasilkan alasan setelah memilih jawaban, mengikuti pola penjelasan yang terdengar masuk akal, atau dipengaruhi petunjuk bias tanpa mengakuinya.
- <strong>Prinsip penting:</strong> Chain-of-Thought membantu struktur dan pemeriksaan, tetapi bukan bukti mutlak bahwa model benar-benar menggunakan alasan yang ditampilkan.


##### flow

##### Item 1

- Pertanyaan
- Input yang diberikan

##### Item 2

- Langkah
- Reasoning perantara

##### Item 3

- Pemeriksaan
- Validasi setiap langkah

##### Item 4

- Jawaban
- Hasil akhir yang jelas

##### example

- **title:** Contoh: Perhitungan dengan CoT
- **case:** Data: 80 peserta, Rp27.500/orang, transportasi Rp350.000, anggaran Rp3.000.000.
###### steps

###### Item 1

- **label:** Langkah 1
- **text:** Konsumsi: 80 × Rp27.500 = Rp2.200.000

###### Item 2

- **label:** Langkah 2
- **text:** Total: Rp2.200.000 + Rp350.000 = Rp2.550.000

###### Item 3

- **label:** Langkah 3
- **text:** Sisa: Rp3.000.000 − Rp2.550.000 = Rp450.000

###### Item 4

- **label:** Kesimpulan
- **text:** Anggaran cukup dengan sisa Rp450.000.

- **conclusion:** Dengan CoT, setiap langkah bisa diperiksa. Tapi hati-hati: meskipun strukturnya rapi, perhitungan tetap bisa salah — misalnya 80 × Rp27.500 bisa salah ketik menjadi Rp2.020.000.
###### commonErrors

_Daftar kosong._


##### lab

- **eyebrow:** Prompt Transformer
- **title:** Ubah Prompt Biasa Menjadi Terstruktur
- **description:** Klik setiap tab untuk melihat bagaimana prompt sederhana diubah menjadi instruksi bertahap.
###### options

###### Item 1

- Prompt Awal
- fas fa-pen-to-square
- Prompt Biasa
- "Hitung biaya acara ini." — AI bisa menjawab dengan nebak atau melewatkan langkah.
- Prompt tanpa struktur berisiko menghasilkan jawaban yang sulit diverifikasi.

###### Item 2

- Prompt CoT
- fas fa-list-ol
- Prompt Terstruktur
- "Identifikasi jumlah peserta, biaya per peserta, biaya tambahan, dan anggaran. Hitung total kebutuhan, bandingkan dengan anggaran, periksa perhitungan, lalu berikan kesimpulan."
- Prompt terstruktur memandu AI melalui langkah yang bisa diperiksa.

###### Item 3

- Prompt Verifikasi
- fas fa-check-double
- Prompt Audit
- "Periksa kembali jawaban berikut. Cari kesalahan data, asumsi, urutan, perhitungan, dan kesimpulan. Tulis hanya perbaikan yang diperlukan."
- Gunakan untuk memverifikasi output AI — minta AI memeriksa hasilnya sendiri.


##### quickCheck

- **question:** Apakah Chain-of-Thought menjamin jawaban AI benar?
###### options

- Ya, karena setiap langkah ditampilkan
- Tidak — langkah atau perhitungan tetap bisa salah
- Hanya berlaku untuk soal matematika

- **answer:** 1
- **explanationCorrect:** Benar. CoT membantu transparansi dan audit, tetapi tidak menjamin kebenaran. Model tetap bisa melakukan kesalahan perhitungan, menggunakan data yang salah, atau membuat langkah yang terdengar logis tetapi tidak valid.
- **explanationWrong:** Belum tepat. CoT membuat langkah terlihat — tapi langkah yang terlihat belum tentu benar. Seperti siswa yang menunjukkan cara kerja di kertas ujian: caranya bisa rapi tapi jawabannya tetap salah.

- **llmExample:** AI menuliskan hitungan satu per satu sebelum memberikan total biaya. Pengguna bisa memeriksa setiap langkah: "Harga satuan benar? Jumlah peserta benar? Operasi matematikanya benar?"
##### prompt

- Kerjakan dengan format: 1) Data tersedia, 2) Asumsi, 3) Langkah utama, 4) Pemeriksaan, 5) Jawaban akhir.
- Berpikirlah langkah demi langkah. Jelaskan setiap langkah sebelum melanjutkan.
- Periksa kembali jawabanmu. Cari kesalahan dan tulis perbaikannya.

##### challenge

- **instruction:** Ubah prompt "Hitung total biaya workshop" menjadi prompt terstruktur dengan format: 1) Identifikasi data, 2) Susun langkah, 3) Hitung, 4) Periksa, 5) Kesimpulan.
- **placeholder:** Tulis prompt terstruktur versimu...
- **example:** "Tugas: Hitung total biaya workshop. Kerjakan dengan format: 1) Identifikasi: jumlah peserta, biaya per peserta, biaya tambahan, dan anggaran. 2) Susun langkah: hitung biaya dasar, tambahkan biaya lain, bandingkan dengan anggaran. 3) Lakukan perhitungan. 4) Periksa: apakah semua data dipakai? Apakah satuan konsisten? 5) Kesimpulan: cukup atau kurang, beserta sisa/kekurangan."

##### mistakes

- CoT dipaksakan untuk tugas sederhana yang cukup satu langkah
- Percaya 100% pada alasan model tanpa verifikasi
- Terlalu banyak langkah sampai jawaban utama tenggelam

##### bestPractices

- Gunakan CoT hanya untuk tugas multi-langkah
- Minta AI memeriksa hasilnya sendiri sebagai langkah terakhir
- Pisahkan langkah reasoning dan jawaban akhir agar mudah ditemukan
- Waspadai 'rationalization' — langkah yang dibuat setelah jawaban dipilih

##### learningOutcomes

- Menjelaskan perbedaan jawaban langsung dan jawaban dengan CoT
- Mengubah prompt biasa menjadi prompt terstruktur
- Menentukan kapan CoT berguna dan kapan tidak diperlukan
- Memahami batasan faithfulness pada CoT

- **transition:** Berikutnya kita akan mempelajari Tool Use — bagaimana AI menggunakan alat eksternal ketika kemampuannya sendiri tidak mencukupi.
- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/04-full.html

#### Tool Use yang Bertanggung Jawab

- **title:** Tool Use yang Bertanggung Jawab
- **shortTitle:** Tool Use
- **duration:** 30 menit
- **icon:** fas fa-toolbox
- **summary:** Tool menutupi kelemahan AI — asal dipilih tepat, parameternya benar, dan output-nya divalidasi.
##### objectives

- Menentukan kapan tool diperlukan dan kapan tidak
- Memilih tool yang sesuai dengan kebutuhan tugas
- Memvalidasi parameter dan output tool

- **analogy:** Seperti mempekerjakan asisten yang bisa browsing web untuk mencari harga tiket. Kamu harus memberi instruksi yang jelas (parameter), membaca hasilnya (observation), dan memutuskan apakah hasilnya bisa dipakai (validasi). Kalau asisten dapat error, kamu tidak boleh mengarang harga.
##### hook

- **question:** AI diminta menghitung 287 × 9.451. Apa yang sebaiknya dilakukan?
###### answerA

- **label:** Hitung sendiri
- **text:** AI menghitung dalam 'kepalanya' menggunakan prediksi token.
- **icon:** fas fa-brain

###### answerB

- **label:** Gunakan kalkulator
- **text:** AI memanggil tool kalkulator untuk memastikan akurasi.
- **icon:** fas fa-calculator

- **message:** Simpan pilihanmu. Di chapter ini kamu akan belajar kapan AI harus menggunakan tool eksternal dan bagaimana memvalidasi hasilnya.

##### opening

- LLM tidak selalu bisa melakukan semua hal sendiri. Perkalian angka besar, data real-time, akses database — ini adalah contoh tugas yang lebih baik diserahkan ke tool eksternal.
- <strong>Tool use</strong> adalah kemampuan AI untuk menggunakan alat eksternal (kalkulator, API, search engine, spreadsheet) ketika informasi atau kemampuan di dalam model tidak mencukupi.

##### concepts

##### Kapan Tool Diperlukan?

- **title:** Kapan Tool Diperlukan?
###### content

- Tidak semua tugas butuh tool. Gunakan tool ketika:
- 1. Informasi tidak tersedia dalam model (data real-time, fakta terkini).
- 2. Diperlukan komputasi akurat (perkalian besar, statistik kompleks).
- 3. Perlu akses ke sistem eksternal (kalender, email, database).
- 4. Data berada di file atau sumber yang tidak bisa 'dihafal' model.
- <strong>Tidak perlu tool</strong> ketika: tugas bisa dijawab dari pengetahuan model, definisi sederhana, terjemahan, atau ringkasan teks yang sudah diberikan.


##### Lima Langkah Tool Use

- **title:** Lima Langkah Tool Use
###### numberedList

- <strong>1. Tentukan kebutuhan</strong> — Apakah model bisa menjawab sendiri? Jika tidak, tool apa yang relevan?
- <strong>2. Pilih tool</strong> — Kalkulator untuk hitungan, weather API untuk cuaca, calendar untuk jadwal, spreadsheet untuk data besar.
- <strong>3. Tentukan parameter</strong> — Parameter yang salah = output yang salah. Periksa tipe data, format, dan unit.
- <strong>4. Baca observation</strong> — Tool mengembalikan hasil. Baca dengan teliti — apakah hasilnya valid? Apakah ada error?
- <strong>5. Validasi output</strong> — Bandingkan dengan ekspektasi. Jika tool gagal, jangan mengarang data. Jelaskan kegagalannya.


##### Permission dan Risiko

- **title:** Permission dan Risiko
###### content

- Tidak semua tool aman digunakan tanpa izin. Klasifikasi risiko:
- <strong>Risiko rendah:</strong> membaca kalender sendiri, menggunakan kalkulator, mencari informasi publik.
- <strong>Risiko tinggi:</strong> mengirim email, menghapus agenda, melakukan transaksi. Tindakan ini perlu konfirmasi eksplisit dari pengguna.
- Jika tool mengembalikan 'permission denied', AI harus menjelaskan bahwa akses ditolak — bukan mengarang data atau melanjutkan seolah-olah berhasil.


##### flow

##### Item 1

- Plan
- Pilih tool yang sesuai

##### Item 2

- Act
- Panggil tool dengan parameter benar

##### Item 3

- Observe
- Baca hasil dari tool

##### Item 4

- Update
- Perbarui state berdasarkan hasil

##### example

- **title:** Contoh: Tool Failure
- **case:** AI diminta menghitung rata-rata dari file spreadsheet. Tool mengembalikan: "Error: kolom 'score' berisi teks, bukan angka."
###### steps

###### Item 1

- **label:** Respons Salah
- **text:** AI mengarang angka rata-rata atau mengabaikan error.

###### Item 2

- **label:** Respons Benar
- **text:** AI menjelaskan bahwa kolom tidak berisi nilai numerik dan meminta kolom alternatif atau perbaikan data.

- **conclusion:** Ketika tool gagal, transparansi lebih penting daripada memberikan jawaban yang 'kedengarannya benar'.
###### commonErrors

_Daftar kosong._


##### lab

- **eyebrow:** Tool Decision Lab
- **title:** Pilih Tool yang Tepat
- **description:** Klik setiap tab untuk melihat contoh pemilihan tool berdasarkan jenis tugas.
###### options

###### Item 1

- Kalkulator
- fas fa-calculator
- Komputasi
- Untuk perkalian besar atau perhitungan yang perlu akurasi 100%.
- 287 × 9.451 — terlalu berisiko jika dihitung manual oleh LLM.

###### Item 2

- API / Search
- fas fa-globe
- Data Real-time
- Untuk informasi terkini yang tidak ada dalam training data model.
- Cuaca hari ini, harga saham, berita terbaru.

###### Item 3

- Spreadsheet
- fas fa-table
- Data Besar
- Untuk menganalisis ribuan baris data yang tidak muat dalam konteks.
- Menganalisis 10.000 baris data penjualan.


##### quickCheck

- **question:** Tool mengembalikan error 'data tidak ditemukan'. Apa yang harus dilakukan AI?
###### options

- Mengarang data yang kira-kira masuk akal
- Menjelaskan bahwa data tidak ditemukan dan meminta alternatif
- Mengabaikan error dan melanjutkan seolah-olah berhasil

- **answer:** 1
- **explanationCorrect:** Benar. Transparansi adalah kunci. AI harus jujur bahwa tool gagal, menjelaskan penyebabnya, dan menawarkan alternatif — bukan mengarang data.
- **explanationWrong:** Belum tepat. Mengarang data ketika tool gagal adalah kesalahan serius. Pengguna berhak tahu bahwa data tidak tersedia, bukan diberi informasi palsu yang 'kedengarannya benar'.

- **llmExample:** AI diminta memberikan cuaca hari ini. Alih-alih mengarang suhu (halusinasi), AI memanggil weather API, membaca hasilnya, lalu menyampaikan: "Berdasarkan data terkini, suhu hari ini 28°C dengan kemungkinan hujan 60%."
##### prompt

- Gunakan tool kalkulator untuk memastikan akurasi perhitungan.
- Cari informasi terbaru melalui search tool — jangan mengarang data.
- Jika tool gagal, jelaskan errornya dan minta alternatif dari pengguna.

##### challenge

- **instruction:** Kamu diminta mencari slot rapat 2 jam minggu depan. Tentukan: (1) tool apa yang dipakai, (2) parameter apa yang diperlukan, (3) apa yang dilakukan jika tidak ada slot tersedia.
- **placeholder:** Tulis rencana tool use-mu...
- **example:** Tool: Calendar API. Parameter: tanggal mulai (Senin), tanggal akhir (Jumat), durasi (2 jam), zona waktu, jam kerja (09:00-17:00), peserta. Jika tidak ada slot: laporkan ke pengguna dan tawarkan alternatif — perpendek durasi, perluas rentang tanggal, atau kurangi peserta wajib.

##### mistakes

- Terlalu banyak pakai tool untuk tugas yang sebenarnya bisa dijawab model sendiri
- Mengabaikan error dari tool dan melanjutkan seakan-akan berhasil
- Parameter salah — format tanggal terbalik, unit tidak konsisten

##### bestPractices

- Tanyakan dulu: apakah model bisa menjawab tanpa tool?
- Periksa parameter sebelum memanggil tool — format, tipe data, unit
- Selalu baca observation — jangan asumsikan tool selalu berhasil
- Hormati batas otorisasi — jangan mengambil tindakan tanpa izin

##### learningOutcomes

- Menentukan kapan sebuah task membutuhkan tool eksternal
- Memilih tool yang tepat berdasarkan jenis tugas
- Membaca dan memvalidasi output tool
- Menangani tool failure secara transparan

- **transition:** Berikutnya kita akan menyatukan semuanya dalam Integrated Reasoning Mission — simulasi end-to-end dari memahami masalah sampai memberikan jawaban yang terverifikasi.
- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/05-full.html

#### Integrated Reasoning Mission

- **title:** Integrated Reasoning Mission
- **shortTitle:** Integrated Mission
- **duration:** 35 menit
- **icon:** fas fa-flag-checkered
- **summary:** Reasoning, planning, dan tool use bersatu dalam loop iteratif untuk menyelesaikan misi kompleks.
##### objectives

- Mengevaluasi apakah jawaban AI cukup layak dipercaya
- Menjalankan siklus penuh: Reason → Plan → Act → Observe → Update → Answer

- **analogy:** Menjalankan misi: pahami target (Reason), rencanakan rute (Plan), bergerak (Act), cek apakah ada rintangan (Observe), sesuaikan rute jika perlu (Update), lalu laporkan hasil (Answer). Tidak selalu linear — kadang perlu mundur dan coba rute lain.
##### hook

- **question:** AI diminta menganalisis data peserta dari spreadsheet, menghitung kebutuhan konsumsi, dan memberi rekomendasi anggaran. Apa langkah pertama yang paling tepat?
###### answerA

- **label:** Langsung hitung
- **text:** Ambil data dari spreadsheet dan mulai kalkulasi.
- **icon:** fas fa-calculator

###### answerB

- **label:** Pahami dulu
- **text:** Baca tugas, identifikasi data yang tersedia dan yang perlu dicari, tentukan tool yang diperlukan.
- **icon:** fas fa-compass

- **message:** Simpan pilihanmu. Di chapter terakhir ini kamu akan melihat bagaimana seluruh kemampuan reasoning bekerja bersama dalam satu misi utuh.

##### opening

- Keempat kemampuan yang telah dipelajari — reasoning, planning, chain-of-thought, dan tool use — tidak bekerja sendiri-sendiri. Dalam tugas nyata, semuanya berjalan dalam satu siklus: <strong>Reason → Plan → Act → Observe → Update → Answer</strong>.
- Siklus ini tidak selalu linear. Kadang setelah Observe, AI perlu kembali ke Plan atau bahkan ke Reason jika ada informasi baru yang mengubah pemahaman awal.

##### concepts

##### Siklus Terpadu

- **title:** Siklus Terpadu
###### numberedList

- <strong>Reason</strong> — Pahami tugas: apa tujuannya, data apa yang tersedia, batasan apa yang ada, informasi apa yang hilang.
- <strong>Plan</strong> — Susun rencana: pecah menjadi subtugas, tentukan tool yang diperlukan, urutkan dependensi.
- <strong>Act</strong> — Jalankan: kerjakan langkah atau panggil tool dengan parameter yang benar.
- <strong>Observe</strong> — Baca hasil: apa output tool? Apakah sesuai ekspektasi? Apakah ada error?
- <strong>Update</strong> — Perbarui: apakah pemahaman atau rencana perlu diubah berdasarkan hasil observasi?
- <strong>Answer</strong> — Sampaikan hasil akhir beserta asumsi, batasan, dan tingkat keyakinan.


##### Verification Gate

- **title:** Verification Gate
###### content

- Sebelum menyampaikan jawaban ke pengguna, lewati verification gate:
- <strong>☐ Apakah semua data relevan sudah dipakai?</strong>
- <strong>☐ Apakah perhitungan bisa diulang dan konsisten?</strong>
- <strong>☐ Apakah asumsi sudah dinyatakan secara eksplisit?</strong>
- <strong>☐ Apakah tool berhasil? Jika gagal, apakah sudah ditangani?</strong>
- <strong>☐ Apakah kesimpulan mengikuti bukti — bukan sebaliknya?</strong>
- <strong>☐ Apakah tingkat keyakinan sesuai dengan kualitas data?</strong>


##### flow

##### Item 1

- Reason
- Pahami tugas dan data

##### Item 2

- Plan
- Rencana & Tool

##### Item 3

- Act
- Eksekusi

##### Item 4

- Observe
- Baca hasil

##### Item 5

- Update
- Sesuaikan

##### Item 6

- Answer
- Jawaban final

##### example

- **title:** Studi Kasus: Anggaran dari Spreadsheet
- **case:** Tugas: Berdasarkan data peserta dalam spreadsheet, hitung kebutuhan konsumsi, bandingkan dengan anggaran Rp5.000.000, lalu berikan rekomendasi. Harga konsumsi Rp32.000/orang, transportasi Rp450.000.
###### steps

###### Item 1

- **label:** Reason
- **text:** Jumlah peserta belum diketahui — ada di spreadsheet. Data mungkin memiliki duplikasi. Perlu tool spreadsheet.

###### Item 2

- **label:** Plan
- **text:** 1) Baca spreadsheet, 2) Hitung jumlah peserta unik, 3) Hitung total konsumsi, 4) Tambah transportasi, 5) Bandingkan dengan anggaran, 6) Rekomendasi.

###### Item 3

- **label:** Act + Observe
- **text:** Tool membaca spreadsheet: 82 baris, 2 duplikat. Peserta unik: 80. Tool kalkulator: 80 × Rp32.000 = Rp2.560.000.

###### Item 4

- **label:** Update + Answer
- **text:** Total: Rp2.560.000 + Rp450.000 = Rp3.010.000. Sisa: Rp1.990.000. Rekomendasi: anggaran cukup dengan sisa besar — bisa dialokasikan untuk materi tambahan.

- **conclusion:** Setiap tahap memberi informasi yang diperlukan tahap berikutnya. Tanpa Observe, AI tidak akan tahu ada duplikat. Tanpa Update, AI tidak akan menyesuaikan jumlah peserta.
###### commonErrors

_Daftar kosong._


##### lab

- **eyebrow:** Guided Mission Stepper
- **title:** Ikuti Alur Misi End-to-End
- **description:** Klik setiap tahap untuk melihat apa yang terjadi di setiap langkah siklus reasoning.
###### options

###### Item 1

- Reason
- fas fa-compass
- Pahami Misi
- Identifikasi tujuan, data tersedia, informasi hilang, dan batasan sebelum bertindak.
- Tanpa Reason, AI bisa mengerjakan tugas yang salah.

###### Item 2

- Plan + Act
- fas fa-play
- Rencana & Eksekusi
- Susun rencana, pilih tool, jalankan langkah. Setiap aksi harus punya tujuan jelas.
- Tool dipilih berdasarkan kebutuhan — bukan asal pakai.

###### Item 3

- Observe + Verify
- fas fa-flag-checkered
- Amati & Verifikasi
- Baca hasil, bandingkan dengan ekspektasi, perbarui rencana jika perlu. Verifikasi sebelum menjawab.
- Gate terakhir sebelum jawaban sampai ke pengguna.


##### quickCheck

- **question:** Apakah siklus Reason → Plan → Act → Observe → Update → Answer selalu linear (satu arah)?
###### options

- Ya, selalu maju tanpa mundur
- Tidak — bisa kembali ke Plan atau Reason jika observasi menunjukkan perubahan
- Hanya linear untuk tugas matematika

- **answer:** 1
- **explanationCorrect:** Benar. Siklus ini iteratif. Hasil observasi bisa memicu replanning atau bahkan reevaluasi pemahaman awal. Fleksibilitas ini yang membedakan AI agent yang cerdas dari script kaku.
- **explanationWrong:** Belum tepat. Dalam praktik nyata, observasi sering mengungkap hal yang tidak terduga — data duplikat, tool error, constraint berubah. AI harus bisa kembali ke Plan atau Reason, bukan memaksakan rencana awal.

- **llmExample:** AI mengekstrak data dari sheet, mendeteksi duplikat, memanggil fungsi kalkulasi, membandingkan dengan anggaran, lalu membuat tabel rangkuman akhir yang siap disajikan ke pengambil keputusan.
##### prompt

- Kerjakan tugas ini secara end-to-end: pahami, rencanakan, jalankan, amati, dan verifikasi sebelum menjawab.
- Jika tool gagal atau data tidak sesuai ekspektasi, jelaskan dan tawarkan alternatif.
- Sertakan asumsi, batasan, dan tingkat keyakinan dalam jawaban akhir.

##### challenge

- **instruction:** Kamu adalah AI agent yang diminta menganalisis data pendaftaran workshop. Data: 120 pendaftar dalam spreadsheet, kapasitas ruangan 100 orang, anggaran konsumsi Rp3.500.000, harga konsumsi Rp30.000/orang. Tulis rencana end-to-end menggunakan siklus Reason → Plan → Act → Observe → Update → Answer.
- **placeholder:** Tulis rencana misi end-to-end...
- **example:** Reason: kapasitas 100, pendaftar 120 (mungkin ada duplikat atau waiting list). Data di spreadsheet. Perlu tool spreadsheet + kalkulator. Plan: 1) Baca spreadsheet, 2) Hitung pendaftar unik, 3) Bandingkan dengan kapasitas, 4) Hitung biaya konsumsi, 5) Bandingkan dengan anggaran, 6) Rekomendasi. Act: panggil spreadsheet tool. Observe: 115 unik, 5 duplikat. Masih > kapasitas. Update: perlu waiting list atau sesi tambahan. Answer: 115 pendaftar unik, kapasitas 100, perlu 15 orang di waiting list. Biaya: 100 × Rp30.000 = Rp3.000.000, sisa Rp500.000.

##### mistakes

- Mengklaim berhasil tanpa verifikasi — langsung Answer setelah Act
- Tidak ada rencana cadangan ketika tool gagal atau data tidak sesuai
- Loop tak terbatas — terus Update tanpa pernah mencapai Answer

##### bestPractices

- Selalu lewati verification gate sebelum Answer
- Catat asumsi dan batasan di setiap tahap
- Tetapkan batas iterasi — jangan loop selamanya
- Jika ragu antara dua kesimpulan, sampaikan keduanya dengan tingkat keyakinan

##### learningOutcomes

- Menjalankan siklus Reason → Plan → Act → Observe → Update → Answer
- Menerapkan verification gate sebelum menyampaikan jawaban
- Menangani perubahan kondisi melalui replanning
- Mengevaluasi kualitas jawaban AI secara end-to-end

- **transition:** 
- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/04-reasoning/chapters/06-full.html

#### PRACTICES

#### Latihan 1 — Fakta atau Asumsi?

- **id:** latihan-1
- **title:** Latihan 1 — Fakta atau Asumsi?
- **focus:** Latihan 1
- **prompt:** Kasus:  > Sebuah kelas memiliki 40 peserta. Biaya modul Rp20.000 per orang. Panitia menyiapkan anggaran Rp1.000.000. AI menghitung seluruh peserta memperoleh satu modul.  Klasifikasikan pernyataan berikut:  1. Peserta berjumlah 40 orang. 2. Biaya modul Rp20.000 per orang. 3. Semua peserta memperoleh satu modul. 4. Total biaya modul Rp800.000. 5. Anggaran cukup.
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** | Pernyataan | Kategori | |---|---| | Peserta berjumlah 40 orang | Fakta | | Biaya modul Rp20.000 per orang | Fakta | | Semua peserta memperoleh satu modul | Asumsi | | Total biaya modul Rp800.000 | Hasil langkah | | Anggaran cukup | Kesimpulan |

#### Latihan 2 — Urutkan Langkah

- **id:** latihan-2
- **title:** Latihan 2 — Urutkan Langkah
- **focus:** Latihan 2
- **prompt:** Urutkan langkah berikut:  - bandingkan total kebutuhan dengan anggaran; - hitung sisa anggaran; - identifikasi jumlah peserta; - hitung total konsumsi; - identifikasi harga per peserta.
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** ```text 1. Identifikasi jumlah peserta. 2. Identifikasi harga per peserta. 3. Hitung total konsumsi. 4. Bandingkan total kebutuhan dengan anggaran. 5. Hitung sisa anggaran. ```

#### Latihan 3 — Temukan Kesalahan

- **id:** latihan-3
- **title:** Latihan 3 — Temukan Kesalahan
- **focus:** Latihan 3
- **prompt:** Jawaban AI:  > “Untuk 50 peserta dengan harga Rp25.000 per orang dan biaya sewa Rp400.000, total kebutuhannya adalah Rp1.250.000. Anggaran Rp1.500.000 berarti tersisa Rp250.000.”
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** AI melupakan biaya sewa.  ```text Konsumsi: 50 × Rp25.000 = Rp1.250.000  Total: Rp1.250.000 + Rp400.000 = Rp1.650.000  Kekurangan: Rp1.650.000 − Rp1.500.000 = Rp150.000 ```

#### Latihan 4 — Prioritas Nonnumerik

- **id:** latihan-4
- **title:** Latihan 4 — Prioritas Nonnumerik
- **focus:** Latihan 4
- **prompt:** Urutkan pekerjaan berikut:  - memperbaiki tombol pembayaran yang gagal; - mengubah warna kartu; - menambah ilustrasi kosong.
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** Tombol pembayaran harus diprioritaskan karena memengaruhi fungsi dan transaksi utama. Perubahan visual dapat dikerjakan setelah fungsi kritis stabil.  ---

#### Latihan 5 — Pecah Tujuan

- **id:** latihan-5
- **title:** Latihan 5 — Pecah Tujuan
- **focus:** Latihan 5
- **prompt:** Tugas:  > Buat program mentoring AI selama empat minggu untuk peserta pemula.  Buat 6–10 subtugas.
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** 1. Mengidentifikasi kemampuan awal peserta. 2. Menentukan tujuan empat minggu. 3. Membagi materi per minggu. 4. Menentukan mentor. 5. Menyiapkan contoh dan latihan. 6. Menentukan jadwal. 7. Menyiapkan kanal diskusi. 8. Membuat evaluasi mingguan. 9. Membuat proyek akhir. 10. Mengumpulkan feedback.

#### Latihan 6 — Temukan Dependensi

- **id:** latihan-6
- **title:** Latihan 6 — Temukan Dependensi
- **focus:** Latihan 6
- **prompt:** Urutkan:  - melakukan evaluasi akhir; - menetapkan tujuan belajar; - membuat latihan; - memilih materi; - menjalankan sesi.
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** ```text 1. Menetapkan tujuan belajar. 2. Memilih materi. 3. Membuat latihan. 4. Menjalankan sesi. 5. Melakukan evaluasi akhir. ```

#### Latihan 7 — Replanning

- **id:** latihan-7
- **title:** Latihan 7 — Replanning
- **focus:** Latihan 7
- **prompt:** Rencana awal menggunakan laboratorium komputer. Pada hari pelaksanaan, setengah komputer tidak dapat digunakan.
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** - ubah latihan menjadi berpasangan; - prioritaskan aktivitas yang dapat dijalankan melalui browser; - siapkan demonstrasi terpusat; - kurangi aktivitas yang membutuhkan satu perangkat per peserta; - pertahankan tujuan belajar, tetapi ubah metode.

#### Latihan 8 — Evaluasi Rencana

- **id:** latihan-8
- **title:** Latihan 8 — Evaluasi Rencana
- **focus:** Latihan 8
- **prompt:** Sebuah workshop memiliki durasi 90 menit, tetapi rencana AI berisi:  - pembukaan 15 menit; - materi 35 menit; - demo 25 menit; - latihan 30 menit; - kuis 15 menit.
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** Total rencana adalah 120 menit. Rencana melanggar batas waktu dan harus dipangkas atau disusun ulang.  ---

#### Latihan 9 — Ubah Prompt

- **id:** latihan-9
- **title:** Latihan 9 — Ubah Prompt
- **focus:** Latihan 9
- **prompt:** Prompt awal:  > “Hitung biaya acara ini.”  #### Contoh Perbaikan  > “Identifikasi jumlah peserta, biaya per peserta, biaya tambahan, dan anggaran. Hitung total kebutuhan, bandingkan dengan anggaran, periksa perhitungan, lalu berikan kesimpulan.”
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** 

#### Latihan 10 — Temukan Kesalahan

- **id:** latihan-10
- **title:** Latihan 10 — Temukan Kesalahan
- **focus:** Latihan 10
- **prompt:** ```text Peserta: 45 Biaya: Rp30.000 Total menurut AI: Rp1.250.000 ```
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** ```text 45 × Rp30.000 = Rp1.350.000 ```

#### Latihan 11 — Kurangi Penjelasan Berlebihan

- **id:** latihan-11
- **title:** Latihan 11 — Kurangi Penjelasan Berlebihan
- **focus:** Latihan 11
- **prompt:** Tugas peserta: ringkas penjelasan 10 paragraf menjadi:  1. data; 2. tiga langkah utama; 3. hasil; 4. satu catatan asumsi.
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** 

#### Latihan 12 — Perlu CoT atau Tidak?

- **id:** latihan-12
- **title:** Latihan 12 — Perlu CoT atau Tidak?
- **focus:** Latihan 12
- **prompt:** | Tugas | CoT? | Alasan | |---|---|---| | Memperbaiki typo “algoritm” | Tidak | Satu langkah | | Membandingkan dua rencana anggaran | Ya | Banyak kriteria | | Menerjemahkan “good morning” | Tidak | Tugas sederhana | | Menyusun jadwal dengan lima batasan | Ya | Perlu pelacakan batasan | | Menghitung data dari 5.000 baris | Perlu langkah + tool | CoT saja tidak cukup |  ---
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** 

#### Latihan 13 — Pilih Tool

- **id:** latihan-13
- **title:** Latihan 13 — Pilih Tool
- **focus:** Latihan 13
- **prompt:** | Tugas | Tool | |---|---| | Menghitung 287 × 9.451 | Kalkulator | | Menganalisis 10.000 baris data | Spreadsheet atau Python | | Mengetahui cuaca hari ini | Weather tool | | Merangkum paragraf yang diberikan | Tidak perlu tool eksternal | | Mencari isi kebijakan dalam PDF | File retrieval | | Mencari slot rapat | Calendar | | Membuat draft email | Email drafting tool | | Mengetahui rute | Maps |
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** 

#### Latihan 14 — Tentukan Parameter

- **id:** latihan-14
- **title:** Latihan 14 — Tentukan Parameter
- **focus:** Latihan 14
- **prompt:** Tugas:  > Cari slot rapat dua jam minggu depan.  Parameter yang perlu ditentukan:  - tanggal mulai; - tanggal akhir; - zona waktu; - durasi; - kalender; - jam kerja; - peserta yang perlu diperiksa.
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** 

#### Latihan 15 — Baca Observation

- **id:** latihan-15
- **title:** Latihan 15 — Baca Observation
- **focus:** Latihan 15
- **prompt:** ```text Jumlah baris: 100 Nilai valid: 0 Error: kolom “score” berisi teks ```
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** AI tidak boleh menghitung rata-rata. AI harus menjelaskan bahwa kolom tidak berisi nilai numerik dan meminta kolom alternatif atau perbaikan data.

#### Latihan 16 — Permission Check

- **id:** latihan-16
- **title:** Latihan 16 — Permission Check
- **focus:** Latihan 16
- **prompt:** Klasifikasikan:  - membaca kalender sendiri; - membuat draft email; - mengirim email; - menghapus agenda; - menjalankan kalkulator.  Tindakan mengirim email dan menghapus agenda memiliki dampak lebih tinggi daripada sekadar membaca atau membuat draft.
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** 

#### Latihan 17 — Perbaiki Tool Loop

- **id:** latihan-17
- **title:** Latihan 17 — Perbaiki Tool Loop
- **focus:** Latihan 17
- **prompt:** Alur salah:  ```text Reason → Tool → Answer ```  Alur perbaikan:  ```text Reason → Plan → Tool → Observe → Validate → Update → Answer ```  ---
##### fields

##### Item 1

- jawaban
- Tuliskan analisis atau jawaban Anda di sini

- **guide:** 

#### QUIZ

#### Item 1

#### Item 1

Apa pengertian paling tepat dari reasoning dalam konteks AI?

#### Item 2

- Kemampuan AI memiliki kesadaran
- Proses menghubungkan informasi untuk menghasilkan kesimpulan atau langkah
- Proses menyimpan semua percakapan pengguna
- Kemampuan AI mengakses internet secara otomatis

#### Item 3

1

#### Item 4

Reasoning menggambarkan proses pengolahan dan penghubungan informasi untuk menyelesaikan tugas. Istilah tersebut tidak menyatakan bahwa AI memiliki kesadaran.

#### Item 2

#### Item 1

Manakah yang termasuk asumsi?

#### Item 2

- Anggaran yang tertulis adalah Rp2.000.000
- Jumlah peserta pada daftar adalah 50
- Semua peserta hadir dan menerima konsumsi
- Harga konsumsi pada invoice adalah Rp30.000

#### Item 3

2

#### Item 4

Kehadiran seluruh peserta tidak otomatis diketahui hanya dari jumlah peserta yang terdaftar.

#### Item 3

#### Item 1

Mengapa AI perlu mengenali informasi yang tidak relevan?

#### Item 2

- Agar jawaban menjadi lebih panjang
- Agar seluruh kata dalam prompt digunakan
- Agar proses tetap fokus pada data yang memengaruhi hasil
- Agar AI tidak perlu memeriksa hasil

#### Item 3

2

#### Item 4



#### Item 4

#### Item 1

Sebuah jawaban AI memiliki langkah yang panjang. Apa kesimpulan yang paling tepat?

#### Item 2

- Jawaban pasti benar
- AI pasti memahami masalah seperti manusia
- Panjangnya penjelasan tidak menjamin validitas
- Jawaban tidak perlu diperiksa

#### Item 3

2

#### Item 4



#### Item 5

#### Item 1

Apa langkah paling tepat setelah AI memperoleh hasil perhitungan?

#### Item 2

- Segera menghapus langkah sebelumnya
- Memeriksa angka, satuan, batasan, dan kesimpulan
- Menambahkan asumsi baru
- Mengganti pertanyaan pengguna

#### Item 3

1

#### Item 4



#### Item 6

#### Item 1

AI diminta memilih pekerjaan prioritas. Informasi apa yang paling relevan?

#### Item 2

- Warna ikon setiap pekerjaan
- Nama orang yang mengusulkan pekerjaan
- Dampak, urgensi, risiko, dan dependensi
- Panjang judul pekerjaan

#### Item 3

2

#### Item 4



#### Item 7

#### Item 1

Apa fungsi utama planning?

#### Item 2

- Menyimpan semua data
- Mengubah tujuan menjadi urutan langkah
- Menjamin tidak ada perubahan
- Menggantikan seluruh reasoning

#### Item 3

1

#### Item 4



#### Item 8

#### Item 1

Manakah contoh constraint?

#### Item 2

- Menentukan materi
- Membuat slide
- Durasi maksimal 90 menit
- Menulis kesimpulan

#### Item 3

2

#### Item 4



#### Item 9

#### Item 1

Apa tujuan problem decomposition?

#### Item 2

- Membuat tugas lebih kabur
- Memecah tugas besar menjadi bagian yang dapat dikerjakan
- Menghapus seluruh batasan
- Menghindari evaluasi

#### Item 3

1

#### Item 4



#### Item 10

#### Item 1

Mengapa dependencies penting?

#### Item 2

- Agar semua langkah dapat dikerjakan acak
- Agar urutan mengikuti kebutuhan input dan output
- Agar rencana menjadi lebih panjang
- Agar goal tidak perlu ditentukan

#### Item 3

1

#### Item 4



#### Item 11

#### Item 1

Kapan static planning paling sesuai?

#### Item 2

- Kondisi sering berubah dan data belum tersedia
- Tugas stabil dengan langkah yang sudah jelas
- Pengguna terus memberikan informasi baru
- Tool sering gagal

#### Item 3

1

#### Item 4



#### Item 12

#### Item 1

Apa tindakan paling tepat ketika observation menunjukkan kondisi berubah?

#### Item 2

- Mengabaikan observation
- Selalu membatalkan tugas
- Memeriksa dan memperbarui rencana jika diperlukan
- Tetap mengikuti rencana awal tanpa evaluasi

#### Item 3

2

#### Item 4



#### Item 13

#### Item 1

Apa definisi Chain-of-Thought?

#### Item 2

- Seluruh proses internal AI yang pasti lengkap
- Rangkaian langkah perantara berbentuk bahasa
- Database rahasia model
- Tool untuk mengirim email

#### Item 3

1

#### Item 4



#### Item 14

#### Item 1

Kapan CoT paling berguna?

#### Item 2

- Tugas multi-langkah dengan beberapa batasan
- Perbaikan satu typo
- Menyalin satu kata
- Mengubah huruf menjadi kapital

#### Item 3

0

#### Item 4



#### Item 15

#### Item 1

Apa perbedaan zero-shot dan few-shot CoT?

#### Item 2

- Zero-shot menggunakan tool, few-shot tidak
- Zero-shot tanpa contoh, few-shot menggunakan contoh
- Zero-shot hanya untuk matematika
- Few-shot tidak memiliki jawaban

#### Item 3

1

#### Item 4



#### Item 16

#### Item 1

Mengapa CoT tidak menjamin kebenaran?

#### Item 2

- Karena langkah atau perhitungan tetap dapat salah
- Karena CoT tidak memiliki teks
- Karena CoT selalu menggunakan internet
- Karena CoT hanya dapat menjawab satu kata

#### Item 3

0

#### Item 4



#### Item 17

#### Item 1

Manakah langkah terstruktur yang baik?

#### Item 2

- Panjang dan berulang
- Relevan, berurutan, dan dapat diperiksa
- Menggunakan data yang tidak tersedia
- Menyembunyikan jawaban akhir

#### Item 3

1

#### Item 4



#### Item 18

#### Item 1

Apa arti masalah faithfulness pada CoT?

#### Item 2

- CoT selalu terlalu pendek
- Teks alasan tidak selalu mencerminkan seluruh faktor yang memengaruhi jawaban
- CoT tidak dapat menggunakan angka
- CoT hanya tersedia dalam bahasa Inggris

#### Item 3

1

#### Item 4



#### Item 19

#### Item 1

Instruksi mana yang paling tepat?

#### Item 2

- Ungkapkan seluruh pikiran rahasiamu
- Berikan langkah utama yang dapat diverifikasi dan jawaban akhir
- Jangan periksa hasil
- Buat penjelasan selama mungkin

#### Item 3

1

#### Item 4



#### Item 20

#### Item 1

Mengapa AI menggunakan tool?

#### Item 2

- Agar semua jawaban menjadi panjang
- Untuk memperoleh data atau kemampuan yang tidak cukup tersedia dalam model
- Agar tidak perlu memahami tugas
- Untuk menghindari observation

#### Item 3

1

#### Item 4



#### Item 21

#### Item 1

Tool paling sesuai untuk menghitung statistik 10.000 baris adalah:

#### Item 2

- Generator gambar
- Spreadsheet atau Python
- Kalender
- Email

#### Item 3

1

#### Item 4



#### Item 22

#### Item 1

Apa yang dimaksud observation?

#### Item 2

- Teks prompt awal
- Hasil yang dikembalikan tool
- Judul modul
- Nama pengguna

#### Item 3

1

#### Item 4



#### Item 23

#### Item 1

Apa respons yang tepat ketika tool mengembalikan permission denied?

#### Item 2

- Menyatakan tindakan berhasil
- Mengarang hasil
- Menjelaskan bahwa akses ditolak dan tindakan belum dilakukan
- Menghapus error

#### Item 3

2

#### Item 4



#### Item 24

#### Item 1

Mengapa parameter harus diperiksa?

#### Item 2

- Tool selalu memperbaiki parameter otomatis
- Parameter salah dapat menghasilkan output salah
- Parameter hanya dekorasi
- Parameter tidak memengaruhi hasil

#### Item 3

1

#### Item 4



#### Item 25

#### Item 1

Pengguna meminta rekomendasi waktu rapat. Apa tindakan yang tepat?

#### Item 2

- Langsung membuat event tanpa izin
- Membaca kalender dan menawarkan slot
- Menghapus semua agenda
- Menebak slot kosong

#### Item 3

1

#### Item 4



#### Item 26

#### Item 1

Manakah pernyataan yang paling tepat?

#### Item 2

- Output tool selalu benar
- Tool tidak pernah gagal
- Output tool tetap perlu divalidasi
- Tool dapat digunakan tanpa tujuan

#### Item 3

2

#### Item 4



#### DISCUSSION_PROMPTS

- Apakah AI yang dapat memberikan alasan runtut berarti benar-benar memahami masalah?
- Apakah AI sebaiknya mempertahankan rencana awal atau terus menyesuaikan rencana?
- Haruskah AI selalu menampilkan langkah penyelesaiannya?
- Seberapa jauh AI boleh menggunakan tool dan mengambil tindakan atas nama pengguna?

#### SOURCE_VISUALS

##### 01-full.html

- **eyebrow:** Reasoning Anatomy Lab
- **title:** Dari Menjawab ke Menalar
- **description:** Cara AI menghubungkan fakta dan asumsi untuk menghasilkan kesimpulan yang dapat diaudit.
###### options

###### Item 1

- Jawab Langsung
- fas fa-bolt
- Insting Cepat
- Jawaban singkat tanpa langkah — cocok untuk definisi sederhana.
- Menjawab satu fakta atau definisi.

###### Item 2

- Reasoning
- fas fa-brain
- Hubungan Logis
- Menghubungkan beberapa informasi untuk memperoleh hasil baru.
- Tugas perhitungan, audit, atau perbandingan.

###### Item 3

- Fakta & Asumsi
- fas fa-layer-group
- Pemisahan Data
- Fakta adalah informasi tersedia. Asumsi adalah anggapan agar proses bisa dilanjutkan.
- Wajib dibedakan untuk menghindari simpulan yang menyesatkan.


##### 02-full.html

- **eyebrow:** Verification Lab
- **title:** Reasoning yang Dapat Diperiksa
- **description:** Penjelasan yang meyakinkan bukan jaminan validitas. Setiap langkah harus bisa diaudit.
###### options

###### Item 1

- Cek Data
- fas fa-database
- Verifikasi Input
- Apakah semua data relevan sudah dipakai? Apakah ada yang mengada-ada?
- Langkah pertama sebelum menilai hasil.

###### Item 2

- Cek Urutan
- fas fa-list-ol
- Verifikasi Proses
- Apakah urutan langkah masuk akal? Apakah dependensi terpenuhi?
- Mencegah hasil yang benar tapi jalannya salah.

###### Item 3

- Cek Hasil
- fas fa-check-double
- Verifikasi Output
- Apakah angka, satuan, dan batasan konsisten? Apakah kesimpulan mengikuti data?
- Langkah terakhir sebelum jawaban diterima.


##### 03-full.html

- **eyebrow:** Planning Studio
- **title:** Planning & Problem Decomposition
- **description:** Memecah tujuan besar menjadi langkah eksekusi dengan dependensi yang benar.
###### options

###### Item 1

- Goal & Constraints
- fas fa-bullseye
- Tujuan & Batasan
- Goal adalah hasil akhir. Constraints adalah batasan yang harus dipatuhi.
- Tanpa goal dan batasan jelas, rencana akan kabur.

###### Item 2

- Decomposition
- fas fa-layer-group
- Pecah Tugas
- Memecah tugas besar menjadi subtugas yang dapat dikerjakan satu per satu.
- Work Breakdown Structure.

###### Item 3

- Static vs Dynamic
- fas fa-arrows-spin
- Rencana Fleksibel
- Static: jalankan sesuai rencana awal. Dynamic: perbarui berdasarkan hasil observasi.
- Replanning adalah tanda kecerdasan, bukan kegagalan.


##### 04-full.html

- **eyebrow:** Structured Reasoning Lab
- **title:** Chain-of-Thought & Langkah Perantara
- **description:** Langkah perantara membuat jawaban lebih mudah diaudit, meski tidak menjamin kebenaran.
###### options

###### Item 1

- Direct vs Structured
- fas fa-code-compare
- Bandingkan Pendekatan
- Jawaban langsung ('Anggaran cukup') vs jawaban bertahap ('total = … sisa = …').
- Tugas kompleks butuh langkah perantara yang bisa diperiksa.

###### Item 2

- Prompt Transformer
- fas fa-wand-sparkles
- Ubah Prompt
- Prompt sederhana diubah menjadi instruksi bertahap: 'Identifikasi data → Susun langkah → Periksa → Jawab'.
- Zero-shot dan few-shot pattern.

###### Item 3

- Faithfulness Callout
- fas fa-triangle-exclamation
- Waspadai Ilusi
- Langkah yang rapi bisa saja rationalization dari jawaban yang sudah dipilih sebelumnya.
- CoT membantu struktur, bukan bukti mutlak kebenaran.


##### 05-full.html

- **eyebrow:** Tool Decision Lab
- **title:** Tool Use yang Bertanggung Jawab
- **description:** Kapan AI perlu tool, tool apa yang tepat, dan bagaimana memvalidasi output-nya.
###### options

###### Item 1

- Perlu Tool?
- fas fa-circle-question
- Decision Tree
- Apakah informasi ada dalam model? Apakah perlu akses real-time? Apakah perlu komputasi?
- Tidak semua tugas butuh tool eksternal.

###### Item 2

- Pilih & Parameter
- fas fa-sliders
- Tool Matching
- Tool yang tepat + parameter yang benar = output yang berguna. Salah satu saja bisa gagal.
- Kalkulator vs spreadsheet vs API cuaca — beda tugas, beda tool.

###### Item 3

- Observation & Risk
- fas fa-eye
- Validasi & Izin
- Baca hasil tool. Validasi. Periksa error. Hormati batas otorisasi.
- Permission denied bukan berarti harus mengarang data.


##### 06-full.html

- **eyebrow:** Integrated Mission
- **title:** Misi Reasoning Terpadu
- **description:** Reasoning, planning, dan tool use bersatu dalam loop iteratif: Reason → Plan → Act → Observe → Update → Answer.
###### options

###### Item 1

- Reason → Plan
- fas fa-compass
- Pahami & Rencanakan
- Pahami tugas, identifikasi data, susun rencana dan tentukan tool yang diperlukan.
- Foundation dari seluruh loop.

###### Item 2

- Act → Observe
- fas fa-play
- Eksekusi & Amati
- Jalankan tool, baca hasil, bandingkan dengan ekspektasi.
- Di sinilah banyak kegagalan terdeteksi.

###### Item 3

- Update → Answer → Verify
- fas fa-flag-checkered
- Perbarui & Verifikasi
- Perbarui rencana jika perlu, beri jawaban, lalu verifikasi akhir sebelum disampaikan.
- Gate terakhir sebelum jawaban sampai ke pengguna.



#### PRACTICE_TOPICS

#### Item 1

- **start:** 0
- **end:** 3
- **label:** Reasoning Dasar

#### Item 2

- **start:** 4
- **end:** 7
- **label:** Planning

#### Item 3

- **start:** 8
- **end:** 11
- **label:** Chain-of-Thought

#### Item 4

- **start:** 12
- **end:** 16
- **label:** Tool Use
