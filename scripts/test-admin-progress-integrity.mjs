import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const repositoryRoot = resolve(import.meta.dirname, '..');
const source = readFileSync(resolve(repositoryRoot, 'gas/Code.gs'), 'utf8');
const context = {
    console,
    Utilities: {
        newBlob: value => ({
            getBytes: () => ({ length: Buffer.byteLength(String(value || ''), 'utf8') })
        })
    }
};
vm.createContext(context);
vm.runInContext(
    `${source}\n;globalThis.__adminProgressApi = {
        buildAdminLearningProgressSnapshot,
        adminProgressSplitCacheValue,
        adminProgressWriteCache,
        adminProgressReadCache,
        adminProgressClearCache,
        buildQaMathProgressIntegrityPreview,
        cacheKey: ADMIN_LEARNING_PROGRESS_CACHE_KEY,
        cacheChunkBytes: ADMIN_LEARNING_PROGRESS_CACHE_CHUNK_BYTES
    };`,
    context,
    { filename: 'gas/Code.gs' }
);

const api = context.__adminProgressApi;
const qaPreviewStart = source.indexOf('function previewQaMathProgressIntegrity()');
const qaPreviewEnd = source.indexOf('\nfunction buildAdminLearningProgressSnapshot', qaPreviewStart);
assert.ok(qaPreviewStart >= 0 && qaPreviewEnd > qaPreviewStart, 'QA Math preview must remain present and editor-only.');
const qaPreviewSource = source.slice(qaPreviewStart, qaPreviewEnd);
assert.doesNotMatch(qaPreviewSource, /updateByKey|upsertByKey|addRowObject|appendRow|deleteRow|setValue|setValues|clearContent/);
const doPostSource = source.slice(source.indexOf('function doPost'), source.indexOf('\nfunction doGet'));
assert.equal(doPostSource.includes('previewQaMathProgressIntegrity'), false, 'QA Math preview must never be exposed through doPost.');
const now = '2026-08-31T12:00:00.000Z';
const targetEmailSet = {
    'regular.one@example.com': true,
    'regular.two@example.com': true,
    'disabled@example.com': true,
    'missing-link@example.com': true
};

const moduleRows = [
    ['ai-fundamentals', 5],
    ['python-untuk-ai', 8],
    ['reasoning', 6],
    ['konsep-ai-modern', 4],
    ['evaluation', 6],
    ['evolution', 7],
    ['math-for-ai', 89]
].map(([module_id, total_chapters]) => ({
    module_id,
    total_chapters,
    is_active: 'true',
    tracking_enabled: 'true'
}));

const accounts = [
    {
        account_id: 'acct-1', participant_rowId: 'row-1', nik: '1111222233334444',
        nama_lengkap: 'Regular One', email: 'regular.one@example.com', access_status: 'active', account_type: 'participant',
        last_login_at: '2026-08-30T08:00:00.000Z'
    },
    {
        account_id: 'acct-2', participant_rowId: 'row-2', nik: '5555666677778888',
        nama_lengkap: 'Regular Two', email: 'regular.two@example.com', access_status: 'enabled', account_type: 'participant',
        last_login_at: '2026-08-29T08:00:00.000Z'
    },
    {
        account_id: 'acct-qa', participant_rowId: 'row-qa', nik: '9000000000000001',
        nama_lengkap: 'QA Account', email: 'qa@example.com', access_status: 'active', account_type: 'qa'
    },
    {
        account_id: 'acct-disabled', participant_rowId: 'row-disabled', nik: '9000000000000002',
        nama_lengkap: 'Disabled Account', email: 'disabled@example.com', access_status: 'disabled', account_type: 'participant'
    },
    {
        account_id: 'acct-outside', participant_rowId: 'row-outside', nik: '9000000000000003',
        nama_lengkap: 'Outside Cohort', email: 'outside@example.com', access_status: 'active', account_type: 'participant'
    },
    {
        account_id: 'acct-missing-link', participant_rowId: '', nik: '9000000000000004',
        nama_lengkap: 'Missing Link', email: 'missing-link@example.com', access_status: 'active', account_type: 'participant'
    }
];

