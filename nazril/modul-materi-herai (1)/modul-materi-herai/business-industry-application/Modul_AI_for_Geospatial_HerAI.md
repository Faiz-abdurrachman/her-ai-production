---
course_id: ai-for-geospatial
title: AI for Geospatial
slug: ai-for-geospatial
category: Applied AI
sub_category: Geospatial
level: Intermediate
language: id
status: ready
version: 1.0.0
estimated_duration: 20-24 jam
route: /participant/courses/ai-for-geospatial
updated_at: 2026-07-23
---

# AI for Geospatial

> **HerAI Fellowship - Participant Module**  
> Mengolah lokasi, peta, citra bumi, dan waktu menjadi analisis spasial yang bertanggung jawab.

## Tentang Modul

AI for Geospatial mencakup vector, raster, CRS, remote sensing, feature engineering, spatial validation, computer vision bumi, forecasting spatiotemporal, uncertainty, location privacy, dan web maps.

Modul disusun dengan bahasa bertahap. Setiap bab berisi tujuan, konsep inti, alur kerja, contoh kasus, kesalahan umum, checkpoint, dan latihan. Peserta tidak perlu menghafal seluruh istilah. Yang lebih penting adalah memahami hubungan antarkomponen dan mampu menjelaskan alasan di balik sebuah pilihan.

## Capaian Pembelajaran

Setelah menyelesaikan modul, peserta mampu:

- menjelaskan fondasi dan istilah utama AI for Geospatial;
- menerjemahkan kebutuhan menjadi rancangan yang dapat diuji;
- membuat prototipe kecil dengan dokumentasi dan kontrol dasar;
- mengevaluasi kualitas, risiko, keterbatasan, serta biaya;
- menyampaikan hasil dan rekomendasi kepada pemangku kepentingan.

## Prasyarat

- Python, statistika dasar, dan pengantar machine learning.
- Mampu membaca diagram sederhana dan mengikuti contoh kode.
- Bersedia mencatat asumsi, kegagalan, dan keputusan selama latihan.

## Cara Belajar yang Disarankan

1. Baca gambaran dan tujuan setiap bab.
2. Buat catatan istilah dengan bahasa sendiri.
3. Kerjakan checkpoint sebelum melihat kembali materi.
4. Jalankan atau adaptasi contoh kode bila relevan.
5. Gunakan mini project sebagai portofolio, bukan sekadar tugas akhir.
6. Lakukan review keamanan, privasi, dan dampak sebelum demonstrasi.

## Peta Materi

| Tahap | Fokus | Hasil |
|---|---|---|
| Fondasi | Istilah, tujuan, konteks, dan arsitektur | Peta masalah yang jelas |
| Pembangunan | Data, proses, komponen, dan integrasi | Baseline yang dapat diuji |
| Evaluasi | Kualitas, risiko, subgroup, biaya | Bukti dan daftar keterbatasan |
| Operasi | Monitoring, ownership, respons, iterasi | Sistem yang dapat dipelihara |

---

