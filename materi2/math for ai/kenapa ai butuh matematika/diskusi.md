# Diskusi Submodul 01 — Kenapa AI Butuh Matematika? + Mathematical Readiness

> Diskusi dirancang untuk reasoning dan transfer. Tidak ada kewajiban menggunakan background programming atau matematika lanjut.

---

# Diskusi 1 — Seberapa Banyak Tentang Seseorang yang Boleh Menjadi Data?

## Tujuan

Menghubungkan representation literacy dengan real-world system design.

## Scenario

HerAI ingin membuat sistem next-best-learning recommendation.

Tim mengusulkan mengumpulkan:

- quiz ratio;
- completion ratio;
- study duration;
- math readiness;
- Python readiness;
- AI interest;
- lokasi rumah;
- tipe smartphone;
- warna favorit;
- data aktivitas belajar per session.

Seorang anggota tim berkata:

> “Semakin banyak data yang kita simpan, semakin bagus AI-nya.”

## Prompt Utama

Apakah kamu setuju? Bangun argumen yang membedakan:

1. informasi yang mungkin relevan terhadap learning decision;
2. informasi yang belum jelas relevansinya;
3. information loss jika representation terlalu sederhana;
4. cost/risk jika representation terlalu kaya;
5. apa yang perlu didefinisikan sebelum sebuah field dipakai sebagai feature.

## Guiding Questions

- Apa unit observation yang masuk akal?
- Apakah semua field harus menjadi feature?
- Apakah identifier perlu masuk model?
- Bagaimana memastikan `math_readiness` mempunyai definisi yang konsisten?
- Apa yang terjadi jika participant behavior berubah seiring waktu?
- Apakah lebih detail selalu lebih baik?
- Pertanyaan apa yang sebenarnya ingin dijawab sistem?

## Expected Reasoning Dimensions

Jawaban kuat biasanya menyentuh:

- representation is task-dependent;
- more data ≠ automatically better;
- relevance dan data quality;
- semantics dan measurement definition;
- temporal context;
- privacy/data minimization sebagai consideration sistem;
- distinction antara database utility dan model feature utility;
- need for evaluation, bukan assumption.

## Misconception / Safety Notes

Hindari:

- menganggap “data lengkap” berarti participant dipahami sepenuhnya;
- menganggap numerical coding otomatis meaningful;
- menganggap feature usefulness tanpa evaluation;
- menganggap learning behavior sebagai immutable trait.

## Lightweight Participation Rubric — 10 poin

- problem framing jelas: 2;
- minimal dua trade-offs: 3;
- menggunakan vocabulary submodul: 2;
- menghindari overclaim: 2;
- menanggapi satu ide peserta lain secara konstruktif: 1.

---

# Diskusi 2 — Ketika Angka Terlihat Meyakinkan

## Tujuan

Melatih peserta membedakan calculation correctness dari interpretation correctness.

## Scenario

Dashboard internal HerAI menampilkan:

- Completion Alya: $75\%$
- Toy score: $0.78$
- Graph study duration vs quiz score: increasing
- Mean preview quiz ratio: $0.75$

Seorang stakeholder berkata:

> “Angkanya konsisten. Jadi peluang Alya berhasil sekitar 78%, study time menyebabkan performa naik, dan rata-rata peserta pasti menguasai 75% materi.”

## Prompt Utama

Audit kalimat tersebut.

Pisahkan:

1. apa yang secara matematis memang dihitung;
2. apa semantics masing-masing number;
3. klaim apa yang didukung;
4. klaim apa yang membutuhkan evidence tambahan.

## Guiding Questions

- Apa arti completion $75\%$?
- Apakah toy score $0.78$ telah didefinisikan sebagai probability?
- Apa bedanya score, probability, dan accuracy?
- Apakah graph increasing cukup untuk causal claim?
- Apa sebenarnya yang dirata-ratakan oleh $0.75$?
- Bagaimana denominator atau sample size dapat mengubah interpretation?
- Kalau sebuah formula mathematically valid, apakah otomatis menjadi valid production model?

## Expected Reasoning Dimensions

Jawaban kuat harus menunjukkan:

- format numerik ≠ semantics;
- weighted score ≠ probability;
- graph association ≠ causation;
- mean quantity harus disebutkan secara eksplisit;
- small/toy dataset tidak mendukung broad generalization;
- model validity memerlukan evaluation dan task definition.

## Optional Extension

Buat ulang dashboard tersebut dengan labels yang lebih aman.

Contoh label yang lebih aman:

- `Completion ratio`
- `Toy instructional score`
- `Observed association`
- `Mean quiz ratio in toy sample`

Bukan:

- `Success probability`
- `AI confidence`
- `Causal effect`

kecuali memang ada methodology yang mendukungnya.

## Lightweight Participation Rubric — 10 poin

- minimal tiga semantic corrections: 3;
- mathematical reasoning: 2;
- AI/ML conceptual safety: 2;
- alternative wording/dashboard label: 2;
- clarity: 1.
