# Topic 02 — Data, Observation, Feature, dan Target

> **Submodul 01 — Kenapa AI Butuh Matematika? + Mathematical Readiness**  
> **Filename:** `02-data-observation-feature-target.md`  
> **Level:** Beginner  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Estimasi belajar:** 40–55 menit membaca + 20–30 menit eksplorasi/praktik  
> **Prerequisite:** Topic 01 — Dunia Nyata Menjadi Representasi Komputasional  
> **Forward dependency:** Topic 03 — Pecahan, Desimal, dan Persentase

---

# 1. Mengapa topik ini ada?

Pada Topic 01 kita sudah membedakan dua hal:

> **Alya sebagai manusia di dunia nyata**

dan:

> **record data yang disimpan HerAI tentang Alya.**

Sekarang masalahnya berkembang.

Sistem HerAI tidak hanya memiliki satu peserta.

Bayangkan ada ratusan atau ribuan peserta, masing-masing mempunyai:

- minat belajar;
- kesiapan Python;
- kesiapan matematika;
- hasil quiz;
- completion;
- durasi belajar;
- riwayat interaksi;
- dan outcome belajar setelah menerima materi tertentu.

Kalau semua informasi tersebut hanya disebut sebagai “data”, kita akan cepat kehilangan arah.

Kita perlu bahasa yang lebih presisi.

Ketika melihat sebuah dataset, kita harus bisa menjawab:

- satu baris mewakili **apa**?
- satu kolom merekam **apa**?
- kolom mana yang boleh menjadi **input**?
- kolom mana yang merupakan **hasil yang ingin diprediksi**?
- apakah sebuah ID peserta sama dengan feature?
- apa beda nilai aktual dengan prediction model?
- apakah semua masalah machine learning memiliki target?

Itulah fokus Topic 02.

Google menjelaskan dataset sebagai kumpulan examples; pada dataset tabular, satu baris dapat dipandang sebagai satu example dan kolom dapat menjadi feature atau label. Dalam supervised learning, features adalah nilai yang digunakan model untuk memprediksi label. [R1][R2]

Scikit-learn menggunakan istilah **sample** untuk unit data, `X` untuk data feature yang tersedia saat training dan prediction, serta `y` untuk target yang tersedia saat training tetapi biasanya tidak tersedia ketika model harus membuat prediction baru. [R3]

Kita akan membangun pemahaman itu secara bertahap, tanpa masuk dulu ke matrix formal.

---

# 2. Tujuan Topik

Setelah menyelesaikan Topic 02, kamu diharapkan mampu:

1. menjelaskan arti **dataset**, **observation**, **record/example**, **feature**, **identifier**, **target/label**, dan **prediction**;
2. menentukan unit observation dari sebuah masalah sederhana;
3. membaca dataset tabular sebagai kumpulan rows dan columns tanpa menganggap semua kolom memiliki fungsi yang sama;
4. mengidentifikasi mana kolom yang berperan sebagai feature, identifier, metadata, dan target untuk sebuah supervised learning task;
5. menjelaskan mengapa satu kolom dapat menjadi feature pada satu task tetapi tidak pada task lain;
6. menjelaskan mengapa target harus ditentukan berdasarkan pertanyaan yang ingin dijawab;
7. membedakan nilai target aktual $y^{(i)}$ dengan prediction model $\hat{y}^{(i)}$;
8. membaca notasi sederhana $x_j^{(i)}$ sebagai “nilai feature ke-$j$ untuk observation ke-$i$”;
9. mendeteksi contoh sederhana ketika informasi masa depan tidak pantas dipakai sebagai input untuk memprediksi masa lalu atau outcome yang sama;
10. menyiapkan dataset mini HerAI yang akan digunakan kembali pada topic-topic berikutnya.

---

# 3. Pertanyaan Pemantik — Satu Baris Itu Sebenarnya Apa?

Lihat dataset sederhana berikut.

| participant | ai_interest | python_readiness | math_readiness | quiz_score | completion | study_duration |
|---|---|---|---|---|---|---|
| Alya | High | Basic | Medium | 8/10 | 6/8 | 45 min |
| Bima | Medium | Intermediate | Basic | 6/10 | 5/8 | 30 min |
| Citra | High | Intermediate | High | 9/10 | 8/8 | 55 min |
| Dewi | Medium | Basic | Medium | 7/10 | 4/8 | 40 min |

Sekilas terlihat sederhana.

Empat baris berarti empat peserta.

Tetapi sekarang ubah pertanyaannya.

Misalnya dataset bukan merekam peserta, tetapi **sesi belajar**.

Alya bisa mempunyai:

- sesi pagi;
- sesi siang;
- sesi malam.

Maka tiga baris dapat berasal dari **orang yang sama**.

Jadi:

> **Satu row tidak selalu berarti satu orang.**

Row adalah satu **unit observation** sesuai cara dataset dirancang.

Unit tersebut dapat berupa:

- satu peserta;
- satu sesi belajar;
- satu transaksi;
- satu gambar;
- satu email;
- satu kunjungan;
- satu pasangan peserta–materi;
- atau unit lain yang sesuai dengan problem.

Ini adalah keputusan fundamental.

Kalau kita salah memahami satu row mewakili apa, seluruh interpretasi berikutnya bisa salah.

---

# 4. Predict Before Formalization

Sebelum membaca definisi formal, jawab berdasarkan intuisi.

## Prediksi A — Mana yang menjadi observation?

HerAI ingin mempelajari **perilaku tiap sesi belajar**.

Alya belajar tiga kali minggu ini.

Bima belajar dua kali.

Berapa observation jika satu observation didefinisikan sebagai **satu sesi belajar**?

**A.** 2  
**B.** 3  
**C.** 5  
**D.** Tidak bisa lebih dari jumlah peserta

