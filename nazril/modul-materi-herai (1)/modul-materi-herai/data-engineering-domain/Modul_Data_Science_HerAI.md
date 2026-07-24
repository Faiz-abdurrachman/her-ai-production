---
course_id: data-science
title: Data Science
slug: data-science
category: Data and AI
sub_category: Data Science
level: Intermediate
language: id
status: ready
version: 1.0.0
estimated_duration: 18-24 jam
route: /participant/courses/data-science
updated_at: 2026-07-23
---

# Data Science

> **HerAI Fellowship - Participant Module**  
> Mengubah pertanyaan bisnis menjadi analisis, eksperimen, dan model yang dapat dipertanggungjawabkan.

## Tentang Modul

Data Science memadukan pemahaman masalah, data, statistika, pemodelan, eksperimen, dan komunikasi. Fokus modul bukan mengejar model paling rumit, melainkan menghasilkan bukti yang relevan, reproducible, dan dapat mendukung keputusan.

Modul disusun dengan bahasa bertahap. Setiap bab berisi tujuan, konsep inti, alur kerja, contoh kasus, kesalahan umum, checkpoint, dan latihan. Peserta tidak perlu menghafal seluruh istilah. Yang lebih penting adalah memahami hubungan antarkomponen dan mampu menjelaskan alasan di balik sebuah pilihan.

## Capaian Pembelajaran

Setelah menyelesaikan modul, peserta mampu:

- menjelaskan fondasi dan istilah utama Data Science;
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

