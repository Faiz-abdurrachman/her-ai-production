# Topic 03 — Gradient Descent Update Rule
## Dari Gradient Lokal ke Parameter Baru

> **Posisi dalam modul:** Submodule 06 — Optimization: Dari Loss ke Parameter yang Lebih Baik  
> **Prerequisite aktif:** Topic 01 (loss/objective/evaluation metric), Topic 02 (minimization, `argmin`, landscape), serta derivative/gradient dari Calculus  
> **Fokus topic:** memahami Gradient Descent sebagai **aturan update parameter**, membaca satu langkah update secara lengkap, menjelaskan negative sign, dan menghitung one-step update untuk objective sintetis sederhana.  
> **Belum dibahas mendalam:** perilaku learning rate, beberapa iterasi, full-batch/minibatch/stochastic gradient, Momentum, Adam, convergence theory, atau generalization.

---

## Learning Outcomes

Setelah menyelesaikan topic ini, peserta mampu:

1. menjelaskan mengapa gradient saja belum merupakan algoritma Optimization;
2. membaca aturan update Gradient Descent

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_{t}
-
\eta\nabla J(\boldsymbol{\theta}_{t});
$$

3. mengidentifikasi current parameter, gradient, step-size parameter, operation, dan next parameter;
4. menjelaskan makna negative sign sebagai gerak berlawanan dengan local steepest increase dalam interpretasi Euclidean standar;
5. menghitung **satu langkah** Gradient Descent untuk objective satu parameter;
6. menghitung **satu langkah** update vector untuk objective dua parameter yang beginner-safe;
7. membedakan **gradient**, **update vector**, dan **next parameter state**;
8. menjelaskan bahwa satu update tidak menjamin global optimum, convergence, generalization, atau penurunan objective pada setiap situasi;
9. menggunakan persistent HerAI running case tanpa mengubah $h(q,c)=0.6q+0.4c$ menjadi production loss atau trainable production rule.

---

# 1. HOOK / REAL PROBLEM — Kita Sudah Tahu Arah Lokal, Lalu Apa?

Di Calculus, kita sudah belajar bahwa gradient memberi informasi perubahan lokal dari objective.

Misalkan:

$$
J(w)=(w-3)^2.
$$

Derivative-nya:

$$
J'(w)=2(w-3).
$$

Pada $w=0$:

$$
J'(0)=2(0-3)=-6.
$$

Angka $-6$ memberi informasi lokal tentang slope objective di $w=0$.

Tetapi pertanyaan Optimization bukan hanya:

> “Gradient-nya berapa?”

Kita juga perlu menjawab:

> **“Setelah mengetahui gradient, parameter berikutnya harus menjadi berapa?”**

Di sinilah sebuah **update rule** dibutuhkan.

Gradient adalah informasi lokal. Update rule mengubah informasi itu menjadi perpindahan parameter.

---

# 2. PREDICT — Kalau Slope Negatif, Kita Bergerak ke Mana?

Masih gunakan:

$$
J(w)=(w-3)^2,
\qquad
J'(0)=-6.
$$

Dari Calculus, derivative negatif berarti jika kita bergerak sedikit ke kanan dari $w=0$, nilai function secara lokal cenderung turun.

Sebelum melihat formula update, prediksi:

- apakah next $w$ seharusnya lebih kecil dari $0$?
- atau lebih besar dari $0$?

Karena slope di $w=0$ negatif, arah local decrease adalah ke kanan. Jadi untuk contoh ini, kita mengharapkan next parameter **lebih besar dari $0$**.

Gradient Descent harus menghasilkan behavior yang konsisten dengan informasi lokal tersebut.

---

# 3. INTUITION — Gradient Bukan Update

Ada tiga objek yang harus dibedakan.

## 3.1 Gradient

Untuk parameter vector $\boldsymbol{\theta}$:

$$
\nabla J(\boldsymbol{\theta}_t)
$$

adalah vector informasi perubahan lokal objective pada current state $\boldsymbol{\theta}_t$.

## 3.2 Update vector

Jika gradient dikalikan step-size positif $\eta$ dan diberi negative sign:

$$
-\eta\nabla J(\boldsymbol{\theta}_t),
$$

