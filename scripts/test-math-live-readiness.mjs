import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import puppeteer from 'puppeteer';

const repositoryRoot = resolve(import.meta.dirname, '..');
const gasUrl = String(process.env.GAS_WEB_APP_URL || '').trim();
const qaNik = String(process.env.HERAI_QA_NIK || '').replace(/\D/g, '');
const qaPassword = String(process.env.HERAI_QA_PASSWORD || '');
const productionUrl = String(process.env.HERAI_PROD_URL || 'https://her-ai.data-sorcerers.com').replace(/\/$/, '');
const mutate = process.argv.includes('--mutate');
const requiredMutationBackendVersion = '2026.3.11-math-response-persistence';
const qaLabel = 'HERAI-QA-MATH-READINESS-20260816';
const candidates = [
    { id: '01', slug: 'kenapa-ai-butuh-matematika', topics: 7, quiz: 'materi2/math for ai/kenapa ai butuh matematika/kuis.md' },
    { id: '02', slug: 'linear-algebra', topics: 8, quiz: 'materi2/math for ai/02-linear-algebra/kuis.md' },
    { id: '03', slug: 'statistics-for-ai', topics: 8, quiz: 'materi2/math for ai/03-statistics-for-ai/kuis.md' },
    { id: '04', slug: 'probability', topics: 8, quiz: 'materi2/math for ai/04-probability/kuis.md', key: 'materi2/math for ai/04-probability/kunci-jawaban-rubrik.md' },
    { id: '05', slug: 'calculus', topics: 8, quiz: 'materi2/math for ai/05-calculus/kuis.md', key: 'materi2/math for ai/05-calculus/kunci-jawaban-rubrik.md' },
    { id: '06', slug: 'optimization', topics: 8, quiz: 'materi2/math for ai/06-optimization/kuis.md', key: 'materi2/math for ai/06-optimization/kunci-jawaban-rubrik.md' },
    { id: '07', slug: 'integrated-case-study', topics: 7, quiz: 'materi2/math for ai/07-case-study-herai/kuis.md', key: 'materi2/math for ai/07-case-study-herai/kunci-jawaban-rubrik.md' }
].map(candidate => {
    if (!candidate.key) {
        return {
            ...candidate,
            answers: [...readFileSync(resolve(repositoryRoot, candidate.quiz), 'utf8')
                .matchAll(/\*\*(?:Jawaban benar|Correct answer|Jawaban):\*\*\s*([A-D])/g)]
                .map(match => match[1])
        };
    }
    const answerMap = {};
    for (const match of readFileSync(resolve(repositoryRoot, candidate.key), 'utf8')
        .matchAll(/^\|\s*(\d+)\s*\|(?:\s*[^\|]+\s*\|)?\s*([A-D])\s*\|/gm)) {
        answerMap[match[1]] = match[2];
    }
    return {
        ...candidate,
        answers: Array.from({ length: 10 }, (_, index) => answerMap[String(index + 1)])
    };
});

assert.match(gasUrl, /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/, 'GAS_WEB_APP_URL is required.');
assert.match(qaNik, /^\d{16}$/, 'HERAI_QA_NIK must be a 16-digit QA account.');
assert.equal(Boolean(qaPassword), true, 'HERAI_QA_PASSWORD is required.');
candidates.forEach(candidate => assert.equal(candidate.answers.every(answer => /^[A-D]$/.test(answer || '')), true));

async function fetchLive(url, options = {}, attempts = 3) {
    let lastError;
    for (let attempt = 1; attempt <= attempts; attempt += 1) {
        try {
            const response = await fetch(url, {
                ...options,
                signal: AbortSignal.timeout(30000)
            });
            if (response.status < 500 || attempt === attempts) return response;
            lastError = new Error(`Live endpoint returned HTTP ${response.status}.`);
        } catch (error) {
            lastError = error;
            if (attempt === attempts) throw error;
        }
        await new Promise(resolveWait => setTimeout(resolveWait, attempt * 750));
    }
    throw lastError;
}

async function gasCall(payload) {
    const response = await fetchLive(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
    });
    assert.equal(response.ok, true, `GAS request returned HTTP ${response.status}.`);
    return response.json();
}

