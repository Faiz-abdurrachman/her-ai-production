(function() {
    'use strict';

    const BASE_PATH = '/materi2/math%20for%20ai/kenapa%20ai%20butuh%20matematika/';
    const STORAGE_KEY = 'heraiMathLearningSubmodule01';
    const RUNTIME_VERSION = '20260809-submodule-01';
    const SUBMODULE_ROUTE = '#/participant-ai-lab-math/kenapa-ai-butuh-matematika';
    const CONTENT = Object.freeze([
        { id: 'info', short: 'Ikhtisar', title: 'Kenapa AI Butuh Matematika? + Mathematical Readiness', route: SUBMODULE_ROUTE, file: '00-informasi-submodul.md', type: 'info', icon: 'fa-compass' },
        { id: 'topic-01', short: 'Dunia nyata → representasi', title: 'Dunia Nyata Menjadi Representasi Komputasional', route: `${SUBMODULE_ROUTE}/dunia-nyata-menjadi-representasi-komputasional`, file: '01-dunia-nyata-menjadi-representasi.md', type: 'topic', icon: 'fa-shapes' },
        { id: 'topic-02', short: 'Data, observation, feature, target', title: 'Data, Observation, Feature, dan Target', route: `${SUBMODULE_ROUTE}/data-observation-feature-dan-target`, file: '02-data-observation-feature-target.md', type: 'topic', icon: 'fa-table-columns' },
        { id: 'topic-03', short: 'Pecahan, desimal, persentase', title: 'Pecahan, Desimal, dan Persentase', route: `${SUBMODULE_ROUTE}/pecahan-desimal-dan-persentase`, file: '03-refresh-angka-pecahan-desimal-persentase.md', type: 'topic', icon: 'fa-percent' },
        { id: 'topic-04', short: 'Variable, expression, equation', title: 'Variable, Expression, dan Equation', route: `${SUBMODULE_ROUTE}/variable-expression-dan-equation`, file: '04-variable-expression-equation.md', type: 'topic', icon: 'fa-square-root-variable' },
        { id: 'topic-05', short: 'Function: input → output', title: 'Function: Dari Input ke Output', route: `${SUBMODULE_ROUTE}/function-dari-input-ke-output`, file: '05-function-input-output.md', type: 'topic', icon: 'fa-arrow-right-arrow-left' },
        { id: 'topic-06', short: 'Coordinate, graph, perubahan', title: 'Coordinate, Graph, dan Perubahan', route: `${SUBMODULE_ROUTE}/coordinate-graph-dan-perubahan`, file: '06-coordinate-graph-perubahan.md', type: 'topic', icon: 'fa-chart-line' },
        { id: 'topic-07', short: 'Powers, logarithms, sigma', title: 'Powers, Logarithms, dan Sigma', route: `${SUBMODULE_ROUTE}/powers-logarithms-dan-sigma`, file: '07-powers-log-sigma.md', type: 'topic', icon: 'fa-superscript' },
        { id: 'practice', short: 'Latihan', title: 'Latihan Submodul 01', route: `${SUBMODULE_ROUTE}/latihan`, file: 'latihan.md', type: 'practice', icon: 'fa-pen-ruler' },
        { id: 'quiz', short: 'Kuis', title: 'Kuis Submodul 01', route: `${SUBMODULE_ROUTE}/kuis`, file: 'kuis.md', type: 'quiz', icon: 'fa-clipboard-check' },
        { id: 'discussion', short: 'Diskusi', title: 'Diskusi Submodul 01', route: `${SUBMODULE_ROUTE}/diskusi`, file: 'diskusi.md', type: 'discussion', icon: 'fa-comments' },
        { id: 'references', short: 'Referensi', title: 'Referensi Submodul 01', route: `${SUBMODULE_ROUTE}/referensi`, file: 'referensi.md', type: 'references', icon: 'fa-book-bookmark' }
    ]);

    const LEGACY_ROUTES = Object.freeze({
        '/participant-ai-lab-math-intro': SUBMODULE_ROUTE.slice(1),
        '/participant-ai-lab-math-practice': `${SUBMODULE_ROUTE.slice(1)}/latihan`,
        '/participant-ai-lab-math-quiz': `${SUBMODULE_ROUTE.slice(1)}/kuis`,
        '/participant-ai-lab-math-discussion': `${SUBMODULE_ROUTE.slice(1)}/diskusi`,
        '/participant-ai-lab-math/submodule-01': SUBMODULE_ROUTE.slice(1),
        '/participant-ai-lab-math/submodule-01/topic-01': CONTENT[1].route.slice(1),
        '/participant-ai-lab-math/submodule-01/topic-02': CONTENT[2].route.slice(1),
        '/participant-ai-lab-math/submodule-01/topic-03': CONTENT[3].route.slice(1),
        '/participant-ai-lab-math/submodule-01/topic-04': CONTENT[4].route.slice(1),
        '/participant-ai-lab-math/submodule-01/topic-05': CONTENT[5].route.slice(1),
        '/participant-ai-lab-math/submodule-01/topic-06': CONTENT[6].route.slice(1),
        '/participant-ai-lab-math/submodule-01/topic-07': CONTENT[7].route.slice(1),
        '/participant-ai-lab-math/submodule-01/practice': CONTENT[8].route.slice(1),
        '/participant-ai-lab-math/submodule-01/quiz': CONTENT[9].route.slice(1),
        '/participant-ai-lab-math/submodule-01/discussion': CONTENT[10].route.slice(1),
        '/participant-ai-lab-math/submodule-01/references': CONTENT[11].route.slice(1)
    });

    let renderSequence = 0;
    let pageAbort = null;

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function currentPath() {
        const path = (window.location.hash || '#/').slice(1).split('?')[0];
        return LEGACY_ROUTES[path] || path;
    }

    function getCurrentItem() {
        const path = currentPath();
        return CONTENT.find(item => item.route.slice(1) === path) || CONTENT[0];
    }

    function readState() {
        try {
            const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
            return { completed: Array.isArray(value.completed) ? value.completed : [] };
        } catch (error) {
            return { completed: [] };
        }
    }

    function writeState(state) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed: [...new Set(state.completed)] }));
    }

    function markComplete(id) {
        const state = readState();
        if (!state.completed.includes(id)) state.completed.push(id);
        writeState(state);
        return state;
    }

    function renderOverviewProgress() {
        const page = document.querySelector('.math-course-overview');
        if (!page) return;

        const state = readState();
        const completed = CONTENT.filter(item => state.completed.includes(item.id));
        const progress = Math.round(completed.length / CONTENT.length * 100);
        const firstIncomplete = CONTENT.find(item => !state.completed.includes(item.id));
        const action = page.querySelector('[data-math-overview-action]');
        const progressCopy = page.querySelector('[data-math-overview-copy]');
        const donut = page.querySelector('[data-math-overview-donut]');

        page.querySelectorAll('[data-math-overview-progress], [data-math-overview-side-progress]').forEach(node => {
            node.textContent = `${progress}%`;
        });
        page.querySelector('[data-math-overview-bar]')?.style.setProperty('--value', `${progress}%`);

        if (donut) {
            donut.style.setProperty('--completed-end', `${progress}%`);
            donut.style.setProperty('--started-end', `${progress}%`);
            donut.setAttribute('aria-label', `Progres preview Submodul 01: ${progress} persen`);
        }

        if (progressCopy) {
            progressCopy.textContent = completed.length
                ? `${completed.length} dari ${CONTENT.length} bagian selesai di perangkat ini.`
                : `${CONTENT.length} bagian belajar siap dijelajahi di perangkat ini.`;
        }

        if (action) {
            action.href = firstIncomplete?.route || CONTENT[0].route;
            action.innerHTML = firstIncomplete
                ? `Lanjutkan Submodul 01 <i class="fas fa-play" aria-hidden="true"></i>`
                : `Buka Kembali Submodul 01 <i class="fas fa-rotate-right" aria-hidden="true"></i>`;
        }

        if (completed.length === CONTENT.length) {
            page.querySelector('[data-math-submodule="01"]')?.classList.add('done');
        }
    }

    function loadScriptOnce(src, key) {
        if (document.querySelector(`script[data-math-runtime="${key}"]`)) {
            return new Promise((resolve, reject) => {
                const existing = document.querySelector(`script[data-math-runtime="${key}"]`);
                if (existing.dataset.ready === 'true') return resolve();
                existing.addEventListener('load', resolve, { once: true });
                existing.addEventListener('error', reject, { once: true });
            });
        }
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.dataset.mathRuntime = key;
            script.onload = () => {
                script.dataset.ready = 'true';
                resolve();
            };
            script.onerror = () => reject(new Error(`Asset ${key} gagal dimuat.`));
            document.head.appendChild(script);
        });
    }

    function ensureRuntime() {
        const tasks = [];
        if (!window.marked) tasks.push(loadScriptOnce(`/vendor/marked/marked.umd.js?v=18.0.9`, 'marked'));
        if (!window.katex) tasks.push(loadScriptOnce(`/vendor/katex/katex.min.js?v=0.18.3`, 'katex'));
        return Promise.all(tasks).then(() => {
            if (!window.marked || !window.katex) throw new Error('Markdown atau KaTeX runtime tidak tersedia.');
        });
    }

    function extractTitle(markdown, fallback) {
        const matches = [...String(markdown).matchAll(/^#\s+(.+)$/gm)];
        if (!matches.length) return fallback;
        if (/^00\s*[—-]/.test(matches[0][1]) && matches[1]) return matches[1][1].trim();
        return matches[0][1].trim();
    }

    function extractMeta(markdown) {
        const meta = {};
        const block = String(markdown).split('\n').slice(0, 16);
        block.forEach(line => {
            const match = line.match(/^>\s*\*\*([^*]+):\*\*\s*(.+?)\s{0,2}$/);
            if (match) meta[match[1].trim().toLowerCase()] = match[2].replace(/\s{2,}$/, '').trim();
        });
        return meta;
    }

    function extractLead(markdown, fallback) {
        const lines = String(markdown).split('\n');
        let pastMetadata = false;
        for (const rawLine of lines) {
            const line = rawLine.trim();
            if (line === '---') {
                pastMetadata = true;
                continue;
            }
            if (!pastMetadata || !line || /^(#|>|[-*+]\s|\d+\.\s|\$\$|```)/.test(line)) continue;
            return line
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
                .replace(/[*_`]/g, '')
                .replace(/\[R\d+\]/g, '')
                .trim();
        }
        return fallback;
    }

    function extractInteractiveSpecs(markdown) {
        const lines = String(markdown).split('\n');
        const specs = [];
        const kept = [];
        for (let index = 0; index < lines.length;) {
            const marker = lines[index].match(/^##\s+\[(STATIC VISUAL|INTERACTIVE VISUAL|NUMBER MANIPULATOR|COMPARE VIEW|STEP-BY-STEP REVEAL)\]\s+(.+)$/);
            if (!marker) {
                kept.push(lines[index]);
                index += 1;
                continue;
            }
            const specLines = [lines[index]];
            index += 1;
            while (index < lines.length && !/^##\s+\[(STATIC VISUAL|INTERACTIVE VISUAL|NUMBER MANIPULATOR|COMPARE VIEW|STEP-BY-STEP REVEAL)\]/.test(lines[index]) && !/^#\s+/.test(lines[index])) {
                specLines.push(lines[index]);
                index += 1;
            }
            specs.push({ type: marker[1], title: marker[2].trim(), source: specLines.join('\n') });
            kept.push('', `HERAI_INTERACTIVE_${specs.length - 1}`, '');
        }
        return { markdown: kept.join('\n'), specs };
    }

    function extractDiagnostic(markdown) {
        const source = String(markdown);
        const section = source.match(/^#\s+6\.\s+Diagnostic Ringan\s*\n([\s\S]*?)(?=\n---\s*\n\n#\s+7\.)/m);
        if (!section) return { markdown: source, data: null };

        const body = section[1];
        const questionMatches = [...body.matchAll(/^##\s+(D\d+)\s*\n([\s\S]*?)(?=^##\s+D\d+\s*$|^###\s+Kunci Diagnostic\s*$)/gm)];
        const keyLine = (body.match(/^###\s+Kunci Diagnostic\s*\n+([^\n]+)/m) || [])[1] || '';
        const answers = Object.fromEntries(
            [...keyLine.matchAll(/(D\d+)\s+([A-D])/g)].map(match => [match[1], match[2]])
        );
        const questions = questionMatches.map(match => {
            const questionBody = match[2].trim();
            const optionMatches = [...questionBody.matchAll(/^([A-D])\.\s+(.+?)\s*$/gm)];
            const promptEnd = optionMatches[0]?.index ?? questionBody.length;
            return {
                id: match[1],
                prompt: questionBody.slice(0, promptEnd).trim(),
                options: optionMatches.map(option => ({ letter: option[1], text: option[2].trim() })),
                answer: answers[match[1]]
            };
        });

        const isComplete = questions.length === 10
            && questions.every(question => question.answer && question.options.length >= 2);
        if (!isComplete) {
            console.warn('[Math Learning] Diagnostic source tidak lengkap; fallback ke Markdown biasa.');
            return { markdown: source, data: null };
        }

        const introEnd = body.search(/^##\s+D1\s*$/m);
        return {
            markdown: source.replace(section[0], '\nHERAI_DIAGNOSTIC_BLOCK\n'),
            data: {
                intro: introEnd >= 0 ? body.slice(0, introEnd).trim() : '',
                questions
            }
        };
    }

    function removeAndShiftTitle(markdown) {
        let skippedPrimary = false;
        let skippedInfoLabel = false;
        let beforeBody = true;
        let fenced = false;
        return String(markdown).split('\n').map(line => {
            if (/^```/.test(line)) {
                fenced = !fenced;
                return line;
            }
            if (fenced) return line;
            if (beforeBody && /^#\s+/.test(line)) {
                if (!skippedPrimary && /^#\s+00\s*[—-]/.test(line)) {
                    skippedInfoLabel = true;
                    return '';
                }
                if (!skippedPrimary) {
                    skippedPrimary = true;
                    beforeBody = false;
                    return '';
                }
            }
            if (skippedInfoLabel && !skippedPrimary && line.trim() === '') return line;
            if (line.trim() && !/^>/.test(line) && !/^---$/.test(line)) beforeBody = false;
            const heading = line.match(/^(#{1,5})\s+(.+)$/);
            return heading ? `${heading[1]}# ${heading[2]}` : line;
        }).join('\n');
    }

    function protectMath(markdown) {
        const tokens = [];
        const lines = String(markdown).split('\n');
        let fenced = false;
        const output = [];
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
            const line = lines[lineIndex];
            if (/^\s*```/.test(line)) {
                fenced = !fenced;
                output.push(line);
                continue;
            }
            if (fenced) {
                output.push(line);
                continue;
            }
            if (line.trim() === '$$') {
                const expressionLines = [];
                let closingIndex = lineIndex + 1;
                while (closingIndex < lines.length && lines[closingIndex].trim() !== '$$') {
                    expressionLines.push(lines[closingIndex]);
                    closingIndex += 1;
                }
                if (closingIndex < lines.length) {
                    const token = `HERAI_MATH_${tokens.length}_DISPLAY`;
                    tokens.push({ token, expression: expressionLines.join('\n').trim(), display: true });
                    output.push('', token, '');
                    lineIndex = closingIndex;
                    continue;
                }
            }
            let result = '';
            let cursor = 0;
            let inlineCode = false;
            while (cursor < line.length) {
                const char = line[cursor];
                if (char === '`' && line[cursor - 1] !== '\\') {
                    inlineCode = !inlineCode;
                    result += char;
                    cursor += 1;
                    continue;
                }
                if (!inlineCode && char === '$' && line[cursor - 1] !== '\\') {
                    const display = line[cursor + 1] === '$';
                    const delimiter = display ? '$$' : '$';
                    const start = cursor + delimiter.length;
                    let end = start;
                    while (end < line.length) {
                        if (line.startsWith(delimiter, end) && line[end - 1] !== '\\') break;
                        end += 1;
                    }
                    if (end < line.length) {
                        const expression = line.slice(start, end);
                        const token = `HERAI_MATH_${tokens.length}_${display ? 'DISPLAY' : 'INLINE'}`;
                        tokens.push({ token, expression, display });
                        result += token;
                        cursor = end + delimiter.length;
                        continue;
                    }
                }
                result += char;
                cursor += 1;
            }
            output.push(result);
        }
        return { markdown: output.join('\n'), tokens };
    }

    function renderKatex(expression, display) {
        try {
            const html = window.katex.renderToString(expression, {
                displayMode: display,
                throwOnError: true,
                output: 'htmlAndMathml',
                strict: 'warn',
                trust: false
            });
            return display
                ? `<div class="math-learning-math-display" data-katex-source="${escapeHtml(expression)}">${html}</div>`
                : `<span class="math-learning-math-inline" data-katex-source="${escapeHtml(expression)}">${html}</span>`;
        } catch (error) {
            console.error('[Math Learning] KaTeX render failed:', expression, error);
            return `<span class="math-learning-math-error" title="Formula gagal dirender">${escapeHtml(expression)}</span>`;
        }
    }

    function renderMarkdown(markdown, interactiveSpecs) {
        const math = protectMath(markdown);
        let html = window.marked.parse(math.markdown, { gfm: true, breaks: false, pedantic: false });
        math.tokens.forEach(item => {
            const rendered = renderKatex(item.expression, item.display);
            html = html.replace(`<p>${item.token}</p>`, rendered).replaceAll(item.token, rendered);
        });
        interactiveSpecs.forEach((_spec, index) => {
            const token = `HERAI_INTERACTIVE_${index}`;
            html = html.replace(`<p>${token}</p>`, `<div data-math-interactive="${index}"></div>`).replaceAll(token, `<div data-math-interactive="${index}"></div>`);
        });
        html = html.replace('<p>HERAI_DIAGNOSTIC_BLOCK</p>', '<div data-math-diagnostic></div>');
        return html;
    }

    function mountDiagnostic(container, diagnostic) {
        const placeholder = container.querySelector('[data-math-diagnostic]');
        if (!placeholder || !diagnostic?.questions?.length) return;

        const section = document.createElement('section');
        section.className = 'math-learning-diagnostic';
        section.setAttribute('aria-labelledby', 'mathDiagnosticTitle');
        section.innerHTML = `
            <div class="math-learning-diagnostic-heading">
                <span><i class="fas fa-route" aria-hidden="true"></i> Cek kesiapan awal</span>
                <h2 id="mathDiagnosticTitle">6. Diagnostic Ringan</h2>
            </div>
            <div class="math-learning-diagnostic-intro">${renderMarkdown(diagnostic.intro, [])}</div>
            <form class="math-learning-diagnostic-list" data-diagnostic-form novalidate>
                ${diagnostic.questions.map(question => `
                    <fieldset class="math-learning-diagnostic-question" data-diagnostic-question="${question.id}">
                        <legend class="math-learning-visually-hidden">Pertanyaan ${question.id}</legend>
                        <div class="math-learning-diagnostic-prompt">
                            <span aria-hidden="true">${escapeHtml(question.id)}</span>
                            <div>${renderMarkdown(question.prompt, [])}</div>
                        </div>
                        <div class="math-learning-diagnostic-options">
                            ${question.options.map(option => `
                                <label class="math-learning-diagnostic-option">
                                    <input type="radio" name="diagnostic-${question.id}" value="${option.letter}">
                                    <span class="math-learning-diagnostic-letter" aria-hidden="true">${option.letter}</span>
                                    <div>${renderMarkdown(option.text, [])}</div>
                                </label>`).join('')}
                        </div>
                        <p class="math-learning-diagnostic-feedback" data-diagnostic-feedback aria-live="polite"></p>
                    </fieldset>`).join('')}
                <div class="math-learning-diagnostic-actions">
                    <button class="math-learning-action is-primary" type="submit">Periksa jawaban</button>
                    <button class="math-learning-action" type="reset">Ulangi diagnostic</button>
                </div>
                <div class="math-learning-diagnostic-result" data-diagnostic-result role="status" aria-live="polite" hidden></div>
            </form>`;
        placeholder.replaceWith(section);

        const form = section.querySelector('[data-diagnostic-form]');
        const result = section.querySelector('[data-diagnostic-result]');
        const submit = form.querySelector('button[type="submit"]');

        const clearReview = () => {
            section.querySelectorAll('.math-learning-diagnostic-option').forEach(option => {
                option.classList.remove('is-correct', 'is-incorrect');
            });
            section.querySelectorAll('[data-diagnostic-feedback]').forEach(feedback => {
                feedback.className = 'math-learning-diagnostic-feedback';
                feedback.replaceChildren();
            });
            result.hidden = true;
            result.className = 'math-learning-diagnostic-result';
            result.replaceChildren();
            submit.textContent = 'Periksa jawaban';
        };

        form.addEventListener('change', clearReview);
        form.addEventListener('submit', event => {
            event.preventDefault();
            const unanswered = diagnostic.questions.find(question => !form.querySelector(`input[name="diagnostic-${question.id}"]:checked`));
            if (unanswered) {
                const fieldset = form.querySelector(`[data-diagnostic-question="${unanswered.id}"]`);
                result.hidden = false;
                result.className = 'math-learning-diagnostic-result is-warning';
                result.innerHTML = `<i class="fas fa-circle-exclamation" aria-hidden="true"></i><div><strong>Masih ada yang kosong</strong><p>Jawab seluruh 10 pertanyaan sebelum melihat hasil diagnostic.</p></div>`;
                fieldset?.querySelector('input')?.focus();
                fieldset?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            let correct = 0;
            diagnostic.questions.forEach(question => {
                const fieldset = form.querySelector(`[data-diagnostic-question="${question.id}"]`);
                const selected = fieldset.querySelector('input:checked');
                const correctInput = fieldset.querySelector(`input[value="${question.answer}"]`);
                const feedback = fieldset.querySelector('[data-diagnostic-feedback]');
                const isCorrect = selected.value === question.answer;
                if (isCorrect) correct += 1;
                correctInput.closest('label').classList.add('is-correct');
                if (!isCorrect) selected.closest('label').classList.add('is-incorrect');
                feedback.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
                feedback.innerHTML = isCorrect
                    ? '<i class="fas fa-circle-check" aria-hidden="true"></i><strong>Benar.</strong>'
                    : `<i class="fas fa-circle-xmark" aria-hidden="true"></i><strong>Belum tepat.</strong> Jawaban yang benar: ${question.answer}.`;
            });

            const path = correct <= 4 ? 'Foundation Path' : (correct <= 7 ? 'Standard Path' : 'Accelerated Path');
            result.hidden = false;
            result.className = 'math-learning-diagnostic-result is-complete';
            result.innerHTML = `<div class="math-learning-diagnostic-score"><strong>${correct}<span>/10</span></strong><small>Jawaban benar</small></div><div><span>Rekomendasi awal</span><h3>${path}</h3><p>Diagnostic ini bukan tes kelulusan. Gunakan hasilnya untuk memilih jalur belajar pada bagian berikutnya.</p></div>`;
            submit.textContent = `Skor ${correct}/10`;
            result.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        form.addEventListener('reset', () => {
            window.setTimeout(() => {
                clearReview();
                form.querySelector('input')?.focus();
            }, 0);
        });
    }

    function slugify(value) {
        return String(value).toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 90);
    }

    function enhanceMarkdown(container, specs) {
        container.querySelectorAll('h2, h3, h4').forEach((heading, index) => {
            if (!heading.id) heading.id = `${slugify(heading.textContent) || 'bagian'}-${index + 1}`;
        });
        container.querySelectorAll('table').forEach(table => {
            if (table.parentElement?.classList.contains('math-learning-table-wrap')) return;
            const wrapper = document.createElement('div');
            wrapper.className = 'math-learning-table-wrap';
            wrapper.tabIndex = 0;
            wrapper.setAttribute('role', 'region');
            wrapper.setAttribute('aria-label', 'Tabel materi, dapat digulir horizontal');
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
        container.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href') || '';
            if (/^https?:\/\//i.test(href)) {
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            }
        });
        specs.forEach((spec, index) => {
            const placeholder = container.querySelector(`[data-math-interactive="${index}"]`);
            if (placeholder) placeholder.replaceWith(createInteractive(spec));
        });
        collapseAuthoringSections(container);
        if (getCurrentItem().type === 'practice') collapseExerciseSupport(container);
    }

    function collapseAuthoringSections(container) {
        const headings = [...container.querySelectorAll('h2')];
        headings.forEach(heading => {
            if (!/QA Notes|STOP CHECKPOINT/i.test(heading.textContent)) return;
            const details = document.createElement('details');
            details.className = 'math-learning-author-note';
            const summary = document.createElement('summary');
            summary.innerHTML = '<i class="fas fa-shield-check" aria-hidden="true"></i> Catatan QA sumber akademik';
            const body = document.createElement('div');
            body.className = 'math-learning-author-note-body';
            heading.parentNode.insertBefore(details, heading);
            details.append(summary, body);
            let node = heading;
            while (node && (node === heading || node.tagName !== 'H2')) {
                const next = node.nextSibling;
                body.appendChild(node);
                node = next;
            }
        });
    }

    function collapseExerciseSupport(container) {
        const labels = /Staged Hints|Expected Reasoning|Strong Answer Example|Common Mistakes/i;
        [...container.querySelectorAll('h3')].forEach(heading => {
            if (!labels.test(heading.textContent)) return;
            const details = document.createElement('details');
            details.className = 'math-learning-reveal';
            const summary = document.createElement('summary');
            summary.innerHTML = `<i class="fas fa-eye" aria-hidden="true"></i> ${escapeHtml(heading.textContent)}`;
            const body = document.createElement('div');
            body.className = 'math-learning-reveal-body';
            heading.parentNode.insertBefore(details, heading);
            details.append(summary, body);
            let node = heading.nextSibling;
            heading.remove();
            while (node && !['H2', 'H3'].includes(node.tagName)) {
                const next = node.nextSibling;
                body.appendChild(node);
                node = next;
            }
        });
    }

    function iconForInteractive(type) {
        if (type === 'NUMBER MANIPULATOR') return 'fa-sliders';
        if (type === 'COMPARE VIEW') return 'fa-code-compare';
        if (type === 'STEP-BY-STEP REVEAL') return 'fa-list-ol';
        return 'fa-hand-pointer';
    }

    function interactiveSpecField(source, label) {
        const pattern = new RegExp(`\\*\\*${label}:\\*\\*\\s*`, 'i');
        const match = pattern.exec(source);
        if (!match) return '';
        const remainder = source.slice(match.index + match[0].length);
        const nextLabel = remainder.search(/\n\*\*[^*\n]+:\*\*/);
        return (nextLabel >= 0 ? remainder.slice(0, nextLabel) : remainder).trim();
    }

    function interactiveShell(spec, body) {
        const section = document.createElement('section');
        section.className = 'math-learning-interactive';
        section.dataset.interactiveTitle = spec.title;
        const purpose = interactiveSpecField(spec.source, 'Learning purpose');
        const action = interactiveSpecField(spec.source, 'Learner action');
        const guidance = purpose || action ? `
            <div class="math-learning-interactive-guidance">
                ${purpose ? `<div><strong>Tujuan belajar</strong>${renderMarkdown(purpose, [])}</div>` : ''}
                ${action ? `<div><strong>Yang kamu lakukan</strong>${renderMarkdown(action, [])}</div>` : ''}
            </div>` : '';
        section.innerHTML = `
            <header class="math-learning-interactive-head">
                <div class="math-learning-interactive-icon"><i class="fas ${iconForInteractive(spec.type)}" aria-hidden="true"></i></div>
                <div><span>${escapeHtml(spec.type.replaceAll('-', ' '))}</span><h3>${escapeHtml(spec.title)}</h3></div>
            </header>
            ${guidance}
            <div class="math-learning-interactive-body">${body}</div>
            <div class="math-learning-feedback" data-feedback aria-live="polite">Eksplorasi komponen untuk melihat hubungan konsepnya.</div>`;
        return section;
    }

    function createInteractive(spec) {
        const key = slugify(spec.title);
        const section = interactiveShell(spec, interactiveTemplate(key));
        bindInteractive(section, key);
        return section;
    }

    function mathHtml(expression, display) {
        return renderKatex(expression, Boolean(display));
    }

    function interactiveTemplate(key) {
        const templates = interactiveTemplates();
        return templates[key] || `
            <p>Gunakan panel ini untuk memprediksi hasil terlebih dahulu, lalu buka interpretasi yang disediakan.</p>
            <div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-generic-reveal>Buka interpretasi</button></div>`;
    }

    function interactiveTemplates() {
        return {
            'real-world-representation': `<div class="math-learning-compare"><div class="math-learning-interactive-card"><h4>Alya di dunia nyata</h4><p>Seorang peserta dengan konteks, pengalaman, dan keadaan yang tidak sepenuhnya tertangkap sistem.</p></div><div class="math-learning-interactive-card"><h4>Yang direkam sistem</h4><ol data-representation-list></ol></div></div><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-representation-next>Lihat apa yang direkam sistem</button></div>`,
            'rich-vs-compressed-representation': `<div class="math-learning-compare"><div class="math-learning-interactive-card"><h4>Representasi kaya</h4><strong>Quiz Score = 8/10</strong></div><div class="math-learning-interactive-card"><h4>Representasi ringkas</h4><strong>Quiz Result = Pass</strong></div></div><div class="math-learning-button-row">${['Berapa jawaban benar?','Apakah peserta lulus?','Bisakah membedakan 6/10 dan 10/10 jika keduanya Pass?'].map((q,i)=>`<button class="math-learning-choice" type="button" data-rich-question="${i}">${q}</button>`).join('')}</div>`,
            'does-this-number-behave-like-a-number': roleSorter(['45 minutes','8 correct answers','55281 postal code','Basic = 1','Medium = 2','High = 3'], ['Quantitative','Categorical / label','Needs context']),
            'encoding-trap': `${mathHtml('Red=1,\\quad Green=2,\\quad Blue=3', true)}${mathHtml('3-1=2', true)}<p>Apakah biru dua unit lebih jauh dari merah secara warna?</p><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-generic-reveal>Periksa kesimpulan</button></div>`,
            'what-does-one-row-mean': `<div class="math-learning-button-row"><button class="math-learning-choice" type="button" data-row-unit="participant">Participant</button><button class="math-learning-choice" type="button" data-row-unit="session">Study Session</button></div><div class="math-learning-chip-list" data-row-output></div>`,
            'column-role-sorter': roleSorter(['participant_id','quiz_correct','quiz_total','completion_done','study_duration_min','mastery_after_material'], ['Identifier','Candidate Feature','Target','Context / Needs Task Definition']),
            'features-prediction-vs-target': stepTemplate(['Features Alya: quiz = 8, completion = 6, duration = 45','Model memproses features', mathHtml('\\hat{y}^{(1)}=\\text{Yes}', true) + '<p>Model Prediction</p>', mathHtml('y^{(1)}=\\text{Yes}', true) + '<p>Observed Target — tetap berbeda peran walau nilainya sama.</p>']),
            'same-column-different-task': compareReveal('Predict mastery','study_duration → Feature','Predict next-session duration','study_duration_next → Target','Role sebuah field bergantung pada problem definition.'),
            'time-travel-feature-trap': choiceCheck(['previous_quiz_score','previous_completion','previous_study_duration','post_material_quiz_score'], 'Pilih data yang tersedia sebelum material dimulai.'),
            'fraction-decimal-percentage': `<div class="math-learning-control-grid"><label class="math-learning-control">Numerator<input type="number" min="0" step="1" value="6" data-fraction-num></label><label class="math-learning-control">Denominator<input type="number" min="1" step="1" value="8" data-fraction-den></label></div><div class="math-learning-equation-result" data-fraction-output></div>`,
            'denominator-matters': choiceReveal(['6/8','7/10'],'Mana proporsi yang lebih besar?','6/8 = 75%, sedangkan 7/10 = 70%. Bandingkan proporsi, bukan hanya pembilang.'),
            'same-numerator-different-whole': compareReveal('8/10','Belum dikonversi','8/20','Belum dikonversi','8/10 = 80%, sedangkan 8/20 = 40%. Denominator mengubah whole.'),
            '075-vs-075': stepTemplate(['0.75 dan 0.75% terlihat mirip','0.75 = 75%', '0.75% = 0.0075','Keduanya berbeda dengan faktor 100.']),
            'same-percentage-different-denominator': compareReveal('1/1','100%','100/100','100%','Persentase sama, tetapi evidence masing-masing berasal dari denominator 1 dan 100.'),
            'meaning-tagger': roleSorter(['completion = 0.75','similarity_score = 0.75','normalized_feature = 0.75','predicted_probability = 0.75'], ['Boleh dibaca 75% chance','Tidak otomatis probability']),
            'from-data-to-symbol': stepTemplate(['Quiz ratio Alya = 0.80', mathHtml('q=0.80', true), 'Completion ratio Alya = 0.75', mathHtml('c=0.75', true), 'Symbol memberi nama ringkas pada quantity; maknanya tetap harus didefinisikan.']),
            'expression-builder': `<div class="math-learning-chip-list" data-expression-palette>${['0.6','q','+','0.4','c'].map(v=>`<button class="math-learning-chip" type="button" data-expression-token="${v}">${v}</button>`).join('')}</div><div class="math-learning-equation-result" data-expression-output>...</div><div class="math-learning-button-row"><button class="math-learning-action" type="button" data-expression-reset>Reset</button><button class="math-learning-action is-primary" type="button" data-expression-check>Periksa expression</button></div>`,
            'substitution-engine': stepTemplate([mathHtml('s=0.6q+0.4c', true), mathHtml('s=0.6(0.80)+0.4(0.75)', true), mathHtml('s=0.48+0.30', true), mathHtml('s=0.78', true)]),
            'change-one-input': scoreManipulator(false),
            'change-the-coefficients': scoreManipulator(true),
            'expression-vs-equation': compareReveal('Expression','0.6q + 0.4c','Equation','s = 0.6q + 0.4c','Equation memiliki equality; expression tidak membuat pernyataan equality.'),
            'mathematics-vs-programming-assignment': compareReveal('Mathematical equation','x = x + 1','Possible programming assignment','x = x + 1','Dalam matematika equality ini tidak mungkin untuk bilangan biasa; dalam program, bentuk yang sama dapat berarti update nilai.'),
            'function-machine': `<label class="math-learning-control">Input<input type="number" value="3" data-function-input></label><div class="math-learning-interactive-grid"><div class="math-learning-interactive-card"><h4>Rule</h4><p>× 2, lalu + 1</p></div><div class="math-learning-interactive-card"><h4>Output</h4><strong data-function-output>?</strong></div></div><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-function-run>Run function</button></div>`,
            'one-input-one-output': oneInputOutputTemplate(),
            'function-notation-vs-multiplication': compareReveal('Function evaluation','f(x)','Multiplication','f × x','Parentheses pada f(x) berarti function f dievaluasi pada input x.'),
            'formula-table': formulaTableTemplate(),
            'herai-one-input-function': oneInputFunctionTemplate(),
            'herai-two-input-function': twoInputFunctionTemplate(),
            'same-input-different-rule': compareReveal('f(x)=2x+1','f(3)=7','g(x)=4x+1','g(3)=13','Input sama dapat menghasilkan output berbeda ketika rule berbeda.'),
            'table-to-ordered-pairs': stepTemplate(['q=0.0 → r(q)=0.20','(0.0, 0.20)','q=0.2 → r(q)=0.30','(0.2, 0.30)','q=0.8 → r(q)=0.60','(0.8, 0.60)','Ordered pairs ini akan menjadi points pada coordinate plane.']),
            'coordinate-plane-basics': coordinateTemplate(),
            'table-points-graph': graphRevealTemplate(),
            'rise-and-run': riseRunTemplate(),
            'average-rate-of-change': averageRateTemplate(),
            'same-data-different-axis-scale': axisScaleTemplate(),
            'hold-completion-fixed': holdCompletionTemplate(),
            'positive-negative-zero-slope': slopeTemplate(),
            'average-vs-instantaneous': stepTemplate(['Dua points pada curve menentukan sebuah secant.','Average rate dibaca di antara dua points.','Jika kedua points dibuat makin dekat, kita mendekati pertanyaan tentang perubahan pada satu saat.','Derivative formal baru akan dipelajari di Calculus.']),
            'power-builder': powerTemplate(),
            '2x-vs-x2': coefficientExponentTemplate(),
            'exponent-logarithm': exponentLogTemplate(),
            'anatomy-of-sigma': stepTemplate([mathHtml('\\sum_{i=1}^{4}x_i', true),'Σ adalah operation','i adalah index','1 dan 4 adalah lower/upper bounds',mathHtml('x_i', true) + '<p>adalah term</p>',mathHtml('x_1+x_2+x_3+x_4', true)]),
            'sigma-calculator': sigmaTemplate(),
            'square-of-sum-vs-sum-of-squares': squareSumTemplate(),
            'read-a-future-ai-formula': stepTemplate([mathHtml('\\frac{1}{n}\\sum_{i=1}^{n}(y^{(i)}-\\hat{y}^{(i)})^2', true),'Baca selisih target dan prediction.','Square setiap selisih.','Sum across observations.','Divide by n.','Formula panjang dapat dibaca sebagai urutan operasi, bukan satu blok simbol.'])
        };
    }

    function roleSorter(cards, roles) {
        return `<div class="math-learning-interactive-grid">${cards.map((card,index)=>`<label class="math-learning-control"><span><code>${escapeHtml(card)}</code></span><select data-role-card="${index}"><option value="">Pilih peran…</option>${roles.map(role=>`<option>${escapeHtml(role)}</option>`).join('')}</select></label>`).join('')}</div><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-role-check>Periksa reasoning</button></div>`;
    }

    function stepTemplate(steps) {
        return `<div class="math-learning-interactive-card" data-step-stage>${steps[0]}</div><div class="math-learning-button-row"><button class="math-learning-step-button" type="button" data-step-next data-steps="${escapeHtml(JSON.stringify(steps))}">Buka langkah berikutnya</button></div>`;
    }

    function compareReveal(leftTitle, leftBody, rightTitle, rightBody, feedback) {
        return `<div class="math-learning-compare"><div class="math-learning-interactive-card"><h4>${escapeHtml(leftTitle)}</h4><p>${escapeHtml(leftBody)}</p></div><div class="math-learning-interactive-card"><h4>${escapeHtml(rightTitle)}</h4><p>${escapeHtml(rightBody)}</p></div></div><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-compare-reveal data-message="${escapeHtml(feedback)}">Buka interpretasi</button></div>`;
    }

    function choiceReveal(options, prompt, feedback) {
        return `<p>${escapeHtml(prompt)}</p><div class="math-learning-button-row">${options.map((option,index)=>`<button class="math-learning-choice" type="button" data-choice-reveal="${index}" data-message="${escapeHtml(feedback)}">${escapeHtml(option)}</button>`).join('')}</div>`;
    }

    function choiceCheck(cards, prompt) {
        return `<p>${escapeHtml(prompt)}</p><div class="math-learning-chip-list">${cards.map((card,index)=>`<label class="math-learning-chip"><input type="checkbox" data-time-card="${index}"> ${escapeHtml(card)}</label>`).join('')}</div><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-time-check>Periksa pilihan</button></div>`;
    }

    function scoreManipulator(weights) {
        return `<div class="math-learning-control-grid">${weights ? '<label class="math-learning-control">Quiz weight <input type="range" min="0" max="1" step="0.05" value="0.6" data-score-wq></label><label class="math-learning-control">Completion weight <input type="range" min="0" max="1" step="0.05" value="0.4" data-score-wc></label><label class="math-learning-control"><span><input type="checkbox" checked data-score-lock> Jaga total weights = 1</span></label>' : '<label class="math-learning-control">Completion ratio c <input type="range" min="0" max="1" step="0.05" value="0.75" data-score-c></label>'}</div><div class="math-learning-equation-result" data-score-output></div>`;
    }

    function oneInputOutputTemplate() {
        return `<div class="math-learning-interactive-grid">${[1,2,3].map(n=>`<label class="math-learning-control">Input ${n}<select data-function-map="${n}">${[4,5,6].map(v=>`<option>${v}</option>`).join('')}</select></label>`).join('')}</div><label class="math-learning-control"><span><input type="checkbox" data-function-conflict> Hubungkan input 2 ke output kedua juga</span></label>`;
    }

    function formulaTableTemplate() {
        return `<label class="math-learning-control">x = <input type="range" min="-5" max="5" step="1" value="0" data-table-x></label><div class="math-learning-equation-result" data-table-result></div><div class="math-learning-table-wrap"><table><thead><tr><th>x</th><th>f(x)=2x+1</th></tr></thead><tbody data-function-table></tbody></table></div>`;
    }

    function oneInputFunctionTemplate() {
        return `<label class="math-learning-control">Quiz ratio q <input type="range" min="0" max="1" step="0.1" value="0.4" data-one-q></label><div class="math-learning-equation-result" data-one-output></div>`;
    }

    function twoInputFunctionTemplate() {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">Quiz ratio q <input type="range" min="0" max="1" step="0.05" value="0.8" data-two-q></label><label class="math-learning-control">Completion ratio c <input type="range" min="0" max="1" step="0.05" value="0.75" data-two-c></label></div><div class="math-learning-equation-result" data-two-output></div><p class="math-learning-preview-note">Toy instructional score—bukan probability, confidence, atau production recommendation.</p>`;
    }

    function coordinateTemplate() {
        return `<svg class="math-learning-svg" viewBox="0 0 420 300" role="img" aria-label="Bidang koordinat interaktif"><line class="axis" x1="30" y1="150" x2="390" y2="150"/><line class="axis" x1="210" y1="20" x2="210" y2="280"/><line class="guide" data-guide-x/><line class="guide" data-guide-y/><circle class="plot-point" cx="282" cy="72" r="11" tabindex="0" data-drag-point/><text x="375" y="143">x</text><text x="218" y="32">y</text></svg><div class="math-learning-equation-result" data-coordinate-output>(2, 3)</div>`;
    }

    function graphRevealTemplate() {
        return `<div class="math-learning-table-wrap"><table><thead><tr><th>q</th><th>r(q)</th></tr></thead><tbody>${[[0,.2],[.2,.3],[.4,.4],[.6,.5],[.8,.6]].map(row=>`<tr><td>${row[0].toFixed(1)}</td><td>${row[1].toFixed(2)}</td></tr>`).join('')}</tbody></table></div><svg class="math-learning-svg" viewBox="0 0 420 280" data-graph-reveal aria-label="Graph points dari table"></svg><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-graph-next>Plot point berikutnya</button></div>`;
    }

    function riseRunTemplate() {
        return `<svg class="math-learning-svg" viewBox="0 0 420 280" role="img" aria-label="Rise and run dari titik 2,5 ke 6,13"><line class="axis" x1="35" y1="245" x2="390" y2="245"/><line class="axis" x1="35" y1="20" x2="35" y2="245"/><polyline class="plot-line" points="105,170 245,170 245,60"/><circle class="plot-point" cx="105" cy="170" r="7"/><circle class="plot-point" cx="245" cy="60" r="7"/><text x="145" y="190">Δx = 4</text><text x="255" y="120">Δy = 8</text></svg><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-generic-reveal>Hitung rate</button></div>`;
    }

    function averageRateTemplate() {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">x₁<input type="number" value="1" step="0.5" data-rate-x1></label><label class="math-learning-control">x₂<input type="number" value="3" step="0.5" data-rate-x2></label></div><div class="math-learning-equation-result" data-rate-output></div>`;
    }

    function axisScaleTemplate() {
        return `<div class="math-learning-compare"><div class="math-learning-interactive-card"><h4>Axis 0–100</h4><svg class="math-learning-svg" viewBox="0 0 260 160"><polyline class="plot-line" points="30,130 125,128 220,126"/><text x="10" y="25">100</text><text x="18" y="140">0</text></svg></div><div class="math-learning-interactive-card"><h4>Axis 78–82</h4><svg class="math-learning-svg" viewBox="0 0 260 160"><polyline class="plot-line" points="30,125 125,80 220,35"/><text x="10" y="25">82</text><text x="10" y="140">78</text></svg></div></div><div class="math-learning-button-row"><button class="math-learning-action is-primary" type="button" data-generic-reveal>Apakah datanya berubah?</button></div>`;
    }

    function holdCompletionTemplate() {
        return `<label class="math-learning-control">Quiz ratio q <input type="range" min="0" max="1" step="0.05" value="0.8" data-hold-q></label><svg class="math-learning-svg" viewBox="0 0 420 250" data-hold-graph aria-label="Graph toy formula saat completion ditahan 0.75"></svg><div class="math-learning-equation-result" data-hold-output></div><p class="math-learning-preview-note">Ini property toy formula, bukan causal effect.</p>`;
    }

    function slopeTemplate() {
        return `<div class="math-learning-interactive-grid">${[['increasing','Positive'],['decreasing','Negative'],['horizontal','Zero']].map(([kind,label])=>`<button class="math-learning-interactive-card math-learning-choice" type="button" data-slope="${kind}" data-label="${label}"><h4>${kind} line</h4><span>Pilih interpretasi</span></button>`).join('')}</div>`;
    }

    function powerTemplate() {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">Base a<input type="range" min="1" max="10" step="1" value="3" data-power-base></label><label class="math-learning-control">Exponent n<input type="range" min="1" max="6" step="1" value="4" data-power-exp></label></div><div class="math-learning-equation-result" data-power-output></div>`;
    }

    function coefficientExponentTemplate() {
        return `<label class="math-learning-control">x<input type="range" min="-5" max="5" step="1" value="3" data-coeff-x></label><div class="math-learning-compare"><div class="math-learning-interactive-card" data-coeff-left></div><div class="math-learning-interactive-card" data-coeff-right></div></div>`;
    }

    function exponentLogTemplate() {
        return `<div class="math-learning-control-grid"><label class="math-learning-control">Base<input type="range" min="2" max="10" step="1" value="2" data-log-base></label><label class="math-learning-control">Exponent<input type="range" min="1" max="6" step="1" value="3" data-log-exp></label></div><div class="math-learning-equation-result" data-log-output></div>`;
    }

    function sigmaTemplate() {
        return `<div class="math-learning-control-grid">${[2,5,3,10].map((value,index)=>`<label class="math-learning-control">x${index+1}<input type="number" value="${value}" data-sigma-value></label>`).join('')}</div><div class="math-learning-equation-result" data-sigma-output></div>`;
    }

    function squareSumTemplate() {
        return `<div class="math-learning-control-grid">${[1,2,3].map((value,index)=>`<label class="math-learning-control">x${index+1}<input type="number" value="${value}" data-square-value></label>`).join('')}</div><div class="math-learning-compare"><div class="math-learning-interactive-card" data-square-left></div><div class="math-learning-interactive-card" data-square-right></div></div>`;
    }

    function bindInteractive(section, key) {
        const feedback = section.querySelector('[data-feedback]');
        const say = (message, tone) => {
            feedback.textContent = message;
            feedback.className = `math-learning-feedback${tone ? ` is-${tone}` : ''}`;
        };
        bindCommonInteractive(section, key, say);
        bindNumericInteractive(section, key, say);
        bindGraphInteractive(section, key, say);
    }

    function bindCommonInteractive(section, key, say) {
        section.querySelector('[data-generic-reveal]')?.addEventListener('click', () => {
            const messages = {
                'encoding-trap': 'Tidak dapat disimpulkan. 1, 2, dan 3 adalah index kategori; jarak numeriknya tidak otomatis memiliki makna jarak warna.',
                'rise-and-run': 'Δy/Δx = 8/4 = 2 output units per input unit.',
                'same-data-different-axis-scale': 'Datanya tetap 79, 80, 81. Hanya visual scale yang berubah, sehingga steepness harus dibaca bersama axis.',
            };
            say(messages[key] || 'Interpretasi dibuka. Cocokkan hasil dengan makna quantity, bukan hanya bentuk angkanya.', 'success');
        });
        section.querySelectorAll('[data-compare-reveal]').forEach(button => button.addEventListener('click', () => say(button.dataset.message, 'success')));
        section.querySelectorAll('[data-choice-reveal]').forEach(button => button.addEventListener('click', () => {
            section.querySelectorAll('[data-choice-reveal]').forEach(item => item.classList.toggle('is-selected', item === button));
            say(button.dataset.message, 'success');
        }));
        const stepButton = section.querySelector('[data-step-next]');
        if (stepButton) {
            const steps = JSON.parse(stepButton.dataset.steps || '[]');
            let step = 0;
            stepButton.addEventListener('click', () => {
                step = Math.min(step + 1, steps.length - 1);
                section.querySelector('[data-step-stage]').innerHTML = steps.slice(0, step + 1).map(value => `<div class="math-learning-interactive-card">${value}</div>`).join('');
                stepButton.textContent = step === steps.length - 1 ? 'Semua langkah terbuka' : 'Buka langkah berikutnya';
                stepButton.disabled = step === steps.length - 1;
                if (step === steps.length - 1) say('Urutan lengkap terbuka. Baca setiap langkah sebagai perubahan yang terpisah.', 'success');
            });
        }
        if (key === 'real-world-representation') {
            const values = ['AI Interest = High','Python Readiness = Basic','Math Readiness = Medium','Quiz Score = 8/10','Completion = 6/8','Study Duration = 45 min'];
            let count = 0;
            section.querySelector('[data-representation-next]').addEventListener('click', event => {
                count = Math.min(count + 1, values.length);
                section.querySelector('[data-representation-list]').innerHTML = values.slice(0, count).map(value => `<li>${escapeHtml(value)}</li>`).join('');
                if (count === values.length) {
                    event.currentTarget.disabled = true;
                    say('Ini adalah representasi data tentang Alya, bukan Alya secara keseluruhan.', 'success');
                }
            });
        }
        if (key === 'rich-vs-compressed-representation') {
            const answers = ['Hanya representasi kaya yang mempertahankan jumlah benar 8/10.','Keduanya dapat menjawab status lulus.','Representasi Pass tidak dapat membedakan 6/10 dan 10/10 jika keduanya lulus.'];
            section.querySelectorAll('[data-rich-question]').forEach(button => button.addEventListener('click', () => say(answers[Number(button.dataset.richQuestion)], 'success')));
        }
        if (section.querySelector('[data-role-check]')) {
            section.querySelector('[data-role-check]').addEventListener('click', () => {
                const selected = [...section.querySelectorAll('[data-role-card]')].filter(select => select.value).length;
                if (!selected) return say('Pilih peran untuk minimal satu item terlebih dahulu.', 'warning');
                const special = key === 'does-this-number-behave-like-a-number'
                    ? 'Durasi dan jumlah benar adalah quantity. Postal code adalah identifier/kategori. Readiness code membutuhkan definisi scale sebelum jarak angkanya ditafsirkan.'
                    : key === 'meaning-tagger'
                        ? 'Hanya predicted_probability yang secara eksplisit boleh dibaca sebagai chance. Nilai 0.75 lain mengikuti semantics masing-masing.'
                        : 'Untuk task predict mastery: participant_id adalah identifier; mastery_after_material adalah target; metric lain hanya candidate feature/context sesuai definisi task.';
                say(special, 'success');
            });
        }
        if (key === 'what-does-one-row-mean') {
            section.querySelectorAll('[data-row-unit]').forEach(button => button.addEventListener('click', () => {
                const participant = button.dataset.rowUnit === 'participant';
                section.querySelectorAll('[data-row-unit]').forEach(item => item.classList.toggle('is-selected', item === button));
                const values = participant ? ['Alya','Bima','Citra'] : ['Alya · S1','Alya · S2','Bima · S1','Bima · S2','Citra · S1','Citra · S2'];
                section.querySelector('[data-row-output]').innerHTML = values.map(value => `<span class="math-learning-chip">${value}</span>`).join('');
                say(`Unit ${participant ? 'Participant menghasilkan 3 rows' : 'Study Session menghasilkan 6 rows'}. Jumlah observation bergantung pada unit analisis.`, 'success');
            }));
        }
        if (section.querySelector('[data-time-check]')) {
            section.querySelector('[data-time-check]').addEventListener('click', () => {
                const values = [...section.querySelectorAll('[data-time-card]')].map(input => input.checked);
                const correct = values[0] && values[1] && values[2] && !values[3];
                say(correct ? 'Tepat. Post-material quiz belum tersedia pada prediction time.' : 'Tinjau timeline: hanya previous_* fields yang tersedia sebelum material dimulai.', correct ? 'success' : 'warning');
            });
        }
        if (key === 'expression-builder') {
            let built = [];
            const output = section.querySelector('[data-expression-output]');
            section.querySelectorAll('[data-expression-token]').forEach(button => button.addEventListener('click', () => {
                built.push(button.dataset.expressionToken);
                output.textContent = built.join('');
            }));
            section.querySelector('[data-expression-reset]').addEventListener('click', () => { built = []; output.textContent = '...'; });
            section.querySelector('[data-expression-check]').addEventListener('click', () => say(built.join('') === '0.6q+0.4c' ? 'Tepat: dua coefficients, dua variables, dua terms, dan operator + membentuk expression.' : 'Susun token menjadi 0.6q+0.4c.', built.join('') === '0.6q+0.4c' ? 'success' : 'warning'));
        }
        if (key === 'one-input-one-output') {
            section.querySelector('[data-function-conflict]').addEventListener('change', event => say(event.currentTarget.checked ? 'Input 2 sekarang memiliki dua outputs: relation ini bukan function dari input tersebut.' : 'Setiap input kembali memiliki tepat satu output. Multiple inputs tetap boleh menuju output yang sama.', event.currentTarget.checked ? 'warning' : 'success'));
        }
        if (key === 'positive-negative-zero-slope') {
            section.querySelectorAll('[data-slope]').forEach(button => button.addEventListener('click', () => say(`${button.dataset.label} rate cocok dengan ${button.dataset.slope} line.`, 'success')));
        }
    }

    function bindNumericInteractive(section, key, say) {
        const updateFraction = () => {
            const numerator = Number(section.querySelector('[data-fraction-num]')?.value);
            const denominator = Number(section.querySelector('[data-fraction-den]')?.value);
            if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
                section.querySelector('[data-fraction-output]').textContent = 'Denominator harus berupa angka bukan nol.';
                return say('Denominator 0 tidak valid untuk fraction.', 'error');
            }
            const decimal = numerator / denominator;
            section.querySelector('[data-fraction-output]').innerHTML = mathHtml(`\\frac{${numerator}}{${denominator}}=${decimal.toFixed(4).replace(/0+$/,'').replace(/\.$/,'')}=${(decimal*100).toFixed(2).replace(/\.00$/,'')}\\%`, true);
            say('Fraction, decimal, dan percentage merepresentasikan proporsi yang sama.', 'success');
        };
        section.querySelectorAll('[data-fraction-num], [data-fraction-den]').forEach(input => input.addEventListener('input', updateFraction));
        if (section.querySelector('[data-fraction-output]')) updateFraction();

        const updateScore = event => {
            const output = section.querySelector('[data-score-output]');
            if (!output) return;
            const q = 0.8;
            const cInput = section.querySelector('[data-score-c]');
            const wqInput = section.querySelector('[data-score-wq]');
            const wcInput = section.querySelector('[data-score-wc]');
            if (cInput) {
                const c = Number(cInput.value);
                const score = 0.6 * q + 0.4 * c;
                output.innerHTML = mathHtml(`s=0.6(0.80)+0.4(${c.toFixed(2)})=${score.toFixed(3)}`, true);
                say('Ketika c naik dan coefficient-nya positif, output toy rule ini ikut naik.', 'success');
            } else {
                let wq = Number(wqInput.value);
                let wc = Number(wcInput.value);
                if (section.querySelector('[data-score-lock]').checked && event?.target === wqInput) { wc = 1 - wq; wcInput.value = String(wc); }
                if (section.querySelector('[data-score-lock]').checked && event?.target === wcInput) { wq = 1 - wc; wqInput.value = String(wq); }
                const score = wq * 0.8 + wc * 0.75;
                output.innerHTML = mathHtml(`s=${wq.toFixed(2)}q+${wc.toFixed(2)}c=${score.toFixed(3)}`, true);
                say('Weights adalah bagian dari rule/design; weight besar bukan bukti causal importance.', 'warning');
            }
        };
        section.querySelectorAll('[data-score-c], [data-score-wq], [data-score-wc], [data-score-lock]').forEach(input => input.addEventListener('input', updateScore));
        if (section.querySelector('[data-score-output]')) updateScore();

        if (key === 'function-machine') {
            section.querySelector('[data-function-run]').addEventListener('click', () => {
                const x = Number(section.querySelector('[data-function-input]').value);
                if (!Number.isFinite(x)) return say('Masukkan input numerik yang valid.', 'error');
                section.querySelector('[data-function-output]').textContent = String(2 * x + 1);
                say(`f(${x}) = 2(${x}) + 1 = ${2*x+1}.`, 'success');
            });
        }
        const updateTable = () => {
            const xInput = section.querySelector('[data-table-x]');
            if (!xInput) return;
            const x = Number(xInput.value);
            section.querySelector('[data-table-result]').innerHTML = mathHtml(`(x,f(x))=(${x},${2*x+1})`, true);
            section.querySelector('[data-function-table]').innerHTML = Array.from({length:11},(_,i)=>i-5).map(value=>`<tr${value===x?' style="background:#fff0f7"':''}><td>${value}</td><td>${2*value+1}</td></tr>`).join('');
        };
        section.querySelector('[data-table-x]')?.addEventListener('input', updateTable);
        updateTable();
        const updateOne = () => {
            const input = section.querySelector('[data-one-q]');
            if (!input) return;
            const q = Number(input.value);
            section.querySelector('[data-one-output]').innerHTML = mathHtml(`r(${q.toFixed(1)})=0.5(${q.toFixed(1)})+0.2=${(0.5*q+0.2).toFixed(2)}`, true);
            say('Setiap kenaikan q sebesar 0.1 menaikkan output rule ini sebesar 0.05.', 'success');
        };
        section.querySelector('[data-one-q]')?.addEventListener('input', updateOne);
        updateOne();
        const updateTwo = () => {
            const qInput = section.querySelector('[data-two-q]');
            if (!qInput) return;
            const q = Number(qInput.value), c = Number(section.querySelector('[data-two-c]').value);
            section.querySelector('[data-two-output]').innerHTML = mathHtml(`h(${q.toFixed(2)},${c.toFixed(2)})=0.6(${q.toFixed(2)})+0.4(${c.toFixed(2)})=${(0.6*q+0.4*c).toFixed(3)}`, true);
            say('Output berubah menurut toy instructional rule. Ini sensitivity intuition, bukan causal claim.', 'warning');
        };
        section.querySelectorAll('[data-two-q], [data-two-c]').forEach(input=>input.addEventListener('input',updateTwo));
        updateTwo();
        const updateRate = () => {
            const x1Input = section.querySelector('[data-rate-x1]');
            if (!x1Input) return;
            const x1 = Number(x1Input.value), x2 = Number(section.querySelector('[data-rate-x2]').value);
            const output = section.querySelector('[data-rate-output]');
            if (!Number.isFinite(x1) || !Number.isFinite(x2) || x1 === x2) {
                output.textContent = 'x₁ dan x₂ harus valid dan berbeda.';
                return say('Interval membutuhkan dua input yang berbeda.', 'error');
            }
            const rate = (x2*x2-x1*x1)/(x2-x1);
            output.innerHTML = mathHtml(`\\frac{f(${x2})-f(${x1})}{${x2}-${x1}}=${rate.toFixed(3)}`, true);
            say('Untuk f(x)=x², average rate bergantung pada interval yang dipilih.', 'success');
        };
        section.querySelectorAll('[data-rate-x1], [data-rate-x2]').forEach(input=>input.addEventListener('input',updateRate));
        updateRate();
        const updatePower = () => {
            const baseInput = section.querySelector('[data-power-base]');
            if (!baseInput) return;
            const base=Number(baseInput.value), exp=Number(section.querySelector('[data-power-exp]').value);
            section.querySelector('[data-power-output]').innerHTML=mathHtml(`${base}^{${exp}}=${Array.from({length:exp},()=>base).join('\\times')}=${base**exp}`,true);
        };
        section.querySelectorAll('[data-power-base], [data-power-exp]').forEach(input=>input.addEventListener('input',updatePower));
        updatePower();
        const updateCoeff = () => {
            const input=section.querySelector('[data-coeff-x]'); if(!input)return;
            const x=Number(input.value);
            section.querySelector('[data-coeff-left]').innerHTML=`<h4>Coefficient</h4>${mathHtml(`2(${x})=${2*x}`,true)}`;
            section.querySelector('[data-coeff-right]').innerHTML=`<h4>Exponent</h4>${mathHtml(`${x}^2=${x*x}`,true)}`;
        };
        section.querySelector('[data-coeff-x]')?.addEventListener('input',updateCoeff); updateCoeff();
        const updateLog=()=>{const b=section.querySelector('[data-log-base]');if(!b)return;const base=Number(b.value),exp=Number(section.querySelector('[data-log-exp]').value),value=base**exp;section.querySelector('[data-log-output]').innerHTML=mathHtml(`${base}^{${exp}}=${value}\\quad\\Longleftrightarrow\\quad\\log_{${base}}(${value})=${exp}`,true);};
        section.querySelectorAll('[data-log-base], [data-log-exp]').forEach(input=>input.addEventListener('input',updateLog));updateLog();
        const updateSigma=()=>{const inputs=[...section.querySelectorAll('[data-sigma-value]')];if(!inputs.length)return;const values=inputs.map(input=>Number(input.value)||0),total=values.reduce((a,b)=>a+b,0);section.querySelector('[data-sigma-output]').innerHTML=mathHtml(`\\sum_{i=1}^{4}x_i=${values.join('+')}=${total}`,true);};
        section.querySelectorAll('[data-sigma-value]').forEach(input=>input.addEventListener('input',updateSigma));updateSigma();
        const updateSquares=()=>{const inputs=[...section.querySelectorAll('[data-square-value]')];if(!inputs.length)return;const values=inputs.map(input=>Number(input.value)||0),sum=values.reduce((a,b)=>a+b,0),squares=values.reduce((a,b)=>a+b*b,0);section.querySelector('[data-square-left]').innerHTML=`<h4>Square of sum</h4>${mathHtml(`(${values.join('+')})^2=${sum*sum}`,true)}`;section.querySelector('[data-square-right]').innerHTML=`<h4>Sum of squares</h4>${mathHtml(values.map(v=>`${v}^2`).join('+')+`=${squares}`,true)}`;};
        section.querySelectorAll('[data-square-value]').forEach(input=>input.addEventListener('input',updateSquares));updateSquares();
    }

    function bindGraphInteractive(section, key, say) {
        if (key === 'coordinate-plane-basics') {
            const svg=section.querySelector('svg'),point=section.querySelector('[data-drag-point]'),gx=section.querySelector('[data-guide-x]'),gy=section.querySelector('[data-guide-y]'),output=section.querySelector('[data-coordinate-output]');
            const update=(clientX,clientY)=>{const rect=svg.getBoundingClientRect(),x=Math.max(30,Math.min(390,(clientX-rect.left)*420/rect.width)),y=Math.max(20,Math.min(280,(clientY-rect.top)*300/rect.height)),cx=(x-210)/36,cy=(150-y)/26;point.setAttribute('cx',x);point.setAttribute('cy',y);gx.setAttribute('x1',210);gx.setAttribute('y1',y);gx.setAttribute('x2',x);gx.setAttribute('y2',y);gy.setAttribute('x1',x);gy.setAttribute('y1',150);gy.setAttribute('x2',x);gy.setAttribute('y2',y);output.textContent=`(${cx.toFixed(1)}, ${cy.toFixed(1)})`;say('Horizontal guide membaca x; vertical guide membaca y.', 'success');};
            point.addEventListener('pointerdown',event=>{point.setPointerCapture(event.pointerId);update(event.clientX,event.clientY);});point.addEventListener('pointermove',event=>{if(point.hasPointerCapture(event.pointerId))update(event.clientX,event.clientY);});
        }
        if (key === 'table-points-graph') {
            const svg=section.querySelector('[data-graph-reveal]'),points=[[0,.2],[.2,.3],[.4,.4],[.6,.5],[.8,.6]];let count=0;const draw=()=>{const visible=points.slice(0,count);svg.innerHTML='<line class="axis" x1="35" y1="240" x2="390" y2="240"/><line class="axis" x1="35" y1="20" x2="35" y2="240"/>'+visible.map(([x,y])=>`<circle class="plot-point" cx="${45+x*400}" cy="${250-y*350}" r="7"/>`).join('')+(count===points.length?`<polyline class="plot-line" points="${points.map(([x,y])=>`${45+x*400},${250-y*350}`).join(' ')}"/>`:'');};draw();section.querySelector('[data-graph-next]').addEventListener('click',event=>{count=Math.min(points.length,count+1);draw();if(count===points.length){event.currentTarget.disabled=true;say('Semua ordered pairs sudah menjadi points dan membentuk graph function.', 'success');}});
        }
        if (key === 'hold-completion-fixed') {
            const input=section.querySelector('[data-hold-q]'),svg=section.querySelector('[data-hold-graph]'),output=section.querySelector('[data-hold-output]');const update=()=>{const q=Number(input.value),score=.6*q+.3;svg.innerHTML='<line class="axis" x1="35" y1="215" x2="390" y2="215"/><line class="axis" x1="35" y1="20" x2="35" y2="215"/><line class="plot-line" x1="35" y1="155" x2="390" y2="35"/><circle class="plot-point" cx="'+(35+q*355)+'" cy="'+(215-score*180)+'" r="8"/>';output.innerHTML=mathHtml(`h(${q.toFixed(2)},0.75)=0.6(${q.toFixed(2)})+0.30=${score.toFixed(3)}`,true);say('Completion tetap 0.75; hanya q dan output toy formula yang bergerak.', 'warning');};input.addEventListener('input',update);update();
        }
    }

    function renderQuiz(markdown, container) {
        const chunks = String(markdown).split(/^# Soal\s+(\d+)\s*$/gm);
        const questions = [];
        for (let i=1;i<chunks.length;i+=2) {
            const number=Number(chunks[i]),body=chunks[i+1].split(/^---\s*$/m)[0];
            const answer=(body.match(/\*\*Jawaban benar:\*\*\s*([A-D])/)||[])[1];
            const optionMatches=[...body.matchAll(/^([A-D])\.\s+(.+?)(?=\s{2}$|$)/gm)];
            const firstOption=optionMatches[0]?.index ?? body.length;
            const prompt=body.slice(0,firstOption).trim();
            const rationaleStart=body.search(/^\*\*(?:Jawaban benar|Mengapa|Rationale|Perhitungan|A salah|A benar)/m);
            const rationale=rationaleStart>=0?body.slice(rationaleStart):'';
            questions.push({number,prompt,options:optionMatches.map(match=>({letter:match[1],text:match[2].trim()})),answer,rationale});
        }
        const intro = removeAndShiftTitle(chunks[0]);
        container.innerHTML=`<div class="math-learning-quiz-intro">${renderMarkdown(intro,[])}</div><p class="math-learning-preview-note"><strong>Preview integrasi:</strong> hasil kuis ini belum dikirim ke backend progress karena Math for AI belum released.</p><form class="math-learning-quiz-list" data-quiz-form>${questions.map(question=>`<fieldset class="math-learning-quiz-card" data-quiz-question="${question.number}"><legend class="math-learning-visually-hidden">Soal ${question.number}</legend><div class="math-learning-quiz-prompt"><span aria-hidden="true">${question.number}.</span><div>${renderMarkdown(removeAndShiftTitle(question.prompt),[])}</div></div><div class="math-learning-quiz-options">${question.options.map(option=>`<label class="math-learning-quiz-option"><input type="radio" name="quiz-${question.number}" value="${option.letter}"><span><strong>${option.letter}.</strong> ${renderMarkdown(option.text,[])}</span></label>`).join('')}</div><div data-quiz-review></div></fieldset>`).join('')}<div class="math-learning-button-row"><button class="math-learning-action is-primary" type="submit">Periksa jawaban</button><button class="math-learning-action" type="reset">Ulangi kuis</button></div></form>`;
        const form=container.querySelector('[data-quiz-form]');
        form.addEventListener('submit',event=>{event.preventDefault();let correct=0,answered=0;questions.forEach(question=>{const selected=form.querySelector(`input[name="quiz-${question.number}"]:checked`);if(selected)answered+=1;if(selected?.value===question.answer)correct+=1;const review=form.querySelector(`[data-quiz-question="${question.number}"] [data-quiz-review]`);review.className='math-learning-quiz-review';review.innerHTML=`<strong>${selected?.value===question.answer?'Benar':'Jawaban terbaik: '+question.answer}</strong>${renderMarkdown(removeAndShiftTitle(question.rationale),[])}`;});if(answered<questions.length){window.__aiLabToast?.(`Jawab seluruh ${questions.length} soal sebelum final review.`, 'error');return;}window.__aiLabToast?.(`Skor preview: ${correct}/${questions.length} (${Math.round(correct/questions.length*100)}%).`,correct/questions.length>=.75?'success':'info');form.querySelector('button[type="submit"]').textContent=`Skor ${correct}/${questions.length}`;});
        form.addEventListener('reset',()=>setTimeout(()=>{container.querySelectorAll('[data-quiz-review]').forEach(node=>{node.className='';node.innerHTML='';});form.querySelector('button[type="submit"]').textContent='Periksa jawaban';},0));
    }

    function buildTabs(active) {
        const tabs = [
            { label: 'Materi', icon: 'fas fa-book-open', route: CONTENT[0].route, types: ['info', 'topic'] },
            { label: 'Latihan', icon: 'fas fa-pen-to-square', route: CONTENT.find(item => item.type === 'practice').route, types: ['practice'] },
            { label: 'Kuis', icon: 'far fa-clipboard', route: CONTENT.find(item => item.type === 'quiz').route, types: ['quiz'] },
            { label: 'Diskusi', icon: 'far fa-message', route: CONTENT.find(item => item.type === 'discussion').route, types: ['discussion'] },
            { label: 'Referensi', icon: 'fas fa-book-bookmark', route: CONTENT.find(item => item.type === 'references').route, types: ['references'] }
        ];
        return `<div class="lesson-tabs" role="tablist" aria-label="Jenis materi Submodul 01">${tabs.map(tab => `<a href="${tab.route}" class="${tab.types.includes(active.type) ? 'active' : ''}" ${tab.types.includes(active.type) ? 'aria-current="page"' : ''}><i class="${tab.icon}" aria-hidden="true"></i>${tab.label}</a>`).join('')}</div>`;
    }

    function buildLessonList(active, state) {
        const materials = CONTENT.filter(item => item.type === 'info' || item.type === 'topic');
        return `<ol>${materials.map((item, index) => {
            const current = item.id === active.id;
            const complete = state.completed.includes(item.id);
            const icon = current ? 'far fa-circle-play' : (complete ? 'fas fa-circle-check' : 'far fa-circle');
            return `<li class="${current ? 'active' : ''} ${complete && !current ? 'completed' : ''}"><span>${String(index).padStart(2, '0')}</span><a href="${item.route}" ${current ? 'aria-current="page"' : ''}>${escapeHtml(item.short)}</a><i class="${icon}" aria-hidden="true"></i></li>`;
        }).join('')}</ol>`;
    }

    function buildRightPanel(active, state, progress) {
        const complete = state.completed.includes(active.id);
        return `<section class="module-side-card lesson-progress-card">
            <h2>Progres Submodul</h2>
            <div class="lesson-progress-mini"><b style="--value:${progress}%" data-math-progress-bar></b><strong data-math-progress-text>${progress}%</strong></div>
            <p>Preview progres hanya tersimpan di perangkat sampai Math for AI resmi dirilis.</p>
            <button type="button" class="math-learning-complete-button ${complete ? 'is-complete' : ''}" data-mark-complete><i class="fas ${complete ? 'fa-circle-check' : 'fa-check'}" aria-hidden="true"></i>${complete ? 'Selesai di perangkat' : 'Tandai selesai'}</button>
        </section>
        <section class="module-side-card lesson-list-card"><h2>Daftar Materi</h2>${buildLessonList(active, state)}</section>
        <section class="module-side-card lesson-note-card math-learning-status-card"><div class="module-side-head"><h2>Status Integrasi</h2><i class="fas fa-flask" aria-hidden="true"></i></div><p>Submodul 01 adalah preview frontend. Progress, latihan, dan kuis belum dikirim ke backend produksi.</p></section>`;
    }

    function footerNav(item) {
        const index = CONTENT.findIndex(entry => entry.id === item.id);
        const prev = CONTENT[index - 1];
        const next = CONTENT[index + 1];
        return `<footer class="lesson-nav-footer">${prev ? `<a href="${prev.route}"><i class="fas fa-chevron-left" aria-hidden="true"></i>${escapeHtml(prev.short)}</a>` : '<span></span>'}${next ? `<a href="${next.route}">${escapeHtml(next.short)}<i class="fas fa-arrow-right" aria-hidden="true"></i></a>` : '<span></span>'}</footer>`;
    }

    function bindShell(item) {
        const page = document.querySelector('.math-learning-page');
        page?.querySelector('[data-mark-complete]')?.addEventListener('click', event => {
            const state = markComplete(item.id);
            const button = event.currentTarget;
            button.classList.add('is-complete');
            button.innerHTML = '<i class="fas fa-circle-check" aria-hidden="true"></i>Selesai di perangkat';
            const percent = Math.round(state.completed.length / CONTENT.length * 100);
            const percentText = page.querySelector('[data-math-progress-text]');
            const percentBar = page.querySelector('[data-math-progress-bar]');
            if (percentText) percentText.textContent = `${percent}%`;
            if (percentBar) percentBar.style.setProperty('--value', `${percent}%`);
            const itemRow = page.querySelector(`.lesson-list-card a[href="${item.route}"]`)?.closest('li');
            itemRow?.classList.add('completed');
            window.__aiLabToast?.('Status tersimpan di perangkat. Backend Math belum diaktifkan.', 'success');
        }, { once: true, signal: pageAbort.signal });
    }

    function renderError(root, message) {
        root.innerHTML=`<section class="math-learning-error" role="alert"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i><h1>Materi belum bisa dimuat</h1><p>${escapeHtml(message)}</p><button type="button" data-math-retry>Coba lagi</button></section>`;
        root.querySelector('[data-math-retry]').addEventListener('click',()=>window.initMathLearningRoute());
    }

    async function renderCurrentRoute() {
        const sequence=++renderSequence,item=getCurrentItem(),root=document.getElementById('mathLearningRoot');
        if(!root)return;
        if(pageAbort)pageAbort.abort();pageAbort=new AbortController();
        root.innerHTML='<div class="math-learning-loading" role="status"><i class="fas fa-circle-notch fa-spin" aria-hidden="true"></i><strong>Menyiapkan materi…</strong><span>Markdown dan formula matematika sedang dirender.</span></div>';
        try {
            await ensureRuntime();
            const response=await fetch(BASE_PATH+encodeURIComponent(item.file),{cache:'no-store',signal:pageAbort.signal});
            if(!response.ok)throw new Error(`Source ${item.file} mengembalikan HTTP ${response.status}.`);
            const source=await response.text();
            if(sequence!==renderSequence)return;
            const title=extractTitle(source,item.title),meta=extractMeta(source),lead=extractLead(source,item.title),extracted=extractInteractiveSpecs(source),diagnostic=extractDiagnostic(extracted.markdown),bodySource=removeAndShiftTitle(diagnostic.markdown),state=readState(),progress=Math.round(state.completed.length/CONTENT.length*100);
            document.querySelector('[data-math-learning-breadcrumb]')?.replaceChildren(document.createTextNode(item.short));
            const topicPosition = item.type === 'topic' ? `Topik ${Number(item.id.slice(-2))} dari 7` : item.short;
            root.innerHTML=`<div class="lesson-layout math-learning-layout"><div class="lesson-main-content"><section class="lesson-hero compact math-learning-lesson-hero"><div class="lesson-hero-copy"><span class="math-learning-kicker"><i class="fas ${item.icon}" aria-hidden="true"></i>Foundation &amp; Core AI · Math for AI · Submodul 01</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(lead)}</p><div class="lesson-meta-row"><span><i class="far fa-clock" aria-hidden="true"></i>${escapeHtml(meta['estimasi belajar']||'Belajar sesuai ritme')}</span><span><i class="fas fa-book-open" aria-hidden="true"></i>${escapeHtml(topicPosition)}</span><b>${escapeHtml(meta.level||'Beginner')}</b></div></div><img src="/assets/messaging/herai-chat-persona.png" alt="HerAI fellow belajar Math for AI"></section><section class="lesson-material-panel math-learning-material-panel">${buildTabs(item)}<article class="lesson-article math-learning-article" id="mathLearningContent" tabindex="-1"><div class="math-learning-markdown" data-markdown-content></div></article>${footerNav(item)}</section></div><aside class="lesson-right-panel">${buildRightPanel(item,state,progress)}</aside></div>`;
            const content=root.querySelector('[data-markdown-content]');
            if(item.type==='quiz'){renderQuiz(source,content);enhanceMarkdown(content,[]);}else{content.innerHTML=renderMarkdown(bodySource,extracted.specs);enhanceMarkdown(content,extracted.specs);mountDiagnostic(content,diagnostic.data);}
            bindShell(item);
            root.querySelector('#mathLearningContent')?.focus({preventScroll:true});
        } catch(error) {
            if(error.name==='AbortError')return;
            console.error('[Math Learning] Render failed:',error);
            renderError(root,error.message||'Terjadi kesalahan yang tidak diketahui.');
        }
    }

    window.HerAiMathLearning=Object.freeze({content:CONTENT,renderCurrentRoute,renderOverviewProgress,version:RUNTIME_VERSION});
    window.initMathOverviewRoute=renderOverviewProgress;
    window.initMathLearningRoute=renderCurrentRoute;
})();
