# Topic 06 — Bayes sebagai Update Keyakinan

> **Submodule 04 — Probability: Menalar Ketidakpastian dalam AI**  
> **Filename:** `06-bayes-sebagai-update-keyakinan.md`  
> **Level:** Beginner → Beginner-Intermediate  
> **Prasyarat:** Topic 01–05 selesai  
> **Forward dependency:** Topic 07 — Random Variable, Distribution, dan Expected Value  
> **Boundary:** finite/discrete beginner Bayes only. Belum membahas conjugate priors, continuous Bayesian inference, MCMC, odds form, parameter likelihood functions, posterior predictive derivation, random variables, expected value, calibration, logits, cross-entropy, gradient, backprop, atau optimization.

---

# 1. Hook — Evidence Baru Tidak Boleh Menghapus Base Rate

Bayangkan sebuah **synthetic HerAI probability model** untuk hypothetical learning sessions.

Definisikan:

- $H$: session berada pada keadaan **needs-review** dalam model;
- $D$: checkpoint menghasilkan **review signal**.

Dari 100 hypothetical sessions:

- 20 berada dalam $H$;
- 80 berada dalam $H^c$.

Sebelum melihat signal:

$$
P(H)=0.20.
$$

Sekarang misalkan:

$$
P(D\mid H)=0.75.
$$

Seorang learner berkata:

> “Kalau signal muncul pada 75% needs-review sessions, maka kalau signal muncul probability needs-review juga 75%.”

Belum tentu.

Kalimat itu menukar:

$$
P(D\mid H)
$$

dengan:

$$
P(H\mid D).
$$

Bayes membantu menjawab:

> setelah evidence $D$ muncul, bagaimana probability $H$ diperbarui?

Tetapi kita **tidak mulai dari formula**. Kita mulai dari counts.

---

# 2. Learning Objectives

Setelah topic ini, learner mampu:

- **I can identify** prior, evidence, likelihood term, dan posterior.
- **I can distinguish** $P(D\mid H)$ dari $P(H\mid D)$.
- **I can update** probability menggunakan natural counts/two-way table.
- **I can use** Bayes formula untuk finite/discrete case.
- **I can explain** mengapa base rate memengaruhi posterior.
- **I can explain** mengapa likelihood term bukan posterior.
- **I can analyze** perubahan posterior ketika prior berubah.
- **I can avoid** posterior=certainty dan Bayes=causality.
- **I can keep** canonical HerAI ratios/scores terpisah dari Bayesian probabilities.

---

# 3. Recall — Conditional Probability Tidak Simetris

Topic 04 mengajarkan:

$$
P(A\mid B)
=
\frac{P(A\cap B)}{P(B)}.
$$

Untuk Bayes kita memakai notation yang lebih bermakna:

- $H$ = hypothesis/event of interest;
- $D$ = observed data/evidence.

Dua conditional yang sering tertukar:

$$
P(D\mid H)
$$

dan:

$$
P(H\mid D).
$$

Mereka tidak otomatis sama. MIT 18.05 secara eksplisit memperingatkan bahwa conditional reversal adalah kesalahan umum. [R1]

---

# 4. Predict — Jangan Hitung Dulu

Gunakan synthetic model berikut.

Dari **100 hypothetical sessions**:

- 20 adalah $H$;
- 80 adalah $H^c$;
- dari 20 sessions dalam $H$, 15 menghasilkan $D$;
- dari 80 sessions dalam $H^c$, 20 menghasilkan $D$.

Prediksi:

1. Apakah $P(H\mid D)$ sama dengan 0.75?
2. Di antara semua sessions dengan $D$, apakah mayoritas pasti berasal dari $H$?
3. Apakah prior 20/100 masih penting setelah $D$ muncul?
4. Jika base rate $H$ turun tetapi signal behavior tetap, apakah posterior tetap sama?

---

# 5. Explore with Natural Counts — Filter Evidence Dulu

> **Label:** synthetic/hypothetical instructional probability model.  
> **Unit:** satu hypothetical HerAI learning session.  
> **Bukan:** actual participant data, production classifier, calibrated model, atau causal evidence.

