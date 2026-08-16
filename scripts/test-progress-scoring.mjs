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
    `${source}\n;globalThis.__progressApi = { computeLiveLeaderboard, computeMathCourseProgress, buildActiveLearningCourses, summarizeTrackedModules, isValidMathProgressChapterId, isValidMathTopicProgressId, saveParticipantProgress, mathProgressItemTotal: MATH_PROGRESS_ITEM_TOTAL, releasedTrackingModuleIds: DEFAULT_RELEASED_TRACKING_MODULE_IDS, progressModuleIds: PARTICIPANT_PROGRESS_MODULE_IDS };`,
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
assert.equal(api.mathProgressItemTotal, 89);
assert.equal(api.releasedTrackingModuleIds.includes('math-for-ai'), true);

const canonicalMathRows = Object.entries({ '01': 7, '02': 8, '03': 8, '04': 8, '05': 8, '06': 8, '07': 7 }).flatMap(([submoduleId, topicCount]) => [
    ...Array.from({ length: topicCount }, (_, index) => String((Number(submoduleId) * 100) + index + 1)),
    `info-${submoduleId}`,
    `practice-${submoduleId}`,
    `quiz-${submoduleId}`,
    `discussion-${submoduleId}`,
    `references-${submoduleId}`
].map(chapterId => ({ module_id: 'math-for-ai', chapter_id: chapterId, status: 'completed' })));
const completedMath = api.computeMathCourseProgress([
    ...canonicalMathRows,
    canonicalMathRows[0],
    { module_id: 'math-for-ai', chapter_id: 'quiz', status: 'completed' },
    { module_id: 'math-for-ai', chapter_id: '108', status: 'completed' }
]);
assert.equal(completedMath.completed_items, 89);
assert.equal(completedMath.progress, 100);
const activeCourses = api.buildActiveLearningCourses({ total: 6, completed: 3, in_progress: 3, not_started: 0, progress: 72 }, canonicalMathRows);
assert.deepEqual(Array.from(activeCourses, course => course.course_id), ['ai-fundamentals-advanced', 'math-for-ai']);
assert.equal(activeCourses[0].progress, 72);
assert.equal(activeCourses[1].progress, 100);
assert.equal(api.summarizeTrackedModules(activeCourses).progress, 86);

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

console.log('Progress contract valid: 89 canonical Math activities, two active courses, and equal-weight overall progress all pass.');