Simpan jawabanmu.

---

## Prediksi B — Apakah semua kolom adalah feature?

Dataset memiliki kolom:

- `participant_id`
- `quiz_score`
- `completion`
- `study_duration`
- `mastery_after_material`

Apakah kelima kolom tersebut otomatis menjadi feature model?

**A.** Ya, karena semua kolom berada dalam dataset.  
**B.** Tidak; peran kolom bergantung pada task dan desain model.  
**C.** Ya, selama semuanya diubah menjadi angka.  
**D.** Hanya kolom pertama yang merupakan feature.

Simpan jawabanmu.

---

## Prediksi C — Target atau prediction?

Historisnya, setelah belajar materi tertentu, Alya memperoleh outcome:

`mastery_after_material = Yes`

Model kemudian memprediksi:

`predicted_mastery = Yes`

Apakah dua nilai tersebut merupakan hal yang sama?

**A.** Ya, karena teksnya sama.  
**B.** Tidak; yang pertama adalah observed target, yang kedua adalah model output.  
**C.** Ya, jika model akurat.  
**D.** Tidak; target tidak pernah boleh berupa kategori.

Kita akan kembali ke jawaban-jawaban ini.

---

# 5. Dari Satu Record ke Dataset

Pada Topic 01 kita punya satu record Alya.

Sekarang kita memperluasnya menjadi beberapa record.

## Dataset mini HerAI

| participant | ai_interest | python_readiness | math_readiness | quiz_correct | quiz_total | completion_done | completion_total | study_duration_min |
|---|---|---|---|---:|---:|---:|---:|---:|
| Alya | High | Basic | Medium | 8 | 10 | 6 | 8 | 45 |
| Bima | Medium | Intermediate | Basic | 6 | 10 | 5 | 8 | 30 |
| Citra | High | Intermediate | High | 9 | 10 | 8 | 8 | 55 |
| Dewi | Medium | Basic | Medium | 7 | 10 | 4 | 8 | 40 |

Dataset ini mempunyai:

- $4$ rows data;
- $9$ columns yang terlihat;
- tetapi belum tentu semua columns akan digunakan sebagai model input.

Google Machine Learning Crash Course menyebut dataset sebagai collection of examples dan menjelaskan bahwa pada format tabel, setiap row dapat dipandang sebagai example dan setiap column sebagai **potential** feature atau label. Kata **potential** penting: keberadaan sebuah column tidak otomatis menetapkan perannya. [R1]

---

# 6. Vocabulary Utama

## 6.1 Dataset

**Dataset** adalah kumpulan data yang diorganisasi untuk dianalisis atau digunakan dalam suatu proses komputasional.

Dalam machine learning, dataset dapat berbentuk:

- table;
- image collection;
- text corpus;
- log events;
- audio;
- video;
- dan format lain.

Untuk pembelajaran kita sekarang, kita menggunakan dataset tabular karena lebih mudah dihitung manual.

---

## 6.2 Observation

Dalam course ini, **observation** adalah satu unit yang sedang diamati dan direkam sebagai satu contoh data.

Untuk dataset peserta:

> satu observation = satu peserta.

Untuk dataset sesi belajar:

> satu observation = satu sesi.

Untuk dataset rekomendasi:

> satu observation bahkan bisa menjadi satu pasangan peserta–materi pada satu waktu tertentu.

Jadi observation tidak ditentukan oleh bentuk row semata.

Observation ditentukan oleh **unit analisis** yang kita pilih.

---

## 6.3 Record, Example, dan Sample

Istilah berbeda dapat dipakai oleh sumber berbeda.

Dalam konteks tabular beginner-level kita:

- **record**: satu catatan data;
- **example**: istilah umum di ML untuk satu contoh;
- **sample**: istilah yang sering digunakan library seperti scikit-learn untuk satu contoh data;
- **observation**: istilah yang kita pakai untuk menekankan unit yang diamati.

Google mendefinisikan example sebagai nilai-nilai dari satu row feature dan mungkin sebuah label. [R2]

Scikit-learn menggunakan istilah sample untuk unit data dan membicarakan `n_samples` sebagai jumlah sample. [R3]

Untuk course ini, ketika konteksnya tidak ambigu:

> satu observation ≈ satu record/example.

Tetapi selalu cek dulu **apa unit yang diwakili row tersebut**.

---

## 6.4 Feature

**Feature** adalah informasi input yang digunakan oleh model untuk membentuk prediction.

Google mendefinisikan feature sebagai input variable pada machine learning model. [R2]

Contoh candidate features untuk HerAI:

- `ai_interest`
- `python_readiness`
- `math_readiness`
- `quiz_correct`
- `completion_done`
- `study_duration_min`

Perhatikan kata **candidate**.

Kolom tersedia tidak berarti kita wajib menggunakannya.

---

## 6.5 Identifier

**Identifier** adalah nilai yang dipakai untuk membedakan satu entity atau record dari yang lain.

Contoh:

`participant_id = HERAi-001`

Identifier berguna untuk:

- lookup;
- join data;
- tracking;
- database operations.

Tetapi identifier bukan otomatis feature yang meaningful bagi model.

Misalnya:

`HERAi-001`

dan:

`HERAi-002`

berbeda sebagai identitas.

Tetapi angka `2` pada ID kedua tidak berarti peserta kedua mempunyai kemampuan “dua kali” peserta pertama.

Ini melanjutkan prinsip Topic 01:

> angka atau digit tidak otomatis memiliki makna kuantitatif.

---

## 6.6 Target atau Label

Dalam **supervised learning**, target adalah outcome yang ingin dipelajari atau diprediksi model.

Scikit-learn menyebut target sebagai dependent variable/outcome/response/ground truth atau label dan biasanya menyatakannya sebagai `y`. [R3]

