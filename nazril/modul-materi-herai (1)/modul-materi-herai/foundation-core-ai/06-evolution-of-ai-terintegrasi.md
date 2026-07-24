---
course_id: evolution-of-ai
title: Evolution of AI
slug: evolution-of-ai
category: Foundation and Core AI
level: Intermediate
language: id
status: revised-integrated
version: 2.0.0
estimated_duration: 7-8 jam
previous_module: evaluation-ai
next_module: deep-learning
study_case: Asisten Pembelajaran HerAI
updated_at: 2026-07-23
---

# Evolution of AI

## Tentang Modul Ini

Modul ini tidak hanya menceritakan sejarah AI. Tujuannya adalah memahami **mengapa paradigma baru muncul**, masalah apa yang diselesaikannya, masalah apa yang tetap belum selesai, dan bagaimana cara mengevaluasinya.

Modul sebelumnya, **Evaluation AI**, menghasilkan AI Evaluation Plan. Di modul ini, kerangka tersebut dipakai kembali untuk membandingkan symbolic AI, machine learning, reinforcement learning, model generatif, diffusion, Transformer, LLM, dan hybrid AI.

### Studi kasus yang dilanjutkan

Kita tetap menggunakan **Asisten Pembelajaran HerAI**. Sistem ini akan dibangun sedikit demi sedikit:

1. aturan digunakan untuk kebijakan yang pasti;
2. machine learning digunakan untuk mengenali pola;
3. reinforcement learning dipertimbangkan untuk keputusan berurutan;
4. model generatif digunakan untuk membuat representasi atau konten;
5. LLM digunakan untuk interaksi bahasa;
6. seluruh komponen digabung menjadi sistem hybrid.

### Lima lensa evaluasi dari modul sebelumnya

Setiap paradigma akan dinilai dengan lima pertanyaan:

1. **Kualitas hasil:** apakah output menjawab tujuan?
2. **Generalisasi:** apakah bekerja pada data atau situasi baru?
3. **Reliability:** apakah perilakunya konsisten dan aman saat gagal?
4. **Fairness dan safety:** siapa yang dapat dirugikan?
5. **System readiness:** apakah dapat dipantau, ditinjau, dan dihentikan?

### Hasil yang dibangun secara bertahap

| Bab | Komponen yang ditambahkan | Artifact evaluasi |
|---|---|---|
| 1 | Peta paradigma | Paradigm Comparison Canvas |
| 2 | Rule engine | Rule Test Set dan explanation trace |
| 3 | Model klasifikasi dan embedding | Generalization Report |
| 4 | Kebijakan adaptif | Reward and Safety Specification |
| 5 | Representasi dan generasi awal | Generative Quality Report |
| 6 | Generasi diffusion | Quality-Cost-Safety Matrix |
| 7 | LLM, RAG, tools, dan hybrid system | Integrated System Evaluation Plan |

---

# Bab 1 - Membaca Evolusi AI sebagai Perubahan Cara Memecahkan Masalah

## Pertanyaan pembuka

Apakah teknologi AI baru selalu membuat teknologi lama tidak berguna?

## Tujuan pembelajaran

Peserta dapat:

1. memahami paradigma sebagai cara merepresentasikan masalah;
2. membaca evolusi AI sebagai akumulasi aturan, data, reward, dan generasi;
3. menghubungkan perubahan teknologi dengan perubahan cara evaluasi;
4. membuat Paradigm Comparison Canvas.

## Hubungan dengan Evaluation AI

Pada modul sebelumnya, kita belajar bahwa teknologi harus dinilai dari tujuan dan risiko, bukan dari popularitas. Prinsip yang sama dipakai di sini. Kita tidak akan bertanya "mana teknologi paling modern?". Kita akan bertanya "pendekatan mana yang paling cocok, dan bukti apa yang dibutuhkan?".

## 1.1 Paradigma adalah cara melihat masalah

Paradigma menentukan:

- bentuk pengetahuan;
- cara sistem belajar;
- jenis input dan output;
- cara keputusan dibuat;
- cara sistem diuji.

Contohnya:

| Paradigma | Pertanyaan utama |
|---|---|
| Symbolic AI | Aturan apa yang harus ditulis? |
| Machine learning | Pola apa yang dapat dipelajari dari data? |
| Reinforcement learning | Tindakan apa yang memberi hasil jangka panjang terbaik? |
| Generative modeling | Bagaimana membuat data baru yang mirip distribusi pelatihan? |
| LLM | Bagaimana memprediksi dan menghasilkan bahasa berdasarkan konteks? |
| Hybrid AI | Bagaimana membagi tugas ke beberapa pendekatan? |

## 1.2 Evolusi bukan antrean pengganti

