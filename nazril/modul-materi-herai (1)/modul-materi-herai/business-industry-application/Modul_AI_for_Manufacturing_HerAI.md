---
course_id: ai-for-manufacturing
title: AI for Manufacturing
slug: ai-for-manufacturing
category: Applied AI
sub_category: Manufacturing
level: Intermediate
language: id
status: ready
version: 1.0.0
estimated_duration: 20-24 jam
route: /participant/courses/ai-for-manufacturing
updated_at: 2026-07-23
---

# AI for Manufacturing

> **HerAI Fellowship - Participant Module**  
> Menerapkan AI untuk kualitas, keandalan, produktivitas, dan keselamatan operasi manufaktur.

## Tentang Modul

AI for Manufacturing membahas data sensor, predictive maintenance, visual inspection, process optimization, planning, digital twin, edge AI, cybersecurity, MLOps, dan ROI. Keselamatan serta batas kontrol operasi menjadi prinsip utama.

Modul disusun dengan bahasa bertahap. Setiap bab berisi tujuan, konsep inti, alur kerja, contoh kasus, kesalahan umum, checkpoint, dan latihan. Peserta tidak perlu menghafal seluruh istilah. Yang lebih penting adalah memahami hubungan antarkomponen dan mampu menjelaskan alasan di balik sebuah pilihan.

## Capaian Pembelajaran

Setelah menyelesaikan modul, peserta mampu:

- menjelaskan fondasi dan istilah utama AI for Manufacturing;
- menerjemahkan kebutuhan menjadi rancangan yang dapat diuji;
- membuat prototipe kecil dengan dokumentasi dan kontrol dasar;
- mengevaluasi kualitas, risiko, keterbatasan, serta biaya;
- menyampaikan hasil dan rekomendasi kepada pemangku kepentingan.

## Prasyarat

- Pengantar AI, statistika dasar, dan pemahaman proses produksi.
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

