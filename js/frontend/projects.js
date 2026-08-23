/* ==========================================================================
   Projects Showcase (Exact Asset-Driven Reference Edition)
   HerAI Fellowship 2026 - Innovation Gallery
   ========================================================================== */

(function() {
    const DEFAULT_SHOWCASE_PROJECTS = [
        {
            project_id: "team_01",
            team_id: "team_01",
            team_name: "Tim NutriNova",
            project_title: "NutriCheck AI",
            tagline: "Analisis gizi instan dari foto makanan untuk hidup lebih sehat setiap hari.",
            track: "HealthTech",
            cover_url: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&q=80",
            problem: "Banyak masyarakat kesulitan menghitung kalori dan gizi harian secara akurat.",
            solution: "Model Vision AI yang mendeteksi jenis makanan dan menghitung estimasi makronutrisi dari 1 foto.",
            repo_url: "https://github.com/herai/team-01-nutricheck",
            demo_url: "https://nutricheck-herai.vercel.app",
            deck_url: "https://drive.google.com/file/d/sample1",
            tech_stack: "Python, PyTorch, YOLOv8, FastAPI, React",
            submitted_at: "2026-08-22T14:30:00Z",
            likes_count: 256
        },
        {
            project_id: "team_02",
            team_id: "team_02",
            team_name: "Tim Cerebrum",
            project_title: "KelasAI",
            tagline: "Asisten belajar personal yang membuat pembelajaran lebih adaptif dan menyenangkan.",
            track: "EduTech",
            cover_url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
            problem: "Kecepatan pemahaman setiap siswa berbeda-beda dalam kurikulum standar.",
            solution: "Tutor AI adaptif berbasis LLM yang menyesuaikan gaya penjelasan sesuai kecepatan siswa.",
            repo_url: "https://github.com/herai/team-02-kelasai",
            demo_url: "https://kelasai.vercel.app",
            deck_url: "https://drive.google.com/file/d/sample2",
            tech_stack: "Python, LangChain, OpenAI API, Streamlit, PostgreSQL",
            submitted_at: "2026-08-22T16:15:00Z",
            likes_count: 198
        },
        {
            project_id: "team_03",
            team_id: "team_03",
            team_name: "Tim EcoVision",
            project_title: "EcoTrack",
            tagline: "Platform AI untuk memantau dan mengoptimalkan jejak karbon secara real-time.",
            track: "GreenTech",
            cover_url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&q=80",
            problem: "Perusahaan kesulitan melacak emisi karbon scope 1-3 secara otomatis.",
            solution: "Ekstraksi data sensor IoT dan faktur logistik dengan prediktor emisi karbon berbasis machine learning.",
            repo_url: "https://github.com/herai/team-03-ecotrack",
            demo_url: "https://ecotrack.vercel.app",
            deck_url: "https://drive.google.com/file/d/sample3",
            tech_stack: "Python, Scikit-Learn, FastAPI, Next.js, Tailwind",
            submitted_at: "2026-08-22T17:45:00Z",
            likes_count: 312
        }
    ];

    const TAPE_ASSETS = [
        '/assets/herai_gallery_asset_pack/cropped_png/tapes_papers/26_tape_pink_dots_01.png',
        '/assets/herai_gallery_asset_pack/cropped_png/tapes_papers/30_tape_pink_texture.png',
        '/assets/herai_gallery_asset_pack/cropped_png/tapes_papers/27_tape_lavender_dots.png',
        '/assets/herai_gallery_asset_pack/cropped_png/tapes_papers/28_tape_pink_checkered.png',
        '/assets/herai_gallery_asset_pack/cropped_png/tapes_papers/29_tape_pink_dots_02.png',
        '/assets/herai_gallery_asset_pack/cropped_png/tapes_papers/37_tape_bottom_pink_pattern_01.png',
        '/assets/herai_gallery_asset_pack/cropped_png/tapes_papers/38_tape_bottom_pink_pattern_02.png',
        '/assets/herai_gallery_asset_pack/cropped_png/tapes_papers/39_tape_bottom_red_pink.png'
    ];

    const BADGE_ASSETS = [
        '/assets/herai_gallery_asset_pack/cropped_png/badges/75_number_01.png',
        '/assets/herai_gallery_asset_pack/cropped_png/badges/76_number_02.png',
        '/assets/herai_gallery_asset_pack/cropped_png/badges/77_number_03.png',
        '/assets/herai_gallery_asset_pack/cropped_png/badges/78_number_04.png',
        '/assets/herai_gallery_asset_pack/cropped_png/badges/79_number_05.png',
        '/assets/herai_gallery_asset_pack/cropped_png/badges/80_number_06.png',
        '/assets/herai_gallery_asset_pack/cropped_png/badges/81_number_07.png',
        '/assets/herai_gallery_asset_pack/cropped_png/badges/82_number_08.png',
        '/assets/herai_gallery_asset_pack/cropped_png/badges/83_number_09.png',
        '/assets/herai_gallery_asset_pack/cropped_png/badges/84_number_10.png'
    ];

    let cachedProjects = [...DEFAULT_SHOWCASE_PROJECTS];
    let currentFilter = 'Semua';
    let currentSort = 'newest';

    window.initProjectsPage = async function() {
        updateParticipantGreeting();
        updateTeamBadgeUI();
        initCountdown();
        bindFiltersAndSorting();
        bindWorkspaceNavigation();
        bindForm();
        bindModalEvents();
        await loadProjects();
    };

    function updateParticipantGreeting() {
        const session = getSession();
        const nameEl = document.querySelector('[data-fellow-name]');
        if (nameEl && session.name) {
            nameEl.textContent = session.name;
        }
    }

    const DEADLINE_MS = new Date('2026-08-23T23:00:00+07:00').getTime();
    let countdownInterval;

    function initCountdown() {
        const timerEl = document.getElementById('countdownTimer');
        const heroTimerEl = document.getElementById('heroCountdownTimer');
        const formBtn = document.querySelector('.btn-submit-large');
        if (!timerEl && !heroTimerEl) return;

        if (countdownInterval) clearInterval(countdownInterval);

        const updateTimer = () => {
            const now = Date.now();
            const diff = DEADLINE_MS - now;

            if (diff <= 0) {
                if (timerEl) timerEl.textContent = "WAKTU HABIS";
                if (heroTimerEl) heroTimerEl.textContent = "00d 00h 00m";

                if (formBtn) {
                    formBtn.disabled = true;
                    formBtn.innerHTML = '<i class="fas fa-lock"></i> Pengumpulan Ditutup';
                    formBtn.style.background = '#64748b';
                    formBtn.style.cursor = 'not-allowed';
                }

                document.querySelectorAll('#projectSubmitForm input, #projectSubmitForm textarea, .tech-pick-badge').forEach(el => {
                    el.disabled = true;
                    el.style.pointerEvents = 'none';
                    el.style.opacity = '0.7';
                });
                if (countdownInterval) clearInterval(countdownInterval);
                return;
            }

            const d = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
            const h = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
            const m = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');

            const timeStr = `${d}d ${h}h ${m}m`;
            if (timerEl) timerEl.textContent = timeStr;
            if (heroTimerEl) heroTimerEl.textContent = timeStr;
        };

        updateTimer();
        countdownInterval = setInterval(updateTimer, 1000);
    }

    function updateTeamBadgeUI() {
        const session = getSession();
        const teamName = session.profile?.team_name || "";
        const badge = document.getElementById('userTeamBadge');
        if (badge) {
            badge.textContent = teamName ? `${teamName}` : 'Personal Project';
        }
    }

    function getSession() {
        try {
            return JSON.parse(sessionStorage.getItem('heraiParticipantSession') || '{}');
        } catch {
            return {};
        }
    }

    async function loadProjects() {
        const gallery = document.getElementById('projectsGallery');
        if (!gallery) return;

        try {
            const session = getSession();
            const response = await fetch('/__gas', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({
                    action: 'getFinalProjects',
                    participantToken: session.token || ''
                })
            });
            const result = await response.json();
            if (result.status === 'success' && Array.isArray(result.data) && result.data.length > 0) {
                cachedProjects = result.data;
            } else {
                cachedProjects = [...DEFAULT_SHOWCASE_PROJECTS];
            }
        } catch (e) {
            cachedProjects = [...DEFAULT_SHOWCASE_PROJECTS];
        } finally {
            applyFiltersAndRender();
        }
    }

    function applyFiltersAndRender() {
        let list = [...cachedProjects];

        // 1. Category filter
        if (currentFilter && currentFilter !== 'Semua') {
            const term = currentFilter.toLowerCase().replace(/[^a-z0-9]/g, '');
            list = list.filter(p => {
                const combined = `${p.track || ''} ${p.project_title || p.title || ''} ${p.tagline || ''}`.toLowerCase().replace(/[^a-z0-9]/g, '');
                return combined.includes(term);
            });
        }

        // 2. Sorting
        if (currentSort === 'oldest') {
            list.sort((a, b) => new Date(a.submitted_at || a.created_at || 0) - new Date(b.submitted_at || b.created_at || 0));
        } else {
            list.sort((a, b) => new Date(b.submitted_at || b.created_at || 0) - new Date(a.submitted_at || a.created_at || 0));
        }

        renderTenProjectSlots(list);
    }

    function renderTenProjectSlots(submittedProjects) {
        const gallery = document.getElementById('projectsGallery');
        if (!gallery) return;

        let cardsHtml = '';

        // If filtering by specific category, show matching items or empty notification
        if (currentFilter !== 'Semua') {
            if (submittedProjects.length === 0) {
                gallery.innerHTML = `
                    <div style="grid-column: 1 / -1; background: #fff; border: 1.5px dashed #f9d6e4; border-radius: 20px; padding: 48px; text-align: center; box-shadow: 0 4px 16px rgba(0,0,0,0.02);">
                        <img src="/assets/herai_gallery_asset_pack/transparent_decorations_approx/flowers/23_small_flower_bottom.png" style="width: 36px; height: 36px; margin-bottom: 10px;" alt="">
                        <h3 style="font-size: 16px; font-weight: 800; color: #171827; margin: 0 0 6px 0;">Belum Ada Karya di Kategori ${escapeHtml(currentFilter)}</h3>
                        <p style="font-size: 13px; color: #64748b; margin: 0;">Pilih kategori lain atau kembali ke Semua Kategori.</p>
                    </div>
                `;
                return;
            }

            cardsHtml = submittedProjects.map((p, index) => {
                const seq = String(index + 1).padStart(2, '0');
                return renderSingleProjectCard(p, seq, index);
            }).join('');
            gallery.innerHTML = cardsHtml;
            return;
        }

        // Standard View: 10 exact slots (Large Responsive Cards)
        for (let i = 0; i < 10; i++) {
            const seq = String(i + 1).padStart(2, '0');
            const p = submittedProjects[i];

            if (p) {
                cardsHtml += renderSingleProjectCard(p, seq, i);
            } else {
                cardsHtml += renderReservedProjectCard(seq, i);
            }
        }

        gallery.innerHTML = cardsHtml;
    }

    function renderSingleProjectCard(p, seq, index) {
        const team = p.team_name || p.members || `Tim ${seq}`;
        const cover = p.cover_url || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80';
        const track = p.track || 'HealthTech';
        const likesCount = p.likes_count || (140 + (index * 19) % 180);
        const tagline = p.tagline || 'Solusi kecerdasan buatan untuk transformasi digital.';

        const tapeImg = TAPE_ASSETS[index % TAPE_ASSETS.length];
        const badgeImg = BADGE_ASSETS[index % BADGE_ASSETS.length];
        const initials = team.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'TM';

        // Optional corner flower on selected cards (reference shows flowers on several)
        const flowerCards = [0, 2, 4, 7, 9];
        const showFlower = flowerCards.includes(index);
        const flowerAssets = [
            '/assets/herai_gallery_asset_pack/transparent_decorations_approx/flowers/23_small_flower_bottom.png',
            '/assets/herai_gallery_asset_pack/transparent_decorations_approx/flowers/22_daisy_bottom.png'
        ];
        const flowerHtml = showFlower ? `<img src="${flowerAssets[index % flowerAssets.length]}" class="card-flower-accent" alt="">` : '';

        return `
            <article class="project-card" onclick="openShowcaseModalFromData('${index}')" tabindex="0" role="button" aria-label="Lihat detail ${escapeHtml(p.project_title || p.title || 'Proyek')}">
                <img src="${tapeImg}" class="card-washi-tape-img" alt="">
                <img src="${badgeImg}" class="card-number-badge-img" alt="${seq}">
                
                <div class="card-header-bar">
                    <span class="category-badge-chip"><i class="fas fa-sparkles" style="color: #ec1970;"></i> ${escapeHtml(track)}</span>
                </div>
                
                <div class="project-cover">
                    <img src="${escapeHtml(cover)}" alt="${escapeHtml(p.project_title || 'Cover Proyek')}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80'">
                </div>
                
                <div class="project-content">
                    <div class="project-title-row">
                        <h3>${escapeHtml(p.project_title || p.title || 'Untitled Project')}</h3>
                    </div>
                    <p class="project-description">${escapeHtml(tagline)}</p>
                    
                    <div class="project-footer">
                        <div class="maker-info">
                            <div class="maker-avatar-chip">${escapeHtml(initials)}</div>
                            <span>${escapeHtml(team)}</span>
                        </div>
                        <button type="button" class="btn-reaction-pill" onclick="event.stopPropagation(); window.triggerEmojiBurst(this, '${index}')">
                            <span>💖</span> <strong class="reaction-count">${likesCount}</strong>
                        </button>
                    </div>
                </div>
                ${flowerHtml}
            </article>
        `;
    }

    function renderReservedProjectCard(seq, index) {
        const tapeImg = TAPE_ASSETS[index % TAPE_ASSETS.length];
        const badgeImg = BADGE_ASSETS[index % BADGE_ASSETS.length];

        return `
            <article class="project-card reserved-slot-card" tabindex="0" role="button" aria-label="Slot Terpesan Tim ${seq}">
                <img src="${tapeImg}" class="card-washi-tape-img" alt="">
                <img src="${badgeImg}" class="card-number-badge-img" alt="${seq}">
                
                <div class="card-header-bar">
                    <span class="category-badge-chip reserved">Reserved</span>
                </div>
                
                <div class="project-cover reserved-frame">
                    <div class="reserved-frame-inner">
                        <i class="fas fa-image"></i>
                        <span>Waiting for an idea ✦</span>
                    </div>
                    <span class="reserved-sparkle-decor">✨</span>
                </div>
                
                <div class="project-content">
                    <div class="project-title-row">
                        <h3>Reserved for Team ${seq}</h3>
                    </div>
                    <p class="project-description">Proyek ini sedang dalam proses pengembangan oleh tim peserta.</p>
                    
                    <div class="project-footer">
                        <div class="maker-info">
                            <div class="maker-avatar-chip" style="background: #fce7f3; color: #db2777;">T${seq}</div>
                            <span>Team ${seq}</span>
                        </div>
                        <span class="btn-reaction-pill" style="opacity: 0.6; cursor: default;">
                            <span>♡</span> <strong>0</strong>
                        </span>
                    </div>
                </div>
            </article>
        `;
    }

    // Emoji Burst Effect
    window.triggerEmojiBurst = function(btnEl, index) {
        const countSpan = btnEl.querySelector('.reaction-count');
        if (countSpan) {
            let current = parseInt(countSpan.textContent, 10) || 0;
            countSpan.textContent = current + 1;
        }

        const rect = btnEl.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        const emojis = ['💖', '✨', '🌸', '🎉', '🚀', '⭐', '♡'];

        for (let i = 0; i < 6; i++) {
            const el = document.createElement('div');
            el.style.position = 'fixed';
            el.style.pointerEvents = 'none';
            el.style.zIndex = '10000';
            el.style.fontSize = '20px';
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            const dx = (Math.random() - 0.5) * 120;
            const dy = -(Math.random() * 70 + 30);

            el.style.left = `${startX}px`;
            el.style.top = `${startY}px`;
            el.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s';
            el.style.transform = 'translate(0, 0) scale(0.6)';
            el.style.opacity = '1';

            document.body.appendChild(el);
            
            requestAnimationFrame(() => {
                el.style.transform = `translate(${dx}px, ${dy}px) scale(1.2)`;
                el.style.opacity = '0';
            });

            setTimeout(() => el.remove(), 850);
        }
    };

    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/[&<>"'`=\/]/g, function (s) {
            return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','=':'&#x3D;','`':'&#x60;' })[s];
        });
    }

    function bindFiltersAndSorting() {
        const pills = document.querySelectorAll('.category-pills .pill');
        pills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                pills.forEach(p => p.classList.remove('active'));
                const target = e.currentTarget;
                target.classList.add('active');
                
                currentFilter = target.getAttribute('data-filter') || 'Semua';
                applyFiltersAndRender();
            });
        });

        const sortSelect = document.getElementById('selectProjectSort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                currentSort = e.target.value;
                applyFiltersAndRender();
            });
        }
    }

    function bindWorkspaceNavigation() {
        const btnBack = document.getElementById('btnBackToGallery');
        const gallery = document.getElementById('projectsGallery');
        const form = document.getElementById('projectSubmitForm');
        const filters = document.getElementById('showcaseFiltersContainer');
        const hero = document.querySelector('.showcase-hero-banner');
        const caption = document.querySelector('.gallery-bottom-caption');
        const btnNew = document.getElementById('btnSubmitEditProj');

        const showGalleryView = () => {
            if (form) {
                form.classList.remove('active');
                form.style.display = 'none';
            }
            if (gallery) gallery.style.display = 'grid';
            if (filters) filters.style.display = 'flex';
            if (hero) hero.style.display = 'grid';
            if (caption) caption.style.display = 'flex';
        };

        const showWorkspaceView = () => {
            if (gallery) gallery.style.display = 'none';
            if (filters) filters.style.display = 'none';
            if (hero) hero.style.display = 'none';
            if (caption) caption.style.display = 'none';
            if (form) {
                form.classList.add('active');
                form.style.display = 'block';
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });

            const session = getSession();
            const teamName = session.profile?.team_name || "";
            const teamId = teamName ? teamName.toLowerCase().replace(/[^a-z0-9]/g, "_") : `fp_${session.nik}`;
            const myProject = cachedProjects.find(p => p.project_id === teamId || p.team_id === teamId);
            
            if (myProject) {
                const titleEl = document.getElementById('projectTitle');
                if (titleEl) titleEl.value = myProject.project_title || myProject.title || '';
                
                const taglineEl = document.getElementById('projectTagline');
                if (taglineEl) taglineEl.value = myProject.tagline || '';
                
                const coverEl = document.getElementById('projectCover');
                if (coverEl) coverEl.value = myProject.cover_url || '';
                
                const preview = document.getElementById('projectCoverPreview');
                if (preview && myProject.cover_url) {
                    preview.style.display = 'block';
                    const img = preview.querySelector('img');
                    if (img) img.src = myProject.cover_url;
                }
                
                const problemEl = document.getElementById('projectProblem');
                if (problemEl) problemEl.value = myProject.problem || '';
                
                const solutionEl = document.getElementById('projectSolution');
                if (solutionEl) solutionEl.value = myProject.solution || '';
                
                const repoEl = document.getElementById('projectRepo');
                if (repoEl) repoEl.value = myProject.repo_url || '';
                
                const demoEl = document.getElementById('projectDemo');
                if (demoEl) demoEl.value = myProject.demo_url || '';
                
                const deckEl = document.getElementById('projectDeck');
                if (deckEl) deckEl.value = myProject.deck_url || '';
                
                const techEl = document.getElementById('projectTechStack');
                if (techEl) techEl.value = myProject.tech_stack || '';

                if (myProject.tech_stack) {
                    const stackList = myProject.tech_stack.split(',').map(s => s.trim());
                    document.querySelectorAll('.tech-pick-badge').forEach(badge => {
                        badge.classList.toggle('selected', stackList.includes(badge.dataset.tech));
                    });
                }
            }
        };

        if (btnBack) btnBack.addEventListener('click', showGalleryView);
        if (btnNew) btnNew.addEventListener('click', showWorkspaceView);
    }

    function bindForm() {
        const selectTrack = document.getElementById('projectTrack');
        const customTrack = document.getElementById('projectTrackCustom');
        if (selectTrack && customTrack) {
            selectTrack.addEventListener('change', (e) => {
                if (e.target.value === 'Lainnya') {
                    customTrack.style.display = 'block';
                    customTrack.focus();
                } else {
                    customTrack.style.display = 'none';
                }
            });
        }

        const coverInput = document.getElementById('projectCoverFile');
        const coverHidden = document.getElementById('projectCover');
        const coverPreview = document.getElementById('projectCoverPreview');

        if (coverInput) {
            coverInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                if (file.size > 2 * 1024 * 1024) {
                    alert('Ukuran gambar terlalu besar! Maksimal 2MB.');
                    coverInput.value = '';
                    return;
                }

                const reader = new FileReader();
                reader.onload = (ev) => {
                    if (coverHidden) coverHidden.value = ev.target.result;
                    if (coverPreview) {
                        coverPreview.style.display = 'block';
                        const img = coverPreview.querySelector('img');
                        if (img) img.src = ev.target.result;
                    }
                };
                reader.readAsDataURL(file);
            });
        }

        const techContainer = document.getElementById('techPickerContainer');
        if (techContainer) {
            techContainer.addEventListener('click', (e) => {
                const badge = e.target.closest('.tech-pick-badge');
                if (!badge) return;
                badge.classList.toggle('selected');
                syncTechStackBadgesToInput();
            });
        }

        function syncTechStackBadgesToInput() {
            const input = document.getElementById('projectTechStack');
            if (!input) return;
            const selectedBadges = Array.from(document.querySelectorAll('.tech-pick-badge.selected')).map(b => b.dataset.tech);
            const allKnownBadges = Array.from(document.querySelectorAll('.tech-pick-badge')).map(b => b.dataset.tech);
            
            let customTags = input.value.split(',').map(s => s.trim()).filter(s => s && !allKnownBadges.includes(s));
            input.value = [...selectedBadges, ...customTags].join(', ');
        }

        const formBtn = document.querySelector('.btn-submit-large');
        if (formBtn) {
            formBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                
                const session = getSession();
                const teamName = session.profile?.team_name || "";
                const teamId = teamName ? teamName.toLowerCase().replace(/[^a-z0-9]/g, "_") : `fp_${session.nik}`;
                
                if (!session.nik) {
                    alert('Sesi peserta tidak valid, silakan login ulang.');
                    return;
                }

                const titleVal = document.getElementById('projectTitle')?.value.trim();
                if (!titleVal) {
                    alert('Judul Proyek wajib diisi!');
                    document.getElementById('projectTitle')?.focus();
                    return;
                }

                const originalBtnHtml = formBtn.innerHTML;
                formBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Menyimpan ke Google Drive & Sheets...';
                formBtn.disabled = true;

                const payload = {
                    action: 'submitFinalProject',
                    participantToken: session.token,
                    nik: session.nik,
                    project_id: teamId,
                    team_id: teamId,
                    team_name: teamName || session.name || 'Peserta HerAI',
                    title: titleVal,
                    track: document.getElementById('projectTrack')?.value === 'Lainnya' 
                        ? (document.getElementById('projectTrackCustom')?.value.trim() || 'Lainnya') 
                        : (document.getElementById('projectTrack')?.value || 'HealthTech'),
                    tagline: document.getElementById('projectTagline')?.value.trim() || '',
                    cover_url: document.getElementById('projectCover')?.value || '',
                    problem: document.getElementById('projectProblem')?.value.trim() || '',
                    solution: document.getElementById('projectSolution')?.value.trim() || '',
                    repo_url: document.getElementById('projectRepo')?.value.trim() || '',
                    demo_url: document.getElementById('projectDemo')?.value.trim() || '',
                    deck_url: document.getElementById('projectDeck')?.value.trim() || '',
                    tech_stack: document.getElementById('projectTechStack')?.value.trim() || ''
                };

                try {
                    const response = await fetch('/__gas', {
                        method: 'POST',
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify(payload)
                    });
                    const result = await response.json();
                    
                    if (result.status === 'success') {
                        alert('Proyek tim berhasil disimpan dan dipublikasikan ke etalase Showcase!');
                        await loadProjects();
                        document.getElementById('btnBackToGallery')?.click();
                    } else {
                        alert(result.message || 'Gagal menyimpan proyek.');
                    }
                } catch (err) {
                    alert('Gagal mengirim data proyek. Periksa koneksi internet Anda.');
                } finally {
                    formBtn.innerHTML = originalBtnHtml;
                    formBtn.disabled = false;
                }
            });
        }
    }

    function bindModalEvents() {
        const overlay = document.getElementById('showcaseModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    window.closeShowcaseModal();
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay?.classList.contains('active')) {
                window.closeShowcaseModal();
            }
        });
    }

    window.openShowcaseModalFromData = function(indexStr) {
        const index = parseInt(indexStr, 10);
        const p = cachedProjects[index];
        if (!p) return;

        const techStack = p.tech_stack ? p.tech_stack.split(',').map(s => s.trim()).filter(Boolean) : ['Python', 'FastAPI', 'PyTorch', 'React'];
        const cover = p.cover_url || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80';

        const titleEl = document.getElementById('modalTitle');
        if (titleEl) titleEl.textContent = p.project_title || p.title || 'Untitled Project';

        const taglineEl = document.getElementById('modalTagline');
        if (taglineEl) taglineEl.textContent = p.tagline || 'Solusi kecerdasan buatan dari HerAI Fellowship.';

        const coverImgEl = document.getElementById('modalCoverImg');
        if (coverImgEl) coverImgEl.src = cover;
        
        const trackBadge = document.getElementById('modalTrackBadge');
        if (trackBadge) trackBadge.textContent = p.track || 'AI Solution';
        
        const teamName = document.getElementById('modalTeamName');
        const teamAvatar = document.getElementById('modalTeamAvatar');
        const tName = p.team_name || p.members || 'Peserta HerAI';
        if (teamName) teamName.textContent = tName;
        if (teamAvatar) teamAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tName)}&background=ec1970&color=fff&size=64`;
        
        const stackContainer = document.getElementById('modalTechStack');
        if (stackContainer) {
            stackContainer.innerHTML = techStack.map(t => `<span class="category-badge-chip">${escapeHtml(t)}</span>`).join('');
        }
        
        const problemEl = document.getElementById('modalProblem');
        if (problemEl) problemEl.textContent = p.problem || 'Belum ada penjelasan latar belakang masalah.';
        
        const solutionEl = document.getElementById('modalSolution');
        if (solutionEl) solutionEl.textContent = p.solution || 'Belum ada penjelasan detail solusi & arsitektur AI.';

        const btnDemo = document.getElementById('modalBtnDemo');
        if (btnDemo) {
            btnDemo.href = p.demo_url || '#';
            btnDemo.style.display = p.demo_url ? 'inline-flex' : 'none';
        }

        const btnRepo = document.getElementById('modalBtnRepo');
        if (btnRepo) {
            btnRepo.href = p.repo_url || '#';
            btnRepo.style.display = p.repo_url ? 'inline-flex' : 'none';
        }

        const btnDeck = document.getElementById('modalBtnDeck');
        if (btnDeck) {
            btnDeck.href = p.deck_url || '#';
            btnDeck.style.display = p.deck_url ? 'inline-flex' : 'none';
        }

        const modal = document.getElementById('showcaseModalOverlay');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeShowcaseModal = function() {
        const modal = document.getElementById('showcaseModalOverlay');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };
})();
