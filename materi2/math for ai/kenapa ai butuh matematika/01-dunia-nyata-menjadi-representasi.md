# Topic 01 — Dunia Nyata Menjadi Representasi Komputasional

> **Submodul 01 — Kenapa AI Butuh Matematika? + Mathematical Readiness**  
> **Filename:** `01-dunia-nyata-menjadi-representasi.md`  
> **Level:** Beginner  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Estimasi belajar:** 35–50 menit membaca + 15–25 menit eksplorasi/praktik  
> **Forward dependency:** Topic 02 — Data, Observation, Feature, dan Target

---

## 1. Mengapa topik ini ada?

Ketika manusia melihat seorang peserta belajar, kita dapat memahami banyak hal sekaligus.

Kita dapat melihat ekspresi wajahnya, mendengar pertanyaannya, mengetahui pengalaman sebelumnya, memahami konteks sosialnya, dan menilai apakah ia sedang kesulitan atau hanya membutuhkan waktu lebih lama.

Sistem komputer tidak menerima seluruh pengalaman tersebut secara otomatis.

Agar informasi dapat diproses, sebagian keadaan dunia nyata harus **direkam, disusun, dan direpresentasikan** dalam bentuk yang dapat digunakan oleh sistem komputasi.

Di sinilah perjalanan Math for AI dimulai.

Sebelum berbicara tentang vektor, matriks, probabilitas, gradient, atau optimization, kita perlu menjawab pertanyaan yang lebih mendasar:

> **Apa sebenarnya yang masuk ke dalam sistem AI?**

Jawabannya bukan “dunia nyata secara utuh”.

Yang masuk adalah **representasi dari dunia nyata**.

Representasi ini dapat berupa angka, kategori, teks yang sudah diproses, gambar dalam bentuk nilai piksel, audio yang telah didigitalkan, atau bentuk terstruktur lain yang sesuai dengan sistem.

Pilihan representasi sangat penting. Dalam machine learning, data yang masuk ke model sering kali bukan raw data persis seperti awalnya, tetapi nilai yang telah dipilih atau ditransformasikan agar dapat digunakan model. Google Machine Learning Crash Course menempatkan proses ini sebagai bagian penting dari feature engineering dan menjelaskan bahwa model menerima representasi numerik melalui feature vectors, bukan “realitas mentah” secara langsung. [R1][R2]

---

# 2. Tujuan Topik

Setelah menyelesaikan topik ini, kamu diharapkan mampu:

1. membedakan **objek atau kejadian dunia nyata** dengan **data yang direkam tentang objek atau kejadian tersebut**;
2. menjelaskan dengan bahasa sendiri apa yang dimaksud dengan **representasi komputasional**;
3. mengidentifikasi informasi apa yang dipertahankan dan apa yang hilang ketika suatu keadaan dunia nyata direpresentasikan sebagai data;
4. menjelaskan mengapa “mengubah sesuatu menjadi angka” tidak otomatis membuat representasinya bermakna;
5. membedakan data yang benar-benar bersifat numerik dari kategori yang kebetulan diberi nomor;
6. menjelaskan secara konseptual bagaimana kualitas representasi memengaruhi pola yang dapat dipelajari sistem AI;
7. membaca satu record sederhana peserta HerAI dan menjelaskan apa yang dapat serta tidak dapat diketahui dari record tersebut.

---

# 3. Pertanyaan Pemantik

Bayangkan kamu adalah mentor HerAI.

Kamu bertemu langsung dengan peserta bernama **Alya** selama satu jam.

Dari interaksi itu kamu mungkin mengetahui:

- Alya sangat tertarik pada AI;
- kemampuan Python-nya masih dasar;
- beberapa konsep matematika terasa asing baginya;
- ia sudah menyelesaikan sebagian besar lesson;
- ia memperoleh nilai quiz cukup tinggi;
- ia belajar sekitar 45 menit;
- ia mengatakan bahwa ia lebih suka contoh konkret daripada teori abstrak.

Sekarang bayangkan sistem HerAI hanya menerima data berikut:

| Field | Nilai |
|---|---|
| Participant | Alya |
| AI Interest | High |
| Python Readiness | Basic |
| Math Readiness | Medium |
| Quiz Score | 8/10 |
| Completion | 6/8 |
| Study Duration | 45 min |

Pertanyaannya:

> **Apakah tabel tersebut sama dengan Alya?**