# Bab 1 - Problem Framing dan Metrik Keberhasilan

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran problem framing dan metrik keberhasilan dalam Data Science;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Problem Framing dan Metrik Keberhasilan tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data scientist seperti detektif ilmiah: menyusun pertanyaan, memeriksa kualitas bukti, menguji dugaan, lalu menjelaskan tingkat keyakinan dan keterbatasannya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **tujuan** | konsep penting dalam problem framing dan metrik keberhasilan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana tujuan diukur, diuji, atau dikendalikan? |
| **keputusan** | konsep penting dalam problem framing dan metrik keberhasilan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana keputusan diukur, diuji, atau dikendalikan? |
| **unit analisis** | konsep penting dalam problem framing dan metrik keberhasilan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana unit analisis diukur, diuji, atau dikendalikan? |
| **target** | konsep penting dalam problem framing dan metrik keberhasilan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana target diukur, diuji, atau dikendalikan? |
| **constraint** | konsep penting dalam problem framing dan metrik keberhasilan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana constraint diukur, diuji, atau dikendalikan? |
| **metric** | ukuran terdefinisi yang digunakan untuk memantau kondisi atau hasil | Pertanyaan yang perlu dijawab: bagaimana metric diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **tujuan -> keputusan -> unit analisis -> target**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **tujuan** dapat memengaruhi **keputusan**, lalu mengubah cara **unit analisis** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan problem framing dan metrik keberhasilan dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk tujuan serta keputusan.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prediksi Risiko Churn Pelanggan**, tim perlu menerapkan problem framing dan metrik keberhasilan secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **tujuan** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan problem framing dan metrik keberhasilan.
- Menganggap tujuan sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan tujuan dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara keputusan dan unit analisis dalam bab ini?
3. Sebutkan satu risiko ketika problem framing dan metrik keberhasilan diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan tujuan, keputusan, unit analisis, target. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 2 - Memahami Proses Pembentukan Data

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran memahami proses pembentukan data dalam Data Science;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Memahami Proses Pembentukan Data tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data scientist seperti detektif ilmiah: menyusun pertanyaan, memeriksa kualitas bukti, menguji dugaan, lalu menjelaskan tingkat keyakinan dan keterbatasannya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **data generating process** | konsep penting dalam memahami proses pembentukan data yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana data generating process diukur, diuji, atau dikendalikan? |
| **selection bias** | konsep penting dalam memahami proses pembentukan data yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana selection bias diukur, diuji, atau dikendalikan? |
| **label** | konsep penting dalam memahami proses pembentukan data yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana label diukur, diuji, atau dikendalikan? |
| **leakage** | konsep penting dalam memahami proses pembentukan data yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana leakage diukur, diuji, atau dikendalikan? |
| **missingness** | konsep penting dalam memahami proses pembentukan data yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana missingness diukur, diuji, atau dikendalikan? |
| **sampling** | konsep penting dalam memahami proses pembentukan data yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana sampling diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **data generating process -> selection bias -> label -> leakage**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **data generating process** dapat memengaruhi **selection bias**, lalu mengubah cara **label** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan memahami proses pembentukan data dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk data generating process serta selection bias.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prediksi Risiko Churn Pelanggan**, tim perlu menerapkan memahami proses pembentukan data secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **data generating process** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan memahami proses pembentukan data.
- Menganggap data generating process sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan data generating process dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara selection bias dan label dalam bab ini?
3. Sebutkan satu risiko ketika memahami proses pembentukan data diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan data generating process, selection bias, label, leakage. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 3 - Exploratory Data Analysis

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran exploratory data analysis dalam Data Science;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Exploratory Data Analysis tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data scientist seperti detektif ilmiah: menyusun pertanyaan, memeriksa kualitas bukti, menguji dugaan, lalu menjelaskan tingkat keyakinan dan keterbatasannya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **distribusi** | konsep penting dalam exploratory data analysis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana distribusi diukur, diuji, atau dikendalikan? |
| **outlier** | konsep penting dalam exploratory data analysis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana outlier diukur, diuji, atau dikendalikan? |
| **korelasi** | konsep penting dalam exploratory data analysis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana korelasi diukur, diuji, atau dikendalikan? |
| **segmentasi** | konsep penting dalam exploratory data analysis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana segmentasi diukur, diuji, atau dikendalikan? |
| **visualisasi** | konsep penting dalam exploratory data analysis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana visualisasi diukur, diuji, atau dikendalikan? |
| **hipotesis** | konsep penting dalam exploratory data analysis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana hipotesis diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **distribusi -> outlier -> korelasi -> segmentasi**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **distribusi** dapat memengaruhi **outlier**, lalu mengubah cara **korelasi** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan exploratory data analysis dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk distribusi serta outlier.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prediksi Risiko Churn Pelanggan**, tim perlu menerapkan exploratory data analysis secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **distribusi** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan exploratory data analysis.
- Menganggap distribusi sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan distribusi dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara outlier dan korelasi dalam bab ini?
3. Sebutkan satu risiko ketika exploratory data analysis diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan distribusi, outlier, korelasi, segmentasi. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 4 - Pembersihan dan Preprocessing

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran pembersihan dan preprocessing dalam Data Science;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Pembersihan dan Preprocessing tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data scientist seperti detektif ilmiah: menyusun pertanyaan, memeriksa kualitas bukti, menguji dugaan, lalu menjelaskan tingkat keyakinan dan keterbatasannya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **imputation** | konsep penting dalam pembersihan dan preprocessing yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana imputation diukur, diuji, atau dikendalikan? |
| **encoding** | konsep penting dalam pembersihan dan preprocessing yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana encoding diukur, diuji, atau dikendalikan? |
| **scaling** | konsep penting dalam pembersihan dan preprocessing yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana scaling diukur, diuji, atau dikendalikan? |
| **duplicate** | konsep penting dalam pembersihan dan preprocessing yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana duplicate diukur, diuji, atau dikendalikan? |
| **pipeline** | konsep penting dalam pembersihan dan preprocessing yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana pipeline diukur, diuji, atau dikendalikan? |
| **split** | konsep penting dalam pembersihan dan preprocessing yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana split diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **imputation -> encoding -> scaling -> duplicate**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **imputation** dapat memengaruhi **encoding**, lalu mengubah cara **scaling** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan pembersihan dan preprocessing dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk imputation serta encoding.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prediksi Risiko Churn Pelanggan**, tim perlu menerapkan pembersihan dan preprocessing secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **imputation** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan pembersihan dan preprocessing.
- Menganggap imputation sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan imputation dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara encoding dan scaling dalam bab ini?
3. Sebutkan satu risiko ketika pembersihan dan preprocessing diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan imputation, encoding, scaling, duplicate. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 5 - Feature Engineering dan Baseline

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran feature engineering dan baseline dalam Data Science;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Feature Engineering dan Baseline tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data scientist seperti detektif ilmiah: menyusun pertanyaan, memeriksa kualitas bukti, menguji dugaan, lalu menjelaskan tingkat keyakinan dan keterbatasannya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **feature** | representasi terukur yang digunakan analisis atau model | Pertanyaan yang perlu dijawab: bagaimana feature diukur, diuji, atau dikendalikan? |
| **domain knowledge** | konsep penting dalam feature engineering dan baseline yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana domain knowledge diukur, diuji, atau dikendalikan? |
| **baseline** | pendekatan sederhana sebagai pembanding minimum | Pertanyaan yang perlu dijawab: bagaimana baseline diukur, diuji, atau dikendalikan? |
| **benchmark** | konsep penting dalam feature engineering dan baseline yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana benchmark diukur, diuji, atau dikendalikan? |
| **leakage** | konsep penting dalam feature engineering dan baseline yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana leakage diukur, diuji, atau dikendalikan? |
| **simplicity** | konsep penting dalam feature engineering dan baseline yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana simplicity diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **feature -> domain knowledge -> baseline -> benchmark**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **feature** dapat memengaruhi **domain knowledge**, lalu mengubah cara **baseline** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan feature engineering dan baseline dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk feature serta domain knowledge.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prediksi Risiko Churn Pelanggan**, tim perlu menerapkan feature engineering dan baseline secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **feature** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan feature engineering dan baseline.
- Menganggap feature sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan feature dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara domain knowledge dan baseline dalam bab ini?
3. Sebutkan satu risiko ketika feature engineering dan baseline diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan feature, domain knowledge, baseline, benchmark. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 6 - Pemodelan dan Pemilihan Algoritma

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran pemodelan dan pemilihan algoritma dalam Data Science;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Pemodelan dan Pemilihan Algoritma tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data scientist seperti detektif ilmiah: menyusun pertanyaan, memeriksa kualitas bukti, menguji dugaan, lalu menjelaskan tingkat keyakinan dan keterbatasannya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **regression** | konsep penting dalam pemodelan dan pemilihan algoritma yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana regression diukur, diuji, atau dikendalikan? |
| **classification** | konsep penting dalam pemodelan dan pemilihan algoritma yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana classification diukur, diuji, atau dikendalikan? |
| **tree** | konsep penting dalam pemodelan dan pemilihan algoritma yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana tree diukur, diuji, atau dikendalikan? |
| **ensemble** | konsep penting dalam pemodelan dan pemilihan algoritma yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana ensemble diukur, diuji, atau dikendalikan? |
| **calibration** | kesesuaian antara skor probabilitas dan frekuensi kejadian nyata | Pertanyaan yang perlu dijawab: bagaimana calibration diukur, diuji, atau dikendalikan? |
| **trade-off** | konsep penting dalam pemodelan dan pemilihan algoritma yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana trade-off diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **regression -> classification -> tree -> ensemble**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **regression** dapat memengaruhi **classification**, lalu mengubah cara **tree** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan pemodelan dan pemilihan algoritma dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk regression serta classification.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prediksi Risiko Churn Pelanggan**, tim perlu menerapkan pemodelan dan pemilihan algoritma secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **regression** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan pemodelan dan pemilihan algoritma.
- Menganggap regression sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan regression dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara classification dan tree dalam bab ini?
3. Sebutkan satu risiko ketika pemodelan dan pemilihan algoritma diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan regression, classification, tree, ensemble. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 7 - Validasi, Eksperimen, dan Kausalitas

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran validasi, eksperimen, dan kausalitas dalam Data Science;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Validasi, Eksperimen, dan Kausalitas tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data scientist seperti detektif ilmiah: menyusun pertanyaan, memeriksa kualitas bukti, menguji dugaan, lalu menjelaskan tingkat keyakinan dan keterbatasannya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **cross-validation** | konsep penting dalam validasi, eksperimen, dan kausalitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana cross-validation diukur, diuji, atau dikendalikan? |
| **time split** | konsep penting dalam validasi, eksperimen, dan kausalitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana time split diukur, diuji, atau dikendalikan? |
| **A/B test** | konsep penting dalam validasi, eksperimen, dan kausalitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana A/B test diukur, diuji, atau dikendalikan? |
| **confounder** | konsep penting dalam validasi, eksperimen, dan kausalitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana confounder diukur, diuji, atau dikendalikan? |
| **causal effect** | konsep penting dalam validasi, eksperimen, dan kausalitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana causal effect diukur, diuji, atau dikendalikan? |
| **power** | konsep penting dalam validasi, eksperimen, dan kausalitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana power diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **cross-validation -> time split -> A/B test -> confounder**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **cross-validation** dapat memengaruhi **time split**, lalu mengubah cara **A/B test** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan validasi, eksperimen, dan kausalitas dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk cross-validation serta time split.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prediksi Risiko Churn Pelanggan**, tim perlu menerapkan validasi, eksperimen, dan kausalitas secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **cross-validation** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan validasi, eksperimen, dan kausalitas.
- Menganggap cross-validation sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan cross-validation dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara time split dan A/B test dalam bab ini?
3. Sebutkan satu risiko ketika validasi, eksperimen, dan kausalitas diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan cross-validation, time split, A/B test, confounder. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 8 - Interpretasi dan Komunikasi Hasil

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran interpretasi dan komunikasi hasil dalam Data Science;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Interpretasi dan Komunikasi Hasil tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data scientist seperti detektif ilmiah: menyusun pertanyaan, memeriksa kualitas bukti, menguji dugaan, lalu menjelaskan tingkat keyakinan dan keterbatasannya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **feature importance** | konsep penting dalam interpretasi dan komunikasi hasil yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana feature importance diukur, diuji, atau dikendalikan? |
| **SHAP** | konsep penting dalam interpretasi dan komunikasi hasil yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana SHAP diukur, diuji, atau dikendalikan? |
| **uncertainty** | tingkat ketidakpastian yang perlu ditampilkan dan dikelola | Pertanyaan yang perlu dijawab: bagaimana uncertainty diukur, diuji, atau dikendalikan? |
| **narrative** | konsep penting dalam interpretasi dan komunikasi hasil yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana narrative diukur, diuji, atau dikendalikan? |
| **visualization** | konsep penting dalam interpretasi dan komunikasi hasil yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana visualization diukur, diuji, atau dikendalikan? |
| **recommendation** | konsep penting dalam interpretasi dan komunikasi hasil yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana recommendation diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **feature importance -> SHAP -> uncertainty -> narrative**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **feature importance** dapat memengaruhi **SHAP**, lalu mengubah cara **uncertainty** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan interpretasi dan komunikasi hasil dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk feature importance serta SHAP.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prediksi Risiko Churn Pelanggan**, tim perlu menerapkan interpretasi dan komunikasi hasil secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **feature importance** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan interpretasi dan komunikasi hasil.
- Menganggap feature importance sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan feature importance dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara SHAP dan uncertainty dalam bab ini?
3. Sebutkan satu risiko ketika interpretasi dan komunikasi hasil diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan feature importance, SHAP, uncertainty, narrative. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 9 - Reproducibility dan Handoff

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran reproducibility dan handoff dalam Data Science;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Reproducibility dan Handoff tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data scientist seperti detektif ilmiah: menyusun pertanyaan, memeriksa kualitas bukti, menguji dugaan, lalu menjelaskan tingkat keyakinan dan keterbatasannya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **environment** | konsep penting dalam reproducibility dan handoff yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana environment diukur, diuji, atau dikendalikan? |
| **seed** | konsep penting dalam reproducibility dan handoff yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana seed diukur, diuji, atau dikendalikan? |
| **versioning** | konsep penting dalam reproducibility dan handoff yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana versioning diukur, diuji, atau dikendalikan? |
| **experiment tracking** | konsep penting dalam reproducibility dan handoff yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana experiment tracking diukur, diuji, atau dikendalikan? |
| **documentation** | konsep penting dalam reproducibility dan handoff yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana documentation diukur, diuji, atau dikendalikan? |
| **model card** | konsep penting dalam reproducibility dan handoff yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana model card diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **environment -> seed -> versioning -> experiment tracking**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **environment** dapat memengaruhi **seed**, lalu mengubah cara **versioning** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan reproducibility dan handoff dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk environment serta seed.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prediksi Risiko Churn Pelanggan**, tim perlu menerapkan reproducibility dan handoff secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **environment** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan reproducibility dan handoff.
- Menganggap environment sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan environment dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara seed dan versioning dalam bab ini?
3. Sebutkan satu risiko ketika reproducibility dan handoff diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan environment, seed, versioning, experiment tracking. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 10 - Etika, Bias, dan Responsible Data Science

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran etika, bias, dan responsible data science dalam Data Science;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Etika, Bias, dan Responsible Data Science tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Data scientist seperti detektif ilmiah: menyusun pertanyaan, memeriksa kualitas bukti, menguji dugaan, lalu menjelaskan tingkat keyakinan dan keterbatasannya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **fairness** | konsep penting dalam etika, bias, dan responsible data science yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana fairness diukur, diuji, atau dikendalikan? |
| **proxy** | konsep penting dalam etika, bias, dan responsible data science yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana proxy diukur, diuji, atau dikendalikan? |
| **privacy** | konsep penting dalam etika, bias, dan responsible data science yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana privacy diukur, diuji, atau dikendalikan? |
| **harm** | konsep penting dalam etika, bias, dan responsible data science yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana harm diukur, diuji, atau dikendalikan? |
| **human review** | konsep penting dalam etika, bias, dan responsible data science yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana human review diukur, diuji, atau dikendalikan? |
| **governance** | konsep penting dalam etika, bias, dan responsible data science yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana governance diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **fairness -> proxy -> privacy -> harm**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **fairness** dapat memengaruhi **proxy**, lalu mengubah cara **privacy** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan etika, bias, dan responsible data science dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk fairness serta proxy.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Prediksi Risiko Churn Pelanggan**, tim perlu menerapkan etika, bias, dan responsible data science secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **fairness** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan etika, bias, dan responsible data science.
- Menganggap fairness sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan fairness dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara proxy dan privacy dalam bab ini?
3. Sebutkan satu risiko ketika etika, bias, dan responsible data science diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan fairness, proxy, privacy, harm. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 11 - Mini Project: Prediksi Risiko Churn Pelanggan