kita memperoleh **perubahan yang akan ditambahkan ke current parameter**.

## 3.3 Next parameter state

Current parameter kemudian ditambah update vector:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
+
\left(-\eta\nabla J(\boldsymbol{\theta}_t)\right).
$$

Biasanya ditulis lebih ringkas:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta\nabla J(\boldsymbol{\theta}_t).
$$

Jadi:

> **gradient $\neq$ update vector $\neq$ next parameter.**

Ketiganya saling berhubungan, tetapi bukan objek yang sama.

---

# 4. EXPLORE — Membaca Update sebagai State Transition

Aturan Gradient Descent yang menjadi fokus topic ini adalah:

$$
\boxed{
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_{t}
-
\eta\nabla J(\boldsymbol{\theta}_{t})
}
$$

Mari baca sebagai state transition:

$$
\text{current state}
\rightarrow
\text{local gradient information}
\rightarrow
\text{scaled opposite-direction step}
\rightarrow
\text{new state}.
$$

Dalam satu iterasi:

1. tentukan current parameter $\boldsymbol{\theta}_t$;
2. hitung/evaluasi gradient pada **current parameter tersebut**;
3. kalikan gradient dengan $\eta>0$;
4. ambil arah negatifnya;
5. gabungkan dengan current parameter;
6. hasilnya adalah $\boldsymbol{\theta}_{t+1}$.

Topic ini berhenti pada logika **satu update**. Topic 05 nanti baru membuat proses multi-iteration menjadi pusat pembahasan.

---

# 5. FORMAL DEFINITION — Gradient Descent sebagai First-Order Update

Untuk scalar objective

$$
J:\mathbb{R}^{d}\rightarrow\mathbb{R}
$$

dan parameter vector

$$
\boldsymbol{\theta}_t\in\mathbb{R}^{d},
$$

Gradient Descent menggunakan first-order/local gradient information:

$$
\nabla J(\boldsymbol{\theta}_t)
=
\begin{bmatrix}
\frac{\partial J}{\partial \theta_1}(\boldsymbol{\theta}_t)\\
\vdots\\
\frac{\partial J}{\partial \theta_d}(\boldsymbol{\theta}_t)
\end{bmatrix}
$$

untuk membentuk next state:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_{t}
-
\eta\nabla J(\boldsymbol{\theta}_t),
\qquad
\eta>0.
$$

Pada topic ini, $\eta$ cukup dibaca sebagai **positive step-size parameter** yang mengontrol skala langkah. Bagaimana memilihnya, dan apa yang terjadi jika terlalu kecil/besar, adalah fokus Topic 04.

---

# 6. NOTATION + FORMULA — Apa Arti Setiap Simbol?

Gunakan formula:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_{t}
-
\eta\nabla J(\boldsymbol{\theta}_{t}).
$$

| Simbol | Makna |
|---|---|
| $J$ | scalar objective yang sedang diminimalkan |
| $\boldsymbol{\theta}_t$ | current parameter state pada iteration index $t$ |
| $\nabla J(\boldsymbol{\theta}_t)$ | gradient objective yang dievaluasi di current state |
| $\eta$ | positive step-size / learning-rate parameter |
| $-\eta\nabla J(\boldsymbol{\theta}_t)$ | update vector / displacement yang diterapkan |
| $\boldsymbol{\theta}_{t+1}$ | next parameter state setelah satu update |

Perhatikan bahwa subscript $t$ tidak berarti “waktu fisik”. Di sini ia adalah **index state/iteration**.

---

# 7. MATH READING SKILL — Baca Rumus, Jangan Hanya Hafal

Untuk setiap update, learner harus bisa menjawab sepuluh pertanyaan berikut.

## 7.1 Symbols

Apa arti $\boldsymbol{\theta}$, $t$, $\eta$, $J$, dan $\nabla$?

## 7.2 Current input/state

Parameter mana yang sedang digunakan?

$$
\boldsymbol{\theta}_t
$$

## 7.3 Local information

Gradient dievaluasi di mana?

$$
\nabla J(\boldsymbol{\theta}_t)
$$

bukan sembarang gradient dari titik lain.

## 7.4 Operation

Gradient di-scale oleh $\eta$, kemudian hasilnya dikurangkan dari current parameter.

