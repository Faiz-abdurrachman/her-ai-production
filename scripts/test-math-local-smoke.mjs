import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import puppeteer from 'puppeteer';

const repositoryRoot = resolve(import.meta.dirname, '..');
const port = String(32000 + Math.floor(Math.random() * 10000));
const baseUrl = `http://127.0.0.1:${port}`;
const releaseCandidates = [
    {
        id: '01',
        slug: 'kenapa-ai-butuh-matematika',
        quizSource: 'materi2/math for ai/kenapa ai butuh matematika/kuis.md'
    },
    {
        id: '02',
        slug: 'linear-algebra',
        quizSource: 'materi2/math for ai/02-linear-algebra/kuis.md'
    }
].map(candidate => ({
    ...candidate,
    answers: [...readFileSync(resolve(repositoryRoot, candidate.quizSource), 'utf8')
        .matchAll(/\*\*(?:Jawaban benar|Correct answer):\*\*\s*([A-D])/g)]
        .map(match => match[1])
}));
releaseCandidates.forEach(candidate => assert.equal(candidate.answers.length, 10, `Submodule ${candidate.id} quiz key`));
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

    for (const route of routes) {
        await page.goto(`${baseUrl}/#${route}`);
        await page.waitForSelector('#mathLearningRoot .math-learning-lesson-hero h1', { timeout: 15000 });
        assert.equal(await page.$('#mathLearningRoot .math-learning-error'), null, route);
    }
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
            failedLocalRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText || ''}`);
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
    syncedPage.on('request', request => {
        if (request.url() === `${baseUrl}/__gas` && request.method() === 'POST') {
            const payload = JSON.parse(request.postData() || '{}');
            if (payload.action === 'saveParticipantProgress') savedPayloads.push(payload);
            let responseBody = { status: 'success', data: [] };
            if (payload.action === 'getParticipantExerciseSubmissions') {
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
            request.respond({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(responseBody)
            });
            return;
        }
        request.continue();
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
    assert.equal(registeredRoutes.length, 89);
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

    const releaseCandidateRoutes = registeredRoutes.filter(entry => (
        entry.route.includes('/kenapa-ai-butuh-matematika')
        || entry.route.includes('/linear-algebra')
    ));
    assert.equal(releaseCandidateRoutes.length, 25);
    await syncedPage.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
    for (const entry of releaseCandidateRoutes) {
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
                'button, .math-learning-quiz-option, .math-learning-diagnostic-option'
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
    }
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

    for (const candidate of releaseCandidates) {
        const baseRoute = `#/participant-ai-lab-math/${candidate.slug}`;

        await syncedPage.evaluate(route => { window.location.hash = `${route}/latihan`; }, baseRoute);
        await syncedPage.waitForFunction(id => (
            document.querySelector('[data-math-submodule-label]')?.textContent.trim() === `Submodul ${id}`
            && document.querySelector('#mathLearningRoot')?.dataset.mathContentType === 'practice'
            && document.querySelectorAll('[data-math-practice-form] textarea').length === 8
        ), { timeout: 15000 }, candidate.id);
        assert.equal(await syncedPage.$$eval('[data-math-practice-form] textarea', fields => fields.every(field => Boolean(field.labels?.length))), true);
        await syncedPage.evaluate(id => {
            document.querySelectorAll('[data-math-practice-form] textarea').forEach((field, index) => {
                field.value = `Jawaban kandidat ${id}-${index + 1}`;
                field.dispatchEvent(new Event('input', { bubbles: true }));
            });
            document.querySelector('[data-math-practice-form]')?.requestSubmit();
        }, candidate.id);
        await syncedPage.waitForFunction(() => /progres akun dikonfirmasi/i.test(document.querySelector('[data-practice-status]')?.textContent || ''));
        assert.equal(exercisePayloads.at(-1)?.exercise_id, `practice-${candidate.id}`);
        assert.equal(Object.keys(exercisePayloads.at(-1)?.answers || {}).length, 8);

        await syncedPage.evaluate(route => { window.location.hash = `${route}/kuis`; }, baseRoute);
        await syncedPage.waitForFunction(id => (
            document.querySelector('[data-math-submodule-label]')?.textContent.trim() === `Submodul ${id}`
            && document.querySelectorAll('[data-quiz-question]').length === 10
        ), { timeout: 15000 }, candidate.id);
        assert.equal(await syncedPage.$$eval('[data-quiz-question]', questions => questions.every(question => question.querySelectorAll('input[type="radio"]').length === 4)), true);
        assert.equal(await syncedPage.$$eval('.math-learning-quiz-option.is-correct, [data-quiz-review]:not(:empty)', nodes => nodes.length), 0);
        await syncedPage.evaluate(answers => {
            answers.forEach((answer, index) => {
                document.querySelector(`input[name="quiz-${index + 1}"][value="${answer}"]`)?.click();
            });
            document.querySelector('[data-quiz-form]')?.requestSubmit();
        }, candidate.answers);
        await syncedPage.waitForFunction(() => /skor 10\/10/i.test(document.querySelector('[data-quiz-form] button[type="submit"]')?.textContent || ''));
        assert.equal(String(savedPayloads.at(-1)?.chapter_id), `quiz-${candidate.id}`);
        assert.equal(Number(savedPayloads.at(-1)?.score), 100);

        await syncedPage.evaluate(route => { window.location.hash = `${route}/diskusi`; }, baseRoute);
        await syncedPage.waitForFunction(id => (
            document.querySelector('[data-math-submodule-label]')?.textContent.trim() === `Submodul ${id}`
            && document.querySelectorAll('.math-learning-discussion-form').length === 2
        ), { timeout: 15000 }, candidate.id);
        assert.equal(await syncedPage.$$eval('.math-learning-discussion-form textarea', fields => fields.every(field => Boolean(field.labels?.length))), true);
        for (const promptNumber of ['01', '02']) {
            const promptId = `discussion-${candidate.id}-${promptNumber}`;
            await syncedPage.type(`[data-discussion-prompt="${promptId}"] textarea`, `Respons kandidat ${promptId}`);
            await syncedPage.click(`[data-discussion-prompt="${promptId}"] button[type="submit"]`);
            await syncedPage.waitForFunction(id => /dikonfirmasi oleh server/i.test(
                document.querySelector(`[data-discussion-prompt="${id}"] [data-discussion-status]`)?.textContent || ''
            ), {}, promptId);
        }
        await syncedPage.waitForFunction(() => /progres akun sudah dikonfirmasi/i.test(document.querySelector('[data-discussion-overall]')?.textContent || ''));
        assert.deepEqual(discussionPayloads.slice(-2).map(payload => payload.prompt), [
            `discussion-${candidate.id}-01`,
            `discussion-${candidate.id}-02`
        ]);
    }

    const responsiveRoutes = releaseCandidateRoutes.filter(entry => (
        (entry.route.endsWith('/kenapa-ai-butuh-matematika') && entry.type === 'info')
        || entry.route.endsWith('/powers-logarithms-dan-sigma')
        || entry.route.endsWith('/kenapa-ai-butuh-matematika/latihan')
        || entry.route.endsWith('/matrix-operations-multiplication')
        || entry.route.endsWith('/linear-algebra/kuis')
        || entry.route.endsWith('/linear-algebra/diskusi')
    ));
    assert.equal(responsiveRoutes.length, 6);
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
    await syncedPage.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await syncedPage.evaluate(() => {
        window.location.hash = '#/participant-ai-lab-math/linear-algebra/matrix-operations-multiplication';
    });
    await syncedPage.waitForFunction(() => document.querySelector('[data-math-learning-breadcrumb]')?.textContent.trim() === 'Matrix multiplication');
    assert.equal(await syncedPage.$('#mathLearningRoot .math-learning-error'), null);
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
    await syncedPage.evaluate(route => { window.location.hash = route; }, practiceRoute);
    await syncedPage.waitForSelector('[data-math-practice-form] textarea[name="answer-08"]', { timeout: 15000 });
    assert.equal(await syncedPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    assert.deepEqual(syncedPageErrors, []);
    assert.deepEqual(failedLocalRequests, []);
    assert.deepEqual(badLocalResponses, []);
    assert.deepEqual(syncedConsoleErrors, []);
    console.log('Local learning regression valid: 89 Math routes render; release candidates 01–02 pass accessibility, diagnostic, 8/8 practice, 10-question quiz, two-prompt discussion, persistence, 375/768/1024/1440px, and reduced-motion checks; all 24 routes across six Foundation modules render with mobile overflow smoke coverage.');
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
