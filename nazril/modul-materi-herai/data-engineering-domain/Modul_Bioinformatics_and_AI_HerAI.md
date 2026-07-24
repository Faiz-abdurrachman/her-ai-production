---
course_id: bioinformatics-and-ai
title: Bioinformatics and AI
slug: bioinformatics-and-ai
category: Applied AI
sub_category: Bioinformatics
level: Intermediate
language: id
status: ready
version: 1.0.0
estimated_duration: 22-28 jam
route: /participant/courses/bioinformatics-and-ai
updated_at: 2026-07-23
---

# Bioinformatics and AI

> **HerAI Fellowship - Participant Module**  
> Menghubungkan data biologis, komputasi, statistika, dan AI secara reproducible serta bertanggung jawab.

> **Batas penggunaan:** Analisis dalam modul ini bersifat edukatif dan riset. Hasil tidak boleh dipakai sebagai diagnosis atau keputusan klinis tanpa validasi, tata kelola, dan tenaga profesional yang berwenang.

## Tentang Modul

Bioinformatics and AI membahas sekuens, alignment, genomik, transkriptomik, variant analysis, protein, machine learning, foundation model, workflow, statistika, privasi genomik, dan batas penggunaan klinis.

Modul disusun dengan bahasa bertahap. Setiap bab berisi tujuan, konsep inti, alur kerja, contoh kasus, kesalahan umum, checkpoint, dan latihan. Peserta tidak perlu menghafal seluruh istilah. Yang lebih penting adalah memahami hubungan antarkomponen dan mampu menjelaskan alasan di balik sebuah pilihan.

## Capaian Pembelajaran

Setelah menyelesaikan modul, peserta mampu:

- menjelaskan fondasi dan istilah utama Bioinformatics and AI;
- menerjemahkan kebutuhan menjadi rancangan yang dapat diuji;
- membuat prototipe kecil dengan dokumentasi dan kontrol dasar;
- mengevaluasi kualitas, risiko, keterbatasan, serta biaya;
- menyampaikan hasil dan rekomendasi kepada pemangku kepentingan.

## Prasyarat

- Biologi molekuler dasar, Python, statistika, dan machine learning dasar.
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