## Tujuan Proyek

Membangun baseline churn, melakukan validasi yang benar, menjelaskan faktor penting, dan membuat rekomendasi intervensi yang dapat diuji.

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
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

preprocess = ColumnTransformer([
    ("num", Pipeline([("fill", SimpleImputer()), ("scale", StandardScaler())]), numeric_cols),
    ("cat", Pipeline([("fill", SimpleImputer(strategy="most_frequent")),
                       ("encode", OneHotEncoder(handle_unknown="ignore"))]), categorical_cols),
])
model = Pipeline([("prep", preprocess), ("clf", LogisticRegression(max_iter=1000))])
model.fit(X_train, y_train)
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

1. Ketika memulai **Problem Framing dan Metrik Keberhasilan**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji tujuan
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

2. Ketika memulai **Memahami Proses Pembentukan Data**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji data generating process
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

3. Ketika memulai **Exploratory Data Analysis**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mendefinisikan tujuan, konteks, dan cara menguji distribusi
D. Mengukur keberhasilan hanya dari jumlah fitur

4. Ketika memulai **Pembersihan dan Preprocessing**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mengukur keberhasilan hanya dari jumlah fitur
D. Mendefinisikan tujuan, konteks, dan cara menguji imputation

5. Ketika memulai **Feature Engineering dan Baseline**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji feature
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

