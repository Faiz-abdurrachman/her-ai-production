# Topic 04 — Learning Rate
## Seberapa Besar Langkah Parameter Harus Bergerak?

> **Posisi dalam modul:** Submodule 06 — Optimization: Dari Loss ke Parameter yang Lebih Baik  
> **Prerequisite aktif:** Topic 01 (loss/objective/evaluation metric), Topic 02 (minimization dan landscape), Topic 03 (Gradient Descent update rule), serta derivative/gradient dari Calculus  
> **Fokus topic:** memahami learning rate sebagai **pengontrol besar langkah** pada update Gradient Descent, membandingkan beberapa learning rate dari current state yang sama, membaca overshoot secara matematis, dan menolak klaim “semakin besar semakin cepat” atau “semakin kecil semakin aman”.  
> **Belum dibahas mendalam:** multi-iteration training trajectory, convergence analysis, learning-rate schedules, line search, full-batch/minibatch/stochastic gradient, Momentum, Adam, atau hyperparameter tuning system.

---

## Learning Outcomes

Setelah menyelesaikan topic ini, peserta mampu:

1. menjelaskan fungsi learning rate $\eta$ pada aturan update Gradient Descent;
2. membedakan **gradient direction** dari **step magnitude**;
3. membaca hubungan antara $\eta$, gradient, update displacement, dan next parameter;
4. menghitung satu update dari current state yang sama menggunakan beberapa nilai $\eta$;
5. membandingkan objective value setelah one-step update tanpa menggeneralisasi terlalu jauh;
6. menjelaskan secara beginner-safe mengapa learning rate terlalu besar dapat menyebabkan overshoot atau bahkan objective meningkat pada contoh tertentu;
7. menjelaskan bahwa learning rate sangat kecil dapat menghasilkan perpindahan kecil, tetapi tidak otomatis “lebih baik” atau “lebih aman” secara universal;
8. memahami bahwa learning rate tidak selalu tepat disebut “unitless”; yang penting, scaled gradient harus menghasilkan displacement yang kompatibel dengan parameter;
9. mempertahankan semantic boundary HerAI: $h(q,c)=0.6q+0.4c$ tetap instructional score, bukan production loss;
10. menjelaskan bahwa pemilihan learning rate tidak menjamin global optimum, convergence, generalization, fairness, calibration, atau kualitas sistem dunia nyata.

---

# 1. HOOK / REAL PROBLEM — Arah Sudah Benar, Tapi Seberapa Jauh?

Pada Topic 03 kita sudah memakai aturan update:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_{t}
-
\eta\nabla J(\boldsymbol{\theta}_{t}).
$$

Kita sudah memahami bahwa negative sign membuat perpindahan bergerak berlawanan dengan local steepest-increase direction dalam interpretasi Euclidean standar.

Tetapi masih ada satu pertanyaan penting:

> **Berapa besar kita harus bergerak?**

Misalkan objective sederhana:

$$
J(w)=(w-3)^2.
$$

Pada current parameter:

$$
w_0=0,
$$

derivative-nya:

$$
J'(w)=2(w-3),
$$

sehingga:

$$
J'(0)=-6.
$$

Arah local decrease sudah jelas: bergerak ke kanan.

Namun apakah kita bergerak ke:

$$
w_1=0.06,
$$

atau

$$
w_1=1.5,
$$

atau

$$
w_1=7.2?
$$

Semua bisa berasal dari **gradient yang sama**, tetapi learning rate yang berbeda.

Jadi learning rate bukan penentu arah utama. Learning rate mengatur **skala langkah** yang diambil dari informasi gradient.

---

# 2. PREDICT — Kalau $\eta$ Diperbesar 10 Kali, Apa yang Berubah?

Untuk scalar parameter, aturan update adalah:

$$
w_{t+1}=w_t-\eta J'(w_t).
$$

Misalkan current state tetap:

$$
w_t=0,
\qquad
J'(w_t)=-6.
$$

Bandingkan dua learning rate:

$$
\eta_A=0.01,
\qquad
\eta_B=0.10.
$$

Sebelum menghitung, prediksi:

1. apakah arah perpindahan berubah?
2. apakah displacement dengan $\eta_B$ akan sepuluh kali displacement dengan $\eta_A$?
3. apakah learning rate yang lebih besar **pasti** menghasilkan objective yang lebih baik?