Tidak.

Tabel itu adalah **representasi data tentang sebagian keadaan Alya pada konteks tertentu**.

Alya yang sebenarnya jauh lebih kompleks daripada tujuh baris informasi tersebut.

---

# 4. Predict Before Formalization

Sebelum membaca definisi formal, pilih jawaban yang menurutmu paling masuk akal.

### Prediksi A

Jika HerAI hanya menyimpan:

`Quiz Score = 8/10`

apakah sistem memiliki informasi yang sama banyaknya dengan ketika sistem menyimpan:

- Quiz Score;
- Completion;
- Study Duration;
- AI Interest;
- Python Readiness;
- Math Readiness?

**A.** Ya, karena satu nilai yang bagus sudah cukup.  
**B.** Tidak, karena representasi pertama mempertahankan lebih sedikit informasi.  
**C.** Ya, selama angka quiz lebih besar dari 0.  
**D.** Tidak bisa dibandingkan karena semua data harus berbentuk teks.

Simpan pilihanmu.

### Prediksi B

Misalkan kita menulis:

- Basic = 1
- Medium = 2
- High = 3

Apakah itu otomatis berarti jarak antara Basic → Medium sama dengan jarak Medium → High?

**A.** Ya, karena selisih angkanya sama-sama 1.  
**B.** Tidak otomatis; arti jarak tersebut bergantung pada definisi kategori.  
**C.** Ya, karena semua model AI memahami angka dengan cara yang sama.  
**D.** Tidak, karena kategori tidak pernah boleh direpresentasikan dengan angka.

Simpan jawabanmu. Kita akan kembali ke dua prediksi ini nanti.

---

# 5. Intuisi — Peta Bukan Wilayahnya

Salah satu cara sederhana memahami representasi adalah membayangkan **peta**.

Peta Yogyakarta bukan Yogyakarta itu sendiri.

Peta mempertahankan informasi tertentu, misalnya:

- posisi jalan;
- jarak relatif;
- lokasi bangunan;
- nama tempat.

Tetapi peta dapat membuang banyak detail, misalnya:

- suara kendaraan;
- suhu udara saat ini;
- aroma makanan;
- jumlah orang di setiap trotoar;
- kondisi emosional orang yang sedang berada di sana.

Meski tidak lengkap, peta tetap berguna karena mempertahankan informasi yang relevan untuk tujuan tertentu.

Representasi data bekerja dengan prinsip yang mirip.

> **Representasi bukan salinan sempurna dari dunia nyata. Representasi adalah cara menyimpan aspek tertentu dari dunia nyata agar dapat digunakan untuk tujuan tertentu.**

Dalam AI, tujuan tersebut dapat berbeda-beda:

- memprediksi;
- mengklasifikasi;
- mencari kemiripan;
- memberi rekomendasi;
- mendeteksi pola;
- menghasilkan teks atau gambar;
- membantu pengambilan keputusan.

Karena tujuan berbeda, representasi yang berguna juga dapat berbeda.

---

# 6. Dari Dunia Nyata ke Data

Perhatikan alur konseptual berikut:

**Dunia nyata → pengamatan → data yang direkam → representasi yang digunakan sistem**

Contoh sederhana:

**Dunia nyata**

Alya mengerjakan 10 pertanyaan quiz.

**Yang diamati**

Alya menjawab 8 pertanyaan dengan benar.

**Yang direkam**

`Quiz Score = 8/10`

**Representasi yang nantinya dapat digunakan**

Nilai tersebut dapat dipertahankan sebagai rasio `8/10`, lalu pada topic berikutnya kita akan belajar cara membaca bentuk itu sebagai kuantitas numerik.

Poin pentingnya:

> Sistem tidak “melihat Alya mengerjakan quiz” seperti manusia yang hadir di ruangan. Sistem menggunakan data yang berhasil direkam tentang aktivitas tersebut.

---

# 7. Definisi Formal Beginner-Friendly

## 7.1 Dunia nyata

**Dunia nyata** adalah objek, orang, aktivitas, kejadian, atau keadaan yang sedang kita coba pahami atau bantu melalui sistem.

Dalam running case kita:

> Alya sebagai peserta HerAI adalah bagian dari dunia nyata.

## 7.2 Data yang direkam

**Data yang direkam** adalah informasi yang dikumpulkan tentang dunia nyata.

