# Natural Language Processing

> Ekspor lengkap dari sumber materi HerAI yang tersedia di repository.
> Mencakup materi, latihan, kuis, diskusi, pembahasan, versi legacy, dan/atau data interaktif bila tersedia.

## Intuisi Bag-of-Words

> Sumber: `pages/frontend/fellow-dashboard/data-engineering-domains/nlp/lessons/bow.html`

01

#### Intuisi Bag-of-Words

Cara paling sederhana mengubah teks menjadi angka — dan mengapa itu masih cukup berguna

Bayangkan kamu menerima ratusan artikel berita dan perlu mengelompokkannya berdasarkan topik — ekonomi, olahraga, teknologi. Kamu tidak perlu membaca tiap kalimat dengan cermat. Cukup lihat **kata-kata apa yang paling sering muncul**. Artikel yang banyak menyebut "saham", "inflasi", "rupiah" kemungkinan besar membahas ekonomi.

Inilah inti dari **Bag-of-Words (BoW)**: representasi teks sebagai kumpulan kata tanpa mempedulikan urutan. Seperti kantong berisi kata-kata — yang penting ada atau tidak ada, dan berapa banyak. Informasi gramatikal, konteks, dan urutan diabaikan sepenuhnya.

** Demo Sederhana

Tiga Kalimat → Tiga Vektor

↑ Sel berwarna = kata muncul. Angka = berapa kali. Urutan kata **tidak tersimpan**.

**

**Mengapa ini berguna?** Karena vektor angka bisa dihitung jaraknya, dimasukkan ke algoritma ML, dan dibandingkan secara matematis. Teks mentah tidak bisa — angka bisa. BoW adalah jembatan paling sederhana dari bahasa ke matematika.

02

#### Membangun Vocabulary & Vektor

Pipeline step-by-step: dari kumpulan dokumen ke document-term matrix

Vocabulary adalah **daftar semua kata unik** yang muncul di seluruh korpus. Setiap dokumen kemudian direpresentasikan sebagai vektor dengan panjang sesuai jumlah kata dalam vocabulary, di mana setiap elemen adalah frekuensi kata tersebut dalam dokumen itu.

** Pipeline BoW — Step by Step

Dari Tiga Berita ke Document-Term Matrix

1

Kumpulkan semua dokumen (korpus)

D1: "gojek ojek online jakarta"

D2: "tokopedia shopee belanja online"

D3: "gojek tokopedia startup indonesia"

2

Bangun Vocabulary — semua kata unik, diurutkan

V = ["belanja", "gojek", "indonesia", "jakarta", "ojek", "online", "shopee", "startup", "tokopedia"]

// |V| = 9 kata unik

3

Hitung frekuensi tiap kata per dokumen

D1 = [0, 1, 0, 1, 1, 1, 0, 0, 0] // gojek=1, jakarta=1, ojek=1, online=1

D2 = [1, 0, 0, 0, 0, 1, 1, 0, 1] // belanja=1, online=1, shopee=1, tokopedia=1

D3 = [0, 1, 1, 0, 0, 0, 0, 1, 1] // gojek=1, indonesia=1, startup=1, tokopedia=1

4

Hasil: Document-Term Matrix (3 dokumen × 9 kata)

<table>
<colgroup>
<col width="10%" />
<col width="10%" />
<col width="10%" />
<col width="10%" />
<col width="10%" />
<col width="10%" />
<col width="10%" />
<col width="10%" />
<col width="10%" />
<col width="10%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Dok
belanja
gojek
indonesia
jakarta
ojek
online
shopee
startup
tokopedia</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">D1
0
1
0
1
1
1
0
0
0</td>
<td align="left">D2
1
0
0
0
0
1
1
0
1</td>
<td align="left">D3
0
1
1
0
0
0
0
1
1</td>
</tr>
</tbody>
</table>

    from sklearn.feature_extraction.text import CountVectorizer

    korpus = [
        "gojek ojek online jakarta",
        "tokopedia shopee belanja online",
        "gojek tokopedia startup indonesia",
    ]

    vec = CountVectorizer()
    X   = vec.fit_transform(korpus)   # sparse matrix (3 × 9)

    print(vec.get_feature_names_out())
    # ['belanja', 'gojek', 'indonesia', 'jakarta', 'ojek',
    #  'online', 'shopee', 'startup', 'tokopedia']

    print(X.toarray())
    # [[0, 1, 0, 1, 1, 1, 0, 0, 0],   ← D1 (ojek online)
    #  [1, 0, 0, 0, 0, 1, 1, 0, 1],   ← D2 (belanja online)
    #  [0, 1, 1, 0, 0, 0, 0, 1, 1]]   ← D3 (startup)

**

**Masalah Sparse Matrix:** Dalam praktik nyata, vocabulary bisa mencapai ratusan ribu kata. Tapi tiap dokumen hanya menggunakan segelintir kata — 99%+ nilai dalam matrix adalah nol. Matrix seperti ini disebut *sparse*. Sklearn menggunakan format CSR (Compressed Sparse Row) agar hemat memori — hanya menyimpan nilai non-nol dan posisinya.

** Visualisasi Sparse Matrix

Majority Nol — Realita BoW di Skala Besar

Bayangkan 500 dokumen berita dengan vocabulary 10.000 kata. Tiap dokumen rata-rata menggunakan 200 kata unik. Ini berarti hanya **2% sel yang berisi angka**, sisanya nol.

↑ Simulasi 20 dokumen × 60 kata. Merah = ada nilai. Putih = nol. Representasi sebenarnya jauh lebih sparse dari ini.

03

#### Cosine Similarity

Mengukur kemiripan dua dokumen berdasarkan sudut antar vektornya — bukan jarak Euclidean

Setelah teks diubah menjadi vektor, kita perlu cara mengukur seberapa mirip dua dokumen. Pendekatan paling intuitif adalah **jarak Euclidean** — tapi ini bermasalah karena dokumen panjang punya vektor dengan nilai besar hanya karena panjangnya, bukan karena isinya berbeda.

Solusinya adalah **Cosine Similarity** — mengukur sudut antara dua vektor, bukan jaraknya. Sudut kecil (mendekati 0°) berarti sangat mirip (nilai mendekati 1). Sudut besar (mendekati 90°) berarti sangat berbeda (nilai mendekati 0). Cosine similarity tidak terpengaruh panjang dokumen.

Formula Cosine Similarity

cos(A, B) = A·B / (‖A‖ × ‖B‖)

A·B = dot product (jumlah elemen berpasangan dikalikan)

‖A‖ = magnitudo vektor A (akar kuadrat jumlah elemen²)

** Perhitungan Manual

Cosine Similarity D1 vs D2 — Dihitung Langkah demi Langkah

1

Vektor dua dokumen (dari vocabulary 9 kata di atas)

D1 = [0, 1, 0, 1, 1, 1, 0, 0, 0]

D2 = [1, 0, 0, 0, 0, 1, 1, 0, 1]

2

Hitung Dot Product — kalikan elemen yang sama posisi

D1·D2 = (0×1) + (1×0) + (0×0) + (1×0) + (1×0) + (1×1) + (0×1) + (0×0) + (0×1)

= 0 + 0 + 0 + 0 + 0 + 1 + 0 + 0 + 0 = 1 // hanya "online" yang sama!

3

Hitung Magnitudo tiap vektor

‖D1‖ = √(0²+1²+0²+1²+1²+1²+0²+0²+0²) = √4 = 2.0

‖D2‖ = √(1²+0²+0²+0²+0²+1²+1²+0²+1²) = √4 = 2.0

4

Hasil akhir

cos(D1, D2) = 1 ÷ (2.0 × 2.0) = 0.25 // mirip 25% — hanya berbagi 1 kata "online"

D1 · D2

0.25

Sedikit mirip — hanya berbagi kata "online"

