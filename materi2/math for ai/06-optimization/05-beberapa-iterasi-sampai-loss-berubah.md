# Topic 05 — Beberapa Iterasi Sampai Loss Berubah
## Dari Satu Update Menjadi Trajectory Optimization

> **Posisi dalam modul:** Submodule 06 — Optimization: Dari Loss ke Parameter yang Lebih Baik  
> **Prerequisite aktif:** Topic 01 (loss/objective/evaluation metric), Topic 02 (minimization dan landscape), Topic 03 (Gradient Descent update rule), Topic 04 (learning rate), serta derivative/gradient dari Calculus  
> **Fokus topic:** memahami Optimization sebagai **proses iteratif**, membaca urutan parameter dan objective value, melakukan manual trace 2–3 update, serta membedakan trajectory yang terlihat membaik dari klaim convergence/generalization yang belum sah.  
> **Belum dibahas mendalam:** full-batch/minibatch/stochastic gradient, Momentum, Adam, convergence proof, stopping criteria formal, learning-rate schedules, validation strategy, atau production training loop.

---

## Learning Outcomes

Setelah menyelesaikan topic ini, peserta mampu:

1. menjelaskan mengapa satu Gradient Descent update belum merupakan keseluruhan proses Optimization;
2. membaca indeks iterasi $t$ sebagai penanda state parameter yang berbeda;
3. mengikuti alur $\boldsymbol{\theta}_t \rightarrow \nabla J(\boldsymbol{\theta}_t) \rightarrow \boldsymbol{\theta}_{t+1} \rightarrow J(\boldsymbol{\theta}_{t+1})$;
4. melakukan trace manual 2–3 iterasi pada objective synthetic yang arithmetic-nya beginner-safe;
5. membangun dan membaca tabel trajectory yang memuat parameter, gradient, update, dan objective;
6. menjelaskan bahwa gradient harus dievaluasi kembali pada state baru ketika objective berubah terhadap parameter;
7. membedakan **parameter trajectory** dari **objective trajectory**;
8. mengenali oscillation sederhana sebagai perpindahan bolak-balik melintasi low-objective region pada toy landscape tanpa menganggapnya otomatis gagal;
9. menolak klaim bahwa loss harus turun pada setiap update secara universal;
10. menolak klaim bahwa lebih banyak iterasi otomatis menghasilkan generalization atau sistem dunia nyata yang lebih baik;
11. mempertahankan semantic boundary HerAI: $h(q,c)=0.6q+0.4c$ tetap instructional score, bukan production loss;
12. menjelaskan bahwa Topic 05 belum membahas stochasticity dari data sampling; itu masuk Topic 06.

---

# 1. HOOK / REAL PROBLEM — Satu Langkah Belum Menjadi Proses Belajar

Pada Topic 03 kita sudah dapat melakukan satu update:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta\nabla J(\boldsymbol{\theta}_t).
$$

Pada Topic 04 kita melihat bahwa learning rate $\eta$ mengontrol besar langkah.

Tetapi model tidak biasanya berhenti setelah satu update.

Misalkan kita mempunyai parameter scalar $w$ dengan objective synthetic:

$$
J(w)=(w-3)^2.
$$

Jika kita mulai dari:

$$
w_0=0,
$$

satu update memang menghasilkan state baru. Namun setelah state berubah, derivative juga harus dibaca ulang pada state tersebut.

Dengan kata lain:

> Optimization bukan hanya **menghitung satu langkah**, melainkan **mengulangi siklus state → local information → update → state baru**.

Itulah ide utama Topic 05.

---

# 2. PREDICT — Apakah Gradient pada Iterasi Berikutnya Tetap Sama?

Gunakan:

$$
J(w)=(w-3)^2,
$$

sehingga:

$$
J'(w)=2(w-3).
$$

Pada starting state:

$$
w_0=0,
$$

kita memperoleh:

$$
J'(w_0)=-6.
$$

