# Topic 08 — Regularization, Generalization, dan Boundary Modul

## Tujuan belajar

Setelah menyelesaikan topik ini, peserta diharapkan mampu:

1. membedakan **training objective** dari **generalization / unseen-data performance**;
2. menjelaskan mengapa lower training loss tidak otomatis berarti model lebih baik pada data baru;
3. mengenali **generalization gap** sebagai perbedaan antara perilaku pada data training dan data yang tidak dipakai untuk fitting;
4. menjelaskan regularization sebagai strategi yang dapat mengubah learning problem untuk mendorong perilaku tertentu, bukan sebagai optimizer baru;
5. membaca objective dengan penalty sederhana seperti $J_{\text{reg}}(\boldsymbol{\theta})=J_{\text{train}}(\boldsymbol{\theta})+\lambda\Omega(\boldsymbol{\theta})$;
6. menjelaskan arti $\lambda$ dan penalty term secara beginner-safe tanpa masuk ke derivasi regularization lanjutan;
7. membedakan apa yang termasuk scope Optimization dan apa yang dipindahkan ke Machine Learning / Deep Learning;
8. menjaga continuity HerAI: $h(q,c)=0.6q+0.4c$ tetap instructional score dan bukan production loss atau production model.

---

## HOOK / REAL PROBLEM — Loss training turun. Apakah model sudah “lebih baik”? 

Bayangkan dua model selesai dilatih.

| Model | Training loss | Validation/evaluation loss pada data baru |
|---|---:|---:|
| A | 0.08 | 0.31 |
| B | 0.12 | 0.18 |

Jika kita hanya melihat **training loss**, Model A tampak lebih baik karena $0.08<0.12$.

Tetapi jika tujuan sistem adalah bekerja pada data yang tidak digunakan untuk fitting, kita tidak boleh berhenti pada training loss.

Model B memiliki training loss sedikit lebih tinggi, tetapi evaluation loss pada data baru lebih rendah.

Pertanyaan pentingnya:

> Apakah optimization berhasil ketika training objective turun, atau baru berhasil ketika sistem juga bekerja baik pada data baru?

Jawabannya harus dibagi menjadi dua lapisan:

- **Optimization success:** apakah parameter berhasil bergerak untuk memperbaiki objective yang memang sedang dioptimalkan?
- **Machine-learning success:** apakah model juga bekerja baik pada contoh baru yang relevan?

Dua lapisan ini berkaitan, tetapi **bukan quantity yang sama**.

---

## PREDICT — Pilih klaim yang aman

Sebelum masuk formula, nilai tiga pernyataan berikut.

1. “Training loss lebih rendah selalu berarti model lebih baik di dunia nyata.”
2. “Optimizer yang bagus otomatis mencegah overfitting.”
3. “Regularization dapat memengaruhi objective yang dilatih, tetapi tetap tidak menjamin generalization sempurna.”

Prediksi mana yang paling aman.

Simpan jawaban Anda. Kita akan kembali ke tiga klaim ini di bagian misconception challenge.

---

## INTUITION — Optimization melihat objective yang diberikan

Optimizer tidak memiliki akses ke makna “bagus di dunia nyata” secara otomatis.

Jika kita memberi optimizer objective:

$$
J_{\text{train}}(\boldsymbol{\theta}),
$$

maka optimizer mencoba mencari parameter yang memperbaiki quantity tersebut sesuai update rule yang dipilih.

Optimizer tidak otomatis tahu:

- bagaimana performa pada data baru;
- apakah metric bisnis membaik;
- apakah recommendation lebih bermanfaat secara pendidikan;
- apakah prediction calibrated;
- apakah model adil;
- apakah hubungan yang dipelajari bersifat causal.

Karena itu, kalimat berikut harus dihindari:

> “Loss training turun, jadi model pasti sudah lebih baik.”

Kalimat yang lebih aman:

> “Training objective pada konfigurasi ini turun. Unseen-data performance perlu diperiksa dengan evaluation yang terpisah.”

---

## EXPLORE — Training error dan generalization error dapat bergerak berbeda

Secara konseptual, training set digunakan untuk fitting parameter. Data validation/test atau data evaluasi terpisah digunakan untuk menilai apakah pola yang dipelajari dapat bekerja di luar contoh training.

Contoh:

| Keadaan | Training error | Unseen/evaluation error | Interpretasi awal |
|---|---:|---:|---|
| P | tinggi | tinggi | model belum fit dengan baik / underfitting mungkin terjadi |
| Q | rendah | rendah | fit training baik dan transfer ke data baru juga baik |
| R | sangat rendah | tinggi | generalization gap besar / overfitting mungkin terjadi |

Tabel ini adalah **diagnostic intuition**, bukan diagnosis otomatis. Penyebab hasil evaluation buruk bisa lebih luas: data shift, metric yang salah, preprocessing berbeda, target yang buruk, data quality, atau problem definition yang keliru.

### Generalization gap

Untuk pembacaan sederhana, kita dapat mendefinisikan gap empiris:

$$
G
=
J_{\text{eval}}
-
J_{\text{train}},
$$

jika kedua quantity memang memakai loss/metric yang comparable.

Misalnya:

$$
J_{\text{train}}=0.10,
\qquad
J_{\text{eval}}=0.24.
$$

Maka:

$$
G=0.24-0.10=0.14.
$$

Angka $0.14$ menunjukkan ada selisih performa antara dua set tersebut **pada ukuran yang dipilih**. Angka ini bukan probability dan bukan bukti causal tentang penyebab gap.

---

# FORMAL DEFINITION — Optimization vs generalization

Dalam course ini, gunakan pemisahan berikut.

### Training objective

$$
J_{\text{train}}(\boldsymbol{\theta})
$$

adalah scalar objective yang dipakai dalam proses fitting/optimization.

### Evaluation quantity

$$
J_{\text{eval}}(\boldsymbol{\theta})
$$

adalah quantity yang dihitung pada data evaluasi terpisah untuk menilai perilaku model di luar contoh training.

Kedua quantity dapat memakai bentuk loss yang mirip, tetapi dataset dan fungsinya berbeda.

> **Lower $J_{\text{train}}$ tidak secara logis menjamin lower $J_{\text{eval}}$.**

Generalization adalah kemampuan model untuk bekerja baik pada input baru yang relevan dengan distribusi/problem yang ingin dihadapi.

Pada level foundation ini, kita cukup memahami **boundary** tersebut. Teori formal overfitting, bias-variance, model selection, cross-validation, capacity, dan statistical learning theory dipelajari lebih dalam di Machine Learning.

---

# REGULARIZATION BRIDGE — Mengubah problem, bukan “memperbaiki optimizer secara ajaib”

Salah satu bentuk regularization yang mudah dibaca adalah menambah penalty term ke objective:

$$
J_{\text{reg}}(\boldsymbol{\theta})
=
J_{\text{train}}(\boldsymbol{\theta})
+
\lambda\Omega(\boldsymbol{\theta}).
$$

Di sini:

- $J_{\text{train}}(\boldsymbol{\theta})$ = training loss/objective utama;
- $\Omega(\boldsymbol{\theta})$ = penalty yang menyatakan preference tambahan terhadap parameter/model;
- $\lambda\ge 0$ = hyperparameter yang mengontrol kekuatan penalty;
- $J_{\text{reg}}$ = objective baru yang benar-benar dioptimalkan jika penalty dimasukkan ke training objective.

Regularization **bukan optimizer**. Gradient Descent, Momentum, atau Adam masih dapat digunakan untuk mengoptimalkan objective yang sudah diberi regularization.

### Contoh penalty sederhana

Untuk satu parameter $w$, ambil:

$$
\Omega(w)=w^2.
$$

Maka:

$$
J_{\text{reg}}(w)
=
J_{\text{train}}(w)
+
\lambda w^2.
$$

Jika $\lambda=0$, penalty tidak memberi kontribusi.

Jika $\lambda>0$, parameter dengan magnitude besar mendapat tambahan cost lebih besar pada objective ini.

Ini **tidak** berarti “parameter kecil selalu lebih benar”. Penalty adalah design choice / inductive preference, dan pemilihannya harus sesuai problem.

---

# MATH READING SKILL — Membaca objective dengan regularization

Gunakan:

$$
J_{\text{reg}}(\boldsymbol{\theta})
=
J_{\text{train}}(\boldsymbol{\theta})
+
\lambda\Omega(\boldsymbol{\theta}).
$$

Baca sebagai berikut.

