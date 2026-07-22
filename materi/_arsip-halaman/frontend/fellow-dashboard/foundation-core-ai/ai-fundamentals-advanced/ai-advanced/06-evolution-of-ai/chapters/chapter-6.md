# Diffusion Models

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-advanced/06-evolution-of-ai/chapters/chapter-6.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

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

## Lampiran Sumber HTML Lengkap

````html
<article class="ai-evolution-chapter"><header class="ai-evolution-chapter-head"><span>Chapter 6 - 35 menit</span><h2>Diffusion Models</h2><p>Pertanyaan pembuka: bagaimana menyeimbangkan kualitas generasi dan biaya compute?</p></header><section class="ai-evolution-section"><h3><i class="fas fa-bullseye"></i> Tujuan Pembelajaran</h3><ul><li>Memahami proses noise dan denoising secara konseptual.</li><li>Menjelaskan mengapa diffusion model kuat untuk sintesis gambar.</li><li>Menganalisis trade-off inference steps, kualitas, dan biaya.</li></ul></section><section class="ai-evolution-callout"><i class="fas fa-image"></i><div><strong>Konsep Utama.</strong> Diffusion model belajar membalik proses penambahan noise. Saat generasi, model mulai dari noise lalu menguranginya bertahap hingga muncul sampel yang koheren.</div></section><section class="ai-evolution-section"><h3>Inti Konsep</h3><p>Training diffusion memperlihatkan data bersih yang diberi noise bertahap. Model belajar memprediksi noise atau versi lebih bersih dari data tersebut. Generasi melakukan proses terbalik dari noise menuju sampel.</p><p>Kelebihannya adalah kualitas dan stabilitas yang baik. Kekurangannya, generasi sering membutuhkan beberapa langkah denoising sehingga latency dan biaya compute perlu diperhatikan.</p><div class="ai-evolution-flow"><span>Data Bersih</span><i class="fas fa-arrow-right"></i><span>Tambah Noise</span><i class="fas fa-arrow-right"></i><span>Belajar Denoise</span><i class="fas fa-arrow-right"></i><span>Noise</span><i class="fas fa-arrow-right"></i><span>Sampel Baru</span></div></section><section class="ai-evolution-callout"><i class="fas fa-eraser"></i><div><strong>Analogi.</strong> Diffusion seperti belajar membersihkan gambar yang makin lama makin buram, lalu memakai kemampuan itu untuk membangun gambar dari kabut noise.</div></section><section class="ai-evolution-grid"><article><h4>Contoh Nyata: image generation</h4><p>Diffusion banyak dipakai untuk membuat visual dari prompt, inpainting, dan variasi gambar.</p></article><article><h4>Contoh Nyata: desain prototipe</h4><p>Tim produk dapat membuat alternatif visual cepat, tetapi tetap perlu kurasi manusia dan pemeriksaan hak penggunaan.</p></article></section><section class="ai-evolution-section"><h3>Lebih Teknis</h3><pre><code>sample = random_noise()
for step in denoising_steps:
  predicted_noise = model(sample, step)
  sample = remove_noise(sample, predicted_noise)
return sample</code></pre><p>Lebih banyak denoising steps dapat meningkatkan kualitas, tetapi menambah waktu. Sampler modern mencoba mempercepat proses tanpa merusak kualitas terlalu banyak.</p></section><section class="ai-evolution-section"><h3>Kesalahan Umum</h3><ol><li>Mengira diffusion hanya untuk gambar.</li><li>Mengabaikan biaya inference.</li><li>Menyamakan kualitas visual dengan kebenaran konten.</li><li>Tidak memeriksa bias dan hak data pelatihan.</li></ol></section><section class="ai-evolution-check"><h3>Mini-check</h3><p>Jika aplikasi butuh hasil sangat cepat, trade-off apa yang perlu dipikirkan saat memilih diffusion?</p></section><section class="ai-evolution-section"><h3>Ringkasan</h3><ul><li>Diffusion belajar proses denoising bertahap.</li><li>Kualitas tinggi datang bersama biaya inference.</li><li>Manusia tetap perlu memeriksa akurasi, bias, dan hak penggunaan.</li></ul></section><section class="ai-evolution-glossary"><h3>Glossary</h3><dl><dt>Denoising</dt><dd>Proses mengurangi noise dari data.</dd><dt>Inference steps</dt><dd>Jumlah langkah generasi saat model membuat sampel.</dd><dt>Sampler</dt><dd>Metode untuk menjalankan proses generasi diffusion.</dd></dl></section><section class="ai-evolution-references"><h3>Referensi</h3><ol><li>Sohl-Dickstein et al., <em>Deep Unsupervised Learning using Nonequilibrium Thermodynamics</em>, 2015.</li><li>Ho, Jain, and Abbeel, <em>Denoising Diffusion Probabilistic Models</em>, 2020.</li></ol></section></article>

````
