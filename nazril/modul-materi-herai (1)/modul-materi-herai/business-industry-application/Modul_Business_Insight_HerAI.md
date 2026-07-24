---
course_id: business-insight
title: Business Insight
slug: business-insight
category: Business and Leadership
sub_category: Analytics and Decision Making
level: Beginner to Intermediate
language: id
status: ready
version: 1.0.0
estimated_duration: 16-20 jam
route: /participant/courses/business-insight
updated_at: 2026-07-23
---

# Business Insight

> **HerAI Fellowship - Participant Module**  
> Mengubah data menjadi pemahaman yang mengarahkan keputusan dan tindakan.

## Tentang Modul

Business Insight memandu peserta dari pertanyaan keputusan menuju definisi metrik, analisis, eksperimen, dashboard, forecasting, dan narasi eksekutif. Insight dinilai dari relevansi dan dampaknya, bukan jumlah grafik.

Modul disusun dengan bahasa bertahap. Setiap bab berisi tujuan, konsep inti, alur kerja, contoh kasus, kesalahan umum, checkpoint, dan latihan. Peserta tidak perlu menghafal seluruh istilah. Yang lebih penting adalah memahami hubungan antarkomponen dan mampu menjelaskan alasan di balik sebuah pilihan.

## Capaian Pembelajaran

Setelah menyelesaikan modul, peserta mampu:

- menjelaskan fondasi dan istilah utama Business Insight;
- menerjemahkan kebutuhan menjadi rancangan yang dapat diuji;
- membuat prototipe kecil dengan dokumentasi dan kontrol dasar;
- mengevaluasi kualitas, risiko, keterbatasan, serta biaya;
- menyampaikan hasil dan rekomendasi kepada pemangku kepentingan.

## Prasyarat

- Pemahaman proses bisnis dan spreadsheet dasar.
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