function collectSensitiveKeys(value, path = 'response', found = []) {
    if (!value || typeof value !== 'object') return found;
    for (const [key, child] of Object.entries(value)) {
        const childPath = `${path}.${key}`;
        if (/password|password_hash|generated_password|participantToken|authToken/i.test(key)) {
            found.push(childPath);
        }
        collectSensitiveKeys(child, childPath, found);
    }
    return found;
}

const serviceResponse = await fetchLive(gasUrl);
assert.equal(serviceResponse.ok, true, `GAS health returned HTTP ${serviceResponse.status}.`);
const service = await serviceResponse.json();
assert.equal(service.status, 'success');
if (mutate) {
    assert.equal(
        service.version,
        requiredMutationBackendVersion,
        `Live mutation requires GAS ${requiredMutationBackendVersion}; found ${service.version || 'unknown'}. Deploy the reviewed backend before retrying.`
    );
}

const login = await gasCall({
    action: 'participantLogin',
    nik: qaNik,
    password: qaPassword,
    user_agent: 'HerAI Math read-only readiness check'
});
assert.equal(login.status, 'success', 'QA participant login must succeed.');
assert.equal(Boolean(login.token), true, 'QA participant login must return a token.');
assert.equal(collectSensitiveKeys(login.profile).length, 0, 'Participant profile must not expose credential fields.');

const auth = { nik: qaNik, participantToken: login.token };
const progress = await gasCall({
    ...auth,
    action: 'getParticipantProgress',
    module_id: 'math-for-ai'
});
assert.equal(progress.status, 'success');
assert.equal(Array.isArray(progress.data), true);
assert.equal(progress.data.every(row => row.module_id === 'math-for-ai'), true);
const completedProgressAtStart = new Set(progress.data
    .filter(row => row.status === 'completed')
    .map(row => String(row.chapter_id)));

let exerciseRecordCount = 0;
for (const id of ['01', '02', '03', '04', '05', '06', '07']) {
    const exercises = await gasCall({
        ...auth,
        action: 'getParticipantExerciseSubmissions',
        module_id: 'math-for-ai',
        exercise_id: `practice-${id}`
    });
    assert.equal(exercises.status, 'success', `practice-${id} read must succeed.`);
    assert.equal(Array.isArray(exercises.data), true);
    assert.equal(exercises.data.every(row => row.module_id === 'math-for-ai' && row.exercise_id === `practice-${id}`), true);
    exerciseRecordCount += exercises.data.length;
}

const discussions = await gasCall({
    ...auth,
    action: 'getParticipantDiscussions',
    module_id: 'math-for-ai'
});
assert.equal(discussions.status, 'success');
assert.equal(Array.isArray(discussions.data), true);
assert.equal(discussions.data.every(row => (
    row.module_id === 'math-for-ai'
    && /^discussion-0[1-7]-(?:01|02)$/.test(String(row.prompt || ''))
)), true);

const unauthorized = await gasCall({
    action: 'getParticipantProgress',
    nik: qaNik,
    participantToken: 'invalid-readiness-token',
    module_id: 'math-for-ai'
});
assert.equal(unauthorized.status, 'error', 'Invalid participant token must be rejected.');

