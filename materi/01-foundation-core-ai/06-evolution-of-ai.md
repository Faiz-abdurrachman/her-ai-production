# Evolution of AI

> Ekspor lengkap dari sumber materi HerAI yang tersedia di repository.
> Mencakup materi, latihan, kuis, diskusi, pembahasan, versi legacy, dan/atau data interaktif bila tersedia.

## Membaca Evolusi AI

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/chapters/chapter-1.html`

Chapter 1 - 30 menit

#### Membaca Evolusi AI

Pertanyaan pembuka: apakah paradigma AI baru selalu membuat pendekatan lama tidak berguna?

##### ** Tujuan Pembelajaran

-   Memahami paradigma AI sebagai cara berbeda merepresentasikan masalah.
-   Membaca evolusi AI sebagai akumulasi aturan, data, reward, dan generasi.
-   Menghubungkan milestone historis dengan kemampuan AI modern.

**

**Konsep Utama.** Evolusi AI bukan antrean teknologi yang saling menghapus. Symbolic AI memberi aturan, machine learning memberi pola dari data, reinforcement learning memberi pembelajaran dari reward, generative AI memberi kemampuan menghasilkan konten, dan hybrid AI menggabungkan kontrol dengan fleksibilitas.

##### Inti Konsep

Paradigma adalah cara memandang masalah. Dalam AI, paradigma menentukan apa yang dianggap sebagai pengetahuan, bagaimana sistem belajar, dan bagaimana keputusan dibuat. Jika symbolic AI bertanya "aturan apa yang harus ditulis?", machine learning bertanya "pola apa yang dapat dipelajari?", dan generative AI bertanya "data baru apa yang bisa dihasilkan?".

Compute dan skala membuat beberapa pendekatan menjadi lebih kuat, tetapi skala tidak menggantikan desain sistem. Banyak produk AI modern tetap memakai aturan, retrieval, model statistik, LLM, dan human review secara bersamaan.

##### Paradigma dan Pertanyaan Utama

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Paradigma
Pertanyaan utama</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Symbolic AI
Bagaimana pengetahuan ditulis sebagai aturan?</td>
<td align="left">Supervised Learning
Bagaimana model belajar dari contoh berlabel?</td>
</tr>
</tbody>
</table>

##### Timeline Evolusi AI

1.  **Logic Theorist**Symbolic reasoning untuk pembuktian logika; penting karena menunjukkan komputer dapat memanipulasi simbol.
2.  **Perceptron**Classifier linear yang belajar dari contoh; fondasi awal learning machine.
3.  **Programs with Common Sense**Gagasan McCarthy tentang penalaran logis dan common-sense reasoning.
4.  **DENDRAL dan MYCIN**Expert system yang menunjukkan nilai knowledge base dan explanation trace.
5.  **Backpropagation**Memperkuat neural network multilapis melalui optimisasi error.
6.  **Q-learning, DQN, AlphaGo**Agent belajar dari reward, pengalaman, dan self-play.
7.  **VAE, GAN, Diffusion**Model generatif mulai menghasilkan representasi, sampel tajam, dan sintesis berkualitas tinggi.
8.  **Transformer dan GPT-3**Attention dan skala membuka LLM yang fleksibel untuk bahasa, kode, reasoning, dan tool use.

**

**Analogi.** Evolusi AI mirip alat navigasi. Peta kertas tidak hilang ketika GPS muncul; keduanya menjawab kebutuhan berbeda dan bisa dipakai bersama.

###### Contoh Nyata: chatbot fellowship

Chatbot dapat memakai aturan untuk deadline resmi, retrieval untuk dokumen program, dan LLM untuk merangkai jawaban yang ramah.

###### Contoh Nyata: rekomendasi materi

Rekomendasi dapat memakai supervised learning dari histori belajar, embedding untuk kemiripan topik, dan aturan prasyarat agar urutan belajar tetap aman.

##### Lebih Teknis

Representasi pengetahuan berubah dari simbol eksplisit menjadi vektor, latent space, policy, dan distribusi probabilitas. Perubahan ini memengaruhi cara sistem diuji: aturan diuji dengan kasus deterministik, model data diuji dengan generalisasi, dan model generatif diuji dengan kualitas, keamanan, serta kontrol.

##### Kesalahan Umum

1.  Menganggap paradigma baru selalu menggantikan yang lama.
2.  Menyamakan semua AI modern dengan LLM.
3.  Menganggap skala selalu lebih penting daripada desain sistem.
4.  Membaca sejarah AI hanya sebagai hafalan tahun.

##### Mini-check

Pilih satu produk AI yang kamu kenal. Bagian mana yang cocok memakai aturan, data, reward, generasi, atau kombinasi hybrid?

##### Ringkasan

-   AI berkembang lewat akumulasi paradigma.
-   Setiap paradigma menjawab masalah dengan representasi dan sinyal belajar berbeda.
-   Sistem modern sering hybrid karena kebutuhan produk jarang murni satu paradigma.

##### Glossary

Paradigma  
Cara berpikir dominan untuk menyelesaikan masalah.

Hybrid AI  
Sistem yang menggabungkan beberapa pendekatan AI atau aturan.

Representasi  
Bentuk internal pengetahuan atau data yang dipakai sistem.

##### Referensi

1.  McCarthy, *Programs with Common Sense*, 1959.
2.  Rosenblatt, *The Perceptron*, 1958.
3.  Rumelhart, Hinton, and Williams, *Learning Representations by Back-Propagating Errors*, 1986.
4.  Vaswani et al., *Attention Is All You Need*, 2017.

## Symbolic AI dan Expert Systems

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/chapters/chapter-2.html`

Chapter 2 - 35 menit

#### Symbolic AI dan Expert Systems

Pertanyaan pembuka: kapan aturan eksplisit lebih tepat daripada model statistik?

##### ** Tujuan Pembelajaran

-   Memahami simbol, fakta, predikat, aturan, dan inferensi.
-   Membedakan forward chaining dan backward chaining.
-   Mengenali kekuatan expert system dan batasnya.

