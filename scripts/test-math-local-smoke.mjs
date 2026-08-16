import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import puppeteer from 'puppeteer';

const repositoryRoot = resolve(import.meta.dirname, '..');
const port = String(32000 + Math.floor(Math.random() * 10000));
const baseUrl = `http://127.0.0.1:${port}`;
const readExternalQuizAnswers = path => {
    const answers = {};
    for (const match of readFileSync(resolve(repositoryRoot, path), 'utf8')
        .matchAll(/^\|\s*(\d+)\s*\|(?:\s*[^\|]+\s*\|)?\s*([A-D])\s*\|/gm)) {
        answers[match[1]] = match[2];
    }
    return Array.from({ length: 10 }, (_, index) => answers[String(index + 1)]);
};
const readinessCandidates = [
    {
        id: '01',
        slug: 'kenapa-ai-butuh-matematika',
        quizSource: 'materi2/math for ai/kenapa ai butuh matematika/kuis.md'
    },
    {
        id: '02',
        slug: 'linear-algebra',
        quizSource: 'materi2/math for ai/02-linear-algebra/kuis.md'
    },
    {
        id: '03',
        slug: 'statistics-for-ai',
        quizSource: 'materi2/math for ai/03-statistics-for-ai/kuis.md'
    },
    {
        id: '04',
        slug: 'probability',
        quizSource: 'materi2/math for ai/04-probability/kuis.md',
        keySource: 'materi2/math for ai/04-probability/kunci-jawaban-rubrik.md'
    },
    {
        id: '05',
        slug: 'calculus',
        quizSource: 'materi2/math for ai/05-calculus/kuis.md',
        keySource: 'materi2/math for ai/05-calculus/kunci-jawaban-rubrik.md'
    },
    {
        id: '06',
        slug: 'optimization',
        quizSource: 'materi2/math for ai/06-optimization/kuis.md',
        keySource: 'materi2/math for ai/06-optimization/kunci-jawaban-rubrik.md'
    },
    {
        id: '07',
        slug: 'integrated-case-study',
        quizSource: 'materi2/math for ai/07-case-study-herai/kuis.md',
        keySource: 'materi2/math for ai/07-case-study-herai/kunci-jawaban-rubrik.md'
    }
].map(candidate => ({
    ...candidate,
    answers: candidate.keySource
        ? readExternalQuizAnswers(candidate.keySource)
        : [...readFileSync(resolve(repositoryRoot, candidate.quizSource), 'utf8')
            .matchAll(/\*\*(?:Jawaban benar|Correct answer|Jawaban):\*\*\s*([A-D])/g)]
            .map(match => match[1])
}));
readinessCandidates.forEach(candidate => {
    assert.equal(candidate.answers.length, 10, `Submodule ${candidate.id} quiz key count`);
    assert.equal(candidate.answers.every(answer => /^[A-D]$/.test(answer || '')), true, `Submodule ${candidate.id} quiz keys A-D`);
});
const foundationModules = ['intro', 'python', 'modern', 'reasoning', 'evaluation', 'evolution'];
const foundationRoutes = foundationModules.flatMap(module => [
    `/participant-ai-${module}`,
    `/participant-ai-${module}-practice`,
    `/participant-ai-${module}-quiz`,
    `/participant-ai-${module}-discussion`
]);
const server = spawn(process.execPath, ['server.js'], {
    cwd: repositoryRoot,
    env: {
        ...process.env,
        PORT: port,
        HERAI_LOCAL_HOST: '127.0.0.1',
        HERAI_ALLOW_LIVE_GAS_PROXY: 'false'
    },
    stdio: ['ignore', 'pipe', 'pipe']
});
const serverDiagnostics = [];
server.stdout.on('data', chunk => serverDiagnostics.push(String(chunk)));
server.stderr.on('data', chunk => serverDiagnostics.push(String(chunk)));

async function waitForServer() {
    for (let attempt = 0; attempt < 100; attempt += 1) {
        try {
            const response = await fetch(`${baseUrl}/healthz`);
            const health = await response.json();
            assert.equal(health.gasProxy, 'disabled');
            return;
        } catch {
            await new Promise(resolveWait => setTimeout(resolveWait, 100));
        }
    }
    throw new Error(`Local safe-mode server did not become ready. ${serverDiagnostics.join(' ').trim()}`);
}

const routes = [
    '/participant-ai-lab-math/kenapa-ai-butuh-matematika/dunia-nyata-menjadi-representasi-komputasional',
    '/participant-ai-lab-math/linear-algebra/dari-scalar-ke-vector',
    '/participant-ai-lab-math/statistics-for-ai/mean-median-mode',
    '/participant-ai-lab-math/probability/conditional-probability',
    '/participant-ai-lab-math/calculus/partial-derivative',
    '/participant-ai-lab-math/optimization/learning-rate',
    '/participant-ai-lab-math/integrated-case-study/uncertainty'
];

