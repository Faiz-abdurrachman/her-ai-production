# Topic 01 — Loss, Objective, dan Evaluation Metric
## Apa yang Sebenarnya Diminimalkan Saat Model Belajar?

> **Posisi dalam modul:** Submodule 06 — Optimization: Dari Loss ke Parameter yang Lebih Baik  
> **Prerequisite aktif:** function, gradient, loss landscape, mean, summation, score vs probability  
> **Fokus topic:** membedakan *per-example loss*, *aggregate objective*, *evaluation metric*, dan *business/product metric* sebelum membahas minimization dan Gradient Descent.

---

## Learning Outcomes

Setelah menyelesaikan topic ini, peserta mampu:

1. menjelaskan mengapa sistem training membutuhkan kuantitas numerik yang jelas untuk dioptimalkan;
2. membedakan **per-example loss** dari **aggregate training objective**;
3. membaca dan menjelaskan

$$
J(\boldsymbol{\theta})
=
\frac{1}{n}
\sum_{i=1}^{n}
\ell^{(i)}(\boldsymbol{\theta});
$$

4. membedakan **training objective** dari **evaluation metric**;
5. menjelaskan bahwa evaluation metric dan business/product metric tidak otomatis menjadi quantity yang dioptimalkan;
6. menolak miskonsepsi bahwa *loss = probability*, *score = loss*, atau *lower training objective = otomatis sistem dunia nyata lebih baik*;
7. mengidentifikasi quantity mana yang merupakan loss, objective, metric, atau sekadar instructional score pada contoh sederhana.

---

# 1. HOOK / REAL PROBLEM — “Modelnya Membaik” Itu Maksudnya Apa?

Bayangkan dua tim mengatakan hal berikut setelah training model:

- Tim A: “Training loss turun dari $0.42$ menjadi $0.18$.”
- Tim B: “Accuracy validasi naik dari $78\%$ menjadi $80\%$.”

Sekilas keduanya terdengar seperti kabar yang sama: model menjadi lebih baik. Tetapi secara matematis, kedua angka itu **tidak memainkan peran yang sama**.

Training membutuhkan quantity yang benar-benar dipakai untuk mengarahkan perubahan parameter. Sementara evaluasi membutuhkan quantity yang membantu kita menilai apakah hasil model sesuai tujuan tertentu. Dalam machine learning, quantity yang dikurangi selama training dan quantity yang kita pedulikan saat evaluasi dapat berkaitan erat, tetapi **tidak harus identik**. Goodfellow, Bengio, dan Courville secara eksplisit membedakan optimization objective pada training dari performance measure yang sebenarnya kita pedulikan pada data yang tidak terlihat. [S1]

Masalahnya menjadi lebih serius jika semua angka diberi nama “score”. Misalnya:

- $0.18$ dapat menjadi nilai loss;
- $0.80$ dapat menjadi accuracy;
- $0.78$ dapat menjadi instructional score HerAI;
- $0.80$ juga dapat menjadi predicted probability pada konteks lain.

Nilainya sama-sama berada di sekitar nol sampai satu, tetapi **maknanya berbeda**.

> **Aturan pertama topic ini:** sebelum bertanya “bagaimana cara mengoptimalkan?”, kita harus tahu **quantity apa yang sebenarnya sedang dihitung dan apa maknanya**.

---

# 2. PREDICT — Mana yang Dipakai Training?

Perhatikan empat pernyataan berikut.

A. “Kesalahan prediksi untuk satu peserta adalah $0.12$.”  
B. “Rata-rata kesalahan pada 100 data training adalah $0.21$.”  
C. “Accuracy pada validation set adalah $84\%$.”  
D. “Persentase peserta yang menyelesaikan modul meningkat menjadi $72\%$.”

Sebelum membaca lanjut, prediksi:

- mana yang paling dekat dengan **per-example loss**?
- mana yang paling dekat dengan **aggregate objective**?
- mana yang merupakan **evaluation metric**?
- mana yang lebih dekat ke **product/business outcome**?

Tidak semua sistem menggunakan bentuk yang sama, tetapi klasifikasi ini membantu kita memisahkan peran matematis dari sekadar nama variabel.

