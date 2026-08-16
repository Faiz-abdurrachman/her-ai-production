# Topic 08 — Loss Landscape dan Bridge ke Optimization
## Submodule 05 — Calculus: Perubahan, Turunan, dan Gradient

> **Posisi topik:** Topic 07 sudah mengajarkan bagaimana local-change information diteruskan melalui composed functions menggunakan chain rule dan computational graph. Topic 08 sekarang menyatukan seluruh bahasa Calculus yang sudah dipelajari untuk membaca **loss/objective sebagai function dari parameter**, memahami bentuk landscape secara visual, serta menginterpretasikan derivative/gradient pada landscape tersebut. Topic ini adalah **bridge ke Submodule 06 — Optimization**, bukan tutorial Gradient Descent.

## Tujuan Pembelajaran

Setelah menyelesaikan topik ini, peserta diharapkan mampu:

1. menjelaskan apa yang dimaksud dengan loss/objective sebagai scalar function dari satu atau beberapa parameter;
2. membaca **loss landscape** sebagai representasi nilai loss ketika parameter berubah;
3. membedakan 1D curve, 2D surface, dan contour/level-curve representation;
4. menggunakan derivative untuk membaca local change pada loss satu parameter;
5. menggunakan gradient untuk membaca local change pada loss beberapa parameter;
6. menjelaskan bahwa gradient menunjukkan **steepest local increase** dalam standard Euclidean interpretation;
7. menjelaskan bahwa negative gradient menunjukkan corresponding **steepest local-decrease direction**, tetapi belum menentukan step size atau update algorithm;
8. membedakan local minimum dan global minimum secara geometris;
9. menjelaskan mengapa zero derivative/zero gradient hanya menunjukkan stationary/critical condition dan **tidak otomatis global minimum**;
10. membedakan loss value dari derivative/gradient;
11. menjaga safety bahwa **loss bukan probability** dan lower loss tidak otomatis berarti real-world system lebih baik di semua aspek;
12. mempertahankan canonical HerAI score $h(q,c)=0.6q+0.4c$ sebagai **instructional score**, bukan loss atau probability;
13. menganalisis contoh loss nonlinear yang jelas dilabel **synthetic/hypothetical**;
14. menjelaskan apa yang diberikan Calculus kepada Optimization dan apa yang masih belum ditentukan;
15. menjelaskan bahwa Gradient Descent, learning rate, iteration, convergence, dan optimizer families merupakan materi Submodule 06.

---

# 1. HOOK / REAL PROBLEM — Kita Sudah Punya Gradient. Lalu Apa?

Pada Topic 06 kita belajar bahwa gradient adalah vector local-change information.

Pada Topic 07 kita belajar bahwa chain rule dapat meneruskan local change melalui beberapa computation.

Sekarang pertanyaannya berubah.

Misalkan kita memiliki **synthetic toy loss**:

$$
J(w)=(w-1)^2.
$$

Kita dapat menghitung derivative:

$$
J'(w)=2(w-1).
$$

Tetapi derivative saja belum menjawab semua pertanyaan visual yang penting:

- bagaimana nilai $J$ berubah untuk banyak nilai $w$?
- di mana curve terlihat rendah atau tinggi?
- apa arti derivative positif di satu lokasi?
- apa arti derivative negatif di lokasi lain?
- apa yang dapat kita simpulkan ketika derivative sama dengan zero?
- apakah zero derivative otomatis berarti global minimum?
- kalau negative gradient adalah arah penurunan, apakah kita sudah mengetahui seberapa jauh parameter harus bergerak?

Pertanyaan-pertanyaan tersebut membawa kita ke **loss landscape**.

Loss landscape membantu kita melihat hubungan:

> **parameter → loss value → local derivative/gradient → geometric direction information.**

Namun Topic 08 sengaja berhenti **sebelum** kita menetapkan algorithm update.

---

# 2. PREDICT — Sebelum Menghitung

Gunakan synthetic function:

$$
J(w)=(w-1)^2.
$$

Tanpa menghitung derivative terlebih dahulu, coba prediksi:

1. Pada nilai $w$ berapa curve kemungkinan mencapai nilai terendah?
2. Jika $w=0$, apakah menaikkan $w$ sedikit kemungkinan menaikkan atau menurunkan $J$?
3. Jika $w=2$, apakah menaikkan $w$ sedikit kemungkinan menaikkan atau menurunkan $J$?
4. Jika $J'(w)=0$, apakah kita boleh langsung menyatakan “global minimum ditemukan”?
5. Jika gradient menunjukkan arah local decrease, apakah gradient juga memberi tahu **berapa besar langkah** yang harus dilakukan?
6. Apakah nilai loss dapat dibaca sebagai probability?