Google menjelaskan label sebagai “answer” atau result portion dari sebuah labeled example. [R2][R4]

Contoh task:

> Prediksi apakah peserta akan mencapai mastery pada materi kandidat setelah belajar.

Maka historical outcome:

`mastery_after_material`

dapat berperan sebagai target, **jika** definisinya jelas dan memang itulah pertanyaan model.

---

## 6.7 Prediction

**Prediction** adalah output yang dihasilkan model ketika diberi input.

Prediction bukan target aktual.

Kita akan memakai notasi:

- $y^{(i)}$ = target aktual observation ke-$i$;
- $\hat{y}^{(i)}$ = prediction model untuk observation ke-$i$.

Simbol “topi” pada $\hat{y}$ dibaca sebagai:

> “y hat”

dan digunakan untuk membedakan nilai hasil prediksi dari nilai target aktual $y$.

---

# 7. Feature, Target, dan Prediction Bukan Tiga Nama untuk Hal yang Sama

Misalkan historical record Alya adalah:

| Field | Value |
|---|---|
| quiz_correct | 8 |
| completion_done | 6 |
| study_duration_min | 45 |
| mastery_after_material | Yes |

Jika task kita adalah memprediksi:

> “Apakah peserta akan mencapai mastery setelah material tertentu?”

maka tiga field pertama **dapat dipertimbangkan sebagai features**, sedangkan:

`mastery_after_material`

menjadi **target**.

Model lalu menghasilkan prediction:

`predicted_mastery = Yes`

Secara konseptual:

**Features → Model → Prediction**

sementara historical target digunakan sebagai acuan pada proses supervised learning.

Google menjelaskan supervised learning sebagai proses belajar hubungan antara features dan label dari labeled examples, kemudian menggunakan pola itu untuk membuat prediction pada data baru. [R4]

---

# 8. Satu Dataset Bisa Mendukung Task yang Berbeda

Inilah bagian penting.

Kolom tidak memiliki peran universal yang selalu sama.

Bayangkan dataset HerAI mempunyai:

- `quiz_correct`
- `completion_done`
- `study_duration_min`
- `mastery_after_material`

## Task A

> Prediksi `mastery_after_material`.

Maka:

- `quiz_correct` → candidate feature;
- `completion_done` → candidate feature;
- `study_duration_min` → candidate feature;
- `mastery_after_material` → target.

## Task B

> Prediksi `study_duration_min`.

Sekarang perannya berubah.

`study_duration_min` menjadi target.

Jadi:

> **Feature dan target ditentukan relatif terhadap pertanyaan yang ingin dijawab.**

Bukan berdasarkan nama kolom saja.

---

# 9. Concrete Example — Satu Kolom, Dua Peran Berbeda

Kita punya:

`quiz_correct = 8`

### Problem 1

Kita ingin memprediksi mastery setelah materi berikutnya.

Maka `quiz_correct` dapat menjadi candidate feature.

### Problem 2

Kita ingin memprediksi berapa jawaban quiz yang akan benar.

Maka `quiz_correct` dapat menjadi target.

Nilainya sama.

Kolomnya sama.

Tetapi **role-nya berubah karena task-nya berubah**.

---

# 10. Notasi Minimum yang Perlu Kita Bisa Baca

Kita belum masuk formal Linear Algebra.

Tetapi mulai sekarang kita butuh sedikit literacy notasi.

## 10.1 Index observation

Kita gunakan:

$$
i = 1,2,\ldots,n
$$

Artinya:

- $i$ = index observation;
- $n$ = jumlah total observation.

Jika dataset mempunyai empat peserta:

$$
n = 4
$$

dan kita bisa mengatakan:

- $i=1$ → Alya;
- $i=2$ → Bima;
- $i=3$ → Citra;
- $i=4$ → Dewi.

Index ini hanya alat pencatatan.

Nilai $i=4$ tidak berarti Dewi “empat kali” Alya.

---

## 10.2 Index feature

Kita gunakan:

$$
j = 1,2,\ldots,p
$$

dengan:

- $j$ = index feature;
- $p$ = jumlah feature yang dipilih.

Jika kita memilih tiga feature:

1. quiz correct;
2. completion done;
3. study duration;

maka:

$$
p = 3
$$

---

## 10.3 Nilai feature untuk satu observation

Kita dapat menulis:

$$
x_j^{(i)}
$$

Dibaca:

> “nilai feature ke-$j$ pada observation ke-$i$.”

Misalkan:

- observation ke-$1$ = Alya;
- feature ke-$3$ = study duration.

Dari dataset:

`study_duration_min = 45`

maka:

$$
x_3^{(1)} = 45
$$

Artinya:

> nilai feature ke-3 untuk observation pertama adalah 45.

Belum ada vector algebra di sini.

Kita hanya belajar **membaca alamat sebuah nilai** di dataset.

---

## 10.4 Target satu observation

Kita tulis:

$$
y^{(i)}
$$

Artinya:

> target aktual pada observation ke-$i$.

Jika target untuk Alya adalah:

`mastery_after_material = Yes`

maka secara konseptual:

$$
y^{(1)} = \text{Yes}
$$

---

## 10.5 Prediction satu observation

Prediction model ditulis:

$$
\hat{y}^{(i)}
$$

Jika model memprediksi Alya akan mencapai mastery:

$$
\hat{y}^{(1)} = \text{Yes}
$$

Walaupun:

$$
y^{(1)} = \hat{y}^{(1)}
$$

pada satu contoh tertentu, keduanya **tetap memiliki peran berbeda**.

$y^{(1)}$ adalah nilai aktual.

$\hat{y}^{(1)}$ adalah output model.

---

# 11. Math Reading Skill — Dari Simbol ke Bahasa Manusia

