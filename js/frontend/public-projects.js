(function() {
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

    function renderSkeletons() {
        const grid = document.getElementById('publicShowcaseGrid');
        if (!grid) return;
        grid.setAttribute('aria-busy', 'true');
        grid.innerHTML = Array.from({ length: 6 }, function() {
            return '<article class="public-showcase-project-card public-showcase-skeleton" aria-hidden="true">' +
                '<div class="public-showcase-skeleton-block"></div>' +
                '<div class="public-showcase-skeleton-lines">' +
                    '<div class="public-showcase-skeleton-line"></div>' +
                    '<div class="public-showcase-skeleton-line"></div>' +
                    '<div class="public-showcase-skeleton-line"></div>' +
                '</div>' +
            '</article>';
        }).join('');
    }

    function renderState(icon, title, message, retry) {
        const grid = document.getElementById('publicShowcaseGrid');
        if (!grid) return;
        grid.setAttribute('aria-busy', 'false');
        grid.innerHTML = '<div class="public-showcase-state">' +
            '<i class="fas ' + escapeHtml(icon) + '" aria-hidden="true"></i>' +
            '<h3>' + escapeHtml(title) + '</h3>' +
            '<p>' + escapeHtml(message) + '</p>' +
            (retry ? '<button type="button" id="publicShowcaseRetry">Coba lagi</button>' : '') +
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
            return '<button class="public-showcase-filter' + (active ? ' active' : '') + '" type="button" data-track="' +
                escapeHtml(track) + '" aria-pressed="' + active + '">' + escapeHtml(track) + '</button>';
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

    function coverHtml(project) {
        if (project.coverUrl) {
            return '<img src="' + escapeHtml(project.coverUrl) + '" alt="Cover ' + escapeHtml(project.title) + '" loading="lazy">';
        }
        return '<div class="public-showcase-cover-fallback" aria-hidden="true">' + escapeHtml(initials(project.title)) + '</div>';
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
            return '<article class="public-showcase-project-card" tabindex="0" role="button" data-project-id="' + escapeHtml(project.id) +
                '" aria-label="Lihat detail project ' + escapeHtml(project.title) + '">' +
                '<div class="public-showcase-project-cover">' +
                    coverHtml(project) +
                    '<span class="public-showcase-project-number">PROJECT ' + String(index + 1).padStart(2, '0') + '</span>' +
                '</div>' +
                '<div class="public-showcase-project-content">' +
                    '<span class="public-showcase-project-track">' + escapeHtml(project.track) + '</span>' +
                    '<h3>' + escapeHtml(project.title) + '</h3>' +
                    '<p>' + escapeHtml(project.tagline) + '</p>' +
                    '<div class="public-showcase-project-footer">' +
                        '<div class="public-showcase-project-team"><span>' + escapeHtml(initials(project.team)) + '</span><span>' + escapeHtml(project.team) + '</span></div>' +
                        '<span class="public-showcase-project-arrow" aria-hidden="true"><i class="fas fa-arrow-up-right-from-square"></i></span>' +
                    '</div>' +
                '</div>' +
            '</article>';
        }).join('');

        grid.querySelectorAll('.public-showcase-project-cover img').forEach(function(image) {
            image.addEventListener('error', function() {
                const projectId = image.closest('[data-project-id]')?.dataset.projectId;
                const project = state.projects.find(function(item) { return item.id === projectId; });
                image.replaceWith(createFallbackCover(project?.title));
            }, { once: true });
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

    function createFallbackCover(title) {
        const fallback = document.createElement('div');
        fallback.className = 'public-showcase-cover-fallback';
        fallback.setAttribute('aria-hidden', 'true');
        fallback.textContent = initials(title);
        return fallback;
    }

    function linkHtml(url, icon, label) {
        if (!url) return '';
        return '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer">' +
            '<i class="fas ' + escapeHtml(icon) + '" aria-hidden="true"></i>' + escapeHtml(label) +
        '</a>';
    }

    function openProject(projectId, trigger) {
        const project = state.projects.find(function(item) { return item.id === projectId; });
        const modal = document.getElementById('publicShowcaseModal');
        if (!project || !modal) return;

        state.lastFocusedElement = trigger || document.activeElement;
        const cover = document.getElementById('publicShowcaseModalCover');
        if (cover) {
            cover.innerHTML = coverHtml(project);
            const image = cover.querySelector('img');
            image?.addEventListener('error', function() {
                image.replaceWith(createFallbackCover(project.title));
            }, { once: true });
        }

        document.getElementById('publicShowcaseModalTrack').textContent = project.track;
        document.getElementById('publicShowcaseModalDate').textContent = formatDate(project.submittedAt);
        document.getElementById('publicShowcaseModalTitle').textContent = project.title;
        document.getElementById('publicShowcaseModalTagline').textContent = project.tagline;
        document.getElementById('publicShowcaseModalAvatar').textContent = initials(project.team);
        document.getElementById('publicShowcaseModalTeam').textContent = project.team;
        document.getElementById('publicShowcaseModalProblem').textContent = project.problem;
        document.getElementById('publicShowcaseModalSolution').textContent = project.solution;

        const stack = document.getElementById('publicShowcaseModalStack');
        const technologies = project.techStack.split(/[,;\n]/).map(function(item) { return item.trim(); }).filter(Boolean).slice(0, 12);
        if (stack) {
            stack.innerHTML = technologies.map(function(item) { return '<span>' + escapeHtml(item) + '</span>'; }).join('');
            stack.hidden = technologies.length === 0;
        }

        const links = document.getElementById('publicShowcaseModalLinks');
        if (links) {
            links.innerHTML = linkHtml(project.demoUrl, 'fa-play', 'Buka demo') +
                linkHtml(project.repoUrl, 'fa-code-branch', 'Repository') +
                linkHtml(project.deckUrl, 'fa-file-lines', 'Pitch deck');
            links.hidden = !links.innerHTML;
        }

        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        modal.querySelector('.public-showcase-modal-close')?.focus();
    }

    function closeModal() {
        const modal = document.getElementById('publicShowcaseModal');
        if (!modal || modal.hidden) return;
        modal.hidden = true;
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