# Bab 1 - Dari Pertanyaan Bisnis ke Keputusan

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran dari pertanyaan bisnis ke keputusan dalam Business Insight;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Dari Pertanyaan Bisnis ke Keputusan tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Insight seperti lampu sorot di ruang gelap: bukan menerangi semua hal sekaligus, tetapi menyorot bagian yang paling penting untuk keputusan berikutnya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **decision** | konsep penting dalam dari pertanyaan bisnis ke keputusan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana decision diukur, diuji, atau dikendalikan? |
| **stakeholder** | konsep penting dalam dari pertanyaan bisnis ke keputusan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana stakeholder diukur, diuji, atau dikendalikan? |
| **scope** | konsep penting dalam dari pertanyaan bisnis ke keputusan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana scope diukur, diuji, atau dikendalikan? |
| **hypothesis** | konsep penting dalam dari pertanyaan bisnis ke keputusan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana hypothesis diukur, diuji, atau dikendalikan? |
| **action** | konsep penting dalam dari pertanyaan bisnis ke keputusan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana action diukur, diuji, atau dikendalikan? |
| **constraint** | konsep penting dalam dari pertanyaan bisnis ke keputusan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana constraint diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **decision -> stakeholder -> scope -> hypothesis**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **decision** dapat memengaruhi **stakeholder**, lalu mengubah cara **scope** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan dari pertanyaan bisnis ke keputusan dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk decision serta stakeholder.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Executive Insight Pack**, tim perlu menerapkan dari pertanyaan bisnis ke keputusan secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **decision** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan dari pertanyaan bisnis ke keputusan.
- Menganggap decision sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan decision dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara stakeholder dan scope dalam bab ini?
3. Sebutkan satu risiko ketika dari pertanyaan bisnis ke keputusan diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan decision, stakeholder, scope, hypothesis. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 2 - Definisi Metrik yang Konsisten

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran definisi metrik yang konsisten dalam Business Insight;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Definisi Metrik yang Konsisten tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Insight seperti lampu sorot di ruang gelap: bukan menerangi semua hal sekaligus, tetapi menyorot bagian yang paling penting untuk keputusan berikutnya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **metric** | ukuran terdefinisi yang digunakan untuk memantau kondisi atau hasil | Pertanyaan yang perlu dijawab: bagaimana metric diukur, diuji, atau dikendalikan? |
| **numerator** | konsep penting dalam definisi metrik yang konsisten yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana numerator diukur, diuji, atau dikendalikan? |
| **denominator** | konsep penting dalam definisi metrik yang konsisten yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana denominator diukur, diuji, atau dikendalikan? |
| **grain** | konsep penting dalam definisi metrik yang konsisten yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana grain diukur, diuji, atau dikendalikan? |
| **source** | konsep penting dalam definisi metrik yang konsisten yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana source diukur, diuji, atau dikendalikan? |
| **owner** | konsep penting dalam definisi metrik yang konsisten yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana owner diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **metric -> numerator -> denominator -> grain**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **metric** dapat memengaruhi **numerator**, lalu mengubah cara **denominator** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan definisi metrik yang konsisten dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk metric serta numerator.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Executive Insight Pack**, tim perlu menerapkan definisi metrik yang konsisten secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **metric** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan definisi metrik yang konsisten.
- Menganggap metric sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan metric dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara numerator dan denominator dalam bab ini?
3. Sebutkan satu risiko ketika definisi metrik yang konsisten diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan metric, numerator, denominator, grain. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 3 - Metric Tree dan KPI

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran metric tree dan kpi dalam Business Insight;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Metric Tree dan KPI tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Insight seperti lampu sorot di ruang gelap: bukan menerangi semua hal sekaligus, tetapi menyorot bagian yang paling penting untuk keputusan berikutnya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **outcome** | konsep penting dalam metric tree dan kpi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana outcome diukur, diuji, atau dikendalikan? |
| **driver** | konsep penting dalam metric tree dan kpi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana driver diukur, diuji, atau dikendalikan? |
| **leading** | konsep penting dalam metric tree dan kpi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana leading diukur, diuji, atau dikendalikan? |
| **lagging** | konsep penting dalam metric tree dan kpi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana lagging diukur, diuji, atau dikendalikan? |
| **target** | konsep penting dalam metric tree dan kpi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana target diukur, diuji, atau dikendalikan? |
| **guardrail** | batas pengaman yang mencegah optimasi merusak tujuan lain | Pertanyaan yang perlu dijawab: bagaimana guardrail diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **outcome -> driver -> leading -> lagging**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **outcome** dapat memengaruhi **driver**, lalu mengubah cara **leading** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan metric tree dan kpi dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk outcome serta driver.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Executive Insight Pack**, tim perlu menerapkan metric tree dan kpi secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **outcome** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan metric tree dan kpi.
- Menganggap outcome sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan outcome dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara driver dan leading dalam bab ini?
3. Sebutkan satu risiko ketika metric tree dan kpi diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan outcome, driver, leading, lagging. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 4 - Analisis Deskriptif dan Diagnostik

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran analisis deskriptif dan diagnostik dalam Business Insight;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Analisis Deskriptif dan Diagnostik tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Insight seperti lampu sorot di ruang gelap: bukan menerangi semua hal sekaligus, tetapi menyorot bagian yang paling penting untuk keputusan berikutnya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **trend** | konsep penting dalam analisis deskriptif dan diagnostik yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana trend diukur, diuji, atau dikendalikan? |
| **variance** | konsep penting dalam analisis deskriptif dan diagnostik yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana variance diukur, diuji, atau dikendalikan? |
| **benchmark** | konsep penting dalam analisis deskriptif dan diagnostik yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana benchmark diukur, diuji, atau dikendalikan? |
| **decomposition** | konsep penting dalam analisis deskriptif dan diagnostik yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana decomposition diukur, diuji, atau dikendalikan? |
| **root cause** | konsep penting dalam analisis deskriptif dan diagnostik yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana root cause diukur, diuji, atau dikendalikan? |
| **contribution** | konsep penting dalam analisis deskriptif dan diagnostik yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana contribution diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **trend -> variance -> benchmark -> decomposition**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **trend** dapat memengaruhi **variance**, lalu mengubah cara **benchmark** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan analisis deskriptif dan diagnostik dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk trend serta variance.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Executive Insight Pack**, tim perlu menerapkan analisis deskriptif dan diagnostik secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **trend** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan analisis deskriptif dan diagnostik.
- Menganggap trend sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan trend dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara variance dan benchmark dalam bab ini?
3. Sebutkan satu risiko ketika analisis deskriptif dan diagnostik diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan trend, variance, benchmark, decomposition. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 5 - Segmentasi, Cohort, dan Funnel

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran segmentasi, cohort, dan funnel dalam Business Insight;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Segmentasi, Cohort, dan Funnel tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Insight seperti lampu sorot di ruang gelap: bukan menerangi semua hal sekaligus, tetapi menyorot bagian yang paling penting untuk keputusan berikutnya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **segment** | konsep penting dalam segmentasi, cohort, dan funnel yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana segment diukur, diuji, atau dikendalikan? |
| **cohort** | kelompok yang berbagi titik awal atau karakteristik tertentu | Pertanyaan yang perlu dijawab: bagaimana cohort diukur, diuji, atau dikendalikan? |
| **retention** | konsep penting dalam segmentasi, cohort, dan funnel yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana retention diukur, diuji, atau dikendalikan? |
| **conversion** | konsep penting dalam segmentasi, cohort, dan funnel yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana conversion diukur, diuji, atau dikendalikan? |
| **funnel** | konsep penting dalam segmentasi, cohort, dan funnel yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana funnel diukur, diuji, atau dikendalikan? |
| **lifecycle** | konsep penting dalam segmentasi, cohort, dan funnel yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana lifecycle diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **segment -> cohort -> retention -> conversion**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **segment** dapat memengaruhi **cohort**, lalu mengubah cara **retention** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan segmentasi, cohort, dan funnel dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk segment serta cohort.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Executive Insight Pack**, tim perlu menerapkan segmentasi, cohort, dan funnel secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **segment** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan segmentasi, cohort, dan funnel.
- Menganggap segment sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan segment dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara cohort dan retention dalam bab ini?
3. Sebutkan satu risiko ketika segmentasi, cohort, dan funnel diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan segment, cohort, retention, conversion. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 6 - Dashboard yang Mendukung Tindakan

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran dashboard yang mendukung tindakan dalam Business Insight;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Dashboard yang Mendukung Tindakan tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Insight seperti lampu sorot di ruang gelap: bukan menerangi semua hal sekaligus, tetapi menyorot bagian yang paling penting untuk keputusan berikutnya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **hierarchy** | konsep penting dalam dashboard yang mendukung tindakan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana hierarchy diukur, diuji, atau dikendalikan? |
| **context** | konsep penting dalam dashboard yang mendukung tindakan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana context diukur, diuji, atau dikendalikan? |
| **alert** | konsep penting dalam dashboard yang mendukung tindakan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana alert diukur, diuji, atau dikendalikan? |
| **drill-down** | konsep penting dalam dashboard yang mendukung tindakan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana drill-down diukur, diuji, atau dikendalikan? |
| **annotation** | konsep penting dalam dashboard yang mendukung tindakan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana annotation diukur, diuji, atau dikendalikan? |
| **cadence** | konsep penting dalam dashboard yang mendukung tindakan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana cadence diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **hierarchy -> context -> alert -> drill-down**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **hierarchy** dapat memengaruhi **context**, lalu mengubah cara **alert** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan dashboard yang mendukung tindakan dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk hierarchy serta context.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Executive Insight Pack**, tim perlu menerapkan dashboard yang mendukung tindakan secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **hierarchy** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan dashboard yang mendukung tindakan.
- Menganggap hierarchy sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan hierarchy dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara context dan alert dalam bab ini?
3. Sebutkan satu risiko ketika dashboard yang mendukung tindakan diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan hierarchy, context, alert, drill-down. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 7 - Eksperimen dan Pengukuran Dampak

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran eksperimen dan pengukuran dampak dalam Business Insight;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Eksperimen dan Pengukuran Dampak tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Insight seperti lampu sorot di ruang gelap: bukan menerangi semua hal sekaligus, tetapi menyorot bagian yang paling penting untuk keputusan berikutnya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **hypothesis** | konsep penting dalam eksperimen dan pengukuran dampak yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana hypothesis diukur, diuji, atau dikendalikan? |
| **treatment** | konsep penting dalam eksperimen dan pengukuran dampak yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana treatment diukur, diuji, atau dikendalikan? |
| **control** | konsep penting dalam eksperimen dan pengukuran dampak yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana control diukur, diuji, atau dikendalikan? |
| **lift** | konsep penting dalam eksperimen dan pengukuran dampak yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana lift diukur, diuji, atau dikendalikan? |
| **significance** | konsep penting dalam eksperimen dan pengukuran dampak yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana significance diukur, diuji, atau dikendalikan? |
| **guardrail** | batas pengaman yang mencegah optimasi merusak tujuan lain | Pertanyaan yang perlu dijawab: bagaimana guardrail diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **hypothesis -> treatment -> control -> lift**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **hypothesis** dapat memengaruhi **treatment**, lalu mengubah cara **control** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan eksperimen dan pengukuran dampak dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk hypothesis serta treatment.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Executive Insight Pack**, tim perlu menerapkan eksperimen dan pengukuran dampak secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **hypothesis** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan eksperimen dan pengukuran dampak.
- Menganggap hypothesis sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan hypothesis dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara treatment dan control dalam bab ini?
3. Sebutkan satu risiko ketika eksperimen dan pengukuran dampak diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan hypothesis, treatment, control, lift. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 8 - Forecast dan Scenario Planning

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran forecast dan scenario planning dalam Business Insight;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Forecast dan Scenario Planning tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Insight seperti lampu sorot di ruang gelap: bukan menerangi semua hal sekaligus, tetapi menyorot bagian yang paling penting untuk keputusan berikutnya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **forecast** | konsep penting dalam forecast dan scenario planning yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana forecast diukur, diuji, atau dikendalikan? |
| **assumption** | konsep penting dalam forecast dan scenario planning yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana assumption diukur, diuji, atau dikendalikan? |
| **base** | konsep penting dalam forecast dan scenario planning yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana base diukur, diuji, atau dikendalikan? |
| **upside** | konsep penting dalam forecast dan scenario planning yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana upside diukur, diuji, atau dikendalikan? |
| **downside** | konsep penting dalam forecast dan scenario planning yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana downside diukur, diuji, atau dikendalikan? |
| **sensitivity** | konsep penting dalam forecast dan scenario planning yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana sensitivity diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **forecast -> assumption -> base -> upside**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **forecast** dapat memengaruhi **assumption**, lalu mengubah cara **base** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan forecast dan scenario planning dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk forecast serta assumption.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Executive Insight Pack**, tim perlu menerapkan forecast dan scenario planning secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **forecast** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan forecast dan scenario planning.
- Menganggap forecast sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan forecast dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara assumption dan base dalam bab ini?
3. Sebutkan satu risiko ketika forecast dan scenario planning diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan forecast, assumption, base, upside. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 9 - AI-assisted Analysis dengan Verifikasi

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran ai-assisted analysis dengan verifikasi dalam Business Insight;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