## 7.5 Output

Hasilnya adalah state berikutnya:

$$
\boldsymbol{\theta}_{t+1}.
$$

## 7.6 Negative sign

Dalam standard Euclidean interpretation, gradient menunjukkan direction of steepest local increase. Karena target kita adalah minimization, kita bergerak ke arah berlawanan:

$$
-\nabla J.
$$

Negative sign **bukan** berarti “gradient selalu negatif”. Gradient dapat memiliki komponen positif atau negatif.

## 7.7 Step size

$\eta>0$ mengatur magnitude langkah. Topic ini memakai nilai yang diberikan untuk arithmetic trace, bukan membahas apakah nilai itu optimal.

## 7.8 Dimensions

Jika:

$$
\boldsymbol{\theta}_t\in\mathbb{R}^{d},
$$

maka:

$$
\nabla J(\boldsymbol{\theta}_t)\in\mathbb{R}^{d}.
$$

Update vector harus compatible dengan dimension parameter vector.

## 7.9 Assumptions

Rule ini membutuhkan objective yang gradient-nya dapat dievaluasi di titik yang digunakan. Interpretasi “steepest” di sini memakai geometry/Euclidean norm standar.

## 7.10 What it does NOT imply

Formula satu langkah ini tidak otomatis menjamin:

- global minimum;
- convergence untuk semua objective dan semua $\eta$;
- objective selalu turun di setiap step;
- better validation/evaluation performance;
- better real-world product outcome;
- fairness atau calibration;
- production readiness.

---

# 8. NEGATIVE SIGN — Kenapa Dikurangi?

Ini bagian paling penting dari Topic 03.

## 8.1 Kasus derivative positif

Misalkan pada suatu titik:

$$
J'(w_t)>0.
$$

Gradient lokal menunjukkan increase jika $w$ dinaikkan. Maka:

$$
-\eta J'(w_t)<0,
$$

sehingga update mendorong $w$ ke nilai yang lebih kecil.

## 8.2 Kasus derivative negatif

Jika:

$$
J'(w_t)<0,
$$

maka:

$$
-\eta J'(w_t)>0,
$$

sehingga update mendorong $w$ ke nilai yang lebih besar.

Jadi negative sign menyesuaikan arah update terhadap sign gradient lokal.

> **Kita tidak “membuat gradient menjadi negatif”. Kita mengambil langkah berlawanan terhadap arah gradient.**

---

# 9. WORKED BASIC EXAMPLE — Satu Langkah, Satu Parameter

Gunakan objective sintetis:

$$
J(w)=(w-3)^2.
$$

Derivative:

$$
J'(w)=2(w-3).
$$

Ambil current parameter:

$$
w_0=0.
$$

Dan untuk arithmetic illustration saja, gunakan:

$$
\eta=0.25.
$$

## Step A — Hitung current objective

$$
J(w_0)=J(0)=(0-3)^2=9.
$$

## Step B — Hitung gradient di current state

$$
J'(w_0)=J'(0)=2(0-3)=-6.
$$

## Step C — Hitung update vector scalar

$$
-\eta J'(w_0)
=
-(0.25)(-6)
=
1.5.
$$

## Step D — Bentuk next parameter

$$
w_1
=
w_0-\eta J'(w_0)
=
0-(0.25)(-6)
=
1.5.
$$

Jadi:

$$
\boxed{w_1=1.5}
$$

## Step E — Inspect, bukan overclaim

Untuk contoh ini:

$$
J(1.5)=(1.5-3)^2=2.25.
$$

Nilainya turun dari $9$ menjadi $2.25$.

Tetapi kesimpulan yang aman adalah:

> **Pada objective, current point, dan step size yang dipilih untuk contoh ini, satu update menghasilkan objective yang lebih rendah.**

Bukan:

> “Gradient Descent selalu menurunkan objective pada setiap langkah.”

---

# 10. WORKED BASIC EXAMPLE — Satu Langkah, Dua Parameter

Gunakan objective sintetis yang sudah familiar:

$$
J(w,b)=(w-1)^2+2(b+1)^2.
$$

Gradient:

$$
\nabla J(w,b)
=
\begin{bmatrix}
2(w-1)\\
4(b+1)
\end{bmatrix}.
$$

