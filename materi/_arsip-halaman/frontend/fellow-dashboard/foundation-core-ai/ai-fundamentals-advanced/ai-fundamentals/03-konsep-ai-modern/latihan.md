# Desain Sistem AI Modern

> Sumber: `pages/frontend/fellow-dashboard/foundation-core-ai/ai-fundamentals-advanced/ai-fundamentals/03-konsep-ai-modern/latihan.html`
> Jenis: konversi halaman sumber + lampiran HTML asli lengkap.
> Bagian pertama nyaman dibaca; lampiran mempertahankan setiap byte sumber tekstual tanpa potongan.

Practice Lab

#### Desain Sistem AI Modern

Kerjakan satu skenario pada satu waktu. Progres dan jawaban dapat disimpan di browser ini.

0/13 latihan terisi

##### Simpan Latihan

Jawaban akan tersimpan di browsermu.

** Simpan Jawaban

** Edit

** Hapus

## Lampiran Sumber HTML Lengkap

````html
<section class="fellow-dashboard fellow-modules-page lesson-detail-page reasoning-scaffold-page ai-modern-page ai-modern-practice-page" data-fellow-page="modules">
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
        <nav class="fellow-menu secondary">
            <a href="#/participant-certificates" data-fellow-nav="certificates"><i class="fas fa-certificate"></i><span>Sertifikat</span></a>
            <a href="#/participant-leaderboard" data-fellow-nav="leaderboard"><i class="fas fa-ranking-star"></i><span>Leaderboard</span></a>
            <a href="#/participant-help" data-fellow-nav="faq"><i class="far fa-circle-question"></i><span>FAQ & Bantuan</span></a>
            <a href="#/participant-settings" data-fellow-nav="settings"><i class="fas fa-gear"></i><span>Pengaturan</span></a>
        </nav>
    </aside>

    <main class="fellow-main">
        <header class="lesson-topbar">
            <nav class="lesson-breadcrumb" aria-label="Breadcrumb materi">
                <a href="#/participant-ai-modern"><i class="fas fa-arrow-left"></i><span>Konsep AI Modern</span></a>
                <span class="lesson-breadcrumb-separator"><i class="fas fa-arrow-right"></i></span>
                <span>Latihan</span>
            </nav>
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
                        <h1>Latihan Konsep AI Modern</h1>
                        <p>Rancang keputusan model, Transformer, agent, RAG, deployment, dan production-readiness tanpa membutuhkan API key.</p>
                        <div class="lesson-meta-row"><span><i class="far fa-clock"></i> 50 menit</span><span><i class="fas fa-list-check"></i> 12 latihan + capstone</span><b>Studi Kasus</b></div>
                    </div>
                    <img src="/assets/messaging/herai-chat-persona.png" alt="HerAI fellow latihan Konsep AI Modern">
                </section>

                <section class="lesson-material-panel">
                    <div class="lesson-tabs" role="tablist" aria-label="Jenis materi">
                        <a href="#/participant-ai-modern"><i class="fas fa-book-open"></i> Materi</a>
                        <a href="#/participant-ai-modern-practice" class="active"><i class="fas fa-pen-to-square"></i> Latihan</a>
                        <a href="#/participant-ai-modern-quiz"><i class="far fa-clipboard"></i> Kuis</a>
                        <a href="#/participant-ai-modern-discussion"><i class="far fa-message"></i> Diskusi</a>
                    </div>

                    <article class="lesson-article">
                        <div class="ml-section-head">
                            <span>Practice Lab</span>
                            <h2>Desain Sistem AI Modern</h2>
                            <p>Kerjakan satu skenario pada satu waktu. Progres dan jawaban dapat disimpan di browser ini.</p>
                        </div>

                        <form id="aiModernPracticeForm" class="practice-response-form ml-practice-form">
                            <div class="ai-modern-practice-progress" id="aiModernPracticeCounter">0/13 latihan terisi</div>
                            <div id="aiModernPracticeApp"></div>

                            <div class="ml-save-panel">
                                <div>
                                    <h3>Simpan Latihan</h3>
                                    <p id="aiModernPracticeStatus" class="practice-status" aria-live="polite">Jawaban akan tersimpan di browsermu.</p>
                                </div>
                                <div class="practice-action-row">
                                    <button type="button" data-practice-save><i class="fas fa-floppy-disk"></i> Simpan Jawaban</button>
                                    <button type="button" data-practice-edit><i class="fas fa-pen"></i> Edit</button>
                                    <button type="button" data-practice-delete><i class="far fa-trash-can"></i> Hapus</button>
                                </div>
                            </div>
                        </form>
                    </article>

                    <footer class="lesson-nav-footer">
                        <a href="#/participant-ai-modern"><i class="fas fa-chevron-left"></i> Kembali ke Materi</a>
                        <a href="#/participant-ai-modern-quiz">Lanjut Kuis <i class="fas fa-arrow-right"></i></a>
                    </footer>
                </section>
            </div>

            <aside class="lesson-right-panel">
                <section class="module-side-card lesson-progress-card">
                    <h2>Progres Modul</h2>
                    <div class="lesson-progress-mini"><b style="--value:50%"></b><strong>50%</strong></div>
                    <p>Latihan mengubah konsep AI modern menjadi rancangan sistem nyata.</p>
                    <a href="#/participant-ai-modern-quiz">Buka Kuis</a>
                </section>
                <section class="module-side-card lesson-list-card">
                    <h2>Flow Belajar</h2>
                    <ol>
                        <li class="completed"><span>1</span><a href="#/participant-ai-modern">Materi</a><i class="fas fa-circle-check"></i></li>
                        <li class="active"><span>2</span><a href="#/participant-ai-modern-practice">Latihan</a><i class="far fa-circle-play"></i></li>
                        <li><span>3</span><a href="#/participant-ai-modern-quiz">Kuis</a><i class="far fa-circle"></i></li>
                        <li><span>4</span><a href="#/participant-ai-modern-discussion">Diskusi</a><i class="far fa-circle"></i></li>
                    </ol>
                </section>
            </aside>
        </div>
    </main>
</section>

````