D1 · D3

0.50

Cukup mirip — berbagi kata "gojek"

D2 · D3

0.50

Cukup mirip — berbagi kata "tokopedia"

    from sklearn.metrics.pairwise import cosine_similarity
    import numpy as np

    # X = document-term matrix dari CountVectorizer
    sim_matrix = cosine_similarity(X)

    # sim_matrix adalah array 3×3 — setiap sel = sim(Di, Dj)
    # [[1.00, 0.25, 0.50],   ← D1 vs semua
    #  [0.25, 1.00, 0.50],   ← D2 vs semua
    #  [0.50, 0.50, 1.00]]   ← D3 vs semua

    # Cari dokumen paling mirip dengan query
    query   = vec.transform(["startup ojek online"])
    scores  = cosine_similarity(query, X)[0]
    ranking = np.argsort(scores)[::-1]  # descending

04

#### Kelebihan & Keterbatasan BoW

Kapan BoW masih relevan, dan kapan harus diganti representasi yang lebih canggih

BoW terdengar kuno di era transformer — tapi ia masih hidup dan aktif dipakai di produksi. Memahami kapan BoW cukup dan kapan tidak akan membuatmu jadi engineer yang lebih bijaksana dalam memilih alat.

** Kelebihan Masih Relevan

-   Sangat cepat — fit & transform dalam milidetik
-   Mudah diinterpretasi — tahu persis kata mana yang berpengaruh
-   Efektif untuk text classification sederhana (spam, sentimen)
-   Tidak butuh GPU — berjalan di mesin apapun
-   Baseline yang kuat — sebelum coba model kompleks
-   Bekerja baik dengan data berlabel sedikit

** Keterbatasan Perlu Upgrade

-   Tidak menangkap urutan — "bukan bagus" = "bagus bukan"
-   Tidak paham sinonim — "mobil" ≠ "kendaraan" di BoW
-   Kata umum mendominasi tanpa pembobotan (→ TF-IDF)
-   Sparse & high-dimensional — memori besar untuk korpus besar
-   Tidak bisa handle out-of-vocabulary
-   Gagal untuk NLI, QA, dan task yang butuh konteks

**

**BoW masih dipakai di dunia nyata untuk:** filter spam email, kategori tiket support, moderasi konten level pertama, pencarian dokumen internal perusahaan, dan feature engineering dalam sistem rekomendasi. Selalu coba BoW + Naive Bayes atau Logistic Regression dulu sebelum loncat ke BERT — sering kali hasilnya sudah 85–90% dan 100× lebih cepat.

** Evolusi Representasi Teks

Dari BoW ke Transformer — Tiap Langkah Memperbaiki Kelemahan Sebelumnya

1

Bag-of-Words (lesson ini)

// Frekuensi kata, tanpa urutan, tanpa semantik

Kelemahan: kata umum mendominasi, semua kata dianggap sama penting

2

TF-IDF (lesson berikutnya)

// Beri bobot lebih pada kata langka yang diskriminatif

Kelemahan: masih tidak paham sinonim atau konteks

3

Word Vectors / Embeddings

// "mobil" dan "kendaraan" dekat secara geometris

Kelemahan: satu vektor per kata, tidak peduli konteks kalimat

4

Transformer (BERT, GPT)

// Representasi kontekstual — "bank" di kalimat berbeda = vektor berbeda

Trade-off: butuh GPU, data banyak, lebih lambat

05

#### Lab Interaktif — BoW Explorer

Masukkan tiga dokumen sendiri dan lihat vocabulary, matrix, cosine similarity, dan document search secara real-time

Semua perhitungan berjalan langsung di browser — tidak ada server. Edit tiga dokumen di bawah, lalu eksplorasi empat tampilan berbeda: vocabulary, document-term matrix, similarity heatmap, dan search.

** BoW Explorer — Real-time

Bag-of-Words Interaktif

Edit dokumen, lihat semua berubah otomatis

D1

Ojek online seperti Gojek dan Grab sudah mengubah cara masyarakat Jakarta bepergian setiap hari.

D2

Tokopedia dan Shopee bersaing ketat di pasar belanja online Indonesia dengan jutaan transaksi setiap hari.

D3

Startup teknologi Indonesia seperti Gojek dan Tokopedia sudah berkembang menjadi perusahaan besar kelas dunia.

▶ Jalankan BoW

↺ Reset

—

** Vocabulary

** Matrix

** Similarity

** Cari Dokumen

Vocabulary — semua kata unik (stop words dihapus) 0 kata

Klik "Jalankan BoW" untuk melihat vocabulary…

Document-Term Matrix —

Klik "Jalankan BoW" untuk melihat matrix…

Cosine Similarity — 3 × 3 heatmap —

Klik "Jalankan BoW" untuk melihat heatmap…

Cari dokumen paling mirip dengan query

Cari

Masukkan query dan klik Cari

Lesson berikutnya

##### TF-IDF & Document Search →

BoW punya kelemahan besar: kata umum seperti "dan", "ini", "yang" mendominasi vector padahal tidak bermakna. TF-IDF memperbaikinya dengan memberi bobot lebih pada kata yang langka tapi diskriminatif.

