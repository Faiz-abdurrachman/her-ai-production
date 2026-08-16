# 00 — Informasi Submodule 05

# Calculus: Perubahan, Turunan, dan Gradient

**Program:** HerAI Fellowship  
**Category:** Foundation & Core AI  
**Module:** Math for AI  
**Submodule:** 05  
**Status:** **FINAL CONSOLIDATED — TOPIC 01–08 APPROVED**

---

# 1. Tujuan Submodule

Submodule ini membangun literacy Calculus minimum yang dibutuhkan learner sebelum masuk ke Optimization. Fokusnya bukan membuat peserta menempuh Calculus I–III secara penuh, tetapi membuat peserta mampu membaca **perubahan lokal** pada function dan memahami mengapa derivative/gradient menjadi informasi matematis penting dalam AI.

Setelah menyelesaikan Submodule 05, learner diharapkan dapat:

- membaca function dan graph sebagai hubungan input-output;
- menghitung slope dan average rate of change;
- menjelaskan derivative sebagai local/instantaneous rate of change;
- menghitung derivative sederhana untuk polynomial beginner-safe;
- menghitung dan menginterpretasikan partial derivative;
- membangun gradient sebagai vector partial derivatives;
- menggunakan simple chain rule pada composed computation;
- membaca computational graph sebagai dependency map;
- menghubungkan derivative/gradient dengan loss landscape;
- membedakan informasi Calculus dari mechanics Optimization;
- menjaga distinction antara score, probability, loss, gradient, dan causal claim.

---

# 2. Topic Map Final

1. **Function dan Graph: Aktivasi Kembali**
2. **Slope dan Rate of Change**
3. **Derivative sebagai Local Change**
4. **Menghitung Derivative Sederhana**
5. **Partial Derivative**
6. **Gradient sebagai Vector Partial Derivatives**
7. **Chain Rule dan Computational Graph**
8. **Loss Landscape dan Bridge ke Optimization**

Approved learner-facing lessons di folder `materi/` adalah **verbatim copies** dari Topic packages yang telah disetujui. SHA-256 equality dicatat di `verbatim-copy-manifest.json`.

---

# 3. Learning Outcomes Final

- **LO-05.1** membaca input, output, domain, range, function value, dan graph sederhana;
- **LO-05.2** menghitung serta menginterpretasikan slope dan average rate of change dengan unit yang benar;
- **LO-05.3** menjelaskan derivative sebagai local rate, tangent slope, dan sensitivity lokal tanpa causal overclaim;
- **LO-05.4** menghitung derivative constant/power/polynomial sederhana;
- **LO-05.5** menghitung partial derivative satu scalar output terhadap satu chosen variable sambil variables lain held fixed secara matematis;
- **LO-05.6** menyusun gradient sebagai vector partial derivatives dengan component order/dimension yang benar;
- **LO-05.7** menjelaskan steepest local increase dan corresponding negative-gradient local-decrease direction secara aman;
- **LO-05.8** menggunakan simple chain rule pada composed function dan serial computational graph;
- **LO-05.9** membedakan node value, local derivative, dan end-to-end derivative;
- **LO-05.10** membaca loss/objective sebagai scalar function dari parameter dan menganalisis local landscape behavior;
- **LO-05.11** membedakan local minimum, global minimum, dan stationary/critical condition;
- **LO-05.12** menjelaskan secara eksplisit bahwa derivative/gradient information belum sama dengan Optimization algorithm.

---

# 4. Canonical Notation Map

| Konsep | Notation | Makna ringkas |
|---|---|---|
| Function | $f(x)$ | output function pada input $x$ |
| Change | $\Delta x,\Delta y$ | selisih input/output antara dua points |
| Slope / AROC | $\frac{\Delta y}{\Delta x}$ | average output change per input unit |
| Derivative | $f'(x)$ | local derivative function |
| Derivative at point | $f'(a)$ | local rate pada $x=a$ |
| Leibniz derivative | $\frac{df}{dx}$ | derivative output terhadap input $x$ |
| Partial derivative | $\frac{\partial f}{\partial x}$ | local rate terhadap $x$ dengan variables lain held fixed mathematically |
| Gradient | $\nabla f$ | vector partial derivatives |
| Parameter vector | $\boldsymbol{\theta}$ | collection of model/objective parameters |
| Objective/loss | $J(\boldsymbol{\theta})$ | scalar objective yang semantics-nya harus explicit |

---

# 5. Core Formula Map

Average rate of change:

$$
\frac{\Delta y}{\Delta x}
=
\frac{f(x_2)-f(x_1)}{x_2-x_1},
\qquad x_2\ne x_1.
$$

Beginner-safe derivative definition:

$$
f'(a)
=
\lim_{h\to0}
\frac{f(a+h)-f(a)}{h}.
$$

Power rule core:

$$
\frac{d}{dx}x^n
=
nx^{n-1}.
$$

