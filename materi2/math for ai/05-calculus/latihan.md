# Final Integrated Exercises — Submodule 05 Calculus

> **8 integrated open exercises.** Setiap item menghubungkan beberapa Topic dan menguji computation + interpretation + misconception diagnosis + AI boundary.

---

# Latihan 1 — Function → Average Rate → Local Derivative

**Objective:** menghubungkan graph/function literacy, average rate, dan derivative tanpa mencampur semantics.  
**Difficulty:** Intermediate  
**Coverage:** Topic 01–03

## Scenario

Gunakan synthetic function:

$$
f(x)=x^2.
$$

## Tugas

1. Hitung $f(1)$, $f(2)$, dan $f(3)$.
2. Hitung average rate of change dari $x=1$ ke $x=3$.
3. Tentukan derivative function $f'(x)$.
4. Hitung $f'(2)$.
5. Pada contoh ini AROC $[1,3]$ dan $f'(2)$ mempunyai nilai numerik sama. Jelaskan mengapa mereka tetap merupakan **konsep berbeda**.
6. Sebutkan unit derivative jika $x$ diukur dalam detik dan $f(x)$ dalam meter.
7. Audit claim: “Karena derivative positif, perubahan $x$ menyebabkan hasil yang baik.”

---

# Latihan 2 — Canonical HerAI: Function, Partial Derivative, Gradient

**Objective:** mentransfer function → partial → gradient sambil menjaga semantics canonical HerAI.  
**Difficulty:** Analyze  
**Coverage:** Topic 01, 05, 06

Canonical score:

$$
h(q,c)=0.6q+0.4c.
$$

Alya mempunyai:

$$
q=0.80,
\qquad
c=0.75.
$$

## Tugas

1. Hitung $h(0.80,0.75)$.
2. Hitung $\frac{\partial h}{\partial q}$ dan $\frac{\partial h}{\partial c}$.
3. Susun $\nabla h$ dengan order $(q,c)$.
4. Jika $q$ naik sebesar $0.01$ sementara $c$ mathematically held fixed, berapa perubahan score untuk linear function ini?
5. Jelaskan arti component $0.6$ dan $0.4$ secara local/mathematical.
6. Jelaskan mengapa $0.6>0.4$ **tidak** membuktikan quiz mempunyai causal effect lebih besar.
7. Jelaskan mengapa $h=0.78$ bukan automatically probability atau production loss.

---

# Latihan 3 — Derivative Rules + Error Diagnosis

**Objective:** menghitung derivative polynomial dan mendiagnosis langkah yang salah.  
**Difficulty:** Intermediate  
**Coverage:** Topic 03–04

Diberikan:

$$
p(x)=3x^3-2x^2+5.
$$

Seorang learner menulis:

$$
p'(x)=9x^2-4+5.
$$

## Tugas

1. Hitung derivative yang benar.
2. Jelaskan dua error pada jawaban learner.
3. Hitung $p'(1)$.
4. Interpretasikan sign $p'(1)$ sebagai local-change statement.
5. Apakah $p'(1)>0$ berarti $p$ meningkat pada seluruh domain? Jelaskan.
6. Apakah derivative ini memberi causal meaning pada $x$? Jelaskan.

---

# Latihan 4 — Partial Derivative → Gradient → Local Direction

**Objective:** menghubungkan multivariable derivative ke vector gradient tanpa melakukan Optimization update.  
**Difficulty:** Analyze  
**Coverage:** Topic 05–06–08

Gunakan **synthetic loss**:

$$
J(w,b)=(w-1)^2+2(b+1)^2.
$$

## Tugas

1. Hitung $\frac{\partial J}{\partial w}$ dan $\frac{\partial J}{\partial b}$.
2. Susun $\nabla J(w,b)$.
3. Evaluate pada $(w,b)=(2,0)$.
4. Tulis corresponding negative-gradient local-decrease direction.
5. Jelaskan mengapa vector negative gradient tersebut **bukan next parameter state**.
6. Apa yang masih belum ditentukan untuk membuat actual optimization update?
7. Apakah component $4$ berarti $b$ adalah parameter paling penting secara universal? Jelaskan.

---

# Latihan 5 — Chain Rule dan Computational Graph

**Objective:** membedakan node value, local derivative, dan end-to-end derivative.  
**Difficulty:** Intermediate  
**Coverage:** Topic 04, 07, 08 bridge