Contohnya:

- nilai quiz;
- durasi belajar;
- lesson yang sudah selesai;
- kategori minat;
- respons terhadap latihan.

Data bukan orang atau kejadian itu sendiri.

Data adalah **catatan tentang sebagian aspek dari orang atau kejadian tersebut**.

## 7.3 Representasi

Dalam konteks topik ini, **representasi** adalah bentuk yang digunakan sistem untuk menyimpan atau memproses informasi tentang sesuatu.

Representasi dapat berupa:

- angka;
- kategori;
- string/text;
- nilai biner;
- array;
- piksel;
- token;
- atau struktur data lain.

Dalam machine learning, representasi sering perlu diubah menjadi bentuk numerik yang dapat diterima model. Google ML Crash Course menjelaskan bahwa model mengonsumsi nilai floating-point dalam feature vectors dan bahwa raw values sering ditransformasikan melalui feature engineering sebelum dipakai oleh model. [R1]

Namun ada perbedaan besar antara:

> **“sudah berbentuk angka”**

dan:

> **“sudah menjadi representasi numerik yang bermakna.”**

Itulah salah satu ide terpenting dalam topik ini.

---

# 8. Angka Tidak Selalu Berarti Kuantitas

Lihat tiga data berikut:

1. `Study Duration = 45`
2. `Quiz Correct = 8`
3. `Postal Code = 55281`

Ketiganya terlihat seperti angka.

Tetapi apakah semuanya harus diperlakukan sebagai kuantitas matematis dengan cara yang sama?

Tidak.

`45` menit mempunyai makna kuantitatif. Misalnya 60 menit memang lebih lama daripada 30 menit.

`8` jawaban benar juga mempunyai makna sebagai jumlah.

Namun kode pos `55281` pada dasarnya berfungsi sebagai identifier/kategori wilayah. Angka kode pos yang dua kali lebih besar tidak berarti wilayah tersebut “dua kali lebih banyak” atau “dua kali lebih jauh”. Google ML Crash Course menggunakan kode pos sebagai contoh bahwa data yang ditulis dengan digit belum tentu merupakan numerical feature; ia dapat tetap bersifat kategorikal. [R2][R3]

Jadi:

> **Bentuk tulisan sebuah data tidak menentukan makna matematisnya.**

Yang menentukan adalah **semantics**: apa yang sebenarnya direpresentasikan nilai itu.

---

# 9. Worked Example 1 — Apakah Semua Angka Bisa Dibandingkan?

Kita punya:

- Quiz Correct = 8
- Completion Unit = 6
- Study Duration = 45 menit

Seseorang berkata:

> “45 paling besar, jadi Study Duration pasti paling penting.”

Masalahnya bukan pada perhitungan.

Masalahnya adalah **ketiga angka tersebut mengukur hal yang berbeda**.

`8` adalah jumlah jawaban benar.

`6` adalah jumlah unit yang selesai.

`45` adalah durasi dalam menit.

Membandingkan:

$$
45 > 8 > 6
$$

secara aritmetika memang benar.

Tetapi interpretasi:

> “Study Duration paling baik karena 45 paling besar”

tidak sah.

Mengapa?

Karena skala, unit, dan makna ketiganya berbeda.

Inilah alasan mengapa sebelum melakukan matematika terhadap data, kita perlu bertanya:

1. angka ini mewakili apa?
2. unitnya apa?
3. rentangnya apa?
4. apakah operasi matematika terhadap angka tersebut memang bermakna?

---

# 10. Representation Is a Design Choice

Bayangkan HerAI ingin menyimpan status kemampuan Python Alya.

Kita memiliki kategori:

- Basic
- Intermediate
- Advanced

Ada banyak kemungkinan representasi.

### Representasi A — Teks

`Python Readiness = Basic`

Ini mudah dibaca manusia.

### Representasi B — Index

`Basic = 0`

`Intermediate = 1`

`Advanced = 2`

Sekarang semua kategori memiliki nomor.

Tetapi kita harus berhati-hati.

Nomor tersebut bisa saja hanya **index/label**.

Jika suatu model memperlakukan nilai `2` sebagai benar-benar dua kali nilai `1`, kita telah memasukkan asumsi matematis yang mungkin tidak kita inginkan.

