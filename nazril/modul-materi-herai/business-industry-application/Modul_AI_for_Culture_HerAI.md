---
course_id: ai-for-culture
title: AI for Culture
slug: ai-for-culture
category: Applied AI
sub_category: Culture and Heritage
level: Intermediate
language: id
status: ready
version: 1.0.0
estimated_duration: 18-22 jam
route: /participant/courses/ai-for-culture
updated_at: 2026-07-23
---

# AI for Culture

> **HerAI Fellowship - Participant Module**  
> Menggunakan AI untuk akses, pelestarian, penelitian, dan kreativitas budaya secara bertanggung jawab.

## Tentang Modul

AI for Culture membahas digitization, metadata, bahasa lokal, analisis visual, rekomendasi, generative AI, partisipasi komunitas, hak budaya, dan preservation. Pendekatan modul menempatkan komunitas sebagai pemilik konteks, bukan sekadar sumber data.

Modul disusun dengan bahasa bertahap. Setiap bab berisi tujuan, konsep inti, alur kerja, contoh kasus, kesalahan umum, checkpoint, dan latihan. Peserta tidak perlu menghafal seluruh istilah. Yang lebih penting adalah memahami hubungan antarkomponen dan mampu menjelaskan alasan di balik sebuah pilihan.

## Capaian Pembelajaran

Setelah menyelesaikan modul, peserta mampu:

- menjelaskan fondasi dan istilah utama AI for Culture;
- menerjemahkan kebutuhan menjadi rancangan yang dapat diuji;
- membuat prototipe kecil dengan dokumentasi dan kontrol dasar;
- mengevaluasi kualitas, risiko, keterbatasan, serta biaya;
- menyampaikan hasil dan rekomendasi kepada pemangku kepentingan.

## Prasyarat

- Pengantar AI dan ketertarikan pada budaya atau humaniora digital.
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