Jangan khawatir jika belum yakin. Topic ini akan membangun jawabannya satu per satu.

---

# 3. INTUITION — Landscape adalah Peta Nilai Function

Kata **landscape** adalah metafora visual.

Untuk satu parameter:

$$
J(w),
$$

kita dapat menggambar:

- horizontal axis = parameter $w$;
- vertical axis = loss $J(w)$.

Hasilnya adalah **curve**.

Untuk dua parameter:

$$
J(w,b),
$$

kita dapat membayangkan:

- satu axis untuk $w$;
- satu axis untuk $b$;
- height untuk $J(w,b)$.

Hasilnya dapat divisualisasikan sebagai **surface**.

Kita juga dapat menggunakan **contour plot**:

- setiap contour menghubungkan points dengan nilai $J$ yang sama;
- contour membantu membaca landscape tanpa selalu menggambar surface 3D.

Penting:

> Loss landscape bukan medan fisik yang benar-benar ada. Ia adalah representasi matematis tentang bagaimana scalar objective berubah ketika parameter berubah.

---

# 4. EXPLORE — Membaca Synthetic 1D Loss

Gunakan:

$$
J(w)=(w-1)^2.
$$

Mari evaluasi beberapa points.

| $w$ | $J(w)$ |
|---:|---:|
| $-1$ | $4$ |
| $0$ | $1$ |
| $1$ | $0$ |
| $2$ | $1$ |
| $3$ | $4$ |

Dari table saja kita sudah melihat pola:

- dari $w=-1$ menuju $w=1$, loss turun;
- di $w=1$, loss paling rendah pada points yang kita lihat;
- setelah $w=1$, loss naik lagi.

Derivative-nya:

$$
J'(w)=2(w-1).
$$

Sekarang lihat beberapa lokasi.

### Pada $w=0$

$$
J'(0)=2(0-1)=-2.
$$

Derivative negatif berarti:

> jika $w$ dinaikkan sedikit dari $0$, $J$ cenderung **menurun secara lokal**.

### Pada $w=2$

$$
J'(2)=2(2-1)=2.
$$

Derivative positif berarti:

> jika $w$ dinaikkan sedikit dari $2$, $J$ cenderung **meningkat secara lokal**.

Dengan kata lain, agar bergerak ke local decrease dari $w=2$, arah yang sesuai adalah arah $w$ yang lebih kecil.

### Pada $w=1$

$$
J'(1)=0.
$$

Derivative tidak memberi preferred first-order direction pada titik tersebut.

Untuk **function khusus ini**, kita dapat melihat dari bentuk parabola bahwa $w=1$ memang global minimum.

Tetapi kalimat tersebut **tidak boleh digeneralisasi** menjadi:

> “Setiap derivative zero pasti global minimum.”

Nanti kita akan melihat mengapa.

---

# 5. FORMAL DEFINITION — Loss / Objective sebagai Function

Dalam topic ini, kita menggunakan notation:

$$
J(\boldsymbol{\theta}),
$$

dengan:

- $J$ = scalar objective/loss yang sedang dianalisis;
- $\boldsymbol{\theta}$ = vector parameter;
- output $J(\boldsymbol{\theta})$ = satu scalar value.

Untuk satu parameter kita dapat menulis:

$$
J(w).
$$

Untuk dua parameter:

$$
J(w,b).
$$

Dalam machine learning nyata, istilah **loss**, **cost**, dan **objective** kadang mempunyai convention berbeda antar sumber. Untuk topic beginner ini:

> kita akan menggunakan $J$ sebagai **scalar objective/loss function yang sengaja didefinisikan pada contoh**.

Yang terpenting bukan namanya, tetapi semantics-nya harus jelas.

## Apa itu loss landscape?

Dalam konteks topic ini, **loss landscape** adalah:

> representasi bagaimana nilai scalar objective $J(\boldsymbol{\theta})$ berubah ketika parameter $\boldsymbol{\theta}$ berubah.

Untuk 1D, landscape dapat dibaca sebagai curve.

Untuk 2D, landscape dapat dibaca sebagai surface atau contour plot.

Untuk model besar dengan jutaan parameter, landscape sebenarnya berada di high-dimensional parameter space dan tidak dapat ditampilkan sepenuhnya dalam satu gambar 2D/3D.