# Bab 1 - Spatial Thinking dan Pertanyaan Lokasi

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran spatial thinking dan pertanyaan lokasi dalam AI for Geospatial;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Spatial Thinking dan Pertanyaan Lokasi tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data geospasial seperti cerita yang terikat tempat: memindahkan titik atau memakai sistem koordinat yang salah dapat mengubah makna, walaupun angka lainnya terlihat benar.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **location** | konsep penting dalam spatial thinking dan pertanyaan lokasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana location diukur, diuji, atau dikendalikan? |
| **distance** | konsep penting dalam spatial thinking dan pertanyaan lokasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana distance diukur, diuji, atau dikendalikan? |
| **neighborhood** | konsep penting dalam spatial thinking dan pertanyaan lokasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana neighborhood diukur, diuji, atau dikendalikan? |
| **scale** | konsep penting dalam spatial thinking dan pertanyaan lokasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana scale diukur, diuji, atau dikendalikan? |
| **pattern** | konsep penting dalam spatial thinking dan pertanyaan lokasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana pattern diukur, diuji, atau dikendalikan? |
| **spatial dependence** | konsep penting dalam spatial thinking dan pertanyaan lokasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana spatial dependence diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **location -> distance -> neighborhood -> scale**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **location** dapat memengaruhi **distance**, lalu mengubah cara **neighborhood** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan spatial thinking dan pertanyaan lokasi dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk location serta distance.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prioritas Risiko Banjir Berbasis Wilayah**, tim perlu menerapkan spatial thinking dan pertanyaan lokasi secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **location** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan spatial thinking dan pertanyaan lokasi.
- Menganggap location sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan location dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara distance dan neighborhood dalam bab ini?
3. Sebutkan satu risiko ketika spatial thinking dan pertanyaan lokasi diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan location, distance, neighborhood, scale. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 2 - Vector, Raster, dan Coordinate Reference System

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran vector, raster, dan coordinate reference system dalam AI for Geospatial;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Vector, Raster, dan Coordinate Reference System tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data geospasial seperti cerita yang terikat tempat: memindahkan titik atau memakai sistem koordinat yang salah dapat mengubah makna, walaupun angka lainnya terlihat benar.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **point** | konsep penting dalam vector, raster, dan coordinate reference system yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana point diukur, diuji, atau dikendalikan? |
| **line** | konsep penting dalam vector, raster, dan coordinate reference system yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana line diukur, diuji, atau dikendalikan? |
| **polygon** | konsep penting dalam vector, raster, dan coordinate reference system yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana polygon diukur, diuji, atau dikendalikan? |
| **raster** | konsep penting dalam vector, raster, dan coordinate reference system yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana raster diukur, diuji, atau dikendalikan? |
| **CRS** | sistem referensi yang menjelaskan bagaimana koordinat dipetakan ke bumi | Pertanyaan yang perlu dijawab: bagaimana CRS diukur, diuji, atau dikendalikan? |
| **projection** | konsep penting dalam vector, raster, dan coordinate reference system yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana projection diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **point -> line -> polygon -> raster**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **point** dapat memengaruhi **line**, lalu mengubah cara **polygon** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan vector, raster, dan coordinate reference system dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk point serta line.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prioritas Risiko Banjir Berbasis Wilayah**, tim perlu menerapkan vector, raster, dan coordinate reference system secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **point** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan vector, raster, dan coordinate reference system.
- Menganggap point sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan point dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara line dan polygon dalam bab ini?
3. Sebutkan satu risiko ketika vector, raster, dan coordinate reference system diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan point, line, polygon, raster. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 3 - Sumber Data dan Remote Sensing

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran sumber data dan remote sensing dalam AI for Geospatial;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Sumber Data dan Remote Sensing tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data geospasial seperti cerita yang terikat tempat: memindahkan titik atau memakai sistem koordinat yang salah dapat mengubah makna, walaupun angka lainnya terlihat benar.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **survey** | konsep penting dalam sumber data dan remote sensing yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana survey diukur, diuji, atau dikendalikan? |
| **GPS** | konsep penting dalam sumber data dan remote sensing yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana GPS diukur, diuji, atau dikendalikan? |
| **satellite** | konsep penting dalam sumber data dan remote sensing yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana satellite diukur, diuji, atau dikendalikan? |
| **drone** | konsep penting dalam sumber data dan remote sensing yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana drone diukur, diuji, atau dikendalikan? |
| **open data** | konsep penting dalam sumber data dan remote sensing yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana open data diukur, diuji, atau dikendalikan? |
| **metadata** | konsep penting dalam sumber data dan remote sensing yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana metadata diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **survey -> GPS -> satellite -> drone**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **survey** dapat memengaruhi **GPS**, lalu mengubah cara **satellite** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan sumber data dan remote sensing dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk survey serta GPS.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prioritas Risiko Banjir Berbasis Wilayah**, tim perlu menerapkan sumber data dan remote sensing secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **survey** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan sumber data dan remote sensing.
- Menganggap survey sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan survey dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara GPS dan satellite dalam bab ini?
3. Sebutkan satu risiko ketika sumber data dan remote sensing diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan survey, GPS, satellite, drone. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 4 - Preprocessing Data Geospasial

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran preprocessing data geospasial dalam AI for Geospatial;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Preprocessing Data Geospasial tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data geospasial seperti cerita yang terikat tempat: memindahkan titik atau memakai sistem koordinat yang salah dapat mengubah makna, walaupun angka lainnya terlihat benar.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **reprojection** | konsep penting dalam preprocessing data geospasial yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana reprojection diukur, diuji, atau dikendalikan? |
| **clipping** | konsep penting dalam preprocessing data geospasial yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana clipping diukur, diuji, atau dikendalikan? |
| **resampling** | konsep penting dalam preprocessing data geospasial yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana resampling diukur, diuji, atau dikendalikan? |
| **geocoding** | konsep penting dalam preprocessing data geospasial yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana geocoding diukur, diuji, atau dikendalikan? |
| **topology** | konsep penting dalam preprocessing data geospasial yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana topology diukur, diuji, atau dikendalikan? |
| **missing** | konsep penting dalam preprocessing data geospasial yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana missing diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **reprojection -> clipping -> resampling -> geocoding**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **reprojection** dapat memengaruhi **clipping**, lalu mengubah cara **resampling** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan preprocessing data geospasial dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk reprojection serta clipping.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prioritas Risiko Banjir Berbasis Wilayah**, tim perlu menerapkan preprocessing data geospasial secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **reprojection** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan preprocessing data geospasial.
- Menganggap reprojection sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan reprojection dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara clipping dan resampling dalam bab ini?
3. Sebutkan satu risiko ketika preprocessing data geospasial diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan reprojection, clipping, resampling, geocoding. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 5 - Spatial Feature Engineering

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran spatial feature engineering dalam AI for Geospatial;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Spatial Feature Engineering tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data geospasial seperti cerita yang terikat tempat: memindahkan titik atau memakai sistem koordinat yang salah dapat mengubah makna, walaupun angka lainnya terlihat benar.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **buffer** | konsep penting dalam spatial feature engineering yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana buffer diukur, diuji, atau dikendalikan? |
| **distance** | konsep penting dalam spatial feature engineering yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana distance diukur, diuji, atau dikendalikan? |
| **density** | konsep penting dalam spatial feature engineering yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana density diukur, diuji, atau dikendalikan? |
| **zonal statistic** | konsep penting dalam spatial feature engineering yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana zonal statistic diukur, diuji, atau dikendalikan? |
| **network** | konsep penting dalam spatial feature engineering yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana network diukur, diuji, atau dikendalikan? |
| **neighborhood** | konsep penting dalam spatial feature engineering yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana neighborhood diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **buffer -> distance -> density -> zonal statistic**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **buffer** dapat memengaruhi **distance**, lalu mengubah cara **density** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan spatial feature engineering dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk buffer serta distance.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prioritas Risiko Banjir Berbasis Wilayah**, tim perlu menerapkan spatial feature engineering secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **buffer** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan spatial feature engineering.
- Menganggap buffer sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan buffer dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara distance dan density dalam bab ini?
3. Sebutkan satu risiko ketika spatial feature engineering diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan buffer, distance, density, zonal statistic. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 6 - Spatial Machine Learning dan Validation

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran spatial machine learning dan validation dalam AI for Geospatial;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Spatial Machine Learning dan Validation tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data geospasial seperti cerita yang terikat tempat: memindahkan titik atau memakai sistem koordinat yang salah dapat mengubah makna, walaupun angka lainnya terlihat benar.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **spatial split** | pemisahan data berdasarkan wilayah untuk menguji generalisasi spasial | Pertanyaan yang perlu dijawab: bagaimana spatial split diukur, diuji, atau dikendalikan? |
| **autocorrelation** | konsep penting dalam spatial machine learning dan validation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana autocorrelation diukur, diuji, atau dikendalikan? |
| **leakage** | konsep penting dalam spatial machine learning dan validation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana leakage diukur, diuji, atau dikendalikan? |
| **imbalance** | konsep penting dalam spatial machine learning dan validation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana imbalance diukur, diuji, atau dikendalikan? |
| **baseline** | pendekatan sederhana sebagai pembanding minimum | Pertanyaan yang perlu dijawab: bagaimana baseline diukur, diuji, atau dikendalikan? |
| **generalization** | konsep penting dalam spatial machine learning dan validation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana generalization diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **spatial split -> autocorrelation -> leakage -> imbalance**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **spatial split** dapat memengaruhi **autocorrelation**, lalu mengubah cara **leakage** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan spatial machine learning dan validation dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk spatial split serta autocorrelation.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prioritas Risiko Banjir Berbasis Wilayah**, tim perlu menerapkan spatial machine learning dan validation secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **spatial split** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan spatial machine learning dan validation.
- Menganggap spatial split sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan spatial split dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara autocorrelation dan leakage dalam bab ini?
3. Sebutkan satu risiko ketika spatial machine learning dan validation diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan spatial split, autocorrelation, leakage, imbalance. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 7 - Computer Vision untuk Earth Observation

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran computer vision untuk earth observation dalam AI for Geospatial;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Computer Vision untuk Earth Observation tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data geospasial seperti cerita yang terikat tempat: memindahkan titik atau memakai sistem koordinat yang salah dapat mengubah makna, walaupun angka lainnya terlihat benar.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **classification** | konsep penting dalam computer vision untuk earth observation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana classification diukur, diuji, atau dikendalikan? |
| **detection** | konsep penting dalam computer vision untuk earth observation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana detection diukur, diuji, atau dikendalikan? |
| **segmentation** | konsep penting dalam computer vision untuk earth observation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana segmentation diukur, diuji, atau dikendalikan? |
| **change detection** | konsep penting dalam computer vision untuk earth observation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana change detection diukur, diuji, atau dikendalikan? |
| **label** | konsep penting dalam computer vision untuk earth observation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana label diukur, diuji, atau dikendalikan? |
| **resolution** | konsep penting dalam computer vision untuk earth observation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana resolution diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **classification -> detection -> segmentation -> change detection**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **classification** dapat memengaruhi **detection**, lalu mengubah cara **segmentation** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan computer vision untuk earth observation dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk classification serta detection.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prioritas Risiko Banjir Berbasis Wilayah**, tim perlu menerapkan computer vision untuk earth observation secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **classification** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan computer vision untuk earth observation.
- Menganggap classification sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan classification dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara detection dan segmentation dalam bab ini?
3. Sebutkan satu risiko ketika computer vision untuk earth observation diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan classification, detection, segmentation, change detection. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 8 - Spatiotemporal Forecasting

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran spatiotemporal forecasting dalam AI for Geospatial;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Spatiotemporal Forecasting tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data geospasial seperti cerita yang terikat tempat: memindahkan titik atau memakai sistem koordinat yang salah dapat mengubah makna, walaupun angka lainnya terlihat benar.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **time series** | konsep penting dalam spatiotemporal forecasting yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana time series diukur, diuji, atau dikendalikan? |
| **grid** | konsep penting dalam spatiotemporal forecasting yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana grid diukur, diuji, atau dikendalikan? |
| **mobility** | konsep penting dalam spatiotemporal forecasting yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana mobility diukur, diuji, atau dikendalikan? |
| **weather** | konsep penting dalam spatiotemporal forecasting yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana weather diukur, diuji, atau dikendalikan? |
| **lag** | konsep penting dalam spatiotemporal forecasting yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana lag diukur, diuji, atau dikendalikan? |
| **uncertainty** | tingkat ketidakpastian yang perlu ditampilkan dan dikelola | Pertanyaan yang perlu dijawab: bagaimana uncertainty diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **time series -> grid -> mobility -> weather**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **time series** dapat memengaruhi **grid**, lalu mengubah cara **mobility** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan spatiotemporal forecasting dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk time series serta grid.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prioritas Risiko Banjir Berbasis Wilayah**, tim perlu menerapkan spatiotemporal forecasting secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **time series** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan spatiotemporal forecasting.
- Menganggap time series sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan time series dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara grid dan mobility dalam bab ini?
3. Sebutkan satu risiko ketika spatiotemporal forecasting diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan time series, grid, mobility, weather. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 9 - Uncertainty, Ethics, dan Location Privacy

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran uncertainty, ethics, dan location privacy dalam AI for Geospatial;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Uncertainty, Ethics, dan Location Privacy tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data geospasial seperti cerita yang terikat tempat: memindahkan titik atau memakai sistem koordinat yang salah dapat mengubah makna, walaupun angka lainnya terlihat benar.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **uncertainty** | tingkat ketidakpastian yang perlu ditampilkan dan dikelola | Pertanyaan yang perlu dijawab: bagaimana uncertainty diukur, diuji, atau dikendalikan? |
| **aggregation** | konsep penting dalam uncertainty, ethics, dan location privacy yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana aggregation diukur, diuji, atau dikendalikan? |
| **re-identification** | konsep penting dalam uncertainty, ethics, dan location privacy yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana re-identification diukur, diuji, atau dikendalikan? |
| **bias** | konsep penting dalam uncertainty, ethics, dan location privacy yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana bias diukur, diuji, atau dikendalikan? |
| **harm** | konsep penting dalam uncertainty, ethics, dan location privacy yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana harm diukur, diuji, atau dikendalikan? |
| **consent** | konsep penting dalam uncertainty, ethics, dan location privacy yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana consent diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **uncertainty -> aggregation -> re-identification -> bias**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **uncertainty** dapat memengaruhi **aggregation**, lalu mengubah cara **re-identification** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan uncertainty, ethics, dan location privacy dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk uncertainty serta aggregation.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prioritas Risiko Banjir Berbasis Wilayah**, tim perlu menerapkan uncertainty, ethics, dan location privacy secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **uncertainty** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan uncertainty, ethics, dan location privacy.
- Menganggap uncertainty sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan uncertainty dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara aggregation dan re-identification dalam bab ini?
3. Sebutkan satu risiko ketika uncertainty, ethics, dan location privacy diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan uncertainty, aggregation, re-identification, bias. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 10 - Web Maps, Deployment, dan Monitoring

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran web maps, deployment, dan monitoring dalam AI for Geospatial;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Web Maps, Deployment, dan Monitoring tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data geospasial seperti cerita yang terikat tempat: memindahkan titik atau memakai sistem koordinat yang salah dapat mengubah makna, walaupun angka lainnya terlihat benar.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **tile** | konsep penting dalam web maps, deployment, dan monitoring yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana tile diukur, diuji, atau dikendalikan? |
| **API** | konsep penting dalam web maps, deployment, dan monitoring yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana API diukur, diuji, atau dikendalikan? |
| **map layer** | konsep penting dalam web maps, deployment, dan monitoring yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana map layer diukur, diuji, atau dikendalikan? |
| **cache** | konsep penting dalam web maps, deployment, dan monitoring yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana cache diukur, diuji, atau dikendalikan? |
| **update** | konsep penting dalam web maps, deployment, dan monitoring yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana update diukur, diuji, atau dikendalikan? |
| **monitoring** | konsep penting dalam web maps, deployment, dan monitoring yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana monitoring diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **tile -> API -> map layer -> cache**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **tile** dapat memengaruhi **API**, lalu mengubah cara **map layer** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan web maps, deployment, dan monitoring dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk tile serta API.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prioritas Risiko Banjir Berbasis Wilayah**, tim perlu menerapkan web maps, deployment, dan monitoring secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **tile** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan web maps, deployment, dan monitoring.
- Menganggap tile sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan tile dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara API dan map layer dalam bab ini?
3. Sebutkan satu risiko ketika web maps, deployment, dan monitoring diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan tile, API, map layer, cache. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 11 - Mini Project: Prioritas Risiko Banjir Berbasis Wilayah

