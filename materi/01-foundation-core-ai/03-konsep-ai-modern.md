# Konsep AI Modern

> Ekspor lengkap dari sumber materi HerAI yang tersedia di repository.
> Mencakup materi, latihan, kuis, diskusi, pembahasan, versi legacy, dan/atau data interaktif bila tersedia.

## Foundation Models: Fondasi AI Serbaguna

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/chapters/01-materi.html`

Topik 1 · 25 menit

#### Foundation Models: Fondasi AI Serbaguna

Foundation model bukan aplikasi final. Ia adalah model dasar yang dapat diadaptasi menjadi chatbot, assistant, search system, coding helper, evaluator, atau workflow lain.

**Tujuan pembelajaran**

-   Menjelaskan perbedaan task-specific model, pretrained model, foundation model, dan AI application.
-   Membedakan pretraining, adaptation, fine-tuning, prompting, RAG, dan tool augmentation.
-   Membaca trade-off API-hosted, open-weight hosted, dan local/on-device model.
-   Memilih model berdasarkan kebutuhan, bukan popularitas.

**

**Pertanyaan pemantik:** Jika sebuah model dapat merangkum, menerjemahkan, membuat kode, dan menjawab pertanyaan, bagian mana yang sebenarnya model, dan bagian mana yang sudah menjadi sistem aplikasi?

Task-specific model
Satu tugas ** Pretrained model
Representasi umum ** Foundation model
Bisa diadaptasi ** AI application
Model + data + tools + UI

**Task-specific model** dilatih untuk satu tugas sempit, misalnya mendeteksi spam. **Pretrained model** mempelajari representasi umum dari data luas. **Foundation model** adalah model yang dilatih pada data besar dan dapat diadaptasi ke banyak tugas. Sementara itu, **AI application** adalah sistem lengkap: foundation model, prompt, dokumen, tools, workflow, interface, evaluasi, dan manusia yang mengawasi.

Kesalahan umum adalah menyamakan foundation model dengan chatbot. Chatbot hanyalah salah satu bentuk aplikasi di atas foundation model. Model dasarnya bisa sama, tetapi aplikasi yang dibangun di atasnya dapat sangat berbeda.

##### Pretraining dan Adaptation

Data luasPretrainingBase modelAdaptationAI application

Pretraining biasanya memakai *self-supervised learning*: model belajar dari pola data tanpa label manual satu per satu. Pada language model, contoh paling populer adalah **next-token prediction**, yaitu menebak token berikutnya. Pada sebagian model pemahaman bahasa, konsep seperti **masked modeling** dipakai untuk menebak token yang sengaja disembunyikan.

###### Instruction tuning

Mengajari model mengikuti format instruksi manusia, bukan hanya melanjutkan teks.

###### Fine-tuning

Melatih model pada dataset domain tertentu agar perilakunya lebih sesuai kebutuhan.

###### Preference optimization

Menggunakan preferensi manusia atau evaluator untuk membuat output lebih disukai dan aman.

###### Prompting, RAG, tools

Mengubah konteks dan kemampuan sistem tanpa selalu mengubah bobot model.

**

**Analogi sederhana**

Foundation model seperti bahan baku serbaguna. Prompting adalah instruksi penggunaan, RAG adalah buku referensi yang dibuka saat bekerja, fine-tuning adalah pelatihan tambahan, dan aplikasi adalah produk yang akhirnya digunakan peserta.

##### Scale, Data, Compute, dan Capability

Kemampuan model dipengaruhi oleh jumlah parameter, jumlah dan kualitas token, compute, arsitektur, post-training, inference-time compute, dan evaluasi. Model besar sering kuat, tetapi tidak otomatis paling tepat. Untuk chatbot fellowship, model lebih kecil dengan retrieval dokumen resmi, evaluasi yang baik, dan guardrail sering lebih berguna daripada model besar yang tidak memahami kebijakan internal.

**Model lebih besar**Bisa lebih fleksibel, tetapi biaya dan latency naik.

**Data lebih relevan**Membantu domain spesifik dan bahasa lokal.

**Post-training kuat**Membuat model lebih patuh instruksi dan aman.

**Evaluasi matang**Mencegah keputusan hanya berdasar demo yang terlihat lancar.

##### Modalitas dan Pilihan Deployment

Foundation model tidak hanya teks. Ada language model, vision model, speech/audio model, vision-language model, multimodal model, embedding model, image generation model, dan video generation model. Pilihan model perlu mengikuti input-output sistem, risiko, biaya, latency, dan kebutuhan data.

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Dimensi
API-hosted
Open-weight hosted
Local/on-device</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Setup
Cepat
Menengah
Paling teknis</td>
<td align="left">Kontrol
Terbatas
Lebih besar
Paling besar</td>
<td align="left">Privasi
Tergantung kontrak
Bisa dikontrol
Data dapat tetap lokal</td>
<td align="left">Biaya
Per penggunaan
Provider/infra
Hardware sendiri</td>
</tr>
</tbody>
</table>

**Catatan:** open-weight tidak otomatis berarti data training, metode alignment, dan proses development sepenuhnya terbuka. Baca lisensi dan model card sebelum memakai model.

##### Model Cards dan Studi Platform

Model card membantu membaca intended use, out-of-scope use, language coverage, benchmark, limitations, license, hardware requirement, context window, dan safety notes. OpenAI, Anthropic, dan Gemini dapat dipahami sebagai contoh platform API-hosted; Meta Llama sebagai keluarga open-weight; Hugging Face Hub sebagai ekosistem discovery/model card; Ollama sebagai pengalaman menjalankan model lokal. Ini bukan promosi vendor, melainkan peta keputusan.

> "We call these models foundation models." Bommasani et al., 2021

Kutipan ini menekankan bahwa model fondasi menjadi basis banyak sistem. Karena basisnya sama, kemampuan dan risiko seperti bias, batas bahasa, atau ketergantungan vendor juga dapat terbawa ke aplikasi turunan.

Belajar Aktif

##### Quick Check: model atau sistem?

Sebuah universitas memakai model bahasa melalui API, menambahkan dokumen akademik lewat retrieval, lalu membangun dashboard mahasiswa. Mana foundation model dan mana AI system?

Tampilkan feedback

Foundation model adalah model bahasa yang dipanggil lewat API. AI system adalah kombinasi API, retrieval dokumen akademik, dashboard, aturan akses, evaluasi, logging, dan human support.

##### Mini Challenge

Buat model selection matrix untuk chatbot layanan fellowship. Pakai kriteria: Bahasa Indonesia, privasi data, biaya, latency, tool calling, deployment lokal, dan kemudahan evaluasi. Lanjutkan di latihan nomor 3 untuk mengisi matriks lebih lengkap.

****Common mistakes:** memilih model karena sedang populer, mengabaikan lisensi, menganggap open-weight selalu aman, dan tidak menguji bahasa Indonesia.

**Ringkasan:** foundation model adalah bahan dasar serbaguna; aplikasi AI modern membutuhkan data, tools, evaluasi, interface, dan human oversight.

Foundation model  
Model dasar yang dapat diadaptasi ke banyak tugas.

RAG  
Retrieval-Augmented Generation, teknik memberi sumber eksternal saat model menjawab.

Model card  
Dokumen ringkas tentang penggunaan, batasan, evaluasi, dan lisensi model.

**Referensi:** Bommasani et al. (2021), Brown et al. (2020), Hoffmann et al. (2022), Meta Llama model cards, Hugging Face Hub documentation.

[Lanjut ke Transformer **](javascript:void(0))

## Transformer: Mesin di Balik Model Modern

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/chapters/02-materi.html`

Topik 2 · 30 menit

#### Transformer: Mesin di Balik Model Modern

Transformer membuat model modern dapat membaca relasi antar token secara paralel, menjaga konteks, dan menghasilkan output token demi token.

**Tujuan pembelajaran**

-   Menjelaskan token, embedding, positional information, attention, dan feed-forward network.
-   Membedakan encoder, decoder, dan encoder-decoder.
-   Memahami context window, generation controls, KV cache, dan batas attention.

**

**Pertanyaan pemantik:** Mengapa model modern bisa menghubungkan kata yang berjauhan dalam prompt panjang, tetapi tetap bisa kehilangan fakta penting di tengah konteks?

Pada pendekatan sekuensial lama, urutan kata dibaca langkah demi langkah. Ini membuat konteks jauh sulit dipertahankan dan training sulit diparalelkan. Transformer mengubah fokusnya: setiap token dapat menimbang hubungan dengan token lain melalui attention.

**

**Analogi forum diskusi**

Saat membaca thread panjang, kamu tidak membaca semua komentar dengan bobot sama. Kamu mencari siapa bertanya apa, jawaban mana yang relevan, dan detail mana yang mengubah makna. Attention bekerja mirip: memberi bobot berbeda pada informasi di konteks.

##### Tokenization, Embedding, dan Posisi

**Token** bukan selalu kata. Kalimat Indonesia seperti "Peserta fellowship mengunggah ulang tugasnya" bisa dipecah secara ilustratif menjadi potongan seperti \`Peserta\`, \` fellowship\`, \` meng\`, \`unggah\`, \` ulang\`, \` tugas\`, \`nya\`. Hasil persis bergantung tokenizer model.

Teks**Token ID**Embedding vector**Attention context**Output token

Embedding mengubah token ID menjadi vektor yang membawa representasi makna. Token embedding di dalam model berbeda dari embedding model untuk retrieval; embedding retrieval biasanya dipakai untuk mencari dokumen dengan kemiripan semantik.

Attention sendiri tidak otomatis tahu urutan. Karena itu model menambahkan positional information melalui positional encoding, learned position embedding, atau rotary position embedding. Detail matematisnya berbeda, tetapi tujuannya sama: memberi petunjuk urutan.

##### Query, Key, Value, dan Multi-Head Attention

TokenQuery: apa yang dicari?Key: informasi apa yang tersedia?Value: isi informasiAttention scoreWeighted context

``` {.ai-modern-code}
Attention(Q, K, V) = softmax(QK^T / sqrt(d)) V
```

Q adalah pertanyaan yang dibawa token, K adalah label informasi yang dimiliki token lain, V adalah isi yang akan diambil, dan \`softmax\` mengubah skor menjadi bobot. Multi-head attention menjalankan beberapa pola attention sekaligus. Namun, jangan menganggap setiap head selalu punya fungsi linguistik yang jelas; sering kali perilakunya tersebar dan sulit diberi nama sederhana.

Input embeddingSelf-attentionResidual + normalizationFeed-forward networkResidual + normalizationLayer output

##### Encoder, Decoder, dan Autoregressive Generation

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Arsitektur
Cocok untuk
Contoh penggunaan</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Encoder-style
Understanding dan embedding
Klasifikasi, NER, retrieval</td>
<td align="left">Decoder-style
Autoregressive generation
Chat, coding, structured output</td>
<td align="left">Encoder-decoder
Sequence-to-sequence
Translasi, summarization tertentu</td>
</tr>
</tbody>
</table>

PromptPrediksi token berikutnyaToken ditambahkanPrediksi berikutnyaStop condition

Generation controls mengubah karakter output. Temperature rendah membuat output lebih stabil; top-p rendah membatasi pilihan token; stop sequence menghentikan output pada pola tertentu; structured output memaksa format agar mudah diproses sistem.

##### Context Window Bukan Long-Term Memory

Context window adalah batas token yang dapat diproses dalam satu request. Ia bukan memori jangka panjang. Riwayat percakapan, retrieval, summarization, session memory, database, dan user profile tetap perlu dirancang eksplisit. Context panjang juga punya biaya: latency, token cost, dan risiko informasi penting tenggelam di tengah.

****Keterbatasan:** attention cost, hallucination, lost-in-the-middle, data staleness, sensitivity terhadap prompt, dan model tidak otomatis memiliki database atau tools terbaru.

##### Studi Platform dan Kutipan

Hugging Face Transformers membantu mempelajari tokenizer, pipeline, pretrained models, \`generate\`, inference, dan training. API-hosted platform berguna untuk memahami workflow generation tanpa mengelola bobot model sendiri, tetapi jangan pernah menaruh API key atau secret di frontend.

> "dispensing with recurrence and convolutions entirely" Vaswani et al., 2017

Maknanya: Transformer mengurangi ketergantungan pada pembacaan urutan langkah demi langkah dan convolution, lalu mengandalkan attention sebagai mekanisme utama.

Belajar Aktif

##### Quick Check: bobot attention

Pada kalimat "Mentor mengirim jadwal kepada peserta karena mereka meminta revisi", token "mereka" sebaiknya memberi perhatian besar ke bagian mana?

Tampilkan feedback

Jawaban kuat mengaitkan "mereka" dengan "peserta" dan konteks "meminta revisi", bukan sekadar token paling dekat. Attention membantu model menimbang relasi seperti ini.

##### Mini Challenge

Bandingkan dua konfigurasi generation: A memakai temperature rendah dan top-p rendah; B memakai temperature lebih tinggi dan top-p lebih luas. Prediksi hasilnya untuk ringkasan kebijakan, caption kreatif, dan jawaban faktual.

**Ringkasan:** Transformer mengubah token menjadi representasi, menimbang relasi melalui attention, lalu menghasilkan output dengan kontrol generation. Kekuatan ini tetap punya batas biaya, konteks, dan reliability.

Token  
Potongan teks yang diproses model.

Attention  
Mekanisme pembobotan hubungan antar token.

Context window  
Batas token yang dapat dibaca dalam satu request.

**Referensi:** Vaswani et al. (2017), Hugging Face Transformers documentation, Brown et al. (2020).

[Lanjut ke AI Agents **](javascript:void(0))

## AI Agents: Dari Model yang Menjawab ke Sistem yang Bertindak

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/chapters/03-materi.html`

