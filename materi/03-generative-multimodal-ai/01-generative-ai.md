# Generative AI

> Ekspor lengkap dari sumber materi HerAI yang tersedia di repository.
> Mencakup materi, latihan, kuis, diskusi, pembahasan, versi legacy, dan/atau data interaktif bila tersedia.

## Generative AI.

> Sumber: `pages/frontend/fellow-dashboard/generative-multimodal-ai/generative-ai.html`

[AI Lab](#/participant-modules) › Generative AI

05 / 08 ** Creative Intelligence

### Generative AI.

Diffusion models, GANs, multimodal generation, prompt engineering, dan ilmu di balik menciptakan sesuatu dari noise.

4Modul

28+Topik

3Level

noise → image

p(x|z) = decoder

FID: 2.84

CFG scale: 7.5

Modul

-   [01Diffusion Models](#m1)
-   [02GANs](#m2)
-   [03Vision-Language Models](#m3)
-   [04Prompt Engineering](#m4)

Mulai dari mana?

Pemula Mulai dari Modul 01 → Intuisi Diffusion

Intermediate Langsung ke Math DDPM & GAN Loss

Advanced DDIM, Latent Diffusion, StyleGAN2

01

Diffusion

#### Diffusion Models

Dari noise murni menjadi gambar fotorealistik — proses denoising yang mengubah dunia generative AI.

noise

→

t=750

→

t=500

→

t=250

→

**️ image

**️

##### Intuisi Diffusion — Forward & Reverse Process

Pemula

Apa itu noise? Bagaimana model belajar "menghilangkan" noise secara bertahap. Forward process menambah noise Gaussian step-by-step; reverse process adalah kebalikannya — inilah yang kita latih.

Forward ProcessReverse ProcessGaussian NoiseDenoising

**

##### DDPM — Denoising Diffusion Probabilistic Models

Intermediate

Math di balik DDPM: forward process q(x\_t|x\_{t-1}), reparameterization trick, loss function (simplified L\_simple vs L\_vlb), dan noise schedule linear vs cosine. Kenapa kita predict noise bukan gambar langsung.

DDPMELBONoise ScheduleU-NetHo et al. 2020

    # Forward process — tambah noise ke gambar
    def q_sample(x0, t, noise):
        sqrt_alpha = extract(sqrt_alphas_cumprod, t)
        sqrt_one_minus = extract(sqrt_one_minus_alphas, t)
        return sqrt_alpha * x0 + sqrt_one_minus * noise

⚡

##### DDIM & Faster Sampling

Advanced

DDPM butuh 1000 step sampling — terlalu lambat. DDIM (Denoising Diffusion Implicit Models) memungkinkan sampling deterministik dalam 50 step tanpa retrain. Analisis math: dari Markovian ke non-Markovian process.

DDIMNon-Markovian50-step SamplingSong et al. 2021

**️

##### Latent Diffusion & Stable Diffusion

Advanced

Diffusion di pixel space mahal — LDM kompresi gambar ke latent space via VAE dulu, baru diffusion di sana. Arsitektur lengkap Stable Diffusion: VAE Encoder → U-Net + Cross-Attention (text conditioning) → VAE Decoder. Classifier-free guidance (CFG) untuk kontrol kualitas.

Latent DiffusionVAECross-AttentionCFGCLIP

**

##### Praktik: Generate Gambar dengan Stable Diffusion

PemulaIntermediate

Setup pipeline dengan ** diffusers, custom prompt engineering untuk gambar berkualitas tinggi, ControlNet untuk spatial conditioning (pose, depth, canny edge), dan img2img untuk style transfer.

** diffusersControlNetimg2imgLoRA

    from diffusers import StableDiffusionPipeline
    pipe = StableDiffusionPipeline.from_pretrained(
        "runwayml/stable-diffusion-v1-5"
    )
    image = pipe("a cat in Yogyakarta, cinematic").images[0]

02

GANs

#### Generative Adversarial Networks

Dua jaringan saling bersaing — satu menciptakan, satu menghakimi. Dinamika adversarial yang melahirkan gambar sintetis paling realistis.

Generator G

z \~ N(0,1) → fake image

fake images →

← gradient

Discriminator D

real or fake? → [0,1]

**

##### Intuisi GAN — Kucing dan Tikusan

Pemula

Generator seperti pemalsu uang, Discriminator seperti polisi. Keduanya saling mengasah kemampuan sampai pemalsu tidak bisa dibedakan dari aslinya. Bagaimana equilibrium Nash tercapai dalam training.

GeneratorDiscriminatorAdversarial TrainingNash Equilibrium

**

##### GAN Loss Function & Masalah Training

Intermediate

Minimax loss: min\_G max\_D [E log D(x) + E log(1-D(G(z)))]. Mode collapse — kenapa generator terjebak menghasilkan output sama terus. Vanishing gradient di discriminator kuat. Training instability dan cara diagnosis.

Minimax LossMode CollapseVanishing GradientTraining Stability

    # GAN minimax loss
    loss_D = -(log(D(real)) + log(1 - D(G(z))))
    loss_G = -log(D(G(z)))  # non-saturating

    # WGAN-GP: lebih stabil
    loss_D = D(fake) - D(real) + λ * gradient_penalty

**

##### WGAN-GP & Training yang Stabil

Intermediate

Wasserstein GAN mengganti JS divergence dengan Earth Mover's distance — tidak vanish meski discriminator sempurna. Gradient penalty (GP) menggantikan weight clipping. Kenapa WGAN-GP menjadi standar praktis.

WGANWasserstein DistanceGradient PenaltyLipschitz Constraint

**

##### StyleGAN2 & Arsitektur Modern

Advanced

Mapping network (z → w space) untuk disentanglement. AdaIN (Adaptive Instance Normalization) untuk style injection per layer. Progressive growing — mulai dari 4×4 hingga 1024×1024. Mengapa StyleGAN2 masih relevan untuk high-fidelity face generation.

StyleGAN2W-spaceAdaINProgressive GrowingFID

**

##### Praktik: Train GAN pada MNIST & Evaluasi FID

PemulaIntermediate

Bangun DCGAN dari nol dengan PyTorch, visualisasi training progression (epoch 1 vs 50 vs 200), plot loss curves, dan hitung FID score untuk evaluasi kualitatif. Debugging mode collapse secara langsung.

DCGANPyTorchFID ScoreMNISTTraining Loop

03

Multimodal

#### Vision-Language Models (VLMs)

Ketika gambar dan teks bicara bahasa yang sama — model yang memahami dunia visual sekaligus linguistik.

**️
Image

→

Vision
Encoder

→

Alignment
Layer

↔

Text
Encoder

←

**
Text

**

##### Apa itu Multimodal? — CLIP, BLIP, GPT-4V

Pemula

Model yang bisa "melihat" dan "membaca" sekaligus. CLIP (Contrastive Language-Image Pretraining) dari OpenAI sebagai landmark — 400 juta pasang gambar-teks, zero-shot classification. Landscape model: BLIP-2, LLaVA, Gemini, GPT-4V.

CLIPBLIP-2GPT-4VZero-shotMultimodal

**

##### Contrastive Learning — CLIP Loss

Intermediate

InfoNCE loss untuk menarik pasangan gambar-teks yang cocok dan mendorong yang tidak cocok. Bagaimana embedding space terbentuk — cosine similarity matrix N×N. Temperature scaling dan kenapa batch size besar penting untuk contrastive learning.

InfoNCE LossContrastive LearningEmbedding SpaceTemperature Scaling

    # CLIP contrastive loss (simplified)
    logits = image_emb @ text_emb.T / temperature
    labels = torch.arange(N)  # diagonal = correct pairs
    loss = (F.cross_entropy(logits, labels) +
            F.cross_entropy(logits.T, labels)) / 2

**

##### LLaVA & Arsitektur VLM Modern

Advanced

LLaVA: CLIP vision encoder + projection layer + LLM (Vicuna/Mistral). Bagaimana visual tokens diintegrasikan ke LLM input space. Flamingo's cross-attention gating. Grounding DINO untuk open-vocabulary detection. Perbandingan: adapter vs full fine-tuning vs prefix tuning.

LLaVAFlamingoGrounding DINOVisual TokensCross-Attention

**

##### Praktik: Zero-shot Classification & Image Captioning

PemulaIntermediate

Gunakan CLIP untuk zero-shot classify gambar tanpa training data — cukup deskripsi teks. BLIP-2 untuk image captioning otomatis. Visual question answering (VQA) dengan LLaVA lokal. Evaluasi dengan BLEU dan CIDEr score.

Zero-shotVQAImage CaptioningBLEU** transformers

04

Prompt Eng.

#### Prompt Engineering

Seni dan sains berkomunikasi dengan model bahasa — dari zero-shot sederhana hingga agentic reasoning.

[System]
Role & context

+

[Few-shot]
Examples

+

[Query]
Task + constraints

→

[Output]
Structured response

✍️

##### Anatomi Prompt — Zero-shot, One-shot, Few-shot

Pemula

Komponen prompt: system role, context, examples, query, output format. Zero-shot vs few-shot: kapan contoh diperlukan? Pengaruh jumlah example terhadap akurasi. Format output (JSON, markdown, step-by-step) dan kenapa penting.

Zero-shotFew-shotSystem PromptOutput Format

**

##### Chain-of-Thought, ReAct & Tree-of-Thought

Intermediate

CoT "Let's think step by step" meningkatkan akurasi reasoning 40%+ di GSM8K. ReAct (Reason + Act) untuk agen yang bisa menggunakan tools. Tree-of-Thought untuk eksplorasi solusi alternatif. Kapan masing-masing digunakan dan tradeoff-nya.

Chain-of-ThoughtReActTree-of-ThoughtReasoningAgents

    # Chain-of-Thought prompt
    prompt = """Soal: Berapa 17 × 24?

    Mari kita hitung langkah demi langkah:
    1. 17 × 20 = 340
    2. 17 × 4 = 68
    3. Total: 340 + 68 = 408

    Jawaban: 408"""

**️

##### Prompt Injection, Jailbreak & Red Teaming

Advanced

Bagaimana prompt injection bekerja — menyusupkan instruksi dalam konten user untuk override system prompt. Teknik jailbreak klasik (DAN, roleplay, token smuggling) dan mengapa model modern lebih tahan. Red teaming methodology: structured adversarial testing pada produksi LLM.

Prompt InjectionJailbreakRed TeamingAI SafetyAdversarial

**

##### Praktik: Prompt Optimization Lab

PemulaIntermediate

Pipeline evaluasi prompt secara sistematis: tulis prompt → jalankan → score dengan rubric → iterate. Automatic prompt optimization dengan DSPy. A/B testing prompt di production. Membangun prompt library yang maintainable untuk tim.

DSPyPrompt EvaluationA/B TestingRubric ScoringPrompt Library

## Konten Dinamis dan Interaktif

> Data berikut diekstrak dari JavaScript runtime untuk `scaffolds-generative`, termasuk teks yang baru muncul setelah interaksi.

- **title:** Generative AI
- **category:** Generative & Multimodal AI
- **icon:** fas fa-wand-magic-sparkles
- **status:** Scaffold diperkaya
- **summary:** Course scaffold untuk memahami model generatif, prompting, pipeline output, evaluasi kualitas, risiko, dan workflow kreatif sebelum course final diaktifkan.
- **duration:** 5 module draft
- **level:** Foundation to applied
- **contentProgress:** 28
- **progressTitle:** Status Generative AI
- **progressCopy:** Outline materi, latihan, kuis, dan diskusi sudah diperkaya di scaffold. File canonical final belum dibuat.
- **sectionTitle:** Outline Generative AI scaffold
- **actionLabel:** Buka activity
#### modules

#### Generative AI Overview

- **slug:** generative-ai-overview
- **title:** Generative AI Overview
- **summary:** Memahami apa itu AI generatif, jenis output, use case, batasan, dan risiko dasar.
- **materi:** Bahas perbedaan model diskriminatif dan generatif, contoh teks/gambar/audio/kode, pola input-output, serta batasan seperti halusinasi dan bias.
- **latihan:** Petakan tiga produk AI generatif yang sering ditemui. Untuk tiap produk, tulis input, output, manfaat, risiko, dan bentuk human review yang masuk akal.
- **kuis:** Uji pemahaman tentang karakteristik model generatif, jenis output, risiko umum, dan alasan manusia tetap perlu memeriksa hasil.
- **diskusi:** Diskusikan kapan AI generatif layak dipakai untuk mempercepat pekerjaan, dan kapan hasilnya harus diperlakukan sebagai draft saja.

#### Prompting Workflow

- **slug:** prompting-workflow
- **title:** Prompting Workflow
- **summary:** Menyusun prompt yang jelas, memberi konteks, menentukan format output, dan melakukan iterasi.
- **materi:** Pelajari struktur prompt: tujuan, konteks, batasan, contoh, format jawaban, dan kriteria kualitas. Tekankan bahwa prompting adalah workflow iteratif, bukan sekali tulis.
- **latihan:** Ubah prompt samar menjadi prompt terstruktur untuk tugas membuat ringkasan, rubric evaluasi, dan ide konten. Bandingkan versi awal dan versi hasil iterasi.
- **kuis:** Evaluasi komponen prompt yang hilang, pilihan format output, dan strategi memperbaiki respons yang terlalu umum atau tidak sesuai konteks.
- **diskusi:** Bagikan contoh prompt yang pernah gagal. Jelaskan bagian mana yang kurang jelas dan bagaimana kamu memperbaikinya.

#### Generation Pipeline

- **slug:** generation-pipeline
- **title:** Generation Pipeline
- **summary:** Mengenali alur dari ide, data/konteks, generation, seleksi, revisi, hingga publish.
- **materi:** Bahas pipeline praktis: brief, referensi, prompt, generasi variasi, kurasi, editing, validasi, dan delivery. Tekankan dokumentasi keputusan agar output bisa diaudit.
- **latihan:** Rancang pipeline sederhana untuk membuat materi promosi acara fellowship: brief, target audiens, prompt, variasi output, checklist review, dan kriteria final.
- **kuis:** Uji urutan pipeline, titik review manusia, penggunaan referensi, dan alasan output generatif tidak langsung dianggap final.
- **diskusi:** Apa titik paling rawan dalam pipeline generatif: brief yang salah, prompt yang kabur, output tidak valid, atau review yang terburu-buru?

#### Output Evaluation

- **slug:** output-evaluation
- **title:** Output Evaluation
- **summary:** Membangun rubric untuk menilai factuality, relevansi, safety, gaya, dan kesesuaian tujuan.
- **materi:** Kenalkan evaluasi output generatif memakai rubric sederhana: akurasi fakta, kelengkapan, relevansi, tone, keamanan, bias, dan kebutuhan verifikasi sumber.
- **latihan:** Nilai dua contoh output AI menggunakan rubric 1-5. Tulis alasan skor, bagian yang perlu diperbaiki, dan instruksi revisi yang lebih spesifik.
- **kuis:** Uji pemilihan metrik evaluasi, tanda output berisiko, dan cara memberi feedback revisi yang bisa dieksekusi model.
- **diskusi:** Untuk output yang terlihat bagus tetapi belum tentu benar, apa standar minimal sebelum dibagikan ke publik atau dipakai mengambil keputusan?

#### Creative Workflow

- **slug:** creative-workflow
- **title:** Creative Workflow
- **summary:** Menggunakan AI generatif sebagai partner ide, variasi, kurasi, dan polishing tanpa melepas kendali kreatif.
- **materi:** Bahas workflow kreatif: divergen untuk ide, konvergen untuk seleksi, refinement untuk kualitas, dan guardrail agar style, etika, serta brand tetap konsisten.
- **latihan:** Buat workflow kreatif untuk satu aset kampanye. Tentukan brief, batasan brand, variasi yang diminta, rubric seleksi, dan final editing oleh manusia.
- **kuis:** Uji pemahaman tentang eksplorasi ide, kurasi variasi, menjaga tone brand, dan membedakan bantuan AI dari keputusan kreatif manusia.
- **diskusi:** Bagaimana menjaga orisinalitas, consent, dan rasa tanggung jawab saat memakai AI untuk karya kreatif?