## Tujuan Proyek

Menggabungkan data elevasi, curah hujan, sungai, dan populasi untuk membuat prioritas wilayah dengan spatial split, uncertainty note, dan peta interaktif.

Proyek harus cukup kecil untuk selesai, tetapi cukup lengkap untuk memperlihatkan alur berpikir. Nilai utama bukan pada tampilan atau kompleksitas, melainkan kejelasan tujuan, kualitas keputusan, pengujian, dan dokumentasi.

## Deliverable

- problem statement dan intended use;
- diagram arsitektur atau alur kerja;
- data dictionary atau inventaris sumber;
- baseline yang dapat dijalankan;
- hasil pengujian normal, error, dan kasus batas;
- daftar risiko serta kontrol;
- ringkasan hasil untuk audiens nonteknis;
- README dan rencana pengembangan.

## Tahapan Pengerjaan

1. Tulis masalah, pengguna, keputusan, dan batas penggunaan.
2. Buat inventaris data, sumber daya, pemilik, izin, serta risiko.
3. Rancang arsitektur atau alur kerja versi minimum.
4. Bangun baseline yang dapat dijalankan ulang.
5. Tambahkan validasi, logging, dan penanganan error.
6. Susun golden set atau skenario uji, termasuk kasus batas.
7. Ukur outcome, guardrail, performa, dan biaya.
8. Dokumentasikan hasil, keterbatasan, runbook, serta rencana iterasi.