Symbolic AI tidak hilang ketika machine learning muncul. Aturan tetap berguna untuk kebijakan yang deterministik. Machine learning tidak hilang ketika LLM muncul. Model klasifikasi kecil sering lebih murah dan stabil untuk tugas tertentu.

Evolusi AI lebih tepat dibaca sebagai penambahan alat.

```text
Aturan -> Pola dari data -> Keputusan berurutan -> Generasi -> Bahasa skala besar -> Sistem hybrid
```

## 1.3 Milestone dan perubahan kemampuan

1. **Logic Theorist:** komputer dapat memanipulasi simbol.
2. **Perceptron:** mesin dapat belajar pemisah sederhana dari contoh.
3. **DENDRAL dan MYCIN:** pengetahuan pakar dapat ditulis sebagai knowledge base.
4. **Backpropagation:** neural network multilapis dapat dilatih lebih efektif.
5. **Q-learning dan DQN:** agent dapat belajar dari reward.
6. **VAE dan GAN:** model dapat mempelajari latent space dan menghasilkan sampel.
7. **Diffusion:** generasi berkualitas tinggi dapat dilakukan melalui denoising bertahap.
8. **Transformer dan LLM:** attention dan skala memungkinkan pemrosesan bahasa yang fleksibel.

Fokusnya bukan menghafal tahun, tetapi melihat perubahan representasi dan sinyal belajar.

## 1.4 Perubahan paradigma mengubah cara evaluasi

| Paradigma | Bukti utama |
|---|---|
| Symbolic | aturan benar, lengkap, tidak konflik, dan dapat dilacak |
| Machine learning | generalisasi pada data baru dan performa per kelompok |
| Reinforcement learning | reward jangka panjang, constraint, dan perilaku aman |
| Generative model | kualitas, diversity, kontrol, dan bias |
| LLM | factuality, faithfulness, robustness, dan tool safety |

## 1.5 Artifact bab: Paradigm Comparison Canvas

```yaml
product: Asisten Pembelajaran HerAI
needs:
  deterministic_policy: true
  pattern_recognition: true
  sequential_decision: optional
  content_generation: true
  natural_language_interface: true
comparison_questions:
  - masalah apa yang diselesaikan?
  - data atau pengetahuan apa yang dibutuhkan?
  - kegagalan apa yang mungkin terjadi?
  - bagaimana cara mengevaluasinya?
  - apakah pendekatan lain masih dibutuhkan?
```

## Latihan 1

Pilih satu produk AI. Tentukan bagian yang lebih cocok memakai aturan, machine learning, generasi, atau gabungan beberapa pendekatan.

## Handoff ke Bab 2

Bab 1 menunjukkan bahwa pendekatan lama tetap penting. Bab 2 memulai dari symbolic AI, yaitu paradigma yang menulis pengetahuan secara eksplisit.

---

# Bab 2 - Symbolic AI dan Expert Systems

## Pertanyaan pembuka

Kapan aturan eksplisit lebih aman daripada model statistik?

## Tujuan pembelajaran

Peserta dapat:

1. memahami fakta, aturan, knowledge base, dan inference engine;
2. membedakan forward chaining dan backward chaining;
3. mengenali kekuatan dan keterbatasan expert system;
4. mengevaluasi rule coverage, conflict, dan explanation trace;
5. menambahkan rule engine pada Asisten HerAI.

## Hubungan dengan Bab 1

Bab 1 memperkenalkan symbolic AI sebagai pendekatan berbasis aturan. Sekarang kita melihat bagaimana pendekatan itu bekerja dan bagaimana kerangka Evaluation AI diterapkan padanya.

## 2.1 Pengetahuan ditulis secara eksplisit

Contoh aturan:

```text
IF topik = deadline AND dokumen_resmi_tersedia
THEN jawab_dari_dokumen

IF topik = dispensasi AND bukti_tidak_lengkap
THEN eskalasi_ke_mentor
```

Aturan seperti ini mudah diaudit karena tim dapat melihat kondisi dan hasilnya.

## 2.2 Komponen expert system

- **Facts:** informasi yang diketahui.
- **Rules:** hubungan IF/THEN.
- **Knowledge base:** kumpulan facts dan rules.
- **Inference engine:** komponen yang menjalankan aturan.
- **Explanation trace:** jejak aturan yang aktif.

### Forward chaining

Berangkat dari fakta menuju kesimpulan.

### Backward chaining

Berangkat dari hipotesis, lalu mencari fakta yang diperlukan untuk membuktikannya.

## 2.3 Kekuatan symbolic AI

- cocok untuk kebijakan yang harus konsisten;
- mudah dijelaskan;
- mudah diuji dengan kasus deterministik;
- dapat membatasi perilaku model generatif;
- tidak selalu membutuhkan data besar.