1. **Current input/state:** parameter saat ini adalah $\boldsymbol{\theta}$.
2. **Data-fit term:** $J_{\text{train}}$ mengukur objective pada training data.
3. **Preference/penalty term:** $\Omega$ memberi tambahan cost berdasarkan property parameter/model tertentu.
4. **Strength control:** $\lambda$ mengatur seberapa kuat penalty ikut memengaruhi objective.
5. **Output:** $J_{\text{reg}}$ tetap scalar.
6. **Optimization consequence:** jika objective training berubah menjadi $J_{\text{reg}}$, gradient yang dihitung juga berasal dari objective baru tersebut.
7. **Units/dimensions:** penjumlahan dua term harus dibuat bermakna/compatible melalui definisi dan scaling yang sesuai; jangan menganggap $\lambda$ universally unitless tanpa konteks.
8. **Non-implication:** penalty tidak menjamin global optimum, generalization sempurna, fairness, calibration, causal validity, atau production quality.

---

# WORKED BASIC EXAMPLE — Training fit vs penalty

Definisikan synthetic objective satu parameter:

$$
J_{\text{train}}(w)=(w-3)^2.
$$

Tanpa penalty, titik terbaik training objective adalah:

$$
w=3,
$$

karena:

$$
J_{\text{train}}(3)=0.
$$

Sekarang tambahkan penalty:

$$
J_{\text{reg}}(w)
=
(w-3)^2+0.5w^2.
$$

Bandingkan dua candidate parameter.

### Candidate A: $w=3$

$$
J_{\text{train}}(3)=0,
$$

$$
0.5(3)^2=4.5,
$$

jadi:

$$
J_{\text{reg}}(3)=4.5.
$$

### Candidate B: $w=2$

$$
J_{\text{train}}(2)=1,
$$

$$
0.5(2)^2=2,
$$

jadi:

$$
J_{\text{reg}}(2)=3.
$$

Walaupun $w=3$ memiliki **training-fit term** lebih kecil, objective regularized pada dua candidate ini justru lebih kecil di $w=2$:

$$
3<4.5.
$$

Pesan penting:

> Menambah regularization dapat mengubah parameter mana yang lebih disukai oleh training objective.

Tetapi contoh ini **belum membuktikan** $w=2$ akan generalize lebih baik. Untuk claim generalization, kita tetap membutuhkan evaluation terpisah.

---

# CHANGE ONE THING — Apa yang terjadi ketika $\lambda$ berubah?

Gunakan candidate $w=3$ dan $w=2$ yang sama.

### Jika $\lambda=0$

$$
J_{\text{reg}}(w)=J_{\text{train}}(w).
$$

Training fit sepenuhnya menentukan objective.

### Jika $\lambda$ diperbesar

Penalty terhadap $w^2$ menjadi lebih penting dalam objective.

Artinya, optimizer mendapat problem yang berbeda karena objective-nya juga berbeda.

Kita **tidak** menyimpulkan bahwa semakin besar $\lambda$ semakin baik. Terlalu kuat regularization dapat mengorbankan fit terhadap data dan bahkan menghasilkan underfitting. Pemilihan $\lambda$ adalah hyperparameter/model-selection problem yang dibahas lebih lanjut di Machine Learning.

---

# WORKED HerAI / AI EXAMPLE — Jangan mengubah canonical score menjadi loss

Canonical HerAI score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Score ini hanya **instructional weighted score**.

Untuk menjelaskan regularization, kita buat parameter terpisah:

$$
w_{\text{syn}}
$$

sebagai **synthetic / hypothetical / instructional parameter**.

Misalkan synthetic training objective adalah:

$$
J_{\text{train}}(w_{\text{syn}})
=
(w_{\text{syn}}-0.8)^2.
$$

Lalu tambahkan synthetic penalty:

$$
J_{\text{reg}}(w_{\text{syn}})
=
(w_{\text{syn}}-0.8)^2
+
0.1w_{\text{syn}}^2.
$$

Tujuan contoh ini hanya menunjukkan bahwa training objective dapat memiliki **data-fit term + penalty term**.

Contoh tersebut tidak berarti:

- weight $0.6$ dan $0.4$ pada $h(q,c)$ harus dilatih;
- $h(q,c)$ adalah loss;
- $w_{\text{syn}}$ adalah production parameter;
- regularized toy objective menjamin recommendation HerAI lebih baik;
- optimization result membuktikan causal effect quiz/completion terhadap learning outcome.

---

# WHY THIS MATTERS IN AI — Training success bukan seluruh system success

Dalam AI, kita sering melihat dashboard training yang berisi loss curve. Curve ini sangat berguna, tetapi maknanya terbatas.

