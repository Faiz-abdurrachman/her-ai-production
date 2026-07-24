---
course_id: ai-for-healthcare
title: AI for Healthcare
slug: ai-for-healthcare
category: Applied AI
sub_category: Healthcare
level: Intermediate
language: id
status: ready
version: 1.0.0
estimated_duration: 20-24 jam
route: /participant/courses/ai-for-healthcare
updated_at: 2026-07-23
---

# AI for Healthcare

> **HerAI Fellowship - Participant Module**  
> Merancang AI kesehatan yang berpusat pada keselamatan, bukti, privasi, dan kolaborasi klinis.

> **Batas penggunaan:** Modul ini bersifat edukatif. Contoh dan proyek menggunakan data sintetis, bukan untuk diagnosis, terapi, triase klinis nyata, atau menggantikan tenaga kesehatan.

## Tentang Modul

AI for Healthcare membahas data kesehatan, workflow klinis, framing, evaluasi, human factors, privacy, governance, quality management, dan monitoring. Modul menggunakan data sintetis dan tidak mengajarkan diagnosis mandiri.

Modul disusun dengan bahasa bertahap. Setiap bab berisi tujuan, konsep inti, alur kerja, contoh kasus, kesalahan umum, checkpoint, dan latihan. Peserta tidak perlu menghafal seluruh istilah. Yang lebih penting adalah memahami hubungan antarkomponen dan mampu menjelaskan alasan di balik sebuah pilihan.

## Capaian Pembelajaran

Setelah menyelesaikan modul, peserta mampu:

- menjelaskan fondasi dan istilah utama AI for Healthcare;
- menerjemahkan kebutuhan menjadi rancangan yang dapat diuji;
- membuat prototipe kecil dengan dokumentasi dan kontrol dasar;
- mengevaluasi kualitas, risiko, keterbatasan, serta biaya;
- menyampaikan hasil dan rekomendasi kepada pemangku kepentingan.

## Prasyarat

- Pengantar AI, statistika dasar, dan kesediaan mempelajari workflow klinis.
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