6. Ketika memulai **Pemodelan dan Pemilihan Algoritma**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji regression
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

7. Ketika memulai **Validasi, Eksperimen, dan Kausalitas**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mendefinisikan tujuan, konteks, dan cara menguji cross-validation
D. Mengukur keberhasilan hanya dari jumlah fitur

8. Ketika memulai **Interpretasi dan Komunikasi Hasil**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mengukur keberhasilan hanya dari jumlah fitur
D. Mendefinisikan tujuan, konteks, dan cara menguji feature importance

9. Ketika memulai **Reproducibility dan Handoff**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji environment
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

10. Ketika memulai **Etika, Bias, dan Responsible Data Science**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji fairness
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
| 1 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional tujuan, kemudian alat dipilih sesuai kebutuhan. |
| 2 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional data generating process, kemudian alat dipilih sesuai kebutuhan. |
| 3 | **C** | Pendekatan dimulai dari tujuan dan definisi operasional distribusi, kemudian alat dipilih sesuai kebutuhan. |
| 4 | **D** | Pendekatan dimulai dari tujuan dan definisi operasional imputation, kemudian alat dipilih sesuai kebutuhan. |
| 5 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional feature, kemudian alat dipilih sesuai kebutuhan. |
| 6 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional regression, kemudian alat dipilih sesuai kebutuhan. |
| 7 | **C** | Pendekatan dimulai dari tujuan dan definisi operasional cross-validation, kemudian alat dipilih sesuai kebutuhan. |
| 8 | **D** | Pendekatan dimulai dari tujuan dan definisi operasional feature importance, kemudian alat dipilih sesuai kebutuhan. |
| 9 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional environment, kemudian alat dipilih sesuai kebutuhan. |
| 10 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional fairness, kemudian alat dipilih sesuai kebutuhan. |
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

