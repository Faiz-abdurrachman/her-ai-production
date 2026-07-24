---
course_id: vision-language-model
title: Vision Language Model
slug: vision-language-model
category: Foundation and Core AI
sub_category: Multimodal AI
level: Intermediate
language: id
status: ready
version: 1.0.0
estimated_duration: 20-24 jam
route: /participant/courses/vision-language-model
updated_at: 2026-07-23
---

# Vision Language Model

> Modul praktis dan mudah dipahami untuk peserta HerAI Fellowship. Materi membahas cara sistem AI menghubungkan gambar dan bahasa, mulai dari representasi visual, image-text alignment, arsitektur dual encoder dan vision-encoder-to-LLM, visual prompting, evaluasi, safety, deployment, hingga mini project asisten analisis gambar.

## Informasi Course

| Komponen | Keterangan |
|---|---|
| Level | Intermediate |
| Estimasi belajar | 20-24 jam |
| Prasyarat | Python dasar, machine learning, deep learning, CNN atau Vision Transformer, serta konsep dasar LLM |
| Bentuk pembelajaran | Materi, analogi, diagram teks, contoh, latihan, checkpoint, kuis, diskusi, dan mini project |
| Hasil akhir | Peserta mampu memahami, merancang, mengevaluasi, dan mendokumentasikan prototipe aplikasi Vision Language Model secara bertanggung jawab |

## Tentang Modul Ini

Vision Language Model atau VLM adalah model yang memproses informasi visual dan bahasa dalam satu sistem. Model dapat menerima gambar beserta teks, lalu melakukan tugas seperti mendeskripsikan gambar, menjawab pertanyaan visual, mencari gambar dengan kalimat, membaca dokumen, atau membantu analisis visual.

Walaupun hasilnya sering terlihat seperti model benar-benar melihat, VLM tetap bekerja dengan representasi numerik. Gambar diubah menjadi token atau fitur visual. Teks diubah menjadi token bahasa. Kedua jenis representasi tersebut kemudian diselaraskan agar model dapat menemukan hubungan antara objek, atribut, posisi, tindakan, dan kata.

> **Prinsip belajar:** pisahkan tiga hal ketika menganalisis VLM: apa yang terlihat pada gambar, bagaimana informasi visual dihubungkan ke bahasa, dan apa yang benar-benar didukung oleh bukti visual.

Modul ini menggunakan contoh yang netral terhadap model dan penyedia tertentu. Nama arsitektur digunakan untuk memahami pola desain, bukan sebagai rekomendasi satu produk.

## Capaian Pembelajaran

Setelah menyelesaikan modul ini, peserta diharapkan mampu:

1. Menjelaskan perbedaan model vision, model bahasa, dan Vision Language Model.
2. Memahami bagaimana gambar diubah menjadi feature map, patch, embedding, dan visual token.
3. Menjelaskan fungsi vision encoder, text encoder, projection layer, cross-attention, dan language decoder.
4. Membedakan dual encoder, fusion encoder, dan vision-encoder-to-LLM.
5. Memahami contrastive learning dan image-text alignment secara intuitif.
6. Memilih pendekatan untuk image retrieval, captioning, visual question answering, OCR, dan document understanding.
7. Menyusun prompt visual yang jelas dan memisahkan observasi dari interpretasi.
8. Menentukan strategi adaptasi seperti linear probing, adapter, LoRA, atau instruction tuning.
9. Menyusun evaluasi berdasarkan kualitas bahasa, grounding visual, hallucination, latency, cost, dan safety.
10. Membuat mini project asisten analisis gambar dengan dokumentasi dan guardrail dasar.

## Prasyarat

Peserta sebaiknya telah memahami:

- variabel, fungsi, list, dictionary, dan file pada Python,
- tensor, neural network, training, loss, dan optimizer,
- convolution atau patch embedding,
- embedding, attention, Transformer, tokenisasi, dan inference pada LLM.

Peserta tidak diwajibkan melatih VLM besar dari awal. Fokus modul adalah memahami komponen, melakukan eksperimen terkontrol, dan membangun sistem aplikasi yang dapat dievaluasi.

## Peta Materi

1. Pengantar Vision Language Model
2. Dari Gambar Menjadi Representasi Numerik
3. Representasi Bahasa dalam Sistem Multimodal
4. Menyelaraskan Gambar dan Teks
5. Pola Arsitektur Vision Language Model
6. Data dan Proses Pembelajaran Multimodal
7. Tugas Utama Vision Language Model
8. Visual Prompting dan Inference
9. Adaptasi dan Fine-Tuning
10. Evaluasi Vision Language Model
11. Hallucination, Bias, Privacy, dan Safety
12. Deployment dan Monitoring
13. Mini Project Asisten Analisis Gambar
14. Kuis Akhir dan Pembahasan
15. Diskusi, Glosarium, Ringkasan, dan Referensi

---

# Bab 1 - Pengantar Vision Language Model

## 1.1 Apa Itu Vision Language Model?

Vision Language Model adalah model AI yang dapat menghubungkan informasi visual dengan bahasa. Input dapat berupa satu gambar, beberapa gambar, teks, atau kombinasi gambar dan teks. Output umumnya berupa teks, skor kemiripan, label, koordinat, atau representasi bersama.

Contoh alur sederhana:

```text
Gambar + pertanyaan
        |
        v
Ekstraksi fitur visual
        |
        v
Penggabungan dengan token teks
        |
        v
Penalaran atau prediksi
        |
        v
Jawaban, deskripsi, skor, atau lokasi objek
```

Contoh penggunaan:

- mendeskripsikan isi foto,
- menjawab pertanyaan berdasarkan diagram,
- mencari gambar dengan kueri bahasa alami,
- mengekstrak informasi dari struk atau formulir,
- membuat alt text awal untuk aksesibilitas,
- membantu pemeriksaan visual dengan verifikasi manusia.

## 1.2 Perbedaan Model Vision, LLM, dan VLM

| Aspek | Model Vision | LLM | VLM |
|---|---|---|---|
| Input utama | Gambar atau video | Teks | Gambar dan teks |
| Output umum | Label, bounding box, mask | Teks atau token | Teks, skor lintas modalitas, atau grounding |
| Contoh tugas | Klasifikasi, deteksi, segmentasi | Ringkasan, tanya jawab, generasi teks | Captioning, VQA, image retrieval, document QA |
| Representasi | Fitur visual | Token bahasa | Visual token dan token bahasa |
| Risiko khas | Salah deteksi | Hallucination teks | Salah melihat sekaligus salah menjelaskan |

VLM tidak menggantikan seluruh model vision. Untuk tugas sempit seperti menghitung cacat produk pada jalur produksi, model deteksi khusus dapat lebih cepat dan mudah divalidasi. VLM berguna ketika tugas memerlukan hubungan antara visual dan bahasa yang bervariasi.

## 1.3 Apa Arti "Memahami" Gambar?

Dalam konteks engineering, kata memahami sebaiknya dipecah menjadi kemampuan yang dapat diuji:

- mengenali objek atau atribut,
- memahami hubungan spasial,
- membaca teks pada gambar,
- menghubungkan gambar dengan instruksi,
- menjelaskan bukti yang terlihat,
- menolak kesimpulan ketika bukti tidak cukup.

Model mungkin mampu menyebut objek utama tetapi gagal menghitung jumlah objek kecil. Model mungkin membaca judul dokumen tetapi keliru menyalin angka. Karena itu, kemampuan VLM tidak boleh dinilai hanya dari satu contoh yang terlihat meyakinkan.

## 1.4 Komponen Sistem VLM

Sistem VLM biasanya memiliki beberapa lapisan:

```text
Input gambar
  -> preprocessing
  -> vision encoder
  -> projector / connector
  -> model bahasa atau fusion module
  -> decoding
  -> post-processing dan validasi
```

Di luar model terdapat komponen aplikasi:

- penyimpanan dan kontrol akses gambar,
- preprocessing dan kompresi,
- prompt template,
- schema output,
- validasi hasil,
- logging dan monitoring,
- human review untuk kasus berisiko.

> **Catatan penting:** kualitas aplikasi tidak hanya bergantung pada model. Kesalahan resize, rotasi, izin akses, atau validasi output dapat membuat sistem gagal walaupun model dasarnya kuat.

## Checkpoint Bab 1

1. Apa perbedaan utama antara VLM dan model vision biasa?
2. Mengapa kata memahami perlu dipecah menjadi kemampuan yang terukur?
3. Sebutkan dua komponen di luar model yang memengaruhi kualitas aplikasi VLM.

## Latihan Bab 1 - Memilih Pendekatan

Pilih satu kasus: pemeriksaan dokumen, katalog produk, pembelajaran dari diagram, atau inspeksi fasilitas. Tuliskan:

1. input yang tersedia,
2. output yang dibutuhkan,
3. bagian yang cocok memakai VLM,
4. bagian yang lebih tepat memakai model khusus atau aturan biasa,
5. keputusan yang harus ditinjau manusia.

---

# Bab 2 - Dari Gambar Menjadi Representasi Numerik

## 2.1 Gambar sebagai Tensor

Gambar digital dapat direpresentasikan sebagai tensor dengan tinggi, lebar, dan channel warna.

```text
Gambar RGB berukuran 224 x 224
-> tensor dengan bentuk [224, 224, 3]
```

Nilai piksel umumnya berada pada rentang 0 sampai 255, kemudian dinormalisasi ke rentang tertentu. Model tidak melihat apel, meja, atau tulisan secara langsung. Model menerima pola angka yang kemudian diubah menjadi fitur.

## 2.2 Preprocessing Visual

Preprocessing harus konsisten dengan kebutuhan model. Langkah umum meliputi:

- memperbaiki orientasi,
- mengubah ukuran,
- crop atau padding,
- konversi warna,
- normalisasi,
- mengubah ke tensor,
- menyusun batch.

Dua strategi resize yang sering dipakai:

| Strategi | Dampak |
|---|---|
| Resize langsung | Sederhana, tetapi rasio objek dapat berubah |
| Pertahankan aspect ratio + padding/crop | Bentuk lebih stabil, tetapi area tertentu dapat terpotong atau bertambah |

Untuk dokumen, teks kecil dapat hilang ketika gambar dikecilkan terlalu agresif. Untuk foto, crop dapat menghilangkan objek penting di tepi gambar.

## 2.3 CNN sebagai Vision Encoder

Convolutional Neural Network mengekstrak pola lokal menggunakan filter. Lapisan awal sering menangkap tepi dan tekstur. Lapisan lebih dalam membentuk fitur yang lebih abstrak.

```text
Piksel
  -> tepi dan warna
  -> tekstur dan pola
  -> bagian objek
  -> representasi objek atau adegan
```

CNN menghasilkan feature map. Untuk menghubungkannya dengan bahasa, feature map dapat diringkas, diproyeksikan, atau diubah menjadi urutan visual token.

## 2.4 Vision Transformer dan Patch

Vision Transformer membagi gambar menjadi patch. Setiap patch diubah menjadi vektor, lalu diperlakukan seperti token dalam Transformer.

Misalnya gambar 224 x 224 dengan patch 16 x 16:

```text
jumlah patch = (224 / 16) x (224 / 16)
             = 14 x 14
             = 196 patch
```

Setelah ditambah token khusus atau informasi posisi, urutan tersebut diproses oleh self-attention.

```text
Gambar
  -> patch
  -> flatten
  -> linear projection
  -> positional embedding
  -> Transformer encoder
  -> visual embeddings
```

## 2.5 Mengapa Posisi Penting?

Tanpa informasi posisi, model hanya memiliki sekumpulan patch. Padahal hubungan seperti di atas, di kiri, dekat, atau di dalam sangat penting.

Positional embedding membantu model membedakan patch dari lokasi berbeda. Namun, posisi yang dipelajari pada resolusi tertentu dapat memerlukan penyesuaian ketika resolusi inference berubah.

## 2.6 Resolusi dan Jumlah Visual Token

Resolusi lebih tinggi dapat mempertahankan detail, tetapi menambah jumlah patch dan biaya komputasi.

Contoh sederhana:

| Ukuran gambar | Patch 16 x 16 | Jumlah patch |
|---|---:|---:|
| 224 x 224 | 16 | 196 |
| 336 x 336 | 16 | 441 |
| 448 x 448 | 16 | 784 |

Jumlah visual token yang lebih besar dapat meningkatkan latency dan penggunaan memori. Karena itu, sistem perlu memilih resolusi sesuai tugas, bukan selalu memakai ukuran terbesar.

## 2.7 Contoh Preprocessing dengan Python

```python
from PIL import Image
import numpy as np


def prepare_image(path: str, size: tuple[int, int] = (224, 224)) -> np.ndarray:
    image = Image.open(path).convert("RGB")
    image = image.resize(size)

    pixels = np.asarray(image, dtype=np.float32) / 255.0

    # Bentuk awal: [height, width, channel]
    # Banyak framework mengharapkan: [channel, height, width]
    tensor = np.transpose(pixels, (2, 0, 1))
    return tensor


image_tensor = prepare_image("contoh.jpg")
print(image_tensor.shape)
```

Kode tersebut hanya ilustrasi. Model produksi biasanya memiliki image processor khusus dengan mean, standard deviation, interpolation, crop, dan ukuran yang telah ditentukan.

## Checkpoint Bab 2

1. Mengapa gambar harus diproses sebelum masuk ke model?
2. Apa hubungan patch dengan visual token?
3. Mengapa resolusi tinggi tidak selalu menjadi pilihan terbaik?

## Latihan Bab 2 - Audit Preprocessing

Ambil satu gambar foto dan satu gambar dokumen. Buat tiga versi: resize langsung, center crop, dan padding. Bandingkan:

- bagian apa yang hilang,
- apakah teks masih terbaca,
- apakah bentuk objek berubah,
- strategi mana yang paling sesuai untuk masing-masing jenis gambar.

---

# Bab 3 - Representasi Bahasa dalam Sistem Multimodal

## 3.1 Tokenisasi Teks

Sama seperti LLM, sisi bahasa pada VLM menerima token ID. Tokenizer memecah instruksi, pertanyaan, label, atau caption menjadi unit yang dapat diproses model.

```text
"Apa warna kendaraan itu?"
          |
          v
["Apa", " warna", " kendaraan", " itu", "?"]
          |
          v
[token_id_1, token_id_2, ...]
```

Tokenisasi memengaruhi panjang konteks, biaya, dan cara istilah khusus direpresentasikan.

## 3.2 Text Embedding

Token ID digunakan untuk mengambil embedding. Embedding adalah vektor yang dipelajari. Positional information ditambahkan agar urutan kata dapat dibedakan.

```text
Token ID + posisi
       |
       v
Text embeddings
       |
       v
Transformer
```

Pada dual encoder, text encoder menghasilkan satu representasi untuk keseluruhan kalimat. Pada model generatif, token teks diproses sebagai urutan yang digunakan untuk menghasilkan token output.

## 3.3 Prompt sebagai Bagian dari Input Model

Prompt bukan hanya pertanyaan. Prompt dapat memuat:

- peran atau tujuan,
- konteks gambar,
- batasan tugas,
- definisi label,
- urutan langkah,
- format keluaran,
- aturan ketika bukti tidak cukup.

Contoh prompt lemah:

```text
Jelaskan gambar ini.
```

Contoh prompt lebih terstruktur:

```text
Amati gambar ini.
1. Sebutkan objek utama yang terlihat.
2. Jelaskan hubungan spasial yang dapat dibuktikan.
3. Salin teks hanya jika terbaca jelas.
4. Jangan menebak identitas, lokasi, atau penyebab.
5. Kembalikan hasil dalam JSON sesuai schema.
```

## 3.4 Special Token untuk Gambar

Beberapa arsitektur menggunakan token khusus untuk menunjukkan posisi gambar dalam urutan percakapan.

```text
<image>
Pengguna: Berapa jumlah kursi yang terlihat?
Asisten:
```

Token gambar dapat mewakili satu embedding ringkasan atau menjadi penanda untuk rangkaian visual token. Implementasi bergantung pada arsitektur model.

## 3.5 Context Window Multimodal

Visual token dan token teks sama-sama menggunakan kapasitas konteks. Semakin banyak gambar atau semakin tinggi resolusi, semakin besar bagian konteks yang terpakai.

Dampaknya:

- prompt panjang dapat terpotong,
- beberapa gambar membutuhkan memori lebih besar,
- output maksimum dapat berkurang,
- latency meningkat.

Karena itu, aplikasi harus mengatur jumlah gambar, ukuran, urutan, dan panjang instruksi.

## 3.6 Observasi dan Interpretasi

VLM sering diminta membuat kesimpulan. Prompt sebaiknya memisahkan:

| Jenis keluaran | Contoh |
|---|---|
| Observasi | "Terlihat tiga kotak di atas meja" |
| Interpretasi | "Kotak tersebut tampaknya paket pengiriman" |
| Kesimpulan berisiko | "Paket itu terlambat dikirim" |

Observasi dapat didukung langsung oleh piksel. Interpretasi membutuhkan asumsi. Kesimpulan penyebab biasanya membutuhkan data lain.

> **Aturan praktis:** minta model menandai mana fakta visual, mana interpretasi, dan mana informasi yang tidak dapat ditentukan.

## Checkpoint Bab 3

1. Apa fungsi tokenizer pada VLM?
2. Mengapa visual token dapat mengurangi ruang untuk teks?
3. Apa perbedaan observasi dengan interpretasi?

## Latihan Bab 3 - Merancang Prompt

Buat dua prompt untuk gambar rak produk:

- prompt pertama untuk inventaris objek,
- prompt kedua untuk memeriksa kepatuhan tata letak.

Sertakan format keluaran dan aturan ketika objek tidak terlihat jelas.

---

# Bab 4 - Menyelaraskan Gambar dan Teks

## 4.1 Masalah Image-Text Alignment

Agar model dapat menghubungkan gambar dengan bahasa, representasi visual dan teks harus berada dalam ruang yang dapat dibandingkan atau digabungkan.

Contoh pasangan:

```text
Gambar: seekor kucing tidur di sofa
Teks:   "kucing sedang tidur di atas sofa"
```

Model perlu belajar bahwa pasangan tersebut lebih cocok dibandingkan teks seperti "pesawat sedang lepas landas".

## 4.2 Contrastive Learning

Contrastive learning mendorong pasangan yang cocok agar memiliki embedding yang dekat dan pasangan yang tidak cocok agar lebih jauh.

Dalam satu batch terdapat beberapa gambar dan caption:

```text
Gambar 1 <-> Teks 1  pasangan positif
Gambar 1 <-> Teks 2  pasangan negatif
Gambar 1 <-> Teks 3  pasangan negatif
```

Secara intuitif:

```text
similarity(gambar_i, teks_i)      -> dinaikkan
similarity(gambar_i, teks_j != i) -> diturunkan
```

Similarity sering dihitung menggunakan cosine similarity.

```python
import numpy as np


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    a = a / (np.linalg.norm(a) + 1e-8)
    b = b / (np.linalg.norm(b) + 1e-8)
    return float(np.dot(a, b))
```

## 4.3 Dual Encoder

Dual encoder memakai dua encoder terpisah:

```text
Gambar -> vision encoder -> image embedding
Teks   -> text encoder   -> text embedding
                         -> similarity score
```

Kelebihan:

- image embedding dapat dihitung dan disimpan lebih dulu,
- cocok untuk pencarian skala besar,
- inference similarity relatif efisien.

Keterbatasan:

- interaksi detail antara token visual dan token teks lebih terbatas,
- kurang ideal untuk penalaran generatif kompleks tanpa komponen tambahan.

## 4.4 Zero-Shot Classification

Dual encoder dapat melakukan klasifikasi tanpa head khusus dengan membandingkan gambar terhadap beberapa label berbentuk teks.

