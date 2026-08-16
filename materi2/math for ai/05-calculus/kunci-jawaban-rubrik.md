# Kunci Jawaban dan Rubrik — Final Assessment Submodule 05 Calculus

# A. Model Answer + Rubric untuk Latihan Terintegrasi

---

## Latihan 1 — Function → Average Rate → Local Derivative

### Model answer

$$
f(1)=1,
\qquad
f(2)=4,
\qquad
f(3)=9.
$$

AROC:

$$
\frac{9-1}{3-1}=4.
$$

Derivative:

$$
f'(x)=2x,
$$

sehingga:

$$
f'(2)=4.
$$

Walaupun numeric value sama, AROC menggunakan dua endpoint pada interval $[1,3]$, sedangkan $f'(2)$ adalah local rate di point $2$. Kesamaan angka terjadi karena struktur function/interval ini, bukan karena kedua konsep identik.

Jika output meter dan input detik, derivative unit adalah meter per detik.

Positive derivative hanya menyatakan output meningkat secara lokal ketika input naik; tidak menyatakan “baik” atau causal benefit.

### Rubric — 10 points

- 2: function values benar;
- 2: AROC benar;
- 2: derivative + evaluation benar;
- 2: average vs local distinction;
- 1: unit benar;
- 1: causal/value-judgment misconception ditolak.

---

## Latihan 2 — Canonical HerAI

### Model answer

$$
h(0.80,0.75)=0.6(0.80)+0.4(0.75)=0.78.
$$

$$
\frac{\partial h}{\partial q}=0.6,
\qquad
\frac{\partial h}{\partial c}=0.4.
$$

$$
\nabla h=
\begin{bmatrix}
0.6\\
0.4
\end{bmatrix}.
$$

Jika $q$ naik $0.01$ dan $c$ fixed, linear score naik:

$$
0.6(0.01)=0.006.
$$

Components adalah mathematical sensitivities score terhadap each input under the function definition. Mereka tidak membuktikan causal effect/importance. $0.78$ adalah instructional score, bukan probability atau production loss.

### Rubric — 10 points

- 2: score benar;
- 2: partial derivatives benar;
- 2: gradient benar/order tepat;
- 1: change $0.006$ benar;
- 1: local interpretation;
- 1: causality rejected;
- 1: score/probability/loss semantics safe.

---

## Latihan 3 — Derivative Rules

### Model answer

$$
p'(x)=9x^2-4x.
$$

Error learner:

1. derivative $-2x^2$ seharusnya $-4x$, bukan $-4$;
2. derivative constant $5$ adalah $0$, bukan $5$.

$$
p'(1)=9-4=5.
$$

Positive local derivative berarti function meningkat secara lokal terhadap $x$ di sekitar $x=1$. Tidak menjamin meningkat pada seluruh domain dan tidak memberi causal meaning.

### Rubric — 10 points

- 3: derivative benar;
- 2: dua error didiagnosis;
- 1: evaluation benar;
- 2: local sign interpretation;
- 1: global overclaim rejected;
- 1: causality rejected.

---

## Latihan 4 — Gradient + Local Direction

### Model answer

$$
\frac{\partial J}{\partial w}=2(w-1),
$$

$$
\frac{\partial J}{\partial b}=4(b+1).
$$

$$
\nabla J(w,b)=
\begin{bmatrix}
2(w-1)\\
4(b+1)
\end{bmatrix}.
$$

Pada $(2,0)$:

$$
\nabla J=
\begin{bmatrix}
2\\
4
\end{bmatrix},
\qquad
-\nabla J=
\begin{bmatrix}
-2\\
-4
\end{bmatrix}.
$$

Negative gradient hanya direction. Step size, learning rate, update equation, iteration, stopping rule, dan optimizer belum ditentukan. Component 4 tidak otomatis universal importance.

### Rubric — 10 points

- 3: partial derivatives;
- 2: gradient assembly;
- 1: evaluation;
- 1: negative direction;
- 2: Optimization boundary;
- 1: feature-importance misconception rejected.

---

## Latihan 5 — Chain Rule

### Model answer

Path:

$$
w\rightarrow u\rightarrow J.
$$

Pada $w=1$:

$$
u=2(1)-1=1,
\qquad
J=1^2=1.
$$

$$
\frac{du}{dw}=2.
$$

$$
\frac{dJ}{du}=2u=2.
$$

Chain rule:

$$
\frac{dJ}{dw}
=
\frac{dJ}{du}
\frac{du}{dw}
=2\cdot2=4.
$$

Node values adalah $w,u,J$; local derivatives melekat pada hubungan adjacent computations; end-to-end derivative menggabungkan local derivatives sepanjang path. Ini belum training loop, optimizer, atau parameter update.

### Rubric — 10 points

- 1: path benar;
- 2: node values;
- 2: local derivatives;
- 2: chain result;
- 2: distinctions jelas;
- 1: backprop/optimization boundary.

---

## Latihan 6 — Stationary Point

### Model answer

$$
J'(w)=2(w-1),
$$

zero pada $w=1$.

