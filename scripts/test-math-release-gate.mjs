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
const baseRoutes = [
    '/participant-ai-lab-math/kenapa-ai-butuh-matematika',
    '/participant-ai-lab-math/linear-algebra',
    '/participant-ai-lab-math/statistics-for-ai',
    '/participant-ai-lab-math/probability',
    '/participant-ai-lab-math/calculus',
    '/participant-ai-lab-math/optimization',
    '/participant-ai-lab-math/integrated-case-study'
];
const representativeChildRoutes = [
    '/participant-ai-lab-math/kenapa-ai-butuh-matematika/dunia-nyata-menjadi-representasi-komputasional',
    '/participant-ai-lab-math/linear-algebra/dari-scalar-ke-vector',
    '/participant-ai-lab-math/statistics-for-ai/mean-median-mode',
    '/participant-ai-lab-math/probability/conditional-probability',
    '/participant-ai-lab-math/calculus/partial-derivative',
    '/participant-ai-lab-math/optimization/learning-rate',
    '/participant-ai-lab-math/integrated-case-study/uncertainty'
];
const canonicalRoutes = [...baseRoutes, ...representativeChildRoutes];

assert.equal(router.getMathRoute('/participant-ai-lab-math'), overviewPage);
for (const route of baseRoutes) {
    assert.equal(Boolean(router.routes[route]), true, `${route} must be registered in the SPA route map.`);
}
for (const route of canonicalRoutes) assert.equal(router.getMathRoute(route), previewLessonPage);

context.window.location.hostname = 'her-ai.data-sorcerers.com';
assert.equal(router.getMathRoute('/participant-ai-lab-math'), overviewPage);
for (const route of canonicalRoutes) {
    const resolved = router.getMathRoute(route);
    assert.equal(resolved, previewLessonPage, `${route} must resolve in the full release source.`);
    assert.equal(existsSync(resolve(repositoryRoot, resolved.slice(1))), true, `${route} release shell must exist.`);
}
assert.equal(router.getMathRoute('/participant-dashboard'), null);

const fullReleaseLiteral = "releasedSubmodules: Object.freeze(['01', '02', '03', '04', '05', '06', '07'])";
const lockedSource = source.replace(
    fullReleaseLiteral,
    'releasedSubmodules: Object.freeze([])'
);
assert.notEqual(lockedSource, source, 'Locked rollback fixture must patch the current full-release source.');
const lockedContext = {
    ...context,
    window: {
        ...context.window,
        location: { hostname: 'her-ai.data-sorcerers.com' }
    }
};
lockedContext.window.window = lockedContext.window;
vm.createContext(lockedContext);
vm.runInContext(`${lockedSource}\n;globalThis.__testedRouter = router;`, lockedContext, { filename: 'js/router.js' });
assert.equal(lockedContext.__testedRouter.getMathRoute('/participant-ai-lab-math'), lockedPage);
for (const route of canonicalRoutes) assert.equal(lockedContext.__testedRouter.getMathRoute(route), lockedPage);

const releaseSource = source.replace(
    fullReleaseLiteral,
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
assert.equal(releaseRouter.getMathRoute(baseRoutes[0]), previewLessonPage);
assert.equal(releaseRouter.getMathRoute(baseRoutes[1]), previewLessonPage);
assert.equal(releaseRouter.getMathRoute(baseRoutes[2]), lockedPage);
assert.equal(releaseRouter.getMathRoute(representativeChildRoutes[0]), previewLessonPage);
assert.equal(releaseRouter.getMathRoute(representativeChildRoutes[1]), previewLessonPage);
assert.equal(releaseRouter.getMathRoute(representativeChildRoutes[2]), lockedPage);
assert.equal(
    existsSync(resolve(repositoryRoot, releaseRouter.getMathRoute(baseRoutes[0]).slice(1))),
    true,
    'Released submodules must resolve to a tracked HTML shell that exists.'
);

console.log('Math release gate valid: source activates 01–07 on localhost and production host; locked rollback closes all Math routes; partial rollback isolates 01–02; every released canonical route resolves to the tracked shared lesson shell.');
