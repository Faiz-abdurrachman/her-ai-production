# Topic 01 — Dari Matrix ke Dataset Statistik

> **Submodule 03 — Statistics for AI: Membaca Pola dan Variasi Data**  
> **Filename:** `01-dari-matrix-ke-dataset-statistik.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Target learner:** peserta dewasa dengan latar belakang campuran, termasuk non-IT  
> **Prasyarat:** Submodule 01 dan Submodule 02 sudah selesai, terutama observation/feature literacy, rasio, vektor, matriks, row/column, shape, dan feature semantics  
> **Forward dependency:** Topic 02 — Mean, Median, Mode  
> **Boundary:** Topic ini membahas cara membaca matriks sebagai dataset statistik, unit observasi, observasi, variabel, nilai observasi, tipe variabel, identifier, unit, semantics, serta pertanyaan satu dan dua variabel pada level intuisi. Perhitungan mean/median/mode, spread, histogram, percentile, outlier formal, covariance/correlation, Probability, dan inference tetap ditunda.

---

# 1. Mengapa Topik Ini Ada?

Pada akhir Submodule 02 kita sudah memiliki feature matrix HerAI:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}
\in\mathbb{R}^{4\times2}.
$$

Kita sudah tahu cara membacanya sebagai matriks:

- ada $4$ rows;
- ada $2$ columns;
- row merepresentasikan participant pada convention HerAI;
- column pertama adalah quiz ratio $q$;
- column kedua adalah completion ratio $c$.

Linear Algebra membantu kita memahami **bentuk, operasi, dan transformasi** terhadap representasi tersebut.

Statistics mengubah sudut pandang.

Kita tidak lagi hanya bertanya:

> “Apa isi row Alya?”

Kita mulai bertanya:

> “Apa pola nilai quiz ratio di seluruh participant yang kita amati?”

> “Apakah study duration para participant mirip atau sangat bervariasi?”

> “Apakah dua variabel terlihat bergerak bersama?”

Sebelum menjawab pertanyaan-pertanyaan itu, kita perlu memastikan bahwa kita benar-benar tahu **apa satu observasi**, **apa satu variabel**, **apa arti angka pada setiap column**, dan **operasi apa yang masuk akal secara semantik**.

NIST memberikan bentuk data multivariat yang sangat dekat dengan jembatan ini: rows mewakili observations dan columns mewakili measured variables. [R1]

---

# 2. Pertanyaan Utama Topic 01

Kita akan menjawab satu pertanyaan inti:

> **Jika rows merepresentasikan observations dan columns merepresentasikan meaningful variables/features, bagaimana kita mulai membaca kumpulan observations sebagai dataset statistik?**

Kata kuncinya bukan hanya **angka**.

Kata kuncinya adalah:

- siapa atau apa yang diamati;
- karakteristik apa yang dicatat;
- dalam unit apa nilainya diukur;
- apa arti setiap nilai;
- jenis variabel apa yang sedang kita hadapi;
- pertanyaan statistik apa yang masuk akal untuk variabel tersebut.

---

# 3. Tujuan Topik

Setelah menyelesaikan Topic 01, kamu diharapkan mampu:

1. mengidentifikasi **unit observasi** dalam dataset tabular;
2. membedakan **observasi**, **record**, **variabel**, dan **nilai observasi**;
3. membaca satu row sebagai satu observasi di bawah convention dataset yang didefinisikan;
4. membaca satu column sebagai satu variabel yang diamati lintas observations;
5. menjelaskan bahwa orientasi row/column adalah keputusan desain dataset, bukan hukum alam;
6. membedakan variabel numerik/kuantitatif dan kategorikal berdasarkan makna, bukan sekadar tampilannya;
7. menjelaskan secara dasar perbedaan data diskrit dan kontinu tanpa menjadikannya teori mendalam;
8. membedakan identifier dari analytical variable;
9. menjelaskan mengapa kode numerik tidak otomatis mempunyai makna kuantitatif;
10. membedakan konsep **variabel** dari peran **feature** di machine learning;
11. menyebutkan unit dan semantics dari quiz ratio $q$, completion ratio $c$, dan study duration;
12. membedakan pertanyaan statistik satu variabel dan dua variabel pada level intuisi;
13. menjelaskan mengapa struktur dataset dan tipe variabel memengaruhi summary atau visualisasi yang nanti masuk akal;
14. mengaudit situasi ketika sebuah operasi dapat dilakukan komputer tetapi tidak meaningful secara statistik.

---

# 4. Prerequisite Recall — Apa yang Sudah Kita Tahu?

Topic ini tidak mengulang Submodule 01–02 dari awal.

Kita hanya menarik konsep yang benar-benar diperlukan.

## 4.1 Representation bukan realitas itu sendiri

Satu participant nyata dapat direpresentasikan dengan banyak cara.

Misalnya Alya dapat direpresentasikan melalui:

- nama;
- quiz correct;
- quiz total;
- completion done;
- completion total;
- quiz ratio;
- completion ratio;
- study duration.

Representasi dipilih untuk suatu tujuan. Angka yang tersimpan tidak otomatis menangkap seluruh keadaan participant.

## 4.2 Feature order punya semantics

Pada matriks HerAI:

$$
[q,c]
$$

berarti urutan feature adalah:

1. quiz ratio;
2. completion ratio.

Jika urutan ditukar tetapi label tidak ikut ditukar, angka masih dapat diproses komputer, tetapi maknanya rusak.

## 4.3 Angka dalam $[0,1]$ bukan otomatis probability

Quiz ratio Alya:

$$
q=0.80
$$

berarti:

$$
q=\frac{8}{10}=0.80.
$$

Ini adalah **rasio jawaban benar**, bukan probabilitas bahwa Alya akan sukses, bukan model confidence, dan bukan accuracy sistem.

---

# 5. Pemantik — Matriks yang Sama, Pertanyaan yang Berbeda

Perhatikan lagi:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}.
$$

Dari sudut pandang matriks, kita dapat bertanya:

- berapa shape-nya?;
- apa row pertama?;
- apa column kedua?;
- apakah operasi tertentu compatible?;
- bagaimana matrix-vector multiplication bekerja?

Dari sudut pandang statistik, kita mulai bertanya:

- siapa satu unit yang diamati?;
- apa arti column pertama?;
- apakah column itu numerik atau kategorikal?;
- apa unit pengukurannya?;
- apakah masuk akal membandingkan nilainya?;
- apakah pertanyaan kita hanya tentang satu variabel atau hubungan dua variabel?;
- apakah seluruh rows memang comparable dengan definition yang sama?

**Matriksnya belum berubah. Cara membacanya yang bertambah.**

---

# 6. Prediksi Sebelum Formalisasi

Jangan langsung mencari definisi. Buat prediksi terlebih dahulu.

## Prediksi 1 — Satu row

Diberikan tabel:

| participant | quiz ratio | completion ratio |
|---|---:|---:|
| Alya | 0.80 | 0.75 |
| Bima | 0.60 | 0.625 |
| Citra | 0.90 | 1.00 |
| Dewi | 0.70 | 0.50 |

Menurutmu, satu row pada tabel ini paling tepat dibaca sebagai:

A. satu variabel  
B. satu participant yang diamati  
C. satu probability distribution  
D. satu model prediction

Simpan jawabanmu.

## Prediksi 2 — Column `participant_id`

Misalkan identifier peserta ditulis:

- 101;
- 102;
- 103;
- 104.

Apakah karena semuanya angka, mean dari identifier tersebut otomatis meaningful?

Tuliskan alasan singkat sebelum lanjut.

## Prediksi 3 — Ubah unit observasi

Bayangkan dataset lain mencatat **satu row per learning session**, bukan satu row per participant.

Alya belajar tiga kali.

Apakah Alya harus muncul tepat satu kali?

## Prediksi 4 — $0.80$

Apakah nilai $0.80$ selalu berarti probability $80\%$?

Jawab berdasarkan **semantics**, bukan berdasarkan range angkanya.

---

# 7. Intuisi — Dari “Satu Peserta” ke “Satu Kumpulan Observasi”

Di Submodule 02, satu row dapat dibaca sebagai participant vector.

Untuk Alya:

$$
\mathbf{x}^{(1)}
=
\begin{bmatrix}
0.80\\
0.75
\end{bmatrix}.
$$

Fokusnya adalah **satu participant dengan beberapa features**.

Statistics menggeser fokus ke arah lain.

Ambil column quiz ratio:

$$
\mathbf{q}
=
\begin{bmatrix}
0.80\\
0.60\\
0.90\\
0.70
\end{bmatrix}.
$$

Sekarang kita membaca:

> “Empat nilai dari **variabel quiz ratio** yang diamati pada empat participant.”

Jadi ada dua cara melihat data yang sama:

- **row-wise:** siapa participant ini dan apa values miliknya?;
- **column-wise:** bagaimana satu karakteristik berubah dari satu participant ke participant lain?

Topic 01 membangun kemampuan berpindah di antara dua sudut pandang tersebut.

---

# 8. Eksplorasi Data Kecil — Dataset HerAI yang Sama, Sekarang Dibaca Statistik

Dataset canonical HerAI tetap:

| Participant | Quiz correct | Quiz total | Completion done | Completion total | Study duration | $q$ | $c$ |
|---|---:|---:|---:|---:|---:|---:|---:|
| Alya | 8 | 10 | 6 | 8 | 45 min | 0.80 | 0.75 |
| Bima | 6 | 10 | 5 | 8 | 30 min | 0.60 | 0.625 |
| Citra | 9 | 10 | 8 | 8 | 55 min | 0.90 | 1.00 |
| Dewi | 7 | 10 | 4 | 8 | 40 min | 0.70 | 0.50 |

Matriks $\mathbf{X}$ hanya mengambil dua variabel numerik:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}.
$$

Tetapi untuk belajar Statistics, kita juga boleh melihat variables lain dari record canonical, seperti study duration.

Yang penting: **kita tidak mengganti cohort**. Alya, Bima, Citra, dan Dewi tetap menjadi observations utama.

---

# 9. Definisi Formal — Unit Observasi

## 9.1 Unit observasi

**Unit observasi** (*observational unit* atau *unit of analysis* pada konteks tertentu) adalah **entitas dasar yang satu record-nya sedang kita amati atau catat**.

Pada tabel canonical HerAI:

> satu unit observasi = satu participant.

Maka:

- row 1 = observation Alya;
- row 2 = observation Bima;
- row 3 = observation Citra;
- row 4 = observation Dewi.

NIST menunjukkan struktur data multivariat dengan rows sebagai observations dan columns sebagai variables. [R1]

Namun jangan menyimpulkan:

> “Row selalu berarti person.”

Itu salah.

Jika dataset mencatat transaksi:

> satu row mungkin satu transaksi.

Jika dataset mencatat learning session:

> satu row mungkin satu session.

Jika dataset mencatat foto:

> satu row mungkin satu image record.

**Arti row mengikuti desain dataset.**

---

# 10. Observation, Record, dan Sample — Mirip tetapi Tidak Sama

Istilah ini sering dipakai berdekatan, tetapi kita akan berhati-hati.

## 10.1 Observation

Dalam topic ini, **observation** berarti satu unit yang diamati beserta values yang dicatat untuk unit tersebut.

Contoh:

> observation Alya mencakup $q=0.80$, $c=0.75$, dan study duration $45$ menit.

## 10.2 Record

**Record** adalah istilah implementasi/data yang sering berarti satu baris data yang menyimpan informasi tentang observation tersebut.

Dalam tabel HerAI participant-level:

> satu participant observation disimpan sebagai satu record/row.

## 10.3 Sample

Kata **sample** lebih berbahaya jika dipakai sembarangan.

Dalam statistik, sample sering berarti **sebagian unit yang dipilih dari population** untuk dipelajari. OpenStax menggunakan sample dalam arti subset dari population. [R2]

Karena itu, pada Topic 01 kita akan lebih sering memakai:

- observation;
- observational unit;
- record;

ketika membicarakan satu row.

Kita tidak akan menyebut setiap row “sample” tanpa konteks.

---

# 11. Definisi Formal — Variabel dan Nilai Observasi

OpenStax mendefinisikan variable sebagai characteristic atau measurement yang dapat ditentukan untuk anggota yang diamati, dan membedakan variable numerik dari kategorikal. [R2]

Untuk course ini:

> **Variabel** adalah karakteristik yang dicatat atau diukur secara konsisten pada observations.

Contoh variabel HerAI:

- quiz correct;
- quiz total;
- completion done;
- completion total;
- study duration;
- quiz ratio $q$;
- completion ratio $c$.

Sementara itu:

> **observed value** adalah nilai variabel tersebut untuk satu observation tertentu.

Contoh:

- variabel: quiz ratio $q$;
- observation: Alya;
- observed value: $0.80$.

Jadi:

> **variabel bukan sama dengan nilainya.**

$q$ adalah variabel.

$0.80$ adalah salah satu nilai yang diamati untuk $q$.

---

# 12. Kontrak Notasi — $n$, $x_i$, $q_i$, $c_i$, dan $t_i$

Kita mulai memakai notation statistik yang ringan.

Misalkan:

$$
n=4
$$

adalah jumlah observations pada cohort canonical HerAI.

Untuk suatu variabel numerik $x$:

$$
x_i
$$

berarti nilai variabel $x$ pada observation ke-$i$.

Jika urutan observations adalah:

1. Alya;
2. Bima;
3. Citra;
4. Dewi;

maka:

$$
q_1=0.80,
\qquad
q_2=0.60,
\qquad
q_3=0.90,
\qquad
q_4=0.70.
$$

Untuk completion ratio:

$$
c_1=0.75,
\qquad
c_2=0.625,
\qquad
c_3=1.00,
\qquad
c_4=0.50.
$$

Jika $t$ menyatakan study duration dalam menit:

$$
t_1=45,
\qquad
 t_2=30,
\qquad
 t_3=55,
\qquad
 t_4=40.
$$

## Keterampilan Membaca Matematika/Data

Baca:

$$
x_i
$$

sebagai:

> “nilai variabel $x$ untuk observation ke-$i$.”

Bukan:

> “$x$ pangkat $i$.”

Baca:

$$
n=4
$$

sebagai:

> “ada empat observations dalam kumpulan yang sedang kita deskripsikan.”

Jangan langsung menafsirkan $n=4$ sebagai “empat orang yang mewakili seluruh HerAI”. Itu adalah claim inferential yang belum kita bangun.

---

# 13. Semantik Variabel — Nama Column Saja Belum Cukup

Sebelum menghitung atau menggambar sesuatu, audit setiap variabel melalui tiga pertanyaan.

## 13.1 Apa maknanya?

Contoh:

$$
q=\frac{\text{quiz correct}}{\text{quiz total}}.
$$

Jadi $q$ adalah proporsi jawaban benar pada quiz yang diamati.

## 13.2 Apa unit atau skalanya?

- $q$: ratio dari $0$ sampai $1$;
- $c$: ratio dari $0$ sampai $1$;
- study duration: menit;
- quiz correct: jumlah jawaban benar.

## 13.3 Apakah operasi yang kita rencanakan punya arti?

Contoh:

- membandingkan apakah $55$ menit lebih lama daripada $30$ menit: meaningful;
- menganggap participant ID 104 “dua kali lebih besar secara peserta” daripada ID 52: tidak meaningful;
- menjumlahkan menit dan completion ratio begitu saja: tidak punya interpretasi yang jelas tanpa definisi transformasi.

**Statistik bukan izin untuk melakukan semua operasi pada semua columns.**

---

# 14. Tipe Variabel — Numerik vs Kategorikal

OpenStax membedakan data kuantitatif/numerik dari data kualitatif/kategorikal. Data kuantitatif berasal dari counting atau measurement, sedangkan kategorikal menyatakan category/attribute. [R3]

## 14.1 Variabel numerik / kuantitatif

Variabel numerik mempunyai nilai yang **berperilaku sebagai quantity**.

Contoh HerAI:

- quiz correct;
- quiz total;
- completion done;
- completion total;
- study duration;
- quiz ratio $q$;
- completion ratio $c$.

Pada variabel seperti study duration, perbedaan antara $30$ dan $40$ menit mempunyai makna kuantitatif.

## 14.2 Variabel kategorikal

Variabel kategorikal menyatakan group atau label.

Contoh hipotetis yang masih berada dalam konteks HerAI:

- track: `NLP`, `CV`, `Data`;
- readiness level: `beginner`, `intermediate`;
- cohort region: `west`, `central`, `east`.

Kita dapat menghitung frequency kategori, tetapi tidak boleh sembarang membuat arithmetic dari category labels.

---

# 15. Angka Tidak Otomatis Berarti Numerik

Ini salah satu guardrail terpenting.

Bayangkan:

| participant_id | participant |
|---:|---|
| 101 | Alya |
| 102 | Bima |
| 103 | Citra |
| 104 | Dewi |

Semua identifier ditulis dengan digits.

Tetapi apakah:

$$
\frac{101+102+103+104}{4}
$$

menjawab pertanyaan meaningful tentang participant?

Tidak.

Angka tersebut adalah **kode identitas**, bukan quantity yang diukur.

Google Machine Learning Crash Course memberikan contoh serupa: postal code terdiri dari digits tetapi tidak berperilaku sebagai quantity dengan relationship matematis. [R4]

Jadi aturan aman kita:

> **Numeric-looking tidak sama dengan quantitative.**

Tanyakan apa arti nilainya sebelum memilih operasi.

---

# 16. Identifier vs Analytical Variable

## 16.1 Identifier

Identifier dipakai untuk membedakan satu entity dari entity lain.

Contoh:

- `participant_id`;
- nomor registrasi;
- UUID;
- kode transaksi.

Identifier sangat berguna untuk:

- join data;
- tracing record;
- menghindari ambiguity.

Tetapi identifier biasanya **bukan quantity yang ingin kita summarize secara matematis**.

## 16.2 Analytical variable

Analytical variable adalah variabel yang benar-benar mempunyai peran dalam pertanyaan analisis.

Contoh:

- study duration jika kita ingin memahami pola waktu belajar;
- quiz ratio jika kita ingin memahami performa quiz yang tercatat;
- completion ratio jika kita ingin memahami progress completion.

Sebuah column dapat penting untuk database tetapi tidak penting sebagai variabel statistik untuk pertanyaan tertentu.

---

# 17. Variabel vs Feature dalam AI

Kata **variable** dan **feature** sering dipakai berdekatan, tetapi sebaiknya tidak dianggap identik secara mutlak.

Dalam topic ini:

> **variabel** = characteristic/measurement/category yang dicatat pada data.

Dalam machine learning:

> **feature** = variabel atau representation yang dipilih/dibentuk untuk menjadi input bagi model.

Contoh:

- `participant_id` adalah variabel/field dalam data, tetapi biasanya bukan feature kuantitatif yang meaningful;
- quiz ratio $q$ dapat menjadi variabel statistik dan juga dipilih sebagai feature;
- completion ratio $c$ dapat menjadi variabel statistik dan juga dipilih sebagai feature;
- participant name adalah field yang berguna untuk identitas tetapi tidak otomatis menjadi model feature.

Maka:

> **Tidak setiap column harus menjadi feature. Tidak setiap feature harus berupa raw column tanpa transformasi.**

Detail feature engineering bukan scope Topic 01, tetapi distinction ini penting agar kita tidak salah membaca dataset AI.

---

# 18. Discrete vs Continuous — Hanya Distinction Dasar

Research blueprint menyetujui distinction ini pada level ringan.

OpenStax membedakan quantitative discrete yang berasal dari counting dan quantitative continuous yang sering berasal dari measurement. [R3]

## 18.1 Discrete

Data diskrit mengambil values dari pilihan yang terpisah atau hasil count tertentu.

Contoh:

- quiz correct dari $0$ sampai $10$;
- completion done dari $0$ sampai $8$.

Untuk design HerAI ini, quiz ratio:

$$
q=\frac{\text{quiz correct}}{10}
$$

juga hanya dapat mengambil values tertentu seperti:

$$
0,
0.1,
0.2,
\ldots,
1.0.
$$

Jadi meskipun ditulis decimal, $q$ dalam design quiz total $10$ ini berasal dari himpunan nilai yang terbatas.

## 18.2 Continuous

Data kontinu secara konseptual berasal dari measurement yang dapat mempunyai banyak kemungkinan nilai dalam interval.

Study duration adalah contoh yang lebih alami.

Jika sistem menyimpan whole minutes, kita mungkin melihat:

$$
30,
40,
45,
55.
$$

Namun duration pada dunia nyata dapat saja $45.5$ menit atau $45.25$ menit. Penyimpanan whole minutes adalah keputusan recording/rounding.

## Safety

Jangan klasifikasikan discrete/continuous hanya dengan melihat apakah value mempunyai decimal.

Tanyakan:

> “Apakah variable ini berasal dari counting dengan nilai yang terpisah, atau dari measurement yang secara prinsip dapat lebih halus?”

---

# 19. Contoh Terarah 1 — Audit Dataset Dasar

Bayangkan sebuah helpdesk menyimpan data berikut:

| ticket_id | channel | resolution_time_min |
|---:|---|---:|
| 501 | chat | 12 |
| 502 | email | 35 |
| 503 | chat | 18 |
| 504 | phone | 9 |

Kita belum akan menghitung mean atau spread.

Kita hanya melakukan **dataset reading audit**.

## Step 1 — Unit observasi

Setiap row merepresentasikan:

> satu support ticket.

Jadi unit observasinya adalah **ticket**, bukan customer dan bukan agent.

## Step 2 — Identifier

`ticket_id` adalah identifier.

Nilai 504 tidak berarti ticket tersebut mempunyai “jumlah ticket” lebih besar daripada 501.

## Step 3 — Variabel kategorikal

`channel` adalah variabel kategorikal.

Values-nya:

- chat;
- email;
- phone.

## Step 4 — Variabel numerik

`resolution_time_min` adalah variabel numerik dengan unit **menit**.

Perbandingan $35$ menit dan $9$ menit meaningful karena keduanya mengukur quantity yang sama.

## Step 5 — Pertanyaan satu variabel

Contoh pertanyaan yang hanya berfokus pada `resolution_time_min`:

> “Bagaimana pola waktu penyelesaian ticket yang diamati?”

Kita belum menjawabnya dengan mean/histogram; itu materi nanti.

## Step 6 — Pertanyaan dua variabel

Contoh pertanyaan yang melibatkan `channel` dan `resolution_time_min`:

> “Apakah waktu penyelesaian terlihat berbeda antar-channel pada records yang diamati?”

Ini adalah pertanyaan dua variabel pada level eksplorasi.

Belum ada claim causal.

---

# 20. Contoh Terarah 2 — Audit Dataset HerAI

Sekarang kembali ke persistent case.

| Participant | $q$ | $c$ | Study duration |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 min |
| Bima | 0.60 | 0.625 | 30 min |
| Citra | 0.90 | 1.00 | 55 min |
| Dewi | 0.70 | 0.50 | 40 min |

## Step 1 — Unit observasi

Satu row = satu participant.

Maka:

$$
n=4.
$$

## Step 2 — Variables

Kita punya setidaknya tiga analytical variables yang terlihat:

- quiz ratio $q$;
- completion ratio $c$;
- study duration $t$.

Participant name dipakai sebagai identifier/label manusia.

## Step 3 — Observed values

Untuk Alya:

$$
q_1=0.80,
\qquad
c_1=0.75,
\qquad
 t_1=45.
$$

## Step 4 — Units dan semantics

- $q_1=0.80$: $8$ benar dari $10$ soal;
- $c_1=0.75$: $6$ selesai dari $8$ unit;
- $t_1=45$: $45$ menit study duration.

Meskipun ketiganya ditulis dengan angka, unit dan maknanya berbeda.

## Step 5 — Jangan campur units secara sembarang

Expression seperti:

$$
0.80+45
$$

secara arithmetic dapat dihitung.

Tetapi hasil $45.80$ tidak otomatis mempunyai interpretation statistik yang meaningful karena kita menjumlahkan ratio dengan menit tanpa definisi transformasi yang jelas.

## Step 6 — Pertanyaan statistik yang masuk akal

Satu variabel:

> “Bagaimana nilai quiz ratio tersebar pada empat participant yang diamati?”

Dua variabel:

> “Pada empat participant yang diamati, apakah participant dengan study duration lebih tinggi juga terlihat mempunyai quiz ratio lebih tinggi?”

Kita belum menghitung correlation.

Kita hanya mengenali **jenis pertanyaan**.

---

# 21. Satu Variabel vs Dua Variabel

## 21.1 Pertanyaan satu variabel

Pertanyaan satu variabel (*univariate*) berfokus pada satu characteristic.

Contoh:

> “Apa nilai yang paling mewakili pusat quiz ratio?”

> “Seberapa bervariasi study duration?”

> “Bagaimana bentuk distribusi completion ratio?”

Topic berikutnya akan mulai menjawab pertanyaan tentang **center**.

## 21.2 Pertanyaan dua variabel

Pertanyaan dua variabel (*bivariate*) melihat dua characteristics pada observations yang sama.

Contoh:

> “Bagaimana study duration dan quiz ratio terlihat bergerak bersama?”

> “Apakah completion ratio berbeda menurut track?”

Topic 07 nanti membahas covariance, correlation, dan association untuk dua variabel numerik.

## Safety

Dua variabel bergerak bersama tidak berarti salah satunya menyebabkan yang lain.

Causal reasoning bukan scope Topic 01.

---

# 22. Mengapa Tipe Variabel Menentukan Summary dan Plot?

Kita belum akan mengajarkan seluruh plot/statistic sekarang.

Tetapi kita perlu memahami prinsipnya.

## Jika variabel kategorikal

Pertanyaan yang masuk akal biasanya berkaitan dengan:

- category apa yang muncul?;
- berapa count/frequency tiap category?;
- bagaimana proporsi kategori?

Mencari “mean track” dari `NLP`, `CV`, `Data` tidak masuk akal.

## Jika variabel numerik

Kita dapat bertanya tentang:

- center;
- spread;
- distribution;
- relative position;
- association dengan variabel numerik lain.

Itulah alasan Topic 01 harus ada **sebelum** Topic 02–07.

Kalau kita salah menentukan semantics dan tipe variabel, summary yang dihitung nanti dapat mathematically valid tetapi conceptually salah.

---

# 23. Ubah Satu Hal — Ubah Unit Observasi

Sekarang kita ubah **satu hal saja**.

Dataset canonical participant-level:

> satu row = satu participant.

Bayangkan sistem HerAI mulai menyimpan learning sessions:

| participant | session | study_duration_min |
|---|---:|---:|
| Alya | 1 | 20 |
| Alya | 2 | 25 |
| Bima | 1 | 30 |
| Citra | 1 | 25 |
| Citra | 2 | 30 |
| Dewi | 1 | 40 |

Sekarang:

> satu row = satu learning session.

## Apa yang berubah?

Alya dapat muncul beberapa kali karena Alya mempunyai beberapa sessions.

## Apa yang tetap?

`participant` masih dapat dipakai untuk mengetahui siapa pemilik session.

## Mengapa ini penting?

Jika seseorang menganggap semua rows sebagai “unique participants”, dia akan menghitung jumlah participant secara salah.

Dataset design menentukan interpretasi statistik.

**Rows tidak mempunyai makna universal tanpa unit-of-observation definition.**

Catatan: tabel session di atas hanya digunakan untuk menunjukkan perubahan unit observasi. Ia tidak mengganti canonical participant cohort atau menjadi sumber statistics baru untuk Topic 01.

---

# 24. Ubah Satu Hal — Ubah Encoding, Bukan Makna

Misalkan readiness category dicatat sebagai:

| readiness | code |
|---|---:|
| beginner | 1 |
| intermediate | 2 |
| advanced | 3 |

Apakah sekarang jarak antara beginner dan intermediate pasti sama dengan jarak antara intermediate dan advanced?

Belum tentu.

Kode 1, 2, 3 dapat dipakai sebagai **encoding**, tetapi arithmetic distance-nya tidak otomatis mempunyai interpretation substantif.

Ini sejalan dengan guardrail Google: digit-based values dapat mewakili categories dan tidak otomatis mempunyai numerical relationships. [R4]

---

# 25. Mengapa Ini Penting dalam AI?

Model AI tidak menerima “makna” secara magis.

Sistem menerima representations yang kita berikan.

Sebelum satu column dipakai untuk analysis atau model input, kita harus tahu:

1. **unit observasinya apa?**;
2. **variabelnya mengukur apa?**;
3. **unitnya apa?**;
4. **nilai tersebut numerik atau kategorikal?**;
5. **apakah digit hanya identifier/category code?**;
6. **apakah row-row dapat dibandingkan dengan definition yang konsisten?**;
7. **apakah missing value nanti dibedakan dari genuine zero?**;
8. **apakah feature tersebut relevan untuk tujuan sistem?**

Google menekankan bahwa numerical data untuk ML adalah values yang benar-benar berperilaku seperti numbers, sedangkan numeric-looking categorical data perlu diperlakukan berbeda. [R4]

Jadi:

> **Good AI starts with good data semantics.**

Dalam bahasa course ini:

> **Komputasi yang benar tidak menyelamatkan representasi yang salah makna.**

---

# 26. Batas Aman Produksi — Toy Score HerAI Tetap Bukan Probability

Kita masih mempunyai toy function dari topic sebelumnya:

$$
h(q,c)=0.6q+0.4c.
$$

Dan output:

- Alya: $0.78$;
- Bima: $0.61$;
- Citra: $0.94$;
- Dewi: $0.62$.

Topic 01 **tidak** mengubah semantics output tersebut.

Output itu tetap:

> instructional weighted score.

Bukan:

- probability;
- calibrated probability;
- model accuracy;
- validated production prediction;
- bukti causality;
- bukti bahwa recommendation benar.

Statistics pada observed data juga tidak otomatis mengubah toy score menjadi model yang tervalidasi.

---

# 27. Tantangan Miskonsepsi 1 — “Semua Column Adalah Numerical Variable”

## Claim

> “Karena data akhirnya disimpan di komputer sebagai angka, semua columns boleh diperlakukan sebagai numerical variables.”

## Audit

Salah.

`participant_id=101` dapat ditulis sebagai angka tetapi fungsi utamanya adalah identifier.

Postal code adalah contoh dunia nyata dari digits yang tetap bersifat kategorikal, bukan quantity. [R4]

## Rule

> **Tentukan tipe dari semantics, bukan dari format karakter.**

---

# 28. Tantangan Miskonsepsi 2 — “Satu Row Selalu Satu Orang”

## Claim

> “Row 1 sampai row $n$ selalu berarti $n$ orang.”

## Audit

Salah.

Row dapat berarti:

- participant;
- session;
- transaction;
- image;
- message;
- event.

Dalam canonical HerAI sekarang:

> satu row = satu participant.

Dalam hypothetical session table:

> satu row = satu session.

---

# 29. Tantangan Miskonsepsi 3 — “$0.80$ Berarti Probability”

## Claim

> “Karena $0.80$ berada di antara $0$ dan $1$, berarti probabilitasnya $80\%$.”

## Audit

Salah.

Range tidak menentukan semantics.

Pada HerAI:

$$
q=0.80
$$

adalah quiz ratio.

Pada konteks lain, $0.80$ dapat menjadi:

- normalized feature;
- cosine similarity;
- ratio;
- probability;
- coefficient.

Nama dan definisi variabel yang menentukan interpretation.

---

# 30. Tantangan Miskonsepsi 4 — “Feature dan Variable Persis Sama”

## Claim

> “Kalau sebuah field ada di dataset, berarti field itu pasti feature model.”

## Audit

Salah.

Dataset dapat mempunyai:

- identifiers;
- audit fields;
- timestamps;
- labels/targets;
- variables untuk analysis;
- features untuk model.

Peran sebuah field bergantung pada tujuan pipeline.

---

# 31. Tantangan Miskonsepsi 5 — “Jika Bisa Dihitung, Berarti Meaningful”

## Claim

> “Komputer bisa menghitung mean dari participant ID, jadi hasilnya valid secara statistik.”

## Audit

Arithmetic dapat berjalan tanpa error.

Tetapi semantic validity gagal.

Hal yang sama berlaku untuk menjumlahkan unit yang tidak sebanding tanpa definisi yang jelas.

> **Computable ≠ meaningful.**

---

# 32. Coba Sendiri — Audit Dataset Kecil

Diberikan schema:

| Field | Example value |
|---|---|
| `participant_id` | 1208 |
| `track` | NLP |
| `quiz_correct` | 7 |
| `quiz_total` | 10 |
| `study_duration_min` | 42 |
| `completion_ratio` | 0.625 |

Jawab tanpa menghitung mean atau variance:

1. Jika satu row mewakili satu participant, apa unit observasinya?
2. Mana identifier?
3. Mana variabel kategorikal?
4. Mana variabel numerik?
5. Mana yang merupakan count?
6. Mana yang merupakan duration measurement?
7. Apakah `participant_id=1208` berarti participant tersebut mempunyai quantity empat kali participant ID 302?
8. Apakah `completion_ratio=0.625` otomatis berarti probability $62.5\%$?
9. Tulis satu pertanyaan satu variabel.
10. Tulis satu pertanyaan dua variabel.

## Alur Jawaban yang Diharapkan

- unit observasi: participant;
- identifier: `participant_id`;
- kategorikal: `track`;
- numerik: `quiz_correct`, `quiz_total`, `study_duration_min`, `completion_ratio`;
- count: quiz correct/total;
- duration: study duration;
- identifier tidak mempunyai arithmetic quantity semantics;
- completion ratio tetap ratio completion, bukan probability kecuali didefinisikan sebagai probability;
- pertanyaan satu/double variable harus mempertahankan semantics dan unit.

---

# 33. [STATIC VISUAL] Matrix → Semantic Table

**Tujuan:** menunjukkan bahwa matrix structure belum cukup tanpa labels dan semantics.

**Initial state/data:** tampilkan hanya:

$$
\mathbf{X}
=
\begin{bmatrix}
0.80 & 0.75\\
0.60 & 0.625\\
0.90 & 1.00\\
0.70 & 0.50
\end{bmatrix}.
$$

**Learner action:** tidak ada; visual statis dua panel.

**Expected behavior:** panel kedua menambahkan:

- row labels: Alya, Bima, Citra, Dewi;
- column labels: quiz ratio $q$, completion ratio $c$;
- note: $n=4$ observations.

**Feedback:** “Struktur numerik yang sama menjadi dataset yang dapat diinterpretasikan setelah unit observasi dan variable semantics didefinisikan.”

**Safety:** jangan menambahkan label probability pada $q$ atau $c$.

---

# 34. [INTERACTIVE VISUAL] Pilih Row atau Column

**Tujuan:** membedakan observation view dan variable view.

**Initial state/data:** tabel canonical HerAI dengan $q$, $c$, study duration.

**Learner action:** klik satu row atau satu column.

**Expected behavior:**  
Jika row Alya dipilih, seluruh values Alya disorot dan label muncul:

> “Satu observation: Alya.”

Jika column $q$ dipilih, empat values disorot dan label muncul:

> “Satu variable: quiz ratio di empat observations.”

**Feedback:** learner diminta menyatakan apakah yang dipilih adalah observation atau variable.

**Safety:** row = participant hanya berlaku untuk dataset canonical ini.

---

# 35. [COMPARE VIEW] Numerical vs Categorical vs Identifier

**Tujuan:** mencegah “digit = quantitative”.

**Initial state/data:** cards:

- `participant_id = 104`;
- `study_duration_min = 40`;
- `track = NLP`;
- `completion_ratio = 0.50`.

**Learner action:** drag tiap card ke:

- identifier;
- numerical;
- categorical.

**Expected behavior:**

- participant ID → identifier;
- duration → numerical;
- track → categorical;
- completion ratio → numerical.

**Feedback:** jika participant ID dimasukkan ke numerical, tampilkan:

> “Digits belum cukup. Apakah selisih 104 dan 103 mempunyai meaning kuantitatif?”

**Safety:** jangan mengatakan identifier tidak pernah dipakai model; katakan ia tidak otomatis menjadi meaningful quantitative feature.

---

# 36. [INTERACTIVE VISUAL] Change the Observational Unit

**Tujuan:** menunjukkan bahwa row meaning mengikuti desain dataset.

**Initial state/data:** toggle:

- Participant view;
- Session view.

**Learner action:** pindah toggle.

**Expected behavior:**

Participant view:

> one row = one participant.

Session view:

> one row = one learning session; participant dapat muncul lebih dari sekali.

**Feedback:** learner menjawab “berapa observational units?” pada masing-masing view.

**Safety:** session view diberi label **illustrative structure**, bukan pengganti canonical cohort statistics.

---

# 37. [STEP-BY-STEP REVEAL] Data Reading Skill

**Tujuan:** melatih membaca notation menjadi bahasa manusia.

**Initial state/data:**

$$
q_3=0.90.
$$

**Learner action:** reveal bertahap.

**Expected behavior:**

1. $q$ → variable quiz ratio;
2. subscript $3$ → observation ke-3;
3. observation ke-3 → Citra;
4. $0.90$ → nilai quiz ratio Citra;
5. meaning → $9/10$ quiz correct pada canonical data.

**Feedback:** tampilkan warning:

> “$0.90$ adalah ratio quiz, bukan otomatis probability.”

---

# 38. Checkpoint 1 — Observasi atau Variabel?

Klasifikasikan:

1. seluruh row Bima;
2. column study duration;
3. value $55$ menit milik Citra;
4. participant name;
5. quiz ratio $q$.

## Jawaban

1. observation/record Bima;
2. variable;
3. observed value dari variable study duration;
4. identifier/label field;
5. variable numerik.

---

# 39. Checkpoint 2 — Validitas Semantik

Tentukan **meaningful / perlu definisi tambahan / tidak meaningful**.

1. Membandingkan $45$ menit dengan $30$ menit.
2. Menghitung selisih participant ID 104 dan 101 sebagai “jarak participant”.
3. Mengatakan Citra mempunyai quiz ratio lebih tinggi daripada Bima.
4. Menjumlahkan $q$ dan study duration secara langsung.
5. Menghitung frequency track `NLP`, `CV`, dan `Data`.

## Jawaban

1. meaningful;
2. tidak meaningful sebagai quantitative distance;
3. meaningful untuk observed quiz ratio;
4. perlu definisi transformasi/semantics tambahan; direct sum tidak punya unit yang jelas;
5. meaningful untuk categorical variable.

---

# 40. Checkpoint 3 — Satu atau Dua Variabel?

Klasifikasikan:

1. “Bagaimana study duration tersebar?”
2. “Bagaimana quiz ratio dan completion ratio bergerak bersama?”
3. “Track apa yang paling sering muncul?”
4. “Apakah study duration berbeda antar-track?”

## Jawaban

1. satu variabel;
2. dua variabel;
3. satu variabel kategorikal;
4. dua variabel: satu numerik + satu kategorikal.

---

# 41. Batas Cakupan — Apa yang Sengaja Belum Kita Hitung?

Topic 01 berhenti sebelum calculation-heavy Statistics.

Belum menjadi core:

- mean;
- median;
- mode;
- range;
- variance;
- standard deviation;
- histogram mechanics;
- percentile;
- quartile;
- IQR;
- formal outlier rules;
- covariance;
- correlation coefficient;
- probability;
- random variables;
- confidence intervals;
- hypothesis tests;
- $p$-values;
- statistical significance;
- sampling distributions;
- Bayes.

Bukan karena concepts tersebut tidak penting.

Mereka ditunda agar dependency tetap sehat.

---

# 42. Cek Penguasaan

Sebelum lanjut, pastikan kamu dapat mengatakan:

- [ ] **I can** mengidentifikasi unit observasi pada dataset tabular.
- [ ] **I can** menjelaskan bahwa arti satu row bergantung pada desain dataset.
- [ ] **I can** membedakan observation, record, variable, dan observed value.
- [ ] **I can** membaca satu column sebagai values dari satu variable lintas observations.
- [ ] **I can** membaca $x_i$ sebagai value variable $x$ untuk observation ke-$i$.
- [ ] **I can** membedakan numerical dan categorical variable berdasarkan semantics.
- [ ] **I can** menjelaskan discrete vs continuous pada level dasar.
- [ ] **I can** menjelaskan mengapa digit-based identifier bukan otomatis quantitative variable.
- [ ] **I can** membedakan identifier dari analytical variable.
- [ ] **I can** membedakan variable dari peran feature di machine learning.
- [ ] **I can** menyebutkan meaning dan unit dari $q$, $c$, dan study duration.
- [ ] **I can** membedakan pertanyaan satu variabel dan dua variabel.
- [ ] **I can** menjelaskan bahwa computable belum tentu meaningful.
- [ ] **I can** menjelaskan bahwa $q=0.80$ bukan otomatis probability.
- [ ] **I can** menjelaskan mengapa tipe variabel memengaruhi summary/plot yang nanti layak digunakan.

Jika empat atau lebih belum yakin, ulangi:

- Unit Observasi;
- Variable vs Observed Value;
- Numerical vs Categorical;
- Identifier Safety;
- Change the Observational Unit;
- Misconception Challenges.

---

# 43. Ringkasan

Topic 01 membangun jembatan dari Linear Algebra ke Statistics.

Kita belajar bahwa:

1. matrix yang sama dapat dibaca secara linear-algebraic dan statistical;
2. dalam canonical HerAI, satu row = satu participant observation;
3. satu column = satu variable yang dicatat lintas observations;
4. unit observasi harus didefinisikan sebelum menganalisis dataset;
5. observation, record, variable, dan observed value mempunyai fungsi yang berbeda;
6. $x_i$ berarti value variable $x$ untuk observation ke-$i$;
7. numerical variable mempunyai quantitative semantics;
8. categorical variable menyatakan category/attribute;
9. digit-based code atau identifier tidak otomatis quantitative;
10. discrete/continuous ditentukan oleh cara quantity muncul atau diukur, bukan sekadar ada decimal atau tidak;
11. variable dan feature berhubungan tetapi tidak selalu identik perannya;
12. units dan semantics harus diperiksa sebelum arithmetic;
13. pertanyaan satu variabel berbeda dari pertanyaan dua variabel;
14. tipe variabel memengaruhi summary dan visualisasi yang nanti meaningful;
15. toy score HerAI tetap bukan probability atau validated model output;
16. descriptive Statistics di submodule ini belum masuk ke formal inference.

---

# 44. Bridge ke Topic 02 — Mean, Median, Mode

Sekarang kita sudah dapat memilih satu variable dengan benar.

Misalnya quiz ratio:

$$
\mathbf{q}
=
\begin{bmatrix}
0.80\\
0.60\\
0.90\\
0.70
\end{bmatrix}.
$$

Kita tahu:

- apa unit observasinya;
- apa arti setiap value;
- bahwa $q$ adalah variable numerik;
- bahwa values tersebut berasal dari empat participant yang diamati;
- bahwa $q$ bukan probability hanya karena berada di $[0,1]$.

Pertanyaan berikutnya menjadi masuk akal:

> **Jika kita ingin menggambarkan “pusat” dari kumpulan nilai satu variable, angka apa yang sebaiknya dipakai?**

Itulah pintu masuk ke:

**Topic 02 — Mean, Median, Mode.**

---

# 45. Referensi Topic 01

Sumber lengkap, claim mapping, dan catatan verifikasi tersedia di `referensi-topic-01.md`.

- [R1] NIST/SEMATECH — *Mean Vector and Covariance Matrix*.
- [R2] OpenStax — *Definitions of Statistics, Probability, and Key Terms*.
- [R3] OpenStax — *Data, Sampling, and Variation in Data and Sampling*.
- [R4] Google for Developers — *Working with numerical data*.

---

# 46. Gerbang STOP

Topic 01 selesai pada scope:

**matrix view → statistical dataset view → unit observasi → observation/record → variable/value → semantics/units → numerical vs categorical → identifier → discrete/continuous ringan → one-variable vs two-variable intuition → AI data semantics.**

Topic 02 **belum** diproduksi di package ini.

> **Apakah Topic 01 Submodule 03 disetujui dan kita boleh melanjutkan ke Topic 02 — Mean, Median, Mode?**