Untuk gradient dan current state yang sama, scaling memang linear terhadap $\eta$:

$$
-\eta_B J'(w_t)
=
10\left[-\eta_A J'(w_t)\right].
$$

Tetapi pertanyaan ketiga belum bisa dijawab hanya dari “lebih besar”. Kita harus melihat **fungsi dan titik hasil update**.

---

# 3. INTUITION — Pisahkan Direction dan Step Magnitude

Pada update:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_{t}
-
\eta\nabla J(\boldsymbol{\theta}_t),
$$

ada dua gagasan yang mudah tercampur.

## 3.1 Direction

Dalam basic Gradient Descent, direction berasal dari:

$$
-\nabla J(\boldsymbol{\theta}_t).
$$

Untuk $\eta>0$, learning rate tidak membalik arah tersebut; ia melakukan scaling.

## 3.2 Magnitude

Learning rate $\eta$ mengubah besar displacement:

$$
\Delta\boldsymbol{\theta}_t
=
-\eta\nabla J(\boldsymbol{\theta}_t).
$$

Jika gradient tetap, learning rate yang dua kali lebih besar menghasilkan displacement vector dua kali lebih panjang.

Tetapi setelah parameter berpindah, gradient pada titik baru dapat berubah. Karena itu hubungan antar-iterasi tidak sesederhana “learning rate besar = selalu lebih cepat”.

> **Topic 04 fokus pada satu langkah dan comparison dari starting point yang sama. Multi-iteration trajectory dibahas pada Topic 05.**

---

# 4. EXPLORE — Same State, Same Gradient, Different Learning Rates

Gunakan kembali:

$$
J(w)=(w-3)^2,
\qquad
w_0=0,
\qquad
J'(0)=-6.
$$

Objective awal:

$$
J(0)=9.
$$

Sekarang gunakan beberapa learning rate.

## 4.1 Sangat kecil pada contoh ini: $\eta=0.01$

Displacement:

$$
-\eta J'(0)
=
-(0.01)(-6)
=
0.06.
$$

Next parameter:

$$
w_1=0+0.06=0.06.
$$

Objective setelah update:

$$
J(0.06)
=
(0.06-3)^2
=
8.6436.
$$

Objective turun dari $9$ menjadi $8.6436$, tetapi perpindahan parameter kecil.

## 4.2 Sedang pada contoh ini: $\eta=0.25$

Displacement:

$$
-(0.25)(-6)=1.5.
$$

Maka:

$$
w_1=1.5,
$$

serta:

$$
J(1.5)=2.25.
$$

## 4.3 Tepat mengenai minimum pada contoh khusus ini: $\eta=0.5$

Displacement:

$$
-(0.5)(-6)=3.
$$

Sehingga:

$$
w_1=3,
$$

serta:

$$
J(3)=0.
$$

**Jangan generalisasi** bahwa $\eta=0.5$ adalah learning rate “terbaik”. Nilai ini kebetulan tepat untuk starting point dan quadratic function yang sangat sederhana ini.

## 4.4 Melewati minimum tetapi masih lebih baik pada contoh ini: $\eta=0.75$

Displacement:

$$
-(0.75)(-6)=4.5.
$$

Maka:

$$
w_1=4.5,
$$

serta:

$$
J(4.5)=2.25.
$$

Parameter melewati $w=3$, tetapi objective masih lebih rendah daripada objective awal.

## 4.5 Terlalu besar pada contoh ini: $\eta=1.2$

Displacement:

$$
-(1.2)(-6)=7.2.
$$

Next parameter:

$$
w_1=7.2.
$$

Objective:

$$
J(7.2)
=
(7.2-3)^2
=
17.64.
$$

Sekarang objective justru **lebih besar** daripada nilai awal $9$.

Ini menunjukkan bahwa direction lokal yang benar tidak cukup untuk menjamin outcome baik jika step terlalu panjang untuk landscape yang sedang dihadapi.

---

# 5. FORMAL DEFINITION — Apa Itu Learning Rate?

Untuk basic Gradient Descent:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta\nabla J(\boldsymbol{\theta}_t),
\qquad
\eta>0.
$$

Dalam topic ini:

> **Learning rate $\eta$ adalah positive scalar yang mengontrol skala langkah yang diambil berdasarkan gradient pada current parameter.**

Sumber akademik *Deep Learning* menjelaskan learning rate sebagai positive scalar yang menentukan ukuran step dalam steepest descent. Dokumentasi resmi PyTorch juga memperlakukan `lr` sebagai optimizer option yang mengendalikan update parameter.

Learning rate sering disebut **hyperparameter**, karena ia biasanya ditentukan oleh practitioner/training procedure, bukan menjadi parameter model yang dipelajari dengan update rule yang sama.

Tetapi jangan menyimpulkan:

- larger $\eta$ selalu lebih cepat;
- smaller $\eta$ selalu lebih aman;
- ada satu nilai $\eta$ universal untuk semua objective;
- learning rate saja menentukan convergence.

---

# 6. NOTATION + FORMULA — Di Mana Tepatnya $\eta$ Bekerja?

Aturan update:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta\nabla J(\boldsymbol{\theta}_t).
$$

Definisikan:

- $\boldsymbol{\theta}_t$: current parameter vector;
- $J$: objective yang diminimalkan;
- $\nabla J(\boldsymbol{\theta}_t)$: gradient pada current state;
- $\eta$: positive learning rate;
- $-\eta\nabla J(\boldsymbol{\theta}_t)$: update displacement;
- $\boldsymbol{\theta}_{t+1}$: next parameter state.

Learning rate bekerja melalui scaling:

$$
\text{scaled gradient}
=
\eta\nabla J(\boldsymbol{\theta}_t).
$$

Kemudian negative sign menghasilkan opposite-gradient displacement:

$$
\Delta\boldsymbol{\theta}_t
=
-\eta\nabla J(\boldsymbol{\theta}_t).
$$

Akhirnya:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
+
\Delta\boldsymbol{\theta}_t.
$$

---

# 7. MATH READING SKILL — Baca Satu Update Tanpa Menghafal

Misalkan:

$$
w_t=2,
\qquad
J'(w_t)=4,
\qquad
\eta=0.1.
$$

Update:

$$
w_{t+1}
=
2-(0.1)(4)
=
1.6.
$$

Baca secara verbal:

1. **current state** adalah $2$;
2. **local slope information** adalah $4$;
3. learning rate $0.1$ membuat scaled gradient bernilai $0.4$;
4. negative sign membuat displacement menjadi $-0.4$;
5. next state menjadi $1.6$.

Sekarang jika hanya $\eta$ diubah menjadi $0.2$, dengan current state dan gradient yang sama:

$$
w_{t+1}
=
2-(0.2)(4)
=
1.2.
$$

Learning rate yang dua kali lebih besar membuat **one-step displacement** dua kali lebih besar pada kondisi tersebut.

Namun setelah sampai ke $1.2$, gradient untuk iterasi berikutnya harus dievaluasi ulang di titik baru. Itulah alasan multi-step behavior perlu dianalisis tersendiri.

---

# 8. DIMENSIONS / UNITS — Apakah Learning Rate Selalu Unitless?

Untuk persamaan:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta\nabla J(\boldsymbol{\theta}_t),
$$

quantity yang dikurangkan dari $\boldsymbol{\theta}_t$ harus compatible dengan parameter.

Artinya:

$$
\eta\nabla J(\boldsymbol{\theta}_t)
$$

harus memiliki dimension/unit yang kompatibel dengan $\boldsymbol{\theta}$.

Dalam praktik ML, learning rate sering diperlakukan sebagai angka scalar tanpa pembahasan unit secara eksplisit. Tetapi secara matematis tidak aman untuk mengatakan bahwa learning rate **selalu** unitless di semua formulation.

Untuk learner beginner, cukup pegang aturan berikut:

> **Jangan hafalkan “$\eta$ pasti tanpa unit”. Yang penting scaled gradient harus menghasilkan displacement yang dapat ditambahkan ke parameter.**

Kita tidak masuk ke dimensional analysis formal pada submodule ini.

---

# 9. WORKED BASIC EXAMPLE — Membandingkan Tiga Learning Rate

Gunakan:

$$
J(w)=(w-4)^2,
\qquad
w_0=2.
$$

Derivative:

$$
J'(w)=2(w-4),
$$

sehingga:

$$
J'(2)=-4.
$$

Objective awal:

$$
J(2)=4.
$$

## Case A — $\eta=0.05$

$$
w_1
=
2-(0.05)(-4)
=
2.2.
$$

$$
J(2.2)
=
(2.2-4)^2
=
3.24.
$$

## Case B — $\eta=0.25$

$$
w_1
=
2-(0.25)(-4)
=
3.
$$

$$
J(3)=1.
$$

## Case C — $\eta=1.2$

$$
w_1
=
2-(1.2)(-4)
=
6.8.
$$

$$
J(6.8)
=
(6.8-4)^2
=
7.84.
$$

Dari starting state yang sama:

| Learning rate | $w_1$ | $J(w_1)$ | Observation pada contoh ini |
|---:|---:|---:|---|
| $0.05$ | $2.2$ | $3.24$ | turun, langkah kecil |
| $0.25$ | $3.0$ | $1.00$ | turun lebih banyak |
| $1.20$ | $6.8$ | $7.84$ | overshoot besar; objective naik |

Kesimpulan yang aman:

> Pada **contoh ini**, nilai learning rate menghasilkan one-step behavior berbeda. Tabel ini tidak menetapkan learning rate universal untuk semua optimization problem.

---

# 10. WORKED HerAI / AI EXAMPLE — Tetap Pisahkan Score dan Objective

Persistent HerAI running case memiliki canonical instructional score:

$$
h(q,c)=0.6q+0.4c.
$$

Untuk Alya:

$$
q=0.80,
\qquad
c=0.75,
$$

sehingga:

$$
h(0.80,0.75)=0.78.
$$

**Hard semantic boundary:** $h$ tetap instructional score. Kita tidak mengubah $h$ menjadi production loss dan tidak mengubah fixed coefficients $0.6,0.4$ menjadi production trainable weights.

Untuk belajar learning rate, kita boleh membuat **synthetic / hypothetical / instructional objective** terpisah.

Misalkan ada scalar toy parameter $u$ yang hanya digunakan untuk latihan, dengan target instructional $0.78$:

$$
J_{\text{toy}}(u)
=
(u-0.78)^2.
$$

Pilih current state:

$$
u_0=0.50.
$$

Derivative:

$$
J'_{\text{toy}}(u)
=
2(u-0.78).
$$

Pada $u_0=0.50$:

$$
J'_{\text{toy}}(0.50)
=
2(0.50-0.78)
=
-0.56.
$$

Bandingkan dua learning rate.

## $\eta=0.1$

$$
u_1
=
0.50-(0.1)(-0.56)
=
0.556.
$$

## $\eta=0.5$

$$
u_1
=
0.50-(0.5)(-0.56)
=
0.78.
$$

Pada synthetic quadratic khusus ini, $\eta=0.5$ kebetulan membawa $u$ tepat ke $0.78$ dalam satu update dari starting point tersebut.

Tetapi ini **bukan bukti** bahwa:

- $0.5$ adalah learning rate terbaik untuk HerAI;
- $u$ adalah production recommendation parameter;
- $h$ adalah production target yang harus dipelajari;
- optimized toy parameter meningkatkan educational outcome nyata.

Contoh ini hanya kendaraan matematika untuk melihat pengaruh step size.

---

# 11. CHANGE ONE THING — Ubah Learning Rate, Bukan Gradient

Salah satu cara terbaik memahami learning rate adalah menjaga semua hal lain tetap sama.

Gunakan:

$$
w_t=1,
\qquad
J'(w_t)=-2.
$$

### Jika $\eta=0.1$

$$
\Delta w
=
-(0.1)(-2)
=
0.2.
$$

### Jika $\eta=0.4$

$$
\Delta w
=
-(0.4)(-2)
=
0.8.
$$

Arah sama-sama positif karena gradient sama dan $\eta>0$.

Yang berubah adalah **magnitude displacement**.

Inilah controlled comparison yang kita inginkan pada Topic 04.

---

# 12. WHY THIS MATTERS IN AI

Pada model AI nyata, parameter dapat berjumlah sangat banyak. Gradient memberi local change information untuk parameter tersebut, sedangkan learning rate menentukan seberapa besar optimizer menggunakan informasi itu pada suatu update.

Jika step terlalu kecil relatif terhadap problem dan scaling yang sedang dihadapi, perubahan parameter dapat sangat kecil.

Jika step terlalu besar relatif terhadap local landscape, update dapat melewati region yang diinginkan, berosilasi, atau bahkan meningkatkan objective.

Namun kata “terlalu kecil” dan “terlalu besar” selalu **context-dependent**.

Yang memengaruhi behavior antara lain:

- shape/curvature objective;
- magnitude gradient;
- scale parameter dan feature;
- optimizer yang digunakan;
- training procedure;
- stochasticity pada gradient estimate, yang baru dibahas nanti.

Karena itu tidak ada rule beginner-safe seperti:

> “selalu gunakan learning rate terbesar yang masih turun.”

atau:

> “learning rate kecil pasti aman.”

---

# 13. MISCONCEPTION CHALLENGE

## Misconception 1 — “Learning rate besar selalu belajar lebih cepat.”

Tidak valid. Learning rate besar menghasilkan larger step untuk gradient yang sama, tetapi larger step dapat overshoot atau memperburuk objective.

## Misconception 2 — “Learning rate kecil selalu lebih aman.”

Tidak universal. Step kecil mungkin membuat perubahan sangat lambat; dalam training yang kompleks ada banyak faktor lain. “Aman” sendiri harus didefinisikan terhadap objective dan procedure.

## Misconception 3 — “Kalau gradient direction benar, objective pasti turun.”

Negative gradient adalah local descent direction dalam standard Euclidean interpretation, tetapi finite step dengan learning rate tertentu dapat terlalu panjang. Local direction information tidak sama dengan universal finite-step guarantee.

## Misconception 4 — “Ada satu learning rate terbaik untuk semua model.”

Tidak. Scale dan landscape problem berbeda.

## Misconception 5 — “Learning rate adalah gradient.”

Tidak. Learning rate adalah scalar pengontrol step; gradient adalah local change vector.

## Misconception 6 — “Learning rate pasti unitless.”

Tidak boleh diklaim universally. Secara dimensional, $\eta\nabla J$ harus compatible dengan parameter displacement.

## Misconception 7 — “Learning rate yang menurunkan training objective pasti meningkatkan validation/evaluation metric.”

Tidak. Optimization objective dan evaluation performance harus tetap dibedakan.

---

# 14. TRY IT YOURSELF

Gunakan:

$$
J(w)=(w-2)^2,
\qquad
w_0=0.
$$

1. Hitung $J'(0)$.
2. Hitung $w_1$ untuk $\eta=0.1$.
3. Hitung $w_1$ untuk $\eta=0.5$.
4. Hitung $w_1$ untuk $\eta=1.2$.
5. Bandingkan $J(w_1)$ dari ketiga case.
6. Tulis conclusion yang **dibatasi pada objective dan starting point ini**.

Jangan menulis “$\eta=\dots$ selalu terbaik”.

---

# 15. VISUAL / INTERACTIVE SPEC

[COMPARE VIEW]

**Learning purpose:** melihat pengaruh learning rate dengan current state dan gradient yang sama.  
**Initial state/data/function:** $J(w)=(w-3)^2$, $w_0=0$, $J'(0)=-6$, pilihan $\eta\in\{0.01,0.25,0.5,0.75,1.2\}$.  
**Learner action:** memilih satu nilai $\eta$.  
**Expected behavior:** visual menampilkan current point, update displacement, next point, dan $J(w_1)$.  
**Feedback:** tampilkan “small move”, “lands near minimum”, “overshoots but improves”, atau “overshoots and objective increases” hanya berdasarkan selected example.  
**Safety / interpretation note:** label harus menyebut **“pada objective dan starting point ini”**, bukan “good LR/bad LR” secara universal.

[NUMBER MANIPULATOR]

**Learning purpose:** memahami scaling $\Delta w=-\eta J'(w_t)$.  
**Initial state/data/function:** fixed $w_t=0$ dan fixed gradient $J'(w_t)=-6$.  
**Learner action:** menggeser slider $\eta$ dari nilai kecil ke lebih besar.  
**Expected behavior:** panjang displacement berubah proporsional terhadap $\eta$ selama gradient dipertahankan fixed untuk demonstrasi one-step.  
**Feedback:** tampilkan $\eta$, scaled gradient, displacement, dan next state secara numerik.  
**Safety / interpretation note:** setelah next state terbentuk, gradient untuk iterasi berikutnya harus dihitung ulang; visual ini bukan multi-step training simulation.

[STATIC VISUAL]

**Learning purpose:** membedakan local direction dari finite step.  
**Initial state/data/function:** satu point pada 1D quadratic curve dengan tangent/gradient direction.  
**Learner action:** membaca tiga arrows dengan arah sama tetapi panjang berbeda.  
**Expected behavior:** arrow pendek, sedang, dan panjang berakhir di region objective yang berbeda.  
**Feedback:** anotasi $\eta$ pada setiap arrow.  
**Safety / interpretation note:** negative-gradient direction tidak menjamin arbitrary finite step menurunkan objective.

---

# 16. CHECKPOINT

Jawab tanpa melihat kembali materi:

1. Dalam update GD, apa fungsi $\eta$?
2. Jika gradient tetap, apa yang terjadi pada displacement ketika $\eta$ dikali dua?
3. Mengapa “learning rate besar = lebih cepat” tidak aman?
4. Apa arti overshoot pada worked example?
5. Apakah negative gradient menjamin setiap finite step menurunkan objective?
6. Mengapa learning rate tidak aman disebut universally unitless?
7. Apa yang tetap bukan production loss dalam HerAI running case?

Jika nomor 3, 5, atau 7 masih membingungkan, kembali ke bagian misconception dan HerAI example.

---

# 17. MASTERY CHECK — “I Can…”

Setelah Topic 04, peserta seharusnya dapat mengatakan:

- **I can** menjelaskan learning rate sebagai step-size controller.
- **I can** membedakan direction dari step magnitude.
- **I can** menghitung one-step update untuk beberapa nilai $\eta$.
- **I can** membandingkan objective setelah update tanpa membuat universal claim.
- **I can** menjelaskan overshoot secara matematis pada toy objective.
- **I can** menolak klaim bahwa learning rate besar selalu lebih cepat.
- **I can** menolak klaim bahwa learning rate kecil selalu lebih aman.
- **I can** menjelaskan mengapa $\eta$ tidak harus diasumsikan universally unitless.
- **I can** mempertahankan $h(q,c)$ sebagai instructional score, bukan production objective.

---

# 18. SCOPE BOUNDARY

Topic ini **tidak** menjadikan berikut sebagai mastery requirement:

- learning-rate schedules;
- warm-up;
- cosine annealing;
- exponential decay;
- ReduceLROnPlateau;
- line search;
- adaptive learning-rate derivation;
- Lipschitz constants;
- Hessian/eigenvalue-based stability conditions;
- formal convergence range for quadratics;
- hyperparameter search;
- optimizer-specific tuning recipes;
- Momentum, RMSProp, Adam;
- multi-step convergence trajectory.

Konsep scheduler boleh dikenali sebagai **forward reference**: pada praktik, learning rate dapat berubah selama training. Tetapi catalog dan mechanics scheduler bukan core Topic 04.

---

# 19. SUMMARY

Learning rate muncul dalam:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta\nabla J(\boldsymbol{\theta}_t).
$$

Ia mengontrol **besar step** yang dibentuk dari gradient.

Untuk current state dan gradient yang sama:

- $\eta$ lebih kecil → displacement lebih kecil;
- $\eta$ lebih besar → displacement lebih besar.

Tetapi objective behavior tidak boleh disimpulkan hanya dari besar-kecilnya $\eta$. Finite step dapat:

- membuat objective turun sedikit;
- turun lebih banyak;
- melewati minimum tetapi masih membaik;
- atau overshoot cukup jauh sehingga objective meningkat.

Semua bergantung pada problem dan state yang sedang dihadapi.

Learning rate bukan gradient, bukan objective, dan bukan jaminan convergence/generalization.

---

# 20. BRIDGE — Dari Satu Langkah ke Proses Iteratif

Topic 04 sengaja membandingkan learning rate terutama dari **starting state yang sama**.

Tetapi Optimization tidak berhenti setelah satu update.

Setelah memperoleh:

$$
\boldsymbol{\theta}_{t+1},
$$

kita perlu:

1. mengevaluasi objective/gradient lagi pada state baru;
2. membuat update berikutnya;
3. mengamati bagaimana parameter dan objective berubah sepanjang beberapa iteration.

Itulah fokus **Topic 05 — Beberapa Iterasi Sampai Loss Berubah**.

> **STOP:** multi-iteration trajectory belum diproduksi dalam Topic 04.