# Bab 1 - Proses Produksi dan KPI Operasi

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran proses produksi dan kpi operasi dalam AI for Manufacturing;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Proses Produksi dan KPI Operasi tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI di pabrik seperti sistem saraf tambahan: sensor menangkap kondisi, model mengenali pola, tetapi tindakan harus melewati kontrol keselamatan dan prosedur operasi yang jelas.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **cycle time** | konsep penting dalam proses produksi dan kpi operasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana cycle time diukur, diuji, atau dikendalikan? |
| **yield** | konsep penting dalam proses produksi dan kpi operasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana yield diukur, diuji, atau dikendalikan? |
| **OEE** | konsep penting dalam proses produksi dan kpi operasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana OEE diukur, diuji, atau dikendalikan? |
| **downtime** | konsep penting dalam proses produksi dan kpi operasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana downtime diukur, diuji, atau dikendalikan? |
| **scrap** | konsep penting dalam proses produksi dan kpi operasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana scrap diukur, diuji, atau dikendalikan? |
| **safety** | konsep penting dalam proses produksi dan kpi operasi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana safety diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **cycle time -> yield -> OEE -> downtime**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **cycle time** dapat memengaruhi **yield**, lalu mengubah cara **OEE** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan proses produksi dan kpi operasi dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk cycle time serta yield.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Predictive Maintenance Motor Produksi**, tim perlu menerapkan proses produksi dan kpi operasi secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **cycle time** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan proses produksi dan kpi operasi.
- Menganggap cycle time sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan cycle time dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara yield dan OEE dalam bab ini?
3. Sebutkan satu risiko ketika proses produksi dan kpi operasi diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan cycle time, yield, OEE, downtime. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 2 - Sensor, IIoT, dan Integrasi OT-IT

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran sensor, iiot, dan integrasi ot-it dalam AI for Manufacturing;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Sensor, IIoT, dan Integrasi OT-IT tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI di pabrik seperti sistem saraf tambahan: sensor menangkap kondisi, model mengenali pola, tetapi tindakan harus melewati kontrol keselamatan dan prosedur operasi yang jelas.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **sensor** | konsep penting dalam sensor, iiot, dan integrasi ot-it yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana sensor diukur, diuji, atau dikendalikan? |
| **PLC** | konsep penting dalam sensor, iiot, dan integrasi ot-it yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana PLC diukur, diuji, atau dikendalikan? |
| **SCADA** | konsep penting dalam sensor, iiot, dan integrasi ot-it yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana SCADA diukur, diuji, atau dikendalikan? |
| **historian** | konsep penting dalam sensor, iiot, dan integrasi ot-it yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana historian diukur, diuji, atau dikendalikan? |
| **gateway** | konsep penting dalam sensor, iiot, dan integrasi ot-it yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana gateway diukur, diuji, atau dikendalikan? |
| **protocol** | konsep penting dalam sensor, iiot, dan integrasi ot-it yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana protocol diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **sensor -> PLC -> SCADA -> historian**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **sensor** dapat memengaruhi **PLC**, lalu mengubah cara **SCADA** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan sensor, iiot, dan integrasi ot-it dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk sensor serta PLC.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Predictive Maintenance Motor Produksi**, tim perlu menerapkan sensor, iiot, dan integrasi ot-it secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **sensor** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan sensor, iiot, dan integrasi ot-it.
- Menganggap sensor sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan sensor dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara PLC dan SCADA dalam bab ini?
3. Sebutkan satu risiko ketika sensor, iiot, dan integrasi ot-it diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan sensor, PLC, SCADA, historian. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 3 - Time-series dan Kualitas Data Industri

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran time-series dan kualitas data industri dalam AI for Manufacturing;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Time-series dan Kualitas Data Industri tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI di pabrik seperti sistem saraf tambahan: sensor menangkap kondisi, model mengenali pola, tetapi tindakan harus melewati kontrol keselamatan dan prosedur operasi yang jelas.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **timestamp** | konsep penting dalam time-series dan kualitas data industri yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana timestamp diukur, diuji, atau dikendalikan? |
| **sampling** | konsep penting dalam time-series dan kualitas data industri yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana sampling diukur, diuji, atau dikendalikan? |
| **missing** | konsep penting dalam time-series dan kualitas data industri yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana missing diukur, diuji, atau dikendalikan? |
| **drift** | perubahan distribusi data atau hubungan yang dipelajari model | Pertanyaan yang perlu dijawab: bagaimana drift diukur, diuji, atau dikendalikan? |
| **synchronization** | konsep penting dalam time-series dan kualitas data industri yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana synchronization diukur, diuji, atau dikendalikan? |
| **context** | konsep penting dalam time-series dan kualitas data industri yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana context diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **timestamp -> sampling -> missing -> drift**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **timestamp** dapat memengaruhi **sampling**, lalu mengubah cara **missing** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan time-series dan kualitas data industri dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk timestamp serta sampling.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Predictive Maintenance Motor Produksi**, tim perlu menerapkan time-series dan kualitas data industri secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **timestamp** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan time-series dan kualitas data industri.
- Menganggap timestamp sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan timestamp dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara sampling dan missing dalam bab ini?
3. Sebutkan satu risiko ketika time-series dan kualitas data industri diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan timestamp, sampling, missing, drift. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 4 - Predictive Maintenance

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran predictive maintenance dalam AI for Manufacturing;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Predictive Maintenance tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI di pabrik seperti sistem saraf tambahan: sensor menangkap kondisi, model mengenali pola, tetapi tindakan harus melewati kontrol keselamatan dan prosedur operasi yang jelas.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **failure mode** | konsep penting dalam predictive maintenance yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana failure mode diukur, diuji, atau dikendalikan? |
| **condition monitoring** | konsep penting dalam predictive maintenance yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana condition monitoring diukur, diuji, atau dikendalikan? |
| **anomaly** | konsep penting dalam predictive maintenance yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana anomaly diukur, diuji, atau dikendalikan? |
| **remaining life** | konsep penting dalam predictive maintenance yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana remaining life diukur, diuji, atau dikendalikan? |
| **maintenance** | konsep penting dalam predictive maintenance yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana maintenance diukur, diuji, atau dikendalikan? |
| **false alarm** | konsep penting dalam predictive maintenance yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana false alarm diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **failure mode -> condition monitoring -> anomaly -> remaining life**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **failure mode** dapat memengaruhi **condition monitoring**, lalu mengubah cara **anomaly** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan predictive maintenance dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk failure mode serta condition monitoring.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Predictive Maintenance Motor Produksi**, tim perlu menerapkan predictive maintenance secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **failure mode** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan predictive maintenance.
- Menganggap failure mode sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan failure mode dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara condition monitoring dan anomaly dalam bab ini?
3. Sebutkan satu risiko ketika predictive maintenance diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan failure mode, condition monitoring, anomaly, remaining life. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 5 - Visual Inspection dan Quality Control

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran visual inspection dan quality control dalam AI for Manufacturing;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Visual Inspection dan Quality Control tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI di pabrik seperti sistem saraf tambahan: sensor menangkap kondisi, model mengenali pola, tetapi tindakan harus melewati kontrol keselamatan dan prosedur operasi yang jelas.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **camera** | konsep penting dalam visual inspection dan quality control yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana camera diukur, diuji, atau dikendalikan? |
| **lighting** | konsep penting dalam visual inspection dan quality control yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana lighting diukur, diuji, atau dikendalikan? |
| **defect** | konsep penting dalam visual inspection dan quality control yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana defect diukur, diuji, atau dikendalikan? |
| **detection** | konsep penting dalam visual inspection dan quality control yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana detection diukur, diuji, atau dikendalikan? |
| **segmentation** | konsep penting dalam visual inspection dan quality control yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana segmentation diukur, diuji, atau dikendalikan? |
| **traceability** | konsep penting dalam visual inspection dan quality control yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana traceability diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **camera -> lighting -> defect -> detection**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **camera** dapat memengaruhi **lighting**, lalu mengubah cara **defect** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan visual inspection dan quality control dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk camera serta lighting.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Predictive Maintenance Motor Produksi**, tim perlu menerapkan visual inspection dan quality control secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **camera** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan visual inspection dan quality control.
- Menganggap camera sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan camera dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara lighting dan defect dalam bab ini?
3. Sebutkan satu risiko ketika visual inspection dan quality control diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan camera, lighting, defect, detection. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 6 - Process Optimization dan Control

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran process optimization dan control dalam AI for Manufacturing;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Process Optimization dan Control tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI di pabrik seperti sistem saraf tambahan: sensor menangkap kondisi, model mengenali pola, tetapi tindakan harus melewati kontrol keselamatan dan prosedur operasi yang jelas.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **setpoint** | konsep penting dalam process optimization dan control yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana setpoint diukur, diuji, atau dikendalikan? |
| **constraint** | konsep penting dalam process optimization dan control yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana constraint diukur, diuji, atau dikendalikan? |
| **optimization** | konsep penting dalam process optimization dan control yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana optimization diukur, diuji, atau dikendalikan? |
| **feedback** | konsep penting dalam process optimization dan control yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana feedback diukur, diuji, atau dikendalikan? |
| **simulation** | konsep penting dalam process optimization dan control yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana simulation diukur, diuji, atau dikendalikan? |
| **human approval** | konsep penting dalam process optimization dan control yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana human approval diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **setpoint -> constraint -> optimization -> feedback**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **setpoint** dapat memengaruhi **constraint**, lalu mengubah cara **optimization** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan process optimization dan control dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk setpoint serta constraint.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Predictive Maintenance Motor Produksi**, tim perlu menerapkan process optimization dan control secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **setpoint** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan process optimization dan control.
- Menganggap setpoint sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan setpoint dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara constraint dan optimization dalam bab ini?
3. Sebutkan satu risiko ketika process optimization dan control diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan setpoint, constraint, optimization, feedback. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 7 - Demand, Inventory, dan Scheduling

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran demand, inventory, dan scheduling dalam AI for Manufacturing;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Demand, Inventory, dan Scheduling tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI di pabrik seperti sistem saraf tambahan: sensor menangkap kondisi, model mengenali pola, tetapi tindakan harus melewati kontrol keselamatan dan prosedur operasi yang jelas.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **forecast** | konsep penting dalam demand, inventory, dan scheduling yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana forecast diukur, diuji, atau dikendalikan? |
| **inventory** | konsep penting dalam demand, inventory, dan scheduling yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana inventory diukur, diuji, atau dikendalikan? |
| **lead time** | konsep penting dalam demand, inventory, dan scheduling yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana lead time diukur, diuji, atau dikendalikan? |
| **capacity** | konsep penting dalam demand, inventory, dan scheduling yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana capacity diukur, diuji, atau dikendalikan? |
| **scheduling** | konsep penting dalam demand, inventory, dan scheduling yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana scheduling diukur, diuji, atau dikendalikan? |
| **service level** | konsep penting dalam demand, inventory, dan scheduling yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana service level diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **forecast -> inventory -> lead time -> capacity**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **forecast** dapat memengaruhi **inventory**, lalu mengubah cara **lead time** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan demand, inventory, dan scheduling dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk forecast serta inventory.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Predictive Maintenance Motor Produksi**, tim perlu menerapkan demand, inventory, dan scheduling secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **forecast** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan demand, inventory, dan scheduling.
- Menganggap forecast sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan forecast dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara inventory dan lead time dalam bab ini?
3. Sebutkan satu risiko ketika demand, inventory, dan scheduling diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan forecast, inventory, lead time, capacity. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 8 - Digital Twin dan Simulation

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran digital twin dan simulation dalam AI for Manufacturing;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Digital Twin dan Simulation tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI di pabrik seperti sistem saraf tambahan: sensor menangkap kondisi, model mengenali pola, tetapi tindakan harus melewati kontrol keselamatan dan prosedur operasi yang jelas.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **asset model** | konsep penting dalam digital twin dan simulation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana asset model diukur, diuji, atau dikendalikan? |
| **state** | konsep penting dalam digital twin dan simulation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana state diukur, diuji, atau dikendalikan? |
| **simulation** | konsep penting dalam digital twin dan simulation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana simulation diukur, diuji, atau dikendalikan? |
| **scenario** | konsep penting dalam digital twin dan simulation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana scenario diukur, diuji, atau dikendalikan? |
| **calibration** | kesesuaian antara skor probabilitas dan frekuensi kejadian nyata | Pertanyaan yang perlu dijawab: bagaimana calibration diukur, diuji, atau dikendalikan? |
| **fidelity** | konsep penting dalam digital twin dan simulation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana fidelity diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **asset model -> state -> simulation -> scenario**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **asset model** dapat memengaruhi **state**, lalu mengubah cara **simulation** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan digital twin dan simulation dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk asset model serta state.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Predictive Maintenance Motor Produksi**, tim perlu menerapkan digital twin dan simulation secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **asset model** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan digital twin dan simulation.
- Menganggap asset model sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan asset model dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara state dan simulation dalam bab ini?
3. Sebutkan satu risiko ketika digital twin dan simulation diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan asset model, state, simulation, scenario. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 9 - Edge AI dan Real-time Operation

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran edge ai dan real-time operation dalam AI for Manufacturing;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Edge AI dan Real-time Operation tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI di pabrik seperti sistem saraf tambahan: sensor menangkap kondisi, model mengenali pola, tetapi tindakan harus melewati kontrol keselamatan dan prosedur operasi yang jelas.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **edge** | konsep penting dalam edge ai dan real-time operation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana edge diukur, diuji, atau dikendalikan? |
| **latency** | waktu yang dibutuhkan sistem untuk menghasilkan respons | Pertanyaan yang perlu dijawab: bagaimana latency diukur, diuji, atau dikendalikan? |
| **offline** | konsep penting dalam edge ai dan real-time operation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana offline diukur, diuji, atau dikendalikan? |
| **compression** | konsep penting dalam edge ai dan real-time operation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana compression diukur, diuji, atau dikendalikan? |
| **update** | konsep penting dalam edge ai dan real-time operation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana update diukur, diuji, atau dikendalikan? |
| **fallback** | konsep penting dalam edge ai dan real-time operation yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana fallback diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **edge -> latency -> offline -> compression**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **edge** dapat memengaruhi **latency**, lalu mengubah cara **offline** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan edge ai dan real-time operation dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk edge serta latency.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Predictive Maintenance Motor Produksi**, tim perlu menerapkan edge ai dan real-time operation secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **edge** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan edge ai dan real-time operation.
- Menganggap edge sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan edge dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara latency dan offline dalam bab ini?
3. Sebutkan satu risiko ketika edge ai dan real-time operation diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan edge, latency, offline, compression. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 10 - Safety, Cybersecurity, MLOps, dan ROI

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran safety, cybersecurity, mlops, dan roi dalam AI for Manufacturing;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Safety, Cybersecurity, MLOps, dan ROI tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI di pabrik seperti sistem saraf tambahan: sensor menangkap kondisi, model mengenali pola, tetapi tindakan harus melewati kontrol keselamatan dan prosedur operasi yang jelas.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **hazard** | konsep penting dalam safety, cybersecurity, mlops, dan roi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana hazard diukur, diuji, atau dikendalikan? |
| **segmentation** | konsep penting dalam safety, cybersecurity, mlops, dan roi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana segmentation diukur, diuji, atau dikendalikan? |
| **access** | konsep penting dalam safety, cybersecurity, mlops, dan roi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana access diukur, diuji, atau dikendalikan? |
| **monitoring** | konsep penting dalam safety, cybersecurity, mlops, dan roi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana monitoring diukur, diuji, atau dikendalikan? |
| **change control** | konsep penting dalam safety, cybersecurity, mlops, dan roi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana change control diukur, diuji, atau dikendalikan? |
| **business value** | konsep penting dalam safety, cybersecurity, mlops, dan roi yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana business value diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **hazard -> segmentation -> access -> monitoring**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **hazard** dapat memengaruhi **segmentation**, lalu mengubah cara **access** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan safety, cybersecurity, mlops, dan roi dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk hazard serta segmentation.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Predictive Maintenance Motor Produksi**, tim perlu menerapkan safety, cybersecurity, mlops, dan roi secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **hazard** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan safety, cybersecurity, mlops, dan roi.
- Menganggap hazard sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan hazard dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara segmentation dan access dalam bab ini?
3. Sebutkan satu risiko ketika safety, cybersecurity, mlops, dan roi diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan hazard, segmentation, access, monitoring. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 11 - Mini Project: Predictive Maintenance Motor Produksi