const progressRows = [
    { participant_rowId: 'row-1', nik: '1111222233334444', module_id: 'ai-fundamentals', chapter_id: '1', status: 'completed', updated_at: '2026-08-30T09:00:00.000Z' },
    { participant_rowId: 'row-1', nik: '1111222233334444', module_id: 'ai-fundamentals', chapter_id: '1', status: 'completed', updated_at: '2026-08-30T09:01:00.000Z' },
    { participant_rowId: 'row-1', nik: '1111222233334444', module_id: 'ai-fundamentals', chapter_id: '2', status: 'completed', updated_at: '2026-08-30T09:02:00.000Z' },
    ...Array.from({ length: 8 }, (_, index) => ({
        participant_rowId: 'row-1', nik: '1111222233334444', module_id: 'python-untuk-ai',
        chapter_id: String(index + 1), status: 'completed', updated_at: '2026-08-30T10:00:00.000Z'
    })),
    { participant_rowId: 'row-1', nik: '1111222233334444', module_id: 'math-for-ai', chapter_id: 'info-01', status: 'completed', updated_at: '2026-08-30T11:00:00.000Z' },
    { participant_rowId: 'row-1', nik: '1111222233334444', module_id: 'math-for-ai', chapter_id: 'quiz', status: 'completed', updated_at: '2026-08-31T11:59:00.000Z' },
    { participant_rowId: 'row-1', nik: '1111222233334444', module_id: 'reasoning', chapter_id: '999', status: 'completed', updated_at: '2026-08-31T11:58:00.000Z' },
    { participant_rowId: 'row-2', nik: '5555666677778888', module_id: 'reasoning', chapter_id: '1', status: 'in_progress', updated_at: '2026-08-24T12:00:00.000Z' },
    { participant_rowId: 'row-qa', nik: '9000000000000001', module_id: 'ai-fundamentals', chapter_id: '1', status: 'completed', updated_at: '2026-08-31T10:00:00.000Z' },
    { participant_rowId: 'row-qa', nik: '9000000000000001', module_id: 'math-for-ai', chapter_id: 'info-01', status: 'completed', updated_at: '2026-08-31T11:00:00.000Z' },
    { participant_rowId: 'row-disabled', nik: '9000000000000002', module_id: 'reasoning', chapter_id: '1', status: 'completed', updated_at: '2026-08-31T11:00:00.000Z' },
    { participant_rowId: 'missing-row', nik: '9999000011112222', module_id: 'reasoning', chapter_id: '1', status: 'completed', updated_at: '2026-08-31T11:00:00.000Z' }
];

const snapshot = api.buildAdminLearningProgressSnapshot({
    accounts,
    progressRows,
    moduleRows,
    targetEmailSet,
    now
});

assert.equal(snapshot.scope.totalAccountRows, 6);
assert.equal(snapshot.scope.regularParticipants, 2);
assert.equal(snapshot.scope.qaParticipants, 1);
assert.equal(snapshot.scope.excludedQa, 0);
assert.equal(snapshot.scope.excludedDisabled, 1);
assert.equal(snapshot.scope.excludedOutsideCohort, 1);
assert.equal(snapshot.scope.excludedMissingIdentity, 1);
assert.equal(snapshot.overview.totalParticipants, 2);
assert.equal(snapshot.overview.qaParticipants, 1);
assert.equal(snapshot.overview.listedAccounts, 3);
assert.equal(snapshot.overview.activeLearners7d, 2);
assert.equal(snapshot.overview.activePercent, 100);
assert.equal(snapshot.participants.length, 3);

const regularOne = snapshot.participants.find(participant => participant.name === 'Regular One');
const regularTwo = snapshot.participants.find(participant => participant.name === 'Regular Two');
const qaParticipant = snapshot.participants.find(participant => participant.name === 'QA Account');
assert.ok(regularOne);
assert.ok(regularTwo);
assert.ok(qaParticipant);
assert.equal(snapshot.participants[0].isQa, true);
assert.equal(qaParticipant.isQa, true);
assert.equal(regularOne.isQa, false);
assert.equal(qaParticipant.aiFundamentals.modules.find(module => module.moduleId === 'ai-fundamentals').completed, 1);
assert.equal(qaParticipant.mathForAi.completedActivities, 1);
assert.equal(qaParticipant.lastLearningAt, '2026-08-31T11:00:00.000Z');
assert.equal(regularOne.maskedNik, '1111********4444');
assert.equal(regularOne.aiFundamentals.progress, 23);
assert.equal(regularOne.aiFundamentals.moduleTotal, 6);
assert.equal(regularOne.aiFundamentals.modules.find(module => module.moduleId === 'ai-fundamentals').completed, 2);
assert.equal(regularOne.aiFundamentals.modules.find(module => module.moduleId === 'python-untuk-ai').progress, 100);
assert.equal(regularOne.mathForAi.completedActivities, 1);
assert.equal(regularOne.mathForAi.totalActivities, 89);
assert.equal(regularOne.mathForAi.topicTotal, 54);
assert.equal(regularOne.mathForAi.progress, 1);
assert.equal(regularOne.mathForAi.submodules['01'].completed, 1);
assert.equal(regularOne.mathForAi.submodules['01'].total, 12);
assert.equal(regularOne.mathForAi.submodules['01'].title, 'Kenapa AI Butuh Matematika');
assert.equal(Object.hasOwn(regularOne, 'participantRowId'), false);
assert.equal(regularOne.overallProgress, 12);
assert.equal(regularOne.lastLearningAt, '2026-08-30T11:00:00.000Z');
assert.equal(regularOne.lastModuleId, 'math-for-ai');
assert.equal(regularOne.lastItemId, 'info-01');
assert.equal(regularTwo.overallProgress, 0);
assert.equal(regularTwo.lastLearningAt, '2026-08-24T12:00:00.000Z');
assert.equal(snapshot.overview.averageOverallProgress, 6);
assert.equal(snapshot.overview.moduleStats.find(module => module.moduleId === 'ai-fundamentals').averageProgress, 20);
assert.equal(snapshot.overview.moduleStats.find(module => module.moduleId === 'math-for-ai').averageProgress, 0.5);
assert.equal(snapshot.diagnostics.orphanProgressRows, 1);
assert.ok(snapshot.diagnostics.invalidProgressRows >= 2);

