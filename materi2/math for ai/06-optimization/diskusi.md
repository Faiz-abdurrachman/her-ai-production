# Final Integrated Discussions — Submodule 06 Optimization

> **Exactly 2 substantive discussions.** Keduanya menguji transfer reasoning, diagnosis, dan scope boundary—bukan opinion-only.

---

# Diskusi 1 — Training Objective Turun, Evaluation Memburuk: Apa yang Sebenarnya Terjadi?

## Prompt

Sebuah synthetic model ditraining selama beberapa iterasi. Tim menemukan:

- training objective terus turun;
- validation/evaluation loss mulai naik setelah beberapa titik;
- optimizer yang dipakai adalah Adam;
- seseorang menyimpulkan: “Adam gagal karena optimizer seharusnya menjamin generalization.”

Diskusikan:

1. apa yang sebenarnya dilakukan optimizer;
2. mengapa training objective dan evaluation quantity dapat bergerak berbeda;
3. mengapa lower training objective tidak cukup untuk menyatakan system lebih baik;
4. apakah mengganti Adam ke Momentum otomatis menyelesaikan masalah;
5. di mana regularization masuk sebagai bridge;
6. evidence/analysis apa yang perlu diperiksa sebelum memilih response;
7. mana yang masih menjadi scope Optimization foundation dan mana yang pindah ke Machine Learning;
8. tulis satu rekomendasi teknis yang tidak overclaim.

## Expected reasoning

Jawaban kuat mencakup:

- optimizer mengubah parameter terhadap objective yang diberikan;
- generalization/evaluation bukan quantity yang otomatis sama dengan training objective;
- optimizer choice tidak menjamin generalization;
- Momentum/Adam bukan solusi otomatis terhadap overfitting;
- regularization dapat mengubah learning problem/objective, tetapi tidak menjamin hasil unseen;
- validation/model selection/bias-variance/cross-validation depth adalah ML territory;
- diagnosis harus memisahkan optimization behavior, evaluation behavior, data split, objective choice, dan broader system metrics.

## Safety boundary

Jangan menyimpulkan bahwa Adam “buruk”, Momentum “lebih generalize”, atau regularization tertentu pasti menyelesaikan masalah tanpa evidence dan problem specification.

---

# Diskusi 2 — Mendesain Bahasa yang Aman untuk HerAI: Score, Loss, Objective, Metric, dan Product Goal

## Prompt

Canonical HerAI mempunyai:

$$
h(q,c)=0.6q+0.4c.
$$

Tim ingin membuat future trainable system dan berkata:

> “Karena $h$ sudah antara 0 dan 1, kita pakai saja sebagai probability sekaligus loss, lalu optimize supaya product completion naik.”

Diskusikan bagaimana kamu akan memperbaiki proposal tersebut dengan memisahkan:

1. instructional/ranking score;
2. target atau outcome yang ingin diprediksi;
3. per-example loss;
4. aggregate training objective;
5. evaluation metric;
6. product/business metric;
7. trainable parameters;
8. optimizer;
9. regularization bila relevan;
10. evidence generalization;
11. causal claim vs predictive/optimization claim;
12. hal yang masih harus didefinisikan sebelum system boleh disebut production-ready.

## Expected reasoning

Jawaban kuat menjelaskan bahwa bentuk numerik $0$–$1$ tidak otomatis memberi probability semantics. Production loss/objective memerlukan target, data contract, prediction semantics, parameterization, dan evaluation plan. Product completion adalah broader system metric dan tidak otomatis sama dengan objective. Optimizer hanyalah mechanism untuk mengubah trainable parameters terhadap objective. Regularization merupakan design choice tambahan, bukan guarantee. Causal claims memerlukan evidence/identification yang berbeda dari optimization.

## Safety boundary

Jangan menetapkan canonical weights $0.6/0.4$ sebagai learned production parameters, jangan membuat $h$ menjadi probability/loss secara diam-diam, dan jangan mengusulkan causal recommendation rule dari toy optimization.