Topik 3 · 30 menit

#### AI Agents: Dari Model yang Menjawab ke Sistem yang Bertindak

Agent AI mengubah model dari mesin respons menjadi sistem yang dapat memilih tindakan, memakai tool, memperbarui state, dan berhenti saat tujuan tercapai.

**Tujuan pembelajaran**

-   Membedakan model call, chatbot, workflow, agent, dan multi-agent.
-   Memahami agent loop, tool schema, state, memory, handoff, dan human approval.
-   Mengenali kegagalan tool use dan risiko autonomy.

**

**Pertanyaan pemantik:** Jika tugas harus membaca formulir, mengecek jadwal, membuat draft pesan, dan meminta approval staf, bagian mana yang harus deterministic workflow dan bagian mana yang boleh memakai agent?

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Bentuk sistem
Karakteristik
Kapan dipakai</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Model call
Satu input, satu output
Tugas sederhana dan stateless</td>
<td align="left">Chatbot
Model call dengan conversation state
Percakapan tanya jawab</td>
<td align="left">Workflow
Langkah ditentukan developer
Proses patuh aturan dan berulang</td>
</tr>
</tbody>
</table>

Tidak semua aplikasi AI memerlukan agent. Untuk proses sensitif seperti mengubah status peserta, workflow deterministik dengan approval manusia lebih aman daripada agent bebas.

##### Agent Loop

GoalObserve contextDecide actionCall tool / respondReceive resultUpdate stateCheck completion

Agent loop harus punya stopping condition. Tanpa batas iterasi, budget, atau kriteria selesai, agent bisa mengulang tool call, menghabiskan biaya, atau melakukan tindakan yang tidak perlu.

**

**Analogi sederhana**

Agent seperti asisten operasional. Ia membaca tujuan, melihat data yang tersedia, memilih alat, mencatat hasil, lalu memutuskan apakah tugas selesai atau harus eskalasi ke manusia.

##### Tools dan Function Calling

Tool yang baik perlu nama jelas, deskripsi, JSON schema, parameter wajib, validasi, error handling, idempotency, authorization, dan audit log. Tool call bukan jaminan jawaban benar; agent masih bisa salah memilih tool, mengisi parameter salah, mengabaikan error, atau membaca hasil secara keliru.

``` {.ai-modern-code}
{
  "name": "get_fellowship_schedule",
  "description": "Mengambil jadwal fellowship berdasarkan tanggal",
  "parameters": {
    "type": "object",
    "properties": {
      "date": {
        "type": "string",
        "description": "Tanggal dengan format YYYY-MM-DD"
      }
    },
    "required": ["date"]
  }
}
```

Contoh ini hanya simulasi schema. Jangan membuat request provider atau menyimpan secret langsung dari frontend.

##### Planning, State, Memory, dan Handoff

###### Fixed workflow

Aman untuk proses yang harus konsisten, misalnya validasi field wajib.

###### Model-generated plan

Berguna untuk tugas terbuka, tetapi perlu batas dan review.

###### Dynamic replanning

Agent mengubah rencana setelah menerima hasil tool.

###### Planner-executor

Satu komponen membuat rencana, komponen lain mengeksekusi langkah.

State dan memory mencakup conversation context, short-term state, long-term memory, user profile, database eksternal, vector retrieval, dan artifact/file state. Privasi, retention, consent, dan stale memory harus dijelaskan pada user.

Multi-agent dapat memakai manager agent, specialist agent, agent-as-tool, sequential collaboration, atau parallel collaboration. Namun multi-agent tidak otomatis lebih baik; biaya, koordinasi, debugging, dan observability menjadi lebih sulit.

##### Guardrails, Human-in-the-Loop, dan Observability

**Butuh approval**Mengirim email massal, menghapus data, transaksi, mengubah status peserta, publikasi pengumuman.

**Guardrail**Input validation, output validation, tool permission, spending limit, scope restriction.

**Observability**Tracing, tool-call logs, latency, token usage, task success, recovery rate.

**Recovery**Fallback, retry terbatas, escalation, rollback, human review.

> "reasoning and acting" Yao et al., 2022

Maknanya: agent menghubungkan proses berpikir dengan tindakan. Karena tindakannya bisa berdampak nyata, governance dan approval bukan tambahan kosmetik.

##### Studi Platform Agent

OpenAI Agents SDK dapat dipahami lewat konsep agents, tools, handoffs, guardrails, sessions, tracing, dan human-in-the-loop. Anthropic tool use menekankan structured tool call, tool result round trip, schema, tool choice, serta MCP untuk integrasi context/tool. Google ADK menekankan tool-enabled agents, graph workflow, sequential/loop/parallel workflow, sessions, memory, evaluation, observability, dan deployment. LangChain/LangGraph membantu memodelkan state, middleware, guardrail, human-in-the-loop, dan explicit graph untuk workflow kompleks.

****Common mistakes:** menjadikan semua workflow sebagai agent, memberi tool berbahaya tanpa approval, tidak mencatat trace, dan tidak membedakan memory jangka pendek dengan database resmi.

Belajar Aktif

##### Quick Check: workflow atau agent?

Sistem membaca formulir, memvalidasi kelengkapan, meminta approval staf, lalu mengirim pemberitahuan. Pilih bagian deterministic dan bagian agentic.

Tampilkan feedback

Validasi field, approval, dan pengiriman final sebaiknya deterministic. Model/agent cocok untuk ekstraksi isi formulir, menyusun draft pesan, menjelaskan kekurangan, atau memilih tool pembantu dengan batas izin.

##### Mini Challenge

Rancang agent layanan fellowship dengan satu goal, dua tools, tool schema, stopping condition, satu guardrail, satu approval manusia, dua failure modes, dan logging yang dibutuhkan. Latihan nomor 7 dan 8 akan membantumu menyusunnya lebih lengkap.

**Ringkasan:** agent berguna saat tugas dinamis membutuhkan tool dan keputusan bertahap, tetapi workflow deterministik tetap lebih aman untuk proses yang berdampak langsung.

Tool calling  
Mekanisme model meminta sistem menjalankan fungsi eksternal.

State  
Kondisi kerja yang dipakai agent untuk melanjutkan tugas.

Handoff  
Perpindahan tugas ke agent lain atau manusia.

**Referensi:** Yao et al. (2022), Schick et al. (2023), OpenAI Agents SDK documentation, Anthropic tool use documentation, Google ADK documentation, LangGraph documentation.

[Lanjut ke Sistem AI Masa Kini **](javascript:void(0))