Sekarang baca:

$$
x_2^{(3)} = 8
$$

Misalkan:

- observation ke-$3$ = Citra;
- feature ke-$2$ = completion done.

Maka kita membaca:

> Feature kedua pada observation ketiga mempunyai nilai 8.

Dalam konteks:

> Citra telah menyelesaikan 8 unit yang direkam pada field completion.

Jangan membaca:

> “x dua pangkat tiga sama dengan delapan.”

Mengapa?

Karena dalam notasi kita:

$$
x_2^{(3)}
$$

bukan berarti $x_2$ dipangkatkan tiga.

Superscript `(3)` digunakan sebagai **index observation**, bukan exponent.

Inilah alasan definisi notasi penting.

Simbol yang bentuknya sama dapat memiliki arti berbeda tergantung convention.

---

## Bahasa manusia → notasi

Kalimat:

> Quiz correct untuk Bima adalah 6.

Jika:

- Bima adalah observation ke-$2$;
- quiz correct adalah feature ke-$1$;

maka:

$$
x_1^{(2)} = 6
$$

---

## Notasi → bahasa manusia

$$
y^{(4)} = \text{No}
$$

Jika observation ke-$4$ adalah Dewi dan target adalah mastery setelah material:

> Dewi secara historis tidak mencapai outcome mastery yang didefinisikan untuk task tersebut.

Ini jauh lebih informatif daripada sekadar membaca “y empat sama dengan No”.

---

# 12. Worked Example 1 — Bedah Dataset Satu Row

Gunakan data Alya:

| participant_id | quiz_correct | completion_done | study_duration_min | mastery_after_material |
|---|---:|---:|---:|---|
| HERAi-001 | 8 | 6 | 45 | Yes |

Task:

> Prediksi mastery setelah material berdasarkan aktivitas sebelum material tersebut.

Mari kita klasifikasikan satu per satu.

## Langkah 1 — `participant_id`

Nilai:

`HERAi-001`

Fungsi utamanya adalah identitas.

Jadi:

> **Identifier**

Kita tidak otomatis menjadikannya feature.

---

## Langkah 2 — `quiz_correct`

Nilai:

`8`

Diukur sebelum outcome mastery.

Untuk task ini, nilainya dapat dipertimbangkan sebagai:

> **Candidate feature**

---

## Langkah 3 — `completion_done`

Nilai:

`6`

Dapat menjadi:

> **Candidate feature**

---

## Langkah 4 — `study_duration_min`

Nilai:

`45`

Dapat menjadi:

> **Candidate feature**

---

## Langkah 5 — `mastery_after_material`

Nilai:

`Yes`

Itulah hasil historis yang ingin dipelajari.

Maka:

> **Target**

---

## Hasil akhir

| Column | Role untuk task ini |
|---|---|
| participant_id | Identifier |
| quiz_correct | Candidate feature |
| completion_done | Candidate feature |
| study_duration_min | Candidate feature |
| mastery_after_material | Target |

Poin penting:

> “Candidate feature” tidak berarti feature tersebut pasti berguna atau pasti harus digunakan.

Google menegaskan bahwa lebih banyak features tidak selalu menghasilkan prediction lebih baik; tidak semua feature mempunyai predictive power yang berguna. [R4][R5]

---

# 13. Worked Example 2 — Empat Observation dan Satu Target

Sekarang gunakan dataset historis mini berikut.

> Dataset ini hanya **toy educational dataset** untuk latihan reasoning, bukan dataset produksi HerAI.

| i | participant | quiz_correct | completion_done | study_duration_min | mastery_after_material |
|---:|---|---:|---:|---:|---|
| 1 | Alya | 8 | 6 | 45 | Yes |
| 2 | Bima | 6 | 5 | 30 | No |
| 3 | Citra | 9 | 8 | 55 | Yes |
| 4 | Dewi | 7 | 4 | 40 | No |

Kita memilih:

- feature 1 = quiz correct;
- feature 2 = completion done;
- feature 3 = study duration.

Maka:

$$
n = 4
$$

karena ada empat observation.

Dan:

$$
p = 3
$$

karena kita memilih tiga features.

---

## Step 1 — Baca Alya

Alya adalah observation:

$$
i = 1
$$

Quiz correct:

$$
x_1^{(1)} = 8
$$

Completion:

$$
x_2^{(1)} = 6
$$

Study duration:

$$
x_3^{(1)} = 45
$$

Target:

$$
y^{(1)} = \text{Yes}
$$

---

## Step 2 — Baca Bima

Bima adalah:

$$
i = 2
$$

Maka:

$$
x_1^{(2)} = 6
$$

$$
x_2^{(2)} = 5
$$

$$
x_3^{(2)} = 30
$$

dan:

$$
y^{(2)} = \text{No}
$$

---

## Step 3 — Baca Citra

$$
x_1^{(3)} = 9
$$

$$
x_2^{(3)} = 8
$$

$$
x_3^{(3)} = 55
$$

$$
y^{(3)} = \text{Yes}
$$

---

## Step 4 — Baca Dewi

$$
x_1^{(4)} = 7
$$

$$
x_2^{(4)} = 4
$$

$$
x_3^{(4)} = 40
$$

$$
y^{(4)} = \text{No}
$$

---

## Step 5 — Jangan buru-buru menyimpulkan

Dari empat row kita mungkin melihat peserta dengan `Yes` pada toy dataset ini mempunyai beberapa angka yang relatif tinggi.

Tetapi kita **belum boleh** mengatakan:

- quiz tinggi menyebabkan mastery;
- durasi tinggi menjamin mastery;
- pola empat peserta akan berlaku untuk semua peserta;
- kita sudah mempunyai model bagus;
- `Yes` dapat diprediksi dengan certainty.