# Bab 1 - Konteks Budaya dan Intended Use

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran konteks budaya dan intended use dalam AI for Culture;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Konteks Budaya dan Intended Use tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI dalam budaya sebaiknya seperti pemandu museum yang rendah hati: membantu pengunjung menemukan hubungan, tetapi tidak menggantikan suara pemilik tradisi atau mengklaim satu interpretasi sebagai kebenaran tunggal.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **community** | konsep penting dalam konteks budaya dan intended use yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana community diukur, diuji, atau dikendalikan? |
| **context** | konsep penting dalam konteks budaya dan intended use yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana context diukur, diuji, atau dikendalikan? |
| **intended use** | tujuan, pengguna, konteks, dan batas penggunaan yang dinyatakan | Pertanyaan yang perlu dijawab: bagaimana intended use diukur, diuji, atau dikendalikan? |
| **stakeholder** | konsep penting dalam konteks budaya dan intended use yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana stakeholder diukur, diuji, atau dikendalikan? |
| **benefit** | konsep penting dalam konteks budaya dan intended use yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana benefit diukur, diuji, atau dikendalikan? |
| **harm** | konsep penting dalam konteks budaya dan intended use yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana harm diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **community -> context -> intended use -> stakeholder**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **community** dapat memengaruhi **context**, lalu mengubah cara **intended use** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan konteks budaya dan intended use dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk community serta context.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Digital Heritage Explorer**, tim perlu menerapkan konteks budaya dan intended use secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **community** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan konteks budaya dan intended use.
- Menganggap community sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan community dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara context dan intended use dalam bab ini?
3. Sebutkan satu risiko ketika konteks budaya dan intended use diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan community, context, intended use, stakeholder. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 2 - Digitization dan Preservasi Digital

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran digitization dan preservasi digital dalam AI for Culture;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Digitization dan Preservasi Digital tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI dalam budaya sebaiknya seperti pemandu museum yang rendah hati: membantu pengunjung menemukan hubungan, tetapi tidak menggantikan suara pemilik tradisi atau mengklaim satu interpretasi sebagai kebenaran tunggal.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **capture** | konsep penting dalam digitization dan preservasi digital yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana capture diukur, diuji, atau dikendalikan? |
| **resolution** | konsep penting dalam digitization dan preservasi digital yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana resolution diukur, diuji, atau dikendalikan? |
| **format** | konsep penting dalam digitization dan preservasi digital yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana format diukur, diuji, atau dikendalikan? |
| **checksum** | konsep penting dalam digitization dan preservasi digital yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana checksum diukur, diuji, atau dikendalikan? |
| **backup** | konsep penting dalam digitization dan preservasi digital yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana backup diukur, diuji, atau dikendalikan? |
| **preservation** | konsep penting dalam digitization dan preservasi digital yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana preservation diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **capture -> resolution -> format -> checksum**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **capture** dapat memengaruhi **resolution**, lalu mengubah cara **format** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan digitization dan preservasi digital dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk capture serta resolution.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Digital Heritage Explorer**, tim perlu menerapkan digitization dan preservasi digital secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **capture** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan digitization dan preservasi digital.
- Menganggap capture sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan capture dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara resolution dan format dalam bab ini?
3. Sebutkan satu risiko ketika digitization dan preservasi digital diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan capture, resolution, format, checksum. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 3 - Metadata, Taksonomi, dan Ontologi

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran metadata, taksonomi, dan ontologi dalam AI for Culture;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Metadata, Taksonomi, dan Ontologi tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI dalam budaya sebaiknya seperti pemandu museum yang rendah hati: membantu pengunjung menemukan hubungan, tetapi tidak menggantikan suara pemilik tradisi atau mengklaim satu interpretasi sebagai kebenaran tunggal.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **metadata** | konsep penting dalam metadata, taksonomi, dan ontologi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana metadata diukur, diuji, atau dikendalikan? |
| **vocabulary** | konsep penting dalam metadata, taksonomi, dan ontologi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana vocabulary diukur, diuji, atau dikendalikan? |
| **ontology** | model formal tentang konsep dan hubungan dalam suatu domain | Pertanyaan yang perlu dijawab: bagaimana ontology diukur, diuji, atau dikendalikan? |
| **provenance** | informasi asal, versi, pemilik, dan riwayat sebuah artefak | Pertanyaan yang perlu dijawab: bagaimana provenance diukur, diuji, atau dikendalikan? |
| **multilingual** | konsep penting dalam metadata, taksonomi, dan ontologi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana multilingual diukur, diuji, atau dikendalikan? |
| **uncertainty** | tingkat ketidakpastian yang perlu ditampilkan dan dikelola | Pertanyaan yang perlu dijawab: bagaimana uncertainty diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **metadata -> vocabulary -> ontology -> provenance**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **metadata** dapat memengaruhi **vocabulary**, lalu mengubah cara **ontology** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan metadata, taksonomi, dan ontologi dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk metadata serta vocabulary.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Digital Heritage Explorer**, tim perlu menerapkan metadata, taksonomi, dan ontologi secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **metadata** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan metadata, taksonomi, dan ontologi.
- Menganggap metadata sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan metadata dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara vocabulary dan ontology dalam bab ini?
3. Sebutkan satu risiko ketika metadata, taksonomi, dan ontologi diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan metadata, vocabulary, ontology, provenance. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 4 - NLP untuk Bahasa dan Naskah Lokal

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran nlp untuk bahasa dan naskah lokal dalam AI for Culture;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