## Sistem AI Masa Kini: Model, Data, Tools, Infrastruktur, dan Human Oversight

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/chapters/04-materi.html`

Topik 4 · 35 menit

#### Sistem AI Masa Kini: Model, Data, Tools, Infrastruktur, dan Human Oversight

Sistem AI modern tidak dinilai dari modelnya saja. Kualitasnya lahir dari arsitektur end-to-end: context, retrieval, tools, guardrails, evaluation, infrastructure, dan proses manusia.

**Tujuan pembelajaran**

-   Membaca arsitektur end-to-end sistem AI modern.
-   Membedakan model layer, context layer, retrieval, tools, orchestration, evaluation, dan infrastructure.
-   Merancang sistem dengan safety, privacy, cost, latency, reliability, dan human oversight.

**

**Pertanyaan pemantik:** Jika modelnya kuat tetapi API key bocor di frontend, retrieval salah sumber, dan tidak ada approval untuk tool berbahaya, apakah sistemnya layak dipakai?

``` {.ai-modern-code}
Modern AI System =
Model
+ Instructions
+ Context
+ Retrieval
+ Tools
+ State
+ Guardrails
+ Evaluation
+ Infrastructure
+ Human Oversight
```

Model adalah komponen penting, tetapi bukan seluruh sistem. Aplikasi production harus mengatur siapa yang boleh mengakses data, sumber mana yang boleh diambil, tool apa yang bisa dijalankan, bagaimana output divalidasi, kapan manusia harus menyetujui, dan bagaimana insiden dicatat.

##### End-to-End Architecture

User InterfaceAPI / BackendAuth & PolicyPrompt / Context BuilderModel GatewayRetrieval / ToolsOutput ValidationHuman ApprovalResponseLogs / Traces / Evaluation

**Context engineering** mengatur system instruction, user input, retrieved documents, tool results, conversation history, memory, examples, context prioritization, token budget, dan batas prompt injection. Context bukan tempat membuang semua data; ia perlu prioritas.

**

**Analogi sederhana**

Model seperti konsultan pintar. Sistem AI modern adalah kantor lengkap: resepsionis, arsip, aturan akses, alat kerja, supervisor, catatan kerja, dan proses audit.

##### Retrieval-Augmented Generation secara Proporsional

DocumentsChunkingEmbeddingsVector indexRetrievalContext assemblyGenerationCitation

RAG berguna ketika pengetahuan sering berubah, perlu sumber eksplisit, atau data internal tidak ada dalam training model. Namun untuk data terstruktur seperti status pembayaran atau jadwal spesifik, query database biasa sering lebih tepat daripada vector retrieval.

**Retrieval quality**Chunking, metadata, reranking, dan access control menentukan dokumen yang masuk konteks.

**Grounding**Jawaban harus menunjukkan sumber, bukan sekadar terdengar yakin.

**Stale index**Dokumen berubah tetapi index belum diperbarui dapat membuat jawaban salah.

**Prompt injection**Dokumen yang diambil bisa membawa instruksi jahat dan harus dibatasi.

##### Model Routing, Caching, Evaluation, dan Observability

Model routing memilih model berdasarkan tugas: cepat vs capable, text vs vision, hosted vs local, fallback, cost-aware routing, dan risk-aware routing. Confidence bukan satu-satunya dasar routing; risiko tindakan dan kebutuhan audit juga penting.

Caching dapat berupa response cache, embedding cache, prompt cache, semantic cache, streaming, batching, atau parallel tool calls. Tujuannya menurunkan latency dan biaya, tetapi cache yang salah bisa menyajikan jawaban usang.

Evaluation dan observability menghubungkan module ini dengan module Evaluation: offline eval, pre-deployment test, production monitoring, trace, user feedback, incident review, drift, regression, cost monitoring, dan safety event.

> "manage risks and promote trustworthy AI" NIST, 2023

Maknanya: sistem AI modern harus dirancang sebagai sistem risiko, bukan hanya demo model.

##### Security, Privacy, dan Deployment Patterns

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Pola deployment
Kelebihan
Risiko</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Managed API
Setup cepat, scaling dan maintenance model lebih ringan
Vendor dependency, governance data, biaya variabel</td>
<td align="left">Managed cloud AI platform
Model catalog, agent service, retrieval, governance, observability
Kompleksitas cloud, region, integrasi enterprise</td>
<td align="left">Self-hosted inference
Kontrol infra dan data lebih besar
GPU, serving, autoscaling, patching, security</td>
</tr>
</tbody>
</table>

****Security baseline:** jangan simpan API key di frontend, gunakan least privilege, redaksi PII, retention policy, logging sensitif, tenant isolation, tool permission, dan approval untuk side effect.

##### Multimodal, Human Oversight, dan Failure Taxonomy

Sistem multimodal dengan teks, gambar, audio, video, atau dokumen membutuhkan preprocessing, validation khusus modalitas, storage, latency budget, dan accessibility. Gambar bisa butuh OCR; audio butuh transkripsi; dokumen butuh parsing; video butuh sampling frame.

**Human-in-the-loop**Manusia menyetujui sebelum aksi penting dilakukan.

**Human-on-the-loop**Sistem berjalan, manusia memantau dan bisa intervensi.

**Human-out-of-the-loop**Sistem otomatis penuh; hanya cocok untuk risiko rendah dan terukur.

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Layer
Contoh kegagalan</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Input
Data tidak lengkap</td>
<td align="left">Prompt
Instruksi ambigu</td>
</tr>
</tbody>
</table>

##### Studi Kasus Akhir

Bangun AI assistant fellowship yang menjawab pertanyaan peserta, membaca pedoman internal, mengecek jadwal, dan membantu membuat draft pesan. Sistem tidak boleh mengubah data peserta atau mengirim pesan tanpa approval staf.

###### Komponen

UI, backend, auth, context builder, model gateway, retrieval, tools, validation, logs.

###### Permission

Read-only untuk jadwal; draft-only untuk pesan; approval wajib untuk pengiriman.

###### Evaluation

Factuality, groundedness, latency, cost, tool success, safety event.

###### Fallback

Jika sumber tidak ditemukan, jawab tidak tahu dan eskalasi ke staf.

Belajar Aktif

##### Quick Check: cari bottleneck

Arsitektur memiliki API key di frontend, satu model untuk semua tugas, retrieval tanpa access control, tool delete tanpa approval, tanpa logging, dan tanpa evaluation set. Apa risikonya?

Tampilkan feedback

Risikonya mencakup kebocoran secret, biaya tidak terkendali, akses data salah, tindakan destruktif tanpa approval, tidak bisa audit insiden, dan regression tidak terdeteksi.

##### Mini Challenge

``` {.ai-modern-code}
Use case:
Model approach:
Hosted/open/local:
Retrieval:
Tools:
Human approval:
Privacy:
Evaluation:
Observability:
Cost controls:
Failure fallback:
```

**Ringkasan:** sistem AI modern adalah susunan komponen teknis dan manusia. Model kuat tetap membutuhkan security, retrieval, tools, evaluasi, observability, dan approval gate.

Context engineering  
Pengaturan konteks yang diberikan ke model.

Model gateway  
Layer yang memilih dan memanggil model sesuai tugas.

Human oversight  
Peran manusia dalam approval, monitoring, dan escalation.

**Referensi:** Lewis et al. (2020), Liang et al. (2022), NIST AI RMF (2023), AWS Bedrock documentation, Microsoft/Azure AI documentation, NVIDIA NIM documentation, Ollama documentation.

[Lanjut ke Latihan **](#/participant-ai-modern-practice)

## Forum Pertanyaan AI Modern

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/diskusi.html`

Discussion Board

#### Forum Pertanyaan AI Modern

Pilih prompt atau tulis posisi sendiri. Posting dan balasan tersimpan secara lokal di browser ini.

Prompt diskusi Foundation model sebagai infrastruktur bersama Transformer dan batas context Agent autonomy Sistem AI untuk fellowship Tulis posting diskusi

Posting akan tersimpan di browser ini.

** Posting Diskusi

## Kuis AI Modern

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/kuis.html`

Knowledge Check

#### Kuis AI Modern

Pilih satu jawaban paling tepat. Setelah dikirim, attempt dikunci dan seluruh pembahasan terbuka untuk review.

** Kirim & Kunci Jawaban

## Desain Sistem AI Modern

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/latihan.html`

Practice Lab

#### Desain Sistem AI Modern

Kerjakan satu skenario pada satu waktu. Progres dan jawaban dapat disimpan di browser ini.

0/13 latihan terisi

##### Simpan Latihan

Jawaban akan tersimpan di browsermu.

** Simpan Jawaban

** Edit

** Hapus

