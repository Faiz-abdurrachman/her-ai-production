(function () {
    const STORAGE = {
        chapter: "heraiAiBioinformaticsCurrentChapter",
        practice: "heraiAiBioinformaticsPractice",
        quizDone: "heraiAiBioinformaticsQuizDone",
        quizScore: "heraiAiBioinformaticsQuizScore",
        quizAnswers: "heraiAiBioinformaticsQuizAnswers",
        discussion: "heraiAiBioinformaticsDiscussion",
        readiness: "heraiAiBioinformaticsReadiness"
    };

    const SOURCE_BASE = "/pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/02-python-untuk-ai/chapters/";
    const MODULE_ID = 'bioinformatics';


    var pyodideInstance = null;
    var pyodideReady = false;
    var pyodideLoading = false;
    var activeChapterRequest = 0;

    function startPyodide() {
        if (pyodideReady) { enableAllPlaygrounds(); return; }
        var status = document.getElementById('pyodideStatus');
        if (typeof loadPyodide === 'undefined') {
            if (status) { status.querySelector('span').textContent = 'Python runtime tidak tersedia.'; }
            return;
        }
        if (pyodideLoading) return;
        pyodideLoading = true;
        var runs = document.querySelectorAll('.py-run');
        runs.forEach(function(b) { b.disabled = true; b.textContent = 'Loading...'; });
        var bars = 0;
        var interval = setInterval(function() {
            bars = (bars + 1) % 4;
            if (status) {
                var s = status.querySelector('span');
                if (s && !pyodideReady) s.textContent = 'Memuat Python runtime' + '.'.repeat(bars);
            }
        }, 400);
        loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' }).then(function(py) {
            pyodideInstance = py;
            pyodideReady = true;
            clearInterval(interval);
            if (status) { status.classList.add('ready'); status.querySelector('span').textContent = 'Python runtime siap.'; }
            enableAllPlaygrounds();
        }).catch(function(err) {
            clearInterval(interval);
            if (status) status.querySelector('span').textContent = 'Gagal: ' + (err.message || 'unknown');
        });
    }

    function enableAllPlaygrounds() {
        document.querySelectorAll('.py-run').forEach(function(b) { b.disabled = false; b.textContent = 'Run'; });
    }

    function runCode(playId) {
        if (!pyodideReady || !pyodideInstance) return;
        var editor = document.querySelector('#play-' + playId + ' .py-editor');
        var output = document.querySelector('#play-' + playId + ' .py-output');

        if (!editor || !output) return;
        var code = editor.value;
        output.className = 'py-output visible';
        output.textContent = 'Running...';
        var cap = '';
        pyodideInstance.setStdout({ batched: function(t) { cap += t + String.fromCharCode(10); } });
        pyodideInstance.setStderr({ batched: function(t) { cap += t + String.fromCharCode(10); } });
        pyodideInstance.loadPackagesFromImports(code).then(function() {
            return pyodideInstance.runPythonAsync(code);
        }).then(function(r) {
            var rt = r !== undefined ? String(r) : '';
            var fin = cap ? cap.trimEnd() : '';
            if (rt && fin) fin += String.fromCharCode(10) + rt;
            else if (rt) fin = rt;
            output.textContent = fin || '(ok)';
            output.classList.remove('error');
        }).catch(function(err) {
            var fin = cap ? cap.trimEnd() + String.fromCharCode(10) : '';
            fin += 'Error: ' + (err.message || err);
            output.textContent = fin;
            output.classList.add('error');
        });
    }