**

**Konsep Utama.** Symbolic AI menulis pengetahuan secara eksplisit. Sistem bekerja dengan fakta, aturan, knowledge base, inference engine, dan explanation trace.

##### Inti Konsep

Dalam symbolic AI, pengetahuan diperlakukan sebagai simbol yang dapat dimanipulasi. Aturan seperti `IF pembayaran gagal AND pengguna meminta refund THEN arahkan ke billing refund` membuat keputusan mudah diaudit.

Expert system seperti DENDRAL dan MYCIN menunjukkan bahwa AI bisa kuat pada domain sempit jika aturan dan pengetahuan pakar ditulis dengan teliti. Namun sistem ini mahal dirawat ketika domain ambigu atau berubah cepat.

Fakta**Aturan**Mesin Inferensi**Kesimpulan**Penjelasan

**

**Analogi.** Symbolic AI seperti petugas yang bekerja memakai SOP. Keputusannya mudah ditelusuri, tetapi kesulitan ketika situasi tidak tercakup di SOP.

###### Contoh Nyata: compliance

Aturan eksplisit cocok untuk kebijakan yang harus dipatuhi secara deterministik, misalnya validasi kelengkapan dokumen.

###### Contoh Nyata: safety layer

LLM dapat menjawab fleksibel, tetapi rule-based guardrail memastikan kebijakan wajib tidak dilanggar.

##### Lebih Teknis

    facts = {"payment_failed", "refund_requested"}
    rules = [
      ({"payment_failed", "refund_requested"}, "billing_refund"),
      ({"login_issue"}, "account_access")
    ]
    for condition, route in rules:
      if condition <= facts:
        print(route)

Forward chaining bergerak dari fakta ke kesimpulan. Backward chaining bergerak dari hipotesis ke fakta yang perlu dibuktikan. Certainty factor dapat memberi bobot saat aturan tidak sepenuhnya pasti.

##### Kesalahan Umum

1.  Menganggap symbolic AI sepenuhnya usang.
2.  Mengira aturan selalu mudah dirawat.
3.  Menyamakan explainable dengan selalu benar.
4.  Memaksa domain ambigu menjadi aturan kaku.

##### Mini-check

Buat dua aturan triase tiket fellowship dan jelaskan kapan aturan itu perlu ditinjau ulang.

##### Ringkasan

-   Symbolic AI unggul untuk domain eksplisit dan audit.
-   Expert system membutuhkan knowledge engineering yang disiplin.
-   Sistem modern masih memakai aturan untuk kontrol, compliance, dan safety.

##### Glossary

Knowledge base  
Kumpulan fakta dan aturan.

Inference engine  
Komponen yang menerapkan aturan untuk menarik kesimpulan.

Explanation trace  
Jejak aturan yang menjelaskan mengapa keputusan dibuat.

##### Referensi

1.  Newell, Shaw, and Simon, *Logic Theorist*, 1956.
2.  Feigenbaum, Buchanan, and Lederberg, DENDRAL project.
3.  Shortliffe, *MYCIN*, 1970s.
4.  Lenat, *CYC*, 1995.

## Machine Learning: Belajar dari Data

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/chapters/chapter-3.html`

Chapter 3 - 40 menit

#### Machine Learning: Belajar dari Data

Pertanyaan pembuka: apa yang berubah ketika aturan tidak lagi ditulis satu per satu?

##### ** Tujuan Pembelajaran

-   Memahami feature, label, loss, training, validation, dan test.
-   Membedakan supervised dan unsupervised learning.
-   Mengenali overfitting, generalization, representation learning, dan embedding.

**

**Konsep Utama.** Machine learning menggeser pekerjaan dari menulis aturan menjadi menyediakan data, label, tujuan optimisasi, dan evaluasi generalisasi.

##### Inti Konsep

Supervised learning belajar dari contoh berlabel. Model melihat input, membuat prediksi, menghitung error terhadap label, lalu memperbarui parameter agar error turun.

Unsupervised learning bekerja tanpa label eksplisit. Sistem mencari struktur seperti cluster, dimensi penting, embedding, atau pola kemiripan yang berguna untuk search, rekomendasi, dan eksplorasi data.

Data**Prediksi**Error**Update Parameter**Ulangi

**

**Analogi.** Supervised learning seperti latihan dengan kunci jawaban. Unsupervised learning seperti mengelompokkan kartu tanpa nama kategori, lalu menemukan pola sendiri.

###### Contoh Nyata: klasifikasi email

Label spam atau bukan spam membantu model belajar pola kata, pengirim, dan struktur pesan.

###### Contoh Nyata: semantic search

Embedding mengubah teks menjadi vektor sehingga dokumen serupa dapat ditemukan meski kata-katanya tidak sama.

##### Lebih Teknis

    for batch in data:
      prediction = model(batch.x)
      loss = compare(prediction, batch.y)
      gradient = backward(loss)
      update(model.parameters, gradient)

Perceptron memberi fondasi classifier linear. Backpropagation memperkuat neural network multilapis. PCA dan k-means menunjukkan cara membaca struktur tanpa label. Embedding space menyimpan kemiripan makna dalam bentuk vektor.

##### Kesalahan Umum

1.  Menganggap data lebih banyak selalu lebih baik.
2.  Menyamakan correlation dengan causation.
3.  Mengira akurasi training adalah kualitas akhir.
4.  Menganggap label selalu objektif.
5.  Memakai ML untuk business rules yang sebenarnya deterministik.

##### Mini-check

Untuk sistem rekomendasi materi, tentukan contoh feature, label, risiko overfitting, dan cara validasi.

##### Ringkasan

-   ML belajar pola dari data, bukan dari aturan manual saja.
-   Supervised, unsupervised, dan representation learning menjawab kebutuhan berbeda.
-   Generalization lebih penting daripada skor training.

##### Glossary

Feature  
Informasi input yang dipakai model.

Label  
Target jawaban pada supervised learning.

Overfitting  
Model terlalu cocok dengan data training dan buruk pada data baru.

##### Referensi

1.  Rosenblatt, *The Perceptron*, 1958.
2.  Rumelhart, Hinton, and Williams, 1986.
3.  Pearson, *Principal Components Analysis*, 1901.
4.  MacQueen, *Some Methods for Classification and Analysis of Multivariate Observations*, 1967.
5.  Bengio, Courville, and Vincent, *Representation Learning*, 2013.

## Reinforcement Learning

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/chapters/chapter-4.html`