1. Bagian mana dari Data Science yang paling mudah diremehkan tetapi berpotensi menimbulkan kegagalan besar?
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
| **tujuan** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **keputusan** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **unit analisis** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **target** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **constraint** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **metric** | ukuran terdefinisi yang digunakan untuk memantau kondisi atau hasil. |
| **data generating process** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **selection bias** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **label** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **leakage** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **missingness** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **sampling** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **distribusi** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **outlier** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **korelasi** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **segmentasi** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **visualisasi** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **hipotesis** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **imputation** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **encoding** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **scaling** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **duplicate** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **pipeline** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **split** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **feature** | representasi terukur yang digunakan analisis atau model. |
| **domain knowledge** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **baseline** | pendekatan sederhana sebagai pembanding minimum. |
| **benchmark** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **simplicity** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **regression** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **classification** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **tree** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **ensemble** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **calibration** | kesesuaian antara skor probabilitas dan frekuensi kejadian nyata. |
| **trade-off** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **cross-validation** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **time split** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **A/B test** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **confounder** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **causal effect** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **power** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **feature importance** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **SHAP** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |
| **uncertainty** | tingkat ketidakpastian yang perlu ditampilkan dan dikelola. |
| **narrative** | konsep penting dalam data science yang perlu diberi definisi operasional sebelum dipakai. |

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

- An Introduction to Statistical Learning - James, Witten, Hastie, Tibshirani.
- The Elements of Statistical Learning - Hastie, Tibshirani, Friedman.
- Causal Inference: The Mixtape - Scott Cunningham.
- Dokumentasi resmi scikit-learn.
- Model Cards for Model Reporting - Mitchell dkk..

## Penutup

Kemampuan dalam Data Science tidak hanya ditunjukkan oleh banyaknya alat yang dikuasai. Kemampuan terlihat dari cara peserta merumuskan masalah, memilih pendekatan yang proporsional, menguji klaim, melindungi pengguna, dan menjaga sistem tetap dapat dipertanggungjawabkan.

---

**HerAI Fellowship - Participant Module**  
**Versi 1.0.0 - 23 Juli 2026**