const qaParticipantRows = [{
    rowId: 'row-qa', nik: '9000000000000001', nama_lengkap: 'QA Account', account_type: 'qa'
}];
const qaMathPreview = api.buildQaMathProgressIntegrityPreview({
    qaNik: '9000000000000001',
    accounts,
    participants: qaParticipantRows,
    progressRows
});
assert.equal(qaMathPreview.status, 'success');
assert.equal(qaMathPreview.read_only, true);
assert.equal(qaMathPreview.masked_nik, '9000********0001');
assert.equal(qaMathPreview.identity.row_id_match, true);
assert.equal(qaMathPreview.math_progress.related_rows, 1);
assert.equal(qaMathPreview.math_progress.canonical_completed_unique, 1);
assert.equal(qaMathPreview.math_progress.admin_linked_completed_unique, 1);
assert.equal(qaMathPreview.math_progress.missing_from_89, 88);
assert.equal(qaMathPreview.finding, 'incomplete_server_math_progress');

const wrongQaLinkagePreview = api.buildQaMathProgressIntegrityPreview({
    qaNik: '9000000000000001',
    accounts,
    participants: qaParticipantRows,
    progressRows: [{
        participant_rowId: 'row-qa-before-reset', nik: '9000000000000001',
        module_id: 'math-for-ai', chapter_id: '101', status: 'completed',
        updated_at: '2026-08-20T12:00:00.000Z'
    }]
});
assert.equal(wrongQaLinkagePreview.identity.row_id_match, true);
assert.equal(wrongQaLinkagePreview.math_progress.canonical_completed_unique, 1);
assert.equal(wrongQaLinkagePreview.math_progress.admin_linked_completed_unique, 0);
assert.equal(wrongQaLinkagePreview.math_progress.wrong_linkage_rows, 1);
assert.equal(wrongQaLinkagePreview.finding, 'progress_row_linkage_mismatch');

const emptyQaMathPreview = api.buildQaMathProgressIntegrityPreview({
    qaNik: '9000000000000001', accounts, participants: qaParticipantRows, progressRows: []
});
assert.equal(emptyQaMathPreview.math_progress.related_rows, 0);
assert.equal(emptyQaMathPreview.finding, 'no_server_math_progress');

const moduleFlagSnapshot = api.buildAdminLearningProgressSnapshot({
    accounts: accounts.slice(0, 1),
    progressRows,
    moduleRows: moduleRows.map(row => row.module_id === 'evaluation'
        ? { ...row, tracking_enabled: 'false' }
        : row),
    targetEmailSet,
    now
});
assert.equal(moduleFlagSnapshot.participants[0].aiFundamentals.moduleTotal, 5);
assert.equal(moduleFlagSnapshot.participants[0].aiFundamentals.modules.some(module => module.moduleId === 'evaluation'), false);

const duplicateIdentitySnapshot = api.buildAdminLearningProgressSnapshot({
    accounts: [accounts[0], { ...accounts[0], account_id: 'acct-duplicate' }],
    progressRows,
    moduleRows,
    targetEmailSet,
    now
});
assert.equal(duplicateIdentitySnapshot.participants.length, 1);
assert.equal(duplicateIdentitySnapshot.scope.excludedDuplicateIdentity, 1);