## Contoh Kode Awal

```python
import geopandas as gpd

facilities = gpd.read_file("facilities.geojson").to_crs(32749)
areas = gpd.read_file("risk_areas.geojson").to_crs(facilities.crs)

facilities["geometry"] = facilities.buffer(1000)
joined = gpd.sjoin(areas, facilities, predicate="intersects", how="left")
summary = joined.groupby("area_id")["facility_id"].nunique().rename("nearby_facilities")
print(summary.head())
```

Kode tersebut hanya titik awal. Tambahkan pemeriksaan input, konfigurasi, test, logging, serta penanganan error sesuai konteks proyek.

## Rubrik Penilaian

| Aspek | Bobot | Indikator |
|---|---:|---|
| Problem framing | 15% | Pengguna, keputusan, outcome, dan batas jelas |
| Data atau input | 15% | Sumber, izin, kualitas, dan representasi dijelaskan |
| Rancangan | 15% | Komponen, interface, serta trade-off masuk akal |
| Implementasi | 20% | Baseline berjalan, modular, dan dapat diulang |
| Evaluasi | 15% | Metrik, kasus batas, serta subgroup diperiksa |
| Responsible practice | 10% | Privasi, keamanan, fairness, dan human review |
| Komunikasi | 10% | Dokumentasi dan demo mudah dipahami |