---

# 3. INTUITION — Empat Lapisan Quantity

Kita akan memakai empat lapisan konsep.

| Lapisan | Pertanyaan utama | Contoh |
|---|---|---|
| **Per-example loss** | Seberapa buruk prediction untuk satu contoh? | loss data ke-$i$ |
| **Training objective** | Quantity agregat apa yang diarahkan untuk menjadi lebih kecil/besar selama training? | rata-rata loss training |
| **Evaluation metric** | Bagaimana kita menilai performance untuk tujuan evaluasi tertentu? | accuracy, MAE, F1, log loss |
| **Business/product metric** | Apakah sistem memberi dampak yang kita pedulikan di dunia nyata? | completion rate, retention, kepuasan |

Ada situasi di mana satu fungsi dapat dipakai baik sebagai training loss maupun evaluation metric. Dokumentasi scikit-learn, misalnya, menyediakan berbagai fungsi loss dan scoring untuk evaluasi dan menjelaskan bahwa sistem scoring dapat menggunakan metric atau loss dengan orientasi yang sesuai. [S2] Namun dari fakta bahwa suatu fungsi **bisa** digunakan di dua tempat, kita tidak boleh menyimpulkan bahwa semua objective dan metric selalu sama.

---

# 4. EXPLORE — Dari Satu Kesalahan ke Banyak Data

Misalkan sebuah model memiliki parameter $\boldsymbol{\theta}$ dan digunakan pada $n$ contoh training.

Untuk contoh ke-$i$, kita definisikan loss:

$$
\ell^{(i)}(\boldsymbol{\theta}).
$$

Bacanya:

> “loss pada contoh ke-$i$, ketika model menggunakan parameter $\boldsymbol{\theta}$.”

Nilai ini scalar: satu angka yang merangkum seberapa tidak sesuai output model terhadap target menurut aturan loss yang dipilih.

Misalkan empat contoh menghasilkan loss:

| Contoh | Loss |
|---:|---:|
| 1 | $0.20$ |
| 2 | $0.10$ |
| 3 | $0.40$ |
| 4 | $0.30$ |

Jika objective training didefinisikan sebagai rata-rata loss, maka:

$$
J(\boldsymbol{\theta})
=
\frac{0.20+0.10+0.40+0.30}{4}
=
0.25.
$$

Perhatikan perbedaannya:

- $0.40$ adalah loss untuk **satu contoh**;
- $0.25$ adalah aggregate objective untuk **sekumpulan contoh** pada parameter yang sedang digunakan.

Goodfellow et al. menuliskan training cost sebagai ekspektasi/rata-rata per-example loss pada empirical training distribution. [S1]

---

# 5. FORMAL DEFINITION — Loss dan Objective

## 5.1 Per-example loss

Kita gunakan:

$$
\ell^{(i)}(\boldsymbol{\theta})
$$

untuk menyatakan loss pada contoh ke-$i$.

Dalam bentuk lebih lengkap, loss sering bergantung pada prediction dan target, misalnya:

$$
\ell(\hat{y}^{(i)},y^{(i)}).
$$

Di topic ini kita tidak memilih satu loss function khusus sebagai “loss terbaik”. Yang penting adalah makna strukturalnya: loss memberi scalar penalty untuk satu contoh menurut aturan yang telah didefinisikan.

## 5.2 Aggregate training objective

Salah satu bentuk penting yang akan kita gunakan sepanjang Optimization adalah:

$$
J(\boldsymbol{\theta})
=
\frac{1}{n}
\sum_{i=1}^{n}
\ell^{(i)}(\boldsymbol{\theta}).
$$

Di sini $J$ adalah scalar function dari parameter. Nilai $J$ berubah ketika parameter berubah karena prediction, lalu loss per contoh, dapat ikut berubah.

> **Catatan semantic:** dalam literatur, istilah *loss*, *cost*, dan *objective* kadang dipakai dengan konvensi yang berbeda. Untuk course ini, kita sengaja memakai konvensi yang eksplisit: $\ell^{(i)}$ = per-example loss dan $J$ = aggregate objective yang menjadi target optimization. Tujuannya mencegah ambiguity, bukan mengklaim bahwa semua textbook wajib memakai nama yang sama.