```text
Gambar
  -> embedding gambar

"foto kucing" -> embedding teks
"foto anjing" -> embedding teks
"foto burung" -> embedding teks

Pilih teks dengan similarity tertinggi.
```

Kualitas sangat dipengaruhi template label. Label `kucing` dapat memberikan hasil berbeda dari `sebuah foto kucing domestik`.

## 4.5 Projection Layer

Vision encoder dan language model dapat memiliki dimensi embedding berbeda. Projection layer mengubah visual embedding ke dimensi yang dapat diterima model bahasa.

```text
Visual features: [jumlah_patch, dim_vision]
        |
        v
Projection / connector
        |
        v
Visual tokens: [jumlah_token, dim_language]
```

Projection dapat berupa linear layer, multilayer perceptron, resampler, atau modul query yang lebih kompleks.

## 4.6 Cross-Attention

Cross-attention memungkinkan satu modalitas mengambil informasi dari modalitas lain.

Contoh:

- query berasal dari token teks,
- key dan value berasal dari fitur gambar.

Ketika menjawab "warna payung", token teks dapat memberi bobot lebih besar pada region visual yang berkaitan dengan payung.

## 4.7 Alignment Tidak Menjamin Grounding

Model dapat memiliki embedding gambar-teks yang baik untuk retrieval tetapi masih membuat detail palsu ketika menghasilkan caption. Alignment tingkat gambar tidak selalu menjamin setiap kata terhubung ke region yang tepat.

Karena itu, evaluasi perlu memeriksa:

- kecocokan global,
- detail objek,
- atribut,
- jumlah,
- hubungan spasial,
- teks yang terbaca,
- bukti visual untuk setiap klaim.

## Checkpoint Bab 4

1. Apa tujuan contrastive learning?
2. Mengapa dual encoder cocok untuk retrieval?
3. Apa fungsi projection layer?
4. Mengapa alignment global belum cukup untuk menjamin grounding detail?

## Latihan Bab 4 - Simulasi Similarity

Buat lima deskripsi untuk satu gambar. Beri skor manual 0 sampai 5 berdasarkan kecocokan. Jelaskan aspek apa yang membuat deskripsi cocok atau tidak cocok: objek, atribut, jumlah, posisi, atau konteks.

---

# Bab 5 - Pola Arsitektur Vision Language Model

## 5.1 Mengapa Ada Banyak Arsitektur?

Tugas image retrieval membutuhkan arsitektur berbeda dari sistem yang harus menghasilkan jawaban panjang. Beberapa pola mengutamakan efisiensi embedding, sementara pola lain mengutamakan interaksi detail dan kemampuan generatif.

Tiga pola umum:

1. dual encoder,
2. fusion encoder atau cross-modal encoder,
3. vision encoder yang dihubungkan ke language decoder.

## 5.2 Dual Encoder

Dual encoder menghasilkan embedding terpisah dan membandingkannya.

```text
Image encoder ----- image vector --\
                                  similarity
Text encoder  ----- text vector  --/
```

Cocok untuk:

- text-to-image retrieval,
- image-to-text retrieval,
- zero-shot classification,
- deduplication atau clustering berbasis makna.

## 5.3 Fusion Encoder

Fusion encoder menggabungkan token visual dan token teks lebih awal atau di tengah jaringan.

```text
visual tokens + text tokens
            |
            v
cross-modal Transformer
            |
            v
classification / matching / answer head
```

Kelebihan:

- interaksi lintas modalitas lebih kaya,
- cocok untuk matching detail atau pertanyaan visual.

Keterbatasan:

- pasangan gambar-teks harus diproses bersama,
- kurang efisien untuk retrieval pada jutaan gambar.

## 5.4 Vision Encoder ke Language Model

Pola generatif modern sering menghubungkan vision encoder dengan language model.

```text
Gambar
  -> vision encoder
  -> visual features
  -> connector
  -> visual tokens
  -> language model
  -> jawaban teks
```

Beberapa komponen dapat dibekukan pada tahap awal agar training lebih stabil dan murah. Connector dilatih agar output vision encoder dapat dipahami oleh language model.

## 5.5 Query-Based Connector

Jumlah patch dapat sangat besar. Query-based connector menggunakan sejumlah query yang dipelajari untuk mengambil informasi penting dari fitur gambar.

```text
ratusan patch features
        |
learned queries + cross-attention
        |
sejumlah kecil visual tokens
```

Pendekatan ini mengurangi panjang urutan, tetapi ringkasan yang terlalu agresif dapat kehilangan detail kecil.

## 5.6 Early Fusion dan Late Fusion

| Pendekatan | Penjelasan | Kelebihan | Keterbatasan |
|---|---|---|---|
| Early fusion | Modalitas digabung sejak awal | Interaksi detail | Biaya tinggi dan desain kompleks |
| Middle fusion | Modalitas diproses terpisah lalu digabung | Kompromi fleksibel | Memerlukan connector yang baik |
| Late fusion | Prediksi tiap modalitas digabung di akhir | Sederhana dan modular | Interaksi lintas modalitas terbatas |

## 5.7 Model Generatif dan Model Embedding

Model embedding menghasilkan vektor. Model generatif menghasilkan urutan token.

Gunakan model embedding ketika:

- perlu mencari gambar yang relevan,
- perlu indeks yang dapat dipakai berulang,
- output utama adalah ranking.

Gunakan model generatif ketika:

- perlu jawaban bahasa alami,
- perlu deskripsi atau ekstraksi terstruktur,
- pertanyaan berubah-ubah dan membutuhkan konteks.

Sistem dapat menggabungkan keduanya: dual encoder memilih gambar atau region relevan, lalu model generatif membuat jawaban.

## 5.8 Memilih Arsitektur Berdasarkan Tugas

| Tugas | Pola yang lazim |
|---|---|
| Pencarian gambar dari teks | Dual encoder |
| Klasifikasi zero-shot | Dual encoder |
| Image-text matching detail | Fusion encoder |
| Captioning | Vision encoder + language decoder |
| Visual question answering | Fusion atau vision encoder + LLM |
| Document QA | Encoder visual/OCR + language model |
| Grounded generation | VLM dengan region/coordinate support |

## Checkpoint Bab 5

1. Mengapa dual encoder efisien untuk retrieval?
2. Apa perbedaan fusion encoder dan vision-encoder-to-LLM?
3. Kapan query-based connector dapat merugikan kualitas?

## Latihan Bab 5 - Desain Sistem

Rancang sistem pencarian produk dengan input kalimat pengguna dan katalog gambar. Tentukan:

- model untuk indexing,
- data yang disimpan,
- cara menghitung ranking,
- kapan model generatif digunakan,
- metrik evaluasi dan risiko.

---

# Bab 6 - Data dan Proses Pembelajaran Multimodal

## 6.1 Jenis Data

VLM dapat belajar dari beberapa bentuk data:

- pasangan gambar-caption,
- gambar-label,
- gambar-pertanyaan-jawaban,
- gambar dengan bounding box atau mask,
- dokumen dengan teks dan layout,
- percakapan multimodal,
- data sintetik yang kemudian disaring.

Kualitas pasangan lebih penting daripada jumlah mentah. Caption yang terlalu umum tidak mengajarkan detail. Caption yang salah dapat menguatkan hubungan yang keliru.

## 6.2 Sumber Noise

Noise umum pada dataset multimodal:

- caption tidak sesuai gambar,
- duplikasi gambar,
- watermark atau template berulang,
- teks alternatif yang hanya berisi nama file,
- label dibuat dari metadata yang salah,
- gambar rusak atau sangat kecil,
- konten sensitif tanpa izin,
- bahasa dan domain tidak seimbang.

## 6.3 Data Leakage

Data leakage terjadi ketika contoh evaluasi atau turunannya masuk ke data training. Model dapat terlihat sangat baik karena pernah melihat konten yang sama.

Pencegahan:

- deduplikasi berdasarkan hash dan similarity,
- pisahkan sumber data menurut waktu atau entitas,
- periksa near-duplicate,
- hindari membuat train-test split setelah augmentasi,
- dokumentasikan sumber dan versi dataset.

## 6.4 Tahap Pembelajaran

Pipeline dapat terdiri dari beberapa tahap:

```text
1. Pretraining vision encoder atau memakai encoder siap pakai
2. Image-text alignment
3. Melatih connector ke language model
4. Multimodal instruction tuning
5. Preference atau safety tuning
6. Evaluasi domain dan deployment
```

Tidak semua project membutuhkan seluruh tahap. Untuk aplikasi internal dengan data terbatas, adapter atau prompt terstruktur sering lebih realistis daripada pretraining.

## 6.5 Data Augmentation

Augmentasi visual dapat meningkatkan generalisasi, tetapi harus mempertahankan label.

| Augmentasi | Risiko |
|---|---|
| Horizontal flip | Teks menjadi terbalik atau arah berubah |
| Random crop | Objek atau label penting hilang |
| Color jitter | Warna label tidak lagi valid |
| Rotation | Layout dokumen berubah |
| Blur | Teks kecil tidak terbaca |

Untuk tugas membaca warna, color jitter berlebihan merusak target. Untuk OCR, flip horizontal hampir selalu tidak sesuai.

## 6.6 Caption dan Instruksi yang Baik

Caption berkualitas sebaiknya:

- menjelaskan objek penting,
- menyebut atribut yang terlihat,
- menghindari informasi yang tidak tampak,
- menggunakan bahasa yang jelas,
- tidak menambahkan identitas sensitif,
- memiliki tingkat detail yang sesuai tujuan.

Instruksi training sebaiknya mencerminkan bentuk penggunaan sebenarnya. Bila aplikasi membutuhkan JSON, sebagian data training dan evaluasi perlu menguji format tersebut.

## 6.7 Dataset Card

Dataset card membantu tim memahami batasan data. Minimal memuat:

- tujuan dan ruang lingkup,
- sumber data dan lisensi,
- cara pengumpulan,
- bahasa dan domain,
- distribusi label,
- proses filtering,
- potensi bias,
- data sensitif,
- split training, validation, dan test,
- larangan penggunaan.

## 6.8 Contoh Validasi Data

```python
from pathlib import Path
from PIL import Image


def validate_image(path: Path, min_size: int = 128) -> list[str]:
    issues: list[str] = []
    try:
        with Image.open(path) as image:
            width, height = image.size
            if width < min_size or height < min_size:
                issues.append("resolusi terlalu kecil")
            if image.mode not in {"RGB", "RGBA", "L"}:
                issues.append(f"mode tidak umum: {image.mode}")
    except Exception as exc:
        issues.append(f"gagal dibuka: {exc}")
    return issues
```

Validasi teknis belum memeriksa kecocokan caption, privasi, atau bias. Pemeriksaan kualitas memerlukan sampling dan review manusia.

## Checkpoint Bab 6

1. Mengapa pasangan gambar-caption dapat mengandung noise?
2. Berikan contoh augmentasi yang merusak label.
3. Apa fungsi dataset card?

## Latihan Bab 6 - Data Audit

Buat checklist audit untuk 100 pasangan gambar-caption. Sertakan aspek teknis, kesesuaian isi, privasi, duplikasi, variasi domain, dan bahasa.

---

# Bab 7 - Tugas Utama Vision Language Model

## 7.1 Image-Text Retrieval

Text-to-image retrieval mencari gambar paling relevan untuk kueri teks. Image-to-text retrieval mencari caption atau dokumen yang cocok untuk gambar.

Pipeline:

```text
Offline:
semua gambar -> image encoder -> embeddings -> vector index

Online:
kueri teks -> text encoder -> query embedding
          -> similarity search -> top-k images
```

Metrik umum meliputi Recall@K, Mean Reciprocal Rank, dan kualitas manual pada kueri sulit.

## 7.2 Image Captioning

Captioning menghasilkan deskripsi gambar. Caption yang baik perlu benar, relevan, cukup lengkap, dan tidak menambah detail palsu.

Tingkat detail dapat berbeda:

- caption singkat untuk galeri,
- alt text untuk aksesibilitas,
- deskripsi objek untuk anotasi,
- laporan visual untuk workflow internal.

Satu prompt tidak cocok untuk semua tujuan.

## 7.3 Visual Question Answering

Visual Question Answering atau VQA menjawab pertanyaan berdasarkan gambar.

Contoh:

```text
Pertanyaan: "Berapa cangkir yang berada di atas meja?"
Jawaban: "Dua."
```

Kesulitan VQA:

- objek kecil,
- occlusion,
- counting,
- hubungan spasial,
- pertanyaan ambigu,
- jawaban memerlukan pengetahuan di luar gambar.

Sistem harus membedakan pertanyaan yang dapat dijawab dari piksel dan pertanyaan yang memerlukan data eksternal.

## 7.4 OCR dan Document Understanding

OCR mengubah gambar teks menjadi karakter. Document understanding menambahkan pemahaman layout, field, tabel, dan hubungan antarbagian.

```text
Dokumen gambar
  -> deteksi orientasi
  -> OCR / visual encoder
  -> layout atau region understanding
  -> ekstraksi field
  -> validasi schema
```

Untuk angka penting seperti total pembayaran, hasil perlu divalidasi dengan aturan, misalnya jumlah subtotal, pajak, dan total.

## 7.5 Chart dan Diagram Understanding

Model dapat diminta membaca grafik, tetapi rentan terhadap:

- sumbu yang tidak terlihat,
- warna mirip,
- legenda kecil,
- nilai estimasi yang dianggap pasti,
- grafik tiga dimensi yang menipu,
- hubungan sebab-akibat yang tidak didukung.

Prompt sebaiknya meminta model menyebutkan nilai yang dibaca, tingkat ketidakpastian, dan batas interpretasi.

## 7.6 Grounding dan Region

Grounding menghubungkan kata atau jawaban dengan region pada gambar. Output dapat berupa bounding box, titik, mask, atau referensi region.

```text
"tas merah" -> [x_min, y_min, x_max, y_max]
```

Koordinat perlu didefinisikan dengan jelas:

- piksel absolut atau nilai 0-1,
- urutan sumbu,
- ukuran gambar setelah preprocessing,
- apakah box inklusif atau eksklusif.

## 7.7 Visual Reasoning

Visual reasoning menggabungkan beberapa bukti, misalnya:

- membandingkan dua objek,
- menentukan urutan langkah dari diagram,
- mengikuti jalur pada peta sederhana,
- menemukan perbedaan antara dua gambar,
- menjawab berdasarkan beberapa panel.

Model dapat memberi alasan yang terdengar baik tetapi tidak sesuai gambar. Karena itu, evaluasi reasoning harus memeriksa jawaban dan bukti visual secara terpisah.

## 7.8 Multi-Image Understanding

Beberapa aplikasi membutuhkan perbandingan beberapa gambar:

- sebelum dan sesudah,
- halaman dokumen berurutan,
- beberapa sudut produk,
- rangkaian frame.

Tantangan:

- model dapat mencampur objek antar gambar,
- urutan gambar dapat berubah,
- detail kecil hilang,
- context window cepat terpakai.

Gunakan label eksplisit seperti `Gambar A`, `Gambar B`, dan minta output menyebut sumber setiap temuan.

## Checkpoint Bab 7

1. Apa perbedaan captioning dan VQA?
2. Mengapa document understanding tidak sama dengan OCR?
3. Apa yang harus didefinisikan ketika model mengeluarkan koordinat?

## Latihan Bab 7 - Task Decomposition

Pilih aplikasi pembacaan struk. Pecah menjadi tugas kecil: orientasi, OCR, deteksi field, normalisasi nilai, validasi total, dan review. Tentukan bagian yang memakai VLM dan bagian yang memakai kode deterministik.

---

# Bab 8 - Visual Prompting dan Inference

## 8.1 Struktur Prompt Visual

Prompt yang baik menjelaskan tujuan dan batas bukti.

Template dasar:

```text
Tujuan:
[apa yang harus dilakukan]

Objek perhatian:
[bagian gambar yang relevan]

Aturan:
- hanya gunakan informasi yang terlihat,
- tulis "tidak dapat ditentukan" bila bukti tidak cukup,
- jangan menebak identitas atau penyebab,
- pisahkan observasi dan interpretasi.

Format keluaran:
[schema atau contoh]
```

## 8.2 Prompt untuk Ekstraksi Terstruktur

```text
Ekstrak informasi dari gambar struk ini.
Kembalikan JSON dengan field:
- merchant_name: string | null
- transaction_date: string | null
- items: array
- subtotal: number | null
- tax: number | null
- total: number | null
- uncertain_fields: array

Jangan mengisi nilai yang tidak terbaca. Gunakan null.
```

JSON harus divalidasi setelah generation. Model dapat menghasilkan tipe data salah atau format tidak valid.

## 8.3 Few-Shot Multimodal Prompting

Beberapa sistem mendukung contoh gambar dan jawaban. Contoh membantu menjelaskan format dan label.

Risiko:

- contoh terlalu sedikit,
- contoh tidak mewakili kondisi nyata,
- model meniru kesalahan contoh,
- contoh menggunakan data sensitif.

Gunakan contoh yang telah dianonimkan dan mencakup kasus normal serta kasus ambigu.

## 8.4 Region-of-Interest

Jika gambar besar memiliki banyak detail, crop region yang relevan dapat meningkatkan fokus.

```text
Gambar penuh -> deteksi/crop area -> VLM pada region -> gabungkan hasil
```

Namun crop kehilangan konteks. Strategi yang lebih aman:

1. analisis gambar penuh,
2. identifikasi region kandidat,
3. analisis crop beresolusi tinggi,
4. cocokkan hasil dengan gambar penuh.

## 8.5 Multi-Pass Inference

Satu kali generation tidak selalu cukup. Pipeline dapat memakai beberapa tahap:

```text
Pass 1: inventaris objek dan teks
Pass 2: jawab pertanyaan menggunakan inventaris
Pass 3: verifikasi klaim terhadap gambar
Pass 4: format hasil dan tandai ketidakpastian
```

Multi-pass menambah latency dan biaya. Gunakan ketika peningkatan reliability sepadan dengan kebutuhan aplikasi.

## 8.6 Parameter Decoding

Untuk ekstraksi, gunakan decoding yang lebih stabil. Untuk caption kreatif, variasi dapat lebih tinggi.

| Kebutuhan | Arah pengaturan |
|---|---|
| Ekstraksi field | Temperature rendah, schema ketat |
| Jawaban faktual visual | Variasi rendah, instruksi bukti |
| Caption kreatif | Variasi lebih tinggi dengan review |
| Klasifikasi | Batasi pilihan label |

Nama dan rentang parameter berbeda antar platform. Prinsipnya adalah mengontrol variasi sesuai risiko.

## 8.7 Validasi Output

Validasi dapat meliputi:

- parsing JSON,
- pengecekan enum,
- tipe dan rentang angka,
- konsistensi jumlah,
- panjang jawaban,
- larangan field sensitif,
- confidence atau uncertain flag,
- verifikasi ulang dengan model atau rule lain.

Contoh validasi sederhana:

```python
from dataclasses import dataclass


@dataclass
class VisualCountResult:
    label: str
    count: int
    uncertain: bool


def validate_count(result: VisualCountResult) -> None:
    if result.count < 0:
        raise ValueError("count tidak boleh negatif")
    if not result.label.strip():
        raise ValueError("label wajib diisi")
```

## 8.8 Menangani Ketidakpastian

Jangan memaksa model selalu menjawab. Sediakan keluaran seperti:

- tidak terlihat,
- tertutup sebagian,
- resolusi terlalu rendah,
- teks tidak terbaca,
- pertanyaan membutuhkan data di luar gambar,
- terdapat beberapa interpretasi.