Chapter 4 - 35 menit

#### Reinforcement Learning

Pertanyaan pembuka: apa risiko ketika reward tidak mewakili tujuan manusia?

##### ** Tujuan Pembelajaran

-   Memahami agent, environment, state, action, reward, policy, dan episode.
-   Membedakan reinforcement learning dari supervised learning.
-   Menjelaskan exploration, exploitation, Q-learning, DQN, dan self-play secara konseptual.

**

**Konsep Utama.** Reinforcement learning melatih agent mengambil tindakan berurutan untuk memaksimalkan reward jangka panjang, bukan hanya menebak label satu kali.

##### Inti Konsep

Agent mengamati state, memilih action, menerima reward, lalu memperbarui policy. Tantangannya adalah keputusan hari ini dapat memengaruhi hasil beberapa langkah ke depan.

Exploration berarti mencoba tindakan baru untuk belajar. Exploitation berarti memakai tindakan yang tampak terbaik berdasarkan pengalaman. Keduanya perlu seimbang.

Agent**Action**Environment**Reward + State**Policy Update

**

**Analogi.** Belajar RL seperti belajar strategi permainan. Kamu tidak hanya diberi jawaban benar, tetapi mendapat konsekuensi dari tindakan dan belajar dari rangkaian keputusan.

###### Contoh Nyata: robot navigasi

Robot mendapat reward saat mendekati target dan penalti saat menabrak penghalang.

###### Contoh Nyata: rekomendasi adaptif

Sistem dapat menyesuaikan rekomendasi berdasarkan respons peserta, tetapi reward harus hati-hati agar tidak mengejar klik saja.

##### Lebih Teknis

    observe state
    choose action using policy
    receive reward and next_state
    estimate future value
    update policy or q_value

Q-learning memperkirakan nilai tindakan pada state tertentu. DQN memakai neural network untuk memperkirakan Q-value. AlphaGo menunjukkan kekuatan self-play dan kombinasi supervised learning, reinforcement learning, serta search.

##### Kesalahan Umum

1.  Mengira reward sederhana selalu mewakili tujuan nyata.
2.  Mengabaikan eksplorasi sehingga agent terlalu cepat puas.
3.  Menganggap RL cocok untuk semua produk.
4.  Tidak memeriksa dampak jangka panjang.

##### Mini-check

Untuk asisten belajar, apa state, action, reward, dan risiko reward hacking yang mungkin muncul?

##### Ringkasan

-   RL cocok untuk keputusan berurutan.
-   Reward shaping sangat menentukan perilaku agent.
-   Exploration dan exploitation harus seimbang.

##### Glossary

Policy  
Strategi agent memilih tindakan.

Reward  
Sinyal umpan balik untuk tindakan agent.

Q-value  
Perkiraan nilai tindakan pada state tertentu.

##### Referensi

1.  Watkins and Dayan, *Q-learning*, 1992.
2.  Sutton and Barto, *Reinforcement Learning: An Introduction*.
3.  Mnih et al., *Human-level Control through Deep Reinforcement Learning*, 2015.
4.  Silver et al., *Mastering the Game of Go with Deep Neural Networks and Tree Search*, 2016.

## Autoencoder, VAE, dan GAN

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/chapters/chapter-5.html`

Chapter 5 - 35 menit

#### Autoencoder, VAE, dan GAN

Pertanyaan pembuka: mengapa sampel yang tampak bagus belum tentu mudah dikontrol?

##### ** Tujuan Pembelajaran

-   Memahami encoder, decoder, latent space, generator, dan discriminator.
-   Membedakan autoencoder, VAE, dan GAN secara konseptual.
-   Memilih keluarga model berdasarkan kebutuhan struktur, variasi, atau ketajaman sampel.

**

**Konsep Utama.** Model generatif belajar membuat data baru yang mirip data pelatihan. Autoencoder belajar memadatkan dan merekonstruksi, VAE membuat latent space lebih terstruktur, dan GAN melatih generator melawan discriminator.

##### Inti Konsep

Autoencoder terdiri dari encoder yang memadatkan input dan decoder yang membangun kembali input. VAE menambahkan probabilitas agar latent space lebih mulus dan dapat disampling.

GAN memakai dua model. Generator mencoba membuat sampel meyakinkan, sementara discriminator mencoba membedakan sampel asli dan palsu. Persaingan ini dapat menghasilkan sampel tajam, tetapi training sering tidak stabil.

Input**Encoder**Latent Space**Decoder**Rekonstruksi

**

**Analogi.** VAE seperti membuat peta ringkas dari banyak gaya gambar, sedangkan GAN seperti kompetisi antara pemalsu dan pemeriksa.

###### Contoh Nyata: data augmentation

Model generatif dapat membuat variasi contoh untuk membantu eksplorasi, tetapi tetap perlu audit kualitas dan bias.

###### Contoh Nyata: anomaly detection

Autoencoder dapat mendeteksi input yang sulit direkonstruksi karena berbeda dari pola normal.

##### Lebih Teknis

    z = encoder(input)
    reconstruction = decoder(z)
    loss = reconstruction_error + latent_regularization
    update(encoder, decoder)

VAE menyeimbangkan rekonstruksi dan regularisasi latent distribution. GAN menyeimbangkan kemampuan generator dan discriminator. Ketidakseimbangan dapat menyebabkan mode collapse atau kualitas sampel tidak stabil.

##### Kesalahan Umum

1.  Mengira sampel tajam selalu berarti model lebih baik.
2.  Mengabaikan kualitas latent space.
3.  Tidak memeriksa bias pada sampel generatif.
4.  Menyamakan VAE, GAN, dan diffusion.

##### Mini-check

Jika kamu butuh latent space yang mudah dieksplorasi, kapan VAE lebih masuk akal daripada GAN?

##### Ringkasan

-   Autoencoder memadatkan dan merekonstruksi data.
-   VAE membuat latent space lebih terstruktur.
-   GAN kuat menghasilkan sampel tajam, tetapi perlu stabilitas training.

##### Glossary

Latent space  
Ruang representasi ringkas yang menyimpan faktor penting data.

Generator  
Model yang membuat sampel baru.

Discriminator  
Model yang membedakan sampel asli dan buatan.

##### Referensi

1.  Kingma and Welling, *Auto-Encoding Variational Bayes*, 2013.
2.  Goodfellow et al., *Generative Adversarial Nets*, 2014.
3.  Bengio, Courville, and Vincent, *Representation Learning*, 2013.

## Diffusion Models

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/chapters/chapter-6.html`

