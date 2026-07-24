---
course_id: multimodal-large-language-model
title: Multimodal Large Language Model
slug: multimodal-large-language-model
category: Foundation and Core AI
sub_category: Multimodal AI
level: Advanced
language: id
status: ready
version: 1.0.0
estimated_duration: 22-28 jam
route: /participant/courses/multimodal-large-language-model
updated_at: 2026-07-23
---

# Multimodal Large Language Model

> Modul praktis untuk peserta HerAI Fellowship yang membahas cara Large Language Model menerima, menghubungkan, dan menghasilkan informasi dari beberapa modalitas seperti teks, gambar, dokumen, audio, video, dan data terstruktur. Materi bergerak dari fondasi representasi hingga Multimodal RAG, tool use, evaluasi, safety, deployment, dan mini project.

## Informasi Course

| Komponen | Keterangan |
|---|---|
| Level | Advanced |
| Estimasi belajar | 22-28 jam |
| Prasyarat | Python, deep learning, Transformer, LLM, dan Vision Language Model |
| Bentuk pembelajaran | Penjelasan, analogi, diagram teks, contoh kode, latihan, checkpoint, kuis, diskusi, dan mini project |
| Hasil akhir | Peserta mampu merancang, mengevaluasi, dan mendokumentasikan prototipe aplikasi Multimodal Large Language Model secara terukur dan bertanggung jawab |

## Tentang Modul Ini

Multimodal Large Language Model, disingkat MLLM, adalah sistem model bahasa yang dapat menerima dan menghubungkan lebih dari satu jenis data. Inputnya dapat berupa teks, gambar, beberapa halaman dokumen, audio, potongan video, tabel, atau keluaran alat eksternal. Model kemudian menghasilkan respons berupa teks, data terstruktur, keputusan untuk memanggil alat, atau instruksi lanjutan.

Kemampuan multimodal bukan sekadar menambahkan gambar ke prompt. Setiap modalitas memiliki struktur, ukuran, noise, dan risiko yang berbeda. Gambar memiliki piksel dan hubungan spasial. Audio memiliki urutan waktu. Video memiliki ruang sekaligus waktu. Dokumen memiliki teks, tata letak, tabel, dan halaman. Agar semua informasi dapat dipakai bersama, sistem perlu mengubahnya menjadi representasi yang kompatibel, mengatur context budget, menjaga grounding, dan memvalidasi hasil.

> **Prinsip utama:** model yang menerima banyak modalitas belum tentu memahami semuanya dengan kualitas yang sama. Setiap kemampuan harus diuji per modalitas, per tugas, dan per kondisi penggunaan.

Modul ini bersifat model-neutral. Nama arsitektur dan paper dipakai untuk memahami pola desain, bukan untuk mengarahkan peserta pada satu penyedia atau produk tertentu.

## Capaian Pembelajaran

Setelah menyelesaikan modul ini, peserta diharapkan mampu:

1. Menjelaskan perbedaan LLM, VLM, dan Multimodal Large Language Model.
2. Mengidentifikasi karakteristik teks, gambar, audio, video, dokumen, dan data terstruktur.
3. Menjelaskan fungsi encoder, tokenizer, projector, connector, fusion layer, dan language decoder.
4. Membedakan early fusion, intermediate fusion, late fusion, dan tool-mediated fusion.
5. Memahami alignment lintas modalitas dan multimodal instruction tuning.
6. Menyusun prompt yang mengatur peran setiap input dan batas bukti.
7. Merancang pipeline multi-image, dokumen, audio, atau video dengan context budget yang realistis.
8. Merancang Multimodal RAG dan penggunaan alat eksternal.
9. Memilih strategi adaptasi seperti prompt tuning, adapter, LoRA, atau fine-tuning terkontrol.
10. Menyusun evaluasi berdasarkan kualitas per modalitas, grounding, konsistensi lintas modalitas, latency, cost, privacy, dan safety.
11. Mengidentifikasi serangan prompt injection, data leakage, hallucination, serta kegagalan temporal dan spasial.
12. Membuat mini project asisten multimodal dengan golden set, error analysis, guardrail, dan dokumentasi.

## Prasyarat

Peserta sebaiknya memahami:

- variabel, fungsi, class, file, JSON, dan API pada Python,
- tensor, neural network, loss, optimizer, dan inference,
- tokenisasi, embedding, attention, Transformer, context window, dan decoding,
- image encoder, visual token, image-text alignment, dan visual prompting,
- konsep dasar retrieval, vector database, evaluasi model, dan deployment.

Peserta tidak diwajibkan melatih model multimodal besar dari awal. Fokus utama adalah memahami cara kerja, merancang sistem aplikasi, melakukan eksperimen terkontrol, dan mengevaluasi risiko.

## Peta Materi

1. Pengantar Multimodal Large Language Model
2. Modalitas dan Representasi
3. Arsitektur Inti dan Strategi Fusion
4. Tokenisasi, Alignment, dan Context Budget
5. Pretraining dan Multimodal Instruction Tuning
6. Multimodal Prompting dan Inference
7. Multi-Image, Dokumen, Audio, dan Video
8. Multimodal RAG dan Tool Use
9. Adaptasi dan Fine-Tuning
10. Evaluasi Multimodal
11. Hallucination, Bias, Privacy, dan Safety
12. Deployment, Optimasi, dan Monitoring
13. Mini Project Asisten Operasional Multimodal
14. Kuis Akhir dan Pembahasan
15. Diskusi, Glosarium, Ringkasan, dan Referensi

---

# Bab 1 - Pengantar Multimodal Large Language Model

## 1.1 Apa Itu Modalitas?

Modalitas adalah bentuk atau saluran informasi. Teks, gambar, audio, video, tabel, data sensor, dan posisi geografis dapat dianggap sebagai modalitas karena masing-masing memiliki struktur data dan cara interpretasi yang berbeda.

Contoh:

- kalimat memiliki urutan token,
- gambar memiliki hubungan spasial antarpiksel,
- audio memiliki gelombang dan urutan waktu,
- video memiliki frame, gerakan, dan suara,
- dokumen memiliki isi sekaligus tata letak,
- tabel memiliki baris, kolom, tipe data, dan relasi.

Sistem multimodal mencoba menghubungkan informasi dari dua atau lebih modalitas untuk menyelesaikan tugas yang tidak dapat diselesaikan dengan baik oleh satu modalitas saja.

## 1.2 Dari LLM ke MLLM

LLM pada dasarnya memproses token bahasa. Agar LLM dapat memakai gambar, audio, atau video, informasi tersebut perlu diubah menjadi representasi yang dapat dibaca oleh model bahasa atau diakses melalui alat eksternal.

```text
Gambar / audio / video / dokumen
              |
              v
Encoder dan preprocessing per modalitas
              |
              v
Projector, connector, atau tool result
              |
              v
Ruang representasi yang dapat dipakai LLM
              |
              v
Reasoning, generation, atau tool call
```

MLLM sering memakai LLM sebagai pusat orkestrasi. Komponen non-teks mengubah data menjadi token atau embedding. LLM kemudian menyusun respons berdasarkan instruksi, konteks, dan representasi tersebut.

## 1.3 Perbedaan LLM, VLM, dan MLLM

| Aspek | LLM | VLM | MLLM |
|---|---|---|---|
| Modalitas utama | Teks | Gambar dan teks | Teks, gambar, audio, video, dokumen, atau modalitas lain |
| Fokus umum | Pemahaman dan generasi bahasa | Hubungan visual-bahasa | Integrasi banyak sumber informasi |
| Tantangan khas | Hallucination teks | Salah melihat atau salah grounding | Konflik lintas modalitas, context overload, dan safety yang lebih kompleks |
| Contoh | Ringkasan artikel | Menjawab pertanyaan dari gambar | Menganalisis video rapat, slide, transkrip, dan tabel sekaligus |

VLM dapat dianggap sebagai salah satu bentuk model multimodal. Namun, istilah MLLM biasanya digunakan untuk sistem yang lebih luas, mampu menangani lebih dari satu jenis input non-teks atau mengorkestrasi beberapa encoder dan alat.

## 1.4 Contoh Use Case

- Asisten rapat yang membaca slide, mendengar audio, dan membuat action item.
- Asisten inspeksi yang menggabungkan foto, catatan teknisi, dan data sensor.
- Asisten pembelajaran yang memahami diagram, narasi audio, dan pertanyaan peserta.
- Asisten dokumen yang membaca scan, tabel, stempel, dan lampiran.
- Asisten media yang mencari momen tertentu di dalam video berdasarkan pertanyaan bahasa alami.
- Asisten kesehatan yang membantu menyusun informasi dari laporan, citra, dan catatan, dengan review tenaga profesional.

## 1.5 Kapan Multimodal Tidak Diperlukan?

MLLM tidak selalu menjadi pilihan terbaik. Gunakan pendekatan lebih sederhana ketika:

- satu modalitas sudah cukup menjawab kebutuhan,
- keputusan membutuhkan akurasi deterministik yang dapat ditangani rule-based,
- latency sangat ketat,
- data sensitif tidak boleh keluar dari lingkungan tertentu,
- model khusus lebih mudah diuji dan lebih murah,
- volume data multimodal terlalu besar untuk context window.

> **Prinsip desain:** gunakan kompleksitas paling rendah yang tetap memenuhi kebutuhan kualitas, risiko, dan pengalaman pengguna.

## 1.6 Lapisan Sistem Multimodal

Aplikasi MLLM biasanya terdiri atas:

1. akuisisi input,
2. validasi dan kontrol akses,
3. preprocessing per modalitas,
4. ekstraksi representasi,
5. fusion atau orchestration,
6. inference dan tool use,
7. validasi output,
8. logging, monitoring, dan human review.

Kualitas sistem dapat gagal pada salah satu lapisan. Audio yang terpotong, gambar terbalik, halaman dokumen tertukar, atau timestamp yang salah dapat menyebabkan jawaban yang tampak masuk akal tetapi tidak benar.

## Checkpoint Bab 1

1. Apa yang dimaksud dengan modalitas?
2. Mengapa MLLM tidak cukup didefinisikan sebagai LLM yang menerima gambar?
3. Sebutkan dua keadaan ketika model khusus lebih tepat daripada MLLM.

## Latihan Bab 1 - Memetakan Use Case

Pilih satu masalah di pendidikan, operasi, layanan publik, manufaktur, atau bisnis. Tuliskan:

1. modalitas yang tersedia,
2. informasi unik dari setiap modalitas,
3. output yang dibutuhkan,
4. risiko bila salah satu modalitas diabaikan,
5. keputusan yang memerlukan review manusia.

---