Misalkan learning rate:

$$
\eta=0.25.
$$

Sebelum menghitung seluruh trace, prediksi:

1. setelah $w_0$ berubah menjadi $w_1$, apakah kita masih memakai gradient $-6$?
2. apakah objective harus dievaluasi kembali di $w_1$?
3. apakah tiga update yang terlihat menurunkan objective cukup untuk membuktikan algoritma selalu akan convergence?

Jawaban pentingnya:

- gradient $-6$ hanya merupakan local derivative pada $w_0=0$;
- setelah parameter berubah, kita menghitung derivative pada state baru;
- beberapa langkah yang membaik adalah evidence tentang **trace tersebut**, bukan proof universal tentang seluruh algorithm/problem family.

---

# 3. INTUITION — Optimization sebagai State Transition Berulang

Untuk satu parameter scalar:

$$
w_{t+1}=w_t-\eta J'(w_t).
$$

Baca rumus ini sebagai **state transition**.

Pada iterasi $t$:

1. kita mempunyai current parameter $w_t$;
2. kita evaluasi local derivative $J'(w_t)$;
3. kita scale derivative dengan $\eta$;
4. kita subtract hasilnya dari current parameter;
5. kita memperoleh next parameter $w_{t+1}$;
6. pada iterasi berikutnya, $w_{t+1}$ menjadi current state baru.

Siklus konseptualnya:

$$
w_t
\rightarrow
J'(w_t)
\rightarrow
-\eta J'(w_t)
\rightarrow
w_{t+1}
\rightarrow
J(w_{t+1}).
$$

Lalu proses dapat diulang.

Untuk vector parameter, pola yang sama berlaku:

$$
\boldsymbol{\theta}_t
\rightarrow
\nabla J(\boldsymbol{\theta}_t)
\rightarrow
-\eta\nabla J(\boldsymbol{\theta}_t)
\rightarrow
\boldsymbol{\theta}_{t+1}.
$$

> Gradient bukan “nilai yang disimpan selamanya”. Ia bergantung pada state tempat gradient tersebut dievaluasi.

---

# 4. EXPLORE — Trace Tiga Iterasi Secara Manual

Gunakan kembali objective:

$$
J(w)=(w-3)^2,
$$

beserta derivative:

$$
J'(w)=2(w-3),
$$

starting state:

$$
w_0=0,
$$

serta learning rate:

$$
\eta=0.25.
$$

## Iterasi 0 → 1

Current parameter:

$$
w_0=0.
$$

Gradient/derivative:

$$
J'(w_0)=2(0-3)=-6.
$$

Update displacement:

$$
-\eta J'(w_0)
=
-(0.25)(-6)
=
1.5.
$$

Next parameter:

$$
w_1=0+1.5=1.5.
$$

Objective berubah dari:

$$
J(w_0)=9
$$

menjadi:

$$
J(w_1)=(1.5-3)^2=2.25.
$$

## Iterasi 1 → 2

Sekarang **jangan memakai gradient lama $-6$**.

Current state sudah:

$$
w_1=1.5.
$$

Derivative baru:

$$
J'(w_1)=2(1.5-3)=-3.
$$

Update displacement:

$$
-(0.25)(-3)=0.75.
$$

Next parameter:

$$
w_2=1.5+0.75=2.25.
$$

Objective:

$$
J(w_2)=(2.25-3)^2=0.5625.
$$

## Iterasi 2 → 3

Current state:

$$
w_2=2.25.
$$

Derivative:

$$
J'(w_2)=2(2.25-3)=-1.5.
$$

Update displacement:

$$
-(0.25)(-1.5)=0.375.
$$

Next parameter:

$$
w_3=2.25+0.375=2.625.
$$

Objective:

$$
J(w_3)=(2.625-3)^2=0.140625.
$$

---

# 5. FORMAL DEFINITION — Iteration dan Trajectory

## 5.1 Iteration

