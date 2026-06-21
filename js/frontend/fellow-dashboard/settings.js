(function() {
    'use strict';

    const STORAGE_KEY = 'heraiParticipantPortalSettings';
    const API_URL_KEY = 'heraiParticipantPortalApiUrl';
    const ADMIN_KEY = 'heraiParticipantPortalAdminKey';
    const SIDEBAR_STATE_KEY = 'heraiFellowSidebarExpanded';
    const PARTICIPANT_SESSION_KEY = 'heraiParticipantSession';
    const DEFAULT_SETTINGS = {
        enabled: true,
        pages: {
            dashboard: true,
            modules: true,
            profile: true,
            chatroom: true,
            mentor: true,
            tasks: true,
            projects: true,
            events: true,
            community: true,
            certificates: true,
            leaderboard: true,
            faq: true,
            settings: true
        }
    };

    function apiBase() {
        return window.PARTICIPANT_PORTAL_API_URL
            || localStorage.getItem(API_URL_KEY)
            || 'http://127.0.0.1:8092';
    }

    function mergeSettings(settings = {}) {
        return {
            ...DEFAULT_SETTINGS,
            ...settings,
            pages: {
                ...DEFAULT_SETTINGS.pages,
                ...(settings.pages || {})
            }
        };
    }

    function localSettings() {
        try {
            return mergeSettings(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'));
        } catch {
            return mergeSettings();
        }
    }

    async function fetchSettings() {
        const fallback = localSettings();
        try {
            const response = await fetch(`${apiBase()}/api/participant-portal/settings`, { cache: 'no-store' });
            if (!response.ok) return fallback;
            const result = await response.json();
            const merged = mergeSettings(result.settings || {});
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            return merged;
        } catch {
            return fallback;
        }
    }

    async function saveSettings(settings) {
        const merged = mergeSettings(settings);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        try {
            const headers = { 'Content-Type': 'application/json' };
            const adminKey = localStorage.getItem(ADMIN_KEY);
            if (adminKey) headers['X-HerAI-Admin-Key'] = adminKey;
            const response = await fetch(`${apiBase()}/api/participant-portal/settings`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({ settings: merged })
            });
            if (!response.ok) throw new Error('Participant portal API rejected the update');
            const result = await response.json();
            const saved = mergeSettings(result.settings || merged);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
            return saved;
        } catch (error) {
            console.warn('Participant portal settings saved locally only:', error.message);
            return merged;
        }
    }

    function applySettings(settings, pageName) {
        const merged = mergeSettings(settings);
        document.querySelectorAll('[data-fellow-nav]').forEach(link => {
            const key = link.getAttribute('data-fellow-nav');
            link.hidden = merged.pages[key] === false;
        });

        const isBlocked = merged.enabled === false || (pageName && merged.pages[pageName] === false);
        const root = document.querySelector('.fellow-dashboard');
        if (root) root.classList.toggle('fellow-dashboard-locked', isBlocked);
        if (isBlocked && root) {
            root.innerHTML = `
                <section class="fellow-locked-state">
                    <div>
                        <i class="fas fa-lock"></i>
                        <h1>Dashboard Peserta Belum Aktif</h1>
                        <p>Halaman ini sedang dinonaktifkan oleh admin. Silakan kembali lagi setelah panitia membuka aksesnya.</p>
                        <a href="#/home">Kembali ke Beranda</a>
                    </div>
                </section>
            `;
        }
    }

    function attachSidebarRail() {
        const sidebar = document.querySelector('.fellow-sidebar');
        if (!sidebar || sidebar.dataset.railReady) return;
        sidebar.dataset.railReady = 'true';
        const dashboard = sidebar.closest('.fellow-dashboard');
        const toggle = dashboard?.querySelector('.fellow-menu-toggle');
        const scrim = dashboard?.querySelector('.fellow-sidebar-scrim');
        const logo = sidebar.querySelector('.fellow-logo');

        const setMobileMenu = (open) => {
            if (!dashboard) return;
            dashboard.classList.toggle('sidebar-open', open);
            toggle?.setAttribute('aria-expanded', String(open));
            toggle?.querySelector('i')?.classList.toggle('fa-bars', !open);
            toggle?.querySelector('i')?.classList.toggle('fa-xmark', open);
        };

        const setDesktopSidebar = (open, persist = true) => {
            if (window.matchMedia('(max-width: 860px)').matches) return;
            sidebar.classList.toggle('is-expanded', open);
            dashboard?.classList.toggle('sidebar-expanded', open);
            logo?.setAttribute('aria-expanded', String(open));
            if (persist) localStorage.setItem(SIDEBAR_STATE_KEY, open ? 'true' : 'false');
        };

        setDesktopSidebar(localStorage.getItem(SIDEBAR_STATE_KEY) === 'true', false);

        logo?.setAttribute('role', 'button');
        logo?.setAttribute('aria-expanded', 'false');
        logo?.addEventListener('click', (event) => {
            if (window.matchMedia('(max-width: 860px)').matches) return;
            event.preventDefault();
            setDesktopSidebar(!sidebar.classList.contains('is-expanded'));
        });
        toggle?.addEventListener('click', () => {
            const next = !dashboard?.classList.contains('sidebar-open');
            setMobileMenu(next);
        });
        scrim?.addEventListener('click', () => setMobileMenu(false));
        sidebar.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (window.matchMedia('(max-width: 860px)').matches) {
                    setMobileMenu(false);
                }
            });
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') setMobileMenu(false);
        });
        window.addEventListener('resize', () => {
            if (!window.matchMedia('(max-width: 860px)').matches) {
                setMobileMenu(false);
                setDesktopSidebar(localStorage.getItem(SIDEBAR_STATE_KEY) === 'true', false);
            } else {
                sidebar.classList.remove('is-expanded');
                dashboard?.classList.remove('sidebar-expanded');
                logo?.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function setActiveFellowNav(pageName) {
        const path = window.location.hash.replace(/^#/, '') || '/participant-dashboard';
        const pageByPath = {
            '/participant-dashboard': 'dashboard',
            '/participant-modules': 'modules',
            '/participant-ai-fundamentals': 'modules',
            '/participant-ai-intro': 'modules',
            '/participant-ai-intro-practice': 'modules',
            '/participant-ai-intro-quiz': 'modules',
            '/participant-ai-intro-discussion': 'modules',
            '/participant-ai-history': 'modules',
            '/participant-ai-types': 'modules',
            '/participant-ai-components': 'modules',
            '/participant-ai-applications': 'modules',
            '/participant-ai-summary': 'modules',
            '/participant-profile': 'profile',
            '/participant-mentor': 'mentor',
            '/participant-tasks': 'tasks',
            '/participant-projects': 'projects',
            '/participant-events': 'events',
            '/participant-community': 'community',
            '/participant-certificates': 'certificates',
            '/participant-leaderboard': 'leaderboard',
            '/participant-help': 'faq',
            '/participant-settings': 'settings'
        };
        const activeKey = pageByPath[path] || pageName;
        document.querySelectorAll('.fellow-menu a').forEach((link) => {
            link.classList.toggle('active', link.dataset.fellowNav === activeKey);
        });
    }

    function initModuleInteractions() {
        const modulePage = document.querySelector('.fellow-modules-page');
        if (!modulePage || modulePage.dataset.moduleReady) return;
        modulePage.dataset.moduleReady = 'true';

        modulePage.querySelectorAll('[data-module-tab]').forEach((button) => {
            button.addEventListener('click', () => {
                modulePage.querySelectorAll('[data-module-tab]').forEach(item => item.classList.toggle('active', item === button));
                const target = button.dataset.moduleTab;
                if (target === 'foundation') {
                    document.getElementById('moduleCatalogPanel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else if (target === 'specialization') {
                    document.getElementById('specializationTrackPanel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    modulePage.querySelector('.module-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        modulePage.querySelectorAll('[data-course-filter]').forEach((button) => {
            button.addEventListener('click', () => {
                const filter = button.dataset.courseFilter;
                modulePage.querySelectorAll('[data-course-filter]').forEach(item => item.classList.toggle('active', item === button));
                modulePage.querySelectorAll('.course-category').forEach((category) => {
                    const group = category.querySelector('[data-course-group]')?.dataset.courseGroup || '';
                    category.hidden = filter !== 'all' && group !== filter;
                });
            });
        });

        modulePage.querySelectorAll('[data-collapse-panel]').forEach((button) => {
            button.addEventListener('click', () => {
                const panel = document.getElementById(button.dataset.collapsePanel);
                if (!panel) return;
                const collapsed = panel.classList.toggle('is-collapsed');
                button.setAttribute('aria-expanded', String(!collapsed));
                button.querySelector('i')?.classList.toggle('fa-chevron-up', !collapsed);
                button.querySelector('i')?.classList.toggle('fa-chevron-down', collapsed);
            });
        });
    }

    const introLessonRoutes = [
        { path: '/participant-ai-intro', title: 'Apa itu Artificial Intelligence?', short: 'Pengantar AI' },
        { path: '/participant-ai-history', title: 'Sejarah Singkat AI', short: 'Sejarah AI' },
        { path: '/participant-ai-types', title: 'Jenis-Jenis AI', short: 'Jenis AI' },
        { path: '/participant-ai-components', title: 'Komponen Utama AI', short: 'Komponen AI' },
        { path: '/participant-ai-applications', title: 'Penerapan AI di Berbagai Bidang', short: 'Penerapan AI' },
        { path: '/participant-ai-summary', title: 'Ringkasan', short: 'Ringkasan' }
    ];

    const generatedLessonContent = {
        '/participant-ai-history': {
            title: 'Sejarah Singkat AI',
            description: 'Memahami bagaimana AI berkembang dari gagasan mesin berpikir hingga menjadi teknologi arus utama.',
            duration: '35 menit',
            tag: 'Konteks',
            content: `
                <h2>2. Sejarah Singkat Artificial Intelligence</h2>
                <p>AI bukan teknologi yang muncul tiba-tiba. Laporan WTTC menjelaskan bahwa gagasan tentang mesin berpikir sudah dibahas sejak era komputer modern setelah Perang Dunia II. Salah satu titik pentingnya adalah Dartmouth Conference pada 1956, yang mempertemukan peneliti dari berbagai bidang untuk mengeksplorasi konsep "thinking machines" dan memperkenalkan istilah Artificial Intelligence sebagai bidang studi tersendiri.</p>
                <div class="lesson-insight-grid">
                    <article><span>1950</span><h3>Alan Turing</h3><p>Turing mengajukan pertanyaan penting: apakah mesin dapat berpikir? Gagasannya menjadi dasar diskusi tentang kecerdasan mesin.</p></article>
                    <article><span>1956</span><h3>Dartmouth Conference</h3><p>Konferensi ini sering dianggap sebagai kelahiran AI sebagai bidang ilmu formal.</p></article>
                    <article><span>1997</span><h3>IBM Deep Blue</h3><p>Komputer IBM mengalahkan Gary Kasparov dalam catur dan menunjukkan kemampuan AI pada tugas kompleks.</p></article>
                </div>
                <h2>AI Menjadi Arus Utama</h2>
                <p>WTTC menyoroti beberapa momen yang membuat publik semakin memahami kemampuan AI: IBM Watson memenangkan Jeopardy pada 2011, AlphaFold membantu memprediksi struktur protein, dan ChatGPT pada 2022 memperkenalkan chatbot AI kepada lebih dari 100 juta pengguna dalam waktu singkat.</p>
                <p>Pelajaran pentingnya: AI berkembang secara bertahap melalui riset panjang, lalu terlihat "mendadak besar" ketika data, algoritma, dan komputasi mencapai titik yang cukup matang.</p>
                <aside class="lesson-reference">Referensi: WTTC, <em>Introduction to Artificial Intelligence (AI) Technology</em>, 2024, pp. 4-7.</aside>
            `
        },
        '/participant-ai-types': {
            title: 'Jenis-Jenis AI',
            description: 'Membedakan AI berdasarkan cara belajar, kapabilitas, dan fungsionalitasnya.',
            duration: '40 menit',
            tag: 'Klasifikasi',
            content: `
                <h2>3. Jenis-Jenis Artificial Intelligence</h2>
                <p>Menurut WTTC, AI dapat diklasifikasikan dengan beberapa cara: berdasarkan cara sistem belajar, berdasarkan kapabilitas, dan berdasarkan fungsionalitas. Klasifikasi ini membantu kita tidak menyamaratakan semua sistem AI.</p>
                <div class="ai-capability-grid">
                    <article><i class="fas fa-bullseye"></i><h3>ANI</h3><p>Artificial Narrow Intelligence dirancang untuk tugas spesifik seperti pengenal wajah, filter spam, atau rekomendasi produk.</p></article>
                    <article><i class="fas fa-brain"></i><h3>AGI</h3><p>Artificial General Intelligence adalah level hipotesis ketika mesin memiliki kemampuan kognitif lintas domain setara manusia.</p></article>
                    <article><i class="fas fa-star"></i><h3>ASI</h3><p>Artificial Superintelligence adalah level hipotetis ketika kecerdasan mesin melampaui kapasitas intelektual manusia terbaik.</p></article>
                </div>
                <h2>Berdasarkan Fungsionalitas</h2>
                <p>WTTC juga membahas expert system, predictive AI, dan generative AI. Expert system meniru keahlian manusia pada domain tertentu, predictive AI memperkirakan kemungkinan masa depan berdasarkan data historis, sedangkan generative AI menghasilkan konten baru seperti teks, gambar, video, atau kode.</p>
                <ol class="lesson-numbered-list">
                    <li><strong>Expert System:</strong> sistem berbasis pengetahuan dan aturan untuk memberi saran atau rekomendasi.</li>
                    <li><strong>Predictive AI:</strong> sistem yang memakai data historis untuk memperkirakan pola atau risiko masa depan.</li>
                    <li><strong>Generative AI:</strong> sistem yang menciptakan output baru berdasarkan pola dari data pelatihan.</li>
                </ol>
                <aside class="lesson-reference">Referensi: WTTC, <em>Introduction to Artificial Intelligence (AI) Technology</em>, 2024, pp. 21-24 dan Annex pp. 35-39.</aside>
            `
        },
        '/participant-ai-components': {
            title: 'Komponen Utama AI',
            description: 'Mempelajari tiga fondasi utama AI modern: algoritma, data, dan computing power.',
            duration: '45 menit',
            tag: 'Fondasi',
            content: `
                <h2>4. Komponen Utama AI</h2>
                <p>WTTC merangkum AI modern sebagai gabungan dari tiga hal besar: algoritma, data, dan computing power. Algoritma memberi instruksi dan pola belajar, data menjadi bahan bakar pembelajaran, sedangkan computing power memungkinkan model memproses data dalam skala besar.</p>
                <div class="practice-card-grid">
                    <article><span>1</span><h3>Algorithms</h3><p>Algoritma adalah "otak" AI. Dalam AI modern, algoritma tidak hanya mengikuti aturan IF-THEN-ELSE, tetapi belajar pola dari data.</p></article>
                    <article><span>2</span><h3>Data</h3><p>Data adalah bahan bakar AI. Semakin relevan, beragam, dan berkualitas datanya, semakin baik peluang model belajar pola yang berguna.</p></article>
                    <article><span>3</span><h3>Computing Power</h3><p>GPU, TPU, cloud, dan supercomputer memungkinkan pelatihan model besar yang mustahil dilakukan dengan komputer biasa.</p></article>
                </div>
                <h2>Mengapa Data Sangat Penting?</h2>
                <p>Laporan WTTC menjelaskan bahwa volume data dunia meningkat sangat cepat melalui smartphone, perangkat internet, dokumen, media sosial, sensor, kendaraan, dan infrastruktur digital. Data besar mendukung training data, feature extraction, performa model, dan kemampuan sistem AI menangani skenario kompleks.</p>
                <h2>Mengapa Komputasi Menentukan?</h2>
                <p>Model AI besar dilatih pada kumpulan data yang sangat masif. Untuk memprosesnya, sistem membutuhkan chip khusus dan infrastruktur cloud. Karena itu, AI modern sangat terkait dengan GPU, TPU, data center, dan ekosistem semikonduktor global.</p>
                <aside class="lesson-reference">Referensi: WTTC, <em>Introduction to Artificial Intelligence (AI) Technology</em>, 2024, pp. 8-20.</aside>
            `
        },
        '/participant-ai-applications': {
            title: 'Penerapan AI di Berbagai Bidang',
            description: 'Melihat bagaimana AI diterapkan pada bisnis, pariwisata, kesehatan, kreatif, dan layanan digital.',
            duration: '40 menit',
            tag: 'Aplikasi',
            content: `
                <h2>5. Penerapan AI di Berbagai Bidang</h2>
                <p>AI adalah teknologi multi-use, mirip listrik: dapat diterapkan pada banyak sektor dan skenario. WTTC menekankan bahwa AI dapat membantu menganalisis data besar, memecahkan masalah kompleks, membuat keputusan, dan menjalankan tugas kreatif.</p>
                <div class="lesson-insight-grid">
                    <article><span>Travel</span><h3>Personalized Recommendation</h3><p>AI dapat membantu rekomendasi destinasi, itinerary, layanan pelanggan, dan prediksi gangguan operasional.</p></article>
                    <article><span>Health</span><h3>Medical AI</h3><p>AlphaFold dan AI imaging menunjukkan potensi AI untuk riset obat, diagnosis, dan analisis medis berskala besar.</p></article>
                    <article><span>Creative</span><h3>Generative Content</h3><p>Generative AI dapat membuat teks, gambar, kode, dan konten kreatif lain, tetapi tetap membutuhkan verifikasi manusia.</p></article>
                </div>
                <h2>Risiko dan Guardrails</h2>
                <p>AI juga membawa risiko, termasuk disinformasi, deepfake, bias, privasi, dan ketergantungan pada output yang mungkin salah. WTTC menekankan perlunya guardrails, regulasi, kode etik, dan praktik penggunaan bertanggung jawab.</p>
                <h2>Generative AI dan Hallucination</h2>
                <p>Generative AI dapat menghasilkan jawaban yang terlihat meyakinkan tetapi keliru. Fenomena ini disebut hallucination. Karena itu, output AI untuk keputusan bisnis, keselamatan, atau operasional harus diverifikasi.</p>
                <aside class="lesson-reference">Referensi: WTTC, <em>Introduction to Artificial Intelligence (AI) Technology</em>, 2024, pp. 22-31.</aside>
            `
        },
        '/participant-ai-summary': {
            title: 'Ringkasan Pengantar AI',
            description: 'Merangkum konsep inti dan kesiapan skill yang dibutuhkan untuk belajar AI lebih lanjut.',
            duration: '25 menit',
            tag: 'Review',
            content: `
                <h2>6. Ringkasan</h2>
                <p>AI adalah cabang teknologi yang membuat komputer atau mesin dapat menunjukkan perilaku cerdas: belajar, menganalisis data, mengenali pola, mengambil keputusan, dan membuat konten. AI modern berkembang karena kemajuan algoritma, ledakan data, dan computing power.</p>
                <ol class="lesson-numbered-list">
                    <li>AI memiliki sejarah panjang, tetapi menjadi arus utama setelah teknologi, data, dan akses publik semakin matang.</li>
                    <li>AI, Machine Learning, dan Deep Learning saling terkait secara hierarkis.</li>
                    <li>AI dapat diklasifikasikan berdasarkan cara belajar, kapabilitas, dan fungsionalitas.</li>
                    <li>Generative AI membuka peluang besar, tetapi juga membawa risiko seperti hallucination dan disinformasi.</li>
                    <li>Kesenjangan skill AI menjadi tantangan penting. Belajar AI bukan hanya soal memakai tools, tetapi memahami cara berpikir, batasan, dan tanggung jawabnya.</li>
                </ol>
                <div class="daily-ai-box"><h3>Checklist Pemahaman</h3><div><span><i class="fas fa-brain"></i><small>Definisi AI</small></span><span><i class="fas fa-code-branch"></i><small>ML dan DL</small></span><span><i class="fas fa-database"></i><small>Data</small></span><span><i class="fas fa-microchip"></i><small>Komputasi</small></span><span><i class="fas fa-shield-halved"></i><small>Risiko</small></span></div></div>
                <aside class="lesson-reference">Referensi: WTTC, <em>Introduction to Artificial Intelligence (AI) Technology</em>, 2024, pp. 31-35.</aside>
            `
        }
    };

    function currentPath() {
        return window.location.hash.replace(/^#/, '') || '/participant-dashboard';
    }

    function renderLessonList(activePath) {
        return introLessonRoutes.map((lesson, index) => {
            const active = lesson.path === activePath ? ' class="active"' : '';
            const locked = index > 0 ? ' data-locked-after-quiz' : '';
            return `<li${active}${locked}><span>${index + 1}</span><a href="#${lesson.path}">${lesson.title}</a><i class="${active ? 'far fa-circle-play' : 'far fa-circle'}"></i></li>`;
        }).join('');
    }

    function initGeneratedLessonPage() {
        const page = document.querySelector('.ai-generated-lesson-page');
        if (!page || page.dataset.generatedReady) return;
        page.dataset.generatedReady = 'true';
        const path = currentPath();
        const lesson = generatedLessonContent[path] || generatedLessonContent['/participant-ai-history'];
        const index = Math.max(1, introLessonRoutes.findIndex(item => item.path === path));
        const prev = introLessonRoutes[index - 1] || introLessonRoutes[0];
        const next = introLessonRoutes[index + 1];
        const progress = Math.round(((index + 1) / introLessonRoutes.length) * 100);

        page.querySelector('[data-lesson-breadcrumb]').textContent = lesson.title;
        page.querySelector('[data-lesson-title]').textContent = lesson.title;
        page.querySelector('[data-lesson-description]').textContent = lesson.description;
        page.querySelector('[data-lesson-duration]').textContent = lesson.duration;
        page.querySelector('[data-lesson-position]').textContent = `Modul ${index + 1} dari ${introLessonRoutes.length}`;
        page.querySelector('[data-lesson-tag]').textContent = lesson.tag;
        page.querySelector('[data-lesson-content]').innerHTML = lesson.content;
        page.querySelector('[data-lesson-list]').innerHTML = renderLessonList(path);
        page.querySelector('[data-lesson-progress-bar]').style.setProperty('--value', `${progress}%`);
        page.querySelector('[data-lesson-progress-text]').textContent = `${progress}%`;
        page.querySelector('[data-lesson-progress-caption]').textContent = `${index + 1} dari ${introLessonRoutes.length} materi Pengantar AI`;
        const prevLink = page.querySelector('[data-lesson-prev]');
        const nextLink = page.querySelector('[data-lesson-next]');
        prevLink.href = `#${prev.path}`;
        prevLink.innerHTML = `<i class="fas fa-chevron-left"></i> ${prev.short}`;
        if (next) {
            nextLink.href = `#${next.path}`;
            nextLink.innerHTML = `${next.short} <i class="fas fa-arrow-right"></i>`;
        } else {
            nextLink.href = '#/participant-ai-fundamentals';
            nextLink.innerHTML = 'Kembali ke Modul <i class="fas fa-arrow-right"></i>';
        }
    }

    function initPracticeNotes() {
        const form = document.getElementById('aiIntroPracticeForm');
        if (!form || form.dataset.practiceReady) return;
        form.dataset.practiceReady = 'true';
        const key = 'heraiAiIntroPracticeAnswers';
        const status = document.getElementById('aiIntroPracticeStatus');
        const saveButton = form.querySelector('[data-practice-save]');
        const editButton = form.querySelector('[data-practice-edit]');
        const deleteButton = form.querySelector('[data-practice-delete]');
        const fields = Array.from(form.querySelectorAll('textarea'));
        const setStatus = (message) => {
            if (status) status.textContent = message;
        };
        const setReadonly = (readonly) => {
            fields.forEach(field => field.readOnly = readonly);
            if (saveButton) saveButton.textContent = readonly ? 'Tersimpan' : 'Simpan Jawaban';
        };
        const saved = JSON.parse(localStorage.getItem(key) || '{}');
        fields.forEach(field => field.value = saved[field.name] || '');
        if (Object.keys(saved).length) {
            setReadonly(true);
            setStatus('Jawaban latihan tersimpan di perangkatmu.');
        }
        saveButton?.addEventListener('click', () => {
            const payload = {};
            fields.forEach(field => payload[field.name] = field.value.trim());
            localStorage.setItem(key, JSON.stringify(payload));
            setReadonly(true);
            setStatus('Jawaban berhasil disimpan. Kamu bisa edit atau hapus kapan saja.');
        });
        editButton?.addEventListener('click', () => {
            setReadonly(false);
            fields[0]?.focus();
            setStatus('Mode edit aktif.');
        });
        deleteButton?.addEventListener('click', () => {
            localStorage.removeItem(key);
            fields.forEach(field => {
                field.value = '';
                field.readOnly = false;
            });
            setStatus('Jawaban latihan dihapus.');
        });
    }

    function initLessonDiscussion() {
        const form = document.getElementById('aiIntroDiscussionForm');
        const list = document.getElementById('aiIntroDiscussionList');
        if (!form || !list || form.dataset.discussionReady) return;
        form.dataset.discussionReady = 'true';
        const key = 'heraiAiIntroDiscussionThread';
        const fallback = [
            { id: 'seed-1', name: 'Aisyah Putri', time: 'Hari ini, 09.15', text: 'Menurutku AI paling terasa di rekomendasi konten dan navigasi. Tapi aku masih penasaran bagaimana cara membedakan rekomendasi yang membantu dan yang manipulatif.', replies: [{ name: 'Mentor Rani', time: 'Hari ini, 09.28', text: 'Pertanyaan bagus. Salah satu caranya adalah melihat transparansi data, tujuan sistem, dan apakah pengguna masih punya kontrol.' }] }
        ];
        const escapeHtml = (value = '') => String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
        const load = () => JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
        const save = (items) => localStorage.setItem(key, JSON.stringify(items));
        const timestamp = () => new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date());
        const render = () => {
            const items = load();
            list.innerHTML = items.map(item => `
                <article class="discussion-bubble">
                    <div><span>${escapeHtml(item.name.charAt(0))}</span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.time)}</small></div>
                    <p>${escapeHtml(item.text)}</p>
                    <button type="button" data-reply="${item.id}">Reply</button>
                    <div class="discussion-replies">${(item.replies || []).map(reply => `<article><strong>${escapeHtml(reply.name)}</strong><small>${escapeHtml(reply.time)}</small><p>${escapeHtml(reply.text)}</p></article>`).join('')}</div>
                </article>
            `).join('');
            list.querySelectorAll('[data-reply]').forEach(button => {
                button.addEventListener('click', () => {
                    const text = prompt('Tulis balasan diskusi:');
                    if (!text || !text.trim()) return;
                    const updated = load();
                    const target = updated.find(item => item.id === button.dataset.reply);
                    if (target) {
                        target.replies = target.replies || [];
                        target.replies.push({ name: 'Aisyah Putri', time: timestamp(), text: text.trim() });
                        save(updated);
                        render();
                    }
                });
            });
        };
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const textarea = form.querySelector('textarea');
            const text = textarea?.value.trim();
            if (!text) return;
            const updated = load();
            updated.unshift({ id: `post-${Date.now()}`, name: 'Aisyah Putri', time: timestamp(), text, replies: [] });
            save(updated);
            textarea.value = '';
            render();
        });
        render();
    }

    function initLessonControls() {
        const quizDoneKey = 'heraiAiIntroQuizDone';
        const quizScoreKey = 'heraiAiIntroQuizScore';
        const isQuizDone = localStorage.getItem(quizDoneKey) === 'true';

        document.querySelectorAll('[data-locked-after-quiz]').forEach((item) => {
            item.hidden = !isQuizDone;
        });
        document.querySelectorAll('.lesson-lock-hint').forEach((item) => {
            item.hidden = isQuizDone;
        });

        const nextLink = document.getElementById('aiIntroQuizNext');
        if (nextLink && isQuizDone) nextLink.classList.remove('is-disabled');
        if (nextLink && !nextLink.dataset.guardReady) {
            nextLink.dataset.guardReady = 'true';
            nextLink.addEventListener('click', (event) => {
                if (nextLink.classList.contains('is-disabled')) {
                    event.preventDefault();
                }
            });
        }

        const quizForm = document.getElementById('aiIntroQuizForm');
        if (!quizForm || quizForm.dataset.quizReady) return;
        quizForm.dataset.quizReady = 'true';

        const resultBox = document.getElementById('aiIntroQuizResult');
        const submitButton = quizForm.querySelector('.quiz-submit-btn');
        const showResult = (score, total) => {
            if (!resultBox) return;
            resultBox.hidden = false;
            resultBox.innerHTML = `
                <strong>Nilai kamu: ${score}/${total}</strong>
                <span>Skor tersimpan. Jawaban benar tidak ditampilkan agar evaluasi tetap fair.</span>
            `;
        };

        if (isQuizDone) {
            const savedScore = Number(localStorage.getItem(quizScoreKey) || 0);
            showResult(savedScore, 5);
            quizForm.querySelectorAll('input').forEach(input => input.disabled = true);
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Kuis Sudah Dikirim';
            }
            return;
        }

        quizForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const groups = ['q1', 'q2', 'q3', 'q4', 'q5'];
            let score = 0;
            for (const group of groups) {
                const selected = quizForm.querySelector(`input[name="${group}"]:checked`);
                if (selected && selected.value === '1') score += 1;
            }
            localStorage.setItem(quizDoneKey, 'true');
            localStorage.setItem(quizScoreKey, String(score));
            showResult(score, groups.length);
            quizForm.querySelectorAll('input').forEach(input => input.disabled = true);
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Kuis Sudah Dikirim';
            }
            document.querySelectorAll('[data-locked-after-quiz]').forEach(item => item.hidden = false);
            document.querySelectorAll('.lesson-lock-hint').forEach(item => item.hidden = true);
            nextLink?.classList.remove('is-disabled');
        });
    }

    function escapeHtml(value = '') {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function readParticipantSession() {
        try {
            return JSON.parse(sessionStorage.getItem(PARTICIPANT_SESSION_KEY) || 'null');
        } catch {
            return null;
        }
    }

    function initFellowUserMenu() {
        normalizeFellowUserMenu();
        const menu = document.querySelector('.fellow-user-menu');
        if (!menu || menu.dataset.ready) return;
        menu.dataset.ready = 'true';
        const toggle = menu.querySelector('[data-fellow-user-toggle]');
        const logout = menu.querySelector('[data-fellow-logout]');
        const session = readParticipantSession();
        const name = session?.name || window.__CURRENT_PARTICIPANT_PROFILE__?.nama_lengkap || 'Aisyah Putri';
        const nameNode = menu.querySelector('.fellow-user-button strong');
        const greeting = document.querySelector('[data-fellow-greeting]');
        if (nameNode) nameNode.textContent = name;
        if (greeting) greeting.textContent = `Halo, ${name}!`;

        toggle?.addEventListener('click', (event) => {
            event.stopPropagation();
            const open = !menu.classList.contains('is-open');
            menu.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
        });
        document.addEventListener('click', (event) => {
            if (!menu.contains(event.target)) {
                menu.classList.remove('is-open');
                toggle?.setAttribute('aria-expanded', 'false');
            }
        });
        logout?.addEventListener('click', () => {
            sessionStorage.removeItem(PARTICIPANT_SESSION_KEY);
            window.__CURRENT_PARTICIPANT_PROFILE__ = null;
            window.location.hash = '#/participant-login';
        });
    }

    function normalizeFellowUserMenu() {
        const actions = document.querySelector('.fellow-actions');
        if (!actions || actions.querySelector('.fellow-user-menu')) return;

        const userButton = actions.querySelector('.fellow-user-button');
        if (!userButton) return;

        const menu = document.createElement('div');
        menu.className = 'fellow-user-menu';

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = userButton.className;
        toggle.setAttribute('data-fellow-user-toggle', '');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = userButton.innerHTML;

        const dropdown = document.createElement('div');
        dropdown.className = 'fellow-user-dropdown';
        dropdown.setAttribute('data-fellow-user-dropdown', '');
        dropdown.innerHTML = `
            <a href="#/participant-profile"><i class="fas fa-user-gear"></i><span>Setting Akun</span></a>
            <button type="button" data-fellow-logout><i class="fas fa-right-from-bracket"></i><span>Log Out</span></button>
        `;

        menu.append(toggle, dropdown);
        userButton.replaceWith(menu);
    }

    function defaultParticipantDashboardData() {
        return {
            modules: [
                { title: 'AI Fundamentals & Advanced', subtitle: 'Pengantar AI dan konsep modern', progress: 0, icon: 'fas fa-brain', tone: 'pink', href: '#/participant-ai-fundamentals' },
                { title: 'Math for AI', subtitle: 'Aljabar, kalkulus, probabilitas', progress: 0, icon: 'fas fa-square-root-variable', tone: 'purple', href: '#/participant-modules' },
                { title: 'Machine Learning', subtitle: 'Model, evaluasi, dan pipeline', progress: 0, icon: 'fas fa-diagram-project', tone: 'orange', href: '#/participant-modules' }
            ],
            discussionTrails: [
                { actor: 'Mentor Rani', action: 'membalas diskusi', topic: 'Pengantar AI', time: '2 jam yang lalu', tone: '' },
                { actor: 'Aisyah Putri', action: 'menulis pertanyaan', topic: 'Reasoning', time: '3 jam yang lalu', tone: 'blue' },
                { actor: 'Panitia', action: 'menandai referensi baru', topic: 'Evaluation', time: '5 jam yang lalu', tone: 'green' }
            ],
            tracks: [
                { title: 'Vision', subtitle: 'Computer Vision, Image Processing, Object Detection', icon: 'fas fa-eye' },
                { title: 'Speech', subtitle: 'ASR, TTS, Whisper, Audio ML', icon: 'fas fa-microphone-lines' },
                { title: 'Language Model', subtitle: 'NLP, LLM, RAG, fine-tuning', icon: 'fas fa-message' },
                { title: 'Infrastructure', subtitle: 'MLOps, cloud, deployment, scalability', icon: 'fas fa-house-laptop' },
                { title: 'Multimodal Interaction', subtitle: 'VLM, multimodal LLM, cross-modal learning', icon: 'fas fa-layer-group' },
                { title: 'Bioinformatics', subtitle: 'Genomics, protein analysis, medical AI', icon: 'fas fa-dna' }
            ],
            journey: [
                { title: 'Foundation Phase', subtitle: 'Pemahaman dasar AI', progress: 0, icon: 'fas fa-book-open', accent: '#f63392' },
                { title: 'Specialization', subtitle: 'Pilih dan dalami track AI', progress: 0, icon: 'fas fa-code', accent: '#8b5cf6' },
                { title: 'Project Building', subtitle: 'Bangun proyek nyata', progress: 0, icon: 'fas fa-briefcase', accent: '#f8b84e' },
                { title: 'Graduation', subtitle: 'Persiapan karier dan sertifikasi', progress: 0, icon: 'fas fa-graduation-cap', accent: '#45c598' }
            ],
            events: [
                { day: '22', month: 'MEI', title: 'Live Session: Build RAG Chatbot', time: '10.00 - 12.00 WIB', url: '#/participant-events' },
                { day: '25', month: 'MEI', title: 'Mentor Clinic: Career in AI', time: '19.00 - 20.30 WIB', url: '#/participant-events' },
                { day: '30', month: 'MEI', title: 'Workshop: Data Visualization', time: '13.00 - 15.00 WIB', url: '#/participant-events' }
            ],
            leaderboard: [
                { rank: 1, name: 'Dewi Lestari', points: 2450 },
                { rank: 2, name: 'Aisyah Putri', points: 2120, current: true },
                { rank: 3, name: 'Siti Aulia', points: 1890 }
            ]
        };
    }

    async function fetchParticipantDashboardData() {
        const fallback = defaultParticipantDashboardData();
        try {
            const session = readParticipantSession();
            const response = await fetch('/__gas', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ action: 'getParticipantDashboardData', nik: session?.nik || '' })
            });
            if (!response.ok) return fallback;
            const result = await response.json();
            if (result.status !== 'success') return fallback;
            return { ...fallback, ...(result.data || {}) };
        } catch {
            return fallback;
        }
    }

    function renderParticipantDashboard(data) {
        const fallbackData = defaultParticipantDashboardData();
        const nonEmpty = (items, fallbackItems) => Array.isArray(items) && items.length ? items : fallbackItems;
        const moduleGrid = document.getElementById('dashboardModuleGrid');
        if (moduleGrid) {
            const modules = nonEmpty(data.modules, fallbackData.modules);
            moduleGrid.innerHTML = modules.map((item) => `
                <a class="module-card ${escapeHtml(item.tone || 'pink')}" href="${escapeHtml(item.href || '#/participant-modules')}">
                    <div class="module-icon"><i class="${escapeHtml(item.icon || 'fas fa-book-open')}"></i></div>
                    <span>${Number(item.progress || 0)}%</span>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.subtitle || 'Mulai belajar')}</p>
                </a>
            `).join('') + `
                <a class="module-card add" href="#/participant-modules">
                    <div class="module-icon"><i class="fas fa-plus"></i></div>
                    <h3>Pilih Modul Lainnya</h3>
                    <p>Jelajahi semua modul</p>
                </a>
            `;
        }

        const trail = document.getElementById('dashboardDiscussionTrail');
        if (trail) {
            const discussionTrails = nonEmpty(data.discussionTrails, fallbackData.discussionTrails);
            trail.innerHTML = discussionTrails.map((item) => `
                <li><span class="mini-avatar ${escapeHtml(item.tone || '')}"></span><p><strong>${escapeHtml(item.actor)}</strong> ${escapeHtml(item.action)} di diskusi <b>#${escapeHtml(item.topic)}</b><small>${escapeHtml(item.time)}</small></p><i></i></li>
            `).join('');
        }

        const tracks = document.getElementById('dashboardTrackGrid');
        if (tracks) {
            const trackItems = nonEmpty(data.tracks, fallbackData.tracks);
            tracks.innerHTML = trackItems.map((item) => `
                <article><i class="${escapeHtml(item.icon || 'fas fa-layer-group')}"></i><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.subtitle)}</span></article>
            `).join('');
        }

        const journey = document.getElementById('dashboardJourneyList');
        if (journey) {
            const journeyItems = nonEmpty(data.journey, fallbackData.journey);
            journey.innerHTML = journeyItems.map((item) => `
                <article style="--accent:${escapeHtml(item.accent || '#f63392')};--value:${Number(item.progress || 0)}%">
                    <i class="${escapeHtml(item.icon || 'fas fa-book-open')}"></i>
                    <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.subtitle)}</span><b></b></div>
                    <em>${Number(item.progress || 0)}%</em>
                </article>
            `).join('');
        }

        const events = document.getElementById('dashboardUpcomingEvents');
        if (events) {
            const eventItems = nonEmpty(data.events, fallbackData.events);
            events.innerHTML = eventItems.map((item) => `
                <article><time><strong>${escapeHtml(item.day)}</strong>${escapeHtml(item.month)}</time><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.time)}</p></div><a class="event-join-button" href="${escapeHtml(item.url || '#/participant-events')}">Gabung</a></article>
            `).join('');
        }

        const leaderboard = document.getElementById('dashboardLeaderboard');
        if (leaderboard) {
            const session = readParticipantSession();
            const currentName = session?.name || window.__CURRENT_PARTICIPANT_PROFILE__?.nama_lengkap || 'Aisyah Putri';
            const leaderboardItems = nonEmpty(data.leaderboard, fallbackData.leaderboard);
            leaderboard.innerHTML = leaderboardItems.map((item, index) => {
                const rank = item.rank || index + 1;
                const itemNik = String(item.nik || '').replace(/\D/g, '');
                const sessionNik = String(session?.nik || '').replace(/\D/g, '');
                const sameNik = itemNik && sessionNik && itemNik === sessionNik;
                const sameName = item.name && currentName && String(item.name).toLowerCase() === String(currentName).toLowerCase();
                const isCurrent = item.current === true || sameNik || sameName;
                const medal = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
                const shouldPreferStoredName = (sameNik || sameName || !session?.name) && item.name && item.name !== '*********';
                const cleanName = shouldPreferStoredName ? item.name : currentName;
                const visibleName = isCurrent ? `${escapeHtml(cleanName || 'Kamu')} (Kamu)` : '*********';
                return `<li class="${isCurrent ? 'current' : ''}"><span>${rank}</span><b class="avatar-small ${isCurrent ? 'pink' : 'masked'}">${isCurrent ? '' : '****'}</b><strong>${visibleName}</strong><em>${Number(item.points || 0).toLocaleString('id-ID')} Poin</em><i class="fas fa-medal ${medal}"></i></li>`;
            }).join('');
        }
    }

    async function initParticipantDashboardData() {
        renderParticipantDashboard(defaultParticipantDashboardData());
        const data = await fetchParticipantDashboardData();
        renderParticipantDashboard(data);
    }

    window.getParticipantPortalSettings = fetchSettings;
    window.saveParticipantPortalSettings = saveSettings;
    window.applyParticipantPortalSettings = applySettings;
    window.initFellowDashboardPage = async function(pageName = 'dashboard') {
        attachSidebarRail();
        initFellowUserMenu();
        setActiveFellowNav(pageName);
        const settings = await fetchSettings();
        applySettings(settings, pageName);
        attachSidebarRail();
        initFellowUserMenu();
        setActiveFellowNav(pageName);
        if (pageName === 'dashboard') {
            initParticipantDashboardData();
        }
        if (pageName === 'modules') {
            initModuleInteractions();
            initGeneratedLessonPage();
            initPracticeNotes();
            initLessonDiscussion();
            initLessonControls();
        }
    };
})();