> **Prinsip operasional:** abstention yang benar lebih berguna daripada jawaban meyakinkan yang salah.

## Checkpoint Bab 8

1. Apa unsur utama prompt visual yang baik?
2. Mengapa crop dapat membantu sekaligus merugikan?
3. Kapan multi-pass inference layak digunakan?
4. Mengapa JSON dari model tetap perlu divalidasi?

## Latihan Bab 8 - Prompt Benchmark

Buat tiga versi prompt untuk tugas menghitung objek kecil. Uji pada set gambar yang sama. Catat akurasi, jawaban kosong, hallucination, latency, dan panjang output.

---

# Bab 9 - Adaptasi dan Fine-Tuning

## 9.1 Apakah Fine-Tuning Selalu Diperlukan?

Sebelum fine-tuning, periksa apakah masalah dapat diselesaikan melalui:

- preprocessing lebih baik,
- prompt yang lebih jelas,
- crop region,
- retrieval contoh atau metadata,
- output schema,
- post-processing,
- model yang lebih sesuai tugas.

Fine-tuning berguna ketika model perlu mempelajari domain, format, label, atau perilaku yang konsisten dan tidak cukup dicapai melalui prompt.

## 9.2 Linear Probing

Vision encoder dibekukan, lalu classifier kecil dilatih di atas embedding.

```text
Gambar -> frozen encoder -> embedding -> trainable classifier
```

Kelebihan:

- murah,
- cepat,
- cocok untuk baseline klasifikasi.

Keterbatasan:

- representasi encoder tidak berubah,
- kurang cocok bila domain sangat berbeda.

## 9.3 Full Fine-Tuning

Semua atau sebagian besar parameter diperbarui. Pendekatan ini dapat memberi fleksibilitas tinggi tetapi membutuhkan data, komputasi, dan kontrol eksperimen yang lebih besar.

Risiko:

- overfitting,
- catastrophic forgetting,
- instabilitas training,
- biaya tinggi,
- penurunan kemampuan umum.

## 9.4 Adapter dan LoRA

Parameter-efficient fine-tuning menambahkan atau melatih sebagian kecil parameter.

Kelebihan:

- lebih hemat memori,
- checkpoint lebih kecil,
- beberapa adapter dapat dipakai untuk domain berbeda,
- model dasar dapat tetap dibekukan.

Pemilihan target module perlu diuji. Mengadaptasi projector saja berbeda dampaknya dengan mengadaptasi attention pada language model atau vision encoder.

## 9.5 Melatih Connector

Ketika vision encoder dan language model sudah tersedia, connector dapat dilatih menggunakan pasangan gambar-teks.

Tahap umum:

1. bekukan vision encoder dan language model,
2. latih connector untuk menyelaraskan visual feature,
3. lakukan instruction tuning pada data multimodal,
4. buka sebagian parameter bila diperlukan,
5. evaluasi kemampuan umum dan domain.

## 9.6 Multimodal Instruction Tuning

Data berisi gambar, instruksi, dan jawaban yang diharapkan.

Contoh:

```json
{
  "image": "produk_001.jpg",
  "instruction": "Sebutkan warna utama produk dan kondisi kemasannya.",
  "answer": {
    "warna": "biru",
    "kondisi_kemasan": "penyok ringan",
    "ketidakpastian": false
  }
}
```

Jawaban training harus berdasarkan gambar. Instruksi yang menyuruh menebak akan mengajarkan perilaku yang tidak aman.

## 9.7 Menyusun Training Set

Training set perlu mencakup:

- contoh mudah dan sulit,
- variasi pencahayaan dan sudut,
- objek tertutup sebagian,
- gambar berkualitas rendah,
- negative examples,
- pertanyaan yang tidak dapat dijawab,
- format keluaran yang benar,
- variasi bahasa pengguna.

## 9.8 Split yang Aman

Untuk dataset produk, jangan membagi gambar acak bila produk yang sama memiliki banyak foto. Foto produk yang sama dapat masuk train dan test sehingga skor terlalu optimistis.

Pilihan split:

- berdasarkan product ID,
- berdasarkan lokasi,
- berdasarkan pengguna atau dokumen,
- berdasarkan periode waktu,
- berdasarkan sumber kamera.

## 9.9 Experiment Tracking

Catat minimal:

- model dan versi,
- dataset dan split,
- preprocessing,
- prompt template,
- parameter training,
- seed,
- checkpoint,
- metrik,
- contoh kegagalan,
- biaya dan waktu.

Tanpa catatan tersebut, peningkatan sulit dibuktikan dan eksperimen sulit direproduksi.

## Checkpoint Bab 9

1. Kapan linear probing cocok digunakan?
2. Apa kelebihan adapter atau LoRA?
3. Mengapa split acak dapat menimbulkan leakage pada dataset gambar produk?

## Latihan Bab 9 - Rencana Adaptasi

Pilih satu domain visual. Buat tabel perbandingan prompting, linear probing, LoRA, dan full fine-tuning berdasarkan data, biaya, risiko, waktu, dan target kualitas.

---

# Bab 10 - Evaluasi Vision Language Model

## 10.1 Evaluasi Harus Mengikuti Tugas

Tidak ada satu skor yang mewakili seluruh kemampuan VLM. Sistem retrieval, captioning, VQA, dan ekstraksi dokumen memerlukan metrik berbeda.

Evaluasi sebaiknya memiliki tiga lapisan:

1. kualitas model pada dataset,
2. kualitas pipeline aplikasi,
3. dampak pada workflow pengguna.

## 10.2 Retrieval Metrics

Metrik umum:

- Recall@1,
- Recall@5,
- Recall@10,
- Mean Reciprocal Rank,
- normalized Discounted Cumulative Gain untuk relevance bertingkat.

Contoh Recall@5: berapa banyak kueri yang memiliki setidaknya satu gambar relevan dalam lima hasil teratas.

## 10.3 Caption Metrics

Caption dapat dibandingkan dengan reference menggunakan metrik berbasis overlap atau similarity. Namun, satu gambar dapat memiliki banyak caption benar.

Karena itu, evaluasi caption sebaiknya menggabungkan:

- semantic similarity,
- object and attribute correctness,
- detail coverage,
- hallucination rate,
- penilaian manusia sesuai tujuan.

## 10.4 VQA Accuracy

Untuk jawaban pendek, normalisasi dapat diperlukan:

- huruf besar-kecil,
- tanda baca,
- angka kata dan angka digit,
- sinonim yang diizinkan.

Namun normalisasi jangan menyamarkan kesalahan penting. `dua` dan `tiga` tidak boleh dianggap sama walaupun format lain serupa.

## 10.5 Evaluasi Grounding

Bounding box dapat dievaluasi dengan Intersection over Union.

```text
IoU = luas irisan prediksi dan ground truth
      --------------------------------------
      luas gabungan prediksi dan ground truth
```

Untuk jawaban berbasis region, periksa apakah region benar-benar mendukung klaim, bukan hanya berada dekat objek.

## 10.6 Hallucination Visual

Hallucination visual terjadi ketika model menyebut objek, teks, atribut, atau hubungan yang tidak didukung gambar.

Kategori evaluasi:

- object hallucination,
- attribute hallucination,
- counting error,
- spatial error,
- OCR fabrication,
- identity inference,
- causal claim tanpa bukti.

Ukur tidak hanya jumlah kesalahan, tetapi juga tingkat dampaknya.

## 10.7 Robustness Testing

Uji variasi yang wajar:

- resolusi turun,
- blur ringan,
- pencahayaan berbeda,
- crop kecil,
- rotasi,
- kompresi,
- latar belakang berbeda,
- variasi bahasa prompt.

Robustness test tidak boleh mengubah label secara tidak sengaja.

## 10.8 Slice Evaluation

Nilai performa per kelompok atau kondisi:

- jenis perangkat,
- indoor vs outdoor,
- resolusi,
- bahasa,
- kategori objek,
- tingkat occlusion,
- kualitas dokumen,
- lokasi atau domain.

Rata-rata tinggi dapat menyembunyikan kegagalan pada kelompok tertentu.

## 10.9 Human Evaluation

Rubrik manusia dapat memakai skala 1 sampai 5 untuk:

| Dimensi | Pertanyaan |
|---|---|
| Correctness | Apakah klaim sesuai gambar? |
| Completeness | Apakah detail penting tercakup? |
| Relevance | Apakah jawaban menjawab tugas? |
| Grounding | Apakah klaim punya bukti visual? |
| Clarity | Apakah bahasa jelas? |
| Safety | Apakah model menghindari inferensi sensitif? |

Gunakan panduan dan contoh agar penilai konsisten. Ukur agreement bila keputusan penting.

## 10.10 Evaluasi Sistem

Selain kualitas model, ukur:

- latency p50, p95, p99,
- biaya per gambar,
- failure rate preprocessing,
- parsing error,
- retry rate,
- persentase human review,
- waktu penyelesaian workflow,
- keluhan atau koreksi pengguna.

## 10.11 Membuat Golden Set

Golden set adalah kumpulan contoh yang telah ditinjau dan mewakili penggunaan penting. Isi sebaiknya mencakup:

- kasus umum,
- edge cases,
- gambar ambigu,
- pertanyaan tidak dapat dijawab,
- data dengan teks kecil,
- variasi device dan domain,
- kasus berisiko tinggi.

Golden set harus berversi dan tidak dipakai sebagai data training tanpa dokumentasi.

## Checkpoint Bab 10

1. Mengapa caption tidak cukup dinilai dengan word overlap?
2. Apa yang diukur oleh Recall@K?
3. Mengapa slice evaluation diperlukan?
4. Sebutkan dua metrik sistem di luar akurasi model.

## Latihan Bab 10 - Evaluation Plan

Buat evaluation plan untuk sistem pembaca dokumen. Sertakan golden set, metrik field-level, exact match, numeric tolerance, hallucination rate, latency, biaya, dan aturan human review.

---

# Bab 11 - Hallucination, Bias, Privacy, dan Safety