| Session state | Signal $D$ | No signal $D^c$ | Total |
|---|---:|---:|---:|
| Needs-review $H$ | 15 | 5 | 20 |
| $H^c$ | 20 | 60 | 80 |
| **Total** | **35** | **65** | **100** |

Sebelum evidence:

$$
P(H)
=
\frac{20}{100}
=
0.20.
$$

Sekarang filter ke cases dengan $D$:

- 15 dari $H$;
- 20 dari $H^c$;
- total 35.

Maka:

$$
P(H\mid D)
=
\frac{15}{35}
\approx
0.429.
$$

Bandingkan:

$$
P(D\mid H)
=
\frac{15}{20}
=
0.75.
$$

Jadi:

$$
P(H\mid D)\ne P(D\mid H).
$$

Numerator count 15 sama, tetapi denominator dan pertanyaannya berbeda.

---

# 6. Natural Frequencies sebagai Jembatan

Counts seperti:

> “15 dari 20 needs-review sessions menghasilkan signal; 20 dari 80 non-needs-review sessions juga menghasilkan signal”

membuat struktur subset lebih terlihat.

Hoffrage, Gigerenzer, Krauss, dan Martignon membahas evidence bahwa natural-frequency representations dapat memfasilitasi Bayesian reasoning pada studied tasks dibanding conditional-probability representation tertentu. [R3]

Di HerAI, counts dipakai sebagai pedagogical bridge:

1. lihat prior groups;
2. lihat evidence di setiap group;
3. gabungkan semua cases dengan evidence;
4. hitung posterior;
5. baru map ke formula.

Counts di sini tetap berasal dari **stipulated synthetic probability setup**, bukan otomatis empirical probability universal.

---

# 7. Formal Language — Prior, Evidence, Likelihood, Posterior

## Hypothesis / event

$$
H
$$

adalah event/hypothesis yang probability-nya ingin di-update.

## Evidence

$$
D
$$

adalah evidence yang diamati.

## Prior

$$
P(H)
$$

adalah probability $H$ **sebelum current evidence $D$ dimasukkan**.

Example:

$$
P(H)=0.20.
$$

## Likelihood term

$$
P(D\mid H)
$$

adalah probability evidence $D$ under $H$ dalam stated model.

Example:

$$
P(D\mid H)=0.75.
$$

Likelihood term **bukan** posterior.

## Posterior

$$
P(H\mid D)
$$

adalah updated probability $H$ setelah $D$ dimasukkan.

Example:

$$
P(H\mid D)\approx0.429.
$$

MIT Bayesian Updating memisahkan prior, likelihood, Bayes numerator, dan posterior secara eksplisit dalam Bayes table. [R2]

---

# 8. Step-by-Step Bayes Table

| Hypothesis | Prior | Likelihood | Bayes numerator | Posterior |
|---|---:|---:|---:|---:|
| $H$ | 0.20 | 0.75 | 0.15 | $0.15/0.35\approx0.429$ |
| $H^c$ | 0.80 | 0.25 | 0.20 | $0.20/0.35\approx0.571$ |
| **Total** | 1.00 | — | **0.35** | 1.00 |

Baris $H$:

$$
P(D\mid H)P(H)
=
0.75\times0.20
=
0.15.
$$

Baris $H^c$:

$$
P(D\mid H^c)P(H^c)
=
0.25\times0.80
=
0.20.
$$

Total evidence probability:

$$
P(D)=0.15+0.20=0.35.
$$

Posterior:

$$
P(H\mid D)
=
\frac{0.15}{0.35}
\approx0.429.
$$

---

# 9. Bayes Formula — Baru Sekarang Simboliknya

$$
\boxed{
P(H\mid D)
=
\frac{P(D\mid H)P(H)}{P(D)}
}
$$

MIT menunjukkan Bayes sebagai relasi untuk membalik arah conditional dengan tetap memasukkan prior/marginal terms. [R1]

---

# 10. Math Reading Skill

Perhatikan:

$$
P(H\mid D)
=
\frac{P(D\mid H)P(H)}{P(D)}.
$$

## Output

$$
P(H\mid D)
$$

= posterior, updated probability setelah evidence.

## Prior

$$
P(H)
$$

= starting probability sebelum current evidence.

## Likelihood term

$$
P(D\mid H)
$$