Gunakan **synthetic toy loss**:

$$
J(w)=(2w-1)^2.
$$

Definisikan:

$$
u=2w-1,
\qquad
J=u^2.
$$

## Tugas

1. Gambar dependency sebagai text path $w\rightarrow u\rightarrow J$.
2. Hitung $u$ dan $J$ pada $w=1$.
3. Hitung local derivative $\frac{du}{dw}$.
4. Hitung local derivative $\frac{dJ}{du}$ pada $w=1$.
5. Gunakan chain rule untuk menghitung $\frac{dJ}{dw}$ pada $w=1$.
6. Jelaskan perbedaan **node value**, **local derivative**, dan **end-to-end derivative**.
7. Mengapa computation ini belum sama dengan backpropagation training loop atau parameter update?

---

# Latihan 6 — Stationary Point: Minimum atau Bukan?

**Objective:** mengaudit misconception zero derivative/gradient.  
**Difficulty:** Analyze  
**Coverage:** Topic 03, 06, 08

Bandingkan dua synthetic functions:

$$
J(w)=(w-1)^2
$$

dan:

$$
F(w)=w^3.
$$

## Tugas

1. Hitung $J'(w)$ dan $F'(w)$.
2. Tentukan point dengan derivative zero untuk masing-masing function.
3. Jelaskan mengapa $w=1$ pada $J$ adalah global minimum.
4. Jelaskan mengapa $w=0$ pada $F$ bukan local minimum ataupun local maximum.
5. Tulis general correction untuk statement “derivative/gradient zero berarti global minimum.”
6. Apa additional information yang secara konseptual diperlukan untuk mengklasifikasikan stationary point?

---

# Latihan 7 — HerAI + Synthetic Nonlinear Wrapper + Chain Rule

**Objective:** menggunakan canonical score di dalam synthetic nonlinear function tanpa mengubah semantics canonical.  
**Difficulty:** Advanced Beginner / Analyze  
**Coverage:** Topic 05–08

Canonical:

$$
h(q,c)=0.6q+0.4c.
$$

Untuk latihan Calculus saja, definisikan **SYNTHETIC / HYPOTHETICAL** wrapper:

$$
R(q,c)=\left(h(q,c)-0.75\right)^2.
$$

Gunakan Alya:

$$
(q,c)=(0.80,0.75),
\qquad h=0.78.
$$

## Tugas

1. Hitung $R$ untuk Alya.
2. Gunakan chain rule untuk menghitung $\frac{\partial R}{\partial q}$.
3. Hitung $\frac{\partial R}{\partial c}$.
4. Susun $\nabla R$ pada Alya.
5. Jelaskan mengapa gradient $R$ bergantung pada current value $h$, sedangkan $\nabla h$ konstan.
6. Jelaskan mengapa target $0.75$ tidak boleh disebut policy target HerAI.
7. Jelaskan mengapa $R$ tidak boleh disebut production loss tanpa specification tambahan.

---

# Latihan 8 — End-to-End Calculus Claim Audit

**Objective:** mengintegrasikan seluruh Submodule 05 dalam satu technical review.  
**Difficulty:** Analyze  
**Coverage:** Topic 01–08

Sebuah draft dokumentasi menulis:

> “Function adalah grafiknya. Slope cukup dihitung dari satu nilai $y$. Derivative adalah average change pada interval. Partial derivative menunjukkan causal feature effect. Gradient adalah scalar error dan selalu menunjuk downhill. Component gradient terbesar adalah feature paling penting. Jika gradient zero berarti global minimum. Chain rule sama dengan backpropagation. Karena canonical HerAI score Citra adalah 0.94, itu berarti success probability 94%. Kita dapat menyebut $h(q,c)$ sebagai loss dan langsung mengurangi parameter sebesar gradient; itu sudah Gradient Descent. Jika loss turun, real system pasti lebih baik.”

## Tugas

Audit minimal aspek berikut:

1. function vs graph representation;
2. slope/rate definition;
3. average rate vs derivative;
4. partial derivative vs causality;
5. gradient type dan direction;
6. gradient component magnitude vs feature importance;
7. zero gradient vs global minimum;
8. chain rule vs backpropagation;
9. HerAI score vs probability;
10. score vs loss semantics;
11. derivative/gradient vs Optimization update;
12. lower loss vs broader system quality;
13. tulis ulang satu paragraph yang academically safe.