Google ML Crash Course memperingatkan bahwa indexed categorical values yang dibiarkan sebagai angka kontinu dapat membuat model memperlakukan hubungan numerik antar-index seolah bermakna. Untuk banyak kategori, representasi seperti one-hot encoding dapat digunakan agar kategori dipisahkan tanpa mengasumsikan urutan numerik kontinu. [R3][R4]

Topik ini **belum** mengajarkan one-hot encoding secara formal.

Yang perlu kamu pahami sekarang hanya:

> **Memberi nomor pada kategori bukan berarti nomor tersebut otomatis memiliki jarak, rasio, atau operasi matematika yang bermakna.**

---

# 11. Worked Example 2 — Kesalahan Encoding yang Terlihat Masuk Akal

Misalkan seseorang membuat:

| Math Readiness | Code |
|---|---:|
| Basic | 1 |
| Medium | 2 |
| High | 3 |

Kemudian ia menyimpulkan:

$$
3 - 2 = 2 - 1 = 1
$$

lalu mengatakan:

> “Berarti peningkatan Basic → Medium pasti sama besar dengan peningkatan Medium → High.”

Perhitungan selisihnya benar.

Tetapi kesimpulan tentang dunia nyata belum tentu benar.

Angka `1`, `2`, dan `3` mungkin hanya dipakai untuk **menandai urutan**.

Belum ada bukti bahwa jarak kemampuan antara Basic dan Medium benar-benar sama dengan jarak Medium dan High.

Jadi kita perlu memisahkan:

### Kebenaran simbolik

$$
3 - 2 = 1
$$

dan:

$$
2 - 1 = 1
$$

dengan:

### Kebenaran semantik

> Apakah selisih satu unit benar-benar merepresentasikan perubahan kemampuan yang sama?

Pertanyaan kedua membutuhkan definisi skala yang jelas.

Ini adalah contoh bagaimana matematika dapat menghasilkan perhitungan yang benar tetapi interpretasi yang salah jika representasinya tidak dipahami.

---

# 12. Math Reading Skill — Membaca Data sebagai Pernyataan

Math for AI bukan hanya kemampuan menghitung.

Kamu juga perlu mampu **membaca representasi menjadi makna**.

Perhatikan:

`Study Duration = 45 min`

Bacaan yang tepat:

> Alya tercatat belajar selama 45 menit pada konteks pengukuran yang digunakan sistem.

Bukan:

> Nilai Alya adalah 45.

Karena kita kehilangan informasi tentang **apa yang diukur**.

Sekarang:

`Quiz Score = 8/10`

Bacaan yang tepat:

> Alya memperoleh 8 dari total 10 poin atau pertanyaan yang digunakan pada quiz tersebut.

Kita belum perlu mengubahnya menjadi persentase pada topik ini. Itu akan menjadi fokus Topic 03.

## Latihan dua arah

### Bahasa manusia → representasi

Kalimat:

> Alya belajar selama 45 menit.

Representasi sederhana:

`study_duration_min = 45`

Di sini angka `45` diberi konteks melalui nama field dan unit.

### Representasi → bahasa manusia

`completion = 6/8`

Bacaan:

> Alya telah menyelesaikan 6 dari total 8 unit yang menjadi acuan completion.

Bukan:

> Alya memiliki nilai 6.

Semakin baik kemampuan membaca representasi, semakin kecil risiko salah menginterpretasikan hasil AI.

---

# 13. Persistent HerAI Running Case — Alya

Mulai sekarang kita akan membawa **satu kasus yang sama** sepanjang Math for AI.

Tujuannya agar setiap cabang matematika tidak terasa seperti topik yang berdiri sendiri.

## 13.1 Decision problem

HerAI ingin membantu menentukan:

> **Materi apa yang masuk akal untuk direkomendasikan sebagai next learning material bagi Alya?**

Topik ini belum membuat algoritma rekomendasi.

Kita baru mendefinisikan **informasi apa yang tersedia**.

## 13.2 Raw learning record

| Field | Value |
|---|---|
| Participant | Alya |
| AI Interest | High |
| Python Readiness | Basic |
| Math Readiness | Medium |
| Quiz Score | 8/10 |
| Completion | 6/8 |
| Study Duration | 45 min |

Record ini akan dipertahankan sebagai running dataset dasar.

## 13.3 Apa yang belum kita tahu?

Walaupun record terlihat cukup informatif, kita belum mengetahui:

- seberapa akurat kategori readiness tersebut;
- bagaimana kategori ditentukan;
- kapan data dicatat;
- apakah 45 menit terjadi dalam satu sesi atau beberapa sesi;
- apakah quiz memiliki tingkat kesulitan yang sama dengan quiz lain;
- materi apa saja yang menjadi kandidat rekomendasi;
- apakah tujuan rekomendasi adalah engagement, completion, mastery, atau tujuan lain.

Poinnya:

> **Dataset tidak hanya berisi nilai. Dataset juga memiliki konteks, definisi, dan asumsi.**

---

# 14. Change One Thing — Apa yang Hilang?

Mari ubah satu bagian representasi.

### Versi A

`Quiz Score = 8/10`

### Versi B

`Quiz Result = Pass`

Versi B lebih sederhana.

Tetapi apa yang hilang?

Pada Versi A, kita mengetahui berapa poin yang diperoleh dan total acuan.

Pada Versi B, kita hanya mengetahui bahwa hasil melewati suatu threshold yang disebut “Pass”.

Jika nanti kita ingin membandingkan dua peserta yang sama-sama lulus tetapi memperoleh `6/10` dan `10/10`, representasi `Pass` tidak lagi menyimpan perbedaannya.

Jadi penyederhanaan dapat:

- mengurangi kompleksitas;
- mempermudah sistem;
- tetapi juga membuang informasi.

Tidak selalu ada representasi yang “paling benar” untuk semua tujuan.

Representasi yang berguna bergantung pada **pertanyaan yang ingin dijawab**.

Deep learning literature menekankan bahwa suatu information-processing task dapat menjadi lebih mudah atau lebih sulit bergantung pada bagaimana informasi direpresentasikan. [R5]

---

# 15. AI/ML Connection — Mengapa Representasi Sangat Penting?

Pada banyak sistem machine learning, model bekerja terhadap feature representation, bukan terhadap real-world object secara langsung.

Google ML Crash Course menjelaskan bahwa raw dataset values dapat dipilih, diproses, dinormalisasi, dibinning, atau dikodekan sebelum akhirnya masuk ke feature vector. [R1][R6]

Untuk categorical data, string seperti nama kategori umumnya perlu dikonversi ke representasi numerik sebelum dapat digunakan oleh banyak model. One-hot encoding adalah salah satu teknik standar untuk melakukan hal tersebut. [R3][R4]

Tetapi topik ini tidak meminta kamu menghafalkan teknik encoding.

Fokusnya adalah prinsip yang lebih fundamental:

> **Apa yang dapat dipelajari model bergantung pada informasi dan struktur yang tersedia pada representasi inputnya.**

Kalau suatu informasi penting tidak pernah direkam, model tidak dapat “mengambilnya dari udara”.

Kalau suatu kategori diberi angka dengan semantics yang salah, model dapat menerima hubungan numerik yang tidak kita maksudkan.

Kalau kita membuang terlalu banyak detail, beberapa pola mungkin tidak lagi terlihat.

Kalau kita menyimpan terlalu banyak data tanpa tujuan atau kualitas yang baik, representasi juga belum tentu berguna.

---

# 16. Misconception Challenge

## Challenge 1 — “AI hanya membaca angka”

Seorang peserta mengatakan:

> “Berarti semua data cukup diganti angka. Kalau sudah angka, AI pasti bisa memahaminya.”

Apakah benar?

**Tidak.**

Machine learning memang sering membutuhkan representasi numerik untuk model tertentu, tetapi **angka tersebut harus memiliki representational meaning yang sesuai**.

Memberi:

- merah = 1
- hijau = 2
- biru = 3

tidak otomatis berarti biru “tiga kali lebih banyak” daripada merah.

Encoding dan representasi harus mempertimbangkan semantics dari data. [R2][R3]

## Challenge 2 — “Lebih banyak data selalu berarti lebih baik”

Misalnya HerAI menambahkan field:

- warna favorit;
- merek laptop;
- makanan favorit;
- ukuran sepatu.

Apakah recommendation otomatis menjadi lebih baik?

Tidak otomatis.

Pertanyaan utamanya:

> Apakah informasi tersebut relevan dan berkualitas untuk decision problem yang sedang dibangun?

Lebih banyak kolom tidak sama dengan representasi yang lebih baik.

## Challenge 3 — “Record peserta = peserta”

HerAI memiliki 20 field tentang Alya.