Jadi visual 1D dan 2D kita adalah **instructional slices/toy landscapes**.

---

# 6. NOTATION + FORMULA — Local Change pada Loss

Untuk satu parameter:

$$
J'(w)
=
\frac{dJ}{dw}.
$$

Interpretasi:

> local rate of change loss $J$ terhadap parameter $w$.

Untuk beberapa parameter:

$$
\nabla J(\boldsymbol{\theta})
=
\begin{bmatrix}
\frac{\partial J}{\partial \theta_1}\\
\vdots\\
\frac{\partial J}{\partial \theta_d}
\end{bmatrix}.
$$

Interpretasi:

> vector yang mengumpulkan local rates terhadap setiap parameter.

Dalam standard Euclidean interpretation:

- $\nabla J$ menunjukkan **steepest local increase**;
- $-\nabla J$ menunjukkan corresponding **steepest local decrease direction**.

Perhatikan kata-kata penting:

- **local**;
- **direction**;
- belum menyebut **step size**;
- belum menyebut **iteration**;
- belum menyebut **optimizer**.

---

# 7. MATH READING SKILL — Membaca $\nabla J(\boldsymbol{\theta})$

Pertimbangkan:

$$
\nabla J(\boldsymbol{\theta})
=
\begin{bmatrix}
2\\
4
\end{bmatrix}.
$$

Kita harus membaca formula ini secara lengkap.

## Symbols

- $J$ = scalar objective;
- $\boldsymbol{\theta}$ = vector parameter;
- $\nabla$ = gradient operator;
- first component $2$ = local rate terhadap parameter pertama;
- second component $4$ = local rate terhadap parameter kedua.

## Input

Parameter state tertentu:

$$
\boldsymbol{\theta}_0.
$$

## Operation

Menghitung partial derivative terhadap setiap differentiation variable.

## Output

Satu vector.

## Dimension

Jika ada dua parameter, gradient mempunyai dua components.

## Unit

Setiap component mempunyai unit:

> output-unit $J$ per unit parameter terkait.

Jika parameter berbeda mempunyai units berbeda, components gradient juga dapat mempunyai unit interpretation berbeda.

## Local interpretation

Gradient mendeskripsikan first-order local change di sekitar point yang sedang dianalisis.

## Apa yang TIDAK otomatis diimplikasikan?

Gradient:

- bukan loss value;
- bukan probability;
- bukan causal effect;
- bukan universal feature importance;
- bukan parameter update;
- bukan jaminan global minimum;
- bukan jaminan generalization;
- tidak memberi step size dengan sendirinya.

---

# 8. WORKED BASIC EXAMPLE — Satu Parameter, Tiga Lokasi

Gunakan lagi:

$$
J(w)=(w-1)^2.
$$

Derivative:

$$
J'(w)=2(w-1).
$$

## Point A: $w=0$

Loss:

$$
J(0)=1.
$$

Derivative:

$$
J'(0)=-2.
$$

Interpretasi:

- loss value = $1$;
- local slope = $-2$;
- jika $w$ bertambah sedikit, loss cenderung turun;
- derivative bukan nilai loss.

## Point B: $w=1$

Loss:

$$
J(1)=0.
$$

Derivative:

$$
J'(1)=0.
$$

Interpretasi:

- first-order local slope zero;
- pada **parabola ini**, point tersebut adalah minimum;
- kesimpulan minimum berasal dari shape/function behavior, bukan dari rule “zero selalu minimum”.

## Point C: $w=2$

Loss:

$$
J(2)=1.
$$

Derivative:

$$
J'(2)=2.
$$

Interpretasi:

- jika $w$ bertambah sedikit, loss naik;
- corresponding local-decrease direction adalah ke nilai $w$ yang lebih kecil.

Kita belum mengatakan seberapa jauh $w$ harus berubah.

---

# 9. LOCAL MINIMUM, GLOBAL MINIMUM, DAN CRITICAL POINT

## Local minimum

Sebuah point disebut local minimum jika nilai function di point itu lebih rendah daripada points yang cukup dekat di sekitarnya.

Secara intuitif:

> paling rendah di **lingkungan lokal**.

## Global minimum

Sebuah global minimum mempunyai nilai function paling rendah dibanding seluruh domain yang sedang dipertimbangkan.

Secara intuitif:

> paling rendah secara **keseluruhan**.

## Critical / stationary condition

Untuk differentiable 1D function, point dengan:

$$
J'(w)=0
$$

