# Sumber Dinamis: course-placeholder.js

> Sumber: `js/frontend/fellow-dashboard/course-placeholder.js`
> Arsip lengkap JavaScript pembentuk materi/interaksi. Disimpan tanpa potongan agar string, soal, pembahasan, konfigurasi, dan variasi interaktif tetap terlacak.

````javascript
(function () {
    const ACTIVITY_ORDER = ["materi", "latihan", "kuis", "diskusi"];
    const ACTIVITY_CONTENT = {
        materi: {
            title: "Materi scaffold siap diisi tim konten",
            copy: "Tab Materi menampilkan outline module/chapter awal. Saat course siap, ganti scaffold ini ke file course final atau lanjutkan dari struktur ini.",
            label: "Draft module/chapter",
            heading: "Outline materi awal"
        },
        latihan: {
            title: "Latihan belum final, tapi slot activity sudah disiapkan",
            copy: "Gunakan tab ini sebagai placeholder latihan agar struktur course konsisten tanpa mengirim peserta ke halaman under-development.",
            label: "Draft latihan",
            heading: "Rencana latihan"
        },
        kuis: {
            title: "Kuis belum final, tapi slot evaluasi sudah disiapkan",
            copy: "Tab ini menandai tempat kuis nanti dipasang. Route tetap berada di course scaffold supaya peserta tidak kehilangan konteks.",
            label: "Draft evaluasi",
            heading: "Rencana kuis"
        },
        diskusi: {
            title: "Diskusi belum final, tapi ruang activity sudah disiapkan",
            copy: "Tab ini menjaga pola Materi, Latihan, Kuis, Diskusi tetap lengkap sambil menunggu forum course final.",
            label: "Draft diskusi",
            heading: "Rencana diskusi"
        }
    };

    function slugify(value) {
        return String(value)
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    function makeModule(title, summary) {
        const slug = slugify(title);
        return {
            slug,
            title,
            summary,
            materi: `Draft materi untuk ${title}: konsep utama, istilah penting, contoh penerapan, dan checkpoint pemahaman.`,
            latihan: `Draft latihan untuk ${title}: skenario praktik terarah yang bisa dikerjakan peserta secara bertahap.`,
            kuis: `Draft kuis untuk ${title}: evaluasi singkat untuk menguji pemahaman konsep dan penerapan.`,
            diskusi: `Draft diskusi untuk ${title}: pertanyaan pemantik, refleksi, dan ruang tanya jawab dengan tim.`
        };
    }

    function modules(items) {
        return items.map(item => makeModule(item[0], item[1]));
    }

    function renderQuizQuestions(questions) {
        return `<div class="reasoning-scaffold-quiz">
            ${questions.map((question, index) => `
                <article class="reasoning-scaffold-question" data-correct-answer="${escapeHtml(question.answer)}" data-explanation="${escapeHtml(question.explanation)}">
                    <h3><span>${index + 1}</span>${escapeHtml(question.question)}</h3>
                    <div class="reasoning-scaffold-options" role="radiogroup" aria-label="Pilihan jawaban soal ${index + 1}">
                        ${question.options.map((option, optionIndex) => {
                            const optionLetter = String.fromCharCode(65 + optionIndex);
                            return `<label><input type="radio" name="reasoning-question-${index}" value="${optionLetter}"><span><b>${optionLetter}</b>${escapeHtml(option)}</span></label>`;
                        }).join("")}
                    </div>
                    <button type="button" class="reasoning-scaffold-check-button" data-reasoning-check>
                        <i class="fas fa-circle-check" aria-hidden="true"></i> Periksa jawaban
                    </button>
                    <p class="reasoning-scaffold-feedback" data-reasoning-feedback aria-live="polite" hidden></p>
                </article>
            `).join("")}
        </div>`;
    }

    function renderExerciseCards(exercises) {
        return `<section class="reasoning-scaffold-exercises">
            ${exercises.map((exercise, index) => `
                <article>
                    <span>Latihan ${index + 1}</span>
                    <h3>${escapeHtml(exercise.title)}</h3>
                    <div class="reasoning-scaffold-exercise-body">${exercise.body}</div>
                    <button type="button" class="reasoning-scaffold-reveal-button" data-reasoning-reveal aria-expanded="false">
                        <i class="fas fa-lightbulb" aria-hidden="true"></i> Lihat pembahasan
                    </button>
                    <div class="reasoning-scaffold-exercise-answer" data-reasoning-answer hidden>
                        <strong>Pembahasan</strong>${exercise.answer}
                    </div>
                </article>
            `).join("")}
        </section>`;
    }

    function renderDiscussionPrompt(topic, guides, context, reflection, responseGuide) {
        return `<div class="reasoning-scaffold-discussion">
            <i class="far fa-comments" aria-hidden="true"></i>
            <div>
                <span>Topik diskusi</span>
                <h3>${escapeHtml(topic)}</h3>
                ${context ? `<p>${escapeHtml(context)}</p>` : ""}
                <p>Gunakan pertanyaan berikut untuk menjaga diskusi tetap terarah:</p>
                <ul>${guides.map(guide => `<li>${escapeHtml(guide)}</li>`).join("")}</ul>
                ${reflection ? `<div class="reasoning-scaffold-reflection"><strong>Refleksi pribadi</strong><p>${escapeHtml(reflection)}</p></div>` : ""}
                ${responseGuide ? `<div class="reasoning-scaffold-response-guide"><strong>Tanggapi peserta lain</strong><p>${escapeHtml(responseGuide)}</p></div>` : ""}
            </div>
        </div>`;
    }

    const REASONING_REFERENCES = `
        <section class="reasoning-scaffold-references" aria-labelledby="reasoning-references-title">
            <h3 id="reasoning-references-title">Referensi Singkat</h3>
            <ol>
                <li>Wang, L., dkk. (2023). <a href="https://arxiv.org/abs/2305.04091" target="_blank" rel="noopener noreferrer">Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>. arXiv:2305.04091.</li>
                <li>Wei, J., dkk. (2022). <a href="https://arxiv.org/abs/2201.11903" target="_blank" rel="noopener noreferrer">Chain-of-Thought Prompting Elicits Reasoning in Large Language Models <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>. arXiv:2201.11903.</li>
                <li>Kojima, T., dkk. (2022). <a href="https://arxiv.org/abs/2205.11916" target="_blank" rel="noopener noreferrer">Large Language Models are Zero-Shot Reasoners <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>. arXiv:2205.11916.</li>
                <li>Schick, T., dkk. (2023). <a href="https://arxiv.org/abs/2302.04761" target="_blank" rel="noopener noreferrer">Toolformer: Language Models Can Teach Themselves to Use Tools <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>. arXiv:2302.04761.</li>
                <li>Yao, S., dkk. (2022). <a href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noopener noreferrer">ReAct: Synergizing Reasoning and Acting in Language Models <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>. arXiv:2210.03629.</li>
                <li>Mialon, G., dkk. (2023). <a href="https://arxiv.org/abs/2302.07842" target="_blank" rel="noopener noreferrer">Augmented Language Models: a Survey <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>. arXiv:2302.07842.</li>
            </ol>
        </section>`;

    const REASONING_OVERVIEW = `
        <div class="reasoning-scaffold-overview">
            <section class="reasoning-scaffold-objectives">
                <div class="reasoning-scaffold-section-heading">
                    <i class="fas fa-bullseye" aria-hidden="true"></i>
                    <div><span>Tujuan pembelajaran</span><h3>Setelah menyelesaikan materi, peserta mampu:</h3></div>
                </div>
                <ol>
                    <li>Menjelaskan reasoning dalam konteks AI tanpa menyamakannya dengan pikiran manusia.</li>
                    <li>Menjelaskan bagaimana LLM memanfaatkan token dan konteks untuk menghasilkan respons.</li>
                    <li>Membedakan reasoning, planning, action, observation, update, dan answer.</li>
                    <li>Mengidentifikasi informasi relevan, batasan, informasi yang hilang, dan asumsi.</li>
                    <li>Memecah masalah besar menjadi subtugas yang dapat dikerjakan dan diperiksa.</li>
                    <li>Menyusun serta membedakan rencana statis dan dinamis.</li>
                    <li>Menjelaskan fungsi Chain-of-Thought dan langkah penyelesaian terstruktur.</li>
                    <li>Memahami bahwa penjelasan langkah bukan akses penuh ke proses internal model.</li>
                    <li>Menentukan kapan tool eksternal diperlukan dan kapan tidak diperlukan.</li>
                    <li>Memilih tool yang sesuai berdasarkan tujuan, data, presisi, dan izin.</li>
                    <li>Memeriksa observation dan output tool sebelum menggunakannya.</li>
                    <li>Menilai apakah jawaban AI cukup dapat dipercaya untuk konteks tugas.</li>
                </ol>
            </section>

            <section class="reasoning-scaffold-integrated">
                <div class="reasoning-scaffold-section-heading">
                    <i class="fas fa-arrows-to-circle" aria-hidden="true"></i>
                    <div><span>Gambaran besar</span><h3>Satu alur, enam tahap yang saling terhubung</h3></div>
                </div>
                <div class="reasoning-scaffold-flow" aria-label="Alur Reason, Plan, Act, Observe, Update, Answer">
                    <div><strong>Reason</strong><span>Memahami masalah dan informasi</span></div>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    <div><strong>Plan</strong><span>Menentukan langkah</span></div>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    <div><strong>Act</strong><span>Menjawab atau memakai tool</span></div>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    <div><strong>Observe</strong><span>Membaca hasil tindakan</span></div>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    <div><strong>Update</strong><span>Memperbaiki rencana</span></div>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                    <div><strong>Answer</strong><span>Memberikan hasil akhir</span></div>
                </div>
            </section>

            <section class="reasoning-scaffold-case">
                <span>Studi kasus terpadu</span>
                <h3>Apakah anggaran konsumsi cukup?</h3>
                <p><strong>Tugas:</strong> Berdasarkan data peserta di spreadsheet, tentukan apakah anggaran Rp5.000.000 cukup untuk konsumsi Rp32.000 per peserta dan transportasi Rp450.000.</p>
                <dl>
                    <div><dt>Reason</dt><dd>Jumlah peserta belum diketahui; data peserta berada di spreadsheet dan perlu divalidasi.</dd></div>
                    <div><dt>Plan</dt><dd>Baca data, cari duplikasi, hitung peserta valid, hitung konsumsi dan transportasi, lalu bandingkan dengan anggaran.</dd></div>
                    <div><dt>Act</dt><dd>Gunakan spreadsheet atau Python untuk membaca dan menghitung data.</dd></div>
                    <div><dt>Observe</dt><dd>Tool menemukan 130 baris, lima data ganda, dan 125 peserta valid.</dd></div>
                    <div><dt>Update</dt><dd>Gunakan 125 peserta: konsumsi Rp4.000.000, total Rp4.450.000, dan sisa Rp550.000.</dd></div>
                    <div><dt>Answer</dt><dd>Anggaran cukup dengan sisa Rp550.000; jelaskan bahwa lima data ganda tidak dihitung.</dd></div>
                </dl>
            </section>

            <section class="reasoning-scaffold-checklist">
                <h3><i class="fas fa-list-check" aria-hidden="true"></i> Checklist sebelum memberi jawaban</h3>
                <ul>
                    <li>Tujuan dipahami dengan benar.</li><li>Informasi relevan sudah digunakan.</li>
                    <li>Informasi yang hilang dikenali.</li><li>Asumsi sudah disebutkan.</li>
                    <li>Masalah dipecah menjadi langkah.</li><li>Urutan langkah masuk akal.</li>
                    <li>Tool dipilih dengan tepat.</li><li>Parameter tool sesuai.</li>
                    <li>Output tool sudah diperiksa.</li><li>Rencana diperbarui bila diperlukan.</li>
                    <li>Jawaban akhir menjelaskan hasil.</li><li>Ketidakpastian atau keterbatasan disebutkan.</li>
                </ul>
            </section>
            ${REASONING_REFERENCES}
        </div>`;

    const REASONING_MODULES = [
        {
            slug: "how-ai-reasons",
            title: "Bagaimana AI Melakukan Penalaran?",
            summary: "Memahami bagaimana AI menghubungkan instruksi, konteks, informasi yang tersedia, dan hasil sebelumnya untuk menentukan respons berikutnya.",
            duration: "25-30 menit",
            learningObjectives: [
                "Menjelaskan reasoning sebagai perilaku pemecahan masalah pada LLM, bukan pikiran manusia.",
                "Memisahkan fakta, asumsi, langkah, dan kesimpulan.",
                "Menyusun serta memeriksa urutan reasoning untuk kasus numerik dan nonnumerik."
            ],
            references: ["[3]", "[6]"],
            materi: "Model mental reasoning AI: memahami tujuan, memilih informasi relevan, menentukan langkah, menjalankan langkah, memeriksa hasil, lalu menjawab.",
            latihan: "Empat latihan untuk memilah fakta dan asumsi, mengurutkan langkah, memperbaiki perhitungan, serta menentukan prioritas.",
            kuis: "Enam soal interaktif tentang reasoning AI, konteks LLM, fakta dan asumsi, urutan langkah, pemeriksaan, dan keterbatasan jawaban.",
            diskusi: "Bahas apakah jawaban yang runtut berarti AI benar-benar memahami masalah.",
            rich: {
                materi: `
                    <section class="reasoning-scaffold-prose">
                        <p class="reasoning-scaffold-lead">Seorang peserta meminta AI menghitung kebutuhan konsumsi acara. AI menerima jumlah peserta, harga makanan, anggaran, dan beberapa informasi tambahan. Sebelum menjawab, sistem perlu menentukan data mana yang penting, operasi apa yang diperlukan, serta bagaimana memastikan hasilnya masuk akal.</p>
                        <p>Kemampuan menjawab pertanyaan sederhana tidak sama dengan menyelesaikan masalah bertahap. Menjawab "Apa ibu kota Indonesia?" terutama membutuhkan recall atau pengambilan informasi yang dikenali. Menghitung anggaran, menyusun prioritas bug, atau memberi rekomendasi membutuhkan hubungan antara beberapa informasi, batasan, dan tujuan.</p>
                        <div class="reasoning-scaffold-compare">
                            <article><span>Recall</span><h3>Mengambil informasi</h3><p>Menghasilkan fakta atau pola yang sudah dikenali dari konteks dan data pelatihan. Biasanya tidak memerlukan banyak langkah.</p></article>
                            <article><span>Reasoning</span><h3>Menghubungkan informasi</h3><p>Mengolah beberapa fakta dan batasan untuk membentuk kesimpulan, keputusan, urutan tindakan, atau jawaban baru.</p></article>
                        </div>
                        <div class="reasoning-scaffold-callout"><i class="fas fa-brain"></i><p><strong>Istilah praktis, bukan klaim kesadaran.</strong> Dalam konteks LLM, reasoning menggambarkan kemampuan model memakai konteks, pola, langkah perantara, dan hasil sebelumnya untuk menghasilkan respons sesuai tugas. Istilah ini tidak berarti model memiliki pikiran atau pemahaman biologis seperti manusia.</p></div>

                        <section class="reasoning-scaffold-open-section">
                            <span>Apa yang dilakukan LLM?</span><h3>Dari token menuju respons</h3>
                            <p>LLM menerima prompt sebagai rangkaian token, yaitu potongan teks yang dapat berupa kata, bagian kata, atau simbol. Model membentuk representasi hubungan antartoken dalam konteks, lalu memprediksi token berikutnya. Prediksi itu diulang sampai respons selesai.</p>
                            <ol><li>Menerima token dari prompt dan konteks.</li><li>Membentuk representasi hubungan antarbagian informasi.</li><li>Memperkirakan token berikutnya berdasarkan pola yang dipelajari.</li><li>Mengulangi prediksi sampai respons selesai.</li><li>Pada tugas tertentu, menghasilkan langkah perantara yang membantu penyelesaian.</li><li>Jika sistem mendukung tool, memasukkan observation dari tool sebagai konteks tambahan.</li></ol>
                            <p>LLM tetap bekerja melalui prediksi token. Namun rangkaian prediksi itu dapat menghasilkan perilaku yang tampak seperti klasifikasi, perhitungan bertahap, perencanaan, atau diagnosis awal. Penelitian zero-shot reasoning menunjukkan bahwa instruksi untuk bekerja bertahap dapat meningkatkan hasil pada sejumlah tugas yang diuji, tetapi tidak menghilangkan kesalahan [3].</p>
                        </section>

                        <div class="reasoning-scaffold-flow reasoning-scaffold-flow--compact" aria-label="Tahapan penalaran AI">
                            <div><strong>1. Permintaan</strong><span>Kenali tugas dan format</span></div><i class="fas fa-arrow-right" aria-hidden="true"></i>
                            <div><strong>2. Tujuan</strong><span>Tentukan hasil akhir</span></div><i class="fas fa-arrow-right" aria-hidden="true"></i>
                            <div><strong>3. Informasi</strong><span>Pilih fakta relevan</span></div><i class="fas fa-arrow-right" aria-hidden="true"></i>
                            <div><strong>4. Celah</strong><span>Kenali data yang hilang</span></div><i class="fas fa-arrow-right" aria-hidden="true"></i>
                            <div><strong>5. Hubungan</strong><span>Sambungkan informasi</span></div><i class="fas fa-arrow-right" aria-hidden="true"></i>
                            <div><strong>6. Langkah</strong><span>Susun urutan</span></div><i class="fas fa-arrow-right" aria-hidden="true"></i>
                            <div><strong>7. Hasil</strong><span>Kerjakan penyelesaian</span></div><i class="fas fa-arrow-right" aria-hidden="true"></i>
                            <div><strong>8. Periksa</strong><span>Validasi jawaban</span></div>
                        </div>

                        <section class="reasoning-scaffold-open-section"><span>Membaca permintaan</span><h3>Tujuan, format, dan batasan harus dipisahkan</h3><p>Pada permintaan "Buat jadwal belajar AI selama satu minggu, maksimal dua jam per hari, dengan fokus machine learning", tujuan bukan sekadar membuat jadwal. Ada durasi satu minggu, batas dua jam per hari, dan fokus materi tertentu. Jika tingkat kemampuan peserta belum diketahui, AI dapat meminta klarifikasi, memberi beberapa opsi, atau membuat asumsi secara transparan.</p><p>Informasi yang tersedia adalah jumlah hari, batas waktu, dan topik. Informasi yang belum tersedia mencakup tingkat kemampuan, waktu belajar yang disukai, serta bentuk evaluasi. Mengakui celah informasi lebih aman daripada mengarang detail.</p></section>

                        <section class="reasoning-scaffold-example">
                            <span>Contoh anggaran</span><h3>Menghitung konsumsi kegiatan</h3>
                            <p>Anggaran Rp3.000.000, peserta 60 orang, konsumsi Rp35.000 per orang, dan biaya administrasi Rp250.000.</p>
                            <div class="reasoning-scaffold-calculation"><code>60 x Rp35.000 = Rp2.100.000</code><code>Rp2.100.000 + Rp250.000 = Rp2.350.000</code><code>Rp3.000.000 - Rp2.350.000 = Rp650.000</code></div>
                            <p>Kesimpulan: anggaran mencukupi dengan sisa Rp650.000. Jawaban perlu menyebut biaya administrasi; melewatkannya menghasilkan sisa yang salah meskipun perkalian konsumsi benar.</p>
                        </section>
                        <section class="reasoning-scaffold-example"><span>Contoh nonnumerik</span><h3>Menentukan prioritas pekerjaan</h3><p>Tim memiliki tiga pekerjaan: memperbaiki bug login, mengganti ikon, dan menambah animasi. Bug login membuat pengguna tidak dapat masuk. Reasoning menghubungkan dampak, urgensi, dependensi, dan risiko.</p><ol><li>Perbaiki bug login karena memblokir fungsi utama.</li><li>Uji autentikasi agar perbaikan stabil.</li><li>Ganti ikon setelah akses pengguna pulih.</li><li>Tambahkan animasi setelah fungsi utama aman.</li></ol><p>Reasoning tidak hanya dipakai untuk angka. Pola yang sama mendukung prioritas, klasifikasi, perbandingan, rekomendasi, dan diagnosis awal.</p></section>

                        <div class="reasoning-scaffold-table-wrap"><table><thead><tr><th>Elemen</th><th>Arti</th><th>Contoh</th></tr></thead><tbody><tr><td>Fakta</td><td>Informasi yang diberikan atau diverifikasi</td><td>Peserta berjumlah 60</td></tr><tr><td>Asumsi</td><td>Informasi yang dianggap benar agar proses dapat dilanjutkan</td><td>Semua peserta mendapat konsumsi</td></tr><tr><td>Langkah</td><td>Proses mengolah informasi</td><td>Mengalikan peserta dengan biaya</td></tr><tr><td>Kesimpulan</td><td>Hasil yang mengikuti data dan langkah</td><td>Anggaran mencukupi</td></tr></tbody></table></div>
                        <div class="reasoning-scaffold-callout"><i class="fas fa-xmark"></i><p><strong>Contoh buruk:</strong> "Anggaran pasti cukup karena kegiatan sebelumnya juga cukup." Pengalaman lama bukan bukti jika jumlah peserta, harga, atau komponen biaya berubah.</p></div>

                        <div class="reasoning-scaffold-compare"><article><span>Kapan digunakan?</span><h3>Tugas yang membutuhkan hubungan</h3><p>Gunakan reasoning terstruktur untuk masalah multi-langkah, perhitungan, prioritas, perbandingan, diagnosis awal, rekomendasi, atau tugas dengan beberapa batasan.</p></article><article><span>Kapan tidak diperlukan?</span><h3>Tugas sederhana dan langsung</h3><p>Jawaban fakta sederhana, salam, perubahan format teks, atau instruksi satu langkah sering tidak membutuhkan uraian panjang. Struktur berlebihan dapat memperlambat dan membingungkan.</p></article></div>

                        <section class="reasoning-scaffold-open-section"><span>Kesalahan umum</span><h3>Bahasa percaya diri dapat menyembunyikan masalah</h3><ol><li>Salah memahami tujuan pengguna.</li><li>Mengabaikan format atau batasan.</li><li>Menggunakan informasi yang tidak relevan.</li><li>Membuat asumsi tersembunyi.</li><li>Mengarang fakta yang tidak tersedia.</li><li>Menjalankan langkah dalam urutan yang salah.</li><li>Salah menghitung atau mencampur satuan.</li><li>Tidak memeriksa hasil.</li><li>Memberi keyakinan terlalu tinggi.</li><li>Menghasilkan penjelasan meyakinkan tetapi tidak valid.</li></ol></section>
                        <div class="reasoning-scaffold-callout"><i class="fas fa-triangle-exclamation"></i><p><strong>Penjelasan yang terdengar meyakinkan bukan bukti bahwa jawabannya benar.</strong> Jawaban tetap dapat salah karena pertanyaan disalahpahami, informasi tidak relevan dipakai, asumsi tidak disebutkan, langkah terlewat, atau perhitungan keliru.</p></div>
                        <section class="reasoning-scaffold-checklist"><h3><i class="fas fa-list-check"></i> Cara memeriksa reasoning AI</h3><ul><li>Apakah AI menjawab pertanyaan yang benar?</li><li>Apakah informasi yang dipakai tersedia?</li><li>Apakah asumsi disebutkan?</li><li>Apakah urutan langkah masuk akal?</li><li>Apakah perhitungan dapat diulang?</li><li>Apakah kesimpulan mengikuti data?</li><li>Apakah alternatif penting dipertimbangkan?</li><li>Apakah tingkat keyakinannya sesuai?</li></ul></section>
                        <section class="reasoning-scaffold-open-section"><span>Ketika informasi belum lengkap</span><h3>Jangan menutup celah dengan tebakan tersembunyi</h3><p>AI memiliki beberapa pilihan yang lebih aman. Sistem dapat meminta klarifikasi jika data menentukan hasil, menawarkan beberapa skenario jika ada nilai yang masuk akal, menyebutkan asumsi secara eksplisit, atau memberikan solusi sementara dengan batasan. Contohnya, jika jumlah peserta belum pasti, jawaban dapat menampilkan rumus biaya per peserta dan dua skenario kehadiran. Pengguna kemudian mengetahui bagian mana yang faktual dan bagian mana yang masih menunggu konfirmasi.</p></section>
                        <section class="reasoning-scaffold-summary"><h3><i class="fas fa-bookmark"></i> Ringkasan poin penting</h3><p>Reasoning pada LLM adalah perilaku menghubungkan konteks, informasi, dan langkah untuk menyelesaikan tugas. Kualitasnya bergantung pada pemahaman tujuan, data yang benar, asumsi transparan, urutan yang masuk akal, serta pemeriksaan hasil. Reasoning membantu, tetapi tidak membuat AI otomatis benar.</p></section>
                        <p class="reasoning-scaffold-citation">Kojima dkk. melaporkan peningkatan pada beberapa benchmark reasoning melalui instruksi langkah bertahap pada model yang diuji [3]. Kajian augmented language models juga menempatkan reasoning sebagai salah satu cara memperluas kemampuan model bersama tool dan retrieval [6].</p>
                    </section>`,
                latihan: renderExerciseCards([
                    { title: "Pisahkan fakta, asumsi, dan kesimpulan", body: `<p>Acara memiliki anggaran Rp4.000.000 dan 75 pendaftar. Panitia memperkirakan semua pendaftar hadir dan menyimpulkan konsumsi Rp40.000 per orang pasti cukup.</p><p>Tandai fakta, asumsi, dan kesimpulan. Sebutkan data apa yang masih dibutuhkan.</p>`, answer: `<p><strong>Fakta:</strong> anggaran dan jumlah pendaftar. <strong>Asumsi:</strong> semua pendaftar hadir. <strong>Kesimpulan:</strong> konsumsi pasti cukup. Harga konsumsi, biaya lain, dan jumlah peserta terkonfirmasi masih dibutuhkan.</p>` },
                    { title: "Urutkan langkah perhitungan", body: `<p>Urutkan: menghitung sisa; memeriksa komponen biaya; mengalikan peserta dengan biaya konsumsi; membaca anggaran; menjumlahkan seluruh kebutuhan.</p>`, answer: `<ol><li>Baca anggaran dan data peserta.</li><li>Periksa seluruh komponen biaya.</li><li>Hitung konsumsi.</li><li>Jumlahkan kebutuhan.</li><li>Hitung sisa dan periksa hasil.</li></ol>` },
                    { title: "Temukan komponen yang hilang", body: `<p>AI menghitung 60 x Rp35.000 = Rp2.100.000 dan menyatakan sisa dari Rp3.000.000 adalah Rp900.000. Prompt juga menyebut biaya administrasi Rp250.000. Perbaiki jawaban.</p>`, answer: `<p>Total kebutuhan adalah Rp2.350.000 setelah administrasi ditambahkan. Sisa yang benar Rp650.000. Kesalahan terjadi karena satu fakta relevan dilewatkan.</p>` },
                    { title: "Reasoning nonnumerik", body: `<p>Urutkan prioritas: memperbaiki login yang gagal, mengganti ikon, dan menambah animasi. Jelaskan alasan menggunakan dampak, urgensi, dependensi, dan risiko.</p>`, answer: `<p>Perbaiki dan uji login terlebih dahulu karena memblokir akses. Ikon dapat dikerjakan setelah fungsi pulih. Animasi terakhir karena nilainya tidak mengatasi masalah utama dan dapat menambah risiko perubahan.</p>` }
                ]),
                kuis: renderQuizQuestions([
                    { question: "Apa arti reasoning dalam konteks sistem AI?", options: ["AI memiliki kesadaran seperti manusia", "Proses menghubungkan tujuan, konteks, informasi, dan langkah untuk menghasilkan respons", "Kemampuan menghafal semua jawaban", "Proses menjalankan tool tanpa tujuan"], answer: "B", explanation: "Reasoning membantu sistem menghubungkan informasi dengan tujuan dan langkah penyelesaian; ini bukan klaim bahwa AI berpikir seperti manusia." },
                    { question: "Manakah yang termasuk asumsi, bukan fakta?", options: ["Anggaran tertulis Rp3.000.000", "Jumlah peserta pada daftar adalah 60", "Semua peserta pasti hadir", "Harga konsumsi tertulis Rp35.000"], answer: "C", explanation: "Kehadiran penuh belum menjadi fakta jika tidak ada data konfirmasi; asumsi ini perlu disebutkan atau diverifikasi." },
                    { question: "Apa fungsi utama tahap pemeriksaan?", options: ["Membuat jawaban lebih panjang", "Memastikan data, langkah, dan kesimpulan saling sesuai", "Menghilangkan semua asumsi", "Mengganti tujuan pengguna"], answer: "B", explanation: "Pemeriksaan mencari salah tafsir, data keliru, langkah terlewat, dan kesimpulan yang tidak mengikuti hasil." },
                    { question: "AI diminta membuat jadwal tujuh hari maksimal dua jam per hari. Langkah pertama yang paling tepat adalah...", options: ["Langsung membuat 14 jam materi tanpa pembagian", "Mengabaikan batas dua jam agar topik lebih lengkap", "Mengenali tujuan, durasi, batas harian, dan fokus materi", "Memilih tool kalender tanpa memeriksa kebutuhan"], answer: "C", explanation: "Reasoning dimulai dengan memahami tujuan dan batasan. Jadwal yang mengabaikan durasi harian tidak menjawab permintaan yang benar." },
                    { question: "Dalam kasus anggaran, mengapa biaya administrasi harus dimasukkan?", options: ["Karena semua angka di prompt selalu harus dikalikan", "Karena biaya tersebut relevan terhadap total kebutuhan", "Agar jawaban terlihat lebih panjang", "Karena administrasi selalu lebih mahal dari konsumsi"], answer: "B", explanation: "Informasi relevan adalah data yang memengaruhi tujuan. Biaya administrasi mengubah total kebutuhan dan sisa anggaran." },
                    { question: "Mengapa jawaban yang terlihat runtut belum tentu benar?", options: ["Karena semua langkah perantara selalu palsu", "Karena AI tidak boleh menghitung", "Karena langkah dapat memakai asumsi atau data yang salah", "Karena jawaban singkat selalu lebih akurat"], answer: "C", explanation: "Keruntutan membantu verifikasi, tetapi kebenaran tetap bergantung pada pemahaman, data, asumsi, dan perhitungan yang benar." }
                ]),
                diskusi: renderDiscussionPrompt("Apakah AI yang menghasilkan jawaban runtut dapat dikatakan benar-benar memahami masalah?", ["Apa perbedaan jawaban benar dan proses yang benar?", "Dapatkah AI memperoleh jawaban benar secara kebetulan?", "Mengapa bahasa yang meyakinkan dapat berbahaya?", "Kapan hasil AI harus diperiksa manusia?", "Apakah semua asumsi AI perlu ditampilkan?"], "Jawaban runtut memudahkan pemeriksaan, tetapi tidak otomatis membuktikan pemahaman atau kebenaran.", "Ceritakan satu pengalaman ketika jawaban AI terdengar meyakinkan tetapi ternyata salah atau tidak lengkap.", "Pilih satu pendapat peserta lain, lalu ajukan satu pertanyaan kritis tentang bukti, asumsi, atau cara verifikasinya.")
            }
        },
        {
            slug: "planning-and-decomposition",
            title: "Planning dan Problem Decomposition",
            summary: "Memahami cara AI mengubah tujuan besar menjadi subtugas, menyusun urutan tindakan, dan memperbarui rencana saat kondisi berubah.",
            duration: "25-30 menit",
            learningObjectives: [
                "Membedakan reasoning, planning, dan problem decomposition.",
                "Menyusun goal, initial state, constraints, actions, dependencies, dan success criteria.",
                "Membandingkan rencana statis, dinamis, dan hierarkis serta memeriksa kualitasnya."
            ],
            references: ["[1]"],
            materi: "Bedakan reasoning dan planning, lalu gunakan goal, initial state, constraints, subtasks, sequence, serta success criteria untuk menyusun rencana.",
            latihan: "Empat latihan untuk membangun, mengurutkan, menilai, dan memperbarui rencana workshop.",
            kuis: "Enam soal interaktif tentang komponen planning, decomposition, dependencies, success criteria, serta rencana statis dan dinamis.",
            diskusi: "Bahas kapan AI harus mempertahankan atau memperbarui rencana awal.",
            rich: {
                materi: `
                    <section class="reasoning-scaffold-prose">
                        <p class="reasoning-scaffold-lead">Permintaan "buat workshop AI" terlalu besar untuk dikerjakan sebagai satu tindakan. Sistem perlu memecahnya menjadi profil peserta, tujuan belajar, materi, jadwal, fasilitas, latihan, evaluasi, dan anggaran. Planning mengubah tujuan yang kabur menjadi urutan kerja yang dapat dilaksanakan.</p>
                        <div class="reasoning-scaffold-compare"><article><span>Reasoning</span><p>Apa masalahnya, informasi apa yang penting, dan hubungan apa yang perlu dipahami?</p></article><article><span>Planning</span><p>Langkah apa yang harus dilakukan untuk mencapai tujuan?</p></article></div>
                        <p>Reasoning dan planning saling berhubungan tetapi tidak sama. Reasoning membantu memahami keadaan; planning menerjemahkan pemahaman itu menjadi tindakan. Rencana yang baik juga perlu diperiksa kembali ketika informasi berubah.</p>
                        <div class="reasoning-scaffold-table-wrap"><table><thead><tr><th>Komponen</th><th>Pertanyaan</th><th>Contoh workshop</th></tr></thead><tbody><tr><td>Goal</td><td>Hasil akhir apa yang ingin dicapai?</td><td>Workshop AI dua jam untuk 50 pemula dengan satu praktik</td></tr><tr><td>Initial state</td><td>Sumber daya apa yang tersedia?</td><td>Satu mentor, satu ruangan, satu proyektor</td></tr><tr><td>Constraints</td><td>Batasan apa yang harus dipatuhi?</td><td>Durasi, kapasitas, anggaran, akses internet</td></tr><tr><td>Actions</td><td>Tindakan apa yang dapat dilakukan?</td><td>Menyusun materi, latihan, jadwal, dan evaluasi</td></tr><tr><td>Dependencies</td><td>Tugas mana menunggu tugas lain?</td><td>Slide dibuat setelah outline materi selesai</td></tr><tr><td>Success criteria</td><td>Bagaimana mengetahui tugas selesai?</td><td>Jadwal tidak lewat dua jam dan latihan dapat diikuti semua peserta</td></tr></tbody></table></div>
                        <section class="reasoning-scaffold-open-section"><span>Goal yang dapat diperiksa</span><h3>Dari "workshop bagus" menjadi target terukur</h3><p>Goal "membuat workshop bagus" sulit diperiksa karena kata bagus tidak memiliki ukuran. Goal yang lebih berguna adalah "membuat workshop pengenalan AI selama dua jam untuk 50 peserta pemula dengan satu sesi praktik". Goal itu memberi durasi, audiens, dan hasil yang dapat diuji.</p><p>Initial state mencatat kondisi awal seperti jumlah mentor, fasilitas, data peserta, waktu, dan kemampuan tim. Constraints bukan gangguan yang boleh diabaikan; batasan menentukan bentuk rencana yang realistis.</p></section>
                        <div class="reasoning-scaffold-flow reasoning-scaffold-flow--compact" aria-label="Alur problem decomposition"><div><strong>Tujuan besar</strong><span>Nyatakan hasil akhir</span></div><i class="fas fa-arrow-right"></i><div><strong>Pecah</strong><span>Buat subtugas</span></div><i class="fas fa-arrow-right"></i><div><strong>Hubungkan</strong><span>Catat dependency</span></div><i class="fas fa-arrow-right"></i><div><strong>Urutkan</strong><span>Susun sequence</span></div><i class="fas fa-arrow-right"></i><div><strong>Periksa</strong><span>Uji batas dan kriteria</span></div></div>
                        <section class="reasoning-scaffold-example"><span>Contoh dekomposisi</span><h3>Workshop pengenalan AI selama dua jam untuk 50 mahasiswa</h3><ol><li>Kenali profil peserta.</li><li>Tentukan tujuan pembelajaran.</li><li>Pilih materi inti.</li><li>Bagi durasi sesi.</li><li>Tentukan kebutuhan perangkat.</li><li>Siapkan latihan.</li><li>Siapkan evaluasi.</li><li>Periksa kesesuaian waktu dan sumber daya.</li></ol></section>
                        <section class="reasoning-scaffold-open-section"><span>Subtugas berkualitas</span><h3>Cukup kecil untuk dikerjakan, cukup besar untuk bermakna</h3><p>Subtugas yang baik memiliki tujuan, input, output, dan kondisi selesai. "Kerjakan workshop" masih terlalu besar. Sebaliknya, "ubah warna satu kata pada slide 12" terlalu kecil untuk level rencana utama. Pecah pekerjaan sampai setiap bagian dapat diberikan kepada orang atau tool, diurutkan, dan diperiksa hasilnya.</p><p>Dependency menentukan urutan. Materi harus selesai sebelum slide dibuat. Data peserta harus tersedia sebelum kelompok dibagi. Jika dependency dilanggar, tim berisiko mengulang pekerjaan.</p></section>
                        <section class="reasoning-scaffold-example"><span>Hierarchical planning</span><h3>Rencana dapat memiliki beberapa tingkat</h3><div class="reasoning-scaffold-tree"><p><strong>Tujuan utama:</strong> Menyelenggarakan workshop AI</p><ul><li>Persiapan materi<ul><li>Tentukan topik</li><li>Buat contoh</li><li>Buat latihan</li></ul></li><li>Persiapan teknis<ul><li>Periksa ruangan</li><li>Periksa proyektor</li><li>Periksa internet</li></ul></li><li>Evaluasi<ul><li>Buat kuis</li><li>Siapkan formulir umpan balik</li></ul></li></ul></div><p>Hierarki membantu melihat gambaran besar tanpa kehilangan tindakan konkret. Materi ini hanya mengenalkan konsepnya; implementasi planner-executor yang otonom berada pada course Agentic AI.</p></section>
                        <div class="reasoning-scaffold-compare"><article><span>Static planning</span><p>Rencana dibuat di awal lalu dijalankan tanpa perubahan: Plan -> Step 1 -> Step 2 -> Step 3 -> Result.</p></article><article><span>Dynamic planning</span><p>Setelah action dan observation, sistem menilai apakah rencana masih sesuai. Jika tidak, rencana diperbarui.</p></article></div>
                        <section class="reasoning-scaffold-case"><span>Contoh perubahan kondisi</span><h3>Proyektor tidak tersedia selama 30 menit pertama</h3><dl><div><dt>Observe</dt><dd>Rencana awal tidak dapat dijalankan sesuai urutan.</dd></div><div><dt>Update</dt><dd>Pindahkan diskusi tujuan dan aktivitas berbasis kertas ke awal sesi.</dd></div><div><dt>Check</dt><dd>Pastikan total durasi tetap dua jam dan sesi demo tetap mendapat waktu.</dd></div></dl><p>Dynamic planning bukan berarti tujuan berubah sesuka hati. Goal dan batas otorisasi tetap dijaga; yang diperbarui adalah cara mencapainya.</p></section>
                        <div class="reasoning-scaffold-compare"><article><span>Kapan digunakan?</span><h3>Tujuan besar atau banyak dependensi</h3><p>Planning berguna untuk workshop, proyek, riset, penulisan laporan, jadwal belajar, dan tugas yang memiliki urutan, sumber daya, atau risiko.</p></article><article><span>Kapan tidak diperlukan?</span><h3>Tindakan tunggal yang jelas</h3><p>Permintaan seperti "ubah judul ini menjadi huruf kapital" tidak membutuhkan rencana panjang. Planning berlebihan menambah biaya dan waktu tanpa meningkatkan hasil.</p></article></div>
                        <section class="reasoning-scaffold-open-section"><span>Kesalahan umum</span><h3>Rencana dapat terlihat rapi tetapi tidak dapat dijalankan</h3><ol><li>Goal terlalu kabur.</li><li>Initial state tidak dicatat.</li><li>Constraint diabaikan.</li><li>Subtugas terlalu besar atau terlalu kecil.</li><li>Dependency tidak dikenali.</li><li>Tidak ada pemilik atau output langkah.</li><li>Urutan tidak realistis.</li><li>Tidak ada success criteria.</li><li>Rencana tidak diperbarui setelah observation berubah.</li><li>AI mengubah tujuan atau melakukan aksi berisiko tanpa izin.</li></ol></section>
                        <section class="reasoning-scaffold-checklist"><h3><i class="fas fa-list-check"></i> Cara memeriksa rencana AI</h3><ul><li>Goal spesifik dan terukur.</li><li>Initial state sesuai fakta.</li><li>Constraint tercakup.</li><li>Setiap subtugas punya output.</li><li>Dependency dan urutan masuk akal.</li><li>Durasi serta sumber daya realistis.</li><li>Success criteria dapat diuji.</li><li>Ada titik untuk observation dan update.</li></ul></section>
                        <section class="reasoning-scaffold-open-section"><span>Granularitas dan ownership</span><h3>Subtugas perlu dapat diserahkan dan ditutup</h3><p>Subtugas yang berguna menjawab empat hal: siapa atau apa yang mengerjakan, input apa yang dibutuhkan, output apa yang dihasilkan, dan kapan dianggap selesai. "Siapkan materi" dapat dipecah menjadi outline, contoh, latihan, dan review. Setiap output dapat diperiksa sebelum menjadi input bagi langkah berikutnya.</p><p>Rencana juga perlu menyisakan ruang untuk risiko. Jika internet gagal, apakah latihan masih dapat berjalan? Jika mentor terlambat, siapa mengambil alih pembuka? Menambahkan checkpoint dan alternatif tidak berarti membuat arsitektur agent yang rumit; ini adalah kebiasaan dasar agar rencana manusia maupun AI lebih tahan terhadap perubahan.</p></section>
                        <p>Rencana yang baik juga menunjukkan prioritas. Langkah yang memblokir pekerjaan lain atau melindungi fungsi utama dikerjakan lebih dahulu. Langkah kosmetik dapat menunggu. Ketika dua tugas dapat berjalan paralel, rencana boleh membaginya selama sumber daya tersedia dan hasil keduanya tetap diperiksa sebelum digabungkan. Prioritas perlu dijelaskan agar pengguna dapat mengoreksi tradeoff yang tidak sesuai.</p>
                        <section class="reasoning-scaffold-summary"><h3><i class="fas fa-bookmark"></i> Ringkasan poin penting</h3><p>Planning menentukan jalan dari kondisi awal menuju goal. Problem decomposition memecah jalan itu menjadi subtugas yang dapat dikerjakan dan diperiksa. Rencana berkualitas menghormati constraint, dependency, urutan, dan success criteria, serta dapat diperbarui ketika kondisi nyata berubah.</p></section>
                        <p class="reasoning-scaffold-citation">Pendekatan Plan-and-Solve memisahkan penyelesaian menjadi pembuatan rencana dan pelaksanaan subtugas berdasarkan rencana tersebut pada eksperimen yang dilaporkan [1]. Temuan ini tidak berarti semua jenis planning AI selalu lebih baik.</p>
                    </section>`,
                latihan: renderExerciseCards([
                    { title: "Bangun rencana kelas", body: `<p>Susun kelas pengenalan AI dua jam untuk 30 peserta dengan satu mentor dan satu proyektor. Isi goal, initial state, constraints, subtasks, sequence, dan success criteria.</p>`, answer: `<p>Contoh: goal berupa kelas dua jam dengan satu praktik; initial state mencatat mentor, peserta, ruang, proyektor; constraint mencakup waktu dan perangkat; subtasks meliputi materi, demo, praktik, evaluasi; sequence mengikuti dependency; success criteria memastikan durasi dan tujuan terpenuhi.</p>` },
                    { title: "Susun dependency", body: `<p>Urutkan: membuat slide, menentukan tujuan belajar, menguji latihan, memilih topik, menyiapkan formulir evaluasi. Tandai langkah yang dapat berjalan paralel.</p>`, answer: `<p>Pilih topik dan tujuan belajar lebih dulu. Slide dan rancangan latihan mengikuti keduanya. Latihan diuji setelah dibuat. Formulir evaluasi dapat disiapkan paralel setelah tujuan belajar jelas.</p>` },
                    { title: "Perbarui rencana", body: `<p>Proyektor tidak dapat digunakan selama 30 menit pertama. Tentukan langkah yang berubah dan cara menjaga goal tetap sama.</p>`, answer: `<p>Mulai dengan pengantar, diskusi, atau aktivitas kertas. Pindahkan demo visual setelah proyektor tersedia. Periksa ulang durasi agar praktik dan evaluasi tidak terpotong.</p>` },
                    { title: "Audit rencana yang buruk", body: `<p>AI membuat rencana: "Siapkan materi, adakan workshop, selesai." Temukan minimal empat kekurangan.</p>`, answer: `<p>Goal tidak terukur, initial state dan constraints hilang, subtugas terlalu besar, dependency tidak terlihat, sequence tidak rinci, serta tidak ada success criteria atau mekanisme update.</p>` }
                ]),
                kuis: renderQuizQuestions([
                    { question: "Apa fungsi utama planning?", options: ["Menentukan langkah untuk mencapai tujuan", "Menghapus semua batasan", "Menambah panjang jawaban", "Menjalankan semua tool"], answer: "A", explanation: "Planning menyusun langkah dan urutan tindakan berdasarkan tujuan, kondisi awal, serta batasan." },
                    { question: "Apa manfaat problem decomposition?", options: ["Membuat tugas selalu selesai otomatis", "Memecah tujuan besar menjadi subtugas yang lebih mudah dikelola", "Menghindari pemeriksaan hasil", "Mengganti goal di tengah proses"], answer: "B", explanation: "Dekomposisi membantu mengatur ketergantungan, urutan, dan pemeriksaan pada bagian tugas yang lebih kecil." },
                    { question: "Proyektor tidak tersedia selama 30 menit pertama termasuk komponen apa?", options: ["Goal", "Constraint", "Success criteria", "Final answer"], answer: "B", explanation: "Keterbatasan perangkat dan waktu merupakan constraint yang harus dipertimbangkan saat menyusun rencana." },
                    { question: "Materi harus selesai sebelum slide dibuat. Hubungan ini disebut...", options: ["Assumption", "Dependency", "Final answer", "Observation error"], answer: "B", explanation: "Dependency menunjukkan bahwa satu langkah membutuhkan output langkah lain sebelum dapat dikerjakan dengan benar." },
                    { question: "Manakah success criteria yang paling dapat diperiksa?", options: ["Workshop terasa menarik", "Peserta tampak senang", "Jadwal selesai dalam dua jam dan seluruh peserta menyelesaikan latihan", "Materi dibuat sebaik mungkin"], answer: "C", explanation: "Kriteria selesai harus spesifik dan dapat diuji. Durasi dan penyelesaian latihan memberi bukti yang lebih jelas." },
                    { question: "Apa ciri dynamic planning?", options: ["Rencana tidak pernah berubah", "Tidak memiliki tujuan", "Rencana dapat diperbarui berdasarkan observation", "Semua langkah dijalankan bersamaan"], answer: "C", explanation: "Dynamic planning memakai hasil tindakan atau informasi baru untuk menilai dan memperbarui langkah berikutnya." }
                ]),
                diskusi: renderDiscussionPrompt("Apakah AI sebaiknya selalu mengikuti rencana awal, atau boleh mengubahnya ketika menemukan informasi baru?", ["Kapan perubahan rencana menjadi keputusan yang tepat?", "Apa beda memperbarui langkah dengan mengubah goal?", "Batas apa yang tidak boleh diubah tanpa persetujuan pengguna?", "Bagaimana AI menjelaskan alasan perubahan rencana?", "Siapa yang bertanggung jawab bila rencana baru menimbulkan risiko?"], "Rencana membantu konsistensi, tetapi lingkungan nyata dapat menghasilkan observation yang tidak diperkirakan.", "Ceritakan satu situasi ketika kamu perlu mengubah rencana karena informasi atau sumber daya baru.", "Tanggapi satu rencana peserta lain dengan menunjukkan satu constraint atau dependency yang mungkin belum dipertimbangkan.")
            }
        },
        {
            slug: "chain-of-thought",
            title: "Chain-of-Thought dan Langkah Penyelesaian",
            summary: "Memahami fungsi langkah perantara pada tugas kompleks tanpa menganggapnya sebagai akses penuh ke proses internal model.",
            duration: "20-25 menit",
            learningObjectives: [
                "Menjelaskan Chain-of-Thought sebagai langkah perantara yang dihasilkan model.",
                "Menentukan kapan langkah penyelesaian terstruktur membantu dan kapan tidak diperlukan.",
                "Memeriksa langkah, bukti, perhitungan, dan kesimpulan tanpa menganggapnya pasti benar."
            ],
            references: ["[2]", "[3]"],
            materi: "Chain-of-Thought adalah rangkaian langkah perantara yang dihasilkan model sebelum jawaban akhir; langkah ini membantu pemeriksaan tetapi tidak menjamin kebenaran.",
            latihan: "Empat latihan untuk membandingkan prompt, menyusun langkah yang dapat diperiksa, menemukan kesalahan, dan memilih tingkat detail.",
            kuis: "Enam soal interaktif tentang definisi, pola prompt, kegunaan, verifikasi, dan keterbatasan Chain-of-Thought.",
            diskusi: "Bahas apakah langkah penyelesaian AI harus selalu ditampilkan kepada pengguna.",
            rich: {
                materi: `
                    <section class="reasoning-scaffold-prose">
                        <p class="reasoning-scaffold-lead">Bayangkan AI diminta menghitung total biaya acara yang memiliki konsumsi, transportasi, dan diskon. Jawaban akhir saja sulit diperiksa. Dengan langkah penyelesaian terstruktur, pengguna dapat melihat data yang dipakai, operasi yang dilakukan, dan titik kesalahan bila hasilnya keliru.</p>
                        <p><strong>Chain-of-Thought</strong> adalah rangkaian langkah perantara yang dihasilkan model sebelum memberikan jawaban akhir. Dalam pengalaman belajar ini, istilah UI yang dipakai adalah <strong>langkah penyelesaian yang dapat diperiksa</strong>. Teks tersebut berguna untuk menilai alur jawaban, tetapi bukan rekaman lengkap atau pasti dari proses internal model.</p>
                        <div class="reasoning-scaffold-flow reasoning-scaffold-flow--compact" aria-label="Alur langkah penyelesaian"><div><strong>Pertanyaan</strong><span>Masalah awal</span></div><i class="fas fa-arrow-right"></i><div><strong>Langkah perantara</strong><span>Urutan penyelesaian</span></div><i class="fas fa-arrow-right"></i><div><strong>Pemeriksaan</strong><span>Validasi</span></div><i class="fas fa-arrow-right"></i><div><strong>Jawaban akhir</strong><span>Hasil ringkas</span></div></div>
                        <div class="reasoning-scaffold-compare"><article><span>Jawaban langsung</span><p>Sisa anggarannya adalah Rp900.000.</p></article><article><span>Jawaban terstruktur</span><p>60 x Rp35.000 = Rp2.100.000. Rp3.000.000 - Rp2.100.000 = Rp900.000. Jadi anggaran mencukupi.</p></article></div>
                        <section class="reasoning-scaffold-open-section"><span>Mengapa langkah perantara membantu?</span><h3>Masalah kompleks menjadi bagian yang dapat diperiksa</h3><p>Langkah perantara membantu model menjaga urutan, menuliskan hasil sementara, dan menghubungkan satu hasil dengan langkah berikutnya. Bagi pengguna, format ini membuat asumsi dan perhitungan lebih mudah terlihat. Namun manfaat tersebut bergantung pada kualitas konteks dan langkah yang dihasilkan.</p><p>Chain-of-Thought prompting dapat memakai contoh few-shot yang berisi langkah perantara, atau instruksi zero-shot yang meminta model bekerja bertahap. Studi Wei dkk. dan Kojima dkk. melaporkan peningkatan pada beberapa tugas dan model yang mereka uji [2][3]. Hasil itu tidak membuktikan bahwa satu pola prompt selalu terbaik untuk semua model dan tugas.</p></section>
                        <section class="reasoning-scaffold-example"><span>Pola yang aman</span><h3>Langkah penyelesaian yang dapat diperiksa</h3><ol><li>Identifikasi tujuan.</li><li>Catat informasi relevan.</li><li>Pecah masalah menjadi beberapa langkah.</li><li>Kerjakan setiap langkah.</li><li>Periksa hasilnya.</li><li>Berikan jawaban akhir secara ringkas.</li></ol></section>
                        <section class="reasoning-scaffold-example"><span>Contoh 1: perhitungan</span><h3>Biaya workshop dengan diskon</h3><p>Biaya awal Rp2.400.000, diskon 10%, dan transportasi Rp300.000.</p><div class="reasoning-scaffold-calculation"><code>Diskon = 10% x Rp2.400.000 = Rp240.000</code><code>Setelah diskon = Rp2.160.000</code><code>Total = Rp2.160.000 + Rp300.000 = Rp2.460.000</code></div><p>Setiap hasil sementara dapat diperiksa. Kesalahan umum adalah menerapkan diskon setelah transportasi, padahal diskon hanya berlaku pada biaya awal.</p></section>
                        <section class="reasoning-scaffold-example"><span>Contoh 2: perbandingan</span><h3>Memilih format pelatihan</h3><p>Tim membandingkan kelas daring dan luring. Langkah yang dapat diperiksa mencatat tujuan, jumlah peserta, kebutuhan praktik, akses internet, biaya, dan risiko. Jawaban akhir tidak cukup mengatakan "luring lebih baik"; rekomendasi perlu menunjukkan kriteria dan tradeoff.</p><div class="reasoning-scaffold-table-wrap"><table><thead><tr><th>Kriteria</th><th>Daring</th><th>Luring</th></tr></thead><tbody><tr><td>Akses peserta jauh</td><td>Lebih mudah</td><td>Memerlukan perjalanan</td></tr><tr><td>Praktik perangkat</td><td>Bergantung perangkat peserta</td><td>Dapat didampingi langsung</td></tr><tr><td>Biaya tempat</td><td>Lebih rendah</td><td>Lebih tinggi</td></tr></tbody></table></div></section>
                        <div class="reasoning-scaffold-compare"><article><span>Kapan digunakan?</span><h3>Multi-langkah dan mudah salah</h3><p>Gunakan untuk perhitungan bertahap, beberapa batasan, perbandingan alternatif, perencanaan, diagnosis awal, atau jawaban yang harus dapat diaudit.</p></article><article><span>Kapan tidak diperlukan?</span><h3>Jawaban langsung yang sederhana</h3><p>Salam, perubahan format, ekstraksi singkat, dan fakta sederhana biasanya tidak memerlukan langkah panjang. Penjelasan berlebihan dapat mengaburkan hasil utama.</p></article></div>
                        <div class="reasoning-scaffold-callout"><i class="fas fa-circle-info"></i><p><strong>Chain-of-Thought tidak menjamin jawaban benar.</strong> Teks langkah perantara juga tidak selalu menjadi gambaran lengkap proses internal model. Perlakukan sebagai langkah penyelesaian yang dapat diperiksa, bukan "isi pikiran rahasia AI".</p></div>
                        <section class="reasoning-scaffold-open-section"><span>Kesalahan umum</span><h3>Langkah panjang juga dapat salah</h3><ol><li>Tujuan awal disalahpahami.</li><li>Fakta yang tidak tersedia ditambahkan.</li><li>Asumsi disembunyikan.</li><li>Satu langkah perhitungan keliru tetapi dipakai langkah berikutnya.</li><li>Urutan logis tampak rapi tetapi tidak didukung bukti.</li><li>Jawaban akhir tidak sesuai dengan hasil langkah.</li><li>Model terlalu percaya diri.</li><li>Pengguna menganggap seluruh teks sebagai proses internal yang pasti.</li></ol></section>
                        <section class="reasoning-scaffold-checklist"><h3><i class="fas fa-list-check"></i> Cara memeriksa langkah penyelesaian</h3><ul><li>Tujuan awal ditulis dengan benar.</li><li>Data berasal dari prompt atau sumber yang jelas.</li><li>Asumsi dinyatakan.</li><li>Setiap operasi dapat diulang.</li><li>Satuan konsisten.</li><li>Tidak ada langkah yang melompat.</li><li>Kesimpulan mengikuti hasil.</li><li>Jawaban akhir tetap ringkas dan sesuai kebutuhan.</li></ul></section>
                        <section class="reasoning-scaffold-open-section"><span>Dua lapisan jawaban</span><h3>Proses pemeriksaan dan komunikasi akhir tidak harus sama panjang</h3><p>Untuk tugas kompleks, sistem dapat bekerja dengan struktur yang rinci lalu menyajikan jawaban akhir yang lebih ringkas: hasil, asumsi penting, bukti utama, dan cara memeriksa. Pengguna tidak selalu membutuhkan setiap token langkah perantara. Pada antarmuka produk, ringkasan yang dapat diaudit sering lebih berguna daripada penjelasan sangat panjang.</p><p>Contohnya, laporan anggaran dapat menampilkan rumus utama, komponen yang dikecualikan, dan total akhir. Detail tabel per baris dapat disimpan sebagai bukti pendukung. Pola ini menjaga transparansi tanpa membanjiri peserta dengan teks.</p></section>
                        <section class="reasoning-scaffold-open-section"><span>Failure modes</span><h3>Jawaban akhir benar belum tentu prosesnya sehat</h3><p>Model dapat mencapai angka benar melalui operasi yang salah dan kebetulan saling meniadakan. Sebaliknya, proses awal dapat benar tetapi satu kesalahan aritmetika menghasilkan kesimpulan salah. Karena itu, pemeriksaan perlu menyentuh proses dan hasil. Ulangi operasi penting dengan kalkulator, bandingkan data ke sumber, dan uji apakah kesimpulan berubah ketika asumsi diubah.</p><p>Pada tugas rekomendasi, periksa kriteria yang dipakai. Model mungkin memilih opsi yang masuk akal tetapi mengabaikan aksesibilitas, privasi, atau batas anggaran. Langkah yang dapat diperiksa membantu menemukan kriteria hilang, tetapi pengguna tetap bertanggung jawab menilai relevansi dan dampaknya.</p></section>
                        <section class="reasoning-scaffold-open-section"><span>Prompt yang proporsional</span><h3>Minta struktur, bukan pertunjukan kepastian</h3><p>Instruksi seperti "identifikasi tujuan, gunakan data yang tersedia, sebutkan asumsi, hitung, lalu periksa" memberi model kerangka yang konkret. Instruksi "berpikirlah sangat mendalam dan jangan pernah salah" tidak memberi kriteria pemeriksaan. Prompt yang baik menentukan output yang dapat diuji, misalnya tabel perbandingan, rumus, sumber, atau daftar batasan.</p><p>Jika risiko tinggi, jangan hanya mengandalkan langkah teks. Gunakan tool presisi, sumber resmi, atau review manusia. Chain-of-Thought adalah bantuan penyusunan, bukan pengganti bukti eksternal.</p></section>
                        <p>Pada pertanyaan yang sensitif, pengguna dapat meminta ringkasan alasan, sumber, asumsi, dan hasil verifikasi tanpa meminta uraian internal yang panjang. Bentuk ini lebih fokus pada bukti yang dapat diuji dan mengurangi risiko menganggap teks penjelasan sebagai kebenaran hanya karena terdengar lancar.</p>
                        <section class="reasoning-scaffold-summary"><h3><i class="fas fa-bookmark"></i> Ringkasan poin penting</h3><p>Chain-of-Thought membantu menyusun masalah kompleks menjadi langkah perantara dan membuat jawaban lebih mudah diperiksa. Manfaatnya tidak universal, tidak menjamin kebenaran, dan tidak membuka seluruh proses internal model. Fokus pengguna sebaiknya pada data, asumsi, operasi, bukti, dan jawaban akhir yang dapat diverifikasi.</p></section>
                        <p class="reasoning-scaffold-citation">Wei dkk. memperkenalkan Chain-of-Thought prompting melalui contoh yang berisi langkah reasoning perantara dan melaporkan peningkatan pada beberapa tugas aritmetika, commonsense, dan symbolic reasoning, pada eksperimen dan model yang diuji [2].</p>
                    </section>`,
                latihan: renderExerciseCards([
                    { title: "Bandingkan dua prompt", body: `<div class="reasoning-scaffold-prompts"><code>Hitung kebutuhan konsumsi acara ini.</code><code>Identifikasi data, susun langkah, kerjakan, periksa hasil, lalu berikan jawaban akhir.</code></div><p>Bandingkan kelengkapan, kejelasan, ketepatan, dan kemudahan verifikasi.</p>`, answer: `<p>Prompt kedua memberi struktur yang lebih mudah diperiksa pada tugas bertahap. Namun hasil tetap bergantung pada data yang lengkap dan perhitungan benar; prompt panjang bukan jaminan otomatis.</p>` },
                    { title: "Temukan kesalahan hitung", body: `<p>AI menulis: "50 peserta x Rp40.000 = Rp1.500.000, jadi anggaran Rp1.800.000 tersisa Rp300.000." Perbaiki langkah dan kesimpulan.</p>`, answer: `<p>Perkalian yang benar Rp2.000.000. Anggaran Rp1.800.000 kurang Rp200.000, bukan tersisa Rp300.000. Kesalahan hasil sementara mengubah kesimpulan akhir.</p>` },
                    { title: "Susun langkah yang dapat diperiksa", body: `<p>Buat langkah untuk membandingkan dua venue berdasarkan kapasitas, biaya, aksesibilitas, dan jarak. Akhiri dengan rekomendasi bersyarat.</p>`, answer: `<p>Tentukan kebutuhan acara; catat data tiap venue; bandingkan setiap kriteria dengan bobot yang disepakati; periksa data yang hilang; lalu rekomendasikan venue beserta tradeoff dan asumsi.</p>` },
                    { title: "Pilih tingkat detail", body: `<p>Tentukan mana yang memerlukan langkah rinci: menyapa peserta, menghitung biaya tiga komponen, mengubah teks menjadi huruf kapital, atau memilih jadwal dari lima batasan.</p>`, answer: `<p>Perhitungan tiga komponen dan pemilihan jadwal multi-batasan memerlukan langkah terstruktur. Salam dan perubahan huruf biasanya cukup dengan jawaban langsung.</p>` }
                ]),
                kuis: renderQuizQuestions([
                    { question: "Apa definisi sederhana Chain-of-Thought?", options: ["Akses penuh ke proses internal model", "Rangkaian langkah perantara yang dihasilkan sebelum jawaban akhir", "Database fakta milik AI", "Tool untuk mencari informasi terbaru"], answer: "B", explanation: "CoT adalah teks langkah perantara yang dihasilkan model, bukan jendela lengkap menuju proses internalnya." },
                    { question: "Kapan langkah perantara paling berguna?", options: ["Saat tugas terdiri dari beberapa tahap dan perlu diperiksa", "Untuk setiap salam singkat", "Hanya saat memakai internet", "Saat pengguna tidak memberi tujuan"], answer: "A", explanation: "Tugas multi-langkah, perhitungan, perbandingan, dan banyak batasan lebih terbantu oleh langkah yang terstruktur." },
                    { question: "Pernyataan mana yang tepat tentang keterbatasan CoT?", options: ["Selalu menunjukkan seluruh proses internal model", "Selalu menghasilkan jawaban benar", "Dapat membantu pemeriksaan tetapi tetap dapat berisi kesalahan", "Tidak boleh digunakan untuk perhitungan"], answer: "C", explanation: "Langkah terstruktur memudahkan pemeriksaan, tetapi data, asumsi, atau perhitungannya tetap dapat salah." },
                    { question: "Prompt mana yang paling tepat untuk perhitungan multi-langkah?", options: ["Jawab secepat mungkin tanpa memeriksa", "Tuliskan tujuan, data, langkah perhitungan, pemeriksaan, dan jawaban akhir", "Gunakan sebanyak mungkin istilah teknis", "Berikan jawaban paling panjang"], answer: "B", explanation: "Struktur yang meminta tujuan, data, langkah, dan pemeriksaan membantu menghasilkan jejak penyelesaian yang dapat diuji." },
                    { question: "Jika langkah menghasilkan Rp2.000.000 tetapi jawaban akhir menyebut Rp1.500.000, apa yang harus dilakukan?", options: ["Memilih angka yang lebih kecil", "Mengabaikan langkah dan percaya jawaban akhir", "Memeriksa kembali operasi dan menyelaraskan kesimpulan dengan hasil yang valid", "Menambahkan penjelasan agar terlihat yakin"], answer: "C", explanation: "Langkah dan jawaban akhir harus konsisten. Perbedaan adalah sinyal untuk mengulang perhitungan, bukan memilih angka secara sembarang." },
                    { question: "Mengapa CoT tidak menjamin kebenaran?", options: ["Karena langkah yang runtut dapat dibangun dari pemahaman atau data yang salah", "Karena model tidak dapat menghasilkan teks", "Karena jawaban akhir selalu acak", "Karena semua tugas harus memakai tool"], answer: "A", explanation: "Struktur yang rapi tidak memperbaiki fakta salah, asumsi tanpa dasar, atau kesalahan hitung secara otomatis." }
                ]),
                diskusi: renderDiscussionPrompt("Apakah langkah penyelesaian AI harus selalu ditampilkan kepada pengguna?", ["Kapan transparansi langkah membantu verifikasi?", "Kapan langkah panjang mengganggu kesederhanaan antarmuka?", "Apa risiko penjelasan yang masuk akal tetapi tidak akurat?", "Bukti apa yang lebih berguna daripada penjelasan sangat panjang?", "Bagaimana menyeimbangkan auditabilitas dan privasi atau keamanan sistem?"], "Langkah yang dapat diperiksa membantu pada tugas berisiko, tetapi tidak setiap interaksi memerlukan uraian panjang.", "Ceritakan pengalaman ketika langkah AI membantu menemukan kesalahan atau justru membuatmu terlalu percaya.", "Pilih satu jawaban peserta lain dan usulkan bentuk penjelasan yang lebih singkat tetapi tetap dapat diverifikasi.")
            }
        },
        {
            slug: "tool-use",
            title: "Tool Use: Ketika AI Membutuhkan Alat Eksternal",
            summary: "Memahami cara AI memilih, memanggil, membaca, dan memeriksa hasil tool ketika teks saja tidak cukup menyelesaikan tugas.",
            duration: "30-35 menit",
            learningObjectives: [
                "Menentukan apakah suatu tugas membutuhkan tool dan memilih tool yang sesuai.",
                "Menjelaskan parameter, tool call, observation, validation, dan update.",
                "Membedakan read dan write action serta menerapkan kesadaran izin dan risiko."
            ],
            references: ["[4]", "[5]", "[6]"],
            materi: "Tool use membantu perhitungan presisi, informasi terbaru, dokumen, spreadsheet, kode, kalender, database, dan layanan eksternal.",
            latihan: "Lima latihan untuk memilih tool, menentukan parameter, membaca observation, memeriksa izin, dan memperbaiki tool loop.",
            kuis: "Tujuh soal interaktif tentang kebutuhan tool, pemilihan, parameter, observation, error, izin, dan validasi output.",
            diskusi: "Bahas batas otorisasi ketika AI menggunakan tool atau mengambil tindakan.",
            rich: {
                materi: `
                    <section class="reasoning-scaffold-prose">
                        <p class="reasoning-scaffold-lead">Seorang peserta meminta AI menghitung rata-rata 10.000 nilai dari spreadsheet, memeriksa cuaca hari ini, atau mencari slot rapat minggu depan. Model tidak seharusnya menebak data itu dari pola teks. Sistem membutuhkan alat eksternal yang tepat dan izin yang sesuai.</p>
                        <p><strong>Tool use</strong> adalah kemampuan sistem AI menggunakan alat atau layanan eksternal ketika tugas tidak cukup diselesaikan hanya dengan menghasilkan teks. Tool dapat menambah presisi, membaca data yang tidak ada di prompt, memperoleh informasi terbaru, atau menjalankan tindakan. Tool tidak membuat sistem otomatis benar; input, izin, output, dan interpretasinya tetap harus diperiksa.</p>
                        <div class="reasoning-scaffold-table-wrap"><table><thead><tr><th>Kebutuhan</th><th>Tool yang sesuai</th><th>Contoh</th></tr></thead><tbody><tr><td>Perhitungan presisi</td><td>Kalkulator</td><td>Operasi angka yang harus tepat</td></tr><tr><td>Pengolahan data</td><td>Python atau spreadsheet</td><td>Nilai, rata-rata, filter, transformasi</td></tr><tr><td>Informasi terbaru</td><td>Web search atau API</td><td>Cuaca, berita, harga</td></tr><tr><td>Isi dokumen tertentu</td><td>Document retrieval</td><td>Panduan atau laporan</td></tr><tr><td>Jadwal aktual</td><td>Calendar</td><td>Slot waktu dan konflik</td></tr><tr><td>Lokasi dan rute</td><td>Maps</td><td>Jarak dan arah</td></tr><tr><td>Komunikasi</td><td>Email atau messaging</td><td>Draft atau pesan terkirim</td></tr><tr><td>Data aplikasi</td><td>Database atau API</td><td>Profil, transaksi, status</td></tr></tbody></table></div>
                        <section class="reasoning-scaffold-open-section"><span>Tool selection</span><h3>Pilih berdasarkan tujuan, data, kemampuan, dan izin</h3><ol><li>Apa tujuan tugas?</li><li>Data apa yang dibutuhkan?</li><li>Apakah data sudah tersedia di prompt?</li><li>Apakah data mudah berubah?</li><li>Apakah hasil membutuhkan presisi atau eksekusi?</li><li>Tool mana yang memiliki kemampuan paling sesuai?</li><li>Apakah pengguna memberi izin untuk membaca atau mengubah data?</li></ol><p>Menghitung rata-rata 10.000 nilai melalui generasi teks adalah pilihan buruk. Spreadsheet atau Python dapat membaca semua baris, memvalidasi format, dan menghitung agregasi secara konsisten.</p></section>
                        <section class="reasoning-scaffold-example"><span>Tool call konseptual</span><h3>Nama, parameter, batasan, dan output</h3><div class="reasoning-scaffold-template"><p><strong>Tool:</strong> calculator</p><p><strong>Input:</strong> (80 x 27500) + 350000</p><p><strong>Output:</strong> 2550000</p></div><p>Parameter harus merepresentasikan tugas yang benar. Angka, satuan, rentang tanggal, zona waktu, nama file, atau kolom yang salah dapat menghasilkan observation yang valid secara format tetapi salah untuk tujuan pengguna.</p></section>
                        <section class="reasoning-scaffold-open-section"><span>Observation</span><h3>Hasil tool menjadi konteks baru, bukan kebenaran otomatis</h3><p>Observation adalah hasil yang dikembalikan tool kepada AI. Sistem perlu membaca apakah hasil relevan, lengkap, terbaru, dan bebas error. Jika spreadsheet melaporkan "kolom nilai akhir tidak ditemukan", AI tidak boleh mengarang rata-rata. Sistem harus mencari kolom alternatif yang masuk akal, meminta klarifikasi, atau menjelaskan bahwa data belum tersedia.</p></section>
                        <div class="reasoning-scaffold-flow reasoning-scaffold-flow--compact" aria-label="Siklus penggunaan tool"><div><strong>Reason</strong><span>Pahami kebutuhan</span></div><i class="fas fa-arrow-right"></i><div><strong>Plan</strong><span>Tentukan data dan tool</span></div><i class="fas fa-arrow-right"></i><div><strong>Act</strong><span>Panggil tool</span></div><i class="fas fa-arrow-right"></i><div><strong>Observe</strong><span>Baca hasil</span></div><i class="fas fa-arrow-right"></i><div><strong>Validate</strong><span>Periksa output</span></div><i class="fas fa-arrow-right"></i><div><strong>Update</strong><span>Ubah rencana</span></div><i class="fas fa-arrow-right"></i><div><strong>Answer</strong><span>Sampaikan hasil</span></div></div>
                        <section class="reasoning-scaffold-case"><span>Contoh lengkap: spreadsheet</span><h3>Menghitung rata-rata nilai peserta</h3><dl><div><dt>Reason</dt><dd>Data nilai berada di file, bukan di prompt.</dd></div><div><dt>Plan</dt><dd>Buka file, temukan sheet dan kolom nilai, periksa data kosong dan nonnumerik, hitung rata-rata, lalu laporkan jumlah data.</dd></div><div><dt>Action</dt><dd>Gunakan spreadsheet atau Python.</dd></div><div><dt>Observation</dt><dd>50 baris: 47 nilai valid, dua kosong, satu tidak valid, rata-rata valid 82,4.</dd></div><div><dt>Validate</dt><dd>Pastikan nilai kosong dan tidak valid tidak dihitung serta rentang kolom benar.</dd></div><div><dt>Answer</dt><dd>Dari 50 data, 47 nilai valid memiliki rata-rata 82,4; tiga data lain tidak dimasukkan dan alasannya dijelaskan.</dd></div></dl><p>Jawaban ini lebih baik daripada hanya "82,4" karena pengguna mengetahui cakupan, kualitas data, dan keputusan pembersihan yang memengaruhi hasil.</p></section>
                        <section class="reasoning-scaffold-example"><span>Contoh informasi terbaru</span><h3>Cuaca hari ini</h3><p>Model memerlukan lokasi, tanggal yang dimaksud, sumber cuaca terbaru, dan satuan. Jika lokasi tidak tersedia, AI harus meminta lokasi atau memberi petunjuk cara memeriksa, bukan menebak kota pengguna.</p></section>
                        <section class="reasoning-scaffold-example"><span>Contoh calendar</span><h3>Mencari waktu rapat dua jam</h3><ol><li>Tentukan tanggal "minggu depan" dan zona waktu.</li><li>Baca agenda yang diizinkan.</li><li>Cari slot dua jam tanpa konflik.</li><li>Tampilkan beberapa alternatif.</li><li>Jangan membuat event jika pengguna hanya meminta rekomendasi.</li></ol><div class="reasoning-scaffold-compare"><article><span>Read action</span><p>Melihat jadwal atau data. Tetap membutuhkan izin jika datanya pribadi.</p></article><article><span>Write action</span><p>Membuat, mengubah, mengirim, atau menghapus. Dampaknya lebih besar dan biasanya memerlukan konfirmasi.</p></article></div></section>
                        <div class="reasoning-scaffold-compare"><article><span>Tool perlu digunakan</span><p>Data belum ada di konteks, informasi mudah berubah, hasil membutuhkan presisi, tugas perlu dieksekusi, atau hasil harus diverifikasi ke sistem eksternal.</p></article><article><span>Tool tidak perlu digunakan</span><p>Informasi sudah ada di prompt, tugas hanya menyusun ulang teks, pertanyaan konseptual dapat dijawab dari konteks, atau tool tidak menambah manfaat.</p></article></div>
                        <section class="reasoning-scaffold-open-section"><span>Izin dan dampak</span><h3>Semakin besar dampak, semakin penting konfirmasi</h3><div class="reasoning-scaffold-table-wrap"><table><thead><tr><th>Tingkat</th><th>Contoh</th><th>Kontrol</th></tr></thead><tbody><tr><td>Rendah</td><td>Kalkulator, pencarian publik, membaca data yang diberikan</td><td>Validasi input dan output</td></tr><tr><td>Sedang</td><td>Membaca kalender atau dokumen pribadi, membuat draft email</td><td>Izin akses dan transparansi data</td></tr><tr><td>Tinggi</td><td>Mengirim email, menghapus data, transaksi, mengubah jadwal</td><td>Konfirmasi eksplisit, batas otorisasi, dan audit trail</td></tr></tbody></table></div></section>
                        <section class="reasoning-scaffold-example"><span>Tool error</span><h3>Jangan mengklaim tindakan berhasil saat akses ditolak</h3><div class="reasoning-scaffold-compare"><article><span>Respons salah</span><p>"Email berhasil dikirim" setelah tool mengembalikan permission denied.</p></article><article><span>Respons benar</span><p>"Saya tidak dapat mengirim email karena akses ditolak. Tidak ada pesan yang terkirim."</p></article></div></section>
                        <section class="reasoning-scaffold-open-section"><span>Kesalahan umum</span><h3>Tool tetap perlu diawasi</h3><ol><li>Tool tidak tersedia.</li><li>Tool yang dipilih tidak sesuai.</li><li>Tool digunakan padahal tidak diperlukan.</li><li>Parameter atau rentang data salah.</li><li>Data kosong atau format output berubah.</li><li>Network error atau permission denied diabaikan.</li><li>Data kedaluwarsa atau ambigu.</li><li>AI salah membaca hasil.</li><li>Output dianggap pasti benar.</li><li>AI menyatakan berhasil walaupun tool gagal.</li></ol></section>
                        <section class="reasoning-scaffold-checklist"><h3><i class="fas fa-list-check"></i> Cara memeriksa tool use</h3><ul><li>Tool sesuai dengan tujuan.</li><li>Parameter dan rentang data benar.</li><li>Satuan serta zona waktu konsisten.</li><li>Output lengkap dan terbaru.</li><li>Error atau data kosong dikenali.</li><li>Hasil sesuai permintaan.</li><li>Observation dibaca dengan tepat.</li><li>Tindakan memiliki izin yang cukup.</li></ul></section>
                        <section class="reasoning-scaffold-open-section"><span>Validasi berlapis</span><h3>Periksa input, eksekusi, dan interpretasi</h3><p>Validasi tidak berhenti ketika tool mengembalikan status sukses. Periksa apakah input mengarah ke file, kolom, tanggal, dan pengguna yang benar; apakah eksekusi selesai tanpa error; serta apakah AI menafsirkan output sesuai tujuan. Tiga lapisan ini membantu membedakan tool yang berhasil berjalan dari tugas pengguna yang benar-benar terselesaikan.</p></section>
                        <section class="reasoning-scaffold-summary"><h3><i class="fas fa-bookmark"></i> Ringkasan poin penting</h3><p>Tool use memperluas kemampuan LLM dengan data, perhitungan, atau tindakan eksternal. Sistem perlu memilih tool yang tepat, menyiapkan parameter, membaca observation, memvalidasi output, memperbarui rencana, dan hanya mengambil tindakan dalam batas izin. Implementasi function calling, registry, retry, memory, dan guardrail teknis dibahas lebih lanjut pada Agentic AI.</p></section>
                        <p class="reasoning-scaffold-citation">Toolformer mempelajari keputusan mengenai tool, waktu pemanggilan, argumen, dan penggunaan hasil dalam generasi berikutnya [4]. ReAct menggabungkan reasoning dan tindakan agar observation memengaruhi langkah berikutnya [5]. Kajian augmented language models membahas perluasan model melalui reasoning, tool, dan retrieval [6]. Ketiganya adalah pendekatan riset, bukan arsitektur wajib semua sistem.</p>
                    </section>`,
                latihan: renderExerciseCards([
                    { title: "Pilih tool untuk sepuluh tugas", body: `<p>Klasifikasikan: menjelaskan ML; menghitung 287 x 9.451; cuaca hari ini; merangkum teks yang diberikan; menganalisis 10.000 baris; agenda minggu depan; mencari rute; mengubah judul; membaca laporan tertentu; mengirim email.</p>`, answer: `<p>Tanpa tool: menjelaskan konsep, merangkum konteks yang tersedia, dan mengubah judul. Tool: kalkulator, cuaca/web, Python/spreadsheet, calendar, maps, document retrieval, dan email. Mengirim email juga memerlukan konfirmasi.</p>` },
                    { title: "Tentukan parameter calendar", body: `<p>Untuk tugas "cari agenda minggu depan", tentukan rentang tanggal, durasi, zona waktu, kalender, peserta, dan jenis aksi.</p>`, answer: `<p>Gunakan tanggal eksplisit awal-akhir, durasi slot, zona waktu pengguna, kalender yang diizinkan, peserta terkait, dan aksi read-only. Jangan membuat event tanpa permintaan atau konfirmasi.</p>` },
                    { title: "Baca observation dengan data kosong", body: `<p>Tool mengembalikan 50 baris, 47 nilai valid, dua kosong, dan satu teks "belum dinilai". Susun respons aman.</p>`, answer: `<p>Hitung rata-rata hanya dari 47 nilai valid, jelaskan tiga data yang dikecualikan, dan jangan mengubah "belum dinilai" menjadi angka tanpa aturan dari pengguna.</p>` },
                    { title: "Permission check", body: `<p>Kelompokkan: kalkulasi lokal, membaca kalender pribadi, membuat draft email, mengirim email, menghapus file, dan mengubah jadwal.</p>`, answer: `<p>Kalkulasi lokal berdampak rendah. Membaca data pribadi dan draft email membutuhkan izin akses. Mengirim, menghapus, atau mengubah data berdampak tinggi dan membutuhkan konfirmasi eksplisit.</p>` },
                    { title: "Perbaiki tool loop", body: `<p>Alur buruk: Reason -> pilih tool -> panggil tool -> langsung Answer. Tambahkan tahap yang hilang dan jelaskan fungsinya.</p>`, answer: `<p>Tambahkan Plan untuk parameter, Observe untuk membaca hasil, Validate untuk memeriksa error/data/satuan, dan Update untuk memperbaiki rencana sebelum Answer.</p>` }
                ]),
                kuis: renderQuizQuestions([
                    { question: "Apa yang dimaksud dengan tool use?", options: ["Kemampuan AI menggunakan layanan eksternal untuk membantu menyelesaikan tugas", "Kemampuan AI menghafal semua data", "Cara membuat jawaban lebih panjang", "Proses menghapus konteks pengguna"], answer: "A", explanation: "Tool memberi sistem kemampuan tambahan seperti menghitung, membaca file, mencari data terbaru, atau menjalankan tindakan." },
                    { question: "Tool apa yang paling sesuai untuk menghitung rata-rata 10.000 baris nilai?", options: ["Calendar", "Python atau spreadsheet", "Maps", "Email"], answer: "B", explanation: "Python atau spreadsheet cocok untuk membaca banyak baris, membersihkan data, dan menghitung agregasi secara presisi." },
                    { question: "Apa risiko parameter tool yang salah?", options: ["Tool selalu memperbaikinya otomatis", "Hasil dapat menggunakan data, rentang, atau operasi yang keliru", "Jawaban pasti menjadi lebih singkat", "Tidak ada dampak pada hasil"], answer: "B", explanation: "Input menentukan operasi tool; parameter salah dapat menghasilkan observation yang tampak valid tetapi tidak relevan." },
                    { question: "Apa yang harus dilakukan setelah menerima observation dari tool?", options: ["Langsung menganggapnya benar", "Memeriksa hasil dan memperbarui rencana atau jawaban", "Menghapus tujuan awal", "Selalu memanggil tool kedua"], answer: "B", explanation: "Observation perlu dibaca dalam konteks tujuan, format, kelengkapan data, dan kemungkinan error." },
                    { question: "Tool email mengembalikan permission denied. Respons terbaik adalah...", options: ["Mengatakan email berhasil agar pengguna tenang", "Mencoba mengirim ke penerima lain tanpa izin", "Menjelaskan akses ditolak dan tidak ada email yang terkirim", "Menghapus error dari jawaban"], answer: "C", explanation: "Sistem harus melaporkan keadaan sebenarnya. Mengklaim berhasil saat tool gagal menyesatkan pengguna dan dapat menimbulkan dampak operasional." },
                    { question: "Tindakan mana yang paling membutuhkan konfirmasi eksplisit?", options: ["Menghitung 12 x 8", "Merangkum teks yang diberikan", "Mengirim email kepada seluruh peserta", "Menjelaskan konsep API"], answer: "C", explanation: "Mengirim email adalah write action berdampak nyata. Penerima, isi, dan waktu pengiriman perlu dikonfirmasi." },
                    { question: "Kapan tool biasanya tidak diperlukan?", options: ["Saat pengguna meminta cuaca hari ini", "Saat data ada di spreadsheet besar", "Saat pengguna meminta merangkum teks yang sudah diberikan", "Saat jadwal aktual harus diperiksa"], answer: "C", explanation: "Ringkasan dapat dibuat dari konteks yang sudah tersedia; tool eksternal tidak menambah akurasi atau manfaat." }
                ]),
                diskusi: renderDiscussionPrompt("Seberapa jauh AI boleh menggunakan tool dan mengambil tindakan atas nama pengguna?", ["Tindakan apa yang boleh dilakukan tanpa konfirmasi?", "Bagaimana sistem menjelaskan tool, data, dan tujuan yang digunakan?", "Apa risiko ketika tool mengakses data pribadi?", "Kapan audit trail diperlukan?", "Siapa yang bertanggung jawab atas tindakan otomatis yang keliru?", "Bagaimana manusia tetap memiliki kontrol akhir?"], "Tool dapat meningkatkan kenyamanan dan efisiensi, tetapi read dan write action memiliki risiko privasi, keamanan, serta dampak yang berbeda.", "Pilih satu tool yang pernah kamu gunakan. Jelaskan data yang diakses, potensi dampak, dan konfirmasi yang seharusnya diminta.", "Tanggapi satu peserta lain dengan mengusulkan satu batas otorisasi atau bukti audit yang belum disebutkan.")
            }
        }
    ];

    const COURSE_SCAFFOLDS = {
        "/participant-ai-reasoning": {
            title: "Reasoning",
            displayTitle: "Cara AI Menalar, Merencanakan, dan Menggunakan Tools",
            category: "Foundation & Core AI",
            parentCourse: "AI Fundamentals & Advanced",
            icon: "fas fa-code-branch",
            status: "Scaffold aktif dengan konten diperkaya",
            moduleStatus: "Submateri scaffold",
            duration: "90-120 menit",
            level: "Fundamental",
            contentProgress: 100,
            progressTitle: "Status Konten",
            progressCopy: "Konten pembelajaran scaffold lengkap. Review mentor tetap diperlukan sebelum menjadi final canonical.",
            unitLabel: "submateri",
            actionLabel: "Buka submateri",
            sectionLabel: "Bagian pembelajaran",
            sectionTitle: "Empat submateri Reasoning",
            detailLabel: "Submateri Reasoning",
            activityTitles: {
                materi: "Materi scaffold Reasoning diperkaya",
                latihan: "Latihan scaffold Reasoning siap digunakan",
                kuis: "Kuis scaffold Reasoning dengan pembahasan",
                diskusi: "Panduan diskusi scaffold Reasoning"
            },
            summary: "Pelajari bagaimana AI mengolah masalah, menyusun rencana, menghasilkan langkah penyelesaian, dan menggunakan alat eksternal untuk memperoleh jawaban yang lebih akurat.",
            overviewHtml: REASONING_OVERVIEW,
            modules: REASONING_MODULES
        },
        "/participant-ai-lab-deep-learning": {
            title: "Deep Learning",
            category: "Foundation & Core AI",
            icon: "fas fa-layer-group",
            status: "Placeholder route",
            summary: "Course untuk memahami neural network modern, training loop, regularization, dan arsitektur deep learning.",
            modules: modules([
                ["Neural Network Basics", "Neuron, layer, activation, loss, dan intuisi dasar deep learning."],
                ["Training and Backpropagation", "Training loop, gradient descent, backpropagation, dan debugging training."],
                ["CNN and RNN Overview", "Gambaran arsitektur untuk data visual, sequential, dan temporal."],
                ["Transformer Basics", "Self-attention, embedding, positional encoding, dan pola transformer modern."],
                ["Regularization", "Overfitting, dropout, normalization, augmentation, dan strategi generalisasi."]
            ])
        },
        "/participant-ai-lab-reinforcement-learning": {
            title: "Reinforcement Learning",
            category: "Foundation & Core AI",
            icon: "fas fa-gamepad",
            status: "Placeholder route",
            summary: "Course tentang agent, environment, reward, policy, value function, dan decision optimization.",
            modules: modules([
                ["Agent and Environment", "Komponen dasar RL, state, action, environment, dan episode."],
                ["Reward and Policy", "Desain reward, policy, dan konsekuensi reward shaping."],
                ["Value Function", "Value, Q-value, Bellman intuition, dan estimasi keputusan."],
                ["Exploration vs Exploitation", "Tradeoff eksplorasi, eksploitasi, dan strategi belajar agent."],
                ["RL Case Study", "Studi kasus penerapan RL pada simulasi, game, atau optimisasi."]
            ])
        },
        "/participant-ai-lab-gen": {
            title: "Generative AI",
            category: "Generative & Multimodal AI",
            icon: "fas fa-wand-magic-sparkles",
            status: "Scaffold diperkaya",
            summary: "Course scaffold untuk memahami model generatif, prompting, pipeline output, evaluasi kualitas, risiko, dan workflow kreatif sebelum course final diaktifkan.",
            duration: "5 module draft",
            level: "Foundation to applied",
            contentProgress: 28,
            progressTitle: "Status Generative AI",
            progressCopy: "Outline materi, latihan, kuis, dan diskusi sudah diperkaya di scaffold. File canonical final belum dibuat.",
            sectionTitle: "Outline Generative AI scaffold",
            actionLabel: "Buka activity",
            modules: [
                {
                    slug: "generative-ai-overview",
                    title: "Generative AI Overview",
                    summary: "Memahami apa itu AI generatif, jenis output, use case, batasan, dan risiko dasar.",
                    materi: "Bahas perbedaan model diskriminatif dan generatif, contoh teks/gambar/audio/kode, pola input-output, serta batasan seperti halusinasi dan bias.",
                    latihan: "Petakan tiga produk AI generatif yang sering ditemui. Untuk tiap produk, tulis input, output, manfaat, risiko, dan bentuk human review yang masuk akal.",
                    kuis: "Uji pemahaman tentang karakteristik model generatif, jenis output, risiko umum, dan alasan manusia tetap perlu memeriksa hasil.",
                    diskusi: "Diskusikan kapan AI generatif layak dipakai untuk mempercepat pekerjaan, dan kapan hasilnya harus diperlakukan sebagai draft saja."
                },
                {
                    slug: "prompting-workflow",
                    title: "Prompting Workflow",
                    summary: "Menyusun prompt yang jelas, memberi konteks, menentukan format output, dan melakukan iterasi.",
                    materi: "Pelajari struktur prompt: tujuan, konteks, batasan, contoh, format jawaban, dan kriteria kualitas. Tekankan bahwa prompting adalah workflow iteratif, bukan sekali tulis.",
                    latihan: "Ubah prompt samar menjadi prompt terstruktur untuk tugas membuat ringkasan, rubric evaluasi, dan ide konten. Bandingkan versi awal dan versi hasil iterasi.",
                    kuis: "Evaluasi komponen prompt yang hilang, pilihan format output, dan strategi memperbaiki respons yang terlalu umum atau tidak sesuai konteks.",
                    diskusi: "Bagikan contoh prompt yang pernah gagal. Jelaskan bagian mana yang kurang jelas dan bagaimana kamu memperbaikinya."
                },
                {
                    slug: "generation-pipeline",
                    title: "Generation Pipeline",
                    summary: "Mengenali alur dari ide, data/konteks, generation, seleksi, revisi, hingga publish.",
                    materi: "Bahas pipeline praktis: brief, referensi, prompt, generasi variasi, kurasi, editing, validasi, dan delivery. Tekankan dokumentasi keputusan agar output bisa diaudit.",
                    latihan: "Rancang pipeline sederhana untuk membuat materi promosi acara fellowship: brief, target audiens, prompt, variasi output, checklist review, dan kriteria final.",
                    kuis: "Uji urutan pipeline, titik review manusia, penggunaan referensi, dan alasan output generatif tidak langsung dianggap final.",
                    diskusi: "Apa titik paling rawan dalam pipeline generatif: brief yang salah, prompt yang kabur, output tidak valid, atau review yang terburu-buru?"
                },
                {
                    slug: "output-evaluation",
                    title: "Output Evaluation",
                    summary: "Membangun rubric untuk menilai factuality, relevansi, safety, gaya, dan kesesuaian tujuan.",
                    materi: "Kenalkan evaluasi output generatif memakai rubric sederhana: akurasi fakta, kelengkapan, relevansi, tone, keamanan, bias, dan kebutuhan verifikasi sumber.",
                    latihan: "Nilai dua contoh output AI menggunakan rubric 1-5. Tulis alasan skor, bagian yang perlu diperbaiki, dan instruksi revisi yang lebih spesifik.",
                    kuis: "Uji pemilihan metrik evaluasi, tanda output berisiko, dan cara memberi feedback revisi yang bisa dieksekusi model.",
                    diskusi: "Untuk output yang terlihat bagus tetapi belum tentu benar, apa standar minimal sebelum dibagikan ke publik atau dipakai mengambil keputusan?"
                },
                {
                    slug: "creative-workflow",
                    title: "Creative Workflow",
                    summary: "Menggunakan AI generatif sebagai partner ide, variasi, kurasi, dan polishing tanpa melepas kendali kreatif.",
                    materi: "Bahas workflow kreatif: divergen untuk ide, konvergen untuk seleksi, refinement untuk kualitas, dan guardrail agar style, etika, serta brand tetap konsisten.",
                    latihan: "Buat workflow kreatif untuk satu aset kampanye. Tentukan brief, batasan brand, variasi yang diminta, rubric seleksi, dan final editing oleh manusia.",
                    kuis: "Uji pemahaman tentang eksplorasi ide, kurasi variasi, menjaga tone brand, dan membedakan bantuan AI dari keputusan kreatif manusia.",
                    diskusi: "Bagaimana menjaga orisinalitas, consent, dan rasa tanggung jawab saat memakai AI untuk karya kreatif?"
                }
            ]
        },
        "/participant-ai-lab-llm": {
            title: "LLM",
            category: "Generative & Multimodal AI",
            icon: "fas fa-message",
            status: "Placeholder route",
            summary: "Course tentang transformer, instruction tuning, RAG, fine-tuning, dan deployment large language model.",
            modules: modules([
                ["Transformer Recap", "Recap transformer sebagai fondasi large language model."],
                ["Prompting and Instruction", "Instruksi, format output, few-shot example, dan system behavior."],
                ["RAG Basics", "Retrieval augmented generation, chunking, embedding, dan grounding."],
                ["Fine-tuning Overview", "Kapan fine-tuning dibutuhkan, data training, dan batasannya."],
                ["Deployment Notes", "Serving, latency, cost, monitoring, dan safety untuk LLM."]
            ])
        },
        "/participant-ai-lab-vlm": {
            title: "VLM",
            category: "Generative & Multimodal AI",
            icon: "fas fa-eye",
            status: "Placeholder route",
            summary: "Course untuk memahami vision-language model, image-text alignment, captioning, dan visual reasoning.",
            modules: modules([
                ["Image-Text Alignment", "Cara model menghubungkan representasi visual dan bahasa."],
                ["Captioning", "Pembuatan caption, deskripsi gambar, dan batasan interpretasi visual."],
                ["Visual Question Answering", "Menjawab pertanyaan berbasis gambar dan konteks visual."],
                ["VLM Evaluation", "Metrik dan rubric evaluasi output vision-language."],
                ["VLM Use Cases", "Use case VLM untuk pendidikan, dokumentasi, aksesibilitas, dan produk."]
            ])
        },
        "/participant-ai-lab-multimodal-llm": {
            title: "Multimodal LLM",
            category: "Generative & Multimodal AI",
            icon: "fas fa-cubes",
            status: "Placeholder route",
            summary: "Course tentang model yang menggabungkan teks, gambar, audio, video, dan structured context.",
            modules: modules([
                ["Multimodal Inputs", "Jenis input multimodal dan cara merancang konteks lintas media."],
                ["Cross-modal Learning", "Intuisi pembelajaran lintas teks, gambar, audio, dan video."],
                ["Fusion Strategies", "Strategi menggabungkan sinyal dari beberapa modality."],
                ["Multimodal Evaluation", "Cara menguji akurasi, grounding, dan konsistensi output multimodal."],
                ["Product Patterns", "Pola produk untuk chatbot visual, assistant, dan workflow multimodal."]
            ])
        },
        "/participant-ai-lab-agentic-ai": {
            title: "Agentic AI",
            category: "Generative & Multimodal AI",
            icon: "fas fa-robot",
            status: "Placeholder route",
            summary: "Course untuk memahami tool use, planning, memory, workflow orchestration, dan evaluasi AI agents.",
            modules: modules([
                ["Agent Loop", "Observe, plan, act, reflect, dan batasan loop agent."],
                ["Tool Use", "Pemilihan tool, validasi argumen, dan handling error."],
                ["Planning", "Task decomposition, dependency, dan kontrol eksekusi."],
                ["Memory", "Short-term memory, long-term memory, dan risiko state persistence."],
                ["Agent Evaluation", "Evaluasi reliability, cost, safety, dan task success."]
            ])
        },
        "/participant-ai-lab-bioinformatics": {
            title: "Bioinformatics",
            category: "Data & Engineering Domains",
            icon: "fas fa-dna",
            status: "Placeholder route",
            summary: "Course tentang genomics, protein analysis, computational biology, dan aplikasi AI medis.",
            modules: modules([
                ["Bio Data Basics", "Jenis data biologis dan format umum untuk analisis komputasional."],
                ["Genomics Overview", "Sequence, variant, annotation, dan workflow genomics."],
                ["Protein Analysis", "Representasi protein, structure prediction, dan analisis fungsi."],
                ["Medical AI Risks", "Risiko bias, validasi klinis, privasi, dan interpretabilitas."],
                ["Bioinformatics Case Study", "Studi kasus pipeline AI untuk biological insight."]
            ])
        },
        "/participant-ai-lab-data-engineering": {
            title: "Data Engineering",
            category: "Data & Engineering Domains",
            icon: "fas fa-database",
            status: "Placeholder route",
            summary: "Course untuk membangun pipeline data, ETL, warehouse, lakehouse, orchestration, dan quality control.",
            modules: modules([
                ["Data Pipeline", "Alur ingest, transform, store, serve, dan monitoring data."],
                ["ETL and ELT", "Perbandingan ETL/ELT, batch, streaming, dan transformasi."],
                ["Warehouse and Lakehouse", "Model penyimpanan data untuk analytics dan AI workload."],
                ["Orchestration", "Scheduling, dependency, retry, dan observability pipeline."],
                ["Data Quality", "Validasi schema, completeness, freshness, dan lineage."]
            ])
        },
        "/participant-ai-lab-data-science": {
            title: "Data Science",
            category: "Data & Engineering Domains",
            icon: "fas fa-chart-line",
            status: "Placeholder route",
            summary: "Course tentang analytics, experimentation, visualization, modeling, dan insight generation.",
            modules: modules([
                ["Exploratory Analysis", "Memahami data dengan statistik deskriptif, segmentasi, dan anomaly check."],
                ["Experimentation", "Hipotesis, A/B testing, metric, dan interpretasi hasil eksperimen."],
                ["Visualization", "Memilih chart, membangun narasi visual, dan menghindari misleading chart."],
                ["Modeling", "Baseline model, feature, validation, dan interpretasi model sederhana."],
                ["Insight Storytelling", "Menyusun insight yang actionable untuk keputusan bisnis."]
            ])
        },
        "/participant-ai-lab-infrastructure": {
            title: "Infrastructure",
            category: "Data & Engineering Domains",
            icon: "fas fa-server",
            status: "Placeholder route",
            summary: "Course tentang cloud, GPU environment, serving stack, observability, dan scaling sistem AI.",
            modules: modules([
                ["Compute Basics", "CPU, GPU, memory, storage, dan kebutuhan compute AI."],
                ["GPU Environment", "Setup runtime, dependency, driver, dan resource management."],
                ["Serving Stack", "Komponen serving model, API, queue, dan cache."],
                ["Observability", "Log, metric, trace, alerting, dan incident visibility."],
                ["Scaling", "Horizontal scaling, load, autoscaling, dan cost control."]
            ])
        },
        "/participant-ai-lab-deployment": {
            title: "Deployment",
            category: "Data & Engineering Domains",
            icon: "fas fa-cloud-arrow-up",
            status: "Placeholder route",
            summary: "Course tentang packaging, API serving, model release, monitoring, dan rollback strategy.",
            modules: modules([
                ["Packaging", "Menyiapkan artifact, dependency, image, dan konfigurasi runtime."],
                ["API Serving", "Endpoint, schema, auth, timeout, dan error contract."],
                ["Release Strategy", "Versioning, staging, canary, dan approval sebelum rilis."],
                ["Monitoring", "Monitoring kualitas model, performa API, dan biaya."],
                ["Rollback", "Strategi rollback saat model atau service bermasalah."]
            ])
        },
        "/participant-ai-lab-front-end": {
            title: "Front-end",
            category: "Data & Engineering Domains",
            icon: "fas fa-code",
            status: "Placeholder route",
            summary: "Course untuk membangun interface, dashboard, visualization, accessibility, dan AI product UX.",
            modules: modules([
                ["AI Interface Patterns", "Pola UI untuk chat, assistant, copilots, dan review workflow."],
                ["Dashboard Basics", "Menyusun dashboard yang mudah dipindai dan dipakai berulang."],
                ["Visualization", "Menampilkan output, metric, dan data AI secara jelas."],
                ["Accessibility", "Aksesibilitas, keyboard flow, contrast, dan state feedback."],
                ["Frontend Integration", "Integrasi API AI, loading state, error state, dan streaming."]
            ])
        },
        "/participant-ai-lab-back-end": {
            title: "Back-end",
            category: "Data & Engineering Domains",
            icon: "fas fa-gears",
            status: "Placeholder route",
            summary: "Course tentang API, database, auth, queues, integration, dan scalable service design untuk produk AI.",
            modules: modules([
                ["API Design", "Contract endpoint, validation, pagination, dan error handling."],
                ["Database and Auth", "Model data, akses pengguna, permission, dan audit trail."],
                ["Queues", "Background job, retry, scheduling, dan async workload."],
                ["Integrations", "Integrasi model provider, webhook, dan third-party tools."],
                ["Service Scaling", "Scaling service, cache, rate limit, dan reliability."]
            ])
        },
        "/participant-ai-lab-business-insight": {
            title: "Business Insight",
            category: "Business & Industry Applications",
            icon: "fas fa-lightbulb",
            status: "Placeholder route",
            summary: "Course tentang AI analytics, market insight, decision support, dan business intelligence.",
            modules: modules([
                ["Business Question", "Merumuskan pertanyaan bisnis yang bisa dijawab dengan data dan AI."],
                ["Metric Design", "Mendesain metric, leading indicator, dan guardrail metric."],
                ["Insight Pipeline", "Mengubah data menjadi insight dengan workflow yang repeatable."],
                ["Decision Support", "Menggunakan AI untuk membantu prioritas dan keputusan operasional."],
                ["Executive Storytelling", "Menyampaikan rekomendasi secara singkat, jelas, dan berbasis bukti."]
            ])
        },
        "/participant-ai-lab-people-business-mgt": {
            title: "People & Business Mgt",
            category: "Business & Industry Applications",
            icon: "fas fa-people-group",
            status: "Placeholder route",
            summary: "Course tentang AI adoption, team process, change management, dan operational strategy.",
            modules: modules([
                ["AI Adoption", "Strategi adopsi AI yang realistis untuk tim dan organisasi."],
                ["Team Workflow", "Integrasi AI ke proses kerja tanpa menghilangkan akuntabilitas."],
                ["Change Management", "Mengelola resistensi, training, communication, dan rollout."],
                ["Governance", "Policy, risk review, permission, dan audit penggunaan AI."],
                ["Operational Strategy", "Menentukan prioritas use case, biaya, dan dampak operasional."]
            ])
        },
        "/participant-ai-lab-ai-culture": {
            title: "AI for Culture",
            category: "Business & Industry Applications",
            icon: "fas fa-palette",
            status: "Placeholder route",
            summary: "Course tentang AI untuk arsip budaya, kreativitas, bahasa lokal, dan cultural preservation.",
            modules: modules([
                ["Cultural Data", "Mengelola data budaya, metadata, konteks, dan provenance."],
                ["Language Preservation", "AI untuk dokumentasi bahasa lokal dan variasi linguistik."],
                ["Creative Workflow", "Workflow kreatif yang menghormati konteks budaya."],
                ["Culture Ethics", "Consent, ownership, representasi, dan risiko apropriasi."],
                ["Culture Case Study", "Studi kasus preservasi atau eksplorasi budaya dengan AI."]
            ])
        },
        "/participant-ai-lab-healthcare": {
            title: "AI for Healthcare",
            category: "Business & Industry Applications",
            icon: "fas fa-heart-pulse",
            status: "Placeholder route",
            summary: "Course tentang clinical decision support, imaging, patient analytics, dan ethical healthcare AI.",
            modules: modules([
                ["Healthcare Data", "Jenis data kesehatan, privasi, consent, dan quality requirement."],
                ["Clinical Decision Support", "AI sebagai pendukung keputusan klinis dan batas tanggung jawabnya."],
                ["Medical Imaging", "Use case imaging, diagnosis support, dan validasi model visual."],
                ["Patient Analytics", "Segmentasi pasien, prediksi risiko, dan insight operasional."],
                ["Safety and Ethics", "Safety, bias, audit, dan validasi sebelum penggunaan klinis."]
            ])
        },
        "/participant-ai-lab-ui-ux": {
            title: "UI/UX Design Thinking",
            category: "Business & Industry Applications",
            icon: "fas fa-pen-nib",
            status: "Placeholder route",
            summary: "Course tentang human-centered AI, prototyping, research, journey mapping, dan usability test.",
            modules: modules([
                ["User Research", "Riset kebutuhan, pain point, konteks, dan perilaku pengguna."],
                ["AI Journey Mapping", "Memetakan titik AI membantu, membatasi, atau perlu human review."],
                ["Prototyping", "Membuat prototype AI workflow untuk validasi cepat."],
                ["Usability Test", "Menilai kejelasan, trust, control, dan error recovery."],
                ["Design Evaluation", "Rubric evaluasi UX untuk produk berbasis AI."]
            ])
        },
        "/participant-ai-lab-manufacturing": {
            title: "AI for Manufacturing",
            category: "Business & Industry Applications",
            icon: "fas fa-industry",
            status: "Placeholder route",
            summary: "Course tentang predictive maintenance, quality inspection, robotics, dan process optimization.",
            modules: modules([
                ["Manufacturing Data", "Sensor, produksi, quality log, dan data operasional pabrik."],
                ["Predictive Maintenance", "Prediksi kerusakan, anomaly detection, dan preventive action."],
                ["Quality Inspection", "Computer vision dan automation untuk pemeriksaan kualitas."],
                ["Robotics", "AI pada robot, kontrol, safety, dan human-machine interaction."],
                ["Process Optimization", "Optimisasi proses, bottleneck, throughput, dan cost efficiency."]
            ])
        },
        "/participant-ai-lab-geospatial": {
            title: "AI for Geospatial",
            category: "Business & Industry Applications",
            icon: "fas fa-map-location-dot",
            status: "Placeholder route",
            summary: "Course tentang remote sensing, GIS intelligence, spatial modeling, dan location analytics.",
            modules: modules([
                ["Geospatial Data", "Raster, vector, coordinate system, dan sumber data geospasial."],
                ["Remote Sensing", "Satellite imagery, preprocessing, dan analisis citra bumi."],
                ["GIS Intelligence", "Spatial join, overlay, layer, dan insight berbasis lokasi."],
                ["Spatial Modeling", "Model prediksi dan klasifikasi berbasis data spasial."],
                ["Location Analytics", "Analitik lokasi untuk bisnis, lingkungan, dan kebijakan."]
            ])
        },
        "/participant-specialization-computer-vision": {
            title: "Computer Vision Track",
            category: "Specialization Track",
            icon: "fas fa-eye",
            status: "Track scaffold",
            summary: "Jalur spesialisasi untuk image processing, object detection, recognition, dan visual intelligence.",
            modules: modules([
                ["CV Course Review", "Review konsep computer vision dan readiness menuju spesialisasi."],
                ["OpenCV Practice", "Praktik image processing, filtering, dan transformasi dasar."],
                ["Detection Models", "Object detection, segmentation, dan use case industri."],
                ["Vision Transformers", "Konsep transformer untuk image dan multimodal vision."],
                ["CV Portfolio Project", "Proyek portofolio untuk menunjukkan kemampuan computer vision."]
            ])
        },
        "/participant-specialization-speech-recognition": {
            title: "Speech Recognition Track",
            category: "Specialization Track",
            icon: "fas fa-wave-square",
            status: "Track scaffold",
            summary: "Jalur spesialisasi untuk voice processing, audio analysis, ASR, dan text-to-speech.",
            modules: modules([
                ["Audio Basics", "Waveform, sample rate, spectrogram, dan fitur audio."],
                ["Feature Extraction", "MFCC, embedding audio, dan preprocessing suara."],
                ["ASR Pipeline", "Automatic speech recognition dari audio ke teks."],
                ["TTS Overview", "Text-to-speech, voice quality, dan synthesis workflow."],
                ["Speech Product Case", "Studi kasus produk berbasis suara dan evaluasinya."]
            ])
        },
        "/participant-specialization-nlp-llm": {
            title: "NLP & LLM Track",
            category: "Specialization Track",
            icon: "fas fa-message",
            status: "Track scaffold",
            summary: "Jalur spesialisasi untuk text generation, semantic understanding, retrieval, dan RAG.",
            modules: modules([
                ["NLP Foundation", "Token, embedding, classification, entity, dan semantic similarity."],
                ["LLM Workflow", "Prompt, instruction, context, dan structured output."],
                ["RAG System", "Retrieval, chunking, grounding, dan answer synthesis."],
                ["NLP Evaluation", "Metrik dan human evaluation untuk aplikasi bahasa."],
                ["NLP Capstone", "Proyek akhir NLP/LLM berbasis kebutuhan nyata."]
            ])
        },
        "/participant-specialization-mlops-deployment": {
            title: "MLOps & Deployment Track",
            category: "Specialization Track",
            icon: "fas fa-server",
            status: "Track scaffold",
            summary: "Jalur spesialisasi untuk cloud computing, model deployment, monitoring, dan scalability.",
            modules: modules([
                ["MLOps Overview", "Lifecycle model dari eksperimen sampai produksi."],
                ["Model Serving", "Serving pattern, API, batch inference, dan latency."],
                ["CI/CD", "Pipeline release, testing, artifact, dan environment promotion."],
                ["MLOps Monitoring", "Monitoring drift, quality, service health, dan cost."],
                ["Production Incident Drill", "Latihan menangani incident model atau service di produksi."]
            ])
        },
        "/participant-specialization-multimodal-llm": {
            title: "Multimodal LLM Track",
            category: "Specialization Track",
            icon: "fas fa-cubes",
            status: "Track scaffold",
            summary: "Jalur spesialisasi untuk VLM, cross-modal learning, multimodal UX, dan world models.",
            modules: modules([
                ["Multimodal Foundation", "Fondasi teks, gambar, audio, video, dan structured context."],
                ["VLM Use Cases", "Use case vision-language untuk produk dan analisis."],
                ["Cross-modal Evaluation", "Evaluasi keselarasan lintas modality dan grounding."],
                ["Product UX", "Desain UX untuk input dan output multimodal."],
                ["Multimodal Capstone", "Proyek akhir multimodal dengan evaluasi terstruktur."]
            ])
        },
        "/participant-specialization-medical-biology-ai": {
            title: "Medical & Biology AI Track",
            category: "Specialization Track",
            icon: "fas fa-dna",
            status: "Track scaffold",
            summary: "Jalur spesialisasi untuk genomics, protein analysis, computational biology, dan medical AI.",
            modules: modules([
                ["Bio Data Foundation", "Data biologis dan medis sebagai input sistem AI."],
                ["Clinical AI", "Clinical support, validation, dan governance untuk AI kesehatan."],
                ["Protein and Genomics", "Analisis protein, genomics, dan biological sequence."],
                ["Safety Review", "Review safety, bias, privacy, dan interpretability."],
                ["Medical Biology Capstone", "Proyek akhir medical/biology AI dengan laporan evaluasi."]
            ])
        }
    };

    window.HERAI_REASONING_COURSE = {
        title: "Reasoning",
        displayTitle: "Cara AI Menalar, Merencanakan, dan Menggunakan Tools",
        overviewHtml: REASONING_OVERVIEW,
        modules: REASONING_MODULES,
        referencesHtml: REASONING_REFERENCES
    };

    function getRouteState() {
        const hash = window.location.hash || "";
        const parts = hash.replace("#", "").split("?");
        const path = parts[0] || "/participant-modules";
        const params = new URLSearchParams(parts[1] || "");
        const activity = ACTIVITY_ORDER.includes(params.get("activity")) ? params.get("activity") : "materi";
        const moduleSlug = params.get("module") || "";
        return { path, params, activity, moduleSlug };
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function setText(selector, value) {
        document.querySelectorAll(selector).forEach(node => {
            node.textContent = value;
        });
    }

    function setIcon(selector, iconClass) {
        document.querySelectorAll(selector).forEach(node => {
            node.className = iconClass;
        });
    }

    function buildHref(basePath, moduleSlug, activity) {
        const params = new URLSearchParams();
        if (moduleSlug) params.set("module", moduleSlug);
        if (activity !== "materi") params.set("activity", activity);
        const query = params.toString();
        return `#${basePath}${query ? `?${query}` : ""}`;
    }

    function findModule(course, moduleSlug) {
        if (!moduleSlug) return null;
        return (course.modules || []).find(item => item.slug === moduleSlug) || null;
    }

    function renderModules(course, activeActivity) {
        const list = document.querySelector("[data-course-scaffold-modules]");
        if (!list) return;
        list.hidden = false;
        list.innerHTML = (course.modules || []).map((item, index) => `
            <li>
                <span>${index + 1}</span>
                <div>
                    <strong>${escapeHtml(item.title)}</strong>
                    <p>${escapeHtml(item.summary)}</p>
                    <a class="lesson-action" href="${buildHref(getRouteState().path, item.slug, activeActivity)}">${escapeHtml(course.actionLabel || "Buka module")}</a>
                </div>
            </li>
        `).join("");

        const richContent = document.querySelector("[data-course-scaffold-rich-content]");
        if (richContent) {
            const showOverview = activeActivity === "materi" && course.overviewHtml;
            richContent.hidden = !showOverview;
            richContent.innerHTML = showOverview ? course.overviewHtml : "";
        }
    }

    function renderModuleActivity(moduleData, activeActivity) {
        const list = document.querySelector("[data-course-scaffold-modules]");
        if (!list) return;
        const activityText = moduleData[activeActivity] || moduleData.materi;
        const richContent = document.querySelector("[data-course-scaffold-rich-content]");
        const richHtml = moduleData.rich && moduleData.rich[activeActivity];

        if (richHtml && richContent) {
            const moduleMeta = activeActivity === "materi" && (moduleData.duration || moduleData.learningObjectives) ? `
                <section class="reasoning-scaffold-module-meta">
                    <div class="reasoning-scaffold-module-meta-head">
                        <span><i class="far fa-clock" aria-hidden="true"></i> ${escapeHtml(moduleData.duration || "Durasi fleksibel")}</span>
                        ${(moduleData.references || []).length ? `<span><i class="fas fa-book" aria-hidden="true"></i> Rujukan ${moduleData.references.map(escapeHtml).join(", ")}</span>` : ""}
                    </div>
                    ${(moduleData.learningObjectives || []).length ? `<div><strong>Tujuan submateri</strong><ul>${moduleData.learningObjectives.map(objective => `<li>${escapeHtml(objective)}</li>`).join("")}</ul></div>` : ""}
                </section>` : "";
            list.hidden = true;
            list.innerHTML = "";
            richContent.hidden = false;
            richContent.innerHTML = `
                <a class="reasoning-scaffold-back" href="${buildHref(getRouteState().path, "", "materi")}">
                    <i class="fas fa-arrow-left" aria-hidden="true"></i> Kembali ke overview Reasoning
                </a>
                ${moduleMeta}
                ${richHtml}
            `;
            return;
        }

        list.hidden = false;
        if (richContent) {
            richContent.hidden = true;
            richContent.innerHTML = "";
        }
        list.innerHTML = `
            <li>
                <span>1</span>
                <div>
                    <strong>${escapeHtml(moduleData.title)}</strong>
                    <p>${escapeHtml(moduleData.summary)}</p>
                </div>
            </li>
            <li>
                <span>2</span>
                <div>
                    <strong>${escapeHtml(ACTIVITY_CONTENT[activeActivity].heading)}</strong>
                    <p>${escapeHtml(activityText)}</p>
                </div>
            </li>
        `;
    }

    function updateActivityTabs(basePath, moduleSlug, activeActivity) {
        ACTIVITY_ORDER.forEach(key => {
            document.querySelectorAll(`[data-course-scaffold-tab="${key}"]`).forEach(node => {
                node.setAttribute("href", buildHref(basePath, moduleSlug, key));
                node.classList.toggle("active", key === activeActivity);
            });
        });
    }

    function renderActivityContent(course, moduleData, activity) {
        const content = ACTIVITY_CONTENT[activity] || ACTIVITY_CONTENT.materi;
        const activityTitle = (course.activityTitles && course.activityTitles[activity]) || content.title;
        if (moduleData) {
            setText("[data-course-scaffold-activity-title]", `${activityTitle}: ${moduleData.title}`);
            setText("[data-course-scaffold-activity-copy]", moduleData[activity] || moduleData.materi);
            setText("[data-course-scaffold-section-label]", course.detailLabel || content.label);
            setText("[data-course-scaffold-section-title]", moduleData.title);
            renderModuleActivity(moduleData, activity);
            return;
        }

        setText("[data-course-scaffold-activity-title]", activityTitle);
        setText("[data-course-scaffold-activity-copy]", `${content.copy} Pilih salah satu ${course.unitLabel || "module"} ${course.title} untuk membuka detail activity.`);
        setText("[data-course-scaffold-section-label]", course.sectionLabel || "Overview course");
        setText("[data-course-scaffold-section-title]", course.sectionTitle || "Daftar module scaffold");
        renderModules(course, activity);
    }

    function initReasoningInteractions(page) {
        page.querySelectorAll("[data-reasoning-reveal]").forEach(button => {
            button.addEventListener("click", () => {
                const answer = button.parentElement.querySelector("[data-reasoning-answer]");
                if (!answer) return;
                const willOpen = answer.hidden;
                answer.hidden = !willOpen;
                button.setAttribute("aria-expanded", String(willOpen));
                button.innerHTML = willOpen
                    ? '<i class="fas fa-eye-slash" aria-hidden="true"></i> Tutup pembahasan'
                    : '<i class="fas fa-lightbulb" aria-hidden="true"></i> Lihat pembahasan';
            });
        });

        page.querySelectorAll("[data-reasoning-check]").forEach(button => {
            button.addEventListener("click", () => {
                const question = button.closest(".reasoning-scaffold-question");
                const selected = question && question.querySelector('input[type="radio"]:checked');
                const feedback = question && question.querySelector("[data-reasoning-feedback]");
                if (!question || !feedback) return;

                question.querySelectorAll("label").forEach(label => label.classList.remove("is-correct", "is-wrong"));
                if (!selected) {
                    feedback.hidden = false;
                    feedback.className = "reasoning-scaffold-feedback is-warning";
                    feedback.textContent = "Pilih satu jawaban terlebih dahulu.";
                    return;
                }

                const correctAnswer = question.dataset.correctAnswer;
                const isCorrect = selected.value === correctAnswer;
                const correctInput = question.querySelector(`input[value="${correctAnswer}"]`);
                if (correctInput) correctInput.closest("label").classList.add("is-correct");
                if (!isCorrect) selected.closest("label").classList.add("is-wrong");

                feedback.hidden = false;
                feedback.className = `reasoning-scaffold-feedback ${isCorrect ? "is-correct" : "is-wrong"}`;
                feedback.textContent = `${isCorrect ? "Benar." : "Belum tepat."} ${question.dataset.explanation || "Baca kembali materi dan periksa alasan pilihanmu."}`;
            });
        });
    }

    window.initCoursePlaceholder = function () {
        const page = document.querySelector(".course-scaffold-page");
        if (!page) return;

        const state = getRouteState();
        page.classList.toggle("reasoning-scaffold-page", state.path === "/participant-ai-reasoning");
        const data = COURSE_SCAFFOLDS[state.path] || {
            title: "Course Scaffold",
            category: "Course Catalog",
            icon: "fas fa-layer-group",
            status: "Scaffold",
            summary: "Outline awal course sudah disiapkan untuk diisi tim konten.",
            modules: modules([
                ["Overview konsep dan istilah penting", "Draft overview untuk fondasi course."],
                ["Workflow dasar dan contoh penerapan", "Draft workflow praktik untuk peserta."],
                ["Risiko, evaluasi, dan best practice", "Draft evaluasi dan mitigasi risiko."],
                ["Mini project atau studi kasus", "Draft studi kasus untuk mengunci pemahaman."]
            ])
        };
        const currentModule = findModule(data, state.moduleSlug);

        setText("[data-course-scaffold-title]", data.title);
        setText("[data-course-scaffold-category]", data.category);
        setText("[data-course-scaffold-heading]", currentModule ? currentModule.title : (data.displayTitle || data.title));
        setText("[data-course-scaffold-summary]", currentModule ? currentModule.summary : data.summary);
        setText("[data-course-scaffold-status]", currentModule ? (data.moduleStatus || "Module scaffold") : data.status);
        setText("[data-course-scaffold-count]", String((data.modules || []).length));
        setText("[data-course-scaffold-duration]", data.duration || "Draft outline");
        setText("[data-course-scaffold-unit]", data.unitLabel || "topik awal");
        setText("[data-course-scaffold-level]", data.level || "");
        setText("[data-course-scaffold-progress-title]", data.progressTitle || "Status Course");
        setText("[data-course-scaffold-progress-copy]", data.progressCopy || "Scaffold sudah tersedia. Konten lengkap belum aktif.");
        document.querySelectorAll("[data-course-scaffold-level-wrap]").forEach(node => {
            node.hidden = !data.level;
        });
        const progressValue = Number.isFinite(data.contentProgress) ? data.contentProgress : 12;
        const progressBar = page.querySelector(".lesson-progress-mini b");
        const progressLabel = page.querySelector(".lesson-progress-mini strong");
        if (progressBar) progressBar.style.setProperty("--value", `${progressValue}%`);
        if (progressLabel) progressLabel.textContent = `${progressValue}%`;
        setIcon("[data-course-scaffold-icon]", data.icon);
        setIcon("[data-course-scaffold-visual-icon]", data.icon);
        renderActivityContent(data, currentModule, state.activity);
        updateActivityTabs(state.path, currentModule ? currentModule.slug : "", state.activity);
        initReasoningInteractions(page);
    };
})();

````