AI-assisted Analysis dengan Verifikasi tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Insight seperti lampu sorot di ruang gelap: bukan menerangi semua hal sekaligus, tetapi menyorot bagian yang paling penting untuk keputusan berikutnya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **copilot** | konsep penting dalam ai-assisted analysis dengan verifikasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana copilot diukur, diuji, atau dikendalikan? |
| **query** | konsep penting dalam ai-assisted analysis dengan verifikasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana query diukur, diuji, atau dikendalikan? |
| **summarization** | konsep penting dalam ai-assisted analysis dengan verifikasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana summarization diukur, diuji, atau dikendalikan? |
| **citation** | penunjuk sumber yang memungkinkan klaim diperiksa | Pertanyaan yang perlu dijawab: bagaimana citation diukur, diuji, atau dikendalikan? |
| **verification** | konsep penting dalam ai-assisted analysis dengan verifikasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana verification diukur, diuji, atau dikendalikan? |
| **confidentiality** | konsep penting dalam ai-assisted analysis dengan verifikasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana confidentiality diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **copilot -> query -> summarization -> citation**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **copilot** dapat memengaruhi **query**, lalu mengubah cara **summarization** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan ai-assisted analysis dengan verifikasi dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk copilot serta query.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Executive Insight Pack**, tim perlu menerapkan ai-assisted analysis dengan verifikasi secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **copilot** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan ai-assisted analysis dengan verifikasi.
- Menganggap copilot sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan copilot dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara query dan summarization dalam bab ini?
3. Sebutkan satu risiko ketika ai-assisted analysis dengan verifikasi diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan copilot, query, summarization, citation. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 10 - Data Storytelling dan Decision Cadence

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran data storytelling dan decision cadence dalam Business Insight;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Data Storytelling dan Decision Cadence tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** Insight seperti lampu sorot di ruang gelap: bukan menerangi semua hal sekaligus, tetapi menyorot bagian yang paling penting untuk keputusan berikutnya.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **audience** | konsep penting dalam data storytelling dan decision cadence yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana audience diukur, diuji, atau dikendalikan? |
| **narrative** | konsep penting dalam data storytelling dan decision cadence yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana narrative diukur, diuji, atau dikendalikan? |
| **evidence** | konsep penting dalam data storytelling dan decision cadence yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana evidence diukur, diuji, atau dikendalikan? |
| **recommendation** | konsep penting dalam data storytelling dan decision cadence yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana recommendation diukur, diuji, atau dikendalikan? |
| **owner** | konsep penting dalam data storytelling dan decision cadence yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana owner diukur, diuji, atau dikendalikan? |
| **follow-up** | konsep penting dalam data storytelling dan decision cadence yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana follow-up diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **audience -> narrative -> evidence -> recommendation**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **audience** dapat memengaruhi **narrative**, lalu mengubah cara **evidence** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan data storytelling dan decision cadence dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk audience serta narrative.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Executive Insight Pack**, tim perlu menerapkan data storytelling dan decision cadence secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **audience** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan data storytelling dan decision cadence.
- Menganggap audience sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan audience dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara narrative dan evidence dalam bab ini?
3. Sebutkan satu risiko ketika data storytelling dan decision cadence diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan audience, narrative, evidence, recommendation. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 11 - Mini Project: Executive Insight Pack