## Tujuan Proyek

Membangun prototipe deteksi risiko kegagalan dari data sensor sintetis, menentukan threshold, workflow inspeksi, dan metrik biaya downtime.

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
def anomaly_status(vibration, temperature, baseline):
    vibration_z = (vibration - baseline["vibration_mean"]) / baseline["vibration_std"]
    temperature_z = (temperature - baseline["temperature_mean"]) / baseline["temperature_std"]
    score = max(abs(vibration_z), abs(temperature_z))
    if score >= 4:
        return {"level": "inspect_now", "score": score}
    if score >= 3:
        return {"level": "schedule_check", "score": score}
    return {"level": "normal", "score": score}

# Alarm harus terhubung ke SOP inspeksi, bukan langsung mematikan mesin.
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

1. Ketika memulai **Proses Produksi dan KPI Operasi**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji cycle time
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

2. Ketika memulai **Sensor, IIoT, dan Integrasi OT-IT**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji sensor
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

3. Ketika memulai **Time-series dan Kualitas Data Industri**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mendefinisikan tujuan, konteks, dan cara menguji timestamp
D. Mengukur keberhasilan hanya dari jumlah fitur

4. Ketika memulai **Predictive Maintenance**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mengukur keberhasilan hanya dari jumlah fitur
D. Mendefinisikan tujuan, konteks, dan cara menguji failure mode

