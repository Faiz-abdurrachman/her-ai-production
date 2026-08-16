# Topic 07 — Momentum dan Adam: Peta Konsep

## Tujuan belajar

Setelah menyelesaikan topik ini, peserta diharapkan mampu:

1. menjelaskan mengapa optimizer dapat menyimpan **state** dari gradient sebelumnya;
2. membedakan Gradient Descent/SGD tanpa momentum dengan SGD + Momentum secara konseptual;
3. mengikuti trace Momentum sederhana selama 2–3 langkah tanpa menganggapnya sebagai jaminan konvergensi;
4. menjelaskan ide **first-moment memory** dan **second-moment scale** pada Adam tanpa menghafal derivasi penuh;
5. menjelaskan mengapa Adam tetap mempunyai learning rate dan hyperparameter lain;
6. menjelaskan bahwa Momentum maupun Adam tidak otomatis menyelesaikan overfitting atau menjamin generalization;
7. mengenali RMSProp sebagai orientasi konsep saja, bukan computation requirement;
8. menjaga batas semantic HerAI: optimizer toy bukan production recommendation system.

---

## HOOK / REAL PROBLEM — Ketika gradient hari ini tidak berdiri sendiri

Pada Topic 06, kita melihat bahwa gradient dari minibatch dapat berbeda dari gradient minibatch lain. Artinya, arah update pada step sekarang bisa berubah karena subset data yang dipakai juga berubah.

Bayangkan tiga gradient satu parameter muncul berurutan:

$$
g_1=4,\qquad g_2=3,\qquad g_3=2.
$$

Ketiganya searah. Gradient biasa hanya memakai nilai yang sedang tersedia pada step saat itu. Tetapi kita dapat bertanya:

> Jika beberapa gradient berturut-turut memberi sinyal arah yang konsisten, apakah optimizer sebaiknya menyimpan sebagian informasi dari langkah sebelumnya?

Momentum menjawab pertanyaan tersebut dengan memperkenalkan **state** yang membawa sebagian riwayat arah gerak ke step berikutnya.

Adam melangkah lebih jauh: ia menyimpan informasi tentang kecenderungan gradient **dan** skala squared gradient untuk membuat step yang adaptif per komponen parameter.

Namun dua hal harus dikunci sejak awal:

- optimizer yang lebih kompleks bukan otomatis optimizer yang lebih baik untuk semua masalah;
- optimizer yang menurunkan training objective bukan otomatis menghasilkan generalization yang lebih baik.

---

## PREDICT — Mana yang memiliki “memori”? 

Bandingkan dua pola berikut.

### Pola A

$$
4,\ 3,\ 2
$$

Semua gradient mempunyai tanda yang sama.

### Pola B

$$
4,\ -4,\ 4
$$

Gradient berbalik arah pada setiap step.

Sebelum menghitung apa pun, prediksi:

1. pada pola mana informasi dari gradient sebelumnya kemungkinan paling membantu memperkuat arah gerak yang konsisten?
2. pada pola mana state dari langkah sebelumnya dapat menahan perubahan arah yang terlalu mendadak?

Simpan prediksi Anda. Kita akan kembali ke pertanyaan ini setelah memahami Momentum.

---

## INTUITION — Dari optimizer tanpa state ke optimizer dengan state

Update dasar yang sudah dikenal dapat ditulis:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta\mathbf{g}_t,
$$

karena pada konteks minibatch, $\mathbf{g}_t$ dapat menjadi gradient estimate pada step $t$.

Pada bentuk ini, update terutama menggunakan:

- parameter sekarang $\boldsymbol{\theta}_t$;
- gradient sekarang $\mathbf{g}_t$;
- learning rate $\eta$.

Momentum menambah satu komponen penting: **velocity/state** yang membawa pengaruh dari gradient sebelumnya.

Jadi secara konseptual:

**tanpa Momentum**

$$
\text{gradient sekarang}
\rightarrow
\text{update sekarang}
$$

sedangkan **dengan Momentum**:

$$
\text{gradient sekarang}
+
\text{state dari masa lalu}
\rightarrow
\text{update sekarang}.
$$

State ini bukan “ingatan” seperti manusia. Ia adalah nilai numerik yang disimpan oleh optimizer dan diperbarui setiap step.

---

## EXPLORE — Mengapa urutan gradient penting?

Misalkan kita hanya melihat tanda gradient.