## Tujuan Proyek

Menyusun metric tree, dashboard ringkas, diagnosis perubahan KPI, rekomendasi tindakan, dan rencana eksperimen untuk satu kasus bisnis.

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
WITH monthly AS (
  SELECT date_trunc('month', order_date) AS month,
         customer_segment,
         SUM(revenue) AS revenue,
         COUNT(DISTINCT customer_id) AS customers
  FROM fact_orders
  GROUP BY 1, 2
)
SELECT month, customer_segment, revenue, customers,
       revenue / NULLIF(customers, 0) AS revenue_per_customer
FROM monthly
ORDER BY month, customer_segment;
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

1. Ketika memulai **Dari Pertanyaan Bisnis ke Keputusan**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji decision
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

2. Ketika memulai **Definisi Metrik yang Konsisten**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji metric
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

3. Ketika memulai **Metric Tree dan KPI**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mendefinisikan tujuan, konteks, dan cara menguji outcome
D. Mengukur keberhasilan hanya dari jumlah fitur

4. Ketika memulai **Analisis Deskriptif dan Diagnostik**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mengukur keberhasilan hanya dari jumlah fitur
D. Mendefinisikan tujuan, konteks, dan cara menguji trend

5. Ketika memulai **Segmentasi, Cohort, dan Funnel**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji segment
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