Apakah sistem sekarang “mengetahui Alya sepenuhnya”?

Tidak.

Record tetap merupakan representasi terbatas dari sebagian informasi yang berhasil direkam.

---

# 17. Try It Yourself

## Practice A — Data atau real thing?

Kelompokkan:

1. Alya sebagai manusia.
2. `Study Duration = 45 min`.
3. Aktivitas Alya belajar di kamar.
4. `Quiz Score = 8/10`.
5. Perasaan bingung yang tidak pernah direkam sistem.

**Pertanyaan:**

Mana yang merupakan real-world state/event dan mana yang merupakan recorded data?

### Expected reasoning

`2` dan `4` adalah data yang direkam.

`1`, `3`, dan `5` merupakan bagian dari dunia nyata.

Nomor `5` juga menunjukkan bahwa sesuatu dapat nyata tetapi **tidak muncul dalam dataset**.

## Practice B — Apakah nomor ini kuantitas?

Tentukan apakah operasi seperti “dua kali lebih besar” masuk akal.

### A

`study_duration = 60 min` dibanding `30 min`

Di sini:

$$
60 = 2 \times 30
$$

dan interpretasi “60 menit dua kali durasi 30 menit” masuk akal.

### B

`postal_code = 60000` dibanding `30000`

Walaupun:

$$
60000 = 2 \times 30000
$$

tidak berarti wilayah kode pos 60000 “dua kali” wilayah kode pos 30000.

## Practice C — Representasi mana yang menyimpan lebih banyak informasi?

### Representasi 1

`Quiz Result = Pass`

### Representasi 2

`Quiz Score = 8/10`

Untuk banyak analisis, representasi kedua mempertahankan informasi yang lebih rinci.

Tetapi jika sistem hanya membutuhkan status kelulusan dan aturan threshold sudah jelas, representasi pertama mungkin sudah cukup untuk tugas tertentu.

Jelaskan trade-off tersebut dengan satu paragraf.

---

# 18. Visual & Interactive Specification untuk Web

## [STEP-BY-STEP REVEAL] Real World → Representation

**Learning purpose:** membedakan objek nyata dengan catatan data.

**Initial state:** tampilkan ilustrasi peserta “Alya” dan kartu kosong.

**Learner action:** klik tombol `Lihat apa yang direkam sistem`.

**Expected behavior:** munculkan bertahap:

1. `AI Interest = High`
2. `Python Readiness = Basic`
3. `Math Readiness = Medium`
4. `Quiz Score = 8/10`
5. `Completion = 6/8`
6. `Study Duration = 45 min`

Terakhir tampilkan pesan:

> “Ini adalah representasi data tentang Alya, bukan Alya secara keseluruhan.”

## [COMPARE VIEW] Rich vs Compressed Representation

**Learning purpose:** menunjukkan information loss akibat compression.

**Left card:** `Quiz Score = 8/10`

**Right card:** `Quiz Result = Pass`

**Learner action:** klik pertanyaan:

- “Berapa jawaban benar?”
- “Apakah peserta lulus?”
- “Bisakah membedakan 6/10 dan 10/10 jika keduanya Pass?”

**Expected behavior:** UI menandai pertanyaan mana yang masih bisa dijawab pada tiap representation.

## [INTERACTIVE VISUAL] Does This Number Behave Like a Number?

**Initial cards:**

- `45 minutes`
- `8 correct answers`
- `55281 postal code`
- `Basic = 1`
- `Medium = 2`
- `High = 3`

**Learner action:** drag ke:

- `Quantitative`
- `Categorical / label`
- `Needs context`

**Expected feedback:** postal code harus diperlakukan sebagai kategori/identifier, bukan quantity. Untuk readiness codes, tampilkan feedback bahwa urutan mungkin disengaja, tetapi equal spacing tidak boleh diasumsikan tanpa definisi skala.

## [COMPARE VIEW] Encoding Trap

**Learning purpose:** memahami bahwa numeric coding dapat membawa asumsi.

**Initial state:**

`Red = 1`  
`Green = 2`  
`Blue = 3`

Tampilkan:

$$
3 - 1 = 2
$$

Lalu tanyakan:

> “Apakah biru dua unit lebih jauh dari merah secara warna?”

**Expected behavior:** jawabannya tidak dapat disimpulkan hanya dari index coding.

---

# 19. Checkpoint

### Checkpoint 1