Empat observation hanya digunakan untuk belajar struktur dataset dan notasi.

Statistics, probability, model evaluation, dan generalization belum kita pelajari.

---

# 14. Target Harus Memiliki Definisi Operasional

Kata:

`mastery`

terdengar jelas.

Tetapi bagi sistem, kita harus mendefinisikannya.

Misalnya untuk toy course ini:

> `mastery_after_material = Yes` jika peserta memperoleh minimal 8 jawaban benar dari 10 pada mastery check setelah menyelesaikan material tertentu.

Sekarang target mempunyai operational definition.

Kita tahu:

- kapan diukur;
- berdasarkan assessment apa;
- threshold-nya apa;
- outcome apa yang direpresentasikan.

Tanpa definisi seperti itu, dua orang dapat menggunakan kata “mastery” dengan arti berbeda.

Poinnya bukan bahwa definisi tersebut adalah satu-satunya definisi yang benar.

Justru:

> **Target adalah bagian dari desain problem.**

Jika tujuan berubah, definisi target mungkin perlu berubah.

---

# 15. Change One Thing — Ubah Target, Ubah Problem

Gunakan dataset yang sama.

Features:

- quiz correct;
- completion;
- study duration.

Sekarang bandingkan.

## Problem A

Target:

`mastery_after_material`

Pertanyaan:

> Apakah peserta mencapai mastery setelah material?

---

## Problem B

Target:

`study_duration_next_session`

Pertanyaan:

> Berapa lama peserta akan belajar pada sesi berikutnya?

Dataset sumber bisa mempunyai beberapa column yang sama, tetapi target berbeda.

Dengan mengubah target, kita mengubah:

- pertanyaan;
- output yang diharapkan;
- tipe problem;
- cara menilai prediction.

Jadi target bukan “kolom paling kanan”.

Target adalah:

> **outcome yang secara sengaja kita tetapkan sebagai apa yang ingin dipelajari atau diprediksi.**

---

# 16. Tidak Semua Machine Learning Memiliki Target

Sampai sekarang kita banyak menggunakan supervised learning.

Namun jangan membuat kesimpulan:

> “Semua machine learning harus punya target.”

Tidak.

Dalam **unsupervised learning**, expected prediction atau ground truth target tidak tersedia untuk setiap sample ketika model belajar. Scikit-learn secara eksplisit membedakan supervised learning yang menggunakan target `y` dari unsupervised learning yang tidak menggunakan target tersebut dengan cara yang sama. [R3]

Google juga membedakan supervised learning dari unsupervised learning yang mencari pola dalam unlabeled data. [R6]

Untuk Math for AI kita:

- target dibahas karena penting untuk supervised learning;
- tetapi target bukan syarat universal seluruh AI.

---

# 17. Target Aktual vs Prediction — Jangan Dicampur

Misalkan historical target Alya:

$$
y^{(1)} = \text{Yes}
$$

Model memprediksi:

$$
\hat{y}^{(1)} = \text{No}
$$

Apa yang terjadi?

Model salah pada observation tersebut.

Sekarang misalkan:

$$
y^{(1)} = \text{Yes}
$$

dan:

$$
\hat{y}^{(1)} = \text{Yes}
$$

Model benar pada observation tersebut.

Tetapi bahkan pada kasus kedua:

> target dan prediction tetap bukan object yang sama.

Mereka hanya kebetulan mempunyai nilai yang sama.

Nanti ketika kita belajar loss dan evaluation, perbedaan $y$ dan $\hat{y}$ menjadi sangat penting.

---

# 18. Informasi Masa Depan Tidak Boleh Menyamar sebagai Input Masa Lalu

Bayangkan task:

> Sebelum Alya belajar materi berikutnya, prediksi apakah ia akan mencapai mastery.

Candidate features yang tersedia **sebelum** pembelajaran:

- quiz sebelumnya;
- completion sebelumnya;
- study duration sebelumnya;
- readiness sebelumnya.

Sekarang seseorang memasukkan:

`post_material_quiz_score`

sebagai feature.

Masalahnya:

`post_material_quiz_score`

baru diketahui **setelah** Alya menyelesaikan material.

Jika tujuan kita adalah prediction sebelum material dimulai, kita sedang memasukkan informasi yang pada waktu prediction belum tersedia.

Secara praktis ini membuat evaluation terlihat terlalu mudah dan tidak mencerminkan kondisi penggunaan sebenarnya.

Pada tahap ini cukup pegang prinsip:

> **Feature harus masuk akal tersedia pada saat prediction akan dibuat.**

Kita belum masuk formal data leakage; kita hanya membangun temporal reasoning yang benar.

---

# 19. HerAI Data Contract V1

Agar running case tetap konsisten, kita kunci vocabulary awal.

## Unit observation saat ini

Untuk Topic 02:

> **satu observation = satu historical participant-learning record untuk satu candidate material dalam toy scenario.**

Nanti dataset recommendation dapat berkembang menjadi struktur participant–material yang lebih eksplisit.

---

## Core fields saat ini

| Field | Role | Makna |
|---|---|---|
| participant_id | Identifier | ID peserta |
| ai_interest | Candidate feature | tingkat minat AI yang direkam |
| python_readiness | Candidate feature | kesiapan Python yang direkam |
| math_readiness | Candidate feature | kesiapan matematika yang direkam |
| quiz_correct | Candidate feature | jumlah jawaban benar |
| quiz_total | Context / denominator | jumlah item quiz |
| completion_done | Candidate feature | unit selesai |
| completion_total | Context / denominator | total unit |
| study_duration_min | Candidate feature | durasi belajar dalam menit |
| mastery_after_material | Target untuk toy supervised task | outcome mastery yang didefinisikan |

Kata “candidate feature” disengaja.

Kita belum menentukan feature selection final.

---