6. Ketika memulai **Dashboard yang Mendukung Tindakan**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji hierarchy
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

7. Ketika memulai **Eksperimen dan Pengukuran Dampak**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mendefinisikan tujuan, konteks, dan cara menguji hypothesis
D. Mengukur keberhasilan hanya dari jumlah fitur

8. Ketika memulai **Forecast dan Scenario Planning**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mengukur keberhasilan hanya dari jumlah fitur
D. Mendefinisikan tujuan, konteks, dan cara menguji forecast

9. Ketika memulai **AI-assisted Analysis dengan Verifikasi**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji copilot
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

10. Ketika memulai **Data Storytelling dan Decision Cadence**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji audience
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
| 1 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional decision, kemudian alat dipilih sesuai kebutuhan. |
| 2 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional metric, kemudian alat dipilih sesuai kebutuhan. |
| 3 | **C** | Pendekatan dimulai dari tujuan dan definisi operasional outcome, kemudian alat dipilih sesuai kebutuhan. |
| 4 | **D** | Pendekatan dimulai dari tujuan dan definisi operasional trend, kemudian alat dipilih sesuai kebutuhan. |
| 5 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional segment, kemudian alat dipilih sesuai kebutuhan. |
| 6 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional hierarchy, kemudian alat dipilih sesuai kebutuhan. |
| 7 | **C** | Pendekatan dimulai dari tujuan dan definisi operasional hypothesis, kemudian alat dipilih sesuai kebutuhan. |
| 8 | **D** | Pendekatan dimulai dari tujuan dan definisi operasional forecast, kemudian alat dipilih sesuai kebutuhan. |
| 9 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional copilot, kemudian alat dipilih sesuai kebutuhan. |
| 10 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional audience, kemudian alat dipilih sesuai kebutuhan. |
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

