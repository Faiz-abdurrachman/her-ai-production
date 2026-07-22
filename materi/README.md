# Materi HerAI Fellowship

Folder ini adalah hasil ekspor materi yang telah tersedia di codebase HerAI. Ekspor dibuat berlapis agar nyaman dibaca sekaligus dapat diaudit:

1. **Materi terkurasi per course** — file utama seperti `pengantar-ai.md`.
2. **Outline course dan specialization** — seluruh scaffold, termasuk yang masih placeholder.
3. **Arsip halaman** — satu Markdown untuk setiap halaman HTML sumber materi.
4. **Arsip sumber dinamis** — JavaScript lengkap di dalam Markdown untuk menjaga teks interaktif yang tidak selalu tampak pada HTML.
5. **MANIFEST.md** — pemetaan sumber, output, ukuran, dan checksum.

## Materi Utama

- [Katalog dan Cakupan Kurikulum HerAI](./00-katalog-dan-cakupan.md) — 3 sumber HTML
- [AI Fundamentals & Advanced — Overview](./01-foundation-core-ai/00-ai-fundamentals-advanced-overview.md) — 1 sumber HTML
- [Pengantar AI](./01-foundation-core-ai/01-pengantar-ai.md) — 5 sumber HTML
- [Pemrograman Python untuk AI](./01-foundation-core-ai/02-python-untuk-ai.md) — 27 sumber HTML
- [Konsep AI Modern](./01-foundation-core-ai/03-konsep-ai-modern.md) — 8 sumber HTML
- [Reasoning AI](./01-foundation-core-ai/04-reasoning-ai.md) — 13 sumber HTML
- [Evaluation AI](./01-foundation-core-ai/05-evaluation-ai.md) — 10 sumber HTML
- [Evolution of AI](./01-foundation-core-ai/06-evolution-of-ai.md) — 11 sumber HTML
- [Math for AI](./01-foundation-core-ai/07-math-for-ai.md) — 5 sumber HTML
- [Machine Learning](./01-foundation-core-ai/08-machine-learning.md) — 17 sumber HTML
- [Natural Language Processing](./02-data-engineering-domains/01-natural-language-processing.md) — 5 sumber HTML
- [Computer Vision](./02-data-engineering-domains/02-computer-vision.md) — 11 sumber HTML
- [Generative AI](./03-generative-multimodal-ai/01-generative-ai.md) — 1 sumber HTML
- [AI for Industries](./05-business-industry-applications/01-ai-for-industries.md) — 1 sumber HTML

## Outline Course dan Specialization

Terdapat **28** scaffold route: **8** berstatus selain placeholder dan **20** masih berstatus placeholder.

- [Agentic AI](./04-outline-course-dan-spesialisasi/ai-lab-agentic-ai.md) — Placeholder route
- [AI for Culture](./04-outline-course-dan-spesialisasi/ai-lab-ai-culture.md) — Placeholder route
- [Back-end](./04-outline-course-dan-spesialisasi/ai-lab-back-end.md) — Placeholder route
- [Bioinformatics](./04-outline-course-dan-spesialisasi/ai-lab-bioinformatics.md) — Placeholder route
- [Business Insight](./04-outline-course-dan-spesialisasi/ai-lab-business-insight.md) — Placeholder route
- [Data Engineering](./04-outline-course-dan-spesialisasi/ai-lab-data-engineering.md) — Placeholder route
- [Data Science](./04-outline-course-dan-spesialisasi/ai-lab-data-science.md) — Placeholder route
- [Deep Learning](./04-outline-course-dan-spesialisasi/ai-lab-deep-learning.md) — Placeholder route
- [Deployment](./04-outline-course-dan-spesialisasi/ai-lab-deployment.md) — Placeholder route
- [Front-end](./04-outline-course-dan-spesialisasi/ai-lab-front-end.md) — Placeholder route
- [Generative AI](./04-outline-course-dan-spesialisasi/ai-lab-gen.md) — Scaffold diperkaya
- [AI for Geospatial](./04-outline-course-dan-spesialisasi/ai-lab-geospatial.md) — Placeholder route
- [AI for Healthcare](./04-outline-course-dan-spesialisasi/ai-lab-healthcare.md) — Placeholder route
- [Infrastructure](./04-outline-course-dan-spesialisasi/ai-lab-infrastructure.md) — Placeholder route
- [LLM](./04-outline-course-dan-spesialisasi/ai-lab-llm.md) — Placeholder route
- [AI for Manufacturing](./04-outline-course-dan-spesialisasi/ai-lab-manufacturing.md) — Placeholder route
- [Multimodal LLM](./04-outline-course-dan-spesialisasi/ai-lab-multimodal-llm.md) — Placeholder route
- [People & Business Mgt](./04-outline-course-dan-spesialisasi/ai-lab-people-business-mgt.md) — Placeholder route
- [Reinforcement Learning](./04-outline-course-dan-spesialisasi/ai-lab-reinforcement-learning.md) — Placeholder route
- [UI/UX Design Thinking](./04-outline-course-dan-spesialisasi/ai-lab-ui-ux.md) — Placeholder route
- [VLM](./04-outline-course-dan-spesialisasi/ai-lab-vlm.md) — Placeholder route
- [Cara AI Menalar, Merencanakan, dan Menggunakan Tools](./04-outline-course-dan-spesialisasi/ai-reasoning.md) — Scaffold aktif dengan konten diperkaya
- [Computer Vision Track](./04-outline-course-dan-spesialisasi/specialization-computer-vision.md) — Track scaffold
- [Medical & Biology AI Track](./04-outline-course-dan-spesialisasi/specialization-medical-biology-ai.md) — Track scaffold
- [MLOps & Deployment Track](./04-outline-course-dan-spesialisasi/specialization-mlops-deployment.md) — Track scaffold
- [Multimodal LLM Track](./04-outline-course-dan-spesialisasi/specialization-multimodal-llm.md) — Track scaffold
- [NLP & LLM Track](./04-outline-course-dan-spesialisasi/specialization-nlp-llm.md) — Track scaffold
- [Speech Recognition Track](./04-outline-course-dan-spesialisasi/specialization-speech-recognition.md) — Track scaffold

## Ringkasan Cakupan

- Halaman HTML materi yang dikonversi: **121**
- Sumber JavaScript yang diarsipkan tanpa potongan: **35**
- File materi utama terkurasi: **14**
- File outline course/track: **28**

## Batasan yang Ditemukan

- Folder `business-industry-applications/*` dan `specialization-tracks/*` berisi `.gitkeep`; konten yang tersedia untuk area tersebut saat ini berupa scaffold JavaScript, bukan halaman final.
- Beberapa course memiliki versi canonical dan legacy. Keduanya tetap dimasukkan agar tidak ada materi lama yang hilang.
- Materi interaktif memiliki state browser dan perilaku UI. Teks/data sumbernya disimpan lengkap, tetapi state jawaban pengguna tentu tidak termasuk.
- Materi yang mungkin hanya tersimpan di Google Sheets/GAS production dan tidak ada di repository tidak dapat diekspor dari filesystem ini.

Lihat [MANIFEST.md](./MANIFEST.md) untuk audit lengkap.