# Bab 2 - Modalitas dan Representasi

## 2.1 Representasi sebagai Jembatan

Model tidak menerima makna secara langsung. Setiap input perlu diubah menjadi tensor atau embedding. Representasi yang baik mempertahankan informasi yang penting bagi tugas dan mengurangi bagian yang tidak relevan.

```text
Data mentah -> preprocessing -> encoder -> embedding / token
```

Dua pertanyaan penting:

1. Informasi apa yang dipertahankan?
2. Informasi apa yang mungkin hilang?

Resize gambar dapat menghilangkan teks kecil. Kompresi audio dapat menghilangkan detail suara. Sampling video dapat melewatkan peristiwa singkat. Flatten tabel dapat merusak struktur baris dan kolom.

## 2.2 Teks

Teks biasanya diubah menjadi token melalui tokenizer. Token kemudian dipetakan menjadi embedding.

```text
"Mesin berhenti mendadak"
-> ["Mes", "in", " berhenti", " mendadak"]
-> token ID
-> embedding
```

Tantangan teks meliputi bahasa campuran, singkatan domain, karakter OCR yang salah, konteks panjang, dan instruksi berbahaya yang disisipkan ke dalam data.

## 2.3 Gambar

Gambar dapat diproses oleh CNN atau Vision Transformer. Outputnya berupa feature map atau visual token.

```text
Gambar 336 x 336
-> dibagi menjadi patch
-> patch embedding
-> vision encoder
-> urutan visual token
```

Informasi penting meliputi objek, warna, tekstur, posisi, ukuran relatif, dan teks di dalam gambar. Resolusi dan crop sangat memengaruhi informasi yang tersedia.

## 2.4 Audio

Audio adalah sinyal satu dimensi sepanjang waktu. Representasi umum:

- waveform mentah,
- spectrogram,
- mel-spectrogram,
- token audio diskret,
- embedding dari audio encoder.

```text
Waveform -> framing -> spectrogram -> audio encoder -> audio token
```

Audio dapat memuat ucapan, musik, bunyi lingkungan, jeda, intonasi, dan speaker identity. Tidak semua aplikasi perlu menyimpan seluruh informasi tersebut. Untuk transkripsi rapat, isi ucapan mungkin penting, sedangkan identitas biologis suara perlu diminimalkan.

## 2.5 Video

Video menggabungkan ruang dan waktu. Jika video 30 frame per detik berdurasi satu menit, terdapat 1.800 frame. Mengirim semua frame ke model biasanya tidak efisien.

Strategi representasi video:

- uniform frame sampling,
- keyframe extraction,
- scene detection,
- motion-aware sampling,
- temporal pooling,
- video encoder,
- transkrip audio dan timestamp.

Kualitas video understanding bergantung pada pemilihan frame. Peristiwa penting yang sangat singkat dapat hilang bila sampling terlalu jarang.

## 2.6 Dokumen

Dokumen multimodal dapat memiliki:

- teks hasil OCR,
- koordinat setiap kata,
- urutan halaman,
- tabel,
- diagram,
- tanda tangan atau stempel,
- gambar atau lampiran.

Dokumen sebaiknya tidak selalu diubah menjadi teks polos. Tata letak dapat menentukan arti, misalnya nilai yang berada di kolom tertentu atau catatan kaki yang mengubah interpretasi.

## 2.7 Data Terstruktur dan Sensor

Tabel, JSON, log, dan data sensor memiliki struktur eksplisit. Ada beberapa cara memasukkannya:

- serialisasi menjadi teks,
- encoder khusus tabel atau time series,
- visualisasi grafik lalu diproses sebagai gambar,
- tool call untuk query dan kalkulasi,
- retrieval nilai yang relevan saja.

Mengubah seluruh tabel besar menjadi teks sering tidak efisien. Untuk kalkulasi, lebih aman memakai alat komputasi daripada meminta model menebak hasil aritmetika.

## 2.8 Normalisasi dan Sinkronisasi

Ketika beberapa modalitas berasal dari peristiwa yang sama, sinkronisasi menjadi penting.

Contoh rapat:

```text
00:10:24 slide berubah ke "Risiko"
00:10:31 pembicara menjelaskan kendala vendor
00:10:48 peserta menanyakan tanggal mitigasi
```

Tanpa timestamp yang benar, model dapat menghubungkan pertanyaan dengan slide yang salah.

## 2.9 Contoh Representasi Data Multimodal

```python
sample = {
    "text": "Periksa kondisi panel pada foto.",
    "images": ["panel_front.jpg", "panel_closeup.jpg"],
    "audio": None,
    "video": None,
    "metadata": {
        "asset_id": "PANEL-017",
        "captured_at": "2026-07-20T09:14:00+07:00",
        "location": "Area A"
    }
}
```

Struktur seperti ini membantu menjaga hubungan antara input, metadata, dan sumber bukti.

## Checkpoint Bab 2

1. Apa dampak utama preprocessing terhadap kualitas multimodal?
2. Mengapa video tidak cukup direpresentasikan dengan satu frame acak?
3. Kapan tabel lebih baik diakses melalui tool daripada diserialisasi ke prompt?

## Latihan Bab 2 - Audit Kehilangan Informasi

Ambil satu contoh gambar, audio, video, atau dokumen. Tuliskan tiga tahap preprocessing dan jelaskan informasi apa yang mungkin hilang pada setiap tahap.

---

# Bab 3 - Arsitektur Inti dan Strategi Fusion

## 3.1 Komponen Dasar

MLLM dapat terdiri dari beberapa komponen berikut:

- encoder per modalitas,
- tokenizer atau feature extractor,
- projector atau connector,
- fusion module,
- language model,
- decoder khusus modalitas,
- tool router,
- memory atau retrieval system.

Tidak semua sistem memakai seluruh komponen. Arsitektur dipilih sesuai tugas, data, dan batas komputasi.

## 3.2 Encoder Per Modalitas

Encoder mengubah data mentah menjadi representasi.

| Modalitas | Contoh encoder |
|---|---|
| Teks | Transformer text encoder atau embedding model |
| Gambar | CNN atau Vision Transformer |
| Audio | Conformer, audio Transformer, atau speech encoder |
| Video | Video Transformer atau kombinasi frame encoder dan temporal module |
| Dokumen | OCR + layout encoder atau vision encoder |

Encoder dapat dibekukan atau dilatih bersama. Membekukan encoder mengurangi kebutuhan komputasi tetapi dapat membatasi adaptasi ke domain baru.

## 3.3 Projector dan Connector

Dimensi embedding dari encoder mungkin berbeda dengan dimensi hidden state LLM. Projector memetakan representasi tersebut ke ruang yang kompatibel.

```text
visual embedding 1024 dim
        |
        v
linear / MLP / query connector
        |
        v
LLM embedding 4096 dim
```

Connector dapat berupa:

- linear layer,
- multilayer perceptron,
- resampler,
- query transformer,
- cross-attention block,
- perceiver-style latent bottleneck.

Connector sederhana mudah dilatih. Connector yang lebih kompleks dapat mengompres token dan memilih informasi yang relevan.

## 3.4 Early Fusion

Pada early fusion, representasi beberapa modalitas digabung lebih awal menjadi satu urutan token.

```text
[text token] [image token] [audio token] -> Transformer bersama
```

Kelebihan:

- interaksi lintas modalitas dapat terjadi sejak awal,
- cocok untuk reasoning yang sangat terintegrasi.

Kekurangan:

- sequence menjadi panjang,
- biaya attention meningkat,
- sulit mengatur jumlah token setiap modalitas.

## 3.5 Intermediate Fusion

Pada intermediate fusion, setiap modalitas diproses lebih dahulu, lalu digabung pada lapisan tertentu melalui cross-attention atau fusion block.

Kelebihan:

- representasi lokal dapat dibangun sebelum fusion,
- lebih fleksibel untuk encoder yang berbeda.

Kekurangan:

- desain dan training lebih kompleks,
- alignment antarkomponen perlu dijaga.

## 3.6 Late Fusion

Pada late fusion, setiap modalitas menghasilkan prediksi atau embedding secara terpisah. Hasil kemudian digabung.

Contoh:

```text
model gambar -> skor kondisi visual
model audio -> skor anomali bunyi
model teks -> klasifikasi laporan
                 |
                 v
            decision fusion
```

Late fusion mudah diuji per komponen dan cocok untuk sistem modular. Namun, interaksi mendalam antarinput dapat terbatas.

## 3.7 Tool-Mediated Fusion

Tidak semua modalitas harus dimasukkan sebagai token. LLM dapat memanggil alat khusus:

- OCR engine,
- speech-to-text,
- object detector,
- video search,
- SQL query,
- kalkulator,
- geospatial service.

Hasil alat dikembalikan sebagai konteks terstruktur. Pola ini memisahkan fungsi reasoning dan fungsi persepsi.

```text
User request
   |
   v
LLM memilih alat
   |
   +--> OCR / detector / ASR / database
   |          |
   |          v
   +----- hasil terstruktur
              |
              v
         LLM menyusun jawaban
```

## 3.8 Unified Encoder vs Modular System

| Aspek | Unified model | Sistem modular |
|---|---|---|
| Integrasi | Sangat terintegrasi | Bergantung kontrak antarkomponen |
| Debugging | Sulit memisahkan sumber error | Lebih mudah diuji per modul |
| Deployment | Satu model besar | Beberapa service |
| Fleksibilitas | Terikat kemampuan model | Komponen dapat diganti |
| Latency | Dapat sederhana, tetapi berat | Ada overhead orchestration |
| Governance | Model card tunggal tidak cukup | Perlu governance setiap komponen |

## 3.9 Memilih Pola Arsitektur

Gunakan pertanyaan berikut:

1. Apakah tugas membutuhkan interaksi detail lintas modalitas?
2. Berapa ukuran input dan context budget?
3. Apakah komponen khusus perlu dapat diaudit?
4. Apakah sistem harus berjalan offline atau edge?
5. Seberapa sering satu modalitas tidak tersedia?
6. Apakah output perlu real-time?

## Checkpoint Bab 3

1. Apa perbedaan fungsi encoder dan projector?
2. Mengapa early fusion cenderung mahal untuk video panjang?
3. Apa keuntungan tool-mediated fusion untuk sistem produksi?

## Latihan Bab 3 - Membandingkan Arsitektur

Rancang dua solusi untuk asisten inspeksi: satu memakai unified MLLM, satu memakai detector + sensor model + LLM. Bandingkan kualitas, explainability, latency, cost, dan maintenance.

---

# Bab 4 - Tokenisasi, Alignment, dan Context Budget

## 4.1 Token Multimodal