## 11.1 Mengapa Risiko Multimodal Lebih Kompleks?

VLM dapat salah membaca gambar dan kemudian menjelaskan kesalahan tersebut dengan bahasa yang meyakinkan. Sistem juga dapat mengekstrak informasi sensitif yang tidak diperlukan.

Risiko berasal dari:

- data training,
- kualitas gambar,
- prompt,
- arsitektur model,
- integrasi aplikasi,
- hak akses,
- interpretasi pengguna.

## 11.2 Jenis Hallucination

| Jenis | Contoh |
|---|---|
| Object hallucination | Menyebut helm padahal tidak ada |
| Attribute hallucination | Menyebut kendaraan merah padahal biru |
| Text hallucination | Menyalin nomor yang tidak terbaca |
| Spatial hallucination | Mengatakan objek berada di kiri padahal kanan |
| Identity hallucination | Menebak siapa orang dalam gambar |
| Causal hallucination | Menyimpulkan penyebab kerusakan dari satu foto |

Mitigasi:

- prompt berbasis bukti,
- abstention,
- crop dan resolusi tepat,
- verifikasi multi-pass,
- model khusus untuk tugas kritis,
- human review,
- menampilkan sumber gambar dan region.

## 11.3 Bias

Bias dapat muncul ketika data tidak mewakili variasi kondisi. Contoh:

- performa menurun pada pencahayaan tertentu,
- label objek hanya mewakili wilayah tertentu,
- model mengasosiasikan pekerjaan dengan atribut demografis,
- OCR lebih buruk pada gaya tulisan tertentu.

Mitigasi meliputi audit dataset, slice evaluation, review label, pembatasan use case, dan mekanisme koreksi.

## 11.4 Privasi

Gambar dapat memuat:

- wajah,
- alamat,
- nomor identitas,
- informasi kesehatan,
- layar perangkat,
- dokumen rahasia,
- metadata lokasi.

Prinsip privacy by design:

1. kumpulkan hanya data yang diperlukan,
2. jelaskan tujuan penggunaan,
3. batasi masa penyimpanan,
4. kontrol akses berdasarkan peran,
5. enkripsi data,
6. redact region sensitif,
7. audit akses,
8. sediakan prosedur penghapusan.

## 11.5 Metadata Gambar

File gambar dapat mengandung metadata seperti waktu, perangkat, atau lokasi. Menghapus tampilan visual belum tentu menghapus metadata.

Pipeline harus memutuskan apakah metadata diperlukan. Bila tidak, metadata sebaiknya dibersihkan sebelum penyimpanan atau pemrosesan lebih lanjut.

## 11.6 Prompt Injection pada Gambar

Gambar dapat berisi teks yang mencoba mengubah instruksi model, misalnya tulisan yang memerintahkan model mengabaikan aturan. Sistem document QA atau browsing visual perlu memperlakukan teks di gambar sebagai data, bukan instruksi tepercaya.

Pertahanan:

- pisahkan system instruction dan konten gambar,
- beri tahu model bahwa teks visual adalah data tidak tepercaya,
- batasi tool access,
- validasi aksi sebelum dijalankan,
- gunakan allowlist operasi,
- jangan mengeksekusi perintah dari hasil OCR secara otomatis.

## 11.7 Keamanan Output

Output VLM tidak boleh langsung mengendalikan sistem berisiko tanpa validasi. Contoh:

- membuka pintu,
- menyetujui pembayaran,
- menentukan diagnosis,
- menolak akses seseorang,
- mengendalikan mesin.

Gunakan model sebagai sumber rekomendasi atau ekstraksi, lalu terapkan rule, sensor lain, atau human approval sesuai dampak.

## 11.8 Responsible Use Checklist

Sebelum deployment, tanyakan:

- apakah model dibutuhkan,
- apakah pengguna tahu gambar diproses AI,
- apakah data memiliki izin,
- apakah output dapat dikoreksi,
- apakah ada jalur eskalasi,
- apakah performa diuji per kelompok,
- apakah sistem dapat abstain,
- apakah log menyimpan data sensitif,
- apakah vendor atau model memproses data di lokasi yang sesuai,
- apakah ada prosedur incident response.

## Checkpoint Bab 11

1. Apa perbedaan OCR error dan text hallucination?
2. Mengapa teks di dalam gambar harus diperlakukan sebagai data tidak tepercaya?
3. Sebutkan tiga langkah privacy by design.

## Latihan Bab 11 - Threat Modeling

Buat threat model untuk aplikasi analisis dokumen. Daftar aset, aktor, entry point, ancaman, dampak, kontrol pencegahan, dan respons insiden.

---

# Bab 12 - Deployment dan Monitoring

## 12.1 Pola Deployment

Pilihan umum:

- API model terkelola,
- model self-hosted,
- hybrid: preprocessing lokal dan inference eksternal,
- edge untuk model kecil,
- batch processing untuk volume besar non-real-time.

Pertimbangan:

- kualitas,
- latency,
- biaya,
- privasi,
- kapasitas tim,
- dukungan hardware,
- kebutuhan audit,
- lokasi penyimpanan data.

## 12.2 Pipeline Produksi

```text
Upload gambar
  -> autentikasi dan otorisasi
  -> validasi file
  -> malware scan bila relevan
  -> metadata stripping
  -> preprocessing
  -> model inference
  -> output validation
  -> policy check
  -> result + uncertainty
  -> logging aman
```

## 12.3 Validasi Input

Periksa:

- tipe file,
- ukuran file,
- dimensi,
- jumlah gambar,
- file rusak,
- format animasi,
- ekstensi tidak sesuai MIME type,
- konten yang dilarang,
- batas resolusi.

Hindari memercayai nama file atau ekstensi saja.

## 12.4 Batching dan Caching

Batching meningkatkan throughput, tetapi dapat menambah waktu tunggu. Caching dapat mengurangi biaya jika gambar dan prompt sama, tetapi memerlukan kebijakan privasi dan invalidasi.

Kunci cache dapat mencakup:

- hash gambar setelah preprocessing,
- versi model,
- versi prompt,
- parameter decoding,
- schema output.

Jangan memakai cache lintas pengguna bila output dapat memuat data privat.

## 12.5 Latency Budget

Pecah latency:

```text
upload + decode + preprocessing + queue + inference + validation + response
```

Contoh budget:

| Komponen | Target |
|---|---:|
| Upload dan decode | 300 ms |
| Preprocessing | 100 ms |
| Queue | 200 ms |
| Inference | 2.500 ms |
| Validasi | 200 ms |
| Total target | 3.300 ms |

Angka hanya contoh. Target harus mengikuti kebutuhan produk.

## 12.6 Cost Drivers

Biaya dipengaruhi oleh:

- resolusi dan jumlah gambar,
- jumlah visual token,
- panjang prompt,
- panjang output,
- model size,
- retry,
- multi-pass,
- concurrency,
- penyimpanan.

Optimasi:

- gunakan resolusi adaptif,
- crop region penting,
- batasi output,
- gunakan model kecil untuk routing,
- cache aman,
- lakukan batch untuk workload offline,
- hentikan pipeline bila validasi awal gagal.

## 12.7 Monitoring

Pantau:

- volume request,
- error preprocessing,
- timeout,
- latency percentile,
- biaya,
- schema failure,
- abstention rate,
- human override,
- hallucination report,
- drift distribusi gambar,
- perubahan performa per slice.

Jangan menyimpan gambar mentah dalam log tanpa kebutuhan, izin, dan kontrol yang jelas.

## 12.8 Drift

Drift dapat terjadi ketika:

- kamera baru digunakan,
- layout dokumen berubah,
- jenis produk baru masuk,
- kondisi pencahayaan berubah,
- prompt pengguna berubah,
- model atau image processor diperbarui.

Gunakan sampling berkala, golden set, canary deployment, dan rollback.

## 12.9 Versioning

Satu hasil harus dapat ditelusuri ke:

- versi model,
- versi processor,
- versi prompt,
- versi schema,
- versi post-processing,
- timestamp,
- konfigurasi inference.

Tanpa versioning, sulit menemukan penyebab perubahan kualitas.

## 12.10 Human-in-the-Loop

Human review cocok untuk:

- confidence rendah,
- teks tidak terbaca,
- nilai finansial tinggi,
- keputusan yang memengaruhi hak pengguna,
- konflik antar model,
- gambar di luar domain.

Interface review sebaiknya menampilkan gambar, crop relevan, output model, alasan eskalasi, dan cara memperbaiki hasil.

## Checkpoint Bab 12

1. Apa komponen utama pipeline produksi VLM?
2. Mengapa hash gambar saja tidak selalu cukup sebagai cache key?
3. Apa contoh drift pada aplikasi dokumen?
4. Kapan human review diperlukan?

## Latihan Bab 12 - Production Readiness

Buat checklist production readiness dengan kategori security, privacy, reliability, quality, observability, cost, dan rollback.

---

# Bab 13 - Mini Project: Asisten Analisis Gambar

## 13.1 Tujuan Project

Peserta membuat prototipe asisten yang menerima gambar dan pertanyaan, lalu menghasilkan jawaban terstruktur yang:

- berdasarkan bukti visual,
- menandai ketidakpastian,
- memiliki format yang dapat divalidasi,
- dievaluasi pada golden set,
- memiliki dokumentasi risiko.

## 13.2 Pilihan Tema

Pilih satu tema:

1. analisis rak produk,
2. pembaca informasi pada struk atau formulir sederhana,
3. tutor diagram pembelajaran,
4. pemeriksa kondisi fasilitas non-kritis,
5. katalog visual dengan pencarian teks.

Hindari penggunaan yang langsung menentukan diagnosis, identitas, kelayakan kredit, atau keputusan keselamatan.

## 13.3 User Story

Contoh:

```text
Sebagai petugas inventaris,
saya ingin mengunggah foto rak dan mendapatkan daftar kategori barang yang terlihat,
agar saya dapat melakukan pemeriksaan awal sebelum verifikasi manual.
```

## 13.4 Ruang Lingkup Minimum