# Bab 1 - Fondasi Biologi Molekuler untuk Komputasi

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran fondasi biologi molekuler untuk komputasi dalam Bioinformatics and AI;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Fondasi Biologi Molekuler untuk Komputasi tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **DNA** | konsep penting dalam fondasi biologi molekuler untuk komputasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana DNA diukur, diuji, atau dikendalikan? |
| **RNA** | konsep penting dalam fondasi biologi molekuler untuk komputasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana RNA diukur, diuji, atau dikendalikan? |
| **protein** | konsep penting dalam fondasi biologi molekuler untuk komputasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana protein diukur, diuji, atau dikendalikan? |
| **gene** | konsep penting dalam fondasi biologi molekuler untuk komputasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana gene diukur, diuji, atau dikendalikan? |
| **expression** | konsep penting dalam fondasi biologi molekuler untuk komputasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana expression diukur, diuji, atau dikendalikan? |
| **central dogma** | konsep penting dalam fondasi biologi molekuler untuk komputasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana central dogma diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **DNA -> RNA -> protein -> gene**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **DNA** dapat memengaruhi **RNA**, lalu mengubah cara **protein** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan fondasi biologi molekuler untuk komputasi dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk DNA serta RNA.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Klasifikasi Sekuens dengan Biological Split**, tim perlu menerapkan fondasi biologi molekuler untuk komputasi secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **DNA** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan fondasi biologi molekuler untuk komputasi.
- Menganggap DNA sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan DNA dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara RNA dan protein dalam bab ini?
3. Sebutkan satu risiko ketika fondasi biologi molekuler untuk komputasi diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan DNA, RNA, protein, gene. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 2 - Sekuens, Format, dan Database Biologi

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran sekuens, format, dan database biologi dalam Bioinformatics and AI;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Sekuens, Format, dan Database Biologi tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **FASTA** | konsep penting dalam sekuens, format, dan database biologi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana FASTA diukur, diuji, atau dikendalikan? |
| **FASTQ** | konsep penting dalam sekuens, format, dan database biologi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana FASTQ diukur, diuji, atau dikendalikan? |
| **quality score** | konsep penting dalam sekuens, format, dan database biologi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana quality score diukur, diuji, atau dikendalikan? |
| **annotation** | konsep penting dalam sekuens, format, dan database biologi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana annotation diukur, diuji, atau dikendalikan? |
| **accession** | konsep penting dalam sekuens, format, dan database biologi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana accession diukur, diuji, atau dikendalikan? |
| **database** | konsep penting dalam sekuens, format, dan database biologi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana database diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **FASTA -> FASTQ -> quality score -> annotation**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **FASTA** dapat memengaruhi **FASTQ**, lalu mengubah cara **quality score** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan sekuens, format, dan database biologi dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk FASTA serta FASTQ.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Klasifikasi Sekuens dengan Biological Split**, tim perlu menerapkan sekuens, format, dan database biologi secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **FASTA** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan sekuens, format, dan database biologi.
- Menganggap FASTA sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan FASTA dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara FASTQ dan quality score dalam bab ini?
3. Sebutkan satu risiko ketika sekuens, format, dan database biologi diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan FASTA, FASTQ, quality score, annotation. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 3 - Alignment dan Sequence Search

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran alignment dan sequence search dalam Bioinformatics and AI;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Alignment dan Sequence Search tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **pairwise** | konsep penting dalam alignment dan sequence search yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana pairwise diukur, diuji, atau dikendalikan? |
| **multiple alignment** | konsep penting dalam alignment dan sequence search yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana multiple alignment diukur, diuji, atau dikendalikan? |
| **similarity** | konsep penting dalam alignment dan sequence search yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana similarity diukur, diuji, atau dikendalikan? |
| **homology** | konsep penting dalam alignment dan sequence search yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana homology diukur, diuji, atau dikendalikan? |
| **score** | konsep penting dalam alignment dan sequence search yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana score diukur, diuji, atau dikendalikan? |
| **gap** | konsep penting dalam alignment dan sequence search yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana gap diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **pairwise -> multiple alignment -> similarity -> homology**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **pairwise** dapat memengaruhi **multiple alignment**, lalu mengubah cara **similarity** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan alignment dan sequence search dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk pairwise serta multiple alignment.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Klasifikasi Sekuens dengan Biological Split**, tim perlu menerapkan alignment dan sequence search secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **pairwise** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan alignment dan sequence search.
- Menganggap pairwise sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan pairwise dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara multiple alignment dan similarity dalam bab ini?
3. Sebutkan satu risiko ketika alignment dan sequence search diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan pairwise, multiple alignment, similarity, homology. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 4 - Genomics dan Genome Assembly

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran genomics dan genome assembly dalam Bioinformatics and AI;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Genomics dan Genome Assembly tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **read** | konsep penting dalam genomics dan genome assembly yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana read diukur, diuji, atau dikendalikan? |
| **contig** | konsep penting dalam genomics dan genome assembly yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana contig diukur, diuji, atau dikendalikan? |
| **coverage** | konsep penting dalam genomics dan genome assembly yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana coverage diukur, diuji, atau dikendalikan? |
| **assembly** | konsep penting dalam genomics dan genome assembly yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana assembly diukur, diuji, atau dikendalikan? |
| **reference** | konsep penting dalam genomics dan genome assembly yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana reference diukur, diuji, atau dikendalikan? |
| **quality** | konsep penting dalam genomics dan genome assembly yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana quality diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **read -> contig -> coverage -> assembly**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **read** dapat memengaruhi **contig**, lalu mengubah cara **coverage** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan genomics dan genome assembly dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk read serta contig.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Klasifikasi Sekuens dengan Biological Split**, tim perlu menerapkan genomics dan genome assembly secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **read** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan genomics dan genome assembly.
- Menganggap read sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan read dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara contig dan coverage dalam bab ini?
3. Sebutkan satu risiko ketika genomics dan genome assembly diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan read, contig, coverage, assembly. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 5 - Transcriptomics dan Gene Expression

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran transcriptomics dan gene expression dalam Bioinformatics and AI;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Transcriptomics dan Gene Expression tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **RNA-seq** | konsep penting dalam transcriptomics dan gene expression yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana RNA-seq diukur, diuji, atau dikendalikan? |
| **count** | konsep penting dalam transcriptomics dan gene expression yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana count diukur, diuji, atau dikendalikan? |
| **normalization** | konsep penting dalam transcriptomics dan gene expression yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana normalization diukur, diuji, atau dikendalikan? |
| **differential expression** | konsep penting dalam transcriptomics dan gene expression yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana differential expression diukur, diuji, atau dikendalikan? |
| **batch effect** | konsep penting dalam transcriptomics dan gene expression yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana batch effect diukur, diuji, atau dikendalikan? |
| **pathway** | konsep penting dalam transcriptomics dan gene expression yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana pathway diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **RNA-seq -> count -> normalization -> differential expression**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **RNA-seq** dapat memengaruhi **count**, lalu mengubah cara **normalization** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan transcriptomics dan gene expression dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk RNA-seq serta count.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Klasifikasi Sekuens dengan Biological Split**, tim perlu menerapkan transcriptomics dan gene expression secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **RNA-seq** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan transcriptomics dan gene expression.
- Menganggap RNA-seq sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan RNA-seq dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara count dan normalization dalam bab ini?
3. Sebutkan satu risiko ketika transcriptomics dan gene expression diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan RNA-seq, count, normalization, differential expression. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 6 - Variant Calling dan Annotation

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran variant calling dan annotation dalam Bioinformatics and AI;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Variant Calling dan Annotation tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **variant** | konsep penting dalam variant calling dan annotation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana variant diukur, diuji, atau dikendalikan? |
| **SNP** | konsep penting dalam variant calling dan annotation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana SNP diukur, diuji, atau dikendalikan? |
| **indel** | konsep penting dalam variant calling dan annotation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana indel diukur, diuji, atau dikendalikan? |
| **genotype** | konsep penting dalam variant calling dan annotation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana genotype diukur, diuji, atau dikendalikan? |
| **filter** | konsep penting dalam variant calling dan annotation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana filter diukur, diuji, atau dikendalikan? |
| **annotation** | konsep penting dalam variant calling dan annotation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana annotation diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **variant -> SNP -> indel -> genotype**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **variant** dapat memengaruhi **SNP**, lalu mengubah cara **indel** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan variant calling dan annotation dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk variant serta SNP.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Klasifikasi Sekuens dengan Biological Split**, tim perlu menerapkan variant calling dan annotation secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **variant** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan variant calling dan annotation.
- Menganggap variant sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan variant dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara SNP dan indel dalam bab ini?
3. Sebutkan satu risiko ketika variant calling dan annotation diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan variant, SNP, indel, genotype. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 7 - Protein Structure dan Function

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran protein structure dan function dalam Bioinformatics and AI;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Protein Structure dan Function tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **amino acid** | konsep penting dalam protein structure dan function yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana amino acid diukur, diuji, atau dikendalikan? |
| **domain** | konsep penting dalam protein structure dan function yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana domain diukur, diuji, atau dikendalikan? |
| **structure** | konsep penting dalam protein structure dan function yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana structure diukur, diuji, atau dikendalikan? |
| **binding** | konsep penting dalam protein structure dan function yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana binding diukur, diuji, atau dikendalikan? |
| **function** | konsep penting dalam protein structure dan function yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana function diukur, diuji, atau dikendalikan? |
| **confidence** | konsep penting dalam protein structure dan function yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana confidence diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **amino acid -> domain -> structure -> binding**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **amino acid** dapat memengaruhi **domain**, lalu mengubah cara **structure** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan protein structure dan function dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk amino acid serta domain.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Klasifikasi Sekuens dengan Biological Split**, tim perlu menerapkan protein structure dan function secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **amino acid** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan protein structure dan function.
- Menganggap amino acid sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan amino acid dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara domain dan structure dalam bab ini?
3. Sebutkan satu risiko ketika protein structure dan function diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan amino acid, domain, structure, binding. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 8 - Machine Learning dan Biological Foundation Model

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran machine learning dan biological foundation model dalam Bioinformatics and AI;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Machine Learning dan Biological Foundation Model tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **embedding** | konsep penting dalam machine learning dan biological foundation model yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana embedding diukur, diuji, atau dikendalikan? |
| **representation** | konsep penting dalam machine learning dan biological foundation model yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana representation diukur, diuji, atau dikendalikan? |
| **classification** | konsep penting dalam machine learning dan biological foundation model yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana classification diukur, diuji, atau dikendalikan? |
| **generative model** | konsep penting dalam machine learning dan biological foundation model yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana generative model diukur, diuji, atau dikendalikan? |
| **transfer** | konsep penting dalam machine learning dan biological foundation model yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana transfer diukur, diuji, atau dikendalikan? |
| **benchmark** | konsep penting dalam machine learning dan biological foundation model yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana benchmark diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **embedding -> representation -> classification -> generative model**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **embedding** dapat memengaruhi **representation**, lalu mengubah cara **classification** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan machine learning dan biological foundation model dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk embedding serta representation.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Klasifikasi Sekuens dengan Biological Split**, tim perlu menerapkan machine learning dan biological foundation model secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **embedding** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan machine learning dan biological foundation model.
- Menganggap embedding sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan embedding dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara representation dan classification dalam bab ini?
3. Sebutkan satu risiko ketika machine learning dan biological foundation model diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan embedding, representation, classification, generative model. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 9 - Workflow, Reproducibility, dan Data Provenance

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran workflow, reproducibility, dan data provenance dalam Bioinformatics and AI;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Workflow, Reproducibility, dan Data Provenance tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **workflow** | konsep penting dalam workflow, reproducibility, dan data provenance yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana workflow diukur, diuji, atau dikendalikan? |
| **environment** | konsep penting dalam workflow, reproducibility, dan data provenance yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana environment diukur, diuji, atau dikendalikan? |
| **version** | konsep penting dalam workflow, reproducibility, dan data provenance yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana version diukur, diuji, atau dikendalikan? |
| **provenance** | informasi asal, versi, pemilik, dan riwayat sebuah artefak | Pertanyaan yang perlu dijawab: bagaimana provenance diukur, diuji, atau dikendalikan? |
| **container** | konsep penting dalam workflow, reproducibility, dan data provenance yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana container diukur, diuji, atau dikendalikan? |
| **FAIR** | prinsip agar data mudah ditemukan, diakses, dioperasikan, dan digunakan ulang | Pertanyaan yang perlu dijawab: bagaimana FAIR diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **workflow -> environment -> version -> provenance**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **workflow** dapat memengaruhi **environment**, lalu mengubah cara **version** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan workflow, reproducibility, dan data provenance dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk workflow serta environment.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Klasifikasi Sekuens dengan Biological Split**, tim perlu menerapkan workflow, reproducibility, dan data provenance secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **workflow** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan workflow, reproducibility, dan data provenance.
- Menganggap workflow sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan workflow dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara environment dan version dalam bab ini?
3. Sebutkan satu risiko ketika workflow, reproducibility, dan data provenance diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan workflow, environment, version, provenance. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 10 - Statistika, Etika, Privasi, dan Batas Klinis

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran statistika, etika, privasi, dan batas klinis dalam Bioinformatics and AI;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Statistika, Etika, Privasi, dan Batas Klinis tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **multiple testing** | pengujian banyak hipotesis yang meningkatkan risiko temuan semu | Pertanyaan yang perlu dijawab: bagaimana multiple testing diukur, diuji, atau dikendalikan? |
| **uncertainty** | tingkat ketidakpastian yang perlu ditampilkan dan dikelola | Pertanyaan yang perlu dijawab: bagaimana uncertainty diukur, diuji, atau dikendalikan? |
| **genomic privacy** | konsep penting dalam statistika, etika, privasi, dan batas klinis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana genomic privacy diukur, diuji, atau dikendalikan? |
| **consent** | konsep penting dalam statistika, etika, privasi, dan batas klinis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana consent diukur, diuji, atau dikendalikan? |
| **population bias** | konsep penting dalam statistika, etika, privasi, dan batas klinis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana population bias diukur, diuji, atau dikendalikan? |
| **clinical validation** | konsep penting dalam statistika, etika, privasi, dan batas klinis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana clinical validation diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **multiple testing -> uncertainty -> genomic privacy -> consent**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **multiple testing** dapat memengaruhi **uncertainty**, lalu mengubah cara **genomic privacy** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan statistika, etika, privasi, dan batas klinis dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk multiple testing serta uncertainty.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Klasifikasi Sekuens dengan Biological Split**, tim perlu menerapkan statistika, etika, privasi, dan batas klinis secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **multiple testing** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan statistika, etika, privasi, dan batas klinis.
- Menganggap multiple testing sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan multiple testing dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara uncertainty dan genomic privacy dalam bab ini?
3. Sebutkan satu risiko ketika statistika, etika, privasi, dan batas klinis diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan multiple testing, uncertainty, genomic privacy, consent. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 11 - Mini Project: Klasifikasi Sekuens dengan Biological Split