MLLM sering mengubah informasi non-teks menjadi urutan token laten. Token tersebut bukan kata, melainkan vektor yang mewakili bagian atau ringkasan data.

Contoh:

```text
Gambar -> 576 visual token
Audio 10 detik -> 250 audio token
Teks -> 120 language token
```

Jumlah token memengaruhi biaya komputasi dan kapasitas konteks.

## 4.2 Positional dan Temporal Encoding

Teks memerlukan urutan. Gambar memerlukan posisi dua dimensi. Video dan audio memerlukan waktu.

- 1D position: urutan token teks,
- 2D position: lokasi patch pada gambar,
- temporal position: urutan frame atau segmen audio,
- page position: halaman dan koordinat dokumen.

Jika informasi posisi hilang, model dapat mengetahui objek apa yang ada tetapi tidak tahu hubungan kiri-kanan, sebelum-sesudah, atau halaman sumbernya.

## 4.3 Alignment Lintas Modalitas

Alignment berarti representasi dari modalitas berbeda dapat dihubungkan dengan benar.

Contoh pasangan:

- gambar mesin dan deskripsi kondisi,
- audio ucapan dan transkrip,
- frame video dan timestamp kejadian,
- sel tabel dan label kolom.

Contrastive learning dapat mendekatkan embedding pasangan yang cocok dan menjauhkan pasangan yang tidak cocok.

Secara intuitif:

```text
similarity(gambar_kucing, "seekor kucing") -> tinggi
similarity(gambar_kucing, "mesin industri") -> rendah
```

## 4.4 Alignment Bukan Grounding Sempurna

Model dapat memiliki alignment global yang baik tetapi tetap salah pada detail. Gambar dan caption mungkin serupa secara umum, namun model bisa keliru menghitung objek, membaca angka, atau menentukan urutan kejadian.

Karena itu, evaluasi harus mengukur:

- kesesuaian global,
- detail lokal,
- grounding region,
- urutan temporal,
- konsistensi antarinput.

## 4.5 Context Window Multimodal

Context window adalah kapasitas token yang dapat diproses dalam satu inference. Pada MLLM, token teks berbagi ruang dengan token visual, audio, video, dan tool result.

Contoh anggaran:

| Komponen | Token perkiraan |
|---|---:|
| Instruksi sistem | 800 |
| Riwayat percakapan | 2.000 |
| 4 gambar | 2.304 |
| 10 halaman dokumen | 8.000 |
| Transkrip audio | 3.000 |
| Ruang output | 1.500 |
| Total | 17.604 |

Angka aktual bergantung pada model dan processor. Intinya, memasukkan semua data sekaligus dapat membuat informasi penting terpotong.

## 4.6 Token Compression

Teknik untuk mengurangi token:

- pooling patch visual,
- resampler dengan latent token tetap,
- keyframe selection,
- scene summary,
- speech transcription,
- document chunking,
- retrieval top-k,
- hierarchical summarization.

Kompresi selalu memiliki trade-off. Token lebih sedikit menghemat biaya, tetapi detail kecil dapat hilang.

## 4.7 Modality Dropout

Dalam data nyata, suatu modalitas dapat hilang. Kamera tertutup, mikrofon rusak, metadata kosong, atau OCR gagal. Sistem perlu diuji ketika input tidak lengkap.

Strategi:

- modality mask,
- fallback pipeline,
- confidence per modalitas,
- training dengan modality dropout,
- user-facing warning.

## 4.8 Konflik Lintas Modalitas

Terkadang modalitas memberikan informasi berbeda.

Contoh:

- teks laporan menyebut mesin normal,
- sensor menunjukkan suhu tinggi,
- foto memperlihatkan indikator merah.

Sistem tidak boleh otomatis memilih satu sumber tanpa aturan. Prompt dan business logic perlu menentukan prioritas, freshness, dan sumber otoritatif.

## 4.9 Contoh Perhitungan Context Budget

```python
budget = {
    "system": 700,
    "history": 1500,
    "images": 4 * 576,
    "document": 6000,
    "tool_results": 1200,
    "reserved_output": 1400,
}

total = sum(budget.values())
print(f"Perkiraan total token: {total}")
```

Perhitungan sederhana membantu mencegah desain yang tidak realistis.

## Checkpoint Bab 4

1. Mengapa positional encoding berbeda antar modalitas?
2. Apa perbedaan alignment dan grounding?
3. Sebutkan tiga strategi mengurangi context overload.

## Latihan Bab 4 - Menyusun Anggaran Konteks

Buat context budget untuk aplikasi yang menerima dua gambar, lima halaman dokumen, dan percakapan pengguna. Tentukan data yang dimasukkan langsung, diringkas, atau diambil melalui retrieval.

---

# Bab 5 - Pretraining dan Multimodal Instruction Tuning

## 5.1 Tahapan Pembelajaran

Pipeline pembelajaran MLLM dapat meliputi:

1. melatih encoder per modalitas,
2. melakukan alignment dengan pasangan data,
3. melatih connector atau fusion module,
4. multimodal pretraining,
5. instruction tuning,
6. preference optimization atau safety tuning,
7. domain adaptation.

Tidak semua model mengikuti urutan yang sama.

## 5.2 Data Pasangan

Contoh pasangan data:

- gambar-caption,
- audio-transkrip,
- video-deskripsi,
- halaman dokumen-pertanyaan-jawaban,
- tabel-penjelasan,
- multi-image-comparison.

Kualitas pasangan lebih penting daripada jumlah semata. Caption otomatis dapat memperbesar skala tetapi juga menambah bias dan kesalahan.

## 5.3 Contrastive Objective

Contrastive objective mempelajari kesesuaian antarembedding. Dalam batch, pasangan yang benar diperlakukan sebagai positif dan pasangan lain sebagai negatif.

Tujuannya:

- meningkatkan retrieval,
- membangun ruang representasi bersama,
- membantu zero-shot matching.

Keterbatasannya: objective ini belum tentu cukup untuk menghasilkan jawaban panjang atau mengikuti instruksi.

## 5.4 Generative Objective

Generative objective meminta model memprediksi token output berdasarkan input multimodal.

```text
Input: gambar + "Apa yang terjadi?"
Target: "Seorang teknisi sedang memeriksa panel listrik."
```

Objective ini melatih model menghasilkan bahasa yang relevan, tetapi juga dapat mendorong model memberikan jawaban meskipun bukti tidak cukup. Karena itu, contoh abstention perlu dimasukkan.

## 5.5 Interleaved Multimodal Data

Data interleaved menggabungkan teks dan modalitas lain dalam urutan yang bermakna.

```text
Paragraf -> gambar -> penjelasan -> tabel -> kesimpulan
```

Format ini membantu model memahami hubungan dalam dokumen, artikel, atau percakapan. Namun, urutan dan marker sumber harus jelas.

## 5.6 Multimodal Instruction Tuning

Instruction tuning melatih model mengikuti perintah dengan input multimodal.

Contoh format:

```json
{
  "instruction": "Bandingkan dua foto dan sebutkan perubahan yang terlihat.",
  "inputs": ["before.jpg", "after.jpg"],
  "response": {
    "observations": ["..."],
    "uncertain": ["..."]
  }
}
```

Dataset sebaiknya mencakup:

- variasi instruksi,
- output singkat dan terstruktur,
- contoh penolakan,
- data sulit,
- konflik modalitas,
- kasus modalitas hilang.

## 5.7 Negative Examples

Negative examples mengajarkan model bahwa tidak semua pertanyaan dapat dijawab.

Contoh:

- gambar buram,
- audio tanpa suara,
- dokumen terpotong,
- objek yang ditanyakan tidak ada,
- timestamp tidak tersedia,
- dua sumber saling bertentangan.

Target jawaban harus menyatakan keterbatasan secara jelas.

## 5.8 Data Leakage dan Deduplication

Leakage dapat terjadi ketika:

- frame dari video yang sama masuk train dan test,
- halaman dokumen yang sama muncul dalam split berbeda,
- foto produk yang sama memiliki crop berbeda,
- pertanyaan benchmark ditemukan di data training,
- transkrip dan ringkasannya tersebar antar split.

Split sebaiknya dilakukan berdasarkan entitas, sumber, waktu, atau sesi, bukan hanya file acak.

## 5.9 Synthetic Data

Synthetic data dapat membantu membuat variasi instruksi dan kasus langka. Namun, perlu kontrol:

- verifikasi fakta,
- tandai asal data,
- hindari memperkuat bias model pembuat,
- lakukan deduplication,
- audit kualitas per slice.

## 5.10 Dataset Card

Dataset card minimal mencatat:

- tujuan,
- sumber dan lisensi,
- modalitas,
- proses preprocessing,
- skema anotasi,
- distribusi data,
- risiko privasi,
- known limitation,
- kebijakan retensi,
- metode split.

## Checkpoint Bab 5

1. Mengapa contrastive objective tidak cukup untuk instruction following?
2. Apa fungsi negative examples?
3. Mengapa split berdasarkan entitas penting pada data multimodal?

## Latihan Bab 5 - Merancang Contoh Training

Buat lima contoh instruction-response untuk aplikasi multimodal pilihanmu. Sertakan setidaknya satu kasus input tidak lengkap dan satu kasus modalitas saling bertentangan.

---

# Bab 6 - Multimodal Prompting dan Inference

## 6.1 Prompt sebagai Kontrak

Prompt multimodal harus menjelaskan:

1. tujuan,
2. peran setiap input,
3. sumber yang boleh digunakan,
4. langkah analisis,
5. format output,
6. aturan ketidakpastian,
7. larangan atau batasan.

Contoh:

```text
Tugas: buat ringkasan kondisi aset.
Input:
- Foto A: tampilan keseluruhan.
- Foto B: close-up indikator.
- Catatan teknisi: observasi lapangan.
- Data sensor: nilai 10 menit terakhir.

Aturan:
1. Pisahkan fakta yang terlihat, data terukur, dan interpretasi.
2. Bila sumber bertentangan, laporkan konflik.
3. Jangan menebak komponen yang tidak terlihat.
4. Keluarkan JSON sesuai schema.
```

## 6.2 Menamai dan Mengurutkan Input

Untuk banyak input, gunakan label stabil:

```text
[IMAGE_1: before]
[IMAGE_2: after]
[DOC_1: inspection_form]
[AUDIO_1: operator_note]
```

Tanpa label, model dapat tertukar saat membandingkan beberapa sumber.

## 6.3 Observasi, Interpretasi, dan Rekomendasi

Pisahkan tiga level:

| Level | Contoh |
|---|---|
| Observasi | Lampu indikator merah terlihat menyala |
| Interpretasi | Kondisi mungkin menunjukkan alarm aktif |
| Rekomendasi | Verifikasi kode alarm pada panel dan manual |

Model harus memberi tahu kapan berpindah dari bukti ke interpretasi.

## 6.4 Output Terstruktur

Schema membantu integrasi sistem.

```json
{
  "observations": [],
  "cross_modal_conflicts": [],
  "risk_level": "low|medium|high|unknown",
  "recommended_actions": [],
  "evidence": [
    {
      "source": "IMAGE_2",
      "detail": "indikator merah"
    }
  ],
  "needs_human_review": true
}
```

Output tetap harus divalidasi. Model dapat menghasilkan JSON tidak valid, field hilang, atau nilai di luar enum.

## 6.5 Few-Shot Multimodal Prompting

Few-shot example dapat menunjukkan:

- cara merujuk input,
- tingkat detail,
- format bukti,
- respons ketika tidak yakin,
- penanganan konflik.

Contoh harus singkat dan mewakili pola, bukan sekadar kasus mudah.

## 6.6 Decomposition

Tugas kompleks sebaiknya dipecah:

1. ekstraksi fakta per modalitas,
2. validasi sumber,
3. penyelarasan waktu atau entitas,
4. identifikasi konflik,
5. sintesis,
6. pembuatan output.

Decomposition dapat dilakukan dalam satu prompt atau beberapa tahap pipeline.

## 6.7 Multi-Pass Inference

Contoh alur:

```text
Pass 1: ekstrak fakta dari setiap sumber
Pass 2: bandingkan dan cari konflik
Pass 3: susun kesimpulan dengan bukti
Pass 4: validasi schema dan safety
```

Multi-pass meningkatkan kontrol tetapi menambah latency dan biaya.

## 6.8 Parameter Decoding

Untuk ekstraksi dan analisis, decoding sebaiknya lebih stabil. Untuk ide kreatif, variasi dapat ditingkatkan.

Parameter umum:

- temperature,
- top-p,
- max output token,
- stop sequence,
- repetition penalty.

Kualitas tidak boleh hanya bergantung pada menurunkan temperature. Grounding dan validasi tetap diperlukan.

## 6.9 Abstention

Model perlu dapat menjawab:

- tidak cukup informasi,
- input tidak terbaca,
- sumber bertentangan,
- tugas di luar kemampuan,
- keputusan memerlukan ahli.

Abstention bukan kegagalan. Dalam banyak sistem, abstention adalah perilaku benar.

## 6.10 Contoh Validator Sederhana

```python
ALLOWED_RISK = {"low", "medium", "high", "unknown"}


def validate_result(result: dict) -> list[str]:
    errors = []

    if result.get("risk_level") not in ALLOWED_RISK:
        errors.append("risk_level tidak valid")

    if not isinstance(result.get("observations"), list):
        errors.append("observations harus berupa list")

    if result.get("risk_level") in {"high", "unknown"}:
        if result.get("needs_human_review") is not True:
            errors.append("kasus high/unknown wajib human review")

    return errors
```

## Checkpoint Bab 6

1. Mengapa setiap input perlu diberi label?
2. Apa manfaat memisahkan observasi dan interpretasi?
3. Kapan multi-pass inference layak digunakan?

## Latihan Bab 6 - Prompt Benchmark

Buat tiga versi prompt untuk tugas yang sama. Uji pada lima contoh. Catat kualitas grounding, kelengkapan output, konsistensi, dan jumlah token.

---

# Bab 7 - Multi-Image, Dokumen, Audio, dan Video

## 7.1 Multi-Image Reasoning

Multi-image task dapat berupa:

- perbandingan before-after,
- pemilihan produk dari beberapa foto,
- analisis beberapa sudut objek,
- urutan proses,
- pencarian perbedaan.

Tantangan utama:

- identitas objek antar foto,
- urutan input,
- sudut pandang,
- pencahayaan,
- perubahan yang tidak relevan.

Gunakan label dan pertanyaan spesifik. Hindari pertanyaan terlalu umum seperti “Apa bedanya?” tanpa konteks.

## 7.2 Dokumen Multi-Halaman

Pipeline dokumen dapat meliputi:

```text
file -> page render -> OCR -> layout extraction -> chunking -> retrieval -> MLLM
```

Hal yang harus dipertahankan:

- nomor halaman,
- heading,
- tabel,
- posisi field,
- hubungan referensi,
- sumber kutipan.

Untuk dokumen panjang, gunakan retrieval dan berikan halaman sumber. Jangan mengandalkan satu ringkasan global untuk pertanyaan detail.

## 7.3 Tabel dan Grafik

Model dapat membaca tabel atau grafik sebagai gambar, tetapi untuk akurasi angka sebaiknya:

1. ekstrak data terstruktur,
2. lakukan perhitungan dengan kode,
3. gunakan MLLM untuk penjelasan.

```text
chart image -> chart parser / data source -> numeric table
numeric table -> calculator -> result
MLLM -> explanation with source
```

## 7.4 Audio Understanding

Audio pipeline dapat menggunakan:

- voice activity detection,
- speaker diarization,
- automatic speech recognition,
- audio event classification,
- timestamp alignment,
- language model summarization.

Kesalahan transkripsi dapat mengubah arti. Simpan confidence dan timestamp untuk bagian penting.

## 7.5 Video Understanding

Video memerlukan strategi sampling.

### Uniform Sampling

Mengambil frame dengan interval tetap. Sederhana, tetapi dapat melewatkan kejadian singkat.

### Scene-Based Sampling

Mengambil frame saat terjadi perubahan scene. Cocok untuk presentasi atau video dengan shot berbeda.

### Query-Guided Sampling

Mengambil segmen berdasarkan pertanyaan. Contoh: cari bagian saat “operator membuka panel”.

### Hierarchical Video Analysis

```text
video panjang
-> segmentasi scene
-> ringkasan per scene
-> retrieval scene relevan
-> analisis detail frame
-> jawaban dengan timestamp
```

## 7.6 Audio-Visual Synchronization

Gerakan bibir, suara mesin, dan kejadian visual harus diselaraskan. Offset kecil dapat menyebabkan hubungan sebab-akibat yang salah.

Contoh:

- suara benturan terdengar setelah frame tertentu,
- pembicara berganti tetapi diarization salah,
- subtitle tertinggal beberapa detik.

## 7.7 Temporal Reasoning

Pertanyaan temporal:

- apa yang terjadi sebelum alarm?
- berapa lama proses berlangsung?
- kapan perubahan pertama muncul?
- apakah tindakan terjadi setelah instruksi?

Model perlu menerima timestamp atau urutan yang jelas. Jangan menganggap urutan file selalu sama dengan urutan waktu.

## 7.8 Missing Modality

Sistem perlu menangani:

- audio kosong,
- frame rusak,
- halaman hilang,
- metadata tidak tersedia,
- OCR confidence rendah.

Output harus menyebutkan modalitas yang tidak tersedia dan dampaknya terhadap kesimpulan.

## 7.9 Contoh Manifest Input

```json
{
  "case_id": "CASE-2026-014",
  "sources": [
    {"id": "IMG_1", "type": "image", "uri": "before.jpg"},
    {"id": "IMG_2", "type": "image", "uri": "after.jpg"},
    {"id": "DOC_1", "type": "document", "uri": "report.pdf"},
    {"id": "AUD_1", "type": "audio", "uri": "note.wav"}
  ],
  "required_output": "inspection_summary_v1"
}
```

## Checkpoint Bab 7

1. Mengapa dokumen panjang perlu retrieval?
2. Apa perbedaan uniform sampling dan query-guided sampling?
3. Mengapa timestamp penting untuk audio-video reasoning?

## Latihan Bab 7 - Desain Pipeline

Pilih satu input kompleks: rapat, inspeksi, kelas daring, atau formulir multi-halaman. Buat diagram pipeline dari data mentah hingga jawaban beserta fallback saat satu modalitas gagal.

---

# Bab 8 - Multimodal RAG dan Tool Use

## 8.1 Mengapa Multimodal RAG?

Retrieval-Augmented Generation menambahkan informasi eksternal yang relevan saat inference. Pada multimodal RAG, item yang diambil dapat berupa teks, gambar, halaman dokumen, audio clip, video segment, atau data terstruktur.

Tujuan:

- mengurangi context overload,
- menjaga informasi tetap mutakhir,
- menyediakan bukti,
- membatasi data yang dikirim ke model,
- meningkatkan kemampuan domain.

## 8.2 Pipeline Dasar

```text
Data multimodal
-> parsing dan chunking
-> embedding per modalitas
-> index
-> query understanding
-> retrieval
-> reranking
-> context assembly
-> MLLM response
```

## 8.3 Unimodal vs Cross-Modal Retrieval

### Unimodal Retrieval

- teks mencari teks,
- gambar mencari gambar,
- audio mencari audio.

### Cross-Modal Retrieval

- teks mencari gambar,
- gambar mencari dokumen,
- audio query mencari video segment,
- gambar komponen mencari manual terkait.

Cross-modal retrieval membutuhkan embedding space yang selaras atau query transformation.

## 8.4 Chunking Per Modalitas

| Modalitas | Unit chunk yang mungkin |
|---|---|
| Teks | paragraf, section, atau semantic chunk |
| Dokumen | halaman, block, tabel, atau section |
| Gambar | seluruh gambar, region, atau object crop |
| Audio | segmen berdasarkan jeda atau topik |
| Video | scene, shot, atau temporal window |
| Tabel | baris, kelompok baris, atau hasil query |

Chunk terlalu besar meningkatkan noise. Chunk terlalu kecil kehilangan konteks.

## 8.5 Metadata

Metadata penting untuk filter dan audit:

- source ID,
- timestamp,
- page number,
- region coordinate,
- document version,
- access level,
- entity ID,
- modality,
- confidence.

## 8.6 Hybrid Retrieval

Hybrid retrieval menggabungkan:

- keyword search,
- dense embedding,
- metadata filter,
- multimodal similarity,
- graph relation,
- reranker.

Contoh: cari “indikator tekanan” dengan keyword, filter asset ID, lalu rerank berdasarkan gambar dan teks.

## 8.7 Context Assembly

Context assembly harus menjaga sumber.

```text
[SOURCE DOC_3, page 8]
...

[SOURCE IMG_7, region x1,y1,x2,y2]
...

[SOURCE AUD_2, 00:02:13-00:02:29]
...
```

Tanpa source marker, model sulit menghasilkan evidence yang dapat diperiksa.

## 8.8 Tool Use

MLLM dapat memilih alat berdasarkan kebutuhan:

| Kebutuhan | Alat |
|---|---|
| Membaca teks kecil | OCR |
| Menghitung | Calculator atau Python |
| Mencari data | Database query |
| Menemukan objek | Detector |
| Memotong video | Video processing |
| Mengambil lokasi | Geospatial service |
| Memeriksa format | JSON schema validator |

Model tidak boleh memiliki akses alat tanpa batas. Terapkan allowlist, parameter validation, timeout, dan audit log.

## 8.9 Prompt Injection dari Retrieved Content

Dokumen, gambar, atau transkrip dapat berisi instruksi berbahaya seperti “abaikan aturan sebelumnya”. Retrieved content harus diperlakukan sebagai data, bukan instruksi sistem.

Mitigasi:

- pisahkan system instruction dan retrieved content,
- sanitasi konten,
- batasi tool permission,
- jangan mengeksekusi perintah dari data secara otomatis,
- gunakan policy check sebelum tool call.

## 8.10 Contoh Pseudocode Multimodal RAG

```python
def answer(query, case_id):
    candidates = retrieve(
        query=query,
        filters={"case_id": case_id},
        modalities=["text", "image", "audio", "video"]
    )

    ranked = rerank(query, candidates)
    context = assemble_with_citations(ranked[:8])

    result = multimodal_model.generate(
        instruction=SYSTEM_RULES,
        query=query,
        context=context,
        output_schema="answer_with_evidence_v1"
    )

    validate_schema(result)
    verify_citations(result, context)
    return result
```

## 8.11 Evaluasi Retrieval

Metrik:

- Recall@K,
- Precision@K,
- Mean Reciprocal Rank,
- nDCG,
- source coverage,
- temporal hit rate,
- region hit rate.

Retrieval yang salah tidak dapat diperbaiki hanya dengan prompt yang lebih panjang.

## Checkpoint Bab 8

1. Apa perbedaan unimodal dan cross-modal retrieval?
2. Mengapa metadata penting pada multimodal RAG?
3. Bagaimana retrieved content dapat menjadi sumber prompt injection?

## Latihan Bab 8 - Merancang Index

Buat skema index untuk satu koleksi multimodal. Tentukan unit chunk, embedding, metadata, filter akses, reranking, dan metrik retrieval.

---

# Bab 9 - Adaptasi dan Fine-Tuning

## 9.1 Urutan Perbaikan

Sebelum fine-tuning, periksa:

1. preprocessing,
2. kualitas prompt,
3. retrieval,
4. tool selection,
5. schema validation,
6. model yang lebih sesuai,
7. baru kemudian fine-tuning.

Fine-tuning tidak dapat memperbaiki input yang salah atau target yang tidak jelas.

## 9.2 Prompt dan Processor Adaptation

Perbaikan paling ringan:

- template prompt,
- input labeling,
- image tiling,
- audio segmentation,
- keyframe selection,
- output schema,
- few-shot examples.

Sering kali peningkatan terbesar berasal dari pipeline, bukan parameter model.

## 9.3 Linear Probe dan Task Head

Encoder dibekukan, lalu head kecil dilatih untuk tugas tertentu. Cocok ketika output berupa kelas atau skor, bukan generasi bebas.

Kelebihan:

- murah,
- cepat,
- mudah dibandingkan dengan baseline.

## 9.4 Melatih Projector atau Connector

LLM dan encoder dapat dibekukan, sementara connector dilatih agar representasi domain masuk ke ruang LLM.

Cocok ketika:

- encoder dan LLM sudah kuat,
- domain memiliki visual atau audio khusus,
- resource terbatas.

## 9.5 Adapter dan LoRA

Adapter dan LoRA menambahkan parameter kecil. Dapat diterapkan pada:

- language model,
- vision encoder,
- audio encoder,
- cross-attention,
- connector.

Pilih target module berdasarkan sumber error. Jangan otomatis memasang LoRA di semua lapisan.

## 9.6 Full Fine-Tuning

Full fine-tuning mengubah banyak atau seluruh parameter. Biaya dan risiko lebih tinggi:

- kebutuhan GPU besar,
- catastrophic forgetting,
- overfitting,
- perubahan safety behavior,
- sulit rollback.

Gunakan hanya ketika ada data, komputasi, dan evaluasi yang memadai.

## 9.7 Curriculum Training

Training dapat dimulai dari tugas sederhana ke kompleks:

1. alignment pasangan,
2. single-modality instruction,
3. two-modality reasoning,
4. multi-image atau multi-page,
5. konflik modalitas,
6. tool use,
7. domain-specific cases.

## 9.8 Menyusun Dataset Adaptasi

Dataset harus mencakup:

- penggunaan umum,
- kasus sulit,
- variasi kualitas input,
- data dari perangkat berbeda,
- missing modality,
- konflik sumber,
- abstention,
- safety cases.

## 9.9 Split dan Leakage

Gunakan group split berdasarkan:

- pengguna,
- asset,
- dokumen,
- video,
- sesi,
- lokasi,
- waktu.

Contoh: semua frame dari video yang sama harus berada pada split yang sama.

## 9.10 Experiment Tracking

Catat:

- model dan processor version,
- dataset version,
- prompt template,
- augmentation,
- learning rate,
- trainable module,
- seed,
- metric per modality,
- latency dan memory,
- failure examples.

## 9.11 Acceptance Criteria

Sebelum training, tetapkan target:

- grounding meningkat,
- false claim turun,
- performa tidak turun pada modalitas lain,
- latency tetap dalam batas,
- safety regression tidak terjadi.

## Checkpoint Bab 9

1. Mengapa fine-tuning bukan langkah pertama?
2. Kapan melatih connector menjadi pilihan yang masuk akal?
3. Mengapa metric harus dilihat per modalitas setelah adaptasi?

## Latihan Bab 9 - Rencana Eksperimen

Susun tiga eksperimen bertahap untuk memperbaiki use case pilihanmu. Setiap eksperimen harus memiliki hipotesis, perubahan, metrik, biaya, dan kriteria berhenti.

---

# Bab 10 - Evaluasi Multimodal

## 10.1 Evaluasi Berlapis

Evaluasi MLLM sebaiknya dilakukan pada empat lapisan:

1. preprocessing,
2. persepsi per modalitas,
3. reasoning lintas modalitas,
4. kualitas sistem end-to-end.

Jika hanya mengukur jawaban akhir, sumber kegagalan sulit ditemukan.

## 10.2 Evaluasi Per Modalitas

| Modalitas | Contoh metrik |
|---|---|
| Teks | exact match, F1, faithfulness, relevance |
| Gambar | accuracy, IoU, OCR error, grounding |
| Audio | Word Error Rate, diarization error, event accuracy |
| Video | temporal localization, event recall, timestamp accuracy |
| Dokumen | field accuracy, table accuracy, page citation accuracy |
| Retrieval | Recall@K, MRR, nDCG |

## 10.3 Cross-Modal Consistency

Model harus konsisten dengan semua sumber yang relevan.

Contoh tes:

- jawaban menyebut warna yang sesuai gambar,
- angka sesuai tabel,
- urutan sesuai video,
- kutipan sesuai halaman,
- speaker sesuai timestamp.

## 10.4 Grounding dan Evidence

Setiap klaim penting sebaiknya memiliki evidence:

- source ID,
- page,
- timestamp,
- bounding box,
- baris tabel,
- tool result.

Metrik dapat menilai apakah evidence benar-benar mendukung klaim.

## 10.5 Hallucination Rate

Jenis hallucination:

- object hallucination,
- attribute hallucination,
- OCR hallucination,
- temporal hallucination,
- source hallucination,
- causal hallucination.

Definisikan unit pengukuran. Misalnya persentase klaim faktual yang tidak didukung evidence.

## 10.6 Conflict Handling

Buat contoh sumber bertentangan dan nilai apakah model:

- mendeteksi konflik,
- menyebut sumber,
- tidak memilih tanpa alasan,
- meminta verifikasi,
- mengikuti aturan prioritas.

## 10.7 Robustness Testing

Uji variasi:

- blur,
- noise,
- rotasi,
- crop,
- audio bising,
- accent berbeda,
- frame drop,
- halaman tertukar,
- metadata hilang,
- format file berbeda.

## 10.8 Slice Evaluation

Slice yang relevan:

- jenis perangkat,
- kondisi pencahayaan,
- bahasa,
- durasi video,
- kualitas mikrofon,
- tipe dokumen,
- kelompok pengguna,
- tingkat risiko.

Rata-rata global dapat menyembunyikan kegagalan pada kelompok tertentu.

## 10.9 Human Evaluation

Rubrik penilai manusia dapat mencakup:

1. correctness,
2. completeness,
3. evidence quality,
4. uncertainty calibration,
5. clarity,
6. safety,
7. actionability.

Gunakan instruksi penilaian dan contoh agar antar-penilai konsisten.

## 10.10 Pairwise Evaluation

Bandingkan dua versi sistem pada contoh yang sama. Penilai memilih mana yang lebih baik dan mengapa. Pairwise evaluation berguna untuk membandingkan prompt atau model, tetapi tetap memerlukan analisis per kategori error.

## 10.11 Sistem End-to-End

Ukur:

- latency p50, p95, p99,
- token dan compute cost,
- upload failure,
- tool error,
- schema validity,
- review rate,
- abstention rate,
- user correction rate,
- incident rate.

## 10.12 Golden Set

Golden set harus:

- mewakili use case nyata,
- memiliki sumber dan anotasi jelas,
- mencakup kasus sulit,
- berversi,
- tidak dipakai training,
- dapat dijalankan ulang untuk regression test.

## 10.13 Contoh Evaluation Record

```json
{
  "case_id": "EVAL-041",
  "modalities": ["image", "text", "sensor"],
  "expected": {
    "conflict_detected": true,
    "risk_level": "high"
  },
  "model_output": {},
  "scores": {
    "grounding": 0,
    "consistency": 0,
    "schema_valid": 0
  },
  "error_tags": []
}
```

## Checkpoint Bab 10

1. Mengapa evaluasi harus dipisah per lapisan?
2. Apa yang dimaksud cross-modal consistency?
3. Sebutkan dua metrik sistem selain kualitas jawaban.

## Latihan Bab 10 - Evaluation Plan

Buat evaluation plan berisi 30 contoh. Bagi menjadi kasus normal, sulit, missing modality, konflik, safety, dan out-of-scope. Tentukan metrik serta acceptance threshold.

---

# Bab 11 - Hallucination, Bias, Privacy, dan Safety

## 11.1 Risiko Bertambah Bersama Modalitas

Setiap modalitas menambah permukaan risiko:

- gambar dapat memuat wajah atau data sensitif,
- audio dapat memuat identitas suara,
- video dapat merekam orang yang tidak memberi consent,
- dokumen dapat memuat nomor identitas,
- metadata dapat mengungkap lokasi,
- teks di gambar dapat membawa prompt injection.

## 11.2 Hallucination Multimodal

Model dapat:

- menyebut objek yang tidak ada,
- membaca angka yang salah,
- mengarang isi bagian audio yang tidak jelas,
- menyatakan urutan waktu yang tidak didukung,
- menggabungkan informasi dari kasus berbeda,
- menciptakan citation palsu.

Mitigasi:

- evidence requirement,
- abstention,
- tool verification,
- multi-pass checking,
- schema validation,
- human review.

## 11.3 Bias

Bias dapat berasal dari:

- distribusi data tidak seimbang,
- kualitas sensor berbeda,
- caption stereotip,
- performa ASR tidak merata,
- variasi bahasa dan aksen,
- label annotator,
- pemilihan benchmark.

Evaluasi per slice diperlukan sebelum deployment.

## 11.4 Privasi dan Consent

Pertanyaan privacy by design:

1. Apakah data benar-benar diperlukan?
2. Apakah pengguna memahami tujuan penggunaan?
3. Berapa lama data disimpan?
4. Siapa yang dapat mengakses?
5. Apakah data dipakai untuk training?
6. Bagaimana permintaan penghapusan diproses?
7. Apakah data dikirim ke pihak ketiga?

## 11.5 Data Minimization

Kumpulkan dan kirim hanya bagian yang diperlukan. Contoh:

- crop region relevan,
- blur wajah yang tidak diperlukan,
- potong audio ke segmen penting,
- hapus metadata lokasi,
- redaksi field sensitif,
- retrieval hanya dokumen yang berhak diakses.

## 11.6 Multimodal Prompt Injection

Serangan dapat berada pada:

- teks dokumen,
- tulisan di gambar,
- subtitle video,
- ucapan audio,
- QR code,
- metadata file.

Contoh berbahaya: dokumen berisi instruksi untuk mengirim data ke alamat tertentu. Sistem harus menganggapnya sebagai konten, bukan perintah tepercaya.

## 11.7 Tool Safety

Tool call perlu:

- allowlist fungsi,
- schema parameter,
- autentikasi terpisah,
- least privilege,
- sandbox,
- timeout,
- rate limit,
- confirmation untuk aksi berisiko,
- audit log.

MLLM tidak boleh langsung mengeksekusi tindakan penting hanya karena melihat instruksi pada input.

## 11.8 Content Safety

Input atau output dapat mengandung konten berbahaya. Sistem perlu mempertimbangkan:

- moderation per modalitas,
- kebijakan akses,
- age-appropriate design,
- escalation,
- safe completion,
- penyimpanan bukti yang aman.

## 11.9 High-Stakes Use

Untuk kesehatan, hukum, keselamatan, kredit, pendidikan formal, atau keputusan kerja:

- batasi peran model,
- tampilkan sumber,
- wajibkan review ahli,
- dokumentasikan limitation,
- sediakan jalur banding atau koreksi,
- monitor dampak nyata.

## 11.10 Threat Model Sederhana

| Aset | Ancaman | Dampak | Mitigasi |
|---|---|---|---|
| Dokumen rahasia | Retrieval tanpa filter akses | Kebocoran data | ACL dan authorization filter |
| Tool operasi | Prompt injection visual | Aksi tidak sah | Tool allowlist dan confirmation |
| Audio pengguna | Penyimpanan berlebihan | Risiko privasi | Retensi minimum dan enkripsi |
| Model output | Hallucination | Keputusan salah | Evidence, abstention, review |

## 11.11 Responsible Use Checklist

- [ ] Tujuan penggunaan jelas.
- [ ] Modalitas yang dikumpulkan benar-benar diperlukan.
- [ ] Consent dan dasar akses tersedia.
- [ ] Data sensitif diminimalkan.
- [ ] Retrieved content diperlakukan sebagai data tidak tepercaya.
- [ ] Tool permission mengikuti least privilege.
- [ ] Output menyertakan evidence dan uncertainty.
- [ ] Human review tersedia untuk high-risk case.
- [ ] Incident response dan rollback tersedia.

## Checkpoint Bab 11

1. Mengapa prompt injection multimodal lebih sulit dideteksi?
2. Apa contoh data minimization untuk audio atau gambar?
3. Apa kontrol minimum sebelum model boleh memanggil tool berisiko?

## Latihan Bab 11 - Threat Modeling

Buat threat model untuk mini projectmu. Identifikasi aset, aktor, ancaman, dampak, likelihood, dan mitigasi. Sertakan minimal satu ancaman dari setiap modalitas.

---

# Bab 12 - Deployment, Optimasi, dan Monitoring

## 12.1 Pola Deployment

Pilihan deployment:

- hosted API,
- private cloud,
- on-premise,
- edge,
- hybrid.

Keputusan dipengaruhi oleh ukuran model, latency, bandwidth, privacy, cost, dan kebutuhan offline.

## 12.2 Pipeline Produksi

```text
Upload / stream
-> authentication dan authorization
-> file validation
-> malware scan
-> preprocessing
-> modality service
-> retrieval / tool orchestration
-> MLLM inference
-> schema validation
-> policy check
-> response
-> monitoring dan audit
```

## 12.3 Input Validation

Validasi:

- tipe file,
- ukuran,
- durasi,
- resolusi,
- jumlah halaman,
- codec,
- checksum,
- metadata,
- hak akses.

Jangan mempercayai ekstensi file saja.

## 12.4 Async Processing

Video, audio panjang, dan dokumen besar dapat diproses secara asynchronous di backend aplikasi. Pipeline dapat membuat job dan status. Namun, desain produk harus jelas mengenai kapan hasil tersedia dan bagaimana kegagalan ditangani.

## 12.5 Batching

Batching meningkatkan throughput, tetapi input multimodal memiliki ukuran berbeda. Gunakan:

- bucketing berdasarkan panjang,
- dynamic padding,
- modality-aware batching,
- max batch token,
- timeout queue.

## 12.6 Caching

Yang dapat dicache:

- OCR,
- transkrip,
- embedding,
- keyframe,
- document parse,
- retrieval result,
- model output yang aman.

Cache key perlu mempertimbangkan:

- hash input,
- model version,
- processor version,
- prompt version,
- tool version,
- access scope.

## 12.7 Latency Budget

Contoh:

| Tahap | Target |
|---|---:|
| Upload dan validasi | 500 ms |
| OCR / preprocessing | 1.500 ms |
| Retrieval | 400 ms |
| MLLM first token | 2.000 ms |
| Generation | 3.000 ms |
| Validation | 300 ms |
| Total | 7.700 ms |

Gunakan angka nyata dari pengujian, bukan asumsi.

## 12.8 Cost Drivers

Biaya dipengaruhi oleh:

- jumlah dan resolusi gambar,
- durasi audio/video,
- jumlah halaman,
- token input dan output,
- jumlah tool call,
- retry,
- model size,
- concurrency,
- storage dan egress.

Optimasi harus menjaga kualitas. Mengurangi resolusi terlalu jauh dapat meningkatkan biaya akibat retry dan human correction.

## 12.9 Model Compression

Teknik:

- quantization,
- distillation,
- pruning,
- token compression,
- smaller modality encoder,
- speculative decoding,
- mixture of experts dengan routing.

Uji regression setelah setiap optimasi.

## 12.10 Monitoring

Pantau:

- jumlah request per modalitas,
- file rejection,
- preprocessing failure,
- tool error,
- latency,
- cost,
- schema failure,
- abstention,
- human review,
- user correction,
- safety incident,
- drift.

## 12.11 Drift

Drift dapat berupa:

- kamera baru,
- format dokumen berubah,
- mikrofon berbeda,
- istilah domain berubah,
- pola pengguna berubah,
- sumber retrieval diperbarui.

Gunakan data produksi yang telah dianonimkan dan disetujui untuk membuat regression set baru.

## 12.12 Versioning

Versikan:

- model,
- encoder,
- processor,
- prompt,
- output schema,
- retrieval index,
- tool,
- policy,
- dataset,
- evaluation suite.

Tanpa versioning, perubahan kualitas sulit dilacak.

## 12.13 Fallback dan Degradation

Contoh fallback:

- bila video gagal, gunakan audio + transkrip,
- bila OCR confidence rendah, minta scan ulang,
- bila MLLM timeout, berikan hasil ekstraksi tanpa sintesis,
- bila tool gagal, jangan mengarang hasil,
- bila evidence kurang, arahkan ke review manusia.

## Checkpoint Bab 12

1. Mengapa cache key perlu mencakup processor version?
2. Apa contoh graceful degradation pada input video?
3. Metrik apa yang membantu mendeteksi kualitas sistem memburuk?

## Latihan Bab 12 - Production Readiness

Buat checklist deployment untuk mini projectmu. Sertakan privacy, security, observability, latency, cost, fallback, versioning, dan rollback.

---

# Bab 13 - Mini Project: Asisten Operasional Multimodal

## 13.1 Tujuan Project

Membangun prototipe asisten yang menerima setidaknya tiga jenis sumber dan menghasilkan ringkasan terstruktur dengan evidence, uncertainty, serta rekomendasi review manusia.

## 13.2 Pilihan Tema

Pilih salah satu:

1. asisten inspeksi aset,
2. asisten rapat dan presentasi,
3. asisten analisis dokumen operasional,
4. asisten pembelajaran multimodal,
5. asisten analisis katalog produk,
6. tema lain yang disetujui mentor.

## 13.3 Contoh User Story

> Sebagai koordinator operasi, saya ingin mengunggah foto kondisi, catatan suara, dan laporan PDF agar sistem membuat ringkasan temuan beserta sumber buktinya, sehingga saya dapat menentukan kasus yang perlu diperiksa teknisi.

## 13.4 Ruang Lingkup Minimum

Proyek harus memiliki:

- minimal tiga modalitas atau dua modalitas + satu tool,
- preprocessing terpisah,
- manifest sumber,
- prompt dengan input labeling,
- output JSON tervalidasi,
- evidence per klaim penting,
- abstention,
- golden set minimal 30 kasus,
- error analysis,
- safety dan privacy checklist.

## 13.5 Arsitektur Referensi

```text
User input
  |
  v
Upload dan access control
  |
  +--> image processor
  +--> document parser / OCR
  +--> audio transcription
  +--> structured data tool
              |
              v
       normalized evidence store
              |
              v
       retrieval dan context builder
              |
              v
              MLLM
              |
              v
      schema + policy validation
              |
              v
        result + human review
```