Ambil current state:

$$
\boldsymbol{\theta}_0
=
\begin{bmatrix}
w_0\\
b_0
\end{bmatrix}
=
\begin{bmatrix}
0\\
0
\end{bmatrix}.
$$

Dengan:

$$
\eta=0.25.
$$

## Step A — Gradient di current state

$$
\nabla J(0,0)
=
\begin{bmatrix}
2(0-1)\\
4(0+1)
\end{bmatrix}
=
\begin{bmatrix}
-2\\
4
\end{bmatrix}.
$$

## Step B — Scale gradient

$$
\eta\nabla J(0,0)
=
0.25
\begin{bmatrix}
-2\\
4
\end{bmatrix}
=
\begin{bmatrix}
-0.5\\
1
\end{bmatrix}.
$$

## Step C — Subtract dari current parameter

$$
\boldsymbol{\theta}_1
=
\begin{bmatrix}
0\\
0
\end{bmatrix}
-
\begin{bmatrix}
-0.5\\
1
\end{bmatrix}
=
\begin{bmatrix}
0.5\\
-1
\end{bmatrix}.
$$

Jadi:

$$
\boxed{w_1=0.5,\qquad b_1=-1}
$$

Perhatikan bahwa dua komponen parameter bisa bergerak ke arah sign yang berbeda karena dua komponen gradient juga berbeda.

---

# 11. WORKED HerAI / AI EXAMPLE — Update Parameter Sintetis Tanpa Mengubah Score Canonical

Persistent HerAI score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Untuk Alya:

$$
h(0.80,0.75)=0.78.
$$

**HARD SEMANTIC BOUNDARY:** $h(q,c)$ tetap instructional score. Kita tidak mengubah bobot $0.6$ dan $0.4$ menjadi learned production weights, dan kita tidak menyebut $h$ sebagai production loss.

Untuk melihat update rule dalam konteks HerAI, kita buat **model sintetis/hypothetical** yang menambahkan satu parameter trainable $w$ ke score yang sudah tetap:

$$
\hat{s}(w)=h(q,c)+w.
$$

Untuk Alya, misalkan target instructional sintetis adalah:

$$
r=0.90.
$$

Definisikan synthetic objective:

$$
J(w)=\left(\hat{s}(w)-r\right)^2.
$$

Karena $h(q,c)=0.78$ untuk Alya:

$$
J(w)=(0.78+w-0.90)^2=(w-0.12)^2.
$$

Derivative:

$$
J'(w)=2(w-0.12).
$$

Ambil:

$$
w_0=0,
\qquad
\eta=0.25.
$$

Gradient di current state:

$$
J'(0)=2(0-0.12)=-0.24.
$$

One-step update:

$$
w_1
=
0-(0.25)(-0.24)
=
0.06.
$$

Sehingga synthetic next prediction menjadi:

$$
\hat{s}(w_1)=0.78+0.06=0.84.
$$

Contoh ini hanya menunjukkan **bagaimana parameter sintetis dapat di-update**. Ia tidak membuktikan bahwa target $0.90$ benar secara pedagogis, tidak menjadi production recommendation rule, dan tidak mengubah makna canonical $h(q,c)$.

---

# 12. CHANGE ONE THING — Apa yang Terjadi Jika Sign Update Salah?

Kembali ke:

$$
J(w)=(w-3)^2,
\qquad
w_0=0,
\qquad
J'(0)=-6,
\qquad
\eta=0.25.
$$

Update Gradient Descent yang benar:

$$
w_1=0-(0.25)(-6)=1.5.
$$

Sekarang ubah **satu hal saja**: gunakan plus sign secara keliru.

$$
\tilde{w}_1
=
0+(0.25)(-6)
=
-1.5.
$$

Objective pada titik salah tersebut:

$$
J(-1.5)=(-1.5-3)^2=20.25.
$$

Untuk example ini:

- current objective: $9$;
- correct-sign next objective: $2.25$;
- wrong-sign next objective: $20.25$.

Pelajaran utamanya bukan bahwa every correct-sign step selalu sukses. Pelajarannya adalah bahwa **negative sign mempunyai makna geometris yang nyata: bergerak berlawanan terhadap local gradient direction**.