5. Ketika memulai **Visual Inspection dan Quality Control**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji camera
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

6. Ketika memulai **Process Optimization dan Control**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji setpoint
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

7. Ketika memulai **Demand, Inventory, dan Scheduling**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mendefinisikan tujuan, konteks, dan cara menguji forecast
D. Mengukur keberhasilan hanya dari jumlah fitur

8. Ketika memulai **Digital Twin dan Simulation**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mengukur keberhasilan hanya dari jumlah fitur
D. Mendefinisikan tujuan, konteks, dan cara menguji asset model

9. Ketika memulai **Edge AI dan Real-time Operation**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji edge
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

10. Ketika memulai **Safety, Cybersecurity, MLOps, dan ROI**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji hazard
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
| 1 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional cycle time, kemudian alat dipilih sesuai kebutuhan. |
| 2 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional sensor, kemudian alat dipilih sesuai kebutuhan. |
| 3 | **C** | Pendekatan dimulai dari tujuan dan definisi operasional timestamp, kemudian alat dipilih sesuai kebutuhan. |
| 4 | **D** | Pendekatan dimulai dari tujuan dan definisi operasional failure mode, kemudian alat dipilih sesuai kebutuhan. |
| 5 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional camera, kemudian alat dipilih sesuai kebutuhan. |
| 6 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional setpoint, kemudian alat dipilih sesuai kebutuhan. |
| 7 | **C** | Pendekatan dimulai dari tujuan dan definisi operasional forecast, kemudian alat dipilih sesuai kebutuhan. |
| 8 | **D** | Pendekatan dimulai dari tujuan dan definisi operasional asset model, kemudian alat dipilih sesuai kebutuhan. |
| 9 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional edge, kemudian alat dipilih sesuai kebutuhan. |
| 10 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional hazard, kemudian alat dipilih sesuai kebutuhan. |
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