Gradient:

$$
\nabla J(\boldsymbol{\theta})
=
\begin{bmatrix}
\frac{\partial J}{\partial \theta_1}\\
\vdots\\
\frac{\partial J}{\partial \theta_d}
\end{bmatrix}.
$$

Simple chain rule:

$$
\frac{dz}{dx}
=
\frac{dz}{du}
\frac{du}{dx}.
$$

---

# 6. Persistent HerAI Running Case

Canonical observed data tetap:

| Peserta | Quiz ratio $q$ | Completion ratio $c$ | Study duration |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 menit |
| Bima | 0.60 | 0.625 | 30 menit |
| Citra | 0.90 | 1.00 | 55 menit |
| Dewi | 0.70 | 0.50 | 40 menit |

Instructional weighted score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Scores:

- Alya: $0.78$;
- Bima: $0.61$;
- Citra: $0.94$;
- Dewi: $0.62$.

Partial derivatives:

$$
\frac{\partial h}{\partial q}=0.6,
\qquad
\frac{\partial h}{\partial c}=0.4.
$$

Gradient:

$$
\nabla h(q,c)
=
\begin{bmatrix}
0.6\\
0.4
\end{bmatrix}.
$$

## Safety

$h(q,c)$ dan turunannya tetap **instructional mathematics**. Mereka tidak otomatis merupakan:

- probability;
- predicted/calibrated probability;
- confidence;
- causal effect;
- universal feature importance;
- production training loss;
- production recommendation rule.

---

# 7. Calculus Safety Map

| Unsafe claim | Correction |
|---|---|
| Slope = $y$ | Slope adalah ratio perubahan output terhadap input |
| Derivative = average change pada interval luas | Derivative adalah local rate pada point |
| Positive derivative = “baik” | Sign hanya menunjukkan local direction of output change |
| Derivative = causality | Mathematical sensitivity tidak membuktikan causal effect |
| Partial derivative = causal feature effect | Holding variables fixed adalah mathematical operation, bukan intervention |
| Gradient = scalar | Gradient adalah vector |
| Gradient = error/loss | Gradient adalah derivative information dari scalar function |
| Largest gradient component = most important real-world feature | Numeric component magnitude tidak otomatis universal importance |
| Gradient selalu downhill | Gradient menunjuk steepest local increase; negative gradient local decrease |
| Negative gradient menjamin global minimum | Ia hanya local direction information |
| Zero gradient = global minimum | Zero gradient adalah stationary condition, bukan global guarantee |
| Chain rule = backpropagation | Chain rule adalah mathematical rule yang digunakan dalam broader differentiation systems |
| Computational graph = neural network saja | Computational graph dapat mewakili generic composed computation |
| Loss = probability | Loss/objective mempunyai semantics berbeda dari probability |
| Lower loss = whole system pasti lebih baik | Metrics/generalization/constraints lain tetap perlu dievaluasi |
| Differentiation = Optimization | Calculus memberi local-change information; update strategy milik Optimization |

---

# 8. Final Assessment Structure

- `latihan.md` — **8 integrated open exercises**;
- `kuis.md` — **10 MCQ**, 8/10 Apply/Analyze;
- `diskusi.md` — **2 substantive integrated discussions**;
- `kunci-jawaban-rubrik.md` — model reasoning, MCQ keys, rubrics, discussion guidance;
- `coverage-map.json` — mapping Topic 01–08, skills, dan misconception coverage.

Final assessment adalah **new integrated assessment**, bukan copy-paste formative items dari per-topic packages.

---

# 9. Calculus → Optimization Boundary

Submodule 05 berakhir saat learner dapat membaca:

> **function → local change → derivative → partial derivatives → gradient → chain rule → loss landscape.**

Submodule 05 **belum** mengajarkan sebagai core:

- Gradient Descent update equation;
- learning rate;
- iterative parameter update;
- SGD / Momentum / RMSProp / Adam;
- optimizer comparison;
- convergence proof;
- Hessian / second-order optimization;
- full neural-network backpropagation derivation.

Hal-hal tersebut belong ke **Submodule 06 — Optimization** atau level lanjut.

---

# 10. Completion Criteria

Learner siap menuju Optimization bila ia dapat:

1. membedakan function value, derivative, partial derivative, dan gradient;
2. menghitung derivative/partial/gradient sederhana dengan benar;
3. membaca sign, magnitude, unit, dimension, dan local/global boundary;
4. menggunakan chain rule pada simple composed computation;
5. membaca loss landscape tanpa menganggap gradient sebagai update algorithm;
6. menolak claim zero gradient = global minimum;
7. menjaga $h(q,c)$ sebagai instructional score;
8. menjaga loss ≠ probability dan derivative ≠ causality;
9. menjelaskan dengan kata-kata sendiri apa yang Calculus berikan kepada Optimization.
