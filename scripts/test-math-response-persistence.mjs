import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const repositoryRoot = resolve(import.meta.dirname, '..');
const source = readFileSync(resolve(repositoryRoot, 'gas/Code.gs'), 'utf8');
let uuidCounter = 0;
const context = {
    console: { log: console.log, warn: console.warn, error() {} },
    Utilities: { getUuid: () => `local-response-${++uuidCounter}` },
    LockService: {
        getScriptLock: () => ({ waitLock() {}, releaseLock() {} })
    }
};
vm.createContext(context);
vm.runInContext(
    `${source}\n;globalThis.__responseApi = {
        normalizeParticipantExerciseInput,
        saveParticipantExerciseDraft,
        submitParticipantExercise,
        saveParticipantDiscussion,
        getParticipantDiscussions,
        sheets: SHEETS
    };`,
    context,
    { filename: 'gas/Code.gs' }
);

const api = context.__responseApi;
const rows = {
    [api.sheets.participants]: [{ rowId: 'participant-row-1', nik: '0001', nama_lengkap: 'Peserta Uji' }],
    [api.sheets.participantExerciseSubmissions]: [],
    [api.sheets.participantDiscussions]: [],
    [api.sheets.participantProgress]: []
};
let failProgressWrites = false;

context.getRows = sheet => rows[sheet] || [];
context.addRowObject = (sheet, row) => {
    if (sheet === api.sheets.participantProgress && failProgressWrites) {
        throw new Error('simulated progress write failure');
    }
    if (!rows[sheet]) rows[sheet] = [];
    rows[sheet].push({ ...row });
};
context.updateByKey = (sheet, key, value, patch) => {
    const row = (rows[sheet] || []).find(candidate => String(candidate[key]) === String(value));
    if (!row) return { status: 'error', message: 'row missing in local test' };
    Object.assign(row, patch);
    return { status: 'success' };
};
context.recordParticipantActivity = () => {};
context.invalidateUserCaches = () => {};
context.cacheRemove = () => {};

const auth = { __auth: { rowId: 'participant-row-1', sub: '0001' }, nik: '0001' };
const partialAnswers = { 'answer-01': 'Jawaban pertama' };
const fullAnswers = Object.fromEntries(
    Array.from({ length: 8 }, (_, index) => [`answer-${String(index + 1).padStart(2, '0')}`, `Jawaban ${index + 1}`])
);

assert.equal(api.normalizeParticipantExerciseInput({
    module_id: 'math-for-ai',
    exercise_id: 'practice-01',
    answers: partialAnswers
}).answerCount, 1);
assert.throws(() => api.normalizeParticipantExerciseInput({
    module_id: 'math-for-ai',
    exercise_id: 'practice-08',
    answers: partialAnswers
}), /tidak dikenali/i);
assert.throws(() => api.normalizeParticipantExerciseInput({
    module_id: 'math-for-ai',
    exercise_id: 'practice-01',
    answers: { arbitrary: 'Tidak boleh lolos' }
}), /ID jawaban/i);

const draft = api.saveParticipantExerciseDraft({
    ...auth,
    module_id: 'math-for-ai',
    exercise_id: 'practice-01',
    answers: partialAnswers
});
assert.equal(draft.status, 'success');
assert.equal(draft.submission.status, 'draft');
assert.equal(draft.progress_synced, null);
assert.throws(() => api.submitParticipantExercise({
    ...auth,
    module_id: 'math-for-ai',
    exercise_id: 'practice-01',
    answers: partialAnswers
}), /belum lengkap/i);

const submitted = api.submitParticipantExercise({
    ...auth,
    module_id: 'math-for-ai',
    exercise_id: 'practice-01',
    answers: fullAnswers
});
assert.equal(submitted.status, 'success');
assert.equal(submitted.submission.status, 'submitted');
assert.equal(submitted.submission.answer_count, 8);
assert.equal(submitted.progress_synced, true);
assert.equal(rows[api.sheets.participantProgress].some(row => (
    row.module_id === 'math-for-ai'
    && row.chapter_id === 'practice-01'
    && row.status === 'completed'
)), true);

failProgressWrites = true;
const submittedWithoutProgress = api.submitParticipantExercise({
    ...auth,
    module_id: 'math-for-ai',
    exercise_id: 'practice-02',
    answers: fullAnswers
});
failProgressWrites = false;
assert.equal(submittedWithoutProgress.status, 'success');
assert.equal(submittedWithoutProgress.submission.status, 'submitted');
assert.equal(submittedWithoutProgress.progress_synced, false);
assert.equal(rows[api.sheets.participantExerciseSubmissions].some(row => row.exercise_id === 'practice-02'), true);

const firstDiscussion = api.saveParticipantDiscussion({
    ...auth,
    module_id: 'math-for-ai',
    prompt: 'discussion-01-01',
    text: 'Respons pertama'
});
assert.equal(firstDiscussion.status, 'success');
assert.equal(firstDiscussion.discussion_complete, false);
assert.equal(firstDiscussion.progress_synced, null);

const secondDiscussion = api.saveParticipantDiscussion({
    ...auth,
    module_id: 'math-for-ai',
    prompt: 'discussion-01-02',
    text: 'Respons kedua'
});
assert.equal(secondDiscussion.status, 'success');
assert.equal(secondDiscussion.discussion_complete, true);
assert.equal(secondDiscussion.progress_synced, true);
assert.equal(rows[api.sheets.participantProgress].some(row => (
    row.module_id === 'math-for-ai'
    && row.chapter_id === 'discussion-01'
    && row.status === 'completed'
)), true);

const firstId = firstDiscussion.discussion.id;
const secondId = secondDiscussion.discussion.id;
const updatedFirst = api.saveParticipantDiscussion({
    ...auth,
    module_id: 'math-for-ai',
    discussion_id: secondId,
    prompt: 'discussion-01-01',
    text: 'Respons pertama diperbarui'
});
assert.equal(updatedFirst.discussion.id, firstId);
assert.equal(rows[api.sheets.participantDiscussions].length, 2);
assert.equal(rows[api.sheets.participantDiscussions].find(row => row.discussion_id === secondId).text, 'Respons kedua');

assert.equal(api.saveParticipantDiscussion({
    ...auth,
    module_id: 'math-for-ai',
    prompt: 'discussion-08-01',
    text: 'Prompt invalid'
}).status, 'error');
assert.equal(api.getParticipantDiscussions({
    ...auth,
    module_id: 'arbitrary-module'
}).status, 'error');

console.log('Math response persistence valid: exact 8-answer practice contract, draft/submit progress, two-prompt discussion completion, and safe prompt upsert pass.');