$$
F'(w)=3w^2,
$$

zero pada $w=0$.

$J$ adalah nonnegative parabola dan $J(1)=0$, sehingga $w=1$ global minimum function ini. $F(w)=w^3$ terus meningkat melewati $0$, sehingga $0$ bukan local min/max.

Correction:

> derivative/gradient zero adalah stationary/critical condition, bukan bukti otomatis global minimum.

Classification membutuhkan function behavior/structure tambahan (dan pada level lanjut dapat memakai higher-order/local geometry information).

### Rubric — 10 points

- 2: derivatives;
- 2: zero points;
- 2: $J$ classification;
- 2: $F$ classification;
- 1: general correction;
- 1: additional-information reasoning.

---

## Latihan 7 — Synthetic Wrapper

### Model answer

Alya:

$$
h=0.78,
\qquad
h-0.75=0.03.
$$

$$
R=(0.03)^2=0.0009.
$$

Chain rule:

$$
\frac{\partial R}{\partial q}
=
2(h-0.75)\frac{\partial h}{\partial q}
=
2(0.03)(0.6)
=0.036.
$$

$$
\frac{\partial R}{\partial c}
=
2(0.03)(0.4)
=0.024.
$$

$$
\nabla R=
\begin{bmatrix}
0.036\\
0.024
\end{bmatrix}.
$$

$\nabla h$ konstan karena $h$ linear. $\nabla R$ bergantung pada $h-0.75$, jadi berubah dengan current state. $0.75$ adalah arbitrary instructional target dalam synthetic wrapper, bukan HerAI policy. $R$ bukan production loss kecuali system/objective semantics didefinisikan dan divalidasi.

### Rubric — 10 points

- 1: $h$ carry-forward benar;
- 1: $R$ benar;
- 2: partial $q$;
- 2: partial $c$;
- 1: gradient assembly;
- 1: nonlinear/state-dependence explanation;
- 1: target safety;
- 1: production-loss safety.

---

## Latihan 8 — End-to-End Audit

### Model answer — minimum correction set

- function bukan graph; graph adalah representation;
- slope membutuhkan ratio perubahan $\Delta y/\Delta x$;
- derivative adalah local rate, bukan average interval luas;
- partial derivative adalah mathematical sensitivity dengan variables lain held fixed, bukan causal effect;
- gradient adalah vector, bukan scalar error;
- gradient menunjuk steepest local increase; negative gradient local decrease;
- largest component bukan universal feature importance;
- zero gradient bukan global-minimum guarantee;
- chain rule bukan backpropagation itu sendiri;
- $h=0.94$ adalah instructional score, bukan success probability;
- scalar score tidak otomatis loss;
- derivative/gradient tidak menentukan step size/update algorithm;
- lower loss tidak otomatis berarti whole real-world system lebih baik.

Safe rewrite harus mempertahankan local/global, semantics, dan Optimization boundary.

### Rubric — 10 points

- 8: minimal 10 dari 12 misconception classes dikoreksi dengan tepat;
- 2: safe rewrite coherent dan tidak membuat claim baru yang unsupported.

---

# B. Kunci Kuis

| No. | Level | Jawaban | Rationale ringkas |
|---:|---|:---:|---|
| 1 | Recall | B | Gradient adalah vector partial derivatives. |
| 2 | Understand | B | Derivative adalah local rate di point. |
| 3 | Apply | C | $(9-1)/(3-1)=4$. |
| 4 | Apply | C | $p'(x)=6x^2-3$, jadi $p'(1)=3$. |
| 5 | Apply | C | $\partial f/\partial x=2x+y=4$. |
| 6 | Apply | D | Chain rule: $2(3w+1)\cdot3$; pada $w=1$ hasil $24$. |
| 7 | Analyze | C | Range numeric tidak memberi probability semantics. |
| 8 | Analyze | C | Gradient memberi local direction; step size belum ditentukan. |
| 9 | Analyze | B | Zero gradient adalah stationary condition. |
| 10 | Analyze | B | Lower objective tidak otomatis seluruh-system improvement. |

---

# C. Guidance Diskusi

## Diskusi 1

Jawaban kuat harus membedakan:

> **Calculus information** vs **Optimization decision/algorithm**.

Expected points:

- local derivative/gradient;
- steepest increase/local decrease;
- no step size from gradient alone;
- no iteration/optimizer/stopping rule from gradient alone;
- no global guarantee;
- proper bridge to Submodule 06.

### Discussion rubric — 10 points

- 4: mathematical interpretation;
- 4: Optimization boundary;
- 2: local/global safety.

## Diskusi 2

Jawaban kuat harus membedakan:

> mathematical form ≠ semantic role.

Expected points:

- $h$ = instructional score;
- $R$ = explicitly synthetic wrapper;
- neither automatically probability;
- neither derivative automatically causal;
- probability requires target/event + probabilistic modeling/evaluation semantics;
- production loss requires explicit objective definition and system context.

### Discussion rubric — 10 points

- 4: score/loss/probability distinction;
- 3: derivative/causality safety;
- 3: production/source-scope reasoning.