# 20. Math Reading Skill — Membaca Satu Observation Secara Lengkap

Misalkan:

$$
i = 3
$$

adalah Citra.

Kita punya:

$$
x_1^{(3)} = 9
$$

$$
x_2^{(3)} = 8
$$

$$
x_3^{(3)} = 55
$$

$$
y^{(3)} = \text{Yes}
$$

Bacaan manusia:

> Pada observation ketiga, peserta Citra memiliki 9 jawaban benar, telah menyelesaikan 8 unit, belajar 55 menit, dan historical outcome mastery yang didefinisikan untuk task ini adalah Yes.

Yang **tidak** boleh dibaca:

> Karena semua angkanya besar, Citra pasti peserta terbaik.

Mengapa?

Karena:

- “terbaik” belum didefinisikan;
- scales berbeda;
- outcome berbeda dari overall quality;
- dataset sangat kecil;
- kita belum melakukan statistical analysis.

Ini contoh **mathematical reading with semantic discipline**.

---

# 21. Misconception Challenge

## Challenge 1 — “Satu row selalu satu orang”

Dataset mempunyai 100 rows dari 10 peserta.

Apakah dataset salah?

Tidak.

Mungkin satu row adalah:

- satu session;
- satu participant–material interaction;
- satu quiz attempt.

Observation ditentukan oleh unit analisis.

---

## Challenge 2 — “Semua kolom adalah feature”

Dataset memiliki target dan participant ID.

Apakah keduanya otomatis feature?

Tidak.

Target memiliki role berbeda.

ID sering kali berfungsi sebagai identifier.

Feature dipilih berdasarkan task dan availability.

---

## Challenge 3 — “Target adalah jawaban model”

Tidak.

Target:

$$
y^{(i)}
$$

adalah nilai aktual/ground truth yang dipakai dalam supervised task.

Prediction:

$$
\hat{y}^{(i)}
$$

adalah output model.

---

## Challenge 4 — “Kalau prediction sama dengan target, berarti keduanya sama”

Tidak.

Misalnya:

$$
y^{(1)} = 1
$$

dan:

$$
\hat{y}^{(1)} = 1
$$

Nilainya sama, tetapi sumber dan perannya berbeda.

---

## Challenge 5 — “Lebih banyak feature pasti lebih bagus”

Tidak otomatis.

Feature dapat:

- tidak relevan;
- noisy;
- tidak tersedia saat inference;
- atau membawa information yang tidak valid untuk task.

Google mencatat bahwa menambahkan lebih banyak features tidak selalu menghasilkan model dengan prediction lebih baik. [R4]

---

## Challenge 6 — “Semua AI punya target y”

Tidak.

Unsupervised learning tidak menggunakan known target per sample dengan cara supervised learning. [R3][R6]

---

# 22. Try It Yourself

## Practice A — Tentukan observation unit

### Scenario 1

HerAI ingin menganalisis waktu belajar per session.

Data:

- Alya session pagi;
- Alya session malam;
- Bima session siang.

Berapa observation?

**Jawaban:** 3.

Karena satu observation = satu session.

---

### Scenario 2

HerAI ingin membuat satu profile summary per peserta.

Peserta:

- Alya;
- Bima;
- Citra.

Berapa observation?

**Jawaban:** 3.

Sekarang satu observation = satu peserta.

---

### Reflection

Jumlah peserta dan jumlah observation tidak selalu sama.

---

## Practice B — Feature, Target, atau Identifier?

Task:

> Prediksi apakah peserta mencapai mastery setelah material.

Columns:

1. `participant_id`
2. `quiz_correct`
3. `study_duration_min`
4. `mastery_after_material`

Klasifikasikan.

Expected:

1. identifier;
2. candidate feature;
3. candidate feature;
4. target.

---

## Practice C — Target berubah

Dataset mempunyai:

- quiz score;
- completion;
- study duration;
- mastery.

Task sekarang:

> Prediksi study duration sesi berikutnya.

Field apa yang sekarang menjadi target?

**Jawaban:** study duration sesi berikutnya.

Jelaskan mengapa role column tidak bersifat universal.

---

## Practice D — Baca notasi

Diketahui:

- observation ke-$2$ = Bima;
- feature ke-$1$ = quiz correct;
- $x_1^{(2)} = 6$.

Tuliskan kalimat manusia.

Strong answer:

> Nilai quiz correct untuk observation Bima adalah 6.

---

## Practice E — Target atau prediction?

Diketahui:

$$
y^{(4)} = \text{No}
$$

dan:

$$
\hat{y}^{(4)} = \text{Yes}
$$

Apa artinya?

Strong answer:

> Historical target observation ke-4 adalah No, sedangkan model memprediksi Yes, sehingga prediction berbeda dari target untuk observation tersebut.

---

# 23. Visual & Interactive Specifications

## [INTERACTIVE VISUAL] What Does One Row Mean?

**Learning purpose:**  
Mematahkan asumsi “satu row = satu orang”.

**Initial state:**  
Tampilkan 3 kartu peserta dan 6 session cards.

**Learner action:**  
Pilih unit observation:

- Participant
- Study Session

**Expected behavior:**  
Jika `Participant`, UI mengelompokkan menjadi 3 rows.  
Jika `Study Session`, UI menampilkan 6 rows.

**Feedback:**  
“Jumlah observation bergantung pada unit analisis.”

---

## [INTERACTIVE VISUAL] Column Role Sorter

**Learning purpose:**  
Membedakan identifier, feature, target, dan context.

**Cards:**

- participant_id
- quiz_correct
- quiz_total
- completion_done
- study_duration_min
- mastery_after_material

**Drop zones:**

- Identifier
- Candidate Feature
- Target
- Context / Needs Task Definition

**Learner action:**  
Drag setiap column.

