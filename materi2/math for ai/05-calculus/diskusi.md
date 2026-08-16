# Final Integrated Discussions — Submodule 05 Calculus

> **Exactly 2 substantive discussions.** Keduanya menguji transfer reasoning, bukan opinion-only.

---

# Diskusi 1 — Apa yang Calculus Berikan kepada Optimizer?

## Prompt

Bayangkan tim mempunyai scalar objective $J(\boldsymbol{\theta})$ dan sudah dapat menghitung $\nabla J(\boldsymbol{\theta})$.

Diskusikan:

1. information apa yang sudah diberikan Calculus;
2. mengapa gradient disebut local information;
3. apa arti gradient dan negative gradient secara geometric;
4. keputusan apa yang **belum** ditentukan hanya dari gradient;
5. mengapa “negative gradient = Gradient Descent lengkap” adalah misconception;
6. mengapa local descent direction tidak memberi global-minimum guarantee;
7. bagaimana jawaban ini menjadi bridge yang tepat menuju Submodule 06 Optimization.

## Expected reasoning

Jawaban kuat mencakup:

- derivative/partial/gradient menjelaskan local rate of change;
- gradient adalah steepest local increase dalam standard Euclidean interpretation;
- negative gradient memberi corresponding local-decrease direction;
- step size, learning rate, iteration, update rule, stopping criterion, optimizer choice, dan convergence belum ditentukan;
- local direction bukan global guarantee;
- Calculus memberikan information yang akan digunakan Optimization, tetapi bukan algorithm lengkap.

## Safety boundary

Jangan mengubah diskusi menjadi tutorial Momentum/Adam, learning-rate tuning, convergence proof, Hessian, atau full Gradient Descent implementation.

---

# Diskusi 2 — Satu Formula, Banyak Semantics: $h$, $R$, Probability, Loss

## Prompt

Canonical HerAI mempunyai:

$$
h(q,c)=0.6q+0.4c.
$$

Untuk latihan, course dapat membuat synthetic wrapper:

$$
R(q,c)=\left(h(q,c)-0.75\right)^2.
$$

Diskusikan:

1. mengapa $h$ tetap instructional score;
2. mengapa $R$ hanya synthetic Calculus function kecuali objective semantics didefinisikan lebih lanjut;
3. mengapa neither $h$ nor $R$ otomatis probability;
4. mengapa derivative/partial derivative mereka tidak menjadi causal effect;
5. apa yang diperlukan agar sebuah output layak disebut predicted probability;
6. apa yang diperlukan agar sebuah scalar function layak disebut production loss/objective;
7. bagaimana labels dan source/scope hygiene mencegah learner membuat AI claim berlebihan.

## Expected reasoning

Jawaban kuat membedakan:

- mathematical form;
- output semantics;
- probability semantics;
- objective/loss semantics;
- local derivative semantics;
- causal inference;
- production claim.

Sama-sama scalar tidak berarti dua functions mempunyai semantics yang sama.

## Safety boundary

Jangan menyimpulkan bahwa canonical HerAI menggunakan $R$ untuk training, bahwa $0.75$ adalah policy target, atau bahwa gradient component adalah causal importance.
