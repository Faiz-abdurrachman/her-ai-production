# Final Integrated Discussions — Submodule 03 Statistics for AI

---

# Diskusi 1 — Dashboard HerAI dan Batas Klaim

## Skenario

Dashboard internal menampilkan:

- mean quiz ratio;
- histogram duration;
- 75th percentile completion;
- potential-outlier flags;
- quiz-duration correlation;
- label-frequency summary.

Product owner ingin menambahkan headline:

> **“Data membuktikan participant yang belajar lebih lama akan sukses, dan records yang berada di luar pola normal harus dibuang.”**

## Prompt

Audit headline dan desain dashboard.

Bahas minimal:

1. descriptive vs causal language;
2. observed distribution vs probability distribution;
3. percentile vs percentage;
4. outlier flag vs error;
5. correlation vs causation;
6. small-$n$ limitation;
7. data quality checks sebelum conclusions;
8. wording UI yang lebih bertanggung jawab;
9. statistic mana yang sebaiknya ditemani visualization/context;
10. information tambahan yang diperlukan untuk keputusan produk.

## Expected Direction

Dashboard boleh merangkum observed data, tetapi tidak boleh mengubah descriptive statistics menjadi causal/probabilistic/production claims. Potential outliers perlu investigation, dan small canonical cohort sangat membatasi generalization.

---

# Diskusi 2 — “Clean, Normalize, Train”

## Skenario

Tim mengusulkan pipeline:

> `fill missing with 0 → delete outliers → deduplicate participant names → normalize all digit columns → train`

## Prompt

Evaluasi pipeline tersebut dari awal sampai akhir.

Bahas minimal:

1. observational unit;
2. missing vs zero;
3. outlier vs verified error;
4. duplicate vs repeated entity;
5. numerical quantity vs numeric category/identifier;
6. unit consistency;
7. scale normalization;
8. target class imbalance;
9. association checks;
10. documentation/provenance;
11. bagaimana keputusan preprocessing dapat mengubah distribution/statistics;
12. apa yang masih harus diuji sebelum production AI.

## Expected Direction

Tidak ada blanket cleaning rule yang menggantikan semantic audit. Pipeline seharusnya dimulai dari schema/meaning/provenance, lalu setiap transformation didokumentasikan dan dievaluasi terhadap use case.