NLP untuk Bahasa dan Naskah Lokal tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI dalam budaya sebaiknya seperti pemandu museum yang rendah hati: membantu pengunjung menemukan hubungan, tetapi tidak menggantikan suara pemilik tradisi atau mengklaim satu interpretasi sebagai kebenaran tunggal.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **OCR** | konsep penting dalam nlp untuk bahasa dan naskah lokal yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana OCR diukur, diuji, atau dikendalikan? |
| **transcription** | konsep penting dalam nlp untuk bahasa dan naskah lokal yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana transcription diukur, diuji, atau dikendalikan? |
| **translation** | konsep penting dalam nlp untuk bahasa dan naskah lokal yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana translation diukur, diuji, atau dikendalikan? |
| **low-resource** | konsep penting dalam nlp untuk bahasa dan naskah lokal yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana low-resource diukur, diuji, atau dikendalikan? |
| **dialect** | konsep penting dalam nlp untuk bahasa dan naskah lokal yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana dialect diukur, diuji, atau dikendalikan? |
| **annotation** | konsep penting dalam nlp untuk bahasa dan naskah lokal yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana annotation diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **OCR -> transcription -> translation -> low-resource**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **OCR** dapat memengaruhi **transcription**, lalu mengubah cara **translation** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan nlp untuk bahasa dan naskah lokal dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk OCR serta transcription.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Digital Heritage Explorer**, tim perlu menerapkan nlp untuk bahasa dan naskah lokal secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **OCR** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan nlp untuk bahasa dan naskah lokal.
- Menganggap OCR sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan OCR dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara transcription dan translation dalam bab ini?
3. Sebutkan satu risiko ketika nlp untuk bahasa dan naskah lokal diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan OCR, transcription, translation, low-resource. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 5 - Computer Vision untuk Artefak

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran computer vision untuk artefak dalam AI for Culture;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Computer Vision untuk Artefak tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI dalam budaya sebaiknya seperti pemandu museum yang rendah hati: membantu pengunjung menemukan hubungan, tetapi tidak menggantikan suara pemilik tradisi atau mengklaim satu interpretasi sebagai kebenaran tunggal.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **classification** | konsep penting dalam computer vision untuk artefak yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana classification diukur, diuji, atau dikendalikan? |
| **detection** | konsep penting dalam computer vision untuk artefak yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana detection diukur, diuji, atau dikendalikan? |
| **similarity** | konsep penting dalam computer vision untuk artefak yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana similarity diukur, diuji, atau dikendalikan? |
| **restoration** | konsep penting dalam computer vision untuk artefak yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana restoration diukur, diuji, atau dikendalikan? |
| **condition** | konsep penting dalam computer vision untuk artefak yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana condition diukur, diuji, atau dikendalikan? |
| **provenance** | informasi asal, versi, pemilik, dan riwayat sebuah artefak | Pertanyaan yang perlu dijawab: bagaimana provenance diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **classification -> detection -> similarity -> restoration**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **classification** dapat memengaruhi **detection**, lalu mengubah cara **similarity** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan computer vision untuk artefak dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk classification serta detection.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Digital Heritage Explorer**, tim perlu menerapkan computer vision untuk artefak secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **classification** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan computer vision untuk artefak.
- Menganggap classification sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan classification dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara detection dan similarity dalam bab ini?
3. Sebutkan satu risiko ketika computer vision untuk artefak diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan classification, detection, similarity, restoration. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 6 - Recommendation dan Cultural Discovery

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran recommendation dan cultural discovery dalam AI for Culture;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Recommendation dan Cultural Discovery tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI dalam budaya sebaiknya seperti pemandu museum yang rendah hati: membantu pengunjung menemukan hubungan, tetapi tidak menggantikan suara pemilik tradisi atau mengklaim satu interpretasi sebagai kebenaran tunggal.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **retrieval** | proses menemukan informasi relevan dari sumber yang tersedia | Pertanyaan yang perlu dijawab: bagaimana retrieval diukur, diuji, atau dikendalikan? |
| **recommendation** | konsep penting dalam recommendation dan cultural discovery yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana recommendation diukur, diuji, atau dikendalikan? |
| **diversity** | konsep penting dalam recommendation dan cultural discovery yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana diversity diukur, diuji, atau dikendalikan? |
| **serendipity** | konsep penting dalam recommendation dan cultural discovery yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana serendipity diukur, diuji, atau dikendalikan? |
| **filter bubble** | konsep penting dalam recommendation dan cultural discovery yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana filter bubble diukur, diuji, atau dikendalikan? |
| **explanation** | konsep penting dalam recommendation dan cultural discovery yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana explanation diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **retrieval -> recommendation -> diversity -> serendipity**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **retrieval** dapat memengaruhi **recommendation**, lalu mengubah cara **diversity** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan recommendation dan cultural discovery dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk retrieval serta recommendation.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Digital Heritage Explorer**, tim perlu menerapkan recommendation dan cultural discovery secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **retrieval** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan recommendation dan cultural discovery.
- Menganggap retrieval sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan retrieval dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara recommendation dan diversity dalam bab ini?
3. Sebutkan satu risiko ketika recommendation dan cultural discovery diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan retrieval, recommendation, diversity, serendipity. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 7 - Generative AI dan Kreativitas

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran generative ai dan kreativitas dalam AI for Culture;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Generative AI dan Kreativitas tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI dalam budaya sebaiknya seperti pemandu museum yang rendah hati: membantu pengunjung menemukan hubungan, tetapi tidak menggantikan suara pemilik tradisi atau mengklaim satu interpretasi sebagai kebenaran tunggal.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **generation** | konsep penting dalam generative ai dan kreativitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana generation diukur, diuji, atau dikendalikan? |
| **co-creation** | konsep penting dalam generative ai dan kreativitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana co-creation diukur, diuji, atau dikendalikan? |
| **style** | konsep penting dalam generative ai dan kreativitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana style diukur, diuji, atau dikendalikan? |
| **attribution** | konsep penting dalam generative ai dan kreativitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana attribution diukur, diuji, atau dikendalikan? |
| **consent** | konsep penting dalam generative ai dan kreativitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana consent diukur, diuji, atau dikendalikan? |
| **disclosure** | konsep penting dalam generative ai dan kreativitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana disclosure diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **generation -> co-creation -> style -> attribution**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **generation** dapat memengaruhi **co-creation**, lalu mengubah cara **style** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan generative ai dan kreativitas dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk generation serta co-creation.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Digital Heritage Explorer**, tim perlu menerapkan generative ai dan kreativitas secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **generation** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan generative ai dan kreativitas.
- Menganggap generation sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan generation dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara co-creation dan style dalam bab ini?
3. Sebutkan satu risiko ketika generative ai dan kreativitas diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan generation, co-creation, style, attribution. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 8 - Partisipasi Komunitas dan Citizen Curation

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran partisipasi komunitas dan citizen curation dalam AI for Culture;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Partisipasi Komunitas dan Citizen Curation tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI dalam budaya sebaiknya seperti pemandu museum yang rendah hati: membantu pengunjung menemukan hubungan, tetapi tidak menggantikan suara pemilik tradisi atau mengklaim satu interpretasi sebagai kebenaran tunggal.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **participation** | konsep penting dalam partisipasi komunitas dan citizen curation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana participation diukur, diuji, atau dikendalikan? |
| **validation** | konsep penting dalam partisipasi komunitas dan citizen curation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana validation diukur, diuji, atau dikendalikan? |
| **correction** | konsep penting dalam partisipasi komunitas dan citizen curation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana correction diukur, diuji, atau dikendalikan? |
| **benefit sharing** | konsep penting dalam partisipasi komunitas dan citizen curation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana benefit sharing diukur, diuji, atau dikendalikan? |
| **moderation** | konsep penting dalam partisipasi komunitas dan citizen curation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana moderation diukur, diuji, atau dikendalikan? |
| **governance** | konsep penting dalam partisipasi komunitas dan citizen curation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana governance diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **participation -> validation -> correction -> benefit sharing**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **participation** dapat memengaruhi **validation**, lalu mengubah cara **correction** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan partisipasi komunitas dan citizen curation dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk participation serta validation.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Digital Heritage Explorer**, tim perlu menerapkan partisipasi komunitas dan citizen curation secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **participation** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan partisipasi komunitas dan citizen curation.
- Menganggap participation sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan participation dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara validation dan correction dalam bab ini?
3. Sebutkan satu risiko ketika partisipasi komunitas dan citizen curation diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan participation, validation, correction, benefit sharing. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 9 - Bias, Hak Kekayaan, Privasi, dan Representasi

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran bias, hak kekayaan, privasi, dan representasi dalam AI for Culture;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Bias, Hak Kekayaan, Privasi, dan Representasi tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI dalam budaya sebaiknya seperti pemandu museum yang rendah hati: membantu pengunjung menemukan hubungan, tetapi tidak menggantikan suara pemilik tradisi atau mengklaim satu interpretasi sebagai kebenaran tunggal.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **bias** | konsep penting dalam bias, hak kekayaan, privasi, dan representasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana bias diukur, diuji, atau dikendalikan? |
| **copyright** | konsep penting dalam bias, hak kekayaan, privasi, dan representasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana copyright diukur, diuji, atau dikendalikan? |
| **traditional knowledge** | konsep penting dalam bias, hak kekayaan, privasi, dan representasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana traditional knowledge diukur, diuji, atau dikendalikan? |
| **privacy** | konsep penting dalam bias, hak kekayaan, privasi, dan representasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana privacy diukur, diuji, atau dikendalikan? |
| **sacred data** | konsep penting dalam bias, hak kekayaan, privasi, dan representasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana sacred data diukur, diuji, atau dikendalikan? |
| **representation** | konsep penting dalam bias, hak kekayaan, privasi, dan representasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana representation diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **bias -> copyright -> traditional knowledge -> privacy**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **bias** dapat memengaruhi **copyright**, lalu mengubah cara **traditional knowledge** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan bias, hak kekayaan, privasi, dan representasi dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk bias serta copyright.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Digital Heritage Explorer**, tim perlu menerapkan bias, hak kekayaan, privasi, dan representasi secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **bias** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan bias, hak kekayaan, privasi, dan representasi.
- Menganggap bias sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan bias dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara copyright dan traditional knowledge dalam bab ini?
3. Sebutkan satu risiko ketika bias, hak kekayaan, privasi, dan representasi diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan bias, copyright, traditional knowledge, privacy. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 10 - Produk Budaya Digital yang Berkelanjutan

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran produk budaya digital yang berkelanjutan dalam AI for Culture;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Produk Budaya Digital yang Berkelanjutan tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI dalam budaya sebaiknya seperti pemandu museum yang rendah hati: membantu pengunjung menemukan hubungan, tetapi tidak menggantikan suara pemilik tradisi atau mengklaim satu interpretasi sebagai kebenaran tunggal.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **access** | konsep penting dalam produk budaya digital yang berkelanjutan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana access diukur, diuji, atau dikendalikan? |
| **preservation** | konsep penting dalam produk budaya digital yang berkelanjutan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana preservation diukur, diuji, atau dikendalikan? |
| **maintenance** | konsep penting dalam produk budaya digital yang berkelanjutan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana maintenance diukur, diuji, atau dikendalikan? |
| **partnership** | konsep penting dalam produk budaya digital yang berkelanjutan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana partnership diukur, diuji, atau dikendalikan? |
| **metric** | ukuran terdefinisi yang digunakan untuk memantau kondisi atau hasil | Pertanyaan yang perlu dijawab: bagaimana metric diukur, diuji, atau dikendalikan? |
| **sustainability** | konsep penting dalam produk budaya digital yang berkelanjutan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana sustainability diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **access -> preservation -> maintenance -> partnership**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **access** dapat memengaruhi **preservation**, lalu mengubah cara **maintenance** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan produk budaya digital yang berkelanjutan dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk access serta preservation.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Digital Heritage Explorer**, tim perlu menerapkan produk budaya digital yang berkelanjutan secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **access** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan produk budaya digital yang berkelanjutan.
- Menganggap access sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan access dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara preservation dan maintenance dalam bab ini?
3. Sebutkan satu risiko ketika produk budaya digital yang berkelanjutan diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan access, preservation, maintenance, partnership. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 11 - Mini Project: Digital Heritage Explorer

