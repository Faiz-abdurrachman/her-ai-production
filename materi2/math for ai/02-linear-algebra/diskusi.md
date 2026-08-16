# Diskusi Submodul 02 — Linear Algebra: Representasi Data, Vektor, dan Matriks

> **Jenis:** Final discussion assessment  
> **Jumlah:** 2 prompt  
> **Fokus:** metric choice, semantic safety, representation design, decision interpretation

---

# Diskusi 1 — Similarity Tinggi, Apakah Itu Berarti Rekomendasi Terbaik?

## Tujuan

Menguji kemampuan peserta membedakan:

- representation similarity;
- distance;
- dot product;
- cosine similarity;
- probability;
- final recommendation decision.

## Scenario

HerAI membuat participant-need vector dan material-support vector pada shared feature axes.

Untuk satu material, sistem menghasilkan:

$$
\operatorname{cos\_sim}(\mathbf{n},\mathbf{s})=0.96.
$$

Seorang anggota tim kemudian mengatakan:

> “Berarti ada 96% kemungkinan material ini cocok dan kita tinggal merekomendasikannya.”

Anggota lain menjawab:

> “Belum tentu. Cosine hanya salah satu similarity measure pada representation tertentu.”

## Prompt Utama

Siapa yang reasoning-nya lebih kuat?

Jelaskan apa yang **boleh** dan **tidak boleh** disimpulkan dari cosine similarity tinggi.

Kemudian jelaskan informasi tambahan apa yang kamu perlukan sebelum menjadikan similarity tersebut bagian dari recommendation decision.

## Guiding Questions

1. Apa yang sebenarnya dibandingkan oleh cosine similarity?
2. Apa peran vector direction dan magnitude?
3. Mengapa cosine $0.96$ bukan otomatis probability $96\%$?
4. Apakah high cosine membuktikan causation?
5. Apakah material dengan cosine tertinggi selalu paling sesuai untuk learner?
6. Bagaimana feature choice memengaruhi similarity?
7. Apa yang terjadi jika feature order salah?
8. Bagaimana zero vector memengaruhi computation?
9. Kapan Euclidean distance dapat menjawab pertanyaan yang berbeda?
10. Apa bedanya ranking signal dan final decision?

## Expected Reasoning Dimensions

Respons kuat membahas:

- cosine sebagai normalized directional alignment;
- representation-space dependency;
- feature semantics dan order;
- standard mathematical zero-vector restriction;
- similarity ≠ probability;
- similarity ≠ causality;
- similarity ≠ guaranteed educational outcome;
- metric choice sebagai design decision;
- recommendation membutuhkan policy/criteria tambahan;
- evaluation nyata tetap diperlukan sebelum production claim.

## Misconception / Safety Notes

Jangan menerima jawaban yang:

- mengubah cosine langsung menjadi percentage probability;
- menyatakan cosine tertinggi pasti material terbaik;
- mengabaikan representation definition;
- menganggap metric mathematically valid berarti production system tervalidasi.

## Lightweight Participation Rubric — 10 poin

- mathematical meaning cosine: 2
- probability/causality safety: 2
- representation/schema reasoning: 2
- metric/decision distinction: 2
- clarity and communication: 2

---

# Diskusi 2 — Shape Benar, Apakah Pipeline Sudah Benar?

## Tujuan

Menguji integrated reasoning dari vector/matrix representation sampai matrix output.

## Scenario

Tim HerAI memiliki:

$$
\mathbf{X}\in\mathbb{R}^{100\times5}
$$

dan:

$$
\mathbf{W}\in\mathbb{R}^{5\times3}.
$$

Mereka menghitung:

$$
\mathbf{Y}=\mathbf{X}\mathbf{W}
$$

sehingga:

$$
\mathbf{Y}\in\mathbb{R}^{100\times3}.
$$

Semua shape valid dan software tidak menghasilkan error.

Namun dokumentasi feature order $\mathbf{X}$ tidak lengkap, unit beberapa columns berbeda jauh, dan arti tiga output columns $\mathbf{Y}$ belum disepakati.

Salah satu engineer mengatakan:

> “Karena matrix multiplication berhasil dan output shape benar, pipeline kita mathematically dan conceptually aman.”

## Prompt Utama

Evaluasi pernyataan tersebut.

Pisahkan jawaban menjadi tiga layer:

1. **mathematical validity**;
2. **representation/semantic validity**;
3. **AI/product interpretation validity**.

## Guiding Questions

1. Apa yang dibuktikan oleh inner-dimension compatibility?
2. Apa yang tidak dibuktikan oleh shape compatibility?
3. Mengapa feature order perlu didokumentasikan?
4. Apa risiko unit/scale berbeda?
5. Mengapa output column semantics harus didefinisikan?
6. Apakah matrix multiplication output otomatis prediction?
7. Apakah output pada range $0$–$1$ otomatis probability?
8. Bagaimana cara mengaudit pipeline sebelum production claim?
9. Konsep Topic 01–08 mana saja yang relevan?
10. Apa peran human/domain decision dalam menetapkan meaning?

## Expected Reasoning Dimensions

Respons kuat menyatakan:

- $(100\times5)(5\times3)$ valid secara shape dan menghasilkan $100\times3$;
- shape validity tidak memastikan row/column semantics benar;
- inconsistent feature order dapat membuat silent computation error;
- unit/scale dapat memengaruhi downstream geometry/weights;
- $\mathbf{W}$ harus mempunyai input/output semantics yang didefinisikan;
- output matrix tidak otomatis prediction/probability;
- software success bukan academic/model validation;
- pipeline perlu schema contract, unit/scale audit, output definition, evaluation, dan interpretation policy.

## Optional Extension

Diskusikan mengapa dua systems dapat menggunakan formula Linear Algebra yang sama tetapi mempunyai kualitas AI yang sangat berbeda karena:

- feature representation;
- data quality;
- parameter choice;
- objective;
- evaluation;
- domain assumptions.

## Lightweight Participation Rubric — 10 poin

- mathematical shape reasoning: 2
- semantic/schema reasoning: 2
- scale/representation audit: 2
- AI output interpretation: 2
- integrated communication: 2