**Expected behavior:**  
Setelah user menentukan task “predict mastery”, sistem memberi feedback berdasarkan role yang paling masuk akal.

---

## [STEP-BY-STEP REVEAL] Features → Prediction vs Target

**Learning purpose:**  
Membedakan $y$ dan $\hat{y}$.

**Initial state:**

Features Alya:

- quiz = 8
- completion = 6
- duration = 45

**Step 1:**  
Tampilkan model box.

**Step 2:**  
Tampilkan:

$$
\hat{y}^{(1)} = \text{Yes}
$$

Label:

`Model Prediction`

**Step 3:**  
Reveal historical target:

$$
y^{(1)} = \text{Yes}
$$

Label:

`Observed Target`

**Expected behavior:**  
Walau kedua nilai sama, dua kartu tetap dipisahkan secara visual.

---

## [COMPARE VIEW] Same Column, Different Task

**Left task:**  
Predict mastery.

`study_duration` → Feature.

**Right task:**  
Predict next-session duration.

`study_duration_next` → Target.

**Learning purpose:**  
Role field bergantung pada problem definition.

---

## [INTERACTIVE VISUAL] Time Travel Feature Trap

**Learning purpose:**  
Memahami bahwa feature harus tersedia pada waktu prediction.

**Timeline:**

`before learning` → `material starts` → `after learning`

Cards:

- previous_quiz_score
- previous_completion
- previous_study_duration
- post_material_quiz_score

**Learner action:**  
Pilih data yang boleh digunakan untuk prediction sebelum material dimulai.

**Expected behavior:**  
`post_material_quiz_score` ditolak dengan feedback:

> “Nilai ini belum tersedia pada waktu prediction.”

---

# 24. Checkpoint

## Checkpoint 1

Apa beda dataset dan observation?

**Jawaban:**  
Dataset adalah collection of records/examples, sedangkan observation adalah satu unit yang direkam dalam dataset.

---

## Checkpoint 2

Apakah satu row selalu mewakili satu orang?

**Jawaban:**  
Tidak. Row dapat mewakili session, transaction, participant–material interaction, atau unit lain sesuai desain dataset.

---

## Checkpoint 3

Apa itu feature?

**Jawaban:**  
Input variable/information yang digunakan model untuk membentuk prediction pada task tertentu. [R2]

---

## Checkpoint 4

Apa itu target dalam supervised learning?

**Jawaban:**  
Outcome/label yang ingin dipelajari atau diprediksi model dan tersedia pada labeled training examples. [R3][R4]

---

## Checkpoint 5

Apa beda:

$$
y^{(i)}
$$

dan:

$$
\hat{y}^{(i)}
$$

**Jawaban:**  
$y^{(i)}$ adalah target aktual, sedangkan $\hat{y}^{(i)}$ adalah prediction model.

---

## Checkpoint 6

Apakah participant ID otomatis menjadi feature?

**Jawaban:**  
Tidak.

---

## Checkpoint 7

Jika task berubah, apakah target dapat berubah?

**Jawaban:**  
Ya. Target didefinisikan berdasarkan outcome yang ingin diprediksi.

---

## Checkpoint 8

Apakah unsupervised learning selalu memiliki target $y$?

**Jawaban:**  
Tidak. [R3][R6]

---

# 25. Mastery Check

Sebelum melanjutkan, pastikan kamu bisa mengatakan:

- [ ] **I can** menjelaskan apa itu dataset.
- [ ] **I can** menentukan unit observation.
- [ ] **I can** menjelaskan mengapa satu row tidak selalu berarti satu orang.
- [ ] **I can** membedakan feature, identifier, target, dan prediction.
- [ ] **I can** menjelaskan mengapa semua column tidak otomatis menjadi feature.
- [ ] **I can** menjelaskan mengapa target bergantung pada task.
- [ ] **I can** membaca $x_j^{(i)}$ sebagai nilai feature ke-$j$ pada observation ke-$i$.
- [ ] **I can** membedakan $y^{(i)}$ dan $\hat{y}^{(i)}$.
- [ ] **I can** menjelaskan mengapa feature harus tersedia ketika prediction dibuat.
- [ ] **I can** membaca dataset mini HerAI tanpa buru-buru membuat causal atau predictive claim.

Jika tiga atau lebih item belum nyaman, ulangi:

- Vocabulary Utama;
- Worked Example 1;
- Worked Example 2;
- Misconception Challenge.

---

# 26. Why This Matters Later

Topic 02 memberi kita grammar untuk berbicara tentang data.

Sekarang kita tahu:

- apa satu observation;
- apa feature;
- apa target;
- apa prediction;
- bagaimana membaca index sederhana.

Ini akan dipakai kembali.

## Topic 03 — Fraction, Decimal, Percentage

Kita akan mengubah:

`8 dari 10`

menjadi representasi numerik yang lebih mudah dibandingkan.

Kita juga akan mengubah:

`6 dari 8`

menjadi completion ratio.

---

## Topic 04 — Variable, Expression, Equation

Notasi seperti:

$$
x_j^{(i)}
$$

dan:

$$
y^{(i)}
$$

akan membuat ide variable terasa lebih natural.

---

## Submodule 02 — Linear Algebra

Beberapa feature dari satu observation nantinya dapat disusun menjadi sebuah vector.

Banyak observation dapat disusun menjadi bentuk data yang lebih terstruktur.

Kita belum memformalkan itu sekarang.

---

## Submodule 03 — Statistics

Kita akan menghitung summary atas banyak observation.

Tanpa memahami apa satu observation, statistik dapat mudah disalahartikan.

---

## Submodule 04 — Probability

Target dan outcomes akan membantu ketika kita mulai membicarakan uncertainty.

---

## Submodule 05–06 — Calculus dan Optimization