### Urutan konsisten

$$
+,+,+,+
$$

Informasi beberapa step terakhir relatif selaras. Momentum dapat mengakumulasi arah gerak tersebut.

### Urutan bolak-balik

$$
+,-,+,-
$$

Informasi terbaru tidak konsisten. State Momentum dapat membuat perubahan arah tidak sepenuhnya mengikuti satu gradient baru secara mendadak.

Hal ini **tidak** berarti Momentum selalu menghasilkan path yang lebih baik. Efek aktual bergantung pada objective, learning rate, momentum coefficient, gradient sequence, dan kondisi masalah.

---

# FORMAL DEFINITION — Momentum sebagai stateful first-order method

Salah satu bentuk umum Momentum yang cocok untuk membaca konsep adalah:

$$
\mathbf{u}_t
=
\alpha\mathbf{u}_{t-1}
-
\eta\mathbf{g}_t,
$$

lalu:

$$
\boldsymbol{\theta}_t
=
\boldsymbol{\theta}_{t-1}
+
\mathbf{u}_t.
$$

Di sini:

- $\boldsymbol{\theta}_{t-1}$ = parameter sebelum update;
- $\mathbf{g}_t$ = gradient atau gradient estimate pada step $t$;
- $\eta>0$ = learning rate;
- $\alpha$ = momentum coefficient yang mengontrol seberapa banyak state lama dipertahankan;
- $\mathbf{u}_{t-1}$ = velocity/state sebelumnya;
- $\mathbf{u}_t$ = velocity/state baru;
- $\boldsymbol{\theta}_t$ = parameter setelah update.

Jika $\alpha=0$, kontribusi velocity lama hilang dan bentuknya kembali dekat dengan update gradient tanpa Momentum.

### Penting tentang konvensi rumus

Buku, paper, dan library dapat menempatkan learning rate di lokasi yang sedikit berbeda pada momentum buffer. Misalnya dokumentasi PyTorch menjelaskan bahwa konvensi implementasinya berbeda secara notasi dari sebagian referensi lain.

Yang harus dikuasai di topik ini bukan menghafal satu konvensi simbol, tetapi memahami invariant concept berikut:

> Momentum menyimpan state dari update/gradient sebelumnya dan memadukannya dengan gradient baru sebelum parameter bergerak.

---

# MATH READING SKILL — Membaca satu step Momentum

Gunakan:

$$
\mathbf{u}_t
=
\alpha\mathbf{u}_{t-1}
-
\eta\mathbf{g}_t.
$$

Baca dari kiri ke kanan:

1. **output state:** $\mathbf{u}_t$ adalah velocity baru;
2. **memory term:** $\alpha\mathbf{u}_{t-1}$ membawa sebagian state sebelumnya;
3. **new local information:** $\mathbf{g}_t$ adalah gradient pada step sekarang;
4. **scale:** $\eta$ mengontrol kontribusi gradient ke velocity;
5. **negative direction:** tanda minus tetap berkaitan dengan minimization terhadap local gradient information;
6. **next parameter:** velocity baru kemudian ditambahkan ke parameter lama.

Dimensi $\mathbf{u}_t$, $\mathbf{g}_t$, dan $\boldsymbol{\theta}_t$ harus compatible. Untuk parameter vector berdimensi $d$, ketiganya juga mempunyai $d$ komponen.

Rumus ini tidak menyatakan bahwa:

- objective pasti turun setiap step;
- global minimum pasti ditemukan;
- generalization pasti membaik;
- Momentum otomatis lebih baik daripada SGD tanpa Momentum.

---

# WORKED BASIC EXAMPLE — Tiga gradient yang searah

Gunakan satu parameter scalar agar arithmetic mudah diperiksa.

Diberikan:

$$
\theta_0=0,\qquad u_0=0,\qquad \eta=0.1,\qquad \alpha=0.5.
$$

Gradient yang muncul berturut-turut:

$$
g_1=4,\qquad g_2=3,\qquad g_3=2.
$$

## Step 1

$$
u_1
=
0.5(0)-0.1(4)
=
-0.4.
$$

$$
\theta_1
=
0+(-0.4)
=
-0.4.
$$

## Step 2

$$
u_2
=
0.5(-0.4)-0.1(3)
=
-0.2-0.3
=
-0.5.
$$

$$
\theta_2
=
-0.4+(-0.5)
=
-0.9.
$$