adalah stationary/critical candidate.

Untuk differentiable multivariable function:

$$
\nabla J(\boldsymbol{\theta})=\mathbf{0}
$$

adalah stationary condition.

Tetapi:

> stationary tidak otomatis berarti minimum.

Ia dapat berkaitan dengan:

- local minimum;
- local maximum;
- saddle-type behavior;
- atau kondisi lain yang memerlukan informasi tambahan.

### Counterexample sederhana

Gunakan:

$$
F(w)=w^3.
$$

Derivative:

$$
F'(w)=3w^2.
$$

Pada:

$$
w=0,
$$

kita memperoleh:

$$
F'(0)=0.
$$

Tetapi $w=0$ bukan local minimum dan bukan local maximum. Function terus meningkat melewati point tersebut.

Jadi:

> **zero derivative bukan bukti global minimum.**

---

# 10. WORKED AI EXAMPLE — Synthetic 2D Loss Bowl

Sekarang gunakan **SYNTHETIC / HYPOTHETICAL AI LOSS**, bukan production HerAI model:

$$
J(w,b)
=
(w-1)^2
+
2(b+1)^2.
$$

Function ini mempunyai dua parameter:

- $w$;
- $b$.

Gradient:

$$
\nabla J(w,b)
=
\begin{bmatrix}
2(w-1)\\
4(b+1)
\end{bmatrix}.
$$

Evaluasi pada:

$$
(w,b)=(2,0).
$$

Maka:

$$
\nabla J(2,0)
=
\begin{bmatrix}
2\\
4
\end{bmatrix}.
$$

## Membaca hasil

Component pertama:

$$
\frac{\partial J}{\partial w}=2.
$$

Artinya di sekitar point tersebut, kenaikan kecil pada $w$ cenderung menaikkan $J$ menurut local first-order information.

Component kedua:

$$
\frac{\partial J}{\partial b}=4.
$$

Artinya local rate terhadap $b$ lebih besar secara numeric pada state ini.

Tetapi berhati-hati:

> numeric magnitude lebih besar **tidak otomatis** berarti $b$ adalah parameter yang “lebih penting” secara universal.

Gradient:

$$
\begin{bmatrix}
2\\
4
\end{bmatrix}
$$

menunjukkan steepest local increase.

Corresponding local-decrease direction:

$$
-\nabla J(2,0)
=
\begin{bmatrix}
-2\\
-4
\end{bmatrix}.
$$

Ini baru sebuah **direction**.

Kita belum menentukan:

- panjang langkah;
- parameter state berikutnya;
- learning rate;
- berapa kali langkah diulang;
- stopping criterion.

Semua itu adalah masalah Optimization.

---

# 11. CONTOUR INTUITION — Membaca Landscape Tanpa Surface 3D

Untuk:

$$
J(w,b)
=
(w-1)^2
+
2(b+1)^2,
$$

points dengan loss sama membentuk level/contour curves.

Secara visual:

- contour dekat center menggambarkan nilai loss lebih rendah;
- contour lebih jauh menggambarkan nilai lebih tinggi;
- gradient di suatu point tegak lurus terhadap contour lokal dan mengarah ke peningkatan tercepat;
- negative gradient mengarah ke corresponding local decrease.

Center bowl pada contoh ini berada di:

$$
(w,b)=(1,-1).
$$

Di sana:

$$
\nabla J(1,-1)
=
\begin{bmatrix}
0\\
0
\end{bmatrix}.
$$

Karena function ini adalah simple positive quadratic bowl, center tersebut memang global minimum.

Sekali lagi:

> kesimpulan global minimum berlaku karena kita mengetahui **shape/function khusus ini**, bukan hanya karena gradient zero.

---

# 12. PERSISTENT HerAI MAPPING — Jangan Ubah Score Menjadi Loss

Canonical HerAI instructional score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Dengan:

- $q$ = quiz ratio;
- $c$ = completion ratio;
- $h(q,c)$ = instructional weighted score.

Gradient-nya:

$$
\nabla h(q,c)
=
\begin{bmatrix}
0.6\\
0.4
\end{bmatrix}.
$$

Topic 06 sudah menginterpretasikan ini sebagai local sensitivity dari **instructional score**.

Di Topic 08, kita membuat distinction yang sangat penting:

> $h(q,c)$ **bukan loss function** hanya karena ia scalar dan mempunyai gradient.

Ia juga bukan:

- probability;
- calibrated probability;
- confidence;
- causal model;
- production recommendation.