## 2.4 Keterbatasan symbolic AI

- aturan bertambah sangat banyak;
- pengecualian sulit dikelola;
- bahasa manusia sering ambigu;
- domain berubah sehingga knowledge base cepat usang;
- aturan lengkap membutuhkan waktu dari pakar.

## 2.5 Menggunakan lensa Evaluation AI

### Kualitas hasil

Apakah kesimpulan sesuai kebijakan?

### Generalisasi

Symbolic AI tidak "belajar" generalisasi seperti ML. Yang diuji adalah apakah rule coverage mencakup variasi kasus penting.

### Reliability

Apakah aturan selalu menghasilkan keputusan yang sama untuk fakta yang sama?

### Fairness dan safety

Apakah aturan memperlakukan kelompok tertentu secara tidak adil? Apakah ada fitur proxy yang tidak seharusnya digunakan?

### System readiness

Apakah perubahan aturan memiliki approval, versioning, dan audit log?

## 2.6 Rule Test Set

| Kasus | Fakta | Expected rule | Expected result |
|---|---|---|---|
| Deadline tersedia | topic=deadline, source=true | answer_from_source | jawaban bersumber |
| Dispensasi ambigu | topic=dispensasi, evidence=false | escalate | dialihkan ke mentor |
| Data pribadi | request=other_user_data | deny | permintaan ditolak |
| Aturan konflik | source_v1 != source_v2 | conflict_handler | jelaskan konflik dan eskalasi |

## 2.7 Artifact bab: Rule Engine dan Explanation Trace

```python
facts = {"topic:dispensasi", "evidence:missing"}

rules = [
    ({"topic:dispensasi", "evidence:missing"}, "escalate_to_mentor"),
    ({"request:other_user_data"}, "deny_private_data"),
]

for condition, decision in rules:
    if condition.issubset(facts):
        print({"matched_rule": list(condition), "decision": decision})
```

## Latihan 2

Buat tiga aturan untuk deadline, permintaan data pribadi, dan pertanyaan yang tidak memiliki sumber. Tambahkan expected result dan explanation trace.

## Handoff ke Bab 3

Rule engine bekerja baik untuk kebijakan yang jelas. Namun menulis aturan untuk semua variasi bahasa dan pola pengguna tidak praktis. Bab 3 memperkenalkan machine learning untuk mempelajari pola dari data.

---

# Bab 3 - Machine Learning: Belajar dari Data

## Pertanyaan pembuka

Apa yang berubah ketika aturan tidak lagi ditulis satu per satu?

## Tujuan pembelajaran

Peserta dapat:

1. memahami feature, label, loss, training, validation, dan test;
2. membedakan supervised dan unsupervised learning;
3. memahami generalization, overfitting, dan embedding;
4. menghubungkan evaluasi ML dengan dataset dan fairness;
5. menambahkan klasifikasi dan semantic search pada Asisten HerAI.

## Hubungan dengan Bab 2

Symbolic AI membutuhkan aturan untuk setiap kondisi. Machine learning menggeser sebagian pekerjaan: tim menyediakan contoh, label, tujuan optimisasi, dan data evaluasi. Rule engine tidak dibuang. Ia tetap dipakai untuk kebijakan yang tidak boleh berubah.

## 3.1 Supervised learning

Model belajar dari pasangan input dan label.

Contoh:

- input: "aku lupa password";
- label: `account_access`.

Alurnya:

```text
Data berlabel -> Prediksi -> Hitung error -> Perbarui parameter -> Uji pada data baru
```

## 3.2 Unsupervised learning dan embedding

Ketika label belum tersedia, model dapat mencari struktur:

- clustering untuk mengelompokkan tema;
- dimensionality reduction untuk membaca pola;
- embedding untuk mengubah teks menjadi vektor.

Embedding memungkinkan semantic search. Pertanyaan "kapan tugas dikumpulkan?" dapat dianggap mirip dengan dokumen berjudul "batas waktu pengumpulan" meskipun kata-katanya tidak sama.

## 3.3 Overfitting dan generalization

- **Overfitting:** model terlalu cocok pada data training.
- **Generalization:** model tetap baik pada data baru.

Akurasi training 99% tidak berarti model siap digunakan. Data validation dan test harus dipisahkan.

## 3.4 Menggunakan lensa Evaluation AI

### Kualitas hasil

Untuk klasifikasi, periksa precision, recall, F1, dan jenis error.

### Generalisasi

Gunakan hidden test set dan data dari periode atau kelompok berbeda.

### Reliability

Periksa typo, bahasa informal, data di luar domain, dan calibration.

### Fairness dan safety

Bandingkan error rate pada kelompok bahasa atau akses berbeda.

### System readiness