---

# 6. NOTATION + FORMULA — Membaca Objective dengan Benar

Formula utama:

$$
J(\boldsymbol{\theta})
=
\frac{1}{n}
\sum_{i=1}^{n}
\ell^{(i)}(\boldsymbol{\theta}).
$$

## Arti setiap simbol

| Simbol | Makna |
|---|---|
| $J$ | aggregate objective function |
| $\boldsymbol{\theta}$ | parameter model |
| $n$ | jumlah contoh yang sedang diagregasi |
| $i$ | index contoh, dari $1$ sampai $n$ |
| $\ell^{(i)}$ | loss contoh ke-$i$ |
| $\sum$ | jumlahkan semua loss yang ditunjuk |
| $\frac{1}{n}$ | ambil rata-rata |

### Input / current state

Input matematis utama ke objective adalah parameter saat ini, $\boldsymbol{\theta}$, dengan training examples dianggap sebagai dataset/context yang sedang digunakan untuk menghitung objective.

### Operation

1. hitung loss setiap contoh;
2. jumlahkan loss;
3. bagi dengan jumlah contoh.

### Output

Output $J(\boldsymbol{\theta})$ adalah **satu scalar**.

### Units / dimensions

Jika per-example loss memiliki suatu satuan, rata-ratanya mempertahankan satuan yang sama. Banyak loss dalam ML bersifat dimensionless atau menggunakan skala yang ditentukan oleh representasi target, tetapi itu bukan alasan untuk mengklaim semua loss selalu unitless.

### Assumptions

Formula ini mengasumsikan kita memang **memilih rata-rata loss** sebagai aggregate objective. Objective lain dapat memasukkan regularization atau struktur tambahan; itu berada di boundary topic berikutnya dan Topic 08.

### What it does NOT imply

Formula ini tidak mengatakan bahwa:

- $J$ adalah probability;
- $J$ adalah accuracy;
- menurunkan $J$ pasti meningkatkan semua evaluation metric;
- menurunkan $J$ pasti meningkatkan outcome dunia nyata;
- parameter sekarang sudah optimal.

---

# 7. MATH READING SKILL — Bedakan Function dan Nilainya

Perhatikan:

$$
J(\boldsymbol{\theta})
$$

versus, misalnya,

$$
J(\boldsymbol{\theta}_0)=0.25.
$$

Yang pertama adalah **objective function** yang dapat dievaluasi pada banyak parameter.

Yang kedua adalah **nilai objective pada satu parameter tertentu**, $\boldsymbol{\theta}_0$.

Ini penting karena pada Calculus learner sudah membedakan gradient function dan gradient value. Optimization akan memakai distinction yang sama:

- objective function memberi landscape;
- current parameter menentukan posisi pada landscape;
- objective value memberi tinggi/quantity pada posisi itu.

Kita belum membahas bagaimana parameter bergerak. Itu baru Topic 03.

---

# 8. WORKED BASIC EXAMPLE — Rata-Rata Loss

Misalkan model memiliki lima per-example losses:

$$
0.10,\quad 0.30,\quad 0.20,\quad 0.50,\quad 0.40.
$$

Dengan $n=5$:

$$
J(\boldsymbol{\theta})
=
\frac{1}{5}
(0.10+0.30+0.20+0.50+0.40).
$$

Jumlah loss:

$$
0.10+0.30+0.20+0.50+0.40=1.50.
$$

Jadi:

$$
J(\boldsymbol{\theta})
=
\frac{1.50}{5}
=
0.30.
$$

### Interpretasi

- per-example loss terbesar pada tabel tersebut adalah $0.50$;
- aggregate objective adalah $0.30$;
- kita **belum bisa** menyimpulkan accuracy, probability, atau business performance dari angka $0.30$ tanpa definisi lain.

---

# 9. WORKED HerAI / AI EXAMPLE — Score Bukan Loss

Persistent HerAI running case memakai instructional score:

$$
h(q,c)=0.6q+0.4c.
$$

Untuk Alya, $q=0.80$ dan $c=0.75$, sehingga:

$$
h(0.80,0.75)
=
0.6(0.80)+0.4(0.75)
=
0.48+0.30
=
0.78.
$$

Angka $0.78$ adalah **instructional weighted score** pada running case. Ia bukan otomatis:

- probability $78\%$;
- confidence;
- training loss;
- aggregate objective;
- production recommendation rule.

Sekarang kita boleh mendefinisikan quantity baru secara **synthetic / hypothetical / instructional**, misalnya:

$$
R(q,c)
=
\left(h(q,c)-0.75\right)^2.
$$

Untuk Alya:

$$
R(0.80,0.75)
=
(0.78-0.75)^2
=
0.03^2
=
0.0009.
$$

Di sinilah distinction penting muncul:

- $h(q,c)$ tetap score;
- $R(q,c)$ adalah **hypothetical squared deviation** yang baru kita definisikan untuk demonstrasi matematika;
- mendefinisikan $R$ **tidak** mengubah $h$ menjadi loss production HerAI;
- kita belum mengatakan bahwa HerAI benar-benar harus meminimalkan $R$.

> **Safety boundary:** real training objectives harus ditentukan dari task, target, data, dan design system yang nyata. Toy wrapper di atas hanya menjaga continuity antar-submodule.

---

# 10. CHANGE ONE THING — Objective Sama, Metric Bisa Berbeda

Misalkan dua candidate parameter states menghasilkan:

| State | Training objective $J$ | Validation accuracy |
|---|---:|---:|
| A | $0.24$ | $82\%$ |
| B | $0.20$ | $80\%$ |

State B memiliki objective training lebih rendah, tetapi validation accuracy pada contoh ini lebih rendah.

Apakah tabel ini berarti training loss “buruk”? Tidak. Apakah berarti accuracy selalu lebih penting? Juga tidak.

Tabel ini hanya menunjukkan satu prinsip:

> **Quantity yang dioptimalkan dan quantity yang dievaluasi harus disebutkan secara eksplisit. Hubungannya perlu diperiksa, bukan diasumsikan.**

Goodfellow et al. menjelaskan bahwa pada machine learning kita sering menurunkan training cost sebagai cara tidak langsung untuk memperbaiki performance yang sebenarnya kita pedulikan. [S1]

---

# 11. EVALUATION METRIC — Apa Perannya?

Evaluation metric adalah aturan numerik untuk mengukur aspek tertentu dari model/prediction. Contohnya bergantung task:

- classification: accuracy, precision, recall, F1, log loss;
- regression: mean absolute error, mean squared error, $R^2$;
- ranking/recommendation: metric ranking tertentu sesuai task.

Dokumentasi scikit-learn memisahkan API untuk scoring/evaluation dan menyediakan berbagai metric functions untuk menilai prediction quality. [S2]

Satu metric tidak merangkum semua kualitas sistem. Misalnya, accuracy tidak otomatis memberi informasi tentang calibration; F1 menekankan trade-off tertentu; product completion rate bahkan berada di level yang berbeda dari prediction metric.

Karena itu kalimat seperti:

> “Metric naik, berarti semuanya lebih baik.”

terlalu kuat tanpa menyebut metric mana, dataset apa, kondisi apa, dan tujuan apa.

---

# 12. BUSINESS / PRODUCT METRIC — Boundary yang Harus Dijaga

HerAI bisa memiliki product outcome seperti:

- completion rate;
- peserta kembali belajar;
- penggunaan materi yang direkomendasikan;
- kepuasan peserta;
- fairness antar kelompok;
- operational constraints.

Tetapi product metric **tidak otomatis differentiable training objective** dan tidak otomatis bisa dimasukkan ke Gradient Descent secara langsung.

Bahkan ketika objective training dirancang agar selaras dengan product goal, hubungan itu tetap perlu dievaluasi pada data dan konteks nyata.

Inilah alasan Optimization tidak boleh disamakan dengan keseluruhan ML/product system.

---

# 13. WHY THIS MATTERS IN AI

Jika loss, objective, dan metric bercampur, beberapa kesalahan reasoning mudah terjadi:

1. **Salah membaca dashboard** — training loss turun dianggap sama dengan accuracy naik.
2. **Salah memilih target optimization** — metric bisnis langsung diperlakukan sebagai differentiable loss tanpa design yang sah.
3. **Salah memberi makna angka** — loss $0.2$ disebut “model yakin $80\%$”.
4. **Salah menilai generalization** — training objective membaik dianggap unseen performance pasti membaik.
5. **Salah memahami optimizer** — optimizer dianggap memilih “apa yang baik”, padahal optimizer hanya bekerja terhadap objective yang kita definisikan.

Optimization adalah mesin yang kuat, tetapi mesin itu mengikuti objective. **Definisi objective adalah keputusan modeling**, bukan fakta otomatis yang diberikan oleh Gradient Descent.

---

# 14. MISCONCEPTION CHALLENGE

Tentukan apakah pernyataan berikut benar atau keliru.

### Pernyataan 1

> “Kalau loss = $0.2$, berarti probability benar model adalah $80\%$.”

**Keliru.** Loss dan probability adalah jenis quantity berbeda. Hubungan tertentu hanya ada jika definisi loss/model memang membangun hubungan tersebut, dan bahkan predicted probability tidak otomatis berarti calibrated real-world correctness.

### Pernyataan 2

> “Objective selalu sama dengan evaluation metric.”

**Keliru.** Kadang satu fungsi dapat dipakai di kedua peran, tetapi keduanya memiliki fungsi konseptual berbeda: objective mengarahkan optimization; metric mengukur performance untuk evaluasi.

### Pernyataan 3

> “Kalau training objective turun, sistem production pasti lebih baik.”

**Keliru.** Training objective lebih rendah hanya memberi informasi tentang quantity tersebut pada context training yang dihitung. Generalization dan product outcomes perlu evaluasi terpisah.

### Pernyataan 4

> “HerAI score $h(q,c)$ boleh langsung disebut loss karena bentuknya scalar.”

**Keliru.** Scalar bukan berarti loss. Semantics quantity ditentukan oleh definisinya. $h(q,c)$ sudah dikunci sebagai instructional weighted score.

---

# 15. TRY IT YOURSELF

Diberikan per-example losses:

$$
0.15,\quad0.25,\quad0.10,\quad0.30.
$$

1. Hitung aggregate mean objective.
2. Apakah hasil tersebut dapat langsung disebut “accuracy”? Jelaskan satu kalimat.
3. Jika validation accuracy adalah $86\%$, mana yang menjadi training objective dan mana yang menjadi evaluation metric?

**Checkpoint jawaban singkat:**

$$
J
=
\frac{0.15+0.25+0.10+0.30}{4}
=
0.20.
$$

$0.20$ adalah objective pada definisi soal, bukan accuracy. $86\%$ adalah validation accuracy sebagai evaluation metric.

---

# 16. VISUAL / INTERACTIVE SPEC

## [COMPARE VIEW] Empat Quantity, Empat Peran

**Learning purpose:** membedakan per-example loss, aggregate objective, evaluation metric, dan product metric.  
**Initial state/data:** empat kartu dengan angka $0.40$, $0.25$, $84\%$, dan $72\%$ tanpa label.  
**Learner action:** drag setiap angka ke kategori yang tepat berdasarkan deskripsi konteks.  
**Expected behavior:** sistem meminta learner membaca deskripsi, bukan menebak dari rentang angka.  
**Feedback:** setelah drop, tampil alasan semantic: “nilai ini berasal dari satu example”, “nilai ini rata-rata training loss”, dan seterusnya.  
**Safety / interpretation note:** angka yang sama dapat memiliki semantic berbeda; range numerik tidak menentukan apakah quantity adalah loss atau probability.

## [STEP-BY-STEP REVEAL] Dari $\ell^{(i)}$ ke $J$

**Learning purpose:** membangun aggregate objective dari individual losses.  
**Initial state/data:** empat per-example loss: $0.20,0.10,0.40,0.30$.  
**Learner action:** klik `Next` untuk reveal sum, division by $n$, lalu result.  
**Expected behavior:** urutan menunjukkan $\sum_i \ell^{(i)}$ lalu $\frac1n\sum_i \ell^{(i)}$.  
**Feedback:** setiap step menamai operation dan output.  
**Safety / interpretation note:** objective yang ditampilkan adalah mean loss karena itulah definition pada contoh; aggregate objective tidak selalu harus berbentuk mean loss sederhana.