let browser;
try {
    await waitForServer();
    browser = await puppeteer.launch({ headless: true, executablePath: '/usr/bin/chromium' });
    const page = await browser.newPage();
    const pageErrors = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    await page.evaluateOnNewDocument(() => {
        sessionStorage.setItem('heraiParticipantSession', JSON.stringify({
            nik: '0000000000000000',
            token: 'local-smoke-test-only',
            expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString()
        }));
    });
    await page.setRequestInterception(true);
    page.on('request', async request => {
        if (request.url() === `${baseUrl}/__gas` && request.method() === 'POST') {
            await request.respond({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ status: 'error', message: 'Simulasi offline lokal.' })
            });
            return;
        }
        await request.continue();
    });

    for (const route of routes) {
        await page.goto(`${baseUrl}/#${route}`);
        await page.waitForSelector('#mathLearningRoot .math-learning-lesson-hero h1', { timeout: 15000 });
        assert.equal(await page.$('#mathLearningRoot .math-learning-error'), null, route);
    }
    await page.waitForFunction(() => (
        document.querySelector('[data-math-learning-breadcrumb]')?.textContent.trim() === 'Uncertainty'
        && Boolean(document.querySelector('[data-mark-complete]'))
    ), { timeout: 15000 });
    await page.click('[data-mark-complete]');
    await page.waitForFunction(() => document.querySelector('[data-mark-complete]')?.textContent.includes('Coba sinkronkan'));
    const offlineState = await page.evaluate(() => JSON.parse(
        localStorage.getItem('heraiMathLearningSubmodule07') || '{}'
    ));
    assert.deepEqual(offlineState.completed, ['topic-04']);
    assert.deepEqual(offlineState.pending, ['topic-04']);
    const syncCopy = await page.$eval('[data-math-sync-copy]', element => element.textContent);
    assert.match(syncCopy, /sinkronisasi akun masih tertunda/i);
    assert.deepEqual(pageErrors, []);

    const offlinePracticeRoute = '/participant-ai-lab-math/integrated-case-study/latihan';
    await page.evaluate(route => { window.location.hash = `#${route}`; }, offlinePracticeRoute);
    await page.waitForSelector('[data-math-practice-form] textarea[name="answer-01"]', { timeout: 15000 });
    await page.type('[data-math-practice-form] textarea[name="answer-01"]', 'Draft lokal aman');
    await page.click('[data-practice-draft]');
    await page.waitForFunction(() => /belum tersinkron|belum masuk server/i.test(
        document.querySelector('[data-practice-status]')?.textContent || ''
    ));
    const offlinePractice = await page.evaluate(() => JSON.parse(
        localStorage.getItem('heraiMathLearningSubmodule07:practice-responses') || '{}'
    ));
    assert.equal(offlinePractice.answers['answer-01'], 'Draft lokal aman');

    const syncedPage = await browser.newPage();
    const savedPayloads = [];
    const exercisePayloads = [];
    const discussionPayloads = [];
    const savedExercises = new Map();
    const savedDiscussions = new Map();
    let mockedProgressRows = [];
    let delayNextMathShell = false;
    let delayNextProgressSave = false;
    let exerciseProgressFailuresRemaining = 1;
    let discussionProgressFailuresRemaining = 1;
    const syncedPageErrors = [];
    const syncedConsoleErrors = [];
    const failedLocalRequests = [];
    const badLocalResponses = [];
    syncedPage.on('pageerror', error => syncedPageErrors.push(error.message));
    syncedPage.on('console', message => {
        if (message.type() === 'error') syncedConsoleErrors.push(message.text());
    });
    syncedPage.on('requestfailed', request => {
        if (request.url().startsWith(baseUrl)) {
            const errorText = request.failure()?.errorText || '';
            // Chromium cancels an in-flight image when the SPA intentionally
            // replaces the current route. HTTP failures remain covered below.
            if (request.resourceType() === 'image' && errorText === 'net::ERR_ABORTED') return;
            failedLocalRequests.push(`${request.method()} ${request.url()} ${errorText}`);
        }
    });
    syncedPage.on('response', response => {
        if (response.url().startsWith(baseUrl) && response.status() >= 400) {
            badLocalResponses.push(`${response.status()} ${response.url()}`);
        }
    });
    await syncedPage.evaluateOnNewDocument(() => {
        sessionStorage.setItem('heraiParticipantSession', JSON.stringify({
            nik: '0000000000000000',
            token: 'local-smoke-test-only',
            expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString()
        }));
    });
    await syncedPage.setRequestInterception(true);
    syncedPage.on('request', async request => {
        if (delayNextMathShell && request.url().endsWith('/pages/frontend/fellow-dashboard/foundation-core-ai/math-for-ai/01-kenapa-ai-butuh-matematika/materi.html')) {
            delayNextMathShell = false;
            await new Promise(resolveWait => setTimeout(resolveWait, 450));
            await request.continue();
            return;
        }
        if (request.url() === `${baseUrl}/__gas` && request.method() === 'POST') {
            const payload = JSON.parse(request.postData() || '{}');
            if (delayNextProgressSave && payload.action === 'saveParticipantProgress') {
                delayNextProgressSave = false;
                await new Promise(resolveWait => setTimeout(resolveWait, 450));
            }
            if (payload.action === 'saveParticipantProgress') savedPayloads.push(payload);
            let responseBody = { status: 'success', data: [] };
            if (payload.action === 'getParticipantDashboardData') {
                responseBody = {
                    status: 'success',
                    data: {
                        learningSummary: { total: 6, completed: 3, in_progress: 3, not_started: 0, progress: 72 },
                        activeCourses: [
                            { course_id: 'ai-fundamentals-advanced', title: 'AI Fundamentals & Advanced', progress: 72, total_items: 6, item_label: 'modul' },
                            { course_id: 'math-for-ai', title: 'Math for AI', progress: 100, total_items: 89, item_label: 'aktivitas' }
                        ],
                        overallLearningSummary: { total: 2, completed: 1, in_progress: 1, not_started: 0, progress: 86 }
                    }
                };
            } else if (payload.action === 'getParticipantProgress') {
                responseBody = { status: 'success', data: mockedProgressRows };
            } else if (payload.action === 'getParticipantExerciseSubmissions') {
                const savedExercise = savedExercises.get(payload.exercise_id);
                responseBody = { status: 'success', data: savedExercise ? [savedExercise] : [] };
            } else if (payload.action === 'saveParticipantExerciseDraft' || payload.action === 'submitParticipantExercise') {
                exercisePayloads.push(payload);
                const savedExercise = {
                    submission_id: 'sub-local-math-07',
                    module_id: payload.module_id,
                    exercise_id: payload.exercise_id,
                    answers: payload.answers,
                    answer_count: Object.values(payload.answers || {}).filter(Boolean).length,
                    status: payload.action === 'submitParticipantExercise' ? 'submitted' : 'draft',
                    submitted_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    score: null,
                    feedback: '',
                    reviewed_at: ''
                };
                savedExercises.set(payload.exercise_id, savedExercise);
                responseBody = {
                    status: 'success',
                    progress_synced: payload.action === 'submitParticipantExercise'
                        ? (exerciseProgressFailuresRemaining-- <= 0)
                        : null,
                    submission: savedExercise
                };
            } else if (payload.action === 'getParticipantDiscussions') {
                responseBody = { status: 'success', data: [...savedDiscussions.values()] };
            } else if (payload.action === 'saveParticipantDiscussion') {
                discussionPayloads.push(payload);
                const discussion = {
                    id: savedDiscussions.get(payload.prompt)?.id || `dsc-local-${savedDiscussions.size + 1}`,
                    module_id: payload.module_id,
                    prompt: payload.prompt,
                    text: payload.text,
                    replies: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                savedDiscussions.set(payload.prompt, discussion);
                const promptPrefix = payload.prompt.replace(/(?:01|02)$/, '');
                const discussionComplete = savedDiscussions.has(`${promptPrefix}01`)
                    && savedDiscussions.has(`${promptPrefix}02`);
                responseBody = {
                    status: 'success',
                    discussion_complete: discussionComplete,
                    progress_synced: discussionComplete
                        ? (discussionProgressFailuresRemaining-- <= 0)
                        : null,
                    discussion
                };
            }
            await request.respond({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(responseBody)
            });
            return;
        }
        await request.continue();
    });
    await syncedPage.goto(`${baseUrl}/#${routes.at(-1)}`);
    try {
        await syncedPage.waitForSelector('#mathLearningRoot .math-learning-lesson-hero h1', { timeout: 15000 });
    } catch (error) {
        const snapshot = await syncedPage.evaluate(() => ({
            hash: window.location.hash,
            title: document.title,
            appText: document.querySelector('#app-content')?.innerText.slice(0, 800) || '',
            appHtml: document.querySelector('#app-content')?.innerHTML.slice(0, 800) || ''
        }));
        throw new Error(`Synced Math page did not render: ${JSON.stringify({ snapshot, syncedPageErrors, syncedConsoleErrors, failedLocalRequests, badLocalResponses })}`, { cause: error });
    }
    const registeredRoutes = await syncedPage.evaluate(() => (
        window.HerAiMathLearning.submodules.flatMap(submodule => submodule.items.map(item => ({
            route: item.route,
            short: item.short,
            type: item.type
        })))
    ));
    const canonicalProgressRows = await syncedPage.evaluate(() => (
        window.HerAiMathLearning.submodules.flatMap(submodule => submodule.items.map(item => ({
            module_id: 'math-for-ai',
            chapter_id: window.HerAiMathLearning.progressRecordIdFor(submodule, item),
            status: 'completed'
        })))
    ));
    assert.equal(registeredRoutes.length, 89);
    assert.equal(canonicalProgressRows.length, 89);
    for (const entry of registeredRoutes) {
        await syncedPage.evaluate(route => { window.location.hash = route; }, entry.route);
        await syncedPage.waitForFunction(expected => {
            const error = document.querySelector('#mathLearningRoot .math-learning-error');
            const breadcrumb = document.querySelector('[data-math-learning-breadcrumb]')?.textContent.trim();
            const contentType = document.querySelector('#mathLearningRoot')?.dataset.mathContentType;
            return Boolean(error || (breadcrumb === expected.short && contentType === expected.type));
        }, { timeout: 15000 }, entry);
        assert.equal(await syncedPage.$('#mathLearningRoot .math-learning-error'), null, entry.route);
    }
    assert.deepEqual(syncedPageErrors, []);

    const readinessRoutes = registeredRoutes;
    assert.equal(readinessRoutes.length, 89);
    let interactiveSectionCount = 0;
    let manipulatedControlCount = 0;
    let passiveVisualCount = 0;
    await syncedPage.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
    for (const entry of readinessRoutes) {
        await syncedPage.evaluate(route => { window.location.hash = route; }, entry.route);
        await syncedPage.waitForFunction(expected => (
            document.querySelector('[data-math-learning-breadcrumb]')?.textContent.trim() === expected.short
            && document.querySelector('#mathLearningRoot')?.dataset.mathContentType === expected.type
            && Boolean(document.querySelector('#mathLearningRoot .math-learning-lesson-hero h1'))
        ), { timeout: 15000 }, entry);
        const audit = await syncedPage.evaluate(() => {
            const root = document.querySelector('#mathLearningRoot');
            const ids = [...document.querySelectorAll('[id]')].map(node => node.id).filter(Boolean);
            const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
            const unnamedControls = [...root.querySelectorAll('button, input, select, textarea, a[href]')]
                .filter(control => {
                    if (control.disabled) return false;
                    const labelText = control.labels ? [...control.labels].map(label => label.textContent).join(' ') : '';
                    return !(control.getAttribute('aria-label') || control.getAttribute('aria-labelledby')
                        || labelText.trim() || control.textContent.trim() || control.getAttribute('title'));
                })
                .map(control => control.outerHTML.slice(0, 180));
            const undersizedTargets = [...root.querySelectorAll(
                'button, .math-learning-quiz-option, .math-learning-diagnostic-option, .math-learning-interactive select, .math-learning-interactive summary'
            )].filter(control => {
                const rect = control.getBoundingClientRect();
                return rect.width > 0 && rect.height > 0 && rect.height < 44;
            }).map(control => `${control.tagName}.${control.className}:${control.getBoundingClientRect().height}`);
            return {
                heroHeadingCount: root.querySelectorAll('.math-learning-lesson-hero h1').length,
                rawAuthoringToken: (root.innerText.match(/HERAI_(?:MATH|INTERACTIVE|DIAGNOSTIC)|\$\$|VISUAL\s*\/\s*INTERACTIVE SPEC|NOT TESTED\s*\/\s*NOT CLAIMED/i) || [])[0] || '',
                katexErrors: root.querySelectorAll('.math-learning-math-error, .katex-error').length,
                unwrappedTables: [...root.querySelectorAll('table')].filter(table => !table.parentElement?.classList.contains('math-learning-table-wrap')).length,
                imagesWithoutAlt: [...root.querySelectorAll('img')].filter(image => !image.hasAttribute('alt')).length,
                duplicateIds: [...new Set(duplicateIds)],
                unnamedControls,
                undersizedTargets,
                overflow: document.documentElement.scrollWidth > window.innerWidth
            };
        });
        assert.equal(audit.heroHeadingCount, 1, `${entry.route}: one lesson h1`);
        assert.equal(audit.rawAuthoringToken, '', `${entry.route}: authoring token leak`);
        assert.equal(audit.katexErrors, 0, `${entry.route}: KaTeX errors`);
        assert.equal(audit.unwrappedTables, 0, `${entry.route}: unwrapped tables`);
        assert.equal(audit.imagesWithoutAlt, 0, `${entry.route}: missing image alt`);
        assert.deepEqual(audit.duplicateIds, [], `${entry.route}: duplicate IDs`);
        assert.deepEqual(audit.unnamedControls, [], `${entry.route}: controls need accessible names`);
        assert.deepEqual(audit.undersizedTargets, [], `${entry.route}: interactive target below 44px`);
        assert.equal(audit.overflow, false, `${entry.route}: 375px horizontal overflow`);
        if (entry.type === 'topic') {
            const interactionAudit = await syncedPage.evaluate(async () => {
                const sections = [...document.querySelectorAll('.math-learning-interactive')];
                let operated = 0;
                for (const section of sections) {
                    const controls = [...section.querySelectorAll('button, input, select, summary')];
                    for (const control of controls) {
                        if (control.disabled) continue;
                        if (control instanceof HTMLInputElement && control.type === 'range') {
                            const next = control.value !== control.max ? control.max : control.min;
                            control.value = next;
                            control.dispatchEvent(new Event('input', { bubbles: true }));
                        } else if (control instanceof HTMLInputElement && control.type === 'number') {
                            const minimum = Number(control.min || 0);
                            const maximum = Number(control.max || minimum + 2);
                            control.value = String(Math.min(maximum, Math.max(minimum, Number(control.value || minimum) + Number(control.step || 1))));
                            control.dispatchEvent(new Event('input', { bubbles: true }));
                        } else if (control instanceof HTMLSelectElement) {
                            control.selectedIndex = control.options.length > 1
                                ? (control.selectedIndex + 1) % control.options.length
                                : control.selectedIndex;
                            control.dispatchEvent(new Event('change', { bubbles: true }));
                        } else if (control instanceof HTMLInputElement && ['checkbox', 'radio'].includes(control.type)) {
                            control.click();
                        } else {
                            control.click();
                        }
                        operated += 1;
                    }
                    for (const cell of section.querySelectorAll('[data-interactive-table] tbody tr, [data-interactive-table] th')) {
                        cell.click();
                        operated += 1;
                    }
                }
                await new Promise(resolveFrame => requestAnimationFrame(() => resolveFrame()));
                const unsupportedPassive = sections.filter(section => (
                    !section.querySelector('button, input, select, summary, [data-drag-point], [data-interactive-table] tbody tr, [data-interactive-table] th')
                    && !/STATIC VISUAL/i.test(section.querySelector('.math-learning-interactive-head span')?.textContent || '')
                )).map(section => section.dataset.interactiveTitle || 'untitled');
                const passive = sections.filter(section => (
                    !section.querySelector('button, input, select, summary, [data-drag-point], [data-interactive-table] tbody tr, [data-interactive-table] th')
                    && /STATIC VISUAL/i.test(section.querySelector('.math-learning-interactive-head span')?.textContent || '')
                )).length;
                return {
                    sections: sections.length,
                    operated,
                    passive,
                    unsupportedPassive,
                    dragTargets: document.querySelectorAll('.math-learning-interactive [data-drag-point]').length
                };
            });
            if (interactionAudit.dragTargets) {
                for (const handle of await syncedPage.$$('.math-learning-interactive [data-drag-point]')) {
                    const box = await handle.boundingBox();
                    if (!box) continue;
                    await syncedPage.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
                    await syncedPage.mouse.down();
                    await syncedPage.mouse.move(box.x + box.width / 2 + 12, box.y + box.height / 2 + 8);
                    await syncedPage.mouse.up();
                    interactionAudit.operated += 1;
                }
            }
            interactiveSectionCount += interactionAudit.sections;
            manipulatedControlCount += interactionAudit.operated;
            passiveVisualCount += interactionAudit.passive;
            assert.deepEqual(interactionAudit.unsupportedPassive, [], `${entry.route}: non-static interactive sections have no operable controls`);
        }
    }
    assert.equal(interactiveSectionCount > 0, true, 'Math topics must expose interactive sections');
    assert.equal(manipulatedControlCount + passiveVisualCount >= interactiveSectionCount, true, 'Every non-static interactive section must be exercised');
    await syncedPage.evaluate(route => { window.location.hash = `#${route}`; }, routes.at(-1));
    await syncedPage.waitForFunction(() => (
        document.querySelector('[data-math-learning-breadcrumb]')?.textContent.trim() === 'Uncertainty'
    ));
    await syncedPage.click('[data-mark-complete]');
    await syncedPage.waitForFunction(() => document.querySelector('[data-mark-complete]')?.textContent.includes('Selesai'));
    assert.equal(String(savedPayloads.at(-1)?.chapter_id), '704');
    const syncedState = await syncedPage.evaluate(() => JSON.parse(
        localStorage.getItem('heraiMathLearningSubmodule07') || '{}'
    ));
    assert.deepEqual(syncedState.completed, ['topic-04']);
    assert.deepEqual(syncedState.pending, []);

    const practiceRoute = registeredRoutes.find(entry => entry.type === 'practice' && entry.route.includes('integrated-case-study')).route;
    await syncedPage.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
    await syncedPage.evaluate(route => { window.location.hash = route; }, practiceRoute);
    await syncedPage.waitForSelector('[data-math-practice-form] textarea[name="answer-08"]', { timeout: 15000 });
    assert.equal(await syncedPage.$$eval('[data-math-practice-form] textarea', fields => fields.length), 8);
    assert.equal(await syncedPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    assert.equal(await syncedPage.$$eval('[data-math-practice-form] textarea', fields => fields.every(field => Boolean(field.labels?.length))), true);
    await syncedPage.evaluate(() => {
        document.querySelectorAll('[data-math-practice-form] textarea').forEach((field, index) => {
            field.value = index < 7 ? `Jawaban browser ${index + 1}` : '';
            field.dispatchEvent(new Event('input', { bubbles: true }));
        });
    });
    await syncedPage.click('[data-math-practice-form] button[type="submit"]');
    await syncedPage.waitForFunction(() => /belum lengkap/i.test(document.querySelector('[data-practice-status]')?.textContent || ''));
    assert.equal(exercisePayloads.length, 0);
    await syncedPage.type('[data-math-practice-form] textarea[name="answer-08"]', 'Jawaban browser 8');
    await syncedPage.click('[data-math-practice-form] button[type="submit"]');
    await syncedPage.waitForFunction(() => /progres akun masih tertunda/i.test(document.querySelector('[data-practice-status]')?.textContent || ''));
    assert.match(await syncedPage.$eval('[data-math-practice-form] button[type="submit"]', button => button.textContent), /Coba sinkronkan progres/i);
    assert.equal(await syncedPage.$eval('[data-math-practice-form] button[type="submit"]', button => button.disabled), false);
    const pendingPracticeState = await syncedPage.evaluate(() => JSON.parse(
        localStorage.getItem('heraiMathLearningSubmodule07') || '{}'
    ));
    assert.equal(pendingPracticeState.pending.includes('practice'), true);
    await syncedPage.click('[data-math-practice-form] button[type="submit"]');
    await syncedPage.waitForFunction(() => /progres akun dikonfirmasi/i.test(document.querySelector('[data-practice-status]')?.textContent || ''));
    assert.equal(exercisePayloads.at(-1).action, 'submitParticipantExercise');
    assert.equal(exercisePayloads.at(-1).exercise_id, 'practice-07');
    assert.equal(Object.keys(exercisePayloads.at(-1).answers).length, 8);
    assert.equal(exercisePayloads.length, 2);
    assert.equal(await syncedPage.$eval('[data-math-practice-form] textarea[name="answer-01"]', field => field.readOnly), true);

    await syncedPage.evaluate(route => { window.location.hash = `#${route}`; }, routes.at(-1));
    await syncedPage.waitForSelector('[data-math-learning-breadcrumb]');
    await syncedPage.evaluate(route => { window.location.hash = route; }, practiceRoute);
    await syncedPage.waitForFunction(() => document.querySelector('[data-math-practice-form] textarea[name="answer-08"]')?.readOnly === true);
    assert.equal(await syncedPage.$eval('[data-math-practice-form] textarea[name="answer-08"]', field => field.value), 'Jawaban browser 8');

    const discussionRoute = registeredRoutes.find(entry => entry.type === 'discussion' && entry.route.includes('integrated-case-study')).route;
    await syncedPage.evaluate(route => { window.location.hash = route; }, discussionRoute);
    await syncedPage.waitForSelector('[data-discussion-prompt="discussion-07-02"] textarea', { timeout: 15000 });
    assert.equal(await syncedPage.$$eval('.math-learning-discussion-form', forms => forms.length), 2);
    assert.equal(await syncedPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    assert.equal(await syncedPage.$$eval('.math-learning-discussion-form textarea', fields => fields.every(field => Boolean(field.labels?.length))), true);
    await syncedPage.type('[data-discussion-prompt="discussion-07-01"] textarea', 'Respons diskusi browser pertama');
    await syncedPage.click('[data-discussion-prompt="discussion-07-01"] button[type="submit"]');
    await syncedPage.waitForFunction(() => /dikonfirmasi oleh server/i.test(document.querySelector('[data-discussion-prompt="discussion-07-01"] [data-discussion-status]')?.textContent || ''));
    await syncedPage.type('[data-discussion-prompt="discussion-07-02"] textarea', 'Respons diskusi browser kedua');
    await syncedPage.click('[data-discussion-prompt="discussion-07-02"] button[type="submit"]');
    await syncedPage.waitForFunction(() => /progres akun masih tertunda/i.test(document.querySelector('[data-discussion-overall]')?.textContent || ''));
    await syncedPage.click('[data-discussion-prompt="discussion-07-01"] button[type="submit"]');
    await syncedPage.waitForFunction(() => /progres akun sudah dikonfirmasi/i.test(document.querySelector('[data-discussion-overall]')?.textContent || ''));
    assert.deepEqual(discussionPayloads.map(payload => payload.prompt), ['discussion-07-01', 'discussion-07-02', 'discussion-07-01']);

    const persistedState = await syncedPage.evaluate(() => JSON.parse(
        localStorage.getItem('heraiMathLearningSubmodule07') || '{}'
    ));
    assert.equal(persistedState.completed.includes('practice'), true);
    assert.equal(persistedState.completed.includes('discussion'), true);
    assert.deepEqual(persistedState.pending, []);

    await syncedPage.evaluate(() => {
        window.location.hash = '#/participant-ai-lab-math/kenapa-ai-butuh-matematika';
    });
    await syncedPage.waitForSelector('[data-diagnostic-form] [data-diagnostic-question="D10"]', { timeout: 15000 });
    assert.equal(await syncedPage.$$eval('[data-diagnostic-question]', questions => questions.length), 10);
    await syncedPage.$eval('[data-diagnostic-form]', form => form.requestSubmit());
    await syncedPage.waitForFunction(() => /masih ada yang kosong/i.test(document.querySelector('[data-diagnostic-result]')?.textContent || ''));
    assert.equal(await syncedPage.evaluate(() => document.activeElement?.closest('[data-diagnostic-question]')?.dataset.diagnosticQuestion), 'D1');
    await syncedPage.evaluate(() => {
        document.querySelectorAll('[data-diagnostic-question]').forEach(question => {
            question.querySelector('input')?.click();
        });
        document.querySelector('[data-diagnostic-form]')?.requestSubmit();
    });
    await syncedPage.waitForFunction(() => (
        document.querySelector('[data-diagnostic-result]')?.classList.contains('is-complete')
        && document.querySelectorAll('[data-diagnostic-feedback].is-correct, [data-diagnostic-feedback].is-incorrect').length === 10
    ));

    for (const candidate of readinessCandidates) {
        const baseRoute = `#/participant-ai-lab-math/${candidate.slug}`;

        if (candidate.id !== '07') {
            await syncedPage.evaluate(route => { window.location.hash = `${route}/latihan`; }, baseRoute);
            await syncedPage.waitForFunction(id => (
                document.querySelector('[data-math-submodule-label]')?.textContent.trim() === `Submodul ${id}`
                && document.querySelector('#mathLearningRoot')?.dataset.mathContentType === 'practice'
                && document.querySelectorAll('[data-math-practice-form] textarea').length === 8
            ), { timeout: 15000 }, candidate.id);
            assert.equal(await syncedPage.$$eval('[data-math-practice-form] textarea', fields => fields.every(field => Boolean(field.labels?.length))), true);
            const exerciseCountBeforeIncomplete = exercisePayloads.length;
            await syncedPage.evaluate(id => {
                document.querySelectorAll('[data-math-practice-form] textarea').forEach((field, index) => {
                    field.value = index < 7 ? `Jawaban kandidat ${id}-${index + 1}` : '';
                    field.dispatchEvent(new Event('input', { bubbles: true }));
                });
                document.querySelector('[data-math-practice-form]')?.requestSubmit();
            }, candidate.id);
            await syncedPage.waitForFunction(() => /belum lengkap/i.test(document.querySelector('[data-practice-status]')?.textContent || ''));
            assert.equal(exercisePayloads.length, exerciseCountBeforeIncomplete);
            assert.equal(await syncedPage.evaluate(() => document.activeElement?.getAttribute('name')), 'answer-08');
            await syncedPage.type('[data-math-practice-form] textarea[name="answer-08"]', `Jawaban kandidat ${candidate.id}-8`);
            await syncedPage.$eval('[data-math-practice-form]', form => form.requestSubmit());
            await syncedPage.waitForFunction(() => /progres akun dikonfirmasi/i.test(document.querySelector('[data-practice-status]')?.textContent || ''));
            assert.equal(exercisePayloads.at(-1)?.exercise_id, `practice-${candidate.id}`);
            assert.equal(Object.keys(exercisePayloads.at(-1)?.answers || {}).length, 8);
        }

        await syncedPage.evaluate(route => { window.location.hash = `${route}/kuis`; }, baseRoute);
        await syncedPage.waitForFunction(id => (
            document.querySelector('[data-math-submodule-label]')?.textContent.trim() === `Submodul ${id}`
            && document.querySelectorAll('[data-quiz-question]').length === 10
        ), { timeout: 15000 }, candidate.id);
        assert.equal(await syncedPage.$$eval('[data-quiz-question]', questions => questions.every(question => question.querySelectorAll('input[type="radio"]').length === 4)), true);
        assert.equal(await syncedPage.$$eval('.math-learning-quiz-option.is-correct, [data-quiz-review]:not(:empty)', nodes => nodes.length), 0);
        const progressCountBeforeIncompleteQuiz = savedPayloads.length;
        await syncedPage.$eval('[data-quiz-form]', form => form.requestSubmit());
        assert.equal(await syncedPage.evaluate(() => document.activeElement?.closest('[data-quiz-question]')?.dataset.quizQuestion), '1');
        assert.equal(savedPayloads.length, progressCountBeforeIncompleteQuiz);
        await syncedPage.evaluate(answers => {
            answers.forEach((answer, index) => {
                document.querySelector(`input[name="quiz-${index + 1}"][value="${answer}"]`)?.click();
            });
            document.querySelector('[data-quiz-form]')?.requestSubmit();
        }, candidate.answers);
        await syncedPage.waitForFunction(() => /skor 10\/10/i.test(document.querySelector('[data-quiz-form] button[type="submit"]')?.textContent || ''));
        assert.equal(String(savedPayloads.at(-1)?.chapter_id), `quiz-${candidate.id}`);
        assert.equal(Number(savedPayloads.at(-1)?.score), 100);

        if (candidate.id !== '07') {
            await syncedPage.evaluate(route => { window.location.hash = `${route}/diskusi`; }, baseRoute);
            await syncedPage.waitForFunction(id => (
                document.querySelector('[data-math-submodule-label]')?.textContent.trim() === `Submodul ${id}`
                && document.querySelectorAll('.math-learning-discussion-form').length === 2
            ), { timeout: 15000 }, candidate.id);
            assert.equal(await syncedPage.$$eval('.math-learning-discussion-form textarea', fields => fields.every(field => Boolean(field.labels?.length))), true);
            const discussionCountBeforeEmpty = discussionPayloads.length;
            await syncedPage.$eval('.math-learning-discussion-form', form => form.requestSubmit());
            assert.equal(await syncedPage.evaluate(() => document.activeElement?.matches('.math-learning-discussion-form textarea')), true);
            assert.equal(discussionPayloads.length, discussionCountBeforeEmpty);
            for (const promptNumber of ['01', '02']) {
                const promptId = `discussion-${candidate.id}-${promptNumber}`;
                await syncedPage.type(`[data-discussion-prompt="${promptId}"] textarea`, `Respons kandidat ${promptId}`);
                await syncedPage.$eval(`[data-discussion-prompt="${promptId}"] button[type="submit"]`, button => button.click());
                try {
                    await syncedPage.waitForFunction(id => /dikonfirmasi oleh server/i.test(
                        document.querySelector(`[data-discussion-prompt="${id}"] [data-discussion-status]`)?.textContent || ''
                    ), { timeout: 45000 }, promptId);
                } catch (error) {
                    const diagnostic = await syncedPage.evaluate(id => ({
                        status: document.querySelector(`[data-discussion-prompt="${id}"] [data-discussion-status]`)?.textContent || '',
                        buttonDisabled: document.querySelector(`[data-discussion-prompt="${id}"] button[type="submit"]`)?.disabled,
                        hash: window.location.hash
                    }), promptId);
                    throw new Error(`Discussion acknowledgment timeout for ${promptId}: ${JSON.stringify({ diagnostic, failedLocalRequests, badLocalResponses })}`, { cause: error });
                }
            }
            await syncedPage.waitForFunction(() => /progres akun sudah dikonfirmasi/i.test(document.querySelector('[data-discussion-overall]')?.textContent || ''));
            assert.deepEqual(discussionPayloads.slice(-2).map(payload => payload.prompt), [
                `discussion-${candidate.id}-01`,
                `discussion-${candidate.id}-02`
            ]);
        }
    }

    const responsiveRoutes = readinessCandidates.flatMap(candidate => {
        const candidateRoutes = readinessRoutes.filter(entry => entry.route.includes(`/${candidate.slug}`));
        const topics = candidateRoutes.filter(entry => entry.type === 'topic');
        return [
            candidateRoutes.find(entry => entry.type === 'info'),
            topics.at(-1),
            candidateRoutes.find(entry => entry.type === 'practice'),
            candidateRoutes.find(entry => entry.type === 'quiz'),
            candidateRoutes.find(entry => entry.type === 'discussion')
        ];
    });
    assert.equal(responsiveRoutes.length, 35);
    assert.equal(responsiveRoutes.every(Boolean), true);
    for (const width of [768, 1024, 1440]) {
        await syncedPage.setViewport({ width, height: 900, deviceScaleFactor: 1 });
        for (const entry of responsiveRoutes) {
            await syncedPage.evaluate(route => { window.location.hash = route; }, entry.route);
            await syncedPage.waitForFunction(expected => (
                document.querySelector('[data-math-learning-breadcrumb]')?.textContent.trim() === expected.short
                && document.querySelector('#mathLearningRoot')?.dataset.mathContentType === expected.type
            ), { timeout: 15000 }, entry);
            assert.equal(await syncedPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `${entry.route} at ${width}px`);
        }
    }
    await syncedPage.setViewport({ width: 844, height: 390, deviceScaleFactor: 1 });
    for (const candidate of readinessCandidates) {
        const entry = readinessRoutes.filter(route => (
            route.type === 'topic' && route.route.includes(`/${candidate.slug}`)
        )).at(-1);
        await syncedPage.evaluate(route => { window.location.hash = route; }, entry.route);
        await syncedPage.waitForFunction(expected => (
            document.querySelector('[data-math-learning-breadcrumb]')?.textContent.trim() === expected.short
        ), { timeout: 15000 }, entry);
        assert.equal(await syncedPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `${entry.route}: landscape overflow`);
    }
    await syncedPage.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
    for (const candidate of readinessCandidates) {
        const entry = readinessRoutes.find(route => route.type === 'info' && route.route.includes(`/${candidate.slug}`));
        await syncedPage.evaluate(route => { window.location.hash = route; }, entry.route);
        await syncedPage.waitForFunction(expected => (
            document.querySelector('[data-math-learning-breadcrumb]')?.textContent.trim() === expected.short
        ), { timeout: 15000 }, entry);
        await syncedPage.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
        assert.equal(await syncedPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `${entry.route}: 200% text overflow`);
        await syncedPage.evaluate(() => { document.documentElement.style.fontSize = ''; });
    }
    await syncedPage.waitForFunction(() => {
        const button = document.querySelector('.fellow-menu-toggle');
        if (!button) return false;
        const rect = button.getBoundingClientRect();
        return rect.width >= 44 && rect.height >= 44;
    }, { timeout: 15000 });
    const mobileMenuSize = await syncedPage.$eval('.fellow-menu-toggle', button => {
        const rect = button.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
    });
    assert.equal(mobileMenuSize.width >= 44 && mobileMenuSize.height >= 44, true, 'mobile menu touch target');
    await syncedPage.click('.fellow-menu-toggle');
    await syncedPage.waitForFunction(() => (
        document.querySelector('.fellow-dashboard')?.classList.contains('sidebar-open')
        && document.querySelector('.fellow-menu-toggle')?.getAttribute('aria-expanded') === 'true'
    ));
    await syncedPage.keyboard.press('Escape');
    await syncedPage.waitForFunction(() => (
        !document.querySelector('.fellow-dashboard')?.classList.contains('sidebar-open')
        && document.querySelector('.fellow-menu-toggle')?.getAttribute('aria-expanded') === 'false'
    ));
    await syncedPage.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    for (const candidate of readinessCandidates) {
        const entry = readinessRoutes.filter(route => (
            route.type === 'topic' && route.route.includes(`/${candidate.slug}`)
        )).at(-1);
        await syncedPage.evaluate(route => { window.location.hash = route; }, entry.route);
        await syncedPage.waitForFunction(expected => (
            document.querySelector('[data-math-learning-breadcrumb]')?.textContent.trim() === expected.short
        ), { timeout: 15000 }, entry);
        assert.equal(await syncedPage.$('#mathLearningRoot .math-learning-error'), null);
    }
    await syncedPage.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);

    await syncedPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const route of foundationRoutes) {
        await syncedPage.goto(`${baseUrl}/#${route}`);
        await syncedPage.waitForSelector('#app-content .fellow-dashboard[data-fellow-page="modules"]', { timeout: 15000 });
        const audit = await syncedPage.evaluate(() => ({
            headings: document.querySelectorAll('#app-content h1').length,
            missingAlt: document.querySelectorAll('#app-content img:not([alt])').length,
            fallback404: /halaman tidak ditemukan/i.test(document.querySelector('#app-content')?.innerText || '')
        }));
        assert.equal(audit.headings > 0, true, `${route}: missing h1`);
        assert.equal(audit.missingAlt, 0, `${route}: image without alt`);
        assert.equal(audit.fallback404, false, `${route}: router fallback`);
    }
    await syncedPage.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
    for (const module of foundationModules) {
        const route = `/participant-ai-${module}`;
        await syncedPage.goto(`${baseUrl}/#${route}`);
        await syncedPage.waitForSelector('#app-content .fellow-dashboard[data-fellow-page="modules"]', { timeout: 15000 });
        assert.equal(
            await syncedPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
            true,
            `${route}: 375px horizontal overflow`
        );
    }

    await syncedPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await syncedPage.goto(`${baseUrl}/#/participant-modules`);
    await syncedPage.waitForFunction(() => (
        document.querySelector('[data-module-side-summary-state]')?.dataset.moduleSideSummaryState === 'ready'
    ), { timeout: 15000 });
    const foundationSummaryAudit = await syncedPage.evaluate(() => ({
        heading: document.querySelector('[data-module-side-summary-state] h2')?.textContent.trim(),
        donutLabel: document.querySelector('[data-module-summary-scope-label]')?.textContent.trim(),
        overall: document.querySelector('[data-module-side-progress]')?.textContent.trim(),
        aiProgress: document.querySelector('[data-course-progress="ai-fundamentals-advanced"]')?.textContent.trim(),
        mathProgress: document.querySelector('[data-course-progress="math-for-ai"]')?.textContent.trim(),
        scope: document.querySelector('[data-module-summary-scope]')?.textContent.trim()
    }));
    assert.equal(foundationSummaryAudit.heading, 'Progres Keseluruhan');
    assert.equal(foundationSummaryAudit.donutLabel, '2 course aktif');
    assert.equal(foundationSummaryAudit.overall, '86%');
    assert.equal(foundationSummaryAudit.aiProgress, '72%');
    assert.equal(foundationSummaryAudit.mathProgress, '100%');
    assert.match(foundationSummaryAudit.scope, /72% AI Fundamentals.*100% Math for AI.*86%/);

    await syncedPage.evaluate(() => {
        window.scrollTo(0, 700);
        var main = document.querySelector('.fellow-main');
        if (main) main.scrollTop = 700;
    });
    await syncedPage.goto(`${baseUrl}/#/participant-ai-fundamentals`);
    await syncedPage.waitForFunction(() => (
        document.querySelector('[data-learning-summary-state]')?.dataset.learningSummaryState === 'ready'
    ), { timeout: 15000 });
    const aiCourseSummaryAudit = await syncedPage.evaluate(() => ({
        heading: document.querySelector('[data-learning-summary-state] h2')?.textContent.trim(),
        progress: document.querySelector('[data-learning-summary-progress]')?.textContent.trim(),
        completed: document.querySelector('[data-learning-summary-completed]')?.textContent.trim(),
        inProgress: document.querySelector('[data-learning-summary-in-progress]')?.textContent.trim(),
        notStarted: document.querySelector('[data-learning-summary-not-started]')?.textContent.trim(),
        scope: document.querySelector('.course-summary-scope')?.textContent.trim(),
        ringValue: document.querySelector('[data-learning-summary-donut]')?.style.getPropertyValue('--course-progress').trim(),
        windowScroll: Math.round(window.scrollY),
        mainScroll: Math.round(document.querySelector('.fellow-main')?.scrollTop || 0)
    }));
    assert.equal(aiCourseSummaryAudit.heading, 'Progres AI Fundamentals');
    assert.equal(aiCourseSummaryAudit.progress, '72%');
    assert.deepEqual([aiCourseSummaryAudit.completed, aiCourseSummaryAudit.inProgress, aiCourseSummaryAudit.notStarted], ['3', '3', '0']);
    assert.match(aiCourseSummaryAudit.scope, /Pengantar AI.*Evolution of AI/);
    assert.equal(aiCourseSummaryAudit.ringValue, '72%');
    assert.deepEqual([aiCourseSummaryAudit.windowScroll, aiCourseSummaryAudit.mainScroll], [0, 0]);
    await syncedPage.waitForNetworkIdle({ idleTime: 250, timeout: 5000 });

    await syncedPage.click('[data-fellow-nav="mentor"]');
    await syncedPage.waitForSelector('.fellow-restricted-state .fellow-restricted-actions');
    const restrictedAudit = await syncedPage.evaluate(() => ({
        copy: document.querySelector('.fellow-restricted-state p')?.textContent.trim(),
        links: [...document.querySelectorAll('.fellow-restricted-actions a')].map(link => ({
            label: link.textContent.trim(),
            href: link.getAttribute('href'),
            height: Math.round(link.getBoundingClientRect().height)
        })),
        overflow: document.documentElement.scrollWidth > window.innerWidth
    }));
    assert.match(restrictedAudit.copy, /Beranda.*Modul Pembelajaran.*Leaderboard.*Pengaturan/);
    assert.deepEqual(restrictedAudit.links.map(link => ({ label: link.label, href: link.href })), [
        { label: 'Beranda', href: '#/participant-dashboard' },
        { label: 'Modul Pembelajaran', href: '#/participant-modules' },
        { label: 'Leaderboard', href: '#/participant-leaderboard' },
        { label: 'Pengaturan', href: '#/participant-settings' }
    ]);
    assert.equal(restrictedAudit.links.every(link => link.height >= 44), true, 'restricted navigation touch targets');
    assert.equal(restrictedAudit.overflow, false, 'restricted navigation desktop overflow');
    const restrictedTargets = [
        { href: '#/participant-dashboard', selector: '#dashboardModuleGrid' },
        { href: '#/participant-modules', selector: '.fellow-dashboard[data-fellow-page="modules"]' },
        { href: '#/participant-leaderboard', selector: '.participant-leaderboard-page' },
        { href: '#/participant-settings', selector: '.fellow-dashboard .settings-page' }
    ];
    for (const [index, target] of restrictedTargets.entries()) {
        await syncedPage.click(`.fellow-restricted-actions a[href="${target.href}"]`);
        await syncedPage.waitForSelector(target.selector, { timeout: 15000 });
        if (index < restrictedTargets.length - 1) {
            await syncedPage.evaluate(() => { window.location.hash = '/participant-mentor'; });
            await syncedPage.waitForSelector('.fellow-restricted-actions', { timeout: 15000 });
        }
    }

    await syncedPage.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });

    mockedProgressRows = canonicalProgressRows;
    await syncedPage.evaluate(() => {
        Object.keys(localStorage)
            .filter(key => key.startsWith('heraiMathLearningSubmodule'))
            .forEach(key => localStorage.removeItem(key));
    });
    await syncedPage.goto(`${baseUrl}/#/participant-ai-lab-math`);
    await syncedPage.waitForFunction(() => (
        document.querySelector('[data-math-overview-state]')?.dataset.mathOverviewState === 'ready'
        && document.querySelector('[data-math-overview-side-progress]')?.textContent.trim() === '100%'
    ), { timeout: 15000 });
    const overviewAudit = await syncedPage.evaluate(() => ({
        progress: document.querySelector('[data-math-overview-progress]')?.textContent.trim(),
        sideProgress: document.querySelector('[data-math-overview-side-progress]')?.textContent.trim(),
        completed: document.querySelector('[data-math-overview-completed]')?.textContent.trim(),
        total: document.querySelector('[data-math-overview-total]')?.textContent.trim(),
        submodules: document.querySelector('[data-math-overview-submodules]')?.textContent.trim(),
        topics: document.querySelector('[data-math-overview-topics]')?.textContent.trim(),
        status: document.querySelector('[data-math-overview-status]')?.textContent.trim(),
        ariaBusy: document.querySelector('[data-math-overview-state]')?.getAttribute('aria-busy'),
        retryHidden: document.querySelector('[data-math-overview-retry]')?.hidden,
        completedCards: document.querySelectorAll('[data-math-submodule].done').length,
        progressBadges: document.querySelectorAll('[data-math-submodule-progress]').length,
        mobileHeaderPosition: getComputedStyle(document.querySelector('.module-topbar')).position,
        overflow: document.documentElement.scrollWidth > window.innerWidth
    }));
    assert.deepEqual(overviewAudit, {
        progress: '100%',
        sideProgress: '100%',
        completed: '89',
        total: '89',
        submodules: '7',
        topics: '54',
        status: 'Progres terbaru sudah tersinkron dengan akun peserta.',
        ariaBusy: 'false',
        retryHidden: true,
        completedCards: 7,
        progressBadges: 7,
        mobileHeaderPosition: 'relative',
        overflow: false
    });

    await syncedPage.evaluate(() => {
        const key = 'heraiMathLearningSubmodule01';
        const state = JSON.parse(localStorage.getItem(key) || '{}');
        state.completed = (state.completed || []).filter(id => id !== 'info');
        localStorage.setItem(key, JSON.stringify(state));
    });
    delayNextMathShell = true;
    await syncedPage.evaluate(route => { window.location.hash = route; }, registeredRoutes[0].route);
    await syncedPage.waitForSelector('[data-route-loading].is-visible', { timeout: 5000 });
    assert.equal(await syncedPage.$eval('[data-route-loading]', loader => loader.getAttribute('role')), 'status');
    await syncedPage.waitForFunction(expected => (
        document.querySelector('[data-math-learning-breadcrumb]')?.textContent.trim() === expected.short
        && document.querySelector('#mathLearningRoot')?.dataset.mathContentType === expected.type
        && Boolean(document.querySelector('.math-learning-next-link'))
    ), { timeout: 15000 }, registeredRoutes[0]);
    assert.equal(await syncedPage.$('[data-route-loading]'), null);

    delayNextProgressSave = true;
    await syncedPage.click('.math-learning-next-link');
    await syncedPage.waitForFunction(() => (
        document.querySelector('.math-learning-next-link')?.classList.contains('is-loading')
        && document.querySelector('.math-learning-next-link')?.getAttribute('aria-busy') === 'true'
    ));
    await syncedPage.waitForFunction(expected => (
        document.querySelector('[data-math-learning-breadcrumb]')?.textContent.trim() === expected.short
    ), { timeout: 15000 }, registeredRoutes[1]);

    await syncedPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await syncedPage.evaluate(route => { window.location.hash = route; }, practiceRoute);
    await syncedPage.waitForSelector('[data-math-practice-form] textarea[name="answer-08"]', { timeout: 15000 });
    assert.equal(await syncedPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    assert.deepEqual(syncedPageErrors, []);
    assert.deepEqual(failedLocalRequests, []);
    assert.deepEqual(badLocalResponses, []);
    assert.deepEqual(syncedConsoleErrors, []);
    console.log(`Local learning regression valid: all 89 Math routes and submodules 01–07 pass accessibility; ${interactiveSectionCount} visual/interactive sections audited (${manipulatedControlCount} controls exercised, ${passiveVisualCount} intentional static visuals); incomplete-form focus, 8/8 practice, 10-question keyed quiz, two-prompt discussion, persistence/retry, 375/768/1024/1440px, landscape, 200% text, mobile navigation, and reduced-motion checks; all 24 routes across six Foundation modules render with mobile overflow smoke coverage.`);
} finally {
    if (browser) await browser.close();
    if (server.exitCode === null) {
        const exited = once(server, 'exit');
        server.kill('SIGTERM');
        await Promise.race([
            exited,
            new Promise(resolveWait => setTimeout(resolveWait, 2000))
        ]);
    }
}