---

# 13. WHY THIS MATTERS IN AI

Model AI dapat memiliki banyak parameter. Training membutuhkan prosedur yang mengubah parameter berdasarkan objective dan gradient.

Gradient Descent memberi bridge konseptual:

$$
\text{objective}
\rightarrow
\text{gradient}
\rightarrow
\text{update}
\rightarrow
\text{new parameter state}.
$$

Ini adalah titik transisi penting dari Calculus ke Optimization:

- Calculus memberi local-change information;
- Optimization memakai informasi itu dalam sebuah update rule.

Dalam library modern, proses update dapat disediakan oleh optimizer API. Tetapi memahami state transition secara manual tetap penting agar learner tidak menganggap `optimizer.step()` sebagai operasi misterius.

---

# 14. MISCONCEPTION CHALLENGE

Tentukan apakah setiap pernyataan berikut **BENAR** atau **SALAH**, lalu jelaskan.

### A. “Gradient sama dengan parameter update.”

**SALAH.** Gradient adalah local-change information. Update vector dalam basic GD adalah $-\eta\nabla J$.

### B. “Negative gradient adalah optimizer lengkap.”

**SALAH.** Negative gradient memberi direction; update juga membutuhkan current state dan step size, lalu dalam training biasanya diterapkan sebagai process berulang.

### C. “Jika derivative negatif, parameter pasti ikut menjadi negatif.”

**SALAH.** Dengan update $w_{t+1}=w_t-\eta J'(w_t)$, derivative negatif justru menghasilkan positive displacement karena negative dikali negative.

### D. “Satu update yang menurunkan training objective membuktikan model lebih baik untuk unseen data.”

**SALAH.** Training objective dan unseen/evaluation performance bukan quantity yang identik.

### E. “Jika kita tahu gradient, kita sudah tahu ukuran langkah terbaik.”

**SALAH.** Gradient memberi direction/local-change information. Step-size behavior memerlukan pembahasan tersendiri pada Topic 04.

---

# 15. TRY IT YOURSELF — One-Step Micro Check

Gunakan:

$$
J(w)=(w-2)^2,
\qquad
w_0=1,
\qquad
\eta=0.25.
$$

1. Hitung $J'(w)$.
2. Hitung $J'(w_0)$.
3. Hitung update vector $-\eta J'(w_0)$.
4. Hitung $w_1$.
5. Jelaskan mengapa arah perpindahannya konsisten dengan sign derivative.

<details>
<summary>Reveal jawaban</summary>

Derivative:

$$
J'(w)=2(w-2).
$$

Pada $w_0=1$:

$$
J'(1)=-2.
$$

Update vector:

$$
-(0.25)(-2)=0.5.
$$

Next parameter:

$$
w_1=1+0.5=1.5.
$$

Derivative negatif menghasilkan displacement positif, sehingga $w$ bergerak ke kanan pada example ini.

</details>

---

# 16. VISUAL / INTERACTIVE SPEC

## [STEP-BY-STEP REVEAL] Anatomy of One Gradient Descent Update

**Learning purpose:** memisahkan current state, gradient, scaled gradient, update vector, dan next state.

**Initial state/data/function:**

$$
J(w)=(w-3)^2,
\qquad
w_0=0,
\qquad
\eta=0.25.
$$

**Learner action:** tekan “Next” untuk membuka satu langkah pada satu waktu:

1. current point;
2. derivative formula;
3. derivative value;
4. scaled gradient;
5. negative-direction displacement;
6. next parameter;
7. optional objective comparison.

**Expected behavior:** learner melihat bahwa $J'(0)=-6$ bukan next parameter. Ia hanya salah satu input ke update rule.

**Feedback:** label eksplisit:

- `current parameter`;
- `gradient`;
- `update vector`;
- `next parameter`.

**Safety / interpretation note:** objective turun pada selected arithmetic example, tetapi visual tidak boleh menampilkan teks “GD selalu menurunkan loss”.

---

## [INTERACTIVE VISUAL] Direction Before Distance

**Learning purpose:** memahami negative sign tanpa menjadikan learning-rate selection sebagai fokus.

**Initial state:** simple 1D quadratic dengan current point dan tangent/gradient sign.