## Tujuan Proyek

Merancang prototipe katalog warisan budaya dengan metadata, pencarian semantik, narasi berbasis sumber, kontribusi komunitas, serta mekanisme koreksi.

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
artifact = {
  "id": "HR-001",
  "title": {"id": "Topeng Tradisional", "en": "Traditional Mask"},
  "community": "[diisi bersama komunitas]",
  "source": {"type": "collection_record", "id": "SRC-101"},
  "rights": {"access": "public", "reuse": "permission_required"},
  "interpretations": [],
  "uncertainty_note": "Asal dan tanggal masih memerlukan verifikasi."
}
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

1. Ketika memulai **Konteks Budaya dan Intended Use**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji community
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

2. Ketika memulai **Digitization dan Preservasi Digital**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji capture
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

3. Ketika memulai **Metadata, Taksonomi, dan Ontologi**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mendefinisikan tujuan, konteks, dan cara menguji metadata
D. Mengukur keberhasilan hanya dari jumlah fitur

4. Ketika memulai **NLP untuk Bahasa dan Naskah Lokal**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mengukur keberhasilan hanya dari jumlah fitur
D. Mendefinisikan tujuan, konteks, dan cara menguji OCR

5. Ketika memulai **Computer Vision untuk Artefak**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji classification
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