1. Bagian mana dari Business Insight yang paling mudah diremehkan tetapi berpotensi menimbulkan kegagalan besar?
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
| **decision** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **stakeholder** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **scope** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **hypothesis** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **action** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **constraint** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **metric** | ukuran terdefinisi yang digunakan untuk memantau kondisi atau hasil. |
| **numerator** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **denominator** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **grain** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **source** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **owner** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **outcome** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **driver** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **leading** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **lagging** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **target** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **guardrail** | batas pengaman yang mencegah optimasi merusak tujuan lain. |
| **trend** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **variance** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **benchmark** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **decomposition** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **root cause** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **contribution** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **segment** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **cohort** | kelompok yang berbagi titik awal atau karakteristik tertentu. |
| **retention** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **conversion** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **funnel** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **lifecycle** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **hierarchy** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **context** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **alert** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **drill-down** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **annotation** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **cadence** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **treatment** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **control** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **lift** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **significance** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **forecast** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **assumption** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **base** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **upside** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |
| **downside** | konsep penting dalam business insight yang perlu diberi definisi operasional sebelum dipakai. |

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

- Storytelling with Data - Cole Nussbaumer Knaflic.
- Lean Analytics - Croll dan Yoskovitz.
- Good Charts - Scott Berinato.
- Trustworthy Online Controlled Experiments - Kohavi dkk..
- The Pyramid Principle - Barbara Minto.

## Penutup

Kemampuan dalam Business Insight tidak hanya ditunjukkan oleh banyaknya alat yang dikuasai. Kemampuan terlihat dari cara peserta merumuskan masalah, memilih pendekatan yang proporsional, menguji klaim, melindungi pengguna, dan menjaga sistem tetap dapat dipertanggungjawabkan.

---

**HerAI Fellowship - Participant Module**  
**Versi 1.0.0 - 23 Juli 2026**
