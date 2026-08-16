# Final Integrated Quiz — Submodule 06 Optimization

> **10 MCQ. Exactly 4 options each. Distribution: 1 Recall + 1 Understand + 4 Apply + 4 Analyze = 80% Apply/Analyze.**

---

## 1. [Recall]

Dalam course convention ini, $\operatorname*{arg\,min}_{w}J(w)$ merujuk pada...

A. nilai objective terkecil saja  
B. parameter atau kumpulan parameter yang menghasilkan nilai objective minimum  
C. gradient pada current parameter  
D. evaluation metric setelah training

---

## 2. [Understand]

Pernyataan paling tepat tentang regularization adalah...

A. regularization adalah optimizer yang menggantikan Gradient Descent  
B. regularization dapat mengubah objective dengan menambahkan preference/penalty, lalu optimizer bekerja pada objective tersebut  
C. regularization menjamin validation metric selalu membaik  
D. regularization berarti learning rate dibuat lebih kecil

---

## 3. [Apply]

Empat per-example losses adalah:

$$
0.10,\quad 0.30,\quad 0.20,\quad 0.40.
$$

Jika aggregate objective adalah rata-rata, nilainya adalah...

A. $0.20$  
B. $0.25$  
C. $0.30$  
D. $1.00$

---

## 4. [Apply]

Untuk:

$$
J(w)=(w-3)^2,
$$

dengan $w_0=1$ dan $\eta=0.25$, satu Gradient Descent update menghasilkan...

A. $w_1=0$  
B. $w_1=1.5$  
C. $w_1=2$  
D. $w_1=3$

---

## 5. [Apply]

Pada current state yang sama, tiga per-example gradients adalah:

$$
2,\quad 8,\quad -1.
$$

Gradient minibatch yang hanya memakai example 1 dan 2 adalah...

A. $2$  
B. $4$  
C. $5$  
D. $10$

---

## 6. [Apply]

Momentum memakai:

$$
u_t=0.5u_{t-1}-0.1g_t.
$$

Jika $u_{t-1}=-0.4$ dan $g_t=-2$, maka $u_t$ adalah...

A. $-0.4$  
B. $-0.2$  
C. $0$  
D. $0.4$

---

## 7. [Analyze]

Dari current state yang sama, learning rate A menghasilkan objective $4\rightarrow1\rightarrow0.25$, sedangkan learning rate B menghasilkan $4\rightarrow9\rightarrow20$ pada synthetic objective yang sama. Kesimpulan paling aman adalah...

A. learning rate B pasti selalu buruk untuk seluruh model dan seluruh state  
B. learning rate A menunjukkan trajectory yang lebih baik pada trace ini, sedangkan B terlalu agresif pada trace ini; claim universal tetap tidak valid  
C. learning rate terbesar selalu paling cepat karena update-nya lebih jauh  
D. loss harus turun setiap step, jadi trace B mustahil terjadi

---

## 8. [Analyze]

Pernyataan paling tepat tentang Adam adalah...

A. Adam menghilangkan learning rate karena setiap parameter otomatis mempunyai step optimal  
B. Adam memakai historical first-moment dan squared-gradient information untuk adaptive scaling, tetapi tetap tidak menjamin universal superiority atau generalization  
C. Adam adalah second-order method karena memakai squared gradient  
D. Adam secara otomatis mencegah overfitting

---

## 9. [Analyze]

Model A mempunyai training quantity $0.04$ dan evaluation quantity $0.20$. Model B mempunyai training quantity $0.07$ dan evaluation quantity $0.12$. Diagnosis terbaik adalah...

A. A pasti lebih baik karena training quantity lebih rendah  
B. B mempunyai evaluation quantity lebih rendah pada data evaluasi tersebut; training success dan unseen/evaluation performance perlu dibedakan  
C. A mempunyai probability lebih tinggi  
D. B pasti global optimum

---

## 10. [Analyze]

Canonical HerAI Citra mempunyai:

$$
h(q,c)=0.94.
$$

Pernyataan paling aman adalah...

A. itu calibrated success probability $94\%$  
B. itu production loss sebesar $0.94$  
C. itu instructional weighted score; probability, loss, dan production semantics membutuhkan definisi/evidence terpisah  
D. weights $0.6$ dan $0.4$ terbukti sebagai causal feature importance