1. Bagian mana dari AI for Manufacturing yang paling mudah diremehkan tetapi berpotensi menimbulkan kegagalan besar?
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
| **cycle time** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **yield** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **OEE** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **downtime** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **scrap** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **safety** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **sensor** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **PLC** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **SCADA** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **historian** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **gateway** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **protocol** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **timestamp** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **sampling** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **missing** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **drift** | perubahan distribusi data atau hubungan yang dipelajari model. |
| **synchronization** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **context** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **failure mode** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **condition monitoring** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **anomaly** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **remaining life** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **maintenance** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **false alarm** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **camera** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **lighting** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **defect** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **detection** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **segmentation** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **traceability** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **setpoint** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **constraint** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **optimization** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **feedback** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **simulation** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **human approval** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **forecast** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **inventory** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **lead time** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **capacity** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **scheduling** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **service level** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **asset model** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **state** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |
| **scenario** | konsep penting dalam ai for manufacturing yang perlu diberi definisi operasional sebelum dipakai. |

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

- ISO 22400 - Manufacturing operations management KPIs.
- NIST Guide to Industrial Control Systems Security.
- OPC UA Specifications.
- The Goal - Eliyahu Goldratt.
- Practical MLOps - Noah Gift dan Alfredo Deza.

## Penutup

Kemampuan dalam AI for Manufacturing tidak hanya ditunjukkan oleh banyaknya alat yang dikuasai. Kemampuan terlihat dari cara peserta merumuskan masalah, memilih pendekatan yang proporsional, menguji klaim, melindungi pengguna, dan menjaga sistem tetap dapat dipertanggungjawabkan.

---

**HerAI Fellowship - Participant Module**  
**Versi 1.0.0 - 23 Juli 2026**