Perbedaan:

$$
y
$$

dan:

$$
\hat{y}
$$

akan muncul lagi ketika kita membahas loss dan bagaimana parameter model diperbaiki.

---

# 27. Summary

Dalam Topic 01 kita belajar:

> dunia nyata tidak sama dengan representasi data.

Dalam Topic 02 kita menambahkan struktur:

> dataset adalah kumpulan observations/examples yang berisi fields dengan role berbeda.

Untuk supervised learning:

- **feature** = input information;
- **target/label** = outcome yang ingin diprediksi;
- **prediction** = output model;
- **identifier** = identitas record/entity, bukan otomatis feature.

Kita juga belajar notasi:

$$
i = 1,2,\ldots,n
$$

untuk index observation,

$$
j = 1,2,\ldots,p
$$

untuk index feature,

$$
x_j^{(i)}
$$

untuk nilai feature ke-$j$ pada observation ke-$i$,

$$
y^{(i)}
$$

untuk target aktual,

dan:

$$
\hat{y}^{(i)}
$$

untuk prediction model.

Prinsip terpenting:

> **Data column tidak memiliki peran hanya karena ia berada di tabel. Perannya ditentukan oleh apa yang direpresentasikan, pertanyaan yang ingin dijawab, dan kapan informasi tersebut tersedia.**

---

# 28. Bridge ke Topic 03

Sekarang dataset HerAI mempunyai nilai seperti:

- `quiz_correct = 8`
- `quiz_total = 10`
- `completion_done = 6`
- `completion_total = 8`

Ada masalah baru.

Apakah kita bisa langsung membandingkan:

`8 dari 10`

dengan:

`6 dari 8`

hanya dengan melihat angka `8` dan `6`?

Tidak cukup.

Kita perlu cara melihat **bagian terhadap keseluruhan**.

Dari sinilah kita masuk ke:

> **Topic 03 — Pecahan, Desimal, dan Persentase**

Kita akan belajar mengubah:

$$
\frac{8}{10}
$$

dan:

$$
\frac{6}{8}
$$

menjadi bentuk yang dapat dibandingkan dengan benar.

Dan dari sana, mathematical readiness kita mulai benar-benar memasuki computation.

---

# 29. References

## [R1] Google for Developers — Machine Learning Crash Course: Datasets — Data Characteristics
Mendukung: dataset sebagai collection of examples; pada tabel, row dapat dianggap sebagai example dan column sebagai potential feature atau label.

https://developers.google.com/machine-learning/crash-course/overfitting/data-characteristics

## [R2] Google for Developers — Machine Learning Glossary: ML Fundamentals
Mendukung: definisi example, feature, label, labeled example, dan unlabeled example.

https://developers.google.com/machine-learning/glossary/fundamentals

## [R3] scikit-learn — Glossary of Common Terms and API Elements
Mendukung: supervised learning, target, `X`, `y`, sample, unsupervised learning; `y` sebagai target yang tersedia ketika training dan biasanya tidak tersedia ketika prediction.

https://scikit-learn.org/stable/glossary.html

## [R4] Google for Developers — Introduction to Machine Learning: Supervised Learning
Mendukung: dataset berisi examples dengan features dan label; features digunakan untuk memprediksi label; training mempelajari relationship dari labeled examples.

https://developers.google.com/machine-learning/intro-to-ml/supervised

## [R5] Google for Developers — Introduction to Machine Learning: Test Your Understanding
Mendukung: tidak setiap feature mempunyai predictive power yang sama atau berguna.

https://developers.google.com/machine-learning/intro-to-ml/understanding

## [R6] Google for Developers — What is Machine Learning?
Mendukung: perbedaan supervised learning dan unsupervised learning.

https://developers.google.com/machine-learning/intro-to-ml/what-is-ml

---

# 30. QA Notes

## Academic QA

- Observation tidak disamakan secara universal dengan person.
- Feature tidak didefinisikan sebagai “semua column”.
- Identifier tidak otomatis disebut feature.
- Target dijelaskan relatif terhadap supervised task.
- Target tidak diklaim sebagai komponen wajib seluruh ML.
- Prediction dibedakan dari target aktual.
- Tidak mengklaim correlation atau causation dari toy dataset.
- Tidak menggunakan toy dataset untuk klaim generalization.
- Feature availability dijelaskan secara temporal tanpa membuka full data-leakage module.
- `mastery_after_material` diberi status toy operational target, bukan truth absolut tentang kemampuan manusia.

## Notation QA

Notasi baru:

$$
i
$$

index observation.

$$
n
$$

jumlah observation.

$$
j
$$

index feature.

$$
p
$$

jumlah feature.

$$
x_j^{(i)}
$$

nilai feature ke-$j$ untuk observation ke-$i$.

$$
y^{(i)}
$$

target aktual observation ke-$i$.

$$
\hat{y}^{(i)}
$$

prediction model untuk observation ke-$i$.

Semua diperkenalkan sebelum digunakan secara intensif.

## Dependency QA

Topic 02 belum mengajarkan:

- vector operations;
- matrices;
- probability rules;
- statistics;
- loss;
- gradient;
- optimization.

Ia hanya menyiapkan vocabulary dan notation yang dibutuhkan untuk topic berikutnya.

## Markdown + KaTeX Contract

- Inline math menggunakan `$...$`.
- Display math menggunakan `$$...$$`.
- Tidak ada formula yang disengaja berada dalam fenced code block.
- Tidak ada raw LaTeX command yang disengaja di luar math delimiter.
- Command yang digunakan terbatas pada notation dasar seperti `\ldots`, `\hat`, dan `\text`, yang merupakan syntax standar KaTeX.
- Browser-level KaTeX rendering tetap harus diverifikasi saat integration ke frontend Vanilla JS.