## Pertanyaan Review Proyek

1. Keputusan apa yang benar-benar dibantu proyek ini?
2. Apa kegagalan yang paling mungkin dan paling berbahaya?
3. Bukti apa yang menunjukkan solusi lebih baik daripada baseline?
4. Siapa yang berwenang menyetujui, menghentikan, atau mengubah sistem?
5. Informasi apa yang harus terlihat oleh pengguna agar tidak salah memahami hasil?

---

# Bab 12 - Kuis Akhir

Pilih jawaban yang paling tepat.

1. Ketika memulai **Spatial Thinking dan Pertanyaan Lokasi**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji location
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

2. Ketika memulai **Vector, Raster, dan Coordinate Reference System**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji point
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

3. Ketika memulai **Sumber Data dan Remote Sensing**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mendefinisikan tujuan, konteks, dan cara menguji survey
D. Mengukur keberhasilan hanya dari jumlah fitur

4. Ketika memulai **Preprocessing Data Geospasial**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mengukur keberhasilan hanya dari jumlah fitur
D. Mendefinisikan tujuan, konteks, dan cara menguji reprojection

5. Ketika memulai **Spatial Feature Engineering**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji buffer
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

6. Ketika memulai **Spatial Machine Learning dan Validation**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji spatial split
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