# Bab 1 - Ruang Lingkup, Intended Use, dan Keselamatan

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran ruang lingkup, intended use, dan keselamatan dalam AI for Healthcare;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Ruang Lingkup, Intended Use, dan Keselamatan tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI kesehatan seperti alat bantu navigasi bagi tenaga profesional: dapat memberi sinyal dan prioritas, tetapi keputusan klinis tetap membutuhkan konteks pasien, bukti, tanggung jawab, dan pengawasan manusia.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **patient** | konsep penting dalam ruang lingkup, intended use, dan keselamatan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana patient diukur, diuji, atau dikendalikan? |
| **clinician** | konsep penting dalam ruang lingkup, intended use, dan keselamatan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana clinician diukur, diuji, atau dikendalikan? |
| **intended use** | tujuan, pengguna, konteks, dan batas penggunaan yang dinyatakan | Pertanyaan yang perlu dijawab: bagaimana intended use diukur, diuji, atau dikendalikan? |
| **hazard** | konsep penting dalam ruang lingkup, intended use, dan keselamatan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana hazard diukur, diuji, atau dikendalikan? |
| **benefit** | konsep penting dalam ruang lingkup, intended use, dan keselamatan yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana benefit diukur, diuji, atau dikendalikan? |
| **human oversight** | pengawasan manusia pada keputusan atau tindakan berisiko | Pertanyaan yang perlu dijawab: bagaimana human oversight diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **patient -> clinician -> intended use -> hazard**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **patient** dapat memengaruhi **clinician**, lalu mengubah cara **intended use** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan ruang lingkup, intended use, dan keselamatan dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk patient serta clinician.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Clinical Workflow Support Prototype**, tim perlu menerapkan ruang lingkup, intended use, dan keselamatan secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **patient** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan ruang lingkup, intended use, dan keselamatan.
- Menganggap patient sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan patient dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara clinician dan intended use dalam bab ini?
3. Sebutkan satu risiko ketika ruang lingkup, intended use, dan keselamatan diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan patient, clinician, intended use, hazard. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 2 - Data Kesehatan dan Interoperabilitas

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran data kesehatan dan interoperabilitas dalam AI for Healthcare;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Data Kesehatan dan Interoperabilitas tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI kesehatan seperti alat bantu navigasi bagi tenaga profesional: dapat memberi sinyal dan prioritas, tetapi keputusan klinis tetap membutuhkan konteks pasien, bukti, tanggung jawab, dan pengawasan manusia.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **EHR** | konsep penting dalam data kesehatan dan interoperabilitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana EHR diukur, diuji, atau dikendalikan? |
| **imaging** | konsep penting dalam data kesehatan dan interoperabilitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana imaging diukur, diuji, atau dikendalikan? |
| **laboratory** | konsep penting dalam data kesehatan dan interoperabilitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana laboratory diukur, diuji, atau dikendalikan? |
| **wearable** | konsep penting dalam data kesehatan dan interoperabilitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana wearable diukur, diuji, atau dikendalikan? |
| **terminology** | konsep penting dalam data kesehatan dan interoperabilitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana terminology diukur, diuji, atau dikendalikan? |
| **FHIR** | konsep penting dalam data kesehatan dan interoperabilitas yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana FHIR diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **EHR -> imaging -> laboratory -> wearable**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **EHR** dapat memengaruhi **imaging**, lalu mengubah cara **laboratory** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan data kesehatan dan interoperabilitas dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk EHR serta imaging.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Clinical Workflow Support Prototype**, tim perlu menerapkan data kesehatan dan interoperabilitas secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **EHR** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan data kesehatan dan interoperabilitas.
- Menganggap EHR sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan EHR dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara imaging dan laboratory dalam bab ini?
3. Sebutkan satu risiko ketika data kesehatan dan interoperabilitas diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan EHR, imaging, laboratory, wearable. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 3 - Workflow Klinis dan Human-in-the-Loop

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran workflow klinis dan human-in-the-loop dalam AI for Healthcare;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Workflow Klinis dan Human-in-the-Loop tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI kesehatan seperti alat bantu navigasi bagi tenaga profesional: dapat memberi sinyal dan prioritas, tetapi keputusan klinis tetap membutuhkan konteks pasien, bukti, tanggung jawab, dan pengawasan manusia.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **workflow** | konsep penting dalam workflow klinis dan human-in-the-loop yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana workflow diukur, diuji, atau dikendalikan? |
| **handoff** | konsep penting dalam workflow klinis dan human-in-the-loop yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana handoff diukur, diuji, atau dikendalikan? |
| **alert** | konsep penting dalam workflow klinis dan human-in-the-loop yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana alert diukur, diuji, atau dikendalikan? |
| **review** | konsep penting dalam workflow klinis dan human-in-the-loop yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana review diukur, diuji, atau dikendalikan? |
| **override** | konsep penting dalam workflow klinis dan human-in-the-loop yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana override diukur, diuji, atau dikendalikan? |
| **documentation** | konsep penting dalam workflow klinis dan human-in-the-loop yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana documentation diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **workflow -> handoff -> alert -> review**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **workflow** dapat memengaruhi **handoff**, lalu mengubah cara **alert** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan workflow klinis dan human-in-the-loop dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk workflow serta handoff.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Clinical Workflow Support Prototype**, tim perlu menerapkan workflow klinis dan human-in-the-loop secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **workflow** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan workflow klinis dan human-in-the-loop.
- Menganggap workflow sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan workflow dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara handoff dan alert dalam bab ini?
3. Sebutkan satu risiko ketika workflow klinis dan human-in-the-loop diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan workflow, handoff, alert, review. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 4 - Problem Framing, Label, dan Dataset

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran problem framing, label, dan dataset dalam AI for Healthcare;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Problem Framing, Label, dan Dataset tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI kesehatan seperti alat bantu navigasi bagi tenaga profesional: dapat memberi sinyal dan prioritas, tetapi keputusan klinis tetap membutuhkan konteks pasien, bukti, tanggung jawab, dan pengawasan manusia.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **cohort** | kelompok yang berbagi titik awal atau karakteristik tertentu | Pertanyaan yang perlu dijawab: bagaimana cohort diukur, diuji, atau dikendalikan? |
| **endpoint** | konsep penting dalam problem framing, label, dan dataset yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana endpoint diukur, diuji, atau dikendalikan? |
| **label** | konsep penting dalam problem framing, label, dan dataset yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana label diukur, diuji, atau dikendalikan? |
| **leakage** | konsep penting dalam problem framing, label, dan dataset yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana leakage diukur, diuji, atau dikendalikan? |
| **missingness** | konsep penting dalam problem framing, label, dan dataset yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana missingness diukur, diuji, atau dikendalikan? |
| **representativeness** | konsep penting dalam problem framing, label, dan dataset yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana representativeness diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **cohort -> endpoint -> label -> leakage**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **cohort** dapat memengaruhi **endpoint**, lalu mengubah cara **label** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan problem framing, label, dan dataset dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk cohort serta endpoint.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Clinical Workflow Support Prototype**, tim perlu menerapkan problem framing, label, dan dataset secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **cohort** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan problem framing, label, dan dataset.
- Menganggap cohort sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan cohort dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara endpoint dan label dalam bab ini?
3. Sebutkan satu risiko ketika problem framing, label, dan dataset diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan cohort, endpoint, label, leakage. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 5 - Model untuk Data Klinis

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran model untuk data klinis dalam AI for Healthcare;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Model untuk Data Klinis tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI kesehatan seperti alat bantu navigasi bagi tenaga profesional: dapat memberi sinyal dan prioritas, tetapi keputusan klinis tetap membutuhkan konteks pasien, bukti, tanggung jawab, dan pengawasan manusia.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **risk model** | konsep penting dalam model untuk data klinis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana risk model diukur, diuji, atau dikendalikan? |
| **time series** | konsep penting dalam model untuk data klinis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana time series diukur, diuji, atau dikendalikan? |
| **NLP** | konsep penting dalam model untuk data klinis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana NLP diukur, diuji, atau dikendalikan? |
| **imaging** | konsep penting dalam model untuk data klinis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana imaging diukur, diuji, atau dikendalikan? |
| **multimodal** | konsep penting dalam model untuk data klinis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana multimodal diukur, diuji, atau dikendalikan? |
| **calibration** | kesesuaian antara skor probabilitas dan frekuensi kejadian nyata | Pertanyaan yang perlu dijawab: bagaimana calibration diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **risk model -> time series -> NLP -> imaging**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **risk model** dapat memengaruhi **time series**, lalu mengubah cara **NLP** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan model untuk data klinis dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk risk model serta time series.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Clinical Workflow Support Prototype**, tim perlu menerapkan model untuk data klinis secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **risk model** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan model untuk data klinis.
- Menganggap risk model sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan risk model dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara time series dan NLP dalam bab ini?
3. Sebutkan satu risiko ketika model untuk data klinis diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan risk model, time series, NLP, imaging. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 6 - Evaluasi Klinis dan Validasi Eksternal

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran evaluasi klinis dan validasi eksternal dalam AI for Healthcare;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Evaluasi Klinis dan Validasi Eksternal tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI kesehatan seperti alat bantu navigasi bagi tenaga profesional: dapat memberi sinyal dan prioritas, tetapi keputusan klinis tetap membutuhkan konteks pasien, bukti, tanggung jawab, dan pengawasan manusia.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **sensitivity** | konsep penting dalam evaluasi klinis dan validasi eksternal yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana sensitivity diukur, diuji, atau dikendalikan? |
| **specificity** | konsep penting dalam evaluasi klinis dan validasi eksternal yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana specificity diukur, diuji, atau dikendalikan? |
| **PPV** | konsep penting dalam evaluasi klinis dan validasi eksternal yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana PPV diukur, diuji, atau dikendalikan? |
| **calibration** | kesesuaian antara skor probabilitas dan frekuensi kejadian nyata | Pertanyaan yang perlu dijawab: bagaimana calibration diukur, diuji, atau dikendalikan? |
| **external validation** | konsep penting dalam evaluasi klinis dan validasi eksternal yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana external validation diukur, diuji, atau dikendalikan? |
| **utility** | konsep penting dalam evaluasi klinis dan validasi eksternal yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana utility diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **sensitivity -> specificity -> PPV -> calibration**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **sensitivity** dapat memengaruhi **specificity**, lalu mengubah cara **PPV** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan evaluasi klinis dan validasi eksternal dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk sensitivity serta specificity.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Clinical Workflow Support Prototype**, tim perlu menerapkan evaluasi klinis dan validasi eksternal secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **sensitivity** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan evaluasi klinis dan validasi eksternal.
- Menganggap sensitivity sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan sensitivity dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara specificity dan PPV dalam bab ini?
3. Sebutkan satu risiko ketika evaluasi klinis dan validasi eksternal diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan sensitivity, specificity, PPV, calibration. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 7 - Privasi, Security, dan De-identification

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran privasi, security, dan de-identification dalam AI for Healthcare;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Privasi, Security, dan De-identification tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI kesehatan seperti alat bantu navigasi bagi tenaga profesional: dapat memberi sinyal dan prioritas, tetapi keputusan klinis tetap membutuhkan konteks pasien, bukti, tanggung jawab, dan pengawasan manusia.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **consent** | konsep penting dalam privasi, security, dan de-identification yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana consent diukur, diuji, atau dikendalikan? |
| **minimization** | konsep penting dalam privasi, security, dan de-identification yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana minimization diukur, diuji, atau dikendalikan? |
| **de-identification** | pengurangan atau penghapusan pengenal pribadi dari data | Pertanyaan yang perlu dijawab: bagaimana de-identification diukur, diuji, atau dikendalikan? |
| **access** | konsep penting dalam privasi, security, dan de-identification yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana access diukur, diuji, atau dikendalikan? |
| **encryption** | konsep penting dalam privasi, security, dan de-identification yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana encryption diukur, diuji, atau dikendalikan? |
| **audit** | konsep penting dalam privasi, security, dan de-identification yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana audit diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **consent -> minimization -> de-identification -> access**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **consent** dapat memengaruhi **minimization**, lalu mengubah cara **de-identification** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan privasi, security, dan de-identification dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk consent serta minimization.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Clinical Workflow Support Prototype**, tim perlu menerapkan privasi, security, dan de-identification secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **consent** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan privasi, security, dan de-identification.
- Menganggap consent sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan consent dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara minimization dan de-identification dalam bab ini?
3. Sebutkan satu risiko ketika privasi, security, dan de-identification diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan consent, minimization, de-identification, access. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 8 - Human Factors dan Interface Klinis

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran human factors dan interface klinis dalam AI for Healthcare;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Human Factors dan Interface Klinis tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI kesehatan seperti alat bantu navigasi bagi tenaga profesional: dapat memberi sinyal dan prioritas, tetapi keputusan klinis tetap membutuhkan konteks pasien, bukti, tanggung jawab, dan pengawasan manusia.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **cognitive load** | konsep penting dalam human factors dan interface klinis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana cognitive load diukur, diuji, atau dikendalikan? |
| **alert fatigue** | konsep penting dalam human factors dan interface klinis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana alert fatigue diukur, diuji, atau dikendalikan? |
| **explanation** | konsep penting dalam human factors dan interface klinis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana explanation diukur, diuji, atau dikendalikan? |
| **uncertainty** | tingkat ketidakpastian yang perlu ditampilkan dan dikelola | Pertanyaan yang perlu dijawab: bagaimana uncertainty diukur, diuji, atau dikendalikan? |
| **accessibility** | kemampuan produk dipakai oleh orang dengan beragam kemampuan | Pertanyaan yang perlu dijawab: bagaimana accessibility diukur, diuji, atau dikendalikan? |
| **usability** | konsep penting dalam human factors dan interface klinis yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana usability diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **cognitive load -> alert fatigue -> explanation -> uncertainty**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **cognitive load** dapat memengaruhi **alert fatigue**, lalu mengubah cara **explanation** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan human factors dan interface klinis dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk cognitive load serta alert fatigue.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Clinical Workflow Support Prototype**, tim perlu menerapkan human factors dan interface klinis secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **cognitive load** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan human factors dan interface klinis.
- Menganggap cognitive load sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan cognitive load dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara alert fatigue dan explanation dalam bab ini?
3. Sebutkan satu risiko ketika human factors dan interface klinis diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan cognitive load, alert fatigue, explanation, uncertainty. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 9 - Governance, Regulasi, dan Quality Management

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran governance, regulasi, dan quality management dalam AI for Healthcare;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Governance, Regulasi, dan Quality Management tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI kesehatan seperti alat bantu navigasi bagi tenaga profesional: dapat memberi sinyal dan prioritas, tetapi keputusan klinis tetap membutuhkan konteks pasien, bukti, tanggung jawab, dan pengawasan manusia.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **risk class** | konsep penting dalam governance, regulasi, dan quality management yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana risk class diukur, diuji, atau dikendalikan? |
| **evidence** | konsep penting dalam governance, regulasi, dan quality management yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana evidence diukur, diuji, atau dikendalikan? |
| **change control** | konsep penting dalam governance, regulasi, dan quality management yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana change control diukur, diuji, atau dikendalikan? |
| **documentation** | konsep penting dalam governance, regulasi, dan quality management yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana documentation diukur, diuji, atau dikendalikan? |
| **accountability** | konsep penting dalam governance, regulasi, dan quality management yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana accountability diukur, diuji, atau dikendalikan? |
| **quality** | konsep penting dalam governance, regulasi, dan quality management yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana quality diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **risk class -> evidence -> change control -> documentation**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **risk class** dapat memengaruhi **evidence**, lalu mengubah cara **change control** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan governance, regulasi, dan quality management dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk risk class serta evidence.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Clinical Workflow Support Prototype**, tim perlu menerapkan governance, regulasi, dan quality management secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **risk class** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan governance, regulasi, dan quality management.
- Menganggap risk class sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan risk class dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara evidence dan change control dalam bab ini?
3. Sebutkan satu risiko ketika governance, regulasi, dan quality management diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan risk class, evidence, change control, documentation. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 10 - Post-deployment Monitoring dan Incident

