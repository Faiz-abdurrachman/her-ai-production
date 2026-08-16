# Final Integrated Discussions — Submodule 04 Probability

> **2 substantive discussions**. Jawaban harus menghubungkan mathematical semantics dengan AI interpretation.

---

# Diskusi 1 — Kapan Sebuah “Risk Score” Boleh Disebut Probability?

Sebuah hypothetical HerAI system menghasilkan risk score $s\in[0,1]$ untuk setiap session. Product team ingin mengganti label menjadi:

> `Probability learner membutuhkan bantuan`

Diskusikan:

1. apa yang harus didefinisikan tentang event/target, observational unit, dan horizon;
2. apa perbedaan score $s$ dan predicted probability $\hat p$;
3. bagaimana training/model semantics dapat memberi intended probability interpretation;
4. bagaimana calibration harus dievaluasi;
5. mengapa calibration bukan accuracy atau certainty;
6. bagaimana conditional probability dan base rate dapat memengaruhi interpretation;
7. wording UI apa yang aman pada tiga stage: score-only, probability-intended, calibrated-probability evaluated.

**Safety boundary:** jangan manufacture probability dari canonical $h(q,c)$ atau n=4 participants.

---

# Diskusi 2 — Dari Evidence ke Decision: Apa yang Boleh dan Tidak Boleh Disimpulkan?

Sebuah synthetic model mempunyai prior event $H$, signal $D$, posterior $P(H\mid D)$, dan expected support demand $E[X]$. Tim kemudian ingin mengatakan:

> “Signal menyebabkan learner membutuhkan bantuan, posterior adalah certainty, dan expected support demand adalah jumlah yang pasti terjadi.”

Diskusikan:

1. Bayes sebagai update, bukan causal proof;
2. posterior sebagai uncertainty, bukan certainty;
3. expected value sebagai weighted average, bukan guaranteed realized value;
4. independence/dependence vs causality;
5. bagaimana calibration memengaruhi trust pada probability levels;
6. bagaimana probabilistic loss menilai predictions tanpa menjadi probability itu sendiri;
7. keputusan operasional apa yang masih membutuhkan non-mathematical context (capacity, cost, fairness, intervention policy).

**Safety boundary:** mathematical model output tidak otomatis menentukan kebijakan atau causal intervention.