= probability evidence under $H$.

## Numerator

$$
P(D\mid H)P(H)
=
P(H\cap D).
$$

## Denominator

$$
P(D)
$$

= total probability evidence.

Dalam binary example:

$$
P(D)
=
P(D\mid H)P(H)
+
P(D\mid H^c)P(H^c).
$$

Expression ini dipakai sebagai **binary Bayes denominator bridge**, bukan sebagai general partition theorem unit.

## Formula ini tidak berarti

- likelihood = posterior;
- posterior selalu lebih besar dari prior;
- posterior = certainty;
- base rate boleh diabaikan;
- Bayes membuktikan causality;
- arbitrary score di $[0,1]$ otomatis probability.

---

# 11. Worked Example 1 — Basic Box Model

Dua hypothetical boxes:

- $H$: Box H dipilih;
- $H^c$: Box C dipilih.

Model:

$$
P(H)=0.30,
\qquad
P(H^c)=0.70.
$$

Evidence $D$ = item merah terambil.

Suppose:

$$
P(D\mid H)=0.80,
\qquad
P(D\mid H^c)=0.20.
$$

Evidence probability:

$$
P(D)
=
0.80(0.30)+0.20(0.70)
=
0.38.
$$

Bayes numerator:

$$
0.80(0.30)=0.24.
$$

Posterior:

$$
P(H\mid D)
=
\frac{0.24}{0.38}
\approx0.632.
$$

Interpretasi:

> setelah item merah diamati, probability Box H berubah dari prior 0.30 menjadi posterior sekitar 0.632 dalam model ini.

Bukan: “Box H pasti dipilih.”

---

# 12. Worked Example 2 — HerAI Synthetic Update

Kembali ke synthetic session model:

$$
P(H)=0.20,
$$

$$
P(D\mid H)=0.75,
$$

$$
P(H^c)=0.80,
$$

$$
P(D\mid H^c)=0.25.
$$

Evidence probability:

$$
P(D)
=
0.75(0.20)
+
0.25(0.80)
=
0.35.
$$

Posterior:

$$
P(H\mid D)
=
\frac{0.75(0.20)}{0.35}
=
\frac{0.15}{0.35}
\approx0.429.
$$

Interpretasi aman:

> Dalam synthetic model ini, setelah review signal muncul, probability needs-review state diperbarui dari 0.20 menjadi sekitar 0.429.

Tidak aman:

> “Signal membuktikan learner membutuhkan review.”

---

# 13. Change One Thing — Hold Likelihood Fixed, Change Prior

Pertahankan:

$$
P(D\mid H)=0.75,
$$

$$
P(D\mid H^c)=0.25.
$$

Ubah prior:

$$
P(H)=0.05,
\qquad
P(H^c)=0.95.
$$

Maka:

$$
P(D)
=
0.75(0.05)
+
0.25(0.95)
=
0.275.
$$

Posterior:

$$
P(H\mid D)
=
\frac{0.0375}{0.275}
\approx0.136.
$$

Bandingkan:

- prior 0.20 → posterior $\approx0.429$;
- prior 0.05 → posterior $\approx0.136$.

Likelihood terms tetap.

Yang berubah adalah **base rate/prior**.

MIT membahas base-rate fallacy sebagai akibat penting dari conditional-direction confusion dan pengabaian base rate. [R1]

---

# 14. Prior Harus Punya Asal yang Jelas

Prior berarti:

> probability yang dipakai sebelum current evidence $D$.

Prior dapat berasal dari stated model setup, domain assumption, historical analysis, atau estimation procedure yang dijelaskan.

Yang penting:

- sumbernya transparan;
- bukan angka magis;
- jika stipulated untuk latihan, dilabel synthetic;
- mengubah prior dapat mengubah posterior.

Topic ini **tidak** mengestimasi prior production dari empat canonical participants.

---

# 15. Likelihood Term Bukan Posterior

Misalkan:

$$
P(D\mid H)=0.90.
$$

Ini berarti:

> evidence $D$ sangat common jika $H$ berlaku dalam model.

Itu tidak sama dengan:

> setelah melihat $D$, probability $H$ adalah 0.90.

Untuk memperoleh:

$$
P(H\mid D),
$$

