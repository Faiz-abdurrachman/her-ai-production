# Final Integrated Quiz — Submodule 03 Statistics for AI

> **10 MCQ**  
> Q1 dan Q10 = Understand.  
> Q2–Q9 = Apply/Analyze.

---

# 1. [Understand] Observational Unit

Dalam dataset statistik, “satu row” paling tepat berarti ...

A. selalu satu manusia  
B. selalu satu feature  
C. satu observation menurut observational-unit definition dataset  
D. selalu satu prediction

**Jawaban:** C

---

# 2. [Apply] Variance vs SD

Study-duration variance adalah:

$$
81.25\text{ min}^2.
$$

Pernyataan yang benar adalah ...

A. SD juga $81.25\text{ min}^2$  
B. SD sekitar $9.01\text{ min}$  
C. variance sekitar $9.01\text{ min}$  
D. large variance membuktikan bad data

**Jawaban:** B

---

# 3. [Analyze] Histogram Bins

Dua histogram dibuat dari raw observations yang sama tetapi dengan bin boundaries berbeda.

Apa yang benar?

A. raw data berubah  
B. mean pasti berubah  
C. visual representation dapat berubah sementara raw observations tetap  
D. salah satu histogram pasti invalid

**Jawaban:** C

---

# 4. [Analyze] Percentile Trap

Seorang learner berada di 90th percentile.

Apa conclusion paling aman?

A. raw score pasti 90%  
B. relative standing berada tinggi terhadap reference ordered data; raw score tidak dapat ditentukan dari percentile saja  
C. probability sukses 90%  
D. learner 90% lebih pintar

**Jawaban:** B

---

# 5. [Analyze] Outlier Flag

Value berada di atas upper IQR fence.

Langkah terbaik adalah ...

A. langsung delete  
B. label participant abnormal  
C. tandai sebagai potential outlier lalu inspect source/unit/context  
D. ubah menjadi median

**Jawaban:** C

---

# 6. [Analyze] Unit Toggle

Quiz-duration covariance = $1$ ratio-minute. Duration diubah ke seconds.

Apa yang paling tepat?

A. covariance tetap 1 dan $r$ ×60  
B. covariance ×60 sementara $r$ tetap  
C. covariance dan $r$ ×60  
D. keduanya menjadi probability

**Jawaban:** B

---

# 7. [Analyze] Correlation $r=0$

Pearson $r=0$ paling tepat berarti ...

A. tidak ada relationship apa pun  
B. variables independent secara universal  
C. tidak ada linear association yang diringkas Pearson $r$  
D. tidak ada causality

**Jawaban:** C

---

# 8. [Analyze] Missing Data

Field memiliki value `NA`.

Apa yang paling aman?

A. `NA=0` secara default  
B. missing perlu explicit handling berdasarkan semantics/source/use case  
C. row harus selalu dihapus  
D. mean imputation pasti true value

**Jawaban:** B

---

# 9. [Analyze] Numeric Code + Normalization

`participant_code = 101,102,103,104` dinormalisasi ke $[0,1]$.

Apa yang benar?

A. normalization otomatis membuat code menjadi meaningful quantitative feature  
B. scale berubah, semantics identifier belum berubah  
C. mean code sekarang causal  
D. code sekarang probability

**Jawaban:** B

---

# 10. [Understand] Class Imbalance

Dalam classification context, class imbalance terutama berarti ...

A. numerical feature mempunyai large SD  
B. histogram mempunyai unequal bins  
C. target-label frequencies sangat tidak seimbang  
D. ada outlier

**Jawaban:** C