Apakah dataset tentang seseorang sama dengan orang tersebut?

**Jawaban:** Tidak. Dataset adalah representasi terbatas dari informasi yang direkam tentang orang tersebut.

### Checkpoint 2

Apakah semua data yang ditulis menggunakan digit otomatis merupakan numerical data?

**Jawaban:** Tidak. Identifier seperti kode pos dapat ditulis sebagai digit tetapi bersifat kategorikal. [R2]

### Checkpoint 3

Jika kategori:

`Basic = 1`, `Medium = 2`, `High = 3`

apakah kita otomatis boleh mengatakan High tiga kali Basic?

**Jawaban:** Tidak.

### Checkpoint 4

Mengapa `Quiz Score = 8/10` dan `Quiz Result = Pass` bukan representasi identik?

**Jawaban:** Keduanya dapat berasal dari kejadian yang sama, tetapi representasi `Pass` membuang informasi tentang skor detail.

### Checkpoint 5

Apa pertanyaan pertama sebelum melakukan operasi matematika terhadap sebuah field?

Salah satu jawaban yang baik:

> “Nilai ini sebenarnya merepresentasikan apa?”

---

# 20. Mastery Check

Sebelum melanjutkan, pastikan kamu dapat mengatakan:

- [ ] **I can** membedakan dunia nyata dengan data tentang dunia nyata.
- [ ] **I can** menjelaskan arti representasi komputasional.
- [ ] **I can** menjelaskan mengapa representasi selalu memilih sebagian informasi.
- [ ] **I can** menemukan informasi yang hilang ketika sebuah record disederhanakan.
- [ ] **I can** menjelaskan mengapa angka tidak selalu merupakan quantity.
- [ ] **I can** menjelaskan mengapa memberi nomor pada kategori tidak otomatis membuat jarak numeriknya bermakna.
- [ ] **I can** membaca satu field data bersama nama dan unitnya.
- [ ] **I can** menjelaskan hubungan representation choice dengan apa yang dapat dipelajari sistem AI.
- [ ] **I can** menjelaskan apa yang sudah dan belum diketahui HerAI tentang Alya dari record yang tersedia.

Jika lebih dari dua kotak belum terasa yakin, ulangi bagian **Worked Example**, **Misconception Challenge**, dan **Try It Yourself** sebelum melanjutkan.

---

# 21. Why This Matters Later

Topik ini sengaja belum mengajarkan:

- vector;
- matrix;
- mean;
- probability;
- derivative;
- gradient;
- optimization.

Tetapi seluruh konsep tersebut akan bekerja terhadap **representasi**.

Perjalanan berikutnya:

**Topic 01** — Apa yang kita representasikan?  
↓  
**Topic 02** — Dalam dataset, mana observation, feature, dan target?  
↓  
**Topic 03** — Bagaimana membaca rasio, decimal, dan percentage?  
↓  
**Submodule 02 — Linear Algebra** — Bagaimana beberapa nilai disusun dan diproses sebagai vektor serta matriks?  
↓  
**Submodule 03 — Statistics** — Bagaimana membaca pola dari sekumpulan observation?  
↓  
**Submodule 04 — Probability** — Bagaimana menyatakan uncertainty?  
↓  
**Submodule 05–06** — Bagaimana perubahan dan optimization bekerja terhadap mathematical representation model?

---

# 22. Summary

Hal utama dari topik ini bukan:

> “AI bekerja dengan angka.”

Kalimat itu terlalu sederhana jika berdiri sendiri.

Pemahaman yang lebih tepat adalah:

> **Sistem AI bekerja dengan representasi komputasional dari data. Pada banyak model machine learning, representasi yang digunakan pada akhirnya harus menjadi nilai numerik yang dapat diproses model, tetapi cara kita memilih dan mengubah data menjadi representasi tersebut membawa makna serta asumsi.** [R1][R3]

Kita juga belajar bahwa:

1. real-world object berbeda dari data tentang object tersebut;
2. dataset hanya menangkap sebagian informasi;
3. digit tidak otomatis berarti numerical quantity;
4. category index tidak otomatis memiliki jarak matematis yang bermakna;
5. penyederhanaan dapat membantu, tetapi juga dapat membuang signal;
6. representation choice menentukan informasi apa yang tersedia bagi sistem.

Running case HerAI sekarang sudah memiliki fondasi:

| Field | Nilai |
|---|---|
| Participant | Alya |
| AI Interest | High |
| Python Readiness | Basic |
| Math Readiness | Medium |
| Quiz Score | 8/10 |
| Completion | 6/8 |
| Study Duration | 45 min |

Kita belum menghitung recommendation score.

Kita belum membuat probability.

Kita belum membuat vector.

Kita baru melakukan langkah yang harus datang lebih dulu:

> **memastikan kita mengerti apa yang direpresentasikan oleh data.**

---

# 23. Bridge ke Topic 02

Sekarang kita punya record Alya, tetapi jika kita ingin membuat dataset berisi Alya, Bima, Citra, Dewi, dan ratusan peserta lain, kita membutuhkan bahasa yang lebih rapi untuk membicarakan struktur data tersebut.

Kita perlu tahu:

> Apa itu satu **observation**?

> Apa yang disebut **feature**?

> Kapan sebuah nilai menjadi **target**?

> Apakah semua kolom layak diberikan kepada model?

Itulah fokus **Topic 02 — Data, Observation, Feature, dan Target**.

---

# 24. References

## [R1] Google for Developers — Machine Learning Crash Course: How a model ingests data using feature vectors
Mendukung: model menggunakan feature vectors, raw values dapat ditransformasikan, feature engineering sebagai proses representasi data untuk model.

https://developers.google.com/machine-learning/crash-course/numerical-data/feature-vectors

## [R2] Google for Developers — Machine Learning Crash Course: Working with numerical data
Mendukung: pembedaan numerical vs categorical data; contoh postal code sebagai angka yang tidak berperilaku sebagai quantity.

https://developers.google.com/machine-learning/crash-course/numerical-data

## [R3] Google for Developers — Machine Learning Crash Course: Working with categorical data / one-hot encoding
Mendukung: categorical strings perlu direpresentasikan numerically untuk model; indexed integers dapat menciptakan numeric relationship yang tidak dimaksudkan.

https://developers.google.com/machine-learning/crash-course/categorical-data

https://developers.google.com/machine-learning/crash-course/categorical-data/one-hot-encoding

## [R4] scikit-learn — OneHotEncoder
Mendukung: categorical/discrete values dapat diencode sebagai one-hot numeric arrays untuk digunakan oleh banyak estimator.

https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OneHotEncoder.html

## [R5] Goodfellow, Bengio, Courville — Deep Learning, Chapter 15: Representation Learning
Mendukung: kesulitan suatu information-processing task dapat bergantung pada bagaimana informasi direpresentasikan.

https://www.deeplearningbook.org/contents/representation.html

## [R6] Google for Developers — Machine Learning Crash Course: Numerical Data — Normalization
Mendukung: numerical features sering ditransformasikan agar memiliki skala yang lebih sesuai untuk training.

https://developers.google.com/machine-learning/crash-course/numerical-data/normalization

---

# 25. QA Notes

## Academic QA

- Tidak menyamakan real-world object dengan record data.
- Tidak mengatakan semua digit adalah numerical feature.
- Tidak mengatakan arbitrary category index memiliki meaningful interval.
- Tidak mengajarkan one-hot encoding sebagai satu-satunya encoding yang benar.
- Tidak membuat recommendation/probability claim sebelum semantics-nya tersedia.
- Tidak membocorkan formal vector/matrix, probability, calculus, atau optimization.

## Math QA

Formula yang digunakan hanya arithmetic sederhana:

$$
45 > 8 > 6
$$

$$
3 - 2 = 2 - 1 = 1
$$

$$
60 = 2 \times 30
$$

$$
60000 = 2 \times 30000
$$

Semua digunakan untuk membedakan **mathematical operation** dari **semantic interpretation**.

## Markdown + KaTeX Contract

- Inline math menggunakan `$...$`.
- Display math menggunakan `$$...$$`.
- Tidak ada formula dalam fenced code block.
- Tidak ada raw LaTeX command di luar math delimiter.
- Formula hanya memakai command dasar yang aman untuk KaTeX.
- Tidak ada klaim browser-level render test pada file ini; runtime frontend tetap perlu menjalankan KaTeX pada integration test.

## Dependency QA

Topik berhenti pada representation literacy.

Formal vocabulary `observation`, `feature`, dan `target` sengaja ditahan untuk Topic 02.

Vector/matrix formal sengaja ditahan untuk Submodule 02.