Chapter 6 - 35 menit

#### Diffusion Models

Pertanyaan pembuka: bagaimana menyeimbangkan kualitas generasi dan biaya compute?

##### ** Tujuan Pembelajaran

-   Memahami proses noise dan denoising secara konseptual.
-   Menjelaskan mengapa diffusion model kuat untuk sintesis gambar.
-   Menganalisis trade-off inference steps, kualitas, dan biaya.

**

**Konsep Utama.** Diffusion model belajar membalik proses penambahan noise. Saat generasi, model mulai dari noise lalu menguranginya bertahap hingga muncul sampel yang koheren.

##### Inti Konsep

Training diffusion memperlihatkan data bersih yang diberi noise bertahap. Model belajar memprediksi noise atau versi lebih bersih dari data tersebut. Generasi melakukan proses terbalik dari noise menuju sampel.

Kelebihannya adalah kualitas dan stabilitas yang baik. Kekurangannya, generasi sering membutuhkan beberapa langkah denoising sehingga latency dan biaya compute perlu diperhatikan.

Data Bersih**Tambah Noise**Belajar Denoise**Noise**Sampel Baru

**

**Analogi.** Diffusion seperti belajar membersihkan gambar yang makin lama makin buram, lalu memakai kemampuan itu untuk membangun gambar dari kabut noise.

###### Contoh Nyata: image generation

Diffusion banyak dipakai untuk membuat visual dari prompt, inpainting, dan variasi gambar.

###### Contoh Nyata: desain prototipe

Tim produk dapat membuat alternatif visual cepat, tetapi tetap perlu kurasi manusia dan pemeriksaan hak penggunaan.

##### Lebih Teknis

    sample = random_noise()
    for step in denoising_steps:
      predicted_noise = model(sample, step)
      sample = remove_noise(sample, predicted_noise)
    return sample

Lebih banyak denoising steps dapat meningkatkan kualitas, tetapi menambah waktu. Sampler modern mencoba mempercepat proses tanpa merusak kualitas terlalu banyak.

##### Kesalahan Umum

1.  Mengira diffusion hanya untuk gambar.
2.  Mengabaikan biaya inference.
3.  Menyamakan kualitas visual dengan kebenaran konten.
4.  Tidak memeriksa bias dan hak data pelatihan.

##### Mini-check

Jika aplikasi butuh hasil sangat cepat, trade-off apa yang perlu dipikirkan saat memilih diffusion?

##### Ringkasan

-   Diffusion belajar proses denoising bertahap.
-   Kualitas tinggi datang bersama biaya inference.
-   Manusia tetap perlu memeriksa akurasi, bias, dan hak penggunaan.

##### Glossary

Denoising  
Proses mengurangi noise dari data.

Inference steps  
Jumlah langkah generasi saat model membuat sampel.

Sampler  
Metode untuk menjalankan proses generasi diffusion.

##### Referensi

1.  Sohl-Dickstein et al., *Deep Unsupervised Learning using Nonequilibrium Thermodynamics*, 2015.
2.  Ho, Jain, and Abbeel, *Denoising Diffusion Probabilistic Models*, 2020.

## Transformer, LLM, dan Hybrid AI

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/chapters/chapter-7.html`

Chapter 7 - 45 menit

#### Transformer, LLM, dan Hybrid AI

Pertanyaan pembuka: mengapa sistem AI modern sering membutuhkan lebih dari satu model?

##### ** Tujuan Pembelajaran

-   Memahami attention, Transformer, context window, dan LLM secara intuitif.
-   Mengenali kekuatan dan keterbatasan LLM.
-   Merancang arsitektur hybrid untuk kebutuhan produk nyata.

**

**Konsep Utama.** Transformer memakai attention untuk membaca hubungan antartoken. LLM memakai skala data dan parameter untuk menghasilkan bahasa, tetapi produk AI yang aman sering menggabungkan LLM dengan retrieval, rules, tools, dan human oversight.

##### Inti Konsep

Attention membantu model menentukan bagian konteks mana yang relevan saat memproses token. Transformer membuat proses ini dapat diskalakan dan menjadi fondasi banyak LLM modern.

LLM fleksibel untuk bahasa, ringkasan, kode, dan interaksi. Namun LLM tidak otomatis tahu data terbaru, dapat berhalusinasi, dan tidak selalu mengikuti kebijakan secara deterministik. Karena itu arsitektur hybrid sering lebih aman.

User**Policy Rules**Retrieval**LLM**Review + Logging

**

**Analogi.** LLM seperti komunikator cerdas yang butuh arsip, SOP, kalkulator, dan supervisor agar jawaban produk tetap tepat.

###### Contoh Nyata: asisten fellowship

RAG mengambil aturan program, LLM menjelaskan, rule engine menjaga batas kebijakan, dan human review menangani kasus sensitif.

###### Contoh Nyata: agent workflow

LLM dapat memilih tool, tetapi tool schema, izin, logging, dan validasi menjaga tindakan tetap aman.

##### Lebih Teknis

    query = user_input
    policy = check_rules(query)
    context = retrieve_documents(query)
    draft = llm.generate(query, context)
    answer = validate(draft, policy)

Decoder-only model menghasilkan token berikutnya berdasarkan konteks. Context window membatasi jumlah informasi yang dapat dilihat langsung. RAG menambahkan dokumen relevan, tetapi tidak menghapus hallucination sepenuhnya. Guardrail dan orchestration menjaga alur sistem.

##### Kesalahan Umum

1.  Menganggap LLM memahami seperti manusia.
2.  Menganggap parameter lebih banyak selalu lebih baik.
3.  Mengira prompt cukup untuk semua kontrol.
4.  Menganggap RAG menghilangkan hallucination sepenuhnya.
5.  Menganggap hybrid system hanya menambah API.

##### Mini-check

Rancang arsitektur hybrid sederhana untuk asisten fellowship: komponen apa yang rule-based, retrieval, LLM, dan human review?

##### Ringkasan

-   Transformer membuat attention skalabel untuk bahasa dan multimodal.
-   LLM kuat tetapi membutuhkan grounding dan kontrol.
-   Hybrid AI menggabungkan fleksibilitas dengan reliability dan auditability.

##### Glossary

Attention  
Mekanisme untuk memberi bobot pada bagian konteks yang relevan.

Context window  
Batas konteks yang dapat diproses model dalam satu interaksi.

RAG  
Retrieval augmented generation, yaitu mengambil dokumen relevan sebelum generasi jawaban.

##### Referensi

1.  Vaswani et al., *Attention Is All You Need*, 2017.
2.  Brown et al., *Language Models are Few-Shot Learners*, 2020.
3.  McCarthy, *Programs with Common Sense*, 1959.

## Diskusi Evolution of AI

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/diskusi.html`