6. Ketika memulai **Recommendation dan Cultural Discovery**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji retrieval
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

7. Ketika memulai **Generative AI dan Kreativitas**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mendefinisikan tujuan, konteks, dan cara menguji generation
D. Mengukur keberhasilan hanya dari jumlah fitur

8. Ketika memulai **Partisipasi Komunitas dan Citizen Curation**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mengukur keberhasilan hanya dari jumlah fitur
D. Mendefinisikan tujuan, konteks, dan cara menguji participation

9. Ketika memulai **Bias, Hak Kekayaan, Privasi, dan Representasi**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji bias
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

10. Ketika memulai **Produk Budaya Digital yang Berkelanjutan**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji access
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
| 1 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional community, kemudian alat dipilih sesuai kebutuhan. |
| 2 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional capture, kemudian alat dipilih sesuai kebutuhan. |
| 3 | **C** | Pendekatan dimulai dari tujuan dan definisi operasional metadata, kemudian alat dipilih sesuai kebutuhan. |
| 4 | **D** | Pendekatan dimulai dari tujuan dan definisi operasional OCR, kemudian alat dipilih sesuai kebutuhan. |
| 5 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional classification, kemudian alat dipilih sesuai kebutuhan. |
| 6 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional retrieval, kemudian alat dipilih sesuai kebutuhan. |
| 7 | **C** | Pendekatan dimulai dari tujuan dan definisi operasional generation, kemudian alat dipilih sesuai kebutuhan. |
| 8 | **D** | Pendekatan dimulai dari tujuan dan definisi operasional participation, kemudian alat dipilih sesuai kebutuhan. |
| 9 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional bias, kemudian alat dipilih sesuai kebutuhan. |
| 10 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional access, kemudian alat dipilih sesuai kebutuhan. |
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

