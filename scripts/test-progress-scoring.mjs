import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const repositoryRoot = resolve(import.meta.dirname, '..');
const source = readFileSync(resolve(repositoryRoot, 'gas/Code.gs'), 'utf8');
const context = {
    console,
    Utilities: { getUuid: () => 'local-test-uuid' }
};
vm.createContext(context);
vm.runInContext(
    `${source}\n;globalThis.__progressApi = { computeLiveLeaderboard, isValidMathProgressChapterId, isValidMathTopicProgressId, saveParticipantProgress, progressModuleIds: PARTICIPANT_PROGRESS_MODULE_IDS };`,
    context,
    { filename: 'gas/Code.gs' }
);

const api = context.__progressApi;
assert.equal(api.isValidMathTopicProgressId('101'), true);
assert.equal(api.isValidMathTopicProgressId('107'), true);
assert.equal(api.isValidMathTopicProgressId('108'), false);
assert.equal(api.isValidMathTopicProgressId('701'), true);
assert.equal(api.isValidMathTopicProgressId('708'), false);
assert.equal(api.isValidMathProgressChapterId('practice-01'), true);
assert.equal(api.isValidMathProgressChapterId('quiz-07'), true);
assert.equal(api.isValidMathProgressChapterId('references-08'), false);
assert.equal(api.progressModuleIds.includes('math-for-ai'), true);
assert.equal(api.progressModuleIds.includes('arbitrary-module'), false);

let addedProgressRow = null;
function preparePersistenceStubs() {
    let getRowsCall = 0;
    context.getRows = () => {
        getRowsCall += 1;
        return getRowsCall === 1
            ? [{ rowId: 'participant-row-1', nik: '0001', nama_lengkap: 'Peserta Uji' }]
            : [];
    };
    context.addRowObject = (_sheet, row) => { addedProgressRow = row; };
    context.updateByKey = () => { throw new Error('Unexpected update path in isolated test.'); };
    context.recordParticipantActivity = () => {};
    context.invalidateUserCaches = () => {};
    context.cacheRemove = () => {};
    addedProgressRow = null;
}

preparePersistenceStubs();
assert.equal(api.saveParticipantProgress({
    __auth: { rowId: 'participant-row-1', sub: '0001' },
    module_id: 'arbitrary-module',
    chapter_id: '1',
    status: 'completed'
}).status, 'error');

preparePersistenceStubs();
assert.equal(api.saveParticipantProgress({
    __auth: { rowId: 'participant-row-1', sub: '0001' },
    module_id: 'math-for-ai',
    chapter_id: '108',
    status: 'completed'
}).status, 'error');

preparePersistenceStubs();
assert.equal(api.saveParticipantProgress({
    __auth: { rowId: 'participant-row-1', sub: '0001' },
    module_id: 'math-for-ai',
    chapter_id: '704',
    status: 'completed'
}).status, 'success');
assert.equal(addedProgressRow.chapter_id, '704');
assert.equal(addedProgressRow.score, null);

const activeAccounts = [{ account_id: 'acct-1', nik: '0001', nama_lengkap: 'Peserta Uji' }];
const progressRows = [
    { nik: '0001', module_id: 'math-for-ai', chapter_id: '101', status: 'completed' },
    { nik: '0001', module_id: 'math-for-ai', chapter_id: '102', status: 'in_progress' },
    { nik: '0001', module_id: 'math-for-ai', chapter_id: '108', status: 'completed' },
    { nik: '0001', module_id: 'math-for-ai', chapter_id: 'info-01', status: 'completed' },
    { nik: '0001', module_id: 'math-for-ai', chapter_id: 'practice-01', status: 'completed' },
    { nik: '0001', module_id: 'math-for-ai', chapter_id: 'quiz-01', status: 'completed', score: 90 },
    { nik: '0001', module_id: 'math-for-ai', chapter_id: 'quiz', status: 'completed', score: 80 },
    { nik: '0001', module_id: 'reasoning', chapter_id: 'practice-01', status: 'completed' },
    { nik: '0001', module_id: 'reasoning', chapter_id: '10junk', status: 'completed' }
];
const leaderboard = api.computeLiveLeaderboard('0001', { activeAccounts, progressRows });
assert.equal(leaderboard.length, 1);
assert.equal(leaderboard[0].points, 100);

console.log('Progress contract valid: module/item validation passes; completed Math topics=15, practice=5, aggregate quiz only; invalid/non-topic IDs add zero.');