## Tujuan Bab

Setelah mempelajari bab ini, peserta mampu:

- menjelaskan peran post-deployment monitoring dan incident dalam AI for Healthcare;
- membedakan istilah yang sering tercampur;
- menyusun alur kerja sederhana yang dapat diuji;
- mengenali risiko, trade-off, dan kebutuhan dokumentasi.

## Gambaran Sederhana

Post-deployment Monitoring dan Incident tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimulai dari pertanyaan: **keputusan apa yang ingin diperbaiki, bukti apa yang tersedia, dan siapa yang menanggung dampak ketika sistem salah?**

> **Analogi:** AI kesehatan seperti alat bantu navigasi bagi tenaga profesional: dapat memberi sinyal dan prioritas, tetapi keputusan klinis tetap membutuhkan konteks pasien, bukti, tanggung jawab, dan pengawasan manusia.

Pada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsistensi, keterlacakan, keamanan, biaya, kemampuan dipelihara, dan kejelasan tindakan ketika terjadi kegagalan.

## Konsep Inti

| Istilah | Penjelasan mudah | Cara memeriksa pemahaman |
|---|---|---|
| **drift** | perubahan distribusi data atau hubungan yang dipelajari model | Pertanyaan yang perlu dijawab: bagaimana drift diukur, diuji, atau dikendalikan? |
| **subgroup** | konsep penting dalam post-deployment monitoring dan incident yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana subgroup diukur, diuji, atau dikendalikan? |
| **performance** | konsep penting dalam post-deployment monitoring dan incident yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana performance diukur, diuji, atau dikendalikan? |
| **complaint** | konsep penting dalam post-deployment monitoring dan incident yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana complaint diukur, diuji, atau dikendalikan? |
| **incident** | konsep penting dalam post-deployment monitoring dan incident yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana incident diukur, diuji, atau dikendalikan? |
| **corrective action** | konsep penting dalam post-deployment monitoring dan incident yang perlu diberi definisi operasional sebelum dipakai | Pertanyaan yang perlu dijawab: bagaimana corrective action diukur, diuji, atau dikendalikan? |