**Learner action:** pindahkan current point ke kiri atau kanan minimum.

**Expected behavior:**

- di sisi dengan derivative negatif, negative-gradient arrow mengarah ke kanan;
- di sisi dengan derivative positif, negative-gradient arrow mengarah ke kiri;
- dekat stationary point, arrow mengecil.

**Feedback:** tampilkan `gradient sign` dan `opposite direction`.

**Safety / interpretation note:** panjang arrow visual harus diberi label illustrative; Topic 04 yang membahas efek $\eta$ secara eksplisit.

---

# 17. CHECKPOINT

Pastikan Anda dapat menjawab tanpa melihat materi:

1. Apa beda gradient dan update vector?
2. Mengapa formula Gradient Descent memakai negative sign?
3. Di titik mana gradient harus dievaluasi pada update dari $t$ ke $t+1$?
4. Apa peran $\eta$ pada level Topic 03?
5. Apa yang dimaksud $\boldsymbol{\theta}_{t+1}$?
6. Mengapa satu successful toy update bukan bukti generalization?
7. Mengapa $h(q,c)$ tidak boleh diam-diam disebut loss HerAI?

Jika salah satu masih kabur, kembali ke bagian **Math Reading Skill** dan worked example.

---

# 18. MASTERY CHECK — “I Can…”

Setelah Topic 03, saya dapat mengatakan:

- **I can** membaca formula Gradient Descent symbol-by-symbol.
- **I can** membedakan current parameter, gradient, update vector, dan next parameter.
- **I can** menjelaskan negative sign dengan local gradient direction.
- **I can** menghitung satu update scalar secara manual.
- **I can** menghitung satu update vector sederhana secara manual.
- **I can** menjelaskan mengapa gradient bukan optimizer lengkap.
- **I can** menghindari klaim bahwa satu update menjamin global optimum atau generalization.
- **I can** menjaga HerAI score tetap sebagai instructional score ketika membuat synthetic optimization example.

---

# 19. SCOPE BOUNDARY — Yang Sengaja Belum Kita Pelajari

Topic ini **tidak** menjadikan berikut sebagai mastery requirement:

- cara memilih learning rate yang “baik”;
- comparison small/useful/large learning rate;
- overshoot atau oscillation analysis;
- multi-step trajectory;
- epoch atau stopping rule;
- full-batch, minibatch, atau stochastic-gradient distinction;
- Momentum;
- RMSProp;
- Adam;
- line search;
- learning-rate scheduler;
- Hessian/Newton/quasi-Newton;
- convergence proof;
- convexity proof;
- backpropagation derivation;
- automatic differentiation implementation;
- production HerAI training pipeline.

Konsep-konsep tersebut punya dependency atau scope sendiri.

---

# 20. SUMMARY

Gradient Descent mengubah local gradient information menjadi parameter movement melalui:

$$
\boxed{
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_{t}
-
\eta\nabla J(\boldsymbol{\theta}_{t})
}
$$

Urutan pembacaannya:

1. mulai dari current parameter $\boldsymbol{\theta}_t$;
2. evaluate gradient $\nabla J(\boldsymbol{\theta}_t)$;
3. scale dengan positive $\eta$;
4. bergerak berlawanan terhadap gradient;
5. hasilkan next state $\boldsymbol{\theta}_{t+1}$.

Gradient bukan loss, bukan error, dan bukan update. Negative gradient adalah direction, bukan jaminan global optimum. Satu update yang sukses pada toy example juga bukan jaminan bahwa semua update akan menurunkan objective atau bahwa unseen performance membaik.

---

# 21. BRIDGE — Mengapa Besar Langkah Harus Dibahas Sendiri?

Sekarang kita sudah mengetahui **arah dan bentuk update rule**.

Tetapi formula masih memiliki satu quantity penting:

$$
\eta.
$$

Jika $\eta$ mengontrol ukuran langkah, pertanyaan berikutnya menjadi:

- bagaimana perubahan $\eta$ mengubah perpindahan parameter?
- mengapa terlalu kecil tidak sama dengan selalu aman?
- mengapa terlalu besar tidak sama dengan selalu cepat?

Itulah fokus **Topic 04 — Learning Rate**.