Pantau drift dan simpan versi data, model, serta threshold.

## 3.5 Melanjutkan studi kasus

Asisten HerAI sekarang memiliki:

1. rule engine untuk kebijakan;
2. classifier untuk menentukan jenis pertanyaan;
3. embedding search untuk menemukan dokumen.

```text
Pertanyaan -> Classifier -> Retrieval -> Rule check -> Jawaban atau eskalasi
```

## 3.6 Artifact bab: Generalization Report

```yaml
model_task: intent_classification
train_accuracy: 0.96
validation_accuracy: 0.88
test_accuracy: 0.86
critical_class_recall:
  policy_question: 0.94
  personal_data_request: 0.98
subgroup_results:
  formal_language_f1: 0.90
  informal_language_f1: 0.81
known_gap:
  - singkatan dan campuran bahasa
next_action:
  - tambah data informal
  - lakukan error review
```

## Latihan 3

Untuk klasifikasi pertanyaan peserta, tentukan feature, label, pembagian train-validation-test, risiko overfitting, dan satu fairness check.

## Handoff ke Bab 4

Machine learning biasanya membuat satu prediksi untuk satu input. Beberapa masalah membutuhkan rangkaian keputusan yang saling memengaruhi. Bab 4 membahas reinforcement learning.

---

# Bab 4 - Reinforcement Learning

## Pertanyaan pembuka

Apa risiko ketika reward tidak benar-benar mewakili tujuan manusia?

## Tujuan pembelajaran

Peserta dapat:

1. memahami agent, environment, state, action, reward, policy, dan episode;
2. membedakan RL dari supervised learning;
3. memahami exploration dan exploitation;
4. mengenali reward hacking dan risiko jangka panjang;
5. menilai apakah RL memang diperlukan.

## Hubungan dengan Bab 3

Classifier pada Bab 3 membuat prediksi sekali. Reinforcement learning digunakan ketika tindakan hari ini memengaruhi keadaan dan hasil berikutnya. Namun RL tidak otomatis lebih baik. Banyak produk cukup memakai aturan atau supervised learning.

## 4.1 Komponen RL

- **Agent:** pengambil tindakan.
- **Environment:** tempat agent bertindak.
- **State:** kondisi saat ini.
- **Action:** pilihan tindakan.
- **Reward:** sinyal hasil.
- **Policy:** strategi memilih tindakan.
- **Episode:** satu rangkaian interaksi.

## 4.2 Contoh pada rekomendasi belajar

- state: materi yang telah diselesaikan dan skor kuis;
- action: memilih materi berikutnya;
- reward: peningkatan pemahaman dan penyelesaian tugas;
- risiko: agent mengejar klik atau waktu layar, bukan belajar nyata.

## 4.3 Exploration dan exploitation

- **Exploration:** mencoba opsi baru untuk belajar.
- **Exploitation:** memilih opsi yang saat ini terlihat terbaik.

Jika agent hanya mengejar opsi populer, peserta mungkin tidak menemukan materi yang sebenarnya lebih sesuai.

## 4.4 Q-learning, DQN, dan self-play

Q-learning memperkirakan nilai sebuah tindakan pada state tertentu. DQN menggunakan neural network untuk memperkirakan Q-value. Self-play memungkinkan agent belajar melalui interaksi melawan versi dirinya atau lingkungan simulasi.

Konsep ini penting secara historis, tetapi penggunaan nyata membutuhkan simulator, data interaksi, dan kontrol keselamatan.

## 4.5 Menggunakan lensa Evaluation AI

### Kualitas hasil

Jangan hanya melihat reward per langkah. Periksa outcome belajar jangka panjang.

### Generalisasi

Uji pada tipe peserta dan kondisi yang tidak ada di training.

### Reliability

Uji policy saat data hilang, state salah, atau reward terlambat.

### Fairness dan safety

Pastikan eksplorasi tidak membebankan risiko pada kelompok tertentu.

### System readiness

Gunakan constraint, approval, logging, dan kemampuan menghentikan policy.

## 4.6 Artifact bab: Reward and Safety Specification

```yaml
agent_goal: memilih materi berikutnya
state:
  - completed_modules
  - quiz_scores
  - stated_interest
actions:
  - recommend_foundation
  - recommend_practice
  - recommend_review
reward:
  positive:
    - quiz_improvement
    - completion_with_understanding
  forbidden_proxy:
    - click_only
    - screen_time_only
constraints:
  - prerequisite_order_must_hold
  - user_can_override
  - no_sensitive_attribute_targeting
```

## Latihan 4

Rancang state, action, reward, dan constraint untuk sistem rekomendasi materi. Jelaskan satu kemungkinan reward hacking.

## Handoff ke Bab 5

