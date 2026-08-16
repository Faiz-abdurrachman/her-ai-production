# Final Integrated Exercises — Submodule 06 Optimization

> **8 integrated open exercises.** Setiap item menggabungkan beberapa Topic dan menilai computation, update tracing, interpretation, misconception diagnosis, HerAI transfer, serta Optimization/generalization boundary.

---

# Latihan 1 — Dari Per-Example Loss ke Objective dan Metric

**Objective:** membedakan quantity yang dioptimalkan dari quantity yang dievaluasi, sambil menghitung aggregate objective.  
**Difficulty:** Intermediate  
**Coverage:** Topic 01, 08

Sebuah **synthetic training run** memiliki empat per-example losses:

$$
0.16,\qquad 0.04,\qquad 0.25,\qquad 0.09.
$$

Tim juga melaporkan validation accuracy sebesar $82\%$ dan product completion rate sebesar $68\%$.

## Tugas

1. Hitung aggregate training objective jika course convention memakai rata-rata per-example loss.
2. Identifikasi mana yang merupakan:
   - per-example loss;
   - aggregate training objective;
   - evaluation metric;
   - product/business metric.
3. Apakah validation accuracy harus dimasukkan ke formula training objective? Jelaskan.
4. Apakah product completion rate otomatis sama dengan evaluation metric model? Jelaskan.
5. Audit claim: “Training objective turun dari $0.20$ ke hasil perhitungan di atas, jadi validation accuracy pasti naik.”
6. Tulis satu kalimat yang academically safe untuk melaporkan hasil training tersebut.

---

# Latihan 2 — Minimization → Argmin → Satu Gradient Descent Update

**Objective:** menghubungkan minimization target, parameter choice, local gradient, dan one-step update tanpa mencampur nilai minimum dengan minimizer.  
**Difficulty:** Intermediate  
**Coverage:** Topic 02–03

Gunakan **synthetic objective**:

$$
J(w)=(w-2)^2.
$$

Candidate set:

$$
w\in\{-1,0,1,2,3\}.
$$

## Tugas

1. Hitung $J(w)$ untuk seluruh candidate.
2. Tentukan:
   - nilai minimum objective pada candidate set;
   - $\operatorname*{arg\,min}$ pada candidate set.
3. Hitung derivative $J'(w)$.
4. Mulai dari $w_0=0$ dan gunakan $\eta=0.25$. Hitung satu Gradient Descent update menjadi $w_1$.
5. Hitung $J(w_0)$ dan $J(w_1)$.
6. Jelaskan perbedaan:
   - gradient;
   - scaled gradient;
   - update/displacement;
   - next parameter state.
7. Apakah satu update ini membuktikan Gradient Descent selalu mencapai global minimum? Jelaskan.

---

# Latihan 3 — Learning Rate dan Dua Trajectory yang Berbeda

**Objective:** membandingkan parameter/objective trajectories di bawah learning rate berbeda dan mendiagnosis overclaim.  
**Difficulty:** Analyze  
**Coverage:** Topic 04–05

Gunakan:

$$
J(w)=(w-4)^2,
\qquad
J'(w)=2(w-4),
$$

dengan:

$$
w_0=0.
$$

Bandingkan dua learning rate:

$$
\eta_A=0.25,
\qquad
\eta_B=1.2.
$$

## Tugas

Untuk masing-masing learning rate:

1. hitung $w_1$;
2. hitung $J(w_1)$;
3. hitung gradient baru $J'(w_1)$;
4. hitung $w_2$;
5. hitung $J(w_2)$;
6. susun tabel trajectory $t,w_t,J(w_t)$ untuk $t=0,1,2$;
7. bandingkan perilaku kedua trajectory;
8. jelaskan mengapa “learning rate lebih besar selalu lebih cepat” salah;
9. jelaskan mengapa “learning rate sangat kecil selalu paling aman” juga bukan rule universal;
10. apakah objective wajib turun pada setiap update untuk semua problem? Jelaskan boundary yang aman.

---

# Latihan 4 — Full-Batch, Minibatch, dan Single-Example Gradient

**Objective:** menghitung beberapa gradient estimates dari state yang sama dan menjelaskan mengapa hasilnya dapat berbeda tanpa salah.  
**Difficulty:** Analyze  
**Coverage:** Topic 01, 06

