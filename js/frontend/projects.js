/* ==========================================================================
   Projects Showcase (Exact Asset-Driven Reference Edition)
   HerAI Fellowship 2026 - Innovation Gallery
   ========================================================================== */

(function() {
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

    let cachedProjects = [];
    let currentFilter = 'Semua';
    let currentSort = 'newest';
    const SHOWCASE_SUBMIT_TIMEOUT_MS = 120000;
    let showcaseSubmitUrlPromise;
    const PROJECT_TEXT_FIELDS = [
        'project_id', 'team_id', 'team_name', 'title', 'members', 'institution',
        'track', 'project_title', 'mentor', 'deck_url', 'repo_url', 'demo_url',
        'overview', 'details', 'status', 'notes', 'submitted_at', 'created_at',
        'tagline', 'cover_url', 'tech_stack', 'problem', 'solution',
        'deck_file_data', 'deck_file_name'
    ];

    function normalizeProjectRecord(project) {
        if (!project || typeof project !== 'object') return null;
        const normalized = { ...project };
        PROJECT_TEXT_FIELDS.forEach((field) => {
            const value = normalized[field];
            normalized[field] = Array.isArray(value)
                ? value.join('\n')
                : value === undefined || value === null
                    ? ''
                    : String(value);
        });
        return normalized;
    }

    async function getShowcaseSubmitUrl() {
        if (!showcaseSubmitUrlPromise) {
            showcaseSubmitUrlPromise = (async () => {
                const response = await fetch('/__gas', {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' }
                });
                const result = await response.json();
                const gasUrl = String(result?.url || '');
                if (!response.ok || result?.status !== 'success' || !gasUrl.startsWith('https://script.google.com/macros/s/')) {
                    throw new Error('Jalur upload langsung tidak tersedia. Silakan muat ulang lalu coba lagi.');
                }
                return gasUrl;
            })().catch((error) => {
                showcaseSubmitUrlPromise = null;
                throw error;
            });
        }
        return showcaseSubmitUrlPromise;
    }

    async function confirmShowcaseSubmission(payload) {
        for (let attempt = 0; attempt < 3; attempt += 1) {
            if (attempt > 0) {
                await new Promise(resolve => setTimeout(resolve, 1500));
            }

            let timeoutId;
            try {
                const controller = new AbortController();
                timeoutId = setTimeout(() => controller.abort(), 15000);
                const response = await fetch('/__gas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify({ action: 'getFinalProjects' }),
                    signal: controller.signal
                });

                const result = await response.json();
                if (!response.ok || result?.status !== 'success' || !Array.isArray(result.data)) continue;

                const confirmed = result.data.find((project) => {
                    const sameTeam = project?.project_id === payload.project_id || project?.team_id === payload.team_id;
                    return sameTeam && project?.submitted_at === payload.submitted_at;
                });
                if (confirmed) return confirmed;
            } catch (error) {
                console.warn('Showcase submission read-back failed:', error);
            } finally {
                clearTimeout(timeoutId);
            }
        }

        return null;
    }

    function isValidProject(p) {
        if (!p) return false;
        const title = String(p.project_title || p.title || '').trim().toUpperCase();
        if (!title) return false;
        if (title === 'MBG' || title.includes('MBG')) return false;
        return true;
    }

    function getSavedProjectsFromStorage() {
        try {
            const raw = localStorage.getItem('herai_submitted_projects');
            if (!raw) return [];
            const list = JSON.parse(raw);
            return Array.isArray(list) ? list.map(normalizeProjectRecord).filter(isValidProject) : [];
        } catch {
            return [];
        }
    }

    function getDraftStorageKey() {
        const session = getSession();
        const nik = session.nik || session.participant_nik || session.username || 'current';
        return `herai_project_form_draft_${nik}`;
    }

    function saveDraftToStorage() {
        try {
            const draft = {
                title: document.getElementById('projectTitle')?.value || '',
                track: document.getElementById('projectTrack')?.value || '',
                trackCustom: document.getElementById('projectTrackCustom')?.value || '',
                tagline: document.getElementById('projectTagline')?.value || '',
                cover: document.getElementById('projectCover')?.value || '',
                problem: document.getElementById('projectProblem')?.value || '',
                solution: document.getElementById('projectSolution')?.value || '',
                demo: document.getElementById('projectDemo')?.value || '',
                repo: document.getElementById('projectRepo')?.value || '',
                deck_file_data: document.getElementById('projectDeckFileData')?.value || '',
                deck_file_name: document.getElementById('projectDeckFileName')?.value || '',
                tech_stack: document.getElementById('projectTechStack')?.value || '',
                savedAt: Date.now()
            };
            localStorage.setItem(getDraftStorageKey(), JSON.stringify(draft));
        } catch (e) {
            console.warn('Draft save notice:', e);
        }
    }

    function restoreDraftFromStorage(myProject) {
        try {
            const raw = localStorage.getItem(getDraftStorageKey());
            if (!raw) return;
            const draft = JSON.parse(raw);
            if (!draft) return;

            const myProjectDate = myProject && (myProject.submitted_at || myProject.created_at)
                ? new Date(myProject.submitted_at || myProject.created_at).getTime()
                : 0;
            const isDraftNewer = !myProject || (draft.savedAt && draft.savedAt > myProjectDate);

            const titleEl = document.getElementById('projectTitle');
            if (titleEl && (!titleEl.value || isDraftNewer) && draft.title) titleEl.value = draft.title;

            const trackEl = document.getElementById('projectTrack');
            if (trackEl && (!trackEl.value || isDraftNewer) && draft.track) {
                trackEl.value = draft.track;
                if (draft.track === 'Lainnya') {
                    const customEl = document.getElementById('projectTrackCustom');
                    if (customEl) {
                        customEl.value = draft.trackCustom || '';
                        customEl.style.display = 'block';
                    }
                }
            }

            const taglineEl = document.getElementById('projectTagline');
            if (taglineEl && (!taglineEl.value || isDraftNewer) && draft.tagline) taglineEl.value = draft.tagline;

            const problemEl = document.getElementById('projectProblem');
            if (problemEl && (!problemEl.value || isDraftNewer) && draft.problem) problemEl.value = draft.problem;

            const solutionEl = document.getElementById('projectSolution');
            if (solutionEl && (!solutionEl.value || isDraftNewer) && draft.solution) solutionEl.value = draft.solution;

            const demoEl = document.getElementById('projectDemo');
            if (demoEl && (!demoEl.value || isDraftNewer) && draft.demo) demoEl.value = draft.demo;

            const repoEl = document.getElementById('projectRepo');
            if (repoEl && (!repoEl.value || isDraftNewer) && draft.repo) repoEl.value = draft.repo;

            const techEl = document.getElementById('projectTechStack');
            if (techEl && (!techEl.value || isDraftNewer) && draft.tech_stack) {
                techEl.value = draft.tech_stack;
                const stackList = draft.tech_stack.split(',').map(s => s.trim());
                document.querySelectorAll('.tech-pick-badge').forEach(badge => {
                    badge.classList.toggle('selected', stackList.includes(badge.dataset.tech));
                });
            }

            if (draft.deck_file_data || draft.deck_file_name) {
                const deckCard = document.getElementById('deckFileAttachedCard');
                const deckDropzone = document.getElementById('deckDropzone');
                const deckDataHidden = document.getElementById('projectDeckFileData');
                const deckNameHidden = document.getElementById('projectDeckFileName');
                const deckFileNameText = document.getElementById('deckFileNameText');
                if (deckDataHidden && (!deckDataHidden.value || isDraftNewer)) deckDataHidden.value = draft.deck_file_data || 'attached';
                if (deckNameHidden && (!deckNameHidden.value || isDraftNewer)) deckNameHidden.value = draft.deck_file_name || 'Pitch-Deck.pdf';
                if (deckFileNameText && (!deckFileNameText.textContent || isDraftNewer)) deckFileNameText.textContent = draft.deck_file_name || 'Pitch-Deck.pdf';
                if (deckCard) deckCard.style.display = 'flex';
                if (deckDropzone) deckDropzone.style.display = 'none';
            }
        } catch (e) {
            console.warn('Draft restore notice:', e);
        }
    }

    function clearDraftFromStorage() {
        try {
            localStorage.removeItem(getDraftStorageKey());
        } catch {}
    }

    window.initProjectsPage = async function() {
        updateParticipantGreeting();
        updateTeamBadgeUI();
        initCountdown();
        bindFiltersAndSorting();
        bindWorkspaceNavigation();
        bindForm();
        bindModalEvents();
        bindGuideEvents();
        
        // Fast instant render from local cache if available (0ms loading!)
        const localProjects = getSavedProjectsFromStorage();
        if (localProjects.length > 0) {
            cachedProjects = localProjects;
            applyFiltersAndRender();
        } else {
            renderSkeletonCards();
        }
        
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
        const formBtn = document.getElementById('btnSubmitFinalProject');
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
        const teamName = session.profile?.team_name || session.team_name || session.name || "TEAM 10";
        const avatarMini = document.getElementById('userTeamAvatarMini');
        const nameText = document.getElementById('userTeamNameText');
        if (avatarMini) {
            const initials = teamName.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase() || 'TM';
            avatarMini.textContent = initials;
        }
        if (nameText) {
            nameText.textContent = teamName;
        }
    }

    function getSession() {
        try {
            const s1 = JSON.parse(sessionStorage.getItem('heraiParticipantSession') || 'null');
            if (s1 && (s1.nik || s1.participant_nik || s1.token || s1.name)) return s1;
            const s2 = JSON.parse(localStorage.getItem('heraiParticipantSession') || 'null');
            if (s2 && (s2.nik || s2.participant_nik || s2.token || s2.name)) return s2;
        } catch {}
        return {};
    }

    function safeSaveProjectsToStorage(projectsList) {
        try {
            localStorage.setItem('herai_submitted_projects', JSON.stringify(projectsList));
        } catch (e) {
            console.warn('Optimizing localStorage payload for large attachments...', e);
            try {
                const sanitized = projectsList.map(item => {
                    const copy = { ...item };
                    if (copy.deck_file_data && copy.deck_file_data.length > 500000) {
                        copy.deck_file_data = copy.deck_file_data.slice(0, 100) + '...[attached]';
                    }
                    if (copy.cover_url && copy.cover_url.length > 500000) {
                        copy.cover_url = copy.cover_url.slice(0, 100) + '...[attached]';
                    }
                    return copy;
                });
                localStorage.setItem('herai_submitted_projects', JSON.stringify(sanitized));
            } catch (err2) {
                console.error('LocalStorage write failed:', err2);
            }
        }
    }

    /* --- TOAST NOTIFICATION HELPER --- */
    function showShowcaseToast(message, type = 'success') {
        const container = document.getElementById('showcaseToastContainer') || document.body;
        const toast = document.createElement('div');
        toast.className = `showcase-toast ${type}`;
        const iconMap = {
            success: 'fa-circle-check',
            error: 'fa-circle-exclamation',
            info: 'fa-circle-info'
        };
        const icon = iconMap[type] || 'fa-circle-check';
        toast.innerHTML = `<i class="fas ${icon}"></i> <span>${escapeHtml(message)}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
    window.showShowcaseToast = showShowcaseToast;

    /* --- CUSTOM CONFIRMATION MODAL HELPER --- */
    let pendingConfirmCallback = null;
    function showShowcaseConfirm(title, message, onConfirm) {
        const overlay = document.getElementById('showcaseConfirmModalOverlay');
        const titleEl = document.getElementById('confirmModalTitle');
        const msgEl = document.getElementById('confirmModalMsg');
        const proceedBtn = document.getElementById('btnConfirmProceed');
        
        if (titleEl) titleEl.textContent = title;
        if (msgEl) msgEl.textContent = message;
        pendingConfirmCallback = onConfirm;
        
        if (proceedBtn) {
            proceedBtn.onclick = () => {
                closeShowcaseConfirm();
                if (typeof pendingConfirmCallback === 'function') {
                    pendingConfirmCallback();
                    pendingConfirmCallback = null;
                }
            };
        }
        
        if (overlay) overlay.classList.add('active');
    }
    function closeShowcaseConfirm() {
        const overlay = document.getElementById('showcaseConfirmModalOverlay');
        if (overlay) overlay.classList.remove('active');
    }
    window.showShowcaseConfirm = showShowcaseConfirm;
    window.closeShowcaseConfirm = closeShowcaseConfirm;

    /* --- SKELETON LOADING SHIMMER --- */
    function renderSkeletonCards() {
        const gallery = document.getElementById('projectsGallery');
        if (!gallery) return;
        let skeletonHtml = '';
        for (let i = 0; i < 10; i++) {
            skeletonHtml += `
                <article class="project-card skeleton-card">
                    <div class="skeleton-tape skeleton-shimmer"></div>
                    <div class="skeleton-badge skeleton-shimmer"></div>
                    <div class="skeleton-img-box skeleton-shimmer"></div>
                    <div class="skeleton-title-box skeleton-shimmer"></div>
                    <div class="skeleton-desc-box skeleton-shimmer"></div>
                    <div class="skeleton-desc-box short skeleton-shimmer"></div>
                    <div class="skeleton-footer-box">
                        <div class="skeleton-avatar-chip skeleton-shimmer"></div>
                        <div class="skeleton-name-box skeleton-shimmer"></div>
                        <div class="skeleton-like-box skeleton-shimmer"></div>
                    </div>
                </article>
            `;
        }
        gallery.innerHTML = skeletonHtml;
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
            if (result && result.status === 'success' && Array.isArray(result.data)) {
                const remoteList = result.data.map(normalizeProjectRecord).filter(isValidProject);
                // A successful server read is authoritative. This also removes
                // legacy local-only entries created by the old silent fallback.
                cachedProjects = remoteList;
                safeSaveProjectsToStorage(cachedProjects);
            } else {
                throw new Error(result?.message || 'Respons sinkronisasi proyek tidak valid.');
            }
        } catch (e) {
            cachedProjects = getSavedProjectsFromStorage();
            showShowcaseToast('Sinkronisasi database gagal. Menampilkan cache terakhir; coba muat ulang halaman.', 'error');
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

        renderSubmittedProjectCards(list);
    }

    function renderSubmittedProjectCards(submittedProjects) {
        const gallery = document.getElementById('projectsGallery');
        if (!gallery) return;

        // If there are no submitted projects
        if (!submittedProjects || submittedProjects.length === 0) {
            if (currentFilter && currentFilter !== 'Semua') {
                gallery.innerHTML = `
                    <div class="gallery-empty-scrapbook">
                        <div class="empty-sparkle-icon"><i class="fas fa-filter"></i></div>
                        <h3>Belum Ada Project di Kategori ${escapeHtml(currentFilter)}</h3>
                        <p>Pilih kategori lain atau kembali ke Semua Kategori untuk melihat seluruh inovasi.</p>
                    </div>
                `;
            } else {
                gallery.innerHTML = `
                    <div class="gallery-empty-scrapbook">
                        <div class="empty-sparkle-icon"><i class="fas fa-folder-open"></i></div>
                        <h3>Belum Ada Project yang Dipublikasikan</h3>
                        <p>Jadilah tim pertama yang memamerkan inovasi kecerdasan buatan tim Anda di etalase ini.</p>
                        <button class="btn-empty-submit" onclick="document.getElementById('btnSubmitEditProj')?.click()" type="button">
                            <i class="fas fa-plus"></i> Submit Project Tim
                        </button>
                    </div>
                `;
            }
            return;
        }

        // Render ONLY the actual submitted projects
        const cardsHtml = submittedProjects.map((p, index) => {
            const seq = String(index + 1).padStart(2, '0');
            return renderSingleProjectCard(p, seq, index);
        }).join('');

        gallery.innerHTML = cardsHtml;
    }

    function getCategoryIconHtml(track) {
        const cat = (track || '').toLowerCase();
        if (cat.includes('health')) return '<i class="fas fa-heart-pulse" style="color: #ec1970;"></i>';
        if (cat.includes('edu')) return '<i class="fas fa-graduation-cap" style="color: #ec1970;"></i>';
        if (cat.includes('green')) return '<i class="fas fa-leaf" style="color: #10b981;"></i>';
        if (cat.includes('fin')) return '<i class="fas fa-coins" style="color: #f59e0b;"></i>';
        if (cat.includes('product')) return '<i class="fas fa-bolt" style="color: #6366f1;"></i>';
        if (cat.includes('creat')) return '<i class="fas fa-palette" style="color: #ec4899;"></i>';
        if (cat.includes('social')) return '<i class="fas fa-hand-holding-heart" style="color: #ef4444;"></i>';
        return '<i class="fas fa-sparkles" style="color: #ec1970;"></i>';
    }

    function renderSingleProjectCard(p, seq, index) {
        const team = p.team_name || p.members || `Tim ${seq}`;
        const coverRaw = (p.cover_url || '').trim();
        const hasCover = coverRaw && !coverRaw.includes('photo-1550751827-4bd374c3f58b');
        const track = p.track || 'AI Solution';
        const likesCount = (p.likes_count !== undefined && p.likes_count !== null && !isNaN(Number(p.likes_count))) ? Number(p.likes_count) : 0;
        const tagline = p.tagline || 'Solusi inovasi kecerdasan buatan untuk transformasi digital.';

        const tapeImg = TAPE_ASSETS[index % TAPE_ASSETS.length];
        const initials = team.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'TM';
        const iconHtml = getCategoryIconHtml(track);
        const projectIdSafe = escapeHtml(p.project_id || p.team_id || String(index));
        const trackSlug = escapeHtml((track || 'ai').toLowerCase().replace(/[^a-z0-9]/g, ''));

        const coverBlock = hasCover ? `
            <div class="project-cover">
                <img src="${escapeHtml(coverRaw)}" alt="${escapeHtml(p.project_title || p.title || 'Cover Project')}" loading="lazy">
            </div>
        ` : `
            <div class="project-cover scrapbook-placeholder-frame track-${trackSlug}">
                <div class="placeholder-pattern-bg"></div>
                <div class="placeholder-content-center">
                    <div class="placeholder-icon-halo">
                        ${iconHtml}
                    </div>
                    <span class="placeholder-track-tag">${escapeHtml(track)} Showcase</span>
                </div>
                <div class="placeholder-sparkle-decor"><i class="fas fa-sparkles"></i></div>
            </div>
        `;

        return `
            <article class="project-card ${hasCover ? 'has-cover' : 'has-placeholder'}" onclick="openShowcaseModalFromData('${projectIdSafe}')" tabindex="0" role="button" aria-label="Lihat detail ${escapeHtml(p.project_title || p.title || 'Project')}">
                <img src="${tapeImg}" class="card-washi-tape-img" alt="" aria-hidden="true">
                
                <div class="card-header-bar">
                    <span class="category-badge-chip">${iconHtml} <span>${escapeHtml(track)}</span></span>
                </div>
                
                ${coverBlock}
                
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
                        <button type="button" class="btn-reaction-pill" onclick="event.stopPropagation(); window.triggerEmojiBurst(this, '${index}')" aria-label="Sukai project">
                            <i class="fas fa-heart like-heart-icon"></i> <strong class="reaction-count">${likesCount}</strong>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    // Interactive Modal Likes
    window.triggerModalLike = function(btnEl) {
        const countSpan = btnEl.querySelector('#modalLikesCount');
        if (countSpan) {
            let current = parseInt(countSpan.textContent, 10) || 0;
            const updated = current + 1;
            countSpan.textContent = updated;

            const titleEl = document.getElementById('modalTitle');
            const currentTitle = titleEl ? titleEl.textContent : '';
            const p = cachedProjects.find(item => (item.project_title || item.title) === currentTitle);
            if (p) {
                p.likes_count = updated;
                localStorage.setItem('herai_submitted_projects', JSON.stringify(cachedProjects));
                
                // Optimistically update cards in background gallery
                const allCards = document.querySelectorAll('.project-card');
                allCards.forEach(card => {
                    const cardTitle = card.querySelector('.project-title-row h3')?.textContent;
                    if (cardTitle === currentTitle) {
                        const countEl = card.querySelector('.reaction-count');
                        if (countEl) countEl.textContent = updated;
                    }
                });
            }

            btnEl.classList.add('heart-burst-active');
            setTimeout(() => btnEl.classList.remove('heart-burst-active'), 400);

            // Trigger emoji burst from like button
            window.triggerEmojiBurst(btnEl);
        }
    };

    // Emoji Burst Effect
    window.triggerEmojiBurst = function(btnEl, index) {
        const countSpan = btnEl.querySelector('.reaction-count');
        if (countSpan && index !== undefined) {
            let current = parseInt(countSpan.textContent, 10) || 0;
            const updated = current + 1;
            countSpan.textContent = updated;
            
            const card = btnEl.closest('.project-card');
            const cardTitle = card?.querySelector('.project-title-row h3')?.textContent;
            const p = cachedProjects.find(item => (item.project_title || item.title) === cardTitle);
            if (p) {
                p.likes_count = updated;
                localStorage.setItem('herai_submitted_projects', JSON.stringify(cachedProjects));
            }
        }

        const rect = btnEl.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        const emojis = ['💖', '✨', '🌸', '🎉', '⭐', '♡'];

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
        const btnNew = document.getElementById('btnSubmitEditProj');

        const showGalleryView = () => {
            if (form) {
                form.classList.remove('active');
                form.style.display = 'none';
            }
            if (gallery) gallery.style.display = 'grid';
            if (filters) filters.style.display = 'flex';
            if (hero) hero.style.display = 'grid';
        };

        const showWorkspaceView = () => {
            if (gallery) gallery.style.display = 'none';
            if (filters) filters.style.display = 'none';
            if (hero) hero.style.display = 'none';
            if (form) {
                form.classList.add('active');
                form.style.display = 'block';
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });

            const session = getSession();
            const teamName = session.profile?.team_name || session.team_name || session.name || "TEAM 10";
            const teamId = teamName ? teamName.toLowerCase().replace(/[^a-z0-9]/g, "_") : `fp_${session.nik}`;
            const myProject = cachedProjects.find(p => p.project_id === teamId || p.team_id === teamId || (session.nik && p.project_id && p.project_id.includes(session.nik)));
            
            // Set Workspace Team Badge
            const avatarMini = document.getElementById('userTeamAvatarMini');
            const nameText = document.getElementById('userTeamNameText');
            if (avatarMini) {
                const initials = teamName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'TM';
                avatarMini.textContent = initials;
            }
            if (nameText) {
                nameText.textContent = teamName;
            }

            const deleteBtn = document.getElementById('btnDeleteSubmissionWorkspace');
            if (myProject) {
                if (deleteBtn) {
                    deleteBtn.style.display = 'inline-flex';
                    deleteBtn.onclick = () => deleteProject(myProject.project_id || myProject.team_id);
                }

                const titleEl = document.getElementById('projectTitle');
                if (titleEl) titleEl.value = myProject.project_title || myProject.title || '';
                
                const trackEl = document.getElementById('projectTrack');
                if (trackEl && myProject.track) {
                    const foundOption = Array.from(trackEl.options).some(o => o.value === myProject.track);
                    if (foundOption) {
                        trackEl.value = myProject.track;
                    } else {
                        trackEl.value = 'Lainnya';
                        const customEl = document.getElementById('projectTrackCustom');
                        if (customEl) {
                            customEl.value = myProject.track;
                            customEl.style.display = 'block';
                        }
                    }
                }

                const taglineEl = document.getElementById('projectTagline');
                if (taglineEl) taglineEl.value = myProject.tagline || '';
                
                const coverEl = document.getElementById('projectCover');
                if (coverEl) coverEl.value = myProject.cover_url || '';
                
                const preview = document.getElementById('projectCoverPreview');
                const previewImg = document.getElementById('previewImgElement');
                if (preview && myProject.cover_url) {
                    preview.style.display = 'block';
                    if (previewImg) previewImg.src = myProject.cover_url;
                }
                
                const problemEl = document.getElementById('projectProblem');
                if (problemEl) problemEl.value = myProject.problem || '';
                
                const solutionEl = document.getElementById('projectSolution');
                if (solutionEl) solutionEl.value = myProject.solution || '';
                
                const repoEl = document.getElementById('projectRepo');
                if (repoEl) repoEl.value = myProject.repo_url || '';
                
                const demoEl = document.getElementById('projectDemo');
                if (demoEl) demoEl.value = myProject.demo_url || '';

                // Pitch Deck File Pre-fill
                const deckCard = document.getElementById('deckFileAttachedCard');
                const deckDropzone = document.getElementById('deckDropzone');
                const deckDataHidden = document.getElementById('projectDeckFileData');
                const deckNameHidden = document.getElementById('projectDeckFileName');
                const deckFileNameText = document.getElementById('deckFileNameText');
                
                if (myProject.deck_file_data || myProject.deck_file_name || myProject.deck_url) {
                    if (deckDataHidden) deckDataHidden.value = myProject.deck_file_data || myProject.deck_url || 'attached';
                    if (deckNameHidden) deckNameHidden.value = myProject.deck_file_name || 'Pitch-Deck.pdf';
                    if (deckFileNameText) deckFileNameText.textContent = myProject.deck_file_name || 'Pitch-Deck.pdf';
                    if (deckCard) deckCard.style.display = 'flex';
                    if (deckDropzone) deckDropzone.style.display = 'none';
                }
                
                const techEl = document.getElementById('projectTechStack');
                if (techEl) techEl.value = myProject.tech_stack || '';

                if (myProject.tech_stack) {
                    const stackList = myProject.tech_stack.split(',').map(s => s.trim());
                    document.querySelectorAll('.tech-pick-badge').forEach(badge => {
                        badge.classList.toggle('selected', stackList.includes(badge.dataset.tech));
                    });
                }
            } else {
                if (deleteBtn) deleteBtn.style.display = 'none';
            }

            // Restore any draft if fields were not pre-filled by submitted project
            restoreDraftFromStorage(myProject);
        };

        if (btnBack) btnBack.addEventListener('click', showGalleryView);
        if (btnNew) btnNew.addEventListener('click', showWorkspaceView);
    }

    /* --- SMART 16:9 AUTO-CROP VIA HTML5 CANVAS --- */
    function cropAndCompressImageTo16x9(file, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const targetWidth = 1280;
                const targetHeight = 720;
                const canvas = document.createElement('canvas');
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                const ctx = canvas.getContext('2d');
                
                const targetRatio = 16 / 9;
                const srcRatio = img.width / img.height;
                let srcX = 0, srcY = 0, srcW = img.width, srcH = img.height;
                
                if (srcRatio > targetRatio) {
                    srcW = img.height * targetRatio;
                    srcX = (img.width - srcW) / 2;
                } else {
                    srcH = img.width / targetRatio;
                    srcY = (img.height - srcH) / 2;
                }
                
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(0, 0, targetWidth, targetHeight);
                ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, targetWidth, targetHeight);
                
                const base64Data = canvas.toDataURL('image/jpeg', 0.85);
                callback(null, base64Data);
            };
            img.onerror = () => callback(new Error('Gagal memproses file gambar.'));
            img.src = e.target.result;
        };
        reader.onerror = () => callback(new Error('Gagal membaca file.'));
        reader.readAsDataURL(file);
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
        const previewImg = document.getElementById('previewImgElement');
        const btnRemove = document.getElementById('btnRemoveCover');

        if (coverInput) {
            coverInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                if (file.size > 4 * 1024 * 1024) {
                    showShowcaseToast('Ukuran gambar terlalu besar! Maksimal 4MB.', 'error');
                    coverInput.value = '';
                    return;
                }

                showShowcaseToast('Mengoptimalkan & auto-crop ke rasio 16:9...', 'info');

                cropAndCompressImageTo16x9(file, (err, base64Data) => {
                    if (err || !base64Data) {
                        showShowcaseToast('Gagal memproses gambar.', 'error');
                        return;
                    }

                    if (coverHidden) coverHidden.value = base64Data;
                    if (coverPreview) coverPreview.style.display = 'block';
                    if (previewImg) previewImg.src = base64Data;
                    showShowcaseToast('Foto cover berhasil di-crop ke 16:9!', 'success');
                });
            });
        }

        if (btnRemove) {
            btnRemove.addEventListener('click', () => {
                if (coverHidden) coverHidden.value = '';
                if (coverInput) coverInput.value = '';
                if (previewImg) previewImg.src = '';
                if (coverPreview) coverPreview.style.display = 'none';
                showShowcaseToast('Foto cover dihapus.', 'info');
            });
        }

        // Pitch Deck File Upload Dropzone
        const deckInput = document.getElementById('projectDeckFile');
        const deckDataHidden = document.getElementById('projectDeckFileData');
        const deckNameHidden = document.getElementById('projectDeckFileName');
        const deckCard = document.getElementById('deckFileAttachedCard');
        const deckDropzone = document.getElementById('deckDropzone');
        const deckFileNameText = document.getElementById('deckFileNameText');
        const deckFileSizeText = document.getElementById('deckFileSizeText');
        const btnRemoveDeck = document.getElementById('btnRemoveDeckFile');

        if (deckInput) {
            deckInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;

                if (file.size > 50 * 1024 * 1024) {
                    showShowcaseToast('Ukuran berkas pitch deck terlalu besar! Maksimal 50MB.', 'error');
                    deckInput.value = '';
                    return;
                }

                const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64Data = event.target.result;
                    if (deckDataHidden) deckDataHidden.value = base64Data;
                    if (deckNameHidden) deckNameHidden.value = file.name;
                    if (deckFileNameText) deckFileNameText.textContent = file.name;
                    if (deckFileSizeText) deckFileSizeText.textContent = `${sizeInMb} MB · Berkas resmi terlampir`;
                    if (deckCard) deckCard.style.display = 'flex';
                    if (deckDropzone) {
                        deckDropzone.style.display = 'none';
                        deckDropzone.classList.remove('dropzone-error');
                    }
                    const errDeckEl = document.getElementById('errorProjectDeck');
                    if (errDeckEl) errDeckEl.style.display = 'none';
                    showShowcaseToast('Berkas Pitch Deck berhasil dimuat!', 'success');
                };
                reader.onerror = () => showShowcaseToast('Gagal membaca berkas.', 'error');
                reader.readAsDataURL(file);
            });
        }

        if (btnRemoveDeck) {
            btnRemoveDeck.addEventListener('click', () => {
                if (deckInput) deckInput.value = '';
                if (deckDataHidden) deckDataHidden.value = '';
                if (deckNameHidden) deckNameHidden.value = '';
                if (deckCard) deckCard.style.display = 'none';
                if (deckDropzone) deckDropzone.style.display = 'flex';
                showShowcaseToast('Berkas pitch deck dihapus.', 'info');
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

        function normalizeUrl(str) {
            if (!str) return '';
            str = str.trim();
            if (!/^https?:\/\//i.test(str)) {
                str = 'https://' + str;
            }
            return str;
        }

        function isValidHttpUrl(string) {
            if (!string || string.trim().length < 3) return false;
            const normalized = normalizeUrl(string);
            try {
                const url = new URL(normalized);
                return (url.protocol === "http:" || url.protocol === "https:") && (url.hostname.includes('.') || url.hostname === 'localhost');
            } catch (_) {
                return false;  
            }
        }

        // Live error clearing bindings
        const demoInput = document.getElementById('projectDemo');
        const repoInput = document.getElementById('projectRepo');
        const errDemo = document.getElementById('errorProjectDemo');
        const errRepo = document.getElementById('errorProjectRepo');
        const errDeck = document.getElementById('errorProjectDeck');

        if (demoInput) {
            demoInput.addEventListener('input', () => {
                demoInput.classList.remove('input-error');
                if (errDemo) errDemo.style.display = 'none';
            });
        }

        if (repoInput) {
            repoInput.addEventListener('input', () => {
                repoInput.classList.remove('input-error');
                if (errRepo) errRepo.style.display = 'none';
            });
        }

        const formBtn = document.getElementById('btnSubmitFinalProject');
        if (formBtn) {
            formBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                
                const session = getSession();
                const userNik = session.nik || session.participant_nik || session.username || session.id || (session.profile && session.profile.nik) || '';
                const teamName = session.profile?.team_name || session.team_name || session.name || "";
                const teamId = teamName ? teamName.toLowerCase().replace(/[^a-z0-9]/g, "_") : (userNik ? `fp_${userNik}` : `fp_${Date.now()}`);

                // Reset previous error highlights
                if (demoInput) demoInput.classList.remove('input-error');
                if (repoInput) repoInput.classList.remove('input-error');
                if (deckDropzone) deckDropzone.classList.remove('dropzone-error');
                if (errDemo) errDemo.style.display = 'none';
                if (errRepo) errRepo.style.display = 'none';
                if (errDeck) errDeck.style.display = 'none';

                // 1. Judul Proyek Check
                const titleVal = document.getElementById('projectTitle')?.value.trim();
                if (!titleVal) {
                    showShowcaseToast('Judul Proyek wajib diisi!', 'error');
                    const titleEl = document.getElementById('projectTitle');
                    if (titleEl) {
                        titleEl.classList.add('input-error');
                        titleEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        titleEl.focus();
                    }
                    return;
                }

                // 2. Section 4 Deliverables Mandatory Checks
                let demoVal = document.getElementById('projectDemo')?.value.trim();
                if (!demoVal || !isValidHttpUrl(demoVal)) {
                    if (demoInput) {
                        demoInput.classList.add('input-error');
                        demoInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        demoInput.focus();
                    }
                    if (errDemo) errDemo.style.display = 'flex';
                    showShowcaseToast('Live Demo URL wajib diisi dengan tautan aktif!', 'error');
                    return;
                }
                demoVal = normalizeUrl(demoVal);
                if (demoInput) demoInput.value = demoVal;

                let repoVal = document.getElementById('projectRepo')?.value.trim();
                if (!repoVal || !isValidHttpUrl(repoVal)) {
                    if (repoInput) {
                        repoInput.classList.add('input-error');
                        repoInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        repoInput.focus();
                    }
                    if (errRepo) errRepo.style.display = 'flex';
                    showShowcaseToast('Tautan Source Code (GitHub / Google Colab) wajib diisi!', 'error');
                    return;
                }
                repoVal = normalizeUrl(repoVal);
                if (repoInput) repoInput.value = repoVal;

                const deckDataVal = document.getElementById('projectDeckFileData')?.value || '';
                const deckNameVal = document.getElementById('projectDeckFileName')?.value || '';
                if (!deckDataVal && !deckNameVal) {
                    if (deckDropzone) {
                        deckDropzone.classList.add('dropzone-error');
                        deckDropzone.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                    if (errDeck) errDeck.style.display = 'flex';
                    showShowcaseToast('Berkas Slide Pitch Deck (PDF / PPTX) wajib diunggah!', 'error');
                    return;
                }

                const originalBtnHtml = formBtn.innerHTML;
                formBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Menyimpan ke Google Drive & Sheets...';
                formBtn.disabled = true;

                const payload = {
                    action: 'submitFinalProject',
                    participantToken: session.token || '',
                    nik: userNik,
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
                    repo_url: repoVal,
                    demo_url: demoVal,
                    deck_file_data: deckDataVal,
                    deck_file_name: deckNameVal || 'Pitch-Deck.pdf',
                    tech_stack: document.getElementById('projectTechStack')?.value.trim() || '',
                    likes_count: (() => {
                        const existingProj = cachedProjects.find(p => p.project_id === teamId || p.team_id === teamId);
                        return (existingProj && existingProj.likes_count !== undefined && !isNaN(Number(existingProj.likes_count))) ? Number(existingProj.likes_count) : 0;
                    })(),
                    submitted_at: new Date().toISOString()
                };

                const finalizeConfirmedSubmission = (savedProj, message) => {
                    savedProj = normalizeProjectRecord(savedProj);
                    cachedProjects = cachedProjects.filter(p => p.project_id !== teamId && p.team_id !== teamId);
                    cachedProjects.unshift(savedProj);
                    safeSaveProjectsToStorage(cachedProjects);

                    clearDraftFromStorage();
                    showShowcaseToast(message, 'success');
                    applyFiltersAndRender();
                    const btnBack = document.getElementById('btnBackToGallery');
                    if (btnBack) btnBack.click();
                };

                let submitTimeoutId;
                try {
                    const controller = new AbortController();
                    submitTimeoutId = setTimeout(() => controller.abort(), SHOWCASE_SUBMIT_TIMEOUT_MS);
                    const serializedPayload = JSON.stringify(payload);
                    // Writes go straight to GAS so Drive uploads are not constrained
                    // by the Vercel proxy's request-size and execution-time limits.
                    const submitUrl = await getShowcaseSubmitUrl();
                    const response = await fetch(submitUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: serializedPayload,
                        signal: controller.signal
                    });
                    const responseText = await response.text();
                    let result;
                    try {
                        result = JSON.parse(responseText);
                    } catch (parseError) {
                        const isTooLarge = response.status === 413 || responseText.startsWith('Request Entity Too Large');
                        throw new Error(isTooLarge
                            ? 'Ukuran cover dan pitch deck terlalu besar untuk jalur upload. Kompres berkas lalu coba lagi.'
                            : `Server mengembalikan respons tidak valid (HTTP ${response.status}).`);
                    }
                    if (!response.ok || !result || result.status !== 'success') {
                        throw new Error(result?.message || 'Database tidak mengonfirmasi penyimpanan proyek.');
                    }

                    const savedProj = result.project || payload;
                    finalizeConfirmedSubmission(
                        savedProj,
                        'Proyek tim berhasil disimpan dan dipublikasikan ke etalase Showcase!'
                    );
                } catch (submitErr) {
                    console.error('Submit error:', submitErr);
                    const isAmbiguousNetworkFailure = submitErr?.name === 'AbortError'
                        || submitErr instanceof TypeError
                        || /NetworkError|Failed to fetch|Load failed/i.test(submitErr?.message || '');

                    if (isAmbiguousNetworkFailure) {
                        const confirmedProject = await confirmShowcaseSubmission(payload);
                        if (confirmedProject) {
                            finalizeConfirmedSubmission(
                                confirmedProject,
                                'Koneksi sempat terputus, tetapi proyek sudah terkonfirmasi tersimpan di database.'
                            );
                            return;
                        }
                    }

                    const message = submitErr?.name === 'AbortError'
                        ? 'Penyimpanan belum dikonfirmasi setelah 120 detik. Data tetap di form; silakan coba lagi.'
                        : isAmbiguousNetworkFailure
                            ? 'Koneksi upload ke database terputus dan penyimpanan belum dapat dikonfirmasi. Data tetap di form; cek koneksi lalu coba lagi.'
                            : `Proyek belum tersimpan ke database. ${submitErr?.message || 'Silakan coba lagi.'}`;
                    showShowcaseToast(message, 'error');
                } finally {
                    clearTimeout(submitTimeoutId);
                    formBtn.innerHTML = originalBtnHtml;
                    formBtn.disabled = false;
                }
            });
        }

        // Live draft autosave on any input changes
        const formContainer = document.getElementById('projectSubmitForm');
        if (formContainer) {
            let draftDebounce;
            formContainer.addEventListener('input', () => {
                clearTimeout(draftDebounce);
                draftDebounce = setTimeout(saveDraftToStorage, 300);
            });
            formContainer.addEventListener('change', () => {
                clearTimeout(draftDebounce);
                draftDebounce = setTimeout(saveDraftToStorage, 300);
            });
        }
    }

    /* --- DELETE PROJECT FLOW --- */
    async function deleteProject(projectId) {
        const session = getSession();
        if (!session.nik) {
            showShowcaseToast('Sesi tidak valid, silakan login ulang.', 'error');
            return;
        }
        
        showShowcaseConfirm(
            'Konfirmasi Hapus Project',
            'Apakah Anda yakin ingin menghapus project tim ini dari pameran Showcase?',
            async () => {
                showShowcaseToast('Menghapus project tim...', 'info');
                try {
                    await fetch('/__gas', {
                        method: 'POST',
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify({
                            action: 'deleteFinalProject',
                            participantToken: session.token || '',
                            project_id: projectId,
                            team_id: projectId
                        })
                    });
                } catch (err) {
                    // Continue with local removal
                }

                cachedProjects = cachedProjects.filter(p => p.project_id !== projectId && p.team_id !== projectId);
                localStorage.setItem('herai_submitted_projects', JSON.stringify(cachedProjects));
                
                showShowcaseToast('Project tim berhasil dihapus dari pameran Showcase.', 'success');
                window.closeShowcaseModal();
                
                const btnBack = document.getElementById('btnBackToGallery');
                if (btnBack) btnBack.click();
                
                applyFiltersAndRender();
            }
        );
    }
    window.deleteProject = deleteProject;

    /* --- GUIDE MODAL HANDLERS --- */
    function bindGuideEvents() {
        const guideBtn = document.getElementById('btnGuideSubmission') ||
                         document.querySelector('.btn-hero-guide') ||
                         Array.from(document.querySelectorAll('.showcase-hero-banner button')).find(b => b.textContent && b.textContent.includes('Guide'));
        
        if (guideBtn) {
            guideBtn.onclick = (e) => {
                e.preventDefault();
                window.openGuideModal();
            };
        }

        const overlay = document.getElementById('showcaseGuideModalOverlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    window.closeGuideModal();
                }
            });
        }
    }

    window.openGuideModal = function() {
        const modal = document.getElementById('showcaseGuideModalOverlay');
        if (modal) modal.classList.add('active');
    };

    window.closeGuideModal = function() {
        const modal = document.getElementById('showcaseGuideModalOverlay');
        if (modal) modal.classList.remove('active');
    };

    window.proceedFromGuideToWorkspace = function() {
        window.closeGuideModal();
        const btnSubmitEdit = document.getElementById('btnSubmitEditProj');
        if (btnSubmitEdit) btnSubmitEdit.click();
    };

    /* --- DETAIL MODAL HANDLERS --- */
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
            if (e.key === 'Escape') {
                window.closeShowcaseModal();
                window.closeGuideModal();
                window.closeShowcaseConfirm();
            }
        });
    }

    function getTechBadgeHtml(tech) {
        const t = (tech || '').trim();
        const low = t.toLowerCase();
        let icon = '<i class="fas fa-cube" style="color: #ec1970;"></i>';
        if (low.includes('python')) icon = '<i class="fab fa-python" style="color: #3b82f6;"></i>';
        else if (low.includes('tensor') || low.includes('tf')) icon = '<i class="fas fa-brain" style="color: #f97316;"></i>';
        else if (low.includes('torch')) icon = '<i class="fas fa-fire" style="color: #ef4444;"></i>';
        else if (low.includes('cv') || low.includes('vision') || low.includes('opencv')) icon = '<i class="fas fa-camera" style="color: #10b981;"></i>';
        else if (low.includes('learn') || low.includes('scikit') || low.includes('sklearn')) icon = '<i class="fas fa-chart-line" style="color: #f59e0b;"></i>';
        else if (low.includes('react')) icon = '<i class="fab fa-react" style="color: #06b6d4;"></i>';
        else if (low.includes('fastapi') || low.includes('fast')) icon = '<i class="fas fa-bolt" style="color: #14b8a6;"></i>';
        else if (low.includes('postgres') || low.includes('sql') || low.includes('data')) icon = '<i class="fas fa-database" style="color: #3b82f6;"></i>';
        else if (low.includes('docker')) icon = '<i class="fab fa-docker" style="color: #0284c7;"></i>';
        else if (low.includes('flutter')) icon = '<i class="fas fa-mobile-screen" style="color: #0284c7;"></i>';
        else if (low.includes('node') || low.includes('js')) icon = '<i class="fab fa-node-js" style="color: #22c55e;"></i>';
        else if (low.includes('figma')) icon = '<i class="fab fa-figma" style="color: #a855f7;"></i>';

        return `<div class="dossier-tech-chip">${icon} <span>${escapeHtml(t)}</span></div>`;
    }

    window.openShowcaseModalFromData = function(projectIdOrIndex) {
        let index = -1;
        const p = cachedProjects.find((item, idx) => {
            const match = item.project_id === projectIdOrIndex || 
                          item.team_id === projectIdOrIndex || 
                          (item.project_title || item.title) === projectIdOrIndex;
            if (match) {
                index = idx;
                return true;
            }
            return false;
        }) || (typeof projectIdOrIndex === 'number' || /^\d+$/.test(projectIdOrIndex) ? cachedProjects[parseInt(projectIdOrIndex, 10)] : null);
        
        if (!p) return;
        if (index === -1) index = cachedProjects.indexOf(p);
        if (index === -1) index = 0;

        const seq = String(index + 1).padStart(2, '0');
        const numEl = document.getElementById('modalProjectNumber');
        if (numEl) numEl.textContent = seq;

        const techStack = p.tech_stack ? p.tech_stack.split(',').map(s => s.trim()).filter(Boolean) : ['Python', 'FastAPI', 'PyTorch', 'React'];
        const track = p.track || 'AI Solution';

        const titleEl = document.getElementById('modalTitle');
        if (titleEl) titleEl.textContent = p.project_title || p.title || 'Untitled Project';

        const taglineEl = document.getElementById('modalTagline');
        if (taglineEl) taglineEl.textContent = p.tagline || 'Solusi inovasi kecerdasan buatan dari HerAI Fellowship.';
        
        const trackBadge = document.getElementById('modalTrackBadge');
        if (trackBadge) {
            const iconHtml = getCategoryIconHtml(track);
            trackBadge.innerHTML = `${iconHtml} <span>${escapeHtml(track)}</span>`;
        }
        
        const tName = p.team_name || p.members || `Team ${seq}`;
        const teamNameEl = document.getElementById('modalTeamName');
        if (teamNameEl) teamNameEl.textContent = tName;

        const footerTeamNameEl = document.getElementById('modalFooterTeamName');
        if (footerTeamNameEl) footerTeamNameEl.textContent = tName;

        const initials = tName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'TM';
        const teamAvatarBox = document.getElementById('modalTeamAvatarBox');
        if (teamAvatarBox) teamAvatarBox.textContent = initials;
        
        const stackContainer = document.getElementById('modalTechStack');
        if (stackContainer) {
            stackContainer.innerHTML = techStack.map(t => getTechBadgeHtml(t)).join('');
        }
        
        const problemEl = document.getElementById('modalProblem');
        if (problemEl) problemEl.textContent = p.problem || 'Belum ada penjelasan latar belakang masalah.';
        
        const solutionEl = document.getElementById('modalSolution');
        if (solutionEl) solutionEl.textContent = p.solution || 'Belum ada penjelasan detail solusi & arsitektur AI.';

        // Published Date
        const dateEl = document.getElementById('modalPublishedDate');
        if (dateEl) {
            if (p.submitted_at || p.created_at) {
                const d = new Date(p.submitted_at || p.created_at);
                dateEl.textContent = `Diterbitkan pada ${d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`;
            } else {
                dateEl.textContent = 'Diterbitkan pada 2026';
            }
        }

        // Likes Count
        const likesEl = document.getElementById('modalLikesCount');
        if (likesEl) {
            likesEl.textContent = (p.likes_count !== undefined && p.likes_count !== null && !isNaN(Number(p.likes_count))) ? Number(p.likes_count) : 0;
        }

        const btnDemo = document.getElementById('modalBtnDemo');
        if (btnDemo) {
            btnDemo.href = p.demo_url || '#';
            btnDemo.style.display = p.demo_url ? 'inline-flex' : 'none';
        }

        const btnRepo = document.getElementById('modalBtnRepo');
        if (btnRepo) {
            const repoUrl = (p.repo_url || '').trim();
            if (repoUrl) {
                btnRepo.href = repoUrl;
                btnRepo.style.display = 'inline-flex';
                const isColab = repoUrl.toLowerCase().includes('colab');
                const iconBox = btnRepo.querySelector('.ticket-icon-box');
                const strongText = btnRepo.querySelector('.ticket-text-col strong');
                const smallText = btnRepo.querySelector('.ticket-text-col small');
                
                if (isColab) {
                    btnRepo.className = 'dossier-ticket-btn colab-ticket';
                    if (iconBox) iconBox.innerHTML = '<i class="fas fa-code"></i>';
                    if (strongText) strongText.textContent = 'Google Colab Notebook';
                    if (smallText) smallText.textContent = 'Buka & jalankan notebook model AI';
                } else {
                    btnRepo.className = 'dossier-ticket-btn repo-ticket';
                    if (iconBox) iconBox.innerHTML = '<i class="fab fa-github"></i>';
                    if (strongText) strongText.textContent = 'Repository GitHub';
                    if (smallText) smallText.textContent = 'Lihat source code project';
                }
            } else {
                btnRepo.style.display = 'none';
            }
        }

        const btnDeck = document.getElementById('modalBtnDeck');
        if (btnDeck) {
            const deckFile = p.deck_file_data || '';
            const deckUrl = (p.deck_url || '').trim();
            const hasDeck = Boolean(deckFile || deckUrl);

            if (hasDeck) {
                btnDeck.style.display = 'inline-flex';
                btnDeck.href = deckFile || deckUrl || '#';
                
                const iconBox = btnDeck.querySelector('.ticket-icon-box');
                const strongText = btnDeck.querySelector('.ticket-text-col strong');
                const smallText = btnDeck.querySelector('.ticket-text-col small');

                if (deckFile || deckUrl.toLowerCase().endsWith('.pdf') || p.deck_file_name) {
                    if (iconBox) iconBox.innerHTML = '<i class="fas fa-file-pdf"></i>';
                    if (strongText) strongText.textContent = 'Unduh / Buka Pitch Deck';
                    if (smallText) smallText.textContent = p.deck_file_name ? `${p.deck_file_name} (PDF)` : 'Lihat slide presentasi (PDF)';
                    if (deckFile) {
                        btnDeck.setAttribute('download', p.deck_file_name || 'Pitch-Deck.pdf');
                    } else {
                        btnDeck.removeAttribute('download');
                    }
                } else {
                    if (iconBox) iconBox.innerHTML = '<i class="fas fa-file-powerpoint"></i>';
                    if (strongText) strongText.textContent = 'Pitch Deck Slide';
                    if (smallText) smallText.textContent = 'Buka slide di Google Drive / Web';
                    btnDeck.removeAttribute('download');
                }
            } else {
                btnDeck.style.display = 'none';
            }
        }

        // Check if user is author of this project
        const session = getSession();
        const userTeamName = (session.profile?.team_name || session.team_name || "").toLowerCase().trim();
        const userNik = session.nik || "";
        const isAuthor = (userTeamName && (p.team_name || "").toLowerCase().trim() === userTeamName) ||
                         (p.team_id && userNik && p.team_id.includes(userNik)) ||
                         (p.project_id && userNik && p.project_id.includes(userNik));

        const authorActionsEl = document.getElementById('modalAuthorActions');
        if (authorActionsEl) {
            authorActionsEl.style.display = isAuthor ? 'flex' : 'none';
            
            const editBtn = document.getElementById('btnModalEditProject');
            if (editBtn) {
                editBtn.onclick = () => {
                    window.closeShowcaseModal();
                    const btnNew = document.getElementById('btnSubmitEditProj');
                    if (btnNew) btnNew.click();
                };
            }
            
            const deleteBtn = document.getElementById('btnModalDeleteProject');
            if (deleteBtn) {
                deleteBtn.onclick = () => {
                    deleteProject(p.project_id || p.team_id);
                };
            }
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