7. Ketika memulai **Computer Vision untuk Earth Observation**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mendefinisikan tujuan, konteks, dan cara menguji classification
D. Mengukur keberhasilan hanya dari jumlah fitur

8. Ketika memulai **Spatiotemporal Forecasting**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mengukur keberhasilan hanya dari jumlah fitur
D. Mendefinisikan tujuan, konteks, dan cara menguji time series

9. Ketika memulai **Uncertainty, Ethics, dan Location Privacy**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji uncertainty
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

10. Ketika memulai **Web Maps, Deployment, dan Monitoring**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji tile
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

11. Input penting berubah tanpa pemberitahuan. Kontrol terbaik adalah ...

A. menambah kompleksitas tanpa diagnosis
B. menyembunyikan error dari pengguna
C. Kontrak, validasi, versioning, dan alert
D. menghapus logging untuk menghemat ruang

12. Hasil sistem terlihat baik pada data latihan tetapi buruk pada konteks baru. Langkah terbaik adalah ...

A. menambah kompleksitas tanpa diagnosis
B. menyembunyikan error dari pengguna
C. menghapus logging untuk menghemat ruang
D. Memeriksa split, leakage, representasi data, dan generalisasi

13. Tim tidak tahu siapa yang harus merespons alarm. Perbaikan utama adalah ...

A. Menetapkan ownership, severity, runbook, dan escalation
B. menambah kompleksitas tanpa diagnosis
C. menyembunyikan error dari pengguna
D. menghapus logging untuk menghemat ruang

14. Perubahan besar akan diluncurkan. Cara menurunkan blast radius adalah ...

A. menambah kompleksitas tanpa diagnosis
B. Rilis bertahap, observasi, dan rollback
C. menyembunyikan error dari pengguna
D. menghapus logging untuk menghemat ruang

15. Pengguna tidak memahami keterbatasan hasil. Desain yang tepat adalah ...

A. menambah kompleksitas tanpa diagnosis
B. menyembunyikan error dari pengguna
C. Menjelaskan sumber, ketidakpastian, batas penggunaan, dan koreksi
D. menghapus logging untuk menghemat ruang

