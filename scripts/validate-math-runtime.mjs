import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '..');
const registryPath = resolve(repositoryRoot, 'js/frontend/fellow-dashboard/math-learning.js');
const source = readFileSync(registryPath, 'utf8');
const requireTracked = process.argv.includes('--require-tracked');
const submoduleContracts = new Map([
    ['01', { folder: 'materi2/math for ai/kenapa ai butuh matematika', topics: 7 }],
    ['02', { folder: 'materi2/math for ai/02-linear-algebra', topics: 8 }],
    ['03', { folder: 'materi2/math for ai/03-statistics-for-ai', topics: 8 }],
    ['04', { folder: 'materi2/math for ai/04-probability', topics: 8, externalKey: true }],
    ['05', { folder: 'materi2/math for ai/05-calculus', topics: 8, externalKey: true }],
    ['06', { folder: 'materi2/math for ai/06-optimization', topics: 8, externalKey: true }],
    ['07', { folder: 'materi2/math for ai/07-case-study-herai', topics: 7, externalKey: true }]
]);
const canonicalFolders = new Set([...submoduleContracts.values()].map(contract => contract.folder));

const blocks = [...source.matchAll(/createSubmodule\(\{([\s\S]*?)\n\s*\}\)(?:,|\n)/g)].map(match => match[1]);
const runtimeFiles = [];
const submodules = new Map();
let topicCount = 0;