## Step 3

$$
u_3
=
0.5(-0.5)-0.1(2)
=
-0.25-0.2
=
-0.45.
$$

$$
\theta_3
=
-0.9+(-0.45)
=
-1.35.
$$

Perhatikan: pada step 2 dan 3, update tidak ditentukan oleh gradient baru saja. Velocity sebelumnya masih berkontribusi.

Jika update tanpa Momentum memakai gradient yang sama dengan $\eta=0.1$, total gerak setelah tiga step adalah:

$$
-0.4-0.3-0.2=-0.9.
$$

Sedangkan trace Momentum di atas mencapai $\theta_3=-1.35$ karena gradient yang searah mengakumulasi velocity.

**Safety note:** ini bukan bukti bahwa Momentum selalu lebih cepat atau lebih baik. Kita hanya menunjukkan bagaimana state mengubah update pada satu gradient sequence synthetic.

---

# CHANGE ONE THING — Bagaimana jika gradient berganti tanda?

Pertahankan:

$$
\theta_0=0,\quad u_0=0,\quad \eta=0.1,\quad \alpha=0.5,
$$

namun ubah gradient menjadi:

$$
g_1=4,\qquad g_2=-4,\qquad g_3=4.
$$

Maka:

$$
u_1=-0.4,
$$

$$
u_2=0.5(-0.4)-0.1(-4)=0.2,
$$

$$
u_3=0.5(0.2)-0.1(4)=-0.3.
$$

Velocity tidak langsung berubah menjadi $+0.4$ atau $-0.4$ setiap kali tanda gradient berubah. State lama masih ikut membentuk update berikutnya.

Inilah salah satu intuisi penting Momentum: **riwayat arah berpengaruh terhadap gerak sekarang**.

Tetapi sekali lagi, smoothing bukan sinonim dari “selalu lebih baik”.

---

# Dari Momentum ke Adam — Dua jenis informasi historis

Momentum terutama memberi kita satu ide:

> simpan kecenderungan arah dari gradient/update sebelumnya.

Adam membawa dua jenis state yang berbeda secara konseptual:

1. **first-moment estimate** — moving average dari gradient;
2. **second raw-moment estimate** — moving average dari squared gradient.

Secara pedagogis:

- first moment membantu merangkum **arah/trend** gradient;
- squared-gradient state membantu merangkum **skala historis** gradient per komponen;
- kombinasi keduanya membuat effective update dapat beradaptasi berbeda pada komponen parameter yang berbeda.

Adam tetap merupakan **first-order gradient-based optimizer**. Ia tidak menghitung Hessian sebagai requirement inti.

---

# Adam formula map — ORIENTATION ONLY

Bagian ini adalah **peta notasi**, bukan formula yang harus dihafal atau diturunkan di assessment core.

Gunakan gradient:

$$
\mathbf{g}_t
=
\nabla J_t(\boldsymbol{\theta}_{t-1}).
$$

Kita tulis first-moment state sebagai:

$$
\mathbf{m}_t
=
\beta_1\mathbf{m}_{t-1}
+
(1-\beta_1)\mathbf{g}_t.
$$

Untuk menghindari bentrok simbol dengan velocity Momentum, materi ini menamai second-moment state dengan $\mathbf{s}_t$:

$$
\mathbf{s}_t
=
\beta_2\mathbf{s}_{t-1}
+
(1-\beta_2)(\mathbf{g}_t\odot\mathbf{g}_t).
$$

Simbol $\odot$ berarti perkalian element-wise.

Karena moving averages dimulai dari nol, Adam memakai bias-corrected estimates pada fase awal. Kita tulis secara orientasi:

$$
\widehat{\mathbf{m}}_t
=
\frac{\mathbf{m}_t}{1-\beta_1^t},
\qquad
\widehat{\mathbf{s}}_t
=
\frac{\mathbf{s}_t}{1-\beta_2^t}.
$$

Kemudian peta update-nya:

$$
\boldsymbol{\theta}_t
=
\boldsymbol{\theta}_{t-1}
-
\eta
\frac{\widehat{\mathbf{m}}_t}
{\sqrt{\widehat{\mathbf{s}}_t}+\epsilon}.
$$

Semua operasi pembagian dan akar di atas dipahami element-wise.

### Cara membaca, bukan menghafal