## Tujuan Proyek

Membangun baseline klasifikasi sekuens publik atau sintetis dengan pemisahan berdasarkan kelompok biologis, evaluasi, dokumentasi provenance, dan batas interpretasi.

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
from Bio import SeqIO

def read_fasta(path):
    records = []
    for record in SeqIO.parse(path, "fasta"):
        sequence = str(record.seq).upper()
        if set(sequence) - set("ACGTN"):
            raise ValueError(f"Karakter tidak valid pada {record.id}")
        records.append({"id": record.id, "sequence": sequence, "length": len(sequence)})
    return records

# Untuk evaluasi, pisahkan train/test berdasarkan keluarga atau organisme,
# bukan hanya membagi baris secara acak.
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

1. Ketika memulai **Fondasi Biologi Molekuler untuk Komputasi**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji DNA
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

2. Ketika memulai **Sekuens, Format, dan Database Biologi**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji FASTA
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

3. Ketika memulai **Alignment dan Sequence Search**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mendefinisikan tujuan, konteks, dan cara menguji pairwise
D. Mengukur keberhasilan hanya dari jumlah fitur

4. Ketika memulai **Genomics dan Genome Assembly**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mengukur keberhasilan hanya dari jumlah fitur
D. Mendefinisikan tujuan, konteks, dan cara menguji read