Pada current scalar parameter:

$$
\theta_t=1,
$$

empat per-example gradient contributions adalah:

$$
g^{(1)}=2,\qquad
g^{(2)}=6,\qquad
g^{(3)}=-2,\qquad
g^{(4)}=10.
$$

Gunakan:

$$
\eta=0.1.
$$

## Tugas

1. Hitung full-batch gradient.
2. Hitung minibatch gradient untuk:
   - $\mathcal{B}_A=\{1,2\}$;
   - $\mathcal{B}_B=\{3,4\}$.
3. Hitung strict single-example gradient jika hanya example ke-3 dipakai.
4. Hitung next parameter untuk full-batch, minibatch A, minibatch B, dan single-example update.
5. Jelaskan mengapa minibatch gradient tidak harus sama dengan full-batch gradient.
6. Jelaskan mengapa “stochastic” tidak berarti gradient diganti dengan angka random yang tidak terkait data.
7. Jika full-batch gradient bernilai paling stabil pada state ini, apakah itu otomatis berarti full-batch training selalu “lebih baik”? Jelaskan.
8. Apakah perbedaan update tersebut sendiri membuktikan salah satu method generalize lebih baik? Jelaskan.

---

# Latihan 5 — Momentum Memory dan Adam Concept Map

**Objective:** membaca optimizer state secara manual dan membedakan Momentum dari Adam tanpa full derivation overload.  
**Difficulty:** Analyze  
**Coverage:** Topic 07

Gunakan convention course:

$$
u_t
=
\alpha u_{t-1}
-
\eta g_t,
$$

$$
\theta_t
=
\theta_{t-1}
+
u_t.
$$

Diberikan:

$$
\theta_0=0,\qquad
u_0=0,\qquad
\eta=0.1,\qquad
\alpha=0.5,
$$

dan gradient sequence:

$$
g_1=2,\qquad g_2=2,\qquad g_3=-2.
$$

## Tugas

1. Hitung $u_1,\theta_1$.
2. Hitung $u_2,\theta_2$.
3. Hitung $u_3,\theta_3$.
4. Pada step ke-3, jelaskan mengapa sign velocity tidak harus identik dengan sign gradient terbaru.
5. Bandingkan secara konseptual optimizer tanpa Momentum dengan Momentum: information apa yang tambahan disimpan?
6. Untuk Adam, sebutkan dua jenis historical state yang diperkenalkan di Topic 07 dan arti konseptualnya.
7. Mengapa “adaptive” pada Adam tidak berarti learning rate hilang atau tuning tidak diperlukan?
8. Mengapa hasil trace ini bukan bukti Momentum selalu lebih cepat daripada SGD atau Adam selalu lebih baik daripada keduanya?

---

# Latihan 6 — Regularized Objective dan Generalization Gap

**Objective:** membedakan perubahan objective karena regularization dari evidence generalization.  
**Difficulty:** Analyze  
**Coverage:** Topic 01, 08

Gunakan synthetic training objective:

$$
J_{\text{train}}(w)=(w-2)^2,
$$

dan regularized objective:

$$
J_{\text{reg}}(w)
=
(w-2)^2
+
0.5w^2.
$$

Bandingkan candidate:

$$
w_A=2,
\qquad
w_B=1.5.
$$

Selain itu, dua model menghasilkan:

| Model | Training quantity | Evaluation quantity |
|---|---:|---:|
| A | 0.05 | 0.24 |
| B | 0.08 | 0.14 |

## Tugas

1. Hitung $J_{\text{train}}$ dan $J_{\text{reg}}$ untuk $w_A$ dan $w_B$.
2. Candidate mana yang lebih baik menurut **training-fit term**?
3. Candidate mana yang lebih baik menurut **regularized objective**?
4. Jelaskan mengapa regularization berarti optimizer mengerjakan objective yang berbeda.
5. Hitung generalization/evaluation gap sederhana untuk Model A dan B menggunakan:
   $$
   G=J_{\text{eval}}-J_{\text{train}}.
   $$
