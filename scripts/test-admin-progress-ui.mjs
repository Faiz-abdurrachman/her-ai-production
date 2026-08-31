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
const participantThree = {
    participantRowId: 'row-3', maskedNik: '9999********2222', name: 'Regular Complete With A Very Long Participant Name',
    aiFundamentals: {
        progress: 100,
        completedModules: 6,
        moduleTotal: 6,
        modules: modules.map(row => ({ ...row, progress: 100, completed: row.total }))
    },
    mathForAi: {
        progress: 100,
        completedActivities: 89,
        totalActivities: 89,
        topicTotal: 54,
        submodules: Object.fromEntries(Object.entries(submodules).map(([id, row]) => [id, { ...row, completed: row.total, progress: 100 }]))
    },
    overallProgress: 100, lastLearningAt: '2026-08-31T12:00:00.000Z',
    lastModuleId: 'math-for-ai', lastItemId: 'references-07'
};
const participantQa = {
    participantRowId: 'row-qa', maskedNik: '9000********0001', name: 'QA Learning Account', isQa: true,
    aiFundamentals: { progress: 20, completedModules: 0, moduleTotal: 6, modules: modules.map(row => ({ ...row, progress: row.moduleId === 'ai-fundamentals' ? 20 : 0, completed: row.moduleId === 'ai-fundamentals' ? 1 : 0 })) },
    mathForAi: { progress: 1, completedActivities: 1, totalActivities: 89, topicTotal: 54, submodules },
    overallProgress: 11, lastLearningAt: '2026-08-31T10:00:00.000Z',
    lastModuleId: 'math-for-ai', lastItemId: 'info-01'
};
assert.equal(participantOne.overallProgress, Math.round((participantOne.aiFundamentals.progress + participantOne.mathForAi.progress) / 2));
const snapshot = {
    generatedAt: '2026-08-31T12:00:00.000Z', cacheTtlSeconds: 300,
    overview: { totalParticipants: 3, qaParticipants: 1, listedAccounts: 4, averageOverallProgress: 37, activeLearners7d: 2, activePercent: 67 },
    participants: [participantQa, participantOne, participantTwo, participantThree]
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
        'Peserta', 'Progress Keseluruhan', 'Terakhir Belajar', 'Detail'
    ]);
    assert.equal(await page.$eval('.premium-table caption', node => node.textContent.trim()), 'Progress keseluruhan dan aktivitas belajar terakhir peserta');
    assert.equal(await page.$$eval('#progress-table-body tr', rows => rows.length), 4);
    assert.equal(await page.$$eval('#progress-table-body .qa-badge', nodes => nodes.length), 1);
    assert.equal(await page.$eval('#progress-table-body tr:first-child', row => row.dataset.accountKind), 'qa');
    assert.match(await page.$eval('#page-info', node => node.textContent), /4 akun peserta · 1 QA/);
    assert.equal(await page.$eval('#progress-table-body', node => node.textContent.includes('Kelas AI Mastery') || node.textContent.includes('HerAI Labs')), false);
    assert.equal(await page.$eval('#progress-table-body', node => /AI Fundamentals|Math for AI/.test(node.textContent)), false, 'Module breakdown belongs in Detail, not the main table.');
    assert.deepEqual(await page.$$eval('.premium-summary-content .main-val', nodes => nodes.map(node => node.textContent.replace(/\s+/g, ' ').trim())), ['3 +1 QA', '37%', '2 67%']);
    assert.match(await page.$eval('#progress-overview-container', node => node.textContent.replace(/\s+/g, ' ')), /QA tidak masuk KPI/);
    assert.match(await page.$eval('#progress-overview-container', node => node.textContent.replace(/\s+/g, ' ')), /Rata-rata dari 2 modul aktif/);
    assert.deepEqual(await page.$$eval('#progress-table-body .overall-progress', nodes => nodes.map(node => ({
        state: node.dataset.progressState,
        value: node.querySelector('.overall-progress-value').textContent.trim(),
        label: node.querySelector('.progress-state-label').textContent.trim(),
        meta: node.querySelector('.overall-progress-meta').textContent.trim(),
        ariaValue: Number(node.querySelector('[role="progressbar"]').getAttribute('aria-valuenow'))
    }))), [
        { state: 'active', value: '11%', label: 'Sedang berjalan', meta: '2 modul aktif · nilai dari server', ariaValue: 11 },
        { state: 'active', value: '12%', label: 'Sedang berjalan', meta: '2 modul aktif · nilai dari server', ariaValue: 12 },
        { state: 'empty', value: '0%', label: 'Belum ada progres', meta: '2 modul aktif · nilai dari server', ariaValue: 0 },
        { state: 'complete', value: '100%', label: 'Selesai', meta: '2 modul aktif · nilai dari server', ariaValue: 100 }
    ]);
    assert.match(await page.$eval('#progress-table-body tr[data-account-kind="qa"] .last-active', node => node.textContent.replace(/\s+/g, ' ')), /31 Agu 2026, 17\.00 WIB/);
    assert.match(await page.$$eval('#progress-table-body tr', rows => rows.find(row => row.querySelector('.participant-name')?.textContent.trim() === 'Regular Two').querySelector('.last-active').textContent.replace(/\s+/g, ' ')), /Belum pernah belajar.*Belum ada aktivitas tersimpan/);
    if (process.env.ADMIN_PROGRESS_SCREENSHOT_DIR) {
        await page.screenshot({ path: resolve(process.env.ADMIN_PROGRESS_SCREENSHOT_DIR, 'admin-progress-desktop.png'), fullPage: true });
    }

    const detailButtonHeight = await page.$eval('.btn-detail', button => button.getBoundingClientRect().height);
    assert.ok(detailButtonHeight >= 44, 'Detail touch target must be at least 44px high.');
    await page.evaluate(() => {
        const row = Array.from(document.querySelectorAll('#progress-table-body tr')).find(candidate => candidate.querySelector('.participant-name')?.textContent.trim() === 'Regular One');
        row.querySelector('.btn-detail').click();
    });
    await page.waitForSelector('.pr-modal-dialog');
    const modalText = await page.$eval('.pr-modal-dialog', node => node.textContent.replace(/\s+/g, ' '));
    assert.match(modalText, /Regular One/);
    assert.match(modalText, /12%/);
    assert.match(modalText, /1 \/ 89 aktivitas/);
    assert.match(modalText, /54 topik/);
    assert.match(modalText, /Modul · 6 submodul/);
    assert.match(modalText, /Modul · 7 submodul/);
    assert.match(modalText, /Rincian 6 submodul/);
    assert.match(modalText, /Rincian 7 submodul/);
    assert.match(modalText, /Nilai ini memakai snapshot server/);
    assert.equal(/\bcourse\b/i.test(modalText), false, 'Modal must use the Module → Submodule hierarchy consistently.');
    assert.deepEqual(await page.$$eval('[data-learning-module]', nodes => nodes.map(node => node.dataset.learningModule)), [
        'ai-fundamentals-advanced', 'math-for-ai'
    ]);
    assert.deepEqual(await page.$$eval('[data-learning-module="ai-fundamentals-advanced"] .pr-detail-row', nodes => nodes.map(node => ({
        id: node.dataset.submoduleId,
        title: node.querySelector('.pr-detail-name').textContent.trim()
    }))), [
        { id: 'ai-fundamentals', title: 'Pengantar AI' },
        { id: 'python-untuk-ai', title: 'Python untuk AI' },
        { id: 'reasoning', title: 'Reasoning AI' },
        { id: 'konsep-ai-modern', title: 'Konsep AI Modern' },
        { id: 'evaluation', title: 'Evaluation AI' },
        { id: 'evolution', title: 'Evolution of AI' }
    ]);
    assert.deepEqual(await page.$$eval('[data-learning-module="math-for-ai"] .pr-detail-row', nodes => nodes.map(node => ({
        id: node.dataset.submoduleId,
        title: node.querySelector('.pr-detail-name').textContent.trim()
    }))), [
        { id: '01', title: 'Kenapa AI Butuh Matematika' },
        { id: '02', title: 'Aljabar Linear' },
        { id: '03', title: 'Statistika untuk AI' },
        { id: '04', title: 'Probabilitas' },
        { id: '05', title: 'Kalkulus' },
        { id: '06', title: 'Optimisasi' },
        { id: '07', title: 'Studi Kasus Terintegrasi' }
    ]);
    assert.deepEqual(await page.$$eval('.pr-modal-dialog [role="progressbar"]', nodes => nodes.map(node => Number(node.getAttribute('aria-valuenow')))), [12, 23, 1]);
    assert.equal(pageErrors.length, 0, pageErrors.join('\n'));

    await page.keyboard.press('Escape');
    await page.waitForSelector('.pr-modal-dialog', { hidden: true });
    await page.click('#refresh-progress-btn');
    await page.waitForFunction(() => !document.querySelector('#refresh-progress-btn').disabled);
    assert.equal(postedPayloads.at(-1).forceRefresh, true);

    await page.setViewport({ width: 390, height: 844, isMobile: true });
    if (process.env.ADMIN_PROGRESS_SCREENSHOT_DIR) {
        await page.screenshot({ path: resolve(process.env.ADMIN_PROGRESS_SCREENSHOT_DIR, 'admin-progress-mobile.png'), fullPage: true });
    }
    await page.click('#progress-table-body tr[data-account-kind="qa"] .btn-detail');
    await page.waitForSelector('.pr-modal-dialog');
    assert.equal(await page.$$eval('.pr-modal-dialog .pr-qa-badge', nodes => nodes.length), 1);
    assert.match(await page.$eval('.pr-modal-dialog', node => node.textContent.replace(/\s+/g, ' ')), /tidak dihitung ke KPI peserta resmi/);
    const overflowAudit = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        pageWidth: document.documentElement.scrollWidth,
        tableWrapperScrolls: document.querySelector('.premium-table').parentElement.scrollWidth > document.querySelector('.premium-table').parentElement.clientWidth,
        mobileRowDisplay: getComputedStyle(document.querySelector('#progress-table-body tr')).display,
        visibleExactTimestamp: document.querySelector('#progress-table-body tr[data-account-kind="qa"] .last-active-exact')?.textContent.trim(),
        modalWidth: document.querySelector('.pr-modal-dialog').getBoundingClientRect().width,
        modalViewport: window.innerWidth,
        modalContentFits: document.querySelector('.pr-modal-dialog').scrollWidth <= document.querySelector('.pr-modal-dialog').clientWidth
    }));
    assert.equal(overflowAudit.pageWidth <= overflowAudit.viewport, true, JSON.stringify(overflowAudit));
    assert.equal(overflowAudit.tableWrapperScrolls, false, JSON.stringify(overflowAudit));
    assert.equal(overflowAudit.mobileRowDisplay, 'block');
    assert.equal(overflowAudit.visibleExactTimestamp, '31 Agu 2026, 17.00 WIB');
    assert.equal(overflowAudit.modalWidth <= overflowAudit.modalViewport, true, JSON.stringify(overflowAudit));
    assert.equal(overflowAudit.modalContentFits, true, JSON.stringify(overflowAudit));
    assert.equal(pageErrors.length, 0, pageErrors.join('\n'));
    console.log('Admin progress UI valid: official KPI isolation, visible QA participant, authoritative progress, module detail, refresh, accessibility, and responsive cards pass.');
} finally {
    await browser.close();
    await new Promise(resolveClose => server.close(resolveClose));
}
