# Kuis Final Terintegrasi — Submodule 07
## Integrated Case Study: Math for AI di HerAI

> Exactly 10 MCQ. Exactly 4 options each. Bloom target: 2 Understand + 4 Apply + 4 Analyze = **8/10 Apply/Analyze**.

---

## Q1 — Understand — Quantity Semantics

Citra mempunyai $h=0.94$. Interpretasi paling tepat adalah:

A. Citra mempunyai probability sukses 94%  
B. Model confidence Citra adalah 94%  
C. Constructed instructional score Citra menurut formula $h$ adalah 0.94  
D. Training loss Citra adalah 0.94

---

## Q2 — Understand — Same Range, Different Meaning

Mengapa cosine similarity $0.90$ tidak otomatis probability $90\%$?

A. Probability tidak boleh bernilai 0.90  
B. Semantic type ditentukan oleh definition/source quantity, bukan hanya range angka  
C. Cosine selalu lebih besar dari probability  
D. Probability hanya dapat dihitung dari study duration

---

## Q3 — Apply — Representation & Matching

Untuk Bima, approved Topic 02 menghasilkan:

- dot dengan Intro AI $=1.18$;
- dot dengan Belajar Python $=1.14$;
- cosine Intro AI $\approx0.8612$;
- cosine Belajar Python $\approx0.8907$.

Kesimpulan yang benar adalah:

A. Dot dan cosine selalu memberi ranking identik  
B. Raw dot memilih Intro AI, sedangkan cosine memilih Belajar Python  
C. Cosine membuktikan Belajar Python paling efektif secara pendidikan  
D. Dot product 1.18 berarti probability lebih dari 100%

---

## Q4 — Apply — Data Diagnostics

Canonical completion ratios adalah $[0.75,0.625,1.00,0.50]$. Mean-nya adalah:

A. $0.6875$  
B. $0.7000$  
C. $0.71875$  
D. $0.7500$

---

## Q5 — Apply — Conditional Probability

Jika $|A|=7$ dan $|A\cap E|=5$, maka:

A. $P(E\mid A)=5/16$  
B. $P(E\mid A)=5/8$  
C. $P(E\mid A)=5/7$  
D. $P(E\mid A)=7/5$

---

## Q6 — Apply — Prediction & Loss

Untuk $s=0.8$, $y=1$, $w=0.5$, $b=0.1$, dengan $\ell=\frac12(\hat y-y)^2$, nilai loss adalah:

A. $-0.5$  
B. $0.50$  
C. $0.25$  
D. $0.125$

---

## Q7 — Analyze — Gradient & Update

Jika $\partial J/\partial w<0$ dan Gradient Descent memakai $w_{t+1}=w_t-\eta\partial J/\partial w$, apa yang dapat terjadi?

A. $w$ wajib turun  
B. $w$ dapat naik karena mengurangi nilai gradient yang negatif menghasilkan increment positif  
C. Objective harus menjadi negatif  
D. Target $y$ otomatis berubah

---

## Q8 — Analyze — Evaluation

Training accuracy dan held-out synthetic accuracy sama-sama $0.75$, tetapi precision/recall berbeda. Kesimpulan terbaik adalah:

A. Kedua datasets mempunyai error behavior identik  
B. Accuracy yang sama tidak menjamin confusion/error profile yang sama  
C. Held-out evaluation tidak diperlukan  
D. Recall selalu lebih penting daripada precision

---

## Q9 — Analyze — Objective vs Educational Value

Model berhasil menurunkan training objective. Mana statement yang **tidak** justified?

A. Parameter update berhasil menurunkan chosen training objective pada step tersebut  
B. Current parameter state mempunyai lower chosen training objective  
C. Educational outcome learner terbukti membaik  
D. Objective dapat direcompute setelah parameter berubah

---

## Q10 — Analyze — End-to-End Boundary

Mana final conclusion yang paling defensible untuk Integrated Case?

A. Synthetic matching/training/evaluation pipeline membuktikan production HerAI siap deployment  
B. Cosine, probability, loss, objective, dan accuracy semuanya mengukur hal yang sama  
C. Case menunjukkan bagaimana mathematical quantities dapat dihubungkan secara coherent sambil menjaga batas semantic dan evidence  
D. Highest cosine adalah causal recommendation rule