RL berfokus pada tindakan berurutan. Bab 5 beralih ke keluarga model yang mempelajari representasi dan menghasilkan data baru.

---

# Bab 5 - Autoencoder, VAE, dan GAN

## Pertanyaan pembuka

Mengapa sampel yang terlihat bagus belum tentu mudah dikontrol?

## Tujuan pembelajaran

Peserta dapat:

1. memahami encoder, decoder, latent space, generator, dan discriminator;
2. membedakan autoencoder, VAE, dan GAN;
3. menghubungkan model generatif dengan representation learning;
4. mengevaluasi rekonstruksi, diversity, dan mode collapse;
5. menentukan kapan generasi benar-benar dibutuhkan.

## Hubungan dengan Bab 4

RL belajar memilih tindakan. Model pada bab ini belajar struktur data dan menghasilkan sampel. Sinyal belajarnya berbeda, sehingga cara evaluasinya juga berbeda.

## 5.1 Autoencoder

Autoencoder terdiri dari:

```text
Input -> Encoder -> Latent representation -> Decoder -> Rekonstruksi
```

Model belajar menyimpan informasi penting dalam representasi yang lebih ringkas. Autoencoder dapat digunakan untuk kompresi, representation learning, dan anomaly detection.

## 5.2 Variational Autoencoder

VAE menambahkan struktur probabilistik pada latent space. Hasilnya, titik-titik di latent space lebih mudah disampling dan diinterpolasi.

VAE berguna ketika tim membutuhkan variasi yang terstruktur, tetapi hasilnya dapat lebih halus dibanding GAN.

## 5.3 Generative Adversarial Network

GAN memiliki dua model:

- **Generator:** membuat sampel;
- **Discriminator:** membedakan sampel asli dan buatan.

Keduanya berkompetisi. Training dapat menghasilkan sampel tajam, tetapi bisa tidak stabil.

## 5.4 Risiko mode collapse

Mode collapse terjadi ketika generator hanya menghasilkan sedikit jenis sampel. Output mungkin terlihat bagus, tetapi diversity rendah.

Ini menunjukkan mengapa evaluasi generatif tidak cukup memakai satu contoh terbaik.

## 5.5 Menggunakan lensa Evaluation AI

### Kualitas hasil

Periksa rekonstruksi, kemiripan, dan kegunaan untuk tugas.

### Generalisasi

Periksa apakah model hanya meniru contoh training atau dapat membuat variasi yang masuk akal.

### Reliability

Uji stabilitas training dan sensitivitas terhadap seed.

### Fairness dan safety

Audit bias representasi dan kemungkinan menghasilkan konten sensitif.

### System readiness

Simpan data lineage, model version, dan review hasil sebelum digunakan.

## 5.6 Melanjutkan studi kasus

Pada Asisten HerAI, autoencoder dapat dipakai secara terbatas untuk mendeteksi pola pertanyaan yang sangat berbeda dari data normal. Model generatif tidak digunakan untuk membuat aturan. Aturan resmi tetap berasal dari dokumen dan rule engine.

## 5.7 Artifact bab: Generative Quality Report

```yaml
model_family: vae
purpose: eksplorasi representasi pola pertanyaan
metrics:
  - reconstruction_error
  - latent_cluster_quality
  - diversity
qualitative_review:
  - apakah variasi masuk akal?
  - apakah ada pola sensitif yang muncul?
known_risks:
  - bias data
  - output tidak memiliki makna faktual
```

## Latihan 5

Bandingkan autoencoder, VAE, dan GAN untuk dua kebutuhan: anomaly detection dan variasi desain. Jelaskan model yang dipilih dan cara mengevaluasinya.

## Handoff ke Bab 6

VAE dan GAN membuka generasi data, tetapi masing-masing memiliki trade-off. Bab 6 membahas diffusion yang menggunakan proses denoising bertahap.

---

# Bab 6 - Diffusion Models

## Pertanyaan pembuka

Bagaimana menyeimbangkan kualitas generasi, kecepatan, biaya, dan keamanan?

## Tujuan pembelajaran

Peserta dapat:

1. memahami noising dan denoising secara konseptual;
2. menjelaskan mengapa diffusion kuat untuk sintesis;
3. membaca trade-off inference steps dan latency;
4. mengevaluasi prompt alignment, diversity, safety, dan biaya;
5. membedakan kualitas visual dan kebenaran informasi.

## Hubungan dengan Bab 5

GAN melatih generator melawan discriminator. Diffusion memakai cara berbeda: model belajar membalik proses penambahan noise. Perbedaan training ini memengaruhi stabilitas, biaya inference, dan cara evaluasi.

## 6.1 Proses sederhana diffusion

Saat training:

```text
Data bersih -> Tambah noise -> Model belajar memprediksi noise
```