### Hubungan antarkonsep

Bayangkan alur **drift -> subgroup -> performance -> complaint**. Setiap panah menyatakan asumsi. Asumsi tersebut harus ditulis dan diuji. Ketika hasil akhir salah, tim dapat menelusuri pada tahap mana asumsi tidak lagi berlaku.

Contohnya, perubahan pada **drift** dapat memengaruhi **subgroup**, lalu mengubah cara **performance** dihitung. Tanpa pengamatan dan versioning, perubahan ini mudah dianggap sebagai perilaku pengguna atau performa model, padahal sumbernya berada di proses sebelumnya.

## Langkah Kerja

1. Tentukan tujuan post-deployment monitoring dan incident dan keputusan yang akan dipengaruhi.
2. Petakan input, output, pemilik, pengguna, serta batas sistem.
3. Tetapkan definisi dan kriteria penerimaan untuk drift serta subgroup.
4. Bangun versi kecil menggunakan data atau skenario yang aman.
5. Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem.
6. Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut.

## Contoh Kasus

Dalam mini project **Clinical Workflow Support Prototype**, tim perlu menerapkan post-deployment monitoring dan incident secara bertahap. Mulailah dengan satu alur yang kecil dan dapat diamati. Catat input, transformasi atau keputusan, output, waktu proses, serta alasan ketika suatu item ditolak.