const emptySnapshot = api.buildAdminLearningProgressSnapshot({
    accounts: [], progressRows: [], moduleRows, targetEmailSet, now
});
assert.equal(emptySnapshot.overview.totalParticipants, 0);
assert.equal(emptySnapshot.overview.averageOverallProgress, 0);
assert.equal(emptySnapshot.overview.activePercent, 0);
assert.deepEqual(Array.from(emptySnapshot.participants), []);

class SizeLimitedCache {
    constructor(limitBytes = 100000) {
        this.limitBytes = limitBytes;
        this.values = new Map();
    }
    get(key) { return this.values.has(key) ? this.values.get(key) : null; }
    getAll(keys) {
        return Object.fromEntries(keys.filter(key => this.values.has(key)).map(key => [key, this.values.get(key)]));
    }
    put(key, value) {
        if (Buffer.byteLength(String(value), 'utf8') > this.limitBytes) {
            throw new Error('Argument too large: value');
        }
        this.values.set(key, String(value));
    }
    remove(key) { this.values.delete(key); }
    removeAll(keys) { keys.forEach(key => this.values.delete(key)); }
}

const stressTargetEmailSet = {};
const stressAccounts = Array.from({ length: 120 }, (_, index) => {
    const sequence = String(index + 1).padStart(4, '0');
    const email = `stress.${sequence}@example.com`;
    stressTargetEmailSet[email] = true;
    return {
        account_id: `stress-account-${sequence}`,
        participant_rowId: `stress-row-${sequence}`,
        nik: `327100000000${sequence}`,
        nama_lengkap: `Peserta Stress 🚀 ${sequence}`,
        email,
        access_status: 'active',
        account_type: 'participant'
    };
});
const stressSnapshot = api.buildAdminLearningProgressSnapshot({
    accounts: stressAccounts,
    progressRows: [],
    moduleRows,
    targetEmailSet: stressTargetEmailSet,
    now
});
const stressSerialized = JSON.stringify(stressSnapshot);
assert.ok(Buffer.byteLength(stressSerialized, 'utf8') > 100000, 'Stress snapshot must exceed one GAS cache value.');
assert.equal(stressSnapshot.participants.length, 120);

const unicodeValue = '🚀 peserta-valid '.repeat(10000);
const unicodeChunks = Array.from(api.adminProgressSplitCacheValue(unicodeValue, api.cacheChunkBytes));
assert.equal(unicodeChunks.join(''), unicodeValue);
assert.equal(unicodeChunks.every(chunk => Buffer.byteLength(chunk, 'utf8') <= api.cacheChunkBytes), true);

const cache = new SizeLimitedCache();
assert.equal(api.adminProgressWriteCache(cache, stressSnapshot), true);
assert.ok(cache.values.has(`${api.cacheKey}:manifest`));
assert.ok([...cache.values.keys()].filter(key => key.includes(':chunk:')).length > 1);
assert.equal([...cache.values.values()].every(value => Buffer.byteLength(value, 'utf8') <= 100000), true);
const cachedStressSnapshot = api.adminProgressReadCache(cache);
assert.equal(cachedStressSnapshot.participants.length, 120);
assert.equal(cachedStressSnapshot.overview.totalParticipants, 120);
assert.equal(cachedStressSnapshot.participants[0].name.includes('🚀'), true);

assert.equal(api.adminProgressWriteCache(cache, emptySnapshot), true);
assert.equal(cache.values.has(api.cacheKey), true);
assert.equal([...cache.values.keys()].some(key => key.includes(':chunk:')), false);

const failingCache = new SizeLimitedCache();
failingCache.put = () => { throw new Error('Simulated cache outage'); };
assert.equal(api.adminProgressWriteCache(failingCache, stressSnapshot), false);
assert.equal(api.adminProgressReadCache(failingCache), null);

const partialWriteCache = new SizeLimitedCache();
const partialPut = partialWriteCache.put.bind(partialWriteCache);
partialWriteCache.put = (key, value) => {
    if (key.endsWith(':manifest')) throw new Error('Simulated manifest outage');
    partialPut(key, value);
};
assert.equal(api.adminProgressWriteCache(partialWriteCache, stressSnapshot), false);
assert.equal(partialWriteCache.values.size, 0);

api.adminProgressClearCache(cache);
assert.equal(cache.values.size, 0);

console.log('Admin progress integrity valid: eligibility, scoring parity, 120-participant chunk cache, Unicode boundaries, invalidation, and non-blocking fallback pass.');