1. Bagian mana dari AI for Culture yang paling mudah diremehkan tetapi berpotensi menimbulkan kegagalan besar?
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
| **community** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **context** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **intended use** | tujuan, pengguna, konteks, dan batas penggunaan yang dinyatakan. |
| **stakeholder** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **benefit** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **harm** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **capture** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **resolution** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **format** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **checksum** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **backup** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **preservation** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **metadata** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **vocabulary** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **ontology** | model formal tentang konsep dan hubungan dalam suatu domain. |
| **provenance** | informasi asal, versi, pemilik, dan riwayat sebuah artefak. |
| **multilingual** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **uncertainty** | tingkat ketidakpastian yang perlu ditampilkan dan dikelola. |
| **OCR** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **transcription** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **translation** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **low-resource** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **dialect** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **annotation** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **classification** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **detection** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **similarity** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **restoration** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **condition** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **retrieval** | proses menemukan informasi relevan dari sumber yang tersedia. |
| **recommendation** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **diversity** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **serendipity** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **filter bubble** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **explanation** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **generation** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **co-creation** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **style** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **attribution** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **consent** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **disclosure** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **participation** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **validation** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **correction** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |
| **benefit sharing** | konsep penting dalam ai for culture yang perlu diberi definisi operasional sebelum dipakai. |

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

- UNESCO Recommendation on the Ethics of Artificial Intelligence.
- UNESCO Charter on the Preservation of Digital Heritage.
- FAIR Guiding Principles for scientific data management.
- CARE Principles for Indigenous Data Governance.
- International Council of Museums Code of Ethics.

## Penutup

Kemampuan dalam AI for Culture tidak hanya ditunjukkan oleh banyaknya alat yang dikuasai. Kemampuan terlihat dari cara peserta merumuskan masalah, memilih pendekatan yang proporsional, menguji klaim, melindungi pengguna, dan menjaga sistem tetap dapat dipertanggungjawabkan.

---

**HerAI Fellowship - Participant Module**  
**Versi 1.0.0 - 23 Juli 2026**