Satu **iteration** pada basic Gradient Descent adalah satu penerapan update dari current state menuju next state:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta\nabla J(\boldsymbol{\theta}_t).
$$

Indeks $t$ menunjukkan posisi state dalam urutan update.

## 5.2 Parameter trajectory

Urutan parameter:

$$
\boldsymbol{\theta}_0,
\boldsymbol{\theta}_1,
\boldsymbol{\theta}_2,
\ldots
$$

membentuk **parameter trajectory**.

Dalam contoh scalar kita:

$$
0
\rightarrow
1.5
\rightarrow
2.25
\rightarrow
2.625.
$$

## 5.3 Objective trajectory

Jika objective dievaluasi pada setiap state, kita memperoleh:

$$
J(\boldsymbol{\theta}_0),
J(\boldsymbol{\theta}_1),
J(\boldsymbol{\theta}_2),
\ldots
$$

Dalam contoh:

$$
9
\rightarrow
2.25
\rightarrow
0.5625
\rightarrow
0.140625.
$$

Kedua trajectory terkait, tetapi **tidak sama**:

- parameter trajectory menceritakan *di mana parameter berada*;
- objective trajectory menceritakan *berapa nilai objective pada state tersebut*.

---

# 6. NOTATION + FORMULA — Membaca $t$ dengan Benar

Canonical update rule:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta\nabla J(\boldsymbol{\theta}_t).
$$

Makna simbol:

- $\boldsymbol{\theta}_t$: parameter pada iterasi sekarang;
- $t$: index state/update, bukan waktu fisik universal;
- $\nabla J(\boldsymbol{\theta}_t)$: gradient objective yang dievaluasi pada current state;
- $\eta$: learning rate positif pada basic Gradient Descent topic ini;
- $-\eta\nabla J(\boldsymbol{\theta}_t)$: update displacement;
- $\boldsymbol{\theta}_{t+1}$: parameter sesudah update.

Yang **tidak** boleh dilakukan:

$$
\boldsymbol{\theta}_{t+2}
=
\boldsymbol{\theta}_{t+1}
-
\eta\nabla J(\boldsymbol{\theta}_{t})
$$

secara otomatis tanpa alasan.

Mengapa? Karena gradient pada next state umumnya perlu dihitung sebagai:

$$
\nabla J(\boldsymbol{\theta}_{t+1}).
$$

Gradient adalah local information pada state tertentu.

---

# 7. MATH READING SKILL — Baca Satu Baris Trace, Bukan Hafal Rumus

Perhatikan baris:

$$
w_2=2.25,
\qquad
J'(w_2)=-1.5,
\qquad
\eta=0.25.
$$

Kemudian:

$$
w_3
=
2.25-(0.25)(-1.5)
=
2.625.
$$

Cara membacanya:

1. **current state** adalah $w_2=2.25$;
2. **local information** adalah $J'(w_2)=-1.5$;
3. **scale** gradient dengan $\eta=0.25$;
4. **negative sign** membuat kita bergerak berlawanan dengan local steepest increase;
5. **new state** adalah $w_3=2.625$;
6. objective baru harus dievaluasi di **state baru**, bukan di state lama.

Secara dimensional, update displacement harus kompatibel dengan parameter yang diubah. Topic 05 tidak mengulang pembahasan unit learning rate dari Topic 04, tetapi aturan consistency tersebut tetap aktif.

Yang tidak tersirat dari satu baris ini:

- kita pasti mencapai global minimum;
- loss pasti turun pada semua future steps;
- jumlah iterasi tertentu pasti cukup;
- training objective yang lebih rendah pasti berarti unseen performance lebih baik.

---

# 8. WORKED BASIC EXAMPLE — Buat Tabel Trajectory

Daripada menyimpan hitungan sebagai paragraf panjang, kita dapat membuat tabel:

| State $t$ | $w_t$ | $J'(w_t)$ | Update $-\eta J'(w_t)$ | $J(w_t)$ |
|---:|---:|---:|---:|---:|
| 0 | $0$ | $-6$ | $+1.5$ | $9$ |
| 1 | $1.5$ | $-3$ | $+0.75$ | $2.25$ |
| 2 | $2.25$ | $-1.5$ | $+0.375$ | $0.5625$ |
| 3 | $2.625$ | $-0.75$ | — | $0.140625$ |

Catatan penting:

- kolom update pada state $t$ menghasilkan parameter state $t+1$;
- baris terakhir tidak harus mempunyai update jika trace memang dihentikan setelah state tersebut;
- trace ini memperlihatkan objective turun setiap state **untuk objective, starting point, dan learning rate yang dipilih**.

Ia bukan theorem bahwa semua optimization trace bersifat monotonic.

---

# 9. CHANGE ONE THING — Learning Rate Sama, Trajectory Bisa Berbeda

Pada Topic 04 kita sudah membandingkan learning rate. Sekarang lihat perbedaan **trajectory**, bukan hanya one-step destination.

Tetap gunakan:

$$
J(w)=(w-3)^2,
\qquad
w_0=0.
$$

## Trace A: $\eta=0.25$

$$
0
\rightarrow
1.5
\rightarrow
2.25
\rightarrow
2.625.
$$

Objective:

$$
9
\rightarrow
2.25
\rightarrow
0.5625
\rightarrow
0.140625.
$$

## Trace B: $\eta=0.75$

Iterasi pertama:

$$
w_1=0-(0.75)(-6)=4.5.
$$

Derivative pada $w_1$:

$$
J'(4.5)=3.
$$

Iterasi kedua:

$$
w_2=4.5-(0.75)(3)=2.25.
$$

Iterasi ketiga:

$$
w_3=2.25-(0.75)(-1.5)=3.375.
$$

Parameter trajectory:

$$
0
\rightarrow
4.5
\rightarrow
2.25
\rightarrow
3.375.
$$

Objective trajectory:

$$
9
\rightarrow
2.25
\rightarrow
0.5625
\rightarrow
0.140625.
$$

Menarik: parameter bergerak melewati sisi minimum secara bergantian, tetapi pada **selected trace** objective tetap turun.

Ini memberi dua pelajaran:

1. parameter tidak harus bergerak satu arah secara numerik untuk objective membaik;
2. melihat parameter trajectory saja belum cukup—objective trajectory juga perlu dibaca.

---

# 10. EXPLORE AGAIN — Kapan Objective Justru Membesar?

Gunakan objective dan starting point yang sama, tetapi:

$$
\eta=1.2.
$$

Trace awalnya:

| State $t$ | $w_t$ | $J(w_t)$ |
|---:|---:|---:|
| 0 | $0$ | $9$ |
| 1 | $7.2$ | $17.64$ |
| 2 | $-2.88$ | $34.5744$ |
| 3 | $11.232$ | $67.765824$ |

Pada toy configuration ini, objective justru membesar selama trace yang kita tampilkan.

Apa yang boleh kita katakan?

> Untuk objective $J(w)=(w-3)^2$, starting point $w_0=0$, dan fixed learning rate $\eta=1.2$, tiga update pertama menghasilkan objective yang makin besar.

Apa yang **tidak** boleh kita katakan?

> “Learning rate $1.2$ selalu buruk pada semua model.”

Learning-rate behavior tetap context-dependent.

---

# 11. WORKED HerAI / AI EXAMPLE — Synthetic Parameter, Bukan Production HerAI Weight

Canonical HerAI instructional score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Untuk Alya:

$$
h(0.80,0.75)=0.78.
$$

Nilai $0.78$ ini tetap **instructional score**, bukan probability dan bukan training loss.

Untuk belajar iteration, kita buat parameter synthetic terpisah $u$ dan objective hypothetical:

$$
J_{\text{toy}}(u)=(u-0.78)^2.
$$

Kita mulai dari:

$$
u_0=0.50,
\qquad
\eta=0.25.
$$

Derivative:

$$
J'_{\text{toy}}(u)=2(u-0.78).
$$

## Trace

| State $t$ | $u_t$ | $J'_{\text{toy}}(u_t)$ | $J_{\text{toy}}(u_t)$ |
|---:|---:|---:|---:|
| 0 | $0.50$ | $-0.56$ | $0.0784$ |
| 1 | $0.64$ | $-0.28$ | $0.0196$ |
| 2 | $0.71$ | $-0.14$ | $0.0049$ |
| 3 | $0.745$ | $-0.07$ | $0.001225$ |

Interpretasi yang aman:

- $u$ adalah **synthetic/hypothetical/instructional parameter**;
- $J_{\text{toy}}$ adalah objective synthetic;
- target $0.78$ hanya menggunakan output canonical score Alya sebagai angka pedagogis;
- kita **tidak mengoptimalkan $h(q,c)$ sebagai production objective**;
- $u_3=0.745$ bukan recommendation weight dunia nyata;
- objective toy yang turun tidak membuktikan educational outcome, fairness, calibration, atau generalization membaik.

---

# 12. WHY THIS MATTERS IN AI — Training Adalah Sequence of Updates

Dalam implementasi optimizer modern, parameter memiliki current state dan di-update setelah gradient dihitung. Satu optimizer step menghasilkan satu perubahan state; training biasanya memanggil langkah semacam ini berulang kali.

Tetapi learner perlu memisahkan tiga level:

## Level 1 — mathematical update

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta\nabla J(\boldsymbol{\theta}_t).
$$

## Level 2 — iteration trace

Kita mengulang update dan memperoleh sequence parameter/objective.

## Level 3 — practical training system

Real training menambahkan keputusan lain seperti data subset yang dipakai untuk gradient, optimizer family, scheduling, stopping, evaluation, regularization, dan sebagainya.

Topic 05 hanya memastikan Level 1 → Level 2 benar-benar dipahami.

Topic 06 baru membahas apa yang terjadi ketika gradient dihitung dari **full batch, minibatch, atau stochastic/per-example sampling context**.

---

# 13. MISCONCEPTION CHALLENGE

## Misconception 1 — “Gradient pada iterasi pertama bisa dipakai terus”

Salah secara umum.

Gradient:

$$
\nabla J(\boldsymbol{\theta}_t)
$$

adalah local information pada $\boldsymbol{\theta}_t$. Setelah parameter berubah, kita biasanya mengevaluasi gradient lagi pada state baru.

## Misconception 2 — “Kalau loss naik sekali, optimization pasti rusak”

Terlalu absolut.

Pada basic deterministic toy Gradient Descent, kenaikan objective dapat menjadi sinyal bahwa finite step terlalu panjang. Tetapi dari satu angka saja kita belum boleh membuat klaim universal tentang semua optimizer/problem.

## Misconception 3 — “Loss harus selalu turun pada setiap update”

Tidak boleh dijadikan universal rule.

Module contract secara eksplisit melarang monotonic-loss guarantee tanpa assumptions/context.

## Misconception 4 — “Lebih banyak iterasi selalu lebih baik”

Salah.

Lebih banyak update tidak otomatis menjamin:

- global optimum;
- better validation/evaluation metric;
- better unseen performance;
- better real-world outcomes;
- fairness atau calibration.

## Misconception 5 — “Parameter yang bergerak bolak-balik berarti objective pasti memburuk”

Tidak selalu.

Trace $\eta=0.75$ pada toy quadratic menunjukkan parameter berganti sisi terhadap minimum, sementara selected objective values tetap turun.

## Misconception 6 — “Objective trajectory adalah parameter trajectory”

Bukan.

Parameter adalah input/state yang diubah. Objective adalah scalar quantity yang dievaluasi pada state tersebut.