let mutationEvidence = null;
let localServer = null;
process.on('exit', () => {
    if (localServer && localServer.exitCode === null) localServer.kill('SIGTERM');
});
if (mutate) {
    const invalidProgress = await gasCall({
        ...auth,
        action: 'saveParticipantProgress',
        module_id: 'math-for-ai',
        chapter_id: 'topic-01',
        status: 'completed'
    });
    assert.equal(invalidProgress.status, 'error', 'Invalid Math progress ID must be rejected.');
    const invalidExercise = await gasCall({
        ...auth,
        action: 'submitParticipantExercise',
        module_id: 'math-for-ai',
        exercise_id: 'practice-08',
        answers: { 'answer-01': qaLabel }
    });
    assert.equal(invalidExercise.status, 'error', 'Invalid Math exercise ID must be rejected.');
    const invalidDiscussion = await gasCall({
        ...auth,
        action: 'saveParticipantDiscussion',
        module_id: 'math-for-ai',
        prompt: 'discussion-08-01',
        text: qaLabel
    });
    assert.equal(invalidDiscussion.status, 'error', 'Invalid Math discussion ID must be rejected.');

    for (const candidate of candidates) {
        const chapterIds = [
            `info-${candidate.id}`,
            ...Array.from({ length: candidate.topics }, (_, index) => (
                String(Number(candidate.id) * 100 + index + 1)
            )),
            `references-${candidate.id}`
        ];
        for (const chapterId of chapterIds) {
            if (completedProgressAtStart.has(chapterId)) continue;
            const result = await gasCall({
                ...auth,
                action: 'saveParticipantProgress',
                module_id: 'math-for-ai',
                chapter_id: chapterId,
                status: 'completed'
            });
            assert.equal(result.status, 'success', `${chapterId} progress write must succeed.`);
        }
        console.log(`Live mutation checkpoint: Submodule ${candidate.id} info/topic/reference progress acknowledged.`);
    }

    const port = String(41000 + Math.floor(Math.random() * 10000));
    const localUrl = `http://127.0.0.1:${port}`;
    localServer = spawn(process.execPath, ['server.js'], {
        cwd: repositoryRoot,
        env: {
            ...process.env,
            PORT: port,
            HERAI_LOCAL_HOST: '127.0.0.1',
            HERAI_ALLOW_LIVE_GAS_PROXY: 'true'
        },
        stdio: ['ignore', 'ignore', 'ignore']
    });
    for (let attempt = 0; attempt < 100; attempt += 1) {
        try {
            const health = await fetch(`${localUrl}/healthz`, { signal: AbortSignal.timeout(2000) }).then(response => response.json());
            if (health.gasProxy === 'enabled') break;
        } catch {}
        if (attempt === 99) throw new Error('Local live-proxy server did not become ready.');
        await new Promise(resolveWait => setTimeout(resolveWait, 100));
    }

    const browser = await puppeteer.launch({ headless: true, executablePath: '/usr/bin/chromium' });
    try {
        const page = await browser.newPage();
        const pageErrors = [];
        const failedRequests = [];
        page.on('pageerror', error => pageErrors.push(error.message));
        page.on('requestfailed', request => failedRequests.push(request.url()));
        await page.evaluateOnNewDocument(session => {
            sessionStorage.setItem('heraiParticipantSession', JSON.stringify(session));
        }, {
            nik: qaNik,
            token: login.token,
            expiresAt: login.expires_at
        });

        for (const candidate of candidates) {
            const baseRoute = `/participant-ai-lab-math/${candidate.slug}`;
            const expectedAnswers = Object.fromEntries(Array.from({ length: 8 }, (_, index) => {
                const key = `answer-${String(index + 1).padStart(2, '0')}`;
                return [key, `${qaLabel} ${candidate.id} ${key}`];
            }));
            const existingExercise = await gasCall({
                ...auth,
                action: 'getParticipantExerciseSubmissions',
                module_id: 'math-for-ai',
                exercise_id: `practice-${candidate.id}`
            });

            await page.goto(`${localUrl}/#${baseRoute}/latihan`, { waitUntil: 'domcontentloaded' });
            await page.waitForSelector('[data-math-practice-form] textarea[name="answer-08"]', { timeout: 30000 });
            const alreadyFinal = existingExercise.data.some(row => ['submitted', 'reviewed'].includes(row.status));
            if (!alreadyFinal) {
                await page.evaluate(({ firstKey, firstValue }) => {
                    const fields = document.querySelectorAll('[data-math-practice-form] textarea');
                    fields.forEach(field => {
                        field.value = field.name === firstKey ? firstValue : '';
                        field.dispatchEvent(new Event('input', { bubbles: true }));
                    });
                }, { firstKey: 'answer-01', firstValue: expectedAnswers['answer-01'] });
                await page.click('[data-practice-draft]');
                await page.waitForFunction(() => /dikonfirmasi oleh server/i.test(document.querySelector('[data-practice-status]')?.textContent || ''), { timeout: 60000 });
                const draftReadBack = await gasCall({
                    ...auth,
                    action: 'getParticipantExerciseSubmissions',
                    module_id: 'math-for-ai',
                    exercise_id: `practice-${candidate.id}`
                });
                assert.equal(draftReadBack.data[0]?.status, 'draft');
                assert.equal(draftReadBack.data[0]?.answer_count, 1);

                await page.evaluate(answers => {
                    document.querySelectorAll('[data-math-practice-form] textarea').forEach((field, index) => {
                        field.value = index < 7 ? answers[field.name] : '';
                        field.dispatchEvent(new Event('input', { bubbles: true }));
                    });
                    document.querySelector('[data-math-practice-form]')?.requestSubmit();
                }, expectedAnswers);
                await page.waitForFunction(() => /belum lengkap/i.test(document.querySelector('[data-practice-status]')?.textContent || ''));
                const incompleteReadBack = await gasCall({
                    ...auth,
                    action: 'getParticipantExerciseSubmissions',
                    module_id: 'math-for-ai',
                    exercise_id: `practice-${candidate.id}`
                });
                assert.equal(incompleteReadBack.data[0]?.status, 'draft');
                assert.equal(incompleteReadBack.data[0]?.answer_count, 1);
            }

            await page.evaluate(answers => {
                document.querySelectorAll('[data-math-practice-form] textarea').forEach(field => {
                    if (!field.readOnly) {
                        field.value = answers[field.name];
                        field.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                });
                if (!document.querySelector('[data-math-practice-form] textarea')?.readOnly) {
                    document.querySelector('[data-math-practice-form]')?.requestSubmit();
                }
            }, expectedAnswers);
            await page.waitForFunction(() => (
                document.querySelector('[data-math-practice-form] textarea[name="answer-08"]')?.readOnly === true
            ), { timeout: 60000 });
            const exerciseReadBack = await gasCall({
                ...auth,
                action: 'getParticipantExerciseSubmissions',
                module_id: 'math-for-ai',
                exercise_id: `practice-${candidate.id}`
            });
            assert.equal(exerciseReadBack.data.length, 1, `practice-${candidate.id} must upsert one row.`);
            assert.equal(exerciseReadBack.data[0].status, 'submitted');
            assert.equal(exerciseReadBack.data[0].answer_count, 8);
            assert.deepEqual(exerciseReadBack.data[0].answers, expectedAnswers);

            await page.goto(`${localUrl}/#${baseRoute}/kuis`, { waitUntil: 'domcontentloaded' });
            await page.waitForSelector('[data-quiz-question="10"]', { timeout: 30000 });
            await page.evaluate(answers => {
                answers.forEach((answer, index) => {
                    document.querySelector(`input[name="quiz-${index + 1}"][value="${answer}"]`)?.click();
                });
                document.querySelector('[data-quiz-form]')?.requestSubmit();
            }, candidate.answers);
            await page.waitForFunction(() => /skor 10\/10/i.test(document.querySelector('[data-quiz-form] button[type="submit"]')?.textContent || ''), { timeout: 90000 });

            await page.goto(`${localUrl}/#${baseRoute}/diskusi`, { waitUntil: 'domcontentloaded' });
            await page.waitForSelector(`[data-discussion-prompt="discussion-${candidate.id}-02"] textarea`, { timeout: 30000 });
            for (const promptNumber of ['01', '02']) {
                const promptId = `discussion-${candidate.id}-${promptNumber}`;
                const value = `${qaLabel} ${promptId}${promptNumber === '01' ? ' UPSERT' : ''}`;
                await page.$eval(`[data-discussion-prompt="${promptId}"] textarea`, (field, text) => {
                    field.value = text;
                    field.dispatchEvent(new Event('input', { bubbles: true }));
                }, value);
                await page.click(`[data-discussion-prompt="${promptId}"] button[type="submit"]`);
                await page.waitForFunction(id => /dikonfirmasi oleh server/i.test(
                    document.querySelector(`[data-discussion-prompt="${id}"] [data-discussion-status]`)?.textContent || ''
                ), { timeout: 60000 }, promptId);
            }
            await page.waitForFunction(() => /progres akun sudah dikonfirmasi/i.test(
                document.querySelector('[data-discussion-overall]')?.textContent || ''
            ), { timeout: 60000 });
            console.log(`Live mutation checkpoint: Submodule ${candidate.id} practice/quiz/discussion acknowledged and read back.`);
        }

        const finalProgress = await gasCall({
            ...auth,
            action: 'getParticipantProgress',
            module_id: 'math-for-ai'
        });
        const expectedProgressIds = new Set(['quiz']);
        for (const candidate of candidates) {
            expectedProgressIds.add(`info-${candidate.id}`);
            expectedProgressIds.add(`practice-${candidate.id}`);
            expectedProgressIds.add(`quiz-${candidate.id}`);
            expectedProgressIds.add(`discussion-${candidate.id}`);
            expectedProgressIds.add(`references-${candidate.id}`);
            for (let topic = 1; topic <= candidate.topics; topic += 1) {
                expectedProgressIds.add(String(Number(candidate.id) * 100 + topic));
            }
        }
        const progressById = new Map(finalProgress.data.map(row => [String(row.chapter_id), row]));
        for (const id of expectedProgressIds) {
            assert.equal(progressById.get(id)?.status, 'completed', `${id} must be completed after live mutation.`);
        }
        for (const candidate of candidates) {
            assert.equal(progressById.get(`quiz-${candidate.id}`)?.score, 100);
        }
        assert.equal(progressById.get('quiz')?.score, 100, 'Aggregate seven-quiz score must be 100.');

        const finalDiscussions = await gasCall({
            ...auth,
            action: 'getParticipantDiscussions',
            module_id: 'math-for-ai'
        });
        const mathPrompts = finalDiscussions.data.filter(row => /^discussion-0[1-7]-(?:01|02)$/.test(String(row.prompt || '')));
        assert.equal(mathPrompts.length, 14, 'Math discussion upsert must leave exactly 14 QA prompt rows.');
        assert.equal(new Set(mathPrompts.map(row => row.prompt)).size, 14, 'Math discussion prompts must remain unique.');

        assert.deepEqual(pageErrors, []);
        assert.deepEqual(failedRequests, []);
        mutationEvidence = {
            progress: expectedProgressIds.size,
            exercises: candidates.length,
            discussions: mathPrompts.length
        };
    } finally {
        await browser.close();
    }
}

let browser;
try {
    browser = await puppeteer.launch({ headless: true, executablePath: '/usr/bin/chromium' });
    const page = await browser.newPage();
    const pageErrorCount = { value: 0 };
    page.on('pageerror', () => { pageErrorCount.value += 1; });
    await page.goto(`${productionUrl}/#/participant-login`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('#profileNik', { timeout: 20000 });
    await page.type('#profileNik', qaNik);
    await page.type('#profilePassword', qaPassword);
    await page.click('button[type="submit"]');
    await page.waitForFunction(() => {
        const raw = sessionStorage.getItem('heraiParticipantSession');
        if (!raw) return false;
        try { return Boolean(JSON.parse(raw).token); } catch { return false; }
    }, { timeout: 30000 });
    await page.goto(`${productionUrl}/#/participant-ai-lab-math`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForSelector('[data-fellow-page="under-development"]', { timeout: 20000 });
    assert.equal(await page.$('#mathLearningRoot'), null, 'Production Math must remain locked before explicit activation.');
    assert.equal(pageErrorCount.value, 0, 'Production auth/lock flow must not raise page errors.');
} finally {
    if (browser) await browser.close();
    if (localServer && localServer.exitCode === null) {
        const exited = once(localServer, 'exit');
        localServer.kill('SIGTERM');
        await Promise.race([exited, new Promise(resolveWait => setTimeout(resolveWait, 2000))]);
    }
}

if (mutationEvidence) {
    console.log(`Live Math mutation readiness valid on GAS ${service.version || 'unknown'}: ${mutationEvidence.progress} progress IDs completed, ${mutationEvidence.exercises} exercises submitted with exact 8-answer read-back, ${mutationEvidence.discussions} discussion prompts upserted without duplicates, seven quiz scores + aggregate acknowledged, and production Math remains locked.`);
} else {
    console.log(`Live Math read-only readiness valid on GAS ${service.version || 'unknown'}: QA auth and token rejection pass; ${progress.data.length} Math progress, ${exerciseRecordCount} exercise, and ${discussions.data.length} discussion records read without mutation; production Math remains locked.`);
}