- $\mathbf{m}_t$ menyimpan moving average gradient;
- $\mathbf{s}_t$ menyimpan moving average squared gradient;
- $\beta_1$ dan $\beta_2$ mengontrol decay/memory masing-masing state;
- $\eta$ tetap merupakan learning rate;
- $\epsilon$ membantu kestabilan numerik pada denominator;
- $\widehat{\mathbf{m}}_t$ dan $\widehat{\mathbf{s}}_t$ adalah corrected estimates;
- update masih menggunakan gradient-derived information untuk mengubah parameter.

### Apa yang TIDAK boleh disimpulkan

Formula Adam tidak berarti:

- learning rate sudah tidak diperlukan;
- Adam tidak perlu tuning sama sekali;
- Adam selalu mengalahkan SGD/Momentum;
- Adam menjamin global optimum;
- Adam mencegah overfitting;
- Adam menjamin validation metric atau business metric membaik.

---

# Mengapa “adaptive” tidak berarti “otomatis benar”?

Misalkan dua komponen gradient mempunyai skala berbeda:

$$
\mathbf{g}_t
=
\begin{bmatrix}
8\\
0.2
\end{bmatrix}.
$$

Squared gradient adalah:

$$
\mathbf{g}_t\odot\mathbf{g}_t
=
\begin{bmatrix}
64\\
0.04
\end{bmatrix}.
$$

Adam menyimpan historical squared-gradient information untuk setiap komponen. Karena denominator update juga bersifat element-wise, skala effective step dapat berbeda antarparameter.

Namun kata **adaptive** tidak berarti optimizer “mengetahui” step terbaik secara sempurna. Ia tetap mengikuti rule dan hyperparameters tertentu.

---

# RMSProp — mention-only bridge

RMSProp relevan karena ia juga menggunakan moving average dari squared gradients untuk melakukan scaling terhadap update.

Pada submodule ini, RMSProp hanya dipakai sebagai **orientation bridge**:

- ia membantu melihat asal-usul ide adaptive scaling;
- ia membuat hubungan konseptual menuju Adam lebih mudah dipahami;
- formula penuh dan tuning RMSProp **tidak** menjadi mastery requirement.

Jangan menyederhanakan Adam menjadi “RMSProp + Momentum dan selesai”. *Deep Learning* menjelaskan bahwa Adam dapat dipandang terkait dengan kombinasi ide RMSProp dan Momentum, tetapi memiliki perbedaan penting, termasuk first-moment treatment dan bias correction.

---

# WORKED HerAI / AI EXAMPLE — Synthetic optimizer state, bukan production HerAI

Canonical HerAI score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Ia adalah **instructional weighted score only**, bukan loss, bukan objective yang sedang dilatih, dan bukan production recommendation rule.

Untuk mempelajari Momentum, kita membuat parameter terpisah:

$$
w_{\text{syn}}
$$

sebagai **synthetic / hypothetical / instructional trainable parameter**.

Misalkan pada satu toy training process:

- minibatch 1 berisi Alya dan Bima;
- minibatch 2 berisi Citra dan Dewi;
- gradient synthetic yang sudah disediakan adalah $g_1=0.8$ dan $g_2=0.5$.

Gunakan:

$$
w_{\text{syn},0}=0.20,
\qquad
u_0=0,
\qquad
\eta=0.1,
\qquad
\alpha=0.5.
$$

### Step 1 — Alya + Bima

$$
u_1
=
0.5(0)-0.1(0.8)
=
-0.08.
$$

$$
w_{\text{syn},1}
=
0.20-0.08
=
0.12.
$$

### Step 2 — Citra + Dewi

$$
u_2
=
0.5(-0.08)-0.1(0.5)
=
-0.04-0.05
=
-0.09.
$$

$$
w_{\text{syn},2}
=
0.12-0.09
=
0.03.
$$

Yang ingin diperhatikan bukan nilai akhir $0.03$, melainkan fakta bahwa update step 2 memakai **gradient baru sekaligus state dari step 1**.

Gradient $0.8$ dan $0.5$ di sini sengaja dibuat synthetic. Nilai tersebut **bukan** hasil dari canonical HerAI score, bukan evidence production, dan bukan causal effect peserta.

---

# WHY THIS MATTERS IN AI

Pada training model AI dengan minibatch, gradient estimate dapat berubah dari satu step ke step berikutnya. Stateful optimizers memberi mekanisme untuk memanfaatkan historical information.

Secara konseptual:

| Metode | Historical state utama | Ide yang perlu diingat |
|---|---|---|
| SGD tanpa Momentum | tidak ada momentum state | update terutama mengikuti gradient sekarang |
| Momentum | velocity / accumulated direction | previous direction ikut memengaruhi update |
| RMSProp | squared-gradient moving average | adaptive scaling per komponen; mention-only |
| Adam | first-moment + squared-gradient state | trend + adaptive scaling dengan bias correction |

Tabel ini adalah **peta konsep**, bukan ranking dari “terburuk” ke “terbaik”.

---

# MISCONCEPTION CHALLENGE

Tentukan apakah klaim berikut aman.

### Klaim 1

> “Momentum berarti optimizer selalu bergerak lebih cepat menuju minimum.”

**Tidak aman.** Momentum mengubah update dengan historical state. Efeknya bergantung pada problem dan hyperparameters.

### Klaim 2

> “Adam sudah adaptive, jadi learning rate tidak penting lagi.”

**Salah.** Adam tetap mempunyai global learning-rate parameter $\eta$.

### Klaim 3

> “Adam memakai squared gradients, berarti Adam adalah second-order method seperti Newton.”

**Salah.** Squared gradient state bukan Hessian. Adam tetap first-order gradient-based.

### Klaim 4

> “Adam selalu lebih baik daripada SGD dengan Momentum.”

**Salah.** Tidak ada universal winner untuk semua objective, dataset, model, metric, dan training setup.

### Klaim 5

> “Kalau training loss lebih rendah dengan Adam, generalization pasti lebih baik.”

**Salah.** Training objective dan unseen/evaluation performance adalah quantity yang berbeda.

### Klaim 6

> “Momentum atau Adam dapat mengubah $h(q,c)$ menjadi production HerAI recommendation model.”

**Salah.** Optimizer tidak mengubah semantic status dari instructional score tersebut.

---

# TRY IT YOURSELF

Gunakan:

$$
u_0=0,
\qquad
\eta=0.2,
\qquad
\alpha=0.5,
$$

dan gradient:

$$
g_1=2,
\qquad
g_2=1.
$$

Hitung $u_1$ dan $u_2$.

Kemudian jawab:

1. berapa kontribusi state lama pada $u_2$?
2. apakah $u_2$ sama dengan $-\eta g_2$?
3. apa yang membuatnya berbeda?

**Checkpoint answer:**

$$
u_1=-0.4,
$$

$$
u_2=0.5(-0.4)-0.2(1)=-0.4.
$$

Kontribusi state lama adalah $-0.2$. Tanpa Momentum, step dari $g_2$ saja akan bernilai $-0.2$.

---

# VISUAL / INTERACTIVE SPEC

## [COMPARE VIEW] SGD vs Momentum pada gradient sequence yang sama

- **Learning purpose:** memperlihatkan bahwa Momentum membawa state dari step sebelumnya.
- **Initial state/data/function:** $\theta_0=0$, $u_0=0$, gradient sequence $[4,3,2]$, $\eta=0.1$, $\alpha=0.5$.
- **Learner action:** toggle antara “SGD tanpa Momentum” dan “Momentum”.
- **Expected behavior:** panel menampilkan step vector dan cumulative parameter position untuk kedua metode.
- **Feedback:** highlight bagian update yang berasal dari current gradient vs previous velocity.
- **Safety / interpretation note:** trajectory comparison ini synthetic; jarak gerak lebih besar bukan bukti optimizer lebih baik.

## [INTERACTIVE VISUAL] Momentum memory slider

- **Learning purpose:** melihat efek $\alpha$ terhadap kontribusi state sebelumnya.
- **Initial state/data/function:** gradient sequence tetap, $\alpha$ dapat dipilih 0, 0.5, 0.9.
- **Learner action:** ubah $\alpha$.
- **Expected behavior:** velocity history dan update size berubah.
- **Feedback:** sistem menandai berapa persen state lama dibawa pada formula yang sedang dihitung.
- **Safety / interpretation note:** nilai $\alpha$ besar tidak otomatis lebih baik atau stabil.

## [STATIC VISUAL] Adam two-memory map

