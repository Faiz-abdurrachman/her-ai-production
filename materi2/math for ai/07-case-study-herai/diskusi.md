# Diskusi Final Terintegrasi — Submodule 07
## Integrated Case Study: Math for AI di HerAI

> Exactly 2 substantive discussions. Jawaban tidak boleh opinion-only; gunakan evidence dan quantity semantics dari seluruh Submodule 07.

---

## Diskusi 1 — Apakah Bukti Ini Cukup untuk Launch?

### Prompt

Tim mempunyai:

- synthetic participant/material profiles;
- cosine matching scores;
- synthetic completion labels;
- training objective yang turun;
- 8-row synthetic held-out evaluation dengan accuracy $0.75$.

Bahas apakah evidence ini cukup untuk menyatakan sistem siap launch.

Wajib bahas:

- data provenance dan representativeness;
- score vs probability;
- target semantics;
- training vs evaluation;
- generalization;
- educational outcomes;
- fairness/risk/human judgment;
- documentation;
- production readiness boundary.

### Safety / boundary

Jangan memperlakukan exercise ini sebagai formal compliance certification atau actual deployment checklist.

---

## Diskusi 2 — Apa yang Sebaiknya Dioptimalkan HerAI?

### Prompt

Bayangkan goal bisnis/pendidikan adalah “membantu peserta belajar lebih efektif”. Toy model hanya memakai synthetic `completed_7d` sebagai target.

Bahas:

1. mengapa completion adalah proxy yang mungkin berguna tetapi tidak identik dengan learning effectiveness;
2. risiko objective mismatch;
3. hubungan mastery, retention, satisfaction, accessibility, fairness, dan completion;
4. mengapa menambah data tidak otomatis memperbaiki objective yang salah;
5. bagaimana mathematical objective, evaluation metrics, dan human/product goals seharusnya dibedakan;
6. apa yang boleh menjadi next research/design question tanpa mengklaim jawabannya sudah ada di Submodule 07.

### Safety / boundary

Tidak perlu mendesain full production objective atau causal experiment. Fokus pada problem framing dan evidence boundaries.