Sebuah scalar function baru boleh disebut loss/objective jika semantics tersebut **didefinisikan secara eksplisit**.

Dalam canonical HerAI case, semantics $h$ tetap:

> **instructional score only.**

Jadi jangan menulis:

> “HerAI meminimalkan $h$.”

Tidak ada basis untuk klaim tersebut.

---

# 13. OPTIONAL SYNTHETIC WRAPPER — Hanya untuk Melihat Nonlinearity

Untuk latihan Calculus saja, kita boleh mendefinisikan **synthetic wrapper**:

$$
R(q,c)
=
\left(h(q,c)-0.75\right)^2.
$$

Dengan:

$$
h(q,c)=0.6q+0.4c.
$$

Label safety:

> **SYNTHETIC / HYPOTHETICAL CALCULUS FUNCTION. Bukan production HerAI loss.**

Function tersebut hanya mengukur squared numerical deviation dari arbitrary instructional target $0.75$ yang sengaja dipilih untuk latihan.

Ia **tidak** menyatakan:

- target kebijakan HerAI;
- kualitas peserta;
- probability sukses;
- causal effect;
- production training objective.

Chain rule memberi:

$$
\frac{\partial R}{\partial q}
=
2(h-0.75)(0.6),
$$

dan:

$$
\frac{\partial R}{\partial c}
=
2(h-0.75)(0.4).
$$

Gradient:

$$
\nabla R
=
2(h-0.75)
\begin{bmatrix}
0.6\\
0.4
\end{bmatrix}.
$$

Tujuan contoh ini hanya menunjukkan:

> nonlinear wrapper dapat membuat gradient berubah tergantung current state.

---

# 14. CHANGE ONE THING — Landscape Sama Lokasi Minimum, Berbeda Steepness

Bandingkan dua **synthetic losses**:

$$
J_1(w)=(w-1)^2
$$

dan:

$$
J_2(w)=4(w-1)^2.
$$

Keduanya mempunyai minimum di:

$$
w=1.
$$

Tetapi derivative:

$$
J_1'(w)=2(w-1),
$$

sedangkan:

$$
J_2'(w)=8(w-1).
$$

Pada $w=2$:

$$
J_1'(2)=2,
$$

$$
J_2'(2)=8.
$$

Interpretasi:

- lokasi minimum sama;
- slope/steepness berbeda;
- gradient magnitude bergantung pada scaling function;
- magnitude gradient bukan universal “importance score”.

Ini penting ketika membaca landscape.

Dua objectives dapat mempunyai bentuk dasar serupa tetapi scaling berbeda.

---

# 15. WHY THIS MATTERS IN AI

Dalam machine learning, model mempunyai parameter.

Kita dapat menulis secara abstrak:

$$
\boldsymbol{\theta}
\longrightarrow
J(\boldsymbol{\theta}).
$$

Calculus memungkinkan kita membaca:

$$
\nabla_{\boldsymbol{\theta}}J(\boldsymbol{\theta}).
$$

Gradient memberi local information tentang bagaimana objective berubah jika parameter berubah sedikit.

Inilah informasi yang akan digunakan oleh banyak optimization methods.

Tetapi ada distinction penting:

## Calculus menjawab

- bagaimana objective berubah secara lokal?
- component parameter mana mempunyai partial derivative tertentu?
- arah mana yang merupakan steepest local increase?
- arah mana yang merupakan corresponding steepest local decrease?
- apakah first-order gradient zero di point tertentu?

## Optimization menjawab

- bagaimana parameter benar-benar diubah?
- seberapa jauh langkah diambil?
- apakah langkah diulang?
- learning rate berapa?
- kapan berhenti?
- optimizer apa yang dipakai?
- bagaimana menghadapi noisy gradient, curvature, atau conditioning?

Jadi:

> **gradient information adalah input matematis bagi optimization reasoning, bukan optimization algorithm itu sendiri.**

---

# 16. LOWER LOSS ≠ AUTOMATICALLY BETTER REAL-WORLD SYSTEM

Ini adalah safety point yang sangat penting untuk AI.

Misalkan training objective turun.

Kita **tidak boleh otomatis menyimpulkan**:

- generalization pasti lebih baik;
- fairness pasti membaik;
- calibration pasti membaik;
- robustness pasti membaik;
- user experience pasti membaik;
- real-world outcome pasti lebih baik.

Kenapa?

Karena objective adalah quantity yang didefinisikan untuk tujuan tertentu.