Saat generasi:

```text
Noise acak -> Denoise bertahap -> Sampel baru
```

## 6.2 Kekuatan dan trade-off

Kelebihan:

- kualitas tinggi;
- training relatif stabil;
- mudah dikondisikan dengan prompt atau input tambahan.

Kekurangan:

- membutuhkan beberapa langkah inference;
- latency dan biaya dapat tinggi;
- kualitas visual tidak menjamin fakta benar;
- sumber data dan hak penggunaan perlu diperhatikan.

## 6.3 Menggunakan lensa Evaluation AI

### Kualitas hasil

Periksa prompt alignment, kualitas visual, dan kegunaan.

### Generalisasi

Uji prompt, gaya, dan objek yang tidak dominan di data.

### Reliability

Bandingkan hasil dari beberapa seed dan sampler.

### Fairness dan safety

Periksa stereotip, konten tidak pantas, data pribadi, dan hak penggunaan.

### System readiness

Pantau latency, biaya, filter, logging, dan human review.

## 6.4 Melanjutkan studi kasus

Asisten HerAI dapat memakai diffusion untuk membuat ilustrasi belajar. Namun ilustrasi tidak boleh dianggap sebagai sumber fakta. Konten yang menjelaskan aturan tetap berasal dari dokumen resmi.

Ini menunjukkan pembagian tugas dalam hybrid system:

- diffusion membuat visual;
- retrieval menyediakan fakta;
- rule engine menjaga kebijakan;
- manusia meninjau konten yang akan dipublikasikan.

## 6.5 Artifact bab: Quality-Cost-Safety Matrix

| Konfigurasi | Kualitas | Latency | Biaya | Risiko | Penggunaan |
|---|---:|---:|---:|---|---|
| Steps rendah | sedang | rendah | rendah | detail berkurang | preview |
| Steps menengah | baik | sedang | sedang | perlu review | konten internal |
| Steps tinggi | tinggi | tinggi | tinggi | tetap perlu audit | final terpilih |

## Latihan 6

Rancang evaluasi untuk fitur pembuat ilustrasi materi. Masukkan prompt alignment, diversity, latency, biaya, bias, dan human review.

## Handoff ke Bab 7

Bab 2 sampai 6 menunjukkan bahwa setiap paradigma menyelesaikan bagian berbeda. Bab 7 menggabungkan kemampuan bahasa, retrieval, aturan, tools, dan evaluasi menjadi hybrid AI.

---

# Bab 7 - Transformer, LLM, dan Hybrid AI

## Pertanyaan pembuka

Mengapa produk AI modern sering membutuhkan lebih dari satu model atau satu paradigma?

## Tujuan pembelajaran

Peserta dapat:

1. memahami attention, Transformer, token, context window, dan LLM;
2. mengenali kekuatan dan keterbatasan LLM;
3. memahami RAG, tools, guardrail, dan human oversight;
4. merancang arsitektur hybrid;
5. menggabungkan AI Evaluation Plan dari modul sebelumnya.

## Hubungan dengan bab sebelumnya

Symbolic AI memberi kontrol. ML memberi pengenalan pola. RL memberi kerangka keputusan berurutan. Model generatif memberi kemampuan membuat data. Transformer dan LLM menggabungkan representation learning skala besar dengan antarmuka bahasa yang fleksibel.

Namun LLM tidak menggantikan semua komponen tersebut.

## 7.1 Attention dan Transformer

Attention membantu model memberi bobot pada bagian konteks yang relevan. Transformer membuat mekanisme ini dapat diproses secara paralel dan diskalakan.

LLM decoder-only biasanya menghasilkan token berikutnya berdasarkan token sebelumnya.

```text
Prompt + Context -> Transformer -> Probabilitas token berikutnya -> Output
```

## 7.2 Kekuatan LLM

- memahami dan menghasilkan bahasa;
- merangkum;
- membantu coding;
- mengikuti instruksi;
- menggunakan tools;
- berinteraksi dengan banyak jenis pengguna.

## 7.3 Keterbatasan LLM

- dapat mengarang fakta;
- tidak otomatis memiliki data terbaru;
- prompt tidak menjamin kepatuhan deterministik;
- context window terbatas;
- dapat terpengaruh prompt injection;
- confidence bahasa tidak sama dengan confidence kebenaran.

## 7.4 RAG dan grounding

RAG mengambil dokumen yang relevan sebelum model membuat jawaban.

```text
Pertanyaan -> Retrieval -> Dokumen relevan -> LLM -> Jawaban bersumber
```

RAG membantu grounding, tetapi tidak menghilangkan hallucination sepenuhnya. Retrieval, prompt, generation, dan citation tetap harus dievaluasi.

## 7.5 Tools dan agent workflow

