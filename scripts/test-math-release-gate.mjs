import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
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

const releaseSource = source.replace(
    'releasedSubmodules: Object.freeze([])',
    "releasedSubmodules: Object.freeze(['01', '02'])"
);
assert.notEqual(releaseSource, source, 'Release config fixture must patch the current router source.');
const releaseContext = {
    ...context,
    window: {
        ...context.window,
        location: { hostname: 'her-ai.data-sorcerers.com' }
    }
};
releaseContext.window.window = releaseContext.window;
vm.createContext(releaseContext);
vm.runInContext(`${releaseSource}\n;globalThis.__testedRouter = router;`, releaseContext, { filename: 'js/router.js' });
const releaseRouter = releaseContext.__testedRouter;
assert.equal(releaseRouter.getMathRoute('/participant-ai-lab-math'), overviewPage);
assert.equal(releaseRouter.getMathRoute(canonicalRoutes[0]), previewLessonPage);
assert.equal(releaseRouter.getMathRoute(canonicalRoutes[1]), previewLessonPage);
assert.equal(releaseRouter.getMathRoute(canonicalRoutes[2]), lockedPage);
assert.equal(
    existsSync(resolve(repositoryRoot, releaseRouter.getMathRoute(canonicalRoutes[0]).slice(1))),
    true,
    'Released submodules must resolve to a tracked HTML shell that exists.'
);

const fullReleaseSource = source.replace(
    'releasedSubmodules: Object.freeze([])',
    "releasedSubmodules: Object.freeze(['01', '02', '03', '04', '05', '06', '07'])"
);
assert.notEqual(fullReleaseSource, source, 'Full release fixture must patch the current router source.');
const fullReleaseContext = {
    ...context,
    window: {
        ...context.window,
        location: { hostname: 'her-ai.data-sorcerers.com' }
    }
};
fullReleaseContext.window.window = fullReleaseContext.window;
vm.createContext(fullReleaseContext);
vm.runInContext(`${fullReleaseSource}\n;globalThis.__testedRouter = router;`, fullReleaseContext, { filename: 'js/router.js' });
assert.equal(fullReleaseContext.__testedRouter.getMathRoute('/participant-ai-lab-math'), overviewPage);
for (const route of canonicalRoutes) {
    const resolved = fullReleaseContext.__testedRouter.getMathRoute(route);
    assert.equal(resolved, previewLessonPage, `${route} must resolve after full release activation`);
    assert.equal(existsSync(resolve(repositoryRoot, resolved.slice(1))), true, `${route} release shell must exist`);
}

console.log('Math release gate valid: localhost previews 01–07; non-local locks unreleased content; partial release isolates 01–02; simulated full 01–07 activation resolves every canonical route to the shared lesson shell.');