---

# 14. TRY IT YOURSELF — Isi Satu Baris yang Hilang

Diberikan:

$$
J(w)=(w-3)^2,
\qquad
\eta=0.25.
$$

Sebagian trace:

| State $t$ | $w_t$ | $J'(w_t)$ | Update | $J(w_t)$ |
|---:|---:|---:|---:|---:|
| 0 | $0$ | $-6$ | $+1.5$ | $9$ |
| 1 | $1.5$ | ? | ? | $2.25$ |
| 2 | ? | $-1.5$ | $+0.375$ | $0.5625$ |

Lengkapi:

1. $J'(w_1)$;
2. update dari $w_1$ ke $w_2$;
3. $w_2$.

Jawaban:

$$
J'(1.5)=-3,
$$

$$
-(0.25)(-3)=0.75,
$$

$$
w_2=2.25.
$$

---

# 15. VISUAL / INTERACTIVE SPEC

## [STEP-BY-STEP REVEAL] Iteration Trace Builder

**Learning purpose:** memperlihatkan bahwa setiap iterasi menggunakan current state baru dan gradient baru.  
**Initial state/data/function:** $J(w)=(w-3)^2$, $w_0=0$, $\eta=0.25$.  
**Learner action:** klik “next iteration”.  
**Expected behavior:** UI membuka secara berurutan current parameter → derivative → update displacement → next parameter → objective.  
**Feedback:** highlight jika learner mencoba membawa gradient lama ke iterasi berikutnya.  
**Safety / interpretation note:** trace yang menurun pada toy ini tidak boleh diberi label universal convergence guarantee.

## [STATIC VISUAL] Parameter Path + Objective Values

**Learning purpose:** membedakan posisi parameter dan objective value.  
**Initial state/data/function:** titik $w_0,w_1,w_2,w_3$ pada curve $J(w)=(w-3)^2$.  
**Learner action:** tidak ada; visual diberi annotation tiap state.  
**Expected behavior:** peserta dapat melihat lokasi parameter dan nilai objective sebagai dua informasi berbeda.  
**Feedback:** annotation menyebut $w_t$ dan $J(w_t)$ secara terpisah.  
**Safety / interpretation note:** jangan menampilkan gambar gunung tanpa fungsi/angka; visual harus mempertahankan mathematical object.

## [COMPARE VIEW] Smooth Approach vs Oscillating Path

**Learning purpose:** membandingkan trajectory $\eta=0.25$ dan $\eta=0.75$.  
**Initial state/data/function:** objective dan starting point identik.  
**Learner action:** toggle dua learning rate.  
**Expected behavior:** $\eta=0.25$ mendekati minimum dari satu sisi; $\eta=0.75$ melintasi sisi minimum secara bergantian pada selected trace.  
**Feedback:** tampilkan parameter trajectory dan objective trajectory bersamaan.  
**Safety / interpretation note:** tidak menyatakan salah satu learning rate universally superior.

## [NUMBER MANIPULATOR] Run Three Updates

**Learning purpose:** menghubungkan learning rate dengan trajectory multi-step.  
**Initial state/data/function:** $J(w)=(w-3)^2$, $w_0=0$, slider $\eta$.  
**Learner action:** ubah $\eta$, lalu jalankan tiga update.  
**Expected behavior:** UI menghitung ulang gradient pada setiap state dan menampilkan 3-step trace.  
**Feedback:** jika objective meningkat, UI meminta learner menjelaskan kemungkinan finite-step overshoot daripada memberi label “algorithm broken”.  
**Safety / interpretation note:** batasi nilai slider dan beri label synthetic demo; bukan production hyperparameter tuner.

---

# 16. CHECKPOINT — Bisa Bedakan Satu Step dan Sebuah Trajectory?

Pilih pernyataan yang benar:

1. $\nabla J(\boldsymbol{\theta}_0)$ otomatis sama dengan $\nabla J(\boldsymbol{\theta}_1)$.  
   **Salah.** Gradient harus dievaluasi pada state yang sesuai.

2. Satu iteration mengubah current state menjadi next state.  
   **Benar.**

3. Parameter trajectory dan objective trajectory adalah objek yang sama.  
   **Salah.**

4. Jika selected toy trace turun tiga kali, Gradient Descent selalu monotonic pada semua problem.  
   **Salah.**

5. Lebih banyak iterasi otomatis menjamin generalization yang lebih baik.  
   **Salah.**

---

# 17. MASTERY CHECK — “I Can…”

Setelah topic ini, saya bisa mengatakan:

- **I can** menjelaskan Optimization sebagai sequence of parameter updates;
- **I can** membaca $t$ dan $t+1$ sebagai state yang berbeda;
- **I can** menghitung 2–3 Gradient Descent updates secara manual;
- **I can** menghitung gradient baru setelah parameter berubah;
- **I can** membuat tabel parameter/gradient/update/objective trajectory;
- **I can** membedakan parameter trajectory dan objective trajectory;
- **I can** membaca oscillation sederhana tanpa overclaim;
- **I can** menjelaskan bahwa objective tidak dijamin turun setiap step secara universal;
- **I can** menjelaskan bahwa lebih banyak iterations tidak otomatis berarti better generalization;
- **I can** menjaga HerAI toy objective tetap synthetic/hypothetical/instructional.

---

# 18. SCOPE BOUNDARY

Topic 05 **tidak** mengajarkan secara mendalam:

- full-batch vs minibatch vs stochastic gradients;
- epochs;
- data shuffling;
- optimizer state selain current parameter;
- Momentum;
- Adam;
- RMSProp;
- learning-rate schedules;
- formal convergence proofs;
- stopping criteria theory;
- early stopping;
- validation curves;
- regularization;
- production training loops.

Beberapa istilah tersebut akan muncul pada topic berikutnya atau module lain.

Core Topic 05 hanya:

> **repeat the update, recalculate local information at the new state, and inspect the resulting trajectory without making universal convergence claims.**

---

# 19. SUMMARY

1. Satu Gradient Descent update belum membentuk keseluruhan Optimization process.
2. Iteration mengubah $\boldsymbol{\theta}_t$ menjadi $\boldsymbol{\theta}_{t+1}$.
3. Gradient perlu dibaca pada current state:

$$
\nabla J(\boldsymbol{\theta}_t).
$$

4. Basic repeated update:

$$
\boldsymbol{\theta}_{t+1}
=
\boldsymbol{\theta}_t
-
\eta\nabla J(\boldsymbol{\theta}_t).
$$

5. Parameter trajectory dan objective trajectory harus dibedakan.
6. Trace manual 2–3 langkah cukup untuk membangun process literacy tanpa arithmetic overload.
7. Objective yang turun pada selected synthetic trace bukan universal monotonic guarantee.
8. More iterations tidak otomatis berarti better generalization atau better real-world system.
9. HerAI $h(q,c)$ tetap instructional score; toy iteration memakai objective terpisah yang diberi label synthetic.

---

# 20. BRIDGE — Kalau Dataset Punya Banyak Observation, Gradient Mana yang Dipakai?

Sampai Topic 05, kita memperlakukan gradient seolah berasal dari objective yang sudah tersedia dengan jelas pada setiap state.

Tetapi dalam machine learning, objective sering terbentuk dari banyak observation:

$$
J(\boldsymbol{\theta})
=
\frac{1}{n}
\sum_{i=1}^{n}
\ell^{(i)}(\boldsymbol{\theta}).
$$

Pertanyaan berikutnya:

> Apakah setiap update harus menghitung gradient dari **seluruh dataset**, sebagian dataset, atau satu observation?

Itulah fokus **Topic 06 — Batch, Minibatch, dan Stochastic Gradient**.