## materi

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/materi.html`

**

Memuat kurikulum AI Modern...

** Topik Sebelumnya

Topik Selanjutnya **

[Lanjut ke Latihan AI Modern **](#/participant-ai-modern-practice)

## Konten Dinamis dan Interaktif

> Data berikut diekstrak dari JavaScript runtime untuk `modern`, termasuk teks yang baru muncul setelah interaksi.

#### CHAPTERS

#### Foundation Models: Fondasi AI Serbaguna

- **title:** Foundation Models: Fondasi AI Serbaguna
- **shortTitle:** Foundation Models
- **duration:** 25 menit
- **icon:** fas fa-layer-group
- **summary:** Bedakan model dasar, adaptation layer, dan aplikasi AI agar keputusan model tidak berhenti pada nama vendor.
##### objectives

- Membedakan model dasar dan aplikasi AI
- Membaca trade-off deployment
- Memilih model dengan kriteria terukur

- **analogy:** Foundation model adalah bahan baku; prompt, RAG, tools, evaluasi, dan UI mengubahnya menjadi produk yang berguna.
##### hook

- **question:** Tim punya model paling populer. Apakah itu sudah cukup untuk membangun assistant fellowship?
###### answerA

- **label:** Sudah cukup
- **text:** Model kuat akan menyelesaikan seluruh kebutuhan produk.
- **icon:** fas fa-wand-magic-sparkles

###### answerB

- **label:** Belum cukup
- **text:** Kita masih perlu context, data, tools, evaluasi, UI, dan pengawasan.
- **icon:** fas fa-diagram-project

- **message:** Model adalah komponen inti, tetapi nilai dan risiko nyata muncul dari sistem end-to-end yang dibangun di sekelilingnya.

##### flow

##### Item 1

- Kebutuhan
- Definisikan tugas dan risiko

##### Item 2

- Kandidat
- Bandingkan model dan deployment

##### Item 3

- Uji
- Evaluasi bahasa, biaya, latency

##### Item 4

- Pilih
- Dokumentasikan trade-off

##### quickCheck

- **question:** Universitas memakai model API, retrieval dokumen akademik, dan dashboard mahasiswa. Mana yang disebut AI application?
###### options

- Model API saja
- Retrieval saja
- Gabungan model, retrieval, workflow, UI, evaluasi, dan oversight

- **answer:** 2
- **explanationCorrect:** Tepat. Aplikasi AI adalah keseluruhan sistem yang mengubah kemampuan model menjadi layanan.
- **explanationWrong:** Belum tepat. Cari jawaban yang mencakup model beserta data, workflow, interface, evaluasi, dan pengawasan.

##### challenge

- **instruction:** Tulis tiga kriteria terpenting untuk memilih model assistant fellowship dan jelaskan mengapa masing-masing dapat diuji.
- **placeholder:** Contoh: Bahasa Indonesia — diuji dengan 30 pertanyaan peserta yang mewakili variasi bahasa...
- **example:** Bahasa Indonesia diuji dengan eval set lokal; privasi diuji dari alur data dan kontrak provider; biaya diuji sebagai cost per successful task.

##### mistakes

- Memilih model karena popularitas
- Menganggap open-weight selalu aman
- Mengabaikan lisensi dan language coverage

##### bestPractices

- Mulai dari use case dan risiko
- Bandingkan dengan decision matrix
- Uji pada data yang mewakili pengguna nyata

##### learningOutcomes

- Menjelaskan batas model dan aplikasi
- Membaca model card
- Membuat keputusan deployment yang dapat dipertanggungjawabkan

- **transition:** Setelah tahu apa yang dipilih, kita bongkar mesin yang membuat model modern mampu memahami konteks.
- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/chapters/01-materi.html

#### Transformer: Mesin di Balik Model Modern

- **title:** Transformer: Mesin di Balik Model Modern
- **shortTitle:** Transformer
- **duration:** 30 menit
- **icon:** fas fa-network-wired
- **summary:** Ikuti perjalanan teks dari token menjadi embedding, attention context, lalu output yang dihasilkan token demi token.
##### objectives

- Menjelaskan token dan embedding
- Memahami Q, K, V secara intuitif
- Membaca batas context window dan generation controls

- **analogy:** Attention seperti membaca thread diskusi: tidak semua komentar diberi bobot sama; fokus berpindah ke bagian yang paling relevan.
##### hook

- **question:** Context window besar berarti model punya ingatan permanen. Setuju?
###### answerA

- **label:** Setuju
- **text:** Semua yang pernah dibaca otomatis tersimpan sebagai memori.
- **icon:** fas fa-box-archive

###### answerB

- **label:** Tidak setuju
- **text:** Context hanya ruang kerja satu request; memory perlu dirancang terpisah.
- **icon:** fas fa-clock-rotate-left

- **message:** Context window adalah ruang kerja sementara, bukan database atau long-term memory.

##### flow

##### Item 1

- Teks
- Tokenizer memecah input

##### Item 2

- Vektor
- Embedding memberi representasi

##### Item 3

- Konteks
- Attention menimbang relasi

##### Item 4

- Output
- Decoder memilih token berikutnya

##### quickCheck

- **question:** Mengapa positional information diperlukan dalam Transformer?
###### options

- Attention tidak otomatis mengetahui urutan token
- Agar API key tetap aman
- Agar semua token menjadi satu kata

- **answer:** 0
- **explanationCorrect:** Benar. Sinyal posisi membantu model membedakan urutan token dalam konteks.
- **explanationWrong:** Coba lagi. Pertimbangkan informasi apa yang tidak tersedia bila token hanya diproses sebagai sekumpulan representasi.

##### challenge

- **instruction:** Pilih konfigurasi generation untuk ringkasan kebijakan dan caption kreatif. Jelaskan pilihan temperature dan top-p untuk keduanya.
- **placeholder:** Ringkasan kebijakan: ...
Caption kreatif: ...
- **example:** Ringkasan memakai temperature rendah agar stabil; caption dapat memakai temperature lebih tinggi agar variasinya lebih luas, tetap dengan batas output.

##### mistakes

- Menganggap token selalu sama dengan kata
- Menyamakan context dengan memory
- Memakai temperature tinggi untuk tugas faktual

##### bestPractices

- Ukur token dan biaya
- Prioritaskan konteks yang relevan
- Gunakan stop condition dan structured output

##### learningOutcomes

- Menjelaskan alur token ke output
- Membedakan context dan memory
- Memilih kontrol generation sesuai tugas

- **transition:** Transformer dapat menjawab; berikutnya kita lihat bagaimana model diberi tools dan loop untuk bertindak.
- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/chapters/02-materi.html

#### AI Agents: Dari Menjawab ke Bertindak

- **title:** AI Agents: Dari Menjawab ke Bertindak
- **shortTitle:** AI Agents
- **duration:** 30 menit
- **icon:** fas fa-robot
- **summary:** Rancang agent loop, tool permission, state, stopping condition, dan human approval tanpa memberi autonomy berlebihan.
##### objectives

- Membedakan workflow dan agent
- Merancang tool schema dan stopping condition
- Menentukan approval gate untuk aksi berdampak

- **analogy:** Agent seperti asisten operasional yang memilih alat, membaca hasil, dan tahu kapan harus berhenti atau meminta bantuan manusia.
##### hook

- **question:** Agent boleh langsung mengirim pengumuman massal setelah menyusun draft yang bagus?
###### answerA

- **label:** Boleh otomatis
- **text:** Kecepatan adalah tujuan utama agent.
- **icon:** fas fa-bolt

###### answerB

- **label:** Wajib approval
- **text:** Side effect besar perlu permission, preview, dan persetujuan manusia.
- **icon:** fas fa-user-shield

- **message:** Drafting dapat agentic; aksi eksternal yang berdampak harus melewati policy dan approval gate.

##### flow

##### Item 1

- Goal
- Tetapkan tujuan

##### Item 2

- Observe
- Baca state dan context

##### Item 3

- Act
- Pilih respons atau tool

##### Item 4

- Verify
- Validasi hasil

##### Item 5

- Stop
- Selesai atau eskalasi

##### quickCheck

- **question:** Bagian mana yang paling aman dibuat deterministic dalam workflow layanan peserta?
###### options

- Brainstorm isi draft
- Validasi field wajib dan approval pengiriman
- Menyusun alternatif penjelasan

- **answer:** 1
- **explanationCorrect:** Tepat. Aturan wajib dan side effect perlu jalur deterministik yang dapat diaudit.
- **explanationWrong:** Belum tepat. Cari langkah yang harus konsisten, dapat diaudit, dan tidak boleh bergantung pada improvisasi model.

##### challenge

- **instruction:** Rancang agent sederhana dengan satu goal, dua tools, stopping condition, retry limit, dan satu approval manusia.
- **placeholder:** Goal: ...
Tools: ...
Stop: ...
Approval: ...
- **example:** Goal mencari tugas belum selesai; tools read_tasks dan draft_reminder; berhenti setelah daftar tervalidasi; pengiriman reminder wajib approval mentor.

##### mistakes

- Membuat semua proses menjadi agent
- Tool berbahaya tanpa approval
- Tidak menetapkan retry limit dan trace

##### bestPractices

- Gunakan workflow untuk aturan tetap
- Terapkan least privilege
- Log tool call, result, latency, dan recovery

##### learningOutcomes

- Memilih workflow atau agent
- Menulis tool contract
- Menempatkan human-in-the-loop secara tepat

- **transition:** Agent hanyalah salah satu layer. Topik terakhir menyatukan model, retrieval, tools, security, dan evaluasi.
- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/chapters/03-materi.html

#### Sistem AI Masa Kini: End-to-End

- **title:** Sistem AI Masa Kini: End-to-End
- **shortTitle:** Sistem AI Masa Kini
- **duration:** 35 menit
- **icon:** fas fa-sitemap
- **summary:** Susun model, context, retrieval, tools, guardrails, observability, infrastructure, dan human oversight menjadi sistem production-ready.
##### objectives

- Membaca arsitektur end-to-end
- Membedakan RAG dan database query
- Mengaudit security, reliability, cost, dan governance

- **analogy:** Model adalah konsultan pintar; sistem AI adalah kantor lengkap dengan arsip, aturan akses, alat kerja, supervisor, dan audit.
##### hook

- **question:** Model paling kuat tetap layak dipakai jika secret ada di frontend dan tool delete tidak punya approval?
###### answerA

- **label:** Masih layak
- **text:** Kemampuan model menutup kelemahan arsitektur.
- **icon:** fas fa-star

###### answerB

- **label:** Tidak layak
- **text:** Security dan governance adalah syarat sistem, bukan fitur tambahan.
- **icon:** fas fa-shield-halved

- **message:** Kualitas model tidak dapat menebus kebocoran secret, akses data yang salah, atau side effect tanpa kontrol.

##### flow

##### Item 1

- Input
- Auth dan policy

##### Item 2

- Context
- Retrieval dan state

##### Item 3

- Reason
- Model dan orchestration

##### Item 4

- Act
- Tools dengan permission

##### Item 5

- Assure
- Validation, logs, eval, approval

##### quickCheck

- **question:** Kapan database query biasa lebih tepat daripada vector retrieval?
###### options

- Saat mencari status pembayaran yang terstruktur
- Saat merangkum dokumen bebas
- Saat mencari paragraf semantik

- **answer:** 0
- **explanationCorrect:** Benar. Data terstruktur dan deterministik lebih aman diakses melalui query atau API yang tervalidasi.
- **explanationWrong:** Coba lagi. RAG paling berguna untuk informasi tidak terstruktur; data transaksional perlu jalur deterministik.

##### challenge

- **instruction:** Isi architecture canvas ringkas untuk HerAI Assistant: model, retrieval, tools, permission, evaluation, observability, dan fallback.
- **placeholder:** Model strategy: ...
Retrieval: ...
Tools: ...
Approval: ...
Evaluation: ...
Fallback: ...
- **example:** Model dirutekan berdasarkan risiko; retrieval hanya dokumen berizin; tools read-only; pengiriman butuh approval; fallback mengaku tidak tahu dan eskalasi.

##### mistakes

- API key di frontend
- Retrieval tanpa access control
- Satu model untuk semua tugas
- Tidak punya evaluation set

##### bestPractices

- Gunakan backend dan least privilege
- Pisahkan data terstruktur dan dokumen
- Pantau cost per successful task
- Siapkan fallback dan incident review

##### learningOutcomes

- Menggambar arsitektur end-to-end
- Menemukan bottleneck lintas layer
- Menetapkan kontrol sebelum production

- **transition:** Kamu siap mengubah konsep menjadi rancangan melalui 13 skenario latihan dan capstone.
- **sourcePath:** /pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/chapters/04-materi.html

#### SOURCE_VISUALS

##### 01-materi.html

- **eyebrow:** Model Selection Lab
- **title:** Bedah tiga lapisan produk AI
- **description:** Klik tiap lapisan untuk melihat tanggung jawab dan risiko utamanya.
###### options

###### Item 1

- Model
- fas fa-cube
- Foundation layer
- Kemampuan dasar, context limit, modalitas, bahasa, dan lisensi.
- Contoh: model bahasa via managed API atau open-weight inference.

###### Item 2

- Adaptasi
- fas fa-sliders
- Context & capability layer
- Prompt, RAG, fine-tuning, tools, routing, dan guardrails.
- Contoh: retrieval pedoman fellowship dengan citation.

###### Item 3

- Aplikasi
- fas fa-window-maximize
- Product layer
- Workflow, UI, auth, evaluation, observability, dan human support.
- Contoh: dashboard assistant peserta end-to-end.


##### 02-materi.html

- **eyebrow:** Transformer Lab
- **title:** Ikuti perjalanan sebuah token
- **description:** Pindah tahap untuk memahami fungsi tiap komponen tanpa terjebak rumus.
###### options

###### Item 1

- Token
- fas fa-scissors
- Unit input
- Tokenizer mengubah teks menjadi unit yang dikenali model.
- Potongan kata Indonesia bisa menjadi beberapa token.

###### Item 2

- Attention
- fas fa-arrows-to-eye
- Relasi konteks
- Q, K, dan V membantu setiap token menimbang informasi relevan.
- Pronoun dapat memberi bobot ke subjek yang muncul lebih awal.

###### Item 3

- Generation
- fas fa-forward-step
- Output bertahap
- Decoder memilih token berikutnya sampai stop condition tercapai.
- Temperature rendah memberi output lebih stabil.


##### 03-materi.html

- **eyebrow:** Agent Boundary Lab
- **title:** Tentukan siapa yang boleh bertindak
- **description:** Bedakan keputusan fleksibel, aturan tetap, dan aksi yang wajib approval.
###### options

###### Item 1

- Agentic
- fas fa-robot
- Keputusan fleksibel
- Model boleh memilih strategi pada tugas terbuka berisiko rendah.
- Menyusun tiga alternatif draft pesan.

###### Item 2

- Deterministik
- fas fa-code-branch
- Aturan tetap
- Developer menentukan langkah yang harus konsisten dan tervalidasi.
- Memastikan semua field wajib sudah terisi.

###### Item 3

- Approval
- fas fa-user-check
- Side effect
- Manusia menyetujui tindakan yang berdampak pada orang atau data.
- Mengirim pesan massal atau mengubah status peserta.


##### 04-materi.html

- **eyebrow:** Architecture Lab
- **title:** Cari bottleneck lintas layer
- **description:** Sistem production gagal dari layer terlemah, bukan hanya dari model.
###### options

###### Item 1

- Knowledge
- fas fa-book-open
- Retrieval & data
- Pastikan sumber relevan, terbaru, berizin, dan dapat dikutip.
- RAG pedoman dengan metadata access control.

###### Item 2

- Action
- fas fa-screwdriver-wrench
- Tools & policy
- Validasi parameter, permission, idempotency, dan approval.
- Tool pengiriman hanya menerima draft yang sudah disetujui.

###### Item 3

- Assurance
- fas fa-shield
- Eval & observability
- Ukur kualitas, safety, latency, cost, serta jejak insiden.
- Dashboard trace dan regression suite sebelum deploy.



#### BEGINNER_GUIDES

##### 01-materi.html

- **eyebrow:** Jalur Pemula
- **title:** Dari kebutuhan pengguna ke pilihan foundation model
- **intro:** Jangan mulai dari nama model. Mulai dari masalah, petakan lapisan sistem, baru pilih strategi adaptasi dan deployment.
- **question:** Keputusan apa yang sebenarnya sedang kita buat saat memilih model?
###### steps

###### Mulai dari kebutuhan

- **icon:** fas fa-user
- **title:** Mulai dari kebutuhan
- **focus:** Siapa, tugas apa, dan risikonya?
- **explanation:** Tentukan pengguna, input, output, batas waktu, data sensitif, dan konsekuensi bila jawaban salah. Ini mencegah tim memilih model hanya karena demo terlihat pintar.
- **example:** Assistant peserta harus menjawab pedoman dengan sumber, tetapi tidak boleh mengubah status peserta.
- **checkpoint:** Bisakah use case ditulis sebagai input → keputusan → output → risiko?

###### Pisahkan tiga lapisan

- **icon:** fas fa-layer-group
- **title:** Pisahkan tiga lapisan
- **focus:** Model, adaptasi, dan aplikasi
- **explanation:** Foundation model memberi kemampuan umum. Adaptation layer menambahkan prompt, retrieval, fine-tuning, atau tools. Application layer mengatur workflow, UI, auth, logging, evaluasi, dan bantuan manusia.
- **example:** Model API adalah foundation layer; RAG pedoman adalah adaptation layer; dashboard peserta adalah application layer.
- **checkpoint:** Apakah setiap komponen bisa ditempatkan pada satu lapisan dengan tanggung jawab jelas?

###### Pilih cara adaptasi

- **icon:** fas fa-sliders
- **title:** Pilih cara adaptasi
- **focus:** Prompt, RAG, fine-tuning, atau tools
- **explanation:** Prompt cocok untuk instruksi; RAG untuk pengetahuan yang berubah; fine-tuning untuk pola perilaku yang konsisten; tools untuk mengambil data atau melakukan aksi. Satu aplikasi dapat memakai beberapa strategi sekaligus.
- **example:** Pedoman terbaru memakai RAG, sedangkan pengecekan jadwal memakai tool read-only.
- **checkpoint:** Apakah strategi adaptasi dipilih karena kebutuhan, bukan karena tren?

###### Bandingkan dan uji

- **icon:** fas fa-scale-balanced
- **title:** Bandingkan dan uji
- **focus:** Kualitas harus terukur
- **explanation:** Bandingkan bahasa, factuality, latency, privacy, biaya, context window, tool use, lisensi, dan kemudahan operasi. Uji dengan contoh pengguna nyata sebelum memutuskan.
- **example:** Tiga model diuji pada 30 pertanyaan Bahasa Indonesia dan dihitung cost per successful answer.
- **checkpoint:** Apakah keputusan model dapat dijelaskan melalui data dan trade-off?

###### workedCase

- **title:** Worked Example — Assistant FAQ Fellowship
- **scenario:** Tim kecil ingin meluncurkan assistant yang menjawab pertanyaan jadwal dan pedoman dalam empat minggu.
**steps**

**Item 1**

- 1. Batas tugas
- Jawab pertanyaan berbasis sumber; jangan mengubah data atau mengirim pesan.

**Item 2**

- 2. Susun lapisan
- Model bahasa + RAG pedoman + tool jadwal read-only + UI + log.

**Item 3**

- 3. Pilih deployment
- Managed API untuk pilot agar setup cepat; semua secret tetap di backend.

**Item 4**

- 4. Pasang evaluasi
- Uji Bahasa Indonesia, citation, refusal, latency, dan biaya per jawaban berhasil.

- **result:** Keputusan awal: managed model melalui backend dengan RAG dan permission read-only; open-weight dievaluasi setelah pola trafik dan kebutuhan privasi lebih jelas.
- **reason:** Pilihan ini mengutamakan waktu delivery tanpa mengorbankan batas akses, audit, dan kemampuan berpindah strategi setelah data penggunaan tersedia.

###### glossary

###### Item 1

- Foundation model
- Model dasar berkemampuan umum yang dapat diadaptasi ke banyak tugas.

###### Item 2

- Pretraining
- Tahap belajar pola umum dari data luas sebelum adaptasi tugas tertentu.

###### Item 3

- Instruction tuning
- Pelatihan tambahan agar model lebih baik mengikuti instruksi.

###### Item 4

- RAG
- Mengambil sumber eksternal lalu memasukkannya ke konteks saat model menjawab.

###### Item 5

- Open-weight
- Bobot model tersedia, tetapi data dan proses pengembangannya belum tentu terbuka.

###### Item 6

- Model card
- Dokumen tentang intended use, batasan, evaluasi, lisensi, dan risiko model.


##### 02-materi.html

- **eyebrow:** Jalur Pemula
- **title:** Ikuti data: dari teks sampai token output
- **intro:** Transformer lebih mudah dipahami sebagai aliran data. Fokus pada fungsi setiap tahap sebelum masuk ke matematika detail.
- **question:** Apa yang terjadi pada satu kalimat sejak diketik sampai model menghasilkan jawaban?
###### steps

###### Teks dipecah menjadi token

- **icon:** fas fa-scissors
- **title:** Teks dipecah menjadi token
- **focus:** Token bukan selalu kata
- **explanation:** Tokenizer mengubah teks menjadi unit dan ID numerik. Bahasa, tanda baca, dan potongan kata memengaruhi jumlah token, biaya, serta panjang konteks yang tersedia.
- **example:** Kata 'mengunggah' dapat dipecah menjadi beberapa subword tergantung tokenizer.
- **checkpoint:** Bisakah kamu menjelaskan mengapa dua model dapat menghitung token secara berbeda?

###### Token diberi representasi

- **icon:** fas fa-vector-square
- **title:** Token diberi representasi
- **focus:** Embedding + informasi posisi
- **explanation:** Embedding mengubah token ID menjadi vektor. Positional information menambahkan petunjuk urutan sehingga model dapat membedakan 'mentor membantu peserta' dari 'peserta membantu mentor'.
- **example:** Representasi token berubah lagi setelah melewati layer karena konteks kalimat ikut dipertimbangkan.
- **checkpoint:** Apa yang hilang jika model hanya punya embedding tetapi tidak punya sinyal posisi?

###### Attention menimbang konteks

- **icon:** fas fa-arrows-to-eye
- **title:** Attention menimbang konteks
- **focus:** Query, Key, dan Value
- **explanation:** Query mewakili informasi yang dicari sebuah token, Key menandai informasi yang tersedia, dan Value membawa isinya. Skor attention menentukan kontribusi token lain pada representasi baru.
- **example:** Kata ganti 'mereka' memberi bobot lebih besar pada kandidat rujukan yang sesuai konteks.
- **checkpoint:** Attention memilih informasi relevan—bukan menjamin fakta selalu benar.

###### Decoder menghasilkan output

- **icon:** fas fa-forward-step
- **title:** Decoder menghasilkan output
- **focus:** Satu token setiap langkah
- **explanation:** Model menghitung distribusi token berikutnya, memilih token berdasarkan generation settings, menambahkannya ke konteks, lalu mengulang sampai stop condition. KV cache mengurangi perhitungan ulang saat inference.
- **example:** Temperature rendah biasanya lebih stabil untuk ringkasan kebijakan; output kreatif dapat memakai variasi lebih luas.
- **checkpoint:** Bisakah kamu menghubungkan temperature, top-p, dan stop condition dengan kebutuhan tugas?

###### workedCase

- **title:** Worked Example — Menentukan rujukan kata ganti
- **scenario:** Kalimat: 'Mentor mengirim revisi kepada peserta setelah mereka meminta contoh tambahan.' Sistem perlu memahami rujukan 'mereka'.
**steps**

**Item 1**

- 1. Tokenize
- Kalimat diubah menjadi token dan setiap token mendapat ID.

**Item 2**

- 2. Represent
- Embedding dan posisi membedakan aktor, aksi, dan urutan.

**Item 3**

- 3. Attend
- Token 'mereka' menimbang 'mentor' dan 'peserta' bersama konteks 'meminta'.

**Item 4**

- 4. Generate
- Representasi kontekstual membantu decoder memilih jawaban yang paling konsisten.

- **result:** Interpretasi yang paling masuk akal adalah peserta meminta contoh tambahan, tetapi sistem tetap perlu menilai ambiguitas kalimat.
- **reason:** Attention membantu menghubungkan token berjauhan, namun tidak menggantikan evaluasi, data, atau penanganan input ambigu.

###### glossary

###### Item 1

- Token
- Unit teks yang diproses model; dapat berupa kata, subword, atau tanda baca.

###### Item 2

- Embedding
- Vektor numerik yang merepresentasikan token atau teks.

###### Item 3

- Positional information
- Sinyal yang memberi tahu model tentang urutan token.

###### Item 4

- Self-attention
- Mekanisme token menimbang hubungan dengan token lain dalam konteks.

###### Item 5

- Context window
- Jumlah token maksimum yang dapat diproses pada satu request.

###### Item 6

- KV cache
- Penyimpanan Key dan Value sebelumnya untuk mempercepat generation bertahap.


##### 03-materi.html

- **eyebrow:** Jalur Pemula
- **title:** Bangun agent dari batas tugas, bukan dari autonomy
- **intro:** Agent yang baik bukan agent yang bebas melakukan apa saja. Agent yang baik punya goal, tools terbatas, state jelas, stopping condition, dan jalur eskalasi.
- **question:** Kapan model cukup menjawab, kapan workflow diperlukan, dan kapan agent masuk akal?
###### steps

###### Pilih bentuk sistem

- **icon:** fas fa-code-branch
- **title:** Pilih bentuk sistem
- **focus:** Model call, workflow, atau agent
- **explanation:** Gunakan model call untuk satu transformasi, workflow untuk langkah tetap, dan agent bila jalurnya dinamis serta perlu memilih tool. Jangan menambah agent jika aturan deterministik sudah cukup.
- **example:** Validasi field wajib adalah workflow; menyusun penjelasan kekurangan dapat dibantu model.
- **checkpoint:** Apakah fleksibilitas agent benar-benar dibutuhkan oleh tugas?

###### Tulis kontrak tool

- **icon:** fas fa-screwdriver-wrench
- **title:** Tulis kontrak tool
- **focus:** Input, output, error, dan izin
- **explanation:** Tool schema harus menjelaskan nama, deskripsi, parameter wajib, validasi, error case, authorization, dan side effect. Model hanya mengusulkan tool call; backend tetap memvalidasi dan mengeksekusi.
- **example:** Tool get_schedule menerima tanggal tervalidasi dan hanya punya izin baca.
- **checkpoint:** Apa yang terjadi jika parameter kosong, tanggal salah, atau user tidak berizin?

###### Rancang agent loop

- **icon:** fas fa-rotate
- **title:** Rancang agent loop
- **focus:** Observe → decide → act → verify
- **explanation:** Agent membaca goal dan state, memilih tindakan, menerima tool result, memverifikasi hasil, lalu berhenti atau menyusun langkah berikut. Tetapkan batas iterasi, biaya, timeout, dan kondisi selesai.
- **example:** Setelah dua kegagalan tool, agent berhenti dan mengeskalasi ke staf.
- **checkpoint:** Apakah loop tahu kapan harus selesai dan kapan harus menyerah?

###### Batasi dampak

- **icon:** fas fa-user-shield
- **title:** Batasi dampak
- **focus:** Guardrail dan human approval
- **explanation:** Least privilege, input/output validation, audit log, idempotency, dan approval melindungi user dari aksi salah. Draft boleh otomatis; pengiriman massal atau penghapusan data harus dikunci.
- **example:** Agent membuat preview pesan, tetapi staf menekan tombol approve sebelum tool send dijalankan.
- **checkpoint:** Side effect mana yang tidak boleh diputuskan model sendirian?

###### workedCase

- **title:** Worked Example — Pengingat tugas belum selesai
- **scenario:** Agent membantu peserta menemukan tugas yang belum selesai dan menyiapkan pengingat personal.
**steps**

**Item 1**

- 1. Goal
- Temukan tugas belum selesai untuk satu peserta berizin.

**Item 2**

- 2. Tools
- read_tasks untuk data read-only dan draft_reminder untuk menyusun pesan.

**Item 3**

- 3. Verify
- Pastikan hasil tool sesuai peserta, deadline belum lewat, dan tidak ada data peserta lain.

**Item 4**

- 4. Approval
- Mentor mereview draft sebelum tool pengiriman boleh dijalankan.

- **result:** Agent berhenti setelah daftar tervalidasi dan draft tersedia; pengiriman berada di workflow approval terpisah.
- **reason:** Pemisahan ini memakai fleksibilitas model untuk reasoning dan drafting, tetapi mempertahankan kontrol deterministik pada side effect.

###### glossary

###### Item 1

- Agent
- Sistem yang memilih tindakan atau tool dalam loop untuk mencapai goal.

###### Item 2

- Tool schema
- Kontrak terstruktur tentang fungsi, parameter, dan hasil tool.

###### Item 3

- State
- Informasi kerja yang dipertahankan selama penyelesaian tugas.

###### Item 4

- Stopping condition
- Aturan kapan loop dinyatakan selesai atau harus berhenti.

###### Item 5

- Handoff
- Pemindahan tugas ke agent lain atau manusia.

###### Item 6

- Idempotency
- Sifat aksi yang aman diulang tanpa menggandakan dampak.


##### 04-materi.html

- **eyebrow:** Jalur Pemula
- **title:** Susun sistem AI dari pengalaman sampai assurance
- **intro:** Produk AI production adalah rantai keputusan. Setiap layer perlu kontrak, kontrol, metrik, dan pemilik yang jelas.
- **question:** Bagaimana model, data, tools, infrastructure, dan manusia bekerja sebagai satu sistem?
###### steps

###### Tetapkan outcome dan risiko

- **icon:** fas fa-bullseye
- **title:** Tetapkan outcome dan risiko
- **focus:** Ukuran sukses sebelum arsitektur
- **explanation:** Definisikan tugas, user journey, toleransi kesalahan, latency budget, privacy, dan aksi yang diizinkan. Metrik teknis harus terhubung dengan keberhasilan tugas pengguna.
- **example:** Target bukan sekadar jawaban fasih, tetapi jawaban bersumber dalam lima detik tanpa membocorkan data.
- **checkpoint:** Apakah tim tahu apa arti 'berhasil' dan 'gagal' untuk user?

###### Rancang knowledge layer

- **icon:** fas fa-database
- **title:** Rancang knowledge layer
- **focus:** Context, RAG, database, dan memory
- **explanation:** Gunakan RAG untuk dokumen tidak terstruktur, query/API untuk data deterministik, dan memory untuk preferensi yang memang boleh disimpan. Metadata serta access control harus diterapkan sebelum data masuk konteks.
- **example:** Pedoman dicari dengan RAG; status pembayaran dibaca melalui API terautentikasi.
- **checkpoint:** Apakah setiap sumber data punya owner, izin, freshness, dan fallback?

###### Orkestrasi model dan tools

- **icon:** fas fa-gears
- **title:** Orkestrasi model dan tools
- **focus:** Routing, validation, dan permission
- **explanation:** Context builder menyusun instruksi dan bukti; model gateway memilih model; tool layer mengeksekusi fungsi tervalidasi; output validator memeriksa format dan kebijakan sebelum respons dikirim.
- **example:** Pertanyaan sederhana memakai model cepat, sementara kasus berisiko diarahkan ke model lebih kuat dan review manusia.
- **checkpoint:** Bisakah satu kegagalan layer dilacak tanpa menebak?

###### Bangun assurance loop

- **icon:** fas fa-shield-halved
- **title:** Bangun assurance loop
- **focus:** Eval, observability, dan operasi
- **explanation:** Offline eval mencegah regression sebelum deploy. Production monitoring menangkap latency, cost, tool error, safety event, dan feedback. Incident review mengubah kegagalan menjadi test case baru.
- **example:** Jawaban salah yang dilaporkan user masuk regression set dan diuji pada setiap perubahan prompt atau model.
- **checkpoint:** Apakah sistem belajar dari insiden dan bisa rollback dengan aman?

###### workedCase

- **title:** Worked Example — HerAI Fellowship Assistant
- **scenario:** Assistant menjawab pedoman, mengecek jadwal, dan membuat draft pesan tanpa boleh mengubah data atau mengirim pesan sendiri.
**steps**

**Item 1**

- 1. Experience
- UI menjelaskan sumber, status loading, dan kapan jawaban perlu bantuan staf.

**Item 2**

- 2. Knowledge
- RAG pedoman berizin + tool jadwal read-only; data sensitif tidak masuk prompt tanpa kebutuhan.

**Item 3**

- 3. Intelligence
- Model gateway, context builder, structured output, dan validation.

**Item 4**

- 4. Assurance
- Approval pengiriman, trace, eval set, cost budget, fallback, serta incident review.

- **result:** Sistem memberi jawaban bersumber dan draft yang dapat direview; semua side effect tetap berada di jalur approval manusia.
- **reason:** Arsitektur memisahkan kemampuan generatif dari otoritas melakukan aksi sehingga lebih aman, terukur, dan mudah diaudit.

###### glossary

###### Item 1

- Context engineering
- Proses memilih dan menyusun instruksi, sumber, history, serta tool result untuk model.

###### Item 2

- Model gateway
- Layer pemanggilan dan routing model berdasarkan tugas, risiko, biaya, atau fallback.

###### Item 3

- Grounding
- Mengikat jawaban pada bukti atau sumber yang dapat diperiksa.

###### Item 4

- Observability
- Trace, log, metrik, dan event yang membantu memahami perilaku sistem.

###### Item 5

- Regression
- Penurunan kualitas setelah perubahan model, prompt, data, atau kode.

###### Item 6

- Human oversight
- Approval, monitoring, intervensi, dan eskalasi oleh manusia.



#### PRACTICE_ITEMS

#### Item 1

#### Item 1

foundation-layer-map

#### Item 2

Foundation Models

#### Item 3

Mengidentifikasi foundation model, adaptation layer, dan application layer.

#### Item 4

Universitas memakai API model bahasa, menambahkan dokumen akademik lewat retrieval, lalu membangun dashboard mahasiswa.

#### Item 5

Petakan mana foundation model, adaptation/context layer, dan application layer. Jelaskan dua risiko jika batas antar layer tidak dipahami.

#### Item 6

- foundation model teridentifikasi
- RAG/prompt/tool layer dijelaskan
- aplikasi end-to-end disebut
- risiko ditulis konkret

#### Item 2

#### Item 1

model-card-audit

#### Item 2

Foundation Models

#### Item 3

Membaca dan mengaudit model card di Hugging Face.

#### Item 4

Tim menemukan model open-weight yang terlihat populer untuk Bahasa Indonesia.

#### Item 5

Tulis checklist model card: intended use, out-of-scope use, language coverage, benchmark, limitations, license, hardware, dan safety notes.

#### Item 6

- intended use
- license
- bahasa Indonesia
- limitations
- hardware

#### Item 3

#### Item 1

deployment-matrix

#### Item 2

Foundation Models

#### Item 3

Membuat decision matrix API-hosted vs open-weight vs local.

#### Item 4

HerAI ingin assistant yang murah, privat, cepat, dan bisa memakai tool.

#### Item 5

Bandingkan tiga pendekatan deployment dengan kriteria privasi, biaya, latency, maintenance, customization, dan vendor dependency.

#### Item 6

- semua opsi dibandingkan
- trade-off jelas
- rekomendasi kontekstual

#### Item 4

#### Item 1

tokenization-id

#### Item 2

Transformer

#### Item 3

Eksperimen konseptual tokenisasi Bahasa Indonesia.

#### Item 4

Kalimat: Peserta fellowship mengunggah ulang tugasnya setelah mentor memberi revisi.

#### Item 5

Buat tokenisasi ilustratif, lalu jelaskan dampak token terhadap biaya, truncation, dan context window.

#### Item 6

- token bukan selalu kata
- dampak biaya
- dampak context

#### Item 5

#### Item 1

attention-walkthrough

#### Item 2

Transformer

#### Item 3

Menelusuri alur token ke embedding ke attention ke output.

#### Item 4

Model harus menjawab siapa yang meminta revisi pada kalimat panjang.

#### Item 5

Jelaskan alur token, embedding, positional information, Query/Key/Value, weighted context, dan output token.

#### Item 6

- QKV dijelaskan
- posisi disebut
- weighted context masuk

#### Item 6

#### Item 1

generation-config

#### Item 2

Transformer

#### Item 3

Membandingkan konfigurasi generation untuk tugas faktual dan kreatif.

#### Item 4

Tim punya konfigurasi A temperature rendah/top-p rendah dan B temperature lebih tinggi/top-p luas.

#### Item 5

Pilih konfigurasi untuk ringkasan kebijakan, caption kreatif, dan jawaban faktual. Jelaskan alasan.

#### Item 6

- tugas faktual stabil
- kreatif lebih leluasa
- risiko halusinasi disebut

#### Item 7

#### Item 1

tool-schema

#### Item 2

AI Agents

#### Item 3

Merancang dua tool schema untuk assistant fellowship.

#### Item 4

Assistant perlu membaca jadwal dan membuat draft pesan mentor.

#### Item 5

Tulis dua tool schema ringkas: nama, deskripsi, parameter wajib, error case, dan izin yang dibutuhkan.

#### Item 6

- schema jelas
- required parameter
- authorization
- error handling

#### Item 8

#### Item 1

agent-loop

#### Item 2

AI Agents

#### Item 3

Menyusun agent loop beserta stopping condition dan error recovery.

#### Item 4

Agent membantu peserta menemukan tugas yang belum selesai.

#### Item 5

Rancang goal, observe, decide, tool call, result, update state, stop condition, retry limit, dan escalation.

#### Item 6

- loop lengkap
- stop condition
- recovery
- human escalation

#### Item 9

#### Item 1

platform-agent-matrix

#### Item 2

AI Agents

#### Item 3

Membandingkan OpenAI Agents SDK, Anthropic tool use, Google ADK, dan LangChain.

#### Item 4

Tim ingin memilih pendekatan agent untuk prototype fellowship.

#### Item 5

Buat decision matrix berdasarkan tools, handoff, graph workflow, observability, human-in-the-loop, dan kompleksitas.

#### Item 6

- bukan promosi vendor
- berbasis kebutuhan
- observability masuk

#### Item 10

#### Item 1

rag-design

#### Item 2

Sistem AI

#### Item 3

Merancang RAG untuk pedoman fellowship.

#### Item 4

Assistant harus menjawab berdasarkan pedoman internal dan menampilkan sumber.

#### Item 5

Rancang pipeline documents, chunking, embeddings, vector index, retrieval, reranking, context assembly, generation, citation, dan fallback.

#### Item 6

- chunking
- metadata/access control
- citation
- fallback

#### Item 11

#### Item 1

deployment-patterns

#### Item 2

Sistem AI

#### Item 3

Membandingkan managed API, managed cloud, self-hosted, dan local deployment.

#### Item 4

HerAI perlu prototype cepat tetapi juga mempertimbangkan privasi dan biaya.

#### Item 5

Bandingkan empat pola deployment dan pilih pendekatan awal serta pendekatan production.

#### Item 6

- empat pola
- privacy
- cost
- maintenance

#### Item 12

#### Item 1

production-readiness

#### Item 2

Sistem AI

#### Item 3

Melakukan production-readiness audit.

#### Item 4

Arsitektur sengaja buruk: API key di frontend, satu model untuk semua tugas, retrieval tanpa access control, tool delete tanpa approval, tanpa logging dan evaluation set.

#### Item 5

Temukan minimal enam risiko dan tulis perbaikan pada layer security, retrieval, tool permission, observability, dan evaluation.

#### Item 6

- enam risiko
- perbaikan spesifik
- approval gate

#### Item 13

#### Item 1

capstone-herai-assistant

#### Item 2

Capstone

#### Item 3

Mendesain arsitektur HerAI Fellowship Assistant end-to-end.

#### Item 4

Assistant menjawab pertanyaan peserta, membaca pedoman, mengecek jadwal, dan membuat draft pesan. Tidak boleh mengubah data atau mengirim pesan tanpa approval staf.

#### Item 5

Isi architecture canvas: use case, model strategy, retrieval source, tools, permission, guardrails, approval gate, logging, evaluation, fallback, dan deployment approach.

#### Item 6

- end-to-end
- guardrail
- approval
- evaluation
- fallback

#### PRACTICES

#### Mengidentifikasi foundation model, adaptation layer, dan application layer.

- **id:** foundation-layer-map
- **topic:** Foundation Models
- **title:** Mengidentifikasi foundation model, adaptation layer, dan application layer.
- **caseText:** Universitas memakai API model bahasa, menambahkan dokumen akademik lewat retrieval, lalu membangun dashboard mahasiswa.
- **prompt:** Petakan mana foundation model, adaptation/context layer, dan application layer. Jelaskan dua risiko jika batas antar layer tidak dipahami.
##### fields

##### Item 1

- jawaban
- Tulis analisis, keputusan, trade-off, dan alasanmu...

##### rubric

- foundation model teridentifikasi
- RAG/prompt/tool layer dijelaskan
- aplikasi end-to-end disebut
- risiko ditulis konkret

- **guide:** Jawaban kuat menyebut konteks kasus, trade-off, risiko, keputusan yang dapat diuji, dan batas aman implementasi.

#### Membaca dan mengaudit model card di Hugging Face.

- **id:** model-card-audit
- **topic:** Foundation Models
- **title:** Membaca dan mengaudit model card di Hugging Face.
- **caseText:** Tim menemukan model open-weight yang terlihat populer untuk Bahasa Indonesia.
- **prompt:** Tulis checklist model card: intended use, out-of-scope use, language coverage, benchmark, limitations, license, hardware, dan safety notes.
##### fields

##### Item 1

- jawaban
- Tulis analisis, keputusan, trade-off, dan alasanmu...

##### rubric

- intended use
- license
- bahasa Indonesia
- limitations
- hardware

- **guide:** Jawaban kuat menyebut konteks kasus, trade-off, risiko, keputusan yang dapat diuji, dan batas aman implementasi.

#### Membuat decision matrix API-hosted vs open-weight vs local.

- **id:** deployment-matrix
- **topic:** Foundation Models
- **title:** Membuat decision matrix API-hosted vs open-weight vs local.
- **caseText:** HerAI ingin assistant yang murah, privat, cepat, dan bisa memakai tool.
- **prompt:** Bandingkan tiga pendekatan deployment dengan kriteria privasi, biaya, latency, maintenance, customization, dan vendor dependency.
##### fields

##### Item 1

- jawaban
- Tulis analisis, keputusan, trade-off, dan alasanmu...

##### rubric

- semua opsi dibandingkan
- trade-off jelas
- rekomendasi kontekstual

- **guide:** Jawaban kuat menyebut konteks kasus, trade-off, risiko, keputusan yang dapat diuji, dan batas aman implementasi.

#### Eksperimen konseptual tokenisasi Bahasa Indonesia.

- **id:** tokenization-id
- **topic:** Transformer
- **title:** Eksperimen konseptual tokenisasi Bahasa Indonesia.
- **caseText:** Kalimat: Peserta fellowship mengunggah ulang tugasnya setelah mentor memberi revisi.
- **prompt:** Buat tokenisasi ilustratif, lalu jelaskan dampak token terhadap biaya, truncation, dan context window.
##### fields

##### Item 1

- jawaban
- Tulis analisis, keputusan, trade-off, dan alasanmu...

##### rubric

- token bukan selalu kata
- dampak biaya
- dampak context

- **guide:** Jawaban kuat menyebut konteks kasus, trade-off, risiko, keputusan yang dapat diuji, dan batas aman implementasi.

#### Menelusuri alur token ke embedding ke attention ke output.

- **id:** attention-walkthrough
- **topic:** Transformer
- **title:** Menelusuri alur token ke embedding ke attention ke output.
- **caseText:** Model harus menjawab siapa yang meminta revisi pada kalimat panjang.
- **prompt:** Jelaskan alur token, embedding, positional information, Query/Key/Value, weighted context, dan output token.
##### fields

##### Item 1

- jawaban
- Tulis analisis, keputusan, trade-off, dan alasanmu...

##### rubric

- QKV dijelaskan
- posisi disebut
- weighted context masuk

- **guide:** Jawaban kuat menyebut konteks kasus, trade-off, risiko, keputusan yang dapat diuji, dan batas aman implementasi.

#### Membandingkan konfigurasi generation untuk tugas faktual dan kreatif.

- **id:** generation-config
- **topic:** Transformer
- **title:** Membandingkan konfigurasi generation untuk tugas faktual dan kreatif.
- **caseText:** Tim punya konfigurasi A temperature rendah/top-p rendah dan B temperature lebih tinggi/top-p luas.
- **prompt:** Pilih konfigurasi untuk ringkasan kebijakan, caption kreatif, dan jawaban faktual. Jelaskan alasan.
##### fields

##### Item 1

- jawaban
- Tulis analisis, keputusan, trade-off, dan alasanmu...

##### rubric

- tugas faktual stabil
- kreatif lebih leluasa
- risiko halusinasi disebut

- **guide:** Jawaban kuat menyebut konteks kasus, trade-off, risiko, keputusan yang dapat diuji, dan batas aman implementasi.

#### Merancang dua tool schema untuk assistant fellowship.

- **id:** tool-schema
- **topic:** AI Agents
- **title:** Merancang dua tool schema untuk assistant fellowship.
- **caseText:** Assistant perlu membaca jadwal dan membuat draft pesan mentor.
- **prompt:** Tulis dua tool schema ringkas: nama, deskripsi, parameter wajib, error case, dan izin yang dibutuhkan.
##### fields

##### Item 1

- jawaban
- Tulis analisis, keputusan, trade-off, dan alasanmu...

##### rubric

- schema jelas
- required parameter
- authorization
- error handling

- **guide:** Jawaban kuat menyebut konteks kasus, trade-off, risiko, keputusan yang dapat diuji, dan batas aman implementasi.

#### Menyusun agent loop beserta stopping condition dan error recovery.

- **id:** agent-loop
- **topic:** AI Agents
- **title:** Menyusun agent loop beserta stopping condition dan error recovery.
- **caseText:** Agent membantu peserta menemukan tugas yang belum selesai.
- **prompt:** Rancang goal, observe, decide, tool call, result, update state, stop condition, retry limit, dan escalation.
##### fields

##### Item 1

- jawaban
- Tulis analisis, keputusan, trade-off, dan alasanmu...

##### rubric

- loop lengkap
- stop condition
- recovery
- human escalation

- **guide:** Jawaban kuat menyebut konteks kasus, trade-off, risiko, keputusan yang dapat diuji, dan batas aman implementasi.

#### Membandingkan OpenAI Agents SDK, Anthropic tool use, Google ADK, dan LangChain.

- **id:** platform-agent-matrix
- **topic:** AI Agents
- **title:** Membandingkan OpenAI Agents SDK, Anthropic tool use, Google ADK, dan LangChain.
- **caseText:** Tim ingin memilih pendekatan agent untuk prototype fellowship.
- **prompt:** Buat decision matrix berdasarkan tools, handoff, graph workflow, observability, human-in-the-loop, dan kompleksitas.
##### fields

##### Item 1

- jawaban
- Tulis analisis, keputusan, trade-off, dan alasanmu...

##### rubric

- bukan promosi vendor
- berbasis kebutuhan
- observability masuk

- **guide:** Jawaban kuat menyebut konteks kasus, trade-off, risiko, keputusan yang dapat diuji, dan batas aman implementasi.

#### Merancang RAG untuk pedoman fellowship.

- **id:** rag-design
- **topic:** Sistem AI
- **title:** Merancang RAG untuk pedoman fellowship.
- **caseText:** Assistant harus menjawab berdasarkan pedoman internal dan menampilkan sumber.
- **prompt:** Rancang pipeline documents, chunking, embeddings, vector index, retrieval, reranking, context assembly, generation, citation, dan fallback.
##### fields

##### Item 1

- jawaban
- Tulis analisis, keputusan, trade-off, dan alasanmu...

##### rubric

- chunking
- metadata/access control
- citation
- fallback

- **guide:** Jawaban kuat menyebut konteks kasus, trade-off, risiko, keputusan yang dapat diuji, dan batas aman implementasi.

#### Membandingkan managed API, managed cloud, self-hosted, dan local deployment.

- **id:** deployment-patterns
- **topic:** Sistem AI
- **title:** Membandingkan managed API, managed cloud, self-hosted, dan local deployment.
- **caseText:** HerAI perlu prototype cepat tetapi juga mempertimbangkan privasi dan biaya.
- **prompt:** Bandingkan empat pola deployment dan pilih pendekatan awal serta pendekatan production.
##### fields

##### Item 1

- jawaban
- Tulis analisis, keputusan, trade-off, dan alasanmu...

##### rubric

- empat pola
- privacy
- cost
- maintenance

- **guide:** Jawaban kuat menyebut konteks kasus, trade-off, risiko, keputusan yang dapat diuji, dan batas aman implementasi.

#### Melakukan production-readiness audit.

- **id:** production-readiness
- **topic:** Sistem AI
- **title:** Melakukan production-readiness audit.
- **caseText:** Arsitektur sengaja buruk: API key di frontend, satu model untuk semua tugas, retrieval tanpa access control, tool delete tanpa approval, tanpa logging dan evaluation set.
- **prompt:** Temukan minimal enam risiko dan tulis perbaikan pada layer security, retrieval, tool permission, observability, dan evaluation.
##### fields

##### Item 1

- jawaban
- Tulis analisis, keputusan, trade-off, dan alasanmu...

##### rubric

- enam risiko
- perbaikan spesifik
- approval gate

- **guide:** Jawaban kuat menyebut konteks kasus, trade-off, risiko, keputusan yang dapat diuji, dan batas aman implementasi.

#### Mendesain arsitektur HerAI Fellowship Assistant end-to-end.

- **id:** capstone-herai-assistant
- **topic:** Capstone
- **title:** Mendesain arsitektur HerAI Fellowship Assistant end-to-end.
- **caseText:** Assistant menjawab pertanyaan peserta, membaca pedoman, mengecek jadwal, dan membuat draft pesan. Tidak boleh mengubah data atau mengirim pesan tanpa approval staf.
- **prompt:** Isi architecture canvas: use case, model strategy, retrieval source, tools, permission, guardrails, approval gate, logging, evaluation, fallback, dan deployment approach.
##### fields

##### Item 1

- jawaban
- Tulis analisis, keputusan, trade-off, dan alasanmu...

##### rubric

- end-to-end
- guardrail
- approval
- evaluation
- fallback

- **guide:** Jawaban kuat menyebut konteks kasus, trade-off, risiko, keputusan yang dapat diuji, dan batas aman implementasi.

#### QUIZ

#### Item 1

#### Item 1

Foundation model paling tepat didefinisikan sebagai...

#### Item 2

- Model task-specific yang hanya bisa klasifikasi spam.
- Model dasar yang dilatih pada data luas dan dapat diadaptasi ke banyak tugas.
- Dashboard chatbot yang sudah punya tombol kirim.
- Dataset internal yang dipakai untuk retrieval.

#### Item 3

1

#### Item 4

Foundation model adalah basis umum yang dapat diadaptasi. Aplikasi AI berada di atasnya.

#### Item 2

#### Item 1

Sebuah chatbot memakai model via API dan dokumen internal lewat RAG. Mana yang merupakan AI application?

#### Item 2

- Model API saja.
- Dokumen PDF saja.
- Gabungan model, prompt, retrieval, workflow, UI, evaluasi, dan pengawasan.
- Embedding vector saja.

#### Item 3

2

#### Item 4

AI application adalah sistem end-to-end, bukan hanya model.

#### Item 3

#### Item 1

Mengapa open-weight tidak otomatis berarti sepenuhnya terbuka?

#### Item 2

- Karena bobot bisa tersedia tetapi data training dan proses alignment belum tentu dibuka.
- Karena open-weight selalu lebih mahal.
- Karena open-weight tidak bisa dipakai komersial dalam kondisi apa pun.
- Karena open-weight hanya bisa berjalan di browser.

#### Item 3

0

#### Item 4

Open-weight perlu tetap dibaca lisensi, model card, dan batasannya.

#### Item 4

#### Item 1

Kapan RAG lebih realistis daripada fine-tuning?

#### Item 2

- Saat pengetahuan sering berubah dan harus berbasis dokumen sumber.
- Saat ingin menghapus semua dokumen.
- Saat model tidak boleh menerima konteks.
- Saat jawaban tidak perlu sumber.

#### Item 3

0

#### Item 4

RAG cocok untuk knowledge base yang berubah dan perlu citation.

#### Item 5

#### Item 1

Decision matrix model sebaiknya memasukkan...

#### Item 2

- Popularitas model saja.
- Privasi, biaya, latency, bahasa, tool use, deployment, dan evaluasi.
- Warna logo vendor.
- Jumlah follower komunitas.

#### Item 3

1

#### Item 4

Pemilihan model adalah keputusan sistem, bukan kontes popularitas.

#### Item 6

#### Item 1

Tokenization pada LLM berarti...

#### Item 2

- Selalu memecah teks per kata utuh.
- Memecah teks menjadi unit yang diproses model, bisa kata, subword, atau tanda baca.
- Menghapus semua tanda baca.
- Menentukan role user di dashboard.

#### Item 3

1

#### Item 4

Token bisa berupa subword dan hasilnya berbeda antar model.

#### Item 7

#### Item 1

Embedding di dalam Transformer berfungsi untuk...

#### Item 2

- Mengubah token ID menjadi representasi vektor.
- Menyimpan API key.
- Mengirim email otomatis.
- Menghapus context window.

#### Item 3

0

#### Item 4

Embedding membuat token dapat diproses sebagai representasi numerik.

#### Item 8

#### Item 1

Mengapa positional information diperlukan?

#### Item 2

- Attention sendiri tidak otomatis mengetahui urutan token.
- Agar model selalu menolak prompt panjang.
- Agar token menjadi gambar.
- Agar database tidak perlu index.

#### Item 3

0

#### Item 4

Urutan perlu diberi sinyal melalui positional encoding atau variasinya.

#### Item 9

#### Item 1

Context window bukan long-term memory karena...

#### Item 2

- Ia hanya batas token dalam satu request, bukan penyimpanan permanen.
- Ia selalu menyimpan semua riwayat user selamanya.
- Ia menggantikan database.
- Ia hanya dipakai untuk CSS.

#### Item 3

0

#### Item 4

Memory harus dirancang eksplisit melalui state, database, retrieval, atau profile.

#### Item 10

#### Item 1

Untuk jawaban faktual, konfigurasi generation yang lebih aman biasanya...

#### Item 2

- Temperature rendah dan top-p lebih sempit.
- Temperature sangat tinggi dan top-p sangat luas.
- Tidak memakai stop condition apa pun.
- Mengacak output sebanyak mungkin.

#### Item 3

0

#### Item 4

Tugas faktual biasanya perlu output lebih stabil dan terkontrol.

#### Item 11

#### Item 1

Agent berbeda dari workflow deterministik karena...

#### Item 2

- Agent dapat memilih tindakan/tool dalam loop berdasarkan konteks.
- Agent selalu lebih murah.
- Agent tidak perlu logging.
- Agent tidak bisa memakai tool.

#### Item 3

0

#### Item 4

Agent punya loop pengambilan keputusan; workflow deterministik langkahnya ditentukan developer.

#### Item 12

#### Item 1

Tool schema yang baik minimal memuat...

#### Item 2

- Nama, deskripsi, parameter, validasi, dan izin.
- Warna tombol dan font.
- Nama vendor saja.
- Jumlah likes.

#### Item 3

0

#### Item 4

Tool schema harus jelas agar model dan sistem dapat mengeksekusi tool dengan aman.

#### Item 13

#### Item 1

Tindakan agent yang harus memerlukan approval manusia adalah...

#### Item 2

- Menghapus data peserta atau mengirim email massal.
- Membaca halaman bantuan publik.
- Menyusun draft yang belum dikirim.
- Menyarankan topik belajar.

#### Item 3

0

#### Item 4

Side effect yang berdampak nyata wajib gate approval.

#### Item 14

#### Item 1

Tool result grounding penting karena...

#### Item 2

- Agent bisa salah memilih tool, parameter, atau membaca hasil.
- Tool membuat semua jawaban otomatis benar.
- Tool menghapus kebutuhan evaluasi.
- Tool tidak pernah gagal.

#### Item 3

0

#### Item 4

Tool use tetap perlu validasi dan pembacaan hasil yang benar.

#### Item 15

#### Item 1

Metrik observability agent yang relevan adalah...

#### Item 2

- Tool success rate, latency, cost per successful task, human intervention rate.
- Jumlah warna di UI.
- Ukuran avatar.
- Jumlah menu sidebar.

#### Item 3

0

#### Item 4

Agent perlu trace dan metrik agar kegagalannya bisa dianalisis.

#### Item 16

#### Item 1

Modern AI system paling tepat dipahami sebagai...

#### Item 2

- Model saja.
- Model plus instructions, context, retrieval, tools, state, guardrails, evaluation, infrastructure, dan human oversight.
- Hanya prompt panjang.
- Hanya database vektor.

#### Item 3

1

#### Item 4

Kualitas sistem tidak hanya ditentukan model.

#### Item 17

#### Item 1

Kapan database query biasa lebih tepat daripada RAG?

#### Item 2

- Saat butuh data terstruktur deterministik seperti status pembayaran.
- Saat dokumen bebas perlu dirangkum.
- Saat sumber tidak punya struktur apa pun.
- Saat ingin jawaban kreatif.

#### Item 3

0

#### Item 4

Data terstruktur sering lebih aman dipanggil lewat query/API deterministik.

#### Item 18

#### Item 1

Risiko API key di frontend adalah...

#### Item 2

- Secret dapat diambil pengguna dan disalahgunakan.
- Model menjadi terlalu kecil.
- Context window bertambah otomatis.
- Retrieval menjadi lebih akurat.

#### Item 3

0

#### Item 4

Secret tidak boleh disimpan di HTML/JS frontend.

#### Item 19

#### Item 1

Human-in-the-loop berarti...

#### Item 2

- Manusia menyetujui sebelum aksi penting dijalankan.
- Manusia tidak pernah melihat sistem.
- Model selalu menolak tool.
- User interface tidak memiliki tombol.

#### Item 3

0

#### Item 4

Human-in-the-loop cocok untuk aksi yang punya dampak nyata.

#### Item 20

#### Item 1

Failure taxonomy membantu karena...

#### Item 2

- Kegagalan bisa terjadi di input, prompt, retrieval, model, tool, agent, validation, infrastructure, governance, atau human process.
- Semua kegagalan pasti berasal dari model.
- Logging tidak lagi diperlukan.
- Evaluasi cukup dilakukan sekali.

#### Item 3

0

#### Item 4

Melihat layer kegagalan mencegah diagnosis yang terlalu sempit.

#### DISCUSSION_PROMPTS

#### Foundation model sebagai infrastruktur bersama

- **title:** Foundation model sebagai infrastruktur bersama
- **context:** Organisasi kecil ingin memakai AI untuk layanan peserta, tetapi punya tim dan budget terbatas.
- **a:** Bangun model sendiri agar kontrol penuh.
- **b:** Pakai API atau open-weight model dan fokus pada aplikasi, evaluasi, serta data governance.
- **question:** Apakah organisasi kecil sebaiknya membangun model sendiri, memakai API, atau memakai open-weight model?
- **caseText:** Chatbot fellowship butuh Bahasa Indonesia, privasi data peserta, dan biaya terkendali.

#### Transformer dan batas context

- **title:** Transformer dan batas context
- **context:** Model baru punya context window besar, tetapi dokumen kebijakan sering berubah.
- **a:** Context window besar cukup untuk semua kebutuhan.
- **b:** Retrieval, memory, dan database tetap diperlukan untuk sumber yang berubah dan terstruktur.
- **question:** Apakah context window besar dapat menggantikan retrieval, memory, dan database?
- **caseText:** Assistant harus menjawab berdasarkan pedoman terbaru dan tidak boleh memakai aturan lama.

#### Agent autonomy

- **title:** Agent autonomy
- **context:** Agent dapat mengecek jadwal, membuat draft pesan, dan memanggil tool operasional.
- **a:** Agent boleh melakukan banyak aksi otomatis agar cepat.
- **b:** Aksi berdampak harus dibatasi dengan permission, logging, dan approval manusia.
- **question:** Tindakan apa yang boleh dilakukan agent tanpa approval manusia?
- **caseText:** Agent ingin mengirim pengumuman massal ke peserta setelah membaca kalender.

#### Sistem AI untuk fellowship

- **title:** Sistem AI untuk fellowship
- **context:** HerAI Fellowship Assistant harus berguna, hemat biaya, menjaga privasi, dan mudah dirawat.
- **a:** Pakai model paling kuat untuk semua tugas.
- **b:** Gunakan routing, retrieval, caching, guardrails, dan evaluasi sesuai risiko tiap tugas.
- **question:** Bagaimana menyeimbangkan kemampuan, biaya, privasi, reliability, dan maintenance?
- **caseText:** Sistem harus menjawab pertanyaan peserta, membaca pedoman, cek jadwal, dan membuat draft pesan.

#### PRACTICE_TOPICS

#### Item 1

- **start:** 0
- **end:** 2
- **label:** Foundation Models

#### Item 2

- **start:** 3
- **end:** 5
- **label:** Transformer

#### Item 3

- **start:** 6
- **end:** 8
- **label:** AI Agents

#### Item 4

- **start:** 9
- **end:** 12
- **label:** Sistem AI