## 13.6 Struktur Folder

```text
multimodal-assistant/
├── README.md
├── requirements.txt
├── config/
│   ├── prompt.yaml
│   └── schema.json
├── data/
│   ├── raw/
│   ├── processed/
│   └── evaluation/
├── src/
│   ├── ingest.py
│   ├── preprocess_image.py
│   ├── preprocess_document.py
│   ├── preprocess_audio.py
│   ├── retrieval.py
│   ├── inference.py
│   ├── validators.py
│   └── monitoring.py
├── tests/
│   ├── test_preprocessing.py
│   ├── test_schema.py
│   └── test_regression.py
└── reports/
    └── evaluation_report.md
```

## 13.7 Manifest Sumber

```json
{
  "case_id": "OPS-001",
  "sources": [
    {
      "source_id": "IMG_1",
      "type": "image",
      "path": "data/raw/panel.jpg",
      "captured_at": "2026-07-10T08:20:00+07:00"
    },
    {
      "source_id": "DOC_1",
      "type": "document",
      "path": "data/raw/report.pdf"
    },
    {
      "source_id": "AUD_1",
      "type": "audio",
      "path": "data/raw/technician_note.wav"
    }
  ]
}
```

## 13.8 Output Schema

```json
{
  "case_id": "OPS-001",
  "summary": "",
  "observations": [
    {
      "claim": "",
      "evidence": ["IMG_1"],
      "confidence": "low|medium|high"
    }
  ],
  "conflicts": [],
  "missing_information": [],
  "risk_level": "low|medium|high|unknown",
  "recommended_actions": [],
  "needs_human_review": true
}
```

## 13.9 Baseline

Baseline sederhana:

1. proses setiap modalitas,
2. gabungkan hasil menjadi prompt,
3. panggil MLLM,
4. validasi schema,
5. simpan evidence.

Jangan langsung menambah fine-tuning. Ukur baseline terlebih dahulu.

## 13.10 Pseudocode Inference

```python
def run_case(manifest: dict) -> dict:
    evidence = []

    for source in manifest["sources"]:
        if source["type"] == "image":
            evidence.append(process_image(source))
        elif source["type"] == "document":
            evidence.extend(process_document(source))
        elif source["type"] == "audio":
            evidence.append(process_audio(source))

    selected = retrieve_relevant_evidence(evidence)
    prompt = build_prompt(manifest["case_id"], selected)
    result = generate_multimodal_response(prompt, selected)

    errors = validate_result(result)
    if errors:
        return {
            "status": "needs_review",
            "validation_errors": errors,
            "raw_result": result,
        }

    return {"status": "ok", "result": result}
```

## 13.11 Golden Set

Minimal 30 kasus:

- 10 normal,
- 5 kualitas rendah,
- 5 missing modality,
- 4 konflik modalitas,
- 3 prompt injection,
- 3 out-of-scope.

Setiap kasus memiliki expected behavior, bukan hanya jawaban akhir.

## 13.12 Metrik Minimum

- schema validity,
- claim grounding,
- conflict detection,
- evidence correctness,
- abstention accuracy,
- review routing accuracy,
- latency,
- cost per case.

## 13.13 Error Taxonomy

Gunakan tag:

- preprocessing_error,
- wrong_source,
- visual_hallucination,
- audio_transcription_error,
- temporal_error,
- conflict_missed,
- unsupported_claim,
- schema_error,
- unsafe_tool_call,
- privacy_issue.

## 13.14 Tahapan Pengerjaan

### Tahap 1 - Definisi

- tentukan user story,
- pilih modalitas,
- definisikan output,
- identifikasi risiko.

### Tahap 2 - Data dan Preprocessing

- siapkan contoh,
- buat manifest,
- proses setiap modalitas,
- catat confidence dan metadata.

### Tahap 3 - Baseline

- buat prompt,
- jalankan inference,
- validasi output,
- ukur metrik awal.

### Tahap 4 - Perbaikan

- analisis error,
- ubah preprocessing, prompt, retrieval, atau tool,
- bandingkan dengan baseline.

### Tahap 5 - Safety dan Production Readiness

- threat model,
- access control,
- logging minimal,
- fallback,
- human review.

### Tahap 6 - Laporan

Laporan berisi:

- masalah,
- arsitektur,
- data,
- evaluasi,
- error analysis,
- limitation,
- rekomendasi.

## 13.15 Rubrik Penilaian

| Aspek | Bobot |
|---|---:|
| Definisi masalah dan scope | 10% |
| Desain pipeline multimodal | 20% |
| Kualitas preprocessing dan evidence | 15% |
| Prompt, retrieval, dan output schema | 15% |
| Evaluasi dan error analysis | 20% |
| Safety, privacy, dan human review | 10% |
| Dokumentasi dan reproducibility | 10% |

## 13.16 Kriteria Selesai

- [ ] Aplikasi menerima modalitas sesuai scope.
- [ ] Setiap sumber memiliki ID dan metadata.
- [ ] Output mengikuti schema.
- [ ] Klaim penting memiliki evidence.
- [ ] Missing modality ditangani.
- [ ] Konflik sumber dapat dilaporkan.
- [ ] Golden set dapat dijalankan ulang.
- [ ] Error analysis tersedia.
- [ ] Safety dan privacy control terdokumentasi.
- [ ] Demo tidak menggunakan data sensitif tanpa izin.

---

# Bab 14 - Kuis Akhir dan Pembahasan

## 14.1 Soal Pilihan Ganda

### Soal 1

Yang paling tepat menggambarkan modalitas adalah:

A. Ukuran parameter model
B. Bentuk atau saluran informasi seperti teks, gambar, dan audio
C. Nama optimizer
D. Jumlah layer

### Soal 2

Peran projector pada MLLM adalah:

A. Menghapus seluruh visual token
B. Memetakan representasi encoder ke ruang yang kompatibel dengan model utama
C. Mengganti dataset
D. Mengatur hak akses pengguna

### Soal 3

Early fusion berarti:

A. Hanya memakai satu modalitas
B. Menggabungkan representasi modalitas pada tahap awal pemrosesan bersama
C. Menggabungkan keputusan setelah semua prediksi selesai
D. Memanggil tool setelah output dibuat

### Soal 4

Tool-mediated fusion berguna karena:

A. Semua data harus menjadi token LLM
B. Fungsi khusus dapat dikerjakan alat yang lebih tepat dan dapat diaudit
C. Menghilangkan kebutuhan validasi
D. Membuat tool memiliki akses tanpa batas

### Soal 5

Mengapa video panjang tidak ideal dimasukkan sebagai seluruh frame?

A. Frame tidak memiliki piksel
B. Jumlah token dan biaya komputasi menjadi sangat besar
C. Video tidak memiliki waktu
D. LLM hanya menerima angka genap

### Soal 6

Alignment lintas modalitas berarti:

A. Semua file memiliki ukuran sama
B. Representasi dari sumber yang berhubungan dapat dipasangkan secara benar
C. Seluruh input diterjemahkan ke bahasa Inggris
D. Model selalu menghasilkan jawaban benar

### Soal 7

Context budget digunakan untuk:

A. Menghitung kapasitas gabungan input dan ruang output
B. Menentukan warna antarmuka
C. Menghapus model version
D. Mengganti consent pengguna

### Soal 8

Negative example pada instruction tuning membantu model:

A. Menjawab semua pertanyaan dengan yakin
B. Belajar menolak atau menyatakan keterbatasan ketika bukti tidak cukup
C. Menghapus metadata
D. Memperbesar resolusi tanpa batas

### Soal 9

Input labeling seperti IMAGE_1 dan DOC_1 berguna untuk:

A. Membantu model dan evaluator merujuk sumber dengan jelas
B. Menyembunyikan sumber
C. Menghilangkan kebutuhan evidence
D. Menambah noise

### Soal 10

Abstention adalah:

A. Model tidak pernah merespons
B. Model menyatakan tidak dapat menjawab secara andal karena bukti tidak cukup
C. Model menghapus log
D. Model menambah hallucination

### Soal 11

Cross-modal retrieval adalah:

A. Teks mencari teks saja
B. Kueri satu modalitas mencari item pada modalitas lain
C. Menghapus vector index
D. Mengurutkan file berdasarkan nama

### Soal 12

Prompt injection multimodal dapat berasal dari:

A. Hanya system prompt
B. Teks di gambar, dokumen, audio, atau metadata
C. Hanya ukuran gambar
D. Hanya nilai temperature

### Soal 13

Fine-tuning sebaiknya dilakukan setelah:

A. Masalah preprocessing, prompt, retrieval, dan evaluasi diperiksa
B. Semua data dihapus
C. Model diberikan tool tanpa kontrol
D. Golden set digunakan sebagai training set

### Soal 14

Cross-modal consistency mengukur:

A. Apakah jawaban konsisten dengan sumber dari berbagai modalitas
B. Apakah semua file memiliki ekstensi sama
C. Jumlah GPU
D. Panjang nama dataset

### Soal 15

Contoh temporal hallucination adalah:

A. Model salah menyatakan urutan kejadian dalam video
B. Model memakai JSON valid
C. Model melakukan caching
D. Model menolak input rusak

### Soal 16

Data minimization berarti:

A. Mengumpulkan dan memproses hanya data yang diperlukan
B. Menyimpan semua data selamanya
C. Menghapus access control
D. Mengirim semua file ke semua service

### Soal 17

Cache key sebaiknya mencakup model dan processor version karena:

A. Hasil dapat berubah ketika preprocessing atau model berubah
B. Versioning tidak memengaruhi output
C. Cache hanya untuk audio
D. Hash input selalu sama

### Soal 18

Golden set harus:

A. Dipakai sebagai data training utama
B. Mewakili use case, memiliki expected behavior, dan berversi
C. Hanya berisi kasus mudah
D. Tidak perlu sumber bukti

### Soal 19

Graceful degradation berarti:

A. Sistem tetap memberikan keluaran terbatas dan jujur saat satu komponen gagal
B. Sistem mengarang data yang hilang
C. Sistem menghapus error log
D. Sistem selalu memanggil model terbesar

### Soal 20

Prinsip paling aman untuk MLLM adalah:

A. Menganggap semua modalitas selalu benar
B. Menjaga sumber, menyatakan konflik, memvalidasi output, dan menyediakan human review
C. Menghilangkan abstention
D. Memberikan tool permission penuh

## 14.2 Kunci Jawaban