Training loss dapat membantu menjawab:

> Apakah optimizer berhasil memperbaiki objective pada data yang digunakan untuk training?

Training loss sendiri tidak cukup menjawab:

> Apakah model bekerja baik pada data baru?

Dan bahkan evaluation metric yang baik belum otomatis menjawab:

> Apakah sistem aman, adil, calibrated, causally valid, dan benar-benar memberi manfaat pada pengguna?

Itulah alasan boundary ini diletakkan di akhir Submodule Optimization: peserta harus keluar dari modul dengan kemampuan membedakan **mathematical optimization success** dari **broader ML/system success**.

---

# MISCONCEPTION CHALLENGE

## Klaim 1 — “Training loss paling rendah berarti model terbaik.”

**Salah sebagai klaim universal.** Training objective hanya mengukur quantity pada konteks training. Unseen performance perlu evaluation terpisah.

## Klaim 2 — “Regularization adalah optimizer.”

**Salah.** Regularization dapat mengubah objective/problem. Gradient Descent, Momentum, Adam, dan optimizer lain kemudian dapat digunakan untuk mengoptimalkan objective tersebut.

## Klaim 3 — “Regularization selalu membuat training loss turun.”

**Salah.** Regularization bahkan dapat mengorbankan pure training fit karena objective sekarang mempertimbangkan penalty tambahan.

## Klaim 4 — “Semakin kuat regularization semakin baik generalization.”

**Tidak aman.** Strength yang terlalu tinggi dapat menghasilkan underfitting. Hyperparameter selection berada di boundary Machine Learning.

## Klaim 5 — “Optimizer yang lebih canggih otomatis mencegah overfitting.”

**Salah.** Optimizer dan generalization adalah masalah yang berbeda walaupun saling berinteraksi.

## Klaim 6 — “$h(q,c)$ bisa dijadikan regularized production objective HerAI.”

**Tidak dari materi ini.** $h(q,c)$ tetap instructional score, bukan production loss/objective.

---

# TRY IT YOURSELF — Diagnosis satu eksperimen

Dua konfigurasi menghasilkan:

| Konfigurasi | Training loss | Evaluation loss |
|---|---:|---:|
| X | 0.05 | 0.28 |
| Y | 0.09 | 0.15 |

Jawab:

1. konfigurasi mana yang memiliki training objective lebih rendah?
2. konfigurasi mana yang memiliki evaluation loss lebih rendah?
3. apakah cukup informasi untuk menyebut salah satunya “production-ready”?

### Jawaban singkat

1. X memiliki training loss lebih rendah.
2. Y memiliki evaluation loss lebih rendah.
3. Belum. Kita belum menilai reliability, subgroup behavior, calibration bila relevan, data shift, product metric, safety, dan banyak aspek deployment lainnya.

---

# VISUAL / INTERACTIVE SPEC

[COMPARE VIEW]

**Learning purpose:** membedakan training objective dan unseen/evaluation performance.  
**Initial state/data/function:** tampilkan tiga model dengan pasangan nilai $(J_{\text{train}},J_{\text{eval}})$ berbeda.  
**Learner action:** pilih model berdasarkan training loss saja, lalu toggle evaluation loss.  
**Expected behavior:** learner melihat ranking model dapat berubah ketika quantity yang dinilai berubah.  
**Feedback:** sistem menanyakan “quantity mana yang sedang Anda optimalkan, dan quantity mana yang sedang Anda evaluasi?”  
**Safety / interpretation note:** evaluation loss lebih rendah pun tidak otomatis berarti production system lebih baik secara keseluruhan.

[NUMBER MANIPULATOR]

**Learning purpose:** memahami trade-off sederhana pada regularized objective.  
**Initial state/data/function:** $J_{\text{reg}}(w)=(w-3)^2+\lambda w^2$ dengan slider $w$ dan $\lambda$.  
**Learner action:** ubah $w$ dan $\lambda$.  
**Expected behavior:** tampilkan data-fit term, penalty term, dan total objective secara terpisah.  
**Feedback:** highlight kapan parameter dengan training fit terbaik bukan parameter dengan regularized objective terkecil.  
**Safety / interpretation note:** visual tidak boleh mengatakan nilai $\lambda$ tertentu “paling generalize” tanpa data evaluation.

[STATIC VISUAL]