LLM dapat memilih tools seperti:

- pencarian dokumen;
- kalkulator;
- database;
- kalender;
- API internal.

Tool schema, izin, validation, timeout, logging, dan approval diperlukan agar tindakan tetap aman.

## 7.6 Arsitektur hybrid Asisten HerAI

```text
User
  -> Input validation
  -> Intent classifier
  -> Policy rule check
  -> Document retrieval
  -> LLM response generation
  -> Faithfulness and safety validation
  -> Human escalation when needed
  -> Logging and monitoring
```

Pembagian tugas:

| Komponen | Tanggung jawab |
|---|---|
| Rules | kebijakan wajib dan larangan |
| Classifier | menentukan jenis pertanyaan |
| Embedding retrieval | menemukan dokumen |
| LLM | menjelaskan dengan bahasa alami |
| Validator | memeriksa sumber dan format |
| Human reviewer | menangani kasus sensitif atau konflik |
| Monitoring | mendeteksi drift dan incident |

## 7.7 Menggunakan seluruh lensa Evaluation AI

### Kualitas hasil

Gunakan relevansi, factuality, faithfulness, clarity, dan safety.

### Generalisasi

Uji bahasa informal, topik baru, dan dokumen baru.

### Reliability

Uji repeated sampling, missing source, ambiguity, dan prompt injection.

### Fairness dan safety

Bandingkan performa per kelompok dan audit penggunaan tools.

### System readiness

Periksa logging, release gate, human review, incident response, monitoring, dan rollback.

## 7.8 Artifact bab: Integrated System Evaluation Plan

```yaml
system: Asisten Pembelajaran HerAI
architecture:
  - rules
  - classifier
  - retrieval
  - llm
  - validator
  - human_review
component_evaluation:
  rules:
    - coverage
    - conflict
    - trace
  classifier:
    - f1
    - calibration
    - subgroup_error
  retrieval:
    - context_recall
    - source_quality
  llm:
    - factuality
    - faithfulness
    - clarity
  tools:
    - schema_validation
    - permission_test
system_evaluation:
  - end_to_end_task_success
  - critical_failure_rate
  - escalation_quality
  - latency
  - cost
  - monitoring_readiness
```

## Latihan 7 - Merancang sistem hybrid

Rancang asisten untuk menjawab materi, jadwal, tugas, dan aturan. Tentukan bagian yang memakai rules, classifier, retrieval, LLM, tools, human review, dan monitoring. Tambahkan minimal satu pengujian untuk setiap komponen.

---

# Proyek Akhir - Dari Paradigma ke Sistem Hybrid

Buat proposal singkat untuk satu produk AI. Proposal harus memuat:

1. masalah pengguna;
2. paradigma yang dipertimbangkan;
3. alasan memilih atau menolak setiap paradigma;
4. pembagian tugas antarkomponen;
5. data atau knowledge base yang dibutuhkan;
6. failure paling berbahaya;
7. cara mengevaluasi setiap komponen;
8. release criteria;
9. monitoring dan human review.

## Template keputusan

| Kebutuhan | Paradigma | Alasan | Risiko | Evaluasi |
|---|---|---|---|---|
| Kebijakan wajib | Symbolic AI | deterministik | aturan usang | coverage dan trace |
| Klasifikasi pertanyaan | Supervised ML | belajar dari contoh | overfitting | F1 dan subgroup |
| Rekomendasi berurutan | RL atau aturan adaptif | outcome jangka panjang | reward hacking | long-term outcome |
| Ilustrasi | Diffusion | generasi visual | bias dan biaya | quality-cost-safety |
| Jawaban bahasa | LLM + RAG | fleksibel dan bersumber | hallucination | faithfulness dan robustness |

---

# Kuis Akhir

## Soal

1. Mengapa evolusi AI sebaiknya dibaca sebagai akumulasi paradigma?
2. Apa hubungan perubahan representasi dengan perubahan cara evaluasi?
3. Kapan symbolic AI lebih tepat daripada machine learning?
4. Apa fungsi explanation trace?
5. Mengapa rule coverage penting?
6. Apa perbedaan supervised dan unsupervised learning?
7. Mengapa generalization lebih penting daripada skor training?
8. Bagaimana embedding membantu semantic search?
9. Apa perbedaan keputusan satu langkah dan keputusan berurutan?
10. Mengapa reward yang salah dapat menghasilkan perilaku buruk?
11. Apa fungsi latent space pada autoencoder dan VAE?
12. Apa yang dimaksud mode collapse?
13. Bagaimana diffusion menghasilkan sampel baru?
14. Mengapa inference steps perlu dievaluasi bersama biaya?
15. Apa fungsi attention pada Transformer?
16. Mengapa RAG tidak menghilangkan hallucination sepenuhnya?
17. Mengapa prompt saja tidak cukup untuk kontrol kebijakan?
18. Apa manfaat arsitektur hybrid?
19. Mengapa setiap komponen hybrid perlu dievaluasi secara terpisah?
20. Bagaimana Evaluation AI membantu memahami Evolution of AI?