6. Model mana yang mempunyai training quantity lebih rendah?
7. Model mana yang mempunyai evaluation quantity lebih rendah?
8. Jelaskan mengapa lower training quantity tidak otomatis berarti better unseen performance.
9. Apakah larger $\lambda$ selalu lebih baik? Jelaskan.
10. Mengapa regularization bukan optimizer?

---

# Latihan 7 — HerAI Synthetic Training Step tanpa Mengubah Canonical Score

**Objective:** mentransfer loss aggregation, minibatch/full-batch gradient, dan update ke HerAI sambil menjaga canonical score semantics.  
**Difficulty:** Advanced Beginner / Analyze  
**Coverage:** Topic 01, 03, 06, 08

Canonical score tetap:

$$
h(q,c)=0.6q+0.4c.
$$

Gunakan hanya Alya dan Bima:

$$
h_A=0.78,
\qquad
h_B=0.61.
$$

Untuk latihan Optimization saja, definisikan **SYNTHETIC / HYPOTHETICAL / INSTRUCTIONAL** scalar parameter $w_{\text{syn}}$ dan per-example loss:

$$
\ell^{(i)}(w_{\text{syn}})
=
(w_{\text{syn}}-h_i)^2.
$$

Mulai dari:

$$
w_0=0.50,
\qquad
\eta=0.20.
$$

## Tugas

1. Hitung $\ell^{(A)}(w_0)$ dan $\ell^{(B)}(w_0)$.
2. Hitung aggregate objective untuk dua example tersebut.
3. Hitung per-example gradients:
   $$
   \frac{d\ell^{(i)}}{dw_{\text{syn}}}
   =
   2(w_{\text{syn}}-h_i).
   $$
4. Hitung full-batch gradient.
5. Hitung $w_1$ dengan satu full-batch Gradient Descent update.
6. Jika hanya Alya dipakai sebagai single-example update pada state awal yang sama, berapa gradient dan next parameter-nya?
7. Jelaskan mengapa dua next parameters boleh berbeda.
8. Jelaskan mengapa:
   - $h_A$ dan $h_B$ tetap instructional scores;
   - $w_{\text{syn}}$ bukan production HerAI parameter;
   - loss ini bukan bukti canonical HerAI benar-benar ditraining dengan objective tersebut;
   - update ini bukan causal recommendation rule.
9. Sebutkan evaluation evidence tambahan yang masih dibutuhkan sebelum membuat claim tentang real-world recommendation quality.

---

# Latihan 8 — End-to-End Optimization Claim Audit

**Objective:** mengintegrasikan seluruh Submodule 06 dalam technical review yang menilai computation semantics dan boundary reasoning.  
**Difficulty:** Analyze  
**Coverage:** Topic 01–08

Sebuah draft dokumentasi menulis:

> “Loss, objective, evaluation metric, dan business metric pada dasarnya sama saja. `argmin` adalah nilai loss paling kecil. Gradient adalah update parameter. Karena negative gradient menunjuk downhill, Gradient Descent pasti menemukan global minimum. Learning rate besar selalu mempercepat training dan loss harus turun tiap step. Minibatch gradient yang berbeda dari full-batch berarti salah. SGD berarti batch size harus satu. Momentum menyelesaikan noisy gradients sehingga selalu lebih baik, sedangkan Adam otomatis memilih learning rate terbaik dan tidak perlu tuning. Regularization adalah optimizer untuk mencegah overfitting. Jika training loss paling rendah maka generalization pasti terbaik. Canonical HerAI score Citra 0.94 berarti probability 94%, sehingga $h(q,c)$ dapat dijadikan production loss dan weights 0.6/0.4 boleh dianggap learned causal importance.”

## Tugas

Audit minimal aspek berikut:

1. loss vs objective vs evaluation metric vs business/product metric;
2. `min` vs `argmin`;
3. gradient vs parameter update;
4. negative gradient vs global guarantee;
5. learning-rate overclaim;
6. monotonic-loss overclaim;
7. full-batch vs minibatch interpretation;
8. stochastic/SGD terminology;
9. Momentum guarantee;
10. Adam guarantee/tuning;
11. regularization vs optimizer;
12. training loss vs generalization;
13. HerAI score vs probability;
14. fixed score weights vs learned/causal importance;
15. tulis ulang draft menjadi satu paragraph yang academically safe dan cocok untuk learner beginner.
