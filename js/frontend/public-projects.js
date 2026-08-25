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

    const state = {
        projects: [],
        query: '',
        track: 'Semua',
        sort: 'newest',
        lastFocusedElement: null
    };

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>"'`=\/]/g, function(character) {
            return ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
                "'": '&#39;', '/': '&#x2F;', '=': '&#x3D;', '`': '&#x60;'
            })[character];
        });
    }

    function safeHttpsUrl(value) {
        try {
            const parsed = new URL(String(value || '').trim());
            return parsed.protocol === 'https:' ? parsed.toString() : '';
        } catch (_) {
            return '';
        }
    }

    function normalizeProject(project) {
        if (!project || typeof project !== 'object') return null;
        const text = function(field, fallback) {
            const value = project[field] || fallback || '';
            return Array.isArray(value) ? value.join(', ') : String(value).trim();
        };
        const title = text('title', project.project_title);
        if (!title) return null;

        return {
            id: text('project_id', project.team_id || title),
            team: text('team_name', 'HerAI Team'),
            title,
            tagline: text('tagline', 'Solusi AI yang dibangun oleh fellows HerAI.'),
            coverUrl: safeHttpsUrl(project.cover_url),
            track: text('track', 'AI Solution'),
            techStack: text('tech_stack'),
            problem: text('problem', 'Detail permasalahan belum tersedia.'),
            solution: text('solution', 'Detail solusi belum tersedia.'),
            deckUrl: safeHttpsUrl(project.deck_url),
            repoUrl: safeHttpsUrl(project.repo_url),
            demoUrl: safeHttpsUrl(project.demo_url),
            submittedAt: text('submitted_at')
        };
    }

    function initials(value) {
        return String(value || 'HT')
            .split(/\s+/)
            .filter(Boolean)
            .map(function(part) { return part.charAt(0); })
            .join('')
            .slice(0, 2)
            .toUpperCase() || 'HT';
    }

    function formatDate(value) {
        if (!value) return 'HerAI Fellowship 2026';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return 'HerAI Fellowship 2026';
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function categoryIcon(track) {
        const category = String(track || '').toLowerCase();
        if (category.includes('health')) return 'fa-heart-pulse';
        if (category.includes('edu')) return 'fa-graduation-cap';
        if (category.includes('green')) return 'fa-leaf';
        if (category.includes('fin')) return 'fa-coins';
        if (category.includes('product')) return 'fa-bolt';
        if (category.includes('creat')) return 'fa-palette';
        if (category.includes('social')) return 'fa-hand-holding-heart';
        return 'fa-sparkles';
    }

    function renderSkeletons() {
        const grid = document.getElementById('publicShowcaseGrid');
        if (!grid) return;
        grid.setAttribute('aria-busy', 'true');
        grid.innerHTML = Array.from({ length: 8 }, function() {
            return '<article class="project-card skeleton-card" aria-hidden="true">' +
                '<div class="skeleton-tape skeleton-shimmer"></div>' +
                '<div class="skeleton-badge skeleton-shimmer"></div>' +
                '<div class="skeleton-img-box skeleton-shimmer"></div>' +
                '<div class="skeleton-title-box skeleton-shimmer"></div>' +
                '<div class="skeleton-desc-box skeleton-shimmer"></div>' +
                '<div class="skeleton-desc-box short skeleton-shimmer"></div>' +
                '<div class="skeleton-footer-box"><div class="skeleton-avatar-chip skeleton-shimmer"></div><div class="skeleton-name-box skeleton-shimmer"></div></div>' +
            '</article>';
        }).join('');
    }

    function renderState(icon, title, message, retry) {
        const grid = document.getElementById('publicShowcaseGrid');
        if (!grid) return;
        grid.setAttribute('aria-busy', 'false');
        grid.innerHTML = '<div class="gallery-empty-scrapbook public-showcase-state">' +
            '<div class="empty-sparkle-icon"><i class="fas ' + escapeHtml(icon) + '" aria-hidden="true"></i></div>' +
            '<h3>' + escapeHtml(title) + '</h3>' +
            '<p>' + escapeHtml(message) + '</p>' +
            (retry ? '<button class="btn-empty-submit" type="button" id="publicShowcaseRetry"><i class="fas fa-rotate-right" aria-hidden="true"></i> Coba lagi</button>' : '') +
        '</div>';
        document.getElementById('publicShowcaseRetry')?.addEventListener('click', loadProjects);
    }

    function updateSummary() {
        const projects = state.projects;
        const teams = new Set(projects.map(function(project) { return project.team.toLowerCase(); }).filter(Boolean));
        const tracks = new Set(projects.map(function(project) { return project.track.toLowerCase(); }).filter(Boolean));
        const projectEl = document.getElementById('publicShowcaseProjectCount');
        const teamEl = document.getElementById('publicShowcaseTeamCount');
        const trackEl = document.getElementById('publicShowcaseTrackCount');
        if (projectEl) projectEl.textContent = projects.length;
        if (teamEl) teamEl.textContent = teams.size;
        if (trackEl) trackEl.textContent = tracks.size;
    }

    function renderFilters() {
        const container = document.getElementById('publicShowcaseFilters');
        if (!container) return;
        const tracks = Array.from(new Set(state.projects.map(function(project) { return project.track; }).filter(Boolean)))
            .sort(function(a, b) { return a.localeCompare(b, 'id'); });
        const options = ['Semua'].concat(tracks);
        if (!options.includes(state.track)) state.track = 'Semua';
        container.innerHTML = options.map(function(track) {
            const active = track === state.track;
            return '<button class="pill' + (active ? ' active' : '') + '" type="button" data-track="' +
                escapeHtml(track) + '" aria-pressed="' + active + '"><i class="fas ' + categoryIcon(track) + '" aria-hidden="true"></i>' +
                escapeHtml(track === 'Semua' ? 'Semua Kategori' : track) + '</button>';
        }).join('');
        container.querySelectorAll('[data-track]').forEach(function(button) {
            button.addEventListener('click', function() {
                state.track = button.dataset.track || 'Semua';
                renderFilters();
                renderProjects();
            });
        });
    }

    function filteredProjects() {
        const normalizedQuery = state.query.toLocaleLowerCase('id').trim();
        const projects = state.projects.filter(function(project) {
            const matchesTrack = state.track === 'Semua' || project.track === state.track;
            if (!matchesTrack) return false;
            if (!normalizedQuery) return true;
            const haystack = [project.title, project.team, project.tagline, project.track, project.techStack]
                .join(' ')
                .toLocaleLowerCase('id');
            return haystack.includes(normalizedQuery);
        });

        return projects.sort(function(a, b) {
            if (state.sort === 'az') return a.title.localeCompare(b.title, 'id');
            const aDate = new Date(a.submittedAt || 0).getTime() || 0;
            const bDate = new Date(b.submittedAt || 0).getTime() || 0;
            return state.sort === 'oldest' ? aDate - bDate : bDate - aDate;
        });
    }

    function coverHtml(project, index) {
        if (project.coverUrl) {
            const loading = index < 8 ? 'eager' : 'lazy';
            return '<div class="project-cover public-showcase-project-cover is-loading"><img src="' + escapeHtml(project.coverUrl) +
                '" alt="" loading="' + loading + '" decoding="async"></div>';
        }
        const trackSlug = project.track.toLowerCase().replace(/[^a-z0-9]/g, '');
        return '<div class="project-cover scrapbook-placeholder-frame track-' + escapeHtml(trackSlug) + '" aria-hidden="true">' +
            '<div class="placeholder-pattern-bg"></div><div class="placeholder-content-center">' +
            '<div class="placeholder-icon-halo"><i class="fas ' + categoryIcon(project.track) + '"></i></div>' +
            '<span class="placeholder-track-tag">' + escapeHtml(project.track) + ' Showcase</span></div>' +
            '<div class="placeholder-sparkle-decor"><i class="fas fa-sparkles"></i></div></div>';
    }

    function renderProjects() {
        const grid = document.getElementById('publicShowcaseGrid');
        const count = document.getElementById('publicShowcaseResultCount');
        if (!grid) return;
        const projects = filteredProjects();
        if (count) count.textContent = projects.length + ' project ditampilkan';
        grid.setAttribute('aria-busy', 'false');

        if (!projects.length) {
            renderState('fa-magnifying-glass', 'Project tidak ditemukan', 'Coba kata kunci atau kategori lainnya.', false);
            return;
        }

        grid.innerHTML = projects.map(function(project, index) {
            return '<article class="project-card ' + (project.coverUrl ? 'has-cover' : 'has-placeholder') + '" tabindex="0" role="button" data-project-id="' + escapeHtml(project.id) +
                '" aria-label="Lihat detail project ' + escapeHtml(project.title) + '">' +
                '<img src="' + TAPE_ASSETS[index % TAPE_ASSETS.length] + '" class="card-washi-tape-img" alt="" aria-hidden="true">' +
                '<div class="card-header-bar"><span class="category-badge-chip"><i class="fas ' + categoryIcon(project.track) + '" aria-hidden="true"></i><span>' + escapeHtml(project.track) + '</span></span></div>' +
                coverHtml(project, index) +
                '<div class="project-content">' +
                    '<div class="project-title-row"><h3>' + escapeHtml(project.title) + '</h3></div>' +
                    '<p class="project-description">' + escapeHtml(project.tagline) + '</p>' +
                    '<div class="project-footer">' +
                        '<div class="maker-info"><div class="maker-avatar-chip">' + escapeHtml(initials(project.team)) + '</div><span>' + escapeHtml(project.team) + '</span></div>' +
                        '<span class="btn-reaction-pill public-showcase-view-pill"><i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i><strong>Lihat</strong></span>' +
                    '</div>' +
                '</div>' +
            '</article>';
        }).join('');

        grid.querySelectorAll('.public-showcase-project-cover img').forEach(function(image) {
            const showLoadedCover = function() {
                image.closest('.project-cover')?.classList.remove('is-loading');
                image.classList.add('is-loaded');
            };
            const showCoverFallback = function() {
                const projectId = image.closest('[data-project-id]')?.dataset.projectId;
                const project = state.projects.find(function(item) { return item.id === projectId; });
                replaceBrokenCover(image, project);
            };

            image.addEventListener('load', showLoadedCover, { once: true });
            image.addEventListener('error', showCoverFallback, { once: true });

            // Cached images can finish before listeners are attached after innerHTML.
            if (image.complete) {
                if (image.naturalWidth > 0) showLoadedCover();
                else showCoverFallback();
            }
        });

        grid.querySelectorAll('[data-project-id]').forEach(function(card) {
            const open = function() { openProject(card.dataset.projectId, card); };
            card.addEventListener('click', open);
            card.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    open();
                }
            });
        });
    }

    function replaceBrokenCover(image, project) {
        const frame = image.closest('.project-cover');
        if (!frame) return;
        const card = frame.closest('.project-card');
        const trackSlug = String(project?.track || 'ai').toLowerCase().replace(/[^a-z0-9]/g, '');
        frame.className = 'project-cover scrapbook-placeholder-frame track-' + trackSlug;
        frame.setAttribute('aria-hidden', 'true');
        card?.classList.remove('has-cover');
        card?.classList.add('has-placeholder');
        frame.innerHTML = '<div class="placeholder-pattern-bg"></div><div class="placeholder-content-center">' +
            '<div class="placeholder-icon-halo"><i class="fas ' + categoryIcon(project?.track) + '"></i></div>' +
            '<span class="placeholder-track-tag">' + escapeHtml(project?.track || 'AI Solution') + ' Showcase</span></div>';
    }

    function linkHtml(url, icon, label, description, className) {
        if (!url) return '';
        return '<a class="dossier-ticket-btn ' + escapeHtml(className) + '" href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer">' +
            '<div class="ticket-icon-box"><i class="fas ' + escapeHtml(icon) + '" aria-hidden="true"></i></div>' +
            '<div class="ticket-text-col"><strong>' + escapeHtml(label) + '</strong><small>' + escapeHtml(description) + '</small></div>' +
            '<i class="fas fa-arrow-up-right-from-square ticket-arrow" aria-hidden="true"></i>' +
        '</a>';
    }

    function openProject(projectId, trigger) {
        const project = state.projects.find(function(item) { return item.id === projectId; });
        const modal = document.getElementById('publicShowcaseModal');
        if (!project || !modal) return;

        state.lastFocusedElement = trigger || document.activeElement;
        const projectIndex = state.projects.findIndex(function(item) { return item.id === projectId; });
        document.getElementById('modalProjectNumber').textContent = String(projectIndex + 1).padStart(2, '0');
        document.getElementById('modalTrackBadge').textContent = project.track;
        document.getElementById('modalPublishedDate').textContent = 'Diterbitkan ' + formatDate(project.submittedAt);
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalTagline').textContent = project.tagline;
        document.getElementById('modalTeamAvatarBox').textContent = initials(project.team);
        document.getElementById('modalTeamName').textContent = project.team;
        document.getElementById('modalFooterTeamName').textContent = project.team;
        document.getElementById('modalProblem').textContent = project.problem;
        document.getElementById('modalSolution').textContent = project.solution;

        const stack = document.getElementById('modalTechStack');
        const technologies = project.techStack.split(/[,;\n]/).map(function(item) { return item.trim(); }).filter(Boolean).slice(0, 12);
        if (stack) {
            stack.innerHTML = technologies.length
                ? technologies.map(function(item) { return '<span class="dossier-tech-chip"><i class="fas fa-code" aria-hidden="true"></i>' + escapeHtml(item) + '</span>'; }).join('')
                : '<span class="public-showcase-empty-stack">Tech stack belum dicantumkan.</span>';
        }

        const links = document.getElementById('modalProjectLinks');
        if (links) {
            links.innerHTML = linkHtml(project.demoUrl, 'fa-arrow-up-right-from-square', 'Buka Live Demo', 'Lihat aplikasi secara langsung', 'demo-ticket') +
                linkHtml(project.repoUrl, 'fa-code-branch', 'Repository Project', 'Lihat source code project', 'repo-ticket') +
                linkHtml(project.deckUrl, 'fa-file-pdf', 'Pitch Deck Slide', 'Lihat presentasi project', 'deck-ticket');
            if (!links.innerHTML) {
                links.innerHTML = '<p class="public-showcase-empty-links">Belum ada berkas publik yang dicantumkan.</p>';
            }
        }

        modal.hidden = false;
        window.requestAnimationFrame(function() { modal.classList.add('active'); });
        document.body.style.overflow = 'hidden';
        modal.querySelector('.showcase-modal-close')?.focus();
    }

    function closeModal() {
        const modal = document.getElementById('publicShowcaseModal');
        if (!modal || modal.hidden) return;
        modal.classList.remove('active');
        window.setTimeout(function() { modal.hidden = true; }, 200);
        document.body.style.overflow = '';
        if (state.lastFocusedElement && document.contains(state.lastFocusedElement)) {
            state.lastFocusedElement.focus();
        }
    }

    async function loadProjects() {
        renderSkeletons();
        const count = document.getElementById('publicShowcaseResultCount');
        if (count) count.textContent = 'Memuat project...';

        try {
            const response = await fetch('/__gas', {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ action: 'getPublicFinalProjects' })
            });
            const result = await response.json();
            if (!response.ok || result?.status !== 'success' || !Array.isArray(result.data)) {
                throw new Error(result?.message || 'Respons showcase tidak valid.');
            }
            state.projects = result.data.map(normalizeProject).filter(Boolean);
            updateSummary();
            renderFilters();
            if (!state.projects.length) {
                if (count) count.textContent = '0 project ditampilkan';
                renderState('fa-folder-open', 'Showcase segera hadir', 'Belum ada project yang tersedia untuk ditampilkan.', false);
                return;
            }
            renderProjects();
        } catch (error) {
            console.error('Public showcase load failed:', error);
            if (count) count.textContent = 'Showcase tidak dapat dimuat';
            renderState('fa-triangle-exclamation', 'Showcase belum dapat dimuat', 'Periksa koneksi lalu coba kembali.', true);
        }
    }

    function bindEvents(root) {
        const search = document.getElementById('publicShowcaseSearch');
        const sort = document.getElementById('publicShowcaseSort');
        let searchTimer;

        search?.addEventListener('input', function() {
            window.clearTimeout(searchTimer);
            searchTimer = window.setTimeout(function() {
                state.query = search.value;
                renderProjects();
            }, 160);
        });

        sort?.addEventListener('change', function() {
            state.sort = sort.value;
            renderProjects();
        });

        root.querySelectorAll('[data-public-showcase-close]').forEach(function(button) {
            button.addEventListener('click', closeModal);
        });

        root.querySelector('[data-public-showcase-scroll]')?.addEventListener('click', function() {
            document.getElementById('publicShowcaseGallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        root.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') closeModal();
        });
    }

    window.initPublicProjectsPage = function() {
        const root = document.getElementById('publicShowcasePage');
        if (!root || root.dataset.initialized === 'true') return;
        root.dataset.initialized = 'true';
        state.projects = [];
        state.query = '';
        state.track = 'Semua';
        state.sort = 'newest';
        bindEvents(root);
        loadProjects();
    };
})();