[Lanjut ke TF-IDF](#/participant-ai-lab-tfidf)

## Apa itu POS Tagging?

> Sumber: `pages/frontend/fellow-dashboard/data-engineering-domains/nlp/lessons/pos-ner.html`

01

#### Apa itu POS Tagging?

Memberi label jenis kata pada setiap token — fondasi analisis sintaksis

**Part-of-Speech (POS) Tagging** adalah proses melabeli setiap token dalam kalimat dengan kategori gramatikal — NOUN, VERB, ADJ, dll. Ini adalah langkah fundamental yang digunakan pipeline NLP downstream seperti dependency parsing, NER, dan machine translation.

** Universal Dependencies — 17 POS Tags

Standar global yang digunakan IndoNLP dan 100+ bahasa lain

NOUN

Nomina

meja, kucing, *Jakarta*

VERB

Verba

makan, berlari, *berpikir*

ADJ

Adjektiva

cantik, besar, *merah*

ADV

Adverbia

sangat, selalu, *tidak*

PRON

Pronomina

saya, dia, *mereka*

PROPN

Nama Diri

Budi, Solo, *Tokopedia*

DET

Determiner

ini, itu, *para*

ADP

Preposisi

di, ke, *dari*

CONJ

Konjungsi

dan, atau, *tetapi*

NUM

Numeralia

satu, 42, *ribuan*

PUNCT

Punctuasi

. , ! *?*

AUX

Auxiliar

sudah, akan, *harus*

** Masalah Utama — Ambiguitas POS

Satu kata, banyak kemungkinan tag — konteks menentukan

Kalimat 1:

NOUNMakan NOUNsiang PRONsaya VERBterlambat

"Makan" = NOUN (sebagai subjek)

Kalimat 2:

PRONSaya VERB"\>VERBmakan NOUNnasi NOUNgoreng

"makan" = VERB (sebagai predikat)

02

#### HMM & Algoritma Viterbi

Matematika di balik POS tagger klasik — probabilitas transisi dan emisi

**Hidden Markov Model (HMM)** memodelkan POS tagging sebagai: kita *observasi* kata-kata, tapi *hidden state*-nya adalah tag. Model belajar dua probabilitas dari corpus berlabel.

** Dua Probabilitas Kunci

Emission & Transition — dasar HMM tagger

1

Emission Probability — P(kata | tag)

P(makan | VERB) = count(VERB, makan) / count(VERB) = 320 / 12,450 = 0.026

P(makan | NOUN) = 89 / 18,300 = 0.005

// "makan" 5× lebih mungkin VERB daripada NOUN

2

Transition Probability — P(tag\_t | tag\_{t-1})

P(VERB | PRON) = count(PRON→VERB) / count(PRON) = 0.72 (sangat sering)

P(VERB | VERB) = 0.11 (dua VERB berurutan jarang)

3

Viterbi Score — gabungan keduanya

v(t, i) = max<sub>j</sub> [ v(t-1, j) × P(tag\_i | tag\_j) × P(kata\_t | tag\_i) ]

// v = viterbi score, t = posisi kata, i/j = tag index

**️ Viterbi Table — Realtime

Kalimat "Saya makan nasi" — lihat tabel probabilitas terisi

▶ Jalankan Viterbi

↺ Reset

Klik cell untuk lihat detail perhitungan

**

**Kompleksitas Viterbi:** O(N × T²) di mana N = panjang kalimat, T = jumlah tag. Untuk kalimat 20 kata dengan 17 tag = 20 × 17² = 5,780 operasi. Jauh lebih efisien dari brute force O(T\^N) = 17\^20 ≈ 2 × 10\^24.

03

#### POS Tags Bahasa Indonesia

Tantangan unik morfologi Indonesia yang tidak ada di English

Bahasa Indonesia punya karakteristik unik: **tidak ada infleksi tense** (kata kerja tidak berubah untuk waktu), **reduplikasi** (meja-meja, berlari-lari), dan **sistem honorifik** (Bapak, Ibu, Mas, Mbak) yang mempengaruhi POS tagging.

** Kasus Khusus Indonesia

Fitur linguistik yang bikin POS tagger English gagal

Reduplikasi

NOUNmeja-meja VERBberlari-lari ADJperlahan-lahan

Reduplikasi bisa NOUN (plural), VERB (repetitif), ADJ (intensif)

Konfiks (me-...-kan, di-...-i)

VERBmemberikan VERBdipermasalahkan VERBmempercayai

Selalu VERB — konfiks adalah marker verbal kuat

Honorifik sebagai DET/PROPN

DETBapak DETIbu PROPNDr.

Sebelum nama = DET, tanpa nama = NOUN

Partikel enklitik

NOUNbukunya VERBmakanlah VERBapakah

-nya, -lah, -kah adalah klitik — token atau bagian token?

04

#### Named Entity Recognition (NER)

Mengidentifikasi dan mengklasifikasi entitas bernama dalam teks

NER mengidentifikasi **entitas dunia nyata** dalam teks: nama orang, organisasi, lokasi, tanggal, dll. Ini adalah komponen kritis dalam information extraction, question answering, dan knowledge graph construction.

** Format IOB2 — Inside-Outside-Beginning

Standar labeling NER yang digunakan semua model modern

1

Tiga prefix IOB2

B-TYPE = Beginning — token pertama entitas

I-TYPE = Inside — token lanjutan entitas

O = Outside — bukan bagian entitas

2

Contoh: "Budi Doremi bekerja di Bank Mandiri Jakarta"

Budi Doremi bekerja di Bank Mandiri Jakarta

B-PER I-PER O O B-ORG I-ORG B-LOC

** Kategori NER Dataset Indonesia (IndoNER)

8 kategori entitas dalam dataset resmi

PER

Person

Joko Widodo, Susi Pudjiastuti, *Raisa*

ORG

Organization

Tokopedia, Universitas Indonesia, *KPK*

LOC

Location

Jakarta, Gunung Bromo, *Selat Sunda*

DATE

Date/Time

17 Agustus 1945, kemarin, *tahun depan*

EVT

Event

Pemilu 2024, Asian Games, *Lebaran*

PROD

Product

iPhone 15, Indomie Goreng, *Gojek*

05

#### Ambiguitas Indonesia **

Kasus-kasus nyata yang bikin NLP model bingung — termasuk "Solo"

Bahasa Indonesia punya banyak kata yang maknanya bergantung 100% pada konteks. Ini adalah **tantangan terbesar NER Indonesia** — dan sumber lelucon tak ada habisnya.

** Kasus "Solo" — Triple Ambiguity

Satu kata, tiga makna, tiga tag berbeda

B-LOC

"Kereta dari **Solo** tiba pukul 08.00"

Konteks: kereta + dari + pukul → LOC (kota Surakarta)

ADJ

"Dia pergi **solo** tanpa teman"

Konteks: pergi + tanpa teman → ADJ (sendirian, borrowing English)

B-PER

"**Solo** memenangkan kompetisi itu"

Konteks: subjek + memenangkan → PER (nama orang)

**

**Bonus joke:** "Pria Solo pergi solo ke Solo" — dalam satu kalimat ini: PER + ADJ + LOC. Model NER state-of-the-art pun bisa keliru di sini tanpa konteks yang cukup.

**️ Kata-kata Ambigu Terkenal Indonesia

Kasus yang sering muncul di benchmark NLP Indonesia

Malang

Bima

Kia

Lima

Pare

** Bagaimana Model Modern Resolusi Ambiguitas

BERT-based NER — konteks bidireksional menyelamatkan

1

HMM klasik — hanya lihat ke kiri

P(tag | kata, tag\_sebelumnya) → window terbatas

// "... ke Solo" → P(LOC|Solo, ADP=ke) = 0.71

2

BERT — lihat seluruh kalimat dua arah

P(tag | kata, seluruh konteks kalimat)

// "Solo memenangkan..." → kiri lihat subjek + kanan lihat predikat

// → P(PER|Solo) meningkat drastis

06

#### Evaluasi — Precision, Recall & F1

Angka real dari benchmark IndoNLP — bukan ilustrasi

Evaluasi NER menggunakan **entity-level F1** — sebuah entitas dianggap benar hanya jika boundary *dan* tipe-nya 100% tepat. Partial match tidak dihitung.

** Formula Precision, Recall, F1

Perhitungan eksak untuk NER entity-level

1

Precision — dari semua yang diprediksi, berapa yang benar?

Precision = TP / ( TP + FP ) = 85 / (85+15) = 0.85

2

Recall — dari semua yang ada di data, berapa yang ditemukan?

Recall = TP / ( TP + FN ) = 85 / (85+20) = 0.81

3

F1 Score — harmonic mean, hukum model yang imbalanced

F1 = 2 × ( P × R ) / ( P + R ) = 2×(0.85×0.81)/(0.85+0.81) = 0.83

** Benchmark NER Indonesia — Angka Real (IndoNER 2022)

Perbandingan model pada dataset berita Indonesia

<table>
<colgroup>
<col width="16%" />
<col width="16%" />
<col width="16%" />
<col width="16%" />
<col width="16%" />
<col width="16%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Model
PER F1
ORG F1
LOC F1
Overall F1
Speed</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Rule-based
0.61
0.48
0.55
0.54
<em></em></td>
<td align="left">HMM
0.74
0.65
0.71
0.70
<em></em></td>
<td align="left">BiLSTM-CRF
0.83
0.76
0.81
0.80
<em></em></td>
<td align="left">IndoBERT-NER ⭐
0.92
0.87
0.91
0.90
<em></em></td>
</tr>
</tbody>
</table>

**

LOC selalu lebih tinggi dari ORG karena nama kota/negara lebih konsisten. ORG paling sulit — nama perusahaan Indonesia sangat beragam dan sering tidak ada di training data.

**️ Confusion Matrix Interaktif

Klik cell untuk lihat contoh kesalahan model

Pred: OPred: PERPred: ORGPred: LOC

07

#### ** Lab + Quiz

POS tagger, NER highlighter, dan quiz interaktif dengan skor

**️ POS Tagger Interaktif

Presiden Joko Widodo meresmikan jalan tol baru di Jawa Tengah kemarin.

Tag POS

Reset

Hasil POS Tagging:

NOUN VERB ADJ ADV PRON PROPN ADP DET AUX

** NER Highlighter

Budi Santoso dari Surabaya bekerja di PT Telkom Indonesia sejak Januari 2020. Ia bertemu Ibu Sari di kantor Bank BCA Jakarta Selatan kemarin.

Highlight Entitas

Reset

Named Entities:

PER ORG LOC DATE

** POS & NER Quiz Skor: 0 / 0

Modul berikutnya

##### Transformers & BERT →

Dari HMM ke attention mechanism — arsitektur yang merevolusi NLP.

[Coming Soon **](#)

## Pipeline Preprocessing

> Sumber: `pages/frontend/fellow-dashboard/data-engineering-domains/nlp/lessons/preprocessing.html`

01

#### Pipeline Preprocessing

Urutan transformasi teks sebelum masuk ke model — dan kenapa urutan itu penting

Preprocessing bukan sekadar "membersihkan" teks — ini adalah serangkaian transformasi yang **mengubah teks mentah menjadi representasi yang bisa dipelajari model**. Urutan langkah sangat penting: stemming sebelum stopword removal menghasilkan hasil berbeda dibanding sebaliknya.

**

Raw Text

"Saya sdh MAKAN, tapi tdk kenyang!!"

→

**

Lowercase

"saya sdh makan, tapi tdk kenyang!!"

→

**

Noise Removal

"saya sdh makan tapi tdk kenyang"

→

**

Normalisasi

"saya sudah makan tapi tidak kenyang"

→

**

Stopword

"makan kenyang"

→

**

Stemming

"makan kenyang"

→

**

Final Tokens

["makan", "kenyang"]

**

**Urutan penting!** Jika kamu hapus stopword sebelum normalisasi, kata "tdk" tidak akan cocok dengan stopword list yang berisi "tidak". Selalu normalisasi dulu, baru hapus stopword.

** Panduan Penggunaan

Kapan pakai teknik apa?

<table>
<colgroup>
<col width="20%" />
<col width="20%" />
<col width="20%" />
<col width="20%" />
<col width="20%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Teknik
Sentiment Analysis
Information Retrieval
Machine Translation
Topic Modeling</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Lowercasing
<em></em>
<em></em>
<em></em> hati-hati
<em></em></td>
<td align="left">Noise Removal
<em></em>
<em></em>
<em></em>
<em></em></td>
<td align="left">Stopword Removal
<em></em> bisa hilang nuansa
<em></em>
<em></em>
<em></em></td>
<td align="left">Stemming
<em></em>
<em></em>
<em></em>
<em></em></td>
<td align="left">Lemmatization
<em></em>
<em></em>
<em></em>
<em></em></td>
</tr>
</tbody>
</table>

02

#### Lowercasing

Langkah paling sederhana — tapi penuh edge cases tersembunyi

Mengubah semua huruf ke lowercase memastikan "Makan", "MAKAN", dan "makan" diperlakukan sebagai token yang sama. Tanpa ini, vocabulary model membengkak tidak perlu.

** Efek pada Vocabulary Size

Kenapa lowercasing penting secara kuantitatif?

1

Tanpa lowercasing — "makan" muncul sebagai 4 token berbeda

"Makan" + "MAKAN" + "makan" + "Makan." = 4 entri vocabulary

2

Dengan lowercasing — semua jadi satu

"makan" = 1 entri vocabulary

// vocabulary size berkurang, embedding lebih efisien

** Edge Cases — Jangan Asal Lowercase!

Kasus di mana lowercasing merusak makna

US → us

Negara (United States) berubah jadi kata ganti "kita"

Apple → apple

Nama perusahaan vs buah apel — berbeda makna

Dr. Siti → dr. siti

Named Entity (NER) menjadi tidak bisa dikenali

COVID-19 → covid-19

Akronim — aman di-lowercase untuk domain umum

**

Untuk task NER atau sentiment yang sensitif terhadap proper noun, gunakan **truecasing** bukan lowercasing — normalisasi kapitalisasi berdasarkan konteks linguistik.

** Coba Sendiri — Lowercasing

Saya SUKA makan Nasi Goreng di JAKARTA setiap Pagi!

Apply Lowercase

Reset

Output:

03

#### Noise Removal

Regex patterns untuk membersihkan teks dari karakter tidak relevan

"Noise" adalah karakter atau pola yang tidak membawa informasi semantik untuk task kita — punctuation, HTML tags, URL, emoji, angka, whitespace berlebih. Kuncinya: **apa yang noise tergantung pada task-mu**.

** Regex Patterns — Step by Step

Transformasi per pattern pada satu kalimat

Input: "Harga \<b\>Rp 50.000\</b\> ** cek di https://toko.id/item?id=123 \#promo"

1 `re.sub(r'<[^>]+>', '', text)` Hapus HTML tags

"Harga Rp 50.000 ** cek di https://toko.id/item?id=123 \#promo"

2 `re.sub(r'https?://\S+', '', text)` Hapus URL

"Harga Rp 50.000 ** cek di \#promo"

3 `re.sub(r'[^\x00-\x7F]+', '', text)` Hapus non-ASCII (emoji)

"Harga Rp 50.000 cek di \#promo"

4 `re.sub(r'[^\w\s]', '', text)` Hapus punctuation & special chars

"Harga Rp 50000 cek di promo"

5 `re.sub(r'\d+', '', text)` Hapus angka

"Harga Rp cek di promo"

6 `re.sub(r'\s+', ' ', text).strip()` Normalize whitespace

"Harga Rp cek di promo"

** Kapan JANGAN Hapus

Noise yang membawa makna — task dependent

** ** **

Sentiment Analysis

Emoji membawa sentimen kuat — jangan hapus, encode saja

Rp 50.000

E-commerce NLP

Angka harga adalah fitur penting

\#promo @brand

Social Media Analysis

Hashtag dan mention adalah signal topik

Dr. Prof. Ir.

Named Entity Recognition

Title prefix membantu identifikasi entitas

** Regex Noise Remover

Cek promo di https://tokopedia.com/item?id=123 ** harga \<b\>Rp 99.000\</b\> aja!! \#murah \#promo2024

HTML tags URLs Emoji Punctuation Angka Hashtag

Clean Text

Reset

Output:

04

#### Stopword Removal

Menghapus kata yang terlalu umum dan tidak memberi informasi — tapi tidak selalu benar

Stopword adalah kata-kata dengan **frekuensi tinggi tapi nilai informasi rendah** untuk task tertentu: "yang", "di", "dan", "adalah", "the", "a", "is". Menghapusnya mengurangi noise dan mempercepat training.

** Hubungan dengan TF-IDF

Mengapa stopword punya IDF rendah?

1

IDF (Inverse Document Frequency)

IDF(t) = log ( N / df(t) )

// N = total dokumen, df(t) = dokumen yang mengandung kata t

2

Kata "yang" muncul di hampir semua dokumen

IDF("yang") = log( 10,000 / 9,980 ) ≈ 0.001 (sangat rendah)

3

Kata "inflasi" muncul di sedikit dokumen

IDF("inflasi") = log( 10,000 / 120 ) ≈ 4.42 (tinggi, informatif)

** Stopword Bahasa Indonesia

756 kata dalam daftar resmi (NLTK + Sastrawi)

Konjungsi

danatau tapinamun sertakarena sehinggamaka

Preposisi

dike daripada dalamuntuk denganoleh

Kata Ganti

sayaaku kamudia merekakita kamiini

Partikel

punlah kahtah yangadalah itutersebut

** Stopword Highlighter Stopword di-highlight merah — klik untuk hapus manual, atau hapus semua sekaligus

Saya sedang belajar tentang pemrosesan teks bahasa Indonesia karena hal ini sangat penting untuk pengembangan model kecerdasan buatan yang dapat memahami bahasa kita dengan baik.

Highlight Stopwords

Hapus Semua

Reset

Hasil highlight (klik kata merah untuk hapus satu per satu):

05

#### Stemming

Memangkas imbuhan untuk mendapatkan akar kata — rule-based dan cepat

Stemming adalah proses menghapus imbuhan (prefix, suffix, infix, confix) secara mekanis menggunakan aturan morfologi. Hasilnya tidak selalu kata yang valid secara kamus — yang penting konsisten. Untuk Bahasa Indonesia, **Algoritma Nazief-Adriani** (diimplementasikan di PySastrawi) adalah standar de facto.

** Morfologi Bahasa Indonesia — Semua Tipe Imbuhan

Imbuhan yang perlu di-strip saat stemming

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Tipe
Imbuhan
Contoh
Hasil Stem</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">Prefix
<code>me-, di-, ke-, ber-, ter-, pe-, se-</code>
memakan, dimakan, berkumpul
makan, makan, kumpul</td>
<td align="left">Suffix
<code>-kan, -an, -i, -nya, -lah, -kah</code>
makanan, memakannya, makanlah
makan, makan, makan</td>
<td align="left">Confix
<code>ke-an, pe-an, ber-an, per-an</code>
kecantikan, pembelajaran, perjalanan
cantik, ajar, jalan</td>
<td align="left">Infix
<code>-el-, -em-, -er-</code>
telapak, gemetar, gerigi
tapak, getar, gigi</td>
</tr>
</tbody>
</table>

** Algoritma Nazief-Adriani — Step by Step

Stemming kata "mempelajari"

1

Input kata

mempelajari

Cek apakah ada di kamus → TIDAK → lanjut stripping

2

Strip suffix `-i`

mempelaiar i

→ "mempelaiar" — cek kamus → TIDAK → lanjut

3

Strip prefix `me-` (dengan nasal `m→p`)

mem pelajar

→ "pelajar" — cek kamus → ADA **

4

Strip prefix `pe-`

pe lajar

→ "lajar" — cek kamus → TIDAK → backtrack ke "pelajar"

**

Hasil akhir

pelajar

Stem dari "mempelajari" = **pelajar**

** Stemmer Interaktif — Bahasa Indonesia

Stem

Atau stem paragraf:

Pembelajaran mesin membutuhkan pemahaman mendalam tentang matematika dan pemrograman komputer.

Stem Semua Kata

Reset

06

#### Lemmatization

Berbeda dari stemming — hasilnya selalu kata valid dalam kamus

Lemmatization menggunakan **analisis morfologi dan kamus** untuk menemukan *lemma* (bentuk dasar kata). Hasilnya selalu kata yang valid, berbeda dengan stemming yang bisa menghasilkan kata "putus" dari kata yang tidak berhubungan.

** Stemming vs Lemmatization — Perbandingan Eksak

Kasus di mana hasilnya berbeda signifikan

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Kata Asal
Stemming (Sastrawi)
Lemmatization
Mana yang Benar?</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">berlari
lari
lari
Sama <em></em></td>
<td align="left">mempermasalahkan
masalah
masalah
Sama <em></em></td>
<td align="left">universitas
univers
universitas
Beda <em></em></td>
<td align="left">kecantikan
cantik
cantik
Sama <em></em></td>
</tr>
</tbody>
</table>

**

**Stemming lebih cepat** (rule-based, O(n)) tapi less accurate. **Lemmatization lebih akurat** (dictionary lookup, O(n log n)) tapi lambat. Untuk Bahasa Indonesia dengan morfologi kompleks, lemmatization lebih direkomendasikan.

07

#### Normalisasi Teks

Menangani slang, singkatan, dan typo khas Indonesia — tantangan unik NLP lokal

Teks media sosial Indonesia penuh dengan singkatan informal, slang, dan variasi penulisan yang tidak ada di kamus standar. Normalisasi mengubah bentuk tidak standar ini ke bentuk baku sebelum proses lainnya.

** Kamus Normalisasi Bahasa Indonesia

Contoh mapping — 300+ entri dalam dataset publik

Singkatan SMS/Chat

tdk→tidak

sdh→sudah

dgn→dengan

utk→untuk

yg→yang

krn→karena

Slang / Gaul

gw→saya

lu→kamu

gabisa→tidak bisa

gimana→bagaimana

emang→memang

banget→sangat

Variasi Ejaan

sy→saya

aja→saja

kalo→kalau

udah→sudah

nggak→tidak

gitu→begitu

** Normalizer Bahasa Indonesia

Gw udah coba tapi gabisa, emang susah banget. Gimana caranya biar bisa? Krn gw nggak ngerti sm sekali.

Normalize

Reset

Output:

08

#### ** Pipeline Lab

Gabungkan semua teknik — toggle tiap step dan lihat teks berubah realtime

Sekarang saatnya mencoba semua teknik dalam satu pipeline. Toggle setiap step, lihat bagaimana teks berubah di setiap tahap, dan pahami dampak urutan preprocessing.

Input Teks

Gw udah belajar Machine Learning selama 3 bulan, tapi masih bingung dgn matematikanya!! ** Ada yg bisa bantu? Cek di https://github.com/example

Lowercase

Semua huruf → kecil

—

Noise Removal

Hapus URL, HTML, emoji, punctuation

—

Normalisasi

Slang → formal, singkatan → kata penuh

—

Stopword Removal

Hapus kata frekuensi tinggi tidak bermakna

—

Stemming

Potong imbuhan ke kata dasar

—

Final Output

—

Lesson berikutnya

##### POS Tagging & NER →

Setelah preprocessing, pelajari cara mengidentifikasi jenis kata dan entitas dalam teks.

[Lanjut ke POS & NER](#/participant-ai-lab-pos-ner)

## Batasan Bag-of-Words

> Sumber: `pages/frontend/fellow-dashboard/data-engineering-domains/nlp/lessons/tfidf.html`

01

#### Batasan Bag-of-Words

Mengapa menghitung kata saja tidak cukup — dan apa yang perlu diperbaiki

Di lesson sebelumnya kita membangun BoW — representasi teks sebagai vektor frekuensi kata. Hasilnya cukup baik untuk banyak kasus. Tapi ada satu kelemahan mendasar: **semua kata diperlakukan setara**, padahal jelas kata "dan", "di", "yang" tidak lebih informatif dari kata "korupsi", "tsunami", atau "Tokopedia".

** Masalah BoW

Kata Umum Mendominasi Vektor

!

Dokumen berita ekonomi Indonesia

"Bank Indonesia **dan** pemerintah **yang** bekerja sama **di** bidang moneter"

// Kata paling tinggi skornya di BoW:

"dan" = 847 , "yang" = 634 , "di" = 521 , "bank" = 12 , "moneter" = 3

!

Akibatnya — dua dokumen sangat berbeda kelihatan "mirip"

"Pemerintah dan rakyat yang bersatu" ←→ "Pemerintah dan bank yang bangkrut"

cosine sim = 0.82 // sangat mirip di BoW, padahal topik berbeda jauh!

** BoW Murni

-   Kata "dan", "di", "yang" dapat skor tinggi
-   Kata informatif ("moneter", "inflasi") tenggelam
-   Dokumen berbeda topik kelihatan mirip
-   Tidak diskriminatif untuk pencarian

** TF-IDF

-   Kata umum yang muncul di semua dokumen dapat skor rendah
-   Kata langka yang diskriminatif dapat skor tinggi
-   Dokumen yang benar-benar mirip topik terdeteksi
-   Standar emas untuk Information Retrieval klasik

**

**Solusi:** Kita butuh bobot yang mempertimbangkan dua hal sekaligus — seberapa sering kata muncul *dalam dokumen itu* (lokal), DAN seberapa langka kata itu *di seluruh korpus* (global). Inilah TF-IDF.

02

#### Term Frequency (TF)

Ukuran lokal — seberapa sering kata muncul dalam satu dokumen tertentu

**Term Frequency** mengukur kerapatan kata dalam satu dokumen. Asumsinya sederhana: semakin sering kata muncul dalam dokumen, semakin besar kemungkinan kata itu merepresentasikan topik dokumen tersebut. Namun kita *normalkan* dengan total kata agar dokumen panjang tidak otomatis mendapat skor lebih tinggi dari dokumen pendek.

Formula Term Frequency

TF(t, d) = jumlah kemunculan t dalam d total kata dalam d

t= term (kata yang dihitung)

d= document (dokumen target)

** Contoh TF — Berita Gojek

Dokumen: "Gojek meluncurkan layanan baru di Jakarta dan Bandung"

1

Hitung total kata setelah tokenisasi

"gojek meluncurkan layanan baru jakarta bandung"

total kata= 7 // setelah hapus stop words

2

Hitung TF tiap kata (frekuensi ÷ total)

TF("gojek")= 1 ÷ 7= 0.143

TF("jakarta")= 1 ÷ 7= 0.143

TF("layanan")= 1 ÷ 7= 0.143 // semua kata muncul 1× → TF sama

3

Jika kata muncul lebih dari sekali — TF naik

"Gojek dan Gojek lagi dan lagi" // setelah stop words: "gojek gojek"

TF("gojek")= 2 ÷ 2= 1.000 // dokumen berbicara hampir hanya tentang gojek

**

**Masalah TF saja:** Kata "dan" punya TF sangat tinggi di hampir semua dokumen, tapi tidak bermakna. Di sinilah IDF masuk — menghukum kata yang terlalu umum di seluruh korpus.

03

#### Inverse Document Frequency (IDF)

Ukuran global — seberapa langka kata di seluruh korpus. Semakin langka, semakin berharga.

**IDF** memberi skor berdasarkan kelangkaan kata. Jika kata muncul di hampir semua dokumen — seperti "dan", "ini", "adalah" — maka ia mendapat skor IDF mendekati nol. Jika kata sangat langka dan hanya muncul di beberapa dokumen — seperti "deflasi", "koruptor", "startup" — maka ia mendapat skor IDF tinggi.

Formula Inverse Document Frequency

IDF(t) = log N df(t)

N= total dokumen dalam korpus

df(t)= jumlah dokumen yang mengandung kata t

** Visualisasi Skala IDF — Korpus 1000 Dokumen

Semakin Langka → Skor IDF Semakin Tinggi

IDF = log(1000 / df). Bar menunjukkan skor relatif. Kata yang muncul di semua dokumen mendapat IDF ≈ 0.

Fungsi logaritma dipilih bukan sembarangan — ia **menyeimbangkan skala**. Tanpa log, kata yang muncul di 1 dokumen dari 1000 mendapat skor 1000× lebih tinggi dari kata yang muncul di 10 dokumen. Dengan log, perbedaannya menjadi log(1000) vs log(100) = 3 vs 2 — jauh lebih wajar secara linguistik.

    import math

    N = 1000  # total dokumen

    def idf(df):
        # +1 pada penyebut = Laplace smoothing (hindari div/0)
        return math.log((N + 1) / (df + 1)) + 1

    print(idf(1000))  # "dan" muncul di semua  → 1.001 (hampir 0)
    print(idf(500))   # "jakarta" setengah dok → 1.693
    print(idf(10))    # "deflasi" sangat langka → 5.298
    print(idf(1))     # "koruptor X" unik      → 7.909

04

#### Skor TF-IDF — Menggabungkan Dua Bobot

Perkalian sederhana yang menghasilkan representasi yang jauh lebih bermakna dari BoW

Skor TF-IDF adalah perkalian langsung dari dua komponen: **TF** (bobot lokal — penting dalam dokumen ini) dan **IDF** (bobot global — langka di korpus). Kata mendapat skor tinggi hanya jika ia sering muncul dalam dokumen DAN langka di korpus — persis seperti karakteristik kata kunci yang ideal.

Formula TF-IDF

TF-IDF(t, d) = TF(t, d) × IDF(t)

TF= sering muncul dalam dokumen ini

IDF= langka di seluruh korpus

TF-IDF= tinggi hanya jika keduanya terpenuhi

** Perbandingan — Tiga Kata dalam Satu Dokumen

Korpus: 100 berita startup Indonesia

↑ "startup" menang karena kombinasi TF tinggi × IDF tinggi. "dan" kalah meski TF tinggi karena IDF mendekati nol.

    from sklearn.feature_extraction.text import TfidfVectorizer

    korpus = [
        "Gojek startup unicorn Indonesia meluncurkan fitur baru",
        "Tokopedia dan Shopee bersaing di pasar e-commerce",
        "Startup Indonesia makin banyak mendapat pendanaan",
    ]

    vec = TfidfVectorizer()
    X   = vec.fit_transform(korpus)

    # Lihat skor TF-IDF dokumen pertama
    feature_names = vec.get_feature_names_out()
    scores        = X[0].toarray()[0]

    # Urutkan dari skor tertinggi
    top_words = sorted(
        zip(feature_names, scores),
        key=lambda x: x[1], reverse=True
    )[:5]
    # [('unicorn', 0.52), ('fitur', 0.52),
    #  ('meluncurkan', 0.52), ('gojek', 0.40), ...]

**

**Keyword Extraction gratis:** Kata-kata dengan skor TF-IDF tertinggi per dokumen adalah keyword otomatis — bisa dipakai untuk tag artikel, summarization, atau indexing. Ini adalah cara kerja search engine seperti Elasticsearch sebelum era neural search.

05

#### Mesin Pencari dengan TF-IDF

Dari vector space model ke document retrieval yang bisa kamu bangun dalam 10 baris Python

Dengan vektor TF-IDF untuk setiap dokumen, kita bisa membangun mesin pencari sederhana: representasikan query sebagai vektor TF-IDF menggunakan vocabulary yang sama, lalu hitung cosine similarity antara query dan semua dokumen, dan kembalikan yang paling mirip.

⚙️ Pipeline Search Engine TF-IDF

Dari Korpus ke Hasil Pencarian

1

Offline: build index (dilakukan sekali)

Korpus D₁…Dₙ → TfidfVectorizer.fit\_transform → Matrix X (n × |V|)

2

Online: proses query (setiap pencarian)

Query q → vectorizer.transform → Vektor q (1 × |V|)

3

Hitung cosine similarity query vs semua dokumen

scores = cosine\_similarity(q, X) // array 1×n

4

Urutkan dan kembalikan top-k dokumen

ranking = argsort(scores)[::-1][:k]

    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    import numpy as np

    # 1. Build index
    vec = TfidfVectorizer()
    X   = vec.fit_transform(korpus)

    def search(query, top_k=3):
        # 2. Vektorisasi query
        q_vec  = vec.transform([query])
        # 3. Cosine similarity
        scores = cosine_similarity(q_vec, X)[0]
        # 4. Ranking
        top    = np.argsort(scores)[::-1][:top_k]
        return [(korpus[i], scores[i]) for i in top if scores[i] > 0]

    search("startup Indonesia pendanaan")
    # [("Startup Indonesia makin banyak...", 0.72),
    #  ("Gojek startup unicorn...",        0.41)]

** Kelebihan TF-IDF Search

-   Sangat cepat — matrix multiplication di sparse space
-   Tidak butuh training — hanya statistik korpus
-   Interpretable — bisa lihat kata mana yang drive similarity
-   Efektif untuk exact keyword matching

** Keterbatasan

-   Tidak mengerti sinonim — "mobil" ≠ "kendaraan"
-   Tidak paham konteks — "bank sungai" vs "bank uang"
-   Vocabulary mismatch dengan query pendek
-   Tidak bisa generalisasi ke unseen terms

06

#### Pra-pemrosesan Teks Bahasa Indonesia

TF-IDF hanya sebaik teks yang masuk — preprocessing menentukan kualitas representasi

Bahasa Indonesia butuh pra-pemrosesan khusus sebelum TF-IDF bisa bekerja optimal. Ada tiga tahap utama: **case folding**, **stopword filtering**, dan **stemming**. Stemming Bahasa Indonesia jauh lebih kompleks dari Bahasa Inggris karena sistem afiksasi yang kaya.

⚙️ Pipeline Pra-pemrosesan Bahasa Indonesia

Teks Mentah → Siap TF-IDF

1

Case Folding — Menyeragamkan huruf kecil

"GoJek MELUNCURKAN Fitur BARU" → "gojek meluncurkan fitur baru"

// "GoJek" dan "gojek" = token berbeda tanpa ini

2

Stopword Removal — Hapus kata tidak bermakna

"gojek meluncurkan fitur baru di jakarta dan bandung"

→ "gojek meluncurkan fitur baru jakarta bandung"

// Daftar stopword B.Indonesia: \~758 kata (PNL-ITB)

3

Stemming Nazief-Adriani — Kembalikan ke kata dasar

"meluncurkan"→"luncur"    "pendanaan"→"dana"

"mempertanggungjawabkan"→"tanggung jawab"

** Algoritma Nazief-Adriani — Contoh Stemming

Stripping awalan dan akhiran bertahap

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Kata Asli
Morfologi
Kata Dasar
Aturan</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">meluncurkan
me- + luncur + -kan
luncur
Strip me- → Strip -kan</td>
<td align="left">pendanaan
pe- + dana + -an
dana
Strip pe(N)- → Strip -an</td>
<td align="left">ketidakhadiran
ke- + tidak + hadir + -an
hadir
Strip ke- + tidak → Strip -an</td>
<td align="left">memberikan
mem- + beri + -kan
beri
Strip mem- → Strip -kan</td>
</tr>
</tbody>
</table>

    # Install: pip install PySastrawi
    from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
    from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory

    factory  = StemmerFactory()
    stemmer  = factory.create_stemmer()

    sw_factory = StopWordRemoverFactory()
    stopword   = sw_factory.create_stop_word_remover()

    teks = "Gojek sedang meluncurkan layanan pengiriman baru"
    step1 = teks.lower()
    step2 = stopword.remove(step1)   # hapus "sedang"
    step3 = stemmer.stem(step2)       # → "gojek luncur layan kirim baru"

07

#### Lab — TF-IDF Search Engine

Bangun mesin pencari dari dokumenmu sendiri. Tambah artikel, tulis query, lihat ranking real-time.

Search engine di bawah ini berjalan sepenuhnya di browser. Tambah atau edit dokumen, build index, lalu cari — semua perhitungan TF-IDF dan cosine similarity dilakukan client-side tanpa server.

** TF-IDF Search Engine — Real-time

Mesin Pencari Interaktif

Tambah dokumen → Build Index → Cari

** Korpus

** TF-IDF Index

** Cari

+ Tambah Dokumen

** Build Index

↺ Reset

—

Top keywords per dokumen (skor TF-IDF tertinggi) —

Build index terlebih dahulu…

Cari dokumen berdasarkan query

** Cari

Build index terlebih dahulu, lalu masukkan query.

Lesson berikutnya

##### Word Vectors & Embeddings →

TF-IDF masih tidak paham sinonim atau makna. Word2Vec dan GloVe mengubah kata menjadi vektor padat di mana "ojek" dan "kendaraan" berdekatan secara geometris.

[Kembali ke Katalog NLP](#/participant-ai-lab-nlp)

## Apa itu Token?

> Sumber: `pages/frontend/fellow-dashboard/data-engineering-domains/nlp/lessons/tokenization.html`

01

#### Apa itu Token?

Langkah pertama setiap pipeline NLP — memotong teks menjadi unit yang bisa diproses mesin

Komputer tidak bisa langsung membaca string teks. Sebelum model bisa "memahami" kalimat, teks harus dipecah menjadi unit-unit kecil yang disebut **token**. Token bisa berupa kata, potongan kata (subkata), karakter tunggal, atau bahkan byte — tergantung strategi yang dipilih.

**

Definisi

Token = Unit Terkecil

Token adalah potongan teks paling kecil yang dikenali model. Setiap token dikonversi menjadi angka (Token ID), lalu dipetakan ke vektor berdimensi tinggi melalui embedding layer.

→

**

Dampak

Pilihan Token = Pilihan Model

Ukuran vocabulary, panjang sekuens, dan kemampuan menangani kata baru — semuanya ditentukan oleh strategi tokenisasi. Keputusan ini tidak bisa diubah setelah pre-training.

** Pipeline Teks → Angka

Tiga Tahap Tokenisasi

1

Normalisasi

"Saya Beli BAKSO." → "saya beli bakso." // lowercase, strip whitespace

2

Pre-tokenisasi

"saya beli bakso." → ["saya", "beli", "bakso", "."] // pisah spasi & tanda baca

3

Tokenisasi Final → Token IDs

["saya", "beli", "bakso", "."] → [2, 12, 534, 1823, 18, 3] // termasuk [CLS]=2, [SEP]=3

Ukuran **vocabulary (vocab size)** adalah salah satu keputusan terpenting dalam desain model. Vocab kecil memaksa kata-kata dipecah menjadi subunit — kalimat jadi lebih panjang, komputasi lebih mahal. Vocab besar lebih ekspresif tapi membutuhkan memori embedding masif.

<table>
<colgroup>
<col width="25%" />
<col width="25%" />
<col width="25%" />
<col width="25%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Model
Tokenizer
Vocab Size
Strategi</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">IndoBERT
WordPiece
32.000
Subkata — spesifik Bahasa Indonesia</td>
<td align="left">BERT Base
WordPiece
30.522
Subkata — dominan Bahasa Inggris</td>
<td align="left">XLM-R
SentencePiece (BPE)
250.000
Multilingual — 100+ bahasa</td>
<td align="left">GPT-4
tiktoken (BPE)
~100.000
BPE efisien untuk bahasa Inggris + code</td>
</tr>
</tbody>
</table>

**IndoBERT** dilatih dari Wikipedia Bahasa Indonesia dan artikel berita. Vocab 32.000-nya sudah mencakup kata-kata formal dengan baik, tapi masih kesulitan dengan slang, kata daerah, dan nama entitas lokal yang tidak ada di data latih.

02

#### Empat Strategi Tokenisasi

Setiap pendekatan punya karakteristik dan trade-off — pilihan tergantung tugas, bahasa, dan ukuran vocabulary

Tidak ada satu strategi terbaik. Pemilihan tokenizer bergantung pada bahasa target, ukuran dataset, dan task yang akan diselesaikan. Model modern hampir semuanya menggunakan pendekatan **subkata (subword)** karena keseimbangan antara efisiensi dan coverage-nya.

**

Berbasis Kata

Word-level

Pisahkan berdasarkan spasi dan tanda baca. Paling intuitif — satu kata = satu token. Tapi vocab sangat besar dan tidak bisa menangani kata di luar daftar (OOV).

-   Intuitif
-   Cepat

-   OOV tinggi
-   Vocab besar

**

Subkata

Subword (BPE / WordPiece)

Kata langka dipecah menjadi subunit yang lebih sering muncul. Kata umum tetap utuh. Standar industri — dipakai BERT, GPT, dan hampir semua LLM modern.

-   Vocab efisien
-   Minim OOV

-   Kurang intuitif
-   Sekuens lebih panjang

**

Karakter

Character-level

Setiap karakter adalah token. Vocab sangat kecil (26+ huruf), nol OOV. Tapi sekuens sangat panjang dan hubungan semantik jauh lebih sulit dipelajari model.

-   Nol OOV
-   Vocab minimal

-   Sekuens panjang
-   Komputasi mahal

**

Kalimat

Sentence-level

Pisahkan berdasarkan batas kalimat (titik, tanda seru, tanya). Berguna untuk analisis diskursus, terjemahan paragraf, dan chunking dokumen untuk RAG pipeline.

-   Konteks penuh
-   Ideal RAG

-   Granular rendah
-   Batas ambigu

** BPE — Byte Pair Encoding

Bagaimana BPE Membangun Vocabulary

BPE mulai dari karakter individual, lalu berulang kali menggabungkan pasangan yang paling sering muncul bersama. Proses ini diulangi ribuan kali hingga vocabulary target tercapai.

1

Mulai dari karakter individual

"bakso"→ bakso // 5 token

2

Merge pasangan "ba" paling sering (iterasi 1)

bakso // 4 token

3

Setelah ribuan merge — kata umum jadi satu token

"bakso" // 1 token

"mempertanggungjawabkan" → "me"+"\#\#mper"+"\#\#tanggung"+"\#\#jawab"+"\#\#kan" // 5 token — kata langka tetap dipecah

BPE

Byte Pair Encoding

Merge berdasarkan frekuensi pasangan. Dipakai GPT-2, GPT-4, RoBERTa. Tidak butuh pre-tokenisasi bahasa spesifik.

** GPT, RoBERTa

WP

WordPiece

Merge berdasarkan likelihood, bukan frekuensi. Token lanjutan ditandai dengan `##`. Dipakai BERT dan IndoBERT.

** BERT, IndoBERT

SP

SentencePiece

Bekerja langsung dari teks mentah tanpa pre-tokenisasi. Gunakan `□` untuk tanda awal kata. Ideal untuk bahasa non-Latin.

** T5, mBERT, XLM-R

**

**Aturan praktis:** Untuk Bahasa Indonesia, IndoBERT (WordPiece, 32K) adalah pilihan terbaik untuk teks formal. Untuk konten media sosial atau multilingual, XLM-R (SentencePiece, 250K) lebih kuat karena vocab yang jauh lebih besar memberikan coverage yang lebih luas termasuk slang dan campuran bahasa.

03

#### Tantangan Bahasa Indonesia

Karakteristik unik yang membuat tokenisasi Bahasa Indonesia lebih rumit dari Bahasa Inggris

Bahasa Inggris relatif "mudah" untuk tokenizer karena strukturnya relatif sederhana — satu kata, satu unit makna. Bahasa Indonesia jauh lebih kompleks karena sifatnya yang **aglutinatif** — makna dibentuk dengan menempelkan awalan, akhiran, dan konfiks pada kata dasar.

** Morfologi Aglutinatif

Satu Akar, Puluhan Derivasi

Kata dasar **"kerja"** bisa menghasilkan puluhan bentuk hanya dengan afiksasi. Tokenizer perlu memutuskan apakah setiap bentuk adalah token tersendiri atau dipecah berdasarkan morfem.

bekerja

ber-

awalan

+

kerja

akar

mengerjakan

me-

awalan

+

ngerja

akar

+

-kan

akhiran

pekerjaan

pe-

awalan

+

kerja

akar

+

-an

akhiran

mempekerjakan

memper-

awalan

+

kerja

akar

+

-kan

akhiran

Tiga tantangan lain yang sering diabaikan tapi sangat berdampak pada kualitas NLP untuk konten Indonesia:

** Slang Digital & Code-Switching

Bahasa Indonesia "Sungguhan" vs Bahasa Kamus

Media sosial Indonesia penuh dengan singkatan, kreasi linguistik baru, dan campuran bahasa. Tokenizer berbasis Wikipedia saja akan menghasilkan fragmentasi yang tidak bermakna.

Input: "Gaskeun aja deh, gapapa belum perfect"

Tokenizer global (kurang tepat):

Gas \#\#keun aja deh , ga \#\#papa belum perfect

Tokenizer lokal yang lebih baik:

gaskeun aja deh , gapapa belum perfect

**Code-switching** — mencampur Bahasa Indonesia dan Inggris dalam satu kalimat — adalah fenomena alami di kalangan profesional Indonesia.

Input: "Fix aja yang urgent, meeting-nya reschedule ke besok"

Fix aja yang urgent , meeting \#\#-nya re \#\#schedule ke besok

** Entitas Lokal

Nama Tempat & Merek Indonesia

Indonesia punya ribuan nama tempat unik dan ekosistem startup lokal yang besar. Nama-nama ini sering tidak ada di vocab tokenizer global dan dipecah tidak bermakna — berdampak langsung pada kualitas NER.

Tokenizer global vs lokal

GLOBAL (kurang tepat)

To \#\#ko \#\#pedia

Tan \#\#jung \#\#sari

LOKAL (lebih baik)

Tokopedia

Tanjungsari

04

#### Tokenizer di Era Transformer

Token khusus, padding, attention mask, dan teknik yang membuat tokenizer modern bekerja efisien

Tokenizer modern bukan hanya memecah teks — mereka juga menambahkan **token khusus**, mengelola panjang sekuens, dan menghasilkan **attention mask** yang memberitahu model mana yang data nyata dan mana yang padding.

** Special Tokens

Token yang Bukan dari Teks Input

[C]

[CLS] — Classification Token

// Ditambahkan di awal setiap sekuens. Representasinya dipakai untuk klasifikasi.

[S]

[SEP] — Separator Token

// Memisahkan dua kalimat dalam task QA/NLI. Ditambahkan di akhir setiap kalimat.

[P]

[PAD] — Padding Token

// Mengisi sekuens agar sama panjang dalam batch. Attention mask = 0 di posisi ini.

[M]

[MASK] — Mask Token

// Dipakai saat pre-training MLM — mengganti 15% token secara acak untuk diprediksi model.

    from transformers import AutoTokenizer

    tok = AutoTokenizer.from_pretrained("indolem/indobert-base-uncased")

    # Tokenisasi dua kalimat untuk NLI
    out = tok(
        "Toko ini sangat bagus.",
        "Saya suka belanja di sini.",
        padding=True,
        truncation=True,
        max_length=512,
        return_tensors="pt"
    )

    # [CLS] toko ini sangat bagus . [SEP] saya suka belanja di sini . [SEP]
    # attention_mask: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    # (semua 1 karena tidak ada padding di contoh ini)

**

**Fast Tokenizer (Rust backend)**: Hugging Face merilis tokenizer dengan backend Rust yang bisa memproses jutaan token per detik. Selain kecepatan, fast tokenizer mendukung *offset mapping* — melacak posisi setiap token dalam string asli, sangat penting untuk NER agar label bisa dipetakan kembali ke span teks yang tepat.

05

#### ** Lab Interaktif — Coba Sendiri

Ketik teks Bahasa Indonesia apa saja dan lihat cara mesin memecahnya menjadi token secara real-time

Eksplorasi tiga mode tokenisasi yang berbeda. Mode **Subkata** juga akan menganalisis struktur morfologi kata-kata berafiks secara otomatis.

** Laboratorium Tokenisasi

Tokenizer Interaktif

Hasil berubah real-time saat kamu mengetik

** Berbasis Kata

** Subkata (BPE)

** Karakter

Input Teks

Hapus

Ojek online telah mengubah cara orang bepergian di Jakarta.

Ojek online... mempertanggung... Gaskeun slang... Code-switching... Nama tempat...

**Berbasis Kata:** Pisahkan teks berdasarkan spasi dan tanda baca. Satu kata = satu token.

Hasil Token

0 token

0

Total Token

termasuk tanda baca

0

Token Unik

ukuran vocab lokal

0

Panjang Rata-rata

karakter per token

0×

Rasio Kompresi

karakter ÷ token

**

Analisis Morfologi Bahasa Indonesia

Deteksi awalan & akhiran otomatis

Ketik teks untuk melihat analisis morfologi...