- **Learning purpose:** membedakan first-moment memory dan squared-gradient scale memory.
- **Initial state/data/function:** satu gradient vector dua dimensi.
- **Learner action:** membaca alur gradient → $\mathbf{m}_t$ dan $\mathbf{s}_t$ → corrected estimates → adaptive update.
- **Expected behavior:** dua jalur state bertemu pada update parameter.
- **Feedback:** callout “direction/trend” untuk first moment dan “scale history” untuk squared-gradient state.
- **Safety / interpretation note:** diagram tidak menyatakan bahwa Adam mengetahui optimal step secara sempurna.

## [COMPARE VIEW] Optimizer concept map

- **Learning purpose:** membandingkan SGD, Momentum, RMSProp, dan Adam tanpa ranking absolut.
- **Initial state/data/function:** empat kartu optimizer.
- **Learner action:** pilih kartu.
- **Expected behavior:** tampil state yang disimpan, informasi gradient yang dipakai, dan scope note.
- **Feedback:** jika learner memilih “Adam = selalu terbaik”, tampilkan misconception correction.
- **Safety / interpretation note:** optimizer choice adalah engineering/modeling decision, bukan universal theorem.

---

# CHECKPOINT

Sebelum lanjut, pastikan Anda dapat menjawab:

1. Apa perbedaan update tanpa Momentum dengan update Momentum?
2. Apa fungsi $\mathbf{u}_{t-1}$ pada Momentum?
3. Mengapa urutan gradient penting?
4. Dua historical states apa yang menjadi inti concept map Adam?
5. Apakah Adam menghilangkan kebutuhan learning rate?
6. Mengapa squared-gradient state bukan Hessian?
7. Apa status RMSProp di topik ini?
8. Mengapa optimizer tidak otomatis menyelesaikan generalization?

---

# MASTERY CHECK — “I can…”

Setelah topik ini, saya dapat mengatakan:

- **I can** menjelaskan optimizer state dengan bahasa saya sendiri.
- **I can** menghitung 2–3 step Momentum sederhana.
- **I can** menjelaskan mengapa aligned gradients dapat mengakumulasi velocity.
- **I can** menjelaskan bahwa changing gradient signs berinteraksi dengan state sebelumnya.
- **I can** membedakan first-moment memory dan squared-gradient scale memory pada Adam.
- **I can** membaca formula map Adam tanpa menganggapnya hafalan wajib.
- **I can** menjelaskan bahwa Adam tetap mempunyai learning rate dan hyperparameters.
- **I can** menolak klaim bahwa Adam selalu paling baik.
- **I can** menjaga synthetic HerAI optimizer example terpisah dari canonical instructional score.

---

# SCOPE BOUNDARY — Apa yang sengaja belum diperdalam?

Topik ini **tidak** menjadikan hal berikut sebagai mastery requirement:

- derivasi penuh Momentum;
- Nesterov momentum;
- convergence-rate proofs;
- derivasi bias correction Adam;
- pembuktian first/second moments secara probabilistik;
- full RMSProp algorithm;
- AdamW;
- AMSGrad;
- optimizer benchmark catalog;
- hyperparameter search system;
- second-order methods seperti Newton;
- optimizer implementation internals;
- production neural-network training pipeline.

Semua ini dapat dipelajari pada Deep Learning/Optimization lanjutan.

---

# SUMMARY

Gradient Descent memberi update berdasarkan local gradient information. Momentum menambahkan **state** sehingga previous directions ikut memengaruhi update berikutnya.

Adam menyimpan dua historical summaries secara konseptual:

- moving average gradient;
- moving average squared gradient.

State tersebut digunakan untuk membentuk adaptive parameter updates. Tetapi “lebih adaptif” tidak berarti “selalu lebih baik”. Adam tetap memakai learning rate, tetap membutuhkan pilihan hyperparameter, dan tidak menjamin global optimum atau generalization.

RMSProp hanya dipakai sebagai orientation bridge di topik ini.

Canonical HerAI score:

$$
h(q,c)=0.6q+0.4c
$$

tetap **instructional score only**.

---

# BRIDGE — Ke Topic 08

Sampai di sini kita sudah melihat bagaimana optimizer dapat menjadi semakin canggih dalam mengubah parameter.

Pertanyaan berikutnya justru lebih penting:

> Jika optimizer berhasil menurunkan training objective, apakah itu berarti sistem sudah bagus pada data baru dan dunia nyata?

Jawabannya tidak otomatis “ya”.

Topic 08 akan menutup Submodule 06 dengan membedakan **optimization**, **regularization bridge**, **generalization**, dan batas klaim yang aman.
