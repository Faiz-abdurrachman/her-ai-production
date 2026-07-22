# Foundation Models: Fondasi AI Serbaguna

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/chapters/01-materi.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

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

## Lampiran Sumber HTML Lengkap

````html
<div class="chapter-content fade-in ai-modern-chapter">
    <header class="ai-modern-chapter-hero">
        <span>Topik 1 · 25 menit</span>
        <h2>Foundation Models: Fondasi AI Serbaguna</h2>
        <p>Foundation model bukan aplikasi final. Ia adalah model dasar yang dapat diadaptasi menjadi chatbot, assistant, search system, coding helper, evaluator, atau workflow lain.</p>
        <div class="ai-modern-objectives">
            <strong>Tujuan pembelajaran</strong>
            <ul>
                <li>Menjelaskan perbedaan task-specific model, pretrained model, foundation model, dan AI application.</li>
                <li>Membedakan pretraining, adaptation, fine-tuning, prompting, RAG, dan tool augmentation.</li>
                <li>Membaca trade-off API-hosted, open-weight hosted, dan local/on-device model.</li>
                <li>Memilih model berdasarkan kebutuhan, bukan popularitas.</li>
            </ul>
        </div>
    </header>

    <section class="ai-modern-section">
        <div class="ai-modern-question">
            <i class="fas fa-circle-question"></i>
            <p><strong>Pertanyaan pemantik:</strong> Jika sebuah model dapat merangkum, menerjemahkan, membuat kode, dan menjawab pertanyaan, bagian mana yang sebenarnya model, dan bagian mana yang sudah menjadi sistem aplikasi?</p>
        </div>
        <div class="ai-modern-flow" aria-label="Alur foundation model">
            <span>Task-specific model<br><small>Satu tugas</small></span>
            <i class="fas fa-arrow-right"></i>
            <span>Pretrained model<br><small>Representasi umum</small></span>
            <i class="fas fa-arrow-right"></i>
            <span>Foundation model<br><small>Bisa diadaptasi</small></span>
            <i class="fas fa-arrow-right"></i>
            <span>AI application<br><small>Model + data + tools + UI</small></span>
        </div>
        <p><strong>Task-specific model</strong> dilatih untuk satu tugas sempit, misalnya mendeteksi spam. <strong>Pretrained model</strong> mempelajari representasi umum dari data luas. <strong>Foundation model</strong> adalah model yang dilatih pada data besar dan dapat diadaptasi ke banyak tugas. Sementara itu, <strong>AI application</strong> adalah sistem lengkap: foundation model, prompt, dokumen, tools, workflow, interface, evaluasi, dan manusia yang mengawasi.</p>
        <p>Kesalahan umum adalah menyamakan foundation model dengan chatbot. Chatbot hanyalah salah satu bentuk aplikasi di atas foundation model. Model dasarnya bisa sama, tetapi aplikasi yang dibangun di atasnya dapat sangat berbeda.</p>
    </section>

    <section class="ai-modern-section">
        <h3>Pretraining dan Adaptation</h3>
        <div class="ai-modern-pipeline">
            <span>Data luas</span><span>Pretraining</span><span>Base model</span><span>Adaptation</span><span>AI application</span>
        </div>
        <p>Pretraining biasanya memakai <em>self-supervised learning</em>: model belajar dari pola data tanpa label manual satu per satu. Pada language model, contoh paling populer adalah <strong>next-token prediction</strong>, yaitu menebak token berikutnya. Pada sebagian model pemahaman bahasa, konsep seperti <strong>masked modeling</strong> dipakai untuk menebak token yang sengaja disembunyikan.</p>
        <div class="ai-modern-card-grid">
            <article><h4>Instruction tuning</h4><p>Mengajari model mengikuti format instruksi manusia, bukan hanya melanjutkan teks.</p></article>
            <article><h4>Fine-tuning</h4><p>Melatih model pada dataset domain tertentu agar perilakunya lebih sesuai kebutuhan.</p></article>
            <article><h4>Preference optimization</h4><p>Menggunakan preferensi manusia atau evaluator untuk membuat output lebih disukai dan aman.</p></article>
            <article><h4>Prompting, RAG, tools</h4><p>Mengubah konteks dan kemampuan sistem tanpa selalu mengubah bobot model.</p></article>
        </div>
        <div class="ai-modern-callout">
            <i class="fas fa-lightbulb"></i>
            <div><strong>Analogi sederhana</strong><p>Foundation model seperti bahan baku serbaguna. Prompting adalah instruksi penggunaan, RAG adalah buku referensi yang dibuka saat bekerja, fine-tuning adalah pelatihan tambahan, dan aplikasi adalah produk yang akhirnya digunakan peserta.</p></div>
        </div>
    </section>

    <section class="ai-modern-section">
        <h3>Scale, Data, Compute, dan Capability</h3>
        <p>Kemampuan model dipengaruhi oleh jumlah parameter, jumlah dan kualitas token, compute, arsitektur, post-training, inference-time compute, dan evaluasi. Model besar sering kuat, tetapi tidak otomatis paling tepat. Untuk chatbot fellowship, model lebih kecil dengan retrieval dokumen resmi, evaluasi yang baik, dan guardrail sering lebih berguna daripada model besar yang tidak memahami kebijakan internal.</p>
        <div class="ai-modern-comparison">
            <article><strong>Model lebih besar</strong><span>Bisa lebih fleksibel, tetapi biaya dan latency naik.</span></article>
            <article><strong>Data lebih relevan</strong><span>Membantu domain spesifik dan bahasa lokal.</span></article>
            <article><strong>Post-training kuat</strong><span>Membuat model lebih patuh instruksi dan aman.</span></article>
            <article><strong>Evaluasi matang</strong><span>Mencegah keputusan hanya berdasar demo yang terlihat lancar.</span></article>
        </div>
    </section>

    <section class="ai-modern-section">
        <h3>Modalitas dan Pilihan Deployment</h3>
        <p>Foundation model tidak hanya teks. Ada language model, vision model, speech/audio model, vision-language model, multimodal model, embedding model, image generation model, dan video generation model. Pilihan model perlu mengikuti input-output sistem, risiko, biaya, latency, dan kebutuhan data.</p>
        <div class="ai-modern-table-wrap">
            <table class="ai-modern-table">
                <thead><tr><th>Dimensi</th><th>API-hosted</th><th>Open-weight hosted</th><th>Local/on-device</th></tr></thead>
                <tbody>
                    <tr><td>Setup</td><td>Cepat</td><td>Menengah</td><td>Paling teknis</td></tr>
                    <tr><td>Kontrol</td><td>Terbatas</td><td>Lebih besar</td><td>Paling besar</td></tr>
                    <tr><td>Privasi</td><td>Tergantung kontrak</td><td>Bisa dikontrol</td><td>Data dapat tetap lokal</td></tr>
                    <tr><td>Biaya</td><td>Per penggunaan</td><td>Provider/infra</td><td>Hardware sendiri</td></tr>
                    <tr><td>Latency</td><td>Tergantung jaringan</td><td>Tergantung hosting</td><td>Dekat, tetapi hardware terbatas</td></tr>
                    <tr><td>Customization</td><td>Prompt/RAG/fine-tune tertentu</td><td>Lebih fleksibel</td><td>Fleksibel tetapi mahal dirawat</td></tr>
                    <tr><td>Maintenance</td><td>Vendor</td><td>Tim + provider</td><td>Tim sendiri</td></tr>
                    <tr><td>Vendor dependency</td><td>Tinggi</td><td>Menengah</td><td>Lebih rendah</td></tr>
                </tbody>
            </table>
        </div>
        <p><strong>Catatan:</strong> open-weight tidak otomatis berarti data training, metode alignment, dan proses development sepenuhnya terbuka. Baca lisensi dan model card sebelum memakai model.</p>
    </section>

    <section class="ai-modern-section">
        <h3>Model Cards dan Studi Platform</h3>
        <p>Model card membantu membaca intended use, out-of-scope use, language coverage, benchmark, limitations, license, hardware requirement, context window, dan safety notes. OpenAI, Anthropic, dan Gemini dapat dipahami sebagai contoh platform API-hosted; Meta Llama sebagai keluarga open-weight; Hugging Face Hub sebagai ekosistem discovery/model card; Ollama sebagai pengalaman menjalankan model lokal. Ini bukan promosi vendor, melainkan peta keputusan.</p>
        <blockquote class="ai-modern-quote">"We call these models foundation models." <cite>Bommasani et al., 2021</cite></blockquote>
        <p>Kutipan ini menekankan bahwa model fondasi menjadi basis banyak sistem. Karena basisnya sama, kemampuan dan risiko seperti bias, batas bahasa, atau ketergantungan vendor juga dapat terbawa ke aplikasi turunan.</p>
    </section>

    <section class="ai-modern-active" data-modern-check="foundation-system">
        <div>
            <span>Belajar Aktif</span>
            <h3>Quick Check: model atau sistem?</h3>
            <p>Sebuah universitas memakai model bahasa melalui API, menambahkan dokumen akademik lewat retrieval, lalu membangun dashboard mahasiswa. Mana foundation model dan mana AI system?</p>
        </div>
        <button type="button" data-modern-reveal> Tampilkan feedback</button>
        <p class="ai-modern-feedback" hidden>Foundation model adalah model bahasa yang dipanggil lewat API. AI system adalah kombinasi API, retrieval dokumen akademik, dashboard, aturan akses, evaluasi, logging, dan human support.</p>
    </section>

    <section class="ai-modern-section">
        <h3>Mini Challenge</h3>
        <p>Buat model selection matrix untuk chatbot layanan fellowship. Pakai kriteria: Bahasa Indonesia, privasi data, biaya, latency, tool calling, deployment lokal, dan kemudahan evaluasi. Lanjutkan di latihan nomor 3 untuk mengisi matriks lebih lengkap.</p>
        <div class="ai-modern-warning"><i class="fas fa-triangle-exclamation"></i><span><strong>Common mistakes:</strong> memilih model karena sedang populer, mengabaikan lisensi, menganggap open-weight selalu aman, dan tidak menguji bahasa Indonesia.</span></div>
        <div class="ai-modern-summary"><strong>Ringkasan:</strong> foundation model adalah bahan dasar serbaguna; aplikasi AI modern membutuhkan data, tools, evaluasi, interface, dan human oversight.</div>
        <dl class="ai-modern-glossary"><dt>Foundation model</dt><dd>Model dasar yang dapat diadaptasi ke banyak tugas.</dd><dt>RAG</dt><dd>Retrieval-Augmented Generation, teknik memberi sumber eksternal saat model menjawab.</dd><dt>Model card</dt><dd>Dokumen ringkas tentang penggunaan, batasan, evaluasi, dan lisensi model.</dd></dl>
        <p class="ai-modern-references"><strong>Referensi:</strong> Bommasani et al. (2021), Brown et al. (2020), Hoffmann et al. (2022), Meta Llama model cards, Hugging Face Hub documentation.</p>
        <a class="ai-modern-cta" href="javascript:void(0)" onclick="window.loadModernChapter(2)">Lanjut ke Transformer <i class="fas fa-arrow-right"></i></a>
    </section>
</div>

````