16. Data sensitif digunakan untuk latihan. Prinsip pertama adalah ...

A. menambah kompleksitas tanpa diagnosis
B. menyembunyikan error dari pengguna
C. menghapus logging untuk menghemat ruang
D. Minimization, izin, kontrol akses, dan penggunaan data sintetis bila memungkinkan

17. Satu metrik meningkat tetapi dampak keseluruhan memburuk. Tim perlu ...

A. Menggunakan outcome metric dan guardrail secara bersamaan
B. menambah kompleksitas tanpa diagnosis
C. menyembunyikan error dari pengguna
D. menghapus logging untuk menghemat ruang

18. Sistem gagal pada sebagian kelompok. Respons yang benar adalah ...

A. menambah kompleksitas tanpa diagnosis
B. Menganalisis subgroup, dampak, akar masalah, dan mitigasi
C. menyembunyikan error dari pengguna
D. menghapus logging untuk menghemat ruang

19. Biaya naik tanpa kenaikan nilai. Langkah awal adalah ...

A. menambah kompleksitas tanpa diagnosis
B. menyembunyikan error dari pengguna
C. Mengukur penggunaan per komponen dan menghubungkannya dengan outcome
D. menghapus logging untuk menghemat ruang

20. Temuan belum cukup kuat untuk keputusan otomatis. Pilihan aman adalah ...

A. menambah kompleksitas tanpa diagnosis
B. menyembunyikan error dari pengguna
C. menghapus logging untuk menghemat ruang
D. Membatasi penggunaan sebagai dukungan keputusan dan menambahkan human review

## Kunci dan Pembahasan

| No. | Jawaban | Pembahasan |
|---:|:---:|---|
| 1 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional location, kemudian alat dipilih sesuai kebutuhan. |
| 2 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional point, kemudian alat dipilih sesuai kebutuhan. |
| 3 | **C** | Pendekatan dimulai dari tujuan dan definisi operasional survey, kemudian alat dipilih sesuai kebutuhan. |
| 4 | **D** | Pendekatan dimulai dari tujuan dan definisi operasional reprojection, kemudian alat dipilih sesuai kebutuhan. |
| 5 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional buffer, kemudian alat dipilih sesuai kebutuhan. |
| 6 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional spatial split, kemudian alat dipilih sesuai kebutuhan. |
| 7 | **C** | Pendekatan dimulai dari tujuan dan definisi operasional classification, kemudian alat dipilih sesuai kebutuhan. |
| 8 | **D** | Pendekatan dimulai dari tujuan dan definisi operasional time series, kemudian alat dipilih sesuai kebutuhan. |
| 9 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional uncertainty, kemudian alat dipilih sesuai kebutuhan. |
| 10 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional tile, kemudian alat dipilih sesuai kebutuhan. |
| 11 | **C** | Pilihan tersebut membuat masalah dapat dilacak, dibatasi, dan ditangani berdasarkan bukti. |
| 12 | **D** | Pilihan tersebut membuat masalah dapat dilacak, dibatasi, dan ditangani berdasarkan bukti. |
| 13 | **A** | Pilihan tersebut membuat masalah dapat dilacak, dibatasi, dan ditangani berdasarkan bukti. |
| 14 | **B** | Pilihan tersebut membuat masalah dapat dilacak, dibatasi, dan ditangani berdasarkan bukti. |
| 15 | **C** | Pilihan tersebut membuat masalah dapat dilacak, dibatasi, dan ditangani berdasarkan bukti. |
| 16 | **D** | Pilihan tersebut membuat masalah dapat dilacak, dibatasi, dan ditangani berdasarkan bukti. |
| 17 | **A** | Pilihan tersebut membuat masalah dapat dilacak, dibatasi, dan ditangani berdasarkan bukti. |
| 18 | **B** | Pilihan tersebut membuat masalah dapat dilacak, dibatasi, dan ditangani berdasarkan bukti. |
| 19 | **C** | Pilihan tersebut membuat masalah dapat dilacak, dibatasi, dan ditangani berdasarkan bukti. |
| 20 | **D** | Pilihan tersebut membuat masalah dapat dilacak, dibatasi, dan ditangani berdasarkan bukti. |

### Interpretasi Skor