**Learning purpose:** memperjelas boundary modul.  
**Initial state/data/function:** diagram tiga lapisan: Optimization → ML Evaluation/Generalization → Production/System Evaluation.  
**Learner action:** baca alur dari kiri ke kanan.  
**Expected behavior:** learner melihat setiap lapisan menjawab pertanyaan berbeda.  
**Feedback:** sertakan contoh quantity di tiap lapisan.  
**Safety / interpretation note:** lapisan tidak sepenuhnya independen, tetapi tidak boleh disamakan.

---

# CHECKPOINT

Sebelum lanjut, pastikan Anda dapat menjawab:

1. Apa beda $J_{\text{train}}$ dan $J_{\text{eval}}$?
2. Mengapa lower training loss tidak otomatis berarti better generalization?
3. Apa fungsi $\lambda\Omega(\boldsymbol{\theta})$ dalam regularized objective?
4. Mengapa regularization bukan optimizer?
5. Mengapa $h(q,c)$ tidak boleh diam-diam dijadikan production loss HerAI?

Jika satu jawaban masih kabur, kembali ke bagian formal definition dan worked examples.

---

# MASTERY CHECK — “I can…”

Setelah Topic 08, saya dapat mengatakan:

- **I can** membedakan optimization objective dan evaluation/generalization quantity.
- **I can** menjelaskan mengapa lower training loss tidak menjamin better unseen performance.
- **I can** membaca regularized objective dengan data-fit term, penalty, dan strength $\lambda$.
- **I can** menjelaskan bahwa regularization bukan optimizer.
- **I can** mengenali generalization gap secara konseptual tanpa menganggapnya sebagai probability atau causal proof.
- **I can** menjelaskan boundary antara Optimization, Machine Learning, dan production evaluation.
- **I can** menjaga canonical HerAI score tetap instructional, bukan production loss.

---

# SCOPE BOUNDARY — Apa yang sengaja tidak dibahas mendalam di sini?

Topic 08 **tidak** mengajarkan secara penuh:

- statistical learning theory;
- VC dimension;
- formal bias-variance derivation;
- cross-validation algorithms;
- hyperparameter-search systems;
- early stopping mechanics;
- dropout mechanics;
- full $L_1$ / $L_2$ derivations;
- Bayesian regularization;
- data augmentation;
- label smoothing;
- detailed capacity theory;
- production monitoring;
- fairness auditing;
- calibration procedures;
- causal inference;
- distribution-shift mitigation.

Topik-topik tersebut masuk Machine Learning, Deep Learning, evaluation, atau production system design.

Yang wajib dikuasai di Math for AI adalah boundary fundamental:

> **Optimization memperbaiki objective yang kita definisikan; generalization dan real-world quality harus dievaluasi dengan pertanyaan dan data yang lebih luas.**

---

# SUMMARY

Pada Submodule Optimization kita telah bergerak dari:

$$
\text{loss/objective}
\rightarrow
\text{minimization}
\rightarrow
\text{gradient update}
\rightarrow
\text{learning rate}
\rightarrow
\text{iterations}
\rightarrow
\text{batch/minibatch/stochastic}
\rightarrow
\text{Momentum/Adam}
\rightarrow
\text{generalization boundary}.
$$

Topic 08 mengunci bahwa:

1. training objective dan unseen performance bukan quantity yang sama;
2. lower training loss bukan jaminan better generalization;
3. regularization dapat menambahkan preference/penalty ke objective;
4. regularization bukan optimizer;
5. optimizer tidak otomatis menyelesaikan overfitting;
6. deep generalization theory dipindahkan ke Machine Learning;
7. $h(q,c)=0.6q+0.4c$ tetap instructional score only.

---

# BRIDGE — Optimization → Integrated Case Study

Setelah delapan Topic Optimization, learner sudah mempunyai seluruh komponen untuk membaca tiny training loop:

$$
\text{objective}
\rightarrow
\text{gradient}
\rightarrow
\text{parameter update}
\rightarrow
\text{repeat}
\rightarrow
\text{evaluate separately}.
$$

Submodule berikutnya, **Integrated Case Study: Math for AI di HerAI**, tidak menambah cabang matematika baru. Fungsinya adalah menyatukan:

- representation;
- statistics;
- probability;
- score vs probability;
- loss;
- gradient;
- parameter update;
- evaluation boundary;

ke satu cerita matematika end-to-end yang tetap synthetic/instructional dan tidak berpura-pura sebagai production recommendation algorithm.