Real system dapat dinilai dengan metrics dan constraints lain.

Bahkan dalam machine learning, training objective dan performance pada unseen data adalah concepts yang harus dibedakan.

Jadi kalimat aman:

> **Lower value pada objective tertentu berarti objective tersebut lebih rendah pada evaluation context yang didefinisikan; ia bukan bukti otomatis bahwa seluruh sistem lebih baik.**

---

# 17. MISCONCEPTION CHALLENGE

## Misconception 1 — “Loss adalah probability”

Salah.

Loss adalah scalar objective sesuai definition yang dipilih.

Probability mempunyai probabilistic semantics tersendiri.

---

## Misconception 2 — “Gradient adalah loss”

Salah.

$J(\boldsymbol{\theta})$ adalah scalar value.

$\nabla J(\boldsymbol{\theta})$ adalah vector local-change information.

---

## Misconception 3 — “Positive gradient berarti model buruk”

Salah.

Sign gradient menjelaskan local direction of change terhadap chosen coordinates.

Ia bukan label moral “baik/buruk”.

---

## Misconception 4 — “Negative gradient menjamin global minimum”

Salah.

Negative gradient memberikan corresponding steepest local-decrease direction dalam standard Euclidean interpretation.

Local direction tidak memberi global guarantee.

---

## Misconception 5 — “Gradient zero berarti global minimum”

Salah.

Zero gradient adalah stationary condition untuk differentiable function.

Stationary point dapat berupa minimum, maximum, saddle-type point, atau memerlukan analysis tambahan.

---

## Misconception 6 — “Kalau sudah tahu negative gradient, update parameter sudah selesai”

Salah.

Direction tidak menentukan step size, learning rate, iteration, stopping rule, atau optimizer.

---

## Misconception 7 — “Loss landscape 2D adalah bentuk sebenarnya model besar”

Salah.

Model besar hidup di high-dimensional parameter space.

2D figure biasanya slice, projection, atau toy visualization.

---

## Misconception 8 — “$h(q,c)$ adalah HerAI loss”

Salah.

Canonical $h(q,c)$ tetap instructional score.

Tidak ada production-loss semantics yang diberikan.

---

## Misconception 9 — “Lower training loss berarti real system pasti lebih baik”

Salah.

Objective tertentu hanya mengukur apa yang didefinisikan oleh objective tersebut dalam context evaluasinya.

---

# 18. TRY IT YOURSELF

Gunakan **synthetic loss**:

$$
J(w)=(w+2)^2.
$$

Tanpa melihat jawaban:

1. Di mana curve mencapai minimum?
2. Hitung $J'(w)$.
3. Hitung $J'(-3)$.
4. Dari $w=-3$, jika $w$ dinaikkan sedikit, apakah loss naik atau turun secara lokal?
5. Hitung $J'(-1)$.
6. Apa corresponding local-decrease direction dari $w=-1$?
7. Apakah derivative memberi tahu seberapa besar langkah yang harus diambil?
8. Apakah nilai $J(w)$ dapat disebut probability?

### Check

Derivative:

$$
J'(w)=2(w+2).
$$

Pada $w=-3$:

$$
J'(-3)=-2.
$$

Menaikkan $w$ sedikit cenderung menurunkan loss secara lokal.

Pada $w=-1$:

$$
J'(-1)=2.
$$

Local-decrease direction adalah ke nilai $w$ yang lebih kecil.

Step size masih belum ditentukan.

---

# 19. VISUAL / INTERACTIVE SPEC

## [STATIC VISUAL] — 1D Loss Curve + Local Tangent

**Purpose:** memperlihatkan hubungan loss value, derivative sign, stationary point, dan minimum pada toy parabola.

**Initial function:**

$$
J(w)=(w-1)^2.
$$

**Display:**

- curve untuk $w\in[-1,3]$;
- points $w=0$, $1$, $2$;
- tangent/local slope di ketiga points;
- label:
  - $J'(0)<0$;
  - $J'(1)=0$;
  - $J'(2)>0$.

**Safety note:** label “synthetic toy loss”; zero derivative pada $w=1$ adalah global minimum **karena shape function ini**, bukan universal rule.

---

## [NUMBER MANIPULATOR] — Move One Parameter on a Loss Curve

**Purpose:** learner menghubungkan parameter position dengan loss dan derivative.

**Initial state:** $w=0$ pada $J(w)=(w-1)^2$.

**Learner action:** slider $w$ dari $-1$ hingga $3$.

**Expected behavior:** tampilkan secara live:

- $J(w)$;
- $J'(w)$;
- sign derivative;
- local increase direction;
- local decrease direction.

**Feedback:** jika learner memilih “derivative = loss”, tampilkan correction bahwa derivative adalah local rate.

**Safety:** jangan menyediakan automatic parameter update.

---

## [STATIC VISUAL] — 2D Contour + Gradient Arrow

**Purpose:** memperlihatkan gradient pada two-parameter loss.

**Function:**

$$
J(w,b)
=
(w-1)^2
+
2(b+1)^2.
$$

**Initial point:**

$$
(w,b)=(2,0).
$$

**Display:**

- elliptical contours;
- point $(2,0)$;
- gradient arrow:
  $$
  \begin{bmatrix}
  2\\
  4
  \end{bmatrix};
  $$
- opposite local-decrease arrow:
  $$
  \begin{bmatrix}
  -2\\
  -4
  \end{bmatrix}.
  $$

**Safety:** arrows menunjukkan local directions, bukan update vector yang sudah memiliki step size.

---

## [INTERACTIVE VISUAL] — Explore 2D Landscape

**Purpose:** melihat perubahan gradient saat point berpindah.

**Learner action:** drag point $(w,b)$.

**Expected behavior:**

- tampilkan current $J(w,b)$;
- current $\nabla J(w,b)$;
- gradient arrow berubah;
- negative-gradient direction berubah;
- center $(1,-1)$ terlihat sebagai zero-gradient point.

**Feedback:** saat gradient mendekati zero, UI tidak boleh menulis “global minimum guaranteed”; tulis “stationary condition; classification depends on function structure.”

---

## [COMPARE VIEW] — Score vs Loss

**Left panel:**

$$
h(q,c)=0.6q+0.4c
$$

label:

> instructional score.

**Right panel:**

$$
J(w,b)
=
(w-1)^2+2(b+1)^2
$$

label:

> synthetic loss.

**Purpose:** mencegah learner menyimpulkan bahwa semua scalar functions mempunyai semantics sama.

---

## [STEP-BY-STEP REVEAL] — Calculus → Optimization Boundary

Reveal berurutan:

1. parameter state;
2. objective value;
3. derivative/gradient;
4. local increase direction;
5. local decrease direction;
6. STOP.

Kemudian tampilkan:

> “Bagaimana memilih step size dan membuat update berulang?”  
> **Submodule 06 — Optimization.**

Jangan tampilkan update equation pada Topic 08.

---

# 20. CHECKPOINT

Jawab tanpa melihat kembali materi jika bisa.

### A

Apa perbedaan:

$$
J(\boldsymbol{\theta})
$$

dan:

$$
\nabla J(\boldsymbol{\theta})?
$$

**Expected:** yang pertama scalar objective value; yang kedua vector local rates terhadap parameters.

### B

Apa arti negative gradient?

**Expected:** corresponding steepest local-decrease direction dalam standard Euclidean interpretation.

### C

Apakah negative gradient menjamin global minimum?

**Expected:** tidak.

### D

Apakah gradient zero otomatis global minimum?

**Expected:** tidak. Ia stationary condition dan membutuhkan information tambahan.

### E

Apakah $h(q,c)$ sekarang menjadi loss?

**Expected:** tidak. Ia tetap instructional score.

### F

Apa yang masih belum ditentukan setelah mengetahui gradient?

**Expected:** step size, update rule, iteration, learning rate, optimizer, stopping/convergence behavior.

---

# 21. MASTERY CHECK — “I Can”

Setelah Topic 08, peserta seharusnya dapat berkata:

- **I can** membaca loss sebagai scalar function dari parameter.
- **I can** menjelaskan apa yang dimaksud loss landscape.
- **I can** membaca 1D loss curve dan 2D contour secara konseptual.
- **I can** menghubungkan derivative sign dengan local loss change.
- **I can** menghubungkan gradient dengan steepest local increase.
- **I can** menjelaskan negative gradient sebagai corresponding local-decrease direction.
- **I can** membedakan loss value dan gradient.
- **I can** membedakan local dan global minimum secara geometris.
- **I can** menjelaskan mengapa zero gradient tidak otomatis global minimum.
- **I can** menjelaskan bahwa lower loss tidak otomatis berarti real-world system lebih baik.
- **I can** menjaga $h(q,c)$ tetap sebagai instructional score.
- **I can** mengenali synthetic/hypothetical loss sebagai contoh belajar, bukan production HerAI behavior.
- **I can** menjelaskan dengan tepat batas Calculus dan Optimization.