| Soal | Jawaban | Pembahasan Singkat |
|---:|:---:|---|
| 1 | B | Modalitas adalah bentuk atau saluran informasi. |
| 2 | B | Projector menjembatani representasi encoder dan model utama. |
| 3 | B | Early fusion menggabungkan token atau fitur sejak tahap awal. |
| 4 | B | Alat khusus dapat lebih tepat, efisien, dan mudah diaudit. |
| 5 | B | Seluruh frame menghasilkan token dan biaya yang sangat besar. |
| 6 | B | Alignment menghubungkan representasi dari data yang saling terkait. |
| 7 | A | Context budget mengalokasikan kapasitas input dan output. |
| 8 | B | Negative example mengajarkan abstention dan batas kemampuan. |
| 9 | A | Label mencegah sumber tertukar dan memudahkan evidence. |
| 10 | B | Abstention adalah respons jujur saat bukti tidak memadai. |
| 11 | B | Cross-modal retrieval menghubungkan kueri dan item beda modalitas. |
| 12 | B | Instruksi berbahaya dapat tersembunyi di berbagai bentuk input. |
| 13 | A | Fine-tuning bukan pengganti pipeline yang benar. |
| 14 | A | Jawaban harus sesuai gambar, audio, dokumen, dan sumber lain. |
| 15 | A | Temporal hallucination salah menyatakan waktu atau urutan. |
| 16 | A | Prinsipnya mengurangi data yang dikumpulkan dan diproses. |
| 17 | A | Perubahan processor dapat mengubah token atau fitur input. |
| 18 | B | Golden set dipakai untuk evaluasi dan regression testing. |
| 19 | A | Sistem gagal secara terkendali tanpa mengarang informasi. |
| 20 | B | Reliability membutuhkan evidence, conflict handling, validasi, dan review. |

## 14.3 Pertanyaan Reflektif

1. Apakah semua modalitas harus selalu diproses oleh satu model?
2. Bagaimana menentukan sumber mana yang lebih dipercaya ketika terjadi konflik?
3. Kapan kompresi token menjadi terlalu agresif?
4. Bagaimana membuktikan bahwa multimodal RAG lebih baik daripada prompt panjang?
5. Apa konsekuensi organisasi ketika model boleh memanggil tool operasional?

---

# Bab 15 - Diskusi, Glosarium, Ringkasan, dan Referensi

## 15.1 Topik Diskusi

### Diskusi 1 - Unified Model atau Modular?

Bandingkan satu model besar dengan pipeline beberapa model khusus untuk use case yang sama. Bahas kualitas, debugging, biaya, governance, dan vendor lock-in.

### Diskusi 2 - Konflik Sumber

Tentukan aturan ketika laporan manusia, gambar, dan sensor memberi informasi berbeda. Sumber mana yang menjadi rujukan dan kapan review wajib dilakukan?

### Diskusi 3 - Privasi Multimodal

Apakah rekaman audio atau video selalu diperlukan? Bahas consent, retensi, redaksi, dan penghapusan.

### Diskusi 4 - Tool Permission

Batas apa yang harus diterapkan sebelum MLLM boleh mengirim email, mengubah database, atau menjalankan tindakan fisik?

## 15.2 Glosarium

| Istilah | Arti |
|---|---|
| Modalitas | Bentuk atau saluran informasi, misalnya teks, gambar, audio, dan video |
| MLLM | Large Language Model yang dapat menggunakan beberapa modalitas |
| Encoder | Komponen yang mengubah input menjadi representasi |
| Projector | Lapisan yang memetakan representasi ke dimensi atau ruang lain |
| Connector | Komponen penghubung encoder dan model bahasa |
| Fusion | Proses menggabungkan informasi dari beberapa modalitas |
| Early fusion | Penggabungan representasi pada tahap awal |
| Intermediate fusion | Penggabungan pada lapisan menengah |
| Late fusion | Penggabungan prediksi atau embedding pada tahap akhir |
| Tool-mediated fusion | Integrasi informasi melalui hasil alat eksternal |
| Visual token | Vektor yang mewakili bagian gambar |
| Audio token | Representasi diskret atau laten dari segmen audio |
| Temporal encoding | Representasi posisi waktu |
| Alignment | Penyelarasan representasi dari modalitas berbeda |
| Grounding | Hubungan klaim dengan bukti sumber |
| Context budget | Alokasi kapasitas konteks untuk seluruh input dan output |
| Token compression | Pengurangan jumlah token sambil mempertahankan informasi penting |
| Modality dropout | Kondisi atau teknik ketika satu modalitas tidak tersedia |
| Multimodal RAG | Retrieval-Augmented Generation dengan sumber beberapa modalitas |
| Cross-modal retrieval | Pencarian item beda modalitas dari kueri tertentu |
| Keyframe | Frame yang mewakili bagian penting video |
| ASR | Automatic Speech Recognition |
| Diarization | Pemisahan segmen audio berdasarkan pembicara |
| Abstention | Keputusan model untuk tidak menjawab ketika bukti tidak cukup |
| Hallucination temporal | Klaim waktu atau urutan yang tidak didukung |
| Schema validation | Pemeriksaan output terhadap struktur yang diwajibkan |
| Golden set | Kumpulan evaluasi terkurasi dan berversi |
| Graceful degradation | Perilaku terbatas tetapi aman ketika komponen gagal |
| Human-in-the-loop | Keterlibatan manusia dalam review atau keputusan |

## 15.3 Ringkasan Cepat

1. MLLM menghubungkan beberapa modalitas melalui encoder, connector, fusion, atau tool.
2. Setiap modalitas memiliki struktur dan sumber error berbeda.
3. Preprocessing menentukan informasi apa yang dipertahankan atau hilang.
4. Early, intermediate, late, dan tool-mediated fusion memiliki trade-off.
5. Posisi spasial, temporal, dan halaman harus dipertahankan.
6. Alignment global tidak menjamin grounding detail.
7. Context budget perlu direncanakan sejak desain awal.
8. Token compression menghemat biaya tetapi dapat menghilangkan informasi.
9. Instruction tuning perlu mencakup negative example dan abstention.
10. Input labeling mencegah sumber tertukar.
11. Dokumen panjang, audio, dan video membutuhkan chunking atau retrieval.
12. Multimodal RAG harus menjaga metadata dan source marker.
13. Tool use memerlukan least privilege dan validasi.
14. Fine-tuning dilakukan setelah pipeline dasar dievaluasi.
15. Evaluasi harus memisahkan preprocessing, perception, reasoning, dan sistem.
16. Cross-modal consistency dan evidence penting untuk reliability.
17. Prompt injection dapat tersembunyi pada semua modalitas.
18. Privacy by design berarti meminimalkan data sejak awal.
19. Deployment memerlukan versioning, monitoring, fallback, dan rollback.
20. Keputusan berisiko tinggi memerlukan human review.

## 15.4 Checklist Sebelum Menggunakan MLLM

- [ ] Masalah benar-benar memerlukan lebih dari satu modalitas.
- [ ] Peran setiap modalitas didefinisikan.
- [ ] Hak akses dan consent diperiksa.
- [ ] Preprocessing diuji per perangkat dan kondisi.
- [ ] Source ID, page, region, dan timestamp dipertahankan.
- [ ] Context budget telah dihitung.
- [ ] Strategi retrieval atau kompresi tersedia.
- [ ] Prompt memisahkan observasi, interpretasi, dan rekomendasi.
- [ ] Output memiliki schema dan validator.
- [ ] Missing modality dan konflik sumber ditangani.
- [ ] Tool menggunakan allowlist dan least privilege.
- [ ] Golden set mencakup kasus normal dan sulit.
- [ ] Evaluasi dilakukan per modalitas dan end-to-end.
- [ ] Bias dan kualitas per slice diperiksa.
- [ ] Data sensitif tidak masuk log tanpa kebutuhan.
- [ ] Fallback dan graceful degradation tersedia.
- [ ] Model, processor, prompt, index, dan policy berversi.
- [ ] Monitoring dan incident response disiapkan.
- [ ] Human review tersedia untuk kasus high-risk atau unknown.

## 15.5 Referensi Belajar

### Fondasi Transformer dan Multimodal

1. Vaswani, A. et al. *Attention Is All You Need*.
2. Dosovitskiy, A. et al. *An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale*.
3. Radford, A. et al. *Learning Transferable Visual Models From Natural Language Supervision*.
4. Jaegle, A. et al. *Perceiver: General Perception with Iterative Attention*.
5. Jaegle, A. et al. *Perceiver IO: A General Architecture for Structured Inputs and Outputs*.

### Vision-Language dan Multimodal LLM

6. Alayrac, J.-B. et al. *Flamingo: a Visual Language Model for Few-Shot Learning*.
7. Li, J. et al. *BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models*.
8. Liu, H. et al. *Visual Instruction Tuning*.
9. Girdhar, R. et al. *ImageBind: One Embedding Space To Bind Them All*.
10. Huang, S. et al. *Language Is Not All You Need: Aligning Perception with Language Models*.

### Audio, Video, dan Dokumen

11. Baevski, A. et al. *wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations*.
12. Radford, A. et al. *Robust Speech Recognition via Large-Scale Weak Supervision*.
13. Arnab, A. et al. *ViViT: A Video Vision Transformer*.
14. Xu, Y. et al. *LayoutLM: Pre-training of Text and Layout for Document Image Understanding*.

### Retrieval, Evaluasi, dan Responsible AI

15. Lewis, P. et al. *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*.
16. Model card dan dataset card dari komponen yang digunakan.
17. Dokumentasi resmi framework, processor, dan model pada versi yang dipakai.
18. Pedoman perlindungan data, keamanan, dan tata kelola organisasi tempat sistem diterapkan.

> **Catatan referensi:** arsitektur dan library berkembang cepat. Untuk implementasi, selalu cocokkan contoh dengan dokumentasi resmi versi model, processor, framework, dan layanan yang benar-benar digunakan.

## Penutup

Multimodal Large Language Model memungkinkan sistem menghubungkan informasi yang sebelumnya terpisah: kalimat, gambar, suara, video, dokumen, dan data terstruktur. Kemampuan tersebut sangat berguna ketika masalah nyata memang tersebar di berbagai sumber.

Namun, semakin banyak modalitas, semakin banyak pula cara sistem dapat salah. Kesalahan dapat berasal dari input, sinkronisasi, preprocessing, retrieval, fusion, reasoning, tool use, atau validasi output. Respons yang lancar tidak membuktikan bahwa seluruh bukti telah dipahami dengan benar.

Engineer yang baik membangun MLLM sebagai sistem terukur: sumber diberi identitas, konteks dibatasi, konflik dilaporkan, output divalidasi, tool dibatasi, risiko dipantau, dan manusia tetap memiliki kendali pada keputusan penting.