### Diskusi Evolution of AI

Refleksi dirender oleh shell canonical Evolution of AI.

[Buka diskusi](#/participant-ai-evolution?activity=diskusi)

## Kuis Evolution of AI

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/kuis.html`

### Kuis Evolution of AI

Kuis dirender oleh shell canonical Evolution of AI.

[Buka kuis](#/participant-ai-evolution?activity=kuis)

## Latihan Evolution of AI

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/latihan.html`

### Latihan Evolution of AI

Latihan dirender oleh shell canonical Evolution of AI.

[Buka latihan](#/participant-ai-evolution?activity=latihan)

## materi

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/materi.html`

**

Memuat materi Evolution of AI...

## Konten Dinamis dan Interaktif

> Data berikut diekstrak dari JavaScript runtime untuk `evolution`, termasuk teks yang baru muncul setelah interaksi.

#### MODULES

#### Membaca Evolusi AI

- **slug:** reading-ai-evolution
- **title:** Membaca Evolusi AI
- **summary:** Membaca AI sebagai akumulasi paradigma: aturan, data, reward, generasi, dan sistem hybrid.
- **chapter:** chapter-1.html
- **duration:** 30 menit

#### Symbolic AI dan Expert Systems

- **slug:** symbolic-ai
- **title:** Symbolic AI dan Expert Systems
- **summary:** Fakta, aturan, inference engine, expert system, explanation trace, dan safety layer modern.
- **chapter:** chapter-2.html
- **duration:** 35 menit

#### Machine Learning: Belajar dari Data

- **slug:** learning-from-data
- **title:** Machine Learning: Belajar dari Data
- **summary:** Supervised, unsupervised, feature, label, loss, embedding, overfitting, dan generalization.
- **chapter:** chapter-3.html
- **duration:** 40 menit

#### Reinforcement Learning

- **slug:** reinforcement-learning
- **title:** Reinforcement Learning
- **summary:** Agent, environment, state, action, reward, policy, exploration, exploitation, Q-learning, dan DQN.
- **chapter:** chapter-4.html
- **duration:** 35 menit

#### Autoencoder, VAE, dan GAN

- **slug:** vae-and-gan
- **title:** Autoencoder, VAE, dan GAN
- **summary:** Encoder, decoder, latent space, generator, discriminator, dan trade-off model generatif awal.
- **chapter:** chapter-5.html
- **duration:** 35 menit

#### Diffusion Models

- **slug:** diffusion-models
- **title:** Diffusion Models
- **summary:** Noise, denoising, inference steps, kualitas generasi, dan biaya compute.
- **chapter:** chapter-6.html
- **duration:** 35 menit

#### Transformer, LLM, dan Hybrid AI

- **slug:** transformer-llm-hybrid-ai
- **title:** Transformer, LLM, dan Hybrid AI
- **summary:** Attention, LLM, RAG, tools, guardrail, dan sistem AI hybrid untuk produk nyata.
- **chapter:** chapter-7.html
- **duration:** 45 menit

#### EXERCISES

#### Memasangkan milestone dengan paradigma

- **id:** evo-ex-1
- **module:** reading-ai-evolution
- **title:** Memasangkan milestone dengan paradigma
- **scenario:** Tim onboarding melihat daftar Logic Theorist, Perceptron, Q-learning, GAN, DDPM, dan Transformer.
- **instruction:** Kelompokkan milestone ke paradigma: symbolic, machine learning, reinforcement learning, generative modeling, atau LLM.
- **modelAnswer:** Milestone harus dibaca dari perubahan cara representasi dan sinyal belajar, bukan hafalan tahun.
- **type:** matching

#### Paradigma baru tidak selalu menghapus yang lama

- **id:** evo-ex-2
- **module:** reading-ai-evolution
- **title:** Paradigma baru tidak selalu menghapus yang lama
- **scenario:** Sebuah chatbot memakai LLM tetapi tetap butuh SOP program.
- **instruction:** Jelaskan dua alasan mengapa aturan eksplisit tetap berguna.
- **modelAnswer:** Aturan membantu audit, kebijakan deterministik, dan batas keselamatan yang tidak boleh dinegosiasikan.
- **type:** short

#### Menelusuri rule engine

- **id:** evo-ex-3
- **module:** symbolic-ai
- **title:** Menelusuri rule engine
- **scenario:** Rule engine mengarah ke billing refund jika payment_failed dan refund_requested aktif.
- **instruction:** Tuliskan fakta aktif, aturan yang cocok, kesimpulan, dan explanation trace.
- **modelAnswer:** Trace penting agar keputusan bisa dijelaskan dan diaudit.
- **type:** trace

#### Menyusun aturan triase tiket

- **id:** evo-ex-4
- **module:** symbolic-ai
- **title:** Menyusun aturan triase tiket
- **scenario:** Peserta mengirim tiket login gagal, pembayaran gagal, atau meminta sertifikat.
- **instruction:** Buat minimal tiga aturan IF/AND/THEN untuk triase.
- **modelAnswer:** Aturan yang baik spesifik, mudah dirawat, dan punya fallback saat fakta tidak lengkap.
- **type:** rule

#### Menentukan feature dan label

- **id:** evo-ex-5
- **module:** learning-from-data
- **title:** Menentukan feature dan label
- **scenario:** Tim ingin memprediksi peserta berisiko terlambat mengumpulkan tugas.
- **instruction:** Tentukan contoh feature, label, dan risiko label bias.
- **modelAnswer:** Feature adalah sinyal input; label adalah target. Label historis bisa memuat bias proses lama.
- **type:** classification

#### Memilih supervised atau unsupervised

- **id:** evo-ex-6
- **module:** learning-from-data
- **title:** Memilih supervised atau unsupervised
- **scenario:** Ada data tiket tanpa label kategori, tetapi tim ingin menemukan tema umum.
- **instruction:** Pilih supervised atau unsupervised dan jelaskan alasannya.
- **modelAnswer:** Tanpa label, clustering atau embedding exploration lebih masuk akal sebagai langkah awal.
- **type:** classification

#### Menganalisis overfitting

- **id:** evo-ex-7
- **module:** learning-from-data
- **title:** Menganalisis overfitting
- **scenario:** Akurasi training 99%, validation 62%, dan hasil peserta baru buruk.
- **instruction:** Jelaskan masalah yang paling mungkin dan dua mitigasi.
- **modelAnswer:** Ini sinyal overfitting; mitigasi dapat berupa data validasi lebih baik, regularisasi, fitur lebih relevan, atau model lebih sederhana.
- **type:** case

#### Mengidentifikasi agent, state, action, reward

- **id:** evo-ex-8
- **module:** reinforcement-learning
- **title:** Mengidentifikasi agent, state, action, reward
- **scenario:** Sistem rekomendasi belajar adaptif memilih materi berikutnya untuk peserta.
- **instruction:** Tentukan agent, state, action, reward, dan risiko reward hacking.
- **modelAnswer:** Reward harus mewakili belajar nyata, bukan sekadar klik atau waktu layar.
- **type:** builder

#### Exploration vs exploitation

- **id:** evo-ex-9
- **module:** reinforcement-learning
- **title:** Exploration vs exploitation
- **scenario:** Agent selalu memilih materi yang historis paling sering diklik.
- **instruction:** Jelaskan konsep yang tidak seimbang dan dampaknya.
- **modelAnswer:** Agent terlalu exploitative; eksplorasi diperlukan agar sistem menemukan opsi baru yang mungkin lebih baik.
- **type:** case

#### Encoder, decoder, generator, discriminator

- **id:** evo-ex-10
- **module:** vae-and-gan
- **title:** Encoder, decoder, generator, discriminator
- **scenario:** Tim membandingkan autoencoder, VAE, dan GAN untuk demo generatif.
- **instruction:** Identifikasi komponen yang muncul pada tiap model.
- **modelAnswer:** Autoencoder/VAE memakai encoder-decoder; GAN memakai generator-discriminator.
- **type:** matching

#### Memilih VAE atau GAN

- **id:** evo-ex-11
- **module:** vae-and-gan
- **title:** Memilih VAE atau GAN
- **scenario:** Tim membutuhkan latent space terstruktur untuk eksplorasi variasi desain.
- **instruction:** Pilih VAE atau GAN dan jelaskan trade-off.
- **modelAnswer:** VAE lebih cocok untuk latent space terstruktur; GAN dapat menghasilkan sampel tajam tetapi training bisa lebih sulit.
- **type:** decision

#### Mengurutkan proses diffusion

- **id:** evo-ex-12
- **module:** diffusion-models
- **title:** Mengurutkan proses diffusion
- **scenario:** Peserta harus menjelaskan generasi gambar tanpa rumus.
- **instruction:** Urutkan: tambah noise, belajar denoise, mulai dari noise, denoise bertahap, hasil sampel.
- **modelAnswer:** Urutan inti diffusion adalah forward noising saat training dan reverse denoising saat generasi.
- **type:** sequencing

#### Trade-off inference steps

- **id:** evo-ex-13
- **module:** diffusion-models
- **title:** Trade-off inference steps
- **scenario:** Aplikasi perlu membuat preview visual cepat saat user mengetik prompt.
- **instruction:** Analisis dampak mengurangi jumlah denoising steps.
- **modelAnswer:** Steps lebih sedikit dapat menurunkan latency, tetapi kualitas atau detail bisa turun.
- **type:** case

#### Mengidentifikasi komponen LLM

- **id:** evo-ex-14
- **module:** transformer-llm-hybrid-ai
- **title:** Mengidentifikasi komponen LLM
- **scenario:** Asisten fellowship memakai dokumen program, LLM, rule policy, dan logging.
- **instruction:** Tentukan mana retrieval, LLM, rule-based guardrail, dan observability.
- **modelAnswer:** Hybrid AI membagi tugas: retrieval memberi sumber, LLM merangkai, rules menjaga kebijakan, logging mendukung audit.
- **type:** architecture

#### Menemukan keterbatasan LLM

- **id:** evo-ex-15
- **module:** transformer-llm-hybrid-ai
- **title:** Menemukan keterbatasan LLM
- **scenario:** LLM menjawab percaya diri untuk aturan program yang tidak ada di dokumen.
- **instruction:** Sebutkan keterbatasan dan mitigasi produk.
- **modelAnswer:** Masalahnya hallucination atau grounding lemah; mitigasi: RAG, abstain behavior, rule checks, dan human escalation.
- **type:** case

#### Merancang sistem hybrid

- **id:** evo-ex-16
- **module:** transformer-llm-hybrid-ai
- **title:** Merancang sistem hybrid
- **scenario:** HerAI ingin asisten yang menjawab fleksibel tetapi patuh kebijakan program.
- **instruction:** Rancang arsitektur komponen dari user input sampai jawaban final.
- **modelAnswer:** Arsitektur kuat menggabungkan policy engine, retrieval, LLM, validator, logging, dan human review untuk kasus sensitif.
- **type:** architecture

#### QUIZ

#### Item 1

- **id:** evo-q-1
- **module:** reading-ai-evolution
- **question:** Mengapa paradigma baru tidak selalu menghapus paradigma lama?
##### options

- Karena semua paradigma punya use case, kontrol, dan trade-off berbeda
- Karena teknologi lama selalu lebih akurat
- Karena LLM tidak bisa dipakai
- Karena data tidak pernah penting

- **answer:** 0
- **explanation:** Paradigma lama tetap berguna ketika kebutuhan audit, kontrol, atau struktur eksplisit lebih penting.
- **difficulty:** pemahaman
- **tag:** reading-ai-evolution

#### Item 2

- **id:** evo-q-2
- **module:** reading-ai-evolution
- **question:** Sebuah sistem memakai aturan SOP, embedding search, dan LLM. Cara membaca evolusinya adalah...
##### options

- Hybrid AI yang menggabungkan paradigma
- Pure symbolic AI
- Hanya supervised learning
- Hanya reinforcement learning

- **answer:** 0
- **explanation:** Sistem modern sering menggabungkan representasi dan kontrol berbeda.
- **difficulty:** penerapan
- **tag:** reading-ai-evolution

#### Item 3

- **id:** evo-q-3
- **module:** reading-ai-evolution
- **question:** Ketika membaca timeline AI, fokus terbaik adalah...
##### options

- Tahun yang harus dihafalkan
- Perubahan masalah, pendekatan, dan pengaruhnya
- Jumlah parameter setiap model
- Nama vendor paling populer

- **answer:** 1
- **explanation:** Timeline berguna jika membantu membaca perubahan kemampuan.
- **difficulty:** analisis
- **tag:** reading-ai-evolution

#### Item 4

- **id:** evo-q-4
- **module:** symbolic-ai
- **question:** Organisasi harus mengikuti aturan hukum deterministik dan dapat diaudit. Lapisan apa yang paling tepat?
##### options

- Rule-based policy layer
- GAN
- Diffusion sampler
- Embedding saja

- **answer:** 0
- **explanation:** Aturan eksplisit cocok untuk keputusan yang wajib dapat diaudit.
- **difficulty:** penerapan
- **tag:** symbolic-ai

#### Item 5

- **id:** evo-q-5
- **module:** symbolic-ai
- **question:** Forward chaining berarti...
##### options

- Berangkat dari fakta menuju kesimpulan
- Berangkat dari gambar menuju noise
- Berangkat dari label menuju embedding
- Berangkat dari reward menuju prompt

- **answer:** 0
- **explanation:** Forward chaining menerapkan aturan pada fakta aktif.
- **difficulty:** pemahaman
- **tag:** symbolic-ai

#### Item 6

- **id:** evo-q-6
- **module:** symbolic-ai
- **question:** Keterbatasan expert system yang paling umum adalah...
##### options

- Butuh knowledge engineering dan sulit menangani pengecualian luas
- Tidak bisa menjelaskan keputusan
- Selalu membutuhkan GPU besar
- Tidak bisa memakai aturan

- **answer:** 0
- **explanation:** Expert system kuat tapi perawatannya mahal saat domain berubah.
- **difficulty:** analisis
- **tag:** symbolic-ai

#### Item 7

- **id:** evo-q-7
- **module:** learning-from-data
- **question:** Model sangat bagus pada training tetapi buruk pada data baru. Masalah paling mungkin?
##### options

- Overfitting
- Forward chaining
- Diffusion
- Context window

- **answer:** 0
- **explanation:** Overfitting terjadi saat model terlalu cocok pada data training.
- **difficulty:** penerapan
- **tag:** learning-from-data

#### Item 8

- **id:** evo-q-8
- **module:** learning-from-data
- **question:** Data tiket belum punya label, tetapi tim ingin menemukan kelompok tema. Pendekatan awal yang cocok?
##### options

- Unsupervised learning
- Backward chaining
- Single rule
- Self-play

- **answer:** 0
- **explanation:** Clustering atau embedding exploration cocok saat label belum ada.
- **difficulty:** penerapan
- **tag:** learning-from-data

#### Item 9

- **id:** evo-q-9
- **module:** learning-from-data
- **question:** Label historis perlu diaudit karena...
##### options

- Label dapat memuat bias proses lama
- Label selalu salah
- Label tidak dipakai model
- Label menghapus fitur

- **answer:** 0
- **explanation:** Label sering merefleksikan keputusan manusia atau institusi sebelumnya.
- **difficulty:** analisis
- **tag:** learning-from-data

#### Item 10

- **id:** evo-q-10
- **module:** reinforcement-learning
- **question:** Agent hanya memilih tindakan yang pernah memberi reward tertinggi dan tidak mencoba opsi baru. Konsep yang bermasalah?
##### options

- Exploration vs exploitation
- Latent regularization
- Backward chaining
- Denoising

- **answer:** 0
- **explanation:** Agent terlalu exploitative dan kurang eksplorasi.
- **difficulty:** penerapan
- **tag:** reinforcement-learning

#### Item 11

- **id:** evo-q-11
- **module:** reinforcement-learning
- **question:** Dalam RL, reward sebaiknya...
##### options

- Mewakili tujuan jangka panjang yang benar
- Selalu berupa klik
- Tidak pernah berubah
- Dihapus setelah training

- **answer:** 0
- **explanation:** Reward salah dapat membuat perilaku yang tampak optimal tetapi buruk bagi manusia.
- **difficulty:** analisis
- **tag:** reinforcement-learning

#### Item 12

- **id:** evo-q-12
- **module:** reinforcement-learning
- **question:** Q-value secara konseptual adalah...
##### options

- Perkiraan nilai action pada state
- Jumlah token prompt
- Kualitas gambar
- Aturan IF/THEN

- **answer:** 0
- **explanation:** Q-value membantu agent memilih tindakan berdasarkan nilai yang diperkirakan.
- **difficulty:** pemahaman
- **tag:** reinforcement-learning

#### Item 13

- **id:** evo-q-13
- **module:** vae-and-gan
- **question:** Tim membutuhkan latent space terstruktur. Model mana yang paling masuk akal?
##### options

- VAE
- Rule engine
- DQN
- Pure prompt

- **answer:** 0
- **explanation:** VAE mendorong latent space lebih teratur dan dapat disampling.
- **difficulty:** penerapan
- **tag:** vae-and-gan

#### Item 14

- **id:** evo-q-14
- **module:** vae-and-gan
- **question:** GAN terdiri dari...
##### options

- Generator dan discriminator
- Agent dan environment
- Facts dan rules
- Query dan context window

- **answer:** 0
- **explanation:** GAN melatih generator melawan discriminator.
- **difficulty:** pemahaman
- **tag:** vae-and-gan

#### Item 15

- **id:** evo-q-15
- **module:** vae-and-gan
- **question:** Sampel terlihat tajam tetapi mode variasinya sedikit. Risiko yang mungkin?
##### options

- Mode collapse
- Forward chaining
- Reward hacking
- Data leakage router

- **answer:** 0
- **explanation:** Mode collapse dapat membuat generator menghasilkan variasi terbatas.
- **difficulty:** analisis
- **tag:** vae-and-gan

#### Item 16

- **id:** evo-q-16
- **module:** diffusion-models
- **question:** Inti generasi diffusion adalah...
##### options

- Mulai dari noise lalu denoise bertahap
- Menulis aturan IF/THEN
- Mencari reward tertinggi saja
- Menghapus context window

- **answer:** 0
- **explanation:** Diffusion menjalankan reverse denoising saat generasi.
- **difficulty:** pemahaman
- **tag:** diffusion-models

#### Item 17

- **id:** evo-q-17
- **module:** diffusion-models
- **question:** Mengurangi inference steps biasanya berdampak pada...
##### options

- Latency turun tetapi kualitas bisa turun
- Audit trail otomatis muncul
- Model menjadi symbolic
- Reward menjadi sempurna

- **answer:** 0
- **explanation:** Fewer steps mempercepat generasi, tetapi trade-off kualitas perlu diuji.
- **difficulty:** penerapan
- **tag:** diffusion-models

#### Item 18

- **id:** evo-q-18
- **module:** diffusion-models
- **question:** Kualitas visual tinggi belum cukup karena...
##### options

- Factuality, bias, hak penggunaan, dan konteks tetap perlu diperiksa
- Gambar selalu salah
- Diffusion tidak bisa dipakai
- Compute tidak penting

- **answer:** 0
- **explanation:** Output generatif tetap perlu evaluasi produk dan risiko.
- **difficulty:** analisis
- **tag:** diffusion-models

#### Item 19

- **id:** evo-q-19
- **module:** transformer-llm-hybrid-ai
- **question:** Aplikasi butuh jawaban fleksibel tetapi harus patuh kebijakan pasti. Arsitektur paling tepat?
##### options

- Hybrid: rules, retrieval, LLM, validator
- LLM tanpa sumber
- GAN saja
- K-means saja

- **answer:** 0
- **explanation:** Hybrid menggabungkan fleksibilitas LLM dan kontrol eksplisit.
- **difficulty:** penerapan
- **tag:** transformer-llm-hybrid-ai

#### Item 20

- **id:** evo-q-20
- **module:** transformer-llm-hybrid-ai
- **question:** RAG membantu LLM dengan...
##### options

- Mengambil dokumen relevan sebagai konteks
- Menghilangkan semua hallucination secara pasti
- Mengubah reward
- Mengganti semua aturan

- **answer:** 0
- **explanation:** RAG memberi grounding, tetapi tetap perlu evaluasi dan guardrail.
- **difficulty:** pemahaman
- **tag:** transformer-llm-hybrid-ai

#### Item 21

- **id:** evo-q-21
- **module:** transformer-llm-hybrid-ai
- **question:** LLM menjawab aturan yang tidak ada di dokumen. Mitigasi paling tepat?
##### options

- Grounding, abstain behavior, rule checks, dan eskalasi manusia
- Menambah warna UI
- Menghapus retrieval
- Menambah inference steps diffusion

- **answer:** 0
- **explanation:** Masalah grounding perlu mitigasi sistem, bukan sekadar prompt.
- **difficulty:** analisis
- **tag:** transformer-llm-hybrid-ai

#### DISCUSSIONS

- **reading-ai-evolution:** Apakah teknologi AI baru selalu membuat pendekatan lama tidak berguna? Beri satu contoh produk.
- **symbolic-ai:** Kapan aturan eksplisit lebih tepat daripada model statistik pada sistem peserta fellowship?
- **learning-from-data:** Apakah data dapat menggantikan pengetahuan manusia sepenuhnya? Kapan human review tetap perlu?
- **reinforcement-learning:** Apa risiko ketika reward tidak mewakili tujuan manusia?
- **vae-and-gan:** Mengapa kualitas sampel tinggi belum tentu berarti model mudah dikontrol?
- **diffusion-models:** Bagaimana menyeimbangkan kualitas generasi dan biaya compute dalam produk nyata?
- **transformer-llm-hybrid-ai:** Mengapa sistem AI modern sering membutuhkan lebih dari satu model atau satu paradigma?
