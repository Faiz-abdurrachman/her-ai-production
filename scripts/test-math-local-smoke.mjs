import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import puppeteer from 'puppeteer';

const repositoryRoot = resolve(import.meta.dirname, '..');
const port = '4317';
const baseUrl = `http://127.0.0.1:${port}`;
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

async function waitForServer() {
    for (let attempt = 0; attempt < 40; attempt += 1) {
        try {
            const response = await fetch(`${baseUrl}/healthz`);
            const health = await response.json();
            assert.equal(health.gasProxy, 'disabled');
            return;
        } catch {
            await new Promise(resolveWait => setTimeout(resolveWait, 100));
        }
    }
    throw new Error('Local safe-mode server did not become ready.');
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
    await page.goto(`${baseUrl}/#/home`);
    await page.evaluate(() => {
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
    let savedExercise = null;
    const savedDiscussions = new Map();
    let exerciseProgressFailuresRemaining = 1;
    let discussionProgressFailuresRemaining = 1;
    const syncedPageErrors = [];
    syncedPage.on('pageerror', error => syncedPageErrors.push(error.message));
    await syncedPage.setRequestInterception(true);
    syncedPage.on('request', request => {
        if (request.url() === `${baseUrl}/__gas` && request.method() === 'POST') {
            const payload = JSON.parse(request.postData() || '{}');
            if (payload.action === 'saveParticipantProgress') savedPayloads.push(payload);
            let responseBody = { status: 'success', data: [] };
            if (payload.action === 'getParticipantExerciseSubmissions') {
                responseBody = { status: 'success', data: savedExercise ? [savedExercise] : [] };
            } else if (payload.action === 'saveParticipantExerciseDraft' || payload.action === 'submitParticipantExercise') {
                exercisePayloads.push(payload);
                savedExercise = {
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
                const discussionComplete = savedDiscussions.has('discussion-07-01')
                    && savedDiscussions.has('discussion-07-02');
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
    await syncedPage.goto(`${baseUrl}/#/home`);
    await syncedPage.evaluate(() => {
        sessionStorage.setItem('heraiParticipantSession', JSON.stringify({
            nik: '0000000000000000',
            token: 'local-smoke-test-only',
            expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString()
        }));
    });
    await syncedPage.goto(`${baseUrl}/#${routes.at(-1)}`);
    await syncedPage.waitForSelector('#mathLearningRoot .math-learning-lesson-hero h1', { timeout: 15000 });
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
    await syncedPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await syncedPage.evaluate(route => { window.location.hash = route; }, practiceRoute);
    await syncedPage.waitForSelector('[data-math-practice-form] textarea[name="answer-08"]', { timeout: 15000 });
    assert.equal(await syncedPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    assert.deepEqual(syncedPageErrors, []);
    console.log('Local Math smoke valid: all 89 routes render; failed writes stay local/pending; topic 704, practice-07 (8/8), discussion-07 (2/2), reload restore, labels, and 375/1440px overflow checks pass.');
} finally {
    if (browser) await browser.close();
    server.kill('SIGTERM');
}
