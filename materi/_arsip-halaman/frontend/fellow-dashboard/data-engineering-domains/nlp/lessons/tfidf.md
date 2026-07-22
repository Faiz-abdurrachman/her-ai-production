# Batasan Bag-of-Words

> Sumber: `pages/frontend/fellow-dashboard/data-engineering-domains/nlp/lessons/tfidf.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

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

## Lampiran Sumber HTML Lengkap

````html
<section class="fellow-dashboard fellow-modules-page lesson-detail-page" data-fellow-page="modules">
<style>
.ai-lab-content .tfidf-word-list { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
.ai-lab-content .tfidf-row { display: grid; grid-template-columns: 120px 1fr 80px 80px 90px; gap: 12px; align-items: center; padding: 10px 14px; background: var(--ai-bg); border: 1px solid var(--ai-border-s); border-radius: var(--ai-r-sm); transition: border-color .2s; }
.ai-lab-content .tfidf-row:hover { border-color: rgba(246,51,146,.3); }
.ai-lab-content .tfidf-row.header { background: rgba(0,0,0,.03); }
.ai-lab-content .tfidf-word { font-family: var(--ai-mono); font-size: 13px; color: var(--ai-text); font-weight: 600; }
.ai-lab-content .tfidf-bar-wrap { height: 8px; background: rgba(0,0,0,.06); border-radius: 4px; overflow: hidden; }
.ai-lab-content .tfidf-bar-fill { height: 100%; border-radius: 4px; transition: width .6s ease; background: linear-gradient(90deg, #f63392, #bf5af2); }
.ai-lab-content .tfidf-val { font-family: var(--ai-mono); font-size: 12px; text-align: right; }
.ai-lab-content .tfidf-val.tf { color: #30d158; }
.ai-lab-content .tfidf-val.idf { color: #ff9f0a; }
.ai-lab-content .tfidf-val.score { color: #f63392; font-weight: 700; }
.ai-lab-content .tfidf-col-label { font-family: var(--ai-mono); font-size: 9px; text-transform: uppercase; letter-spacing: .08em; color: var(--ai-text3); text-align: right; }
.ai-lab-content .tfidf-col-label.word { text-align: left; }

.ai-lab-content .idf-scale { display: flex; flex-direction: column; gap: 8px; margin: 16px 0; }
.ai-lab-content .idf-scale-row { display: grid; grid-template-columns: 160px 80px 80px 1fr; gap: 12px; align-items: center; padding: 10px 14px; background: var(--ai-bg); border: 1px solid var(--ai-border-s); border-radius: var(--ai-r-sm); }
.ai-lab-content .idf-word { font-family: var(--ai-mono); font-size: 12px; color: var(--ai-text2); }
.ai-lab-content .idf-df { font-family: var(--ai-mono); font-size: 12px; color: var(--ai-text3); text-align: center; }
.ai-lab-content .idf-score { font-family: var(--ai-mono); font-size: 13px; font-weight: 700; text-align: center; }
.ai-lab-content .idf-bar-wrap { height: 6px; background: rgba(0,0,0,.06); border-radius: 3px; overflow: hidden; }
.ai-lab-content .idf-bar-fill { height: 100%; border-radius: 3px; background: #ff9f0a; }

.ai-lab-content .stem-table-wrap { overflow-x: auto; margin: 16px 0; border-radius: var(--ai-r-sm); border: 1px solid var(--ai-border-s); }
.ai-lab-content .stem-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.ai-lab-content .stem-table th { background: rgba(0,0,0,.04); border-bottom: 1px solid var(--ai-border-s); padding: 9px 14px; text-align: left; font-family: var(--ai-mono); font-size: 10px; text-transform: uppercase; letter-spacing: .06em; color: var(--ai-text3); }
.ai-lab-content .stem-table td { padding: 9px 14px; border-bottom: 1px solid rgba(0,0,0,.04); font-size: 13px; }
.ai-lab-content .stem-table tr:last-child td { border-bottom: none; }
.ai-lab-content .stem-table .word-col { font-family: var(--ai-mono); color: var(--ai-text); font-weight: 600; }
.ai-lab-content .stem-table .morph-col { color: var(--ai-text2); }
.ai-lab-content .stem-table .stem-col { font-family: var(--ai-mono); color: #f63392; font-weight: 700; }
.ai-lab-content .stem-table .rule-col { font-size: 11px; color: var(--ai-text3); font-family: var(--ai-mono); }

.ai-lab-content .search-engine-box { background: var(--ai-card); border: 1px solid var(--ai-border-s); border-radius: var(--ai-r); overflow: hidden; margin: 20px 0; }
.ai-lab-content .seb-header { padding: 14px 18px; border-bottom: 1px solid var(--ai-border-s); display: flex; align-items: center; gap: 10px; background: rgba(246,51,146,.04); }
.ai-lab-content .seb-title { font-size: 15px; font-weight: 700; color: var(--ai-text); }
.ai-lab-content .seb-badge { font-family: var(--ai-mono); font-size: 10px; text-transform: uppercase; letter-spacing: .06em; color: var(--ai-accent); }

@media (max-width: 768px) {
  .ai-lab-content .tfidf-row { grid-template-columns: 1fr 60px 60px 60px; }
  .ai-lab-content .tfidf-bar-wrap { display: none; }
  .ai-lab-content .idf-scale-row { grid-template-columns: 1fr 60px 60px; }
  .ai-lab-content .idf-bar-wrap { display: none; }
}

 .ai-lab-content .playground-box { background: var(--ai-card); border: 1px solid var(--ai-border-s); border-radius: var(--ai-r); overflow: hidden; margin: 24px 0; position: relative; }
 .ai-lab-content .playground-box::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #f63392, #bf5af2, #30d158); }
 .ai-lab-content .pgb-header { padding: 18px 22px; border-bottom: 1px solid var(--ai-border-s); background: rgba(246,51,146,.04); }
 .ai-lab-content .pgb-badge { font-family: var(--ai-mono); font-size: 10px; text-transform: uppercase; letter-spacing: .08em; color: #f63392; margin-bottom: 8px; }
 .ai-lab-content .pgb-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18px; font-weight: 800; color: var(--ai-text); margin-bottom: 4px; letter-spacing: -.01em; }
 .ai-lab-content .pgb-sub { font-size: 13px; color: var(--ai-text2); }
 .ai-lab-content .pg-tabs { display: flex; gap: 0; border-bottom: 1px solid var(--ai-border-s); }
 .ai-lab-content .pg-tab { padding: 11px 20px; font-family: var(--ai-mono); font-size: 11px; letter-spacing: .04em; color: var(--ai-text3); background: transparent; border: none; border-bottom: 2px solid transparent; cursor: pointer; transition: all .2s; display: flex; align-items: center; gap: 6px; }
 .ai-lab-content .pg-tab:hover { color: var(--ai-text); background: rgba(255,255,255,.03); }
 .ai-lab-content .pg-tab.active { color: #f63392; border-bottom-color: #f63392; background: rgba(246,51,146,.04); }
 .ai-lab-content .pg-pane { display: none; }
 .ai-lab-content .pg-pane.active { display: block; }
 .ai-lab-content .doc-inputs { padding: 20px 22px; display: flex; flex-direction: column; gap: 14px; }
 .ai-lab-content .doc-input-row { display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: start; }
 .ai-lab-content .doc-label { display: flex; flex-direction: column; align-items: center; gap: 4px; padding-top: 10px; }
 .ai-lab-content .doc-label-dot { width: 10px; height: 10px; border-radius: 50%; }
 .ai-lab-content .doc-label-num { font-family: var(--ai-mono); font-size: 9px; color: var(--ai-text3); }
 .ai-lab-content .doc-textarea { width: 100%; min-height: 64px; max-height: 120px; background: var(--ai-bg); border: 1px solid var(--ai-border-s); border-radius: var(--ai-r-sm); padding: 10px 12px; color: var(--ai-text); font-family: 'Inter', sans-serif; font-size: 13px; line-height: 1.6; resize: vertical; outline: none; caret-color: #f63392; transition: border-color .2s; }
 .ai-lab-content .doc-textarea:focus { border-color: rgba(246,51,146,.4); }
 .ai-lab-content .doc-textarea::placeholder { color: var(--ai-text3); }
 .ai-lab-content .pg-actions { display: flex; align-items: center; gap: 10px; padding: 0 22px 18px; }
 .ai-lab-content .pg-run-btn { padding: 9px 22px; border-radius: var(--ai-r-sm); background: #f63392; color: #fff; font-family: var(--ai-mono); font-size: 12px; font-weight: 700; letter-spacing: .04em; border: none; cursor: pointer; transition: all .2s; }
 .ai-lab-content .pg-run-btn:hover { opacity: 0.9; transform: translateY(-1px); }
 .ai-lab-content .pg-reset-btn { padding: 9px 16px; border-radius: var(--ai-r-sm); background: var(--ai-bg2); border: 1px solid var(--ai-border-s); color: var(--ai-text3); font-family: var(--ai-mono); font-size: 11px; cursor: pointer; transition: all .2s; }
 .ai-lab-content .pg-reset-btn:hover { color: var(--ai-text); background: var(--ai-bg); }
 .ai-lab-content .pg-word-count { font-family: var(--ai-mono); font-size: 11px; color: var(--ai-text3); margin-left: auto; }
 .ai-lab-content .vocab-section { padding: 20px 22px; border-top: 1px solid var(--ai-border-s); }
 .ai-lab-content .vs-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
 .ai-lab-content .vs-title { font-family: var(--ai-mono); font-size: 10px; text-transform: uppercase; letter-spacing: .1em; color: var(--ai-text3); }
 .ai-lab-content .vs-count { font-family: var(--ai-mono); font-size: 11px; color: #f63392; }
 .ai-lab-content .vocab-chips { display: flex; flex-wrap: wrap; gap: 6px; }
 .ai-lab-content .vocab-chip { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 6px; font-family: var(--ai-mono); font-size: 11px; background: rgba(246,51,146,.08); border: 1px solid rgba(246,51,146,.2); color: #f63392; transition: all .2s; }
 .ai-lab-content .vocab-chip:hover { background: rgba(246,51,146,.16); transform: translateY(-2px); }
 .ai-lab-content .vocab-chip-count { font-size: 9px; opacity: .65; background: rgba(246,51,146,.15); padding: 1px 5px; border-radius: 3px; }
 .ai-lab-content .matrix-section { padding: 20px 22px; border-top: 1px solid var(--ai-border-s); }
 .ai-lab-content .matrix-wrap { overflow-x: auto; border-radius: var(--ai-r-sm); border: 1px solid var(--ai-border-s); }
 .ai-lab-content .matrix-table { border-collapse: collapse; width: 100%; min-width: 400px; font-family: var(--ai-mono); font-size: 11px; }
 .ai-lab-content .matrix-table th { padding: 8px 12px; background: var(--ai-bg2); border-bottom: 1px solid var(--ai-border-s); border-right: 1px solid var(--ai-border-s); color: var(--ai-text3); text-align: center; letter-spacing: .04em; font-weight: 400; white-space: nowrap; }
 .ai-lab-content .matrix-table th.row-header { text-align: left; color: var(--ai-text2); }
 .ai-lab-content .matrix-table td { padding: 8px 12px; border-bottom: 1px solid var(--ai-border-s); border-right: 1px solid var(--ai-border-s); text-align: center; transition: background .2s; position: relative; }
 .ai-lab-content .matrix-table td.doc-name { text-align: left; color: var(--ai-text2); font-size: 11px; white-space: nowrap; }
 .ai-lab-content .matrix-table td.cell-0 { color: var(--ai-text3); }
 .ai-lab-content .matrix-table td.cell-1 { background: rgba(246,51,146,.08); color: #f63392; font-weight: 600; }
 .ai-lab-content .matrix-table td.cell-2 { background: rgba(246,51,146,.16); color: #f63392; font-weight: 700; }
 .ai-lab-content .matrix-table td.cell-3 { background: rgba(246,51,146,.26); color: #f63392; font-weight: 700; }
 .ai-lab-content .matrix-table tr:last-child td { border-bottom: none; }
 .ai-lab-content .matrix-table td:last-child, .ai-lab-content .matrix-table th:last-child { border-right: none; }
 .ai-lab-content .matrix-table td:hover { filter: brightness(0.95); }
 .ai-lab-content .sim-section { padding: 20px 22px; border-top: 1px solid var(--ai-border-s); }
 .ai-lab-content .sim-grid { display: inline-grid; gap: 3px; }
 .ai-lab-content .sim-cell { display: flex; align-items: center; justify-content: center; border-radius: 6px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; transition: all .3s; cursor: default; position: relative; }
 .ai-lab-content .sim-cell:hover .sim-tooltip { opacity: 1; visibility: visible; }
 .ai-lab-content .sim-tooltip { position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%); background: var(--ai-card); border: 1px solid var(--ai-border-s); border-radius: 6px; padding: 5px 10px; font-family: var(--ai-mono); font-size: 10px; color: var(--ai-text2); white-space: nowrap; opacity: 0; visibility: hidden; transition: all .15s; z-index: 20; pointer-events: none; }
 .ai-lab-content .sim-labels { display: flex; }
 .ai-lab-content .sim-label-row, .ai-lab-content .sim-label-col { font-family: var(--ai-mono); font-size: 10px; color: var(--ai-text3); letter-spacing: .04em; }
 .ai-lab-content .search-section { padding: 20px 22px; border-top: 1px solid var(--ai-border-s); }
 .ai-lab-content .search-row { display: flex; gap: 10px; margin-bottom: 14px; }
 .ai-lab-content .search-input { flex: 1; padding: 9px 12px; border-radius: var(--ai-r-sm); background: var(--ai-bg); border: 1px solid var(--ai-border-s); color: var(--ai-text); font-family: 'Inter', sans-serif; font-size: 13px; outline: none; caret-color: #f63392; transition: border-color .2s; }
 .ai-lab-content .search-input:focus { border-color: rgba(246,51,146,.4); }
 .ai-lab-content .search-input::placeholder { color: var(--ai-text3); }
 .ai-lab-content .search-btn { padding: 9px 18px; border-radius: var(--ai-r-sm); background: rgba(246,51,146,.1); border: 1px solid rgba(246,51,146,.3); color: #f63392; font-family: var(--ai-mono); font-size: 11px; cursor: pointer; transition: all .2s; }
 .ai-lab-content .search-btn:hover { background: rgba(246,51,146,.18); }
 .ai-lab-content .search-results { display: flex; flex-direction: column; gap: 10px; }
 .ai-lab-content .search-result { background: var(--ai-bg); border: 1px solid var(--ai-border-s); border-radius: var(--ai-r-sm); padding: 14px; display: flex; align-items: center; gap: 14px; transition: all .2s; }
 .ai-lab-content .search-result.top-result { border-color: rgba(246,51,146,.4); background: rgba(246,51,146,.04); }
 .ai-lab-content .sr-rank { font-family: var(--ai-mono); font-size: 20px; font-weight: 800; color: var(--ai-text3); min-width: 24px; }
 .ai-lab-content .search-result.top-result .sr-rank { color: #f63392; }
 .ai-lab-content .sr-body { flex: 1; }
 .ai-lab-content .sr-text { font-size: 13px; color: var(--ai-text2); line-height: 1.6; margin-bottom: 6px; }
 .ai-lab-content .sr-bar-wrap { height: 4px; background: var(--ai-border-s); border-radius: 2px; overflow: hidden; }
 .ai-lab-content .sr-bar { height: 100%; background: #f63392; border-radius: 2px; transition: width .6s ease; }
 .ai-lab-content .search-result.top-result .sr-bar { background: #f63392; }
 .ai-lab-content .sr-score { font-family: var(--ai-mono); font-size: 13px; font-weight: 700; color: var(--ai-text3); text-align: right; min-width: 44px; }
 .ai-lab-content .search-result.top-result .sr-score { color: #f63392; }
 .ai-lab-content .sr-empty { font-family: var(--ai-mono); font-size: 12px; color: var(--ai-text3); padding: 20px; text-align: center; }
</style>
<button class="fellow-menu-toggle" type="button" aria-label="Buka navigasi peserta" aria-expanded="false"><i class="fas fa-bars"></i></button>
<div class="fellow-sidebar-scrim" aria-hidden="true"></div>
<aside class="fellow-sidebar" aria-label="Navigasi peserta">
<a href="#/participant-dashboard" class="fellow-logo" aria-label="Buka sidebar peserta"><img src="/assets/branding/logo-her-ai-transparent.png" alt="HerAI Fellowship"></a>
<nav class="fellow-menu">
<a href="#/participant-dashboard" data-fellow-nav="dashboard"><i class="fas fa-house"></i><span>Beranda</span></a>
<a href="#/messaging" data-fellow-nav="chatroom"><i class="far fa-comment-dots"></i><span>Chatroom</span><strong>3</strong></a>
<a href="#/participant-mentor" data-fellow-nav="mentor"><i class="fas fa-user-group"></i><span>Mentor</span></a>
<a class="active" href="#/participant-modules" data-fellow-nav="modules"><i class="fas fa-book-open"></i><span>Modul</span></a>
<a href="#/participant-tasks" data-fellow-nav="tasks"><i class="fas fa-list-check"></i><span>Tugas</span></a>
<a href="#/participant-projects" data-fellow-nav="projects"><i class="far fa-folder-open"></i><span>Proyek</span></a>
<a href="#/participant-events" data-fellow-nav="events"><i class="far fa-calendar-days"></i><span>Events</span></a>
<a href="#/participant-community" data-fellow-nav="community"><i class="fas fa-users"></i><span>Komunitas</span></a>
</nav>
<nav class="fellow-menu secondary">
<a href="#/participant-certificates" data-fellow-nav="certificates"><i class="fas fa-certificate"></i><span>Sertifikat</span></a>
<a href="#/participant-leaderboard" data-fellow-nav="leaderboard"><i class="fas fa-ranking-star"></i><span>Leaderboard</span></a>
<a href="#/participant-help" data-fellow-nav="faq"><i class="far fa-circle-question"></i><span>FAQ &amp; Bantuan</span></a>
<a href="#/participant-settings" data-fellow-nav="settings"><i class="fas fa-gear"></i><span>Pengaturan</span></a>
</nav>
<div class="invite-card course-help-mini">
<div><strong>Butuh bantuan?</strong><p>Tanya HerAI Assistant tentang modul dan pembelajaran.</p></div>
<button type="button">Chat Sekarang</button>
</div>
</aside>
<main class="fellow-main">
<header class="lesson-topbar">
<nav class="lesson-breadcrumb" aria-label="Breadcrumb materi">
<a href="#/participant-ai-lab-nlp"><i class="fas fa-arrow-left"></i><span>NLP</span></a>
<span class="lesson-breadcrumb-separator"><i class="fas fa-arrow-right"></i></span>
<span>TF-IDF</span>
</nav>
<div class="fellow-actions">
<label class="fellow-search"><i class="fas fa-magnifying-glass"></i><input type="search" placeholder="Cari modul, topik, atau materi..."></label>
<button type="button" class="fellow-icon-button" aria-label="Notifikasi"><i class="far fa-bell"></i><span>5</span></button>
<a href="#/participant-profile" class="fellow-user-button"><span class="avatar-img"></span><span><strong>Aisyah Putri</strong><small>Peserta</small></span><i class="fas fa-chevron-down"></i></a>
</div>
</header>
<div class="lesson-layout">
<div class="lesson-main-content">
<section class="lesson-hero">
<div class="lesson-hero-copy">
<h1 style="white-space: nowrap;">TF-IDF</h1>
<p>Memberikan bobot pada kata — kata yang sering muncul di banyak dokumen dianggap kurang penting, kata yang spesifik lebih berbobot.</p>
<div class="lesson-meta-row">
<span><i class="far fa-clock"></i> 45 menit</span>
<span><i class="fas fa-layer-group"></i> NLP · Text Representations</span>
<b><i class="fas fa-flask"></i> Interaktif + Search Lab</b>
</div>
</div>
<img src="/assets/messaging/herai-chat-persona.png" alt="HerAI TF-IDF">
</section>
<section class="lesson-material-panel">
                    <div class="lesson-tabs" role="tablist" aria-label="Jenis materi">
                        <a href="#/participant-ai-lab-tfidf" class="active"><i class="fas fa-book-open"></i> Materi</a>
                    </div>
<article class="lesson-article ai-lab-content" id="tfidf-content">

    <div class="lesson-body">

      <!-- ══ SEC 1: BATASAN BOW ══ -->
      <section class="lesson-sec" id="sec-masalah">
        <div class="sec-header">
          <span class="sec-num">01</span>
          <div>
            <h2 class="sec-title">Batasan Bag-of-Words</h2>
            <p class="sec-sub">Mengapa menghitung kata saja tidak cukup — dan apa yang perlu diperbaiki</p>
          </div>
        </div>

        <div class="prose">
          Di lesson sebelumnya kita membangun BoW — representasi teks sebagai vektor frekuensi kata. Hasilnya cukup baik untuk banyak kasus. Tapi ada satu kelemahan mendasar: <strong>semua kata diperlakukan setara</strong>, padahal jelas kata "dan", "di", "yang" tidak lebih informatif dari kata "korupsi", "tsunami", atau "Tokopedia".
        </div>

        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-circle-xmark"></i> Masalah BoW</div>
          <div class="wb-title">Kata Umum Mendominasi Vektor</div>
          <div class="calc-chain">
            <div class="calc-step">
              <div class="cs-num-circle" style="background:#ef4444;color:#fff;">!</div>
              <div class="cs-content">
                <div class="cs-label">Dokumen berita ekonomi Indonesia</div>
                <div class="math-line"><span class="math-term">"Bank Indonesia <strong style="color:#ef4444">dan</strong> pemerintah <strong style="color:#ef4444">yang</strong> bekerja sama <strong style="color:#ef4444">di</strong> bidang moneter"</span></div>
                <div class="math-line" style="margin-top:8px;">
                  <span class="math-comment">// Kata paling tinggi skornya di BoW:</span>
                </div>
                <div class="math-line">
                  <span class="math-term red">"dan" = 847</span>
                  <span class="math-op">,</span>
                  <span class="math-term red">"yang" = 634</span>
                  <span class="math-op">,</span>
                  <span class="math-term red">"di" = 521</span>
                  <span class="math-op">,</span>
                  <span class="math-term" style="color:#30d158;">"bank" = 12</span>
                  <span class="math-op">,</span>
                  <span class="math-term" style="color:#30d158;">"moneter" = 3</span>
                </div>
              </div>
            </div>
            <div class="calc-step">
              <div class="cs-num-circle" style="background:#ef4444;color:#fff;">!</div>
              <div class="cs-content">
                <div class="cs-label">Akibatnya — dua dokumen sangat berbeda kelihatan "mirip"</div>
                <div class="math-line">
                  <span class="math-term">"Pemerintah dan rakyat yang bersatu"</span>
                  <span class="math-op">←→</span>
                  <span class="math-term">"Pemerintah dan bank yang bangkrut"</span>
                </div>
                <div class="math-line">
                  <span class="math-result red">cosine sim = 0.82</span>
                  <span class="math-comment">// sangat mirip di BoW, padahal topik berbeda jauh!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="compare-2">
          <div class="cmp-card">
            <div class="cmp-head"><i class="fas fa-circle-xmark"></i> BoW Murni</div>
            <ul class="cmp-list">
              <li class="bad">Kata "dan", "di", "yang" dapat skor tinggi</li>
              <li class="bad">Kata informatif ("moneter", "inflasi") tenggelam</li>
              <li class="bad">Dokumen berbeda topik kelihatan mirip</li>
              <li class="bad">Tidak diskriminatif untuk pencarian</li>
            </ul>
          </div>
          <div class="cmp-card">
            <div class="cmp-head"><i class="fas fa-circle-check"></i> TF-IDF</div>
            <ul class="cmp-list">
              <li class="good">Kata umum yang muncul di semua dokumen dapat skor rendah</li>
              <li class="good">Kata langka yang diskriminatif dapat skor tinggi</li>
              <li class="good">Dokumen yang benar-benar mirip topik terdeteksi</li>
              <li class="good">Standar emas untuk Information Retrieval klasik</li>
            </ul>
          </div>
        </div>

        <div class="insight-callout warn">
          <div class="ic-icon"><i class="fas fa-bullseye"></i></div>
          <div class="ic-body">
            <strong>Solusi:</strong> Kita butuh bobot yang mempertimbangkan dua hal sekaligus — seberapa sering kata muncul <em>dalam dokumen itu</em> (lokal), DAN seberapa langka kata itu <em>di seluruh korpus</em> (global). Inilah TF-IDF.
          </div>
        </div>
      </section>

      <!-- ══ SEC 2: TF ══ -->
      <section class="lesson-sec" id="sec-tf">
        <div class="sec-header">
          <span class="sec-num">02</span>
          <div>
            <h2 class="sec-title">Term Frequency (TF)</h2>
            <p class="sec-sub">Ukuran lokal — seberapa sering kata muncul dalam satu dokumen tertentu</p>
          </div>
        </div>

        <div class="prose">
          <strong>Term Frequency</strong> mengukur kerapatan kata dalam satu dokumen. Asumsinya sederhana: semakin sering kata muncul dalam dokumen, semakin besar kemungkinan kata itu merepresentasikan topik dokumen tersebut. Namun kita <em>normalkan</em> dengan total kata agar dokumen panjang tidak otomatis mendapat skor lebih tinggi dari dokumen pendek.
        </div>

        <div class="formula-box">
          <div class="fb-label">Formula Term Frequency</div>
          <div class="fb-eq">
            TF(<span class="fv">t</span>, <span class="fb">d</span>)
            <span class="op"> = </span>
            <span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;">
              <span style="border-bottom:2px solid rgba(246,51,146,.4);padding-bottom:4px;">jumlah kemunculan <span class="fv">t</span> dalam <span class="fb">d</span></span>
              <span>total kata dalam <span class="fb">d</span></span>
            </span>
          </div>
          <div class="fb-legend">
            <div class="fb-leg"><span class="fb-sym" style="color:#f63392;">t</span><span class="fb-desc">= term (kata yang dihitung)</span></div>
            <div class="fb-leg"><span class="fb-sym" style="color:#f63392;">d</span><span class="fb-desc">= document (dokumen target)</span></div>
          </div>
        </div>

        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-calculator"></i> Contoh TF — Berita Gojek</div>
          <div class="wb-title">Dokumen: "Gojek meluncurkan layanan baru di Jakarta dan Bandung"</div>
          <div class="calc-chain">
            <div class="calc-step">
              <div class="cs-num-circle">1</div>
              <div class="cs-content">
                <div class="cs-label">Hitung total kata setelah tokenisasi</div>
                <div class="math-line">
                  <span class="math-term">"gojek meluncurkan layanan baru jakarta bandung"</span>
                </div>
                <div class="math-line">
                  <span class="math-term blue">total kata</span><span class="math-op">=</span>
                  <span class="math-result">7</span>
                  <span class="math-comment">// setelah hapus stop words</span>
                </div>
              </div>
            </div>
            <div class="calc-step">
              <div class="cs-num-circle">2</div>
              <div class="cs-content">
                <div class="cs-label">Hitung TF tiap kata (frekuensi ÷ total)</div>
                <div class="math-line">
                  <span class="math-term">TF("gojek")</span><span class="math-op">=</span>
                  <span class="math-term">1 ÷ 7</span><span class="math-op">=</span>
                  <span class="math-result green">0.143</span>
                </div>
                <div class="math-line">
                  <span class="math-term">TF("jakarta")</span><span class="math-op">=</span>
                  <span class="math-term">1 ÷ 7</span><span class="math-op">=</span>
                  <span class="math-result green">0.143</span>
                </div>
                <div class="math-line">
                  <span class="math-term">TF("layanan")</span><span class="math-op">=</span>
                  <span class="math-term">1 ÷ 7</span><span class="math-op">=</span>
                  <span class="math-result green">0.143</span>
                  <span class="math-comment">// semua kata muncul 1× → TF sama</span>
                </div>
              </div>
            </div>
            <div class="calc-step">
              <div class="cs-num-circle">3</div>
              <div class="cs-content">
                <div class="cs-label">Jika kata muncul lebih dari sekali — TF naik</div>
                <div class="math-line">
                  <span class="math-term">"Gojek dan Gojek lagi dan lagi"</span>
                  <span class="math-comment">// setelah stop words: "gojek gojek"</span>
                </div>
                <div class="math-line">
                  <span class="math-term">TF("gojek")</span><span class="math-op">=</span>
                  <span class="math-term">2 ÷ 2</span><span class="math-op">=</span>
                  <span class="math-result green">1.000</span>
                  <span class="math-comment">// dokumen berbicara hampir hanya tentang gojek</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="insight-callout warn">
          <div class="ic-icon"><i class="fas fa-triangle-exclamation"></i></div>
          <div class="ic-body">
            <strong>Masalah TF saja:</strong> Kata "dan" punya TF sangat tinggi di hampir semua dokumen, tapi tidak bermakna. Di sinilah IDF masuk — menghukum kata yang terlalu umum di seluruh korpus.
          </div>
        </div>
      </section>

      <!-- ══ SEC 3: IDF ══ -->
      <section class="lesson-sec" id="sec-idf">
        <div class="sec-header">
          <span class="sec-num">03</span>
          <div>
            <h2 class="sec-title">Inverse Document Frequency (IDF)</h2>
            <p class="sec-sub">Ukuran global — seberapa langka kata di seluruh korpus. Semakin langka, semakin berharga.</p>
          </div>
        </div>

        <div class="prose">
          <strong>IDF</strong> memberi skor berdasarkan kelangkaan kata. Jika kata muncul di hampir semua dokumen — seperti "dan", "ini", "adalah" — maka ia mendapat skor IDF mendekati nol. Jika kata sangat langka dan hanya muncul di beberapa dokumen — seperti "deflasi", "koruptor", "startup" — maka ia mendapat skor IDF tinggi.
        </div>

        <div class="formula-box blue">
          <div class="fb-label">Formula Inverse Document Frequency</div>
          <div class="fb-eq">
            IDF(<span class="fv">t</span>)
            <span class="op"> = </span>
            log
            <span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;margin:0 4px;">
              <span style="border-bottom:2px solid rgba(246,51,146,.4);padding-bottom:4px;">N</span>
              <span>df(<span class="fv">t</span>)</span>
            </span>
          </div>
          <div class="fb-legend">
            <div class="fb-leg"><span class="fb-sym" style="color:#f63392;">N</span><span class="fb-desc">= total dokumen dalam korpus</span></div>
            <div class="fb-leg"><span class="fb-sym" style="color:#ff9f0a;">df(t)</span><span class="fb-desc">= jumlah dokumen yang mengandung kata t</span></div>
          </div>
        </div>

        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-chart-simple"></i> Visualisasi Skala IDF — Korpus 1000 Dokumen</div>
          <div class="wb-title">Semakin Langka → Skor IDF Semakin Tinggi</div>
          <div class="idf-scale" id="idfScaleDemo"></div>
          <div style="margin-top:8px;font-family:var(--font-mono);font-size:11px;color:var(--text-3);">
            IDF = log(1000 / df). Bar menunjukkan skor relatif. Kata yang muncul di semua dokumen mendapat IDF ≈ 0.
          </div>
        </div>

        <div class="prose">
          Fungsi logaritma dipilih bukan sembarangan — ia <strong>menyeimbangkan skala</strong>. Tanpa log, kata yang muncul di 1 dokumen dari 1000 mendapat skor 1000× lebih tinggi dari kata yang muncul di 10 dokumen. Dengan log, perbedaannya menjadi log(1000) vs log(100) = 3 vs 2 — jauh lebih wajar secara linguistik.
        </div>

        <div class="code-block">
<pre><code><span class="c-kw">import</span> math

N <span class="c-op">=</span> <span class="c-num">1000</span>  <span class="c-cmt"># total dokumen</span>

<span class="c-kw">def</span> <span class="c-fn">idf</span>(df):
    <span class="c-cmt"># +1 pada penyebut = Laplace smoothing (hindari div/0)</span>
    <span class="c-kw">return</span> math.<span class="c-fn">log</span>((N <span class="c-op">+</span> <span class="c-num">1</span>) <span class="c-op">/</span> (df <span class="c-op">+</span> <span class="c-num">1</span>)) <span class="c-op">+</span> <span class="c-num">1</span>

<span class="c-fn">print</span>(<span class="c-fn">idf</span>(<span class="c-num">1000</span>))  <span class="c-cmt"># "dan" muncul di semua  → 1.001 (hampir 0)</span>
<span class="c-fn">print</span>(<span class="c-fn">idf</span>(<span class="c-num">500</span>))   <span class="c-cmt"># "jakarta" setengah dok → 1.693</span>
<span class="c-fn">print</span>(<span class="c-fn">idf</span>(<span class="c-num">10</span>))    <span class="c-cmt"># "deflasi" sangat langka → 5.298</span>
<span class="c-fn">print</span>(<span class="c-fn">idf</span>(<span class="c-num">1</span>))     <span class="c-cmt"># "koruptor X" unik      → 7.909</span></code></pre>
        </div>
      </section>

      <!-- ══ SEC 4: SKOR TF-IDF ══ -->
      <section class="lesson-sec" id="sec-tfidf">
        <div class="sec-header">
          <span class="sec-num">04</span>
          <div>
            <h2 class="sec-title">Skor TF-IDF — Menggabungkan Dua Bobot</h2>
            <p class="sec-sub">Perkalian sederhana yang menghasilkan representasi yang jauh lebih bermakna dari BoW</p>
          </div>
        </div>

        <div class="prose">
          Skor TF-IDF adalah perkalian langsung dari dua komponen: <strong>TF</strong> (bobot lokal — penting dalam dokumen ini) dan <strong>IDF</strong> (bobot global — langka di korpus). Kata mendapat skor tinggi hanya jika ia sering muncul dalam dokumen DAN langka di korpus — persis seperti karakteristik kata kunci yang ideal.
        </div>

        <div class="formula-box">
          <div class="fb-label">Formula TF-IDF</div>
          <div class="fb-eq">
            TF-IDF(<span class="fv">t</span>, <span class="fb">d</span>)
            <span class="op"> = </span>
            TF(<span class="fv">t</span>, <span class="fb">d</span>)
            <span class="op"> × </span>
            IDF(<span class="fv">t</span>)
          </div>
          <div class="fb-legend">
            <div class="fb-leg"><span class="fb-sym" style="color:#30d158;">TF</span><span class="fb-desc">= sering muncul dalam dokumen ini</span></div>
            <div class="fb-leg"><span class="fb-sym" style="color:#ff9f0a;">IDF</span><span class="fb-desc">= langka di seluruh korpus</span></div>
            <div class="fb-leg"><span class="fb-sym" style="color:#f63392;">TF-IDF</span><span class="fb-desc">= tinggi hanya jika keduanya terpenuhi</span></div>
          </div>
        </div>

        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-bullseye"></i> Perbandingan — Tiga Kata dalam Satu Dokumen</div>
          <div class="wb-title">Korpus: 100 berita startup Indonesia</div>

          <!-- TF-IDF word list akan di-render JS -->
          <div id="tfidfWordDemo"></div>
          <div style="margin-top:12px;font-family:var(--font-mono);font-size:11px;color:var(--text-3);">
            ↑ "startup" menang karena kombinasi TF tinggi × IDF tinggi. "dan" kalah meski TF tinggi karena IDF mendekati nol.
          </div>
        </div>

        <div class="code-block">
<pre><code><span class="c-kw">from</span> sklearn.feature_extraction.text <span class="c-kw">import</span> TfidfVectorizer

korpus <span class="c-op">=</span> [
    <span class="c-str">"Gojek startup unicorn Indonesia meluncurkan fitur baru"</span>,
    <span class="c-str">"Tokopedia dan Shopee bersaing di pasar e-commerce"</span>,
    <span class="c-str">"Startup Indonesia makin banyak mendapat pendanaan"</span>,
]

vec <span class="c-op">=</span> <span class="c-cls">TfidfVectorizer</span>()
X   <span class="c-op">=</span> vec.<span class="c-fn">fit_transform</span>(korpus)

<span class="c-cmt"># Lihat skor TF-IDF dokumen pertama</span>
feature_names <span class="c-op">=</span> vec.<span class="c-fn">get_feature_names_out</span>()
scores        <span class="c-op">=</span> X[<span class="c-num">0</span>].<span class="c-fn">toarray</span>()[<span class="c-num">0</span>]

<span class="c-cmt"># Urutkan dari skor tertinggi</span>
top_words <span class="c-op">=</span> <span class="c-fn">sorted</span>(
    <span class="c-fn">zip</span>(feature_names, scores),
    key<span class="c-op">=lambda</span> x: x[<span class="c-num">1</span>], reverse<span class="c-op">=True</span>
)[:<span class="c-num">5</span>]
<span class="c-cmt"># [('unicorn', 0.52), ('fitur', 0.52),</span>
<span class="c-cmt">#  ('meluncurkan', 0.52), ('gojek', 0.40), ...]</span></code></pre>
        </div>

        <div class="insight-callout">
          <div class="ic-icon"><i class="fas fa-lightbulb"></i></div>
          <div class="ic-body">
            <strong>Keyword Extraction gratis:</strong> Kata-kata dengan skor TF-IDF tertinggi per dokumen adalah keyword otomatis — bisa dipakai untuk tag artikel, summarization, atau indexing. Ini adalah cara kerja search engine seperti Elasticsearch sebelum era neural search.
          </div>
        </div>
      </section>

      <!-- ══ SEC 5: SEARCH ENGINE ══ -->
      <section class="lesson-sec" id="sec-search">
        <div class="sec-header">
          <span class="sec-num">05</span>
          <div>
            <h2 class="sec-title">Mesin Pencari dengan TF-IDF</h2>
            <p class="sec-sub">Dari vector space model ke document retrieval yang bisa kamu bangun dalam 10 baris Python</p>
          </div>
        </div>

        <div class="prose">
          Dengan vektor TF-IDF untuk setiap dokumen, kita bisa membangun mesin pencari sederhana: representasikan query sebagai vektor TF-IDF menggunakan vocabulary yang sama, lalu hitung cosine similarity antara query dan semua dokumen, dan kembalikan yang paling mirip.
        </div>

        <div class="worked-box">
          <div class="wb-badge">⚙️ Pipeline Search Engine TF-IDF</div>
          <div class="wb-title">Dari Korpus ke Hasil Pencarian</div>
          <div class="calc-chain">
            <div class="calc-step">
              <div class="cs-num-circle">1</div>
              <div class="cs-content">
                <div class="cs-label">Offline: build index (dilakukan sekali)</div>
                <div class="math-line">
                  <span class="math-term">Korpus D₁…Dₙ</span>
                  <span class="math-op">→ TfidfVectorizer.fit_transform →</span>
                  <span class="math-result blue">Matrix X (n × |V|)</span>
                </div>
              </div>
            </div>
            <div class="calc-step">
              <div class="cs-num-circle">2</div>
              <div class="cs-content">
                <div class="cs-label">Online: proses query (setiap pencarian)</div>
                <div class="math-line">
                  <span class="math-term">Query q</span>
                  <span class="math-op">→ vectorizer.transform →</span>
                  <span class="math-result blue">Vektor q (1 × |V|)</span>
                </div>
              </div>
            </div>
            <div class="calc-step">
              <div class="cs-num-circle">3</div>
              <div class="cs-content">
                <div class="cs-label">Hitung cosine similarity query vs semua dokumen</div>
                <div class="math-line">
                  <span class="math-term">scores</span>
                  <span class="math-op">=</span>
                  <span class="math-term">cosine_similarity(q, X)</span>
                  <span class="math-comment">// array 1×n</span>
                </div>
              </div>
            </div>
            <div class="calc-step">
              <div class="cs-num-circle">4</div>
              <div class="cs-content">
                <div class="cs-label">Urutkan dan kembalikan top-k dokumen</div>
                <div class="math-line">
                  <span class="math-result blue">ranking = argsort(scores)[::-1][:k]</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="code-block">
<pre><code><span class="c-kw">from</span> sklearn.feature_extraction.text <span class="c-kw">import</span> TfidfVectorizer
<span class="c-kw">from</span> sklearn.metrics.pairwise <span class="c-kw">import</span> cosine_similarity
<span class="c-kw">import</span> numpy <span class="c-kw">as</span> np

<span class="c-cmt"># 1. Build index</span>
vec <span class="c-op">=</span> <span class="c-cls">TfidfVectorizer</span>()
X   <span class="c-op">=</span> vec.<span class="c-fn">fit_transform</span>(korpus)

<span class="c-kw">def</span> <span class="c-fn">search</span>(query, top_k<span class="c-op">=</span><span class="c-num">3</span>):
    <span class="c-cmt"># 2. Vektorisasi query</span>
    q_vec  <span class="c-op">=</span> vec.<span class="c-fn">transform</span>([query])
    <span class="c-cmt"># 3. Cosine similarity</span>
    scores <span class="c-op">=</span> <span class="c-fn">cosine_similarity</span>(q_vec, X)[<span class="c-num">0</span>]
    <span class="c-cmt"># 4. Ranking</span>
    top    <span class="c-op">=</span> np.<span class="c-fn">argsort</span>(scores)[::<span class="c-op">-</span><span class="c-num">1</span>][:top_k]
    <span class="c-kw">return</span> [(korpus[i], scores[i]) <span class="c-kw">for</span> i <span class="c-kw">in</span> top <span class="c-kw">if</span> scores[i] <span class="c-op">></span> <span class="c-num">0</span>]

<span class="c-fn">search</span>(<span class="c-str">"startup Indonesia pendanaan"</span>)
<span class="c-cmt"># [("Startup Indonesia makin banyak...", 0.72),</span>
<span class="c-cmt">#  ("Gojek startup unicorn...",        0.41)]</span></code></pre>
        </div>

        <div class="compare-2">
          <div class="cmp-card">
            <div class="cmp-head"><i class="fas fa-circle-check"></i> Kelebihan TF-IDF Search</div>
            <ul class="cmp-list">
              <li class="good">Sangat cepat — matrix multiplication di sparse space</li>
              <li class="good">Tidak butuh training — hanya statistik korpus</li>
              <li class="good">Interpretable — bisa lihat kata mana yang drive similarity</li>
              <li class="good">Efektif untuk exact keyword matching</li>
            </ul>
          </div>
          <div class="cmp-card">
            <div class="cmp-head"><i class="fas fa-circle-xmark"></i> Keterbatasan</div>
            <ul class="cmp-list">
              <li class="bad">Tidak mengerti sinonim — "mobil" ≠ "kendaraan"</li>
              <li class="bad">Tidak paham konteks — "bank sungai" vs "bank uang"</li>
              <li class="bad">Vocabulary mismatch dengan query pendek</li>
              <li class="bad">Tidak bisa generalisasi ke unseen terms</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ══ SEC 6: PRA-PEMROSESAN ══ -->
      <section class="lesson-sec" id="sec-preproses">
        <div class="sec-header">
          <span class="sec-num">06</span>
          <div>
            <h2 class="sec-title">Pra-pemrosesan Teks Bahasa Indonesia</h2>
            <p class="sec-sub">TF-IDF hanya sebaik teks yang masuk — preprocessing menentukan kualitas representasi</p>
          </div>
        </div>

        <div class="prose">
          Bahasa Indonesia butuh pra-pemrosesan khusus sebelum TF-IDF bisa bekerja optimal. Ada tiga tahap utama: <strong>case folding</strong>, <strong>stopword filtering</strong>, dan <strong>stemming</strong>. Stemming Bahasa Indonesia jauh lebih kompleks dari Bahasa Inggris karena sistem afiksasi yang kaya.
        </div>

        <div class="worked-box">
          <div class="wb-badge">⚙️ Pipeline Pra-pemrosesan Bahasa Indonesia</div>
          <div class="wb-title">Teks Mentah → Siap TF-IDF</div>
          <div class="calc-chain">
            <div class="calc-step">
              <div class="cs-num-circle" style="background:#f63392;">1</div>
              <div class="cs-content">
                <div class="cs-label">Case Folding — Menyeragamkan huruf kecil</div>
                <div class="math-line">
                  <span class="math-term">"GoJek MELUNCURKAN Fitur BARU"</span>
                  <span class="math-op">→</span>
                  <span class="math-result blue">"gojek meluncurkan fitur baru"</span>
                </div>
                <div class="math-line"><span class="math-comment">// "GoJek" dan "gojek" = token berbeda tanpa ini</span></div>
              </div>
            </div>
            <div class="calc-step">
              <div class="cs-num-circle" style="background:#f63392;">2</div>
              <div class="cs-content">
                <div class="cs-label">Stopword Removal — Hapus kata tidak bermakna</div>
                <div class="math-line">
                  <span class="math-term">"gojek meluncurkan fitur baru <span style="color:#ef4444">di</span> jakarta <span style="color:#ef4444">dan</span> bandung"</span>
                </div>
                <div class="math-line">
                  <span class="math-op">→</span>
                  <span class="math-result blue">"gojek meluncurkan fitur baru jakarta bandung"</span>
                </div>
                <div class="math-line"><span class="math-comment">// Daftar stopword B.Indonesia: ~758 kata (PNL-ITB)</span></div>
              </div>
            </div>
            <div class="calc-step">
              <div class="cs-num-circle" style="background:#f63392;">3</div>
              <div class="cs-content">
                <div class="cs-label">Stemming Nazief-Adriani — Kembalikan ke kata dasar</div>
                <div class="math-line">
                  <span class="math-term">"meluncurkan"</span><span class="math-op">→</span><span class="math-result blue">"luncur"</span>
                  <span class="math-op">&nbsp;&nbsp;</span>
                  <span class="math-term">"pendanaan"</span><span class="math-op">→</span><span class="math-result blue">"dana"</span>
                </div>
                <div class="math-line">
                  <span class="math-term">"mempertanggungjawabkan"</span><span class="math-op">→</span><span class="math-result blue">"tanggung jawab"</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stemming table -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-leaf"></i> Algoritma Nazief-Adriani — Contoh Stemming</div>
          <div class="wb-title">Stripping awalan dan akhiran bertahap</div>
          <div class="stem-table-wrap">
            <table class="stem-table">
              <thead>
                <tr>
                  <th>Kata Asli</th>
                  <th>Morfologi</th>
                  <th>Kata Dasar</th>
                  <th>Aturan</th>
                </tr>
              </thead>
              <tbody>
                <tr><td class="word-col">meluncurkan</td><td class="morph-col">me- + luncur + -kan</td><td class="stem-col">luncur</td><td class="rule-col">Strip me- → Strip -kan</td></tr>
                <tr><td class="word-col">pendanaan</td><td class="morph-col">pe- + dana + -an</td><td class="stem-col">dana</td><td class="rule-col">Strip pe(N)- → Strip -an</td></tr>
                <tr><td class="word-col">ketidakhadiran</td><td class="morph-col">ke- + tidak + hadir + -an</td><td class="stem-col">hadir</td><td class="rule-col">Strip ke- + tidak → Strip -an</td></tr>
                <tr><td class="word-col">memberikan</td><td class="morph-col">mem- + beri + -kan</td><td class="stem-col">beri</td><td class="rule-col">Strip mem- → Strip -kan</td></tr>
                <tr><td class="word-col">pemberitahuan</td><td class="morph-col">pe- + berita + -an + -an</td><td class="stem-col">berita</td><td class="rule-col">Strip pe(N)- → Strip -an (loop)</td></tr>
                <tr><td class="word-col">memperjuangkan</td><td class="morph-col">memper- + juang + -kan</td><td class="stem-col">juang</td><td class="rule-col">Strip memper- → Strip -kan</td></tr>
              </tbody>
            </table>
          </div>

          <div class="code-block" style="margin-top:16px;">
<pre><code><span class="c-cmt"># Install: pip install PySastrawi</span>
<span class="c-kw">from</span> Sastrawi.Stemmer.StemmerFactory <span class="c-kw">import</span> StemmerFactory
<span class="c-kw">from</span> Sastrawi.StopWordRemover.StopWordRemoverFactory <span class="c-kw">import</span> StopWordRemoverFactory

factory  <span class="c-op">=</span> <span class="c-cls">StemmerFactory</span>()
stemmer  <span class="c-op">=</span> factory.<span class="c-fn">create_stemmer</span>()

sw_factory <span class="c-op">=</span> <span class="c-cls">StopWordRemoverFactory</span>()
stopword   <span class="c-op">=</span> sw_factory.<span class="c-fn">create_stop_word_remover</span>()

teks <span class="c-op">=</span> <span class="c-str">"Gojek sedang meluncurkan layanan pengiriman baru"</span>
step1 <span class="c-op">=</span> teks.<span class="c-fn">lower</span>()
step2 <span class="c-op">=</span> stopword.<span class="c-fn">remove</span>(step1)   <span class="c-cmt"># hapus "sedang"</span>
step3 <span class="c-op">=</span> stemmer.<span class="c-fn">stem</span>(step2)       <span class="c-cmt"># → "gojek luncur layan kirim baru"</span></code></pre>
          </div>
        </div>
      </section>

      <!-- ══ SEC 7: LAB ══ -->
      <section class="lesson-sec" id="sec-lab">
        <div class="sec-header">
          <span class="sec-num">07</span>
          <div>
            <h2 class="sec-title">Lab — TF-IDF Search Engine</h2>
            <p class="sec-sub">Bangun mesin pencari dari dokumenmu sendiri. Tambah artikel, tulis query, lihat ranking real-time.</p>
          </div>
        </div>

        <div class="prose">
          Search engine di bawah ini berjalan sepenuhnya di browser. Tambah atau edit dokumen, build index, lalu cari — semua perhitungan TF-IDF dan cosine similarity dilakukan client-side tanpa server.
        </div>

        <div class="playground-box">
          <div class="pgb-header">
            <div class="pgb-badge"><i class="fas fa-magnifying-glass"></i> TF-IDF Search Engine — Real-time</div>
            <div class="pgb-title">Mesin Pencari Interaktif</div>
            <div class="pgb-sub">Tambah dokumen → Build Index → Cari</div>
          </div>

          <div class="pg-tabs">
            <button class="pg-tab active" data-tab="corpus"><i class="fas fa-book"></i> Korpus</button>
            <button class="pg-tab" data-tab="index"><i class="fas fa-chart-simple"></i> TF-IDF Index</button>
            <button class="pg-tab" data-tab="search"><i class="fas fa-magnifying-glass"></i> Cari</button>
          </div>

          <!-- Tab: Corpus -->
          <div class="pg-pane active" id="pane-corpus">
            <div class="doc-inputs" id="corpusInputs">
              <!-- rendered by JS -->
            </div>
            <div class="pg-actions" style="border-top:1px solid var(--border);padding-top:14px;">
              <button class="pg-run-btn" id="btnAddDoc">+ Tambah Dokumen</button>
              <button class="pg-run-btn" id="btnBuild" style="background:#f63392;color:#fff;"><i class="fas fa-bolt"></i> Build Index</button>
              <button class="pg-reset-btn" id="btnReset">↺ Reset</button>
              <span class="pg-word-count" id="corpusInfo">—</span>
            </div>
          </div>

          <!-- Tab: TF-IDF Index -->
          <div class="pg-pane" id="pane-index">
            <div class="matrix-section">
              <div class="vs-header">
                <span class="vs-title">Top keywords per dokumen (skor TF-IDF tertinggi)</span>
                <span class="vs-count" id="indexInfo">—</span>
              </div>
              <div id="indexTable" style="padding:20px;font-family:var(--font-mono);font-size:11px;color:var(--text-3);">
                Build index terlebih dahulu…
              </div>
            </div>
          </div>

          <!-- Tab: Search -->
          <div class="pg-pane" id="pane-search">
            <div class="search-section">
              <div class="vs-header" style="margin-bottom:12px;">
                <span class="vs-title">Cari dokumen berdasarkan query</span>
              </div>
              <div class="search-row">
                <input type="text" class="search-input" id="searchInput" placeholder="Ketik query pencarian…">
                <button class="search-btn" id="searchBtn"><i class="fas fa-magnifying-glass"></i> Cari</button>
              </div>
              <!-- query analysis -->
              <div id="queryAnalysis" style="display:none;padding:10px 0;"></div>
              <div class="search-results" id="searchResults">
                <div class="sr-empty">Build index terlebih dahulu, lalu masukkan query.</div>
              </div>
            </div>
          </div>
        </div>

        <div class="next-lesson-cta">
          <span class="nlc-label">Lesson berikutnya</span>
          <h3 class="nlc-title">Word Vectors &amp; Embeddings →</h3>
          <p class="nlc-desc">TF-IDF masih tidak paham sinonim atau makna. Word2Vec dan GloVe mengubah kata menjadi vektor padat di mana "ojek" dan "kendaraan" berdekatan secara geometris.</p>
          <a href="#/participant-ai-lab-nlp" class="nlc-btn">Kembali ke Katalog NLP</a>
        </div>
      </section>

    </div><!-- /lesson-body -->
</article>
<footer class="lesson-nav-footer">
<a href="#/participant-ai-lab-bow"><i class="fas fa-chevron-left"></i> Sebelumnya</a>
<a href="#/participant-ai-lab-nlp">Katalog NLP <i class="fas fa-arrow-right"></i></a>
</footer>
</section>
</div>
<aside class="lesson-right-panel">
<section class="module-side-card lesson-progress-card">
<h2>Progres Materi</h2>
<div class="lesson-progress-mini"><b style="--value:0%"></b><strong>0%</strong></div>
<p>TF-IDF — Text Representations</p>
<a href="#sec-lab">Live Lab</a>
</section>
<section class="module-side-card lesson-list-card">
<h2>Daftar Section</h2>
<ol>
<li class="active"><span>1</span><a href="#sec-masalah">Batasan BoW</a><i class="far fa-circle-play"></i></li>
<li><span>2</span><a href="#sec-tf">Term Frequency</a><i class="far fa-circle"></i></li>
<li><span>3</span><a href="#sec-idf">Inverse Document Frequency</a><i class="far fa-circle"></i></li>
<li><span>4</span><a href="#sec-tfidf">TF-IDF Weighting</a><i class="far fa-circle"></i></li>
<li><span>5</span><a href="#sec-search">Search Engine</a><i class="far fa-circle"></i></li>
<li><span>6</span><a href="#sec-preproses">Preprocessing</a><i class="far fa-circle"></i></li>
<li><span>7</span><a href="#sec-lab" class="lab-highlight">Live Lab</a><i class="fas fa-flask"></i></li>
</ol>
</section>
</aside>
</div>
</main>
</section>

````