---

# 17. CHECKPOINT

Coba jawab tanpa melihat bagian sebelumnya:

1. Apa perbedaan $\ell^{(i)}$ dan $J$?
2. Mengapa $J=0.2$ tidak boleh langsung diterjemahkan sebagai probability $80\%$?
3. Apakah evaluation metric selalu quantity yang dioptimalkan?
4. Mengapa $h(q,c)$ HerAI tidak boleh diam-diam disebut loss?
5. Apa yang harus dicek ketika training objective turun tetapi validation metric memburuk?

Jika nomor 1–4 belum bisa dijelaskan dengan kata-kata sendiri, ulangi bagian Formal Definition sampai Worked HerAI Example sebelum lanjut.

---

# 18. MASTERY CHECK — “I Can…”

Setelah topic ini, saya bisa:

- [ ] menjelaskan per-example loss;
- [ ] menghitung mean aggregate objective pada dataset kecil;
- [ ] membaca simbol $n$, $i$, $\ell^{(i)}$, $J$, dan $\boldsymbol{\theta}$;
- [ ] membedakan objective function dengan satu objective value;
- [ ] membedakan training objective dengan evaluation metric;
- [ ] menjelaskan mengapa product metric tidak otomatis menjadi training objective;
- [ ] menjaga distinction score vs probability vs loss;
- [ ] menjelaskan bahwa lower training objective tidak otomatis berarti better unseen performance.

---

# 19. SCOPE BOUNDARY

Topic ini **belum** mengajarkan:

- $\operatorname*{arg\,min}$ secara formal;
- cara menemukan minimum;
- Gradient Descent update rule;
- learning rate;
- iteration trajectory;
- full-batch vs minibatch vs stochastic gradient;
- Momentum, RMSProp, atau Adam;
- derivasi regularization;
- generalization theory.

Semua itu memiliki tempat di Topic 02–08.

Topic ini juga tidak reteach derivative/gradient. Learner sudah membawa Calculus state dari Submodule 05.

---

# 20. SUMMARY

Empat distinction yang harus dibawa ke topic berikutnya:

1. **Per-example loss** mengukur penalty pada satu example menurut loss definition.
2. **Aggregate objective** adalah scalar function terhadap parameter yang kita pilih untuk optimization; pada baseline course:

$$
J(\boldsymbol{\theta})
=
\frac1n
\sum_{i=1}^{n}
\ell^{(i)}(\boldsymbol{\theta}).
$$

3. **Evaluation metric** mengukur performance untuk tujuan evaluasi dan tidak otomatis identik dengan training objective.
4. **Business/product metric** berada pada level tujuan sistem dan tidak otomatis menjadi differentiable objective.

Dan satu safety rule yang tidak boleh hilang:

> **Loss bukan probability, score bukan otomatis loss, dan lower training objective bukan jaminan whole-system improvement.**

---

# 21. BRIDGE — Selanjutnya: Minimization

Sekarang kita sudah tahu **apa quantity yang ingin diarahkan**.

Pertanyaan berikutnya adalah:

> Jika $J(\boldsymbol{\theta})$ adalah objective, apa arti “mencari parameter yang membuat $J$ sekecil mungkin” secara matematis?

Topic 02 akan membangun minimization, minimum value versus minimizer, $\operatorname*{arg\,min}$, serta mengaktifkan kembali local/global landscape tanpa mengulang Calculus dari nol.

---

## Referensi inti topic

- **[S1]** Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*, Chapter 8: Optimization for Training Deep Models. MIT Press. https://www.deeplearningbook.org/contents/optimization.html
- **[S2]** scikit-learn developers. *Metrics and scoring: quantifying the quality of predictions*. https://scikit-learn.org/stable/modules/model_evaluation.html

> Full verification details dan source-to-claim mapping tersedia di `referensi-topic-01.md`.
