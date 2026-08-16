import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const repositoryRoot = resolve(import.meta.dirname, '..');
const source = readFileSync(resolve(repositoryRoot, 'js/router.js'), 'utf8');
const context = {
    console,
    setTimeout,
    clearTimeout,
    window: {
        location: { hostname: 'localhost' },
        addEventListener() {}
    },
    document: {
        addEventListener() {},
        querySelectorAll() { return []; },
        getElementById() { return null; }
    }
};
context.window.window = context.window;
vm.createContext(context);
vm.runInContext(`${source}\n;globalThis.__testedRouter = router;`, context, { filename: 'js/router.js' });

const router = context.__testedRouter;
const lockedPage = '/pages/frontend/fellow-dashboard/under-development.html';
const overviewPage = '/pages/frontend/fellow-dashboard/foundation-core-ai/math-for-ai/overview.html';
const previewLessonPage = '/pages/frontend/fellow-dashboard/foundation-core-ai/math-for-ai/01-kenapa-ai-butuh-matematika/materi.html';
const canonicalRoutes = [
    '/participant-ai-lab-math/kenapa-ai-butuh-matematika/dunia-nyata-menjadi-representasi-komputasional',
    '/participant-ai-lab-math/linear-algebra/dari-scalar-ke-vector',
    '/participant-ai-lab-math/statistics-for-ai/mean-median-mode',
    '/participant-ai-lab-math/probability/conditional-probability',
    '/participant-ai-lab-math/calculus/partial-derivative',
    '/participant-ai-lab-math/optimization/learning-rate',
    '/participant-ai-lab-math/integrated-case-study/uncertainty'
];

assert.equal(router.getMathRoute('/participant-ai-lab-math'), overviewPage);
for (const route of canonicalRoutes) assert.equal(router.getMathRoute(route), previewLessonPage);

context.window.location.hostname = 'her-ai.data-sorcerers.com';
assert.equal(router.getMathRoute('/participant-ai-lab-math'), lockedPage);
for (const route of canonicalRoutes) assert.equal(router.getMathRoute(route), lockedPage);
assert.equal(router.getMathRoute('/participant-dashboard'), null);

console.log('Math release gate valid: localhost previews 01–07; non-local locks overview and every submodule.');