Misalnya, tim menemukan bahwa **drift** tidak konsisten. Respons yang buruk adalah langsung menambah kompleksitas. Respons yang lebih baik adalah mengisolasi sumber masalah, membuat aturan validasi, mengukur frekuensi kejadian, dan menentukan siapa yang bertanggung jawab memperbaikinya.

| Situasi | Pilihan tindakan | Trade-off |
|---|---|---|
| Data atau input belum lengkap | Tolak, minta perbaikan, atau gunakan fallback | Menjaga kualitas tetapi dapat menambah friksi |
| Hasil belum pasti | Tampilkan ketidakpastian dan minta review | Lebih aman tetapi membutuhkan waktu manusia |
| Beban meningkat | Scale, antrekan, atau pembatasan | Menjaga layanan tetapi menambah biaya atau waktu tunggu |
| Perubahan berisiko | Uji terbatas dan siapkan rollback | Rilis lebih lambat tetapi dampak kegagalan lebih kecil |

## Kesalahan Umum

- Memulai dari alat sebelum memahami tujuan post-deployment monitoring dan incident.
- Menganggap drift sudah memiliki definisi yang sama bagi semua pihak.
- Hanya menguji jalur normal dan mengabaikan kegagalan atau data yang tidak lengkap.
- Tidak menetapkan pemilik, indikator, dan prosedur ketika kualitas menurun.

