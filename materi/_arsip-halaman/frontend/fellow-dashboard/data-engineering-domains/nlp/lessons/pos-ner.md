# Apa itu POS Tagging?

> Sumber: `pages/frontend/fellow-dashboard/data-engineering-domains/nlp/lessons/pos-ner.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

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

## Lampiran Sumber HTML Lengkap

````html
<section class="fellow-dashboard fellow-modules-page lesson-detail-page" data-fellow-page="modules">
<style>
.ai-lab-content .pos-badge{font-family:var(--ai-mono);font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;letter-spacing:.04em;display:inline-block;line-height:1.6}
.ai-lab-content .pos-badge.noun{background:rgba(168,85,247,.15);color:#a855f7}
.ai-lab-content .pos-badge.verb{background:rgba(41,151,255,.15);color:#2997ff}
.ai-lab-content .pos-badge.adj{background:rgba(255,159,10,.15);color:#ff9f0a}
.ai-lab-content .pos-badge.adv{background:rgba(52,199,89,.15);color:#34c759}
.ai-lab-content .pos-badge.pron{background:rgba(255,107,107,.15);color:#ff6b6b}
.ai-lab-content .pos-badge.propn{background:rgba(239,68,68,.15);color:#ef4444}
.ai-lab-content .pos-badge.det{background:rgba(6,182,212,.15);color:#06b6d4}
.ai-lab-content .pos-badge.adp{background:rgba(99,102,241,.15);color:#6366f1}
.ai-lab-content .pos-badge.conj{background:rgba(20,184,166,.15);color:#14b8a6}
.ai-lab-content .pos-badge.num{background:rgba(245,158,11,.15);color:#f59e0b}
.ai-lab-content .pos-badge.punct{background:rgba(107,114,128,.15);color:#6b7280}
.ai-lab-content .pos-badge.aux{background:rgba(16,185,129,.15);color:#10b981}
.ai-lab-content .iob-label{font-family:var(--ai-mono);font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;letter-spacing:.04em}
.ai-lab-content .b-per,.ai-lab-content .i-per{background:rgba(239,68,68,.15);color:#ef4444}
.ai-lab-content .i-per{opacity:.7}
.ai-lab-content .b-org,.ai-lab-content .i-org{background:rgba(59,130,246,.15);color:#3b82f6}
.ai-lab-content .i-org{opacity:.7}
.ai-lab-content .b-loc,.ai-lab-content .i-loc{background:rgba(34,197,94,.15);color:#22c55e}
.ai-lab-content .i-loc{opacity:.7}
.ai-lab-content .b-date{background:rgba(245,158,11,.15);color:#f59e0b}
.ai-lab-content .b-evt{background:rgba(139,92,246,.15);color:#8b5cf6}
.ai-lab-content .b-prod{background:rgba(6,182,212,.15);color:#06b6d4}
.ai-lab-content .o{background:rgba(142,145,160,.08);color:var(--ai-text3)}
.ai-lab-content .ner-badge{font-family:var(--ai-mono);font-size:11px;font-weight:700;padding:3px 9px;border-radius:4px;letter-spacing:.04em}
.ai-lab-content .ner-badge.per{background:rgba(239,68,68,.15);color:#ef4444}
.ai-lab-content .ner-badge.org{background:rgba(59,130,246,.15);color:#3b82f6}
.ai-lab-content .ner-badge.loc{background:rgba(34,197,94,.15);color:#22c55e}
.ai-lab-content .ner-badge.date{background:rgba(245,158,11,.15);color:#f59e0b}
.ai-lab-content .pos-tag-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.ai-lab-content .ptg-item{background:var(--ai-card);border:1px solid var(--ai-border-s);border-radius:var(--ai-r-sm);padding:12px;text-align:center;transition:all .2s;cursor:default}
.ai-lab-content .ptg-item:hover{border-color:rgba(168,85,247,.3);transform:translateY(-2px)}
.ai-lab-content .ptg-name{font-size:12px;font-weight:600;color:var(--ai-text);margin:6px 0 4px}
.ai-lab-content .ptg-ex{font-size:11px;color:var(--ai-text3);font-style:italic}
.ai-lab-content .ambig-demo{display:flex;flex-direction:column;gap:10px}
.ai-lab-content .ad-sentence{background:var(--ai-card);border:1px solid var(--ai-border-s);border-radius:var(--ai-r-sm);padding:14px}
.ai-lab-content .ad-label{font-family:var(--ai-mono);font-size:10px;color:var(--ai-text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px}
.ai-lab-content .ad-tokens{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px}
.ai-lab-content .ad-token{display:flex;flex-direction:column;align-items:center;gap:4px;font-family:var(--ai-mono);font-size:13px;color:var(--ai-text)}
.ai-lab-content .ad-note{font-size:12px;color:var(--ai-text3);font-style:italic}
.ai-lab-content .iob-example{margin-top:10px}
.ai-lab-content .iob-row{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px}
.ai-lab-content .iob-tok{font-family:var(--ai-mono);font-size:13px;color:var(--ai-text);padding:4px 8px;background:var(--ai-bg);border-radius:4px;min-width:70px;text-align:center;border:1px solid var(--ai-border-s)}
.ai-lab-content .viterbi-demo{margin-top:12px}
.ai-lab-content .vd-controls{display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap}
.ai-lab-content .vd-hint{font-size:12px;color:var(--ai-text3);font-family:var(--ai-mono)}
.ai-lab-content .viterbi-table-wrap{overflow-x:auto}
.ai-lab-content .viterbi-table{border-collapse:collapse;font-family:var(--ai-mono);font-size:12px;min-width:400px;width:100%}
.ai-lab-content .viterbi-table th{padding:8px 12px;background:var(--ai-bg);border:1px solid var(--ai-border-s);color:var(--ai-text2);font-size:11px;text-align:center}
.ai-lab-content .viterbi-table td{padding:10px 14px;border:1px solid var(--ai-border-s);text-align:center;cursor:pointer;transition:background .15s;min-width:80px}
.ai-lab-content .viterbi-table td:hover{background:rgba(246,51,146,.08)}
.ai-lab-content .vt-tag{font-weight:700;color:var(--ai-text)}
.ai-lab-content .vt-score{font-size:11px;color:var(--ai-text3);display:block;margin-top:2px}
.ai-lab-content .vt-cell-best{background:rgba(52,199,89,.1)!important;border-color:rgba(52,199,89,.3)!important}
.ai-lab-content .vd-result{margin-top:12px;padding:12px 16px;background:rgba(52,199,89,.06);border:1px solid rgba(52,199,89,.2);border-radius:var(--ai-r-sm);font-family:var(--ai-mono);font-size:13px}
.ai-lab-content .vd-detail{margin-top:10px;padding:12px 16px;background:rgba(246,51,146,.06);border:1px solid rgba(246,51,146,.2);border-radius:var(--ai-r-sm);font-size:12px;color:var(--ai-text2)}
.ai-lab-content .id-cases{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.ai-lab-content .idc-item{background:var(--ai-card);border:1px solid var(--ai-border-s);border-radius:var(--ai-r-sm);padding:14px}
.ai-lab-content .idc-title{font-family:var(--ai-mono);font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--ai-accent);margin-bottom:10px}
.ai-lab-content .idc-tokens{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px}
.ai-lab-content .idc-tok{display:flex;flex-direction:column;align-items:center;gap:3px;font-family:var(--ai-mono);font-size:12px;color:var(--ai-text)}
.ai-lab-content .idc-note{font-size:11px;color:var(--ai-text3);line-height:1.5}
.ai-lab-content .ner-categories{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.ai-lab-content .ner-cat{background:var(--ai-card);border:1px solid var(--ai-border-s);border-radius:var(--ai-r-sm);padding:14px;border-left:3px solid var(--nc)}
.ai-lab-content .ner-cat-badge{font-family:var(--ai-mono);font-size:11px;font-weight:700;margin-bottom:6px}
.ai-lab-content .ner-cat-name{font-weight:600;font-size:13px;color:var(--ai-text);margin-bottom:4px}
.ai-lab-content .ner-cat-ex{font-size:11px;color:var(--ai-text3);font-style:italic;line-height:1.5}
.ai-lab-content .solo-cases{display:flex;flex-direction:column;gap:8px}
.ai-lab-content .sc-item{display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:var(--ai-r-sm);border:1px solid var(--ai-border-s)}
.ai-lab-content .sc-item.loc{background:rgba(34,197,94,.05);border-color:rgba(34,197,94,.2)}
.ai-lab-content .sc-item.adj{background:rgba(255,159,10,.05);border-color:rgba(255,159,10,.2)}
.ai-lab-content .sc-item.per{background:rgba(239,68,68,.05);border-color:rgba(239,68,68,.2)}
.ai-lab-content .sc-tag{flex-shrink:0;min-width:60px}
.ai-lab-content .sc-sentence{font-family:var(--ai-mono);font-size:13px;color:var(--ai-text);flex:1}
.ai-lab-content .sc-sentence strong{color:var(--ai-accent)}
.ai-lab-content .sc-reason{font-size:12px;color:var(--ai-text3);min-width:200px}
.ai-lab-content .ambig-interactive{display:flex;gap:12px;flex-direction:column}
.ai-lab-content .ai-word-list{display:flex;gap:8px;flex-wrap:wrap}
.ai-lab-content .ai-word{padding:7px 16px;border-radius:var(--ai-r-sm);font-family:var(--ai-mono);font-size:13px;font-weight:700;color:var(--ai-text2);background:var(--ai-bg);border:1px solid var(--ai-border-s);cursor:pointer;transition:all .2s}
.ai-lab-content .ai-word:hover{color:var(--ai-text);background:var(--ai-bg2)}
.ai-lab-content .ai-word.active{background:rgba(246,51,146,.1);color:var(--ai-accent);border-color:rgba(246,51,146,.3)}
.ai-lab-content .ai-cases{display:flex;flex-direction:column;gap:8px}
.ai-lab-content .aic-item{display:flex;align-items:flex-start;gap:12px;padding:12px 14px;background:var(--ai-card);border:1px solid var(--ai-border-s);border-radius:var(--ai-r-sm)}
.ai-lab-content .aic-tag{flex-shrink:0;min-width:70px;padding-top:2px}
.ai-lab-content .aic-sent{font-family:var(--ai-mono);font-size:13px;color:var(--ai-text);flex:1}
.ai-lab-content .aic-sent strong{color:#f59e0b}
.ai-lab-content .aic-note{font-size:12px;color:var(--ai-text3);min-width:160px}
.ai-lab-content .benchmark-table-wrap{overflow-x:auto}
.ai-lab-content .benchmark-table{width:100%;border-collapse:collapse;font-size:13px}
.ai-lab-content .benchmark-table th{background:var(--ai-bg);border-bottom:1px solid var(--ai-border-s);padding:10px 14px;text-align:center;font-family:var(--ai-mono);font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--ai-text3)}
.ai-lab-content .benchmark-table th:first-child{text-align:left}
.ai-lab-content .benchmark-table td{padding:10px 14px;border-bottom:1px solid var(--ai-border-s);color:var(--ai-text2);text-align:center;font-family:var(--ai-mono);font-size:12px}
.ai-lab-content .benchmark-table td:first-child{text-align:left;color:var(--ai-text);font-weight:500}
.ai-lab-content .benchmark-table tr:last-child td{border-bottom:none}
.ai-lab-content .bm-row.best{background:rgba(52,199,89,.04)}
.ai-lab-content .bm-score{font-weight:700}
.ai-lab-content .bm-score.low{color:#ef4444}
.ai-lab-content .bm-score.mid{color:#ff9f0a}
.ai-lab-content .bm-score.good{color:#34c759}
.ai-lab-content .bm-score.best-score{color:#34c759;font-size:15px}
.ai-lab-content .confusion-matrix-wrap{overflow-x:auto;margin-top:12px}
.ai-lab-content .cm-label-top{display:grid;grid-template-columns:80px repeat(4,1fr);gap:4px;margin-bottom:4px;font-family:var(--ai-mono);font-size:10px;color:var(--ai-text3);text-align:center}
.ai-lab-content .cm-rows{display:flex;flex-direction:column;gap:4px}
.ai-lab-content .cm-row{display:grid;grid-template-columns:80px repeat(4,1fr);gap:4px;align-items:center}
.ai-lab-content .cm-row-label{font-family:var(--ai-mono);font-size:10px;color:var(--ai-text3);text-align:right;padding-right:8px}
.ai-lab-content .cm-cell{height:52px;border-radius:var(--ai-r-sm);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all .15s;border:1px solid var(--ai-border-s);font-family:var(--ai-mono)}
.ai-lab-content .cm-cell:hover{transform:scale(1.05);border-color:rgba(246,51,146,.3)}
.ai-lab-content .cm-cell .cm-val{font-size:14px;font-weight:700}
.ai-lab-content .cm-cell .cm-pct{font-size:10px;opacity:.7}
.ai-lab-content .cm-cell.diagonal{border-color:rgba(52,199,89,.3)}
.ai-lab-content .cm-example{margin-top:10px;padding:14px;background:rgba(246,51,146,.06);border:1px solid rgba(246,51,146,.2);border-radius:var(--ai-r-sm)}
.ai-lab-content .cm-ex-title{font-family:var(--ai-mono);font-size:10px;text-transform:uppercase;color:var(--ai-accent);margin-bottom:8px;letter-spacing:.06em}
.ai-lab-content .cm-ex-item{font-size:13px;color:var(--ai-text2);padding:4px 0;line-height:1.6}
.ai-lab-content .cm-ex-item strong{color:var(--ai-text)}
.ai-lab-content .pos-output{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:14px;padding:12px 0}
.ai-lab-content .pos-token{display:flex;flex-direction:column;align-items:center;gap:4px}
.ai-lab-content .pos-word{font-family:var(--ai-mono);font-size:14px;color:var(--ai-text)}
.ai-lab-content .pos-legend{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;padding-top:10px;border-top:1px solid var(--ai-border-s)}
.ai-lab-content .ner-output{font-family:var(--ai-mono);font-size:14px;color:var(--ai-text);line-height:2.4;margin-bottom:14px}
.ai-lab-content .ner-legend{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;padding-top:10px;border-top:1px solid var(--ai-border-s)}
.ai-lab-content .ner-span{display:inline-flex;flex-direction:column;align-items:center;margin:2px 2px;vertical-align:bottom}
.ai-lab-content .ner-span-text{padding:2px 6px;border-radius:4px 4px 0 0;font-family:var(--ai-mono);font-size:13px}
.ai-lab-content .ner-span-label{font-family:var(--ai-mono);font-size:9px;font-weight:700;padding:1px 6px;border-radius:0 0 4px 4px;letter-spacing:.04em;width:100%;text-align:center}
.ai-lab-content .ner-span.per .ner-span-text{background:rgba(239,68,68,.12)}
.ai-lab-content .ner-span.per .ner-span-label{background:rgba(239,68,68,.25);color:#ef4444}
.ai-lab-content .ner-span.org .ner-span-text{background:rgba(59,130,246,.12)}
.ai-lab-content .ner-span.org .ner-span-label{background:rgba(59,130,246,.25);color:#3b82f6}
.ai-lab-content .ner-span.loc .ner-span-text{background:rgba(34,197,94,.12)}
.ai-lab-content .ner-span.loc .ner-span-label{background:rgba(34,197,94,.25);color:#22c55e}
.ai-lab-content .ner-span.date .ner-span-text{background:rgba(245,158,11,.12)}
.ai-lab-content .ner-span.date .ner-span-label{background:rgba(245,158,11,.25);color:#f59e0b}
.ai-lab-content .next-lesson-cta{background:var(--ai-bg2);border:1px solid var(--fellow-line);border-radius:var(--ai-r);padding:32px;text-align:center;margin-top:48px}
.ai-lab-content .nlc-label{font-family:var(--ai-mono);font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--ai-accent);margin-bottom:8px;display:block}
.ai-lab-content .nlc-title{font-family:"Plus Jakarta Sans",sans-serif;font-size:22px;font-weight:700;color:var(--ai-text);letter-spacing:-.01em;margin-bottom:8px}
.ai-lab-content .nlc-desc{font-size:14px;color:var(--ai-text2);margin-bottom:20px}
.ai-lab-content .nlc-btn{display:inline-block;padding:12px 28px;border-radius:8px;background:var(--ai-accent);color:#fff;font-weight:600;font-size:14px;text-decoration:none;transition:all .2s}
.ai-lab-content .nlc-btn:hover{opacity:.9;transform:translateY(-2px)}
.ai-lab-content .quiz-container{display:flex;flex-direction:column;gap:20px}
.ai-lab-content .quiz-q{background:var(--ai-card);border:1px solid var(--ai-border-s);border-radius:var(--ai-r-sm);padding:16px}
.ai-lab-content .quiz-q-num{font-family:var(--ai-mono);font-size:10px;text-transform:uppercase;color:var(--ai-text3);margin-bottom:8px;letter-spacing:.06em}
.ai-lab-content .quiz-q-text{font-size:14px;color:var(--ai-text);margin-bottom:12px;line-height:1.6}
.ai-lab-content .quiz-q-sentence{font-family:var(--ai-mono);font-size:13px;background:var(--ai-bg);padding:8px 12px;border-radius:var(--ai-r-sm);margin-bottom:12px;border:1px solid var(--ai-border-s)}
.ai-lab-content .quiz-q-sentence .quiz-blank{color:var(--ai-accent);font-weight:700;background:rgba(246,51,146,.1);padding:1px 6px;border-radius:3px}
.ai-lab-content .quiz-options{display:flex;flex-wrap:wrap;gap:8px}
.ai-lab-content .quiz-opt{font-family:var(--ai-mono);font-size:13px;padding:8px 16px;border-radius:var(--ai-r-sm);background:var(--ai-bg);border:1px solid var(--ai-border-s);color:var(--ai-text2);cursor:pointer;transition:all .2s}
.ai-lab-content .quiz-opt:hover:not(.answered){background:rgba(246,51,146,.08);color:var(--ai-accent);border-color:rgba(246,51,146,.3)}
.ai-lab-content .quiz-opt.correct{background:rgba(52,199,89,.1);color:#34c759;border-color:rgba(52,199,89,.3)}
.ai-lab-content .quiz-opt.wrong{background:rgba(239,68,68,.1);color:#ef4444;border-color:rgba(239,68,68,.3)}
.ai-lab-content .quiz-opt.reveal{background:rgba(52,199,89,.06);color:#34c759;border-color:rgba(52,199,89,.2)}
.ai-lab-content .quiz-feedback{margin-top:10px;font-size:13px;padding:8px 12px;border-radius:var(--ai-r-sm)}
.ai-lab-content .quiz-feedback.ok{background:rgba(52,199,89,.08);color:#34c759}
.ai-lab-content .quiz-feedback.bad{background:rgba(239,68,68,.08);color:#ef4444}
.ai-lab-content .quiz-score-banner{text-align:center;padding:12px;font-family:var(--ai-mono);font-size:14px;font-weight:700;border-radius:var(--ai-r-sm)}
@media(max-width:700px){.ai-lab-content .pos-tag-grid{grid-template-columns:repeat(2,1fr)}.ai-lab-content .ner-categories{grid-template-columns:1fr}.ai-lab-content .id-cases{grid-template-columns:1fr}.ai-lab-content .sc-item{flex-direction:column;align-items:flex-start}}
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
<span>POS Tagging &amp; NER</span>
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
<h1>POS Tagging &amp; NER</h1>
<p>Memberi label gramatikal pada setiap token dan mengekstrak entitas bernama — fondasi pemahaman struktur teks.</p>
<div class="lesson-meta-row">
<span><i class="far fa-clock"></i> 50 menit</span>
<span><i class="fas fa-layer-group"></i> NLP · Text Fundamentals</span>
<b><i class="fas fa-flask"></i> Interaktif + Quiz</b>
</div>
</div>
<img src="/assets/messaging/herai-chat-persona.png" alt="HerAI POS NER">
</section>
<section class="lesson-material-panel">
                    <div class="lesson-tabs" role="tablist" aria-label="Jenis materi">
                        <a href="#/participant-ai-lab-pos-ner" class="active"><i class="fas fa-book-open"></i> Materi</a>
                    </div>
<article class="lesson-article ai-lab-content" id="posner-content">


    <div class="lesson-body">

      <!-- ══ SEC 1: POS ══ -->
      <section class="lesson-sec" id="sec-pos">
        <div class="sec-header">
          <span class="sec-num">01</span>
          <div>
            <h2 class="sec-title">Apa itu POS Tagging?</h2>
            <p class="sec-sub">Memberi label jenis kata pada setiap token — fondasi analisis sintaksis</p>
          </div>
        </div>
        <div class="prose">
          <strong>Part-of-Speech (POS) Tagging</strong> adalah proses melabeli setiap token dalam kalimat dengan kategori gramatikal — NOUN, VERB, ADJ, dll. Ini adalah langkah fundamental yang digunakan pipeline NLP downstream seperti dependency parsing, NER, dan machine translation.
        </div>

        <!-- Universal 17 tags -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-book"></i> Universal Dependencies — 17 POS Tags</div>
          <div class="wb-title">Standar global yang digunakan IndoNLP dan 100+ bahasa lain</div>
          <div class="pos-tag-grid">
            <div class="ptg-item" data-tag="NOUN"><span class="pos-badge noun">NOUN</span><div class="ptg-name">Nomina</div><div class="ptg-ex">meja, kucing, <em>Jakarta</em></div></div>
            <div class="ptg-item" data-tag="VERB"><span class="pos-badge verb">VERB</span><div class="ptg-name">Verba</div><div class="ptg-ex">makan, berlari, <em>berpikir</em></div></div>
            <div class="ptg-item" data-tag="ADJ"><span class="pos-badge adj">ADJ</span><div class="ptg-name">Adjektiva</div><div class="ptg-ex">cantik, besar, <em>merah</em></div></div>
            <div class="ptg-item" data-tag="ADV"><span class="pos-badge adv">ADV</span><div class="ptg-name">Adverbia</div><div class="ptg-ex">sangat, selalu, <em>tidak</em></div></div>
            <div class="ptg-item" data-tag="PRON"><span class="pos-badge pron">PRON</span><div class="ptg-name">Pronomina</div><div class="ptg-ex">saya, dia, <em>mereka</em></div></div>
            <div class="ptg-item" data-tag="PROPN"><span class="pos-badge propn">PROPN</span><div class="ptg-name">Nama Diri</div><div class="ptg-ex">Budi, Solo, <em>Tokopedia</em></div></div>
            <div class="ptg-item" data-tag="DET"><span class="pos-badge det">DET</span><div class="ptg-name">Determiner</div><div class="ptg-ex">ini, itu, <em>para</em></div></div>
            <div class="ptg-item" data-tag="ADP"><span class="pos-badge adp">ADP</span><div class="ptg-name">Preposisi</div><div class="ptg-ex">di, ke, <em>dari</em></div></div>
            <div class="ptg-item" data-tag="CONJ"><span class="pos-badge conj">CONJ</span><div class="ptg-name">Konjungsi</div><div class="ptg-ex">dan, atau, <em>tetapi</em></div></div>
            <div class="ptg-item" data-tag="NUM"><span class="pos-badge num">NUM</span><div class="ptg-name">Numeralia</div><div class="ptg-ex">satu, 42, <em>ribuan</em></div></div>
            <div class="ptg-item" data-tag="PUNCT"><span class="pos-badge punct">PUNCT</span><div class="ptg-name">Punctuasi</div><div class="ptg-ex">. , ! <em>?</em></div></div>
            <div class="ptg-item" data-tag="AUX"><span class="pos-badge aux">AUX</span><div class="ptg-name">Auxiliar</div><div class="ptg-ex">sudah, akan, <em>harus</em></div></div>
          </div>
        </div>

        <!-- Ambiguity intro -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-circle-question"></i> Masalah Utama — Ambiguitas POS</div>
          <div class="wb-title">Satu kata, banyak kemungkinan tag — konteks menentukan</div>
          <div class="ambig-demo">
            <div class="ad-sentence">
              <div class="ad-label">Kalimat 1:</div>
              <div class="ad-tokens">
                <span class="ad-token"><span class="pos-badge noun">NOUN</span>Makan</span>
                <span class="ad-token"><span class="pos-badge noun">NOUN</span>siang</span>
                <span class="ad-token"><span class="pos-badge pron">PRON</span>saya</span>
                <span class="ad-token"><span class="pos-badge verb">VERB</span>terlambat</span>
              </div>
              <div class="ad-note">"Makan" = NOUN (sebagai subjek)</div>
            </div>
            <div class="ad-sentence">
              <div class="ad-label">Kalimat 2:</div>
              <div class="ad-tokens">
                <span class="ad-token"><span class="pos-badge pron">PRON</span>Saya</span>
                <span class="ad-token"><span class="pos-badge verb">VERB">VERB</span>makan</span>
                <span class="ad-token"><span class="pos-badge noun">NOUN</span>nasi</span>
                <span class="ad-token"><span class="pos-badge noun">NOUN</span>goreng</span>
              </div>
              <div class="ad-note">"makan" = VERB (sebagai predikat)</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ SEC 2: HMM VITERBI ══ -->
      <section class="lesson-sec" id="sec-hmm">
        <div class="sec-header">
          <span class="sec-num">02</span>
          <div>
            <h2 class="sec-title">HMM & Algoritma Viterbi</h2>
            <p class="sec-sub">Matematika di balik POS tagger klasik — probabilitas transisi dan emisi</p>
          </div>
        </div>
        <div class="prose">
          <strong>Hidden Markov Model (HMM)</strong> memodelkan POS tagging sebagai: kita <em>observasi</em> kata-kata, tapi <em>hidden state</em>-nya adalah tag. Model belajar dua probabilitas dari corpus berlabel.
        </div>

        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-ruler-combined"></i> Dua Probabilitas Kunci</div>
          <div class="wb-title">Emission & Transition — dasar HMM tagger</div>
          <div class="calc-chain">
            <div class="calc-step">
              <div class="cs-num-circle">1</div>
              <div class="cs-content">
                <div class="cs-label">Emission Probability — P(kata | tag)</div>
                <div class="math-line">
                  <span class="math-term purple">P(makan | VERB)</span>
                  <span class="math-op">=</span>
                  <span class="math-term blue">count(VERB, makan)</span>
                  <span class="math-op">/</span>
                  <span class="math-term blue">count(VERB)</span>
                  <span class="math-op">=</span>
                  <span class="math-result">320 / 12,450 = 0.026</span>
                </div>
                <div class="math-line">
                  <span class="math-term purple">P(makan | NOUN)</span>
                  <span class="math-op">=</span>
                  <span class="math-term blue">89 / 18,300</span>
                  <span class="math-op">=</span>
                  <span class="math-result">0.005</span>
                </div>
                <div class="math-line">
                  <span class="math-comment">// "makan" 5× lebih mungkin VERB daripada NOUN</span>
                </div>
              </div>
            </div>
            <div class="calc-step">
              <div class="cs-num-circle">2</div>
              <div class="cs-content">
                <div class="cs-label">Transition Probability — P(tag_t | tag_{t-1})</div>
                <div class="math-line">
                  <span class="math-term purple">P(VERB | PRON)</span>
                  <span class="math-op">=</span>
                  <span class="math-term blue">count(PRON→VERB)</span>
                  <span class="math-op">/</span>
                  <span class="math-term blue">count(PRON)</span>
                  <span class="math-op">=</span>
                  <span class="math-result green">0.72</span>
                  <span class="math-comment"> (sangat sering)</span>
                </div>
                <div class="math-line">
                  <span class="math-term purple">P(VERB | VERB)</span>
                  <span class="math-op">=</span>
                  <span class="math-result">0.11</span>
                  <span class="math-comment"> (dua VERB berurutan jarang)</span>
                </div>
              </div>
            </div>
            <div class="calc-step">
              <div class="cs-num-circle">3</div>
              <div class="cs-content">
                <div class="cs-label">Viterbi Score — gabungan keduanya</div>
                <div class="math-line">
                  <span class="math-term">v(t, i)</span>
                  <span class="math-op">=</span>
                  <span class="math-term purple">max<sub>j</sub></span>
                  <span class="math-op">[</span>
                  <span class="math-term blue">v(t-1, j)</span>
                  <span class="math-op">×</span>
                  <span class="math-term green">P(tag_i | tag_j)</span>
                  <span class="math-op">×</span>
                  <span class="math-term orange">P(kata_t | tag_i)</span>
                  <span class="math-op">]</span>
                </div>
                <div class="math-line">
                  <span class="math-comment">// v = viterbi score, t = posisi kata, i/j = tag index</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Viterbi Table Interactive -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-sliders"></i>️ Viterbi Table — Realtime</div>
          <div class="wb-title">Kalimat "Saya makan nasi" — lihat tabel probabilitas terisi</div>
          <div class="viterbi-demo">
            <div class="vd-controls">
              <button class="ib-btn primary" onclick="runViterbi()">▶ Jalankan Viterbi</button>
              <button class="ib-btn" onclick="resetViterbi()">↺ Reset</button>
              <span class="vd-hint">Klik cell untuk lihat detail perhitungan</span>
            </div>
            <div class="viterbi-table-wrap">
              <table class="viterbi-table" id="viterbiTable">
                <thead id="viterbiHead"></thead>
                <tbody id="viterbiBody"></tbody>
              </table>
            </div>
            <div class="vd-result" id="viterbiResult" style="display:none"></div>
            <div class="vd-detail" id="viterbiDetail" style="display:none"></div>
          </div>
        </div>

        <div class="insight-callout">
          <div class="ic-icon"><i class="fas fa-bolt"></i></div>
          <div class="ic-body">
            <strong>Kompleksitas Viterbi:</strong> O(N × T²) di mana N = panjang kalimat, T = jumlah tag. Untuk kalimat 20 kata dengan 17 tag = 20 × 17² = 5,780 operasi. Jauh lebih efisien dari brute force O(T^N) = 17^20 ≈ 2 × 10^24.
          </div>
        </div>
      </section>

      <!-- ══ SEC 3: POS TAGS INDONESIA ══ -->
      <section class="lesson-sec" id="sec-id">
        <div class="sec-header">
          <span class="sec-num">03</span>
          <div>
            <h2 class="sec-title">POS Tags Bahasa Indonesia</h2>
            <p class="sec-sub">Tantangan unik morfologi Indonesia yang tidak ada di English</p>
          </div>
        </div>
        <div class="prose">
          Bahasa Indonesia punya karakteristik unik: <strong>tidak ada infleksi tense</strong> (kata kerja tidak berubah untuk waktu), <strong>reduplikasi</strong> (meja-meja, berlari-lari), dan <strong>sistem honorifik</strong> (Bapak, Ibu, Mas, Mbak) yang mempengaruhi POS tagging.
        </div>

        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-flag"></i> Kasus Khusus Indonesia</div>
          <div class="wb-title">Fitur linguistik yang bikin POS tagger English gagal</div>
          <div class="id-cases">
            <div class="idc-item">
              <div class="idc-title">Reduplikasi</div>
              <div class="idc-tokens">
                <span class="idc-tok"><span class="pos-badge noun">NOUN</span>meja-meja</span>
                <span class="idc-tok"><span class="pos-badge verb">VERB</span>berlari-lari</span>
                <span class="idc-tok"><span class="pos-badge adj">ADJ</span>perlahan-lahan</span>
              </div>
              <div class="idc-note">Reduplikasi bisa NOUN (plural), VERB (repetitif), ADJ (intensif)</div>
            </div>
            <div class="idc-item">
              <div class="idc-title">Konfiks (me-...-kan, di-...-i)</div>
              <div class="idc-tokens">
                <span class="idc-tok"><span class="pos-badge verb">VERB</span>memberikan</span>
                <span class="idc-tok"><span class="pos-badge verb">VERB</span>dipermasalahkan</span>
                <span class="idc-tok"><span class="pos-badge verb">VERB</span>mempercayai</span>
              </div>
              <div class="idc-note">Selalu VERB — konfiks adalah marker verbal kuat</div>
            </div>
            <div class="idc-item">
              <div class="idc-title">Honorifik sebagai DET/PROPN</div>
              <div class="idc-tokens">
                <span class="idc-tok"><span class="pos-badge det">DET</span>Bapak</span>
                <span class="idc-tok"><span class="pos-badge det">DET</span>Ibu</span>
                <span class="idc-tok"><span class="pos-badge propn">PROPN</span>Dr.</span>
              </div>
              <div class="idc-note">Sebelum nama = DET, tanpa nama = NOUN</div>
            </div>
            <div class="idc-item">
              <div class="idc-title">Partikel enklitik</div>
              <div class="idc-tokens">
                <span class="idc-tok"><span class="pos-badge noun">NOUN</span>bukunya</span>
                <span class="idc-tok"><span class="pos-badge verb">VERB</span>makanlah</span>
                <span class="idc-tok"><span class="pos-badge verb">VERB</span>apakah</span>
              </div>
              <div class="idc-note">-nya, -lah, -kah adalah klitik — token atau bagian token?</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ SEC 4: NER ══ -->
      <section class="lesson-sec" id="sec-ner">
        <div class="sec-header">
          <span class="sec-num">04</span>
          <div>
            <h2 class="sec-title">Named Entity Recognition (NER)</h2>
            <p class="sec-sub">Mengidentifikasi dan mengklasifikasi entitas bernama dalam teks</p>
          </div>
        </div>
        <div class="prose">
          NER mengidentifikasi <strong>entitas dunia nyata</strong> dalam teks: nama orang, organisasi, lokasi, tanggal, dll. Ini adalah komponen kritis dalam information extraction, question answering, dan knowledge graph construction.
        </div>

        <!-- IOB Format -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-ruler-combined"></i> Format IOB2 — Inside-Outside-Beginning</div>
          <div class="wb-title">Standar labeling NER yang digunakan semua model modern</div>
          <div class="calc-chain">
            <div class="calc-step">
              <div class="cs-num-circle">1</div>
              <div class="cs-content">
                <div class="cs-label">Tiga prefix IOB2</div>
                <div class="math-line">
                  <span class="pos-badge propn">B-TYPE</span>
                  <span class="math-comment" style="margin-left:8px;">= Beginning — token pertama entitas</span>
                </div>
                <div class="math-line">
                  <span class="pos-badge noun" style="background:rgba(41,151,255,.15);color:#2997ff">I-TYPE</span>
                  <span class="math-comment" style="margin-left:8px;">= Inside — token lanjutan entitas</span>
                </div>
                <div class="math-line">
                  <span class="pos-badge punct">O</span>
                  <span class="math-comment" style="margin-left:8px;">= Outside — bukan bagian entitas</span>
                </div>
              </div>
            </div>
            <div class="calc-step">
              <div class="cs-num-circle">2</div>
              <div class="cs-content">
                <div class="cs-label">Contoh: "Budi Doremi bekerja di Bank Mandiri Jakarta"</div>
                <div class="iob-example">
                  <div class="iob-row">
                    <span class="iob-tok">Budi</span>
                    <span class="iob-tok">Doremi</span>
                    <span class="iob-tok">bekerja</span>
                    <span class="iob-tok">di</span>
                    <span class="iob-tok">Bank</span>
                    <span class="iob-tok">Mandiri</span>
                    <span class="iob-tok">Jakarta</span>
                  </div>
                  <div class="iob-row">
                    <span class="iob-label b-per">B-PER</span>
                    <span class="iob-label i-per">I-PER</span>
                    <span class="iob-label o">O</span>
                    <span class="iob-label o">O</span>
                    <span class="iob-label b-org">B-ORG</span>
                    <span class="iob-label i-org">I-ORG</span>
                    <span class="iob-label b-loc">B-LOC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- NER Categories Indonesia -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-flag"></i> Kategori NER Dataset Indonesia (IndoNER)</div>
          <div class="wb-title">8 kategori entitas dalam dataset resmi</div>
          <div class="ner-categories">
            <div class="ner-cat" style="--nc:#ef4444">
              <div class="ner-cat-badge b-per">PER</div>
              <div class="ner-cat-name">Person</div>
              <div class="ner-cat-ex">Joko Widodo, Susi Pudjiastuti, <em>Raisa</em></div>
            </div>
            <div class="ner-cat" style="--nc:#3b82f6">
              <div class="ner-cat-badge b-org">ORG</div>
              <div class="ner-cat-name">Organization</div>
              <div class="ner-cat-ex">Tokopedia, Universitas Indonesia, <em>KPK</em></div>
            </div>
            <div class="ner-cat" style="--nc:#22c55e">
              <div class="ner-cat-badge b-loc">LOC</div>
              <div class="ner-cat-name">Location</div>
              <div class="ner-cat-ex">Jakarta, Gunung Bromo, <em>Selat Sunda</em></div>
            </div>
            <div class="ner-cat" style="--nc:#f59e0b">
              <div class="ner-cat-badge b-date">DATE</div>
              <div class="ner-cat-name">Date/Time</div>
              <div class="ner-cat-ex">17 Agustus 1945, kemarin, <em>tahun depan</em></div>
            </div>
            <div class="ner-cat" style="--nc:#8b5cf6">
              <div class="ner-cat-badge b-evt">EVT</div>
              <div class="ner-cat-name">Event</div>
              <div class="ner-cat-ex">Pemilu 2024, Asian Games, <em>Lebaran</em></div>
            </div>
            <div class="ner-cat" style="--nc:#06b6d4">
              <div class="ner-cat-badge b-prod">PROD</div>
              <div class="ner-cat-name">Product</div>
              <div class="ner-cat-ex">iPhone 15, Indomie Goreng, <em>Gojek</em></div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ SEC 5: AMBIGUITAS ══ -->
      <section class="lesson-sec" id="sec-ambigu">
        <div class="sec-header">
          <span class="sec-num">05</span>
          <div>
            <h2 class="sec-title">Ambiguitas Indonesia <i class="fas fa-face-grin-sweat"></i></h2>
            <p class="sec-sub">Kasus-kasus nyata yang bikin NLP model bingung — termasuk "Solo"</p>
          </div>
        </div>
        <div class="prose">
          Bahasa Indonesia punya banyak kata yang maknanya bergantung 100% pada konteks. Ini adalah <strong>tantangan terbesar NER Indonesia</strong> — dan sumber lelucon tak ada habisnya.
        </div>

        <!-- Solo case -->
        <div class="worked-box" style="border-top-color:#f59e0b">
          <div class="wb-badge" style="color:#f59e0b"><i class="fas fa-masks-theater"></i> Kasus "Solo" — Triple Ambiguity</div>
          <div class="wb-title">Satu kata, tiga makna, tiga tag berbeda</div>
          <div class="solo-cases">
            <div class="sc-item loc">
              <div class="sc-tag"><span class="iob-label b-loc">B-LOC</span></div>
              <div class="sc-sentence">"Kereta dari <strong>Solo</strong> tiba pukul 08.00"</div>
              <div class="sc-reason">Konteks: kereta + dari + pukul → LOC (kota Surakarta)</div>
            </div>
            <div class="sc-item adj">
              <div class="sc-tag"><span class="pos-badge adj">ADJ</span></div>
              <div class="sc-sentence">"Dia pergi <strong>solo</strong> tanpa teman"</div>
              <div class="sc-reason">Konteks: pergi + tanpa teman → ADJ (sendirian, borrowing English)</div>
            </div>
            <div class="sc-item per">
              <div class="sc-tag"><span class="iob-label b-per">B-PER</span></div>
              <div class="sc-sentence">"<strong>Solo</strong> memenangkan kompetisi itu"</div>
              <div class="sc-reason">Konteks: subjek + memenangkan → PER (nama orang)</div>
            </div>
          </div>
          <div class="insight-callout" style="margin-top:16px;background:rgba(245,158,11,.06);border-color:rgba(245,158,11,.2)">
            <div class="ic-icon"><i class="fas fa-face-grin-sweat"></i></div>
            <div class="ic-body">
              <strong>Bonus joke:</strong> "Pria Solo pergi solo ke Solo" — dalam satu kalimat ini: PER + ADJ + LOC. Model NER state-of-the-art pun bisa keliru di sini tanpa konteks yang cukup.
            </div>
          </div>
        </div>

        <!-- Other ambiguous words -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-map"></i>️ Kata-kata Ambigu Terkenal Indonesia</div>
          <div class="wb-title">Kasus yang sering muncul di benchmark NLP Indonesia</div>
          <div class="ambig-interactive" id="ambigInteractive">
            <div class="ai-word-list">
              <button class="ai-word active" onclick="showAmbig('malang')">Malang</button>
              <button class="ai-word" onclick="showAmbig('bima')">Bima</button>
              <button class="ai-word" onclick="showAmbig('kia')">Kia</button>
              <button class="ai-word" onclick="showAmbig('lima')">Lima</button>
              <button class="ai-word" onclick="showAmbig('pare')">Pare</button>
            </div>
            <div class="ai-cases" id="ambigCases"></div>
          </div>
        </div>

        <!-- Context resolution -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-brain"></i> Bagaimana Model Modern Resolusi Ambiguitas</div>
          <div class="wb-title">BERT-based NER — konteks bidireksional menyelamatkan</div>
          <div class="calc-chain">
            <div class="calc-step">
              <div class="cs-num-circle">1</div>
              <div class="cs-content">
                <div class="cs-label">HMM klasik — hanya lihat ke kiri</div>
                <div class="math-line">
                  <span class="math-term">P(tag | kata, tag_sebelumnya)</span>
                  <span class="math-comment"> → window terbatas</span>
                </div>
                <div class="math-line">
                  <span class="math-comment">// "... ke Solo" → P(LOC|Solo, ADP=ke) = 0.71</span>
                </div>
              </div>
            </div>
            <div class="calc-step">
              <div class="cs-num-circle">2</div>
              <div class="cs-content">
                <div class="cs-label">BERT — lihat seluruh kalimat dua arah</div>
                <div class="math-line">
                  <span class="math-term">P(tag | kata, <span style="color:#34c759">seluruh konteks kalimat</span>)</span>
                </div>
                <div class="math-line">
                  <span class="math-comment">// "Solo memenangkan..." → kiri lihat subjek + kanan lihat predikat</span>
                </div>
                <div class="math-line">
                  <span class="math-comment">// → P(PER|Solo) meningkat drastis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ SEC 6: EVALUASI ══ -->
      <section class="lesson-sec" id="sec-eval">
        <div class="sec-header">
          <span class="sec-num">06</span>
          <div>
            <h2 class="sec-title">Evaluasi — Precision, Recall & F1</h2>
            <p class="sec-sub">Angka real dari benchmark IndoNLP — bukan ilustrasi</p>
          </div>
        </div>
        <div class="prose">
          Evaluasi NER menggunakan <strong>entity-level F1</strong> — sebuah entitas dianggap benar hanya jika boundary <em>dan</em> tipe-nya 100% tepat. Partial match tidak dihitung.
        </div>

        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-ruler-combined"></i> Formula Precision, Recall, F1</div>
          <div class="wb-title">Perhitungan eksak untuk NER entity-level</div>
          <div class="calc-chain">
            <div class="calc-step">
              <div class="cs-num-circle">1</div>
              <div class="cs-content">
                <div class="cs-label">Precision — dari semua yang diprediksi, berapa yang benar?</div>
                <div class="math-line">
                  <span class="math-term">Precision</span>
                  <span class="math-op">=</span>
                  <span class="math-term blue">TP</span>
                  <span class="math-op">/</span>
                  <span class="math-op">(</span>
                  <span class="math-term blue">TP</span>
                  <span class="math-op">+</span>
                  <span class="math-term red">FP</span>
                  <span class="math-op">)</span>
                  <span class="math-op">=</span>
                  <span class="math-result">85 / (85+15) = 0.85</span>
                </div>
              </div>
            </div>
            <div class="calc-step">
              <div class="cs-num-circle">2</div>
              <div class="cs-content">
                <div class="cs-label">Recall — dari semua yang ada di data, berapa yang ditemukan?</div>
                <div class="math-line">
                  <span class="math-term">Recall</span>
                  <span class="math-op">=</span>
                  <span class="math-term blue">TP</span>
                  <span class="math-op">/</span>
                  <span class="math-op">(</span>
                  <span class="math-term blue">TP</span>
                  <span class="math-op">+</span>
                  <span class="math-term orange">FN</span>
                  <span class="math-op">)</span>
                  <span class="math-op">=</span>
                  <span class="math-result">85 / (85+20) = 0.81</span>
                </div>
              </div>
            </div>
            <div class="calc-step">
              <div class="cs-num-circle">3</div>
              <div class="cs-content">
                <div class="cs-label">F1 Score — harmonic mean, hukum model yang imbalanced</div>
                <div class="math-line">
                  <span class="math-term">F1</span>
                  <span class="math-op">=</span>
                  <span class="math-term">2 ×</span>
                  <span class="math-op">(</span>
                  <span class="math-term blue">P</span>
                  <span class="math-op">×</span>
                  <span class="math-term green">R</span>
                  <span class="math-op">)</span>
                  <span class="math-op">/</span>
                  <span class="math-op">(</span>
                  <span class="math-term blue">P</span>
                  <span class="math-op">+</span>
                  <span class="math-term green">R</span>
                  <span class="math-op">)</span>
                  <span class="math-op">=</span>
                  <span class="math-result green">2×(0.85×0.81)/(0.85+0.81) = 0.83</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Benchmark table -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-chart-simple"></i> Benchmark NER Indonesia — Angka Real (IndoNER 2022)</div>
          <div class="wb-title">Perbandingan model pada dataset berita Indonesia</div>
          <div class="benchmark-table-wrap">
            <table class="benchmark-table">
              <thead>
                <tr><th>Model</th><th>PER F1</th><th>ORG F1</th><th>LOC F1</th><th>Overall F1</th><th>Speed</th></tr>
              </thead>
              <tbody>
                <tr class="bm-row">
                  <td>Rule-based</td>
                  <td>0.61</td><td>0.48</td><td>0.55</td>
                  <td class="bm-score low">0.54</td>
                  <td class="bm-fast"><i class="fas fa-bolt"></i><i class="fas fa-bolt"></i><i class="fas fa-bolt"></i></td>
                </tr>
                <tr class="bm-row">
                  <td>HMM</td>
                  <td>0.74</td><td>0.65</td><td>0.71</td>
                  <td class="bm-score mid">0.70</td>
                  <td class="bm-fast"><i class="fas fa-bolt"></i><i class="fas fa-bolt"></i></td>
                </tr>
                <tr class="bm-row">
                  <td>BiLSTM-CRF</td>
                  <td>0.83</td><td>0.76</td><td>0.81</td>
                  <td class="bm-score good">0.80</td>
                  <td class="bm-fast"><i class="fas fa-bolt"></i></td>
                </tr>
                <tr class="bm-row best">
                  <td>IndoBERT-NER ⭐</td>
                  <td>0.92</td><td>0.87</td><td>0.91</td>
                  <td class="bm-score best-score">0.90</td>
                  <td class="bm-fast"><i class="fas fa-turtle"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="insight-callout" style="margin-top:12px;">
            <div class="ic-icon"><i class="fas fa-lightbulb"></i></div>
            <div class="ic-body">LOC selalu lebih tinggi dari ORG karena nama kota/negara lebih konsisten. ORG paling sulit — nama perusahaan Indonesia sangat beragam dan sering tidak ada di training data.</div>
          </div>
        </div>

        <!-- Interactive confusion matrix -->
        <div class="worked-box">
          <div class="wb-badge"><i class="fas fa-sliders"></i>️ Confusion Matrix Interaktif</div>
          <div class="wb-title">Klik cell untuk lihat contoh kesalahan model</div>
          <div class="confusion-matrix-wrap">
            <div class="cm-label-top">
              <span></span>
              <span>Pred: O</span><span>Pred: PER</span><span>Pred: ORG</span><span>Pred: LOC</span>
            </div>
            <div class="cm-rows" id="confusionMatrix"></div>
          </div>
          <div class="cm-example" id="cmExample" style="display:none"></div>
        </div>
      </section>

      <!-- ══ SEC 7: LAB ══ -->
      <section class="lesson-sec" id="sec-lab">
        <div class="sec-header">
          <span class="sec-num">07</span>
          <div>
            <h2 class="sec-title"><i class="fas fa-flask"></i> Lab + Quiz</h2>
            <p class="sec-sub">POS tagger, NER highlighter, dan quiz interaktif dengan skor</p>
          </div>
        </div>

        <!-- POS Tagger -->
        <div class="interactive-box">
          <div class="ib-header"><span class="ib-title"><i class="fas fa-tag"></i>️ POS Tagger Interaktif</span></div>
          <div class="ib-body">
            <textarea class="ib-input" id="posInput" rows="3" placeholder="Ketik kalimat Bahasa Indonesia...">Presiden Joko Widodo meresmikan jalan tol baru di Jawa Tengah kemarin.</textarea>
            <div class="ib-actions">
              <button class="ib-btn primary" onclick="runPOS()">Tag POS</button>
              <button class="ib-btn" onclick="resetPOS()">Reset</button>
            </div>
            <div class="ib-result" id="posResult" style="display:none">
              <div class="ibr-label">Hasil POS Tagging:</div>
              <div class="pos-output" id="posOutput"></div>
              <div class="pos-legend">
                <span class="pos-badge noun">NOUN</span>
                <span class="pos-badge verb">VERB</span>
                <span class="pos-badge adj">ADJ</span>
                <span class="pos-badge adv">ADV</span>
                <span class="pos-badge pron">PRON</span>
                <span class="pos-badge propn">PROPN</span>
                <span class="pos-badge adp">ADP</span>
                <span class="pos-badge det">DET</span>
                <span class="pos-badge aux">AUX</span>
              </div>
            </div>
          </div>
        </div>

        <!-- NER Highlighter -->
        <div class="interactive-box">
          <div class="ib-header"><span class="ib-title"><i class="fas fa-magnifying-glass"></i> NER Highlighter</span></div>
          <div class="ib-body">
            <textarea class="ib-input" id="nerInput" rows="3" placeholder="Ketik teks dengan nama orang, tempat, organisasi...">Budi Santoso dari Surabaya bekerja di PT Telkom Indonesia sejak Januari 2020. Ia bertemu Ibu Sari di kantor Bank BCA Jakarta Selatan kemarin.</textarea>
            <div class="ib-actions">
              <button class="ib-btn primary" onclick="runNER()">Highlight Entitas</button>
              <button class="ib-btn" onclick="resetNER()">Reset</button>
            </div>
            <div class="ib-result" id="nerResult" style="display:none">
              <div class="ibr-label">Named Entities:</div>
              <div class="ner-output" id="nerOutput"></div>
              <div class="ner-legend">
                <span class="ner-badge per">PER</span>
                <span class="ner-badge org">ORG</span>
                <span class="ner-badge loc">LOC</span>
                <span class="ner-badge date">DATE</span>
              </div>
              <div class="ibr-stats" id="nerStats"></div>
            </div>
          </div>
        </div>

        <!-- Quiz -->
        <div class="interactive-box">
          <div class="ib-header">
            <span class="ib-title"><i class="fas fa-bullseye"></i> POS & NER Quiz</span>
            <span class="ib-hint">Skor: <span id="quizScore">0</span> / <span id="quizTotal">0</span></span>
          </div>
          <div class="ib-body">
            <div class="quiz-container" id="quizContainer"></div>
          </div>
        </div>

        <div class="next-lesson-cta" style="margin-top:48px;">
          <span class="nlc-label">Modul berikutnya</span>
          <h3 class="nlc-title">Transformers & BERT →</h3>
          <p class="nlc-desc">Dari HMM ke attention mechanism — arsitektur yang merevolusi NLP.</p>
          <a href="#" class="nlc-btn">Coming Soon <i class="fas fa-lock"></i></a>
        </div>
      </section>

</article>
<footer class="lesson-nav-footer">
<a href="#/participant-ai-lab-preprocessing" class="lnf-prev">
<span class="lnf-label">Lesson sebelumnya</span>
<span class="lnf-title">Basic Preprocessing <i class="fas fa-arrow-left"></i></span>
</a>
<a href="#/participant-ai-lab-bow" class="lnf-next">
<span class="lnf-label">Lesson berikutnya</span>
<span class="lnf-title">Bag of Words <i class="fas fa-arrow-right"></i></span>
</a>
</footer>
</section>
</div>
<aside class="lesson-right-panel">
<section class="module-side-card lesson-progress-card">
<h2>Progres Materi</h2>
<div class="lesson-progress-mini"><b style="--value:0%"></b><strong>0%</strong></div>
<p>POS Tagging &amp; NER</p>
<a href="#sec-lab">Lab + Quiz</a>
</section>
<section class="module-side-card lesson-list-card">
<h2>Daftar Section</h2>
<ol>
<li class="active"><span>1</span><a href="#sec-pos">Apa itu POS Tagging?</a><i class="far fa-circle-play"></i></li>
<li><span>2</span><a href="#sec-hmm">HMM &amp; Viterbi</a><i class="far fa-circle"></i></li>
<li><span>3</span><a href="#sec-id">POS Tags Indonesia</a><i class="far fa-circle"></i></li>
<li><span>4</span><a href="#sec-ner">Named Entity Recognition</a><i class="far fa-circle"></i></li>
<li><span>5</span><a href="#sec-ambigu">Ambiguitas Indonesia</a><i class="far fa-circle"></i></li>
<li><span>6</span><a href="#sec-eval">Evaluasi &amp; F1</a><i class="far fa-circle"></i></li>
<li><span>7</span><a href="#sec-lab" class="lab-highlight">Lab + Quiz</a><i class="fas fa-flask"></i></li>
</ol>
</section>
</aside>
</div>
</main>
</section>

````
