# Topic 06 — Batch, Minibatch, dan Stochastic Gradient
## Dari Objective Seluruh Dataset ke Gradient dari Sebagian Data

> **Posisi dalam modul:** Submodule 06 — Optimization: Dari Loss ke Parameter yang Lebih Baik  
> **Prerequisite aktif:** Topic 01 (loss/objective/evaluation metric), Topic 02 (minimization dan landscape), Topic 03 (Gradient Descent update rule), Topic 04 (learning rate), Topic 05 (iteration trajectory), serta dataset/mean dari Statistics  
> **Fokus topic:** memahami hubungan per-example loss dengan aggregate objective, membedakan full-batch, minibatch, dan single-example/stochastic gradient, menghitung gradient estimate dari subset kecil, serta membaca trade-off tanpa menyimpulkan bahwa salah satu ukuran batch selalu terbaik.  
> **Belum dibahas mendalam:** Momentum, Adam, RMSProp, batch-size tuning recipes, convergence theory, distributed training, gradient accumulation, data-loader engineering, learning-rate scaling rules, atau production training infrastructure.

---

## Learning Outcomes

Setelah menyelesaikan topic ini, peserta mampu:

1. menjelaskan mengapa training objective pada dataset dapat dibangun dari banyak per-example loss;
2. membaca formula aggregate objective sebagai rata-rata scalar loss;
3. membedakan **full-batch gradient**, **minibatch gradient**, dan **single-example/stochastic gradient**;
4. menjelaskan bahwa minibatch gradient memakai subset contoh pada current parameter state;
5. menghitung full-batch gradient dan minibatch gradient pada toy objective yang arithmetic-nya beginner-safe;
6. menjelaskan mengapa dua minibatch berbeda dapat menghasilkan gradient estimate berbeda pada parameter yang sama;
7. menjelaskan bahwa stochasticity bukan berarti gradient dibuat acak tanpa hubungan dengan data;
8. mengenali terminology caveat bahwa istilah **SGD** dalam praktik sering juga dipakai untuk minibatch stochastic updates;
9. membedakan batch size $m$ dari jumlah total training examples $n$;
10. menjelaskan secara conceptually trade-off antara memakai lebih banyak contoh per gradient estimate dan biaya komputasi/memori;
11. menolak klaim bahwa full-batch gradient selalu “lebih baik” untuk seluruh tujuan training;
12. mempertahankan semantic boundary HerAI: $h(q,c)=0.6q+0.4c$ tetap instructional score, bukan loss atau production objective;
13. menggunakan HerAI hanya melalui objective synthetic/hypothetical yang dilabel jelas;
14. menjelaskan bahwa Topic 06 belum mengajarkan Momentum/Adam; optimizer tersebut masuk Topic 07.

---

# 1. HOOK / REAL PROBLEM — Haruskah Setiap Update Membaca Seluruh Dataset?

Pada Topic 01 kita menggunakan aggregate objective:

$$
J(\boldsymbol{\theta})
=
\frac{1}{n}
\sum_{i=1}^{n}
\ell^{(i)}(\boldsymbol{\theta}).
$$

Pada Topic 03–05 kita kemudian memakai gradient untuk memperbarui parameter.

Jika dataset hanya memiliki empat contoh, menghitung objective dan gradient dari semuanya masih mudah.

Tetapi bayangkan dataset training mempunyai sangat banyak observations. Pertanyaan barunya adalah:

> **Apakah setiap update harus selalu menghitung gradient menggunakan seluruh training set?**

Secara matematis kita dapat menghitung gradient full-batch dari seluruh training objective. Dalam praktik machine learning, kita juga sering membentuk update menggunakan **sebagian** training examples pada satu waktu.

Di sinilah istilah **batch**, **minibatch**, dan **stochastic gradient** muncul.

---

# 2. PREDICT — Apakah Subset Data Memberi Gradient yang Sama?

Gunakan empat synthetic per-example losses:

$$
\ell^{(1)}(w)=(w-1)^2,
$$

$$
\ell^{(2)}(w)=(w-2)^2,
$$

$$
\ell^{(3)}(w)=(w-4)^2,
$$

$$
\ell^{(4)}(w)=(w-5)^2.
$$

Kita akan mengevaluasi semuanya pada:

$$
w=0.
$$

Derivative masing-masing loss adalah:

$$
\frac{d\ell^{(i)}}{dw}=2(w-a_i),
$$