## Checkpoint

1. Jelaskan drift dengan kalimat sendiri dan berikan satu contoh.
2. Apa hubungan antara subgroup dan performance dalam bab ini?
3. Sebutkan satu risiko ketika post-deployment monitoring dan incident diterapkan tanpa pengujian.

## Latihan

1. Buat diagram sederhana yang menghubungkan drift, subgroup, performance, complaint. Tandai asumsi dan titik kegagalan.
2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.
3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.

---

# Bab 11 - Mini Project: Clinical Workflow Support Prototype

## Tujuan Proyek

Merancang prototipe non-diagnostik berbasis data sintetis untuk membantu prioritisasi tugas, lengkap dengan intended use, evaluasi, human review, dan monitoring.

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
SENSITIVE_FIELDS = {"name", "phone", "email", "address", "national_id"}

def deidentify(record: dict) -> dict:
    clean = {}
    for key, value in record.items():
        if key in SENSITIVE_FIELDS:
            continue
        clean[key] = value
    clean["patient_id"] = stable_pseudonym(record["patient_id"])
    return clean

# Gunakan hanya data sintetis untuk latihan modul.
# Hasil model bukan diagnosis atau rekomendasi medis.
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

1. Ketika memulai **Ruang Lingkup, Intended Use, dan Keselamatan**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji patient
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

2. Ketika memulai **Data Kesehatan dan Interoperabilitas**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji EHR
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

3. Ketika memulai **Workflow Klinis dan Human-in-the-Loop**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mendefinisikan tujuan, konteks, dan cara menguji workflow
D. Mengukur keberhasilan hanya dari jumlah fitur

4. Ketika memulai **Problem Framing, Label, dan Dataset**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mengukur keberhasilan hanya dari jumlah fitur
D. Mendefinisikan tujuan, konteks, dan cara menguji cohort

5. Ketika memulai **Model untuk Data Klinis**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji risk model
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

6. Ketika memulai **Evaluasi Klinis dan Validasi Eksternal**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji sensitivity
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

7. Ketika memulai **Privasi, Security, dan De-identification**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mendefinisikan tujuan, konteks, dan cara menguji consent
D. Mengukur keberhasilan hanya dari jumlah fitur

