import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '..');
const requireFromMainWorkspace = createRequire('/home/faiz/her6/Her-AI/package.json');
const puppeteer = requireFromMainWorkspace('puppeteer');
const pageFragment = readFileSync(resolve(repositoryRoot, 'pages/dashboard/progress-peserta.html'), 'utf8');
const adminSource = readFileSync(resolve(repositoryRoot, 'js/dashboard/admin-modules.js'), 'utf8');
const blockMarker = '    // PROGRESS PESERTA — authoritative server snapshot';
const blockStart = adminSource.lastIndexOf('    // ==========================================', adminSource.indexOf(blockMarker));
const blockEnd = adminSource.indexOf('\n})();', blockStart);
assert.ok(blockStart >= 0 && blockEnd > blockStart, 'Progress Peserta implementation block must be extractable.');
const progressImplementation = adminSource.slice(blockStart, blockEnd);

const modules = [
    ['ai-fundamentals', 'Pengantar AI', 40, 2, 5],
    ['python-untuk-ai', 'Python untuk AI', 100, 8, 8],
    ['reasoning', 'Reasoning', 0, 0, 6],
    ['konsep-ai-modern', 'Konsep AI Modern', 0, 0, 4],
    ['evaluation', 'Evaluation', 0, 0, 6],
    ['evolution', 'Evolution', 0, 0, 7]
].map(([moduleId, title, progress, completed, total]) => ({ moduleId, title, progress, completed, total }));
const submodules = Object.fromEntries(Array.from({ length: 7 }, (_, index) => {
    const id = String(index + 1).padStart(2, '0');
    return [id, { completed: id === '01' ? 1 : 0, total: id === '01' || id === '07' ? 12 : 13, progress: id === '01' ? 8 : 0 }];
}));
const participantOne = {
    participantRowId: 'row-1', maskedNik: '1111********4444', name: 'Regular One',
    aiFundamentals: { progress: 23, completedModules: 1, moduleTotal: 6, modules },
    mathForAi: { progress: 1, completedActivities: 1, totalActivities: 89, topicTotal: 54, submodules },
    overallProgress: 12, lastLearningAt: '2026-08-30T11:00:00.000Z',
    lastModuleId: 'math-for-ai', lastItemId: 'info-01'
};
const participantTwo = {
    participantRowId: 'row-2', maskedNik: '5555********8888', name: 'Regular Two',
    aiFundamentals: { progress: 0, completedModules: 0, moduleTotal: 6, modules: modules.map(row => ({ ...row, progress: 0, completed: 0 })) },
    mathForAi: { progress: 0, completedActivities: 0, totalActivities: 89, topicTotal: 54, submodules: Object.fromEntries(Object.entries(submodules).map(([id, row]) => [id, { ...row, completed: 0, progress: 0 }])) },
    overallProgress: 0, lastLearningAt: null, lastModuleId: null, lastItemId: null
};
const snapshot = {
    generatedAt: '2026-08-31T12:00:00.000Z', cacheTtlSeconds: 300,
    overview: { totalParticipants: 2, averageOverallProgress: 6, activeLearners7d: 1, activePercent: 50 },
    participants: [participantOne, participantTwo]
};

const postedPayloads = [];
const runtimeScript = `
(function() {
    function escapeHtml(value) {
        return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }
    function escapeAttr(value) { return escapeHtml(value); }
    function withAdminToken(value) { return Object.assign({}, value, { adminToken: 'fixture-admin-token' }); }
    window.checkAdminAccess = function() { return true; };
    window.loadSidebar = async function() {};
    window.updateAdminProfile = function() {};
    window.getCurrentAdminAccess = function() { return {}; };
${progressImplementation}
})();
window.initProgressPeserta();`;
const documentHtml = `<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Admin Progress Fixture</title></head><body>${pageFragment}<script>${runtimeScript.replace(/<\/script/gi, '<\\/script')}</script></body></html>`;

const server = createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/__gas') {
        let body = '';
        request.on('data', chunk => { body += chunk; });
        request.on('end', () => {
            postedPayloads.push(JSON.parse(body || '{}'));
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ status: 'success', data: snapshot }));
        });
        return;
    }
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(documentHtml);
});

await new Promise((resolveListen, rejectListen) => {
    server.once('error', rejectListen);
    server.listen(0, '127.0.0.1', resolveListen);
});
const address = server.address();
const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
});

try {
    const page = await browser.newPage();
    const pageErrors = [];
    page.on('pageerror', error => pageErrors.push(error.message));
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(`http://127.0.0.1:${address.port}/`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#progress-table-body .btn-detail');

    assert.equal(postedPayloads[0].action, 'getAdminLearningProgressSnapshot');
    assert.equal(postedPayloads[0].forceRefresh, false);
    assert.deepEqual(await page.$$eval('.premium-table th', nodes => nodes.map(node => node.textContent.trim())), [
        'Nama Peserta', 'AI Fundamentals', 'Math for AI', 'Overall', 'Terakhir Belajar', 'Aksi'
    ]);
    assert.equal(await page.$$eval('#progress-table-body tr', rows => rows.length), 2);
    assert.equal(await page.$eval('#progress-table-body', node => node.textContent.includes('Kelas AI Mastery') || node.textContent.includes('HerAI Labs')), false);
    assert.deepEqual(await page.$$eval('.premium-summary-content .main-val', nodes => nodes.map(node => node.textContent.replace(/\s+/g, ' ').trim())), ['2', '6%', '1 50%']);

    const detailButtonHeight = await page.$eval('.btn-detail', button => button.getBoundingClientRect().height);
    assert.ok(detailButtonHeight >= 44, 'Detail touch target must be at least 44px high.');
    await page.click('#progress-table-body .btn-detail');
    await page.waitForSelector('.pr-modal-dialog');
    const modalText = await page.$eval('.pr-modal-dialog', node => node.textContent.replace(/\s+/g, ' '));
    assert.match(modalText, /Regular One/);
    assert.match(modalText, /12%/);
    assert.match(modalText, /1 \/ 89 aktivitas/);
    assert.match(modalText, /54 topik/);
    assert.match(modalText, /Nilai ini memakai snapshot server/);
    assert.equal(pageErrors.length, 0, pageErrors.join('\n'));

    await page.keyboard.press('Escape');
    await page.waitForSelector('.pr-modal-dialog', { hidden: true });
    await page.click('#refresh-progress-btn');
    await page.waitForFunction(() => !document.querySelector('#refresh-progress-btn').disabled);
    assert.equal(postedPayloads.at(-1).forceRefresh, true);

    await page.setViewport({ width: 390, height: 844, isMobile: true });
    const overflowAudit = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        pageWidth: document.documentElement.scrollWidth,
        tableWrapperScrolls: document.querySelector('.premium-table').parentElement.scrollWidth > document.querySelector('.premium-table').parentElement.clientWidth
    }));
    assert.equal(overflowAudit.pageWidth <= overflowAudit.viewport, true, JSON.stringify(overflowAudit));
    assert.equal(overflowAudit.tableWrapperScrolls, true);
    assert.equal(pageErrors.length, 0, pageErrors.join('\n'));
    console.log('Admin progress UI valid: one snapshot request, truthful columns/KPIs, working modal, refresh, accessibility, and mobile containment pass.');
} finally {
    await browser.close();
    await new Promise(resolveClose => server.close(resolveClose));
}