sesuai angka pusat $a_i$ pada tiap contoh.

Sebelum menghitung, prediksi:

1. apakah gradient dari seluruh empat contoh akan sama dengan gradient dari hanya contoh 1 dan 2?
2. apakah gradient dari contoh 3 dan 4 akan sama dengan gradient contoh 1 dan 2?
3. jika hanya satu contoh dipakai, apakah gradient tersebut masih berasal dari data atau menjadi “angka acak”?

Jawaban pentingnya:

- subset berbeda dapat memberikan gradient estimate berbeda;
- gradient tetap berasal dari loss pada contoh yang dipilih;
- randomness, jika sampling dilakukan secara acak, berasal dari **pemilihan contoh/subset**, bukan dari menciptakan gradient sembarang.

---

# 3. INTUITION — Satu Objective, Beberapa Cara Mengambil Informasi Gradient

Bayangkan training set mempunyai $n$ examples.

Kita dapat membentuk tiga level penggunaan data untuk satu update.

### A. Full-batch

Gunakan seluruh $n$ examples untuk menghitung gradient dari training objective.

### B. Minibatch

Pilih subset $\mathcal{B}_t$ yang berisi $m$ examples, dengan:

$$
1<m<n.
$$

Gradient dihitung dari rata-rata loss pada subset tersebut.

### C. Single-example / stochastic

Gunakan satu example untuk satu gradient estimate, sehingga:

$$
m=1.
$$

Secara historical terminology, metode satu-example sering disebut **stochastic gradient**. Namun dalam modern deep-learning practice, istilah **SGD** sering juga dipakai untuk training yang sebenarnya menggunakan minibatch.

Jadi ketika membaca dokumentasi atau paper, jangan hanya melihat nama “SGD”. Periksa juga **batch size** dan bagaimana data dipilih.

---

# 4. EXPLORE — Hitung Gradient dari Data yang Sama dengan Tiga Cara

Untuk empat losses tadi, pada $w=0$:

$$
\ell^{(1)'}(0)=2(0-1)=-2,
$$

$$
\ell^{(2)'}(0)=2(0-2)=-4,
$$

$$
\ell^{(3)'}(0)=2(0-4)=-8,
$$

$$
\ell^{(4)'}(0)=2(0-5)=-10.
$$

## Full-batch gradient

Rata-rata seluruh derivative:

$$
g_{\text{full}}
=
\frac{-2-4-8-10}{4}
=
-6.
$$

## Minibatch A: examples 1 dan 2

$$
g_{\mathcal{B}_A}
=
\frac{-2-4}{2}
=
-3.
$$

## Minibatch B: examples 3 dan 4

$$
g_{\mathcal{B}_B}
=
\frac{-8-10}{2}
=
-9.
$$

## Single example: hanya example 2

$$
g_{\text{single}}
=
-4.
$$

Empat gradient di atas berbeda:

$$
-6,
\qquad
-3,
\qquad
-9,
\qquad
-4.
$$

Tetapi semuanya dapat ditelusuri ke loss dari data yang benar-benar digunakan.

Inilah ide paling penting Topic 06:

> **Minibatch gradient bukan full gradient yang “salah”. Ia adalah gradient dari objective pada subset yang dipakai untuk update tersebut.**

Ketika subset dipilih dengan prosedur sampling yang sesuai, gradient minibatch dapat digunakan sebagai estimate terhadap gradient yang ingin kita dekati. Exact statistical properties bergantung pada sampling assumptions; kita tidak perlu membuktikan estimator theory pada foundation topic ini.

---

# 5. FORMAL DEFINITION — Per-Example Loss dan Aggregate Objective

Untuk $n$ training examples, definisikan per-example loss:

$$
\ell^{(i)}(\boldsymbol{\theta}).
$$

Aggregate training objective berbentuk rata-rata:

$$
J(\boldsymbol{\theta})
=
\frac{1}{n}
\sum_{i=1}^{n}
\ell^{(i)}(\boldsymbol{\theta}).
$$

Gradient full-batch adalah:

$$
\nabla J(\boldsymbol{\theta})
=
\frac{1}{n}
\sum_{i=1}^{n}
\nabla \ell^{(i)}(\boldsymbol{\theta}).
$$

Untuk minibatch $\mathcal{B}_t$ dengan ukuran $m$:

$$
|\mathcal{B}_t|=m,
$$

kita membentuk minibatch objective:

$$
J_{\mathcal{B}_t}(\boldsymbol{\theta})
=
\frac{1}{m}
\sum_{i\in\mathcal{B}_t}
\ell^{(i)}(\boldsymbol{\theta}),
$$

serta minibatch gradient:

$$
g_t
=
\nabla J_{\mathcal{B}_t}(\boldsymbol{\theta}_t)
=
\frac{1}{m}
\sum_{i\in\mathcal{B}_t}
\nabla\ell^{(i)}(\boldsymbol{\theta}_t).
$$

Update kemudian dapat ditulis:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta g_t.
$$

Perhatikan bahwa pada minibatch setting, $g_t$ tidak harus identik dengan full-batch gradient pada state yang sama.

---

# 6. NOTATION + FORMULA — Apa Arti Setiap Simbol?

Formula minibatch:

$$
g_t
=
\frac{1}{m}
\sum_{i\in\mathcal{B}_t}
\nabla\ell^{(i)}(\boldsymbol{\theta}_t)
$$

memiliki komponen berikut.

| Simbol | Arti |
|---|---|
| $t$ | index iteration/update |
| $\boldsymbol{\theta}_t$ | current parameter state |
| $\ell^{(i)}$ | loss untuk example ke-$i$ |
| $\mathcal{B}_t$ | subset examples yang dipakai pada iteration $t$ |
| $m$ | jumlah examples dalam minibatch tersebut |
| $\nabla\ell^{(i)}(\boldsymbol{\theta}_t)$ | gradient contribution dari example ke-$i$ pada current parameters |
| $g_t$ | gradient yang dibentuk dari minibatch |
| $\eta$ | learning rate |
| $\boldsymbol{\theta}_{t+1}$ | parameter state setelah update |

Dua ukuran harus dibedakan:

$$
n=\text{jumlah seluruh training examples},
$$

sementara:

$$
m=\text{jumlah examples yang dipakai pada satu minibatch}.
$$

Pada full-batch:

$$
m=n.
$$

Pada strict single-example stochastic update:

$$
m=1.
$$

Pada minibatch:

$$
1<m<n.
$$

---

# 7. MATH READING SKILL — Membaca Minibatch Update sebagai State Transition

Baca formula berikut:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta
\left(
\frac{1}{m}
\sum_{i\in\mathcal{B}_t}
\nabla\ell^{(i)}(\boldsymbol{\theta}_t)
\right).
$$

Urutannya adalah:

1. **Current state:** mulai dari $\boldsymbol{\theta}_t$.
2. **Data selection:** tentukan examples yang berada di $\mathcal{B}_t$.
3. **Per-example local information:** hitung gradient contribution tiap selected example.
4. **Aggregation:** rata-ratakan $m$ gradient contributions.
5. **Scale:** kalikan hasil dengan learning rate $\eta$.
6. **Direction:** subtract scaled gradient dari current parameters.
7. **Output:** diperoleh $\boldsymbol{\theta}_{t+1}$.
8. **Next iteration:** subset berikutnya dapat berbeda dan gradient dihitung lagi pada parameter state baru.

### Units/dimensions

- $g_t$ memiliki shape/dimension yang sama dengan parameter vector $\boldsymbol{\theta}$.
- $m$ dan $n$ adalah counts sehingga tidak mempunyai unit fisik.
- learning-rate unit/scale tidak boleh diasumsikan universally unitless; interpretation tetap bergantung pada parameterization dan objective scaling.

### Assumptions dan boundary

Formula ini tidak otomatis menyatakan bahwa:

- $g_t$ sama persis dengan full-batch gradient;
- setiap minibatch mempunyai gradient yang sama;
- setiap update pasti menurunkan full training objective;
- stochastic gradient selalu lebih baik daripada full-batch gradient;
- full-batch selalu lebih baik daripada minibatch;
- training dengan minibatch otomatis meningkatkan generalization;
- random sampling berarti parameter update boleh berisi angka acak tanpa hubungan dengan data.

---

# 8. WORKED BASIC EXAMPLE — Full-Batch vs Dua Minibatch

Kembali ke:

$$
\ell^{(1)}(w)=(w-1)^2,
\quad
\ell^{(2)}(w)=(w-2)^2,
$$

$$
\ell^{(3)}(w)=(w-4)^2,
\quad
\ell^{(4)}(w)=(w-5)^2.
$$

Pada:

$$
w_0=0,
\qquad
\eta=0.1,
$$

kita sudah memperoleh:

$$
g_{\text{full}}=-6,
$$

$$
g_{\mathcal{B}_A}=-3,
$$

$$
g_{\mathcal{B}_B}=-9.
$$

Sekarang hitung one-step update.

### Full-batch

$$
w_1
=
0-(0.1)(-6)
=
0.6.
$$

### Minibatch A

$$
w_1^{(A)}
=
0-(0.1)(-3)
=
0.3.
$$

### Minibatch B

$$
w_1^{(B)}
=
0-(0.1)(-9)
=
0.9.
$$

Dengan current state dan learning rate yang sama, pemilihan data menghasilkan update berbeda karena gradient estimate berbeda.

| Sumber gradient | Gradient | Next $w$ |
|---|---:|---:|
| seluruh 4 examples | $-6$ | $0.6$ |
| examples 1–2 | $-3$ | $0.3$ |
| examples 3–4 | $-9$ | $0.9$ |

Ini bukan kontradiksi. Setiap update menggunakan informasi dari data yang berbeda.

---

# 9. WORKED HerAI / AI EXAMPLE — Synthetic Minibatch, Bukan Production HerAI

Canonical HerAI score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Nilai canonical:

- Alya: $0.78$;
- Bima: $0.61$;
- Citra: $0.94$;
- Dewi: $0.62$.

## Hard semantic warning

Angka $h(q,c)$ di sini tetap **instructional weighted score**. Ia bukan probability, bukan training loss, bukan ground-truth educational outcome, dan bukan production recommendation objective.

Untuk mempelajari minibatch secara arithmetic-safe, kita membuat **objective synthetic/hypothetical/instructional**:

$$
\ell^{(i)}_{\text{toy}}(u)
=
(u-h_i)^2.
$$

Di sini $u$ hanyalah **synthetic scalar parameter** dan $h_i$ hanya dipakai sebagai fixed reference number dalam latihan matematika.

Ambil:

$$
u_0=0.50.
$$

Derivative per participant:

$$
\frac{d\ell^{(i)}_{\text{toy}}}{du}
=
2(u-h_i).
$$

Maka pada $u_0=0.50$:

| Peserta | $h_i$ | Gradient contribution |
|---|---:|---:|
| Alya | $0.78$ | $-0.56$ |
| Bima | $0.61$ | $-0.22$ |
| Citra | $0.94$ | $-0.88$ |
| Dewi | $0.62$ | $-0.24$ |

### Full-batch gradient

$$
g_{\text{full}}
=
\frac{-0.56-0.22-0.88-0.24}{4}
=
-0.475.
$$

### Minibatch Alya + Bima

$$
g_{AB}
=
\frac{-0.56-0.22}{2}
=
-0.39.
$$

### Minibatch Citra + Dewi

$$
g_{CD}
=
\frac{-0.88-0.24}{2}
=
-0.56.
$$

Jika $\eta=0.1$:

$$
u_1^{\text{full}}
=
0.50-(0.1)(-0.475)
=
0.5475,
$$

$$
u_1^{AB}
=
0.50-(0.1)(-0.39)
=
0.539,
$$

$$
u_1^{CD}
=
0.50-(0.1)(-0.56)
=
0.556.
$$

Hasil berbeda karena selected data berbeda.

**Tidak ada satu pun parameter di atas yang merupakan production HerAI recommendation parameter.** Contoh ini hanya kendaraan untuk memahami bagaimana subset examples mengubah gradient estimate.

---

# 10. CHANGE ONE THING — Ubah Hanya Minibatch Selection

Pertahankan:

$$
w_0=0,
\qquad
\eta=0.1.
$$

Jangan mengubah objective functions.

Ubah hanya selected minibatch:

- $\mathcal{B}_A=\{1,2\}$ menghasilkan $g=-3$;
- $\mathcal{B}_B=\{3,4\}$ menghasilkan $g=-9$.

Akibatnya:

$$
w_1^{(A)}=0.3,
\qquad
w_1^{(B)}=0.9.
$$

Satu perubahan pada **data yang dipakai untuk gradient estimate** sudah mengubah parameter displacement.

Ini membantu memisahkan dua sumber perubahan:

- Topic 04: learning rate mengubah scaling step;
- Topic 06: data subset dapat mengubah gradient yang sedang di-scale.

---

# 11. FULL-BATCH, MINIBATCH, DAN STOCHASTIC — TABEL PERBANDINGAN

| Mode | Examples per update | Gradient yang dipakai | Beginner interpretation |
|---|---:|---|---|
| Full-batch | seluruh $n$ | exact gradient dari aggregate training objective yang didefinisikan pada seluruh training set | informasi seluruh dataset untuk satu update |
| Minibatch | $m$ dengan $1<m<n$ | gradient dari average loss pada selected subset | estimate berdasarkan sebagian data |
| Single-example stochastic | $1$ | gradient dari satu selected example | estimate paling kecil berdasarkan satu example |

### Terminology warning

Literatur modern sering memakai istilah **SGD** untuk metode yang sebenarnya menggunakan minibatches. Karena itu:

> **Jangan menyimpulkan batch size hanya dari nama optimizer.**

Periksa apakah satu update menggunakan satu example, beberapa examples, atau seluruh training set.

---

# 12. TRADE-OFF — Lebih Banyak Data per Update Bukan Berarti Selalu “Lebih Baik”

Menggunakan lebih banyak examples dalam satu gradient calculation biasanya memberi gradient estimate yang lebih dekat/stabil terhadap aggregate behavior dibanding memakai sangat sedikit examples, tetapi hal ini datang dengan biaya komputasi dan memori yang berbeda.

Pada skala besar:

- full-batch harus memproses seluruh training set sebelum setiap update;
- minibatch memungkinkan update dibuat dari subset;
- sangat kecilnya batch dapat membuat gradient lebih bervariasi antar update;
- sangat besarnya batch meningkatkan jumlah data yang harus diproses dalam satu update;
- hardware parallelism dan memory constraints juga memengaruhi pilihan praktis.

Tetapi foundation course ini **tidak menetapkan universal best batch size**.

Tidak ada aturan aman seperti:

$$
\text{batch lebih besar} \Rightarrow \text{model selalu lebih baik}.
$$

Dan juga tidak ada aturan universal:

$$
\text{batch lebih kecil} \Rightarrow \text{generalization selalu lebih baik}.
$$

Batch size merupakan bagian dari training design yang efeknya bergantung pada objective, data, model, learning rate, hardware, dan kondisi training lain. **Tidak ada jaminan bahwa pemilihan batch size tertentu otomatis menghasilkan generalization yang lebih baik.**

---

# 13. EPOCH — ORIENTATION ONLY

Satu istilah praktis yang sering muncul bersama minibatch adalah **epoch**.

Secara beginner-safe:

> satu epoch biasanya berarti satu pass melalui training dataset.

Jika dataset memiliki $100$ examples dan minibatch size $m=20$, satu pass dapat terdiri dari sekitar lima minibatches jika seluruh contoh digunakan sekali pada pass tersebut.

Tetapi Topic 06 tidak membahas secara mendalam:

- sampler implementation;
- replacement vs no-replacement theory;
- distributed sampler;
- uneven final batch;
- data-loader performance.

Istilah epoch hanya diperkenalkan agar learner tidak bingung saat bertemu training loop nanti.

---

# 14. WHY THIS MATTERS IN AI

Model AI modern sering dilatih pada dataset yang terlalu besar untuk diperlakukan sebagai satu tiny table setiap update.

Minibatch training penting karena menghubungkan:

- mathematical training objective;
- local gradient information;
- dataset sampling;
- repeated parameter updates;
- practical computation.

Topic ini juga memperbaiki satu intuisi yang sering keliru:

> optimizer tidak selalu melihat seluruh dataset secara bersamaan pada setiap parameter update.

Pada banyak workflow, optimizer menerima gradient yang dibentuk dari data pada batch/minibatch tertentu, lalu parameter diperbarui, kemudian proses berulang.

---

# 15. MISCONCEPTION CHALLENGE

## Misconception 1 — “Minibatch berarti satu example.”

Salah.

Single-example adalah kasus $m=1$. Minibatch menggunakan lebih dari satu tetapi kurang dari seluruh training examples pada framing topic ini.

## Misconception 2 — “Stochastic gradient berarti gradient diisi random number.”

Salah.

Gradient tetap dihitung dari selected example(s) dan objective. Randomness biasanya masuk melalui sampling/order data, bukan dengan mengganti gradient menjadi angka sembarang.

## Misconception 3 — “Full-batch selalu lebih baik karena gradient-nya exact untuk training set.”

Terlalu kuat.

Exact full training-set gradient adalah property matematis tertentu, tetapi training method juga memiliki computational trade-offs. “Exact untuk training objective” tidak identik dengan “selalu pilihan terbaik untuk seluruh tujuan”.

## Misconception 4 — “Minibatch gradient harus sama dengan full-batch gradient.”

Salah.

Subset berbeda dapat menghasilkan gradient estimate berbeda pada parameter yang sama.

## Misconception 5 — “Kalau dua minibatches memberi gradient berbeda, salah satunya pasti salah.”

Salah.

Perbedaan dapat muncul secara sah karena kedua subsets berisi examples yang berbeda.

## Misconception 6 — “SGD selalu berarti batch size 1.”

Tidak aman sebagai aturan membaca literatur modern.

Istilah SGD sering juga digunakan untuk minibatch stochastic training. Periksa actual batch size/procedure.

## Misconception 7 — “Minibatch otomatis menyelesaikan overfitting.”

Salah.

Batching adalah mekanisme pembentukan gradient estimate. Generalization/overfitting adalah persoalan lebih luas dan dibahas pada boundary Topic 08/ML.

## Misconception 8 — “$h(q,c)$ sekarang menjadi loss karena kita memakai peserta sebagai examples.”

Salah keras.

Canonical $h(q,c)$ tetap instructional score. Objective pada worked HerAI example adalah formula synthetic terpisah.

---

# 16. TRY IT YOURSELF

Gunakan derivative contributions pada satu state:

$$
[-2,-4,-8,-10].
$$

Tanpa melihat jawaban sebelumnya, hitung:

1. full-batch gradient;
2. minibatch gradient untuk examples $\{1,4\}$;
3. single-example gradient untuk example 3;
4. jika $\eta=0.1$ dan $w_0=0$, berapa next $w$ untuk masing-masing gradient?

Cek mandiri:

$$
g_{\text{full}}=-6,
$$

$$
g_{\{1,4\}}=-6,
$$

$$
g_{\{3\}}=-8.
$$

Menariknya, satu minibatch tertentu dapat **kebetulan** menghasilkan gradient yang sama dengan full-batch pada state tertentu. Itu tidak berarti semua minibatches akan sama.

---

# 17. VISUAL / INTERACTIVE SPEC

[STATIC VISUAL]

**Learning purpose:** membedakan full training set, minibatch, dan single-example selection.  
**Initial state/data/function:** delapan cards examples tersusun sebagai satu dataset; seluruh cards memiliki per-example gradient contribution.  
**Learner action:** tidak ada; learner membaca tiga overlay selection: seluruh cards, tiga selected cards, satu selected card.  
**Expected behavior:** setiap overlay menunjukkan examples mana yang berkontribusi ke gradient calculation.  
**Feedback:** label menampilkan $n$, $m$, dan type: full-batch/minibatch/single-example.  
**Safety / interpretation note:** single-example selection tidak berarti gradient acak tanpa objective.

[COMPARE VIEW]

**Learning purpose:** menunjukkan bahwa same parameter state dapat menghasilkan gradient estimate berbeda jika selected minibatch berubah.  
**Initial state/data/function:** derivative contributions $[-2,-4,-8,-10]$ pada $w=0$.  
**Learner action:** pilih $\{1,2\}$ atau $\{3,4\}$.  
**Expected behavior:** view menampilkan gradient $-3$ vs $-9$, lalu one-step parameter $0.3$ vs $0.9$ untuk $\eta=0.1$.  
**Feedback:** arithmetic average ditampilkan step-by-step.  
**Safety / interpretation note:** perbedaan bukan bukti salah hitung bila subsets memang berbeda.

[NUMBER MANIPULATOR]

**Learning purpose:** memisahkan efek batch composition dari efek learning rate.  
**Initial state/data/function:** $w_0=0$, four derivative contributions, $\eta=0.1$.  
**Learner action:** ubah selected examples; optional ubah $\eta$ setelah memahami selection effect.  
**Expected behavior:** gradient estimate dan next parameter diperbarui.  
**Feedback:** UI menandai apakah perubahan berasal dari gradient estimate, learning-rate scaling, atau keduanya.  
**Safety / interpretation note:** tool tidak menampilkan “best batch size” universal.

[STEP-BY-STEP REVEAL]

**Learning purpose:** membaca formula minibatch update sebagai sequence.  
**Initial state/data/function:** $\boldsymbol{\theta}_t$, selected $\mathcal B_t$, per-example gradient contributions.  
**Learner action:** klik Next untuk reveal selection → gradients → average → scale → update.  
**Expected behavior:** satu komponen formula muncul setiap step.  
**Feedback:** learner harus memilih arti $m$ dan $n$ sebelum lanjut.  
**Safety / interpretation note:** minibatch gradient diberi label estimate/subset gradient, bukan full gradient.

---

# 18. CHECKPOINT

Pastikan Anda dapat menjawab tanpa menghafal slogan:

1. Apa beda $n$ dan $m$?
2. Apa data yang digunakan full-batch gradient?
3. Apa data yang digunakan minibatch gradient?
4. Apa yang terjadi ketika $m=1$?
5. Mengapa dua minibatches dapat memberi gradient berbeda?
6. Mengapa stochastic gradient bukan arbitrary random direction?
7. Mengapa full-batch exact gradient tidak otomatis berarti “selalu lebih baik”?
8. Mengapa istilah SGD tidak selalu cukup untuk mengetahui batch size?

Jika nomor 5–8 masih sulit, ulangi worked basic example sebelum lanjut.

---

# 19. MASTERY CHECK — “I Can…”

Setelah topic ini, saya dapat mengatakan:

- **I can** membaca aggregate objective dari per-example losses.
- **I can** membedakan full-batch, minibatch, dan single-example gradient.
- **I can** menghitung minibatch average gradient pada dataset kecil.
- **I can** menjelaskan mengapa subset berbeda dapat menghasilkan update berbeda.
- **I can** menjelaskan bahwa stochasticity terkait data sampling/order, bukan gradient random tanpa dasar.
- **I can** membaca batch size $m$ tanpa mencampurnya dengan total dataset size $n$.
- **I can** menolak klaim “full-batch selalu lebih baik”.
- **I can** menjaga $h(q,c)$ tetap sebagai instructional score dalam HerAI running case.
- **I can** membedakan current topic dari Momentum/Adam yang baru dibahas setelah ini.

---

# 20. SCOPE BOUNDARY

Topic 06 **tidak** menjadikan berikut ini sebagai mastery requirement:

- formal proof bahwa gradient estimator unbiased;
- variance derivation untuk minibatch gradients;
- optimal batch-size theory;
- batch-size/learning-rate scaling laws;
- sampling with/without replacement derivation;
- data-loader implementation;
- distributed data parallel;
- gradient accumulation;
- microbatching;
- mixed precision;
- convergence-rate analysis;
- Momentum formula;
- Adam moment/bias-correction formula;
- RMSProp derivation;
- production HerAI training code.

Semua itu berada di luar foundation scope atau menjadi bridge ke topic/module lain.

---

# 21. SUMMARY

Topic 06 menghubungkan objective berbasis dataset dengan practical gradient-based training.

Core ideas:

$$
J(\boldsymbol{\theta})
=
\frac{1}{n}
\sum_{i=1}^{n}
\ell^{(i)}(\boldsymbol{\theta})
$$

menggunakan seluruh dataset sebagai aggregate objective, sedangkan minibatch update dapat memakai:

$$
g_t
=
\frac{1}{m}
\sum_{i\in\mathcal{B}_t}
\nabla\ell^{(i)}(\boldsymbol{\theta}_t).
$$

Kemudian:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta g_t.
$$

Yang harus dibawa ke depan:

- full-batch menggunakan seluruh training set;
- minibatch menggunakan sebagian examples;
- strict single-example stochastic menggunakan satu example;
- modern “SGD” terminology sering mencakup minibatch use;
- subset berbeda dapat menghasilkan gradient estimate berbeda;
- batch size tidak mempunyai universal “best” value;
- stochastic tidak berarti arbitrary randomness;
- $h(q,c)$ tetap instructional score only.

---

# 22. BRIDGE — Dari Noisy/Variable Gradient ke Momentum dan Adam

Setelah Topic 06, learner sudah melihat bahwa gradient dari minibatch dapat berbeda dari update ke update karena selected data dapat berubah.

Pertanyaan berikutnya adalah:

> **Bisakah optimizer menggunakan informasi dari gradient sebelumnya atau menyesuaikan cara setiap parameter bergerak, bukan hanya memakai current gradient secara polos?**

Itulah bridge ke:

# **Topic 07 — Momentum dan Adam: Peta Konsep**

Topic 07 belum dimulai di package ini.
