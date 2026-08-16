import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const repositoryRoot = resolve(import.meta.dirname, '..');
const registryPath = resolve(repositoryRoot, 'js/frontend/fellow-dashboard/math-learning.js');
const source = readFileSync(registryPath, 'utf8');
const requireTracked = process.argv.includes('--require-tracked');
const canonicalFolders = new Set([
    'materi2/math for ai/kenapa ai butuh matematika',
    'materi2/math for ai/02-linear-algebra',
    'materi2/math for ai/03-statistics-for-ai',
    'materi2/math for ai/04-probability',
    'materi2/math for ai/05-calculus',
    'materi2/math for ai/06-optimization',
    'materi2/math for ai/07-case-study-herai'
]);

const blocks = [...source.matchAll(/createSubmodule\(\{([\s\S]*?)\n\s*\}\)(?:,|\n)/g)].map(match => match[1]);
const runtimeFiles = [];
let topicCount = 0;

for (const block of blocks) {
    const id = block.match(/\bid:\s*'([^']+)'/)?.[1];
    const encodedBase = block.match(/\bsourceBase:\s*'([^']+)'/)?.[1];
    if (!id || !encodedBase) throw new Error('Registry Math memiliki blok submodule yang tidak lengkap.');
    const base = decodeURIComponent(encodedBase).replace(/^\//, '').replace(/\/$/, '');
    if (!canonicalFolders.has(base)) {
        throw new Error(`Submodule ${id} masih menunjuk folder non-canonical: ${base}`);
    }
    const items = [...block.matchAll(/\{\s*id:\s*'([^']+)'[\s\S]*?file:\s*'([^']+)'[\s\S]*?type:\s*'([^']+)'[\s\S]*?\}/g)];
    for (const item of items) {
        const [, itemId, file, type] = item;
        if (type === 'topic') topicCount += 1;
        runtimeFiles.push({ id, itemId, path: `${base}/${file}` });
    }
}

for (const path of [
    'materi2/math for ai/04-probability/kunci-jawaban-rubrik.md',
    'materi2/math for ai/05-calculus/kunci-jawaban-rubrik.md',
    'materi2/math for ai/06-optimization/kunci-jawaban-rubrik.md',
    'materi2/math for ai/07-case-study-herai/kunci-jawaban-rubrik.md'
]) {
    runtimeFiles.push({ id: 'answer-key', itemId: 'quiz-key', path });
}

const errors = [];
let trackedCount = 0;
for (const entry of runtimeFiles) {
    const absolutePath = resolve(repositoryRoot, entry.path);
    if (!existsSync(absolutePath)) {
        errors.push(`MISSING ${entry.id}/${entry.itemId}: ${entry.path}`);
        continue;
    }
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

if (blocks.length !== 7) errors.push(`EXPECTED 7 submodules, found ${blocks.length}`);
if (runtimeFiles.length !== 93) errors.push(`EXPECTED 89 item files + 4 answer keys, found ${runtimeFiles.length}`);
if (topicCount !== 54) errors.push(`EXPECTED 54 topics, found ${topicCount}`);

if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
} else {
    console.log(`Math runtime valid: 7 submodules, 89 items, 54 topics, 4 answer keys.`);
    console.log(`Git state: ${trackedCount}/${runtimeFiles.length} runtime files already tracked${requireTracked ? '.' : '; remaining files are eligible for the next commit.'}`);
}