## Kunci jawaban ringkas

1. Paradigma lama tetap berguna untuk masalah dan kontrol tertentu.
2. Setiap representasi menghasilkan jenis kegagalan dan bukti yang berbeda.
3. Saat aturan harus deterministik, dapat diaudit, dan tidak boleh dinegosiasikan.
4. Menunjukkan aturan yang menghasilkan keputusan.
5. Agar kasus penting tidak jatuh ke area tanpa aturan.
6. Supervised memakai label; unsupervised mencari struktur tanpa label eksplisit.
7. Sistem harus bekerja pada data baru, bukan hanya data training.
8. Embedding menyimpan kemiripan makna dalam bentuk vektor.
9. Keputusan berurutan memengaruhi state dan hasil berikutnya.
10. Agent dapat mengoptimalkan proxy yang tidak sama dengan tujuan manusia.
11. Menyimpan representasi ringkas dari faktor penting data.
12. Generator menghasilkan variasi yang sangat terbatas.
13. Mulai dari noise dan melakukan denoising bertahap.
14. Lebih banyak steps dapat meningkatkan kualitas tetapi menaikkan latency dan biaya.
15. Memberi bobot pada bagian konteks yang relevan.
16. Retrieval dapat gagal dan LLM masih dapat mengarang atau salah menafsirkan.
17. Prompt bersifat probabilistik; kebijakan penting membutuhkan rules dan validation.
18. Membagi tugas sesuai kekuatan setiap pendekatan.
19. Kegagalan satu komponen dapat tersembunyi dalam skor end-to-end.
20. Evaluation AI memberi lensa tujuan, generalisasi, reliability, fairness, dan system readiness.

---

# Ringkasan Modul

- AI berkembang melalui perubahan representasi, sinyal belajar, dan kemampuan.
- Paradigma baru tidak otomatis menghapus paradigma lama.
- Symbolic AI unggul pada aturan eksplisit dan audit.
- Machine learning unggul pada pola yang sulit ditulis sebagai aturan.
- Reinforcement learning digunakan untuk keputusan berurutan, tetapi reward harus dirancang hati-hati.
- Autoencoder, VAE, GAN, dan diffusion memiliki tujuan serta risiko generatif yang berbeda.
- Transformer dan LLM memberikan fleksibilitas bahasa, tetapi membutuhkan grounding dan kontrol.
- Hybrid AI membagi tugas kepada komponen yang paling sesuai.
- Kerangka Evaluation AI harus diterapkan pada setiap paradigma dan pada sistem secara keseluruhan.

# Glosarium

**Attention**  
Mekanisme yang membantu model memberi bobot pada bagian konteks yang relevan.

**Embedding**  
Representasi data dalam bentuk vektor yang menyimpan pola kemiripan.

**Explanation trace**  
Jejak aturan yang menjelaskan asal keputusan symbolic system.

**Hybrid AI**  
Sistem yang menggabungkan beberapa paradigma atau komponen.

**Latent space**  
Ruang representasi ringkas yang menyimpan faktor penting data.

**Paradigma**  
Cara utama dalam merepresentasikan dan menyelesaikan masalah.

**Policy**  
Strategi agent dalam memilih tindakan.

**RAG**  
Retrieval augmented generation, yaitu mengambil dokumen sebelum menghasilkan jawaban.

**Reward hacking**  
Perilaku agent yang memaksimalkan reward tanpa memenuhi tujuan sebenarnya.

**Rule coverage**  
Tingkat cakupan aturan terhadap kasus yang perlu ditangani.

# Referensi

1. Newell, Shaw, and Simon, *Logic Theorist*, 1956.
2. Rosenblatt, *The Perceptron*, 1958.
3. McCarthy, *Programs with Common Sense*, 1959.
4. Rumelhart, Hinton, and Williams, *Learning Representations by Back-Propagating Errors*, 1986.
5. Watkins and Dayan, *Q-learning*, 1992.
6. Sutton and Barto, *Reinforcement Learning: An Introduction*.
7. Kingma and Welling, *Auto-Encoding Variational Bayes*, 2013.
8. Goodfellow et al., *Generative Adversarial Nets*, 2014.
9. Ho, Jain, and Abbeel, *Denoising Diffusion Probabilistic Models*, 2020.
10. Vaswani et al., *Attention Is All You Need*, 2017.
11. Brown et al., *Language Models are Few-Shot Learners*, 2020.