Project minimal memiliki:

- input gambar yang tervalidasi,
- satu prompt template,
- output JSON,
- penanganan error,
- field ketidakpastian,
- golden set minimal 30 contoh,
- evaluation script atau spreadsheet hasil,
- dokumentasi keterbatasan.

## 13.5 Schema Output

Contoh untuk inventaris visual:

```json
{
  "summary": "Rak berisi beberapa produk kemasan.",
  "objects": [
    {
      "label": "botol",
      "estimated_count": 6,
      "evidence": "terlihat pada dua baris rak bagian tengah",
      "uncertain": true
    }
  ],
  "visible_text": [],
  "limitations": [
    "sebagian objek tertutup",
    "resolusi tidak cukup untuk membaca label"
  ]
}
```

## 13.6 Struktur Folder

```text
vlm-mini-project/
├── README.md
├── requirements.txt
├── data/
│   ├── images/
│   └── golden_set.jsonl
├── src/
│   ├── preprocess.py
│   ├── prompt.py
│   ├── inference.py
│   ├── schema.py
│   └── evaluate.py
├── reports/
│   ├── metrics.json
│   └── error_analysis.md
└── tests/
    └── test_schema.py
```

## 13.7 Contoh Kontrak Inference

```python
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass
class InferenceRequest:
    image_path: Path
    question: str


@dataclass
class InferenceResponse:
    answer: str
    evidence: list[str]
    limitations: list[str]
    uncertain: bool
    raw: dict[str, Any]


def run_inference(request: InferenceRequest) -> InferenceResponse:
    """Hubungkan fungsi ini ke model yang dipilih peserta."""
    raise NotImplementedError
```

## 13.8 Preprocessing

Peserta harus mendokumentasikan:

- format yang diterima,
- ukuran maksimum,
- cara memperbaiki orientasi,
- resize atau crop,
- apakah metadata dihapus,
- bagaimana file sementara dihapus.

## 13.9 Prompt Template

```text
Anda membantu analisis visual awal.
Jawab hanya berdasarkan gambar.
Jangan menebak identitas, lokasi, penyebab, atau informasi yang tidak terlihat.

Pertanyaan pengguna:
{question}

Lakukan:
1. Catat observasi visual yang relevan.
2. Jawab pertanyaan menggunakan observasi tersebut.
3. Tandai keterbatasan seperti blur, occlusion, atau teks kecil.
4. Gunakan uncertain=true bila jawaban tidak dapat dipastikan.
5. Kembalikan JSON valid sesuai schema.
```

## 13.10 Golden Set

Setiap contoh minimal berisi:

```json
{
  "id": "sample-001",
  "image": "images/sample-001.jpg",
  "question": "Berapa botol yang terlihat jelas?",
  "expected": {
    "answer": "4",
    "uncertain": false
  },
  "tags": ["counting", "clear", "indoor"]
}
```

Masukkan edge cases:

- gambar blur,
- objek sebagian tertutup,
- pertanyaan di luar gambar,
- teks terlalu kecil,
- beberapa objek mirip,
- gambar tanpa objek target.

## 13.11 Metrik Minimum

| Metrik | Tujuan |
|---|---|
| Task accuracy | Mengukur jawaban utama |
| Hallucination rate | Mengukur klaim tanpa bukti |
| Abstention precision | Mengukur ketepatan menolak |
| Schema validity | Mengukur output dapat diproses |
| Latency p50 dan p95 | Mengukur pengalaman pengguna |
| Cost per request | Mengukur kelayakan operasional |

## 13.12 Error Analysis

Kelompokkan kegagalan:

- preprocessing,
- objek tidak terdeteksi,
- counting,
- OCR,
- hubungan spasial,
- prompt ambiguity,
- schema error,
- hallucination,
- data di luar domain.

Untuk setiap kategori, catat contoh, frekuensi, dampak, dan tindakan perbaikan.

## 13.13 Tahapan Pengerjaan

### Tahap 1 - Definisi

- pilih tema,
- tulis user story,
- tentukan batasan dan non-goals,
- buat schema output.

### Tahap 2 - Data

- siapkan minimal 30 gambar yang boleh digunakan,
- buat pertanyaan dan expected answer,
- tandai tag dan tingkat kesulitan.

### Tahap 3 - Baseline

- buat preprocessing sederhana,
- buat prompt awal,
- jalankan semua contoh,
- simpan output dan latency.

### Tahap 4 - Perbaikan

- analisis kegagalan,
- perbaiki prompt atau preprocessing,
- tambah validasi,
- bandingkan dengan baseline pada set yang sama.

### Tahap 5 - Laporan

- jelaskan arsitektur,
- tampilkan metrik,
- sertakan contoh berhasil dan gagal,
- jelaskan risiko dan batas penggunaan,
- tulis rekomendasi pengembangan.

## 13.14 Rubrik Penilaian

| Komponen | Bobot |
|---|---:|
| Definisi masalah dan scope | 10% |
| Kualitas data dan golden set | 15% |
| Desain pipeline | 20% |
| Prompt, schema, dan validasi | 15% |
| Evaluasi dan error analysis | 20% |
| Safety, privacy, dan dokumentasi | 10% |
| Presentasi dan reproducibility | 10% |

## 13.15 Kriteria Selesai

Project dianggap selesai bila:

- pipeline dapat dijalankan ulang,
- output dapat divalidasi,
- metrik baseline tersedia,
- perubahan dibandingkan secara adil,
- error analysis memuat contoh nyata,
- batasan dan risiko ditulis dengan jelas,
- tidak ada data yang digunakan tanpa izin.

---

# Bab 14 - Kuis Akhir dan Pembahasan

## 14.1 Soal Pilihan Ganda

### Soal 1

Fungsi utama vision encoder adalah:

A. Menyimpan gambar asli
B. Mengubah gambar menjadi representasi fitur
C. Menghapus seluruh noise
D. Menghasilkan password

### Soal 2

Pada Vision Transformer, gambar umumnya:

A. Diubah menjadi patch
B. Diubah langsung menjadi kata
C. Hanya diproses jika hitam putih
D. Tidak membutuhkan posisi

### Soal 3

Contrastive learning bertujuan untuk:

A. Membuat semua embedding sama
B. Mendekatkan pasangan cocok dan menjauhkan pasangan tidak cocok
C. Menghapus text encoder
D. Mengubah gambar menjadi audio

### Soal 4

Arsitektur yang paling sesuai untuk indexing jutaan gambar dan pencarian teks adalah:

A. Dual encoder
B. Decoder teks tanpa vision encoder
C. Rule engine saja
D. OCR tanpa embedding

### Soal 5

Projection layer digunakan untuk:

A. Menyimpan metadata
B. Menyesuaikan representasi visual ke ruang yang dapat dipakai komponen bahasa
C. Menghapus seluruh visual token
D. Mengganti dataset

### Soal 6

Contoh tugas VQA adalah:

A. Mengubah ukuran file
B. Menjawab pertanyaan tentang isi gambar
C. Mengurutkan folder
D. Menghitung hash

### Soal 7

OCR berbeda dari document understanding karena document understanding juga mempertimbangkan:

A. Layout dan hubungan antarbagian
B. Hanya ukuran file
C. Warna latar desktop
D. Nama pengguna sistem

### Soal 8

Prompt visual yang baik sebaiknya:

A. Memaksa model selalu menjawab
B. Menjelaskan batas bukti dan format keluaran
C. Menghapus aturan safety
D. Selalu meminta jawaban panjang

### Soal 9

Hallucination visual adalah:

A. Model mengompres gambar
B. Model menyebut detail yang tidak didukung gambar
C. Gambar memiliki resolusi tinggi
D. Model melakukan batching

### Soal 10

Mengapa output JSON dari model perlu divalidasi?

A. Model selalu menghasilkan schema sempurna
B. Model dapat menghasilkan format atau tipe yang salah
C. JSON tidak dapat dipakai program
D. Validasi hanya untuk gambar

### Soal 11

Linear probing berarti:

A. Melatih classifier di atas encoder yang dibekukan
B. Melatih semua parameter dari awal
C. Menghapus embedding
D. Menambah resolusi tanpa batas

### Soal 12

Split dataset produk sebaiknya dilakukan berdasarkan product ID karena:

A. Mencegah foto produk yang sama tersebar ke train dan test
B. Membuat file lebih besar
C. Menghilangkan kebutuhan evaluasi
D. Menjamin model sempurna

### Soal 13

Recall@5 pada retrieval mengukur:

A. Waktu upload lima gambar
B. Apakah hasil relevan muncul dalam lima posisi teratas
C. Jumlah parameter model
D. Jumlah token output

### Soal 14

Slice evaluation digunakan untuk:

A. Menghapus gambar sulit
B. Memeriksa performa pada kelompok atau kondisi tertentu
C. Menggabungkan semua skor menjadi satu tanpa analisis
D. Memperkecil ukuran model

### Soal 15

Prompt injection visual dapat terjadi ketika:

A. Teks di gambar mencoba mengubah instruksi sistem
B. Gambar tidak memiliki metadata
C. Model memakai batch size satu
D. Output berisi JSON valid

### Soal 16

Langkah privacy by design yang tepat adalah:

A. Menyimpan semua gambar selamanya
B. Mengumpulkan hanya data yang diperlukan
C. Memberikan akses kepada semua orang
D. Menulis data sensitif ke log

### Soal 17

Cache key sebaiknya mempertimbangkan versi model dan prompt karena:

A. Output dapat berubah ketika konfigurasi berubah
B. Hash gambar selalu salah
C. Prompt tidak memengaruhi output
D. Cache hanya untuk teks

### Soal 18

Human review paling dibutuhkan ketika:

A. Keputusan berdampak tinggi atau output tidak pasti
B. Semua gambar sama
C. Model menjawab sangat cepat
D. File berukuran kecil

### Soal 19

Golden set adalah:

A. Kumpulan contoh evaluasi yang ditinjau dan mewakili penggunaan penting
B. Semua data training tanpa filter
C. Hanya gambar paling mudah
D. Log produksi yang tidak terstruktur

### Soal 20

Prinsip yang paling aman untuk VLM adalah:

A. Menganggap semua output benar
B. Memisahkan observasi, interpretasi, dan hal yang tidak dapat ditentukan
C. Menghapus ketidakpastian
D. Menggunakan resolusi tertinggi untuk semua tugas

## 14.2 Kunci Jawaban

| Soal | Jawaban | Pembahasan Singkat |
|---:|:---:|---|
| 1 | B | Vision encoder mengubah piksel menjadi fitur visual. |
| 2 | A | Vision Transformer memakai patch sebagai unit input. |
| 3 | B | Pasangan cocok dibuat dekat dan pasangan tidak cocok dijauhkan. |
| 4 | A | Embedding dapat dihitung offline dan dicari secara efisien. |
| 5 | B | Connector menyesuaikan dimensi atau distribusi representasi. |
| 6 | B | VQA menjawab pertanyaan berdasarkan bukti visual. |
| 7 | A | Document understanding memodelkan teks, posisi, struktur, dan field. |
| 8 | B | Batas bukti dan schema meningkatkan kontrol serta evaluasi. |
| 9 | B | Model menambahkan objek atau detail yang tidak terlihat. |
| 10 | B | Generation tidak menjamin JSON valid atau tipe data benar. |
| 11 | A | Encoder tetap, hanya head kecil yang dilatih. |
| 12 | A | Split berbasis entitas mengurangi leakage. |
| 13 | B | Recall@5 memeriksa hasil relevan pada lima posisi teratas. |
| 14 | B | Slice menunjukkan apakah kelompok tertentu mengalami penurunan kualitas. |
| 15 | A | Teks visual harus diperlakukan sebagai data tidak tepercaya. |
| 16 | B | Data minimization adalah prinsip privasi dasar. |
| 17 | A | Perubahan model atau prompt dapat menghasilkan keluaran berbeda. |
| 18 | A | Review diperlukan ketika dampak atau ketidakpastian tinggi. |
| 19 | A | Golden set dipakai untuk evaluasi konsisten dan regression test. |
| 20 | B | Pemisahan tersebut mencegah asumsi diperlakukan sebagai fakta. |

## 14.3 Pertanyaan Reflektif

1. Mengapa model yang bagus pada captioning belum tentu bagus pada OCR?
2. Bagaimana menyeimbangkan resolusi gambar, biaya, dan detail?
3. Kapan model khusus lebih tepat daripada VLM generatif?
4. Bagaimana cara membuktikan bahwa perbaikan prompt benar-benar meningkatkan kualitas?
5. Apa konsekuensi bila sistem tidak menyediakan pilihan "tidak dapat ditentukan"?

---

# Bab 15 - Diskusi, Glosarium, Ringkasan, dan Referensi

## 15.1 Topik Diskusi

### Diskusi 1 - VLM atau Model Khusus?

Pilih satu use case visual. Bandingkan VLM generatif, model deteksi khusus, dan pendekatan hybrid. Bahas kualitas, latency, cost, interpretability, dan risiko.

### Diskusi 2 - Bukti Visual

Bagaimana interface seharusnya menampilkan bukti agar pengguna tidak langsung percaya jawaban model? Pertimbangkan crop, bounding box, teks sumber, dan ketidakpastian.

### Diskusi 3 - Privasi

Apakah semua gambar yang berguna secara teknis juga layak dipakai? Bahas consent, tujuan, retensi, dan hak penghapusan.

### Diskusi 4 - Human Review

Tentukan threshold atau kondisi yang memicu review manusia pada aplikasi dokumen atau inspeksi.

## 15.2 Glosarium

| Istilah | Arti |
|---|---|
| Vision Language Model | Model yang menghubungkan informasi visual dan bahasa |
| Vision encoder | Jaringan yang mengubah gambar menjadi fitur visual |
| Text encoder | Jaringan yang mengubah teks menjadi embedding |
| Visual token | Representasi bagian gambar dalam bentuk urutan vektor |
| Patch | Potongan gambar yang digunakan sebagai unit input Vision Transformer |
| Image-text alignment | Proses menyelaraskan representasi gambar dan teks |
| Contrastive learning | Pembelajaran yang mendekatkan pasangan cocok dan menjauhkan pasangan tidak cocok |
| Dual encoder | Arsitektur dengan encoder gambar dan teks yang terpisah |
| Fusion encoder | Arsitektur yang menggabungkan token visual dan teks untuk interaksi bersama |
| Projection layer | Lapisan yang menyesuaikan dimensi atau ruang representasi |
| Cross-attention | Attention ketika query mengambil informasi dari representasi lain |
| Captioning | Tugas menghasilkan deskripsi gambar |
| VQA | Tugas menjawab pertanyaan berdasarkan gambar |
| Grounding | Menghubungkan kata atau klaim dengan region visual |
| OCR | Proses mengenali karakter dari gambar |
| Hallucination visual | Klaim yang tidak didukung oleh gambar |
| Abstention | Keputusan model untuk tidak menjawab ketika bukti tidak cukup |
| Recall@K | Metrik apakah hasil relevan muncul dalam K hasil teratas |
| IoU | Rasio luas irisan dan gabungan dua region |
| Golden set | Kumpulan contoh evaluasi terkurasi dan berversi |
| LoRA | Teknik adaptasi dengan parameter tambahan berukuran rendah |
| Drift | Perubahan distribusi data atau perilaku sistem dari waktu ke waktu |
| Human-in-the-loop | Proses yang melibatkan review atau keputusan manusia |

## 15.3 Ringkasan Cepat

1. VLM menghubungkan visual token dan token bahasa.
2. Gambar perlu preprocessing yang sesuai tugas dan model.
3. Vision encoder dapat berbasis CNN atau Vision Transformer.
4. Contrastive learning menyelaraskan pasangan gambar dan teks.
5. Dual encoder unggul untuk retrieval, sedangkan VLM generatif unggul untuk jawaban bahasa.
6. Projection atau connector menjembatani vision encoder dan language model.
7. Captioning, VQA, OCR, retrieval, dan grounding membutuhkan evaluasi berbeda.
8. Prompt harus menjelaskan tujuan, bukti, batasan, dan schema.
9. Fine-tuning bukan langkah pertama untuk semua masalah.
10. Evaluasi harus mengukur grounding dan hallucination, bukan hanya kelancaran bahasa.
11. Gambar dapat memuat data sensitif dan prompt injection.
12. Sistem produksi memerlukan validasi input, output, monitoring, versioning, dan human review.
13. Abstention adalah fitur penting untuk reliability.
14. Mini project harus memiliki golden set dan error analysis.
15. Keputusan berisiko tinggi tidak boleh bergantung pada output VLM tanpa kontrol tambahan.

## 15.4 Checklist Sebelum Menggunakan VLM

- [ ] Tujuan dan output telah didefinisikan.
- [ ] Tugas benar-benar memerlukan hubungan visual dan bahasa.
- [ ] Hak penggunaan gambar telah diperiksa.
- [ ] Preprocessing dan resolusi telah diuji.
- [ ] Prompt memisahkan observasi dan interpretasi.
- [ ] Output memiliki schema dan validasi.
- [ ] Model dapat menyatakan ketidakpastian.
- [ ] Golden set mencakup kasus umum dan sulit.
- [ ] Hallucination dan bias dievaluasi per slice.
- [ ] Data sensitif tidak ditulis ke log tanpa alasan.
- [ ] Prompt injection dan tool access telah dipertimbangkan.
- [ ] Latency dan biaya telah diukur.
- [ ] Model, prompt, dan processor memiliki versioning.
- [ ] Human review tersedia untuk kasus berisiko.
- [ ] Prosedur rollback dan incident response tersedia.

## 15.5 Referensi Belajar

### Fondasi Vision dan Transformer

1. Dosovitskiy, A. et al. *An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale*.
2. He, K. et al. *Deep Residual Learning for Image Recognition*.
3. Vaswani, A. et al. *Attention Is All You Need*.

### Image-Text Alignment dan VLM

4. Radford, A. et al. *Learning Transferable Visual Models From Natural Language Supervision*.
5. Li, J. et al. *BLIP: Bootstrapping Language-Image Pre-training for Unified Vision-Language Understanding and Generation*.
6. Li, J. et al. *BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models*.
7. Alayrac, J.-B. et al. *Flamingo: a Visual Language Model for Few-Shot Learning*.
8. Liu, H. et al. *Visual Instruction Tuning*.

### Dataset dan Evaluasi

9. Lin, T.-Y. et al. *Microsoft COCO: Common Objects in Context*.
10. Antol, S. et al. *VQA: Visual Question Answering*.
11. Hendricks, L. A. et al. *Women Also Snowboard: Overcoming Bias in Captioning Models*.

### Praktik Responsible AI

12. Dokumentasi resmi framework dan model yang digunakan peserta.
13. Pedoman perlindungan data dan keamanan organisasi tempat sistem diterapkan.
14. Model card, dataset card, dan evaluation report dari setiap komponen yang dipakai.

> **Catatan referensi:** baca paper untuk memahami asumsi dan batas metode. Untuk implementasi, selalu cocokkan dengan dokumentasi resmi versi library dan model yang digunakan.

## Penutup

Vision Language Model membuka banyak kemungkinan karena satu sistem dapat menerima visual dan instruksi bahasa yang fleksibel. Kemampuan tersebut juga menambah sumber kegagalan: model dapat salah melihat, salah menghubungkan, lalu menjelaskan kesalahan dengan lancar.

Engineer yang baik tidak hanya membuat demo yang tampak pintar. Engineer menetapkan batas penggunaan, menguji data sulit, memvalidasi output, menjaga privasi, memantau perubahan, dan menyediakan jalur koreksi manusia.

Gunakan VLM sebagai komponen dalam sistem yang terukur, bukan sebagai sumber kebenaran tunggal.
