# Final Integrated Quiz — Submodule 04 Probability

> **10 MCQ** — 1 Recall, 1 Understand, 4 Apply, 4 Analyze.  
> **Apply/Analyze = 8/10 = 80%.**

---

## Q1 — Recall

Conditional probability yang benar adalah ...

A. $P(A\mid B)=P(A)+P(B)$  
B. $P(A\mid B)=\frac{P(A\cap B)}{P(B)}$ untuk $P(B)>0$  
C. $P(A\mid B)=P(B\mid A)$ selalu  
D. $P(A\mid B)=P(A)P(B)$ selalu

---

## Q2 — Understand

Mengapa angka $0.94$ belum otomatis merupakan probability?

A. Probability tidak boleh berbentuk desimal  
B. Probability selalu harus lebih kecil dari 0.5  
C. Range $[0,1]$ saja tidak menentukan semantics; event/model definition masih diperlukan  
D. Angka 0.94 hanya boleh menjadi expected value

---

## Q3 — Apply

Diketahui:

$$
P(A)=0.60,
\quad
P(B)=0.50,
\quad
P(A\cap B)=0.30.
$$

Berapakah $P(A\cup B)$?

A. 0.30  
B. 0.50  
C. 0.80  
D. 1.10

---

## Q4 — Apply

Diketahui:

$$
P(A)=0.40,
\quad
P(B)=0.50,
\quad
P(A\cap B)=0.20.
$$

Diagnosis yang benar adalah ...

A. independent karena $0.40\times0.50=0.20$  
B. mutually exclusive karena joint > 0  
C. dependent karena marginals berbeda  
D. tidak dapat dibahas tanpa Bayes

---

## Q5 — Apply

Diberikan:

$$
P(H)=0.20,
\quad
P(D\mid H)=0.80,
\quad
P(D\mid H^c)=0.20.
$$

Berapakah $P(D)$?

A. 0.16  
B. 0.20  
C. 0.32  
D. 0.80

---

## Q6 — Apply

Random variable $X$ mempunyai distribution:

| $x$ | 0 | 1 | 2 |
|---:|---:|---:|---:|
| $P(X=x)$ | 0.25 | 0.50 | 0.25 |

Berapakah $E[X]$?

A. 0.50  
B. 1.00  
C. 1.25  
D. 2.00

---

## Q7 — Analyze

Dua positive-probability events mutually exclusive. Pernyataan paling tepat adalah ...

A. pasti independent karena tidak overlap  
B. biasanya tidak independent karena joint $0$ sedangkan product marginals positive  
C. pasti mempunyai probability sama  
D. Bayes membuktikan keduanya causal

---

## Q8 — Analyze

Sebuah model memberi predictions sekitar 0.80, tetapi observed positive fraction pada bin tersebut 0.55. Apa diagnosis paling aman?

A. model 80% accurate  
B. calibration pada bin itu buruk karena prediction level lebih tinggi daripada observed fraction  
C. event pasti negative  
D. softmax belum digunakan

---

## Q9 — Analyze

Developer berkata: “$P(D\mid H)=0.9$, jadi setelah $D$ muncul, $P(H\mid D)=0.9$.” Respons terbaik adalah ...

A. benar karena Bayes hanya membalik conditional  
B. belum valid; prior/base rate dan evidence probability under alternatives masih diperlukan  
C. benar jika $H$ dan $D$ independent  
D. salah karena posterior selalu lebih kecil dari likelihood

---

## Q10 — Analyze

Mana statement yang paling aman tentang AI-output pipeline?

A. logits adalah probabilities, softmax adalah calibration, cross-entropy adalah probability error  
B. score di $[0,1]$ otomatis predicted probability  
C. logits adalah raw outputs; normalized probability-intended outputs masih perlu calibration evaluation; cross-entropy/log loss adalah loss  
D. calibration dan accuracy selalu identik