5. Ketika memulai **Transcriptomics dan Gene Expression**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji RNA-seq
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

6. Ketika memulai **Variant Calling dan Annotation**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji variant
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

7. Ketika memulai **Protein Structure dan Function**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mendefinisikan tujuan, konteks, dan cara menguji amino acid
D. Mengukur keberhasilan hanya dari jumlah fitur

8. Ketika memulai **Machine Learning dan Biological Foundation Model**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mengukur keberhasilan hanya dari jumlah fitur
D. Mendefinisikan tujuan, konteks, dan cara menguji embedding

9. Ketika memulai **Workflow, Reproducibility, dan Data Provenance**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji workflow
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

10. Ketika memulai **Statistika, Etika, Privasi, dan Batas Klinis**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji multiple testing
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
| 1 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional DNA, kemudian alat dipilih sesuai kebutuhan. |
| 2 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional FASTA, kemudian alat dipilih sesuai kebutuhan. |
| 3 | **C** | Pendekatan dimulai dari tujuan dan definisi operasional pairwise, kemudian alat dipilih sesuai kebutuhan. |
| 4 | **D** | Pendekatan dimulai dari tujuan dan definisi operasional read, kemudian alat dipilih sesuai kebutuhan. |
| 5 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional RNA-seq, kemudian alat dipilih sesuai kebutuhan. |
| 6 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional variant, kemudian alat dipilih sesuai kebutuhan. |
| 7 | **C** | Pendekatan dimulai dari tujuan dan definisi operasional amino acid, kemudian alat dipilih sesuai kebutuhan. |
| 8 | **D** | Pendekatan dimulai dari tujuan dan definisi operasional embedding, kemudian alat dipilih sesuai kebutuhan. |
| 9 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional workflow, kemudian alat dipilih sesuai kebutuhan. |
| 10 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional multiple testing, kemudian alat dipilih sesuai kebutuhan. |
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