for (const block of blocks) {
    const id = block.match(/\bid:\s*'([^']+)'/)?.[1];
    const encodedBase = block.match(/\bsourceBase:\s*'([^']+)'/)?.[1];
    if (!id || !encodedBase) throw new Error('Registry Math memiliki blok submodule yang tidak lengkap.');
    const base = decodeURIComponent(encodedBase).replace(/^\//, '').replace(/\/$/, '');
    if (!canonicalFolders.has(base)) {
        throw new Error(`Submodule ${id} masih menunjuk folder non-canonical: ${base}`);
    }
    const entries = [];
    const items = [...block.matchAll(/\{\s*id:\s*'([^']+)'[\s\S]*?file:\s*'([^']+)'[\s\S]*?type:\s*'([^']+)'[\s\S]*?\}/g)];
    for (const item of items) {
        const [, itemId, file, type] = item;
        if (type === 'topic') topicCount += 1;
        const entry = { id, itemId, file, type, path: `${base}/${file}` };
        entries.push(entry);
        runtimeFiles.push(entry);
    }
    submodules.set(id, { base, entries });
}

for (const [id, contract] of submoduleContracts) {
    if (!contract.externalKey) continue;
    runtimeFiles.push({
        id,
        itemId: 'quiz-key',
        type: 'answer-key',
        path: `${contract.folder}/kunci-jawaban-rubrik.md`
    });
}

const errors = [];
const expect = (condition, message) => {
    if (!condition) errors.push(message);
};
const unique = values => new Set(values).size === values.length;

expect(blocks.length === 7, `EXPECTED 7 submodules, found ${blocks.length}`);
expect(runtimeFiles.length === 93, `EXPECTED 89 item files + 4 answer keys, found ${runtimeFiles.length}`);
expect(topicCount === 54, `EXPECTED 54 topics, found ${topicCount}`);
expect(unique(runtimeFiles.map(entry => entry.path)), 'DUPLICATE runtime source path found in Math registry.');

for (const [id, contract] of submoduleContracts) {
    const submodule = submodules.get(id);
    expect(Boolean(submodule), `MISSING registry submodule ${id}`);
    if (!submodule) continue;
    expect(submodule.base === contract.folder, `Submodule ${id} canonical folder mismatch: ${submodule.base}`);
    expect(unique(submodule.entries.map(entry => entry.itemId)), `Submodule ${id} has duplicate item IDs.`);
    expect(submodule.entries.filter(entry => entry.type === 'topic').length === contract.topics,
        `Submodule ${id} must have ${contract.topics} topics.`);
    for (const type of ['info', 'practice', 'quiz', 'discussion', 'references']) {
        expect(submodule.entries.filter(entry => entry.type === type).length === 1,
            `Submodule ${id} must have exactly one ${type} item.`);
    }

    const topicIds = submodule.entries
        .filter(entry => entry.type === 'topic')
        .map(entry => entry.itemId);
    const expectedTopicIds = Array.from({ length: contract.topics }, (_, index) => (
        `topic-${String(index + 1).padStart(2, '0')}`
    ));
    expect(JSON.stringify(topicIds) === JSON.stringify(expectedTopicIds),
        `Submodule ${id} topic IDs must be contiguous and ordered.`);

    const readItem = type => {
        const entry = submodule.entries.find(candidate => candidate.type === type);
        return entry && existsSync(resolve(repositoryRoot, entry.path))
            ? readFileSync(resolve(repositoryRoot, entry.path), 'utf8')
            : '';
    };
    const practice = readItem('practice');
    const practiceNumbers = [...practice.matchAll(/^#{1,3}\s+(?:Latihan|Soal)\s+(\d+)\b/gmi)]
        .map(match => Number(match[1]));
    expect(JSON.stringify(practiceNumbers) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8]),
        `Submodule ${id} practice must contain ordered exercises 1-8 exactly once.`);

    const discussion = readItem('discussion');
    const discussionNumbers = [...discussion.matchAll(/^#{1,3}\s+Diskusi\s+(\d+)\b/gmi)]
        .map(match => Number(match[1]));
    expect(JSON.stringify(discussionNumbers) === JSON.stringify([1, 2]),
        `Submodule ${id} discussion must contain ordered prompts 1-2 exactly once.`);

    const quiz = readItem('quiz');
    const chunks = quiz.split(/^#{1,2}\s+(?:Soal\s+|Q)?(\d+)[^\n]*\n/gm);
    const questions = [];
    let externalKey = {};
    if (contract.externalKey) {
        const keyPath = resolve(repositoryRoot, contract.folder, 'kunci-jawaban-rubrik.md');
        const keySource = existsSync(keyPath) ? readFileSync(keyPath, 'utf8') : '';
        for (const match of keySource.matchAll(/^\|\s*(\d+)\s*\|(?:\s*[^\|]+\s*\|)?\s*([A-D])\s*\|/gm)) {
            externalKey[match[1]] = match[2];
        }
    }
    for (let index = 1; index < chunks.length; index += 2) {
        const number = Number(chunks[index]);
        const body = chunks[index + 1].split(/^---\s*$/m)[0];
        const options = [...body.matchAll(/^([A-D])\.\s+(.+?)(?=\s{2}$|$)/gm)].map(match => match[1]);
        const answer = externalKey[number]
            || body.match(/\*\*(?:Jawaban benar|Correct answer|Jawaban):\*\*\s*([A-D])/)?.[1];
        questions.push({ number, options, answer });
    }
    expect(JSON.stringify(questions.map(question => question.number)) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        `Submodule ${id} quiz must contain ordered questions 1-10 exactly once.`);
    for (const question of questions) {
        expect(JSON.stringify(question.options) === JSON.stringify(['A', 'B', 'C', 'D']),
            `Submodule ${id} quiz question ${question.number} must have options A-D exactly once.`);
        expect(/^[A-D]$/.test(question.answer || ''),
            `Submodule ${id} quiz question ${question.number} is missing a canonical answer key.`);
    }
}

let trackedCount = 0;
for (const entry of runtimeFiles) {
    const absolutePath = resolve(repositoryRoot, entry.path);
    if (!existsSync(absolutePath)) {
        errors.push(`MISSING ${entry.id}/${entry.itemId}: ${entry.path}`);
        continue;
    }
    const fileSource = readFileSync(absolutePath, 'utf8');
    expect(/^#\s+\S/m.test(fileSource), `MISSING primary heading: ${entry.path}`);
    expect(!/^(?:<<<<<<<|=======|>>>>>>>)/m.test(fileSource), `MERGE CONFLICT marker: ${entry.path}`);
    expect(!fileSource.includes('\0'), `NULL BYTE: ${entry.path}`);
    expect((fileSource.match(/\$\$/g) || []).length % 2 === 0, `UNBALANCED display-math delimiters: ${entry.path}`);
    expect((fileSource.match(/^```/gm) || []).length % 2 === 0, `UNBALANCED fenced-code delimiters: ${entry.path}`);
    expect(!/(?:\/home\/[^\s]+|[A-Z]:\\Users\\)/.test(fileSource), `LOCAL absolute path leaked into source: ${entry.path}`);
    let ignored = false;
    try {
        execFileSync('git', ['check-ignore', '-q', '--', entry.path], { cwd: repositoryRoot });
        ignored = true;
    } catch {}
    if (ignored) errors.push(`IGNORED ${entry.id}/${entry.itemId}: ${entry.path}`);

    let tracked = false;
    try {
        execFileSync('git', ['ls-files', '--error-unmatch', '--', entry.path], {
            cwd: repositoryRoot,
            stdio: 'ignore'
        });
        tracked = true;
        trackedCount += 1;
    } catch {}
    if (requireTracked && !tracked) errors.push(`UNTRACKED ${entry.id}/${entry.itemId}: ${entry.path}`);
}

if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
} else {
    console.log('Math runtime valid: 7 submodules, 89 items, 54 topics, 8 practices + 10 keyed quiz questions + 2 discussions per submodule, 4 external answer keys, and balanced Markdown/math source integrity.');
    console.log(`Git state: ${trackedCount}/${runtimeFiles.length} runtime files already tracked${requireTracked ? '.' : '; remaining files are eligible for the next commit.'}`);
}