- **17-20 benar:** siap mengerjakan proyek dengan pengawasan ringan.
- **13-16 benar:** pemahaman baik, ulangi bagian yang masih lemah.
- **9-12 benar:** pelajari kembali konsep inti dan latihan.
- **0-8 benar:** ulangi modul secara bertahap dengan mentor atau teman belajar.

---

# Bab 13 - Diskusi dan Refleksi

## Pertanyaan Diskusi

1. Bagian mana dari AI for Geospatial yang paling mudah diremehkan tetapi berpotensi menimbulkan kegagalan besar?
2. Kapan solusi sederhana lebih baik daripada solusi yang lebih otomatis atau kompleks?
3. Metrik apa yang dapat mendorong perilaku salah bila digunakan sendirian?
4. Bagaimana pengguna dapat mengoreksi sistem dan melihat tindak lanjutnya?
5. Siapa yang menerima manfaat dan siapa yang mungkin menerima risiko?

## Jurnal Refleksi

Tuliskan satu halaman yang menjawab:

- konsep yang paling mengubah cara berpikir;
- asumsi yang sebelumnya dianggap benar;
- kesalahan yang terjadi ketika latihan;
- bukti yang masih kurang;
- satu tindakan belajar berikutnya.

---

# Bab 14 - Glosarium dan Checklist

## Glosarium

| Istilah | Makna ringkas |
|---|---|
| **location** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **distance** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **neighborhood** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **scale** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **pattern** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **spatial dependence** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **point** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **line** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **polygon** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **raster** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **CRS** | sistem referensi yang menjelaskan bagaimana koordinat dipetakan ke bumi. |
| **projection** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **survey** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **GPS** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **satellite** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **drone** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **open data** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **metadata** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **reprojection** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **clipping** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **resampling** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **geocoding** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **topology** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **missing** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **buffer** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **density** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **zonal statistic** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **network** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **spatial split** | pemisahan data berdasarkan wilayah untuk menguji generalisasi spasial. |
| **autocorrelation** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **leakage** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **imbalance** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **baseline** | pendekatan sederhana sebagai pembanding minimum. |
| **generalization** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **classification** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **detection** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **segmentation** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **change detection** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **label** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **resolution** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **time series** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **grid** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **mobility** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **weather** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |
| **lag** | konsep penting dalam ai for geospatial yang perlu diberi definisi operasional sebelum dipakai. |

## Checklist Sebelum Implementasi

- [ ] Masalah, pengguna, dan keputusan telah dinyatakan.
- [ ] Intended use dan penggunaan yang dilarang telah ditulis.
- [ ] Sumber data atau input memiliki izin dan provenance.
- [ ] Baseline dan kriteria penerimaan tersedia.
- [ ] Kondisi error, data kosong, dan kasus ekstrem diuji.
- [ ] Privasi, keamanan, bias, dan aksesibilitas ditinjau.
- [ ] Log, metric, owner, alert, dan runbook ditetapkan.
- [ ] Perubahan memiliki versioning, approval, dan rollback.
- [ ] Hasil dikomunikasikan bersama keterbatasannya.
- [ ] Jadwal review dan penghentian sistem ditentukan.

---

# Bab 15 - Ringkasan dan Referensi

## Ringkasan Cepat

1. Mulai dari keputusan dan pengguna, bukan alat.
2. Definisikan istilah, data, outcome, dan guardrail secara operasional.
3. Bangun baseline kecil yang dapat diamati dan diuji ulang.
4. Perlakukan keamanan, privasi, aksesibilitas, serta human review sebagai bagian desain.
5. Uji kondisi normal, kegagalan, subgroup, perubahan konteks, dan biaya.
6. Dokumentasikan provenance, asumsi, versi, owner, serta keterbatasan.
7. Gunakan monitoring dan feedback untuk memutuskan iterasi, rollback, atau penghentian.

## Referensi Utama

- Geographic Data Science with Python - Rey, Arribas-Bel, Wolf.
- GIS: A Computing Perspective - Worboys dan Duckham.
- GeoPandas Documentation.
- GDAL Documentation.
- Google Earth Engine Documentation.

## Penutup

Kemampuan dalam AI for Geospatial tidak hanya ditunjukkan oleh banyaknya alat yang dikuasai. Kemampuan terlihat dari cara peserta merumuskan masalah, memilih pendekatan yang proporsional, menguji klaim, melindungi pengguna, dan menjaga sistem tetap dapat dipertanggungjawabkan.

---

**HerAI Fellowship - Participant Module**  
**Versi 1.0.0 - 23 Juli 2026**