const CHAPTERS = [
    {
        "title": "Fondasi Biologi Molekuler untuk Komputasi",
        "shortTitle": "Fondasi Biologi M...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Fondasi Biologi Molekuler untuk Komputasi",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/data-engineering-domains/bioinformatics/chapters/01-topic.html"
    },
    {
        "title": "Sekuens, Format, dan Database Biologi",
        "shortTitle": "Sekuens, Format, ...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Sekuens, Format, dan Database Biologi",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/data-engineering-domains/bioinformatics/chapters/02-topic.html"
    },
    {
        "title": "Alignment dan Sequence Search",
        "shortTitle": "Alignment dan Seq...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Alignment dan Sequence Search",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/data-engineering-domains/bioinformatics/chapters/03-topic.html"
    },
    {
        "title": "Genomics dan Genome Assembly",
        "shortTitle": "Genomics dan Geno...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Genomics dan Genome Assembly",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/data-engineering-domains/bioinformatics/chapters/04-topic.html"
    },
    {
        "title": "Transcriptomics dan Gene Expression",
        "shortTitle": "Transcriptomics d...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Transcriptomics dan Gene Expression",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/data-engineering-domains/bioinformatics/chapters/05-topic.html"
    },
    {
        "title": "Variant Calling dan Annotation",
        "shortTitle": "Variant Calling d...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Variant Calling dan Annotation",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/data-engineering-domains/bioinformatics/chapters/06-topic.html"
    },
    {
        "title": "Protein Structure dan Function",
        "shortTitle": "Protein Structure...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Protein Structure dan Function",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/data-engineering-domains/bioinformatics/chapters/07-topic.html"
    },
    {
        "title": "Machine Learning dan Biological Foundation Model",
        "shortTitle": "Machine Learning ...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Machine Learning dan Biological Foundation Model",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/data-engineering-domains/bioinformatics/chapters/08-topic.html"
    },
    {
        "title": "Workflow, Reproducibility, dan Data Provenance",
        "shortTitle": "Workflow, Reprodu...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Workflow, Reproducibility, dan Data Provenance",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/data-engineering-domains/bioinformatics/chapters/09-topic.html"
    },
    {
        "title": "Statistika, Etika, Privasi, dan Batas Klinis",
        "shortTitle": "Statistika, Etika...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Statistika, Etika, Privasi, dan Batas Klinis",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/data-engineering-domains/bioinformatics/chapters/10-topic.html"
    },
    {
        "title": "Mini Project: Klasifikasi Sekuens dengan Biological Split",
        "shortTitle": "Mini Project: Kla...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Mini Project: Klasifikasi Sekuens dengan Biological Split",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/data-engineering-domains/bioinformatics/chapters/11-topic.html"
    },
    {
        "title": "Kuis Akhir",
        "shortTitle": "Kuis Akhir",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Kuis Akhir",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/data-engineering-domains/bioinformatics/chapters/12-topic.html"
    },
    {
        "title": "Diskusi dan Refleksi",
        "shortTitle": "Diskusi dan Refleksi",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Diskusi dan Refleksi",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/data-engineering-domains/bioinformatics/chapters/13-topic.html"
    },
    {
        "title": "Glosarium dan Checklist",
        "shortTitle": "Glosarium dan Che...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Glosarium dan Checklist",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/data-engineering-domains/bioinformatics/chapters/14-topic.html"
    },
    {
        "title": "Ringkasan dan Referensi",
        "shortTitle": "Ringkasan dan Ref...",
        "duration": "20 menit",
        "icon": "fas fa-brain",
        "summary": "Materi mengenai Ringkasan dan Referensi",
        "objectives": [
            "Memahami konsep dasar",
            "Mampu mengidentifikasi penggunaan praktis"
        ],
        "sourcePath": "/pages/frontend/fellow-dashboard/data-engineering-domains/bioinformatics/chapters/15-topic.html"
    }
];

    const PYTHON_GUIDES = [
        {
hook: {
                question: "Fondasi Biologi Molekuler untuk Komputasi tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang bai...",
                answerA: {
                    label: "Mitos umum",
                    text: "Anggapan yang sering muncul tapi perlu diklarifikasi.",
                    icon: "fas fa-question-circle"
                },
                answerB: {
                    label: "Faktanya",
                    text: "Pemahaman yang lebih akurat berdasarkan praktik nyata.",
                    icon: "fas fa-lightbulb"
                },
                message: "Analogi: Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.\n\nPada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsi"
            },
flow: [
                ["Tentukan tujuan fondasi biologi molekuler untuk...", "Tentukan tujuan fondasi biologi molekuler untuk komputasi dan keputusan yang akan dipengaruhi."],
                ["Petakan input, output, pemilik, pengguna, serta...", "Petakan input, output, pemilik, pengguna, serta batas sistem."],
                ["Tetapkan definisi dan kriteria penerimaan untuk...", "Tetapkan definisi dan kriteria penerimaan untuk DNA serta RNA."],
                ["Bangun versi kecil menggunakan data atau skenar...", "Bangun versi kecil menggunakan data atau skenario yang aman."],
                ["Uji hasil, kegagalan, kelompok khusus, dan kond...", "Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem."],
                ["Dokumentasikan keputusan, bukti, keterbatasan, ...", "Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut."]
            ],
deepDive: [
                ["Pendalaman Materi", "Konsep-konsep inti dari bab ini.", "Hubungan dengan praktik di lapangan."]
            ],
workedExample: [
                "Dalam mini project Klasifikasi Sekuens dengan Biological Split, tim perlu menerapkan fondasi biologi",
                ["Data atau input belum lengkap", "Tolak, minta perbaikan, atau gunakan fallback"],
                ["Hasil belum pasti", "Tampilkan ketidakpastian dan minta review"],
                ["Beban meningkat", "Scale, antrekan, atau pembatasan"],
                ["Perubahan berisiko", "Uji terbatas dan siapkan rollback"]
            ],
glossary: [
                ["DNA", "Molekul yang menyimpan informasi genetik — terdiri dari 4 nukleotida: A, T, G, C. Panjang: ~3 miliar pasang basa pada manusia. Fondasi dari semua analisis bioinformatika."],
                ["RNA", "Molekul yang mentranskripsi dan mentranslasi informasi dari DNA ke protein. mRNA (messenger), tRNA (transfer), rRNA (ribosomal). RNA-seq mengukur ekspresi gen."],
                ["protein", "Molekul yang menjalankan fungsi biologis: enzim, reseptor, struktural. Terdiri dari 20 asam amino. Struktur 3D protein menentukan fungsinya — fokus utama AI untuk bioinformatika."],
                ["gene", "Segmen DNA yang mengkode protein atau RNA fungsional. Manusia punya ~20.000 gen coding. Ekspresi gen: seberapa aktif suatu gen di jaringan tertentu."],
                ["expression", "Tingkat aktivitas gen — seberapa banyak mRNA diproduksi. Diukur dengan RNA-seq atau microarray. Ekspresi tinggi = gen aktif. Ekspresi berbeda antar jaringan dan kondisi."],
                ["central dogma", "Aliran informasi dalam biologi: DNA → RNA → Protein. DNA ditranskripsi jadi RNA, RNA ditranslasi jadi protein. Ini adalah tulang punggung biologi molekuler."]
            ],
quickCheck: {
                question: "Jelaskan DNA dengan kalimat sendiri dan berikan satu contoh.",
                options: ["Jawaban A (belum tentu tepat)", "Jawaban B (belum tentu tepat)", "Jawaban C (belum tentu tepat)"],
                answer: 1,
                explanationCorrect: "Tepat. Pemahaman ini penting untuk materi selanjutnya.",
                explanationWrong: "Coba pikirkan ulang — hubungkan dengan konsep yang sudah dipelajari."
            },
challenge: {
                instruction: "Buat diagram sederhana yang menghubungkan DNA, RNA, protein, gene. Tandai asumsi dan titik kegagalan.",
                placeholder: "Tulis jawaban Anda di sini...",
                example: ""
            },
roadmapRef: "1"
        },
        {
hook: {
                question: "Sekuens, Format, dan Database Biologi tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik se...",
                answerA: {
                    label: "Mitos umum",
                    text: "Anggapan yang sering muncul tapi perlu diklarifikasi.",
                    icon: "fas fa-question-circle"
                },
                answerB: {
                    label: "Faktanya",
                    text: "Pemahaman yang lebih akurat berdasarkan praktik nyata.",
                    icon: "fas fa-lightbulb"
                },
                message: "Analogi: Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.\n\nPada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsi"
            },
flow: [
                ["Tentukan tujuan sekuens, format, dan database b...", "Tentukan tujuan sekuens, format, dan database biologi dan keputusan yang akan dipengaruhi."],
                ["Petakan input, output, pemilik, pengguna, serta...", "Petakan input, output, pemilik, pengguna, serta batas sistem."],
                ["Tetapkan definisi dan kriteria penerimaan untuk...", "Tetapkan definisi dan kriteria penerimaan untuk FASTA serta FASTQ."],
                ["Bangun versi kecil menggunakan data atau skenar...", "Bangun versi kecil menggunakan data atau skenario yang aman."],
                ["Uji hasil, kegagalan, kelompok khusus, dan kond...", "Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem."],
                ["Dokumentasikan keputusan, bukti, keterbatasan, ...", "Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut."]
            ],
deepDive: [
                ["Pendalaman Materi", "Konsep-konsep inti dari bab ini.", "Hubungan dengan praktik di lapangan."]
            ],
workedExample: [
                "Dalam mini project Klasifikasi Sekuens dengan Biological Split, tim perlu menerapkan sekuens, format",
                ["Data atau input belum lengkap", "Tolak, minta perbaikan, atau gunakan fallback"],
                ["Hasil belum pasti", "Tampilkan ketidakpastian dan minta review"],
                ["Beban meningkat", "Scale, antrekan, atau pembatasan"],
                ["Perubahan berisiko", "Uji terbatas dan siapkan rollback"]
            ],
glossary: [
                ["FASTA", "Format teks untuk menyimpan sekuens biologis: header (>) + sekuens (huruf). Sederhana, human-readable. Standar de facto untuk menyimpan DNA/RNA/protein sequences."],
                ["FASTQ", "Format yang menggabungkan sekuens + kualitas (quality score). Setiap basa punya score Phred: Q30 = 1 error per 1000 basa. FASTQ mentah dari sequencing machine."],
                ["quality score", "Nilai yang menunjukkan probabilitas error pada setiap basa. Q30: 99.9% akurat. Filter by quality score = langkah pertama preprocessing data sequencing."],
                ["annotation", "Memberi informasi fungsional pada sekuens: gen apa yang ada, di mana exon/intron, apa fungsi proteinnya. Annotation database seperti RefSeq dan Ensembl."],
                ["accession", "ID unik untuk setiap entri di database biologis: NC_000001 (kromosom 1 manusia), NP_001234 (protein). Gunakan accession sebagai referensi — bukan nama yang ambigu."],
                ["database", "Repositori data biologis: NCBI (semua), Ensembl (genom), UniProt (protein), PDB (struktur 3D), COSMIC (kanker). Query via API atau FTP download."]
            ],
quickCheck: {
                question: "Jelaskan FASTA dengan kalimat sendiri dan berikan satu contoh.",
                options: ["Jawaban A (belum tentu tepat)", "Jawaban B (belum tentu tepat)", "Jawaban C (belum tentu tepat)"],
                answer: 1,
                explanationCorrect: "Tepat. Pemahaman ini penting untuk materi selanjutnya.",
                explanationWrong: "Coba pikirkan ulang — hubungkan dengan konsep yang sudah dipelajari."
            },
challenge: {
                instruction: "Buat diagram sederhana yang menghubungkan FASTA, FASTQ, quality score, annotation. Tandai asumsi dan titik kegagalan.",
                placeholder: "Tulis jawaban Anda di sini...",
                example: ""
            },
roadmapRef: "2"
        },
        {
hook: {
                question: "Alignment dan Sequence Search tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dim...",
                answerA: {
                    label: "Mitos umum",
                    text: "Anggapan yang sering muncul tapi perlu diklarifikasi.",
                    icon: "fas fa-question-circle"
                },
                answerB: {
                    label: "Faktanya",
                    text: "Pemahaman yang lebih akurat berdasarkan praktik nyata.",
                    icon: "fas fa-lightbulb"
                },
                message: "Analogi: Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.\n\nPada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsi"
            },
flow: [
                ["Tentukan tujuan alignment dan sequence search d...", "Tentukan tujuan alignment dan sequence search dan keputusan yang akan dipengaruhi."],
                ["Petakan input, output, pemilik, pengguna, serta...", "Petakan input, output, pemilik, pengguna, serta batas sistem."],
                ["Tetapkan definisi dan kriteria penerimaan untuk...", "Tetapkan definisi dan kriteria penerimaan untuk pairwise serta multiple alignment."],
                ["Bangun versi kecil menggunakan data atau skenar...", "Bangun versi kecil menggunakan data atau skenario yang aman."],
                ["Uji hasil, kegagalan, kelompok khusus, dan kond...", "Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem."],
                ["Dokumentasikan keputusan, bukti, keterbatasan, ...", "Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut."]
            ],
deepDive: [
                ["Pendalaman Materi", "Konsep-konsep inti dari bab ini.", "Hubungan dengan praktik di lapangan."]
            ],
workedExample: [
                "Dalam mini project Klasifikasi Sekuens dengan Biological Split, tim perlu menerapkan alignment dan s",
                ["Data atau input belum lengkap", "Tolak, minta perbaikan, atau gunakan fallback"],
                ["Hasil belum pasti", "Tampilkan ketidakpastian dan minta review"],
                ["Beban meningkat", "Scale, antrekan, atau pembatasan"],
                ["Perubahan berisiko", "Uji terbatas dan siapkan rollback"]
            ],
glossary: [
                ["pairwise", "Perbandingan dua sekuens — alignment optimal antara sekuens A dan B. Algoritma: Needleman-Wunsch (global alignment), Smith-Waterman (local alignment). Dasar dari homology search."],
                ["multiple alignment", "Alignment tiga atau lebih sekuens secara simultan. Menunjukkan region conserved (penting secara evolusi/ fungsional). Lebih informatif dari pairwise — bisa lihat pattern antar spesies."],
                ["similarity", "Persentase kemiripan antar sekuens: 'Human vs Chimp: 99% similarity pada gen X'. Similarity tinggi = kemungkinan fungsi serupa. Tapi homology (hubungan evolusi) ≠ similarity."],
                ["homology", "Hubungan evolusi karena nenek moyang bersama. Ortholog: gen yang divergen karena spesiasi. Paralog: gen yang divergen karena duplikasi. Homology = derived from common ancestor."],
                ["score", "Nilai numerik yang menunjukkan kualitas alignment: match (+1), mismatch (-1), gap (-2). Scoring matrix: BLOSUM62 untuk protein. Score lebih tinggi = alignment lebih baik."],
                ["gap", "Celah yang dimasukkan ke alignment karena satu sekuens lebih pendek. Gap penalty: biaya untuk membuka (-11) dan memperpanjang (-1) gap. Gap = deletion atau insertion evolusi."]
            ],
quickCheck: {
                question: "Jelaskan pairwise dengan kalimat sendiri dan berikan satu contoh.",
                options: ["Jawaban A (belum tentu tepat)", "Jawaban B (belum tentu tepat)", "Jawaban C (belum tentu tepat)"],
                answer: 1,
                explanationCorrect: "Tepat. Pemahaman ini penting untuk materi selanjutnya.",
                explanationWrong: "Coba pikirkan ulang — hubungkan dengan konsep yang sudah dipelajari."
            },
challenge: {
                instruction: "Buat diagram sederhana yang menghubungkan pairwise, multiple alignment, similarity, homology. Tandai asumsi dan titik kegagalan.",
                placeholder: "Tulis jawaban Anda di sini...",
                example: ""
            },
roadmapRef: "3"
        },
        {
hook: {
                question: "Genomics dan Genome Assembly tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu dimu...",
                answerA: {
                    label: "Mitos umum",
                    text: "Anggapan yang sering muncul tapi perlu diklarifikasi.",
                    icon: "fas fa-question-circle"
                },
                answerB: {
                    label: "Faktanya",
                    text: "Pemahaman yang lebih akurat berdasarkan praktik nyata.",
                    icon: "fas fa-lightbulb"
                },
                message: "Analogi: Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.\n\nPada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsi"
            },
flow: [
                ["Tentukan tujuan genomics dan genome assembly da...", "Tentukan tujuan genomics dan genome assembly dan keputusan yang akan dipengaruhi."],
                ["Petakan input, output, pemilik, pengguna, serta...", "Petakan input, output, pemilik, pengguna, serta batas sistem."],
                ["Tetapkan definisi dan kriteria penerimaan untuk...", "Tetapkan definisi dan kriteria penerimaan untuk read serta contig."],
                ["Bangun versi kecil menggunakan data atau skenar...", "Bangun versi kecil menggunakan data atau skenario yang aman."],
                ["Uji hasil, kegagalan, kelompok khusus, dan kond...", "Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem."],
                ["Dokumentasikan keputusan, bukti, keterbatasan, ...", "Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut."]
            ],
deepDive: [
                ["Pendalaman Materi", "Konsep-konsep inti dari bab ini.", "Hubungan dengan praktik di lapangan."]
            ],
workedExample: [
                "Dalam mini project Klasifikasi Sekuens dengan Biological Split, tim perlu menerapkan genomics dan ge",
                ["Data atau input belum lengkap", "Tolak, minta perbaikan, atau gunakan fallback"],
                ["Hasil belum pasti", "Tampilkan ketidakpastian dan minta review"],
                ["Beban meningkat", "Scale, antrekan, atau pembatasan"],
                ["Perubahan berisiko", "Uji terbatas dan siapkan rollback"]
            ],
glossary: [
                ["read", "Pembacaan pendek (100-300 bp) dari sequencing machine. Hasil sequencing: jutaan reads. Setiap read adalah fragmen kecil dari genom asli — harus di-assembly."],
                ["contig", "Kumpulan reads yang overlap menjadi fragmen kontinu. Hasil assembly: reads → contigs → scaffolds → chromosome. Contig panjang = assembly lebih baik."],
                ["coverage", "Rata-rata berapa kali setiap posisi genom dibaca. 30x coverage = setiap posisi dibaca 30x. Coverage tinggi = akurat (bisa koreksi error), tapi biaya lebih mahal."],
                ["assembly", "Proses menyusun reads pendek menjadi genom lengkap. de novo assembly: tanpa referensi. reference-based: align ke genom referensi yang sudah ada."],
                ["reference", "Genom standar yang dipakai sebagai acuan: GRCh38 (human). Sampel baru di-align ke referensi, bukan di-assembly dari nol. Referensi adalah 'rata-rata' — tidak mewakili semua variasi."],
                ["quality", "Metrics kualitas assembly: N50 (50% genome dalam contigs sepanjang X), completeness (berapa % gen lengkap), error rate. Assembly yang baik = N50 besar + completeness tinggi."]
            ],
quickCheck: {
                question: "Jelaskan read dengan kalimat sendiri dan berikan satu contoh.",
                options: ["Jawaban A (belum tentu tepat)", "Jawaban B (belum tentu tepat)", "Jawaban C (belum tentu tepat)"],
                answer: 1,
                explanationCorrect: "Tepat. Pemahaman ini penting untuk materi selanjutnya.",
                explanationWrong: "Coba pikirkan ulang — hubungkan dengan konsep yang sudah dipelajari."
            },
challenge: {
                instruction: "Buat diagram sederhana yang menghubungkan read, contig, coverage, assembly. Tandai asumsi dan titik kegagalan.",
                placeholder: "Tulis jawaban Anda di sini...",
                example: ""
            },
roadmapRef: "4"
        },
        {
hook: {
                question: "Transcriptomics dan Gene Expression tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik sela...",
                answerA: {
                    label: "Mitos umum",
                    text: "Anggapan yang sering muncul tapi perlu diklarifikasi.",
                    icon: "fas fa-question-circle"
                },
                answerB: {
                    label: "Faktanya",
                    text: "Pemahaman yang lebih akurat berdasarkan praktik nyata.",
                    icon: "fas fa-lightbulb"
                },
                message: "Analogi: Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.\n\nPada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsi"
            },
flow: [
                ["Tentukan tujuan transcriptomics dan gene expres...", "Tentukan tujuan transcriptomics dan gene expression dan keputusan yang akan dipengaruhi."],
                ["Petakan input, output, pemilik, pengguna, serta...", "Petakan input, output, pemilik, pengguna, serta batas sistem."],
                ["Tetapkan definisi dan kriteria penerimaan untuk...", "Tetapkan definisi dan kriteria penerimaan untuk RNA-seq serta count."],
                ["Bangun versi kecil menggunakan data atau skenar...", "Bangun versi kecil menggunakan data atau skenario yang aman."],
                ["Uji hasil, kegagalan, kelompok khusus, dan kond...", "Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem."],
                ["Dokumentasikan keputusan, bukti, keterbatasan, ...", "Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut."]
            ],
deepDive: [
                ["Pendalaman Materi", "Konsep-konsep inti dari bab ini.", "Hubungan dengan praktik di lapangan."]
            ],
workedExample: [
                "Dalam mini project Klasifikasi Sekuens dengan Biological Split, tim perlu menerapkan transcriptomics",
                ["Data atau input belum lengkap", "Tolak, minta perbaikan, atau gunakan fallback"],
                ["Hasil belum pasti", "Tampilkan ketidakpastian dan minta review"],
                ["Beban meningkat", "Scale, antrekan, atau pembatasan"],
                ["Perubahan berisiko", "Uji terbatas dan siapkan rollback"]
            ],
glossary: [
                ["RNA-seq", "Teknologi untuk mengukur ekspresi gen: sekuensing RNA → mapping ke genom → hitung reads per gen. Output: count matrix (gen × sample). Input utama untuk differential expression."],
                ["count", "Jumlah reads yang di-map ke setiap gen. Raw count: integer, dipengaruhi oleh library size dan panjang gen. Normalisasi diperlukan sebelum perbandingan antar sample."],
                ["normalization", "Menyesuaikan count agar komparabel antar sample: TPM (per gen length), DESeq2 (median of ratios), edgeR (TMM). Tanpa normalisasi, perbedaan bisa karena library size, bukan biologi."],
                ["differential expression", "Gen yang ekspresinya berbeda signifikan antar kondisi: healthy vs disease, treated vs control. Output: log2 fold change + p-value + adjusted p-value. Volcano plot untuk visualisasi."],
                ["batch effect", "Variasi teknis antar batch eksperimen: lab berbeda, reagent berbeda, personel berbeda. Efek bisa lebih besar dari efek biologis. Koreksi: ComBat, limma, Harmony."],
                ["pathway", "Kumpulan gen yang bekerja bersama dalam proses biologis: KEGG, Reactome, GO terms. Pathway analysis: gen yang naik/turun apakah meng-enrich pathway tertentu?"]
            ],
quickCheck: {
                question: "Jelaskan RNA-seq dengan kalimat sendiri dan berikan satu contoh.",
                options: ["Jawaban A (belum tentu tepat)", "Jawaban B (belum tentu tepat)", "Jawaban C (belum tentu tepat)"],
                answer: 1,
                explanationCorrect: "Tepat. Pemahaman ini penting untuk materi selanjutnya.",
                explanationWrong: "Coba pikirkan ulang — hubungkan dengan konsep yang sudah dipelajari."
            },
challenge: {
                instruction: "Buat diagram sederhana yang menghubungkan RNA-seq, count, normalization, differential expression. Tandai asumsi dan titik kegagalan.",
                placeholder: "Tulis jawaban Anda di sini...",
                example: ""
            },
roadmapRef: "5"
        },
        {
hook: {
                question: "Variant Calling dan Annotation tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu di...",
                answerA: {
                    label: "Mitos umum",
                    text: "Anggapan yang sering muncul tapi perlu diklarifikasi.",
                    icon: "fas fa-question-circle"
                },
                answerB: {
                    label: "Faktanya",
                    text: "Pemahaman yang lebih akurat berdasarkan praktik nyata.",
                    icon: "fas fa-lightbulb"
                },
                message: "Analogi: Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.\n\nPada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsi"
            },
flow: [
                ["Tentukan tujuan variant calling dan annotation ...", "Tentukan tujuan variant calling dan annotation dan keputusan yang akan dipengaruhi."],
                ["Petakan input, output, pemilik, pengguna, serta...", "Petakan input, output, pemilik, pengguna, serta batas sistem."],
                ["Tetapkan definisi dan kriteria penerimaan untuk...", "Tetapkan definisi dan kriteria penerimaan untuk variant serta SNP."],
                ["Bangun versi kecil menggunakan data atau skenar...", "Bangun versi kecil menggunakan data atau skenario yang aman."],
                ["Uji hasil, kegagalan, kelompok khusus, dan kond...", "Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem."],
                ["Dokumentasikan keputusan, bukti, keterbatasan, ...", "Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut."]
            ],
deepDive: [
                ["Pendalaman Materi", "Konsep-konsep inti dari bab ini.", "Hubungan dengan praktik di lapangan."]
            ],
workedExample: [
                "Dalam mini project Klasifikasi Sekuens dengan Biological Split, tim perlu menerapkan variant calling",
                ["Data atau input belum lengkap", "Tolak, minta perbaikan, atau gunakan fallback"],
                ["Hasil belum pasti", "Tampilkan ketidakpastian dan minta review"],
                ["Beban meningkat", "Scale, antrekan, atau pembatasan"],
                ["Perubahan berisiko", "Uji terbatas dan siapkan rollback"]
            ],
glossary: [
                ["variant", "Perbedaan DNA individu dari referensi: SNP, indel, structural variant. Variant calling: membandingkan sample ke referensi dan mengidentifikasi perbedaan."],
                ["SNP", "Single Nucleotide Polymorphism — perubahan satu basa: A→G, C→T. SNP paling umum: ~10 juta per genom. GWAS: mencari SNP yang berkorelasi dengan penyakit."],
                ["indel", "Insertion atau deletion basa: +1 basa (insertion), -3 basa (deletion). Lebih sulit dideteksi dari SNP. Frameshift: indel yang mengubah reading frame protein."],
                ["genotype", "Kombinasi alel pada satu posisi: homozygous (AA, aa), heterozygous (Aa). Genotype calling: dari sequencing data, tentukan genotipe di setiap posisi."],
                ["filter", "Menghapus variant kualitas rendah: depth rendah, quality rendah, strand bias, cluster. Filter ketat mengurangi false positive — tapi juga mengurangi sensitivitas."],
                ["annotation", "Informasi fungsional variant: apakah di gen coding? Missense (ubah asam amino) atau synonymous? Dampak: Benign, Pathogenic, Uncertain Significance (VUS). ClinVar adalah database."]
            ],
quickCheck: {
                question: "Jelaskan variant dengan kalimat sendiri dan berikan satu contoh.",
                options: ["Jawaban A (belum tentu tepat)", "Jawaban B (belum tentu tepat)", "Jawaban C (belum tentu tepat)"],
                answer: 1,
                explanationCorrect: "Tepat. Pemahaman ini penting untuk materi selanjutnya.",
                explanationWrong: "Coba pikirkan ulang — hubungkan dengan konsep yang sudah dipelajari."
            },
challenge: {
                instruction: "Buat diagram sederhana yang menghubungkan variant, SNP, indel, genotype. Tandai asumsi dan titik kegagalan.",
                placeholder: "Tulis jawaban Anda di sini...",
                example: ""
            },
roadmapRef: "6"
        },
        {
hook: {
                question: "Protein Structure dan Function tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan yang baik selalu di...",
                answerA: {
                    label: "Mitos umum",
                    text: "Anggapan yang sering muncul tapi perlu diklarifikasi.",
                    icon: "fas fa-question-circle"
                },
                answerB: {
                    label: "Faktanya",
                    text: "Pemahaman yang lebih akurat berdasarkan praktik nyata.",
                    icon: "fas fa-lightbulb"
                },
                message: "Analogi: Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.\n\nPada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsi"
            },
flow: [
                ["Tentukan tujuan protein structure dan function ...", "Tentukan tujuan protein structure dan function dan keputusan yang akan dipengaruhi."],
                ["Petakan input, output, pemilik, pengguna, serta...", "Petakan input, output, pemilik, pengguna, serta batas sistem."],
                ["Tetapkan definisi dan kriteria penerimaan untuk...", "Tetapkan definisi dan kriteria penerimaan untuk amino acid serta domain."],
                ["Bangun versi kecil menggunakan data atau skenar...", "Bangun versi kecil menggunakan data atau skenario yang aman."],
                ["Uji hasil, kegagalan, kelompok khusus, dan kond...", "Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem."],
                ["Dokumentasikan keputusan, bukti, keterbatasan, ...", "Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut."]
            ],
deepDive: [
                ["Pendalaman Materi", "Konsep-konsep inti dari bab ini.", "Hubungan dengan praktik di lapangan."]
            ],
workedExample: [
                "Dalam mini project Klasifikasi Sekuens dengan Biological Split, tim perlu menerapkan protein structu",
                ["Data atau input belum lengkap", "Tolak, minta perbaikan, atau gunakan fallback"],
                ["Hasil belum pasti", "Tampilkan ketidakpastian dan minta review"],
                ["Beban meningkat", "Scale, antrekan, atau pembatasan"],
                ["Perubahan berisiko", "Uji terbatas dan siapkan rollback"]
            ],
glossary: [
                ["amino acid", "Blok penyusun protein: 20 jenis. Sifat: hidrofobik (valine), polar (serine), charged (lysine). Mutasi asam amino bisa mengubah struktur dan fungsi protein."],
                ["domain", "Region protein yang conserved dan punya fungsi spesifik: kinase domain (aktivitas enzim), zinc finger (binding DNA). Domain = unit fungsional protein."],
                ["structure", "Bentuk 3D protein: primary (sequence), secondary (alpha helix, beta sheet), tertiary (3D fold), quaternary (multi-subunit). Struktur menentukan fungsi."],
                ["binding", "Interaksi protein dengan molekul lain: protein-ligand (obat), protein-DNA (transkripsi), protein-protein (sinyaling). Binding affinity: seberapa kuat interaksi."],
                ["function", "Aktivitas biologis protein: katalis (enzim), sinyal (reseptor), struktural (kolagen). Prediksi fungsi dari sequence/structure adalah masalah utama bioinformatika."],
                ["confidence", "Tingkat kepercayaan prediksi: pLDDT (AlphaFold), pTM score. Confidence < 50 = unreliable. Prediksi struktur harus menyertakan confidence — jangan disajikan sebagai fakta."]
            ],
quickCheck: {
                question: "Jelaskan amino acid dengan kalimat sendiri dan berikan satu contoh.",
                options: ["Jawaban A (belum tentu tepat)", "Jawaban B (belum tentu tepat)", "Jawaban C (belum tentu tepat)"],
                answer: 1,
                explanationCorrect: "Tepat. Pemahaman ini penting untuk materi selanjutnya.",
                explanationWrong: "Coba pikirkan ulang — hubungkan dengan konsep yang sudah dipelajari."
            },
challenge: {
                instruction: "Buat diagram sederhana yang menghubungkan amino acid, domain, structure, binding. Tandai asumsi dan titik kegagalan.",
                placeholder: "Tulis jawaban Anda di sini...",
                example: ""
            },
roadmapRef: "7"
        },
        {
hook: {
                question: "Machine Learning dan Biological Foundation Model tidak berdiri sendiri. Bagian ini menghubungkan kebutuhan pengguna, proses kerja, data atau sumber daya, serta hasil yang akan dinilai. Pendekatan y...",
                answerA: {
                    label: "Mitos umum",
                    text: "Anggapan yang sering muncul tapi perlu diklarifikasi.",
                    icon: "fas fa-question-circle"
                },
                answerB: {
                    label: "Faktanya",
                    text: "Pemahaman yang lebih akurat berdasarkan praktik nyata.",
                    icon: "fas fa-lightbulb"
                },
                message: "Analogi: Bioinformatika seperti membaca perpustakaan kehidupan: urutan huruf membawa informasi, tetapi maknanya baru muncul melalui konteks biologis, perbandingan, eksperimen, dan analisis ketidakpastian.\n\nPada praktiknya, kualitas bukan hanya berarti hasil tampak benar. Kualitas juga mencakup konsi"
            },
flow: [
                ["Tentukan tujuan machine learning dan biological...", "Tentukan tujuan machine learning dan biological foundation model dan keputusan yang akan dipengaruhi."],
                ["Petakan input, output, pemilik, pengguna, serta...", "Petakan input, output, pemilik, pengguna, serta batas sistem."],
                ["Tetapkan definisi dan kriteria penerimaan untuk...", "Tetapkan definisi dan kriteria penerimaan untuk embedding serta representation."],
                ["Bangun versi kecil menggunakan data atau skenar...", "Bangun versi kecil menggunakan data atau skenario yang aman."],
                ["Uji hasil, kegagalan, kelompok khusus, dan kond...", "Uji hasil, kegagalan, kelompok khusus, dan kondisi ekstrem."],
                ["Dokumentasikan keputusan, bukti, keterbatasan, ...", "Dokumentasikan keputusan, bukti, keterbatasan, serta tindak lanjut."]
            ],
deepDive: [
                ["Pendalaman Materi", "Konsep-konsep inti dari bab ini.", "Hubungan dengan praktik di lapangan."]
            ],
workedExample: [
                "Dalam mini project Klasifikasi Sekuens dengan Biological Split, tim perlu menerapkan machine learnin",
                ["Data atau input belum lengkap", "Tolak, minta perbaikan, atau gunakan fallback"],
                ["Hasil belum pasti", "Tampilkan ketidakpastian dan minta review"],
                ["Beban meningkat", "Scale, antrekan, atau pembatasan"],
                ["Perubahan berisiko", "Uji terbatas dan siapkan rollback"]
            ],
glossary: [
                ["embedding", "Representasi vektor dari sekuens biologis: DNA → [0.3, -0.1, 0.8, ...]. Embedding memungkinkan operasi matematis pada data biologis. DNABert, ESM: foundation model untuk biologi."],
                ["representation", "Cara mendeskripsikan molekul dalam format yang bisa diproses AI: one-hot encoding, k-mer frequency, learned embedding. Representasi yang baik menangkap informasi biologis relevan."],
                ["classification", "Memprediksi kategori: 'Protein ini enzim atau bukan?', 'Variant ini patogenik atau benign?'. Classification sering kali langkah pertama memahami molekul baru."],
                ["generative model", "Model yang menghasilkan molekul baru: protein baru dengan fungsi tertentu, drug candidate, RNA sequence. Generative biology = AI sebagai desainer, bukan hanya prediktor."],
                ["transfer", "Model yang dilatih di data besar lalu diadaptasi ke tugas spesifik dengan data kecil. ESM-2 (protein foundation model) → fine-tune ke tugas classification specific. Lebih efisien dari training from scratch."],
                ["benchmark", "Dataset standar untuk membandingkan performa model: CASP (struktur), OpenTarget (drug target), ClinVar (variant pathogenicity). Benchmark harus fair — train/test tidak overlap."]
            ],
quickCheck: {
                question: "Jelaskan embedding dengan kalimat sendiri dan berikan satu contoh.",
                options: ["Jawaban A (belum tentu tepat)", "Jawaban B (belum tentu tepat)", "Jawaban C (belum tentu tepat)"],
                answer: 1,
                explanationCorrect: "Tepat. Pemahaman ini penting untuk materi selanjutnya.",
                explanationWrong: "Coba pikirkan ulang — hubungkan dengan konsep yang sudah dipelajari."
            },
challenge: {
                instruction: "Buat diagram sederhana yang menghubungkan embedding, representation, classification, generative model. Tandai asumsi dan titik kegagalan.",
                placeholder: "Tulis jawaban Anda di sini...",
                example: ""
            },
roadmapRef: "8"
        }
    ];;;

    CHAPTERS.forEach(function (chapter, index) {
        Object.assign(chapter, PYTHON_GUIDES[index]);
    });



    const PRACTICES = [
    {
        "id": "PRACTICE-1",
        "title": "Latihan",
        "prompt": "1. Buat diagram sederhana yang menghubungkan DNA, RNA, protein, gene. Tandai asumsi dan titik kegagalan.\n2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.\n3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-2",
        "title": "Latihan",
        "prompt": "1. Buat diagram sederhana yang menghubungkan FASTA, FASTQ, quality score, annotation. Tandai asumsi dan titik kegagalan.\n2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.\n3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-3",
        "title": "Latihan",
        "prompt": "1. Buat diagram sederhana yang menghubungkan pairwise, multiple alignment, similarity, homology. Tandai asumsi dan titik kegagalan.\n2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.\n3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-4",
        "title": "Latihan",
        "prompt": "1. Buat diagram sederhana yang menghubungkan read, contig, coverage, assembly. Tandai asumsi dan titik kegagalan.\n2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.\n3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-5",
        "title": "Latihan",
        "prompt": "1. Buat diagram sederhana yang menghubungkan RNA-seq, count, normalization, differential expression. Tandai asumsi dan titik kegagalan.\n2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.\n3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-6",
        "title": "Latihan",
        "prompt": "1. Buat diagram sederhana yang menghubungkan variant, SNP, indel, genotype. Tandai asumsi dan titik kegagalan.\n2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.\n3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-7",
        "title": "Latihan",
        "prompt": "1. Buat diagram sederhana yang menghubungkan amino acid, domain, structure, binding. Tandai asumsi dan titik kegagalan.\n2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.\n3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-8",
        "title": "Latihan",
        "prompt": "1. Buat diagram sederhana yang menghubungkan embedding, representation, classification, generative model. Tandai asumsi dan titik kegagalan.\n2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.\n3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-9",
        "title": "Latihan",
        "prompt": "1. Buat diagram sederhana yang menghubungkan workflow, environment, version, provenance. Tandai asumsi dan titik kegagalan.\n2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.\n3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    },
    {
        "id": "PRACTICE-10",
        "title": "Latihan",
        "prompt": "1. Buat diagram sederhana yang menghubungkan multiple testing, uncertainty, genomic privacy, consent. Tandai asumsi dan titik kegagalan.\n2. Tulis kriteria penerimaan untuk satu proses dalam bab ini. Sertakan kondisi normal, error, dan kasus batas.\n3. Pilih satu risiko dan buat kontrol preventif, kontrol detektif, serta prosedur respons.",
        "fields": [
            [
                "step",
                "Langkah Pengerjaan"
            ]
        ],
        "guide": "Tuliskan hasil analisis Anda."
    }
];

const QUIZ = [
    [
        "Kuis belum tersedia",
        [
            "Benar",
            "Salah"
        ],
        0,
        ""
    ]
];

    const DISCUSSION_PROMPTS = [
        "Bagaimana penerapan konsep ini dapat memecahkan masalah di industri Anda?",
        "Apa saja tantangan atau risiko terbesar saat mengimplementasikan teori ini di dunia nyata?",
        "Menurut Anda, bagaimana etika dan bias dapat memengaruhi keputusan yang diambil berdasarkan model ini?",
        "Bagikan pengalaman atau kesulitan Anda saat mempraktikkan materi ini."
    ];

var SOURCE_VISUALS = {
        "01-topic.html": { eyebrow: "Workflow Map", title: "Dari masalah ke program yang dapat diulang", description: "Lihat peran Python pada setiap lapisan workflow AI.", options: [["Problem", "fas fa-bullseye", "Tujuan", "Definisikan pengguna, input, output, dan failure case sebelum memilih library.", "Completion rate harus menangani total peserta nol."], ["Environment", "fas fa-box-archive", "Reproducibility", "Isolasi versi Python dan dependency agar hasil dapat dibangun ulang.", "Gunakan virtual environment dan dependency file."], ["Code", "fas fa-code", "Orchestration", "Python menghubungkan data, library, eksperimen, dan aplikasi.", "Komputasi berat dapat berjalan di library teroptimasi."], ["Evidence", "fas fa-clipboard-check", "Verifikasi", "Jalankan dari awal dan pastikan output tidak bergantung pada state tersembunyi.", "Restart-and-run-all pada notebook."]] },
        "02-topic.html": { eyebrow: "Data Model Lab", title: "Pilih struktur dari perilakunya", description: "Tipe data menentukan operasi, validasi, dan risiko perubahan state.", options: [["Scalar", "fas fa-hashtag", "Satu nilai", "Gunakan str, int, float, bool, atau None sesuai maknanya.", "Score kosong bukan otomatis nol."], ["Sequence", "fas fa-list", "Urutan", "List menyimpan record berurutan dan dapat berubah.", "Daftar peserta diproses satu per satu."], ["Mapping", "fas fa-diagram-project", "Field bernama", "Dictionary membuat schema record lebih eksplisit.", "name, track, dan score menyerupai object JSON."], ["Set", "fas fa-filter", "Keunikan", "Set berguna untuk membership dan deduplikasi sederhana.", "Jangan pakai bila urutan harus dipertahankan."]] },
        "03-topic.html": { eyebrow: "Decision Lab", title: "Urutan guard menentukan correctness", description: "Ikuti record dari validasi menuju klasifikasi dan laporan.", options: [["Missing", "fas fa-circle-question", "Guard pertama", "Pisahkan nilai yang tidak tersedia sebelum operasi numerik.", "None tidak dapat dibandingkan dengan 75."], ["Type", "fas fa-font", "Guard kedua", "Pastikan score benar-benar numerik.", "String '80' perlu konversi yang tervalidasi."], ["Range", "fas fa-arrows-left-right", "Guard ketiga", "Periksa score berada pada domain 0–100.", "-1 dan 101 ditolak dengan alasan."], ["Classify", "fas fa-code-branch", "Keputusan", "Baru setelah valid, tentukan lulus atau review.", "Uji boundary 74.9 dan 75."]] },
        "04-topic.html": { eyebrow: "Function Pipeline", title: "Satu tanggung jawab per function", description: "Rangkai contract kecil menjadi pipeline yang mudah diuji.", options: [["Validate", "fas fa-shield", "Input contract", "Periksa missing, type, dan range tanpa mencampur presentasi.", "validate_score mengembalikan status jelas."], ["Transform", "fas fa-gears", "Pure logic", "Ubah input valid menjadi hasil yang dapat dipakai tahap berikutnya.", "classify_score tidak menulis file."], ["Summarize", "fas fa-chart-simple", "Aggregation", "Hitung statistik dari kumpulan nilai valid.", "Boundary diuji terpisah."], ["Compose", "fas fa-link", "Pipeline", "Function orkestrasi mengatur urutan dan error recovery.", "load → validate → classify → summarize."]] },
        "05-topic.html": { eyebrow: "Object Design", title: "Kapan state layak menjadi object", description: "Bedakan record sederhana dari object yang memiliki invariant dan behavior.", options: [["State", "fas fa-box", "Data object", "Simpan nilai yang memiliki lifecycle bersama.", "DatasetReport menyimpan name dan summary."], ["Invariant", "fas fa-lock", "Aturan valid", "Constructor menjaga object tidak lahir dalam kondisi rusak.", "Nama dataset tidak boleh kosong."], ["Method", "fas fa-screwdriver-wrench", "Behavior", "Letakkan operasi yang benar-benar terkait dengan state.", "add_metric memperbarui report."], ["Composition", "fas fa-cubes-stacked", "Komponen", "Gabungkan validator atau exporter tanpa inheritance berlebihan.", "Implementasi mudah diganti saat test."]] },
        "06-topic.html": { eyebrow: "Failure Recovery", title: "Error yang jelas lebih aman daripada diam", description: "Pilih response berdasarkan jenis dan dampak kegagalan.", options: [["Detect", "fas fa-magnifying-glass", "Exception spesifik", "Tangkap kegagalan yang benar-benar dipahami.", "FileNotFoundError berbeda dari ValueError."], ["Explain", "fas fa-message", "Actionable message", "Sebutkan penyebab, konteks aman, dan langkah perbaikan.", "Jangan bocorkan credential."], ["Recover", "fas fa-life-ring", "Tindakan", "Retry, skip, fallback, atau stop dipilih sesuai risiko.", "Schema hilang harus menghentikan cleaning."], ["Protect", "fas fa-file-shield", "Raw data", "Gunakan with dan tulis output ke path baru.", "participants_clean.csv tidak menimpa raw."]] },
        "07-topic.html": { eyebrow: "Array Inspector", title: "Shape dan dtype adalah contract", description: "Audit struktur numerik sebelum melakukan statistik atau modeling.", options: [["Shape", "fas fa-border-all", "Dimensi", "Pastikan ukuran array sesuai operasi berikutnya.", "Vector dan matrix mempunyai contract berbeda."], ["Dtype", "fas fa-tag", "Representasi", "Tipe elemen menentukan operasi dan penggunaan memori.", "Campuran teks dapat mengubah dtype."], ["Vectorize", "fas fa-bolt", "Operasi massal", "Terapkan transformasi tanpa loop manual.", "scores / 100 bekerja pada seluruh array."], ["Missing", "fas fa-circle-exclamation", "NaN policy", "Hitung missing dan jelaskan keputusan nan-aware.", "np.nanmean bukan alasan mengabaikan kualitas data."]] },
        "08-topic.html": { eyebrow: "Data Workflow", title: "Cleaning yang dapat diaudit", description: "Ikuti raw data sampai output bersih dan report yang dapat direkonsiliasi.", options: [["Load", "fas fa-file-csv", "Raw input", "Baca file tanpa menimpa atau mengubah baseline.", "Simpan path dan versi input."], ["Inspect", "fas fa-magnifying-glass-chart", "Data profiling", "Periksa shape, schema, dtype, missing, duplicate, dan range.", "Jangan langsung membangun model."], ["Clean", "fas fa-broom", "Rules", "Terapkan aturan pada salinan dan catat alasan perubahan.", "Missing tidak selalu diisi nol."], ["Report", "fas fa-file-lines", "Audit trail", "Rekonsiliasi raw, removed, dan clean lalu simpan derived output.", "Data clean belum otomatis representatif."]] }
    };

    function getSourceFile(path) {
        return String(path || "").split("/").pop();
    }

    function renderSourceVisualLab(config) {
        if (!config) return "";
        return `<section class="reasoning-concept-lab" data-python-injected aria-label="${escapeHtml(config.title)}">
            <div class="reasoning-concept-lab-head">
                <div><span>${escapeHtml(config.eyebrow)}</span><h4>${escapeHtml(config.title)}</h4></div>
                <span class="reasoning-concept-counter">1 / ${config.options.length}</span>
            </div>
            <div class="reasoning-concept-tabs" role="tablist">
                ${config.options.map(function (option, index) {
                    return `<button type="button" role="tab" aria-selected="${index === 0}" data-concept-index="${index}"><i class="${escapeHtml(option[1])}" aria-hidden="true"></i><span>${escapeHtml(option[0])}</span></button>`;
                }).join("")}
            </div>
            <div class="reasoning-concept-stage" role="tabpanel" tabindex="0">
                <div class="reasoning-concept-node"><i class="${escapeHtml(config.options[0][1])}" aria-hidden="true"></i></div>
                <div><span>${escapeHtml(config.options[0][2])}</span><h5>${escapeHtml(config.options[0][0])}</h5><p>${escapeHtml(config.options[0][3])}</p><small><i class="fas fa-location-dot" aria-hidden="true"></i>${escapeHtml(config.options[0][4])}</small></div>
            </div>
        </section>`;
    }

    function setupBeginnerRoadmap(container) {
        var roadmaps = container.querySelectorAll(".ai-modern-beginner-roadmap");
        roadmaps.forEach(function(roadmap) {
            var steps = Array.from(roadmap.querySelectorAll("[data-roadmap-step]"));
            var progress = roadmap.querySelector("[data-roadmap-progress]");
            var bar = roadmap.querySelector("[data-roadmap-bar]");
            steps.forEach(function (detail) {
                detail.addEventListener("toggle", function () {
                    if (!detail.open) return;
                    steps.forEach(function (other) { if (other !== detail) other.open = false; });
                    var index = Number(detail.dataset.roadmapStep);
                    if (progress) progress.textContent = "Langkah " + (index + 1) + " dari " + steps.length;
                    if (bar) bar.style.width = Math.round(((index + 1) / steps.length) * 100) + "%";
                });
            });
            if (bar && steps.length) bar.style.width = Math.round(100 / steps.length) + "%";
        });
    }

    function renderPythonDeepDive(module) {
        if (!module) return "";
        var parts = [];

        if (module.deepDive && module.deepDive.length) {
            var roadmapHtml = '<section class="ai-modern-beginner-roadmap" data-python-injected data-section="konsep">' +
                '<div class="ai-modern-roadmap-head"><i class="fas fa-compass" aria-hidden="true"></i><div><span>Bioinformatika</span><h3>Biologi molekuler bertemu machine learning</h3><p>Gunakan penjelasan berikut untuk menghubungkan kode, data, failure case, dan keputusan dalam workflow AI.</p></div></div>' +
                '<div class="ai-modern-roadmap-strip" aria-hidden="true">' + module.deepDive.map(function (step, index) { return '<div><span>' + (index + 1) + '</span><i class="fas fa-book-open-reader"></i><strong>' + escapeHtml(step[0]) + '</strong></div>'; }).join("") + '</div>' +
                '<div class="ai-modern-roadmap-progress"><span data-roadmap-progress>Langkah 1 dari ' + module.deepDive.length + '</span><b><i data-roadmap-bar></i></b></div>' +
                '<div class="ai-modern-roadmap-steps">' + module.deepDive.map(function (step, index) {
                    return '<details data-roadmap-step="' + index + '"' + (index === 0 ? " open" : "") + '><summary><span>' + String(index + 1).padStart(2, "0") + '</span><i class="fas fa-book-open-reader" aria-hidden="true"></i><div><strong>' + escapeHtml(step[0]) + '</strong></div><i class="fas fa-chevron-down" aria-hidden="true"></i></summary><div class="ai-modern-roadmap-body"><p>' + escapeHtml(step[1]) + '</p>' + (step[2] ? '<p>' + escapeHtml(step[2]) + '</p>' : '') + '</div></details>';
                }).join("") + '</div></section>';
            parts.push(roadmapHtml);
        }

        if (module.workedExample && module.workedExample.length) {
            var title = module.workedExample[0];
            var steps = module.workedExample.slice(1);
            var exampleHtml = '<section class="ai-modern-worked-example" data-python-injected data-section="contoh"><div class="ai-modern-worked-head"><i class="fas fa-magnifying-glass-chart" aria-hidden="true"></i><div><span>Contoh Terurai</span><h3>' + escapeHtml(title) + '</h3></div></div><div class="ai-modern-worked-steps">' + steps.map(function (step, index) { return '<article><span>' + (index + 1) + '</span><div><strong>' + escapeHtml(step[0]) + '</strong><p>' + escapeHtml(step[1]) + '</p></div></article>'; }).join("") + '</div></section>';
            parts.push(exampleHtml);
        }

        if (module.glossary && module.glossary.length) {
            var glossaryHtml = '<section class="ai-modern-beginner-glossary" data-python-injected data-section="ringkasan"><div class="ai-modern-glossary-head"><i class="fas fa-language" aria-hidden="true"></i><div><span>Glossary Pemula</span><h3>Istilah yang perlu kamu kuasai</h3><p>Buka setiap istilah untuk mengulang definisinya sebelum lanjut.</p></div></div><div class="ai-modern-glossary-grid">' + module.glossary.map(function (item, index) { return '<details' + (index === 0 ? " open" : "") + '><summary><span>' + String(index + 1).padStart(2, "0") + '</span><strong>' + escapeHtml(item[0]) + '</strong><i class="fas fa-chevron-down" aria-hidden="true"></i></summary><p>' + escapeHtml(item[1]) + '</p></details>'; }).join("") + '</div></section>';
            parts.push(glossaryHtml);
        }

        return parts.join("\n");
    }

    function initSourceVisualLab(container, config) {
        if (!config) return;
        const stage = container.querySelector(".reasoning-concept-stage");
        const counter = container.querySelector(".reasoning-concept-counter");
        container.querySelectorAll("[data-concept-index]").forEach(function (button) {
            button.addEventListener("click", function () {
                const index = Number(button.dataset.conceptIndex);
                const option = config.options[index];
                if (!stage || !option) return;
                container.querySelectorAll("[data-concept-index]").forEach(function (tab) {
                    tab.setAttribute("aria-selected", String(tab === button));
                });
                stage.innerHTML = `<div class="reasoning-concept-node"><i class="${escapeHtml(option[1])}" aria-hidden="true"></i></div><div><span>${escapeHtml(option[2])}</span><h5>${escapeHtml(option[0])}</h5><p>${escapeHtml(option[3])}</p><small><i class="fas fa-location-dot" aria-hidden="true"></i>${escapeHtml(option[4])}</small></div>`;
                if (counter) counter.textContent = (index + 1) + " / " + config.options.length;
            });
        });
    }

    function structureSourceParagraph(paragraph) {
        const copy = document.createElement("div");
        copy.className = "reasoning-source-step-copy";
        while (paragraph.firstChild) copy.appendChild(paragraph.firstChild);

        const directLabels = Array.from(copy.children).filter(function (child) {
            return child.tagName === "STRONG";
        });
        if (directLabels.length > 1) {
            const compound = document.createElement("div");
            compound.className = "reasoning-source-compound";
            let section = null;
            Array.from(copy.childNodes).forEach(function (node) {
                if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "STRONG") {
                    section = document.createElement("section");
                    section.className = "reasoning-source-subsection";
                    compound.appendChild(section);
                }
                if (!section) {
                    section = document.createElement("section");
                    section.className = "reasoning-source-subsection";
                    compound.appendChild(section);
                }
                section.appendChild(node);
            });
            copy.appendChild(compound);
            paragraph.classList.add("is-compound");
        }
        paragraph.appendChild(copy);
    }

    function enhanceSourceMaterialForCanvas(container, chapter) {
        if (!container) return;

        // Hapus module-level headings dari source (Deskripsi Modul, Tujuan Pembelajaran, Peta Pembelajaran)
        // karena hanya relevan di level module, bukan per-chapter
        var moduleHeadings = ["deskripsi modul", "tujuan pembelajaran", "peta pembelajaran"];
        container.querySelectorAll("h2").forEach(function (h2) {
            var text = (h2.textContent || "").toLowerCase().trim();
            if (moduleHeadings.some(function (kw) { return text.indexOf(kw) !== -1; })) {
                var next = h2.nextElementSibling;
                while (next && !next.matches("h1, h2, hr")) {
                    var toRemove = next;
                    next = next.nextElementSibling;
                    toRemove.remove();
                }
                h2.remove();
                // Hapus <hr> setelah heading jika ada
                if (next && next.matches("hr")) {
                    next.remove();
                }
            }
        });

        // Tambah data-section="konsep" ke source H2s agar nav chip bisa scroll ke sana
        container.querySelectorAll("h2").forEach(function (h2) {
            if (!h2.closest(".reasoning-end-of-chapter, .reasoning-scaffold-module-meta")) {
                h2.setAttribute("data-section", "konsep");
            }
        });

        container.querySelectorAll("table").forEach(function (table) {
            if (!table.parentElement.classList.contains("reasoning-scaffold-table-wrap")) {
                var scroll = document.createElement("div");
                scroll.className = "reasoning-scaffold-table-wrap";
                table.parentNode.insertBefore(scroll, table);
                scroll.appendChild(table);
            }
        });
        container.querySelectorAll("pre").forEach(function (block) {
            if (!block.parentElement.classList.contains("reasoning-code-block")) {
                var wrapper = document.createElement("div");
                wrapper.className = "reasoning-code-block";
                wrapper.innerHTML = '<div data-python-injected><i class="fas fa-code"></i><span>Snippet Python</span></div>';
                block.parentNode.insertBefore(wrapper, block);
                wrapper.appendChild(block);
            }
        });
        container.querySelectorAll("blockquote").forEach(function (bq) {
            bq.classList.add("reasoning-scaffold-callout");
        });
    }

    function enhanceSourceMaterial(container, path) {
        if (arguments.length > 2 && arguments[2]) {
            const chapter = arguments[2];
            container.querySelectorAll("h2, h3, h4").forEach(function (heading) {
                const text = heading.textContent.toLowerCase();
                let replacement = null;

                if (text.includes("visual flow") && chapter.flow) {
                    replacement = `<section class="reasoning-visual-board" aria-label="Visualisasi reasoning">
                        <div class="reasoning-visual-head"><i class="fas fa-route" aria-hidden="true"></i><div><span>Visual reasoning flow</span><h3>Alur pikir yang bisa dilacak</h3></div></div>
                        ${renderFlow(chapter.flow)}
                    </section>`;
                } else if (text.includes("quick check") && chapter.quickCheck) {
                    replacement = `<section class="reasoning-quick-check" data-check-answer="${chapter.quickCheck.answer}">
                        <div class="reasoning-quick-head"><i class="fas fa-circle-question" aria-hidden="true"></i><div><span>Quick Check</span><h3>${escapeHtml(chapter.quickCheck.question)}</h3></div></div>
                        <div class="reasoning-check-options">
                            ${chapter.quickCheck.options.map((option, index) => `<button type="button" data-check-option="${index}"><b>${String.fromCharCode(65 + index)}</b><span>${escapeHtml(option)}</span></button>`).join("")}
                        </div>
                        <p class="reasoning-check-feedback" hidden>${escapeHtml(chapter.quickCheck.explanation)}</p>
                    </section>`;
                } else if (text.includes("mini challenge") && chapter.challenge) {
                    replacement = `<section class="reasoning-mini-challenge">
                        <div><i class="fas fa-pen-ruler" aria-hidden="true"></i><span>Mini Challenge</span></div>
                        <h3>Latihan reflektif singkat</h3>
                        <p>${escapeHtml(chapter.challenge)}</p>
                    </section>`;
                } else if (text.includes("common mistakes") && chapter.mistakes) {
                    replacement = `<section class="reasoning-scaffold-checklist">
                        <h3><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> Common mistakes</h3>
                        ${renderList(chapter.mistakes)}
                    </section>`;
                } else if (text.includes("ringkasan") && chapter.summary) {
                    replacement = `<section class="reasoning-scaffold-summary">
                        <h3><i class="fas fa-bookmark" aria-hidden="true"></i> Ringkasan</h3>
                        <p>${escapeHtml(chapter.summary)}</p>
                    </section>`;
                } else if (text.includes("contoh ai") && chapter.llmExample) {
                    replacement = `<section class="reasoning-scaffold-example">
                        <span>Contoh AI/LLM</span>
                        <h3>Bagaimana konsep ini muncul di produk AI</h3>
                        <p>${escapeHtml(chapter.llmExample)}</p>
                    </section>`;
                } else if (text.includes("analogi:") && chapter.analogy) {
                    replacement = `<section class="reasoning-scaffold-callout">
                        <i class="fas fa-lightbulb" aria-hidden="true"></i>
                        <p><strong>Analogi:</strong> ${escapeHtml(chapter.analogy)}</p>
                    </section>`;
                }

                if (replacement) {
                    let current = heading.nextElementSibling;
                    while (current && !current.matches("h1, h2, h3, h4")) {
                        const next = current.nextElementSibling;
                        current.remove();
                        current = next;
                    }
                    heading.insertAdjacentHTML("afterend", replacement);
                    heading.remove();
                }
            });

            if (typeof initQuickChecks === "function") {
                initQuickChecks(container);
            }
        }

                const material = container.querySelector(".reasoning-source-material");
        if (!material) return;

        material.querySelectorAll("table").forEach(function (table) {
            if (!table.parentElement.classList.contains("reasoning-scaffold-table-wrap")) {
                const scroll = document.createElement("div");
                scroll.className = "reasoning-scaffold-table-wrap";
                table.parentNode.insertBefore(scroll, table);
                scroll.appendChild(table);
            }
        });
    }

    function stripSourceNumbering(html) {
        // Hapus penomoran lama dari heading (mis: "1.4 " → "", "Submateri 1 — " → "")
        return html.replace(
            /(<h[12][^>]*>)(?:(?:\d+\.\d+\s*)|(?:Submateri\s+\d+\s*(?:—|-)\s*)|(?:Integrasi\s*(?:—|-)\s*))/gi,
            "$1"
        );
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function escapeHtml(value) {
        return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    function escapeSelector(value) {
        return String(value || "").replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, "\\$&");
    }

    function safeJsonParse(value, fallback) {
        try { return JSON.parse(value); } catch (e) { return fallback; }
    }

    function filterSourceHeadings(html) {
        // Hapus module-level H2 headings (Deskripsi Modul, Tujuan Pembelajaran, Peta Pembelajaran)
        // yang hanya relevan di level module overview, bukan per-chapter.
        // Python source tidak punya struktur module heading seperti Reasoning,
        // tapi fungsi ini tetap sebagai safety net jika heading tersebut muncul.
        var removeKeywords = ["deskripsi modul", "tujuan pembelajaran", "peta pembelajaran", "ringkasan submateri"];
        var lines = html.split("\n");
        var result = [];
        var skip = false;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var isModuleH2 = false;
            if (/<h2>/i.test(line) || /<h2\s/i.test(line)) {
                var text = line.replace(/<[^>]+>/g, "").toLowerCase().trim();
                for (var k = 0; k < removeKeywords.length; k++) {
                    if (text.indexOf(removeKeywords[k]) !== -1) {
                        isModuleH2 = true;
                        break;
                    }
                }
            }
            if (isModuleH2) {
                skip = true;
                continue;
            }
            if (skip) {
                if (/<h[12][^>]*>/i.test(line) || /<hr\s*\/?>/i.test(line)) {
                    skip = false;
                    if (/<hr\s*\/?>/i.test(line)) continue;
                } else {
                    continue;
                }
            }
            result.push(line);
        }
        return result.join("\n");
    }

    function filterPythonActivityAppendix(html, path) {
        if (getSourceFile(path) !== "08-topic.html") return html;
        var start = html.indexOf("<h1>Latihan Modul</h1>");
        var end = html.indexOf("<h1>Checklist Kesiapan Peserta</h1>");
        if (start === -1 || end === -1 || end <= start) return html;
        return html.slice(0, start) + html.slice(end);
    }

    function sourceText(html) {
        var template = document.createElement("template");
        template.innerHTML = html;
        return String(template.content.textContent || "").replace(/\s+/g, " ").trim();
    }

    
    function injectAfterHeading(html, headingText, injectHtml) {
        // Cari heading H2 yang mengandung teks tertentu, sisipkan injectHtml SETELAH seluruh konten section itu
        var escaped = escapeRegex(headingText);
        var pattern = new RegExp(
            '(<h[12][^>]*>[\\s\\S]*?' + escaped + '[\\s\\S]*?(?:</h[12]>)[\\s\\S]*?)(?=<h[12]|<hr\\s*/?>|$)',
            "i"
        );
        var match = html.match(pattern);
        if (!match) return html;
        var before = html.slice(0, match.index + match[1].length);
        var after = html.slice(match.index + match[1].length);
        return before + "\n" + injectHtml + "\n" + after;
    }

    function setStatus(selector, message, tone) {
        const status = document.querySelector(selector);
        if (!status) return;
        status.textContent = message;
        status.dataset.tone = tone || "neutral";
    }

    function renderList(items) {
        if (!items) return "";
        return '<ul>' + items.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join("") + '</ul>';
    }

    function renderFlow(items) {
        if (!items) return "";
        return '<div class="reasoning-scaffold-flow reasoning-scaffold-flow--compact">' + items.map(function (item, index) {
            var arrow = index < items.length - 1 ? '<i class="fas fa-arrow-right" aria-hidden="true"></i>' : "";
            return '<div><span>' + escapeHtml(item[0]) + '</span>' + arrow + '<p>' + escapeHtml(item[1]) + '</p></div>';
        }).join("") + '</div>';
    }

    function renderOrientationAndNav(module, chapterNum, total) {
        var objectivesHtml = (module.objectives || []).map(function(obj) {
            return '<li><span class="ai-modern-objective-copy">' + escapeHtml(obj) + '</span></li>';
        }).join("");
        
        var heroHtml = '<header class="lesson-topic-banner">' +
            '<h3><i class="' + escapeHtml(module.icon || 'fas fa-book-open') + '"></i> Topik ' + chapterNum + ': ' + escapeHtml(module.title) + '</h3>' +
            '<p>' + (module.summary ? 'Goal: ' + escapeHtml(module.summary) : '') + '</p>' +
        '</header>' + 
        (module.objectives && module.objectives.length ? '<div class="ai-modern-objectives" style="margin-bottom: 24px;"><strong>Tujuan pembelajaran</strong><ul>' + objectivesHtml + '</ul></div>' : '') +
        (typeof analogyHtml !== 'undefined' ? analogyHtml : '');

        var navHtml = '<nav class="reasoning-source-jumps reasoning-visual-nav ai-modern-learning-nav" data-python-injected id="reasoning-visual-nav" aria-label="Tahapan Topik ' + chapterNum + ' dari ' + total + '">' +
            '<span><i class="' + escapeHtml(module.icon) + '"></i> Jelajahi:</span>' +
            '<button type="button" data-jump="hook">Pembuka</button>' +
            '<button type="button" data-jump="konsep">Konsep</button>' +
            '<button type="button" data-jump="contoh">Contoh & Latihan</button>' +
            '<button type="button" data-jump="check">Uji Pemahaman</button>' +
            '<button type="button" data-jump="ringkasan">Ringkasan</button>' +
        '</nav>';

        return heroHtml + '\n' + navHtml;
    }

    function renderEndOfChapter(module, chapterNum, total, visualConfig) {
        var parts = [];
        if (module.flow && module.flow.length) {
            parts.push('<section class="reasoning-visual-board" data-section="contoh" aria-label="Alur reasoning">\n                <div class="reasoning-visual-head"><i class="fas fa-route" aria-hidden="true"></i><div><span>Visual reasoning flow</span><h3>Alur pikir yang bisa dilacak</h3></div></div>\n                ' + renderFlow(module.flow) + '\n            </section>');
        }
        if (module.example) {
            parts.push(finalRenderExampleSection(module.example));
        }
        if (module.quickCheck) {
            parts.push(finalRenderQuickCheckSection(module.quickCheck));
        }
        if (module.llmExample) {
            parts.push('<section class="reasoning-scaffold-example" data-section="contoh">\n                <span>Contoh AI/LLM</span>\n                <h3>Bagaimana konsep ini muncul di produk AI</h3>\n                <p>' + escapeHtml(module.llmExample) + '</p>\n            </section>');
        }
        if (module.prompt && module.prompt.length) {
            parts.push(finalRenderPromptSection(module.prompt));
        }
        if (module.challenge) {
            parts.push(finalRenderChallengeSection(module.challenge, chapterNum));
        }
        if ((module.mistakes && module.mistakes.length) || (module.bestPractices && module.bestPractices.length)) {
            parts.push(finalRenderMistakesPractices(module.mistakes || [], module.bestPractices || []));
        }
        if (module.learningOutcomes && module.learningOutcomes.length) {
            parts.push(finalRenderSummarySection(module.learningOutcomes, module.transition, chapterNum, total));
        }
        return '<div class="reasoning-end-of-chapter" data-python-injected>' + parts.join("\n") + '</div>';
    }

    function loadSourceHtml(path, containerId, chapter) {
        var container = document.getElementById(containerId);
        if (!container || !path) return;
        fetch(path, { cache: "no-store" })
            .then(function (response) {
                if (!response.ok) throw new Error("Gagal memuat " + path);
                return response.text();
            })
            .then(function (html) {
                container.innerHTML = html;
                container.classList.add("is-source-view");
                enhanceSourceMaterialForCanvas(container, chapter);
            })
            .catch(function () {
                container.innerHTML = '<div class="reasoning-source-error"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i><p>Materi Python belum bisa dimuat. Refresh halaman atau periksa kembali route sumber.</p></div>';
            });
    }

    function loadSourceSegment(path, containerId, startHeading, endHeading) {
        var container = document.getElementById(containerId);
        if (!container) return Promise.resolve();
        return fetch(path, { cache: "no-store" }).then(function (response) {
            if (!response.ok) throw new Error("Gagal memuat " + path);
            return response.text();
        }).then(function (html) {
            var start = html.indexOf("<h1>" + startHeading + "</h1>");
            var end = endHeading ? html.indexOf("<h1>" + endHeading + "</h1>") : html.length;
            if (start === -1 || end === -1 || end <= start) throw new Error("Segmen sumber tidak ditemukan: " + startHeading);
            container.innerHTML = html.slice(start, end);
            container.classList.add("is-source-view");
            enhanceSourceMaterialForCanvas(container);
        }).catch(function (error) {
            container.innerHTML = '<div class="reasoning-source-error"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i><p>Referensi belum bisa dimuat. Coba refresh halaman.</p></div>';
            console.error(error);
        });
    }

    function finalRenderHookSection(hook) {
        return '<section class="reasoning-hook-section" data-python-injected data-section="hook">\n            <div class="reasoning-hook-head"><i class="fas fa-hand-pointer" aria-hidden="true"></i><div><span>Pembuka</span><h3>' + escapeHtml(hook.question) + '</h3></div></div>\n            <div class="reasoning-hook-options">\n                <button type="button" class="reasoning-hook-card" data-hook-option="a">\n                    <div class="reasoning-hook-card-icon"><i class="' + escapeHtml(hook.answerA.icon) + '" aria-hidden="true"></i></div>\n                    <div><strong>' + escapeHtml(hook.answerA.label) + '</strong><p>' + escapeHtml(hook.answerA.text) + '</p></div>\n                </button>\n                <button type="button" class="reasoning-hook-card" data-hook-option="b">\n                    <div class="reasoning-hook-card-icon"><i class="' + escapeHtml(hook.answerB.icon) + '" aria-hidden="true"></i></div>\n                    <div><strong>' + escapeHtml(hook.answerB.label) + '</strong><p>' + escapeHtml(hook.answerB.text) + '</p></div>\n                </button>\n            </div>\n            <p class="reasoning-hook-message" hidden>' + escapeHtml(hook.message) + '</p>\n        </section>';
    }

    function finalRenderOpeningSection(paragraphs) {
        return '<section class="reasoning-opening-section" data-section="pembuka">\n            ' + paragraphs.map(function (p) { return '<p>' + p + '</p>'; }).join("\n") + '\n        </section>';
    }

    function finalRenderComparisonTable(table) {
        return '<section class="reasoning-scaffold-section reasoning-compare-section" data-section="konsep">\n            <div class="reasoning-compare-grid">\n                <div class="reasoning-compare-col">\n                    <h4>' + escapeHtml(table.left.title) + '</h4>\n                    <ul>' + table.left.rows.map(function (r) { return '<li>' + escapeHtml(r) + '</li>'; }).join("") + '</ul>\n                </div>\n                <div class="reasoning-compare-col reasoning-compare-col-accent">\n                    <h4>' + escapeHtml(table.right.title) + '</h4>\n                    <ul>' + table.right.rows.map(function (r) { return '<li>' + escapeHtml(r) + '</li>'; }).join("") + '</ul>\n                </div>\n            </div>\n        </section>';
    }

    function finalRenderConceptSections(concepts) {
        return concepts.map(function (concept) {
            var contentHtml = "";
            if (concept.content) {
                contentHtml += concept.content.map(function (p) { return '<p>' + p + '</p>'; }).join("\n");
            }
            if (concept.table) {
                var t = concept.table;
                contentHtml += '<div class="reasoning-scaffold-table-wrap"><table><thead><tr>' + t.headers.map(function (h) { return '<th>' + escapeHtml(h) + '</th>'; }).join("") + '</tr></thead><tbody>' + t.rows.map(function (row) { return '<tr>' + row.map(function (cell) { return '<td>' + escapeHtml(cell) + '</td>'; }).join("") + '</tr>'; }).join("") + '</tbody></table></div>';
            }
            if (concept.numberedList) {
                contentHtml += '<ol class="reasoning-numbered-list">' + concept.numberedList.map(function (item) { return '<li>' + item + '</li>'; }).join("") + '</ol>';
            }
            if (concept.diagram) {
                contentHtml += '<div class="reasoning-diagram-flow">' + concept.diagram.map(function (step, i) {
                    return '<div class="reasoning-diagram-step"><span>' + (i + 1) + '</span><p>' + escapeHtml(step) + '</p></div>' + (i < concept.diagram.length - 1 ? '<i class="fas fa-arrow-down" aria-hidden="true"></i>' : '');
                }).join("") + '</div>';
            }
            return '<section class="reasoning-concept-card" data-section="konsep">\n                <h3><i class="fas fa-book-open" aria-hidden="true"></i> ' + escapeHtml(concept.title) + '</h3>\n                ' + contentHtml + '\n            </section>';
        }).join("\n");
    }

    function finalRenderExampleSection(example) {
        var stepsHtml = example.steps.map(function (step) {
            return '<div class="reasoning-example-step"><strong>' + escapeHtml(step.label) + '</strong><p>' + escapeHtml(step.text) + '</p></div>';
        }).join("");
        var errorsHtml = example.commonErrors && example.commonErrors.length ? '<div class="reasoning-scaffold-callout" style="margin-top:14px"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i><p><strong>Kesalahan yang mungkin terjadi:</strong></p><ul>' + example.commonErrors.map(function (e) { return '<li>' + escapeHtml(e) + '</li>'; }).join("") + '</ul></div>' : '';
        return '<section class="reasoning-example-section" data-section="contoh">\n                <div class="reasoning-example-head"><i class="fas fa-flask" aria-hidden="true"></i><div><span>Contoh Terurai</span><h3>' + escapeHtml(example.title) + '</h3></div></div>\n                <div class="reasoning-example-case"><strong>Kasus:</strong> ' + escapeHtml(example.case) + '</div>\n                <div class="reasoning-example-steps">' + stepsHtml + '</div>\n                <div class="reasoning-scaffold-summary" style="margin-top:14px"><strong>Kesimpulan:</strong> ' + escapeHtml(example.conclusion) + '</div>\n                ' + errorsHtml + '\n            </section>';
    }

    function finalRenderQuickCheckSection(qc) {
        return '<section class="reasoning-quick-check" data-section="check" data-check-answer="' + qc.answer + '">\n                <div class="reasoning-quick-head"><i class="fas fa-circle-question" aria-hidden="true"></i><div><span>Quick Check</span><h3>' + escapeHtml(qc.question) + '</h3></div></div>\n                <div class="reasoning-check-options">\n                    ' + qc.options.map(function (option, index) {
                        return '<button type="button" data-check-option="' + index + '"><b>' + String.fromCharCode(65 + index) + '</b><span>' + escapeHtml(option) + '</span></button>';
                    }).join("") + '\n                </div>\n                <div class="reasoning-check-actions">\n                    <button type="button" class="reasoning-check-submit" data-check-submit><i class="fas fa-check" aria-hidden="true"></i> Periksa Jawaban</button>\n                    <button type="button" class="reasoning-check-retry" data-check-retry hidden><i class="fas fa-rotate-left" aria-hidden="true"></i> Coba Lagi</button>\n                </div>\n                <p class="reasoning-check-feedback" hidden></p>\n            </section>';
    }

    function finalRenderChallengeSection(challenge, chapterNumber) {
        var key = 'heraiAiBioinformaticsChallengeCh' + chapterNumber;
        return '<section class="reasoning-challenge-workspace" data-section="challenge" data-challenge-workspace="' + key + '">\n                <div class="reasoning-challenge-head"><i class="fas fa-pen-ruler" aria-hidden="true"></i><div><span>Mini Challenge</span><h3>Latihan reflektif</h3></div></div>\n                <p class="reasoning-challenge-instruction">' + escapeHtml(challenge.instruction) + '</p>\n                <textarea class="reasoning-challenge-textarea" data-challenge-textarea="' + key + '" rows="5" placeholder="' + escapeHtml(challenge.placeholder) + '"></textarea>\n                <div class="reasoning-challenge-actions">\n                    <button type="button" class="btn-reasoning-save" data-challenge-save><i class="fas fa-floppy-disk" aria-hidden="true"></i> Simpan</button>\n                    <button type="button" class="btn-reasoning-edit" data-challenge-edit hidden><i class="fas fa-pen" aria-hidden="true"></i> Edit</button>\n                    <button type="button" class="btn-reasoning-reset" data-challenge-reset><i class="fas fa-rotate-left" aria-hidden="true"></i> Reset</button>\n                    <button type="button" class="btn-reasoning-example" data-challenge-example hidden><i class="fas fa-lightbulb" aria-hidden="true"></i> Lihat Contoh</button>\n                </div>\n                <div class="reasoning-challenge-example" data-challenge-example-content hidden><strong>Contoh:</strong><p>' + escapeHtml(challenge.example) + '</p></div>\n            </section>';
    }

    function finalRenderMistakesPractices(mistakes, bestPractices) {
        return '<section class="reasoning-mistakes-practices" data-section="ringkasan">\n                <div class="reasoning-mp-grid">\n                    <div class="reasoning-mp-col reasoning-mp-mistakes">\n                        <h3><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> Common Mistakes</h3>\n                        <ul>' + mistakes.map(function (m) { return '<li>' + escapeHtml(m) + '</li>'; }).join("") + '</ul>\n                    </div>\n                    <div class="reasoning-mp-col reasoning-mp-practices">\n                        <h3><i class="fas fa-circle-check" aria-hidden="true"></i> Best Practices</h3>\n                        <ul>' + bestPractices.map(function (bp) { return '<li>' + escapeHtml(bp) + '</li>'; }).join("") + '</ul>\n                    </div>\n                </div>\n            </section>';
    }

    function finalRenderSummarySection(outcomes, transition, chapterNumber, total) {
        var transHtml = transition ? '<div class="reasoning-transition"><i class="fas fa-arrow-right" aria-hidden="true"></i><p><strong>Selanjutnya:</strong> ' + escapeHtml(transition) + '</p></div>' : '';
        return '<section class="reasoning-summary-section" data-section="ringkasan">\n                <div class="reasoning-summary-head"><i class="fas fa-bookmark" aria-hidden="true"></i><div><span>Ringkasan</span><h3>Setelah topik ini, kamu dapat:</h3></div></div>\n                <ul class="reasoning-outcomes-list">' + outcomes.map(function (o) { return '<li><i class="fas fa-circle-check" aria-hidden="true"></i> ' + escapeHtml(o) + '</li>'; }).join("") + '</ul>\n                ' + transHtml + '\n            </section>';
    }

    function finalRenderPromptSection(lines) {
        var cleanLines = lines.map(function (line) { return escapeHtml(line); });
        return '<section class="reasoning-prompt-section">\n                <div class="reasoning-code-block">\n                    <div><i class="fas fa-terminal" aria-hidden="true"></i><span>Prompt Pattern</span><button type="button" class="reasoning-copy-btn" data-copy-content="' + escapeHtml(lines.join("\n")) + '" aria-label="Salin prompt"><i class="fas fa-copy"></i></button></div>\n                    <pre><code>' + cleanLines.join("\n") + '</code></pre>\n                </div>\n            </section>';
    }

    function setupViewToggle(container) {
        var toggle = container.querySelector(".reasoning-view-toggle");
        var visualCanvas = container.querySelector(".reasoning-visual-canvas");
        var sourcePanel = container.querySelector(".reasoning-source-panel");
        var visualNav = container.querySelector(".reasoning-visual-nav");
        var sourceNav = container.querySelector(".reasoning-source-nav");
        if (!toggle || !visualCanvas || !sourcePanel) return;
        toggle.querySelectorAll("[data-reasoning-view]").forEach(function (button) {
            button.addEventListener("click", function () {
                var view = button.dataset.reasoningView;
                var isVisual = view === "visual";
                toggle.querySelectorAll("[data-reasoning-view]").forEach(function (btn) {
                    btn.classList.toggle("is-active", btn === button);
                    btn.setAttribute("aria-pressed", String(btn === button));
                });
                visualCanvas.hidden = !isVisual;
                sourcePanel.hidden = isVisual;
                if (visualNav) visualNav.hidden = !isVisual;
                if (sourceNav) sourceNav.hidden = isVisual;
            });
        });
    }

    function setupHookInteraction(container) {
        container.querySelectorAll(".reasoning-hook-section").forEach(function (section) {
            var message = section.querySelector(".reasoning-hook-message");
            section.querySelectorAll("[data-hook-option]").forEach(function (button) {
                button.addEventListener("click", function () {
                    section.querySelectorAll("[data-hook-option]").forEach(function (btn) {
                        btn.classList.toggle("is-selected", btn === button);
                    });
                    if (message) message.hidden = false;
                });
            });
        });
    }

    function setupQuickChecks(container) {
        container.querySelectorAll(".reasoning-quick-check").forEach(function (card) {
            var answer = Number(card.dataset.checkAnswer);
            var feedback = card.querySelector(".reasoning-check-feedback");
            var submitBtn = card.querySelector("[data-check-submit]");
            var retryBtn = card.querySelector("[data-check-retry]");
            var options = card.querySelectorAll("[data-check-option]");
            var selectedIndex = -1;

            options.forEach(function (button) {
                button.addEventListener("click", function () {
                    selectedIndex = Number(button.dataset.checkOption);
                    options.forEach(function (opt) {
                        opt.classList.toggle("is-selected", Number(opt.dataset.checkOption) === selectedIndex);
                        opt.classList.remove("is-correct", "is-wrong");
                    });
                    if (submitBtn) submitBtn.disabled = false;
                });
            });

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.addEventListener("click", function () {
                    if (selectedIndex < 0) return;
                    options.forEach(function (opt) {
                        var idx = Number(opt.dataset.checkOption);
                        opt.classList.toggle("is-correct", idx === answer);
                        opt.classList.toggle("is-wrong", idx === selectedIndex && idx !== answer);
                    });
                    if (feedback) {
                        feedback.hidden = false;
                        feedback.textContent = selectedIndex === answer ? (card.dataset.answerCorrectText || "Benar!") : (card.dataset.answerWrongText || "Belum tepat.");
                        feedback.dataset.tone = selectedIndex === answer ? "success" : "warning";
                    }
                    submitBtn.hidden = true;
                    if (retryBtn) retryBtn.hidden = false;
                });
            }

            if (retryBtn) {
                retryBtn.addEventListener("click", function () {
                    selectedIndex = -1;
                    options.forEach(function (opt) {
                        opt.classList.remove("is-selected", "is-correct", "is-wrong");
                    });
                    if (feedback) feedback.hidden = true;
                    retryBtn.hidden = true;
                    if (submitBtn) { submitBtn.hidden = false; submitBtn.disabled = true; }
                });
            }
        });
    }

    function setupChallengeInteraction(container) {
        container.querySelectorAll("[data-challenge-textarea]").forEach(function (textarea) {
            var section = textarea.closest(".reasoning-challenge-workspace");
            if (!section) return;
            var key = textarea.dataset.challengeTextarea || section.dataset.challengeWorkspace || section.dataset.challengeKey;
            if (!key) return;
            var saved = localStorage.getItem(key);
            if (saved && saved !== "undefined") textarea.value = saved;

            var saveBtn = section.querySelector("[data-challenge-save]");
            var editBtn = section.querySelector("[data-challenge-edit]");
            var resetBtn = section.querySelector("[data-challenge-reset]");
            var exampleBtn = section.querySelector("[data-challenge-example]");
            var exampleContent = section.querySelector("[data-challenge-example-content]");

            if (!saved && editBtn) editBtn.hidden = true;
            if (!textarea.value.trim() && exampleBtn) exampleBtn.hidden = true;

            if (saveBtn) saveBtn.addEventListener("click", function () {
                localStorage.setItem(key, textarea.value);
                textarea.readOnly = true;
                textarea.classList.add("is-saved");
                saveBtn.hidden = true;
                if (editBtn) editBtn.hidden = false;
                if (exampleBtn) exampleBtn.hidden = false;
            });

            if (saved && saved !== "undefined") {
                textarea.readOnly = true;
                textarea.classList.add("is-saved");
                saveBtn.hidden = true;
                if (editBtn) editBtn.hidden = false;
                if (exampleBtn) exampleBtn.hidden = false;
            }

            if (editBtn) editBtn.addEventListener("click", function () {
                textarea.readOnly = false;
                textarea.classList.remove("is-saved");
                textarea.focus();
                editBtn.hidden = true;
                if (saveBtn) saveBtn.hidden = false;
            });
            if (resetBtn) resetBtn.addEventListener("click", function () {
                if (textarea.value.trim() && !confirm("Reset jawabanmu? Jawaban yang sudah disimpan akan dihapus.")) return;
                textarea.value = "";
                textarea.readOnly = false;
                textarea.classList.remove("is-saved");
                localStorage.removeItem(key);
                if (saveBtn) saveBtn.hidden = false;
                if (editBtn) editBtn.hidden = true;
                if (exampleBtn) exampleBtn.hidden = true;
                if (exampleContent) exampleContent.hidden = true;
            });

            textarea.addEventListener("input", function () {
                if (exampleBtn && !textarea.readOnly) exampleBtn.hidden = !textarea.value.trim();
            });

            if (exampleBtn && exampleContent) {
                exampleBtn.addEventListener("click", function () {
                    exampleContent.hidden = !exampleContent.hidden;
                    exampleBtn.setAttribute("aria-expanded", String(!exampleContent.hidden));
                });
            }
        });
    }

    function setupVisualNav(container) {
        container.querySelectorAll("[data-jump]").forEach(function (button) {
            button.addEventListener("click", function () {
                var section = container.querySelector('[data-section="' + button.dataset.jump + '"]');
                if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        });
    }

    function setupCopyButtons(container) {
        container.querySelectorAll("[data-copy-content]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var content = btn.dataset.copyContent;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(content).then(function () {
                        var icon = btn.querySelector("i");
                        if (icon) { icon.className = "fas fa-check"; setTimeout(function () { icon.className = "fas fa-copy"; }, 2000); }
                    });
                }
            });
        });
    }

    function phaseLayout(container) {
        // Sekarang kosong — nav chips udah diperbaiki, fase badges dihapus
    }

    function generateNavChips(sourceContainer, jumpsContainer) {
        if (!sourceContainer || !jumpsContainer) return;
        var headings = sourceContainer.querySelectorAll("h2, h3");
        if (!headings.length) return;
        var seen = {};
        headings.forEach(function (heading, index) {
            var text = heading.textContent.replace(/^\d+\.?\s*/, "").trim();
            if (!text || seen[text]) return;
            seen[text] = true;
            var id = "reasoning-nav-" + index;
            heading.id = id;
            var chip = document.createElement("button");
            chip.type = "button";
            chip.textContent = text;
            chip.title = text;
            chip.addEventListener("click", function () {
                var target = document.getElementById(id);
                if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
            });
            jumpsContainer.appendChild(chip);
        });
    }

    function legacyRenderHookSection(hook) {
        return '<section class="reasoning-hook-card" data-section="hook">\n            <div class="reasoning-hook-head">\n                <i class="fas fa-hand-sparkles" aria-hidden="true"></i>\n                <div><span>Pembuka</span><h3>' + escapeHtml(hook.question) + '</h3></div>\n            </div>\n            <div class="reasoning-hook-options">\n                <button type="button" class="reasoning-hook-option" data-hook-option="a">\n                    <div class="reasoning-hook-option-icon"><i class="' + escapeHtml(hook.answerA.icon) + '" aria-hidden="true"></i></div>\n                    <div>\n                        <strong>' + escapeHtml(hook.answerA.label) + '</strong>\n                        <p>' + escapeHtml(hook.answerA.text) + '</p>\n                    </div>\n                </button>\n                <button type="button" class="reasoning-hook-option" data-hook-option="b">\n                    <div class="reasoning-hook-option-icon"><i class="' + escapeHtml(hook.answerB.icon) + '" aria-hidden="true"></i></div>\n                    <div>\n                        <strong>' + escapeHtml(hook.answerB.label) + '</strong>\n                        <p>' + escapeHtml(hook.answerB.text) + '</p>\n                    </div>\n                </button>\n            </div>\n            <div class="reasoning-hook-feedback" hidden>\n                <i class="fas fa-info-circle" aria-hidden="true"></i>\n                <p>' + escapeHtml(hook.message) + '</p>\n            </div>\n        </section>';
    }

    function renderOpeningSection(paragraphs) {
        return '<section class="reasoning-opening-section" data-section="konsep">' + paragraphs.map(function (p) {
            return '<p>' + p + '</p>';
        }).join("\n") + '</section>';
    }

    function renderComparisonTable(config) {
        return '<div class="reasoning-compare-table" data-section="konsep">\n            <div class="reasoning-compare-col reasoning-compare-col--left">\n                <div class="reasoning-compare-col-head"><i class="fas fa-bolt" aria-hidden="true"></i><strong>' + escapeHtml(config.left.title) + '</strong></div>\n                <ul>' + config.left.rows.map(function (r) { return '<li>' + escapeHtml(r) + '</li>'; }).join("") + '</ul>\n            </div>\n            <div class="reasoning-compare-col reasoning-compare-col--right">\n                <div class="reasoning-compare-col-head"><i class="fas fa-brain" aria-hidden="true"></i><strong>' + escapeHtml(config.right.title) + '</strong></div>\n                <ul>' + config.right.rows.map(function (r) { return '<li>' + escapeHtml(r) + '</li>'; }).join("") + '</ul>\n            </div>\n        </div>';
    }

    function renderConceptSections(concepts) {
        return concepts.map(function (concept, idx) {
            var parts = [];
            if (concept.diagram) {
                parts.push('<pre class="reasoning-concept-diagram"><code>' + concept.diagram.map(function (step, i) {
                    return escapeHtml(step) + (i < concept.diagram.length - 1 ? '\n        \u2193' : '');
                }).join("\n") + '</code></pre>');
            }
            if (concept.content && concept.content.length) {
                parts.push(concept.content.map(function (c) { return '<p>' + c + '</p>'; }).join("\n"));
            }
            if (concept.table) {
                parts.push('<div class="reasoning-scaffold-table-wrap"><table><thead><tr>' + concept.table.headers.map(function (h) { return '<th>' + escapeHtml(h) + '</th>'; }).join("") + '</tr></thead><tbody>' + concept.table.rows.map(function (row) { return '<tr>' + row.map(function (cell) { return '<td>' + escapeHtml(cell) + '</td>'; }).join("") + '</tr>'; }).join("") + '</tbody></table></div>');
            }
            if (concept.numberedList && concept.numberedList.length) {
                parts.push('<ol class="reasoning-numbered-list">' + concept.numberedList.map(function (item) { return '<li>' + item + '</li>'; }).join("") + '</ol>');
            }
            return '<section class="reasoning-concept-section" data-section="konsep">\n                <h3><span class="reasoning-concept-num">' + (idx + 1) + '</span> ' + escapeHtml(concept.title) + '</h3>\n                ' + parts.join("\n") + '\n            </section>';
        }).join("\n");
    }

    function renderExampleSection(example) {
        var stepsHtml = example.steps.map(function (step) {
            return '<div class="reasoning-example-step"><strong>' + escapeHtml(step.label) + '</strong><p>' + escapeHtml(step.text) + '</p></div>';
        }).join("\n");
        var errorsHtml = "";
        if (example.commonErrors && example.commonErrors.length) {
            errorsHtml = '<div class="reasoning-example-errors"><h4><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> Kesalahan yang Mungkin Terjadi</h4><ul>' + example.commonErrors.map(function (e) { return '<li>' + escapeHtml(e) + '</li>'; }).join("") + '</ul></div>';
        }
        return '<section class="reasoning-example-section" data-section="contoh">\n            <div class="reasoning-example-head"><i class="fas fa-calculator" aria-hidden="true"></i><div><span>Contoh Terurai</span><h3>' + escapeHtml(example.title) + '</h3></div></div>\n            <div class="reasoning-example-case"><strong>Kasus:</strong> ' + escapeHtml(example.case) + '</div>\n            <div class="reasoning-example-steps">' + stepsHtml + '</div>\n            <div class="reasoning-example-conclusion"><i class="fas fa-check-circle" aria-hidden="true"></i><p><strong>Kesimpulan:</strong> ' + escapeHtml(example.conclusion) + '</p></div>\n            ' + errorsHtml + '\n        </section>';
    }

    function renderQuickCheckSection(qc) {
        return '<section class="reasoning-quick-check reasoning-qc-enhanced" data-section="check" data-check-answer="' + qc.answer + '">\n            <div class="reasoning-quick-head"><i class="fas fa-circle-question" aria-hidden="true"></i><div><span>Quick Check</span><h3>' + escapeHtml(qc.question) + '</h3></div></div>\n            <div class="reasoning-check-options">\n                ' + qc.options.map(function (option, index) {
                    return '<button type="button" data-check-option="' + index + '"><b>' + String.fromCharCode(65 + index) + '</b><span>' + escapeHtml(option) + '</span></button>';
                }).join("") + '\n            </div>\n            <div class="reasoning-check-actions">\n                <button type="button" class="reasoning-scaffold-check-button" data-check-submit><i class="fas fa-check" aria-hidden="true"></i> Periksa Jawaban</button>\n                <button type="button" class="reasoning-scaffold-reveal-button reasoning-check-retry" data-check-retry hidden><i class="fas fa-rotate-left" aria-hidden="true"></i> Coba Lagi</button>\n            </div>\n            <p class="reasoning-check-feedback" hidden></p>\n        </section>';
    }

    function renderPromptSection(lines) {
        var cleanLines = lines.map(function (l) { return l.replace(/\\n/g, "\n"); }).join("\n");
        return '<section class="reasoning-code-block reasoning-prompt-block" data-section="konsep">\n            <div><i class="fas fa-terminal"></i><span>Prompt Pattern</span></div>\n            <pre><code>' + cleanLines.split("\n").map(function (line) { return escapeHtml(line); }).join("\n") + '</code></pre>\n        </section>';
    }

    function renderChallengeSection(challenge, chapterNumber) {
        var storageKey = "heraiAiBioinformaticsChallengeCh" + chapterNumber;
        return '<section class="reasoning-mini-challenge reasoning-challenge-workspace" data-section="challenge" data-challenge-key="' + storageKey + '">\n            <div class="reasoning-mini-challenge-head"><i class="fas fa-pen-ruler" aria-hidden="true"></i><div><span>Mini Challenge</span><h3>Latihan reflektif</h3></div></div>\n            <p class="reasoning-challenge-instruction">' + escapeHtml(challenge.instruction) + '</p>\n            <label class="reasoning-challenge-label"><span>Jawabanmu</span><textarea rows="5" placeholder="' + escapeHtml(challenge.placeholder) + '" data-challenge-textarea="' + storageKey + '"></textarea></label>\n            <div class="reasoning-challenge-actions">\n                <button type="button" data-challenge-save><i class="fas fa-floppy-disk" aria-hidden="true"></i> Simpan</button>\n                <button type="button" data-challenge-edit hidden><i class="fas fa-pen" aria-hidden="true"></i> Edit</button>\n                <button type="button" data-challenge-reset><i class="fas fa-rotate-left" aria-hidden="true"></i> Reset</button>\n                <button type="button" data-challenge-example hidden aria-expanded="false"><i class="fas fa-lightbulb" aria-hidden="true"></i> Lihat Contoh</button>\n            </div>\n            <div class="reasoning-challenge-example" data-challenge-example-content hidden>\n                <strong><i class="fas fa-lightbulb" aria-hidden="true"></i> Contoh Pembahasan</strong>\n                <p>' + escapeHtml(challenge.example) + '</p>\n            </div>\n        </section>';
    }

    function renderMistakesPractices(mistakes, bestPractices) {
        return '<section class="reasoning-mistakes-practices" data-section="ringkasan">\n            <div class="reasoning-mp-grid">\n                <div class="reasoning-mp-card reasoning-mp-mistakes">\n                    <h3><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> Common Mistakes</h3>\n                    <ul>' + mistakes.map(function (m) { return '<li>' + escapeHtml(m) + '</li>'; }).join("") + '</ul>\n                </div>\n                <div class="reasoning-mp-card reasoning-mp-practices">\n                    <h3><i class="fas fa-circle-check" aria-hidden="true"></i> Best Practices</h3>\n                    <ul>' + bestPractices.map(function (b) { return '<li>' + escapeHtml(b) + '</li>'; }).join("") + '</ul>\n                </div>\n            </div>\n        </section>';
    }

    function renderSummarySection(outcomes, transition, chapterNumber, total) {
        var outcomeItems = outcomes.map(function (o) { return '<li><i class="fas fa-check" aria-hidden="true"></i> ' + escapeHtml(o) + '</li>'; }).join("");
        var transitionHtml = "";
        if (transition && chapterNumber < total) {
            transitionHtml = '<div class="reasoning-transition"><i class="fas fa-arrow-right" aria-hidden="true"></i><p>' + escapeHtml(transition) + '</p></div>';
        }
        return '<section class="reasoning-summary-section" data-section="ringkasan">\n            <div class="reasoning-summary-head"><i class="fas fa-bookmark" aria-hidden="true"></i><div><span>Ringkasan</span><h3>Setelah topik ini, kamu dapat:</h3></div></div>\n            <ul class="reasoning-outcome-list">' + outcomeItems + '</ul>\n            ' + transitionHtml + '\n        </section>';
    }

    function initQuickChecks(scope) {
        scope.querySelectorAll(".reasoning-quick-check").forEach(function (card) {
            const answer = Number(card.dataset.checkAnswer);
            const feedback = card.querySelector(".reasoning-check-feedback");
            card.querySelectorAll("[data-check-option]").forEach(function (button) {
                button.addEventListener("click", function () {
                    const selected = Number(button.dataset.checkOption);
                    card.querySelectorAll("[data-check-option]").forEach(function (option) {
                        const optionIndex = Number(option.dataset.checkOption);
                        option.classList.toggle("is-correct", optionIndex === answer);
                        option.classList.toggle("is-wrong", optionIndex === selected && selected !== answer);
                    });
                    if (feedback) {
                        feedback.hidden = false;
                        feedback.dataset.tone = selected === answer ? "success" : "warning";
                    }
                });
            });
        });
    }

    function updateProgress(chapterNumber, total) {
        const completed = Math.max(0, chapterNumber - 1);
        const percent = Math.round((completed / total) * 100);
        const progressB = document.querySelector(".lesson-progress-mini b");
        const progressStrong = document.querySelector(".lesson-progress-mini strong");
        const progressText = document.querySelector(".lesson-progress-card p");
        if (progressB) progressB.style.setProperty("--value", percent + "%");
        if (progressStrong) progressStrong.textContent = percent + "%";
        if (progressText) progressText.textContent = completed + " dari " + total + " materi selesai";
    }

    function setupPythonReadinessChecklist(container) {
        var inputs = Array.from(container.querySelectorAll('input[type="checkbox"]'));
        if (!inputs.length) return;
        var saved = safeJsonParse(localStorage.getItem(STORAGE.readiness), []);
        if (!Array.isArray(saved)) saved = [];

        function persist() {
            var completed = inputs.map(function (input, index) { return input.checked ? index : null; }).filter(function (index) { return index !== null; });
            localStorage.setItem(STORAGE.readiness, JSON.stringify(completed));
        }

        inputs.forEach(function (input, index) {
            var item = input.closest("li");
            if (!item) return;
            input.disabled = false;
            input.id = "python-readiness-" + index;
            input.checked = saved.indexOf(index) !== -1;
            input.setAttribute("aria-label", item.textContent.trim());
            item.classList.add("python-readiness-item");
            item.classList.toggle("is-checked", input.checked);
            input.addEventListener("change", function () {
                item.classList.toggle("is-checked", input.checked);
                persist();
            });
            item.addEventListener("click", function (event) {
                if (event.target === input || event.target.closest("a, button")) return;
                input.checked = !input.checked;
                input.dispatchEvent(new Event("change", { bubbles: true }));
            });
        });
    }

    window.loadAiBioinformaticsChapter = function (chapterNumber) {
        var total = CHAPTERS.length;
        var chapter = Math.min(Math.max(Number(chapterNumber) || 1, 1), total);
        var module = CHAPTERS[chapter - 1];
        var container = document.getElementById("reasoning-chapter-container");
        var btnPrev = document.getElementById("btn-prev-chapter");
        var btnNext = document.getElementById("btn-next-chapter");
        var btnFinish = document.getElementById("btn-finish-materi");
        var requestId = ++activeChapterRequest;
        if (!container || !module) return;

        localStorage.setItem(STORAGE.chapter, String(chapter));

        var sourceFile = getSourceFile(module.sourcePath);
        var visualConfig = SOURCE_VISUALS[sourceFile];

        // Tampilkan loading
        container.innerHTML = '<div style="text-align:center;padding:60px;color:var(--fellow-muted)"><i class="fas fa-spinner fa-spin" style="font-size:2rem;color:var(--fellow-pink);margin-bottom:16px"></i><p>Memuat materi...</p></div>';

        // Fetch source HTML, filter, inject interactive, render
        fetch(module.sourcePath, { cache: "no-store" })
            .then(function (r) {
                if (!r.ok) throw new Error("Gagal memuat " + module.sourcePath);
                return r.text();
            })
            .then(function (html) {
                if (requestId !== activeChapterRequest) return;
                // 1. Filter module-level headings + strip source numbering
                html = filterSourceHeadings(html);
                html = stripSourceNumbering(html);
                html = filterPythonActivityAppendix(html, module.sourcePath);
                var expectedText = sourceText(html);

                // 2. Inject orientation + nav SEBELUM heading pertama
                //    Cari H1 atau H2 pertama, sisip orientation+nav sebelum tag <
                var firstHIdx = -1;
                var h1Match = html.match(/<h1[^>]*>/);
                var h2Match = html.match(/<h2[^>]*>/);
                if (h1Match && h2Match) {
                    firstHIdx = Math.min(h1Match.index, h2Match.index);
                } else if (h1Match) {
                    firstHIdx = h1Match.index;
                } else if (h2Match) {
                    firstHIdx = h2Match.index;
                }
                if (firstHIdx !== -1) {
                    html = html.slice(0, firstHIdx) + renderOrientationAndNav(module, chapter, total) + '\n' + html.slice(firstHIdx);
                }

                // 3. Fungsi bantu: cari semua section H2 (heading + konten hingga H2/HR berikutnya)
                function findH2Sections(str) {
                    var sections = [];
                    var re = /<h2[^>]*>[\s\S]*?<\/h2>[\s\S]*?(?=<h[12]|<hr\s*\/?>|$)/gi;
                    var m;
                    while ((m = re.exec(str)) !== null) {
                        sections.push({ index: m.index, length: m[0].length, text: m[0] });
                    }
                    return sections;
                }

                // 4. Inject hook setelah section H2 pertama
                if (module.hook) {
                    var h2Secs = findH2Sections(html);
                    if (h2Secs.length >= 1) {
                        var end1 = h2Secs[0].index + h2Secs[0].length;
                        html = html.slice(0, end1) + '\n' + finalRenderHookSection(module.hook) + '\n' + html.slice(end1);
                    }
                }

                // 5. Inject lab setelah section H2 kedua
                if (visualConfig && visualConfig.options) {
                    h2Secs = findH2Sections(html);
                    if (h2Secs.length >= 2) {
                        var end2 = h2Secs[1].index + h2Secs[1].length;
                        html = html.slice(0, end2) + '\n<div data-section="konsep">' + renderSourceVisualLab(visualConfig) + '</div>\n' + html.slice(end2);
                    }
                }

                // 6. Append end-of-chapter components
                html += renderEndOfChapter(module, chapter, total, visualConfig);

                // 3. Set sebagai konten utama
                container.innerHTML = html;
                container.classList.add("is-source-view");

                var firstSourceHeading = container.querySelector("h1");
                if (firstSourceHeading) firstSourceHeading.insertAdjacentHTML("beforebegin", renderPythonDeepDive(module));

                // 4. Enhance source visuals
                enhanceSourceMaterialForCanvas(container, module);

                // 5. Init interactive lab
                if (visualConfig) {
                    initSourceVisualLab(container, visualConfig);
                }

                // 6. Setup interactions
                setupHookInteraction(container);
                setupQuickChecks(container);
                setupChallengeInteraction(container);
                setupVisualNav(container);
                setupCopyButtons(container);
                setupBeginnerRoadmap(container);

                // 7. Phase layout — wrap source content, add fase badges
                try {
                    // Debug: check HTML before phaseLayout

                    phaseLayout(container);

                } catch (e) { console.error("phaseLayout:", e); }
                setupPythonReadinessChecklist(container);
                            })
            .catch(function (error) {
                if (requestId !== activeChapterRequest) return;
                container.innerHTML = '<div class="reasoning-source-error" style="text-align:center;padding:60px"><i class="fas fa-triangle-exclamation" style="font-size:2rem;color:#f63392;margin-bottom:16px"></i><p>Materi belum bisa dimuat. Refresh halaman atau coba lagi.</p></div>';
                console.error(error);
            });

        if (btnPrev) btnPrev.style.display = chapter > 1 ? "inline-block" : "none";
        if (btnNext) btnNext.style.display = chapter < total ? "inline-block" : "none";
        if (btnFinish) btnFinish.style.display = chapter === total ? "inline-block" : "none";

        document.querySelectorAll("#reasoning-sidebar-list li").forEach(function (li) {
            var itemTopik = Number(li.dataset.chapter || "0");
            var icon = li.querySelector("i");
            li.classList.toggle("active", itemTopik === chapter);
            li.classList.toggle("completed", itemTopik < chapter);
            if (!icon) return;
            if (itemTopik === chapter) icon.className = "far fa-circle-play";
            else if (itemTopik < chapter) icon.className = "fas fa-circle-check";
            else icon.className = "far fa-circle";
        });

        updateProgress(chapter, total);
        window.saveChapterProgress(MODULE_ID, chapter, 'completed');
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.initAiBioinformaticsMateri = function () {
        const total = CHAPTERS.length;
        const initial = Math.min(Math.max(Number(localStorage.getItem(STORAGE.chapter)) || 1, 1), total);
        const list = document.getElementById("reasoning-sidebar-list");
        const btnPrev = document.getElementById("btn-prev-chapter");
        const btnNext = document.getElementById("btn-next-chapter");

        if (list) {
            list.innerHTML = CHAPTERS.map(function (chapter, index) {
                const chapterNumber = index + 1;
                return `<li data-chapter="${chapterNumber}"><span>${chapterNumber}</span><a href="javascript:void(0)" onclick="window.loadAiBioinformaticsChapter(${chapterNumber})">${escapeHtml(chapter.shortTitle)}</a><i class="far fa-circle"></i></li>`;
            }).join("");
        }

        if (btnPrev) {
            btnPrev.addEventListener("click", function () {
                const current = Number(localStorage.getItem(STORAGE.chapter)) || initial;
                window.loadAiBioinformaticsChapter(Math.max(1, current - 1));
            });
        }

        if (btnNext) {
            btnNext.addEventListener("click", function () {
                const current = Number(localStorage.getItem(STORAGE.chapter)) || initial;
                window.loadAiBioinformaticsChapter(Math.min(total, current + 1));
            });
        }

        window.loadAiBioinformaticsChapter(initial);
    };

    function getSavedPractice() {
        return safeJsonParse(localStorage.getItem(STORAGE.practice), { answers: {}, revealed: [] });
    }

    function savePracticePayload(payload) {
        localStorage.setItem(STORAGE.practice, JSON.stringify({
            answers: payload.answers || {},
            revealed: Array.from(new Set(payload.revealed || [])),
            updatedAt: new Date().toISOString()
        }));
    }

    function collectPracticeAnswers(form) {
        const answers = {};
        form.querySelectorAll("textarea").forEach(function (field) {
            if (field.name) answers[field.name] = field.value.trim();
        });
        return answers;
    }

    function renderFormattedText(text) {
        // Pre-process: split on sequential numbered items (2., 3., 4. etc) and blockquote markers
        text = text.replace(/(\d+)\.\s+(?=[A-Z][a-z])/g, "\n$1. ");
        text = text.replace(/>\s/g, "\n> ");
        text = text.replace(/•\s/g, "\n• ");
        var lines = text.split("\n");
        var html = "";
        var inList = false;
        var listType = null; // "ul" or "ol"
        var inBlockquote = false;

        function closeList() {
            if (inList) { html += "</" + listType + ">\n"; inList = false; listType = null; }
        }
        function closeBlockquote() {
            if (inBlockquote) { html += "</blockquote>\n"; inBlockquote = false; }
        }

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var trimmed = line.trim();

            // Empty line — close open tags
            if (!trimmed) {
                closeList();
                closeBlockquote();
                continue;
            }

            // Blockquote
            if (trimmed.indexOf("> ") === 0 || trimmed.indexOf(">") === 0) {
                closeList();
                var quoteText = trimmed.replace(/^>\s?/, "");
                if (!inBlockquote) {
                    html += "<blockquote>";
                    inBlockquote = true;
                }
                html += "<p>" + escapeHtml(quoteText) + "</p>";
                continue;
            }

            // Numbered list
            var olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
            if (olMatch) {
                closeBlockquote();
                if (!inList || listType !== "ol") {
                    closeList();
                    html += "<ol>";
                    inList = true;
                    listType = "ol";
                }
                html += "<li>" + escapeHtml(olMatch[2]) + "</li>";
                continue;
            }

            // Bullet list
            if (trimmed.indexOf("- ") === 0 || trimmed.indexOf("• ") === 0) {
                closeBlockquote();
                if (!inList || listType !== "ul") {
                    closeList();
                    html += "<ul>";
                    inList = true;
                    listType = "ul";
                }
                html += "<li>" + escapeHtml(trimmed.substring(2)) + "</li>";
                continue;
            }

            // Regular paragraph
            closeList();
            closeBlockquote();
            html += "<p>" + escapeHtml(trimmed) + "</p>";
        }
        closeList();
        closeBlockquote();
        return html;
    }

    var PRACTICE_TOPICS = [ { start: 0, end: 9, label: "Latihan Modul" } ];

    function getPracticeTopic(index) {
        for (var pt = 0; pt < PRACTICE_TOPICS.length; pt++) {
            if (index >= PRACTICE_TOPICS[pt].start && index <= PRACTICE_TOPICS[pt].end) {
                return PRACTICE_TOPICS[pt].label;
            }
        }
        return "";
    }

    function renderPracticeCard(item, index) {
        return `<article class="reasoning-practice-card" data-practice-id="${escapeHtml(item.id)}" tabindex="-1">
            <div class="reasoning-practice-card-head">
                <span>${index + 1}</span>
                <h3>${escapeHtml(item.title)}</h3>
            </div>
            <div class="reasoning-practice-prompt">${renderFormattedText(item.prompt)}</div>
            <div class="reasoning-practice-fields">
                ${item.fields.map(function (field) {
                    const name = item.id + "__" + field[0];
                    return `<label><span>${escapeHtml(field[1])}</span><textarea name="${escapeHtml(name)}" rows="4" placeholder="Tulis jawabanmu di sini..."></textarea></label>`;
                }).join("")}
            </div>
            <button type="button" class="reasoning-scaffold-reveal-button" data-reasoning-reveal="${escapeHtml(item.id)}" aria-expanded="false"><i class="fas fa-lightbulb" aria-hidden="true"></i> Lihat pembahasan</button>
            <div class="reasoning-scaffold-exercise-answer" data-reasoning-answer="${escapeHtml(item.id)}" hidden><strong>Pembahasan</strong><div class="reasoning-guide-content" style="margin-top: 10px;">${renderFormattedText(item.guide)}</div></div>
        </article>`;
    }

    window.initAiBioinformaticsPractice = function () {
        const form = document.getElementById("aiBioinformaticsPracticeForm");
        const practiceList = document.getElementById("aiBioinformaticsPracticeList");
        if (!form || !practiceList) return;

        const refNode = document.getElementById("aiBioinformaticsPracticeSource"); if(refNode) refNode.innerHTML = "<div style='padding: 20px; text-align: center; color: var(--text-secondary);'>Baca ulang materi secara utuh di tab Materi utama.</div>";
        practiceList.innerHTML = PRACTICES.map(renderPracticeCard).join("");
        const saved = getSavedPractice() || { answers: {}, revealed: [] };
        const savedAnswers = saved.answers || {};
        const revealed = Array.isArray(saved.revealed) ? saved.revealed.slice() : [];
        const navigator = document.getElementById("aiBioinformaticsPracticeNavigator");
        const counter = document.getElementById("aiBioinformaticsPracticeCounter");
        const previousButton = form.querySelector("[data-practice-prev]");
        const nextButton = form.querySelector("[data-practice-next]");
        let currentPractice = 0;

        function isPracticeComplete(index) {
            const card = practiceList.querySelectorAll("[data-practice-id]")[index];
            if (!card) return false;
            return Array.from(card.querySelectorAll("textarea")).every(field => field.value.trim());
        }

        function updatePracticeNavigator() {
            if (navigator) {
                navigator.querySelectorAll("[data-practice-step]").forEach(function (button) {
                    const index = Number(button.dataset.practiceStep);
                    button.classList.toggle("is-active", index === currentPractice);
                    button.classList.toggle("is-complete", isPracticeComplete(index));
                    button.setAttribute("aria-current", index === currentPractice ? "step" : "false");
                });
            }
            if (counter) {
                var topic = getPracticeTopic(currentPractice);
                counter.textContent = "Skenario " + (currentPractice + 1) + " dari " + PRACTICES.length + (topic ? " | " + topic : "");
            }
            if (previousButton) previousButton.disabled = currentPractice === 0;
            if (nextButton) nextButton.disabled = currentPractice === PRACTICES.length - 1;
        }

        function showPractice(index, shouldFocus) {
            currentPractice = Math.min(Math.max(index, 0), PRACTICES.length - 1);
            practiceList.querySelectorAll("[data-practice-id]").forEach(function (card, cardIndex) {
                card.hidden = cardIndex !== currentPractice;
            });
            updatePracticeNavigator();
            if (shouldFocus) {
                const activeCard = practiceList.querySelectorAll("[data-practice-id]")[currentPractice];
                if (activeCard) activeCard.focus({ preventScroll: true });
            }
        }

        if (navigator) {
            var navHtml = "";
            var lastTopic = "";
            PRACTICES.forEach(function (item, index) {
                var topic = getPracticeTopic(index);
                if (topic && topic !== lastTopic) {
                    if (lastTopic) navHtml += "</div>";
                    navHtml += '<div class="reasoning-nav-group"><span class="reasoning-nav-group-label">' + escapeHtml(topic) + '</span>';
                    lastTopic = topic;
                }
                navHtml += '<button type="button" data-practice-step="' + index + '" title="' + escapeHtml(item.title) + '">' + (index + 1) + '</button>';
            });
            if (lastTopic) navHtml += "</div>";
            navigator.innerHTML = navHtml;
            navigator.querySelectorAll("[data-practice-step]").forEach(function (button) {
                button.addEventListener("click", function () {
                    savePracticePayload({ answers: collectPracticeAnswers(form), revealed: revealed });
                    showPractice(Number(button.dataset.practiceStep), true);
                });
            });
        }

        Object.entries(savedAnswers).forEach(function (entry) {
            const field = form.querySelector('[name="' + escapeSelector(entry[0]) + '"]');
            if (field) field.value = entry[1];
        });

        const firstIncomplete = PRACTICES.findIndex(function (_item, index) {
            return !isPracticeComplete(index);
        });
        currentPractice = firstIncomplete === -1 ? PRACTICES.length - 1 : firstIncomplete;
        showPractice(currentPractice, false);

        form.addEventListener("input", function (event) {
            if (event.target.matches("textarea")) updatePracticeNavigator();
        });

        if (previousButton) {
            previousButton.addEventListener("click", function () {
                savePracticePayload({ answers: collectPracticeAnswers(form), revealed: revealed });
                showPractice(currentPractice - 1, true);
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", function () {
                savePracticePayload({ answers: collectPracticeAnswers(form), revealed: revealed });
                showPractice(currentPractice + 1, true);
            });
        }

        revealed.forEach(function (id) {
            const answer = form.querySelector('[data-reasoning-answer="' + escapeSelector(id) + '"]');
            const button = form.querySelector('[data-reasoning-reveal="' + escapeSelector(id) + '"]');
            if (answer) answer.hidden = false;
            if (button) {
                button.setAttribute("aria-expanded", "true");
                button.innerHTML = '<i class="fas fa-eye" aria-hidden="true"></i> Pembahasan terbuka';
            }
        });

        setStatus("#aiBioinformaticsPracticeStatus", Object.keys(savedAnswers).length ? "Jawaban latihan dipulihkan dari browsermu." : "Jawaban akan tersimpan di browser ini.", Object.keys(savedAnswers).length ? "success" : "neutral");

        form.querySelectorAll("[data-reasoning-reveal]").forEach(function (button) {
            button.addEventListener("click", function () {
                const id = button.dataset.reasoningReveal;
                const answer = form.querySelector('[data-reasoning-answer="' + escapeSelector(id) + '"]');
                if (!answer) return;
                answer.hidden = !answer.hidden;
                button.setAttribute("aria-expanded", String(!answer.hidden));
                button.innerHTML = answer.hidden
                    ? '<i class="fas fa-lightbulb" aria-hidden="true"></i> Lihat pembahasan'
                    : '<i class="fas fa-eye" aria-hidden="true"></i> Pembahasan terbuka';
                if (!answer.hidden && !revealed.includes(id)) revealed.push(id);
                savePracticePayload({ answers: collectPracticeAnswers(form), revealed: revealed });
                setStatus("#aiBioinformaticsPracticeStatus", "Pembahasan dan jawaban tersimpan di browser ini.", "success");
            });
        });

        const saveButton = form.querySelector("[data-practice-save]");
        const editButton = form.querySelector("[data-practice-edit]");
        const resetButton = form.querySelector("[data-practice-reset]");

        if (saveButton) {
            saveButton.addEventListener("click", function () {
                savePracticePayload({ answers: collectPracticeAnswers(form), revealed: revealed });
savePracticePayload({ answers: collectPracticeAnswers(form), revealed: revealed });
                window.saveChapterProgress(MODULE_ID, 'practice', 'completed');
savePracticePayload({ answers: collectPracticeAnswers(form), revealed: revealed });
                form.classList.add("is-saved");
                form.querySelectorAll("textarea").forEach(field => { field.disabled = true; });
                setStatus("#aiBioinformaticsPracticeStatus", "Latihan Python tersimpan. Kamu bisa lanjut ke kuis atau edit lagi bila perlu.", "success");
            });
        }

        if (editButton) {
            editButton.addEventListener("click", function () {
                form.classList.remove("is-saved");
                form.querySelectorAll("textarea").forEach(field => { field.disabled = false; });
                setStatus("#aiBioinformaticsPracticeStatus", "Mode edit aktif. Simpan ulang setelah mengubah jawaban.", "neutral");
            });
        }

        if (resetButton) {
            resetButton.addEventListener("click", function () {
                localStorage.removeItem(STORAGE.practice);
                form.reset();
                form.classList.remove("is-saved");
                form.querySelectorAll("textarea").forEach(field => { field.disabled = false; });
                form.querySelectorAll("[data-reasoning-answer]").forEach(answer => { answer.hidden = true; });
                revealed.splice(0, revealed.length);
                showPractice(0, false);
                setStatus("#aiBioinformaticsPracticeStatus", "Jawaban latihan direset dari browser ini.", "warning");
            });
        }
    };

    function getQuizAnswers(form) {
        return QUIZ.reduce(function (acc, _question, index) {
            const checked = form.querySelector('input[name="python-q' + index + '"]:checked');
            acc["python-q" + index] = checked ? checked.value : "";
            return acc;
        }, {});
    }

    function renderQuizResult(score, total, message) {
        const result = document.getElementById("aiBioinformaticsQuizResult");
        if (!result) return;
        const percent = Math.round((score / total) * 100);
        result.hidden = false;
        result.innerHTML = `<strong>Skor kamu: ${score}/${total} (${percent}%)</strong><span>${escapeHtml(message)}</span>`;
    }

    function lockQuiz(form, answers) {
        form.classList.add("is-locked");
        form.querySelectorAll('input[type="radio"]').forEach(function (input) {
            input.disabled = true;
            if (answers[input.name] === input.value) input.checked = true;
        });

        // Show ALL questions for review
        form.querySelectorAll("[data-quiz-index]").forEach(function (article) {
            article.hidden = false;
        });
        // Hide navigator, counter, prev/next buttons
        var qnav = document.getElementById("aiBioinformaticsQuizNavigator");
        var qprev = form.querySelector("[data-quiz-prev]");
        var qnext = form.querySelector("[data-quiz-next]");
        var qcounter = document.getElementById("aiBioinformaticsQuizCounter");
        if (qnav) qnav.style.display = "none";
        if (qprev) qprev.style.display = "none";
        if (qnext) qnext.style.display = "none";
        if (qcounter) qcounter.style.display = "none";

        QUIZ.forEach(function (question, index) {
            const article = form.querySelector('[data-quiz-index="' + index + '"]');
            if (!article) return;
            article.querySelectorAll("label").forEach(function (label) {
                const input = label.querySelector("input");
                const isCorrect = input && Number(input.value) === question[2];
                const isSelected = input && answers[input.name] === input.value;
                label.classList.toggle("is-correct", Boolean(isCorrect));
                label.classList.toggle("is-wrong", Boolean(isSelected && !isCorrect));
            });
            let explanation = article.querySelector(".quiz-explanation");
            if (!explanation) {
                explanation = document.createElement("p");
                explanation.className = "quiz-explanation";
                article.appendChild(explanation);
            }
            explanation.innerHTML = '<i class="fas fa-lightbulb"></i> ' + escapeHtml(question[3]);
        });

        const submit = form.querySelector(".quiz-submit-btn");
        if (submit) {
            submit.disabled = true;
            submit.innerHTML = '<i class="fas fa-lock"></i> Kuis Sudah Dikirim';
        }

        const next = document.getElementById("aiBioinformaticsQuizNext");
        if (next) next.classList.remove("is-disabled");
    }

    window.initAiBioinformaticsQuiz = function () {
        const form = document.getElementById("aiBioinformaticsQuizForm");
        const list = document.getElementById("aiBioinformaticsQuizList");
        if (!form || !list) return;

        const refNode = document.getElementById("aiBioinformaticsQuizSource"); if(refNode) refNode.innerHTML = "<div style='padding: 20px; text-align: center; color: var(--text-secondary);'>Baca ulang materi secara utuh di tab Materi utama.</div>";
        list.innerHTML = QUIZ.map(function (question, index) {
            return `<article data-quiz-index="${index}" tabindex="-1">
                <span>${index + 1}</span>
                <small>Evaluasi Modul</small>
                <h3>${escapeHtml(question[0])}</h3>
                <div class="reasoning-scaffold-options">
                    ${question[1].map(function (option, optionIndex) {
                        const letter = String.fromCharCode(65 + optionIndex);
                        return `<label><input type="radio" name="python-q${index}" value="${optionIndex}"><span><b>${letter}</b>${escapeHtml(option)}</span></label>`;
                    }).join("")}
                </div>
            </article>`;
        }).join("");

        const navigator = document.getElementById("aiBioinformaticsQuizNavigator");
        const counter = document.getElementById("aiBioinformaticsQuizCounter");
        const previousButton = form.querySelector("[data-quiz-prev]");
        const nextButton = form.querySelector("[data-quiz-next]");
        let currentQuiz = 0;

        function isQuizAnswered(index) {
            return Boolean(form.querySelector('input[name="python-q' + index + '"]:checked'));
        }

        function updateQuizNavigator() {
            const answered = QUIZ.reduce((total, _question, index) => total + (isQuizAnswered(index) ? 1 : 0), 0);
            if (navigator) {
                navigator.querySelectorAll("[data-quiz-step]").forEach(function (button) {
                    const index = Number(button.dataset.quizStep);
                    button.classList.toggle("is-active", index === currentQuiz);
                    button.classList.toggle("is-complete", isQuizAnswered(index));
                    button.setAttribute("aria-current", index === currentQuiz ? "step" : "false");
                });
            }
            if (counter) counter.textContent = "Soal " + (currentQuiz + 1) + " dari " + QUIZ.length + " | " + answered + " terjawab";
            if (previousButton) previousButton.disabled = currentQuiz === 0;
            if (nextButton) nextButton.disabled = currentQuiz === QUIZ.length - 1;
        }

        function showQuiz(index, shouldFocus) {
            currentQuiz = Math.min(Math.max(index, 0), QUIZ.length - 1);
            list.querySelectorAll("[data-quiz-index]").forEach(function (article, articleIndex) {
                article.hidden = articleIndex !== currentQuiz;
            });
            updateQuizNavigator();
            if (shouldFocus) {
                const activeQuestion = list.querySelector('[data-quiz-index="' + currentQuiz + '"]');
                if (activeQuestion) activeQuestion.focus({ preventScroll: true });
            }
        }

        if (navigator) {
            navigator.innerHTML = QUIZ.map(function (_question, index) {
                return `<button type="button" data-quiz-step="${index}" aria-label="Buka soal ${index + 1}">${index + 1}</button>`;
            }).join("");
            navigator.querySelectorAll("[data-quiz-step]").forEach(function (button) {
                button.addEventListener("click", function () {
                    showQuiz(Number(button.dataset.quizStep), true);
                });
            });
        }

        if (previousButton) previousButton.addEventListener("click", () => showQuiz(currentQuiz - 1, true));
        if (nextButton) nextButton.addEventListener("click", () => showQuiz(currentQuiz + 1, true));
        showQuiz(0, false);

        const savedDone = localStorage.getItem(STORAGE.quizDone) === "true";
        const savedAnswers = safeJsonParse(localStorage.getItem(STORAGE.quizAnswers), {}) || {};
        Object.keys(savedAnswers).forEach(function (name) {
            const input = form.querySelector('input[name="' + escapeSelector(name) + '"][value="' + escapeSelector(savedAnswers[name]) + '"]');
            if (!input) return;
            input.checked = true;
            const label = input.closest("label");
            if (label) label.classList.add("is-selected");
        });
        if (savedDone && Object.keys(savedAnswers).length === QUIZ.length) {
            const savedScore = Number(localStorage.getItem(STORAGE.quizScore)) || 0;
            renderQuizResult(savedScore, QUIZ.length, "Attempt sudah dipakai. Kuis single attempt, jadi jawaban, skor, dan pembahasan dikunci agar review tetap objektif.");
            lockQuiz(form, savedAnswers);
            updateQuizNavigator();
            return;
        }

        if (Object.keys(savedAnswers).length) {
            const firstUnanswered = QUIZ.findIndex((_question, index) => !savedAnswers["python-q" + index]);
            if (firstUnanswered >= 0) showQuiz(firstUnanswered, false);
        }
        if (savedDone && Object.keys(savedAnswers).length < QUIZ.length) {
            renderQuizResult(Number(localStorage.getItem(STORAGE.quizScore)) || 0, QUIZ.length, "Kuis sekarang memiliki 20 soal. Jawaban versi sebelumnya tetap dipulihkan; lengkapi soal baru lalu kirim untuk memperbarui attempt.");
        }

        form.addEventListener("change", function (event) {
            const label = event.target.closest("label");
            if (!label) return;
            const article = label.closest("article");
            if (!article) return;
            article.querySelectorAll("label").forEach(item => item.classList.remove("is-selected"));
            label.classList.add("is-selected");
            updateQuizNavigator();
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const answers = getQuizAnswers(form);
            const unanswered = Object.values(answers).filter(value => !value).length;
            if (unanswered) {
                renderQuizResult(0, QUIZ.length, "Masih ada " + unanswered + " soal yang belum dijawab.");
                const firstUnanswered = QUIZ.findIndex((_question, index) => !answers["python-q" + index]);
                if (firstUnanswered >= 0) showQuiz(firstUnanswered, true);
                return;
            }

            const score = QUIZ.reduce(function (total, question, index) {
                return total + (Number(answers["python-q" + index]) === question[2] ? 1 : 0);
            }, 0);

            localStorage.setItem(STORAGE.quizDone, "true");
            localStorage.setItem(STORAGE.quizScore, String(score));
            window.saveChapterProgress(MODULE_ID, 'quiz', 'completed', score);
            localStorage.setItem(STORAGE.quizAnswers, JSON.stringify(answers));
            renderQuizResult(score, QUIZ.length, "Pembahasan dibuka. Gunakan kartu merah/hijau untuk membaca ulang topik yang belum kuat.");
            lockQuiz(form, answers);
        });
    };

    function getDiscussionPosts() {
        const saved = safeJsonParse(localStorage.getItem(STORAGE.discussion), null);
        if (Array.isArray(saved)) return saved;
        return [];
    }

    function saveDiscussionPosts(posts) {
        localStorage.setItem(STORAGE.discussion, JSON.stringify(posts));
    }

    function renderDiscussion(posts) {
        const list = document.getElementById("aiBioinformaticsDiscussionList");
        if (!list) return;
        if (!posts.length) {
            list.innerHTML = `<div class="python-discussion-empty">
                <i class="far fa-comments" aria-hidden="true"></i>
                <div><strong>Belum ada thread</strong><p>Pilih salah satu prompt, tulis posisi dan alasanmu, lalu mulai diskusi pertama.</p></div>
            </div>`;
            return;
        }
        list.innerHTML = posts.map(function (post) {
            const replies = Array.isArray(post.replies) ? post.replies : [];
            return `<article class="discussion-bubble" data-discussion-id="${escapeHtml(post.id)}">
                <div>
                    <span>${post.id.indexOf("seed") === 0 ? "H" : "A"}</span>
                    <strong>${post.id.indexOf("seed") === 0 ? "HerAI Prompt" : "Aisyah Putri"}</strong>
                    <small>${new Date(post.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</small>
                </div>
                <p><b>${escapeHtml(post.prompt)}</b></p>
                <p>${escapeHtml(post.text)}</p>
                <button type="button" class="discussion-reply-btn" data-reply="${escapeHtml(post.id)}"><i class="far fa-message"></i> Balas</button>
                <div class="discussion-reply-composer" data-reply-composer="${escapeHtml(post.id)}" hidden>
                    <textarea rows="3" placeholder="Tulis balasanmu..." aria-label="Tulis balasan"></textarea>
                    <div class="discussion-reply-actions">
                        <button type="button" class="btn-reply-send" data-reply-send="${escapeHtml(post.id)}"><i class="fas fa-paper-plane" aria-hidden="true"></i> Kirim Balasan</button>
                        <button type="button" class="btn-reply-cancel" data-reply-cancel="${escapeHtml(post.id)}"><i class="fas fa-times" aria-hidden="true"></i> Batal</button>
                    </div>
                    <p class="discussion-reply-validation" data-reply-validation="${escapeHtml(post.id)}" hidden><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> Tulis balasan terlebih dahulu.</p>
                </div>
                <div class="discussion-replies">
                    ${replies.map(function (reply) {
                        return `<article><strong>Aisyah Putri</strong><small>${new Date(reply.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</small><p>${escapeHtml(reply.text)}</p></article>`;
                    }).join("")}
                </div>
            </article>`;
        }).join("");

        list.querySelectorAll("[data-reply]").forEach(function (button) {
            button.addEventListener("click", function () {
                var postId = button.dataset.reply;
                var composer = list.querySelector('[data-reply-composer="' + postId + '"]');
                if (!composer) return;
                var isOpen = !composer.hidden;
                list.querySelectorAll("[data-reply-composer]").forEach(function (c) { c.hidden = true; });
                if (isOpen) return;
                composer.hidden = false;
                var textarea = composer.querySelector("textarea");
                if (textarea) textarea.focus();
            });
        });

        list.querySelectorAll("[data-reply-send]").forEach(function (button) {
            button.addEventListener("click", function () {
                var postId = button.dataset.replySend;
                var composer = list.querySelector('[data-reply-composer="' + postId + '"]');
                if (!composer) return;
                var textarea = composer.querySelector("textarea");
                var validation = composer.querySelector('[data-reply-validation="' + postId + '"]');
                if (!textarea || !textarea.value.trim()) {
                    if (validation) validation.hidden = false;
                    return;
                }
                if (validation) validation.hidden = true;
                var posts = getDiscussionPosts();
                var target = posts.find(function (post) { return post.id === postId; });
                if (!target) return;
                target.replies = Array.isArray(target.replies) ? target.replies : [];
                target.replies.push({ text: textarea.value.trim(), createdAt: new Date().toISOString() });
                saveDiscussionPosts(posts);
                renderDiscussion(posts);
            });
        });

        list.querySelectorAll("[data-reply-cancel]").forEach(function (button) {
            button.addEventListener("click", function () {
                var postId = button.dataset.replyCancel;
                var composer = list.querySelector('[data-reply-composer="' + postId + '"]');
                if (!composer) return;
                var textarea = composer.querySelector("textarea");
                if (textarea) textarea.value = "";
                composer.hidden = true;
                var replyBtn = list.querySelector('[data-reply="' + postId + '"]');
                if (replyBtn) replyBtn.focus();
            });
        });
    }

    window.initAiBioinformaticsDiscussion = function () {
        const form = document.getElementById("aiBioinformaticsDiscussionForm");
        const select = form ? form.querySelector("select") : null;
        const textarea = form ? form.querySelector("textarea") : null;
        const refNode = document.getElementById("aiBioinformaticsDiscussionSource"); if(refNode) refNode.innerHTML = "<div style='padding: 20px; text-align: center; color: var(--text-secondary);'>Baca ulang materi secara utuh di tab Materi utama.</div>";
        renderDiscussion(getDiscussionPosts());

        const promptButtons = document.querySelector(".ml-discussion-prompts");
        if (promptButtons) {
            promptButtons.innerHTML = DISCUSSION_PROMPTS.map(function (prompt, index) {
                const labels = ["Ide & Penerapan", "Risiko & Tantangan", "Etika & Bias", "Berbagi Pengalaman"];
                const icons = ["fas fa-lightbulb", "fas fa-triangle-exclamation", "fas fa-balance-scale", "fas fa-users"];
                return `<button type="button" data-discussion-prompt="${escapeHtml(prompt)}"><i class="${icons[index]}" aria-hidden="true"></i><span>${labels[index]}</span></button>`;
            }).join("");
        }

        if (select) {
            select.innerHTML = DISCUSSION_PROMPTS.map(prompt => `<option>${escapeHtml(prompt)}</option>`).join("");
        }

        document.querySelectorAll("[data-discussion-prompt]").forEach(function (button) {
            button.addEventListener("click", function () {
                if (select) select.value = button.dataset.discussionPrompt;
                if (textarea && !textarea.value.trim()) {
                    textarea.value = button.dataset.discussionPrompt + "\n\n";
                    textarea.focus();
                }
            });
        });

        if (!form || !select || !textarea) return;
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const text = textarea.value.trim();
            if (!text) {
                setStatus("#aiBioinformaticsDiscussionStatus", "Tulis isi diskusi terlebih dahulu.", "warning");
                return;
            }

            const posts = getDiscussionPosts();
            posts.unshift({
                id: "post-" + Date.now(),
                prompt: select.value,
                text: text,
                createdAt: new Date().toISOString(),
                replies: []
            });
            saveDiscussionPosts(posts);
            form.reset();
            setStatus("#aiBioinformaticsDiscussionStatus", "Diskusi berhasil diposting dan tersimpan di browser ini.", "success");
            renderDiscussion(posts);
        });
    };
})();

// Mencegah elemen interaktif Python (Glossary, Kuis, dll) bocor ke modul lain
PYTHON_GUIDES.length = 0;
DISCUSSION_PROMPTS.length = 0;
SOURCE_VISUALS = {};