kita membutuhkan prior dan evidence behavior across relevant alternatives.

---

# 16. Base-Rate Neglect Challenge

Analyst A:

> “Signal muncul pada 75% needs-review sessions, jadi signal berarti 75% chance needs-review.”

Analyst B:

> “Kita perlu base rate needs-review dan bagaimana signal muncul pada non-needs-review sessions.”

Reasoning yang lebih aman adalah **Analyst B**.

Posterior membutuhkan evidence context across alternatives.

---

# 17. Persistent HerAI Continuity

Canonical observed data tetap:

| Peserta | Quiz ratio $q$ | Completion ratio $c$ | Study duration $t$ |
|---|---:|---:|---:|
| Alya | 0.80 | 0.75 | 45 menit |
| Bima | 0.60 | 0.625 | 30 menit |
| Citra | 0.90 | 1.00 | 55 menit |
| Dewi | 0.70 | 0.50 | 40 menit |

Old instructional score:

$$
h(q,c)=0.6q+0.4c.
$$

Scores:

- Alya 0.78;
- Bima 0.61;
- Citra 0.94;
- Dewi 0.62.

Topic 06 **tidak** mengubah angka itu menjadi:

- prior;
- likelihood;
- posterior;
- probability of success;
- confidence.

Salah:

> “Citra score 0.94, jadi prior success 94%.”

Salah:

> “Alya $q=0.80$, jadi likelihood evidence 0.80.”

Bayesian example memakai **separate synthetic session model**.

---

# 18. Why This Matters in AI

Bayesian reasoning memberi language:

- starting probability;
- evidence;
- evidence compatibility under hypotheses;
- updated probability.

Tetapi AI/system documentation tetap harus menjelaskan:

- apa $H$;
- apa $D$;
- sumber prior;
- likelihood under alternatives;
- bagaimana denominator diperoleh;
- apakah angka benar-benar probabilities.

Formula benar tidak menyelamatkan event definition yang ambiguous.

---

# 19. Misconception Challenge

## 1. $P(H\mid D)=P(D\mid H)$

Salah. Arah condition berbeda.

## 2. Likelihood = posterior

Salah.

$$
P(D\mid H)
$$

bukan:

$$
P(H\mid D).
$$

## 3. Bayes mengabaikan base rate

Salah. Prior/base rate memengaruhi posterior.

## 4. High likelihood = high posterior

Belum tentu. Prior dan alternatives juga penting.

## 5. Posterior 0.9 = certainty

Salah. 0.9 masih probability.

## 6. Bayes = causality

Salah. Bayes melakukan probability update dalam model.

## 7. Score 0.94 boleh dipakai sebagai prior karena ada di $[0,1]$

Salah. Range alone tidak memberi probability semantics.

---

# 20. Try It Yourself

## Try 1 — Natural counts

Dari 200 synthetic sessions:

- 40 termasuk $H$;
- 160 termasuk $H^c$;
- 30 dari $H$ menghasilkan $D$;
- 32 dari $H^c$ menghasilkan $D$.

Cari:

1. total $D$;
2. $P(H\mid D)$ dari counts;
3. $P(D\mid H)$;
4. mengapa kedua conditional berbeda.

## Try 2 — Symbolic Bayes

Diberikan:

$$
P(H)=0.40,
$$

$$
P(D\mid H)=0.70,
$$

$$
P(D\mid H^c)=0.20.
$$

Hitung $P(H^c)$, $P(D)$, dan $P(H\mid D)$.

## Try 3 — Reversal diagnosis

Seseorang berkata:

> “$P(D\mid H)=0.85$, sehingga $P(H\mid D)=0.85$.”

Sebutkan informasi yang masih kurang.

## Try 4 — Canonical safety

Seseorang berkata:

> “Citra score 0.94 adalah prior dan completion ratio 1.00 adalah likelihood.”

Temukan minimal tiga semantic errors.

---

# 21. Visual / Interactive Specification

## [STEP-BY-STEP REVEAL] Prior → Evidence → Posterior

**Purpose:** menunjukkan bahwa posterior berasal dari filtering/updating yang tetap mempertahankan base rate.

**Initial state/data:**

