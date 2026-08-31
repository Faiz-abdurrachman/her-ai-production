import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const repositoryRoot = resolve(import.meta.dirname, '..');
const source = readFileSync(resolve(repositoryRoot, 'gas/Code.gs'), 'utf8');
const context = { console };
vm.createContext(context);
vm.runInContext(
    `${source}\n;globalThis.__adminProgressApi = { buildAdminLearningProgressSnapshot };`,
    context,
    { filename: 'gas/Code.gs' }
);

const api = context.__adminProgressApi;
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
assert.equal(snapshot.scope.excludedQa, 1);
assert.equal(snapshot.scope.excludedDisabled, 1);
assert.equal(snapshot.scope.excludedOutsideCohort, 1);
assert.equal(snapshot.scope.excludedMissingIdentity, 1);
assert.equal(snapshot.overview.totalParticipants, 2);
assert.equal(snapshot.overview.activeLearners7d, 2);
assert.equal(snapshot.overview.activePercent, 100);
assert.equal(snapshot.participants.length, 2);

const regularOne = snapshot.participants.find(participant => participant.name === 'Regular One');
const regularTwo = snapshot.participants.find(participant => participant.name === 'Regular Two');
assert.ok(regularOne);
assert.ok(regularTwo);
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
assert.equal(snapshot.diagnostics.orphanProgressRows, 1);
assert.ok(snapshot.diagnostics.invalidProgressRows >= 2);

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

console.log('Admin progress integrity valid: eligibility, module flags, canonical counting, activity window, masking, and course parity pass.');
