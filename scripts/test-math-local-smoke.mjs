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

    const syncedPage = await browser.newPage();
    const savedPayloads = [];
    const syncedPageErrors = [];
    syncedPage.on('pageerror', error => syncedPageErrors.push(error.message));
    await syncedPage.setRequestInterception(true);
    syncedPage.on('request', request => {
        if (request.url() === `${baseUrl}/__gas` && request.method() === 'POST') {
            const payload = JSON.parse(request.postData() || '{}');
            if (payload.action === 'saveParticipantProgress') savedPayloads.push(payload);
            request.respond({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ status: 'success', data: [] })
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
    console.log('Local Math smoke valid: all 89 routes render; failed writes remain pending; acknowledged topic-04 writes ID 704 and clears pending state.');
} finally {
    if (browser) await browser.close();
    server.kill('SIGTERM');
}