- 100 synthetic sessions;
- $H$: 20;
- $H^c$: 80;
- $D$ among $H$: 15;
- $D$ among $H^c$: 20.

**Learner action:**

1. `Show prior`;
2. `Reveal evidence rates`;
3. `Filter to D`;
4. `Label likelihood`;
5. `Reveal posterior`;
6. `Show Bayes formula`;
7. optionally change `Prior P(H)` while keeping likelihood terms fixed.

**Expected behavior:**

- prior groups terlihat dulu;
- evidence membagi masing-masing group;
- non-$D$ cases memudar saat filter;
- 15 dari 35 evidence cases terlihat sebagai posterior count;
- symbolic Bayes muncul setelah count reasoning;
- changing prior updates posterior.

**Feedback:**

- `Prior = starting probability before current evidence.`
- `Likelihood term is P(D|H), not P(H|D).`
- `Posterior uses all cases consistent with evidence D.`
- `Changing base rate can change posterior.`

**Safety note:**

- all numbers synthetic/stipulated;
- bukan actual HerAI participant evidence;
- posterior bukan certainty;
- visual tidak mengklaim causality;
- $q,c,t,h$ tidak digunakan sebagai Bayesian probabilities.

---

# 22. Checkpoint

1. Apa prior?
2. Apa evidence?
3. Apa likelihood term?
4. Apa posterior?
5. Mengapa $P(D\mid H)$ bukan $P(H\mid D)$?
6. Mengapa base rate penting?
7. Bagaimana natural counts membantu?
8. Apa Bayes formula?
9. Apakah posterior selalu naik?
10. Apakah posterior 0.8 berarti pasti?
11. Apakah $h=0.94$ boleh otomatis menjadi prior?
12. Apa arti denominator $P(D)$?

---

# 23. Mastery Check — “I Can”

- [ ] **I can** membedakan prior dan posterior.
- [ ] **I can** membedakan likelihood term dan posterior.
- [ ] **I can** membaca natural-count Bayes table.
- [ ] **I can** menghitung posterior dari counts.
- [ ] **I can** memakai Bayes formula pada binary finite case.
- [ ] **I can** menjelaskan $P(D)$.
- [ ] **I can** menjelaskan base-rate effect.
- [ ] **I can** menolak conditional reversal.
- [ ] **I can** menghindari posterior=certainty.
- [ ] **I can** menjaga canonical ratios/scores terpisah dari Bayesian probabilities.
- [ ] **I can** menjelaskan Bayes tidak otomatis causal.

---

# 24. Scope Boundary

Belum dibahas:

- odds form;
- likelihood sebagai function of parameter;
- continuous priors;
- conjugate priors;
- Bayesian parameter estimation;
- MCMC;
- posterior predictive derivation;
- Bayesian networks;
- Naive Bayes;
- random variables;
- expected value;
- named distributions;
- calibration;
- logits;
- cross-entropy;
- gradients;
- backprop;
- optimization.

Kita juga tidak memakai sensitive medical diagnostic example sebagai learner core.

---

# 25. Summary

1. prior $P(H)$ = probability sebelum current evidence;
2. evidence $D$ = informasi yang diamati;
3. likelihood term $P(D\mid H)$ = evidence probability under $H$;
4. posterior $P(H\mid D)$ = updated probability;
5. natural counts membuat subset structure terlihat;
6. Bayes:

$$
P(H\mid D)
=
\frac{P(D\mid H)P(H)}{P(D)};
$$

7. conditional reversal tidak valid;
8. base rate memengaruhi posterior;
9. high likelihood tidak otomatis high posterior;
10. posterior bukan certainty;
11. canonical $q,c,t,h$ tidak direlabel menjadi Bayesian probabilities;
12. Bayes tidak membuktikan causality.

---

# 26. Bridge to Topic 07

Sampai Topic 06, pertanyaan probability banyak berbentuk:

> apakah event/hypothesis tertentu terjadi?

Topic 07 akan mengubah pertanyaan:

> bagaimana jika outcome probabilistik dipetakan menjadi nilai numerik?

Kita akan membahas random variable, distribution, dan expected value **setelah Topic 06 disetujui**.

---

# References Used

Markers `[R1]`, `[R2]`, `[R3]` mengacu ke `referensi-topic-06.md`.