1. Bagian mana dari Bioinformatics and AI yang paling mudah diremehkan tetapi berpotensi menimbulkan kegagalan besar?
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
| **DNA** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **RNA** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **protein** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **gene** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **expression** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **central dogma** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **FASTA** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **FASTQ** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **quality score** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **annotation** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **accession** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **database** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **pairwise** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **multiple alignment** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **similarity** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **homology** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **score** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **gap** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **read** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **contig** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **coverage** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **assembly** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **reference** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **quality** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **RNA-seq** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **count** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **normalization** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **differential expression** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **batch effect** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **pathway** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **variant** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **SNP** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **indel** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **genotype** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **filter** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **amino acid** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **domain** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **structure** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **binding** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **function** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **confidence** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **embedding** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **representation** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **classification** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |
| **generative model** | konsep penting dalam bioinformatics and ai yang perlu diberi definisi operasional sebelum dipakai. |

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

- Bioinformatics Algorithms - Compeau dan Pevzner.
- Biological Sequence Analysis - Durbin dkk..
- Biopython Documentation.
- FAIR Guiding Principles.
- The Sequence Read Archive Documentation.

## Penutup

Kemampuan dalam Bioinformatics and AI tidak hanya ditunjukkan oleh banyaknya alat yang dikuasai. Kemampuan terlihat dari cara peserta merumuskan masalah, memilih pendekatan yang proporsional, menguji klaim, melindungi pengguna, dan menjaga sistem tetap dapat dipertanggungjawabkan.

---

**HerAI Fellowship - Participant Module**  
**Versi 1.0.0 - 23 Juli 2026**
