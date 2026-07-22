# Forum Analisis Kasus

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/01-pengantar-ai/diskusi.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

#### Forum Analisis Kasus

Pilih salah satu skenario: algoritma rekrutmen yang bias terhadap perempuan, chatbot hukum yang mengarang preseden, atau navigasi yang mengalihkan kemacetan ke jalan pemukiman. Bedah dengan alur tujuan, input, pola, output, dan pemeriksaan manusia.

Tulis posting diskusi

Posting Diskusi

## Lampiran Sumber HTML Lengkap

````html
<section class="fellow-dashboard fellow-modules-page lesson-detail-page" data-fellow-page="modules">
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
    </aside>
    <main class="fellow-main">
        <header class="lesson-topbar">
            <nav class="lesson-breadcrumb" aria-label="Breadcrumb materi"><a href="#/participant-ai-fundamentals"><i class="fas fa-arrow-left"></i><span>AI Fundamentals</span></a><span class="lesson-breadcrumb-separator"><i class="fas fa-arrow-right"></i></span><span>Diskusi Pengantar AI</span></nav>
            <div class="fellow-actions">
                <label class="fellow-search"><i class="fas fa-magnifying-glass"></i><input type="search" placeholder="Cari modul, topik, atau materi..."></label>
                <button type="button" class="fellow-icon-button" aria-label="Notifikasi"><i class="far fa-bell"></i><span>5</span></button>
                <a href="#/participant-profile" class="fellow-user-button"><span class="avatar-img"></span><span><strong>Aisyah Putri</strong><small>Peserta</small></span><i class="fas fa-chevron-down"></i></a>
            </div>
        </header>
        <div class="lesson-layout">
            <div class="lesson-main-content">
                <section class="lesson-hero compact">
                    <div class="lesson-hero-copy">
                        <h1>Diskusi Pengantar AI</h1>
                        <p>Gunakan ruang diskusi untuk membedah bias, halusinasi, privasi, dan dampak sosial sistem AI.</p>
                        <div class="lesson-meta-row"><span><i class="far fa-message"></i> Forum</span><span><i class="far fa-clock"></i> Timestamp aktif</span><b>Kolaboratif</b></div>
                    </div>
                    <img src="/assets/messaging/herai-chat-persona.png" alt="HerAI fellow diskusi AI">
                </section>
                <section class="lesson-material-panel">
                    <div class="lesson-tabs" role="tablist" aria-label="Jenis materi">
                        <a href="#/participant-ai-intro"><i class="fas fa-book-open"></i> Materi</a>
                        <a href="#/participant-ai-intro-practice"><i class="fas fa-pen-to-square"></i> Latihan</a>
                        <a href="#/participant-ai-intro-quiz"><i class="far fa-clipboard"></i> Kuis</a>
                        <a href="#/participant-ai-intro-discussion" class="active"><i class="far fa-message"></i> Diskusi</a>
                    </div>
                    <article class="lesson-article">
                        <h2>Forum Analisis Kasus</h2>
                        <p>Pilih salah satu skenario: algoritma rekrutmen yang bias terhadap perempuan, chatbot hukum yang mengarang preseden, atau navigasi yang mengalihkan kemacetan ke jalan pemukiman. Bedah dengan alur tujuan, input, pola, output, dan pemeriksaan manusia.</p>
                        <form class="practice-response-form discussion-compose" id="aiIntroDiscussionForm">
                            <label><span>Tulis posting diskusi</span><textarea rows="5" placeholder="Contoh: Pada kasus rekrutmen, menurut saya masalah utamanya bukan bug kode murni, tetapi data historis yang sudah bias karena..."></textarea></label>
                            <button type="submit">Posting Diskusi</button>
                        </form>
                        <div class="discussion-thread" id="aiIntroDiscussionList"></div>
                    </article>
                    <footer class="lesson-nav-footer"><a href="#/participant-ai-intro-quiz"><i class="fas fa-chevron-left"></i> Kembali ke Kuis</a><a href="#/participant-ai-fundamentals">Kembali ke Modul <i class="fas fa-arrow-right"></i></a></footer>
                </section>
            </div>
            <aside class="lesson-right-panel">
                <section class="module-side-card lesson-progress-card"><h2>Ruang Diskusi</h2><p>Diskusi terbuka untuk peserta lain. Gunakan bahasa yang jelas, sopan, dan fokus pada analisis sistem.</p><a href="#/participant-ai-intro">Buka Materi</a></section>
            </aside>
        </div>
    </main>
</section>

````