---

# 22. SCOPE BOUNDARY — Apa yang Sengaja Belum Diajarkan?

Topic 08 berhenti pada:

> **loss sebagai function → landscape representation → derivative/gradient pada loss → local increase/decrease direction → critical/stationary intuition → local/global minimum distinction → bridge ke Optimization.**

Belum menjadi core/computation requirement:

- Gradient Descent update equation;
- learning rate;
- iteration;
- mini-batch / stochastic gradient mechanics;
- Momentum;
- RMSProp;
- Adam;
- optimizer comparison;
- convergence proof;
- line search;
- Hessian;
- second-order optimization;
- Newton method;
- formal convex optimization;
- constrained optimization;
- full neural-network training loop;
- full backpropagation derivation;
- automatic differentiation implementation;
- production HerAI training objective.

Topic ini juga tidak mengajarkan bahwa:

- negative gradient menjamin global minimum;
- zero gradient menjamin minimum;
- lower training loss menjamin generalization;
- loss adalah probability;
- canonical HerAI score adalah loss.

Semua mechanics untuk **memilih dan menjalankan parameter updates** dimulai pada Submodule 06 — Optimization.

---

# 23. SUMMARY — Apa yang Sudah Kita Bangun?

Calculus memberi kita bahasa untuk membaca perubahan.

Dari awal Submodule 05 kita membangun progression:

1. function dan graph;
2. slope dan average rate;
3. derivative sebagai local change;
4. derivative rules sederhana;
5. partial derivative;
6. gradient sebagai vector partial derivatives;
7. chain rule melalui composed computations;
8. loss landscape sebagai tempat semua konsep tersebut bertemu.

Untuk scalar objective:

$$
J(\boldsymbol{\theta}),
$$

gradient:

$$
\nabla J(\boldsymbol{\theta})
$$

memberikan local rate information terhadap parameters.

Dalam standard Euclidean interpretation:

- gradient → steepest local increase;
- negative gradient → corresponding steepest local decrease.

Tetapi:

> **direction information bukan update algorithm.**

Critical/stationary point seperti:

$$
\nabla J=\mathbf{0}
$$

juga bukan bukti otomatis global minimum.

Canonical HerAI:

$$
h(q,c)=0.6q+0.4c
$$

tetap instructional score, bukan probability dan bukan loss.

Synthetic loss examples pada Topic 08 hanya berfungsi untuk latihan Calculus.

---

# 24. BRIDGE — Dari Calculus ke Optimization

Kita sekarang dapat menjawab pertanyaan:

> “Jika parameter berubah sedikit, bagaimana objective berubah?”

Kita juga dapat membaca:

- local derivative;
- partial derivatives;
- gradient;
- chain rule;
- local directions pada landscape.

Tetapi kita belum menjawab:

> “Dengan informasi gradient itu, **bagaimana** parameter seharusnya diperbarui secara sistematis?”

Untuk menjawabnya kita membutuhkan keputusan tambahan:

- direction digunakan bagaimana;
- step size berapa;
- update dilakukan berapa kali;
- kapan berhenti;
- bagaimana memilih optimizer;
- bagaimana menangani noisy atau difficult landscapes.

Itulah wilayah:

# **Submodule 06 — Optimization: Dari Loss ke Parameter yang Lebih Baik**

Namun sesuai workflow HerAI, setelah Topic 08 ini kita **belum langsung memproduksi Submodule 06**.

Urutannya:

1. Topic 08 direview dan mendapat explicit approval;
2. Submodule 05 dikonsolidasikan ke final package + combined assessment;
3. baru checkpoint berikutnya dapat berpindah ke Submodule 06 sesuai approval.

---

# Referensi Ringkas

Source ledger lengkap tersedia di `referensi-topic-08.md`.

- [R1] MIT OpenCourseWare — *18.02SC Multivariable Calculus*, Part B: Chain Rule, Gradient and Directional Derivatives.
- [R2] OpenStax — *Calculus Volume 1*, Section 4.3: Maxima and Minima.
- [R3] Goodfellow, Bengio, Courville — *Deep Learning*, Chapter 4: Numerical Computation, Section 4.3 Gradient-Based Optimization.
- [R4] Goodfellow, Bengio, Courville — *Deep Learning*, Chapter 8: Optimization for Training Deep Models.

> Browser-level target HerAI Markdown parser + KaTeX runtime: **NOT TESTED / NOT CLAIMED**.