8. Ketika memulai **Human Factors dan Interface Klinis**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Menghapus seluruh review agar proses lebih cepat
C. Mengukur keberhasilan hanya dari jumlah fitur
D. Mendefinisikan tujuan, konteks, dan cara menguji cognitive load

9. Ketika memulai **Governance, Regulasi, dan Quality Management**, tindakan yang paling tepat adalah ...

A. Mendefinisikan tujuan, konteks, dan cara menguji risk class
B. Memilih alat paling baru tanpa memeriksa kebutuhan
C. Menghapus seluruh review agar proses lebih cepat
D. Mengukur keberhasilan hanya dari jumlah fitur

10. Ketika memulai **Post-deployment Monitoring dan Incident**, tindakan yang paling tepat adalah ...

A. Memilih alat paling baru tanpa memeriksa kebutuhan
B. Mendefinisikan tujuan, konteks, dan cara menguji drift
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
| 1 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional patient, kemudian alat dipilih sesuai kebutuhan. |
| 2 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional EHR, kemudian alat dipilih sesuai kebutuhan. |
| 3 | **C** | Pendekatan dimulai dari tujuan dan definisi operasional workflow, kemudian alat dipilih sesuai kebutuhan. |
| 4 | **D** | Pendekatan dimulai dari tujuan dan definisi operasional cohort, kemudian alat dipilih sesuai kebutuhan. |
| 5 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional risk model, kemudian alat dipilih sesuai kebutuhan. |
| 6 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional sensitivity, kemudian alat dipilih sesuai kebutuhan. |
| 7 | **C** | Pendekatan dimulai dari tujuan dan definisi operasional consent, kemudian alat dipilih sesuai kebutuhan. |
| 8 | **D** | Pendekatan dimulai dari tujuan dan definisi operasional cognitive load, kemudian alat dipilih sesuai kebutuhan. |
| 9 | **A** | Pendekatan dimulai dari tujuan dan definisi operasional risk class, kemudian alat dipilih sesuai kebutuhan. |
| 10 | **B** | Pendekatan dimulai dari tujuan dan definisi operasional drift, kemudian alat dipilih sesuai kebutuhan. |
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

1. Bagian mana dari AI for Healthcare yang paling mudah diremehkan tetapi berpotensi menimbulkan kegagalan besar?
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
| **patient** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **clinician** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **intended use** | tujuan, pengguna, konteks, dan batas penggunaan yang dinyatakan. |
| **hazard** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **benefit** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **human oversight** | pengawasan manusia pada keputusan atau tindakan berisiko. |
| **EHR** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **imaging** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **laboratory** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **wearable** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **terminology** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **FHIR** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **workflow** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **handoff** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **alert** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **review** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **override** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **documentation** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **cohort** | kelompok yang berbagi titik awal atau karakteristik tertentu. |
| **endpoint** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **label** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **leakage** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **missingness** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **representativeness** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **risk model** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **time series** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **NLP** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **multimodal** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **calibration** | kesesuaian antara skor probabilitas dan frekuensi kejadian nyata. |
| **sensitivity** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **specificity** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **PPV** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **external validation** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **utility** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **consent** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **minimization** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **de-identification** | pengurangan atau penghapusan pengenal pribadi dari data. |
| **access** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **encryption** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **audit** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **cognitive load** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **alert fatigue** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **explanation** | konsep penting dalam ai for healthcare yang perlu diberi definisi operasional sebelum dipakai. |
| **uncertainty** | tingkat ketidakpastian yang perlu ditampilkan dan dikelola. |
| **accessibility** | kemampuan produk dipakai oleh orang dengan beragam kemampuan. |

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

- WHO Ethics and Governance of Artificial Intelligence for Health.
- Good Machine Learning Practice - guiding principles.
- CONSORT-AI Extension.
- SPIRIT-AI Extension.
- HL7 FHIR Documentation.

## Penutup

Kemampuan dalam AI for Healthcare tidak hanya ditunjukkan oleh banyaknya alat yang dikuasai. Kemampuan terlihat dari cara peserta merumuskan masalah, memilih pendekatan yang proporsional, menguji klaim, melindungi pengguna, dan menjaga sistem tetap dapat dipertanggungjawabkan.

---

**HerAI Fellowship - Participant Module**  
**Versi 1.0.0 - 23 Juli 2026**
